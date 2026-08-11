/* Sub-unit check-ins for Ecology. */

const ECOLOGY_CHECKINS = {
  intro: [
    { type: 'mc', q: "Ecology is the study of:",
      choices: ['Fossils', 'How organisms interact with each other and their environment', 'Individual cell function', 'The atmosphere alone'],
      correct: 1,
      explanation: "Ecology covers all relationships — predator/prey, competition, energy flow, ecosystem dynamics — everything about how living things fit together." },
    { type: 'tf', q: "An ecosystem includes only LIVING things.",
      correct: false,
      explanation: "Ecosystems include BOTH living (biotic) AND non-living (abiotic) components — plants, animals, soil, water, air, sunlight, temperature." },
    { type: 'match', q: "Match each ecology term to its level.",
      pairs: [
        { left: 'Population',   right: 'Group of same species in an area' },
        { left: 'Community',    right: 'All species in an area, interacting' },
        { left: 'Ecosystem',    right: 'Community + physical environment' },
        { left: 'Biosphere',    right: 'All ecosystems on Earth combined' }
      ],
      explanation: "Zoom in or out: individual → population → community → ecosystem → biosphere." },
    { type: 'mc', q: "A BIOTIC factor in an ecosystem is:",
      choices: ['Temperature', 'Sunlight', 'A predator', 'Soil moisture'],
      correct: 2,
      explanation: "Biotic = living. Abiotic = non-living. Predators, plants, decomposers are biotic. Temperature, sunlight, water, soil are abiotic." }
  ],
  energy: [
    { type: 'mc', q: "In a food chain, arrows point:",
      choices: ['From prey to predator (direction of energy flow)', 'From predator to prey', 'In both directions', 'Wherever you want'],
      correct: 0,
      explanation: "Arrows point in the direction of ENERGY FLOW — from what's eaten to what eats it. So plant → mouse → owl." },
    { type: 'tf', q: "About 10% of energy is passed from one trophic level to the next.",
      correct: true,
      explanation: "The \"10% rule\" — each trophic level captures ~10% of the energy from the level below. That's why food chains rarely have more than 4-5 levels." },
    { type: 'match', q: "Match each trophic level to an example.",
      pairs: [
        { left: 'Producer (1st)',              right: 'Grass' },
        { left: 'Primary consumer (2nd)',      right: 'Rabbit' },
        { left: 'Secondary consumer (3rd)',    right: 'Fox' },
        { left: 'Tertiary consumer (4th)',     right: 'Hawk' }
      ],
      explanation: "Producers capture solar energy; each consumer level up captures ~10% of what's below. Big top predators need enormous ecosystems." },
    { type: 'mc', q: "Why do food chains RARELY have more than 4-5 trophic levels?",
      choices: ['No animals live that high', 'Too little energy left to support more levels', 'The sun doesn\'t provide enough light', 'Predators refuse'],
      correct: 1,
      explanation: "With only ~10% energy passed up each level, by trophic level 5 there's ~0.01% of original solar energy left. Not enough to support big predators." }
  ],
  populations: [
    { type: 'mc', q: "EXPONENTIAL growth happens when:",
      choices: ['Population is at carrying capacity', 'Resources are unlimited', 'Predators are abundant', 'Habitat is small'],
      correct: 1,
      explanation: "Exponential growth (\"J curve\") occurs when resources allow unlimited multiplication. Real populations hit limits and switch to LOGISTIC (S curve) growth." },
    { type: 'tf', q: "Carrying capacity is the MAXIMUM population size an environment can sustainably support.",
      correct: true,
      explanation: "Carrying capacity (K) is the equilibrium point where resources match population needs. Above K, individuals starve or emigrate; below, population grows." },
    { type: 'match', q: "Match each population term to its definition.",
      pairs: [
        { left: 'Exponential growth',   right: 'Unlimited resources, J-shaped curve' },
        { left: 'Logistic growth',      right: 'Resource-limited, S-shaped curve' },
        { left: 'Carrying capacity (K)', right: 'Max sustainable population' },
        { left: 'Limiting factor',      right: 'What caps growth (food, space, water)' }
      ],
      explanation: "In real ecosystems, growth is bounded. Something always runs out first — that's the limiting factor." },
    { type: 'mc', q: "Rabbits reproduce rapidly. Foxes keep their numbers in check. What kind of interaction is this?",
      choices: ['Mutualism', 'Parasitism', 'Predation', 'Competition'],
      correct: 2,
      explanation: "Predation — one organism kills and eats another. Predator-prey cycles (like lynx and hare) show how each affects the other's numbers." }
  ]
};
