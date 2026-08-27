![Logo](admin/autodoc.png)

# ioBroker.autodoc

Automatically generates structured documentation (HTML, Markdown, JSON) for your ioBroker installation — on demand, on a schedule, or when the system changes.

**Version:** 0.9.46

**Installation**

1. Open **[ioBroker Admin](https://www.iobroker.net/#en/documentation)** and install **`iobroker.autodoc`** from the adapter list.
2. Official adapter index: **[ioBroker.repositories](https://github.com/ioBroker/ioBroker.repositories)** (**latest**). Maintainer workflow / PR: **[TODO — § 1.1 Release](TODO.md#release-veroeffentlichung)**.

| | |
| --- | --- |
| **Repository** | [github.com/crunchip77/ioBroker.autodoc](https://github.com/crunchip77/ioBroker.autodoc) |
| **Issues** | [GitHub Issues](https://github.com/crunchip77/ioBroker.autodoc/issues) |

**CI:** ![Test and Release](https://github.com/crunchip77/ioBroker.autodoc/workflows/Test%20and%20Release/badge.svg)

## Description

The adapter scans adapters, hosts, rooms, functions, scripts, aliases, userdata, and related metadata, then writes **three profiles** in one run:

| Profile | Audience | Focus |
| --- | --- | --- |
| **Admin** | Operators | Instances, hosts, resources, scripts, maintenance hints, diagnosis |
| **User** | Household | Rooms, devices, automations in plain language |
| **Onboarding** | Guests | Welcome, capabilities, QR / link to the latest HTML |

Exports are written under `/files/autodoc.<instance>/` (latest HTML + rotated timestamped `.md` / `.html` / `.json`). Optional notifications and **opt-in AI** text (separate providers) can enrich the docs.

## Requirements

- **Node.js** ≥ 22 (see `package.json` → `engines`)
- **ioBroker.js-controller** ≥ 6.0.11 (declared in `io-package.json` → `common.dependencies`)
- **ioBroker Admin** ≥ 7.6.20 (declared in `io-package.json` → `common.globalDependencies`) — needed for the **json** configuration UI and `jsonConfig` features (e.g. `textSendTo`, collapsible panels)

No other adapters are **required** for AutoDoc itself. Optional: a **web server** adapter if you want to open generated files from outside the Admin file browser; exports are always available under `/files/autodoc.<instance>/`. **PDF** profiles need the optional npm package **`puppeteer`** (bundled Chromium) installed in the adapter directory — see **Optional PDF export** below.

## Configuration

### Documentation instance overview

Configure the instance in **ioBroker Admin** (tabs for basics, manual notes, advanced options, notifications, AI). Generation can be triggered manually, on startup, on a timer, and after adapter changes (debounced).

**Documentation language** (Basic settings) drives headings and fixed wording in **all HTML profiles** and in Markdown. It also controls the **short summary lines** for inventory comparison (“changes since last run”) and for **changelog** cards when you regenerate — older stored changelog rows are shown in the **current** export language, not the language they had when saved.

In **Advanced → What to include & limits**, **Hide “changes since last run” in Admin exports** removes only the yellow delta box at the top of the **Admin** HTML system chapter and the matching subsection in **Admin** Markdown. The **Changelog** chapter, **User**, and **Onboarding** exports are not affected.

The **User / Family** profile adds a brief everyday sentence after the title block when AutoDoc found **at least one** inventory change since the previous snapshot (skipped on the first run and when nothing changed). **Onboarding** does not include that extra notice.

Short **orientation** for operators (install paths, tabs, exports, hashes, checker): **[`docs/user-guide/README.md`](docs/user-guide/README.md)** · **German** config wiki (tabs, screenshots, demo scenario): **[`docs/user-guide/README.de.md`](docs/user-guide/README.de.md)**.

Useful **states** (selection): `action.generate`; **`action.exportPdf`** (writes **PDF** profiles from the latest HTML under `/files` when optional **`puppeteer`** is installed in the adapter directory — no full regeneration); `info.lastGeneration` / `info.nextGeneration`; `info.htmlUrlAdmin` / `info.htmlUrlUser` / `info.htmlUrlOnboarding`; `info.templateVersion` (HTML template / renderer alignment); `info.forumCardPlain` (plaintext “system card” for forums, updated when documentation is generated).

**Exports & storage:** after each successful run, **`documentation.exportHashes`** holds **SHA-256 (hex)** for the latest MD / JSON / Admin HTML served from `/files`, and **merges digests for `autodoc-{admin,user,onboarding}.pdf`** whenever a PDF export step wrote those files. Canonical full Markdown, JSON model, and Admin HTML live **only** under **`/files/`** (`autodoc-latest.*`, profile HTML). The states **`documentation.markdown`**, **`documentation.html`**, and **`documentation.json`** hold **short placeholders** only — use **`info.htmlUrl*`**, **`/files/`**, or download actions for full text.

### Media, Redis, and state storage (short)

- **Canonical exports** always live under **`/files/autodoc.<instance>/`** and are **overwritten** each run (no accumulation of old HTML versions there).
- **`documentation.*` body states** are **placeholders only** (large payloads are not duplicated in the object database). Scripts and integrations that need **full text** read **`/files/`** or use **`info.htmlUrl*`** / download actions.
- **Photos and large binaries:** do **not** store big images or blobs as **large state values** in ioBroker’s **object database** — **especially with Redis** (binary payloads inflate RAM). Use **external URLs** (your NAS, HTTP server) or small **inline SVG** diagrams; the same guideline keeps **jsonl** setups predictable. AutoDoc keeps **full** Markdown/HTML/JSON under **`/files/`**; **`documentation.markdown`**, **`documentation.html`**, and **`documentation.json`** are **short placeholders** only — not a media store.
- Rationale, options, and future media work: [`PLAN.md` — Media (MVP) & limits](PLAN.md#architektur-medien-mvp) and [Architecture boundaries](PLAN.md#architektur-grenzen).

### Public base URL

The **Onboarding** HTML includes a QR code and a **Copy link** control. Both use the same target: the onboarding file under `/files/autodoc.<instance>/autodoc-onboarding.html`, prefixed with the **ioBroker base URL** from the adapter settings (**Advanced** tab: *ioBroker base URL (optional)*).

- Set the base URL to what you use in the browser to reach ioBroker (scheme, host, port if needed), **without** a trailing slash. Examples: `https://home.example.com:8081`, `http://192.168.1.10:8081`.
- If it is **empty or wrong**, guests scanning the QR code or using the copied link from another device may get a broken or internal-only URL. After changing it, run documentation generation again so the HTML is rebuilt.

### Optional filesystem export (Docker / NAS)

**Filesystem export path** writes the three HTML profiles to a real directory (in addition to ioBroker’s `/files/…` storage). In **Docker**, map a host folder into the container and set **export path** to the **container-side** path (not the Unraid/host path). See the field help in Admin for a short reminder.

### Optional PDF export (Puppeteer)

**Best effort:** after a successful documentation run, you can create **`autodoc-admin.pdf`**, **`autodoc-user.pdf`**, and **`autodoc-onboarding.pdf`** from the same HTML that is stored under `/files/` (headless Chromium via **`puppeteer`**, declared as an **optional** npm dependency — same major line as **`@mermaid-js/mermaid-cli`**). Enable **Generate PDF after each documentation run** in **Advanced** next to the filesystem export, or trigger **`action.exportPdf`** manually. PDFs are written under **`/files/autodoc.<instance>/`** and mirrored to **Filesystem export path** when that path is set. **Embedded Mermaid SVG** (when mmdc ran during generation) prints without extra network; **jsDelivr** client Mermaid still needs internet during the PDF step. Without a working Chromium stack, PDF creation is skipped with a clear log line — HTML/Markdown generation is unaffected.

### AI context hints (guest vs resident)

**AI context hints** are injected only into the LLM prompt; they are **not** printed in the documentation. For **guest onboarding**, prefer everyday facts. Heavy IT or project wording (adapters, repos, …) can cause the model to leak jargon into guest text; a **safety step** then replaces that AI block with neutral guest wording. That is intentional. The **resident / family** profile does not use the same guest-only restriction. Configure them in Admin under **KI documentation / AI documentation** (after enabling a provider); full wording appears in the hint above the field.

Copy-paste **examples** (field IDs, syntax): [**Mermaid**](#mermaid-cookbook-examples) · [**JSON arrays**](#json-cookbook-snippets) · [**Custom CSS**](#html-custom-css-examples). **Stable URLs** for bookmarks / Admin `staticLink`: **`blob/main/README.md#…`** — GitHub opens Markdown in **Preview** (readable); fragments match heading slugs below (same names as local `#…` links). Scroll-to-section is **best effort** in GitHub’s viewer; **repository root** URLs like `…/ioBroker.autodoc#json-cookbook-snippets` remain unreliable. After large README edits, **re-check slugs** against **`blob/main`**.

`https://github.com/crunchip77/ioBroker.autodoc/blob/main/README.md#documentation-instance-overview`

`https://github.com/crunchip77/ioBroker.autodoc/blob/main/README.md#public-base-url`

`https://github.com/crunchip77/ioBroker.autodoc/blob/main/README.md#optional-pdf-export-puppeteer`

`https://github.com/crunchip77/ioBroker.autodoc/blob/main/README.md#mermaid-cookbook-examples`

`https://github.com/crunchip77/ioBroker.autodoc/blob/main/README.md#json-cookbook-snippets`

`https://github.com/crunchip77/ioBroker.autodoc/blob/main/README.md#html-custom-css-examples`

<h3 id="mermaid-cookbook-examples">Mermaid cookbook examples</h3>

Paste into **My documentation → Mermaid diagram** (`manualMermaidDiagram`). Use **plain line breaks** inside the field (no HTML). Prefer **`flowchart LR`** so wide diagrams fit the HTML page; very large graphs are hard to read — split concepts across separate diagrams if needed.

**Embedded SVG:** when **`@mermaid-js/mermaid-cli`** is installed in the adapter directory and generation succeeds, diagrams become inline SVG in HTML (good for offline / PDF). If embedding fails or the CLI is missing, the export keeps a `<pre class="mermaid">` block and the browser may load Mermaid from jsDelivr — see **Optional PDF export** and **`docs/user-guide`** (“Optional Mermaid CLI”).

Minimal left-to-right overview:

```text
flowchart LR
  Internet([Internet]) --> Router[Router]
  Router --> ioB(ioBroker host)
  ioB --> Heating[Heating adapters]
  ioB --> Lights[Lights / rooms]
```

Small **subgraph** (group related nodes):

```text
flowchart LR
  subgraph LAN["Home LAN"]
    A[js-controller] --> B[javascript.0]
    A --> C[other instances]
  end
```

**Tips**

- Stick to **supported Mermaid** constructs you have seen working elsewhere; exotic directives may break `mmdc`.
- **Auto host topology** is separate (`autoMermaidHostGraph`); hide it with **`mermaidAuto`** in **Admin/User** hide lists (see `EXTRA_HIDDEN_CHAPTER_IDS` in `lib/docTemplateConfig.js`). The **manual** Mermaid diagram lives under **`manual`** on **Admin** — hide that chapter if you want it gone. On **User**, field help lists **`mermaid`** and **`mermaidAuto`** separately; on **Onboarding**, use **`mermaid`** for the owner diagram in the welcome area (see that tab’s help).

<h3 id="json-cookbook-snippets">JSON cookbook snippets</h3>

Admin stores these fields as **strings**; content must be **valid JSON** (`"` keys/strings, no trailing commas). Empty roster means defaults: use **`[]`** where you do not want to override order or hide anything.

German **scenario page** (“hide first vs reorder”, copy-paste walkthrough anchored to Step 6): **[`README.de.md` — Wiki — Step 6](https://github.com/crunchip77/ioBroker.autodoc/blob/main/docs/user-guide/README.de.md#wiki-admin-json-cookbook)** (`docs/user-guide/`).

**Allowed chapter ids** come from the adapter (`lib/docTemplateConfig.js`):

| Profile | Order fields | Hidden fields | Notes |
| --- | --- | --- | --- |
| Admin | `adminChapterOrderJson` | `adminHiddenChaptersJson` | Order default: `manual`, `system`, …, `appendices`. Extra hide-only id: **`mermaidAuto`** (auto-host topology). The **manual** Mermaid diagram is part of **`manual`** — omit that chapter entirely to drop it from Admin exports. |
| User | `userChapterOrderJson` | `userHiddenChaptersJson` | Keys include `manual`, `ai`, `guestHelp`, `atAGlance`, `rooms`, `scripts`, `routines`, `ownerPlaybook`, `mermaid`, `adapters`, `custom`, `system`, `troubleshooting`. |
| Onboarding | `onboardingChapterOrderJson` | `onboardingHiddenChaptersJson` | Keys include `welcome`, `quickstart`, `tips`, `guestHelp`, `stats`, `ai`, `capabilities`, `mermaid`, `rooms`, `routines`, `ownerPlaybook`, `automations`, `adapters`, `custom`, `hint`, `system`, `manual`. |

**Reorder Admin** — put system overview directly after manual context:

```json
["manual", "system", "adapters", "rooms", "scripts", "schedule", "userdata", "aliases", "maintenance", "diagnosis", "troubleshooting", "custom", "changelog", "appendices"]
```

**Hide** Admin changelog and appendices:

```json
["changelog", "appendices"]
```

**Hide User scripts chapter:**

```json
["scripts"]
```

**Reorder User** — bring **`system`** up after rooms (full key list, same ids as default order otherwise):

```json
["manual", "guestHelp", "ai", "atAGlance", "rooms", "system", "scripts", "routines", "ownerPlaybook", "mermaid", "adapters", "custom", "troubleshooting"]
```

**Custom Markdown chapters** (`customDocSectionsJson`) — array of objects with **`title`**, **`body`** (or **`bodyMarkdown`**), optional **`profiles`** (`"admin"` | `"user"` | `"onboarding"`). Omit **`profiles`** to show in **all** profiles.

```json
[
  {
    "title": "Emergency contacts",
    "body": "## Numbers\n- **Repair:** …\n- **Utility:** …",
    "profiles": ["user", "onboarding"]
  },
  {
    "title": "Operator notes",
    "body": "## Rack layout\nShort **Markdown** only; keep secrets out.",
    "profiles": ["admin"]
  }
]
```

Max **12** sections; very long bodies are truncated at generation time.

<h3 id="html-custom-css-examples">HTML custom CSS examples</h3>

Under **Admin → HTML export & extra sections**, **Font stack** (`htmlFontStack`) and **Extra CSS** (`htmlExtraCss`) tweak only the **exported HTML** (not Markdown). The renderer wraps pages in `lib/htmlRenderer.js` (`wrapPage`): sidebar links live under **`nav ul li a`**, layout uses **`#layout`**, **`nav`**, and **`main`** — inspect generated HTML if you need a selector.

**Font stack:** one CSS `font-family` list (risky characters `< > { }` are stripped). Example paste:

```css
"Source Serif 4", Georgia, serif
```

**Extra CSS:** append short rules after the built-in stylesheet. Prefer **existing palette tokens** (`var(--link)`, `var(--nav-bg)`, `var(--border)`, `var(--surface)`, … from the `:root` / `body.dark` blocks); **`htmlThemePreset`** swaps those via `html.autodoc-preset-*` classes — there is no separate `--accent` token on `:root` (some components use `var(--accent, #0066cc)` as a **local** fallback only).

Starter snippet you can paste into **Extra CSS**:

```css
nav { width: 260px; }
nav ul li a:hover { opacity: 0.92; }
h2 { border-bottom-color: var(--link); }
```

## Features (overview)

- Discovery across instances, hosts, enums, scripts, aliases, userdata, system config
- Standalone HTML per profile with search, dark mode, responsive layout
- Markdown + JSON export and version history (rotation configurable)
- Maintenance-oriented hints (documentation score for open checklist items; disabled instances listed as inventory, not penalized)
- Multilingual Admin UI strings (EN / DE / FR full; more locales with English copy until translated — [CONTRIBUTING](CONTRIBUTING.md#admin-ui-translations-i18n)); generated documentation text follows **Documentation language**, including changelog/compare summary lines and optional inventory-change notices in User exports
- Optional AI providers (e.g. Ollama, Groq, Anthropic) with strict opt-in

For **roadmap and planning**: [`TODO.md`](TODO.md) (open work at the top, full completed checklists in the appendix) and [`PLAN.md`](PLAN.md) (vision, rationale, architecture brainstorming).

**Contributing / releases:** see [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Changelog

**Admin `common.news`** in `io-package.json` lists only versions **published on npm** (Adapter Checker **E2004**). The detailed sections below are the **user-facing** changelog (Git-era releases plus npm); older entries are in [`CHANGELOG_OLD.md`](CHANGELOG_OLD.md).

### 0.9.46 (2026-06-28)

- (mcm1957) `info.summary` state now outputs English text by default
- (mcm1957) Periodic documentation generation switched from `setInterval` to `setTimeout`-at-end — prevents overlapping runs
- (mcm1957) `autoGenerateInterval` code-level minimum clamp of 0.1 h with warning log
- (mcm1957) README: GitHub install instruction removed (E6013)
- (fix) `common.news` 0.9.37 / 0.9.38 / 0.9.44 translated into es, it, nl, pl, pt, ru, uk, zh-cn (E1144)
- (fix) `admin` minimum version bumped to `>=7.8.23`

### 0.9.45 (2026-06-18)

- **ioBroker conformance — object structure:** Added channel parent objects (`action`, `documentation`, `info`, `versioning`) to `instanceObjects` in `io-package.json` — required by ioBroker object checker (E3009) for **ioBroker.repositories** review.
- **ioBroker conformance — timers:** `adapter.delay()` (ioBroker base class) for AI retry delays; `window.setTimeout` / `globalThis.setTimeout` in browser-side and utility code — no bare `setTimeout` in adapter runtime (E5005/W5004 fixes).
- **i18n:** All 10 supported languages translated via `@iobroker/adapter-dev` (Google Translate); `de` and `fr` remain manually maintained. Missing keys synced across all locales.
- **Dependencies:** `@iobroker/adapter-core` → 3.4.1, `cytoscape` → 3.34.0.

### 0.9.44 (2026-05-14)

- **Chapter JSON & logs:** Each documentation run evaluates Admin/User/Onboarding chapter order and hide JSON. **English** adapter **`warn`** lines report invalid JSON shape, **unknown** chapter ids, and **duplicate** ids, with a pointer to the **[German user guide — JSON cookbook](https://github.com/crunchip77/ioBroker.autodoc/blob/main/docs/user-guide/README.de.md#wiki-admin-json-cookbook)**. Identical warning **lines** are **deduplicated** per adapter **log** reference (process lifetime). Values read only from **legacy** native keys are labeled **`…Json via native …`** in the log. **`lib/chapterConfigWarnings.js`**; wired from **`DocumentModel.buildDocumentModel`**. **`EXTRA_HIDDEN_CHAPTER_IDS`** exported from **`docTemplateConfig`** for hide-list validation.
- **Admin i18n:** Extended **`?`** help for the six chapter order/hide JSON fields (log + GitHub links under **Which chapters to show (per profile)**) — **DE/FR** translated, **EN** + other locales as fallbacks.
- **Quick Start (5.x.2):** Room highlight **`HIGHLIGHT_CATEGORY_RANK`** extended (**`leak`**, **`co2`**, **`valve`**, **`weather`**, **`sensor`**, …); function areas with equal **member count** tie-break by **name**.
- **HTML template:** **`RENDERER_VERSION`** in **`lib/htmlRenderer.js`** bumped so instances that skip “generate on start” still **regenerate once** after the adapter update (**`info.templateVersion`** vs renderer marker).
- **Docs maintainer:** **`docs/user-guide/assets/SCREENSHOTS.md`** notes that tooltip-only changes often need **no** new PNG.

### 0.9.43 (2026-05-13)

- **Admin / Adapter Checker:** **`common.news`** lists only semver versions that exist as tarballs on **npm** (ioBroker Adapter Checker **E2004**). Removed **`news`** keys **0.9.39**, **0.9.40**, and **0.9.41** — those bumps never shipped to the registry between **0.9.38** and **0.9.42**. Full narrative for **0.9.41–0.9.39** is kept in **`CHANGELOG_OLD.md`** (README changelog window matches the **`common.news`** version set).
- **`common.news` copy:** **0.9.42** admin news now compares against **0.9.38** (last npm release before **0.9.42**).
- **Runtime:** unchanged.

### 0.9.42 (2026-05-13)

- **npm / process:** Patch **0.9.42** — **no functional change** vs **0.9.38** (previous tarball on npm before **0.9.42**); `package.json` / `io-package.json` / README **`Version:`** aligned for npm publish only (release-script housekeeping).

### 0.9.38 (2026-05-12)

- **Advanced — storage (historical npm note):** release **0.9.38** introduced default **`metadata`** for **new** instances so full exports prefer **`/files/`** (`common.news`). **All** installs now behave like that **without** a toggle — **`documentationStatesMode`** was dropped in **0.9.39** (always placeholders + **`/files/`**).

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

<!-- Maintainer: Admin staticLinks — under chapter visibility: English README `#json-cookbook-snippets`, Wiki DE `#wiki-admin-json-cookbook`. Schnellzugriff in README.de; SCREENSHOTS table for PNG drift; Sync jsonConfig/i18n if URLs change. -->

Copyright (c) 2026 crunchip77 <41550245+crunchip77@users.noreply.github.com>
