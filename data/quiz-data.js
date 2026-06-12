/* =========================================================
   quiz-data.js — high-school question pool, keyed by module slug.

   Each question:
     q          — the question text
     choices    — array of 4 answer strings
     correct    — index (0-3) of the correct choice
     explanation— shown after the student answers, regardless of
                  whether they got it right. Reinforces the lesson.

   The middle-school pool is a Phase 6 add — for now, the same
   pool is used for both tracks.

   TO ADD A QUESTION:
     1. Find the right module key below (cell / dna / protein).
     2. Push a new {q, choices, correct, explanation} object.
     3. No code changes needed — js/quiz.js samples 5 at random
        from whatever's in the array.
   ========================================================= */

const QUIZ_DATA = {

  cell: [
    {
      q: "What is the main job of the cell membrane?",
      choices: [
        "Storing the cell's DNA",
        "Producing energy for the cell",
        "Controlling what enters and leaves the cell",
        "Building proteins from amino acids"
      ],
      correct: 2,
      explanation: "The cell membrane is selectively permeable — it acts as the cell's gatekeeper, letting some molecules through while blocking others."
    },
    {
      q: "Which organelle is often called the \"powerhouse\" of the cell?",
      choices: ["Ribosome", "Mitochondrion", "Golgi apparatus", "Nucleus"],
      correct: 1,
      explanation: "Mitochondria use cellular respiration to convert food into ATP — the energy currency that powers nearly every cellular process."
    },
    {
      q: "Where in the cell is DNA stored?",
      choices: ["Cytoplasm", "Mitochondria only", "Nucleus", "Endoplasmic reticulum"],
      correct: 2,
      explanation: "Most of a cell's DNA lives inside the nucleus, coiled around histone proteins. A small amount also lives in mitochondria (and chloroplasts in plants)."
    },
    {
      q: "What do ribosomes do?",
      choices: [
        "Break down waste",
        "Build proteins by reading mRNA",
        "Produce ATP",
        "Store water and nutrients"
      ],
      correct: 1,
      explanation: "Ribosomes are the cell's protein factories. They read mRNA codons and link amino acids together to form polypeptides."
    },
    {
      q: "Which structure is found in plant cells but NOT animal cells?",
      choices: ["Mitochondria", "Cell wall", "Nucleus", "Ribosomes"],
      correct: 1,
      explanation: "Plant cells have a rigid cell wall made of cellulose just outside the cell membrane. Animal cells rely on the cytoskeleton and membrane alone for shape."
    },
    {
      q: "What is the role of the Golgi apparatus?",
      choices: [
        "Generates ATP for the cell",
        "Stores the cell's genetic code",
        "Modifies, sorts, and packages proteins for shipping",
        "Performs photosynthesis"
      ],
      correct: 2,
      explanation: "The Golgi receives proteins from the ER, modifies them (e.g. by adding sugar groups), and packages them into vesicles bound for their final destination."
    },
    {
      q: "Which two organelles have their own DNA, separate from the nucleus?",
      choices: [
        "Mitochondria and chloroplasts",
        "Ribosomes and lysosomes",
        "Golgi and ER",
        "Vacuoles and cell wall"
      ],
      correct: 0,
      explanation: "Both mitochondria and chloroplasts carry their own circular DNA — evidence that they descended from free-living bacteria absorbed by an ancient cell."
    },
    {
      q: "Lysosomes are best described as the cell's:",
      choices: ["Recycling center", "Power plant", "Library", "Delivery trucks"],
      correct: 0,
      explanation: "Lysosomes are filled with digestive enzymes that break down worn-out organelles, debris, and even invading bacteria — the cell's recycling system."
    },
    {
      q: "Where does photosynthesis take place in a plant cell?",
      choices: ["Mitochondria", "Vacuole", "Chloroplast", "Cell wall"],
      correct: 2,
      explanation: "Chloroplasts contain chlorophyll — the green pigment that captures sunlight and powers the reactions that build sugar from CO₂ and water."
    },
    {
      q: "What's the difference between rough ER and smooth ER?",
      choices: [
        "Rough ER stores DNA; smooth ER stores RNA",
        "Rough ER has ribosomes on its surface; smooth ER doesn't",
        "Rough ER is in plant cells only; smooth ER is in animal cells only",
        "There is no difference — \"rough\" and \"smooth\" are just two names for the same thing"
      ],
      correct: 1,
      explanation: "Rough ER is studded with ribosomes that synthesize proteins. Smooth ER lacks ribosomes and instead makes lipids and helps detoxify the cell."
    }
  ],

  dna: [
    {
      q: "What does DNA stand for?",
      choices: [
        "Dinucleic acid",
        "Deoxyribonucleic acid",
        "Diribosomal acid",
        "Double-helix nucleotide assembly"
      ],
      correct: 1,
      explanation: "DNA = deoxyribonucleic acid. \"Deoxy-\" refers to the sugar in its backbone (deoxyribose), and the \"acid\" comes from the phosphate groups."
    },
    {
      q: "In DNA, which bases pair with each other?",
      choices: [
        "A with G, C with T",
        "A with C, G with T",
        "A with T, C with G",
        "All bases can pair with any other base"
      ],
      correct: 2,
      explanation: "Adenine always pairs with thymine (A↔T) and cytosine always pairs with guanine (C↔G). This complementary pairing is what makes accurate copying possible."
    },
    {
      q: "Which enzyme unzips the DNA double helix at the start of replication?",
      choices: ["DNA polymerase", "Ligase", "Helicase", "Primase"],
      correct: 2,
      explanation: "Helicase breaks the hydrogen bonds between base pairs and pries the two strands apart, forming a Y-shaped replication fork."
    },
    {
      q: "The two strands of DNA run in opposite directions. This arrangement is called:",
      choices: ["Antiparallel", "Symmetric", "Reverse-coded", "Palindromic"],
      correct: 0,
      explanation: "One strand runs 5'→3' while its partner runs 3'→5'. This antiparallel arrangement matters because polymerase can only build a new strand in the 5'→3' direction."
    },
    {
      q: "Which enzyme builds the new DNA strand by adding nucleotides to the template?",
      choices: ["Helicase", "DNA polymerase", "RNA polymerase", "Topoisomerase"],
      correct: 1,
      explanation: "DNA polymerase reads the template strand and adds matching nucleotides (A↔T, C↔G) one at a time to extend the new strand."
    },
    {
      q: "On the lagging strand, DNA is synthesized in short pieces called:",
      choices: [
        "Telomeres",
        "Codons",
        "Okazaki fragments",
        "Introns"
      ],
      correct: 2,
      explanation: "Because polymerase can only build 5'→3', the lagging strand is made in short backwards bursts called Okazaki fragments — later glued together by ligase."
    },
    {
      q: "What does DNA ligase do in replication?",
      choices: [
        "Unwinds the helix",
        "Glues Okazaki fragments together into a continuous strand",
        "Lays down RNA primers",
        "Cuts DNA at specific sequences"
      ],
      correct: 1,
      explanation: "After the RNA primers are replaced with DNA, ligase seals the gaps between Okazaki fragments — turning the choppy lagging strand into one continuous piece."
    },
    {
      q: "Roughly how many base pairs are in a single human cell's DNA?",
      choices: ["3 thousand", "3 million", "3 billion", "3 trillion"],
      correct: 2,
      explanation: "Human cells contain about 3 billion base pairs — roughly 2 meters of DNA packed into a nucleus only a few millionths of a meter across."
    },
    {
      q: "Why is DNA replication described as \"semi-conservative\"?",
      choices: [
        "Half of the DNA is destroyed each time",
        "Each daughter helix has one original strand and one newly built strand",
        "Only half of the genes are copied per cell division",
        "The process happens only half as often as it could"
      ],
      correct: 1,
      explanation: "Each new double helix keeps one original (\"old\") strand and pairs it with one freshly built (\"new\") strand — half-conserved, half-new."
    },
    {
      q: "Why does primase lay down a short RNA primer before DNA polymerase starts?",
      choices: [
        "RNA is faster to read than DNA",
        "DNA polymerase needs an existing strand to attach new nucleotides to",
        "The primer protects the DNA from damage",
        "It marks where the gene begins"
      ],
      correct: 1,
      explanation: "DNA polymerase can extend a strand but can't start one from scratch — it needs a few nucleotides already in place. Primase provides that short RNA \"starter.\""
    }
  ],

  protein: [
    {
      q: "What is the central dogma of molecular biology?",
      choices: [
        "Protein → RNA → DNA",
        "DNA → RNA → Protein",
        "RNA → DNA → Protein",
        "DNA → Protein → RNA"
      ],
      correct: 1,
      explanation: "Genetic information flows from DNA to RNA (via transcription) to Protein (via translation). This is the headline rule for how cells use their DNA."
    },
    {
      q: "How many bases make up a single codon?",
      choices: ["2", "3", "4", "5"],
      correct: 1,
      explanation: "Codons are 3-base groups. With 4 bases in 3 positions, there are 4³ = 64 possible codons — coding for just 20 amino acids plus start/stop signals."
    },
    {
      q: "Which base does RNA use in place of thymine (T)?",
      choices: ["Adenine (A)", "Guanine (G)", "Uracil (U)", "Cytosine (C)"],
      correct: 2,
      explanation: "RNA uses uracil (U) wherever DNA would have thymine (T). So when DNA reads A, the matching mRNA base is U."
    },
    {
      q: "Where does transcription happen in a eukaryotic cell?",
      choices: ["Cytoplasm", "Nucleus", "Ribosome", "Mitochondrion"],
      correct: 1,
      explanation: "Transcription — copying DNA into mRNA — happens inside the nucleus. The finished mRNA then exits through a nuclear pore."
    },
    {
      q: "What is the \"start\" codon that signals the beginning of a protein?",
      choices: ["UAA", "AUG", "GCU", "UAG"],
      correct: 1,
      explanation: "AUG is the universal start codon — it both signals \"begin translation here\" and codes for the amino acid methionine."
    },
    {
      q: "Which of these is a STOP codon?",
      choices: ["AUG", "CUG", "UAA", "GGA"],
      correct: 2,
      explanation: "The three stop codons are UAA, UAG, and UGA. No tRNA matches them — instead, a release factor binds and the finished protein is released."
    },
    {
      q: "What molecule brings amino acids to the ribosome during translation?",
      choices: ["mRNA", "tRNA", "rRNA", "DNA"],
      correct: 1,
      explanation: "Each tRNA carries one specific amino acid and has a 3-base anticodon that pairs with the matching mRNA codon, delivering the right amino acid to the chain."
    },
    {
      q: "What kind of chemical bond links amino acids together in a protein?",
      choices: ["Hydrogen bond", "Ionic bond", "Peptide bond", "Phosphodiester bond"],
      correct: 2,
      explanation: "The ribosome joins adjacent amino acids with peptide bonds — covalent links between the carboxyl group of one amino acid and the amino group of the next."
    },
    {
      q: "Which enzyme reads DNA and builds the mRNA strand?",
      choices: ["DNA polymerase", "Helicase", "RNA polymerase", "Ligase"],
      correct: 2,
      explanation: "RNA polymerase latches onto the promoter, unwinds a section of DNA, and reads the template strand to build a complementary mRNA strand base by base."
    },
    {
      q: "Why do most amino acids have more than one codon that codes for them?",
      choices: [
        "Because some amino acids are more important than others",
        "Because there are 64 possible codons but only 20 amino acids",
        "Because the genetic code is different in every species",
        "Because amino acids randomly swap codons"
      ],
      correct: 1,
      explanation: "With 4³ = 64 possible codons coding for only 20 amino acids (plus stop), most amino acids end up with 2-6 different codons. The genetic code is \"redundant.\""
    }
  ],

  mitosis: [
    {
      q: "What is the main purpose of mitosis?",
      choices: [
        "To create sex cells with half the chromosomes",
        "To make two genetically identical daughter cells",
        "To digest old cellular waste",
        "To convert food into ATP"
      ],
      correct: 1,
      explanation: "Mitosis produces two daughter cells that are genetic clones of the parent — the basis for growth, healing, and replacing worn-out cells."
    },
    {
      q: "What are the four phases of mitosis, in order?",
      choices: [
        "Metaphase, prophase, anaphase, telophase",
        "Prophase, anaphase, metaphase, telophase",
        "Prophase, metaphase, anaphase, telophase",
        "Telophase, anaphase, metaphase, prophase"
      ],
      correct: 2,
      explanation: "Prophase → Metaphase → Anaphase → Telophase. (A common mnemonic: \"PMAT.\") Cytokinesis then physically splits the cell."
    },
    {
      q: "During which phase do chromosomes line up along the center of the cell?",
      choices: ["Prophase", "Metaphase", "Anaphase", "Telophase"],
      correct: 1,
      explanation: "In metaphase, spindle fibers pull every chromosome to the cell's equator — the \"metaphase plate\" — before separation begins."
    },
    {
      q: "What happens during anaphase?",
      choices: [
        "The nuclear envelope breaks down",
        "Sister chromatids are pulled apart toward opposite poles",
        "Two new nuclei form at each end of the cell",
        "The cell membrane pinches in to split the cell"
      ],
      correct: 1,
      explanation: "Anaphase is when the centromere splits and the spindle fibers drag each sister chromatid to opposite poles. Each pole ends up with a complete set."
    },
    {
      q: "What are the two identical copies of a chromosome (joined at the centromere) called?",
      choices: ["Daughter cells", "Sister chromatids", "Homologous pairs", "Spindle fibers"],
      correct: 1,
      explanation: "After the S phase of interphase, each chromosome has been duplicated. The two copies stay joined at the centromere as sister chromatids until anaphase."
    },
    {
      q: "What is cytokinesis?",
      choices: [
        "The condensation of chromosomes",
        "The physical splitting of one cell into two",
        "The duplication of DNA",
        "The formation of spindle fibers"
      ],
      correct: 1,
      explanation: "Cytokinesis follows mitosis. In animal cells the membrane pinches inward (cleavage furrow); in plants a cell plate forms across the middle."
    },
    {
      q: "Where in the cell cycle does DNA get copied?",
      choices: [
        "During prophase",
        "During the S phase of interphase",
        "During anaphase",
        "During cytokinesis"
      ],
      correct: 1,
      explanation: "DNA replication happens during the S (\"synthesis\") phase of interphase — well before mitosis begins. By prophase, each chromosome is already two sister chromatids."
    },
    {
      q: "What structure pulls chromosomes apart during anaphase?",
      choices: ["Centrosomes", "Centromeres", "Spindle fibers", "Cleavage furrow"],
      correct: 2,
      explanation: "Spindle fibers (microtubules) grow out from centrosomes at each pole. They attach to centromeres in metaphase and shorten to drag chromatids apart in anaphase."
    },
    {
      q: "How is cytokinesis different in plant cells compared to animal cells?",
      choices: [
        "Plant cells don't undergo cytokinesis at all",
        "Plant cells form a cell plate instead of a pinched cleavage furrow",
        "Plant cells split into three cells instead of two",
        "Plant cells skip cytokinesis and go straight to interphase"
      ],
      correct: 1,
      explanation: "Plant cells have rigid cell walls, so they can't pinch inward. Instead a cell plate forms down the middle and becomes the new cell wall separating the two daughters."
    },
    {
      q: "If a parent cell has 46 chromosomes, how many chromosomes does each daughter cell have after mitosis?",
      choices: ["23", "46", "92", "It depends on the cell type"],
      correct: 1,
      explanation: "Mitosis produces genetic clones — each daughter cell has the full 46 chromosomes. (Meiosis is the opposite process that halves the count for sex cells.)"
    }
  ],

  photosynthesis: [
    {
      q: "What is the overall equation for photosynthesis?",
      choices: [
        "C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + energy",
        "6 CO₂ + 6 H₂O + light → C₆H₁₂O₆ + 6 O₂",
        "6 O₂ + 6 H₂O + light → C₆H₁₂O₆ + 6 CO₂",
        "C₆H₁₂O₆ + light → 6 CO₂ + 6 H₂O"
      ],
      correct: 1,
      explanation: "Inputs: CO₂ + water + light. Outputs: glucose + oxygen. (The first option is cellular respiration — the reverse process.)"
    },
    {
      q: "Why do plants look green?",
      choices: [
        "Chlorophyll absorbs green light and reflects red and blue",
        "Chlorophyll absorbs red and blue light and reflects green",
        "Chloroplasts dye the plant's cells green",
        "Plants are made of green wax"
      ],
      correct: 1,
      explanation: "Chlorophyll mostly absorbs red and blue wavelengths. The green light you see is the wavelength a plant didn't use — it bounced off."
    },
    {
      q: "Where in a plant cell does photosynthesis happen?",
      choices: ["Mitochondria", "Nucleus", "Chloroplast", "Ribosome"],
      correct: 2,
      explanation: "Chloroplasts contain chlorophyll and the machinery for both the light reactions (in thylakoids) and the Calvin cycle (in the stroma)."
    },
    {
      q: "What are the two main stages of photosynthesis?",
      choices: [
        "Glycolysis and the Krebs cycle",
        "Light reactions and the Calvin cycle",
        "Transcription and translation",
        "Mitosis and cytokinesis"
      ],
      correct: 1,
      explanation: "Light reactions (in thylakoids) capture energy as ATP and NADPH. The Calvin cycle (in the stroma) uses that energy to build sugar from CO₂."
    },
    {
      q: "Where in the chloroplast do the light reactions take place?",
      choices: ["Stroma", "Thylakoids (the grana)", "Outer membrane", "Cell wall"],
      correct: 1,
      explanation: "Light reactions happen inside the thylakoid membranes — stacks of these flattened sacs are called grana. The stroma is where the Calvin cycle runs."
    },
    {
      q: "What molecule is split during the light reactions, releasing oxygen?",
      choices: ["Glucose (C₆H₁₂O₆)", "Carbon dioxide (CO₂)", "Water (H₂O)", "ATP"],
      correct: 2,
      explanation: "Photolysis splits water (H₂O) into H⁺ ions, electrons, and O₂. The oxygen we breathe is essentially a waste product of this step."
    },
    {
      q: "What two energy-carrying molecules do the light reactions produce?",
      choices: [
        "Glucose and oxygen",
        "ATP and NADPH",
        "Carbon dioxide and water",
        "RuBP and 3-PGA"
      ],
      correct: 1,
      explanation: "ATP stores energy in its phosphate bonds and NADPH carries high-energy electrons. Both get spent by the Calvin cycle to build sugar."
    },
    {
      q: "What gas is taken IN during the Calvin cycle?",
      choices: ["Oxygen (O₂)", "Carbon dioxide (CO₂)", "Nitrogen (N₂)", "Hydrogen (H₂)"],
      correct: 1,
      explanation: "The Calvin cycle is where the plant \"fixes\" carbon — it takes inorganic CO₂ from the air and incorporates it into organic sugar molecules."
    },
    {
      q: "What enzyme attaches CO₂ to RuBP at the start of the Calvin cycle?",
      choices: ["DNA polymerase", "RuBisCO", "ATP synthase", "Helicase"],
      correct: 1,
      explanation: "RuBisCO catalyzes carbon fixation — it grabs a CO₂ molecule and attaches it to RuBP. It's thought to be the most abundant protein on Earth."
    },
    {
      q: "What's the final sugar product of the Calvin cycle that the plant uses for energy?",
      choices: ["RuBP", "3-PGA", "Glucose (built from G3P)", "Chlorophyll"],
      correct: 2,
      explanation: "Each turn of the cycle nets G3P; two G3P molecules combine to make one glucose. The plant uses glucose for energy and as a building block for cellulose, starch, etc."
    }
  ],

  respiration: [
    {
      q: "What is the overall equation for cellular respiration?",
      choices: [
        "6 CO₂ + 6 H₂O + light → C₆H₁₂O₆ + 6 O₂",
        "C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + ATP",
        "ATP + 6 O₂ → C₆H₁₂O₆ + 6 H₂O",
        "C₆H₁₂O₆ → 2 ATP + lactic acid"
      ],
      correct: 1,
      explanation: "Respiration is essentially photosynthesis in reverse: it consumes glucose and oxygen, and produces CO₂, water, and ATP."
    },
    {
      q: "What molecule do cells use to store and transport energy?",
      choices: ["DNA", "Glucose", "ATP", "Oxygen"],
      correct: 2,
      explanation: "ATP (adenosine triphosphate) is the cell's energy currency. Snapping off one of its phosphate groups releases energy that powers other cellular work."
    },
    {
      q: "What are the three stages of cellular respiration, in order?",
      choices: [
        "Krebs cycle, glycolysis, electron transport chain",
        "Glycolysis, Krebs cycle, electron transport chain",
        "Glycolysis, electron transport chain, Krebs cycle",
        "Light reactions, Calvin cycle, glycolysis"
      ],
      correct: 1,
      explanation: "Glycolysis (in the cytoplasm) → Krebs cycle (in the matrix) → Electron transport chain (along the inner mitochondrial membrane)."
    },
    {
      q: "Where does glycolysis take place?",
      choices: ["Mitochondrial matrix", "Inner mitochondrial membrane", "Cytoplasm", "Nucleus"],
      correct: 2,
      explanation: "Glycolysis happens in the cytoplasm — outside the mitochondria. It's the only stage that doesn't require oxygen, which is why anaerobic organisms can do it."
    },
    {
      q: "What does glycolysis produce from one glucose molecule?",
      choices: [
        "2 pyruvate, 2 ATP (net), and 2 NADH",
        "1 pyruvate and 38 ATP",
        "6 CO₂ and 6 H₂O",
        "1 ATP and 1 oxygen molecule"
      ],
      correct: 0,
      explanation: "Glycolysis splits one glucose into two pyruvate molecules, netting 2 ATP and 2 NADH. Small ATP yield — the bulk comes later in the mitochondria."
    },
    {
      q: "Where in the mitochondrion does the Krebs cycle take place?",
      choices: ["Outer membrane", "Inner membrane", "Matrix (the inner fluid)", "Intermembrane space"],
      correct: 2,
      explanation: "The Krebs cycle runs in the matrix — the fluid-filled center of the mitochondrion — where pyruvate gets stripped of its carbons as CO₂."
    },
    {
      q: "What molecules do the Krebs cycle and glycolysis produce that the electron transport chain uses as fuel?",
      choices: [
        "Glucose and pyruvate",
        "NADH and FADH₂",
        "CO₂ and H₂O",
        "Oxygen and water"
      ],
      correct: 1,
      explanation: "NADH and FADH₂ are electron carriers. They drop their electrons into the ETC, which is where most of the ATP gets made."
    },
    {
      q: "What is the role of oxygen in cellular respiration?",
      choices: [
        "It is split apart to release energy",
        "It accepts electrons at the end of the electron transport chain, forming water",
        "It is a fuel that gets broken down for energy",
        "It is produced as a waste product"
      ],
      correct: 1,
      explanation: "Oxygen is the FINAL electron acceptor. Without it, electrons back up in the chain, ATP production collapses, and cells die — which is why you need to breathe."
    },
    {
      q: "Which stage produces the most ATP?",
      choices: [
        "Glycolysis",
        "Krebs cycle",
        "The electron transport chain (with ATP synthase)",
        "All three produce equal amounts"
      ],
      correct: 2,
      explanation: "The ETC + ATP synthase produces ~28 of the ~30-32 ATP per glucose. Glycolysis and Krebs combined make only about 4."
    },
    {
      q: "What enzyme uses the H⁺ gradient across the inner membrane to make ATP?",
      choices: ["DNA polymerase", "RuBisCO", "ATP synthase", "Helicase"],
      correct: 2,
      explanation: "ATP synthase is a turbine-like enzyme. As H⁺ ions rush through it down their concentration gradient, the rotor spins and forces ADP + Pi together into ATP."
    }
  ]

};

/* Convenience helper: returns the question pool for a module slug,
   or null if no such pool exists. */
function getQuizPool(slug) {
  return QUIZ_DATA[slug] || null;
}
