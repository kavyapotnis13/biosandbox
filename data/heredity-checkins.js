/* Sub-unit check-ins for Heredity. */

const HEREDITY_CHECKINS = {
  intro: [
    { type: 'mc', q: "Different versions of the same gene are called:",
      choices: ['Chromosomes', 'Alleles', 'Ribosomes', 'Codons'],
      correct: 1,
      explanation: "Alleles are variant forms of a gene. For example, the eye-color gene has \"brown\" and \"blue\" alleles." },
    { type: 'tf', q: "You inherit two copies of most genes — one from each parent.",
      correct: true,
      explanation: "Humans (and most animals + plants) are diploid — one chromosome set from each parent, so each gene has two alleles." },
    { type: 'match', q: "Match each heredity term to its meaning.",
      pairs: [
        { left: 'Genotype',      right: 'The actual alleles (e.g. Bb)' },
        { left: 'Phenotype',     right: 'The observable trait (e.g. brown eyes)' },
        { left: 'Homozygous',    right: 'Two identical alleles (BB or bb)' },
        { left: 'Heterozygous',  right: 'Two different alleles (Bb)' }
      ],
      explanation: "Genotype = what you have; phenotype = what you look like. Homo/heterozygous tells you whether the two alleles match." },
    { type: 'mc', q: "A DOMINANT allele:",
      choices: ['Is always the most common', 'Is expressed even when only one copy is present', 'Requires both parents to have it', 'Skips generations'],
      correct: 1,
      explanation: "One copy of a dominant allele is enough to show the trait. A recessive allele needs TWO copies (homozygous recessive) to be expressed." }
  ],
  punnett: [
    { type: 'mc', q: "Cross Bb × Bb. What fraction of offspring will be HOMOZYGOUS RECESSIVE (bb)?",
      choices: ['0', '1/4', '1/2', '3/4'],
      correct: 1,
      explanation: "Bb × Bb → 1 BB : 2 Bb : 1 bb. So 1/4 are bb — the classic 3:1 phenotype ratio with 1/4 recessive." },
    { type: 'tf', q: "A Punnett square shows the PROBABILITY of each offspring genotype.",
      correct: true,
      explanation: "Each cell of the square = one possible outcome. The proportion of cells showing a genotype = its probability." },
    { type: 'match', q: "Match each Punnett cross to its phenotype ratio.",
      pairs: [
        { left: 'Bb × Bb',   right: '3 dominant : 1 recessive' },
        { left: 'Bb × bb',   right: '1 dominant : 1 recessive' },
        { left: 'BB × Bb',   right: 'All dominant phenotype' },
        { left: 'bb × bb',   right: 'All recessive phenotype' }
      ],
      explanation: "Once you can predict these four crosses, you can predict any single-gene inheritance pattern." },
    { type: 'mc', q: "Cross Bb × bb. What fraction of offspring show the RECESSIVE trait?",
      choices: ['None', '1/4', '1/2', 'All'],
      correct: 2,
      explanation: "Bb × bb → 1/2 Bb (dominant) : 1/2 bb (recessive). This is a TEST CROSS — used to figure out if an unknown-genotype parent is homozygous or heterozygous." }
  ]
};
