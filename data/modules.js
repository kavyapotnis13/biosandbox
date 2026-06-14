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
  sunshine: { bg: '#FFEFA5', accent: '#F07C99' },  // soft yellow — cell
  peach:    { bg: '#FFDCC4', accent: '#E8915F' },  // warm peach — mitosis
  mint:     { bg: '#D5F4E2', accent: '#5FB890' },  // pale green — photosynthesis
  lavender: { bg: '#EFE5FF', accent: '#A584D9' },  // pale purple — respiration
  sky:      { bg: '#D5EAFF', accent: '#6B9FD6' },  // pale blue — natural selection
  pink:     { bg: '#FFE5EC', accent: '#E5849C' },  // soft pink — heredity
  forest:   { bg: '#D9E8C9', accent: '#5A8B47' },  // sage green — ecology
  aqua:     { bg: '#CDEFF3', accent: '#48A8B5' },  // pale aqua — chemistry of life
  rose:     { bg: '#F0C8D5', accent: '#A85070' },  // dusty rose — DNA
  teal:     { bg: '#C8E6E0', accent: '#4A8B85' },  // muted blue-green — protein synthesis
  amber:    { bg: '#FFE3B0', accent: '#C77E2A' },  // warm amber — enzymes
  azure:    { bg: '#CFE6F2', accent: '#3F86B0' },  // clean azure — cell signaling
  coral:    { bg: '#FFD6CC', accent: '#C95C46' },  // soft coral — membrane transport
  plum:     { bg: '#E2D2EA', accent: '#7B528F' }   // dusty plum — gene regulation
};

