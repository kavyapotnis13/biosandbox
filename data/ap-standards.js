/* =========================================================
   ap-standards.js — AP Biology Course and Exam Description
   alignment map.

   Built from the College Board AP Biology CED (8 units, 4 big
   ideas). Codes follow the CED convention:
     <BIG-IDEA>-<TOPIC#>.<LETTER>
       e.g. ENE-1.A, IST-3.D, SYI-1.E

   Big ideas:
     EVO — Evolution
     ENE — Energetics
     IST — Information Storage and Transmission
     SYI — Systems Interactions

   IMPORTANT — verification step before submitting:
     LO codes here are drawn from a pre-trained model's
     knowledge of the 2020 CED revision. Before you write
     "AP Bio aligned" anywhere public, cross-check each LO
     code below against the official CED PDF on AP Central:
       https://apcentral.collegeboard.org/courses/ap-biology
     College Board occasionally re-codes LOs. Wrong codes
     undercut the whole claim — treat this file as a starting
     map that you finish by hand.
   ========================================================= */

const AP_BIO_BIG_IDEAS = {
  EVO: 'Evolution',
  ENE: 'Energetics',
  IST: 'Information Storage and Transmission',
  SYI: 'Systems Interactions'
};

const AP_BIO_UNITS = [
  {
    number: 1,
    name: 'Chemistry of Life',
    weight: '8-11%',
    bigIdeas: ['SYI', 'ENE', 'IST'],
    los: [
      { code: 'SYI-1.A', title: 'Structure of water and hydrogen bonding' },
      { code: 'SYI-1.B', title: 'Elements of life' },
      { code: 'SYI-1.C', title: 'Biological macromolecules — structure' },
      { code: 'SYI-1.D', title: 'Properties of biological macromolecules' },
      { code: 'IST-1.A', title: 'Nucleic acids — structure of DNA and RNA' }
    ]
  },
  {
    number: 2,
    name: 'Cell Structure and Function',
    weight: '10-13%',
    bigIdeas: ['SYI', 'ENE'],
    los: [
      { code: 'SYI-1.E', title: 'Subcellular components and organelles' },
      { code: 'SYI-1.F', title: 'Endomembrane system (ER, Golgi, vesicles)' },
      { code: 'SYI-1.G', title: 'Mitochondria and chloroplasts' },
      { code: 'ENE-2.A', title: 'Plasma membrane structure (phospholipid bilayer)' },
      { code: 'ENE-2.B', title: 'Membrane permeability and transport' },
      { code: 'ENE-2.C', title: 'Tonicity and osmoregulation' },
      { code: 'ENE-2.D', title: 'Cell size, surface area, and volume' },
      { code: 'SYI-2.A', title: 'Cell compartmentalization and endosymbiosis' }
    ]
  },
  {
    number: 3,
    name: 'Cellular Energetics',
    weight: '12-14%',
    bigIdeas: ['ENE'],
    los: [
      { code: 'ENE-1.A', title: 'Enzyme structure and function' },
      { code: 'ENE-1.B', title: 'Environmental impacts on enzyme function' },
      { code: 'ENE-1.C', title: 'Cellular processes that depend on ATP' },
      { code: 'ENE-1.D', title: 'Photosynthesis — light-dependent reactions' },
      { code: 'ENE-1.E', title: 'Photosynthesis — Calvin cycle (light-independent)' },
      { code: 'ENE-1.F', title: 'Cellular respiration — glycolysis' },
      { code: 'ENE-1.G', title: 'Cellular respiration — Krebs (citric acid) cycle' },
      { code: 'ENE-1.H', title: 'Cellular respiration — electron transport and chemiosmosis' },
      { code: 'ENE-1.I', title: 'Fermentation and anaerobic respiration' },
      { code: 'ENE-1.J', title: 'Molecular diversity in metabolic pathways' },
      { code: 'ENE-1.K', title: 'Energy flow through ecosystems' }
    ]
  },
  {
    number: 4,
    name: 'Cell Communication and Cell Cycle',
    weight: '10-15%',
    bigIdeas: ['IST'],
    los: [
      { code: 'IST-3.A', title: 'Cell communication — signal types' },
      { code: 'IST-3.B', title: 'Signal transduction pathways' },
      { code: 'IST-3.C', title: 'Cellular response to signals' },
      { code: 'IST-3.D', title: 'Cell cycle and mitosis' },
      { code: 'IST-3.E', title: 'Regulation of the cell cycle (checkpoints)' },
      { code: 'IST-3.F', title: 'Disruption of cell cycle (cancer)' }
    ]
  },
  {
    number: 5,
    name: 'Heredity',
    weight: '8-11%',
    bigIdeas: ['IST', 'EVO'],
    los: [
      { code: 'IST-1.B', title: 'Meiosis and genetic diversity' },
      { code: 'IST-1.C', title: 'Mendelian genetics' },
      { code: 'IST-1.D', title: 'Non-Mendelian inheritance patterns' },
      { code: 'IST-1.E', title: 'Chromosomal inheritance' },
      { code: 'IST-1.F', title: 'Environmental effects on phenotype' }
    ]
  },
  {
    number: 6,
    name: 'Gene Expression and Regulation',
    weight: '12-16%',
    bigIdeas: ['IST'],
    los: [
      { code: 'IST-1.G', title: 'DNA and RNA — comparing structures' },
      { code: 'IST-1.H', title: 'DNA replication' },
      { code: 'IST-1.I', title: 'Transcription (DNA → mRNA)' },
      { code: 'IST-1.J', title: 'Translation (mRNA → polypeptide)' },
      { code: 'IST-1.K', title: 'Mutations and their consequences' },
      { code: 'IST-1.L', title: 'Gene regulation in prokaryotes and eukaryotes' },
      { code: 'IST-1.M', title: 'Biotechnology' }
    ]
  },
  {
    number: 7,
    name: 'Natural Selection',
    weight: '13-20%',
    bigIdeas: ['EVO'],
    los: [
      { code: 'EVO-1.A', title: 'Natural selection and adaptation' },
      { code: 'EVO-1.B', title: 'Evidence for evolution' },
      { code: 'EVO-1.C', title: 'Common ancestry' },
      { code: 'EVO-2.A', title: 'Hardy-Weinberg equilibrium' },
      { code: 'EVO-2.B', title: 'Mechanisms of evolution' },
      { code: 'EVO-3.A', title: 'Speciation and extinction' },
      { code: 'EVO-3.B', title: 'Origin of life on Earth' }
    ]
  },
  {
    number: 8,
    name: 'Ecology',
    weight: '10-15%',
    bigIdeas: ['SYI', 'ENE', 'EVO'],
    los: [
      { code: 'SYI-2.B', title: 'Responses to environment' },
      { code: 'SYI-2.C', title: 'Behavior and natural selection' },
      { code: 'SYI-2.D', title: 'Energy flow in ecosystems' },
      { code: 'SYI-2.E', title: 'Population ecology' },
      { code: 'SYI-2.F', title: 'Community ecology' },
      { code: 'SYI-2.G', title: 'Biodiversity' },
      { code: 'SYI-2.H', title: 'Disruptions to ecosystems' }
    ]
  }
];

/* Convenience lookup: code → { unit, title } */
function getLO(code) {
  for (const unit of AP_BIO_UNITS) {
    const lo = unit.los.find(l => l.code === code);
    if (lo) return { ...lo, unit: unit.number, unitName: unit.name };
  }
  return null;
}

/* Returns the set of units that have at least one covered LO,
   given a list of covered LO codes. Used by the home page coverage summary. */
function getCoveredUnits(coveredCodes) {
  const covered = new Set();
  for (const unit of AP_BIO_UNITS) {
    if (unit.los.some(lo => coveredCodes.includes(lo.code))) {
      covered.add(unit.number);
    }
  }
  return Array.from(covered).sort((a, b) => a - b);
}
