---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.odl/README.md
title: ioBroker.odl
hash: ja4539IBHaJhsGqx+/ckSuW2iq2HTI33OsHJQcGkIBk=
---
![Логотип](../../../en/adapterref/iobroker.odl/admin/odl.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.odl.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.odl.svg)
![Количество установок (последних)](https://iobroker.live/badges/odl-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/odl-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.odl.png?downloads=true)

# IoBroker.odl
[![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/odl/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Тесты:** ![Тестирование и выпуск](https://github.com/crycode-de/iobroker.odl/workflows/Test%20and%20Release/badge.svg)

## ODL-адаптер для ioBroker
Этот адаптер интегрирует значения ODL (Ortsdosisleistung / Мощность амбиентной дозы) указанных точек измерения немецкого [Федеральное ведомство по радиационной защите (Bundesamt für Strahlenschutz, BfS)](https://www.bfs.de/) в ioBroker.

Для получения дополнительной информации о мощности амбиентной дозы в Германии посетите сайт <https://odlinfo.bfs.de/>.

---

## Актуальный Umweltradioaktivität в ioBroker
Адаптер интегрирован в ODL (Ortsdosisleistung) Сообщение об изменении сообщения [Bundesamtes für Strahlenschutz (BfS)](https://www.bfs.de/) в ioBroker.

Das Bundesweite Messnetz des BfS umfasst rund 1700 Ortsfeste Messtellen, die Permanent die vort aktuelle Gamma-Umweltradioaktivität (Ortsdosisleistung) erfassen und aufzeichnen. Die gewonnenen Messdaten werden vom BfS gesammelt, ausgewertet und öffentlich unter der _Datenlizenz Deutschland_ zur Verfügung gestellt.

Для получения информации о ODL здесь <https://odlinfo.bfs.de/>.

Адаптер имеет актуальную 1-контактную точку для сообщения непосредственно с [официальная дата Tenschnittstelle des BfS](https://odlinfo.bfs.de/ODL/DE/service/datenschnittstelle/datenschnittstelle_node.html). Этот адаптер BfS предназначен для использования с адаптером.
Все данные находятся в неподтвержденной форме, поэтому, если они используются в качестве адаптера, используйте адаптер.

Если вы активируете History-Adapter (_history_, _influxdb_ или _sql_) для вашего состояния, если вы используете его в Historie fehlende Datenpunkte durch den Adaptisch nachgettragen, sodass sich vollständige Zeitreihen ergeben.

Актуальное сообщение о стандартном адаптере указано в актуальном состоянии. Срок действия Актуального интервала не является для меня неправильным, если основное сообщение на BfS-сервере (при удалении от Messstelle) становится актуальным.
Прежде всего, автоматически запустите адаптеры для установки адаптера, чтобы избежать блокировки даты, и не устанавливайте все необходимые данные, а также данные, которые не используются в BfS.

[![Снимок экрана 1](./docs/ioBroker-odl-01.png)](../../../en/adapterref/iobroker.odl/docs/ioBroker-odl-01.png)

[![Снимок экрана 2](./docs/ioBroker-odl-02.png)](../../../en/adapterref/iobroker.odl/docs/ioBroker-odl-02.png)

---

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются начиная с js-controller 3.0.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 3.0.1 (2023-09-27)

* (crycode-de) Node.js >= 16 is required
* (crycode-de) Fixed issue with history adapters
* (crycode-de) Updated dependencies

### 2.0.5 (2022-04-24)

* (crycode-de) Fixed spelling issue in german translation
* (crycode-de) Updated dependencies

### 2.0.4 (2022-04-09)

* (crycode-de) Added info message about breaking changes when upgrading from <2.0.0 to >=2.0.0

### 2.0.3 (2022-03-23)

* (crycode-de) Optimized Sentry integration in admin

### 2.0.2 (2022-03-23)

* (crycode-de) Fixed config error (Sentry IOBROKER-ODL-2)
* (crycode-de) Updated dependencies

### 2.0.1 (2022-03-14)

* (crycode-de) Use official data API from BfS
* (crycode-de) **Breaking**: Use 9-digit identifiers instead of locality codes
  * New object will be created for each location
  * Migration from locality codes to identifiers is done on first start after adapter upgrade, but custom object settings (like history) have to be migrated manually
* (crycode-de) **Breaking**: The `.odl` state is now named `.value`
* (crycode-de) Added statistic states
* (crycode-de) Added optional support for cosmic and terrestrial value components (disabled by default)
* (crycode-de) Added `.status` state representing the location status given from BfS
* (crycode-de) If an enabled history (_history_, _influxdb_, _sql_) for `.value`, `.valueCosmic` or `.valueTerrestrial` is found, the adapter tries to load the timeseries data from BfS for past 7 days.
* (crycode-de) If the status of a location is not "in operation", the value states will be `null` with `q` set to `0x81` (general problem by sensor)
* (crycode-de) Complete rebuild of the admin interface using react
* (crycode-de) Randomize adapter schedule between minute 15 and 45 and also using seconds on first start to better spread API calls
* (crycode-de) Replaced `request` with `axios`
* (crycode-de) Updated adapter dev toolchain
* (crycode-de) Updated dependencies
* (crycode-de) Require node >=12
* (crycode-de) Use weblate for translations

### 1.1.4 (2021-01-16)

* (crycode-de) Updated BfS logo
* (crycode-de) Updated dependencies

### 1.1.3 (2020-12-31)

* (crycode-de) Fixed issue when log is not available at startup timeout

### 1.1.2 (2020-12-23)

* (crycode-de) Fix objects parameters for objects created before v1.1.1

### 1.1.1 (2020-12-23)

* (crycode-de) Fixed issue creating odl state object

### 1.1.0 (2020-12-21)

* (crycode-de) Added Sentry error reporting
* (crycode-de) Updated dependencies

### 1.0.7 (2020-10-14)

* (crycode-de) Added timeout to force exit the adapter after 10 minutes in case of any problems
* (crycode-de) Updated dependencies

### 1.0.6 (2020-10-01)

* (crycode-de) Hopefully fixed a bug where adapter did not exit as expected
* (crycode-de) Updated dependencies

### 1.0.5 (2020-02-05)

* (crycode-de) Use of `extendObject` to update names of existing objects.

### 1.0.4 (2020-02-03)

* (crycode-de) Updated connectionType and dataSource in io-package.json.

### 1.0.3 (2020-01-23)

* (crycode-de) Added `connectionType` in `io-package.json` and updated dependencies.

### 1.0.2 (2019-10-22)

* (crycode-de) Minimum required js-conntroller version is now 1.5.7

### 1.0.1 (2019-10-14)

* (crycode-de) initial release

## License

Copyright (c) 2019-2023 Peter Müller <peter@crycode.de>

Data (c) [German Federal Office for Radiation Protection (Bundesamt für Strahlenschutz, BfS)](https://www.bfs.de/), [Data licence Germany – attribution – Version 2.0](http://www.govdata.de/dl-de/by-2-0)

### MIT License

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.