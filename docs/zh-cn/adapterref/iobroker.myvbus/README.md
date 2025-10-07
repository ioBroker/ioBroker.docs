---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.myvbus/README.md
title: ioBroker.myvbus
hash: pq3xqFWg9+IRNJSb/Jrkeu0T5LyqeAydQut/+xxalkc=
---
# IoBroker.myvbus
![标识](../../../en/adapterref/iobroker.myvbus/admin/myvbus.png)

![安装数量（最新）](http://iobroker.live/badges/myvbus-installed.svg)
![下载](https://img.shields.io/npm/dm/iobroker.myvbus.svg)
![安装数量（稳定）](http://iobroker.live/badges/myvbus-stable.svg)
![NPM 版本](https://img.shields.io/npm/v/iobroker.myvbus.svg)
![新公共管理](https://nodei.co/npm/iobroker.myvbus.png?downloads=true)

**测试：**![测试和发布](https://github.com/iobroker-community-adapters/iobroker.myvbus/workflows/Test%20and%20Release/badge.svg)

## Resol VBus 的 ioBroker 适配器
该适配器使用 resol-vbus（由 Daniel Wippermann 提供的用于获取 RESOL VBus 数据的 JavaScript 库）将 ioBroker 连接到各种基于 VBus 的设备。

<https://github.com/danielwippermann/resol-vbus>

<https://www.npmjs.com/package/resol-vbus>

＃＃ 特征
* 能够从各种 RESOL(R) VBus(R) 设备（最好是 DeltaSol(R) 系列的太阳能和系统控制器，包括内置热量计 (HQM)）读取测量数据，使用 DL3 或 DL2 数据记录器、KM2 通信模块、VBus/LAN 接口适配器或通过 TCP/IP 在本地读取串行/LAN 网关。
* 还支持使用 VBus/USB 串行接口适配器或通过 VBus.net(R) 使用 DLx/KMx 进行设备访问。
* 处理实时 VBus 数据流并使其按照 ioBroker 状态可用。
* 值会根据可配置的周期时间进行更新。
* 不支持读取或设置 VBus 设备配置参数。应使用 Resol 提供的工具进行此操作，例如通过 VBus.net 或参数化工具 RPT。

该适配器的衍生版本支持对 VBus 设备的控制，可在 <https://github.com/Grizzelbee/ioBroker.resol> 获取。

* 由于 DL3 接口的限制，不支持读取 DL3 通道 0（直接连接到 DL3 设备的传感器）。

## 配置提示
* 连接设备类型，例如 VBus/LAN 或 DL2。必须明确选择，否则将无法建立连接。
* TCP 连接端口：仅限相关或基于 LAN 的访问。默认设置 7053 请勿更改。
* 设备密码：您在连接设备中设置的密码（默认：vbus）
* DL3 通道：仅与 DL3/DL2Plus 相关 - 对于所有其他连接设备，保留为“无”。

（允许值：1-6，通道0无法读出）

* 通过标签：仅与通过 VBus.net 的 DL3、DL2、KM2 访问相关 - 对于所有其他连接设备留空。
* 更新间隔：测量值更新之间的时间（默认30秒）
* VBus/USB 直接串行接口访问的正确设置是：
* 连接设备：VBus/USB
* 设备地址：串行接口适配器所连接的串行端口的路径，如

对于 Linux，为“/dev/ttyUSB0”或“/dev/serial/by-id/usb-Silicon_Labs_USB-Modul_UO2102_TDEB6I8DAVDLGAGC-if00-port0”或“/dev/serial/by-path/platform-fd500000.pcie-pci-0000:01:00.0-usb-0:1.4.1:1.0-port0”，对于基于 Windows 的 ioBroker 平台，为“COM5”

* VBus/LAN、DL3、DL2、KM2 直接 LAN 访问的正确设置是：
* 连接设备：VBus/LAN 或 KM2/DL2 或 DL3/DL2Plus
* 设备地址：IP 地址（例如 192.168.178.188）或 FullyQualifiedHostName（例如 myKM2.fritz.box）
* 通过 VBus.net 访问 DL3、DL2、KM2 的正确设置是：
* 连接设备：DL3/DL2Plus 或 DL2/KM2
* 设备地址：vbus.net（或 vbus.io）- 均不带 http:// 和 Via 标识符！
* Via 标签：YourViaIdentifier（例如 d1234567890）- 前面不带 http:// 后面不带 .vbus.io

## 法律声明
RESOL、VBus、VBus.net、DeltaSol 等是 RESOL - Elektronische Regelungen GmbH <https://www.resol.de/en> 的商标或注册商标

所有其他商标均为其各自所有者的财产。
作者不以任何方式获得 RESOL GmbH 或其任何相关子公司、徽标或商标的认可或附属。

## 贡献者
* DutchmanNL
* grizzelbee <hanjo@hingsen.de>

## Changelog
<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 0.6.0 (2025-08-29) - 2025H2 maintenance release

* (pdbjjens) Change: node>=20, js-controller>=7.0.7 and admin>=7.6.17 required
* (pdbjjens) Change: Cleanup devDependencies

### 0.5.1 (2025-02-15)

* (pdbjjens) Fix: Removed attribute "contributor" from package.json (#718)

### 0.5.0 (2025-01-30) - 2025H1 maintenance release

* (pdbjjens) New: Accept serial port paths /dev/serial/by-id/usb-xxxxxxxxxxxxxxxxxxx or /dev/serial/by-path/platform-xxxxxxxxxxxxxxxxxxx
* (pdbjjens) Change: Migration to ESLint 9
* (simatec) Responsive Design added

### 0.4.0 (2024-08-13) - 2024H2 maintenance release

* (pdbjjens) Change: node>=18, js-controller>=5 and admin>=6 required
* (pdbjjens) Change: Removed .npmignore
* (pdbjjens) New: Updated dependencies

### 0.3.0 (2024-01-24) - 2024 maintenance release

* (pdbjjens) New: Use JSON config UI
* (pdbjjens) New: Support ioBroker discovery
* (pdbjjens) Change: node>=16, js-contoller>=4 and admin>=6 required
* (pdbjjens) Updated dependencies
* (pdbjjens) Fix: Set info.connection false when reconnecting

## License

MIT License

Copyright (c) 2025 Jens-Peter Jensen <jjensen@t-online.de>

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