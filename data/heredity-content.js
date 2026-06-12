/* =========================================================
   heredity-content.js — flashcards for the Heredity module

   Three card decks:
     HEREDITY_INTRO_CARDS   — vocabulary + Mendelian basics
     HEREDITY_PUNNETT_STEPS — 4-step Punnett square walkthrough
     HEREDITY_BEYOND_MENDEL — incomplete dominance, codominance,
                              multiple alleles, sex-linked traits
   ========================================================= */

const HEREDITY_INTRO_CARDS = [
  {
    title: "What is heredity?",
    body: `
      <p>Heredity is how <strong>traits get passed from parents to offspring</strong> — why you have your mother's eyes, your father's height, or your grandfather's dimples.</p>
      <p>The instructions for those traits are written in DNA and stored in <em>genes</em>. Every time a cell divides to make a new organism, those genes get copied and handed down.</p>
      <p>Heredity is what makes you genetically yourself — and what connects you to every ancestor you've ever had.</p>
    `
  },
  {
    title: "Genes, alleles, and traits",
    body: `
      <p>Three closely related words you need straight before anything else makes sense:</p>
      <ul>
        <li><strong>Gene</strong> — a stretch of DNA with instructions for one specific feature (e.g., eye color).</li>
        <li><strong>Allele</strong> — a particular <em>version</em> of a gene (e.g., the "brown eyes" allele vs. the "blue eyes" allele).</li>
        <li><strong>Trait</strong> — the actual physical feature that shows up (e.g., brown eyes).</li>
      </ul>
      <p>You inherit <em>two alleles per gene</em> — one from each parent. Their combination determines the trait you express.</p>
    `
  },
  {
    title: "Mendel's big discovery",
    body: `
      <p>In the 1860s, an Austrian monk named <strong>Gregor Mendel</strong> spent eight years breeding pea plants and tracking which traits appeared in their offspring.</p>
      <p>He found that traits don't blend — they're passed in <em>discrete units</em> (what we now call genes), and some alleles "win out" over others.</p>
      <p>These rules are now called <strong>Mendel's Laws of Inheritance</strong>, and they're the foundation of everything in this module.</p>
    `
  },
  {
    title: "Dominant vs recessive",
    body: `
      <p>If you have two different alleles for a gene, one usually <strong>dominates</strong> the other.</p>
      <ul>
        <li><strong>Dominant alleles</strong> show up whenever they're present. Written as a capital letter (<code>B</code>).</li>
        <li><strong>Recessive alleles</strong> only show up when there's no dominant copy around. Written as a lowercase letter (<code>b</code>).</li>
      </ul>
      <p>So a person with <code>Bb</code> shows the dominant trait (because <code>B</code> wins). Only <code>bb</code> shows the recessive trait.</p>
    `
  },
  {
    title: "Genotype vs phenotype",
    body: `
      <p>Two more critical vocabulary words:</p>
      <ul>
        <li><strong>Genotype</strong> — the actual alleles an organism has (e.g., <code>Bb</code>).</li>
        <li><strong>Phenotype</strong> — the physical trait that shows up (e.g., brown eyes).</li>
      </ul>
      <p>An organism with <strong>two identical alleles</strong> (<code>BB</code> or <code>bb</code>) is called <em>homozygous</em>. With <strong>two different alleles</strong> (<code>Bb</code>), it's <em>heterozygous</em>.</p>
      <p>Heterozygous individuals are sometimes called "carriers" — they have a recessive allele but don't show the trait themselves.</p>
    `
  }
];

