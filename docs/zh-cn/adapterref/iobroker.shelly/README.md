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
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/ble-devices.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/ble-devices.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"},"de/adapterref/iobroker.shelly/faq.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/faq.md"},"de/adapterref/iobroker.shelly/debug.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/debug.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.shelly/README.md
title: ioBroker.shelly
hash: ZIcQ4W5pvkCGSwHMt+eGMWWcpf56Ny0hcz9OTgJKNtE=
---
![标识](../../../de/admin/shelly.png)

# IoBroker.shelly
这是德语文档 - [🇺🇸 英文版](../en/README.md)

＃＃ 目录
- [设备管理器](devicemanager.md)
- [MQTT 协议](protocol-mqtt.md)
- [CoAP/CoIoT 协议](protocol-coap.md)
- [BLE 设备](ble-devices.md)
- [受限登录](restricted-login.md)
- [状态变更](state-changes.md)
- [调试](debug.md)
- [常见问题解答](faq.md)

＃＃ 要求
1. Node.js 22（或更高版本）
2. js-controller 6.0.11（或更高版本）
3. 管理适配器 7.8.20（或更高版本）

## 设备世代
有关更多信息，请参阅[*支持的设备*](../../README.md#supported-devices)。

- **第一代**：ESP8266 设备，[CoAP/CoIoT](protocol-coap.md) 或 [MQTT](protocol-mqtt.md)
- **第二代及以上**：ESP32 设备，[MQTT](protocol-mqtt.md)

＃＃ 一般来说
该适配器可以通过 MQTT（推荐）或 CoAP/CoIoT 与设备通信。

- 该适配器的默认模式为 MQTT（更多信息请参见[文档](protocol-mqtt.md)）
- CoAP/CoIoT 仅兼容第一代设备！
- **如果要集成第二代设备，则必须配置 MQTT！**

有问题？请先查看[常问问题](faq.md)！

![iobroker_general](../../../de/adapterref/iobroker.shelly/img/iobroker_general.png)

＃＃ 特征
该适配器已集成到 ioBroker 设备管理器中。更多信息请参见 [设备管理器文档](devicemanager.md)。

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 11.0.0-alpha.15 (2026-05-10)
- (@copilot) Added Shelly Dimmer 0/1-10V PM Gen4 (shelly0110dimg4).
- (@copilot) Added HiluX DS8 by Shelly (hiluxds8)
- (@copilot) Added Shelly EM Gen4 (shellyemg4)
- (@mcm1957) Adapter requires node.js >= 22, js-controller >= 6.0.11 and admin >= 7.8.20 now.
- (@GermanBluefox) Device manager has been added providing info and control of devices and provisioning.
- (@mcm1957) IMPORTANT: Please read changelog at README.md listing more information.

### 11.0.0 additional information 
- (@mcm1957) Added Shelly Presence Gen 4
- (@mcm1957) Added Shelly Cury
- (@GermanBluefox) Added support for Device manager: info and control of devices and provisioning
- (@GermanBluefox) Added detection of new devices in the background
- (@mcm1957) Some missing states added at illuminance component
- (@mcm1957) DISABLE all PLUG_UI functionality due to unrecoverable HW faults.
- (@mcm1957) Dependencies have been updated

### 10.6.1 (2026-02-23)
- (HGlab01) OnUnload handling has been improved. [#1279]
- (@mcm1957) shellypill: missing input 202 has been added, nonexisting analog input has been removed.

### 10.6.0 (2026-02-08)
* (@mcm1957) The-Pill-By-Shelly (shellypill) has been added. [#1232]
* (@mcm1957) Shelly EM mini Gen 4 (shellyemminimg4) and Plug M Gen 3 (shellyplugmg3) have been added. [#1327,#1332]
* (@mcm1957) Shelly BLU H&T Display ZB support for light attribute has been added. [#1230]
* (@mcm1957) Support for favorites for Gen 2+ devices with cover support has been added. [#1001]
* (@mcm1957) Power metering support has been added to RGB and RGBW components. [#1339]
* (@mcm1957) FrankEver Smart Watervalve (watervalve) has been added. [#1341]
* (@mcm1957) LinkedGo ST1820 (st1820) has been added. [#1257]
* (@mcm1957) Dependencies have been updated

### 10.5.2 (2025-12-28)
* (@mcm1957) Monophase profile support has been fixed for shellypro3em and shellypro3em400.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

The MIT License (MIT)


Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2018-2025 Thorsten Stueben <thorsten@stueben.de>,
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