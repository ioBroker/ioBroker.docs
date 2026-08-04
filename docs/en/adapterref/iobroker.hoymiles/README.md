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

ioBroker adapter for [**Hoymiles**](https://www.hoymiles.com/) **HMS-xxxW-xT** and **HMS-xxx-xWB** microinverters with integrated WiFi/Bluetooth DTU (DTUBI).

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

This adapter is designed for **Hoymiles HMS microinverters with an integrated WiFi (or WiFi + Bluetooth) DTU** (DTUBI).

**Local** = direct TCP/Protobuf connection on port 10081. **Cloud** = S-Miles Cloud API — auto-discovery, realtime data (fast burst channel ~1.5–3 s), energy aggregates, grid profile, inverter on/off + reboot, DTU reboot.

| Model | Strings | Local (TCP) | Cloud | Status |
|-------|:---:|:---:|:---:|--------|
| HMS-300W-1T | 1 | ✅ | ✅ | Untested |
| HMS-350W-1T | 1 | ✅ | ✅ | Untested |
| HMS-400W-1T | 1 | ✅ | ✅ | Untested |
| HMS-450W-1T | 1 | ✅ | ✅ | Untested |
| HMS-500W-1T | 1 | ✅ | ✅ | Untested |
| HMS-600W-2T | 2 | ✅ | ✅ | Untested |
| HMS-700W-2T | 2 | ✅ | ✅ | Untested |
| HMS-800W-2T | 2 | ✅ | ✅ | **Tested** (Local + Cloud) |
| HMS-900W-2T | 2 | ✅ | ✅ | Untested |
| HMS-1000W-2T | 2 | ✅ | ✅ | **Tested** (Local) |
| HMS-1600DW-4T | 4 | ✅ | ✅ | Untested |
| HMS-1800DW-4T | 4 | ✅ | ✅ | Untested |
| HMS-2000DW-4T | 4 | ✅ | ✅ | Untested |
| HMS-600-2WB | 2 | ❌¹ | ✅ | Untested |
| HMS-700-2WB | 2 | ❌¹ | ✅ | Untested |
| HMS-800-2WB | 2 | ❌¹ | ✅ | **Tested** (Cloud: realtime burst, grid profile, on/off + reboot, DTU reboot) |
| HMS-900-2WB | 2 | ❌¹ | ✅ | Untested |
| HMS-1000-2WB | 2 | ❌¹ | ✅ | Untested |
| HMS-1600-4WB | 4 | ❌¹ | ✅ | Untested |
| HMS-1800-4WB | 4 | ❌¹ | ✅ | Untested |
| HMS-2000-4WB | 4 | ❌¹ | ✅ | Untested |

¹ The **WB series** (sold as **"HiFlow Pro"**) has no local TCP port — its only local channel is Bluetooth LE, and all data goes to the Hoymiles cloud. These inverters therefore work **cloud-only**: enable the cloud connection and the adapter reads them through the S-Miles API (realtime burst, energy, grid profile) and can send the inverter on/off + reboot and DTU reboot commands. All WB models share the same platform; only the HMS-800-2WB has been tested so far.

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

### **WORK IN PROGRESS**
- (@Eistee82) Cloud: inverters whose model name does not end in "T" (e.g. HMS-2000-4WB) no longer lose their extra PV strings — voltage and current were only polled for the first two strings, so strings 3 and 4 showed power but nothing else. The number of PV inputs is now taken from Hoymiles' own rule dictionary, looked up by inverter serial number prefix, which is the same source the S-Miles app uses; the model name and the number of strings seen in the live data remain as fallbacks
- (@Eistee82) Cloud: support inverters with more than six PV strings (up to 12), matching the port counts the cloud actually publishes
- (@Eistee82) CI/tests: upgraded the coverage tool (c8 11 → 12) so the unit-test coverage step runs on Node 26 as well, and added Node 26 to the test matrix (now 22 / 24 / 26)
- (@Eistee82) Security (dev dependencies only): cleared several advisories in the development toolchain — js-yaml and brace-expansion via `npm audit fix`, plus targeted same-major overrides for brace-expansion (1.1.16) and adm-zip (0.6.0). No change to the shipped adapter (these packages are not part of the published npm package)
- (@Eistee82) Device Manager: inverters and cloud stations now appear on the ioBroker Device Manager tab, each inverter titled after its cloud station (the name given in the S-Miles app) plus its DTU serial, with live status, original per-type device icons (also used for the device objects in the object tree, replacing the generic adapter icon), live values right on the card (current power, today's energy, per-PV-string power and inverter temperature), per-device controls (on/off, power limit, power factor, reactive power, lock, reboot inverter/DTU, clear warnings/grounding fault, persistent power limit, cloud send interval), a settings dialog and a read-only details view. Cloud-only inverters show just the cloud-actuatable controls; instance actions cover network scan and cloud-login test. Controls reuse the existing command path, so no behaviour changes for the underlying states

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

### 0.3.3 (2026-04-08)
- (@Eistee82) Fix jsonConfig schema warnings: button color, remove unsupported table properties

Older entries: see [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

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
