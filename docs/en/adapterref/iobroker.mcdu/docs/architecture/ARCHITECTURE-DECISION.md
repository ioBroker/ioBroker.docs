---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
---
# Architecture Decision: RasPi MCDU Unit ↔ ioBroker

**Date:** 2026-02-14  
**Status:** 🤔 Decision Needed Before Phase 3

## The Question

Felix wants a **Raspberry Pi as dedicated MCDU unit** (smart move!). But:
- Where's the demarcation line between RasPi and ioBroker?
- Where does business logic live?
- How do they communicate?
- What's robust, compact, and fast?

---

## How Other Systems Do It

### 1. Lovelace/Tablet Dashboards (Browser-Based)

```
┌─────────────┐         HTTP/WebSocket        ┌─────────────┐
│   Tablet    │ ◄─────────────────────────── │  ioBroker   │
│             │                                │             │
│ - Browser   │  Request: "What to show?"     │ - Web Server│
│ - Rendering │  Response: Full HTML/JSON     │ - Logic     │
│ - Touch     │  Send: "Button X pressed"     │ - States    │
│   Events    │                                │ - Templates │
└─────────────┘                                └─────────────┘
```

**Characteristics:**
- Tablet = 100% dumb (just renders)
- ALL logic in ioBroker
- Configuration in ioBroker
- Updates: Only server-side

**Pros:**
- Simple client (just browser)
- Centralized configuration
- Multi-device easy

**Cons:**
- Network latency for every interaction
- Requires web stack

---

### 2. Zigbee/Z-Wave Devices

```
┌─────────────┐         Zigbee Protocol       ┌─────────────┐
│   Device    │ ◄─────────────────────────── │  Coordinator│
│             │                                │  (USB Stick)│
│ - Firmware  │  Send: "Button pressed"       │             │
│ - Minimal   │  Receive: "LED on/off"        │      ↕      │
│   Logic     │                                │             │
│             │                                │  ioBroker   │
│ - Battery   │                                │  Adapter    │
└─────────────┘                                └─────────────┘
```

**Characteristics:**
- Device has minimal firmware (button → signal)
- ALL business logic in ioBroker adapter
- Zigbee coordinator translates protocol

**Pros:**
- Devices super robust (minimal logic)
- Battery efficient
- Config in ioBroker

**Cons:**
- Needs special hardware (Zigbee coordinator)
- Limited to Zigbee capabilities

---

### 3. Sonoff/Tasmota (MQTT-Based Smart Devices)

```
┌─────────────┐            MQTT               ┌─────────────┐
│  Tasmota    │ ◄─────────────────────────── │MQTT Broker  │
│  Device     │                                │ (Mosquitto) │
│             │  Publish: stat/device/POWER   │             │
│ - Firmware  │  Subscribe: cmnd/device/POWER │      ↕      │
│ - Templates │                                │             │
│ - Rules     │                                │  ioBroker   │
│ - Local     │                                │  (Standard  │
│   Logic     │                                │   MQTT      │
│             │                                │   Adapter)  │
└─────────────┘                                └─────────────┘
```

**Characteristics:**
- Device has its own logic (rules, templates)
- ioBroker just subscribes to MQTT topics
- Config on device (web UI) OR via MQTT

**Pros:**
- Fast local response
- Works offline (from ioBroker)
- Standard MQTT adapter

**Cons:**
- Configuration on each device
- Updates needed per device
- Two places for logic

---

### 4. Squeezebox/Logitech Media Server

```
┌─────────────┐        Squeezebox Protocol    ┌─────────────┐
│  Player     │ ◄─────────────────────────── │    LMS      │
│  (RasPi)    │                                │   Server    │
│             │  Request: "Next track info"   │             │
│ - Renderer  │  Response: Full track data    │ - Library   │
│ - Display   │  Send: "Button: Next"         │ - Playlists │
│   Driver    │                                │ - Logic     │
│ - Audio     │                                │ - Plugins   │
│   Output    │                                │             │
│             │  Cached: Current playlist     │             │
└─────────────┘                                └─────────────┘
```

**Characteristics:**
- Player = rendering client with local cache
- Server has ALL music logic
- Fast interaction via caching

**Pros:**
- Multiple players (bedroom, living room)
- Centralized library & config
- Responsive (local cache)

**Cons:**
- Complex protocol
- Player needs some smarts (caching)

---

## Recommended Architecture for MCDU

### Option C: **Hybrid Approach** (Best of Both Worlds)

