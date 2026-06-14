/* =========================================================
   signaling-content.js — flashcards for Cell Signaling

   Each card has body: { middle, high }.
   ========================================================= */

const SIGNAL_INTRO_CARDS = [
  {
    title: "Cells talk to each other",
    body: {
      middle: `
        <p>Your body is made of around <strong>37 trillion cells</strong> — and they all have to work together. The way they coordinate is by <strong>sending each other chemical messages</strong>.</p>
        <p>Without these messages, your immune cells couldn't find an infection, your muscles couldn't respond to a scary surprise, and a baby couldn't grow from a single cell into a whole person.</p>
        <p>Cell signaling is the language of being a multicellular creature.</p>
      `,
      high: `
        <p>You're a community of ~37 trillion cells, and they coordinate their behavior moment by moment using <strong>chemical signals</strong> — molecules one cell sends out and another cell reads.</p>
        <p>Without this, your immune system couldn't find an infection, your muscles couldn't respond to adrenaline, and a fertilized egg couldn't develop into a body. Cell signaling is the language of multicellular life.</p>
      `
    }
  },
  {
    title: "Different ways to send a message",
    body: {
      middle: `
        <p>Cells use different methods depending on how far the message has to travel:</p>
        <ul>
          <li><strong>Right next door</strong> — touching cells can hand a message directly to each other.</li>
          <li><strong>A few cells away</strong> — a cell can release a chemical that drifts to nearby cells (this is how cuts heal).</li>
          <li><strong>Across the whole body</strong> — hormones like adrenaline ride the bloodstream and reach cells far away.</li>
          <li><strong>Nerve to nerve</strong> — nerve cells send super-fast messages across tiny gaps.</li>
        </ul>
        <p>Different distances, but the same idea: sender releases a chemical, receiver picks it up, receiver responds.</p>
      `,
      high: `
        <p>Cells send signals over different distances using different strategies:</p>
        <ul>
          <li><strong>Direct contact</strong> — neighboring cells touch through gap junctions or surface proteins (e.g. immune-cell recognition).</li>
          <li><strong>Paracrine</strong> — short-range diffusion to nearby cells (growth factors during wound healing).</li>
          <li><strong>Endocrine</strong> — hormones travel in the bloodstream to distant target cells (insulin, adrenaline, estrogen).</li>
          <li><strong>Synaptic</strong> — a special paracrine: a neuron releases neurotransmitter into a tiny gap with the next cell. Fast and precise.</li>
        </ul>
        <p>Same basic logic in each: sender releases ligand → ligand binds receptor on target → target responds.</p>
      `
    }
  },
  {
    title: "Three stages of every signal",
    body: {
      middle: `
        <p>No matter what the message is or how it travels, the cell receiving it always goes through three stages:</p>
        <ol>
          <li><strong>Reception</strong> — the cell <em>picks up</em> the chemical signal.</li>
          <li><strong>Transduction</strong> — the message gets <em>passed along</em> inside the cell, like a relay race.</li>
          <li><strong>Response</strong> — the cell <em>does something</em> — turns on a gene, sends a nerve signal, divides, etc.</li>
        </ol>
        <p>Memorize this trio. Every signaling story you'll see follows the same three steps.</p>
      `,
      high: `
        <p>No matter what the message or how far it traveled, the receiving cell always goes through the same three stages:</p>
        <ol>
          <li><strong>Reception</strong> — a receptor protein detects the signal molecule (the <em>ligand</em>).</li>
          <li><strong>Transduction</strong> — the receptor passes the message into the cell, usually as a relay of activated proteins.</li>
          <li><strong>Response</strong> — the cell does something — turns on a gene, opens an ion channel, builds a new protein.</li>
        </ol>
        <p>Memorize this trio. Every signaling story you'll read in AP Bio fits this pattern.</p>
      `
    }
  }
];

