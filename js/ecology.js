/* =========================================================
   ecology.js — Ecology module interaction

   Two halves:
     1. Interactive food web (left pane)
        - 8 organisms across 4 trophic levels rendered as
          colored nodes connected by predator → prey edges
        - Click an organism: highlights its edges + fills the
          info card with its role, what it eats, what eats it
        - Click empty space (or its own node again): clears
     2. Four card decks (right pane), same nav pattern as
        heredity.js / selection.js

   Depends on: data/ecology-content.js
   ========================================================= */

const DECK_INTRO_E      = 'intro';
const DECK_ENERGY       = 'energy';
const DECK_POPULATIONS  = 'populations';
const DECK_COMMUNITIES  = 'communities';
const DECK_ORDER_E      = [DECK_INTRO_E, DECK_ENERGY, DECK_POPULATIONS, DECK_COMMUNITIES];

/* ---------- Food web data ---------- */

/* Each organism:
     id, icon (emoji), name, level (1=producer ... 4=tertiary),
     x, y    — position in the 400x300 SVG viewBox
     eats    — list of organism ids it preys on
     blurb   — one-line role description
   "eatenBy" is derived from each other organism's `eats`. */
const ORGANISMS = [
  { id: 'hawk',        icon: '🦅', name: 'Red-tailed Hawk',  level: 4, x: 200, y: 50,
    eats:  ['fox', 'snake', 'mouse', 'rabbit'],
    blurb: 'An apex predator. With no natural predators of its own, it caps the food web.' },
  { id: 'fox',         icon: '🦊', name: 'Red Fox',          level: 3, x: 90,  y: 125,
    eats:  ['rabbit', 'mouse', 'grasshopper'],
    blurb: 'Opportunistic carnivore. Keeps rodent and insect populations in check.' },
  { id: 'snake',       icon: '🐍', name: 'Garter Snake',     level: 3, x: 310, y: 125,
    eats:  ['mouse', 'grasshopper'],
    blurb: 'Cold-blooded predator. Most active in warm months when prey is abundant.' },
  { id: 'rabbit',      icon: '🐰', name: 'Cottontail Rabbit', level: 2, x: 70,  y: 205,
    eats:  ['grass', 'wildflower'],
    blurb: 'Prolific breeder. A single pair can produce 20+ offspring in a year.' },
  { id: 'mouse',       icon: '🐭', name: 'Field Mouse',      level: 2, x: 200, y: 205,
    eats:  ['grass', 'wildflower'],
    blurb: 'Tiny but crucial — mice feed nearly every carnivore in the meadow.' },
  { id: 'grasshopper', icon: '🦗', name: 'Grasshopper',      level: 2, x: 330, y: 205,
    eats:  ['grass'],
    blurb: 'An insect herbivore. Converts plant tissue into protein for the next level up.' },
  { id: 'grass',       icon: '🌱', name: 'Grass',            level: 1, x: 140, y: 275,
    eats:  [],
    blurb: 'Photosynthetic producer. The energy foundation of the entire meadow.' },
  { id: 'wildflower',  icon: '🌸', name: 'Wildflower',       level: 1, x: 260, y: 275,
    eats:  [],
    blurb: 'Producer + pollinator partner. Feeds bees AND mice from the same patch.' }
];

const ORG_BY_ID = Object.fromEntries(ORGANISMS.map(o => [o.id, o]));

const LEVEL_NAMES = {
  1: 'Producer (1st trophic level)',
  2: 'Primary consumer (2nd)',
  3: 'Secondary consumer (3rd)',
  4: 'Tertiary consumer (4th)'
};

const NODE_RADIUS = 22;

let deckMode  = DECK_INTRO_E;
let cardIndex = 0;
let selectedId = null;

document.addEventListener('DOMContentLoaded', () => {
  if (typeof ECOLOGY_INTRO_CARDS === 'undefined' || !ECOLOGY_INTRO_CARDS.length) return;

  buildFoodWeb();
  renderCard();

  document.getElementById('card-prev')?.addEventListener('click', () => moveCard(-1));
  document.getElementById('card-next')?.addEventListener('click', () => moveCard(1));
  document.getElementById('section-back')?.addEventListener('click', backToIntro);

  document.getElementById('food-web')?.addEventListener('click', e => {
    const node = e.target.closest('.organism');
    if (node) selectOrganism(node.dataset.id);
    else clearSelection();
  });

  document.addEventListener('keydown', e => {
    if (e.target.matches('input, textarea, [contenteditable], button')) return;
    if (e.key === 'ArrowLeft')  moveCard(-1);
    if (e.key === 'ArrowRight') moveCard(1);
    if (e.key === 'Escape')     clearSelection();
  });
});

