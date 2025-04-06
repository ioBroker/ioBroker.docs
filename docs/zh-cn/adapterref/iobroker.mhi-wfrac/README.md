---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.mhi-wfrac/README.md
title: ioBroker.mhi-wfrac
hash: nmu9PXm/uPrkE/fQBD+eMW7gWSJZZfWdwueBLhlJDcY=
---
![标识](../../../en/adapterref/iobroker.mhi-wfrac/admin/mhi-wfrac.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.mhi-wfrac.svg)
![下载](https://img.shields.io/npm/dm/iobroker.mhi-wfrac.svg)
![安装数量](https://iobroker.live/badges/mhi-wfrac-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/mhi-wfrac-stable.svg)
![新平台](https://nodei.co/npm/iobroker.mhi-wfrac.png?downloads=true)

# IoBroker.mhi-wfrac
**测试：**![测试与发布](https://github.com/hacki11/ioBroker.mhi-wfrac/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 mhi-wfrac 适配器
三菱重工空调带 WLAN 适配器 WF-RAC

该适配器在 ioBroker 中集成了配备 WF-RAC（Wifi）的三菱重工空调。

该代码基于

- https://github.com/wolkeSoftware/ioBroker.woso_mitsu_aircon_rac
- https://github.com/W0w3/ioBroker.mhi_aircon
- https://github.com/jeatheak/Mitsubishi-WF-RAC-Integration
- https://github.com/mcheijink/WF-RAC

非常感谢您的工作 - 它确实帮助了我很多。

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.1.2 (2025-03-31)
* (hacki11) Fix review findings

### 2.1.1 (2025-03-13)
* (hacki11) Migrate to eslint9

### 2.1.0 (2025-03-11)
* (hacki11) Add `online` datapoint representing the reachability of each device
* (hacki11) Workaround the built-in hourly reboot of the WF-RAC module

### 2.0.0 (2025-03-09)
* (hacki11) Bring Adapter Stable
* (hacki11) Support multiple devices
* (hacki11) Fix Read Operation Mode 'Auto'
* (hacki11) Set `info.connection` to `false` when adpater is unloading

### 1.0.2
* (wolkeSoftware) made Entrust (3D Auto) changeable

### 1.0.1
* (wolkeSoftware) initial release

## License
MIT License

Copyright (c) 2025 hacki11

Copyright (c) 2023 W0w3

Copyright (c) 2023 wolkeSoftware

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