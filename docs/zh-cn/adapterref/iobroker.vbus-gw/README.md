---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vbus-gw/README.md
title: ioBroker.vbus-gw
hash: 27jJv88V7+juZCeU0sCVgDG033Cz3ejMB0Xg5dK7yeI=
---
# IoBroker.vbus-gw
![标识](../../../en/adapterref/iobroker.vbus-gw/admin/vbus-gw.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.vbus-gw.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/vbus-gw-stable.svg)
![安装数量](https://iobroker.live/badges/vbus-gw-installed.svg)
![下载](https://img.shields.io/npm/dm/iobroker.vbus-gw.svg)
![新平台](https://nodei.co/npm/iobroker.vbus-gw.png?downloads=true)

**测试：**![测试与发布](https://github.com/pdbjjens/ioBroker.vbus-gw/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 vbus-gw 适配器
允许 TCP 访问基于串行端口的 VBus 设备

此 ioBroker 适配器基于 Daniel Wippermann 的作品。
<https://github.com/danielwippermann/resol-vbus/tree/master/examples/serial-to-tcp> 版权和许可请参阅“许可”部分

＃＃ 概述
VBus 硬件适配器有两种类型：

- 基于 TCP：DL2、DL3、KM2、VBus/LAN
- 基于串行端口：VBus/USB、DeltaSol SLT 和其他控制器的 USB 端口

此 ioBroker 适配器连接到一个或多个基于串行端口的硬件适配器并通过 TCP 公开它们。这允许：

- VBus 数据传输距离比 USB 或串行端口通常允许的距离更长
- 从仅支持基于 TCP 的应用程序访问基于串行端口的适配器

＃＃ 配置
可配置项有：

- 服务正在监听传入连接的 TCP 端口。

默认端口为：7053，请勿更改。

- 服务正在侦听发现请求的 http 端口。

默认端口为：80，也可以选择端口3000。

- VBus 网关的密码。

允许访问所有串行端口连接的 VBus 设备。默认为“vbus”。

- 要连接的串行端口列表，每个串行端口具有以下参数：

- channel：串行端口分配到的vbus通道。

如果您只想连接到单个串行端口，建议将其配置为使用通道 0，因为大多数应用程序默认都会尝试连接该通道 0。

- path: 串口路径，如

'/dev/ttyUSB0' 或 '/dev/serial/by-id/usb-Silicon_Labs_USB-Modul_UO2102_TDEB6I8DAVDLGAGC-if00-port0' 或 '/dev/serial/by-path/platform-fd500000.pcie-pci-0000:01:00.0-usb-0:1.4.1:1.0-port0' 或 'COM5'

- baudrate：串口的波特率。默认为9600，一般不需要更改。

## 已知问题
- 此适配器目前支持最多 3 个通过串行端口连接的 VBus 设备。
- 连接到串行端口的所有 VBus 的密码都是相同的。
- VBus.net 连接的设备未被模拟。发送 CONNECT（通过标签）命令会返回 +OK，尽管未建立连接。
- 使用不存在的通道发送 DATA 命令将返回 +OK，但随后会立即关闭连接。

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.2.0 (2025-01-29) - 2025H1 maintenance release

- (pdbjjens) Change: Migration to ESLint 9
- (pdbjjens) New: Accept serial port paths /dev/serial/by-id/usb-xxxxxxxxxxxxxxxxxxx or /dev/serial/by-path/platform-xxxxxxxxxxxxxxxxxxx
- (pdbjjens) Change: Responsive Design optimizations

### 0.1.0 (2024-08-13) - 2024H2 maintenance release

- (pdbjjens) Change: node>=18, js-contoller>=5 and admin>=6 required
- (pdbjjens) New: Updated dependencies
- (pdbjjens) New: Ensure that vbus-gw is started before myvbus or resol

### 0.0.7 (2024-02-24)

- (pdbjjens) Fix: VBus write fixed
- (pdbjjens) Fix: Password logging removed

### 0.0.6 (2024-01-23)

- (pdbjjens) New: Use resol-vbus v0.29.0
- (pdbjjens) New: Logging of denied connection events

### 0.0.5 (2024-01-21)

- (pdbjjens) New: Use resol-vbus v0.28.0
- (pdbjjens) New: Configurable password for the VBus gateway
- (pdbjjens) Fix: Channel forwarding to the requesting connections only

## License

MIT License  
Copyright (c) 2025 Jens-Peter Jensen <jjensen@t-online.de>  
Copyright (c) 2013-present, Daniel Wippermann.

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