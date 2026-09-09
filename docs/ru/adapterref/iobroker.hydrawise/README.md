---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hydrawise/README.md
title: ioBroker.hydrawise
hash: AiuiMTnyXaA3/MZFrZTbYLzp2haB3rke2rMy/+RYqCk=
---
![Логотип](../../../en/adapterref/iobroker.hydrawise/admin/hydrawise.jpg)

![Версия NPM](https://img.shields.io/npm/v/iobroker.hydrawise.svg?style=flat-square)
![Загрузки](https://img.shields.io/npm/dm/iobroker.hydrawise.svg?label=npm%20downloads&style=flat-square)
![node-lts](https://img.shields.io/node/v-lts/iobroker.hydrawise?style=flat-square)
![Статус зависимостей Libraries.io для последней версии](https://img.shields.io/librariesio/release/npm/iobroker.hydrawise?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/sentiq/iobroker.hydrawise?style=flat-square)
![размер репозитория GitHub](https://img.shields.io/github/repo-size/sentiq/iobroker.hydrawise?logo=github&style=flat-square)
![активность коммитов на GitHub](https://img.shields.io/github/commit-activity/m/sentiq/iobroker.hydrawise?logo=github&style=flat-square)
![Последний коммит на GitHub](https://img.shields.io/github/last-commit/sentiq/iobroker.hydrawise?logo=github&style=flat-square)
![Проблемы на GitHub](https://img.shields.io/github/issues/sentiq/iobroker.hydrawise?logo=github&style=flat-square)
![Статус рабочего процесса GitHub](https://img.shields.io/github/actions/workflow/status/sentiq/iobroker.hydrawise/test-and-release.yml?branch=master&logo=github&style=flat-square)
![Бета](https://img.shields.io/npm/v/iobroker.hydrawise.svg?color=red&label=beta)
![Стабильный](http://iobroker.live/badges/hydrawise-stable.svg)
![Установлено](http://iobroker.live/badges/hydrawise-installed.svg)

# ioBroker.hydrawise

## Версии

Интегрируйте контроллер Hydrawise в ioBroker.

Оба API предоставляют информацию о зонах и расписаниях. По умолчанию используется **версия 2 (GraphQL)** (тот же логин, что и в приложении Hydrawise). **Версия 1 (REST)** является резервным вариантом с использованием ключа API, если GraphQL недоступен. Включите один или оба API.

- **v2** (рекомендуется): адрес электронной почты/пароль, как в приложении —`zones.*` ,`sensors.*` ,`weather.*` ,`water.*` ,`controller.*` (плюс погода, датчики измерений, индикатор утечки, команды зон GraphQL).
- **v1** (резервный вариант): ключ API —`schedule.*` /`customer.*` (те же зоны и расписание, без метеорологических или измерительных датчиков).

## Документация

### API версии 2 (рекомендуется)

v2 — это неофициальный API GraphQL, используемый приложением Hydrawise.`app.hydrawise.com/api/v2/graph` Включите **API версии 2 (GraphQL)** в настройках экземпляра и введите тот же адрес электронной почты и пароль, что и на hydrawise.com.

### API версии 1 (резервный вариант)

Это необходимо только в том случае, если GraphQL недоступен:

- Войдите в систему по адресу <https://app.hydrawise.com/config/account-details>
- Чтобы сгенерировать ключ API, нажмите кнопку «Сгенерировать ключ API» в разделе «Настройки учетной записи».
- Вставьте ключ во вкладку v1.
- Документация по API: <https://support.hydrawise.com/hc/en-us/articles/360008965753-Hydrawise-API-Information>

| Дерево объектов                                     | Источник                       | Контролирует орошение?                               |
| --------------------------------------------------- | ------------------------------ | ---------------------------------------------------- |
| `schedule.*`                                        | v1 REST                        | да (`setzone.php` )                                  |
| `zones.*`                                           | v2 GraphQL                     | Да (мутации GraphQL), только если включена версия 2. |
| `water.*` ,`sensors.*` ,`weather.*` ,`controller.*` | v2 GraphQL                     | только для чтения                                    |
| `info.connection`                                   | экземпляр (все включенные API) | —                                                    |
| `info.connectionV2`                                 | v2 Только GraphQL              | —                                                    |

Административный светофор (`info.connection` Индикатор ) горит зеленым только в том случае, если **все включенные API** находятся в сети. Версия v1 включена, но не работает, а версия v2 в порядке → желтый/красный. Версия v2 только и подключена → зеленый.`info.connectionV2` остается верным всякий раз, когда работает GraphQL.

v1`schedule.sensors.*` Содержит только _конфигурацию_ датчиков. Измерения расхода, количества осадков и подозрения на утечку берутся из версии 2.`sensors.*` /`water.leakSuspected` .

Интервал опроса по умолчанию в версии 2 составляет **300 секунд** (минимум 120). Для каждого аккаунта (включая официальное приложение) действует ограничение на количество запросов GraphQL. Не уменьшайте это значение без веских причин.

`customerdetails.php` Опрос выполняется по собственному 5-минутному таймеру с задержкой после HTTP-кода 429. Команды никогда не обращаются к этой конечной точке.

> **Примечание**\
> &#x20;После обновления с версии 0.0.15 вам необходимо повторно ввести свой API-ключ.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.0.1 (2026-09-03)

* (SentiQ) **FIXED**: Instance `info.connection` follows every enabled API (v2-only no longer stays red)

### 2.0.0 (2026-09-02)

* (SentiQ) **NEW**: Optional Hydrawise v2 GraphQL API (water usage, live sensors, weather, leak indicator, zone commands)
* (SentiQ) **ENHANCED**: customerdetails.php polls on its own 5-minute timer with backoff after rate limits

### 1.1.0 (2026-09-01)

* (SentiQ) **FIXED**: Relay ID mapping no longer writes onto the Object constructor
* (SentiQ) **FIXED**: runDefault reset no longer accidentally stops the zone
* (SentiQ) **ENHANCED**: Object creation only on structure change; poll overlap protection
* (SentiQ) **ENHANCED**: Replaced axios with native fetch; timers cleaned up on unload
* (SentiQ) **TESTING**: Unit tests for helpers (name2id, URL builder, structure signature)

### 1.0.6 (2026-08-09)

- (SentiQ) updated dependencies
- (SentiQ) Adapter requires node.js >= 22 now

### 1.0.5 (2025-12-05)

- (SentiQ) updated js-controller dependency
- (SentiQ) updated @iobroker/adapter-dev dependency

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2025-2026 SentiQ <yves.nuesser@proton.me>

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