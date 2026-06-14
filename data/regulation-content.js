/* =========================================================
   regulation-content.js — flashcards for Gene Regulation

   Each card has body: { middle, high }.
   ========================================================= */

const REG_MUTATION_CARDS = [
  {
    title: "Mutations — changes in the DNA",
    body: {
      middle: `
        <p>A <strong>mutation</strong> is any change to the DNA sequence. Some are tiny — one letter swapped for another. Some are huge — whole chunks lost.</p>
        <p>Mutations are the raw material of evolution. Without them, there would be no variety, no natural selection, no new species. Most mutations don't do much. Some cause harm. A few are actually useful — and over time those can spread through a whole population.</p>
      `,
      high: `
        <p>A <strong>mutation</strong> is any change to the DNA sequence. Some are minor — one base swapped for another. Some are catastrophic — entire chromosomes lost.</p>
        <p>Mutations are the raw material of evolution. Without them, no variation, no natural selection, no new species. Most mutations are neutral; some are harmful; a tiny fraction are useful — and those occasionally get amplified across generations.</p>
      `
    }
  },
  {
    title: "Point mutations — one letter changed",
    body: {
      middle: `
        <p>A <strong>point mutation</strong> is when one letter of DNA gets swapped for another. Three things can happen:</p>
        <ul>
          <li><strong>Silent</strong> — the change doesn't actually change the protein. No effect.</li>
          <li><strong>Missense</strong> — the change makes the cell build a slightly different protein. Sometimes it still works, sometimes not.</li>
          <li><strong>Nonsense</strong> — the change makes the cell stop early. The protein is cut short and usually broken.</li>
        </ul>
        <p>Sickle-cell anemia is caused by just ONE letter change in the gene for hemoglobin (the protein that carries oxygen in your blood).</p>
      `,
      high: `
        <p>A <strong>point mutation</strong> is a single-base change. There are three flavors at the protein level:</p>
        <ul>
          <li><strong>Silent</strong> — the codon still codes for the same amino acid (thanks to redundancy in the genetic code). No effect.</li>
          <li><strong>Missense</strong> — the codon now codes for a <em>different</em> amino acid. The protein may or may not still work. (Sickle-cell anemia is one base swap that changes Glu → Val in hemoglobin.)</li>
          <li><strong>Nonsense</strong> — the codon becomes a STOP codon. The protein is cut short — usually broken.</li>
        </ul>
      `
    }
  },
  {
    title: "Insertions, deletions, and frameshifts",
    body: {
      middle: `
        <p>What if a letter gets <strong>inserted</strong> (added) or <strong>deleted</strong> (removed) instead of swapped?</p>
        <p>Remember the cell reads DNA in groups of three. If you add or remove just one letter, every group from that point on gets shifted by one — like sliding a row of dominoes. This is called a <strong>frameshift</strong>.</p>
        <p>Frameshifts are usually disasters: every amino acid after the change is wrong, and the protein basically doesn't work.</p>
      `,
      high: `
        <p>If a base is <strong>inserted</strong> or <strong>deleted</strong> (and the count isn't a multiple of 3), every codon downstream shifts over by one position — that's a <strong>frameshift</strong>.</p>
        <p>Every amino acid downstream of the frameshift is now wrong, and a premature STOP usually shows up soon. Frameshifts are almost always severely damaging.</p>
        <p>Insertions/deletions of 3 (or multiples of 3) add or remove a single amino acid without shifting the frame. Often less catastrophic.</p>
      `
    }
  },
  {
    title: "Where mutations come from",
    body: {
      middle: `
        <p>How does DNA get changed? A few common ways:</p>
        <ul>
          <li><strong>Copying mistakes</strong> — even careful enzymes occasionally typo when copying DNA.</li>
          <li><strong>Chemicals and radiation</strong> — cigarette smoke, UV rays from the sun, and X-rays can damage DNA directly.</li>
          <li><strong>Viruses</strong> — some viruses paste their DNA right into yours.</li>
        </ul>
        <p>Mutations in regular body cells affect only you (and can cause cancer). Mutations in your sperm or egg cells are passed down to your kids.</p>
      `,
      high: `
        <ul>
          <li><strong>Replication errors</strong> — DNA polymerase makes a typo. Proofreading catches most, but not all.</li>
          <li><strong>Mutagens</strong> — chemicals (cigarette tar, alkylating agents) and radiation (UV, X-rays) damage DNA directly.</li>
          <li><strong>Viral integration</strong> — some viruses splice their DNA into your chromosomes.</li>
        </ul>
        <p>Mutations in <strong>somatic cells</strong> (body cells) affect only you — they can cause cancer but aren't inherited. Mutations in <strong>germ-line cells</strong> (egg/sperm) <em>are</em> inherited by your children. The germline is what evolution acts on.</p>
      `
    }
  }
];

