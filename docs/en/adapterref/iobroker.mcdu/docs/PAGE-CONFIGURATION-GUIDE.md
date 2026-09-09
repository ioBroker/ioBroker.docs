---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
---
# Page Configuration Guide

## Overview

The MCDU adapter renders pages on the WinWing MCDU hardware display. Each page has up to 13 content lines (line 14 is the scratchpad). Configuration is per-device via the Admin UI.

## Admin UI

Navigate to: **Instances > mcdu.0 > Configure**

The configuration is organized into 4 tabs:
- **General Settings** — MQTT broker, performance
- **Device & Pages** — Select device, defaultColor, brightnessStep, load/save pages, edit lines
- **Function Keys** — Configure 11 function keys (MENU, DIR, INIT, etc.)
- **Advanced & About** — Debug logging, version info

## Display Layout

```
Row  1: ┌────────────────────────┐  Status bar (breadcrumb + time)
Row  2: │  sub-label (colLabel)  │  Sub-label for row 3
Row  3: │ LEFT CONTENT  RIGHT    │  LSK1 line (left/right buttons)
Row  4: │  sub-label (colLabel)  │  Sub-label for row 5
Row  5: │ LEFT CONTENT  RIGHT    │  LSK2 line
Row  6: │  sub-label (colLabel)  │  Sub-label for row 7
Row  7: │ LEFT CONTENT  RIGHT    │  LSK3 line
Row  8: │  sub-label (colLabel)  │  Sub-label for row 9
Row  9: │ LEFT CONTENT  RIGHT    │  LSK4 line
Row 10: │  sub-label (colLabel)  │  Sub-label for row 11
Row 11: │ LEFT CONTENT  RIGHT    │  LSK5 line
Row 12: │  sub-label (colLabel)  │  Sub-label for row 13
Row 13: │ LEFT CONTENT  RIGHT    │  LSK6 line / status bar
Row 14: └────────────────────────┘  Scratchpad (user input)
```

- **Odd rows** (3, 5, 7, 9, 11, 13): main content lines, each with left/right LSK buttons
- **Even rows** (2, 4, 6, 8, 10, 12): sub-labels (color from `colLabel`, defaults to device `defaultColor`)
- **Row 1**: status bar showing breadcrumb navigation + time
- **Row 14**: scratchpad for keyboard input
- Each line is **24 characters wide**, split into left (chars 1-12) and right (chars 13-24)

## Line Data Model (Left/Right)

Each line has two sides — `left` and `right`. Each side has:

| Field | Purpose |
|-------|---------|
| `label` | Sub-label text (shown on the even row above, in `colLabel` color) |
| `display` | What to show on this side (label, datapoint, or empty) |
| `button` | What happens when LSK is pressed (navigation, datapoint, or empty) |

### Display Types

**Label** — static text:
```json
{ "type": "label", "text": "WOHNZIMMER", "colLabel": "cyan", "colData": "white" }
```
- `colLabel`: color for the sub-label on the even row above (defaults to device `defaultColor`)
- `colData`: color for the data text on the odd row (defaults to device `defaultColor`)

**Datapoint** — live value from ioBroker:
```json
{ "type": "datapoint", "source": "hm-rpc.0.ABC123.TEMPERATURE", "format": "%.1f", "unit": "C", "colLabel": "cyan", "colData": "green" }
```
- `source`: ioBroker state ID
- `format`: sprintf format (auto-detected: `%.1f` for numbers, `%s` for strings)
- `unit`: display unit (auto-detected from ioBroker object metadata)
- `colLabel`: sub-label color (defaults to device `defaultColor`)
- `colData`: data value color (defaults to device `defaultColor`)

**Empty** — no content:
```json
{ "type": "empty" }
```

### Button Types

**Navigation** — switch to another page:
```json
{ "type": "navigation", "action": "goto", "target": "klima-page" }
```

**Datapoint** — toggle/increment/decrement an ioBroker state:
```json
{ "type": "datapoint", "action": "toggle", "target": "hm-rpc.0.ABC123.STATE" }
```

**Empty** — no button action:
```json
{ "type": "empty" }
```

## LSK Interaction with Datapoints

