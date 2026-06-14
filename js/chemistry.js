/* =========================================================
   chemistry.js — Chemistry of Life module interaction

   Two halves:
     1. Macromolecule builder (left pane)
        - 4 tabs: Carbs, Proteins, Lipids, Nucleic Acids
        - Polymer types (carb/protein/nucleic):
            Click monomers in the pool → they get added to a
            horizontal chain. Each link beyond the first releases
            one water molecule (counted + animated).
        - Lipid type:
            Glycerol shown with 3 fatty-acid slots. Click any
            fatty acid in the pool → it fills the next slot.
            3 ester bonds → 3 water molecules max.
        - "↻ Hydrolyze (clear)" resets to empty.
     2. Four card decks (right pane), same nav pattern as
        ecology.js / selection.js.

   Depends on: data/chemistry-content.js
   ========================================================= */

const DECK_INTRO_C   = 'intro';
const DECK_WATER     = 'water';
const DECK_BUILDING  = 'building';
const DECK_MACRO     = 'macro';
const DECK_ORDER_C   = [DECK_INTRO_C, DECK_WATER, DECK_BUILDING, DECK_MACRO];

const LIPID_SLOTS = 3;

/* ---------- Macromolecule type data ----------
   Each type knows its monomer pool, label vocab, and bond name.
   `shape` controls how each monomer renders in the chain. */
const MACRO_TYPES = {
  carb: {
    label:         'Carbohydrate',
    monomerLabel:  'Monosaccharides',
    polymerLabel:  'polysaccharide',
    bondName:      'glycosidic bond',
    blurb:         'Monosaccharides like glucose link via glycosidic bonds to form long polysaccharides. Each new bond releases one water molecule.',
    shape:         'hexagon',
    monomers: [
      { id: 'glu', name: 'Glucose',   short: 'Glc', color: '#FFB870' },
      { id: 'fru', name: 'Fructose',  short: 'Fru', color: '#FFD86A' },
      { id: 'gal', name: 'Galactose', short: 'Gal', color: '#E89545' }
    ]
  },
  protein: {
    label:         'Protein',
    monomerLabel:  'Amino acids',
    polymerLabel:  'polypeptide',
    bondName:      'peptide bond',
    blurb:         'Amino acids link via peptide bonds to form polypeptides. The R-groups (the colored part) determine how the chain folds into a working protein.',
    shape:         'rounded',
    monomers: [
      { id: 'gly', name: 'Glycine', short: 'Gly', color: '#A584D9' },
      { id: 'ala', name: 'Alanine', short: 'Ala', color: '#6B9FD6' },
      { id: 'leu', name: 'Leucine', short: 'Leu', color: '#5FB890' },
      { id: 'lys', name: 'Lysine',  short: 'Lys', color: '#F07C99' }
    ]
  },
  lipid: {
    label:         'Lipid (Triglyceride)',
    monomerLabel:  'Fatty acids',
    polymerLabel:  'triglyceride',
    bondName:      'ester bond',
    blurb:         'A triglyceride = glycerol + 3 fatty acid tails, linked by ester bonds. Each bond releases one water molecule. Three slots maximum.',
    isLipid:       true,
    monomers: [
      { id: 'sat',  name: 'Saturated',         short: 'Sat',  color: '#FFD86A', kink: 'none' },
      { id: 'mono', name: 'Monounsaturated',   short: 'Mono', color: '#FFB870', kink: 'one'  },
      { id: 'poly', name: 'Polyunsaturated',   short: 'Poly', color: '#E89545', kink: 'two'  }
    ]
  },
  nucleic: {
    label:         'Nucleic Acid',
    monomerLabel:  'Nucleotides',
    polymerLabel:  'nucleic acid strand',
    bondName:      'phosphodiester bond',
    blurb:         'Nucleotides (sugar + phosphate + base) link via phosphodiester bonds between the sugar of one and the phosphate of the next.',
    shape:         'pentagon',
    monomers: [
      { id: 'A', name: 'Adenine',  short: 'A', color: '#5FB890' },
      { id: 'T', name: 'Thymine',  short: 'T', color: '#F5C04A' },
      { id: 'G', name: 'Guanine',  short: 'G', color: '#6B9FD6' },
      { id: 'C', name: 'Cytosine', short: 'C', color: '#E5849C' }
    ]
  }
};

/* ---------- State ---------- */
let activeType = 'carb';
let chain      = [];                       // for polymer types: monomer ids in order
let lipidSlots = new Array(LIPID_SLOTS).fill(null);  // for lipid type
let waterCount = 0;
let deckMode   = DECK_INTRO_C;
let cardIndex  = 0;

