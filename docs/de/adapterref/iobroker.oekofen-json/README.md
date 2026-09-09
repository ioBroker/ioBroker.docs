---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.oekofen-json/README.md
title: ioBroker.oekofen-json
hash: zdn+Hu3qc5ThAR3NqNSucR7KhDE8tvjxxnNeeuWGH20=
---
![Logo](../../../en/adapterref/iobroker.oekofen-json/admin/oekofen-json.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.oekofen-json.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.oekofen-json.svg)
![Anzahl der Installationen](https://iobroker.live/badges/oekofen-json-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/oekofen-json-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/chaozmc/iobroker.oekofen-json.svg)
![NPM](https://nodei.co/npm/iobroker.oekofen-json.png?downloads=true)
![Test und Freigabe](https://github.com/chaozmc/ioBroker.oekofen-json/workflows/Test%20and%20Release/badge.svg)

# ioBroker.oekofen-json

## oekofen-json-Adapter für ioBroker

### Beschreibung

Dieser Adapter verbindet eine OekoFEN-Heizung mit der neuen Touch-Oberfläche (auch [Pelletronic Touch](https://www.oekofen.com/en-gb/pelletronic-touch/) genannt) mit ioBroker. Da OekoFEN die JSON-Schnittstelle schrittweise und ohne öffentlich verfügbare Dokumentation implementiert hat, sollte sie mindestens ab Version 3.10d funktionieren. Aufgrund der Vielzahl an Kombinationen von Heizungen, Solarmodulen, Speichersystemen, Sterling-Motoren usw. liest dieser Adapter alle verfügbaren Datenpunkte der Oberfläche und erstellt die Objekte beim Start dynamisch.

Schreibgeschützte Datenpunkte werden anhand des Präfixes „L\_“ im Namen erstellt. Der Adapter skaliert die Zahlenwerte entsprechend den Informationen der Schnittstelle (Faktorattribut). Beispielsweise verarbeitet die Heizung Temperaturen im Format XXX mit dem Faktor 0,1. Dies wird vom Adapter bei Leseoperationen in XX,X und bei Schreiboperationen wieder in XXX umgewandelt.

### Installation

Nach der Installation ist lediglich die Eingabe erforderlich.

- die IP,
- TCP-Port
- das "sogenannte" Passwort
- und das Intervall

zu welchem Zeitpunkt der Adapter versucht, die Aktualisierungen abzurufen.

Der Adapter behält den Verbindungsstatus bei, selbst wenn keine dauerhafte Verbindung besteht. Sendet das Gerät einen Fehler oder kann der Adapter den OekoFEN-Controller nicht erreichen, wird der Verbindungsstatus auf „false“ gesetzt. Dies kann beispielsweise bei einer zu hohen Anzahl von Anfragen an den Controller passieren, der dann mit HTTP 401 antwortet. Unter normalen Bedingungen sollte das Ratenlimit des Controllers (2,5 Sekunden zwischen Anfragen) nicht erreicht werden.

## Credits

Dieser Adapter wäre ohne die großartige Arbeit von Markus Feiler (chaozmc) <https://github.com/chaozmc> , der frühere Versionen dieses Adapters erstellt hat, nicht möglich gewesen.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now

### 2.0.0 (2025-11-26)
* (mcm1957) Adapter has been migrated to iobroker-community-adapters organisation
* (mcm1957) Adapter requires node.js >= 20, js-controller >= 6.0.11 and admin >= 7.6.17 now
* (mcm1957) Dependencies have been updated

### 1.0.5 (2023-09-23)
* (chaozmc) set min node version to 18.x (merge pull request #23)

### 1.0.4 (2023-09-22)
* (chaozmc) Removed Node 16.x from Test-and-release (fix Issue #19)
* (chaozmc) updated dependencies
* (chaozmc) updated protobufjs and google-gax
* (chaozmc) updated word-wrap

### 1.0.3 (2023-05-09)
* (chaozmc) Bump version

### 1.0.2 (2023-05-09)
* (chaozmc) Added missing translations
* (chaozmc) Updated Copyright Year
* (chaozmc) Added .releaseconfig.json for release-script
* (chaozmc) changed github workflow config

### **0.0.3**
* (chaozmc) code cleanup, trigger for update & rescan

### **0.0.2**
* (chaozmc) first working release, fixed 0-value updates

### **0.0.1**
* (chaozmc) initial build phase, much try and error

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.oekofen-json/blob/main/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2023 chaozmc <chaozmc@is-jo.org>

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