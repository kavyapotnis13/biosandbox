/* =========================================================
   standards.js — renders the AP Bio alignment page.

   For each of the 8 units, shows: unit number + name + exam
   weight + list of LOs. Each LO is marked covered (with the
   module that covers it) or uncovered.

   Depends on:
     data/modules.js     (MODULES)
     data/ap-standards.js (AP_BIO_UNITS, AP_BIO_BIG_IDEAS)
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof AP_BIO_UNITS === 'undefined' || typeof MODULES === 'undefined') return;

  // Build a reverse map: LO code → list of modules that cover it.
  const coverage = {};
  for (const m of MODULES) {
    for (const code of m.apStandards || []) {
      if (!coverage[code]) coverage[code] = [];
      coverage[code].push(m);
    }
  }

  const grid = document.getElementById('standards-grid');
  if (!grid) return;

  // Roll up summary counts.
  let totalLOsCovered = 0;
  let unitsCovered    = 0;

  grid.innerHTML = AP_BIO_UNITS.map(unit => {
    const covered = unit.los.filter(lo => coverage[lo.code]);
    if (covered.length) unitsCovered++;
    totalLOsCovered += covered.length;
    const pct = Math.round((covered.length / unit.los.length) * 100);

    const bigIdeas = unit.bigIdeas
      .map(k => `<span class="big-idea-tag big-idea-${k.toLowerCase()}" title="${escAttr(AP_BIO_BIG_IDEAS[k] || k)}">${k}</span>`)
      .join('');

    const losHtml = unit.los.map(lo => {
      const mods = coverage[lo.code] || [];
      const stateClass = mods.length ? 'lo-covered' : 'lo-uncovered';
      const modsHtml = mods.length
        ? mods.map(m => `<a href="${m.page}" class="lo-module-link">${m.name}</a>`).join(', ')
        : '<span class="lo-uncovered-tag">Not yet covered</span>';
      return `
        <li class="lo-row ${stateClass}">
          <div class="lo-head">
            <span class="lo-code">${lo.code}</span>
            <span class="lo-title">${esc(lo.title)}</span>
          </div>
          <div class="lo-modules">${modsHtml}</div>
        </li>
      `;
    }).join('');

    const coverageClass = covered.length === 0 ? 'unit-uncovered'
                       : covered.length === unit.los.length ? 'unit-full'
                       : 'unit-partial';

    return `
      <article class="unit-card ${coverageClass}">
        <header class="unit-card-header">
          <div class="unit-card-title-row">
            <span class="unit-number">Unit ${unit.number}</span>
            <h2 class="unit-name">${esc(unit.name)}</h2>
          </div>
          <div class="unit-card-meta">
            <span class="unit-weight">${unit.weight} of exam</span>
            <span class="unit-big-ideas">${bigIdeas}</span>
          </div>
          <div class="unit-coverage-bar" aria-label="Coverage progress">
            <div class="unit-coverage-fill" style="width:${pct}%"></div>
          </div>
          <p class="unit-coverage-text">
            <strong>${covered.length}</strong> of <strong>${unit.los.length}</strong> LOs covered (${pct}%)
          </p>
        </header>
        <ul class="lo-list">${losHtml}</ul>
      </article>
    `;
  }).join('');

  const unitsEl = document.getElementById('units-covered');
  const losEl   = document.getElementById('los-covered');
  const totalEl = document.getElementById('los-total');
  const totalLOs = AP_BIO_UNITS.reduce((n, u) => n + u.los.length, 0);
  if (unitsEl) unitsEl.textContent = unitsCovered;
  if (losEl)   losEl.textContent   = totalLOsCovered;
  if (totalEl) totalEl.textContent = totalLOs;
});

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function escAttr(s) {
  return esc(s).replace(/"/g, '&quot;');
}
