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
      // Powers the "Bilingual" hidden achievement.
      if (typeof recordTrackToggle === 'function') recordTrackToggle();
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

  // Build the specimen classification — the mono signature on each card.
  // E.g. "№ 02 · CELL · AP UNIT 2". Falls back gracefully if AP data is
  // unavailable for a particular module.
  const indexNum = String(MODULES.indexOf(module) + 1).padStart(2, '0');
  let apUnitLabel = '';
  if (typeof getLO === 'function' && module.apStandards && module.apStandards[0]) {
    const lo = getLO(module.apStandards[0]);
    if (lo) apUnitLabel = `AP Unit ${lo.unit}`;
  }
  const slugUpper = module.slug.toUpperCase();
  const specimenHtml = `
    <div class="module-specimen">
      <span class="num">№ ${indexNum}</span>
      <span class="sep">·</span>
      <span>${slugUpper}</span>
      ${apUnitLabel ? `<span class="sep">·</span><span>${apUnitLabel}</span>` : ''}
    </div>
  `;

  card.innerHTML = `
    <div class="module-thumbnail">${module.iconSvg}</div>
    <div class="module-body">
      ${specimenHtml}
      <h2 class="module-name">${module.name}</h2>
      <p class="module-blurb">${module.blurb}</p>
      <div class="module-status">
        <span class="status-pill ${statusClass}">${statusLabel}</span>
        <span class="module-cta">Start <span class="arrow">→</span></span>
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

  // Home-page streak + daily-goal chips.
  if (typeof getStreaks === 'function' && typeof getTodayProgress === 'function') {
    const { currentStreak } = getStreaks();
    const { answered, goal } = getTodayProgress();
    const streakValueEl = document.getElementById('home-streak-value');
    const streakIconEl  = document.getElementById('home-chip-streak-icon');
    const goalValueEl   = document.getElementById('home-goal-value');
    if (streakValueEl) streakValueEl.textContent = String(currentStreak);
    if (streakIconEl)  streakIconEl.classList.toggle('streak-emoji-dim', currentStreak === 0);
    if (goalValueEl)   goalValueEl.textContent = `${Math.min(answered, goal)} / ${goal}`;
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

  // Group LOs by unit so the banner reads like "Unit 6 · 6.2.A 6.3.A".
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
  initXpGameification();
  initLevelBadge();
  initTutorLink();
  initXpToasts();
});

/* ---------- XP gameification hooks ----------
   Records a first-time module visit (awards XP) and a "night owl"
   visit if it's between midnight and 3 AM. */

function initXpGameification() {
  const slug = document.body.dataset.module;
  if (slug && typeof recordModuleVisit === 'function') {
    recordModuleVisit(slug);
  }
  if (typeof recordNightVisit === 'function') {
    recordNightVisit();
  }
}

/* ---------- Nav level badge ----------
   Injects a level pill + thin XP bar into .site-nav, before the
   .nav-links group. Listens for the 'xpgained' window event to
   update live (with a brief glow on level-up). Auto-skips pages
   that don't have a .site-nav (none currently). */

function initLevelBadge() {
  if (typeof getLevelProgress !== 'function') return;
  const nav = document.querySelector('.site-nav');
  if (!nav || nav.querySelector('.level-badge')) return;

  const badge = document.createElement('a');
  badge.className = 'level-badge';
  badge.href      = 'goals.html';
  badge.setAttribute('aria-label', 'Your level and XP — open study log');
  badge.innerHTML = `
    <span class="level-badge-row">
      <span class="level-badge-label">Goals</span>
      <span class="level-badge-num">Lvl 1</span>
    </span>
    <span class="level-badge-bar"><span class="level-badge-fill"></span></span>
  `;

  // Slot it just before .nav-links so the order is: brand · toggle · badge · links.
  const links = nav.querySelector('.nav-links');
  if (links) nav.insertBefore(badge, links);
  else nav.appendChild(badge);

  function paint(animate) {
    const p = getLevelProgress();
    badge.querySelector('.level-badge-num').textContent = `Lvl ${p.level}`;
    badge.querySelector('.level-badge-fill').style.width = p.pct + '%';
    badge.title = `Level ${p.level} · ${p.into} / ${p.span} XP to next level`;
    if (animate) {
      badge.classList.remove('level-up');
      void badge.offsetWidth;       // force reflow so animation restarts
      badge.classList.add('level-up');
    }
  }

  paint(false);
  window.addEventListener('xpgained', e => paint(!!(e.detail && e.detail.leveledUp)));
}

/* ---------- Floating Lab Partner (tutor) button ----------
   Injects a fixed circular FAB in the bottom-right corner of every
   page except tutor.html itself, so the tutor is always one click
   away without taking nav real estate. */

function initTutorLink() {
  if (document.body.dataset.page === 'tutor') return;
  if (document.querySelector('.tutor-fab')) return;

  const fab = document.createElement('a');
  fab.href = 'tutor.html';
  fab.className = 'tutor-fab';
  fab.setAttribute('aria-label', 'Open Lab Partner — biology chat tutor');
  fab.title = 'Lab Partner';
  fab.innerHTML = `
    <svg class="tutor-fab-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5 H20 A1 1 0 0 1 21 6 V16 A1 1 0 0 1 20 17 H12 L7 21 V17 H4 A1 1 0 0 1 3 16 V6 A1 1 0 0 1 4 5 Z"
            fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <circle cx="8.5"  cy="11" r="1" fill="currentColor"/>
      <circle cx="12"   cy="11" r="1" fill="currentColor"/>
      <circle cx="15.5" cy="11" r="1" fill="currentColor"/>
    </svg>
    <span class="tutor-fab-label">Lab Partner</span>
  `;
  document.body.appendChild(fab);
}

/* ---------- XP + achievement toasts ----------
   Floating notifications when XP is earned or a badge is unlocked.
   Container is created on first event so pages with no XP traffic
   don't pay for the DOM. */

function initXpToasts() {
  let container = null;
  function ensureContainer() {
    if (container) return container;
    container = document.createElement('div');
    container.className = 'xp-toasts';
    container.setAttribute('aria-live', 'polite');
    document.body.appendChild(container);
    return container;
  }

  function spawn(html, kind) {
    const root = ensureContainer();
    const t = document.createElement('div');
    t.className = `xp-toast xp-toast-${kind}`;
    t.innerHTML = html;
    root.appendChild(t);
    // Auto-remove after the CSS animation finishes.
    setTimeout(() => t.remove(), 2600);
  }

  window.addEventListener('xpgained', e => {
    const d = e.detail || {};
    spawn(`<span class="xp-toast-amount">+${d.amount} XP</span>`, 'xp');
    if (d.leveledUp) {
      spawn(`<span class="xp-toast-level">Level ${d.newLevel}!</span>`, 'levelup');
    }
  });

  window.addEventListener('achievementunlocked', e => {
    const b = e.detail || {};
    spawn(`
      <span class="xp-toast-emoji">${b.emoji || '🏆'}</span>
      <span class="xp-toast-text">
        <span class="xp-toast-kind">Achievement unlocked</span>
        <span class="xp-toast-name">${b.name || ''}</span>
      </span>
    `, 'badge');
  });
}
