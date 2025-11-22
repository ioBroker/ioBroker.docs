---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.hyperion-connector/README.md
title: ioBroker.hyperion-connector
hash: iCNo/EDXxOBmVCRiW2TIrgZP9Me4WUPUupGoSvO9Fa4=
---
![标识](../../../en/adapterref/iobroker.hyperion-connector/admin/hyperion-connector.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.hyperion-connector.svg)
![下载](https://img.shields.io/npm/dm/iobroker.hyperion-connector.svg)
![安装数量](https://iobroker.live/badges/hyperion-connector-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/hyperion-connector-stable.svg)
![NPM](https://nodei.co/npm/iobroker.hyperion-connector.png?downloads=true)

# IoBroker.hyperion-connector
**测试：** ![测试与发布](https://github.com/ticaki/ioBroker.hyperion-connector/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 hyperion-connector 适配器
连接到 hyperion.ng 服务器。Hyperion 项目 https://hyperion-project.org/forum/

启动后不久，适配器会自动搜索本地网络中可用的 Hyperion 服务器。

如果找到服务器，它会尝试连接；如果需要登录，它会请求令牌。

这将导致 Hyperion WebUI 上弹出一个窗口，您必须确认。如果首次确认后连接未建立，请等待 1-2 分钟，之后应该会再次出现提示。

我已将一些我觉得有用的命令添加到列表中。

如果您需要其他命令，请在论坛或此处发帖。

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.2.1 (2025-11-11)
* (ticaki) first latest release
* (ticaki) Clean termination of the adapter

### 0.2.0 (2025-10-27)
* (ticaki) controls: adjustment added
* (ticaki) workaround for buggy subscribe in 2.1.1 (maybe adapter only work with 2.1.1)
* (ticaki) update deps

### 0.1.2 (2025-02-05)
* (ticaki) remove unit from admin
* (ticaki) reduced version requirements for js-controller

### 0.1.1 (2025-01-14)
* (ticaki) Renaming repo
* (ticaki) Adjustable reconnection interval. State to activate accelerated reconnection
* (ticaki) Incoming updates for leds are handled (most updates force a complete update of the data unless I have added code to handle - leds, components, effects so far)
* (ticaki) Added a json data point for priorities to allow better access from the javascript adapter
* (ticaki) Added leds update handling
* (ticaki) remove leds subfolders and write all data into a json datapoint (-500 folder/states for me)
* (ticaki) added controls.system
* (ticaki) add info.connection for adapter and device
* (ticaki) initial release
* (ticaki) initial release

## License
MIT License

Copyright (c) 2025 ticaki <github@renopoint.de>

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