![Logo](admin/teslafi.png)

# ioBroker.teslafi

[![NPM version](https://img.shields.io/npm/v/iobroker.teslafi.svg)](https://www.npmjs.com/package/iobroker.teslafi)
[![Downloads](https://img.shields.io/npm/dm/iobroker.teslafi.svg)](https://www.npmjs.com/package/iobroker.teslafi)
![node-lts](https://img.shields.io/node/v-lts/iobroker.teslafi?style=flat-square)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/iobroker.teslafi?label=npm%20dependencies&style=flat-square)

![GitHub](https://img.shields.io/github/license/hombach/iobroker.teslafi?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/hombach/iobroker.teslafi?logo=github&style=flat-square)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/hombach/iobroker.teslafi?logo=github&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/hombach/iobroker.teslafi?logo=github&style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/hombach/iobroker.teslafi?logo=github&style=flat-square)

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.teslafi/test-and-release.yml?branch=master&logo=github&style=flat-square)
[![CodeQL](https://github.com/hombach/ioBroker.teslafi/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hombach/ioBroker.teslafi/actions/workflows/codeql-analysis.yml)
[![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.teslafi?branch=master&svg=true)](https://ci.appveyor.com/project/hombach/iobroker-teslafi)
[![SNYK Known Vulnerabilities](https://snyk.io/test/github/hombach/ioBroker.teslafi/badge.svg)](https://snyk.io/test/github/hombach/ioBroker.teslafi)

## Versions

![Beta](https://img.shields.io/npm/v/iobroker.teslafi.svg?color=red&label=beta)
![Stable](https://iobroker.live/badges/teslafi-stable.svg)
![Installed](https://iobroker.live/badges/teslafi-installed.svg)

[![NPM](https://nodei.co/npm/iobroker.teslafi.png?downloads=true)](https://nodei.co/npm/iobroker.teslafi/)

## Sentry

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information on how to disable error reporting, see <a href="https://github.com/ioBroker/plugin-sentry#plugin-sentry">Sentry-Plugin Documentation</a>!

## ioBroker TeslaFi Adapter – Seamless Tesla Data Integration for Your Smart Home

The TeslaFi adapter enables effortless integration of vehicle data from your TeslaFi account into the ioBroker system. Leverage this data to enhance your Tesla experience and optimize home automation workflows.

## Why This Adapter?

The main purpose of this adapter is to integrate Tesla data into ioBroker without directly querying the vehicle's systems. By utilizing TeslaFi’s existing data polling, the adapter avoids additional requests to the vehicle, preserving battery life and ensuring efficient data access.

## Features

The adapter connects to the TeslaFi API to retrieve comprehensive details about your Tesla vehicle and makes this data accessible within ioBroker. All Tesla models supported by TeslaFi are fully compatible. Currently, the following data categories are available:

- **Thermal State**: Insights into the thermal management system and temperatures.
- **Battery State**: Information on battery status, charge level, and range.
- **Vehicle State**: General vehicle status, including position and overall condition.
- **Vehicle Data**: Vehicle-specific details such as name, and VIN.

## Typical Use Cases

- **Automation**: Trigger smart home actions based on the real-time status of your Tesla. For instance, automatically adjust home climate control when the vehicle arrives.
- **Energy Management**: Optimize energy consumption by scheduling vehicle charging times and monitoring battery status directly from ioBroker.
- **Notifications and Reporting**: Set up alerts for specific vehicle conditions, such as low battery level, completed charging sessions or available updates.

## Configuration

Configuring the adapter is straightforward:

1. Enter your TeslaFi API key in the adapter's configuration screen.
2. Set the desired polling interval to customize how frequently data is updated.

## Geofencing (presence / enter / leave)

The adapter can turn TeslaFi's tagged location (`vehicle-state.location`) into reliable presence events — for example to open the garage door only when the car actually comes home. Matching is done by exact location name (as tagged in TeslaFi), so no GPS distance math is involved.

Configure your geofences in the **Geofence** tab. Each row has:

| Column | Meaning |
| --- | --- |
| **TeslaFi location name** | Exact tag name from TeslaFi (e.g. `Home`) |
| **Min. away (minutes)** | The car must have been away at least this long before an `enter` event may fire (blocks brief repositioning) |
| **Require motion** | Only fire `enter` if the car actually moved while away |
| **Motion speed threshold (km/h)** | Speed that counts as motion |
| **Debounce (polls)** | Number of consecutive polls a change must persist before `enter`/`leave` fires (protects against GPS flicker) |

For each configured location the adapter creates:

- `geofence.current` – the currently tagged location
- `geofence.<Location>.present` – confirmed presence (boolean)
- `geofence.<Location>.enter` – pulses `true` for a single poll on a filtered arrival
- `geofence.<Location>.leave` – pulses `true` for a single poll on departure
- `geofence.<Location>.awaySince` – timestamp (ms) since the car left; `0` while present

`<Location>` is the TeslaFi location name with characters that are not allowed in ioBroker object IDs replaced by `_`. For example a location tagged `My Home` results in the states `geofence.My_Home.*`.

No `enter` event is emitted on adapter startup, and GPS fluctuations while parked do not produce events.

### Example: open the garage on homecoming

Trigger a JavaScript/Blockly rule on the rising edge of `teslafi.0.geofence.Home.enter`:

```javascript
on({ id: "teslafi.0.geofence.Home.enter", val: true, ack: true }, () => {
    setState("zigbee.0.garage_door.open", true);
});
```

With `minAwayMinutes: 10`, `requireMotion: true` and `debouncePolls: 2` this fires exactly once when the car returns home after a real trip, while ignoring short repositioning near the house, GPS jitter, and adapter restarts.

## Compatibility

The adapter is compatible with all Tesla models supported by TeslaFi. A valid TeslaFi account with API access is required.

## Active Development and User Contributions

The TeslaFi adapter is actively maintained, and additional features or data categories can be added based on user requests. Feel free to submit your ideas and help improve the adapter for the entire community!

## Donate

<a href="https://www.paypal.com/donate/?hosted_button_id=6EE4YUJRK7UWC"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.teslafi/master/docu/bluePayPal.svg" height="40"></a>
If you enjoyed this project — or just feeling generous, consider buying me a beer. Cheers! :beers:

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 3.1.0 (2026-10-11)

- (hombach) added geofence presence/enter/leave with away- and motion-gates (#325)
- (hombach) fixed speed unit: `vehicle-state.speed` is now labeled mph and a new `vehicle-state.speed_km` (km/h) was added
- (hombach) geofence: harden against invalid config values, non-numeric speed and colliding/duplicate location names
- (hombach) speed unit label is now also corrected on existing installations
- (hombach) switch to iobroker testing 6.x
- (hombach) updated dependencies

### 3.0.4 (2026-08-10)

- (hombach) projectUtils: use extendObject instead of setObject in forceMode so user customizations survive restarts
- (hombach) updated dependencies

### 3.0.3 (2026-07-05)

- (hombach) removed unneeded test devDependencies (chai, sinon-chai, proxyquire) and switched tests to Node.js assert
- (hombach) updated axios

### 3.0.2 (2026-06-19)

- (hombach) fixed warnings by adapter checker

### 3.0.1 (2026-06-05)

- (hombach) upgraded TypeScript to 6.x
- (hombach) fixed warnings by adapter checker
- (hombach) updated dependencies

## License

MIT License

Copyright (c) 2024-2026 C.Hombach <TeslaFi@homba.ch>

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