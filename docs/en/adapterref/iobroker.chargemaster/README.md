![Logo](admin/chargemaster.png)

# ioBroker.chargemaster

[![NPM version](https://img.shields.io/npm/v/iobroker.chargemaster?style=flat-square)](https://www.npmjs.com/package/iobroker.chargemaster)
[![Downloads](https://img.shields.io/npm/dm/iobroker.chargemaster?label=npm%20downloads&style=flat-square)](https://www.npmjs.com/package/iobroker.chargemaster)
![node-lts](https://img.shields.io/node/v-lts/iobroker.chargemaster?style=flat-square)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/iobroker.chargemaster?label=npm%20dependencies&style=flat-square)

![GitHub](https://img.shields.io/github/license/hombach/iobroker.chargemaster?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/hombach/iobroker.chargemaster?logo=github&style=flat-square)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/hombach/iobroker.chargemaster?logo=github&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/hombach/iobroker.chargemaster?logo=github&style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/hombach/iobroker.chargemaster?logo=github&style=flat-square)

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.chargemaster/test-and-release.yml?branch=main&logo=github&style=flat-square)
[![CodeQL](https://github.com/hombach/ioBroker.chargemaster/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hombach/ioBroker.chargemaster/actions/workflows/codeql-analysis.yml)
[![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.chargemaster?branch=master&svg=true)](https://ci.appveyor.com/project/hombach/iobroker-chargemaster)
[![SNYK Known Vulnerabilities](https://snyk.io/test/github/hombach/ioBroker.chargemaster/badge.svg)](https://snyk.io/test/github/hombach/ioBroker.chargemaster)

## Versions

![Beta](https://img.shields.io/npm/v/iobroker.chargemaster.svg?color=red&label=beta)
![Stable](https://iobroker.live/badges/chargemaster-stable.svg)
![Installed](https://iobroker.live/badges/chargemaster-installed.svg)

[![NPM](https://nodei.co/npm/iobroker.chargemaster.png?downloads=true)](https://nodei.co/npm/iobroker.chargemaster/)

## Sentry

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information on how to disable error reporting, see <a href="https://github.com/ioBroker/plugin-sentry#plugin-sentry">Sentry-Plugin Documentation</a>!

## Adapter to manage one or multiple EV-chargers with use of PV-energy

**!!! THIS ADAPTER IS STILL REPRESENTING AN DEVELOPMENT STATE !!!**

ChargeMaster manages one or multiple EV-chargers (wallboxes) and controls their charging current based on the available PV surplus energy of your home. It is wallbox-vendor-agnostic: it does not talk to the hardware itself, but reads from and writes to the ioBroker states of your existing wallbox adapters (e.g. go-e, but any adapter exposing the needed states works).

### Features

- Controls up to several wallboxes simultaneously while respecting a global maximum total current (e.g. the limit of your house connection or wallbox supply line)
- **ChargeNOW** mode per wallbox: charge immediately with a user-defined current, independent of PV production
- **ChargeManager** mode per wallbox: charge automatically from PV surplus, taking house consumption and your home battery into account
- Configurable home battery priority: charging of the EV only starts once the home battery has reached a configurable state of charge; above that, a share of the battery power may support the EV charging
- Smooth regulation: charging current is ramped up/down by 1 A per control cycle, with hysteresis and delayed switch-off to protect the vehicle charger from rapid toggling
- Event driven: reacts immediately to user input (e.g. enabling ChargeNOW) and receives energy data via state subscriptions instead of polling

### How it works

The adapter runs a control cycle (default every 10 seconds). For each configured wallbox it plans a target current based on its mode:

1. **ChargeNOW enabled** → the wallbox is planned with the user-defined `ChargeCurrent`.
2. **ChargeManager enabled** → if the home battery SoC has reached the setpoint (`Settings.Setpoint_HomeBatSoC`), the optimal current is calculated from the PV surplus (see [Charge manager algorithm](#charge-manager-algorithm)). Otherwise the wallbox stays off until the battery is charged.
3. **Neither enabled** → the wallbox is switched off.

Afterwards a global limiter distributes the available total current (`maximum total current` setting): wallboxes in ChargeNOW mode are served first, remaining current is given to ChargeManager wallboxes. If the remaining current for a wallbox would fall below its minimum current, it is switched off completely. Finally, the resulting currents and charge-enable commands are written to the configured wallbox states.

## Requirements

- node.js >= 22.18, js-controller >= 6.0.11, admin >= 7.6.20
- An ioBroker adapter for your wallbox(es) providing states for: set charge current, allow/disallow charging, active charging power, active charging current
- ioBroker states with your PV production (W), house power consumption (W) and - if present - home battery SoC (%), e.g. from your inverter adapter

## Configuration

### Basic settings

| Setting                                | Description                                                                                    |
| -------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `cycle time`                           | Control cycle interval in milliseconds (default 10000). Values below 5000 are not recommended. |
| `maximum total current`                | Global current limit in A over all wallboxes together (e.g. supply line limit).                |
| `state of solar power`                 | Foreign state with the current PV production in W.                                             |
| `state of home power consumption`      | Foreign state with the current house consumption in W (without wallbox charging power).        |
| `state of home battery state of charge`| Foreign state with the current home battery SoC in %.                                          |

### Wallbox list

Add one row per wallbox:

| Column                  | Description                                                              |
| ----------------------- | ------------------------------------------------------------------------ |
| `state charge current`  | Foreign state to **write** the charging current setpoint (A).            |
| `state charge allowed`  | Foreign state to **write** the charge enable/disable command (boolean).  |
| `state active power`    | Foreign state to **read** the current charging power (W).                |
| `state active current`  | Foreign state to **read** the current charging current (A).              |
| `min current`           | Minimum charging current of this wallbox in A (typically 6 A).           |
| `max current`           | Maximum charging current of this wallbox in A (e.g. 16 A).               |

All configured states are verified at adapter startup - if a state does not exist, the adapter logs an error and stops.

## States created by the adapter

| State                              | Description                                                                                     |
| ---------------------------------- | ----------------------------------------------------------------------------------------------- |
| `Settings.Setpoint_HomeBatSoC`     | Minimum home battery SoC in % before PV surplus charging starts (writable, default 80).          |
| `Settings.WB_<x>.ChargeNOW`        | Enable immediate charging for wallbox `<x>` (writable).                                          |
| `Settings.WB_<x>.ChargeCurrent`    | Charging current in A used in ChargeNOW mode (writable).                                         |
| `Settings.WB_<x>.ChargeManager`    | Enable PV surplus charging for wallbox `<x>` (writable).                                         |
| `Power.Charge`                     | Total measured charging power of all wallboxes in W.                                             |
| `info.connection`                  | True while all configured foreign states were verified and the adapter is running.               |

## Charge manager algorithm

The optimal charging current for a wallbox in ChargeManager mode is calculated as:

```
batteryShare = up to 2000 W, scaling linearly from 0 at Setpoint_HomeBatSoC to 2000 W at 100% SoC
optimalCurrent = (solarPower - houseConsumption + 100 W reserve + batteryShare) / 230 V
```

The planned current then approaches this optimum by 1 A per cycle. Charging is enabled once the planned current exceeds the wallbox minimum current plus a 3 A hysteresis and is disabled only after the planned current stayed below the minimum current for more than 15 consecutive cycles (delayed switch-off, avoids toggling on short clouds).

## Notes and limitations

- The power-to-current conversion assumes single-phase charging at 230 V. For three-phase charging wallboxes the calculated surplus current is currently not divided by the number of phases - configurable phase count is on the roadmap.
- House consumption must not include the wallbox charging power itself, otherwise the control loop oscillates.
- The adapter writes to your wallbox states every cycle - make sure the configured `state charge current` / `state charge allowed` really are the writable control states of your wallbox adapter.

## Donate

<a href="https://www.paypal.com/donate/?hosted_button_id=H5PMQ8JKQL7SL"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.tibberlink/main/docu/bluePayPal.svg" height="40"></a>  
If you enjoyed this project — or just feeling generous, consider buying me a beer. Cheers! :beers:

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 0.16.0 (2026-07-05)

- (HombachC) switched data acquisition from polling to event driven foreign state subscriptions, react immediately to user input
- (HombachC) fixed warnings of adapter checker
- (HombachC) repository cleanup
- (HombachC) removed unused chai/sinon-chai/chai-as-promised/proxyquire devDependencies and switch tests to node:assert
- (HombachC) fixed race condition at first start
- (HombachC) fixed wrong config default keys in io-package.json and added guard for missing maxAmpTotal
- (HombachC) moved module-global variables into adapter class to fix possible conflicts in compact mode
- (HombachC) stop state machine and reset info.connection on adapter unload
- (HombachC) await wallbox state writes with proper error handling and throttle/switch off boxes exceeding the measured total current limit
- (HombachC) fixed lost min/max/step value of 0 and duplicated unit handling in projectUtils
- (HombachC) charge manager: clamp optimal current at zero and fix division by zero with home battery setpoint of 100%
- (HombachC) validate and clamp Setpoint_HomeBatSoC state changes (NaN guard, 0-100%)
- (HombachC) improved typing: typed state getters in projectUtils instead of any, fixed wallBoxList tuple type
- (HombachC) removed yarn devDependency and switched release build hook to npm
- (HombachC) extracted charge planning and limiting algorithms into testable module and added 18 unit tests
- (HombachC) improved README with feature overview, configuration, states and algorithm documentation

### 0.15.1 (2026-06-04)

- (HombachC) fix warnings of adapter checker
- (HombachC) upgraded typescript to 6.x.x
- (HombachC) updated projectUtils
- (HombachC) updated dependencies

### 0.15.0 (2026-05-09)

- (copilot) BREAKING: adapter requires node.js >= 22 now
- (HombachC) update dependencies

### 0.14.7 (2026-04-16)

- (HombachC) min admin 7.6.20 as recommended (#762)
- (HombachC) switch to ES2023 code
- (HombachC) update dependencies

### 0.14.6 (2026-02-27)

- (HombachC) update dependencies

### Old Changes see [CHANGELOG OLD](CHANGELOG_OLD.md)

## Tested with

- 3x go-E Charger & Kostal PikoBA

## License

MIT License

Copyright (c) 2021-2026 Christian Hombach

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
