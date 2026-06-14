/* =========================================================
   ap-standards.js — AP Biology Course and Exam Description
   alignment map.

   Built from the official 2025 CED ("AP Biology Course and
   Exam Description, Effective Fall 2025", College Board).
   Codes follow the 2025 CED convention:
     <UNIT#>.<TOPIC#>.<LETTER>
       e.g. 2.5.A, 6.7.C, 1.1.A

   The 2025 CED retired the prior Big Idea-prefixed codes
   (ENE-, IST-, SYI-, EVO-). The four big ideas still exist
   as themes spanning the course, but they are no longer
   embedded in the LO code itself.

   Big ideas:
     EVO — Evolution
     ENE — Energetics
     IST — Information Storage and Transmission
     SYI — Systems Interactions

   Unit titles + LOs verified against the official PDF on
   2026-06-13. 97 LOs total across 8 units.
   ========================================================= */

const AP_BIO_BIG_IDEAS = {
  EVO: 'Evolution',
  ENE: 'Energetics',
  IST: 'Information Storage and Transmission',
  SYI: 'Systems Interactions'
};

const AP_BIO_UNITS = [
  {
    number: 1,
    name: 'Chemistry of Life',
    weight: '8-11%',
    bigIdeas: ['SYI', 'ENE', 'IST'],
    los: [
      { code: '1.1.A', title: 'Explain how the properties of water that result from its polarity and hydrogen bonding affect its biological function.' },
      { code: '1.2.A', title: 'Describe the composition of macromolecules required by living organisms.' },
      { code: '1.3.A', title: 'Describe the chemical reactions that build and break biological macromolecules.' },
      { code: '1.4.A', title: 'Describe the structure and function of carbohydrates.' },
      { code: '1.5.A', title: 'Describe the structure and function of lipids.' },
      { code: '1.6.A', title: 'Describe the structure and function of DNA and RNA.' },
      { code: '1.7.A', title: 'Describe the structure and function of proteins.' }
    ]
  },
  {
    number: 2,
    name: 'Cells',
    weight: '10-13%',
    bigIdeas: ['SYI', 'ENE'],
    los: [
      { code: '2.1.A', title: 'Explain how the structure and function of subcellular components and organelles contribute to the function of cells.' },
      { code: '2.2.A', title: 'Explain the effect of surface area-to-volume ratios on the exchange of materials between cells or organisms and the environment.' },
      { code: '2.3.A', title: 'Describe the roles of each of the components of the cell membrane in maintaining the internal environment of the cell.' },
      { code: '2.3.B', title: 'Describe the fluid mosaic model of cell membranes.' },
      { code: '2.4.A', title: 'Explain how the structure of biological membranes influences selective permeability.' },
      { code: '2.4.B', title: 'Describe the role of the cell wall in maintaining cell structure and function.' },
      { code: '2.5.A', title: 'Describe the mechanisms that organisms use to maintain solute and water balance.' },
      { code: '2.5.B', title: 'Describe the mechanisms that organisms use to transport large molecules across the plasma membrane.' },
      { code: '2.6.A', title: 'Explain how the structure of a molecule affects its ability to pass through the plasma membrane.' },
      { code: '2.7.A', title: 'Explain how concentration gradients affect the movement of molecules across membranes.' },
      { code: '2.7.B', title: 'Explain how osmoregulatory mechanisms contribute to the health and survival of organisms.' },
      { code: '2.8.A', title: 'Describe the processes that allow ions and other molecules to move across membranes.' },
      { code: '2.9.A', title: 'Describe the membrane-bound structures of the eukaryotic cell.' },
      { code: '2.9.B', title: 'Explain how internal membranes and membrane-bound organelles contribute to compartmentalization of eukaryotic cell functions.' },
      { code: '2.10.A', title: 'Describe similarities and/or differences in compartmentalization between prokaryotic and eukaryotic cells.' }
    ]
  },
  {
    number: 3,
    name: 'Cellular Energetics',
    weight: '12-16%',
    bigIdeas: ['ENE'],
    los: [
      { code: '3.1.A', title: 'Explain how enzymes affect the rate of biological reactions.' },
      { code: '3.2.A', title: 'Explain how changes to the structure of an enzyme may affect its function.' },
      { code: '3.2.B', title: 'Explain how the cellular environment affects enzyme activity.' },
      { code: '3.3.A', title: 'Describe the role of energy in living organisms.' },
      { code: '3.3.B', title: 'Explain how shared, conserved, and fundamental processes and features support the concept of common ancestry for all organisms.' },
      { code: '3.4.A', title: 'Describe the photosynthetic processes and structural features of the chloroplast that allow organisms to capture and store energy.' },
      { code: '3.4.B', title: 'Explain how cells capture energy from light and transfer it to biological molecules for storage and use.' },
      { code: '3.5.A', title: 'Describe the processes and structural features of mitochondria that allow organisms to use energy stored in biological macromolecules.' },
      { code: '3.5.B', title: 'Explain how cells obtain energy from biological macromolecules in order to power cellular functions.' }
    ]
  },
  {
    number: 4,
    name: 'Cell Communication and Cell Cycle',
    weight: '10-15%',
    bigIdeas: ['IST'],
    los: [
      { code: '4.1.A', title: 'Describe the ways that cells can communicate with one another.' },
      { code: '4.1.B', title: 'Explain how cells communicate with one another over short and long distances.' },
      { code: '4.2.A', title: 'Describe the components of a signal transduction pathway.' },
      { code: '4.2.B', title: 'Describe the role of components of a signal transduction pathway in producing a cellular response.' },
      { code: '4.3.A', title: 'Describe the different types of cellular responses elicited by a signal transduction pathway.' },
      { code: '4.3.B', title: 'Explain how a change in the structure of any signaling molecule affects the activity of the signaling pathway.' },
      { code: '4.4.A', title: 'Explain how positive and negative feedback helps maintain homeostasis.' },
      { code: '4.5.A', title: 'Describe the events that occur in the cell cycle.' },
      { code: '4.5.B', title: 'Explain how mitosis results in the transmission of chromosomes from one generation of cells to the next.' },
      { code: '4.6.A', title: 'Describe the role of checkpoints in regulating the cell cycle.' },
      { code: '4.6.B', title: 'Describe the effects of disruptions to the cell cycle on the cell or organism.' }
    ]
  },
  {
    number: 5,
    name: 'Heredity',
    weight: '8-11%',
    bigIdeas: ['IST', 'EVO'],
    los: [
      { code: '5.1.A', title: 'Explain how meiosis results in the transmission of chromosomes from one generation to the next.' },
      { code: '5.1.B', title: 'Describe similarities and differences between the phases and outcomes of mitosis and meiosis.' },
      { code: '5.2.A', title: 'Explain how the process of meiosis generates genetic diversity.' },
      { code: '5.3.A', title: 'Explain the inheritance of genes and traits as described by Mendel’s laws.' },
      { code: '5.4.A', title: 'Explain deviations from Mendel’s model of the inheritance of traits.' },
      { code: '5.5.A', title: 'Explain how the same genotype can result in multiple phenotypes under different environmental conditions.' }
    ]
  },
  {
    number: 6,
    name: 'Gene Expression and Regulation',
    weight: '12-16%',
    bigIdeas: ['IST'],
    los: [
      { code: '6.1.A', title: 'Describe the structures involved in passing hereditary information from one generation to the next.' },
      { code: '6.1.B', title: 'Describe the characteristics of DNA that allow it to be used as hereditary material.' },
      { code: '6.2.A', title: 'Describe the mechanisms by which genetic information is copied for transmission between generations.' },
      { code: '6.3.A', title: 'Describe the mechanisms by which genetic information flows from DNA to RNA to protein.' },
      { code: '6.4.A', title: 'Explain how the phenotype of an organism is determined by its genotype.' },
      { code: '6.5.A', title: 'Describe the types of interactions that regulate gene expression.' },
      { code: '6.5.B', title: 'Explain how the location of regulatory sequences relates to their function.' },
      { code: '6.6.A', title: 'Explain how the binding of transcription factors to promoter regions affects gene expression and the phenotype of the organism.' },
      { code: '6.6.B', title: 'Explain the connection between the regulation of gene expression and phenotypic differences in cells and organisms.' },
      { code: '6.7.A', title: 'Describe the various types of mutation.' },
      { code: '6.7.B', title: 'Explain how changes in genotype may result in changes in phenotype.' },
      { code: '6.7.C', title: 'Explain how alterations in DNA sequences contribute to variation that can be subject to natural selection.' },
      { code: '6.8.A', title: 'Explain the use of genetic engineering techniques in analyzing or manipulating DNA.' }
    ]
  },
  {
    number: 7,
    name: 'Natural Selection',
    weight: '13-20%',
    bigIdeas: ['EVO'],
    los: [
      { code: '7.1.A', title: 'Describe the causes of natural selection.' },
      { code: '7.1.B', title: 'Explain how natural selection affects populations.' },
      { code: '7.2.A', title: 'Describe the importance of phenotypic variation in a population.' },
      { code: '7.2.B', title: 'Explain how variation in molecules within cells connects to the fitness of an organism.' },
      { code: '7.3.A', title: 'Explain how humans can affect diversity within a population.' },
      { code: '7.4.A', title: 'Explain how random occurrences affect the genetic makeup of a population.' },
      { code: '7.4.B', title: 'Describe the role of random processes in the evolution of specific populations.' },
      { code: '7.4.C', title: 'Describe the change in the genetic makeup of a population over time.' },
      { code: '7.5.A', title: 'Describe the conditions under which allele and genotype frequencies will change in populations.' },
      { code: '7.6.A', title: 'Describe the types of data that provide evidence for evolution.' },
      { code: '7.6.B', title: 'Explain how morphological, biochemical, and geological data provide evidence that organisms have changed over time.' },
      { code: '7.7.A', title: 'Describe structural and functional evidence on cellular and molecular levels that provides evidence for the common ancestry of all eukaryotes.' },
      { code: '7.8.A', title: 'Explain how evolution is an ongoing process in all living organisms.' },
      { code: '7.9.A', title: 'Describe the types of evidence that can be used to infer an evolutionary relationship.' },
      { code: '7.9.B', title: 'Explain how phylogenetic trees and cladograms can be used to infer evolutionary relatedness.' },
      { code: '7.10.A', title: 'Describe the conditions under which new species may arise.' },
      { code: '7.10.B', title: 'Describe the rate of evolution and speciation under different ecological conditions.' },
      { code: '7.10.C', title: 'Explain the processes and mechanisms that drive speciation.' },
      { code: '7.11.A', title: 'Explain how the genetic diversity of a species or population affects its ability to withstand environmental pressures.' },
      { code: '7.12.A', title: 'Describe the scientific evidence that supports models of the origin of life on Earth.' }
    ]
  },
  {
    number: 8,
    name: 'Ecology',
    weight: '10-15%',
    bigIdeas: ['SYI', 'ENE', 'EVO'],
    los: [
      { code: '8.1.A', title: 'Explain how the behavioral and physiological response of an organism is related to changes in internal or external environment.' },
      { code: '8.1.B', title: 'Explain how the behavioral responses of organisms affect their overall fitness and may contribute to the success of a population.' },
      { code: '8.2.A', title: 'Describe the strategies organisms use to acquire and use energy.' },
      { code: '8.2.B', title: 'Explain how energy flows and matter cycles through trophic levels.' },
      { code: '8.2.C', title: 'Explain how changes in energy availability affect populations, communities, and ecosystems.' },
      { code: '8.2.D', title: 'Explain how the activities of autotrophs and heterotrophs enable the flow of energy within an ecosystem.' },
      { code: '8.3.A', title: 'Describe factors that influence growth dynamics of populations.' },
      { code: '8.4.A', title: 'Explain how the density of a population affects and is determined by resource availability in the environment.' },
      { code: '8.5.A', title: 'Describe the structure of a community according to its species composition and diversity.' },
      { code: '8.5.B', title: 'Explain how interactions within and among populations influence community structure.' },
      { code: '8.6.A', title: 'Describe the relationship between ecosystem diversity and its resilience to changes in the environment.' },
      { code: '8.6.B', title: 'Explain how the addition or removal of any component of an ecosystem will affect its overall short-term and long-term structure.' },
      { code: '8.7.A', title: 'Explain the interaction between the environment and random or preexisting variations in populations.' },
      { code: '8.7.B', title: 'Explain how invasive species affect ecosystem dynamics.' },
      { code: '8.7.C', title: 'Describe human activities that lead to changes in ecosystem structure and dynamics.' },
      { code: '8.7.D', title: 'Explain how geological and meteorological activity leads to changes in ecosystem structure and dynamics.' }
    ]
  }
];

/* Total LO count across all units, computed once. */
const AP_BIO_TOTAL_LOS = AP_BIO_UNITS.reduce((n, u) => n + u.los.length, 0);

/* Convenience lookup: code → { code, title, unit, unitName } */
function getLO(code) {
  for (const unit of AP_BIO_UNITS) {
    const lo = unit.los.find(l => l.code === code);
    if (lo) return { ...lo, unit: unit.number, unitName: unit.name };
  }
  return null;
}

/* Returns the set of units that have at least one covered LO,
   given a list of covered LO codes. Used by the home page coverage summary. */
function getCoveredUnits(coveredCodes) {
  const covered = new Set();
  for (const unit of AP_BIO_UNITS) {
    if (unit.los.some(lo => coveredCodes.includes(lo.code))) {
      covered.add(unit.number);
    }
  }
  return Array.from(covered).sort((a, b) => a - b);
}
