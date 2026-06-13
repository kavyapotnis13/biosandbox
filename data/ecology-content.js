/* =========================================================
   ecology-content.js — flashcards for Ecology

   Four card decks:
     ECOLOGY_INTRO_CARDS    — biotic/abiotic, levels of
                               organization (organism → biosphere)
     ECOLOGY_ENERGY_FLOW    — trophic levels, 10% rule,
                               producers/consumers/decomposers
     ECOLOGY_POPULATIONS    — exp vs logistic growth, carrying
                               capacity, density-dependent factors
     ECOLOGY_COMMUNITIES    — keystone species, biodiversity,
                               human disruption, succession
   ========================================================= */

const ECOLOGY_INTRO_CARDS = [
  {
    title: "What is ecology?",
    body: `
      <p><strong>Ecology</strong> is the study of how organisms interact with each other and with their environment.</p>
      <p>It's the biggest-picture branch of biology — instead of zooming into a single cell, ecologists zoom out to ask: how does an entire forest, ocean, or savanna actually work?</p>
      <p>Every breath you take, every meal you eat, every drop of clean water you drink is the output of ecological processes happening across the planet.</p>
    `
  },
  {
    title: "Biotic vs abiotic factors",
    body: `
      <p>An organism's environment is made up of two kinds of things:</p>
      <ul>
        <li><strong>Biotic factors</strong> — the <em>living</em> parts (predators, prey, plants, microbes, competitors, mates)</li>
        <li><strong>Abiotic factors</strong> — the <em>non-living</em> parts (sunlight, temperature, water, soil chemistry, wind, pH)</li>
      </ul>
      <p>A polar bear's life is shaped by seal populations (biotic) AND sea ice extent (abiotic). Change either one and the bear is in trouble.</p>
    `
  },
  {
    title: "Levels of organization",
    body: `
      <p>Ecologists study life at six nested scales:</p>
      <ol>
        <li><strong>Organism</strong> — a single individual</li>
        <li><strong>Population</strong> — all the individuals of one species in one area</li>
        <li><strong>Community</strong> — all the populations of different species living together</li>
        <li><strong>Ecosystem</strong> — the community plus its abiotic environment</li>
        <li><strong>Biome</strong> — large geographic regions with similar climate and life (tundra, desert, rainforest)</li>
        <li><strong>Biosphere</strong> — every part of Earth where life exists</li>
      </ol>
    `
  },
  {
    title: "Niches and habitats",
    body: `
      <p>Two related but distinct concepts:</p>
      <ul>
        <li><strong>Habitat</strong> — <em>where</em> an organism lives (the kelp forest, the canopy, the riverbank)</li>
        <li><strong>Niche</strong> — <em>how</em> an organism lives there: what it eats, when it's active, what eats it, how it reproduces</li>
      </ul>
      <p>Two species can share a habitat but they can't share an identical niche for long — one will out-compete the other. That's the <strong>competitive exclusion principle</strong>.</p>
    `
  }
];

const ECOLOGY_ENERGY_FLOW = [
  {
    title: "Where the energy comes from",
    body: `
      <p>Almost every ecosystem on Earth runs on <strong>sunlight</strong>. <strong>Producers</strong> (plants, algae, cyanobacteria) capture solar energy via photosynthesis and lock it into sugar molecules.</p>
      <p>From there, energy moves up the food chain — but only a tiny fraction makes the trip.</p>
      <p>A few weird ecosystems (deep-sea hydrothermal vents) run on chemical energy from rocks instead. But sunlight powers almost everything else.</p>
    `
  },
  {
    title: "Trophic levels",
    body: `
      <p>Organisms get grouped by what they eat:</p>
      <ul>
        <li><strong>Producers</strong> (1st trophic level) — make their own food from sunlight</li>
        <li><strong>Primary consumers</strong> (2nd) — eat producers. Herbivores like rabbits and grasshoppers</li>
        <li><strong>Secondary consumers</strong> (3rd) — eat primary consumers. Many small carnivores like snakes</li>
        <li><strong>Tertiary consumers</strong> (4th) — eat secondary consumers. Apex predators like hawks and wolves</li>
        <li><strong>Decomposers</strong> — bacteria and fungi that break down dead matter at every level, returning nutrients to the soil</li>
      </ul>
    `
  },
  {
    title: "The 10% rule",
    body: `
      <p>Only about <strong>10%</strong> of the energy at one trophic level makes it to the next. The other 90% gets lost as heat, used up by the organism's own metabolism, or stuck in indigestible parts.</p>
      <p>This is why food chains rarely go more than 4–5 levels deep — there just isn't enough energy left at the top.</p>
      <p>It also explains why eating lower on the food chain (plants) supports far more people per acre than eating higher (beef). The energy math is brutal.</p>
    `
  },
  {
    title: "Food chains vs food webs",
    body: `
      <p>A <strong>food chain</strong> is a single linear path: grass → rabbit → fox → hawk.</p>
      <p>A <strong>food web</strong> is the full network of who-eats-whom in a community, with most organisms eating (and being eaten by) several different species.</p>
      <p>Webs are more realistic — and they're more <em>resilient</em>. If a rabbit population crashes, a fox that also eats mice can survive. A specialist with only one food source is in trouble.</p>
    `
  }
];

