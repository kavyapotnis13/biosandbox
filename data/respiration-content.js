/* =========================================================
   respiration-content.js — flashcards for Cellular Respiration

   Four decks:
     RESP_INTRO_CARDS  — overview, equation, location, ATP, 3-stage preview
     RESP_GLYCOLYSIS   — in the cytoplasm: glucose → 2 pyruvate
     RESP_KREBS        — in the mitochondrial matrix: cycle of carbon stripping
     RESP_ETC          — along the inner membrane: electron flow + ATP synthase

   Each card has body: { middle, high }.
   ========================================================= */

const RESP_INTRO_CARDS = [
  {
    title: "What is cellular respiration?",
    body: {
      middle: `
        <p>Cellular respiration is how your cells <strong>turn food into usable energy</strong>.</p>
        <p>You eat a sandwich. Your cells break down the sugar in it and capture the energy as a special molecule called <strong>ATP</strong>. That ATP then powers everything — running, thinking, even just breathing.</p>
        <p>Plants make food with photosynthesis. Animals (and plants, when they're not making food) use respiration to spend it.</p>
      `,
      high: `
        <p>Cellular respiration is how your cells <strong>turn food into usable energy</strong>.</p>
        <p>You eat a sandwich. Your cells eventually break the glucose in it down to extract chemical energy, store it in a molecule called <strong>ATP</strong>, and use that ATP for everything — moving, thinking, growing.</p>
        <p>If photosynthesis is how plants make food, respiration is how everyone (plants included) <em>spends</em> it.</p>
      `
    }
  },
  {
    title: "The big equation",
    body: {
      middle: `
        <p>Respiration is basically <strong>photosynthesis run in reverse</strong>:</p>
        <p style="text-align:center; padding:0.4rem 0;"><strong>sugar + oxygen → carbon dioxide + water + energy</strong></p>
        <p>You take in oxygen, you breathe out carbon dioxide. The CO₂ in your breath right now is mostly the leftover carbon from your last meal, repackaged by your cells.</p>
      `,
      high: `
        <p>Respiration is basically photosynthesis run in reverse:</p>
        <p style="text-align:center; font-family:'JetBrains Mono', monospace; font-size:1rem; padding:0.4rem 0;">
          C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + ATP
        </p>
        <p>Inputs: glucose and oxygen. Outputs: carbon dioxide, water, and ~30+ molecules of ATP per glucose.</p>
        <p>The CO₂ you exhale right now is mostly carbon that came from your last meal — repackaged by your mitochondria.</p>
      `
    }
  },
  {
    title: "ATP — the cell's currency",
    body: {
      middle: `
        <p><strong>ATP</strong> is the energy "money" of the cell. It's a tiny molecule that holds energy, and the cell spends it whenever it needs to do work.</p>
        <p>Think of it as a <strong>rechargeable battery</strong>. When you use one, it goes from charged (ATP) to drained. Respiration recharges them back.</p>
        <p>How busy are your cells? Each one uses about <strong>10 million ATPs every second</strong>. You don't keep a stockpile — you make them on demand.</p>
      `,
      high: `
        <p><strong>ATP</strong> (adenosine triphosphate) is the molecule cells use to move energy around.</p>
        <p>Think of it as a tiny rechargeable battery: <em>charged</em> ATP releases energy when one of its phosphate groups is snapped off (becoming ADP), and respiration recharges it back.</p>
        <p>A single cell burns through and replaces about <strong>10 million ATP molecules every second</strong>. You don't store ATP — you make it on demand.</p>
      `
    }
  },
  {
    title: "Where it happens",
    body: {
      middle: `
        <p>Respiration is a two-part job in two places:</p>
        <ul>
          <li>The first step happens in the cell's <strong>cytoplasm</strong> (the jelly-like fluid filling the cell).</li>
          <li>The bigger steps happen inside the cell's <strong>mitochondria</strong> — the famous "powerhouses of the cell."</li>
        </ul>
        <p>Cells that need lots of energy (like muscle cells and heart cells) are packed with mitochondria.</p>
      `,
      high: `
        <p>Respiration is a two-location job:</p>
        <ul>
          <li><strong>Cytoplasm</strong> — the first stage (glycolysis) happens here, outside the mitochondria.</li>
          <li><strong>Mitochondria</strong> — the second and third stages run inside the cell's "powerhouses."</li>
        </ul>
        <p>That's why cells that need a lot of energy — muscle cells, neurons, heart cells — are packed with mitochondria.</p>
      `
    }
  },
  {
    title: "Three stages",
    body: {
      middle: `
        <p>Respiration runs in three stages, each one feeding the next:</p>
        <ol>
          <li><strong>Glycolysis</strong> — splits sugar in half. Makes a little bit of ATP.</li>
          <li><strong>Krebs cycle</strong> — strips the leftover apart into carbon dioxide. Stores energy in carriers.</li>
          <li><strong>Electron transport chain</strong> — uses those carriers and oxygen to make a LOT of ATP.</li>
        </ol>
        <p>Let's walk through each one.</p>
      `,
      high: `
        <p>Respiration runs in three connected stages:</p>
        <ol>
          <li><strong>Glycolysis</strong> — in the cytoplasm. Glucose is split in two. Small ATP yield.</li>
          <li><strong>Krebs cycle</strong> — in the mitochondrial matrix. Carbons are stripped off as CO₂; lots of NADH and FADH₂ produced.</li>
          <li><strong>Electron transport chain</strong> — along the inner mitochondrial membrane. NADH and FADH₂ are spent to make <em>lots</em> of ATP, using O₂ as the final electron acceptor.</li>
        </ol>
        <p>Let's walk through each one.</p>
      `
    }
  }
];

