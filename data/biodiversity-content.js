/* =========================================================
   biodiversity-content.js — flashcards for Biodiversity

   Four card decks:
     BIODIVERSITY_INTRO_CARDS   — what biodiversity is and why
                                   it matters
     BIODIVERSITY_TREE_CARDS    — three domains, kingdoms of
                                   Eukarya, how we classify life
     BIODIVERSITY_HOTSPOTS_CARDS — where diversity clusters and
                                   why the tropics win
     BIODIVERSITY_THREATS_CARDS — habitat loss, climate change,
                                   invasives, and what conservation
                                   actually does

   Each card has body: { middle, high }.
   ========================================================= */

const BIODIVERSITY_INTRO_CARDS = [
  {
    title: "What is biodiversity?",
    body: {
      middle: `
        <p><strong>Biodiversity</strong> is short for "biological diversity" — the huge variety of living things on Earth.</p>
        <p>It includes three levels:</p>
        <ul>
          <li><strong>Genes</strong> — differences <em>within</em> a species (like different dog breeds).</li>
          <li><strong>Species</strong> — the number of <em>different kinds</em> of living things (dogs, cats, oak trees, mushrooms).</li>
          <li><strong>Ecosystems</strong> — the variety of <em>habitats</em> (rainforest, coral reef, desert).</li>
        </ul>
        <p>Scientists have described about 2 million species — but they estimate the true number is closer to 8 million.</p>
      `,
      high: `
        <p><strong>Biodiversity</strong> is the total variety of life, measured at three nested levels:</p>
        <ul>
          <li><strong>Genetic diversity</strong> — allelic variation within a population.</li>
          <li><strong>Species diversity</strong> — the number and evenness of species in a community.</li>
          <li><strong>Ecosystem diversity</strong> — the variety of habitats, communities, and ecological processes across a region.</li>
        </ul>
        <p>~2 million species have been formally described; extrapolations from sampling put the true total at roughly 8–10 million eukaryotic species, plus a vast microbial world we've only begun to catalog.</p>
      `
    }
  },
  {
    title: "Why does it matter?",
    body: {
      middle: `
        <p>Biodiversity isn't just pretty — it keeps ecosystems (and us) alive:</p>
        <ul>
          <li><strong>Food</strong> — pollinators like bees make most of our fruits possible.</li>
          <li><strong>Medicine</strong> — about 25% of modern drugs come from plants or microbes.</li>
          <li><strong>Clean air &amp; water</strong> — forests and wetlands filter pollution for free.</li>
          <li><strong>Climate</strong> — trees and phytoplankton pull CO₂ out of the atmosphere.</li>
        </ul>
        <p>When a species goes extinct, we lose all of that — and we can't get it back.</p>
      `,
      high: `
        <p>Biodiversity underwrites the <strong>ecosystem services</strong> that human societies depend on:</p>
        <ul>
          <li><strong>Provisioning</strong> — food, timber, fiber, fresh water, genetic resources.</li>
          <li><strong>Regulating</strong> — pollination, pest control, carbon sequestration, water purification.</li>
          <li><strong>Supporting</strong> — nutrient cycling, soil formation, primary production.</li>
          <li><strong>Cultural</strong> — recreation, aesthetic and spiritual value, scientific discovery.</li>
        </ul>
        <p>Diverse communities are also more <em>resilient</em> — they recover faster from disturbances like drought or disease because different species fill overlapping roles.</p>
      `
    }
  },
  {
    title: "How do we measure it?",
    body: {
      middle: `
        <p>Two simple measures:</p>
        <ul>
          <li><strong>Species richness</strong> — <em>how many</em> different species are in a place.</li>
          <li><strong>Species evenness</strong> — how <em>balanced</em> the numbers are. A forest with 100 oaks and 100 maples is more even than one with 199 oaks and 1 maple.</li>
        </ul>
        <p>A community with high richness <em>and</em> high evenness has the most diversity.</p>
      `,
      high: `
        <p>Ecologists combine two components:</p>
        <ul>
          <li><strong>Species richness (S)</strong> — the count of species present.</li>
          <li><strong>Species evenness (E)</strong> — how uniformly individuals are distributed among those species.</li>
        </ul>
        <p>The <strong>Shannon diversity index</strong> H' = −Σ pᵢ ln(pᵢ) captures both, where pᵢ is the proportion of individuals belonging to species i. Higher H' means greater diversity — a community of 10 species with even abundances scores higher than 10 species where one dominates 95% of individuals.</p>
      `
    }
  }
];