const ECOLOGY_POPULATIONS = [
  {
    title: "Exponential growth",
    body: `
      <p>When resources are unlimited and there's nothing slowing them down, populations grow <strong>exponentially</strong> — each generation produces more offspring than the last, compounding.</p>
      <p>The growth curve looks like a <strong>J</strong>: starts slow, then rockets up.</p>
      <p>Bacteria in a fresh petri dish, invasive species in a new continent, humans after the agricultural revolution — all classic J-curves.</p>
    `
  },
  {
    title: "Logistic growth & carrying capacity",
    body: `
      <p>Real populations can't grow forever. Eventually they hit limits — food runs out, predators arrive, waste builds up.</p>
      <p>When growth slows and levels off, you get <strong>logistic growth</strong> — an <strong>S-shaped</strong> curve.</p>
      <p>The flat top is <strong>carrying capacity</strong> (<code>K</code>): the maximum population size the environment can sustain long-term.</p>
    `
  },
  {
    title: "Density-dependent vs independent",
    body: `
      <p>What pulls populations back toward carrying capacity?</p>
      <ul>
        <li><strong>Density-dependent factors</strong> get stronger as the population grows: competition for food, disease spread, predation. The denser the herd, the faster the flu rips through.</li>
        <li><strong>Density-independent factors</strong> hit no matter how crowded the population is: floods, fires, droughts, volcanic eruptions. The hurricane doesn't care how many crabs were on the beach.</li>
      </ul>
    `
  },
  {
    title: "r-selected vs K-selected",
    body: `
      <p>Two opposite life strategies:</p>
      <ul>
        <li><strong>r-selected</strong> species (rats, dandelions, frogs) — many offspring, little parental care, short lives. Bet on volume.</li>
        <li><strong>K-selected</strong> species (elephants, humans, whales, oak trees) — few offspring, heavy parental investment, long lives. Bet on quality.</li>
      </ul>
      <p>Neither is "better" — they're tuned to different environments. Unstable, boom-bust environments favor r; stable, crowded ones favor K.</p>
    `
  }
];

