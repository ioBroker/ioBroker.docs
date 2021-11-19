---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.youtube/README.md
title: ioBroker.youtube
hash: cR9gnGZYyuEmo9ikWHbKgC9ImOrMKQEQAirK5Ah/LUk=
---
![Logo](../../../en/adapterref/iobroker.youtube/admin/youtube.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.youtube.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.youtube.svg)
![Stabil](http://iobroker.live/badges/youtube-stable.svg)
![Eingerichtet](http://iobroker.live/badges/youtube-installed.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/klein0r/iobroker.youtube.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/klein0r/ioBroker.youtube/badge.svg)
![NPM](https://nodei.co/npm/iobroker.youtube.png?downloads=true)

#ioBroker.youtube
![Testen und freigeben](https://github.com/klein0r/ioBroker.youtube/workflows/Test%20and%20Release/badge.svg)

Statistiken wie Aufrufe, Abonnenten und Videos

## Gefördert durch
[![ioBroker Master Kurs](https://haus-automatisierung.com/images/ads/ioBroker-Kurs.png)](https://haus-automatisierung.com/iobroker-kurs/?refid=iobroker-youtube)

## Installation
Bitte verwenden Sie die "Adapterliste" in ioBroker, um eine stabile Version dieses Adapters zu installieren. Sie können diesen Adapter auch über die CLI installieren:

```
iobroker add youtube
```

## Aufbau
Um einen API-Key zu erhalten, gehen Sie zu [console.developers.google.com](https://console.developers.google.com/apis/dashboard).

1. Erstellen Sie ein neues Projekt
2. Erstellen Sie einen neuen API-Schlüssel
3. "YouTube Data API v3" der Bibliothek hinzufügen
4. Verwenden Sie diesen API-Schlüssel im Optionsfeld
5. Fügen Sie mehrere Kanäle auf der Registerkarte Kanäle hinzu, indem Sie die ID und einen benutzerdefinierten Namen verwenden

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### 2.0.3

* (klein0r) Fixed missing VIS widget

### 2.0.1

* (klein0r) Fixed missing translations

### 2.0.0

* (klein0r) Admin 5 Support

### 1.1.1

* (klein0r) Updated dependencies

### 1.1.0

* (klein0r) Encrypt sensitive information **(BREAKING CHANGE - RE-ENTER YOUR API KEY)**

### 1.0.3

* (klein0r) Remove forbidden chars from state
* (klein0r) Fixed async object creation

### 1.0.2

* (klein0r) Delete unsed states

### 1.0.1

* (klein0r) Fixed trailing dot in channel error message

### 1.0.0

* (klein0r) First stable release

### 0.0.13

* (klein0r) Changed to new library

### 0.0.12

* (klein0r) Added json summary

### 0.0.11

* (klein0r) setTimeout found in main.js, but no clearTimeout detected

### 0.0.10

* (klein0r) Added missing translations

### 0.0.9

* (klein0r) Updated depencencies

### 0.0.8

* (klein0r) Removed link from overview

### 0.0.7

* (klein0r) Added VIS widget

### 0.0.6

* (klein0r) Collect YouTube information after configuration changes

### 0.0.5

* (klein0r) Bugfix

### 0.0.4

* (klein0r) Added more options

### 0.0.3

* (klein0r) Support for multiple channels

### 0.0.2

* (klein0r) improved error handling

### 0.0.1

* (klein0r) initial release

## License

The MIT License (MIT)

Copyright (c) 2021 Matthias Kleine <info@haus-automatisierung.com>

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