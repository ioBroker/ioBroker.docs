---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.lowpass-filter/README.md
title: ioBroker.lowpass-filter
hash: T5f5x6wPgKQP7lkpwQKUjJ04xmlsHLNOFTdU82ZNRCo=
---
![标识](../../../en/adapterref/iobroker.lowpass-filter/admin/lowpass-filter.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.lowpass-filter.svg)
![下载](https://img.shields.io/npm/dm/iobroker.lowpass-filter.svg)
![安装数量](https://iobroker.live/badges/lowpass-filter-installed.svg)
![捐](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![新PM](https://nodei.co/npm/iobroker.lowpass-filter.png?downloads=true)

# IoBroker.lowpass-filter
![测试和发布](https://github.com/BenAhrdt/ioBroker.lowpass-filter/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的低通滤波器适配器
您可以根据一阶低通滤波器的滤波算法过滤类型为 number 的状态。
例如您可以过滤功率值以减少功率窥视。

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 2.0.5 (2022-06-17) - readme changed
* (BenAhrdt) change some wrong links in readme file

### 2.0.4 (2022-06-16) - loglevel check deleted
* (BenAhrdt) dont check loglevel before log.debug()

### 2.0.3 (2022-06-13) - translate io-package
* (BenAhrdt) implement some translations into io-package

### 2.0.2 (2022-06-13) - adpater type changed
* (BenAhrdt) adapter tpe changed into misc-data

### 2.0.1 (2022-06-08) - loglevel implemented
* (BenAhrdt) logging just in loglevel mode "debug"

### 2.0.0 (2022-06-04)
* (BenAhrdt) workflow implemented

### 1.14.9
* (BenAhrdt) fixed some changes in readme

### 1.14.8
* (BenAhrdt) implements translation

## License
MIT License

Copyright (c) 2022 BenAhrdt <bsahrdt@gmail.com>

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