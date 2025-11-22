---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.hyperion-connector/README.md
title: ioBroker.hyperion-connector
hash: iCNo/EDXxOBmVCRiW2TIrgZP9Me4WUPUupGoSvO9Fa4=
---
![Logo](../../../en/adapterref/iobroker.hyperion-connector/admin/hyperion-connector.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.hyperion-connector.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.hyperion-connector.svg)
![Anzahl der Installationen](https://iobroker.live/badges/hyperion-connector-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/hyperion-connector-stable.svg)
![NPM](https://nodei.co/npm/iobroker.hyperion-connector.png?downloads=true)

# IoBroker.hyperion-connector
**Tests:** ![Test und Freigabe](https://github.com/ticaki/ioBroker.hyperion-connector/workflows/Test%20and%20Release/badge.svg)

## Hyperion-Connector-Adapter für ioBroker
Verbinde dich mit dem hyperion.ng-Server. Hyperion Projekt https://hyperion-project.org/forum/

Kurz nach dem Start sucht der Adapter automatisch nach verfügbaren Hyperion-Servern im lokalen Netzwerk.
Wird ein Server gefunden, versucht er, eine Verbindung herzustellen. Ist eine Anmeldung erforderlich, fordert er ein Token an.
Daraufhin erscheint ein Popup in der Hyperion-Weboberfläche, das Sie bestätigen müssen. Sollte die Verbindung nach der ersten Bestätigung nicht hergestellt werden, warten Sie bitte 1–2 Minuten. Anschließend erscheint eine weitere Aufforderung.

Befehle, die ich für nützlich halte, wurden integriert.

Falls Sie weitere Befehle benötigen, posten Sie diese bitte im Forum oder hier.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.2.1 (2025-11-11)
* (ticaki) first latest release
* (ticaki) Clean termination of the adapter

### 0.2.0 (2025-10-27)
* (ticaki) controls: adjustment added
* (ticaki) workaround for buggy subscribe in 2.1.1 (maybe adapter only work with 2.1.1)
* (ticaki) update deps

### 0.1.2 (2025-02-05)
* (ticaki) remove unit from admin
* (ticaki) reduced version requirements for js-controller

### 0.1.1 (2025-01-14)
* (ticaki) Renaming repo
* (ticaki) Adjustable reconnection interval. State to activate accelerated reconnection
* (ticaki) Incoming updates for leds are handled (most updates force a complete update of the data unless I have added code to handle - leds, components, effects so far)
* (ticaki) Added a json data point for priorities to allow better access from the javascript adapter
* (ticaki) Added leds update handling
* (ticaki) remove leds subfolders and write all data into a json datapoint (-500 folder/states for me)
* (ticaki) added controls.system
* (ticaki) add info.connection for adapter and device
* (ticaki) initial release
* (ticaki) initial release

## License
MIT License

Copyright (c) 2025 ticaki <github@renopoint.de>

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