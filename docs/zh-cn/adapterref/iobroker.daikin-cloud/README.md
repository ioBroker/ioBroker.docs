---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.daikin-cloud/README.md
title: ioBroker.daikin-云
hash: +kV8LTrPXAR0CekzsC6vm/FTs5gQp256z/f2UT5NCZE=
---
![标识](../../../en/adapterref/iobroker.daikin-cloud/admin/daikin-cloud.jpg)

![安装数量](http://iobroker.live/badges/daikin-cloud-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.daikin-cloud.svg)
![下载](https://img.shields.io/npm/dm/iobroker.daikin-cloud.svg)

# IoBroker.daikin-云
![测试和发布](https://github.com/Apollon77/iobroker.daikin-cloud/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/daikin-cloud/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用哨兵库自动向开发人员报告异常和代码错误。**有关更多详细信息和如何禁用错误报告的信息，请参阅[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

## IoBroker 的大金云适配器
控制仅连接到 Daikin Cloud / Onecta App 的 Daikin 设备。适配器连接到 Daikin-Cloud 并从那里轮询数据。

**此适配器可以安装以下 Node.js 版本：**

* 12.19.0+
* 14.15.0+
* 16.13.0+
* 目前不支持 Node.js 18，因为使用的 OAuth 库不支持它！

##免责声明
**所有产品和公司名称或徽标均为其各自所有者的商标™ 或注册® 商标。使用它们并不意味着与它们或任何相关子公司有任何从属关系或认可！此个人项目是在业余时间维护的，没有业务目标。** **Daikin 是 DAIKIN INDUSTRIES, LTD. 的商标。**

## 兼容性
此适配器应与配备 Daikin WLAN 适配器 **BRP069C4x** 的设备兼容，可通过 Daikin Onecta App 进行控制。无法与这些设备进行本地连接！

注意：对于带有旧版 WLAN 适配器（如 **BRP069A4x**，只能由 Daikin 控制器应用程序使用）的设备，请改用 [大金](https://github.com/Apollon77/ioBroker.daikin) 适配器。

## 功能
自 2020 年以来销售的较新的 Daikin 设备包含一个较新的 Wifi 适配器（例如 BRP069C4x），它仅连接到 Daikin 云并且不再在本地访问。这些设备只能通过 Daikin Onecta App 进行控制。

该适配器允许最初（希望一次）通过使用代理登录到大金云来检索令牌。之后，可以使用和刷新这些令牌以与设备进行交互。

连接到大金云帐户后，适配器将自动为连接到大金云的每个设备创建一个新设备。显示所有可用数据，并且有几种状态允许控制设备。
**请注意，大金云的命令速度不是超级快，这意味着在真正执行命令或更新状态之前最多可能需要 3 分钟！**

### 通过电子邮件/密码登录
如果您想提供 Daikin Cloud Credentials，则适配器可以尝试自动登录到 Cloud。电子邮件和密码在配置中加密存储。

可能会发生此过程不起作用的情况，因为大金网站要求您解决验证码问题。在此可以使用以下技巧：

* 通过 Adapter-Configuration 在 Admin 中启动代理
* 单击代理弹出窗口中的二维码
* 您**不需要**需要导入证书！
* 只需单击说明页面末尾的“登录大金云以检索令牌”链接，然后在那里登录一次并解决验证码问题。
* 关闭浏览器窗口并重启适配器

### 通过代理登录
**有关最终用户代理进度的更多信息 - 因为您需要信任和白名单证书等 - 可以在[代理.md](PROXY.md)!中找到**信息：这个项目没有获取任何用户名或密码，只是在您登录后创建令牌。这也意味着，如果大金重置令牌或令牌过期，您需要再次执行此过程！

##免责声明
**大金是大金工业株式会社的商标。 DAIKIN INDUSTRIES, LTD. 或任何相关子公司、徽标或商标均未以任何方式认可或隶属于我。这个个人项目是在业余时间维护的。**

## Changelog
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

Copyright (c) 2022 Apollon77 <iobroker@fischer-ka.de>

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