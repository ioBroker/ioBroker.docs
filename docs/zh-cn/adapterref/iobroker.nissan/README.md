---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.nissan/README.md
title: ioBroker.nissan
hash: FbxmhAnuLWz2syQPO2VGYuM2z74lmRVrTUd5kZrMjuQ=
---
![标识](../../../en/adapterref/iobroker.nissan/admin/nissan.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.nissan.svg)
![下载](https://img.shields.io/npm/dm/iobroker.nissan.svg)
![安装数量（最新）](https://iobroker.live/badges/nissan-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/nissan-stable.svg)
![依赖状态](https://img.shields.io/david/TA2k/iobroker.nissan.svg)
![新平台](https://nodei.co/npm/iobroker.nissan.png?downloads=true)

# IoBroker.nissan
**测试：**![测试与发布](https://github.com/TA2k/ioBroker.nissan/workflows/Test%20and%20Release/badge.svg)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**\ 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!\ 从 js-controller 3.0 开始使用 Sentry 报告。

## 适用于 ioBroker 的日产适配器
使用日产适配器，您可以向日产汽车索取最新数据，显示当前电池和充电状态、当前的气候控制状态、启动或停止气候控制以及远程开始充电。

[日产 Connect/应用程序信息](https://www.nissan.de/kunden/nissan-connect-apps.html)

## 论坛
欢迎关注德语[iobroker 论坛](https://forum.iobroker.net/topic/46700/test-adapter-nissan-v-0-0-x)中的讨论

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (bolliy) Dependency and configuration updates
- (bolliy) Added Admin 5 configuration
- (bolliy) ConnectEV: Update status before reading cachedeStatus
- (bolliy) improve State roles and types

### 0.1.2 (2024-05-31)

- Refresh Token fix

### 0.1.1 (2024-05-20)

- Login fixed.

### 0.1.0 (2024-05-18)

- login fixed

### 0.0.2

- (TA2k) initial release

## License

MIT License

Copyright (c) 2021-2024 TA2k <tombox2020@gmail.com>

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