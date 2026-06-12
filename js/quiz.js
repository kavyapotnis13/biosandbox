/* =========================================================
   quiz.js — quiz engine

   URL pattern:  quiz.html?module=<slug>
   - With a valid slug, samples 5 questions from data/quiz-data.js
     and runs the quiz: question card → feedback → next → results.
   - Without a slug (or an unknown one), shows a friendly picker
     of all available quizzes.

   Depends on:
     data/modules.js   — MODULES, getModule()
     data/quiz-data.js — QUIZ_DATA, getQuizPool()
     js/progress.js    — recordQuizScore(), getProgress()
   ========================================================= */

const QUIZ_LEN = 5;

let quizSlug      = null;
let quizModule    = null;       // matching entry from MODULES
let quizQuestions = [];         // 5 sampled questions
let quizIndex     = 0;
let quizAnswers   = [];         // user's chosen index per question (null until answered)

document.addEventListener('DOMContentLoaded', () => {
  if (typeof QUIZ_DATA === 'undefined') return;

  quizSlug   = getSlugFromUrl();
  quizModule = quizSlug ? getModule(quizSlug) : null;
  const pool = quizSlug ? getQuizPool(quizSlug) : null;

  if (!quizModule || !pool || pool.length === 0) {
    renderPicker();
    return;
  }

  startQuiz(pool);

  document.getElementById('quiz-choices')?.addEventListener('click', e => {
    const btn = e.target.closest('.quiz-choice[data-choice]');
    if (btn) handleAnswer(parseInt(btn.dataset.choice, 10));
  });
  document.getElementById('quiz-next') ?.addEventListener('click', advance);
  document.getElementById('quiz-quit') ?.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
  document.getElementById('quiz-retry')?.addEventListener('click', () => {
    startQuiz(pool);
  });
});

/* ---------- URL parsing ---------- */

function getSlugFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('module');
  return slug ? slug.toLowerCase() : null;
}

/* ---------- Picker (when no module is specified) ---------- */

function renderPicker() {
  show('quiz-picker', true);
  show('quiz-card', false);
  show('quiz-results', false);

  const grid = document.getElementById('quiz-picker-grid');
  if (!grid) return;

  grid.innerHTML = '';
  MODULES.forEach(m => {
    const pool = getQuizPool(m.slug);
    if (!pool || pool.length === 0) return;

    const a = document.createElement('a');
    a.className = 'quiz-picker-card';
    a.href = `quiz.html?module=${m.slug}`;
    a.innerHTML = `
      <h2 class="quiz-picker-name">${m.name}</h2>
      <p class="quiz-picker-blurb">${pool.length} questions in the pool · 5 per quiz</p>
      <span class="quiz-picker-cta">Start quiz →</span>
    `;
    grid.appendChild(a);
  });
}

/* ---------- Quiz lifecycle ---------- */

function startQuiz(pool) {
  quizQuestions = sample(pool, Math.min(QUIZ_LEN, pool.length));
  quizIndex     = 0;
  quizAnswers   = new Array(quizQuestions.length).fill(null);

  show('quiz-picker', false);
  show('quiz-card', true);
  show('quiz-results', false);

  // Header — module name + crumb
  document.title = `${quizModule.name} Quiz — BioSandbox`;
  const label = document.getElementById('quiz-module-label');
  if (label) label.textContent = quizModule.name;
  const crumb = document.getElementById('quiz-breadcrumb');
  if (crumb) {
    crumb.innerHTML = `<a href="index.html">Home</a> / <a href="${quizModule.page}">${quizModule.name}</a> / Quiz`;
  }

  renderQuestion();
}

function renderQuestion() {
  const q       = quizQuestions[quizIndex];
  const qEl     = document.getElementById('quiz-question');
  const choices = document.getElementById('quiz-choices');
  const counter = document.getElementById('quiz-counter');
  const feedback= document.getElementById('quiz-feedback');
  const next    = document.getElementById('quiz-next');

  if (counter) counter.textContent = `${quizIndex + 1} / ${quizQuestions.length}`;
  if (qEl)     qEl.textContent     = q.q;

  if (choices) {
    choices.innerHTML = q.choices.map((c, i) =>
      `<button class="quiz-choice" type="button" role="listitem" data-choice="${i}">
         <span class="quiz-choice-letter">${String.fromCharCode(65 + i)}</span>
         <span class="quiz-choice-text">${c}</span>
       </button>`
    ).join('');
  }

  if (feedback) feedback.hidden = true;
  if (next)     next.hidden     = true;

  renderProgressDots();

  // Re-trigger fade-in.
  const card = document.querySelector('.quiz-card');
  if (card) {
    card.classList.remove('quiz-card-enter');
    void card.offsetWidth;
    card.classList.add('quiz-card-enter');
  }
}

function renderProgressDots() {
  const el = document.getElementById('quiz-progress');
  if (!el) return;
  el.innerHTML = '';
  for (let i = 0; i < quizQuestions.length; i++) {
    const dot = document.createElement('span');
    dot.className = 'quiz-progress-dot';
    if (quizAnswers[i] !== null) {
      const wasRight = quizAnswers[i] === quizQuestions[i].correct;
      dot.classList.add(wasRight ? 'quiz-progress-right' : 'quiz-progress-wrong');
    }
    if (i === quizIndex) dot.classList.add('quiz-progress-current');
    el.appendChild(dot);
  }
}

