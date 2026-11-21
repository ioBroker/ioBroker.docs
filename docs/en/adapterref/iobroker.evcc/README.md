![Logo](admin/evcc.png)
# ioBroker.evcc

[![NPM version](https://img.shields.io/npm/v/iobroker.evcc.svg)](https://www.npmjs.com/package/iobroker.evcc)
[![Downloads](https://img.shields.io/npm/dm/iobroker.evcc.svg)](https://www.npmjs.com/package/iobroker.evcc)
![Number of Installations (latest)](https://iobroker.live/badges/evcc-installed.svg)
![Number of Installations (stable)](https://iobroker.live/badges/evcc-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.evcc.png?downloads=true)](https://nodei.co/npm/iobroker.evcc/)

**Tests:** ![Test and Release](https://github.com/Newan/ioBroker.evcc/workflows/Test%20and%20Release/badge.svg)

## evcc adapter for ioBroker

[evcc](https://evcc.io) controls the charging of your electric car with solar power. This adapter connects ioBroker
with your evcc: it shows all values of evcc in ioBroker (power, charging state, prices, vehicles …) and lets you
control charging from scripts, Blockly or your visualization – e.g. start or stop charging, set a charging target or a
charging plan.

Forum: https://forum.iobroker.net/topic/49165/neuer-adapter-iobroker-evcc

## Requirements

- a running evcc installation that ioBroker can reach over the network (web interface, default port 7070)
- evcc 0.316 or newer is recommended, older versions keep working

## Getting started

1. Install the adapter and open the instance settings.
2. Enter the IP address or host name of evcc (without `http://`) and the port.
3. Click **Test connection** – the adapter shows the evcc version and your loadpoints and vehicles.
4. Save. After a few seconds the values appear in the objects under `evcc.0`.

## Configuration

| Setting | Meaning |
|---|---|
| Host or IP address | address of evcc, e.g. `192.168.1.10` or `evcc.local` |
| Port | port of the evcc web interface, usually `7070` |
| Poll interval | how often evcc is read. Shorter = more current values, but more load. Default 60 s |
| Test connection | checks the entered address without saving |
| Dissolve status objects | off: values that belong together (e.g. grid, pv, battery) are stored together in one data point. On: every value gets its own data point – handy for visualizations and charts, but creates more data points |
| Forecasts | stores the forecasts of evcc (solar, prices, CO₂, temperature). Only needed if you want to evaluate them in ioBroker, creates about 1,800 data points |

## Data points

| Path | Content |
|---|---|
| `info.connection` | `true` while evcc is reachable |
| `status` | values of the whole site, e.g. `pvPower`, `homePower`, `tariffGrid` |
| `control` | settings of the whole site, e.g. home battery (`bufferSoc`, `prioritySoc`) and price limits |
| `loadpoint.1`, `loadpoint.2` … | one entry per loadpoint (named like in evcc), with `status` (current values) and `control` (settings and buttons) |
| `vehicle.<name>` | one entry per vehicle (named like in evcc): minimum and target charge level, charging plan |

Everything below `control` can be changed – the adapter sends the new value to evcc.

## Controlling charging

| Data point | What it does |
|---|---|
| `loadpoint.X.control.off` / `.now` / `.smart` | buttons: stop charging, charge now at full power, charge with solar power |
| `loadpoint.X.control.pvControl` | the same as one value: `0` off, `1` smart, `2` smart + always charge, `3` now. Also shows the current mode |
| `loadpoint.X.control.alwaysCharge` | `on`: in smart mode always charge at least with minimum power, `once`: only until the vehicle is disconnected, `off` |
| `loadpoint.X.control.limitSoc` | charge up to this level (%) |
| `loadpoint.X.control.minCurrent` / `.maxCurrent` | minimum / maximum charging current (A) |
| `loadpoint.X.control.batteryBoost` | `true`: also use the home battery for charging, down to `batteryBoostLimit` (%). With `batteryBoostLimit` = 100 the boost is off |
| `loadpoint.X.control.limitEnergy` | charge only this energy (kWh), for guest vehicles or vehicles without charge level. Removed by evcc when the vehicle is unplugged |
| `loadpoint.X.control.priority` | with several loadpoints, the one with the higher priority gets the solar power first |
| `loadpoint.X.control.pv` / `.min` | old buttons, still work (smart without / with always charge) |

## Home battery

If evcc controls your home battery, ioBroker can set its mode with `control.batteryMode`:

| Value | What happens |
|---|---|
| `off` | evcc controls the battery itself (default) |
| `normal` | normal operation |
| `hold` | the battery is not discharged |
| `charge` | the battery is charged from the grid |
| `holdcharge` | the battery is not charged |
| `discharge` | the battery is discharged to the grid |

The mode stays active until you set `off` again – the adapter repeats it to evcc every 30 s, because evcc falls back
to its own control after one minute without a new request. While a mode is set, evcc's own battery rules (e.g. price
limit) do not apply. If evcc cannot control a battery, the adapter writes a warning and sets the value back to `off`.

## Charging plan

With a charging plan the vehicle is charged up to a target until a given time, preferably with solar power or at low
prices. Set it per loadpoint under `loadpoint.X.control.plan`:

| Data point | Meaning |
|---|---|
| `plan.time` | when the target has to be reached. Empty or in the past: in 24 hours |
| `plan.soc` | target charge level in % (used when a vehicle is assigned to the loadpoint) |
| `plan.energy` | energy to charge in kWh (used when no vehicle is assigned, e.g. guest vehicle) |
| `plan.active` | `true` creates the plan, `false` deletes it. Shows whether a plan is set in evcc |

Set `time` and `soc`/`energy` first, then `active = true`. The same works per vehicle under `vehicle.<name>.plan`.

## Notes

- **evcc restarts (e.g. updates):** the adapter writes one warning, sets `info.connection` to `false` and reconnects
  automatically. When evcc is back, an info message appears in the log.
- **Changes in evcc** (new, removed or renamed loadpoints and vehicles) are taken over automatically. Objects of
  loadpoints and vehicles that no longer exist in evcc are deleted after the adapter start or an evcc restart.
- **Values evcc does not report anymore** (e.g. the remaining charging time after charging) are set to empty (`null`).
- **Scripts from older versions:** since evcc 0.316 `loadpoint.X.status.mode` shows `smart` instead of `pv` / `minpv`.
  Use `loadpoint.X.control.pvControl` to tell the modes apart.
- `loadpoint.X.status.planActive` comes from evcc and means "charging according to plan right now", not "a plan is set".

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.3.3 (2026-11-17)
* (Schimi1983) new: `control.batteryMode` sets the home battery mode in evcc (normal, hold, charge, holdcharge, discharge) and keeps it active, `off` returns control to evcc
* (Schimi1983) new per loadpoint: `batteryBoost`, `batteryBoostLimit`, `limitEnergy`, `priority`
* (Schimi1983) loadpoints and vehicles removed in evcc are deleted, renamed ones get their new name (checked after start and after an evcc restart)
* (Schimi1983) evcc not reachable (e.g. restart/update): one warning instead of an error on every poll, info message when the connection is restored
* (Schimi1983) values evcc does not report anymore (e.g. `fatal`, remaining charging time) are set to `null` instead of keeping the last value
* (Schimi1983) existing status objects are updated to the current roles at start, also for values evcc currently does not report
* (Schimi1983) README: getting started, data points and charging control explained for users

### 0.3.2 (2026-11-06)
* (Schimi1983) state roles according to the ioBroker state roles: writable states use `level.*` / `switch` / `button.*` / `text` instead of `value`, min/max for percent values, JSON values use role `json` (type string), strings `text`, remaining durations `value.timer`; ids and values are unchanged
* (Schimi1983) complete object tree: folders `loadpoint` / `vehicle`, a device per loadpoint and vehicle (named by its evcc title), channels `control` / `status`
* (Schimi1983) price limits under `control` use the currency configured in evcc, buttons are confirmed with ack = true
* (Schimi1983) admin: reworked config page (connection / data points sections, help texts, validation, units), new "Test connection" button
* (Schimi1983) fix: host was cut when it contained "http" anywhere (e.g. a host name), now only a leading http:// / https:// and a path are removed
* (Schimi1983) defaults for new instances: poll interval 60 s, port as number
* (Schimi1983) repository checker (#141): unit tests use node:assert instead of chai (W0063), package.json "files" instead of .npmignore (W9503), i18n short format (S5601)
* (Schimi1983) remove unused workflow file dependabot-automerge.yml.OLD (pull_request_target, #139)
* (Schimi1983) fix: polls took longer than the interval with many states (e.g. weather forecast) – values are now written in batches
* (Schimi1983) fix: no errors in the log when the adapter is stopped during a poll
* (Schimi1983) fix unit tests: chai-as-promised is no longer loaded in test setup (not a direct dependency anymore)
* (Schimi1983) charging plan per loadpoint: `control.plan.active/time/soc/energy` (soc plan of the assigned vehicle or energy plan of the loadpoint), closes #73 and #18
* (Schimi1983) repository checker (#135): remove test dependencies already provided by @iobroker/testing, CHANGELOG_OLD.md in .npmignore, consistent formatting of admin/jsonConfig.json

### 0.3.1 (2026-10-10)
* (arteck) Dependencies have been updated
* (Schimi1983) fix: `enableThreshold` / `disableThreshold` could not be set
* (Schimi1983) fix: global `control.smartCostLimit` was sent to loadpoint `undefined`
* (Schimi1983) fix: `smartCostLimit` / `batteryGridChargeLimit` = 0 now removes the limit (DELETE), negative limits are allowed
* (Schimi1983) fix: `chargeDuration` / `connectedDuration` are reported by evcc in seconds (were treated as nanoseconds)
* (Schimi1983) fix: vehicle plan (`plan.active`, `plan.planSoc`, `plan.time`) is read from and written to evcc again
* (Schimi1983) remove unused calls to removed evcc endpoints
* (Schimi1983) fix: control actions were called with the adapter as `this` instead of the evcc client
* (Schimi1983) performance: objects are created once per runtime instead of being rewritten on every poll, polls no longer overlap
* (Schimi1983) add units and roles (W, Wh, kWh, A, %, km, s, €/kWh, g/kWh, °C) for known evcc status values, indicator role for booleans

### 0.3.0 (2026-10-02)
* (Schimi1983) support evcc 0.316 mode redesign: new `control.smart` and `control.alwaysCharge`, `pvControl` reflects the evcc mode
* (Schimi1983) fix: request timeout was sent as POST body and never applied
* (arteck) Dependencies have been updated

### 0.2.10 (2026-07-15)
* (arteck) add configurable weather forcast grid

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