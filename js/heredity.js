/* =========================================================
   heredity.js — Heredity module interaction

   Three card decks: intro, Punnett-square walkthrough, beyond-
   Mendel. The Punnett square on the left is always interactive
   (click any parent allele to cycle B ↔ b and watch the grid +
   ratios update). The walkthrough deck doesn't constrain it —
   the cards explain how the tool works, and the user can play.

   Depends on: data/heredity-content.js
   ========================================================= */

const DECK_INTRO   = 'intro';
const DECK_PUNNETT = 'punnett';
const DECK_BEYOND  = 'beyond';

let deckMode  = DECK_INTRO;
let cardIndex = 0;

// Parent allele state — each parent has two alleles. Defaults to Bb × Bb.
let parents = {
  1: ['B', 'b'],
  2: ['B', 'b']
};

document.addEventListener('DOMContentLoaded', () => {
  if (typeof HEREDITY_INTRO_CARDS === 'undefined' || !HEREDITY_INTRO_CARDS.length) return;

  renderPunnett();
  renderCard();

  document.getElementById('card-prev')?.addEventListener('click', () => moveCard(-1));
  document.getElementById('card-next')?.addEventListener('click', () => moveCard(1));
  document.getElementById('section-cta')?.addEventListener('click', restartWalkthrough);
  document.getElementById('section-back')?.addEventListener('click', backToIntro);

  // Allele cycle on click — change either parent's allele.
  document.getElementById('punnett-tool')?.addEventListener('click', e => {
    const btn = e.target.closest('.allele-btn');
    if (!btn) return;
    const p   = btn.dataset.parent;
    const pos = parseInt(btn.dataset.pos, 10);
    parents[p][pos] = cycleAllele(parents[p][pos]);
    renderPunnett();
  });

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
    case DECK_INTRO:   return HEREDITY_INTRO_CARDS;
    case DECK_PUNNETT: return HEREDITY_PUNNETT_STEPS;
    case DECK_BEYOND:  return HEREDITY_BEYOND_MENDEL;
    default:           return [];
  }
}

function moveCard(delta) {
  const cards = activeCards();
  const next  = cardIndex + delta;

  if (next >= cards.length) {
    if (deckMode === DECK_INTRO) {
      enterDeck(DECK_PUNNETT, 0);
    } else if (deckMode === DECK_PUNNETT) {
      enterDeck(DECK_BEYOND, 0);
    }
    return;
  }

  if (next < 0) {
    if (deckMode === DECK_PUNNETT) {
      enterDeck(DECK_INTRO, HEREDITY_INTRO_CARDS.length - 1);
    } else if (deckMode === DECK_BEYOND) {
      enterDeck(DECK_PUNNETT, HEREDITY_PUNNETT_STEPS.length - 1);
    }
    return;
  }

  cardIndex = next;
  applyPhaseHighlight();
  renderCard();
}

function enterDeck(mode, index) {
  deckMode  = mode;
  cardIndex = index;
  applyPhaseHighlight();
  renderCard();
}

function restartWalkthrough() {
  cardIndex = 0;
  applyPhaseHighlight();
  renderCard();
}

function backToIntro() {
  enterDeck(DECK_INTRO, 0);
}

/* ---------- Punnett square logic ---------- */

function cycleAllele(allele) {
  // Cycle uppercase ↔ lowercase of the same letter (B ↔ b).
  return allele === allele.toUpperCase() ? allele.toLowerCase() : allele.toUpperCase();
}

function comboFor(a, b) {
  // Standard genotype order: uppercase first (e.g., "Bb" not "bB", "BB", "bb").
  const upper = [a, b].filter(x => x === x.toUpperCase());
  const lower = [a, b].filter(x => x === x.toLowerCase());
  return upper.join('') + lower.join('');
}

