---
BADGE-GitHub license: https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.homeconnect
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.homeconnect.svg
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.homeconnect
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.homeconnect
BADGE-GitHub commits since latest release (by date): https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.homeconnect/latest
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.homeconnect
BADGE-GitHub issues: https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.homeconnect
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.homeconnect.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/homeconnect-stable.svg
BADGE-Number of Installations: https://iobroker.live/badges/homeconnect-installed.svg
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.homeconnect/README.md
title: ioBroker.homeconnect
hash: BdcZm1VjlEnueSZVKY13h3Fx1CBwDnFApSOExNTZfZc=
---
![Логотип](../../../en/adapterref/iobroker.homeconnect/admin/homeconnect.png)

# IoBroker.homeconnect
## Требования перед установкой
- Узел 20, 22 или 24
- JS-контроллер >= 6.0.11
- Администратор >= 7.4.10

Для адаптера требуется ClientID. Используйте настройки для каждого шага регистрации.

<https://developer.home-connect.com>

![Скриншот](../../../en/adapterref/iobroker.homeconnect/img/registrierung1.JPG)

Для **Учетной записи пользователя Home Connect по умолчанию для тестирования** укажите адрес электронной почты, на который будет отправлено приложение Home Connect.
было зарегистрировано, это также потребуется позже в процессе авторизации.

![Скриншот](../../../en/adapterref/iobroker.homeconnect/img/registrierung2.JPG)

В поле **Тип учётной записи** выберите «Физическое лицо». Добавьте оставшиеся данные, если они доступны (не знаю, будут ли они проверяться).

![Скриншот](../../../en/adapterref/iobroker.homeconnect/img/application1.JPG)

Затем перейдите в раздел **Приложения**, а затем в раздел **Регистрация приложения**.

![Скриншот](../../../en/adapterref/iobroker.homeconnect/img/application2.JPG)

В поле **Идентификатор приложения** введите имя приложения, например, ioBroker. В поле **Поток авторизации OAuth** выберите поток устройства.

**Учётная запись пользователя Home Connect для тестирования** может оставаться пустой. В поле **Перенаправление успешного выполнения** введите URI, например, https://example.com.

Сохраните и получите нужный ClientID.

## Конфигурация
Добавьте имя пользователя, пароль и сгенерированный идентификатор клиента приложения Homeconnect в конфигурацию адаптера.

## Использование
С помощью состояний в командах можно останавливать, приостанавливать и возобновлять выполнение программы.
С помощью состояний в настройках можно выключать или включать устройство. Изменение значения programs.active.BSH_Common_Root_ActiveProgram приводит к запуску программы. Обновление iQ300: необходимо указать имя программы в этой переменной. Если копируется programs.selected.BSH_Common_Root_SelectedProgram, пользователь устройства может заранее определить нужную программу, и она будет запущена через ioBroker. Изменение значения programs.selected.BSH_Common_Root_SelectedProgram приводит к выбору программы или параметров.

