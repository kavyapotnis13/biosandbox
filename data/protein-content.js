/* =========================================================
   protein-content.js — flashcards + codon table for the
   Protein Synthesis module.

   Three card decks:
     PROTEIN_INTRO_CARDS       — what protein synthesis is, central dogma
     PROTEIN_TRANSCRIPTION     — 5 steps for DNA → mRNA in the nucleus
     PROTEIN_TRANSLATION       — 5 steps for mRNA → polypeptide at ribosome

   Each card has body: { middle, high }.

   Plus CODON_TABLE — the standard genetic code, used by the
   codon-decoder mini-game.
   ========================================================= */

const PROTEIN_INTRO_CARDS = [
  {
    title: "What is a protein?",
    body: {
      middle: `
        <p>Proteins are long chains of smaller building blocks called <strong>amino acids</strong>.</p>
        <p>They do almost every job in your cells — building muscle, carrying oxygen in your blood, fighting infections, digesting food, and much more.</p>
        <p>Your DNA is basically a giant instruction manual telling cells which proteins to build, and when to build them.</p>
      `,
      high: `
        <p>Proteins are long chains of smaller building blocks called <strong>amino acids</strong>.</p>
        <p>They do almost every job in the cell — building muscle, carrying oxygen, fighting infection, digesting food, speeding up reactions.</p>
        <p>Your DNA is essentially an instruction manual for making the right proteins, at the right time, in the right place.</p>
      `
    }
  },
  {
    title: "The central dogma",
    body: {
      middle: `
        <p>The cell follows one main rule when turning DNA into proteins:</p>
        <p style="text-align:center; font-size:1.05rem; padding:0.5rem 0;"><strong>DNA → RNA → Protein</strong></p>
        <p>First the cell copies DNA into a temporary working copy called <strong>RNA</strong>. Then the RNA gets used to actually build the protein.</p>
        <p>This pattern is so important that scientists call it the "central dogma" of biology.</p>
      `,
      high: `
        <p>Biology's headline rule for how information flows in a cell:</p>
        <p style="text-align:center; font-family:'JetBrains Mono', monospace; font-size:1.05rem; padding:0.5rem 0;">
          <strong>DNA → RNA → Protein</strong>
        </p>
        <p>DNA gets <em>transcribed</em> into messenger RNA (mRNA), and then mRNA gets <em>translated</em> into a protein.</p>
      `
    }
  },
  {
    title: "Read three letters at a time",
    body: {
      middle: `
        <p>The cell reads RNA in <strong>groups of three letters</strong>. Each group is called a <strong>codon</strong>.</p>
        <p>Each codon tells the cell to add one specific amino acid to the protein — or means "stop here."</p>
        <p>For example, the codon <code>AUG</code> means "start the protein with methionine." The codon <code>UAA</code> means "stop, the protein is done."</p>
      `,
      high: `
        <p>The genetic code is read in groups of three bases. Each triplet is called a <strong>codon</strong>.</p>
        <p>Every codon (e.g. <code>AUG</code>, <code>GCU</code>, <code>UAA</code>) maps to a specific amino acid — or to a "start" or "stop" signal.</p>
        <p>With 4 bases and 3 positions, there are 4³ = <strong>64 possible codons</strong> coding for just 20 amino acids, so most amino acids have more than one codon.</p>
      `
    }
  },
  {
    title: "RNA is almost like DNA",
    body: {
      middle: `
        <p>RNA looks a lot like DNA, with a few key differences:</p>
        <ul>
          <li>RNA is usually <strong>just one strand</strong>, not two.</li>
          <li>RNA uses the letter <strong>U</strong> instead of <strong>T</strong>.</li>
          <li>RNA uses a slightly different sugar.</li>
        </ul>
        <p>That U/T swap is important: whenever you see a T in DNA, the matching letter in RNA is a U.</p>
      `,
      high: `
        <p>RNA looks like DNA, but with three differences:</p>
        <ul>
          <li>It uses the sugar <em>ribose</em> instead of deoxyribose</li>
          <li>It's usually a <strong>single strand</strong>, not a double helix</li>
          <li>It uses the base <strong>U (uracil)</strong> in place of T (thymine)</li>
        </ul>
        <p>So wherever DNA would read <code>A</code>, the matching mRNA base is <code>U</code>.</p>
      `
    }
  },
  {
    title: "Two big steps, two places",
    body: {
      middle: `
        <p>Making a protein happens in <strong>two main steps</strong>, in two different places:</p>
        <ol>
          <li><strong>Transcription</strong> — copying DNA into RNA. This happens inside the nucleus.</li>
          <li><strong>Translation</strong> — using RNA to build a protein. This happens at a tiny structure called a <em>ribosome</em>, out in the cell's cytoplasm.</li>
        </ol>
        <p>The RNA is like a message that gets sent out from the nucleus to where the protein actually gets built.</p>
      `,
      high: `
        <p><strong>Transcription</strong> happens inside the <em>nucleus</em>: DNA is copied into mRNA.</p>
        <p><strong>Translation</strong> happens in the <em>cytoplasm</em> at a <em>ribosome</em>: the mRNA is read codon by codon, and amino acids are linked into a protein.</p>
        <p>The mRNA is the messenger that carries the recipe from the nucleus out to where proteins are actually built.</p>
      `
    }
  }
];