const HEREDITY_PUNNETT_STEPS = [
  {
    title: "Step 1 — Identify the parents",
    body: `
      <p>A <strong>Punnett square</strong> predicts what offspring two parents are likely to produce.</p>
      <p>Start by writing each parent's genotype. Say one parent is <code>Bb</code> (heterozygous brown eyes) and the other is also <code>Bb</code>.</p>
      <p>Each parent will pass <em>one</em> of their two alleles to each offspring — but which one is random.</p>
    `
  },
  {
    title: "Step 2 — Set up the grid",
    body: `
      <p>Draw a 2×2 grid. Put one parent's alleles across the <em>top</em>, the other parent's alleles down the <em>side</em>.</p>
      <p>The grid represents <em>every possible combination</em> of one allele from each parent — and there are exactly four of them.</p>
      <p style="font-family:'JetBrains Mono', monospace; text-align:center; padding:0.4rem 0;">
        &nbsp;&nbsp;|&nbsp;B&nbsp;|&nbsp;b&nbsp;<br>
        B&nbsp;|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;<br>
        b&nbsp;|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;
      </p>
    `
  },
  {
    title: "Step 3 — Fill in the boxes",
    body: `
      <p>Each box gets the combination of the allele above it + the allele to its left.</p>
      <p style="font-family:'JetBrains Mono', monospace; text-align:center; padding:0.4rem 0;">
        &nbsp;&nbsp;|&nbsp;B&nbsp;|&nbsp;b&nbsp;<br>
        B&nbsp;|&nbsp;BB&nbsp;|&nbsp;Bb<br>
        b&nbsp;|&nbsp;Bb&nbsp;|&nbsp;bb
      </p>
      <p>Each box represents a <strong>1 in 4 chance</strong> of producing that genotype.</p>
    `
  },
  {
    title: "Step 4 — Read the ratios",
    body: `
      <p>From a <code>Bb × Bb</code> cross, the four boxes give:</p>
      <ul>
        <li><strong>Genotype ratio:</strong> 1 BB : 2 Bb : 1 bb</li>
        <li><strong>Phenotype ratio:</strong> 3 brown : 1 blue (since both BB and Bb show brown)</li>
      </ul>
      <p>That classic <strong>3:1 phenotype ratio</strong> from a heterozygous × heterozygous cross is the most famous prediction in all of genetics.</p>
    `
  }
];

const HEREDITY_BEYOND_MENDEL = [
  {
    title: "Incomplete dominance — neither wins",
    body: `
      <p>Sometimes a heterozygote shows a <em>blend</em> of both traits instead of just the dominant one.</p>
      <p>Classic example: in snapdragons, <strong>RR</strong> (red) × <strong>WW</strong> (white) gives <strong>RW</strong> offspring that are <em>pink</em>.</p>
      <p>This is <strong>incomplete dominance</strong> — neither allele fully overrides the other, so the result is intermediate.</p>
    `
  },
  {
    title: "Codominance — both win",
    body: `
      <p>In <strong>codominance</strong>, both alleles show up <em>simultaneously</em> in the heterozygote — not blended, but distinct.</p>
      <p>Example: human <strong>blood types</strong>. Someone with the <code>I^A</code> and <code>I^B</code> alleles has <strong>type AB blood</strong> — their red cells express <em>both</em> A and B antigens, fully and separately.</p>
    `
  },
  {
    title: "Multiple alleles",
    body: `
      <p>Mendel only studied genes with two alleles. But many genes have <strong>more than two possible alleles</strong> in the population — even though any single individual still only has two of them.</p>
      <p>The classic example is the <strong>ABO blood group</strong>: there are three alleles (<code>I^A</code>, <code>I^B</code>, and <code>i</code>) circulating in the human gene pool, combining to make four possible blood types: A, B, AB, and O.</p>
    `
  },
  {
    title: "Sex-linked inheritance",
    body: `
      <p>Some genes live on the <strong>X chromosome</strong>. Since males (XY) only have one X, a single recessive allele can show up — there's no second copy to mask it.</p>
      <p>That's why <strong>red-green colorblindness</strong> and <strong>hemophilia</strong> are much more common in males than females.</p>
      <p>Females (XX) usually need two copies of the recessive allele to show the trait, while a single copy makes them a <em>carrier</em>.</p>
    `
  }
];
