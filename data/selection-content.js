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
   ========================================================= */

const SELECTION_INTRO_CARDS = [
  {
    title: "What is evolution?",
    body: `
      <p><strong>Evolution</strong> is a change in the <em>genetic makeup of a population</em> over generations. Individuals don't evolve — populations do.</p>
      <p>Across millions of generations, small changes accumulate into the breathtaking diversity of life: every beetle, every redwood, every blue whale.</p>
      <p>Charles Darwin's 1859 book <em>On the Origin of Species</em> laid out the mechanism behind it: <strong>natural selection</strong>.</p>
    `
  },
  {
    title: "Darwin's four ingredients",
    body: `
      <p>Natural selection works whenever <strong>all four</strong> of these are true in a population:</p>
      <ol>
        <li><strong>Variation</strong> — individuals differ in their traits</li>
        <li><strong>Inheritance</strong> — those traits are passed to offspring</li>
        <li><strong>Differential survival</strong> — some traits help more than others in the current environment</li>
        <li><strong>Time</strong> — many generations for the helpful traits to spread</li>
      </ol>
      <p>Strip any one ingredient out and natural selection stops working.</p>
    `
  },
  {
    title: "What 'fitness' actually means",
    body: `
      <p>In biology, <strong>fitness ≠ strength or speed</strong>. Fitness means <em>how many surviving, reproducing offspring you have</em>.</p>
      <p>A frail bacterium that produces a million descendants has higher fitness than a tiger that has none. A peacock's flamboyant tail makes him slower but more attractive — and a mating success is the only kind that counts.</p>
      <p>Fitness is <em>relative</em> (compared to other individuals in the same population) and <em>local</em> (only matters in the current environment).</p>
    `
  },
  {
    title: "Adaptation — the famous examples",
    body: `
      <p>An <strong>adaptation</strong> is a heritable trait that improves survival or reproduction in the current environment.</p>
      <ul>
        <li><strong>Darwin's finches</strong> — beak shapes specialized for different food sources on each Galápagos island.</li>
        <li><strong>Peppered moths</strong> — dark moths boomed when soot from English factories blackened tree bark in the 1800s, then crashed again once pollution laws cleaned the bark.</li>
        <li><strong>Antibiotic resistance</strong> — bacteria evolving past our drugs in real time, inside hospitals.</li>
      </ul>
    `
  },
  {
    title: "Evidence for evolution",
    body: `
      <p>Evolution is the single most well-supported theory in biology. Four independent lines of evidence all point the same direction:</p>
      <ul>
        <li><strong>Fossils</strong> — transitional forms like <em>Tiktaalik</em> (fish → tetrapod) and <em>Archaeopteryx</em> (dinosaur → bird)</li>
        <li><strong>Homologous structures</strong> — the same arm bones in humans, whales, bats, and frogs</li>
        <li><strong>Biogeography</strong> — closely related species clustered on the same continent or island chain</li>
        <li><strong>Molecular evidence</strong> — DNA sequence similarity tracks exactly with predicted family trees</li>
      </ul>
    `
  }
];

const SELECTION_MECHANISMS = [
  {
    title: "Natural selection — three flavors",
    body: `
      <p>Selection doesn't always push a trait the same direction:</p>
      <ul>
        <li><strong>Directional</strong> — extreme on one end is favored (peppered moths shifting darker)</li>
        <li><strong>Stabilizing</strong> — the average wins, extremes get pruned (human birth weight)</li>
        <li><strong>Disruptive</strong> — both extremes are favored, the middle is selected against (large vs small beaks, but not medium)</li>
      </ul>
      <p>Disruptive selection is especially interesting — it can split one population into two.</p>
    `
  },
  {
    title: "Sexual selection",
    body: `
      <p>Some traits aren't useful for survival — they're useful for <em>mating</em>. <strong>Sexual selection</strong> is selection on traits that affect who gets to reproduce.</p>
      <p>Classic examples: peacock tails, elk antlers, bird songs, bright-colored fish. These traits can become so exaggerated they actually hurt survival — but if they boost mating, natural selection still rewards them.</p>
    `
  },
  {
    title: "Genetic drift — random luck",
    body: `
      <p><strong>Genetic drift</strong> is random change in allele frequencies, especially in small populations. No selection pressure required — just chance.</p>
      <p>Two famous cases:</p>
      <ul>
        <li><strong>Bottleneck effect</strong> — a disaster (disease, hunting, habitat loss) wipes out most of a population. The few survivors might not represent the original gene pool. Cheetahs went through this — they have very low genetic diversity.</li>
        <li><strong>Founder effect</strong> — a small group splits off and starts a new population. Whatever alleles the founders happened to carry now dominate.</li>
      </ul>
    `
  },
  {
    title: "Gene flow — mixing populations",
    body: `
      <p><strong>Gene flow</strong> is the movement of alleles between populations — through migration, pollen drifting on the wind, seeds carried by birds, humans moving across continents.</p>
      <p>Gene flow tends to <em>reduce</em> differences between populations. The more gene flow there is between two groups, the more similar they stay genetically.</p>
      <p>If gene flow stops completely (say, a mountain range cuts a population in two), the two halves can start drifting apart and eventually become different species.</p>
    `
  },
  {
    title: "Mutation — the source of all variation",
    body: `
      <p>Where does new genetic variation come from in the first place? <strong>Mutations</strong> — random copying errors in DNA.</p>
      <p>Most mutations are neutral. Some are harmful. A rare few are beneficial in the current environment — and those are the raw material natural selection has to work with.</p>
      <p>Without mutation, evolution would eventually grind to a halt. Selection can only shuffle the variation that already exists; mutation is what keeps refilling the pool.</p>
    `
  }
];

