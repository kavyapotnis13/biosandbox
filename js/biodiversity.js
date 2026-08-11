/* =========================================================
   biodiversity.js — Biodiversity module interaction

   Two halves:
     1. Interactive Tree of Life (left pane)
        - LUCA at the top, three domains, four Eukaryotic
          kingdoms. Click a node to see its role, examples,
          and a distinguishing trait.
     2. Four card decks (right pane), same nav pattern as
        ecology.js.

   Depends on: data/biodiversity-content.js
   ========================================================= */

const DECK_INTRO_B     = 'intro';
const DECK_TREE_B      = 'tree';
const DECK_HOTSPOTS_B  = 'hotspots';
const DECK_THREATS_B   = 'threats';
const DECK_ORDER_B     = [DECK_INTRO_B, DECK_TREE_B, DECK_HOTSPOTS_B, DECK_THREATS_B];

/* ---------- Tree of life data ---------- */

/* Each taxon:
     id, icon (emoji), name, level (1 = LUCA, 2 = domain, 3 = kingdom),
     kind    — displayed under the name ("Domain" / "Kingdom")
     x, y    — position in the 480x300 SVG viewBox
     parent  — id of the taxon it descends from (drives the edges)
     examples— comma-joined string of representative organisms
     trait   — one distinguishing feature
     blurb   — one-line role description */
const TAXA = [
  { id: 'luca',     icon: '🌱', name: 'LUCA',      kind: 'Common ancestor',   level: 1, x: 240, y: 34, parent: null,
    examples: 'Nothing alive today — LUCA lived ~3.8 billion years ago.',
    trait:    'Simplest possible cell; used DNA, RNA, proteins, and ATP.',
    blurb:    'The Last Universal Common Ancestor. Every living thing today descends from this single cell.' },

  { id: 'bacteria', icon: '🦠', name: 'Bacteria',  kind: 'Domain',            level: 2, x: 80,  y: 140, parent: 'luca',
    examples: 'E. coli, Streptococcus, cyanobacteria, Lactobacillus.',
    trait:    'Prokaryotic; peptidoglycan cell wall.',
    blurb:    'The most abundant organisms on Earth. Live in soil, oceans, and inside your gut.' },

  { id: 'archaea',  icon: '🔥', name: 'Archaea',   kind: 'Domain',            level: 2, x: 240, y: 140, parent: 'luca',
    examples: 'Methanogens, halophiles, thermophiles.',
    trait:    'Prokaryotic; unique ether-linked membrane lipids.',
    blurb:    'Ancient microbes that thrive in extreme places — hot springs, salt lakes, deep ocean vents.' },

  { id: 'eukarya',  icon: '🧬', name: 'Eukarya',   kind: 'Domain',            level: 2, x: 400, y: 140, parent: 'luca',
    examples: 'Every plant, animal, fungus, and protist you can see.',
    trait:    'Cells with a nucleus and organelles.',
    blurb:    'The domain of complex cells. Includes everything you can see with the naked eye.' },

  { id: 'protista', icon: '🌀', name: 'Protista',  kind: 'Kingdom (Eukarya)', level: 3, x: 265, y: 245, parent: 'eukarya',
    examples: 'Amoebas, paramecia, algae, diatoms, kelp.',
    trait:    'Mostly single-celled eukaryotes; hugely varied.',
    blurb:    'A "grab-bag" kingdom of everything eukaryotic that isn\'t a plant, animal, or fungus.' },

  { id: 'fungi',    icon: '🍄', name: 'Fungi',     kind: 'Kingdom (Eukarya)', level: 3, x: 355, y: 245, parent: 'eukarya',
    examples: 'Mushrooms, yeasts, molds, lichens (part of).',
    trait:    'Chitin cell walls; digest food outside the body and absorb it.',
    blurb:    'Nature\'s decomposers. Break down dead matter and recycle nutrients back to the soil.' },

  { id: 'plantae',  icon: '🌳', name: 'Plantae',   kind: 'Kingdom (Eukarya)', level: 3, x: 400, y: 245, parent: 'eukarya',
    examples: 'Mosses, ferns, grasses, oaks, sunflowers.',
    trait:    'Multicellular; photosynthesize using chloroplasts.',
    blurb:    'Autotrophs that build sugars from sunlight, water, and CO₂. The base of most food chains.' },

  { id: 'animalia', icon: '🐾', name: 'Animalia',  kind: 'Kingdom (Eukarya)', level: 3, x: 445, y: 245, parent: 'eukarya',
    examples: 'Sponges, insects, fish, birds, mammals — including us.',
    trait:    'Multicellular; heterotrophic; usually motile.',
    blurb:    'Multicellular heterotrophs. About 1.5 million described species and counting.' }
];

