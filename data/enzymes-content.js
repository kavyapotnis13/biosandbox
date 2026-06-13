/* =========================================================
   enzymes-content.js — flashcards for the Enzymes module
   Four decks, in the order students step through them.
   ========================================================= */

const ENZYME_INTRO_CARDS = [
  {
    title: "Enzymes — life's catalysts",
    body: `
      <p>An <strong>enzyme</strong> is a biological catalyst — almost always a protein — that speeds up a chemical reaction without being used up itself.</p>
      <p>Without enzymes, most cellular reactions would happen <em>millions of times too slowly</em> to keep you alive. An enzyme called catalase, for example, breaks down hydrogen peroxide so fast you can see it foam when you pour H₂O₂ on a cut.</p>
      <p>Cells make thousands of different enzymes — one for nearly every reaction they need to run.</p>
    `
  },
  {
    title: "Lowering the activation energy",
    body: `
      <p>Every reaction needs a little push to get started — an <strong>activation energy</strong> (E<sub>a</sub>) — to break old bonds before new ones form.</p>
      <p>Enzymes don't change <em>how much</em> energy the reaction releases overall. They just <strong>lower the hill</strong> the reactants have to climb to get over the top.</p>
      <p>Lower hill → more molecules have enough energy to react at any given moment → faster reaction. Same products, same end-state energy — just much faster getting there.</p>
    `
  },
  {
    title: "Naming enzymes",
    body: `
      <p>Most enzyme names end in <strong>-ase</strong>, and they're usually named after either the substrate they act on or the reaction they catalyze:</p>
      <ul>
        <li><strong>Lact</strong>ase splits <strong>lactose</strong></li>
        <li><strong>Sucr</strong>ase splits <strong>sucrose</strong></li>
        <li>DNA <strong>polymer</strong>ase builds DNA <strong>polymers</strong></li>
        <li>ATP <strong>synth</strong>ase <strong>synthesizes</strong> ATP</li>
      </ul>
      <p>If you can read the name, you can usually guess the job.</p>
    `
  }
];

const ENZYME_ACTIVE_SITE_CARDS = [
  {
    title: "The active site",
    body: `
      <p>An enzyme works by binding its substrate (the molecule being changed) in a special pocket called the <strong>active site</strong>.</p>
      <p>The active site's shape is complementary to the substrate's — but only the substrate it's <em>supposed</em> to act on. This is why each enzyme is specific to one reaction (or a small family of related ones).</p>
      <p>Once the substrate binds, the enzyme stresses its bonds, brings reactive groups close together, or otherwise lowers the activation energy. The product is released, and the enzyme is free to grab another substrate.</p>
    `
  },
  {
    title: "Induced fit — not a rigid lock",
    body: `
      <p>The old "lock-and-key" model said the active site was a rigid mold. We now know it's more like a <strong>handshake</strong>: when the substrate enters, the enzyme <em>flexes slightly</em> to wrap around it more tightly. This is called <strong>induced fit</strong>.</p>
      <p>That extra squeeze does the catalytic work — it strains the substrate's bonds, lines up reactive atoms, and lowers E<sub>a</sub>.</p>
      <p>After the reaction, the active site springs back open, the product diffuses out, and the enzyme is ready to bind the next substrate.</p>
    `
  },
  {
    title: "Enzymes are reusable",
    body: `
      <p>A single enzyme molecule can run its reaction <strong>thousands or millions of times per second</strong>. It's not consumed — it just keeps grabbing substrate, transforming it, releasing product, and repeating.</p>
      <p>That's why cells only need tiny amounts of each enzyme. A handful of enzyme molecules can process huge amounts of substrate.</p>
      <p>This recycling is the whole point of using a catalyst: it makes the reaction fast and cheap.</p>
    `
  }
];

