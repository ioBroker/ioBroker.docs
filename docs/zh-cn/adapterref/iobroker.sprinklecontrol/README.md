---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sprinklecontrol/README.md
title: ioBroker.sprinklecontrol
hash: XXSwXaQs43PTPTGjvX7SX5y5JTKVgMqpE8ihPjsqa3o=
---
![标识](../../../en/adapterref/iobroker.sprinklecontrol/admin/sprinklecontrol.png)

![安装数量](http://iobroker.live/badges/sprinklecontrol-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.sprinklecontrol.svg)
![下载](https://img.shields.io/npm/dm/iobroker.sprinklecontrol.svg)
![依赖状态](https://img.shields.io/david/Dirk-Peter-md/iobroker.sprinklecontrol.svg)
![已知漏洞](https://snyk.io/test/github/Dirk-Peter-md/ioBroker.sprinklecontrol/badge.svg)
![新PM](https://nodei.co/npm/iobroker.sprinklecontrol.png?downloads=true)

# IoBroker.sprinklecontrol
[![构建状态](https://travis-ci.com/Dirk-Peter-md/ioBroker.sprinklecontrol.svg?branch=master)](https://travis-ci.com/Dirk-Peter-md/ioBroker.sprinklecontrol)

## IoBroker 的洒水控制适配器
该适配器控制花园中的各个灌溉回路。根据天气和土壤条件，它们在特定时间或日出时开始工作，如配置中指定的那样。

Wetterabhängige automatische Steuerung der Gartenbewässerung

[德意志银行](docs/de/sprinklecontrol.md)

[英文说明在这里](docs/en/sprinklecontrol.md)

[Deutsche Beschreibung auf GitHub](https://github.com/Dirk-Peter-md/ioBroker.sprinklecontrol/blob/master/docs/de/sprinklecontrol.md)

*************************************************************************************************************************************

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 0.2.7 (16.10.2021)
* (Dirk-Peter-md) zusätzliche Testnachrichten gelöscht, Readme aktualisiert

### 0.2.6 (03.10.2021)
* (Dirk-Peter-md) inGreenhouse in Bewässerungsverfahren "Calculation" hinzugefügt

### 0.2.5 (18.08.2021)
* (Dirk-Peter-md) Mehrfachverwendung von Bodenfeuchte-Sensoren
* (Dirk-Peter-md) Objekte mit \"def\": ... überarbeitet

### 0.2.4 (16.08.2021)
* (Dirk-Peter-md) Triggerpunktanzeige hinzufügen
* (Dirk-Peter-md) Fehler in der Bodenfeuchteanalyse behoben

### 0.2.3 (15.08.2021)
* (Dirk-Peter-md) index_m-Fehler behoben
* (Dirk-Peter-md) timeExtension (FixDay, bistabil) Fehler behoben

### 0.2.2 (27.07.2021)
* (Dirk-Peter-md) Fehler FixDay behoben
* (Dirk-Peter-md) Anzeige actualSoilMoisture überarbeitet
* (Dirk-Peter-md) Infomeldungen überarbeitet

### 0.2.1 (13.07.2021)
* (Dirk-Peter-md) Start an festen Wochentagen (ohne Sensoren) hinzugefügt
* (Dirk-Peter-md) Fehler behoben

### 0.2.0 (03.07.2021)
* (Dirk-Peter-md) Bodenfeuchte-Sensor hinzugefügt
* (Dirk-Peter-md) Schwellwert für Wettervorhersage hinzugefügt

### 0.1.7 (22.05.2021)
* (Dirk-Peter-md) Beschreibung in englischer Sprache hinzugefügt
* (Dirk-Peter-md) bereit für stable

### 0.1.6 (18.05.2021)
* (Dirk-Peter-md) AutoOn-Schalter pro Bewässerungskreis hinzugefügt
* (Dirk-Peter-md) weitere Fehler beseitigt (js-Controller)
* (Dirk-Peter-md) Niederschlagszähler von der Verdunstung gelöst

### 0.1.5 (05.05.2021)
* (Dirk-Peter-md) Zurücksetzen der Regenmenge im 24-Stunden-Modus hinzugefügt

### 0.1.4 (21.04.2021)
* (Dirk-Peter-md) Fehler bei deaktivierter Wettervorhersage behoben

### 0.1.3 (18.04.2021)
* (Dirk-Peter-md) Schaltabstand zwischen den Ventilen eingebaut, main.js aufgeteilt

### 0.1.2 (30.12.2020)
* (Dirk-Peter-md) Beschreibung von SprinkleControl überarbeitet

### 0.1.1 (08.11.2020)
* (Dirk-Peter-md) Integration von Nachrichten per Telegramm, E-Mail, Pushover und WhatsApp

### 0.0.12 (10.10.2020)
* (Dirk-Peter-md) Bewässerung über eine 2. Pumpe (Zisterne mit Vorrangschaltung) in abhängigkeit vom Füllstand hinzugefügt.

### 0.0.11 (30.08.2020)
* (Dirk-Peter-md) Bug in der Verarbeitung der Regenvorhersage vom Adapter "Das Wetter"
* (Dirk-Peter-md) Bug auf Travis CI


*************************************************************************************************************************************

## License
MIT License

Copyright (c) 2021 Dirk Peter <dirk.peter@freenet.de>

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
FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.