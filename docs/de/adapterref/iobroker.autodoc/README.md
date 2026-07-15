---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.autodoc/README.md
title: ioBroker.autodoc
hash: jmoRTQjUc0jOo2v1G8WdgUEiLsntOD9B9YWSHD4HITU=
---
![Logo](../../../en/adapterref/iobroker.autodoc/admin/autodoc.png)

# IoBroker.autodoc
Erstellt automatisch strukturierte Dokumentationen (HTML, Markdown, JSON) für Ihre ioBroker-Installation – bei Bedarf, nach einem Zeitplan oder bei Systemänderungen.

**Version:** 0.9.46

**Installation**

1. Öffnen Sie **[ioBroker Admin](https://www.iobroker.net/#en/documentation)** und installieren Sie **`iobroker.autodoc`** aus der Adapterliste.
2. Offizieller Adapterindex: **[ioBroker.repositories](https://github.com/ioBroker/ioBroker.repositories)** (**neueste**). Wartungs-Workflow / PR: **[TODO — § 1.1 Release](TODO.md#release-veroeffentlichung)**.

| | |
| --- | --- |
| **Repository** | [github.com/crunchip77/ioBroker.autodoc](https://github.com/crunchip77/ioBroker.autodoc) |
| **Probleme** | [GitHub-Probleme](https://github.com/crunchip77/ioBroker.autodoc/issues) |

**CI:** ![Test und Freigabe](https://github.com/crunchip77/ioBroker.autodoc/workflows/Test%20and%20Release/badge.svg)

## Beschreibung
Der Adapter scannt Adapter, Hosts, Räume, Funktionen, Skripte, Aliase, Benutzerdaten und zugehörige Metadaten und schreibt dann **drei Profile** in einem Durchlauf:

| Profil | Zielgruppe | Fokus |
| --- | --- | --- |
| **Admin** | Operatoren | Instanzen, Hosts, Ressourcen, Skripte, Wartungshinweise, Diagnose |
| **Benutzer** | Haushalt | Räume, Geräte, Automatisierungen in einfacher Sprache |
| **Onboarding** | Gäste | Willkommen, Funktionen, QR-Code / Link zur neuesten HTML-Seite |

Exporte werden unter `/files/autodoc.<instance>/` (neuestes HTML + rotiertes, zeitgestempeltes `.md` / `.html` / `.json`) geschrieben. Optionale Benachrichtigungen und **optionaler KI-Text** (separate Anbieter) können die Dokumentation anreichern.

## Anforderungen
- **Node.js** ≥ 22 (siehe `package.json` → `engines`)
- **ioBroker.js-controller** ≥ 6.0.11 (deklariert in `io-package.json` → `common.dependencies`)
- **ioBroker Admin** ≥ 7.6.20 (deklariert in `io-package.json` → `common.globalDependencies`) — benötigt für die **json**-Konfigurations-UI und die `jsonConfig`-Funktionen (z. B. `textSendTo`, ausklappbare Panels)

Für AutoDoc selbst sind keine weiteren Adapter **erforderlich**. Optional: ein **Webserver**-Adapter, falls Sie generierte Dateien außerhalb des Admin-Dateibrowsers öffnen möchten; Exporte sind immer unter `/files/autodoc.<instance>/` verfügbar. **PDF**-Profile benötigen das optionale npm-Paket **`puppeteer`** (Bestandteil von Chromium), das im Adapterverzeichnis installiert sein muss – siehe **Optionaler PDF-Export** weiter unten.

## Konfiguration
### Übersicht der Dokumentationsinstanz
Konfigurieren Sie die Instanz in **ioBroker Admin** (Registerkarten für Grundlagen, Handbuchhinweise, erweiterte Optionen, Benachrichtigungen, KI). Die Generierung kann manuell, beim Start, zeitgesteuert und nach Adapteränderungen (entprellt) ausgelöst werden.

Die **Dokumentationssprache** (Grundeinstellungen) steuert Überschriften und feste Formulierungen in **allen HTML-Profilen** und in Markdown. Sie bestimmt außerdem die **kurzen Zusammenfassungszeilen** für den Bestandsvergleich („Änderungen seit dem letzten Lauf“) und für die **Änderungsprotokollkarten** beim Neugenerieren. Ältere gespeicherte Änderungsprotokollzeilen werden in der **aktuellen** Exportsprache angezeigt, nicht in der Sprache, in der sie gespeichert wurden.

Unter **Erweitert → Einzuschließende Optionen & Einschränkungen** entfernt die Option **„Änderungen seit dem letzten Lauf“ in Admin-Exporten ausblenden** lediglich das gelbe Delta-Feld oben im Kapitel **Admin**-HTML-System und den zugehörigen Unterabschnitt in **Admin**-Markdown. Das Kapitel **Änderungsprotokoll** sowie die Exporte **Benutzer** und **Onboarding** sind davon nicht betroffen.

Das **Benutzer-/Familienprofil** fügt nach dem Titelblock einen kurzen, alltäglichen Satz hinzu, wenn AutoDoc **mindestens eine** Bestandsänderung seit dem letzten Snapshot festgestellt hat (wird beim ersten Durchlauf und bei unverändertem Bestand übersprungen). **Onboarding** enthält diese zusätzliche Benachrichtigung nicht.

Kurze **Orientierung** für Bediener (Installationspfade, Tabs, Exporte, Hashes, Checker): **[[docs/user-guide/README.md](docs/user-guide/README.md)** · **Deutsches** Konfigurations-Wiki (Registerkarten, Screenshots, Demo-Szenario): **[`docs/user-guide/README.de.md`](docs/user-guide/README.de.md)**.

Nützliche **Zustände** (Auswahl): `action.generate`; **`action.exportPdf`** (schreibt **PDF**-Profile aus dem neuesten HTML unter `/files`, wenn das optionale **`puppeteer`** im Adapterverzeichnis installiert ist – keine vollständige Neugenerierung); `info.lastGeneration` / `info.nextGeneration`; `info.htmlUrlAdmin` / `info.htmlUrlUser` / `info.htmlUrlOnboarding`; `info.templateVersion` (Ausrichtung von HTML-Vorlage und Renderer); `info.forumCardPlain` (Klartext-„Systemkarte“ für Foren, wird bei der Dokumentationsgenerierung aktualisiert).

**Export & Speicherung:** Nach jedem erfolgreichen Durchlauf enthält **`documentation.exportHashes`** den **SHA-256-Hash (hexadezimal)** für die neueste MD-/JSON-/Admin-HTML-Datei, die von `/files` bereitgestellt wurde, und **führt die Hashes für `autodoc-{admin,user,onboarding}.pdf`** zusammen, sobald diese Dateien im Rahmen eines PDF-Exports erstellt wurden. Vollständiges kanonisches Markdown, das JSON-Modell und Admin-HTML befinden sich **ausschließlich** unter **`/files/`** (`autodoc-latest.*`, Profil-HTML). Die Staaten **`documentation.markdown`**, **`documentation.html`** und **`documentation.json`** enthalten nur **kurze Platzhalter** – verwenden Sie **`info.htmlUrl*`**, **`/files/`** oder laden Sie Aktionen herunter, um den vollständigen Text zu erhalten.

### Medien, Redis und Zustandsspeicherung (kurz)
- **Kanonische Exporte** befinden sich immer unter **`/files/autodoc.<instance>/`** und werden bei jedem Durchlauf **überschrieben** (es gibt keine Ansammlung alter HTML-Versionen).
- **`documentation.*`-Body-Zustände** sind **nur Platzhalter** (große Datenmengen werden nicht in der Objektdatenbank dupliziert). Skripte und Integrationen, die **den vollständigen Text** benötigen, lesen **`/files/`** oder verwenden **`info.htmlUrl*`** / Download-Aktionen.
**Fotos und große Binärdateien:** Speichern Sie große Bilder oder Blobs nicht als große Zustandswerte in der Objektdatenbank von ioBroker – insbesondere nicht mit Redis (binäre Nutzdaten belegen viel RAM). Verwenden Sie stattdessen externe URLs (z. B. von Ihrem NAS oder HTTP-Server) oder kleine SVG-Diagramme im Inline-Format. Dieselbe Vorgehensweise sorgt für vorhersehbare JSON-Konfigurationen. AutoDoc speichert vollständige Markdown-, HTML- und JSON-Dateien unter `/files/`. Die Dateien `documentation.markdown`, `documentation.html` und `documentation.json` dienen lediglich als Platzhalter und sind kein Medienspeicher.
- Begründung, Optionen und zukünftige Medienarbeit: [`PLAN.md` — Medien (MVP) & Grenzen](PLAN.md#architektur-medien-mvp) und [Architekturgrenzen](PLAN.md#architektur-grenzen).

### Öffentliche Basis-URL
Das **Onboarding**-HTML enthält einen QR-Code und ein Steuerelement zum **Kopieren des Links**. Beide verwenden dasselbe Ziel: die Onboarding-Datei unter `/files/autodoc.<instance>/autodoc-onboarding.html`, der die **ioBroker-Basis-URL** aus den Adaptereinstellungen vorangestellt ist (Registerkarte **Erweitert**: *ioBroker-Basis-URL (optional)*).

- Legen Sie die Basis-URL so fest, wie Sie sie im Browser verwenden, um ioBroker zu erreichen (Schema, Host, Port, falls erforderlich), **ohne** abschließenden Schrägstrich. Beispiele: `https://home.example.com:8081`, `http://192.168.1.10:8081`.
Ist die URL **leer oder fehlerhaft**, erhalten Gäste, die den QR-Code scannen oder den kopierten Link von einem anderen Gerät verwenden, möglicherweise eine defekte oder nur intern nutzbare URL. Nach der Korrektur muss die Dokumentationsgenerierung erneut ausgeführt werden, damit der HTML-Code neu erstellt wird.

### Optionaler Dateisystemexport (Docker / NAS)
Der **Dateisystem-Exportpfad** schreibt die drei HTML-Profile in ein reales Verzeichnis (zusätzlich zum Speicher von ioBroker im Verzeichnis `/files/…`). In **Docker** ordnen Sie einen Host-Ordner dem Container zu und legen Sie den **Exportpfad** auf den **containerseitigen** Pfad fest (nicht auf den Unraid/Host-Pfad). Eine kurze Erinnerung finden Sie in der Feldhilfe im Adminbereich.

### Optionaler PDF-Export (Puppeteer)
**Bestmögliche Vorgehensweise:** Nach einem erfolgreichen Dokumentationslauf können Sie **`autodoc-admin.pdf`**, **`autodoc-user.pdf`** und **`autodoc-onboarding.pdf`** aus demselben HTML-Code erstellen, der unter `/files/` gespeichert ist (Headless Chromium über **`puppeteer`**, deklariert als **optionale** npm-Abhängigkeit – dieselbe Hauptzeile wie **`@mermaid-js/mermaid-cli`**). Aktivieren Sie **PDF nach jedem Dokumentationslauf generieren** in den **Erweiterten Einstellungen** neben dem Dateisystemexport oder lösen Sie **`action.exportPdf`** manuell aus. PDFs werden unter **`/files/autodoc.<instance>/`** geschrieben und in den **Dateisystemexportpfad** gespiegelt, wenn dieser Pfad festgelegt ist. **Eingebettete Mermaid SVG-Dateien** (wenn mmdc während der Generierung ausgeführt wurde) werden ohne zusätzliche Netzwerkverbindung gedruckt. Der **jsDelivr**-Client Mermaid benötigt auch während der PDF-Erstellung eine Internetverbindung. Ohne einen funktionierenden Chromium-Stack wird die PDF-Erstellung mit einer entsprechenden Fehlermeldung übersprungen – die HTML-/Markdown-Generierung ist davon nicht betroffen.

### KI-Kontexthinweise (Gast vs. Bewohner)
**KI-Kontexthinweise** werden nur in die LLM-Eingabeaufforderung eingefügt; sie werden **nicht** in der Dokumentation angezeigt. Verwenden Sie für das **Onboarding von Gästen** möglichst verständliche, alltägliche Informationen. Fachbegriffe aus dem IT- oder Projektbereich (Adapter, Repositories usw.) können dazu führen, dass das Modell Jargon in den Gasttext einfließen lässt. In diesem Fall wird der entsprechende KI-Block vorsichtshalber durch eine neutrale Formulierung ersetzt. Dies ist beabsichtigt. Das **Bewohner-/Familienprofil** unterliegt dieser Einschränkung nicht. Konfigurieren Sie es im Adminbereich unter **KI-Dokumentation/KI-Dokumentation** (nachdem Sie einen Anbieter aktiviert haben). Der vollständige Text wird im Hinweis über dem Feld angezeigt.

Beispiele zum Kopieren und Einfügen (Feld-IDs, Syntax): [**Meerjungfrau**](#mermaid-cookbook-examples) · [**JSON-Arrays**](#json-cookbook-snippets) · [**Benutzerdefiniertes CSS**](#html-custom-css-examples). Stabile URLs für Lesezeichen/Admin `staticLink`: **`blob/main/README.md#…`** – GitHub öffnet Markdown in der **Vorschau** (lesbar); die Fragmente entsprechen den Überschriften-Slugs unten (gleiche Namen wie die lokalen Links `#…`). Das Scrollen zum Abschnitt funktioniert im GitHub-Viewer nach bestem Wissen und Gewissen; URLs des **Repository-Roots** wie `…/ioBroker.autodoc#json-cookbook-snippets` sind weiterhin unzuverlässig. Nach größeren Änderungen an der README-Datei sollten die Slugs anhand von **`blob/main`** erneut überprüft werden.

`https://github.com/crunchip77/ioBroker.autodoc/blob/main/README.md#documentation-instance-overview`

`https://github.com/crunchip77/ioBroker.autodoc/blob/main/README.md#public-base-url`

`https://github.com/crunchip77/ioBroker.autodoc/blob/main/README.md#optional-pdf-export-puppeteer`

`https://github.com/crunchip77/ioBroker.autodoc/blob/main/README.md#mermaid-cookbook-examples`

`https://github.com/crunchip77/ioBroker.autodoc/blob/main/README.md#json-cookbook-snippets`

`https://github.com/crunchip77/ioBroker.autodoc/blob/main/README.md#html-custom-css-examples`

<h3 id="mermaid-cookbook-examples">Beispiele aus Meerjungfrauen-Kochbüchern</h3>

Fügen Sie den Inhalt in **Meine Dokumentation → Mermaid-Diagramm** (`manualMermaidDiagram`) ein. Verwenden Sie innerhalb des Feldes **einfache Zeilenumbrüche** (kein HTML). Verwenden Sie vorzugsweise **`flowchart LR`**, damit breite Diagramme auf die HTML-Seite passen; sehr große Grafiken sind schwer lesbar – teilen Sie Konzepte gegebenenfalls auf mehrere Diagramme auf.

**Eingebettetes SVG:** Wenn **`@mermaid-js/mermaid-cli`** im Adapterverzeichnis installiert ist und die Generierung erfolgreich war, werden Diagramme als Inline-SVG in HTML dargestellt (ideal für Offline-/PDF-Nutzung). Schlägt die Einbettung fehl oder fehlt die CLI, enthält der Export einen `<pre class="mermaid">`-Block, und der Browser lädt Mermaid möglicherweise über jsDelivr – siehe **Optionaler PDF-Export** und **`docs/user-guide`** („Optionale Mermaid CLI“).

Minimaler Überblick von links nach rechts:

```text
flowchart LR
  Internet([Internet]) --> Router[Router]
  Router --> ioB(ioBroker host)
  ioB --> Heating[Heating adapters]
  ioB --> Lights[Lights / rooms]
```

Kleiner **Teilgraph** (zusammengehörige Knoten gruppieren):

```text
flowchart LR
  subgraph LAN["Home LAN"]
    A[js-controller] --> B[javascript.0]
    A --> C[other instances]
  end
```

**Tipps**

- Verwenden Sie ausschließlich **unterstützte Mermaid**-Konstrukte, die Sie bereits an anderer Stelle erfolgreich eingesetzt haben; exotische Direktiven können `mmdc` beschädigen.
Die automatische Host-Topologie ist separat („autoMermaidHostGraph“). Blenden Sie sie mit „mermaidAuto“ in den Ausblendlisten für Administratoren/Benutzer aus (siehe „EXTRA_HIDDEN_CHAPTER_IDS“ in „lib/docTemplateConfig.js“). Das manuelle Mermaid-Diagramm befindet sich unter „manual“ im Administratorbereich. Blenden Sie dieses Kapitel aus, wenn Sie es nicht benötigen. Im Benutzerbereich werden „mermaid“ und „mermaidAuto“ separat in der Feldhilfe aufgeführt. Verwenden Sie im Onboarding-Bereich „mermaid“ für das Besitzerdiagramm im Willkommensbereich (siehe die Hilfe des entsprechenden Tabs).

<h3 id="json-cookbook-snippets">JSON-Kochbuch-Snippets</h3>

Die Administration speichert diese Felder als **Zeichenketten**; der Inhalt muss **gültiges JSON** sein (`"` Schlüssel/Zeichenketten, keine nachfolgenden Kommas). Eine leere Liste bedeutet Standardwerte: Verwenden Sie **`[]`**, wenn Sie die Reihenfolge nicht überschreiben oder etwas ausblenden möchten.

Deutsche **Szenarioseite** („Erstes ausblenden vs. Neu anordnen“, Copy-Paste-Anleitung verankert bei Schritt 6): **[`README.de.md` — Wiki — Schritt 6](https://github.com/crunchip77/ioBroker.autodoc/blob/main/docs/user-guide/README.de.md#wiki-admin-json-cookbook)** (`docs/user-guide/`).

**Zulässige Kapitel-IDs** stammen vom Adapter (`lib/docTemplateConfig.js`):

| Profil | Bestellfelder | Ausgeblendete Felder | Notizen |
| --- | --- | --- | --- |
| Admin | `adminChapterOrderJson` | `adminHiddenChaptersJson` | Standardreihenfolge: `manual`, `system`, …, `appendices`. Zusätzliche, nur ausblendbare ID: **`mermaidAuto`** (automatische Host-Topologie). Das **manuelle** Mermaid-Diagramm ist Teil von **`manual`** – lassen Sie dieses Kapitel vollständig weg, um es aus den Admin-Exporten zu entfernen. |
| Onboarding | `onboardingChapterOrderJson` | `onboardingHiddenChaptersJson` | Zu den Schlüsseln gehören `welcome`, `quickstart`, `tips`, `guestHelp`, `stats`, `ai`, `capabilities`, `mermaid`, `rooms`, `routines`, `ownerPlaybook`, `automations`, `adapters`, `custom`, `hint`, `system`, `manual`. |
| Onboarding | `onboardingChapterOrderJson` | `onboardingHiddenChaptersJson` | Schlüssel umfassen `welcome`, `quickstart`, `tips`, `guestHelp`, `stats`, `ai`, `capabilities`, `mermaid`, `rooms`, `routines`, `ownerPlaybook`, `automations`, `adapters`, `custom`, `hint`, `system`, `manual`. |

**Admin neu anordnen** — Systemübersicht direkt nach dem manuellen Kontext einfügen:

```json
["manual", "system", "adapters", "rooms", "scripts", "schedule", "userdata", "aliases", "maintenance", "diagnosis", "troubleshooting", "custom", "changelog", "appendices"]
```

**Änderungsprotokoll und Anhänge für Administratoren ausblenden:**

```json
["changelog", "appendices"]
```

**Kapitel „Benutzerskripte ausblenden“:**

```json
["scripts"]
```

**Benutzer neu anordnen** — **`system`** nach den Räumen anzeigen (vollständige Schlüsselliste, ansonsten gleiche IDs wie in der Standardreihenfolge):

```json
["manual", "guestHelp", "ai", "atAGlance", "rooms", "system", "scripts", "routines", "ownerPlaybook", "mermaid", "adapters", "custom", "troubleshooting"]
```

**Benutzerdefinierte Markdown-Kapitel** (`customDocSectionsJson`) – Array von Objekten mit **`title`**, **`body`** (oder **`bodyMarkdown`**), optional **`profiles`** (`"admin"` | `"user"` | `"onboarding"`). Lassen Sie **`profiles`** weg, um es in **allen** Profilen anzuzeigen.

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

Maximal **12** Abschnitte; sehr lange Körper werden bei der Generierung abgeschnitten.

<h3 id="html-custom-css-examples">HTML-Beispiele für benutzerdefiniertes CSS</h3>

Unter **Admin → HTML-Export & Zusatzbereiche** können Sie unter **Schriftartenstapel** (`htmlFontStack`) und **Zusätzliches CSS** (`htmlExtraCss`) nur das **exportierte HTML** (nicht Markdown) anpassen. Der Renderer umschließt Seiten mit `lib/htmlRenderer.js` (`wrapPage`): Links in der Seitenleiste befinden sich unter **`nav ul li a`**, das Layout verwendet **`#layout`**, **`nav`** und **`main`**. Untersuchen Sie den generierten HTML-Code, falls Sie einen Selektor benötigen.

**Schriftstapel:** Eine CSS-Liste `font-family` (Risikozeichen `< > { }` werden entfernt). Beispiel:

```css
"Source Serif 4", Georgia, serif
```

**Zusätzliches CSS:** Fügt kurze Regeln nach dem integrierten Stylesheet hinzu. Bevorzugt werden **vorhandene Paletten-Token** (`var(--link)`, `var(--nav-bg)`, `var(--border)`, `var(--surface)`, … aus den Blöcken `:root` / `body.dark`); **`htmlThemePreset`** ersetzt diese über die Klassen `html.autodoc-preset-*` – es gibt kein separates Token `--accent` für `:root` (einige Komponenten verwenden `var(--accent, #0066cc)` nur als **lokalen** Fallback).

Hier ein erster Codeausschnitt, den Sie in **Extra CSS** einfügen können:

```css
nav { width: 260px; }
nav ul li a:hover { opacity: 0.92; }
h2 { border-bottom-color: var(--link); }
```

## Funktionen (Übersicht)
- Erkennung über Instanzen, Hosts, Aufzählungen, Skripte, Aliase, Benutzerdaten und Systemkonfigurationen hinweg
- Eigenständige HTML-Datei pro Profil mit Suche, Dunkelmodus und responsivem Layout
- Markdown- und JSON-Export sowie Versionsverlauf (Rotation konfigurierbar)
- Wartungsorientierte Hinweise (Dokumentationsbewertung für offene Checklistenpunkte; deaktivierte Instanzen werden als Inventar aufgeführt und nicht bestraft)
- Mehrsprachige Admin-UI-Texte (EN / DE / FR vollständig; weitere Gebietsschemas mit englischer Kopie bis zur Übersetzung — [CONTRIBUTING](CONTRIBUTING.md#admin-ui-translations-i18n)); generierter Dokumentationstext folgt der **Dokumentationssprache**, einschließlich Änderungsprotokoll-/Vergleichszusammenfassungszeilen und optionalen Hinweisen auf Bestandsänderungen in Benutzerexporten
- Optionale KI-Anbieter (z. B. Ollama, Groq, Anthropic) mit strikter Opt-in-Regelung

Für **Roadmap und Planung**: [[`TODO.md`](TODO.md) (offene Aufgaben oben, vollständige Checklisten im Anhang) und [`PLAN.md`](PLAN.md) (Vision, Begründung, Architektur-Brainstorming).

**Mitwirken / Veröffentlichungen:** siehe [`CONTRIBUTING.md`](CONTRIBUTING.md).

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