---
name: ioBroker Docs
description: The official multilingual documentation site for the ioBroker smart-home platform — calm reading surfaces with precise technical marks.
colors:
  primary: "#1D90CA"
  primary-deep: "#005894"
  primary-soft: "#7ec3f3"
  primary-dark: "#1565c0"
  light-canvas: "#FFFFFF"
  light-surface: "#E6EEF7"
  light-raised: "#D6E4F2"
  light-overlay: "#C8DAEC"
  light-text: "#005894"
  light-text-subtle: "#3A678C"
  dark-canvas: "#080B1C"
  dark-surface: "#031D38"
  dark-raised: "#052E57"
  dark-overlay: "#06386B"
  dark-text: "#FFFFFF"
  dark-text-muted: "rgba(255, 255, 255, 0.78)"
  dark-text-subtle: "rgba(255, 255, 255, 0.55)"
typography:
  display:
    fontFamily: "Audiowide, Roboto, Arial, sans-serif"
    fontSize: "30px"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Audiowide, Roboto, Arial, sans-serif"
    fontSize: "22px"
    fontWeight: 400
    lineHeight: 1.23
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Audiowide, Roboto, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Roboto, Saira, Arial, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0.01em"
  label:
    fontFamily: "Audiowide, Roboto, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.02em"
rounded:
  chip: "8px"
  control: "10px"
  group: "12px"
  card: "16px"
  pill: "999px"
spacing:
  unit: "8px"
  grid: "24px"
  gutter: "32px"
  section-sm: "48px"
  section-md: "64px"
  section-lg: "96px"
components:
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "10px 20px"
    height: "44px"
  button-outline-hover:
    backgroundColor: "{colors.light-raised}"
    textColor: "{colors.primary-deep}"
    rounded: "{rounded.control}"
  button-surface:
    backgroundColor: "{colors.light-surface}"
    textColor: "{colors.primary-deep}"
    rounded: "{rounded.card}"
    padding: "20px"
  button-surface-hover:
    backgroundColor: "{colors.light-overlay}"
    rounded: "{rounded.card}"
---

# Design System: ioBroker Docs

## Overview

**Creative North Star: "The Calm Control Room"**

ioBroker is an engineer's platform, and this documentation site reads like a well-kept control room: quiet, tonal surfaces carry the content, and the technical character lives entirely in a few precise marks — the wide Audiowide display face, the `//` that opens every section title, and the square `[ ]` brackets that frame a statistic. Nothing shouts. The brand blue is the single accent, and depth is built from lightness steps rather than lines or heavy shadows, so a card lifts off the page without ever being boxed in.

The system is deliberately restrained: one accent hue, one hairline value instead of hard borders, one spacing and radius scale, and a four-step reading vocabulary that keeps running text the same size on every page. Both a light and a dark theme are first-class; the dark theme is the atmospheric default (deep navy canvas with soft brand-blue glow behind imagery), the light theme a bright reading ground. Precision is the personality — the marks are exact, the surfaces are calm, and the two never trade places.

The site's job is to get a smart-home user installed and answer questions during operation, so legibility outranks expression: contrast targets are honored (running text stays above 4.5:1 in both themes), and the display drama is rationed to headings, labels, and the signature marks.

**Key Characteristics:**
- One accent (brand blue `#1D90CA`), used as the only voice of color.
- Depth from tonal surface steps + hairlines, not borders or hard shadows.
- Audiowide display face rationed to H1–H3, section titles, and buttons.
- Two signature marks: the `//` section-title prefix and the `[ ]` bracket frame.
- Dual light/dark themes, both held to a real reading-contrast floor.

## Colors

A single brand blue against calm, near-neutral surfaces; every step of depth is a lightness step of the same family, not a new hue.

### Primary
- **ioBroker Blue** (`#1D90CA`): The one accent. Buttons' arrows and labels, links, selected state, focus ring, the glow behind imagery, and — on dark — headings. On light backgrounds it is reserved for marks and controls because at body size it misses the reading-contrast line.
- **Deep Signal Blue** (`#005894`): The readable accent on light. Headings, running text, and footer links on the white ground all carry this tone (7.4:1 on white), so on the light theme text and buttons speak in one blue. Also the light theme's `secondary`.
- **Sky Soft** (`#7ec3f3`): Hover lightening of the accent and the soft link tone on dark surfaces.

