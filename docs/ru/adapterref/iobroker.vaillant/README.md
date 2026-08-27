---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vaillant/README.md
title: ioBroker.vaillant
hash: xtCiRiPy2F+sc6R0qHkOVGNVjmBV7hz2yzhJ+Xt9u/0=
---
![Логотип](../../../en/adapterref/iobroker.vaillant/admin/vaillant.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.vaillant.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vaillant.svg)
![Количество установок (последние)](http://iobroker.live/badges/vaillant-installed.svg)
![Количество установок (стабильных)](http://iobroker.live/badges/vaillant-stable.svg)
![Статус зависимости](https://img.shields.io/david/TA2k/iobroker.vaillant.svg)
![Известные уязвимости](https://snyk.io/test/github/TA2k/ioBroker.vaillant/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.vaillant.png?downloads=true)

# IoBroker.vaillant
## Адаптер Vaillant для ioBroker
Vaillant multiMatic и адаптер myVaillant

### Начиная
Введите адрес электронной почты и пароль от приложения multimatic/senso или myVaillant в параметрах экземпляра.

Вход в систему myVAILLANT осуществляется автоматически, включая защиту от авторизации Vaillant — вам нужны только ваш адрес электронной почты и пароль. Сессия сохраняется после перезагрузки, поэтому адаптеру не нужно каждый раз входить в систему с нуля.

Настройки можно изменить, отрегулировав их в подразделе «Конфигурация». Некоторые настройки применяются только в режиме ON или MANUAL, но не в режимах AUTO или TIME_CONTROLLED.

## **Пример работы Multimatic:**
**Горячая вода**: vaillant.0.serialnummer.systemcontrol/tli.dhw.hotwater.configuration.hotwater_temperature_setpoint **Отопление**: Сначала установите режим MANUAL vaillant.0.serialnummer.systemcontrol/tli.zones03.heating.configuration.operation_mode MANUAL Затем установите температуру vaillant.0.serial.systemcontrol/tli.zones03.heating.configuration.manual_mode_temperature_setpoint И, наконец, установите режим работы TIME_CONTROLLED

Параметры можно настроить с помощью элемента parameterValue. Обратите внимание, какие значения допустимы в объекте определения.

## **Пример myVaillant:**
vaillant.0.id.systemControlState.controlState.domesticHotWater01.boost: установите значение true/false для включения или выключения функции повышения температуры; vaillant.0.id.systemControlState.controlState.zones01.desiredRoomTemperatureSetpoint: установите комнатную температуру; vaillant.0.id.systemControlState.controlState.zones01.setBackTemperature; vaillant.0.id.systemControlState.controlState.zones01.heatingOperationMode OFF MANUAL TIME_CONTROLLED; vaillant.0.id.systemControlState.controlState.domesticHotWater01.operationMode OFF MANUAL TIME_CONTROLLED

## Удаленные команды
Для обновления и предопределенных `vaillant.0.id.remote`

Предопределенные удаленные состояния в разделе `vaillant.0.id.remote`:

- `Refresh` / `RefreshStats` - запускает обновление данных
- `boost` - функция повышения мощности горячего водоснабжения (вкл/выкл)
- `quickVeto` + `duration` - температура зоны быстрого вето (0 для отключения)
- `ventilationBoost` - усиление вентиляции (вкл/выкл)
- `coolingForDays` - охлаждение в течение N дней (0 = отменить)
- `eebusEnabled` - включение/отключение интерфейса EEBUS
- `holiday` - режим отпуска/отсутствия в формате JSON, например, `{"startDateTime":"2024-01-01T00:00:00.000Z","endDateTime":"2024-01-07T23:59:59.999Z","setpoint":10}`. Для отмены отправьте пустое значение (или `{}`). Параметр `setpoint` необходим для контроллеров vrc700 и отклоняется для tli. Некорректно сформированный JSON игнорируется (запрос не отправляется).
- `ventilationOperationMode` / `ventilationFanStage` - используются вместе с `ventilationIndex` для указания типа вентиляционного блока. `ventilationFanStage` также использует `ventilationFanStageType` (ДЕНЬ или НОЧЬ).
- `customCommand` - см. ниже

Дополнительные данные только для чтения (перенесенные из mypyllant) находятся в следующих папках: `vaillant.0.id.troubleCodes`, `.rts`, `.mpc`, `.energyManagement`, `.eebus`

## Пользовательская команда
Для пультов, не заданных в предустановленных настройках, можно использовать пользовательский пульт управления `vaillant.0.id.remotes.customCommand`

### Примеры:
## Диапазон зоны может составлять от 0 до X. Пожалуйста, проверьте зону/0/ или зону/2/.
зона/0/xxxx

зона/1/xxxx

зона/2/xxxx

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