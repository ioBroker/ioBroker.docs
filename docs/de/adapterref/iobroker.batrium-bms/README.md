---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.batrium-bms/README.md
title: ioBroker.batrium-bms
hash: QpY2cEvyVWvd5vaLOq+X8bgRIVHAkmwkF1R7DnQpbrc=
---
![Logo](../../../en/adapterref/iobroker.batrium-bms/admin/batrium-bms.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.batrium-bms.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.batrium-bms.svg)
![Anzahl der Installationen](https://iobroker.live/badges/batrium-bms-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/batrium-bms-stable.svg)
![NPM](https://nodei.co/npm/iobroker.batrium-bms.png?downloads=true)

# IoBroker.batrium-bms
![Test und Freigabe](https://github.com/bembelstemmer/ioBroker.batrium-bms/workflows/Test%20and%20Release/badge.svg)
<!--
-->

## Batrium-BMS-Adapter für ioBroker
Ein ioBroker-Adapter zur Verfolgung von Metriken Ihres Batrium BMS, die über UDP veröffentlicht werden.

!!! Dieser Adapter wird von Batrium nicht offiziell unterstützt !!!

Dieser Adapter basiert auf der offiziellen Batrium WatchMonUdpListener-Implementierung unter: https://github.com/Batrium/WatchMonUdpListener

Die Nachrichtenunterstützung ist derzeit noch eingeschränkt und wird in späteren Versionen erweitert.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.7.0 (2025-11-15)
* Drop of Node18 and adding of Node24 support
* Various Package Updates
* Migration of eslint from 8 to 9

### 0.6.0 (2025-03-27)
* Drop Support for Node v16
* Various Package Upgrades
* Increased min js-controller version to 5.0.19
* Increased min Admin version to 7.4.10

### 0.5.0 (2023-09-10)
* Various Package Upgrades (inc. Update to ioBroker Adapter lib v3)
* Adding of Tests for Node Version 20.x
* Fixed marking of properties writeable even if they're not
* Fixed wrong Naming of Object 5732.ShuntStatus
* Reworked Object Roles to better match their meaning (where meaning was known)

### 0.4.0 (2023-03-22)
* Added Message Type 4232 (Cell Status Full)

### 0.3.0 (2023-03-05)
* Added Message Type 415a (Cell Status Small)
* Added Configuration per Message Type
* Added Rate Limit function per Message Type to reduce load on ioBroker DB

### 0.2.1 (2023-02-04)
* Readded build folder

### 0.2.0 (2023-02-04)
* Minor Type Fixes
* Added Message Type 6831

### 0.1.0 (2023-02-03)
* Optimized Parser Structure
* Finished up Message Type 5732
* Finished up Message Type 3233

### 0.0.2 (2023-01-31)
* Initial Test Release

## License
MIT License

Copyright (c) 2025 Bembelstemmer <kontakt[at]it-amm[dot]de>

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