---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.uv-protect/README.md
title: ioBroker.uv-保护
hash: +G2ZFhEpZGS4FRBYIYdgYEkZOmLEO/0gifXc8vqfzx8=
---
![标识](../../../en/adapterref/iobroker.uv-protect/admin/uv-protect.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.uv-protect.svg)
![下载](https://img.shields.io/npm/dm/iobroker.uv-protect.svg)
![安装数量（最新）](http://iobroker.live/badges/uv-protect-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/uv-protect-stable.svg)
![已知漏洞](https://snyk.io/test/github/simatec/ioBroker.uv-protect/badge.svg)
![执照](https://img.shields.io/github/license/simatec/ioBroker.uv-protect?style=flat)
![捐](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# IoBroker.uv-保护
![测试和发布](https://github.com/simatec/ioBroker.uv-protect/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的紫外线防护适配器
来自 openUV-API 的紫外线防护

**************************************************************************************************************

**如果喜欢，请考虑捐款：**

[![贝宝](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

**************************************************************************************************************

### 什么是 Sentry.io 以及向该公司服务器报告的内容？
Sentry.io 是一项服务，供开发人员从他们的应用程序中获取有关错误的概览。正是在这个适配器中实现了这一点。

当适配器崩溃或发生其他代码错误时，此错误消息也会出现在 ioBroker 日志中，并提交给 Sentry。当您允许 iobroker GmbH 收集诊断数据时，您的安装 ID（这只是一个唯一的 ID **没有**关于您、电子邮件、姓名等的任何其他信息）也包括在内。这允许 Sentry 对错误进行分组并显示有多少唯一用户受到此类错误的影响。所有这些都有助于我提供基本上不会崩溃的无错误适配器。

**************************************************************************************************************

## Changelog
<!-- ### __WORK IN PROGRESS__ -->
### 0.4.0 (2023-03-18)
* (simatec) Dependencies updated
* (simatec) Repo updated

### 0.3.7 (2022-11-01)
* (simatec) Fix Axios Request
* (simatec) Dependencies updated

### 0.3.6 (2022-07-11)
* (simatec) Fix Request
* (simatec) timeout added
* (simatec) Dependencies updated

### 0.3.5 (2022-02-08)
* (simatec) Fix value types
* (simatec) Fix Axios Request
* (simatec) Dependencies updated

### 0.3.4 (2021-11-17)
* (simatec) Dependencies updated
* (simatec) test and release updated

### 0.3.3 (31.07.2021)
* (simatec) Bugfix async/await function

### 0.3.2 (28.07.2021)
* (simatec) Bugfix

### 0.3.1 (28.06.2021)
* (simatec) Date / time formatted

### 0.3.0 (24.06.2021)
* (simatec) code cleaning
* (simatec) added translate to system language for states
* (simatec) Bugfix Timestamp
* (simatec) value formating
* (simatec) Dependencies updated
* (simatec) name for states updated

### 0.2.3 
* (simatec) apiKey auto encrypted

### 0.2.2
* (simatec) apiKey encrypted
* (simatec) fix async function

### 0.2.1
* (simatec) Fix for latest Repo

### 0.2.0
* (simatec) jsonConfig for Admin5 added

### 0.1.0
* (simatec) First Beta

### 0.0.1
* (simatec) initial release

## License
MIT License

Copyright (c) 2021 - 2023 simatec

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