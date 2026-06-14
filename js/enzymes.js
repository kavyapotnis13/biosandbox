/* =========================================================
   enzymes.js — Enzymes module interactivity

   Left pane: an enzyme + substrate cycle.
     - Pick an enzyme (Pepsin, Amylase, Trypsin) — each has its
       own optimal pH + temp.
     - Drag pH and temperature sliders.
     - The substrate animates through 4 phases: approach → bind
       → react → release. The cycle duration scales inversely
       with the current activity rate, so the student literally
       sees the reaction speed change.
     - When rate falls below a threshold, the enzyme denatures
       (loses its active-site shape) and the substrate just
       bounces off until conditions improve.
     - Counters show reactions/sec and total products made.
     - Two mini-charts plot the activity bell curves vs temp
       and vs pH, with a marker for the current value.

   Right pane: 4 flashcard decks (same nav pattern as the
   other module pages).

   Depends on: data/enzymes-content.js
   ========================================================= */

const ENZYMES = {
  amylase: {
    name: 'Amylase',
    where: 'Saliva',
    substrate: 'Starch',
    product:   'Maltose',
    optPH:   7.0, sigmaPH:   1.6,
    optTemp: 37,  sigmaTemp: 12
  },
  pepsin: {
    name: 'Pepsin',
    where: 'Stomach',
    substrate: 'Protein',
    product:   'Peptides',
    optPH:   2.0, sigmaPH:   1.2,
    optTemp: 37,  sigmaTemp: 12
  },
  trypsin: {
    name: 'Trypsin',
    where: 'Small intestine',
    substrate: 'Peptides',
    product:   'Amino acids',
    optPH:   8.0, sigmaPH:   1.4,
    optTemp: 37,  sigmaTemp: 12
  }
};

const DENATURE_RATE = 0.05;     // below this combined rate → denatured
const DENATURE_TEMP = 65;        // above this, irreversibly denatured this session
const MIN_CYCLE_MS  = 1200;      // shortest substrate-cycle duration (at rate=1)
const MAX_CYCLE_MS  = 14000;     // longest cycle at rate ~= DENATURE_RATE

/* ---------- Deck order (Z-axis for the right pane) ---------- */
const DECK_E_INTRO   = 'intro';
const DECK_E_ACTIVE  = 'active';
const DECK_E_FACTORS = 'factors';
const DECK_E_PATHWAY = 'pathway';
const DECK_E_ORDER   = [DECK_E_INTRO, DECK_E_ACTIVE, DECK_E_FACTORS, DECK_E_PATHWAY];

/* ---------- State ---------- */
let enzymeKey = 'amylase';
let temp      = 37;
let pH        = 7.0;
let products  = 0;
let denaturedThisSession = false;   // sticky once temp goes too high
let cycleHandle = null;
let cycleStartTs = 0;
let lastRpsTs   = 0;
let recentCycleTimes = [];

let deckMode  = DECK_E_INTRO;
let cardIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  if (typeof ENZYME_INTRO_CARDS === 'undefined') return;

  buildEnzymeButtons();
  renderEnzymeInfo();
  renderActivity();
  renderCard();
  scheduleNextCycle();

  document.getElementById('temp-slider')?.addEventListener('input', e => {
    temp = Number(e.target.value);
    if (temp >= DENATURE_TEMP) denaturedThisSession = true;
    renderActivity();
  });
  document.getElementById('ph-slider')?.addEventListener('input', e => {
    pH = Number(e.target.value);
    renderActivity();
  });
  document.getElementById('reset-conditions')?.addEventListener('click', () => {
    temp = 37; pH = ENZYMES[enzymeKey].optPH; denaturedThisSession = false;
    products = 0;
    syncSliderUIs();
    renderActivity();
  });

  document.getElementById('card-prev')?.addEventListener('click', () => moveCard(-1));
  document.getElementById('card-next')?.addEventListener('click', () => moveCard(1));
  document.getElementById('section-back')?.addEventListener('click', () => enterDeck(DECK_E_INTRO, 0));

  document.addEventListener('keydown', e => {
    if (e.target.matches('input, textarea, [contenteditable], button')) return;
    if (e.key === 'ArrowLeft')  moveCard(-1);
    if (e.key === 'ArrowRight') moveCard(1);
  });

  // Re-render the current card when the user flips Middle/High.
  window.addEventListener('trackchanged', renderCard);
});

/* ---------- Enzyme picker ---------- */

