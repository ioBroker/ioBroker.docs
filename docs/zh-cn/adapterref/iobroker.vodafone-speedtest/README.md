---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vodafone-speedtest/README.md
title: ioBroker.vodafone-speedtest
hash: fCrOkIaGmkqjssySHbDUn9kxnmER4ltSmW20HgcInJI=
---
![商标](../../../en/adapterref/iobroker.vodafone-speedtest/admin/vodafone-speedtest.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.vodafone-speedtest.svg)
![下载](https://img.shields.io/npm/dm/iobroker.vodafone-speedtest.svg)
![安装数量（最新）](http://iobroker.live/badges/vodafone-speedtest-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/vodafone-speedtest-stable.svg)
![依赖状态](https://img.shields.io/david/peterbaumert/iobroker.vodafone-speedtest.svg)
![已知漏洞](https://snyk.io/test/github/peterbaumert/ioBroker.vodafone-speedtest/badge.svg)
![新产品管理](https://nodei.co/npm/iobroker.vodafone-speedtest.png?downloads=true)

# IoBroker.vodafone-speedtest
**此适配器使用服务 [Sentry.io](https://sentry.io) 自动向作为开发人员的我报告异常和代码错误以及新设备架构。** 更多详细信息见下文！

## IoBroker vodafone-speedtest 适配器
Vodafone.de 速度测试

实现与 https://speedtest.vodafone.de 相同的技术

## 什么是 Sentry.io 以及向该公司的服务器报告什么？
Sentry.io 是一项服务，供开发人员了解其应用程序中的错误。而这正是在这个适配器中实现的。

当适配器崩溃或发生其他代码错误时，此错误消息也会出现在 ioBroker 日志中，并提交给 Sentry。当您允许 iobroker GmbH 收集诊断数据时，您的安装 ID（这只是一个唯一 ID **没有**关于您的任何其他信息、电子邮件、姓名等）也包括在内。这允许 Sentry 对错误进行分组并显示受此类错误影响的唯一用户数量。所有这些都帮助我提供了基本上从不崩溃的无错误适配器。

## 免责声明
Vodafone 是 Vodafone GmbH 的商标。我绝不认可或隶属于 Vodafone GmbH 或任何关联的子公司、徽标或商标

## Changelog

### 0.0.7 (2021-05-21)
* Fixed some vulnerabilities in dev-dependencies
* Fixed js-controller 3* issues
* Fixed node 16 compatability

### 0.0.6 (2021-01-21)
* Added Sentry.io Integration

### 0.0.5 (2020-05-26)
* Added ping results
* Added calculated values by actual raw data

### 0.0.4 (2020-04-30)
* Changed Adapter start type to scheduled (reinstallation might be needed)
* Bug fixes and feedback implementation

### 0.0.3 (2020-04-24)
* Implemented feedback from Forum and github issue

### 0.0.2 (2020-04-19)
* Added actual settings in Admin interface
* first version ready for testing

### 0.0.1 (2020-04-18)
* (Peter Baumert) initial release

## License
MIT License

Copyright (c) 2021 Peter Baumert <ioBroker.vodafone-speedtest@outlook.com>

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