document.addEventListener('DOMContentLoaded', () => {
  if (typeof CHEM_INTRO_CARDS === 'undefined' || !CHEM_INTRO_CARDS.length) return;

  setActiveType('carb');
  renderCard();

  document.getElementById('builder-tabs')?.addEventListener('click', e => {
    const btn = e.target.closest('.builder-tab');
    if (btn) setActiveType(btn.dataset.type);
  });

  document.getElementById('monomer-pool')?.addEventListener('click', e => {
    const btn = e.target.closest('.monomer-btn');
    if (btn) addMonomer(btn.dataset.id);
  });

  document.getElementById('clear-chain')?.addEventListener('click', clearBuild);

  document.getElementById('card-prev')?.addEventListener('click', () => moveCard(-1));
  document.getElementById('card-next')?.addEventListener('click', () => moveCard(1));
  document.getElementById('section-back')?.addEventListener('click', () => enterDeck(DECK_INTRO_C, 0));

  document.addEventListener('keydown', e => {
    if (e.target.matches('input, textarea, [contenteditable], button')) return;
    if (e.key === 'ArrowLeft')  moveCard(-1);
    if (e.key === 'ArrowRight') moveCard(1);
  });

  // Re-render the current card when the user flips Middle/High.
  window.addEventListener('trackchanged', renderCard);
});

/* ---------- Builder ---------- */

function setActiveType(type) {
  if (!MACRO_TYPES[type]) return;
  activeType = type;
  chain      = [];
  lipidSlots = new Array(LIPID_SLOTS).fill(null);
  waterCount = 0;

  // Tab pressed state
  document.querySelectorAll('.builder-tab').forEach(b => {
    b.setAttribute('aria-pressed', b.dataset.type === type ? 'true' : 'false');
  });

  const cfg = MACRO_TYPES[type];
  setText('builder-bond-name', cfg.bondName);
  setText('builder-blurb',     cfg.blurb);
  setText('monomer-stat-label', cfg.isLipid ? 'Fatty acids' : 'Monomers');

  renderPool();
  renderCanvas();
  renderStats();
}

function addMonomer(monomerId) {
  const cfg = MACRO_TYPES[activeType];
  const mono = cfg.monomers.find(m => m.id === monomerId);
  if (!mono) return;

  if (cfg.isLipid) {
    const nextSlot = lipidSlots.findIndex(s => s === null);
    if (nextSlot === -1) { flashHint('All 3 slots filled — hit hydrolyze to start over.'); return; }
    lipidSlots[nextSlot] = monomerId;
    waterCount = lipidSlots.filter(s => s !== null).length;
  } else {
    chain.push(monomerId);
    // First monomer alone doesn't form a bond; each one after does.
    waterCount = Math.max(0, chain.length - 1);
  }

  renderCanvas();
  renderStats();
  spawnWaterDrop();

  // Disable pool when lipid is full so the visual stays honest.
  if (cfg.isLipid && lipidSlots.every(s => s !== null)) {
    document.querySelectorAll('.monomer-btn').forEach(b => b.classList.add('disabled'));
  }
}

function clearBuild() {
  chain = [];
  lipidSlots = new Array(LIPID_SLOTS).fill(null);
  waterCount = 0;
  document.querySelectorAll('.monomer-btn').forEach(b => b.classList.remove('disabled'));
  renderCanvas();
  renderStats();
}

/* ---------- Pool rendering ---------- */

function renderPool() {
  const pool = document.getElementById('monomer-pool');
  if (!pool) return;
  const cfg = MACRO_TYPES[activeType];
  document.querySelector('.monomer-pool-label').textContent = cfg.monomerLabel;

  pool.innerHTML = cfg.monomers.map(m => `
    <button class="monomer-btn" type="button" data-id="${m.id}" title="${m.name}">
      ${monomerSvg(m, cfg, /*labelInside=*/true)}
      <span class="monomer-name">${m.name}</span>
    </button>
  `).join('');
}

/* ---------- Canvas rendering ---------- */

function renderCanvas() {
  const canvas = document.getElementById('builder-canvas');
  if (!canvas) return;
  const cfg = MACRO_TYPES[activeType];

  if (cfg.isLipid) {
    canvas.innerHTML = renderLipidCanvas(cfg);
    return;
  }

  // Polymer chain
  if (chain.length === 0) {
    canvas.innerHTML = `<div class="builder-empty">Click any monomer below to start building a ${cfg.polymerLabel}.</div>`;
    return;
  }

  const items = chain.map((id, i) => {
    const m = cfg.monomers.find(x => x.id === id);
    const monomerHtml = `<div class="chain-item">${monomerSvg(m, cfg, true)}</div>`;
    return (i === 0) ? monomerHtml : `<div class="chain-bond" title="${cfg.bondName}"></div>` + monomerHtml;
  }).join('');

  canvas.innerHTML = `<div class="polymer-chain">${items}</div>`;
}