const REG_PROKARYOTE_CARDS = [
  {
    title: "Why do cells control their genes?",
    body: {
      middle: `
        <p>Every one of your cells has the same DNA. So why does a brain cell act so differently from a skin cell?</p>
        <p>Because each cell <strong>turns on different genes</strong>. Cells don't make every protein they could — that would waste tons of energy. Instead, they only make the proteins they actually need right now.</p>
        <p>Deciding what to turn on and off is called <strong>gene regulation</strong>.</p>
      `,
      high: `
        <p>Every cell has the same DNA, but no cell needs every protein all the time. <strong>Gene regulation</strong> is how a cell decides what to make right now and what to keep silent.</p>
        <p>It's efficient (don't waste energy on proteins you don't need) and it's what makes cell types possible (a liver cell expresses one set of genes, a neuron a different set).</p>
      `
    }
  },
  {
    title: "Operons — bacterial gene switches",
    body: {
      middle: `
        <p>Bacteria do gene regulation in a clever, simple way. They group related genes together into a unit called an <strong>operon</strong> — like a group of genes that all share one ON/OFF switch.</p>
        <p>One switch, one control, one whole pathway turned on or off. Very efficient.</p>
      `,
      high: `
        <p>Prokaryotes group functionally-related genes into <strong>operons</strong>: a promoter, an operator, and several structural genes all transcribed together as one mRNA.</p>
        <p>An <strong>operator</strong> is a short DNA sequence next to the promoter. A regulatory protein (an <strong>activator</strong> or <strong>repressor</strong>) binds the operator to turn the operon on or off.</p>
        <p>This compact design means one regulatory switch controls a whole pathway.</p>
      `
    }
  },
  {
    title: "The lac operon — switch on when needed",
    body: {
      middle: `
        <p>One famous example: the bacterium <em>E. coli</em> has an operon that helps it eat the sugar called <strong>lactose</strong>. But it only wants to make the lactose-digesting enzymes when there's actually lactose around.</p>
        <p>Normally, a protein sits on the operon's switch and keeps it <strong>OFF</strong>. When lactose appears, it knocks that protein off, the switch flips <strong>ON</strong>, and the enzymes get made. When the lactose runs out, the protein comes back and switches it off again.</p>
      `,
      high: `
        <p>The <em>lac operon</em> in <em>E. coli</em> codes for the enzymes that digest lactose. The bacterium only wants to make these enzymes <strong>when lactose is actually present</strong>.</p>
        <p>Normally, a <strong>lac repressor</strong> protein is bound to the operator, blocking transcription.</p>
        <p>When lactose is around, a lactose derivative binds the repressor, which lets go of the operator. RNA polymerase can now transcribe the operon — lactose-digesting enzymes get made. When the lactose is gone, the repressor binds again, and the operon switches off.</p>
        <p>This is an <strong>inducible</strong> operon — off by default, turned on by the substrate.</p>
      `
    }
  },
  {
    title: "The trp operon — opposite logic",
    body: {
      middle: `
        <p>Another <em>E. coli</em> operon does the <em>opposite</em>. It controls the enzymes that <strong>build</strong> an amino acid called tryptophan.</p>
        <p>Normally this operon is ON, since the bacterium wants tryptophan. But when there's plenty of tryptophan already around, the tryptophan itself flips a switch to turn the operon OFF — no need to make more.</p>
        <p>This is "feedback control" — the cell uses the amount of product to decide whether to keep making it.</p>
      `,
      high: `
        <p>The opposite logic: the <em>trp operon</em> codes for the enzymes that <em>build</em> the amino acid tryptophan.</p>
        <p>Normally the operon is on — tryptophan needs to be made. But when tryptophan is abundant, it binds to the <strong>trp repressor</strong> (activating it), which then binds the operator and shuts the operon off.</p>
        <p>This is a <strong>repressible</strong> operon — on by default, turned off when its own product piles up. It's feedback inhibition at the transcription level.</p>
      `
    }
  }
];

