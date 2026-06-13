/* =========================================================
   signaling-content.js — flashcards for Cell Signaling
   ========================================================= */

const SIGNAL_INTRO_CARDS = [
  {
    title: "Cells talk to each other constantly",
    body: `
      <p>You're a community of ~37 trillion cells, and they coordinate their behavior moment by moment using <strong>chemical signals</strong> — molecules one cell sends out and another cell reads.</p>
      <p>Without this, your immune system couldn't find an infection, your muscles couldn't respond to adrenaline, and a fertilized egg couldn't develop into a body. Cell signaling is the language of multicellular life.</p>
    `
  },
  {
    title: "Three modes of signaling — by distance",
    body: `
      <p>Cells send signals over different distances using different strategies:</p>
      <ul>
        <li><strong>Direct contact</strong> — neighboring cells touch through gap junctions or surface proteins (e.g. immune-cell recognition).</li>
        <li><strong>Paracrine</strong> — short-range diffusion to nearby cells (growth factors during wound healing).</li>
        <li><strong>Endocrine</strong> — hormones travel in the bloodstream to distant target cells (insulin, adrenaline, estrogen).</li>
        <li><strong>Synaptic</strong> — a special paracrine: a neuron releases neurotransmitter into a tiny gap with the next cell. Fast and precise.</li>
      </ul>
      <p>Same basic logic in each: sender releases ligand → ligand binds receptor on target → target responds.</p>
    `
  },
  {
    title: "The three stages of every signal",
    body: `
      <p>No matter what the message or how far it traveled, the receiving cell always goes through the same three stages:</p>
      <ol>
        <li><strong>Reception</strong> — a receptor protein detects the signal molecule (the <em>ligand</em>).</li>
        <li><strong>Transduction</strong> — the receptor passes the message into the cell, usually as a relay of activated proteins.</li>
        <li><strong>Response</strong> — the cell does something — turns on a gene, opens an ion channel, builds a new protein.</li>
      </ol>
      <p>Memorize this trio. Every signaling story you'll read in AP Bio fits this pattern.</p>
    `
  }
];

const SIGNAL_RECEPTION_CARDS = [
  {
    title: "Receptors — molecular antennae",
    body: `
      <p>A <strong>receptor</strong> is a protein with a binding pocket that recognizes one specific ligand. When the ligand binds, the receptor changes shape — and that shape change is the start of the message inside the cell.</p>
      <p>Receptor specificity is just like enzyme specificity: shape and charge of the binding pocket only fit certain molecules. That's why each hormone affects only some cell types — the others don't make its receptor.</p>
    `
  },
  {
    title: "Three big receptor families",
    body: `
      <ul>
        <li><strong>G-protein-coupled receptors (GPCRs)</strong> — span the membrane 7 times. When bound, they activate a G protein on the inside. Almost half of all prescription drugs target a GPCR.</li>
        <li><strong>Receptor tyrosine kinases (RTKs)</strong> — pair up when bound, then add phosphate groups to themselves and to other proteins. Famous in growth-factor signaling.</li>
        <li><strong>Ligand-gated ion channels</strong> — the ligand opens or closes an ion channel directly. Fast — this is how neurons talk at synapses.</li>
      </ul>
    `
  },
  {
    title: "Hydrophobic ligands go right in",
    body: `
      <p>Most signal molecules are too big or too charged to cross the membrane on their own, so they bind receptors on the cell <em>surface</em>.</p>
      <p>But <strong>steroid hormones</strong> (estrogen, testosterone, cortisol) are hydrophobic. They slip straight through the membrane and bind <strong>intracellular receptors</strong> in the cytoplasm or nucleus, then directly turn genes on or off as transcription factors.</p>
      <p>That's why steroid effects are usually slower but longer-lasting than peptide-hormone effects — they're changing what proteins get made.</p>
    `
  }
];

