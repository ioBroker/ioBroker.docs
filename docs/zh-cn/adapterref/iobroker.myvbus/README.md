---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.myvbus/README.md
title: ioBroker.myvbus
hash: sNPkORaSVOs312S5OrbFo1j7SheCbsjHx0Y1bd/1zH0=
---
# IoBroker.myvbus
![标识](../../../en/adapterref/iobroker.myvbus/admin/myvbus.png)

![安装数量（最新）](http://iobroker.live/badges/myvbus-installed.svg)
![下载](https://img.shields.io/npm/dm/iobroker.myvbus.svg)
![安装数量（稳定）](http://iobroker.live/badges/myvbus-stable.svg)
![NPM 版本](https://img.shields.io/npm/v/iobroker.myvbus.svg)
![新PM](https://nodei.co/npm/iobroker.myvbus.png?downloads=true)

**测试：** ![测试和发布](https://github.com/iobroker-community-adapters/iobroker.myvbus/workflows/Test%20and%20Release/badge.svg)

## 用于 Resol VBus 的 ioBroker 适配器
该适配器使用由 Daniel Wippermann 提供的用于获取 RESOL VBus 数据的 JavaScript 库 resol-vbus 将 ioBroker 连接到各种基于 VBus 的设备。

<https://github.com/danielwippermann/resol-vbus>

<https://www.npmjs.com/package/resol-vbus>

＃＃ 特征
* 可以从各种 RESOL(R) VBus(R) 设备读取测量数据 - 最好是 DeltaSol(R) 系列的太阳能和系统控制器，包括内置热量计 (HQM) - 使用 DL3 或 DL2 数据记录器 KM2通信模块、VBus/LAN 接口适配器或本地通过 TCP/IP 的串行/LAN 网关。
* 还支持使用 VBus/USB 串行接口适配器或使用 DLx/KMx 通过 VBus.net(R) 访问设备。
* 处理实时 VBus 数据流，并使其作为 ioBroker 状态可用。
* 使用可配置的循环时间更新值。
* 不支持读取或设置 VBus 设备配置参数。应使用 Resol 提供的工具，例如通过 VBus.net 或参数化工具 RPT。
* 由于 DL3 接口的限制，不支持读取 DL3 通道 0（传感器直接连接到 DL3 设备）。

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
  * 连接类型：DL3 或 DL2 或 KM2
  * 连接标识符：vbus.net（或 vbus.io） - 都没有 http:// 和 Via 标识符！
  * 连接端口：默认设置 7053 不应更改
  * VBus 密码：YourVBusPassword（默认值：vbus）
  * DL3 通道：仅与 DL3 相关（值：1-6，通道 0 无法读出）
  * 通过标识符：YourViaIdentifier（例如 d1234567890）- 前面没有 http:// 或后面没有 .vbus.io
  * 更新间隔：测量值更新之间的时间（默认30s）

＃＃ 法律声明
RESOL、VBus、VBus.net、DeltaSol 和其他是 RESOL - Elektronische Regelungen GmbH <https://www.resol.de/en> 的商标或注册商标

所有其他商标均为其各自所有者的财产。
作者不以任何方式获得 RESOL GmbH 或任何相关子公司、徽标或商标的认可或附属。

## Changelog
### 0.2.2 (2022-02-11)
* Updated dependencies
* Compatibility check for js-controller 4.0
* Support for js-controller 1.x dropped

### 0.2.1 (2021-08-18)
* Update dependencies
* Changed allowed range of temperature values to include the error values for short circuit and open circuit

### 0.2.0 (2021-06-25)
* Dropped node.js 10 support, added node.js 14 and 16 support

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

## License

MIT License

Copyright (c) 2022 Jens-Peter Jensen <jjensen@t-online.de>

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