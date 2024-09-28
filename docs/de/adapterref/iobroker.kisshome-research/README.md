---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.kisshome-research/README.md
title: ioBroker KISSHome-Recherche
hash: fAGv4G+hivk/fDF9RiPUhvcTaET15Nf61udWouped1E=
---
![Logo](../../../en/adapterref/iobroker.kisshome-research/admin/kisshome-research.png)

![Anzahl der Installationen](http://iobroker.live/badges/kisshome-research-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.kisshome-research.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.kisshome-research.svg)

# IoBroker KISSHome-Recherche
![Testen und Freigeben](https://github.com/ioBroker/ioBroker.kisshome-research/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/kisshome-research/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Dieser Spezialadapter wurde für das Forschungsprojekt KISSHome entwickelt. Er ist nicht für den allgemeinen Gebrauch bestimmt.

Um diesen Adapter zu verwenden, müssen Sie sich zunächst auf der [KISSHome-Forschung](https://kisshome-research.if-is.net)-Website registrieren und die Bestätigungs-E-Mail erhalten.

Um diesen Adapter auszuführen, benötigen Sie:

- Mehr als 3 Smart-Home-Geräte
- Fritz!Box Router. Ohne „Fritz!Box“ funktioniert der Adapter nicht.
- iobroker muss unter Debian/Raspbian laufen (oder zumindest unter Linux, wo die folgenden Befehle verfügbar sind: „which“, „rsync“)

## Aufgaben
Erkennen Sie IP-Adressen von:

- [ ] Heimverbindung,

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN ARBEIT** -->

## Changelog
### 1.0.11 (2024-09-26)
-   (bluefox) Trying to fix CI
-   (bluefox) Do not allow the traffic recording of FritzBox 
-   (bluefox) Do not allow recording the traffic if no any MAC provided
-   (bluefox) Corrected links to web page

### 1.0.7 (2024-09-21)
-   (bluefox) Corrected the error if MAC address cannot be determined

### 1.0.6 (2024-09-21)
-   (ChrisDietrich) Corrected the link in readme.md
-   (bluefox) Corrected the Big-Endian PCAP format
-   (bluefox) the Fixed build pipeline

### 1.0.4 (2024-09-19)

-   (bluefox) Corrected GUI
-   (bluefox) Filter out not used interfaces
-   (bluefox) Added notification to admin if public key not accepted
-   (bluefox) Try to detect zero bytes interfaces

### 1.0.2 (2024-09-15)

-   (bluefox) Added error logging

### 1.0.1 (2024-09-14)

-   (bluefox) Implemented the support for the big endian format of a PCAP file

### 1.0.0 (2024-09-06)

-   (bluefox) Corrected configuration page

### 0.3.1 (2024-08-31)

-   (bluefox) Added detection of some IPs

### 0.2.1 (2024-08-28)

-   (bluefox) used valid URL address

### 0.1.1 (2024-08-20)

-   (bluefox) Used MD5 for the file consistency check

### 0.1.0 (2024-08-19)

-   (bluefox) File upload was implemented

### 0.0.3 (2024-08-14)

-   (bluefox) Added the recording enabled option

### 0.0.2 (2024-07-22)

-   (bluefox) Initial commit

## License

The MIT License (MIT)

Copyright (c) 2024 Denis Haev <dogafox@gmail.com>

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