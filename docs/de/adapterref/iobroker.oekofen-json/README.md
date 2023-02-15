---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.oekofen-json/README.md
title: ioBroker.oekofen-json
hash: DhMxRMvL6WhO/HOntnwCO2LI4UaMihgYKmRnjeQjpFE=
---
![Logo](../../../en/adapterref/iobroker.oekofen-json/admin/oekofen-json.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.oekofen-json.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.oekofen-json.svg)
![Anzahl der Installationen](https://iobroker.live/badges/oekofen-json-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/oekofen-json-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/chaozmc/iobroker.oekofen-json.svg)
![NPM](https://nodei.co/npm/iobroker.oekofen-json.png?downloads=true)

# IoBroker.oekofen-json
**Tests:** ![Testen und freigeben](https://github.com/chaozmc/ioBroker.oekofen-json/workflows/Test%20and%20Release/badge.svg)

## Oekofen-json-Adapter für ioBroker
### Beschreibung
Dieser Adapter verbindet eine OekoFEN Heizung mit der neuen Touch-Oberfläche (auch [Pelletronic-Touch](https://www.oekofen.com/en-gb/pelletronic-touch/) genannt) mit ioBroker. Da OekoFEN die JSON-Schnittstelle Schritt für Schritt und ohne öffentlich verfügbare Dokumentation implementiert hat, sollte sie mindestens mit Version 3.10d und neuer funktionieren.
Da es viele Kombinationen von Heizungen, Solarmodulen, Schichtspeichern, Sterlingmotoren usw. gibt, versucht dieser Adapter, alle verfügbaren Datenpunkte aus der Schnittstelle zu lesen und erstellt die Objekte beim Start on the fly.

Schreibgeschützte Datenpunkte werden so erstellt, dass diese mit dem Präfix L_ in ihrem Namen beginnen. Außerdem rechnet der Adapter die Skalierung der Zahl entsprechend den von der Schnittstelle bereitgestellten Informationen (factor-Attribut) um. Handelt es sich bei der Heizung zum Beispiel um Temperaturen im Format XXX und Faktor 0,1, wird dies vom Adapter bei Leseoperationen in XX.X und bei Schreiboperationen wieder in XXX umgewandelt.

### Installation
Nach der Installation muss es nur noch eingegeben werden

* die IP,
* TCP-Port,
* das "sogenannte" Passwort
* und das Intervall

an dem der Adapter versucht, die Updates abzurufen.

Der Adapter behält den verbundenen Zustand bei, auch wenn keine echte dauerhafte Verbindung besteht. Wenn das Gerät einen Fehler sendet oder der Adapter den OekoFEN Controller nicht kontaktieren kann, setzt er den Connected State auf false. Dies könnte zum Beispiel passieren, wenn zu viele Anfragen an den Controller gehen, der dann mit HTTP 401 antwortet. Unter normalen Bedingungen sollte das Ratenlimit des Controllers nicht erreicht werden (2,5 Sekunden zwischen Anfragen).

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS** 
-->

### 1.0.1 (2023-01-21)
* (chaozmc) Fixed extensive object creation when using a wrong password (fixes Issue #18)
* (chaozmc) Added counter to stop adapter after 10 unsuccessful requests
* (chaozmc) Added check if there would be more than 50 top-level-objects to be created

### 1.0.0 (2023-01-15)
* (chaozmc) Push version to v1.0.0 as the code seems to be considerable as first stable release

### 0.3.0 (2023-01-15)
* (chaozmc) Changed Adapter Type to more suitable climate-control instead of communication
* (chaozmc) Altered query URL for inital scan to use single ?-symbol instead of double

### 0.2.5 (2022-11-18) 
* (chaozmc) Removed unnecessary const

### 0.2.4 (2022-10-31) 
* (chaozmc) changed loop behaviour to use a for...of loop instead of forEach to avoid parallel creation of too many objects at startup

### **0.0.3**
* (chaozmc) code cleanup, trigger for update & rescan

### **0.0.2**
* (chaozmc) first working release, fixed 0-value updates

### **0.0.1**
* (chaozmc) initial build phase, much try and error

## License
MIT License

Copyright (c) 2022 chaozmc <chaozmc@is-jo.org>

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