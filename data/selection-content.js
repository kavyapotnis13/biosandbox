/* =========================================================
   selection-content.js — flashcards for Natural Selection

   Four card decks:
     SELECTION_INTRO_CARDS   — what evolution is, Darwin's 4
                                ingredients, fitness, evidence
     SELECTION_MECHANISMS    — the 4 mechanisms of evolution
                                (selection, drift, gene flow, mutation)
     SELECTION_HARDY_WEINBERG — the null model & its 5 conditions
     SELECTION_SPECIATION    — species concept, isolation, allopatric
                                vs sympatric, extinction

   Each card has body: { middle, high }.
   ========================================================= */

const SELECTION_INTRO_CARDS = [
  {
    title: "What is evolution?",
    body: {
      middle: `
        <p><strong>Evolution</strong> is when a group of living things <em>slowly changes</em> over many generations.</p>
        <p>Important — individuals don't evolve. <em>Populations</em> evolve. Over millions of years, small changes add up to the huge variety of life we see today: every kind of beetle, every tree, every fish, every dog breed.</p>
        <p>Charles Darwin figured out the main reason this happens, in his famous 1859 book. He called it <strong>natural selection</strong>.</p>
      `,
      high: `
        <p><strong>Evolution</strong> is a change in the <em>genetic makeup of a population</em> over generations. Individuals don't evolve — populations do.</p>
        <p>Across millions of generations, small changes accumulate into the breathtaking diversity of life: every beetle, every redwood, every blue whale.</p>
        <p>Charles Darwin's 1859 book <em>On the Origin of Species</em> laid out the mechanism behind it: <strong>natural selection</strong>.</p>
      `
    }
  },
  {
    title: "Darwin's four ingredients",
    body: {
      middle: `
        <p>Natural selection happens whenever all four of these things are true:</p>
        <ol>
          <li><strong>Variation</strong> — not everyone is exactly the same.</li>
          <li><strong>Inheritance</strong> — kids look like their parents.</li>
          <li><strong>Some traits help</strong> — certain traits make survival or having babies easier in that environment.</li>
          <li><strong>Time</strong> — many generations for the helpful traits to spread.</li>
        </ol>
        <p>Remove any one of these and natural selection can't happen.</p>
      `,
      high: `
        <p>Natural selection works whenever <strong>all four</strong> of these are true in a population:</p>
        <ol>
          <li><strong>Variation</strong> — individuals differ in their traits</li>
          <li><strong>Inheritance</strong> — those traits are passed to offspring</li>
          <li><strong>Differential survival</strong> — some traits help more than others in the current environment</li>
          <li><strong>Time</strong> — many generations for the helpful traits to spread</li>
        </ol>
        <p>Strip any one ingredient out and natural selection stops working.</p>
      `
    }
  },
  {
    title: "Fitness — biology's funny word",
    body: {
      middle: `
        <p>In biology, "fitness" doesn't mean strong or fast. It means <strong>how many babies you have that survive to make their own babies</strong>.</p>
        <p>A tiny bacterium that makes a million descendants has higher "fitness" than a powerful tiger that has none. A peacock's enormous tail makes him slower, but if it helps him attract a mate — that boosts his fitness.</p>
        <p>Fitness depends on the environment. The same traits that make you "fit" in one place might be useless somewhere else.</p>
      `,
      high: `
        <p>In biology, <strong>fitness ≠ strength or speed</strong>. Fitness means <em>how many surviving, reproducing offspring you have</em>.</p>
        <p>A frail bacterium that produces a million descendants has higher fitness than a tiger that has none. A peacock's flamboyant tail makes him slower but more attractive — and a mating success is the only kind that counts.</p>
        <p>Fitness is <em>relative</em> (compared to other individuals in the same population) and <em>local</em> (only matters in the current environment).</p>
      `
    }
  },
  {
    title: "Adaptations — examples you've heard of",
    body: {
      middle: `
        <p>An <strong>adaptation</strong> is a trait that helps an organism survive or have more offspring in its environment. Some famous examples:</p>
        <ul>
          <li><strong>Darwin's finches</strong> — small birds on different islands evolved different beak shapes, each one good for the food on that island.</li>
          <li><strong>Peppered moths</strong> — in 1800s England, dark-colored moths suddenly took over because pollution made tree bark dark, helping them hide from birds. When pollution cleaned up, the lighter moths came back.</li>
          <li><strong>Antibiotic resistance</strong> — bacteria evolve to survive medicines in hospitals today, in real time.</li>
        </ul>
      `,
      high: `
        <p>An <strong>adaptation</strong> is a heritable trait that improves survival or reproduction in the current environment.</p>
        <ul>
          <li><strong>Darwin's finches</strong> — beak shapes specialized for different food sources on each Galápagos island.</li>
          <li><strong>Peppered moths</strong> — dark moths boomed when soot from English factories blackened tree bark in the 1800s, then crashed again once pollution laws cleaned the bark.</li>
          <li><strong>Antibiotic resistance</strong> — bacteria evolving past our drugs in real time, inside hospitals.</li>
        </ul>
      `
    }
  },
  {
    title: "Evidence for evolution",
    body: {
      middle: `
        <p>Evolution is one of the most well-supported ideas in all of science. Four kinds of evidence all agree:</p>
        <ul>
          <li><strong>Fossils</strong> — we find ancient creatures that look "in between" today's species (like fish with leg-like fins).</li>
          <li><strong>Similar body parts</strong> — your arm, a whale's flipper, a bat's wing, and a horse's leg all have the same bones inside, in the same arrangement. Same blueprint, different uses.</li>
          <li><strong>Where species live</strong> — closely related species cluster on the same continents and islands.</li>
          <li><strong>DNA evidence</strong> — when you compare DNA between species, the differences match exactly how they were related on the family tree.</li>
        </ul>
      `,
      high: `
        <p>Evolution is the single most well-supported theory in biology. Four independent lines of evidence all point the same direction:</p>
        <ul>
          <li><strong>Fossils</strong> — transitional forms like <em>Tiktaalik</em> (fish → tetrapod) and <em>Archaeopteryx</em> (dinosaur → bird)</li>
          <li><strong>Homologous structures</strong> — the same arm bones in humans, whales, bats, and frogs</li>
          <li><strong>Biogeography</strong> — closely related species clustered on the same continent or island chain</li>
          <li><strong>Molecular evidence</strong> — DNA sequence similarity tracks exactly with predicted family trees</li>
        </ul>
      `
    }
  }
];

