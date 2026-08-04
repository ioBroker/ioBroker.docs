![Logo](admin/siku.svg)

# ioBroker.siku

[![NPM version](https://img.shields.io/npm/v/iobroker.siku.svg)](https://www.npmjs.com/package/iobroker.siku)
[![Downloads](https://img.shields.io/npm/dm/iobroker.siku.svg)](https://www.npmjs.com/package/iobroker.siku)
![Number of Installations](https://iobroker.live/badges/siku-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/siku-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.siku.png?downloads=true)](https://nodei.co/npm/iobroker.siku/)

**Tests:** ![Test and Release](https://github.com/ChrMaass/ioBroker.siku/workflows/Test%20and%20Release/badge.svg)

## Overview

This adapter integrates **SIKU RV V2** residential ventilation devices and compatible units from the **Oxxify smart** series into ioBroker. This wording explicitly includes devices marketed as **Oxxify.smart 30**, **Oxxify.smart 50** and **Oxxify.smart 50 K**.

The current repository state targets a feature-complete **public beta** for local-network operation and the official ioBroker `latest` intake.

## Features

- UDP communication based on the documented manufacturer protocol
- Multi-device support in **one** adapter instance
- Broadcast discovery in the local network
- JSON config based admin page for multiple devices
- Separate RTC time check every 24 hours by default
- Restart-persistent RTC scheduling based on the last check-attempt timestamp
- Time synchronization only when the configured drift threshold is exceeded
- State-based control for the main operating parameters
- Full weekly schedule mapping via ioBroker states with packet-size-safe reads every 15 minutes
- Localized enum labels for fan speed, fan mode and timer mode
- Readable local timestamp companion states for poll and discovery timestamps
- Per-device passwords encrypted at their nested config path and protected from normal config reads
- One adapter instance per ioBroker host to avoid UDP port conflicts

## Supported core functions

- Discovery of master devices via broadcast (`0x007C`, `0x00B9`)
- Management of multiple devices by stable device IDs
- Polling of status, sensor and diagnostic values
- Writing of central parameters via states, for example:
  - power
  - fan speed
  - manual fan speed
  - fan mode
  - timer mode
  - humidity setpoint
  - sensor enable flags
- One-shot write-only reset commands with a subsequent read-back instead of unsafe retries
- Weekly schedule structure such as:
  - `schedule.monday.p1.speed`
  - `schedule.monday.p1.endHour`
  - `schedule.monday.p1.endMinute`
  - ... up to `schedule.sunday.p4.*`
- Diagnostic values such as:
  - filter countdown
  - operating hours
  - alarm level
  - filter replacement indication
  - last discovery / last poll / last time check

## Device references

The adapter is built for the SIKU RV V2 family such as **SIKU RV 50 W Pro WiFi V2**, compatible units from the **Oxxify smart** series and related devices in the same protocol family.

Current compatibility wording and search terms explicitly cover **Oxxify.smart 30**, **Oxxify.smart 50**, **Oxxify.smart 50 K**, **Oxxify smart**, **Oxxify smart 30**, **Oxxify smart 50**, **Oxxify smart 50 K** and compatible app-controlled decentralized heat-recovery ventilation units.

- Manufacturer product page: [SIKU RV 50 W Pro WiFi V2](https://www.siku.at/SIKU-RV-50-W-Pro-WiFi-V2/50523)
- Manufacturer overview: [SIKU products](https://www.siku.at/en/products/)
- Compatible series overview: [Oxxify decentralized ventilation](https://raumluft-shop.de/lueftung/dezentrale-lueftungsanlage-mit-waermerueckgewinnung/oxxify.html)
- Compatible product examples: [Oxxify.smart 30](https://raumluft-shop.de/oxxify-smart-30.html) and [Oxxify.smart 50](https://raumluft-shop.de/oxxify-smart-50.html)
- Official mobile app description: [SIKU RV WIFI on the App Store](https://apps.apple.com/at/app/siku-rv-wifi/id1444515926)

## Development

Useful scripts:

| Script               | Purpose                                        |
| -------------------- | ---------------------------------------------- |
| `npm run build`      | Compile the TypeScript sources                 |
| `npm run check`      | Run type checking without building             |
| `npm run lint`       | Run ESLint                                     |
| `npm run test`       | Run unit and package tests                     |
| `npm run coverage`   | Enforce and report TypeScript test coverage    |
| `npm run dev-server` | Start a local ioBroker development environment |
| `npm run release`    | Create an official release/tag via release-tooling |

The adapter was generated with the official ioBroker tooling and is developed in TypeScript.

## CI / CD

- Normal pull requests run a lean Ubuntu smoke test after linting, type-checking and unit coverage.
- Dependabot pull requests run the complete supported OS/Node.js matrix before auto-merge.
- `main` runs the release-relevant Linux/macOS/Windows matrix required for ioBroker repository intake.
- A separate scheduled/manual Windows regression workflow remains available for additional checks because the ioBroker controller bootstrap is significantly slower there.
- Runtime changes can receive an automatic patch version after a successful `main` run; docs, tests, workflows and development-only dependency updates do not create empty releases.
- Tagged releases are published to npm directly from GitHub Actions via Trusted Publishing.
- GitHub Releases are created automatically with generated release notes by the standard ioBroker deploy action.

## Publication readiness

A short release and repository checklist is available in [RELEASING.md](RELEASING.md).

## Beta notes

- Discovery, polling, time checks and schedule reads have already been validated against multiple real devices.
- Live write tests have intentionally been kept conservative.
- Network/service functions such as Wi-Fi reconfiguration, password changes or factory reset are intentionally not exposed as normal writable states.

## Advanced messagebox API

The adapter exposes these `sendTo` commands for scripts and integrations:

- `discover`: run UDP broadcast discovery. Without an explicit password, the adapter tries the default and all
  configured device passwords (at most 16) within one receive window of at most 10 seconds. Configuration updates
  are returned and applied only for calls routed from an ioBroker Admin instance; other callers receive
  `discoveryFoundNotSaved`.
- `syncTimeAll`: run a manual RTC check/sync for all configured devices.
- `syncTimeDevice`: run a manual RTC check/sync for one configured device by `deviceId`.
- `readDevice`: read selected raw protocol parameters from one explicitly supplied IPv4/device-ID target for diagnostics.

The diagnostic `readDevice` response serializes packet metadata and returned parameter values as hex strings. Device passwords are never returned; the response only includes `passwordLength`.

The vendor UDP protocol transmits its short device password without transport encryption, including during
discovery. Run the adapter only in a trusted, isolated local network. The Admin-origin check above is a message-routing
guard for configuration handling, not a security boundary against malicious code already running inside ioBroker.

## Changelog

<!-- Release script placeholder for the next version. Keep this heading at the start of a line. -->
### **WORK IN PROGRESS**

### 0.2.3 (2026-07-26)

- Harden RTC scheduling, UDP shutdown/error handling, malformed response isolation, schedule write recovery and
  password/object lifecycle behavior.

### 0.2.2 (2026-07-11)

- Harden repository-checker compatibility for nested password protection, compact-mode CI scripts and release recovery.

### 0.2.1 (2026-07-10)

- Create the localized fan-speed text state object before writing its value.

### 0.2.0 (2026-07-10)

- Correct nested encryption and migration of per-device passwords from earlier beta versions.
- Harden UDP response correlation and write-only reset handling to prevent stale or repeated commands.
- Restrict fan-speed writes to protocol-defined values and expose localized enum labels.
- Persist the 24-hour RTC schedule across restarts and keep clock reads outside normal polling.
- Split weekly schedule reads into protocol-size-safe chunks and refresh them every 15 minutes.
- Extract the object factory and operation scheduler, expand tests and enforce coverage in CI.
- Modernize ioBroker dependencies, release actions and automatic patch-release classification.

### 0.1.8 (2026-06-09)

- Cleaned up unused Admin translations found during the adapter checklist review.
- Documented the advanced messagebox commands for script/integration use.
- Added a code-side upper bound for the RTC time sync drift threshold.

Older changelog entries are available in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT License

Copyright (c) 2026 Christian Maaß <christian@maass.it>

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
