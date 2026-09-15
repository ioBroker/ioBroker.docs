---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
---
# MCDU Smart Home Controller - References & Resources

**Last Updated:** 2026-02-14  
**Purpose:** Comprehensive list of useful links, documentation, and resources for the project

---

## Table of Contents

1. [WinWing MCDU Resources](#winwing-mcdu-resources)
2. [ioBroker Documentation](#iobroker-documentation)
3. [USB HID Communication](#usb-hid-communication)
4. [Node.js Libraries](#nodejs-libraries)
5. [Python Libraries](#python-libraries)
6. [Configuration & Tooling](#configuration--tooling)
7. [Community & Support](#community--support)
8. [Related Projects](#related-projects)

---

## WinWing MCDU Resources

### Official Product

| Resource | URL | Description |
|----------|-----|-------------|
| **WinWing MCDU Product Page** | https://ea.winctrl.com/view/goods-details.html?id=945 | Official product page with specs and photos |
| **WinWing Official Store** | https://ea.winctrl.com/ | Main WinWing store (flight sim hardware) |
| **SimAppPro Software** | Bundled with MCDU | Configuration utility for button mapping and modes |

### Reverse Engineering & Community

| Resource | URL | Description |
|----------|-----|-------------|
| **⭐ WinWing MCDU Reverse Engineering** | https://github.com/alha847/winwing_mcdu | Primary resource - USB protocol documentation and Python examples |
| **Example Lua Script** | https://github.com/alha847/winwing_mcdu/blob/main/lra333_winwing_mcdu_driver.lua | X-Plane integration example |
| **Python Test Scripts** | https://github.com/alha847/winwing_mcdu/tree/main | `mcdu_set_text_test3.py` and other examples |
| **Display Example Image** | https://github.com/alha847/winwing_mcdu/blob/main/example_set_text_test3.png | Shows rendered text on MCDU display |

### USB Protocol Documentation (from repo)

| Topic | Reference |
|-------|-----------|
| Button mapping | See "Buttons" section in repo README |
| Display text protocol | See "Write text to display" section |
| LED control | See "LEDs" section |
| Brightness control | See "Set display brightness" / "Set button backlight brightness" |
| Light sensors | See "Light sensors" section |

---

## ioBroker Documentation

### Official Resources

| Resource | URL | Description |
|----------|-----|-------------|
| **ioBroker Homepage** | https://www.iobroker.net/ | Official project homepage |
| **ioBroker Documentation** | https://www.iobroker.net/docu/ | Official documentation hub |
| **ioBroker GitHub Organization** | https://github.com/ioBroker | All official adapters and tools |
| **ioBroker Forum** | https://forum.iobroker.net/ | Community support forum (German/English) |
| **ioBroker Discord** | https://discord.gg/vmEfUAQ | Real-time community chat |

### API & Integration

| Resource | URL | Description |
|----------|-----|-------------|
| **Simple API Adapter** | https://github.com/ioBroker/ioBroker.simple-api | REST API for state access (GET/POST) |
| **REST API Adapter** | https://github.com/ioBroker/ioBroker.rest-api | Newer REST API with Swagger UI |
| **Socket.io Adapter** | https://github.com/ioBroker/ioBroker.socketio | WebSocket adapter for real-time communication |
| **Socket Client Library** | https://github.com/ioBroker/socket-client | Official WebSocket client library (Node.js) |
| **Socket Classes (API Docs)** | https://github.com/ioBroker/socket-classes | Documentation for WebSocket methods |

### Adapter Development

| Resource | URL | Description |
|----------|-----|-------------|
| **Create Adapter Tool** | https://github.com/ioBroker/create-adapter | CLI tool to scaffold new adapter |
| **Adapter Example Templates** | https://github.com/ioBroker/ioBroker.example | Example adapters (JavaScript/TypeScript) |
| **Adapter Development Guide** | https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md | Official adapter development documentation |
| **ioBroker Type Definitions** | https://github.com/ioBroker/adapter-core | TypeScript types for adapters |
| **Adapter Testing Framework** | https://github.com/ioBroker/testing | Testing utilities for adapters |

### State & Object Schema

| Resource | URL | Description |
|----------|-----|-------------|
| **Object Schema Documentation** | https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md | Structure of objects and states |
| **State Roles** | https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/stateroles.md | Standard state roles (e.g., `switch`, `level.temperature`) |

---

## USB HID Communication

### Protocol & Standards

| Resource | URL | Description |
|----------|-----|-------------|
| **USB HID Specification** | https://www.usb.org/hid | Official USB HID documentation |
| **HID Usage Tables** | https://usb.org/sites/default/files/hut1_22.pdf | Standard HID usage codes (PDF) |
| **Wikipedia: USB HID** | https://en.wikipedia.org/wiki/USB_human_interface_device_class | Overview of HID device class |

### Tools

| Tool | Platform | Description |
|------|----------|-------------|
| **Wireshark** | Windows/macOS/Linux | USB packet capture and analysis |
| **USB Prober** | macOS | Inspect USB device descriptors |
| **lsusb** | Linux | List USB devices and details |
| **usbview** | Linux | GUI for USB device inspection |

---

## Node.js Libraries

### USB Communication

| Package | npm | GitHub | Description |
|---------|-----|--------|-------------|
| **node-hid** | https://www.npmjs.com/package/node-hid | https://github.com/node-hid/node-hid | Cross-platform HID library (uses HIDAPI) |
| **usb (libusb)** | https://www.npmjs.com/package/usb | https://github.com/node-usb/node-usb | Low-level USB access (libusb bindings) |
| **node-hid-stream** | https://www.npmjs.com/package/node-hid-stream | https://github.com/konsumer/node-hid-stream | Stream-based wrapper for node-hid |

**Recommendation:** Use `node-hid` for this project (HID abstraction is sufficient)

### ioBroker Integration

| Package | npm | GitHub | Description |
|---------|-----|--------|-------------|
| **@iobroker/socket-client** | https://www.npmjs.com/package/@iobroker/socket-client | https://github.com/ioBroker/socket-client | Official WebSocket client for ioBroker |
| **axios** | https://www.npmjs.com/package/axios | https://github.com/axios/axios | HTTP client (for REST API fallback) |

### Configuration & Utilities

| Package | npm | Purpose |
|---------|-----|---------|
| **yaml** | https://www.npmjs.com/package/yaml | YAML parsing and serialization |
| **joi** | https://www.npmjs.com/package/joi | Schema validation for config files |
| **dotenv** | https://www.npmjs.com/package/dotenv | Load environment variables from `.env` |
| **winston** | https://www.npmjs.com/package/winston | Logging library |
| **eventemitter3** | https://www.npmjs.com/package/eventemitter3 | Fast event emitter |

### Development Tools

| Package | npm | Purpose |
|---------|-----|---------|
| **typescript** | https://www.npmjs.com/package/typescript | TypeScript compiler |
| **@types/node** | https://www.npmjs.com/package/@types/node | Node.js type definitions |
| **nodemon** | https://www.npmjs.com/package/nodemon | Auto-restart on file changes |
| **eslint** | https://www.npmjs.com/package/eslint | Code linter |
| **prettier** | https://www.npmjs.com/package/prettier | Code formatter |
| **jest** | https://www.npmjs.com/package/jest | Testing framework |

---

## Python Libraries

### USB Communication

| Package | PyPI | GitHub/Docs | Description |
|---------|------|-------------|-------------|
| **hidapi** | https://pypi.org/project/hidapi/ | https://github.com/libusb/hidapi | Cross-platform HID library |
| **pyusb** | https://pypi.org/project/pyusb/ | https://github.com/pyusb/pyusb | Python bindings for libusb |
| **hid** | https://pypi.org/project/hid/ | https://github.com/apmorton/pyhidapi | Alternative HID library |

**Recommendation:** Use `hidapi` (same as WinWing MCDU repo examples)

### HTTP Requests

| Package | PyPI | Purpose |
|---------|------|---------|
| **requests** | https://pypi.org/project/requests/ | HTTP client for REST API calls |
| **aiohttp** | https://pypi.org/project/aiohttp/ | Async HTTP client (for WebSocket) |

### Configuration

| Package | PyPI | Purpose |
|---------|------|---------|
| **PyYAML** | https://pypi.org/project/PyYAML/ | YAML parsing |
| **python-dotenv** | https://pypi.org/project/python-dotenv/ | Load `.env` files |

---

## Configuration & Tooling

### Linux USB Permissions

**udev Rules Documentation:**  
https://www.freedesktop.org/software/systemd/man/udev.html

**Example udev rule for WinWing MCDU:**
```bash
# /etc/udev/rules.d/99-winwing-mcdu.rules
SUBSYSTEM=="usb", ATTRS{idVendor}=="4098", ATTRS{idProduct}=="bb36", MODE="0666", GROUP="plugdev"
```

**Apply changes:**
```bash
sudo udevadm control --reload-rules
sudo udevadm trigger
```

### Systemd Service

**Systemd Documentation:**  
https://www.freedesktop.org/software/systemd/man/systemd.service.html

**Example service file:** See ARCHITECTURE.md

### macOS USB Permissions

**IOKit Framework:**  
https://developer.apple.com/documentation/iokit

**Note:** macOS may require running with `sudo` or signing with proper entitlements for HID access.

---

## Community & Support

### Forums & Discussions

| Platform | URL | Language |
|----------|-----|----------|
| **ioBroker Forum** | https://forum.iobroker.net/ | German/English |
| **ioBroker Discord** | https://discord.gg/vmEfUAQ | Real-time chat |
| **Home Assistant Community** | https://community.home-assistant.io/ | General smart home (for ideas) |
| **Reddit: r/ioBroker** | https://www.reddit.com/r/iobroker/ | Reddit community |
| **Reddit: r/homeautomation** | https://www.reddit.com/r/homeautomation/ | General home automation |

### YouTube Channels

| Channel | URL | Focus |
|---------|-----|-------|
| **verdrahtet** | https://www.youtube.com/@verdrahtet | ioBroker tutorials (German) |
| **haus-automatisierung.com** | https://www.youtube.com/@haus-automatisierung | Smart home tutorials (German) |

---

## Related Projects

### Similar Projects (MCDU in Other Contexts)

| Project | URL | Description |
|---------|-----|-------------|
| **FlyByWire A32NX MCDU** | https://github.com/flybywiresim/a32nx | Airbus A320 MCDU simulation (web-based) |
| **MSFS 2020 MCDU** | Various forum threads | Flight sim MCDU implementations |

### Smart Home Dashboard Alternatives

| Project | URL | Description |
|---------|-----|-------------|
| **ioBroker VIS** | https://github.com/ioBroker/ioBroker.vis | Web-based visualization adapter |
| **Home Assistant** | https://www.home-assistant.io/ | Alternative smart home platform |
| **Node-RED Dashboard** | https://flows.nodered.org/node/node-red-dashboard | Flow-based dashboard |
| **Grafana** | https://grafana.com/ | Data visualization (works with ioBroker) |

### Hardware Control Panels

| Product | URL | Use Case |
|---------|-----|----------|
| **Stream Deck** | https://www.elgato.com/us/en/p/stream-deck-mk2-black | Programmable button panel with LCD |
| **Loupedeck** | https://loupedeck.com/ | Custom control surface |
| **Elgato Key Light** | Various integrations | Smart home control examples |

---

## Tutorials & Guides

### USB HID Programming

| Resource | URL | Language |
|----------|-----|----------|
| **Python HID Tutorial** | https://www.ontrak.net/pythonhidapi.htm | Python with hidapi |
| **Node.js HID Tutorial** | https://itp.nyu.edu/physcomp/labs/lab-serial-input-to-an-web-page/ | Node.js serial/HID basics |
| **PyUSB Tutorial** | https://github.com/pyusb/pyusb/blob/master/docs/tutorial.rst | PyUSB usage guide |

### ioBroker Integration

| Resource | URL | Description |
|----------|-----|-------------|
| **ioBroker Adapter Development (YouTube)** | Search "ioBroker adapter development" | Video tutorials |
| **Simple API Examples** | https://github.com/ioBroker/ioBroker.simple-api#usage | REST API usage examples |
| **Socket.io Client Examples** | https://github.com/ioBroker/socket-client#usage | WebSocket examples |

### Smart Home Best Practices

| Resource | URL | Topic |
|----------|-----|-------|
| **Home Assistant Architecture** | https://www.home-assistant.io/blog/2016/01/19/perfect-home-automation/ | General architecture principles |
| **ioBroker Best Practices** | https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/admin/objects.md | Object naming conventions |

---

## Tools & Software

### Development Environment

| Tool | URL | Purpose |
|------|-----|---------|
| **VS Code** | https://code.visualstudio.com/ | Code editor (recommended) |
| **Node Version Manager (nvm)** | https://github.com/nvm-sh/nvm | Manage Node.js versions |
| **Postman** | https://www.postman.com/ | Test REST APIs |
| **Insomnia** | https://insomnia.rest/ | Alternative REST client |
| **WebSocket King** | https://websocketking.com/ | WebSocket testing tool |

### Debugging & Monitoring

| Tool | URL | Purpose |
|------|-----|---------|
| **Wireshark** | https://www.wireshark.org/ | Network packet capture |
| **USB Analyzer** | Various vendors | Hardware USB traffic analysis |
| **journalctl** | Built into systemd | View systemd service logs |

---

## Sample Code & Snippets

### Quick Start Examples

**Python: Read MCDU Button**
```python
import hid

# Open MCDU device
device = hid.device()
device.open(0x4098, 0xbb36)  # Vendor ID, Product ID

# Read button data
while True:
    data = device.read(64)
    if data[1] != 0:  # Button pressed
        print(f"Button byte 2: {data[1]:08b}")

device.close()
```

**Node.js: Read MCDU Button**
```javascript
const HID = require('node-hid');

const device = new HID.HID(0x4098, 0xbb36);

device.on('data', (data) => {
  if (data[1] !== 0) {
    console.log(`Button byte 2: ${data[1].toString(2).padStart(8, '0')}`);
  }
});
```

**ioBroker REST API: Read State**
```bash
curl "http://iobroker-host:8087/getPlainValue/weather.0.current.temperature"
# Output: 22.5
```

**ioBroker REST API: Set State**
```bash
curl "http://iobroker-host:8087/set/lights.living.STATE?value=1&ack=false"
# Output: {"id":"lights.living.STATE","value":1}
```

**Node.js: ioBroker WebSocket Subscribe**
```javascript
const { SocketClient } = require('@iobroker/socket-client');

const socket = new SocketClient('http://iobroker-host:8082');

await socket.connect();
await socket.subscribe('washing.0.status');

socket.on('stateChange', (id, state) => {
  console.log(`${id} changed to ${state.val}`);
});
```

---

## Documentation Standards

### README Template

When creating project documentation, follow this structure:

```markdown
# Project Name

## Overview
Brief description

## Hardware Requirements
- WinWing MCDU
- ioBroker instance

## Installation
Step-by-step guide

## Configuration
Config file examples

## Usage
How to use

## Troubleshooting
Common issues

## Contributing
How to contribute

## License
License info
```

### Commit Message Conventions

**Recommended:** Conventional Commits (https://www.conventionalcommits.org/)

Examples:
- `feat: add climate control page`
- `fix: handle USB reconnection`
- `docs: update installation guide`
- `refactor: extract display rendering logic`
- `test: add unit tests for button mapping`

---

## Learning Resources

### USB & HID

| Resource | URL | Level |
|----------|-----|-------|
| **USB Made Simple** | https://www.usbmadesimple.co.uk/ | Beginner |
| **USB in a NutShell** | https://www.beyondlogic.org/usbnutshell/usb1.shtml | Intermediate |

### Node.js

| Resource | URL | Level |
|----------|-----|-------|
| **Node.js Official Docs** | https://nodejs.org/docs/ | All levels |
| **Node.js Best Practices** | https://github.com/goldbergyoni/nodebestpractices | Intermediate/Advanced |
| **TypeScript Handbook** | https://www.typescriptlang.org/docs/handbook/intro.html | Beginner to Advanced |

### Smart Home Architecture

| Resource | URL | Focus |
|----------|-----|-------|
| **MQTT Essentials** | https://www.hivemq.com/mqtt-essentials/ | Messaging protocol |
| **Event-Driven Architecture** | https://martinfowler.com/articles/201701-event-driven.html | Architecture patterns |

---

## Frequently Asked Questions (FAQ)

### USB Communication

**Q: Why does my script require `sudo` to access the MCDU on Linux?**  
A: USB devices require appropriate permissions. Create a udev rule (see "Linux USB Permissions" section above).

**Q: The MCDU isn't detected. How do I verify the USB connection?**  
A: Run `lsusb` (Linux), `system_profiler SPUSBDataType` (macOS), or Device Manager (Windows) to check if vendor ID `0x4098` is present.

**Q: Can I use the MCDU on Windows?**  
A: Yes! `node-hid` and `hidapi` both support Windows. You may need to install libusb drivers (use Zadig: https://zadig.akeo.ie/).

### ioBroker Integration

**Q: Should I use REST API or WebSocket?**  
A: **WebSocket** for production (real-time updates). **REST API** for quick prototyping.

**Q: How do I find the correct state ID in ioBroker?**  
A: Use the ioBroker admin UI → Objects tab → search for your device. State IDs follow the format `adapter.instance.device.channel.state`.

**Q: What's the difference between `ack=true` and `ack=false`?**  
A: `ack=false` = command (you want to change something). `ack=true` = confirmation (device reports actual state).

### Development

**Q: Should I use Python or Node.js?**  
A: **Python** for quick prototyping. **Node.js** for production (better ioBroker integration).

**Q: Do I need TypeScript?**  
A: No, but recommended for larger projects (type safety helps prevent bugs).

**Q: Can I hot-reload the config without restarting?**  
A: Yes, implement file watching with `fs.watch()` (Node.js) or `watchdog` (Python).

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2026-02-14 | 1.0 | Initial comprehensive reference document |

---

## Contributing to This Document

**Found a broken link or want to add a resource?**

1. Open an issue in the project repository
2. Submit a pull request with updates
3. Suggest additions via the project forum/Discord

**Criteria for adding resources:**
- ✅ Directly relevant to MCDU hardware, ioBroker, or USB HID
- ✅ Authoritative source (official docs, well-maintained repos)
- ✅ Publicly accessible (no paywalls)
- ✅ Up-to-date (checked within last 2 years)

---

**Document Status:** Complete  
**Last Updated:** 2026-02-14  
**Maintainer:** Project contributors  
**Related Documents:**
- RESEARCH.md (technical findings)
- ARCHITECTURE.md (system design)
- PROJECT.md (project overview)