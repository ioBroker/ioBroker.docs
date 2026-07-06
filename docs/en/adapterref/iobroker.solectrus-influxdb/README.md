# ioBroker.solectrus-influxdb

[![NPM version](https://img.shields.io/npm/v/iobroker.solectrus-influxdb.svg)](https://www.npmjs.com/package/iobroker.solectrus-influxdb)
[![Downloads](https://img.shields.io/npm/dm/iobroker.solectrus-influxdb.svg)](https://www.npmjs.com/package/iobroker.solectrus-influxdb)
![Number of Installations](https://iobroker.live/badges/solectrus-influxdb-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/solectrus-influxdb-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.solectrus-influxdb.png?downloads=true)](https://nodei.co/npm/iobroker.solectrus-influxdb/)

**Tests:** ![Test and Release](https://github.com/patricknitsch/ioBroker.solectrus-influxdb/workflows/Test%20and%20Release/badge.svg)

## 🌞 SOLECTRUS InfluxDB Adapter for ioBroker

![ioBroker](https://img.shields.io/badge/ioBroker-Adapter-blue)
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20-green)
![InfluxDB](https://img.shields.io/badge/InfluxDB-2.x-orange)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

---

## Overview
The SOLECTRUS InfluxDB Adapter stores selected ioBroker states into an InfluxDB 2.x database and optionally computes derived values using a built-in formula engine.

It is designed for energy monitoring systems such as photovoltaic installations, battery storage, heat pumps, wallboxes, grid import/export monitoring, and custom sensors.

### Features

- **Sensor Mapping** -- Map any ioBroker state to an InfluxDB measurement/field with configurable data type (int, float, bool, string)
- **Reliable Buffering** -- Persistent write buffer (up to 100k points) survives InfluxDB outages and adapter restarts
- **Data-SOLECTRUS Formula Engine** (optional) -- Compute derived values from multiple inputs using formulas, source mirroring, or rule-based state machines
- **State Machine Mode** -- Generate string/boolean states from rule conditions (first-match-wins), ideal for status labels and operating modes
- **Formula Builder** -- Visual editor with drag-and-drop building blocks, live preview, operator tooltips, and example patterns
- **Folder Grouping** -- Organize computed values into folders for better overview

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
- Node.js >= 20
- InfluxDB 2.x

---

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.8.6 (2026-05-25)
* (copilot) Fixes for Repo Checker

### 1.8.5 (2026-05-23)
* (copilot) Add Icons in Notification

### 1.8.4 (2026-05-23)
* (patricknitsch) Fix missing unit in Formula-Engine

### 1.8.3 (2026-05-21)
* (copilot) Modify notification manager to work with instances
* (copilot) Update Dependencies

### 1.8.2 (2026-05-03)
* (copilot) Adapter requires node.js >= 22 now
* (copilot) Fix sensor duplicate: stale draft cache caused wrong sensor data to appear in the detail panel after duplicating or deleting a sensor
* (copilot) Update Dependencies

**Older changelog entries can be found in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).**## License

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
