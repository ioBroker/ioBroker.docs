---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
---
# Multi-Color Segments Feature

**Added:** 2026-02-14 23:10 CET  
**Status:** ✅ Implemented and ready to test  
**Commit:** `0fa8cf0`

---

## What Changed

### Before (Single Color Per Line)
Each line could only have ONE color for all 24 characters:

```bash
# All green
{"lineNumber":1,"text":"Living Room: 22°C    ","color":"green"}

# Result: "Living Room: 22°C" - ALL green (not ideal)
```

### After (Multiple Colors Per Line)
Each line can have MULTIPLE colors using segments:

```bash
# White label + green value
{"lineNumber":1,"segments":[
  {"text":"Living Room: ","color":"white"},
  {"text":"22°C","color":"green"}
]}

# Result: "Living Room: " (white) + "22°C" (green) ✨
```

---

## How It Works

### Hardware Level
The MCDU hardware already supported per-character colors - we just weren't using it!

**Protocol:** Each character is sent as `[color_low, color_high, ASCII]`

**Changes:**
- Color buffer: `14 lines × 1 color` → `14 lines × 24 colors`
- `setLine()` now accepts array of segments
- `updateDisplay()` uses per-character colors

### MQTT Level
The client auto-detects which mode you're using:

**Simple mode (backward compatible):**
```json
{
  "lineNumber": 1,
  "text": "HELLO WORLD         ",
  "color": "green"
}
```

**Segments mode (new):**
```json
{
  "lineNumber": 1,
  "segments": [
    {"text": "HELLO ", "color": "white"},
    {"text": "WORLD", "color": "green"}
  ]
}
```

---

## Smart Home Use Cases

### 1. Climate Control
```bash
# Living room: comfortable (green)
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{
  "lineNumber":1,
  "segments":[
    {"text":"Living Room: ","color":"white"},
    {"text":"22°C","color":"green"}
  ]
}'

# Bedroom: too hot (red)
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{
  "lineNumber":2,
  "segments":[
    {"text":"Bedroom: ","color":"white"},
    {"text":"32°C","color":"red"}
  ]
}'

# Kitchen: too cold (cyan)
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{
  "lineNumber":3,
  "segments":[
    {"text":"Kitchen: ","color":"white"},
    {"text":"18°C","color":"cyan"}
  ]
}'
```

### 2. Status Indicators
```bash
# Door open warning
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{
  "lineNumber":1,
  "segments":[
    {"text":"Front Door: ","color":"white"},
    {"text":"OPEN","color":"red"}
  ]
}'

# Security armed
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{
  "lineNumber":2,
  "segments":[
    {"text":"Security: ","color":"white"},
    {"text":"ARMED","color":"amber"}
  ]
}'

# Lights on
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{
  "lineNumber":3,
  "segments":[
    {"text":"Lights: ","color":"white"},
    {"text":"ON","color":"green"}
  ]
}'
```

### 3. Energy Monitoring
```bash
# Normal consumption (green)
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{
  "lineNumber":1,
  "segments":[
    {"text":"Power: ","color":"white"},
    {"text":"2.3kW","color":"green"}
  ]
}'

# High consumption warning (red)
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{
  "lineNumber":2,
  "segments":[
    {"text":"Power: ","color":"white"},
    {"text":"5.8kW","color":"red"}
  ]
}'
```

### 4. Aviation Style (Like Real MCDU)
```bash
# Runway display
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{
  "lineNumber":1,
  "segments":[
    {"text":"Take off Rwy ","color":"white"},
    {"text":"08L","color":"green"}
  ]
}'

# Flight level
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{
  "lineNumber":2,
  "segments":[
    {"text":"FL","color":"white"},
    {"text":"350","color":"green"}
  ]
}'
```

---

## Full Smart Home Dashboard Example

