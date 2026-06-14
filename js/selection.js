/* =========================================================
   selection.js — Natural Selection module interaction

   Two halves:
     1. Population simulator (left pane)
        - 20 creatures, each light or dark
        - User picks a habitat (light or dark background)
        - "Run a generation" → mismatched creatures are picked off
          by predators, survivors reproduce until pop is back to 20
        - Stats: generation counter, current % light/dark,
          sparkline of % dark across generations
     2. Four card decks (right pane)
        - intro, mechanisms, Hardy-Weinberg, speciation
        - Same forward/back nav pattern as heredity.js

   Depends on: data/selection-content.js
   ========================================================= */

const DECK_INTRO       = 'intro';
const DECK_MECHANISMS  = 'mechanisms';
const DECK_HW          = 'hw';
const DECK_SPECIATION  = 'speciation';

const POP_SIZE = 20;
// Probability a creature is eaten by a predator each generation.
// Camouflaged (color matches habitat) survive much more often.
const MORTALITY_MATCHED   = 0.15;
const MORTALITY_MISMATCHED = 0.65;
// Tiny chance a child has the opposite color from its parent.
const MUTATION_RATE = 0.03;
// Sparkline keeps at most this many points before scrolling.
const SPARK_MAX_POINTS = 30;

let deckMode  = DECK_INTRO;
let cardIndex = 0;

let environment = 'light';      // 'light' or 'dark'
let generation  = 0;
let population  = [];           // array of 'light' | 'dark'
let history     = [];           // % dark per generation (including gen 0)

document.addEventListener('DOMContentLoaded', () => {
  if (typeof SELECTION_INTRO_CARDS === 'undefined' || !SELECTION_INTRO_CARDS.length) return;

  initPopulation();
  renderHabitat();
  renderStats();
  renderCard();

  document.getElementById('card-prev')?.addEventListener('click', () => moveCard(-1));
  document.getElementById('card-next')?.addEventListener('click', () => moveCard(1));
  document.getElementById('section-back')?.addEventListener('click', backToIntro);

  document.getElementById('run-gen')?.addEventListener('click', runGeneration);
  document.getElementById('reset-sim')?.addEventListener('click', resetSim);

  document.querySelectorAll('.env-option').forEach(btn => {
    btn.addEventListener('click', () => setEnvironment(btn.dataset.env));
  });

  document.addEventListener('keydown', e => {
    if (e.target.matches('input, textarea, [contenteditable], button')) return;
    if (e.key === 'ArrowLeft')  moveCard(-1);
    if (e.key === 'ArrowRight') moveCard(1);
  });

  // Re-render the current card when the user flips Middle/High.
  window.addEventListener('trackchanged', renderCard);
});

/* ---------- Deck navigation ---------- */

const DECK_ORDER = [DECK_INTRO, DECK_MECHANISMS, DECK_HW, DECK_SPECIATION];

function cardsFor(mode) {
  switch (mode) {
    case DECK_INTRO:      return SELECTION_INTRO_CARDS;
    case DECK_MECHANISMS: return SELECTION_MECHANISMS;
    case DECK_HW:         return SELECTION_HARDY_WEINBERG;
    case DECK_SPECIATION: return SELECTION_SPECIATION;
    default:              return [];
  }
}

function activeCards() { return cardsFor(deckMode); }

