/* =========================================================
   photosynthesis.js — Photosynthesis module interaction

   Three card decks share one flashcard UI:
     intro → light reactions → Calvin cycle

   The SVG has one persistent chloroplast, with element groups
   that fade in / move depending on which deck and phase we're
   in. The SVG root's scene class (.photo-svg-lr / .photo-svg-cc)
   determines which set of elements is visible at all.

   Depends on: data/photosynthesis-content.js
   ========================================================= */

const DECK_INTRO  = 'intro';
const DECK_LIGHT  = 'light';
const DECK_CALVIN = 'calvin';

const PHASE_NAMES = {
  light: ['Light hits chlorophyll', 'Water is split', 'Electron transport', 'ATP + NADPH made'],
  calvin: ['CO₂ enters stroma', 'Carbon fixation', 'Reduction to G3P', 'Glucose released']
};

let deckMode  = DECK_INTRO;
let cardIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  if (typeof PHOTO_INTRO_CARDS === 'undefined' || !PHOTO_INTRO_CARDS.length) return;

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
    case DECK_INTRO:  return PHOTO_INTRO_CARDS;
    case DECK_LIGHT:  return PHOTO_LIGHT_REACTIONS;
    case DECK_CALVIN: return PHOTO_CALVIN_CYCLE;
    default:          return [];
  }
}

function moveCard(delta) {
  const cards = activeCards();
  const next  = cardIndex + delta;

  if (next >= cards.length) {
    if (deckMode === DECK_INTRO) {
      enterDeck(DECK_LIGHT, 0);
    } else if (deckMode === DECK_LIGHT) {
      enterDeck(DECK_CALVIN, 0);
    }
    return;
  }

  if (next < 0) {
    if (deckMode === DECK_LIGHT) {
      enterDeck(DECK_INTRO, PHOTO_INTRO_CARDS.length - 1);
    } else if (deckMode === DECK_CALVIN) {
      enterDeck(DECK_LIGHT, PHOTO_LIGHT_REACTIONS.length - 1);
    }
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
  if (deckMode === DECK_INTRO) return -1;
  return cardIndex;
}

function onCtaClick() {
  if (deckMode === DECK_LIGHT || deckMode === DECK_CALVIN) {
    cardIndex = 0;
    applyPhaseState(0);
    renderCard();
  }
}

function backToIntro() {
  enterDeck(DECK_INTRO, 0);
}

/* ---------- Scene + phase classes on the SVG ---------- */

function applySceneFor(mode) {
  const svg = document.querySelector('.photo-svg');
  if (!svg) return;

  // Calvin scene during the Calvin deck; light scene for everything else
  // (intro just shows the static chloroplast lit by the sun).
  const showCalvin = (mode === DECK_CALVIN);
  svg.classList.toggle('photo-svg-cc', showCalvin);
  svg.classList.toggle('photo-svg-lr', !showCalvin);
}

function applyPhaseState(phase) {
  const svg = document.querySelector('.photo-svg');
  if (!svg) return;

  for (let i = 0; i < 5; i++) svg.classList.remove(`phase-${i}`);
  if (phase >= 0) svg.classList.add(`phase-${phase}`);

  // Update the phase label at the bottom of the SVG.
  const label = document.getElementById('photo-phase-label');
  if (label) {
    if (deckMode === DECK_LIGHT && phase >= 0) {
      label.textContent = `Light reactions — ${PHASE_NAMES.light[phase]}`;
    } else if (deckMode === DECK_CALVIN && phase >= 0) {
      label.textContent = `Calvin cycle — ${PHASE_NAMES.calvin[phase]}`;
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
    if (deckMode === DECK_LIGHT) {
      cta.hidden      = false;
      cta.textContent = '↺ Restart light reactions';
    } else if (deckMode === DECK_CALVIN) {
      cta.hidden      = false;
      cta.textContent = '↺ Restart Calvin cycle';
    } else {
      cta.hidden = true;
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
    nextBtn.disabled = (deckMode === DECK_CALVIN && atLast);
    if (atLast && deckMode === DECK_INTRO) {
      nextBtn.textContent = 'Start light reactions →';
      nextBtn.classList.add('flashcard-btn-wide');
    } else if (atLast && deckMode === DECK_LIGHT) {
      nextBtn.textContent = 'On to the Calvin cycle →';
      nextBtn.classList.add('flashcard-btn-wide');
    } else {
      nextBtn.textContent = '→';
      nextBtn.classList.remove('flashcard-btn-wide');
    }
  }

  if (label) {
    label.textContent = {
      [DECK_INTRO]:  'Photosynthesis basics',
      [DECK_LIGHT]:  'Light reactions',
      [DECK_CALVIN]: 'Calvin cycle'
    }[deckMode];
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
