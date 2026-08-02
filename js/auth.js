/* =========================================================
   auth.js — Supabase auth wrapper
   Init a shared Supabase client and expose sign-in/up/out
   helpers. Depends on the Supabase JS SDK being loaded first
   via a <script> tag from the CDN.
   ========================================================= */

const SUPABASE_URL = 'https://luavexulkidlyjbrbafe.supabase.co';
// This "anon" key is safe to expose in frontend code — that's what it's for.
// Paste yours from Supabase → Project Settings → API → "anon public".
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1YXZleHVsa2lkbHlqYnJiYWZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyNzQ3NjcsImV4cCI6MjEwMDg1MDc2N30.cAYYWW6kd0C10tfFvfdaOk2M1deFAF-NxywLzKutqNE';

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function signUp(email, password) {
  return await sb.auth.signUp({ email, password });
}

async function signIn(email, password) {
  return await sb.auth.signInWithPassword({ email, password });
}

async function signOut() {
  await sb.auth.signOut();
  window.location.href = 'login.html';
}
async function getCurrentUser() {
  const { data } = await sb.auth.getUser();
  return data.user;
}

// Send a password-reset email. The link inside points at reset-password.html.
async function sendPasswordReset(email) {
  return await sb.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + '/reset-password.html'
  });
}

// Called from reset-password.html after the visitor clicks the email link.
async function updatePassword(newPassword) {
  return await sb.auth.updateUser({ password: newPassword });
}

// Redirect to login if the visitor isn't signed in.
// Call at the top of any page that should require an account.
async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    window.location.href = 'login.html';
    return null;
  }
  return user;
}
