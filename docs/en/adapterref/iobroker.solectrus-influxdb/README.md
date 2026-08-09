# ioBroker.solectrus-influxdb

[![NPM version](https://img.shields.io/npm/v/iobroker.solectrus-influxdb.svg)](https://www.npmjs.com/package/iobroker.solectrus-influxdb)
[![Downloads](https://img.shields.io/npm/dm/iobroker.solectrus-influxdb.svg)](https://www.npmjs.com/package/iobroker.solectrus-influxdb)
![Number of Installations](https://iobroker.live/badges/solectrus-influxdb-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/solectrus-influxdb-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.solectrus-influxdb.png?downloads=true)](https://nodei.co/npm/iobroker.solectrus-influxdb/)

**Tests:** ![Test and Release](https://github.com/patricknitsch/ioBroker.solectrus-influxdb/workflows/Test%20and%20Release/badge.svg)

## 🌞 SOLECTRUS InfluxDB Adapter for ioBroker

![ioBroker](https://img.shields.io/badge/ioBroker-Adapter-blue)
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D22-green)
![InfluxDB](https://img.shields.io/badge/InfluxDB-2.x-orange)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

---

## Overview
The SOLECTRUS InfluxDB Adapter stores selected ioBroker states into an InfluxDB 2.x database and optionally computes derived values using a built-in formula engine.

It is designed for energy monitoring systems such as photovoltaic installations, battery storage, heat pumps, wallboxes, grid import/export monitoring, and custom sensors.

### Features

- **Sensor Mapping** -- Map any ioBroker state to an InfluxDB measurement/field with configurable data type (int, float, bool, string)
- **Internal Sensors** -- Mirror and monitor states without writing them to InfluxDB
- **Reliable Buffering** -- Persistent write buffer (up to 100k points) survives InfluxDB outages and adapter restarts
- **Data-SOLECTRUS Formula Engine** (optional) -- Compute derived values from multiple inputs using formulas, source mirroring, or rule-based state machines
- **State Machine Mode** -- Generate string/boolean states from rule conditions (first-match-wins), ideal for status labels and operating modes
- **Formula Builder** -- Visual editor with drag-and-drop building blocks, live preview, operator tooltips, and example patterns
- **Folder Grouping** -- Organize sensors and computed values into folders for better overview
- **Built-in Backup** -- Create, upload, restore, download and delete local backups of the instance config, sensors and Data-SOLECTRUS items right from the **Backup** tab, no other adapter required

### Quick Start

1. Install the adapter via the ioBroker admin UI
2. Configure InfluxDB connection (URL, Organization, Bucket, Token) on the **InfluxDB** tab
3. Map your ioBroker states on the **Sensors** tab
4. (Optional) Enable **Data-SOLECTRUS** checkbox to unlock the formula engine with **Data Values** and **Data Runtime** tabs
5. Save and start the adapter

---

## Documentation

[🇺🇸 Documentation](./docs/en/README.md)

[🇩🇪 Dokumentation](./docs/de/README.md)

---

### Requirements
- ioBroker >= latest stable
- **ioBroker.admin >= 8.0.0** - **required since v2.0.0**, the admin UI no longer works on Admin 6/7 (see Changelog)
- Node.js >= 22
- InfluxDB 2.x

---

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.0.1 (2026-08-04)
* (patricknitsch) **BREAKING CHANGE:** Requires ioBroker.admin 8 (currently Alpha) or newer. Admin 8 introduced a new "GUI API generation" for custom jsonConfig components (React 19 / MUI 9, `@iobroker/gui-components`) with no backward compatibility, so the Sensors, Data Values and Backup tabs no longer load on Admin 6/7. Do **not** update to this version unless ioBroker.admin has already been updated to version 8.
* (patricknitsch) Fix Sensor Overview Format
* (patricknitsch) Fix missing unit in Formula Engine
* (patricknitsch) Split internal and external Sensors in Overview
* (patricknitsch) Update Doc

### 2.0.0 (2026-08-03)
* (patricknitsch) **BREAKING CHANGE:** Requires ioBroker.admin 8 (currently Alpha) or newer. Admin 8 introduced a new "GUI API generation" for custom jsonConfig components (React 19 / MUI 9, `@iobroker/gui-components`) with no backward compatibility, so the Sensors, Data Values and Backup tabs no longer load on Admin 6/7. Do **not** update to this version unless ioBroker.admin has already been updated to version 8.
* (patricknitsch) Rebuild the admin UI (sensors editor, Data-SOLECTRUS items editor, backup panel) as a proper Vite + Module Federation build (`src-admin/`) targeting `@iobroker/gui-components`, replacing the hand-written vanilla-JS Module Federation containers
* (patricknitsch) Log a clear error and set `info.lastError` at startup if the installed ioBroker.admin is below version 8, so an incompatible setup is immediately visible instead of a silent/confusing failure in the config dialog
* (patricknitsch) Cleanup i18n
* (copilot) Fix timeout for Backup Manager

### 1.12.0 (2026-07-08)
* (patricknitsch) Final Release

### 1.12.0-beta.1 (2026-07-08)
* (patricknitsch) Fix `npm run check` (tsc type-checking of the JSDoc-typed JS codebase) so it passes cleanly again
* (patricknitsch) Improve JSDoc type coverage across `dsProxy.js`, `jsonpath.js`, `stateMachine.js` and `helpers.js`
* (patricknitsch) Resolve all remaining ESLint JSDoc warnings (`npm run lint` is now warning-free)

### 1.12.0-beta.0 (2026-07-05)
* (patricknitsch) Update Dependencies
* (patricknitsch) Add built-in **Backup** tab: create/upload/restore/download/delete local backups of the instance config, sensors and Data-SOLECTRUS items, with a configurable storage location (InfluxDB token is excluded and must be re-entered after a restore)
* (patricknitsch) Add **Enable iFrame dashboard** checkbox: gates both the iFrame config tab and the Dashboard tab in the sensor overview (tab.html); reuse **Enable notifications** as the single switch that both activates notifications and reveals the Notifications tab

**Older changelog entries can be found in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).**

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
