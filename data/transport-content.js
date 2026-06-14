/* =========================================================
   transport-content.js — flashcards for Membrane Transport

   Each card has body: { middle, high }; the renderer picks
   the right version based on the audience track.
   ========================================================= */

const TRANSPORT_INTRO_CARDS = [
  {
    title: "The membrane — a selective gate",
    body: {
      middle: `
        <p>Every cell is wrapped in a thin layer called the <strong>cell membrane</strong>. It works like a security guard — letting some things through and blocking others.</p>
        <p>The membrane is made of two layers of fatty molecules stacked together (an "oily middle"). Small, oily things slip through it easily, but anything with a charge (like salt particles) or anything big gets blocked.</p>
        <p>So how does the cell get sugar, salt, and water in and out? It has special <strong>doorways</strong> built into the membrane — that's the rest of this module.</p>
      `,
      high: `
        <p>Every cell is wrapped in a <strong>phospholipid bilayer</strong>: two sheets of lipid molecules with their water-loving heads facing out (toward water) and their water-hating tails facing in (toward each other).</p>
        <p>That oily middle layer is the cell's main barrier. It freely lets small, nonpolar molecules through (O₂, CO₂, steroids) but blocks ions and polar molecules — which is most of the chemistry of life.</p>
        <p>So the membrane needs <strong>transport machinery</strong> for everything else.</p>
      `
    }
  },
  {
    title: "Three rules of crossing the membrane",
    body: {
      middle: `
        <p>Whether something can sneak across the membrane on its own depends on three things:</p>
        <ul>
          <li><strong>Size</strong> — small things slip through; big things can't.</li>
          <li><strong>Oily or not</strong> — oily things mix with the membrane and pass through; watery things get stuck.</li>
          <li><strong>Charge</strong> — anything with a + or − charge (like salt ions) always needs a doorway.</li>
        </ul>
        <p>That's why sugar, salt, and other "watery" molecules need special protein doorways to get in and out.</p>
      `,
      high: `
        <p>Whether or not a molecule can cross the bilayer on its own depends on three things:</p>
        <ul>
          <li><strong>Size</strong> — small molecules cross more easily.</li>
          <li><strong>Polarity</strong> — nonpolar (oily) crosses easily; polar (water-loving) does not.</li>
          <li><strong>Charge</strong> — ions can't cross the hydrophobic core. They always need a transporter.</li>
        </ul>
        <p>That's why ions (Na⁺, K⁺, Ca²⁺) and big polar molecules (glucose, amino acids) need protein channels or carriers to get across.</p>
      `
    }
  }
];

const TRANSPORT_PASSIVE_CARDS = [
  {
    title: "Passive transport — going downhill, no energy needed",
    body: {
      middle: `
        <p>If a place has lots of something on one side of the membrane and not much on the other, things naturally drift from the crowded side to the empty side — like people leaving a packed room. This is called <strong>passive transport</strong>, and it's <em>free</em>: it doesn't cost any energy.</p>
        <p>Two flavors:</p>
        <ul>
          <li><strong>Simple diffusion</strong> — slipping right through the membrane (works for oxygen and carbon dioxide).</li>
          <li><strong>Facilitated diffusion</strong> — using a protein doorway because the molecule can't get through on its own (for things like salt or sugar).</li>
        </ul>
      `,
      high: `
        <p><strong>Passive transport</strong> moves molecules <em>down their concentration gradient</em> (from more crowded to less crowded). It releases potential energy — no ATP required.</p>
        <p>Two flavors:</p>
        <ul>
          <li><strong>Simple diffusion</strong> — straight through the bilayer (works for O₂, CO₂, small nonpolar molecules).</li>
          <li><strong>Facilitated diffusion</strong> — through a protein channel or carrier (for ions, glucose, water).</li>
        </ul>
        <p>Both reach equilibrium when concentrations are equal on both sides. They never push uphill.</p>
      `
    }
  },
  {
    title: "Channels and carriers — the doorways",
    body: {
      middle: `
        <p>The membrane's protein doorways come in two styles:</p>
        <ul>
          <li><strong>Channels</strong> are open tunnels — like a tube. Things just slide through. Water has its own channel called an aquaporin.</li>
          <li><strong>Carriers</strong> work more like revolving doors. They grab the molecule on one side, flip around, and let it out the other side.</li>
        </ul>
        <p>Each doorway is <em>picky</em>: it only lets specific molecules through. A glucose carrier won't carry salt, and a salt channel won't carry sugar.</p>
      `,
      high: `
        <p>Two ways facilitated diffusion happens:</p>
        <ul>
          <li><strong>Channel proteins</strong> form a hydrophilic tunnel that lets a specific ion or molecule slip through. Aquaporins (for water) and ion channels (for K⁺, Na⁺) are classics.</li>
          <li><strong>Carrier proteins</strong> bind their cargo and physically <em>change shape</em> to flip it across. GLUT transporters carrying glucose into your cells work this way.</li>
        </ul>
        <p>Both are <em>specific</em> — like enzymes, each transporter handles only certain molecules.</p>
      `
    }
  },
  {
    title: "Osmosis — water following the gradient",
    body: {
      middle: `
        <p><strong>Osmosis</strong> is a fancy word for one simple idea: <em>water moves from where there's a lot of water toward where there's less.</em></p>
        <p>If one side of a membrane has lots of salt dissolved in it, that side has "less" water (since the salt is taking up space). Water naturally flows toward the salty side, trying to even things out.</p>
        <p>This is why a wilted plant perks up when you water it — water rushes into the plant cells through osmosis, filling them up.</p>
      `,
      high: `
        <p><strong>Osmosis</strong> is the diffusion of <em>water</em> across a selectively permeable membrane, from where water is more concentrated (fewer dissolved solutes) to where it's less concentrated (more solutes).</p>
        <p>Water moves through the bilayer slowly, but it moves <em>fast</em> through <strong>aquaporin</strong> channels. Red blood cells, kidney tubules, and plant root cells are packed with aquaporins.</p>
        <p>You can think of it as: water is trying to dilute the side with more stuff dissolved in it.</p>
      `
    }
  }
];

