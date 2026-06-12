/* =========================================================
   cell.js — Cell Explorer interaction logic

   Animal and plant cells live on separate pages. Each page
   tells this script which type it is via:
     <body data-cell-type="animal">  or  "plant"

   Click an organelle → info panel updates + exploration logged.
   Hover or focus → soft glow on that organelle.
   "Take a tour" → cycles through the organelles of THIS page's
   cell type on a timer.
   Audience track switch → re-renders the panel in the new track.

   Depends on: data/cell-content.js (CELL_CONTENT, ORGANELLE_ORDER)
               js/progress.js  (getTrack, markExplored, getProgress)
   ========================================================= */

const PAGE_CELL_TYPE = document.body.dataset.cellType || 'animal';
const TOUR_STEP_MS = 3500;

// Total parts = unique organelles across BOTH cell types.
const ALL_ORGANELLES = new Set([
  ...ORGANELLE_ORDER.animal,
  ...ORGANELLE_ORDER.plant
]);

let currentSelected = null;
let tourActive = false;
let tourTimer = null;
let tourIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  initOrganelles();
  bindTourButton();
  listenForTrackChange();
  refreshExploredCounter();
});

/* ---------- Organelle click + keyboard ---------- */

function initOrganelles() {
  document.querySelectorAll('.organelle').forEach(g => {
    if (g.dataset.bound === 'true') return;
    g.dataset.bound = 'true';
    g.addEventListener('click', () => selectOrganelle(g.dataset.organelle));
    g.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectOrganelle(g.dataset.organelle);
      }
    });
  });
}

/* ---------- Render info panel for an organelle ---------- */

function selectOrganelle(key) {
  const content = CELL_CONTENT[key];
  if (!content) return;

  document.querySelectorAll('.organelle.selected').forEach(g => g.classList.remove('selected'));
  const target = document.querySelector(`.organelle[data-organelle="${key}"]`);
  if (target) target.classList.add('selected');
  currentSelected = key;

  if (tourActive && target) showTourArrow(target);
  else hideTourArrow();

  const track = getTrack();
  const funcText = content.function[track] || content.function.high;

  const panel = document.getElementById('info-panel');
  panel.innerHTML = `
    <div class="info-content">
      <h2 class="organelle-name">${content.name}</h2>
      <p class="organelle-function">${funcText}</p>
      <div class="did-you-know">
        <p class="dyk-label">💡 Did you know?</p>
        <p class="dyk-text">${content.didYouKnow}</p>
      </div>
      <button class="tour-button" id="tour-button" type="button">
        ${tourActive ? '⏸ Stop tour' : '▷ Take a guided tour'}
      </button>
    </div>
  `;

  bindTourButton();
  markExplored('cell', key);
  refreshExploredCounter();
}

/* ---------- Explored counter (sticky footer bar) ---------- */

function refreshExploredCounter() {
  const progress = getProgress();
  const count = progress.cell.explored.filter(k => ALL_ORGANELLES.has(k)).length;
  const total = ALL_ORGANELLES.size;

  const countEl = document.getElementById('explored-count');
  const totalEl = document.getElementById('explored-total');
  const fillEl = document.getElementById('progress-mini-fill');
  if (countEl) countEl.textContent = count;
  if (totalEl) totalEl.textContent = total;
  if (fillEl) fillEl.style.width = `${(count / total) * 100}%`;
}

/* ---------- Guided tour ---------- */

function bindTourButton() {
  const btn = document.getElementById('tour-button');
  if (btn) btn.addEventListener('click', toggleTour);
}

function toggleTour() {
  if (tourActive) stopTour();
  else startTour();
}

function startTour() {
  tourActive = true;
  tourIndex = 0;
  advanceTour();
}

function advanceTour() {
  const order = ORGANELLE_ORDER[PAGE_CELL_TYPE];
  if (!tourActive || tourIndex >= order.length) {
    stopTour();
    return;
  }
  selectOrganelle(order[tourIndex]);
  tourIndex++;
  tourTimer = setTimeout(advanceTour, TOUR_STEP_MS);
}

function stopTour() {
  tourActive = false;
  if (tourTimer) {
    clearTimeout(tourTimer);
    tourTimer = null;
  }
  hideTourArrow();
  if (currentSelected) selectOrganelle(currentSelected);
}

/* ---------- Tour arrow positioning ---------- */

function showTourArrow(organelleEl) {
  const arrow = document.getElementById('tour-arrow');
  if (!arrow) return;

  // Explicit target wins (set via data-arrow-x / data-arrow-y on multi-instance
  // organelles like ribosomes, mitochondria — their bbox center lands in empty space).
  const ax = organelleEl.dataset.arrowX;
  const ay = organelleEl.dataset.arrowY;
  let cx, topY, bottomY;

  if (ax !== undefined && ay !== undefined) {
    cx = parseFloat(ax);
    const targetY = parseFloat(ay);
    topY = targetY - 18;  // arrow tip lands just above the target point
    bottomY = targetY + 18;
  } else {
    let bbox;
    try { bbox = organelleEl.getBBox(); } catch (e) { arrow.style.display = 'none'; return; }
    // Skip arrow for full-cell layers (cytoplasm, membrane, cytoskeleton, cell wall) —
    // their bbox covers the whole diagram, so an arrow has nowhere meaningful to point.
    if (bbox.width > 360 || bbox.height > 300) {
      arrow.style.display = 'none';
      return;
    }
    cx = bbox.x + bbox.width / 2;
    topY = bbox.y - 4;
    bottomY = bbox.y + bbox.height + 4;
  }

  // Prefer arrow above. If there's no room near the top edge, flip below and rotate 180°.
  const roomAbove = topY > 75;
  const y = roomAbove ? topY : bottomY;
  const rotation = roomAbove ? 0 : 180;

  arrow.setAttribute('transform', `translate(${cx} ${y}) rotate(${rotation})`);
  arrow.style.display = '';
  // Move arrow to end of SVG so it renders on top of every organelle.
  arrow.parentNode.appendChild(arrow);
}

function hideTourArrow() {
  const arrow = document.getElementById('tour-arrow');
  if (arrow) arrow.style.display = 'none';
}

/* ---------- React to audience track changes ---------- */

function listenForTrackChange() {
  window.addEventListener('trackchanged', () => {
    if (currentSelected) selectOrganelle(currentSelected);
  });
}
