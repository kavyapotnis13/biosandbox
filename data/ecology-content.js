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

   Each card has body: { middle, high }.
   ========================================================= */

const ECOLOGY_INTRO_CARDS = [
  {
    title: "What is ecology?",
    body: {
      middle: `
        <p><strong>Ecology</strong> is the study of how living things <strong>interact with each other and their environment</strong>.</p>
        <p>Most of biology zooms in on tiny things — cells, molecules, DNA. Ecology zooms way out: how does a whole forest work? An ocean? A field of grass?</p>
        <p>The air you breathe, the water you drink, the food you eat — all of it comes from ecological processes happening around the world every day.</p>
      `,
      high: `
        <p><strong>Ecology</strong> is the study of how organisms interact with each other and with their environment.</p>
        <p>It's the biggest-picture branch of biology — instead of zooming into a single cell, ecologists zoom out to ask: how does an entire forest, ocean, or savanna actually work?</p>
        <p>Every breath you take, every meal you eat, every drop of clean water you drink is the output of ecological processes happening across the planet.</p>
      `
    }
  },
  {
    title: "Living vs nonliving environment",
    body: {
      middle: `
        <p>An organism's environment has two parts:</p>
        <ul>
          <li><strong>Living things</strong> around it — other animals it eats, predators that eat it, plants, microbes.</li>
          <li><strong>Nonliving things</strong> — sunlight, temperature, water, soil, wind.</li>
        </ul>
        <p>A polar bear's survival depends on both: it needs seals to eat (living) AND it needs sea ice to hunt on (nonliving). Lose either one and the polar bear is in trouble.</p>
      `,
      high: `
        <p>An organism's environment is made up of two kinds of things:</p>
        <ul>
          <li><strong>Biotic factors</strong> — the <em>living</em> parts (predators, prey, plants, microbes, competitors, mates)</li>
          <li><strong>Abiotic factors</strong> — the <em>non-living</em> parts (sunlight, temperature, water, soil chemistry, wind, pH)</li>
        </ul>
        <p>A polar bear's life is shaped by seal populations (biotic) AND sea ice extent (abiotic). Change either one and the bear is in trouble.</p>
      `
    }
  },
  {
    title: "Six levels of life",
    body: {
      middle: `
        <p>Ecologists study life at six levels, from smallest to biggest:</p>
        <ol>
          <li><strong>Organism</strong> — one individual (one fish).</li>
          <li><strong>Population</strong> — all the fish of one species in one place.</li>
          <li><strong>Community</strong> — all the different species living together.</li>
          <li><strong>Ecosystem</strong> — the community + the nonliving parts of its environment.</li>
          <li><strong>Biome</strong> — huge regions with similar climates (deserts, rainforests, tundra).</li>
          <li><strong>Biosphere</strong> — every place on Earth where life exists.</li>
        </ol>
      `,
      high: `
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
    }
  },
  {
    title: "Niches and habitats",
    body: {
      middle: `
        <p>Two related but different ideas:</p>
        <ul>
          <li><strong>Habitat</strong> — <em>where</em> an organism lives (the kelp forest, the riverbank, the desert).</li>
          <li><strong>Niche</strong> — <em>what it does</em> there: what it eats, when it's active, what eats it, etc.</li>
        </ul>
        <p>Two species can share a habitat, but they can't share the exact same niche — one will end up out-competing the other.</p>
      `,
      high: `
        <p>Two related but distinct concepts:</p>
        <ul>
          <li><strong>Habitat</strong> — <em>where</em> an organism lives (the kelp forest, the canopy, the riverbank)</li>
          <li><strong>Niche</strong> — <em>how</em> an organism lives there: what it eats, when it's active, what eats it, how it reproduces</li>
        </ul>
        <p>Two species can share a habitat but they can't share an identical niche for long — one will out-compete the other. That's the <strong>competitive exclusion principle</strong>.</p>
      `
    }
  }
];

const ECOLOGY_ENERGY_FLOW = [
  {
    title: "Where the energy comes from",
    body: {
      middle: `
        <p>Almost every ecosystem on Earth runs on <strong>sunlight</strong>.</p>
        <p><strong>Producers</strong> — plants, algae, some bacteria — capture sunlight and use it to make sugar through photosynthesis. They're called producers because they "produce" their own food.</p>
        <p>From there, energy moves up the food chain — but only a tiny fraction of it makes the trip.</p>
      `,
      high: `
        <p>Almost every ecosystem on Earth runs on <strong>sunlight</strong>. <strong>Producers</strong> (plants, algae, cyanobacteria) capture solar energy via photosynthesis and lock it into sugar molecules.</p>
        <p>From there, energy moves up the food chain — but only a tiny fraction makes the trip.</p>
        <p>A few weird ecosystems (deep-sea hydrothermal vents) run on chemical energy from rocks instead. But sunlight powers almost everything else.</p>
      `
    }
  },
  {
    title: "Levels of who eats whom",
    body: {
      middle: `
        <p>We group organisms by what they eat:</p>
        <ul>
          <li><strong>Producers</strong> — make their own food from sunlight (plants, algae).</li>
          <li><strong>Primary consumers</strong> — eat producers. These are the plant-eaters (rabbits, deer, grasshoppers).</li>
          <li><strong>Secondary consumers</strong> — eat the plant-eaters (snakes, frogs).</li>
          <li><strong>Tertiary consumers</strong> — top predators that eat the secondary consumers (wolves, hawks).</li>
          <li><strong>Decomposers</strong> — bacteria and fungi that break down everything that dies, recycling nutrients back into the soil.</li>
        </ul>
      `,
      high: `
        <p>Organisms get grouped by what they eat:</p>
        <ul>
          <li><strong>Producers</strong> (1st trophic level) — make their own food from sunlight</li>
          <li><strong>Primary consumers</strong> (2nd) — eat producers. Herbivores like rabbits and grasshoppers</li>
          <li><strong>Secondary consumers</strong> (3rd) — eat primary consumers. Many small carnivores like snakes</li>
          <li><strong>Tertiary consumers</strong> (4th) — eat secondary consumers. Apex predators like hawks and wolves</li>
          <li><strong>Decomposers</strong> — bacteria and fungi that break down dead matter at every level, returning nutrients to the soil</li>
        </ul>
      `
    }
  },
  {
    title: "The 10% rule",
    body: {
      middle: `
        <p>Only about <strong>10% of energy</strong> moves from one level to the next. The other 90% gets lost — mostly as heat, or used up by the animal's own body, or stuck in parts that can't be digested.</p>
        <p>That's why food chains rarely go more than 4 or 5 levels deep — there's just not enough energy left at the top!</p>
        <p>It's also why a field of grass can feed way more rabbits than wolves. The energy math doesn't lie.</p>
      `,
      high: `
        <p>Only about <strong>10%</strong> of the energy at one trophic level makes it to the next. The other 90% gets lost as heat, used up by the organism's own metabolism, or stuck in indigestible parts.</p>
        <p>This is why food chains rarely go more than 4–5 levels deep — there just isn't enough energy left at the top.</p>
        <p>It also explains why eating lower on the food chain (plants) supports far more people per acre than eating higher (beef). The energy math is brutal.</p>
      `
    }
  },
  {
    title: "Food chains vs food webs",
    body: {
      middle: `
        <p>A <strong>food chain</strong> shows one path: grass → rabbit → fox → hawk.</p>
        <p>But in real life, most animals eat several things and get eaten by several things. The full picture of who-eats-whom is called a <strong>food web</strong>.</p>
        <p>Webs are more <em>realistic</em> AND more <em>resilient</em>. If rabbits suddenly disappear, a fox that also eats mice can still survive. A specialist with only ONE food source is in big trouble.</p>
      `,
      high: `
        <p>A <strong>food chain</strong> is a single linear path: grass → rabbit → fox → hawk.</p>
        <p>A <strong>food web</strong> is the full network of who-eats-whom in a community, with most organisms eating (and being eaten by) several different species.</p>
        <p>Webs are more realistic — and they're more <em>resilient</em>. If a rabbit population crashes, a fox that also eats mice can survive. A specialist with only one food source is in trouble.</p>
      `
    }
  }
];

const ECOLOGY_POPULATIONS = [
  {
    title: "Exponential growth",
    body: {
      middle: `
        <p>If a population has unlimited food and nothing slowing it down, it grows <strong>faster and faster</strong>. Each generation has more offspring than the last, and the population explodes.</p>
        <p>The growth curve looks like the letter <strong>J</strong> — slow at first, then shooting straight up.</p>
        <p>You can see this with bacteria in a brand-new petri dish, or invasive species moving into a new continent.</p>
      `,
      high: `
        <p>When resources are unlimited and there's nothing slowing them down, populations grow <strong>exponentially</strong> — each generation produces more offspring than the last, compounding.</p>
        <p>The growth curve looks like a <strong>J</strong>: starts slow, then rockets up.</p>
        <p>Bacteria in a fresh petri dish, invasive species in a new continent, humans after the agricultural revolution — all classic J-curves.</p>
      `
    }
  },
  {
    title: "When growth hits a ceiling",
    body: {
      middle: `
        <p>Real populations can't grow forever. Eventually they run out of food, predators show up, or waste piles up.</p>
        <p>When growth slows down and levels off, the curve looks like an <strong>S</strong> instead of a J. The flat top of the S is called the <strong>carrying capacity</strong> — the largest population the environment can support long-term.</p>
      `,
      high: `
        <p>Real populations can't grow forever. Eventually they hit limits — food runs out, predators arrive, waste builds up.</p>
        <p>When growth slows and levels off, you get <strong>logistic growth</strong> — an <strong>S-shaped</strong> curve.</p>
        <p>The flat top is <strong>carrying capacity</strong> (<code>K</code>): the maximum population size the environment can sustain long-term.</p>
      `
    }
  },
  {
    title: "What slows populations down",
    body: {
      middle: `
        <p>Two kinds of things can slow population growth:</p>
        <ul>
          <li><strong>Density-dependent</strong> things get WORSE as more individuals crowd in: not enough food, diseases spreading easily, more predators showing up. The more crowded, the worse it gets.</li>
          <li><strong>Density-independent</strong> things hit no matter how many there are: floods, fires, hurricanes, droughts. A hurricane doesn't care how many crabs were on the beach.</li>
        </ul>
      `,
      high: `
        <p>What pulls populations back toward carrying capacity?</p>
        <ul>
          <li><strong>Density-dependent factors</strong> get stronger as the population grows: competition for food, disease spread, predation. The denser the herd, the faster the flu rips through.</li>
          <li><strong>Density-independent factors</strong> hit no matter how crowded the population is: floods, fires, droughts, volcanic eruptions. The hurricane doesn't care how many crabs were on the beach.</li>
        </ul>
      `
    }
  },
  {
    title: "Two life strategies",
    body: {
      middle: `
        <p>Species use two very different strategies for having offspring:</p>
        <ul>
          <li><strong>Lots of babies, little care</strong> — many tiny offspring, mostly left to fend for themselves. Most will die, but a few survive. Examples: dandelions, frogs, mice. Good when the environment is unstable.</li>
          <li><strong>Few babies, lots of care</strong> — small number of offspring, but parents invest huge amounts of time and energy. Examples: elephants, humans, whales, oak trees. Good when conditions are stable.</li>
        </ul>
        <p>Neither one is "better" — they're each tuned for different environments.</p>
      `,
      high: `
        <p>Two opposite life strategies:</p>
        <ul>
          <li><strong>r-selected</strong> species (rats, dandelions, frogs) — many offspring, little parental care, short lives. Bet on volume.</li>
          <li><strong>K-selected</strong> species (elephants, humans, whales, oak trees) — few offspring, heavy parental investment, long lives. Bet on quality.</li>
        </ul>
        <p>Neither is "better" — they're tuned to different environments. Unstable, boom-bust environments favor r; stable, crowded ones favor K.</p>
      `
    }
  }
];

const ECOLOGY_COMMUNITIES = [
  {
    title: "Keystone species",
    body: {
      middle: `
        <p>A <strong>keystone species</strong> has a way bigger effect on its ecosystem than its size or number would suggest. Remove it, and the whole community can fall apart.</p>
        <p>Classic example: <strong>sea otters</strong> eat sea urchins, and sea urchins eat kelp forests. Take out the otters, the urchins explode, the kelp gets mowed down — and dozens of other species lose their homes.</p>
        <p>Same thing happened with wolves in Yellowstone. When wolves were brought back in 1995, the entire park changed — rivers, plants, deer populations, everything.</p>
      `,
      high: `
        <p>A <strong>keystone species</strong> has an effect on its ecosystem that's wildly out of proportion to its population size. Remove it and the whole community collapses.</p>
        <p><strong>Sea otters</strong> are a classic example: they eat sea urchins, which eat kelp. Wipe out the otters and the urchins explode, mow down the kelp forest, and dozens of other species lose their habitat.</p>
        <p>Wolves in Yellowstone played the same role — their reintroduction in 1995 reshaped vegetation, rivers, and prey populations across the entire park.</p>
      `
    }
  },
  {
    title: "Biodiversity — why variety matters",
    body: {
      middle: `
        <p><strong>Biodiversity</strong> means the variety of life in a place. There are three kinds:</p>
        <ul>
          <li><strong>Genetic diversity</strong> — variety within one species (different versions of dogs).</li>
          <li><strong>Species diversity</strong> — how many different species there are.</li>
          <li><strong>Ecosystem diversity</strong> — how many different kinds of ecosystems exist in a region.</li>
        </ul>
        <p>Places with high biodiversity are <strong>tougher and more stable</strong>. If one species fails, others can fill its job. Low-diversity places are fragile.</p>
      `,
      high: `
        <p><strong>Biodiversity</strong> measures the variety of life in an ecosystem. It comes in three flavors:</p>
        <ul>
          <li><strong>Genetic diversity</strong> — variation within a species</li>
          <li><strong>Species diversity</strong> — number of different species in a community</li>
          <li><strong>Ecosystem diversity</strong> — variety of ecosystems in a region</li>
        </ul>
        <p>High-biodiversity ecosystems are more <em>resilient</em> — if one species fails, others can fill its role. Low diversity = fragile.</p>
      `
    }
  },
  {
    title: "How ecosystems recover",
    body: {
      middle: `
        <p>Ecosystems aren't frozen — they change over time, especially after disasters. The recovery is called <strong>succession</strong>:</p>
        <ul>
          <li><strong>Starting from bare rock</strong> (after a glacier melts or lava cools): tiny lichens come first, then mosses, then grasses, then bushes, then trees. Takes <em>centuries</em>.</li>
          <li><strong>After a fire or flood</strong>: the soil is still there, so plants come back much faster — sometimes in just a few decades.</li>
        </ul>
      `,
      high: `
        <p>Ecosystems aren't static — they change predictably over time, especially after a disturbance.</p>
        <ul>
          <li><strong>Primary succession</strong> — bare rock (after a glacier or lava) gets colonized by lichens, then mosses, then grasses, then shrubs, then trees over centuries</li>
          <li><strong>Secondary succession</strong> — after a fire, hurricane, or abandoned farm field, the soil is still there, so recovery is much faster (decades, not millennia)</li>
        </ul>
        <p>The end state is sometimes called a <strong>climax community</strong> — though modern ecology recognizes that ecosystems rarely sit still for long.</p>
      `
    }
  },
  {
    title: "Responding to the environment",
    body: {
      middle: `
        <p>Organisms react to their surroundings all the time. The reactions happen at different speeds:</p>
        <ul>
          <li><strong>Fast</strong> (seconds to hours) — sweating to cool off, pupils getting bigger in the dark, plants closing tiny pores during a drought.</li>
          <li><strong>Behaviors</strong> — animals seeking shade, schools of fish swimming together for safety, birds migrating south for winter.</li>
          <li><strong>Slow</strong> (over generations) — these become real evolutionary changes.</li>
        </ul>
        <p>Plants have automatic responses called <em>tropisms</em>: they grow toward light (phototropism) and their roots grow down with gravity.</p>
      `,
      high: `
        <p>Organisms constantly react to changes in their surroundings. <strong>Short-term physiological responses</strong> happen in seconds to hours: sweating to cool off, dilating pupils, plants closing stomata in drought.</p>
        <p><strong>Behavioral responses</strong> happen on similar timescales: animals seek shade, school for safety, migrate seasonally.</p>
        <p>Over many generations, <strong>adaptive responses</strong> become evolutionary changes — populations whose responses work better leave more offspring, and those traits spread.</p>
        <p>Some responses are <em>tropisms</em> in plants: phototropism (growing toward light), gravitropism (roots growing down). They're built-in, automatic responses to specific environmental cues.</p>
      `
    }
  },
  {
    title: "Behavior + evolution",
    body: {
      middle: `
        <p>Behavior — what an animal does — is partly built into its genes and partly learned. Natural selection acts on behavior just like it does on physical traits.</p>
        <ul>
          <li><strong>Built-in behaviors</strong> — born with them. Newly hatched sea turtles crawl toward the brightest horizon (usually the ocean).</li>
          <li><strong>Learned behaviors</strong> — figured out from experience. Crows have learned to drop nuts on roads so cars crack them open.</li>
          <li><strong>Helping each other</strong> — many animals help relatives or their own group. Bees die defending their hive; meerkats stand watch for predators.</li>
        </ul>
      `,
      high: `
        <p>Behavior is shaped by both genes and environment, and just like any other trait, it can be acted on by natural selection.</p>
        <ul>
          <li><strong>Innate behaviors</strong> — coded in the genes; appear without learning. Newborn sea-turtle hatchlings crawl toward the brightest horizon (usually the moonlit sea).</li>
          <li><strong>Learned behaviors</strong> — emerge from individual experience. Crows learning to drop nuts on roads for cars to crack.</li>
          <li><strong>Cooperative behaviors</strong> — kin selection (helping relatives spreads shared genes), altruism in social insects, alarm calls.</li>
        </ul>
        <p>Behavior that boosts survival or reproduction gets selected for over generations — even if the individuals don't "know" why they're doing it.</p>
      `
    }
  },
  {
    title: "Energy flows one way; matter cycles",
    body: {
      middle: `
        <p>Here's a big idea: <strong>energy moves in one direction</strong> through an ecosystem (sun → plants → animals → decomposers) and gets lost as heat along the way. So ecosystems need a constant supply of new energy — usually sunlight.</p>
        <p>But <strong>matter is different</strong>. Atoms of carbon, nitrogen, and water cycle around forever. Carbon goes from air to plant to animal to soil and back again. Atoms are reused; energy gets used once and lost.</p>
        <p>Quick way to remember: <em>energy flows, matter cycles</em>.</p>
      `,
      high: `
        <p>Zooming out from the 10% rule: <strong>energy flows in one direction</strong> through an ecosystem — sun → producers → consumers → decomposers — and is steadily lost as heat at every level.</p>
        <p>Because of this loss, ecosystems need a constant input of energy (sunlight, mostly) to keep running. Take the sun away and the whole system winds down within years.</p>
        <p>Contrast this with <strong>matter</strong> (carbon, nitrogen, phosphorus), which <em>cycles</em> — atoms get used and reused indefinitely. Energy flows; matter cycles. Memorize that.</p>
        <p>Total primary productivity sets the ceiling on how much life an ecosystem can support. Tropical rainforests and coral reefs sit near the top; deserts and deep oceans near the bottom.</p>
      `
    }
  },
  {
    title: "Humans changing ecosystems",
    body: {
      middle: `
        <p>Humans have become the biggest force changing ecosystems on Earth:</p>
        <ul>
          <li><strong>Cutting down habitats</strong> — clearing forests, building cities and farms.</li>
          <li><strong>Climate change</strong> — burning fuels heats the planet, shifts where species can live.</li>
          <li><strong>Invasive species</strong> — animals or plants moved to a new place where they have no natural predators take over.</li>
          <li><strong>Pollution</strong> — plastic, chemicals, light, noise.</li>
          <li><strong>Overharvesting</strong> — catching fish or hunting animals faster than they can replace themselves.</li>
        </ul>
        <p>But we also know how to fix things. Wolves came back to Yellowstone. The hole in the ozone layer is healing. Bald eagles are no longer endangered. It IS possible.</p>
      `,
      high: `
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
  }
];
