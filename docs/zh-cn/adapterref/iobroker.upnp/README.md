---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.upnp/README.md
title: ioBroker.upnp
hash: yHywnesAAKaEVoatbmYMHLrhaItU+NS1cx3YSr7F1ts=
---
![标识](../../../en/adapterref/iobroker.upnp/admin/upnp-discovery.png)

![安装数量](http://iobroker.live/badges/upnp-stable.svg)
![标识](http://img.shields.io/npm/v/iobroker.upnp.svg)
![图像](https://travis-ci.org/Jey-Cee/ioBroker.upnp.svg?branch=master)

# IoBroker.upnp
[德国文件](doc/de/DOCUMENTATION.md)

[英文文档](doc/en/DOCUMENTATION.md)

该适配器可帮助用户发现和控制网络中兼容 UPnP 的设备，从而更轻松地将媒体播放器和其他智能设备集成到 ioBroker 中。它提供了一个集中访问设备信息和基本控制功能的便捷平台。

<!-- 下一版本的占位符（位于行首）：

### **正在进行中** -->

## Changelog
### 1.1.9 (2026-04-04)
* fix: remove unused envelope variable (lint)
* fix: SOAP envelope operator-precedence bug in createMessage()

### 1.1.8 (2026-04-03)
* chore(deps): bump lodash from 4.17.23 to 4.18.1

### 1.1.7 (2026-04-02)
* Split documentation into separate files for German and English

### 1.1.6 (2026-04-02)
* Split documentation into separate files for German and English

### 1.1.5 (2026-04-01)
* fix lint issues

### 1.1.4 (2026-04-01)
* fix TypeError: Cannot read properties of undefined (reading 'deviceList')

### 1.1.3 (2026-04-01)
* fix TypeError: Cannot read properties of undefined (reading 'deviceList')

### 1.1.2 (2026-04-01)
* fix admin pinned to version 7.6.20

### 1.1.1 (2026-03-31)
* (iobroker-bot) Adapter requires node.js >= 20 now.
* (Jey Cee) Update dependencies
* (Jey Cee) GH actions
* (Jey Cee) replace packet xml2js, request and ip

### 1.1.0 (2024-09-30)
* (Jey Cee) Migrate config to JSONConfig 
* (Jey Cee) Fix issues found by adapter checker
* (Jey Cee) Use default test and release action

### 1.0.21 (2022-02-27)
* small fixes

### 1.0.20 (2021-12-04)
* (foxriver76) ensure compatibility with future controller versions
__requires controller v3.3.0__

### 1.0.19 (2021-05-28)
* (bluefox) added support for Admin5

### 1.0.17 (2021-02-21)
* (jey-cee) fix warning messages with js-controller 3.2.x [Github issue #63](https://github.com/iobroker-community-adapters/ioBroker.upnp/issues/63)

### 1.0.16 (2020-04-27)
* (jey-cee) fixes for js-controller 3

### 1.0.15 (2019-08-27)
* (jey-cee) make control of devices work again (including player controls)

### 1.0.14 (2019-08-04)
* (bluefox) Tried to fix error with player

### 1.0.11 (2019-03-07)
* (bluefox) Invalid characters in XML will be replaced

### 1.0.7 (2019-03-01)
Breaking change: naming was changed and command to poll has another name - "request"
* (bluefox) refactoring
* (bluefox) scheduling per action configurable from admin

### 0.3.9
* fix auto discover

### 0.3.8
* (jey-cee) changes for object name's
* (jey-cee) fix for empty USN
* (jey-cee) added simple media player controls

### 0.3.7
* (jey-cee) fixed auto discover

### 0.3.6
*(jey-cee) fixed problem with settings

### 0.3.5
* (jey-cee) added option in settings for disable auto discover

### 0.3.4
* (jey-cee) added Travis-CI Tests

### 0.3.3
* (jey-cee) try to fix bug that cause to crash the adapter when sending actions
* (jey-cee) added unsubscribe on subscription error
* (jey-cee) added sync between Arguments and the related State Variable
* (jey-cee) fixed bug when sending an action and there comes no answer

### 0.3.2
* (jey-cee) updated version number from 0.2.4 to 0.3.2

### 0.3.0
* (jey-cee) added native Argument_No for object type argument
* (jey-cee) changed state update handling for event messages, fix for A_ARG_TYPE states
* (jey-cee) added possibility for controling UPnP devices

### 0.2.4
* (jey-cee) updated npm package node-upnp-subscriptions to resolve max handler problem
* (jey-cee) added support for 2nd stage deviceList
* (jey-cee) bugfix: iobroker stops while updating a lot of objects
* (jey-cee) added handling for initial messages from devices

### 0.2.3
* (jey-cee) fixed Dead message handler
* (jey-cee) added Subscription to service (only event message handling)
* (jey-cee) when adapter stops Alive state is set to false and sid(subscription id) is cleared

### 0.2.2
* (jey-cee) added listener for Alive/Dead messages from devices
* (jey-cee) if new devices joining the network they will added automatically
* (jey-cee) replace whitespace chars in device id's on creation, because objects and sub-object with whitespace chars wasn't usable

### 0.2.1
* (jey-cee) bug fixing: corrected creation of native's and smaller Bugs

### 0.2.0
* (jey-cee) getting all xml data from UPnP devices

### 0.1.0
* (jey-cee) initial release

## License
The MIT License (MIT)

Copyright (c) 2016-2026 Jey Cee <iobroker@all-smart.net>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.