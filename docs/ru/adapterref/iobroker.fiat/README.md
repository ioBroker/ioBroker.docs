---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.fiat/README.md
title: ioBroker.fiat
hash: n21nQeX3lRWpDJAGybHkB3B7vtiKW6IVn8Ltgn8qqyo=
---
![Логотип](../../../en/adapterref/iobroker.fiat/admin/fiat.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.fiat.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.fiat.svg)
![Количество установок (последние)](https://iobroker.live/badges/fiat-installed.svg)
![Количество установок (стабильных)](https://iobroker.live/badges/fiat-stable.svg)
![Статус зависимости](https://img.shields.io/david/TA2k/iobroker.fiat.svg)
![НПМ](https://nodei.co/npm/iobroker.fiat.png?downloads=true)

# IoBroker.fiat
**Тесты:** ![Тестирование и выпуск](https://github.com/TA2k/ioBroker.fiat/workflows/Test%20and%20Release/badge.svg)

## Адаптер для Fiat Jeep для ioBroker
Адаптер для Fiat и Jeep

## Логинаблауф:
Используйте Fiat или Jeep App Mail и Passwort.

## Steuern
fiat.0.id.remote на истинном уровне управления ювелирными изделиями Befehl

### Ladeplan (remote.CPPLUS)
Состояние `<VIN>.remote.CPPLUS` используется в массиве объектов расписания (этот отдельный объект может быть активирован и автоматически установлен в пакете массива). Адаптер для Wrapper-Body с официальным приложением My-Uconnect:

```json
{
  "command": "CPPLUS",
  "pinAuth": "…",
  "schedules": [
    {
      "cabinPriority": false,
      "chargeToFull": false,
      "enableScheduleType": true,
      "endTime": "13:05",
      "repeatSchedule": true,
      "scheduleType": "CHARGE",
      "scheduledDays": {
        "friday": true, "monday": true, "saturday": true, "sunday": true,
        "thursday": true, "tuesday": true, "wednesday": true
      },
      "startTime": "13:00"
    }
  ]
}
```

Получите `/v2/accounts/{UID}/vehicles/{VIN}/ev/schedule/` — формат тела является общедоступным из `ScheduleV2Model$Post$Request` официального приложения (APK 1.99.701).

## Обсуждение и вопросы:
https://forum.iobroker.net/topic/46378/test-adapter-fiat-v0-0-x

## Changelog
### 0.0.11 (2026-06-28)
- Updated Dependencies and latest API changes

### 0.0.10 (2024-06-10)

- added schedule edit via remote.CPPLUS

### 0.0.7

- (TA2k) Added Jeep support

### 0.0.3

- (TA2k) Added precondition

### 0.0.2

- (TA2k) Enable deep refresh to update charging state

### 0.0.1

- (TA2k) initial release

## License

MIT License

Copyright (c) 2021-2030 TA2k <tombox2020@gmail.com>

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