When you press an LSK button on a line that displays a datapoint (and has no explicit button configured), the adapter uses **ioBroker object metadata** to determine what happens. No manual `editable` flag needed — the adapter reads `obj.common.write`, `obj.common.type`, `obj.common.min`, `obj.common.max` automatically.

### Decision Tree

```
LSK pressed on datapoint line:

  1. Is the datapoint writable? (obj.common.write)
     NO  → Nothing happens (read-only sensor, e.g. temperature reading)
     YES → Continue...

  2. Is it a boolean? (obj.common.type === 'boolean')
     YES → Toggle immediately: true↔false
           No scratchpad needed. Display updates instantly.

  3. Is it a number or string?
     YES → Check scratchpad:
           EMPTY    → Nothing happens (type something first)
           HAS TEXT → Validate and write (see below)
```

### Writing Values from the Scratchpad

To write a value to a writable number or string datapoint:

1. **Type the value** on the keypad (appears in scratchpad on line 14, e.g. `22.5*`)
2. **Press LSK** next to the target datapoint line
3. The adapter validates and writes:

| Situation | Result |
|-----------|--------|
| Valid number within range | Value written, scratchpad cleared, "GESPEICHERT" shown |
| Non-numeric text for number field | `FORMAT ERROR` shown in scratchpad |
| Number outside min/max range | `ENTRY OUT OF RANGE` shown in scratchpad |
| String value | Written as-is, scratchpad cleared |

### Error Handling (Airbus Pattern)

Errors follow the real Airbus MCDU convention:

- **Errors appear in the scratchpad** (line 14) in white text — not on a separate line
- **No auto-timeout** — the error stays until you press CLR
- **CLR once** → restores your rejected input (so you can edit and retry)
- **CLR twice** → clears the scratchpad completely

**Example flow:**
```
1. Type "999" into scratchpad        → Scratchpad: "999*"
2. Press LSK on temperature (max 30) → Scratchpad: "ENTRY OUT OF RANGE"
3. Press CLR                          → Scratchpad: "999*"  (restored!)
4. Clear and type "22.5"             → Scratchpad: "22.5*"
5. Press LSK again                    → Value written, "GESPEICHERT"
```

### Boolean Toggle Example

```
Line 5 shows: "LICHT KUECHE    AN"  (source: hm-rpc.0.ABC.STATE, boolean, writable)

1. Press LSK5L → value toggles to false
2. Display updates: "LICHT KUECHE   AUS"
3. Press LSK5L again → value toggles to true
```

No scratchpad involved for booleans — it's a direct toggle.

## Navigation

### Breadcrumb (Status Bar)

Row 1 shows the navigation path: `HOME > KLIMA > WOHNZIMMER 14:30`

Set `parent` on pages to build the navigation hierarchy.

### CLR Key

- **Scratchpad has content** → clears scratchpad (or restores after error)
- **Scratchpad empty** → navigates to parent page
- **Double-CLR** (within 1 second) → emergency exit to home page

### SLEW Keys (Left/Right arrows)

Circular navigation through sibling pages (pages with the same parent).

### Function Keys

11 configurable function keys (MENU, INIT, DIR, FPLN, PERF, PROG, SEC, ATC, AIRPORT, DATA, RAD NAV). Each can be mapped to:
- `navigateHome` — go to home page
- `navigateTo` — go to a specific page
- Disabled — no action

PREV PAGE / NEXT PAGE handle pagination (built-in, not configurable).

## Colors

Available display colors: `white`, `green`, `cyan`, `blue`, `amber`, `red`, `magenta`, `yellow`, `grey`

Note: `blue` and `cyan` render identically on WinWing hardware.

### Color Fields

Each display config has two independent color fields:

| Field | Controls | Default |
|-------|----------|---------|
| `colLabel` | Sub-label text on even rows | Device `defaultColor` |
| `colData` | Data/value text on odd rows | Device `defaultColor` |

The old single `color` field is no longer supported. Configs using `color` must be updated to use `colLabel`/`colData`.

### Page-Level Color

| Field | Controls | Default |
|-------|----------|---------|
| `pageNameColor` | Page name in status bar (row 1) | Device `defaultColor` |

### Device Default Color

