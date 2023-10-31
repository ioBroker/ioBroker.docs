---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.signifylights/README.md
title: ioBroker.signifylights
hash: jpUQ+tfhgmQ6g52wkjjx1e1umiIRldRNMrcgAASm6Tc=
---
![Logo](../../../en/adapterref/iobroker.signifylights/admin/signifylights.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.signifylights.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.signifylights.svg)
![Anzahl der Installationen](https://iobroker.live/badges/signifylights-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/signifylights-stable.svg)
![NPM](https://nodei.co/npm/iobroker.signifylights.png?downloads=true)

# IoBroker.signifylights
**Tests:** ![Test und Freigabe](https://github.com/disaster123/ioBroker.signifylights/workflows/Test%20and%20Release/badge.svg)

## Signifylights-Adapter für ioBroker
Signify Lights-Adapter für alle Arten von Signify WLAN-Leuchten wie WIZ, Philips WLAN und viele mehr ...

Fragen und Diskussion hier: https://forum.iobroker.net/topic/69656/test-adapter-signifylights

### HAFTUNGSAUSSCHLUSS
Dieses Projekt ist NICHT mit WIZ, Signify oder Philips verbunden, wird nicht finanziert oder steht in irgendeiner Weise mit diesen in Verbindung. Alle Marken- und Produktnamen sind Warenzeichen oder eingetragene Warenzeichen ihrer jeweiligen Inhaber.
Der Verweis auf einen Firmen- oder Produktnamen stellt keine Billigung oder Empfehlung dieses Unternehmens oder Produkts unter Ausschluss anderer dar.

## Changelog
### 0.3.0 (2023-10-27)
* several translation fixes
* replace logo
* use adapter interval instead of timeout
* new DEVICES: ESP24_SHRGBC_01 + ESP25_SHWRGB_01 + ESP15_SHRGB1S_01I
* config: allow to run without udp mac and ip set

### 0.2.0 (2023-05-02)
* more setTimeout fixes

### 0.1.1 (2023-05-01)
* fix setTimeout calls in async functions

### 0.1.0 (2023-05-01)
* various fixes and changes to become an official adapter

### 0.0.6 (2023-04-30)
* first release under new name

## License
MIT License

Copyright (c) 2023 disaster123 <stefan-iobroker@prie.be>

originally developed by Copyright (c) 2022 nxtstep <privat@konzeptplus.net>

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