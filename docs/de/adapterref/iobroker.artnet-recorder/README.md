---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.artnet-recorder/README.md
title: ioBroker.artnet-recorder
hash: IVN89sZAHrOrE2Bb/tN/BDBrOWsBhHCcsKMgefS2HhU=
---
![Logo](../../../en/adapterref/iobroker.artnet-recorder/admin/artnet-recorder.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.artnet-recorder.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.artnet-recorder.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/artnet-recorder-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/artnet-recorder-stable.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/Bannsaenger/ioBroker.artnet-recorder/badge.svg)
![NPM](https://nodei.co/npm/iobroker.artnet-recorder.png?downloads=true)

# IoBroker.artnet-recorder
![Test und Freigabe](https://github.com/bannsaenger/iobroker.artnet-recorder/workflows/Test%20and%20Release/badge.svg)

## Artnet-Recorder-Adapter für ioBroker
Art-Net-Daten in einer Datei speichern, um sie später wiederzugeben

## Zweck
Einfacher Adapter zur Aufzeichnung von Art-Net-Daten, die per Broadcast an eine JSON-Datei im Benutzerdatenverzeichnis gesendet werden.
Aufgezeichnet werden nur die Änderungen der DMX-Werte.
Die Wiedergabe sendet die Daten unverändert mit den in der JSON-Datei gespeicherten Zeitangaben.
Im Merge-Modus LTP oder HTP empfängt der Server alle über das Netzwerk gesendeten ArtDMX-Pakete und versucht, ein aktuelles DMX-Datenbild zu erstellen, um die gespeicherten Werte hinzuzufügen. Das Sendeintervall bzw. die Schrittweite der Datenübertragung wird über die Konfiguration festgelegt.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (Bannsaenger) updated dependencies and issues from repository checker

### 0.1.5 (2025-10-24)
* (Bannsaenger) updated dependencies and issues from repository checker
* (Bannsaenger) migrate to NPM Trusted Publishing

### 0.1.4 (2025-09-06)
* (Bannsaenger) updated dependencies and issues from repository checker

### 0.1.3 (2025-02-25)
* (Bannsaenger) previous release did not work

### 0.1.2 (2025-02-25)
* (Bannsaenger) updated admin dependency

### 0.1.1 (2025-01-21)
* (Bannsaenger) removed script build on deploy

## License
MIT License

Copyright (c) 2021-2026 Bannsaenger <bannsaenger@gmx.de>

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

Credit:
 [Art-Net™ Designed by and Copyright Artistic Licence Holdings Ltd](https://art-net.org.uk)