---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.x-touch/README.md
title: ioBroker.x-touch
hash: WIHz2zmoIFHGH8dlrg2iIAKeaishdLYIfWK2QOSAv7c=
---
![商标](../../../en/adapterref/iobroker.x-touch/admin/x-touch.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.x-touch.svg)
![下载](https://img.shields.io/npm/dm/iobroker.x-touch.svg)
![安装数量（最新）](http://iobroker.live/badges/x-touch-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/x-touch-stable.svg)
![依赖状态](https://img.shields.io/david/Bannsaenger/iobroker.x-touch.svg)
![已知漏洞](https://snyk.io/test/github/Bannsaenger/ioBroker.x-touch/badge.svg)
![新产品管理](https://nodei.co/npm/iobroker.x-touch.png?downloads=true)

# IoBroker.x-touch
## IoBroker 的 x-touch 适配器
与 Behringer X-Touch 控制表面（DAW 控制器）通信

＃＃ 去做
- 添加编码器及其 LED -> 完成，左边是 sync_global 并检查数据库更改
- 添加时间码显示
- 添加库和推子通道开关的功能 -> 完成，需要额外测试
- 添加同步全局功能

## Changelog

### 0.0.1
* (Bannsaenger) initial release

### 0.0.2
* (Bannsaenger) prepared for checkin to iobroker.latest

### 0.1.0
* (Bannsaenger) introduced channel and page switching

### 0.2.0
* (Bannsaenger) introduced encoders

### 0.2.1
* (Bannsaenger) changed the way to send data. Added sendDelay

### 0.2.2
* (Bannsaenger) fixed fader handling and data distribution to the device group

### 0.2.3
* (Bannsaenger) fixed setting of diplay inverted

## License
MIT License

Copyright (c) 2021 Bannsaenger <bannsaenger@gmx.de>

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