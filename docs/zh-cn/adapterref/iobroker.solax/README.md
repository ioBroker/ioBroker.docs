---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.solax/README.md
title: ioBroker.solax
hash: fQlkfIsor5vQ4oPOyB4tcFzKV+WtKocUT+QyxRwkDjc=
---
![标识](../../../en/adapterref/iobroker.solax/admin/solax.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.solax.svg)
![下载](https://img.shields.io/npm/dm/iobroker.solax.svg)
![安装数量（最新）](http://iobroker.live/badges/solax-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/solax-stable.svg)
![已知漏洞](https://snyk.io/test/github/simatec/ioBroker.solax/badge.svg)
![执照](https://img.shields.io/github/license/simatec/ioBroker.solax?style=flat)
![捐](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)

# IoBroker.solax
![测试和发布](https://github.com/simatec/ioBroker.solax/workflows/Test%20and%20Release/badge.svg)

**************************************************************************************************************

**如果你喜欢它，请考虑捐赠：**

[![贝宝](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=Q4EEXQ6U96ZTQ&source=url)

**************************************************************************************************************

## 用于 ioBroker 的 solax 适配器
Solax 逆变器 API 云连接

该适配器将来自制造商 Solax 的逆变器数据调用到 iobroker。

为此，您需要一个具有 Solax 的帐户、您的令牌 ID 和您的 WiFi 模块的序列号。

### 你的 API 令牌
<span><img src="docs/en/img/solax_api.png"></span>

###你的序列号
<span><img src="docs/en/img/wifi-stick.png"></span>

**************************************************************************************************************

### Sentry.io 是什么以及向该公司的服务器报告什么？
Sentry.io 是一项服务，供开发人员从他们的应用程序中获取有关错误的概述。而这正是在这个适配器中实现的。

当适配器崩溃或发生其他代码错误时，也会出现在 ioBroker 日志中的此错误消息将提交给 Sentry。当您允许 iobroker GmbH 收集诊断数据时，还包括您的安装 ID（这只是一个唯一 ID **没有**关于您的任何其他信息、电子邮件、姓名等）。这允许 Sentry 对错误进行分组并显示有多少唯一用户受到此类错误的影响。所有这些都有助于我提供基本上不会崩溃的无错误适配器。

**************************************************************************************************************

## Changelog
<!-- ### __WORK IN PROGRESS__ -->

### __WORK IN PROGRESS__
* (simatec) local request for Wifi Pocket Stick added
* (simatec) Dependencies updated
* (simatec) test and release updated
* (simatec) Number of days of history data added
* (simatec) Expert-Mode added
* (simatec) Docu updated
* (simatec) Bugfixes

### 0.3.7 (2021-11-17)
* (simatec) Dependencies updated
* (simatec) test and release updated

### 0.3.6 (2021-08-04)
* (simatec) deps fixed

### 0.3.5 (31.07.2021)
* (simatec) await/async functions fixed

### 0.3.4 (30.07.2021)
* (simatec) code cleanig
* (simatec) await functions fixed

### 0.3.3 (29.07.2021)
* (simatec) Formatted objects
* (simatec) await functions fixed
* (simatec) query interval changed
* (simatec) Dependencies updated

### 0.3.2 (28.07.2021)
* (simatec) fix for latest repo

### 0.3.1 (11.06.2021)
* (simatec) fix for latest repo
* (simatec) API-Token encrypted

### 0.3.0 (09.06.2021)
* (simatec) state settings changed
* (simatec) sentry plugin added
* (simatec) readme added
* (simatec) sunposition added
* (simatec) nightmode added

### 0.2.0 (07.06.2021)
* (simatec) powerdc 1-4 added
* (simatec) battPower added
* (simatec) many small bugfixes

### 0.1.1 (02.06.2021)
* (simatec) small Bugfixes

### 0.1.0 (02.06.2021)
* (simatec) first beta

## License
MIT License

Copyright (c) 2021 - 2022 simatec

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