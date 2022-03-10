---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.divera247/README.md
title: ioBroker.divera247
hash: LyHEz+a45NCnsQ0Y2SDqeWhCuAvLD11aWtvFJ1vjonQ=
---
![Logo](../../../en/adapterref/iobroker.divera247/admin/divera247_long.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.divera247.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.divera247.svg)
![Anzahl der Installationen (neueste)](http://iobroker.live/badges/divera247-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/divera247-stable.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/TKnpl/ioBroker.divera247/badge.svg)
![NPM](https://nodei.co/npm/iobroker.divera247.png?downloads=true)

# IoBroker.divera247
**Tests:** ![Testen und freigeben](https://github.com/TKnpl/ioBroker.divera247/workflows/Test%20and%20Release/badge.svg)

## Divera247-Adapter für ioBroker
Adapter für den Alarmierungsdienst <a href="https://www.divera247.com/" target="_blank">Divera 24/7</a>

## Anforderungen
Für die volle Nutzbarkeit dieses Adapters muss Ihre Organisation mindestens den „Alarm“-Plan der Divera 24/7-Dienste abonnieren, andernfalls funktioniert der Adapter nicht oder nicht vollständig.

## Konfiguration dieses Adapters
Sie müssen Ihre "Divera 24/7"-Anmeldedaten für diesen Adapter eingeben.

Außerdem können Sie die Alarme auf bestimmte Benutzer oder Alarmgruppen beschränken.
Dazu müssen Sie die Divera-Benutzer-IDs oder Alarmgruppennummern auf der Admin-Seite dieses Adapters eingeben. Mehrere Benutzerkennungen und / oder Alarmgruppennummern können durch Komma (,) getrennt angegeben werden.
Dieser Adapter prüft zuerst die Benutzer-IDs, bevor er die Gruppen prüft. Der erste Treffer löst den Alarm aus und aktualisiert alle Zustände. Eine Kombination aus UserID und Alarmgruppe ist derzeit nicht möglich.

Um **alle Alarme** zu abonnieren, lassen Sie die Eingabefelder einfach leer.

## Changelog

### 0.2.0
* (TKnpl) complete renewal of the adapter

### 0.1.3
* (TKnpl) general revision of the adapter

### 0.1.2
* (TKnpl) added alarmed vehicles datapoint

### 0.1.1
* (TKnpl) small changes - wording

### 0.1.0
* (TKnpl) added possibility to specify alarm groups

### 0.0.10
* (TKnpl) bug in info.connection fixed and handling of user ids expanded

### 0.0.9
* (TKnpl) added default values for admin page

### 0.0.8
* (TKnpl) Changed API call from intervall to timeout, added states 'group' and 'foreign_id'

### 0.0.7
* (TKnpl) added object 'priority' and 'alarm' object updates only in case of an new alarm or when an alarm was closed

### 0.0.6
* (TKnpl) state handling while active alarm and connection check improved, fixed object types

### 0.0.5
* (TKnpl) fixed io-package news issue

### 0.0.4
* (TKnpl) Connection check to api improved, added timestamp of latest alert

### 0.0.3
* (TKnpl) added title, text, address, latitude, longitude, general formatting

### 0.0.2
* (TKnpl) adjusted translation

### 0.0.1
* (TKnpl) initial commit

## License
MIT License

Copyright (c) 2022 TKnpl <dev@t-concepts.de>

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