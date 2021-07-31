---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.uv-protect/README.md
title: ioBroker.uv-protect
hash: TBTR4bXR4tlxEmBan4NHvnFreUDxvOBPdQY2zMnGLFE=
---
![标识](../../../en/adapterref/iobroker.uv-protect/admin/uv-protect.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.uv-protect.svg)
![下载](https://img.shields.io/npm/dm/iobroker.uv-protect.svg)
![安装数量（最新）](http://iobroker.live/badges/uv-protect-installed.svg)
![依赖状态](https://img.shields.io/david/simatec/iobroker.uv-protect.svg)
![已知漏洞](https://snyk.io/test/github/simatec/ioBroker.uv-protect/badge.svg)
![新产品管理](https://nodei.co/npm/iobroker.uv-protect.png?downloads=true)
![安装数量（稳定）](http://iobroker.live/badges/uv-protect-stable.svg)

# IoBroker.uv-protect
![测试和发布](https://github.com/simatec/ioBroker.uv-protect/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的紫外线保护适配器
来自 openUV-API 的紫外线保护

**************************************************************************************************************

### 什么是 Sentry.io 以及向该公司的服务器报告什么？
Sentry.io 是一项服务，供开发人员从他们的应用程序中获取有关错误的概述。而这正是在这个适配器中实现的。

当适配器崩溃或发生其他代码错误时，此错误消息也会出现在 ioBroker 日志中，并提交给 Sentry。当您允许 iobroker GmbH 收集诊断数据时，您的安装 ID（这只是一个唯一 ID **没有**关于您、电子邮件、姓名等的任何其他信息）也包括在内。这允许 Sentry 对错误进行分组并显示受此类错误影响的唯一用户数量。所有这些都帮助我提供基本上从不崩溃的无错误适配器。

**************************************************************************************************************

**如果您喜欢，请考虑捐赠：**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=Q4EEXQ6U96ZTQ&source=url)

**************************************************************************************************************

## Changelog
<!-- ### __WORK IN PROGRESS__ -->

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

Copyright (c) 2021 simatec

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