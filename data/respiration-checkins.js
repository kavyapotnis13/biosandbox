/* Sub-unit check-ins for Cellular Respiration. */

const RESP_CHECKINS = {
  intro: [
    { type: 'mc', q: "The overall equation for cellular respiration is:",
      choices: ['glucose + O₂ → CO₂ + H₂O + ATP', 'CO₂ + H₂O → glucose + O₂', 'ATP → ADP + P', 'glucose → glycogen'],
      correct: 0,
      explanation: "Respiration is the reverse of photosynthesis — glucose plus oxygen becomes CO₂, water, and lots of ATP energy." },
    { type: 'tf', q: "Cellular respiration and breathing are the same thing.",
      correct: false,
      explanation: "Breathing is inhaling/exhaling air. Cellular respiration is the chemistry inside cells that breaks down glucose to make ATP." },
    { type: 'match', q: "Match each stage of respiration to its main output.",
      pairs: [
        { left: 'Glycolysis',                right: '2 pyruvate + small ATP' },
        { left: 'Krebs cycle',               right: 'CO₂ + electron carriers (NADH, FADH₂)' },
        { left: 'Electron transport chain',  right: 'Lots of ATP + water' },
        { left: 'Fermentation',              right: 'Less ATP; no oxygen needed' }
      ],
      explanation: "Aerobic respiration is a three-stage assembly line: glycolysis → Krebs → ETC. Fermentation is the backup for when O₂ isn't around." },
    { type: 'mc', q: "About how much ATP does AEROBIC respiration yield per glucose?",
      choices: ['2', '~4', '~30–38', '~500'],
      correct: 2,
      explanation: "Aerobic respiration nets ~30–38 ATP per glucose. Anaerobic (fermentation alone) yields only 2 — much less efficient." }
  ],
  gly: [
    { type: 'mc', q: "Where does glycolysis take place?",
      choices: ['Nucleus', 'Mitochondrial matrix', 'Cytoplasm', 'Ribosome'],
      correct: 2,
      explanation: "Glycolysis happens in the cytoplasm — no oxygen or mitochondria required. That's one reason all cells can do it." },
    { type: 'tf', q: "Glycolysis requires oxygen.",
      correct: false,
      explanation: "Glycolysis is anaerobic — it works with or without O₂. That's why it evolved early and is universal to almost all life." },
    { type: 'match', q: "Match each glycolysis stat to its number.",
      pairs: [
        { left: 'Starting molecule',   right: '1 glucose (6 carbons)' },
        { left: 'Ending molecules',    right: '2 pyruvate (3 carbons each)' },
        { left: 'Net ATP produced',    right: '2 ATP' },
        { left: 'NADH produced',       right: '2 NADH' }
      ],
      explanation: "One 6-carbon glucose is split into two 3-carbon pyruvates. Small ATP payoff, but the electron carriers matter more downstream." },
    { type: 'mc', q: "If O₂ ISN'T available after glycolysis, what happens to pyruvate?",
      choices: ['Stored forever', 'Fermentation (makes lactic acid or ethanol)', 'Enters Krebs anyway', 'Turns into DNA'],
      correct: 1,
      explanation: "Without O₂, cells ferment pyruvate to regenerate NAD⁺ and keep glycolysis running. In muscle → lactic acid; in yeast → ethanol." }
  ],
  krebs: [
    { type: 'mc', q: "The Krebs cycle takes place in the:",
      choices: ['Nucleus', 'Cytoplasm', 'Mitochondrial matrix', 'Thylakoid'],
      correct: 2,
      explanation: "Krebs runs in the mitochondrial matrix — the innermost space of the mitochondrion." },
    { type: 'tf', q: "The Krebs cycle produces MOST of the cell's ATP directly.",
      correct: false,
      explanation: "Krebs makes a little ATP directly, but its main job is producing NADH and FADH₂. The ETC then uses those to make LOTS more ATP." },
    { type: 'match', q: "Match each Krebs component to its role.",
      pairs: [
        { left: 'Acetyl-CoA (2C)',   right: 'Enters the cycle from pyruvate' },
        { left: 'CO₂',                right: 'Released as waste (you exhale it)' },
        { left: 'NADH / FADH₂',       right: 'Carry electrons to the ETC' },
        { left: 'ATP',                right: 'Small direct energy yield' }
      ],
      explanation: "Krebs strips carbons off (as CO₂) and loads electron carriers with high-energy electrons for the next stage." },
    { type: 'mc', q: "One glucose produces how many CO₂ molecules total in aerobic respiration?",
      choices: ['2', '3', '6', '12'],
      correct: 2,
      explanation: "Glucose is C₆H₁₂O₆ — 6 carbons. Every carbon eventually leaves as CO₂. Total: 6 CO₂ per glucose molecule." }
  ],
  etc: [
    { type: 'mc', q: "What do NADH and FADH₂ do in the electron transport chain?",
      choices: ['Store DNA', 'Donate electrons and H⁺ to the chain', 'Make CO₂', 'Bind glucose'],
      correct: 1,
      explanation: "NADH and FADH₂ drop off electrons at the ETC. Those electrons flow down the chain, pumping H⁺ across the inner mitochondrial membrane." },
    { type: 'tf', q: "The final electron acceptor of the ETC is water.",
      correct: false,
      explanation: "The final acceptor is OXYGEN, which combines with electrons and H⁺ to FORM water. That's why we need to breathe!" },
    { type: 'match', q: "Match each ETC component to its role.",
      pairs: [
        { left: 'Electron carriers', right: 'Pass electrons down the chain' },
        { left: 'H⁺ gradient',        right: 'Stored energy source for ATP synthase' },
        { left: 'ATP synthase',      right: 'Uses H⁺ flow to make ATP' },
        { left: 'Oxygen',             right: 'Final electron acceptor, becomes water' }
      ],
      explanation: "The ETC is basically a chemical waterfall driving a turbine (ATP synthase). Cutting off O₂ jams the whole thing." },
    { type: 'mc', q: "Without oxygen, the ETC would:",
      choices: ['Run normally', 'Back up because nothing accepts the final electrons', 'Reverse and make glucose', 'Speed up'],
      correct: 1,
      explanation: "Without O₂, electrons pile up in the chain, ATP production stops, and cells fall back on fermentation for tiny amounts of ATP." }
  ]
};
