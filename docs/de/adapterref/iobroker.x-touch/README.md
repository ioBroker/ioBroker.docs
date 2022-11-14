---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.x-touch/README.md
title: ioBroker.x-touch
hash: MJoAQn3DaO5JfVYgyIFzPw1TEQ6JpcybU8qs8lRb6Lw=
---
![Logo](../../../en/adapterref/iobroker.x-touch/admin/x-touch.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.x-touch.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.x-touch.svg)
![Anzahl der Installationen (neueste)](http://iobroker.live/badges/x-touch-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/x-touch-stable.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/Bannsaenger/ioBroker.x-touch/badge.svg)
![NPM](https://nodei.co/npm/iobroker.x-touch.png?downloads=true)

# IoBroker.x-touch
![Testen und freigeben](https://github.com/bannsaenger/iobroker.x-touch/workflows/Test%20and%20Release/badge.svg)

## X-touch-Adapter für ioBroker
Kommunizieren Sie mit einer Behringer X-Touch-Bedienoberfläche (DAW-Controller)

## Machen
- Fügen Sie die syncGlobal-Funktionalität hinzu
- Fügen Sie die Wiederherstellung von Banken hinzu, wenn die Option gesetzt ist

## Nachrichtenbox
Es gibt zwei akzeptierte Befehle:

* `export` exportiert die in den Zuständen der Gerätegruppen gespeicherten aktuellen Werte in den Benutzerdatenordner x-touch.0
* `import` importiert die jüngste Datei aus dem Userdata-Ordner. Zusätzlich können Sie `file` und/oder die `devicegroup` Nummer für die Wiederherstellung angeben. Wenn `path` angegeben wird, wird das gesamte Dateisystem verwendet und ein `file`-Name ist obligatorisch.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.6.2 (2022-10-07)
* (Bannsaenger) test-and-release without build

### 0.6.1 (2022-10-07)
* (Bannsaenger) confusion with the release script

### 0.6.0 (2022-10-07)

* (Bannsaenger) updated to adapter-dev and release script
* (Bannsaenger) introducing admin 5 UI (jsonConfig)

### 0.5.1
* (Bannsaenger) updated dependencies

### 0.5.0
* (Bannsaenger) fixes in db creation for js controller 4.x

### 0.4.2
* (Bannsaenger) changed sort order in changelog

### 0.4.1
* (Bannsaenger) bug fixing in the export/import feature

### 0.4.0
* (Bannsaenger) added the ability to export the actual state values via a message and reimport the states again

### 0.3.0
* (Bannsaenger) added the timecode display

### 0.2.5
* (Bannsaenger) fixed send back of button and fader values. Now only the affected device group members will be updated

### 0.2.4
* (Bannsaenger) fixed disabling of encoder display

### 0.2.3
* (Bannsaenger) fixed setting of display inverted

### 0.2.2
* (Bannsaenger) fixed fader handling and data distribution to the device group

### 0.2.1
* (Bannsaenger) changed the way to send data. Added sendDelay

### 0.2.0
* (Bannsaenger) introduced encoders

### 0.1.0
* (Bannsaenger) introduced channel and page switching

### 0.0.2
* (Bannsaenger) prepared for checkin to iobroker.latest

### 0.0.1
* (Bannsaenger) initial release

## License
MIT License

Copyright (c) 2021-2022 Bannsaenger <bannsaenger@gmx.de>

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