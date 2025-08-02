---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.mielecloudservice/README.md
title: ioBroker.mielecloud服务
hash: bxu3vb+SjaR2PsJUQyYA4WUmRy5xhp6wY8m3GijYVNs=
---
![标识](../../../en/adapterref/iobroker.mielecloudservice/admin/mielecloudservice.svg)

![安装数量](http://iobroker.live/badges/mielecloudservice-stable.svg)
![NPM 版本](https://img.shields.io/npm/v/iobroker.mielecloudservice.svg)
![已知漏洞](https://snyk.io/test/github/Grizzelbee/ioBroker.mielecloudservice/badge.svg?targetFile=package.json)
![执照](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![下载](https://img.shields.io/npm/dm/iobroker.mielecloudservice.svg)
![新平台](https://nodei.co/npm/iobroker.mielecloudservice.png?downloads=true)

# IoBroker.mielecloudservice [![测试与发布](https://github.com/Grizzelbee/ioBroker.mielecloudservice/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/Grizzelbee/ioBroker.mielecloudservice/actions/workflows/test-and-release.yml)
## IoBroker 的 mielecloudservice 适配器
连接您的 Miele 电器（XGW3000 和 WiFiConn@ct）

&gt;如果您喜欢这个适配器并考虑支持我：<br/> &gt;[![使用 PayPal 捐款](admin/paypal-donate-button.png)](https://www.paypal.com/donate/?hosted_button_id=SPUDTXGNG2MYG)

＃＃ 描述
此适配器用于从官方 Miele 第三方 API 检索有关所有 Miele@Home 设备的信息。
无论它们是通过 Wi-Fi 还是 XGW3000 网关直接连接。它实现了 **Miele 第三方 API V1.0.5**

## 先决条件
* Miele@Home 用户（智能手机应用程序）
* Miele@Home 密码（智能手机应用程序）
* Miele Client_id（来自 https://www.miele.com/developer/）
* Miele Client_secret（来自 https://www.miele.com/developer/ ）

＃＃ 安装
要安装，请执行以下操作：

1. 通过管理员安装，使用
1. 通过管理员安装，使用
* stable Repo - 获取当前稳定版本
* 最新 Repo - 获取最新测试版本（可能不稳定）
* 通过：https://github.com/Grizzelbee/ioBroker.mielecloudservice.git - 获取最新开发版本
2. 在 Miele 智能手机应用程序中为 Miele@Home 创建应用程序帐户
3. 在 https://www.miele.com/f/com/en/register_api.aspx 创建开发者账户
4. 将您的 Miele 设备添加到应用程序（如果未自动添加）
6.填写Miele开发团队发来的client_secret和client_id以及App中的account-id和密码。

＃＃ 特征
此适配器目前实现了 Miele API V1.0.5 的几乎所有功能以及 API V1.0.6 的某些部分。
API 的功能可能（目前确实如此）与 iOS 和 Android 应用程序的功能不同。
例如，没有关于 TwinDos 的信息 - 即使应用程序也有这些信息。
这包括：

* 支持所有已知和记录的设备类型（API V1.0.6）。
* 所有设备类型的基本信息。
* 针对所有设备类型的扩展信息。
* 设备 EcoFeedback（水和/或电消耗）会报告此情况。

`Note: Not all devices report this information - event not if they do so in the iOS or Android apps. Search for the ecoFeedback folder in the device tree.`

* 您可以在此设备上执行的支持操作 - 设备的功能主要由 API 本身报告。

## 已知问题
* 适配器 v6.0.0 以后的程序基本都受支持。除了需要额外参数的程序，例如烤箱。

＃＃ 配置
### 基本配置
要运行此适配器，您至少需要：

* Miele@Home 用户（来自智能手机应用程序）
* Miele@Home 密码（来自智能手机应用程序）
* Miele Client_id（来自 https://www.miele.com/developer/）
* Miele Client_secret（来自 https://www.miele.com/developer/ ）

### 从 Miele 服务器请求数据
自 V6.2.0 起，您可以选择

* 服务器发送事件（服务器发送事件复选框已选中 - 默认且*强烈推荐*）
* 基于时间的数据轮询（服务器发送事件复选框未选中）
* 延迟处理

#### 服务器发送事件（强烈推荐）
服务器发送事件是一种非常巧妙的方法，可以从 miele 服务器获取数据，因为只要有变化，服务器就会向您发送数据。无需每 xx 秒进行无用轮询，而不管是否有变化。不幸的是，使用此连接类型存在问题 - 它经常失败，只有重新启动适配器才能解决这个问题。

#### 基于时间的数据轮询
为了提高适配器的稳定性，我重新引入了数据轮询作为配置选项，当 SSE 失败时您可以使用它。
尽管如此，SSE 是默认的，我强烈建议您尝试使用它，因为它可以为您和 Mieles 节省大量资源。除此之外，我从版本 5.x.x 开始专注于 SSE。
基于时间的数据轮询依赖于两个配置选项：

* 轮询间隔
* 轮询间隔单位（秒/分钟）

延迟处理
如果您拥有一些 Miele 电器并同时使用它们，API 可能会在短时间内发送许多消息。根据您的 ioBroker 硬件，这可能会使您的服务器过载并导致可视化无响应或代理无响应。为了避免这种情况，此配置选项将处理的消息数量减少到每 xxx 毫秒一条消息。
相关配置选项：

* 延迟处理
* 消息延迟

## 控制你的设备
### 动作
所有当前支持和记录的所有设备的操作均已实现 (API V1.0.5)。
> 请记住，只有将设备置于适当状态（例如移动控制、开机等），操作才会起作用。
有关操作的更多信息，请参阅 [Miele 文档](#documentation)。

### 程序（API V1.0.5 中引入）
Miele 在 API V1.0.5 中引入了一个名为“/programs”的新端点。
此端点的支持从适配器版本 4.5.0 开始。将创建一个新的数据点 [device.Actions.Program]，列出 Miele 返回的所有受支持的程序。
**选择其中一个值将立即执行该程序！**目前，仅支持简单程序。例如，烤箱需要一些额外的信息 - 这将在未来版本中实现。

在发布适配器时，Miele 记录了一些支持此端点的设备类别，并且只有其中的一部分（至少对我来说）真正起作用。对于我的咖啡系统、洗衣机和滚筒式烘干机，它仅适用于咖啡系统。
但 Miele 正在努力并定期扩展支持。
有关更多信息，请参阅常规 Miele API 文档（如下）。

## 文档
如果您想更深入地了解或需要原始值翻译，请参阅[本文档。](machine_states.md)

## Sentry.io
此适配器使用 sentry.io 收集崩溃详细信息并自动向作者报告。为此使用 [ioBroker.sentry](https://github.com/ioBroker/plugin-sentry) 插件。如果您不想用崩溃信息支持作者，请参阅 [插件主页](https://github.com/ioBroker/plugin-sentry) 了解有关插件功能、收集哪些信息以及如何禁用它的详细信息。

## 版权
版权所有 (c) 2025 grizzelbee <open.source@hingsen.de>

## Changelog
### **WORK IN PROGRESS**
- (grizzelbee) Upd: Dependencies got updated
- (grizzelbee) Fix: Added screen size settings in Admin-UI for responsive design
- (grizzelbee) Fix: Fixed sentry MIELECLOUDSERVICE-5V

### 6.5.7 (2024-10-01)
- (grizzelbee) Upd: Dependencies got updated
- (grizzelbee) Fix: Fixed some minor issues found by adapter-checker
- (grizzelbee) Upd: Added tests for node 22

### 6.5.6 (2024-05-10) (Dying for an Angel)

- (grizzelbee) New: [402](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/402) Added signalDoor to Washing machines, Tumble dryer and Washer dryer
- (grizzelbee) Upd: Dependencies got updated

### 6.5.5 (2024-01-03) (Dying for an Angel)

- (grizzelbee) Upd: Added year 2024 to licence
- (grizzelbee) Upd: Dependencies got updated

### 6.5.4 (2023-05-03) (Dying for an Angel)
* (grizzelbee) New: Added file `.ncurc.json` to prevent axios-oauth-client from being automatically updated by `npx npm-check-updates`

### 6.5.3 (2023-04-26) (Dying for an Angel)
* (grizzelbee) Fix: two minor bug fixes - including a fix that prevents objects from being updated constantly.

### 6.5.2 (2023-04-21) (Dying for an Angel)
* (grizzelbee) Fix: [367](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/367) Fixed "oauth is not a function" error during startup by downgrading axios-oauth-client to v1.5.0

### 6.5.1 (2023-04-21) (Dying for an Angel)
* (grizzelbee) Fix: Some minor fixes for ioBroker adapter checker

### 6.5.0 (2023-04-18) (Dying for an Angel)
* (grizzelbee) New: added device type 74 = Hob with vapour extraction (part of Miele API v1.0.6)
* (grizzelbee) Upd: Updated ReadMe file
* (grizzelbee) Chg: Dependencies got Updated
* (grizzelbee) Chg: Important: Requires at least Node.js 14
* (grizzelbee) Chg: Changed SpinningSpeed from number to string 
* (grizzelbee) New: Added RAW-Value to SpinningSpeed 
* (grizzelbee) Chg: Changed PlateStep-xxx from number to string (related to issue [356](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/356))
* (grizzelbee) New: Added RAW-Value to Platesteps (related to issue [356](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/356))
* (grizzelbee) Fix: [343](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/343) GENERIC_BUSINESS_ERROR occurred when switching ventilationStep
* (grizzelbee) Fix: [356](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/356) In some cases the value 0 (zero) is ignored (e.g. at PlateStep)
* (grizzelbee) Fix: [359](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/359) Fixed "oauth is not a function" error during startup by downgrading axios-oauth-client to v1.5.0

### 6.4.0 (2022-09-07) (Dying for an Angel)
* (grizzelbee) Fix: program names get localized now
* (grizzelbee) New: moved Admin-UI to jsonConfig
* (grizzelbee) Chg: BREAKING CHANGE: removed duplicate en-/decryption of passwords due to jsonConfig
* (grizzelbee) Chg: Moved some documentation from the readme file to machine_states.md

### 0.9.1 (2019-07-26)
* (grizzelbee) Fix: Fixed small bug introduced in V0.9.0 throwing an exception in debugging code

### 0.9.0 (2019-07-26)
* (grizzelbee) Upd: New versioning due to completeness and stability of the adapter (about 90%)
* (grizzelbee) New: make poll interval configurable  (currently 1,2,3,4,5,7,10,15 Minutes)
* (grizzelbee) Fix: fixed ESLint config
* (grizzelbee) Upd: Changed order of config fields in UI
* (grizzelbee) New: Set 5 Minutes poll interval and english response language as default to get initial values
* (grizzelbee) New: Parent-Datapoint of time values will be used to get a pretty readable time in the format h:mm. The deeper datapoints 0 and 1 will still be updated, but his will be removed in a future version to reduce workload.

### 0.0.5 (2019-07-25)
* (grizzelbee) Upd: some code maintenance
* (grizzelbee) New: added reply-language to config
   - Miele API is currently able to reply in German or English, now you can choose.
* (grizzelbee) New: created new Icon
* (grizzelbee) Fix: fixed translation issues and translated adapter UI using gulp
* (grizzelbee) Upd: Made changes to travis requested by apollon77

### 0.0.4
* (hash99) add devices configuration

### 0.0.3
* (hash99) adapter conform

### 0.0.1
* (hash99) initial release

## License
The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.