/* =========================================================
   dna-content.js — intro flashcards for the DNA module

   Each card has body: { middle, high }.
   ========================================================= */

const DNA_INTRO_CARDS = [
  {
    title: "DNA — the molecule of life",
    body: {
      middle: `
        <p>Every single cell in your body holds a copy of your <strong>DNA</strong> — a long twisted ladder that tells the cell how to build you.</p>
        <p>The ladder uses just <strong>four letters</strong>: A, T, C, and G. They always pair up the same way: <strong>A goes with T, and C goes with G</strong>.</p>
        <p>The order of those letters — millions of them in a row — is the actual instruction manual for making a person.</p>
      `,
      high: `
        <p>Every cell in your body carries a copy of your DNA — a twisted ladder where each rung is a pair of letters.</p>
        <p>Only four letters appear: <strong>A</strong>, <strong>T</strong>, <strong>C</strong>, and <strong>G</strong>. <strong>A</strong> always pairs with <strong>T</strong>, and <strong>C</strong> always pairs with <strong>G</strong>.</p>
        <p>The <em>order</em> of those letters is the instruction manual for building <em>you</em>.</p>
      `
    }
  },
  {
    title: "What does \"DNA\" stand for?",
    body: {
      middle: `
        <p>DNA stands for <strong>deoxyribonucleic acid</strong>. Big word, simpler meaning:</p>
        <ul>
          <li>"Deoxyribo" is the name of the sugar in its backbone.</li>
          <li>"Nucleic" because it was first found in cell nuclei.</li>
          <li>"Acid" because it has a slightly negative charge.</li>
        </ul>
      `,
      high: `
        <p>DNA is short for <em>deoxyribonucleic acid</em>.</p>
        <p>The "acid" part comes from the <strong>phosphate groups</strong> in its sugar-phosphate backbone — they carry a negative charge, which is why DNA behaves like a weak acid in water.</p>
      `
    }
  },
  {
    title: "The two strands run opposite ways",
    body: {
      middle: `
        <p>The DNA ladder is actually two strings twisted together. Here's a weird fact: the two strings run in <strong>opposite directions</strong> from each other.</p>
        <p>One strand runs "top to bottom" while its partner runs "bottom to top." This matters because the enzymes that copy DNA can only work in one direction — so they have to copy the two strands differently.</p>
      `,
      high: `
        <p>The two strands run in <em>opposite directions</em>. Each strand has a <strong>5' end</strong> ("five prime") and a <strong>3' end</strong>.</p>
        <p>Where one strand reads 5'→3' top to bottom, its partner reads 3'→5'. This matters a lot during replication — enzymes can only build a new strand in one direction.</p>
      `
    }
  },
  {
    title: "Where DNA lives",
    body: {
      middle: `
        <p>Most of your DNA is stored inside a special pouch in each of your cells called the <strong>nucleus</strong>. It's coiled up around tiny protein spools to save space.</p>
        <p>There's also a tiny bit of DNA inside your <strong>mitochondria</strong> (the energy-making parts of cells). Plants have a bit inside their chloroplasts too.</p>
        <p>Bacteria are different — they don't have a nucleus, so their DNA just floats freely in the cell.</p>
      `,
      high: `
        <p>In your cells, most DNA is packed into the <em>nucleus</em>, coiled around proteins called <em>histones</em> to form <em>chromatin</em>.</p>
        <p>A small loop also lives inside each <em>mitochondrion</em>, and plants have some inside <em>chloroplasts</em> too.</p>
        <p>Bacteria don't have a nucleus — their DNA floats free in a region called the <em>nucleoid</em>.</p>
      `
    }
  },
  {
    title: "How much DNA is in a cell?",
    body: {
      middle: `
        <p>A single human cell has about <strong>3 billion letter pairs</strong> of DNA.</p>
        <p>If you stretched it out straight, the DNA from just <em>one cell</em> would be about <strong>2 meters long</strong> — taller than most people! And it's all squeezed into a tiny dot you'd need a microscope to see.</p>
      `,
      high: `
        <p>A single human cell holds about <strong>3 billion base pairs</strong>.</p>
        <p>Stretched end to end, that's roughly <strong>2 meters</strong> of molecule — packed into a nucleus only a few millionths of a meter wide.</p>
      `
    }
  }
];

/* =========================================================
   DNA replication — six-step walkthrough
   Each step is one flashcard. Edit body HTML freely.
   ========================================================= */

