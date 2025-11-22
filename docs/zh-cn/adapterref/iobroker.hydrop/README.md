---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.hydrop/README.md
title: ioBroker.hydrop
hash: KiZ+pJiCc4/gNliFL7jiRSCcqZPtEWSuNQqpGJo78Yo=
---
![标识](../../../en/adapterref/iobroker.hydrop/admin/hydrop_Readme_Logo.png)

![安装数量](http://iobroker.live/badges/hydrop-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.hydrop.svg)
![下载](https://img.shields.io/npm/dm/iobroker.hydrop.svg)
![已知漏洞](https://snyk.io/test/github/simatec/ioBroker.hydrop/badge.svg)
![执照](https://img.shields.io/github/license/simatec/ioBroker.hydrop?style=flat)
![捐](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)
![NPM](https://nodei.co/npm/iobroker.hydrop.png?downloads=true)

# IoBroker.hydrop
![测试与发布](https://github.com/simatec/ioBroker.hydrop/workflows/Test%20and%20Release/badge.svg)

此适配器使用服务 `Sentry.io` 自动向我（开发者）报告异常、代码错误和新的设备架构。更多详情请见下文！

*****

## 支持适配器开发
**如果您喜欢`ioBroker.hydrop`，请考虑捐赠：**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

*****

### Sentry.io 是什么？它会向该公司的服务器报告哪些信息？
Sentry.io 是一项面向开发者的服务，用于概览其应用程序中的错误。而这个适配器正是实现了这一功能。

当适配器崩溃或发生其他代码错误时，此错误信息（也会出现在 ioBroker 日志中）会提交给 Sentry。如果您允许 iobroker GmbH 收集诊断数据，则您的安装 ID（这只是一个唯一的 ID，**不**包含您的任何其他信息，例如电子邮件、姓名等）也会被包含在内。这使得 Sentry 能够对错误进行分组，并显示有多少个独立用户受到此类错误的影响。所有这些都有助于我提供几乎不会崩溃的无错误适配器。

*****

## IoBroker 的水力适配器
这款适配器可让您将水位计无缝集成到 ioBroker 中，从而将您的用水量纳入智能家居系统。要了解更多关于水位计和 Hydrop Systems 的信息，请访问其网站：https://hydrop-systems.com

要将您的比重计集成到 ioBroker 中，您需要以下组件：

* 在 Hydrop 应用程序中拥有一个帐户（适用于 [Android](https://play.google.com/store/apps/details?id=com.hydropsystems.monitoring&pcampaignid=web_share) 和 [iOS](https://apps.apple.com/de/app/hydrop/id6740268955)）
* 你在应用程序中给你的比重计起的名字
* 您的 Hydrop REST API 个人 API 密钥

您可以在 Hydrop 应用中生成 API 密钥。导航至 `Settings`，展开 `Account` 部分，然后点击 `API key`。API 密钥只会显示一次，请务必将其保存在安全的地方。

准备好所有信息后，即可开始。在 Hydrop 适配器实例的设置页面中输入信息，然后点击 `Save`。相应的对象将在对象树中自动创建。

ioBroker 每 5 分钟查询一次数据。

*****

### 比重计的工作原理是什么？
这款水表是水表的智能附加组件。它采用先进的人工智能计算机视觉技术，能够检测水表读数的每一次变化，从而生成详细的高分辨率用水时间序列数据。通过监测流量，您可以发现异常情况并找到微小的漏水点。当然，如果流量超过设定的最大值，您还可以收到警报。借助 ioBroker，您可以实现近乎无限的功能。

如果您想检查该比重计是否与您的水表类型兼容，请使用此工具：https://shop.hydrop-systems.com/zaehlercheck/

*****

## Changelog
<!-- ### **WORK IN PROGRESS** -->
### **WORK IN PROGRESS**
* (simatec) Fix dependabot
* (simatec) Update dependencies

### 0.1.3 (2025-11-05)
* (Goriatch) Minified Adapter Logo
* (Goriatch) Localization, description and branding updates
* (simatec) Update dependencies

### 0.1.2 (2025-11-02)
* (simatec) Fix for Beta Release

### 0.1.1 (2025-11-02)
* (simatec) Fix for Beta Release

### 0.1.0 (2025-10-31)
* (simatec) Fix daily Consumption
* (simatec) Update dependencies

### 0.0.5 (2025-10-26)
* (simatec) Fix daily Consumption
* (simatec) get current states added
* (simatec) Fix output

### 0.0.4 (2025-10-23)
* (simatec) many small fixes

### 0.0.3 (2025-10-21)
* (simatec) Trusted Publisher added
* (simatec) Source code improved
* (simatec) Readme added

### 0.0.2 (2025-10-19)
* (simatec) initial release

*****

## License
MIT License

Copyright (c) 2025 simatec

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