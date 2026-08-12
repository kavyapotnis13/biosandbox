/* =========================================================
   auth-gate.js — runs on every protected page.
   Hides the page until we've confirmed the visitor is signed
   in; redirects to login.html if not. Once confirmed, drops
   a "Log out" button into the top-left corner.
   Requires auth.js (and the Supabase SDK) to be loaded first.
   ========================================================= */

// Hide immediately so unauthenticated visitors never see content.
document.documentElement.style.visibility = 'hidden';

requireAuth().then(user => {
  if (!user) return; // requireAuth() already fired the redirect
  document.documentElement.style.visibility = 'visible';
  mountLogoutButton(user);
});

function mountLogoutButton(user) {
  const initial = (user.email || '?').charAt(0).toUpperCase();

  const wrap = document.createElement('div');
  wrap.id = 'auth-wrap';
  wrap.style.cssText = "position:fixed;top:1rem;right:1rem;z-index:1000;font-family:'Inter',sans-serif;";
  wrap.innerHTML = `
    <button type="button" id="auth-avatar" aria-label="Account menu"
      style="width:36px;height:36px;border-radius:50%;background:#7a1f1f;color:#fff;
             border:none;cursor:pointer;font:600 14px/1 'Inter',sans-serif;
             display:flex;align-items:center;justify-content:center;
             box-shadow:0 1px 3px rgba(0,0,0,0.15);">
      ${initial}
    </button>
    <div id="auth-menu" style="display:none;position:absolute;top:calc(100% + 6px);right:0;
         min-width:200px;background:#fff;border:1px solid #e2e2e2;border-radius:6px;
         box-shadow:0 4px 12px rgba(0,0,0,0.08);overflow:hidden;">
      <div style="padding:0.65rem 0.85rem;font-size:0.78rem;color:#666;
                  border-bottom:1px solid #eee;word-break:break-all;">
        ${user.email}
      </div>
      <button type="button" id="auth-logout"
        style="width:100%;text-align:left;background:none;border:none;padding:0.65rem 0.85rem;
               font:500 0.85rem 'Inter',sans-serif;color:#7a1f1f;cursor:pointer;">
        Log out
      </button>
    </div>
  `;
  document.body.appendChild(wrap);

  const avatar = wrap.querySelector('#auth-avatar');
  const menu   = wrap.querySelector('#auth-menu');
  const logout = wrap.querySelector('#auth-logout');

  avatar.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  });
  logout.addEventListener('click', signOut);
  logout.addEventListener('mouseenter', () => logout.style.background = '#faf3f3');
  logout.addEventListener('mouseleave', () => logout.style.background = 'none');
  document.addEventListener('click', () => { menu.style.display = 'none'; });
}