const DNA_REPLICATION_STEPS = [
  {
    title: "Step 1 — Helicase unzips the helix",
    body: {
      middle: `
        <p>To copy itself, DNA first has to <strong>unzip</strong>.</p>
        <p>A special enzyme called <strong>helicase</strong> ("hel-uh-case") clamps onto the DNA and pulls the two strands apart, like a zipper coming undone. It can do this because the bonds between the A-T and C-G pairs are weak and easy to break.</p>
        <p>The Y-shape where the strands have come apart is called a <strong>replication fork</strong>.</p>
      `,
      high: `
        <p>Replication starts at specific points along the DNA called <em>origins of replication</em>.</p>
        <p>The enzyme <strong>helicase</strong> latches onto the double helix and breaks the hydrogen bonds between paired bases (A–T, C–G), peeling the two strands apart like a zipper.</p>
        <p>The Y-shape where the strands split is called a <strong>replication fork</strong>.</p>
      `
    }
  },
  {
    title: "Step 2 — Hold the strands open",
    body: {
      middle: `
        <p>The two strands really want to snap back together — they're like magnets that want to reconnect. So special <strong>holder proteins</strong> grab the open strands and keep them apart.</p>
        <p>Another enzyme works ahead of the fork to keep the rest of the DNA from twisting up like a tangled cord.</p>
      `,
      high: `
        <p>Single strands love to pair back up. To stop that, <strong>single-strand binding proteins (SSBs)</strong> coat the separated strands and keep them open.</p>
        <p>Meanwhile, <strong>topoisomerase</strong> works ahead of the fork to relieve the twisting stress that builds up as the helix unwinds.</p>
      `
    }
  },
  {
    title: "Step 3 — A starter is laid down",
    body: {
      middle: `
        <p>The main copying enzyme can't start a new strand from absolutely nothing — it needs something already there to attach to.</p>
        <p>So a different enzyme called <strong>primase</strong> drops a tiny "starter" piece of RNA onto each strand. It's just a few letters long, but it gives the next enzyme a place to begin.</p>
      `,
      high: `
        <p>DNA polymerase can't start a new strand from nothing — it needs something to attach to.</p>
        <p>The enzyme <strong>primase</strong> lays down a short <em>RNA primer</em> on each template strand. It's only a few nucleotides long, but it gives polymerase a place to begin.</p>
      `
    }
  },
  {
    title: "Step 4 — The leading strand is copied",
    body: {
      middle: `
        <p>Now the big enzyme — <strong>DNA polymerase</strong> — gets to work. It reads each letter on the old strand and adds the matching letter on the new strand: A-T, C-G, never any mistakes (well, almost never).</p>
        <p>On one of the two strands, the polymerase moves <em>toward</em> the unzipping fork and builds a smooth, continuous new strand. This is called the <strong>leading strand</strong>.</p>
      `,
      high: `
        <p><strong>DNA polymerase</strong> reads the template strand and adds matching nucleotides one at a time: <strong>A</strong>↔<strong>T</strong>, <strong>C</strong>↔<strong>G</strong>.</p>
        <p>On one of the two templates, polymerase moves <em>toward</em> the replication fork and builds a single, continuous new strand — the <strong>leading strand</strong>.</p>
      `
    }
  },
  {
    title: "Step 5 — The lagging strand, in pieces",
    body: {
      middle: `
        <p>The other strand is trickier because it runs the opposite direction. The polymerase can only work in one direction, so on this strand it has to move <em>away</em> from the fork.</p>
        <p>That means the new strand gets built in <strong>short pieces</strong> instead of one continuous strand. Each piece needs its own starter to begin.</p>
      `,
      high: `
        <p>The other template runs the opposite direction. Polymerase can only build 5'→3', so it has to work <em>away</em> from the fork.</p>
        <p>That strand is assembled in short pieces called <strong>Okazaki fragments</strong>. Each fragment needs its own RNA primer.</p>
      `
    }
  },
  {
    title: "Step 6 — Glue it all together",
    body: {
      middle: `
        <p>Once all the pieces are built, an enzyme called <strong>ligase</strong> ("lye-gase") acts like glue and connects them into one continuous new strand.</p>
        <p>The result: <strong>two identical DNA molecules</strong>, each with one original old strand and one freshly built new strand. That's why this process is called "semi-conservative" — half of the original is kept in each copy.</p>
      `,
      high: `
        <p>The RNA primers are swapped out for DNA, and the enzyme <strong>DNA ligase</strong> glues the Okazaki fragments together into one continuous strand.</p>
        <p>The result: <strong>two identical daughter helices</strong>. Each one has one original ("old") strand and one freshly built ("new") strand — which is why replication is called <em>semi-conservative</em>.</p>
      `
    }
  }
];
