---
chapters: {"pages":{"en/adapterref/iobroker.autodoc/README.md":{"title":{"en":"ioBroker.autodoc"},"content":"en/adapterref/iobroker.autodoc/README.md"},"en/adapterref/iobroker.autodoc/TODO.md":{"title":{"en":"AutoDoc Adapter — TODO-Liste"},"content":"en/adapterref/iobroker.autodoc/TODO.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/README.md":{"title":{"en":"AutoDoc — user guide (first steps)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/README.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/README.de.md":{"title":{"en":"AutoDoc — Konfiguration der Instanz (Wiki)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/README.de.md"},"en/adapterref/iobroker.autodoc/PLAN.md":{"title":{"en":"AutoDoc Adapter — Projektplan"},"content":"en/adapterref/iobroker.autodoc/PLAN.md"},"en/adapterref/iobroker.autodoc/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.autodoc"},"content":"en/adapterref/iobroker.autodoc/CONTRIBUTING.md"},"en/adapterref/iobroker.autodoc/docs/iobroker-adapter-references.md":{"title":{"en":"ioBroker-Adapterentwicklung — Referenzen (adapter-neutral)"},"content":"en/adapterref/iobroker.autodoc/docs/iobroker-adapter-references.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md":{"title":{"en":"Echte Screenshots für den User-Guide (optional)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md"}}}
---
# AutoDoc — user guide (first steps)

Structured help for **operators** who install and run the adapter from the [GitHub repository](https://github.com/crunchip77/ioBroker.autodoc).

- **German** wiki — Admin tabs, screenshots, fictional **„Muster‑Einfamilienhaus“** practice scenario: **[`README.de.md`](/#/docs/adapterref/iobroker.autodoc/docs/user-guide/README.de.md)**  

**Figures:** For several tabs you get **two images in a row**: an **SVG wireframe** (what belongs where — not real pixels) and then a **PNG** of the real Admin UI (all six tabs covered). That pairing is **intentional**. If embedded images look small on GitHub, **open the image in a new tab** or zoom the page; see **[`SCREENSHOTS.md`](/#/docs/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md)** (*Legibility*, **when to reshoot**, privacy). Naming and privacy: same file. Per-field tooltips in Admin (`?`) remain authoritative. Project overview: **[README](/#/adapters/autodoc)**.

## Prerequisites

- **Node.js** ≥ 22  
- ioBroker versions as declared on the README under **Requirements**  

## Installation (URL / clone)

Install via [npm **`iobroker.autodoc`**](https://www.npmjs.com/package/iobroker.autodoc), Git URL / clone, or (after the **ioBroker.repositories** PR merges) the ioBroker Admin default adapter list — see main README **Install**. Default lists are maintained in **[ioBroker.repositories](https://github.com/ioBroker/ioBroker.repositories)**. After adding an instance, open **Instances → AutoDoc.X → Config**.

## Admin tabs (what to configure first)

1. **Basic settings** — project name, documentation language, markdown profile preference, timers and triggers (“Generate …”).  
2. **Manual documentation (“My documentation”)** — human text for households and guests (`guestHelpNote`, playbook, troubleshooting quick lines). Optional **Mermaid** diagrams: see field help there (embedded SVG vs. browser/CDN fallback).  
3. **Advanced** — optional **Filesystem export path**, optional **PDF after each run** (needs **`puppeteer`**), **`documentation.exportHashes`** (summarised below); large exports always under **`/files/`** (see Admin hint).  
4. **HTML export & extra sections** — themes, chapter visibility/order, custom sections; the intro text on that tab also points to **PDF** settings (they live under **Advanced**).  
5. **Notifications** / **AI** — optional; opt-in only.

### Figures

**SVG wireframes** and **PNG screenshots** are **paired on purpose**: the SVG is a **schematic** of the same tab; the PNG is the **real** Admin view (demo instance; layout varies by theme/version). GitHub’s inline preview often shrinks images — **click through** to the full-resolution file or use browser zoom to read small labels.

![Basic settings — schematic](assets/fig-tab-grundeinstellungen.svg)

*Real Admin UI:*

![Basic settings tab — screenshot](assets/screen-grundeinstellungen-admin.png)

*Capture: AutoDoc **0.9.43**, ioBroker Admin **≥ 7.6.20** (May **2026**).*

![My documentation — schematic](assets/fig-tab-meine-dokumentation.svg)

*Real Admin UI (demo instance; **My documentation** is a long scroll — four screenshots, top to bottom):*

**1/4 —** Project, contact & notes; guest help & everyday automation wording.

![My documentation — screenshot (1/4)](assets/screen-meine-dokumentation-admin.png)

*Capture: AutoDoc **0.9.43**, ioBroker Admin **≥ 7.6.20** (May **2026**).*

**2/4 —** Playbook, optional **Mermaid** diagram, automatic host topology, emergency one-liners (WLAN / power / water).

![My documentation — screenshot (2/4)](assets/screen-meine-dokumentation-admin-2.png)

*Capture: AutoDoc **0.9.43**, ioBroker Admin **≥ 7.6.20** (May **2026**).*

**3/4 —** Short “misc” line (optional); per-adapter and per-room notes.

![My documentation — screenshot (3/4)](assets/screen-meine-dokumentation-admin-3.png)

*Capture: AutoDoc **0.9.43**, ioBroker Admin **≥ 7.6.20** (May **2026**).*

**4/4 —** Hide rooms or adapters per profile (onboarding vs. user/family); guest JavaScript filename visibility.

![My documentation — screenshot (4/4)](assets/screen-meine-dokumentation-admin-4.png)

*Capture: AutoDoc **0.9.43**, ioBroker Admin **≥ 7.6.20** (May **2026**).*

![Advanced — base URL schematic (fictitious host)](assets/fig-erweitert-basisurl.svg)

*Real Admin UI (demo; **Advanced** is a long scroll — two screenshots, top to bottom). **Base URL** and export paths are **placeholders**, not your real network.*

**1/2 —** Content limits; **exports in Files** (short placeholders in `documentation.*` states); optional **Base URL** for bookmark/QR targets.

![Advanced tab — screenshot (1/2)](assets/screen-erweitert-basisurl-admin.png)

*Capture: AutoDoc **0.9.43**, ioBroker Admin **≥ 7.6.20** (May **2026**).*

**2/2 —** Documentation **setup score** options; optional **filesystem export** path; **PDF after each run** (Puppeteer / Chromium).

![Advanced tab — screenshot (2/2)](assets/screen-erweitert-basisurl-admin-2.png)

*Capture: AutoDoc **0.9.43**, ioBroker Admin **≥ 7.6.20** (May **2026**).*

*Real Admin UI (demo; tab **HTML export & extra chapters** — three screenshots, top to bottom). Intro text mentions **PDF** (switches live under **Advanced**). Replace logo URLs / custom-chapter demo text with your own placeholders for public repos.*

**1/3 —** Appearance: HTML **color scheme** & **preset**, optional **sidebar logo** URL.

![HTML export & extra chapters — screenshot (1/3)](assets/screen-html-export-pdf-hint-admin.png)

*Capture: AutoDoc **0.9.43**, ioBroker Admin **≥ 7.6.20** (May **2026**).*

**2/3 —** **Admin** profile: chapter order & hidden chapters (**JSON** arrays). **User/Family**: hidden chapters & order (**JSON**).

![HTML export & extra chapters — screenshot (2/3)](assets/screen-html-export-pdf-hint-admin-2.png)

*Capture: AutoDoc **0.9.43**, ioBroker Admin **≥ 7.6.20** (May **2026**).*

**3/3 —** **Onboarding**: hidden chapters & order (**JSON**); **custom Markdown chapters** (**JSON** objects); footer points to optional font/CSS (fields further down).

![HTML export & extra chapters — screenshot (3/3)](assets/screen-html-export-pdf-hint-admin-3.png)

*Capture: AutoDoc **0.9.43**, ioBroker Admin **≥ 7.6.20** (May **2026**).*

*Real Admin UI (demo; **Notifications** — skip this tab entirely if you do not need post-run messaging). Keep **adapter instance IDs**, recipients, and custom templates **out of public repos** or use placeholders.*

![Notifications tab — screenshot](assets/screen-benachrichtigungen-admin.png)

*Capture: AutoDoc **0.9.43**, ioBroker Admin **≥ 7.6.20** (May **2026**).*

*Real Admin UI (demo; **AI documentation** — long tab, two screenshots **top to bottom**). Inline **privacy / hardware** notices are product text. For public repos prefer **local Ollama** or **redacted** cloud fields; never publish **API keys**.*

**1/2 —** Provider & model selection, **Ollama base URL**, request timeout.

![AI documentation — screenshot (1/2)](assets/screen-ki-dokumentation-admin.png)

*Capture: AutoDoc **0.9.43**, ioBroker Admin **≥ 7.6.20** (May **2026**).*

**2/2 —** Optional operator **context hints** (prompt-only); **temperature**; opt-in **“AI explains JavaScript scripts”**.

![AI documentation — screenshot (2/2)](assets/screen-ki-dokumentation-admin-2.png)

*Capture: AutoDoc **0.9.43**, ioBroker Admin **≥ 7.6.20** (May **2026**).*

Naming, swap-out **PNG** hints, redaction: **[`assets/SCREENSHOTS.md`](/#/docs/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md)**.

## Cookbook examples (Mermaid & JSON)

Step-by-step JSON for **custom sections** also appears in **[`README.de.md`](/#/docs/adapterref/iobroker.autodoc/docs/user-guide/README.de.md)** (scenario section). For **additional copy-paste diagrams**, **chapter-order / hide-list** patterns, and **`customDocSectionsJson`** variants, see the main **[README](/#/adapters/autodoc)**. For a **German** narrative (**hide lists before reorder**, mini-recipes): **[`README.de.md` — Step 6 — chapter order / hide](/#/docs/adapterref/iobroker.autodoc/docs/user-guide/README.de.md#wiki-admin-json-cookbook)**.

- [**Mermaid cookbook examples**](/#/adapters/autodoc#mermaid-cookbook-examples)
- [**JSON cookbook snippets**](/#/adapters/autodoc#json-cookbook-snippets)

Use these targets when linking from Admin field help — **`blob/main/README.md#…`** opens **Preview** (readable). Heading fragments match the English `###` titles in the main README; scroll behavior is **best effort**. Repo-root `#…` URLs remain unreliable — always use **`blob/main/…#…`**.

## Generating documentation

Trigger **Generate** from the instance (state `action.generate`, or the schedule you enabled). After a successful run you get:

- **Files** under `/files/autodoc.<instance>/` — canonical **HTML** (admin, user, onboarding), **Markdown**, **JSON**
- **States** such as `info.htmlUrlAdmin` / `info.htmlUrlUser` / `info.htmlUrlOnboarding`, `info.lastGeneration`, …

Large Markdown, Admin HTML, and the JSON model live **only** under **`/files/`** (`autodoc-latest.*`, profile HTML). The states **`documentation.markdown`**, **`documentation.html`**, and **`documentation.json`** hold **short placeholders** — use **`info.htmlUrl*`**, **`/files/`**, or download actions for full text.

**Hashes:** the adapter updates **`documentation.exportHashes`** — **SHA-256 (hex)** of the latest **Markdown**, **Admin HTML**, **JSON**, and (after a successful **PDF** run) **`autodoc-*.pdf`** files so integrations can cheaply detect “did the doc change?” without parsing full payloads.

## Onboarding QR and copied link

Guests need a **reachable** browser URL for the onboarding HTML file. Configure **IoBroker base URL** (advanced) to match how *you* open Admin (scheme, host, port). Wrong or empty values break QR/copy from other devices — see README **Public base URL**.

## Optional Mermaid CLI

The optional **`@mermaid-js/mermaid-cli`** package (installed with `npm install` on the adapter host) renders diagrams to **inline SVG during HTML generation** when it works — better for offline copies and **no jsDelivr script** in the export when every diagram is embedded. If some blocks stay as `<pre class="mermaid">` (CLI missing or a diagram failed), the HTML still loads Mermaid from the CDN in the browser. See PLAN/TODO **Phase 5** for Puppeteer/OS caveats (PDF and mmdc share similar Chromium assumptions).

## Repository checks before release

Maintainers run the **adapter checker** from the cloned repo (expects the default branch you pass to `repochecker`; `package.json` uses **`main`**):

```bash
npm install
npm run adapter-check
```

See **`CONTRIBUTING.md`** for interpretation (**`common.extIcon`**, npm package **`iobroker.autodoc`**, **W4001** until the repositories PR lands, known repochecker quirks). CI still runs **`npm test`**, **`npm run lint`**, **`npm run check`**.

## Demo content only here

Examples in docs use **neutral demo wording**. Do **not** commit real IPs, LAN hostnames from production, or live forum/card payloads.