const RESP_GLYCOLYSIS = [
  {
    title: "Step 1 — Glucose arrives",
    body: {
      middle: `
        <p>A sugar molecule (<strong>glucose</strong>) floats into the cell and lands in the cytoplasm, outside the mitochondria.</p>
        <p>Glycolysis means "splitting sugar," and that's about to happen. This first stage doesn't need any oxygen — it's an ancient process that worked back when Earth had hardly any oxygen in the air.</p>
      `,
      high: `
        <p>A glucose molecule enters the cell and lands in the <strong>cytoplasm</strong> — the jelly-like fluid filling the cell, outside the mitochondria.</p>
        <p>Glycolysis means "splitting sugar," and that's exactly what's about to happen. No oxygen needed for this stage — glycolysis is ancient enough that it predates Earth having much O₂ in its atmosphere.</p>
      `
    }
  },
  {
    title: "Step 2 — Glucose is split in half",
    body: {
      middle: `
        <p>About ten enzymes work together to chop the glucose molecule into <strong>two smaller pieces</strong>. Each piece is called <strong>pyruvate</strong>.</p>
        <p>The cell actually has to <em>spend</em> a tiny bit of ATP at the start to get the process going — but it gets that back and a little more before the stage ends.</p>
      `,
      high: `
        <p>Through a series of about ten enzyme-driven reactions, the 6-carbon glucose molecule is rearranged and chopped in half.</p>
        <p>The result: two 3-carbon molecules called <strong>pyruvate</strong>.</p>
        <p>To get the process going, the cell actually has to <em>spend</em> 2 ATP first — but it earns that back and then some.</p>
      `
    }
  },
  {
    title: "Step 3 — Small payoff",
    body: {
      middle: `
        <p>At the end of glycolysis, the cell has gained:</p>
        <ul>
          <li><strong>2 ATP</strong> (a small amount of energy)</li>
          <li>Some electron carriers (loaded up to use later)</li>
          <li>Two pyruvate pieces, ready for the next stage</li>
        </ul>
        <p>Two ATP isn't much. The real prize comes in the next stages — inside the mitochondria.</p>
      `,
      high: `
        <p>By the end of glycolysis, the cell has produced:</p>
        <ul>
          <li><strong>4 ATP</strong> made (minus 2 spent at the start) → <strong>net 2 ATP</strong></li>
          <li><strong>2 NADH</strong> — electron carriers, like NADPH's cousin</li>
          <li><strong>2 pyruvate</strong> molecules</li>
        </ul>
        <p>Two ATP is a tiny yield. The pyruvate now drifts to a mitochondrion, where the <em>real</em> energy harvest is about to begin.</p>
      `
    }
  }
];

