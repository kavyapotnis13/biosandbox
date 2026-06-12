/* =========================================================
   protein.js — Protein Synthesis module interaction

   Three card decks share one flashcard UI:
     intro → transcription → translation → codon game

   The SVG has two scenes:
     scene-tx (transcription, inside the nucleus)
     scene-tl (translation, at the ribosome)
   The active scene is set by toggling .protein-svg-tx /
   .protein-svg-tl on the SVG root.

   Within each scene, phase classes (.phase-0 … .phase-4) drive
   which elements are visible and where the polymerase / ribosome
   are positioned.

   Depends on: data/protein-content.js
   ========================================================= */

const DECK_INTRO         = 'intro';
const DECK_TRANSCRIPTION = 'transcription';
const DECK_TRANSLATION   = 'translation';
const DECK_GAME          = 'game';

let deckMode  = DECK_INTRO;
let cardIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  if (typeof PROTEIN_INTRO_CARDS === 'undefined' || !PROTEIN_INTRO_CARDS.length) return;

  applySceneFor(deckMode);
  applyPhaseState(-1);
  renderCard();

  document.getElementById('card-prev')?.addEventListener('click', () => moveCard(-1));
  document.getElementById('card-next')?.addEventListener('click', () => moveCard(1));
  document.getElementById('section-cta')?.addEventListener('click', onCtaClick);
  document.getElementById('section-back')?.addEventListener('click', backToIntro);

  document.getElementById('aa-choices')?.addEventListener('click', e => {
    const btn = e.target.closest('.aa-tile[data-aa]');
    if (btn) handleAaClick(btn.dataset.aa);
  });

  document.addEventListener('keydown', e => {
    if (e.target.matches('input, textarea, [contenteditable]')) return;
    if (e.key === 'ArrowLeft')  moveCard(-1);
    if (e.key === 'ArrowRight') moveCard(1);
  });
});

/* ---------- Card deck navigation ---------- */

function activeCards() {
  switch (deckMode) {
    case DECK_INTRO:         return PROTEIN_INTRO_CARDS;
    case DECK_TRANSCRIPTION: return PROTEIN_TRANSCRIPTION_STEPS;
    case DECK_TRANSLATION:   return PROTEIN_TRANSLATION_STEPS;
    default:                 return [];
  }
}

