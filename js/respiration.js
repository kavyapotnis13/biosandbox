/* =========================================================
   respiration.js — Cellular Respiration module interaction

   Four card decks share one flashcard UI:
     intro → glycolysis → Krebs cycle → electron transport chain

   The SVG has one persistent cell + mitochondrion view. Scene
   classes (.scene-gly / .scene-krebs / .scene-etc) determine
   which stage's elements are visible at all; phase classes
   (.phase-0 … .phase-3) drive what's visible within that stage.

   Depends on: data/respiration-content.js
   ========================================================= */

const DECK_INTRO  = 'intro';
const DECK_GLY    = 'gly';
const DECK_KREBS  = 'krebs';
const DECK_ETC    = 'etc';

const PHASE_NAMES = {
  gly:   ['Glucose arrives', 'Split into 2 pyruvate', 'Net 2 ATP + 2 NADH'],
  krebs: ['Pyruvate enters matrix', 'Acetyl-CoA joins cycle', 'CO₂ released', 'Cycle runs twice per glucose'],
  etc:   ['Electrons enter chain', 'H⁺ pumped across membrane', 'ATP synthase spins', 'O₂ accepts electrons']
};

let deckMode  = DECK_INTRO;
let cardIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  if (typeof RESP_INTRO_CARDS === 'undefined' || !RESP_INTRO_CARDS.length) return;

  applySceneFor(deckMode);
  applyPhaseState(-1);
  renderCard();

  document.getElementById('card-prev')?.addEventListener('click', () => moveCard(-1));
  document.getElementById('card-next')?.addEventListener('click', () => moveCard(1));
  document.getElementById('section-cta')?.addEventListener('click', onCtaClick);
  document.getElementById('section-back')?.addEventListener('click', backToIntro);

  document.addEventListener('keydown', e => {
    if (e.target.matches('input, textarea, [contenteditable]')) return;
    if (e.key === 'ArrowLeft')  moveCard(-1);
    if (e.key === 'ArrowRight') moveCard(1);
  });

  // Re-render the current card when the user flips Middle/High.
  window.addEventListener('trackchanged', renderCard);
});

/* ---------- Deck navigation ---------- */

function activeCards() {
  switch (deckMode) {
    case DECK_INTRO: return RESP_INTRO_CARDS;
    case DECK_GLY:   return RESP_GLYCOLYSIS;
    case DECK_KREBS: return RESP_KREBS;
    case DECK_ETC:   return RESP_ETC;
    default:         return [];
  }
}

function moveCard(delta) {
  const cards = activeCards();
  const next  = cardIndex + delta;

  if (next >= cards.length) {
    if (deckMode === DECK_INTRO)      enterDeck(DECK_GLY,   0);
    else if (deckMode === DECK_GLY)   enterDeck(DECK_KREBS, 0);
    else if (deckMode === DECK_KREBS) enterDeck(DECK_ETC,   0);
    return;
  }

  if (next < 0) {
    if (deckMode === DECK_GLY)        enterDeck(DECK_INTRO, RESP_INTRO_CARDS.length - 1);
    else if (deckMode === DECK_KREBS) enterDeck(DECK_GLY,   RESP_GLYCOLYSIS.length - 1);
    else if (deckMode === DECK_ETC)   enterDeck(DECK_KREBS, RESP_KREBS.length - 1);
    return;
  }

  cardIndex = next;
  applyPhaseState(currentPhase());
  renderCard();
}

function enterDeck(mode, index) {
  deckMode  = mode;
  cardIndex = index;
  applySceneFor(mode);
  applyPhaseState(currentPhase());
  renderCard();
}

function currentPhase() {
  return (deckMode === DECK_INTRO) ? -1 : cardIndex;
}

function onCtaClick() {
  if (deckMode === DECK_INTRO) return;
  cardIndex = 0;
  applyPhaseState(0);
  renderCard();
}

function backToIntro() {
  enterDeck(DECK_INTRO, 0);
}

/* ---------- Scene + phase classes on the SVG ---------- */

function applySceneFor(mode) {
  const svg = document.querySelector('.resp-svg');
  if (!svg) return;

  svg.classList.remove('scene-gly', 'scene-krebs', 'scene-etc');
  if (mode === DECK_GLY)        svg.classList.add('scene-gly');
  else if (mode === DECK_KREBS) svg.classList.add('scene-krebs');
  else if (mode === DECK_ETC)   svg.classList.add('scene-etc');
}

function applyPhaseState(phase) {
  const svg = document.querySelector('.resp-svg');
  if (!svg) return;

  for (let i = 0; i < 5; i++) svg.classList.remove(`phase-${i}`);
  if (phase >= 0) svg.classList.add(`phase-${phase}`);

  const label = document.getElementById('resp-phase-label');
  if (label) {
    if (deckMode === DECK_GLY && phase >= 0) {
      label.textContent = `Glycolysis — ${PHASE_NAMES.gly[phase]}`;
    } else if (deckMode === DECK_KREBS && phase >= 0) {
      label.textContent = `Krebs cycle — ${PHASE_NAMES.krebs[phase]}`;
    } else if (deckMode === DECK_ETC && phase >= 0) {
      label.textContent = `Electron transport — ${PHASE_NAMES.etc[phase]}`;
    } else {
      label.textContent = 'Overview';
    }
  }
}

/* ---------- Render flashcard + buttons ---------- */

function renderCard() {
  const cta     = document.getElementById('section-cta');
  const backBtn = document.getElementById('section-back');

  if (backBtn) backBtn.hidden = (deckMode === DECK_INTRO);

  if (cta) {
    if (deckMode === DECK_INTRO) {
      cta.hidden = true;
    } else {
      cta.hidden      = false;
      cta.textContent = ({
        [DECK_GLY]:   '↺ Restart glycolysis',
        [DECK_KREBS]: '↺ Restart Krebs cycle',
        [DECK_ETC]:   '↺ Restart ETC'
      })[deckMode];
    }
  }

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
  if (prevBtn) prevBtn.disabled    = (deckMode === DECK_INTRO && cardIndex === 0);

  if (nextBtn) {
    const atLast = (cardIndex === cards.length - 1);
    nextBtn.disabled = (deckMode === DECK_ETC && atLast);
    if (atLast && deckMode === DECK_INTRO) {
      nextBtn.textContent = 'Start glycolysis →';
      nextBtn.classList.add('flashcard-btn-wide');
    } else if (atLast && deckMode === DECK_GLY) {
      nextBtn.textContent = 'On to the Krebs cycle →';
      nextBtn.classList.add('flashcard-btn-wide');
    } else if (atLast && deckMode === DECK_KREBS) {
      nextBtn.textContent = 'On to the ETC →';
      nextBtn.classList.add('flashcard-btn-wide');
    } else {
      nextBtn.textContent = '→';
      nextBtn.classList.remove('flashcard-btn-wide');
    }
  }

  if (label) {
    label.textContent = ({
      [DECK_INTRO]: 'Respiration basics',
      [DECK_GLY]:   'Glycolysis',
      [DECK_KREBS]: 'Krebs cycle',
      [DECK_ETC]:   'Electron transport chain'
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
