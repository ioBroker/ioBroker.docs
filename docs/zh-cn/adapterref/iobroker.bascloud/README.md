---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.bascloud/README.md
title: ioBroker.bascloud
hash: dDBma9R9IqeGgtuWbHoicVotjwZ3PvMKAdk2THgdVJc=
---
![标识](../../../en/adapterref/iobroker.bascloud/admin/bascloud.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.bascloud.svg)
![下载](https://img.shields.io/npm/dm/iobroker.bascloud.svg)
![安装数量](https://iobroker.live/badges/bascloud-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/bascloud-stable.svg)
![新平台](https://nodei.co/npm/iobroker.bascloud.png?downloads=true)

# IoBroker.bascloud
![测试与发布](https://github.com/BAScloud/ioBroker.bascloud/workflows/Test%20and%20Release/badge.svg)

## BAScloud 适配器适用于 ioBroker
[基础云](https://bascloud.net/) 是一个安全的平台，用于跨物业联网和存储建筑信息。除了历史和当前测量值以及数据点的一般信息外，它还将建筑的主数据集中存储在私有云中。

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 0.4.0 (2024-07-15)

- (Yanick) fixes from feedback
- (Yanick) upgrade js-controller and admin dependency
- (Yanick) filter invalid characters
- (Yanick) fix various crashes and timeouts
- (Yanick) add translations to all labels
- (Yanick) set correct types and values
- (Yanick) add testing for windows and macos

### 0.3.0 (2024-06-05)

- (Yanick) always send function
- (Yanick) add function to send on start

### 0.2.0 (2024-06-04)

- (Yanick) fixes for automated adapter testing

### 0.1.2 (2024-06-04)

- (Yanick) fix for 0 values
- (Yanick) translation updates

### 0.1.1 (2024-06-03)

- (Yanick) small fixes, add build folder

### 0.1.0 (2024-06-03)

- (Yanick) initial release

## License

MIT License

Copyright (c) 2024 Yanick Stephan <stephan@bascloud.net>

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