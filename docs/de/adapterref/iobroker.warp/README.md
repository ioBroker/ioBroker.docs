---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.warp/README.md
title: ioBroker.warp
hash: bjZV7O1KguMrIRaApQK0vOCRtJJDiSdsIvHmdliORNk=
---
# IoBroker.warp

![NPM-Version](https://img.shields.io/npm/v/iobroker.warp.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.warp.svg)
![Anzahl der Installationen](https://iobroker.live/badges/warp-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/warp-stable.svg)
![NPM](https://nodei.co/npm/iobroker.warp.png?downloads=true)

**Tests:** ![Testen und freigeben](https://github.com/pottio/ioBroker.warp/workflows/Test%20and%20Release/badge.svg)

## WARP Ladeadapter für ioBroker
Dieser Adapter überwacht und steuert eine Wallbox [(WARP-Ladegerät)](https://www.warp-charger.com/) von [Tinkerforge](https://www.tinkerforge.com/de/) über ioBroker. Die Verbindung wird über WebSockets hergestellt.

#### Ab Adapterversion 1.0.0 werden nur WARP-Firmwareversionen >= 2.0.0 unterstützt
Warum diesen Adapter verwenden - es ist auch möglich, die Wallbox über MQTT mit ioBroker zu verbinden?!

Über MQTT werden jedoch keine einzelnen Zustände gesendet, sondern komplexe JSON-Objekte. Der Warp-Adapter löst die komplexen JSON-Objekte in einzelne Zustände auf. Dadurch kann einfacher auf Wertänderungen eines einzelnen Zustands reagiert werden. Außerdem ist jeder Zustand mit der entsprechenden Beschreibung, Einheit und weiteren Informationen versehen, die in den [offizielle API-Dokumentation](https://www.warp-charger.com/api.html) zu finden sind. Um das Ganze abzurunden, sind einige Befehle wie das Starten/Stoppen des Ladevorgangs, das Festlegen von Obergrenzen des zulässigen Ladestroms, das Zurücksetzen von Zählerständen, das Scannen von WLAN-Netzwerken in der Nähe und das Anpassen des Anzeigenamens möglich. Die Änderung aller Systemparameter wie Netzwerkkonfiguration, MQTT-Einstellungen, Benutzerverwaltung oder Lastmanager sind aus Sicherheitsgründen nur über das Webinterface möglich.

### Unterstützte WARP-Ladegeräte
- [WARP-Ladegerät](https://www.warp-charger.com/index_warp1.html)
  - Clever
  - Profi
- [WARP2-Ladegerät](https://www.warp-charger.com/index.html)
  - Clever
  - Profi

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.2.2 (2022-07-01)
* (pottio) API changes
* (pottio) Dependency updates

### 1.2.1 (2022-05-18)
* (pottio) Fixed bug

### 1.2.0 (2022-05-17)
* (pottio) Minor improvements

### 1.1.0 (2022-05-05)
* (pottio) Dependency updates
* (pottio) API changes (WARP firmware versions 2.0.2, 2.0.3, 2.0.4) [[#27]](https://github.com/pottio/ioBroker.warp/issues/27)

### 1.0.1 (2022-04-28)
* (pottio) fixed bug [[#15]](https://github.com/pottio/ioBroker.warp/issues/15)

### 1.0.0 (2022-04-14)
* (pottio) [Breaking Changes] Added support for WARP firmware >= 2.0.0 - older firmware versions are no longer supported
* (pottio) Automatic WARP product and model detection on startup
* (pottio) Split of array in single states is now configurable in admin settings
* (pottio) Dependency updates

### 0.0.4 (2022-04-06)
* (pottio) fixed bug

### 0.0.3 (2022-03-22)
* (pottio) fixed bugs
* (pottio) added instance link

### 0.0.2 (2022-03-21)
* (pottio) initial release

## License
MIT License

Copyright (c) 2022 pottio

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