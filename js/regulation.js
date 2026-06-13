/* =========================================================
   regulation.js — Gene Regulation module

   Left pane has TWO toys:
     1. lac operon switch — toggle lactose ON/OFF and watch
        the repressor leave/return the operator, and the genes
        turn on/off.
     2. Mutation playground — a DNA sequence with codons.
        Click a base to swap it; the displayed amino acid
        sequence updates so you can SEE silent vs missense
        vs nonsense vs frameshift.

   Right pane: 4 flashcard decks.
   ========================================================= */

const DECK_R_MUTATION   = 'mutation';
const DECK_R_PROKARYOTE = 'prokaryote';
const DECK_R_EUKARYOTE  = 'eukaryote';
const DECK_R_BIOTECH    = 'biotech';
const DECK_R_ORDER      = [DECK_R_MUTATION, DECK_R_PROKARYOTE, DECK_R_EUKARYOTE, DECK_R_BIOTECH];

/* ---------- lac operon state ---------- */
let lactosePresent = false;

/* ---------- Mutation playground state ---------- */
const ORIGINAL_DNA = 'ATGGCATCAAAAGGT';   // 5 codons: Met-Ala-Ser-Lys-Gly
let dna = ORIGINAL_DNA.split('');
let frameshift = false;        // applied via insertion/deletion

const CODON_TABLE = {
  'TTT':'Phe','TTC':'Phe','TTA':'Leu','TTG':'Leu',
  'CTT':'Leu','CTC':'Leu','CTA':'Leu','CTG':'Leu',
  'ATT':'Ile','ATC':'Ile','ATA':'Ile','ATG':'Met',
  'GTT':'Val','GTC':'Val','GTA':'Val','GTG':'Val',
  'TCT':'Ser','TCC':'Ser','TCA':'Ser','TCG':'Ser',
  'CCT':'Pro','CCC':'Pro','CCA':'Pro','CCG':'Pro',
  'ACT':'Thr','ACC':'Thr','ACA':'Thr','ACG':'Thr',
  'GCT':'Ala','GCC':'Ala','GCA':'Ala','GCG':'Ala',
  'TAT':'Tyr','TAC':'Tyr','TAA':'STOP','TAG':'STOP',
  'CAT':'His','CAC':'His','CAA':'Gln','CAG':'Gln',
  'AAT':'Asn','AAC':'Asn','AAA':'Lys','AAG':'Lys',
  'GAT':'Asp','GAC':'Asp','GAA':'Glu','GAG':'Glu',
  'TGT':'Cys','TGC':'Cys','TGA':'STOP','TGG':'Trp',
  'CGT':'Arg','CGC':'Arg','CGA':'Arg','CGG':'Arg',
  'AGT':'Ser','AGC':'Ser','AGA':'Arg','AGG':'Arg',
  'GGT':'Gly','GGC':'Gly','GGA':'Gly','GGG':'Gly'
};
const BASES = ['A', 'T', 'G', 'C'];

let deckMode  = DECK_R_MUTATION;
let cardIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  if (typeof REG_MUTATION_CARDS === 'undefined') return;

  renderLac();
  renderMutation();
  renderCard();

  document.getElementById('lactose-toggle')?.addEventListener('click', () => {
    lactosePresent = !lactosePresent;
    renderLac();
  });
  document.getElementById('mut-reset')?.addEventListener('click', () => {
    dna = ORIGINAL_DNA.split('');
    frameshift = false;
    renderMutation();
  });
  document.getElementById('mut-insert')?.addEventListener('click', () => {
    if (dna.length < 24) {
      dna.splice(6, 0, 'A');   // insert A at position 6 → frameshift
      frameshift = true;
      renderMutation();
    }
  });
  document.getElementById('mut-delete')?.addEventListener('click', () => {
    if (dna.length > 9) {
      dna.splice(6, 1);
      frameshift = true;
      renderMutation();
    }
  });

  document.getElementById('card-prev')?.addEventListener('click', () => moveCard(-1));
  document.getElementById('card-next')?.addEventListener('click', () => moveCard(1));
  document.getElementById('section-back')?.addEventListener('click', () => enterDeck(DECK_R_MUTATION, 0));

  document.addEventListener('keydown', e => {
    if (e.target.matches('input, textarea, [contenteditable], button')) return;
    if (e.key === 'ArrowLeft')  moveCard(-1);
    if (e.key === 'ArrowRight') moveCard(1);
  });
});

