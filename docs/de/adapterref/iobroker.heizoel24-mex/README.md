---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.heizoel24-mex/README.md
title: ioBroker.heizoel24-mex
hash: eiLDLxzEp5ZZdD+z7glNxntKsqg5jT+R/FB9/3wobx0=
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
Der MEX ist ein Heizöl-Füllstandsmessgerät. Dieser Adapter liest die MEX-Daten vom Heizoel24-Server aus.

Siehe: https://www.heizoel24.de/mex

## Verwenden:
Geben Sie einfach die Zugangsdaten Ihres Heizoel24-Kontos (E-Mail und Passwort) ein.
Die MEX-Daten werden im Datenpunkt heizoel24-mex gespeichert.
Der Adapter startet standardmäßig alle 3 Stunden. Dies ist völlig ausreichend, da der MEX nur einmal täglich Daten sendet.
Die Datenpunkte CalculatedRemaining/JsonForEcharts (berechnete Restmenge) und OilUsage/JsonForEcharts können direkt mit eCharts verwendet werden.

## Changelog
### 1.4.5 (2025-08-29)

- Depends updated

### 1.4.4 (2025-06-21)

- README.md & README-de.md corrected

### 1.4.3 (2025-06-21)

- io-package.json > admin set to >=7.4.10

### 1.4.2 (2025-06-17)

- Bug fix jsonConfig.json : xs,sm, md, ...

### 1.4.1 (2025-06-17)

- Bug fix jsonConfig.json : size removed

### 1.4.0 (2025-06-17)

- OilUsage (Oil consumption per month) added

### 1.3.5 (2024-08-08)

js-controller dependency updated

### 1.3.3 (2024-06-04)

Fix: no error if CalculatedRemaining is empty and mqtt is active

### 1.3.2 (2024-06-04)

Error intercepted for:
- RemainsUntilCombined no data found
- CalculatedRemaining is empty

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

Copyright (c) 2025 Daniel Luginbühl <webmaster@ltspiceusers.ch>

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