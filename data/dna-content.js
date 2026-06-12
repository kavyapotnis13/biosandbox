/* =========================================================
   dna-content.js — intro flashcards for the DNA module
   Each card has a title and an HTML body. Add or reorder freely.
   ========================================================= */

const DNA_INTRO_CARDS = [
  {
    title: "DNA — the molecule of life",
    body: `
      <p>Every cell in your body carries a copy of your DNA — a twisted ladder where each rung is a pair of letters.</p>
      <p>Only four letters appear: <strong>A</strong>, <strong>T</strong>, <strong>C</strong>, and <strong>G</strong>. <strong>A</strong> always pairs with <strong>T</strong>, and <strong>C</strong> always pairs with <strong>G</strong>.</p>
      <p>The <em>order</em> of those letters is the instruction manual for building <em>you</em>.</p>
    `
  },
  {
    title: "What does \"DNA\" stand for?",
    body: `
      <p>DNA is short for <em>deoxyribonucleic acid</em>.</p>
      <p>The "acid" part comes from the <strong>phosphate groups</strong> in its sugar-phosphate backbone — they carry a negative charge, which is why DNA behaves like a weak acid in water.</p>
    `
  },
  {
    title: "Antiparallel strands",
    body: `
      <p>The two strands run in <em>opposite directions</em>. Each strand has a <strong>5' end</strong> ("five prime") and a <strong>3' end</strong>.</p>
      <p>Where one strand reads 5'→3' top to bottom, its partner reads 3'→5'. This matters a lot during replication — enzymes can only build a new strand in one direction.</p>
    `
  },
  {
    title: "Where DNA lives",
    body: `
      <p>In your cells, most DNA is packed into the <em>nucleus</em>, coiled around proteins called <em>histones</em> to form <em>chromatin</em>.</p>
      <p>A small loop also lives inside each <em>mitochondrion</em>, and plants have some inside <em>chloroplasts</em> too.</p>
      <p>Bacteria don't have a nucleus — their DNA floats free in a region called the <em>nucleoid</em>.</p>
    `
  },
  {
    title: "How much DNA is in a cell?",
    body: `
      <p>A single human cell holds about <strong>3 billion base pairs</strong>.</p>
      <p>Stretched end to end, that's roughly <strong>2 meters</strong> of molecule — packed into a nucleus only a few millionths of a meter wide.</p>
    `
  }
];

/* =========================================================
   DNA replication — six-step walkthrough
   Each step is one flashcard. Edit body HTML freely.
   ========================================================= */

const DNA_REPLICATION_STEPS = [
  {
    title: "Step 1 — Helicase unzips the helix",
    body: `
      <p>Replication starts at specific points along the DNA called <em>origins of replication</em>.</p>
      <p>The enzyme <strong>helicase</strong> latches onto the double helix and breaks the hydrogen bonds between paired bases (A–T, C–G), peeling the two strands apart like a zipper.</p>
      <p>The Y-shape where the strands split is called a <strong>replication fork</strong>.</p>
    `
  },
  {
    title: "Step 2 — Strands held open",
    body: `
      <p>Single strands love to pair back up. To stop that, <strong>single-strand binding proteins (SSBs)</strong> coat the separated strands and keep them open.</p>
      <p>Meanwhile, <strong>topoisomerase</strong> works ahead of the fork to relieve the twisting stress that builds up as the helix unwinds.</p>
    `
  },
  {
    title: "Step 3 — Primase lays a starter",
    body: `
      <p>DNA polymerase can't start a new strand from nothing — it needs something to attach to.</p>
      <p>The enzyme <strong>primase</strong> lays down a short <em>RNA primer</em> on each template strand. It's only a few nucleotides long, but it gives polymerase a place to begin.</p>
    `
  },
  {
    title: "Step 4 — Leading strand is built",
    body: `
      <p><strong>DNA polymerase</strong> reads the template strand and adds matching nucleotides one at a time: <strong>A</strong>↔<strong>T</strong>, <strong>C</strong>↔<strong>G</strong>.</p>
      <p>On one of the two templates, polymerase moves <em>toward</em> the replication fork and builds a single, continuous new strand — the <strong>leading strand</strong>.</p>
    `
  },
  {
    title: "Step 5 — Lagging strand, in fragments",
    body: `
      <p>The other template runs the opposite direction. Polymerase can only build 5'→3', so it has to work <em>away</em> from the fork.</p>
      <p>That strand is assembled in short pieces called <strong>Okazaki fragments</strong>. Each fragment needs its own RNA primer.</p>
    `
  },
  {
    title: "Step 6 — Ligase seals it shut",
    body: `
      <p>The RNA primers are swapped out for DNA, and the enzyme <strong>DNA ligase</strong> glues the Okazaki fragments together into one continuous strand.</p>
      <p>The result: <strong>two identical daughter helices</strong>. Each one has one original ("old") strand and one freshly built ("new") strand — which is why replication is called <em>semi-conservative</em>.</p>
    `
  }
];