### Neutral
Surfaces are a four-step ladder per theme, spaced ~5–7 points of perceptual lightness so a card is legible against the page without a border.
- **Light ladder** — Canvas `#FFFFFF` → Surface `#E6EEF7` → Raised `#D6E4F2` → Overlay `#C8DAEC`.
- **Dark ladder** — Canvas `#080B1C` → Surface `#031D38` → Raised `#052E57` → Overlay `#06386B`.
- **Reading text (light)** — Primary `#005894`, side-note Subtle `#3A678C` (kept ≥4.6:1 even on a hovered card).
- **Reading text (dark)** — Primary `#FFFFFF`, Muted `rgba(255,255,255,0.78)`, Subtle `rgba(255,255,255,0.55)`.
- **Hairline** — light `rgba(0,88,148,0.14)`, dark `rgba(126,195,243,0.14)`; a stronger `0.28` variant outlines controls.

### Named Rules
**The One Voice Rule.** Blue is the only accent on the site. There is no secondary or tertiary color role — if a screen needs to distinguish things, it does it with the surface ladder and hairlines, not with a new hue.

**The Steps-Not-Borders Rule.** Separation is a lightness step plus a single hairline. A hard, framing border is a defect; the hairline separates, it does not frame.

## Typography

**Display Font:** Audiowide (with Roboto, Arial fallback). Cyrillic has no Audiowide glyphs, so `html[lang='ru']` swaps the display face to Roboto.
**Body Font:** Roboto (with Saira, Arial fallback).

**Character:** A wide, geometric, slightly retro-technical display face used sparingly against a plain, highly legible body face. The contrast — engineered signage over quiet prose — is the whole type idea.

### Hierarchy
- **Display / H1** (Audiowide 400, 30px → 24px < 1280 → 20px < 600, line-height 1.1, letter-spacing −0.02em): Page title; also `SectionTitle` (rendered as `h4` variant at the same 30px look).
- **Headline / H2** (Audiowide 400, 22px → 18px < 600, 1.23): Section headings within a page.
- **Title / H3** (Audiowide 400, 16px, 1.3): Sub-headings; the smallest display use.
- **Body** (Roboto 400, 18px → 16px < 600, 1.55): Default running text (`body1`). Secondary text (`body2`) is 16px → 15px.
- **Label** (Audiowide 400, 15px, letter-spacing 0.02em, UPPERCASE): Buttons and dense labels; drops to 13px on phones so wide-face two-word labels don't break the control.

The reading scale is a fixed four-step vocabulary — lead 18/1.6, body 16/1.6, small 15/1.5, caption 13/1.5 — and a size outside it needs a reason.

### Named Rules
**The Rationed Display Rule.** Audiowide appears only in H1–H3, section titles, buttons, and statistic numbers. Body copy, table cells, and side notes are always Roboto.

**The Comment Prefix Rule.** Every section title is preceded by a literal `//`. It is the site's signature marginal mark, not decoration to be dropped.

**The Label-Heading Exception (404 page).** On the 404 page the semantic `h1` is the status line (`// SEITE NICHT GEFUNDEN`) and deliberately wears the small Audiowide **label** style — not the 30px display size. The visually largest line is the randomly drawn joke, set as ordinary Roboto running text (not a heading). Visual and semantic hierarchy diverge here on purpose: the fixed status must own the heading, because the joke changes on every visit and some jokes do not name what happened. This keeps the Rationed Display Rule intact — the `h1` is Audiowide, the joke is Roboto body.

## Layout

One text column of max 1312px with a per-breakpoint gutter (32px desktop/tablet, 20px phone), so the hero, docs, blog, and legal pages all stand on the same two vertical lines. Vertical section rhythm steps 96 / 64 / 48px (lg/md/sm); cards in a content grid sit 24px apart. The base spacing unit is 8px. Interactive controls are 44px tall (dense/header controls 36px). The layout stacks below the `sm` breakpoint (599px); there is no separate tablet gutter because the column is still wide enough for the full margin between 600–899px.

## Elevation & Depth

Depth is built primarily from the tonal surface ladder; shadows are a quiet secondary cue, never a frame. On light, shadows are tinted with the brand blue (`rgba(0,88,148,…)`) and stay soft. On dark, a card can't rely on a drop shadow against the near-black canvas, so each elevation pairs a faint **inset edge highlight** (a 1px brand-blue-tinted inner ring) with the shadow to keep the card's edge readable.

### Shadow Vocabulary
- **Card** (light `0 1px 2px rgba(0,88,148,0.10), 0 14px 32px -20px rgba(0,88,148,0.6)`; dark adds `inset 0 0 0 1px rgba(126,195,243,0.08)`): Resting cards and panels.
- **Raised** (deeper, wider spread): Hover state of large surface panels and lifted groups.
- **Overlay** (tighter, higher spread): Tooltips, menus, floating surfaces.
- **Focus Ring** (`0 0 0 2px #1D90CA`): Keyboard focus on any control.

