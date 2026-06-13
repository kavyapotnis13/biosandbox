/* =========================================================
   progress.js — localStorage helpers
   Saves the student's audience track and per-module progress
   so it persists across page reloads and browser sessions.

   Depends on data/modules.js — MODULES must be loaded first.
   ========================================================= */

const STORAGE_KEYS = {
  track: 'biosandbox-track',
  progress: 'biosandbox-progress',
  stats: 'biosandbox-stats'
};

// "Mastered" means a best quiz score of this many or higher (out of 5).
const MASTERY_THRESHOLD = 4;

// Default daily question goal (= 1 quiz).
const DEFAULT_DAILY_GOAL = 5;

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
  const stats = getStats();
  let mastered = 0;
  let exploredParts = 0;
  let totalParts = 0;

  for (const m of MODULES) {
    const p = progress[m.slug];
    if (p.bestScore !== null && p.bestScore >= MASTERY_THRESHOLD) mastered++;
    exploredParts += p.explored.length;
    totalParts += m.totalParts;
  }

  return {
    mastered,
    moduleCount: MODULES.length,
    badges: stats.earnedBadges.length,
    exploredPct: totalParts > 0 ? Math.round((exploredParts / totalParts) * 100) : 0
  };
}

// Helper: mark a single "part" of a module as explored (no duplicates).
// Also counts as activity for today (streak + last-active).
function markExplored(slug, partId) {
  const progress = getProgress();
  if (!progress[slug].explored.includes(partId)) {
    progress[slug].explored.push(partId);
    saveProgress(progress);
    markActiveToday();
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

/* =========================================================
   Stats: streaks, daily goal, badges
   Stored under biosandbox-stats. Schema:
     activeDates:     ['2026-06-13', ...]   sorted unique ISO dates
     longestStreak:   number
     dailyGoal:       number (questions per day, default 5)
     dailyAnswered:   { '2026-06-13': 7, ... }
     totalQuizzes:    number
     earnedBadges:    ['first-steps', ...]
     badgeEarnedDates:{ 'first-steps': '2026-06-13' }
   ========================================================= */

// Keep at most this many quiz attempts in history (oldest dropped first).
const QUIZ_HISTORY_CAP = 100;

function emptyStats() {
  return {
    activeDates:      [],
    longestStreak:    0,
    dailyGoal:        DEFAULT_DAILY_GOAL,
    dailyAnswered:    {},
    totalQuizzes:     0,
    earnedBadges:     [],
    badgeEarnedDates: {},
    quizHistory:      []
  };
}

function getStats() {
  const raw = localStorage.getItem(STORAGE_KEYS.stats);
  let parsed = {};
  if (raw) {
    try { parsed = JSON.parse(raw); } catch (e) { parsed = {}; }
  }
  // Merge with defaults so older saves don't break when we add new keys.
  return Object.assign(emptyStats(), parsed);
}

function saveStats(stats) {
  localStorage.setItem(STORAGE_KEYS.stats, JSON.stringify(stats));
}

function todayIso() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function daysBetween(a, b) {
  // Days from ISO date a to ISO date b (both YYYY-MM-DD). Positive if b > a.
  const da = new Date(a + 'T00:00:00');
  const db = new Date(b + 'T00:00:00');
  return Math.round((db - da) / (1000 * 60 * 60 * 24));
}

/* ---------- Streaks ---------- */

function markActiveToday() {
  const stats = getStats();
  const today = todayIso();
  if (!stats.activeDates.includes(today)) {
    stats.activeDates.push(today);
    stats.activeDates.sort();
  }
  const streak = computeCurrentStreak(stats.activeDates);
  if (streak > stats.longestStreak) stats.longestStreak = streak;
  saveStats(stats);
}

// Walks back from today through activeDates. The streak is broken the first
// time we hit a gap > 1 day. Streak of 1 = just today. 0 = no activity today.
function computeCurrentStreak(activeDates) {
  if (!activeDates.length) return 0;
  const today = todayIso();
  // Sort ascending defensively
  const sorted = activeDates.slice().sort();
  // If neither today nor yesterday is in the list, streak is 0.
  const last = sorted[sorted.length - 1];
  const gapToToday = daysBetween(last, today);
  if (gapToToday > 1) return 0;

  let streak = 1;
  for (let i = sorted.length - 1; i > 0; i--) {
    const gap = daysBetween(sorted[i - 1], sorted[i]);
    if (gap === 1) streak++;
    else break;
  }
  return streak;
}

function getStreaks() {
  const stats = getStats();
  const currentStreak = computeCurrentStreak(stats.activeDates);
  return {
    currentStreak,
    longestStreak: Math.max(stats.longestStreak, currentStreak),
    lastActive:    stats.activeDates[stats.activeDates.length - 1] || null
  };
}

/* ---------- Daily goal ---------- */

function getDailyGoal() {
  return getStats().dailyGoal || DEFAULT_DAILY_GOAL;
}

function setDailyGoal(n) {
  const stats = getStats();
  stats.dailyGoal = Math.max(1, Math.floor(n));
  saveStats(stats);
}

function getTodayProgress() {
  const stats = getStats();
  const today = todayIso();
  const answered = stats.dailyAnswered[today] || 0;
  const goal     = stats.dailyGoal || DEFAULT_DAILY_GOAL;
  return { answered, goal, hit: answered >= goal };
}

function recordQuestionsAnswered(n) {
  if (!n) return;
  const stats = getStats();
  const today = todayIso();
  stats.dailyAnswered[today] = (stats.dailyAnswered[today] || 0) + n;
  saveStats(stats);
}

/* ---------- Quiz tally ---------- */

function recordQuizTaken() {
  const stats = getStats();
  stats.totalQuizzes++;
  saveStats(stats);
}

function getTotalQuizzes() {
  return getStats().totalQuizzes;
}

// Push a single quiz attempt onto the history log.
// Drops the oldest entries once we exceed QUIZ_HISTORY_CAP.
function recordQuizAttempt(slug, score, total) {
  const stats = getStats();
  stats.quizHistory.push({
    slug:  slug,
    date:  todayIso(),
    score: score,
    total: total
  });
  if (stats.quizHistory.length > QUIZ_HISTORY_CAP) {
    stats.quizHistory = stats.quizHistory.slice(-QUIZ_HISTORY_CAP);
  }
  saveStats(stats);
}

function getQuizHistory() {
  return getStats().quizHistory.slice();
}

/* ---------- Badge catalog + checker ----------
   Each badge has an id, name, emoji, description, and a `check` function
   that takes (stats, progressMap) and returns true if earned. */

const BADGES = [
  {
    id: 'first-steps',
    emoji: '🎯',
    name: 'First Steps',
    description: 'Take your first quiz.',
    check: (s) => s.totalQuizzes >= 1
  },
  {
    id: 'perfect-score',
    emoji: '🌟',
    name: 'Perfect Score',
    description: 'Get 5 out of 5 on any quiz.',
    check: (s, p) => Object.values(p).some(m => m.bestScore === 5)
  },
  {
    id: 'streak-3',
    emoji: '🔥',
    name: '3-Day Streak',
    description: 'Be active 3 days in a row.',
    check: (s) => computeCurrentStreak(s.activeDates) >= 3 || s.longestStreak >= 3
  },
  {
    id: 'streak-7',
    emoji: '🔥',
    name: '7-Day Streak',
    description: 'Be active a full week in a row.',
    check: (s) => computeCurrentStreak(s.activeDates) >= 7 || s.longestStreak >= 7
  },
  {
    id: 'streak-30',
    emoji: '🏆',
    name: 'Month-Long Streak',
    description: '30 days in a row. You\'re built different.',
    check: (s) => computeCurrentStreak(s.activeDates) >= 30 || s.longestStreak >= 30
  },
  {
    id: 'explorer',
    emoji: '📚',
    name: 'Explorer',
    description: 'Take a quiz from 5 different modules.',
    check: (s, p) => Object.values(p).filter(m => m.bestScore !== null).length >= 5
  },
  {
    id: 'specialist',
    emoji: '🎓',
    name: 'Specialist',
    description: 'Master 3 modules (4+ out of 5).',
    check: (s, p) => Object.values(p).filter(m => m.bestScore !== null && m.bestScore >= MASTERY_THRESHOLD).length >= 3
  },
  {
    id: 'biomaster',
    emoji: '👑',
    name: 'Biomaster',
    description: 'Master every module in the app.',
    check: (s, p) => {
      const all = Object.values(p);
      return all.length > 0 && all.every(m => m.bestScore !== null && m.bestScore >= MASTERY_THRESHOLD);
    }
  },
  {
    id: 'quiz-junkie',
    emoji: '🧠',
    name: 'Quiz Junkie',
    description: 'Take 25 quizzes total.',
    check: (s) => s.totalQuizzes >= 25
  },
  {
    id: 'goal-crusher',
    emoji: '⚡',
    name: 'Goal Crusher',
    description: 'Hit your daily goal 5 days in a row.',
    check: (s) => {
      const goal = s.dailyGoal || DEFAULT_DAILY_GOAL;
      // Walk back from today: count consecutive days where answered >= goal.
      let streak = 0;
      let cursor = new Date(todayIso() + 'T00:00:00');
      for (let i = 0; i < 60; i++) {
        const y = cursor.getFullYear();
        const m = String(cursor.getMonth() + 1).padStart(2, '0');
        const d = String(cursor.getDate()).padStart(2, '0');
        const iso = `${y}-${m}-${d}`;
        const answered = s.dailyAnswered[iso] || 0;
        if (answered >= goal) streak++;
        else if (iso !== todayIso()) break; // today not hitting yet is OK, but past gaps break streak
        cursor.setDate(cursor.getDate() - 1);
      }
      return streak >= 5;
    }
  }
];

function getEarnedBadges() {
  return getStats().earnedBadges.slice();
}

// Run every badge's check. Save any newly-earned ones and return the new ones.
function checkAndAwardBadges() {
  const stats = getStats();
  const progress = getProgress();
  const earned = new Set(stats.earnedBadges);
  const newly = [];
  const today = todayIso();

  for (const badge of BADGES) {
    if (earned.has(badge.id)) continue;
    if (badge.check(stats, progress)) {
      earned.add(badge.id);
      stats.badgeEarnedDates[badge.id] = today;
      newly.push(badge);
    }
  }

  if (newly.length) {
    stats.earnedBadges = Array.from(earned);
    saveStats(stats);
  }
  return newly;
}

// Convenience: full badge entry + earned flag + earnedOn date, for the gallery.
function getAllBadgesWithStatus() {
  const stats = getStats();
  const earned = new Set(stats.earnedBadges);
  return BADGES.map(b => ({
    ...b,
    earned: earned.has(b.id),
    earnedOn: stats.badgeEarnedDates[b.id] || null
  }));
}
