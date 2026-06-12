# BioSandbox — Progress Checklist

A living checklist of where we are. Tick boxes (`- [ ]` → `- [x]`) as you finish each item.

---

## ✅ Done

### Planning & design
- [x] Read the App Planning PDF
- [x] Full design spec written → `~/.claude/plans/i-am-working-with-enumerated-allen.md`
- [x] Three modules decided: Cell Explorer · DNA & Replication · Protein Synthesis
- [x] Two audience tracks decided (Middle / High) — high-school first, middle as polish
- [x] Click-to-match base-pair mini-game (not drag-and-drop)
- [x] Opt-in guided tour pattern
- [x] ASCII sketched all 6 screens (home, cell, DNA, protein, quiz, results)
- [x] Visual direction: soft yellow bg, light-blue cards, pink accents, Kurzgesagt-style thumbnails, Fraunces + Inter fonts

### Phase 2 — Foundation
- [x] Home page (`index.html`) — nav, hero, module grid, progress strip, footer
- [x] Placeholder pages: `cell.html`, `dna.html`, `protein.html`, `quiz.html`
- [x] `about.html` with real content
- [x] Design system in `css/style.css`
- [x] `data/modules.js` — single source of truth, admin-editable
- [x] Kurzgesagt-style SVG thumbnails for all 3 modules
- [x] `js/progress.js` — localStorage helpers
- [x] `js/app.js` — shared shell (track toggle, home grid rendering)
- [x] Audience toggle (Middle / High) — persists across reloads
- [x] Progress strip — mastered count, badges, % explored
- [x] Mobile-responsive layout

---

## ⬜ Still to do

### Outside the code (Phase 1 housekeeping)
- [x] Install VS Code + Live Server extension
- [x] Create GitHub account + `biosandbox` repo → github.com/kavyapotnis13/biosandbox
- [x] Push project to the repo
- [x] Enable GitHub Pages → https://kavyapotnis13.github.io/biosandbox/
- [x] Watch one beginner SVG tutorial (Kevin Powell on YouTube)

### Phase 3 — Cell Explorer ✅
- [x] SVG cell diagram with 8 labeled organelles (12, across animal + plant)
- [x] Each organelle has a unique `id` and is clickable
- [x] Two-pane layout (diagram left, info panel right)
- [x] `data/cell-content.js` — name + function + "did you know" per organelle, tagged middle/high
- [x] Click → info card; hover → glow
- [x] Track explored count: "Explored X/12 parts"
- [x] Opt-in guided tour ("Take a tour" auto-cycles each organelle, with red arrow pointer)
- [x] Keyboard nav (Tab + Enter)
- [x] Mobile: info panel stacks below diagram

### Phase 4 — DNA & Protein Synthesis
- [x] DNA double helix SVG with intro flashcards (basics + replication walkthrough)
- [x] Step-through UI for DNA replication (6-phase animated unwinding + daughter helices)
- [x] Click-to-match base-pair mini-game (A↔T, C↔G) — third section on dna.html
- [x] Protein synthesis SVG — transcription + translation
- [x] Codon decoder mini-game (mRNA codon → amino acid)
- [ ] Step content tagged middle/high

### Phase 5 — Quiz engine + content
- [x] `js/quiz.js` — reads `?module=X`, pulls 5 of 8–10 questions
- [x] `data/quiz-data.js` — high-school pool (~30 questions)
- [x] Quiz UI — question card, 4 answer buttons, per-question feedback
- [x] Results screen — score, breakdown, retry / back / home
- [x] Save best score + badges via progress.js
- [x] Home page cards reflect quiz status (already wired)

### Phase 6 — Polish & submit
- [ ] Middle-school question pool (~30 more questions)
- [ ] Mobile testing on a real phone
- [ ] Share live link with 2–3 testers
- [ ] Fix top 3 feedback issues
- [ ] Accessibility pass (SVG `<title>`, keyboard, color contrast)
- [ ] App description for the submission
- [ ] 1–3 minute demo video
- [ ] Final GitHub Pages deploy

### Phase 4b — Extra units (added after Phase 5)
- [x] Mitosis module — 5-phase walkthrough + quiz
- [x] Photosynthesis module — light reactions + Calvin cycle + quiz
- [x] Cellular respiration module — glycolysis + Krebs + ETC + quiz
- [ ] Revive-on-mistake mini-game (flappy-bird style)

### Stretch (post-MVP, if time)
- [ ] Build-a-cell drag-and-drop sandbox
- [ ] Dark mode
- [ ] Glossary page (cross-linked terms)
- [ ] Sound effects (toggleable)
- [ ] Quiz streak counter
- [ ] Print-friendly study sheet
- [ ] Share-a-score URL