const TAXA_BY_ID = Object.fromEntries(TAXA.map(t => [t.id, t]));
const NODE_RADIUS_B = 22;

let deckModeB  = DECK_INTRO_B;
let cardIndexB = 0;
let selectedTaxonId = null;

document.addEventListener('DOMContentLoaded', () => {
  if (typeof BIODIVERSITY_INTRO_CARDS === 'undefined' || !BIODIVERSITY_INTRO_CARDS.length) return;

  buildTreeOfLife();
  renderCardB();

  document.getElementById('card-prev')?.addEventListener('click', () => moveCardB(-1));
  document.getElementById('card-next')?.addEventListener('click', () => moveCardB(1));
  document.getElementById('section-back')?.addEventListener('click', () => enterDeckB(DECK_INTRO_B, 0));

  document.getElementById('tree-of-life')?.addEventListener('click', e => {
    const node = e.target.closest('.organism');
    if (node) selectTaxon(node.dataset.id);
    else clearTaxonSelection();
  });

  document.addEventListener('keydown', e => {
    if (e.target.matches('input, textarea, [contenteditable], button')) return;
    if (e.key === 'ArrowLeft')  moveCardB(-1);
    if (e.key === 'ArrowRight') moveCardB(1);
    if (e.key === 'Escape')     clearTaxonSelection();
  });

  window.addEventListener('trackchanged', renderCardB);
});

/* ---------- Tree of life rendering ---------- */

function buildTreeOfLife() {
  const edges = document.getElementById('edge-layer');
  const nodes = document.getElementById('node-layer');
  if (!edges || !nodes) return;
  edges.innerHTML = '';
  nodes.innerHTML = '';

  // Edges from each taxon to its parent
  for (const t of TAXA) {
    if (!t.parent) continue;
    const parent = TAXA_BY_ID[t.parent];
    if (!parent) continue;
    const [x1, y1, x2, y2] = trimLineB(parent.x, parent.y, t.x, t.y, NODE_RADIUS_B);
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('class', `edge edge-${parent.id}-${t.id}`);
    line.dataset.parent = parent.id;
    line.dataset.child  = t.id;
    line.setAttribute('x1', x1.toFixed(1));
    line.setAttribute('y1', y1.toFixed(1));
    line.setAttribute('x2', x2.toFixed(1));
    line.setAttribute('y2', y2.toFixed(1));
    edges.appendChild(line);
  }

  for (const t of TAXA) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', `organism level-${t.level}`);
    g.setAttribute('transform', `translate(${t.x} ${t.y})`);
    g.dataset.id = t.id;
    g.setAttribute('tabindex', '0');
    g.setAttribute('role', 'button');
    g.setAttribute('aria-label', `${t.name}, ${t.kind}`);
    g.innerHTML = `
      <circle class="organism-disc" r="${NODE_RADIUS_B}"/>
      <text class="organism-icon" y="6" text-anchor="middle">${t.icon}</text>
      <text class="organism-name" y="${NODE_RADIUS_B + 14}" text-anchor="middle">${t.name}</text>
    `;
    nodes.appendChild(g);
  }
}