/* ---------- lac operon ---------- */
function renderLac() {
  const svg = document.getElementById('lac-svg');
  if (svg) svg.classList.toggle('lactose-on', lactosePresent);
  const btn = document.getElementById('lactose-toggle');
  if (btn) {
    btn.setAttribute('aria-pressed', lactosePresent ? 'true' : 'false');
    btn.textContent = lactosePresent ? '✓ Lactose present' : 'Add lactose';
  }
  const status = document.getElementById('lac-status');
  if (status) {
    if (lactosePresent) {
      status.textContent = '✓ Lactose binds the repressor → repressor lets go → RNA polymerase transcribes the operon → enzymes get made.';
      status.className = 'enzyme-status enzyme-status-ok';
    } else {
      status.textContent = '✗ Repressor bound to operator. RNA polymerase can\'t pass. The operon is OFF.';
      status.className = 'enzyme-status enzyme-status-warn';
    }
  }
}

/* ---------- Mutation playground ---------- */

function renderMutation() {
  const grid = document.getElementById('dna-grid');
  if (!grid) return;
  // Render each base as a button; group every 3 into a codon block.
  let html = '';
  for (let i = 0; i < dna.length; i += 3) {
    const codon = dna.slice(i, i + 3).join('');
    const aa = CODON_TABLE[codon] || '?';
    const aaCls = aa === 'STOP' ? 'aa-stop' : '';
    html += `<div class="codon-block">`;
    for (let j = 0; j < 3; j++) {
      const idx = i + j;
      if (idx >= dna.length) break;
      const isMutated = dna[idx] !== ORIGINAL_DNA[idx];
      html += `<button class="base-btn ${isMutated ? 'base-mutated' : ''}" type="button" data-idx="${idx}">${dna[idx]}</button>`;
    }
    html += `<div class="codon-aa ${aaCls}">${aa}</div>`;
    html += `</div>`;
    if (aa === 'STOP') break;   // ribosome would stop here
  }
  grid.innerHTML = html;
  grid.querySelectorAll('.base-btn').forEach(b => {
    b.addEventListener('click', () => cycleBase(Number(b.dataset.idx)));
  });
  // Compute current vs original peptide and label the effect.
  classifyMutation();
}

function cycleBase(idx) {
  const cur = dna[idx];
  const next = BASES[(BASES.indexOf(cur) + 1) % 4];
  dna[idx] = next;
  renderMutation();
}

function translate(seq) {
  const aa = [];
  for (let i = 0; i + 3 <= seq.length; i += 3) {
    const codon = seq.slice(i, i + 3).join('');
    const a = CODON_TABLE[codon] || '?';
    if (a === 'STOP') break;
    aa.push(a);
  }
  return aa;
}

function classifyMutation() {
  const origAA = translate(ORIGINAL_DNA.split(''));
  const newAA  = translate(dna);
  let kind, message;
  if (dna.join('') === ORIGINAL_DNA) {
    kind = 'none'; message = 'No mutations. Original sequence — Met-Ala-Ser-Lys-Gly.';
  } else if (frameshift) {
    kind = 'frameshift';
    message = `⚠ FRAMESHIFT — every codon downstream of the insertion/deletion is changed. Original ${origAA.length} amino acids → ${newAA.length} amino acids before a premature STOP.`;
  } else if (newAA.length < origAA.length) {
    kind = 'nonsense';
    message = `⚠ NONSENSE mutation — codon ${newAA.length + 1} became STOP. Protein truncated from ${origAA.length} to ${newAA.length} amino acids.`;
  } else if (newAA.join('') === origAA.join('')) {
    kind = 'silent';
    message = `✓ SILENT mutation — the DNA changed but the amino acid sequence didn't. (Redundancy in the genetic code.)`;
  } else {
    let diffPos = -1;
    for (let i = 0; i < origAA.length; i++) {
      if (origAA[i] !== newAA[i]) { diffPos = i; break; }
    }
    kind = 'missense';
    message = `MISSENSE mutation — amino acid ${diffPos + 1} changed: ${origAA[diffPos]} → ${newAA[diffPos]}. Protein may or may not still work.`;
  }

  const label = document.getElementById('mut-effect');
  if (label) {
    label.textContent = message;
    label.className = 'enzyme-status mut-effect mut-' + kind;
  }
  setText('mut-original', `Met-${origAA.slice(1).join('-')}`);
  setText('mut-current',  newAA.length ? newAA.join('-') : '(no protein)');
}