const BIODIVERSITY_TREE_CARDS = [
  {
    title: "The three domains of life",
    body: {
      middle: `
        <p>All living things fit into three huge groups called <strong>domains</strong>:</p>
        <ul>
          <li><strong>Bacteria</strong> — tiny single cells, no nucleus. Everywhere: soil, oceans, your gut.</li>
          <li><strong>Archaea</strong> — also single cells with no nucleus, but different chemistry. Many live in extreme places (hot springs, salt lakes).</li>
          <li><strong>Eukarya</strong> — cells with a nucleus. Includes protists, fungi, plants, and animals — everything you can see with your eyes.</li>
        </ul>
        <p>Bacteria and Archaea look similar under a microscope but are genetically very different — as different from each other as either is from us.</p>
      `,
      high: `
        <p>Life is classified into three <strong>domains</strong> based on ribosomal RNA sequence divergence, proposed by Carl Woese in 1977:</p>
        <ul>
          <li><strong>Bacteria</strong> — prokaryotes with peptidoglycan cell walls; the most abundant organisms on Earth.</li>
          <li><strong>Archaea</strong> — prokaryotes with distinct membrane lipids (ether-linked, often branched) and unique tRNA/rRNA; thrive in extreme environments (thermophiles, halophiles, methanogens).</li>
          <li><strong>Eukarya</strong> — cells with a membrane-bound nucleus, mitochondria, and (in some) chloroplasts, both of endosymbiotic bacterial origin.</li>
        </ul>
        <p>Molecular phylogeny shows Archaea are more closely related to Eukarya than to Bacteria — a surprise that overturned the earlier five-kingdom system.</p>
      `
    }
  },
  {
    title: "Kingdoms of Eukarya",
    body: {
      middle: `
        <p>Within the domain Eukarya, biologists recognize four familiar kingdoms:</p>
        <ul>
          <li><strong>Protists</strong> — mostly single-celled (amoebas, algae, paramecium). A grab-bag group.</li>
          <li><strong>Fungi</strong> — decomposers that absorb food. Mushrooms, molds, yeast.</li>
          <li><strong>Plants</strong> — make their own food from sunlight. Mosses, ferns, trees.</li>
          <li><strong>Animals</strong> — multicellular, eat other organisms, usually move. Sponges to squids to humans.</li>
        </ul>
      `,
      high: `
        <p>Eukarya splits into several kingdoms (or supergroups, in newer classifications):</p>
        <ul>
          <li><strong>Protista</strong> — a paraphyletic grouping of mostly unicellular eukaryotes (Amoebozoa, ciliates, diatoms, brown algae). Modern phylogenies split them into multiple supergroups.</li>
          <li><strong>Fungi</strong> — heterotrophs that digest externally and absorb nutrients; chitinous cell walls; includes yeasts, molds, mushrooms.</li>
          <li><strong>Plantae</strong> — multicellular autotrophs with cellulose walls and chloroplasts derived from primary endosymbiosis of cyanobacteria.</li>
          <li><strong>Animalia</strong> — multicellular heterotrophs without cell walls; typically motile at some life stage; ~1.5 million described species.</li>
        </ul>
      `
    }
  },
  {
    title: "How do we name species?",
    body: {
      middle: `
        <p>Every species gets a two-word Latin name (called <strong>binomial nomenclature</strong>), invented by Carl Linnaeus in the 1700s:</p>
        <ul>
          <li><em>Homo sapiens</em> — humans</li>
          <li><em>Panthera tigris</em> — tiger</li>
          <li><em>Quercus alba</em> — white oak</li>
        </ul>
        <p>The first word is the <strong>genus</strong> (a group of closely-related species). The second is the <strong>species</strong> name. Both are always <em>italicized</em>.</p>
      `,
      high: `
        <p><strong>Binomial nomenclature</strong> (Linnaeus, 1753) assigns each species a two-part Latin name: <em>Genus species</em>, always italicized, with the genus capitalized.</p>
        <p>The full <strong>taxonomic hierarchy</strong> nests species inside broader groups:</p>
        <p><em>Domain → Kingdom → Phylum → Class → Order → Family → Genus → Species</em></p>
        <p>Example — humans: Eukarya → Animalia → Chordata → Mammalia → Primates → Hominidae → <em>Homo</em> → <em>sapiens</em>.</p>
        <p>Modern <strong>phylogenetic systematics</strong> (cladistics) groups organisms by shared derived traits, aiming for monophyletic groups — a common ancestor plus <em>all</em> its descendants.</p>
      `
    }
  }
];