/* ---------- Food web rendering ---------- */

function buildFoodWeb() {
  const edges = document.getElementById('edge-layer');
  const nodes = document.getElementById('node-layer');
  if (!edges || !nodes) return;

  edges.innerHTML = '';
  nodes.innerHTML = '';

  // Edges: predator → prey. Drawn between node centers, then trimmed back
  // by NODE_RADIUS on each end so the line doesn't bury under the disc.
  for (const predator of ORGANISMS) {
    for (const preyId of predator.eats) {
      const prey = ORG_BY_ID[preyId];
      if (!prey) continue;
      const [x1, y1, x2, y2] = trimLine(predator.x, predator.y, prey.x, prey.y, NODE_RADIUS);
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('class', `edge edge-${predator.id}-${prey.id}`);
      line.dataset.predator = predator.id;
      line.dataset.prey     = prey.id;
      line.setAttribute('x1', x1.toFixed(1));
      line.setAttribute('y1', y1.toFixed(1));
      line.setAttribute('x2', x2.toFixed(1));
      line.setAttribute('y2', y2.toFixed(1));
      edges.appendChild(line);
    }
  }

  // Nodes
  for (const o of ORGANISMS) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', `organism level-${o.level}`);
    g.setAttribute('transform', `translate(${o.x} ${o.y})`);
    g.dataset.id = o.id;
    g.setAttribute('tabindex', '0');
    g.setAttribute('role', 'button');
    g.setAttribute('aria-label', `${o.name}, ${LEVEL_NAMES[o.level]}`);
    g.innerHTML = `
      <circle class="organism-disc" r="${NODE_RADIUS}"/>
      <text class="organism-icon" y="6" text-anchor="middle">${o.icon}</text>
      <text class="organism-name" y="${NODE_RADIUS + 14}" text-anchor="middle">${o.name.split(' ').pop()}</text>
    `;
    nodes.appendChild(g);
  }
}

function trimLine(x1, y1, x2, y2, pad) {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len, uy = dy / len;
  return [x1 + ux * pad, y1 + uy * pad, x2 - ux * pad, y2 - uy * pad];
}

/* ---------- Selection ---------- */

function selectOrganism(id) {
  if (!ORG_BY_ID[id]) return;
  // Toggle off if re-clicked
  if (selectedId === id) { clearSelection(); return; }
  selectedId = id;
  applySelectionVisuals();
  renderInfoCard();
}

function clearSelection() {
  selectedId = null;
  applySelectionVisuals();
  renderInfoCard();
}

function applySelectionVisuals() {
  const tool = document.getElementById('web-tool');
  if (tool) tool.classList.toggle('has-selection', !!selectedId);

  document.querySelectorAll('.organism').forEach(n => {
    n.classList.remove('selected', 'related-prey', 'related-predator', 'dimmed');
  });
  document.querySelectorAll('.edge').forEach(e => {
    e.classList.remove('edge-prey', 'edge-predator', 'dimmed');
  });

  if (!selectedId) return;

  const selected = ORG_BY_ID[selectedId];
  // Prey of the selected (things it eats)
  const preySet = new Set(selected.eats);
  // Predators of the selected (things that eat it)
  const predSet = new Set(ORGANISMS.filter(o => o.eats.includes(selectedId)).map(o => o.id));

  document.querySelectorAll('.organism').forEach(n => {
    const id = n.dataset.id;
    if (id === selectedId)         n.classList.add('selected');
    else if (preySet.has(id))      n.classList.add('related-prey');
    else if (predSet.has(id))      n.classList.add('related-predator');
    else                            n.classList.add('dimmed');
  });

  document.querySelectorAll('.edge').forEach(e => {
    if (e.dataset.predator === selectedId)    e.classList.add('edge-prey');
    else if (e.dataset.prey === selectedId)   e.classList.add('edge-predator');
    else                                      e.classList.add('dimmed');
  });
}

