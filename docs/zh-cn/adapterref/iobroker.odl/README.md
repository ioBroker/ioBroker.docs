---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.odl.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.odl.svg
BADGE-Number of Installations (latest): https://iobroker.live/badges/odl-installed.svg
BADGE-Number of Installations (stable): https://iobroker.live/badges/odl-stable.svg
BADGE-NPM: https://nodei.co/npm/iobroker.odl.png?downloads=true
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.odl/README.md
title: ioBroker.odl
hash: XICJIRZWFL65xVqSL7iwuADAvVWWButIZezWf1Qqpp0=
---
#ioBroker.odl
![标识](../../../en/admin/odl.png)

## IoBroker 中的当前环境放射性
该适配器将德国[联邦辐射防护办公室 (Bundesamt für Strahlenschutz, BfS)](https://www.bfs.de/)指定测量点的 ODL（环境剂量率/环境剂量率）值集成到 ioBroker 中。

德国联邦辐射防护局 (BfS) 的 ODL 测量网络使用约 1700 个测量探头，全天候监测环境中天然放射性物质的辐射水平。该测量网络具有重要的预警功能，能够快速检测德国空气中放射性物质的辐射水平。
获取的测量数据由 BfS 收集和评估，并根据《德国数据许可证》公开。

有关环境剂量率的更多详细信息，请参阅<https://odlinfo.bfs.de/>。

此适配器使用[BfS提供的官方数据接口](https://odlinfo.bfs.de/ODL/EN/service/data-interface/data-interface_node.html)下载当前 1 小时测量数据的平均值。BfS

Dieser Adapter läd die aktuellen 1-Stunden-Mittelwerte der Messdaten direkt über die [BfS 日期办公室](https://odlinfo.bfs.de/ODL/DE/service/datenschnittstelle/datenschnittstelle_node.html)。 BfS 是适配器使用的数据的发起者。
所有数据均由适配器以数据接口传递的未更改形式提供。

如果检测到某些值状态的启用历史记录适配器（_history_、_influxdb_ 或 _sql_），适配器会尝试通过下载缺失值来填充历史记录中的缺失值，以创建完整的历史记录。

默认情况下，适配器每小时更新一次当前测量数据。较短的更新间隔通常没有意义，因为 BfS 服务器上的底层测量数据（取决于测量点）通常每小时更新一次。
适配器首次启动时，会自动调整数据检索时间，以便并非所有安装都同时检索数据，从而避免 BfS 数据接口不必要地加载。

[![截图 1](../ioBroker-odl-01.png)](../../../en/adapterref/ioBroker-odl-01.png)

[![截图2]（../ioBroker-odl-02.png）](../../../en/adapterref/ioBroker-odl-02.png)

## 查找测量站的ID
要找到适配器所需的 ID，您需要打开 [ODL-Info 上的测量站列表](https://odlinfo.bfs.de/ODL/EN/topics/location-of-measuring-stations/list/list_node.html) 并搜索测量站。

如果您打开所需的测量站，您可以在浏览器的 URL 中找到其 ID，即`?id=...`。

测量点_Berlin-Karlshorst_ 的示例：

* 网址：`https://odlinfo.bfs.de/ODL/EN/topics/location-of-measuring-stations/map/_documents/Messstelle.html?id=110000006`
* ID：`110000006`

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
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

Copyright (c) 2019-2025 Peter Müller <peter@crycode.de>

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