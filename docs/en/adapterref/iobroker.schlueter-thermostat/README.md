# ioBroker.schlueter-thermostat

[![NPM version](https://img.shields.io/npm/v/iobroker.schlueter-thermostat.svg)](https://www.npmjs.com/package/iobroker.schlueter-thermostat)
[![Downloads](https://img.shields.io/npm/dm/iobroker.schlueter-thermostat.svg)](https://www.npmjs.com/package/iobroker.schlueter-thermostat)
![Number of Installations](https://iobroker.live/badges/schlueter-thermostat-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/schlueter-thermostat-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.schlueter-thermostat.png?downloads=true)](https://nodei.co/npm/iobroker.schlueter-thermostat/)

**Tests:** ![Test and Release](https://github.com/patricknitsch/ioBroker.schlueter-thermostat/workflows/Test%20and%20Release/badge.svg)

---

##

## 🌍 Overview

<img align="left" src="admin/schlueter-thermostat.png" alt="image" width="128" /><p>
This adapter integrates <strong>Schlüter / OJ Microline OWD5 thermostats</strong> into ioBroker via the <strong>official cloud APIs</strong>.

It is based on the HA Integration from @robbinjanssen. For more informations see the documentation.

> **Cloud-only** — no local gateway, Modbus, or LAN API required.

##

## 🚀 How to Start

1. Install adapter in ioBroker
2. Open instance configuration
3. Enter:

| Setting           | Description                   |
| ----------------- | ----------------------------- |
| Username          | Your Schlüter/OJ cloud login  |
| Password          | Cloud password                |
| API Key           | Below works in most cases     |
| Customer ID       | Found in thermostat info      |
| Client SW Version | Numeric value from thermostat |
| Poll Interval     | Default: 60 seconds           |

4. Save & start adapter

For API-Key you can try with: `f219aab4-9ac0-4343-8422-b72203e2fac9`.
You can find this Key in Forum: `https://community.home-assistant.io/t/mwd5-wifi-thermostat-oj-electronics-microtemp/445601`, so it looks like a
global Key.

##

## Documentation

[🇺🇸 Documentation](./docs/en/README.md)

[🇩🇪 Dokumentation](./docs/de/README.md)

##

## Compact Architecture Overview

### Architecture Badges

![Cloud Architecture](https://img.shields.io/badge/Architecture-Cloud%20API%20Bridge-blue?style=for-the-badge&logo=cloudflare)
![Apply Concept](https://img.shields.io/badge/Control-Apply%20Based-green?style=for-the-badge)
![Mode Support](https://img.shields.io/badge/Modes-Schedule%20|%20Comfort%20|%20Manual%20|%20Boost%20|%20Eco%20|%20Frost%20Protection%20|%20Vacation-orange?style=for-the-badge)

### Compact Program Structure

```mermaid
flowchart LR
  UI[User / UI] --> IO[ioBroker States]
  IO --> ADP[Adapter]

  ADP -->|read| OWD5[OWD5 Cloud]
  ADP -->|write| OCD5[OCD5 Cloud]
  OCD5 --> TH[Thermostat]

  ADP --> OBJ[Object Tree]
  OBJ --> RO[Read States]
  OBJ --> AP[Apply Controls]
```

### Internal Flow (Mini)

```mermaid
flowchart TB
  READY[onReady] --> LOGIN[Cloud Login]
  LOGIN --> POLL[pollOnce]
  POLL --> UPSERT[Update Objects + States]
  UPSERT --> BACKOFF{All offline?}
  BACKOFF -- yes --> INC[Increase interval up to 1h then 12:00/00:00]
  BACKOFF -- no --> RESET[Reset to base interval]
  INC --> POLL
  RESET --> POLL

  APPLYBTN[Apply Button] --> ROUTER[applyRouter]
  ROUTER --> API[updateThermostat]
```

##

## 📌 Notes

- Developed and tested with a single thermostat
- Multi-device environments supported, but feedback welcome

##

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.5.2 (2026-03-20)

- (patricknitsch) Update Readme
- (patricknitsch) Fix Issues from RepoChecker

### 0.5.1 (2026-03-18)

- (copilot) Fix issue with configuration button in Tab

### 0.5.0 (2026-03-17)

- (copilot) Add `admin/tab.html` control panel with green theme, i18n (DE/EN), live status banner, quick modes, temperature control, vacation, schedule viewer and configuration button
- (copilot) Status banner now shows energy consumption for today (kWh)
- (copilot) Instance selector removed — instance is auto-detected from the `?instance=N` URL parameter passed by Admin 7

### 0.4.3 (2026-03-06)

- (patricknitsch) Fix adapter type in io-package.json

### 0.4.2 (2026-03-06)

- (claude) Fixed object hirarchy
- (patricknitsch) Update Readme

### 0.4.1 (2026-02-26)

- (patricknitsch) Update Packages and Workflow

### 0.4.0 (2026-02-11)

- (claude) Fallback if Devices or Cloud offline

### 0.3.2 (2026-01-31)

- (patricknitsch) Update from git to https

### 0.3.1 (2026-01-31)

- (patricknitsch) Add Mode Frost Protection
- (patricknitsch) Show Enum instead of Regulation Number

### 0.3.0 (2026-01-31)

- (patricknitsch) Update Readme
- (patricknitsch) Verify Polling if Thermostat give no Response
- (patricknitsch) Complete Refactoring to handle functions better
- (patricknitsch) encrypt all sensitive credentials -> Relogin necessary
- (patricknitsch) Code Fixing for latest repo

### 0.2.4 (2026-01-28)

- (patricknitsch) Change Format of Times

### 0.2.3 (2026-01-28)

- (patricknitsch) Catch wrong values for Temperature and Regulation Mode

### 0.2.2 (2026-01-28)

- (patricknitsch) Update setStates for ComfortMode
- (patricknitsch) More Debugging

### 0.2.1 (2026-01-28)

- (patricknitsch) Fix JsonConfig

### 0.2.0 (2026-01-28)

- (patricknitsch) add automatic Refresh of Token after Error 403
- (patricknitsch) fix max Value of Regulation Mode to 9 for error preventing
- (patricknitsch) improve Handling of Mode Settings

### 0.1.1 (2026-01-28)

- (patricknitsch) updated Readme

### 0.1.0 (2026-01-28)

- (patricknitsch) initial release
- (patricknitsch) fetch data and write in Datapoints
- (patricknitsch) functional version with Energy and settable functions

##

## License

MIT License

Copyright (c) 2026 patricknitsch <patricknitsch@web.de>

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
