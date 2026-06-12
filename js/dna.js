/* =========================================================
   dna.js — DNA module interaction

   Two decks share one flashcard UI: intro and replication.
   In replication mode, the helix actually animates — rungs
   split apart from top to bottom and new complementary bases
   fade in, syncing with the step text on the right.

   Depends on: data/dna-content.js
   ========================================================= */

const DECK_INTRO       = 'intro';
const DECK_REPLICATION = 'replication';
const DECK_GAME        = 'game';

const COMPLEMENT = { A: 'T', T: 'A', C: 'G', G: 'C' };
const BASES      = ['A', 'T', 'C', 'G'];
const GAME_LEN   = 6;

let deckMode  = DECK_INTRO;
let cardIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  if (typeof DNA_INTRO_CARDS === 'undefined' || !DNA_INTRO_CARDS.length) return;

  enhanceRungs();
  renderHelixAt(HELIX_TOP_Y);
  buildDaughterBackbones();
  renderCard();

  document.getElementById('card-prev')?.addEventListener('click', () => moveCard(-1));
  document.getElementById('card-next')?.addEventListener('click', () => moveCard(1));
  document.getElementById('section-cta')?.addEventListener('click', onCtaClick);
  document.getElementById('section-back')?.addEventListener('click', backToIntro);
  document.getElementById('section-game-btn')?.addEventListener('click', enterGame);

  document.getElementById('base-pool')?.addEventListener('click', e => {
    const btn = e.target.closest('.base-tile[data-base]');
    if (btn) handleBaseClick(btn.dataset.base);
  });

  document.addEventListener('keydown', e => {
    if (e.target.matches('input, textarea, [contenteditable]')) return;
    if (e.key === 'ArrowLeft')  moveCard(-1);
    if (e.key === 'ArrowRight') moveCard(1);
  });
});

/* ---------- Augment SVG rungs with hidden "new" bases ---------- */

function enhanceRungs() {
  const ns = 'http://www.w3.org/2000/svg';
  const rungs = document.querySelectorAll('.dna-helix .rung');

  rungs.forEach((rung, i) => {
    rung.dataset.rungIndex = i;

    const rects = rung.querySelectorAll('rect');
    const texts = rung.querySelectorAll('text');
    if (rects.length < 2 || texts.length < 2) return;

    rects[0].classList.add('old-left');
    rects[1].classList.add('old-right');
    texts[0].classList.add('old-left-label');
    texts[1].classList.add('old-right-label');

    const leftBase  = texts[0].textContent.trim();
    const rightBase = texts[1].textContent.trim();
    const newLeft   = COMPLEMENT[leftBase];   // pairs with the old left template
    const newRight  = COMPLEMENT[rightBase];  // pairs with the old right template

    const y     = parseFloat(rects[0].getAttribute('y'));
    const textY = parseFloat(texts[0].getAttribute('y'));

    rung.appendChild(makeBaseRect(ns, 230, y, newLeft,  'new-of-left'));
    rung.appendChild(makeBaseRect(ns, 310, y, newRight, 'new-of-right'));
    rung.appendChild(makeBaseLabel(ns, 260, textY, newLeft,  'new-of-left-label'));
    rung.appendChild(makeBaseLabel(ns, 340, textY, newRight, 'new-of-right-label'));
  });
}

function makeBaseRect(ns, x, y, base, role) {
  const r = document.createElementNS(ns, 'rect');
  r.setAttribute('x', x);
  r.setAttribute('y', y);
  r.setAttribute('width', 60);
  r.setAttribute('height', 20);
  r.setAttribute('rx', 4);
  r.setAttribute('class', `base base-${base.toLowerCase()} ${role}`);
  return r;
}

function makeBaseLabel(ns, x, y, base, role) {
  const t = document.createElementNS(ns, 'text');
  t.setAttribute('x', x);
  t.setAttribute('y', y);
  t.setAttribute('class', `base-label ${role}`);
  t.textContent = base;
  return t;
}

/* After replication, the result is two side-by-side daughter helices, each
   structurally identical to the original. We clone the intact helix structure
   into two groups (left and right daughter), hidden by default, and fade them
   in at the final phase as the unwound strands fade out. */
