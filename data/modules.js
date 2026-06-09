/* =========================================================
   modules.js — single source of truth for all learning units
   This file controls what appears on the home page module grid.

   TO ADD A NEW UNIT (admin guide):
   1. Pick a theme from THEMES below (or add a new one).
   2. Copy one of the entries in MODULES and edit:
        - slug:       url-friendly id (lowercase, no spaces)
        - name:       what shows on the card title
        - blurb:      1-line description
        - page:       which HTML file the card links to
        - totalParts: how many "explorable parts" the unit has
                      (used for the % explored math on the home page)
        - theme:      a key from THEMES below
        - iconSvg:    the cute thumbnail SVG (paste your own markup)
   3. Create the HTML file (e.g. mitosis.html). Easiest: copy
      cell.html and change the title + tagline.
   4. Reload the home page — your new unit shows up automatically.

   Thumbnail style guide: flat geometric shapes with strong dark
   outlines (#2D2154), one or two internal highlights for depth,
   small floating accent particles. Inspired by Kurzgesagt.
   ========================================================= */

const THEMES = {
  sunshine: { bg: '#FFEFA5', accent: '#F07C99' },  // soft yellow + pink
  peach:    { bg: '#FFDCC4', accent: '#E8915F' },
  mint:     { bg: '#D5F4E2', accent: '#5FB890' },
  lavender: { bg: '#EFE5FF', accent: '#A584D9' },
  sky:      { bg: '#D5EAFF', accent: '#6B9FD6' },
  pink:     { bg: '#FFE5EC', accent: '#E5849C' }
};

