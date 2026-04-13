---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vw-connect/README.md
title: ioBroker.vw-connect
hash: uSySW6XTQD7Ml8Wf5ZMTTDDlxCoRRftoS2wshs7h1RI=
---
![Логотип](../../../en/adapterref/iobroker.vw-connect/admin/vw-connect.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.vw-connect.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vw-connect.svg)
![Статус зависимости](https://img.shields.io/david/ta2k/iobroker.vw-connect.svg)
![Известные уязвимости](https://snyk.io/test/github/ta2k/ioBroker.vw-connect/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.vw-connect.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/ta2k/ioBroker.vw-connect/master.svg)

# IoBroker.vw-connect
## Адаптер vw-connect для ioBroker
Адаптер для VW We Connect, We Connect ID, We Charge, myAudi, Skoda Connect, Seat Connect и We Connect Go.

Пожалуйста, обновите вашу систему на Node 10.
<https://forum.iobroker.net/topic/22867/how-to-node-js-f%C3%BCr-iobroker-richtig-updaten>

## Использование
Используйте режим дистанционного управления для удаленного управления автомобилем.
Нормальное обновление — это интервал опроса для получения данных из облака VAG. Принудительное обновление — для автомобилей без электропривода, чтобы принудительно обеспечить обновление; это число ограничено VAG до повторного включения автомобиля.
Данные о поездке доступны только для автомобилей без электропривода.

Вы можете установить температуру климат-контроля в файле .climater.settings.targetTemperature.content.

## Обсуждение и вопросы
<https://forum.iobroker.net/topic/26438/test-adapter-vw-connect-für-vw-id-audi-seat-skoda>

## Пояснение к полям статуса
### Список записей
```

```

### 0.7.16 (2026-03-18)
- исправить подключение MQTT к MySkoda

### 0.7.15 (2025-11-26)
- исправление токена обновления vw

### 0.7.14 (2025-11-25)
- исправлена ошибка входа в систему с использованием идентификатора vw

### 0.7.13 (2025-11-09)
- Исправлена ошибка входа в систему Skoda

### 0.7.12 (2025-05-05)
- Исправлена ошибка с токеном обновления Skoda
- исправление для активации вентиляции
- добавить новые неподдерживаемые конечные точки

### 0.7.9 (2025-03-20)
- исправление для настенного зарядного устройства ID

### 0.7.7 (2025-03-02)
- Исправлена ошибка, связанная с дополнительным обогревом Skoda и продолжительностью его работы.
- Исправление проблемы с блокировкой/разблокировкой дверей Skoda

### 0.7.6 (2025-02-28)
- Исправлена ошибка, из-за которой обновления статуса зарядки происходили только при запуске.
- Исправлена ошибка в программе Skoda isMoving State

### 0.7.3 (2025-02-26)
- исправление для установки setTemperature
- Исправление проблемы с блокировкой при разблокировке дверей Skoda

### 0.7.0 (2025-02-25)
- исправление для Skoda и Seat
— Структура состояний полностью изменена, пожалуйста, удалите старые состояния в разделе «Объекты».

### 0.6.1 (01.10.2024)
- Исправлена ошибка входа в систему Skoda

### 0.6.0 (2024-04-11)
- добавить дополнительные штаты Cupra

### 0.5.4 (2024-03-17)
- исправить состояние дверных окон

### 0.4.1
- Исправление обновления статуса VW

### 0.0.65
- Исправлена ошибка входа в Cupra

### 0.0.63
- Исправлена ошибка входа в систему VW/Skoda Etron

### 0.0.62
- Исправлена ошибка входа в систему Audi etron

### 0.0.61
- Исправлена ошибка входа по ID

### 0.0.60
- Незначительные улучшения. Минимальный интервал зарядки WeCharge теперь составляет 15 минут.

### 0.0.55
- исправить обновление статуса идентификатора

### 0.0.51
- исправлена ошибка входа в систему Audi Etron

### 0.0.48
- Исправлена ошибка входа в систему, исправлено обновление аудиосистемы, добавлено ограничение для Wallbox.

### 0.0.43
- увеличить время ожидания обновления токена

### 0.0.42
- Исправлена ошибка входа в систему Skoda

### 0.0.40
- Добавлена система климат-контроля версии 3 для новых автомобилей. Добавлены Powerpass и Seat Elli.

### 0.0.39
- исправлена ошибка входа в систему с использованием ID

### 0.0.36
- добавить поддержку Skoda Enyaq

### 0.0.35
- добавлена совместимость с Node.js версии 10.

### 0.0.34
- добавить автоматическое подтверждение нового согласия на обработку персональных данных

### 0.0.32
- правильный выбор последних поездок

### 0.0.31
- включить возможность выбора нескольких типов поездок

### 0.0.30
- Исправлена проблема с несколькими автомобилями, добавлен режим VWv2; на данный момент нет никакой разницы между VW и VWv2.

### 0.0.29
- Исправлена ошибка в функции skoda refreshToken, внесены небольшие улучшения.

### 0.0.26
- исправления ошибок

### 0.0.25
- мы взимаем дополнительную плату

### 0.0.24
- добавить удаленное обновление состояния

### 0.0.23
- Добавлены сиденья и новая система климат-контроля v2

### 0.0.22
- Расчет наружной температуры в °C также доступен для автомобилей Skoda и Audi.

### 0.0.21
- добавить пульты дистанционного управления для идентификации

### 0.0.20
- Исправлена ошибка входа в Audi, добавлен вход по ID.

### 0.0.19
- Сохранять объекты состояния в файле state по идентификатору вместо последовательных чисел.

### 0.0.18
- Исправлена ошибка отображения состояния батареи для моделей 2020 года.

### 0.0.17
- Добавлена поддержка моделей 2020 года

### 0.0.16
- Исправлены проблемы с js.controller 3

### 0.0.11
- Исправлена ошибка Audi, связанная с несколькими автомобилями.
- скрыть ошибку обновления статуса, если эта функция недоступна

## License

MIT License

Copyright (c) 2019-2030 ta2k <tombox2020@gmail.com>

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