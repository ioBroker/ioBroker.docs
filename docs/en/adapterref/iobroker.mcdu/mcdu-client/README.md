---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
---
# MCDU MQTT Client

Hardware bridge between WINWING MCDU-32-CAPTAIN and MQTT broker. Acts as a "dumb terminal" — no business logic, just USB HID <-> MQTT.

## Architecture

```
┌─────────────────┐      MQTT       ┌──────────────────┐      USB HID     ┌──────────────┐
│   ioBroker      │ <─────────────> │  mcdu-client.js  │ <──────────────> │  MCDU-32-    │
│   Adapter       │                 │                  │                  │  CAPTAIN     │
└─────────────────┘                 └──────────────────┘                  └──────────────┘
```

## Hardware Support

Uses `node-hid` for USB HID communication on all platforms:

- **macOS**: IOHIDManager backend (control transfers via IOHIDManager)
- **Linux/Raspberry Pi**: hidraw backend (kernel sends SET_REPORT control transfers)

> The WinWing firmware requires SET_REPORT control transfers. The hidraw kernel backend handles this automatically — no special configuration needed.

## Quick Start

### macOS (development)

```bash
cd mcdu-client
npm install
node mcdu-client.js
```

### Raspberry Pi (production)

See [GETTING-STARTED.md](/#/docs/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md) for full setup instructions.

## Configuration

Edit `config.env`:

```bash
MQTT_BROKER=mqtt://YOUR_BROKER_IP:1883   # MQTT broker address
MQTT_TOPIC_PREFIX=mcdu                    # Topic prefix (default: mcdu)
MQTT_CLIENT_ID=mcdu-client-mac           # Client ID (auto-derived from hostname if blank)
```

## Display Protocol (WinWing Firmware)

### Critical constraints

1. **One-shot init**: The firmware only accepts `0xf0` init packets **once per USB power cycle**. After a software close/reopen the init is silently ignored. Open the device once and never close it.

2. **40ms between display packets**: The firmware needs 40ms between consecutive `0xf2` display packets. Sending faster causes rendering to be unreliable or silently dropped.

3. **ASCII only**: All character bytes sent to the display MUST be <= 0x7F. The firmware silently drops the entire display frame if any byte > 0x7F is encountered — with no error, no acknowledgement, display just freezes. This is handled in two layers:
   - **Adapter** (`lib/rendering/PageRenderer.sanitizeAscii()`): sanitizes status bar / breadcrumb text
   - **Client** (`lib/mcdu.js sanitizeAscii()`): sanitizes all line content in `setLine()` and `_setLineSegments()`

4. **LEDs after display**: Always write LED state after the display update, not before.

### Startup sequence

```
1. Open HID device once
2. initDisplay()       — 17 x 0xf0 packets, 10ms between each
3. wait 200ms          — firmware settle
4. clear()             — 16 x 0xf2 WHITE+spaces -> WinWing logo disappears
5. Connect MQTT        — in parallel with settle wait
6. wait ~3s total      — firmware fully settled
7. Receive display/set -> updateDisplay() -> setAllLEDs()
```

## MQTT Topics

All topics are prefixed with `{MQTT_TOPIC_PREFIX}/{deviceId}/`.

### Client receives (adapter -> client)

| Topic | Purpose |
|-------|---------|
| `display/set` | Full display update (14 lines, retained) |
| `display/line` | Single line update |
| `leds/set` | Set all LEDs |
| `leds/single` | Set single LED |
| `status/ping` | Health check request |

### Client publishes (client -> adapter)

| Topic | Purpose |
|-------|---------|
| `buttons/event` | Button press events |
| `status/online` | Online announcement (LWT) |
| `status/pong` | Health check response |

## Troubleshooting

### Display stuck on WinWing boot screen after software restart

The firmware ignores init packets after the first USB power cycle. **Physical unplug/replug required** to reset firmware state. This is by design — the client is meant to run as a persistent service that opens the device once.

### Display freezes when navigating pages

The WinWing firmware silently drops the entire display frame when any character byte > 0x7F is encountered. The display stays frozen on the previous page with no error message.

Non-ASCII characters can appear in two places:
- **Status bar / breadcrumb**: page names like "Hauptmenu" — sanitized by `PageRenderer.sanitizeAscii()` in the adapter
- **Line content**: button labels like "Zuruck" — sanitized by `mcdu.sanitizeAscii()` in `setLine()` before writing

If display freezing recurs, look for `[DISPLAY] NON-ASCII char at line X col Y` in the client log — this means a character bypassed `setLine()` and will cause a frame drop.

### HID device not found (Linux)

```bash
# Check USB connection
lsusb | grep 4098

# Check hidraw device
ls -la /dev/hidraw*

# Check udev rule
cat /etc/udev/rules.d/99-winwing-mcdu.rules

# Check group membership
id -nG | grep plugdev
```

### MQTT connection refused

```bash
mosquitto_pub -h YOUR_BROKER_IP -t test -m "hello"
```

## File Structure

```
mcdu-client/
├── mcdu-client.js        # Main entry point
├── lib/
│   ├── mcdu.js           # USB HID driver (node-hid, all platforms)
│   └── button-map.json   # Button ID -> name mapping
├── config.env            # Local config (gitignored on Pi)
├── config.env.template   # Config template
├── install.sh            # Pi setup script
└── mcdu-client.service   # systemd service file
```

## License

MIT — Felix Hummel