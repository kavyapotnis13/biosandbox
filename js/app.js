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
}

/* ---------- Init on load ---------- */

document.addEventListener('DOMContentLoaded', () => {
  initTrackToggle();
  initHomePage();
});