const SELECTION_MECHANISMS = [
  {
    title: "Natural selection — three flavors",
    body: {
      middle: `
        <p>Selection can push a trait in different directions:</p>
        <ul>
          <li><strong>Directional</strong> — favors one extreme. (Moths shifting from light to dark colors.)</li>
          <li><strong>Stabilizing</strong> — favors the average; the extremes get pruned out. (Human babies born very small or very large face more trouble.)</li>
          <li><strong>Disruptive</strong> — favors both extremes; pushes against the middle. This kind can actually split a population into two over time.</li>
        </ul>
      `,
      high: `
        <p>Selection doesn't always push a trait the same direction:</p>
        <ul>
          <li><strong>Directional</strong> — extreme on one end is favored (peppered moths shifting darker)</li>
          <li><strong>Stabilizing</strong> — the average wins, extremes get pruned (human birth weight)</li>
          <li><strong>Disruptive</strong> — both extremes are favored, the middle is selected against (large vs small beaks, but not medium)</li>
        </ul>
        <p>Disruptive selection is especially interesting — it can split one population into two.</p>
      `
    }
  },
  {
    title: "Sexual selection",
    body: {
      middle: `
        <p>Some traits aren't about surviving — they're about <strong>finding a mate</strong>. This is <em>sexual selection</em>.</p>
        <p>Think peacock tails, deer antlers, songbirds singing, brightly colored fish. These can get so over-the-top that they actually hurt survival (a giant tail is heavy and easy for predators to spot) — but if it boosts mating success, evolution rewards it.</p>
      `,
      high: `
        <p>Some traits aren't useful for survival — they're useful for <em>mating</em>. <strong>Sexual selection</strong> is selection on traits that affect who gets to reproduce.</p>
        <p>Classic examples: peacock tails, elk antlers, bird songs, bright-colored fish. These traits can become so exaggerated they actually hurt survival — but if they boost mating, natural selection still rewards them.</p>
      `
    }
  },
  {
    title: "Genetic drift — random luck",
    body: {
      middle: `
        <p>Sometimes traits spread or disappear for <strong>no good reason at all</strong> — just random luck. That's called <em>genetic drift</em>.</p>
        <p>This matters most in small populations. Two famous examples:</p>
        <ul>
          <li><strong>Bottleneck</strong> — a disaster (disease, hunting, fire) kills off most of the population. The few survivors don't perfectly represent the original gene pool. This happened to cheetahs — they all have very similar DNA today.</li>
          <li><strong>Founder effect</strong> — a small group breaks off and starts a new population in a new place. Whatever traits the founders happened to have are now the only options.</li>
        </ul>
      `,
      high: `
        <p><strong>Genetic drift</strong> is random change in allele frequencies, especially in small populations. No selection pressure required — just chance.</p>
        <p>Two famous cases:</p>
        <ul>
          <li><strong>Bottleneck effect</strong> — a disaster (disease, hunting, habitat loss) wipes out most of a population. The few survivors might not represent the original gene pool. Cheetahs went through this — they have very low genetic diversity.</li>
          <li><strong>Founder effect</strong> — a small group splits off and starts a new population. Whatever alleles the founders happened to carry now dominate.</li>
        </ul>
      `
    }
  },
  {
    title: "Gene flow — mixing populations",
    body: {
      middle: `
        <p><strong>Gene flow</strong> is when individuals move between groups and bring their genes with them — by migrating, mating, blown pollen, seeds carried by birds.</p>
        <p>Gene flow makes populations <em>more similar</em> to each other. The more two groups mix, the more alike they stay.</p>
        <p>If gene flow stops (say, a mountain range cuts a population in half), the two halves can drift apart and eventually become totally different species.</p>
      `,
      high: `
        <p><strong>Gene flow</strong> is the movement of alleles between populations — through migration, pollen drifting on the wind, seeds carried by birds, humans moving across continents.</p>
        <p>Gene flow tends to <em>reduce</em> differences between populations. The more gene flow there is between two groups, the more similar they stay genetically.</p>
        <p>If gene flow stops completely (say, a mountain range cuts a population in two), the two halves can start drifting apart and eventually become different species.</p>
      `
    }
  },
  {
    title: "Mutation — the source of new traits",
    body: {
      middle: `
        <p>Where does <em>brand new</em> variety come from in the first place? <strong>Mutations</strong> — random typos when DNA gets copied.</p>
        <p>Most mutations don't matter. Some are harmful. A rare few happen to be useful — and those are the only thing evolution has to work with.</p>
        <p>Without mutation, evolution would eventually run out of fuel. Selection just shuffles existing variety; mutation keeps creating new variety.</p>
      `,
      high: `
        <p>Where does new genetic variation come from in the first place? <strong>Mutations</strong> — random copying errors in DNA.</p>
        <p>Most mutations are neutral. Some are harmful. A rare few are beneficial in the current environment — and those are the raw material natural selection has to work with.</p>
        <p>Without mutation, evolution would eventually grind to a halt. Selection can only shuffle the variation that already exists; mutation is what keeps refilling the pool.</p>
      `
    }
  }
];

