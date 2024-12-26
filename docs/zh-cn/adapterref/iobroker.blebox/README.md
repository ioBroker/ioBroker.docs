---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.blebox/README.md
title: ioBroker.blebox
hash: H5QE8rnAxkqTH+8M9rsElAFLi0W690GnR8KC86WzS3M=
---
![标识](../../../en/adapterref/iobroker.blebox/admin/blebox.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.blebox.svg)
![下载](https://img.shields.io/npm/dm/iobroker.blebox.svg)
![已知漏洞](https://snyk.io/test/github/ka-vaNu/ioBroker.blebox/badge.svg)
![新平台](https://nodei.co/npm/iobroker.blebox.png?downloads=true)

# IoBroker.blebox
## IoBroker 的 blebox 适配器
[![贝宝]（https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif）](https://www.paypal.com/donate/?hosted_button_id=8JKRSMB8LS76S)

用于控制制造商 [blebox](https://blebox.eu/)。API 描述可在此处找到](https://technical.blebox.eu/) 的智能家居设备的适配器。该实现无需制造商的支持。

可以下载不完整且过时的 API 模拟[这里](https://github.com/blebox/blebox-virtual-devices)。

目前支持以下设备：

|盖拉特 | API 类型 |状态 |
|----------------------|---------------------|-----------------------------------------|
| gatebox | gatebox | ✅ 已测试 |
| 多传感器 | 多传感器 | 每个设备最多支持 8 个传感器 |
| tempSensor PRO | 多传感器 | ❓ 测试版，未经真实硬件测试 |
| tempSensorAC | 多传感器 | ❓ 测试版，未经真实硬件测试 |
| 湿度传感器 | 多传感器 | ❓ 测试版，未经真实硬件测试 |
| windSensor PRO | 多传感器 | ❓ 测试版，未经真实硬件测试 |
| floodSensor | multisensor | ❓ beta，未经真实硬件测试 |
| rainSensor | 多传感器 | ❓ 测试版，未经真实硬件测试 |
| saunabox | saunabox | ❓ 测试版，未经真实硬件测试 |
| 快门盒 | 快门盒 | ✅ 已测试 |
| shutterBoxDC | shutterBox | ❓ 测试版，未经真实硬件测试 |
| shutterBoxDIN | shutterBox | ❓ 测试版，未经真实硬件测试 |
| 开关盒 | 开关盒 | ✅ 已测试 |
| switchBoxD | switchBox | ❓ 测试版，未经真实硬件测试 |
| switchBoxDC | switchBox | ❓ 测试版，未经真实硬件测试 |
| switchBox DIN | switchBox | ❓ 测试版，未经真实硬件测试 |
| switchBoxD DIN | switchBox | ❓ 测试版，未经真实硬件测试 |
| switchBoxT PRO | switchBox | ❓ 测试版，未经真实硬件测试 |
| tempsensor | tempsensor | ❓ 测试版，未经真实硬件测试 |
| tvlift | tvlift | ❓ 测试版，未经真实硬件测试 |

## Changelog

<!--
    Placeholder for the next version:
    ### **WORK IN PROGRESS**
-->

### 2.2.0 (2023-10-13)

* (Kai van Nuis) Support for multi-device APIs

### 2.1.0 (2023-10-13)

* (Kai van Nuis) Support for multiSensor

### 2.0.1 (2023-03-12)

* (Kai van Nuis) Update dependecies

### 2.0.0 (2022-09-18)

* (Kai van Nuis) Change to Admin UI 5

### 1.1.0

* Support for gateBox implemented and eslint converted

### 0.1.2

* Fixes due to code review
### 0.1.1

* First stable release

## License
MIT License

Copyright (c) 2024 Kai van Nuis <kai@vannuis.de>

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