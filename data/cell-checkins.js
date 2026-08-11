/* =========================================================
   cell-checkins.js — sub-unit check-in quiz for the Cell Explorer.
   Focus: differences between plant and animal cells.

   Question types (see chemistry-checkins.js for the full spec):
     'mc'    — multiple choice
     'tf'    — true/false
     'match' — click one chip, then one slot to pair
   ========================================================= */

const CELL_CHECKIN_PLANT_VS_ANIMAL = [
  {
    type: 'mc',
    q: "Which structure is found in plant cells but NOT in animal cells?",
    choices: ['Mitochondria', 'Cell wall', 'Nucleus', 'Ribosomes'],
    correct: 1,
    explanation: "Plant cells are surrounded by a rigid cell wall made of cellulose, on the outside of the cell membrane. Animal cells stop at the membrane — no wall."
  },
  {
    type: 'mc',
    q: "Which organelle lets plant cells make their own food from sunlight?",
    choices: ['Mitochondria', 'Chloroplasts', 'Lysosomes', 'Ribosomes'],
    correct: 1,
    explanation: "Chloroplasts contain chlorophyll and run photosynthesis, turning sunlight, water, and CO₂ into sugar. Animal cells don't have them — animals eat their food instead."
  },
  {
    type: 'tf',
    q: "Both plant and animal cells have mitochondria.",
    correct: true,
    explanation: "Yes — both need to break down sugars for energy through cellular respiration. Plants make their own sugar in chloroplasts and then burn it in mitochondria, just like animals do."
  },
  {
    type: 'tf',
    q: "Animal cells have a large central vacuole that stores water and helps keep the cell rigid.",
    correct: false,
    explanation: "That's a plant-cell feature. Animal cells have small, scattered vesicles; the large central vacuole is what pushes plant cells against their cell walls to keep leaves and stems firm."
  },
  {
    type: 'match',
    q: "Match each structure to where you'd find it.",
    pairs: [
      { left: 'Cell wall',             right: 'Plant cells only' },
      { left: 'Chloroplasts',          right: 'Plant cells only' },
      { left: 'Large central vacuole', right: 'Mostly plant cells' },
      { left: 'Centrioles',            right: 'Animal cells only' },
      { left: 'Mitochondria',          right: 'Both plant and animal cells' }
    ],
    explanation: "Plants have three big things animals don't — cell wall, chloroplasts, and a huge central vacuole. Animals have centrioles that help organize cell division. Both share mitochondria, a nucleus, ribosomes, and ER."
  },
  {
    type: 'mc',
    q: "You look at a cell under a microscope. It has a nucleus, mitochondria, and a rigid rectangular shape. Most likely it's...",
    choices: ['Bacterial', 'Animal', 'Plant', 'Viral'],
    correct: 2,
    explanation: "The rigid, angular shape is the giveaway — animal cells are usually rounder and more flexible because they don't have a cell wall pressing them into shape."
  }
];

const CELL_CHECKINS = {
  'plant-vs-animal': CELL_CHECKIN_PLANT_VS_ANIMAL
};
