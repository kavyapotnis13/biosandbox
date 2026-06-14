/* =========================================================
   enzymes-content.js — flashcards for the Enzymes module
   Four decks, in the order students step through them.

   Each card has body: { middle, high }.
   ========================================================= */

const ENZYME_INTRO_CARDS = [
  {
    title: "Enzymes — life's catalysts",
    body: {
      middle: `
        <p>An <strong>enzyme</strong> is a tiny machine inside cells (almost always made of protein) that <strong>speeds up</strong> a chemical reaction.</p>
        <p>Without enzymes, the reactions that keep you alive would happen <em>way</em> too slowly. For example, digesting a meal would take years.</p>
        <p>Your body makes thousands of different enzymes — one for almost every job a cell needs done.</p>
      `,
      high: `
        <p>An <strong>enzyme</strong> is a biological catalyst — almost always a protein — that speeds up a chemical reaction without being used up itself.</p>
        <p>Without enzymes, most cellular reactions would happen <em>millions of times too slowly</em> to keep you alive. An enzyme called catalase, for example, breaks down hydrogen peroxide so fast you can see it foam when you pour H₂O₂ on a cut.</p>
        <p>Cells make thousands of different enzymes — one for nearly every reaction they need to run.</p>
      `
    }
  },
  {
    title: "Lowering the activation energy",
    body: {
      middle: `
        <p>Every chemical reaction needs a little starting push to get going — like rolling a boulder over a small hill before it can roll down the other side.</p>
        <p>Enzymes don't change how the reaction ends. They just <strong>make the starting hill smaller</strong>. With a smaller hill, way more molecules can get over it — so the reaction happens way faster.</p>
      `,
      high: `
        <p>Every reaction needs a little push to get started — an <strong>activation energy</strong> (E<sub>a</sub>) — to break old bonds before new ones form.</p>
        <p>Enzymes don't change <em>how much</em> energy the reaction releases overall. They just <strong>lower the hill</strong> the reactants have to climb to get over the top.</p>
        <p>Lower hill → more molecules have enough energy to react at any given moment → faster reaction. Same products, same end-state energy — just much faster getting there.</p>
      `
    }
  },
  {
    title: "Naming enzymes",
    body: {
      middle: `
        <p>Most enzymes end in <strong>-ase</strong>, and they're usually named after what they work on:</p>
        <ul>
          <li><strong>Lact</strong>ase breaks down <strong>lactose</strong> (the sugar in milk).</li>
          <li><strong>Sucr</strong>ase breaks down <strong>sucrose</strong> (table sugar).</li>
          <li>DNA <strong>polymer</strong>ase makes DNA chains (polymers).</li>
        </ul>
        <p>If you can read the name, you can usually guess the job!</p>
      `,
      high: `
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
  }
];

const ENZYME_ACTIVE_SITE_CARDS = [
  {
    title: "The active site",
    body: {
      middle: `
        <p>An enzyme has a special pocket called the <strong>active site</strong>. The molecule the enzyme works on (called the <em>substrate</em>) fits into this pocket like a key into a lock.</p>
        <p>Because the pocket is shaped just right for one specific substrate, each enzyme only works on one specific job. A sugar enzyme won't accept a fat — it's the wrong shape.</p>
        <p>Once the substrate fits in, the enzyme works its magic, the substrate gets changed into a product, and the product pops back out.</p>
      `,
      high: `
        <p>An enzyme works by binding its substrate (the molecule being changed) in a special pocket called the <strong>active site</strong>.</p>
        <p>The active site's shape is complementary to the substrate's — but only the substrate it's <em>supposed</em> to act on. This is why each enzyme is specific to one reaction (or a small family of related ones).</p>
        <p>Once the substrate binds, the enzyme stresses its bonds, brings reactive groups close together, or otherwise lowers the activation energy. The product is released, and the enzyme is free to grab another substrate.</p>
      `
    }
  },
  {
    title: "Induced fit — not a rigid lock",
    body: {
      middle: `
        <p>The "lock and key" picture isn't quite right. The pocket isn't a stiff mold — it's more like a <strong>handshake</strong>. When the substrate slides in, the enzyme gently wraps around it for a tighter grip.</p>
        <p>That little squeeze is what helps the reaction happen faster. Once the new product is made, the enzyme relaxes back, and the product slides out.</p>
      `,
      high: `
        <p>The old "lock-and-key" model said the active site was a rigid mold. We now know it's more like a <strong>handshake</strong>: when the substrate enters, the enzyme <em>flexes slightly</em> to wrap around it more tightly. This is called <strong>induced fit</strong>.</p>
        <p>That extra squeeze does the catalytic work — it strains the substrate's bonds, lines up reactive atoms, and lowers E<sub>a</sub>.</p>
        <p>After the reaction, the active site springs back open, the product diffuses out, and the enzyme is ready to bind the next substrate.</p>
      `
    }
  },
  {
    title: "Enzymes are reusable",
    body: {
      middle: `
        <p>Here's the cool thing about enzymes: the enzyme itself doesn't get used up. After it changes one substrate into a product, it just grabs another substrate and does it again — over and over and over.</p>
        <p>A single enzyme can do its job <strong>thousands of times per second</strong>. So a cell only needs a tiny amount of any given enzyme to get a lot of work done.</p>
      `,
      high: `
        <p>A single enzyme molecule can run its reaction <strong>thousands or millions of times per second</strong>. It's not consumed — it just keeps grabbing substrate, transforming it, releasing product, and repeating.</p>
        <p>That's why cells only need tiny amounts of each enzyme. A handful of enzyme molecules can process huge amounts of substrate.</p>
        <p>This recycling is the whole point of using a catalyst: it makes the reaction fast and cheap.</p>
      `
    }
  }
];

const ENZYME_FACTORS_CARDS = [
  {
    title: "Temperature — heating it up",
    body: {
      middle: `
        <p>Warm things up a bit and enzymes work faster — molecules zip around more and collide more often.</p>
        <p>But there's a sweet spot. For most human enzymes, that's around <strong>body temperature (37°C)</strong>. Heat them up too much past that and the enzyme starts to <strong>fall apart</strong> — its shape unravels, the pocket is ruined, and it stops working.</p>
        <p>You see this when you cook an egg. The clear egg-white turns solid because heat destroyed the shape of the proteins. That's the same thing that happens to enzymes when they get too hot — and it's usually permanent.</p>
      `,
      high: `
        <p>As you heat an enzyme up, molecules move faster, collisions happen more often, and the reaction rate climbs.</p>
        <p>But every enzyme has an <strong>optimal temperature</strong> — usually around <strong>37°C</strong> for human enzymes — beyond which the protein starts to unfold.</p>
        <p>An unfolded enzyme is <strong>denatured</strong>. Its active site is gone, and the reaction stops. Cooking an egg is exactly this: heat denatures the proteins in egg white, and they tangle into a permanent solid.</p>
        <p>Denaturation is usually <em>irreversible</em> — once the enzyme is cooked, it's cooked.</p>
      `
    }
  },
  {
    title: "pH — too sour, too bitter",
    body: {
      middle: `
        <p>Each enzyme also has a favorite <strong>acidity</strong> (pH).</p>
        <ul>
          <li>Your <strong>stomach</strong> enzymes love acid (low pH, like lemon juice).</li>
          <li>Your <strong>saliva</strong> enzymes prefer neutral pH (like water).</li>
          <li>Your <strong>intestine</strong> enzymes work in slightly basic conditions.</li>
        </ul>
        <p>If the pH gets too far off, the enzyme falls apart — same fate as when it gets too hot.</p>
      `,
      high: `
        <p>Each enzyme also has an <strong>optimal pH</strong>:</p>
        <ul>
          <li><strong>Pepsin</strong> works in your stomach at pH ~2 (very acidic).</li>
          <li><strong>Amylase</strong> in your saliva prefers pH ~7 (neutral).</li>
          <li><strong>Trypsin</strong> in your small intestine likes pH ~8 (slightly basic).</li>
        </ul>
        <p>Move the pH too far from optimum and the charges on the protein's side chains change, breaking the bonds that hold the active site in shape. The enzyme denatures — same outcome as overheating.</p>
      `
    }
  },
  {
    title: "Too much substrate — saturation",
    body: {
      middle: `
        <p>If you add more substrate to a reaction, things speed up — at first. But once <em>every</em> enzyme is busy working on a substrate, adding more doesn't help. The enzymes are <strong>maxed out</strong>.</p>
        <p>It's like a pizza shop. If every oven is full, ordering more pizzas just creates a line; it doesn't make them come out faster. To go faster you'd need more ovens (more enzymes).</p>
      `,
      high: `
        <p>Add more substrate to a reaction and it speeds up — at first. But once all the enzyme's active sites are full, adding more substrate doesn't help. The enzyme is <strong>saturated</strong>.</p>
        <p>To go faster from there, you have to add more <em>enzyme</em>, not more substrate. This is why cells fine-tune the amount of each enzyme they make.</p>
      `
    }
  },
  {
    title: "Inhibitors — blocking the active site",
    body: {
      middle: `
        <p>Sometimes a different molecule can <strong>block</strong> an enzyme to slow it down on purpose. These blockers are called <em>inhibitors</em>.</p>
        <ul>
          <li>Some inhibitors <strong>squat in the active site</strong> so the real substrate can't get in.</li>
          <li>Other inhibitors bind <em>somewhere else</em> on the enzyme and change its shape, ruining the pocket.</li>
        </ul>
        <p>Lots of medicines work this way. Penicillin, for example, blocks an enzyme that bacteria need to build their cell walls. Without that enzyme, the bacteria die.</p>
      `,
      high: `
        <p>Some molecules slow enzymes down on purpose:</p>
        <ul>
          <li><strong>Competitive inhibitors</strong> look like the substrate and fight for the active site. More substrate can outcompete them.</li>
          <li><strong>Noncompetitive inhibitors</strong> bind a different spot (an <em>allosteric site</em>) and change the enzyme's shape so the active site no longer fits the substrate. Adding more substrate doesn't help.</li>
        </ul>
        <p>Many drugs (and poisons) work as enzyme inhibitors — penicillin blocks a bacterial cell-wall enzyme, aspirin inhibits the COX-1 enzyme that causes pain and inflammation.</p>
      `
    }
  }
];

const ENZYME_PATHWAY_CARDS = [
  {
    title: "Enzymes work in teams",
    body: {
      middle: `
        <p>Most of the time, one enzyme isn't enough — a whole <strong>team of enzymes</strong> works in a line, like a factory assembly line.</p>
        <p>Each enzyme does its small job, then hands the product to the next enzyme, which does its job, and so on. By the end, what started as one simple molecule has been transformed into something the cell needs.</p>
      `,
      high: `
        <p>Most cellular work isn't a single reaction — it's a <strong>chain of reactions</strong>, each catalyzed by its own enzyme. The product of one enzyme is the substrate of the next.</p>
        <p>Glycolysis, for example, is a 10-step pathway. Each step has a dedicated enzyme; together they break glucose down into pyruvate.</p>
        <p>This modular setup lets cells regulate metabolism precisely: turning one enzyme up or down changes the flow through the whole pipeline.</p>
      `
    }
  },
  {
    title: "Feedback inhibition",
    body: {
      middle: `
        <p>Here's a clever trick cells use: once a factory line has made <em>enough</em> of its product, that product turns around and <strong>switches off the first enzyme</strong> in the line. The whole assembly line shuts down until the product gets used up again.</p>
        <p>It's like a thermostat. When the room is warm enough, the heater turns off — not by checking the fuel, but by checking the temperature.</p>
      `,
      high: `
        <p>A common way cells regulate pathways: when the <em>end product</em> piles up, it binds to and inhibits the <em>first enzyme</em> in the pathway. This <strong>feedback inhibition</strong> prevents overproduction.</p>
        <p>It's the same logic as a thermostat. When the building is warm enough, the heat shuts off — not by sensing fuel, but by sensing the output.</p>
        <p>Without this kind of feedback, cells would waste energy making molecules they already have plenty of.</p>
      `
    }
  },
  {
    title: "Different cells, different enzymes",
    body: {
      middle: `
        <p>Every cell in your body has the same DNA. So why does a liver cell look so different from a brain cell?</p>
        <p>Because each cell type <strong>turns on a different set of enzymes</strong>. A liver cell makes enzymes for storing and releasing sugar. A muscle cell makes enzymes for moving and using energy fast. A brain cell makes enzymes for sending nerve signals.</p>
        <p>Same DNA, different enzyme teams, totally different cell jobs.</p>
      `,
      high: `
        <p>Your liver cells, muscle cells, and neurons all have the same DNA — but they make different sets of enzymes, and so they run different metabolic pathways.</p>
        <p>Liver cells run gluconeogenesis (making glucose); muscle cells don't bother. Photosynthetic plant cells run the Calvin cycle; you can't.</p>
        <p>This <strong>molecular diversity</strong> — different enzymes specialized for different jobs — is how a single genome produces hundreds of distinct cell types.</p>
      `
    }
  },
  {
    title: "Enzyme helpers",
    body: {
      middle: `
        <p>Some enzymes need a little helper molecule to actually do their job. These helpers are called <strong>cofactors</strong> (if they're metals like zinc or iron) or <strong>coenzymes</strong> (if they're small organic molecules).</p>
        <p>This is one reason your body needs <strong>vitamins</strong>! Many vitamins are turned into coenzymes inside your cells. Without them, the enzymes that need them can't work, and you get sick.</p>
      `,
      high: `
        <p>Many enzymes need a helper to do their job:</p>
        <ul>
          <li><strong>Cofactors</strong> — usually inorganic ions (Zn²⁺, Mg²⁺, Fe²⁺) that sit in the active site.</li>
          <li><strong>Coenzymes</strong> — small organic molecules (often vitamins!) that ferry chemical groups or electrons. NAD⁺, FAD, and Coenzyme A are the famous ones in cellular respiration.</li>
        </ul>
        <p>That's why your body needs vitamins. Many are precursors to coenzymes — without them, the enzymes that need them simply can't work.</p>
      `
    }
  }
];
