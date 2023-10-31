---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.blebox/README.md
title: ioBroker.blebox
hash: bKDXQL6LW99S799H2zL7OE52xepqYUczF+xpwn0Fcds=
---
![标识](../../../en/adapterref/iobroker.blebox/admin/blebox.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.blebox.svg)
![下载](https://img.shields.io/npm/dm/iobroker.blebox.svg)
![已知漏洞](https://snyk.io/test/github/ka-vaNu/ioBroker.blebox/badge.svg)
![国家公共管理](https://nodei.co/npm/iobroker.blebox.png?downloads=true)

# IoBroker.blebox
## IoBroker 的 blebox 适配器
用于控制制造商[blebox](https://blebox.eu/)。 API说明可以在这里找到](https://technical.blebox.eu/)的智能家居设备的适配器。该实施是在没有制造商支持的情况下进行的。

可以下载不完整且过时的 API 模拟[这里](https://github.com/blebox/blebox-virtual-devices)。

目前支持以下设备：

* 快门盒
* 开关盒
* 桑拿箱
* 温度传感器
* 门盒
* 电视电梯
* 多传感器 - 未使用真实硬件进行测试，最多支持 4 个传感器

## Changelog

<!--
    Placeholder for the next version:
    ### **WORK IN PROGRESS**
-->

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

Copyright (c) 2023 Kai van Nuis <kai@vannuis.de>

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