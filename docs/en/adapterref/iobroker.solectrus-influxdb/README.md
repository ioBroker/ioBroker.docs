# ioBroker.solectrus-influxdb

[![NPM version](https://img.shields.io/npm/v/iobroker.solectrus-influxdb.svg)](https://www.npmjs.com/package/iobroker.solectrus-influxdb)
[![Downloads](https://img.shields.io/npm/dm/iobroker.solectrus-influxdb.svg)](https://www.npmjs.com/package/iobroker.solectrus-influxdb)
![Number of Installations](https://iobroker.live/badges/solectrus-influxdb-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/solectrus-influxdb-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.solectrus-influxdb.png?downloads=true)](https://nodei.co/npm/iobroker.solectrus-influxdb/)

**Tests:** ![Test and Release](https://github.com/patricknitsch/ioBroker.solectrus-influxdb/workflows/Test%20and%20Release/badge.svg)

# 🌞 SOLECTRUS InfluxDB Adapter for ioBroker

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

[English Documentation](./docs/en/README.md)

[Deutsche Dokumentation](./docs/de/README.md)

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

### **WORK IN PROGRESS**

* (claude) Fix DS Tick time budget
* (patricknitsch) Update Admin Package

### 1.2.2 (2026-02-24)

* (claude) Synchronize Formal Engine with Repo from Felliglanz
* (claude) Add Warning after first start, if value is negative
* (claude) Add Comment on first page, that SOLECTRUS doesn't accept negative values
* (claude) Update Readme and Translations

### 1.2.1 (2026-02-13)

* (patricknitsch) Fix wrong package

### 1.2.0 (2026-02-13)

* (claude) Concurrent collect and flush without delay of 5s

### 1.1.2 (2026-02-13)

* (patricknitsch) Fix Eslint-Warnings

### 1.1.1 (2026-02-12)

* (patricknitsch) Fix Eslint-Errors

### 1.1.0 (2026-02-12)

* (claude) Add Formula Engine to build own sensors

### 1.0.0 (2026-01-31)

* (patricknitsch) change Config for Encryption -> Credentials must be re-entered

### 0.3.5 (2026-01-30)

* (patricknitsch) Using node:package format
* (patricknitsch) encrypt sensitive information -> Token must be re-entered
* (patricknitsch) onStateChange ignores ack flag
* (patricknitsch) creation of intermediate objects missing
* (patricknitsch) using this.setTimeout
* (patricknitsch) check and limit configurable timeouts/intervals
* (patricknitsch) Extend Readme

### 0.3.4 (2026-01-19)

* (patricknitsch) Update Readme and split it in two own docs

### 0.3.3 (2026-01-19)

* (patricknitsch) Try fixing automatic npm release

### 0.3.2 (2026-01-19)

* (patricknitsch) change Repo from ssh to https

### 0.3.1 (2026-01-19)

* (Felliglanz) Fix some issues in UI

### 0.3.0 (2026-01-18)

* (patricknitsch) Better handling of Influx Connection, also if no sensor is active
* (Felliglanz) Rebuild of UI with actual status of each sensor

### 0.2.0 (2026-01-18)

* (patricknitsch) Refactoring code and improve readability
* (patricknitsch) Buffer values and send to Influx if Influx is online
* (patricknitsch) Save max. 100000 values and send all to Influx if Influx is online again
* (patricknitsch) Split Data Collecting and Influx writing
* (patricknitsch) Updated Translations

### 0.1.5 (2026-01-17)

* (Felliglanz) Improve sensor configuration UI (accordion)

### 0.1.4 (2026-01-15)

* (patricknitsch) Bugfix with Icon

### 0.1.3 (2026-01-15)

* (patricknitsch) Bugfix for License
* (patricknitsch) Bugfix for Interval
* (patricknitsch) Synchronize Names, Measurements and Fields to SOLECTRUS Documentation

### 0.1.2 (2026-01-14)
* (patricknitsch) change UI to look for Source in Tree

### 0.1.1 (2026-01-14)
* (patricknitsch) add more Debugging
* (patricknitsch) optimize translation

### 0.1.0 (2026-01-14)
* (patricknitsch) initial release

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
