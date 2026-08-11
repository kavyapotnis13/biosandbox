/* Sub-unit check-ins for Enzymes. */

const ENZYME_CHECKINS = {
  intro: [
    { type: 'mc', q: "An enzyme speeds up a reaction by:",
      choices: ['Adding energy to reactants', 'Lowering activation energy', 'Being consumed', 'Heating the cell'],
      correct: 1,
      explanation: "Enzymes lower Eₐ (activation energy) — the \"hill\" reactants have to climb. They aren't used up, so one enzyme can catalyze thousands of reactions per second." },
    { type: 'tf', q: "Enzymes are consumed by the reactions they catalyze.",
      correct: false,
      explanation: "Catalysts speed up reactions WITHOUT being consumed. Same enzyme, over and over." },
    { type: 'match', q: "Match each term to its definition.",
      pairs: [
        { left: 'Enzyme',            right: 'Biological catalyst (usually a protein)' },
        { left: 'Substrate',         right: 'Molecule the enzyme acts on' },
        { left: 'Product',           right: 'What the reaction produces' },
        { left: 'Activation energy', right: 'Energy needed to start the reaction' }
      ],
      explanation: "The core vocabulary. Enzyme + substrate → enzyme-substrate complex → enzyme + product." },
    { type: 'mc', q: "Without enzymes, most biological reactions would happen...",
      choices: ['At the same speed', 'Faster', 'Way too slowly for life', 'Not at all, ever'],
      correct: 2,
      explanation: "At body temperature, most reactions are too slow. Enzymes speed them up millions of times — enough to sustain life." }
  ],
  active: [
    { type: 'mc', q: "Where on the enzyme does the substrate bind?",
      choices: ['Peptide bond', 'Active site', 'Allosteric site', 'Ribosome'],
      correct: 1,
      explanation: "The active site is a specifically shaped pocket that fits the substrate. When bound, both molecules slightly adjust shape (induced fit)." },
    { type: 'tf', q: "One enzyme typically catalyzes MANY different reactions with many different substrates.",
      correct: false,
      explanation: "Enzymes are highly SPECIFIC — usually one enzyme, one reaction, one substrate (or a small family)." },
    { type: 'match', q: "Match each concept to what it means.",
      pairs: [
        { left: 'Active site',            right: 'Where substrate binds' },
        { left: 'Induced fit',            right: 'Enzyme reshapes slightly on binding' },
        { left: 'Enzyme-substrate complex', right: 'The bound state' },
        { left: 'Substrate specificity',  right: 'One enzyme, one job' }
      ],
      explanation: "The active site's shape is the whole game — it's what determines which substrate an enzyme accepts." },
    { type: 'mc', q: "Why did biologists replace the \"lock and key\" model with \"induced fit\"?",
      choices: ['Enzymes don\'t bind substrates', 'The active site actually reshapes slightly to fit the substrate', 'Substrates change into enzymes', 'It was more poetic'],
      correct: 1,
      explanation: "The active site isn't rigid — it molds around the substrate on contact, giving a tighter, more productive fit." }
  ],
  factors: [
    { type: 'mc', q: "What happens as temperature rises PAST the enzyme's optimum?",
      choices: ['Activity doubles forever', 'Activity drops as the enzyme denatures', 'Enzyme becomes a different enzyme', 'Nothing changes'],
      correct: 1,
      explanation: "Past the optimum, heat disrupts the H-bonds holding the enzyme's shape. Once denatured, the active site is destroyed and activity crashes." },
    { type: 'tf', q: "Enzyme activity is unaffected by pH.",
      correct: false,
      explanation: "Every enzyme has an optimal pH range. Pepsin (stomach) works at pH ~2; amylase (mouth) at ~7. Extreme pH denatures the enzyme." },
    { type: 'match', q: "Match each enzyme to its optimal pH.",
      pairs: [
        { left: 'Pepsin (stomach)',        right: 'pH ~2 — very acidic' },
        { left: 'Amylase (saliva)',        right: 'pH ~7 — neutral' },
        { left: 'Trypsin (small intestine)', right: 'pH ~8 — slightly basic' },
        { left: 'Arginase (liver)',        right: 'pH ~10 — basic' }
      ],
      explanation: "Enzymes are tuned to the pH of their environment. That's why pepsin only works in acidic stomach fluid." },
    { type: 'mc', q: "A denatured enzyme has lost its:",
      choices: ['DNA', 'Substrate', 'Three-dimensional shape', 'Cell wall'],
      correct: 2,
      explanation: "Denaturation destroys the enzyme's folded 3D structure. Since function depends on the shape of the active site, the enzyme stops working." }
  ],
  pathway: [
    { type: 'mc', q: "In COMPETITIVE inhibition, the inhibitor:",
      choices: ['Binds a different site', 'Binds the active site, blocking the substrate', 'Speeds up the reaction', 'Destroys the enzyme'],
      correct: 1,
      explanation: "A competitive inhibitor resembles the substrate and plugs the active site. Adding more substrate can outcompete it." },
    { type: 'tf', q: "Non-competitive inhibitors bind the active site directly.",
      correct: false,
      explanation: "Non-competitive inhibitors bind somewhere else (allosteric site), reshaping the enzyme so the active site stops working. Adding more substrate doesn't help." },
    { type: 'match', q: "Match each type of regulation to its mechanism.",
      pairs: [
        { left: 'Competitive inhibition',     right: 'Inhibitor blocks active site' },
        { left: 'Non-competitive inhibition', right: 'Inhibitor binds elsewhere, deforms enzyme' },
        { left: 'Allosteric activation',      right: 'Activator binds elsewhere, improves active site' },
        { left: 'Feedback inhibition',        right: 'Final product inhibits an earlier enzyme' }
      ],
      explanation: "Cells fine-tune enzymes through many different regulatory mechanisms — turning them on, off, up, or down as needed." },
    { type: 'mc', q: "In feedback inhibition, the end product of a pathway:",
      choices: ['Speeds up the first enzyme', 'Inhibits an earlier enzyme in the pathway', 'Destroys the substrate', 'Turns into a new product'],
      correct: 1,
      explanation: "Like a thermostat — once enough product accumulates, it turns off an earlier step to prevent overproduction." }
  ]
};