const TRANSPORT_TONICITY_CARDS = [
  {
    title: "Tonicity — three words to know",
    body: {
      middle: `
        <p>Cells care a LOT about how salty/sugary the liquid <em>around</em> them is, because water flows in or out depending on the comparison.</p>
        <ul>
          <li><strong>Isotonic</strong> — same saltiness inside and outside. Water stays even. Cell is happy.</li>
          <li><strong>Hypotonic</strong> — outside is LESS salty than inside. Water rushes <em>into</em> the cell. The cell swells up. (Animal cells can burst!)</li>
          <li><strong>Hypertonic</strong> — outside is MORE salty than inside. Water rushes <em>out</em>. The cell shrivels.</li>
        </ul>
        <p>Quick way to remember: <em>hyper = more outside, hypo = less outside</em>. Water always moves toward the saltier side.</p>
      `,
      high: `
        <p>The tonicity of a solution describes how it affects a cell's water balance:</p>
        <ul>
          <li><strong>Isotonic</strong> — solute concentration is the same inside and outside. No net water movement. The cell stays the same.</li>
          <li><strong>Hypotonic</strong> — solute concentration is <em>lower</em> outside than inside the cell. Water rushes <em>in</em>. Animal cells swell and may burst (<em>lyse</em>). Plant cells become turgid — firm, the desirable state.</li>
          <li><strong>Hypertonic</strong> — solute concentration is <em>higher</em> outside than inside. Water rushes <em>out</em>. Animal cells shrivel (<em>crenate</em>). Plant cells lose pressure (<em>plasmolyze</em>) and wilt.</li>
        </ul>
        <p>Tip: the prefix tells you the <em>outside</em> solute concentration. Hyper = more outside; hypo = less outside.</p>
      `
    }
  },
  {
    title: "Why this matters — IV fluids, salty meat, soggy lettuce",
    body: {
      middle: `
        <p>Tonicity shows up everywhere:</p>
        <ul>
          <li>When you get an IV at the hospital, the drip is <strong>specially mixed</strong> to match your blood. Plain water would burst your blood cells.</li>
          <li>People salt meat and fish to <strong>preserve them</strong>. The salt pulls water out of bacteria so they can't grow.</li>
          <li>If your lettuce gets wilted in the fridge, soaking it in cold water makes it crisp again — water flows back into the plant cells.</li>
        </ul>
      `,
      high: `
        <p>Real-world consequences of tonicity:</p>
        <ul>
          <li>Hospitals use <strong>isotonic saline</strong> (0.9% NaCl) for IV drips because it matches blood. Plain water would burst red blood cells; concentrated salt would shrivel them.</li>
          <li>Salting meat or fish (a <em>hypertonic</em> brine) pulls water out of bacteria and preserves the food.</li>
          <li>Wilted lettuce is plant cells that have lost turgor — soak it in fresh water (hypotonic to the cells) and they swell up firm again.</li>
        </ul>
        <p>Osmotic balance is a constant, active job for every cell — too far in either direction and the cell dies.</p>
      `
    }
  },
  {
    title: "Osmoregulation — keeping water balanced",
    body: {
      middle: `
        <p>Some animals live in places where keeping their water balance is a constant fight. That fight is called <strong>osmoregulation</strong>.</p>
        <ul>
          <li>A tiny one-celled animal in pond water has to pump out water constantly — otherwise it would swell up and pop.</li>
          <li>A fish in the ocean is losing water all the time to the salty water around it, so it drinks seawater and gets rid of the extra salt through its gills.</li>
          <li>Your <strong>kidneys</strong> do this same balancing act for you every minute.</li>
        </ul>
      `,
      high: `
        <p>Organisms in unusual environments have to actively defend their osmotic balance — that's <strong>osmoregulation</strong>.</p>
        <ul>
          <li><strong>Paramecium</strong> in freshwater is constantly absorbing water by osmosis. Its <em>contractile vacuole</em> pumps water back out using ATP.</li>
          <li><strong>Saltwater fish</strong> are constantly losing water to their hypertonic ocean. They drink seawater and excrete salt through their gills.</li>
          <li><strong>You</strong> osmoregulate via your kidneys — they fine-tune water and salt in your blood every minute of your life.</li>
        </ul>
      `
    }
  }
];

