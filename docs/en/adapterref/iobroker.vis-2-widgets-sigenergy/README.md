![Logo](admin/vis-2-widgets-sigenergy.png)
# ioBroker.vis-2-widgets-sigenergy

[![NPM version](https://img.shields.io/npm/v/iobroker.vis-2-widgets-sigenergy.svg)](https://www.npmjs.com/package/iobroker.vis-2-widgets-sigenergy)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-sigenergy.svg)](https://www.npmjs.com/package/iobroker.vis-2-widgets-sigenergy)
![Number of Installations](https://iobroker.live/badges/vis-2-widgets-sigenergy-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/vis-2-widgets-sigenergy-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.vis-2-widgets-sigenergy.png?downloads=true)](https://nodei.co/npm/iobroker.vis-2-widgets-sigenergy/)

**Tests:** ![Test and Release](https://github.com/ssbingo/ioBroker.vis-2-widgets-sigenergy/workflows/Test%20and%20Release/badge.svg)

## vis-2-widgets-sigenergy adapter for ioBroker

VIS-2 widget set for the Sigenergy energy storage adapter (`ioBroker.sigenergy`).
Contains 8 widgets for visualisation and control of energy flow, battery status, real-time power, daily statistics, AC charger, DC charger, inverter and SigenMicro micro-inverter overview.

## Requirements

- ioBroker with the `sigenergy` adapter installed and configured
- ioBroker VIS-2 adapter (≥ 2.0.0)

## Widgets

### Energy Flow Diagram
Displays the current energy flow between solar panels, battery, grid and house as an animated SVG diagram.
Animated arrows visualise active connections in real time.

**OIDs:** `pvPower`, `essPower`, `gridActivePower`, `housePower`, `essSoc`

![Energy Flow Diagram](img/widget-energiefluss.png)

#### Flow directions

| Data point | Value > 0 | Value < 0 |
|---|---|---|
| `essPower` | Battery charging → arrow from centre to battery | Battery discharging → arrow from battery to centre |
| `gridActivePower` | Grid consumption → arrow from grid to centre | Grid feed-in → arrow from centre to grid |
| `pvPower` | PV producing → arrow from PV to centre | — |
| `housePower` | House consuming → arrow from centre to house | — |

### Battery Status & Forecasts
Displays SOC, SOH, charging power and forecasts for time to full charge, remaining runtime, self-consumption and autarky rate.

**OIDs:** `essSoc`, `essSoh`, `essPower`, `batteryTimeToFull`, `batteryTimeRemaining`, `selfConsumptionRate`, `autarkyRate`

![Battery Status & Forecasts](img/widget-batterie.png)

### Real-Time Power
Compact list view of all current power values with colour-coded direction indicators.

**OIDs:** `pvPower`, `essPower`, `gridActivePower`, `housePower`, `essSoc`

![Real-Time Power](img/widget-leistung.png)

### Energy Statistics
Daily overview with autarky rate, self-consumption, SOC history, charge/discharge energy and battery coverage.

**OIDs:** `autarkyRate`, `selfConsumptionRate`, `dayMaxSoc`, `dayMinSoc`, `essDailyChargeEnergy`, `essDailyDischargeEnergy`, `batteryCoverageToday`, `batteryDailyChargeTime`

![Energy Statistics](img/widget-statistiken.png)

### AC Charger (Sigen EVAC)
Monitoring and control of the Sigenergy AC charger (EVAC). Shows charging power, system state, rated power, rated current and total energy consumed. Alarms are highlighted in colour. The state badge shows the simplified charging state according to IEC 61851-1 (Initialising, Free, Connected, Charging, Error); hovering over it reveals a detailed explanation of the current state. The charging current can be set directly via a slider (6 A up to the charger's rated current); the upper limit can additionally be capped with the widget setting `sig_maxCurrent`. While charging is active, the Start button is locked and the Stop button is highlighted.

**OIDs:** `acCharger.systemState`, `acCharger.chargingPower`, `acCharger.totalEnergyConsumed`, `acCharger.ratedPower`, `acCharger.ratedCurrent`, `acCharger.alarm1/2/3`, `acCharger.control.startStop`, `acCharger.control.outputCurrent`

![AC Charger](img/widget-ac-charger.png)

### DC Charger
Monitoring and control of the Sigenergy DC charger. Shows output power, vehicle SOC with progress bar, vehicle battery voltage, charging current and the energy and duration of the current charging session. The state badge shows the operating state of the charging station (`dcCharger.runningState`: free, connected/preparing, scheduled, charging, discharging, ended, warning, fault/unavailable); hovering over it reveals a detailed explanation. While charging or discharging is active, the Start button is locked and the Stop button is highlighted. If the state OID is not set, it is derived from the output power OID; without a state value the badge falls back to the output power and the tooltip explains why, depending on the protocol version detected by the adapter.

**OIDs:** `dcCharger.runningState`, `dcCharger.outputPower`, `dcCharger.vehicleSoc`, `dcCharger.vehicleBatteryVoltage`, `dcCharger.chargingCurrent`, `dcCharger.currentChargingCapacity`, `dcCharger.currentChargingDuration`, `dcCharger.control.startStop`, `info.protocolVersion` (`oid_protocol`)

![DC Charger](img/widget-dc-charger.png)

### Inverter
Comprehensive monitoring and control of the inverter with tab navigation. Displays operating state, power data, battery temperatures, phase voltages, all 5 alarm registers and device information (model, serial number, firmware).

| Tab | Content |
|---|---|
| **Power** | Active power, PV power, battery charge/discharge power, power share slider (−100 % to +100 %) |
| **Battery** | SOC & SOH with bars, avg. cell temperature/voltage, max./min. temperature |
| **Grid** | Phase voltages L1/L2/L3, grid frequency, power factor, PCS internal temperature |
| **Alarms** | 5 alarm registers (PCS ×2, ESS, gateway, DC charger) with hex code and colour marking |
| **Info** | Model type, serial number, firmware version, Remote-EMS toggle |

![Inverter](img/widget-inverter.png)

**OIDs:** `inverter.activePower`, `inverter.pvPower`, `inverter.essChargeDischargePower`, `inverter.runningState`, `inverter.essBatterySoc/Soh`, `inverter.essAvgCellTemperature/Voltage`, `inverter.phaseA/B/CVoltage`, `inverter.gridFrequency`, `inverter.pcsInternalTemp`, `inverter.alarm1–5`, `inverter.firmwareVersion`, `inverter.modelType`, `inverter.serialNumber`, `inverter.control.startStop`, `inverter.control.remoteEmsDispatchEnable`, `inverter.control.activePowerPercent`

### PV Power
Display of up to 3 PV strings with live power values and animated flow arrows leading to the hybrid inverter. Arrow colours change dynamically based on power level (orange <1 kW, yellow <2 kW, green >2 kW).

#### Widget settings
| Parameter | Type | Default | Description |
|---|---|---|---|
| oid_pv1 … oid_pv3 | OID | sigenergy.0.plant.pv1Power … pv3Power | PV string power OIDs |
| oid_pvtotal | OID | sigenergy.0.plant.pvPower | Total PV power OID |
| sig_title | text | PV Power | Widget title |
| sig_name1 … sig_name3 | text | String 1 … String 3 | Configurable names per string |
| sig_darkmode | checkbox | true | Dark / Light mode |

![PV Power](img/PV-PowerOverview.png)

**OIDs:** `plant.pv1Power`, `plant.pv2Power`, `plant.pv3Power`, `plant.pvPower`

### SigenMicro Overview
Overview and detail view of all SigenMicro micro-inverters connected via Modbus. Tab 1 shows all devices as an animated network segment (Ethernet bus topology with vertical drop lines). Each additional tab shows all 15 registers of the respective device in ascending order.

| Tab | Content |
|---|---|
| **Overview** | All devices as animated bus topology, aggregate tiles (total power, daily yield, lifetime yield, online count) |
| **Device 01–20** | Device image top-left (10 px offset), model/serial/firmware/status badge, all 15 registers (01–15) with value, unit and OID path |

#### Network segment animation
The horizontal backbone line and the vertical drop lines show animated dashes that flow along the cables when a device is active (Running). Inactive devices (Standby/Fault) show only the dark base line without animation.

#### Dynamic layout
| Devices | Rows | Image size |
|---|---|---|
| 1–5 | 1 row | 80 × 90 px |
| 6–10 | 1 row | 52 × 60 px |
| 11–15 | 2 rows | 46 × 52 px |
| 16–20 | 2 rows | 40 × 46 px |

#### Widget settings
| Parameter | Type | Default | Description |
|---|---|---|---|
| micro_count | number (1–20) | 3 | Number of micro-inverters to display |
| sig_title | text | SigenMicro Micro-Inverter | Widget title |
| sig_darkmode | checkbox | true | Dark / Light mode |
| oid_micro1 … oid_micro20 | OID | — | Anchor OID per device (e.g. sigenergy.0.sigenmicro.11.outputPower) |

![SigenMicro Übersicht — Übersichts-Tab](img/widget-microinverter_01.png)

![SigenMicro Übersicht — Detail-Tab](img/widget-microinverter_02.png)

**OIDs (per device, prefix sigenergy.0.sigenmicro.<slaveId>):**
modelType, serialNumber, firmwareVersion, runningState, outputPower, gridFrequency, temperature, mppt1Voltage, mppt1Current, mppt1Power, mppt2Voltage, mppt2Current, mppt2Power, dailyYield, totalYield

### Vehicle Charge Level (EV SOC)
Displays a configurable vehicle image (e.g. Fiat 500e) as the central visual element. A colour-coded badge in the top-right corner shows a lightning bolt, the current charge level in percent and the label "LADESTAND". A progress bar at the bottom reflects the current SOC. When the optional charging state is active, the badge emits a pulsing green glow.

#### Colour logic
| Charge level | Colour |
|---|---|
| ≤ 15 % | Red (#f87171) |
| ≤ 35 % | Yellow (#fbbf24) |
| > 35 % | Green (#4ade80) |

#### Widget settings
| Parameter | Type | Default | Description |
|---|---|---|---|
| oid_ev_soc | OID | — | State of Charge 0–100 |
| oid_charging | OID | — | Charging state (optional) — green glow when active |
| sig_title | text | Fahrzeug-Ladestand | Vehicle name shown below the image |
| sig_car_image | image | — | Vehicle image from ioBroker file browser (e.g. /vis-2/img/) |
| sig_darkmode | checkbox | true | Dark / Light mode |

![Fahrzeug-Ladestand Widget](img/widget-autoLadestand.png)

**OIDs:** `oid_ev_soc`, `oid_charging`

## Appearance

All widgets support a **light and dark mode**, switchable via the widget setting `Dark mode`.

## Changelog
### 1.8.10 (2026-09-07)
* (ssbingo) Removed the `admin` entry from `globalDependencies`: a widget set has no admin UI, so no admin version needs to be required (repository checker S1091)

### 1.8.9 (2026-09-07)
* (ssbingo) DC charger: a station that marks its running state register as not valid no longer shows up as a red "Unbekannt" badge. The Sigenergy protocol signals "register not valid" by setting all bits, and a SigenStor EC **with** a DC charger answers that way for register 31513 while its neighbouring registers (rated power, PV yield, meters) read normally. The badge is now derived from the output power in that case and the tooltip states that this is neither an adapter nor a configuration problem
* (ssbingo) DC charger: the raw sentinel 65535 is recognised as well, so the badge is also correct on adapter versions before 3.3.1, which pass the value through instead of reporting no value
* (ssbingo) DC charger: new OID setting `oid_protocol` (default `sigenergy.0.info.protocolVersion`). The protocol version was previously derived from the instance prefix only, and such an OID is never subscribed by VIS, so `vis.states` stayed empty and the tooltip claimed "Protokollversion noch nicht erkannt" even though the adapter had detected V2.9 at startup. Declared as a regular `/id` attribute it is subscribed like every other OID
* (ssbingo) DC charger: when the protocol version cannot be read, the tooltip no longer asserts that none was detected — it says the version is not readable here and points at the new setting
* (ssbingo) DC charger: reworded the tooltip shown when the adapter reports no state although the device announces protocol V2.8 or newer — it no longer claims an adapter update is needed, since the station itself may be marking the register as not valid

### 1.8.8 (2026-09-07)
* (ssbingo) DC charger: if the state OID is not set, it is derived from the output power OID (…dcCharger.outputPower → …dcCharger.runningState), so widgets placed before 1.8.7 show the operating state without editing them
* (ssbingo) DC charger: when no operating state is available, the tooltip explains why depending on the protocol version detected by the adapter (`info.protocolVersion` / `info.protocolLevel`): register 31513 requires Sigenergy protocol V2.8; with V2.8 or newer it points to the adapter log or an adapter update; negative output power is shown as discharging

### 1.8.7 (2026-09-07)
* (ssbingo) DC charger: new state OID `dcCharger.runningState` (default) – the state badge now shows the operating state of the charging station (free, connected/preparing, scheduled, charging, discharging, ended, warning, fault/unavailable) with a detailed explanation as tooltip; without the OID the badge is derived from the output power as before
* (ssbingo) DC charger: while charging or discharging is active, the Start button is locked and the Stop button is highlighted; negative output power (discharging) is shown in purple

### 1.8.6 (2026-09-07)
* (ssbingo) AC charger: the tooltip on the state badge is now rendered as a separate popup with a fixed font size and opaque background, so it is readable regardless of widget size and is no longer overlapped by widget content
* (ssbingo) AC charger: while charging is active, the Start button is locked and the Stop button is highlighted
* (ssbingo) Widget set now reports the correct version in the browser console

### 1.8.5 (2026-09-07)
* (ssbingo) AC charger: the charging current slider is now limited to the charger's rated current; new widget setting `sig_maxCurrent` for a manual upper limit (prevents Modbus errors when setting more than the rated current)
* (ssbingo) AC charger: system state now covers all IEC 61851-1 states (0–7: initialising, free, connected, charging, error); hovering over the state badge shows a detailed explanation

### 1.8.4 (2026-09-04)
* (ssbingo) Lowered minimum admin requirement to >=7.8.23 (admin 8 is no longer required)
* (ssbingo) CI: locked ioBroker/testing-action-deploy to major version v1; fixed Dependabot auto-merge workflow
* (ssbingo) Updated dependencies: @tsconfig/node22 22.0.6, @alcalzone/release-script-plugin-license 5.2.2

### 1.8.3 (2026-08-05)
* (ssbingo) Declared minimum requirements: js-controller >=6.0.11, admin >=8.0.0, Node.js >=22
* (ssbingo) Updated dependencies: actions/checkout 7.0.1, ioBroker/testing-action-deploy 1.5.2, @iobroker/testing 5.3.0

### 1.8.2 (2026-06-28)
* (ssbingo) Updated CI actions: actions/checkout to v7.0.0, ioBroker/testing-action-deploy to v1.5.0

### 1.8.1 (2026-06-08)
* (ssbingo) Fixed JSON syntax error in io-package.json; added widget screenshot to documentation

### 1.8.0 (2026-06-08)
* (ssbingo) New widget: "Fahrzeug-Ladestand" — shows a configurable EV image with animated SOC bar, color-coded charge level (red/yellow/green), and optional blinking charging badge

### 1.7.9 (2026-05-27)
* (ssbingo) Removed obsolete .eslintrc.json and .prettierignore

### 1.7.8 (2026-05-27)
* (ssbingo) Added ESLint linting, updated CI to Node.js 24; adapter requires node.js >= 22

### 1.7.7 (2026-04-20)
* (ssbingo) Text no longer distorts under non-uniform scaling — letters keep their proportions while containers continue to fill the widget area

### 1.7.6 (2026-04-20)
* (ssbingo) Scaling is now non-uniform: width and height react independently to container changes, keeping both axes individually adjustable

### 1.7.5 (2026-04-20)
* (ssbingo) Widget scaling now also reacts to height changes — content scales proportionally on both axes and is centered within the widget

### 1.7.4 (2026-04-20)
* (ssbingo) All 9 widgets now scale their content responsively with the widget size (fonts, padding, SVG, images)

### 1.7.3 (2026-04-20)
* (ssbingo) All 9 widgets now share a unified background based on the PV-Power widget design

Older changelog entries can be found in CHANGELOG_OLD.md

## Documentation

- 🇬🇧 [English](/#/adapters/vis-2-widgets-sigenergy) — this file
- 🇩🇪 [Deutsch](https://github.com/ssbingo/ioBroker.vis-2-widgets-sigenergy/blob/main/doc/de/README.md)
- 🇷🇺 [Русский](https://github.com/ssbingo/ioBroker.vis-2-widgets-sigenergy/blob/main/doc/ru/README.md)
- 🇳🇱 [Nederlands](https://github.com/ssbingo/ioBroker.vis-2-widgets-sigenergy/blob/main/doc/nl/README.md)
- 🇫🇷 [Français](https://github.com/ssbingo/ioBroker.vis-2-widgets-sigenergy/blob/main/doc/fr/README.md)
- 🇮🇹 [Italiano](https://github.com/ssbingo/ioBroker.vis-2-widgets-sigenergy/blob/main/doc/it/README.md)
- 🇪🇸 [Español](https://github.com/ssbingo/ioBroker.vis-2-widgets-sigenergy/blob/main/doc/es/README.md)
- 🇵🇱 [Polski](https://github.com/ssbingo/ioBroker.vis-2-widgets-sigenergy/blob/main/doc/pl/README.md)
- 🇵🇹 [Português](https://github.com/ssbingo/ioBroker.vis-2-widgets-sigenergy/blob/main/doc/pt/README.md)

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