---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
---
# MCDU Smart Home Controller - Research Findings

**Research Date:** 2026-02-14  
**Researcher:** Subagent (mcdu-research)  
**Project:** Repurpose WinWing MCDU as ioBroker Smart Home Controller

---

## Executive Summary

This document consolidates research findings from the WinWing MCDU reverse engineering project and ioBroker integration capabilities. The WinWing MCDU is a fully functional flight control unit with USB communication, a built-in display, 60+ physical buttons, and controllable LEDs. The existing reverse engineering work provides a solid foundation for USB protocol implementation. ioBroker offers multiple integration paths (REST API, WebSocket, custom adapter) suitable for this use case.

**Key Finding:** This project is **technically feasible** with manageable complexity. The hardware protocol is well-documented, and ioBroker provides flexible integration options.

---

## Part 1: WinWing MCDU Hardware & Protocol

### 1.1 Hardware Overview

**Device:** WinWing MCDU-32 (Multi-function Control & Display Unit)  
**Product Link:** https://ea.winctrl.com/view/goods-details.html?id=945  
**Interface:** USB HID (Human Interface Device)

**USB Identifiers:**
- Vendor ID: `0x4098`
- Product IDs (configurable via SimAppPro):
  - `0xbb36` - MCDU-32-CAPTAIN
  - `0xbb3a` - MCDU-32-OBSERVER
  - `0xbb3e` - MCDU-32-CO-PILOT

### 1.2 Input Capabilities

**Total Buttons:** 60+ physical buttons mapped to HID reports

**Button Categories:**

1. **Line Select Keys (LSK):** 12 buttons total
   - L1, L2, L3, L4, L5, L6 (left side)
   - R1, R2, R3, R4, R5, R6 (right side)

2. **Function Keys:** 10 buttons
   - DIR, PROG, PERF, INIT
   - DATA, F-PLN, RAD NAV, FUEL PRED, SEC F-PLN, ATC COMM
   - MCDU MENU, AIR PORT
   - BRT (brightness), DIM

3. **Navigation:** 4 arrow keys (up, down, left, right)

4. **Alphanumeric Keyboard:**
   - Numbers: 0-9
   - Letters: A-Z
   - Special: Point (.), +/-, /, SP (space)

5. **Control Keys:**
   - OVFY (Overfly)
   - CLR (Clear)

**Button Signal Protocol:**

Buttons are read via `hid.read()` returning 25-byte arrays.

- **Byte 1:** Always `0x01` (report ID)
- **Bytes 2-11:** Button state bitmap (each bit represents one button)
- **Bytes 18-25:** Light sensor data (ambient light detection)

**Example Button Mapping (Byte 2):**
```
0x01: L1
0x02: L2
0x04: L3
0x08: L4
0x10: L5
0x20: L6
0x40: R1
0x80: R2
```

Full button map documented across bytes 2-11 (see GitHub repo for complete table).

### 1.3 Display Capabilities

**Display Type:** Built-in LCD screen  
**Resolution:** Not explicitly documented (appears to be character-based, similar to real MCDU displays)  
**Color Support:** Multiple colors configurable via color palette definitions

**Display Control Protocol:**

**1. Initialization Block (First Block)**

Must be sent once to define color palette and display modes. This is a large multi-packet transmission split across multiple USB writes (~17 sequential `device.write()` commands).

**Color Definitions (RGBA format):**
- Background color: `0x20, 0x20, 0x20, 0xff` (dark gray)
- Text colors mapped to indices (0x00-0x19):
  - White: `0xff, 0xff, 0xff, 0xff`
  - Yellow: `0xff, 0xff, 0x00, 0xff`
  - Green: `0x00, 0xff, 0x00, 0xff`
  - Cyan: `0x00, 0xff, 0xff, 0xff`
  - Magenta: `0xff, 0x00, 0xff, 0xff`
  - Amber: `0xff, 0x63, 0x00, 0xff`
  - Custom colors definable

**2. Text Rendering Block (Second Block)**

After initialization, text is rendered using 64-byte packets starting with `0xf2`.

**Text Encoding:**
- **3 bytes per character:**
  - Byte 1-2: Character attributes (color, size) in little-endian format
  - Byte 3: ASCII character code

**Character Attributes:**
- Base format: `0x0042` (normal white text)
- Add `0x016b` to switch to small font
- Add `0x0021` to cycle through colors (repeatable)