function handleAnswer(choiceIdx) {
  if (quizAnswers[quizIndex] !== null) return;   // already answered

  const q          = quizQuestions[quizIndex];
  const wasCorrect = (choiceIdx === q.correct);
  quizAnswers[quizIndex] = choiceIdx;

  // Lock all buttons; highlight correct + (if wrong) the user's pick.
  document.querySelectorAll('.quiz-choice').forEach(btn => {
    btn.disabled = true;
    const i = parseInt(btn.dataset.choice, 10);
    if (i === q.correct)  btn.classList.add('quiz-choice-correct');
    if (i === choiceIdx && !wasCorrect) btn.classList.add('quiz-choice-wrong');
  });

  // Feedback panel.
  const feedback = document.getElementById('quiz-feedback');
  const headline = document.getElementById('quiz-feedback-headline');
  const explain  = document.getElementById('quiz-feedback-explanation');
  if (feedback && headline && explain) {
    headline.textContent = wasCorrect ? '✓ Correct' : '✗ Not quite';
    headline.className   = 'quiz-feedback-headline ' +
      (wasCorrect ? 'quiz-feedback-right' : 'quiz-feedback-wrong');
    explain.textContent  = q.explanation;
    feedback.hidden      = false;
  }

  // Next button — label depends on whether this was the last question.
  const next = document.getElementById('quiz-next');
  if (next) {
    next.hidden      = false;
    next.textContent = (quizIndex === quizQuestions.length - 1) ? 'See results →' : 'Next →';
  }

  renderProgressDots();
}

function advance() {
  if (quizIndex < quizQuestions.length - 1) {
    quizIndex++;
    renderQuestion();
  } else {
    finish();
  }
}

/* ---------- Results ---------- */

function finish() {
  const score = quizAnswers.reduce(
    (n, ans, i) => n + (ans === quizQuestions[i].correct ? 1 : 0), 0);

  // Persist best score for the home-page progress strip.
  const previousBest = getProgress()[quizSlug]?.bestScore;
  recordQuizScore(quizSlug, score);
  const newBest = getProgress()[quizSlug]?.bestScore;

  show('quiz-card', false);
  show('quiz-results', true);

  // Headline + score
  const title  = document.getElementById('quiz-results-title');
  const badge  = document.getElementById('quiz-results-badge');
  const scoreEl= document.getElementById('quiz-score');
  const total  = document.getElementById('quiz-total');
  const best   = document.getElementById('quiz-results-best');
  const back   = document.getElementById('quiz-back-to-module');

  if (scoreEl) scoreEl.textContent = score;
  if (total)   total.textContent   = quizQuestions.length;
  if (back)    back.href           = quizModule.page;

  const tier = scoreForTier(score, quizQuestions.length);
  if (title) title.textContent = tier.title;
  if (badge) {
    badge.textContent = tier.emoji;
    badge.className   = `quiz-results-badge tier-${tier.key}`;
  }

  // Best-score line — celebrate a new record.
  if (best) {
    const isNewBest = (previousBest === null || score > previousBest);
    if (isNewBest && score > 0) {
      best.textContent = `🏆 New personal best!`;
      best.className   = 'quiz-results-best is-best';
    } else if (newBest !== null) {
      best.textContent = `Best score so far: ${newBest} / ${quizQuestions.length}`;
      best.className   = 'quiz-results-best';
    } else {
      best.textContent = '';
    }
  }

  // Per-question breakdown
  const breakdown = document.getElementById('quiz-results-breakdown');
  if (breakdown) {
    breakdown.innerHTML = quizQuestions.map((q, i) => {
      const wasRight = quizAnswers[i] === q.correct;
      const mark     = wasRight ? '✓' : '✗';
      const cls      = wasRight ? 'breakdown-right' : 'breakdown-wrong';
      const correct  = q.choices[q.correct];
      return `
        <li class="breakdown-item ${cls}">
          <span class="breakdown-mark">${mark}</span>
          <div class="breakdown-body">
            <p class="breakdown-q">${q.q}</p>
            ${wasRight ? '' :
              `<p class="breakdown-correct">Answer: <strong>${correct}</strong></p>`}
          </div>
        </li>
      `;
    }).join('');
  }
}

function scoreForTier(score, total) {
  const pct = score / total;
  if (pct === 1)    return { key: 'perfect',  emoji: '🏆', title: 'Perfect score!' };
  if (pct >= 0.8)   return { key: 'mastered', emoji: '⭐', title: 'Mastered' };
  if (pct >= 0.6)   return { key: 'solid',    emoji: '👍', title: 'Solid effort' };
  if (pct >= 0.4)   return { key: 'try',      emoji: '📖', title: 'Keep studying' };
  return                   { key: 'retry',    emoji: '🔁', title: 'Give it another go' };
}

/* ---------- Utilities ---------- */

function sample(arr, n) {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

function show(id, visible) {
  const el = document.getElementById(id);
  if (el) el.hidden = !visible;
}
