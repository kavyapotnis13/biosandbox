/* =========================================================
   tutor.js — Lab Partner chat client

   Talks to the Cloudflare Worker proxy (worker/src/index.js)
   which forwards to the Anthropic API with the API key kept
   server-side. The Worker handles the system prompt and module
   list — this file only manages the chat UI.

   To point at a different Worker URL, edit WORKER_URL below.
   ========================================================= */

const WORKER_URL = 'https://biosandbox-tutor.kpotnis.workers.dev/chat';

const STORAGE_KEY = 'biosandbox-tutor-history';
const MAX_TURNS_KEPT = 16; // last N messages sent back to the model

let history = [];

document.addEventListener('DOMContentLoaded', () => {
  const form     = document.getElementById('tutor-form');
  const input    = document.getElementById('tutor-input');
  const chat     = document.getElementById('tutor-chat');
  const starters = document.getElementById('tutor-starters');
  const newChat  = document.getElementById('tutor-new-chat');
  if (!form || !input || !chat) return;

  history = loadHistory();
  history.forEach(m => renderMessage(m.role, m.content));
  if (history.length > 0) { hideStarters(); showResetButton(); }

  initVoiceInput(input);

  newChat?.addEventListener('click', () => {
    stopSpeaking();
    resetChat();
    input.focus();
  });

  // Auto-grow textarea up to 6 lines.
  input.addEventListener('input', () => autoGrow(input));
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      form.requestSubmit();
    }
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    autoGrow(input);
    sendMessage(text);
  });

  starters?.addEventListener('click', e => {
    const btn = e.target.closest('.tutor-starter');
    if (!btn) return;
    sendMessage(btn.dataset.prompt);
  });
});

/* ---------- Sending ---------- */

async function sendMessage(text) {
  stopListening();
  stopSpeaking();
  hideStarters();
  showResetButton();
  pushHistory('user', text);
  renderMessage('user', text);

  if (WORKER_URL.includes('YOUR-SUBDOMAIN')) {
    renderError("The tutor isn't deployed yet. See worker/README.md for setup steps, then update WORKER_URL in js/tutor.js.");
    return;
  }

  const thinking = renderThinking();

  try {
    const audience = (typeof getTrack === 'function') ? getTrack() : 'high';
    const recent   = history.slice(-MAX_TURNS_KEPT);

    const resp = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ messages: recent, audience }),
    });

    if (!resp.ok) {
      const errText = await resp.text().catch(() => '');
      throw new Error(`Server responded ${resp.status}. ${errText}`);
    }

    const data = await resp.json();
    const reply = extractText(data);
    thinking.remove();

    if (!reply) {
      renderError("I didn't get a reply back. Try asking again?");
      return;
    }

    pushHistory('assistant', reply);
    renderMessage('assistant', reply);
  } catch (err) {
    thinking.remove();
    renderError(`Couldn't reach the tutor. ${err.message || err}`);
  }
}

function extractText(data) {
  // Anthropic API response shape: { content: [{ type: 'text', text: '...' }, ...] }
  if (!data || !Array.isArray(data.content)) return '';
  return data.content
    .filter(b => b.type === 'text')
    .map(b => b.text)
    .join('\n')
    .trim();
}

/* ---------- Rendering ---------- */

function renderMessage(role, text) {
  const chat = document.getElementById('tutor-chat');
  const bubble = document.createElement('div');
  bubble.className = `tutor-msg tutor-msg-${role}`;

  const avatar = document.createElement('div');
  avatar.className = 'tutor-avatar';
  avatar.setAttribute('aria-hidden', 'true');
  avatar.textContent = role === 'user' ? 'You' : '🧬';

  const body = document.createElement('div');
  body.className = 'tutor-body';
  body.innerHTML = role === 'assistant' ? renderMarkdown(text) : escapeHtml(text);

  bubble.appendChild(avatar);
  bubble.appendChild(body);
  chat.appendChild(bubble);
  if (role === 'assistant') attachSpeaker(body, text);
  scrollToBottom();
  return bubble;
}

function renderThinking() {
  const chat = document.getElementById('tutor-chat');
  const bubble = document.createElement('div');
  bubble.className = 'tutor-msg tutor-msg-assistant tutor-msg-thinking';
  bubble.innerHTML = `
    <div class="tutor-avatar" aria-hidden="true">🧬</div>
    <div class="tutor-body">
      <span class="tutor-typing"><span></span><span></span><span></span></span>
    </div>
  `;
  chat.appendChild(bubble);
  scrollToBottom();
  return bubble;
}

function renderError(msg) {
  const chat = document.getElementById('tutor-chat');
  const bubble = document.createElement('div');
  bubble.className = 'tutor-msg tutor-msg-error';
  bubble.innerHTML = `
    <div class="tutor-avatar" aria-hidden="true">!</div>
    <div class="tutor-body">${escapeHtml(msg)}</div>
  `;
  chat.appendChild(bubble);
  scrollToBottom();
}

function scrollToBottom() {
  const chat = document.getElementById('tutor-chat');
  if (chat) chat.scrollTop = chat.scrollHeight;
}

function hideStarters() {
  const s = document.getElementById('tutor-starters');
  if (s) s.hidden = true;
}

function showStarters() {
  const s = document.getElementById('tutor-starters');
  if (s) s.hidden = false;
}

function showResetButton() {
  const b = document.getElementById('tutor-new-chat');
  if (b) b.hidden = false;
}

function hideResetButton() {
  const b = document.getElementById('tutor-new-chat');
  if (b) b.hidden = true;
}

function resetChat() {
  history = [];
  try { sessionStorage.removeItem(STORAGE_KEY); } catch (_) {}
  const chat = document.getElementById('tutor-chat');
  if (chat) chat.innerHTML = '';
  showStarters();
  hideResetButton();
}

