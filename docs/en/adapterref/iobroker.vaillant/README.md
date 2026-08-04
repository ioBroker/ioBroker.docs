![Logo](admin/vaillant.png)

# ioBroker.vaillant

[![NPM version](http://img.shields.io/npm/v/iobroker.vaillant.svg)](https://www.npmjs.com/package/iobroker.vaillant)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vaillant.svg)](https://www.npmjs.com/package/iobroker.vaillant)
![Number of Installations (latest)](http://iobroker.live/badges/vaillant-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/vaillant-stable.svg)
[![Dependency Status](https://img.shields.io/david/TA2k/iobroker.vaillant.svg)](https://david-dm.org/TA2k/iobroker.vaillant)
[![Known Vulnerabilities](https://snyk.io/test/github/TA2k/ioBroker.vaillant/badge.svg)](https://snyk.io/test/github/TA2k/ioBroker.vaillant)

[![NPM](https://nodei.co/npm/iobroker.vaillant.png?downloads=true)](https://nodei.co/npm/iobroker.vaillant/)

## vaillant adapter for ioBroker

Vaillant multiMatic and myVaillant adapter

### Getting started

Enter the mail and password of the multimatic/senso or myVaillant app in the instance options.

The myVAILLANT login is handled automatically, including Vaillant's login protection - you only need your email and password. The session is kept across restarts, so the adapter does not log in from scratch every time.

Configurations can be changed by adjusting them under the configuration sub-item. Some configurations are only applied when the mode is ON or MANUAL and not AUTO or TIME_CONTROLLED.

## **Example multimatic:**

**Hot water**: vaillant.0.serialnummer.systemcontrol/tli.dhw.hotwater.configuration.hotwater_temperature_setpoint
**Heating**:
First set to MANUAL
vaillant.0.serialnummber.systemcontrol/tli.zones03.heating.configuration.operation_mode
MANUAL
Then the temperature
vaillant.0.serial.systemcontrol/tli.zones03.heating.configuration.manual_mode_temperature_setpoint
And finally set operation_mode to TIME_CONTROLLED

Parameters can be adjusted via the parameterValue item. Note which values are allowed in the definition object.

## **Example myVaillant:**

vaillant.0.id.systemControlState.controlState.domesticHotWater01.boost set to true/false to enable or disable the boost
vaillant.0.id.systemControlState.controlState.zones01.desiredRoomTemperatureSetpoint to set the room temperature
vaillant.0.id.systemControlState.controlState.zones01.setBackTemperature
vaillant.0.id.systemControlState.controlState.zones01.heatingOperationMode OFF MANUAL TIME_CONTROLLED
vaillant.0.id.systemControlState.controlState.domesticHotWater01.operationMode OFF MANUAL TIME_CONTROLLED

## Remote Commands

For Refresh and predefined
`vaillant.0.id.remote`

Predefined remote states under `vaillant.0.id.remote`:

- `Refresh` / `RefreshStats` - trigger a data refresh
- `boost` - domestic hot water boost (on/off)
- `quickVeto` + `duration` - quick veto zone temperature (0 to disable)
- `ventilationBoost` - ventilation boost (on/off)
- `coolingForDays` - cooling for N days (0 = cancel)
- `eebusEnabled` - enable/disable the EEBUS interface
- `holiday` - holiday/away mode as json, e.g. `{"startDateTime":"2024-01-01T00:00:00.000Z","endDateTime":"2024-01-07T23:59:59.999Z","setpoint":10}`. Send an empty value (or `{}`) to cancel. `setpoint` is required for vrc700 controllers and rejected for tli. Malformed json is ignored (no request sent).
- `ventilationOperationMode` / `ventilationFanStage` - use together with `ventilationIndex` to address the ventilation unit. `ventilationFanStage` also uses `ventilationFanStageType` (DAY or NIGHT).
- `customCommand` - see below

Read-only extra data (ported from mypyllant) appears under:
`vaillant.0.id.troubleCodes`, `.rts`, `.mpc`, `.energyManagement`, `.eebus`

## Custom Command

You can use custom Commmand remote for not predefined remotes
`vaillant.0.id.remotes.customCommand`

### Examples:

## The zone can range from 0 to X. Please test zone/0/ or zone/2/

zone/0/xxxx

zone/1/xxxx

zone/2/xxxx

```json
{
  "url": "zone/0/heating/comfort-room-temperature",
  "data": { "comfortRoomTemperature": 10.5 }
}
```

```json
{
  "url": "zone/1/heating/comfort-room-temperature",
  "data": { "comfortRoomTemperature": 10.5 }
}
```

```json
{
  "url": "domestic-hot-water/255/operation-mode",
  "data": { "operationMode": "OFF" }
}
```

```json
{
  "url": "domestic-hot-water/255/temperature",
  "data": { "setpoint": 55 }
}
```

```json
{
  "url": "zone/1/heating/operation-mode",
  "data": { "operationMode": "DAY" }
}
```

```json
{
  "url": "zone/1/heating/set-back-temperature",
  "data": { "setBackTemperature": 20 }
}
```

```json
{
  "url": "zone/1/cooling/operation-mode",
  "data": { "operationMode": "DAY" }
}
```

```json
{
  "url": "zone/1/cooling/setpoint",
  "data": { "setpoint": 20 }
}
```

```json
{
  "url": "ventilation/0/operation-mode",
  "data": { "operationMode": "DAY" }
}
```

```json
{
  "url": "ventilation/0/operation-mode",
  "data": { "operationMode": "SET_BACK" }
}
```

```json
{
  "url": "ventilation/0/day-fan-stage",
  "data": { "maximumDayFanStage": 3 }
}
```

```json
{
  "url": "ventilation/0/night-fan-stage",
  "data": { "maximumNightFanStage": 2 }
}
```

```json
{
  "url": "zone/1/heating/quick-veto",
  "data": { "desiredRoomTemperatureSetpoint": 11, "duration": 3 },
  "method": "POST"
}
```

```json
{
  "url": "domestic-hot-water/255/boost",
  "data": {},
  "method": "POST"
}
```

```json
{
  "url": "domestic-hot-water/255/boost",
  "data": {},
  "method": "DELETE"
}
```

```json
{
  "url": "domestic-hot-water/255/circulation-pump/time-windows",
  "data": {
    "friday": [
      {
        "endTime": 540,
        "startTime": 360
      }
    ],
    "monday": [],
    "saturday": [],
    "sunday": [],
    "thursday": [],
    "tuesday": [],
    "wednesday": []
  }
}
```

```json
{
  "url": "domestic-hot-water/255/time-windows",
  "data": {
    "friday": [],
    "monday": [
      {
        "endTime": 1320,
        "startTime": 330
      }
    ],
    "saturday": [
      {
        "endTime": 1320,
        "startTime": 330
      }
    ],
    "sunday": [
      {
        "endTime": 1320,
        "startTime": 330
      }
    ],
    "thursday": [
      {
        "endTime": 1320,
        "startTime": 330
      }
    ],
    "tuesday": [
      {
        "endTime": 1320,
        "startTime": 330
      }
    ],
    "wednesday": [
      {
        "endTime": 1320,
        "startTime": 330
      }
    ]
  }
}
```

```json
{
  "url": "cooling-for-days",
  "data": {"value": 7},
  "method": "POST"
}
```

```json
{
  "url": "cooling-for-days",
  "method": "DELETE"
}
```

## Changelog
### 1.0.3 (2026-07-28)
 - fix writing hot water (dhw), circuit and ventilation settings from the objects (VRC700)
 - clearer log message with a customCommand example when a value is not directly writable

### 1.0.2 (2026-07-26)
 - fix changing values like temperature and operation mode from the objects (VRC700). Zone and hot water settings now write to the correct endpoint

### 1.0.1 (2026-07-24)
 - replaced the deprecated request library with axios
 - migrated to @iobroker/eslint-config and updated dependencies
 - require Node.js 22 and various repository fixes

### 1.0.0 (2026-07-24)
 - fix myVAILLANT login. Please enter your password again
 - stay logged in after a restart
 - new settings page - please open the settings and enter your password again
 - new data: fault codes, energy and EEBUS info
 - new controls: ventilation, cooling days and holiday mode

### 0.7.5 (2025-07-09)
 - revert change to fix save issue

### 0.7.2 (2024-04-18)

- fix month stats period

### 0.3.0

- add boost

### 0.1.2

- fix refresh token

### 0.1.1

- add myvaillant support and stats

### 0.0.15

- bugfixes

### 0.0.14

- add rooms support

### 0.0.13

- fix livereport order

### 0.0.11

- fix issue with js-controller 3.2

### 0.0.10

- fix issue with js-controller 3

### 0.0.8

- (TA2k) Fix Authorization problem and missing configuration states

### 0.0.6

- (TA2k) initial release

## License

MIT License

Copyright (c) 2020-2026 TA2k <tombox2020@gmail.com>

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
