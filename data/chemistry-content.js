/* =========================================================
   chemistry-content.js — flashcards for Chemistry of Life

   Four card decks:
     CHEM_INTRO_CARDS       — elements of life (CHNOPS), bonds
     CHEM_WATER_CARDS       — polarity, H-bonds, 4 amazing props
     CHEM_BUILDING_CARDS    — dehydration synthesis vs hydrolysis,
                                monomers → polymers
     CHEM_MACRO_CARDS       — the 4 macromolecule families
                                (carbs, lipids, proteins, nucleic
                                acids) and what each one does
   ========================================================= */

const CHEM_INTRO_CARDS = [
  {
    title: "The elements of life — CHNOPS",
    body: `
      <p>About 96% of the mass of every living thing is just <strong>six elements</strong>:</p>
      <ul>
        <li><strong>C</strong>arbon — the backbone of every biological molecule</li>
        <li><strong>H</strong>ydrogen — the most abundant atom, in water and every macromolecule</li>
        <li><strong>N</strong>itrogen — in amino acids, DNA bases, chlorophyll</li>
        <li><strong>O</strong>xygen — in water, sugars, the air you breathe</li>
        <li><strong>P</strong>hosphorus — in DNA backbones, ATP, phospholipids</li>
        <li><strong>S</strong>ulfur — in two amino acids and many proteins</li>
      </ul>
      <p>Memorize <strong>CHNOPS</strong> — it'll show up everywhere.</p>
    `
  },
  {
    title: "Why carbon is special",
    body: `
      <p>Carbon has <strong>4 bonding sites</strong>, which lets it form long chains, branches, rings, and 3D networks. No other common element on Earth has anything close to that versatility.</p>
      <p>Every macromolecule — every protein, sugar, fat, and nucleic acid — is built on a <strong>carbon skeleton</strong>.</p>
      <p>The branch of chemistry that studies carbon-based molecules is called <em>organic chemistry</em> precisely because carbon is the foundation of life.</p>
    `
  },
  {
    title: "Three kinds of bonds",
    body: `
      <p>Atoms stick together in three main ways:</p>
      <ul>
        <li><strong>Covalent bond</strong> — two atoms <em>share</em> electrons. Strong. The bonds inside molecules (like C–H in glucose) are covalent.</li>
        <li><strong>Ionic bond</strong> — one atom <em>donates</em> an electron to another, and the resulting + and − ions attract. Salt (Na⁺Cl⁻) is held together this way.</li>
        <li><strong>Hydrogen bond</strong> — a weak attraction between a slightly + hydrogen and a slightly − atom on a different molecule. Individually weak, but they add up — they hold DNA's two strands together and give water its strange properties.</li>
      </ul>
    `
  },
  {
    title: "Polar vs nonpolar molecules",
    body: `
      <p>When two atoms in a covalent bond don't share electrons equally, the bond is <strong>polar</strong> — one end is slightly negative, the other slightly positive.</p>
      <p>Water (H₂O) is the most famous polar molecule: oxygen hogs the electrons, so the O end is δ⁻ and the H ends are δ⁺.</p>
      <p>This matters because <strong>polar dissolves polar, nonpolar dissolves nonpolar</strong>. That's why oil and water don't mix — and why your cells use a fatty (nonpolar) membrane to keep the watery inside separate from the watery outside.</p>
    `
  }
];