function buildDaughterBackbones() {
  const svg = document.querySelector('.dna-helix');
  if (!svg) return;

  ['left', 'right'].forEach(side => {
    const daughter = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    daughter.setAttribute('class', `daughter-helix daughter-${side}`);

    // Intact backbones (computed from the unwinding formula at forkY=top → fully intact).
    const a = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    a.setAttribute('class', 'backbone backbone-a');
    a.setAttribute('d', strandPath('a', HELIX_TOP_Y));
    const b = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    b.setAttribute('class', 'backbone backbone-b');
    b.setAttribute('d', strandPath('b', HELIX_TOP_Y));
    daughter.appendChild(a);
    daughter.appendChild(b);

    // Clone the original rungs (intact, no .split class).
    document.querySelectorAll('.dna-helix > .rung').forEach(r => {
      const clone = r.cloneNode(true);
      clone.classList.remove('split', 'show-new-left', 'show-new-right');
      daughter.appendChild(clone);
    });

    svg.appendChild(daughter);
  });
}

/* ---------- Helix unwinding ----------
   Each strand's x at a given y is computed from:
     - u = how unwound this y is (0 = intact, 1 = fully straight)
     - amplitude = HELIX_AMPLITUDE * (1 - u)    (helix flattens as u grows)
     - separation = FULL_SEPARATION * u         (centers pull apart as u grows)
   u is set by a fork-y: anything below the fork is intact (u=0), anything
   above interpolates linearly from 0 at the fork to 1 at the top. */

const HELIX_TOP_Y       = 40;
const HELIX_BOTTOM_Y    = 600;
const HELIX_CENTER_X    = 300;
const HELIX_AMPLITUDE   = 60;
const HELIX_PERIOD      = 140;
const FULL_SEPARATION   = 70;

function strandX(y, forkY, strand) {
  let u = 0;
  if (forkY > HELIX_TOP_Y && y < forkY) {
    u = Math.min(1, (forkY - y) / (forkY - HELIX_TOP_Y));
  }
  const amp   = HELIX_AMPLITUDE * (1 - u);
  const sep   = FULL_SEPARATION * u;
  const phase = 2 * Math.PI * (y - HELIX_TOP_Y) / HELIX_PERIOD;
  const s     = Math.sin(phase);
  return strand === 'a'
    ? (HELIX_CENTER_X - sep) + amp * s
    : (HELIX_CENTER_X + sep) - amp * s;
}

function strandPath(strand, forkY) {
  const step = 4;
  let d = `M ${strandX(HELIX_TOP_Y, forkY, strand).toFixed(2)} ${HELIX_TOP_Y}`;
  for (let y = HELIX_TOP_Y + step; y <= HELIX_BOTTOM_Y; y += step) {
    d += ` L ${strandX(y, forkY, strand).toFixed(2)} ${y}`;
  }
  return d;
}

function renderHelixAt(forkY) {
  // Use the direct-child selector so the daughter-helix clones aren't affected.
  const a = document.querySelector('.dna-helix > .backbone-a');
  const b = document.querySelector('.dna-helix > .backbone-b');
  if (a) a.setAttribute('d', strandPath('a', forkY));
  if (b) b.setAttribute('d', strandPath('b', forkY));
}

let currentForkY = HELIX_TOP_Y;
let targetForkY  = HELIX_TOP_Y;
let forkRafId    = null;

function setForkPosition(forkY) {
  targetForkY = forkY;
  if (forkRafId == null) forkRafId = requestAnimationFrame(stepFork);
}

function stepFork() {
  const diff = targetForkY - currentForkY;
  if (Math.abs(diff) < 0.5) {
    currentForkY = targetForkY;
    renderHelixAt(currentForkY);
    forkRafId = null;
    return;
  }
  currentForkY += diff * 0.06;
  renderHelixAt(currentForkY);
  forkRafId = requestAnimationFrame(stepFork);
}

/* ---------- Card deck ---------- */

function activeCards() {
  return deckMode === DECK_INTRO ? DNA_INTRO_CARDS : DNA_REPLICATION_STEPS;
}

function moveCard(delta) {
  if (deckMode === DECK_GAME) return;  // game doesn't use deck navigation

  const cards = activeCards();
  const next  = cardIndex + delta;

  // Forward past the end of a section -> transition to next section.
  if (next >= cards.length) {
    if (deckMode === DECK_INTRO) {
      deckMode  = DECK_REPLICATION;
      cardIndex = 0;
      applyPhaseState(0);
      renderCard();
    } else if (deckMode === DECK_REPLICATION) {
      enterGame();
    }
    return;
  }

  // Backward past the start of a section -> previous section's last card.
  if (next < 0) {
    if (deckMode === DECK_REPLICATION) {
      deckMode  = DECK_INTRO;
      cardIndex = DNA_INTRO_CARDS.length - 1;
      applyPhaseState(-1);
      renderCard();
    }
    return;
  }

  cardIndex = next;
  if (deckMode === DECK_REPLICATION) applyPhaseState(cardIndex);
  renderCard();
}

