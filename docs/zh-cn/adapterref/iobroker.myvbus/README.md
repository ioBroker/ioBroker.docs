---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.myvbus/README.md
title: ioBroker.myvbus
hash: aF4K57u2d/78Cw2v4pkxrJUrcmi9N7upgA12YFtYMP4=
---
# IoBroker.myvbus
![标识](../../../en/adapterref/iobroker.myvbus/admin/myvbus.png)

![安装数量（最新）](http://iobroker.live/badges/myvbus-installed.svg)
![下载](https://img.shields.io/npm/dm/iobroker.myvbus.svg)
![安装数量（稳定）](http://iobroker.live/badges/myvbus-stable.svg)
![NPM版本](https://img.shields.io/npm/v/iobroker.myvbus.svg)
![国家公共管理](https://nodei.co/npm/iobroker.myvbus.png?downloads=true)

**测试：** ![测试与发布](https://github.com/iobroker-community-adapters/iobroker.myvbus/workflows/Test%20and%20Release/badge.svg)

## Resol VBus 的 ioBroker 适配器
该适配器使用 resol-vbus 将 ioBroker 连接到各种基于 VBus 的设备，resol-vbus 是 Daniel Wippermann 提供的用于采集 RESOL VBus 数据的 JavaScript 库。

<https://github.com/danielwippermann/resol-vbus>

<https://www.npmjs.com/package/resol-vbus>

＃＃ 特征
* 能够从各种 RESOL(R) VBus(R) 设备读取测量数据 - 最好是 DeltaSol(R) 系列的太阳能和系统控制器，包括内置热量表 (HQM) - 使用 DL3 或 DL2 数据记录器、KM2通信模块、VBus/LAN 接口适配器或通过 TCP/IP 进行本地串行/LAN 网关。
* 还支持使用 VBus/USB 串行接口适配器或使用 DLx/KMx 通过 VBus.net(R) 进行设备访问。
* 处理实时 VBus 数据流并使其可用作 ioBroker 状态。
* 值根据可配置的周期时间进行更新。
* 不支持读取或设置VBus设备配置参数。为此，应使用 Resol 提供的工具，例如通过 VBus.net 或参数化工具 RPT。

支持 VBus 设备控制的该适配器的派生版本可在 <https://github.com/Grizzelbee/ioBroker.resol> 获取

* 由于DL3接口的限制，不支持读取DL3通道0（直接连接到DL3设备的传感器）。

## 配置提示
* 连接设备类型，例如必须明确选择 VBus/LAN 或 DL2，否则将无法建立连接。
* TCP 连接端口：默认设置 7053 不应更改
* 设备密码：您在连接设备中设置的密码（默认：vbus）
* DL3 通道：仅与 DL3/DL2Plus 相关 - 对于所有其他连接设备，保留“无”。

（允许值：1-6，通道0无法读出）

* 更新间隔：测量值更新的时间间隔（默认30s）
* VBus/LAN、DL3、DL2、KM2 直接 LAN 访问的正确设置为：
  * 连接设备：VBus/LAN 或 KM2/DL2 或 DL3/DL2Plus
  * 设备地址：IP 地址（例如 192.168.178.188）或 ExcellentQualifiedHostName（例如 myKM2.fritz.box）
* 通过 VBus.net 访问 DL3、DL2、KM2 的正确设置是：
  * 连接设备：DL3/DL2Plus 或 DL2/KM2
  * 设备地址：vbus.net（或 vbus.io） - 都没有 http:// 和 Via 标识符！
  * Via 标签：YourViaIdentifier（例如 d1234567890） - 前面没有 http:// ，后面没有 .vbus.io

＃＃ 法律声明
RESOL、VBus、VBus.net、DeltaSol 等是 RESOL - Elektronische Regelungen GmbH <https://www.resol.de/en> 的商标或注册商标

所有其他商标均为其各自所有者的财产。
作者并未以任何方式获得 RESOL GmbH 或任何相关子公司、徽标或商标的认可或附属。

## Changelog
<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 0.3.0 (2024-01-24) - 2024 maintenance release

* (pdbjjens) New: Use JSON config UI
* (pdbjjens) New: Support ioBroker discovery
* (pdbjjens) Change: node>=16, js-contoller>=4 and admin>=6 required
* (pdbjjens) Updated dependencies
* (pdbjjens) Fix: Set info.connection false when reconnecting

### 0.2.5 (2023-03-14)

* (pdbjjens) Updated dependencies
* (pdbjjens) Fix: reconnect handling for serial connections

### 0.2.4 (2023-03-01)

* (pdbjjens) Fix password check

### 0.2.3 (2023-02-27) - 2023 maintenance release

* (pdbjjens) Updated dependencies
* (pdbjjens) New: Use adapter-dev instead of gulp translate
* (pdbjjens) Fix: error handling for serial connections

### 0.2.2 (2022-02-11)

* Updated dependencies
* Compatibility check for js-controller 4.0
* Support for js-controller 1.x dropped

## License

MIT License

Copyright (c) 2024 Jens-Peter Jensen <jjensen@t-online.de>

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