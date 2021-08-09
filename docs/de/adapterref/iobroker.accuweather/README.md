---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.accuweather/README.md
title: ioBroker.accuweather
hash: 88xK3dX4/SElIoDVN0/WmOMWo3S/TiNznNZtVDvyOKw=
---
![Logo](../../../en/adapterref/iobroker.accuweather/admin/accuweather.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.accuweather.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.accuweather.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/algar42/iobroker.accuweather.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/algar42/ioBroker.accuweather/badge.svg)
![NPM](https://nodei.co/npm/iobroker.accuweather.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/algar42/ioBroker.accuweather/master.svg)

# IoBroker.accuweather
## Akkuwetter-Adapter für ioBrokerB
Wettervorhersage mit AccuWeather API.

Der Adapter empfängt aktuelle Bedingungen (wird stündlich aktualisiert), 5-Tage-Tagesvorhersagen (aktualisiert einmal täglich um ca. 7 Uhr morgens) und 12-Stunden-Vorhersagen (aktualisiert alle sechs Stunden um 12 Uhr, 6 Uhr, 12 Uhr und 18 Uhr).

## Einstieg
### API-Schlüssel abrufen
Um den API-Schlüssel zu erhalten, registrieren Sie sich auf https://developer.accuweather.com/ und erstellen Sie eine Anwendung im Menü `My Apps`.
Sobald die Anwendung erstellt wurde, wird der API-Schlüssel generiert.
Zur kostenlosen Nutzung ist es möglich, pro Tag 50 Anfragen an API zu stellen.
Es wurde darauf hingewiesen, dass die folgenden Einstellungen bevorzugt werden, damit die API funktioniert (bitte wählen Sie Ihr Land aus!): ![die Einstellungen](../../../en/adapterref/iobroker.accuweather/admin/image.png)

### Standortschlüssel abrufen
Um den Standortschlüssel zu erhalten, gehen Sie zu https://www.accuweather.com/ und geben Sie Ihren Stadtnamen ein oder versuchen Sie, Ihre Koordinaten (Breitengrad, Längengrad) so einzugeben, wie Sie sie haben, z. in den ioBroker-Einstellungen.
Ihr Standortschlüssel ist die Zahl am Ende der URL der Prognose.

### Verwendung in Lovelace-Visualisierung (ab Version 1.1.0)
Der Zusammenfassungskanal enthält aktuelle und tagesbezogene Prognosen mit Rolle/Typen von Zuständen, die vom Typdetektor unterstützt werden.
Die neue Funktion kann verwendet werden, um die Wettervorhersage in der Lovelace-Benutzeroberfläche anzuzeigen.
Zur besseren Ansicht wird eine benutzerdefinierte Lovelace-Karte erstellt - siehe https://github.com/algar42/IoB.lovelace.accuweather-card

<!-- Platzhalter für die nächste Version (am Zeilenanfang):

### **ARBEITEN LÄUFT** -->

## Changelog
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

Copyright (c) 2021 algar42 <igor.aleschenkov@gmail.com>

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