![Logo](admin/sprinklecontrol.png)
# ioBroker.sprinklecontrol



![Number of Installations](http://iobroker.live/badges/sprinklecontrol-installed.svg) 
![Number of Installations](http://iobroker.live/badges/sprinklecontrol-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.sprinklecontrol.svg)](https://www.npmjs.com/package/iobroker.sprinklecontrol)
[![Downloads](https://img.shields.io/npm/dm/iobroker.sprinklecontrol.svg)](https://www.npmjs.com/package/iobroker.sprinklecontrol)
[![Dependency Status](https://img.shields.io/david/Dirk-Peter-md/iobroker.sprinklecontrol.svg)](https://david-dm.org/Dirk-Peter-md/iobroker.sprinklecontrol)
[![Known Vulnerabilities](https://snyk.io/test/github/Dirk-Peter-md/ioBroker.sprinklecontrol/badge.svg)](https://snyk.io/test/github/Dirk-Peter-md/ioBroker.sprinklecontrol)
[![Travis-CI](http://img.shields.io/travis/Dirk-Peter-md/ioBroker.sprinklecontrol/master.svg)](https://travis-ci.org/Dirk-Peter-md/ioBroker.sprinklecontrol)


[![NPM](https://nodei.co/npm/iobroker.sprinklecontrol.png?downloads=true)](https://nodei.co/npm/iobroker.sprinklecontrol/)


## sprinklecontrol adapter for ioBroker

This adapter controls individual irrigation circuits in the garden. Depending on the weather and soil conditions, they start working at a specific time or at sunrise, as specified in the configuration.

Wetterabhängige automatische Steuerung der Gartenbewässerung

[Deutsche Beschreibung hier](docs/de/sprinklecontrol.md)

[Deutsche Beschreibung auf GitHub](https://github.com/Dirk-Peter-md/ioBroker.sprinklecontrol/blob/master/docs/de/sprinklecontrol.md)

*************************************************************************************************************************************


## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

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

