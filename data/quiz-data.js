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
    },
    {
      q: "When oxygen is unavailable, your muscle cells switch to lactic acid fermentation. What is the main reason they bother?",
      choices: [
        "To make a lot more ATP than normal respiration",
        "To regenerate NAD⁺ so glycolysis can keep producing 2 ATP per glucose",
        "To produce oxygen as a byproduct",
        "To get rid of carbon dioxide"
      ],
      correct: 1,
      explanation: "Fermentation barely makes any new ATP — all 2 ATP come from glycolysis itself. The point of fermentation is to regenerate NAD⁺ by dumping electrons onto pyruvate, so glycolysis doesn't stall. It's a stopgap that keeps energy flowing when O₂ is scarce."
    },
    {
      q: "Yeast in bread dough perform alcoholic fermentation. What are the products?",
      choices: [
        "Lactic acid and ATP",
        "CO₂ and ethanol",
        "Glucose and water",
        "Oxygen and pyruvate"
      ],
      correct: 1,
      explanation: "In alcoholic fermentation, pyruvate is converted to acetaldehyde + CO₂, then NADH reduces acetaldehyde to ethanol (regenerating NAD⁺). The CO₂ makes bread rise; the ethanol bakes off in the oven and stays in beer."
    }
  ],

  heredity: [
    {
      q: "What is an allele?",
      choices: [
        "A type of cell that copies DNA",
        "A specific version of a gene",
        "A physical trait that an organism shows",
        "A chromosome pair"
      ],
      correct: 1,
      explanation: "An allele is one particular version of a gene — like a 'brown eyes' version vs. a 'blue eyes' version of the eye-color gene. Each person inherits two alleles per gene, one from each parent."
    },
    {
      q: "An organism with the genotype Bb is best described as:",
      choices: [
        "Homozygous dominant",
        "Homozygous recessive",
        "Heterozygous",
        "Hemizygous"
      ],
      correct: 2,
      explanation: "Two different alleles for the same gene (one dominant, one recessive) make the individual heterozygous. Two identical alleles (BB or bb) would be homozygous."
    },
    {
      q: "What's the difference between genotype and phenotype?",
      choices: [
        "Genotype is the trait you see, phenotype is the alleles you carry",
        "Genotype is the alleles you carry, phenotype is the trait that shows up",
        "They mean the same thing",
        "Genotype is dominant alleles only; phenotype is recessive only"
      ],
      correct: 1,
      explanation: "Genotype = the genetic code you carry (e.g., Bb). Phenotype = the physical trait that actually shows (e.g., brown eyes). Two people with different genotypes can have the same phenotype."
    },
    {
      q: "Two heterozygous parents (Bb × Bb) have a child. What is the probability the child shows the recessive trait?",
      choices: ["0%", "25%", "50%", "75%"],
      correct: 1,
      explanation: "A Bb × Bb cross gives 1 BB : 2 Bb : 1 bb. Only the bb offspring (1 out of 4 boxes = 25%) show the recessive phenotype."
    },
    {
      q: "In a Bb × Bb cross, what is the expected phenotype ratio?",
      choices: [
        "1 dominant : 1 recessive",
        "3 dominant : 1 recessive",
        "1 dominant : 3 recessive",
        "All dominant"
      ],
      correct: 1,
      explanation: "Three of the four boxes (BB, Bb, Bb) show the dominant trait. Only bb shows the recessive trait. That 3:1 phenotype ratio is the most famous prediction in Mendelian genetics."
    },
    {
      q: "A red snapdragon (RR) is crossed with a white snapdragon (WW), and all offspring are pink. This is an example of:",
      choices: [
        "Complete dominance",
        "Codominance",
        "Incomplete dominance",
        "Sex-linked inheritance"
      ],
      correct: 2,
      explanation: "In incomplete dominance, the heterozygote (RW) shows a BLENDED phenotype — pink, halfway between red and white. Neither allele fully overrides the other."
    },
    {
      q: "A person with blood type AB has both A and B antigens on their red blood cells. This is an example of:",
      choices: [
        "Incomplete dominance",
        "Codominance",
        "Sex linkage",
        "Recessive inheritance"
      ],
      correct: 1,
      explanation: "In codominance, BOTH alleles are fully expressed at the same time — you see distinct A antigens AND distinct B antigens, not a blend. The IA and IB alleles are codominant."
    },
    {
      q: "Why is red-green colorblindness much more common in males than females?",
      choices: [
        "Males have only one X chromosome, so a single recessive allele shows up",
        "The colorblindness gene is on the Y chromosome",
        "Males have more cone cells than females",
        "The allele is dominant in males but recessive in females"
      ],
      correct: 0,
      explanation: "The colorblindness allele is recessive and lives on the X chromosome. Males (XY) have only one X, so a single copy of the recessive allele has nothing to mask it. Females (XX) usually need two copies to show the trait."
    },
    {
      q: "Mendel's Law of Segregation states that:",
      choices: [
        "Genes on different chromosomes always travel together",
        "The two alleles for a gene separate from each other when gametes form",
        "Dominant alleles always mutate into recessive alleles",
        "Traits blend together in the offspring"
      ],
      correct: 1,
      explanation: "During meiosis, the two alleles an organism carries for a gene separate, so each gamete (sperm/egg) ends up with just ONE of them. Fertilization then reunites two alleles in the offspring."
    },
    {
      q: "A heterozygous individual (Bb) is sometimes called a 'carrier' for a recessive trait because:",
      choices: [
        "They show the recessive trait themselves",
        "They carry a recessive allele but don't show the trait",
        "They cannot pass the trait to their children",
        "They have two recessive alleles"
      ],
      correct: 1,
      explanation: "A Bb individual shows the dominant phenotype (because B masks b) but still 'carries' the recessive allele. Two carriers can have a bb child even though neither parent shows the recessive trait."
    },
    {
      q: "The ABO blood group is an example of multiple alleles because:",
      choices: [
        "Every person has more than two alleles for the gene",
        "There are three possible alleles (IA, IB, i) in the population, even though each person has only two",
        "The trait is determined by multiple genes",
        "Blood type changes with age"
      ],
      correct: 1,
      explanation: "Multiple alleles means there are MORE than two versions of a gene in the gene pool. Each individual still only carries two of them — but across the population, three different ABO alleles circulate, giving four possible blood types."
    }
  ],

  selection: [
    {
      q: "Which of the following is NOT one of Darwin's four ingredients for natural selection?",
      choices: [
        "Variation among individuals",
        "Inheritance of traits",
        "Equal survival of all individuals",
        "Many generations of time"
      ],
      correct: 2,
      explanation: "Darwin's four ingredients are variation, inheritance, DIFFERENTIAL survival (some traits help more than others), and time. Equal survival is the opposite of what selection requires."
    },
    {
      q: "In biology, 'fitness' is best defined as:",
      choices: [
        "Physical strength and endurance",
        "Number of surviving, reproducing offspring",
        "Lifespan",
        "Brain size relative to body size"
      ],
      correct: 1,
      explanation: "Fitness is purely about reproductive success — how many offspring survive to reproduce themselves. A frail bacterium with a million descendants has more fitness than a tiger with zero."
    },
    {
      q: "A population of peppered moths shifts from mostly light to mostly dark after industrial pollution darkens tree bark. This is an example of:",
      choices: [
        "Stabilizing selection",
        "Disruptive selection",
        "Directional selection",
        "Genetic drift"
      ],
      correct: 2,
      explanation: "Directional selection favors one extreme of a trait — here, darker color — over the others. The population shifts in that direction over generations."
    },
    {
      q: "A volcanic eruption kills 95% of a population. The survivors carry whatever allele frequencies they happened to have, which are unlikely to match the original gene pool. This is:",
      choices: [
        "Founder effect",
        "Bottleneck effect",
        "Stabilizing selection",
        "Gene flow"
      ],
      correct: 1,
      explanation: "A bottleneck happens when a catastrophe drastically reduces a population. The few survivors are essentially a random sample, so allele frequencies can change purely by chance — not by selection."
    },
    {
      q: "What is the ultimate source of new genetic variation in a population?",
      choices: [
        "Natural selection",
        "Genetic drift",
        "Mutation",
        "Gene flow"
      ],
      correct: 2,
      explanation: "Mutation is the ONLY mechanism that introduces brand-new alleles. Selection, drift, and gene flow can only shuffle around variation that mutation has already produced."
    },
    {
      q: "Hardy-Weinberg equilibrium describes a population that is:",
      choices: [
        "Evolving rapidly",
        "NOT evolving — used as a baseline to detect when evolution IS happening",
        "Going extinct",
        "Undergoing speciation"
      ],
      correct: 1,
      explanation: "Hardy-Weinberg is a null hypothesis. If real allele frequencies match the prediction, no evolution is occurring. If they don't match, one of the five conditions has been violated — meaning some evolutionary mechanism is at work."
    },
    {
      q: "In a population at Hardy-Weinberg equilibrium, 9% of individuals show a recessive disorder (q² = 0.09). What fraction of the population are heterozygous carriers?",
      choices: ["3%", "21%", "42%", "49%"],
      correct: 2,
      explanation: "q² = 0.09 → q = 0.3, so p = 0.7. Carriers = 2pq = 2(0.7)(0.3) = 0.42 = 42%. The hidden carrier pool is usually MUCH larger than the visibly affected pool."
    },
    {
      q: "Which condition is NOT required for a population to remain in Hardy-Weinberg equilibrium?",
      choices: [
        "No natural selection",
        "No mutation",
        "Equal numbers of males and females",
        "Random mating"
      ],
      correct: 2,
      explanation: "The five conditions are: no selection, no mutation, no gene flow, random mating, and very large population. Sex ratio isn't on the list — H-W only cares about the gene-pool conditions."
    },
    {
      q: "Two populations of fish get separated by a new lava flow. Over millions of years they evolve into separate species. This is:",
      choices: [
        "Sympatric speciation",
        "Allopatric speciation",
        "Convergent evolution",
        "Adaptive radiation"
      ],
      correct: 1,
      explanation: "Allopatric speciation ('different place') happens when a physical barrier splits a population. With no gene flow between them, the two halves evolve independently until they can no longer interbreed."
    },
    {
      q: "A horse and a donkey can mate, but their offspring (mules) are sterile. Under the biological species concept, this means:",
      choices: [
        "Horses and donkeys are the same species",
        "Horses and donkeys are different species, because mules can't reproduce",
        "Mules are a third species",
        "The biological species concept doesn't apply here"
      ],
      correct: 1,
      explanation: "The biological species concept requires that members can interbreed AND produce FERTILE offspring. Sterile hybrids (postzygotic isolation) mean the parents are different species."
    },
    {
      q: "After dinosaurs went extinct, mammals diversified into thousands of new forms in a relatively short time — bats, whales, primates, rodents, hoofed grazers. This is an example of:",
      choices: [
        "Sympatric speciation",
        "Adaptive radiation",
        "Stabilizing selection",
        "Gene flow"
      ],
      correct: 1,
      explanation: "Adaptive radiation is rapid diversification of one ancestral group into many specialized descendants, usually after a mass extinction frees up empty ecological niches."
    },
    {
      q: "Your arm, a bat's wing, and a whale's flipper all share the same underlying bone arrangement (humerus, radius/ulna, carpals, digits). This is evidence of:",
      choices: [
        "Convergent evolution",
        "Common ancestry — these are homologous structures inherited from a shared ancestor",
        "Coincidence",
        "Lamarckian inheritance"
      ],
      correct: 1,
      explanation: "Homologous structures — same underlying anatomy, different uses — point to a shared ancestor that had that blueprint. Compare with analogous structures (bird wing and insect wing) which evolved independently and don't share the same bones."
    },
    {
      q: "The Miller-Urey experiment (1953) showed that:",
      choices: [
        "Cells can spontaneously form from oil and water",
        "Lightning + early-Earth gases can produce amino acids spontaneously",
        "Bacteria can evolve antibiotic resistance",
        "DNA can replicate without enzymes"
      ],
      correct: 1,
      explanation: "Miller and Urey passed sparks through a mix of CH₄, NH₃, H₂, and H₂O (early-atmosphere conditions) and recovered amino acids. The experiment showed that the building blocks of life can arise from inorganic chemistry under plausible early-Earth conditions."
    },
    {
      q: "The RNA world hypothesis proposes that early life used RNA as both information storage AND catalyst. The key reason this is plausible is:",
      choices: [
        "RNA is more stable than DNA",
        "RNA molecules called ribozymes can catalyze chemical reactions, including their own replication",
        "RNA stores more information than DNA",
        "RNA can form a double helix"
      ],
      correct: 1,
      explanation: "Ribozymes — catalytic RNA molecules — are real and known. An ancestral self-replicating ribozyme would do both jobs (store info AND copy itself), bridging the chicken-and-egg problem of which came first, proteins or DNA."
    }
  ],

  ecology: [
    {
      q: "Which of the following is an ABIOTIC factor in an ecosystem?",
      choices: [
        "Bacteria in the soil",
        "Earthworms",
        "Soil pH",
        "Tree roots"
      ],
      correct: 2,
      explanation: "Abiotic factors are non-living parts of the environment — sunlight, temperature, water, soil chemistry (including pH). The other three are all living organisms (biotic)."
    },
    {
      q: "Which level of organization includes both living organisms AND their non-living environment?",
      choices: [
        "Population",
        "Community",
        "Ecosystem",
        "Biome"
      ],
      correct: 2,
      explanation: "An ecosystem = the community (all populations of all species) PLUS the abiotic environment (water, soil, climate). Adding the non-living part is what distinguishes ecosystems from communities."
    },
    {
      q: "If producers in an ecosystem capture 10,000 kcal of energy, roughly how much will reach the tertiary (third-level) consumers?",
      choices: ["10 kcal", "100 kcal", "1,000 kcal", "3,000 kcal"],
      correct: 0,
      explanation: "The 10% rule: only ~10% of energy passes to each next level. 10,000 → 1,000 → 100 → 10 kcal. This is why food chains rarely go past 4-5 levels."
    },
    {
      q: "What is the role of decomposers in an ecosystem?",
      choices: [
        "They produce energy from sunlight",
        "They are apex predators that control populations",
        "They break down dead matter and return nutrients to the soil",
        "They migrate between trophic levels"
      ],
      correct: 2,
      explanation: "Bacteria and fungi decompose dead organisms and waste, releasing nutrients back into the soil where producers can use them again. Without decomposers, ecosystems would run out of usable nutrients fast."
    },
    {
      q: "Which graph shape best describes EXPONENTIAL population growth?",
      choices: ["A flat line", "A J-shaped curve", "An S-shaped curve", "A bell curve"],
      correct: 1,
      explanation: "Exponential growth (unlimited resources, no predators) gives a J-curve — slow start, then compounding upward. Logistic growth, which levels off at carrying capacity, gives the S-curve."
    },
    {
      q: "Carrying capacity (K) is best defined as:",
      choices: [
        "The maximum population an environment can sustain long-term",
        "The minimum population needed for the species to survive",
        "The rate of population growth",
        "The number of offspring per parent"
      ],
      correct: 0,
      explanation: "Carrying capacity is the population size where birth and death rates balance — the flat top of the logistic S-curve. Set by food, space, predators, and disease."
    },
    {
      q: "A disease that spreads more easily as a population gets denser is a:",
      choices: [
        "Density-independent factor",
        "Density-dependent factor",
        "Keystone species",
        "Abiotic factor"
      ],
      correct: 1,
      explanation: "Density-dependent factors get STRONGER as a population grows. Disease, competition, and predation are classic examples. A hurricane (which hits no matter how dense the population is) would be density-independent."
    },
    {
      q: "Sea otters eat sea urchins. Without otters, urchins explode and destroy entire kelp forests. Sea otters are an example of a:",
      choices: [
        "Producer",
        "Keystone species",
        "Decomposer",
        "Invasive species"
      ],
      correct: 1,
      explanation: "A keystone species has an outsized effect on its ecosystem relative to its population size. Remove sea otters → urchins boom → kelp forest collapses → dozens of other species lose their habitat."
    },
    {
      q: "Why is high biodiversity generally good for an ecosystem?",
      choices: [
        "It looks prettier",
        "It makes the ecosystem more resilient — if one species fails, others can fill its role",
        "It increases the carrying capacity automatically",
        "It blocks succession from happening"
      ],
      correct: 1,
      explanation: "High biodiversity = redundancy. If one species crashes (disease, climate shift), others can take its place in the food web. Low-diversity ecosystems are brittle — losing one species can cause cascading collapse."
    },
    {
      q: "Primary succession differs from secondary succession in that primary succession:",
      choices: [
        "Happens faster",
        "Starts from bare rock or sterile ground with no soil",
        "Only happens in tropical biomes",
        "Doesn't include any plants"
      ],
      correct: 1,
      explanation: "Primary succession starts from scratch — bare rock left by a glacier or fresh lava. Lichens and mosses must build soil over centuries. Secondary succession (after a fire or abandoned farm) starts with intact soil, so recovery takes decades, not millennia."
    },
    {
      q: "An r-selected species (like a mouse or dandelion) typically has:",
      choices: [
        "Few offspring with heavy parental care",
        "Many offspring with little parental care",
        "A long lifespan",
        "Stable population numbers near carrying capacity"
      ],
      correct: 1,
      explanation: "r-selected species bet on volume: many offspring, low investment per offspring, short lives. Suited to unstable, boom-bust environments. K-selected species (elephants, humans) take the opposite strategy."
    },
    {
      q: "Plants close their stomata in response to drought. This is best described as a:",
      choices: [
        "Long-term evolutionary adaptation",
        "Short-term physiological response to the environment",
        "Random behavior",
        "Result of natural selection within the individual plant"
      ],
      correct: 1,
      explanation: "Closing stomata is a quick physiological response — minutes to hours — to limit water loss when the environment dries out. Evolutionary adaptations happen across generations, not within an individual."
    },
    {
      q: "Sea-turtle hatchlings reliably crawl toward the brightest horizon, which is normally the moonlit sea. This behavior is best described as:",
      choices: [
        "Learned through trial and error",
        "An innate (genetically programmed) behavior shaped by natural selection",
        "Imprinting on the mother",
        "Conditional on the temperature"
      ],
      correct: 1,
      explanation: "Hatchlings perform this behavior without learning — it's innate, encoded in the genes. Hatchlings whose brains hardwired 'go to bright light' survived more often, so that behavior spread. (Modern artificial lighting tragically subverts this — they crawl toward streetlights instead.)"
    },
    {
      q: "About what fraction of energy at one trophic level is passed up to the next?",
      choices: ["About 90%", "About 50%", "About 10%", "100% — energy is conserved"],
      correct: 2,
      explanation: "The 10% rule. The other 90% is lost mostly as heat (and in indigestible parts, metabolism, etc.). This is why food chains are usually only 4–5 levels long — there's not enough energy left to support a 6th level."
    },
    {
      q: "In an ecosystem, energy ___ and matter ___.",
      choices: [
        "cycles; flows in one direction",
        "flows in one direction; cycles",
        "both cycle indefinitely",
        "both flow in one direction"
      ],
      correct: 1,
      explanation: "Energy flows in one direction (sun → producers → consumers → heat lost). Matter cycles — atoms of carbon, nitrogen, phosphorus are used and reused indefinitely as living things grow, die, and decompose."
    }
  ],

  chemistry: [
    {
      q: "The acronym CHNOPS stands for the six elements that make up ~96% of every living thing. Which of these is NOT one of them?",
      choices: ["Carbon", "Hydrogen", "Calcium", "Phosphorus"],
      correct: 2,
      explanation: "CHNOPS = Carbon, Hydrogen, Nitrogen, Oxygen, Phosphorus, Sulfur. Calcium is biologically important (bones, signaling) but isn't in the big six."
    },
    {
      q: "What makes carbon especially good at building complex biological molecules?",
      choices: [
        "It has the smallest atomic number of any element",
        "It can form 4 covalent bonds, allowing long chains, rings, and branches",
        "It dissolves in water",
        "It is radioactive"
      ],
      correct: 1,
      explanation: "Carbon's 4 bonding sites let it form an unmatched diversity of stable structures — chains, branches, rings, 3D networks. That versatility is why every macromolecule has a carbon backbone."
    },
    {
      q: "Which type of bond holds the two strands of a DNA double helix together?",
      choices: [
        "Covalent bonds",
        "Ionic bonds",
        "Hydrogen bonds",
        "Peptide bonds"
      ],
      correct: 2,
      explanation: "Hydrogen bonds between complementary bases (A–T, G–C) hold the two DNA strands together. Each individual H-bond is weak, but millions of them along the helix make it stable — and easy to unzip for replication."
    },
    {
      q: "Water's many special properties (cohesion, high heat capacity, ice floating) all come from:",
      choices: [
        "Water being a small molecule",
        "Water being polar and forming hydrogen bonds",
        "Water containing carbon",
        "Water being a strong acid"
      ],
      correct: 1,
      explanation: "Water is polar (the oxygen pulls electrons toward it, leaving the hydrogens slightly +). That polarity lets water molecules form hydrogen bonds with each other — which is the source of every one of water's superpowers."
    },
    {
      q: "Why does ice float on liquid water?",
      choices: [
        "Ice contains air bubbles",
        "When water freezes, hydrogen bonds lock molecules into a lattice that takes up MORE space than liquid water",
        "Ice is a different chemical compound than water",
        "Cold makes molecules heavier"
      ],
      correct: 1,
      explanation: "Below 4°C, water molecules H-bond into a rigid lattice with more empty space between them — so ice is LESS dense than liquid water. That's why lakes freeze top-down and fish survive the winter."
    },
    {
      q: "When two monomers link to form a polymer, what small molecule is released?",
      choices: ["Carbon dioxide", "Water", "Oxygen", "ATP"],
      correct: 1,
      explanation: "Dehydration synthesis joins monomers by removing one H₂O — one –OH from one monomer + one –H from the other. Every new bond in a polymer releases one water molecule."
    },
    {
      q: "Hydrolysis is the process of:",
      choices: [
        "Building a polymer from monomers",
        "Breaking a polymer apart by ADDING water at each bond",
        "Photosynthesis in plants",
        "Producing energy from glucose"
      ],
      correct: 1,
      explanation: "'Hydro-lysis' literally means 'water-splitting.' It's the reverse of dehydration synthesis — water gets added across each bond, breaking the polymer back into monomers. Your digestive system does this to every meal."
    },
    {
      q: "Which macromolecule is built from amino acid monomers linked by peptide bonds?",
      choices: ["Carbohydrate", "Lipid", "Protein", "Nucleic acid"],
      correct: 2,
      explanation: "Proteins are polymers of amino acids joined by peptide bonds. The sequence of amino acids determines how the chain folds, which determines what the protein can do."
    },
    {
      q: "Which macromolecule is the cell's primary long-term energy storage?",
      choices: [
        "Glucose",
        "Triglycerides (fats)",
        "DNA",
        "Cellulose"
      ],
      correct: 1,
      explanation: "Triglycerides pack way more energy per gram than carbs (about 2× as much). Glucose gives quick energy, but for long-term storage organisms use fat — which is why animals build it up before hibernation or long migrations."
    },
    {
      q: "Phospholipids spontaneously form bilayers in water because:",
      choices: [
        "They are all polar",
        "They are all nonpolar",
        "They have a polar head and a nonpolar tail — heads face the water, tails face each other",
        "They contain phosphorus, which attracts other phospholipids"
      ],
      correct: 2,
      explanation: "Phospholipids are AMPHIPATHIC — one end likes water, the other doesn't. In water, they self-assemble so all polar heads face outward (toward water) and all nonpolar tails face inward (away from water). That's the bilayer of every cell membrane."
    },
    {
      q: "Nucleotides — the monomers of DNA and RNA — are made of three parts. Which three?",
      choices: [
        "Amino acid, sugar, phosphate",
        "Sugar, phosphate, nitrogenous base",
        "Glycerol, fatty acid, phosphate",
        "Carbon, hydrogen, oxygen only"
      ],
      correct: 1,
      explanation: "Every nucleotide = a 5-carbon sugar (ribose or deoxyribose) + a phosphate group + a nitrogenous base (A, T/U, G, or C). The sugar-phosphate backbones link via phosphodiester bonds, and the bases pair across the double helix."
    }
  ],

  enzymes: [
    {
      q: "What does an enzyme actually do to a chemical reaction?",
      choices: [
        "It supplies the energy the reaction needs",
        "It lowers the activation energy so the reaction can proceed faster",
        "It changes how much energy the reaction releases overall",
        "It becomes part of the final product"
      ],
      correct: 1,
      explanation: "Enzymes are catalysts. They lower activation energy (Eₐ) so more molecules have enough thermal energy to react at any moment. They do not change the net energy released — same products, same end-state — just a faster path to get there."
    },
    {
      q: "An enzyme's specificity comes from which part of it?",
      choices: ["The peptide bonds", "The active site", "The hydrogen bonds", "The cofactor"],
      correct: 1,
      explanation: "The active site's shape (and charge distribution) is complementary to the substrate. That's why each enzyme catalyzes essentially one reaction — only its specific substrate fits."
    },
    {
      q: "Modern biochemistry describes enzyme–substrate binding as 'induced fit.' What does that mean?",
      choices: [
        "The substrate is forced into the wrong shape",
        "The enzyme is rigid and the substrate has to match it exactly",
        "The enzyme flexes slightly to wrap more tightly around the substrate after binding",
        "Two substrates bind at the same time"
      ],
      correct: 2,
      explanation: "Induced fit replaced the older 'lock-and-key' model. The active site adjusts when the substrate enters, like a handshake closing around the substrate. This grip is what strains bonds and lowers Eₐ."
    },
    {
      q: "What does it mean for an enzyme to be 'denatured'?",
      choices: [
        "It has been used up in the reaction",
        "Its protein structure has unfolded and the active site no longer works",
        "It has been replaced by a different enzyme",
        "Its substrate concentration has dropped to zero"
      ],
      correct: 1,
      explanation: "Denaturation = loss of the folded 3D shape. The active site is gone, so the enzyme can no longer bind substrate. High temperature and extreme pH are the two most common causes."
    },
    {
      q: "Pepsin works in the stomach. Its optimal pH is around 2. Why doesn't pepsin work in your small intestine?",
      choices: [
        "The intestine is too warm",
        "The intestine is much more basic (pH ~8), which denatures pepsin",
        "Pepsin only digests fats, not proteins in the intestine",
        "Pepsin needs ATP to work, which isn't available in the intestine"
      ],
      correct: 1,
      explanation: "Each enzyme has an optimal pH where its active site charges are right. Move pepsin (optimum pH 2) into the alkaline small intestine and the changed charges break the bonds holding the active site in shape — it denatures."
    },
    {
      q: "If you keep adding more substrate to a fixed amount of enzyme, the reaction rate eventually plateaus. Why?",
      choices: [
        "The substrate becomes denatured",
        "All enzyme active sites are constantly occupied — the enzyme is saturated",
        "The enzyme runs out of energy",
        "The products inhibit the enzyme"
      ],
      correct: 1,
      explanation: "At saturation, every active site is always busy. Adding more substrate can't speed things up — only adding more enzyme can. This is V_max in the Michaelis–Menten curve."
    },
    {
      q: "A competitive inhibitor slows an enzyme by:",
      choices: [
        "Binding the active site instead of the substrate",
        "Binding a different (allosteric) site and changing the enzyme's shape",
        "Permanently destroying the enzyme",
        "Speeding up the reverse reaction"
      ],
      correct: 0,
      explanation: "Competitive inhibitors look like the substrate and fight for the active site. Adding more substrate can outcompete them. Noncompetitive inhibitors, in contrast, bind an allosteric site and warp the active site so substrate can't bind."
    },
    {
      q: "Many enzymes need a vitamin-derived helper molecule to function. What's that helper called?",
      choices: ["A substrate", "A coenzyme", "An inhibitor", "A polypeptide"],
      correct: 1,
      explanation: "Coenzymes are small organic helpers — often derived from vitamins — that carry chemical groups or electrons. NAD⁺, FAD, and Coenzyme A are key examples in cellular respiration. Inorganic ion helpers (Zn²⁺, Mg²⁺) are called cofactors."
    },
    {
      q: "In feedback inhibition, what shuts the pathway down?",
      choices: [
        "The starting substrate",
        "The end product binding back to the first enzyme",
        "Sunlight",
        "Random thermal collisions"
      ],
      correct: 1,
      explanation: "Feedback inhibition is the cell's built-in thermostat. When the pathway's final product builds up, it binds to (and inhibits) the first enzyme in the chain, shutting off production until levels drop. Prevents wasteful overproduction."
    },
    {
      q: "Liver cells and muscle cells share the same DNA, but they run different metabolic pathways. The most direct reason is:",
      choices: [
        "Their mitochondria use different ATP",
        "They express different sets of enzymes",
        "They have different chromosomes",
        "Only liver cells have ribosomes"
      ],
      correct: 1,
      explanation: "Same genome, different gene expression. Each cell type makes its own characteristic suite of enzymes (and other proteins), so different reactions are catalyzed at different speeds — that's how one genome supports many specialized cell types."
    }
  ],

  signaling: [
    {
      q: "What are the three stages of every cell-signaling pathway, in order?",
      choices: [
        "Translation, transduction, transcription",
        "Reception, transduction, response",
        "Diffusion, binding, division",
        "Signal, receptor, hormone"
      ],
      correct: 1,
      explanation: "Every signaling story in AP Bio follows reception (ligand binds receptor) → transduction (relay inside the cell) → response (the cell does something — gene expression, channel opening, etc.)."
    },
    {
      q: "A hormone travels through the bloodstream to a distant target cell. What mode of signaling is this?",
      choices: ["Paracrine", "Synaptic", "Endocrine", "Direct contact"],
      correct: 2,
      explanation: "Endocrine signals use the circulatory system to reach distant targets. Paracrine is short-range diffusion to nearby cells; synaptic is the special paracrine across neuron synapses; direct contact requires the cells to touch."
    },
    {
      q: "Steroid hormones like testosterone and cortisol bind which kind of receptor?",
      choices: [
        "G-protein-coupled receptors at the membrane",
        "Receptor tyrosine kinases at the membrane",
        "Intracellular receptors in the cytoplasm or nucleus",
        "Ligand-gated ion channels"
      ],
      correct: 2,
      explanation: "Steroids are hydrophobic and pass through the membrane on their own, so their receptors sit inside the cell. The receptor–hormone complex acts directly as a transcription factor."
    },
    {
      q: "Why does a single signal molecule often produce a huge cellular response?",
      choices: [
        "The ligand is reused many times",
        "Each step of the kinase cascade activates many of the next protein down — the signal is amplified",
        "The receptor splits the ligand into many copies",
        "The cell makes more receptors as the signal arrives"
      ],
      correct: 1,
      explanation: "Amplification is one of the main reasons signal cascades have multiple steps. One activated kinase can phosphorylate hundreds of substrate molecules, each of which goes on to activate hundreds more — millions of responses from one binding event."
    },
    {
      q: "Which of these is a common second messenger?",
      choices: ["ATP", "Glucose", "Cyclic AMP (cAMP)", "Acetylcholine"],
      correct: 2,
      explanation: "Second messengers are small intracellular signaling molecules. cAMP, Ca²⁺, IP₃, and DAG are the canonical examples. They diffuse fast and reach many downstream targets."
    },
    {
      q: "What does a transcription factor do at the end of a signaling cascade?",
      choices: [
        "It breaks down the ligand",
        "It opens an ion channel in the membrane",
        "It enters the nucleus and turns specific genes on or off",
        "It exports the cell's ribosomes"
      ],
      correct: 2,
      explanation: "Many cascades end with a transcription factor being activated. It moves to the nucleus, binds DNA at specific sites, and changes the expression of target genes — usually producing new proteins."
    },
    {
      q: "A proto-oncogene becomes an oncogene when:",
      choices: [
        "It is deleted from the genome",
        "It is silenced by methylation",
        "It gains a mutation that locks its 'go!' signal on",
        "Its protein is broken down too quickly"
      ],
      correct: 2,
      explanation: "Proto-oncogenes normally produce growth-promoting proteins (receptors, kinases, transcription factors) only when needed. A gain-of-function mutation — e.g. one that locks Ras in its 'GTP-bound, on' form — turns it into an oncogene."
    },
    {
      q: "p53 is famous as a tumor suppressor. What does its loss-of-function mutation do?",
      choices: [
        "It removes a brake on the cell cycle, letting damaged cells divide instead of pausing or dying",
        "It activates growth-factor receptors directly",
        "It mimics a ligand so the receptor is always bound",
        "It makes the cell hypersensitive to apoptosis"
      ],
      correct: 0,
      explanation: "p53 normally pauses the cell cycle at checkpoints when DNA damage is detected, and triggers apoptosis if the damage is severe. Losing p53 removes that brake — damaged cells keep dividing. p53 mutations are found in over half of all human cancers."
    },
    {
      q: "Apoptosis is best described as:",
      choices: [
        "Random cell death from injury",
        "An orderly, programmed self-disassembly of a cell",
        "Cell division gone wrong",
        "The process by which viruses kill cells"
      ],
      correct: 1,
      explanation: "Apoptosis is the cell's programmed death pathway: tidy, controlled, recyclable. It carves your fingers from webbed embryonic hands, prunes excess neurons, and removes damaged cells before they can become cancerous."
    },
    {
      q: "Two different cell types have the same growth-factor receptor on their surface but respond to the same ligand in different ways. The most likely reason is:",
      choices: [
        "The ligand has a different shape in each cell",
        "The receptors are made of different amino acids",
        "Different downstream targets (kinases, transcription factors, response proteins) are present in each cell",
        "Only one of the cells has DNA"
      ],
      correct: 2,
      explanation: "Same upstream cascade, different downstream targets → different responses. Specialized cell types express different signaling components, so an identical signal can drive division in one cell and differentiation in another."
    }
  ],

  transport: [
    {
      q: "Which molecules cross the phospholipid bilayer most easily without a transporter?",
      choices: [
        "Charged ions like Na⁺ and K⁺",
        "Large polar molecules like glucose",
        "Small nonpolar molecules like O₂ and CO₂",
        "Water-soluble vitamins"
      ],
      correct: 2,
      explanation: "The bilayer's hydrophobic core lets small, nonpolar molecules slip through unaided. Ions and large polar molecules need protein channels or carriers; water moves slowly through lipid but fast through aquaporins."
    },
    {
      q: "Passive transport differs from active transport in that passive transport:",
      choices: [
        "Always uses protein carriers",
        "Requires ATP",
        "Moves molecules down their concentration gradient without ATP",
        "Only happens in plant cells"
      ],
      correct: 2,
      explanation: "Passive transport (simple diffusion, facilitated diffusion, osmosis) goes down the gradient and uses no energy. Active transport pushes uphill against the gradient and requires ATP."
    },
    {
      q: "A glucose transporter (GLUT) is a carrier protein. How does it move glucose into the cell?",
      choices: [
        "It uses ATP to push glucose in",
        "It binds glucose and changes shape to flip it across the membrane",
        "It opens a permanent hydrophilic tunnel",
        "It coats the glucose so it can pass through the lipid layer"
      ],
      correct: 1,
      explanation: "Carrier proteins are specific binders that undergo a conformational change to translocate their cargo across. GLUT moves glucose down its gradient — it's facilitated diffusion, not active transport."
    },
    {
      q: "Osmosis is best defined as:",
      choices: [
        "Movement of ions through channel proteins",
        "Movement of water across a selectively permeable membrane down its concentration gradient",
        "Active pumping of water using ATP",
        "Diffusion of solutes from high to low concentration"
      ],
      correct: 1,
      explanation: "Osmosis is specifically water moving from where it's more concentrated (fewer solutes) to where it's less concentrated (more solutes) across a semipermeable membrane. Aquaporins speed it up dramatically."
    },
    {
      q: "An animal cell is placed in pure water. What happens?",
      choices: [
        "Nothing — pure water is isotonic",
        "Water leaves the cell and it shrivels (crenates)",
        "Water enters the cell and it swells, potentially bursting (lyses)",
        "The cell wall expands to prevent damage"
      ],
      correct: 2,
      explanation: "Pure water is hypotonic to a cell — much lower solute concentration outside. Water rushes IN by osmosis. Animal cells have no rigid cell wall, so they swell and can burst (hemolysis if it's a red blood cell)."
    },
    {
      q: "A wilted lettuce leaf recovers when soaked in fresh water. Why?",
      choices: [
        "Fresh water is hypotonic to the cells; water enters and restores turgor pressure",
        "Fresh water kills the bacteria on the leaf",
        "Fresh water adds nutrients the cell needs",
        "Fresh water is hypertonic and squeezes the cells firm"
      ],
      correct: 0,
      explanation: "Fresh water is hypotonic to the salty cytoplasm of the leaf cells. Water rushes in by osmosis, the central vacuole fills, and pressure against the cell wall (turgor) firms the leaf up."
    },
    {
      q: "The sodium–potassium pump moves how many ions per ATP it spends?",
      choices: ["1 Na⁺ out and 1 K⁺ in", "2 Na⁺ out and 3 K⁺ in", "3 Na⁺ out and 2 K⁺ in", "3 Na⁺ in and 2 K⁺ out"],
      correct: 2,
      explanation: "Each cycle: 3 Na⁺ pumped OUT, 2 K⁺ pumped IN, 1 ATP spent. This pump maintains the gradients that power nerve impulses, muscle contraction, and secondary active transport — and uses ~20–25% of your resting calories."
    },
    {
      q: "An immune cell engulfing a bacterium uses which process?",
      choices: ["Simple diffusion", "Osmosis", "Phagocytosis (a form of endocytosis)", "Facilitated diffusion"],
      correct: 2,
      explanation: "Phagocytosis is bulk endocytosis for big stuff. The membrane wraps around the target and pinches it off as a vesicle inside the cell. It requires ATP and reshapes the membrane."
    },
    {
      q: "As a cell grows larger, its surface-area-to-volume ratio:",
      choices: [
        "Increases — bigger cells transport more efficiently",
        "Stays the same",
        "Decreases — making transport less efficient and limiting maximum cell size",
        "Only changes for plant cells"
      ],
      correct: 2,
      explanation: "Volume grows as r³, surface area as r². So SA/V drops as a cell grows. Past a certain size, the membrane can't move enough material to feed the cytoplasm — which is why cells stay small, and big organisms have many cells, not bigger ones."
    },
    {
      q: "Which structural feature would let a single cell maximize material exchange with its environment?",
      choices: [
        "A round, smooth shape",
        "A small surface area relative to volume",
        "Membrane folds, fingers, or microvilli that increase surface area",
        "A thick cell wall"
      ],
      correct: 2,
      explanation: "Intestinal cells have microvilli, root hair cells have long projections, neurons have branching dendrites — all of these are surface-area boosters. Any cell that needs heavy transport evolves features that push SA/V up."
    }
  ],

  regulation: [
    {
      q: "A single base change makes a codon code for the SAME amino acid as before. What kind of mutation is this?",
      choices: ["Missense", "Nonsense", "Silent", "Frameshift"],
      correct: 2,
      explanation: "Silent mutation — the DNA sequence changed but the amino acid sequence didn't, because of the redundancy in the genetic code (most amino acids have multiple codons)."
    },
    {
      q: "A point mutation changes a codon to a STOP codon. The protein produced is:",
      choices: [
        "The same as normal",
        "Longer than normal",
        "Cut short (truncated) — usually broken",
        "Identical but folds slightly differently"
      ],
      correct: 2,
      explanation: "Nonsense mutation — translation stops at the premature STOP codon. The protein is truncated and almost always non-functional. (Some can be partially functional if very close to the original C-terminus.)"
    },
    {
      q: "Inserting a single extra base into a gene's coding sequence usually causes:",
      choices: [
        "No effect, since one base is small",
        "A silent mutation",
        "A frameshift — every codon downstream is changed",
        "Only the next codon to change"
      ],
      correct: 2,
      explanation: "Frameshift. The reading frame moves over by 1 starting at the insertion, so every codon after that point is misread. A premature STOP almost always appears soon, truncating the protein. Severe mutations almost without exception."
    },
    {
      q: "An operon is best described as:",
      choices: [
        "A single gene with multiple exons",
        "A cluster of genes in prokaryotes that share a promoter and operator and are transcribed together",
        "The set of all eukaryotic genes",
        "A small RNA that controls gene expression"
      ],
      correct: 1,
      explanation: "Operons are a prokaryotic invention. They bundle a promoter + operator + several related genes so one regulatory switch controls a whole pathway. Eukaryotes usually don't use them."
    },
    {
      q: "When lactose is absent, the lac operon is OFF because:",
      choices: [
        "The promoter is missing",
        "The repressor protein is bound to the operator, blocking RNA polymerase",
        "RNA polymerase has been degraded",
        "The genes have been deleted"
      ],
      correct: 1,
      explanation: "The lac repressor sits on the operator by default. RNA polymerase can bind the promoter but can't move past the repressor. When lactose appears, it binds and inactivates the repressor — the polymerase is freed."
    },
    {
      q: "The trp operon is REPRESSIBLE — meaning:",
      choices: [
        "It is always off",
        "It is on by default but turned off when tryptophan accumulates",
        "It is on by default and never turned off",
        "It is off by default and turned on by tryptophan"
      ],
      correct: 1,
      explanation: "trp encodes the enzymes that BUILD tryptophan, so cells want it on when they need tryptophan. When tryptophan piles up, it binds and activates the trp repressor, which then binds the operator and shuts the operon off. Classic feedback."
    },
    {
      q: "In eukaryotes, which of the following is NOT a level of gene regulation?",
      choices: [
        "Chromatin packing",
        "Alternative splicing",
        "mRNA stability",
        "Operon repressor binding"
      ],
      correct: 3,
      explanation: "Operons are essentially a prokaryotic device. Eukaryotes regulate at chromatin (packing), transcription (transcription factors), RNA processing (splicing), mRNA lifespan, translation, and post-translational modification — but not operons."
    },
    {
      q: "Alternative splicing allows:",
      choices: [
        "One gene to make multiple protein variants depending on which exons are kept",
        "Bacteria to share genes with each other",
        "DNA to repair itself after mutation",
        "Multiple genes to merge into one"
      ],
      correct: 0,
      explanation: "By including different combinations of exons in the final mRNA, a single eukaryotic gene can encode many distinct proteins. That's why ~20,000 human genes can produce hundreds of thousands of protein variants."
    },
    {
      q: "PCR copies DNA exponentially by repeating which three steps?",
      choices: [
        "Replicate, transcribe, translate",
        "Denature, anneal, extend",
        "Cut, ligate, transform",
        "Mutate, select, amplify"
      ],
      correct: 1,
      explanation: "Each PCR cycle: denature at ~95°C (strands separate) → anneal at ~55°C (primers bind) → extend at 72°C (Taq polymerase builds new strands). Each cycle doubles the DNA, so 30 cycles ≈ a billion copies."
    },
    {
      q: "What does CRISPR–Cas9 do?",
      choices: [
        "It transcribes DNA into RNA",
        "It pairs a guide RNA with a nuclease to cut a specific DNA target, allowing precise gene editing",
        "It replicates DNA for use in PCR",
        "It separates DNA by size in a gel"
      ],
      correct: 1,
      explanation: "CRISPR–Cas9: the guide RNA you design targets the matching DNA sequence; Cas9 cuts it. The cell's repair machinery then either knocks the gene out (introducing mutations) or, with a template, splices in a precise new sequence."
    }
  ]

};

/* Convenience helper: returns the question pool for a module slug,
   or null if no such pool exists. */
function getQuizPool(slug) {
  return QUIZ_DATA[slug] || null;
}
