---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.accuweather/README.md
title: ioBroker.accuweather
hash: hQE5pTtWK2HaJprmVg7nl0ULro1HqR/mMHIOVpF2jdo=
---
![Logo](../../../en/adapterref/iobroker.accuweather/admin/accuweather.png)

![Anzahl der Installationen](https://iobroker.live/badges/accuweather-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.accuweather.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.accuweather.svg)
![NPM](https://nodei.co/npm/iobroker.accuweather.png?downloads=true)

# ioBroker.accuweather

## AccuWeather-Adapter für ioBroker

Wettervorhersage mithilfe der AccuWeather-API.

Der Adapter empfängt

- Aktuelle Bedingungen (stündlich aktualisiert), (24 Anfragen)
- 5-Tage-Vorhersage (tägliche Aktualisierung gegen 7 Uhr und 20 Uhr), (2 Anfragen)
- und 12-Stunden-Vorhersage (wird alle sechs Stunden um 0:00 Uhr, 6:00 Uhr, 12:00 Uhr und 18:00 Uhr aktualisiert). (4 Anfragen)

Standardmäßig aktualisiert der Adapter veraltete Daten nur beim Neustart. Es sind 50 Anfragen pro Tag zulässig; für die Aktualisierung aller Daten sind bei jedem Neustart 3 Anfragen erforderlich.

## Erste Schritte

### API-Schlüssel abrufen

Um einen API-Schlüssel zu erhalten, registrieren Sie sich auf <https://developer.accuweather.com/> und erstellen Sie eine Anwendung in `My Apps` Menü. Nach der Erstellung der Anwendung wird Ihnen ein API-Schlüssel generiert. Sie können täglich 50 API-Anfragen kostenlos stellen. Für die optimale Funktion der API werden folgende Einstellungen empfohlen (bitte wählen Sie Ihr Land!):![Einstellungen](../../../en/adapterref/iobroker.accuweather/admin/image.png)

### Standortschlüssel abrufen

Um Ihren Standortschlüssel zu erhalten, gehen Sie auf <https://www.accuweather.com/> und geben Sie Ihren Stadtnamen ein oder versuchen Sie, Ihre Koordinaten (Breitengrad, Längengrad) einzugeben, so wie Sie sie beispielsweise in den ioBroker-Einstellungen gespeichert haben. Ihr Standortschlüssel ist die Zahl am Ende der Vorhersage-URL.

### Verwendung in der Lovelace-Visualisierung (ab Version 1.1.0)

Der Übersichtskanal enthält eine aktuelle und eine Tagesvorhersage mit den vom Typdetektor unterstützten Statusrollen und -typen. Mit dieser neuen Funktion lässt sich die Wettervorhersage in der Lovelace-Benutzeroberfläche anzeigen. Für eine bessere Darstellung wurde eine benutzerdefinierte Lovelace-Karte erstellt – siehe <https://github.com/algar42/IoB.lovelace.accuweather-card>

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22.19.0 now
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 2.3.0 (2026-05-04)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (mcm1957) Dependencies have been updated

### 2.2.0 (2026-02-10)
- (copilot) Adapter requires admin 7.6.17 now
- (mcm1957) Dependencies have been updated

### 2.1.1 (2025-09-02)
* (mcm1957) Dependencies have been updated

### 2.1.0 (2025-01-22)
* (ticaki) Change: min. js-controller to 6.0.11
* (ticaki) Change: Outdated data is updated at startup.
* (ticaki) New: Photo link added in current weather
* (ticaki) New: Metric and Imperial are available for selection - Will be taken into account with the next data update.
* (ticaki) New: In the event of a data retrieval error, an attempt is made again after 10 minute
* (ticaki) Remove admin option (restart blocking)
* (ticaki) Rewritten in Typescript
* (ticaki) For error codes from the 400 series, do not attempt any unscheduled reconnections.

### 2.0.1 (2025-01-18)
* (ticaki) BREAKING: Requires Nodejs 20 or higher
* (ticaki) BREAKING: Command states are now buttons and only respond to ack=false. 
* (ticaki) admin option: No data is updated on adapter startup (default: true). 
* (ticaki) apikey renamed and encrypted
* (ticaki) Dependencies and eslint updated
* (devtronic) Add nextHour.CloudCover

## License
MIT License

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
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