---
target: HomePage
total_score: 28
max_score: 32
na_heuristics: 5,9
p0_count: 1
p1_count: 1
target_identity: "file:/Users/olgaurbach/Documents/ioBroker.docs/engine-2/front-end/src/pages/HomePage"
timestamp: 2026-09-18T10-00-43Z
slug: engine-2-front-end-src-pages-homepage
---
# Critique: ioBroker HomePage

Method: dual-agent (A: design-review · B: detector) · Surface: HomePage · Mode: Persuade

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Demo tabs show state; no scroll/section indicator on an 8-section page |
| 2 | Match System / Real World | 4 | Language matches user exactly (Zigbee/Modbus/KNX); Connect→Understand→Automate→Visualise = real mental model |
| 3 | User Control & Freedom | 3 | Demo switchable, FAQ as details; no back-to-top on long page |
| 4 | Consistency & Standards | 4 | // label, 01/ numbering, Audiowide rationing, one-blue throughout |
| 5 | Error Prevention | n/a | No inputs on the page |
| 6 | Recognition Rather Than Recall | 3 | Nav + logos help; install CTA appears only once (Hero), absent at page end |
| 7 | Flexibility & Efficiency | 3 | Header has Cmd+K search + docs deep-links; weak: no persistent install CTA |
| 8 | Aesthetic & Minimalist | 4 | Calm Control Room honored — tonal surfaces, hairlines, one accent, no gradient |
| 9 | Error Recovery | n/a | No error states on this marketing surface |
| 10 | Help & Documentation | 4 | Docs + search in persistent header; FAQ answers pre-install questions inline |
| Total | | 28 / 32 | Good (87.5%) |

n/a: heuristics 5, 9 (no inputs / no error states). Applicable max 32.

## Design-Specificity Verdict

LLM: Authored, not category-interchangeable — decisively. // prefixes, [ ] bracket frames on community stat cards (CommunitySection.tsx:69,114), concrete ioBroker copy (Zigbee/Modbus/KNX/vendor cloud), real adapter logos (Shelly, FRITZ!Box, KNX, HomeMatic), DemoSection redraws the real Rules/Blockly/TypeScript editors. Only generic move: Benefits 4-tile grid.

Deterministic scan (detector): exit 2, 2 findings, both rule `side-tab` in DemoSection/BlocklyEditor.styles.ts:215-216 (borderLeft/borderRight '8px solid'). Both very likely FALSE POSITIVES — rule targets the asymmetric single-side AI tell; here left+right are set together = symmetric frame on the Blockly editor. Rest of HomePage + sections clean.

Visual overlays: unavailable (no browser automation tool exposed; no dev server started).

## Overall Impression

Confident, well-authored; carries its "engineer's platform" positioning in every section. Biggest single opportunity: the ending. After 8 persuasion sections there is no action path — the persuaded first-timer lands on a 9-question FAQ and must reverse-scroll to install. The Persuade loop never closes at the bottom.

## What's Working

1. Signature system is load-bearing, not decorative (// labels, [ ] community brackets, 01/ numbering) — matches PRODUCT.md positioning; DESIGN.md Comment-Prefix Rule honored.
2. DemoSection is the standout — shows the three real notations with proper ARIA tablist semantics and a stacked stage so the card doesn't jump height. Honest, specific, accessible.
3. Honest, calm numbers — adapter count floored to "790+", community counts live from useForumStats, no invented testimonials. Fully compliant with Evidence-on-Hand constraint.

## Priority Issues

[P0] No install CTA at page end; primary conversion path fires exactly once.
- Why: North star is installation success (PRODUCT.md). Install button lives only in Hero (HeroSection.tsx:72); page ends on FAQ with no action path. Measurable drop-off.
- Fix: Closing "Start in 3 steps → To installation" section (the already-built-but-commented-out StartSection, copy home.start.install, fills this) and/or sticky install affordance after Hero scrolls out.
- Command: /impeccable onboard (secondary bolder).

[P1] FaqSection ships 9 questions — breaks the <=4 rule and its own design intent.
- Why: Component comment says "four questions"; array is 9 (FaqSection.tsx:8). Nine collapsed rows at the emotional tail = decision fatigue.
- Fix: Show top 3-4 pre-install questions inline (cost, devices, cloud, hardware); move rest behind "More questions ->" to an FAQ/docs page.
- Command: /impeccable distill.

[P2] Sequence-vs-list ambiguity between PlatformSection and BenefitsSection.
- Why: Both use identical 01/-04/ tiles, but Platform is a sequence and Benefits a parallel list (BenefitsSection.tsx:11-14 notes "no sequence"). UI doesn't signal the difference.
- Fix: Give Platform chain a directional cue (flowLine connector exists — make it an arrow/rail); drop numbering on Benefits so it reads as a set.
- Command: /impeccable clarify (secondary layout).

[P3] Hero layout pinned to measured German string widths — fragile across 4 languages.
- Why: HeroSection.styles.ts hardcodes constants (SUPPORT_BLOCK_WIDTH=205, clamp((100vw-328px)/31)) tied to German text widths; file warns "measure it again". ru/zh-cn differ; trust line can render at 8px via clamp.
- Fix: Replace magic-number widths with intrinsic sizing (fit-content, min()); verify Hero fold in ru/zh-cn.
- Command: /impeccable harden.

## Persona Red Flags

- Jordan (first-timer): persuaded, scrolls 8 sections, hits 9-item FAQ, must reverse-scroll to install. Platform tiles deep-link into dense docs with no "you are here".
- Riley (stress tester): expands all 9 FAQ, notes comment/reality mismatch. Probes Hero 600-900px and absolute-positioned donation block (calc(100vw-300px)). Looks for focus-visible ring on [ ] JOIN buttons and FAQ summaries.
- Casey (mobile): Hero well-optimized (svh, clamp, touch-target pads). Risk: trust line at 8px; AdaptersSection maintains a separate 25-tile mobile grid (second source of truth).
- German smart-home hobbyist (adopter): best served (idiomatic German, forum front-and-center, Modbus/Zigbee/KNX). Gap: forum link buried in CommunitySection JOIN button; wants forum one tap from Hero.

## Minor Observations

- Four built-but-commented-out sections (AboutSection, StartSection, NewsletterSection, InstallationsSection). StartSection fills the P0 gap; NewsletterSection would satisfy the [ ] newsletter-field signature that DESIGN.md names (currently absent live).
- InstallationsSection (live install stats) is dead — yet PRODUCT.md lists real usage stats as Evidence on Hand. High-trust, on-brand ([ ] frame), unused.
- CommunitySection has large dead commented-out copy blocks (:9-15).
- i18n home.about.items carries a legacy 14-item ALL-CAPS list no rendered section consumes.

## Questions to Consider

1. You persuade for 8 sections then offer no way to act — is the FAQ the note you want to end on, or did the CTA get lost when StartSection was commented out?
2. DemoSection is your best asset but sits third, below a generic Platform explainer — should "show me what I can build" come before "what is a translator layer"?
3. The donation block is more prominent in the Hero than any secondary action — is "support us" before install the right emotional order?