function buildEnzymeButtons() {
  const wrap = document.getElementById('enzyme-picker');
  if (!wrap) return;
  wrap.innerHTML = Object.entries(ENZYMES).map(([key, e]) => `
    <button class="enzyme-pick" type="button" data-key="${key}" aria-pressed="${key === enzymeKey ? 'true' : 'false'}">
      <span class="enzyme-pick-name">${e.name}</span>
      <span class="enzyme-pick-meta">${e.where} · pH ${e.optPH}</span>
    </button>
  `).join('');
  wrap.addEventListener('click', ev => {
    const btn = ev.target.closest('.enzyme-pick');
    if (!btn) return;
    enzymeKey = btn.dataset.key;
    denaturedThisSession = false;
    pH = ENZYMES[enzymeKey].optPH;
    syncSliderUIs();
    renderEnzymeInfo();
    renderActivity();
    document.querySelectorAll('.enzyme-pick').forEach(b => {
      b.setAttribute('aria-pressed', b.dataset.key === enzymeKey ? 'true' : 'false');
    });
  });
}

function syncSliderUIs() {
  const t = document.getElementById('temp-slider');
  const p = document.getElementById('ph-slider');
  if (t) t.value = temp;
  if (p) p.value = pH;
}

function renderEnzymeInfo() {
  const e = ENZYMES[enzymeKey];
  setText('enzyme-name', e.name);
  setText('enzyme-where', e.where);
  setText('substrate-label', e.substrate);
  setText('product-label', e.product);
}

/* ---------- Activity math + rendering ---------- */

function gaussian(x, mu, sigma) {
  const z = (x - mu) / sigma;
  return Math.exp(-(z * z));
}

function currentRate() {
  if (denaturedThisSession) return 0;
  const e = ENZYMES[enzymeKey];
  const rT = gaussian(temp, e.optTemp, e.sigmaTemp);
  const rP = gaussian(pH,   e.optPH,   e.sigmaPH);
  return Math.max(0, Math.min(1, rT * rP));
}

function isDenatured() {
  return denaturedThisSession || currentRate() < DENATURE_RATE;
}

function cycleDuration(rate) {
  if (rate < DENATURE_RATE) return MAX_CYCLE_MS;
  // Linear in 1/rate so very low rates feel sluggish but visible.
  return Math.round(MIN_CYCLE_MS + (MAX_CYCLE_MS - MIN_CYCLE_MS) * (1 - rate));
}

function renderActivity() {
  const r = currentRate();
  const denat = isDenatured();

  setText('temp-readout', `${temp}°C`);
  setText('ph-readout', pH.toFixed(1));
  setText('rate-readout', `${Math.round(r * 100)}%`);
  setText('products-readout', String(products));

  const svg = document.getElementById('enzyme-svg');
  if (svg) {
    svg.classList.toggle('denatured', denat);
    svg.style.setProperty('--cycle', cycleDuration(r) + 'ms');
  }

  const status = document.getElementById('enzyme-status');
  if (status) {
    if (denat) {
      status.textContent = denaturedThisSession
        ? '⚠ Denatured — heat unfolded the protein. Reset to recover.'
        : '⚠ Off-optimum — almost no reactions. Try sliding back toward the bell curves.';
      status.className = 'enzyme-status enzyme-status-warn';
    } else if (r > 0.9) {
      status.textContent = '✓ At the optimum — maximum reaction rate.';
      status.className = 'enzyme-status enzyme-status-ok';
    } else {
      status.textContent = `Running at ${Math.round(r * 100)}% of max rate.`;
      status.className = 'enzyme-status';
    }
  }

  drawActivityCharts();
}

/* Draw two small bell-curve charts showing activity vs temperature
   and activity vs pH for the current enzyme. A vertical line marks
   the user's current slider value. */
function drawActivityCharts() {
  const e = ENZYMES[enzymeKey];
  drawCurve('temp-chart', 0, 100, temp, x => gaussian(x, e.optTemp, e.sigmaTemp),
            `${e.optTemp}°C`, '0', '100°C');
  drawCurve('ph-chart',   1, 14,  pH,   x => gaussian(x, e.optPH,   e.sigmaPH),
            `pH ${e.optPH}`, '1', '14');
}

