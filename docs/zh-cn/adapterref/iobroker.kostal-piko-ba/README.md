---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.kostal-piko-ba/README.md
title: ioBroker.kostal-piko-ba
hash: 4lPRO5SCApjS96RwaVdZiEW+ETzQMYoGEcdbN0is2ho=
---
![商标](../../../en/adapterref/iobroker.kostal-piko-ba/admin/picoba.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.kostal-piko-ba.svg)
![下载](https://img.shields.io/npm/dm/iobroker.kostal-piko-ba.svg)
![依赖状态](https://img.shields.io/david/hombach/ioBroker.kostal-piko-ba.svg)
![已知漏洞](https://snyk.io/test/github/hombach/ioBroker.kostal-piko-ba/badge.svg)
![特拉维斯CI](http://img.shields.io/travis/hombach/ioBroker.kostal-piko-ba/master.svg)
![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.kostal-piko-ba?branch=master&svg=true)
![新产品管理](https://nodei.co/npm/iobroker.kostal-piko-ba.png?downloads=true)

# IoBroker.kostal-piko-ba
![NPM 版本（稳定版）](http://ioBroker.live/badges/kostal-piko-ba-stable.svg)![安装数量（最新）](http://ioBroker.live/badges/kostal-piko-ba-installed.svg)

![Node.js 持续集成](https://github.com/hombach/ioBroker.kostal-piko-ba/workflows/Node.js%20CI/badge.svg)

## 用于读取 iOBroker 的 Kostal Piko BA 数据的适配器
用于读取 Kostal Piko BA 数据的适配器。适配器创建一些状态并按顺序更新它们。
适配器也可与 Kostal Piko 15 逆变器配合使用。
如果您验证其他逆变器的功能，请给我发一封便条，我们将不胜感激。

##设置
要连接到 Kostal Pico BA 逆变器，必须在配置中注明其 IP 地址。
您还可以编辑实时、每日和实时数据的更新频率。

## 注释
该适配器使用 Sentry 库自动向开发人员报告异常和代码错误。有关更多详细信息以及有关如何禁用错误报告的信息，请参阅 [Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用哨兵报告。

## Changelog
! Note that missing version entries are typically dependency updates for security.
### 1.1.9 (13.06.2020)
* (HombachC) bumped dependencies; fixed vulnerability
### 1.1.7 (09.05.2021)
* (HombachC) added tests for node.js 16; fixed vulnerability
### 1.1.6 (02.03.2021)
* (HombachC) bumped dependencies; changes for new year 2021
### 1.1.3 (23.11.2020)
* (HombachC) added battery.Voltage; added additional error handler; bumped dependencies
### 1.1.1 (09.10.2020) stable
* (HombachC) minor documentation tweaks; DC current accuracy changed to mA
### 1.1.0 (09.10.2020)
* (tobstare) added DC1-3 Current, Voltage and Power
* (HombachC) added battery.ChargeCycles
* (HombachC) bumped dependencies; added battery.temperature
### 1.0.2 (23.09.2020) stable
* (HombachC) public release for stable repo
### 0.8.0 (18.08.2020)
* (HombachC) seperate editable poll timer for statistics data
### 0.7.4 (03.07.2020)
* (HombachC) added sentry.io support
### 0.6.1 (28.06.2020)
* (HombachC) poll of statistics data separated
### 0.5.1 (22.06.2020)
* (HombachC) introduced editable poll interval 
### 0.1.0 (15.05.2020)
* (HombachC) initial working release

## License
MIT License

Copyright (c) 2020 - 2021 HombachC

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