/* Sub-unit check-ins for Gene Regulation. */

const REG_CHECKINS = {
  mutation: [
    { type: 'mc', q: "A SILENT mutation:",
      choices: ['Changes the amino acid produced', 'Swaps a base but codes for the SAME amino acid', 'Kills the cell', 'Only happens in silent genes'],
      correct: 1,
      explanation: "The genetic code is redundant — many codons code for the same amino acid. So some single-base swaps don't change the protein at all." },
    { type: 'tf', q: "Frameshift mutations only affect ONE amino acid.",
      correct: false,
      explanation: "Frameshifts (insertions or deletions of a base) shift the reading frame. Every codon downstream changes. Usually catastrophic for the protein." },
    { type: 'match', q: "Match each mutation type to its effect.",
      pairs: [
        { left: 'Silent',       right: 'No change to amino acid' },
        { left: 'Missense',     right: 'One amino acid changes' },
        { left: 'Nonsense',     right: 'Creates a premature STOP codon' },
        { left: 'Frameshift',   right: 'Reading frame shifts, protein garbled' }
      ],
      explanation: "The four main outcomes of a point mutation, in rough order of severity." },
    { type: 'mc', q: "Which mutation is USUALLY most damaging?",
      choices: ['Silent', 'Frameshift near the START of a gene', 'One extra codon at the very end', 'Substitution of the last base'],
      correct: 1,
      explanation: "A frameshift near the start scrambles the entire protein. A silent mutation does nothing. Changes near the end are less impactful than near the start." }
  ],
  prokaryote: [
    { type: 'mc', q: "The lac operon turns ON when:",
      choices: ['Glucose is present', 'Lactose is present', 'Water is scarce', 'Light shines'],
      correct: 1,
      explanation: "When lactose is around, the repressor releases the operator, RNA polymerase transcribes, and enzymes to digest lactose are made." },
    { type: 'tf', q: "An operon is a group of genes controlled TOGETHER in prokaryotes.",
      correct: true,
      explanation: "Operons let bacteria turn on/off related genes with a single switch — very efficient for coordinating responses like digesting a new food source." },
    { type: 'match', q: "Match each lac operon part to its role.",
      pairs: [
        { left: 'Promoter',         right: 'Where RNA polymerase binds' },
        { left: 'Operator',         right: 'Where repressor binds (blocks transcription)' },
        { left: 'Repressor',        right: 'Protein that turns the operon OFF' },
        { left: 'Structural genes', right: 'The actual lactose-digesting enzymes' }
      ],
      explanation: "The classic operon toolkit: promoter (start), operator (switch), repressor (off signal), structural genes (the actual proteins)." },
    { type: 'mc', q: "What happens to the repressor when LACTOSE is present?",
      choices: ['Binds tighter to the operator', 'Falls off the operator (freeing transcription)', 'Multiplies', 'Nothing'],
      correct: 1,
      explanation: "Lactose (well, allolactose) binds the repressor and changes its shape, so it can no longer bind the operator. Transcription proceeds." }
  ],
  eukaryote: [
    { type: 'mc', q: "Which of these is NOT used to regulate genes in EUKARYOTES?",
      choices: ['Chromatin remodeling', 'RNA splicing choices', 'Transcription factors', 'Operons (like bacteria use)'],
      correct: 3,
      explanation: "Eukaryotes don't use operons — that's a prokaryote strategy. Eukaryotic regulation happens at DNA packaging, transcription, RNA processing, and translation stages." },
    { type: 'tf', q: "Epigenetics can affect gene expression WITHOUT changing DNA sequence.",
      correct: true,
      explanation: "Epigenetic marks (like methylation and histone modifications) change how tightly DNA is packed, controlling access — without altering the underlying code." },
    { type: 'match', q: "Match each regulation level to what happens.",
      pairs: [
        { left: 'Chromatin',              right: 'DNA packed tighter (off) or looser (on)' },
        { left: 'Transcription factors',  right: 'Proteins bind DNA to turn genes on/off' },
        { left: 'RNA processing',         right: 'Splicing, cap, tail, alternative isoforms' },
        { left: 'Post-translational',     right: 'Protein modifications after being made' }
      ],
      explanation: "Eukaryotes have layers of control — every stage of gene expression can be tuned. That's why they can build such complex bodies." },
    { type: 'mc', q: "ALTERNATIVE SPLICING means:",
      choices: ['DNA is spliced randomly', 'One gene can produce multiple DIFFERENT proteins', 'Splicing is optional', 'Only prokaryotes splice'],
      correct: 1,
      explanation: "By splicing exons in different combinations, one gene can make several different proteins. Part of why humans have only ~20,000 genes but way more proteins." }
  ],
  biotech: [
    { type: 'mc', q: "PCR is used to:",
      choices: ['Cut DNA at specific sequences', 'Copy a small piece of DNA millions of times', 'Sequence DNA', 'Read RNA'],
      correct: 1,
      explanation: "PCR (polymerase chain reaction) amplifies a tiny amount of DNA into a large, workable amount — essential for lab research, forensics, and testing." },
    { type: 'tf', q: "CRISPR came from BACTERIAL immune systems.",
      correct: true,
      explanation: "CRISPR-Cas9 evolved as bacteria's defense against viruses. Scientists repurposed it for precise gene editing — a huge deal for medicine and research." },
    { type: 'match', q: "Match each biotech tool to what it does.",
      pairs: [
        { left: 'PCR',                right: 'Amplifies specific DNA sequences' },
        { left: 'Gel electrophoresis', right: 'Sorts DNA fragments by size' },
        { left: 'Restriction enzymes', right: 'Cut DNA at specific sequences' },
        { left: 'CRISPR-Cas9',        right: 'Edits DNA at a specific target site' }
      ],
      explanation: "The core molecular biology toolkit — copy, cut, sort, edit. Everything else is built on these." },
    { type: 'mc', q: "How does CRISPR find the RIGHT spot to edit?",
      choices: ['Random search', 'A guide RNA matches the target DNA sequence', 'It reads protein sequences', 'By magnetism'],
      correct: 1,
      explanation: "A guide RNA leads Cas9 to the exact DNA sequence to cut. Change the guide, and CRISPR targets a different spot — that's what makes it so flexible." }
  ]
};