function drawCurve(id, xMin, xMax, marker, fn, optLabel, leftLabel, rightLabel) {
  const svg = document.getElementById(id);
  if (!svg) return;
  const W = 280, H = 84, PAD_X = 22, PAD_T = 14, PAD_B = 22;
  const innerW = W - 2 * PAD_X;
  const innerH = H - PAD_T - PAD_B;
  const xScale = x => PAD_X + ((x - xMin) / (xMax - xMin)) * innerW;
  const yScale = y => PAD_T + (1 - y) * innerH;

  let d = '';
  const STEPS = 60;
  for (let i = 0; i <= STEPS; i++) {
    const x = xMin + (i / STEPS) * (xMax - xMin);
    const y = fn(x);
    d += (i === 0 ? 'M' : 'L') + xScale(x).toFixed(1) + ' ' + yScale(y).toFixed(1);
  }
  const markerX = xScale(marker);
  const markerY = yScale(fn(marker));
  svg.innerHTML = `
    <line x1="${PAD_X}" y1="${PAD_T + innerH}" x2="${PAD_X + innerW}" y2="${PAD_T + innerH}" stroke="var(--color-border)" stroke-width="1"/>
    <path d="${d}" fill="none" stroke="var(--color-ink)" stroke-width="1.5" opacity="0.7"/>
    <line x1="${markerX.toFixed(1)}" y1="${PAD_T}" x2="${markerX.toFixed(1)}" y2="${PAD_T + innerH}" stroke="var(--color-primary)" stroke-width="1.2" stroke-dasharray="3 3"/>
    <circle cx="${markerX.toFixed(1)}" cy="${markerY.toFixed(1)}" r="3.5" fill="var(--color-primary)" stroke="var(--color-bg)" stroke-width="1.5"/>
    <text x="${PAD_X}" y="${H - 6}" font-family="var(--font-mono)" font-size="9" fill="var(--color-muted)">${leftLabel}</text>
    <text x="${PAD_X + innerW}" y="${H - 6}" font-family="var(--font-mono)" font-size="9" text-anchor="end" fill="var(--color-muted)">${rightLabel}</text>
    <text x="${markerX.toFixed(1)}" y="${PAD_T - 2}" font-family="var(--font-mono)" font-size="9" font-weight="600" text-anchor="middle" fill="var(--color-primary)">${optLabel}</text>
  `;
}

/* ---------- Substrate cycle ---------- */

function scheduleNextCycle() {
  if (cycleHandle) clearTimeout(cycleHandle);
  const r = currentRate();
  const dur = cycleDuration(r);
  cycleStartTs = Date.now();

  const svg = document.getElementById('enzyme-svg');
  if (svg) {
    svg.classList.remove('cycle-run');
    void svg.offsetWidth;  // restart animation
    svg.classList.add('cycle-run');
  }

  cycleHandle = setTimeout(() => {
    if (!isDenatured()) {
      products += 1;
      recentCycleTimes.push(Date.now());
      while (recentCycleTimes.length && recentCycleTimes[0] < Date.now() - 6000) {
        recentCycleTimes.shift();
      }
      const rps = recentCycleTimes.length / 6;
      setText('rps-readout', rps.toFixed(2));
      setText('products-readout', String(products));
    }
    scheduleNextCycle();
  }, dur);
}

/* ---------- Card deck ---------- */

function cardsFor(mode) {
  switch (mode) {
    case DECK_E_INTRO:   return ENZYME_INTRO_CARDS;
    case DECK_E_ACTIVE:  return ENZYME_ACTIVE_SITE_CARDS;
    case DECK_E_FACTORS: return ENZYME_FACTORS_CARDS;
    case DECK_E_PATHWAY: return ENZYME_PATHWAY_CARDS;
    default:             return [];
  }
}

function activeCards() { return cardsFor(deckMode); }

function moveCard(delta) {
  const cards = activeCards();
  const next  = cardIndex + delta;
  if (next >= cards.length) {
    const i = DECK_E_ORDER.indexOf(deckMode);
    if (i < DECK_E_ORDER.length - 1) enterDeck(DECK_E_ORDER[i + 1], 0);
    return;
  }
  if (next < 0) {
    const i = DECK_E_ORDER.indexOf(deckMode);
    if (i > 0) {
      const prev = DECK_E_ORDER[i - 1];
      enterDeck(prev, cardsFor(prev).length - 1);
    }
    return;
  }
  cardIndex = next;
  renderCard();
}

function enterDeck(mode, index) {
  deckMode = mode; cardIndex = index;
  renderCard();
}

function renderCard() {
  const backBtn = document.getElementById('section-back');
  if (backBtn) backBtn.hidden = (deckMode === DECK_E_INTRO);

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
  if (prevBtn) prevBtn.disabled    = (deckMode === DECK_E_INTRO && cardIndex === 0);

  if (nextBtn) {
    const atLast = (cardIndex === cards.length - 1);
    nextBtn.disabled = (deckMode === DECK_E_PATHWAY && atLast);
    const nextDeckLabel = {
      [DECK_E_INTRO]:   'Active site →',
      [DECK_E_ACTIVE]:  'Temp, pH, inhibitors →',
      [DECK_E_FACTORS]: 'Pathways & regulation →'
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
      [DECK_E_INTRO]:   'Catalysts of life',
      [DECK_E_ACTIVE]:  'Active site & induced fit',
      [DECK_E_FACTORS]: 'Temp, pH, inhibitors',
      [DECK_E_PATHWAY]: 'Pathways & regulation'
    })[deckMode];
  }
  const cardEl = document.querySelector('.flashcard');
  if (cardEl) {
    cardEl.classList.remove('flashcard-enter');
    void cardEl.offsetWidth;
    cardEl.classList.add('flashcard-enter');
  }
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
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
