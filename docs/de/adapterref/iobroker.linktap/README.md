---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.linktap/README.md
title: ioBroker.LinkTap
hash: jF+hWbw7bmE0b57AwFFOIqvT0OTnSjQRw+gZY/STN/Q=
---
![Logo](../../../en/adapterref/iobroker.linktap/admin/Logo_small.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.linktap.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.linktap.svg)
![NPM](https://nodei.co/npm/iobroker.linktap.png?downloads=true)

# IoBroker.LinkTap
## IoBroker.linktap
Steuern Sie Ihre Gartenbewässerung mit dem kabellosen Bewässerungstimer von LinkTap. Hersteller: https://www.link-tap.com/

## Installation
Bitte verwenden Sie Node.js 20 oder höher.

## Einstellungen
Erstellen Sie mit Ihren LinkTap-Anmeldeinformationen einen API-Schlüssel unter https://www.link-tap.com/#!/api-for-developers.

Bitte geben Sie den Benutzernamen und den API-Schlüssel in der Konfiguration ein.
Alle verbundenen Gateways und Taplinker werden nach dem Start des Adapters abgerufen. Der Hersteller ermöglicht eine Abfrage aller Gateways und Geräte alle 5 Minuten. Der Adapter führt die Abfrage automatisch stündlich oder bei jedem Neustart durch.

Der Abruf des Bewässerungsstatus kann in der Konfiguration individuell minutengenau eingestellt werden. Es kann bis zu einer Minute dauern, bis der Webservice von LinkTap aktualisierte Bewässerungsinformationen bereitstellt.

Alle von der API bereitgestellten Bewässerungsfunktionen wurden implementiert.

Wichtig: Die gewünschten Zeitpläne müssen vor der Nutzung in der App eingerichtet werden. Diese können dann über den Adapter aktiviert/deaktiviert werden. Dazu müssen zusätzlich die entsprechenden Zustände der Rolle „Argument in“ gesetzt werden.

## Changelog

### 1.0.3
* (Smart-Gang) Update of various dependencies and update to Node 20.

### 1.0.1
* (Smart-Gang) Update of various dependencies and update to Node 18.

### 0.3.0
* (Smart-Gang) Added support for new devices (ValveLinker and multiple-outlet water timer) with 18-digit IDs.

### 0.2.1
* (Smart-Gang) Updated CI testing & dependencies.

### 0.2.0
* (Smart-Gang) Changed types of state 'signal' to number and of button 'StartEcoInstantMode' to boolean.

### 0.1.9
* (Smart-Gang) Community suggestion: The trigger data points (buttons) now have the status set to false by default.

### 0.1.8
* (Smart-Gang) Retrieve historical data (API update from manufacturer) and optimize data point settings.

### 0.1.7
* (Smart-Gang) First public release

## License
MIT License

Copyright (c) 2025 Author <gangrulez@gmail.com>

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