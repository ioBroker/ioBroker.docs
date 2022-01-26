---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.artnet-recorder/README.md
title: ioBroker.artnet-recorder
hash: uqpn2PwrGT4aqZ2T/Sl0mi7zIRGu9XbQzyyNNeHUYrs=
---
![Logo](../../../en/adapterref/iobroker.artnet-recorder/admin/artnet-recorder.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.artnet-recorder.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.artnet-recorder.svg)
![Anzahl der Installationen (neueste)](http://iobroker.live/badges/artnet-recorder-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/artnet-recorder-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/Bannsaenger/iobroker.artnet-recorder.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/Bannsaenger/ioBroker.artnet-recorder/badge.svg)
![NPM](https://nodei.co/npm/iobroker.artnet-recorder.png?downloads=true)

# IoBroker.artnet-Recorder
## Artnet-Recorder-Adapter für ioBroker
Zeichnen Sie Art-Net-Daten zur späteren Wiedergabe in einer Datei auf

## Zweck
Einfacher Adapter zum Aufzeichnen von Art-Net-Daten, die per Broadcast an eine json-Datei gesendet werden, die sich in den Benutzerdaten befindet.
Zeichnen Sie nur die Änderung der DMX-Werte auf.
Die Wiedergabe sendet die Daten unverändert mit dem in der JSON-Datei gespeicherten Timing.
Wenn der Merge-Modus LTP oder HTP ist, hört der Server auf alle ArtDMX-Pakete, die durch das Netzwerk gesendet werden, und versucht, ein tatsächliches DMX-Datenbild zu haben, um die gespeicherten Werte hinzuzufügen.
Das Intervall bzw. die Schrittweite zum Senden der Daten wird durch die Konfiguration festgelegt.

## Changelog

### 0.0.1
* (Bannsaenger) initial release

### 0.0.2
* (Bannsaenger) added engine and prepared for review

### 0.0.3
* (Bannsaenger) fixed comments from code review

## License
MIT License

Copyright (c) 2021-2022 Bannsaenger <bannsaenger@gmx.de>

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