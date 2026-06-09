/* =========================================================
   cell-content.js — info card content for each organelle

   Each entry's key matches a data-organelle="..." attribute
   on a <g class="organelle"> in cell.html. Function text is
   split by audience track (middle / high); cell.js picks the
   right one at render time via getTrack().

   To add an organelle:
   1. Add a <g data-organelle="X" class="organelle" tabindex="0">
      to the animal SVG, the plant SVG, or both.
   2. Add an entry below keyed by 'X'.
   3. Add 'X' to ORGANELLE_ORDER.animal and/or .plant.
   4. Update totalParts for 'cell' in data/modules.js to match
      the total number of unique entries below.
   ========================================================= */

const CELL_CONTENT = {
  membrane: {
    name: 'Cell Membrane',
    function: {
      middle: 'The outer wrapper of the cell. It controls what comes in and what goes out.',
      high: 'Phospholipid bilayer studded with proteins. Selectively permeable — controls flow via passive diffusion, facilitated transport, and active (ATP-driven) transport.'
    },
    didYouKnow: 'The cell membrane is only about 10 nanometers thick — over 10,000 of them stacked would still be thinner than a sheet of paper.'
  },
  cytoplasm: {
    name: 'Cytoplasm',
    function: {
      middle: 'The jelly-like fluid that fills the cell. It holds everything in place and lets molecules move around.',
      high: 'Aqueous gel (cytosol) plus dissolved ions, enzymes, and metabolites. Site of glycolysis and many metabolic reactions; organelles are suspended in it.'
    },
    didYouKnow: 'Most cells are about 70% water — and most of that water is in the cytoplasm.'
  },
  cytoskeleton: {
    name: 'Cytoskeleton',
    function: {
      middle: 'The cell\'s skeleton — a network of fibers that gives the cell its shape and helps things move inside it.',
      high: 'Protein scaffolding made of microtubules, microfilaments, and intermediate filaments. Maintains cell shape, anchors organelles, powers cell movement, and drives chromosome separation during division.'
    },
    didYouKnow: 'The cytoskeleton can completely rearrange itself in seconds — that\'s how white blood cells crawl after bacteria and how cells pinch themselves in half when dividing.'
  },
  nucleus: {
    name: 'Nucleus',
    function: {
      middle: 'The control center of the cell. It holds the DNA and tells the rest of the cell what to do.',
      high: 'Membrane-bound organelle containing the cell\'s chromosomes (DNA). Site of DNA replication and transcription; the nucleolus inside it assembles ribosomes.'
    },
    didYouKnow: 'Almost every cell in your body has a nucleus — except mature red blood cells, which lose theirs to fit more hemoglobin and carry more oxygen.'
  },
  mitochondria: {
    name: 'Mitochondria',
    function: {
      middle: 'The powerhouses of the cell. They turn food into a kind of energy (ATP) the cell can use.',
      high: 'Double-membraned organelles that produce ATP through aerobic cellular respiration. The folded inner membrane (cristae) maximizes surface area for ATP synthase.'
    },
    didYouKnow: 'Mitochondria have their own DNA, separate from the nucleus — evidence that they were once free-living bacteria absorbed by an ancient cell.'
  },
  ribosomes: {
    name: 'Ribosomes',
    function: {
      middle: 'Tiny factories that build proteins by reading instructions from RNA.',
      high: 'Ribonucleoprotein complexes that translate mRNA into polypeptides. Found free in the cytoplasm or bound to the rough endoplasmic reticulum.'
    },
    didYouKnow: 'A single active cell can hold millions of ribosomes — they\'re by far the most abundant organelle in protein-producing cells like those in the pancreas.'
  },
  er: {
    name: 'Endoplasmic Reticulum',
    function: {
      middle: 'A network of folded tubes that moves materials around the cell and folds proteins into shape.',
      high: 'Network of membrane-bound tubules continuous with the nuclear envelope. Rough ER (ribosome-studded) processes proteins; smooth ER synthesizes lipids and detoxifies.'
    },
    didYouKnow: 'If you stretched the ER from a single liver cell into one tube, it would be hundreds of times longer than the cell itself.'
  },
  golgi: {
    name: 'Golgi Apparatus',
    function: {
      middle: 'The cell\'s packaging center. It modifies proteins from the ER and ships them where they need to go.',
      high: 'Stack of flattened membrane sacs (cisternae) that modifies, sorts, and packages proteins and lipids into vesicles for transport.'
    },
    didYouKnow: 'Camillo Golgi described this organelle in 1898 — it was so unusual-looking that scientists argued for over 50 years about whether it was real.'
  },
  lysosomes: {
    name: 'Lysosomes',
    function: {
      middle: 'The cell\'s recycling center. They break down old or damaged parts so the cell can reuse the materials. (Found in animal cells.)',
      high: 'Membrane-bound vesicles filled with digestive enzymes (acid hydrolases) at pH ~4.5. Break down cellular waste and worn-out organelles. Found in animal cells; plant cells use the vacuole instead.'
    },
    didYouKnow: 'Lysosomes also destroy bacteria that get inside a cell — they\'re a key part of your immune defense at the cellular level.'
  },
  vacuoles: {
    name: 'Vacuoles',
    function: {
      middle: 'Storage tanks inside the cell. They hold water, nutrients, and waste.',
      high: 'Membrane-bound sacs that store water, nutrients, ions, and waste. Animal cells have many small vacuoles; plant cells typically have one large central vacuole that maintains turgor pressure.'
    },
    didYouKnow: 'When you forget to water a plant and it wilts, that\'s actually the central vacuoles inside each cell shrinking. Water the plant and they refill — the plant stands back up.'
  },
  chloroplasts: {
    name: 'Chloroplasts',
    function: {
      middle: 'The green factories in plant cells. They use sunlight to make food (sugar) through photosynthesis. (Plants only.)',
      high: 'Double-membraned organelles containing chlorophyll. Perform photosynthesis in stacks of membranes called thylakoids, producing glucose from CO₂ and water. Like mitochondria, they have their own DNA.'
    },
    didYouKnow: 'The green color of plants comes from chlorophyll inside chloroplasts. In autumn, chlorophyll breaks down and reveals other pigments — that\'s why leaves turn yellow and orange.'
  }
};

// Tour order per cell type. The "Take a guided tour" button cycles
// through whichever array matches the currently selected cell type.
const ORGANELLE_ORDER = {
  animal: ['membrane', 'cytoplasm', 'cytoskeleton', 'nucleus', 'mitochondria', 'ribosomes', 'er', 'golgi', 'lysosomes', 'vacuoles'],
  plant:  ['membrane', 'cytoplasm', 'cytoskeleton', 'nucleus', 'mitochondria', 'ribosomes', 'er', 'golgi', 'vacuoles', 'chloroplasts']
};
