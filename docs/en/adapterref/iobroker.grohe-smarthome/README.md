# ioBroker.grohe-smarthome

[![NPM version](https://img.shields.io/npm/v/iobroker.grohe-smarthome.svg)](https://www.npmjs.com/package/iobroker.grohe-smarthome)
[![Downloads](https://img.shields.io/npm/dm/iobroker.grohe-smarthome.svg)](https://www.npmjs.com/package/iobroker.grohe-smarthome)
![Number of Installations](https://iobroker.live/badges/grohe-smarthome-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/grohe-smarthome-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.grohe-smarthome.png?downloads=true)](https://nodei.co/npm/iobroker.grohe-smarthome/)

**Tests:** ![Test and Release](https://github.com/patricknitsch/ioBroker.grohe-smarthome/workflows/Test%20and%20Release/badge.svg)

# ioBroker Grohe Smarthome Adapter
<img align="left" src="admin/grohe-smarthome.png" alt="image" width="200"/>
This adapter connects ioBroker to the <strong>Grohe Smarthome / Ondus</strong> cloud and exposes Grohe devices as states (and some controls) inside ioBroker.

It supports:

- **Grohe Sense** (type `101`)
- **Grohe Sense Guard** (type `103`)
- **Grohe Blue Home** (type `104`)
- **Grohe Blue Professional** (type `105`)

The adapter logs in via Grohe’s OIDC/Keycloak flow, stores a **refresh token encrypted** in a state, and polls the Grohe cloud API on a configurable interval.

Ideas and Concept came from the Home-Assistant Integration **ha-grohe_smarthome**. Special thanks goes to **Flo-Schilli**. 

---

## Documentation

[🇺🇸 Documentation](./docs/en/README.md)

[🇩🇪 Dokumentation](./docs/de/README.md)

---

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.3.3 (2026-03-25)

* (patricknitsch) Clamp tapAmount between 50 and 2000 ml.

### 0.3.2 (2026-03-21)

* (copilot) Update Admin Tap for Blue systems
* (patricknitsch) Fix Isues from RepoChecker

### 0.3.1 (2026-03-18)
* (claude/patricknitsch) Fix admin tab controls not triggered after confirmation – replace native `confirm()` with custom modal dialog (works inside ioBroker iframe)
* (claude/patricknitsch) Fix 4 wrong state IDs in admin tab (Close Valve, Pressure Measurement, Reset CO₂, Reset Filter)

### 0.3.0 (2026-03-18)

* (claude/patricknitsch) Add card-based device overview tab with controls
* (claude/patricknitsch) Add Valve, Pressure Measurement and Dispense controls in admin tab
* (claude/patricknitsch) Disable controls when device is offline
* (claude/patricknitsch) Adjust color scheme in admin tab (white/black based on light/dark mode)
* (patricknitsch) Update Packages

### 0.2.6 (2026-03-11)

* (claude/patricknitsch) Fix measurement "Filter" for Blue Systems
* (claude/patricknitsch) Fix permanent dispense without Trigger

### 0.2.5 (2026-02-26)

* (patricknitsch) Update Admin Package

### 0.2.4 (2026-02-25)

* (patricknitsch) Fix Points for Latest Repo
* (patricknitsch) Update Packages

### 0.2.3 (2026-02-15)

* (claude) Fix no correct messages

### 0.2.2 (2026-02-12)
 * (claude) Fix Problem with jsonConfig and Interval

### 0.2.1 (2026-02-11)
* (patricknitsch) Change Log for measurement

### 0.2.0 (2026-02-10)

* (claude) Extend Error Handling for noon and midnight

### 0.1.7 (2026-02-09)

* (patricknitsch) Update Error Handling
* (patricknitsch) Update Readme

### 0.1.6 (2026-02-09)

* (patricknitsch) Changed Loglevel
* (claude) Update Error Handling -> increase Try-Timeouts

### 0.1.5 (2026-02-09)

* (patricknitsch) Update Dependencies

### 0.1.4 (2026-02-09)

* (claude) Fix wrong value for Grohe Blue remainingFilter
* (claude) Update Readme

### 0.1.3 (2026-02-08)

* (claude) Fix null of Total Consumption
* (claude) Update Readme

### 0.1.2 (2026-02-07)

* (patricknitsch) Update Readme and Translations

### 0.1.1 (2026-02-07) 
* (claude) Rate limiting awareness (HTTP 403 handling)
* (claude) Immediate state readback after commands
* (claude) Optimized polling with tiered API call frequency

### 0.1.0 (2026-02-07)
* (patricknitsch) initial release
* (claude) OAuth login via Grohe Keycloak with automatic token refresh
* (claude) Support for Sense, Sense Guard, Blue Home, Blue Professional
* (claude) Encrypted refresh token storage
* (claude) Optional raw measurement data states
* (claude) i18n support (EN/DE) for admin UI

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