const CHEM_WATER_CARDS = [
  {
    title: "Water is weird — and life depends on it",
    body: `
      <p>You wouldn't expect a tiny 3-atom molecule to be the most important substance in biology — but water's <strong>polarity</strong> and <strong>hydrogen bonding</strong> give it superpowers no other liquid has.</p>
      <p>Almost every cellular reaction happens in water. Cells are 70%+ water by mass. Take it away and life as we know it shuts down within hours.</p>
    `
  },
  {
    title: "Hydrogen bonds — water's secret",
    body: `
      <p>Because water is polar, the δ⁻ oxygen of one water molecule is attracted to the δ⁺ hydrogen of another. That's a <strong>hydrogen bond</strong>.</p>
      <p>Each water molecule can hydrogen-bond with up to <strong>4 neighbors</strong>. These bonds are constantly forming and breaking — but at any moment, most water molecules are stuck to several others.</p>
      <p>This sticky network is the source of every one of water's special properties.</p>
    `
  },
  {
    title: "Cohesion + adhesion = water that climbs",
    body: `
      <p><strong>Cohesion</strong> — water molecules stick to <em>each other</em> (via H-bonds). That's why water forms drops and why surface tension can support water striders.</p>
      <p><strong>Adhesion</strong> — water sticks to <em>other</em> polar surfaces. That's why water creeps up a thin tube against gravity (<em>capillary action</em>).</p>
      <p>Combined, cohesion + adhesion let trees pull water up 100 meters from roots to leaves through their xylem — no pump required, just water gripping itself and the tube walls.</p>
    `
  },
  {
    title: "High heat capacity — Earth's thermostat",
    body: `
      <p>It takes <em>a lot</em> of energy to raise water's temperature, because so much heat goes into breaking H-bonds before molecules can actually speed up.</p>
      <p>That's why <strong>oceans buffer climate</strong> — coastal cities have milder winters and cooler summers than inland ones. It's also why sweat cools you down: evaporating water carries away enormous amounts of heat.</p>
      <p>Without water's high heat capacity, Earth's temperature would swing wildly between day and night, and life would have a much harder time existing.</p>
    `
  },
  {
    title: "Ice floats — and that's a miracle",
    body: `
      <p>Almost every substance gets denser when it freezes. Water is the major exception.</p>
      <p>When water cools below 4°C, its molecules lock into a crystalline lattice that's actually <em>less dense</em> than liquid water — so ice floats.</p>
      <p>This is why lakes freeze top-down instead of bottom-up. The ice layer insulates the water below, letting fish and other organisms survive the winter. If ice sank, lakes would freeze solid and aquatic life would be wiped out every winter.</p>
    `
  }
];

const CHEM_BUILDING_CARDS = [
  {
    title: "Monomers and polymers",
    body: `
      <p>Most large biological molecules are <strong>polymers</strong> — long chains of repeating subunits called <strong>monomers</strong>.</p>
      <ul>
        <li>Carbohydrates: monosaccharide monomers → polysaccharide polymers</li>
        <li>Proteins: amino acid monomers → polypeptide polymers</li>
        <li>Nucleic acids: nucleotide monomers → DNA/RNA polymers</li>
      </ul>
      <p>(Lipids are the oddball — they're not technically polymers, but they're built from smaller pieces the same way.)</p>
    `
  },
  {
    title: "Dehydration synthesis — building polymers",
    body: `
      <p>How do cells link a new monomer onto a growing chain? They <em>remove a water molecule</em>:</p>
      <p style="font-family:'JetBrains Mono', monospace; text-align:center; padding:0.4rem 0;">
        monomer — OH + H — monomer → monomer — monomer + H₂O
      </p>
      <p>This is called <strong>dehydration synthesis</strong> (or "condensation"). Every bond you make releases one water molecule.</p>
      <p>The bond's specific name depends on the macromolecule — glycosidic for carbs, peptide for proteins, phosphodiester for nucleic acids, ester for lipids. Same idea, different chemistry.</p>
    `
  },
  {
    title: "Hydrolysis — breaking polymers down",
    body: `
      <p>The opposite process: <strong>hydrolysis</strong> (literally "water-splitting") breaks a polymer back into monomers by <em>adding</em> a water molecule across each bond.</p>
      <p style="font-family:'JetBrains Mono', monospace; text-align:center; padding:0.4rem 0;">
        monomer — monomer + H₂O → monomer — OH + H — monomer
      </p>
      <p>This is what your digestive system does to every meal — it hydrolyzes the carbs, proteins, and fats in your food back into monomers your body can absorb and reuse.</p>
    `
  },
  {
    title: "Why this matters",
    body: `
      <p>Once you understand dehydration synthesis and hydrolysis, you understand the chemical engine of every cell.</p>
      <p>Building tissue? Dehydration synthesis. Digesting food? Hydrolysis. Replicating DNA? Dehydration synthesis. Breaking down old proteins for recycling? Hydrolysis.</p>
      <p>The same simple ± H₂O trick runs the entire biochemical world.</p>
    `
  }
];

