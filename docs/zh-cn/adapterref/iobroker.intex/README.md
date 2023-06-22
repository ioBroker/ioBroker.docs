---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.intex/README.md
title: ioBroker.intex
hash: vidHWdxc5eeX+XnUFQtmFMETAZUYCX6fBRuQxeyaYW0=
---
![标识](../../../en/adapterref/iobroker.intex/admin/intex.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.intex.svg)
![下载](https://img.shields.io/npm/dm/iobroker.intex.svg)
![安装数量](https://iobroker.live/badges/intex-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/intex-stable.svg)
![依赖状态](https://img.shields.io/david/TA2k/iobroker.intex.svg)
![国家公共管理](https://nodei.co/npm/iobroker.intex.png?downloads=true)

# IoBroker.intex
**测试：** ![测试与发布](https://github.com/TA2k/ioBroker.intex/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 intex 适配器
带 wifi 模块的 Intex Whirlpool 适配器

## 登录ablauf：
Intex App Mail 和 Passwort eingeben。

## 斯图恩
intex.0.<id>.remote auf true setzen steuert den jeweiligen Befehl。
intex.0.<id>.control auf true 或 false setzen，在 Zustand 中设置 Pool Befehl。

## 洛卡尔
Cloudbetrieb versucht das System den Befehl lokal abzusetzen, es sei denn, es ist nur Cloud angegeben。请注意，系统将在 Cloudbetrieb 中启动，然后再启动适配器。

我很喜欢 Betreib werden aktuell auch Funktionen angeboten, die der Pool nicht unterstützt。您必须将池的 DNS 名称地址设置为路由器或池的 IP 地址。
Das Intervall kann hier auf eine Minute gesetzt werden。

Dieses kann über den Suchbutton gesucht werden。可以看到 Router Unterbundnen werden 上的所有错误，wenn z。 B. WLAN Geräte nicht untereinander kommunizieren dürfen der lokalen Firewall des Rechners Ports oder Bordcasting gesperrt ist。

## 讨论和讨论：
https://forum.iobroker.net/topic/47932/test-intext-app-v0-0-x

## Changelog

### 0.1.0
* (PLCHome/rbartl) Unterstützung lokale IP. Sowohl über Cloud als auch nur lokal ohne Cloud. Danke nach Österreich an Robert Bartl.
* (PLCHome) Nach dem Schalten über Control direkt bestätigen.

### 0.0.7
* (PLCHome) Schalten über remote funktioniert wieder.
* (PLCHome) Nach dem Schalten über Control kann von der Cloud der vorherige Staus übermittelt werden. Dadurch kann es zu einem Toggeln des Zutands kommen.

### 0.0.6
* (PLCHome) Definiertes Setzen von Zuständen
* (PLCHome) Ändern Fahrenheit Celsius
* (PLCHome) control.temperatur, nur lesen, Objekt aus 0.0.5 muss einmal gelöscht werden.

### 0.0.5
* (PLCHome) Temperatur setzen hinzugefügt, Objekt muss einmal gelöscht werden.
* (PLCHome) Decodierung der Statusinformationen

### 0.0.1
* (TA2k) initial release

## License
MIT License

Copyright (c) 2022 TA2k <tombox2020@gmail.com>

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