---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.corrently/README.md
title: 无题
hash: /DW2QcECua6bcoPQg0f17in1PhDYhgEE7+Zj5dl7hSY=
---
![安装数量](http://iobroker.live/badges/corrently-installed.svg)
![稳定版](http://iobroker.live/badges/corrently-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.corrently.svg)
![下载](https://img.shields.io/npm/dm/iobroker.corrently.svg)
![依赖状态](https://img.shields.io/david/GermanBluefox/iobroker.corrently.svg)
![已知漏洞](https://snyk.io/test/github/GermanBluefox/ioBroker.corrently/badge.svg)
![NPM](https://nodei.co/npm/iobroker.corrently.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/GermanBluefox/ioBroker.corrently/master.svg)

<h1><img src="admin/corrently.png" width="64"/>ioBroker.corrently</h1>

## IoBroker 的正确适配器
阅读来自 [https://www.corrently.de/gsi/PLZ](https://www.corrently.de/gsi/80999) 的绿色能源指数。
将提供以下数据：

 - `data.json` - 未来 36 小时的 JSON 表，带有绿色索引
 - `data.start` - 绿色能源 0 - 24 的下一个或当前周期的开始时间戳
 - `data.duration` - 绿色能源下一个或当前周期的持续时间 0 - 24
 - `data.green` - 现在是否是绿色能源
 - `data.price` - 当前时刻的绿色价格

＃＃ 配置
适配器将每小时执行一次（例如可以设置为时间表）并且用户必须在配置中输入帖子索引。

## Corrently Adapter für ioBroker
Lesen Sie den Index der grünen Energie von [https://www.corrently.de/gsi/PLZ] (https://www.corrently.de/gsi/80999)。
Folgende Daten werden zur Verfügung gestellt：

- `data.json` - JSON-Tabelle für die nächsten 36 Stunden mit grünem Index
- `data.start` - Startzeitstempel der nächsten oder aktuellen Periode mit grüner Energie 0 - 24
- `data.duration` - Dauer der nächsten oder aktuellen Periode mit grüner Energie 0 - 24
- `data.green` - ist jetzt grüne Energie oder nicht
- `data.price` - grüner Preis für den aktuellen Moment

## Einstellungen
Der Adapter wird stündlich ausgeführt (kann beispielsweise als Zeitplan festgelegt werden), und der Benutzer muss den Post-Index in der Konfiguration eingeben。

<!--

### **正在进行中** -->

## Changelog
### 0.0.4 (2023-02-27)
* (Maverick78de) URL was corrected

### 0.0.2
* (bluefox) CRON schedule was changed to "1 * * * *"

### 0.0.1
* (bluefox) initial release

## License
MIT License

Copyright (c) 2019-2023 bluefox

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