function trimLineB(x1, y1, x2, y2, pad) {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len, uy = dy / len;
  return [x1 + ux * pad, y1 + uy * pad, x2 - ux * pad, y2 - uy * pad];
}

/* ---------- Selection ---------- */

function selectTaxon(id) {
  if (!TAXA_BY_ID[id]) return;
  if (selectedTaxonId === id) { clearTaxonSelection(); return; }
  selectedTaxonId = id;
  applyTaxonVisuals();
  renderTaxonInfo();
  markExplored('biodiversity', `taxon:${id}`);
}

function clearTaxonSelection() {
  selectedTaxonId = null;
  applyTaxonVisuals();
  renderTaxonInfo();
}

function applyTaxonVisuals() {
  const tool = document.getElementById('web-tool');
  if (tool) tool.classList.toggle('has-selection', !!selectedTaxonId);

  document.querySelectorAll('.organism').forEach(n => {
    n.classList.remove('selected', 'related-prey', 'related-predator', 'dimmed');
  });
  document.querySelectorAll('.edge').forEach(e => {
    e.classList.remove('edge-prey', 'edge-predator', 'dimmed');
  });

  if (!selectedTaxonId) return;

  const sel = TAXA_BY_ID[selectedTaxonId];
  const ancestors = new Set();
  let cursor = sel.parent;
  while (cursor) { ancestors.add(cursor); cursor = TAXA_BY_ID[cursor]?.parent; }
  const descendants = new Set();
  const collect = (id) => {
    for (const t of TAXA) if (t.parent === id) { descendants.add(t.id); collect(t.id); }
  };
  collect(selectedTaxonId);

  document.querySelectorAll('.organism').forEach(n => {
    const id = n.dataset.id;
    if (id === selectedTaxonId)      n.classList.add('selected');
    else if (ancestors.has(id))      n.classList.add('related-predator');
    else if (descendants.has(id))    n.classList.add('related-prey');
    else                              n.classList.add('dimmed');
  });

  document.querySelectorAll('.edge').forEach(e => {
    const inChain = (ancestors.has(e.dataset.parent) && (ancestors.has(e.dataset.child) || e.dataset.child === selectedTaxonId))
                 || (descendants.has(e.dataset.parent) || e.dataset.parent === selectedTaxonId)
                    && (descendants.has(e.dataset.child) || e.dataset.child === selectedTaxonId);
    if (inChain) e.classList.add('edge-prey');
    else         e.classList.add('dimmed');
  });
}

function renderTaxonInfo() {
  const def    = document.getElementById('organism-info-default');
  const detail = document.getElementById('organism-info-detail');
  if (!def || !detail) return;

  if (!selectedTaxonId) {
    def.hidden    = false;
    detail.hidden = true;
    return;
  }

  const t = TAXA_BY_ID[selectedTaxonId];
  def.hidden    = true;
  detail.hidden = false;

  document.getElementById('info-icon').textContent  = t.icon;
  document.getElementById('info-name').textContent  = t.name;
  document.getElementById('info-level').textContent = t.kind;
  document.getElementById('info-blurb').textContent = t.blurb;
  document.getElementById('info-eats').textContent  = t.examples;
  document.getElementById('info-eaten').textContent = t.trait;
}

/* ---------- Deck navigation ---------- */

function cardsForB(mode) {
  switch (mode) {
    case DECK_INTRO_B:    return BIODIVERSITY_INTRO_CARDS;
    case DECK_TREE_B:     return BIODIVERSITY_TREE_CARDS;
    case DECK_HOTSPOTS_B: return BIODIVERSITY_HOTSPOTS_CARDS;
    case DECK_THREATS_B:  return BIODIVERSITY_THREATS_CARDS;
    default:              return [];
  }
}

function activeCardsB() { return cardsForB(deckModeB); }

