---
chapters: {"pages":{"en/adapterref/iobroker.autodoc/README.md":{"title":{"en":"ioBroker.autodoc"},"content":"en/adapterref/iobroker.autodoc/README.md"},"en/adapterref/iobroker.autodoc/TODO.md":{"title":{"en":"AutoDoc Adapter — TODO-Liste"},"content":"en/adapterref/iobroker.autodoc/TODO.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/README.md":{"title":{"en":"AutoDoc — user guide (first steps)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/README.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/README.de.md":{"title":{"en":"AutoDoc — Konfiguration der Instanz (Wiki)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/README.de.md"},"en/adapterref/iobroker.autodoc/PLAN.md":{"title":{"en":"AutoDoc Adapter — Projektplan"},"content":"en/adapterref/iobroker.autodoc/PLAN.md"},"en/adapterref/iobroker.autodoc/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.autodoc"},"content":"en/adapterref/iobroker.autodoc/CONTRIBUTING.md"},"en/adapterref/iobroker.autodoc/docs/iobroker-adapter-references.md":{"title":{"en":"ioBroker-Adapterentwicklung — Referenzen (adapter-neutral)"},"content":"en/adapterref/iobroker.autodoc/docs/iobroker-adapter-references.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md":{"title":{"en":"Echte Screenshots für den User-Guide (optional)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md"}}}
---
# AutoDoc Adapter — TODO-Liste

Diese Datei ist die **Arbeitsliste**: was **offen** ist steht oben; **erledigte** Meilensteine sind im **Anhang** vollständig als Referenz erhalten (nichts streichen — nur sortiert).

| Dokument | Rolle |
| -------- | ----- |
| **TODO.md** (hier) | Checkboxen, Offenes, Anhang „Erledigt“ |
| **[PLAN.md](/#/docs/adapterref/iobroker.autodoc/PLAN.md)** | Vision, Begründungen, Architektur, Festlegungen (u. a. Visitenkarte, KI+Skript), Brainstorming, **[Produkt-Merkliste](/#/docs/adapterref/iobroker.autodoc/PLAN.md#merkliste-produktluecken-platform)** |
| **[README.md](/#/adapters/autodoc)** | Nutzer-README + **Changelog** (Release-Notizen) |

## Wichtige Referenzen

- [**Adapter-Referenzen (neutral)**](/#/docs/adapterref/iobroker.autodoc/docs/iobroker-adapter-references.md) — Gedächtnisstützen für regelkonformen Adapterbau (Checker, Review, Best Practices); für **andere Adapter** übernehmbar (Details und AutoDoc-Spezifisches: [CONTRIBUTING.md](/#/docs/adapterref/iobroker.autodoc/CONTRIBUTING.md))
- [ioBroker Developer Portal](https://www.iobroker.dev)
- [ioBroker AI Developer Guide](https://github.com/Jey-Cee/iobroker-ai-developer-guide)
- [Adapter Creator](https://github.com/ioBroker/create-adapter)
- [Adapter Checker](https://adapter-check.iobroker.in/)
- [ioBroker.repositories — Best Practices](https://github.com/ioBroker/ioBroker.repositories#development-and-coding-best-practices) — Listen, Einreichung, Coding-Konventionen
- [REVIEW_CHECKLIST](https://github.com/ioBroker/ioBroker.repositories/blob/master/REVIEW_CHECKLIST.md) — Review-Matrix vor Listen-PR
- [type-detector](https://github.com/ioBroker/ioBroker.type-detector) — State-Rollen / Gerätetypen
- Mitwirkung: [CONTRIBUTING.md](/#/docs/adapterref/iobroker.autodoc/CONTRIBUTING.md)

---

## Legende

| Symbol | Bedeutung |
| ------ | ----------- |
| ✅ | Umgesetzt (im Repo nachvollziehbar) |
| 🟡 | Teilweise / später ausbaufähig |
| ⬜ | Noch nicht umgesetzt |
| ❓ | Konzept offen — Details in [PLAN.md](/#/docs/adapterref/iobroker.autodoc/PLAN.md) |
| *optional* | Bewusster **Backlog** / Nice-to-have — nicht priorisiert, bei Bedarf nachziehen |

---

<a id="stand-uebersicht"></a>

## Übersicht — Umsetzung vs. Rest (Stand der **Version** wie in `package.json` / `io-package.json`: derzeit **`0.9.48`** auf **`main`/`dev`** — **`npm` latest** gegen [npm — iobroker.autodoc](https://www.npmjs.com/package/iobroker.autodoc) prüfen; bei Releases diese Zeile + **Tabellen-Stichtag** mitziegen; Releases Version/`news`/Tag/GitHub wie in **[CONTRIBUTING](/#/docs/adapterref/iobroker.autodoc/CONTRIBUTING.md#maintainer-checklist-release-order)**; Tabellen-Stichtag **2026-09-22** — Branch je nach Arbeitskopie, z. B. `main` / `dev`)

| Thema | Status | Kurz |
| ----- | ------ | ---- |
| Phasen **1–4** (Basis … Profile-Redesign) | ✅ | Modular, drei Profile, Discovery, Renderer, i18n EN/DE/FR, … |
| **Delta seit letztem Lauf** (Admin optional ausblendbar; Changelog-Zusammenfassung in **Export-Sprache**; User Kurzinfo bei echten Inventar-Deltas) | ✅ | **`hideAdminDeltaSinceLastRun`**, `localizeCompareSummary` / `docChangeFormat`, User HTML+MD — **`dev`**; README |
| **0.9.x** RC-Features (Aliase, Diagnose, QR/Copy, `exportPath`, …) | ✅ | Siehe README-Changelog |
| **Multihost** (Host-Karten, Slave-Warnung, Export) | ✅ | |
| **KI** (Provider, Tab `hidden`, Timeouts, Temperaturen, **AI context hints**, `guestHelpNote` / `homeRoutinesNote` / `ownerPlaybookNote`) | ✅ | Sprachqualität kleiner Modelle bleibt iterativ |
| **Custom Templates** (Kapitel ausblenden, Custom-Sections, Theme-Teile) | 🟡 | [PLAN.md — Custom Templates](/#/docs/adapterref/iobroker.autodoc/PLAN.md#custom-templates-detail); **0.9.17:** Admin-Reihenfolge + **Farb-Presets** (ohne Roh-CSS); **main:** Reihenfolge **User/Onboarding** (`userChapterOrderJson`, `onboardingChapterOrderJson`); **0.9.33:** PDF; offen: DnD |
| **Admin-HTML Lesbarkeit** (lange Listen eingeklappt; Score ohne „Strafe“ für bewusst deaktivierte Instanzen) | ✅ | In **0.9.17** README-Changelog (block „Also on `dev`…“) + Feature-Bullets oben drunter |
| **States entlasten** (Platzhalter in `documentation.*`, kanonisch `/files`, **`documentation.exportHashes`**) | ✅ | Ab **0.9.39:** kein `documentationStatesMode` mehr — große Inhalte **immer** nur unter **`/files/`**; **`documentation.markdown` / `.html` / `.json`** nur Platzhalter |
| **Phase 5** (PDF, Backup-Adapter, Rest Custom Templates) | 🟡 | **PDF 0.9.33** ([§ 1.2a](#phase-5-pdf-offline-mermaid)); **Backup** bewusst **zurückgestellt** (Resonanz nach **latest**-Repo — [§ 1.2](#phase-5-features)); DnD offen |
| **Phase 5.x.1** Notfall/Troubleshooting „Hybrid“ | ✅ | Kurzzeilen, Doku-Links (0.9.18), **Auto-Checklisten** bei Node-Befund + Disclaimer (0.9.19); **dev:** Admin-Kapitel **Betrieb – Referenz** (ehem. Fehlerbehebung) + Top-Disclaimer; **Diagnose:** Schnappschuss-Text, Node-Heuristik vs. allgemeiner Wartungshinweis — `RENDERER_VERSION` |
| **Phase 5.x.2** Quick Start / Raumguides | 🟡 | Kern **0.9.20**; Gäste-Kürzung **0.9.26**; Feinschliff Sortierung/Caps/Automations-Zähler **0.9.48** — optional: weitere Caps/i18n — [§ 1.3 — 5.x.2](#phase-5x) |
| **Phase 5.x.3** Mermaid | ✅ | **0.9.27** kuratiert; **0.9.28** Auto-Topologie; **0.9.48** klarere Linux/Chromium-Hinweise + Hilfsskript |
| **Phase B — Doku-UX** | ✅ | **0.9.48:** Admin **Automatisierung im Überblick**; Raum/Funktion-Gerätehierarchie; einklappbare HTML-Abschnitte; Raumnotizen im Detail — Details README **0.9.48** |
| **System-Visitenkarte** / Forum-Copy | ✅ | `textSendTo` **getForumCard** + State `info.forumCardPlain`; Diagnose-HTML nutzt `forumCard.js` |
| **KI + Skript-Quellcode** | 🟡 | **A** umgesetzt (`aiAnalyzeScriptSources`); **B** an Backup gekoppelt — **gleicher Zeitpunkt** wie Backup ([§ 1.2](#phase-5-features)) |
| **npm + ioBroker.repositories** | 🟡 | **npm** **`0.9.48`** ✅ (Trusted Publishing / **E2008** seit **0.9.48**). **latest:** Eintrag in **`sources-dist.json`** fehlt (**W4001**) — PR bei Bedarf. **stable:** zurückgestellt (**[#54](https://github.com/crunchip77/ioBroker.autodoc/issues/54)**). Tag + GitHub Release: **[CONTRIBUTING](/#/docs/adapterref/iobroker.autodoc/CONTRIBUTING.md#maintainer-checklist-release-order)** |
| **Dokumentations-Score** (Wartung — Checkliste mit echten Kriterien) | ✅ | **0.9.30–0.9.31:** Dreiteiliger Score (Datenerfassung / Manuelle Inhalte / Dokumentationstiefe); instancesWithoutRoom komplett raus; neue Checks: Diagramm, Räume m. Geräten, eigene Kapitel, KI-Provider — [§ 1.6](#dokumentations-score-checkliste) |
| **Admin-Markdown: Diagnose-Kapitel** (Parität zu Admin-HTML) | ✅ | `renderDiagnosis` / `renderDiagnosisMarkdown` — TOC-Zeile, ausblendbar wie HTML; **dev:** Kapitel-Einleitung „Schnappschuss“; **Automatische Prüfungen** (Node-Heuristik) getrennt von **Allgemeine Erinnerungen** (OS-Hinweis). Details [§ 1.6](#admin-markdown-diagnose-optional), Anhang A |
| **Admin-Konfig — Hilfen / Mini-Beispiele** (`manualMermaidDiagram`, JSON-Felder …) | 🟡 | **0.9.32** Mermaid-/States-/Hashes; **aktueller Repo-Stand:** weitere Mini-Beispiele in Hilfetexten (`jsonConfig` / i18n EN/DE/FR) — [§ 1.7](#admin-config-hilfen-beispiele); optional noch mehr Felder |
| **Nutzer-Handbuch / Wiki** (`docs/user-guide/`) | 🟡 | EN/DE **`README`** + **Wiki Schritt 6** (Ausblenden/Reihenfolge); Admin **`staticLink`**‑Paar unter Kapitelsichtbarkeit (JSON‑Kochbuch + Wiki); PNG + **SCREENSHOTS.md** — [§ 1.1b](#nutzer-handbuch-wiki); optional: weitere Sprachen |
| **Admin-UI React** (statt/nur wo nötig neben `jsonConfig`) | *optional* | Nur wenn jsonConfig für geplante Features zu eng — [§ 1.8](#admin-react-optional) |

---

<a id="offene-arbeit"></a>

## 1. Offene & nächste Arbeit (priorisiert)

Reihenfolge bewusst knapp; Details und Begründungen: [PLAN.md — Phase 5.x](/#/docs/adapterref/iobroker.autodoc/PLAN.md#phase-5x-plan). **Architektur** (jsonl/Redis, States, Medien): festgelegt — [PLAN — Nächste Schritte](/#/docs/adapterref/iobroker.autodoc/PLAN.md#architektur-naechste-schritte).

### Abgestimmte Umsetzungsreihenfolge (Konzept Stand 2026-04)

> Reihenfolge **Projekt / Features** — **npm** und **ioBroker.repositories** bewusst **danach** (siehe § 1.1).

| # | Thema | Verweis |
| - | ----- | ------- |
| 1 | **Custom Templates — Rest (0.9.17 / `main`)** | Erledigt: `adminChapterOrderJson`, `htmlThemePreset` — weiter: **Phase 5** (PDF, User/Onboarding, DnD) — [PLAN](/#/docs/adapterref/iobroker.autodoc/PLAN.md#custom-templates-detail), [§ 1.2](#phase-5-features) |
| 2 | **Phase 5.x.1** Hybrid (Notfall-Block + Diagnose-Snapshot) | ✅ 0.9.18 / 0.9.19 — [§ 1.3 — 5.x.1](#phase-5x) |
| 3 | **Phase 5.x.2** Quick Start / Raumguides | 🟡 Kern **0.9.20**; Feinschliff **0.9.48**; optional mehr: [§ 1.3 — 5.x.2](#phase-5x) |
| 4 | **Phase 5.x.3** Mermaid (gestaffelt) | ✅ **Stufe 1** **0.9.27**; **Stufe 2** **0.9.28** (`autoMermaidHostGraph`): [§ 1.3 — 5.x.3](#phase-5x) |
| 5 | **Phase 5:** PDF ✅ — **Backup** / **Rest Custom Templates** (DnD) | Backup **zurückgestellt** bis User-Resonanz nach Eintrag in **latest** (Repo); DnD weiter offen — [§ 1.2](#phase-5-features), [Backup/Backitup](#backup-backitup-festlegung) |
| 6 | **npm** ✅ **0.9.48** (Provenance). **latest** 🟡 Repos-PR. **stable** ⬜ später | [§ 1.1](#release-veroeffentlichung), [CONTRIBUTING.md](/#/docs/adapterref/iobroker.autodoc/CONTRIBUTING.md) |

<a id="backup-backitup-festlegung"></a>

### Backup / ioBroker.backitup — Festlegung für die spätere Umsetzung

> **Zeitlich zurückgestellt:** keine Umsetzung kurzfristig — Priorität liegt auf **Checker**, **ioBroker.repositories** (sichtbar in **latest**) und Rückmeldungen aus dem Feld. **Größere Brocken** (Parser, Archive, ggf. `sendTo`) erst **wenn** sich der Nutzen bestätigt. Die folgenden Punkte bleiben **Referenz** für eine spätere Phase.

> **Noch nicht implementiert** — Inhalt aus Abstimmung (Backitup-Repo, typische Nutzer-Setups). Dient als einheitliche Referenz, damit PLAN/KI-B nicht nur „ZIP“ sagen.

- **Typische Archive:** [ioBroker.backitup](https://github.com/simatec/ioBroker.backitup) erzeugt u. a. **`*.tar.gz`** (z. B. `iobroker_…_backupiobroker.tar.gz`, `javascripts_…` — vgl. `lib/list.js` im Backitup-Repo). **Nicht nur ZIP** — AutoDoc-Parser/Doku müssen **tar.gz** abbilden, sobald Backup verarbeitet wird.
- **Zugriff (ohne Cloud-Zugänge in AutoDoc zu duplizieren):**
  - **Empfohlen:** für ioBroker **lesbarer Pfad** (NAS per **SMB/NFS/Mount**, Docker-Volume) — Zugangsdaten bleiben auf Host/Backitup.
  - **Optional:** lose Kopplung per **`sendTo`** an eine Backitup-Instanz (`list`, `getSystemInfo` u. a., siehe Backitup `main.js`) — **keine** feste API-Garantie durch Dritte, bei Umsetzung gegen aktuelle Backitup-Version prüfen.
- **Kurz nur lokal zwischengespeichert:** keine zuverlässige Quelle ohne **Mount**, **Kopie an stabilem Ort** oder **Trigger** direkt nach dem Backup-Lauf.
- **KI + Skript Variante B:** gleiche KI-Pipeline wie A, Daten aus Backup-Archiv — bleibt an **Phase-5-Backup-Umsetzung** gekoppelt ([PLAN — KI + Skript](/#/docs/adapterref/iobroker.autodoc/PLAN.md#ki-skript-festlegung)).

<a id="release-veroeffentlichung"></a>

### 1.1 Release / Veröffentlichung

> **npm:** Das öffentliche Paket heißt **[**`iobroker.autodoc`**](https://www.npmjs.com/package/iobroker.autodoc)** (`package.json` → **`name`**). Hosts können den Tarball ohne Git installieren. **Standard-Adapterlisten** nutzen **[ioBroker.repositories](https://github.com/ioBroker/ioBroker.repositories)**. **latest:** PR **#5978** war gemerged; **`autodoc` fehlt derzeit in `sources-dist.json`** — **W4001** ist deshalb wieder aktiv, der Checker behandelt den Adapter als **neu** (Warnings → Errors). **stable:** **nicht** beantragen, solange Tester fehlen (**#54**). Tags/Releases: **[CONTRIBUTING](/#/docs/adapterref/iobroker.autodoc/CONTRIBUTING.md#maintainer-checklist-release-order)**.

**Synchron halten** (jedes Release): `package.json` **`version`**, `io-package.json` **`common.version`**, **`common.news`** (nur Versionen auf **npm**, Checker **E2004**), README-**Changelog**-Fenster — siehe **[CONTRIBUTING.md](/#/docs/adapterref/iobroker.autodoc/CONTRIBUTING.md)** (**npm-Paketidentität**, **`npm run release`**).

- [ ] [Adapter Checker](https://adapter-check.iobroker.in/) **ohne vermeidbare Errors** — **E6034/E4052** ✅ **0.9.47**; **E2008** ✅ **0.9.48**; **W4001** bis **latest**-Wiedereintrag. **W5042** bewusst: **[CONTRIBUTING — Optional Puppeteer + mermaid-cli](/#/docs/adapterref/iobroker.autodoc/CONTRIBUTING.md#optional-puppeteer-mermaid-cli)**
- [x] **npm**-Paketname **`iobroker.autodoc`** und Release-Prozess dokumentiert (**CONTRIBUTING.md**, [npm](https://www.npmjs.com/package/iobroker.autodoc))
- [x] Erstes und **fortlaufende** **npm**-Releases: Versionen/`news`/README-Fenster synchron (**0.9.35** ff.; derzeit **`0.9.48`**)
- [x] `npm publish` über GitHub **`deploy`** (Trusted Publishing)
- [x] **Git-Tags** zu veröffentlichten npm-Versionen (**v0.9.35** … **v0.9.48**)
- [x] **GitHub Releases** mit npm-Parität (**v0.9.48** inkl. Provenance — **[CONTRIBUTING — Schritt 7](/#/docs/adapterref/iobroker.autodoc/CONTRIBUTING.md#maintainer-checklist-release-order)**)
- [ ] PR [ioBroker.repositories](https://github.com/ioBroker/ioBroker.repositories) (`sources-dist.json`) — **erneut nötig** (Listing fehlt trotz früherem Merge **#5978**). **Erst nach** grünem Checker. **Kein** Stable-PR (**#54** zurückgestellt).

- [x] **`dev` → `main`** (Fast-forward, **0.9.17** inkl. Presets, Kapitelreihenfolge, i18n-Id-Listen)
- [x] **Foren-Ankündigung** 0.9.17 (Kurztext wahlweise im Chat/Notiz, nicht im README)
- [x] README-Changelog + diese TODO-Zeilen als Quelle für Tester (Git-URL-Installation)

<a id="nutzer-handbuch-wiki"></a>

### 1.1b Nutzer-Handbuch / Wiki *(optional — Backlog)*

> **`docs/user-guide/`** (`README.md` **EN**, **`README.de.md`** DE als **Wiki zu Admin-Tabs** + Muster-Szenario): **Wiki Schritt 6** (`#wiki-admin-json-cookbook`) für **Ausblenden/Reihenfolge**‑Rezepte; **engl.** Haupt-`README.md` für **JSON/Mermaid/CSS**‑Kochbücher — **Verbund** zur Instanzkonfig über **`staticLink`** (u. a. Tab **HTML-Export**, Abschnitt Kapitelsichtbarkeit) **und** Feldhilfen; **Screenshots**/Unterschriften siehe **`assets/SCREENSHOTS.md`**; optional: weitere Sprachen.

- [x] Ablage festlegen (`docs/user-guide/` im Repo) + Verweis im **README**
- [x] Inhalte nur mit **Demo-/Platzhalterdaten** (keine echten URLs, IPs, Forum-Karten aus Produktion) — **Schemas** `fig-*.svg` + Anleitung **`assets/SCREENSHOTS.md`**
- [x] Echte **PNG-Screenshots** der Konfig-Tabs in **`assets/`** und eingebunden in **README.md** / **README.de.md**
- [x] Screenshots mit **AutoDoc-/Admin-Versionshinweis** in der Bildunterschrift (siehe **[SCREENSHOTS.md](/#/docs/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md)** und `README.md` / `README.de.md`)
- [x] Mindeststruktur: Erste Schritte (Tabs), 1–2 Szenarien (z. B. Einfamilienhaus, Gäste), Hinweis Exporte / Forum

<a id="phase-5-features"></a>

### 1.2 Phase 5 — Features (Nice-to-Have)

- [x] PDF-Export — **0.9.33:** optional **`puppeteer`**, `pdfExportAfterGeneration`, **`action.exportPdf`**, `/files` + `exportPath`; Merker / Randbed.: [§ 1.2a](#phase-5-pdf-offline-mermaid)
- [ ] Backup-Anbindung — **zurückgestellt** (kein kurzfristiger Bau); Konzept: [Backup / ioBroker.backitup](#backup-backitup-festlegung) — **tar.gz**, Pfad und/oder `sendTo` Backitup; **KI + Skript Variante B** ebenfalls erst dann
- [x] Custom Templates — **Reihenfolge User/Onboarding** (`userChapterOrderJson`, `onboardingChapterOrderJson`) — [PLAN.md — Custom Templates](/#/docs/adapterref/iobroker.autodoc/PLAN.md#custom-templates-detail)
- [ ] Custom Templates — **Rest**: Drag-and-Drop — [PLAN.md — Custom Templates](/#/docs/adapterref/iobroker.autodoc/PLAN.md#custom-templates-detail)

<a id="phase-5-pdf-offline-mermaid"></a>

#### 1.2a Merker: PDF, Druck, Offline & Mermaid *(Phase 5 — Festlegung; PDF-Umsetzung 0.9.33)*

> **Kontext:** Heute lädt **HTML** Mermaid **10.9.1** von **jsDelivr**, wenn ein Diagramm im Export liegt — **PDF**, **Druck** und **Offline-Kopien** ohne Netz zeigen dann **kein** gerendertes Diagramm, solange nur der Quelltext bzw. Client-Skript fehlt.

**Festlegung (abgestimmt mit [PLAN.md — Verbindliche Leitplanken (Schicht 2)](/#/docs/adapterref/iobroker.autodoc/PLAN.md#verbindliche-leitplanken-schicht-2--beschlossen), Tabelle *Graphen / Mermaid*):**

- [x] **Einheitliche Pipeline für „fertige“ HTML-Artefakte:** Mermaid-Blöcke (kuratiert + Auto-Topologie) werden **bei der Generierung serverseitig in SVG** überführt und **ins HTML eingebettet** — **ohne** zwingende **externe** Mermaid-JS-Laufzeit für die Darstellung (vergleichbar QR: eingebettetes SVG). Damit sind **Druck**, **PDF aus demselben HTML** und **`file://`/NAS**-Kopien konsistent abbildbar.
- [x] **PDF:** Primär **aus dem generierten HTML** (nach SVG-Einbettung), z. B. **Headless-Browser** `page.pdf()` (Puppeteer/Playwright) oder dokumentierter **Browser-Workflow** „Drucken → PDF“. **Keine** separate, nur-PDF-eigene Mermaid-Render-Kette nötig.
- [x] **Markdown-Export:** vorerst **unverändert** **Mermaid-Quelltext** in Fences; optional später angleichen — wie in den Leitplanken beschrieben.

**Umsetzung:**

- [x] **SVG-Rendering** bei Generierung über **`@mermaid-js/mermaid-cli`** (`lib/mermaidServerSvg.js`, optionalDependency) — pro `<pre class="mermaid">` in den drei HTML-Profilen; **light/dark** aus `htmlColorScheme` (**auto** → Default-Theme); ohne Paket bleibt **jsDelivr**-Mermaid wie bisher.
- [x] **PDF aus HTML:** **`lib/htmlToPdf.js`** + optional **`puppeteer`** (**^24.x**, gemeinsam mit **`@mermaid-js/mermaid-cli` 11** — Peer-Lock, siehe **[CONTRIBUTING](/#/docs/adapterref/iobroker.autodoc/CONTRIBUTING.md#optional-puppeteer-mermaid-cli)**), **`pdfExportAfterGeneration`**, **`action.exportPdf`** — Artefakte unter `/files` und optional `exportPath` (**0.9.33**, Best Effort ohne Puppeteer/OS-Chromium).

**Festgehalten (Installation / Laufzeit — 2026-05):**

- **`iobroker url …/tarball/main`** (oder `…/tarball/dev` für Entwicklungsbranch): Erfolgreicher Lauf **Exit 0**; **`@mermaid-js/mermaid-cli`** zieht **transitives Puppeteer** nach — im npm-Log ggf. **Deprecation-Warnungen** (`puppeteer`, `uuid`): **normal**, kommt von der CLI, nicht von eigenen Adapter-`dependencies`. Aufräumen erst sinnvoll bei **Upgrade/Fork** der CLI oder gemeinsamer PDF-Puppeteer-Linie.
- **Chromium-Download** (z. B. unter **`…/.cache/puppeteer`**) beim ersten Install oder ersten mmdc-Lauf: **erwartet**; bestätigt, dass Headless für **SVG-Einbettung** verfügbar ist.
- **Node `package.exports`:** `require.resolve('@mermaid-js/mermaid-cli/package.json')` **scheitert** an den Exporten der CLI — der Adapter löst **`src/cli.js`** per **`node_modules`**-Pfad ab Adapter-Root (und Elternverzeichnissen bei Hoisting), siehe `resolveMmdcCliJs` in `lib/mermaidServerSvg.js`.

**Manuell testen (nach dev-Installation, mit installierter optionaler CLI):**

1. **Admin:** unter „Meine Dokumentation“ **`manualMermaidDiagram`** z. B. `flowchart LR\n  A-->B` eintragen; optional **`autoMermaidHostGraph`** aktivieren.
2. **Doku generieren** wie gewohnt (Button / Trigger im Adapter).
3. **Export-HTML** (Admin/User/Onboarding nach Bedarf) öffnen — **Quelltext:** bei funktionierendem mmdc **`<div class="mermaid-wrap mermaid-svg-embedded">`** mit eingebettetem **`<svg` …**; das ursprüngliche **`<pre class="mermaid">`** für diesen Inhalt **entfällt** (bleibt nur bei leerem Block, mmdc-Fehler oder wenn die CLI fehlt → jsDelivr-Fallback).
4. **Offline / `file://`:** gespeicherte HTML-Datei **ohne Internet** öffnen — Diagramm sollte **sichtbar** bleiben (statisches SVG), sobald es eingebettet wurde.
5. **`htmlColorScheme`:** **dark** vs. **light**/**auto** — Darstellung des Diagramms an **mmdc-Theme** **dark** vs. **default** prüfen.

**Linux / Container: Chromium startet nicht**

- **Symptom A — fehlende Bibliotheken:** `Failed to launch the browser process` und z. B. **`libnss3.so: cannot open shared object file`** — **bundled Chromium** braucht **Distro-Pakete** (häufig bei schlanken Images).
- **Symptom B — Docker / Unraid / LXC:** **`No usable sandbox`** / **SUID sandbox** — der Kernel/Namespace erlaubt die **Chrome-Standard-Sandbox** oft nicht.
- **Umsetzung im Adapter** (Stand **main / dev**): mmdc wird mit **`-p`** und **Puppeteer-JSON** aufgerufen: **`--no-sandbox`**, **`--disable-setuid-sandbox`**, **`--disable-dev-shm-usage`** (`lib/mermaidServerSvg.js`, `writeMmdcPuppeteerConfigFile`). Behebt typisch **Symptom B**; **Symptom A** weiterhin durch **PACKAGES** / apt (siehe unten).
- **Folge bei Fehler:** Diagramme bleiben **`<pre class="mermaid">`**; **jsDelivr** im Browser mit Netz; **Offline** ohne eingebettetes SVG.
- **Abhilfe Pakete (Distro):** u. a. `libnss3`, `libatk1.0-0`, `libatk-bridge2.0-0`, `libcups2`, `libdrm2`, `libgbm1`, `libasound2`, `libxkbcommon0`, `libxcomposite1`, `libxdamage1`, `libxfixes3`, `libxrandr2` — [Puppeteer Linux](https://pptr.dev/troubleshooting); **buanet-Image:** Umgebungsvariable **`PACKAGES`**.
- **Verifikation:** Doku neu generieren — **keine** mmdc-Warnung; im HTML **`mermaid-svg-embedded`**.

**Multi-Plattform (Pi, Docker, LXC, VM, nativ) — kein „Zwang“ zum OS-Paketbau:**

- **ioBroker** läuft auf sehr unterschiedlichen Umgebungen; der Adapter **darf** nirgends **hart** voraussetzen, dass Headless-Chromium samt Distro-Libs funktioniert.
- **Serverseitiges SVG (mmdc)** ist deshalb **Best Effort**: wenn CLI **und** OS-Stack passen → eingebettetes SVG, **Offline/PDF-tauglicher** Pfad; wenn nicht → **`<pre class="mermaid">`** + **jsDelivr** bei **Online-Browser** — **Kernfunktion** (Doku erzeugen, im Browser lesen) bleibt.
- **Spätere Grafiken** in Freitext-/Beschreibungs-Kontexten (Fotos, Pläne, Screenshots) sollten **primär** über Wege laufen, die **ohne** Puppeteer auskommen — siehe [PLAN.md — Medien / User-Assets](/#/docs/adapterref/iobroker.autodoc/PLAN.md#architektur-medien-mvp) (z. B. **externe URL**, **kleine SVG** in **`/files/`**, Größenlimits); **Mermaid** bleibt der Spezialfall für **relationale Diagramme**. Rastergrafiken serverseitig „rendert“ AutoDoc **nicht** pauschal voraus; das hält **Docker/LXC/Minimal-Images** tragfähig.

**Datenbank, Offline ohne ioBroker, Neuinstallation:**

- **DB darf nicht „mit der Doku mitwachsen“:** keine großen **User-Medien** in States oder der **virtuellen Dateischicht** wie bei Redis — das ist in [PLAN.md — Medien / User-Assets](/#/docs/adapterref/iobroker.autodoc/PLAN.md#architektur-medien-mvp) begründet (Blob-Bloat vermeiden). Konfig bleibt schlank; **schwere** Inhalte liegen bewusst in **echten Dateien** (`/files/…`, `exportPath`) oder **extern**.
- **„Alles offline“** im Sinne **Notfall / ioBroker aus / Neuaufbau:** die **maßgeblichen Artefakte** sind die **mit Export geschriebenen** Dateien (HTML, MD, ggf. später PDF) — die man auf **NAS, USB, Mail-Anhang** legt. Sie sollen **möglichst ohne laufenden ioBroker** und **ohne Internet** in einem Browser nutzbar sein (bereits: **QR als SVG**; **Ziel:** **Mermaid als eingebettetes SVG** sobald mmdc auf dem Generator-Host klappt — sonst Lücke bis Netz oder OS-Fix).
- **Kopie für Neuinstallation:** Nutzer sichern den **Export-Ordner** (plus später Backitup-Strang aus Phase 5). Doku dient dann als **Referenz beim Wiederaufbau**, unabhängig vom alten Laufzeit-System.

- [x] **Client-Mermaid (jsDelivr):** Nur noch **Fallback** im **HTML**-Export — Skript wird nur eingefügt, wenn noch **`<pre class="mermaid">`** vorkommt (**0.9.34**); vollständig eingebettetes SVG lädt kein CDN. **Markdown** unverändert Fences mit Quelltext.
- [x] **PDF:** **`autodoc-*.pdf`** unter `/files` bzw. `exportPath` — **0.9.33** (`puppeteer` optional).
- [x] README / **common.news** / Admin-Hilfen: Chromium optional, RAM/CPU, Offline/PDF vs. jsDelivr — siehe README **Optional PDF export** und **Advanced**-Felder.

<a id="phase-5x"></a>

### 1.3 Phase 5.x — Reihenfolge 1 → 2 → 3

#### 5.x.1 Notfall & Troubleshooting (Hybrid)

**Bereits da (abgrenzen):** manuelle Felder **„Help & emergencies“** / **„Routines in your own words“** / **„Playbook“** (`guestHelpNote`, `homeRoutinesNote`, `ownerPlaybookNote`, u. a. 0.9.9 / 0.9.25) — Freitext in Onboarding/User, keine erfundene Diagnose.

Noch offen (größere Ausbaustufe als reiner Freitext):

- [x] Strukturierter Block **über** reine Notizfelder hinaus: **Kurzzeilen** (WLAN/Strom/Wasser/Sonstiges) + **automatische Doku-Links** (User/Onboarding/Admin, gleiche Logik wie QR — **0.9.18**)
- [x] Kurze **Auto-Checklisten** nur bei **konkreten** Diagnose-Befunden (aktuell: **Node.js** wie Admin-Diagnose) + **Momentaufnahme-Hinweis** — **0.9.19** (`lib/diagnosisSnapshot.js`)
- [x] **dev (nach 0.9.39):** Admin-Export **Betrieb – Referenz** (Benennung + Disclaimer); **Diagnose-Kapitel:** Einleitung „Schnappschuss“, **Automatische Prüfungen** vs. **Allgemeine Erinnerungen** — Copy; `RENDERER_VERSION`-Bump bei Template-Änderung
- [x] **dev (nach 0.9.39):** **Delta seit letztem Lauf** — optional ausblendbar (`hideAdminDeltaSinceLastRun`); **Changelog**-/Vergleichs-Einzeiler in Export-Sprache; **User** Kurzinfo bei echten Deltas (HTML+MD); Tests `docChangeFormat.test.js`

#### 5.x.2 Quick Start & Raumguides

- [x] `documentModel`: feste Blöcke (`docModel.quickStart` / `lib/quickStartGuide.js`)
- [x] Renderer Onboarding + User: strukturierte Listen + Raumkacheln (HTML) / übersichtliche Abschnitte (MD)
- [x] KI nur Formulierung, nicht alleinige Struktur (unverändert: keine KI-Strukturierung)
- [x] **0.9.26:** Gäste kürzer (`sliceQuickStartForOnboarding`); User-Link zum Räume-Kapitel
- [x] **0.9.48:** Quick-Start-Caps (Skripte/Funktionen); Raum-Sortierung nach deduplizierter Gerätezahl; Automations-Zähler ohne Gäste-Skriptnamen

**5.x.2 — optional (kein Muss):** weitere Caps/Layout pro Profil; weniger Doppelinfos; Feintuning Sortierung/i18n — siehe README **0.9.48** / `lib/quickStartGuide.js`.

**Hinweis (Abschnittsreihenfolge):** **User-HTML** und **User-Markdown** nutzen dieselben Inhalte, aber **nicht** dieselbe Kapitelreihenfolge (z. B. manuelles Kapitel und Hilfe im HTML oben, im Markdown-Export erst nach System/Adaptern/Räumen/Skripten) — beabsichtigt, kein Fehler.

**Hinweis (Admin-UI-Sprache):** **Voll geprüft** (inhaltlich): **EN / DE / FR**. Für **es, it, nl, pl, pt, ru, uk, zh-cn** sind **alle** `jsonConfig`-Keys mit Text aus **`en.json`** hinterlegt, bis Muttersprachler nachziehen; falsche „Übersetzungen“ so vermeidbar. Beiträge: [`CONTRIBUTING.md` — Admin UI i18n](/#/docs/adapterref/iobroker.autodoc/CONTRIBUTING.md#admin-ui-translations-i18n).

#### 5.x.3 Mermaid / kleine Graphen

- [x] Stufe 1: Mermaid aus **kuratiertem** Inhalt (`manualMermaidDiagram` → `manualContext.mermaidDiagram`, **0.9.27**)
- [x] Ausgabe **Markdown** (`mermaid` fence) + **HTML:** bei installierter CLI **eingebettetes SVG** (`mermaid-svg-embedded`); sonst **pre.mermaid** + Mermaid **10.9.1** von jsDelivr wenn Diagramm vorhanden
- [x] Stufe 2: optional kleiner **Auto-Graph** mit **hartem Knotenlimit** (Multihost Host → Instanzen, **0.9.28** `autoMermaidHostGraph` / `lib/autoHostTopologyMermaid.js`)
- [ ] Nicht Ziel: ungefilterter Gesamtgraph

<a id="nachzuege"></a>

### 1.4 Kleine Nachzüge / Trigger

- [x] **README-Changelog** + **io-package `news`:** Gäste-Onboarding **Skript-Datenschutz** (`onboardingGuestShowScriptNames`, `lib/guestScriptPrivacy.js`) und Schnellstart-Logik (**kein** Ersatz aus `common.desc`, wenn Skriptnamen in der Gäste-Ansicht verborgen sind) + **RENDERER_VERSION** — in **0.9.21** nachgezogen.
- [x] **`documentationStatesMode` entfallen** (**0.9.39**) — nur noch Platzhalter in großen `documentation.*`-States; Admin-Auswahl entfernt
- [x] **`io-package` news** bei Default **`documentationStatesMode` = `metadata`** für neue Instanzen (**0.9.38**)
- [x] **README-Changelog** + Version **0.9.11** um States/Hashes/Changelog-i18n ergänzt

<a id="todo-festlegt-umsetzung"></a>

### 1.5 Festgelegt — Umsetzung (Referenz)

Details: [PLAN — System-Visitenkarte](/#/docs/adapterref/iobroker.autodoc/PLAN.md#system-visitenkarte-festlegung), [PLAN — KI + Skript](/#/docs/adapterref/iobroker.autodoc/PLAN.md#ki-skript-festlegung).

- [x] **System-Visitenkarte:** **jsonConfig** `textSendTo` `getForumCard` (+ Copy); State `info.forumCardPlain`; gemeinsame Logik `lib/forumCard.js`
- [x] **KI + Skriptquellcode:** **Variante A** — `aiAnalyzeScriptSources`, Zeilen-Redaktion, User/Onboarding HTML + Markdown; **Variante B** → mit [Phase-5-Backup](#phase-5-features) **zurückgestellt** ([Backup-Backitup](#backup-backitup-festlegung))

<a id="dokumentations-score-checkliste"></a>

### 1.6 Dokumentations-Score (Wartung) - Checkliste

> **Stand 0.9.32:** Dreiteiliger Score komplett umgesetzt; Betriebsdoku `docs/user-guide`, Admin-Hilfen & Repo-„main“-Linie siehe README / `common.news`.

- [x] **Umgesetzt (0.9.22):** Projektbeschreibung >= 40 Zeichen; Basis-URL; Instanzen ohne Raum (Schwelle).
- [x] **Erweiterung 0.9.23:** Pro Check `maintenanceScoreCheck*`, `maintenanceScoreMinDescriptionChars`, `maintenanceScoreUnassignedWarnAt`.
- [x] **Klarstellung 0.9.24:** Kapitel-Texte Wartung vs. Diagnose; Quick-Start Raum-Sortierung; KI-Owner-Kontext.
- [x] **UX-Korrekturen 0.9.29:** `scriptsWithoutDescription` entfernt; `unassignedCount` nur aktive Instanzen; Adapter-Grid User-View; Mermaid Dark-Mode Re-Render.
- [x] **Dreiteiliger Score 0.9.30:** Score 1 = Datenerfassung; Score 2 = Manuelle Inhalte; Score 3 = Dokumentationstiefe. Gesamtpunktzahl = Durchschnitt. HTML + Markdown, i18n EN/DE/FR.
- [x] **Score 3 Rework 0.9.31:** `instancesWithoutRoom` vollstaendig aus Score entfernt; ersetzt durch `checkHasCustomSections` und `checkAiConfigured` (bedingt). Admin-Config-Felder bleiben fuer Rueckwaertskompatibilitaet ohne Effekt.
- [x] **Explizit nicht** im Score: deaktivierte Instanzen (Inventar-only); `common.desc` / Skript-Beschreibungen.

#### Admin-Markdown: Diagnose

<a id="admin-markdown-diagnose-optional"></a>

- [x] **Admin-Markdown: Diagnose-Kapitel:** `renderDiagnosisMarkdown` in `lib/markdownRenderer.js`; Parität zur Admin-HTML-`renderDiagnosis` (inkl. ausblendbar über versteckte Kapitel / TOC wie bei anderen Admin-Kapiteln). Verweis **Anhang A**.

<a id="admin-config-hilfen-beispiele"></a>

### 1.7 Admin-Konfig — Hilfen / Mini-Beispiele *(teilweise)*

> **Merker:** Bessere Orientierung bei komplexeren Feldern, **ohne** Demo-Inhalt in Exporten durch `native`-**`default`** (der wäre echter gespeicherter Text). In vielen ioBroker-Admin-Versionen liefern `jsonConfig`-/`i18n`-**`help`**-Strings **keine** zuverlässige Markdown-Fettung (`**`); Struktur lieber mit **Absätzen** (`\n\n`), technische Begriffe mit **Backticks** — siehe auch `scripts/sync-mermaid-help-i18n-key.js` nach Änderungen am langen Mermaid-Hilfetext.

- [x] **teilweise umgesetzt:** **Mermaid** (`manualMermaidDiagram`): **Placeholder** im Textfeld (neutral `DEMO*`, keine `native`-Defaults). **JSON-Felder** (**Kapitelreihenfolge / Ausblenden / Custom sections**): **Placeholder** im UI + Verweis im Hilfetext **„Custom sections (JSON)“** auf **`docs/user-guide/README.de.md`** (Musterszenario); weiterhin **kein** großes **`default`**-JSON in `io-package` `native`.
- [x] **0.9.32:** Hilfetexte **Mermaid** (Client vs. eingebettetes SVG / Auto vs. Kurzdiagramm nach Bedarf); **`documentation.exportHashes`**; Documentation **states** **`full`** / **`metadata`**; **KI**: Header/Blocke ohne Provider bzw. Skript-Analyse weniger grell.
- [x] **Weitere Mini-Beispiele** in `jsonConfig`/`i18n` (Projektname, Beschreibung/Score, Timer, Basis-URL, States-Modus-Tipp, Adapter-/Raum-Notizen, Benachrichtigungen, JSON **hide**-Felder, Logo-Pfad, Extra-CSS, KI-Kontext) — EN/DE/FR + englische Keys in den übrigen Locales (**Repo-Stand**, nicht an eine einzelne npm-Version gebunden).
- [x] **User chapter order** (`userChapterOrderJson`): Hinweis, dass **`atAGlance`** nur bei vorhandenem Quick-Start-Inhalt erscheint (kein leeres Kapitel durch JSON) — EN/DE/FR.
- [x] **Onboarding chapter order** + **Base-URL-Kontext:** `quickstart` vs. Discovery-Block (`quickStart.hasContent`) in Hilfetexten; **Advanced**-Hinweis‑Box vor **`baseUrl`** (Gäste/QR/Docker/Proxy) — alle Locales für Callout (EN in ES/IT/…).
- [x] **Versteckte Räume/Adapter (User & Onboarding):** Hilfen EN/DE/FR — exakte Admin-Bezeichnung, Instanzsuffix bei Adaptern, „alle Instanzen“-Semantik.
- [x] **Advanced — Inhaltsfilter:** `onlyEnabledInstances`, `hideInstanceDetailsInMarkdown`, `maxDocumentedInstances` — kurze, korrekte Hilfen (HTML vs. Markdown, Discovery-Reihenfolge, **0** = unbegrenzt) — EN/DE/FR + gleiche i18n-Keys in ES/IT/…
- [x] **Advanced — Admin-Delta ausblenden:** `hideAdminDeltaSinceLastRun` — gelbe Box **Systemübersicht** (Admin-HTML) und gleichlautender Unterabschnitt **Admin-Markdown** optional aus; **Änderungsprotokoll**-Kapitel und User/Onboarding **unverändert**; Hilfen EN/DE/FR (`admin/i18n`).
- [x] **Export-Sprache / Inventar-Vergleich:** gespeicherte **Changelog**-Karten zeigen die Einzeiler-Zusammenfassung in der **aktuellen Dokumentationssprache** (`localizeCompareSummary`); **`compareVersions`-Summary** beim Speichern ebenfalls lokalisiert (`main.js`). **User**-Profil: kurzer Alltagssatz bei **mindestens einem** erkannten Delta (nicht Erstlauf, nicht „keine Änderung“) — HTML + Markdown; **Onboarding** ohne diesen Block.
- [x] **Basic / Notify / Hide-Hinweise:** Dokumentationssprache (alle Profile + Markdown vs. Rohdaten), Adapter-Änderungen (30 s Debounce), Benachrichtigungen (erfolgreicher Lauf, Messaging-Instanz), ausführlichere **User/Onboarding hide hint** — EN/DE/FR + Keys in allen Locales; `jsonConfig`-`help` angepasst wo nötig.

<a id="admin-react-optional"></a>

### 1.8 Admin-UI — React statt / neben `jsonConfig`? *(optional — Zukunft)*

- [ ] *optional / nicht priorisiert* **Prüfen**, ob eine **React-basierte** Admin-Oberfläche (eigener Tab oder Teilersetzung) **je nach Bedarf** sinnvoll wird — z. B. wenn **jsonConfig** für geplante Features **systematisch** zu eng ist (schweres **DnD** für Kapitelreihenfolge, **Live-Preview** für Mermaid, **Medien-Galerie**/Upload-UI).
- **Bis dahin:** bei **`jsonConfig.json` + `admin/i18n`** bleiben — weniger Build-/Wartungslast, idiomatisch für viele ioBroker-Adapter.
- **Nicht** als kurzfristiges Ziel: Umstellung **ohne** konkrete UI-Anforderung, die sich mit jsonConfig nicht mehr sinnvoll abbilden lässt.

---

## 2. Teilweise umgesetzt — kurz erklärt

| Bereich | Was schon da ist | Was „Phase 5.x“ / PLAN noch meint |
| ------- | ---------------- | ---------------------------------- |
| Notfall / Gäste | wie oben + Diagnose-Snapshot (Node) | Weitere Befund-Typen nur bei tragfähigen Daten |
| Customization | `*HiddenChaptersJson`, `customDocSectionsJson`, `htmlThemePreset`, `adminChapterOrderJson` (Admin), Theme-Felder, Markdown-Export | Drag-Sort; **Backup** siehe Phase 5 (**zurückgestellt**) |
| Forum-Hilfe | Diagnose-Block + **`getForumCard`** / State `info.forumCardPlain` (`lib/forumCard.js`) | Optional: spätere Template-„nur System“-HTML ([PLAN](/#/docs/adapterref/iobroker.autodoc/PLAN.md#system-visitenkarte-festlegung)) |
| Doku in States | `full` / `metadata`, Platzhalter, Dateizugriff, **exportHashes** | Nur **Kommunikation** (news), wenn Default wechselt |

---

## 3. Zur Klärung (ohne feste Roadmap)

Ausführlich: [PLAN.md — Zukunftsvision](/#/docs/adapterref/iobroker.autodoc/PLAN.md#zukunftsvision) inkl. **[Merkliste — Produkt-Lücken & Plattform-Reconnaissance](/#/docs/adapterref/iobroker.autodoc/PLAN.md#merkliste-produktluecken-platform)** (stückweise umsetzbar). **Diskussions-Nachzeichnung** (Checkliste Produktperspektive, nichts vergessen für Fortführung): [PLAN — Nachzeichnung 2026-05](/#/docs/adapterref/iobroker.autodoc/PLAN.md#merkliste-nachzeichnung-2026-05). **Weitere Ausbaustufen** (Roadmap-Vorschlag js-controller/Admin/Adapter, Pakete 1–3): [PLAN — Weitere Möglichkeiten](/#/docs/adapterref/iobroker.autodoc/PLAN.md#weitere-moeglichkeiten-roadmap-2026-05). **Medien, Redis/jsonl, States:** Arbeitsweise und Leitplanken sind festgelegt — [PLAN — Medien-MVP](/#/docs/adapterref/iobroker.autodoc/PLAN.md#architektur-medien-mvp), [Architektur](/#/docs/adapterref/iobroker.autodoc/PLAN.md#architektur-grenzen).

---

<a id="anhang-a-erledigt"></a>

## Anhang A — Vollständige Checklisten: Erledigt (Referenz)

Der folgende Stand ist **historisch vollständig** (✅). Bei Abweichungsfragen immer **Git / README-Changelog** prüfen.

### Release 0.9.47–0.9.48 ✅

- [x] **0.9.47:** Repository-Checker (#60): License-Link, Maintainer-Mail, CI Node 26
- [x] **0.9.48:** Admin **Automatisierung im Überblick**; Raum/Funktion-Gerätehierarchie (`lib/roomDeviceResolver.js`); Quick-Start-/Automations-Feinschliff; HTML einklappbar; Mermaid/Linux-Hinweise; npm Provenance (**E2008**)

### Dev — Delta-UX & Vergleichstexte (Export-Sprache) ✅

- [x] **`lib/docChangeFormat.js`:** `localizeCompareSummary`, `shouldShowUserFriendlyDocChange`; gebündelt mit `buildDocChangeSinceLastRun`
- [x] **`main.js`:** nach `compareVersions` Summary für Snapshot/Changelog lokalisiert; `i18n.setLanguage(config.language)` vor Export
- [x] **Admin:** gelbe **Änderungen seit letztem Lauf**-Box + Markdown-Analog — nur wenn `hideAdminDeltaSinceLastRun` nicht aktiv
- [x] **Admin Changelog-Kapitel:** `renderChangelogChapter` nutzt `localizeCompareSummary(entry)` für Anzeige
- [x] **User HTML/Markdown:** Hinweis `userDocChangeSinceLastPlain` nach Header/TOC wenn echte Deltas; Onboarding ohne
- [x] **Konfig / `native`:** `hideAdminDeltaSinceLastRun` (Default false); Admin-i18n EN/DE/FR; `RENDERER_VERSION`-Bump bei HTML-Template

### Dev (nach 0.9.28) — Adapter-Ansicht, Chapter-Reihenfolge, mermaidAuto ✅

- [x] **Adapter-Details Admin-HTML:** Tabelle → zugeklappter `<details>`-Block + responsives **Karten-Grid** (auto-fill, min. 300 px); Instanz-Details per Klick ausklappbar; JS-Filter auf Cards umgestellt; `enabledShort` i18n (EN/DE/FR)
- [x] **Adapter-Details Admin-Markdown:** kompakte Übersichtstabelle (Name, Beschreibung, Badges, Aktiv/Gesamt) + Instanz-Details je aktivem Adapter + deaktivierte Adapter in `<details>`-Block; gesamter Abschnitt in `<details>` zugeklappt (alle drei Profile); `mermaidAutoTopologyMdHint` i18n statt rohem Code-Block
- [x] **User/Onboarding Kapitelreihenfolge:** `userChapterOrderJson` + `onboardingChapterOrderJson` (analog `adminChapterOrderJson`); `parseUserChapterOrder` / `parseOnboardingChapterOrder` in `lib/docTemplateConfig.js`; `docModel.userChapterOrder` / `.onboardingChapterOrder`; HTML + Markdown Dispatcher; i18n EN/DE/FR
- [x] **mermaidAuto:** separate Chapter-ID für auto-generierte Host-Topologie (immer versteckt im Onboarding-Profil); `mermaid` = manuell, `mermaidAuto` = auto-Topologie; `EXTRA_HIDDEN_CHAPTER_IDS`; i18n Hinweistexte aktualisiert
- [x] **Admin-Markdown: Diagnose-Kapitel** — `renderDiagnosisMarkdown` in `lib/markdownRenderer.js`; Parität zu Admin-HTML; TOC-Zeile

### Release 0.9.17 — Custom Templates (Rest, Teil) ✅

- [x] **Admin**-Kapitelreihenfolge: `adminChapterOrderJson` → `documentModel.adminChapterOrder`; **HTML**-Seitenleiste + Kapitel; **Markdown** (Profil Admin) TOC + Inhalt in gleicher Reihenfolge
- [x] **HTML**-Farb-**Presets** ohne Roh-CSS: `htmlThemePreset`, `lib/htmlThemePresets.js` (CSS-Variablen, Hell/Dunkel)
- [x] `io-package` native, `jsonConfig`, **i18n** EN/DE/FR; **News**; `RENDERER_VERSION` angehoben

### Phase 1 — Basis ✅ (v0.1.0)

- [x] Modularisierung: `lib/discovery.js`, `lib/documentModel.js`, `lib/markdownRenderer.js`, `lib/htmlRenderer.js`, `lib/versionTracker.js`, `lib/i18n.js`
- [x] Dateibasierter Export: Markdown, HTML, JSON nach `/files/autodoc.0/`
- [x] Admin UI: `jsonConfig.json5` + i18n EN + DE + FR
- [x] Drei Profile: Admin, User, Onboarding
- [x] Adapter-Beschreibungen aus ioBroker-Metadaten
- [x] Versionsverfolgung mit Diff und Changelog
- [x] Automatische Generierung: Startup, Timer, Event-basiert (30s Debounce)
- [x] HTML-Renderer mit Sidebar, Stat-Cards, Adapter-Cards je Profil

### Phase 2 — Inhalt ✅

- [x] 2.1 `enum.rooms` + `enum.functions` auslesen und als Kapitel rendern
- [x] 2.2 Skripte aus `script.js.*`: Name, Status, Beschreibung, Trigger-Typ
- [x] 2.3 Wartungs-Score / Checkliste (nur echte Warnungen; deaktivierte Instanzen = Inventar), Diagnose; Admin-HTML: lange Tabellen-Abschnitte optional eingeklappt
- [x] 2.4 Clientseitige Such-/Filterfunktion im HTML (Nav-Suchbox, Escape-Reset)

### Phase 3 — Tiefe ✅

- [x] 3.1 Notifications: `sendTo` nach Generierung (Telegram, Email, Pushover, generic)
- [x] 3.2 Dependency-Analyse: `lib/dependencyAnalyzer.js`, stateRefs + Cross-Reference
- [x] 3.3 AI-Enhanced Docs: `lib/aiEnhancer.js`, pluggable Providers (Anthropic/Groq/Ollama), opt-in, Admin-Profil wird übersprungen
- [x] 3.x i18n-Fix: alle hardcodierten englischen Strings ersetzt (EN/DE/FR vollständig)
- [x] 3.x Adapter-Metadaten: `connectionType`, `dataSource`, `tier` aus ioBroker-Metadaten; gefilterter `native`-Config im Admin-Profil (sensitive Keys automatisch entfernt)
- [x] 3.x Strukturierter `manualContext`: `adapters{}` + `rooms{}` — per-Adapter/Raum-Notizen, in allen Profilen angezeigt

### Phase 4 — Profile-Redesign ✅

#### 4.1 Discovery-Erweiterungen ✅

- [x] `system.config` auslesen: Stadt, Land, Systemsprache → `rawData.systemConfig`
- [x] Geräte-Namen-Auflösung: Raum-Mitglieder → Device-Objekte via `getForeignObjectAsync`
- [x] Opt-in Live-States: Schlüssel-Rollen (`level.temperature`, `sensor.door`, `sensor.window`, `alarm`) lesen
- [x] Neue Config-Option `readLiveStates` in `jsonConfig.json5` + i18n

#### 4.2 Role Mapper ✅

- [x] `lib/roleMapper.js` — 29 Patterns → 14 Kategorien + Icons
- [x] i18n-Keys für Kategorie-Labels (EN/DE/FR)

#### 4.3 DocumentModel-Erweiterungen ✅

- [x] `buildSystemConfig(rawData)` → `docModel.systemConfig`
- [x] `buildRooms()`: `rooms[].devices[]` mit `{ id, deviceName, category, icon, currentValue, unit }`

#### 4.4 Renderer-Architektur: Dispatcher ✅

- [x] `renderHtml()` als Dispatcher → `renderAdminHtml()` / `renderUserHtml()` / `renderOnboardingHtml()`

#### 4.5 Onboarding-Profil ✅

- [x] Stadt-bewusster Willkommenstext, Räume mit Device-Grid + Icons + Live-Values
- [x] "Was läuft automatisch?" als plain sentences, Adapter-Cards (freundlich)
- [x] AI-Box prominent, Hint wenn kein manualContext

#### 4.6 User/Familie-Profil ✅

- [x] Räume mit Device-Cards, Skripte name+desc only, Adapter title-only

#### 4.7 Admin-Profil ✅

- [x] Device-Hierarchie-Tabelle pro Raum mit OIDs

#### 4.x Bugfixes & UI-Verbesserungen ✅

- [x] `room.members` → `room.devices` (DocumentModel ↔ Renderer Alignment)
- [x] Onboarding: Adapter-Abschnitt fehlte (renderAdaptersChapter nicht aufgerufen)
- [x] markdownRenderer: gleicher room.devices Bug → UNCAUGHT_EXCEPTION im Admin-Profil
- [x] Adapter-Badges: "none"/"assumption" ausblenden, Tier mit Qualitätsbezeichnung
- [x] "Instanzen ohne Raumzuweisung" entfernt (konzeptionell falsch)
- [x] Hosts-Tabelle: leere adapterCount-Spalte entfernt
- [x] Diagnose-Sektion neu aufgebaut: Erfassungsstatus, Wo nachschauen (alive/connected), Befunde

#### 4.x UI-Verbesserungen Session 2 ✅

- [x] Adapter-Tabelle: deaktivierte Instanzen eingeklappt (`<details>`), lokaler Filter-Input mit Hinweistext
- [x] Node.js-Version aus `host.native` (via `getForeignObjectAsync`) + Badge grün/rot (LTS ≥ v20)
- [x] OS-Info (Kernel, Architektur) im System-Kapitel und Hosts-Tabelle
- [x] Node.js-Warnung + OS-Update-Hinweis in Diagnose-Befunde
- [x] Script-Ordner-Labels: `null` → Root-Verzeichnis, `common` → Allgemeine Skripte, `global` → Globale Skripte

#### 4.x Abschluss

- [x] i18n: alle neuen Keys (EN/DE/FR)
- [x] Lint sauber (0 Errors)
- [x] README.md (inkl. Changelog) + TODO.md + PLAN.md aktualisiert (Abschluss RC 0.9.x)
- [x] `dev` → Merge nach `main` (RC-Stand für Forum; weiteres Testing + Adapter-Checker vor npm)

#### 4.y Release-Kandidat (0.9.x) — umgesetzt

- [x] Aliase (`alias.0.*`), eigene Variablen mit Filter; Repository in Diagnose; RAM-Summe Adapter
- [x] Manuelle Hinweise oben (Admin/User); Doku-Score erklärt; visuelle Akzente (Gold/Orange/Blau)
- [x] Onboarding: Capabilities, Tipps immer sichtbar, ⏱ bei Cron-Skripten, QR + Copy
- [x] `RENDERER_VERSION` / `info.templateVersion` für Template-Updates ohne Versions-Chaos

#### Admin-UI: Bedingte Sichtbarkeit im KI-Tab (Forum-Feedback) ✅

> Umgesetzt mit `jsonConfig`-Eigenschaft **`hidden`**. Anbieter „Deaktiviert“ blendet KI-Felder aus.

- [x] Anbieter = `none` / deaktiviert → KI-Felder ausgeblendet
- [x] Anbieter = `ollama` → API-Schlüssel ausgeblendet, Basis-URL sichtbar
- [x] Anbieter = `anthropic` / `groq` / `mistral` → API-Schlüssel sichtbar, Basis-URL je nach Feld
- [x] Temperaturen + Timeout nur sichtbar wenn Anbieter aktiv

### KI — Zusammenfassung & Backlog ✅

- [x] Optionale **Temperaturen** User vs. Onboarding (`jsonConfig`); leer = Anbieter-Default
- [x] **HTTP-Timeout** pro Request konfigurierbar
- [x] **Bewohner-Stichpunkte / AI context hints** (nur LLM-Prompt)

<a id="multihost-done"></a>

### Multihost-Unterstützung ✅

> Hintergrund: [PLAN.md — Multihost](/#/docs/adapterref/iobroker.autodoc/PLAN.md#multihost-plan)

- [x] Admin: Host-Distribution (nur wenn > 1 Host); Single-Host unverändert
- [x] Warnung wenn AutoDoc nicht auf primärem Host
- [x] Optional `exportPath`, drei HTML-Profile, Fehler nur warnen
- [x] QR: serverseitig `qrcode`, kein CDN

### Architektur — States entlasten ✅ (Umsetzung)

**Problem / Ziel** wörtlich: große Inhalte kanonisch unter **`/files/`**; States nicht unnötig mit Megabyte-Strings belasten — siehe [PLAN.md — Doppelte Ablage](/#/docs/adapterref/iobroker.autodoc/PLAN.md#doppelte-ablage-states).

- [x] **`documentationStatesMode`**: bis **0.9.38** `full` \| `metadata` (Default **`metadata`** neu); ab **0.9.39** entfernt — immer **`/files/`** + Platzhalter-States
- [x] **`persistDocumentation`**: bei `metadata` Platzhalter in `documentation.markdown` / `.html` / `.json`; `documentation.stateSummary` unverändert
- [x] Download-Aktionen: Quelle `autodoc-latest.*` / `autodoc-admin.html`, Fallback Legacy-State
- [x] **`documentation.exportHashes`**: SHA-256 (hex) der Latest-Exporte (**MD / JSON / Admin-HTML**); bei PDF-Lauf auch **`autodoc-*.pdf`** — beide Modi (**0.9.34** ergänzt PDF-Fingerabdrücke)
- [x] README-Kurztext zu Modus + Hashes

---

## Anhang B — Release-Prozess (Detail)

> Oberste Priorität: **Abschnitt 1.1** oben. Diese Zeilen sind die gleiche Liste, kompakt.

- [ ] Adapter Checker nach dem obigen Maßstab (**E2000** o. Ä. nicht dauerhaft; verbleibende **Warnings** dokumentiert — **CONTRIBUTING.md**)
- [x] npm-Paket **`iobroker.autodoc`** und Maintainer-Abgleich (siehe **CONTRIBUTING.md**)
- [x] Version + `news` bei jedem Release synchron; derzeit **0.9.48**
- [x] `npm publish` über CI Trusted Publishing (**E2008** ab **0.9.48**)
- [x] Git-Tags **v0.9.35** … **v0.9.48**
- [x] **GitHub Releases** — **[CONTRIBUTING — Schritt 7](/#/docs/adapterref/iobroker.autodoc/CONTRIBUTING.md#maintainer-checklist-release-order)**
- [ ] **latest**-Eintrag in **`sources-dist.json`** wiederherstellen (**W4001**)
- [ ] **stable** — **zurückgestellt** bis ausreichend Tester (**#54**)

Bereits erledigt:

- [x] README inkl. **Changelog** (`CHANGELOG.md` entfernt — eine Quelle)
- [x] `dev` → `main` (RC-Forum-Stand)

---

## Bewusst weggelassen

- ❌ Ungefilterte „Komplett-Graphen“ (Skript-/State ohne Knotenlimit) — gestaffelte Mermaid: Phase 5.x
- ❌ Vollständiges Code-Parsing für Abhängigkeiten
- ❌ REST-API / Webhooks
- ❌ Alexa/Google Home Integration
- ❌ Analytics/Adapter-Popularität
- ❌ Mobile App
- ❌ Kollaborative Features