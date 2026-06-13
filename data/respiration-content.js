/* =========================================================
   respiration-content.js — flashcards for Cellular Respiration

   Four decks:
     RESP_INTRO_CARDS  — overview, equation, location, ATP, 3-stage preview
     RESP_GLYCOLYSIS   — in the cytoplasm: glucose → 2 pyruvate
     RESP_KREBS        — in the mitochondrial matrix: cycle of carbon stripping
     RESP_ETC          — along the inner membrane: electron flow + ATP synthase
   ========================================================= */

const RESP_INTRO_CARDS = [
  {
    title: "What is cellular respiration?",
    body: `
      <p>Cellular respiration is how your cells <strong>turn food into usable energy</strong>.</p>
      <p>You eat a sandwich. Your cells eventually break the glucose in it down to extract chemical energy, store it in a molecule called <strong>ATP</strong>, and use that ATP for everything — moving, thinking, growing.</p>
      <p>If photosynthesis is how plants make food, respiration is how everyone (plants included) <em>spends</em> it.</p>
    `
  },
  {
    title: "The overall equation",
    body: `
      <p>Respiration is basically photosynthesis run in reverse:</p>
      <p style="text-align:center; font-family:'JetBrains Mono', monospace; font-size:1rem; padding:0.4rem 0;">
        C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + ATP
      </p>
      <p>Inputs: glucose and oxygen. Outputs: carbon dioxide, water, and ~30+ molecules of ATP per glucose.</p>
      <p>The CO₂ you exhale right now is mostly carbon that came from your last meal — repackaged by your mitochondria.</p>
    `
  },
  {
    title: "ATP — the cell's currency",
    body: `
      <p><strong>ATP</strong> (adenosine triphosphate) is the molecule cells use to move energy around.</p>
      <p>Think of it as a tiny rechargeable battery: <em>charged</em> ATP releases energy when one of its phosphate groups is snapped off (becoming ADP), and respiration recharges it back.</p>
      <p>A single cell burns through and replaces about <strong>10 million ATP molecules every second</strong>. You don't store ATP — you make it on demand.</p>
    `
  },
  {
    title: "Where it happens",
    body: `
      <p>Respiration is a two-location job:</p>
      <ul>
        <li><strong>Cytoplasm</strong> — the first stage (glycolysis) happens here, outside the mitochondria.</li>
        <li><strong>Mitochondria</strong> — the second and third stages run inside the cell's "powerhouses."</li>
      </ul>
      <p>That's why cells that need a lot of energy — muscle cells, neurons, heart cells — are packed with mitochondria.</p>
    `
  },
  {
    title: "Three stages",
    body: `
      <p>Respiration runs in three connected stages:</p>
      <ol>
        <li><strong>Glycolysis</strong> — in the cytoplasm. Glucose is split in two. Small ATP yield.</li>
        <li><strong>Krebs cycle</strong> — in the mitochondrial matrix. Carbons are stripped off as CO₂; lots of NADH and FADH₂ produced.</li>
        <li><strong>Electron transport chain</strong> — along the inner mitochondrial membrane. NADH and FADH₂ are spent to make <em>lots</em> of ATP, using O₂ as the final electron acceptor.</li>
      </ol>
      <p>Let's walk through each one.</p>
    `
  }
];

const RESP_GLYCOLYSIS = [
  {
    title: "Step 1 — Glucose arrives",
    body: `
      <p>A glucose molecule enters the cell and lands in the <strong>cytoplasm</strong> — the jelly-like fluid filling the cell, outside the mitochondria.</p>
      <p>Glycolysis means "splitting sugar," and that's exactly what's about to happen. No oxygen needed for this stage — glycolysis is ancient enough that it predates Earth having much O₂ in its atmosphere.</p>
    `
  },
  {
    title: "Step 2 — Glucose is split in two",
    body: `
      <p>Through a series of about ten enzyme-driven reactions, the 6-carbon glucose molecule is rearranged and chopped in half.</p>
      <p>The result: two 3-carbon molecules called <strong>pyruvate</strong>.</p>
      <p>To get the process going, the cell actually has to <em>spend</em> 2 ATP first — but it earns that back and then some.</p>
    `
  },
  {
    title: "Step 3 — Small ATP payout",
    body: `
      <p>By the end of glycolysis, the cell has produced:</p>
      <ul>
        <li><strong>4 ATP</strong> made (minus 2 spent at the start) → <strong>net 2 ATP</strong></li>
        <li><strong>2 NADH</strong> — electron carriers, like NADPH's cousin</li>
        <li><strong>2 pyruvate</strong> molecules</li>
      </ul>
      <p>Two ATP is a tiny yield. The pyruvate now drifts to a mitochondrion, where the <em>real</em> energy harvest is about to begin.</p>
    `
  }
];

