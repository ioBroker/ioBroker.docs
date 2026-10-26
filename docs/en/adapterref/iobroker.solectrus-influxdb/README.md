---
chapters: {"pages":{"en/adapterref/iobroker.solectrus-influxdb/README.md":{"title":{"en":"ioBroker.solectrus-influxdb"},"content":"en/adapterref/iobroker.solectrus-influxdb/README.md"},"en/adapterref/iobroker.solectrus-influxdb/docs/en/README.md":{"title":{"en":"SOLECTRUS InfluxDB Adapter -- Documentation"},"content":"en/adapterref/iobroker.solectrus-influxdb/docs/en/README.md"}}}
---
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

[🇺🇸 Documentation](/#/docs/adapterref/iobroker.solectrus-influxdb/docs/en/README.md)

[🇩🇪 Dokumentation](https://github.com/patricknitsch/ioBroker.solectrus-influxdb/blob/main/docs/de/README.md)

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
### 2.3.0 (2026-10-21)
* **ADAPTER MEETS ioBroker SECRETS**
* (patricknitsch) ioBroker secrets (credentials of the Admin settings, Admin 8 and newer) can now be used for the InfluxDB connection: a credential "Login & password" provides URL (login) and token (password)
* (patricknitsch) The InfluxDB port now has its own field (default 8086); existing settings are taken over automatically

### 2.2.2 (2026-10-19)
* (patricknitsch) Backups can now also be stored on a WebDAV server (e.g. Nextcloud) and restored from there
* (patricknitsch) Update Dependencies

### 2.2.1 (2026-10-13)
* (patricknitsch) Release without function. Deploying for 2.2.0 failed.

### 2.2.0 (2026-10-13)
* (patricknitsch) Formula engine: values that are only used internally can get their own alive timeout; stale inputs are shown in the overview tab under Formula Engine. If an enabled sensor uses the value, the sensor takes precedence
* (patricknitsch) Formula engine: alive monitoring can be turned off per input, e.g. for values that are only written on change; the value is still used in the calculation
* (patricknitsch) Alive monitoring of sensors fed by the formula engine now also checks the input values of the formula; stale inputs are marked in the overview tab

### 2.1.0 (2026-10-12)
* (patricknitsch) Add new SOLECTRUS car sensors for multiple vehicles (`CAR_BATTERY_SOC`, `CAR_ODOMETER`, `CAR_RANGE`, `CAR_CONNECTED`, `CAR_LATITUDE`, `CAR_LONGITUDE`, suffix `_1`–`_5`) (#209 and #212)
* (patricknitsch) Default sensors are sorted into the folders of the HELIOS sensor overview
* (patricknitsch) New default sensors are added disabled to existing instances on start; deleted ones do not come back
* (patricknitsch) New sensor option "Write only on change": the value is written when the source changes, with the time of the change (#212)
* (patricknitsch) Fix DS warning "Tick time budget exceeded": the budget now covers only the evaluation, not the snapshot reads
* (patricknitsch) Add Node.js 26 in test-and-release.yml
* (patricknitsch) Add guide for contributors working with Claude Code (CLAUDE.md)
* (patricknitsch) Update Dependencies

**Older changelog entries can be found in CHANGELOG_OLD.md.**

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