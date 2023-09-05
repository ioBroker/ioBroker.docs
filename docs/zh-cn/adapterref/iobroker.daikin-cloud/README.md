---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.daikin-cloud/README.md
title: ioBroker.大金云
hash: cSKtpMuG2tBxU9KOMdGSFWUyWjlyg0ikhHEA6FvDiO0=
---
![标识](../../../en/adapterref/iobroker.daikin-cloud/admin/daikin-cloud.jpg)

![安装数量](http://iobroker.live/badges/daikin-cloud-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.daikin-cloud.svg)
![下载](https://img.shields.io/npm/dm/iobroker.daikin-cloud.svg)

# IoBroker.daikin-cloud
![测试与发布](https://github.com/Apollon77/iobroker.daikin-cloud/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/daikin-cloud/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用 Sentry 报告。

## IoBroker 的大金云适配器
控制仅连接到大金云/Oneecta 应用程序的大金设备。适配器连接到 Daikin-Cloud 并从那里轮询数据。

## 免责声明
**所有产品和公司名称或徽标均为其各自所有者的商标™或注册®商标。使用它们并不意味着与它们或任何关联子公司有任何隶属关系或认可！此个人项目是在业余时间维护的，没有商业目标。** **Daikin 是 DAIKIN INDUSTRIES, LTD. 的商标。**

## 兼容性
该适配器应与带有可通过 Daikin Onecta 应用程序控制的 Daikin WLAN 适配器 **BRP069C4x** 的设备兼容。无法与这些设备进行本地连接！

注意：对于具有旧版 WLAN 适配器（例如 **BRP069A4x**）且只能由 Daikin 控制器应用程序使用的设备，请改用 [大金](https://github.com/Apollon77/ioBroker.daikin) 适配器。

## 功能
自 2020 年以来销售的较新的大金设备包含较新的 Wifi 适配器（例如 BRP069C4x），该适配器仅连接到大金云，并且不再在本地进行访问。这些设备只能通过 Daikin Onecta 应用程序进行控制。

该适配器允许最初（希望一次）通过使用代理登录大金云来检索令牌。之后，可以使用和刷新这些令牌来与设备进行交互。

连接到大金云帐户后，适配器将自动为连接到大金云的每个设备创建一个新设备。显示所有可用数据，并允许控制设备的几种状态。
**请注意，大金云的命令速度并不是很快，这意味着命令真正执行或状态更新可能需要长达 3 分钟的时间！**

### 通过电子邮件/密码登录
如果您想提供大金云凭据，则适配器可以尝试自动登录云。电子邮件和密码在配置中加密存储。

由于大金网站要求您解决验证码，因此该过程可能不起作用。在此可以使用以下技巧：

* 通过管理中的适配器配置启动代理
* 单击代理弹出窗口中的二维码
* 您**不需要**需要导入证书！
* 只需点击说明页面末尾的“登录大金云以检索令牌”链接并登录一次并解决验证码即可。
* 关闭浏览器窗口并重新启动适配器

### 通过代理登录
**有关最终用户代理进度的更多信息 - 因为您需要信任证书并将其列入白名单等 - 可以在 [代理.md](PROXY.md)!** 中找到：该项目不会获取任何用户名或密码，只是获取登录后创建的令牌。这也意味着，如果大金重置令牌或令牌过期，您需要再次执行此过程！

## 免责声明
**大金是大金工业株式会社的商标。我不以任何方式获得 DAIKIN INDUSTRIES, LTD. 或任何相关子公司、徽标或商标的认可或附属。这个个人项目是在业余时间维护的。**

## Changelog

### __WORK IN PROGRESS__
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

Copyright (c) 2022-2023 Apollon77 <iobroker@fischer-ka.de>

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