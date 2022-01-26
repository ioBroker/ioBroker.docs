---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tino/README.md
title: ioBroker.tino
hash: z+wiZ/y+sdVnU+uJ+GMOYAsNHn8nfPUr4zCLYb0CAA4=
---
![Logo](../../../en/adapterref/iobroker.tino/admin/tino.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.tino.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tino.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/bowao/iobroker.tino.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/bowao/ioBroker.tino/badge.svg)
![NPM](https://nodei.co/npm/iobroker.tino.png?downloads=true)
![Travis-CI](https://img.shields.io/travis/com/bowao/ioBroker.tino/master)

#ioBroker.tino
## TiNo-Adapter für ioBroker
(deutsche Version siehe unten)

Lesen Sie über TiNo Protocol Version 1.01 und TiNo Protocol Version 2.2 empfangene drahtlose Sensordaten.
Anhand der empfangenen Daten wird automatisch die entsprechende Protokollversion erkannt.

Der drahtlose Transceiver und Empfänger TiNo wurden von nurazur entwickelt.

Projektseite: https://nurazur.wordpress.com/

Github: https://github.com/nurazur/TiNo

"**TI**ny **NO**de": batteriebetriebener Funksensor oder Funkaktor. Ziel des Projekts ist die Entwicklung kleiner, kostengünstiger, batteriebetriebener Funksensoren. Die Sensoren kommunizieren mit Gateways, wie ein Himbeer-Pi. Die Ziele sind:

* niedrige Kosten (Stückliste unter 5 Euro)
* sehr kleine Größe (Streichholzschachtel)
* extrem niedriger Schlafstrom
* lange Batterielebensdauer: 5 Jahre und mehr bei einer CR2032-Zelle
* lange Reichweite (was auch immer das bedeutet :-), aber es ist wirklich lang)
* einfach aufzubauen
* Kommunikationssicherheit
* Plug&Play-Firmware

Sensoren können fast alle sein, wie Temperatur, relative Luftfeuchtigkeit, Luftdruck, Höhenmesser, Lichtintensität, UV-Index, Bewegungsmelder, Reed-Schalter usw.

In der Adapterkonfiguration kann die serielle Schnittstelle und die zugehörige Baudrate eingestellt werden.
Bei aktiviertem Lernmodus werden die Sensoren nach dem ersten Nachrichtenempfang automatisch mit ihrer Node-ID und allen erkannten Datenpunkten angelegt.
Der Lernmodus endet automatisch nach 10 Minuten und kann unter "Info" über den Datenpunkt "learningMode" für weitere 10 Minuten wieder aktiviert werden.
Unter „config“ werden die zugehörigen Offset-Datenpunkte angelegt, damit die Sensorwerte ggf.
Die berechneten Datenpunkte Feuchte absolut und Taupunkt werden unter „berechnet“ angelegt, jedoch nur, wenn der Sensor die Werte Temperatur und relative Feuchte liefert.

Für das Empfängerprotokoll Version 1.01 würden folgende Datenpunkte erstellt:

* Knoten-ID
* RSSI
* Batteriespannung
* Nachrichtenzähler
* Temperatur
* Feuchtigkeit
* Heartbeat (Nur in Protokollversion 1.01)
* Unterbrechung 1, 2 und 3
* Frequenzfehleranzeige (Nur in Protokollversion 1.01)
* RFM69 Temperatur (nur in Protokollversion 1.01)
* Bitfehler

Zusätzlich werden für die Empfängerprotokollversion 2.2 (sofern vorhanden) folgende Datenpunkte erstellt.

* Unterbrechen 4 bis 8
* synchronisiert
* Indikator für die Verbindungsqualität
* Frequenzoffset
* Distanz (Nur mit installiertem Distanzsensor)
* Höhe (Nur mit installiertem Höhensensor)
* Luftdruck (Nur mit installiertem Luftdrucksensor)
* Kontakt (Nur mit eingebautem Reedkontakt)
* Temperatur 1
* Temperatur 2

-------------------------------------------------------------------------------------------

## TiNo-Adapter für ioBroker
Einlesen der vom TiNo Version 1.01 und TiNo Version 2.2 empfangenen Funksensordaten.
Die entsprechende Protokoll-Version wird automatisch anhand der empfangenen Daten erkannt.

Der Funksender und -empfänger TiNo wurden von nurazur Entwickelt.

Projekt-Seite: https://nurazur.wordpress.com/

Github: https://github.com/nurazur/TiNo

"**TI**ny **NO**de" : Batteriebetriebener Funksensor oder Funk-Aktor. Ziel dieses Projekts ist die Entwicklung schnurloser Funk Sensoren, sterben über Batterien versorgt werden und z.B. mit dem Raspberry Pi kommunizieren. Die Entwicklung hat zum Ziel:

* minimale Kosten (Stückkosten unter 5 EUR)
* minimale Grösse (Streichholzschachtel)
* minimaler Stromverbrauch
* maximale Batterielebensdauer (5 Jahre oder mehr)
* maximale Reichweite
* maximal einfach nachzubauen
* Plug&Play-Firmware

Als Sensor kann man so ziemlich alles verwenden, ob Temperatur, Luftfeuchtigkeit, Luftdruck, Höhenmesser, Lichtintensität, UV Index, Anwesenheitssensoren, Magnetschalter, Erschütterungs-Sensoren, Feuchtigkeitsmesser usw. auch im Prinzip alle Arten von Sensoren.

In der Adapter Konfiguration lässt sich die Serielle Schnittstelle und die entsprechende Baudrate einstellen.
If der Anlermodus aktiviert IST, Werden sterben Sensoren nach dem ersten Nachrichten-Empfang automatisch mit ihrer Node-Id und allen erkannten Datenpunkten angelegt.
Der Anlernmodus wird nach 10min. automatisch beendet und kann unter "info" über den Datenpunkt "learningMode" für weitere 10min. erneut aktiviert werden.
Unter "config" werden die zugehörigen offset Datenpunkte erstellt, damit die Sensorwerte bei Bedarf korrigiert werden can.
Unter "berechnet" werden die erechneten Datenpunkte Feuchte absolut und Taupunkt angelegt, jedoch nur wenn der Sensor die Werte Temperatur und relative Feuchte liefert.

Folgende Datenpunkte werden für das Empfänger-Protokoll Version 1.01 angelegt:

* Knoten-ID
* Signalstärke (RSSI)
* Batteriespannung
* Nachrichtenzähler
* Temperatur
* Feuchte
* Heartbeat (Nur in Protokoll Version 1.01)
* Unterbricht 1 bis 3
* Frequenzfehler Indikator (Nur in Protokoll Version 1.01)
* RFM69 Temperatur (Nur in Protokoll Version 1.01)
* Bitfehler

Zusätzlich Werden für das Empfänger-Protokoll Version 2.2 folgende Datenpunkte angelegt (wenn vorhanden).

* Unterbrechen 4 bis 8
* Synchronisation
* Kanalgüte
* Frequenzsatz
* Entfernung (Nur bei installiertem Entfernungssensor)
* Höhe (Nur bei installiertem Höhensensor)
* Luftdruck (Nur bei installiertem Luftdrucksensor)
* Reed-Kontakt (Nur bei installiertem Reed-Kontakt)
* Temperatur 1
* Temperatur 2

## Changelog
### 1.1.0
- Add TiNo Protocol V2.2 support
- (Add Datapoints temperature 1 and Temperatur 2)
- (max value of data point temperature increased to 600)
- Add connectionType and dataSource in io-package.json
- Add testing for Node.js 16

### 1.0.3
- Displays the interrupt value only for short time

### 1.0.2
- (AndrObe) Fix for negative temperature values
- (bowao) Update devDependencies

### 1.0.1
- fix bug in interrupt detection for protocol V2

### 1.0.0
- Update dependencies
- BREAKING CHANGE: Drop node 8 support, requires node 10 or above
- BREAKING CHANGE: js-controller v2.4.0 or above required

### 0.1.3
- Update travis.yml, License, Readme

### 0.1.2
- (bowao) learningMode set to true if not defined

### 0.1.1
- (bowao) New learning mode with 10min. auto-timeout

### 0.1.0
- (bowao) Add tino protocol V2.0 support
- (bowao) Add option to search new data points on already created sensors
- (bowao) Add calculated data points humidity_absolute and dew point

### 0.0.5
- (bowao) Add datapoints interrupt an heartbeat
- (bowao) Set default baudrate to 38400
- (bowao) Close serialport on unload and cleanup

### 0.0.4
- (bowao) Resize logo

### 0.0.3
- (bowao) Update readme

### 0.0.2
- (nurazur) Add logo

### 0.0.1
- (bowao) initial release

## License
MIT License

Copyright (c) 2021 bowao <cryolab@web.de>

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