const RESP_KREBS = [
  {
    title: "Step 1 — Pyruvate enters the mitochondrion",
    body: {
      middle: `
        <p>Each pyruvate slips into the mitochondrion and into its inner fluid (called the <strong>matrix</strong>).</p>
        <p>Once inside, an enzyme rips off one of the carbons — and out it goes as a <strong>CO₂ molecule</strong>. (That's the carbon dioxide you breathe out!) What's left gets hooked onto a helper called <strong>coenzyme A</strong>, ready to enter the cycle.</p>
      `,
      high: `
        <p>Each pyruvate slips through the mitochondrion's two membranes and into the <strong>matrix</strong> — the fluid center.</p>
        <p>There it's converted into <strong>acetyl-CoA</strong>: one carbon is sheared off as CO₂, and what's left (a 2-carbon acetyl group) is hooked onto a carrier molecule called coenzyme A. One NADH is made in the process.</p>
      `
    }
  },
  {
    title: "Step 2 — Joining the cycle",
    body: {
      middle: `
        <p>The leftover piece (now riding on coenzyme A) attaches itself to another molecule already in the cycle. This kicks off the <strong>Krebs cycle</strong> — a loop of reactions that keeps spinning, pulling carbons off and storing energy in carriers.</p>
      `,
      high: `
        <p>Acetyl-CoA hands its 2-carbon piece to a 4-carbon molecule called <strong>oxaloacetate</strong>, forming 6-carbon <strong>citrate</strong>.</p>
        <p>That's the start of the <strong>Krebs cycle</strong> (also called the citric acid cycle, since citrate is its first product).</p>
      `
    }
  },
  {
    title: "Step 3 — Carbons leave as CO₂",
    body: {
      middle: `
        <p>As the cycle turns, enzymes <strong>strip carbons off</strong>, one by one, and release them as <strong>CO₂</strong>. That's the carbon dioxide you exhale — it's literally the leftover atoms from your last meal.</p>
        <p>Meanwhile, every turn of the cycle <strong>loads up energy carriers</strong> with the energy that will eventually become a lot of ATP in the next stage.</p>
      `,
      high: `
        <p>As the cycle turns, enzymes systematically pull carbons off the molecule and release them as <strong>CO₂</strong> — the carbon dioxide you breathe out.</p>
        <p>Each turn of the cycle yields:</p>
        <ul>
          <li>3 NADH</li>
          <li>1 FADH₂</li>
          <li>1 ATP (well, GTP, but close enough)</li>
          <li>2 CO₂</li>
        </ul>
        <p>And the cycle ends back at oxaloacetate, ready to grab another acetyl-CoA.</p>
      `
    }
  },
  {
    title: "Step 4 — Two turns per glucose",
    body: {
      middle: `
        <p>Remember — glycolysis split one glucose into <em>two</em> pyruvates. So the Krebs cycle runs <strong>twice</strong> for every glucose molecule.</p>
        <p>The cycle itself only directly makes a little ATP. The real prize is the giant pile of <strong>energy carriers</strong> it generates — those are about to get cashed in for a HUGE amount of ATP in the last stage.</p>
      `,
      high: `
        <p>Each original glucose became <em>two</em> pyruvates back in glycolysis — so the Krebs cycle runs <strong>twice</strong> per glucose molecule.</p>
        <p>Direct ATP yield from Krebs is small (2 ATP per glucose). But the real prize is the pile of <strong>NADH and FADH₂</strong> the cycle is generating. Those are about to be cashed in for a lot more ATP.</p>
      `
    }
  }
];

