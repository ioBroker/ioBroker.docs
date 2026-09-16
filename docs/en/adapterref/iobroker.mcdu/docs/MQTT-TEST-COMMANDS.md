---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
---
# MCDU MQTT Test Commands

**Connection details:**
- Broker: `YOUR_BROKER_IP:1883`
- Username: `iobroker`
- Password: (use your actual MQTT password)

Replace `[password]` in commands below with your MQTT password!

## 1. Turn on backlights (if screen is dark):

```bash
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/leds/set -m '{"leds":{"BACKLIGHT":true,"SCREEN_BACKLIGHT":true}}'
```

## 2. Send a display update:

### Simple mode (single color per line):
```bash
# Green text on line 1
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":1,"text":"HELLO FROM MAC!      ","color":"green"}'
```

### Segments mode (multiple colors per line):
```bash
# Living room temperature: "Living Room: " (white) + "22°C" (green)
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":1,"segments":[{"text":"Living Room: ","color":"white"},{"text":"22°C","color":"green"}]}'

# High temperature warning: "Bedroom: " (white) + "32°C" (red)
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":2,"segments":[{"text":"Bedroom: ","color":"white"},{"text":"32°C","color":"red"}]}'

# Aviation style: "Take off Rwy " (white) + "08L" (green)
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":3,"segments":[{"text":"Take off Rwy ","color":"white"},{"text":"08L","color":"green"}]}'

# Warning message: "WARNING: " (red) + "High Temp" (amber)
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":4,"segments":[{"text":"WARNING: ","color":"red"},{"text":"High Temp","color":"amber"}]}'
```

## 3. Turn on an LED:

```bash
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/leds/single -m '{"name":"RDY","state":true}'
```

## 4. Watch button events (press buttons on the MCDU):

```bash
mosquitto_sub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/buttons/event -v
```

---

## Backlight Control:

### Turn on both backlights (max brightness):
```bash
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/leds/set -m '{"leds":{"BACKLIGHT":true,"SCREEN_BACKLIGHT":true}}'
```

### Set screen backlight to full brightness (255):
```bash
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/leds/single -m '{"name":"SCREEN_BACKLIGHT","brightness":255}'
```

### Set screen backlight to 50% brightness (128):
```bash
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/leds/single -m '{"name":"SCREEN_BACKLIGHT","brightness":128}'
```

### Set both backlights with custom brightness:
```bash
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/leds/set -m '{"leds":{"BACKLIGHT":200,"SCREEN_BACKLIGHT":255}}'
```

### Turn on button backlight only:
```bash
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/leds/single -m '{"name":"BACKLIGHT","state":true}'
```

### Turn off backlights:
```bash
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/leds/set -m '{"leds":{"BACKLIGHT":false,"SCREEN_BACKLIGHT":false}}'
```

---

## Multi-Color Smart Home Examples:

### Climate Control Display
```bash
# Line 1: "Living Room: " (white) + "22°C" (green) - comfortable
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":1,"segments":[{"text":"Living Room: ","color":"white"},{"text":"22°C","color":"green"}]}'

# Line 2: "Bedroom: " (white) + "32°C" (red) - too hot
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":2,"segments":[{"text":"Bedroom: ","color":"white"},{"text":"32°C","color":"red"}]}'

# Line 3: "Kitchen: " (white) + "18°C" (cyan) - too cold
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":3,"segments":[{"text":"Kitchen: ","color":"white"},{"text":"18°C","color":"cyan"}]}'
```

### Status Display
```bash
# Line 1: "Lights: " (white) + "ON" (green)
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":1,"segments":[{"text":"Lights: ","color":"white"},{"text":"ON","color":"green"}]}'

# Line 2: "Security: " (white) + "ARMED" (amber)
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":2,"segments":[{"text":"Security: ","color":"white"},{"text":"ARMED","color":"amber"}]}'

# Line 3: "Door: " (white) + "OPEN" (red)
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":3,"segments":[{"text":"Door: ","color":"white"},{"text":"OPEN","color":"red"}]}'
```

### Energy Monitoring
```bash
# Power consumption with color-coded values
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":1,"segments":[{"text":"Power: ","color":"white"},{"text":"2.3kW","color":"green"}]}'

# High consumption warning
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":2,"segments":[{"text":"Power: ","color":"white"},{"text":"5.8kW","color":"red"}]}'
```

---

## More Examples:

### Full display update (all 14 lines):
```bash
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/set -m '{
  "lines": [
    {"text":"SMART HOME MCDU      ","color":"white"},
    {"text":"                     ","color":"white"},
    {"text":"<LIGHTS      STATUS> ","color":"amber"},
    {"text":"<CLIMATE       TEMP> ","color":"amber"},
    {"text":"<SECURITY     ALARM> ","color":"amber"},
    {"text":"                     ","color":"white"},
    {"text":"                     ","color":"white"},
    {"text":"                     ","color":"white"},
    {"text":"                     ","color":"white"},
    {"text":"                     ","color":"white"},
    {"text":"                     ","color":"white"},
    {"text":"                     ","color":"white"},
    {"text":"<PREV         NEXT>  ","color":"green"},
    {"text":"                     ","color":"white"}
  ]
}'
```

### Clear display:
```bash
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/clear -m '{}'
```

### Set multiple LEDs:
```bash
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/leds/set -m '{"leds":{"RDY":true,"FAIL":false,"MCDU":true,"BACKLIGHT":true,"SCREEN_BACKLIGHT":true}}'
```

### Health check (ping):
```bash
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/status/ping -m '{"requestId":"test-123"}'

# Listen for response:
mosquitto_sub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/status/pong -C 1 -v
```

---

## Available Colors:
- white
- amber
- cyan
- green
- magenta
- red
- yellow
- grey

## Available LEDs:
- FAIL
- FM
- MCDU
- MENU
- FM1
- IND
- RDY
- STATUS
- FM2
- BACKLIGHT
- SCREEN_BACKLIGHT