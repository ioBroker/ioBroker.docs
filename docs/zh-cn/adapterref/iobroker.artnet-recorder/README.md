---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.artnet-recorder/README.md
title: ioBroker.artnet-recorder
hash: IVN89sZAHrOrE2Bb/tN/BDBrOWsBhHCcsKMgefS2HhU=
---
![标识](../../../en/adapterref/iobroker.artnet-recorder/admin/artnet-recorder.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.artnet-recorder.svg)
![下载](https://img.shields.io/npm/dm/iobroker.artnet-recorder.svg)
![安装数量（最新）](http://iobroker.live/badges/artnet-recorder-installed.svg)
![安装数量（稳定版）](http://iobroker.live/badges/artnet-recorder-stable.svg)
![已知漏洞](https://snyk.io/test/github/Bannsaenger/ioBroker.artnet-recorder/badge.svg)
![NPM](https://nodei.co/npm/iobroker.artnet-recorder.png?downloads=true)

# IoBroker.artnet-recorder
![测试与发布](https://github.com/bannsaenger/iobroker.artnet-recorder/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 artnet 记录器适配器
将 Art-Net 数据记录到文件中，以便稍后播放

＃＃ 目的
一个简单的适配器，用于记录通过广播发送到用户数据中 JSON 文件的 Art-Net 数据。

仅记录 DMX 值的变化。

回放功能会按原样发送数据，并保留 JSON 文件中存储的时间信息。

当合并模式为 LTP 或 HTP 时，服务器会监听通过网络发送的所有 ArtDMX 数据包，并尝试获取实际的 DMX 数据图像，以便添加存储的值。

发送数据的间隔或步长由配置设置。

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (Bannsaenger) updated dependencies and issues from repository checker

### 0.1.5 (2025-10-24)
* (Bannsaenger) updated dependencies and issues from repository checker
* (Bannsaenger) migrate to NPM Trusted Publishing

### 0.1.4 (2025-09-06)
* (Bannsaenger) updated dependencies and issues from repository checker

### 0.1.3 (2025-02-25)
* (Bannsaenger) previous release did not work

### 0.1.2 (2025-02-25)
* (Bannsaenger) updated admin dependency

### 0.1.1 (2025-01-21)
* (Bannsaenger) removed script build on deploy

## License
MIT License

Copyright (c) 2021-2026 Bannsaenger <bannsaenger@gmx.de>

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