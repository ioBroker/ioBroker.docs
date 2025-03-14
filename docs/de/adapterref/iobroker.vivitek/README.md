---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vivitek/README.md
title: ioBroker.vivitek
hash: XMhDgcHa2xqJZkUjWZ9usXlpe33EZqQIJz6Yg40Pdec=
---
![Logo](../../../en/adapterref/iobroker.vivitek/admin/vivitek.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.vivitek.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.vivitek.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/vivitek-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/vivitek-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/Bannsaenger/iobroker.vivitek.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/Bannsaenger/ioBroker.vivitek/badge.svg)
![NPM](https://nodei.co/npm/iobroker.vivitek.png?downloads=true)

# IoBroker.vivitek
## Vivitek-Adapter für ioBroker
Steuern Sie einen Vivitek-Projektor über das Netzwerk (RS 232-Befehle über Telnet)

Der Adapter ist für die Kommunikation mit einem Vivitek-Projektor über dessen Telnet-Schnittstelle konzipiert.
Diese sollte sich wie die serielle Schnittstelle verhalten.

Leider fehlen der Telnet-Implementierung einige grundlegende Befehle.
Derzeit ist nur die Kommunikation über ein Netzwerk mit einem RS232-Com-Server möglich.
Ich betreibe die Implementierung mit einem Wieseman & Theis Com-Server.

## Aufgaben
Sobald die Implementierung auf der Projektorseite vollständig funktioniert, sollten weitere Befehle zur vollständigen Steuerung des Projektors hinzugefügt werden.
Soweit ich weiß, deckt das Protokoll eine ganze Projektorfamilie ab.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.1 (2025-02-25)
* (Bannsaenger) updated admin dependency

### 0.1.0 (2025-02-09)
* (Bannsaenger) updated dependencies and moved to release script
* (Bannsaenger) instance config and object database handling prepared for >= admin5
* (Bannsaenger) json Config
* (Bannsaenger) add errorHandler

### 0.0.2
* (Bannsaenger) prepared for checkin to iobroker.latest

### 0.0.1
* (Bannsaenger) initial release

### 0.0.2
* (Bannsaenger) added engine and prepared for review

## License
MIT License

Copyright (c) 2021-2025 Bannsaenger <bannsaenger@gmx.de>

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