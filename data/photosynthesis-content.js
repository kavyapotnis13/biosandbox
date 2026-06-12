/* =========================================================
   photosynthesis-content.js — flashcards for the Photosynthesis module

   Three card decks:
     PHOTO_INTRO_CARDS         — the big picture
     PHOTO_LIGHT_REACTIONS     — 4-step walkthrough (in the thylakoids)
     PHOTO_CALVIN_CYCLE        — 4-step walkthrough (in the stroma)
   ========================================================= */

const PHOTO_INTRO_CARDS = [
  {
    title: "What is photosynthesis?",
    body: `
      <p>Photosynthesis is how plants (and algae, and some bacteria) <strong>turn sunlight into food</strong>.</p>
      <p>They take in carbon dioxide and water, capture the energy in sunlight, and use it to build sugar — releasing oxygen as a free side effect that the rest of us breathe.</p>
      <p>Almost every food chain on Earth starts here.</p>
    `
  },
  {
    title: "The overall equation",
    body: `
      <p>The whole process boils down to one chemical equation:</p>
      <p style="text-align:center; font-family:'JetBrains Mono', monospace; font-size:1rem; padding:0.4rem 0;">
        6 CO₂ + 6 H₂O + light → C₆H₁₂O₆ + 6 O₂
      </p>
      <p>Inputs: carbon dioxide, water, sunlight. Outputs: glucose (a sugar) and oxygen.</p>
      <p>It looks simple — but getting there takes <em>dozens</em> of carefully orchestrated chemical steps.</p>
    `
  },
  {
    title: "Why are plants green?",
    body: `
      <p>Plants are packed with a green pigment called <strong>chlorophyll</strong> that lives inside chloroplasts.</p>
      <p>Chlorophyll mostly absorbs <em>red</em> and <em>blue</em> wavelengths of light — and <em>reflects</em> the green ones. So the green light you see is actually the light a plant <em>didn't</em> use.</p>
      <p>In autumn, chlorophyll breaks down and other pigments (yellows and oranges) become visible — that's why leaves change color.</p>
    `
  },
  {
    title: "Where it happens — the chloroplast",
    body: `
      <p>Photosynthesis takes place inside <strong>chloroplasts</strong>, the green organelles found mostly in leaf cells.</p>
      <p>Each chloroplast has:</p>
      <ul>
        <li><strong>Thylakoids</strong> — flat, disc-shaped sacs stacked like coins. Stacks are called <em>grana</em>.</li>
        <li><strong>Stroma</strong> — the fluid that surrounds the thylakoid stacks.</li>
      </ul>
      <p>These two compartments split the work between them.</p>
    `
  },
  {
    title: "Two stages, two locations",
    body: `
      <p>Photosynthesis runs in two connected stages:</p>
      <ol>
        <li><strong>Light reactions</strong> — happen <em>inside the thylakoids</em>. Capture sunlight, split water, make ATP and NADPH (energy carriers).</li>
        <li><strong>Calvin cycle</strong> — happens <em>in the stroma</em>. Uses that ATP + NADPH to turn CO₂ into sugar.</li>
      </ol>
      <p>The light reactions feed the Calvin cycle. The cycle's output, glucose, is what the plant lives on.</p>
    `
  }
];

const PHOTO_LIGHT_REACTIONS = [
  {
    title: "Step 1 — Light hits chlorophyll",
    body: `
      <p>Sunlight pours through a leaf and into the chloroplasts. Inside each thylakoid membrane, <strong>chlorophyll molecules absorb photons</strong> — especially red and blue ones.</p>
      <p>That absorbed energy excites electrons in chlorophyll, kicking them up to a higher energy level. Those high-energy electrons are about to do a lot of work.</p>
    `
  },
  {
    title: "Step 2 — Water is split",
    body: `
      <p>Chlorophyll needs to replace the electrons it just lost. So an enzyme inside the thylakoid grabs a water molecule and splits it apart:</p>
      <p style="text-align:center; font-family:'JetBrains Mono', monospace;">
        2 H₂O → 4 H⁺ + 4 e⁻ + O₂
      </p>
      <p>This step is called <em>photolysis</em>. The electrons replace the ones lost from chlorophyll, the H⁺ ions stay inside the thylakoid, and the <strong>O₂</strong> diffuses out — eventually into the air you breathe.</p>
    `
  },
  {
    title: "Step 3 — Electrons travel the chain",
    body: `
      <p>The excited electrons hop down a series of proteins embedded in the thylakoid membrane called the <strong>electron transport chain</strong>.</p>
      <p>As they go, they release energy that pumps H⁺ ions across the membrane — building up a charge difference like water behind a dam.</p>
    `
  },
  {
    title: "Step 4 — ATP and NADPH are made",
    body: `
      <p>The pent-up H⁺ ions rush back out through a turbine-like enzyme called <strong>ATP synthase</strong>, which spins as they pass and uses that energy to build <strong>ATP</strong>.</p>
      <p>Meanwhile, the electrons reach the end of the chain and get loaded onto a carrier called <strong>NADP⁺</strong>, turning it into <strong>NADPH</strong>.</p>
      <p>ATP and NADPH then drift into the stroma — fuel for the Calvin cycle.</p>
    `
  }
];

const PHOTO_CALVIN_CYCLE = [
  {
    title: "Step 1 — CO₂ enters the stroma",
    body: `
      <p>Carbon dioxide from the air diffuses into the leaf through tiny pores called <em>stomata</em>, then into the chloroplast's <strong>stroma</strong>.</p>
      <p>This is where the Calvin cycle takes place — and unlike the light reactions, it doesn't directly need light. (It's sometimes called the "dark reactions," though it usually still runs during the day.)</p>
    `
  },
  {
    title: "Step 2 — Carbon fixation",
    body: `
      <p>An enzyme called <strong>RuBisCO</strong> grabs a CO₂ molecule and sticks it onto a 5-carbon sugar called <strong>RuBP</strong>.</p>
      <p>This is the most important reaction on Earth that you've probably never heard of — RuBisCO is thought to be the most abundant protein in the world.</p>
      <p>The new 6-carbon molecule is unstable and instantly splits into two 3-carbon molecules called <strong>3-PGA</strong>.</p>
    `
  },
  {
    title: "Step 3 — ATP and NADPH do the work",
    body: `
      <p>The ATP and NADPH made by the light reactions show up here. Their energy powers two reactions in a row:</p>
      <ul>
        <li>Phosphate groups from ATP are tacked on,</li>
        <li>NADPH adds electrons (and donates an H).</li>
      </ul>
      <p>Each 3-PGA gets turned into a slightly higher-energy molecule called <strong>G3P</strong> — the actual sugar the cycle is here to build.</p>
    `
  },
  {
    title: "Step 4 — Glucose, and the cycle restarts",
    body: `
      <p>For every 6 turns of the cycle, the chloroplast nets <strong>two G3P molecules</strong> as output. Combine two G3Ps and you have one <strong>glucose</strong> — the sugar that feeds the plant.</p>
      <p>Most of the other G3P molecules are recycled to rebuild <strong>RuBP</strong> (using more ATP), so the cycle can keep running.</p>
      <p>Net result: 6 CO₂ in, 1 glucose out, with sunlight, water, and a lot of biochemistry in between.</p>
    `
  }
];