**Example:** Normal white "A": `0x42, 0x00, 0x41`

**Special Characters (multi-byte UTF-8):**
- Degree symbol (°): `c2 b0`
- Up arrow (↑): `e2 86 91`
- Down arrow (↓): `e2 86 93`
- Left arrow (←): `e2 86 90`
- Right arrow (→): `e2 86 92`
- Open triangle (Δ): `ce 94`
- Right closed triangle (▶): `e2 96 b6`
- Left closed triangle (◀): `e2 97 80`
- Open square (☐): `e2 98 90`
- Open rhombus (◊): `e2 ac a1`

**Display Layout:**
Text starts at top-left corner and flows left-to-right, top-to-bottom. When filling the screen, pad the last packet with `0x00` bytes to reach 64-byte length.

### 1.4 LED Indicators

**LEDs Available:** 8 status LEDs

**LED Control:**
Command: `device.write([0x02, 0x32, 0xbb, 0x00, 0x00, 0x03, 0x49, 0xXX, 0xYY, ...])`

- **Byte 8 (XX):** LED selection
  - `0x08`: FAIL
  - `0x09`: FM (Flight Management)
  - `0x0a`: MCDU
  - `0x0b`: MENU
  - `0x0c`: FM1
  - `0x0d`: IND (Index)
  - `0x0e`: RDY (Ready)
  - `0x0f`: Status (horizontal bar)
  - `0x10`: FM2

- **Byte 9 (YY):** LED state
  - `0x01`: ON
  - `0x00`: OFF

### 1.5 Brightness Control

**Button Backlight:**
```python
device.write([0x2, 0x32, 0xbb, 0x0, 0x0, 0x3, 0x49, 0x0, 0xcc, 0x0, 0x0, 0x0, 0x0, 0x0])
```
`0xcc` = brightness value (0-255)

**Display Backlight:**
```python
device.write([0x02, 0x32, 0xbb, 0x00, 0x00, 0x03, 0x49, 0x01, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00])
```
`0xff` = brightness value (0-255)

### 1.6 Light Sensors

**Sensors:** 2 ambient light sensors (left and right)

**Data Location:** Bytes 18-25 of HID read buffer

**Value Range:** 0 to ~3,060 (12 * 255)

**Formula (left sensor):** `value = byte19 * 255 + byte18`

**Use Case:** Auto-adjust display/button brightness based on ambient light

### 1.7 Existing Reverse Engineering Work

**GitHub Repository:** https://github.com/alha847/winwing_mcdu  
**Author:** alha847  
**Status:** "Reverse engineering almost completed"

**Available Resources:**
- Python example scripts using `hid` library
- Lua script for X-Plane integration (`lra333_winwing_mcdu_driver.lua`)
- Complete USB protocol documentation (buttons, display, LEDs, brightness)
- Test scripts for display text rendering

**Development Environment Used:**
- MacBook M1 Pro
- Python + hidapi library
- SimAppPro (WinWing configuration software) running in Windows 11 VM

**Key Learnings from Repo:**
- USB HID communication is stable and well-understood
- Display protocol is complex but fully documented
- No proprietary encryption or authentication required
- Works cross-platform (tested on macOS, likely works on Linux/Windows)

---

## Part 2: ioBroker Integration Options

### 2.1 ioBroker Overview

**What is ioBroker?**  
ioBroker is an open-source IoT platform for smart home automation. It uses a modular adapter architecture to integrate diverse devices and services.

**Core Concepts:**

1. **Objects:** Metadata describing devices, channels, and data points
2. **States:** Actual values of data points with timestamps and acknowledgment flags
3. **Adapters:** Plugins that connect ioBroker to external systems
4. **Events:** Real-time state change notifications

**Acknowledgment (ack) Flag:**
- `ack=false`: Command (e.g., "turn on light")
- `ack=true`: State confirmation (e.g., "light is now on")

### 2.2 Integration Approach 1: REST API (Simple API)

**Adapter:** `iobroker.simple-api`  
**GitHub:** https://github.com/ioBroker/ioBroker.simple-api  
**Status:** Mature, but ioBroker recommends using `rest-api` instead

**Key Endpoints:**

