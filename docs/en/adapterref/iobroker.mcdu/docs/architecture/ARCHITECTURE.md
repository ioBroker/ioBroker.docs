---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
---
# MCDU Smart Home Controller - Technical Architecture

**Version:** 1.0  
**Date:** 2026-02-14  
**Status:** Proposal  
**Audience:** Developers implementing the MCDU smart home controller

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Software Stack Recommendation](#software-stack-recommendation)
3. [Component Boundaries](#component-boundaries)
4. [Page System Design](#page-system-design)
5. [Data Flow](#data-flow)
6. [Configuration Layer](#configuration-layer)
7. [Implementation Phases](#implementation-phases)
8. [Deployment Architecture](#deployment-architecture)

---

## Architecture Overview

### High-Level Architecture

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

### Design Principles

1. **Layered Architecture:** Clear separation of concerns (hardware ↔ business logic ↔ integration)
2. **Configuration-Driven:** Pages and bindings defined in YAML/JSON, not hardcoded
3. **Event-Driven:** Button presses and state changes trigger events (not polling loops)
4. **Hot-Reloadable:** Configuration changes don't require full restart
5. **Fault-Tolerant:** USB disconnects and ioBroker timeouts handled gracefully
6. **Testable:** Each layer can be unit tested independently

---

## Software Stack Recommendation

### Phase 1: Prototype (Quick Validation)

**Language:** Python 3.9+  
**Purpose:** Validate hardware protocol, test basic ioBroker integration

**Dependencies:**
- `hidapi` - USB HID communication
- `requests` - HTTP client for REST API
- `pyyaml` - Configuration file parsing

**Prototype Goals:**
- Read button presses from MCDU
- Write text to MCDU display
- Read/write ioBroker states via REST API
- Validate end-to-end flow

**Prototype Scope:**
- Single hardcoded "DATA" page
- Polling-based ioBroker state updates (1-2 sec interval)
- No complex navigation or configuration

**Estimated Timeline:** 2-3 days

---

### Phase 2+: Production Implementation

**Language:** Node.js 18+ (LTS) with TypeScript (optional but recommended)  
**Rationale:**
- ✅ Better WebSocket support (`@iobroker/socket-client` is Node.js library)
- ✅ Async/await model ideal for event-driven architecture
- ✅ Rich ecosystem (logging, config management, testing)
- ✅ Path to ioBroker adapter (adapters are Node.js based)
- ✅ Easier to find contributors (Node.js more common than Python in ioBroker community)

**Core Dependencies:**

| Package | Purpose | Version |
|---------|---------|---------|
| `node-hid` | USB HID interface | ^2.1.0 |
| `@iobroker/socket-client` | ioBroker WebSocket client | ^2.0.0 |
| `yaml` | Configuration file parsing | ^2.3.0 |
| `winston` | Logging | ^3.11.0 |
| `eventemitter3` | Event bus | ^5.0.0 |
| `joi` | Configuration validation | ^17.11.0 |

**Dev Dependencies:**

| Package | Purpose |
|---------|---------|
| `typescript` | Type safety |
| `@types/node` | Node.js types |
| `jest` | Testing framework |
| `eslint` | Code quality |
| `prettier` | Code formatting |
| `nodemon` | Auto-restart on changes |

**TypeScript Benefits (Recommended):**
- Type safety for USB protocol structures
- Better IDE autocomplete
- Easier refactoring
- Compile-time error detection

**Alternative (JavaScript):**
- Faster prototyping
- Lower barrier to entry
- Still production-ready with good testing

---

## Component Boundaries

### Layer 1: Hardware Driver (`/lib/hardware/`)

**Responsibility:** Abstract USB HID communication into high-level API

**Modules:**

#### `MCDUDevice.js` (or `.ts`)
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

**Key Features:**
- Event emitter for button presses (no polling in upper layers)
- Auto-reconnect on USB disconnect
- Display text encoding abstraction (ASCII → 3-byte MCDU format)
- LED/brightness helpers

**Dependencies:** `node-hid`

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

**Key Features:**
- Converts high-level display commands to USB packets
- Handles text wrapping, alignment, and formatting
- Character encoding (UTF-8 → MCDU 3-byte format)
- Support for special characters (arrows, symbols)

---

### Layer 2: Business Logic (`/lib/core/`)

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

**Key Features:**
- State machine for page navigation (DATA → CLIMATE → ENERGY)
- Page rendering based on ioBroker state
- Button context awareness (L1-L6, R1-R6 mapped to page actions)
- Input buffer management (for text entry fields)

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

**Supported Button Actions:**
- `navigatePage` - Switch to different page
- `toggleState` - Toggle boolean ioBroker state
- `setState` - Set state to specific value
- `incrementValue` - Adjust numeric value (e.g., temperature +/-)
- `scratchpadInput` - Add character to input buffer

---

### Layer 3: Integration (`/lib/integration/`)

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

**Key Features:**
- WebSocket connection to ioBroker (via `@iobroker/socket-client`)
- Real-time state subscription (no polling)
- Local state cache (reduce ioBroker load)
- Automatic reconnection on disconnect
- Error handling and timeout management

**Dependencies:** `@iobroker/socket-client`

---

### Layer 4: Configuration (`/lib/config/`)

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

**Configuration File Format:** YAML (human-readable, comment support)

**Example Structure (See "Configuration Layer" section below for details)**

---

## Page System Design

### Page Concept

A **page** is a logical screen on the MCDU displaying related smart home information with context-specific button mappings.

**Example Pages:**
- `DATA` - Overview (weather, solar, battery, appliances)
- `CLIMATE` - Temperature control for all rooms
- `ENERGY` - Solar production, battery, grid import/export
- `APPLIANCES` - Individual device controls (washing machine, dryer, lights)
- `SECURITY` - Doors, windows, cameras
- `SETTINGS` - MCDU configuration (brightness, auto-dimming)

### Page Structure

#### Display Layout

**MCDU Display Area (typical):**
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

**Line Select Keys (LSK):**
- Lines 2-7 correspond to button pairs L1/R1 through L6/R6
- Left button (L1-L6): Typically label/action
- Right button (R1-R6): Typically value display or toggle

#### Page Definition (YAML Config)

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

### Page Rendering Algorithm

**Step 1: Gather State Data**
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

**Step 2: Template Evaluation**
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

**Step 3: Display Update**
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

### Page Navigation State Machine

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

**State Machine Implementation:**
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

## Data Flow

### Scenario 1: Button Press → ioBroker Command

**Example:** User presses R3 to toggle living room light

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

**Latency Target:** <200ms (button press → display update)

---

### Scenario 2: ioBroker State Change → MCDU Display Update

**Example:** Washing machine finishes cycle

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

**Latency Target:** <500ms (ioBroker update → MCDU display)

---

### Scenario 3: Page Navigation

**Example:** User navigates DATA → CLIMATE

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

## Configuration Layer

### Configuration File: `config.yaml`

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

### Configuration Validation

**Schema (using Joi):**
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

## Implementation Phases

### Phase 1: Hardware Driver (Est: 3-5 days)

**Goal:** Establish reliable USB communication with MCDU

**Tasks:**
1. Set up Node.js project with TypeScript
2. Install `node-hid` and test device detection
3. Implement `MCDUDevice` class:
   - USB open/close with error handling
   - Read HID reports (button input loop)
   - Write HID reports (basic display test)
4. Implement `DisplayRenderer`:
   - Character encoding (ASCII → 3-byte format)
   - Display initialization sequence
   - Text rendering (single line, then full screen)
5. Test LED and brightness control
6. Implement USB reconnection logic
7. Write unit tests for encoding functions

**Success Criteria:**
- ✅ Read all button presses reliably
- ✅ Display arbitrary text on MCDU
- ✅ Control all LEDs
- ✅ Adjust brightness
- ✅ Handle USB disconnect/reconnect

---

### Phase 2: ioBroker Integration (Est: 2-3 days)

**Goal:** Connect to ioBroker and read/write states

**Tasks:**
1. Install `@iobroker/socket-client`
2. Implement `IoBrokerClient` class:
   - WebSocket connection with authentication
   - Read single state (`getState`)
   - Write state (`setState`)
   - Subscribe to state patterns
   - Handle connection errors and reconnects
3. Build local state cache
4. Test with real ioBroker instance:
   - Read temperature sensors
   - Toggle light switches
   - Subscribe to washing machine status
5. Write integration tests (mock ioBroker server)

**Success Criteria:**
- ✅ Connect to ioBroker via WebSocket
- ✅ Read and write states successfully
- ✅ Receive real-time state updates
- ✅ Handle ioBroker restart gracefully

---

### Phase 3: Business Logic (Est: 5-7 days)

**Goal:** Implement page system and navigation

**Tasks:**
1. Design and implement `PageManager`:
   - Load page config from YAML
   - Render page to MCDU display
   - Handle page navigation
2. Implement `InputHandler`:
   - Map button presses to actions
   - Execute actions (navigate, toggle, set value)
3. Build state machine for page navigation
4. Implement template evaluation engine:
   - Replace `{{state.id}}` with values
   - Support conditional expressions
5. Create sample pages (DATA, CLIMATE, ENERGY)
6. Test complete flow:
   - Button press → navigate
   - State change → display update
7. Add error handling (missing states, invalid actions)

**Success Criteria:**
- ✅ Navigate between pages using buttons
- ✅ Display real ioBroker data on pages
- ✅ Execute state changes from MCDU buttons
- ✅ Real-time display updates on state changes

---

### Phase 4: Configuration & Polish (Est: 3-4 days)

**Goal:** Production-ready configuration and UX improvements

**Tasks:**
1. Implement `ConfigLoader`:
   - Parse YAML config
   - Validate using Joi schema
   - Hot-reload on config changes (watch file)
2. Add logging (Winston):
   - Log all button presses
   - Log all ioBroker commands
   - Log errors and warnings
3. Improve error handling:
   - Display error messages on MCDU
   - Retry failed ioBroker commands
4. Add LED status indicators:
   - "MCDU" LED: blinks when active
   - "RDY" LED: blinks on action confirmation
   - "FAIL" LED: lights on error
5. Implement auto-brightness (light sensors)
6. Create systemd service for auto-start
7. Write user documentation (README, config examples)

**Success Criteria:**
- ✅ Config file controls all behavior
- ✅ Comprehensive logging
- ✅ Graceful error handling
- ✅ Production deployment ready

---

### Phase 5: Advanced Features (Optional - Est: 5-10 days)

**Goal:** Power-user features and UX enhancements

**Tasks:**
1. Scratchpad input:
   - Text entry using alphanumeric keys
   - Use for setting temperature values, etc.
2. History/graphs:
   - Display mini line charts (solar power over time)
   - Requires accessing ioBroker history adapter
3. Notifications:
   - Queue system for alerts ("Washing finished!")
   - Blink LEDs + show notification page
4. Shortcuts:
   - Long-press buttons for alternate actions
   - Hold function key + LSK for quick actions
5. Multi-user support:
   - Different page layouts per user
   - Switch user via PIN on scratchpad
6. Web dashboard:
   - Show current MCDU display in browser
   - Remote control via web interface

**Success Criteria:**
- ✅ Advanced input methods work
- ✅ Notifications are user-friendly
- ✅ Power-user shortcuts improve efficiency

---

## Deployment Architecture

### Development Setup

```
Developer Machine
├── Node.js 18+
├── Code editor (VS Code recommended)
├── MCDU connected via USB
└── ioBroker test instance (local or VM)
```

**Development Workflow:**
1. Edit code in `/src`
2. `npm run dev` (auto-restart with nodemon)
3. Test on physical MCDU hardware
4. Git commit and push

---

### Production Deployment (Option 1: Standalone Service)

**Target:** Dedicated server/SBC with MCDU connected

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

**Systemd Service (`/etc/systemd/system/mcdu-controller.service`):**
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

**Installation Steps:**
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

### Production Deployment (Option 2: ioBroker Adapter)

**Target:** Run as native ioBroker adapter

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

**Adapter States:**
```
mcdu.0.connected         (boolean) - USB connection status
mcdu.0.current_page      (string)  - Current page name
mcdu.0.brightness.display (number) - Display brightness 0-255
mcdu.0.brightness.buttons (number) - Button brightness 0-255
mcdu.0.button.L1         (boolean) - Button L1 pressed
mcdu.0.button.R1         (boolean) - Button R1 pressed
...
```

**Benefits:**
- ✅ Integrated into ioBroker admin UI
- ✅ Adapter lifecycle managed by ioBroker
- ✅ Easy installation for other users
- ✅ Can expose MCDU state to other adapters

**Tradeoffs:**
- ❌ More complex packaging
- ❌ Must follow ioBroker adapter conventions

---

## Performance Targets

| Metric | Target | Acceptable |
|--------|--------|------------|
| Button press latency | <100ms | <200ms |
| ioBroker state read | <50ms | <100ms |
| Display update (local) | <100ms | <200ms |
| Display update (from ioBroker event) | <300ms | <500ms |
| Page navigation | <200ms | <400ms |
| USB reconnect time | <2s | <5s |
| Config reload | <500ms | <1s |
| Memory usage | <50MB | <100MB |
| CPU usage (idle) | <5% | <10% |

---

## Security Considerations

### ioBroker Authentication
- **Recommendation:** Use dedicated user account for MCDU
- **Permissions:** Read-only for sensors, write access only for controlled devices
- **Credentials:** Store in environment variables, not in config file

### USB Device Access
- **Linux:** Use udev rules to grant access to specific user (not root)
- **Principle:** Run service with minimal privileges

### Configuration File
- **Location:** `/etc/mcdu-controller/config.yaml`
- **Permissions:** `chmod 600` (owner read/write only)
- **Secrets:** Optionally use environment variables for passwords

---

## Testing Strategy

### Unit Tests
- USB protocol encoding/decoding functions
- Display text rendering
- Configuration validation
- Template evaluation engine

### Integration Tests
- ioBroker connection (mock WebSocket server)
- USB communication (hardware in the loop)
- End-to-end: button press → ioBroker → display update

### Manual Testing
- Test all pages with real ioBroker instance
- Verify all button mappings
- Test error scenarios (USB disconnect, ioBroker offline)

---

## Conclusion

This architecture provides a **scalable, maintainable foundation** for the MCDU smart home controller. The layered design ensures:

- ✅ **Clear separation of concerns** (hardware ↔ logic ↔ integration)
- ✅ **Testability** (each layer can be tested independently)
- ✅ **Flexibility** (configuration-driven, no hardcoded pages)
- ✅ **Extensibility** (easy to add new pages and actions)
- ✅ **Production-ready** (logging, error handling, systemd service)

**Recommended Next Steps:**
1. Review this architecture with project stakeholders
2. Set up development environment (Node.js, MCDU hardware, ioBroker test instance)
3. Begin Phase 1 implementation (hardware driver)
4. Iterate based on real-world testing

**Estimated Total Timeline:** 4-6 weeks (for Phases 1-4)

---

**Document Status:** Final Proposal  
**Last Updated:** 2026-02-14  
**Author:** Subagent (mcdu-research)  
**Next Steps:** Implementation kickoff meeting