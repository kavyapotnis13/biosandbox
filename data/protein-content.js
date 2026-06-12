/* =========================================================
   protein-content.js — flashcards + codon table for the
   Protein Synthesis module.

   Three card decks:
     PROTEIN_INTRO_CARDS       — what protein synthesis is, central dogma
     PROTEIN_TRANSCRIPTION     — 5 steps for DNA → mRNA in the nucleus
     PROTEIN_TRANSLATION       — 5 steps for mRNA → polypeptide at ribosome

   Plus CODON_TABLE — the standard genetic code, used by the
   codon-decoder mini-game.
   ========================================================= */

const PROTEIN_INTRO_CARDS = [
  {
    title: "What is a protein?",
    body: `
      <p>Proteins are long chains of smaller building blocks called <strong>amino acids</strong>.</p>
      <p>They do almost every job in the cell — building muscle, carrying oxygen, fighting infection, digesting food, speeding up reactions.</p>
      <p>Your DNA is essentially an instruction manual for making the right proteins, at the right time, in the right place.</p>
    `
  },
  {
    title: "The central dogma",
    body: `
      <p>Biology's headline rule for how information flows in a cell:</p>
      <p style="text-align:center; font-family:'JetBrains Mono', monospace; font-size:1.05rem; padding:0.5rem 0;">
        <strong>DNA → RNA → Protein</strong>
      </p>
      <p>DNA gets <em>transcribed</em> into messenger RNA (mRNA), and then mRNA gets <em>translated</em> into a protein.</p>
    `
  },
  {
    title: "Three letters at a time",
    body: `
      <p>The genetic code is read in groups of three bases. Each triplet is called a <strong>codon</strong>.</p>
      <p>Every codon (e.g. <code>AUG</code>, <code>GCU</code>, <code>UAA</code>) maps to a specific amino acid — or to a "start" or "stop" signal.</p>
      <p>With 4 bases and 3 positions, there are 4³ = <strong>64 possible codons</strong> coding for just 20 amino acids, so most amino acids have more than one codon.</p>
    `
  },
  {
    title: "RNA's twist on DNA",
    body: `
      <p>RNA looks like DNA, but with three differences:</p>
      <ul>
        <li>It uses the sugar <em>ribose</em> instead of deoxyribose</li>
        <li>It's usually a <strong>single strand</strong>, not a double helix</li>
        <li>It uses the base <strong>U (uracil)</strong> in place of T (thymine)</li>
      </ul>
      <p>So wherever DNA would read <code>A</code>, the matching mRNA base is <code>U</code>.</p>
    `
  },
  {
    title: "Two big steps, two locations",
    body: `
      <p><strong>Transcription</strong> happens inside the <em>nucleus</em>: DNA is copied into mRNA.</p>
      <p><strong>Translation</strong> happens in the <em>cytoplasm</em> at a <em>ribosome</em>: the mRNA is read codon by codon, and amino acids are linked into a protein.</p>
      <p>The mRNA is the messenger that carries the recipe from the nucleus out to where proteins are actually built.</p>
    `
  }
];

const PROTEIN_TRANSCRIPTION_STEPS = [
  {
    title: "Step 1 — RNA polymerase finds the gene",
    body: `
      <p>The enzyme <strong>RNA polymerase</strong> latches onto a stretch of DNA called a <em>promoter</em>, right at the start of a gene.</p>
      <p>The promoter is like a "begin here" sign — it tells the cell where one gene starts and which strand to read.</p>
    `
  },
  {
    title: "Step 2 — The helix unwinds",
    body: `
      <p>RNA polymerase pries the double helix open, exposing the two single strands.</p>
      <p>Only one of them — the <strong>template strand</strong> — actually gets read. The other strand (the "coding" strand) just sits to the side.</p>
    `
  },
  {
    title: "Step 3 — mRNA is built, base by base",
    body: `
      <p>RNA polymerase moves along the template strand and adds matching RNA bases one at a time:</p>
      <ul>
        <li>DNA <code>A</code> → RNA <code>U</code></li>
        <li>DNA <code>T</code> → RNA <code>A</code></li>
        <li>DNA <code>C</code> → RNA <code>G</code></li>
        <li>DNA <code>G</code> → RNA <code>C</code></li>
      </ul>
      <p>Notice the U instead of T — that's RNA's signature swap.</p>
    `
  },
  {
    title: "Step 4 — The strand grows",
    body: `
      <p>As polymerase walks along, the growing mRNA peels off the template behind it, and the DNA helix re-zips itself.</p>
      <p>This continues until polymerase hits a <em>terminator sequence</em> — DNA's "end of gene" signal.</p>
    `
  },
  {
    title: "Step 5 — mRNA exits the nucleus",
    body: `
      <p>The finished mRNA strand detaches and drifts toward the edge of the nucleus.</p>
      <p>It slips out through a <strong>nuclear pore</strong> — a doorway in the nuclear membrane — and heads into the cytoplasm, where ribosomes are waiting.</p>
    `
  }
];

