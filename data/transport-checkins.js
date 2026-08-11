/* Sub-unit check-ins for Membrane Transport. */

const TRANSPORT_CHECKINS = {
  intro: [
    { type: 'mc', q: "What determines whether a molecule can pass directly through the lipid bilayer?",
      choices: ['Only its size', 'Only its polarity', 'Both size AND polarity', 'Its color'],
      correct: 2,
      explanation: "Small nonpolar molecules (O₂, CO₂) slip through easily. Large or polar molecules need a protein channel or carrier." },
    { type: 'tf', q: "\"Selectively permeable\" means the membrane lets everything through eventually.",
      correct: false,
      explanation: "Selectively permeable = some molecules yes, others no. That control is what keeps cells alive." },
    { type: 'match', q: "Match each membrane component to its job.",
      pairs: [
        { left: 'Phospholipid bilayer', right: 'Separates inside from outside' },
        { left: 'Membrane proteins',    right: 'Transport specific molecules' },
        { left: 'Cholesterol',          right: 'Keeps the membrane fluid' },
        { left: 'Glycoproteins',        right: 'Cell recognition and signaling' }
      ],
      explanation: "The bilayer is the barrier; proteins are the traffic system; cholesterol tunes stiffness; sugar tags say \"who's who.\"" },
    { type: 'mc', q: "Which of these can cross the bilayer WITHOUT a protein?",
      choices: ['Glucose', 'Sodium ions', 'Oxygen (O₂)', 'DNA'],
      correct: 2,
      explanation: "O₂ and CO₂ are small and nonpolar — they diffuse through directly. Glucose needs a carrier, ions need channels, DNA never crosses." }
  ],
  passive: [
    { type: 'mc', q: "What DRIVES passive transport?",
      choices: ['ATP hydrolysis', 'Concentration gradient', 'The nucleus', 'Sunlight'],
      correct: 1,
      explanation: "Passive transport moves molecules \"downhill\" — from high to low concentration. No cellular energy required." },
    { type: 'tf', q: "Facilitated diffusion still requires ATP.",
      correct: false,
      explanation: "Facilitated diffusion uses a protein helper but still moves molecules down their gradient — no ATP needed. That's what makes it \"passive.\"" },
    { type: 'match', q: "Match each transport method to what it moves.",
      pairs: [
        { left: 'Simple diffusion',  right: 'O₂ crossing the lipid bilayer' },
        { left: 'Channel protein',   right: 'K⁺ ions moving down gradient' },
        { left: 'Carrier protein',   right: 'Glucose entering the cell' },
        { left: 'Aquaporin',         right: 'Water crossing quickly' }
      ],
      explanation: "Different cargoes need different transport systems — that's why membranes have so many different proteins." },
    { type: 'mc', q: "How do channels differ from carriers?",
      choices: ['Channels use ATP', 'Channels are open pores; carriers change shape', 'Carriers only move water', 'They are the same thing'],
      correct: 1,
      explanation: "Channels are hollow tunnels (sometimes gated). Carriers physically bind their substrate and change shape to shuttle it across." }
  ],
  tonicity: [
    { type: 'mc', q: "Osmosis: water moves toward the side with...",
      choices: ['Higher solute concentration', 'Lower solute concentration', 'More sunlight', 'More warmth'],
      correct: 0,
      explanation: "Water moves toward higher solute concentration (that's the side with less water per volume). It's just water diffusing down its own gradient." },
    { type: 'tf', q: "A red blood cell placed in a HYPERTONIC solution swells and bursts.",
      correct: false,
      explanation: "In a hypertonic solution (more solute outside), water leaves — the cell shrinks (crenation). Cells burst in HYPOTONIC solutions." },
    { type: 'match', q: "Match each tonicity to what happens to a cell.",
      pairs: [
        { left: 'Hypotonic outside',    right: 'Water enters; cell swells/bursts' },
        { left: 'Isotonic outside',     right: 'No net water movement' },
        { left: 'Hypertonic outside',   right: 'Water leaves; cell shrinks' },
        { left: 'Plant in hypertonic',  right: 'Plasmolysis — membrane pulls away from wall' }
      ],
      explanation: "Same rule for every cell — water follows solute. The differences come from cell walls (plants stay firm; animals pop)." },
    { type: 'mc', q: "A plant cell in HYPOTONIC water becomes...",
      choices: ['Explodes', 'Turgid (firm)', 'Flaccid', 'Plasmolyzed'],
      correct: 1,
      explanation: "The rigid cell wall stops the plant cell from bursting. Instead, water pushes the membrane against the wall — turgor pressure — which keeps plants upright." }
  ]
};