function moveCardB(delta) {
  if (typeof isCheckinActive === 'function' && isCheckinActive()) return;
  const cards = activeCardsB();
  const next  = cardIndexB + delta;

  if (next >= cards.length) {
    const i = DECK_ORDER_B.indexOf(deckModeB);
    if (i < DECK_ORDER_B.length - 1) launchCheckinBio(deckModeB, DECK_ORDER_B[i + 1]);
    return;
  }
  if (next < 0) {
    const i = DECK_ORDER_B.indexOf(deckModeB);
    if (i > 0) {
      const prev = DECK_ORDER_B[i - 1];
      enterDeckB(prev, cardsForB(prev).length - 1);
    }
    return;
  }

  cardIndexB = next;
  renderCardB();
}

function enterDeckB(mode, index) {
  deckModeB  = mode;
  cardIndexB = index;
  renderCardB();
}

function launchCheckinBio(fromDeck, toDeck) {
  const qs = (typeof BIODIVERSITY_CHECKINS !== 'undefined') && BIODIVERSITY_CHECKINS[fromDeck];
  if (!qs || !qs.length || typeof startCheckin !== 'function') { enterDeckB(toDeck, 0); return; }
  const titles = { intro: 'Check-in — What biodiversity is', tree: 'Check-in — Tree of life', hotspots: 'Check-in — Where diversity lives' };
  const next   = { intro: 'Continue to Tree of life →', tree: 'Continue to Hotspots →', hotspots: 'Continue to Threats & conservation →' };
  startCheckin(qs, { slug: `biodiversity:${fromDeck}`, title: titles[fromDeck], nextLabel: next[fromDeck], onDone: () => enterDeckB(toDeck, 0) });
}

function renderCardB() {
  const backBtn = document.getElementById('section-back');
  if (backBtn) backBtn.hidden = (deckModeB === DECK_INTRO_B);

  const cards   = activeCardsB();
  const card    = cards[cardIndexB];
  const titleEl = document.querySelector('.flashcard-title');
  const bodyEl  = document.querySelector('.flashcard-body');
  const counter = document.getElementById('card-counter');
  const prevBtn = document.getElementById('card-prev');
  const nextBtn = document.getElementById('card-next');
  const label   = document.getElementById('section-label');

  if (titleEl) titleEl.textContent = card.title;
  if (bodyEl)  bodyEl.innerHTML    = pickBodyB(card.body);
  if (counter) counter.textContent = `${cardIndexB + 1} / ${cards.length}`;
  if (prevBtn) prevBtn.disabled    = (deckModeB === DECK_INTRO_B && cardIndexB === 0);

  if (nextBtn) {
    const atLast = (cardIndexB === cards.length - 1);
    nextBtn.disabled = (deckModeB === DECK_THREATS_B && atLast);
    const nextLabel = {
      [DECK_INTRO_B]:    'Tree of life →',
      [DECK_TREE_B]:     'Where diversity lives →',
      [DECK_HOTSPOTS_B]: 'Threats & conservation →'
    }[deckModeB];
    if (atLast && nextLabel) {
      nextBtn.textContent = nextLabel;
      nextBtn.classList.add('flashcard-btn-wide');
    } else {
      nextBtn.textContent = '→';
      nextBtn.classList.remove('flashcard-btn-wide');
    }
  }

  if (label) {
    label.textContent = ({
      [DECK_INTRO_B]:    'What biodiversity is',
      [DECK_TREE_B]:     'Tree of life',
      [DECK_HOTSPOTS_B]: 'Hotspots of diversity',
      [DECK_THREATS_B]:  'Threats & conservation'
    })[deckModeB];
  }

  const cardEl = document.querySelector('.flashcard');
  if (cardEl) {
    cardEl.classList.remove('flashcard-enter');
    void cardEl.offsetWidth;
    cardEl.classList.add('flashcard-enter');
  }
}

function pickBodyB(body) {
  if (typeof body === 'string') return body;
  if (!body) return '';
  const track = (typeof getTrack === 'function') ? getTrack() : 'high';
  return body[track] || body.high || body.middle || '';
}
