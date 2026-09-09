---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md
title: MCDU Smart Home Controller - Technische Architektur
hash: X33cmLAI5LzxTgTwPyI7Sug19o1JRW+zCsRn27bxwjw=
---
# MCDU Smart Home Controller – Technische Architektur

**Version:** 1.0\
&#x20;**Datum:** 14.02.2026\
&#x20;**Status:** Vorschlag\
&#x20;**Zielgruppe:** Entwickler, die den MCDU Smart-Home-Controller implementieren

---

## Inhaltsverzeichnis

1. [Architekturübersicht](#architecture-overview)
2. [Software-Stack-Empfehlung](#software-stack-recommendation)
3. [Komponentengrenzen](#component-boundaries)
4. [Seitensystemdesign](#page-system-design)
5. [Datenfluss](#data-flow)
6. [Konfigurationsschicht](#configuration-layer)
7. [Implementierungsphasen](#implementation-phases)
8. [Bereitstellungsarchitektur](#deployment-architecture)

---

## Architekturübersicht

### Hocharchitektur

```
┌─────────────────────────────────────────────────────────────┐
│                    ioBroker Smart Home                      │
│  ┌──────────────┬──────────────┬──────────────────────┐   │
│  │   Lights     │   Climate    │   Solar/Battery      │   │
│  │   Adapter    │   Adapter    │   Adapter            │   │
│  └──────────────┴──────────────┴──────────────────────┘   │
│                          │                                  │
│                    ┌─────┴─────┐                           │
│                    │ States DB  │                           │
│                    └─────┬─────┘                           │
│                          │                                  │
│         ┌────────────────┼────────────────┐               │
│         │                │                │               │
│    ┌────▼─────┐   ┌──────▼──────┐  ┌────▼────┐          │
│    │ REST API │   │  WebSocket  │  │ Adapter │          │
│    │(simple-api)  │ (socket.io) │  │   API   │          │
│    └────┬─────┘   └──────┬──────┘  └────┬────┘          │
└─────────┼────────────────┼──────────────┼────────────────┘
          │                │              │
          │         Network (HTTP/WS)     │
          │                │              │
┌─────────▼────────────────▼──────────────▼────────────────┐
│          MCDU Controller Application (Node.js)            │
│  ┌──────────────────────────────────────────────────┐   │
│  │          Integration Layer (ioBroker)            │   │
│  │  - WebSocket client (@iobroker/socket-client)    │   │
│  │  - State subscription & caching                   │   │
│  │  - Command execution                              │   │
│  └────────────────┬──────────────────────────────────┘   │
│                   │                                       │
│  ┌────────────────▼──────────────────────────────────┐   │
│  │          Business Logic Layer                     │   │
│  │  - Page manager (navigation, state machine)       │   │
│  │  - Input handler (button press → action)          │   │
│  │  - Display renderer (state → MCDU display)        │   │
│  │  - Configuration loader (YAML/JSON)               │   │
│  └────────────────┬──────────────────────────────────┘   │
│                   │                                       │
│  ┌────────────────▼──────────────────────────────────┐   │
│  │          Hardware Driver Layer                    │   │
│  │  - USB HID interface (node-hid)                   │   │
│  │  - Button reader (HID input → events)             │   │
│  │  - Display writer (text → HID output)             │   │
│  │  - LED controller                                 │   │
│  └────────────────┬──────────────────────────────────┘   │
└───────────────────┼───────────────────────────────────────┘
                    │
                USB │
                    │
         ┌──────────▼──────────┐
         │  WinWing MCDU       │
         │  (HID Device)       │
         │  Vendor: 0x4098     │
         │  Product: 0xbb36    │
         └─────────────────────┘
```

### Gestaltungsprinzipien

1. **Geschichtete Architektur:** Klare Trennung der Zuständigkeiten (Hardware ↔ Geschäftslogik ↔ Integration)
2. **Konfigurationsgesteuert:** Seiten und Bindungen werden in YAML/JSON definiert, nicht fest codiert.
3. **Ereignisgesteuert:** Tastendrücke und Zustandsänderungen lösen Ereignisse aus (keine Abfrageschleifen).
4. **Hot-Reloading möglich:** Konfigurationsänderungen erfordern keinen vollständigen Neustart.
5. **Fehlertolerant:** USB-Verbindungsabbrüche und ioBroker-Timeouts werden ordnungsgemäß behandelt
6. **Testbar:** Jede Schicht kann unabhängig voneinander getestet werden.

---

## Software-Stack-Empfehlung

### Phase 1: Prototyp (Schnelle Validierung)

**Sprache:** Python 3.9+\
&#x20;**Zweck:** Validierung des Hardwareprotokolls, Test der grundlegenden ioBroker-Integration

**Abhängigkeiten:**

- `hidapi` - USB-HID-Kommunikation
- `requests` - HTTP-Client für REST-API
- `pyyaml` - Parsen der Konfigurationsdatei

**Ziele des Prototyps:**

- Tastendrücke vom MCDU lesen
- Text auf dem MCDU-Display ausgeben
- ioBroker-Zustände über die REST-API lesen und schreiben
- Validierung des gesamten Ablaufs

**Prototypumfang:**

- Einzelne, fest codierte "DATA"-Seite
- ioBroker-Statusaktualisierungen per Abfrage (Intervall von 1-2 Sekunden)
- Keine komplizierte Navigation oder Konfiguration

**Voraussichtlicher Zeitrahmen:** 2-3 Tage

---

### Phase 2+: Produktionsimplementierung

**Sprache:** Node.js 18+ (LTS) mit TypeScript (optional, aber empfohlen)\
&#x20;**Begründung:**

- ✅ Bessere WebSocket-Unterstützung (`@iobroker/socket-client` (ist eine Node.js-Bibliothek)
- ✅ Das Async/Await-Modell ist ideal für ereignisgesteuerte Architekturen.
- ✅ Umfangreiches Ökosystem (Protokollierung, Konfigurationsverwaltung, Tests)
- ✅ Pfad zum ioBroker-Adapter (Adapter basieren auf Node.js)
- ✅ Es ist einfacher, Mitwirkende zu finden (Node.js ist in der ioBroker-Community verbreiteter als Python)

**Kernabhängigkeiten:**

| Paket                     | Zweck                           | Version  |
| ------------------------- | ------------------------------- | -------- |
| `node-hid`                | USB-HID-Schnittstelle           | ^2.1.0   |
| `@iobroker/socket-client` | ioBroker WebSocket-Client       | ^2.0.0   |
| `yaml`                    | Analyse der Konfigurationsdatei | ^2.3.0   |
| `winston`                 | Protokollierung                 | ^3.11.0  |
| `eventemitter3`           | Veranstaltungsbus               | ^5.0.0   |
| `joi`                     | Konfigurationsvalidierung       | ^17.11.0 |

**Entwicklungsabhängigkeiten:**

| Paket         | Zweck                                 |
| ------------- | ------------------------------------- |
| `typescript`  | Typensicherheit                       |
| `@types/node` | Node.js-Typen                         |
| `jest`        | Testframework                         |
| `eslint`      | Codequalität                          |
| `prettier`    | Codeformatierung                      |
| `nodemon`     | Automatischer Neustart bei Änderungen |

**Vorteile von TypeScript (Empfohlen):**

- Typsicherheit für USB-Protokollstrukturen
- Bessere IDE-Autovervollständigung
- Einfacheres Refactoring
- Fehlererkennung zur Kompilierzeit

**Alternative (JavaScript):**

- Schnelleres Prototyping
- Niedrigere Eintrittsbarrieren
- Noch immer produktionsreif mit guten Testergebnissen

---

## Komponentengrenzen

### Schicht 1: Hardwaretreiber (`/lib/hardware/` )

**Aufgabe:** Abstraktion der USB-HID-Kommunikation in eine High-Level-API

**Module:**

#### `MCDUDevice.js` (oder`.ts` )

```javascript
class MCDUDevice {
  constructor(vendorId, productId)
  
  // Lifecycle
  async connect()
  async disconnect()
  isConnected(): boolean
  
  // Input
  on('buttonPress', (button: string) => void)
  on('buttonRelease', (button: string) => void)
  getLightSensorValue(): number
  
  // Output
  setDisplayText(text: string, colors?: ColorMap)
  clearDisplay()
  setLED(led: LEDName, state: boolean)
  setDisplayBrightness(value: 0-255)
  setButtonBrightness(value: 0-255)
  
  // Low-level (internal use)
  _readHID(): Buffer
  _writeHID(data: Buffer)
  _initDisplay()
}
```

**Hauptmerkmale:**

- Ereignisauslöser für Tastendrücke (keine Abfrage in höheren Ebenen)
- Automatische Wiederverbindung bei USB-Trennung
- Abstraktion der Anzeigetextkodierung (ASCII → 3-Byte-MCDU-Format)
- LED-/Helligkeitsassistenten

**Abhängigkeiten:** `node-hid`

---

#### `DisplayRenderer.js`

```javascript
class DisplayRenderer {
  constructor(device: MCDUDevice)
  
  // High-level rendering
  renderPage(pageContent: PageLayout)
  renderLine(lineNumber: 0-13, text: string, color?: Color)
  renderCharAt(row: number, col: number, char: string, attrs: CharAttrs)
  
  // Text formatting
  setFont(size: 'normal' | 'small')
  setColor(color: 'white' | 'green' | 'cyan' | 'amber' | 'magenta')
  
  // Utilities
  clearLine(lineNumber: number)
  centerText(lineNumber: number, text: string)
  rightAlignText(lineNumber: number, text: string)
  
  // Low-level (internal)
  _encodeCharacter(char: string, attrs: CharAttrs): Buffer
  _buildDisplayPackets(content: string): Buffer[]
}
```

**Hauptmerkmale:**

- Konvertiert High-Level-Anzeigebefehle in USB-Pakete
- Verarbeitet Textumbruch, Ausrichtung und Formatierung
- Zeichenkodierung (UTF-8 → MCDU 3-Byte-Format)
- Unterstützung für Sonderzeichen (Pfeile, Symbole)

---

### Schicht 2: Geschäftslogik (`/lib/core/` )

#### `PageManager.js`

```javascript
class PageManager {
  constructor(config: PageConfig, renderer: DisplayRenderer)
  
  // Page navigation
  navigateTo(pageName: string)
  getCurrentPage(): Page
  goBack()
  
  // Page lifecycle
  async loadPage(pageName: string): Page
  async renderCurrentPage()
  
  // Input handling
  handleButton(button: string)
  handleInput(text: string)
  
  // State management
  getPageContext(): object
  setPageContext(key: string, value: any)
}
```

**Hauptmerkmale:**

- Zustandsautomat für die Seitennavigation (DATEN → KLIMA → ENERGIE)
- Seitenrendering basierend auf dem ioBroker-Status
- Kontextbewusstsein der Schaltflächen (L1-L6, R1-R6 sind Seitenaktionen zugeordnet)
- Eingabepufferverwaltung (für Texteingabefelder)

---

#### `InputHandler.js`

```javascript
class InputHandler {
  constructor(pageManager: PageManager, iobroker: IoBrokerClient)
  
  // Button mapping
  onButton(button: string, handler: Function)
  mapButton(button: string, action: ButtonAction)
  
  // Action execution
  async executeAction(action: ButtonAction)
  
  // Scratchpad (text input)
  scratchpadAppend(char: string)
  scratchpadClear()
  scratchpadGet(): string
}
```

**Unterstützte Schaltflächenaktionen:**

- `navigatePage` - Zur anderen Seite wechseln
- `toggleState` - Booleschen ioBroker-Status umschalten
- `setState` - Zustand auf einen bestimmten Wert setzen
- `incrementValue` - Numerischen Wert anpassen (z. B. Temperatur +/-)
- `scratchpadInput` - Zeichen zum Eingabepuffer hinzufügen

---

### Schicht 3: Integration (`/lib/integration/` )

#### `IoBrokerClient.js`

```javascript
class IoBrokerClient {
  constructor(host: string, port: number, options?: object)
  
  // Connection
  async connect(username?: string, password?: string)
  disconnect()
  isConnected(): boolean
  
  // State operations
  async getState(stateId: string): StateValue
  async setState(stateId: string, value: any, ack: boolean = false)
  async getStates(pattern: string): StateMap
  
  // Subscriptions (event-driven)
  subscribe(pattern: string, callback: (id, state) => void)
  unsubscribe(pattern: string)
  
  // Object operations
  async getObject(objectId: string): Object
  async getObjects(pattern: string): ObjectMap
  
  // Caching
  getCachedState(stateId: string): StateValue | null
  invalidateCache(stateId: string)
}
```

**Hauptmerkmale:**

- WebSocket-Verbindung zu ioBroker (über`@iobroker/socket-client` )
- Echtzeit-Statusabonnement (keine Abfrage)
- Lokaler Status-Cache (Reduzierung der ioBroker-Last)
- Automatische Wiederverbindung bei Verbindungsabbruch
- Fehlerbehandlung und Timeout-Management

**Abhängigkeiten:**`@iobroker/socket-client`

---

### Schicht 4: Konfiguration (`/lib/config/` )

#### `ConfigLoader.js`

```javascript
class ConfigLoader {
  constructor(configPath: string)
  
  // Loading
  async loadConfig(): Config
  async reloadConfig()
  watchForChanges(callback: Function)
  
  // Validation
  validateConfig(config: object): boolean
  
  // Access
  getPages(): PageConfig[]
  getIoBrokerSettings(): IoBrokerConfig
  getHardwareSettings(): HardwareConfig
}
```

**Konfigurationsdateiformat:** YAML (lesbar, mit Kommentarfunktion)

**Beispielstruktur (Einzelheiten finden Sie im Abschnitt „Konfigurationsschicht“ weiter unten)**

---

## Seitensystemdesign

### Seitenkonzept

Eine **Seite** ist ein logischer Bildschirm auf dem MCDU, der zugehörige Smart-Home-Informationen mit kontextspezifischen Tastenbelegungen anzeigt.

**Beispielseiten:**

- `DATA` - Überblick (Wetter, Solar, Batterie, Haushaltsgeräte)
- `CLIMATE` - Temperaturregelung für alle Räume
- `ENERGY`- Solarstromerzeugung, Batteriespeicher, Netzimport/-export
- `APPLIANCES` - Individuelle Gerätesteuerung (Waschmaschine, Trockner, Beleuchtung)
- `SECURITY` - Türen, Fenster, Kameras
- `SETTINGS` - MCDU-Konfiguration (Helligkeit, automatische Dimmung)

### Seitenstruktur

#### Anzeigelayout

**MCDU-Anzeigebereich (typisch):**

```
 Title Line                    <-- Line 0 (Header)
                               <-- Line 1 (Subheader)
Label 1       Value 1     <L1> <-- Line 2 (LSK L1/R1)
Label 2       Value 2     <L2> <-- Line 3 (LSK L2/R2)
Label 3       Value 3     <L3> <-- Line 4 (LSK L3/R3)
Label 4       Value 4     <L4> <-- Line 5 (LSK L4/R4)
Label 5       Value 5     <L5> <-- Line 6 (LSK L5/R5)
Label 6       Value 6     <L6> <-- Line 7 (LSK L6/R6)
                               <-- Line 8 (Empty)
Scratchpad: __________         <-- Line 9 (Input buffer)
```

**Zeilenauswahltasten (LSK):**

- Die Zeilen 2-7 entsprechen den Tastenpaaren L1/R1 bis L6/R6.
- Linke Taste (L1-L6): Typische Bezeichnung/Funktion
- Rechte Taste (R1-R6): Normalerweise Wertanzeige oder Umschalter

#### Seitendefinition (YAML-Konfiguration)

```yaml
pages:
  - name: DATA
    title: "SYSTEM DATA"
    refresh_interval: 2  # seconds (0 = event-driven only)
    lines:
      - line: 2
        label: "WEATHER"
        value: "{{weather.0.current.temperature}}°C"
        button_left: null
        button_right:
          action: navigatePage
          target: CLIMATE
      - line: 3
        label: "SOLAR"
        value: "{{solar.0.power}}W"
        color: "{{solar.0.power > 0 ? 'green' : 'white'}}"
        button_right:
          action: navigatePage
          target: ENERGY
      - line: 4
        label: "WASHING"
        value: "{{washing.0.status}}"
        button_right:
          action: navigatePage
          target: APPLIANCES
    function_keys:
      PROG:
        action: navigatePage
        target: SETTINGS
      F-PLN:
        action: navigatePage
        target: CLIMATE
```

### Seitenrendering-Algorithmus

**Schritt 1: Zustandsdaten erfassen**

```javascript
async function renderPage(pageName) {
  const page = config.getPage(pageName);
  const stateData = {};
  
  // Collect all referenced states
  for (const line of page.lines) {
    const stateIds = extractStateReferences(line.value);
    for (const id of stateIds) {
      stateData[id] = await iobroker.getState(id);
    }
  }
  
  return { page, stateData };
}
```

**Schritt 2: Vorlagenbewertung**

```javascript
function evaluateLine(lineConfig, stateData) {
  // Replace {{state.id}} with actual values
  let text = lineConfig.value;
  text = text.replace(/\{\{([^}]+)\}\}/g, (match, expr) => {
    return evaluateExpression(expr, stateData);
  });
  
  // Evaluate color expressions
  const color = evaluateExpression(lineConfig.color, stateData);
  
  return { text, color };
}
```

**Schritt 3: Anzeigeaktualisierung**

```javascript
function updateDisplay(page, stateData) {
  renderer.clearDisplay();
  renderer.renderLine(0, page.title, 'white');
  
  for (const lineConfig of page.lines) {
    const { text, color } = evaluateLine(lineConfig, stateData);
    renderer.renderLine(lineConfig.line, text, color);
  }
}
```

### Zustandsautomat für Seitennavigation

```
       ┌──────┐
       │ INIT │
       └───┬──┘
           │ (Power on)
           ▼
       ┌──────┐    DATA button    ┌──────┐
   ┌──▶│ DATA │◀──────────────────│  ANY │
   │   └──┬───┘                   └───▲──┘
   │      │                           │
   │      │ R1 (Weather)              │ MCDU MENU
   │      ▼                           │
   │   ┌─────────┐                    │
   │   │ CLIMATE │────────────────────┘
   │   └─────────┘
   │      │
   │      │ R2 (Solar)
   │      ▼
   │   ┌────────┐
   │   │ ENERGY │
   │   └────────┘
   │      │
   │      │ Left Arrow (Back)
   └──────┘
```

**Zustandsautomat-Implementierung:**

```javascript
class PageStateMachine {
  constructor() {
    this.currentPage = 'DATA';
    this.history = [];
  }
  
  navigateTo(pageName) {
    this.history.push(this.currentPage);
    this.currentPage = pageName;
    emit('pageChanged', pageName);
  }
  
  goBack() {
    if (this.history.length > 0) {
      this.currentPage = this.history.pop();
      emit('pageChanged', this.currentPage);
    }
  }
  
  handleButton(button) {
    const page = config.getPage(this.currentPage);
    const action = page.getButtonAction(button);
    
    if (action.type === 'navigatePage') {
      this.navigateTo(action.target);
    } else if (action.type === 'goBack') {
      this.goBack();
    }
    // ... other action types
  }
}
```

---

## Datenfluss

### Szenario 1: Tastendruck → ioBroker-Befehl

**Beispiel:** Der Benutzer drückt R3, um das Wohnzimmerlicht ein- und auszuschalten.

```
1. User presses R3 button on MCDU
2. USB HID report received by node-hid
3. MCDUDevice emits 'buttonPress' event with button='R3'
4. InputHandler receives event
5. PageManager looks up R3 action on current page
6. Action: toggleState('lights.living.STATE')
7. IoBrokerClient reads current state (false)
8. IoBrokerClient sends setState('lights.living.STATE', true, ack=false)
9. ioBroker processes command and updates state
10. ioBroker sends stateChange event via WebSocket
11. IoBrokerClient receives update (val=true, ack=true)
12. PageManager triggers display refresh
13. DisplayRenderer updates line showing "LIVING ▶ON"
14. LED "RDY" blinks to confirm action
```

**Latenzziel:** <200 ms (Tastendruck → Displayaktualisierung)

---

### Szenario 2: ioBroker-Statusänderung → MCDU-Anzeigeaktualisierung

**Beispiel:** Die Waschmaschine beendet den Waschgang.

```
1. Washing machine adapter updates state:
   washing.0.status = "finished"
2. ioBroker broadcasts stateChange event
3. IoBrokerClient receives WebSocket event (subscribed to washing.0.*)
4. IoBrokerClient updates local cache
5. IoBrokerClient emits 'stateUpdate' event
6. PageManager checks if current page references washing.0.status
7. If yes: triggers display refresh
8. DisplayRenderer updates line: "WASHING [FINISHED]" (green)
9. Optional: Blink "RDY" LED to alert user
10. Optional: Play notification sound (if MCDU has speaker)
```

**Latenzziel:** <500 ms (ioBroker-Aktualisierung → MCDU-Anzeige)

---

### Szenario 3: Seitennavigation

**Beispiel:** Der Benutzer navigiert zu DATEN → KLIMA

```
1. User presses "F-PLN" function key
2. InputHandler receives buttonPress('F-PLN')
3. PageManager.handleButton() looks up action: navigatePage('CLIMATE')
4. PageStateMachine.navigateTo('CLIMATE')
5. PageManager.loadPage('CLIMATE')
6. IoBrokerClient fetches all states referenced in CLIMATE page config
7. PageManager.renderCurrentPage()
8. DisplayRenderer clears display
9. DisplayRenderer renders CLIMATE page title
10. DisplayRenderer renders temperature values for each room
11. DisplayRenderer updates LSK labels (L1="LIVING", etc.)
12. User sees new page within ~300ms
```

---

## Konfigurationsschicht

### Konfigurationsdatei:`config.yaml`

```yaml
# ioBroker connection settings
iobroker:
  host: "192.168.1.100"
  port: 8082  # WebSocket port (socket.io adapter)
  username: "mcdu-controller"  # Optional
  password: "secret"           # Optional
  reconnect_interval: 5000     # ms
  timeout: 10000               # ms

# MCDU hardware settings
hardware:
  vendor_id: "0x4098"
  product_id: "0xbb36"  # CAPTAIN mode
  auto_brightness: true  # Use light sensors
  brightness:
    display: 200  # 0-255
    buttons: 150
  reconnect_on_disconnect: true

# Display settings
display:
  refresh_rate: 5  # Hz (max updates per second)
  default_color: "white"
  title_color: "cyan"
  error_color: "amber"

# Logging
logging:
  level: "info"  # debug, info, warn, error
  file: "/var/log/mcdu-controller.log"
  console: true

# Pages configuration
pages:
  # DATA page - System overview
  - name: DATA
    title: "SYSTEM DATA"
    default: true  # Show on startup
    refresh_interval: 2  # Auto-refresh every 2 seconds
    
    lines:
      - line: 2
        label: "WEATHER"
        value: "{{weather.0.current.temperature}}°C / {{weather.0.current.humidity}}%"
        color: "white"
        button_left: null
        button_right:
          action: navigatePage
          target: CLIMATE
          
      - line: 3
        label: "SOLAR"
        value: "{{solar.0.power}}W"
        color: "{{solar.0.power > 0 ? 'green' : 'white'}}"
        button_right:
          action: navigatePage
          target: ENERGY
          
      - line: 4
        label: "BATTERY"
        value: "{{battery.0.soc}}% ({{battery.0.power}}W)"
        color: "{{battery.0.soc < 20 ? 'amber' : 'green'}}"
        button_right:
          action: navigatePage
          target: ENERGY
          
      - line: 5
        label: "WASHING"
        value: "{{washing.0.status}}"
        color: "{{washing.0.status == 'finished' ? 'green' : 'white'}}"
        button_right:
          action: navigatePage
          target: APPLIANCES
          
      - line: 6
        label: "DRYER"
        value: "{{dryer.0.status}}"
        button_right:
          action: navigatePage
          target: APPLIANCES
    
    function_keys:
      DATA:
        action: navigatePage
        target: DATA
      F-PLN:
        action: navigatePage
        target: CLIMATE
      PROG:
        action: navigatePage
        target: SETTINGS
      PERF:
        action: navigatePage
        target: ENERGY

  # CLIMATE page - Temperature control
  - name: CLIMATE
    title: "CLIMATE CONTROL"
    refresh_interval: 5
    
    lines:
      - line: 2
        label: "LIVING"
        value: "{{climate.living.current}}° → {{climate.living.target}}°"
        button_left:
          action: incrementValue
          state_id: "climate.living.target"
          step: -0.5
        button_right:
          action: incrementValue
          state_id: "climate.living.target"
          step: 0.5
          
      - line: 3
        label: "BEDROOM"
        value: "{{climate.bedroom.current}}° → {{climate.bedroom.target}}°"
        button_left:
          action: incrementValue
          state_id: "climate.bedroom.target"
          step: -0.5
        button_right:
          action: incrementValue
          state_id: "climate.bedroom.target"
          step: 0.5
          
      - line: 4
        label: "KITCHEN"
        value: "{{climate.kitchen.current}}° → {{climate.kitchen.target}}°"
        button_left:
          action: incrementValue
          state_id: "climate.kitchen.target"
          step: -0.5
        button_right:
          action: incrementValue
          state_id: "climate.kitchen.target"
          step: 0.5
    
    function_keys:
      DATA:
        action: navigatePage
        target: DATA
      "Left Arrow":
        action: goBack

  # ENERGY page - Solar and battery
  - name: ENERGY
    title: "ENERGY MANAGEMENT"
    refresh_interval: 1  # Fast updates for real-time data
    
    lines:
      - line: 2
        label: "SOLAR"
        value: "{{solar.0.power}}W"
        color: "green"
        
      - line: 3
        label: "BATTERY"
        value: "{{battery.0.soc}}% ({{battery.0.power}}W)"
        color: "{{battery.0.power > 0 ? 'green' : 'amber'}}"
        
      - line: 4
        label: "GRID"
        value: "{{grid.0.power}}W {{grid.0.power > 0 ? 'IMPORT' : 'EXPORT'}}"
        color: "{{grid.0.power > 0 ? 'amber' : 'green'}}"
        
      - line: 5
        label: "CONSUMPTION"
        value: "{{consumption.0.total}}W"
        color: "white"
    
    function_keys:
      DATA:
        action: navigatePage
        target: DATA

  # APPLIANCES page - Device controls
  - name: APPLIANCES
    title: "APPLIANCES"
    refresh_interval: 3
    
    lines:
      - line: 2
        label: "LIVING LIGHT"
        value: "{{lights.living.STATE ? '▶ON' : '◀OFF'}}"
        color: "{{lights.living.STATE ? 'green' : 'white'}}"
        button_right:
          action: toggleState
          state_id: "lights.living.STATE"
          
      - line: 3
        label: "BEDROOM LIGHT"
        value: "{{lights.bedroom.STATE ? '▶ON' : '◀OFF'}}"
        button_right:
          action: toggleState
          state_id: "lights.bedroom.STATE"
          
      - line: 4
        label: "WASHING"
        value: "{{washing.0.status}}"
        color: "{{washing.0.status == 'finished' ? 'green' : 'white'}}"
        button_right:
          action: setState
          state_id: "washing.0.command"
          value: "start"
          confirm: true  # Show confirmation dialog
    
    function_keys:
      DATA:
        action: navigatePage
        target: DATA

# State aliases (optional - for cleaner templates)
aliases:
  weather_temp: "weather.0.current.temperature"
  solar_power: "solar.0.power"
  battery_soc: "battery.0.soc"
```

### Konfigurationsvalidierung

**Schema (mit Joi):**

```javascript
const configSchema = Joi.object({
  iobroker: Joi.object({
    host: Joi.string().hostname().required(),
    port: Joi.number().port().required(),
    username: Joi.string().optional(),
    password: Joi.string().optional(),
    reconnect_interval: Joi.number().min(1000).default(5000),
    timeout: Joi.number().min(1000).default(10000)
  }).required(),
  
  hardware: Joi.object({
    vendor_id: Joi.string().pattern(/^0x[0-9a-fA-F]{4}$/).required(),
    product_id: Joi.string().pattern(/^0x[0-9a-fA-F]{4}$/).required(),
    auto_brightness: Joi.boolean().default(true),
    brightness: Joi.object({
      display: Joi.number().min(0).max(255).default(200),
      buttons: Joi.number().min(0).max(255).default(150)
    })
  }).required(),
  
  pages: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      title: Joi.string().max(24).required(),
      default: Joi.boolean().default(false),
      refresh_interval: Joi.number().min(0).default(0),
      lines: Joi.array().items(/* line schema */),
      function_keys: Joi.object()
    })
  ).min(1).required()
});
```

---

## Implementierungsphasen

### Phase 1: Hardwaretreiber (ca. 3-5 Tage)

**Ziel:** Zuverlässige USB-Kommunikation mit MCDU herstellen

**Aufgaben:**

1. Einrichten eines Node.js-Projekts mit TypeScript
2. Installieren`node-hid` und Testgeräteerkennung
3. Implementieren`MCDUDevice` Klasse:
   - USB öffnen/schließen mit Fehlerbehandlung
   - HID-Berichte lesen (Tasteneingabeschleife)
   - HID-Berichte schreiben (einfacher Anzeigetest)
4. Implementieren`DisplayRenderer` :
   - Zeichenkodierung (ASCII → 3-Byte-Format)
   - Initialisierungssequenz des Displays
   - Textdarstellung (einzeilig, dann Vollbild)
5. Test-LED und Helligkeitsregelung
6. Implementieren Sie eine Logik zur USB-Wiederverbindung.
7. Schreiben Sie Unit-Tests für Kodierungsfunktionen

**Erfolgskriterien:**

- ✅ Alle Tastendrücke zuverlässig erfassen
- ✅ Beliebigen Text auf MCDU anzeigen
- ✅ Alle LEDs steuern
- ✅ Helligkeit anpassen
- ✅ USB-Verbindungstrennung/Wiederverbindung verwalten

---

### Phase 2: ioBroker-Integration (geschätzt: 2–3 Tage)

**Ziel:** Verbindung zu ioBroker herstellen und Zustände lesen/schreiben

**Aufgaben:**

1. Installieren`@iobroker/socket-client`
2. Implementieren`IoBrokerClient` Klasse:
   - WebSocket-Verbindung mit Authentifizierung
   - Lesen Sie einen einzelnen Zustand (`getState` )
   - Zustand schreiben (`setState` )
   - Abonnieren Sie Zustandsmuster
   - Verbindungsfehler behandeln und Verbindungen wiederherstellen
3. Lokalen Statuscache erstellen
4. Test mit einer echten ioBroker-Instanz:
   - Temperatursensoren auslesen
   - Kippschalter
   - Abonnieren Sie den Waschmaschinenstatus
5. Integrationstests schreiben (ioBroker-Server simulieren)

**Erfolgskriterien:**

- ✅ Verbindung zu ioBroker über WebSocket herstellen
- ✅ Bundesstaaten erfolgreich lesen und schreiben
- ✅ Erhalten Sie Statusaktualisierungen in Echtzeit.
- ✅ ioBroker-Neustart ordnungsgemäß behandeln

---

### Phase 3: Geschäftslogik (geschätzt: 5-7 Tage)

**Ziel:** Seitensystem und Navigation implementieren

**Aufgaben:**

1. Entwurf und Implementierung`PageManager` :
   - Seitenkonfiguration aus YAML laden
   - Seite auf MCDU-Anzeige rendern
   - Seitennavigation verwalten
2. Implementieren`InputHandler` :
   - Tastendrücke Aktionen zuordnen
   - Aktionen ausführen (navigieren, umschalten, Wert festlegen)
3. Zustandsautomat für die Seitennavigation erstellen
4. Implementieren Sie die Template-Evaluierungs-Engine:
   - Ersetzen`{{state.id}}` mit Werten
   - Unterstützung für bedingte Ausdrücke
5. Beispielseiten erstellen (DATEN, KLIMA, ENERGIE)
6. Testablauf vollständig:
   - Tastendruck → navigieren
   - Zustandsänderung → Anzeigeaktualisierung
7. Fehlerbehandlung hinzufügen (fehlende Zustände, ungültige Aktionen)

**Erfolgskriterien:**

- ✅ Navigieren Sie mithilfe der Schaltflächen zwischen den Seiten.
- ✅ Zeigen Sie echte ioBroker-Daten auf den Seiten an
- ✅ Zustandsänderungen über die MCDU-Tasten ausführen
- ✅ Echtzeit-Anzeigeaktualisierungen bei Statusänderungen

---

### Phase 4: Konfiguration & Feinschliff (ca. 3-4 Tage)

**Ziel:** Produktionsreife Konfiguration und UX-Verbesserungen

**Aufgaben:**

1. Implementieren`ConfigLoader` :
   - YAML-Konfiguration parsen
   - Validierung mithilfe des Joi-Schemas
   - Hot-Reload bei Konfigurationsänderungen (Überwachungsdatei)
2. Protokollierung hinzufügen (Winston):
   - Alle Tastendrücke protokollieren
   - Alle ioBroker-Befehle protokollieren
   - Fehler und Warnungen protokollieren
3. Fehlerbehandlung verbessern:
   - Fehlermeldungen auf dem MCDU anzeigen
   - Fehlgeschlagene ioBroker-Befehle erneut versuchen
4. LED-Statusanzeigen hinzufügen:
   - "MCDU"-LED: blinkt im aktiven Zustand
   - "RDY"-LED: blinkt bei Aktionsbestätigung
   - "FEHLER"-LED: Leuchtet bei Fehler
5. Automatische Helligkeitsregelung implementieren (Lichtsensoren)
6. Erstelle einen systemd-Dienst für den automatischen Start
7. Benutzerdokumentation erstellen (README, Konfigurationsbeispiele)

**Erfolgskriterien:**

- ✅ Die Konfigurationsdatei steuert das gesamte Verhalten
- ✅ Umfassende Protokollierung
- ✅ Elegante Fehlerbehandlung
- ✅ Bereit für den Produktionseinsatz

---

### Phase 5: Erweiterte Funktionen (Optional - Geschätzte Dauer: 5-10 Tage)

**Ziel:** Funktionen für fortgeschrittene Benutzer und Verbesserungen der Benutzererfahrung

**Aufgaben:**

1. Scratchpad-Eingabe:
   - Texteingabe über alphanumerische Tasten
   - Dient zur Einstellung von Temperaturwerten usw.
2. Verlauf/Grafiken:
   - Mini-Liniendiagramme anzeigen (Solarstrom im Zeitverlauf)
   - Erfordert den Zugriff auf den ioBroker-Verlaufsadapter.
3. Benachrichtigungen:
   - Warteschlangensystem für Benachrichtigungen („Waschen abgeschlossen!“)
   - Blinkende LEDs + Benachrichtigungsseite anzeigen
4. Abkürzungen:
   - Tasten lange drücken für alternative Aktionen
   - Funktionstaste + LSK gedrückt halten für Schnellaktionen
5. Unterstützung mehrerer Benutzer:
   - Unterschiedliche Seitenlayouts pro Benutzer
   - Benutzerwechsel per PIN auf dem Scratchpad
6. Web-Dashboard:
   - Aktuelle MCDU-Anzeige im Browser anzeigen
   - Fernsteuerung über Webschnittstelle

**Erfolgskriterien:**

- ✅ Erweiterte Eingabemethoden funktionieren
- ✅ Benachrichtigungen sind benutzerfreundlich
- ✅ Tastenkombinationen für fortgeschrittene Benutzer verbessern die Effizienz

---

## Bereitstellungsarchitektur

### Entwicklungsumgebung

```
Developer Machine
├── Node.js 18+
├── Code editor (VS Code recommended)
├── MCDU connected via USB
└── ioBroker test instance (local or VM)
```

**Entwicklungsablauf:**

1. Code bearbeiten in`/src`
2. `npm run dev` (automatischer Neustart mit nodemon)
3. Test auf physischer MCDU-Hardware
4. Git-Commit und Push

---

### Produktionsbereitstellung (Option 1: Standalone-Dienst)

**Ziel:** Dedizierter Server/SBC mit angeschlossenem MCDU

```
Raspberry Pi 4 / Intel NUC
├── OS: Ubuntu 22.04 / Debian 12
├── Node.js 18 LTS
├── MCDU Controller (systemd service)
│   ├── Config: /etc/mcdu-controller/config.yaml
│   ├── Logs: /var/log/mcdu-controller/
│   └── Code: /opt/mcdu-controller/
└── USB: WinWing MCDU (vendor 0x4098)

Network Connection → ioBroker Server
```

**Systemd-Dienst (`/etc/systemd/system/mcdu-controller.service` ):**

```ini
[Unit]
Description=MCDU Smart Home Controller
After=network.target

[Service]
Type=simple
User=mcdu
WorkingDirectory=/opt/mcdu-controller
ExecStart=/usr/bin/node /opt/mcdu-controller/dist/index.js
Restart=always
RestartSec=10
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

**Installationsschritte:**

```bash
# 1. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# 2. Clone repo
sudo git clone <repo-url> /opt/mcdu-controller
cd /opt/mcdu-controller

# 3. Install dependencies
sudo npm ci --production

# 4. Build (if TypeScript)
sudo npm run build

# 5. Configure
sudo cp config.example.yaml /etc/mcdu-controller/config.yaml
sudo nano /etc/mcdu-controller/config.yaml  # Edit settings

# 6. Set up udev rules (USB permissions)
sudo tee /etc/udev/rules.d/99-winwing-mcdu.rules <<EOF
SUBSYSTEM=="usb", ATTRS{idVendor}=="4098", MODE="0666"
EOF
sudo udevadm control --reload-rules

# 7. Create user
sudo useradd -r -s /bin/false mcdu

# 8. Install systemd service
sudo cp mcdu-controller.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable mcdu-controller
sudo systemctl start mcdu-controller

# 9. Check status
sudo systemctl status mcdu-controller
sudo journalctl -u mcdu-controller -f  # View logs
```

---

### Produktionsbereitstellung (Option 2: ioBroker-Adapter)

**Ziel:** Als nativer ioBroker-Adapter ausführen

```
ioBroker Server
├── Adapters:
│   ├── iobroker.admin
│   ├── iobroker.socketio
│   └── iobroker.mcdu-controller  ← Custom adapter
│       ├── USB: WinWing MCDU
│       ├── States: mcdu.0.*
│       └── Config: via Admin UI
└── States Database
```

**Adapterzustände:**

```
mcdu.0.connected         (boolean) - USB connection status
mcdu.0.current_page      (string)  - Current page name
mcdu.0.brightness.display (number) - Display brightness 0-255
mcdu.0.brightness.buttons (number) - Button brightness 0-255
mcdu.0.button.L1         (boolean) - Button L1 pressed
mcdu.0.button.R1         (boolean) - Button R1 pressed
...
```

**Vorteile:**

- ✅ In die ioBroker-Admin-Benutzeroberfläche integriert
- ✅ Der Adapterlebenszyklus wird von ioBroker verwaltet.
- ✅ Einfache Installation für andere Benutzer
- ✅ Kann den MCDU-Status anderen Adaptern zugänglich machen

**Abwägungen:**

- ❌ Komplexere Verpackung
- ❌ Die Konventionen des ioBroker-Adapters müssen eingehalten werden.

---

## Leistungsziele

| Metrisch                                          | Ziel    | Akzeptabel |
| ------------------------------------------------- | ------- | ---------- |
| Latenz beim Tastendruck                           | <100 ms | <200 ms    |
| ioBroker-Status gelesen                           | <50ms   | <100 ms    |
| Anzeigeaktualisierung (lokal)                     | <100 ms | <200 ms    |
| Anzeigeaktualisierung (aus dem ioBroker-Ereignis) | <300 ms | <500 ms    |
| Seitennavigation                                  | <200 ms | <400 ms    |
| USB-Wiederverbindungszeit                         | <2s     | <5s        |
| Konfiguration neu laden                           | <500 ms | <1s        |
| Speichernutzung                                   | <50 MB  | <100 MB    |
| CPU-Auslastung (Leerlauf)                         | <5%     | <10%       |

---

## Sicherheitsüberlegungen

### ioBroker-Authentifizierung

- **Empfehlung:** Verwenden Sie ein separates Benutzerkonto für MCDU.
- **Berechtigungen:** Sensoren haben Lesezugriff, gesteuerte Geräte nur Schreibzugriff.
- **Anmeldeinformationen:** In Umgebungsvariablen speichern, nicht in der Konfigurationsdatei.

### USB-Gerätezugriff

- **Linux:** Verwenden Sie udev-Regeln, um bestimmten Benutzern (nicht root) Zugriff zu gewähren.
- **Prinzip:** Dienst mit minimalen Berechtigungen ausführen.

### Konfigurationsdatei

- **Standort:**`/etc/mcdu-controller/config.yaml`
- **Berechtigungen:**`chmod 600` (Nur für Eigentümer lesbar/schreibbar)
- **Geheimnisse:** Optional können Umgebungsvariablen für Passwörter verwendet werden.

---

## Teststrategie

### Unit-Tests

- USB-Protokoll-Kodierungs-/Dekodierungsfunktionen
- Textdarstellung anzeigen
- Konfigurationsvalidierung
- Template-Evaluierungs-Engine

### Integrationstests

- ioBroker-Verbindung (simulierter WebSocket-Server)
- USB-Kommunikation (Hardware im Regelkreis)
- End-to-End: Tastendruck → ioBroker → Aktualisierung der Anzeige

### Manuelle Prüfung

- Testen Sie alle Seiten mit einer echten ioBroker-Instanz.
- Überprüfen Sie alle Tastenbelegungen
- Testfehlerszenarien (USB-Verbindung unterbrochen, ioBroker offline)

---

## Abschluss

Diese Architektur bietet eine **skalierbare und wartungsfreundliche Grundlage** für den MCDU Smart-Home-Controller. Der mehrschichtige Aufbau gewährleistet:

- ✅ **Klare Trennung der Zuständigkeiten** (Hardware ↔ Logik ↔ Integration)
- ✅ **Testbarkeit** (jede Schicht kann unabhängig getestet werden)
- ✅ **Flexibilität** (konfigurationsgesteuert, keine fest codierten Seiten)
- ✅ **Erweiterbarkeit** (einfaches Hinzufügen neuer Seiten und Aktionen)
- ✅ **Produktionsbereit** (Protokollierung, Fehlerbehandlung, systemd-Dienst)

**Empfohlene nächste Schritte:**

1. Besprechen Sie diese Architektur mit den Projektbeteiligten.
2. Entwicklungsumgebung einrichten (Node.js, MCDU-Hardware, ioBroker-Testinstanz)
3. Beginn der Implementierungsphase 1 (Hardwaretreiber)
4. Iterieren Sie basierend auf realen Tests

**Geschätzter Gesamtzeitraum:** 4-6 Wochen (für die Phasen 1-4)

---

**Dokumentstatus:** Endgültiger Vorschlag\
&#x20;**Letzte Aktualisierung:** 14.02.2026\
&#x20;**Autor:** Subagent (mcdu-research)\
&#x20;**Nächste Schritte:** Kick-off-Meeting zur Implementierung