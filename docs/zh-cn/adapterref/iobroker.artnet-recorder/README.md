---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.artnet-recorder/README.md
title: ioBroker.artnet-记录器
hash: m8OLdXb7kjlJO34QT/IXo//ie7Bd4Uu8jUukaY3Vt4M=
---
![标识](../../../en/adapterref/iobroker.artnet-recorder/admin/artnet-recorder.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.artnet-recorder.svg)
![下载](https://img.shields.io/npm/dm/iobroker.artnet-recorder.svg)
![安装数量（最新）](http://iobroker.live/badges/artnet-recorder-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/artnet-recorder-stable.svg)
![已知漏洞](https://snyk.io/test/github/Bannsaenger/ioBroker.artnet-recorder/badge.svg)
![国家公共管理](https://nodei.co/npm/iobroker.artnet-recorder.png?downloads=true)

# IoBroker.artnet-记录器
![测试与发布](https://github.com/bannsaenger/iobroker.artnet-recorder/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 artnet 记录器适配器
将 Art-Net 数据记录到文件中以便稍后播放

＃＃ 目的
用于记录 Art-Net 数据的简单适配器，该数据通过广播发送到位于用户数据中的 json 文件。
仅记录 DMX 值的变化。
播放按 json 文件中存储的时间原样发送数据。
当合并模式为 LTP 或 HTP 时，服务器侦听通过网络发送的所有 ArtDMX 数据包，并尝试使用实际的 DMX 数据图像来添加存储的值。
发送数据的间隔或步进由配置设置。

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.0.5 (2023-12-25)
* (Bannsaenger) added releaseconfig

### 0.0.4 (2023-12-21)
* (Bannsaenger) updated dependencies
* (Bannsaenger) switched to release script
* (Bannsaenger) switched to json-config

### 0.0.3
* (Bannsaenger) fixed comments from code review

### 0.0.2
* (Bannsaenger) added engine and prepared for review

### 0.0.1
* (Bannsaenger) initial release

## License
MIT License

Copyright (c) 2021-2023 Bannsaenger <bannsaenger@gmx.de>

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