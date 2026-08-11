/* =========================================================
   chemistry-checkins.js — sub-unit check-in quizzes.
   Fires between decks in the Chemistry of Life module.

   Question types:
     'mc'    — multiple choice. { q, choices[], correct (index), explanation }
     'tf'    — true/false.      { q, correct (bool), explanation }
     'match' — click one item on the left, then one on the right to pair.
                { q, pairs: [{ left, right }], explanation }
                The array order defines correct pairing; the UI shuffles
                the right column on render.
   ========================================================= */

const CHEM_CHECKIN_INTRO = [
  {
    type: 'mc',
    q: "Which element makes up the backbone of every organic molecule?",
    choices: ['Nitrogen', 'Oxygen', 'Carbon', 'Phosphorus'],
    correct: 2,
    explanation: "Carbon can form four stable bonds, letting it build long chains and rings — the skeleton of every biomolecule from sugar to DNA."
  },
  {
    type: 'tf',
    q: "In biology, ionic bonds are generally stronger and more stable than covalent bonds.",
    correct: false,
    explanation: "Covalent bonds (shared electrons) hold biomolecules together and are much stronger. Ionic bonds are common in salts but usually dissociate in water."
  },
  {
    type: 'match',
    q: "Match each element to its main biological role.",
    pairs: [
      { left: 'Nitrogen',   right: 'Part of proteins and DNA' },
      { left: 'Phosphorus', right: 'Backbone of DNA and ATP' },
      { left: 'Sulfur',     right: 'Bridges in some amino acids' },
      { left: 'Oxygen',     right: 'In water, sugars, and the air you breathe' }
    ],
    explanation: "Each element does specific jobs — N shows up in every amino acid, P holds DNA together, S forms disulfide bridges in proteins, O is everywhere."
  },
  {
    type: 'mc',
    q: "What kind of bond forms when two atoms SHARE electrons?",
    choices: ['Ionic bond', 'Covalent bond', 'Hydrogen bond', 'Van der Waals force'],
    correct: 1,
    explanation: "Covalent = shared electrons. Ionic = one atom takes an electron from another. Hydrogen bonds are much weaker attractions between polar molecules."
  }
];

const CHEM_CHECKIN_WATER = [
  {
    type: 'mc',
    q: "Water's ability to dissolve so many different substances comes from what property?",
    choices: ['Its high boiling point', 'Its polarity', 'Its low density as ice', 'Its cohesion'],
    correct: 1,
    explanation: "Because water is polar (one end slightly negative, the other slightly positive), it can pull apart and surround charged particles — dissolving them."
  },
  {
    type: 'tf',
    q: "Ice is denser than liquid water and sinks to the bottom of a frozen pond.",
    correct: false,
    explanation: "Ice is LESS dense than liquid water — that's why ice floats. Hydrogen bonds lock water molecules into an open lattice when frozen, spacing them apart."
  },
  {
    type: 'match',
    q: "Match each water property to a real-world effect it causes.",
    pairs: [
      { left: 'Cohesion',                    right: 'Water striders walk on ponds' },
      { left: 'High specific heat',          right: 'Oceans stabilize coastal climate' },
      { left: 'Ice less dense than water',   right: 'Fish survive under frozen lakes' },
      { left: 'Polarity',                    right: 'Salt dissolves in water' }
    ],
    explanation: "Every weird thing water does traces back to hydrogen bonds between polar water molecules."
  },
  {
    type: 'mc',
    q: "The slight positive and negative charges on opposite ends of a water molecule are called...",
    choices: ['A dipole', 'An ion', 'A radical', 'A dimer'],
    correct: 0,
    explanation: "A dipole is a molecule with a separation of charge across it. Water's dipole is what makes it such a powerful solvent."
  }
];

const CHEM_CHECKIN_BUILDING = [
  {
    type: 'mc',
    q: "When two monomers link together to form a polymer, what small molecule is released?",
    choices: ['Oxygen (O₂)', 'Carbon dioxide (CO₂)', 'Water (H₂O)', 'Ammonia (NH₃)'],
    correct: 2,
    explanation: "That's why it's called dehydration synthesis — each new bond removes an -OH from one monomer and an -H from the other, forming water."
  },
  {
    type: 'tf',
    q: "Hydrolysis is the process that BUILDS polymers by joining monomers together.",
    correct: false,
    explanation: "It's the opposite — hydrolysis (literally 'water splitting') BREAKS polymers apart by adding a water molecule at each bond. Dehydration synthesis is what builds."
  },
  {
    type: 'match',
    q: "Match each macromolecule family to its monomer.",
    pairs: [
      { left: 'Carbohydrates',   right: 'Monosaccharides' },
      { left: 'Proteins',        right: 'Amino acids' },
      { left: 'Nucleic acids',   right: 'Nucleotides' },
      { left: 'Lipids',          right: 'Fatty acids + glycerol' }
    ],
    explanation: "Three of the four macromolecule families are true polymers built from repeating units. Lipids are a bit different — they're assembled from fatty acids and glycerol, not one repeating monomer."
  },
  {
    type: 'mc',
    q: "Digestion in your stomach and small intestine is mostly which chemical reaction?",
    choices: ['Dehydration synthesis', 'Hydrolysis', 'Oxidation', 'Reduction'],
    correct: 1,
    explanation: "Digestive enzymes hydrolyze the polymers in your food — proteins into amino acids, carbs into sugars, etc. — so they're small enough to absorb into your bloodstream."
  }
];

const CHEM_CHECKIN_MACRO = [
  {
    type: 'mc',
    q: "Which macromolecule family contains carbon, hydrogen, nitrogen, oxygen, AND phosphorus (CHNOP)?",
    choices: ['Carbohydrates', 'Lipids', 'Proteins', 'Nucleic acids'],
    correct: 3,
    explanation: "Nucleic acids (DNA and RNA) are the CHNOP family — that P comes from the phosphate group in the sugar-phosphate backbone."
  },
  {
    type: 'tf',
    q: "A protein is a polymer of amino acids linked by peptide bonds.",
    correct: true,
    explanation: "Correct — a chain of amino acids joined by peptide bonds is called a polypeptide, which folds into a functional protein."
  },
  {
    type: 'match',
    q: "Match each macromolecule to its main biological role.",
    pairs: [
      { left: 'Carbohydrates',   right: 'Quick energy and plant structure' },
      { left: 'Proteins',        right: 'Enzymes, structure, transport' },
      { left: 'Lipids',          right: 'Long-term energy and membranes' },
      { left: 'Nucleic acids',   right: 'Store and transmit genetic info' }
    ],
    explanation: "Each macromolecule has a distinct set of jobs, though they overlap — proteins can also be energy, lipids are also signaling molecules, etc."
  },
  {
    type: 'mc',
    q: "Which macromolecule is made mostly of just carbon and hydrogen (very few polar groups), making it hydrophobic?",
    choices: ['Nucleic acids', 'Carbohydrates', 'Lipids', 'Proteins'],
    correct: 2,
    explanation: "Lipids — fats, oils, and cell membrane phospholipids — are dominated by long carbon-hydrogen chains, which don't mix with water."
  }
];

const CHEMISTRY_CHECKINS = {
  intro:    CHEM_CHECKIN_INTRO,
  water:    CHEM_CHECKIN_WATER,
  building: CHEM_CHECKIN_BUILDING,
  macro:    CHEM_CHECKIN_MACRO
};