const BIODIVERSITY_HOTSPOTS_CARDS = [
  {
    title: "Where does biodiversity live?",
    body: {
      middle: `
        <p>Biodiversity isn't spread evenly. Some places are packed with species — others have very few.</p>
        <p>The <strong>tropics</strong> (near the equator) are the champions:</p>
        <ul>
          <li>The Amazon rainforest has more tree species in one hectare than all of Europe.</li>
          <li>Coral reefs cover less than 1% of the ocean but host 25% of all marine species.</li>
        </ul>
        <p>Head toward the poles and diversity drops steadily. Arctic and Antarctic ecosystems have relatively few species — though the ones that live there are impressively tough.</p>
      `,
      high: `
        <p>Species diversity follows a strong <strong>latitudinal gradient</strong> — richness peaks in the tropics and declines toward the poles.</p>
        <p>Hotspot regions of exceptional richness include the Amazon and Congo basins, Southeast Asian rainforests, coral reefs of the Coral Triangle, and Mediterranean-climate zones (California, South Africa's Cape, southwestern Australia).</p>
        <p>Coral reefs are the marine equivalent: &lt;1% of ocean area, ~25% of marine species. Deep-sea hydrothermal vents host entire chemosynthetic communities discovered only in 1977.</p>
      `
    }
  },
  {
    title: "Why the tropics?",
    body: {
      middle: `
        <p>Several reasons combine to make the tropics so diverse:</p>
        <ul>
          <li><strong>More sunlight, year-round</strong> — more energy for plants to grow.</li>
          <li><strong>Stable climate</strong> — no harsh winters, so species don't need to migrate or hibernate.</li>
          <li><strong>Long evolutionary history</strong> — tropical regions haven't been wiped clean by ice ages, so species have had millions of years to diversify.</li>
        </ul>
        <p>More stability + more energy + more time = more species.</p>
      `,
      high: `
        <p>The latitudinal diversity gradient has several complementary explanations:</p>
        <ul>
          <li><strong>Energy hypothesis</strong> — higher solar input supports higher primary productivity, which sustains larger and more specialized populations.</li>
          <li><strong>Climatic stability</strong> — narrow seasonal variation permits specialists with narrow niches to persist, increasing niche packing.</li>
          <li><strong>Evolutionary time</strong> — tropical biomes have been continuously habitable for longer; temperate regions were repeatedly glaciated during the Pleistocene, resetting local diversity.</li>
          <li><strong>Faster evolution</strong> — warmer temperatures accelerate metabolic and mutation rates, potentially raising speciation rates.</li>
        </ul>
      `
    }
  },
  {
    title: "Endemism",
    body: {
      middle: `
        <p>A species is <strong>endemic</strong> to a place if it lives there and <em>nowhere else</em>.</p>
        <p>Islands and isolated regions produce lots of endemics because their populations evolve in isolation:</p>
        <ul>
          <li>Lemurs live only in Madagascar.</li>
          <li>Kiwi birds live only in New Zealand.</li>
          <li>Galápagos tortoises live only on the Galápagos Islands.</li>
        </ul>
        <p>Endemic species are especially vulnerable — if their one habitat is destroyed, they're gone from the whole planet.</p>
      `,
      high: `
        <p><strong>Endemism</strong> — a species restricted to a particular geographic area, often through geographic isolation and independent evolutionary history.</p>
        <p>Islands, mountain tops ("sky islands"), and long-isolated continents like Australia and Madagascar are hotbeds of endemism. Madagascar alone hosts ~90% endemic mammal species.</p>
        <p>Conservation biologists identify <strong>biodiversity hotspots</strong> (Myers et al. 2000) — regions with ≥1500 endemic vascular plants that have lost ≥70% of their original habitat. There are ~36 such hotspots covering ~2.4% of Earth's land but containing ~50% of endemic plant species.</p>
      `
    }
  }
];

