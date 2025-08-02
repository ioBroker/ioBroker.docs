---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.heizoel24-mex/README.md
title: ioBroker.heizoel24-mex
hash: tw1pepMs2bnt9iPaEVBs3+H0IZPf9T/S1wr3GeJaJTs=
---
![Logo](../../../en/adapterref/iobroker.heizoel24-mex/admin/heizoel24-mex.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.heizoel24-mex.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.heizoel24-mex.svg)
![Anzahl der Installationen](https://iobroker.live/badges/heizoel24-mex-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/heizoel24-mex-stable.svg)
![NPM](https://nodei.co/npm/iobroker.heizoel24-mex.png?downloads=true)

# IoBroker.heizoel24-mex
**Tests:** ![Testen und Freigeben](https://github.com/ltspicer/ioBroker.heizoel24-mex/workflows/Test%20and%20Release/badge.svg)

## Heizoel24-mex Adapter für ioBroker
Der MEX ist ein Heizöl-Niveaumessgerät. Dieser Adapter liest die MEX-Daten vom Heizoel24-Server aus.

Siehe: https://www.heizoel24.de/mex

## Verwenden:
Geben Sie dazu einfach die Login-Daten aus Ihrem Heizoel24-Account ein (E-Mail und Passwort).
Die MEX-Daten werden im Datenpunkt heizoel24-mex gespeichert.
Der Adapter startet standardmäßig alle 3 Stunden. Das ist völlig ausreichend, da der MEX nur einmal am Tag Daten sendet.
Der Datenpunkt CalculatedRemaining/JsonForEcharts (berechnete Restmenge) kann direkt mit eCharts geöffnet werden.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.3.1 (2024-03-24)

- CalculatedRemaining json data point for eCharts added

### 1.3.0 (2024-03-24)

- New README.md
- CalculatedRemaining data points removed

### 1.2.0 (2024-03-16)

- CalculatedRemaining data points renamed to "Today+XXXX Days"
- Limited to 52 data points
- Option for save CalculatedRemaining json

### 1.1.0 (2024-03-09)

- Superfluous logging function removed

### 1.0.1-alpha.0 (2024-03-08)

- Repo new triggering

### 1.0.0 (2024-03-08)

- Initial release for tests

## License
MIT License

Copyright (c) 2024 Daniel Luginbühl <webmaster@ltspiceusers.ch>

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