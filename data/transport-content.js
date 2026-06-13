/* =========================================================
   transport-content.js — flashcards for Membrane Transport
   ========================================================= */

const TRANSPORT_INTRO_CARDS = [
  {
    title: "The membrane — a selective gate",
    body: `
      <p>Every cell is wrapped in a <strong>phospholipid bilayer</strong>: two sheets of lipid molecules with their water-loving heads facing out (toward water) and their water-hating tails facing in (toward each other).</p>
      <p>That oily middle layer is the cell's main barrier. It freely lets small, nonpolar molecules through (O₂, CO₂, steroids) but blocks ions and polar molecules — which is most of the chemistry of life.</p>
      <p>So the membrane needs <strong>transport machinery</strong> for everything else.</p>
    `
  },
  {
    title: "Three rules of crossing the membrane",
    body: `
      <p>Whether or not a molecule can cross the bilayer on its own depends on three things:</p>
      <ul>
        <li><strong>Size</strong> — small molecules cross more easily.</li>
        <li><strong>Polarity</strong> — nonpolar (oily) crosses easily; polar (water-loving) does not.</li>
        <li><strong>Charge</strong> — ions can't cross the hydrophobic core. They always need a transporter.</li>
      </ul>
      <p>That's why ions (Na⁺, K⁺, Ca²⁺) and big polar molecules (glucose, amino acids) need protein channels or carriers to get across.</p>
    `
  }
];

const TRANSPORT_PASSIVE_CARDS = [
  {
    title: "Passive transport — going downhill, no ATP",
    body: `
      <p><strong>Passive transport</strong> moves molecules <em>down their concentration gradient</em> (from more crowded to less crowded). It releases potential energy — no ATP required.</p>
      <p>Two flavors:</p>
      <ul>
        <li><strong>Simple diffusion</strong> — straight through the bilayer (works for O₂, CO₂, small nonpolar molecules).</li>
        <li><strong>Facilitated diffusion</strong> — through a protein channel or carrier (for ions, glucose, water).</li>
      </ul>
      <p>Both reach equilibrium when concentrations are equal on both sides. They never push uphill.</p>
    `
  },
  {
    title: "Channel proteins and carrier proteins",
    body: `
      <p>Two ways facilitated diffusion happens:</p>
      <ul>
        <li><strong>Channel proteins</strong> form a hydrophilic tunnel that lets a specific ion or molecule slip through. Aquaporins (for water) and ion channels (for K⁺, Na⁺) are classics.</li>
        <li><strong>Carrier proteins</strong> bind their cargo and physically <em>change shape</em> to flip it across. GLUT transporters carrying glucose into your cells work this way.</li>
      </ul>
      <p>Both are <em>specific</em> — like enzymes, each transporter handles only certain molecules.</p>
    `
  },
  {
    title: "Osmosis — water following the gradient",
    body: `
      <p><strong>Osmosis</strong> is the diffusion of <em>water</em> across a selectively permeable membrane, from where water is more concentrated (fewer dissolved solutes) to where it's less concentrated (more solutes).</p>
      <p>Water moves through the bilayer slowly, but it moves <em>fast</em> through <strong>aquaporin</strong> channels. Red blood cells, kidney tubules, and plant root cells are packed with aquaporins.</p>
      <p>You can think of it as: water is trying to dilute the side with more stuff dissolved in it.</p>
    `
  }
];

