---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.minuvis/README.md
title: ioBroker.minuvis
hash: 33enf9MUrEMU2aI4sKX5yIWdb+eiXfNlk3ys9TkkgCE=
---
![Logo](../../../en/adapterref/iobroker.minuvis/admin/minuvis.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.minuvis.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.minuvis.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/minuvis-installed.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/minukodu/iobroker.minuvis.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/minukodu/ioBroker.minuvis/badge.svg)
![Build-Status](https://travis-ci.org/minukodu/ioBroker.minuvis.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.minuvis.png?downloads=true)

# IoBroker.minuvis
##minuvis-Adapter für ioBroker
Visualisierung für alle Geräte

########################################################################
Version 2 ist jetzt raus

########################################################################
# WICHTIG !!!!
Wenn Sie ein Upgrade von Version < 1.3.0 durchführen, beachten Sie bitte:

* Aktualisieren Sie zuerst auf Version v1.4 und speichern Sie die Konfigurationsdateien an einem neuen Ort erneut

########################################################################
* **BREAKING CHANGES** in Version 2 siehe: https://minukodu.de/de/news/minuvis-20-iobroker-verfügbar
* Anleitung zum Update v1 -> v2 siehe: https://minukodu.de/de/news/update-minuvis-v1-v2

* Wenn Sie Version 1 behalten möchten, verwenden Sie dieses Docker-Image: https://hub.docker.com/r/sepp68/minuvis-image

########################################################################
## Anweisungen
- Adapter wie gewohnt installieren
- Instanz von minuvis erstellen (nur 1 möglich)
- Socket.io-Instanz bei Web-Instanz aktivieren

![socket.io@web](https://minukodu.de/githubimg/web_instance_socket_io.jpg)

- Minuvis-Instanz öffnen

![minuvis-Instanz](https://minukodu.de/githubimg/minuvis_instance.jpg)

- Verbinden Sie sich mit dem socket.io-Port des Webs oder Ihrer eigenen socket.io-Instanz

![verbinden](https://minukodu.de/githubimg/minuvis_connect.jpg)

- neue Seite hinzufügen

![Seite hinzufügen](https://minukodu.de/githubimg/minuvis_addpage.jpg)

- Widget hinzufügen

![Widget hinzufügen](https://minukodu.de/githubimg/minuvis_addwidget.jpg)

- Status bearbeiten

![Staat wählen](https://minukodu.de/githubimg/minuvis_selectstate.jpg)

- Voransicht Ihrer neuen App

![Vorschau](https://minukodu.de/githubimg/minuvis_preview.jpg)

Weitere Informationen finden Sie unter https://minukodu.de/de oder auf youtube https://youtu.be/dtHUBOEc4js

## Changelog

### 2.1.0 (2021-07-31)
* updated app and builder to V2.1.0

### 2.0.0-rc.2 (2021-05-16)
* updated app and builder to V2.0.0-rc.2

### 2.0.0-rc.1 (2021-05-02)
* updated app and builder to V2.0.0-rc.1

### 2.0.0-beta.1 (2021-04-11)
* updated app and builder to V2.0.0-beta.1

### 2.0.0-alpha.2 (2021-04-05)
* updated app to V2.0.0-alpha.2

### 2.0.0-alpha (2021-03-08)
* updated app to V2.0.0-alpha

=======
### 1.4.0 (2021-03-07)
* updated app to V1.13.0
### 1.3.1 (2021-01-24)
* updated app to V1.12.1
### 1.3.0 (2021-01-24)
* updated builder and app to V1.12.0
* new meta-datapoint "0_userdata.0" for storing config-files
### 1.2.0 (2020-12-06)
* updated builder and app to V1.11.0
### 1.1.0 (2020-12-01)
* updated builder and app to V1.10.0
### 1.0.0 (2020-11-22)
* create version V1.0.0 
### 0.0.12 (2020-11-19)
* updated builder and app to V1.9.0
### 0.0.11 (2020-11-15)
* updated builder and app to V1.8.0
### 0.0.10 (2020-10-04)
* updated builder and app to V1.6.0
### 0.0.9 (2020-09-27)
* updated builder and app to V1.5.0
### 0.0.8 (2020-09-16)
* bugfix number of buttons for valueswitcher
### 0.0.7 (2020-09-14)
* updated builder and app to V1.4.0
### 0.0.6 (2020-09-14)
* updated builder and app to V1.3.0
### 0.0.6 (2020-06-23)
* updated builder and app to V1.2.1
### 0.0.5 (2020-05-14)
* adaptions for iobroker.repositories
### 0.0.4 (2020-05-13)
* updated README.md
### 0.0.3 (2020-05-11)
* updated builder and app to V1.0.4
### 0.0.2 (2020-05-10)
* updated builder and app to V1.0.2
### 0.0.1 (2020-05-02)
* (svallant) initial release

## License
MIT License

Copyright (c) 2021 svallant <svallant@gmx.eu>

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