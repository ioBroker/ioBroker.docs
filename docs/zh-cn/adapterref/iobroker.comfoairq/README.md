---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.comfoairq/README.md
title: ioBroker.comfoairq
hash: E+NX0eXJfBjBrTQAs4c0JqyUTfzGSL0w41rBGDWZIQ0=
---
![标识](../../../en/adapterref/iobroker.comfoairq/admin/comfoairq.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.comfoairq?style=flat-square)
![下载](https://img.shields.io/npm/dm/iobroker.comfoairq?label=npm%20downloads&style=flat-square)
![节点](https://img.shields.io/node/v-lts/iobroker.comfoairq?style=flat-square)
![Libraries.io 最新版本的依赖状态](https://img.shields.io/librariesio/release/npm/iobroker.comfoairq?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/klein0r/iobroker.comfoairq?style=flat-square)
![GitHub 仓库大小](https://img.shields.io/github/repo-size/klein0r/iobroker.comfoairq?logo=github&style=flat-square)
![GitHub 提交活动](https://img.shields.io/github/commit-activity/m/klein0r/iobroker.comfoairq?logo=github&style=flat-square)
![GitHub 上次提交](https://img.shields.io/github/last-commit/klein0r/iobroker.comfoairq?logo=github&style=flat-square)
![GitHub 问题](https://img.shields.io/github/issues/klein0r/iobroker.comfoairq?logo=github&style=flat-square)
![GitHub 工作流程状态](https://img.shields.io/github/actions/workflow/status/klein0r/iobroker.comfoairq/test-and-release.yml?branch=master&logo=github&style=flat-square)
![测试版](https://img.shields.io/npm/v/iobroker.comfoairq.svg?color=red&label=beta)
![稳定的](http://iobroker.live/badges/comfoairq-stable.svg)
![已安装](http://iobroker.live/badges/comfoairq-installed.svg)

# IoBroker.comfoairq
## 版本
通过 ComfoConnect LAN C 连接您的 Zehnder ComfoAirQ

*使用 ComfoAirQ 350 测试*

**重要提示**：ComfoConnect LAN C 仅支持 1 个客户端。您不能同时使用 ComfoControl App 和 ioBroker 适配器！

## 赞助商
[![ioBroker Master Kurs](https://haus-automatisierung.com/images/ads/ioBroker-Kurs.png?2024)](https://haus-automatisierung.com/iobroker-kurs/?refid=iobroker-comfoairq)

## 致谢
此 ioBroker 适配器的开发基于以下人员的工作：

*扬·范·贝尔 (https://github.com/herrJones/node-comfoairq)
* 迈克尔·阿诺茨（https://github.com/michaelarnauts/comfoconnect）
* Marco Hoyer (https://github.com/marco-hoyer/zcan) 及其在 github 上的分支 (djwlindenaar、decontamin4t0R)

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 0.5.1 (2025-04-14)

* (@klein0r) Updated dependencies

### 0.5.0 (2025-04-14)

NodeJS >= 20.x and js-controller >= 6 is required

* (@klein0r) Added messagebox for device discovery via admin
* (@klein0r) Added responsive admin layout

### 0.4.0 (2024-03-28)

NodeJS >= 18.x and js-controller >= 5 is required

* (klein0r) Added icons to admin tabs
* (klein0r) Group sensors in admin config
* (klein0r) Limit sensor value refresh interval

### 0.3.0 (2022-12-14)

NodeJS 14.x is required (NodeJS 12.x is EOL)

* (klein0r) Updated depedency for js-controller to 4.0.15
* (klein0r) Dropped Admin 5 support
* (klein0r) Added Ukrainian language

### 0.2.0 (2022-02-25)

* (klein0r) Translated all objects
* (klein0r) Updated dependencies
* (klein0r) Added hint for Admin 4 configuration
* (klein0r) Updated state roles
* (klein0r) Updated dependencies

## License

MIT License

Copyright (c) 2025 Matthias Kleine <info@haus-automatisierung.com>

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