function moveCard(delta) {
  if (deckMode === DECK_GAME) return;

  const cards = activeCards();
  const next  = cardIndex + delta;

  // Forward off the end of a deck → move to the next section.
  if (next >= cards.length) {
    if (deckMode === DECK_INTRO) {
      enterDeck(DECK_TRANSCRIPTION, 0);
    } else if (deckMode === DECK_TRANSCRIPTION) {
      enterDeck(DECK_TRANSLATION, 0);
    } else if (deckMode === DECK_TRANSLATION) {
      enterGame();
    }
    return;
  }

  // Backward past the start of a deck → land on the last card of the previous one.
  if (next < 0) {
    if (deckMode === DECK_TRANSCRIPTION) {
      enterDeck(DECK_INTRO, PROTEIN_INTRO_CARDS.length - 1);
    } else if (deckMode === DECK_TRANSLATION) {
      enterDeck(DECK_TRANSCRIPTION, PROTEIN_TRANSCRIPTION_STEPS.length - 1);
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
  // The intro doesn't drive any SVG animation — show the static scene.
  if (deckMode === DECK_INTRO || deckMode === DECK_GAME) return -1;
  return cardIndex;
}

/* ---------- CTA + back button ---------- */

function onCtaClick() {
  if (deckMode === DECK_TRANSCRIPTION || deckMode === DECK_TRANSLATION) {
    cardIndex = 0;
    applyPhaseState(0);
    renderCard();
  } else if (deckMode === DECK_GAME) {
    startGame();
  }
}

function enterGame() {
  deckMode = DECK_GAME;
  applySceneFor(DECK_GAME);
  applyPhaseState(-1);
  startGame();
  renderCard();
}

function backToIntro() {
  enterDeck(DECK_INTRO, 0);
}

/* ---------- Scene + phase state on the SVG ---------- */

function applySceneFor(mode) {
  const svg = document.querySelector('.protein-svg');
  if (!svg) return;

  // Translation scene during translation deck; transcription scene for everything else.
  // (The game and intro fall back to the transcription scene as a neutral default.)
  const showTl = (mode === DECK_TRANSLATION);
  svg.classList.toggle('protein-svg-tl', showTl);
  svg.classList.toggle('protein-svg-tx', !showTl);
}

function applyPhaseState(phase) {
  const svg = document.querySelector('.protein-svg');
  if (!svg) return;

  // Wipe any previous phase-* classes.
  for (let i = 0; i < 8; i++) svg.classList.remove(`phase-${i}`);
  if (phase >= 0) svg.classList.add(`phase-${phase}`);

  // mRNA-base reveals during transcription (phases 2-4 reveal progressively).
  if (deckMode === DECK_TRANSCRIPTION) {
    const reveal = [0, 0, 2, 4, 6][Math.max(0, Math.min(phase, 4))];
    for (let i = 1; i <= 6; i++) {
      const el  = svg.querySelector(`.mrna-base-${i}`);
      const lbl = svg.querySelector(`.mrna-label-${i}`);
      if (el)  el.classList.toggle('visible',  i <= reveal);
      if (lbl) lbl.classList.toggle('visible', i <= reveal);
    }
  }

  // Polypeptide chain reveals during translation (phases 1-4).
  if (deckMode === DECK_TRANSLATION) {
    const beads = [0, 1, 2, 3, 5][Math.max(0, Math.min(phase, 4))];
    for (let i = 1; i <= 5; i++) {
      const dot = svg.querySelector(`.aa-bead-${i}`);
      const lbl = svg.querySelector(`.aa-bead-label[data-bead="${i}"]`);
      if (dot) dot.classList.toggle('visible', i <= beads);
      if (lbl) lbl.classList.toggle('visible', i <= beads);
    }
  }
}

/* ---------- Flashcard + button rendering ---------- */

function renderCard() {
  const deck    = document.getElementById('flashcard-deck');
  const gameEl  = document.getElementById('game-area');
  const cta     = document.getElementById('section-cta');
  const backBtn = document.getElementById('section-back');

  if (deck)   deck.hidden   = (deckMode === DECK_GAME);
  if (gameEl) gameEl.hidden = (deckMode !== DECK_GAME);

  if (backBtn) backBtn.hidden = (deckMode === DECK_INTRO);

  if (cta) {
    if (deckMode === DECK_TRANSCRIPTION) {
      cta.hidden      = false;
      cta.textContent = '↺ Restart transcription';
    } else if (deckMode === DECK_TRANSLATION) {
      cta.hidden      = false;
      cta.textContent = '↺ Restart translation';
    } else if (deckMode === DECK_GAME) {
      cta.hidden      = false;
      cta.textContent = '↻ New protein';
    } else {
      cta.hidden = true;
    }
  }

  if (deckMode === DECK_GAME) return;

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

  // Prev disabled only at the very first card of the very first deck.
  if (prevBtn) prevBtn.disabled = (deckMode === DECK_INTRO && cardIndex === 0);

  // Next stays enabled. At the last card of each deck, widen it and label
  // it with what comes next — same affordance as the DNA module.
  if (nextBtn) {
    nextBtn.disabled = false;
    const atLast = (cardIndex === cards.length - 1);
    if (atLast && deckMode === DECK_INTRO) {
      nextBtn.textContent = 'Start transcription →';
      nextBtn.classList.add('flashcard-btn-wide');
    } else if (atLast && deckMode === DECK_TRANSCRIPTION) {
      nextBtn.textContent = 'On to translation →';
      nextBtn.classList.add('flashcard-btn-wide');
    } else if (atLast && deckMode === DECK_TRANSLATION) {
      nextBtn.textContent = 'Try the codon game →';
      nextBtn.classList.add('flashcard-btn-wide');
    } else {
      nextBtn.textContent = '→';
      nextBtn.classList.remove('flashcard-btn-wide');
    }
  }

  if (label) {
    label.textContent = {
      [DECK_INTRO]:         'Protein basics',
      [DECK_TRANSCRIPTION]: 'Transcription',
      [DECK_TRANSLATION]:   'Translation'
    }[deckMode];
  }

  const cardEl = document.querySelector('.flashcard');
  if (cardEl) {
    cardEl.classList.remove('flashcard-enter');
    void cardEl.offsetWidth;
    cardEl.classList.add('flashcard-enter');
  }
}

/* ---------- Codon decoder mini-game ---------- */

const GAME_PROTEIN_LEN = 5;            // 5 codons → 5 amino acids
const AA_CHOICE_COUNT  = 4;            // 1 correct + 3 distractors

let gameCodons = [];                   // chosen mRNA codons for this round
let gameStep   = 0;                    // how many we've answered correctly
let gameChain  = [];                   // amino acids placed so far

function startGame() {
  if (typeof CODON_TABLE === 'undefined') return;
  const codingCodons = Object.keys(CODON_TABLE).filter(c => CODON_TABLE[c] !== 'STOP');
  gameCodons = [];
  for (let i = 0; i < GAME_PROTEIN_LEN; i++) {
    gameCodons.push(codingCodons[Math.floor(Math.random() * codingCodons.length)]);
  }
  gameStep  = 0;
  gameChain = [];
  buildCodonChart();
  renderGame();
}

/* The codon chart is a standard genetic-code table: rows grouped by 1st base,
   columns by 2nd base, sub-rows by 3rd base. Built once when the game starts;
   the cell matching the current codon gets highlighted on each step. */
function buildCodonChart() {
  const host = document.getElementById('codon-chart');
  if (!host || typeof CODON_TABLE === 'undefined') return;

  const order = ['U', 'C', 'A', 'G'];
  let html = '<table class="codon-table">';
  html += '<thead><tr><th></th>';
  order.forEach(b => { html += `<th>${b}</th>`; });
  html += '<th></th></tr></thead><tbody>';

  order.forEach(b1 => {
    order.forEach((b3, rowIdx) => {
      html += '<tr>';
      // 1st-base label spans 4 rows, shown only on the first.
      if (rowIdx === 0) {
        html += `<th class="ct-base-row" rowspan="4">${b1}</th>`;
      }
      order.forEach(b2 => {
        const codon = b1 + b2 + b3;
        const aa    = CODON_TABLE[codon];
        const stop  = (aa === 'STOP') ? ' ct-stop' : '';
        html += `<td class="ct-cell${stop}" data-codon="${codon}">
                   <span class="ct-codon">${codon}</span>
                   <span class="ct-aa">${aa === 'STOP' ? '—' : aa}</span>
                 </td>`;
      });
      html += `<th class="ct-base-col">${b3}</th>`;
      html += '</tr>';
    });
  });
  html += '</tbody></table>';
  host.innerHTML = html;
}

function renderGame() {
  const codonEl   = document.getElementById('codon-display');
  const choicesEl = document.getElementById('aa-choices');
  const chainEl   = document.getElementById('chain-bases');
  const status    = document.getElementById('game-status');
  if (!codonEl || !choicesEl || !chainEl) return;

  const done = gameStep >= GAME_PROTEIN_LEN;

  // Codon prompt
  codonEl.textContent = done ? '✓' : gameCodons[gameStep];

  // Amino-acid choice tiles
  if (done) {
    choicesEl.innerHTML = '';
  } else {
    const correct  = CODON_TABLE[gameCodons[gameStep]];
    const options  = buildChoices(correct);
    choicesEl.innerHTML = options.map(aa =>
      `<button class="aa-tile" type="button" data-aa="${aa}">
         <span class="aa-tile-short">${aa}</span>
         <span class="aa-tile-name">${AMINO_ACID_NAMES[aa] || ''}</span>
       </button>`
    ).join('');
  }

  // Growing protein chain
  chainEl.innerHTML = '';
  for (let i = 0; i < GAME_PROTEIN_LEN; i++) {
    if (i < gameChain.length) {
      chainEl.insertAdjacentHTML('beforeend',
        `<div class="chain-bead chain-bead-filled">${gameChain[i]}</div>`);
    } else {
      const active = (i === gameStep && !done) ? ' chain-bead-active' : '';
      chainEl.insertAdjacentHTML('beforeend',
        `<div class="chain-bead${active}"></div>`);
    }
  }

  // Status line
  if (status) {
    if (done) {
      status.textContent = `✓ Done! You built ${gameChain.join('–')}.`;
      status.className   = 'game-status game-status-complete';
    } else {
      status.textContent = `${gameStep} / ${GAME_PROTEIN_LEN} amino acids placed`;
      status.className   = 'game-status';
    }
  }
}

function buildChoices(correct) {
  const pool = Array.from(new Set(Object.values(CODON_TABLE)))
    .filter(aa => aa !== 'STOP' && aa !== correct);

  const distractors = [];
  while (distractors.length < AA_CHOICE_COUNT - 1 && pool.length) {
    const i = Math.floor(Math.random() * pool.length);
    distractors.push(pool.splice(i, 1)[0]);
  }
  const choices = [correct, ...distractors];
  // Shuffle
  for (let i = choices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [choices[i], choices[j]] = [choices[j], choices[i]];
  }
  return choices;
}

function handleAaClick(aa) {
  if (deckMode !== DECK_GAME)         return;
  if (gameStep >= GAME_PROTEIN_LEN)   return;

  const correct = CODON_TABLE[gameCodons[gameStep]];
  if (aa === correct) {
    gameChain.push(aa);
    gameStep++;
    renderGame();
  } else {
    flashGameError(aa);
  }
}

function flashGameError(wrongAa) {
  const status = document.getElementById('game-status');
  if (status) {
    status.textContent = `✗ Not quite — ${gameCodons[gameStep]} doesn't code for ${wrongAa}.`;
    status.className   = 'game-status game-status-error';
  }
  const btn = document.querySelector(`.aa-tile[data-aa="${wrongAa}"]`);
  if (btn) {
    btn.classList.add('aa-tile-shake');
    setTimeout(() => btn.classList.remove('aa-tile-shake'), 350);
  }
}