const RESP_ETC = [
  {
    title: "Step 1 — Electrons enter the chain",
    body: {
      middle: `
        <p>All the energy carriers from glycolysis and the Krebs cycle drop off their electrons onto a series of proteins stuck in the inner mitochondrial membrane.</p>
        <p>This series is called the <strong>electron transport chain</strong>. It's like a relay race: the electrons get passed from one protein to the next, each pass releasing a little bit of energy.</p>
      `,
      high: `
        <p>All those NADH and FADH₂ molecules from glycolysis and the Krebs cycle now drop their electrons onto a series of protein complexes embedded in the <strong>inner mitochondrial membrane</strong>.</p>
        <p>This is the <strong>electron transport chain (ETC)</strong>. The folded inner membrane (cristae) gives it lots of surface area to work with.</p>
      `
    }
  },
  {
    title: "Step 2 — Building up a gradient",
    body: {
      middle: `
        <p>Every time an electron is handed off, the released energy is used to <strong>push hydrogen ions to one side of the membrane</strong>.</p>
        <p>Hydrogen ions pile up on one side, creating an imbalance — like water building up behind a dam. That stored-up imbalance is the cell's secret weapon.</p>
      `,
      high: `
        <p>As electrons hop from protein to protein down the chain, they release energy.</p>
        <p>That energy is used to <strong>pump H⁺ ions</strong> from the matrix into the intermembrane space, building up a steep concentration difference — like water piling up behind a dam.</p>
      `
    }
  },
  {
    title: "Step 3 — ATP synthase spins out ATP",
    body: {
      middle: `
        <p>Now the dam opens. Hydrogen ions rush back across the membrane through a beautiful little spinning machine called <strong>ATP synthase</strong>.</p>
        <p>As they flow through, the machine literally <em>spins</em> — and that spinning forces ATP to be made. Lots and lots of ATP.</p>
        <p>This is where the <strong>vast majority of your energy</strong> comes from. About 28 ATP per glucose, all from this one spinning enzyme.</p>
      `,
      high: `
        <p>The H⁺ ions desperately want to flow back down their gradient — and there's only one opening: a turbine-shaped enzyme called <strong>ATP synthase</strong>.</p>
        <p>As H⁺ ions rush through, the turbine literally <em>spins</em>, and that mechanical rotation forces ADP + Pi together into ATP.</p>
        <p>This is where the <strong>bulk of cellular ATP</strong> gets made — around 26-28 ATP per glucose.</p>
      `
    }
  },
  {
    title: "Step 4 — Oxygen at the end",
    body: {
      middle: `
        <p>By the end of the chain, the electrons are tired. They need somewhere to go — and that's where <strong>oxygen</strong> comes in. Oxygen grabs the worn-out electrons and combines with hydrogen to make <strong>water</strong>.</p>
        <p>This is the whole reason you breathe! Without oxygen, the chain backs up, ATP production stops, and your cells die in minutes.</p>
        <p>Total ATP per glucose: about <strong>30 to 32</strong>. Glycolysis alone made just 2 — oxygen is the big multiplier.</p>
      `,
      high: `
        <p>At the end of the chain, electrons need somewhere to go — otherwise the chain backs up and shuts down.</p>
        <p>That's where <strong>oxygen</strong> comes in. O₂ accepts the spent electrons and pairs with H⁺ to form <strong>water</strong>.</p>
        <p>This is why you breathe in O₂ — without it, the ETC stalls, ATP production collapses, and your cells die within minutes.</p>
        <p>Total ATP per glucose: roughly <strong>30-32</strong>. Compare to just 2 from glycolysis alone — oxygen is a massive multiplier.</p>
      `
    }
  },
  {
    title: "No oxygen? Fermentation kicks in",
    body: {
      middle: `
        <p>What if oxygen runs out? Without oxygen at the end of the chain, the whole electron transport chain stalls.</p>
        <p>Cells have a backup plan called <strong>fermentation</strong>. It only makes 2 ATP per glucose (way less than 32), but it keeps a little energy flowing while oxygen is missing.</p>
        <ul>
          <li>Your <strong>muscles</strong> use one kind of fermentation during a hard sprint — they make <em>lactic acid</em>, which is part of why muscles burn during intense exercise.</li>
          <li><strong>Yeast</strong> uses a different kind — it makes <em>alcohol</em> and CO₂. That's what makes bread rise and beer brew.</li>
        </ul>
      `,
      high: `
        <p>What if O₂ runs out? The ETC stalls because there's nothing to grab the spent electrons. Without the ETC, NADH piles up — and the cell runs out of NAD⁺ to keep glycolysis going.</p>
        <p>Cells solve this with <strong>fermentation</strong>: a quick way to regenerate NAD⁺ by dumping electrons onto pyruvate or a derivative.</p>
        <ul>
          <li><strong>Lactic acid fermentation</strong> (your muscles during a sprint, bacteria in yogurt): pyruvate + NADH → lactate + NAD⁺.</li>
          <li><strong>Alcoholic fermentation</strong> (yeast in beer and bread): pyruvate → CO₂ + acetaldehyde + NADH → ethanol + NAD⁺.</li>
        </ul>
        <p>Fermentation produces only <strong>2 ATP per glucose</strong> (from glycolysis itself) — but it keeps glycolysis going when oxygen is scarce. That's why your muscles burn during sprinting (lactate buildup) and why yeast makes bread rise (CO₂ from alcoholic fermentation).</p>
      `
    }
  },
  {
    title: "With oxygen vs without",
    body: {
      middle: `
        <p>Quick comparison:</p>
        <ul>
          <li><strong>With oxygen (aerobic):</strong> ~30 ATP per glucose. Slow to start, requires mitochondria, way more energy.</li>
          <li><strong>Without oxygen (fermentation):</strong> 2 ATP per glucose. Fast, no mitochondria needed, but wasteful.</li>
        </ul>
        <p>Your muscles flip between both during exercise — using oxygen when there's enough, switching to fermentation during all-out sprints. Some tiny organisms (like the yeast in bread) <em>only</em> do fermentation.</p>
      `,
      high: `
        <p><strong>Aerobic respiration</strong> (with O₂): 30–32 ATP per glucose. Slow to start, requires mitochondria, but vastly more efficient.</p>
        <p><strong>Anaerobic respiration / fermentation</strong> (without O₂): 2 ATP per glucose. Fast, no mitochondria required, but wastes most of the glucose's energy.</p>
        <p>Many microbes (and your muscles during heavy exercise) switch flexibly between the two. Obligate anaerobes (e.g. <em>Clostridium</em>) only do fermentation; obligate aerobes (e.g. you) can't survive without O₂ for more than a few minutes.</p>
        <p>Evolutionarily, fermentation is much older — early life ran on it before oxygen-producing photosynthesis filled the atmosphere ~2.4 billion years ago.</p>
      `
    }
  }
];
