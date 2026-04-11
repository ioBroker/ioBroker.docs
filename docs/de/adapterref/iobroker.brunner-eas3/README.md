---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.brunner-eas3/README.md
title: ioBroker.brunner-eas3
hash: c/OP6XPydI74q7mpQKoD0wzg885HvMTnM6y1yFd+vMA=
---
![Logo](../../../en/adapterref/iobroker.brunner-eas3/admin/brunner-eas3.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.brunner-eas3.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.brunner-eas3.svg)
![Anzahl der Installationen](https://iobroker.live/badges/brunner-eas3-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/brunner-eas3-stable.svg)
![NPM](https://nodei.co/npm/iobroker.brunner-eas3.png?downloads=true)

# IoBroker.brunner-eas3
**Tests:** ![Test und Freigabe](https://github.com/JR-Home/ioBroker.brunner-eas3/workflows/Test%20and%20Release/badge.svg)

## Brunner-eas3-Adapter für ioBroker
Adapter zum Auslesen von Daten aus dem Brunner-Verbrennungsregelungssystem EAS 3. Die Daten werden über WLAN-Broadcast-Nachrichten veröffentlicht.

Wenn die Verbindung zu EAS 3 unterbrochen wird, wird die Verbrennungstemperatur auf -99 eingestellt.

Brennende Zustände:

* -1 - Status nicht verfügbar, Verbindung unterbrochen
* 0 - Tür offen
* 1 - Feuer entzünden
* 2 - Feuerschritt 2
* 5 - Ende des Feuers
* 6 – Fehler/Zeitüberschreitung, Feuerstart nicht erkannt
* 7 - Feuer gelöscht.

### HAFTUNGSAUSSCHLUSS
Dieser Adapter ist KEIN offizielles Produkt der Urlich Brunner GmbH. Er wurde von Mitgliedern der Open-Source-Community entwickelt und wird von ihnen gepflegt.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.1.1 (2026-03-26)
* (JR-HOME) release - updating roles of IOBroker objects, corrected add more wood status

### 1.0.7 (2026-03-06)
* (JR-HOME) release - correction for publishing adapter on IOBroker dev portal

### 1.0.6 (2026-03-01)
* (JR-HOME) release

## License
MIT License

Copyright (c) 2026 JR-Home 

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