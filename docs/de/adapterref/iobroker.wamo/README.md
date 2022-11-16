---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.wamo/README.md
title: ioBroker.wamo
hash: 1d30Q1AUHOsYbjAwwPiega1VUgb93964BIzEdfTSDak=
---
![Logo](../../../en/adapterref/iobroker.wamo/admin/wamo.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.wamo.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.wamo.svg)
![Anzahl der Installationen](https://iobroker.live/badges/wamo-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/wamo-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/smarthausleben/iobroker.wamo.svg)
![NPM](https://nodei.co/npm/iobroker.wamo.png?downloads=true)

# IoBroker.wamo
**Tests:** ![Testen und freigeben](https://github.com/smarthausleben/ioBroker.wamo/workflows/Test%20and%20Release/badge.svg)

## Wamo-Adapter für ioBroker
Dieser Adapter fügt Ihrer ioBroker-Installation eine „wamo“-Auslaufschutzüberwachung hinzu.

Der Adapter wird an Ihr Auslaufschutzgerät **SYR SafeTech Connect 2422** oder **POLYGONVATRO** angeschlossen, um Daten vom Gerät auszulesen und einige statistische Daten wie den Verlauf des Wasserverbrauchs zu erstellen.

SYR SaveTech Connect 2422: https://www.syr.de/de/Produkte/CB9D9A72-BC51-40CE-840E-73401981A519/SafeTech-Connect Die POLYGONVATRO-Einheit ist unter der Haube eine SYR SaveTech Connect 2422-Einheit, jedoch ohne Druck -, Temperatur- und Leitfähigkeitssensor. Die POLYGONVATRO-Einheit ist derzeit nicht verfügbar.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.2.13 (2022-10-12)
* (smarthausleben) add: new property "createoOnStartup" in DeviceParameter
* (smarthausleben) add: new property "saveRawData" in DeviceParameter
* (smarthausleben) change: creating all state objects during startup to avoid calling "setObjectNotExistsAsync" later on
* (smarthausleben) add: Profile parameter raw states
* (smarthausleben) change: default value for "factor_german_water_hardnes" changed to 0.0296041666666667
* (smarthausleben) FIX update german water hardnes factor object (GHARDFACTOR) during startup 

### 0.2.12 (2022-09-20)
* (smarthausleben) Release 0.2.12

### 0.2.11 (2022-09-19)
* (smarthausleben) Release 0.2.11

### 0.2.10 (2022-09-19)
* (smarthausleben) state types changed UNI, PSD, CSD, TSD, T2
* (smarthausleben) states changable UNI, PSD, CSD, TSD, T2
* (smarthausleben) added DeviceControls RST (restart device)
* (smarthausleben) new channel DeviceControl
* (smarthausleben) added unit for GHARDNESS (°dH)
* (smarthausleben) new state GHARDFACTOR (calculation factor German water hardnes)

### 0.2.9 (2022-08-12)
* (smarthausleben) states changable ATP, BTB, BSA, BUZ, DMA, DRP, IDS, LNG, LWT
* (smarthausleben) state types changed ATP, BSA, BUZ, DMA, DRP, DWL, IDS, LNG, LWT
* (smarthausleben) added states TMZ, TN, 71, ALD, CLP, BPB
* (smarthausleben) added channel and states for self learning: SLP, SLO, SOF, SMF, SLE, SLV, SLT, SLF
* (smarthausleben) change splitted options into two tabs 
* (smarthausleben) added options to define timeout for axios request 
* (smarthausleben) added options for delay time between reconection try to device if connection got lost
* (smarthausleben) change - exported Parameter declarations and parameter collections for timer into a seperate file 'lib/device-parameters.js'

## License
MIT License

Copyright (c) 2022 smarthausleben <info@smarthausleben.de>

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