function moveCard(delta) {
  const cards = activeCards();
  const next  = cardIndex + delta;

  if (next >= cards.length) {
    const i = DECK_ORDER.indexOf(deckMode);
    if (i < DECK_ORDER.length - 1) enterDeck(DECK_ORDER[i + 1], 0);
    return;
  }

  if (next < 0) {
    const i = DECK_ORDER.indexOf(deckMode);
    if (i > 0) {
      const prev = DECK_ORDER[i - 1];
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

function backToIntro() {
  enterDeck(DECK_INTRO, 0);
}

/* ---------- Simulation logic ---------- */

function initPopulation() {
  population = [];
  for (let i = 0; i < POP_SIZE; i++) {
    population.push(i < POP_SIZE / 2 ? 'light' : 'dark');
  }
  shuffle(population);
  generation = 0;
  history = [pctDark()];
}

function setEnvironment(env) {
  if (env !== 'light' && env !== 'dark') return;
  environment = env;
  document.querySelectorAll('.env-option').forEach(btn => {
    btn.setAttribute('aria-pressed', btn.dataset.env === env ? 'true' : 'false');
  });
  const bg = document.getElementById('habitat-bg');
  if (bg) bg.setAttribute('class', `habitat-bg habitat-bg-${env}`);
}

function runGeneration() {
  // Step 1: predators eat. Mismatched creatures have higher mortality.
  const survivors = population.filter(color => {
    const mortality = (color === environment) ? MORTALITY_MATCHED : MORTALITY_MISMATCHED;
    return Math.random() > mortality;
  });

  // Safety net: if everyone died (rare), seed one random survivor so the sim doesn't collapse.
  if (survivors.length === 0) {
    survivors.push(Math.random() < 0.5 ? 'light' : 'dark');
  }

  // Step 2: survivors reproduce until population is back to POP_SIZE.
  const nextGen = [];
  while (nextGen.length < POP_SIZE) {
    const parent = survivors[Math.floor(Math.random() * survivors.length)];
    const child  = (Math.random() < MUTATION_RATE)
      ? (parent === 'light' ? 'dark' : 'light')
      : parent;
    nextGen.push(child);
  }
  shuffle(nextGen);
  population = nextGen;

  generation++;
  history.push(pctDark());
  if (history.length > SPARK_MAX_POINTS) history.shift();

  renderHabitat();
  renderStats();
}

function resetSim() {
  initPopulation();
  renderHabitat();
  renderStats();
}

function pctDark() {
  const dark = population.filter(c => c === 'dark').length;
  return Math.round((dark / population.length) * 100);
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

/* ---------- Rendering ---------- */

function renderHabitat() {
  const layer = document.getElementById('creature-layer');
  if (!layer) return;

  const COLS = 5, ROWS = 4;
  const W = 360, H = 240;
  const MX = 36, MY = 36;
  const colW = (W - MX * 2) / (COLS - 1);
  const rowH = (H - MY * 2) / (ROWS - 1);

  const svgNs = 'http://www.w3.org/2000/svg';
  layer.innerHTML = '';
  for (let i = 0; i < population.length; i++) {
    const c = i % COLS;
    const r = Math.floor(i / COLS);
    // Slight random jitter so the population doesn't look like a perfect grid.
    const jx = (((i * 17) % 11) - 5) * 0.8;
    const jy = (((i * 23) % 9)  - 4) * 0.8;
    const cx = MX + c * colW + jx;
    const cy = MY + r * rowH + jy;

    const g = document.createElementNS(svgNs, 'g');
    g.setAttribute('class', `creature creature-${population[i]}`);
    g.setAttribute('transform', `translate(${cx} ${cy})`);
    g.innerHTML = creatureSvg();
    layer.appendChild(g);
  }
}

function creatureSvg() {
  // The colors come from CSS via .creature-light / .creature-dark, so the
  // path only needs structure. Stroke color is inherited (#2D2154 from CSS).
  return `
    <ellipse class="creature-body" cx="0" cy="0" rx="14" ry="11"/>
    <circle class="creature-eye" cx="-4.2" cy="-2.5" r="1.3"/>
    <circle class="creature-eye" cx="4.2"  cy="-2.5" r="1.3"/>
    <path   class="creature-smile" d="M-4 3 Q0 5.5 4 3"/>
  `;
}

function renderStats() {
  const dark  = population.filter(c => c === 'dark').length;
  const light = population.length - dark;
  const pctD  = Math.round((dark / population.length) * 100);
  const pctL  = 100 - pctD;

  setText('gen-counter', String(generation));
  setText('pct-light', `${pctL}%`);
  setText('pct-dark',  `${pctD}%`);

  const barL = document.getElementById('freq-bar-light');
  const barD = document.getElementById('freq-bar-dark');
  if (barL) barL.style.width = `${pctL}%`;
  if (barD) barD.style.width = `${pctD}%`;

  renderSparkline();
}

function renderSparkline() {
  const path = document.getElementById('sparkline-path');
  if (!path) return;

  // Map each history point to (x, y) inside the 360x60 viewBox.
  // Newest point on the right; oldest scrolls off the left once we hit MAX.
  const W = 360, H = 60, PAD = 4;
  const n = history.length;
  if (n === 0) { path.setAttribute('points', '0,30'); return; }

  // X grows over the full width; if we have < SPARK_MAX_POINTS the line just
  // doesn't fill the panel yet.
  const denom = Math.max(SPARK_MAX_POINTS - 1, 1);
  const points = history.map((pct, i) => {
    const x = (i / denom) * W;
    const y = PAD + (1 - pct / 100) * (H - PAD * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  path.setAttribute('points', points);
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

/* ---------- Render flashcard + buttons ---------- */

function renderCard() {
  const backBtn = document.getElementById('section-back');
  if (backBtn) backBtn.hidden = (deckMode === DECK_INTRO);

  const cards   = activeCards();
  const card    = cards[cardIndex];
  const titleEl = document.querySelector('.flashcard-title');
  const bodyEl  = document.querySelector('.flashcard-body');
  const counter = document.getElementById('card-counter');
  const prevBtn = document.getElementById('card-prev');
  const nextBtn = document.getElementById('card-next');
  const label   = document.getElementById('section-label');

  if (titleEl) titleEl.textContent = card.title;
  if (bodyEl)  bodyEl.innerHTML    = pickBody(card.body);
  if (counter) counter.textContent = `${cardIndex + 1} / ${cards.length}`;

  if (prevBtn) prevBtn.disabled = (deckMode === DECK_INTRO && cardIndex === 0);

  if (nextBtn) {
    const atLast = (cardIndex === cards.length - 1);
    nextBtn.disabled = (deckMode === DECK_SPECIATION && atLast);
    const nextDeckLabel = {
      [DECK_INTRO]:      'Mechanisms of evolution →',
      [DECK_MECHANISMS]: 'Hardy-Weinberg →',
      [DECK_HW]:         'Speciation →'
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
      [DECK_INTRO]:      'Evolution basics',
      [DECK_MECHANISMS]: 'Mechanisms of evolution',
      [DECK_HW]:         'Hardy-Weinberg equilibrium',
      [DECK_SPECIATION]: 'Speciation'
    })[deckMode];
  }

  const cardEl = document.querySelector('.flashcard');
  if (cardEl) {
    cardEl.classList.remove('flashcard-enter');
    void cardEl.offsetWidth;
    cardEl.classList.add('flashcard-enter');
  }
}

// Card bodies may be { middle, high } or a plain string. Resolve to a
// string for the current audience track, falling back to whichever track
// exists.
function pickBody(body) {
  if (typeof body === 'string') return body;
  if (!body) return '';
  const track = (typeof getTrack === 'function') ? getTrack() : 'high';
  return body[track] || body.high || body.middle || '';
}
