/* =========================================================
   regulation-content.js — flashcards for Gene Regulation
   ========================================================= */

const REG_MUTATION_CARDS = [
  {
    title: "Mutations — changes in the DNA",
    body: `
      <p>A <strong>mutation</strong> is any change to the DNA sequence. Some are minor — one base swapped for another. Some are catastrophic — entire chromosomes lost.</p>
      <p>Mutations are the raw material of evolution. Without them, no variation, no natural selection, no new species. Most mutations are neutral; some are harmful; a tiny fraction are useful — and those occasionally get amplified across generations.</p>
    `
  },
  {
    title: "Point mutations — one base changed",
    body: `
      <p>A <strong>point mutation</strong> is a single-base change. There are three flavors at the protein level:</p>
      <ul>
        <li><strong>Silent</strong> — the codon still codes for the same amino acid (thanks to redundancy in the genetic code). No effect.</li>
        <li><strong>Missense</strong> — the codon now codes for a <em>different</em> amino acid. The protein may or may not still work. (Sickle-cell anemia is one base swap that changes Glu → Val in hemoglobin.)</li>
        <li><strong>Nonsense</strong> — the codon becomes a STOP codon. The protein is cut short — usually broken.</li>
      </ul>
    `
  },
  {
    title: "Insertions, deletions, and frameshifts",
    body: `
      <p>If a base is <strong>inserted</strong> or <strong>deleted</strong> (and the count isn't a multiple of 3), every codon downstream shifts over by one position — that's a <strong>frameshift</strong>.</p>
      <p>Every amino acid downstream of the frameshift is now wrong, and a premature STOP usually shows up soon. Frameshifts are almost always severely damaging.</p>
      <p>Insertions/deletions of 3 (or multiples of 3) add or remove a single amino acid without shifting the frame. Often less catastrophic.</p>
    `
  },
  {
    title: "Where mutations come from",
    body: `
      <ul>
        <li><strong>Replication errors</strong> — DNA polymerase makes a typo. Proofreading catches most, but not all.</li>
        <li><strong>Mutagens</strong> — chemicals (cigarette tar, alkylating agents) and radiation (UV, X-rays) damage DNA directly.</li>
        <li><strong>Viral integration</strong> — some viruses splice their DNA into your chromosomes.</li>
      </ul>
      <p>Mutations in <strong>somatic cells</strong> (body cells) affect only you — they can cause cancer but aren't inherited. Mutations in <strong>germ-line cells</strong> (egg/sperm) <em>are</em> inherited by your children. The germline is what evolution acts on.</p>
    `
  }
];

const REG_PROKARYOTE_CARDS = [
  {
    title: "Why regulate genes at all?",
    body: `
      <p>Every cell has the same DNA, but no cell needs every protein all the time. <strong>Gene regulation</strong> is how a cell decides what to make right now and what to keep silent.</p>
      <p>It's efficient (don't waste energy on proteins you don't need) and it's what makes cell types possible (a liver cell expresses one set of genes, a neuron a different set).</p>
    `
  },
  {
    title: "The operon — bacterial gene clusters",
    body: `
      <p>Prokaryotes group functionally-related genes into <strong>operons</strong>: a promoter, an operator, and several structural genes all transcribed together as one mRNA.</p>
      <p>An <strong>operator</strong> is a short DNA sequence next to the promoter. A regulatory protein (an <strong>activator</strong> or <strong>repressor</strong>) binds the operator to turn the operon on or off.</p>
      <p>This compact design means one regulatory switch controls a whole pathway.</p>
    `
  },
  {
    title: "The lac operon — turning on when lactose is around",
    body: `
      <p>The <em>lac operon</em> in <em>E. coli</em> codes for the enzymes that digest lactose. The bacterium only wants to make these enzymes <strong>when lactose is actually present</strong>.</p>
      <p>Normally, a <strong>lac repressor</strong> protein is bound to the operator, blocking transcription.</p>
      <p>When lactose is around, a lactose derivative binds the repressor, which lets go of the operator. RNA polymerase can now transcribe the operon — lactose-digesting enzymes get made. When the lactose is gone, the repressor binds again, and the operon switches off.</p>
      <p>This is an <strong>inducible</strong> operon — off by default, turned on by the substrate.</p>
    `
  },
  {
    title: "The trp operon — off when product is plentiful",
    body: `
      <p>The opposite logic: the <em>trp operon</em> codes for the enzymes that <em>build</em> the amino acid tryptophan.</p>
      <p>Normally the operon is on — tryptophan needs to be made. But when tryptophan is abundant, it binds to the <strong>trp repressor</strong> (activating it), which then binds the operator and shuts the operon off.</p>
      <p>This is a <strong>repressible</strong> operon — on by default, turned off when its own product piles up. It's feedback inhibition at the transcription level.</p>
    `
  }
];