const ECOLOGY_COMMUNITIES = [
  {
    title: "Keystone species",
    body: `
      <p>A <strong>keystone species</strong> has an effect on its ecosystem that's wildly out of proportion to its population size. Remove it and the whole community collapses.</p>
      <p><strong>Sea otters</strong> are a classic example: they eat sea urchins, which eat kelp. Wipe out the otters and the urchins explode, mow down the kelp forest, and dozens of other species lose their habitat.</p>
      <p>Wolves in Yellowstone played the same role — their reintroduction in 1995 reshaped vegetation, rivers, and prey populations across the entire park.</p>
    `
  },
  {
    title: "Biodiversity — and why it matters",
    body: `
      <p><strong>Biodiversity</strong> measures the variety of life in an ecosystem. It comes in three flavors:</p>
      <ul>
        <li><strong>Genetic diversity</strong> — variation within a species</li>
        <li><strong>Species diversity</strong> — number of different species in a community</li>
        <li><strong>Ecosystem diversity</strong> — variety of ecosystems in a region</li>
      </ul>
      <p>High-biodiversity ecosystems are more <em>resilient</em> — if one species fails, others can fill its role. Low diversity = fragile.</p>
    `
  },
  {
    title: "Ecological succession",
    body: `
      <p>Ecosystems aren't static — they change predictably over time, especially after a disturbance.</p>
      <ul>
        <li><strong>Primary succession</strong> — bare rock (after a glacier or lava) gets colonized by lichens, then mosses, then grasses, then shrubs, then trees over centuries</li>
        <li><strong>Secondary succession</strong> — after a fire, hurricane, or abandoned farm field, the soil is still there, so recovery is much faster (decades, not millennia)</li>
      </ul>
      <p>The end state is sometimes called a <strong>climax community</strong> — though modern ecology recognizes that ecosystems rarely sit still for long.</p>
    `
  },
  {
    title: "Responses to the environment",
    body: `
      <p>Organisms constantly react to changes in their surroundings. <strong>Short-term physiological responses</strong> happen in seconds to hours: sweating to cool off, dilating pupils, plants closing stomata in drought.</p>
      <p><strong>Behavioral responses</strong> happen on similar timescales: animals seek shade, school for safety, migrate seasonally.</p>
      <p>Over many generations, <strong>adaptive responses</strong> become evolutionary changes — populations whose responses work better leave more offspring, and those traits spread.</p>
      <p>Some responses are <em>tropisms</em> in plants: phototropism (growing toward light), gravitropism (roots growing down). They're built-in, automatic responses to specific environmental cues.</p>
    `
  },
  {
    title: "Behavior + natural selection",
    body: `
      <p>Behavior is shaped by both genes and environment, and just like any other trait, it can be acted on by natural selection.</p>
      <ul>
        <li><strong>Innate behaviors</strong> — coded in the genes; appear without learning. Newborn sea-turtle hatchlings crawl toward the brightest horizon (usually the moonlit sea).</li>
        <li><strong>Learned behaviors</strong> — emerge from individual experience. Crows learning to drop nuts on roads for cars to crack.</li>
        <li><strong>Cooperative behaviors</strong> — kin selection (helping relatives spreads shared genes), altruism in social insects, alarm calls.</li>
      </ul>
      <p>Behavior that boosts survival or reproduction gets selected for over generations — even if the individuals don't "know" why they're doing it.</p>
    `
  },
  {
    title: "Energy flow through ecosystems",
    body: `
      <p>Zooming out from the 10% rule: <strong>energy flows in one direction</strong> through an ecosystem — sun → producers → consumers → decomposers — and is steadily lost as heat at every level.</p>
      <p>Because of this loss, ecosystems need a constant input of energy (sunlight, mostly) to keep running. Take the sun away and the whole system winds down within years.</p>
      <p>Contrast this with <strong>matter</strong> (carbon, nitrogen, phosphorus), which <em>cycles</em> — atoms get used and reused indefinitely. Energy flows; matter cycles. Memorize that.</p>
      <p>Total primary productivity sets the ceiling on how much life an ecosystem can support. Tropical rainforests and coral reefs sit near the top; deserts and deep oceans near the bottom.</p>
    `
  },
  {
    title: "Human impact",
    body: `
      <p>We've become the biggest disruption to nearly every ecosystem on Earth:</p>
      <ul>
        <li><strong>Habitat destruction</strong> — deforestation, urban sprawl, agriculture</li>
        <li><strong>Climate change</strong> — burning fossil fuels traps heat, shifts ranges, acidifies oceans</li>
        <li><strong>Invasive species</strong> — moving plants and animals across continents, where they have no natural predators</li>
        <li><strong>Pollution</strong> — plastic, runoff, pesticides, light, noise</li>
        <li><strong>Overharvesting</strong> — fisheries, hunting, logging beyond replacement rates</li>
      </ul>
      <p>The good news: ecology also tells us how to fix things. Wolves came back to Yellowstone. The ozone hole is healing. Bald eagles are off the endangered list. It's possible.</p>
    `
  }
];