```
┌───────────────────────────────────┐
│     RasPi MCDU Unit               │
│                                   │
│  ┌─────────────────────────────┐ │         MQTT
│  │   mcdu-client.js            │ │    ┌──────────────┐
│  │                             │ │◄───┤ MQTT Broker  │
│  │ - mcdu.js driver            │ │    └──────────────┘
│  │ - MQTT client               │ │           ▲
│  │ - Template cache (local)    │ │           │
│  │ - Display renderer          │ │           │
│  │                             │ │           │
│  │ Subscribe:                  │ │           │
│  │   mcdu/DEVICE_ID/display/#  │ │           │
│  │   mcdu/DEVICE_ID/led/#      │ │           │
│  │   mcdu/DEVICE_ID/template/# │ │           │
│  │                             │ │           │
│  │ Publish:                    │ │           │
│  │   mcdu/DEVICE_ID/button/LSK1L│ │          │
│  │   mcdu/DEVICE_ID/status     │ │           │
│  └─────────────────────────────┘ │           │
│                ↕                  │           │
│  ┌─────────────────────────────┐ │           │
│  │   USB                       │ │           │
│  │   MCDU Hardware             │ │           │
│  └─────────────────────────────┘ │           │
└───────────────────────────────────┘           │
                                                │
                                                │
┌───────────────────────────────────────────────┼───────┐
│     ioBroker Instance                         │       │
│                                               ▼       │
│  ┌─────────────────────────────────────────────────┐ │
│  │   ioBroker.mcdu Adapter                         │ │
│  │                                                  │ │
│  │ - Template Management                           │ │
│  │ - State Mapping (States ↔ Display)             │ │
│  │ - Button Handler (Button Events → Actions)     │ │
│  │ - Multi-MCDU Support                           │ │
│  │                                                  │ │
│  │ Subscribe:                                      │ │
│  │   mcdu/+/button/#    (all devices, all buttons)│ │
│  │   mcdu/+/status                                 │ │
│  │                                                  │ │
│  │ Publish:                                        │ │
│  │   mcdu/DEVICE_ID/display/line1 = "TEXT"        │ │
│  │   mcdu/DEVICE_ID/led/FAIL = 255                │ │
│  │   mcdu/DEVICE_ID/template/current = {...}      │ │
│  └─────────────────────────────────────────────────┘ │
│                                                       │
│  ┌─────────────────────────────────────────────────┐ │
│  │   ioBroker States                               │ │
│  │                                                  │ │
│  │   0_userdata.0.solar.power = 5.2 kW            │ │
│  │   0_userdata.0.weather.temp = 22°C             │ │
│  │   hm-rpc.0.washing_machine.STATE = true        │ │
│  └─────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────┘
```

---

## Communication Protocol (MQTT Topics)

### RasPi → ioBroker (Button Events)

```
Topic: mcdu/DEVICE_ID/button/LSK1L
Payload: { "pressed": true, "timestamp": 1707912345 }

Topic: mcdu/DEVICE_ID/button/DIR
Payload: { "pressed": true }
```

### ioBroker → RasPi (Display Updates)

```
Topic: mcdu/DEVICE_ID/display/line1
Payload: "SOLAR POWER"

Topic: mcdu/DEVICE_ID/display/line2
Payload: "5.2 kW"

Topic: mcdu/DEVICE_ID/led/FAIL
Payload: 0

Topic: mcdu/DEVICE_ID/led/RDY
Payload: 255
```

### ioBroker → RasPi (Template Sync)

```
Topic: mcdu/DEVICE_ID/template/current
Payload: {
  "name": "solar_overview",
  "lines": [
    { "text": "SOLAR POWER", "color": "W" },
    { "text": "${state:0_userdata.0.solar.power} kW", "color": "G" }
  ],
  "buttons": {
    "LSK1L": { "action": "toggle", "target": "hm-rpc.0.lights.kitchen" }
  }
}
```

---

## Where Does What Live?

### RasPi MCDU Unit (mcdu-client.js)

**Responsibilities:**
- ✅ Hardware driver (mcdu.js)
- ✅ MQTT client
- ✅ Template cache (for offline capability)
- ✅ Display rendering (MQTT state → MCDU display)
- ✅ Button reading (MCDU button → MQTT publish)
- ✅ LED control (MQTT command → MCDU LED)

**Does NOT handle:**
- ❌ Business logic (which button does what)
- ❌ State subscriptions (what states to show)
- ❌ Template creation/editing

