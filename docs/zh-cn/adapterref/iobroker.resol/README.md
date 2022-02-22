---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.resol/README.md
title: ioBroker.resol
hash: 5KDhA+LkQammqaj6e563W7RHzA1/Ce2QS3Ad3XVu6G8=
---
# IoBroker.resol
![标识](../../../en/adapterref/iobroker.resol/admin/resol.svg)

![安装数量（最新）](http://iobroker.live/badges/resol-installed.svg)
![NPM 版本](https://img.shields.io/npm/v/iobroker.resol.svg)
![安装数量（稳定）](http://iobroker.live/badges/resol-stable.svg)
![已知漏洞](https://snyk.io/test/github/Grizzelbee/ioBroker.resol/badge.svg)
![新PM](https://nodei.co/npm/iobroker.resol.svg?downloads=true)
![执照](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![下载](https://img.shields.io/npm/dm/iobroker.resol.svg)

[![CodeQL](https://github.com/Grizzelbee/ioBroker.resol/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Grizzelbee/ioBroker.resol/actions/workflows/codeql-analysis.yml)[![测试和发布](https://github.com/Grizzelbee/ioBroker.resol/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/Grizzelbee/ioBroker.resol/actions/workflows/test-and-release.yml)

## 学分
此适配器源自 myVbus 适配器，并基于 DutchmanNL 和 pdbjjens 的工作。非常感谢他们两人的工作。
由于 pdbjjens 只想从 vbus 读取值，并且对于某些人来说，需要更多地控制他们的设备 - 这个适配器被提升了。
在这里，您可以控制您的 vbus 控制器。

## 用于 Resol VBus 的 ioBroker 适配器
该适配器将各种基于 VBus 的设备连接到支持各种连接类型的 ioBroker。

它使用了由 Daniel Wippermann 提供的 JavaScript 库 resol-vbus。
如果您有兴趣深入了解，请访问 <https://github.com/danielwippermann/resol-vbus> 和 <https://www.npmjs.com/package/resol-vbus>。

＃＃ 特征
* 可以从各种 RESOL(R) VBus(R) 设备读取测量数据 - 最好是 DeltaSol(R) 系列的太阳能和系统控制器，包括内置热量计 (HQM) - 使用 DL3 或 DL2 数据记录器 KM2通信模块、VBus/LAN 接口适配器或本地通过 TCP/IP 的串行/LAN 网关。
* 还支持使用 VBus/USB 串行接口适配器或使用 DLx/KMx 通过 VBus.net(R) 访问设备。
* 处理实时 VBus 数据流，并使其作为 ioBroker 状态可用。
* 使用可配置的循环时间更新值。
* 不支持读取或设置 VBus 设备配置参数。应使用 Resol 提供的工具，例如通过 VBus.net 或参数化工具 RPT。
* 由于 DL3 接口的限制，不支持读取 DL3 通道 0（传感器直接连接到 DL3 设备）。

##哨兵.io
该适配器使用 sentry.io 收集有关崩溃的详细信息并将其自动报告给作者。
[ioBroker.sentry 插件](https://github.com/ioBroker/plugin-sentry)用于它。请参阅 [插件主页](https://github.com/ioBroker/plugin-sentry) 了解有关插件的功能、收集哪些信息以及如何禁用它的详细信息，如果您不喜欢用您的崩溃信息来支持作者。

## 配置提示
* 连接类型的默认设置是 VBus/LAN，但即使是 VBus/LAN 也必须明确选择，否则将无法建立连接。
* VBus/LAN、DL3、DL2、KM2 的直接 LAN 访问的正确设置是：
  * 连接类型：VBus/LAN 或 KM2 或 DL2 或 DL3
  * 连接标识符：IP 地址（例如 192.168.178.188）或 FullyQualifiedHostName（例如 host1.example.com）
  * VBus 密码：YourVBusPassword（默认值：vbus）
  * 连接端口：默认设置 7053 不应更改
  * DL3 通道：仅与 DL3 相关（值 1-6，通道 0 无法读出）
  * 更新间隔：测量值更新之间的时间（默认 30 秒）
* 通过 VBus.net 访问 DL3、DL2、KM2 的正确设置是：
  * 连接类型：vbus.net
  * 连接标识符：留空
  * 连接端口：默认设置 7053 不应更改
  * VBus 密码：YourVBusPassword（默认值：vbus）
  * DL3 通道：仅与 DL3 相关（值：1-6，通道 0 无法读出）
  * 通过标识符：您的 Via-tag（例如 d1234567890.vbus.io） - 之前没有 http://
  * 更新间隔：测量值更新之间的时间（默认30s）

＃＃＃ 例子：
#### 通过 USB/串口连接
|操作系统 |连接器 |设备地址 |港口 | DL3-通道 |通过标签 |
|------------------|------------------|---------------------|------|-------------|---------|
|窗户 | USB/串口 |组合 | |无 | |
| Linux | | /dev/tty.usbserial/ | |无 | |

#### 局域网连接
这包括：

  * 局域网
  * KM2 设备
  * DL2 设备
  * DL3 设备（通道选择很重要，不支持通道 0）
  * 串行到 LAN 网关

| |连接器 |设备地址 |港口 | DL3-通道 |通过标签 |
|---------|------------------------------|---------------------------|----------------|-------------------------------------|-------------|
| |从列表中选择您的设备 |您设备的 IP 地址 | TCP 端口 |要使用的 DL3 频道（如果适用） |留空 |
|示例 |公里2 | 192.168.17x.xxx | 7053（默认）|无 | |
|示例 | DL2 | 192.168.17x.xxx | 7053（默认）|无 | |
|示例 | DL3 | 192.168.17x.xxx | 7053（默认）|频道 x | |

#### Resol 通过 vbus.net 连接
您可以在 vbus.net 主页的以下位置找到您的个人设备 Via-tag：我的 VBus.net - 我的设备。
最好是从那里复制/粘贴它 - **没有 http://**

| |连接器 |设备地址 |港口 | DL3-通道 |通过标签 |
|-------------------|---------------------------|----------------|----------------|-------------|----------------------------------|
| |从列表中选择 vbus.net |留空 | TCP 端口 |无 |您来自 resol vbus.net 的 Via-tag |
|示例 KM2 / DL2 | vbus.net | | 7053（默认）|无 | d01234567890.vbus.net |
|示例 KM2 / DL2 | vbus.net | | 7053（默认）|无 | d01234567890.vbus.io |
|示例 Dl3 | vbus.net | | 7053（默认）|频道 x | d01234567890.vbus.io |

#### 向解析设备发送命令
编辑您将在安装目录“lib\resol-setup”中找到的控制器文件

{"dp": [{"dpName":"Pumpe1","type":"number","min":0,"max":2}, {"dpName":"Pumpe2","type":" number","min":0,"max":2}, {"dpName":"AutoRueckkuehl","type":"number","min":0,"max":1} ],

"fct": [{"name":"Pumpe1","cmd":"Handbetrieb1","val":"val"}, {"name":"Pumpe2","cmd":"Handbetrieb2","val ":"val"}, {"name":"AutoRueckkuehl","cmds":[{"cmd":"ORueckkuehlung","val":"val"},{"cmd":"OHolyCool","val ":"val"}]} ]}

安装适配器后将创建项目“dp”。项目“fct”，“name”有dpName的链接。
示例：如果您更改对象“Pumpe1”中的值，则适配器将带有该值的命令“Handbetrieb1”发送到 resol 设备。
也可以使用多个命令。例如。 “AutoRueckkuehl”

####如何添加新命令
例如设备 resol cs plus 的冷却

请注意 resol 对象中的设备 ID (8721) 打开选择器文件 lib/resol-setup/Setup-Resol-Types.js 并注意根据设备标识符 {"id":8721,"setup":" 的行setup-resol-deltasol-cs-plus","data":"resol-deltasol-cs-plus-110-data"},

在 resol-vbus/src/configuration-optimizers 目录中打开文件 resol-deltasol-cs-plus-110-data.js 在此文件中搜索“ORueckkuehlung”

打开目录 lib/resol-setup/ 中的 setup-resol-deltasol-cs-plus.js 文件在 "dp" {"dpName":"Rueckkuehlung","type":"number","min" 中添加一行： 0,"max":1} 在"fct"中添加一行 {"name":"Rueckkuehlung","cmd":"ORueckkuehlung","val":"val"},

该文件应如下所示

{"dp": [{"dpName":"Pumpe1","type":"number","min":0,"max":2}, {"dpName":"Pumpe2","type":" number","min":0,"max":2}, {"dpName":"Rueckkuehlung","type":"number","min":0,"max":1}, {"dpName" :"AutoRueckkuehl","type":"number","min":0,"max":1} ],

"fct": [{"name":"Pumpe1","cmd":"Handbetrieb1","val":"val"}, {"name":"Pumpe2","cmd":"Handbetrieb2","val ":"val"}, {"name":"Rueckkuehlung","cmd":"ORueckkuehlung","val":"val"}, {"name":"AutoRueckkuehl","cmds":[{"cmd ":"ORueckkuehlung","val":"val"},{"cmd":"OHolyCool","val":"val"}]} ]}

保存文件并重新启动适配器，您会发现现在有一个新对象 Rueckkuehlung。

＃＃ 去做
＃＃ 法律声明
RESOL、VBus、VBus.net、DeltaSol 和其他是 RESOL - Elektronische Regelungen GmbH <https://www.resol.de/en> 的商标或注册商标

所有其他商标均为其各自所有者的财产。

##版权
版权所有 (c) 2022 grizzelbee <open.source@hingsen.de>

## Changelog

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