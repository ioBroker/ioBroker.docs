![Logo](admin/salus.png)
# ioBroker.salus

[![NPM version](https://img.shields.io/npm/v/iobroker.salus.svg)](https://www.npmjs.com/package/iobroker.salus)
[![Downloads](https://img.shields.io/npm/dm/iobroker.salus.svg)](https://www.npmjs.com/package/iobroker.salus)
![Test and Release](https://github.com/2K-Darkness/ioBroker.salus/workflows/Test%20and%20Release/badge.svg)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**ioBroker adapter for [Salus Controls](https://salus-controls.com/) Smart Home & iT600 underfloor heating (FBH) with Universal Gateway (UGE600 / UG600 / UG800).**

Communicates **100% locally** with the Salus Gateway via encrypted local HTTP API (AES-256-CBC) without relying on cloud services.

---

## Features

- **Local Communication:** No cloud connection required. Direct communication with the Salus Gateway on the local network.
- **Thermostat Support (SQ610, SQ610RF, TS600, HTRP-RF, etc.):**
  - Live **Current Temperature** (`value.temperature`)
  - Set **Target Temperature** (`level.temperature`) with 0.5 °C accuracy
  - Relative **Humidity** reading (`value.humidity`)
  - **Heating Active** indicator (`indicator.working`)
  - **Operating Mode / Hold Type** (`level.mode.thermostat`: Auto/Schedule, Permanent Hold, Standby/Off)
  - Keypad **Lock** status and control (`switch.lock`)
  - **Battery level** (for wireless battery thermostats)
  - **Online/Reachable status** (`indicator.reachable`)
- **Underfloor Heating Wiring Centers (it600WC / KL08RF / KL04RF):**
  - Online status and RF connection metrics (RSSI / LQI)
  - Fault & error code reporting (`ErrorCodeWC_d`)
- **Gateway Metrics:**
  - Gateway LAN MAC, model, firmware version, and connectivity state.
- **Modern UI:** Built-in responsive `jsonConfig.json` settings panel for ioBroker Admin.

---

## Prerequisites & Gateway Setup

1. **Local Wi-Fi Mode:**
   Make sure Local Wi-Fi Mode is active on the Gateway:
   - Open the Salus Smart Home app.
   - Tap your Gateway -> Settings (gear icon).
   - Verify that **"Disable Local WiFi Mode"** is set to **`No`**.
2. **Fixed IP Address:**
   Assign a fixed IP address or DHCP reservation to your Salus Gateway in your router.

---

## Configuration

In the ioBroker Admin panel for the `salus` instance:

| Field | Description | Default |
|---|---|---|
| **Gateway IP Address** | The local IP address of your UGE600 (e.g. `192.168.0.28`) | Required |
| **Gateway EUID** | The EUID of your gateway. In local Wi-Fi mode, this is usually `0000000000000000`. If that fails, enter the 16-character hex code found on the sticker under the gateway. | `0000000000000000` |
| **Polling Interval** | Time in seconds between status polls (min: 10, recommended: 30) | `30` |

---

## State Objects

### Thermostats (`salus.0.thermostats.<uniId>.*`)

| State | Type | Role | R/W | Unit | Description |
|---|---|---|---|---|---|
| `currentTemperature` | number | `value.temperature` | R | °C | Current room temperature |
| `targetTemperature` | number | `level.temperature` | R/W | °C | Target heating temperature (5.0 – 35.0 °C) |
| `humidity` | number | `value.humidity` | R | % | Relative room humidity |
| `heating` | boolean | `indicator.working` | R | - | `true` when the heating circuit is active |
| `holdType` | number | `level.mode.thermostat` | R/W | - | 0 = Schedule, 2 = Permanent Hold, 7 = Off |
| `locked` | boolean | `switch.lock` | R/W | - | Keypad lock active / toggle |
| `online` | boolean | `indicator.reachable` | R | - | Zigbee online status of the thermostat |
| `battery` | number | `value.battery` | R | % | Battery level (battery-operated models) |
| `model` | string | `info.model` | R | - | Model identifier (e.g. `SQ610`) |
| `firmware` | string | `info.firmware` | R | - | Installed firmware version |

### Wiring Centers (`salus.0.wiringCenters.<uniId>.*`)

| State | Type | Role | R/W | Description |
|---|---|---|---|---|
| `online` | boolean | `indicator.reachable` | R | Reachable status |
| `errorCode` | string | `info.status` | R | Hardware error code (`0000` = normal) |
| `hasError` | boolean | `indicator.alarm` | R | `true` if any hardware error is detected |
| `rssi` | number | `value.rssi` | R | Last message signal strength (dBm) |

---

## Smart Home Integration (HomeKit, Lovelace, Alexa)

Because this adapter follows official ioBroker roles:
- **Apple HomeKit (Yahka):** Map `currentTemperature` to `CurrentTemperature`, `targetTemperature` to `TargetTemperature`, and `heating` to `CurrentHeatingCoolingState`.
- **ioBroker.lovelace:** Auto-detects thermostats as Climate entities.
- **ioBroker.iot (Alexa / Google Assistant):** Assign `targetTemperature` and `currentTemperature` directly.

---

## Changelog

### 0.1.9 (2026-11-14)
* (2K-Darkness) Prune old news entries and remove unpublished 0.1.7 for repository builder compliance

### 0.1.8 (2026-11-13)
* (2K-Darkness) Sync package-lock.json with updated testing dependency for clean CI builds

### 0.1.7 (2026-11-13)
* (2K-Darkness) Address review findings: use adapter setTimeout/clearTimeout, remove EUID from info log, remove unused setSwitch, update testing dependency and workflow check action

### 0.1.6 (2026-11-12)
* (2K-Darkness) Review compliance update: support compact mode, sanitize object IDs, update adapter-core, refine documentation

### 0.1.5 (2026-11-01)
* (2K-Darkness) Prevent objects.jsonl bloat by creating objects once via setObjectNotExistsAsync with in-memory caching

### 0.1.4 (2026-10-29)
* (2K-Darkness) Add folder objects for device categories and align RSSI state role to value.rssi for repochecker compliance

### 0.1.3 (2026-10-26)
* (2K-Darkness) Automated release with package provenance via GitHub Actions

### 0.1.2 (2026-10-26)
* (2K-Darkness) CI/CD testing pipeline update and package validation

### 0.1.1 (2026-10-26)
* (2K-Darkness) Repository compliance update (Node.js 22, admin translations, js-controller and admin dependencies)

### 0.1.0 (2026-10-26)
* (2K-Darkness) Initial release
* Direct local AES-256 encrypted communication with Salus UGE600 gateway
* Auto-detection and full read/write support for SQ610 thermostats
* Auto-detection of it600WC underfloor heating wiring centers
* JSON configuration panel for ioBroker Admin

---

## License

MIT License

Copyright (c) 2026 2K-Darkness <2K-Darkness@gmx.de>

See [LICENSE](LICENSE) for full license text.