function renderPunnett() {
  const [p1a, p1b] = parents[1];
  const [p2a, p2b] = parents[2];

  // Parent allele button labels
  document.querySelectorAll('.allele-btn').forEach(btn => {
    const p   = btn.dataset.parent;
    const pos = parseInt(btn.dataset.pos, 10);
    const a   = parents[p][pos];
    btn.textContent = a;
    btn.classList.toggle('allele-dominant',  a === a.toUpperCase());
    btn.classList.toggle('allele-recessive', a === a.toLowerCase());
  });

  // Grid headers (top = parent 1, side = parent 2)
  setText('col-0', p1a);
  setText('col-1', p1b);
  setText('row-0', p2a);
  setText('row-1', p2b);

  // Offspring boxes — combinations of (parent 1 col allele) + (parent 2 row allele)
  const grid = [
    [comboFor(p1a, p2a), comboFor(p1b, p2a)],
    [comboFor(p1a, p2b), comboFor(p1b, p2b)]
  ];
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 2; c++) {
      const cell = document.getElementById(`cell-${r}${c}`);
      if (cell) {
        cell.textContent = grid[r][c];
        cell.classList.remove('phenotype-dominant', 'phenotype-recessive');
        const isRecessive = grid[r][c] === grid[r][c].toLowerCase();
        cell.classList.add(isRecessive ? 'phenotype-recessive' : 'phenotype-dominant');
      }
    }
  }

  // Tally ratios from the 4 offspring boxes.
  const boxes = [grid[0][0], grid[0][1], grid[1][0], grid[1][1]];
  const counts = {};
  for (const g of boxes) counts[g] = (counts[g] || 0) + 1;

  // Genotype ratio — sort: homozygous dominant, heterozygous, homozygous recessive
  const sortedGenotypes = Object.keys(counts).sort((a, b) => {
    const score = g => g.split('').filter(c => c === c.toLowerCase()).length;
    return score(a) - score(b);
  });
  const genotypeText = sortedGenotypes.map(g => `${counts[g]} ${g}`).join(' : ');

  let dom = 0, rec = 0;
  for (const g of boxes) {
    if (g === g.toLowerCase()) rec++; else dom++;
  }
  const phenotypeParts = [];
  if (dom) phenotypeParts.push(`${dom} dominant`);
  if (rec) phenotypeParts.push(`${rec} recessive`);
  const phenotypeText = phenotypeParts.join(' : ') || '—';

  setText('genotype-ratio',  genotypeText);
  setText('phenotype-ratio', phenotypeText);
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

/* ---------- Walkthrough phase highlighting ---------- */

function applyPhaseHighlight() {
  // Light visual cue: during the walkthrough deck, highlight whichever part
  // of the tool the current step is describing.
  const tool = document.getElementById('punnett-tool');
  if (!tool) return;

  tool.classList.remove('focus-parents', 'focus-headers', 'focus-boxes', 'focus-ratios');

  if (deckMode === DECK_PUNNETT) {
    if      (cardIndex === 0) tool.classList.add('focus-parents');
    else if (cardIndex === 1) tool.classList.add('focus-headers');
    else if (cardIndex === 2) tool.classList.add('focus-boxes');
    else if (cardIndex === 3) tool.classList.add('focus-ratios');
  }
}

/* ---------- Render flashcard + buttons ---------- */

function renderCard() {
  const cta     = document.getElementById('section-cta');
  const backBtn = document.getElementById('section-back');

  if (backBtn) backBtn.hidden = (deckMode === DECK_INTRO);

  if (cta) {
    if (deckMode === DECK_PUNNETT) {
      cta.hidden      = false;
      cta.textContent = '↺ Restart walkthrough';
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
    nextBtn.disabled = (deckMode === DECK_BEYOND && atLast);
    if (atLast && deckMode === DECK_INTRO) {
      nextBtn.textContent = 'Walk through a Punnett square →';
      nextBtn.classList.add('flashcard-btn-wide');
    } else if (atLast && deckMode === DECK_PUNNETT) {
      nextBtn.textContent = 'Beyond Mendel →';
      nextBtn.classList.add('flashcard-btn-wide');
    } else {
      nextBtn.textContent = '→';
      nextBtn.classList.remove('flashcard-btn-wide');
    }
  }

  if (label) {
    label.textContent = ({
      [DECK_INTRO]:   'Heredity basics',
      [DECK_PUNNETT]: 'Punnett square walkthrough',
      [DECK_BEYOND]:  'Beyond Mendel'
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