const REG_EUKARYOTE_CARDS = [
  {
    title: "Eukaryotic gene regulation — many more layers",
    body: `
      <p>Eukaryotes don't use operons (mostly). Their genes are scattered, much bigger, and regulated at <em>multiple</em> levels:</p>
      <ol>
        <li><strong>Chromatin packing</strong> — tightly wound DNA is unreadable. Loosening it is the first decision.</li>
        <li><strong>Transcription factors</strong> bind enhancers/promoters and recruit RNA polymerase.</li>
        <li><strong>RNA processing</strong> — splicing decides which exons end up in the final mRNA.</li>
        <li><strong>mRNA stability</strong> — how long does the message survive in the cytoplasm?</li>
        <li><strong>Translation control</strong> — is the ribosome allowed to start?</li>
        <li><strong>Protein modification</strong> — post-translational tweaks turn proteins on or off.</li>
      </ol>
      <p>This many layers = much more flexibility, but also much more room for things to go wrong.</p>
    `
  },
  {
    title: "Chromatin and epigenetics",
    body: `
      <p>DNA in eukaryotes is wrapped around histone proteins into <strong>nucleosomes</strong>, packed into chromatin. Tightly-packed chromatin (<em>heterochromatin</em>) is silent. Loosely-packed (<em>euchromatin</em>) is available to transcribe.</p>
      <p>Chemical tags — <strong>histone modifications</strong> and <strong>DNA methylation</strong> — change how tightly the DNA is packed without changing the sequence. These tags are heritable across cell divisions but reversible — that's <strong>epigenetics</strong>.</p>
      <p>Epigenetics is why your liver cells stay liver cells through every division: the right genes are kept available, the wrong ones kept locked away.</p>
    `
  },
  {
    title: "Alternative splicing — one gene, many proteins",
    body: `
      <p>A eukaryotic gene is a string of <strong>exons</strong> (coding) and <strong>introns</strong> (non-coding) spliced together after transcription.</p>
      <p>By including or skipping different exons, the same gene can make <strong>different protein versions</strong> in different cells. The human gene <em>DSCAM</em>, in fruit flies, can be spliced over 38,000 ways. That's why ~20,000 human genes can encode hundreds of thousands of protein variants.</p>
    `
  }
];

const REG_BIOTECH_CARDS = [
  {
    title: "Biotechnology — using DNA's rules to engineer",
    body: `
      <p>Once we understood DNA, replication, and transcription, we figured out how to <em>edit</em> them. <strong>Biotechnology</strong> uses the cell's own molecular machinery to read, copy, cut, and rewrite DNA.</p>
      <p>The result: insulin made in bacteria, glow-in-the-dark mice, fast COVID tests, gene-edited cancer cures. The tools are powerful, cheap, and getting cheaper.</p>
    `
  },
  {
    title: "PCR — copying DNA exponentially",
    body: `
      <p>The <strong>Polymerase Chain Reaction</strong> takes a single DNA template and copies it billions of times in a few hours:</p>
      <ol>
        <li><strong>Denature</strong> at 95°C — strands separate.</li>
        <li><strong>Anneal</strong> at ~55°C — short primers bind the target region.</li>
        <li><strong>Extend</strong> at 72°C — a heat-stable DNA polymerase (Taq) builds new strands.</li>
        <li>Repeat 30+ cycles.</li>
      </ol>
      <p>Each cycle doubles the DNA — 2³⁰ ≈ 1 billion copies. PCR is in every forensic lab, every COVID test, every paternity case.</p>
    `
  },
  {
    title: "Gel electrophoresis — sorting DNA by size",
    body: `
      <p>Pour an agarose gel. Load DNA samples in wells at one end. Apply voltage. Because DNA is negatively charged, it migrates toward the positive electrode — and <strong>smaller fragments move faster</strong> through the gel matrix.</p>
      <p>After running, you stain the gel. Bands of DNA appear, sorted by length. Compare against a "ladder" of known sizes to identify your fragments.</p>
      <p>Used everywhere: confirming PCR worked, DNA fingerprinting, checking digests, paternity tests.</p>
    `
  },
  {
    title: "CRISPR — programmable gene editing",
    body: `
      <p><strong>CRISPR–Cas9</strong> is a bacterial defense system researchers turned into a precise gene-editing tool. It has two parts:</p>
      <ul>
        <li>A <strong>guide RNA</strong> — a short sequence you design to match the target DNA.</li>
        <li><strong>Cas9</strong> — a nuclease that follows the guide RNA to the matching DNA and cuts it.</li>
      </ul>
      <p>The cell's repair machinery patches the cut — often introducing small mutations that knock the gene out, or, with a template, inserting a precise new sequence.</p>
      <p>CRISPR won the 2020 Nobel Prize in Chemistry. It's already curing sickle-cell disease in patients — and opening up huge questions about what we should and shouldn't edit.</p>
    `
  }
];
