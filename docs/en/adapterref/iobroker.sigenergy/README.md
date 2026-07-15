# ioBroker Sigenergy Adapter

[![NPM version](https://img.shields.io/npm/v/iobroker.sigenergy.svg)](https://www.npmjs.com/package/iobroker.sigenergy)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Adapter for [Sigenergy](https://www.sigenergy.com) solar energy systems via Modbus TCP/RTU**

Supports the Sigenergy Modbus Protocol V2.9 (released 2026-05-13).

---

<p align="center">
  <a href="https://www.buymeacoffee.com/ssbingo"><img src="https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=&slug=ssbingo&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></a>
</p>

---

## Features

- 📡 **Modbus TCP** (Ethernet / WLAN / Optical fiber / 4G) — Port 502
- 🔗 **Modbus RTU** (RS485 Serial)
- ⚡ **Full register support** — All plant, inverter, PSS and PID registers per V2.9 spec
- 🔋 **Battery statistics** — Time to full, time remaining, daily coverage
- ☀️ **PV statistics** — Self-consumption rate, autarky rate
- 🔌 **AC Charger** (Sigen EVAC) — Optional
- ⚡ **DC Charger** — Optional
- 🏗️ **PSS** (Power Station Switch) — Optional, MV/LV switchgear and distribution cabinet monitoring
- 🔍 **PID** (PV Insulation Detection) — Optional
- 🌡️ **ESS Preheating** — TOU schedule, 30 configurable time windows (M1-HYA/HYB)
- 📈 **Extended registers** — Smart loads 1–24, cumulative energy, grid code parameters
- ☀️ **SigenMicro** — Micro-inverter support (auto-scan)
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
| PSS (Power Station Switch) | **5** (default, configurable) |
| PID (PV Insulation Detection) | **6** (default, configurable) |

---

## Device Types

Since v2.4.0 every adapter instance handles exactly **one** Sigenergy system type (strict either/or).
Select the type in the Components tab — or use **Auto-detect from device** to read it from the hardware.
Register sets are gated per the model footnotes of the official Modbus Protocol V2.9:

| Capability | SigenStor | Sigen Hybrid | Sigen PV M1-HYB | PV-only (PV Max) | SigenMicro-only |
|---|---|---|---|---|---|
| ESS / battery registers | always | optional | optional | — | — |
| DC charger | ✓ | ✓ | — | — | — |
| Grid code (40051-40068) | ✓ | ✓ | — | — | — |
| ESS preheating (50000-50183) | — | — | ✓ | — | — |
| PCC power factor (40157/40158) | — | — | ✓ | — | — |
| Plant registers (slave 247) | ✓ | ✓ | ✓ | ✓ | — |
| SigenMicro micro-inverters | optional | optional | optional | optional | ✓ |

One Modbus endpoint (IP/bus) = one instance. A SigenStor with additional SigenMicro micro-inverters
belongs in a **single** instance — the micros are an additive component, not a separate type.
Existing pre-2.4.0 configurations are migrated automatically (derived type is logged on startup —
please review the Components tab once).

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
- PSS (Power Station Switch)
- PID (PV Insulation Detection)
- ESS Preheating (M1-HYA/HYB only)
- SigenMicro (micro-inverters)

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

## Emergency Switching — Protecting External PV Systems

### Background

Sigenergy hybrid inverters include an optional **emergency power gateway** that automatically switches to off-grid / island mode when the utility grid fails. In this mode, the Sigenergy system creates its own local AC grid powered by the battery.

If a **second PV system** — such as a balcony power plant, a micro-inverter, or a third-party string inverter — is connected to the same household circuit, it will continue feeding power into this isolated local grid. Most grid-tied inverters are not designed for this situation and may:

- overload the Sigenergy battery management
- cause voltage or frequency instability on the island grid
- be damaged by the unusual operating conditions

The only safe solution is to **immediately disconnect** the external system when Sigenergy enters off-grid mode.

### How the adapter handles this

The adapter monitors the `plant.onOffGridStatus` state every poll cycle.

**On grid failure** (`onOffGridStatus` = 1 or 2):
- All configured emergency devices are switched instantly
- A Telegram notification is sent (optional)

**On grid return** (`onOffGridStatus` = 0):
- A configurable stability timer starts (default: 10 minutes)
- If the grid remains stable for the full duration, devices are restored
- If the grid fails again during the timer, the timer is discarded and devices remain off
- A Telegram notification is sent on successful restoration (optional)

### Enabling the feature

**Step 1 — Components tab**  
Check **Emergency Gateway (off-grid switching)**.  
The *Emergency Switching* tab becomes visible.

**Step 2 — Emergency Switching tab**

#### Devices

| Field | Description |
|---|---|
| **Stable delay (minutes)** | How long the grid must remain stable before switching devices back on. 10 minutes is recommended. |
| **Device 1 — Object ID** | The ioBroker state ID of the main switch for the external system. Set to `false` on grid failure; `true` after stable recovery. |
| **Devices 2–4 — Object ID** | Additional optional devices. |
| **Devices 2–4 — Direction** | *OFF on failure, ON after recovery* or *ON on failure, OFF after recovery*. |

#### Telegram notifications (optional)

| Field | Description |
|---|---|
| **Enable Telegram notification** | Activates notifications on grid failure and recovery. |
| **Telegram instance** | Select the `telegram.x` adapter instance to use. |
| **Chat ID** | Optional: restrict to a specific chat. Leave empty to send to all configured chats. |

### Example — Balcony power plant

A Shelly Plus 1 relay is wired in series with the balcony power plant's supply cable. Its ioBroker state ID is `shelly.0.SHPLUS1-ABC123.Relay0.Switch`.

Configuration:
- **Device 1**: `shelly.0.SHPLUS1-ABC123.Relay0.Switch`  
  → Relay opens (`false`) on grid failure, closes (`true`) after stable recovery

The balcony power plant is now automatically protected.

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

### 3.0.10 (2026-06-29)
- (ssbingo) chore: bump js-yaml from 4.1.1 to 4.3.0

### 3.0.9 (2026-06-29)
- (ssbingo) chore: pin CI actions to major version (@v1) instead of patch version

### 3.0.8 (2026-06-29)
- (ssbingo) fix: add missing i18n translations for SigenMicro scan UI strings (es, fr, it, nl, pl, pt, uk, zh-cn)

### 3.0.7 (2026-06-28)
- (ssbingo) chore: update dependencies (@iobroker/adapter-core 3.4.1, @types/node 22.20.0, testing-action-adapter 1.1.1, testing-action-deploy 1.5.0, http-proxy-middleware 3.0.7)

### 3.0.6 (2026-06-14)
- (ssbingo) fix: remove duplicate common.license field — licenseInformation already present

### 3.0.5 (2026-06-14)
- (ssbingo) fix: add missing license field to io-package.json common block

### 3.0.4 (2026-06-14)
- (ssbingo) fix: emergency Telegram notification now sent only once per grid-failure event (not repeated every poll); device switching limited to 3 attempts max (initial + 2 retries) while off-grid

### 3.0.3 (2026-06-13)
- (ssbingo) fix: remove non-functional welcomeText from io-package.json; add visible warning staticText in Emergency Switching config tab (yellow box, i18n in all 11 languages)

### 3.0.2 (2026-06-13)
- (ssbingo) fix: ESLint/Prettier errors in emergency switching methods — remove unused variable, fix indentation, add JSDoc @param types

### 3.0.1 (2026-06-13)
- (ssbingo) feat: add welcomeText to io-package.json — multilingual notice about emergency gateway switching feature

### 3.0.0 (2026-06-13)
- (ssbingo) feat: emergency gateway switching — automatic disconnection of external PV systems (balcony power plants, micro-inverters) on grid failure; configurable stability timer on grid return; optional Telegram notifications
- (ssbingo) docs: emergency switching documentation added in all 11 languages

### 2.5.2 (2026-06-12)
- (ssbingo) fix: URL-encode spaces in Buy Me a Coffee button src — image was not rendering on GitHub

### 2.5.1 (2026-06-12)
- (ssbingo) fix: correct instanceObject role for info.modelType from 'info.name' to 'text' (W1133/W1135 adapter-checker warnings)

### 2.5.0 (2026-06-12)

- (ssbingo) Architectural write safety: Modbus writes are rejected in the write dispatcher itself when the target register is not valid for the configured device type (models gating in onStateChange, plant guard for SigenMicro-only)
- (ssbingo) TypeScript type check fixed — new `lib/adapter-config.d.ts` with full AdapterConfig declaration, typed modbus-serial constructor, ioBroker.CommonType/SettableObject annotations; new `npm run check` script passes with 0 errors
- (ssbingo) ESLint configuration allows JSDoc `@type` tags in this checked-JavaScript project (jsdoc/check-tag-names with typed:false)

### 2.4.0 (2026-06-12)

- (ssbingo) Device type architecture: mandatory selector (SigenStor / Sigen Hybrid / Sigen PV M1-HYB / PV-only inverter / SigenMicro-only) with strict either/or register gating per protocol V2.9 model footnotes
- (ssbingo) Sigen Hybrid and PV-only inverters (Sigen PV / PV Max) officially supported
- (ssbingo) Auto-detect device type from hardware in the admin UI (registers 30500 / 31024)
- (ssbingo) Model verification on startup — warns when configuration and detected hardware mismatch (new state info.modelType)
- (ssbingo) Dynamic PV string registers: PV5-PV16 voltage/current enabled by the string count reported in register 31025
- (ssbingo) PCC power factor controls (40157/40158) gated to Sigen PV M1-HYB; ESS preheating gated to M1-HYB; DC charger and grid code gated to SigenStor/Sigen Hybrid
- (ssbingo) Automatic migration of pre-2.4.0 configurations and cleanup of channels that are invalid for the selected device type

### 2.3.4 (2026-06-12)
- (ssbingo) fix: correct protocol level detection — use proper register quantities for probes, descend from V2.9 to V2.6, distinguish transport errors from device exceptions to avoid false pre-V2.6 report

### 2.3.3 (2026-06-11)
- (ssbingo) fix: suppress repeated register read warnings after first occurrence for plant/inverter/acCharger/dcCharger/pss/pid; subsequent failures log at debug level only

### 2.3.2 (2026-06-10)
- (ssbingo) fix: show 'pre-V2.6' instead of 'unknown' when device responds but has no extended plant registers; add per-probe debug log with Modbus exception message

### 2.3.1 (2026-06-10)
- (ssbingo) feat: detect Modbus protocol level on startup by probing registers 30088/30200/30228/30286; read firmware version (30525); log result and store as info.protocolLevel state

### 2.3.0 (2026-06-10)
- (ssbingo) feat: add common.states enum maps for emsWorkMode/runningState/remoteEmsMode/dcCharger.runningState; wire PSS/PID/AC Charger write registers (FC06/FC10) with subscribe and onStateChange handlers

### 2.2.7 (2026-06-10)
- (ssbingo) fix: add missing native defaults enableSmartLoads/enableCumulativeEnergy/enableGridCode to io-package.json
- (ssbingo) fix: update register 30003 desc with V2.7 EMS modes 5 (FullFeedIn) and 9 (Custom)

### 2.2.6 (2026-06-10)
- (ssbingo) feat: V2.9 register audit — add missing register 30279 (current control command value), move DC Charger PV registers 31509/31511 to dcCharger namespace, fix ESS Preheating TOU time gain (null→1)
- (ssbingo) feat: implement control write-back for plant.control.*, plant.gridCode.*, inverter.control.*, dcCharger.control.* (FC06/FC10); read RW holding registers on startup
- (ssbingo) fix: suppress repeated ESS Preheating warn after device reports unsupported registers; downgrade control register startup read errors to debug

### 2.2.4 (2026-06-10)
- (ssbingo) fix: implement ESS Preheating TOU polling (FC03, 50000–50183, 94 registers) and write-back via onStateChange; add encodeValue to ModbusConnection

### 2.2.3 (2026-06-10)
- (ssbingo) fix: add 25 missing admin i18n keys for PSS, PID, ESS Preheating, Extended Registers across all 11 languages

### 2.2.2 (2026-06-09)
- (ssbingo) docs: update all READMEs to Modbus Protocol V2.9 — add PSS, PID, ESS Preheating, Extended Registers, SigenMicro; correct protocol version reference

### 2.2.1 (2026-06-09)
- (ssbingo) fix: correct PSS register table to 122 entries per official spec V2.9 (addresses, gains, types); fix PSS write registers to 6 WO entries; fix PID registers 33055-33060 (types, gains, 2 missing entries)

### 2.2.0 (2026-06-09)
- (ssbingo) feat: PSS (Power Station Switch) and PID (PV Insulation Detection) support; ESS Preheating TOU schedule registers; new admin options for PSS/PID slave IDs

### 2.1.1 (2026-06-09)
- (ssbingo) fix: wire feature flags (enableSmartLoads, enableCumulativeEnergy, enableGridCode) into polling and object creation; add Extended Registers admin tab

### 2.1.0 (2026-06-09)
- (ssbingo) feat: extended statistics — plant statistics (30088–30097), smart loads 1–24 (30098–30193), cumulative energy (30194–30271), adjustment feedback (30613–30619), grid code parameters (40049–40068)

### 2.0.0 (2026-06-09)
- (ssbingo) feat: Modbus Protocol V2.9 — new plant/inverter/DC charger registers, remove deprecated registers, extend enums


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
