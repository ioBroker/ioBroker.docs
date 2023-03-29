---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.schoolfree/README.md
title: ioBroker.schoolfree
hash: BsSCPgTXnrYtW2QvtzPh2J6HOYP11s13WGmANTpaqbk=
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
![测试和发布](https://github.com/simatec/ioBroker.schoolfree/workflows/Test%20and%20Release/badge.svg)

此适配器使用服务 Sentry.io 自动向我作为开发人员报告异常和代码错误以及新的设备模式。更多详情见下文！

## IoBroker 的 schoolfree 适配器
**如果喜欢，请考虑捐款：**

[![贝宝](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

### 德意志研究报告：
Schoolfree 是用于安装 iobroker 的适配器。
Mit dem Adapter lassen sich die Schulferien auswerten und in Datenpunkte übergeben。
Die Datenpunkte können somit für weitere Funktionen wie Heizungssteuerungen、Rolladen- und Anwesenheitssteuerungen ausgewertet und verarbeitet werden。

Der aktuelle Bezug von Terminen für die Schulferien erfolgt über die API von https://www.mehr-schulferien.de

Aktuell werden die Schulferien und freien Tage für Deutschland unterstützt。

Folgende Datenpunkte stehen mit Schoolfree für die weitere Verarbeitung zur Verfügung：

* info.current.end: Datum für das Ende der aktuellen Ferien
* info.current.name: Bezeichnung der aktuellen Schulferien
* info.current.start: Startdatum der aktuellen Ferien
* info.next.end: Datum für das Ende der nächsten Ferien
* info.next.name：Bezeichnung der nächsten Schulferien
* info.next.start: Startdatum der nächsten Ferien
* info.today: Switch für den aktuellen Status heute (true/false)
* info.tomorrow: Switch für den aktuellen Status morgen (true/false)

*************************************************************************************************************************************

###英文说明：
Schoolfree 是 iobroker 安装的适配器。
使用适配器，可以评估学校假期并将其传输到数据点。
因此，可以评估和处理数据点以用于其他功能，例如加热控制、快门和存在控制。

当前学校假期的订阅是通过 https://www.mehr-schulferien.de 的 API

目前，支持德国的学校假期和休息日。

以下数据点可用于 Schoolfree 的进一步处理：

* info.current.end: 当前假期结束日期
* info.current.name: 当前学校假期名称
* info.current.start: 当前假期的开始日期
* info.next.end: 下一个假期结束的日期
* info.next.name：下一个学校假期的名称
* info.next.start: 下一个假期的开始日期
* info.today: 切换为今天的当前状态(true/false)
* info.tomorrow: 明天切换当前状态 (true / false)

### 什么是 Sentry.io 以及向该公司服务器报告的内容？
Sentry.io 是一项服务，供开发人员从他们的应用程序中获取有关错误的概览。正是在这个适配器中实现了这一点。

当适配器崩溃或发生其他代码错误时，此错误消息也会出现在 ioBroker 日志中，并提交给 Sentry。当您允许 iobroker GmbH 收集诊断数据时，您的安装 ID（这只是一个唯一的 ID **没有**关于您、电子邮件、姓名等的任何其他信息）也包括在内。这允许 Sentry 对错误进行分组并显示有多少唯一用户受到此类错误的影响。所有这些都有助于我提供基本上不会崩溃的无错误适配器。

*************************************************************************************************************************************

## Changelog
<!--### __WORK IN PROGRESS__-->
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

Copyright (c) 2019 - 2023 simatec

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