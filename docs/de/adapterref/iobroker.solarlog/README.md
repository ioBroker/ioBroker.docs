---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.solarlog/README.md
title: ioBroker.solarlog
hash: l1Mmx1JvJjgwj64GW35rCZDCBZMtbJjx4PF3KM6SLnM=
---
![Logo](../../../en/adapterref/iobroker.solarlog/admin/solarlog.png)

![Anzahl der Installationen](http://iobroker.live/badges/solarlog-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.solarlog.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.solarlog.svg)
![NPM](https://nodei.co/npm/iobroker.solarlog.png?downloads=true)
![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.solarlog.svg)

# IoBroker.solarlog
Ein ioBroker-Adapter für Solarlog-Geräte

Die offene Json-Schnittstelle muss im Konfigurationsmenü des Solarlogs aktiviert werden (Konfiguration - System - Zugangskontrolle - Offene Json-Schnittstelle: aktivieren.)

Adapter installieren, Instanz erstellen.
Solarlog einstellen - IP-Adresse (192.XXX.X.XXX), Port (optional) und Polling - Intervall (in Millisekunden). Da der Adapter viele http-Anfragen an Sie sendet, empfehle ich, das Polling-Intervall nicht zu dicht einzustellen. Überprüfen Sie Ihr Debug-Protokoll auf die Zeit, die benötigt wird, um mindestens 10 Sekunden abzufragen oder einzustellen.

Überprüfen Sie, ob alle Wechselrichterdaten erfasst wurden. !! Das User-Passwort im Solarlog muss für diese Option deaktiviert sein !! Achtung: Damit die Abfrage der Unterzähler funktioniert, muss das Benutzerpasswort im Solarlog deaktiviert werden.

Prognose: Optional ruft der Adapter Prognosedaten über die Forecast.Solar-API ab. Tatsächlich werden die Gesamt-kWh von heute und morgen vorhergesagt und stündlich aktualisiert. Detailliertere oder zusätzliche Daten sind auf Anfrage erhältlich (bitte eröffnen Sie eine Ausgabe).

## Hardware
Getestet auf: Solarlog 200PM + / 300PM + / 500 / 1200Meter / 50

SolarLog 50: Es sind keine JSON-Interface @ SolarLog 50-Geräte geöffnet. Bestimmte Werte in den Kanälen 'info' und 'status' lauten daher 'ACCESS DENIED'. Wenn Sie eine andere Lösung bevorzugen, öffnen Sie bitte ein Problem oder veröffentlichen Sie Ihre Präferenzen in einem entsprechenden Problem.

## Changelog

### 1.2.0

-   Shows now forecast data: todays and tomorrows total kWh. Completed translations in words.js.

### 1.1.0

-   Shows detailed information on self - consumption. Imports yearly & monthly historic data.

### 1.0.0

-   Reads now devicetypes, -brands and -classes. Sets correct params for batteries. Displays self-consumption @'status'

### 0.1.6

-   Reads now battery data

### 0.1.5

-   Reads now historic data (yearly sum per Inverter), testing update

### 0.1.4

-   Readme - update

### 0.1.3

-   Core Files/Testing Update and introduce adapter-core

### 0.1.2

-   Inverter/meter - detecion optimized

### 0.1.1

-   support for compact mode

### 0.1.0

-   optional port declaration, readme updated

### 0.0.9

-   another bugfix daysum - function

### 0.0.8

-   bugfix daysum - function

### 0.0.7

-   import of daily sum of production/consumption per inverter/meter in Wh
-   info connection state fixed

### 0.0.6

-   optimized evaluation of number of inverters/meters to import

### 0.0.5

-   better readme
-   correct labes in config-dialogue

Planned for next version: reading solarlog smart energy settings and states

### 0.0.4

-   Inverter-import optional
-   Error - logs refer to functions
-   better readme

Planned for next version: reading solarlog smart energy settings and states

### 0.0.3

New functions added!

-   reads all defined inverters/meters
-   sets objects named as in solarlog
-   gets values (current production/consumption) and states for each inverter

Planned for next version: reading solarlog smart energy settings and states

### 0.0.2 First running version

Defined objects:

-   Time last data sync
-   Installed generator power
-   Total output PAC from all of the inverters and meters in inverter mode.
-   Total output PAC from all of the inverters
-   Average voltage UAC from the inverter
-   Average voltage UDC from the inverter
-   Total yield for the day from all of the inverters
-   Total yield for the previous day from all of the inverters
-   Total yield for the month from all of the inverters
-   Total yield for the year from all of the inverters
-   Total yield from all of the inverters
-   Current total consumption PAC from all of the consumption meters
-   Total consumption from all of the consumption meters
-   Total consumption for the previous day; all of the consumption meters
-   Total consumption for the month; all of the consumption meters
-   Total consumption for the year; all of the consumption meters
-   Accumulated total consumption, all Consumption meter

Planned Objects:

-   Description/Yield/Consuption of all connected inverters and meters

## License

The MIT License (MIT)

Copyright (c) 2018-2019 forelleblau marceladam@gmx.ch

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.