# Genetic Inheritance & Family Risk Modeling Tool — Checklist

## What this is
An educational web app that models recessive inheritance patterns across a family using **reported family medical history** (not lab genotype data). Users build a family tree and mark known/reported conditions for each relative. The app infers likely inheritance patterns and estimates risk/carrier probability — **NOT a diagnostic tool, and NOT based on lab-confirmed genetic data**.

This mirrors how genetic counselors actually work: family history pedigree analysis is the standard first step before any genetic testing is ordered. (See: U.S. Surgeon General's "My Family Health Portrait" tool, a real precedent for this approach.)

## Core framing (non-negotiable)
- [ ] EDUCATIONAL framing preserved everywhere — never diagnostic or clinical
- [ ] Inputs are self-reported family history, not confirmed lab data — outputs must reflect that uncertainty explicitly
- [ ] All outputs use inferential/probabilistic language ("this pattern is consistent with," "estimated chance") — never certain or diagnostic ("you are a carrier," "your child will have X")
- [ ] Visible disclaimer wherever results are shown, noting this estimates likelihood from reported patterns, not lab-confirmed status
- [ ] Real family health data used only with explicit awareness/consent from the person entering it (may include info about relatives who aren't the user)

## Inputs
- [ ] User builds a family tree — adds relatives (parent, sibling, grandparent, etc.)
- [ ] For each relative, marks known/reported conditions from the in-scope list (or "none known" / "unknown")
- [ ] No file upload, no genotype data required — this is the accessible-by-default path

## Conditions in scope (v1)
- [ ] Sickle cell trait/disease
- [ ] Cystic fibrosis
- [ ] Tay-Sachs
- [ ] Hereditary hemochromatosis (blood/iron-related)
- [ ] Factor V Leiden (clotting disorder)

## Outputs
- [ ] Family tree visualization showing reported condition status per person
- [ ] Per condition: inferred inheritance pattern based on who's affected across generations
- [ ] Estimated probability an unaffected relative (e.g. a sibling) is a carrier, based on the observed pattern — framed as an estimate, not a fact
- [ ] Plain-language explanation of what the pattern means and why

## Core features
- [ ] Family tree builder UI (add relatives, mark conditions)
- [ ] Pattern-inference logic: given who's affected across generations, estimate inheritance mode + probabilities for unaffected relatives
- [ ] Family tree visualization, color-coded by reported status
- [ ] Click into a person/condition for plain-language explanation
- [ ] Persistent disclaimer visible wherever results are shown
- [ ] Graceful handling of incomplete history ("unknown" is a valid answer, not a blocker)

## Stretch goal (phase 2+, optional)
- [ ] Accept genotype file upload (23andMe/AncestryDNA format) as an alternate, more precise input path, cross-referenced against ClinVar — for users who do have this data

## Build phases
- [x] **Phase 1** — Static UI shell with mock family + mock conditions (existing prototype at `genetic-inheritance/index.html` — tree + detail-panel pattern is reusable, but genotype-oriented copy needs to pivot to reported-history language)
- [ ] **Phase 2** — Family tree builder (add/edit relatives, mark conditions)
- [ ] **Phase 3** — Pattern-inference logic (inheritance mode + probability estimates)
- [ ] **Phase 4** — Plain-language explanation copy per condition + per pattern
- [ ] **Phase 5** — Polish, disclaimer placement, edge cases (unknown data, single parent, etc.)

## Explanation text (AI-generated copy) — must pass this check
- [ ] Uses inferential/probability language only, never certainty
- [ ] Never implies diagnosis or confirmed carrier status
- [ ] Clearly distinguishes "based on reported family history" from "lab-confirmed" everywhere
- [ ] Consistent explanation of the same condition across different screens
