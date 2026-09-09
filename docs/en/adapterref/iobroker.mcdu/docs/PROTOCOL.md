---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
---
# MCDU MQTT Protocol Specification

**Version:** 1.0
**Status:** Stable — this is the contract between any "brain" (ioBroker adapter, Home
Assistant integration, ...) and the `mcdu-client` running on the Raspberry Pi.

The client is a dumb terminal: it renders what it receives and reports button presses.
All business logic (pages, navigation, input, validation) lives on the brain side.
Any integration that implements this spec can drive the MCDU without changes to the client.

```
Brain (adapter/integration)  <-- MQTT broker -->  mcdu-client (Pi)  <-- USB HID -->  WinWing MCDU
```

**IMPORTANT — single brain rule:** Only ONE brain may actively publish to a given
device at a time. Display topics are retained; two publishers cause flickering and
undefined display state. When migrating between integrations, stop the old one first.

---

## 1. Topic structure

All topics: `{prefix}/{deviceId}/{suffix}`

- `prefix`: default `mcdu` (client config `mqtt.topicPrefix`, adapter config `topicPrefix`)
- `deviceId`: the client's MQTT `clientId` (client config `mqtt.clientId`, e.g. `mcdu-client-pi`)

### Brain → Client (client subscribes, QoS 1)

| Topic suffix | Purpose |
|---|---|
| `display/set` | Full display update (all 14 lines) |
| `display/line` | Single line update |
| `display/clear` | Clear the display |
| `leds/set` | Set multiple LEDs at once |
| `leds/single` | Set a single LED |
| `status/ping` | Health check request |

### Client → Brain

| Topic suffix | QoS | Retain | Purpose |
|---|---|---|---|
| `status/online` | 1 | yes | Online/offline status (also the LWT topic) |
| `status/announce` | 1 | no | Device announcement on connect |
| `buttons/event` | 1 | no | Button press/release events |
| `status/pong` | 0 | no | Health check response |
| `status/error` | 1 | no | Client-side error report |

### Brain-only

| Topic | Purpose |
|---|---|
| `{prefix}/adapter/status` | Brain online/offline (retained, LWT). Informational only; the client does not consume it. |

---

## 2. Payloads

All payloads are JSON (UTF-8). All `timestamp` fields are Unix milliseconds.

### 2.1 `display/set` — full display (retained)

```json
{
  "lines": [
    { "text": "        MCDU MENU       ", "color": "white" },
    { "text": "<IOBROKER               ", "color": "cyan",
      "segments": [
        { "text": "<IOBROKER   ", "color": "cyan" },
        { "text": "  SETTINGS> ", "color": "amber" }
      ]
    }
  ],
  "timestamp": 1755500000000
}
```

Rules:
- `lines` MUST contain exactly 14 entries (array index 0 = top line ... 13 = scratchpad).
- `text` MUST be exactly 24 characters (pad with spaces / truncate). ASCII only —
  non-ASCII characters cause the hardware to drop display frames.
- `color`: one of `white`, `amber`, `cyan`, `green`, `magenta`, `red`, `yellow`,
  `grey`, `blue`. Unknown colors fall back to `white`. (`blue` maps to the same
  hardware code as `cyan`.)
- `segments` (optional): multi-color rendering of one line. Segment texts are
  concatenated left to right; their combined length should be 24. When `segments`
  is present it takes precedence over the line-level `color`; `text` should still
  contain the full 24-char line as fallback/cache value.
- Published with retain so a (re)connecting client immediately renders the current
  page (the client captures the retained frame during hardware init).

### 2.2 `display/line` — single line (retained)

```json
{ "lineNumber": 3, "text": "LIVING ROOM 21.5 C      ", "color": "green", "timestamp": 1755500000000 }
```

- `lineNumber` is **1-based** (1..14) — unlike the 0-based array in `display/set`.
- `segments` is supported the same way as in `display/set` (then `text`/`color` may be omitted).

### 2.3 `display/clear` (retained)

```json
{ "timestamp": 1755500000000 }
```

Resets all 14 lines to blanks (white).

### 2.4 `leds/set`

```json
{ "leds": { "FAIL": true, "MCDU": false, "BACKLIGHT": 180 } }
```

- Values: boolean (on/off) or number 0–255 (brightness, clamped).
- Unknown LED names are ignored with a warning.

