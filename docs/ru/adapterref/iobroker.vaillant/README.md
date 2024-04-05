---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vaillant/README.md
title: ioBroker.vaillant
hash: 0S0upJibblOA6l9ZNY0BN0ASNBRryqHH3O/DxLiNUT4=
---
![Логотип](../../../en/adapterref/iobroker.vaillant/admin/vaillant.png)

![НПМ-версия](http://img.shields.io/npm/v/iobroker.vaillant.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vaillant.svg)
![Количество установок (последних)](http://iobroker.live/badges/vaillant-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/vaillant-stable.svg)
![Статус зависимости](https://img.shields.io/david/TA2k/iobroker.vaillant.svg)
![Известные уязвимости](https://snyk.io/test/github/TA2k/ioBroker.vaillant/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.vaillant.png?downloads=true)

# IoBroker.vaillant
## Адаптер vaillant для ioBroker
Адаптер Vaillant multiMatic и myVaillant

### Начиная
В этом месте можно мгновенно выбрать почту и пароль для multimatic/senso или приложения myVaillant.

Конфигурация может быть изменена в соответствии с конфигурацией Unterpunkt. Первая конфигурация включается при использовании режима ON или MANUAL, а не AUTO или TIME_CONTROLLED.

## **Beispiel Mutlimatic:**
**Теплая вода**: vaillant.0.serialnummer.systemcontrol/tli.dhw.hotwater.configuration.hotwater_temperature_setpoint **Heizung: Сначала в РУЧНОМ vaillant.0.serialnumber.systemcontrol/tli.zones03.heating.configuration.operation_mode РУЧНОЙ Dann die Temperatur vaillant.0.serial.systemcontrol/tli.zones03.heating.configuration.manual_mode_temperature_setpoint Und am Ende Operation_mode auf TIME_CONTROLLED

Параметр können über den PunktparameterValue angepasst werden dabei Beachten welche Werte im Objekt Definition erlaubt sind.

## **Добавление myVaillant:**
vaillant.0.id.systemControlState.controlState.domesticHotWater01.boost или true/false setzen um den Boost для активации или деактивации vaillant.0.id.systemControlState.controlState.zones01.desiredRoomTemperatureSetpoint для RaumTemperatur для установки vaillant.0.id.systemControlState .controlState.zones01.setBackTemperature vaillant.0.id.systemControlState.controlState.zones01.heatingOperationMode OFF MANUAL TIME_CONTROLLED vaillant.0.id.systemControlState.controlState.domesticHotWater01.operationMode OFF MANUAL TIME_CONTROLLED

## Удаленные команды
Для обновления и предопределенных `vaillant.0.id.remote`

## Пользовательская команда
Вы можете использовать собственный командный пульт для непредопределенных пультов `vaillant.0.id.remotes.customCommand`

### Примеры:
## Зона смерти может быть от 0 до X gehen. Зона прикуса/0/ зона одера/2/ тестен
зона/0/хххх

зона/1/хххх

зона/2/хххх

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

Copyright (c) 2020 TA2k <tombox2020@gmail.com>

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