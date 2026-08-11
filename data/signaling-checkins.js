/* Sub-unit check-ins for Cell Signaling. */

const SIGNAL_CHECKINS = {
  intro: [
    { type: 'mc', q: "The three main steps of a signaling pathway (in order) are:",
      choices: ['Response → transduction → reception', 'Reception → transduction → response', 'Transduction → reception → response', 'Reception → response → transduction'],
      correct: 1,
      explanation: "A ligand binds a receptor (reception), the signal is passed through a cascade (transduction), and the cell finally does something (response)." },
    { type: 'tf', q: "Cells only respond to signals from other cells in the same organism.",
      correct: false,
      explanation: "Cells respond to many sources — hormones, neighboring cells, pathogens, drugs, environmental cues, temperature — the list is long." },
    { type: 'match', q: "Match each signal type to its range.",
      pairs: [
        { left: 'Endocrine',   right: 'Hormones travel via blood, long distance' },
        { left: 'Paracrine',   right: 'Nearby cells only' },
        { left: 'Autocrine',   right: 'Cell signals itself' },
        { left: 'Synaptic',    right: 'Nerve cells across a synapse' }
      ],
      explanation: "Signaling ranges from touching neighbors (paracrine) to reaching across the body (endocrine). Distance and specificity matter." },
    { type: 'mc', q: "Why is cell signaling important?",
      choices: ['So cells can photosynthesize', 'So cells can coordinate and respond to their environment', 'So cells can divide', 'So cells can build DNA'],
      correct: 1,
      explanation: "Without signaling, cells couldn't coordinate immune responses, hormonal control, growth, or almost any multi-cell behavior." }
  ],
  reception: [
    { type: 'mc', q: "What binds to a cell-surface receptor to start a signal?",
      choices: ['Enzyme', 'Ligand', 'Codon', 'Substrate'],
      correct: 1,
      explanation: "A ligand (like a hormone or growth factor) binds the receptor, triggering a shape change that kicks off the cascade." },
    { type: 'tf', q: "All receptors are on the OUTSIDE of the cell membrane.",
      correct: false,
      explanation: "Water-soluble ligands bind surface receptors, but fat-soluble ones (like steroid hormones) pass through membranes and bind INTRACELLULAR receptors." },
    { type: 'match', q: "Match each receptor type to its typical ligand.",
      pairs: [
        { left: 'G protein-coupled receptor', right: 'Many hormones + neurotransmitters' },
        { left: 'Receptor tyrosine kinase',   right: 'Growth factors' },
        { left: 'Ion channel receptor',        right: 'Neurotransmitters (e.g. acetylcholine)' },
        { left: 'Intracellular receptor',     right: 'Steroid hormones (lipid-soluble)' }
      ],
      explanation: "Different receptor families handle different signal types. Their location + shape determines what can trigger them." },
    { type: 'mc', q: "Why can steroid hormones bind INSIDE the cell?",
      choices: ['They\'re too small to fit outside', 'They\'re lipid-soluble and pass through the membrane', 'They only bind DNA', 'Cells make holes for them'],
      correct: 1,
      explanation: "Steroids like estrogen and testosterone are hydrophobic — they slip through the phospholipid bilayer easily. Their receptors are inside." }
  ],
  cascade: [
    { type: 'mc', q: "What's the main benefit of a multi-step signaling cascade?",
      choices: ['It\'s slower', 'It amplifies the signal', 'It uses more energy', 'It looks fancier'],
      correct: 1,
      explanation: "Each activated protein can activate many next-step proteins, amplifying one signal into a huge response — thousands of enzymes activated from a single ligand." },
    { type: 'tf', q: "Second messengers (like cAMP) transmit signals OUTSIDE the cell.",
      correct: false,
      explanation: "Second messengers are INSIDE the cell. Small molecules that spread the signal through the cytoplasm after the first message hits the membrane." },
    { type: 'match', q: "Match each transduction component to its role.",
      pairs: [
        { left: 'Second messenger', right: 'Spreads signal inside cell' },
        { left: 'Protein kinase',    right: 'Adds phosphate to activate proteins' },
        { left: 'Phosphatase',       right: 'Removes phosphate to deactivate' },
        { left: 'Transcription factor', right: 'Alters gene expression as response' }
      ],
      explanation: "Cascades work through molecular relays — mostly proteins turning each other on/off by adding or removing phosphate groups." },
    { type: 'mc', q: "Why do signaling pathways need OFF switches (like phosphatases)?",
      choices: ['To slow things down', 'To turn the response off when it\'s done', 'They don\'t need them', 'To multiply mistakes'],
      correct: 1,
      explanation: "Cells need OFF switches as much as ON switches. Runaway signaling causes disease — cancer, inflammation, autoimmune conditions." }
  ],
  cancer: [
    { type: 'mc', q: "Cancer is fundamentally a disease of:",
      choices: ['Vitamin deficiency', 'Broken control over cell division', 'Overheating', 'Too little signaling'],
      correct: 1,
      explanation: "Cancer = uncontrolled cell division. The signaling systems that normally control the cell cycle break down, so cells divide when they shouldn't." },
    { type: 'tf', q: "A single mutation usually causes cancer.",
      correct: false,
      explanation: "Cancer typically requires MULTIPLE mutations — several \"brakes\" knocked out and \"accelerators\" jammed before a cell grows uncontrollably." },
    { type: 'match', q: "Match each cancer-gene type to its normal role.",
      pairs: [
        { left: 'Proto-oncogene',       right: 'Normally promotes cell division (accelerator)' },
        { left: 'Tumor suppressor gene', right: 'Normally puts brakes on division' },
        { left: 'DNA repair gene',      right: 'Normally fixes DNA damage' },
        { left: 'Apoptosis gene',       right: 'Normally triggers cell suicide if damaged' }
      ],
      explanation: "Cancer usually needs damage to multiple systems: broken accelerators, broken brakes, broken repair, and broken self-destruct." },
    { type: 'mc', q: "The tumor suppressor p53 normally does what?",
      choices: ['Speeds cell division', 'Halts division, repairs DNA, or triggers apoptosis if damaged', 'Makes proteins', 'Creates cancer cells'],
      correct: 1,
      explanation: "p53 detects damage and either pauses the cycle for repair or triggers apoptosis. When p53 is mutated, damaged cells divide and become cancerous." }
  ]
};
