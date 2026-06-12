/* =========================================================
   mitosis-content.js — flashcards for the Mitosis module

   Two card decks:
     MITOSIS_INTRO_CARDS  — what mitosis is, why cells divide
     MITOSIS_PHASE_STEPS  — 5-step walkthrough of the phases
   ========================================================= */

const MITOSIS_INTRO_CARDS = [
  {
    title: "What is mitosis?",
    body: `
      <p>Mitosis is how one cell becomes <strong>two identical copies of itself</strong>.</p>
      <p>It's how you grew from a single fertilized egg into trillions of cells — and how your body still replaces skin, blood, and gut cells every day.</p>
      <p>The key word is <em>identical</em>: both daughter cells get the exact same DNA as the original.</p>
    `
  },
  {
    title: "Why do cells divide?",
    body: `
      <p>Three big reasons:</p>
      <ul>
        <li><strong>Growth</strong> — going from a single cell to a whole organism</li>
        <li><strong>Repair</strong> — healing a cut, regrowing skin after a sunburn</li>
        <li><strong>Replacement</strong> — your gut lining replaces itself every ~5 days; red blood cells every ~120 days</li>
      </ul>
      <p>Some cells (like nerve cells) almost never divide — once they're made, you keep them for life.</p>
    `
  },
  {
    title: "The cell cycle",
    body: `
      <p>Most of a cell's life is spent in <strong>interphase</strong> — growing, doing its job, and copying its DNA in preparation for division.</p>
      <p>Only the last short stretch is mitosis itself. Roughly:</p>
      <p style="text-align:center; font-family:'JetBrains Mono', monospace; font-size:0.95rem;">
        <strong>Interphase</strong> (G1 → S → G2) → <strong>Mitosis</strong> → <strong>Cytokinesis</strong>
      </p>
      <p>During the <em>S phase</em> of interphase, every chromosome is duplicated — so by the time mitosis starts, the cell has a full second copy of its DNA ready to hand off.</p>
    `
  },
  {
    title: "Chromosomes 101",
    body: `
      <p>Your DNA is packaged into <strong>chromosomes</strong> — humans have <em>46</em> (23 from each parent).</p>
      <p>Because the cell just copied its DNA, each chromosome is now made of <strong>two identical sister chromatids</strong> joined together at a pinched point called the <em>centromere</em>.</p>
      <p>That's why chromosomes look like an <strong>X</strong> in textbook drawings — each "arm" is one sister chromatid waiting to be pulled to opposite ends of the cell.</p>
    `
  },
  {
    title: "The four phases",
    body: `
      <p>Mitosis breaks down into four named phases:</p>
      <ol>
        <li><strong>Prophase</strong> — chromosomes condense, nuclear envelope breaks down</li>
        <li><strong>Metaphase</strong> — chromosomes line up in the middle</li>
        <li><strong>Anaphase</strong> — sister chromatids are yanked apart</li>
        <li><strong>Telophase</strong> — two new nuclei form at the poles</li>
      </ol>
      <p>Then <strong>cytokinesis</strong> finishes the job by physically splitting the cell into two. Let's walk through each phase.</p>
    `
  }
];

const MITOSIS_PHASE_STEPS = [
  {
    title: "Phase 1 — Prophase",
    body: `
      <p>The loose, spaghetti-like DNA inside the nucleus <strong>condenses</strong> into thick, visible chromosomes. Each chromosome is already two sister chromatids joined at a centromere — that's why they look like an X.</p>
      <p>The <strong>nuclear envelope breaks down</strong>, and tiny structures called <em>centrosomes</em> migrate to opposite ends (poles) of the cell.</p>
      <p>From each centrosome, long protein fibers called <strong>spindle fibers</strong> start to grow out toward the center.</p>
    `
  },
  {
    title: "Phase 2 — Metaphase",
    body: `
      <p>Spindle fibers from each pole catch hold of each chromosome's centromere.</p>
      <p>By tugging in opposite directions, they line every chromosome up neatly along the cell's equator — an imaginary line called the <strong>metaphase plate</strong>.</p>
      <p>This is the cell's quality-check moment. If any chromosome isn't properly attached to fibers from <em>both</em> poles, the cell pauses here until it is.</p>
    `
  },
  {
    title: "Phase 3 — Anaphase",
    body: `
      <p>The centromere holding each chromosome together suddenly splits, and the <strong>sister chromatids are pulled apart</strong>.</p>
      <p>One chromatid from each pair is dragged toward one pole; its identical sister is dragged toward the other.</p>
      <p>The cell starts to <em>elongate</em>, stretching into an oval shape. By the end of anaphase, each pole has a complete set of chromosomes.</p>
    `
  },
  {
    title: "Phase 4 — Telophase",
    body: `
      <p>The chromatids reach their poles and start to <strong>decondense</strong> back into loose chromatin.</p>
      <p>A new <strong>nuclear envelope</strong> forms around each set, creating two nuclei inside what's still one cell.</p>
      <p>The spindle fibers disassemble. Mitosis itself is technically over now — the DNA has been successfully divided.</p>
    `
  },
  {
    title: "Phase 5 — Cytokinesis",
    body: `
      <p>To finish the job, the cell membrane pinches inward at the middle, forming a <strong>cleavage furrow</strong> that deepens until it splits the cell in two.</p>
      <p>(In plant cells there's no pinching — instead a <em>cell plate</em> forms across the middle and becomes a new cell wall.)</p>
      <p>The result: <strong>two genetically identical daughter cells</strong>, each ready to enter interphase and start the cycle over again.</p>
    `
  }
];
