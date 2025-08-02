---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.smoothed/README.md
title: ioBroker.平滑
hash: 3eGbxdUmqlpPOB9oZOmO+WUIXKp4uKgHdytaZqE8yak=
---
![标识](../../../en/adapterref/iobroker.smoothed/admin/smoothed.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.smoothed.svg)
![下载](https://img.shields.io/npm/dm/iobroker.smoothed.svg)
![安装数量](https://iobroker.live/badges/smoothed-installed.svg)
![捐](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![国家公共管理](https://nodei.co/npm/iobroker.smoothed.png?downloads=true)

# IoBroker.smoothed
![测试与发布](https://github.com/BenAhrdt/iobroker.smoothed/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的平滑适配器
这个适配器可以很容易地选择一些图标来根据选定的算法和平滑时间（过滤时间）来平滑它。
您可以多次选择一个id，以在不同的所有算法和/或时间中对其进行平滑处理。
目的地是 flger 目录中的一个 id，它为您提供平滑后的值。
您可以限制最小值或最大值。
限制小数位数。
或者忽略具有高标准偏差的值。

![替代文本](../../../en/adapterref/iobroker.smoothed/image.png)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.5.0 (2024-02-28)
* (Ben1983) do some changes in Readme and checking for vorbidden chars

### 0.4.3 (2024-02-20)
* (Ben1983) set Name of accordion content

### 0.4.2 (2023-12-23)
* (Ben1983) logging of actual ignered value improoved

### 0.4.1 (2023-12-23)
* (Ben1983) add standard deviation into last array

### 0.4.0 (2023-12-23)
* (Ben1983) calculation and limitation for changes with standard diviation

### 0.3.0 (2023-12-22)
* (Ben1983) functions outsourced in lib/modules

### 0.2.0 (2023-12-21)
* (Ben1983) lowpassfilter added to calculation type

### 0.1.0 (2023-12-20)
* (Ben1983) initial release

## License
MIT License

Copyright (c) 2024 Ben1983 <bsahrdt@gmail.com>

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