/* =========================================================
   app.js — shared shell behavior
   Runs on every page. Loaded after data/modules.js and
   js/progress.js so it can use MODULES, THEMES, getTrack(), etc.
   ========================================================= */

/* ---------- Audience track toggle (in nav) ---------- */

function initTrackToggle() {
  const buttons = document.querySelectorAll('.track-option');
  if (buttons.length === 0) return;

  function syncButtons() {
    const current = getTrack();
    buttons.forEach(btn => {
      btn.setAttribute('aria-pressed', btn.dataset.track === current ? 'true' : 'false');
    });
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      setTrack(btn.dataset.track);
      syncButtons();
      // Let other scripts (e.g. cell.js) re-render content for the new track.
      window.dispatchEvent(new CustomEvent('trackchanged', { detail: btn.dataset.track }));
    });
  });

  syncButtons();
}

/* ---------- Home page: render module grid + progress ---------- */

function renderModuleCard(module) {
  const theme = THEMES[module.theme] || THEMES.lavender;
  const status = getModuleStatus(module.slug);

  let statusLabel = 'Not started';
  let statusClass = '';
  if (status === 'mastered') {
    statusLabel = 'Mastered';
    statusClass = 'mastered';
  } else if (status === 'in-progress') {
    statusLabel = 'In progress';
    statusClass = 'in-progress';
  }

  const card = document.createElement('a');
  card.href = module.page;
  card.className = 'module-card';
  card.dataset.module = module.slug;
  card.style.setProperty('--theme-bg', theme.bg);
  card.style.setProperty('--theme-accent', theme.accent);

  card.innerHTML = `
    <div class="module-thumbnail">${module.iconSvg}</div>
    <div class="module-body">
      <h2 class="module-name">${module.name}</h2>
      <p class="module-blurb">${module.blurb}</p>
      <div class="module-status">
        <span class="status-pill ${statusClass}">${statusLabel}</span>
        <span class="module-cta">Start →</span>
      </div>
    </div>
  `;
  return card;
}

function initHomePage() {
  const grid = document.querySelector('.module-grid');
  if (!grid) return; // not on home page

  // Render all module cards from the MODULES data.
  grid.innerHTML = '';
  for (const module of MODULES) {
    grid.appendChild(renderModuleCard(module));
  }

  // Update progress strip
  const stats = getOverallStats();
  const masteredEl = document.getElementById('mastered-count');
  const moduleCountEl = document.getElementById('module-count');
  const badgesEl = document.getElementById('badges-count');
  const exploredEl = document.getElementById('explored-pct');
  const fillEl = document.getElementById('progress-fill');
  if (masteredEl) masteredEl.textContent = stats.mastered;
  if (moduleCountEl) moduleCountEl.textContent = stats.moduleCount;
  if (badgesEl) badgesEl.textContent = stats.badges;
  if (exploredEl) exploredEl.textContent = stats.exploredPct;
  if (fillEl) fillEl.style.width = `${stats.exploredPct}%`;

  // AP Bio coverage summary — count distinct units touched by any module.
  const apUnitsEl = document.getElementById('ap-units-covered');
  if (apUnitsEl && typeof getCoveredUnits === 'function') {
    const allCodes = MODULES.flatMap(m => m.apStandards || []);
    apUnitsEl.textContent = getCoveredUnits(allCodes).length;
  }
}

/* ---------- AP Bio standards block (module pages) ---------- */

/* Reads body[data-module="X"], looks up the matching module's apStandards,
   and injects a compact AP-aligned banner at the top of <main>. Skipped if
   the page has no data-module attribute, no matching module, or no LOs. */
function initApStandardsBlock() {
  if (typeof AP_BIO_UNITS === 'undefined' || typeof getLO !== 'function') return;

  const slug = document.body.dataset.module;
  if (!slug) return;
  const m = getModule(slug);
  if (!m || !m.apStandards || !m.apStandards.length) return;

  // Resolve each LO code to its full record. Drop any unknown codes.
  const resolved = m.apStandards.map(code => getLO(code)).filter(Boolean);
  if (!resolved.length) return;

  // Group LOs by unit so the banner reads like "Unit 6 · IST-1.G IST-1.H".
  const byUnit = new Map();
  for (const lo of resolved) {
    if (!byUnit.has(lo.unit)) byUnit.set(lo.unit, { name: lo.unitName, los: [] });
    byUnit.get(lo.unit).los.push(lo);
  }

  const unitsHtml = Array.from(byUnit.entries()).map(([num, info]) => `
    <div class="ap-unit-row">
      <span class="ap-unit-label">Unit ${num} · ${info.name}</span>
      <div class="ap-lo-list">
        ${info.los.map(lo =>
          `<span class="ap-lo-pill" title="${escapeAttr(lo.title)}">${lo.code}</span>`
        ).join('')}
      </div>
    </div>
  `).join('');

  const block = document.createElement('aside');
  block.className = 'ap-standards-block';
  block.setAttribute('aria-label', 'AP Biology learning objectives covered');
  block.innerHTML = `
    <span class="ap-standards-label">AP Bio aligned</span>
    <div class="ap-standards-units">${unitsHtml}</div>
  `;

  const main = document.querySelector('main');
  if (main) main.insertBefore(block, main.firstChild);
}

function escapeAttr(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/* ---------- Init on load ---------- */

document.addEventListener('DOMContentLoaded', () => {
  initTrackToggle();
  initHomePage();
  initApStandardsBlock();
});
