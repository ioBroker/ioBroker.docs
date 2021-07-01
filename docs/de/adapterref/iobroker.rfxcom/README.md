---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.rfxcom/README.md
title: ioBroker.rfxcom
hash: g+sM+YoZCIEaWawTkGsM2PvA9rS3y5erN1M1+/+W3iQ=
---
![Logo](../../../en/adapterref/iobroker.rfxcom/admin/rfxcom.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.rfxcom.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.rfxcom.svg)
![Tests](https://travis-ci.org/ioBroker/ioBroker.rfxcom.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.rfxcom.png?downloads=true)

#ioBroker.rfxcom
Dieser Adapter kommuniziert mit [rfxcom](http://www.rfxcom.com).
Wird zum Empfangen der Daten von Wettersensoren und drahtlosen Netzschaltern verwendet.

Lesen Sie die ausführliche Dokumentation zu RfxCom [Hier](http://www.rfxcom.com/WebRoot/StoreNL2/Shops/78165469/MediaGallery/Downloads/RFXtrx_User_Guide.pdf)

## Verwendung
Um das Anlernen von Sensoren zu ermöglichen, müssen Sie den „Einschlussmodus“ aktivieren.
Der Aufnahmemodus wird standardmäßig für 5 Minuten (300000 ms) aktiviert und nach 5 Minuten automatisch deaktiviert.

Um den Inklusionsmodus für immer zu aktivieren, setzen Sie einfach "Inclusion Timeout" auf 0.

## Paar
Die Geräte erhalten bei jedem Batteriewechsel die neue Adresse.

Also muss nach dem Batteriewechsel neu gelernt werden.

Drücken Sie dazu kurz vor dem Einlegen des Akkus die Pair-Taste und das Gerät wird mit der neuen Adresse eingelernt.

## Machen
**Momentan werden nur Somfy-, Curtain- und Lighting3-Geräte unterstützt.**

<!-- Platzhalter für die nächste Version (am Zeilenanfang):

### __ARBEITEN IN PROGRESS__ -->

## Changelog
### 2.0.1 (2021-06-29)
* (peterbaumert) update packages
* (bluefox) Breaking change: no linux with 32 bit support

### 1.0.1 (2020-08-05)
* (bluefox) Compact mode
* (bluefox) Support of node 10 added
* (bluefox) Refactoring

### 0.1.0 (2016-07-05)
* (bluefox) initial commit

## License
The MIT License (MIT)

Copyright (c) 2017-2020, Bluefox<dogafox@gmail.com>

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