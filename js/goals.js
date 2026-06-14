/* =========================================================
   goals.js — dashboard page

   Renders today's goal ring, current streak, daily-goal
   selector, module mastery grid, and badge gallery. Reads
   everything from js/progress.js.

   Depends on: data/modules.js, js/progress.js
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  if (document.body.dataset.page !== 'goals') return;

  renderXpCard();
  renderGoalRing();
  renderStreakCard();
  renderMasteryGrid();
  renderMasteryChart();
  renderScoreChart();
  renderHeatmap();
  renderBadgeGrid();
  renderGoalSelector();

  // Live-update the XP card if XP is earned while on this page.
  window.addEventListener('xpgained', () => {
    renderXpCard();
    renderBadgeGrid();
  });
  window.addEventListener('achievementunlocked', renderBadgeGrid);

  document.getElementById('goal-selector')?.addEventListener('click', e => {
    const btn = e.target.closest('.goal-pill');
    if (!btn) return;
    const n = parseInt(btn.dataset.goal, 10);
    if (!Number.isFinite(n)) return;
    setDailyGoal(n);
    renderGoalRing();
    renderGoalSelector();
  });
});

/* ---------- Goal ring ---------- */

function renderGoalRing() {
  const { answered, goal, hit } = getTodayProgress();
  const ring = document.getElementById('goal-ring-fill');
  const valueEl = document.getElementById('goal-ring-value');
  const message = document.getElementById('goal-card-message');

  // Circle: r=60, circumference = 2*PI*60 ≈ 376.99
  const CIRC = 2 * Math.PI * 60;
  const pct = Math.min(1, goal > 0 ? answered / goal : 0);
  if (ring) {
    ring.setAttribute('stroke-dasharray',  CIRC.toFixed(2));
    ring.setAttribute('stroke-dashoffset', (CIRC * (1 - pct)).toFixed(2));
    ring.classList.toggle('is-hit', hit);
  }
  if (valueEl) {
    valueEl.textContent = `${Math.min(answered, goal)} / ${goal}`;
  }
  if (message) {
    if (hit) {
      message.textContent = '🎉 You hit your goal for today!';
      message.classList.add('goal-card-message-hit');
    } else if (answered > 0) {
      const left = goal - answered;
      message.textContent = `${left} more question${left === 1 ? '' : 's'} to hit today's goal.`;
      message.classList.remove('goal-card-message-hit');
    } else {
      message.textContent = 'Take a quiz to start counting.';
      message.classList.remove('goal-card-message-hit');
    }
  }
}

function renderGoalSelector() {
  const current = getDailyGoal();
  document.querySelectorAll('#goal-selector .goal-pill').forEach(btn => {
    const n = parseInt(btn.dataset.goal, 10);
    btn.setAttribute('aria-pressed', n === current ? 'true' : 'false');
  });
}

/* ---------- Streak card ---------- */

function renderStreakCard() {
  const { currentStreak, longestStreak, lastActive } = getStreaks();
  const total = getTotalQuizzes();

  document.getElementById('streak-number').textContent = String(currentStreak);
  document.getElementById('streak-label').textContent =
    currentStreak === 1 ? 'day streak' : 'day streak';

  document.getElementById('streak-longest').textContent =
    longestStreak === 1 ? '1 day' : `${longestStreak} days`;

  document.getElementById('streak-last').textContent =
    lastActive ? formatActive(lastActive) : 'Never';

  document.getElementById('streak-quizzes').textContent = String(total);

  // Tint the flame brighter as streak climbs.
  const emoji = document.getElementById('streak-emoji');
  if (emoji) {
    emoji.classList.toggle('streak-emoji-dim', currentStreak === 0);
  }
}

function formatActive(iso) {
  const today = isoToday();
  if (iso === today) return 'Today';
  const dayMs = 1000 * 60 * 60 * 24;
  const diff = Math.round((new Date(today + 'T00:00:00') - new Date(iso + 'T00:00:00')) / dayMs);
  if (diff === 1) return 'Yesterday';
  if (diff < 7)   return `${diff} days ago`;
  return iso;
}

function isoToday() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/* ---------- Module mastery grid ---------- */

