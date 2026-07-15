---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.heizoel24-mex/README.md
title: ioBroker.heizoel24-mex
hash: CzYN8HTeTVyfkIUXiwxe5VPHqfyFg25XnDuFVq5bpiE=
---
![Logo](../../../en/adapterref/iobroker.heizoel24-mex/admin/heizoel24-mex.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.heizoel24-mex.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.heizoel24-mex.svg)
![Anzahl der Installationen](https://iobroker.live/badges/heizoel24-mex-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/heizoel24-mex-stable.svg)
![NPM](https://nodei.co/npm/iobroker.heizoel24-mex.png?downloads=true)

# IoBroker.heizoel24-mex
**Tests:** ![Test und Freigabe](https://github.com/ltspicer/ioBroker.heizoel24-mex/workflows/Test%20and%20Release/badge.svg)

## Heizoel24-MEX-Adapter für ioBroker
Das MEX ist ein Heizöl-Füllstandsmessgerät. Dieser Adapter liest die MEX-Daten vom Heizoel24-Server aus.

Siehe: https://www.heizoel24.de/mex

## Verwenden:
Geben Sie einfach die Anmeldedaten Ihres Heizoel24-Kontos (E-Mail-Adresse und Passwort) ein.<br> Die MEX-Daten sind im Datenpunkt heizoel24-mex gespeichert.<br> Der Adapter startet standardmäßig alle 3 Stunden. Das ist völlig ausreichend, da der MEX nur einmal täglich Daten sendet.<br> Die Datenpunkte CalculatedRemaining/JsonForEcharts (berechnete Restmenge) und OilUsage/JsonForEcharts können direkt mit eCharts verwendet werden.<br> Der Adapter kann Daten via MQTT senden.<br> Die Original-App berechnet die jährliche Nutzung immer zum 31. Dezember.<br> Das ist unpraktisch, da dies mitten in der Heizperiode geschieht.<br> Dieser Adapter kann den Jahresverbrauch auf Basis eines bestimmten Monats berechnen.<br>

## Changelog
### 1.10.1 (2026-06-12)

- allowScripts esbuild and protobufjs

### 1.10.0 (2026-05-29)

- More translations added

### 1.9.3 (2026-05-29)

- Translation issues resolved

### 1.9.2 (2026-05-26)

- Fix: Prevent crash on network errors by safely handling axios exceptions…
- Issues E0036 & E5050 resolved

### 1.9.1 (2026-05-22)

- Fix: Prevent crash on network errors by safely handling axios exceptions & Remove unused main1.js backup file

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025-2026 Daniel Luginbühl <webmaster@ltspiceusers.ch>

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