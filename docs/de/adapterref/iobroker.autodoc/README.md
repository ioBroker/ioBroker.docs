---
chapters: {"pages":{"en/adapterref/iobroker.autodoc/README.md":{"title":{"en":"ioBroker.autodoc"},"content":"en/adapterref/iobroker.autodoc/README.md"},"en/adapterref/iobroker.autodoc/TODO.md":{"title":{"en":"AutoDoc Adapter — TODO-Liste"},"content":"en/adapterref/iobroker.autodoc/TODO.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/README.md":{"title":{"en":"AutoDoc — user guide (first steps)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/README.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/README.de.md":{"title":{"en":"AutoDoc — Konfiguration der Instanz (Wiki)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/README.de.md"},"en/adapterref/iobroker.autodoc/PLAN.md":{"title":{"en":"AutoDoc Adapter — Projektplan"},"content":"en/adapterref/iobroker.autodoc/PLAN.md"},"en/adapterref/iobroker.autodoc/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.autodoc"},"content":"en/adapterref/iobroker.autodoc/CONTRIBUTING.md"},"en/adapterref/iobroker.autodoc/docs/iobroker-adapter-references.md":{"title":{"en":"ioBroker-Adapterentwicklung — Referenzen (adapter-neutral)"},"content":"en/adapterref/iobroker.autodoc/docs/iobroker-adapter-references.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md":{"title":{"en":"Echte Screenshots für den User-Guide (optional)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.autodoc/README.md
title: ioBroker.autodoc
hash: 51LGCO5BrXAG4xBeyr0pv88o/QMaNGOFFcE+nFnuklE=
---
![Logo](../../../en/adapterref/iobroker.autodoc/admin/autodoc.png)

![Test und Freigabe](https://github.com/crunchip77/ioBroker.autodoc/workflows/Test%20and%20Release/badge.svg)

# ioBroker.autodoc

Erstellt automatisch strukturierte Dokumentationen (HTML, Markdown, JSON) für Ihre ioBroker-Installation – bei Bedarf, nach einem Zeitplan oder bei Systemänderungen.

**Version:** 0.9.48

**Installation**

1. Öffnen Sie **[ioBroker Admin](https://www.iobroker.net/#en/documentation)** und installieren Sie es.** `iobroker.autodoc` ** aus der Adapterliste.
2. Offizieller Adapterindex: **[ioBroker.repositories](https://github.com/ioBroker/ioBroker.repositories)** ( **neueste Version** ). Wartungs-Workflow / PR: **[TODO — § 1.1 Release](/#/docs/adapterref/iobroker.autodoc/TODO.md#release-veroeffentlichung)** .

|                |                                                                                          |
| -------------- | ---------------------------------------------------------------------------------------- |
| **Repository** | [github.com/crunchip77/ioBroker.autodoc](https://github.com/crunchip77/ioBroker.autodoc) |
| **Probleme**   | [GitHub-Probleme](https://github.com/crunchip77/ioBroker.autodoc/issues)                 |

## Beschreibung

Der Adapter scannt Adapter, Hosts, Räume, Funktionen, Skripte, Aliase, Benutzerdaten und zugehörige Metadaten und schreibt dann in einem Durchlauf **drei Profile** :

| Profil            | Publikum  | Fokus                                                             |
| ----------------- | --------- | ----------------------------------------------------------------- |
| **Administrator** | Betreiber | Instanzen, Hosts, Ressourcen, Skripte, Wartungshinweise, Diagnose |
| **Benutzer**      | Haushalt  | Räume, Geräte, Automatisierungen in einfacher Sprache             |
| **Onboarding**    | Gäste     | Willkommen, Funktionen, QR-Code / Link zur neuesten HTML-Version  |

Exporte werden unter `/files/autodoc.<instance>/` (neuestes HTML + gedrehter Zeitstempel) `.md` /`.html` /`.json` Optionale Benachrichtigungen und **optionaler KI-** Text (von separaten Anbietern) können die Dokumente anreichern.

## Anforderungen

- **Node.js** ≥ 22 (siehe `package.json` →`engines`)
- **ioBroker.js-controller** ≥ 6.0.11 (deklariert in `io-package.json` →`common.dependencies`)
- **ioBroker Admin** ≥ 7.8.23 (deklariert in `io-package.json` →`common.globalDependencies`) — erforderlich für die **JSON** -Konfigurations-UI und `jsonConfig` Merkmale (z. B. `textSendTo` (zusammenklappbare Paneele)

Für AutoDoc selbst werden keine weiteren Adapter **benötigt** . Optional: ein **Webserver-** Adapter, falls Sie generierte Dateien außerhalb des Admin-Dateibrowsers öffnen möchten; Exporte sind immer verfügbar unter `/files/autodoc.<instance>/` Für **PDF-** Profile wird das optionale npm-Paket benötigt.** `puppeteer` ** (mitgeliefertes Chromium) im Adapterverzeichnis installiert — siehe **Optionaler PDF-Export** unten.

## Konfiguration

### Übersicht der Dokumentationsinstanz

Konfigurieren Sie die Instanz in **ioBroker Admin** (Registerkarten für Grundlagen, Handbuchhinweise, erweiterte Optionen, Benachrichtigungen, KI). Die Generierung kann manuell, beim Start, zeitgesteuert und nach Adapteränderungen (entprellt) ausgelöst werden.

**Die Dokumentationssprache** (Grundeinstellungen) steuert Überschriften und feste Formulierungen in **allen HTML-Profilen** und in Markdown. Sie bestimmt außerdem die **kurzen Zusammenfassungszeilen** für den Bestandsvergleich („Änderungen seit dem letzten Lauf“) und für **Änderungsprotokollkarten** beim erneuten Generieren – ältere gespeicherte Änderungsprotokollzeilen werden in der **aktuellen** Exportsprache angezeigt, nicht in der Sprache, in der sie gespeichert waren.

Unter **„Erweitert“ → „Einzuschließende Inhalte & Einschränkungen“** wird durch die Option **„Änderungen seit dem letzten Lauf ausblenden“ in den Admin-Exporten** lediglich das gelbe Delta-Feld oben im Kapitel **„Admin-** HTML-System“ und der entsprechende Unterabschnitt in **„Admin-** Markdown“ entfernt. Die Kapitel **„Änderungsprotokoll“** , **„Benutzer“** und **„Onboarding“** sind davon nicht betroffen.

Das **Benutzer-/Familienprofil** fügt nach dem Titelblock einen kurzen, alltäglichen Satz hinzu, wenn AutoDoc seit dem letzten Snapshot **mindestens eine** Bestandsänderung festgestellt hat (wird beim ersten Durchlauf und bei unverändertem Bestand übersprungen). Diese zusätzliche Benachrichtigung ist **beim Onboarding** nicht enthalten.

**Kurzanleitung** für Bediener (Installationspfade, Tabs, Exporte, Hashes, Prüfer):**[`docs/user-guide/README.md`](/#/docs/adapterref/iobroker.autodoc/docs/user-guide/README.md)** • **Deutsches** Konfigurations-Wiki (Registerkarten, Screenshots, Demo-Szenario):**[`docs/user-guide/README.de.md`](/#/docs/adapterref/iobroker.autodoc/docs/user-guide/README.de.md)** Die

Nützliche **Zustände** (Auswahl): `action.generate`;** `action.exportPdf` ** (schreibt **PDF-** Profile aus dem neuesten HTML unter `/files` wenn optiona&#x6C;** `puppeteer` ** wird im Adapterverzeichnis installiert – keine vollständige Neugenerierung); `info.lastGeneration` /`info.nextGeneration`; `info.htmlUrlAdmin` /`info.htmlUrlUser` /`info.htmlUrlOnboarding`; `info.templateVersion` (Ausrichtung von HTML-Vorlage und Renderer); `info.forumCardPlain` (Klartext-„Systemkarte“ für Foren, wird aktualisiert, sobald die Dokumentation generiert wird).

**Export & Speicherung:** nach jedem erfolgreichen Durchlauf,** `documentation.exportHashes` ** enthält **den SHA-256-Hash (hexadezimal)** für die neueste MD-/JSON-/Admin-HTML-Datei, die von `/files` und **führt Digests zusammen für `autodoc-{admin,user,onboarding}.pdf` ** Immer wenn ein PDF-Exportschritt diese Dateien erstellt hat. Canonical Full Markdown, JSON-Modell und Admin-HTML existieren **nur** unte&#x72;** `/files/` ** (`autodoc-latest.*`, Profil-HTML). Die Staate&#x6E;** `documentation.markdown` ** ,** `documentation.html` ** , Un&#x64;** `documentation.json` ** Nur **kurze Platzhalter** verwende&#x6E;** `info.htmlUrl*` ** ,** `/files/` ** Oder laden Sie Aktionen herunter, um den vollständigen Text zu erhalten.

### Medien, Redis und Zustandsspeicherung (kurz)

- **Kanonische Exporte** leben immer unte&#x72;** `/files/autodoc.<instance>/` ** und werden bei jedem Durchlauf **überschrieben** (es gibt keine Ansammlung alter HTML-Versionen).
- ** `documentation.*` Die Statusangaben im Nachrichtentext** dienen **lediglich als Platzhalter** (große Datenmengen werden nicht in der Objektdatenbank dupliziert). Skripte und Integrationen, die **den Volltext** lesen müssen, werden benötigt.** `/files/` ** oder verwende&#x6E;** `info.htmlUrl*` ** / Aktionen herunterladen.
- **Fotos und große Binärdateien:** Speichern Sie **keine** großen Bilder oder Blobs als **große Zustandswerte** in **der Objektdatenbank** von ioBroker – **insbesondere nicht bei Verwendung von Redis** (binäre Nutzdaten belegen viel RAM). Verwenden Sie stattdessen **externe URLs** (z. B. von Ihrem NAS oder HTTP-Server) oder kleine **SVG-Diagramme im Inline-Format** . Dieselbe Vorgehensweise sorgt für vorhersehbare **JSONL-** Konfigurationen. AutoDoc speichert **vollständige** Markdown-/HTML-/JSON-Dateien unte&#x72;** `/files/` ** ;** `documentation.markdown` ** ,** `documentation.html` ** , Un&#x64;** `documentation.json` ** sind nur **kurze Platzhalter** – kein Medienshop.
- Begründung, Optionen und zukünftige Medienarbeit: [`PLAN.md`— Medien (MVP) & Grenzen](/#/docs/adapterref/iobroker.autodoc/PLAN.md#architektur-medien-mvp) und [Architekturgrenzen](/#/docs/adapterref/iobroker.autodoc/PLAN.md#architektur-grenzen) .

### Öffentliche Basis-URL

Das **Onboarding-** HTML enthält einen QR-Code und eine Schaltfläche **zum Kopieren des Links** . Beide verwenden dasselbe Ziel: die Onboarding-Datei unter `/files/autodoc.<instance>/autodoc-onboarding.html`, mit dem Präfix der **ioBroker-Basis-URL** aus den Adaptereinstellungen ( Registerkarte „ **Erweitert“** : _ioBroker-Basis-URL (optional)_ ).

- Legen Sie die Basis-URL so fest, wie Sie sie im Browser verwenden, um ioBroker zu erreichen (Schema, Host, Port, falls erforderlich), **ohne** abschließenden Schrägstrich. Beispiele: `https://home.example.com:8081`, `http://192.168.1.10:8081` Die
- Ist der Eintrag **leer oder fehlerhaft** , erhalten Gäste, die den QR-Code scannen oder den kopierten Link von einem anderen Gerät verwenden, möglicherweise eine defekte oder nur intern nutzbare URL. Nach der Korrektur muss die Dokumentationsgenerierung erneut ausgeführt werden, damit der HTML-Code neu erstellt wird.

### Optionaler Dateisystemexport (Docker / NAS)

**Der Dateisystem-Exportpfad** schreibt die drei HTML-Profile in ein reales Verzeichnis (zusätzlich zu ioBrokers). `/files/…` Speicher). In **Docker** ordnen Sie einen Hostordner dem Container zu und legen **den Exportpfad** auf den **Containerpfad** fest (nicht auf den Unraid/Hostpfad). Eine kurze Erinnerung finden Sie in der Feldhilfe im Adminbereich.

### Optionaler PDF-Export (Puppeteer)

**Bestmögliche Vorgehensweise:** Nach einem erfolgreichen Dokumentationslauf können Sie Folgendes erstelle&#x6E;** `autodoc-admin.pdf` ** ,** `autodoc-user.pdf` ** , Un&#x64;** `autodoc-onboarding.pdf` ** aus demselben HTML-Code, der unter `/files/` (kopfloses Chromium vi&#x61;** `puppeteer` ** , als **optionale** npm-Abhängigkeit deklariert – gleiche Hauptzeile wi&#x65;** `@mermaid-js/mermaid-cli` ** Aktivieren Sie die Option **„PDF nach jedem Dokumentationslauf generieren“** unter **„Erweitert“** neben dem Dateisystemexport oder lösen Sie den Vorgang aus.** `action.exportPdf` ** manuell. PDFs werden geschrieben unte&#x72;** `/files/autodoc.<instance>/` ** Die Datei wird in **den Dateisystem-Exportpfad** gespiegelt, sofern dieser festgelegt ist. **Eingebettete Mermaid-SVG-Dateien** (wenn mmdc während der Generierung ausgeführt wurde) werden ohne zusätzliche Netzwerkverbindung gedruckt; **der jsDelivr** -Client Mermaid benötigt jedoch weiterhin eine Internetverbindung für den PDF-Schritt. Ohne einen funktionierenden Chromium-Stack wird die PDF-Erstellung mit einer entsprechenden Fehlermeldung übersprungen – die HTML-/Markdown-Generierung ist davon nicht betroffen.

### KI-Kontexthinweise (Gast vs. Bewohner)

**KI-Kontexthinweise** werden nur in die LLM-Eingabeaufforderung eingefügt und **nicht** in der Dokumentation angezeigt. Für **die Gästeregistrierung** sollten Sie alltagsnahe Informationen verwenden. Fachbegriffe aus dem IT- oder Projektbereich (Adapter, Repositories usw.) können dazu führen, dass das Modell Jargon in den Gästetext einfließen lässt. **Um** dies zu vermeiden, wird der entsprechende KI-Block durch eine neutrale Formulierung für Gäste ersetzt. Dies ist beabsichtigt. Das **Bewohner-/Familienprofil** unterliegt dieser Einschränkung nicht. Konfigurieren Sie diese Profile im Adminbereich unter **KI-Dokumentation/KI-Dokumentation** (nach Aktivierung eines Anbieters). Der vollständige Text wird im Hinweis über dem Feld angezeigt.

**Beispiele** zum Kopieren und Einfügen (Feld-IDs, Syntax): [**Mermaid**](#mermaid-cookbook-examples) · [**JSON-Arrays**](#json-cookbook-snippets) · [**Benutzerdefiniertes CSS**](#html-custom-css-examples) · **Stabile URLs** für Lesezeichen / Admin `staticLink`:** `blob/main/README.md#…` ** — GitHub öffnet Markdown in **der Vorschau** (lesbar); die Fragmente entsprechen den Überschriften-Slugs unten (gleiche Namen wie lokal). `#…` Links). Die Scroll-to-Abschnitt-Funktion ist im GitHub-Viewer **so gut wie möglich implementiert** ; **Repository-Root** -URLs wie `…/ioBroker.autodoc#json-cookbook-snippets` bleiben unzuverlässig. Nach größeren Änderungen an der README-Datei **sollten die Slugs erneut überprüft werden** .** `blob/main` ** Die

`https://github.com/crunchip77/ioBroker.autodoc/blob/main/README.md#documentation-instance-overview`

`https://github.com/crunchip77/ioBroker.autodoc/blob/main/README.md#public-base-url`

`https://github.com/crunchip77/ioBroker.autodoc/blob/main/README.md#optional-pdf-export-puppeteer`

`https://github.com/crunchip77/ioBroker.autodoc/blob/main/README.md#mermaid-cookbook-examples`

`https://github.com/crunchip77/ioBroker.autodoc/blob/main/README.md#json-cookbook-snippets`

`https://github.com/crunchip77/ioBroker.autodoc/blob/main/README.md#html-custom-css-examples`

<h3 id="mermaid-cookbook-examples">Mermaid cookbook examples</h3>

In **Meine Dokumentation einfügen → Mermaid-Diagramm** (`manualMermaidDiagram` Verwenden Sie innerhalb des Feldes **einfache Zeilenumbrüche** (kein HTML). Bevorzug&#x74;** `flowchart LR` ** So breite Diagramme passen auf die HTML-Seite; sehr große Grafiken sind schwer lesbar – teilen Sie Konzepte gegebenenfalls auf separate Diagramme auf.

**Eingebettetes SVG:** wen&#x6E;** `@mermaid-js/mermaid-cli` ** Wenn die Installation im Adapterverzeichnis erfolgreich ist und die Generierung erfolgreich war, werden Diagramme als Inline-SVG in HTML dargestellt (gut für Offline-/PDF-Nutzung). Falls das Einbetten fehlschlägt oder die Befehlszeile fehlt, bleibt der Export unverändert. `<pre class="mermaid">` Block und der Browser lädt möglicherweise Mermaid von jsDelivr – siehe **Optionaler PDF-Export** un&#x64;** `docs/user-guide` ** („Optionale Mermaid CLI“).

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

- Verwenden Sie ausschließlich **unterstützte Mermaid-** Konstrukte, die sich bereits bewährt haben; ungewöhnliche Direktiven können zu Fehlern führen. `mmdc` Die
- **Die automatische Host-Topologie** ist separat (`autoMermaidHostGraph`); verstecke es mi&#x74;** `mermaidAuto` ** In **Admin/Benutzer** Listen ausblenden (siehe `EXTRA_HIDDEN_CHAPTER_IDS` In `lib/docTemplateConfig.js` Das **manuelle** Mermaid-Diagramm befindet sich unte&#x72;** `manual` ** Unter **„Admin** “ können Sie das entsprechende Kapitel ausblenden, wenn Sie es entfernen möchten. Unter **„Benutzer“** finden Sie Feldhilfelisten.** `mermaid` ** Un&#x64;** `mermaidAuto` ** separat; beim **Onboarding** verwende&#x6E;** `mermaid` ** Für das Eigentümerdiagramm im Willkommensbereich (siehe Hilfe auf dieser Registerkarte).

<h3 id="json-cookbook-snippets">JSON cookbook snippets</h3>

Der Administrator speichert diese Felder als **Zeichenketten** ; der Inhalt muss **gültiges JSON** sein (`"` Schlüssel/Zeichenketten (ohne nachfolgende Kommas). Leere Liste bedeutet Standardwerte: verwende&#x6E;** `[]` ** wenn Sie die Reihenfolge nicht überschreiben oder etwas ausblenden möchten.

Deutsche **Szenarioseite** („Zuerst ausblenden vs. Neu anordnen“, Copy-Paste-Anleitung mit Bezug auf Schritt 6): **[`README.de.md`— Wiki — Schritt 6](/#/docs/adapterref/iobroker.autodoc/docs/user-guide/README.de.md#wiki-admin-json-cookbook)** (`docs/user-guide/`).

**Zulässige Kapitel-IDs** stammen vom Adapter (`lib/docTemplateConfig.js`):

| Profil        | Bestellfelder                | Versteckte Felder              | Anmerkungen                                                                                                                                                                                                                                                                         |
| ------------- | ---------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Administrator | `adminChapterOrderJson`      | `adminHiddenChaptersJson`      | Standardreihenfolge: `manual`, `system`, …, `appendices` Zusätzliche ID zum Ausblenden:** `mermaidAuto` ** (Auto-Host-Topologie). Das **manuelle** Mermaid-Diagramm ist Teil vo&#x6E;** `manual` ** — Lassen Sie dieses Kapitel komplett weg, um es aus den Admin-Exporten zu entfernen. |
| Benutzer      | `userChapterOrderJson`       | `userHiddenChaptersJson`       | Zu den Schlüsseln gehören `manual`, `ai`, `guestHelp`, `atAGlance`, `rooms`, `scripts`, `routines`, `ownerPlaybook`, `mermaid`, `adapters`, `custom`, `system`, `troubleshooting` Die                                                                                                |
| Onboarding    | `onboardingChapterOrderJson` | `onboardingHiddenChaptersJson` | Zu den Schlüsseln gehören `welcome`, `quickstart`, `tips`, `guestHelp`, `stats`, `ai`, `capabilities`, `mermaid`, `rooms`, `routines`, `ownerPlaybook`, `automations`, `adapters`, `custom`, `hint`, `system`, `manual` Die                                                          |

**Admin neu anordnen** – Systemübersicht direkt nach dem manuellen Kontext einfügen:

```json
["manual", "system", "adapters", "rooms", "automationOverview", "scripts", "schedule", "userdata", "aliases", "maintenance", "diagnosis", "troubleshooting", "custom", "changelog", "appendices"]
```

Admin-Änderungsprotokoll und Anhänge **ausblenden** :

```json
["changelog", "appendices"]
```

**Kapitel „Benutzerskripte ausblenden“:**

```json
["scripts"]
```

**Benutzer neu anordnen** — bringe&#x6E;** `system` ** Nach den Räumen (vollständige Schlüsselliste, ansonsten gleiche IDs wie in der Standardreihenfolge):

```json
["manual", "guestHelp", "ai", "atAGlance", "rooms", "system", "scripts", "routines", "ownerPlaybook", "mermaid", "adapters", "custom", "troubleshooting"]
```

**Benutzerdefinierte Markdown-Kapitel** (`customDocSectionsJson`) — Array von Objekten mi&#x74;** `title` ** ,** `body` ** (ode&#x72;** `bodyMarkdown` ** ), optiona&#x6C;** `profiles` ** (`"admin"` |`"user"` |`"onboarding"`). weglasse&#x6E;** `profiles` ** in **allen** Profilen anzeigen.

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

<h3 id="html-custom-css-examples">HTML custom CSS examples</h3>

Unter **Admin → HTML-Export & zusätzliche Abschnitte** , **Schriftartenstapel** (`htmlFontStack`) und **zusätzliches CSS** (`htmlExtraCss`) Nur das **exportierte HTML** (nicht Markdown) anpassen. Der Renderer bettet Seiten in HTML ein. `lib/htmlRenderer.js` (`wrapPage`): Die Links in der Seitenleiste befinden sich unte&#x72;** `nav ul li a` ** , Layout verwende&#x74;** `#layout` ** ,** `nav` ** , Un&#x64;** `main` ** — Überprüfen Sie den generierten HTML-Code, falls Sie einen Selektor benötigen.

**Schriftartenstapel:** ein CSS `font-family` Liste (riskante Charaktere) `< > { }` werden entfernt). Beispiel für den Einfügevorgang:

```css
"Source Serif 4", Georgia, serif
```

**Zusätzliches CSS:** Kurze Regeln nach dem integrierten Stylesheet anhängen. **Vorhandene Paletten-Token** bevorzugen (`var(--link)`, `var(--nav-bg)`, `var(--border)`, `var(--surface)`, … von der `:root` /`body.dark` Blöcke);** `htmlThemePreset` ** tauscht diese über `html.autodoc-preset-*` Klassen – es gibt keine getrennten `--accent` Token auf `:root` (einige Komponenten verwenden `var(--accent, #0066cc)` (nur als **lokale** Ausweichlösung).

Hier ist ein erster Code-Ausschnitt, den Sie in **Extra CSS** einfügen können:

```css
nav { width: 260px; }
nav ul li a:hover { opacity: 0.92; }
h2 { border-bottom-color: var(--link); }
```

## Funktionen (Übersicht)

- Erkennung über Instanzen, Hosts, Aufzählungen, Skripte, Aliase, Benutzerdaten und Systemkonfigurationen hinweg
- Eigenständige HTML-Datei pro Profil mit Suche, Dunkelmodus und responsivem Layout
- Markdown- und JSON-Export sowie Versionsverlauf (Rotation konfigurierbar)
- Hinweise zur Wartung (Dokumentationsbewertung für offene Checklistenpunkte; deaktivierte Instanzen werden als Inventar aufgeführt und nicht bestraft)
- Mehrsprachige Admin-UI-Strings (EN / DE / FR vollständig; weitere Gebietsschemas mit englischer Kopie bis zur Übersetzung — [CONTRIBUTING](/#/docs/adapterref/iobroker.autodoc/CONTRIBUTING.md#admin-ui-translations-i18n) ); generierter Dokumentationstext folgt **der Dokumentationssprache** , einschließlich Änderungsprotokoll-/Vergleichszusammenfassungszeilen und optionalen Hinweisen auf Bestandsänderungen in Benutzerexporten
- Optionale KI-Anbieter (z. B. Ollama, Groq, Anthropic) mit strikter Opt-in-Regelung

Für **Roadmap und Planung** :[`TODO.md`](/#/docs/adapterref/iobroker.autodoc/TODO.md) (Offene Aufgaben oben, vollständig ausgefüllte Checklisten im Anhang) und[`PLAN.md`](/#/docs/adapterref/iobroker.autodoc/PLAN.md) (Vision, Begründung, Architektur-Brainstorming).

**Mitwirken / Veröffentlichungen:** siehe[`CONTRIBUTING.md`](/#/docs/adapterref/iobroker.autodoc/CONTRIBUTING.md) Die

## Changelog

**Admin `common.news`** in `io-package.json` lists only versions **published on npm** (Adapter Checker **E2004**). The detailed sections below are the **user-facing** changelog (Git-era releases plus npm); older entries are in `CHANGELOG_OLD.md`.

### 0.9.48 (2026-09-22)

- **Admin — Automation overview:** New **Automatisierung im Überblick** chapter collects time-based JavaScript CRON, ioBroker schedule objects, adapter schedule/restart CRON, and a transparent “what AutoDoc cannot list as a schedule” summary for Blockly/subscribe/rule-engine limits.
- **User / Onboarding — automation clarity:** Family docs now keep automation summaries readable even when Blockly/scripts have no `common.desc`; Quick Start counts active JavaScript automations without exposing technical script names to guests.
- **Rooms and functions:** User/Admin exports resolve room/function members through the ioBroker object hierarchy (State → Channel → Device), deduplicate common POWER/state duplicates, show better device names, and list **functions** with per-function devices like the room device hierarchy.
- **HTML UX polish:** Connected systems, host topology, manual Mermaid diagrams, and function sections are collapsible where they would otherwise dominate the page; disclosure arrows use a more consistent muted style. Room notes now live in expanded room details instead of the compact Admin room table.
- **Mermaid / offline SVG:** `@mermaid-js/mermaid-cli` bumped to 11.16.0; logs now point more clearly at missing Chromium libraries, and `scripts/install-chromium-deps-linux.sh` documents Linux/buanet package hints. Renderer marker: `2026.09.22.9`.

### 0.9.47 (2026-09-20)

- **Repository checker (#60):** Maintainer contact email (E4052); README **`## License`** links to [`LICENSE`](https://github.com/crunchip77/ioBroker.autodoc/blob/main/LICENSE) (E6034)
- **CI:** Node.js **26.x** added to adapter test matrix (W3026)
- **Release / provenance:** npm publish via GitHub Actions **`deploy`** job (Trusted Publishing) — fixes missing attestations from workstation **0.9.46** (E2008)
- **Dependencies:** `@tsconfig/node22`, `@iobroker/adapter-core` bumps (Dependabot)
- **Docs:** Maintainer notes for latest re-listing, stable deferred (#54), platform reconnaissance
- **Runtime:** no adapter behavior changes

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

- **Chapter JSON & logs:** Each documentation run evaluates Admin/User/Onboarding chapter order and hide JSON. **English** adapter **`warn`** lines report invalid JSON shape, **unknown** chapter ids, and **duplicate** ids, with a pointer to the **[German user guide — JSON cookbook](/#/docs/adapterref/iobroker.autodoc/docs/user-guide/README.de.md#wiki-admin-json-cookbook)**. Identical warning **lines** are **deduplicated** per adapter **log** reference (process lifetime). Values read only from **legacy** native keys are labeled **`…Json via native …`** in the log. **`lib/chapterConfigWarnings.js`**; wired from **`DocumentModel.buildDocumentModel`**. **`EXTRA_HIDDEN_CHAPTER_IDS`** exported from **`docTemplateConfig`** for hide-list validation.
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

<!-- Maintainer: Admin staticLinks — under chapter visibility: English README `#json-cookbook-snippets`, Wiki DE `#wiki-admin-json-cookbook`. Schnellzugriff in README.de; SCREENSHOTS table for PNG drift; Sync jsonConfig/i18n if URLs change. -->

## License

MIT License

Copyright (c) 2026 crunchip77 <crunchip77@gmail.com>

The complete license text is in the [LICENSE](https://github.com/crunchip77/ioBroker.autodoc/blob/main/LICENSE) file.