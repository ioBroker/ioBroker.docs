---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.batrium-bms/README.md
title: ioBroker.batrium-bms
hash: QpY2cEvyVWvd5vaLOq+X8bgRIVHAkmwkF1R7DnQpbrc=
---
![标识](../../../en/adapterref/iobroker.batrium-bms/admin/batrium-bms.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.batrium-bms.svg)
![下载](https://img.shields.io/npm/dm/iobroker.batrium-bms.svg)
![安装数量](https://iobroker.live/badges/batrium-bms-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/batrium-bms-stable.svg)
![NPM](https://nodei.co/npm/iobroker.batrium-bms.png?downloads=true)

# IoBroker.batrium-bms
![测试与发布](https://github.com/bembelstemmer/ioBroker.batrium-bms/workflows/Test%20and%20Release/badge.svg)
<!--
-->

## 适用于 ioBroker 的 batrium-bms 适配器
ioBroker 适配器，用于跟踪通过 UDP 发布的 Batrium BMS 指标。

!!!此适配器未获得Batrium官方支持！！！

此适配器基于 Batrium 官方的 WatchMonUdpListener 实现，地址为：https://github.com/Batrium/WatchMonUdpListener

目前消息支持功能仍然有限，将在后续版本中增加。

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.7.0 (2025-11-15)
* Drop of Node18 and adding of Node24 support
* Various Package Updates
* Migration of eslint from 8 to 9

### 0.6.0 (2025-03-27)
* Drop Support for Node v16
* Various Package Upgrades
* Increased min js-controller version to 5.0.19
* Increased min Admin version to 7.4.10

### 0.5.0 (2023-09-10)
* Various Package Upgrades (inc. Update to ioBroker Adapter lib v3)
* Adding of Tests for Node Version 20.x
* Fixed marking of properties writeable even if they're not
* Fixed wrong Naming of Object 5732.ShuntStatus
* Reworked Object Roles to better match their meaning (where meaning was known)

### 0.4.0 (2023-03-22)
* Added Message Type 4232 (Cell Status Full)

### 0.3.0 (2023-03-05)
* Added Message Type 415a (Cell Status Small)
* Added Configuration per Message Type
* Added Rate Limit function per Message Type to reduce load on ioBroker DB

### 0.2.1 (2023-02-04)
* Readded build folder

### 0.2.0 (2023-02-04)
* Minor Type Fixes
* Added Message Type 6831

### 0.1.0 (2023-02-03)
* Optimized Parser Structure
* Finished up Message Type 5732
* Finished up Message Type 3233

### 0.0.2 (2023-01-31)
* Initial Test Release

## License
MIT License

Copyright (c) 2025 Bembelstemmer <kontakt[at]it-amm[dot]de>

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