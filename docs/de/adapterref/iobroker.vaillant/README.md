---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vaillant/README.md
title: ioBroker.vaillant
hash: 5z/xxo7MdLkfdYiIUHp6Kt782i+8+qwlnxgq7AmmwEA=
---
![Logo](../../../en/adapterref/iobroker.vaillant/admin/vaillant.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.vaillant.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.vaillant.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/vaillant-installed.svg)
![Anzahl Installationen (stabil)](http://iobroker.live/badges/vaillant-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/TA2k/iobroker.vaillant.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/TA2k/ioBroker.vaillant/badge.svg)
![NPM](https://nodei.co/npm/iobroker.vaillant.png?downloads=true)

# IoBroker.vaillant
## Vaillant-Adapter für ioBroker
Vaillant multiMatic und myVaillant Adapter

### Erste Schritte
Geben Sie in den Instanzoptionen die E-Mail-Adresse und das Passwort der MultiMatic/Senso- oder myvaillant-App ein.

Die Konfiguration kann geändert werden, indem sie unter dem Unterpunkt Konfiguration angepasst wird. Einige Optionen werden nur angewendet, wenn der Modus EIN oder MANUELL ist und nicht AUTO oder ZEITGESTEUERT.

## **Multimatic-Beispiel:**
**Warmwasser**: vaillant.0.serialnummer.systemcontrol/tli.dhw.hotwater.configuration.hotwater_temperature_setpoint **Heizung**: Zuerst auf MANUELL vaillant.0.serialnummber.systemcontrol/tli.zones03.heating.configuration.operation_mode MANUELL dann Temperatur einstellen vaillant.0.serial.systemcontrol/tli.zones03.heating.configuration.manual_mode_temperature_setpoint und schließlich operation_mode auf ZEITGESTEUERT

Parameter können über den Parameterwertpunkt angepasst werden, dabei ist zu beachten, welche Werte in der Objektdefinition erlaubt sind.

## **Beispiel myVaillant:**
vaillant.0.id.systemControlState.controlState.domesticHotWater01.boost auf true/false um Boost zu aktivieren oder zu deaktivieren vaillant.0.id.systemControlState.controlState.zones01.desiredRoomTemperatureSetpoint um gewünschte Raumtemperatur einzustellen vaillant.0.id.systemControlState.controlState.zones01.setBackTemperature vaillant.0.id.systemControlState.controlState.zones01.heatingOperationMode OFF MANUAL TIME_CONTROLLED vaillant.0.id.systemControlState.controlState.domesticHotWater01.operationMode OFF MANUAL TIME_CONTROLLED

## Remote-Befehle
Für Aktualisieren und vordefinierte `vaillant.0.id.remote`

## Benutzerdefinierter Befehl
Sie können eine benutzerdefinierte Command-Fernbedienung für nicht vordefinierte Fernbedienungen verwenden `vaillant.0.id.remotes.customCommand`

### Beispiele:
## Zonen können von 0 bis X reichen. Probieren Sie zone/0/ oder zone/2/ aus.
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

## Changelog

### 0.7.3

<!-- ### **WORK IN PROGRESS** -->
- fix month stats period
- initial english translation for documentation
- formal cleanups for publishing process

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