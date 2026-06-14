/* =========================================================
   photosynthesis-content.js — flashcards for the Photosynthesis module

   Three card decks:
     PHOTO_INTRO_CARDS         — the big picture
     PHOTO_LIGHT_REACTIONS     — 4-step walkthrough (in the thylakoids)
     PHOTO_CALVIN_CYCLE        — 4-step walkthrough (in the stroma)

   Each card has body: { middle, high }.
   ========================================================= */

const PHOTO_INTRO_CARDS = [
  {
    title: "What is photosynthesis?",
    body: {
      middle: `
        <p>Photosynthesis is how plants <strong>make their own food</strong> using sunlight.</p>
        <p>A plant takes in carbon dioxide from the air and water from the ground, captures sunlight, and turns those ingredients into <strong>sugar</strong>. Oxygen comes out as a bonus — the same oxygen you and every animal needs to breathe.</p>
        <p>Almost every food chain on Earth starts here. When you eat a salad, a steak, or a cookie, the energy in it traces back to a plant capturing sunlight.</p>
      `,
      high: `
        <p>Photosynthesis is how plants (and algae, and some bacteria) <strong>turn sunlight into food</strong>.</p>
        <p>They take in carbon dioxide and water, capture the energy in sunlight, and use it to build sugar — releasing oxygen as a free side effect that the rest of us breathe.</p>
        <p>Almost every food chain on Earth starts here.</p>
      `
    }
  },
  {
    title: "The big equation",
    body: {
      middle: `
        <p>The whole process is just one big chemical reaction:</p>
        <p style="text-align:center; padding:0.4rem 0;"><strong>carbon dioxide + water + sunlight → sugar + oxygen</strong></p>
        <p>That's it. The plant pulls those tiny ingredients out of the air and ground, sunlight provides the energy, and out comes a sugar molecule (and oxygen for the air).</p>
        <p>It looks simple on paper, but inside the plant it takes dozens of careful steps.</p>
      `,
      high: `
        <p>The whole process boils down to one chemical equation:</p>
        <p style="text-align:center; font-family:'JetBrains Mono', monospace; font-size:1rem; padding:0.4rem 0;">
          6 CO₂ + 6 H₂O + light → C₆H₁₂O₆ + 6 O₂
        </p>
        <p>Inputs: carbon dioxide, water, sunlight. Outputs: glucose (a sugar) and oxygen.</p>
        <p>It looks simple — but getting there takes <em>dozens</em> of carefully orchestrated chemical steps.</p>
      `
    }
  },
  {
    title: "Why are plants green?",
    body: {
      middle: `
        <p>Plants are green because they're full of a special green coloring called <strong>chlorophyll</strong>.</p>
        <p>Here's the surprise: chlorophyll soaks up <em>red</em> and <em>blue</em> light to use as energy, but it bounces the <em>green</em> light away. So when you look at a leaf, the green you see is the leaf's leftover light — the part it didn't use.</p>
        <p>In the fall, chlorophyll fades and other colors hiding in the leaf (yellows, oranges, reds) finally show through. That's autumn leaves.</p>
      `,
      high: `
        <p>Plants are packed with a green pigment called <strong>chlorophyll</strong> that lives inside chloroplasts.</p>
        <p>Chlorophyll mostly absorbs <em>red</em> and <em>blue</em> wavelengths of light — and <em>reflects</em> the green ones. So the green light you see is actually the light a plant <em>didn't</em> use.</p>
        <p>In autumn, chlorophyll breaks down and other pigments (yellows and oranges) become visible — that's why leaves change color.</p>
      `
    }
  },
  {
    title: "Where it happens — the chloroplast",
    body: {
      middle: `
        <p>Photosynthesis happens inside tiny green parts of plant cells called <strong>chloroplasts</strong>. A single leaf cell can have dozens of them.</p>
        <p>Inside each chloroplast are stacks of flat, disk-shaped pouches called <strong>thylakoids</strong> — they look like piles of coins. The space around the stacks is a watery fluid called the <strong>stroma</strong>.</p>
        <p>Different steps of photosynthesis happen in these two spots — one on the stacks, one in the fluid.</p>
      `,
      high: `
        <p>Photosynthesis takes place inside <strong>chloroplasts</strong>, the green organelles found mostly in leaf cells.</p>
        <p>Each chloroplast has:</p>
        <ul>
          <li><strong>Thylakoids</strong> — flat, disc-shaped sacs stacked like coins. Stacks are called <em>grana</em>.</li>
          <li><strong>Stroma</strong> — the fluid that surrounds the thylakoid stacks.</li>
        </ul>
        <p>These two compartments split the work between them.</p>
      `
    }
  },
  {
    title: "Two stages, two locations",
    body: {
      middle: `
        <p>Photosynthesis runs in <strong>two connected stages</strong>:</p>
        <ol>
          <li><strong>Light reactions</strong> — happen on the thylakoid stacks. Their job is to <em>catch sunlight</em> and store its energy in handy carrier molecules.</li>
          <li><strong>Calvin cycle</strong> — happens in the watery stroma. It uses those energy carriers to <em>build sugar</em> from carbon dioxide.</li>
        </ol>
        <p>Think of stage 1 as charging the battery, and stage 2 as using the battery to build the sugar.</p>
      `,
      high: `
        <p>Photosynthesis runs in two connected stages:</p>
        <ol>
          <li><strong>Light reactions</strong> — happen <em>inside the thylakoids</em>. Capture sunlight, split water, make ATP and NADPH (energy carriers).</li>
          <li><strong>Calvin cycle</strong> — happens <em>in the stroma</em>. Uses that ATP + NADPH to turn CO₂ into sugar.</li>
        </ol>
        <p>The light reactions feed the Calvin cycle. The cycle's output, glucose, is what the plant lives on.</p>
      `
    }
  }
];

