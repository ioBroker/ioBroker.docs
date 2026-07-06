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

ioBroker adapter for [**Hoymiles**](https://www.hoymiles.com/) **HMS-xxxW-xT** microinverters with integrated WiFi DTU (DTUBI).

Two connection modes (independently configurable):
- **Local:** Direct TCP/Protobuf communication on port 10081 — no cloud, no gateway needed
- **Cloud:** Hoymiles S-Miles Cloud API — monthly/yearly energy, CO2 savings, income calculation

## Documentation

- 🇺🇸 [English Documentation](docs/en/README.md)
- 🇩🇪 [Deutsche Dokumentation](docs/de/README.md)

## Features

- Dual mode: local TCP/Protobuf and/or S-Miles Cloud API
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
- Alarm and warning monitoring (109 codes DE/EN)
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
| **Cloud Relay** | on | Forward real-time data to Hoymiles Cloud on behalf of the DTU. Prevents the local connection from blocking cloud uploads. |

### Cloud Connection (S-Miles)

| Setting | Default | Description |
|---------|---------|-------------|
| **Enable cloud** | off | Enable Hoymiles S-Miles Cloud API |
| **S-Miles Email** | — | Your S-Miles account email |
| **S-Miles Password** | — | Your S-Miles account password (stored encrypted) |

All inverters in your cloud account are automatically discovered. No manual serial number configuration needed.

Both connections can be enabled simultaneously. Local data has priority — cloud data fills in when the DTU is offline (e.g. at night).

## Supported Inverters

This adapter is designed for **Hoymiles HMS microinverters with integrated WiFi DTU** (DTUBI):

**1 String (1T):**

| Model | Status |
|-------|--------|
| HMS-300W-1T | Untested |
| HMS-350W-1T | Untested |
| HMS-400W-1T | Untested |
| HMS-450W-1T | Untested |
| HMS-500W-1T | Untested |

**2 Strings (2T):**

| Model | Status |
|-------|--------|
| HMS-600W-2T | Untested |
| HMS-700W-2T | Untested |
| HMS-800W-2T | **Tested** (Local + Cloud) |
| HMS-900W-2T | Untested |
| HMS-1000W-2T | **Tested** (Local) |

**4 Strings (4T) — only DW variant:**

| Model | Status |
|-------|--------|
| HMS-1600DW-4T | Untested |
| HMS-1800DW-4T | Untested |
| HMS-2000DW-4T | Untested |

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

### 0.3.3 (2026-04-08)
- (@Eistee82) Fix jsonConfig schema warnings: button color, remove unsupported table properties

### 0.3.2 (2026-04-03)
- (@Eistee82) Fix remaining responsive layout issues for repochecker (staticText, header, divider)

### 0.3.1 (2026-04-03)
- (@Eistee82) Fix admin UI responsive layout (add missing size attributes for repochecker)
- (@Eistee82) Fix news translations in io-package.json for repochecker E2004

## License

MIT License

Copyright (c) 2026 Eistee82

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