const RESP_KREBS = [
  {
    title: "Step 1 — Pyruvate enters the mitochondrion",
    body: `
      <p>Each pyruvate slips through the mitochondrion's two membranes and into the <strong>matrix</strong> — the fluid center.</p>
      <p>There it's converted into <strong>acetyl-CoA</strong>: one carbon is sheared off as CO₂, and what's left (a 2-carbon acetyl group) is hooked onto a carrier molecule called coenzyme A. One NADH is made in the process.</p>
    `
  },
  {
    title: "Step 2 — Acetyl-CoA joins the cycle",
    body: `
      <p>Acetyl-CoA hands its 2-carbon piece to a 4-carbon molecule called <strong>oxaloacetate</strong>, forming 6-carbon <strong>citrate</strong>.</p>
      <p>That's the start of the <strong>Krebs cycle</strong> (also called the citric acid cycle, since citrate is its first product).</p>
    `
  },
  {
    title: "Step 3 — Carbons strip off as CO₂",
    body: `
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
  },
  {
    title: "Step 4 — The cycle runs twice per glucose",
    body: `
      <p>Each original glucose became <em>two</em> pyruvates back in glycolysis — so the Krebs cycle runs <strong>twice</strong> per glucose molecule.</p>
      <p>Direct ATP yield from Krebs is small (2 ATP per glucose). But the real prize is the pile of <strong>NADH and FADH₂</strong> the cycle is generating. Those are about to be cashed in for a lot more ATP.</p>
    `
  }
];

const RESP_ETC = [
  {
    title: "Step 1 — Electrons enter the chain",
    body: `
      <p>All those NADH and FADH₂ molecules from glycolysis and the Krebs cycle now drop their electrons onto a series of protein complexes embedded in the <strong>inner mitochondrial membrane</strong>.</p>
      <p>This is the <strong>electron transport chain (ETC)</strong>. The folded inner membrane (cristae) gives it lots of surface area to work with.</p>
    `
  },
  {
    title: "Step 2 — Electrons pump protons",
    body: `
      <p>As electrons hop from protein to protein down the chain, they release energy.</p>
      <p>That energy is used to <strong>pump H⁺ ions</strong> from the matrix into the intermembrane space, building up a steep concentration difference — like water piling up behind a dam.</p>
    `
  },
  {
    title: "Step 3 — ATP synthase spins out ATP",
    body: `
      <p>The H⁺ ions desperately want to flow back down their gradient — and there's only one opening: a turbine-shaped enzyme called <strong>ATP synthase</strong>.</p>
      <p>As H⁺ ions rush through, the turbine literally <em>spins</em>, and that mechanical rotation forces ADP + Pi together into ATP.</p>
      <p>This is where the <strong>bulk of cellular ATP</strong> gets made — around 26-28 ATP per glucose.</p>
    `
  },
  {
    title: "Step 4 — Oxygen is the final stop",
    body: `
      <p>At the end of the chain, electrons need somewhere to go — otherwise the chain backs up and shuts down.</p>
      <p>That's where <strong>oxygen</strong> comes in. O₂ accepts the spent electrons and pairs with H⁺ to form <strong>water</strong>.</p>
      <p>This is why you breathe in O₂ — without it, the ETC stalls, ATP production collapses, and your cells die within minutes.</p>
      <p>Total ATP per glucose: roughly <strong>30-32</strong>. Compare to just 2 from glycolysis alone — oxygen is a massive multiplier.</p>
    `
  },
  {
    title: "When there's no oxygen — fermentation",
    body: `
      <p>What if O₂ runs out? The ETC stalls because there's nothing to grab the spent electrons. Without the ETC, NADH piles up — and the cell runs out of NAD⁺ to keep glycolysis going.</p>
      <p>Cells solve this with <strong>fermentation</strong>: a quick way to regenerate NAD⁺ by dumping electrons onto pyruvate or a derivative.</p>
      <ul>
        <li><strong>Lactic acid fermentation</strong> (your muscles during a sprint, bacteria in yogurt): pyruvate + NADH → lactate + NAD⁺.</li>
        <li><strong>Alcoholic fermentation</strong> (yeast in beer and bread): pyruvate → CO₂ + acetaldehyde + NADH → ethanol + NAD⁺.</li>
      </ul>
      <p>Fermentation produces only <strong>2 ATP per glucose</strong> (from glycolysis itself) — but it keeps glycolysis going when oxygen is scarce. That's why your muscles burn during sprinting (lactate buildup) and why yeast makes bread rise (CO₂ from alcoholic fermentation).</p>
    `
  },
  {
    title: "Anaerobic vs aerobic — the trade-off",
    body: `
      <p><strong>Aerobic respiration</strong> (with O₂): 30–32 ATP per glucose. Slow to start, requires mitochondria, but vastly more efficient.</p>
      <p><strong>Anaerobic respiration / fermentation</strong> (without O₂): 2 ATP per glucose. Fast, no mitochondria required, but wastes most of the glucose's energy.</p>
      <p>Many microbes (and your muscles during heavy exercise) switch flexibly between the two. Obligate anaerobes (e.g. <em>Clostridium</em>) only do fermentation; obligate aerobes (e.g. you) can't survive without O₂ for more than a few minutes.</p>
      <p>Evolutionarily, fermentation is much older — early life ran on it before oxygen-producing photosynthesis filled the atmosphere ~2.4 billion years ago.</p>
    `
  }
];