const BIODIVERSITY_THREATS_CARDS = [
  {
    title: "The sixth extinction",
    body: {
      middle: `
        <p>Earth has had <strong>five mass extinctions</strong> in its history — huge die-offs caused by things like asteroid impacts (which killed the dinosaurs 66 million years ago).</p>
        <p>Many scientists think we're in the middle of a sixth — this time caused by <em>humans</em>. Species are going extinct 100 to 1,000 times faster than the natural background rate.</p>
        <p>The main causes spell out <strong>HIPPO</strong>:</p>
        <ul>
          <li><strong>H</strong>abitat loss</li>
          <li><strong>I</strong>nvasive species</li>
          <li><strong>P</strong>ollution</li>
          <li><strong>P</strong>opulation (human)</li>
          <li><strong>O</strong>verharvesting</li>
        </ul>
      `,
      high: `
        <p>Earth has experienced five previous <strong>mass extinctions</strong>; the K-Pg event (66 Ma) ended the non-avian dinosaurs. Current extinction rates are estimated at 100–1000× the background rate inferred from the fossil record — evidence that we are living through a sixth mass extinction, this one anthropogenic.</p>
        <p>E. O. Wilson's <strong>HIPPO</strong> summarizes the drivers, in rough order of impact: <strong>H</strong>abitat destruction &gt; <strong>I</strong>nvasive species &gt; <strong>P</strong>ollution &gt; human <strong>P</strong>opulation growth &gt; <strong>O</strong>verharvesting.</p>
        <p>Climate change is now amplifying every one of these, shifting species ranges faster than many can track.</p>
      `
    }
  },
  {
    title: "Habitat loss",
    body: {
      middle: `
        <p>The #1 cause of extinction is <strong>habitat destruction</strong> — when the place a species lives is bulldozed, farmed over, or paved.</p>
        <p>Examples:</p>
        <ul>
          <li>Rainforests cleared for cattle and palm oil.</li>
          <li>Wetlands drained for housing.</li>
          <li>Coral reefs bleached by warming oceans.</li>
        </ul>
        <p>When habitat is broken into small pieces (called <strong>fragmentation</strong>), populations get isolated. Small isolated populations are more likely to go extinct from inbreeding or a single bad year.</p>
      `,
      high: `
        <p><strong>Habitat destruction and fragmentation</strong> is the single largest driver of extinction. Roughly 80% of listed threatened species are affected. Tropical deforestation, wetland drainage, coral bleaching, and grassland conversion are the leading edges.</p>
        <p><strong>Fragmentation</strong> breaks continuous habitat into small, isolated patches. Small patches have proportionally more edge, altering microclimate and predation. Isolated populations lose genetic diversity through drift and inbreeding depression, and stochastic events (a fire, a bad breeding year) can drive them to local extinction — an <strong>extinction vortex</strong>.</p>
      `
    }
  },
  {
    title: "Invasive species",
    body: {
      middle: `
        <p>An <strong>invasive species</strong> is one that gets moved (usually by humans) to a place it doesn't naturally live, and then thrives there — often outcompeting native species.</p>
        <p>Examples:</p>
        <ul>
          <li><strong>Brown tree snakes</strong> in Guam wiped out most of the island's native forest birds after arriving as stowaways.</li>
          <li><strong>Cane toads</strong> in Australia poison native predators that try to eat them.</li>
          <li><strong>Kudzu vine</strong> smothers native plants across the American South.</li>
        </ul>
        <p>Invasives often win because they leave their natural predators and diseases behind.</p>
      `,
      high: `
        <p><strong>Invasive species</strong> are non-native organisms whose introduction causes ecological or economic harm. They typically succeed because they arrive without the co-evolved predators, parasites, and competitors that regulated them in their native range (the <em>enemy release hypothesis</em>).</p>
        <p>Impacts include direct predation (brown tree snake, <em>Boiga irregularis</em>, extirpated most Guam forest birds), competition (kudzu, <em>Pueraria montana</em>), habitat alteration (zebra mussels filtering plankton from lakes), and disease transmission (chytrid fungus decimating amphibians globally).</p>
        <p>Islands are especially vulnerable — native island species evolved without mainland-scale competition or predation.</p>
      `
    }
  },
  {
    title: "What can conservation do?",
    body: {
      middle: `
        <p>Conservation biologists use several strategies to protect biodiversity:</p>
        <ul>
          <li><strong>Protected areas</strong> — national parks and nature reserves that ban development.</li>
          <li><strong>Wildlife corridors</strong> — strips of habitat that let animals move safely between reserves.</li>
          <li><strong>Captive breeding</strong> — raising endangered animals in zoos to release later (e.g. California condors).</li>
          <li><strong>Laws</strong> — the Endangered Species Act protects listed species from being harmed or having their habitat destroyed.</li>
        </ul>
        <p>Success stories include bald eagles, humpback whales, and giant pandas — all pulled back from the brink.</p>
      `,
      high: `
        <p><strong>Conservation biology</strong> combines ecology, genetics, and policy. Core tools:</p>
        <ul>
          <li><strong>In-situ protection</strong> — national parks, marine protected areas, biosphere reserves. Larger, connected reserves outperform smaller isolated ones (island biogeography theory).</li>
          <li><strong>Habitat corridors</strong> — reduce isolation, maintain gene flow, allow range shifts under climate change.</li>
          <li><strong>Ex-situ conservation</strong> — captive breeding, seed banks, cryopreservation. Reintroductions (California condor, black-footed ferret, Arabian oryx) can rescue species from functional extinction.</li>
          <li><strong>Legal protection</strong> — the U.S. Endangered Species Act (1973), CITES (international wildlife trade), IUCN Red List.</li>
          <li><strong>Ecosystem-based management</strong> — protects communities and processes rather than single species.</li>
        </ul>
        <p>Genetic rescue — introducing individuals from other populations — has recovered inbred populations of Florida panthers and mountain gorillas.</p>
      `
    }
  }
];
