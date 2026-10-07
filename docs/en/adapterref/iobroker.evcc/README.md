![Logo](admin/evcc.png)
# ioBroker.evcc

[![NPM version](https://img.shields.io/npm/v/iobroker.evcc.svg)](https://www.npmjs.com/package/iobroker.evcc)
[![Downloads](https://img.shields.io/npm/dm/iobroker.evcc.svg)](https://www.npmjs.com/package/iobroker.evcc)
![Number of Installations (latest)](https://iobroker.live/badges/evcc-installed.svg)
![Number of Installations (stable)](https://iobroker.live/badges/evcc-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.evcc.png?downloads=true)](https://nodei.co/npm/iobroker.evcc/)

**Tests:** ![Test and Release](https://github.com/Newan/ioBroker.evcc/workflows/Test%20and%20Release/badge.svg)

## evcc adapter for ioBroker

Controll evcc over rest api

Forum: https://forum.iobroker.net/topic/49165/neuer-adapter-iobroker-evcc

## Charge mode (evcc >= 0.316.0)

evcc 0.316.0 renamed the mode `pv` to `smart` and replaced `minpv` with the separate setting `alwaysCharge`
([evcc PR #32490](https://github.com/evcc-io/evcc/pull/32490)). The adapter detects the evcc version automatically
and keeps working with older versions.

| State | Values | Note |
|---|---|---|
| `loadpoint.X.control.off` / `.now` / `.smart` | button | set mode |
| `loadpoint.X.control.alwaysCharge` | `off`, `on`, `once` | evcc >= 0.316.0 only, `once` resets when the vehicle is disconnected |
| `loadpoint.X.control.pvControl` | `0` off, `1` smart, `2` smart + always charge, `3` now | now also reflects the current evcc mode |
| `loadpoint.X.control.pv` / `.min` | button | deprecated, mapped to smart + alwaysCharge off / on |

**Breaking for scripts/visualizations:** with evcc >= 0.316.0, `loadpoint.X.status.mode` reports `smart` instead of `pv`/`minpv`.
Use `loadpoint.X.status.alwaysCharge` or `loadpoint.X.control.pvControl` to distinguish the former min+pv mode.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
* (arteck) Dependencies have been updated

### 0.3.0 (2026-10-02)
* (Schimi1983) support evcc 0.316 mode redesign: new `control.smart` and `control.alwaysCharge`, `pvControl` reflects the evcc mode
* (Schimi1983) fix: request timeout was sent as POST body and never applied
* (arteck) Dependencies have been updated

### 0.2.10 (2026-07-15)
* (arteck) add configurable weather forcast grid

### 0.2.9 (2026-07-15)
* (arteck) add grid request

### 0.2.8 (2026-03-09)
* (arteck) reduce read request, static dp read only once

### 0.2.7 (2026-03-09)
* (arteck) delete big arrays feedin, grid, planner
* (arteck) refactor tests

## License
MIT License

Copyright (c) 2025-2026 Newan <info@newan.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and asSociated documentation files (the "Software"), to deal
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