function renderInfoCard() {
  const def    = document.getElementById('organism-info-default');
  const detail = document.getElementById('organism-info-detail');
  if (!def || !detail) return;

  if (!selectedId) {
    def.hidden    = false;
    detail.hidden = true;
    return;
  }

  const o = ORG_BY_ID[selectedId];
  def.hidden    = true;
  detail.hidden = false;

  document.getElementById('info-icon').textContent  = o.icon;
  document.getElementById('info-name').textContent  = o.name;
  document.getElementById('info-level').textContent = LEVEL_NAMES[o.level];
  document.getElementById('info-blurb').textContent = o.blurb;

  const eatsList   = o.eats.map(id => ORG_BY_ID[id].name).join(', ') || 'Sunlight (via photosynthesis)';
  const eatenList  = ORGANISMS.filter(x => x.eats.includes(o.id)).map(x => x.name).join(', ') || 'Nothing in this web — it’s an apex predator.';
  document.getElementById('info-eats').textContent  = eatsList;
  document.getElementById('info-eaten').textContent = eatenList;
}

/* ---------- Deck navigation ---------- */

function cardsFor(mode) {
  switch (mode) {
    case DECK_INTRO_E:     return ECOLOGY_INTRO_CARDS;
    case DECK_ENERGY:      return ECOLOGY_ENERGY_FLOW;
    case DECK_POPULATIONS: return ECOLOGY_POPULATIONS;
    case DECK_COMMUNITIES: return ECOLOGY_COMMUNITIES;
    default:               return [];
  }
}

function activeCards() { return cardsFor(deckMode); }

function moveCard(delta) {
  const cards = activeCards();
  const next  = cardIndex + delta;

  if (next >= cards.length) {
    const i = DECK_ORDER_E.indexOf(deckMode);
    if (i < DECK_ORDER_E.length - 1) enterDeck(DECK_ORDER_E[i + 1], 0);
    return;
  }

  if (next < 0) {
    const i = DECK_ORDER_E.indexOf(deckMode);
    if (i > 0) {
      const prev = DECK_ORDER_E[i - 1];
      enterDeck(prev, cardsFor(prev).length - 1);
    }
    return;
  }

  cardIndex = next;
  renderCard();
}

function enterDeck(mode, index) {
  deckMode  = mode;
  cardIndex = index;
  renderCard();
}

function backToIntro() { enterDeck(DECK_INTRO_E, 0); }

function renderCard() {
  const backBtn = document.getElementById('section-back');
  if (backBtn) backBtn.hidden = (deckMode === DECK_INTRO_E);

  const cards   = activeCards();
  const card    = cards[cardIndex];
  const titleEl = document.querySelector('.flashcard-title');
  const bodyEl  = document.querySelector('.flashcard-body');
  const counter = document.getElementById('card-counter');
  const prevBtn = document.getElementById('card-prev');
  const nextBtn = document.getElementById('card-next');
  const label   = document.getElementById('section-label');

  if (titleEl) titleEl.textContent = card.title;
  if (bodyEl)  bodyEl.innerHTML    = card.body;
  if (counter) counter.textContent = `${cardIndex + 1} / ${cards.length}`;
  if (prevBtn) prevBtn.disabled    = (deckMode === DECK_INTRO_E && cardIndex === 0);

  if (nextBtn) {
    const atLast = (cardIndex === cards.length - 1);
    nextBtn.disabled = (deckMode === DECK_COMMUNITIES && atLast);
    const nextDeckLabel = {
      [DECK_INTRO_E]:     'Energy flow →',
      [DECK_ENERGY]:      'Population ecology →',
      [DECK_POPULATIONS]: 'Communities & change →'
    }[deckMode];
    if (atLast && nextDeckLabel) {
      nextBtn.textContent = nextDeckLabel;
      nextBtn.classList.add('flashcard-btn-wide');
    } else {
      nextBtn.textContent = '→';
      nextBtn.classList.remove('flashcard-btn-wide');
    }
  }

  if (label) {
    label.textContent = ({
      [DECK_INTRO_E]:     'Ecology basics',
      [DECK_ENERGY]:      'Energy flow in ecosystems',
      [DECK_POPULATIONS]: 'Population ecology',
      [DECK_COMMUNITIES]: 'Communities & change'
    })[deckMode];
  }

  const cardEl = document.querySelector('.flashcard');
  if (cardEl) {
    cardEl.classList.remove('flashcard-enter');
    void cardEl.offsetWidth;
    cardEl.classList.add('flashcard-enter');
  }
}
