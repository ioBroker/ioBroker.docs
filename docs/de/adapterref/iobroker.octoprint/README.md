---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.octoprint/README.md
title: ioBroker.octoprint
hash: /VI0Cf5Xa/y4E/hw4ovDqKQjPI5ZjOGdikq9MAGDCfM=
---
![Logo](../../../en/adapterref/iobroker.octoprint/admin/octoprint.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.octoprint.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.octoprint.svg)
![Stabil](http://iobroker.live/badges/octoprint-stable.svg)
![Eingerichtet](http://iobroker.live/badges/octoprint-installed.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/klein0r/iobroker.octoprint.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/klein0r/ioBroker.octoprint/badge.svg)
![Build-Status](http://img.shields.io/travis/klein0r/ioBroker.octoprint.svg)
![NPM](https://nodei.co/npm/iobroker.octoprint.png?downloads=true)

# IoBroker.octoprint
Adapter zum Verbinden von OctoPrint mit ioBroker

**Getestet mit [OctoPrint](https://github.com/OctoPrint/OctoPrint/releases) 1.7.2**

## Installation
Bitte verwenden Sie die "Adapterliste" in ioBroker, um eine stabile Version dieses Adapters zu installieren. Sie können diesen Adapter auch über die CLI installieren:

```
iobroker add octoprint
```

## Merkmale
### Information
- Versionsinformationen abrufen
- Druckerinformationen abrufen
- Aktuelle Druckauftragsinformationen abrufen
- Holen Sie sich Dateilisteninformationen

### Werkzeuge
- Werkzeugtemperatur einstellen
- Betttemperatur einstellen
- Extrudieren / Zurückziehen

###Befehle
- Drucker: Verbinden, trennen und nach Hause
- Job: Starten, Abbrechen, Neustart
- SD-Karte: Init, Refresh, Release
- Benutzerdefinierte Druckerbefehle
- Systembefehle
- Jog X-, Y- und Z-Achse
- Wählen Sie eine Datei aus oder drucken Sie sie aus

## Wichtig!
Starten Sie Ihre OctoPrint-Instanz (oder eine andere Instanz) NICHT mit Code wie diesem neu:

```javascript
var obj = getObject('system.adapter.octoprint.0');
obj.common.enabled = false;
setObject('system.adapter.octoprint.0', obj);
```

Da `API key` seit Version 1.1.0 ein geschütztes Attribut ist, wird dadurch der konfigurierte API-Schlüssel entfernt. Der Grund ist, dass `getObject` keine geschützten Informationen zurückgibt (also der API-Schlüssel nicht im zurückgegebenen Objekt enthalten ist). Wenn Sie das Objekt speichern, speichern Sie ein Objekt ohne den Schlüssel.

Bitte verwenden Sie den Zustand `system.adapter.octoprint.0.alive`, um die Instanz zu stoppen/zu starten.

## Changelog

### 2.0.2

* (klein0r) Extrude commands

### 2.0.1

* (klein0r) Fixed missing translations

### 2.0.0

* (klein0r) Admin 5 Support **(BREAKING CHANGE - RENAMED TEMPERATURE NAMESPACE)**

### 1.1.2

* (klein0r) Updated file refresh handling

### 1.1.1

* (klein0r) Minor fixes

### 1.1.0

* (klein0r) Encrypt sensitive information **(BREAKING CHANGE - RE-ENTER YOUR API KEY)**

### 1.0.10

* (klein0r) Fixed printjob state format issues

### 1.0.9

* (klein0r) nodejs 12 required

### 1.0.8

* (klein0r) Avoid constant refresh of file list

### 1.0.7

* (klein0r) Fixed async object creation

### 1.0.6

* (foxriver76) Avoid spamming the same error again and again

### 1.0.5

* (klein0r) Allow to select and print files using objects
* (klein0r) Fixed .toFixed exception when no job is running

### 1.0.4

* (klein0r) Fixed .toFixed exception when no job is running

### 1.0.3

* (klein0r) Fixed filament information (volume and length)

### 1.0.2

* (klein0r) Added name for OctoPrint Instance
* (klein0r) Fixed admin translation issue (syntax error)

### 1.0.1

* (klein0r) Added iobroker sentry

### 1.0.0

* (klein0r) First stable release

### 0.0.6

* (klein0r) Improved error handling

### 0.0.5

* (klein0r) Switched to axios lib (replaced request - deprecated)

### 0.0.4

* (klein0r) Added missing translations
* (klein0r) Changed default port to 80

### 0.0.3

* (klein0r) Updated depencencies

### 0.0.2

* (klein0r) fixed several issues, new class based structure

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