---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.solarwetter/README.md
title: ioBroker.solarwetter
hash: N9jcCi7jpOsufYNjUhK1MpH6xfIXnNOyJE9q1vy1Amc=
---
![Logo](../../../en/adapterref/iobroker.solarwetter/admin/solarwetter.png)

![Anzahl der Installationen](http://iobroker.live/badges/solarwetter-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.solarwetter.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.solarwetter.svg)
![NPM](https://nodei.co/npm/iobroker.solarwetter.png?downloads=true)

# IoBroker.solarwetter
## Beschreibung
Dieser Adapter liefert eine Prognose der täglichen Solarstrommenge für eine bestimmte Region vom Anbieter [http://www.auswahl-plz-bereich.solar-wetter.com](http://solar-wetter.com).

## Aufbau
### Benutzer / Passwort
Seit 2022/03 ist keine Authentifizierung mehr erforderlich.

### Standort
Wählen Sie Ihre Region aus, indem Sie sie aus der Liste der Postleitzahlen auswählen.
Geben Sie die Leistung Ihrer Solaranlage ein, um den Energieertrag zu berechnen.

### Solaranlage
Geben Sie die Gesamtleistung Ihrer Solaranlage ein, um die Tagesprognose für die Energieproduktion zu berechnen (Dezimaltrennzeichen möglich)

### 4-Tages-Vorhersage
Wählen Sie eine Stadt aus, damit der Adapter eine Verbindung zu einem 4-Tages-Vorhersagediagramm (Datenpunkt `solarwetter.0.forecast.chart.__url__` ) erstellt.

![Alt-Text](../../../en/adapterref/iobroker.solarwetter/img/solarwetterSettingScreenshot.jpg "Screenshot-Einstellungen")

## Zeitplan
Der Adapter startet einmal täglich.

## Zustände
`solarwetter.0.forecast.__clearSky__` (*Wert*)

`solarwetter.0.forecast.__realSky_min__` (*Wert*)

`solarwetter.0.forecast.__realSky_max__` (*Wert*)

`solarwetter.0.forecast.__Datum__` (*Zeichenfolge, kein Zeitstempel*)

`solarwetter.0.forecast.__Region__` (*Wert*)

`solarwetter.0.forecast.home.__clearSky__` (*Wert*)

`solarwetter.0.forecast.home.__realSky_min__` (*Wert*)

`solarwetter.0.forecast.home.__realSky_max__` (*Wert*)

`solarwetter.0.forecast.home.__Leistung__` (*Wert*)

`solarwetter.0.forecast.chart.__city__` (*Wert*)

`solarwetter.0.forecast.chart.__url__` (*Wert*)

## Machen
* Übersetzung von Datenpunkten
* Russische Übersetzung eines Einstellungsfensters

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 1.1.5 (2023-08-15)
* (motuditli) Adjusted for Website Changes - removal of authentication
* (bluefox) Added compact mode and JSON config

### 1.0.0 (2017-10-15)
* (pix) End of beta, Node.js 4 or higher required

### 0.3.0 (2017-05-28)
* (pix) Login with website password & username

### 0.2.0 (2017-01-05)
* (pix) Travis CI testing added

### 0.1.2 (2016-06-21)
* (pix) city selection fixed

### 0.1.1 (2016-06-20)
* (pix) 4-Day-Forecast Chart

### 0.1.0 (2016-06-12)
* (pix) publish on npm

### 0.0.6 (2016-06-09)
* (pix) Adapter.stop() fixed

### 0.0.5 (2016-05-14)
* (pix) Settings now show correct location if already defined

### 0.0.4 (2016-05-13)
* (pix) Appearance of settings window

### 0.0.3 (2016-05-13)
* (pix) Calculates power of own solar plant

### 0.0.2 (2016-05-13)
* (pix) Post code area selectable

### 0.0.1 (2016-05-12)
* (pix) first release

## License

The MIT License (MIT)

Copyright (c) 2020-2023 pix

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

---
*Logo is partly crafted by CHALLENGER* :+1: