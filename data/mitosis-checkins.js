/* Sub-unit check-in for Mitosis. */

const MITOSIS_CHECKINS = {
  intro: [
    { type: 'mc', q: "Mitosis produces:",
      choices: ['Four unique daughter cells', 'Two identical daughter cells', 'One giant cell', 'No cells at all'],
      correct: 1,
      explanation: "One parent cell divides into two genetically identical daughter cells. Meiosis (a different process) makes 4 unique cells." },
    { type: 'tf', q: "Every cell in your body regularly divides using mitosis.",
      correct: false,
      explanation: "Most cells do — but NEURONS and cardiac muscle cells barely divide after development. And GAMETES (sperm/egg) form via meiosis, not mitosis." },
    { type: 'match', q: "Match each purpose of cell division to an example.",
      pairs: [
        { left: 'Growth',                      right: 'Embryo becoming a baby' },
        { left: 'Repair',                      right: 'Skin healing a cut' },
        { left: 'Replacement',                 right: 'Gut lining renews weekly' },
        { left: 'Reproduction (unicellular)',  right: 'Yeast budding' }
      ],
      explanation: "Mitosis powers growth, repair, and asexual reproduction. Same core process, many jobs." },
    { type: 'mc', q: "Which cell cycle phase is LONGEST for most cells?",
      choices: ['Mitosis (M)', 'G1 (growth)', 'S (DNA synthesis)', 'G2'],
      correct: 1,
      explanation: "G1 is longest. Actual mitosis is a small fraction of the cycle — most of a cell's life is spent growing and doing its everyday job." }
  ]
};
