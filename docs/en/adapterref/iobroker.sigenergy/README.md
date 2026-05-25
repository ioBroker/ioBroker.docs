# ioBroker Sigenergy Adapter

[![NPM version](https://img.shields.io/npm/v/iobroker.sigenergy.svg)](https://www.npmjs.com/package/iobroker.sigenergy)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Adapter for Sigenergy solar energy systems via Modbus TCP/RTU**

Supports the Sigenergy Modbus Protocol V2.5 (released 2025-02-19).

---

## Features

- 📡 **Modbus TCP** (Ethernet / WLAN / Optical fiber / 4G) — Port 502
- 🔗 **Modbus RTU** (RS485 Serial)
- ⚡ **Full register support** — All plant and inverter registers per V2.5 spec
- 🔋 **Battery statistics** — Time to full, time remaining, daily coverage
- ☀️ **PV statistics** — Self-consumption rate, autarky rate
- 🔌 **AC Charger** (Sigen EVAC) — Optional
- ⚡ **DC Charger** — Optional
- 📊 **Calculated values** — Derived statistics updated each poll cycle
- 🖥️ **VIS Widgets** — Energy flow, battery status, statistics panels

---

## Supported Hardware

| Category         | Models |
|-----------------|--------|
| **Hybrid Inv.** | SigenStor EC SP/TP, Sigen Hybrid SP/TP/TPLV, Sigen PV M1-HYA, PG Controller |
| **PV Inv.**     | Sigen PV Max SP/TP, Sigen PV M1 |
| **EVAC (AC)**   | Sigen EVAC 7/11/22 kW, PG EVAC |

---

## Default Modbus Addresses

| Device | Address |
|--------|---------|
| Plant (read/write) | **247** |
| Plant broadcast (write, no reply) | **0** |
| Inverter | **1** |
| AC Charger (EVAC) | **2** |

---

## Configuration

### Connection Tab
- **Connection Type**: TCP (Ethernet) or Serial (RS485)
- **TCP Host**: IP address of your inverter
- **TCP Port**: 502 (default)
- **Plant Modbus ID**: 247 (default)
- **Inverter Modbus ID**: 1 (default)

### Components Tab
Select which devices are installed:
- Battery / ESS
- PV Panels
- AC Charger (EVAC)
- DC Charger

### Statistics Tab
Choose which statistical values to calculate:
- Battery time to full
- Battery time remaining
- Daily charge time
- Battery coverage time
- Self-consumption rate
- Autarky rate

---

## Data Objects

### Plant (`plant.*`)
| State | Description | Unit |
|-------|-------------|------|
| `plant.gridActivePower` | Grid power (>0 import, <0 export) | kW |
| `plant.pvPower` | PV generation | kW |
| `plant.essPower` | Battery power (<0 discharge) | kW |
| `plant.essSoc` | Battery state of charge | % |
| `plant.activePower` | Total plant active power | kW |
| `plant.runningState` | Plant state (0=Standby, 1=Running...) | - |

### Inverter (`inverter.*`)
| State | Description | Unit |
|-------|-------------|------|
| `inverter.pvPower` | PV power at inverter | kW |
| `inverter.essBatterySoc` | Battery SOC | % |
| `inverter.essBatterySoh` | Battery SOH | % |
| `inverter.essBatteryTemperature` | Battery temperature | °C |
| `inverter.phaseAVoltage` | Phase A voltage | V |
| `inverter.gridFrequency` | Grid frequency | Hz |

### Statistics (`statistics.*`)
| State | Description | Unit |
|-------|-------------|------|
| `statistics.batteryTimeToFull` | Minutes until battery full | min |
| `statistics.batteryTimeRemaining` | Minutes of battery left | min |
| `statistics.selfConsumptionRate` | Self-consumption rate | % |
| `statistics.autarkyRate` | Autarky rate | % |
| `statistics.housePower` | Calculated house consumption | kW |

---

## VIS Widgets

> **Note:** All 7 widgets are provided by the separate [ioBroker.vis-2-widgets-sigenergy](https://github.com/ssbingo/ioBroker.vis-2-widgets-sigenergy) adapter. Install it alongside this adapter to use the widgets in VIS-2.

### Energy Flow Widget
Shows animated energy flow between PV → Battery ↔ Grid → House.

### Battery Status Widget
Displays SOC bar, SOH badge, time to full/empty, current power.

### Power Overview Widget
Live reading of all four power flows.

### Statistics Widget
Today's autarky, self-consumption, SOC min/max, battery coverage time.

### Inverter Widget
Live inverter data: PV power, grid frequency, phase voltages, temperature.

### AC Charger Widget (EVAC)
Status and power readings for the Sigen EVAC charging station.

### DC Charger Widget
Status and power readings for the DC charger.

---

## Communication Protocol

- Modbus TCP: TCP mode, full duplex, port 502 (slave)
- Modbus RTU: Half duplex, 9600 bps, 8N1
- Min poll interval: 1000 ms (1 second) per Sigenergy spec
- Timeout: 1000 ms per Sigenergy spec

---

## Changelog

### 1.9.9 (2026-05-14)
- (ssbingo) chore: dependency bumps via Dependabot: protobufjs, @protobufjs/utf8, fast-uri
- (ssbingo) chore: requires Node.js >= 22 now

### 1.9.8 (2026-04-22)
- (ssbingo) fix: deduplicated connection/poll error logs to prevent log flooding and improve Sentry-readiness
- (ssbingo) fix: shutdown guards and extendForeignObject prevent race conditions on unload and with admin UI
- (ssbingo) fix: closed socket leak on Modbus timeout; testConnection pauses polling; removed empty control channels

### 1.9.7 (2026-04-16)
- (ssbingo) feat: added calculated states plant.pv1Power, plant.pv2Power, plant.pv3Power


### 1.9.6 (2026-04-16)
- (ssbingo) feat: added calculated states plant.pv1Power, plant.pv2Power, plant.pv3Power


### 1.9.5 (2026-04-08)
- (ssbingo) fix: removed unused common.schedule from io-package.json

### 1.9.4 (2026-04-08)
- (ssbingo) fix: Changelog / adding CHANGELOG_OLD.md

### 1.9.3 (2026-04-08)
- (ssbingo) fix remove admin/index.html

### 1.9.2 (2026-04-08)
- (ssbingo) fixes

### 1.9.1 (2026-04-08)
- (ssbingo) Fixed admin UI: removed legacy index.html/index_m.html/words.js; fixed jsonData type in jsonConfig sendTo buttons

### 1.9.0 (2026-03-26)
- (ssbingo) Test abgeschlossen

### 1.8.23 (2026-03-26)
- (ssbingo) Fixed copyright year to 2026 in LICENSE and README; technical corrections: CI/CD workflow, linting, tests

---

[Older changelogs can be found there](CHANGELOG_OLD.md)

## Documentation

- 🇩🇪 [Deutsche Dokumentation](doc/de/README.md)
- 🇷🇺 [Документация на русском](doc/ru/README.md)
- 🇳🇱 [Nederlandse documentatie](doc/nl/README.md)
- 🇫🇷 [Documentation française](doc/fr/README.md)
- 🇮🇹 [Documentazione italiana](doc/it/README.md)
- 🇪🇸 [Documentación en español](doc/es/README.md)
- 🇵🇱 [Dokumentacja polska](doc/pl/README.md)
- 🇵🇹 [Documentação portuguesa](doc/pt/README.md)
- 🇺🇦 [Документація українською](doc/uk/README.md)
- 🇨🇳 [简体中文文档](doc/zh-cn/README.md)

## License
MIT License

Copyright (c) 2026 ssbingo <s.sternitzke@online.de>

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
