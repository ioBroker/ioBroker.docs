---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.myvbus/README.md
title: ioBroker.myvbus
hash: vrblLAmPDLheq6IrG8M5j1mev6UNtfmV+UTYNM4yR74=
---
# IoBroker.myvbus
![商标](../../../en/adapterref/iobroker.myvbus/admin/myvbus.png)

![安装数量（最新）](http://iobroker.live/badges/myvbus-installed.svg)
![下载](https://img.shields.io/npm/dm/iobroker.myvbus.svg)
![安装数量（稳定）](http://iobroker.live/badges/myvbus-stable.svg)
![NPM 版本](https://img.shields.io/npm/v/iobroker.myvbus.svg)
![依赖状态](https://img.shields.io/david/iobroker-community-adapters/iobroker.myvbus.svg)
![已知漏洞](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.myvbus/badge.svg)
![新产品管理](https://nodei.co/npm/iobroker.myvbus.png?downloads=true)
![特拉维斯CI](http://img.shields.io/travis/iobroker-community-adapters/ioBroker.myvbus/master.svg)

## Resol VBus ioBroker 适配器
该适配器使用 resol-vbus 将 ioBroker 连接到各种基于 VBus 的设备，resol-vbus 是一个用于获取 RESOL VBus 数据的 JavaScript 库，由 Daniel Wippermann 提供。

<https://github.com/danielwippermann/resol-vbus>

<https://www.npmjs.com/package/resol-vbus>

＃＃ 特征
* 允许从各种 RESOL(R) VBus(R) 设备读取测量数据 - 最好是来自 DeltaSol(R) 系列的太阳能和系统控制器，包括内置热量计 (HQM) - 使用 DL3 或 DL2 数据记录器，KM2通信模块、VBus/LAN 接口适配器或本地通过 TCP/IP 的串行/LAN 网关。
* 还支持使用 VBus/USB 串行接口适配器或使用 DLx/KMx 通过 VBus.net(R) 访问设备。
* 处理实时 VBus 数据流并使它们作为 ioBroker 状态可用。
* 使用可配置的循环时间更新值。
* 不支持读取或设置 VBus 设备配置参数。为此，应使用 Resol 提供的工具，例如通过 VBus.net 或参数化工具 RPT。
* 由于 DL3 接口的限制，不支持读取 DL3 通道 0（传感器直接连接到 DL3 设备）。

## 配置提示
* 连接类型的默认设置为VBus/LAN，但即使是VBus/LAN 也必须明确选择，否则将无法建立连接。
* VBus/LAN、DL3、DL2、KM2直接LAN接入的正确设置是：
  * 连接类型：VBus/LAN 或 KM2 或 DL2 或 DL3
  *连接标识符：IP地址（例如192.168.178.188）或FullyQualifiedHostName（例如host1.example.com）
  * VBus 密码：YourVBusPassword（默认：vbus）
  * 连接端口：默认设置 7053 不应更改
  * DL3 通道：仅与 DL3 相关（值 1-6，通道 0 无法读出）
  * 更新间隔：测量值更新间隔时间（默认30s）
* 通过 VBus.net 访问 DL3、DL2、KM2 的正确设置是：
  * 连接类型：DL3 或 DL2 或 KM2
  * 连接标识符：vbus.net（或 vbus.io）——都没有 http:// 和 Via 标识符！
  * 连接端口：默认设置 7053 不应更改
  * VBus 密码：YourVBusPassword（默认：vbus）
  * DL3 通道：仅与 DL3 相关（值：1-6，通道 0 无法读出）
  * 通过标识符：YourViaIdentifier（例如 d1234567890） - 前面没有 http:// 或后面没有 .vbus.io
  * 更新间隔：测量值更新的时间间隔（默认30s）

＃＃ 法律声明
RESOL、VBus、VBus.net、DeltaSol 和其他是 RESOL - Elektronische Regelungen GmbH <https://www.resol.de/en> 的商标或注册商标

所有其他商标均为其各自所有者的财产。
作者不以任何方式获得 RESOL GmbH 或其任何关联子公司、徽标或商标的认可或附属。

## Changelog
### 0.1.1 (2021-05-18)
* Fixes for supporting js-controller >=3.2.x


### 0.1.0
* (grizzelbee) Fix: config page shows current settings now (not default anymore)
* (grizzelbee) Fix: "Connected" state is updated correctly now if connection is disrupted.
* (grizzelbee) New: Added Badge for latest(npm) version to readme
* (grizzelbee) Fix: removed default password from config to ensure it's encrypted on first config
* (grizzelbee) Fix: removed Force-ReInit
* (grizzelbee) Fix: sensor maintenance indicators are booleans now
* (grizzelbee) New: added activity indicator states for relays
* (pdbjjens) Fix: Prevent warnings regarding non-existent objects upon adapter instance creation and start-up with js-controller 3.2.x
* (pdbjjens) Fix: updated dependencies and vulnerabilities

### 0.0.6
* (pdbjjens) alpha 6 release updated dependencies

### 0.0.5
* (pdbjjens) alpha 5 release improved type and role mapping of adapter values

### 0.0.4
* (pdbjjens) alpha 4 release updated dependency on resol-vbus library to 0.21.0

### 0.0.3
* (pdbjjens) alpha 3 release tested with DL3 over local LAN and VBus.net and DeltaSol SLT (0x1001) incl. HQM (0x1011)

### 0.0.2
* (pdbjjens) alpha 2 release tested with VBus/LAN, KM2, VBus.net and DeltaSol E (0x7721 & 0x7722), DeltaSol M (0x7311 & 0x716), DeltaSol CS Plus (0x2211), Oventrop RQXXL (0x7541)

### 0.0.1

* (pdbjjens) initial release tested only with VBus/USB (Serial) and DeltaSol(R) BS2009 (0x427B)

## License

MIT License

Copyright (c) 2021 Jens-Peter Jensen <jjensen@t-online.de>

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