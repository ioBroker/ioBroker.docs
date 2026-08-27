![Logo](admin/renault.png)

# ioBroker.renault

[![NPM version](https://img.shields.io/npm/v/iobroker.renault.svg)](https://www.npmjs.com/package/iobroker.renault)
[![Downloads](https://img.shields.io/npm/dm/iobroker.renault.svg)](https://www.npmjs.com/package/iobroker.renault)
![Number of Installations](https://iobroker.live/badges/renault-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/renault-stable.svg)

**Tests:** ![Test and Release](https://github.com/TA2k/ioBroker.renault/workflows/Test%20and%20Release/badge.svg)

## Renault / Dacia adapter for ioBroker

This adapter connects ioBroker to the My Renault / My Dacia cloud and exposes vehicle status data (battery, charging, HVAC, mileage, ...) as well as remote commands (HVAC start, charging start/stop, force refresh) for compatible Renault and Dacia models such as the Renault Zoe, Megane E-Tech, Kangoo E-Tech and the Dacia Spring.

## Installation / Login

1. Install the adapter via the ioBroker admin UI.
2. Open the adapter configuration and enter the credentials of your **My Renault** (or **My Dacia**) account: app email and app password.
3. Set the **country** to the two-letter country code matching your account (e.g. `de`, `fr`, `it`, `es`).
4. Optionally set the polling **interval** in minutes and the **API key** (leave empty for auto-detect).
5. Save and the instance will start polling.

## Remote control

Each vehicle is created as a device using its VIN. Remote commands are exposed as states under `renault.0.<VIN>.remote.*`:

| State                       | Type    | Action |
| --------------------------- | ------- | ------ |
| `actions/hvac-start`        | boolean | `true` = start, `false` = stop pre-conditioning |
| `hvac-temperature`          | number  | Target HVAC temperature |
| `actions/charging-start`    | boolean | `true` = start, `false` = stop charging |
| `charge/pause-resume`       | boolean | `true` = start, `false` = pause |
| `charge/start`              | boolean | `true` = start, `false` = stop charging (legacy endpoint) |
| `refresh`                   | boolean | `true` = force refresh of vehicle data |

Set the corresponding state to `true` to trigger the command.

## Discussion / questions

ioBroker forum: <https://forum.iobroker.net/topic/48074/test-adapter-renault-v0-0-x>

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### 0.0.23

- (TA2k) align API headers with My Renault Android app, drop EOL Node 18/20, migrate admin UI to jsonConfig

### 0.0.22

- (TA2k) update dependencies, migrate to ESLint 10, fix repochecker findings

### 0.0.7

- (TA2k) initial release

[Older changelogs can be found here](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2021-2026 TA2k <tombox2020@gmail.com>

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
