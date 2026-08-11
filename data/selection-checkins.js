/* Sub-unit check-ins for Natural Selection. */

const SELECTION_CHECKINS = {
  intro: [
    { type: 'mc', q: "Darwin's four ingredients for natural selection are variation, inheritance, differential survival, and:",
      choices: ['Photosynthesis', 'Time (many generations)', 'Predators', 'Migration'],
      correct: 1,
      explanation: "Evolution requires TIME to accumulate small changes into large ones. Individuals don't evolve — populations do, over many generations." },
    { type: 'tf', q: "Individuals EVOLVE during their lifetimes.",
      correct: false,
      explanation: "POPULATIONS evolve — individuals don't. You're born with the genes you'll die with. Evolution is a change in allele frequencies across generations." },
    { type: 'match', q: "Match each evolutionary term to its definition.",
      pairs: [
        { left: 'Fitness',      right: 'Number of offspring surviving to reproduce' },
        { left: 'Adaptation',   right: 'Trait shaped by natural selection' },
        { left: 'Variation',    right: 'Differences between individuals' },
        { left: 'Species',      right: 'Group that can interbreed for fertile offspring' }
      ],
      explanation: "The core vocabulary of evolution — fitness is the outcome, adaptations are the result, variation is the fuel, species are the units." },
    { type: 'mc', q: "Which of these is EVIDENCE for evolution?",
      choices: ['Only fossils', 'Only DNA similarities', 'Only observed adaptations', 'All of these + more (fossils, DNA, morphology, biogeography...)'],
      correct: 3,
      explanation: "Multiple independent lines of evidence converge on evolution. That's why the theory is so well-supported." }
  ],
  mechanisms: [
    { type: 'mc', q: "Which of these is NOT a mechanism of evolution?",
      choices: ['Natural selection', 'Genetic drift', 'Mutation', 'Photosynthesis'],
      correct: 3,
      explanation: "The 4 mechanisms are: natural selection, mutation, gene flow, and genetic drift. Photosynthesis is how plants make food — not evolution." },
    { type: 'tf', q: "Genetic drift is STRONGEST in LARGE populations.",
      correct: false,
      explanation: "Drift is strongest in SMALL populations. Random events have bigger relative effects when there are fewer individuals to average out the noise." },
    { type: 'match', q: "Match each evolution mechanism to what it does.",
      pairs: [
        { left: 'Natural selection', right: 'Helpful traits become more common' },
        { left: 'Mutation',          right: 'Creates new alleles (raw material)' },
        { left: 'Gene flow',         right: 'Alleles move between populations' },
        { left: 'Genetic drift',     right: 'Random change in allele frequency' }
      ],
      explanation: "Four separate forces can change allele frequencies. Only natural selection is non-random." },
    { type: 'mc', q: "A small group settles a new island. Their allele frequencies differ from the mainland just by CHANCE. This is:",
      choices: ['Natural selection', 'Founder effect (a type of drift)', 'Gene flow', 'Speciation'],
      correct: 1,
      explanation: "Founder effect is a type of genetic drift where a small subgroup starts a new population. Their random sample of alleles becomes the new baseline." }
  ],
  hw: [
    { type: 'mc', q: "Hardy-Weinberg equilibrium describes a population that is:",
      choices: ['Rapidly evolving', 'NOT evolving (a baseline for comparison)', 'Extinct', 'Migrating'],
      correct: 1,
      explanation: "H-W is a null model — it predicts allele frequencies when NO evolution is happening. Real populations deviating from H-W are evolving." },
    { type: 'tf', q: "In H-W equilibrium, mutations are still happening frequently.",
      correct: false,
      explanation: "One of the 5 conditions for H-W is NO mutation. Also: no selection, no gene flow, random mating, and very large population." },
    { type: 'match', q: "Match each H-W condition to what it means.",
      pairs: [
        { left: 'No selection',   right: 'No allele has a fitness advantage' },
        { left: 'No mutation',    right: 'No new alleles arising' },
        { left: 'No gene flow',   right: 'No migration in or out' },
        { left: 'Random mating',  right: 'Mates chosen randomly, not by phenotype' }
      ],
      explanation: "The 5 conditions of H-W are so strict that no real population meets them all. That's the point — H-W is a benchmark for measuring evolution." },
    { type: 'mc', q: "If allele B has frequency p = 0.6, what's frequency q of allele b?",
      choices: ['0.4', '0.6', '0.36', '0.5'],
      correct: 0,
      explanation: "p + q = 1 (they must add up to 100%). So q = 1 − 0.6 = 0.4." }
  ]
};
