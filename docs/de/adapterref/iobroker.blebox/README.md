---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.blebox/README.md
title: ioBroker.blebox
hash: 8oNPKG+hEgovErukFkieAYGOQYu1hwgt3nGJXZYLh58=
---
![Logo](../../../en/adapterref/iobroker.blebox/admin/blebox.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.blebox.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.blebox.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/ka-vaNu/ioBroker.blebox/badge.svg)
![NPM](https://nodei.co/npm/iobroker.blebox.png?downloads=true)

# IoBroker.blebox
## Blebox-Adapter für ioBroker
[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=8JKRSMB8LS76S)

Adapter zur Steuerung der Smarthome-Geräte des Herstellers [blebox](https://blebox.eu/). Die API-Beschreibung finden Sie [hier](https://technical.blebox.eu/). Die Implementierung erfolgte ohne Unterstützung des Herstellers.

Eine unvollständige und veraltete API-Simulation kann heruntergeladen werden [Hier](https://github.com/blebox/blebox-virtual-devices).

Die folgenden Geräte werden derzeit unterstützt:

| Gerät | API-Typ | Status |
|----------------------|---------------------|-----------------------------------------|
| airsensor | airsensor | ❓ Alpha, weder mit echter Hardware noch einer API-Simulation getestet |
| Gatebox | Gatebox | ✅ Getestet |
| Multisensor | Multisensor | bis zu 8 Sensoren pro Gerät werden unterstützt |
| TempSensor PRO | Multisensor | ❓ Beta, nicht mit echter Hardware getestet |
| tempSensorAC | Multisensor | ❓ Beta, nicht mit echter Hardware getestet |
| Feuchtigkeitssensor | Multisensor | ❓ Beta, nicht mit echter Hardware getestet |
| WindSensor PRO | Multisensor | ❓ Beta, nicht mit echter Hardware getestet |
| Hochwassersensor | Multisensor | ❓ Beta, nicht mit echter Hardware getestet |
| Regensensor | Multisensor | ❓ Beta, nicht mit echter Hardware getestet |
| Saunabox | Saunabox | ❓ Beta, nicht mit echter Hardware getestet |
| shutterbox | shutterbox | ✅ Geprüft |
| shutterBoxDC | shutterBox | ❓ Beta, nicht mit echter Hardware getestet |
| shutterBoxDIN | shutterBox | ❓ Beta, nicht mit echter Hardware getestet |
| Schaltkasten | Schaltbox | ✅ Geprüft |
| switchBoxD | switchBoxD | ❓ Beta, nicht mit echter Hardware getestet |
| switchBoxDC | switchBoxD | ❓ Beta, nicht mit echter Hardware getestet |
| switchBox DIN | switchBox | ❓ Beta, nicht mit echter Hardware getestet |
| switchBoxD DIN | switchBoxD | ❓ Beta, nicht mit echter Hardware getestet |
| switchBoxT PRO | switchBoxD | ❓ Beta, nicht mit echter Hardware getestet |
| Tempsensor | Tempsensor | ❓ Beta, nicht mit echter Hardware getestet |
| tvlift | tvlift | ❓ Beta, nicht mit echter Hardware getestet |

## Changelog

<!--
    Placeholder for the next version:
    ### **WORK IN PROGRESS**
-->

### 2.2.3 (2025-02-13)

* (Kai van Nuis) Support for airsensor, alpha, neither tested with real Hardware nor an API-Simulation
* (Kai van Nuis) Support both relay on switchBoxD

### 2.2.1 (2024-12-26)

* (Kai van Nuis) Support for multi-device APIs
  
* ### 2.2.0 (2024-12-21)

* (Kai van Nuis) Support for multi-device APIs

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

Copyright (c) 2025 Kai van Nuis <kai@vannuis.de>

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