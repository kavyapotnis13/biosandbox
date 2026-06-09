/* =========================================================
   progress.js — localStorage helpers
   Saves the student's audience track and per-module progress
   so it persists across page reloads and browser sessions.

   Depends on data/modules.js — MODULES must be loaded first.
   ========================================================= */

const STORAGE_KEYS = {
  track: 'biosandbox-track',
  progress: 'biosandbox-progress'
};

// "Mastered" means a best quiz score of this many or higher (out of 5).
const MASTERY_THRESHOLD = 4;

/* ---------- Audience track ---------- */

function getTrack() {
  return localStorage.getItem(STORAGE_KEYS.track) || 'high';
}

function setTrack(track) {
  localStorage.setItem(STORAGE_KEYS.track, track);
}

/* ---------- Module progress ---------- */

function emptyModuleProgress() {
  return { explored: [], bestScore: null, badges: [] };
}

function getProgress() {
  const raw = localStorage.getItem(STORAGE_KEYS.progress);
  let parsed = {};
  if (raw) {
    try { parsed = JSON.parse(raw); } catch (e) { parsed = {}; }
  }
  // Ensure every module from MODULES has an entry, even new ones added later.
  const progress = {};
  for (const m of MODULES) {
    progress[m.slug] = parsed[m.slug] || emptyModuleProgress();
  }
  return progress;
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(progress));
}

// Returns 'not-started', 'in-progress', or 'mastered' for a module.
function getModuleStatus(slug) {
  const p = getProgress()[slug];
  if (!p) return 'not-started';
  if (p.bestScore !== null && p.bestScore >= MASTERY_THRESHOLD) return 'mastered';
  if (p.explored.length > 0 || p.bestScore !== null) return 'in-progress';
  return 'not-started';
}

// Aggregate stats for the home page progress strip.
function getOverallStats() {
  const progress = getProgress();
  let mastered = 0;
  let badges = 0;
  let exploredParts = 0;
  let totalParts = 0;

  for (const m of MODULES) {
    const p = progress[m.slug];
    if (p.bestScore !== null && p.bestScore >= MASTERY_THRESHOLD) mastered++;
    badges += p.badges.length;
    exploredParts += p.explored.length;
    totalParts += m.totalParts;
  }

  return {
    mastered,
    moduleCount: MODULES.length,
    badges,
    exploredPct: totalParts > 0 ? Math.round((exploredParts / totalParts) * 100) : 0
  };
}

// Helper: mark a single "part" of a module as explored (no duplicates).
function markExplored(slug, partId) {
  const progress = getProgress();
  if (!progress[slug].explored.includes(partId)) {
    progress[slug].explored.push(partId);
    saveProgress(progress);
  }
}

// Helper: record a quiz score, keeping the highest.
function recordQuizScore(slug, score) {
  const progress = getProgress();
  const current = progress[slug].bestScore;
  if (current === null || score > current) {
    progress[slug].bestScore = score;
    saveProgress(progress);
  }
}