/* ---------- Card deck ---------- */
function cardsFor(mode) {
  switch (mode) {
    case DECK_R_MUTATION:   return REG_MUTATION_CARDS;
    case DECK_R_PROKARYOTE: return REG_PROKARYOTE_CARDS;
    case DECK_R_EUKARYOTE:  return REG_EUKARYOTE_CARDS;
    case DECK_R_BIOTECH:    return REG_BIOTECH_CARDS;
    default:                return [];
  }
}
function activeCards() { return cardsFor(deckMode); }
function moveCard(delta) {
  const cards = activeCards();
  const next  = cardIndex + delta;
  if (next >= cards.length) {
    const i = DECK_R_ORDER.indexOf(deckMode);
    if (i < DECK_R_ORDER.length - 1) enterDeck(DECK_R_ORDER[i + 1], 0);
    return;
  }
  if (next < 0) {
    const i = DECK_R_ORDER.indexOf(deckMode);
    if (i > 0) {
      const prev = DECK_R_ORDER[i - 1];
      enterDeck(prev, cardsFor(prev).length - 1);
    }
    return;
  }
  cardIndex = next;
  renderCard();
}
function enterDeck(mode, index) { deckMode = mode; cardIndex = index; renderCard(); }
function renderCard() {
  const backBtn = document.getElementById('section-back');
  if (backBtn) backBtn.hidden = (deckMode === DECK_R_MUTATION);
  const cards   = activeCards();
  const card    = cards[cardIndex];
  const titleEl = document.querySelector('.flashcard-title');
  const bodyEl  = document.querySelector('.flashcard-body');
  const counter = document.getElementById('card-counter');
  const prevBtn = document.getElementById('card-prev');
  const nextBtn = document.getElementById('card-next');
  const label   = document.getElementById('section-label');
  if (titleEl) titleEl.textContent = card.title;
  if (bodyEl)  bodyEl.innerHTML    = card.body;
  if (counter) counter.textContent = `${cardIndex + 1} / ${cards.length}`;
  if (prevBtn) prevBtn.disabled    = (deckMode === DECK_R_MUTATION && cardIndex === 0);
  if (nextBtn) {
    const atLast = (cardIndex === cards.length - 1);
    nextBtn.disabled = (deckMode === DECK_R_BIOTECH && atLast);
    const nextDeckLabel = {
      [DECK_R_MUTATION]:   'Prokaryote operons →',
      [DECK_R_PROKARYOTE]: 'Eukaryotic regulation →',
      [DECK_R_EUKARYOTE]:  'Biotechnology →'
    }[deckMode];
    if (atLast && nextDeckLabel) {
      nextBtn.textContent = nextDeckLabel;
      nextBtn.classList.add('flashcard-btn-wide');
    } else {
      nextBtn.textContent = '→';
      nextBtn.classList.remove('flashcard-btn-wide');
    }
  }
  if (label) {
    label.textContent = ({
      [DECK_R_MUTATION]:   'Mutations',
      [DECK_R_PROKARYOTE]: 'Prokaryote operons',
      [DECK_R_EUKARYOTE]:  'Eukaryotic regulation',
      [DECK_R_BIOTECH]:    'Biotechnology'
    })[deckMode];
  }
  const cardEl = document.querySelector('.flashcard');
  if (cardEl) {
    cardEl.classList.remove('flashcard-enter');
    void cardEl.offsetWidth;
    cardEl.classList.add('flashcard-enter');
  }
}
function setText(id, text) { const el = document.getElementById(id); if (el) el.textContent = text; }