const PROTEIN_TRANSCRIPTION_STEPS = [
  {
    title: "Step 1 — Find the gene",
    body: {
      middle: `
        <p>The copying enzyme — called <strong>RNA polymerase</strong> — grabs onto a special spot on the DNA called a <strong>promoter</strong>.</p>
        <p>A promoter is like a "START HERE" sign in the DNA. It tells the enzyme where the gene begins.</p>
      `,
      high: `
        <p>The enzyme <strong>RNA polymerase</strong> latches onto a stretch of DNA called a <em>promoter</em>, right at the start of a gene.</p>
        <p>The promoter is like a "begin here" sign — it tells the cell where one gene starts and which strand to read.</p>
      `
    }
  },
  {
    title: "Step 2 — Unzip the DNA",
    body: {
      middle: `
        <p>The polymerase pries open the DNA's two strands, exposing the bases inside.</p>
        <p>It only reads one of the two strands — the other one just hangs out waiting to zip back up later.</p>
      `,
      high: `
        <p>RNA polymerase pries the double helix open, exposing the two single strands.</p>
        <p>Only one of them — the <strong>template strand</strong> — actually gets read. The other strand (the "coding" strand) just sits to the side.</p>
      `
    }
  },
  {
    title: "Step 3 — Build the RNA copy",
    body: {
      middle: `
        <p>The polymerase walks along the DNA, reading each letter and adding the matching RNA letter to a growing new strand:</p>
        <ul>
          <li>DNA <strong>A</strong> → RNA <strong>U</strong></li>
          <li>DNA <strong>T</strong> → RNA <strong>A</strong></li>
          <li>DNA <strong>C</strong> → RNA <strong>G</strong></li>
          <li>DNA <strong>G</strong> → RNA <strong>C</strong></li>
        </ul>
        <p>Notice the U? RNA uses U instead of T — that's how you can tell them apart.</p>
      `,
      high: `
        <p>RNA polymerase moves along the template strand and adds matching RNA bases one at a time:</p>
        <ul>
          <li>DNA <code>A</code> → RNA <code>U</code></li>
          <li>DNA <code>T</code> → RNA <code>A</code></li>
          <li>DNA <code>C</code> → RNA <code>G</code></li>
          <li>DNA <code>G</code> → RNA <code>C</code></li>
        </ul>
        <p>Notice the U instead of T — that's RNA's signature swap.</p>
      `
    }
  },
  {
    title: "Step 4 — The RNA grows",
    body: {
      middle: `
        <p>As the polymerase moves along, the growing RNA peels off behind it, and the DNA zips itself back up.</p>
        <p>The polymerase keeps going until it hits a special "STOP" signal at the end of the gene.</p>
      `,
      high: `
        <p>As polymerase walks along, the growing mRNA peels off the template behind it, and the DNA helix re-zips itself.</p>
        <p>This continues until polymerase hits a <em>terminator sequence</em> — DNA's "end of gene" signal.</p>
      `
    }
  },
  {
    title: "Step 5 — RNA leaves the nucleus",
    body: {
      middle: `
        <p>The finished RNA detaches from the DNA and floats over to one of the tiny doors in the nuclear membrane.</p>
        <p>It slips out into the rest of the cell, where ribosomes are waiting to use it to make a protein.</p>
      `,
      high: `
        <p>The finished mRNA strand detaches and drifts toward the edge of the nucleus.</p>
        <p>It slips out through a <strong>nuclear pore</strong> — a doorway in the nuclear membrane — and heads into the cytoplasm, where ribosomes are waiting.</p>
      `
    }
  }
];