const REG_EUKARYOTE_CARDS = [
  {
    title: "Eukaryotes — many more layers of control",
    body: {
      middle: `
        <p>Bigger cells (like yours and plants') don't use operons. Instead, they regulate genes at <strong>many different stages</strong>:</p>
        <ol>
          <li>How tightly the DNA is packed (tight = can't read it).</li>
          <li>Special proteins that help or block the copying enzyme.</li>
          <li>Editing the RNA after it's made.</li>
          <li>How long the RNA lasts before getting destroyed.</li>
          <li>Whether the cell actually builds the protein.</li>
          <li>Tweaking the protein after it's built.</li>
        </ol>
        <p>More layers = more control, but also more places things can go wrong.</p>
      `,
      high: `
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
    }
  },
  {
    title: "DNA packing — and epigenetics",
    body: {
      middle: `
        <p>In your cells, DNA is wrapped around tiny protein spools, packed tighter and tighter to fit inside the nucleus.</p>
        <p>If the DNA is packed too tightly, the cell <strong>can't read</strong> the genes in that area — they're hidden away. Loose DNA is accessible; tight DNA is silenced.</p>
        <p>Special chemical tags can change how tight the DNA is packed without changing the actual letters. These tags get passed down when cells divide and can even be affected by your environment. This whole field is called <strong>epigenetics</strong>.</p>
      `,
      high: `
        <p>DNA in eukaryotes is wrapped around histone proteins into <strong>nucleosomes</strong>, packed into chromatin. Tightly-packed chromatin (<em>heterochromatin</em>) is silent. Loosely-packed (<em>euchromatin</em>) is available to transcribe.</p>
        <p>Chemical tags — <strong>histone modifications</strong> and <strong>DNA methylation</strong> — change how tightly the DNA is packed without changing the sequence. These tags are heritable across cell divisions but reversible — that's <strong>epigenetics</strong>.</p>
        <p>Epigenetics is why your liver cells stay liver cells through every division: the right genes are kept available, the wrong ones kept locked away.</p>
      `
    }
  },
  {
    title: "One gene → multiple proteins",
    body: {
      middle: `
        <p>Here's something wild: a single gene can actually make <strong>different proteins in different situations</strong>.</p>
        <p>Genes have important parts (the coding parts) and "junk" sections in between. When the RNA gets cleaned up, the cell can <strong>mix and match which important parts to keep</strong> — making slightly different proteins depending on what the cell needs.</p>
        <p>That's why you only have ~20,000 genes but can make hundreds of thousands of different proteins.</p>
      `,
      high: `
        <p>A eukaryotic gene is a string of <strong>exons</strong> (coding) and <strong>introns</strong> (non-coding) spliced together after transcription.</p>
        <p>By including or skipping different exons, the same gene can make <strong>different protein versions</strong> in different cells. The human gene <em>DSCAM</em>, in fruit flies, can be spliced over 38,000 ways. That's why ~20,000 human genes can encode hundreds of thousands of protein variants.</p>
      `
    }
  }
];

const REG_BIOTECH_CARDS = [
  {
    title: "Biotechnology — engineering with DNA",
    body: {
      middle: `
        <p>Now that scientists understand DNA, they've figured out how to <strong>edit it</strong>. This is called <strong>biotechnology</strong>.</p>
        <p>It already powers a lot of modern life: insulin for diabetics is made by bacteria with human genes added; COVID tests look for tiny pieces of viral DNA; gene therapy is being used to cure some diseases.</p>
      `,
      high: `
        <p>Once we understood DNA, replication, and transcription, we figured out how to <em>edit</em> them. <strong>Biotechnology</strong> uses the cell's own molecular machinery to read, copy, cut, and rewrite DNA.</p>
        <p>The result: insulin made in bacteria, glow-in-the-dark mice, fast COVID tests, gene-edited cancer cures. The tools are powerful, cheap, and getting cheaper.</p>
      `
    }
  },
  {
    title: "PCR — making millions of copies",
    body: {
      middle: `
        <p><strong>PCR</strong> (Polymerase Chain Reaction) is a way to take one tiny piece of DNA and copy it <strong>billions of times</strong> in just a few hours.</p>
        <p>It works by heating and cooling the DNA repeatedly. Each round of heating/cooling doubles the amount you have. After 30 rounds, one starting copy turns into about a <strong>billion copies</strong>.</p>
        <p>PCR is what makes forensic DNA tests possible, what COVID tests rely on, and what helps doctors find tiny traces of viruses or cancer DNA.</p>
      `,
      high: `
        <p>The <strong>Polymerase Chain Reaction</strong> takes a single DNA template and copies it billions of times in a few hours:</p>
        <ol>
          <li><strong>Denature</strong> at 95°C — strands separate.</li>
          <li><strong>Anneal</strong> at ~55°C — short primers bind the target region.</li>
          <li><strong>Extend</strong> at 72°C — a heat-stable DNA polymerase (Taq) builds new strands.</li>
          <li>Repeat 30+ cycles.</li>
        </ol>
        <p>Each cycle doubles the DNA — 2³⁰ ≈ 1 billion copies. PCR is in every forensic lab, every COVID test, every paternity case.</p>
      `
    }
  },
  {
    title: "Gel electrophoresis — sorting DNA",
    body: {
      middle: `
        <p>Want to sort DNA pieces by size? Use <strong>gel electrophoresis</strong>.</p>
        <p>You put DNA into one end of a wobbly Jell-O-like gel, then run an electric current through it. DNA has a small negative charge, so it gets pulled toward the positive end. <strong>Smaller pieces zip through the gel faster</strong>, while bigger pieces lag behind.</p>
        <p>After running, you stain the gel and see bands of DNA sorted by size. It's used in DNA fingerprinting, paternity tests, and lots of biology labs.</p>
      `,
      high: `
        <p>Pour an agarose gel. Load DNA samples in wells at one end. Apply voltage. Because DNA is negatively charged, it migrates toward the positive electrode — and <strong>smaller fragments move faster</strong> through the gel matrix.</p>
        <p>After running, you stain the gel. Bands of DNA appear, sorted by length. Compare against a "ladder" of known sizes to identify your fragments.</p>
        <p>Used everywhere: confirming PCR worked, DNA fingerprinting, checking digests, paternity tests.</p>
      `
    }
  },
  {
    title: "CRISPR — editing genes precisely",
    body: {
      middle: `
        <p><strong>CRISPR</strong> is the newest, fastest, most precise gene-editing tool ever made. It can find a specific gene and cut it, like find-and-replace in a word document.</p>
        <p>It uses two parts:</p>
        <ul>
          <li>A <strong>guide</strong> — a short piece of RNA that matches the spot you want to edit.</li>
          <li>A <strong>cutter protein</strong> — the molecular scissors that follows the guide and cuts the DNA there.</li>
        </ul>
        <p>CRISPR won the 2020 Nobel Prize. It's already curing sickle-cell disease — and raising hard questions about which kinds of editing we should and shouldn't do.</p>
      `,
      high: `
        <p><strong>CRISPR–Cas9</strong> is a bacterial defense system researchers turned into a precise gene-editing tool. It has two parts:</p>
        <ul>
          <li>A <strong>guide RNA</strong> — a short sequence you design to match the target DNA.</li>
          <li><strong>Cas9</strong> — a nuclease that follows the guide RNA to the matching DNA and cuts it.</li>
        </ul>
        <p>The cell's repair machinery patches the cut — often introducing small mutations that knock the gene out, or, with a template, inserting a precise new sequence.</p>
        <p>CRISPR won the 2020 Nobel Prize in Chemistry. It's already curing sickle-cell disease in patients — and opening up huge questions about what we should and shouldn't edit.</p>
      `
    }
  }
];
