---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.rainbird/README.md
title: ioBroker.rainbird
hash: 7AXCQlCf4CrfwWtJqg/Wx7fNVwGuYvBwdeVZa2VjcgQ=
---
![标识](../../../en/adapterref/iobroker.rainbird/admin/rainbird.png)

![安装数量](http://iobroker.live/badges/rainbird-installed.svg)
![下载](https://img.shields.io/npm/dm/iobroker.rainbird.svg)
![NPM](https://nodei.co/npm/iobroker.rainbird.png?downloads=true)
![稳定的](http://iobroker.live/badges/rainbird-stable.svg)
![NPM 版本](https://img.shields.io/npm/v/iobroker.rainbird.svg)
![构建状态](https://travis-ci.org/StrathCole/ioBroker.rainbird.svg?branch=master)
![执照](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

# IoBroker.rainbird
适用于 Rain Bird 的 ioBroker 适配器，配备 LNK WiFi 适配器。本项目与 Rain Bird 无任何关联。

该适配器基于 https://github.com/jbarrancos/pyrainbird 的 Python 库“pyrainbird”，并已完全移植到 NodeJS。它通过 WiFi 连接直接与设备连接，不使用 Rain Bird 云服务。

## 州
`rainbird.X.device.commands.advanceZone` - 当前程序运行时，切换到下一个灌溉区并停止当前灌溉区。

`rainbird.X.device.commands.runProgram` - 手动运行设备中预先配置的指定程序（1 至 X）。

`rainbird.X.device.commands.stopIrrigation` - 立即停止所有灌溉区的灌溉。

`rainbird.X.device.irrigation.active` - 灌溉当前处于激活状态。如果为 false，则可能表示您已将设备上的开关设置为“停止”。

`rainbird.X.device.irrigation.station` - 当前正在灌溉的区域编号。

`rainbird.X.device.sensors.rain` - 如果安装了雨量传感器并检测到下雨，则为真。

`rainbird.X.device.settings.rainDelay` - 当前设备设置的灌溉延迟时间（以天为单位）。

`rainbird.X.device.settings.seasonalAdjust` - 当前水量平衡的季节性调整值。

`rainbird.X.device.stations.Y.available` - 如果设备中存在 Y 区，则为真。

`rainbird.X.device.stations.Y.irrigation` - 如果 Y 区当前正在灌溉，则为真。

`rainbird.X.device.stations.Y.remaining` - 剩余灌溉时间（秒）。`rainbird.X.device.stations.Y.runZone` - 手动对 Y 区进行指定分钟数的灌溉。

`rainbird.X.device.stations.Y.testZone` - 测试 Y 区。

## 鸣谢
如果没有 Marius Burkard <m.burkard@pixcept.de> 的出色工作，这个适配器是不可能实现的，他之前发布了该适配器的版本。

## IQ4 云设备
由于 LNK 设备同时只能连接一个设备，因此您需要将其与 IQ4 云断开连接才能正常响应。为此，您需要一个防火墙，例如，该防火墙会阻止所有流向互联网的流量，仅允许 LNK 设备的 IP 地址访问。之后，您就可以按预期连接此适配器了。

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.1.1 (2026-05-10)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (mobster80) Https support for Rainbird LNK added. Migrated LNK devices to IQ4 cloud, please see additional information in section "IQ4 Cloud devices".

### 2.0.2 (2024-12-27)
* (Feuersturm) @strathcole/iob-lib has been migrated to local repository (#27)
* (mcm1957) Dependencies have been updated

### 2.0.1 (2024-12-15)
* (Feuersturm) Some minor corrections to installations news and some internal changes at pacakging have been applied.

### 2.0.0 (2024-12-13)
* (Feuersturm) BREAKING: The password is stored encrypted now. Please reenter you password at configuration page. This is required only once after migration from release < 2.0.0 to release 2.0.0 or newer.
* (mcm1957) Adapter requires node.js 20 now
* (mcm1957) Adapter requires js-controller 5 and admin 6  now
* (Feuersturm) switch adapter config to jsonconfig
* (mcm1957) Dependencies have been updated

### 1.0.1 (2024-06-06)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Adapter has been move to iobroker-community-adapters organization
* (mcm1957) Adapter-core has been adapter, adapter supports js-controller 6 now.
* (mcm1957) Dependencies have been updated

## License

The MIT License (MIT)

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2022 Marius Burkard m.burkard@pixcept.de

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