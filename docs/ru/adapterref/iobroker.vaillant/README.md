---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vaillant/README.md
title: ioBroker.vaillant
hash: oHusWnae3ROygjc/y6YEEP/LW8ZbCO2QY6Cc+3r9bYc=
---
![Логотип](../../../en/adapterref/iobroker.vaillant/admin/vaillant.png)

![версия НПМ](http://img.shields.io/npm/v/iobroker.vaillant.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vaillant.svg)
![Количество установок (последнее)](http://iobroker.live/badges/vaillant-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/vaillant-stable.svg)
![Статус зависимости](https://img.shields.io/david/TA2k/iobroker.vaillant.svg)
![Известные уязвимости](https://snyk.io/test/github/TA2k/ioBroker.vaillant/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.vaillant.png?downloads=true)

# IoBroker.vaillant
## Адаптер Vaillant для ioBroker
Vaillant multiMatic и адаптер myVaillant

### Начиная
Введите адрес электронной почты и пароль приложения MultiMatic /Senso или myvaillant в параметрах экземпляра.

Конфигурация может быть изменена, в которой они адаптированы под конфигурацию подпункта. Некоторые параметры применяются только в режиме ON или MANUAL, а не AUTO или TIME_CONTROLLED.

## **Пример мультиматического:**
**Горячая вода**: vaillant.0.serialnummer.systemcontrol/tli.dhw.hotwater.configuration.hotwater_temperature_setpoint **Отопление**: Сначала в ручном режиме vaillant.0.serialnummber.systemcontrol/tli.zones03.heating.configuration.operation_mode MANUAL затем установить температуру vaillant.0.serial.systemcontrol/tli.zones03.heating.configuration.manual_mode_temperature_setpoint и, наконец, режим работы в режиме TIME_CONTROLLED

Параметры можно адаптировать с помощью точки значения параметра, при этом следует учитывать, какие значения разрешены в определении объекта.

## **Пример myVaillant:**
vaillant.0.id.systemControlState.controlState.domesticHotWater01.boost на значение true/false для включения или выключения Boost vaillant.0.id.systemControlState.controlState.zones01.desiredRoomTemperatureSetpoint для установки желаемой температуры в помещении vaillant.0.id.systemControlState.controlState.zones01.setBackTemperature vaillant.0.id.systemControlState.controlState.zones01.heatingOperationMode OFF MANUAL TIME_CONTROLLED vaillant.0.id.systemControlState.controlState.domesticHotWater01.operationMode OFF MANUAL TIME_CONTROLLED

## Удаленные команды
Для обновления и предопределенных `vaillant.0.id.remote`

## Пользовательская команда
Вы можете использовать пользовательский пульт дистанционного управления Command для непредопределенных пультов дистанционного управления `vaillant.0.id.remotes.customCommand`

### Примеры:
## Зоны могут достигать от 0 до X. Попробуйте зону/0/ или зону/2/
зона/0/xxxx

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