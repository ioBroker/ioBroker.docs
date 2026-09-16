---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md
title: ioBroker Adapter-Creator-Vergleich
hash: W/FEYYlPePBog1Q3Cl87ECbdOyvHdt516k6xxJOgPY0=
---
# ioBroker Adapter-Creator-Vergleich

**Quelle:** Matthias Kleine (haus-automatisierung.com)\
&#x20;**Video:** <https://www.youtube.com/watch?v=A9UETXyAmL4>\
&#x20;**Artikel:** <https://haus-automatisierung.com/software/iobroker/2022/05/06/iobroker-adapter-entwicklung.html>

**Unser Adapter:** iobroker.mcdu (MCDU Smart Home Control)

---

## 🔍 Empfohlener Entwicklungsprozess (Matthias Kleine)

### 1. Einrichtung der Entwicklungsumgebung

**Werkzeuge:**

- ✅ Visual Studio Code (haben wir verwendet)
- ⚠️ **ioBroker dev-server** (haben wir NICHT verwendet)
- ✅ Git / GitHub (haben wir verwendet)
- ✅ Node.js v14+ (haben wir: v14+ Anforderung)
- ⚠️ **Separates Debian-Testsystem** (haben wir nicht - entwickelt auf Mac)

**Empfehlung:**

```bash
# Dev-Server Installation (für lokales Testing)
npm install --global @iobroker/dev-server
```

**Was ist dev-server?**

- Lokaler ioBroker ohne vollständige Installation
- Schnelles Testen einzelner Adapter
- Keine Interferenz mit produktivem System

**Unsere Situation:**

- Entwicklung auf Mac (kein separates Debian-System)
- Kein dev-server verwendet
- Testen direkt auf Produktiv-ioBroker geplant

---

### 2. Adapter-Erstellung

**Empfohlener Weg:**

```bash
npx @iobroker/create-adapter
```

**Was der Schöpfer generiert hat:**

