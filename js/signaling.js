/* =========================================================
   signaling.js — Cell Signaling module interactivity

   Left pane: a stepper that walks through reception →
   transduction → response, then a "broken brake" toggle
   that shows what happens in cancer (receptor stuck on,
   continuous division).

   Right pane: 4 flashcard decks.

   Depends on: data/signaling-content.js
   ========================================================= */

const SIG_PHASES = [
  { key: 'rest',     label: 'Resting',
    blurb: 'No signal yet. The receptor sits in the membrane, the cascade proteins are inactive, and the nucleus is quiet.' },
  { key: 'reception', label: 'Reception',
    blurb: 'The ligand binds the receptor. The receptor changes shape — that conformational change is the start of the message.' },
  { key: 'transduction', label: 'Transduction',
    blurb: 'A relay of kinases fires in sequence, each phosphorylating the next. Every step amplifies the signal.' },
  { key: 'response', label: 'Response',
    blurb: 'A transcription factor enters the nucleus and switches a target gene on. The cell starts making a new protein.' }
];

const DECK_S_INTRO    = 'intro';
const DECK_S_RECEPT   = 'reception';
const DECK_S_CASCADE  = 'cascade';
const DECK_S_CANCER   = 'cancer';
const DECK_S_ORDER    = [DECK_S_INTRO, DECK_S_RECEPT, DECK_S_CASCADE, DECK_S_CANCER];

let phaseIdx = 0;
let brokeBrake = false;     // "cancer mode" toggle
let deckMode  = DECK_S_INTRO;
let cardIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  if (typeof SIGNAL_INTRO_CARDS === 'undefined') return;

  renderPhase();
  renderCard();

  document.getElementById('sig-prev')?.addEventListener('click', () => stepPhase(-1));
  document.getElementById('sig-next')?.addEventListener('click', () => stepPhase(1));
  document.getElementById('sig-reset')?.addEventListener('click', () => { phaseIdx = 0; brokeBrake = false; syncCancerToggle(); renderPhase(); });
  document.getElementById('sig-break')?.addEventListener('click', () => {
    brokeBrake = !brokeBrake;
    syncCancerToggle();
    renderPhase();
  });

  document.getElementById('card-prev')?.addEventListener('click', () => moveCard(-1));
  document.getElementById('card-next')?.addEventListener('click', () => moveCard(1));
  document.getElementById('section-back')?.addEventListener('click', () => enterDeck(DECK_S_INTRO, 0));

  document.addEventListener('keydown', e => {
    if (e.target.matches('input, textarea, [contenteditable], button')) return;
    if (e.key === 'ArrowLeft')  moveCard(-1);
    if (e.key === 'ArrowRight') moveCard(1);
  });

  // Re-render the current card when the user flips Middle/High.
  window.addEventListener('trackchanged', renderCard);
});

function stepPhase(delta) {
  if (brokeBrake) return;
  phaseIdx = Math.max(0, Math.min(SIG_PHASES.length - 1, phaseIdx + delta));
  renderPhase();
}

function syncCancerToggle() {
  const btn = document.getElementById('sig-break');
  if (!btn) return;
  btn.setAttribute('aria-pressed', brokeBrake ? 'true' : 'false');
  btn.textContent = brokeBrake ? '✓ Brake removed (cancer mode)' : 'Remove the brake (mutate Ras)';
}

function renderPhase() {
  const svg = document.getElementById('sig-svg');
  if (!svg) return;
  svg.classList.remove('phase-0', 'phase-1', 'phase-2', 'phase-3', 'cancer-mode');
  if (brokeBrake) {
    svg.classList.add('cancer-mode');
  } else {
    svg.classList.add('phase-' + phaseIdx);
  }

  const phase = SIG_PHASES[phaseIdx];
  setText('sig-phase-label', brokeBrake ? 'Cancer mode' : phase.label);
  setText('sig-phase-blurb', brokeBrake
    ? 'A point mutation has locked the Ras switch in its "on" state. The cascade fires nonstop — no ligand needed. The cell divides uncontrollably.'
    : phase.blurb);
  setText('sig-counter', brokeBrake ? '⚠' : `${phaseIdx + 1} / ${SIG_PHASES.length}`);

  const prev = document.getElementById('sig-prev');
  const next = document.getElementById('sig-next');
  if (prev) prev.disabled = brokeBrake || phaseIdx === 0;
  if (next) next.disabled = brokeBrake || phaseIdx === SIG_PHASES.length - 1;
}

/* ---------- Card deck (same pattern as the other modules) ---------- */
function cardsFor(mode) {
  switch (mode) {
    case DECK_S_INTRO:   return SIGNAL_INTRO_CARDS;
    case DECK_S_RECEPT:  return SIGNAL_RECEPTION_CARDS;
    case DECK_S_CASCADE: return SIGNAL_CASCADE_CARDS;
    case DECK_S_CANCER:  return SIGNAL_CANCER_CARDS;
    default:             return [];
  }
}
function activeCards() { return cardsFor(deckMode); }
function moveCard(delta) {
  const cards = activeCards();
  const next  = cardIndex + delta;
  if (next >= cards.length) {
    const i = DECK_S_ORDER.indexOf(deckMode);
    if (i < DECK_S_ORDER.length - 1) enterDeck(DECK_S_ORDER[i + 1], 0);
    return;
  }
  if (next < 0) {
    const i = DECK_S_ORDER.indexOf(deckMode);
    if (i > 0) {
      const prev = DECK_S_ORDER[i - 1];
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
  if (backBtn) backBtn.hidden = (deckMode === DECK_S_INTRO);
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
  if (prevBtn) prevBtn.disabled    = (deckMode === DECK_S_INTRO && cardIndex === 0);
  if (nextBtn) {
    const atLast = (cardIndex === cards.length - 1);
    nextBtn.disabled = (deckMode === DECK_S_CANCER && atLast);
    const nextDeckLabel = {
      [DECK_S_INTRO]:   'Reception →',
      [DECK_S_RECEPT]:  'Transduction & response →',
      [DECK_S_CASCADE]: 'When signaling breaks →'
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
      [DECK_S_INTRO]:   'How cells talk',
      [DECK_S_RECEPT]:  'Reception',
      [DECK_S_CASCADE]: 'Transduction & response',
      [DECK_S_CANCER]:  'When signaling breaks'
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

// Card bodies may be { middle, high } or a plain string. Resolve to a
// string for the current audience track, falling back to whichever track
// exists.
function pickBody(body) {
  if (typeof body === 'string') return body;
  if (!body) return '';
  const track = (typeof getTrack === 'function') ? getTrack() : 'high';
  return body[track] || body.high || body.middle || '';
}