const PROTEIN_TRANSLATION_STEPS = [
  {
    title: "Step 1 — Ribosome grabs the RNA",
    body: {
      middle: `
        <p>Out in the cytoplasm, a tiny machine called a <strong>ribosome</strong> grabs onto the RNA message.</p>
        <p>It slides along until it finds the start signal — the codon <code>AUG</code>. That's where every protein begins.</p>
      `,
      high: `
        <p>In the cytoplasm, the two halves of a <strong>ribosome</strong> clamp around the mRNA.</p>
        <p>It scans along until it finds the <em>start codon</em> <code>AUG</code> — that's the universal "begin protein here" signal, and it codes for the amino acid <em>methionine</em>.</p>
      `
    }
  },
  {
    title: "Step 2 — tRNA delivers an amino acid",
    body: {
      middle: `
        <p>Floating around the cell are tiny delivery shuttles called <strong>tRNAs</strong>. Each tRNA carries one specific amino acid.</p>
        <p>Each tRNA has a 3-letter tag on it that matches one specific codon on the RNA. The tRNA finds its matching codon, drops off its amino acid, and locks into place.</p>
      `,
      high: `
        <p><strong>Transfer RNAs (tRNAs)</strong> are tiny shuttles. Each one carries one specific amino acid and has a 3-base <em>anticodon</em> that matches one codon.</p>
        <p>A tRNA whose anticodon pairs with the mRNA codon in the ribosome drops its amino acid into place.</p>
      `
    }
  },
  {
    title: "Step 3 — Link the amino acids",
    body: {
      middle: `
        <p>The ribosome takes two amino acids that are next to each other and <strong>links them together</strong> with a chemical bond (called a peptide bond).</p>
        <p>The first delivery tRNA, now empty, slides out the back. The chain stays attached to the new tRNA.</p>
      `,
      high: `
        <p>The ribosome joins two neighbouring amino acids with a <strong>peptide bond</strong> — a tiny chemical link that fuses them into a chain.</p>
        <p>The first tRNA, now empty, pops out the back. The chain stays attached to the second tRNA.</p>
      `
    }
  },
  {
    title: "Step 4 — Move to the next codon",
    body: {
      middle: `
        <p>The ribosome shifts <strong>three letters forward</strong> on the RNA, exposing the next codon.</p>
        <p>A new tRNA brings the next amino acid, the ribosome links it on, and the chain keeps getting longer — one codon, one amino acid at a time.</p>
      `,
      high: `
        <p>The ribosome shuffles three bases forward on the mRNA, exposing a new codon.</p>
        <p>A new tRNA brings the next amino acid, another peptide bond forms, and the chain keeps growing — one codon, one amino acid at a time.</p>
      `
    }
  },
  {
    title: "Step 5 — Stop codon ends the protein",
    body: {
      middle: `
        <p>Eventually the ribosome reaches a special <strong>stop codon</strong> (either UAA, UAG, or UGA).</p>
        <p>No tRNA matches a stop codon, so the chain gets released and the ribosome falls apart into pieces.</p>
        <p>The chain then folds up into its 3D shape — and you've got a working protein!</p>
      `,
      high: `
        <p>Eventually the ribosome hits a <strong>stop codon</strong> — <code>UAA</code>, <code>UAG</code>, or <code>UGA</code>.</p>
        <p>No tRNA matches a stop codon. Instead, a <em>release factor</em> binds, the finished polypeptide chain is released, and the ribosome splits apart.</p>
        <p>The chain then folds into its 3D shape — and that's your protein.</p>
      `
    }
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
