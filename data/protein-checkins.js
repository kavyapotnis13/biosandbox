/* Sub-unit check-ins for Protein Synthesis. */

const PROTEIN_CHECKINS = {
  intro: [
    { type: 'mc', q: "The central dogma of molecular biology is:",
      choices: ['Protein → RNA → DNA', 'DNA → RNA → Protein', 'RNA → DNA → Protein', 'DNA → Protein → RNA'],
      correct: 1,
      explanation: "Information flows DNA → RNA → Protein. That's the core operating logic of every cell." },
    { type: 'tf', q: "Every cell in your body has different DNA.",
      correct: false,
      explanation: "Almost every cell has the SAME DNA — it's which GENES are expressed that differs. That's why muscle cells look different from nerve cells despite identical genomes." },
    { type: 'match', q: "Match each molecule to its role.",
      pairs: [
        { left: 'DNA',       right: 'Stores the genetic blueprint' },
        { left: 'mRNA',      right: 'Carries the message from DNA to ribosome' },
        { left: 'tRNA',      right: 'Brings the right amino acid to the ribosome' },
        { left: 'Ribosome',  right: 'The workshop where the protein is built' }
      ],
      explanation: "Three RNAs + a ribosome = the translation system. Each RNA has a specific job." },
    { type: 'mc', q: "One difference between DNA and RNA is:",
      choices: ['DNA has thymine; RNA has uracil', 'RNA is double-stranded', 'DNA has ribose', 'They are chemically identical'],
      correct: 0,
      explanation: "RNA uses uracil where DNA uses thymine. RNA also uses ribose (instead of deoxyribose) and is single-stranded." }
  ],
  transcription: [
    { type: 'mc', q: "Where does transcription happen in EUKARYOTIC cells?",
      choices: ['Ribosome', 'Nucleus', 'Cytoplasm', 'Mitochondria only'],
      correct: 1,
      explanation: "In eukaryotes, transcription happens in the nucleus (where the DNA is). Translation happens later, at ribosomes in the cytoplasm." },
    { type: 'tf', q: "RNA polymerase reads BOTH DNA strands at once.",
      correct: false,
      explanation: "RNA polymerase reads only ONE strand (the template strand) to build an mRNA copy of the other strand's sequence (with U replacing T)." },
    { type: 'match', q: "Match each transcription step to what happens.",
      pairs: [
        { left: 'Initiation',      right: 'RNA polymerase binds the promoter' },
        { left: 'Elongation',      right: 'RNA is built base-by-base along template' },
        { left: 'Termination',     right: 'Polymerase releases at the stop signal' },
        { left: 'RNA processing',  right: 'Introns removed, cap and tail added' }
      ],
      explanation: "Transcription has 3 main stages. Eukaryotes add a 4th (RNA processing) before the mRNA leaves the nucleus." },
    { type: 'mc', q: "In eukaryotes, what gets REMOVED from mRNA before it leaves the nucleus?",
      choices: ['Exons', 'Introns', 'Ribosomes', 'Every uracil'],
      correct: 1,
      explanation: "Introns (non-coding sections) are cut out; exons (coding parts) are spliced together. Only mature mRNA leaves the nucleus." }
  ],
  translation: [
    { type: 'mc', q: "How many mRNA bases specify ONE amino acid?",
      choices: ['1', '2', '3', '4'],
      correct: 2,
      explanation: "Three mRNA bases = one codon = one amino acid. So mRNA is read in triplets." },
    { type: 'tf', q: "There is exactly ONE codon per amino acid.",
      correct: false,
      explanation: "The genetic code is REDUNDANT — most amino acids have multiple codons. Leucine has 6! Only Met and Trp have just one." },
    { type: 'match', q: "Match each translation component to its role.",
      pairs: [
        { left: 'mRNA',        right: 'Carries the codon sequence' },
        { left: 'tRNA',        right: 'Matches codon with amino acid (anticodon)' },
        { left: 'Ribosome',    right: 'Holds mRNA + tRNAs together' },
        { left: 'Amino acid',  right: 'The building block being added' }
      ],
      explanation: "Translation is a physical assembly line — the ribosome moves along the mRNA, matching codons with tRNAs and stringing amino acids together." },
    { type: 'mc', q: "The START codon AUG codes for which amino acid?",
      choices: ['Alanine', 'Methionine', 'Serine', 'No amino acid'],
      correct: 1,
      explanation: "AUG = methionine. Every protein starts with methionine (though it's sometimes cleaved off later). AUG is BOTH the start signal AND the methionine codon." }
  ]
};