**Size:** ~500 lines of code  
**Dependencies:** node-hid, mqtt  
**Config:** Just MQTT broker IP + Device ID

---

### ioBroker Adapter (ioBroker.mcdu)

**Responsibilities:**
- ✅ Template management (create/edit/store)
- ✅ State mapping (ioBroker states → MCDU display)
- ✅ Button handling (button events → ioBroker actions)
- ✅ Multi-MCDU support
- ✅ Admin UI (JSON Config)

**Does NOT handle:**
- ❌ USB/HID communication (that's on RasPi)
- ❌ Display rendering (RasPi does that)

**Size:** ~1500 lines of code  
**Dependencies:** Standard ioBroker adapter dependencies

---

## Example Flow: "Show Solar Power"

### 1. Configuration (in ioBroker Admin UI)

```javascript
// User configures template in ioBroker
{
  "template": "solar_overview",
  "line1": { "text": "SOLAR POWER", "color": "W" },
  "line2": { "text": "${state:0_userdata.0.solar.power} kW", "color": "G" },
  "line3": { "text": "Battery: ${state:0_userdata.0.battery.soc}%", "color": "A" }
}
```

### 2. Template Sync (ioBroker → RasPi)

```
ioBroker publishes to: mcdu/raspi-kitchen/template/solar_overview
RasPi receives and caches template
```

### 3. State Changes (ioBroker → RasPi)

```
Solar power changes: 5.2 kW → 5.5 kW

ioBroker adapter:
1. Detects state change
2. Renders template with new value
3. Publishes: mcdu/raspi-kitchen/display/line2 = "5.5 kW"

RasPi:
1. Receives MQTT message
2. Calls: mcdu.setLine(1, "5.5 kW", "G")
3. Calls: mcdu.updateDisplay()
```

### 4. Button Press (RasPi → ioBroker)

```
User presses LSK1L

RasPi:
1. mcdu.js detects button press (bit 0)
2. Looks up button-map.json: bit 0 = "LSK1L"
3. Publishes: mcdu/raspi-kitchen/button/LSK1L = { "pressed": true }

ioBroker adapter:
1. Receives MQTT message
2. Checks template: LSK1L → toggle light
3. Executes: setState("hm-rpc.0.lights.kitchen", !currentState)
4. Updates display if needed
```

---

## Why This Architecture?

### ✅ Robust
- RasPi software is simple (driver + MQTT)
- No complex business logic on RasPi
- Survives ioBroker restarts (cached templates)

### ✅ Fast
- Display updates: <50ms (local rendering)
- Button response: <100ms (MQTT publish is instant)
- Template cache avoids constant network traffic

### ✅ Compact
- RasPi code: ~500 lines
- Single binary/service
- No database needed

### ✅ Scalable
- Multiple MCDUs: Just more RasPis
- Each RasPi = independent client
- Central config in ioBroker

### ✅ Debuggable
- RasPi logs: "Received display update for line 2"
- ioBroker logs: "Button LSK1L pressed, toggling light"
- MQTT broker shows all traffic
- Can test with `mosquitto_pub` / `mosquitto_sub`

---

## Development Phases (REVISED)

### Phase 3a: RasPi Client (1-2 days)

Build `mcdu-client.js`:
1. Load mcdu.js driver
2. Connect to MQTT broker
3. Subscribe to display/LED topics
4. Publish button events
5. Simple template cache

**Test without ioBroker:**
```bash
# Publish display update
mosquitto_pub -t "mcdu/test/display/line1" -m "HELLO"

# Subscribe to buttons
mosquitto_sub -t "mcdu/test/button/#"
```

### Phase 3b: ioBroker Adapter (2-3 days)

Build ioBroker.mcdu:
1. MQTT client
2. Template management
3. State subscriptions
4. Button handlers
5. JSON Config UI

**Test with RasPi running:**
- Configure template in ioBroker
- See it appear on MCDU
- Press button, see action happen

---

## Decision Needed

**Felix, does this architecture make sense?**

**Advantages:**
- Clear separation: RasPi = hardware, ioBroker = logic
- MQTT = industry standard (reliable, debuggable)
- Can develop/test RasPi client independently
- Can test with `mosquitto_pub` before ioBroker adapter exists

**Questions:**
1. Do you already have a MQTT broker running? (Mosquitto?)
2. Do you want each RasPi to have its own unique ID?
3. Should the RasPi client auto-discover ioBroker or use static config?

---

**Next Step:** Once you approve this architecture, we build Phase 3a (RasPi client) first!