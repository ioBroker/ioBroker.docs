---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.odl.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.odl.svg
BADGE-Number of Installations (latest): https://iobroker.live/badges/odl-installed.svg
BADGE-Number of Installations (stable): https://iobroker.live/badges/odl-stable.svg
BADGE-Translation status: https://weblate.iobroker.net/widgets/adapters/-/odl/svg-badge.svg
BADGE-NPM: https://nodei.co/npm/iobroker.odl.png?downloads=true
BADGE-Test and Release: https://github.com/crycode-de/iobroker.odl/workflows/Test%20and%20Release/badge.svg
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.odl/README.md
title: ioBroker.odl
hash: 8pBJKycsjAdC2t7oYt79UWy9bbl+V8X6zfZf7ECy6a4=
---
# ioBroker.odl

![Логотип](../../../en/admin/odl.png)

## Текущий уровень радиоактивности окружающей среды в ioBroker

Этот адаптер интегрирует значения ODL (Ortsdosisleistung / Мощность амбиентной дозы) определенных точек измерения [Федерального ведомства по радиационной защите Германии (Bundesamt für Strahlenschutz, BfS)](https://www.bfs.de/) в ioBroker.

Измерительная сеть ODL Федерального управления по радиационной защите использует около 1700 измерительных зондов для круглосуточного мониторинга уровня радиации от естественной радиоактивности в окружающей среде. Измерительная сеть выполняет важную функцию раннего предупреждения, позволяя быстро обнаруживать повышенный уровень радиации от радиоактивных веществ в воздухе Германии.\
&#x20;Полученные данные измерений собираются и анализируются Федеральным бюро статистики (BfS) и публикуются в соответствии с _немецкой лицензией на данные_ .

Более подробную информацию о мощности дозы облучения окружающей среды можно найти по [ссылке https://odlinfo.bfs.de/](https://odlinfo.bfs.de/) .

Этот адаптер загружает текущие средние значения данных измерений за 1 час, используя [официальный интерфейс данных, предоставленный Федеральной службой безопасности (BfS)](https://odlinfo.bfs.de/ODL/EN/service/data-interface/data-interface_node.html) . BfS

Переходник соответствует 1-му посадочному месту непосредственно для [официального сообщения BfS](https://odlinfo.bfs.de/ODL/DE/service/datenschnittstelle/datenschnittstelle_node.html) . BfS является источником данных, используемых адаптером.\
&#x20;Все данные передаются адаптером в неизмененном виде, в том же формате, в котором они передаются через интерфейс передачи данных.

Если для какого-либо состояния значения обнаружен включенный адаптер истории ( _history_ , _influxdb_ или _sql_ ), адаптер пытается заполнить недостающие значения в истории, загружая их для создания полной истории.

По умолчанию адаптер обновляет текущие данные измерений каждый час. Более короткий интервал обновления обычно нецелесообразен, поскольку базовые данные измерений на сервере BfS (в зависимости от точки измерения) в основном обновляются ежечасно.\
&#x20;При первом запуске адаптера время получения данных автоматически корректируется таким образом, чтобы не все установки получали данные одновременно, и чтобы интерфейс данных BfS не перегружался излишне.

[![Скриншот 1](https://github.com/crycode-de/ioBroker.odl/blob/master/docs/ioBroker-odl-01.png)](../../../en/adapterref/ioBroker-odl-01.png)

[![Скриншот 2](https://github.com/crycode-de/ioBroker.odl/blob/master/docs/ioBroker-odl-02.png)](../../../en/adapterref/ioBroker-odl-02.png)

## Найдите идентификаторы измерительных станций.

Чтобы найти идентификатор, необходимый для адаптера, нужно открыть [список измерительных станций в ODL-Info](https://odlinfo.bfs.de/ODL/EN/topics/location-of-measuring-stations/list/list_node.html) и выполнить поиск измерительной станции.

Если вы откроете нужную измерительную станцию, вы сможете найти её идентификатор в URL-адресе браузера.`?id=...` .

Пример точки измерения _Берлин-Карлсхорст_ :

- URL:`https://odlinfo.bfs.de/ODL/EN/topics/location-of-measuring-stations/map/_documents/Messstelle.html?id=110000006`
- ИДЕНТИФИКАТОР:`110000006`

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

* (crycode-de) Updated dependencies

### 5.1.1 (2025-10-25)

* (crycode-de) Updated Sentry DSN
* (crycode-de) Updated dependencies

### 5.1.0 (2025-10-04)

* (crycode-de) js-controller >= 6.0.11, Admin >= 7.6.17 required
* (crycode-de) Updated dependencies

### 5.0.0 (2025-05-25)

* (crycode-de) Node.js >= 20, Admin >= 7.4.10 required
* (crycode-de) Updated dependencies
* (crycode-de) Added information how to get the required IDs of the measuring stations

### 4.0.2 (2024-11-16)

* (crycode-de) Added missing sizes to jsonConfig

### 4.0.1 (2024-10-23)

* (crycode-de) Added support for tiny screens to jsonConfig
* (crycode-de) Updated dependencies

### 4.0.0 (2024-09-23)

* (crycode-de) Node.js >= 18, Admin >= 6.17, js-contoller >= 5.0.19 are required
* (crycode-de) Migrate to jsonConfig
* (crycode-de) Updated dependencies

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

Copyright (c) 2019-2026 Peter Müller <peter@crycode.de>

Data (c) [German Federal Office for Radiation Protection (Bundesamt für Strahlenschutz, BfS)](https://www.bfs.de/), [Data License Germany – attribution – Version 2.0](http://www.govdata.de/dl-de/by-2-0)

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