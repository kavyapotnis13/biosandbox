/* =========================================================
   chemistry-content.js — flashcards for Chemistry of Life

   Each card has a `body: { middle, high }`. The renderer
   picks the right version based on the user's audience track.

   Five card decks:
     CHEM_INTRO_CARDS       — elements of life (CHNOPS), bonds
     CHEM_WATER_CARDS       — polarity, H-bonds, 4 amazing props
     CHEM_BUILDING_CARDS    — dehydration synthesis vs hydrolysis,
                                monomers → polymers
     CHEM_FUNCTIONAL_CARDS  — the 7 functional groups + isomers
                                (structural + cis/trans + enantiomers)
     CHEM_MACRO_CARDS       — the 4 macromolecule families with
                                per-family "deep chemistry" cards
                                covering the specific bond, isomers,
                                and structure of each
   ========================================================= */

const CHEM_INTRO_CARDS = [
  {
    title: "The elements of life — CHNOPS",
    body: {
      middle: `
        <p>If you weighed every living thing on Earth, almost all of it would be just <strong>six elements</strong>:</p>
        <ul>
          <li><strong>C</strong>arbon — the building block of every part of you</li>
          <li><strong>H</strong>ydrogen — found in water and almost every molecule in your body</li>
          <li><strong>N</strong>itrogen — in your muscles and your DNA</li>
          <li><strong>O</strong>xygen — in water, in sugar, in the air you breathe</li>
          <li><strong>P</strong>hosphorus — in your bones and DNA</li>
          <li><strong>S</strong>ulfur — in two of the parts that make up proteins</li>
        </ul>
        <p>The shortcut to remember them is <strong>CHNOPS</strong>. You'll see these six everywhere in biology.</p>
      `,
      high: `
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
    }
  },
  {
    title: "Why carbon is special",
    body: {
      middle: `
        <p>Carbon is the LEGO brick of biology.</p>
        <p>It can connect to up to <strong>four other atoms at once</strong>, so it can build long chains, branches, rings, and complicated 3D shapes. No other common element is that flexible.</p>
        <p>Every part of you — your muscles, your bones, your DNA, your food — is built on a frame of carbon atoms linked together.</p>
      `,
      high: `
        <p>Carbon has <strong>4 bonding sites</strong>, which lets it form long chains, branches, rings, and 3D networks. No other common element on Earth has anything close to that versatility.</p>
        <p>Every macromolecule — every protein, sugar, fat, and nucleic acid — is built on a <strong>carbon skeleton</strong>.</p>
        <p>The branch of chemistry that studies carbon-based molecules is called <em>organic chemistry</em> precisely because carbon is the foundation of life.</p>
      `
    }
  },
  {
    title: "Three kinds of bonds",
    body: {
      middle: `
        <p>Atoms stick to each other in three main ways:</p>
        <ul>
          <li><strong>Covalent bond</strong> — two atoms <em>share</em> their electrons. Strong, like clasping hands.</li>
          <li><strong>Ionic bond</strong> — one atom <em>gives</em> an electron to another. The two become a + and a − and stick together. Table salt works this way.</li>
          <li><strong>Hydrogen bond</strong> — a weak tug between a slightly + hydrogen on one molecule and a slightly − atom on another. Each one is weak, but lots of them together are strong enough to hold DNA's two strands together.</li>
        </ul>
      `,
      high: `
        <p>Atoms stick together in three main ways:</p>
        <ul>
          <li><strong>Covalent bond</strong> — two atoms <em>share</em> electrons. Strong. The bonds inside molecules (like C–H in glucose) are covalent.</li>
          <li><strong>Ionic bond</strong> — one atom <em>donates</em> an electron to another, and the resulting + and − ions attract. Salt (Na⁺Cl⁻) is held together this way.</li>
          <li><strong>Hydrogen bond</strong> — a weak attraction between a slightly + hydrogen and a slightly − atom on a different molecule. Individually weak, but they add up — they hold DNA's two strands together and give water its strange properties.</li>
        </ul>
      `
    }
  },
  {
    title: "Polar vs nonpolar molecules",
    body: {
      middle: `
        <p>When two atoms share electrons, sometimes they share them <em>unfairly</em>. The atom that hogs the electrons becomes slightly negative, and the other end becomes slightly positive. We call that kind of molecule <strong>polar</strong>.</p>
        <p>Water is the classic example: the oxygen end is slightly negative, the hydrogen ends are slightly positive.</p>
        <p>Why care? Because <strong>polar mixes with polar, and nonpolar mixes with nonpolar</strong>. That's why oil floats on water and won't mix — oil is nonpolar, water is polar. Your cells use this trick to make a fatty (nonpolar) skin around themselves that keeps the watery inside separate from the watery outside.</p>
      `,
      high: `
        <p>When two atoms in a covalent bond don't share electrons equally, the bond is <strong>polar</strong> — one end is slightly negative, the other slightly positive.</p>
        <p>Water (H₂O) is the most famous polar molecule: oxygen hogs the electrons, so the O end is δ⁻ and the H ends are δ⁺.</p>
        <p>This matters because <strong>polar dissolves polar, nonpolar dissolves nonpolar</strong>. That's why oil and water don't mix — and why your cells use a fatty (nonpolar) membrane to keep the watery inside separate from the watery outside.</p>
      `
    }
  }
];

const CHEM_WATER_CARDS = [
  {
    title: "Water is weird — and life depends on it",
    body: {
      middle: `
        <p>Water seems boring — three atoms, no color, no taste. But it's actually the strangest liquid we know, and life literally cannot exist without it.</p>
        <p>Almost every chemical reaction inside you happens in water. Your cells are about 70% water. If you lost just a few days' worth, you'd be in serious trouble.</p>
      `,
      high: `
        <p>You wouldn't expect a tiny 3-atom molecule to be the most important substance in biology — but water's <strong>polarity</strong> and <strong>hydrogen bonding</strong> give it superpowers no other liquid has.</p>
        <p>Almost every cellular reaction happens in water. Cells are 70%+ water by mass. Take it away and life as we know it shuts down within hours.</p>
      `
    }
  },
  {
    title: "Hydrogen bonds — water's secret",
    body: {
      middle: `
        <p>Because water is polar, the slightly negative oxygen of one water molecule gets pulled toward the slightly positive hydrogen of a different water molecule. That weak pull is called a <strong>hydrogen bond</strong>.</p>
        <p>Each water molecule can grab onto <strong>up to 4 neighbors</strong> this way. The bonds are weak and constantly breaking, but at any moment most of the water is in this sticky, wobbly net.</p>
        <p>That sticky net is the secret behind every special thing water does.</p>
      `,
      high: `
        <p>Because water is polar, the δ⁻ oxygen of one water molecule is attracted to the δ⁺ hydrogen of another. That's a <strong>hydrogen bond</strong>.</p>
        <p>Each water molecule can hydrogen-bond with up to <strong>4 neighbors</strong>. These bonds are constantly forming and breaking — but at any moment, most water molecules are stuck to several others.</p>
        <p>This sticky network is the source of every one of water's special properties.</p>
      `
    }
  },
  {
    title: "Cohesion + adhesion = water that climbs",
    body: {
      middle: `
        <p><strong>Cohesion</strong> means water sticks to <em>itself</em>. That's why rain forms droplets instead of a flat sheet, and why a water-strider bug can walk on a pond without sinking.</p>
        <p><strong>Adhesion</strong> means water sticks to <em>other things</em>, like glass or plant tissue.</p>
        <p>Combine the two and water can actually climb upward! That's how a 100-meter redwood pulls water up from its roots all the way to its top leaves — the water grips itself and the inside of the tree's tubes, and gets pulled up like a chain.</p>
      `,
      high: `
        <p><strong>Cohesion</strong> — water molecules stick to <em>each other</em> (via H-bonds). That's why water forms drops and why surface tension can support water striders.</p>
        <p><strong>Adhesion</strong> — water sticks to <em>other</em> polar surfaces. That's why water creeps up a thin tube against gravity (<em>capillary action</em>).</p>
        <p>Combined, cohesion + adhesion let trees pull water up 100 meters from roots to leaves through their xylem — no pump required, just water gripping itself and the tube walls.</p>
      `
    }
  },
  {
    title: "Water absorbs lots of heat",
    body: {
      middle: `
        <p>Water takes a LOT of energy to heat up. That's because most of the heat goes into breaking those sticky hydrogen bonds before the molecules can actually speed up.</p>
        <p>That's why <strong>the ocean keeps the climate steady</strong>. Cities near the ocean don't get as cold in winter or as hot in summer as places far inland. It's also why sweating cools you down — when sweat evaporates off your skin, it takes a huge amount of heat with it.</p>
      `,
      high: `
        <p>It takes <em>a lot</em> of energy to raise water's temperature, because so much heat goes into breaking H-bonds before molecules can actually speed up.</p>
        <p>That's why <strong>oceans buffer climate</strong> — coastal cities have milder winters and cooler summers than inland ones. It's also why sweat cools you down: evaporating water carries away enormous amounts of heat.</p>
        <p>Without water's high heat capacity, Earth's temperature would swing wildly between day and night, and life would have a much harder time existing.</p>
      `
    }
  },
  {
    title: "Ice floats — and that's a miracle",
    body: {
      middle: `
        <p>Almost every other liquid in the world gets <em>denser</em> when it freezes — so the frozen version sinks. Water is one of the only exceptions.</p>
        <p>When water gets very cold, its molecules line up into a crystal pattern that has a little more empty space than liquid water. So ice is lighter than the water below it — and it floats.</p>
        <p>That's why ponds freeze from the top down instead of the bottom up. The ice on top acts like a blanket, keeping the fish and other water animals underneath alive through the winter. If ice sank, lakes would freeze solid every year and a lot of life would be wiped out.</p>
      `,
      high: `
        <p>Almost every substance gets denser when it freezes. Water is the major exception.</p>
        <p>When water cools below 4°C, its molecules lock into a crystalline lattice that's actually <em>less dense</em> than liquid water — so ice floats.</p>
        <p>This is why lakes freeze top-down instead of bottom-up. The ice layer insulates the water below, letting fish and other organisms survive the winter. If ice sank, lakes would freeze solid and aquatic life would be wiped out every winter.</p>
      `
    }
  }
];

const CHEM_BUILDING_CARDS = [
  {
    title: "Monomers and polymers",
    body: {
      middle: `
        <p>Most big biology molecules are like <strong>bead necklaces</strong>: lots of small pieces hooked together into one long chain.</p>
        <ul>
          <li>The small piece is called a <strong>monomer</strong> ("one part").</li>
          <li>The long chain is called a <strong>polymer</strong> ("many parts").</li>
        </ul>
        <p>For example: a single sugar is a monomer; a long chain of sugars (like starch) is a polymer. A single amino acid is a monomer; a long chain of amino acids (a protein) is a polymer.</p>
      `,
      high: `
        <p>Most large biological molecules are <strong>polymers</strong> — long chains of repeating subunits called <strong>monomers</strong>.</p>
        <ul>
          <li>Carbohydrates: monosaccharide monomers → polysaccharide polymers</li>
          <li>Proteins: amino acid monomers → polypeptide polymers</li>
          <li>Nucleic acids: nucleotide monomers → DNA/RNA polymers</li>
        </ul>
        <p>(Lipids are the oddball — they're not technically polymers, but they're built from smaller pieces the same way.)</p>
      `
    }
  },
  {
    title: "Dehydration synthesis — building polymers",
    body: {
      middle: `
        <p>How does a cell snap a new bead onto the necklace? It <em>removes a tiny drop of water</em> at the spot where the two beads connect.</p>
        <p>That's it. Every time the cell adds a new bead, one water molecule (H₂O) pops out.</p>
        <p>The name for this is <strong>dehydration synthesis</strong> — "dehydration" because water leaves, "synthesis" because something new is built. Sounds fancy, but it's just: add a bead, lose a water drop, repeat.</p>
      `,
      high: `
        <p>How do cells link a new monomer onto a growing chain? They <em>remove a water molecule</em>:</p>
        <p style="font-family:'JetBrains Mono', monospace; text-align:center; padding:0.4rem 0;">
          monomer — OH + H — monomer → monomer — monomer + H₂O
        </p>
        <p>This is called <strong>dehydration synthesis</strong> (or "condensation"). Every bond you make releases one water molecule.</p>
        <p>The bond's specific name depends on the macromolecule — glycosidic for carbs, peptide for proteins, phosphodiester for nucleic acids, ester for lipids. Same idea, different chemistry.</p>
      `
    }
  },
  {
    title: "Hydrolysis — breaking polymers down",
    body: {
      middle: `
        <p>The reverse process is called <strong>hydrolysis</strong> — literally "water-splitting."</p>
        <p>To break a bead off the chain, the cell <em>adds</em> a drop of water back to that connection point. The chain splits and the bead comes free.</p>
        <p>This is what your stomach and intestines do to every meal. They use water to break the big food molecules (proteins, starches, fats) back into the small monomers your body can actually use.</p>
      `,
      high: `
        <p>The opposite process: <strong>hydrolysis</strong> (literally "water-splitting") breaks a polymer back into monomers by <em>adding</em> a water molecule across each bond.</p>
        <p style="font-family:'JetBrains Mono', monospace; text-align:center; padding:0.4rem 0;">
          monomer — monomer + H₂O → monomer — OH + H — monomer
        </p>
        <p>This is what your digestive system does to every meal — it hydrolyzes the carbs, proteins, and fats in your food back into monomers your body can absorb and reuse.</p>
      `
    }
  },
  {
    title: "Why this matters",
    body: {
      middle: `
        <p>Once you've got dehydration synthesis and hydrolysis, you've got the basic toolkit your cells use to build and break almost everything.</p>
        <p>Growing taller? Cells are using dehydration synthesis to add to your bones and muscles. Digesting your lunch? Hydrolysis. Healing a cut? Dehydration synthesis. Replacing old cells? Both, working together.</p>
        <p>Same simple "add water" / "remove water" trick, running every part of your body every second.</p>
      `,
      high: `
        <p>Once you understand dehydration synthesis and hydrolysis, you understand the chemical engine of every cell.</p>
        <p>Building tissue? Dehydration synthesis. Digesting food? Hydrolysis. Replicating DNA? Dehydration synthesis. Breaking down old proteins for recycling? Hydrolysis.</p>
        <p>The same simple ± H₂O trick runs the entire biochemical world.</p>
      `
    }
  }
];

const CHEM_FUNCTIONAL_CARDS = [
  {
    title: "Functional groups — the personality atoms",
    body: {
      middle: `
        <p>A carbon skeleton is the <em>frame</em> of a biological molecule. But the frame by itself is pretty boring — it doesn't react with much and it doesn't dissolve in anything.</p>
        <p>What gives a molecule its personality — whether it dissolves in water, whether it's an acid, what it reacts with — is the little clusters of atoms hanging off the frame. Those clusters are called <strong>functional groups</strong>.</p>
        <p>Same frame + different functional groups = totally different molecule. It's like the same car body with different engines bolted in.</p>
      `,
      high: `
        <p>A carbon skeleton by itself is chemically pretty inert. What makes a biomolecule <em>do</em> anything — dissolve, react, catalyze, signal — is the small clusters of atoms attached to the skeleton, called <strong>functional groups</strong>.</p>
        <p>Functional groups behave predictably: wherever you see a <code>—COOH</code>, expect the molecule to act like an acid. Wherever you see <code>—NH₂</code>, expect it to act like a base. That predictability is why memorizing 7 functional groups unlocks most of organic chemistry.</p>
      `
    }
  },
  {
    title: "The 7 functional groups to know",
    body: {
      middle: `
        <ul>
          <li><strong>Hydroxyl (—OH)</strong> — polar. Makes sugars and alcohols dissolve in water.</li>
          <li><strong>Carbonyl (C=O)</strong> — a carbon double-bonded to oxygen. Found in every sugar.</li>
          <li><strong>Carboxyl (—COOH)</strong> — acidic. Every amino acid and every fatty acid has one.</li>
          <li><strong>Amino (—NH₂)</strong> — basic (the opposite of acidic). Every amino acid has one of these too.</li>
          <li><strong>Sulfhydryl (—SH)</strong> — two of these can form a bridge that holds proteins in shape. It's what makes hair curly.</li>
          <li><strong>Phosphate (—OPO₃²⁻)</strong> — carries energy in ATP; also part of the DNA backbone.</li>
          <li><strong>Methyl (—CH₃)</strong> — nonpolar. Cells stick these onto DNA and proteins as chemical "tags" to switch genes on and off.</li>
        </ul>
      `,
      high: `
        <ul>
          <li><strong>Hydroxyl —OH</strong> — polar. Makes alcohols, sugars, and any molecule containing it more water-soluble.</li>
          <li><strong>Carbonyl C=O</strong> — polar. Distinguishes <em>aldehydes</em> (terminal C=O) from <em>ketones</em> (internal C=O); every monosaccharide has one.</li>
          <li><strong>Carboxyl —COOH</strong> — <em>acidic</em>. Donates H⁺ in water (→ —COO⁻). Defines fatty acids and one end of every amino acid.</li>
          <li><strong>Amino —NH₂</strong> — <em>basic</em>. Accepts H⁺ (→ —NH₃⁺). Defines the other end of every amino acid.</li>
          <li><strong>Sulfhydryl —SH</strong> — two —SH groups can form a covalent <em>disulfide bridge</em> (—S—S—). Locks tertiary protein structure; permanent waves work by rearranging them.</li>
          <li><strong>Phosphate —OPO₃²⁻</strong> — negatively charged. The energy in ATP lives in the bonds between its three phosphates. Also forms the backbone of DNA/RNA.</li>
          <li><strong>Methyl —CH₃</strong> — nonpolar. A common chemical "tag" — cells methylate DNA and histones to regulate which genes are expressed.</li>
        </ul>
      `
    }
  },
  {
    title: "Structural isomers — same atoms, different molecule",
    body: {
      middle: `
        <p>Two molecules can be built from the <em>exact same atoms</em> and still be completely different molecules — because those atoms are hooked together in different ways. Molecules like that are called <strong>isomers</strong>.</p>
        <p>Classic example: <strong>glucose</strong>, <strong>fructose</strong>, and <strong>galactose</strong> all have the formula <code>C₆H₁₂O₆</code>. Same atoms, same count. But they're shaped differently, so:</p>
        <ul>
          <li>Glucose is what your blood carries around for energy.</li>
          <li>Fructose is what makes fruit taste sweet.</li>
          <li>Galactose is part of the sugar in milk.</li>
        </ul>
        <p>Same ingredients, different molecules, different jobs. Structure matters more than formula.</p>
      `,
      high: `
        <p><strong>Isomers</strong> are molecules with the same molecular formula but different structures. <strong>Structural (constitutional) isomers</strong> differ in how the atoms are connected.</p>
        <p>Classic example — three sugars, all <code>C₆H₁₂O₆</code>:</p>
        <ul>
          <li><strong>Glucose</strong> — aldose (aldehyde on C1). Blood sugar; the fuel your cells burn.</li>
          <li><strong>Fructose</strong> — ketose (ketone on C2). Fruit sugar; sweeter on the tongue than glucose.</li>
          <li><strong>Galactose</strong> — differs from glucose only at C4. Half of lactose (milk sugar).</li>
        </ul>
        <p>Same atoms, different connectivity → different taste, different enzymes required to metabolize, different biological roles. This is why chemistry cares about <em>structure</em>, not just formula.</p>
      `
    }
  },
  {
    title: "Stereoisomers — same connections, different shape in space",
    body: {
      middle: `
        <p>Some isomers have the same atoms connected in the same order, but they're arranged differently <em>in 3D</em>. Two kinds matter in biology:</p>
        <p><strong>1. Cis vs trans</strong> — happens around a C=C double bond that can't rotate. The groups on the two carbons can stick out on the <em>same</em> side (<strong>cis</strong>, which puts a kink in the chain) or on <em>opposite</em> sides (<strong>trans</strong>, which keeps the chain straight).</p>
        <p>This is why natural vegetable oils (cis, kinked) are liquid, but "trans fats" (straightened out by industrial processing) pack into solids and are terrible for your arteries.</p>
        <p><strong>2. Enantiomers</strong> — mirror images of each other, like your left and right hands. They look identical but you can't stack one perfectly onto the other. Amino acids come in "L" and "D" versions, but nearly all life on Earth uses only <strong>L-amino acids</strong>. Nobody's totally sure why.</p>
      `,
      high: `
        <p><strong>Stereoisomers</strong> have the same connectivity but differ in spatial arrangement. Two types matter for biology:</p>
        <p><strong>1. Cis-trans (geometric) isomers</strong> — around a double bond that can't freely rotate. In fatty acids, natural unsaturated fats are <em>cis</em> (Hs on the same side → chain kinks → stays liquid). Industrial hydrogenation can produce <em>trans</em> configurations (Hs on opposite sides → chain stays straight → packs solid). Trans fats raise LDL and damage cardiovascular health — the FDA banned artificial trans fats from the U.S. food supply in 2018.</p>
        <p><strong>2. Enantiomers</strong> — non-superimposable mirror images (like left and right hands). Amino acids come in L and D forms; life on Earth uses almost exclusively <strong>L-amino acids</strong> and <strong>D-sugars</strong>. Enzymes are themselves chiral, so they recognize only one enantiomer — which is why the two versions of the same molecule can smell or taste different (carvone: one enantiomer smells like spearmint, the other like caraway).</p>
      `
    }
  },
  {
    title: "Why this matters for the macromolecules",
    body: {
      middle: `
        <p>Here's the payoff. When you learn the 4 macromolecules next, you'll notice that <strong>almost everything they do comes from their functional groups and their shape</strong>.</p>
        <ul>
          <li>Why does a sugar dissolve in water? Hydroxyls.</li>
          <li>Why does a fat float on it? No polar groups on the tail.</li>
          <li>Why can we digest starch but not cellulose? Same sugar, different bond geometry.</li>
          <li>Why do trans fats clog arteries but olive oil doesn't? Cis vs trans.</li>
          <li>Why does hair curl? Disulfide bridges from —SH groups.</li>
        </ul>
        <p>Same handful of atoms doing wildly different things — because of how they're arranged.</p>
      `,
      high: `
        <p>This is the point where organic chemistry stops feeling like memorization and starts feeling like a language.</p>
        <p>Every macromolecule you're about to see is a carbon skeleton decorated with the same short list of functional groups. Once you know what each group does, you can predict:</p>
        <ul>
          <li><strong>Solubility</strong> — count the polar groups (—OH, —COOH, —NH₂, phosphate). Lots of them = water-soluble.</li>
          <li><strong>Charge at physiological pH</strong> — carboxyls give up their H⁺ (→ —COO⁻), aminos grab one (→ —NH₃⁺).</li>
          <li><strong>Reactivity</strong> — where a new bond will form or an old one will break (dehydration synthesis always removes —OH + —H).</li>
          <li><strong>Recognition</strong> — enzymes bind specific shapes and specific groups.</li>
        </ul>
        <p>Learn the groups and the isomers, and every macromolecule that follows becomes readable.</p>
      `
    }
  }
];

const CHEM_MACRO_CARDS = [
  {
    title: "Carbohydrates — quick energy",
    body: {
      middle: `
        <p>Carbs are made of just <strong>carbon, hydrogen, and oxygen</strong>. Their job is mostly to give your cells <strong>energy fast</strong>.</p>
        <p>They come in three sizes:</p>
        <ul>
          <li><strong>Single sugars</strong> — like glucose (in fruit) and fructose (in honey).</li>
          <li><strong>Pairs of sugars</strong> — like sucrose, the kind on your kitchen table (one glucose + one fructose stuck together).</li>
          <li><strong>Long chains of sugars</strong> — like starch (in bread and potatoes), or cellulose (the tough stringy part of vegetables).</li>
        </ul>
        <p>Plants store extra energy as <strong>starch</strong>. Animals store it as <strong>glycogen</strong>, mostly in your liver and muscles.</p>
      `,
      high: `
        <p>Made of <strong>C, H, and O</strong>, usually in a 1:2:1 ratio (formula <code>(CH₂O)ₙ</code>).</p>
        <ul>
          <li><strong>Monosaccharides</strong> — single sugars (glucose, fructose, galactose)</li>
          <li><strong>Disaccharides</strong> — two linked (sucrose = glucose + fructose)</li>
          <li><strong>Polysaccharides</strong> — long chains (starch, glycogen, cellulose, chitin)</li>
        </ul>
        <p>Main jobs: <strong>quick energy</strong> (glucose), <strong>energy storage</strong> (starch in plants, glycogen in animals), and <strong>structure</strong> (cellulose in plant cell walls, chitin in insect exoskeletons).</p>
      `
    }
  },
  {
    title: "Carbs — the bond that makes fiber uneatable",
    body: {
      middle: `
        <p>Every time two sugars link up, the —OH from one meets the —H from the other and a <strong>glycosidic bond</strong> forms. Standard dehydration synthesis: one water released per bond.</p>
        <p>But here's a twist: glucose can link two different ways — with the connection pointing "down" (called <strong>α</strong>) or "up" (called <strong>β</strong>). Same atoms, tiny 3D flip, huge consequence:</p>
        <ul>
          <li><strong>α-glucose chains</strong> = <strong>starch</strong> (in bread and potatoes). You have enzymes that break these apart, so you can digest them.</li>
          <li><strong>β-glucose chains</strong> = <strong>cellulose</strong> (the tough fiber in vegetables and wood). Your body has NO enzyme that can cut a β-bond, so cellulose passes right through you — that's what "fiber" is.</li>
        </ul>
        <p>Cows and termites can digest cellulose only because they carry bacteria in their gut that supply the missing enzyme.</p>
      `,
      high: `
        <p>The bond between two monosaccharides is a <strong>glycosidic bond</strong>, formed by dehydration synthesis between two hydroxyls (one water out per bond). But its <em>geometry</em> comes in two flavors:</p>
        <ul>
          <li><strong>α-1,4 glycosidic bonds</strong> — the linkage points "down" from C1. Chains of α-glucose form <strong>starch</strong> (plant storage) and <strong>glycogen</strong> (animal storage, more branched via α-1,6). Human amylase hydrolyzes α-1,4 links, so we digest them.</li>
          <li><strong>β-1,4 glycosidic bonds</strong> — the linkage points "up." Chains of β-glucose form <strong>cellulose</strong>. Humans lack cellulase, so cellulose is <em>dietary fiber</em> — indigestible but essential for gut function. Cows and termites host gut microbes that supply the enzyme.</li>
        </ul>
        <p>Also remember: glucose, fructose, and galactose are all <code>C₆H₁₂O₆</code> — <strong>structural isomers</strong>. Same formula, different shape, different biology. Sucrose = glucose + fructose; lactose = glucose + galactose; maltose = glucose + glucose.</p>
      `
    }
  },
  {
    title: "Lipids — long-term storage + membranes",
    body: {
      middle: `
        <p>Lipids are <strong>fats and oils</strong>. They're mostly carbon and hydrogen, and they don't dissolve in water — that's their defining trick.</p>
        <p>There are three main kinds:</p>
        <ul>
          <li><strong>Fats and oils</strong> — your body's long-term energy storage. One gram of fat stores about twice the energy of one gram of sugar.</li>
          <li><strong>Phospholipids</strong> — special lipids that build the thin "skin" around every one of your cells.</li>
          <li><strong>Steroids</strong> — including cholesterol and hormones like estrogen and testosterone.</li>
        </ul>
        <p>Animal fats (like butter) are usually solid at room temperature. Plant fats (like olive oil) are usually liquid. That's because of small kinks in their shape that keep them from packing tightly.</p>
      `,
      high: `
        <p>Mostly <strong>C and H</strong>, with a few O. Defined by being <em>nonpolar and water-insoluble</em>.</p>
        <ul>
          <li><strong>Triglycerides</strong> (fats and oils) — glycerol + 3 fatty acid tails. Long-term energy storage.</li>
          <li><strong>Phospholipids</strong> — like triglycerides but with one tail replaced by a polar phosphate group. They self-assemble into the cell membrane bilayer.</li>
          <li><strong>Steroids</strong> — 4 fused rings. Includes cholesterol and all the sex hormones (testosterone, estrogen).</li>
        </ul>
        <p>Fatty acid tails can be <em>saturated</em> (no double bonds, straight, solid at room temp = butter) or <em>unsaturated</em> (one or more double bonds, kinked, liquid = olive oil).</p>
      `
    }
  },
  {
    title: "Lipids — ester bonds, kinks, and split personalities",
    body: {
      middle: `
        <p>A triglyceride is built from <strong>glycerol</strong> (a 3-carbon alcohol with 3 —OH groups) plus <strong>3 fatty acids</strong>. Each fatty acid attaches via an <strong>ester bond</strong> — the —OH from glycerol meets the —COOH from the fatty acid, and one water pops out. Three attachments → three waters.</p>
        <p>The fatty acid tails come in three flavors:</p>
        <ul>
          <li><strong>Saturated</strong> — no double bonds, straight tail. Packs tight → solid at room temp. Butter, lard.</li>
          <li><strong>Unsaturated (cis)</strong> — has C=C double bonds with a natural kink. Can't pack → liquid oils.</li>
          <li><strong>Trans</strong> — same double bond straightened out by industrial processing. Packs like saturated → solid but sneaky. Bad for arteries.</li>
        </ul>
        <p>Then there are <strong>phospholipids</strong>: same idea as a triglyceride but with one fatty acid tail swapped for a phosphate group. The phosphate end loves water; the two tails hate it. That split personality is what lets phospholipids self-assemble into the two-layer sheet that surrounds every cell.</p>
      `,
      high: `
        <p><strong>Triglyceride formation</strong>: glycerol (3 carbons, 3 hydroxyls) + 3 fatty acids (—COOH heads with long hydrocarbon tails). Each glycerol —OH meets a fatty acid —COOH, forming an <strong>ester bond</strong> (—O—CO—) and releasing water. Three ester bonds per triglyceride.</p>
        <p>Fatty acid tail geometry:</p>
        <ul>
          <li><strong>Saturated</strong> — no C=C → straight chain → packs tightly → solid (animal fats).</li>
          <li><strong>Unsaturated cis</strong> — one or more C=C, H's on the same side → kinked → can't pack → liquid (plant oils).</li>
          <li><strong>Trans</strong> — artificially isomerized so the H's are on opposite sides → straight configuration → packs like saturated. Raises LDL, banned from the U.S. food supply in 2018.</li>
        </ul>
        <p><strong>Phospholipids</strong>: replace one fatty acid tail with a phosphate group. Result: a molecule with a <em>polar hydrophilic head</em> and two <em>nonpolar hydrophobic tails</em> — <strong>amphipathic</strong>. In water, phospholipids spontaneously form a bilayer (heads out, tails in) — the structural basis of every cell membrane.</p>
      `
    }
  },
  {
    title: "Proteins — the workhorses",
    body: {
      middle: `
        <p>Proteins are the <strong>doers</strong> of the cell. Almost any job you can think of in your body, some protein is doing it.</p>
        <p>They're built from only <strong>20 different small parts</strong> called amino acids, chained together in different orders to make millions of different proteins.</p>
        <p>A short list of what proteins do:</p>
        <ul>
          <li>Carry oxygen in your blood (hemoglobin)</li>
          <li>Speed up chemical reactions (enzymes — your saliva has one called amylase that starts digesting bread the moment you take a bite)</li>
          <li>Make up your hair, skin, and nails (keratin)</li>
          <li>Fight off germs (antibodies)</li>
          <li>Send signals between cells (hormones like insulin)</li>
        </ul>
        <p>A protein's shape decides what it does. If it folds wrong, it doesn't work — and that can cause real diseases.</p>
      `,
      high: `
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
    }
  },
  {
    title: "Proteins — peptide bonds and 4 levels of shape",
    body: {
      middle: `
        <p>Every amino acid has the same basic skeleton: a central carbon with an <strong>amino group (—NH₂)</strong> on one side, a <strong>carboxyl group (—COOH)</strong> on the other, and an <strong>R-group</strong> hanging off that makes it unique. There are 20 different R-groups → 20 amino acids.</p>
        <p>Two amino acids join when the —COOH of one meets the —NH₂ of the next: a <strong>peptide bond</strong> forms and one water leaves.</p>
        <p>Proteins have <strong>4 levels of structure</strong>, like nesting dolls:</p>
        <ul>
          <li><strong>Primary</strong> — the exact order of amino acids in the chain.</li>
          <li><strong>Secondary</strong> — the chain twists into a spring (α-helix) or folds into a sheet (β-sheet), held together by hydrogen bonds.</li>
          <li><strong>Tertiary</strong> — the whole chain folds into a 3D blob, with R-groups tucked wherever they fit best.</li>
          <li><strong>Quaternary</strong> — some proteins snap together with other protein chains. Hemoglobin is 4 chains locked together.</li>
        </ul>
        <p>Heat, acid, or the wrong chemicals can <strong>denature</strong> a protein — unfold it — and once unfolded it usually can't do its job. That's what happens when you cook an egg: the clear part goes white and solid because the proteins have unfolded and tangled.</p>
      `,
      high: `
        <p>An amino acid = central α-carbon + amino group (—NH₂) + carboxyl (—COOH) + a variable <strong>R-group (side chain)</strong>. 20 R-groups → 20 amino acids. Side chains sort into <em>nonpolar</em>, <em>polar</em>, <em>acidic</em>, and <em>basic</em> — that classification predicts how each amino acid will behave in a folded protein.</p>
        <p>The <strong>peptide bond</strong> is a covalent —CO—NH— link formed when the carboxyl of one amino acid dehydrates with the amino of the next. Peptide bonds have partial double-bond character, so they can't rotate freely — which is what makes protein folding predictable enough to work.</p>
        <p>Four levels of structure:</p>
        <ul>
          <li><strong>Primary (1°)</strong> — the amino acid sequence, dictated by DNA.</li>
          <li><strong>Secondary (2°)</strong> — local folding into <em>α-helices</em> and <em>β-pleated sheets</em>, stabilized by backbone H-bonds.</li>
          <li><strong>Tertiary (3°)</strong> — the full 3D fold. Driven by R-group interactions: hydrophobic clustering, H-bonds, ionic bonds, and <strong>disulfide bridges</strong> (—S—S— between two cysteines).</li>
          <li><strong>Quaternary (4°)</strong> — multiple polypeptide subunits assembled into one functional protein (hemoglobin = 4 subunits).</li>
        </ul>
        <p><strong>Denaturation</strong> — heat, extreme pH, or reducing agents disrupt these bonds and unfold the protein. Since function follows form, a denatured protein is a broken protein. Sickle-cell anemia comes from a single primary-structure change (Glu → Val at position 6 of β-hemoglobin) that ruins the quaternary fold.</p>
      `
    }
  },
  {
    title: "Nucleic acids — the information",
    body: {
      middle: `
        <p>Nucleic acids are the <strong>instruction manuals</strong> of the cell. There are two main ones:</p>
        <ul>
          <li><strong>DNA</strong> — the master copy. It holds the instructions to build every protein your body needs, and gets passed down from cell to cell (and from parent to child).</li>
          <li><strong>RNA</strong> — a working copy that carries small chunks of the instructions out to where proteins actually get made.</li>
        </ul>
        <p>There's also a small one called <strong>ATP</strong> — your cells' energy currency. Every time a muscle moves or a brain cell fires, ATP is what powers it.</p>
        <p>Cool fact: every living thing on Earth, from bacteria to whales to you, uses the same DNA system. That's one of the strongest pieces of evidence that all life shares a common ancestor.</p>
      `,
      high: `
        <p>Made of <strong>C, H, O, N, P</strong>. Built from <strong>nucleotide</strong> monomers (sugar + phosphate + nitrogenous base).</p>
        <ul>
          <li><strong>DNA</strong> — the cell's archive. Stores the instructions to build every protein, passed unchanged to each daughter cell.</li>
          <li><strong>RNA</strong> — DNA's working copy. mRNA carries instructions to ribosomes, tRNA brings amino acids, rRNA forms ribosomes themselves.</li>
          <li><strong>ATP</strong> — a single nucleotide that's the cell's main energy currency. Cells consume and regenerate body-weight quantities of it every day.</li>
        </ul>
        <p>The fact that DNA's information system is universal across all life — bacterium, plant, jellyfish, human — is some of the strongest evidence for common ancestry.</p>
      `
    }
  },
  {
    title: "Nucleic acids — phosphodiester bonds and base pairing",
    body: {
      middle: `
        <p>Every nucleotide has three parts stuck together: a <strong>5-carbon sugar</strong>, a <strong>phosphate group</strong>, and a <strong>nitrogen base</strong> (A, T, G, C, or U).</p>
        <p>To make a strand, the phosphate on one nucleotide connects to the sugar of the next through a <strong>phosphodiester bond</strong>. The result is a long alternating sugar-phosphate backbone with the bases sticking out to one side.</p>
        <p>The bases come in two shapes:</p>
        <ul>
          <li><strong>Purines</strong> (bigger, two rings): <strong>A</strong> and <strong>G</strong></li>
          <li><strong>Pyrimidines</strong> (smaller, one ring): <strong>C</strong>, <strong>T</strong>, <strong>U</strong></li>
        </ul>
        <p>In double-stranded DNA, the two strands hold together because the bases pair up perfectly: <strong>A always pairs with T</strong> (2 H-bonds), <strong>G always pairs with C</strong> (3 H-bonds). Each strand carries the recipe for the other — that's why DNA can be copied so accurately every time a cell divides.</p>
      `,
      high: `
        <p>A nucleotide = pentose sugar (deoxyribose in DNA, ribose in RNA) + phosphate + nitrogenous base. Strand directionality matters: sugar carbons are numbered <strong>1′ to 5′</strong>, and phosphates link the 3′ carbon of one sugar to the 5′ carbon of the next via a <strong>phosphodiester bond</strong>. Every strand has a distinct <strong>5′ end</strong> (free phosphate) and <strong>3′ end</strong> (free —OH); DNA polymerase can only add new nucleotides to the 3′ end.</p>
        <p>Base categories:</p>
        <ul>
          <li><strong>Purines</strong> (double ring): <strong>A</strong>denine, <strong>G</strong>uanine</li>
          <li><strong>Pyrimidines</strong> (single ring): <strong>C</strong>ytosine, <strong>T</strong>hymine (DNA only), <strong>U</strong>racil (RNA only)</li>
        </ul>
        <p><strong>Chargaff's rules / base pairing</strong>: A pairs with T (or U in RNA) via 2 H-bonds; G pairs with C via 3 H-bonds. G–C pairs are stronger. A purine <em>always</em> pairs with a pyrimidine — that's what keeps the double helix a uniform width.</p>
        <p>The two strands run <strong>antiparallel</strong> (5′→3′ on one, 3′→5′ on the other), and each is a complementary template for the other — the structural basis of semiconservative replication.</p>
      `
    }
  }
];
