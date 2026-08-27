---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.goodwe-pv/README.md
title: iobroker.goodwe-pv
hash: iEexl/0XQ1u+9s0VjuF+yhHrKatDEK509JdH4pg2nvA=
---
![标识](../../../en/adapterref/iobroker.goodwe-pv/admin/goodwe-pv.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.goodwe-pv.svg)
![下载](https://img.shields.io/npm/dm/iobroker.goodwe-pv.svg)
![节点-lts](https://img.shields.io/node/v-lts/iobroker.goodwe-pv?style=flat-square)
![Libraries.io 最新版本的依赖状态](https://img.shields.io/librariesio/release/npm/iobroker.goodwe-pv?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/hombach/iobroker.goodwe-pv?style=flat-square)
![GitHub 仓库大小](https://img.shields.io/github/repo-size/hombach/iobroker.goodwe-pv?logo=github&style=flat-square)
![GitHub提交活动](https://img.shields.io/github/commit-activity/m/hombach/iobroker.goodwe-pv?logo=github&style=flat-square)
![GitHub 最新提交](https://img.shields.io/github/last-commit/hombach/iobroker.goodwe-pv?logo=github&style=flat-square)
![GitHub 问题](https://img.shields.io/github/issues/hombach/iobroker.goodwe-pv?logo=github&style=flat-square)
![GitHub 工作流状态](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.goodwe-pv/test-and-release.yml?branch=master&logo=github&style=flat-square)
![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/iobroker.goodwe-pv?branch=master&svg=true)
![SNYK 已知漏洞](https://snyk.io/test/github/hombach/iobroker.goodwe-pv/badge.svg)
![Beta](https://img.shields.io/npm/v/iobroker.goodwe-pv.svg?color=red&label=beta)
![稳定的](https://iobroker.live/badges/goodwe-pv-stable.svg)
![已安装](https://iobroker.live/badges/goodwe-pv-installed.svg)
![NPM](https://nodei.co/npm/iobroker.goodwe-pv.png?downloads=true)

# Iobroker.goodwe-pv
[![CodeQL](https://github.com/hombach/iobroker.goodwe-pv/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hombach/iobroker.goodwe-pv/actions/workflows/codeql-analysis.yml)

## 版本
## 哨兵
**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅<a href="https://github.com/ioBroker/plugin-sentry#plugin-sentry">Sentry 插件文档</a>！

## Goodwe-pv 适配器（适用于 ioBroker）
通过本地UDP接口（端口8899）与ET、EH、BH和BT系列[好我们](https://www.goodwe.com)混合逆变器通信。无需云连接——适配器直接与局域网上的逆变器通信。

### 支持的设备
所有在端口 8899 上公开本地 Modbus-over-UDP 接口的 GoodWe 混合逆变器：

- ET 系列（例如 GW5-ET、GW8-ET……）
- EH系列
- BH系列
- BT系列

＃＃ 配置
**IP 地址** — GoodWe 逆变器的本地 IP 地址（默认值：`127.0.0.1`）。您可以在路由器的 DHCP 租约表中或 SEMS 门户/ShinePhone 应用的“设备信息”中查找。建议设置静态 IP 地址或 DHCP 保留地址。

**轮询周期** — 从逆变器重新读取每个数据组的频率（以秒为单位）（默认值：`10`）。四个数据组（DeviceInfo、RunningData、ExtComData、BMSInfo）交错排列，因此每秒只有一个 UDP 请求在进行中。

**提示：** 您可以在路由器的 DHCP 租约表中查找逆变器的 IP 地址，或者在 GoodWe SEMS 门户网站/ShinePhone 应用的“设备信息”下查看。建议分配静态 IP 地址或进行 DHCP 保留，以防止地址更改。

## 基于
该适配器基于 [ioBroker.goodwe](https://github.com/FossyTom/ioBroker.goodwe) 作者：[FossyTom]](https://github.com/FossyTom) (Thomas Schönberger)，并获得 MIT 许可。
版权所有 (c) 2023 Thomas Schönberger <SchoenbergerThomas@freenet.de>

捐赠
<a href="https://www.paypal.com/donate/?hosted_button_id=GR6PERNQHJQ2A"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.tibberlink/master/docu/bluePayPal.svg" height="40"></a>如果你喜欢这个项目——或者只是想慷慨解囊，不妨请我喝杯啤酒。干杯！🍻

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- (hombach) updated dependencies

### 0.2.4 (2026-08-07)

- (hombach) add missing descriptions to DeviceInfo and BMSInfo states
- (hombach) remove placeholder desc "-" from states without a meaningful description
- (hombach) remove unused Rtc field from GoodWeRunningData type
- (hombach) updated dependencies

### 0.2.3 (2026-07-18)

- (hombach) replace deprecated role value.power.consumption with value.energy.consumed
- (hombach) replace value.power.produced with value.energy.produced for accumulated kWh states
- (hombach) replace invalid roles value.power.apparent and value.signal with valid alternatives

### 0.2.2 (2026-07-12)

- (hombach) assign semantic ioBroker roles to many states
- (hombach) fix PowerFactor scaling: signed int / 1000 instead of uint / 100
- (hombach) fix TotalReactivePower sign: use signed int (VAR can be negative)
- (hombach) fix EnergyTotalSell/Buy unit: GM3000 meter float is in Wh, divide by 1000

### 0.2.1 (2026-07-12)

- (hombach) add GoodWe manufacturer link to README
- (hombach) remove debug code (checkPasswordAsync/checkGroupAsync) from onReady
- (hombach) disable unused onStateChange handler (no writable states)
- (hombach) add runtime validation for pollCycle config parameter
- (hombach) expose DerateFlag as ioBroker state in RunningData
- (hombach) fix UTF-8 encoding corruption in all i18n translation files

### 0.2.0 (2026-07-05)

- (hombach) added units
- (hombach) replace chai/sinon-chai test dependencies with node:assert
- (hombach) fix test runner TS5011 rootDir error
- (hombach) remove redundant mocha/@types/mocha devDependencies (already included in @iobroker/testing)

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2026 hombach <goodwePV@homba.ch>

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