function renderMasteryGrid() {
  const grid = document.getElementById('mastery-grid');
  if (!grid) return;
  const progress = getProgress();

  grid.innerHTML = MODULES.map(m => {
    const p = progress[m.slug] || { bestScore: null };
    const theme = THEMES[m.theme] || THEMES.lavender;
    let status   = 'not-started';
    let label    = '— / 5';
    if (p.bestScore !== null) {
      label = `${p.bestScore} / 5`;
      status = p.bestScore >= MASTERY_THRESHOLD ? 'mastered' : 'in-progress';
    }
    return `
      <a class="mastery-card mastery-${status}"
         href="${m.page}"
         style="--theme-bg: ${theme.bg}; --theme-accent: ${theme.accent};">
        <div class="mastery-icon" aria-hidden="true">${m.iconSvg}</div>
        <div class="mastery-body">
          <span class="mastery-name">${m.name}</span>
          <span class="mastery-score">${label}</span>
        </div>
      </a>
    `;
  }).join('');
}

/* ---------- XP + level card ---------- */

// Flavor text keyed on level. Falls through to the last entry for higher levels.
const XP_FLAVOR = [
  null,                                 // L0 (unused)
  'Just getting started',               // L1
  'Picking up momentum',                // L2
  'Settling into the work',             // L3
  'Hitting your stride',                // L4
  'Rising star',                        // L5
  'You really know this stuff',         // L6
  'Field guide author',                 // L7
  'Apex student',                       // L8
  'Approaching legend',                 // L9
  'Bio legend'                          // L10+
];

function renderXpCard() {
  if (typeof getLevelProgress !== 'function') return;
  const p = getLevelProgress();

  setText('xp-level-num',   p.level);
  setText('xp-into',        p.into);
  setText('xp-span',        p.span);
  setText('xp-total',       p.xp);
  setText('xp-tonext',      p.toNext);
  setText('xp-card-title',  XP_FLAVOR[Math.min(p.level, XP_FLAVOR.length - 1)] || XP_FLAVOR[XP_FLAVOR.length - 1]);

  const fill = document.getElementById('xp-card-fill');
  if (fill) fill.style.width = p.pct + '%';

  // Hide the "X XP to Level N+1" hint at maxed-out levels (defensive).
  const hint = document.querySelector('.xp-card-hint');
  if (hint) hint.innerHTML = `<strong id="xp-tonext">${p.toNext}</strong> XP to Level ${p.level + 1}`;
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = String(value);
}

/* ---------- Badge grid ---------- */

function renderBadgeGrid() {
  const grid = document.getElementById('badge-grid');
  if (!grid) return;
  const badges = getAllBadgesWithStatus();
  const earnedCount = badges.filter(b => b.earned).length;

  const countEl = document.getElementById('badge-count');
  if (countEl) countEl.textContent = `${earnedCount} / ${badges.length}`;

  grid.innerHTML = badges.map(b => `
    <div class="badge-card ${b.earned ? 'badge-earned' : 'badge-locked'}">
      <div class="badge-emoji">${b.earned ? b.emoji : '🔒'}</div>
      <div class="badge-body">
        <h3 class="badge-name">${b.name}</h3>
        <p class="badge-desc">${b.description}</p>
        ${b.earned && b.earnedOn ? `<span class="badge-earned-on">Earned ${formatActive(b.earnedOn)}</span>` : ''}
      </div>
    </div>
  `).join('');
}

/* =========================================================
   Analytics widgets
   ========================================================= */

/* ---------- Best-score-per-module bar chart ---------- */
function renderMasteryChart() {
  const wrap = document.getElementById('mastery-chart');
  if (!wrap) return;
  const progress = getProgress();

  wrap.innerHTML = MODULES.map(m => {
    const p = progress[m.slug] || { bestScore: null };
    const theme = THEMES[m.theme] || THEMES.lavender;
    const score = p.bestScore;
    const pct   = score === null ? 0 : (score / 5) * 100;
    const label = score === null ? '— / 5' : `${score} / 5`;
    return `
      <div class="mastery-row" title="${m.name}: ${label}">
        <span class="mastery-row-name">${m.name}</span>
        <div class="mastery-row-bar">
          <div class="mastery-row-fill" style="width: ${pct}%; background: ${theme.accent};"></div>
        </div>
        <span class="mastery-row-value">${label}</span>
      </div>
    `;
  }).join('');
}