function autoGrow(el) {
  el.style.height = 'auto';
  const max = parseFloat(getComputedStyle(el).lineHeight) * 6 + 24;
  el.style.height = Math.min(el.scrollHeight, max) + 'px';
}

/* ---------- Markdown (small, safe-ish subset) ---------- */

// Supports: paragraphs, line breaks, **bold**, *italic*, `code`,
// [text](path.html) links, bulleted lists. No raw HTML allowed —
// everything is escaped first, then re-inflated.
function renderMarkdown(text) {
  let s = escapeHtml(text);

  // Bulleted lists: lines starting with "- " or "* ".
  s = s.replace(/(^|\n)((?:[*-] .+(?:\n|$))+)/g, (_, lead, block) => {
    const items = block.trim().split('\n').map(line =>
      `<li>${line.replace(/^[*-]\s+/, '')}</li>`
    ).join('');
    return `${lead}<ul>${items}</ul>`;
  });

  // Inline code
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Bold then italic
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(?<!\w)\*([^*]+)\*(?!\w)/g, '<em>$1</em>');

  // Links — only relative paths to module pages (whitelist).
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, label, href) => {
    if (isSafeModuleHref(href)) {
      return `<a class="tutor-link" href="${href}">${label}</a>`;
    }
    return label; // strip unsafe link, keep text
  });

  // Paragraphs: split on blank lines.
  const paras = s.split(/\n{2,}/).map(p => {
    if (/^<(ul|ol|pre|blockquote)/.test(p.trim())) return p;
    return `<p>${p.replace(/\n/g, '<br>')}</p>`;
  });
  return paras.join('');
}

function isSafeModuleHref(href) {
  // Only allow relative .html files (no protocol, no //, no ..).
  if (/^[a-z]+:/i.test(href)) return false;
  if (href.startsWith('//')) return false;
  if (href.includes('..')) return false;
  return /\.html(\?.*)?(#.*)?$/.test(href) || href.startsWith('#');
}

function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ---------- History (sessionStorage so refresh keeps the chat) ---------- */

function pushHistory(role, content) {
  history.push({ role, content });
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (_) {}
}

function loadHistory() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch (_) {
    return [];
  }
}

/* ---------- Voice input (Web Speech API) ---------- */

let recognition = null;
let listening = false;
let baseInputText = '';

function initVoiceInput(input) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const mic = document.getElementById('tutor-mic');
  if (!SR || !mic) return;
  mic.hidden = false;

  recognition = new SR();
  recognition.lang = 'en-US';
  recognition.interimResults = true;
  recognition.continuous = false;

  recognition.addEventListener('result', e => {
    let finalText = '';
    let interimText = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const t = e.results[i][0].transcript;
      if (e.results[i].isFinal) finalText += t;
      else interimText += t;
    }
    input.value = baseInputText + finalText + interimText;
    autoGrow(input);
  });

  recognition.addEventListener('end', () => {
    listening = false;
    mic.classList.remove('recording');
    mic.setAttribute('aria-label', 'Start voice input');
  });

  recognition.addEventListener('error', e => {
    listening = false;
    mic.classList.remove('recording');
    mic.setAttribute('aria-label', 'Start voice input');
    if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
      renderError("I couldn't access the mic. Check your browser's mic permissions and try again.");
      mic.hidden = true;
    }
    // 'no-speech' and 'aborted' are silent — user just stopped or paused.
  });

  mic.addEventListener('click', () => {
    if (listening) { stopListening(); return; }
    stopSpeaking();
    baseInputText = input.value;
    if (baseInputText && !baseInputText.endsWith(' ')) baseInputText += ' ';
    try {
      recognition.start();
      listening = true;
      mic.classList.add('recording');
      mic.setAttribute('aria-label', 'Stop voice input');
      input.focus();
    } catch (_) {
      // start() throws if already running — treat as no-op.
    }
  });
}

function stopListening() {
  if (recognition && listening) {
    try { recognition.stop(); } catch (_) {}
  }
}

/* ---------- Voice output (SpeechSynthesis) ---------- */

function speechSupported() {
  return typeof window.speechSynthesis !== 'undefined'
      && typeof window.SpeechSynthesisUtterance !== 'undefined';
}

function stopSpeaking() {
  if (!speechSupported()) return;
  window.speechSynthesis.cancel();
  document.querySelectorAll('.tutor-speak-btn.speaking')
    .forEach(b => b.classList.remove('speaking'));
}

function attachSpeaker(body, rawText) {
  if (!speechSupported()) return;
  const actions = document.createElement('div');
  actions.className = 'tutor-body-actions';

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'tutor-speak-btn';
  btn.setAttribute('aria-label', 'Read this reply aloud');
  btn.title = 'Read aloud';
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 9v6h4l5 4V5L8 9H4z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M16 8a5 5 0 0 1 0 8M19 5a9 9 0 0 1 0 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>
  `;

  btn.addEventListener('click', () => {
    const wasSpeaking = btn.classList.contains('speaking');
    stopSpeaking();
    if (wasSpeaking) return; // toggle off
    const u = new SpeechSynthesisUtterance(stripMarkdown(rawText));
    u.lang = 'en-US';
    u.rate = 1.0;
    u.pitch = 1.0;
    u.onend   = () => btn.classList.remove('speaking');
    u.onerror = () => btn.classList.remove('speaking');
    btn.classList.add('speaking');
    btn.setAttribute('aria-label', 'Stop reading aloud');
    window.speechSynthesis.speak(u);
  });

  actions.appendChild(btn);
  body.appendChild(actions);
}

function stripMarkdown(s) {
  return s
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/(?<!\w)\*([^*]+)\*(?!\w)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^\s*[-*]\s+/gm, '');
}
