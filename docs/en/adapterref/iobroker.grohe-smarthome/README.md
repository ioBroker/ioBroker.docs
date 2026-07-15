# ioBroker.grohe-smarthome

[![NPM version](https://img.shields.io/npm/v/iobroker.grohe-smarthome.svg)](https://www.npmjs.com/package/iobroker.grohe-smarthome)
[![Downloads](https://img.shields.io/npm/dm/iobroker.grohe-smarthome.svg)](https://www.npmjs.com/package/iobroker.grohe-smarthome)
![Number of Installations](https://iobroker.live/badges/grohe-smarthome-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/grohe-smarthome-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.grohe-smarthome.png?downloads=true)](https://nodei.co/npm/iobroker.grohe-smarthome/)

![ioBroker](https://img.shields.io/badge/ioBroker-Adapter-blue)
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D22-green)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

**Tests:** ![Test and Release](https://github.com/patricknitsch/ioBroker.grohe-smarthome/workflows/Test%20and%20Release/badge.svg)

## ioBroker Grohe Smarthome Adapter
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
### 0.6.0 (2026-06-05)
* (copilot) Fixes Repo Checker
* (copilot) Change Raw-States to Bump Funktion for Debugging(see Doc.)
* (copilot) Fixes Problems Error 404
* (copilot) New functions for Grohe with Snooze, Withdrawal and Sprinkler
* (copilot) Extend Documentation

### 0.5.4 (2026-05-23)
* (copilot) Add latest Message for Notifications
* (copilot) Add Icons in Notifications

### 0.5.3 (2026-05-21)
* (copilot) Modify notification manager to work with instances
* (copilot) Update Dependencies

### 0.5.2 (2026-05-14)
* (patricknitsch) Fix Header when Device offline
* (patricknitsch) Add Icon and Online State on each Device
* (patricknitsch) Update Readme and Doc

### 0.5.1 (2026-05-09)
* (patricknitsch) Update Admin Dependency >= 7.6.23 for Device Manager
* Important Note: From 0.4.0 to 0.5.X the Sensor Overview is removed but visible. Thats a Bug from js-controller and should be fixed with 7.1.3

**Older entries can be found in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).**

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
