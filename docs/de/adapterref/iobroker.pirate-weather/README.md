---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.pirate-weather/README.md
title: ioBroker.pirate-weather
hash: vfcXHjLWFI2b6N8KXegJnsg1uiVesXTbE0zhHfWPaoM=
---
![Logo](../../../en/adapterref/iobroker.pirate-weather/admin/pirate-weather.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.pirate-weather.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.pirate-weather.svg)
![Anzahl der Installationen](https://iobroker.live/badges/pirate-weather-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/pirate-weather-stable.svg)
![NPM](https://nodei.co/npm/iobroker.pirate-weather.png?downloads=true)

# IoBroker.pirate-weather
**Tests:** ![Testen und Freigeben](https://github.com/ticaki/ioBroker.pirate-weather/workflows/Test%20and%20Release/badge.svg)

## Piratenwetteradapter für ioBroker
Daten von Pirate-Weather abrufen.

Den benötigten API-Token erhalten Sie hier: https://docs.pirateweather.net/en/latest/ Der Rest sollte selbsterklärend sein.
Die Erklärung der einzelnen Datenpunkte finden Sie hier: https://docs.pirateweather.net/en/latest/API/

Symbole: von icebear (kostenlos verwendbar)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.7.0 (2025-09-30)
- (ticaki) Added comprehensive astronomy data to daily forecast: twilight times, day/night length, solar noon, moonrise/moonset, and lunar transit
- (ticaki) Added human-readable time formats (HH:MM:SS) for duration fields

### 0.6.2 (2025-09-27)
- (ticaki) more robust fetch usage

### 0.6.1 (2025-09-26)
- (ticaki) Use the default icons for mostly-

### 0.6.0 (2025-09-25)
- (ticaki) icons from icebear added

### 0.5.0 (2025-09-24)
- (ticaki) Code migration from axios to node:fetch
- (ticaki) Corrected roles for visualisation (lovelance) fixes #19

### 0.4.1 (2025-09-12)
- (ticaki) Humidity is now displayed correctly in percent.  fixes #15
- (ticaki) Wind direction text is now translated into the system iobroker language. fixes #16

### 0.4.0 (2025-08-28)
- (ticaki) In the CA system of units, precipAccumulation is now output in mm.
- (ticaki) Use api version 2

### 0.3.0 (2025-08-25)
- (ticaki) update deps - inital latest release
- (ticaki) increase delay by 1.5 seconds

### 0.2.0 (2025-08-16)
- (ticaki) Configuration option to enter an interval in minutes. In the event of an error, no accelerated reconnection is used here.
- (ticaki) Use system language for summaries.

### 0.1.4 (2025-08-15)
- (ticaki) Ignore ECONNABORTED error code
- (ticaki) In the event of an error, new connection attempt in 10 minutes
- (ticaki) missing % added
- (ticaki) Startup log message added.

### 0.1.3 (2025-08-12)
- (ticaki) BREAKING: cloudCover, precipProbability, humidity and moonPhase are now percentage values

### 0.1.2 (2025-08-10)
- (ticaki) update icon

### 0.1.1 (2025-08-10)
- (ticaki) First version for the iobroker repository

### 0.1.0 (2025-08-09)
- (ticaki) units (us, ca, uk) added
- (ticaki) beautiful states :)
- (ticaki) Zero minutes and seconds in the interval.
- (ticaki) fixed: Language undefined not exist!

### 0.0.7 (2025-08-09)
- (ticaki) data removed from enumeration names

## License

MIT License

Copyright (c) 2025 ticaki <github@renopoint.de>

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