function renderLipidCanvas(cfg) {
  // Glycerol on the left (3 stacked attachment dots), 3 horizontal slots for
  // fatty acids on the right. Each slot is either empty or filled with the
  // monomer the user clicked.
  const slots = lipidSlots.map((id, i) => {
    if (id === null) {
      return `
        <div class="lipid-slot lipid-slot-empty" data-slot="${i}">
          <div class="lipid-bond-stub"></div>
          <div class="lipid-slot-placeholder">empty slot</div>
        </div>`;
    }
    const m = cfg.monomers.find(x => x.id === id);
    return `
      <div class="lipid-slot lipid-slot-filled" data-slot="${i}">
        <div class="lipid-bond" title="${cfg.bondName}"></div>
        ${fattyAcidSvg(m)}
      </div>`;
  }).join('');

  return `
    <div class="lipid-canvas">
      <div class="glycerol" aria-label="Glycerol backbone">
        <span class="glycerol-label">Glycerol</span>
        <div class="glycerol-stack">
          <div class="glycerol-cell">CH₂—OH</div>
          <div class="glycerol-cell">CH—OH</div>
          <div class="glycerol-cell">CH₂—OH</div>
        </div>
      </div>
      <div class="lipid-slots">${slots}</div>
    </div>`;
}

/* ---------- Monomer + fatty-acid SVG ---------- */

function monomerSvg(m, cfg, withLabel) {
  // Shapes: hexagon (carb), rounded square (protein), pentagon (nucleic),
  // pill (lipid pool tile). Inline SVG so the disc + label scale together.
  const SIZE = 54;
  const cx = SIZE / 2, cy = SIZE / 2;
  let shapeEl = '';

  if (cfg.isLipid) {
    // Tiny preview of a fatty acid tail
    return `
      <svg class="monomer-svg shape-tail" viewBox="0 0 100 36" aria-hidden="true">
        ${fattyAcidPath(m, 0, 0, 100, 36, /*inPool=*/true)}
      </svg>`;
  }

  switch (cfg.shape) {
    case 'hexagon': {
      const r = 20;
      const pts = [0, 1, 2, 3, 4, 5].map(i => {
        const a = (Math.PI / 3) * i + Math.PI / 6;
        return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
      }).join(' ');
      shapeEl = `<polygon class="monomer-shape" points="${pts}" fill="${m.color}"/>`;
      break;
    }
    case 'pentagon': {
      const r = 20;
      const pts = [0, 1, 2, 3, 4].map(i => {
        const a = (2 * Math.PI / 5) * i - Math.PI / 2;
        return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
      }).join(' ');
      shapeEl = `<polygon class="monomer-shape" points="${pts}" fill="${m.color}"/>`;
      break;
    }
    case 'rounded':
    default: {
      shapeEl = `<rect class="monomer-shape" x="9" y="9" width="${SIZE - 18}" height="${SIZE - 18}" rx="9" fill="${m.color}"/>`;
      break;
    }
  }

  const labelEl = withLabel
    ? `<text class="monomer-shape-label" x="${cx}" y="${cy + 4}" text-anchor="middle">${m.short}</text>`
    : '';

  return `
    <svg class="monomer-svg" viewBox="0 0 ${SIZE} ${SIZE}" aria-hidden="true">
      ${shapeEl}
      ${labelEl}
    </svg>`;
}

function fattyAcidSvg(m) {
  return `
    <svg class="lipid-tail" viewBox="0 0 220 36" aria-hidden="true">
      ${fattyAcidPath(m, 0, 0, 220, 36, /*inPool=*/false)}
      <text class="monomer-shape-label" x="14" y="22" text-anchor="middle">COOH</text>
    </svg>`;
}

