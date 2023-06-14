---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.kostal-piko-ba/README.md
title: ioBroker.kostal-piko-ba
hash: o8WKJRbH1NvZZ7/KkuUQq2W7tvgOz+JJsSAZP7Leakc=
---
![标识](../../../en/adapterref/iobroker.kostal-piko-ba/admin/picoba.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.kostal-piko-ba.svg)
![下载](https://img.shields.io/npm/dm/iobroker.kostal-piko-ba.svg)
![已知漏洞](https://snyk.io/test/github/hombach/ioBroker.kostal-piko-ba/badge.svg)
![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.kostal-piko-ba?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.kostal-piko-ba.png?downloads=true)

# IoBroker.kostal-piko-ba
![NPM 版本（稳定）](https://ioBroker.live/badges/kostal-piko-ba-stable.svg)![安装数量（最新）](https://ioBroker.live/badges/kostal-piko-ba-installed.svg)

**CI 测试：** ![Node.js CI](https://github.com/hombach/ioBroker.kostal-piko-ba/workflows/Node.js%20CI/badge.svg) [![CodeQL](https://github.com/hombach/ioBroker.kostal-piko-ba/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hombach/ioBroker.kostal-piko-ba/actions/workflows/codeql-analysis.yml)

## 用于读取 iOBroker 的 Kostal Piko 和 Piko BA 数据的适配器
用于读取 Kostal Piko、Piko BA 和 PIKO MP plus 数据的适配器。适配器创建一些状态并按顺序更新它们。
专为 Kostal Piko 6.0BA、8.0BA、10.0BA、BA 逆变器设计的适配器。
适配器还适用于 Kostal Piko 3.0、4.2、4.6、5.5、7.0、8.5、10、12、15、17、20 和 36 逆变器。
新的！适配器现在也可与 MP plus 逆变器配合使用 - 已使用 Kostal PIKO 1.5-1、2.0-1、3.0-1 MP plus 进行测试。
如果您验证其他逆变器的功能，我们将不胜感激，请给我留言。

## 设置
请注意，您的 Piko 或 Piko BA 逆变器必须更新到 Kostal UI >= 6.11！要连接到 Kostal Piko (BA / MP plus) 逆变器，必须在配置中设置其 IP 地址。
您还可以选择编辑实时数据、每日和实时统计数据的更新频率。
如果您的硬件需要并支持，也可以设置用于读取 4 个模拟值的标记。

## 笔记
此适配器使用哨兵库自动向开发人员报告异常和代码错误。有关更多详细信息和有关如何禁用错误报告的信息，请参阅[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

## Changelog

! Note that missing version entries are typically dependency updates for improved security.

### 2.5.2 (02.06.2023)
* (HombachC) fixed a wording error
* (HombachC) bumped dependencies, added tests for node.js 20
* (HombachC) it's recommended to switch to minimum node.js 16, adapter still working with node 14
### 2.5.1 (25.04.2023)
* (HombachC) fixed a sentry reported error
### 2.5.0 (22.04.2023)
* (HombachC) implemented battery power calculation
### 2.4.7 (13.04.2023)
* (HombachC) improved error handling
### 2.4.6 (09.04.2023)
* (HombachC) fixed vulnerability in xml2js
### 2.4.5 (07.04.2023)
* (HombachC) improved error handling
### 2.4.4 (04.04.2023)
* (HombachC) improved error handling
### 2.4.3 (03.04.2023)
* (HombachC) improved error handling
### 2.4.2 (07.03.2023)
* (HombachC) fixed error in Piko MP Plus AC current
* (HombachC) added Piko MP Plus total yield
### 2.4.1 (06.03.2023)
* (HombachC) fixed Piko MP Plus support for two channel hardware
### 2.4.0 (06.03.2023)
* (HombachC) added support of AC and DC power values for Piko MP inverters
### 2.3.1 (05.03.2023)
* (HombachC) fix error with zero values in DC & AC
### 2.3.0 (26.02.2023)
* (HombachC) replaced got by axios
* (HombachC) added warning for not supported Piko MP inverters
* (HombachC) removed travis
### 2.2.2 (14.02.2023)
* (HombachC) fixed error with missing grid limitation response
### 2.2.0 (03.02.2023)
* (HombachC) added support for phase 1-3 of homeconsumption power
* (HombachC) enhanced sentry support
### 2.1.3 (03.02.2023)
* (HombachC) optimized debug data
### 2.1.2 (29.01.2023)
* (HombachC) fixed errors with single phase inverters (Piko 3)
### 2.1.1 (29.12.2022)
* (HombachC) year 2023 changes
### 2.1.0 (04.11.2022)
* (HombachC) added ukrainian translations
### 2.0.2 (16.10.2022)
* (HombachC) fixed small sentry reported error
* (HombachC) optimized error logging
### 2.0.1 (11.10.2022)
* (HombachC) optimized error logging
### 2.0.0 (28.08.2022)
* (HombachC) BREAKING: Dropped support for Node.js 12
* (HombachC) changed the minimal required js-controller version to 3.2.16
* (HombachC) added state of inverter as string
### 1.5.0 (05.08.2022)
* (HombachC) added minimum values for poll times to prevent communication errors
### 1.4.7 (26.06.2022)
* (HombachC) bumped dependency because of security vulnerability
### 1.4.6 (06.06.2022)
* (HombachC) removed gulp, bumped dependencies, added tests for node.js 18
* (HombachC) removed tests for node.js 12 -> it's recommended to switch to node.js 14, adapter still working with node 12
### 1.4.5 (03.05.2022)
* (HombachC) added UI version to sentry feedback and documentation
### 1.4.4 (01.05.2022)
* (HombachC) optimized sentry feedback and documentation
### 1.4.3 (24.04.2022)
* (HombachC) normalizing of analog values added
### 1.4.2 (01.02.2022)
* (HombachC) added support for inverter type, version and name
* (HombachC) fixed timing error
### 1.4.1 (31.01.2022)
* (HombachC) optimized logging
### 1.4.0 (30.01.2022)
* (HombachC) added support for grid 1-3 current, voltage and power
### 1.3.1 (23.01.2022)
* (HombachC) correct rounding of analog values
* (HombachC) added validation of configured IPv4 address
### 1.3.0 (01.01.2022)
* (HombachC) added optional support for analog inputs
### 1.2.1 (24.12.2021)
* (HombachC) introduced rounding of battery temp
### 1.2.0 (16.12.2021)
* (HombachC) dropped node.js 10 support; fixed vulnerability
### 1.1.13 (16.10.2021)
* (HombachC) fixed vulnerability
### 1.1.12 (07.10.2021)
* (GermanBlueFox) fixed icon link
### 1.1.7 (09.05.2021)
* (HombachC) added tests for node.js 16; fixed vulnerability
### 1.1.3 (23.11.2020)
* (HombachC) added battery.Voltage; added additional error handler
### 1.1.1 (09.10.2020) stable
* (HombachC) minor documentation tweaks; DC current accuracy changed to mA
### 1.1.0 (09.10.2020)
* (tobstare) added DC1-3 current, voltage and power
* (HombachC) added battery.ChargeCycles
* (HombachC) added battery.temperature
### 1.0.2 (23.09.2020)
* (HombachC) public release for stable repo
### 0.8.0 (18.08.2020)
* (HombachC) seperate editable poll timer for statistics data
### 0.7.4 (03.07.2020)
* (HombachC) added sentry.io support
### 0.6.1 (28.06.2020)
* (HombachC) poll of statistics data separated
### 0.1.0 (15.05.2020)
* (HombachC) initial working release

## License
MIT License

Copyright (c) 2020 - 2023 HombachC

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