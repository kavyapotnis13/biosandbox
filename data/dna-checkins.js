/* Sub-unit check-in for DNA & Replication. */

const DNA_CHECKINS = {
  intro: [
    { type: 'mc', q: "DNA stands for:",
      choices: ['Dinucleic acid', 'Deoxyribonucleic acid', 'Directed nucleic actor', 'Dual nucleus assembly'],
      correct: 1,
      explanation: "DNA = deoxyribonucleic acid. \"Deoxy\" because its sugar (deoxyribose) is missing one oxygen compared to RNA's ribose." },
    { type: 'tf', q: "DNA is a single-stranded molecule.",
      correct: false,
      explanation: "DNA is DOUBLE-stranded — two chains twisted into a helix. RNA is typically single-stranded." },
    { type: 'match', q: "Match each DNA base to its pair.",
      pairs: [
        { left: 'Adenine',   right: 'Thymine' },
        { left: 'Thymine',   right: 'Adenine' },
        { left: 'Guanine',   right: 'Cytosine' },
        { left: 'Cytosine',  right: 'Guanine' }
      ],
      explanation: "A pairs with T (2 H-bonds), G with C (3 H-bonds). The pairing rule is what allows DNA to be copied faithfully." },
    { type: 'mc', q: "Why is A-T pairing WEAKER than G-C pairing?",
      choices: ['A is smaller', 'A-T has 2 hydrogen bonds; G-C has 3', 'G and C are on different strands', 'G-C uses covalent bonds'],
      correct: 1,
      explanation: "A-T shares 2 H-bonds, G-C shares 3. GC-rich regions of DNA are harder to unwind — that matters during replication and transcription." }
  ]
};