/* ---------- CTA + back button ---------- */

function onCtaClick() {
  if (deckMode === DECK_INTRO) {
    deckMode = DECK_REPLICATION;
    startReplicationAnimation();
  } else if (deckMode === DECK_REPLICATION) {
    startReplicationAnimation();   // "↺ Restart" — reset to step 1
  } else if (deckMode === DECK_GAME) {
    startGame();                   // "↻ New strand"
  }
}

function enterGame() {
  deckMode  = DECK_GAME;
  applyPhaseState(-1);
  startGame();
  renderCard();
}

function backToIntro() {
  deckMode  = DECK_INTRO;
  cardIndex = 0;
  applyPhaseState(-1);
  renderCard();
}

/* ---------- Replication walkthrough (manual stepping) ---------- */

function startReplicationAnimation() {
  // Enter replication mode at step 1. Prev/Next buttons (and ←/→ keys) step
  // through phases — each click triggers a smooth CSS/path transition.
  cardIndex = 0;
  applyPhaseState(0);
  renderCard();
}

/* Cumulative animation state per phase. The fork descends through phases 0-3,
   smoothly unwinding the helix from the top — backbones straighten progressively
   while the bottom stays intertwined. Rungs above the fork split apart. */
function applyPhaseState(phase) {
  const helix = document.querySelector('.dna-helix');
  const rungs = document.querySelectorAll('.dna-helix .rung');
  rungs.forEach(r => r.classList.remove('split', 'show-new-left', 'show-new-right'));
  helix?.classList.remove('separated', 'show-helicase', 'show-polymerase', 'show-okazaki');

  if (phase < 0) {
    setForkPosition(HELIX_TOP_Y);
    return;
  }

  // Fork descends through phases 0-3. Phases 4-5 hold at fully unwound.
  const FORK_POSITIONS = [180, 320, 460, 600, 600, 600];
  setForkPosition(FORK_POSITIONS[Math.min(phase, 5)]);

  // Rungs above the fork get split apart. By phase 3, all 8 split.
  const splitThrough = [2, 4, 6, 8, 8, 8][Math.min(phase, 5)];
  for (let i = 0; i < splitThrough; i++) rungs[i]?.classList.add('split');

  // Step 4 (phase 3): leading strand only — left side new bases appear.
  // Step 5 (phase 4): lagging strand — right side new bases also appear,
  // grouped as Okazaki fragments via .show-okazaki.
  // Step 6 (phase 5): the .replicated cross-fade swaps the working view
  // for two intact daughter helices.
  if (phase >= 3) rungs.forEach(r => r.classList.add('show-new-left'));
  if (phase >= 4) rungs.forEach(r => r.classList.add('show-new-right'));

  // Helicase visible during unzipping (0-2); polymerase during synthesis (3-4).
  helix?.classList.toggle('show-helicase',   phase >= 0 && phase <= 2);
  helix?.classList.toggle('show-polymerase', phase >= 3 && phase <= 4);
  helix?.classList.toggle('show-okazaki',    phase === 4);

  // Phase 5 (ligase seals it): cross-fade from the unwound view to two
  // side-by-side daughter helices — the actual end result of replication.
  helix?.classList.toggle('replicated', phase >= 5);
}

/* ---------- Render flashcard + buttons ---------- */

