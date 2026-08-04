![Logo](admin/go-eCharger.png)

# ioBroker.go-eCharger

[![NPM version](https://img.shields.io/npm/v/iobroker.go-e-charger?style=flat-square)](https://www.npmjs.com/package/iobroker.go-e-charger)
[![Downloads](https://img.shields.io/npm/dm/iobroker.go-e-charger?label=npm%20downloads&style=flat-square)](https://www.npmjs.com/package/iobroker.go-e-charger)
![node-lts](https://img.shields.io/node/v-lts/iobroker.go-e-charger?style=flat-square)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/iobroker.go-e-charger?label=npm%20dependencies&style=flat-square)

![GitHub](https://img.shields.io/github/license/hombach/iobroker.go-e-charger?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/hombach/iobroker.go-e-charger?logo=github&style=flat-square)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/hombach/iobroker.go-e-charger?logo=github&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/hombach/iobroker.go-e-charger?logo=github&style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/hombach/iobroker.go-e-charger?logo=github&style=flat-square)

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.go-e-charger/test-and-release.yml?branch=master&logo=github&style=flat-square)
[![CodeQL](https://github.com/hombach/ioBroker.go-e-charger/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hombach/ioBroker.go-e-charger/actions/workflows/codeql-analysis.yml)
[![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.go-e-charger?branch=master&svg=true)](https://ci.appveyor.com/project/hombach/iobroker-go-e-charger)
[![SNYK Known Vulnerabilities](https://snyk.io/test/github/hombach/ioBroker.go-e-charger/badge.svg)](https://snyk.io/test/github/hombach/ioBroker.go-e-charger)

## Versions

![Beta](https://img.shields.io/npm/v/iobroker.go-e-charger.svg?color=red&label=beta)
![Stable](https://iobroker.live/badges/go-e-charger-stable.svg)
![Installed](https://iobroker.live/badges/go-e-charger-installed.svg)

[![NPM](https://nodei.co/npm/iobroker.go-e-charger.png?downloads=true)](https://nodei.co/npm/iobroker.go-e-charger/)

## ioBroker adapter for go-e Charger EV wallboxes

This adapter integrates one or more go-e Charger wallboxes into your ioBroker home automation. It cyclically polls each wallbox via its local HTTP API, provides all relevant data as ioBroker states, and lets you control charging directly from your smart home.

For more information about the go-e Charger hardware, visit the manufacturer's website: [go-e GmbH](https://go-e.com).

### Features

- supports multiple go-e Chargers within a single adapter instance
- monitoring of car state, charging power, charging current, grid phases, and energy statistics
- **ChargeNOW** – start charging immediately at a configurable current
- **ChargeManager** – automatic PV surplus charging: the charging current is continuously adjusted to the available solar power, taking house consumption and the state of charge of your home battery into account. Charging of your EV can be delayed until the home battery has reached a configurable minimum state of charge.

    > **Note:** PV surplus charging is currently designed for controlling a **single** charger. When ChargeManager is enabled on multiple chargers at the same time, the charging currents are not coordinated between them and the solar surplus calculation will produce incorrect values. An extension with coordinated multi-charger load management will be available soon.

- switching between 1-phase and 3-phase charging (hardware generation 3 and newer)
- energy statistics per RFID card (card name, ID, and charged energy)
- read-only mode per wallbox – monitor a charger purely, without sending **any** control commands to it (no charge release, no charging current, no phase switching), e.g. when charging is controlled elsewhere or access is managed via RFID tags

Tested with firmware V033, V040.0, V041.0, V054.7, V054.11, V055.5, V055.7, V055.8, V56.1, V56.2, V56.8, V56.9, V56.11, V57.0, V57.1, V59.4, V60.0, V60.1, V60.2, V60.5, V60.6 and with up to 3 chargers operated in parallel.

### Requirements

- For hardware generation 3 and 4 you have to enable "HTTP API v1" in your go-e app.
- For phase switching you additionally have to enable "HTTP API v2" in your go-e app (hardware generation 3 and newer).

## Configuration

Add one entry per go-e Charger to the wallbox list and enter its IP address. Optionally assign a name to each charger.

Enable **read-only mode** for a charger if the adapter should only read its data and never write to it. In read-only mode the adapter sends no control commands at all – neither the charge release, nor the charging current, nor phase switching. The ChargeNOW and ChargeManager states can still be toggled, but they have no effect on a read-only charger. Use this mode when the charging of that wallbox is controlled by another system or managed locally via RFID tags.

The poll cycle time defines how often the adapter reads data from the chargers and adjusts the charging current (minimum 3 seconds, default 10 seconds).

### PV surplus charging with ChargeManager

ChargeManager calculates the charging current from numeric ioBroker states supplied by an energy-management, inverter, meter, or user-created data source. It does not depend on a particular vendor, but the selected states must represent the quantities described below.

Configure the object IDs of the following states:

- currently available solar power [W]
- current home power consumption [W]
- current state of charge of your home battery [%]

#### Input requirements

| Input                        | Expected value                 | Unit | Sign                 |
| ---------------------------- | ------------------------------ | ---- | -------------------- |
| Solar power                  | Total current PV generation    | W    | Positive generation  |
| Home power consumption       | Total current household demand | W    | Positive consumption |
| Home battery state of charge | Current battery charge level   | %    | 0 to 100             |

All three states must contain numeric values. Power values in kW must be converted to W before they are selected. A grid import/export state cannot be used directly because ChargeManager currently expects separate generation and consumption values.

If no home battery is installed, create a numeric helper state and select it as the battery state of charge. Set this helper to the **same constant value** as `Settings.Setpoint_HomeBatSoC` (for example `70` for both). This keeps the battery offset at zero, so ChargeManager charges purely from the available PV surplus.

#### Wallbox consumption in the home-consumption value

Enable **Charger consumption is included in the home power consumption value** when the selected home-consumption state rises by approximately the charging power after charging starts. ChargeManager then adds the measured wallbox power back before calculating the available surplus. This prevents the controller from treating its own charging load as additional household demand.

Leave the option disabled when the selected state already excludes wallbox consumption.

#### Calculation

ChargeManager uses the following calculation once per poll cycle:

```text
available power =
    solar power
  - home power consumption
  + wallbox power, if it is included in home power consumption
  - 100 W reserve
  + battery SoC offset

target current = floor(available power / 230 V / active phases)
```

The battery offset is zero when the battery is exactly at the configured minimum state of charge and increases up to 2,000 W as the battery approaches 100%. Below `Settings.Setpoint_HomeBatSoC`, EV charging is disabled so that the home battery has priority.

The calculated current is limited to a maximum of 16 A. The internal current target changes by at most 1 A per poll cycle to reduce sudden changes.

#### Enabling ChargeManager

After the adapter has started, use the writable states below. Replace instance `0` and wallbox number `0` where necessary.

| State                                             | Purpose                                                         |
| ------------------------------------------------- | --------------------------------------------------------------- |
| `go-e-charger.0.Settings.Setpoint_HomeBatSoC`     | Minimum home-battery SoC before surplus charging is allowed     |
| `go-e-charger.0.Wallbox_0.Settings.ChargeManager` | Enables or disables PV surplus control                          |
| `go-e-charger.0.Wallbox_0.Settings.ChargeNOW`     | Overrides ChargeManager and forces charging                     |
| `go-e-charger.0.Wallbox_0.Settings.ChargeCurrent` | Current used by ChargeNOW                                       |
| `go-e-charger.0.Wallbox_0.Settings.Charge3Phase`  | Selects one-phase or three-phase charging on supported hardware |

For surplus charging, set `ChargeNOW` to `false` and `ChargeManager` to `true`. When both are enabled, ChargeNOW takes precedence and uses the configured `ChargeCurrent` without considering the available surplus.

#### One-phase and three-phase charging

ChargeManager does not automatically switch between one and three phases according to the available surplus. On hardware generation 3 and newer, `Charge3Phase` selects the phase mode:

- `false`: one-phase charging
- `true`: three-phase charging

Because the current implementation starts charging when its internal target exceeds 9 A, the effective starting point is 10 A. This requires approximately 2.3 kW in one-phase mode or 6.9 kW in three-phase mode after the reserve and battery adjustments. One-phase mode therefore provides a wider operating range for smaller PV systems or variable weather.

#### Operating modes

| ChargeNOW | ChargeManager | Result                                     |
| --------- | ------------- | ------------------------------------------ |
| `false`   | `false`       | Charging is disabled                       |
| `false`   | `true`        | Charging follows the calculated PV surplus |
| `true`    | `false`       | Forced charging at `ChargeCurrent`         |
| `true`    | `true`        | ChargeNOW takes precedence                 |

In read-only mode, these states can still be changed but no resulting control command is sent to the charger.

#### Verification and troubleshooting

Before relying on automatic charging, verify the selected input states in the ioBroker object view:

1. Solar power is close to zero at night and follows current generation during the day.
2. Home power consumption remains positive and reacts plausibly when household loads are switched on.
3. Battery state of charge remains between 0 and 100.
4. All power values are expressed in W rather than kW.
5. The wallbox-consumption option matches whether charging power is included in the selected home-consumption value.
6. `Wallbox_0.info.connection` is `true`.
7. `Wallbox_0.Power.Charge`, `Wallbox_0.Power.GridPhases`, and, on supported hardware, `Wallbox_0.Power.EnabledPhases` contain plausible values.

Charging may take several poll cycles to start because the internal target increases by only 1 A per cycle. With the default 10-second cycle and an initial target of 0 A, reaching the 10 A starting point can take approximately 100 seconds.

ChargeManager is currently intended to control one charger. Enabling it for multiple chargers at the same time results in each charger independently using the same surplus and can cause incorrect allocation.

## Sentry

This adapter employs Sentry libraries to automatically report exceptions and code errors to the developers. For more details and information on how to disable error reporting, please consult the [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!

## Donate

<a href="https://www.paypal.com/donate/?hosted_button_id=76GBRV9BX5US8"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.go-e-charger/master/docu/bluePayPal.svg" height="40"></a>
If you enjoyed this project – or are just feeling generous – consider buying me a beer. Cheers! :beers:

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 1.3.0 (2026-08-04)

- (hombach) added info.accessControlState (go-e access_state: 0 = open, 1 = RFID/App required, 2 = price/automatic) (#634)
- (hombach) tightened TypeScript types for go-e API response fields (removed any)
- (hombach) updated dependencies

### 1.2.1 (2026-07-31)

- (typhosj) made ChargeManager surplus control more fail-safe: input validation, current clamped to 0-16 A, resilience of state-machine loop (#841)
- (hombach) added support for firmware V60.5 (#800) and V60.6 (#844)
- (typhosj) added ChargeManager PV surplus configuration guide (#842)
- (hombach) corrected no-battery helper-state recommendation for ChargeManager
- (hombach) updated dependencies

### 1.2.0 (2026-07-12)

- (hombach) added statisticsGlobal.chargePower state with the current total charging power of all chargers
- (hombach) removed chai-based unit test dependencies; modernized test harness to Node.js assert (fixes Appveyor, #836)

### 1.1.0 (2026-07-05)

- (hombach) fixed reading of "unlocked by RFID" (uby) on gen 3+ chargers via API V2
- (hombach) read-only mode now suppresses all control commands (charge release, charging current, phase switching)
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 1.0.4 (2026-07-04)

- (hombach) harmonized i18n files
- (hombach) improved README and English texts
- (hombach) reworked translations in all languages
- (hombach) added 5s timeout to all HTTP requests to chargers
- (hombach) fixed adapter stop when no charger is reachable at startup; warn per unreachable charger
- (hombach) fixed German fallback text for RFID card channel names
- (hombach) added upper bound validation for cycle time
- (hombach) added link to manufacturer's website
- (hombach) code optimizations

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2020-2026 C.Hombach

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
