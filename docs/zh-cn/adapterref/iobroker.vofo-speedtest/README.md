---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vofo-speedtest/README.md
title: ioBroker.vofo-speedtest
hash: 7TIB/taVtq7D8Ws6DGCOa7cCjYfuEGuTjyDUlX0Bi4k=
---
![标识](../../../en/adapterref/iobroker.vofo-speedtest/admin/vofo-speedtest.png)

![安装数量（最新）](http://iobroker.live/badges/vofo-speedtest-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/vofo-speedtest-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.vofo-speedtest.svg)
![下载](https://img.shields.io/npm/dm/iobroker.vofo-speedtest.svg)
![新PM](https://nodei.co/npm/iobroker.vofo-speedtest.png?downloads=true)

# IoBroker.vofo-speedtest
![测试和发布](https://github.com/peterbaumert/iobroker.vofo-speedtest/workflows/Test%20and%20Release/badge.svg)

**此适配器使用服务[哨兵.io](https://sentry.io)自动向我作为开发者报告异常和代码错误以及新的设备架构。**更多细节见下文！

## 用于 ioBroker 的 vofo-speedtest 适配器
Vodafone.de 的速度测试

实现与 https://speedtest.vodafone.de 相同的技术

## Sentry.io 是什么以及向该公司的服务器报告什么？
Sentry.io 是一项服务，供开发人员从他们的应用程序中获取有关错误的概述。而这正是在这个适配器中实现的。

当适配器崩溃或发生其他代码错误时，也会出现在 ioBroker 日志中的此错误消息将提交给 Sentry。当您允许 iobroker GmbH 收集诊断数据时，还包括您的安装 ID（这只是一个唯一 ID **没有**关于您的任何其他信息、电子邮件、姓名等）。这允许 Sentry 对错误进行分组并显示有多少唯一用户受到此类错误的影响。所有这些都帮助我提供了基本上不会崩溃的无错误适配器。

## 免责声明
Vodafone 是 Vodafone GmbH 的商标。我绝不被 Vodafone GmbH 或任何相关子公司、徽标或商标认可或附属于

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.0.13 (2022-06-06)
* some more "already running" fixes

### 0.0.12 (2022-05-28)
* rerelease for 0.0.11 because of missing version in io-package.json

### 0.0.11 (2022-05-27)
* updating dependencies
* adding some timeouts trying to fix "already running with pid"
* fix extracting API key from js-code (thanks Zwer2k) [#112][pr112]

### 0.0.10 (2022-01-07)
* Fix version numbers

### 0.0.9 (2022-01-03)
* Fix to work with new Vodafone Endpoint

### 0.0.8 (2021-07-01)
* Renamed Adapter due to legal reasons
* Fixed some dependencies

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

Copyright (c) 2020-2022 Peter Baumert

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


[pr112]: https://github.com/peterbaumert/ioBroker.vofo-speedtest/pull/112