---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.yr/README.md
title: ioBroker.y
hash: qOo57l4UKwcb/jpMdhk/Zk4lcG4tAvY1se4xjUcxfGk=
---
![Logo](../../../en/adapterref/iobroker.yr/admin/yr.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.yr.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.yr.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/yr-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/yr-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/ioBroker/iobroker.yr.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/ioBroker/ioBroker.yr/badge.svg)
![NPM](https://nodei.co/npm/iobroker.yr.png?downloads=true)

# IoBroker.yr
**Tests:** ![Testen und freigeben](https://github.com/ioBroker/ioBroker.met/workflows/Test%20and%20Release/badge.svg)

## Jahr kein Adapter für ioBroker
holt 10d Wettervorhersage von [Jahr.nr](yr.no)

[yr.no](yr.no) ist ein gemeinsamer Dienst des [Norwegian Meteorological Institute](met.no) und des [Norwegian Broadcasting Corporation](nrk.no)

https://api.met.no/weatherapi/locationforecast/2.0/documentation

**Hinweis** - wenn _"Fehlende Übersetzungen an iobroker.net senden"_ aktiviert ist (Standard), werden fehlende Übersetzungen an den iobroker.net-Server gesendet. Es werden keine IPs oder zusätzliche Informationen gespeichert oder analysiert. Fehlt nur noch die Übersetzung.

##Symbole
Icons werden von hier [https://api.met.no/weatherapi/weathericon/2.0/documentation](https://api.met.no/weatherapi/weathericon/2.0/documentation) übernommen und gehören zur Bj.Nr.

## MACHEN
* Meteogramm hinzufügen (png wird wahrscheinlich mit der neuen API eingestellt)
* Fügen Sie eine tägliche Vorhersage basierend auf der stündlichen Vorhersage hinzu
* HTML-Tabelle hinzufügen

<!-- Platzhalter für die nächste Version (am Zeilenanfang):

### __ARBEITEN IN PROGRESS__ -->
## 1.0.4 [2016-07-06]
* (bluefox) Link zur Readme korrigieren

### 1.0.3 [2016-05-17]
* (bluefox) Readme-Pfad ändern

### 1.0.2 [2016-05-16]
* (bluefox) Übersetzungen hinzufügen

### 1.0.1 [2016-04-25]
* (bluefox) Übersetzungen hinzufügen

### 1.0.0 [2016-03-15]
* (bluefox) Parsing von Städten ändern

###0,1.9 [2015-10-28]
* (bluefox) Fehler bei Übersetzungen beheben

### 0.1.8 [2015-10-27]
* (bluefox) Übersetzungen
* (bluefox) automatisches Hochladen fehlender Übersetzungen auf iobroker.net

### 0.1.7 [2015-07-10]
* (bluefox) machen yr funktioniert mit Metro-Widgets

### 0.1.6 [2015-06-12]
* (bluefox) Übersetzungen

### 0.1.5 [2015-03-26]
* (bluefox) Übersetzungen

### 0.1.4 [2015-03-24]
* (bluefox) Einheit "%" für "Windrichtung" entfernen

### 0.1.3 [2015-03-22]
* (bluefox) Fehler mit morgen und übermorgen beheben

### 0.1.2 [2015-03-08]
* (bluefox) korrekte Links zur yr.no-Website

### 0.1.1
* (bluefox) Übersetzungen für die Wetterzustände in anderen Sprachen hinzufügen

### 0.1.0
* (bluefox) Update Jahr auf das neue Objektmodell

### 0.0.4
* (Hobbyquaker) "Vorhersage" voranstellen. IDs angeben

### 0.0.3
* (Hobbyquaker) Einstellungs-UI mit automatischer Vervollständigung für den Standort
* (Hobbyquaker) umbenannt yr_forecast in Vorhersage
* (Hobbyquaker) Kinderattribut hinzugefügt
* (Hobbyquaker) verringerte Protokollausführlichkeit
* (Hobbyquaker) Korrekturen

### 0.0.2
* (Hobbyquaker) Korrekturen

### 0.0.1
* (Hobbyquaker) Erstveröffentlichung

## Machen
* setState-Prognose_Objekt

## Changelog

### __WORK IN PROGRESS__
* (withstu) Switch to new JSON API and change data Structure (breaking)
* (withstu) Update project dependencies
* (arteck) Type of state was corrected  

### 2.0.3 [2018-10-10]
* (bluefox) add translations

### 2.0.2 [2018-08-01]
* (bluefox) Warning! Breaking changes! States are renamed.
* (bluefox) Refactoring of states and roles

### 1.0.6 [2017-05-27]
* (Andre) Update iconset

### 1.0.5 [2016-10-10]
* (bluefox) move weather widgets to this adapter

## License
The MIT License (MIT)

Copyright (c) 2014-2021 hobbyquaker <hq@ccu.io>

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