function renderCard() {
  const deck    = document.getElementById('flashcard-deck');
  const gameEl  = document.getElementById('game-area');
  const cta     = document.getElementById('section-cta');
  const backBtn = document.getElementById('section-back');
  const gameBtn = document.getElementById('section-game-btn');

  // Toggle deck vs game-area visibility based on the current section.
  if (deck)   deck.hidden   = (deckMode === DECK_GAME);
  if (gameEl) gameEl.hidden = (deckMode !== DECK_GAME);

  // The standalone "Try the matching game" button is gone — Next handles it.
  if (gameBtn) gameBtn.hidden = true;
  if (backBtn) {
    backBtn.hidden   = (deckMode === DECK_INTRO);
    backBtn.disabled = false;
  }

  if (cta) {
    if (deckMode === DECK_INTRO) {
      // Hidden — Next button drives the transition.
      cta.hidden = true;
    } else if (deckMode === DECK_REPLICATION) {
      cta.hidden      = false;
      cta.textContent = '↺ Restart walkthrough';
      cta.disabled    = false;
    } else if (deckMode === DECK_GAME) {
      cta.hidden      = false;
      cta.textContent = '↻ New strand';
      cta.disabled    = false;
    }
  }

  if (deckMode === DECK_GAME) return;  // game area renders itself; skip card render

  const cards = activeCards();
  const card  = cards[cardIndex];

  const titleEl = document.querySelector('.flashcard-title');
  const bodyEl  = document.querySelector('.flashcard-body');
  const counter = document.getElementById('card-counter');
  const prevBtn = document.getElementById('card-prev');
  const nextBtn = document.getElementById('card-next');
  const label   = document.getElementById('section-label');

  if (titleEl) titleEl.textContent = card.title;
  if (bodyEl)  bodyEl.innerHTML    = card.body;
  if (counter) counter.textContent = `${cardIndex + 1} / ${cards.length}`;
  // Prev disabled only at the very first card of basics (nothing before).
  if (prevBtn) prevBtn.disabled = (deckMode === DECK_INTRO && cardIndex === 0);

  // Next stays enabled — at the last card it transitions to the next section.
  if (nextBtn) {
    nextBtn.disabled = false;
    const atLast = (cardIndex === cards.length - 1);
    if (atLast && deckMode === DECK_INTRO) {
      nextBtn.textContent = 'Start replication →';
      nextBtn.classList.add('flashcard-btn-wide');
    } else if (atLast && deckMode === DECK_REPLICATION) {
      nextBtn.textContent = 'Try the matching game →';
      nextBtn.classList.add('flashcard-btn-wide');
    } else {
      nextBtn.textContent = '→';
      nextBtn.classList.remove('flashcard-btn-wide');
    }
  }

  if (label) {
    label.textContent = deckMode === DECK_INTRO ? 'DNA basics' : 'DNA replication';
  }

  // Re-trigger fade-in animation by reflowing the card.
  const cardEl = document.querySelector('.flashcard');
  if (cardEl) {
    cardEl.classList.remove('flashcard-enter');
    void cardEl.offsetWidth;
    cardEl.classList.add('flashcard-enter');
  }
}

/* ---------- Base-pair matching mini-game ---------- */

let gameTemplate = [];
let gameAnswer   = [];
let gameNextSlot = 0;

function startGame() {
  gameTemplate = Array.from({length: GAME_LEN}, () => BASES[Math.floor(Math.random() * 4)]);
  gameAnswer   = new Array(GAME_LEN).fill(null);
  gameNextSlot = 0;
  renderGame();
}

function renderGame() {
  const tpl    = document.getElementById('template-bases');
  const ans    = document.getElementById('answer-bases');
  const status = document.getElementById('game-status');
  if (!tpl || !ans) return;

  tpl.innerHTML = gameTemplate.map(b =>
    `<div class="base-tile base-tile-locked base-${b.toLowerCase()}">${b}</div>`
  ).join('');

  ans.innerHTML = gameAnswer.map((b, i) => {
    if (b) return `<div class="base-tile base-tile-locked base-${b.toLowerCase()}">${b}</div>`;
    const activeClass = (i === gameNextSlot) ? ' base-slot-active' : '';
    return `<div class="base-slot${activeClass}"></div>`;
  }).join('');

  if (status) {
    if (gameNextSlot >= GAME_LEN) {
      status.textContent = '✓ Perfect — you built the complementary strand!';
      status.className   = 'game-status game-status-complete';
    } else {
      status.textContent = `${gameNextSlot} / ${GAME_LEN} paired`;
      status.className   = 'game-status';
    }
  }
}

function handleBaseClick(base) {
  if (deckMode !== DECK_GAME)            return;
  if (gameNextSlot >= GAME_LEN)          return;

  const expected = COMPLEMENT[gameTemplate[gameNextSlot]];
  if (base === expected) {
    gameAnswer[gameNextSlot] = base;
    gameNextSlot++;
    renderGame();
  } else {
    flashGameError();
  }
}

function flashGameError() {
  const status = document.getElementById('game-status');
  if (status) {
    status.textContent = '✗ Not a match — A pairs with T, C pairs with G.';
    status.className   = 'game-status game-status-error';
  }
  const slot = document.querySelector('.base-slot-active');
  if (slot) {
    slot.classList.add('base-slot-shake');
    setTimeout(() => slot.classList.remove('base-slot-shake'), 350);
  }
}
