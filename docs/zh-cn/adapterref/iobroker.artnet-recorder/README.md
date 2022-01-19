---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.artnet-recorder/README.md
title: ioBroker.artnet-recorder
hash: uqpn2PwrGT4aqZ2T/Sl0mi7zIRGu9XbQzyyNNeHUYrs=
---
![标识](../../../en/adapterref/iobroker.artnet-recorder/admin/artnet-recorder.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.artnet-recorder.svg)
![下载](https://img.shields.io/npm/dm/iobroker.artnet-recorder.svg)
![安装数量（最新）](http://iobroker.live/badges/artnet-recorder-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/artnet-recorder-stable.svg)
![依赖状态](https://img.shields.io/david/Bannsaenger/iobroker.artnet-recorder.svg)
![已知漏洞](https://snyk.io/test/github/Bannsaenger/ioBroker.artnet-recorder/badge.svg)
![新PM](https://nodei.co/npm/iobroker.artnet-recorder.png?downloads=true)

# IoBroker.artnet-recorder
## IoBroker 的 artnet-recorder 适配器
将 Art-Net 数据记录到文件中以供以后回放

＃＃ 目的
用于记录通过广播发送到位于用户数据中的 json 文件的 Art-Net 数据的简单适配器。
仅记录 DMX 值的变化。
Playback 按存储在 json 文件中的时间按原样发送数据。
当合并模式为 LTP 或 HTP 时，服务器会侦听通过网络发送的所有 ArtDMX 数据包，并尝试使用实际的 DMX 数据图像来添加存储的值。
发送数据的间隔或步进由配置设置。

## Changelog

### 0.0.1
* (Bannsaenger) initial release

### 0.0.2
* (Bannsaenger) added engine and prepared for review

### 0.0.3
* (Bannsaenger) fixed comments from code review

## License
MIT License

Copyright (c) 2021-2022 Bannsaenger <bannsaenger@gmx.de>

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

Credit:
 [Art-Net™ Designed by and Copyright Artistic Licence Holdings Ltd](https://art-net.org.uk)