const PHOTO_LIGHT_REACTIONS = [
  {
    title: "Step 1 — Light hits chlorophyll",
    body: {
      middle: `
        <p>Sunlight pours through the leaf. Inside the thylakoid stacks, <strong>chlorophyll molecules grab the light</strong> — they especially like red and blue rays.</p>
        <p>That captured light energy gets transferred to electrons in the chlorophyll, kicking them up to a higher energy level. These energetic electrons are about to drive everything that follows.</p>
      `,
      high: `
        <p>Sunlight pours through a leaf and into the chloroplasts. Inside each thylakoid membrane, <strong>chlorophyll molecules absorb photons</strong> — especially red and blue ones.</p>
        <p>That absorbed energy excites electrons in chlorophyll, kicking them up to a higher energy level. Those high-energy electrons are about to do a lot of work.</p>
      `
    }
  },
  {
    title: "Step 2 — Water is split",
    body: {
      middle: `
        <p>The chlorophyll just lost some electrons, so it needs to replace them. The plant solves this by taking a <strong>water molecule and splitting it apart</strong>.</p>
        <p>The water's electrons fill the gap in chlorophyll. The leftover oxygen atoms join up and float out as <strong>O₂ gas</strong> — that's the oxygen you breathe!</p>
        <p>Every breath you take comes from this exact step happening in plants somewhere on Earth.</p>
      `,
      high: `
        <p>Chlorophyll needs to replace the electrons it just lost. So an enzyme inside the thylakoid grabs a water molecule and splits it apart:</p>
        <p style="text-align:center; font-family:'JetBrains Mono', monospace;">
          2 H₂O → 4 H⁺ + 4 e⁻ + O₂
        </p>
        <p>This step is called <em>photolysis</em>. The electrons replace the ones lost from chlorophyll, the H⁺ ions stay inside the thylakoid, and the <strong>O₂</strong> diffuses out — eventually into the air you breathe.</p>
      `
    }
  },
  {
    title: "Step 3 — Electrons travel the chain",
    body: {
      middle: `
        <p>The energetic electrons hop along a <strong>chain of proteins</strong> stuck in the thylakoid membrane — like jumping from one stepping stone to the next.</p>
        <p>Each jump releases a little energy, and the plant uses that energy to <em>push hydrogen ions</em> into the inside of the thylakoid. Hydrogen builds up there, ready to power the next step.</p>
      `,
      high: `
        <p>The excited electrons hop down a series of proteins embedded in the thylakoid membrane called the <strong>electron transport chain</strong>.</p>
        <p>As they go, they release energy that pumps H⁺ ions across the membrane — building up a charge difference like water behind a dam.</p>
      `
    }
  },
  {
    title: "Step 4 — Energy is captured",
    body: {
      middle: `
        <p>All those built-up hydrogen ions are like water piled up behind a dam. When the dam opens, they rush out through a turbine-shaped protein called <strong>ATP synthase</strong>. The flow makes the turbine spin, and that spinning makes <strong>ATP</strong> — a tiny rechargeable battery.</p>
        <p>At the same time, the spent electrons get packaged into another energy carrier called <strong>NADPH</strong>.</p>
        <p>Both ATP and NADPH then drift over to the Calvin cycle — where they'll be used to build sugar.</p>
      `,
      high: `
        <p>The pent-up H⁺ ions rush back out through a turbine-like enzyme called <strong>ATP synthase</strong>, which spins as they pass and uses that energy to build <strong>ATP</strong>.</p>
        <p>Meanwhile, the electrons reach the end of the chain and get loaded onto a carrier called <strong>NADP⁺</strong>, turning it into <strong>NADPH</strong>.</p>
        <p>ATP and NADPH then drift into the stroma — fuel for the Calvin cycle.</p>
      `
    }
  }
];