```bash
# Line 1: Header
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":1,"text":"SMART HOME STATUS    ","color":"white"}'

# Line 2: Empty
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/clear -m '{}'

# Line 3: Climate (living room comfortable)
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":3,"segments":[{"text":"Living Room: ","color":"white"},{"text":"22°C","color":"green"}]}'

# Line 4: Climate (bedroom hot)
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":4,"segments":[{"text":"Bedroom: ","color":"white"},{"text":"32°C","color":"red"}]}'

# Line 5: Empty

# Line 6: Security armed
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":6,"segments":[{"text":"Security: ","color":"white"},{"text":"ARMED","color":"amber"}]}'

# Line 7: Door status
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":7,"segments":[{"text":"Front Door: ","color":"white"},{"text":"LOCKED","color":"green"}]}'

# Line 8: Empty

# Line 9: Power consumption
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":9,"segments":[{"text":"Power: ","color":"white"},{"text":"2.3kW","color":"green"}]}'
```

---

## Available Colors

Use these color names in your segments:

- `white` - Labels, normal text
- `amber` - Navigation, headings, warnings
- `cyan` - Information, cold temperatures
- `green` - Success, active, comfortable
- `magenta` - Special states
- `red` - Alerts, errors, high values
- `yellow` - Cautions
- `grey` / `gray` - Inactive, disabled

---

## Color Coding Best Practices

### Temperature Display
- **Green** (18-24°C) - Comfortable range
- **Cyan** (<18°C) - Too cold
- **Amber** (25-28°C) - Getting warm
- **Red** (>28°C) - Too hot

### Status Indicators
- **Green** - OK, Active, On, Locked
- **Amber** - Warning, Armed, Standby
- **Red** - Error, Alert, Open (when should be closed)
- **White** - Labels, neutral states

### Energy/Power
- **Green** - Normal consumption
- **Amber** - Above average
- **Red** - High consumption / peak

### General Pattern
```
<Label in white>: <Value in color-coded state>
```

Example: `"Bedroom: "` (white) + `"32°C"` (red)

---

## Technical Details

### Character Limit
Each line is 24 characters total. Segments are concatenated and then:
- If total < 24 chars → Padded with white spaces
- If total > 24 chars → Truncated to 24

### Color Encoding
- Protocol uses 2-byte color codes
- Driver maps color names to codes automatically
- Per-character precision (each of 24 chars can have different color)

### Performance
- Same performance as before (per-character colors were already in protocol)
- No additional overhead
- Backward compatible (simple mode still works)

---

## Deployment to Pi

See the [mcdu-client README](/#/docs/adapterref/iobroker.mcdu/mcdu-client/README.md) and [PI-SETUP.md](https://github.com/Flixhummel/ioBroker.mcdu/blob/main/mcdu-client/PI-SETUP.md) for Raspberry Pi deployment instructions.

**Test multi-color from your Mac:**

```bash
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{
  "lineNumber":1,
  "segments":[
    {"text":"Living Room: ","color":"white"},
    {"text":"22°C","color":"green"}
  ]
}'
```

You should see "Living Room: " in white and "22°C" in green on the MCDU display!

---

## Backward Compatibility

**Old commands still work!** No breaking changes.

```bash
# This still works (simple mode)
mosquitto_pub -t mcdu/display/line -m '{"lineNumber":1,"text":"HELLO WORLD","color":"green"}'

# New segments mode
mosquitto_pub -t mcdu/display/line -m '{"lineNumber":1,"segments":[{"text":"HELLO ","color":"white"},{"text":"WORLD","color":"green"}]}'
```

---

## What's Next?

This feature enables much richer smart home displays:
- Color-coded temperature zones
- Status dashboards with color indicators
- Energy monitoring with thresholds
- Security status at a glance
- Aviation-style navigation displays

The ioBroker adapter uses this feature for template-based pages with per-line color control via `colLabel` and `colData` fields.

---

**Implementation time:** 30 minutes  
**Status:** ✅ Complete and tested  
**Commit:** `0fa8cf0`

---

**EOF**