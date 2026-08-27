---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.pegelalarm/README.md
title: ioBroker.pegelalarm
hash: 2KA/JKk8adnZ3p0DzgD9A3PEuTC/MS42dx9UM9L3Hms=
---
![标识](../../../en/adapterref/iobroker.pegelalarm/admin/pegelalarm.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.pegelalarm.svg)
![下载](https://img.shields.io/npm/dm/iobroker.pegelalarm.svg)
![安装数量（最新）](http://iobroker.live/badges/pegelalarm-installed.svg)
![安装数量（稳定版）](http://iobroker.live/badges/pegelalarm-stable.svg)
![执照](https://img.shields.io/github/license/simatec/ioBroker.pegelalarm?style=flat)
![捐](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# IoBroker.pegelalarm
![测试与发布](https://github.com/simatec/ioBroker.pegelalarm/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 Pegelalarm 适配器
提供来自 Pegelalarm-API (v1.0) 的数据

API 1.1 的 API 文档可在此处找到：https://github.com/SOBOS-GmbH/pegelalarm_public_pas_doc/wiki/Download-current-water-data

**************************************************************************************************************

### Sentry.io 是什么？它会向该公司的服务器报告哪些信息？
Sentry.io 是一项面向开发者的服务，用于概览其应用程序中的错误。而这个适配器正是实现了这一功能。

当适配器崩溃或发生其他代码错误时，此错误信息（也会出现在 ioBroker 日志中）会提交给 Sentry。如果您允许 iobroker GmbH 收集诊断数据，则您的安装 ID（这只是一个唯一的 ID，**不**包含您的任何其他信息，例如电子邮件、姓名等）也会被包含在内。这使得 Sentry 能够对错误进行分组，并显示有多少个独立用户受到此类错误的影响。所有这些都有助于我提供几乎不会崩溃的无错误适配器。

**************************************************************************************************************

如果您喜欢，请考虑捐赠：

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

**************************************************************************************************************

## Changelog
<!--### __WORK IN PROGRESS__-->
### 1.4.0 (2026-04-22)
* (simatec) dependencies updated
* (simatec) Request Fix
* (simatec) Timeout Fix
* (simatec) Source code rewritten,
* (simatec) Source code improved
* (simatec) Station names fixed
* (simatec) Header added

### 1.3.13 (2026-03-29)
* (simatec) Fix License
* (simatec) dependencies updated

### 1.3.12 (2025-11-23)
* (simatec) dependencies updated

### 1.3.11 (2025-11-02)
* (simatec) dependencies updated
* (simatec) Fix npm publish

### 1.3.10 (2025-08-31)
* (simatec) Dependencies updated

### 1.3.9 (2025-06-28)
* (simatec) smal Code fix
* (simatec) Dependencies updated

### 1.3.8 (2025-02-22)
* (simatec) Dependencies updated
* (simatec) small Fix

### 1.3.7 (2025-01-09)
* (simatec) eslint-config fix
* (simatec) Dependencies updated
* (simatec) Update License

### 1.3.6 (2024-11-25)
* (simatec) Dependencies updated
* (simatec) Issue Action added
* (simatec) eslint-config added

### 1.3.5 (2024-09-21)
* (simatec) small fix

### 1.3.4 (2024-09-20)
* (simatec) Dependencies updated
* (simatec) dev-server added
* (simatec) small fix
* (simatec) Responsive Design added

### 1.3.3 (2024-02-08)
* (simatec) Dependencies updated
* (simatec) Design Fix
* (simatec) gulp deleted
* (simatec) adapter-dev added
* (simatec) Translation updated

### 1.3.2 (2023-11-20)
* (simatec) Dependencies updated

### 1.3.1 (2023-09-04)
* (simatec) Dependencies updated
* (simatec) test and release updated
* (simatec) Translation updated

### 1.3.0 (2023-03-18)
* (simatec) Dependencies updated
* (simatec) Repo updated

### 1.2.9 (2022-11-01)
* (simatec) Dependencies updated

### 1.2.8 (2022-06-27)
* (simatec) Bugfix delete stations
* (simatec) Bugfix stations
* (simatec) Dependencies updated

### 1.2.7 (2022-04-25)
* (simatec) Bugfix delete stations

### 1.2.6 (2022-04-25)
* (simatec) Bugfix delete stations
* (simatec) Dependencies updated

### 1.2.5 (2021-12-08)
* (simatec) Bugfix Adapter stop after request error
* (simatec) Dependencies updated
* (simatec) test and release updated

### 1.2.4 (2021-11-17)
* (simatec) Dependencies updated
* (simatec) test and release updated

### 1.2.3 (2021-09-02)
* (simatec) Bugfix States

### 1.2.2 (2021-09-02)
* (simatec) Bugfix States

### 1.2.1 (2021-09-02)
* (simatec) Bugfix API-Request
* (simatec) dependencies updated
* (simatec) small Bugfixes

### 1.2.0 (2021-04-29)
* (simatec) Redesign Gui

### 1.1.7 (2021-04-10)
* (simatec) Bugfix Adapter stop
* (simatec) Bugfix clean old stations

### 1.1.6 (2021-04-09)
* (simatec) Bugfix for latest Repo

### 1.1.5 (2021-04-07)
* (simatec) fetch added
* (simatec) sentry added

### 1.1.4 (2021-04-02)
* (simatec) Improved code for request from measuring stations

### 1.1.3 (2021-03-31)
* (simatec) Settings for 5 measuring station added
* (simatec) Bugfix

### 1.1.2 (2021-03-29)
* (simatec) allStationsJSON state added
* (simatec) code rewritten
* (simatec) small Bugfix
* (simatec) axios added

### 1.1.1 (2021-03-28)
* (simatec) json state added
* (simatec) Configuration menu redesigned
* (simatec) unit added
* (simatec) many small Bugfix
* (simatec) Translations added

### 1.1.0 (2021-03-27)
* (simatec) fork from bazidibavaria
* (simatec) code rewritten
* (simatec) dependencies updated
* (simatec) Bugfix setState
* (simatec) Bugfix getState
* (simatec) License updated

### 1.0.0 (2020-09-01)
* (bazidibavaria) updated packages

### 0.0.1 (2020-08-27)
* (bazidibavaria) released

### 0.0.1-2 (2020-08-10)
* (bazidibavaria) fix api-count in index_m.html

### 0.0.1-1 (2020-08-10)
* (bazidibavaria) added travis support
* (bazidibavaria) add images to readme

### 0.0.1-0 (2020-08-10)
* (bazidibavaria) prerelease

## License
MIT License

Copyright (c) 2020 - 2026 simatec

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