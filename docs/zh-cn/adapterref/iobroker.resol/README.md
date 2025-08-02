---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.resol/README.md
title: ioBroker.resol
hash: 9HCa9stLdL1IsFVVCVRtsPGj20vxrIdve7AmpWJjKZQ=
---
# IoBroker.resol
![标识](../../../en/adapterref/iobroker.resol/admin/resol.svg)

![安装数量（最新）](http://iobroker.live/badges/resol-installed.svg)
![NPM 版本](https://img.shields.io/npm/v/iobroker.resol.svg)
![安装数量（稳定）](http://iobroker.live/badges/resol-stable.svg)
![已知漏洞](https://snyk.io/test/github/Grizzelbee/ioBroker.resol/badge.svg)
![新平台](https://nodei.co/npm/iobroker.resol.svg?downloads=true)
![执照](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![下载](https://img.shields.io/npm/dm/iobroker.resol.svg)

[![CodeQL]（https://github.com/Grizzelbee/ioBroker.resol/actions/workflows/codeql-analysis.yml/badge.svg）](https://github.com/Grizzelbee/ioBroker.resol/actions/workflows/codeql-analysis.yml) [![测试与发布](https://github.com/Grizzelbee/ioBroker.resol/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/Grizzelbee/ioBroker.resol/actions/workflows/test-and-release.yml)

## 致谢
此适配器源自 myVbus 适配器，基于 DutchmanNL 和 pdbjjens 的工作。非常感谢他们两人的工作。
由于 pdbjjens 只想从 vbus 读取值，而有些人需要更好地控制他们的设备 - 因此产生了此适配器。
在这里，您可以控制 vbus 控制器。

## Resol VBus 的 ioBroker 适配器
该适配器将各种基于VBus的设备连接到支持各种连接类型的ioBroker。

&gt; 如果您喜欢这个适配器并考虑支持我<br/>&gt; [![使用 payPal 捐款](admin/paypal-donate-button.png)](https://www.paypal.com/donate/?hosted_button_id=SPUDTXGNG2MYG)

它使用了 Daniel Wippermann 提供的 JavaScript 库 resol-vbus。
如果您有兴趣深入了解，请访问 <https://github.com/danielwippermann/resol-vbus>。

＃＃ 特征
* 能够从各种 RESOL(R) VBus(R) 设备（最好是 DeltaSol(R) 系列的太阳能和系统控制器，包括内置热量计 (HQM)）读取测量数据，使用 DL3 或 DL2 数据记录器、KM2 通信模块、VBus/LAN 接口适配器或通过 TCP/IP 本地的串行/LAN 网关。
* 还支持使用 VBus/USB 串行接口适配器或通过 VBus.net(R) 使用 DLx/KMx 进行设备访问。
* 处理实时 VBus 数据流并使其按照 ioBroker 状态可用。
* 值会根据可配置的循环时间进行更新。
* 不支持读取或设置 VBus 设备配置参数。应使用 Resol 提供的工具来实现此目的，例如通过 VBus.net 或参数化工具 RPT。
* 由于 DL3 接口的限制，不支持读取 DL3 通道 0（直接连接到 DL3 设备的传感器）。

## 配置提示
* 连接类型的默认设置为 VBus/LAN，但即使是 VBus/LAN 也必须明确选择，否则不会建立连接。
* VBus/LAN、DL3、DL2、KM2 直接 LAN 访问的正确设置为：
* 连接类型：VBus/LAN 或 KM2 或 DL2 或 DL3
* 连接标识符：IP 地址（例如 192.168.178.188）或 FullyQualifiedHostName（例如 host1.example.com）
* VBus 密码：YourVBusPassword（默认：vbus）
* 连接端口：默认设置7053，请勿更改
* DL3 通道：仅与 DL3 相关（值 1-6，通道 0 无法读出）
* 更新间隔：测量值更新之间的时间（默认30秒）
* 通过 VBus.net 访问 DL3、DL2、KM2 的正确设置为：
* 连接类型：vbus.net
* 连接标识符：留空
* 连接端口：默认设置7053，请勿更改
* VBus 密码：YourVBusPassword（默认：vbus）
* DL3 通道：仅与 DL3 相关（值：1-6，无法读出通道 0）
* Via 标识符：您的 Via 标签（例如 d1234567890.vbus.io）- 前面不带 http://
* 更新间隔：测量值更新之间的时间（默认30秒）

###示例：
#### 通过 USB/串行连接
| 操作系统 | 连接设备 | 设备地址 | 端口 | DL3 通道 | Via 标签 |
|------------------|------------------|---------------------|------|-------------|---------|
| Windows | USB/串行 | COMx | | 无 | |
| Linux | | /dev/tty.usbserial/ | | 无 | |

#### 通过 LAN 连接
其中包括：

* 局域网
* KM2 设备
* DL2 设备
* DL3 设备（通道的选择很重要，不支持通道 0）
* 串行到 LAN 网关

| | 连接设备 | 设备地址 | 端口 | DL3 通道 | Via 标签 |
|---------|------------------------------|---------------------------|----------------|-------------------------------------|-------------|
| | 从列表中选择您的设备 | 设备的 IP 地址 | TCP 端口 | 要使用的 DL3 通道（如适用） | 留空 |
| 示例 | KM2 | 192.168.17x.xxx | 7053 (默认) | 无 | |
| 示例 | DL2 | 192.168.17x.xxx | 7053 (默认) | 无 | |
| 示例 | DL3 | 192.168.17x.xxx | 7053 (默认) | 频道 x | |

#### 通过 Resol 的 vbus.net 连接
您可以在 vbus.net 主页的“我的 VBus.net - 我的设备”下找到每个设备的个人 Via 标签。
最好从那里复制/粘贴 - **无需 http://**

| | 连接设备 | 设备地址 | 端口 | DL3 通道 | Via 标签 |
|-------------------|---------------------------|----------------|----------------|-------------|----------------------------------|
| | 从列表中选择 vbus.net | 留空 | TCP 端口 | 无 | 来自 resol vbus.net 的 Via 标签 |
| 示例 KM2 / DL2 | vbus.net | | 7053 (默认) | 无 | d01234567890.vbus.net |
| 示例 KM2 / DL2 | vbus.net | | 7053 (默认) | 无 | d01234567890.vbus.io |
| 示例 Dl3 | vbus.net | | 7053 (默认) | 频道 x | d01234567890.vbus.io |

#### 向 resol 设备发送命令
编辑您在安装目录“lib\resol-setup”中找到的控制器文件

{"dp": [{"dpName":"Pumpe1","type":"number","min":0,"max":2}, {"dpName":"Pumpe2","type":"number","min":0,"max":2}, {"dpName":"AutoRueckkuehl","type":"number","min":0,"max":1} ],

“fct”：[{“name”：“Pumpe1”，“cmd”：“Handbetrieb1”，“val”：“val”}，{“name”：“Pumpe2”，“cmd”：“Handbetrieb2”，“val”：“val”}，{“name”：“AutoRueckkuehl”，“cmds”：[{“cmd”：“ORueckkuehlung”，“val”：“val”}，{“cmd”：“OHolyCool”，“val”：“val”}]} ]}

安装适配器后将创建项目“dp”项目“fct”、“name”是 dpName 的链接。
示例：如果您更改对象“Pumpe1”中的值，则适配器会将命令“Handbetrieb1”连同该值一起发送到 resol 设备。
也可以使用多个命令。例如“AutoRueckkuehl”

如何添加新命令
例如设备 resol cs plus 的冷却

请注意 resol 对象中的设备 ID（8721）打开选择器文件 lib/resol-setup/Setup-Resol-Types.js 并根据设备标识符注意行 {“id”：8721，“setup”：“setup-resol-deltasol-cs-plus”，“data”：“resol-deltasol-cs-plus-110-data”}，

在目录 resol-vbus/src/configuration-optimizers 中打开文件 resol-deltasol-cs-plus-110-data.js 在此文件中搜索“ORueckkuehlung”

在目录 lib/resol-setup/ 中打开文件 setup-resol-deltasol-cs-plus.js 在“dp”中添加一行 {“dpName”：“Rueckkuehlung”，“type”：“number”，“min”：“0”，“max”：1} 在“fct”中添加一行 {“name”：“Rueckkuehlung”，“cmd”：“ORueckkuehlung”，“val”：“val”}，

该文件应如下所示

{"dp": [{"dpName":"Pumpe1","type":"number","min":0,"max":2}, {"dpName":"Pumpe2","type":"number","min":0,"max":2}, {"dpName":"Rueckkuehlung","type":"number","min":0,"max":1}, {"dpName":"AutoRueckkuehl","type":"number","min":0,"max":1} ],

“fct”：[{“name”：“Pumpe1”，“cmd”：“Handbetrieb1”，“val”：“val”}，{“name”：“Pumpe2”，“cmd”：“Handbetrieb2”，“val”：“val”}，{“name”：“Rueckkuehlung”，“cmd”：“ORueckkuehlung”，“val”：“val”}，{“name”：“AutoRueckkuehl”，“cmds”：[{“cmd”：“ORueckkuehlung”，“val”：“val”}，{“cmd”：“OHolyCool”，“val”：“val”}]} ]}

保存文件并重新启动适配器，您现在将发现一个新对象 Rueckkuehlung。

待办事项
## 法律声明
RESOL、VBus、VBus.net、DeltaSol 等是 RESOL - Elektronische Regelungen GmbH <https://www.resol.de/en> 的商标或注册商标

所有其他商标均为其各自所有者的财产。

## Sentry.io
此适配器使用 sentry.io 收集崩溃的详细信息并自动向作者报告。
[ioBroker.sentry 插件](https://github.com/ioBroker/plugin-sentry) 用于此目的。如果您不想用崩溃信息支持作者，请参阅[插件主页](https://github.com/ioBroker/plugin-sentry) 了解有关插件功能、收集哪些信息以及如何禁用它的详细信息。

## 版权
版权所有 (c) 2024 grizzelbee <open.source@hingsen.de>

## Changelog
### 1.5.0 (2024-10-01)
* (grizzelbee) Upd: Fixed some issues mentioned by adapter-checker

### 1.4.2 (2024-10-01)
* (grizzelbee) Upd: Internal update

### 1.4.1 (2024-10-01)
* (grizzelbee) Upd: Dependencies got updated
* (grizzelbee) Fix: Plugin-Sentry removed
* (grizzelbee) Upd: made release script working

### 1.4.0 (2024-07-xx)
* (grizzelbee) Upd: Dependencies got updated
* (grizzelbee) Upd: Translations got updated
* (grizzelbee) Fix: Finished work on new jsonConfig admin-UI
* (grizzelbee) New: Added new option for MX-Controllers to admin-UI
* (grizzelbee) New: Admin-UI now hides options which are invalid for the selected device.
* (gargano)    New: Integrated Actions for MX-Controller (V1 and V2)

### 1.3.0 (2022-11-01)
* (grizzelbee) Fix: [#106](https://github.com/Grizzelbee/ioBroker.resol/issues/106) Attempt to fix errors in log regarding DeltaSol-BX
* (grizzelbee) Fix: [#108](https://github.com/Grizzelbee/ioBroker.resol/issues/106) Attempt to fix errors in log regarding DeltaSol-SLT and others
* (grizzelbee) New: Moved Admin interface to jsonConfig 
* (grizzelbee) Upd: Dependencies got updated
* (grizzelbee) Upd: Translations got updated

### v1.2.0 (2022-05-16)
* (grizzelbee) New: [#106](https://github.com/Grizzelbee/ioBroker.resol/issues/106) Added support for DeltaSol-BX

### v1.1.6 (2022-05-04)
* (grizzelbee) Fix: [#103](https://github.com/Grizzelbee/ioBroker.resol/issues/103) Fixed support for Serial-to-LAN-Gateway connections (Disabled credentials handshake - which is not necessary over serial ports.)

### v1.1.5 (2022-04-29)
* (grizzelbee) New: [#96](https://github.com/Grizzelbee/ioBroker.resol/issues/96) Fixed Cosmo-Multi-2 support (Faking a DeltaSol-E now)

### v1.1.0 (2022-04-28)
* (grizzelbee) New: [#96](https://github.com/Grizzelbee/ioBroker.resol/issues/96) Added support for DeltaSol-E and improved support for Cosmo-Multi-2 controllers

### v1.0.0 (2022-04-25)
* (grizzelbee) New: [#94](https://github.com/Grizzelbee/ioBroker.resol/issues/94) Added support for Cosmo controllers (No Sensor connected = 888°C)
* (grizzelbee) Upd: Pushed version from 0.4.4 to v1.0.0 to be compliant to semver
* (grizzelbee) Upd: Dependencies got updated

### v0.4.4 (2022-03-17)
* (grizzelbee) New: Added donate button to config page and readme
* (grizzelbee) Upd: Dependencies got updated

### v0.4.3 (2022-02-08)
* (grizzelbee) Fix: fixed wrong state role "switch" and changed to "level"

### v0.4.2 (2022-01-05)
* (grizzelbee) Fix: Removed password encryption stuff from admin to avoid double encryption

### v0.4.1 (2022-01-05)
* (grizzelbee) Fix: switched action roles from "indicator" to "switch" to be compliant with ioBroker rules
* (grizzelbee) Fix: Removed password encryption stuff and added dependency Admin >=4.0.9
* (grizzelbee) Fix: Fixed a few code warnings
* (grizzelbee) Fix: Fixed: info.connection has been written w/o ACK 
* (grizzelbee) Upd: updated dependencies

### v0.4.0 (2021-11-08)
* (grizzelbee) Upd: updated dependencies
* (grizzelbee) New: Trying more than one time to connect when network isn't setup properly. E.g. on router startup.

### v0.3.3 (2021-11-04)
* (grizzelbee) Upd: updated dependencies
* (grizzelbee) Upd: Switched from adapter-type climate-control to energy

### v0.3.2 (2021-09-16)
* (grizzelbee) Upd: updated dependencies
* (grizzelbee) Fix: [#27](https://github.com/Grizzelbee/ioBroker.resol/issues/27) Fixed: State value to set for "resol.0.xxx.010221110010002220" has to be type "number" but received type "string" - it may be needed to delete datapoints manually
* (grizzelbee) Upd: set correct tier in io-package
* (grizzelbee) New: Writing value null when received value is <= -999 and >= 999. This is to avoid writing crap when no sensors are connected. 
* (grizzelbee) New: Making use of adapter internal decrypt function (req. at least js-controller >= 3.0)

### v0.3.1 (2021-05-07)
* (gargano)    Fix: wrong object types fixed according JS-Controller 3.x
* (gargano)    Fix: prevent setState if value = undefined
* (gargano)    Upd: Updated resol lib by Daniel Wippermann to v0.22.0
* (grizzelbee) New: Added sentry
* (grizzelbee) Fix: Made eslint happy
* (grizzelbee) Upd: updated dependencies

### v0.3.0 (2021-01-xx)
* (grizzelbee) Upd: Updated dependencies
* (grizzelbee) New: Log connection-losts as info

### v0.2.1 (2021-01-23)
* (gargano)    New: write function to resol device added

### v0.2.0 (2021-01-18)
* (grizzelbee) New: New Icon
* (grizzelbee) Upd: Update resol-Bus lib to V0.21.0 
* (grizzelbee) Upd: Security-Update to lodash lib 
* (grizzelbee) Upd: Reorganized configuration to get it more intuitive  
* (grizzelbee) Upd: Config-page translated via gulp
* (grizzelbee) New: Changed the way to configure access via vbus.net to be more intuitive
* (grizzelbee) New: Extended documentation
* (grizzelbee) Fix: Adapter doesn't crash on connection losts anymore

### v0.1.0 (2020-03-29)
* (grizzelbee) Fix: config page shows current settings now (not default anymore) **May raise the need to reenter the password!**
* (grizzelbee) Fix: "Connected" state is updated correctly now if connection is disrupted.
* (grizzelbee) New: Added Badge for latest(npm) version to readme
* (grizzelbee) Fix: removed default password from config to ensure it's encrypted on first config
* (grizzelbee) Fix: removed Force-ReInit
* (grizzelbee) Fix: sensor maintenance indicators are working booleans now
* (grizzelbee) New: added new activity indicator states for each relais.
* (grizzelbee) New: testing configuration to avoid start with invalid config

### v0.0.6
* (pdbjjens) alpha 6 release updated dependencies

### v0.0.5
* (pdbjjens) alpha 5 release improved type and role mapping of adapter values

### v0.0.4
* (pdbjjens) alpha 4 release updated dependency on resol-vbus library to 0.21.0

### v0.0.3
* (pdbjjens) alpha 3 release tested with DL3 over local LAN and VBus.net and DeltaSol SLT (0x1001) incl. HQM (0x1011)

### v0.0.2
* (pdbjjens) alpha 2 release tested with VBus/LAN, KM2, VBus.net and DeltaSol E (0x7721 & 0x7722), DeltaSol M (0x7311 & 0x716), DeltaSol CS Plus (0x2211), Oventrop RQXXL (0x7541)

### v0.0.1
* (pdbjjens) initial release tested only with VBus/USB (Serial) and DeltaSol(R) BS2009 (0x427B)

## License
MIT License

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