- ✅ package.json
- ✅ io-package.json
- ✅ main.js
- ✅ Admin/ (UI-Dateien)
- ✅ README.md
- ✅ LIZENZ
- ✅ .gitignore
- ✅ .eslintrc.json
- ⚠️ **.github/workflows/** (CI/CD) - **FEHLT BEI UNS**
- ⚠️ **Standardisierte Tests** – **HABEN WIR CUSTOM**
- ⚠️ **Dependabot Config** - **FEHLT BEI UNS**
- ⚠️ **.vscode/** (Debugging Config) - **FEHLT BEI UNS**

**Unser Weg:**

- Manuell erstellt über OpenClaw Sequential Subagents
- Alle Kern-Dateien vorhanden ✅
- Aber: Fehlen Standard-Automation (GitHub Actions) ⚠️

---

### 3. Dateistrukturvergleich

#### Unsere Struktur (iobroker.mcdu)

```
iobroker.mcdu/
├── admin/
│   ├── jsonConfig.json          ✅ Config UI
│   └── i18n/                    ✅ Internationalisierung
│       ├── en/translations.json
│       └── de/translations.json
├── lib/                         ✅ Gut organisiert
│   ├── input/                   (Scratchpad, Validation, etc.)
│   ├── mqtt/                    (MQTT Client, Button Subscriber)
│   ├── rendering/               (PageRenderer, Display Publisher)
│   ├── state/                   (StateTreeManager)
│   └── templates/               (Template Loader + JSON templates)
├── test/                        ✅ Unit Tests
│   ├── ScratchpadManager.test.js
│   └── integration.test.js
├── main.js                      ✅ Adapter Entry Point
├── package.json                 ✅ Dependencies
├── io-package.json              ✅ ioBroker Metadata
├── README.md                    ✅ Documentation
├── LICENSE                      ✅ MIT License
├── .gitignore                   ✅ Git Ignore
├── .eslintrc.json               ✅ Linting Config
├── CHANGELOG.md                 ✅ Version History
└── (viele weitere Docs)         ✅ Umfassende Dokumentation
```

#### Was fehlt (vom Adapter-Creator generiert)

```
❌ .github/
   └── workflows/
       ├── test-and-release.yml    # Auto-Test + npm publish
       ├── adapter-checker.yml     # ioBroker Adapter-Checker
       └── dependabot.yml          # Auto-Updates

❌ .vscode/
   └── launch.json                 # VSCode Debugging Config

❌ .devcontainer/                   # Dev Container für einheitliche Umgebung

❌ .prettierrc.json                 # Code Formatting

⚠️ package.json scripts            # Unvollständig
   - release script fehlt
   - adapter-dev script fehlt
```

---

## 📊 Feature-Vergleich

| Besonderheit                             | Adapter-Ersteller | iobroker.mcdu | Status                   |
| ---------------------------------------- | ----------------- | ------------- | ------------------------ |
| **Basis-Struktur**                       | ✅                 | ✅             | Vollständig              |
| **Admin-UI (JSON-Konfiguration)**        | ✅                 | ✅             | Vollständig              |
| **Internationalisierung**                | ✅                 | ✅             | DE + EN                  |
| **Unit-Tests**                           | ✅ Mokka/Chai      | ✅ Mokka/Chai  | Benutzerdefinierte Tests |
| **ESLint**                               | ✅                 | ✅             | Vollständig              |
| **GitHub Actions CI/CD**                 | ✅                 | ❌             | **FEHLT**                |
| **Dependabot**                           | ✅                 | ❌             | **FEHLT**                |
| **VSCode-Debugging**                     | ✅                 | ❌             | **FEHLT**                |
| **Dev-Server-Unterstützung**             | ✅                 | ⚠️            | Nicht getestet           |
| **Adapter-Prüfer**                       | ✅ Auto            | ⚠️            | Manuell laufen           |
| **npm Veröffentlichungsautomatisierung** | ✅                 | ❌             | **FEHLT**                |

---

## 🎯 Was wir GUT gemacht haben (vs. Standard)

### ✅ Überlegene Architektur

- **13 Kernklassen** (sehr gut organisiert vs. monolithische main.js)
- **Trennung der Zuständigkeiten:** Eingabe, MQTT, Rendering, Zustandsverwaltung getrennt
- **Vorlagensystem:** Wie wiederverwendbare Konfigurationen
- **Umfassende Dokumentation:** \~250 KB Dokumente (im Vergleich zur Standard-README-Datei)

### ✅ Bessere UX-Konzeption

- **Authentische Aviation UX:** Scratchpad, State Machine, LSK-Kopieren/Einfügen
- **Mehrstufige Validierung:** Format, Bereich, Geschäftslogik
- **Bestätigungssystem:** Weiche/Harte/Countdown-Bestätigungen
- **Speicherleckvermeidung:** Sorgfältiges Cleanup in onUnload()

### ✅ Produktionsfertiger Code

- **48 Unit-Tests** (100% Bestehensquote)
- **0 ESLint-Fehler**
- **0 npm audit Schwachstellen**
- **Leistungsoptimierung:** Drosselung, Entprellung, Caching

---

## ⚠️ Was wir FEHLT (vs. Standard)

### 1. GitHub Actions CI/CD

**Was fehlt:**

```yaml
# .github/workflows/test-and-release.yml
name: Test and Release

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [14.x, 16.x, 18.x]
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm ci
      - run: npm test
      - run: npm run lint

  adapter-checker:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: ioBroker Adapter Checker
        uses: ioBroker/testing-action-adapter@v1

  release:
    needs: [test, adapter-checker]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Publish to npm
        uses: JS-DevTools/npm-publish@v1
        with:
          token: ${{ secrets.NPM_TOKEN }}
```

**Warum ist das wichtig?**

- Auto-Testing auf mehreren Node-Versionen
- Adapter-Checker für jedes Release
- Automatische npm-Veröffentlichung
- Community-Standard für ioBroker-Adapter

---

### 2. VSCode-Debugging-Konfiguration

**Was fehlt:**

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Adapter",
      "program": "${workspaceFolder}/main.js",
      "args": [
        "--debug"
      ],
      "env": {
        "NODE_ENV": "development"
      }
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Tests",
      "program": "${workspaceFolder}/node_modules/mocha/bin/_mocha",
      "args": [
        "--timeout",
        "999999",
        "--colors",
        "${workspaceFolder}/test/**/*.test.js"
      ]
    }
  ]
}
```

**Warum ist das wichtig?**

- Schnelles Debugging mit Breakpoints
- Testen und Debuggen direkt in VSCode
- Entwickler-Erfahrung verbessert

---

### 3. Dev-Server-Integration

**Was fehlt:**

```bash
# Im Adapter-Verzeichnis
dev-server setup
dev-server watch
```

**Warum ist das wichtig?**

- Lokales Testen ohne produktive ioBroker-Instanz
- Schnellere Iterationen
- Keine Gefahr für Produktiv-System

---

### 4. package.json Scripts Erweiterung

**Was wir haben:**

```json
"scripts": {
  "test": "mocha --exit",
  "lint": "eslint ."
}
```

**Was Standard wäre:**

```json
"scripts": {
  "test": "mocha --exit",
  "test:integration": "mocha --exit test/integration/**/*.test.js",
  "test:unit": "mocha --exit test/unit/**/*.test.js",
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "check": "npm run lint && npm test",
  "translate": "node admin/i18n.js",
  "release": "iobroker-dev-server release",
  "release:minor": "iobroker-dev-server release minor",
  "release:major": "iobroker-dev-server release major"
}
```

---

### 5. Dependabot-Konfiguration

**Was fehlt:**

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
```

