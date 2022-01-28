---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.doorio/README.md
title: ioBroker.doorio
hash: o1RBbRI0CSb9+BOz0XM8a4FKs0Y+Pq/MLHrtSCQVIbU=
---
![标识](../../../en/adapterref/iobroker.doorio/admin/doorio.png)

![安装数量](http://iobroker.live/badges/doorio-stable.svg)
![构建状态](https://travis-ci.org/Bettman66/ioBroker.doorio.svg?branch=master)
![NPM 版本](http://img.shields.io/npm/v/iobroker.doorio.svg)
![下载](https://img.shields.io/npm/dm/iobroker.doorio.svg)
![新PM](https://nodei.co/npm/iobroker.doorio.png?downloads=true)

# IoBroker.doorio
## 信息
用于 ioBroker 的自制 DoorStation 适配器

此适配器通过 tcp.socket 连接到 Baresip Sip 客户端以与门电话进行通信。作为铃声触发器，可以使用来自 ioBroker 的每个输入。
该适配器还可以识别 DTMF 音调以切换输出。对于自制门站，可以使用 Baresip 可以安装的任何硬件。

Dieser Adapter verbindet sich über tcp.socket mit dem Baresip Sip-Client，嗯 mit einer Türsprechstelle zu kommunizieren。 Als Klingelauslöser kann jeder Eingang von ioBroker genutzt werden。 Der Adapter erkennt auch DTMF-Töne um Ausgänge zu schalten。 Für die Selbstgemachte Türsprechstelle, kann jede Hardware auf der sich Baresip installieren lässt genutzt werden。

## 链接
* [ioBroker 论坛硬件线程](https://forum.iobroker.net/topic/23413/ich-baue-eine-t%C3%BCrsprechstelle-ohne-cloud)
* [ioBroker 论坛适配器线程](https://forum.iobroker.net/topic/22746/test-adapter-doorio-v0-0-x)

## Changelog
### 2.1.3
* (bettman66) change setForeignState ack

### 2.1.2
* (bettman66) update for js-controller

### 2.1.1
* (bettman66) bugfix ack:true

### 2.1.0
* (bettman66) add bot update

### 2.0.4
* (bettman66) optimize code

### 2.0.3
* (bettman66) bugfix version

### 2.0.2
* (bettman66) merge dependabot

### 2.0.1
* (bettman66) npm error

### 2.0.0
* (bettman66) update test

## License
The MIT License (MIT)

Copyright (c) 2022 Walter Zengel <w.zengel@gmx.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.