const MODULES = [
  {
    slug: 'cell',
    name: 'Cell Explorer',
    blurb: 'Tour the organelles inside an animal or plant cell.',
    page: 'cell.html',
    totalParts: 11,
    theme: 'sunshine',
    iconSvg: `
      <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <ellipse cx="60" cy="52" rx="44" ry="38" fill="#FFE48F" opacity="0.55"/>
        <circle cx="14" cy="20" r="2.5" fill="#F07C99"/>
        <circle cx="106" cy="22" r="2" fill="#F07C99"/>
        <circle cx="108" cy="80" r="2.4" fill="#F07C99"/>
        <circle cx="16" cy="78" r="2" fill="#E8915F"/>
        <ellipse cx="60" cy="52" rx="38" ry="32" fill="#FFC4D2" stroke="#2D2154" stroke-width="2.8"/>
        <ellipse cx="52" cy="44" rx="22" ry="15" fill="#FFE0E8" opacity="0.55"/>
        <ellipse cx="80" cy="42" rx="9" ry="5" fill="#5FB890" stroke="#2D2154" stroke-width="2.5"/>
        <ellipse cx="77" cy="40" rx="3" ry="1.5" fill="#8FE0B0"/>
        <ellipse cx="74" cy="64" rx="6" ry="3.5" fill="#FFB870" stroke="#2D2154" stroke-width="2.2"/>
        <ellipse cx="72" cy="62" rx="2" ry="1" fill="#FFD5A8"/>
        <circle cx="40" cy="44" r="3" fill="#F07C99" stroke="#2D2154" stroke-width="1.8"/>
        <circle cx="42" cy="68" r="3" fill="#F07C99" stroke="#2D2154" stroke-width="1.8"/>
        <circle cx="86" cy="70" r="3" fill="#F07C99" stroke="#2D2154" stroke-width="1.8"/>
        <circle cx="56" cy="58" r="12" fill="#A484D9" stroke="#2D2154" stroke-width="2.8"/>
        <circle cx="52" cy="54" r="4" fill="#D4B0FF" opacity="0.75"/>
        <circle cx="52" cy="58" r="1.5" fill="#2D2154"/>
        <circle cx="60" cy="58" r="1.5" fill="#2D2154"/>
        <path d="M52 62 Q56 65 60 62" stroke="#2D2154" stroke-width="1.5" stroke-linecap="round" fill="none"/>
      </svg>
    `
  },
  {
    slug: 'dna',
    name: 'DNA & Replication',
    blurb: 'Watch the double helix unwind and copy itself, step by step.',
    page: 'dna.html',
    totalParts: 6,
    theme: 'sunshine',
    iconSvg: `
      <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <ellipse cx="60" cy="50" rx="36" ry="44" fill="#FFE48F" opacity="0.55"/>
        <circle cx="14" cy="20" r="2" fill="#F07C99"/>
        <circle cx="108" cy="22" r="2.4" fill="#F07C99"/>
        <circle cx="108" cy="78" r="2" fill="#A484D9"/>
        <circle cx="14" cy="78" r="2.2" fill="#F07C99"/>
        <path d="M34 10 C34 28, 86 28, 86 50 C86 72, 34 72, 34 90"
              stroke="#F07C99" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M86 10 C86 28, 34 28, 34 50 C34 72, 86 72, 86 90"
              stroke="#A484D9" stroke-width="5" fill="none" stroke-linecap="round"/>
        <rect x="38" y="18" width="44" height="5" rx="2.5" fill="#5FB890" stroke="#2D2154" stroke-width="1.8"/>
        <rect x="44" y="32" width="32" height="5" rx="2.5" fill="#FFB870" stroke="#2D2154" stroke-width="1.8"/>
        <rect x="44" y="63" width="32" height="5" rx="2.5" fill="#FFB870" stroke="#2D2154" stroke-width="1.8"/>
        <rect x="38" y="77" width="44" height="5" rx="2.5" fill="#5FB890" stroke="#2D2154" stroke-width="1.8"/>
        <circle cx="60" cy="50" r="11" fill="#FFD86A" stroke="#2D2154" stroke-width="2.8"/>
        <circle cx="56" cy="46" r="3.5" fill="#FFF1B8" opacity="0.75"/>
        <circle cx="56" cy="50" r="1.4" fill="#2D2154"/>
        <circle cx="64" cy="50" r="1.4" fill="#2D2154"/>
        <path d="M56 54 Q60 57 64 54" stroke="#2D2154" stroke-width="1.5" stroke-linecap="round" fill="none"/>
      </svg>
    `
  },
  {
    slug: 'protein',
    name: 'Protein Synthesis',
    blurb: 'Decode DNA into amino acids and build a protein chain.',
    page: 'protein.html',
    totalParts: 5,
    theme: 'sunshine',
    iconSvg: `
      <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <ellipse cx="60" cy="50" rx="48" ry="34" fill="#FFE48F" opacity="0.55"/>
        <circle cx="14" cy="20" r="2" fill="#F07C99"/>
        <circle cx="108" cy="22" r="2.4" fill="#F07C99"/>
        <circle cx="14" cy="82" r="2" fill="#E8915F"/>
        <path d="M16 54 L40 38 L66 64 L92 40 L114 56"
              stroke="#2D2154" stroke-width="2.2" fill="none" stroke-linecap="round"/>
        <circle cx="40" cy="38" r="11" fill="#FFD86A" stroke="#2D2154" stroke-width="2.8"/>
        <circle cx="36" cy="34" r="3" fill="#FFF1B8" opacity="0.75"/>
        <circle cx="66" cy="64" r="11" fill="#A484D9" stroke="#2D2154" stroke-width="2.8"/>
        <circle cx="62" cy="60" r="3" fill="#D4B0FF" opacity="0.75"/>
        <circle cx="92" cy="40" r="11" fill="#5FB890" stroke="#2D2154" stroke-width="2.8"/>
        <circle cx="88" cy="36" r="3" fill="#8FE0B0" opacity="0.75"/>
        <circle cx="114" cy="56" r="7" fill="#FFB870" stroke="#2D2154" stroke-width="2.5"/>
        <circle cx="112" cy="54" r="2" fill="#FFD5A8" opacity="0.7"/>
        <circle cx="16" cy="54" r="12" fill="#F07C99" stroke="#2D2154" stroke-width="2.8"/>
        <circle cx="12" cy="50" r="3.5" fill="#FFC0D5" opacity="0.7"/>
        <circle cx="12" cy="54" r="1.5" fill="#2D2154"/>
        <circle cx="20" cy="54" r="1.5" fill="#2D2154"/>
        <path d="M12 58 Q16 61 20 58" stroke="#2D2154" stroke-width="1.5" stroke-linecap="round" fill="none"/>
      </svg>
    `
  }

  // Example future module (copy + uncomment, then create its .html file):
  // ,{
  //   slug: 'mitosis',
  //   name: 'Mitosis',
  //   blurb: 'Step through the phases of cell division.',
  //   page: 'mitosis.html',
  //   totalParts: 4,
  //   theme: 'peach',
  //   iconSvg: `<svg viewBox="0 0 120 100">...your cute thumbnail...</svg>`
  // }
];

// Convenience helper — used by progress.js and app.js.
function getModule(slug) {
  return MODULES.find(m => m.slug === slug);
}
