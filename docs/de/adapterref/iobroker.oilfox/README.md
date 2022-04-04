---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.oilfox/README.md
title: ioBroker.oilfox
hash: rhrnoNmZHp8qqkhj5Tel8GA3T5Nseg1pHj9hJboVOdk=
---
![Logo](../../../en/adapterref/iobroker.oilfox/img/oilfox.png)

![Anzahl der Installationen](http://iobroker.live/badges/oilfox-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.oilfox.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.oilfox.svg)

# IoBroker.oilfox
![Testen und freigeben](https://github.com/iobroker-community-adapters/ioBroker.oilfox/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/oilfox/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Beschreibung
Dieser Adapter ermöglicht das Abrufen von Daten vom Oilfox-Sensor über die Oilfox-Website.

## Einstellungen
* Geben Sie Ihre E-Mail und Ihr Passwort auf der Konfigurationsseite an

<!-- Platzhalter für die nächste Version (am Zeilenanfang):

### **IN ARBEIT** -->

## Changelog
### 4.1.1 (2022-04-03)
* (inidona) Usage of new oilfox api
* (bluefox) Added usage JSON configuration

### 4.0.2 (2022-03-27)
* IMPORTANT: All datastructures change with this update!
* IMPORTANT: Password needs to be re-entered after update!
* (inidona) update to new Oilfox API
* (Apollon77) General updates
* (Apollon77) Add Sentry for crash reporting

### 3.1.0 (2021.06.06)
* (jogibear9988) fix multiple oilfox

### 3.0.0 (2020.09.10)
* (bazidibavaria) fixes after api changes

### 2.1.0 (2019.11.26)
* (jogibear9988) fix first run

### 2.0.1 (2019.11.23)
* (jogibear9988) update to new api

### 1.0.0 (2019.11.09)
* (jogibear9988) support multiple oilfox

### 0.0.7 (2019.07.03)
* (jogibear9988) update node modules

### 0.0.6 (2019.01.11)
* (jogibear9988) gulp-task for translation

### 0.0.5
* (jk) bugfix release

### 0.0.4
* (jk) updated infos

### 0.0.3
* (jk) support compact mode
* (jk) input type password

### 0.0.2
* (jk) change to scheduled adapter

### 0.0.1
* (jk) initial version

## License
The MIT License (MIT)

Copyright (c) 2018-2022 jogibear9988 <jochen.kuehner@gmx.de>, ioBroker Community Developers

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