const CHEM_MACRO_CARDS = [
  {
    title: "Carbohydrates — quick energy",
    body: `
      <p>Made of <strong>C, H, and O</strong>, usually in a 1:2:1 ratio (formula <code>(CH₂O)ₙ</code>).</p>
      <ul>
        <li><strong>Monosaccharides</strong> — single sugars (glucose, fructose, galactose)</li>
        <li><strong>Disaccharides</strong> — two linked (sucrose = glucose + fructose)</li>
        <li><strong>Polysaccharides</strong> — long chains (starch, glycogen, cellulose, chitin)</li>
      </ul>
      <p>Main jobs: <strong>quick energy</strong> (glucose), <strong>energy storage</strong> (starch in plants, glycogen in animals), and <strong>structure</strong> (cellulose in plant cell walls, chitin in insect exoskeletons).</p>
    `
  },
  {
    title: "Lipids — long-term storage + membranes",
    body: `
      <p>Mostly <strong>C and H</strong>, with a few O. Defined by being <em>nonpolar and water-insoluble</em>.</p>
      <ul>
        <li><strong>Triglycerides</strong> (fats and oils) — glycerol + 3 fatty acid tails. Long-term energy storage.</li>
        <li><strong>Phospholipids</strong> — like triglycerides but with one tail replaced by a polar phosphate group. They self-assemble into the cell membrane bilayer.</li>
        <li><strong>Steroids</strong> — 4 fused rings. Includes cholesterol and all the sex hormones (testosterone, estrogen).</li>
      </ul>
      <p>Fatty acid tails can be <em>saturated</em> (no double bonds, straight, solid at room temp = butter) or <em>unsaturated</em> (one or more double bonds, kinked, liquid = olive oil).</p>
    `
  },
  {
    title: "Proteins — the workhorses",
    body: `
      <p>Made of <strong>C, H, O, N</strong> (and sometimes S). Built from <strong>20 different amino acid</strong> monomers linked by peptide bonds.</p>
      <p>Proteins do nearly everything in the cell:</p>
      <ul>
        <li><strong>Enzymes</strong> catalyze reactions (amylase, DNA polymerase, ATP synthase)</li>
        <li><strong>Structure</strong> (collagen, keratin, actin)</li>
        <li><strong>Transport</strong> (hemoglobin carries O₂)</li>
        <li><strong>Defense</strong> (antibodies)</li>
        <li><strong>Signaling</strong> (insulin, growth hormone)</li>
      </ul>
      <p>A protein's shape (determined by its R-group sequence) is what gives it its function. Misfold a protein and it can stop working — or cause disease (prions, Alzheimer's, sickle-cell).</p>
    `
  },
  {
    title: "Nucleic acids — the information",
    body: `
      <p>Made of <strong>C, H, O, N, P</strong>. Built from <strong>nucleotide</strong> monomers (sugar + phosphate + nitrogenous base).</p>
      <ul>
        <li><strong>DNA</strong> — the cell's archive. Stores the instructions to build every protein, passed unchanged to each daughter cell.</li>
        <li><strong>RNA</strong> — DNA's working copy. mRNA carries instructions to ribosomes, tRNA brings amino acids, rRNA forms ribosomes themselves.</li>
        <li><strong>ATP</strong> — a single nucleotide that's the cell's main energy currency. Cells consume and regenerate body-weight quantities of it every day.</li>
      </ul>
      <p>The fact that DNA's information system is universal across all life — bacterium, plant, jellyfish, human — is some of the strongest evidence for common ancestry.</p>
    `
  }
];
