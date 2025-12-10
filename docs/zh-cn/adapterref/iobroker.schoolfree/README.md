---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.schoolfree/README.md
title: ioBroker.schoolfree
hash: S/xH1aaRxryOQeISBMFmoqEE1bY14AKbIcSqq5mJ0v4=
---
![标识](../../../en/adapterref/iobroker.schoolfree/admin/schoolfree.png)

![安装数量](http://iobroker.live/badges/schoolfree-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.schoolfree.svg)
![下载](https://img.shields.io/npm/dm/iobroker.schoolfree.svg)
![已知漏洞](https://snyk.io/test/github/simatec/ioBroker.schoolfree/badge.svg)
![执照](https://img.shields.io/github/license/simatec/ioBroker.schoolfree?style=flat)
![捐](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# IoBroker.schoolfree
![测试与发布](https://github.com/simatec/ioBroker.schoolfree/workflows/Test%20and%20Release/badge.svg)

此适配器使用 Sentry.io 服务自动向我（开发者）报告异常、代码错误和新的设备架构。更多详情请见下文！

## 适用于 ioBroker 的 schoolfree 适配器
如果您喜欢，请考虑捐赠：

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

*************************************************************************************************************************************

＃＃＃ 描述：
Schoolfree 是一个用于 iobroker 安装的适配器。

通过该适配器，可以评估学校假期并将其传输到数据点。

这些数据点随后可以被评估和处理，用于其他功能，例如供暖控制、百叶窗控制和人员存在控制。

目前学校假期订阅是通过 https://www.mehr-schulferien.de 的 API 实现的。

目前，德国的学校假期和休假日都得到了支持。

以下数据点可供 Schoolfree 进行进一步处理：

* info.current.end：当前假期的结束日期
* info.current.name：当前学校假期的名称
* info.current.start：当前假期的开始日期
* info.next.end：下一个假期的结束日期
* info.next.name：下一个学校假期的名称
* info.next.start：下一个假期的开始日期
* info.today：显示当前状态的开关（true / false）
* info.tomorrow：明天是否显示当前状态（true / false）

### Sentry.io 是什么？它会向该公司的服务器报告哪些信息？
Sentry.io 是一项面向开发者的服务，用于概览其应用程序中的错误。而这个适配器正是实现了这一功能。

当适配器崩溃或发生其他代码错误时，此错误信息（也会出现在 ioBroker 日志中）会提交给 Sentry。如果您允许 iobroker GmbH 收集诊断数据，则您的安装 ID（这只是一个唯一的 ID，**不**包含您的任何其他信息，例如电子邮件、姓名等）也会被包含在内。这使得 Sentry 能够对错误进行分组，并显示有多少个独立用户受到此类错误的影响。所有这些都有助于我提供几乎不会崩溃的无错误适配器。

*************************************************************************************************************************************

## Changelog
<!--### __WORK IN PROGRESS__-->
### __WORK IN PROGRESS__
* (simatec) Readme updated

### 1.1.13 (2025-11-18)
* (simatec) dependencies updated
* (simatec) update npm publish

### 1.1.12 (2025-08-31)
* (simatec) small fix
* (simatec) dependencies updated

### 1.1.11 (2025-08-15)
* (simatec) dependencies updated

### 1.1.10 (2025-06-29)
* (simatec) dependencies updated
* (simatec) Ready for NodeJS 24.x

### 1.1.9 (2025-03-14)
* (simatec) Fix warning
* (simatec) Dependencies updated

### 1.1.8 (2025-02-22)
* (simatec) eslint-config fix
* (simatec) Dependencies updated
* (simatec) small Fix

### 1.1.7 (2024-12-31)
* (simatec) eslint-config fix
* (simatec) Dependencies updated
* (simatec) Fix States
* (simatec) Update License

### 1.1.6 (2024-11-25)
* (simatec) Dependencies updated
* (simatec) Issue Action added
* (simatec) eslint-config added

### 1.1.5 (2024-09-21)
* (simatec) Dependencies updated
* (simatec) small fix
* (simatec) Responsive Design added

### 1.1.4 (2024-02-06)
* (simatec) Dependencies updated
* (simatec) Design Fix
* (simatec) Gulp deleted
* (simatec) adapter-dev added
* (simatec) Translation updated

### 1.1.3 (2023-11-02)
* (simatec) Dependencies updated
* (simatec) test and release updated

### 1.1.2 (2023-09-04)
* (simatec) Dependencies updated
* (simatec) test and release updated
* (simatec) Translation updated

### 1.1.1 (2023-03-18)
* (simatec) Dependencies updated
* (simatec) test and release updated

### 1.1.0 (2022-11-01)
* (simatec) Dependencies updated
* (simatec) test and release updated

### 1.0.1 (2021-11-18)
* (simatec) Dependencies updated
* (simatec) test and release updated

### 1.0.0 (06.05.2021)
* (simatec) GUI revised
* (simatec) Added support for admin5
* (simatec) code cleaned
* (simatec) dependencies updated
* (simatec) Github Test and Release added

### 0.7.0 (27.10.2020)
* (simatec) Changeover from request to axios for data retrieval
* (simatec) Conversion of the code structure
* (simatec) code cleaned
* (simatec) dependencies updated

### 0.6.4 (06.07.2020)
* (simatec) small Bugfixes

### 0.6.3 (02.07.2020)
* (simatec) Bugfix API Request error

### 0.6.2 (27.05.2020)
* (simatec) small Bugfixes at locations settings

### 0.6.1 (11.05.2020)
* (simatec) added errorhandling for sentry.io
* (simatec) added node 14 support

### 0.6.0 (04.05.2020)
* (simatec) added new features
* (simatec) Bugfix next day schoolfree
* (simatec) added sentry.io
* (simatec) added translations
* (simatec) added error handling

### 0.5.1 (25.03.2020)
* (simatec) added new features

### 0.5.0 (23.03.2020)
* (simatec) added public holidays
* (simatec) Bugfix next schoolfree for API 2.0
* (simatec) Bugfix schoolfree-name for API 2.0

### 0.4.1 (22.03.2020)
* (simatec) new query as adaptation to API v2.0
* (simatec) Adjustment of the federal state IDs"
* (simatec) Code fix for autochecker
* (simatec) update Dependencies

### 0.4.0 (21.03.2020)
* (simatec) added new api v2.0 from www.mehr-schulferien.de

### 0.3.1 (28.10.2019)
* (simatec) Fix start after install

### 0.3.0 (18.10.2019)
* (simatec) end of node 6 support
* (simatec) changed dateformat

### 0.2.2 (04.06.2019)
* (simatec)new object structure

### 0.2.1 (14.05.2019)
* (simatec) fix travis and appveyor

### 0.2.0 (13.05.2019)
* (simatec) Add Objects for next school holiday
* (simatec) cleaned code

### 0.1.0 (10.05.2019)
* (simatec) First Beta

### 0.0.1 (08.05.2019)
* (simatec) initial release

*************************************************************************************************************************************

## License
MIT License

Copyright (c) 2019 - 2025 simatec

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