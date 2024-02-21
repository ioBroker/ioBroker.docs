---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.shelly?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.shelly?label=npm%20downloads&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.shelly?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.shelly?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/iobroker-community-adapters/iobroker.shelly?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/iobroker-community-adapters/iobroker.shelly?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/iobroker.shelly?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/iobroker-community-adapters/iobroker.shelly?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/iobroker-community-adapters/iobroker.shelly?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/actions/workflow/status/iobroker-community-adapters/iobroker.shelly/test-and-release.yml?branch=master&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.shelly.svg?color=red&label=beta
BADGE-Stable: http://iobroker.live/badges/shelly-stable.svg
BADGE-Installed: http://iobroker.live/badges/shelly-installed.svg
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"},"de/adapterref/iobroker.shelly/faq.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/faq.md"},"de/adapterref/iobroker.shelly/debug.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/debug.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.shelly/README.md
title: ioBroker.shelly
hash: 19niRJHfgJIH8WW0ozVZ9QImrj5R2m5bwQMvj3GKb6U=
---
![标识](../../../de/admin/shelly.png)

# IoBroker.shelly
这是德语文档 - [🇺🇸 德语版](../en/README.md)

＃＃ 目录
- [MQTT协议](protocol-mqtt.md)
- [CoAP/CoIoT 协议](protocol-coap.md)
- [限制登录](restricted-login.md)
- [状态更改](state-changes.md)
- [调试](debug.md)
- [常见问题解答](faq.md)

＃＃ 要求
1.Node.js 16.0（或更高版本）
2.js-controller 3.3.22（或更高版本）
4. 管理适配器 6.0.0（或更高版本）

## 设备代数
有关更多信息，请参阅*支持的设备*。

- **Gen1**：ESP8266 设备，[CoAP/CoIoT](protocol-coap.md) 或 [MQTT](protocol-mqtt.md)
- **Gen2**：ESP32 设备，[MQTT](协议-mqtt.md)

＃＃ 一般来说
适配器可以通过 MQTT（推荐）或 CoAP/CoIoT 与设备通信。

- 适配器的默认模式是MQTT（更多信息请参见[文档](protocol-mqtt.md)）
- CoAP/CoIoT 仅与 Gen1 设备兼容！
- **如果要集成Gen2设备，必须配置MQTT！**

问题？首先看[常问问题](faq.md)！

![iobroker_general](../../../de/adapterref/iobroker.shelly/img/iobroker_general.png)

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 6.8.0 (2024-02-17)

* (klein0r) Updated BLE script to 0.2 (new shelly motion firmware)
* (klein0r) Updated Shelly i3 number limits
* (klein0r) Added screenshots to instance configuration

### 6.7.0 (2023-12-22)

* (klein0r) Updated handling of ble payloads
* (D1gitaldad) Added Shelly Wall Display

### 6.6.1 (2023-10-20)

* (klein0r) Fixed stop reason for Shelly 2.5 / Shelly 2
* (klein0r) Added humidity of Shelly Plus Addon
* (klein0r) Not all devices have external power

### 6.6.0 (2023-10-17)

* (klein0r) Added BLE devices as states to `shelly.0.ble.*` (Shelly Scripting required)

### 6.5.0 (2023-10-17)

* (klein0r) Added Shelly Plus Smoke
* (klein0r) Added Shelly Bluetooth Low Energy Gateway
* (theimo1221) More Shelly TRV Datapoints

## License

The MIT License (MIT)

Copyright (c) 2018-2024 Thorsten Stueben <thorsten@stueben.de>,
                        Apollon77 <iobroker@fischer-ka.de> and
                        Matthias Kleine <info@haus-automatisierung.com>

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