/* Sub-unit check-ins for Biodiversity. */

const BIODIVERSITY_CHECKINS = {
  intro: [
    { type: 'mc', q: "Biodiversity is measured at three levels. Which is NOT one of them?",
      choices: ['Genetic diversity', 'Species diversity', 'Ecosystem diversity', 'Individual behavior'],
      correct: 3,
      explanation: "The three levels are genetic (within a species), species (within a community), and ecosystem (across a region)." },
    { type: 'tf', q: "The number of described species is close to the total number that exist.",
      correct: false,
      explanation: "About 2 million species are described. Estimates put the true total at 8-10 million eukaryotes, plus a vast microbial world we've barely started to catalog." },
    { type: 'match', q: "Match each biodiversity term to its meaning.",
      pairs: [
        { left: 'Species richness',   right: 'Number of species present' },
        { left: 'Species evenness',   right: 'How balanced their abundances are' },
        { left: 'Genetic diversity',  right: 'Variation within a species' },
        { left: 'Ecosystem services', right: 'Benefits nature provides us' }
      ],
      explanation: "These are the building blocks — richness (how many), evenness (how balanced), plus the layers around them." },
    { type: 'mc', q: "About what percent of modern medicines come from PLANTS or MICROBES?",
      choices: ['5%', '25%', '75%', '99%'],
      correct: 1,
      explanation: "Roughly 25% of modern drugs are derived from plants or microbes. Every extinction potentially loses a future medicine." }
  ],
  tree: [
    { type: 'mc', q: "The three DOMAINS of life are:",
      choices: ['Plants / Animals / Fungi', 'Bacteria / Archaea / Eukarya', 'Protists / Prokaryotes / Eukaryotes', 'Land / Water / Air'],
      correct: 1,
      explanation: "Woese classified all life into three domains based on ribosomal RNA: Bacteria, Archaea, and Eukarya. Archaea look like bacteria but are genetically closer to us." },
    { type: 'tf', q: "Archaea and Bacteria are very closely related evolutionarily.",
      correct: false,
      explanation: "Despite looking similar (both prokaryotes), Archaea share more recent ancestry with Eukarya. Molecular data rewrote what we thought based on appearance alone." },
    { type: 'match', q: "Match each domain or kingdom to an example.",
      pairs: [
        { left: 'Bacteria',   right: 'E. coli' },
        { left: 'Archaea',    right: 'Methanogens in swamps' },
        { left: 'Fungi',      right: 'Mushrooms' },
        { left: 'Animalia',   right: 'Sponges' }
      ],
      explanation: "Just enough grouping to place any organism you meet. Then you can zoom in with kingdom → phylum → order..." },
    { type: 'mc', q: "Binomial nomenclature (like Homo sapiens) uses:",
      choices: ['Two-letter codes', 'Genus + species names in Latin', 'DNA barcodes', 'Colors'],
      correct: 1,
      explanation: "Linnaeus invented this in the 1700s: every species gets a two-word Latin name, Genus + species, always italicized. Universal across the sciences." }
  ],
  hotspots: [
    { type: 'mc', q: "Species diversity is HIGHEST:",
      choices: ['At the poles', 'In deserts', 'In the tropics', 'In the deep ocean'],
      correct: 2,
      explanation: "The tropics have the highest biodiversity — more sunlight, stable climate, and long uninterrupted evolutionary time to diversify." },
    { type: 'tf', q: "Islands typically have LOWER endemism than continents.",
      correct: false,
      explanation: "Islands have HIGH endemism — species evolve in isolation. Madagascar's lemurs, Galápagos tortoises, and Australian marsupials all exist there and nowhere else." },
    { type: 'match', q: "Match each hotspot region to a signature group.",
      pairs: [
        { left: 'Amazon rainforest',     right: 'Macaws, jaguars, poison frogs' },
        { left: 'Coral Triangle (SE Asia)', right: 'Most fish + coral species on Earth' },
        { left: 'Madagascar',            right: 'Lemurs (endemic)' },
        { left: 'Cape Floristic Region', right: 'Thousands of endemic plants' }
      ],
      explanation: "Biodiversity hotspots aren't just big — they're places with high richness AND high endemism, meaning what you lose there, you lose everywhere." },
    { type: 'mc', q: "Why does the TROPICS have so much more diversity?",
      choices: ['Only one reason: more sunlight', 'More energy + stable climate + long uninterrupted evolutionary time', 'Cold-climate species die out', 'Random luck'],
      correct: 1,
      explanation: "Multiple factors combine: more solar energy → more productivity, stable climate → specialization, no ice ages resetting things → millions of years of accumulation." }
  ]
};