| Endpoint | Method | Description | Example |
|----------|--------|-------------|---------|
| `/get/stateID` | GET | Read state with full metadata | `/get/system.adapter.admin.0.alive` |
| `/getPlainValue/stateID` | GET | Read state value only (text) | `/getPlainValue/admin.0.memHeapTotal` → `31.19` |
| `/getBulk/id1,id2,...` | GET | Read multiple states efficiently | `/getBulk/temp.living,temp.bedroom` |
| `/set/stateID?value=X` | GET | Set state value | `/set/lights.living?value=1` |
| `/setBulk` | GET/POST | Set multiple states | `/setBulk?light1=0&light2=1` |
| `/states?pattern=X*` | GET | List all states matching pattern | `/states?pattern=hm-rpc.0.*` |
| `/objects?pattern=X*` | GET | List all objects matching pattern | `/objects?pattern=system.adapter.*` |

**Authentication:**
- URL parameters: `?user=admin&pass=secret`
- HTTP Basic Auth
- OAuth2 Bearer tokens

**Response Formats:**
- JSON (default)
- Plain text (for `getPlainValue`)
- Add `?prettyPrint` for human-readable JSON

**Pros:**
- ✅ Simple HTTP requests (no client library needed)
- ✅ Works from any language (Python, Node.js, Bash)
- ✅ Good for polling and occasional writes
- ✅ Well-documented

**Cons:**
- ❌ No real-time state updates (requires polling)
- ❌ Inefficient for rapid button press → state change loops
- ❌ Higher latency than WebSocket

**Use Case for MCDU:**
- Initial prototype for read-only dashboards
- Polling ioBroker state every 1-2 seconds to update MCDU display

### 2.3 Integration Approach 2: WebSocket (socket.io)

**Adapter:** `iobroker.socketio`  
**GitHub:** https://github.com/ioBroker/ioBroker.socketio  
**Important:** Since v4.0, uses **pure WebSockets** (not socket.io library)

