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
  if (!form || !input || !chat) return;

  history = loadHistory();
  history.forEach(m => renderMessage(m.role, m.content));
  if (history.length > 0) hideStarters();

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
  hideStarters();
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
