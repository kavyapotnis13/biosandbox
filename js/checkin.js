/* =========================================================
   checkin.js — sub-unit check-in quizzes.

   Fires between decks in a module. Takes over the flashcard
   pane, walks the user through N questions (any mix of
   multiple-choice / true-false / match), shows a summary,
   then hands control back via opts.onDone().

   Public API:
     startCheckin(questions, opts)
       opts.title     — string shown above the questions
       opts.nextLabel — label for the "Continue" button
       opts.onDone(score) — called when user clicks Continue

   XP: awards XP for each correct answer + a small bonus for
   a perfect score.
   ========================================================= */

const CHECKIN_XP_PER_CORRECT = 30;
const CHECKIN_XP_PERFECT_BONUS = 100;

let checkinState = null;

function startCheckin(questions, opts) {
  opts = opts || {};
  checkinState = {
    questions,
    idx: 0,
    correctCount: 0,
    title: opts.title || 'Quick check-in',
    nextLabel: opts.nextLabel || 'Continue →',
    onDone: opts.onDone || function(){},
    slug: opts.slug || 'checkin'
  };
  renderCheckinFrame();
  renderCheckinQuestion();
}

function renderCheckinFrame() {
  const deck    = document.getElementById('flashcard-deck');
  const nav     = deck?.querySelector('.flashcard-nav');
  const backBtn = document.getElementById('section-back');
  const label   = document.getElementById('section-label');

  if (nav)     nav.style.display = 'none';
  if (backBtn) backBtn.hidden = true;
  if (label)   label.textContent = checkinState.title;
}

function unmountCheckin() {
  const deck    = document.getElementById('flashcard-deck');
  const nav     = deck?.querySelector('.flashcard-nav');
  if (nav) nav.style.display = '';
}

function renderCheckinQuestion() {
  const state = checkinState;
  const q = state.questions[state.idx];
  const titleEl = document.querySelector('.flashcard-title');
  const bodyEl  = document.querySelector('.flashcard-body');
  if (!bodyEl) return;

  if (titleEl) titleEl.textContent = `Question ${state.idx + 1} of ${state.questions.length}`;

  if (q.type === 'mc')    return renderMc(q, bodyEl);
  if (q.type === 'tf')    return renderTf(q, bodyEl);
  if (q.type === 'match') return renderMatch(q, bodyEl);
  bodyEl.innerHTML = `<p>Unknown question type: ${q.type}</p>`;
}

/* ---------- Multiple choice ---------- */

function renderMc(q, bodyEl) {
  bodyEl.innerHTML = `
    <p class="checkin-q">${q.q}</p>
    <div class="checkin-choices">
      ${q.choices.map((c, i) => `
        <button type="button" class="checkin-choice" data-i="${i}">${c}</button>
      `).join('')}
    </div>
    <div class="checkin-feedback" hidden></div>
  `;
  bodyEl.querySelectorAll('.checkin-choice').forEach(btn => {
    btn.addEventListener('click', () => {
      const picked = parseInt(btn.dataset.i, 10);
      const isRight = picked === q.correct;
      bodyEl.querySelectorAll('.checkin-choice').forEach((b, i) => {
        b.disabled = true;
        if (i === q.correct)     b.classList.add('is-correct');
        else if (i === picked)   b.classList.add('is-wrong');
      });
      showFeedback(bodyEl, isRight, q.explanation);
    });
  });
}

/* ---------- True/False ---------- */

function renderTf(q, bodyEl) {
  bodyEl.innerHTML = `
    <p class="checkin-q">${q.q}</p>
    <div class="checkin-tf">
      <button type="button" class="checkin-choice" data-v="true">True</button>
      <button type="button" class="checkin-choice" data-v="false">False</button>
    </div>
    <div class="checkin-feedback" hidden></div>
  `;
  bodyEl.querySelectorAll('.checkin-choice').forEach(btn => {
    btn.addEventListener('click', () => {
      const picked = btn.dataset.v === 'true';
      const isRight = picked === q.correct;
      bodyEl.querySelectorAll('.checkin-choice').forEach(b => {
        b.disabled = true;
        const bVal = b.dataset.v === 'true';
        if (bVal === q.correct)     b.classList.add('is-correct');
        else if (bVal === picked)   b.classList.add('is-wrong');
      });
      showFeedback(bodyEl, isRight, q.explanation);
    });
  });
}

/* ---------- Match pairs (slots + chips) ---------- */

