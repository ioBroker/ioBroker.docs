---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
---
# Getting Started with ioBroker.mcdu

This guide walks you through installing and connecting both components of the MCDU smart home system.

## Architecture Overview

```
┌──────────────────┐        MQTT        ┌──────────────────┐       USB HID      ┌──────────────┐
│   ioBroker       │ <────────────────> │   mcdu-client    │ <────────────────> │  MCDU-32-    │
│   Adapter        │                    │   (Raspberry Pi) │                    │  CAPTAIN     │
│   (iobroker.mcdu)│                    │                  │                    │  (Hardware)  │
└──────────────────┘                    └──────────────────┘                    └──────────────┘
         │                                       │
         │  Runs on your ioBroker server         │  Runs on a Raspberry Pi
         │  Handles pages, rendering, logic      │  USB HID ↔ MQTT bridge (no logic)
```

**Two components to install:**

1. **ioBroker Adapter** (`iobroker.mcdu`) -- runs on your ioBroker server, handles page rendering, navigation, and automation states
2. **MCDU Client** (`mcdu-client`) -- runs on a Raspberry Pi with the MCDU plugged in via USB, bridges USB HID to MQTT

Both communicate over MQTT. You need a running MQTT broker (e.g., Mosquitto) accessible to both.

## Prerequisites

- A running **ioBroker** installation
- An **MQTT broker** (e.g., Mosquitto) reachable by both ioBroker and the Pi
- A **Raspberry Pi 4** (or 3B+) with Pi OS Lite 64-bit and the WinWing MCDU-32-CAPTAIN connected via USB
- **Node.js 18+** on the Pi

---

## 1. Install the ioBroker Adapter

### Option A: Via Admin UI (from npm)

1. Open the ioBroker Admin UI
2. Go to the **Adapters** tab
3. Search for **mcdu**
4. Click **Install**
5. An instance `mcdu.0` is created automatically

This is the recommended method for stable releases.

### Option B: Via Admin UI (from GitHub)

Use this for pre-release or development versions:

1. Open the ioBroker Admin UI
2. Go to the **Adapters** tab
3. Click the **GitHub/Octocat icon** (top left)
4. Switch to the **Custom** tab
5. Paste the repository URL:
   ```
   https://github.com/Flixhummel/ioBroker.mcdu
   ```
6. Click **Install**

### Option C: Via CLI

```bash
cd /opt/iobroker
iobroker add mcdu
```

Or install from npm first, then add:

```bash
npm install iobroker.mcdu
iobroker add mcdu
```

### Configure the Adapter

1. Open the Admin UI and go to **Instances**
2. Click the wrench icon on `mcdu.0`
3. Configure at minimum:
   - **MQTT Broker Address** -- IP/hostname of your MQTT broker (e.g., `localhost`)
   - **MQTT Port** -- default `1883`
4. Save and close -- the adapter will start and connect to MQTT

The Admin UI has four configuration tabs:

- **General Settings** -- MQTT broker address, performance tuning
- **Device & Pages** -- per-device page configuration, default color, brightness step
- **Function Keys** -- map 11 function keys to page navigation
- **Advanced & About** -- debug logging, version info

---

## 2. Install the MCDU Client (Raspberry Pi)

The mcdu-client is the USB HID bridge that runs on the Pi next to the physical MCDU hardware.

> For the full step-by-step guide with troubleshooting, see [`mcdu-client/GETTING-STARTED.md`](/#/docs/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md).

### Install Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
sudo apt-get install -y nodejs
node --version   # Should show v20.x
```

### Clone and install

```bash
cd ~
git clone https://github.com/Flixhummel/ioBroker.mcdu.git
cd ioBroker.mcdu/mcdu-client
./install.sh
```

The install script will:
- Run `npm install` (prebuilt binaries for node-hid, no compiler needed)
- Create `config.env` from template
- Install a udev rule for hidraw USB access
- Optionally install a systemd service

### Configure

```bash
nano config.env
```

Set at minimum:

```bash
MQTT_BROKER=mqtt://YOUR_BROKER_IP:1883
MQTT_TOPIC_PREFIX=mcdu
```

### Test run

```bash
node mcdu-client.js
```

You should see the client connect to MQTT and render the display. Press `Ctrl+C` to stop.

### Start as service

```bash
sudo systemctl start mcdu-client
sudo journalctl -u mcdu-client -f
```

### Updating

```bash
cd ~/ioBroker.mcdu/mcdu-client
git pull
npm install
sudo systemctl restart mcdu-client
```

---

## 3. Verify End-to-End

Once both components are running:

1. **Check adapter connection** in ioBroker:
   - In the Admin UI, go to **Objects**
   - Navigate to `mcdu.0.info.connection` -- should be `true`

2. **Check mcdu-client logs:**
   ```bash
   journalctl -u mcdu-client -f
   ```

3. **Press a button on the MCDU:**
   - You should see a button event in the mcdu-client logs
   - In ioBroker, the corresponding button state under `mcdu.0.devices.{deviceId}.buttons.*` should update

4. **Check the display:**
   - The MCDU display should show the configured home page with status bar and content

If something isn't working, check:
- MQTT broker is reachable from both ioBroker and the Pi
- Topic prefix matches in both adapter config and `config.env`
- The MCDU is detected via USB: `lsusb | grep 4098` (should show `ID 4098:bb36`)

---

## Further Reading

- [Page Configuration Guide](/#/docs/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md) -- how to set up pages and navigation
- [Automation Quickstart](/#/docs/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md) -- scripting with 32 automation states
- [Architecture](/#/docs/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md) -- system design
- [UX Concept](/#/docs/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md) -- cockpit UX patterns
- [mcdu-client README](/#/docs/adapterref/iobroker.mcdu/mcdu-client/README.md) -- MQTT topics, display protocol, troubleshooting
- [ioBroker adapter development docs](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md)