const SIGNAL_CASCADE_CARDS = [
  {
    title: "Transduction — a relay of proteins",
    body: `
      <p>Once a surface receptor is activated, it triggers a chain of <em>other</em> proteins that pass the signal along — each one usually flipping the next one on by adding a phosphate group (a <strong>kinase cascade</strong>).</p>
      <p>Why a chain instead of a single step? Three reasons: <strong>amplification</strong>, <strong>specificity</strong>, and <strong>regulation</strong>. Each step can branch, multiply, or be inhibited.</p>
    `
  },
  {
    title: "Amplification — one signal, millions of responses",
    body: `
      <p>A single hormone molecule can trigger a response involving <strong>millions</strong> of intracellular events, because each kinase in the cascade activates many of the next kinase down.</p>
      <p>One epinephrine binding a liver cell can release ~10⁸ glucose molecules within seconds. That's the amplification of a multi-step cascade: a tiny external signal becomes a huge internal reply.</p>
    `
  },
  {
    title: "Second messengers — diffusing the news",
    body: `
      <p>Some signals travel inside the cell as <strong>second messengers</strong> — small molecules or ions that diffuse fast and reach many targets.</p>
      <ul>
        <li><strong>cAMP</strong> — made from ATP by adenylyl cyclase; activates protein kinase A.</li>
        <li><strong>Ca²⁺</strong> — released from internal stores; triggers muscle contraction, neurotransmitter release, fertilization.</li>
        <li><strong>IP₃ / DAG</strong> — generated from membrane phospholipids; together they release Ca²⁺ and activate more kinases.</li>
      </ul>
      <p>Second messengers are why so many different receptors converge on a handful of intracellular responses.</p>
    `
  },
  {
    title: "Response — what the cell actually does",
    body: `
      <p>The end of the cascade does <em>real work</em>:</p>
      <ul>
        <li><strong>Change gene expression</strong> — a transcription factor enters the nucleus and turns specific genes on or off.</li>
        <li><strong>Change enzyme activity</strong> — phosphorylation flips an enzyme on (e.g. glycogen phosphorylase mobilizing glucose).</li>
        <li><strong>Change membrane permeability</strong> — an ion channel opens, depolarizing a neuron.</li>
        <li><strong>Trigger division, growth, or death</strong> — growth factors push a cell into mitosis; missing survival signals trigger apoptosis.</li>
      </ul>
      <p>Same upstream cascade can produce different responses in different cells — depending on which downstream targets that cell makes.</p>
    `
  }
];

const SIGNAL_CANCER_CARDS = [
  {
    title: "When signaling breaks — cancer",
    body: `
      <p>Cell division is normally controlled by external growth-factor signals. A cell only divides when it's told to — by a growth factor binding its receptor and triggering the cascade.</p>
      <p>Cancer happens when mutations <strong>break that brake</strong>. The cell starts behaving as if it's getting a "divide!" signal nonstop, even when no signal is there. It divides uncontrollably — and the cells it produces inherit the mutation.</p>
    `
  },
  {
    title: "Proto-oncogenes vs tumor suppressors",
    body: `
      <p>Two kinds of genes go bad in cancer:</p>
      <ul>
        <li><strong>Proto-oncogenes</strong> normally code for "go!" signals (growth-factor receptors, kinases, transcription factors). A gain-of-function mutation turns one into an <strong>oncogene</strong> — stuck on.</li>
        <li><strong>Tumor suppressors</strong> normally code for "stop!" signals (p53 halts the cell cycle at checkpoints; Rb prevents premature S-phase entry). A loss-of-function mutation removes the brake.</li>
      </ul>
      <p>Cancer typically takes several such mutations stacking up in one cell line — that's why cancer rates rise with age.</p>
    `
  },
  {
    title: "Ras — a classic broken switch",
    body: `
      <p><strong>Ras</strong> is a small intracellular protein downstream of growth-factor receptors. Normally Ras is a quick switch: GDP-bound → off; GTP-bound → on (briefly), then back off.</p>
      <p>A common cancer mutation locks Ras in the GTP-bound "on" state. Now the growth-promoting cascade fires constantly, with or without a growth signal at the surface.</p>
      <p>Mutated Ras is found in ~30% of all human cancers — pancreatic, colon, lung. Drugs that target mutant Ras are a major modern cancer-research focus.</p>
    `
  },
  {
    title: "Apoptosis — the off-switch life depends on",
    body: `
      <p>Cells aren't supposed to live forever. <strong>Apoptosis</strong> is the programmed cell-death pathway: an orderly self-disassembly that recycles the cell's parts cleanly.</p>
      <p>Apoptosis is triggered by signals too — both "die!" signals (Fas ligand) and the <em>absence</em> of "live!" signals (survival factors). It carves your fingers out of webbed embryonic hands, prunes excess neurons, and eliminates damaged cells before they become cancerous.</p>
      <p>Many cancer mutations don't just push division — they also <em>block apoptosis</em>, so the cell can't be killed when it goes rogue.</p>
    `
  }
];