function renderMatch(q, bodyEl) {
  // Each chip carries its correctLeft so we can grade regardless of order.
  const chips = q.pairs.map((p, i) => ({ text: p.right, correctLeft: i }));
  shuffle(chips);

  // slotFills[leftIdx] = chipIdx (into `chips` array) or undefined
  const slotFills = {};
  let selectedChip = null; // chipIdx or null

  bodyEl.innerHTML = `
    <p class="checkin-q">${q.q}</p>
    <p class="checkin-match-hint">Click an answer chip below, then click the slot next to the term it matches. Click a filled slot to release it.</p>
    <div class="checkin-slots">
      ${q.pairs.map((p, i) => `
        <div class="checkin-slot-row" data-left="${i}">
          <span class="checkin-slot-term">${p.left}</span>
          <button type="button" class="checkin-slot" data-slot="${i}" aria-label="Answer slot for ${p.left}">
            <span class="checkin-slot-placeholder">Drop answer here</span>
          </button>
        </div>
      `).join('')}
    </div>
    <div class="checkin-chip-pool" id="checkin-chip-pool">
      ${chips.map((c, i) => `
        <button type="button" class="checkin-chip" data-chip="${i}">${c.text}</button>
      `).join('')}
    </div>
    <button type="button" class="checkin-submit" id="checkin-match-submit" disabled>Check answers</button>
    <div class="checkin-feedback" hidden></div>
  `;

  const slotEls  = bodyEl.querySelectorAll('.checkin-slot');
  const chipEls  = bodyEl.querySelectorAll('.checkin-chip');
  const submitBtn = bodyEl.querySelector('#checkin-match-submit');

  function paint() {
    // Paint slots: filled ones show the chip's text, empty ones show placeholder.
    slotEls.forEach(slot => {
      const leftIdx = parseInt(slot.dataset.slot, 10);
      const chipIdx = slotFills[leftIdx];
      if (chipIdx !== undefined) {
        slot.classList.add('is-filled');
        slot.innerHTML = `<span class="checkin-slot-chip">${chips[chipIdx].text}</span>`;
      } else {
        slot.classList.remove('is-filled');
        slot.innerHTML = `<span class="checkin-slot-placeholder">Drop answer here</span>`;
      }
    });
    // Paint chips: hide those currently placed in a slot; highlight the selected one.
    const placed = new Set(Object.values(slotFills));
    chipEls.forEach(chip => {
      const idx = parseInt(chip.dataset.chip, 10);
      chip.classList.toggle('is-selected', selectedChip === idx);
      chip.classList.toggle('is-placed', placed.has(idx));
    });
    submitBtn.disabled = Object.keys(slotFills).length !== q.pairs.length;
  }

  chipEls.forEach(chip => chip.addEventListener('click', () => {
    const idx = parseInt(chip.dataset.chip, 10);
    // Ignore clicks on chips already placed.
    if (Object.values(slotFills).includes(idx)) return;
    selectedChip = (selectedChip === idx) ? null : idx;
    paint();
  }));

  slotEls.forEach(slot => slot.addEventListener('click', () => {
    const leftIdx = parseInt(slot.dataset.slot, 10);
    // Filled slot → release the chip back to the pool.
    if (slotFills[leftIdx] !== undefined) {
      delete slotFills[leftIdx];
      paint();
      return;
    }
    // Empty slot with a selected chip → place it.
    if (selectedChip !== null) {
      slotFills[leftIdx] = selectedChip;
      selectedChip = null;
      paint();
    }
  }));

  submitBtn.addEventListener('click', () => {
    let allRight = true;
    slotEls.forEach(slot => {
      const leftIdx = parseInt(slot.dataset.slot, 10);
      const chipIdx = slotFills[leftIdx];
      const isRight = chipIdx !== undefined && chips[chipIdx].correctLeft === leftIdx;
      if (!isRight) allRight = false;
      slot.classList.toggle('is-correct', isRight);
      slot.classList.toggle('is-wrong', !isRight);
      slot.disabled = true;
    });
    chipEls.forEach(chip => chip.disabled = true);
    submitBtn.disabled = true;
    submitBtn.hidden = true;
    showFeedback(bodyEl, allRight, q.explanation);
  });

  paint();
}

/* ---------- Feedback + advance ---------- */

function showFeedback(bodyEl, isRight, explanation) {
  const fb = bodyEl.querySelector('.checkin-feedback');
  if (!fb) return;
  fb.hidden = false;
  fb.classList.add(isRight ? 'is-right' : 'is-wrong');
  fb.innerHTML = `
    <div class="checkin-feedback-head">${isRight ? '✓ Correct' : '✗ Not quite'}</div>
    <p class="checkin-feedback-body">${explanation}</p>
    <button type="button" class="checkin-next">${nextButtonLabel()}</button>
  `;
  if (isRight) {
    checkinState.correctCount++;
    if (typeof addXP === 'function') addXP(CHECKIN_XP_PER_CORRECT, `checkin:${checkinState.slug}`);
  }
  fb.querySelector('.checkin-next').addEventListener('click', advanceCheckin);
}

function nextButtonLabel() {
  const isLast = checkinState.idx === checkinState.questions.length - 1;
  return isLast ? 'See results →' : 'Next question →';
}

function advanceCheckin() {
  checkinState.idx++;
  if (checkinState.idx >= checkinState.questions.length) {
    renderCheckinSummary();
    return;
  }
  renderCheckinQuestion();
}

function renderCheckinSummary() {
  const state = checkinState;
  const total = state.questions.length;
  const score = state.correctCount;
  const perfect = score === total;
  if (perfect && typeof addXP === 'function') {
    addXP(CHECKIN_XP_PERFECT_BONUS, `checkin:${state.slug}:perfect`);
  }
  const titleEl = document.querySelector('.flashcard-title');
  const bodyEl  = document.querySelector('.flashcard-body');
  if (titleEl) titleEl.textContent = perfect ? 'Perfect score!' : 'Check-in complete';
  if (bodyEl) {
    bodyEl.innerHTML = `
      <div class="checkin-summary">
        <div class="checkin-score">${score} / ${total}</div>
        <p class="checkin-summary-note">${summaryNote(score, total)}</p>
        <button type="button" class="checkin-next" id="checkin-continue">${state.nextLabel}</button>
      </div>
    `;
    bodyEl.querySelector('#checkin-continue').addEventListener('click', () => {
      const done = state.onDone;
      unmountCheckin();
      checkinState = null;
      done(score);
    });
  }
}

function summaryNote(score, total) {
  const pct = score / total;
  if (pct === 1)   return "You've got this cold. Onward.";
  if (pct >= 0.75) return "Solid understanding. Keep going.";
  if (pct >= 0.5)  return "Not bad — glance back at any cards that felt shaky if you want.";
  return "That's what these are for. Review the section and try the quiz later.";
}

/* ---------- utils ---------- */

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function isCheckinActive() { return checkinState !== null; }
