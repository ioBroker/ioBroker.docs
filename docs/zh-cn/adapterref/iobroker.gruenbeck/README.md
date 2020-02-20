---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.gruenbeck/README.md
title: 无题
hash: ot6iKdWRZK7uVdTIc/7ZNwXp2Y/oyRsx3J6NSKSU7wk=
---
![NPM版本](http://img.shields.io/npm/v/iobroker.gruenbeck.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.gruenbeck.svg)
![依赖状态](https://img.shields.io/david/TA2k/iobroker.gruenbeck.svg)
![已知漏洞](https://snyk.io/test/github/TA2k/ioBroker.gruenbeck/badge.svg)
![NPM](https://nodei.co/npm/iobroker.gruenbeck.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/TA2k/ioBroker.gruenbeck/master.svg)

<h1><img src="admin/gruenbeck.png" width="64"/> ioBroker.gruenbeck </h1>

## IoBroker的gruenbeck适配器
用于GrünbeckWasseraufbereitung SC18，SC23，SD18，SD21，SD23设备的ioBroker适配器。

## Changelog

### 0.0.17 (2020-01-24)

- Increasing minimum interval to prevent blocking

### 0.0.15 (2019-10-28)

- Fix combact mode

### 0.0.14 (2019-09-13)

- Add Refresh for SDxx devices

### 0.0.13 (2019-09-13)

- Add Support for SDxx devices

### 0.0.11 (2019-05-12)

- Fix IP parsing

### 0.0.10 (2019-05-08)

- Prevent multiple acutal commands interval
- Unload all intervals at unload

### 0.0.9 (2019-04-29)

- Fix Power Mode Zeitplan
- Fix Uhrzeit Parsing

### 0.0.8 (2019-04-20)

- Fix Info Values nicht als Zahlen geschrieben
- Salzmenge als Option
- PowerMode Zeitplan in den Option

### 0.0.7 (2019-03-31)

- automatisch Uhrzeit
- Wasserverbrauchintervall in den Optionen
- Schleichwassermesszeitraum in den Optionen

### 0.0.6 (2019-03-30)

- add Wasserverbrauch l/min
- fix newError States

### 0.0.5 (2019-03-30)

- Fehlercode History hinzugefügt. Fehlerspeicher muss nicht mehr zurückgesetzt für neue Fehler State. Nur der muss manuell auf 0 gesetzt werden.
    Alle 4sek wird jetzt der aktuelle Durchfluss abgerufen.

### 0.0.4

- (tombox) Bugfixes,
    added Restkapazität Austauscher to refresh values
    added berechneter Salzstand and reset Salzstand
    added Fehlerspeicher reset

### 0.0.3

- (tombox) Add new Error state, add JSON History for Wasserverbrauch

### 0.0.2

- (tombox) Remove Warning, Fix Descriptions

### 0.0.1

- (tombox) initial release

## License

MIT License

Copyright (c) 2019 tombox

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