## Ограничение скорости
[Ограничение скорости API](https://api-docs.home-connect.com/general/#rate-limiting)

- 10 сеансов мониторинга событий на пользователя и учетную запись Home Connect
- не добавлено
- 10 запросов в секунду (зависит от объема данных)

- не добавлено

- 10 обновлений токенов в минуту
- Срабатывает после 9 запросов в течение минуты. Затем блокируется на 1 минуту.
- 109 обновлений токенов в день
— Срабатывает после 99 запросов в течение суток. Затем блокируется до полуночи. Не уверен, что это действительно 24 часа.

## Homeconnect.0.rateTokenLimit.isBlocked
- true для блокировки и false для отсутствия блокировки

## Homeconnect.0.rateTokenLimit.limitJson
```JSON
{
  "tokenRefreshMinutesMax": 9, // Max requests per 10 minutes
  "tokenRefreshMinutesCount": 0, // Counter for max requests per 10 minutes
  "tokenRefreshMinutesLast": 1754680202619, // Start time as a timestamp from which counting begins
  "tokenRefreshDayMax": 99, // Max requests per day
  "tokenRefreshDayCount": 2, // Counter for max requests per day
  "tokenRefreshDayLast": 1754658108428, // Start time as a timestamp from which counting begins
  "tokenBlock": false, // True if a lock is active
  "tokenBlockTime": 0, // Timestamp when the lock was triggered
  "tokenReason": "No Block" // Name of the lock (internal adapter)
}
```

## Homeconnect.0.rateTokenLimit.reason
```JSON
    "states": {
      "0": "Nothing", // No lock
      "1": "Token Limit (10 per minute)", // 10 minute lock active
      "2": "Token Limit (100 per day)" // 24h active
    }
```

- 10 запросов в секунду в среднем (максимум 20 запросов в пике) с алгоритмом «дырявого ведра»

- Срабатывает после 15 запросов

- 1000 запросов на одного клиента и учетную запись пользователя Home Connect в день

— Срабатывает после 9999 запросов в течение одного дня. Затем блокируется до полуночи. Не уверен, что это действительно 24 часа.

- 50 запросов в минуту на одного клиента и учетную запись пользователя Home Connect

- Срабатывает после 49 запросов в течение одной минуты. Все запросы блокируются на одну минуту.

- 5 запросов на запуск на пользователя и учетную запись Home-Connect в минуту

- Срабатывает после 4 запросов в течение одной минуты. Все запросы блокируются на 1 минуту.

- 5 запросов на остановку на пользователя и учетную запись Home-Connect в минуту

- Срабатывает после 4 запросов в течение одной минуты. Все запросы блокируются на 1 минуту.

- 10 последовательных запросов на одного клиента и учетную запись пользователя Home Connect за 10 минут
- Срабатывает после 9 сообщений об ошибках в течение 10 минут. Все запросы блокируются на 10 минут.

## Homeconnect.0.rateLimit.isBlocked
- true для блокировки и false для отсутствия блокировки

## Homeconnect.0.rateLimit.limitJson
```JSON
{
  "requestsMinutesMax": 49, // Max requests per minute
  "requestsMinutesCount": 0, // Counter for max requests per minute
  "requestsMinutesLast": 1754680202594, // Start time as a timestamp from which counting begins
  "requestsDayMax": 999, // Max requests per day
  "requestsDayCount": 21, // Counter for max requests per day
  "requestsDayLast": 0, // Start time as a timestamp from which counting begins
  "requestsMinutesStartMax": 4, // Max start requests per minute
  "requestsMinutesStartCount": 0, // Counter for start requests per minute
  "requestsMinutesStartLast": 1754680202594, // Start time as a timestamp from which counting begins
  "requestsMinutesStopMax": 4, // Max stop requests per minute
  "requestsMinutesStopCount": 0, // Counter for stop requests per minute
  "requestsMinutesStopLast": 1754680202594, // Start time as a timestamp from which counting begins
  "responseErrorLast10MinutesMax": 9, // Max requests per 10 minutes
  "responseErrorLast10MinutesCount": 2, // Counter for max requests per 10 minutes
  "responseErrorLast10MinutesLast": 1754680143652, // Start time as a timestamp from which counting begins
  "requestBlock": false, // True if a lock is active
  "requestBlockTime": 0, // Timestamp when the lock was triggered
  "requestReason": "No Block", // Name of the lock (internal adapter)
  "requests": [ // All requests per day
    {
      "methode": "GET", // Methode
      "haId": "0000", // Serial number
      "url": "/status", // URL
      "date": "2025-08-14T18:46:17.535Z", // TIme
      "response": "OK" // OK == Kein Fehler / Error == Fehler
    },
    {
      "methode": "GET",
      "haId": "015030396331009276",
      "url": "/settings",
      "date": "2025-08-14T18:46:17.536Z",
      "response": "OK"
    },
  ],
}
```

## Homeconnect.0.rateLimit.reason
```JSON
    "states": {
      "0": "Nothing", // No lock
      "1": "Error Limit (10 per 10 minutes)", // Error lock active for 10 minutes
      "2": "Start (5 per minute)", // Start lock active for 1 minute
      "3": "Stop Limit (5 per minute)", // Stop lock active for 1 minute
      "4": "Request Limit (50 per minute)", // Lock active for 1 minute
      "5": "Request Limit (1000 per day)" // Block for one day active
    }
```

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

**WORK IN PROGRESS**

- (Lucky-ESA) Fixed: Name of the objects are deleted

### 1.5.0 (2025-09-02)

- (Lucky-ESA) Clean up state roles and code
- (Lucky-ESA) Added rate limiting
- (Lucky-ESA) Dependencies updated
- (Lucky-ESA) Added language selection
- (Lucky-ESA) Migrated to ESLint 9
- (Lucky-ESA) Adapter requires js-controller >= 6.0.11 now
- (Lucky-ESA) Adapter requires admin >= 7.6.17 now
- (mcm1957) Adapter requires node.js >= 20 now

### 1.4.3 (2024-11-19)

- (TA2k) fix for -001 devices
- (simatec) Adapter has been adapted to meet Responsive Design rules.

### 1.4.2 (2024-10-25)

- (TA2k) fix for devices with object values

### 1.4.1 (2024-07-02)

- (foxriver76) fixed invalid min/max values

### 1.4.0 (2024-04-18)

- (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
- (mcm1957) Dependencies have been updated

## License

The MIT License (MIT)

Copyright (c) 2024-2025 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2023 dna909 <dna909@googlemail.com>, TA2k

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.