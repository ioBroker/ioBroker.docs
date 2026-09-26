---
chapters: {"pages":{"en/adapterref/iobroker.hoymiles/README.md":{"title":{"en":"ioBroker.hoymiles"},"content":"en/adapterref/iobroker.hoymiles/README.md"},"en/adapterref/iobroker.hoymiles/docs/en/README.md":{"title":{"en":"ioBroker.hoymiles — Hoymiles HMS microinverters and HAT hybrid inverters"},"content":"en/adapterref/iobroker.hoymiles/docs/en/README.md"}}}
---
![Logo](admin/hoymiles.png)
# ioBroker.hoymiles

![Number of Installations](https://iobroker.live/badges/hoymiles-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/hoymiles-stable.svg)
[![NPM version](https://img.shields.io/npm/v/iobroker.hoymiles.svg)](https://www.npmjs.com/package/iobroker.hoymiles)

[![Test and Release](https://github.com/Eistee82/ioBroker.hoymiles/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/Eistee82/ioBroker.hoymiles/actions/workflows/test-and-release.yml)
[![Downloads](https://img.shields.io/npm/dm/iobroker.hoymiles.svg)](https://www.npmjs.com/package/iobroker.hoymiles)
[![License](https://img.shields.io/github/license/Eistee82/ioBroker.hoymiles)](https://github.com/Eistee82/ioBroker.hoymiles/blob/main/LICENSE)
[![Donate](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://paypal.me/eistee)

**If you like this adapter, please consider a donation:**

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://paypal.me/eistee)

## Disclaimer

**All product and company names or logos are trademarks™ or registered® trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them or any associated subsidiaries! This personal project is maintained in spare time and has no business goal.**

**THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.** Use at your own risk. The authors are not responsible for any damage to your inverter, DTU, or any other equipment. This adapter communicates directly with your hardware — incorrect use of commands (power limit, reboot, on/off) can affect your solar installation.

This adapter is not affiliated with, endorsed by, or connected to Hoymiles Power Electronics Inc. in any way.

## Description

ioBroker adapter for [**Hoymiles**](https://www.hoymiles.com/) **HMS-xxxW-xT** and **HMS-xxx-xWB** microinverters with integrated WiFi/Bluetooth DTU (DTUBI) — locally or through the S-Miles cloud — and, through the cloud, for **HAT** hybrid inverters with battery.

Two connection modes (independently configurable):
- **Local:** Direct TCP/Protobuf communication on port 10081 — no cloud, no gateway needed
- **Cloud:** Hoymiles S-Miles Cloud API — monthly/yearly energy, CO2 savings, income calculation

## Documentation

- 🇺🇸 [English Documentation](/#/docs/adapterref/iobroker.hoymiles/docs/en/README.md)
- 🇩🇪 [Deutsche Dokumentation](https://github.com/Eistee82/ioBroker.hoymiles/blob/main/docs/de/README.md)

## Features

- Three connection paths: local TCP/Protobuf, local Bluetooth (BLE) via an ESPHome Bluetooth Proxy, and/or the S-Miles Cloud API
- Local BLE for the WB series (e.g. HMS-800-2WB, no local TCP port): automatic gateway discovery (mDNS), automatic best-signal gateway selection, and a one-click "add discovered inverters" import
- Persistent TCP connection with protobuf heartbeat (auto idle keepalive every 20s)
- Configurable data interval (0 = fastest possible, ~1s per cycle)
- Cloud Relay: forwards inverter data to the Hoymiles Cloud on behalf of the DTU, so the local connection no longer blocks cloud uploads
- Automatic cloud poll timing derived from DTU's sendTime configuration
- Sequence numbers in protocol framing (0-60000 wrap-around, matching original app)
- AES-128-CBC encryption support for newer DTU firmware (SHA-256 key derivation from encRand)
- Real-time data: power, voltage, current, frequency, energy, temperature
- Per-panel monitoring (PV0/PV1) — local and cloud
- Per-inverter cloud data: power, voltage, frequency, temperature (Protobuf chart API)
- Energy aggregates: daily, monthly, yearly, total (kWh)
- Income calculation based on electricity price (cloud)
- CO2 savings tracking (cloud)
- Commands: power limit (2-100%), inverter on/off/reboot, DTU reboot, power factor limit, reactive power limit, clean warnings, clean grounding fault, lock/unlock inverter
- Alarm and warning monitoring (223 codes, localized in all 11 languages)
- State quality (`q`): marks data as stale on disconnect, substitute for cloud fallback, auto-reset on reconnect
- 5-minute idle timeout with automatic reconnect
- Network discovery module for ioBroker.discovery
- TypeScript, ESLint, Prettier, GitHub CI/CD
- Full i18n: en, de, ru, pt, nl, fr, it, es, pl, uk, zh-cn

## Configuration

Open the adapter configuration in the ioBroker admin interface.

### Local Connection (TCP)

| Setting | Default | Description |
|---------|---------|-------------|
| **Enable local** | on | Enable direct TCP/Protobuf connection |
| **DTU devices** | (empty) | Table of DTU IP addresses/hostnames. Add one row per DTU. |
| **Data query interval** | 5s | Seconds between data requests (0-300). Set 0 for fastest possible (no delay between requests). |
| **Config/alarm poll factor** | 6 | Config and alarms are queried every Nth data cycle. |
| **Power limit dead band** | 1 % | Smaller power-limit changes are not sent to the device. Every write erases two flash sectors inside the inverter. 0 = off. |
| **Power limit minimum interval** | 60 s | Shortest gap between two power-limit writes. Protects the inverter's flash. 0 = off. |
| **Cloud Relay** | on | Forward real-time data to Hoymiles Cloud on behalf of the DTU. Prevents the local connection from blocking cloud uploads. |

### Cloud Connection (S-Miles)

| Setting | Default | Description |
|---------|---------|-------------|
| **Enable cloud** | off | Enable Hoymiles S-Miles Cloud API |
| **S-Miles Email** | — | Your S-Miles account email |
| **S-Miles Password** | — | Your S-Miles account password (stored encrypted) |

All inverters in your cloud account are automatically discovered. No manual serial number configuration needed.

### BLE Gateway (ESPHome)

For **WB-series** inverters (e.g. HMS-800-2WB) that can only be reached over Bluetooth. You add a small, cheap Bluetooth bridge to your network (an [ESPHome Bluetooth Proxy](https://esphome.io/projects/?type=bluetooth)), and the adapter reaches your inverter through it — without the cloud.

Open the **BLE** tab, turn on **Enable BLE gateway** and save. Then click **Add discovered inverters**, enter each inverter's **PIN**, tick **Active**, and save. See the step-by-step guide in the [documentation](/#/docs/adapterref/iobroker.hoymiles/docs/en/README.md#ble-gateway-esphome).

The settings are grouped into **Local / Cloud / BLE** tabs; any combination can be enabled at once.

## Supported Inverters

This adapter is designed for **Hoymiles HMS microinverters with an integrated WiFi (or WiFi + Bluetooth) DTU** (DTUBI).

**Local (TCP)** = direct TCP/Protobuf connection on port 10081 (WiFi models). **Local (BLE)** = local Bluetooth through an [ESPHome Bluetooth Proxy](https://esphome.io/projects/?type=bluetooth) (WB series). **Cloud** = S-Miles Cloud API — auto-discovery, realtime data (fast burst channel ~1.5–3 s), energy aggregates, grid profile, inverter on/off + reboot, DTU reboot.

| Model | Strings | Local (TCP) | Local (BLE)² | Cloud | Status |
|-------|:---:|:---:|:---:|:---:|--------|
| HMS-300W-1T | 1 | ✅ | — | ✅ | Untested |
| HMS-350W-1T | 1 | ✅ | — | ✅ | Untested |
| HMS-400W-1T | 1 | ✅ | — | ✅ | Untested |
| HMS-450W-1T | 1 | ✅ | — | ✅ | Untested |
| HMS-500W-1T | 1 | ✅ | — | ✅ | Untested |
| HMS-600W-2T | 2 | ✅ | — | ✅ | Untested |
| HMS-700W-2T | 2 | ✅ | — | ✅ | Untested |
| HMS-800W-2T | 2 | ✅ | — | ✅ | **Tested** (Local + Cloud) |
| HMS-900W-2T | 2 | ✅ | — | ✅ | Untested |
| HMS-1000W-2T | 2 | ✅ | — | ✅ | **Tested** (Local) |
| HMS-1600DW-4T | 4 | ✅ | — | ✅ | Untested |
| HMS-1800DW-4T | 4 | ✅ | — | ✅ | Untested |
| HMS-2000DW-4T | 4 | ✅ | — | ✅ | Untested |
| HMS-600-2WB | 2 | ❌¹ | ✅ | ✅ | Untested |
| HMS-700-2WB | 2 | ❌¹ | ✅ | ✅ | Untested |
| HMS-800-2WB | 2 | ❌¹ | ✅ | ✅ | **Tested** (Cloud; BLE gateway path in testing) |
| HMS-900-2WB | 2 | ❌¹ | ✅ | ✅ | Untested |
| HMS-1000-2WB | 2 | ❌¹ | ✅ | ✅ | Untested |
| HMS-1600-4WB | 4 | ❌¹ | ✅ | ✅ | Untested |
| HMS-1800-4WB | 4 | ❌¹ | ✅ | ✅ | Untested |
| HMS-2000-4WB | 4 | ❌¹ | ✅ | ✅ | Untested |

¹ The **WB series** (sold as **"HiFlow Pro"**) has no local TCP port — its only local channel is Bluetooth LE. Reach it either **locally over Bluetooth** (see column *Local (BLE)*) or via the **cloud**. All WB models share the same platform; only the HMS-800-2WB has been tested so far.

² **Local (BLE)** needs an [ESPHome Bluetooth Proxy](https://esphome.io/projects/?type=bluetooth) (a cheap ESP32) on your network; the adapter then reads and controls the inverter locally over Bluetooth, without the cloud. WiFi (T) models don't need this — they use the local TCP path. See the *BLE Gateway (ESPHome)* section in the [documentation](/#/docs/adapterref/iobroker.hoymiles/docs/en/README.md#ble-gateway-esphome).

**Cloud-only operation:** any supported inverter in your S-Miles account also works without a local connection at all — the adapter discovers it automatically and provides realtime power (burst channel), energy aggregates, grid profile, and the inverter on/off + reboot and DTU reboot commands over the cloud. The remaining commands (power limit, lock, clean warnings, …) require the local TCP link.

> **Important:** This adapter **only** works with HMS models that have **integrated WiFi**. It does **NOT** work with:
> - HMS-1600/1800/2000-4T **without** "DW" (these use Sub-1G RF and need an external DTU)
> - HM series (no WiFi, RF only)
> - MI series (no WiFi, RF only)
> - HMS/HMT with external DTU-Pro or DTU-WLite sticks
> - HMT three-phase models

## Multiple Inverters

This adapter supports multiple inverters in a single instance:

- **Local:** Add multiple DTU IP addresses in the device table
- **Cloud:** All inverters and stations in your account are automatically discovered

Each DTU creates a device node using its serial number as ID (e.g. `hoymiles.0.4143A01CEDE4.*`).
Cloud stations create aggregated device nodes (e.g. `hoymiles.0.station-12345.*`).

## Changelog
### 0.5.0 (2026-09-25)

- (@Eistee82) **DTUs with firmware V01.01.01 work locally again.** That firmware encrypts the local connection and moves the DTU's cloud link to TLS on port 10083; the adapter now speaks both. DTUs with older firmware are unaffected
- (@Eistee82) **Hybrid inverters with a battery (HAT series, e.g. HAT-6.0HV-EUG1) can be read through the cloud** — experimental, needs an installer-type S-Miles account. Everything about the battery is in one place below the inverter (`<dtuSerial>.battery.*`); the plant gets its live power flow, its energy balance for today, month, year and lifetime including the self-sufficiency rate (the figures of the app's "Production & Consumption" tab), income and cost, its measuring points (grid meter, loads, PV meter, generator), day curves, the cloud's alarm list and the relay settings. Read-only; power on/off and reboot are sent in the form such a device expects. Many thanks to BastiBerlin for providing access to a real system for development and testing
- (@Eistee82) **WB-series inverters (e.g. HMS-800-2WB) can be used locally over Bluetooth** through a cheap ESP32 running an ESPHome Bluetooth Proxy, found automatically. A Shelly or ecotracker meter can be connected to such an inverter, either to read it out or so the inverter itself keeps the grid feed-in at zero. Nightly reconnect attempts no longer flood the log
- (@Eistee82) **Your inverters and plants appear on the Config Manager tab** with live values, controls and a settings dialog, and the adapter settings are split into Local, Cloud and Bluetooth tabs with links to the S-Miles portal and the Bluetooth-proxy instructions. In the adapter list it now appears as "Hoymiles Inverters"
- (@Eistee82) **More accurate readings, less wear:** the inverter's full daily power curve (`history.powerJson`) is read locally, the plant total keeps up with the individual inverters, energy counters no longer jump backwards after a restart, `inverter.activePowerLimit` no longer shows 0 % while producing, and the DTU's network, meter, zero-export and lock settings become states. Power-limit writes are rate-limited because every write wears the inverter's flash memory, and a single setting no longer overwrites the rest of the configuration
- (@Eistee82) **Renamed and removed states:** the WiFi signal is a 0–100 quality, not dBm, and is now called `dtu.signalQuality` / `config.wifiSignalQuality` (was "rssi"). `inverter.modulationIndexSignal`, `dtu.searchResult` and `pvN.errorCode` never held usable data and disappear from existing installations by themselves

### 0.4.1 (2026-07-18)
- (@Eistee82) Packaging: removed the npm `prepare` install script — installs from GitHub now use the committed `build/` output directly, so no dev dependencies are downloaded onto the target system; npm releases are still built freshly via `prepublishOnly`
- (@Eistee82) CI/test reliability: added a global Mocha timeout and switched the test TLS certificates to fast EC keys, so the adapter-tests no longer time out on loaded CI runners

### 0.4.0 (2026-07-17)
- (@Eistee82) Cloud-only support for WB inverters ("HiFlow Pro", e.g. HMS-800-2WB): read power and energy over the S-Miles cloud and switch the inverter on/off, reboot it or reboot the DTU — no local connection needed
- (@Eistee82) Faster live values: new realtime channel updates power every few seconds instead of every ~80 s, like the app's live view
- (@Eistee82) More local data: inverter grid profile, a persistent power limit, per-string error codes and complete alarm lists
- (@Eistee82) More reliable and readable: alarm texts in your ioBroker language, fixed offline/online detection, S-Miles Home account support, and better data quality handling
- (@Eistee82) Maintenance and security: dependency and GitHub Actions updates that close known security advisories, admin translations migrated to the current i18n file format, and connection timers are now managed by ioBroker so they are reliably cleaned up on stop/restart

### 0.3.5 (2026-05-13)
- (copilot) Adapter requires node.js >= 22 now
- (@Eistee82) Stop retry loop on permanent cloud auth errors to prevent Hoymiles account lockout
- (@Eistee82) Add `info.cloudLastError` state and raise an ioBroker alert notification with reset instructions on permanent cloud auth errors
- (@Eistee82) Bump axios to 1.15.0 and protobufjs to 8.0.1
- (@Eistee82) Add S-Miles Home account support (Argon2id login + `/pvmc/.../*_c` data API)
- (@Eistee82) Decide cloud profile (installer / home) via a post-login probe against `/pvm/.../select_by_page` instead of `pre-insp.v` — Hoymiles unified all accounts onto Argon2id in 2026
- (@Eistee82) Drop the dead v0 auth fallback
- (@Eistee82) Skip cloud-station states for fields the home-profile API doesn't provide (no empty placeholders for `latitude`/`longitude`/firmware version strings)
- (@Eistee82) Add a "Test cloud login" diagnostic button to the admin UI with per-phase results (`region_c`, `pre-insp`, `login`, `probe`) for forum bug reports
- (@Eistee82) Bump `protobufjs` to 8.2.0 to address seven security advisories (4 high, 3 medium — code injection, prototype pollution, DoS variants) affecting 8.0.0–8.0.1
- (dependabot) Bump dev-only transitive `follow-redirects` to 1.16.0 (security: leaked auth headers on cross-domain redirects) and `deepl-node` to 1.27.0 (drops the unused `uuid` dependency)

### 0.3.4 (2026-04-08)
- (@Eistee82) Fix disabled property type in jsonConfig table items (string, not boolean)
- (@Eistee82) Add local repochecker script (`npm run test:repo`)

Older entries: see CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 Eistee82 (t.me/AMEistee)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.