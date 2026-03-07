---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.zwavews/README.md
title: ioBroker.zwavews
hash: zpQOuWRa/PVC4Q3tAUfv6sFysg3YF58DjzTKdCNdv7I=
---
![NPM-Version](https://img.shields.io/npm/v/iobroker.zwavews.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.zwavews.svg)
![Anzahl der Installationen](https://iobroker.live/badges/zwavews-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/zwavews-stable.svg)
![NPM](https://nodei.co/npm/iobroker.zwavews.png?downloads=true)

<img src="admin/zwavews.png" width="200" />

# IoBroker.zwavews
**Tests:** ![Test und Freigabe](https://github.com/arteck/ioBroker.zwavews/workflows/Test%20and%20Release/badge.svg) ![CodeQL](https://github.com/arteck/ioBroker.zwavews/actions/workflows/codeql.yml/badge.svg?branch=main)

## Zwave-WS-Adapter für ioBroker
Der Adapter `zwavews` verbindet ein [`zwave-js-ui`](https://zwave-js.github.io/zwave-js-ui/#/) mit ioBroker und erstellt entsprechende Datenpunkte für Geräte, Werte und Status. Dadurch lassen sich Z-Wave-Geräte komfortabel in Visualisierungen, Logik und Automatisierungen einsetzen.

## Adapterdokumentation
Es ist erforderlich, zwave-js-ui zu installieren (es ist möglich, die zwave2-Geräte auf zwave-js-ui zu migrieren. Kopieren Sie die JSON-Cache-Datei von /opt/iobroker/iobroker-data/zwave2/ in das Speicherverzeichnis der Z-Wave JS UI. Starten Sie anschließend zwave-js-ui) und die WS-Kommunikation zu aktivieren.<br> Der Wechsel vom Z-Wave2-Adapter ist einfach, da alle Informationen auf dem Koordinator gespeichert sind.<br> Sie müssen die batteriebetriebenen Geräte nur einmal aufwecken, damit zwave-js-ui sie wieder lesen kann, oder Sie migrieren von zwave2.<br>

<img width="1444" height="740" alt="Grafik" src="https://github.com/user-attachments/assets/876a81d3-04ab-43c6-914e-86772d0188e1" /><p></p>

Aktivieren Sie die WS-Servereinstellungen in `zwave-js-ui`. Wir verwenden hierfür die Home Assistant-Einstellungen:

<img width="1887" height="479" alt="Grafik" src="https://github.com/user-attachments/assets/6ed8cf36-2d91-435f-91d7-86e430bb0c6c" />

## Changelog
### **WORK IN PROGRESS**
* (arteck) add deviceManager

### 0.0.18 (2026-02-28)
* (arteck) add info.sendMessageAllowed object to allow sending the message to zwave-ui-js
* (arteck) add new checkbox to set info.sendMessageAllowed immediately after starting the adapter

### 0.0.17 (2026-02-20)
* (arteck) fix adapter start
* (arteck) Dependencies have been updated

### 0.0.16 (2026-02-09)
* (arteck) fix warning message

### 0.0.15 (2026-02-09)
* (arteck) typo
* (arteck) fix ready status if status is dead

### 0.0.14 (2026-02-09)
* (arteck) add event ready

### 0.0.13 (2026-02-07)
* (arteck) add event type "value notification"

### 0.0.12 (2026-02-01)
* (arteck) typo
* (arteck) fix dp channel name
* (arteck) add endpoint > 0 to value if exists

### 0.0.11 (2026-01-23)
* (arteck) fix dp types

### 0.0.10 (2026-01-17)
* (arteck) event value added

### 0.0.9 (2026-01-08)
* (arteck) convert status to lower case

### 0.0.8 (2026-01-06)
* (arteck) add warning message for inteview states

### 0.0.7 (2026-01-06)
* (arteck) add name if not in device info tree

### 0.0.6 (2026-01-06)
* (arteck) update title

### 0.0.5 (2026-01-06)
* (arteck) add online status

### 0.0.4 (2026-01-06)
* (arteck) fix overrideState

### 0.0.3 (2026-01-06)
* (arteck) fix title

### 0.0.2 (2026-01-06)
- (arteck) first release

## License

MIT License

Copyright (c) 2026 Arthur Rupp <arteck@outlook.com>,

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