### 2.5 `leds/single`

```json
{ "name": "RDY", "state": true }
{ "name": "SCREEN_BACKLIGHT", "brightness": 128 }
```

- Either `state` (boolean) or `brightness` (0–255). `brightness` wins if both present.

LED names (11): `FAIL`, `FM`, `MCDU`, `MENU`, `FM1`, `IND`, `RDY`, `STATUS`, `FM2`,
`BACKLIGHT`, `SCREEN_BACKLIGHT`. The two backlights default to on at client start.

### 2.6 `status/ping` → `status/pong`

Request: `{ "requestId": "abc123" }`

Response:
```json
{
  "requestId": "abc123",
  "uptime": 3600,
  "buttonsSent": 42,
  "displaysRendered": 100,
  "mqttMessagesReceived": 150,
  "errors": 0,
  "timestamp": 1755500000000
}
```

### 2.7 `status/online` (retained, LWT)

On connect:
```json
{
  "status": "online",
  "hostname": "mcdu2",
  "clientId": "mcdu-client-pi",
  "version": "1.0.0",
  "mockMode": false,
  "timestamp": 1755500000000
}
```

LWT / graceful shutdown: `{ "status": "offline", "timestamp": ... }`

Because this is retained, a brain can **discover devices** by subscribing to
`{prefix}/+/status/online`.

### 2.8 `status/announce`

Published once on every client connect (not retained):

```json
{
  "deviceId": "mcdu-client-pi",
  "hostname": "mcdu2",
  "ipAddress": "10.10.2.228",
  "version": "1.0.0",
  "timestamp": 1755500000000
}
```

### 2.9 `buttons/event`

```json
{ "button": "LSK1L", "action": "press", "timestamp": 1755500000000 }
```

- `action`: `press` or `release`.
- Button names (see `mcdu-client/lib/button-map.json` for the authoritative list):
  - LSKs: `LSK1L`..`LSK6L`, `LSK1R`..`LSK6R`
  - Function keys: `DIR`, `PROG`, `PERF`, `INIT`, `DATA`, `FPLN`, `RAD`, `FUEL`,
    `SEC`, `ATC`, `MENU`, `AIRPORT`
  - Slew: `SLEW_LEFT`, `SLEW_UP`, `SLEW_RIGHT`, `SLEW_DOWN`
  - Alphanumeric: `A`..`Z`, `0`..`9`, `DOT`, `PLUSMINUS`, `SLASH`, `SPACE`
  - Special: `OVFY`, `CLR`, `BRT`, `DIM`, `EMPTY_LEFT`, `EMPTY_RIGHT`

### 2.10 `status/error`

```json
{ "error": "Display update error", "code": "USB_WRITE", "stack": "...", "timestamp": 1755500000000 }
```

---

## 3. Behavior requirements for brains

1. **Throttle display updates.** The client needs ~560 ms to push a full frame over
   USB (14 lines × 40 ms). The reference adapter throttles to max 10 publishes/sec
   and deduplicates unchanged frames. Brains SHOULD do the same.
2. **Retained display topics are the display state.** Publish `display/set` with
   retain so reconnecting clients recover the screen without brain interaction.
3. **ASCII only.** Sanitize all text to printable ASCII before publishing.
4. **LEDs after display.** If you change display and LEDs "simultaneously", publish
   the display update first (hardware constraint honored by the client, but ordering
   on the wire avoids visible glitches).
5. **Device discovery.** Subscribe to `{prefix}/+/status/online` (retained) and/or
   `{prefix}/+/status/announce`.

---

## 4. Legacy / reserved (do not implement)

- `mcdu-client/lib/mqtt-handler.js` is **dead legacy code** with an older topic scheme
  (`display/line{N}`, `display/color{N}`, `led/{NAME}`, `config/#`, `button/{label}`,
  `heartbeat`). It is not wired into `mcdu-client.js`. Do not implement against it.
- `buttons/keypad`: the reference adapter subscribes to it for historical reasons;
  the current client never publishes it. Reserved.

---

## 5. Versioning

- This document is protocol **v1.0** (matches `version: "1.0.0"` in client status payloads).
- Backward-incompatible changes bump the major version and MUST be coordinated between
  the ioBroker adapter, the Home Assistant integration, and the client.