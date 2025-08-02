---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.daikin-cloud/README.md
title: ioBroker.daikin-cloud
hash: fc+lDvniOI9v/PO4rz0DAdRWjY9t8XW07zgPlvQiPIU=
---
![标识](../../../en/adapterref/iobroker.daikin-cloud/admin/daikin-cloud.jpg)

![安装数量](http://iobroker.live/badges/daikin-cloud-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.daikin-cloud.svg)
![下载](https://img.shields.io/npm/dm/iobroker.daikin-cloud.svg)

# IoBroker.daikin-cloud
![测试与发布](https://github.com/Apollon77/iobroker.daikin-cloud/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/daikin-cloud/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 5.0 开始使用 Sentry 报告。

## 适用于 ioBroker 的 Daikin-cloud 适配器
控制仅连接到 Daikin Cloud/Onecta App 的 Daikin 设备。适配器连接到 Daikin-Cloud 并从那里轮询数据。为了实现此功能，您需要注册“Daikin Europe 开发者帐户”并在那里创建一个应用程序。然后，适配器将使用此应用程序的凭据连接到 Daikin Cloud。

## 免责声明
**所有产品和公司名称或徽标均为其各自所有者的商标™或注册®商标。使用它们并不意味着与它们或任何相关子公司有任何关联或认可！此个人项目是在业余时间维护的，没有商业目标。** **Daikin 是 DAIKIN INDUSTRIES, LTD. 的商标。**

＃＃ 兼容性
此适配器应与配备 Daikin WLAN 适配器 **BRP069C4x** 的设备兼容，这些设备可通过 Daikin Onecta App 进行控制。无法与这些设备进行本地连接！

注意：对于具有旧版 WLAN 适配器（如 **BRP069A4x**）的设备，由于该设备只能由 Daikin 控制器应用程序使用，请改用 [大金](https://github.com/Apollon77/ioBroker.daikin) 适配器。

功能
自 2020 年起销售的新型 Daikin 设备包含较新的 Wifi 适配器（例如 BRP069C4x），该适配器仅连接到 Daikin Cloud，不再可在本地访问。这些设备只能通过 Daikin Onecta App 进行控制。

此适配器允许最初（希望是一次）使用个人开发者帐户和一次性登录流程检索令牌。之后，可以使用和刷新这些令牌来与设备交互。

连接到 Daikin Cloud 帐户后，适配器将自动为连接到 Daikin Cloud 的每个设备创建一个新设备。显示所有可用数据，并允许通过多种状态控制设备。
**请注意，Daikin Cloud 的命令速度不是超级快，这意味着可能需要长达 3 分钟才能真正执行命令或更新状态！**

此外，Daikin Cloud API 的每日请求次数限制为 200 次。因此，请考虑以下最佳做法：

* 默认轮询间隔为 15 分钟，对于大多数用例来说应该足够了，同时还留出一些空间用于控制设备。考虑到每个控制操作都需要 2 个请求（一个用于控制，一个用于在控制调用 1 分钟后更新数据）。尤其是在许多设备的情况下，这确实会造成问题。
* 适配器还支持“慢速轮询”，您可以定义自己的间隔。使用状态“useSlowPolling”根据您的需要启用或禁用慢速轮询（例如，在夜间每小时轮询一次...）
* 最好在切换设备电源状态之间留出至少 10 分钟的时间，否则会对设备的移动部件造成不利影响

当前速率限制详细信息包含在适配器状态中，每次适配器向 Daikin Cloud 发出请求时都会更新。

## 免责声明
**Daikin 是 DAIKIN INDUSTRIES, LTD. 的商标。我绝不认可或隶属于 DAIKIN INDUSTRIES, LTD. 或任何相关子公司、徽标或商标。此个人项目是在业余时间维护的。**

## Changelog
### 0.4.10 (2024-07-20)
* (Apollon77) Fixes some error cases reported by Sentry

### 0.4.9 (2024-07-19)
* (Apollon77) Optimized write handling

### 0.4.8 (2024-07-12)
* (Apollon77) Optimized handling of rate limits, block maximum 24h and retry then
* (Apollon77) Added option to prevent sending the same values again (prevented by default!)

### 0.4.7 (2024-07-09)
* (Apollon77) Handles initialization issue where objects could be deleted wrongly
* (Apollon77) Also check for HTTPS usage when returning the redirect URL

### 0.4.6 (2024-07-07)
* (Apollon77) Update dependencies with optimizations and second blocking layer for rate limiting

### 0.4.5 (2024-07-06)
* (Apollon77) Block communication when rate limited according to Daikin response

### 0.4.4 (2024-07-06)
* (Apollon77) Fix initialization retry schedule

### 0.4.3 (2024-07-05)
* IMPORTANT: Minimum Node.js version is 18.2
* (Apollon77) BREAKING: Adjusted to new Daiking Cloud API - You need to reauthenticate!
* (Apollon77) BREAKING: New rate limit of new API is 200 requests per day!! Adjust your usage!
* (Apollon77) Added option to set "slow polling" interval
* (Apollon77) Make electrical data available as states (arrays for now)
* (Apollon77) Restore last data updated timestamp
* (Apollon77) Make sure cloudConnection always contains a boolean
* (Apollon77) Refresh token also when error is "Refresh Token has expired"

### 0.3.0 (2023-08-23)
* (Apollon77) Make compatible with Node.js 18+ too
* (Apollon77) Adjust name fallback

### 0.2.3 (2022-09-12)
* (Apollon77) Clear the tokenset when email or password is changed in config

### 0.2.2 (2022-08-13)
* (Apollon77) Add naming support for devices using old WLAN adapters but updated for Onecta

### 0.2.1 (2022-07-03)
* (Apollon77) Fix the device info and count for connected devices in Admin UI

### 0.2.0 (2022-06-30)
* (Apollon77) Add name lookup for Altherma devices
* (Apollon77) Send data to Sentry on unknown device types

### 0.1.4 (2022-06-28)
* (Apollon77) Adjust logging on Login to be more clear

### 0.1.3 (2022-06-03)
* (Apollon77/Garfonso) Optimizations and fixes

### 0.1.2 (2022-05-27)
* (Apollon77) Prevent crash reported by Sentry

### 0.1.1 (2022-05-23)
* (Apollon77) Add Sentry for crash reporting

### 0.1.0 (2022-05-23)
* (Apollon77) initial release

## License
MIT License

Copyright (c) 2022-2024 Apollon77 <iobroker@fischer-ka.de>

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