function fattyAcidPath(m, x, y, w, h, inPool) {
  // Head circle (carboxyl group) + a zigzag tail. Kinks come from `m.kink`.
  const headR = h / 2 - 2;
  const headX = x + headR + 2;
  const headY = y + h / 2;

  // Tail zigzag: bumps of ±4px vertical, every 18px horizontal.
  const tailStartX = headX + headR + 2;
  const tailEndX   = x + w - 4;
  const step       = 16;
  const amp        = 5;
  const points     = [];
  let dir = -1;
  for (let cx = tailStartX; cx <= tailEndX; cx += step) {
    points.push(`${cx.toFixed(1)},${(headY + dir * amp).toFixed(1)}`);
    dir *= -1;
  }
  let polyline = `<polyline points="${tailStartX},${headY} ${points.join(' ')} ${tailEndX},${headY}"
                            fill="none" stroke="${m.color}" stroke-width="3.5"
                            stroke-linecap="round" stroke-linejoin="round"/>`;

  // Mark kinks with a small dot for unsaturated, two dots for poly.
  let kinkDots = '';
  if (m.kink === 'one' || m.kink === 'two') {
    const kinkIdx = Math.floor(points.length / 2);
    const [kxStr, kyStr] = points[kinkIdx].split(',');
    kinkDots += `<circle cx="${kxStr}" cy="${kyStr}" r="3" fill="#2D2154"/>`;
  }
  if (m.kink === 'two' && points.length > 4) {
    const kinkIdx2 = Math.floor(points.length / 4);
    const [kxStr, kyStr] = points[kinkIdx2].split(',');
    kinkDots += `<circle cx="${kxStr}" cy="${kyStr}" r="3" fill="#2D2154"/>`;
  }

  const head = `<circle cx="${headX}" cy="${headY}" r="${headR}" fill="${m.color}" stroke="#2D2154" stroke-width="2"/>`;

  return head + polyline + kinkDots;
}

/* ---------- Stats + water drop ---------- */

function renderStats() {
  const cfg = MACRO_TYPES[activeType];
  const monomerCount = cfg.isLipid
    ? lipidSlots.filter(s => s !== null).length
    : chain.length;
  setText('monomer-count', String(monomerCount));
  setText('water-count',   String(waterCount));
}

function spawnWaterDrop() {
  const canvas = document.getElementById('builder-canvas');
  if (!canvas) return;
  const drop = document.createElement('span');
  drop.className = 'water-drop';
  drop.textContent = '💧';
  const rect = canvas.getBoundingClientRect();
  // Random x within the canvas; start near the bottom.
  drop.style.left = (8 + Math.random() * (rect.width - 32)) + 'px';
  drop.style.top  = (rect.height - 18) + 'px';
  canvas.appendChild(drop);
  drop.addEventListener('animationend', () => drop.remove());
}

function flashHint(msg) {
  const hint = document.querySelector('.builder-hint');
  if (!hint) return;
  const orig = hint.innerHTML;
  hint.innerHTML = `⚠️ ${msg}`;
  hint.classList.add('builder-hint-warn');
  setTimeout(() => {
    hint.innerHTML = orig;
    hint.classList.remove('builder-hint-warn');
  }, 1800);
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// Card bodies may be { middle, high } or a plain string. Resolve to a string
// for the current audience track, falling back to whichever track exists.
function pickBody(body) {
  if (typeof body === 'string') return body;
  if (!body) return '';
  const track = (typeof getTrack === 'function') ? getTrack() : 'high';
  return body[track] || body.high || body.middle || '';
}

/* ---------- Deck navigation ---------- */

function cardsFor(mode) {
  switch (mode) {
    case DECK_INTRO_C:  return CHEM_INTRO_CARDS;
    case DECK_WATER:    return CHEM_WATER_CARDS;
    case DECK_BUILDING: return CHEM_BUILDING_CARDS;
    case DECK_MACRO:    return CHEM_MACRO_CARDS;
    default:            return [];
  }
}

function activeCards() { return cardsFor(deckMode); }

function moveCard(delta) {
  const cards = activeCards();
  const next  = cardIndex + delta;

  if (next >= cards.length) {
    const i = DECK_ORDER_C.indexOf(deckMode);
    if (i < DECK_ORDER_C.length - 1) enterDeck(DECK_ORDER_C[i + 1], 0);
    return;
  }

  if (next < 0) {
    const i = DECK_ORDER_C.indexOf(deckMode);
    if (i > 0) {
      const prev = DECK_ORDER_C[i - 1];
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

function renderCard() {
  const backBtn = document.getElementById('section-back');
  if (backBtn) backBtn.hidden = (deckMode === DECK_INTRO_C);

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
  if (prevBtn) prevBtn.disabled    = (deckMode === DECK_INTRO_C && cardIndex === 0);

  if (nextBtn) {
    const atLast = (cardIndex === cards.length - 1);
    nextBtn.disabled = (deckMode === DECK_MACRO && atLast);
    const nextDeckLabel = {
      [DECK_INTRO_C]:  'Water & life →',
      [DECK_WATER]:    'Building polymers →',
      [DECK_BUILDING]: 'The 4 macromolecules →'
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
      [DECK_INTRO_C]:  'Atoms & bonds',
      [DECK_WATER]:    'Water & life',
      [DECK_BUILDING]: 'Building polymers',
      [DECK_MACRO]:    'The 4 macromolecules'
    })[deckMode];
  }

  const cardEl = document.querySelector('.flashcard');
  if (cardEl) {
    cardEl.classList.remove('flashcard-enter');
    void cardEl.offsetWidth;
    cardEl.classList.add('flashcard-enter');
  }
}
