/* =========================================================
   transport.js — Membrane Transport module

   Left pane: a phospholipid bilayer with three "channels":
     1. Simple diffusion path (just lipid)
     2. Channel protein (facilitated)
     3. Active pump (ATP-driven, against gradient)
   Plus a tonicity slider that shows the cell shrinking,
   staying normal, or swelling based on the outside solute
   concentration.

   Right pane: 4 flashcard decks.
   ========================================================= */

const DECK_T_INTRO    = 'intro';
const DECK_T_PASSIVE  = 'passive';
const DECK_T_TONICITY = 'tonicity';
const DECK_T_ACTIVE   = 'active';
const DECK_T_ORDER    = [DECK_T_INTRO, DECK_T_PASSIVE, DECK_T_TONICITY, DECK_T_ACTIVE];

let tonicity = 0;          // -1 = hypertonic outside, 0 = isotonic, 1 = hypotonic outside
let pumpOn = true;
let deckMode = DECK_T_INTRO;
let cardIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  if (typeof TRANSPORT_INTRO_CARDS === 'undefined') return;

  renderTonicity();
  syncPumpUI();
  renderCard();

  document.getElementById('tonicity-slider')?.addEventListener('input', e => {
    tonicity = Number(e.target.value);
    renderTonicity();
  });
  document.getElementById('pump-toggle')?.addEventListener('click', () => {
    pumpOn = !pumpOn;
    syncPumpUI();
  });

  document.getElementById('card-prev')?.addEventListener('click', () => moveCard(-1));
  document.getElementById('card-next')?.addEventListener('click', () => moveCard(1));
  document.getElementById('section-back')?.addEventListener('click', () => enterDeck(DECK_T_INTRO, 0));

  document.addEventListener('keydown', e => {
    if (e.target.matches('input, textarea, [contenteditable], button')) return;
    if (e.key === 'ArrowLeft')  moveCard(-1);
    if (e.key === 'ArrowRight') moveCard(1);
  });
});

function syncPumpUI() {
  const svg = document.getElementById('transport-svg');
  if (svg) svg.classList.toggle('pump-off', !pumpOn);
  const btn = document.getElementById('pump-toggle');
  if (btn) {
    btn.setAttribute('aria-pressed', pumpOn ? 'true' : 'false');
    btn.textContent = pumpOn ? '✓ ATP pump on' : 'ATP pump off';
  }
}

function renderTonicity() {
  const svg = document.getElementById('cell-svg');
  if (!svg) return;
  svg.classList.remove('hypertonic', 'isotonic', 'hypotonic');
  let label, status, climate, statusClass;
  if (tonicity < -0.33) {
    svg.classList.add('hypertonic'); label = 'Hypertonic';
    climate = 'High solute outside';
    status = '⚠ Water rushes OUT — cell shrinks (crenation).';
    statusClass = 'enzyme-status enzyme-status-warn';
  } else if (tonicity > 0.33) {
    svg.classList.add('hypotonic'); label = 'Hypotonic';
    climate = 'Low solute outside';
    status = '⚠ Water rushes IN — cell swells (may lyse).';
    statusClass = 'enzyme-status enzyme-status-warn';
  } else {
    svg.classList.add('isotonic'); label = 'Isotonic';
    climate = 'Same solute concentration both sides';
    status = '✓ Balanced — no net water movement.';
    statusClass = 'enzyme-status enzyme-status-ok';
  }
  setText('tonicity-label', label);
  setText('tonicity-climate', climate);
  const statusEl = document.getElementById('tonicity-status');
  if (statusEl) {
    statusEl.textContent = status;
    statusEl.className = statusClass;
  }
}

function cardsFor(mode) {
  switch (mode) {
    case DECK_T_INTRO:    return TRANSPORT_INTRO_CARDS;
    case DECK_T_PASSIVE:  return TRANSPORT_PASSIVE_CARDS;
    case DECK_T_TONICITY: return TRANSPORT_TONICITY_CARDS;
    case DECK_T_ACTIVE:   return TRANSPORT_ACTIVE_AND_SAV_CARDS;
    default:              return [];
  }
}
function activeCards() { return cardsFor(deckMode); }
function moveCard(delta) {
  const cards = activeCards();
  const next  = cardIndex + delta;
  if (next >= cards.length) {
    const i = DECK_T_ORDER.indexOf(deckMode);
    if (i < DECK_T_ORDER.length - 1) enterDeck(DECK_T_ORDER[i + 1], 0);
    return;
  }
  if (next < 0) {
    const i = DECK_T_ORDER.indexOf(deckMode);
    if (i > 0) {
      const prev = DECK_T_ORDER[i - 1];
      enterDeck(prev, cardsFor(prev).length - 1);
    }
    return;
  }
  cardIndex = next;
  renderCard();
}
function enterDeck(mode, index) { deckMode = mode; cardIndex = index; renderCard(); }
function renderCard() {
  const backBtn = document.getElementById('section-back');
  if (backBtn) backBtn.hidden = (deckMode === DECK_T_INTRO);
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
  if (prevBtn) prevBtn.disabled    = (deckMode === DECK_T_INTRO && cardIndex === 0);
  if (nextBtn) {
    const atLast = (cardIndex === cards.length - 1);
    nextBtn.disabled = (deckMode === DECK_T_ACTIVE && atLast);
    const nextDeckLabel = {
      [DECK_T_INTRO]:    'Passive transport →',
      [DECK_T_PASSIVE]:  'Tonicity & osmosis →',
      [DECK_T_TONICITY]: 'Active transport & SA/V →'
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
      [DECK_T_INTRO]:    'The membrane',
      [DECK_T_PASSIVE]:  'Passive transport',
      [DECK_T_TONICITY]: 'Tonicity & osmosis',
      [DECK_T_ACTIVE]:   'Active transport & SA/V'
    })[deckMode];
  }
  const cardEl = document.querySelector('.flashcard');
  if (cardEl) {
    cardEl.classList.remove('flashcard-enter');
    void cardEl.offsetWidth;
    cardEl.classList.add('flashcard-enter');
  }
}
function setText(id, text) { const el = document.getElementById(id); if (el) el.textContent = text; }
