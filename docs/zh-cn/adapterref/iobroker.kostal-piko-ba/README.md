---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.kostal-piko-ba/README.md
title: ioBroker.kostal-piko-ba
hash: yYRwHBw/re4fJL3rlt6NL/pTZsB0qmBhqt3dhh31Xh8=
---
![标识](../../../en/adapterref/iobroker.kostal-piko-ba/admin/picoba.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.kostal-piko-ba.svg)
![下载](https://img.shields.io/npm/dm/iobroker.kostal-piko-ba.svg)
![已知漏洞](https://snyk.io/test/github/hombach/ioBroker.kostal-piko-ba/badge.svg)
![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.kostal-piko-ba?branch=master&svg=true)
![新PM](https://nodei.co/npm/iobroker.kostal-piko-ba.png?downloads=true)

# IoBroker.kostal-piko-ba
![NPM 版本（稳定）](http://ioBroker.live/badges/kostal-piko-ba-stable.svg)![安装数量（最新）](http://ioBroker.live/badges/kostal-piko-ba-installed.svg)

CI-测试：![Node.js 持续集成](https://github.com/hombach/ioBroker.kostal-piko-ba/workflows/Node.js%20CI/badge.svg)

## 用于读取 iOBroker 的 Kostal Piko 和 Piko BA 数据的适配器
用于读取 Kostal Piko 和 Piko BA 数据的适配器。适配器创建一些状态并按顺序更新它们。
适配器适用于 Kostal Piko 6.0BA、8.0BA、10.0BA、5.5、7.0、10、12、15、17 和 20 逆变器。
如果您验证其他逆变器的功能，我们将不胜感激，请给我留言。

## 设置
请注意，您的逆变器必须更新到 Kostal UI >= 6.11！要连接到 Kostal Pico (BA) 逆变器，必须将其 IP 地址设置到配置中。
您还可以编辑实时数据、每日和实时统计数据的更新频率。
如果需要，也可以设置读出 4 个模拟值的标记。

## 备注
该适配器使用 Sentry 库自动向开发人员报告异常和代码错误。有关更多详细信息以及有关如何禁用错误报告的信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

## Changelog

! Note that missing version entries are typically dependency updates for security.

### 1.4.5 (03.05.2022)
* (HombachC) added UI version to sentry feedback and documentation
### 1.4.4 (01.05.2022)
* (HombachC) optimized sentry feedback and documentation
### 1.4.3 (24.04.2022)
* (HombachC) normalizing of analog values added, bumped dependencies
### 1.4.2 (01.02.2022)
* (HombachC) added support for inverter type, version and name
* (HombachC) fixed timing error
### 1.4.1 (31.01.2022)
* (HombachC) optimized logging; bumped dependencies
### 1.4.0 (30.01.2022)
* (HombachC) added support for grid 1-3 current, voltage and power
* (HombachC) bumped dependencies
### 1.3.1 (23.01.2022)
* (HombachC) correct rounding of analog values; bumped dependencies
* (HombachC) added validation of configured IPv4 address
### 1.3.0 (01.01.2022)
* (HombachC) added optional support for analog inputs
### 1.2.1 (24.12.2021)
* (HombachC) introduced rounding of battery temp
### 1.2.0 (16.12.2021)
* (HombachC) dropped node.js 10 support; bumped dependencies; fixed vulnerability
### 1.1.13 (16.10.2021)
* (HombachC) bumped dependencies; fixed vulnerability
### 1.1.12 (07.10.2021)
* (GermanBlueFox) fixed icon link
* (HombachC) bumped dependencies
### 1.1.7 (09.05.2021)
* (HombachC) added tests for node.js 16; fixed vulnerability
### 1.1.3 (23.11.2020)
* (HombachC) added battery.Voltage; added additional error handler; bumped dependencies
### 1.1.1 (09.10.2020) stable
* (HombachC) minor documentation tweaks; DC current accuracy changed to mA
### 1.1.0 (09.10.2020)
* (tobstare) added DC1-3 current, voltage and power
* (HombachC) added battery.ChargeCycles
* (HombachC) bumped dependencies; added battery.temperature
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

Copyright (c) 2020 - 2022 HombachC

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