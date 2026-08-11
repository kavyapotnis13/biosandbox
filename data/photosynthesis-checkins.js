/* Sub-unit check-ins for Photosynthesis. */

const PHOTO_CHECKINS = {
  intro: [
    { type: 'mc', q: "What are the RAW ingredients of photosynthesis?",
      choices: ['O₂ + glucose', 'CO₂ + H₂O + light', 'N₂ + light', 'CO₂ + ATP'],
      correct: 1,
      explanation: "6 CO₂ + 6 H₂O + light → glucose + 6 O₂. Plants pull CO₂ from air, water from roots, energy from the sun." },
    { type: 'tf', q: "The oxygen we breathe comes largely from photosynthesis.",
      correct: true,
      explanation: "Yep — O₂ is a \"waste\" product of splitting water in the light reactions. Waste for the plant, life for us." },
    { type: 'match', q: "Match each plant structure to its photosynthesis role.",
      pairs: [
        { left: 'Chloroplast', right: 'The organelle where it all happens' },
        { left: 'Chlorophyll', right: 'Captures light energy (looks green)' },
        { left: 'Stomata',     right: 'Let CO₂ in and O₂ out' },
        { left: 'Roots',       right: 'Absorb water for the reaction' }
      ],
      explanation: "Photosynthesis is a whole-plant operation — leaves capture light, roots supply water, stomata handle gas exchange." },
    { type: 'mc', q: "Photosynthesis takes place in which organelle?",
      choices: ['Mitochondrion', 'Nucleus', 'Chloroplast', 'Ribosome'],
      correct: 2,
      explanation: "Chloroplasts (green, with thylakoid stacks) are exclusive to plants and some protists. Their chlorophyll captures sunlight." }
  ],
  light: [
    { type: 'mc', q: "The light reactions produce which two energy carriers?",
      choices: ['ATP + NADPH', 'ATP + FADH₂', 'Glucose + O₂', 'CO₂ + water'],
      correct: 0,
      explanation: "Light reactions capture solar energy in ATP and NADPH. These carry energy to the Calvin cycle, which builds sugar." },
    { type: 'tf', q: "The Calvin cycle can run without the light reactions.",
      correct: false,
      explanation: "Calvin cycle doesn't use light DIRECTLY, but it needs ATP + NADPH from the light reactions to run. So no light, no Calvin cycle." },
    { type: 'match', q: "Match each light-reaction step to what happens.",
      pairs: [
        { left: 'Photosystem II',           right: 'Water is split, releasing O₂' },
        { left: 'Electron transport chain', right: 'Electrons flow, pumping H⁺' },
        { left: 'ATP synthase',             right: 'H⁺ flows through, making ATP' },
        { left: 'Photosystem I',            right: 'Excited electrons make NADPH' }
      ],
      explanation: "It's an electron relay powered by light. Water sacrificed → electrons excited → H⁺ pumped → ATP + NADPH built." },
    { type: 'mc', q: "Where in the chloroplast do the light reactions happen?",
      choices: ['Stroma', 'Thylakoid membrane', 'Outer membrane', 'Nucleus'],
      correct: 1,
      explanation: "Light reactions run in the thylakoid membrane (the green stacks). The Calvin cycle runs in the stroma (the fluid around them)." }
  ]
};
