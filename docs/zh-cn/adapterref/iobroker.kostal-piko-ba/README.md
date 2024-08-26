---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.kostal-piko-ba/README.md
title: ioBroker.kostal-piko-ba
hash: Wt8AzwewSKrFltCL+THLWDot1KNDkhRpkVvXRRtapyE=
---
![标识](../../../en/adapterref/iobroker.kostal-piko-ba/admin/picoba.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.kostal-piko-ba.svg)
![下载](https://img.shields.io/npm/dm/iobroker.kostal-piko-ba?label=npm%20downloads&style=flat-square)
![节点](https://img.shields.io/node/v-lts/iobroker.kostal-piko-ba?style=flat-square)
![Libraries.io 最新版本的依赖状态](https://img.shields.io/librariesio/release/npm/iobroker.kostal-piko-ba?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/hombach/iobroker.kostal-piko-ba?style=flat-square)
![GitHub 仓库大小](https://img.shields.io/github/repo-size/hombach/iobroker.kostal-piko-ba?logo=github&style=flat-square)
![GitHub 提交活动](https://img.shields.io/github/commit-activity/m/hombach/iobroker.kostal-piko-ba?logo=github&style=flat-square)
![GitHub 上次提交](https://img.shields.io/github/last-commit/hombach/iobroker.kostal-piko-ba?logo=github&style=flat-square)
![GitHub 问题](https://img.shields.io/github/issues/hombach/iobroker.kostal-piko-ba?logo=github&style=flat-square)
![GitHub 工作流程状态](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.kostal-piko-ba/test-and-release.yml?branch=main&logo=github&style=flat-square)
![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.kostal-piko-ba?branch=master&svg=true)
![测试版](https://img.shields.io/npm/v/iobroker.kostal-piko-ba.svg?color=red&label=beta)
![稳定的](https://iobroker.live/badges/kostal-piko-ba-stable.svg)
![已安装](https://iobroker.live/badges/kostal-piko-ba-installed.svg)
![新平台](https://nodei.co/npm/iobroker.kostal-piko-ba.png?downloads=true)

# IoBroker.kostal-piko-ba
[![CodeQL]（https://github.com/hombach/ioBroker.kostal-piko-ba/actions/workflows/codeql-analysis.yml/badge.svg）](https://github.com/hombach/ioBroker.kostal-piko-ba/actions/workflows/codeql-analysis.yml)

## 版本
## 用于读取 Kostal Piko 和 Piko BA 数据的 iOBroker 适配器
该适配器允许读取 Kostal Piko、Piko BA 和 PIKO MP plus 逆变器的数据。
它创建并按顺序更新多个状态，确保始终提供最新信息。
该适配器专为 Kostal Piko BA、6.0BA、8.0BA 和 10BA 逆变器设计，但它还支持多种其他型号，包括：

- 科斯塔尔皮科：3.0、4.2、4.6、5.5、7.0、8.5、10、12、15、17、20 和 36。
- 科斯塔尔 PIKO MP：1.5、3.0、3.6。
- Kostal PIKO MP plus：1.5-1、2.0-1、2.5-1、3.0-1、3.0-2、3.6-1、3.6-2 和 5.0-2。

我们非常欢迎您就其他逆变器的功能提出反馈。如果您使用其他型号进行测试，请给我们发送通知。

＃＃ 设置
确保您的 Piko 或 Piko BA 逆变器已更新至 Kostal UI 版本 6.11 或更高版本。
要连接到 Kostal Piko (BA / MP plus) 逆变器，您必须在设置中配置其 IP 地址。
您可以选择调整实时数据、每日统计数据和终身统计数据的更新频率。
如果您的硬件支持，您还可以启用四个模拟值的读取。

哨兵
此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。有关如何禁用错误报告的更多详细信息和信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告从 js-controller 3.0 开始启动。

## 捐赠
<a href="https://www.paypal.com/donate/?hosted_button_id=XFFBB332R4RCQ"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.tibberlink/main/docu/bluePayPal.svg" height="40"></a>如果你喜欢这个项目 — — 或者只是觉得慷慨，可以考虑给我买杯啤酒。干杯！:beers:

## Changelog

Note: Missing version entries typically indicate dependency updates for improved security.

### 4.1.3 (13.08.2024)

* (HombachC) fixed vulnerability in dependency

### 4.1.2 (10.08.2024)

* (HombachC) optimized translation handling
* (HombachC) hide not used configuration inputs

### 4.1.1 (09.08.2024)

* (HombachC) adapter checker detected optimizations (#643)

### 4.1.0 (05.08.2024)

* (HombachC) replaced deprecated ioBroker state calls
* (HombachC) doku cleanup

### 4.0.2 (04.08.2024)

* (HombachC) added node.js 22 tests
* (HombachC) dependency updates

### 4.0.1 (24.06.2024)

* (HombachC) dependency updates, removed unfunctional snyk tests

### 4.0.0 (21.04.2024)

* (HombachC) BREAKING: Dropped support for Node.js 16 (#591)
* (HombachC) BREAKING: Minimum needed js-controller bumped to 5 (#592)
* (HombachC) changed timeout settings for older Kostal inverters (#589)
* (HombachC) dependency updates
* (HombachC) added tests for node.js 21
* (HombachC) raised minimum poll time for daily statistics
* (HombachC) code optimizations

### 3.1.0 (29.03.2024)

* (HombachC) changed to tier 2 as data provider

### 3.0.11 (29.03.2024)

* (HombachC) corrected io-package.json according to new schema
* (HombachC) bump adapter-core to 3.0.6

### 3.0.10 (03.03.2024)

* (HombachC) fixed vulnerability

### 3.0.9 (23.12.2023)

* (HombachC) year 2024 changes
* (HombachC) several dependency updates 

### 3.0.8 (29.10.2023)

* (HombachC) bump axios to 1.6.0 because of vulnerability
* (HombachC) several dependency updates 

### 3.0.7 (01.10.2023)

* (HombachC) several dependency updates 

### 3.0.6 (27.08.2023)

* (HombachC) improved error handling in case of offline inverters - centralized error handling 

### 3.0.5 (19.08.2023)

* (HombachC) mitigating another sentry notified error in case of network trouble

### 3.0.4 (13.08.2023)

* (HombachC) bumped adapter core to V3

### 3.0.3 (17.07.2023)

* (HombachC) fixing sentry notified error in case of network trouble

### 3.0.2 (14.07.2023)

* (HombachC) fix small error in MP recognition
* (HombachC) sentry notified error in object handling

### 3.0.1 (23.06.2023)

* (HombachC) corrected state description

### 3.0.0 (08.06.2023)

* (HombachC) BREAKING: Dropped support for Node.js 14
* (HombachC) changed config screen to admin 5 solution
* (HombachC) dropped Admin <5 support
* (HombachC) removed tests for node 14

### Old Changes see [CHANGELOG OLD](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2020-2024 HombachC

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