### Named Rules
**The Edge-Light Rule (dark theme).** On dark, every elevated surface carries a 1px brand-blue inset ring. It is an edge highlight that keeps the card readable where the drop shadow vanishes into the canvas — remove it and dark cards lose their edge.

## Shapes

A soft, consistent radius scale keyed by role: chip 8px, control 10px, group 12px, card 16px, pill 999px. Corners are gently rounded, never sharp and never fully circular except for true pills. The system's one hard-edged form is deliberate: the **square bracket** `[ ]` motif — drawn as thin 10px-wide elements with top, bottom, and one side border in brand blue — frames statistic cards, the newsletter field, footer columns, and community tiles. Its right angles are the counterweight to the rounded surfaces.

## Components

### Buttons
- **Shape:** Rounded control (10px); the large panel variant uses card radius (16px).
- **Outline (default):** Transparent fill, a `1px` strong-hairline inset ring, 44px min height, `10px 20px` padding, min-width 250px. Label is Audiowide uppercase (blue); an arrow icon sits at the right — diagonal ("expand") or rotated to horizontal ("leads somewhere").
- **Surface (large panel):** A `surface`-step fill with the card shadow and 16px radius; content is top-left aligned. This is a full content panel that happens to be clickable.
- **Hover / Focus:** Outline lifts its background to the `raised` step; surface panels jump two steps to `overlay` plus the stronger edge light (one step is imperceptible over so large an area). Focus-visible replaces the ring with the 2px brand-blue focus ring. Transitions are 0.2s ease on background and shadow.

### Cards / Containers
- **Corner Style:** Card radius (16px); groups 12px.
- **Background:** The `surface` step, lifting to `raised`/`overlay` on hover.
- **Shadow Strategy:** The Card elevation token at rest (see Elevation & Depth); no framing border.
- **Border:** None — separation is the tonal step plus, at most, a hairline. Statistic and newsletter cards are the exception: they wear the `[ ]` bracket frame.
- **Internal Padding:** Off the 8px unit; content grids gap at 24px.

### Inputs / Fields
- **Style:** Sit on the `surface` step; autofilled fields are repainted into the theme's surface color so the browser's white never leaks in. Tooltips use the `overlay` surface with the overlay shadow, 13px Roboto.
- **Focus:** The 2px brand-blue focus ring.

### Navigation
- **Style:** Header uses the compact 36px control height. Links carry the reading tone at rest and the accent (`textColorHover`) on hover; the selected item takes the brand blue. Type is Roboto in nav; the Audiowide display face stays reserved for titles and buttons.

### Signature: The Bracket Frame `[ ]`
A pair of thin vertical rules capped top and bottom, 10px arms in brand blue, wrapping a piece of content (a statistic, the newsletter field, a footer column). The arm length is also the content's inset, because content begins where the arm ends. It reads as a mark, not a container — the site's most recognizable device.

### Signature: The `//` Section Title
Section titles are Audiowide, brand blue, and always prefixed with a literal `//` followed by a space. One fixed 40px gap sits between the title and the text beneath it, everywhere.

## Do's and Don'ts

### Do:
- **Do** keep brand blue (`#1D90CA` / deep `#005894`) as the only accent; build every other distinction from the surface ladder and hairlines.
- **Do** convey depth with tonal steps first and soft (blue-tinted on light) shadows second; on dark, always include the 1px inset edge light on elevated surfaces.
- **Do** ration Audiowide to H1–H3, section titles, buttons, and statistic numbers; set everything else in Roboto.
- **Do** prefix every section title with `// ` and keep the fixed 40px gap below it.
- **Do** use the `[ ]` bracket frame for statistics, the newsletter field, and footer columns — and keep the arms short (10px) so it reads as a mark.
- **Do** hold running text to the four-step reading scale and to ≥4.5:1 contrast in both themes.

### Don't:
- **Don't** introduce a second accent color or a purple/gradient scheme; there is one voice.
- **Don't** wrap cards in hard framing borders — a border that frames instead of separates is a defect; use a step + hairline.
- **Don't** set body copy, table cells, or side notes in Audiowide, and don't use Audiowide for Russian (no Cyrillic glyphs — fall back to Roboto).
- **Don't** invent radii, spacings, or text sizes outside the documented scales without a stated reason.
- **Don't** drop the `//` prefix or the `[ ]` brackets — they are the identity, not ornament.