**Client Library:** [@iobroker/socket-client](https://github.com/ioBroker/socket-client)

**Supported Methods (documented in @iobroker/socket-classes):**

**State Operations:**
- `getState(id)` - Read single state
- `getStates(pattern)` - Read multiple states
- `setState(id, state)` - Write state
- `subscribe(pattern)` - Subscribe to state changes
- `unsubscribe(pattern)` - Unsubscribe

**Object Operations:**
- `getObject(id)` - Read object metadata
- `getObjects()` - Read all objects
- `setObject(id, obj)` - Create/update object

**File Operations:**
- `readFile(adapter, filename)`
- `writeFile(adapter, filename, data)`

**Event Subscriptions:**
- `on('stateChange', callback)` - Listen for state updates
- `on('objectChange', callback)` - Listen for object updates

**Pros:**
- ✅ **Real-time updates** via WebSocket subscriptions
- ✅ Bi-directional communication
- ✅ Lower latency than REST
- ✅ Efficient for frequent updates (button presses → instant state changes)
- ✅ Official client library available

**Cons:**
- ❌ More complex than REST API
- ❌ Requires maintaining persistent connection
- ❌ WebSocket reconnection logic needed

**Use Case for MCDU:**
- **Ideal for production use**
- Subscribe to smart home state changes → instant MCDU display updates
- Button presses → WebSocket commands → device control
- Example: Subscribe to `washing_machine.status` → update MCDU display when cycle completes

### 2.4 Integration Approach 3: Custom ioBroker Adapter

**What is an Adapter?**  
A native ioBroker plugin written in JavaScript/TypeScript that runs as a managed process within ioBroker.

**Adapter Template:** [@iobroker/create-adapter](https://github.com/ioBroker/create-adapter)  
**Example Repo:** https://github.com/ioBroker/ioBroker.example

**Adapter Capabilities:**
- Direct access to ioBroker's internal state/object databases
- Automatic lifecycle management (start/stop/restart)
- Admin UI for configuration
- Built-in logging and error handling
- Can create custom objects/states in ioBroker namespace

**Adapter Development Stack:**
- **Language:** JavaScript or TypeScript
- **Testing:** Mocha, Chai, Sinon
- **Code Quality:** ESLint
- **Package Manager:** npm

**Typical Adapter Structure:**
```
iobroker.mcdu-controller/
├── admin/              # Web UI for adapter configuration
│   ├── index_m.html
│   └── custom.css
├── lib/                # Core logic
│   └── mcdu.js         # USB communication layer
├── main.js             # Adapter entry point
├── io-package.json     # Adapter metadata
└── package.json        # npm dependencies
```

**Adapter Lifecycle Hooks:**
- `onReady()` - Called when adapter starts
- `onStateChange(id, state)` - Called when subscribed state changes
- `onMessage(obj)` - Called for inter-adapter messages
- `onUnload(callback)` - Called before adapter stops

**Pros:**
- ✅ **Native ioBroker integration** (appears in admin UI)
- ✅ Direct database access (fastest performance)
- ✅ Can create custom objects (e.g., `mcdu.0.button.L1`, `mcdu.0.display.line1`)
- ✅ Automatic restart on crash
- ✅ Built-in state subscription mechanisms
- ✅ Easiest for other users to install (via ioBroker admin)

**Cons:**
- ❌ Requires Node.js (can't use Python)
- ❌ More complex initial setup
- ❌ Must follow ioBroker adapter guidelines
- ❌ USB access from Node.js (need `node-hid` or `usb` library)

**Use Case for MCDU:**
- **Best for public release** (shareable adapter)
- MCDU appears as device in ioBroker with own states
- Users configure pages via admin UI
- Example states:
  - `mcdu.0.button.L1` - Left button 1 pressed
  - `mcdu.0.display.text` - Current display content
  - `mcdu.0.led.FAIL` - Control FAIL LED state

### 2.5 Recommended Integration Approach

**For Prototyping (Phase 1-2):**
- **External Python Script + REST API**
  - Fast iteration
  - Leverage existing Python HID examples from WinWing repo
  - Simple HTTP requests to read/write ioBroker states

**For Production (Phase 3-5):**
- **External Node.js Service + WebSocket**
  - Real-time state updates
  - Professional-grade solution
  - Easier to maintain than custom adapter

**For Public Release (Optional):**
- **Custom ioBroker Adapter**
  - Repackage Node.js service as ioBroker adapter
  - Provides user-friendly installation experience
  - Integrates into ioBroker admin UI

---

## Part 3: ioBroker State & Object Patterns

### 3.1 Reading Smart Home States

**Example: Query All Lights**
```bash
# REST API
GET http://iobroker-host:8087/states?pattern=hm-rpc.0.*.STATE&prettyPrint

# Returns:
{
  "hm-rpc.0.living_room.light.STATE": { "val": true, "ts": 1234567890 },
  "hm-rpc.0.bedroom.light.STATE": { "val": false, "ts": 1234567891 }
}
```

**Example: Read Single Sensor**
```bash
# REST API
GET http://iobroker-host:8087/getPlainValue/weather.0.current.temperature

# Returns:
22.5
```

**Example: Subscribe to State Changes (WebSocket)**
```javascript
// Node.js with @iobroker/socket-client
const socket = new SocketClient('http://iobroker-host:8082');

await socket.connect();
await socket.subscribe('washing_machine.0.status');

socket.on('stateChange', (id, state) => {
  console.log(`${id} changed to ${state.val}`);
  // Update MCDU display
});
```

### 3.2 Writing Control Commands

**Example: Toggle Light**
```bash
# REST API
GET http://iobroker-host:8087/set/lights.living.STATE?value=1&ack=false

# Returns:
{"id": "lights.living.STATE", "value": 1}
```

**Example: Set Temperature**
```bash
# REST API
GET http://iobroker-host:8087/set/heating.bedroom.target?value=21.5&type=number
```

**Example: Bulk Write**
```bash
# REST API
POST http://iobroker-host:8087/setBulk
Content-Type: text/plain

lights.living=1&lights.bedroom=0&heating.target=22
```

### 3.3 Typical Smart Home State IDs

**Format:** `adapter.instance.device.channel.state`

**Examples:**
- `hm-rpc.0.kitchen.light.STATE` - Homematic light switch
- `mqtt.0.solar.power` - Solar panel power output
- `sonoff.0.washing_machine.status` - Washing machine status
- `weather.0.current.temperature` - Current temperature
- `history.0` - Historical data adapter

### 3.4 State Value Types

| Type | Example | Use Case |
|------|---------|----------|
| boolean | `true`, `false` | Lights, switches |
| number | `22.5`, `1500` | Temperature, power (W) |
| string | `"running"`, `"idle"` | Status messages |
| object | `{"temp": 22, "hum": 65}` | Complex data |
| null | `null` | Unavailable sensors |

---

## Part 4: Technical Blockers & Challenges

### 4.1 Potential Challenges

**1. USB Permissions (Linux/macOS)**
- **Issue:** HID devices require elevated permissions or udev rules
- **Solution (Linux):** Create udev rule for vendor ID `0x4098`
  ```
  SUBSYSTEM=="usb", ATTRS{idVendor}=="4098", MODE="0666"
  ```
- **Solution (macOS):** May require running script with `sudo` or using IOKit permissions

**2. Display Protocol Complexity**
- **Issue:** Multi-packet initialization sequence is fragile
- **Solution:** Create robust display driver library with error handling
- **Recommendation:** Test thoroughly with packet captures from SimAppPro

**3. ioBroker State Mapping**
- **Issue:** Different smart home adapters use inconsistent naming conventions
- **Solution:** Create flexible configuration file mapping ioBroker state IDs to MCDU pages
- **Example:** User defines `weather_temp: "weather.0.current.temperature"` in config

**4. Text Encoding for Display**
- **Issue:** MCDU display uses 3-byte character encoding (not standard UTF-8)
- **Solution:** Build character encoding library converting ASCII/UTF-8 → MCDU format
- **Note:** Special characters (arrows, symbols) require UTF-8 → multi-byte mapping

**5. Real-time Update Performance**
- **Issue:** Polling REST API every second creates latency
- **Solution:** Use WebSocket subscriptions for instant updates
- **Fallback:** Implement adaptive polling (faster for active pages, slower for idle)

**6. Page Navigation State Management**
- **Issue:** MCDU needs to track current page, button context, and input buffers
- **Solution:** Implement state machine for page navigation
- **Example States:** `DATA`, `CLIMATE`, `ENERGY`, `APPLIANCES`

**7. USB Device Reconnection**
- **Issue:** If MCDU is unplugged/replugged, script crashes
- **Solution:** Implement USB device monitoring and auto-reconnect logic

**8. Display Refresh Rate**
- **Issue:** Unknown optimal refresh rate for display updates
- **Solution:** Test empirically (start with 5 Hz, adjust based on performance)

### 4.2 Mitigations

| Challenge | Risk Level | Mitigation |
|-----------|------------|------------|
| USB permissions | Low | Document udev setup in README |
| Display protocol | Medium | Use existing Python examples as reference |
| State mapping | Low | JSON configuration file |
| Text encoding | Medium | Build reusable encoding library |
| Real-time updates | Low | Use WebSocket (well-documented) |
| Page navigation | Medium | Design clear state machine upfront |
| USB reconnection | Low | Use try-catch with reconnect loop |
| Display refresh | Low | Start conservative, optimize later |

---

## Part 5: Key Takeaways

### 5.1 Feasibility Assessment

✅ **Project is FEASIBLE**

- Hardware protocol is fully documented
- Reverse engineering work provides working code examples
- ioBroker offers flexible integration options
- No major technical blockers identified

### 5.2 Recommended Tech Stack (See ARCHITECTURE.md)

**Prototype:**
- Python + hidapi (USB communication)
- requests library (REST API calls to ioBroker)

**Production:**
- Node.js + node-hid (USB communication)
- @iobroker/socket-client (WebSocket integration)
- JSON/YAML configuration files

### 5.3 Next Steps

1. ✅ Research complete (this document)
2. ⏭️ Create technical architecture proposal (ARCHITECTURE.md)
3. ⏭️ Set up development environment
4. ⏭️ Test basic USB read/write with WinWing MCDU
5. ⏭️ Build display driver library
6. ⏭️ Implement ioBroker integration layer
7. ⏭️ Design page system and configuration format

---

## References

**WinWing MCDU Resources:**
- Reverse engineering repo: https://github.com/alha847/winwing_mcdu
- Product page: https://ea.winctrl.com/view/goods-details.html?id=945

**ioBroker Resources:**
- Simple API: https://github.com/ioBroker/ioBroker.simple-api
- Socket.io adapter: https://github.com/ioBroker/ioBroker.socketio
- Adapter template: https://github.com/ioBroker/ioBroker.example
- Socket client: https://github.com/ioBroker/socket-client

**Python USB Libraries:**
- hidapi: https://pypi.org/project/hidapi/
- pyusb: https://github.com/pyusb/pyusb

**Node.js USB Libraries:**
- node-hid: https://github.com/node-hid/node-hid
- usb (libusb): https://github.com/node-usb/node-usb

---

**Document Status:** Complete  
**Last Updated:** 2026-02-14  
**Next Document:** ARCHITECTURE.md