const PHOTO_CALVIN_CYCLE = [
  {
    title: "Step 1 — CO₂ comes in",
    body: {
      middle: `
        <p>Carbon dioxide from the air comes into the leaf through tiny pores on the underside, called <strong>stomata</strong>. From there it floats into the watery stroma of the chloroplast.</p>
        <p>This is where the Calvin cycle takes place. Unlike the first stage, this one doesn't directly need sunlight — but it does use the ATP and NADPH that the light reactions just made.</p>
      `,
      high: `
        <p>Carbon dioxide from the air diffuses into the leaf through tiny pores called <em>stomata</em>, then into the chloroplast's <strong>stroma</strong>.</p>
        <p>This is where the Calvin cycle takes place — and unlike the light reactions, it doesn't directly need light. (It's sometimes called the "dark reactions," though it usually still runs during the day.)</p>
      `
    }
  },
  {
    title: "Step 2 — Capturing the carbon",
    body: {
      middle: `
        <p>An enzyme with a cool name — <strong>RuBisCO</strong> — grabs a CO₂ molecule and snaps it onto a sugar-like helper molecule.</p>
        <p>Fun fact: RuBisCO is thought to be the <strong>most common protein on Earth</strong>. Every leaf in the world is full of it, doing this exact step millions of times per second.</p>
      `,
      high: `
        <p>An enzyme called <strong>RuBisCO</strong> grabs a CO₂ molecule and sticks it onto a 5-carbon sugar called <strong>RuBP</strong>.</p>
        <p>This is the most important reaction on Earth that you've probably never heard of — RuBisCO is thought to be the most abundant protein in the world.</p>
        <p>The new 6-carbon molecule is unstable and instantly splits into two 3-carbon molecules called <strong>3-PGA</strong>.</p>
      `
    }
  },
  {
    title: "Step 3 — ATP and NADPH do the work",
    body: {
      middle: `
        <p>Remember the ATP (batteries) and NADPH (electron carriers) made by the light reactions? Time to spend them.</p>
        <p>The ATP and NADPH transfer their stored energy onto the captured carbon, slowly building it up into a small sugar.</p>
      `,
      high: `
        <p>The ATP and NADPH made by the light reactions show up here. Their energy powers two reactions in a row:</p>
        <ul>
          <li>Phosphate groups from ATP are tacked on,</li>
          <li>NADPH adds electrons (and donates an H).</li>
        </ul>
        <p>Each 3-PGA gets turned into a slightly higher-energy molecule called <strong>G3P</strong> — the actual sugar the cycle is here to build.</p>
      `
    }
  },
  {
    title: "Step 4 — Out comes glucose",
    body: {
      middle: `
        <p>After running through the cycle several times, the chloroplast finally has enough small sugars to combine into one molecule of <strong>glucose</strong> — the sugar that feeds the plant.</p>
        <p>Most of the small sugars get recycled to keep the cycle running. But a steady trickle gets sent off to feed the rest of the plant — to make leaves, roots, fruit, and seeds.</p>
        <p>Total recipe: carbon dioxide + water + sunlight → sugar + oxygen. Done.</p>
      `,
      high: `
        <p>For every 6 turns of the cycle, the chloroplast nets <strong>two G3P molecules</strong> as output. Combine two G3Ps and you have one <strong>glucose</strong> — the sugar that feeds the plant.</p>
        <p>Most of the other G3P molecules are recycled to rebuild <strong>RuBP</strong> (using more ATP), so the cycle can keep running.</p>
        <p>Net result: 6 CO₂ in, 1 glucose out, with sunlight, water, and a lot of biochemistry in between.</p>
      `
    }
  }
];
