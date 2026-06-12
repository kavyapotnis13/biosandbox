/* =========================================================
   mitosis.js — Mitosis module interaction

   Two decks share one flashcard UI: intro and the 5-step
   phase walkthrough. Phase classes on the SVG drive what's
   visible (nucleus, chromosomes, spindle, daughter nuclei,
   cleavage furrow).

   Depends on: data/mitosis-content.js
   ========================================================= */

const DECK_INTRO  = 'intro';
const DECK_PHASES = 'phases';

const PHASE_NAMES = ['Prophase', 'Metaphase', 'Anaphase', 'Telophase', 'Cytokinesis'];

let deckMode  = DECK_INTRO;
let cardIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  if (typeof MITOSIS_INTRO_CARDS === 'undefined' || !MITOSIS_INTRO_CARDS.length) return;

  applyPhaseState(-1);
  renderCard();

  document.getElementById('card-prev')?.addEventListener('click', () => moveCard(-1));
  document.getElementById('card-next')?.addEventListener('click', () => moveCard(1));
  document.getElementById('section-cta')?.addEventListener('click', restartWalkthrough);
  document.getElementById('section-back')?.addEventListener('click', backToIntro);

  document.addEventListener('keydown', e => {
    if (e.target.matches('input, textarea, [contenteditable]')) return;
    if (e.key === 'ArrowLeft')  moveCard(-1);
    if (e.key === 'ArrowRight') moveCard(1);
  });
});

/* ---------- Deck navigation ---------- */

function activeCards() {
  return deckMode === DECK_INTRO ? MITOSIS_INTRO_CARDS : MITOSIS_PHASE_STEPS;
}

function moveCard(delta) {
  const cards = activeCards();
  const next  = cardIndex + delta;

  if (next >= cards.length) {
    if (deckMode === DECK_INTRO) {
      deckMode  = DECK_PHASES;
      cardIndex = 0;
      applyPhaseState(0);
      renderCard();
    }
    return;
  }

  if (next < 0) {
    if (deckMode === DECK_PHASES) {
      deckMode  = DECK_INTRO;
      cardIndex = MITOSIS_INTRO_CARDS.length - 1;
      applyPhaseState(-1);
      renderCard();
    }
    return;
  }

  cardIndex = next;
  if (deckMode === DECK_PHASES) applyPhaseState(cardIndex);
  renderCard();
}

function restartWalkthrough() {
  cardIndex = 0;
  applyPhaseState(0);
  renderCard();
}

function backToIntro() {
  deckMode  = DECK_INTRO;
  cardIndex = 0;
  applyPhaseState(-1);
  renderCard();
}

/* ---------- SVG phase state ---------- */

function applyPhaseState(phase) {
  const svg   = document.querySelector('.mitosis-svg');
  const label = document.getElementById('mitosis-phase-label');
  if (!svg) return;

  for (let i = 0; i < 5; i++) svg.classList.remove(`phase-${i}`);
  if (phase >= 0) svg.classList.add(`phase-${phase}`);

  if (label) {
    label.textContent = (phase >= 0 && phase < PHASE_NAMES.length)
      ? PHASE_NAMES[phase]
      : 'Interphase';
  }
}

/* ---------- Render flashcard + buttons ---------- */

function renderCard() {
  const cards = activeCards();
  const card  = cards[cardIndex];

  const titleEl = document.querySelector('.flashcard-title');
  const bodyEl  = document.querySelector('.flashcard-body');
  const counter = document.getElementById('card-counter');
  const prevBtn = document.getElementById('card-prev');
  const nextBtn = document.getElementById('card-next');
  const label   = document.getElementById('section-label');
  const cta     = document.getElementById('section-cta');
  const backBtn = document.getElementById('section-back');

  if (titleEl) titleEl.textContent = card.title;
  if (bodyEl)  bodyEl.innerHTML    = card.body;
  if (counter) counter.textContent = `${cardIndex + 1} / ${cards.length}`;
  if (prevBtn) prevBtn.disabled    = (deckMode === DECK_INTRO && cardIndex === 0);
  if (backBtn) backBtn.hidden      = (deckMode === DECK_INTRO);
  if (cta)     cta.hidden          = (deckMode !== DECK_PHASES);

  if (nextBtn) {
    nextBtn.disabled = (deckMode === DECK_PHASES && cardIndex === cards.length - 1);
    const atLast = (cardIndex === cards.length - 1);
    if (atLast && deckMode === DECK_INTRO) {
      nextBtn.textContent = 'Start the walkthrough →';
      nextBtn.classList.add('flashcard-btn-wide');
    } else {
      nextBtn.textContent = '→';
      nextBtn.classList.remove('flashcard-btn-wide');
    }
  }

  if (label) {
    label.textContent = deckMode === DECK_INTRO ? 'Mitosis basics' : 'Phase walkthrough';
  }

  const cardEl = document.querySelector('.flashcard');
  if (cardEl) {
    cardEl.classList.remove('flashcard-enter');
    void cardEl.offsetWidth;
    cardEl.classList.add('flashcard-enter');
  }
}