const SELECTION_HARDY_WEINBERG = [
  {
    title: "What Hardy-Weinberg is",
    body: {
      middle: `
        <p>The <strong>Hardy-Weinberg equilibrium</strong> describes what a population would look like if it WASN'T evolving. It's a "what if no evolution were happening" baseline.</p>
        <p>You compare real populations against this baseline. If a real population matches it — no evolution. If it doesn't match — something is causing evolution to happen, and you can dig in to figure out what.</p>
      `,
      high: `
        <p>The <strong>Hardy-Weinberg equilibrium</strong> describes a hypothetical population that <em>isn't evolving</em>. It's a <strong>null hypothesis</strong> — a baseline you compare a real population against.</p>
        <p>If a real population's allele frequencies match the Hardy-Weinberg prediction, it's not evolving. If they don't match, something — selection, drift, gene flow, mutation — is at work.</p>
      `
    }
  },
  {
    title: "The two equations",
    body: {
      middle: `
        <p>If a gene has two versions (call them <strong>A</strong> and <strong>a</strong>):</p>
        <p style="text-align:center; padding:0.4rem 0;"><strong>p + q = 1</strong></p>
        <p>where <em>p</em> = how common <strong>A</strong> is, and <em>q</em> = how common <strong>a</strong> is.</p>
        <p>Then for the next generation, the genotype frequencies will be:</p>
        <p style="text-align:center; padding:0.4rem 0;"><strong>p² + 2pq + q² = 1</strong></p>
        <ul>
          <li><strong>p²</strong> = how many will be AA</li>
          <li><strong>2pq</strong> = how many will be Aa</li>
          <li><strong>q²</strong> = how many will be aa</li>
        </ul>
      `,
      high: `
        <p>For one gene with two alleles (call them <code>A</code> and <code>a</code>):</p>
        <p style="font-family:'JetBrains Mono', monospace; text-align:center; font-size:1.05rem; padding:0.4rem 0;">
          p + q = 1
        </p>
        <p>where <code>p</code> = frequency of <code>A</code>, <code>q</code> = frequency of <code>a</code>.</p>
        <p>The genotype frequencies in the next generation will be:</p>
        <p style="font-family:'JetBrains Mono', monospace; text-align:center; font-size:1.05rem; padding:0.4rem 0;">
          p² + 2pq + q² = 1
        </p>
        <ul>
          <li><code>p²</code> = frequency of <code>AA</code> homozygotes</li>
          <li><code>2pq</code> = frequency of <code>Aa</code> heterozygotes</li>
          <li><code>q²</code> = frequency of <code>aa</code> homozygotes</li>
        </ul>
      `
    }
  },
  {
    title: "The five conditions",
    body: {
      middle: `
        <p>For a population to stay at this "no evolution" baseline, ALL FIVE of these have to be true:</p>
        <ol>
          <li><strong>No natural selection</strong> — every type survives equally well.</li>
          <li><strong>No mutations</strong> — no new traits appearing.</li>
          <li><strong>No one moving in or out</strong> — no gene flow.</li>
          <li><strong>Random mating</strong> — everyone picks mates without preferences.</li>
          <li><strong>Huge population</strong> — so random luck doesn't matter.</li>
        </ol>
        <p>No real population perfectly meets all five — and that's the point. The mismatch tells you something is happening.</p>
      `,
      high: `
        <p>For a population to stay in Hardy-Weinberg equilibrium, ALL five must hold:</p>
        <ol>
          <li><strong>No natural selection</strong> — all genotypes have equal fitness</li>
          <li><strong>No mutation</strong> — no new alleles appearing</li>
          <li><strong>No gene flow</strong> — no migration in or out</li>
          <li><strong>Random mating</strong> — no mate choice based on genotype</li>
          <li><strong>Very large population</strong> — so genetic drift is negligible</li>
        </ol>
        <p>No real population perfectly meets all five — which is exactly the point. The deviation tells you something.</p>
      `
    }
  },
  {
    title: "Using the equation",
    body: {
      middle: `
        <p>Here's an example. Say a recessive disease shows up in 16% of a population.</p>
        <ul>
          <li>That means <strong>q² = 0.16</strong>, so <strong>q = 0.4</strong>.</li>
          <li>Then <strong>p = 1 − 0.4 = 0.6</strong>.</li>
          <li>Carriers (Aa) = 2pq = 2(0.6)(0.4) = <strong>0.48</strong>.</li>
        </ul>
        <p>So <strong>48% of the population are "silent carriers"</strong> who don't show the disease but could pass it to their kids! Even though only 16% actually have it.</p>
      `,
      high: `
        <p>Say 16% of a population has a recessive disorder (<code>aa</code>). That means <code>q² = 0.16</code>, so <code>q = 0.4</code>.</p>
        <p>Then <code>p = 1 − 0.4 = 0.6</code>.</p>
        <p>Heterozygous carriers (<code>Aa</code>) = <code>2pq = 2(0.6)(0.4) = 0.48</code> — meaning <strong>48% of the population are silent carriers</strong>, even though only 16% show the trait.</p>
        <p>That's the power of Hardy-Weinberg: a single observable phenotype frequency lets you estimate the hidden allele pool.</p>
      `
    }
  }
];

