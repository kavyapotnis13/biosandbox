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
- [ ] Install VS Code + Live Server extension
- [ ] Create GitHub account + `biosandbox` repo
- [ ] Push project to the repo
- [ ] Enable GitHub Pages → confirm live URL works
- [ ] Watch one beginner SVG tutorial (Kevin Powell on YouTube)

### Phase 3 — Cell Explorer
- [ ] SVG cell diagram with 8 labeled organelles
- [ ] Each organelle has a unique `id` and is clickable
- [ ] Two-pane layout (diagram left, info panel right)
- [ ] `data/cell-content.js` — name + function + "did you know" per organelle, tagged middle/high
- [ ] Click → info card; hover → glow
- [ ] Track explored count: "Explored X/8 parts"
- [ ] Opt-in guided tour ("Take a tour" auto-cycles each organelle)
- [ ] Keyboard nav (Tab + Enter)
- [ ] Mobile: info panel stacks below diagram

### Phase 4 — DNA & Protein Synthesis
- [ ] DNA double helix SVG with subtle rotation
- [ ] Step-through UI for DNA replication (Prev / Next, 6 steps)
- [ ] Click-to-match base-pair mini-game (A↔T, C↔G)
- [ ] Protein synthesis SVG — transcription + translation
- [ ] Codon decoder mini-game (mRNA codon → amino acid)
- [ ] Step content tagged middle/high

### Phase 5 — Quiz engine + content
- [ ] `js/quiz.js` — reads `?module=X`, pulls 5 of 8–10 questions
- [ ] `data/quiz-data.js` — high-school pool (~30 questions)
- [ ] Quiz UI — question card, 4 answer buttons, per-question feedback
- [ ] Results screen — score, breakdown, retry / back / home
- [ ] Save best score + badges via progress.js
- [ ] Home page cards reflect quiz status (already wired)

### Phase 6 — Polish & submit
- [ ] Middle-school question pool (~30 more questions)
- [ ] Mobile testing on a real phone
- [ ] Share live link with 2–3 testers
- [ ] Fix top 3 feedback issues
- [ ] Accessibility pass (SVG `<title>`, keyboard, color contrast)
- [ ] App description for the submission
- [ ] 1–3 minute demo video
- [ ] Final GitHub Pages deploy

### Stretch (post-MVP, if time)
- [ ] Build-a-cell drag-and-drop sandbox
- [ ] Dark mode
- [ ] Glossary page (cross-linked terms)
- [ ] Sound effects (toggleable)
- [ ] Quiz streak counter
- [ ] Print-friendly study sheet
- [ ] Share-a-score URL