const SIGNAL_RECEPTION_CARDS = [
  {
    title: "Receptors — the cell's antennas",
    body: {
      middle: `
        <p>A <strong>receptor</strong> is a special protein that sits in the cell and waits for one specific signal molecule. When that signal arrives, the receptor grabs it.</p>
        <p>Each receptor only responds to one shape of signal — like a lock that only fits one key. That's how cells make sure they only react to messages meant for them.</p>
      `,
      high: `
        <p>A <strong>receptor</strong> is a protein with a binding pocket that recognizes one specific ligand. When the ligand binds, the receptor changes shape — and that shape change is the start of the message inside the cell.</p>
        <p>Receptor specificity is just like enzyme specificity: shape and charge of the binding pocket only fit certain molecules. That's why each hormone affects only some cell types — the others don't make its receptor.</p>
      `
    }
  },
  {
    title: "Three big receptor families",
    body: {
      middle: `
        <p>Most receptors fall into one of three groups:</p>
        <ul>
          <li><strong>Surface receptors that turn on helper proteins</strong> — the largest group. Almost half of all medicines target these.</li>
          <li><strong>Surface receptors that pair up</strong> — when activated, two receptors join up to pass the message inward. Very important for growth signals.</li>
          <li><strong>Ion-channel receptors</strong> — when the signal hits, the receptor opens a tiny gate that lets charged particles flow in. This is how nerves send messages super fast.</li>
        </ul>
      `,
      high: `
        <ul>
          <li><strong>G-protein-coupled receptors (GPCRs)</strong> — span the membrane 7 times. When bound, they activate a G protein on the inside. Almost half of all prescription drugs target a GPCR.</li>
          <li><strong>Receptor tyrosine kinases (RTKs)</strong> — pair up when bound, then add phosphate groups to themselves and to other proteins. Famous in growth-factor signaling.</li>
          <li><strong>Ligand-gated ion channels</strong> — the ligand opens or closes an ion channel directly. Fast — this is how neurons talk at synapses.</li>
        </ul>
      `
    }
  },
  {
    title: "Some signals go right inside",
    body: {
      middle: `
        <p>Most signals are too big or charged to slip through the cell membrane, so they have to bind a receptor on the outside.</p>
        <p>But a few signals — like <strong>steroid hormones</strong> (testosterone, estrogen) — are oily enough to slide right through the membrane. They find their receptors <em>inside</em> the cell and go straight to the DNA to turn genes on or off.</p>
        <p>That's why steroid hormones often act <em>slower but longer</em> than other signals — they're changing what the cell builds, not just flipping a quick switch.</p>
      `,
      high: `
        <p>Most signal molecules are too big or too charged to cross the membrane on their own, so they bind receptors on the cell <em>surface</em>.</p>
        <p>But <strong>steroid hormones</strong> (estrogen, testosterone, cortisol) are hydrophobic. They slip straight through the membrane and bind <strong>intracellular receptors</strong> in the cytoplasm or nucleus, then directly turn genes on or off as transcription factors.</p>
        <p>That's why steroid effects are usually slower but longer-lasting than peptide-hormone effects — they're changing what proteins get made.</p>
      `
    }
  }
];