const TRANSPORT_TONICITY_CARDS = [
  {
    title: "Tonicity — three words to memorize",
    body: `
      <p>The tonicity of a solution describes how it affects a cell's water balance:</p>
      <ul>
        <li><strong>Isotonic</strong> — solute concentration is the same inside and outside. No net water movement. The cell stays the same.</li>
        <li><strong>Hypotonic</strong> — solute concentration is <em>lower</em> outside than inside the cell. Water rushes <em>in</em>. Animal cells swell and may burst (<em>lyse</em>). Plant cells become turgid — firm, the desirable state.</li>
        <li><strong>Hypertonic</strong> — solute concentration is <em>higher</em> outside than inside. Water rushes <em>out</em>. Animal cells shrivel (<em>crenate</em>). Plant cells lose pressure (<em>plasmolyze</em>) and wilt.</li>
      </ul>
      <p>Tip: the prefix tells you the <em>outside</em> solute concentration. Hyper = more outside; hypo = less outside.</p>
    `
  },
  {
    title: "Why this matters — IV fluids, brine, wilted lettuce",
    body: `
      <p>Real-world consequences of tonicity:</p>
      <ul>
        <li>Hospitals use <strong>isotonic saline</strong> (0.9% NaCl) for IV drips because it matches blood. Plain water would burst red blood cells; concentrated salt would shrivel them.</li>
        <li>Salting meat or fish (a <em>hypertonic</em> brine) pulls water out of bacteria and preserves the food.</li>
        <li>Wilted lettuce is plant cells that have lost turgor — soak it in fresh water (hypotonic to the cells) and they swell up firm again.</li>
      </ul>
      <p>Osmotic balance is a constant, active job for every cell — too far in either direction and the cell dies.</p>
    `
  },
  {
    title: "Osmoregulation — actively managing water",
    body: `
      <p>Organisms in unusual environments have to actively defend their osmotic balance — that's <strong>osmoregulation</strong>.</p>
      <ul>
        <li><strong>Paramecium</strong> in freshwater is constantly absorbing water by osmosis. Its <em>contractile vacuole</em> pumps water back out using ATP.</li>
        <li><strong>Saltwater fish</strong> are constantly losing water to their hypertonic ocean. They drink seawater and excrete salt through their gills.</li>
        <li><strong>You</strong> osmoregulate via your kidneys — they fine-tune water and salt in your blood every minute of your life.</li>
      </ul>
    `
  }
];

const TRANSPORT_ACTIVE_AND_SAV_CARDS = [
  {
    title: "Active transport — pushing uphill",
    body: `
      <p><strong>Active transport</strong> moves a molecule <em>against</em> its concentration gradient — from low to high. That violates entropy, so it has to be paid for with energy, usually ATP.</p>
      <p>The cell uses active transport to build up gradients it needs: high K⁺ inside, high Na⁺ outside, high Ca²⁺ outside, low H⁺ inside. Those gradients are then the source of energy for nerve impulses, muscle contraction, and even ATP synthesis itself.</p>
    `
  },
  {
    title: "The sodium–potassium pump",
    body: `
      <p>The <strong>Na⁺/K⁺ ATPase</strong> is in every animal cell. Each cycle:</p>
      <ol>
        <li>3 Na⁺ bind inside.</li>
        <li>ATP phosphorylates the pump — it changes shape.</li>
        <li>3 Na⁺ released outside; 2 K⁺ bind.</li>
        <li>Phosphate falls off — pump returns to original shape.</li>
        <li>2 K⁺ released inside. Repeat.</li>
      </ol>
      <p>Net result: Na⁺ pumped out, K⁺ pumped in, 1 ATP spent. This pump uses about <strong>20–25% of your resting calorie budget</strong> — that's how important keeping ion gradients is.</p>
    `
  },
  {
    title: "Endocytosis & exocytosis — bulk transport",
    body: `
      <p>For really big stuff — proteins, debris, whole bacteria — the membrane uses bulk transport with vesicles:</p>
      <ul>
        <li><strong>Endocytosis</strong> — membrane folds inward and pinches off a vesicle bringing material <em>in</em>. Three flavors: phagocytosis (cell eating, e.g. immune cells engulfing bacteria), pinocytosis (cell drinking), receptor-mediated (specific cargo with receptor-marked vesicles).</li>
        <li><strong>Exocytosis</strong> — a vesicle inside fuses with the membrane, releasing its cargo <em>out</em>. Neurons release neurotransmitters this way; pancreas cells release insulin.</li>
      </ul>
      <p>Both are active processes — they need ATP and they reshape the membrane.</p>
    `
  },
  {
    title: "Surface area vs volume — why cells stay small",
    body: `
      <p>A cell's transport across the membrane scales with its <strong>surface area</strong>. Its metabolic demand scales with its <strong>volume</strong>.</p>
      <p>As a cell grows, volume grows as r³ but surface area only as r². The ratio SA/V <em>drops</em>. Past a certain size, the membrane simply can't move enough material in and out fast enough to feed the cell — and waste builds up.</p>
      <p>That's why cells stay small. Big organisms get big by having <em>more</em> cells, not bigger ones. Cells that need huge surface area (intestinal lining, root hairs, neurons) grow folds, fingers, or branches — that's surface-area-to-volume optimization in action.</p>
    `
  }
];
