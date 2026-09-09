---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ico-cloud/README.md
title: ioBroker.ico-cloud
hash: LzYbiiAE0dGfiuMmXrAu0H4hNYBkrptMNFDyztfzmaY=
---
![Logo](../../../en/adapterref/iobroker.ico-cloud/admin/ico-cloud.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.ico-cloud.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ico-cloud.svg)
![Anzahl der Installationen](https://iobroker.live/badges/ico-cloud-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/ico-cloud-stable.svg)
![NPM](https://nodei.co/npm/iobroker.ico-cloud.png?downloads=true)
![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.ico-cloud/workflows/Test%20and%20Release/badge.svg)

# ioBroker.ico-cloud

## ICO-Adapter für ioBroker

Der ICO Pool-Sensor (von Ondilo) ermöglicht die Überwachung des Zustands und der Temperatur des Wassers in Ihrem Pool und empfiehlt entsprechende Maßnahmen.

Der Adapter verbindet sich mit dem Ondilo-Cloud-Dienst und ruft alle Messwerte ab.

### Konfiguration

Das Abfrageintervall kann in den Einstellungen (in Minuten) festgelegt werden. Auch der Anmeldevorgang muss in den Einstellungen gestartet werden.

### Quellenangabe

Dieser Adapter wurde **nicht** von Ondilo entwickelt oder ist deren Eigentum, sondern von der ioBroker-Community.

Icon und Name von ICO und Ondilo sind Eigentum von Ondilo.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now

### 2.0.3 (2025-05-12)
* (Garfonso) add json state for recommendations

### 2.0.2 (2025-05-12)
* (Garfonso) ignore done recommendations

### 2.0.1 (2025-05-12)
* (Garfonso) added support for recommendations
* (Garfonso) store refreshed token properly, might solve issues with missed measurements.
* (Garfonso) improved responsiveness of config UI

### 2.0.0 (2025-05-08)
* (Garfonso) rewrote config UI
* (Garfonso) login works again
* (Garfonso) breaking: needs node 20 or higher now.

### 1.1.0 (2023-06-20)
* (Garfonso) changed adapter logic, so that known pools are updated even if the pool list update fails.

### 1.0.0 (2022-07-01)
* (Garfonso) changed adapter to be schedule adapter.

### 0.0.7 (2022-07-01)
* (Garfonso) more dependencies & administrative stuff.

### 0.0.6 (2022-07-01)
* (Garfonso) dependencies & updates

### 0.0.5 (2021-07-30)
* (Garfonso) add necessary admin dependency.
* (Garfonso) Do not use unknown roles.

### 0.0.4 (2021-07-22)
* (Garfonso) change default poll interval to one hour, because it seems no more measurements are done.
* (Garfonso) fixed issue in polling

### 0.0.3 (2021-07-20)
* (Garfonso) Rename to ico-cloud

### 0.0.2 (2021-07-20)
* (Garfonso) initial release

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.ico-cloud/blob/main/CHANGELOG_OLD.md)

## License
MIT License


Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2025 Garfonso <garfonso@mobo.info>

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