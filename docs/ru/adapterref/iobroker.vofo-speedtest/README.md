---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vofo-speedtest/README.md
title: ioBroker.vofo-speedtest
hash: 9ZbE6oSfscyv0H3HB+zcsaB9Z6sw9bmNtPjrHqtvHYQ=
---
![Логотип](../../../en/adapterref/iobroker.vofo-speedtest/admin/vofo-speedtest.png)

![Лицензия GitHub](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.vofo-speedtest)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vofo-speedtest.svg)
![размер репозитория GitHub](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.vofo-speedtestd)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/vofo-speedtest/svg-badge.svg)
![активность коммитов на GitHub](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.vofo-speedtest)
![Количество коммитов на GitHub с момента последнего релиза (по дате)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.vofo-speedtest/latest)
![Последний коммит на GitHub](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.vofo-speedtest)
![Проблемы на GitHub](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.vofo-speedtest)
![Версия NPM](https://img.shields.io/npm/v/iobroker.vofo-speedtest.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/vofo-speedtest-stable.svg)
![Количество установок](https://iobroker.live/badges/vofo-speedtest-installed.svg)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.vofo-speedtest/actions/workflows/test-and-release.yml/badge.svg)
![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.vofo-speedtest/actions/workflows/github-code-scanning/codeql/badge.svg)

# ioBroker.vofo-speedtest

**Версия:**

**Тесты:**

> \[!ВАЖНО] Этот адаптер нельзя установить из GitHub## Адаптер vofo-speedtest для ioBroker

Speedtest на Vodafone.de

Реализует ту же методику, что и на сайте <https://speedtest.vodafone.de>

Тест также проводится на подключениях других провайдеров. Vodafone сообщает заявленную скорость только для своих клиентов, поэтому без подключения от Vodafone это невозможно. `downstreamBooked` и `upstreamBooked` Если виджеты останутся пустыми, они не будут отображать процент забронированной скорости.

## Начало теста

Адаптер работает постоянно и запускает тест самостоятельно:

- по расписанию в настройках экземпляра (по умолчанию: на 11-й и 41-й минуте каждого часа); оставьте это поле пустым, чтобы запускать тесты только по запросу.
- когда `true` написано для `vofo-speedtest.0.test.start` например, с помощью кнопки в настройках экземпляра или виджетов, или с помощью скрипта.

Старт во время тестового запуска игнорируется.

| Состояние      | Значение                                                                                                                                                 |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `test.start`   | Писать `true` начать тест                                                                                                                                 |
| `test.running` | Проводится тестирование.                                                                                                                                 |
| `test.phase`   | Этап тестирования: `init`, `download`, `upload`, `ping`, пуст в режиме ожидания                                                                          |
| `test.speed`   | Текущая скорость загрузки и выгрузки в Мбит/с                                                                                                            |
| `test.error`   | Ошибка последнего теста, пустое значение, если тест пройден успешно. Также указывает, что если сервер ping не ответил, то загрузка и выгрузка корректны. |

## Виджеты

Адаптер обеспечивает одинаковый интерфейс для трех сторон: индикаторы скорости загрузки и выгрузки, процент от заявленной скорости (если провайдер ее предоставляет), пинг, потеря пакетов, время последнего теста и кнопка для запуска теста. Во время теста индикаторы показывают текущую скорость.

- **vis-2** : набор виджетов `vofo-speedtest`
- **ioBroker.devices** : плитка размером 1x1, 2x0.5 и 2x1
- **Веб-компонент** : `<iob-vofo-speedtest>` для каждого хозяина `@iobroker/web-components` например, Аура

## Кредиты

Создание этого адаптера было бы невозможно без огромной работы Питера Баумерта [(ioBroker.unifi-protect@outlook.com)](mailto:ioBroker.unifi-protect@outlook.com) , который разработал и реализовал первоначальную версию этого адаптера.

## Отказ от ответственности

Vodafone является товарным знаком компании Vodafone GmbH. Я никоим образом не являюсь представителем или аффилированным лицом компании Vodafone GmbH, а также любых связанных с ней дочерних компаний, логотипов или товарных знаков.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 3.1.0 (2026-11-16)
- (bluefox) Added the short form of the web component manifests (tag, name, icon, size) to `common.webComponents`, so that hosts like Aura can list the components before the adapter is installed; the build writes it with `iob-web-components sync-io-package`

### 3.0.1 (2026-11-08)
- (mcm1957) Issues detected by repositorychecker have been fixed

### 3.0.0 (2026-11-08)
- (copilot) BREAKING: Adapter requires node.js >= 22.19.0 now
- (copilot) BREAKING: Adapter requires admin >= 8.3.10 now
- (copilot) BREAKING: Adapter requires js-controller >= 6.0.11 now
- (bluefox) BREAKING: The adapter runs permanently now and starts the test by itself. A schedule changed in the instance settings is taken over
- (bluefox) BREAKING: The option "Use curl" has been removed. node-libcurl is not used anymore, download and upload run over node.js https
- (bluefox) Added: start a test with the state `test.start` (#153), and the states `test.running`, `test.phase`, `test.speed` and `test.error`
- (bluefox) Added: the instance settings show the result and the running test, with a button to start a test
- (bluefox) Added: `test.error` tells if the ping server did not answer
- (bluefox) Added: a vis-2 widget, a tile for ioBroker.devices and the web component `<iob-vofo-speedtest>`
- (bluefox) Fixed: upload values were missing without curl (#253)
- (bluefox) Fixed: the adapter did not stop if the API key could not be found on speedtest.vodafone.de, the next start failed with "already running" (#239, #208)
- (bluefox) Fixed: the download test without curl used outdated server paths
- (bluefox) The option "Local address" is evaluated now
- (bluefox) The adapter was refactored to TypeScript

### 2.0.1 (2024-04-29)
* (mcm1957) Dependencies have been updated

### 2.0.0 (2024-03-29)
* (mcm1957) BREAKING: Adapter requires node.js 18, js-controller >= 5 and admin >= 6 now
* (mcm1957) Adapter has been moved to iobroker-community-adapters organisation
* (mcm1957) Metrialize admin UI has been removed as jsonConfig is available
* (mcm1957) Dependencies have been updated

## License
MIT License

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2020-2023 Peter Baumert <ioBroker.unifi-protect@outlook.com>

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