/* ---------- Score-over-time line chart ---------- */
function renderScoreChart() {
  const svg     = document.getElementById('score-chart');
  const line    = document.getElementById('score-chart-line');
  const dots    = document.getElementById('score-chart-dots');
  const axes    = document.getElementById('score-chart-axes');
  const empty   = document.getElementById('score-chart-empty');
  if (!svg || !line || !dots || !axes) return;

  const history = getQuizHistory().slice(-15);   // last 15 attempts

  if (empty) empty.hidden = history.length > 0;
  if (history.length === 0) {
    line.setAttribute('points', '');
    dots.innerHTML = '';
    axes.innerHTML = '';
    return;
  }

  const W = 480, H = 160, PL = 30, PR = 12, PT = 16, PB = 28;
  const innerW = W - PL - PR;
  const innerH = H - PT - PB;

  // X positions: evenly spaced across history.length
  const n = history.length;
  const xFor = i => PL + (n === 1 ? innerW / 2 : (i / (n - 1)) * innerW);
  // Y: score out of total (assume total = 5 for now, but use actual)
  const yFor = (s, t) => PT + (1 - s / t) * innerH;

  // Axes: just baseline + 5/5 marker
  axes.innerHTML = `
    <line x1="${PL}" y1="${PT}"        x2="${W - PR}" y2="${PT}"        stroke="#2D2154" stroke-width="0.6" stroke-dasharray="3 3" opacity="0.4"/>
    <line x1="${PL}" y1="${PT + innerH/2}" x2="${W - PR}" y2="${PT + innerH/2}" stroke="#2D2154" stroke-width="0.6" stroke-dasharray="3 3" opacity="0.3"/>
    <line x1="${PL}" y1="${PT + innerH}" x2="${W - PR}" y2="${PT + innerH}" stroke="#2D2154" stroke-width="1.2"/>
    <line x1="${PL}" y1="${PT}"        x2="${PL}"      y2="${PT + innerH}" stroke="#2D2154" stroke-width="1.2"/>
    <text x="${PL - 6}" y="${PT + 4}"          font-family="serif" font-size="9" font-style="italic" fill="#2D2154" text-anchor="end">5</text>
    <text x="${PL - 6}" y="${PT + innerH + 4}" font-family="serif" font-size="9" font-style="italic" fill="#2D2154" text-anchor="end">0</text>
    <text x="${W / 2}" y="${H - 6}"            font-family="serif" font-size="9" font-style="italic" fill="#2D2154" text-anchor="middle">recent quizzes →</text>
  `;

  const points = history.map((h, i) => `${xFor(i).toFixed(1)},${yFor(h.score, h.total).toFixed(1)}`).join(' ');
  line.setAttribute('points', points);

  // Each attempt gets a dot, colored by its module theme accent.
  dots.innerHTML = history.map((h, i) => {
    const m = MODULES.find(mm => mm.slug === h.slug);
    const theme = m ? (THEMES[m.theme] || THEMES.lavender) : THEMES.lavender;
    return `<circle cx="${xFor(i).toFixed(1)}" cy="${yFor(h.score, h.total).toFixed(1)}"
                    r="4" fill="${theme.accent}" stroke="#2D2154" stroke-width="1.4">
              <title>${m ? m.name : h.slug}: ${h.score}/${h.total} on ${h.date}</title>
            </circle>`;
  }).join('');
}

/* ---------- 12-week activity heatmap ---------- */
function renderHeatmap() {
  const grid = document.getElementById('heatmap-grid');
  if (!grid) return;
  const stats = getStats();
  const goal  = stats.dailyGoal || 5;
  const activeSet = new Set(stats.activeDates);

  const WEEKS = 12;
  const today = new Date(isoToday() + 'T00:00:00');
  // Find the Monday on or before today, then walk back WEEKS-1 more weeks.
  // We'll render WEEKS columns × 7 rows (Mon → Sun).
  const dayOfWeek = (today.getDay() + 6) % 7;   // 0 = Monday
  const lastMon = new Date(today);
  lastMon.setDate(today.getDate() - dayOfWeek);

  const firstMon = new Date(lastMon);
  firstMon.setDate(lastMon.getDate() - (WEEKS - 1) * 7);

  const cells = [];
  for (let w = 0; w < WEEKS; w++) {
    for (let d = 0; d < 7; d++) {
      const cell = new Date(firstMon);
      cell.setDate(firstMon.getDate() + w * 7 + d);
      const iso = `${cell.getFullYear()}-${String(cell.getMonth() + 1).padStart(2, '0')}-${String(cell.getDate()).padStart(2, '0')}`;
      const inFuture = cell > today;
      let cls = 'heatmap-cell heatmap-cell-none';
      if (inFuture) cls += ' heatmap-cell-future';
      else if ((stats.dailyAnswered[iso] || 0) >= goal) cls = 'heatmap-cell heatmap-cell-hit';
      else if (activeSet.has(iso)) cls = 'heatmap-cell heatmap-cell-active';
      const tooltip = inFuture
        ? iso
        : `${iso} — ${stats.dailyAnswered[iso] || 0} answered`;
      cells.push(`<div class="${cls}" title="${tooltip}"></div>`);
    }
  }

  grid.innerHTML = cells.join('');
}
