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
### **WORK IN PROGRESS**
- (@Eistee82) Expose the per-string PV error code as `<dtuSerial>.pvX.errorCode` (PvMO field 8, local only; 0 in normal operation) — the field was already decoded but not surfaced
- (@Eistee82) Fix paginated warn lists losing entries: the DTU splits long alarm/warn lists across multiple packages (`package_now`/`package_nub`), which were ignored so only the last package survived. The adapter now pulls every package (requesting `package_now + 1` on tag `0xa3 0x04`, like the S-Miles app) and writes the assembled list once complete
- (@Eistee82) New writable `config.limitPowerMyPower` state for the **persistent** power limit (SetConfig `limit_power_mypower`, stored in the DTU and re-applied on startup). The GetConfig-reported stored limit now feeds this state instead of `inverter.powerLimit`, so the two are cleanly separated: `inverter.powerLimit` is the runtime/RAM-only limit (use it for zero-export — no NVM wear), `config.limitPowerMyPower` is the permanent cap
- (@Eistee82) Obsolete states/channels from older adapter versions are now removed from a device's object tree on startup (anything no longer in the state definitions, keeping the dynamic PV/meter/history objects), so the tree stays in sync after an update
- (@Eistee82) Remove 15 config/DTU states that the shared Hoymiles firmware reports but that target hardware the ECR6600 die does not have (verified against the chip datasheet + firmware driver inventory): Ethernet (`config.netIpAddress/netSubnetMask/netGateway/netMacAddress` — no Ethernet MAC on the die), sub-1GHz/RF (`config.channelSelect/sub1gSweepSwitch/sub1gWorkChannel`, `dtu.rfHwVersion/rfSwVersion/sub1gFrequencyBand` — chip is 2.4 GHz WiFi/BLE only), RS485 (`dtu.mode485` — no driver), and the meter/zero-export config that has no consuming subsystem (`config.meterKind/meterInterface/zeroExport433Addr/zeroExportEnable` — no meter interface, the DTU has no autonomous export-regulation). The startup cleanup removes them from existing trees on update. `config.wifiRssi`/`dtu.rssi` confirmed to be real dBm (WiFi stack works in dBm, no %-conversion)
- (@Eistee82) Read the inverter grid profile (grid-connection file) locally via DevConfigFetch and expose it under `<dtuSerial>.gridProfile.*` (voltage/frequency limits, trip times, reconnect thresholds, ramp rates, Volt-Var/power-factor, function flags)
- (@Eistee82) Cloud relay now parses downlink server commands instead of discarding them and answers them on behalf of the DTU, so the S-Miles app/portal keep working while the adapter holds the local connection: the grid-profile read (action 41 → ack/status + the locally-read profile as `0x22 0x0e`) and the device version query (action 4 → ack/status echoing the inverter serial; the firmware versions already live in the cloud device tree)
- (@Eistee82) Fix the cloud grid-profile read showing "no data" in the portal (stuck at 1%). Matched the relay's grid-file upload (`0x22 0x0e`) byte-for-byte to a packet capture of a working read: send it only after the cloud acknowledges the command status with `0x23 0x06` (handshake order), close the single-package upload with `rule_type=1` instead of `current_package` (field 12, not 11), and treat `dtu_sn`/`dev_sn` as the raw `bytes` the DTU reported (not ASCII strings)
- (@Eistee82) Cloud station data reliability: `station-<id>.grid.*` values are now flagged with quality `0x42` (device not connected) when the station's last cloud upload is stale (>~20 min), and reset to `0x00` once it resumes; when a station comes back online the adapter immediately runs one full refresh (details/devices/firmware/warnings) before returning to the normal poll cadence. Station warning flags are always read from `station/find` (authoritative), never the cached `select_by_page` list summary
- (@Eistee82) Fix `station-<id>.warn.stationOffline` falsely turning `true` on adapter start: the cloud briefly reports `s_uoff=true` while the relay takes over the DTU's cloud uplink, even though the station keeps uploading — the flag is now cross-checked against realtime data freshness, so a station with fresh data is never reported offline
- (@Eistee82) S-Miles Home account support: home login (HTTP 403 treated as the "home" verdict), per-station data-center routing for lat/lon/address (incl. `pvm-ext/station-ak/find`), and `warn_data` / timestamps / firmware versions recovered from the `realtime_c` and firmware-compare fallbacks
- (@Eistee82) Cloud fixes: offline inverters no longer shown as online, station timestamps converted to UTC, new `station-<id>.warn.*` flags, per-station daily firmware check, `warn.deviceAlarm` relabelled "Inverter alarm" (`warn.powerLimited` is installer-only)
- (@Eistee82) Add anonymized `[diag]` debug logging of raw cloud responses (serials/e-mail hashed, coordinates/address redacted) for safe forum bug reports
- (@Eistee82) Maintenance: CI/tsconfig to Node 22/24, bump dev deps (`@iobroker/eslint-config`, `rimraf`, `@alcalzone/release-script` 5.2.1 per repochecker E0036) + npm `overrides` for the transitive protobufjs/serialize-javascript advisories, admin i18n placeholder key, CHANGELOG_OLD link

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