const SELECTION_HARDY_WEINBERG = [
  {
    title: "What Hardy-Weinberg actually is",
    body: `
      <p>The <strong>Hardy-Weinberg equilibrium</strong> describes a hypothetical population that <em>isn't evolving</em>. It's a <strong>null hypothesis</strong> — a baseline you compare a real population against.</p>
      <p>If a real population's allele frequencies match the Hardy-Weinberg prediction, it's not evolving. If they don't match, something — selection, drift, gene flow, mutation — is at work.</p>
    `
  },
  {
    title: "The two equations",
    body: `
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
  },
  {
    title: "The five conditions",
    body: `
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
  },
  {
    title: "Putting the equation to work",
    body: `
      <p>Say 16% of a population has a recessive disorder (<code>aa</code>). That means <code>q² = 0.16</code>, so <code>q = 0.4</code>.</p>
      <p>Then <code>p = 1 − 0.4 = 0.6</code>.</p>
      <p>Heterozygous carriers (<code>Aa</code>) = <code>2pq = 2(0.6)(0.4) = 0.48</code> — meaning <strong>48% of the population are silent carriers</strong>, even though only 16% show the trait.</p>
      <p>That's the power of Hardy-Weinberg: a single observable phenotype frequency lets you estimate the hidden allele pool.</p>
    `
  }
];

const SELECTION_SPECIATION = [
  {
    title: "What is a species?",
    body: `
      <p>The most common definition is the <strong>biological species concept</strong>: a species is a group of organisms that <em>can interbreed in nature</em> and produce <em>fertile offspring</em>.</p>
      <p>A horse + donkey = a mule, but mules are sterile — so horses and donkeys are different species, even though they look similar.</p>
      <p>This concept breaks down for bacteria (they don't really "mate"), fossils, and asexual organisms — but for most animals it works well.</p>
    `
  },
  {
    title: "Reproductive isolation",
    body: `
      <p>For two populations to become separate species, something has to stop them from interbreeding. The barriers come in two flavors:</p>
      <ul>
        <li><strong>Prezygotic</strong> (before fertilization) — different mating seasons, different habitats, incompatible mating behavior, gametes that can't fuse</li>
        <li><strong>Postzygotic</strong> (after fertilization) — hybrid offspring die early, are sterile, or themselves produce weak offspring</li>
      </ul>
      <p>Once these barriers are in place, the two populations are reproductively isolated and evolve independently.</p>
    `
  },
  {
    title: "Allopatric vs sympatric speciation",
    body: `
      <p>Two main ways new species form:</p>
      <ul>
        <li><strong>Allopatric speciation</strong> ("different place") — a geographic barrier splits a population in two. Each half evolves separately until they can't interbreed anymore. Most common form.</li>
        <li><strong>Sympatric speciation</strong> ("same place") — a new species forms without geographic separation. Often through polyploidy in plants (genome duplication produces instantly-isolated offspring), or through strong disruptive selection.</li>
      </ul>
    `
  },
  {
    title: "Extinction & adaptive radiation",
    body: `
      <p>Speciation's flipside is <strong>extinction</strong> — over 99% of species that ever lived are now extinct.</p>
      <p>Mass extinctions (asteroid, volcanic, climate-driven) periodically wipe out huge chunks of life — but they also <em>open up</em> ecological niches.</p>
      <p>After the dinosaurs went extinct 66 million years ago, mammals exploded into thousands of new forms in just a few million years. That's <strong>adaptive radiation</strong>: one ancestral group diversifying rapidly into many specialized descendants.</p>
    `
  },
  {
    title: "Common ancestry — one tree of life",
    body: `
      <p>Every living thing on Earth shares a <strong>common ancestor</strong>. The evidence is everywhere once you know where to look:</p>
      <ul>
        <li><strong>Universal DNA</strong> — all life uses the same genetic code (A, T, G, C with minor exceptions in mitochondria). The same codons code for the same amino acids in bacteria, plants, and you.</li>
        <li><strong>Conserved genes</strong> — core machinery (ribosomes, ATP synthase, histones in eukaryotes) is recognizably similar across vastly different organisms.</li>
        <li><strong>Homologous structures</strong> — your arm, a bat's wing, a whale's flipper, and a horse's leg all share the same underlying bone arrangement (humerus → radius/ulna → carpals → digits). Same blueprint, different uses.</li>
        <li><strong>Vestigial structures</strong> — leftover bits with no current function: human appendix, whale pelvic bones, blind cavefish eyes.</li>
      </ul>
      <p><strong>Phylogenetic trees</strong> map these relationships. Closer branches = more recent common ancestor. Built from morphology, fossil dates, and (most powerfully today) DNA sequence comparisons.</p>
    `
  },
  {
    title: "Origin of life — from chemistry to cells",
    body: `
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
];
