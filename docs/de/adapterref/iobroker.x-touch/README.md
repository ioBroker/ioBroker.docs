---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.x-touch/README.md
title: ioBroker.x-touch
hash: AAPixqUfKFCsjwx3NXQZvTocuy413K+pphI3PZIFRmw=
---
![Logo](../../../en/adapterref/iobroker.x-touch/admin/x-touch.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.x-touch.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.x-touch.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/x-touch-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/x-touch-stable.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/Bannsaenger/ioBroker.x-touch/badge.svg)
![NPM](https://nodei.co/npm/iobroker.x-touch.png?downloads=true)

# IoBroker.x-touch
![Testen und Freigeben](https://github.com/bannsaenger/iobroker.x-touch/workflows/Test%20and%20Release/badge.svg)

## X-touch-Adapter für ioBroker
Kommunizieren Sie mit einer Behringer X-Touch-Bedienoberfläche (DAW-Controller)

## Aufgaben
- Fügen Sie die syncGlobal-Funktionalität hinzu

## Nachrichtenfeld
Es gibt zwei akzeptierte Befehle:

* `export` exportiert die aktuellen Werte, die in den Zuständen der Gerätegruppen gespeichert sind, in den Benutzerdatenordner x-touch.0
* `import` importiert die neueste Datei aus dem Ordner userdata. Zusätzlich können Sie `file` und/oder die `devicegroup`-Nummer angeben, die wiederhergestellt werden soll. Bei Angabe von `path` wird das gesamte Dateisystem verwendet, ein `file`-Name ist obligatorisch.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.8.1 (2025-05-21)
* (Bannsaenger) node 22 in deploy script
* (Bannsaenger) do not send updates when lock feature is in blank mode

### 0.8.0 (2025-05-15)
* (Bannsaenger) updated dependencies, node 24 compatibility
* (Bannsaenger) refactored lock feature

### 0.7.1 (2025-02-25)
* (Bannsaenger) updated admin dependency

### 0.7.0 (2025-02-17)
* (Bannsaenger) fixed some minor typos
* (Bannsaenger) updated to node 18.x - 22.x
* (Bannsaenger) updated dependencies, node 22 compatibility, workflow
* (Bannsaenger) added possibility to lock the desk
* (Bannsaenger) resend data on group membership change
* (Bannsaenger) removed createBanks from config dialog (too dangerous, delete by hand if neccessary)

### 0.6.5 (2023-12-30)
* (Bannsaenger) add CHANGELOG_OLD.md

## License
MIT License

Copyright (c) 2021-2025 Bannsaenger <bannsaenger@gmx.de>

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