const SIGNAL_CASCADE_CARDS = [
  {
    title: "Transduction — passing the message",
    body: {
      middle: `
        <p>Once the receptor grabs a signal, it kicks off a <strong>chain of other proteins</strong> inside the cell. Each one wakes up the next one — like a row of dominoes falling.</p>
        <p>Why all the dominoes? Why not just one big signal? Because the chain lets the cell <em>amplify</em> the message, <em>branch</em> it to different places, and <em>regulate</em> how strong the response is.</p>
      `,
      high: `
        <p>Once a surface receptor is activated, it triggers a chain of <em>other</em> proteins that pass the signal along — each one usually flipping the next one on by adding a phosphate group (a <strong>kinase cascade</strong>).</p>
        <p>Why a chain instead of a single step? Three reasons: <strong>amplification</strong>, <strong>specificity</strong>, and <strong>regulation</strong>. Each step can branch, multiply, or be inhibited.</p>
      `
    }
  },
  {
    title: "Amplification — one becomes millions",
    body: {
      middle: `
        <p>One amazing thing about signal chains: a <strong>tiny outside message can become a huge inside response</strong>.</p>
        <p>A single hormone molecule landing on a liver cell can release <em>millions</em> of sugar molecules into the blood within seconds. That's because each domino in the chain knocks down many of the next one — so the original signal grows and grows as it goes.</p>
      `,
      high: `
        <p>A single hormone molecule can trigger a response involving <strong>millions</strong> of intracellular events, because each kinase in the cascade activates many of the next kinase down.</p>
        <p>One epinephrine binding a liver cell can release ~10⁸ glucose molecules within seconds. That's the amplification of a multi-step cascade: a tiny external signal becomes a huge internal reply.</p>
      `
    }
  },
  {
    title: "Second messengers — spreading the word",
    body: {
      middle: `
        <p>Some signals get carried around inside the cell by small floating molecules called <strong>second messengers</strong>. They diffuse fast and can reach lots of places at once.</p>
        <p>One famous example is <strong>calcium</strong>. A signal arrives, calcium floods into the cell, and the calcium triggers muscles to contract, nerves to fire, or other big responses — all from that one wave.</p>
      `,
      high: `
        <p>Some signals travel inside the cell as <strong>second messengers</strong> — small molecules or ions that diffuse fast and reach many targets.</p>
        <ul>
          <li><strong>cAMP</strong> — made from ATP by adenylyl cyclase; activates protein kinase A.</li>
          <li><strong>Ca²⁺</strong> — released from internal stores; triggers muscle contraction, neurotransmitter release, fertilization.</li>
          <li><strong>IP₃ / DAG</strong> — generated from membrane phospholipids; together they release Ca²⁺ and activate more kinases.</li>
        </ul>
        <p>Second messengers are why so many different receptors converge on a handful of intracellular responses.</p>
      `
    }
  },
  {
    title: "Response — what the cell does",
    body: {
      middle: `
        <p>At the end of the chain, the cell finally <em>does</em> something. The response depends on what the signal was. Some examples:</p>
        <ul>
          <li><strong>Turn on a gene</strong> — start making a new protein</li>
          <li><strong>Flip on an enzyme</strong> — speed up some reaction</li>
          <li><strong>Open an ion channel</strong> — let a nerve signal fire</li>
          <li><strong>Divide</strong> — start the cell cycle and make a copy</li>
        </ul>
        <p>Different cells receiving the same signal can respond differently — depending on what tools they have inside.</p>
      `,
      high: `
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
  }
];

const SIGNAL_CANCER_CARDS = [
  {
    title: "When signaling breaks — cancer",
    body: {
      middle: `
        <p>Normally a cell only divides when a <strong>"grow!"</strong> signal arrives from the outside. The signal arrives, the chain fires, the cell copies itself, and then everything quiets down.</p>
        <p>Cancer happens when something <strong>breaks that brake</strong>. The cell starts acting like it's getting a "grow!" signal even when nothing is being sent. It keeps dividing and dividing — and the broken cells make more broken cells.</p>
      `,
      high: `
        <p>Cell division is normally controlled by external growth-factor signals. A cell only divides when it's told to — by a growth factor binding its receptor and triggering the cascade.</p>
        <p>Cancer happens when mutations <strong>break that brake</strong>. The cell starts behaving as if it's getting a "divide!" signal nonstop, even when no signal is there. It divides uncontrollably — and the cells it produces inherit the mutation.</p>
      `
    }
  },
  {
    title: "Gas pedals and brakes",
    body: {
      middle: `
        <p>Two kinds of genes are involved in cancer:</p>
        <ul>
          <li><strong>"Gas pedal" genes</strong> tell cells to divide. If one of these gets stuck in the ON position, the cell keeps dividing nonstop.</li>
          <li><strong>"Brake" genes</strong> stop cells from dividing when something's wrong. If one of these breaks, there's nothing to stop a runaway cell.</li>
        </ul>
        <p>Cancer usually needs <em>several</em> things to go wrong in one cell — that's why cancer becomes more common as people age.</p>
      `,
      high: `
        <p>Two kinds of genes go bad in cancer:</p>
        <ul>
          <li><strong>Proto-oncogenes</strong> normally code for "go!" signals (growth-factor receptors, kinases, transcription factors). A gain-of-function mutation turns one into an <strong>oncogene</strong> — stuck on.</li>
          <li><strong>Tumor suppressors</strong> normally code for "stop!" signals (p53 halts the cell cycle at checkpoints; Rb prevents premature S-phase entry). A loss-of-function mutation removes the brake.</li>
        </ul>
        <p>Cancer typically takes several such mutations stacking up in one cell line — that's why cancer rates rise with age.</p>
      `
    }
  },
  {
    title: "A famously broken switch — Ras",
    body: {
      middle: `
        <p>There's a small protein in cells called <strong>Ras</strong> that acts like an on/off switch. When everything is normal, Ras flicks on briefly when a "grow!" signal arrives, then flicks back off.</p>
        <p>A common cancer mutation locks Ras in the ON position — so the cell thinks it's getting a "grow!" signal all the time.</p>
        <p>Broken Ras shows up in about <strong>1 out of every 3 cancers</strong>. Lots of modern cancer drugs are designed specifically to fight this.</p>
      `,
      high: `
        <p><strong>Ras</strong> is a small intracellular protein downstream of growth-factor receptors. Normally Ras is a quick switch: GDP-bound → off; GTP-bound → on (briefly), then back off.</p>
        <p>A common cancer mutation locks Ras in the GTP-bound "on" state. Now the growth-promoting cascade fires constantly, with or without a growth signal at the surface.</p>
        <p>Mutated Ras is found in ~30% of all human cancers — pancreatic, colon, lung. Drugs that target mutant Ras are a major modern cancer-research focus.</p>
      `
    }
  },
  {
    title: "Apoptosis — the off-switch",
    body: {
      middle: `
        <p>Cells aren't supposed to live forever. <strong>Apoptosis</strong> is "programmed cell death" — when a cell receives the right signals, it neatly takes itself apart so its parts can be recycled.</p>
        <p>This happens all the time and on purpose:</p>
        <ul>
          <li>It's why your fingers aren't webbed — the cells between them died off as you developed.</li>
          <li>It removes old or damaged cells before they cause problems.</li>
        </ul>
        <p>Some cancers don't just push cells to divide — they also <strong>block apoptosis</strong>, so the bad cells refuse to die.</p>
      `,
      high: `
        <p>Cells aren't supposed to live forever. <strong>Apoptosis</strong> is the programmed cell-death pathway: an orderly self-disassembly that recycles the cell's parts cleanly.</p>
        <p>Apoptosis is triggered by signals too — both "die!" signals (Fas ligand) and the <em>absence</em> of "live!" signals (survival factors). It carves your fingers out of webbed embryonic hands, prunes excess neurons, and eliminates damaged cells before they become cancerous.</p>
        <p>Many cancer mutations don't just push division — they also <em>block apoptosis</em>, so the cell can't be killed when it goes rogue.</p>
      `
    }
  }
];
