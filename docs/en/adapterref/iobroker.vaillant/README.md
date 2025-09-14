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

Vaillant multiMatic und myVaillant Adapter

### Getting started

In den Instanzoptionen mail und password der multimatic /senso oder myVaillant app eingeben.

Configuration können geändert werde in dem sie unter dem Unterpunkt configuration angepasst werden. Manche configuration werden erst angewendet wenn der Modus auf ON oder MANUAL ist und nicht AUTO oder TIME_CONTROLLED

## **Beispiel Mutlimatic:**

**Warmwasser**: vaillant.0.serialnummer.systemcontrol/tli.dhw.hotwater.configuration.hotwater_temperature_setpoint
**Heizung**:
Erst auf MANUAL
vaillant.0.serialnummber.systemcontrol/tli.zones03.heating.configuration.operation_mode
MANUAL
Dann die Temperatur
vaillant.0.serial.systemcontrol/tli.zones03.heating.configuration.manual_mode_temperature_setpoint
Und am Ende operation_mode auf TIME_CONTROLLED

Parameter können über den Punkt parameterValue angepasst werden dabei beachten welche Werte im Objekt definition erlaubt sind.

## **Beispiel myVaillant:**

vaillant.0.id.systemControlState.controlState.domesticHotWater01.boost auf true/false setzen um den Boost zu aktivieren oder deaktivieren
vaillant.0.id.systemControlState.controlState.zones01.desiredRoomTemperatureSetpoint um die RaumTemperatur zu setzen
vaillant.0.id.systemControlState.controlState.zones01.setBackTemperature
vaillant.0.id.systemControlState.controlState.zones01.heatingOperationMode OFF MANUAL TIME_CONTROLLED
vaillant.0.id.systemControlState.controlState.domesticHotWater01.operationMode OFF MANUAL TIME_CONTROLLED

## Remote Commands

For Refresh and predefined
`vaillant.0.id.remote`

## Custom Command

You can use custom Commmand remote for not predefined remotes
`vaillant.0.id.remotes.customCommand`

### Examples:

## Die zone kann von 0 bis X gehen. Bitte zone/0/ oder zone/2/ testen

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
{w
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

<!-- ### **WORK IN PROGRESS** -->
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

Copyright (c) 2020-2030 TA2k <tombox2020@gmail.com>

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
