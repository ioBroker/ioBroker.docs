---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.accuweather/README.md
title: ioBroker.accuweather
hash: TadMzyLupLTq8YRjYAiMbsBteDVD8BaYJr2j8x5OzSo=
---
![Logo](../../../en/adapterref/iobroker.accuweather/admin/accuweather.png)

![Anzahl der Installationen](http://iobroker.live/badges/accuweather-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.accuweather.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.accuweather.svg)
![NPM](https://nodei.co/npm/iobroker.accuweather.png?downloads=true)

# IoBroker.accuweather
## AccuWeather-Adapter für ioBroker
Wettervorhersage mithilfe der AccuWeather API.

Adapter empfängt

- Aktuelle Bedingungen (stündlich aktualisiert), (24 Anfragen)
- 5-Tage-Vorhersage (tägliche Aktualisierung um ca. 7 Uhr und 20 Uhr), (2 Anfragen)
- und 12-Stunden-Vorhersage (alle sechs Stunden um 0:00, 6:00, 12:00 und 18:00 Uhr aktualisiert). (4 Anfragen)

Standardmäßig aktualisiert der Adapter beim Neustart nur veraltete Daten.
Es sind 50 Anfragen pro Tag zulässig. Für jeden Neustart wären 3 Anfragen erforderlich, um alle Daten zu aktualisieren.

## Erste Schritte
### API-Schlüssel abrufen
Um einen API-Schlüssel zu erhalten, registrieren Sie sich unter https://developer.accuweather.com/ und erstellen Sie eine Anwendung im Menü `My Apps`.
Sobald die Anwendung erstellt ist, wird ein API-Schlüssel generiert.
Für die kostenlose Nutzung können Sie 50 Anfragen an die API pro Tag stellen.
Es wurde darauf hingewiesen, dass für die Funktionsfähigkeit der API die folgenden Einstellungen bevorzugt werden (bitte wählen Sie Ihr Land aus!): ![Einstellungen](../../../en/adapterref/iobroker.accuweather/admin/image.png)

### Standortschlüssel abrufen
Um den Standortschlüssel zu erhalten, gehen Sie zu https://www.accuweather.com/ und geben Sie Ihren Städtenamen ein oder versuchen Sie, Ihre Koordinaten (Breitengrad, Längengrad) so einzugeben, wie Sie sie haben, z. B. in den ioBroker-Einstellungen.
Ihr Standortschlüssel ist die Nummer am Ende der Prognose-URL.

### Verwendung in der Lovelace-Visualisierung (ab Version 1.1.0)
Der Zusammenfassungskanal enthält eine aktuelle und tagesgenaue Vorhersage mit Rolle/Typen von Zuständen, die vom Typdetektor unterstützt werden.
Die neue Funktion kann verwendet werden, um die Wettervorhersage in der Lovelace-Benutzeroberfläche anzuzeigen.
Für eine bessere Ansicht wird eine benutzerdefinierte Lovelace-Karte erstellt – siehe https://github.com/algar42/IoB.lovelace.accuweather-card

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (ticaki) Missing Http error handling added
* (ticaki) For error codes from the 400 series, do not attempt any unscheduled reconnections. 

### 2.1.0-alpha.0 (2025-01-19)
* (ticaki) Change: min. js-controller to 6.0.11
* (ticaki) Change: Outdated data is updated at startup.
* (ticaki) New: Photo link added in current weather
* (ticaki) New: Metric and Imperial are available for selection - Will be taken into account with the next data update.
* (ticaki) New: In the event of a data retrieval error, an attempt is made again after 10 minute
* (ticaki) Remove admin option (restart blocking)
* (ticaki) Rewritten in Typescript

### 2.0.1 (2025-01-18)
* (ticaki) BREAKING: Requires Nodejs 20 or higher
* (ticaki) BREAKING: Command states are now buttons and only respond to ack=false. 
* (ticaki) admin option: No data is updated on adapter startup (default: true). 
* (ticaki) apikey renamed and encrypted
* (ticaki) Dependencies and eslint updated
* (devtronic) Add nextHour.CloudCover

### 1.5.0 (2024-06-23)
* (xdaamg) limit updates to once an hour, this fixes part of issue #273.
* (mcm1957) Adapter requires js-controller >= 5 and admin >= 6 now
* (mcm1957) Node 22 support has been added to testing
* (mcm1957) Dependencies have been updated

### 1.4.0 (2024-04-02)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.3.2 (2023-12-04)
* (ticaki) fixed: dependencies
* (ticaki) fixed: error message [object Object]

### 1.3.1 (2023-08-15)
* (isi07) added the Wind Direction Text und Cloud Cover
* (bluefox) Added json config

### 1.2.4 (2022-02-08)
* (algar42) Depency updates

### 1.2.3 (2021-12-29)
* (algar42) HoursOfSun Parameter added to the Daily forecast

### 1.2.1 (2021-07-22)
* (bluefox) Updated logo

### 1.2.0 (2021-07-03)
* (Garfonso) adjust roles to properly detect weather forecast in Summary folder. (Summary objects need to be deleted and adapter restarted after that)

### 1.1.7 (2021-06-24)
* (bluefox) Create device for device-detector

### v1.1.6 (2021-05-05)
Minor bug fixes to `Object.common` section

### 1.1.5 (2021-01-25)
* (algar42) Resolve log Warning for js-controller 3.2

### 1.1.4
* (HGlab01) small bugfix regarding setTimeout range

### 1.1.3 (2020-03-04)
* (algar42) Minor updates for compact mode

### 1.1.0 (2019-11-09)
* (algar42) Summary channel added to support type-detector and automatic weather device creation

### 1.0.2 (2019-09-12)
* (algar42) Production Release

## License
MIT License

Copyright (c) 2024-2025 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2021-2023 algar42 <igor.aleschenkov@gmail.com>

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