const ENZYME_FACTORS_CARDS = [
  {
    title: "Temperature — speed up, then break",
    body: `
      <p>As you heat an enzyme up, molecules move faster, collisions happen more often, and the reaction rate climbs.</p>
      <p>But every enzyme has an <strong>optimal temperature</strong> — usually around <strong>37°C</strong> for human enzymes — beyond which the protein starts to unfold.</p>
      <p>An unfolded enzyme is <strong>denatured</strong>. Its active site is gone, and the reaction stops. Cooking an egg is exactly this: heat denatures the proteins in egg white, and they tangle into a permanent solid.</p>
      <p>Denaturation is usually <em>irreversible</em> — once the enzyme is cooked, it's cooked.</p>
    `
  },
  {
    title: "pH — a narrow happy zone",
    body: `
      <p>Each enzyme also has an <strong>optimal pH</strong>:</p>
      <ul>
        <li><strong>Pepsin</strong> works in your stomach at pH ~2 (very acidic).</li>
        <li><strong>Amylase</strong> in your saliva prefers pH ~7 (neutral).</li>
        <li><strong>Trypsin</strong> in your small intestine likes pH ~8 (slightly basic).</li>
      </ul>
      <p>Move the pH too far from optimum and the charges on the protein's side chains change, breaking the bonds that hold the active site in shape. The enzyme denatures — same outcome as overheating.</p>
    `
  },
  {
    title: "Substrate concentration + saturation",
    body: `
      <p>Add more substrate to a reaction and it speeds up — at first. But once all the enzyme's active sites are full, adding more substrate doesn't help. The enzyme is <strong>saturated</strong>.</p>
      <p>To go faster from there, you have to add more <em>enzyme</em>, not more substrate. This is why cells fine-tune the amount of each enzyme they make.</p>
    `
  },
  {
    title: "Inhibitors — blocking the active site",
    body: `
      <p>Some molecules slow enzymes down on purpose:</p>
      <ul>
        <li><strong>Competitive inhibitors</strong> look like the substrate and fight for the active site. More substrate can outcompete them.</li>
        <li><strong>Noncompetitive inhibitors</strong> bind a different spot (an <em>allosteric site</em>) and change the enzyme's shape so the active site no longer fits the substrate. Adding more substrate doesn't help.</li>
      </ul>
      <p>Many drugs (and poisons) work as enzyme inhibitors — penicillin blocks a bacterial cell-wall enzyme, aspirin inhibits the COX-1 enzyme that causes pain and inflammation.</p>
    `
  }
];

const ENZYME_PATHWAY_CARDS = [
  {
    title: "Enzymes work in pathways",
    body: `
      <p>Most cellular work isn't a single reaction — it's a <strong>chain of reactions</strong>, each catalyzed by its own enzyme. The product of one enzyme is the substrate of the next.</p>
      <p>Glycolysis, for example, is a 10-step pathway. Each step has a dedicated enzyme; together they break glucose down into pyruvate.</p>
      <p>This modular setup lets cells regulate metabolism precisely: turning one enzyme up or down changes the flow through the whole pipeline.</p>
    `
  },
  {
    title: "Feedback inhibition",
    body: `
      <p>A common way cells regulate pathways: when the <em>end product</em> piles up, it binds to and inhibits the <em>first enzyme</em> in the pathway. This <strong>feedback inhibition</strong> prevents overproduction.</p>
      <p>It's the same logic as a thermostat. When the building is warm enough, the heat shuts off — not by sensing fuel, but by sensing the output.</p>
      <p>Without this kind of feedback, cells would waste energy making molecules they already have plenty of.</p>
    `
  },
  {
    title: "Different cells, different enzyme sets",
    body: `
      <p>Your liver cells, muscle cells, and neurons all have the same DNA — but they make different sets of enzymes, and so they run different metabolic pathways.</p>
      <p>Liver cells run gluconeogenesis (making glucose); muscle cells don't bother. Photosynthetic plant cells run the Calvin cycle; you can't.</p>
      <p>This <strong>molecular diversity</strong> — different enzymes specialized for different jobs — is how a single genome produces hundreds of distinct cell types.</p>
    `
  },
  {
    title: "Cofactors and coenzymes",
    body: `
      <p>Many enzymes need a helper to do their job:</p>
      <ul>
        <li><strong>Cofactors</strong> — usually inorganic ions (Zn²⁺, Mg²⁺, Fe²⁺) that sit in the active site.</li>
        <li><strong>Coenzymes</strong> — small organic molecules (often vitamins!) that ferry chemical groups or electrons. NAD⁺, FAD, and Coenzyme A are the famous ones in cellular respiration.</li>
      </ul>
      <p>That's why your body needs vitamins. Many are precursors to coenzymes — without them, the enzymes that need them simply can't work.</p>
    `
  }
];