const MODULES = [
  {
    slug: 'chemistry',
    name: 'Chemistry of Life',
    blurb: 'Snap monomers together into polymers — and watch each bond release a water molecule.',
    page: 'chemistry.html',
    totalParts: 4,
    apStandards: ['1.1.A', '1.2.A', '1.3.A', '1.4.A', '1.5.A', '1.7.A'],
    theme: 'aqua',
    iconSvg: `
      <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <!-- Water molecule (ball-and-stick) -->
        <g transform="translate(34 28)">
          <line x1="-10" y1="9" x2="0" y2="0" stroke="#2D2154" stroke-width="1.6"/>
          <line x1="10" y1="9" x2="0" y2="0" stroke="#2D2154" stroke-width="1.6"/>
          <circle cx="0" cy="0" r="10" fill="#FBF6E8" stroke="#2D2154" stroke-width="1.8"/>
          <text x="0" y="3" font-family="serif" font-size="11" font-style="italic" font-weight="700" fill="#2D2154" text-anchor="middle">O</text>
          <circle cx="-10" cy="9" r="5" fill="#FBF6E8" stroke="#2D2154" stroke-width="1.5"/>
          <text x="-10" y="11" font-family="serif" font-size="6.5" font-style="italic" font-weight="700" fill="#2D2154" text-anchor="middle">H</text>
          <circle cx="10" cy="9" r="5" fill="#FBF6E8" stroke="#2D2154" stroke-width="1.5"/>
          <text x="10" y="11" font-family="serif" font-size="6.5" font-style="italic" font-weight="700" fill="#2D2154" text-anchor="middle">H</text>
        </g>
        <text x="68" y="32" font-family="serif" font-size="7" font-style="italic" fill="#2D2154">H₂O</text>
        <!-- Linear polymer: 4 monomers connected by bonds -->
        <g transform="translate(20 72)">
          <line x1="0" y1="0" x2="80" y2="0" stroke="#2D2154" stroke-width="1.6"/>
          <circle cx="0"  cy="0" r="6" fill="#FBF6E8" stroke="#2D2154" stroke-width="1.6"/>
          <circle cx="27" cy="0" r="6" fill="#FBF6E8" stroke="#2D2154" stroke-width="1.6"/>
          <circle cx="54" cy="0" r="6" fill="#FBF6E8" stroke="#2D2154" stroke-width="1.6"/>
          <circle cx="80" cy="0" r="6" fill="#FBF6E8" stroke="#2D2154" stroke-width="1.6"/>
        </g>
        <text x="60" y="94" font-family="serif" font-size="6.5" font-style="italic" fill="#2D2154" text-anchor="middle">monomer chain</text>
      </svg>
    `
  },
  {
    slug: 'cell',
    name: 'Cell Explorer',
    blurb: 'Tour the organelles inside an animal or plant cell.',
    page: 'cell.html',
    totalParts: 12,
    apStandards: ['2.1.A', '2.3.A', '2.3.B', '2.9.A', '2.9.B', '2.10.A'],
    theme: 'sunshine',
    iconSvg: `
      <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <!-- Cell membrane -->
        <ellipse cx="60" cy="52" rx="46" ry="36" fill="#FBF6E8" stroke="#2D2154" stroke-width="2"/>
        <!-- Nucleus + nucleolus -->
        <circle cx="60" cy="52" r="14" fill="#FBF6E8" stroke="#2D2154" stroke-width="1.8"/>
        <circle cx="62" cy="50" r="3.5" fill="#2D2154" opacity="0.55"/>
        <!-- Mitochondrion (cristae) -->
        <ellipse cx="30" cy="34" rx="12" ry="6" fill="#FBF6E8" stroke="#2D2154" stroke-width="1.6"/>
        <path d="M22 34 Q24 30 26 34 Q28 38 30 34 Q32 30 34 34 Q36 38 38 34" fill="none" stroke="#2D2154" stroke-width="0.9"/>
        <!-- Rough ER with ribosomes -->
        <path d="M88 32 Q94 28 99 34 Q104 40 99 47 Q94 54 89 50" fill="none" stroke="#2D2154" stroke-width="1.5"/>
        <circle cx="89" cy="32" r="1.1" fill="#2D2154"/>
        <circle cx="95" cy="29" r="1.1" fill="#2D2154"/>
        <circle cx="100" cy="35" r="1.1" fill="#2D2154"/>
        <circle cx="101" cy="43" r="1.1" fill="#2D2154"/>
        <circle cx="96" cy="50" r="1.1" fill="#2D2154"/>
        <!-- Golgi (stacked cisternae) -->
        <path d="M36 76 Q44 71 52 76" fill="none" stroke="#2D2154" stroke-width="1.3"/>
        <path d="M36 79 Q44 74 52 79" fill="none" stroke="#2D2154" stroke-width="1.3"/>
        <path d="M36 82 Q44 77 52 82" fill="none" stroke="#2D2154" stroke-width="1.3"/>
        <!-- Vesicles -->
        <circle cx="78" cy="72" r="3" fill="none" stroke="#2D2154" stroke-width="1.3"/>
        <circle cx="86" cy="76" r="2" fill="none" stroke="#2D2154" stroke-width="1.3"/>
        <circle cx="82" cy="82" r="2.4" fill="none" stroke="#2D2154" stroke-width="1.3"/>
      </svg>
    `
  },
  {
    slug: 'transport',
    name: 'Membrane Transport',
    blurb: 'Watch molecules cross a phospholipid bilayer — by diffusion, channel, pump, and osmosis.',
    page: 'transport.html',
    totalParts: 4,
    apStandards: ['2.2.A', '2.4.A', '2.5.A', '2.5.B', '2.6.A', '2.7.A', '2.7.B', '2.8.A'],
    theme: 'coral',
    iconSvg: `
      <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <!-- Phospholipid bilayer: two rows of heads with tails facing each other -->
        <g stroke="#2D2154" stroke-width="1.4" fill="#FBF6E8">
          <circle cx="14" cy="34" r="4"/><circle cx="28" cy="34" r="4"/><circle cx="42" cy="34" r="4"/>
          <circle cx="56" cy="34" r="4"/><circle cx="70" cy="34" r="4"/><circle cx="84" cy="34" r="4"/>
          <circle cx="98" cy="34" r="4"/><circle cx="112" cy="34" r="4"/>
          <circle cx="14" cy="68" r="4"/><circle cx="28" cy="68" r="4"/><circle cx="42" cy="68" r="4"/>
          <circle cx="56" cy="68" r="4"/><circle cx="70" cy="68" r="4"/><circle cx="84" cy="68" r="4"/>
          <circle cx="98" cy="68" r="4"/><circle cx="112" cy="68" r="4"/>
        </g>
        <!-- Hydrophobic tails (zigzags between heads) -->
        <g stroke="#2D2154" stroke-width="1" fill="none" stroke-linecap="round">
          <path d="M14 38 L12 44 L16 48 L14 52"/><path d="M28 38 L30 44 L26 48 L28 52"/>
          <path d="M42 38 L40 44 L44 48 L42 52"/><path d="M70 38 L68 44 L72 48 L70 52"/>
          <path d="M84 38 L86 44 L82 48 L84 52"/><path d="M98 38 L96 44 L100 48 L98 52"/>
          <path d="M112 38 L110 44 L114 48 L112 52"/>
          <path d="M14 64 L12 60 L16 56 L14 52"/><path d="M28 64 L30 60 L26 56 L28 52"/>
          <path d="M42 64 L40 60 L44 56 L42 52"/><path d="M70 64 L68 60 L72 56 L70 52"/>
          <path d="M84 64 L86 60 L82 56 L84 52"/><path d="M98 64 L96 60 L100 56 L98 52"/>
          <path d="M112 64 L110 60 L114 56 L112 52"/>
        </g>
        <!-- Channel protein (spans bilayer) -->
        <rect x="51" y="28" width="10" height="46" rx="3" fill="#FBF6E8" stroke="#2D2154" stroke-width="1.8"/>
        <line x1="56" y1="32" x2="56" y2="70" stroke="#2D2154" stroke-width="0.8" stroke-dasharray="2 2"/>
        <!-- Small molecule passing through -->
        <circle cx="56" cy="51" r="2.5" fill="#C77E2A" stroke="#2D2154" stroke-width="1"/>
        <!-- Outside molecules waiting to enter -->
        <circle cx="20" cy="14" r="2.5" fill="#FBF6E8" stroke="#2D2154" stroke-width="1"/>
        <circle cx="38" cy="20" r="2.5" fill="#FBF6E8" stroke="#2D2154" stroke-width="1"/>
        <circle cx="90" cy="16" r="2.5" fill="#FBF6E8" stroke="#2D2154" stroke-width="1"/>
        <!-- Inside molecules (already crossed) -->
        <circle cx="32" cy="88" r="2.5" fill="#C77E2A" stroke="#2D2154" stroke-width="1"/>
        <circle cx="80" cy="86" r="2.5" fill="#C77E2A" stroke="#2D2154" stroke-width="1"/>
      </svg>
    `
  },
  {
    slug: 'dna',
    name: 'DNA & Replication',
    blurb: 'Watch the double helix unwind and copy itself, step by step.',
    page: 'dna.html',
    totalParts: 6,
    apStandards: ['1.6.A', '6.1.A', '6.1.B', '6.2.A'],
    theme: 'rose',
    iconSvg: `
      <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <!-- Sugar-phosphate backbones (twisted ladder) -->
        <path d="M42 10 Q56 30 42 50 Q28 70 42 90" fill="none" stroke="#2D2154" stroke-width="2"/>
        <path d="M78 10 Q64 30 78 50 Q92 70 78 90" fill="none" stroke="#2D2154" stroke-width="2"/>
        <!-- Base-pair rungs: A–T (blue) and G–C (green) alternating -->
        <line x1="44" y1="18" x2="76" y2="18" stroke="#7A95B5" stroke-width="3" stroke-linecap="round"/>
        <line x1="48" y1="28" x2="72" y2="28" stroke="#6A9D6F" stroke-width="3" stroke-linecap="round"/>
        <line x1="50" y1="40" x2="70" y2="40" stroke="#7A95B5" stroke-width="3" stroke-linecap="round"/>
        <line x1="50" y1="52" x2="70" y2="52" stroke="#6A9D6F" stroke-width="3" stroke-linecap="round"/>
        <line x1="48" y1="64" x2="72" y2="64" stroke="#7A95B5" stroke-width="3" stroke-linecap="round"/>
        <line x1="44" y1="76" x2="76" y2="76" stroke="#6A9D6F" stroke-width="3" stroke-linecap="round"/>
        <line x1="42" y1="86" x2="78" y2="86" stroke="#7A95B5" stroke-width="3" stroke-linecap="round"/>
        <!-- Base-pair labels: A–T on top rung, G–C on second -->
        <text x="40" y="20" font-family="serif" font-size="6.5" font-style="italic" font-weight="700" fill="#2D2154" text-anchor="end">A</text>
        <text x="80" y="20" font-family="serif" font-size="6.5" font-style="italic" font-weight="700" fill="#2D2154" text-anchor="start">T</text>
        <text x="44" y="30" font-family="serif" font-size="6.5" font-style="italic" font-weight="700" fill="#2D2154" text-anchor="end">G</text>
        <text x="76" y="30" font-family="serif" font-size="6.5" font-style="italic" font-weight="700" fill="#2D2154" text-anchor="start">C</text>
      </svg>
    `
  },
  {
    slug: 'protein',
    name: 'Protein Synthesis',
    blurb: 'Decode DNA into amino acids and build a protein chain.',
    page: 'protein.html',
    totalParts: 5,
    apStandards: ['6.3.A', '6.4.A'],
    theme: 'teal',
    iconSvg: `
      <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <!-- mRNA strand with codon tick marks -->
        <line x1="6" y1="68" x2="114" y2="68" stroke="#2D2154" stroke-width="1.8"/>
        <g stroke="#2D2154" stroke-width="1">
          <line x1="20" y1="64" x2="20" y2="72"/>
          <line x1="38" y1="64" x2="38" y2="72"/>
          <line x1="56" y1="64" x2="56" y2="72"/>
          <line x1="74" y1="64" x2="74" y2="72"/>
          <line x1="92" y1="64" x2="92" y2="72"/>
        </g>
        <!-- Codon labels under mRNA -->
        <g font-family="monospace" font-size="5.5" fill="#2D2154">
          <text x="11" y="80">AUG</text>
          <text x="29" y="80">UUC</text>
          <text x="47" y="80">GCA</text>
          <text x="65" y="80">AAA</text>
          <text x="83" y="80">UGG</text>
        </g>
        <!-- Ribosome (large + small subunits sitting on mRNA) -->
        <ellipse cx="58" cy="48" rx="22" ry="12" fill="#FBF6E8" stroke="#2D2154" stroke-width="1.8"/>
        <ellipse cx="58" cy="58" rx="22" ry="8"  fill="#FBF6E8" stroke="#2D2154" stroke-width="1.8"/>
        <line x1="58" y1="54" x2="58" y2="50" stroke="#2D2154" stroke-width="0.8"/>
        <!-- Polypeptide chain emerging up-right -->
        <line x1="78" y1="42" x2="104" y2="14" stroke="#2D2154" stroke-width="1.2"/>
        <circle cx="80" cy="38" r="3.5" fill="#FBF6E8" stroke="#2D2154" stroke-width="1.4"/>
        <circle cx="88" cy="30" r="3.5" fill="#FBF6E8" stroke="#2D2154" stroke-width="1.4"/>
        <circle cx="96" cy="22" r="3.5" fill="#FBF6E8" stroke="#2D2154" stroke-width="1.4"/>
        <circle cx="104" cy="14" r="3.5" fill="#FBF6E8" stroke="#2D2154" stroke-width="1.4"/>
      </svg>
    `
  },
  {
    slug: 'regulation',
    name: 'Gene Regulation',
    blurb: 'Flip the lac operon on and off, mutate a codon, and meet PCR and CRISPR.',
    page: 'regulation.html',
    totalParts: 4,
    apStandards: ['6.5.A', '6.5.B', '6.6.A', '6.7.A', '6.7.B', '6.7.C', '6.8.A'],
    theme: 'plum',
    iconSvg: `
      <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <!-- DNA strand (horizontal) -->
        <line x1="6" y1="46" x2="114" y2="46" stroke="#2D2154" stroke-width="2"/>
        <line x1="6" y1="58" x2="114" y2="58" stroke="#2D2154" stroke-width="2"/>
        <!-- Base-pair ticks between the strands -->
        <g stroke="#2D2154" stroke-width="0.8">
          <line x1="14" y1="46" x2="14" y2="58"/><line x1="22" y1="46" x2="22" y2="58"/>
          <line x1="30" y1="46" x2="30" y2="58"/><line x1="38" y1="46" x2="38" y2="58"/>
          <line x1="78" y1="46" x2="78" y2="58"/><line x1="86" y1="46" x2="86" y2="58"/>
          <line x1="94" y1="46" x2="94" y2="58"/><line x1="102" y1="46" x2="102" y2="58"/>
          <line x1="110" y1="46" x2="110" y2="58"/>
        </g>
        <!-- Operator region (highlighted segment) -->
        <rect x="44" y="42" width="28" height="20" fill="#FBF6E8" stroke="#2D2154" stroke-width="1.6" rx="2"/>
        <text x="58" y="55" font-family="monospace" font-size="6.5" font-weight="700" fill="#2D2154" text-anchor="middle">OPERATOR</text>
        <!-- Repressor protein binding the operator -->
        <path d="M44 42 Q44 24 58 24 Q72 24 72 42 Z" fill="#FBF6E8" stroke="#2D2154" stroke-width="1.8"/>
        <text x="58" y="34" font-family="serif" font-size="7" font-style="italic" font-weight="700" fill="#2D2154" text-anchor="middle">R</text>
        <!-- ON/OFF switch indicator (right side) -->
        <rect x="86" y="74" width="24" height="14" rx="7" fill="#FBF6E8" stroke="#2D2154" stroke-width="1.5"/>
        <circle cx="93" cy="81" r="4" fill="#7B528F" stroke="#2D2154" stroke-width="1.2"/>
        <text x="104" y="83.5" font-family="monospace" font-size="6.5" font-weight="700" fill="#2D2154" text-anchor="middle">OFF</text>
        <!-- Promoter (small box left) -->
        <rect x="12" y="74" width="22" height="14" fill="#FBF6E8" stroke="#2D2154" stroke-width="1.5" rx="2"/>
        <text x="23" y="83.5" font-family="monospace" font-size="6.5" font-weight="700" fill="#2D2154" text-anchor="middle">PROM</text>
      </svg>
    `
  },
  {
    slug: 'enzymes',
    name: 'Enzymes',
    blurb: 'Drop a substrate into an active site, adjust pH and temperature, and watch the rate change.',
    page: 'enzymes.html',
    totalParts: 4,
    apStandards: ['3.1.A', '3.2.A', '3.2.B'],
    theme: 'amber',
    iconSvg: `
      <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <!-- Enzyme body with a notch for the active site (top) -->
        <path d="M22 78
                 Q14 78 14 64
                 L14 38
                 Q14 24 30 24
                 L46 24
                 Q50 24 52 28
                 L56 36
                 Q60 42 64 36
                 L68 28
                 Q70 24 74 24
                 L90 24
                 Q106 24 106 38
                 L106 64
                 Q106 78 98 78
                 Z"
              fill="#FBF6E8" stroke="#2D2154" stroke-width="2"/>
        <text x="60" y="62" font-family="serif" font-size="7" font-style="italic" fill="#2D2154" text-anchor="middle">enzyme</text>
        <!-- Substrate fitting the active-site notch (puzzle piece) -->
        <path d="M48 14
                 L72 14
                 L72 22
                 Q68 24 64 30
                 Q60 36 56 30
                 Q52 24 48 22
                 Z"
              fill="#C77E2A" stroke="#2D2154" stroke-width="1.6"/>
        <text x="60" y="20" font-family="serif" font-size="6" font-style="italic" font-weight="700" fill="#2D2154" text-anchor="middle">S</text>
        <!-- Activation-energy arrow (small) at top-right -->
        <g transform="translate(96 14)">
          <path d="M0 0 Q6 -8 12 0" fill="none" stroke="#2D2154" stroke-width="1.2"/>
          <path d="M0 4 L12 4" stroke="#2D2154" stroke-width="1.2" stroke-dasharray="2 2"/>
          <path d="M12 0 L14 2 L12 4" fill="none" stroke="#2D2154" stroke-width="1.2"/>
        </g>
        <text x="103" y="-2" font-family="monospace" font-size="5" fill="#2D2154" text-anchor="middle" transform="translate(0 28)">Eₐ ↓</text>
      </svg>
    `
  },
  {
    slug: 'photosynthesis',
    name: 'Photosynthesis',
    blurb: 'Follow sunlight, water, and CO₂ as a plant builds its own food.',
    page: 'photosynthesis.html',
    totalParts: 5,
    apStandards: ['3.4.A', '3.4.B'],
    theme: 'mint',
    iconSvg: `
      <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <!-- Sun (corner) -->
        <circle cx="20" cy="20" r="6" fill="#FBF6E8" stroke="#2D2154" stroke-width="1.5"/>
        <g stroke="#2D2154" stroke-width="1.2" stroke-linecap="round">
          <line x1="20" y1="8" x2="20" y2="12"/>
          <line x1="8"  y1="20" x2="12" y2="20"/>
          <line x1="12" y1="12" x2="14" y2="14"/>
          <line x1="28" y1="12" x2="26" y2="14"/>
        </g>
        <!-- Chloroplast: outer + inner double membrane -->
        <ellipse cx="68" cy="56" rx="36" ry="24" fill="#FBF6E8" stroke="#2D2154" stroke-width="2"/>
        <ellipse cx="68" cy="56" rx="32" ry="20" fill="none" stroke="#2D2154" stroke-width="1.2"/>
        <!-- Grana stack 1 (thylakoid disks) -->
        <g stroke="#2D2154" stroke-width="1.1" fill="#6A9D6F">
          <ellipse cx="54" cy="48" rx="6.5" ry="1.8"/>
          <ellipse cx="54" cy="52" rx="6.5" ry="1.8"/>
          <ellipse cx="54" cy="56" rx="6.5" ry="1.8"/>
          <ellipse cx="54" cy="60" rx="6.5" ry="1.8"/>
        </g>
        <!-- Grana stack 2 -->
        <g stroke="#2D2154" stroke-width="1.1" fill="#6A9D6F">
          <ellipse cx="82" cy="48" rx="6.5" ry="1.8"/>
          <ellipse cx="82" cy="52" rx="6.5" ry="1.8"/>
          <ellipse cx="82" cy="56" rx="6.5" ry="1.8"/>
          <ellipse cx="82" cy="60" rx="6.5" ry="1.8"/>
        </g>
        <!-- Stromal lamella connecting the stacks -->
        <line x1="60" y1="54" x2="76" y2="54" stroke="#2D2154" stroke-width="0.9"/>
      </svg>
    `
  },
  {
    slug: 'respiration',
    name: 'Cellular Respiration',
    blurb: 'Turn glucose into ATP through glycolysis, the Krebs cycle, and the electron transport chain.',
    page: 'respiration.html',
    totalParts: 4,
    apStandards: ['3.3.A', '3.5.A', '3.5.B'],
    theme: 'lavender',
    iconSvg: `
      <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <!-- Mitochondrion: outer membrane -->
        <ellipse cx="56" cy="52" rx="42" ry="24" fill="#FBF6E8" stroke="#2D2154" stroke-width="2"/>
        <!-- Inner membrane with cristae folds -->
        <path d="M18 52 Q22 42 26 52 Q30 62 34 52 Q38 42 42 52 Q46 62 50 52 Q54 42 58 52 Q62 62 66 52 Q70 42 74 52 Q78 62 82 52 Q86 42 90 52 Q94 62 94 52"
              fill="none" stroke="#2D2154" stroke-width="1.4"/>
        <!-- ATP molecule symbol in top-right -->
        <g transform="translate(100 22)">
          <circle r="9" fill="#FBF6E8" stroke="#2D2154" stroke-width="1.6"/>
          <text x="0" y="2.6" font-family="monospace" font-size="7" font-weight="700" fill="#2D2154" text-anchor="middle">ATP</text>
        </g>
        <!-- Faint dashed leader from mitochondrion to ATP -->
        <line x1="92" y1="38" x2="98" y2="28" stroke="#2D2154" stroke-width="0.8" stroke-dasharray="2 2"/>
      </svg>
    `
  },
  {
    slug: 'signaling',
    name: 'Cell Signaling',
    blurb: 'Bind a ligand, fire a signal cascade, and see what happens when the brakes fail (cancer).',
    page: 'signaling.html',
    totalParts: 4,
    apStandards: ['4.1.A', '4.1.B', '4.2.A', '4.2.B', '4.3.A', '4.3.B', '4.6.B'],
    theme: 'azure',
    iconSvg: `
      <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <!-- Membrane bilayer (horizontal band) -->
        <g stroke="#2D2154" stroke-width="1.2" fill="#FBF6E8">
          <circle cx="10" cy="32" r="3"/><circle cx="22" cy="32" r="3"/><circle cx="34" cy="32" r="3"/>
          <circle cx="78" cy="32" r="3"/><circle cx="90" cy="32" r="3"/><circle cx="102" cy="32" r="3"/><circle cx="114" cy="32" r="3"/>
          <circle cx="10" cy="48" r="3"/><circle cx="22" cy="48" r="3"/><circle cx="34" cy="48" r="3"/>
          <circle cx="78" cy="48" r="3"/><circle cx="90" cy="48" r="3"/><circle cx="102" cy="48" r="3"/><circle cx="114" cy="48" r="3"/>
        </g>
        <!-- Receptor protein spanning the membrane (left part) -->
        <path d="M44 24 L56 24 L56 56 L70 56 L70 24 L44 24 Z" fill="none"/>
        <rect x="42" y="22" width="14" height="38" rx="3" fill="#FBF6E8" stroke="#2D2154" stroke-width="1.8"/>
        <rect x="62" y="22" width="14" height="38" rx="3" fill="#FBF6E8" stroke="#2D2154" stroke-width="1.8"/>
        <!-- Ligand approaching from above (extracellular) -->
        <path d="M52 8 L66 8 L62 18 L56 18 Z" fill="#3F86B0" stroke="#2D2154" stroke-width="1.6"/>
        <line x1="59" y1="18" x2="59" y2="22" stroke="#2D2154" stroke-width="1" stroke-dasharray="2 2"/>
        <!-- Signal cascade dots (intracellular, below) -->
        <g fill="#3F86B0" stroke="#2D2154" stroke-width="1">
          <circle cx="49" cy="70" r="3"/>
          <circle cx="59" cy="78" r="3"/>
          <circle cx="69" cy="70" r="3"/>
          <circle cx="44" cy="86" r="2.5"/>
          <circle cx="74" cy="86" r="2.5"/>
        </g>
        <line x1="49" y1="62" x2="49" y2="68" stroke="#2D2154" stroke-width="0.8" stroke-dasharray="2 2"/>
        <line x1="69" y1="62" x2="69" y2="68" stroke="#2D2154" stroke-width="0.8" stroke-dasharray="2 2"/>
        <!-- "Response" label arrow at bottom -->
        <text x="60" y="98" font-family="serif" font-size="6.5" font-style="italic" fill="#2D2154" text-anchor="middle">response</text>
      </svg>
    `
  },
  {
    slug: 'mitosis',
    name: 'Mitosis',
    blurb: 'Watch one cell split into two through the five phases of division.',
    page: 'mitosis.html',
    totalParts: 5,
    apStandards: ['4.5.A', '4.5.B', '4.6.A', '4.6.B'],
    theme: 'peach',
    iconSvg: `
      <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <!-- Cell at metaphase: outer membrane -->
        <ellipse cx="60" cy="52" rx="46" ry="32" fill="#FBF6E8" stroke="#2D2154" stroke-width="2"/>
        <!-- Spindle fibers radiating from both centrosomes -->
        <g stroke="#2D2154" stroke-width="0.7" opacity="0.8">
          <line x1="16" y1="52" x2="55" y2="36"/>
          <line x1="16" y1="52" x2="55" y2="44"/>
          <line x1="16" y1="52" x2="55" y2="52"/>
          <line x1="16" y1="52" x2="55" y2="60"/>
          <line x1="16" y1="52" x2="55" y2="68"/>
          <line x1="104" y1="52" x2="65" y2="36"/>
          <line x1="104" y1="52" x2="65" y2="44"/>
          <line x1="104" y1="52" x2="65" y2="52"/>
          <line x1="104" y1="52" x2="65" y2="60"/>
          <line x1="104" y1="52" x2="65" y2="68"/>
        </g>
        <!-- Centrosomes (poles) -->
        <circle cx="16" cy="52" r="3.5" fill="#2D2154"/>
        <circle cx="104" cy="52" r="3.5" fill="#2D2154"/>
        <!-- Sister chromatids aligned at the metaphase plate (X shapes) -->
        <g stroke="#2D2154" stroke-width="2.2" stroke-linecap="round" fill="none">
          <line x1="55" y1="36" x2="65" y2="44"/>
          <line x1="65" y1="36" x2="55" y2="44"/>
          <line x1="55" y1="48" x2="65" y2="56"/>
          <line x1="65" y1="48" x2="55" y2="56"/>
          <line x1="55" y1="60" x2="65" y2="68"/>
          <line x1="65" y1="60" x2="55" y2="68"/>
        </g>
      </svg>
    `
  },
  {
    slug: 'selection',
    name: 'Natural Selection',
    blurb: 'Watch a population shift its color across generations under predator pressure.',
    page: 'selection.html',
    totalParts: 4,
    apStandards: ['7.1.A', '7.1.B', '7.2.A', '7.5.A', '7.6.A', '7.6.B', '7.7.A', '7.10.A', '7.10.C', '7.12.A'],
    theme: 'sky',
    iconSvg: `
      <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <!-- Allele-frequency over generations (directional selection chart) -->
        <!-- Axes -->
        <line x1="22" y1="78" x2="104" y2="78" stroke="#2D2154" stroke-width="1.5"/>
        <line x1="22" y1="18" x2="22" y2="78" stroke="#2D2154" stroke-width="1.5"/>
        <!-- 50% reference line -->
        <line x1="22" y1="48" x2="104" y2="48" stroke="#2D2154" stroke-width="0.6" stroke-dasharray="2 2" opacity="0.45"/>
        <!-- Light-allele curve (decreasing) -->
        <polyline points="22,26 36,30 50,42 62,56 74,66 88,72 104,74"
                  fill="none" stroke="#C56279" stroke-width="2" stroke-linejoin="round"/>
        <!-- Dark-allele curve (increasing) -->
        <polyline points="22,70 36,66 50,54 62,40 74,30 88,24 104,22"
                  fill="none" stroke="#2D2154" stroke-width="2" stroke-linejoin="round"/>
        <!-- Axis labels -->
        <text x="63" y="92" font-family="serif" font-size="6" font-style="italic" fill="#2D2154" text-anchor="middle">generations</text>
        <text x="14" y="46" font-family="serif" font-size="6" font-style="italic" fill="#2D2154" text-anchor="middle" transform="rotate(-90 14 46)">freq.</text>
        <!-- Allele line labels (inside chart, top-right + bottom-right) -->
        <text x="100" y="20" font-family="serif" font-size="6" font-style="italic" fill="#2D2154" text-anchor="end">dark</text>
        <text x="100" y="84" font-family="serif" font-size="6" font-style="italic" fill="#C56279" text-anchor="end">light</text>
      </svg>
    `
  },
  {
    slug: 'ecology',
    name: 'Ecology',
    blurb: 'Click around a meadow food web to see how predators, prey, and producers connect.',
    page: 'ecology.html',
    totalParts: 4,
    apStandards: ['8.1.A', '8.1.B', '8.2.A', '8.2.B', '8.2.C', '8.3.A', '8.4.A', '8.5.A', '8.5.B', '8.6.A', '8.6.B', '8.7.B', '8.7.C'],
    theme: 'forest',
    iconSvg: `
      <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <!-- Trophic pyramid (4 levels, energy decreasing upward) -->
        <polygon points="55,14 65,14 68,30 52,30" fill="#C56279" stroke="#2D2154" stroke-width="1.5"/>
        <polygon points="52,32 68,32 72,48 48,48" fill="#E08197" stroke="#2D2154" stroke-width="1.5"/>
        <polygon points="48,50 72,50 78,66 42,66" fill="#F5C04A" stroke="#2D2154" stroke-width="1.5"/>
        <polygon points="42,68 78,68 88,86 32,86" fill="#6A9D6F" stroke="#2D2154" stroke-width="1.5"/>
        <!-- Roman numerals inside each level -->
        <text x="60" y="25" font-family="serif" font-size="7" font-weight="700" fill="#FBF6E8" text-anchor="middle">IV</text>
        <text x="60" y="43" font-family="serif" font-size="7.5" font-weight="700" fill="#FBF6E8" text-anchor="middle">III</text>
        <text x="60" y="61" font-family="serif" font-size="8" font-weight="700" fill="#2D2154" text-anchor="middle">II</text>
        <text x="60" y="81" font-family="serif" font-size="9" font-weight="700" fill="#FBF6E8" text-anchor="middle">I</text>
      </svg>
    `
  },
  {
    slug: 'heredity',
    name: 'Heredity',
    blurb: 'Cross two parents and predict their offspring with an interactive Punnett square.',
    page: 'heredity.html',
    totalParts: 4,
    apStandards: ['5.1.A', '5.1.B', '5.2.A', '5.3.A', '5.4.A', '5.5.A'],
    theme: 'pink',
    iconSvg: `
      <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <!-- Parent allele labels (top + left) -->
        <text x="45" y="18" font-family="serif" font-size="10" font-style="italic" font-weight="700" fill="#2D2154" text-anchor="middle">B</text>
        <text x="75" y="18" font-family="serif" font-size="10" font-style="italic" font-weight="700" fill="#2D2154" text-anchor="middle">b</text>
        <text x="22" y="42" font-family="serif" font-size="10" font-style="italic" font-weight="700" fill="#2D2154" text-anchor="middle">B</text>
        <text x="22" y="72" font-family="serif" font-size="10" font-style="italic" font-weight="700" fill="#2D2154" text-anchor="middle">b</text>
        <!-- Punnett square frame + dividers -->
        <rect x="30" y="22" width="60" height="60" fill="#FBF6E8" stroke="#2D2154" stroke-width="2"/>
        <line x1="60" y1="22" x2="60" y2="82" stroke="#2D2154" stroke-width="1.6"/>
        <line x1="30" y1="52" x2="90" y2="52" stroke="#2D2154" stroke-width="1.6"/>
        <!-- Genotype contents (serif italic — textbook convention) -->
        <text x="45" y="42" font-family="serif" font-size="11" font-style="italic" font-weight="700" fill="#2D2154" text-anchor="middle">BB</text>
        <text x="75" y="42" font-family="serif" font-size="11" font-style="italic" font-weight="700" fill="#2D2154" text-anchor="middle">Bb</text>
        <text x="45" y="72" font-family="serif" font-size="11" font-style="italic" font-weight="700" fill="#2D2154" text-anchor="middle">Bb</text>
        <text x="75" y="72" font-family="serif" font-size="11" font-style="italic" font-weight="700" fill="#2D2154" text-anchor="middle">bb</text>
        <!-- Phenotype ratio caption -->
        <text x="60" y="94" font-family="serif" font-size="6.5" font-style="italic" fill="#2D2154" text-anchor="middle">3 : 1 dominant</text>
      </svg>
    `
  }
];

// Convenience helper — used by progress.js and app.js.
function getModule(slug) {
  return MODULES.find(m => m.slug === slug);
}