const PROTEIN_TRANSLATION_STEPS = [
  {
    title: "Step 1 — Ribosome assembles on the mRNA",
    body: `
      <p>In the cytoplasm, the two halves of a <strong>ribosome</strong> clamp around the mRNA.</p>
      <p>It scans along until it finds the <em>start codon</em> <code>AUG</code> — that's the universal "begin protein here" signal, and it codes for the amino acid <em>methionine</em>.</p>
    `
  },
  {
    title: "Step 2 — tRNA delivers the first amino acid",
    body: `
      <p><strong>Transfer RNAs (tRNAs)</strong> are tiny shuttles. Each one carries one specific amino acid and has a 3-base <em>anticodon</em> that matches one codon.</p>
      <p>A tRNA whose anticodon pairs with the mRNA codon in the ribosome drops its amino acid into place.</p>
    `
  },
  {
    title: "Step 3 — Peptide bond forms",
    body: `
      <p>The ribosome joins two neighbouring amino acids with a <strong>peptide bond</strong> — a tiny chemical link that fuses them into a chain.</p>
      <p>The first tRNA, now empty, pops out the back. The chain stays attached to the second tRNA.</p>
    `
  },
  {
    title: "Step 4 — Ribosome shifts to the next codon",
    body: `
      <p>The ribosome shuffles three bases forward on the mRNA, exposing a new codon.</p>
      <p>A new tRNA brings the next amino acid, another peptide bond forms, and the chain keeps growing — one codon, one amino acid at a time.</p>
    `
  },
  {
    title: "Step 5 — Stop codon ends the protein",
    body: `
      <p>Eventually the ribosome hits a <strong>stop codon</strong> — <code>UAA</code>, <code>UAG</code>, or <code>UGA</code>.</p>
      <p>No tRNA matches a stop codon. Instead, a <em>release factor</em> binds, the finished polypeptide chain is released, and the ribosome splits apart.</p>
      <p>The chain then folds into its 3D shape — and that's your protein.</p>
    `
  }
];

/* =========================================================
   Standard genetic code (RNA codons → amino acid).
   STOP marks the three termination codons.
   Used by the codon-decoder mini-game in js/protein.js.
   ========================================================= */

const CODON_TABLE = {
  // Phe / Leu
  UUU: 'Phe', UUC: 'Phe', UUA: 'Leu', UUG: 'Leu',
  CUU: 'Leu', CUC: 'Leu', CUA: 'Leu', CUG: 'Leu',
  // Ile / Met (start)
  AUU: 'Ile', AUC: 'Ile', AUA: 'Ile', AUG: 'Met',
  // Val
  GUU: 'Val', GUC: 'Val', GUA: 'Val', GUG: 'Val',
  // Ser
  UCU: 'Ser', UCC: 'Ser', UCA: 'Ser', UCG: 'Ser',
  // Pro
  CCU: 'Pro', CCC: 'Pro', CCA: 'Pro', CCG: 'Pro',
  // Thr
  ACU: 'Thr', ACC: 'Thr', ACA: 'Thr', ACG: 'Thr',
  // Ala
  GCU: 'Ala', GCC: 'Ala', GCA: 'Ala', GCG: 'Ala',
  // Tyr / STOP
  UAU: 'Tyr', UAC: 'Tyr', UAA: 'STOP', UAG: 'STOP',
  // His / Gln
  CAU: 'His', CAC: 'His', CAA: 'Gln', CAG: 'Gln',
  // Asn / Lys
  AAU: 'Asn', AAC: 'Asn', AAA: 'Lys', AAG: 'Lys',
  // Asp / Glu
  GAU: 'Asp', GAC: 'Asp', GAA: 'Glu', GAG: 'Glu',
  // Cys / STOP / Trp
  UGU: 'Cys', UGC: 'Cys', UGA: 'STOP', UGG: 'Trp',
  // Arg
  CGU: 'Arg', CGC: 'Arg', CGA: 'Arg', CGG: 'Arg',
  AGU: 'Ser', AGC: 'Ser', AGA: 'Arg', AGG: 'Arg',
  // Gly
  GGU: 'Gly', GGC: 'Gly', GGA: 'Gly', GGG: 'Gly'
};

/* Full names for the tooltip / hint in the game. */
const AMINO_ACID_NAMES = {
  Ala: 'Alanine',     Arg: 'Arginine',   Asn: 'Asparagine',  Asp: 'Aspartate',
  Cys: 'Cysteine',    Gln: 'Glutamine',  Glu: 'Glutamate',   Gly: 'Glycine',
  His: 'Histidine',   Ile: 'Isoleucine', Leu: 'Leucine',     Lys: 'Lysine',
  Met: 'Methionine',  Phe: 'Phenylalanine', Pro: 'Proline',  Ser: 'Serine',
  Thr: 'Threonine',   Trp: 'Tryptophan', Tyr: 'Tyrosine',    Val: 'Valine',
  STOP: 'Stop codon'
};
