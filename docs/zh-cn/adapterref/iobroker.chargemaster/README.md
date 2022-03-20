---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.chargemaster/README.md
title: ioBroker.chargemaster
hash: DA1aBMw3hBev2eTwywOu8X/m2BHoHKN0weeXj0r4Z54=
---
![商标](../../../en/adapterref/iobroker.chargemaster/admin/chargemaster.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.chargemaster.svg)
![下载](https://img.shields.io/npm/dm/iobroker.chargemaster.svg)
![已知漏洞](https://snyk.io/test/github/hombach/ioBroker.chargemaster/badge.svg)
![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.chargemaster?branch=master&svg=true)
![新PM](https://nodei.co/npm/iobroker.chargemaster.png?downloads=true)

# IoBroker.chargemaster
![NPM 版本（稳定）](http://ioBroker.live/badges/chargemaster-stable.svg)![安装数量（最新）](http://ioBroker.live/badges/chargemaster-installed.svg)

CI-测试：![Node.js 持续集成](https://github.com/hombach/ioBroker.chargemaster/workflows/Node.js%20CI/badge.svg)

## 适配器使用 PV 能源管理一个或多个 EV 充电器
**！！！这个适配器仍然代表一个发展状态！！！**

使用 PV 能源管理一个或多个 EV 充电器（壁箱）的适配器。适配器目前最多可处理 3 个 EV 墙盒，以管理对可用电网电力的充电，并可能使用 PV 剩余能源。

## 设置
要连接到墙盒，请在配置中输入具有所需数据的状态。

## 备注
该适配器使用 Sentry 库自动向开发人员报告异常和代码错误。有关更多详细信息以及有关如何禁用错误报告的信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

##经过测试
- 3x go-E 充电器和 Kostal PikoBA

## Changelog
! Note that missing version entries are typically dependency updates for security.
### 0.4.3 (22.02.2022)
* (HombachC) added github tests for MAC-OS and Windows
### 0.4.2 (21.02.2022)
* (HombachC) changed statemachine to async; bumped dependencies
### 0.4.1 (18.02.2022)
* (HombachC) fixed error in charger communication; added ci test
### 0.4.0 (14.02.2022)
* (HombachC) introduced automatic adaption to the amount of configured chargers; bugfixes for cleaner run without config
### 0.3.2 (14.02.2022)
* (HombachC) fixing test automation, several bugfixes for cleaner run without config
### 0.3.1 (29.01.2022)
* (HombachC) added sentry statistics; optimized logging; fixed type conversion bug
### 0.3.0 (28.01.2022)
* (HombachC) first public release for iOBroker latest repo; added sentry support
### 0.2.0 (18.12.2021)
* (HombachC) dropped node.js 10 support; bumped dependencies
### 0.1.5 (15.10.2021)
* (HombachC) fixed vulnerability; improved docu
### 0.1.2 (02.05.2021)
* (HombachC) code cleanup and optimization, fixed onStateChange
### 0.1.1 (30.04.2021)
* (HombachC) fixed errors with js-controller 3.3.x, bumped dependencies
### 0.1.0 (11.04.2021)
* (HombachC) first running version, fixed to 3 boxes
### 0.0.7 (31.03.2021)
* (HombachC) added MaxAmpTotal, MinAmpWallBox, MaxAmpWallBox
### 0.0.6 (23.03.2021)
* (HombachC) added collection and calc of total charge power
### 0.0.4 (15.03.2021)
* (HombachC) fix error in foreign state popup
### 0.0.2 (06.01.2021)
* (HombachC) fix errors to get it running in old single wallbox mode
### 0.0.1 (01.01.2021)
* (HombachC) initial release

## License
MIT License

Copyright (c) 2021-2022 Christian Hombach

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