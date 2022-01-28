---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.doorio/README.md
title: ioBroker.doorio
hash: o1RBbRI0CSb9+BOz0XM8a4FKs0Y+Pq/MLHrtSCQVIbU=
---
![Logo](../../../en/adapterref/iobroker.doorio/admin/doorio.png)

![Anzahl der Installationen](http://iobroker.live/badges/doorio-stable.svg)
![Build-Status](https://travis-ci.org/Bettman66/ioBroker.doorio.svg?branch=master)
![NPM-Version](http://img.shields.io/npm/v/iobroker.doorio.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.doorio.svg)
![NPM](https://nodei.co/npm/iobroker.doorio.png?downloads=true)

# IoBroker.doorio
## Die Info
Hausgemachter Türstationsadapter für ioBroker

Dieser Adapter stellt über tcp.socket eine Verbindung zum Baresip Sip-Client her, um mit einer Türsprechanlage zu kommunizieren. Als Klingelauslöser kann jeder Eingang von ioBroker verwendet werden.
Der Adapter erkennt auch DTMF-Töne zum Schalten von Ausgängen. Für die selbstgebaute Türstation kann jede Hardware verwendet werden, auf der Baresip installiert werden kann.

Dieser Adapter verbindet sich über tcp.socket mit dem Baresip Sip-Client, um mit einer Türsprechstelle zu kommunizieren. Als Klingellauslöser kann jeder Eingang von ioBroker genutzt werden. Der Adapter erkennt auch DTMF-Töne um Ausgänge zu schalten. Für die Selbstgemachte Türsprechstelle, kann jede Hardware auf der sich Baresip installieren lässt genutzt werden.

## Links
* [ioBroker Forum Hardware Thread](https://forum.iobroker.net/topic/23413/ich-baue-eine-t%C3%BCrsprechstelle-ohne-cloud)
* [Adapter-Thread im ioBroker-Forum](https://forum.iobroker.net/topic/22746/test-adapter-doorio-v0-0-x)

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