---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.rainbird/README.md
title: ioBroker.rainbird
hash: /YJXlyBSaILis+KUmtEyaDLpid6UsaLyP988L8RtQrQ=
---
![标识](../../../en/adapterref/iobroker.rainbird/admin/rainbird.png)

![安装数量](http://iobroker.live/badges/rainbird-installed.svg)
![下载](https://img.shields.io/npm/dm/iobroker.rainbird.svg)
![新平台](https://nodei.co/npm/iobroker.rainbird.png?downloads=true)
![稳定的](http://iobroker.live/badges/rainbird-stable.svg)
![NPM 版本](https://img.shields.io/npm/v/iobroker.rainbird.svg)
![构建状态](https://travis-ci.org/StrathCole/ioBroker.rainbird.svg?branch=master)
![执照](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

# IoBroker.rainbird
带有 LNK WiFi 适配器的 Rain Bird ioBroker 适配器。该项目与 Rain Bird 没有任何关联。

基于 https://github.com/jbarrancos/pyrainbird 的 Python 库“pyrainbird”，并完全移植到 NodeJS。适配器通过 WiFi 连接直接连接到设备，不使用 Rain Bird 云服务。

＃＃ 状态
`rainbird.X.device.commands.advanceZone` - 当前程序运行时，前进到下一个灌溉区域并停止当前灌溉区域。
`rainbird.X.device.commands.runProgram` - 按照设备中先前的配置手动运行指定程序（1 到 X）。
`rainbird.X.device.commands.stopIrrigation` - 立即停止所有区域的灌溉。

`rainbird.X.device.irrigation.active` - 灌溉当前处于活动状态。如果为 false，则可能意味着您将设备上的开关设置为“停止”。
`rainbird.X.device.irrigation.station` - 当前灌溉区域的编号。

`rainbird.X.device.sensors.rain` - 如果安装了雨量传感器并且检测到雨量，则为真。

`rainbird.X.device.settings.rainDelay` - 为设备设置的当前灌溉延迟（以天为单位）。
`rainbird.X.device.settings.seasonalAdjust` - 当前季节性调整水预算。

`rainbird.X.device.stations.Y.available` - 如果设备中的区域 Y 可用，则为 True。
`rainbird.X.device.stations.Y.irrigation` - 如果区域 Y 当前正在灌溉，则为 True。
`rainbird.X.device.stations.Y.remaining` - 剩余灌溉时间（秒）`rainbird.X.device.stations.Y.runZone` - 在区域 Y 上手动运行灌溉指定的分钟数。
`rainbird.X.device.stations.Y.testZone` - 测试区域 Y。

## 致谢
如果没有 Marius Burkard <m.burkard@pixcept.de> 的出色工作，这个适配器是不可能实现的，他之前发布了这个适配器。

## 捐赠
[![贝宝]（https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif）](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SFLJ8HCW9T698&source=url)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.0.1 (2024-06-06)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Adapter has been move to iobroker-community-adapters organization
* (mcm1957) Adapter-core has been adapter, adapter supports js-controller 6 now.
* (mcm1957) Dependencies have been updated

### 0.2.3
-   Fixed problem with sensor data
-   Added seasonal water budget adjust information

### 0.2.2

-   Added fixes for adapter crashes on failed connection to controller

### 0.2.1

-   Added support for run times on different controller model
-   Less polling for some states to reduce requests to controller

### 0.2.0

-   Added remaining irrigation time of zone
-   Fixed bug in decoding responses

## License

The MIT License (MIT)

Copyright (c) 2024, iobroker-community-adapters <iobroker-community-adapters@gmx.de>
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