The `defaultColor` is configured per-device in the Device tab of the Admin UI. It serves as the fallback for all color fields that are not explicitly set. Also exposed as a writable device state at `devices.{deviceId}.config.defaultColor`.

## Page Example (Current Format)

```json
{
  "id": "klima-wohnzimmer",
  "name": "Wohnzimmer",
  "parent": "klima-main",
  "layoutType": "data",
  "pageNameColor": "cyan",
  "lines": [
    {
      "row": 3,
      "left": {
        "label": "IST-TEMPERATUR",
        "display": { "type": "datapoint", "source": "hm-rpc.0.T1.TEMPERATURE", "colLabel": "cyan", "colData": "green" },
        "button": { "type": "empty" }
      },
      "right": {
        "label": "SOLLWERT",
        "display": { "type": "datapoint", "source": "hm-rpc.0.T1.SET_TEMPERATURE", "colLabel": "cyan", "colData": "amber" },
        "button": { "type": "empty" }
      }
    },
    {
      "row": 5,
      "left": {
        "label": "LUFTFEUCHTE",
        "display": { "type": "datapoint", "source": "hm-rpc.0.H1.HUMIDITY", "colLabel": "cyan", "colData": "white" },
        "button": { "type": "empty" }
      },
      "right": {
        "label": "",
        "display": { "type": "empty" },
        "button": { "type": "empty" }
      }
    },
    {
      "row": 7,
      "left": {
        "label": "",
        "display": { "type": "label", "text": "LICHT KUECHE" },
        "button": { "type": "empty" }
      },
      "right": {
        "label": "",
        "display": { "type": "datapoint", "source": "hm-rpc.0.L1.STATE" },
        "button": { "type": "empty" }
      }
    }
  ]
}
```

In this example:
- Row 3 left: shows current temperature (read-only sensor → LSK does nothing)
- Row 3 right: shows setpoint (writable number → type value in scratchpad, press LSK to write)
- Row 7 right: shows light state (writable boolean → press LSK to toggle)

Format and unit are auto-detected from ioBroker object metadata. You only need to set `source`.

## Test Data

Use the "Create Sample Data" button in the Admin UI (Advanced tab) to create test states under `0_userdata.0.mcdu_test`. This creates:

| State | Type | Writable | Min/Max |
|-------|------|----------|---------|
| `temperature_living` | number | no | — |
| `light_kitchen` | boolean | yes | — |
| `light_living_dimmer` | number | yes | 0-100 |
| `setpoint_living` | number | yes | 5-30 |
| `setpoint_bedroom` | number | yes | 5-30 |
| `text_status` | string | yes | — |
| `window_bedroom` | boolean | no | — |

Use these to test LSK interactions:
- LSK on `light_kitchen` → toggles boolean
- Type "22" + LSK on `setpoint_living` → writes 22.0
- Type "999" + LSK on `setpoint_living` → "ENTRY OUT OF RANGE"
- LSK on `temperature_living` → nothing (read-only)

## BRT/DIM Brightness Control

The BRT and DIM buttons on the MCDU adjust display brightness:

- **BRT** increases both BACKLIGHT and SCREEN_BACKLIGHT by the configured step
- **DIM** decreases both BACKLIGHT and SCREEN_BACKLIGHT by the configured step
- Values are clamped to the 0-255 range
- The step size is configurable per-device via `display.brightnessStep` (default: 20)
- The step can be changed in the Admin UI (Device tab) or via the writable state `devices.{deviceId}.display.brightnessStep`

## Tips

1. **Start simple** — begin with label pages, then add datapoints
2. **Use parent navigation** — set `parent` for automatic breadcrumb and CLR-back
3. **Odd rows only** — use rows 3, 5, 7, 9, 11 for main content (even rows are sub-labels)
4. **ASCII only** — the hardware display cannot render umlauts or special characters. Use "KUECHE" not "Kuche", "ZURUECK" not "Zuruck". The adapter sanitizes automatically but it's cleaner to use ASCII in your config.
5. **No `editable` flag needed** — the adapter reads writability from ioBroker object metadata automatically
6. **format/unit auto-detection** — if you don't specify `format` or `unit`, they're read from the ioBroker object