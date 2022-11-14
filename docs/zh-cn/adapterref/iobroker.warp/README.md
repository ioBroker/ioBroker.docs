---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.warp/README.md
title: ioBroker.warp
hash: bjZV7O1KguMrIRaApQK0vOCRtJJDiSdsIvHmdliORNk=
---
# IoBroker.warp

![NPM 版本](https://img.shields.io/npm/v/iobroker.warp.svg)
![下载](https://img.shields.io/npm/dm/iobroker.warp.svg)
![安装数量](https://iobroker.live/badges/warp-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/warp-stable.svg)
![新PM](https://nodei.co/npm/iobroker.warp.png?downloads=true)

**测试：** ![测试和发布](https://github.com/pottio/ioBroker.warp/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 WARP 充电器适配器
该适配器通过 ioBroker 监控和控制墙盒[(WARP 充电器)](https://www.warp-charger.com/) by [Tinkerforge](https://www.tinkerforge.com/de/)。连接将通过 WebSockets 建立。

#### 自适配器版本 1.0.0 起，仅支持 WARP 固件版本 >= 2.0.0
为什么要使用这个适配器 - 也可以通过 MQTT 将墙盒连接到 ioBroker？！

但是，通过 MQTT 发送的不是单个状态，而是复杂的 JSON 对象。 warp 适配器将复杂的 JSON 对象解析为单个状态。这使得更容易对单个状态的值变化做出反应。此外，每个州都提供了相应的描述、单位和更多信息，可以在[官方 API 文档](https://www.warp-charger.com/api.html)中找到。最重要的是，可以执行一些命令，例如开始/停止充电、设置允许充电电流的上限、重置仪表读数、扫描附近的 WLAN 网络和自定义显示名称。出于安全原因，只能通过 Web 界面更改所有系统参数，例如网络配置、MQTT 设置、用户管理或负载管理器。

### 支持的 WARP 充电器
- [WARP充电器](https://www.warp-charger.com/index_warp1.html)
  - 聪明的
  - 临
- [WARP2充电器](https://www.warp-charger.com/index.html)
  - 聪明的
  - 临

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.2.2 (2022-07-01)
* (pottio) API changes
* (pottio) Dependency updates

### 1.2.1 (2022-05-18)
* (pottio) Fixed bug

### 1.2.0 (2022-05-17)
* (pottio) Minor improvements

### 1.1.0 (2022-05-05)
* (pottio) Dependency updates
* (pottio) API changes (WARP firmware versions 2.0.2, 2.0.3, 2.0.4) [[#27]](https://github.com/pottio/ioBroker.warp/issues/27)

### 1.0.1 (2022-04-28)
* (pottio) fixed bug [[#15]](https://github.com/pottio/ioBroker.warp/issues/15)

### 1.0.0 (2022-04-14)
* (pottio) [Breaking Changes] Added support for WARP firmware >= 2.0.0 - older firmware versions are no longer supported
* (pottio) Automatic WARP product and model detection on startup
* (pottio) Split of array in single states is now configurable in admin settings
* (pottio) Dependency updates

### 0.0.4 (2022-04-06)
* (pottio) fixed bug

### 0.0.3 (2022-03-22)
* (pottio) fixed bugs
* (pottio) added instance link

### 0.0.2 (2022-03-21)
* (pottio) initial release

## License
MIT License

Copyright (c) 2022 pottio

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