---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.blebox/README.md
title: ioBroker.blebox
hash: bKDXQL6LW99S799H2zL7OE52xepqYUczF+xpwn0Fcds=
---
![Logo](../../../en/adapterref/iobroker.blebox/admin/blebox.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.blebox.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.blebox.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/ka-vaNu/ioBroker.blebox/badge.svg)
![NPM](https://nodei.co/npm/iobroker.blebox.png?downloads=true)

# IoBroker.blebox
## Blebox-Adapter für ioBroker
Adapter zur Steuerung der Smarthome-Geräte des Herstellers [blebox](https://blebox.eu/). Die API-Beschreibung finden Sie [hier](https://technical.blebox.eu/). Die Umsetzung erfolgte ohne Unterstützung des Herstellers.

Eine unvollständige und veraltete API-Simulation kann heruntergeladen werden [Hier](https://github.com/blebox/blebox-virtual-devices).

Folgende Geräte werden derzeit unterstützt:

* Verschlusskasten
* Schaltkasten
* Saunabox
* Temperatursensor
* Gatebox
* Fernsehlift
* Multisensor – nicht mit echter Hardware getestet, bis zu 4 Sensoren werden unterstützt

## Changelog

<!--
    Placeholder for the next version:
    ### **WORK IN PROGRESS**
-->

### 2.1.0 (2023-10-13)

* (Kai van Nuis) Support for multiSensor

### 2.0.1 (2023-03-12)

* (Kai van Nuis) Update dependecies

### 2.0.0 (2022-09-18)

* (Kai van Nuis) Change to Admin UI 5

### 1.1.0

* Support for gateBox implemented and eslint converted

### 0.1.2

* Fixes due to code review
### 0.1.1

* First stable release

## License
MIT License

Copyright (c) 2023 Kai van Nuis <kai@vannuis.de>

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