const SELECTION_SPECIATION = [
  {
    title: "What is a species?",
    body: {
      middle: `
        <p>The most common definition: a <strong>species</strong> is a group of living things that can <em>mate together and have babies that can also have babies</em>.</p>
        <p>A horse and a donkey can mate and produce a mule — but mules can't have offspring of their own. So horses and donkeys are different species.</p>
        <p>This definition works for most animals, but it gets fuzzy for bacteria, fossils, and things that don't reproduce sexually.</p>
      `,
      high: `
        <p>The most common definition is the <strong>biological species concept</strong>: a species is a group of organisms that <em>can interbreed in nature</em> and produce <em>fertile offspring</em>.</p>
        <p>A horse + donkey = a mule, but mules are sterile — so horses and donkeys are different species, even though they look similar.</p>
        <p>This concept breaks down for bacteria (they don't really "mate"), fossils, and asexual organisms — but for most animals it works well.</p>
      `
    }
  },
  {
    title: "Reproductive isolation",
    body: {
      middle: `
        <p>For two groups of animals to become two separate species, something has to <strong>stop them from mating with each other</strong>. The barriers can be:</p>
        <ul>
          <li><strong>Before mating</strong> — they mate in different seasons, live in different habitats, have totally different mating dances, or have body parts that just don't fit together.</li>
          <li><strong>After mating</strong> — the babies die early, are sterile (like mules), or are unhealthy.</li>
        </ul>
        <p>Once these barriers are in place, the two groups go their separate evolutionary ways.</p>
      `,
      high: `
        <p>For two populations to become separate species, something has to stop them from interbreeding. The barriers come in two flavors:</p>
        <ul>
          <li><strong>Prezygotic</strong> (before fertilization) — different mating seasons, different habitats, incompatible mating behavior, gametes that can't fuse</li>
          <li><strong>Postzygotic</strong> (after fertilization) — hybrid offspring die early, are sterile, or themselves produce weak offspring</li>
        </ul>
        <p>Once these barriers are in place, the two populations are reproductively isolated and evolve independently.</p>
      `
    }
  },
  {
    title: "Two ways new species form",
    body: {
      middle: `
        <p>New species form in two main ways:</p>
        <ul>
          <li><strong>"Different places"</strong> (allopatric) — a barrier like a mountain or river splits a population. Each side evolves on its own and they slowly become different. This is the most common way.</li>
          <li><strong>"Same place"</strong> (sympatric) — a new species forms even though everyone lives together. This is rarer and often happens in plants when their DNA accidentally doubles.</li>
        </ul>
      `,
      high: `
        <p>Two main ways new species form:</p>
        <ul>
          <li><strong>Allopatric speciation</strong> ("different place") — a geographic barrier splits a population in two. Each half evolves separately until they can't interbreed anymore. Most common form.</li>
          <li><strong>Sympatric speciation</strong> ("same place") — a new species forms without geographic separation. Often through polyploidy in plants (genome duplication produces instantly-isolated offspring), or through strong disruptive selection.</li>
        </ul>
      `
    }
  },
  {
    title: "Extinction and bursts of new species",
    body: {
      middle: `
        <p>The flip side of new species appearing is <strong>extinction</strong> — old species disappearing. Over <strong>99% of species that ever lived are extinct now</strong>.</p>
        <p>Mass extinctions (like the asteroid that killed the dinosaurs) wipe out tons of species at once. But they also <em>open up</em> ecological space.</p>
        <p>After the dinosaurs disappeared 66 million years ago, mammals exploded into a huge variety of forms in just a few million years. That's called <strong>adaptive radiation</strong> — when one group quickly branches into many new ones.</p>
      `,
      high: `
        <p>Speciation's flipside is <strong>extinction</strong> — over 99% of species that ever lived are now extinct.</p>
        <p>Mass extinctions (asteroid, volcanic, climate-driven) periodically wipe out huge chunks of life — but they also <em>open up</em> ecological niches.</p>
        <p>After the dinosaurs went extinct 66 million years ago, mammals exploded into thousands of new forms in just a few million years. That's <strong>adaptive radiation</strong>: one ancestral group diversifying rapidly into many specialized descendants.</p>
      `
    }
  },
  {
    title: "We all share one common ancestor",
    body: {
      middle: `
        <p>Every living thing on Earth — bacteria, plants, animals, you — shares a <strong>common ancestor</strong>. The evidence is overwhelming:</p>
        <ul>
          <li><strong>All life uses the same DNA code</strong>. The same three-letter codons mean the same amino acid in a bacterium, a tree, and you.</li>
          <li><strong>Same basic machinery</strong>. Ribosomes look very similar in vastly different organisms.</li>
          <li><strong>Same body plans</strong>. Your arm, a bat wing, a whale flipper, and a horse leg all have the same bones in the same arrangement — just different shapes.</li>
          <li><strong>Leftover parts</strong>. Things like the human appendix or tiny leg bones inside whales are evolutionary leftovers.</li>
        </ul>
        <p>Scientists build <strong>family trees</strong> of life (called phylogenetic trees) using all this evidence, especially DNA comparisons.</p>
      `,
      high: `
        <p>Every living thing on Earth shares a <strong>common ancestor</strong>. The evidence is everywhere once you know where to look:</p>
        <ul>
          <li><strong>Universal DNA</strong> — all life uses the same genetic code (A, T, G, C with minor exceptions in mitochondria). The same codons code for the same amino acids in bacteria, plants, and you.</li>
          <li><strong>Conserved genes</strong> — core machinery (ribosomes, ATP synthase, histones in eukaryotes) is recognizably similar across vastly different organisms.</li>
          <li><strong>Homologous structures</strong> — your arm, a bat's wing, a whale's flipper, and a horse's leg all share the same underlying bone arrangement (humerus → radius/ulna → carpals → digits). Same blueprint, different uses.</li>
          <li><strong>Vestigial structures</strong> — leftover bits with no current function: human appendix, whale pelvic bones, blind cavefish eyes.</li>
        </ul>
        <p><strong>Phylogenetic trees</strong> map these relationships. Closer branches = more recent common ancestor. Built from morphology, fossil dates, and (most powerfully today) DNA sequence comparisons.</p>
      `
    }
  },
  {
    title: "How did life start?",
    body: {
      middle: `
        <p>Life first appeared on Earth about <strong>3.5 to 3.8 billion years ago</strong>. We don't know exactly how, but here's the rough idea:</p>
        <ol>
          <li><strong>First, simple chemicals.</strong> Lightning and other energy hitting early Earth's air made small life molecules like amino acids. Scientists have actually shown this works in lab experiments.</li>
          <li><strong>Then, longer chains.</strong> Small molecules stuck together into bigger ones, maybe on warm clay or in tide pools.</li>
          <li><strong>Then, self-copying molecules.</strong> Many scientists think RNA came first, because it can both carry information AND speed up reactions.</li>
          <li><strong>Then, the first cells.</strong> Fat molecules naturally form bubbles in water. Trap some RNA inside a bubble and you've got the start of a cell.</li>
          <li><strong>Then, the ancestor of everything alive.</strong> All life today comes from one ancient cell scientists call "LUCA" (Last Universal Common Ancestor).</li>
        </ol>
        <p>The details are still being worked out. But the broad story — chemistry → self-copying molecules → cells — is well-supported.</p>
      `,
      high: `
        <p>Life appeared on Earth ~3.5–3.8 billion years ago. How? We don't know exactly, but the pieces are starting to fit together:</p>
        <ul>
          <li><strong>Stage 1 — Organic molecules from inorganic</strong>. The 1953 <strong>Miller-Urey experiment</strong> showed that lightning + early-Earth gases (CH₄, NH₃, H₂, H₂O) can spontaneously form amino acids. Deep-sea hydrothermal vents may have done the same chemistry continuously.</li>
          <li><strong>Stage 2 — Polymers</strong>. Amino acids and nucleotides could link on warm clay surfaces or in tidal pools.</li>
          <li><strong>Stage 3 — Self-replicating molecules</strong>. The <strong>RNA world hypothesis</strong>: RNA can both store information (like DNA) and catalyze reactions (like a protein). An RNA molecule that could copy itself would be the first replicator.</li>
          <li><strong>Stage 4 — Membranes</strong>. Lipid molecules spontaneously form bubbles in water. Wrap RNA in a lipid bubble and you have a primitive cell — a <strong>protocell</strong>.</li>
          <li><strong>Stage 5 — LUCA</strong>. The <strong>Last Universal Common Ancestor</strong> of all life living today existed ~3.5 billion years ago. Every modern lineage traces back to it.</li>
        </ul>
        <p>The exact details are still being researched. But the broad story — chemistry → replication → cells → diversification — is well-supported.</p>
      `
    }
  }
];