**Warum ist das wichtig?**

- Automatische Abhängigkeits-Updates
- Sicherheitspatches
- Gemeinschaftsstandard

---

## 💡 Empfehlungen

### Priorität 1: GitHub Actions (KRITISCH für Veröffentlichung)

**Warum JETZT wichtig:**

- Vor dem ersten NPM-Publish benötigt
- Community-Standard für ioBroker
- Automatisierte Qualitätssicherung

**Aufwand:** \~1 Stunde **Vorteil:** Massiv (Auto-Testing, Auto-Release)

### Priorität 2: VSCode-Debugging-Konfiguration

**Warum nützlich:**

- Entwickler-Erfahrung verbessern
- Schnelleres Debugging
- Standard in professionellen Projekten

**Aufwand:** \~15 Minuten **Vorteil:** Hoch (Entwicklungsgeschwindigkeit)

### Priorität 3: Dev-Server-Tests

**Warum sinnvoll:**

- Vor Hardware-Test empfohlen
- Risikominimierung
- Isolierte Test-Umgebung

**Aufwand:** \~30 Minuten Setup + Testing **Vorteil:** Mittel (Sicherheit)

### Priorität 4: Erweiterte package.json-Skripte

**Warum nützlich:**

- Konsistenz mit Community
- Vereinfacht Release-Prozess
- Entwickler-Workflows

**Aufwand:** \~15 Minuten **Vorteil:** Niedrig (Nice-to-have)

### Priorität 5: Dependabot

**Warum optional:**

- Kann später hinzugefügt werden
- Erst nach erstem Release relevant

**Aufwand:** \~5 Minuten **Vorteil:** Niedrig (Langfristig)

---

## 🏆 Zusammenfassung

### Was wir BESSER gemacht haben

- ✅ Architektur (13 Klassen vs. monolithische main.js)
- ✅ Dokumentation (\~250 KB im Vergleich zur Standard-README-Datei)
- ✅ UX-Konzept (authentische Aviation-Muster)
- ✅ Test (48 Tests, 100% bestanden)
- ✅ Codequalität (0 ESLint-Fehler, 0 Sicherheitslücken)

### Was wir FEHLT

- ❌ GitHub Actions CI/CD
- ❌ VSCode-Debugging-Konfiguration
- ❌ Dev-Server-Test
- ⚠️ Erweiterte package.json-Skripte

### Empfehlung

**Vor startem npm publish:**

1. GitHub Actions hinzufügen (test-and-release.yml)
2. VSCode Debug Config hinzufügen
3. package.json-Skripte erweitern

**Nach erstem Release:** 4. Dependabot aktivieren 5. Dev-Server für zukünftige Entwicklung nutzen

---

## 📝 Nächste Schritte

**Option A: Minimaler Aufwand (für schnelles Publishing)**

1. GitHub Actions hinzufügen (1h)
2. Hardware-Tests
3. Erstes npm publish

**Option B: Vollständiger Standard-Compliance**

1. GitHub Actions hinzufügen (1h)
2. VSCode-Debug-Konfiguration (15 Min.)
3. Erweiterte package.json-Skripte (15 Min.)
4. Einrichtung und Test des Entwicklungsservers (30 Min.)
5. Hardware-Test
6. Erstes npm publish

**Empfehlung:** Option A für jetzt, Option B Ergänzungen nach erstem Release.

---

**Fazit:** Unsere Implementierung ist **inhaltlich überlegen** (Architektur, Tests, Docs), aber **prozessual unvollständig** (CI/CD, Debugging, Dev-Server). Für die Veröffentlichung benötigen wir ein minimales Setup (GitHub Actions), dann sind wir Community-ready.