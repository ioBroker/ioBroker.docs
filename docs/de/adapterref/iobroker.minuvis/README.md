---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.minuvis/README.md
title: ioBroker.minuvis
hash: sjBsvncchkYo53C+9AmXwEPSY2IK3cgv7ZYsuNZJx1U=
---
![Logo](../../../en/adapterref/iobroker.minuvis/admin/minuvis.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.minuvis.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.minuvis.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/minuvis-installed.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/minukodu/ioBroker.minuvis/badge.svg)
![Build-Status](https://travis-ci.org/minukodu/ioBroker.minuvis.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.minuvis.png?downloads=true)

# IoBroker.minuvis
## Minuvis-Adapter für ioBroker
Visualisierung für alle Geräte

## Anweisungen
- Adapter wie gewohnt installieren
- Instanz von minuvis erstellen (nur 1 möglich)
- socket.io-Instanz auf der Webinstanz aktivieren

![socket.io@web](https://minukodu.de/githubimg/web_instance_socket_io.jpg)

- Minuvis-Instanz öffnen

![minuvis Instanz](https://minukodu.de/githubimg/minuvis_instance.jpg)

- Verbinden Sie sich mit dem Socket.IO-Port des Webs oder Ihrer eigenen Socket.IO-Instanz.

![verbinden](https://minukodu.de/githubimg/minuvis_connect.jpg)

- neue Seite hinzufügen

![Seite hinzufügen](https://minukodu.de/githubimg/minuvis_addpage.jpg)

- Widget hinzufügen

![Widget hinzufügen](https://minukodu.de/githubimg/minuvis_addwidget.jpg)

- Bearbeitungsstatus

![Bundesstaat auswählen](https://minukodu.de/githubimg/minuvis_selectstate.jpg)

- Vorschau Ihrer neuen App

![Vorschau](https://minukodu.de/githubimg/minuvis_preview.jpg)

Weitere Informationen finden Sie unter https://minukodu.de/en oder auf YouTube unter https://youtu.be/dtHUBOEc4js

# WICHTIG !!!!
Wenn Sie von einer Version < 1.3.0 aktualisieren, beachten Sie bitte Folgendes:

* Aktualisieren Sie zuerst auf Version v1.4 und speichern Sie die Konfigurationsdateien am neuen Speicherort.

########################################################################
* **WICHTIGE ÄNDERUNGEN** in Version 2 siehe: https://minukodu.de/en/news/minuvis-20-iobroker-available
* Anleitung zum Update von v1 auf v2 siehe: https://minukodu.de/en/news/update-minuvis-v1-v2

* Wenn Sie Version 1 behalten möchten, verwenden Sie dieses Docker-Image: https://hub.docker.com/r/sepp68/minuvis-image

########################################################################

## Changelog
### 2.7.1 (2026-02-22)
* updated README
* updated app and builder to V2.7.1

### 2.7.0 (2026-02-15)
* fixing issues detected by repository checker
* updated app and builder to V2.7.0

### 2.6.6 (2026-02-11)
* updated app and builder to V2.6.6

### 2.6.5 (2026-01-26)
* updated app and builder to V2.6.5

### 2.6.4 (2026-01-19)
* updated app and builder to V2.6.4

### 2.6.3 (2026-01-18)
* updated app and builder to V2.6.3

### 2.6.2 (2026-01-06)
* updated app and builder to V2.6.2

### 2.3.4 (2024-02-09)
* updated app and builder to V2.3.4

### 2.3.3 (2023-04-04)
* updated app and builder to V2.3.3

### 2.3.2 (2023-03-18)
* remove bug in io-package.json file

### 2.3.1 (2023-03-17)
* updated app to V2.3.1

### 2.3.0 (2022-01-30)
* updated app and builder to V2.3.0

### 2.2.1 (2021-11-03)
* updated app to V2.2.1

### 2.2.0 (2021-09-19)
* updated app and builder to V2.2.0

### 2.1.0 (2021-07-31)
* updated app and builder to V2.1.0

## License
MIT License

Copyright (c) 2026 svallant <svallant@gmx.eu>

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