const TRANSPORT_ACTIVE_AND_SAV_CARDS = [
  {
    title: "Active transport — pushing uphill",
    body: {
      middle: `
        <p>Sometimes a cell needs to move something the <em>wrong</em> way — from less crowded to more crowded. That's like pushing a ball uphill: it doesn't happen on its own. The cell has to <strong>spend energy</strong> (ATP) to make it happen.</p>
        <p>This is called <strong>active transport</strong>. The cell uses it to keep certain ions super concentrated on one side of the membrane — and those built-up gradients power important things like nerve signals and muscle movement.</p>
      `,
      high: `
        <p><strong>Active transport</strong> moves a molecule <em>against</em> its concentration gradient — from low to high. That violates entropy, so it has to be paid for with energy, usually ATP.</p>
        <p>The cell uses active transport to build up gradients it needs: high K⁺ inside, high Na⁺ outside, high Ca²⁺ outside, low H⁺ inside. Those gradients are then the source of energy for nerve impulses, muscle contraction, and even ATP synthesis itself.</p>
      `
    }
  },
  {
    title: "The sodium–potassium pump",
    body: {
      middle: `
        <p>One of the most important pumps in your body is the <strong>sodium–potassium pump</strong>. Every single one of your cells has thousands of them in its membrane.</p>
        <p>Each pump grabs sodium ions from inside the cell and pushes them out, while pulling potassium ions in. It takes 1 ATP to do this — over and over and over.</p>
        <p>How important is this? About <strong>1 out of every 5 calories</strong> you eat goes just to running these pumps. They keep your nerves working, your muscles moving, and your heart beating.</p>
      `,
      high: `
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
    }
  },
  {
    title: "Endocytosis & exocytosis — bulk delivery",
    body: {
      middle: `
        <p>What if a cell needs to move something REALLY big, like a whole bacterium? Doorways won't fit. So the cell uses a different trick: it folds its membrane around the cargo to make a little bubble.</p>
        <ul>
          <li><strong>Endocytosis</strong> = bringing stuff IN. The membrane folds inward and pinches off, sealing the cargo inside a bubble. Your immune cells eat bacteria this way — it's called "cell eating."</li>
          <li><strong>Exocytosis</strong> = sending stuff OUT. A bubble already inside the cell fuses with the membrane and dumps its cargo outside. Nerve cells use this to send signals to other nerves.</li>
        </ul>
      `,
      high: `
        <p>For really big stuff — proteins, debris, whole bacteria — the membrane uses bulk transport with vesicles:</p>
        <ul>
          <li><strong>Endocytosis</strong> — membrane folds inward and pinches off a vesicle bringing material <em>in</em>. Three flavors: phagocytosis (cell eating, e.g. immune cells engulfing bacteria), pinocytosis (cell drinking), receptor-mediated (specific cargo with receptor-marked vesicles).</li>
          <li><strong>Exocytosis</strong> — a vesicle inside fuses with the membrane, releasing its cargo <em>out</em>. Neurons release neurotransmitters this way; pancreas cells release insulin.</li>
        </ul>
        <p>Both are active processes — they need ATP and they reshape the membrane.</p>
      `
    }
  },
  {
    title: "Why cells stay small",
    body: {
      middle: `
        <p>Have you ever wondered why cells are so tiny? Why doesn't one cell just grow into a whole elephant?</p>
        <p>Here's the catch. As a cell gets bigger, its <em>insides</em> grow faster than its <em>surface</em>. But the cell needs its surface (the membrane) to bring in food and dump out waste. Get too big, and the membrane can't keep up.</p>
        <p>So instead of building one giant cell, big organisms build with <strong>lots of small cells</strong>. You have about 30 trillion of them. Some cells that need extra surface area grow fingers or folds — like the cells lining your intestines.</p>
      `,
      high: `
        <p>A cell's transport across the membrane scales with its <strong>surface area</strong>. Its metabolic demand scales with its <strong>volume</strong>.</p>
        <p>As a cell grows, volume grows as r³ but surface area only as r². The ratio SA/V <em>drops</em>. Past a certain size, the membrane simply can't move enough material in and out fast enough to feed the cell — and waste builds up.</p>
        <p>That's why cells stay small. Big organisms get big by having <em>more</em> cells, not bigger ones. Cells that need huge surface area (intestinal lining, root hairs, neurons) grow folds, fingers, or branches — that's surface-area-to-volume optimization in action.</p>
      `
    }
  }
];
