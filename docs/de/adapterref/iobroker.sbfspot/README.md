---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sbfspot/README.md
title: ioBroker.sbfspot
hash: GlcH4CHtPblyfZrjoMJUPnlNKiE3uGFka3oe/ysQxGo=
---
![Logo](../../../en/adapterref/iobroker.sbfspot/admin/sbfspot.png)

![Anzahl der Installationen](http://iobroker.live/badges/sbfspot-stable.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sbfspot.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.sbfspot.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/rg-engineering/ioBroker.sbfspot/badge.svg)
![NPM](https://nodei.co/npm/iobroker.sbfspot.png?downloads=true)

# IoBroker.sbfspot
![GitHub-Aktionen](https://github.com/rg-engineering/ioBroker.sbfspot/workflows/Test%20and%20Release/badge.svg)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

**Wenn es Ihnen gefällt, denken Sie bitte über eine Spende nach:**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=34ESBMJ932QZC)

Dieser Adapter liest Daten von SMA-Wechselrichtern mithilfe von sbfspot.
Jetzt werden beide Datenbanktypen (mySQL und sqlite) unterstützt.
Seit Version 0.2.3 steht ein eigenes Vis-Widget auf Flot-Basis zur Anzeige historischer Daten zur Verfügung.

## Installation
Bitte befolgen Sie die Installationsanweisungen für sbfspot unter https://github.com/SBFspot/SBFspot/wiki

[Detaillierte Installation auf armbasierten Systemen](docs/en/install_arm.md)

## Hinweise
* Verwenden Sie die neueste Version von sbfspot von https://github.com/SBFspot/SBFspot
* Adapter, SBFspot und Datenbanken (MySQL oder SQLite) müssen auf demselben System laufen, z.B. Raspberry PI
* Installationsanleitung für sbfspot auf Raspberry Pi (oder ähnlich) finden Sie unter https://github.com/SBFspot/SBFspot/wiki/Installation-Linux-SQLite oder https://www.rg-engineering.eu/index. php/produkte/software/plugin-fuer-iobroker-sbfspot
* Für Raspberry Pi gibt es ein halbautomatisches Konfigurationstool unter https://github.com/SBFspot/sbfspot-config

## Bekannte Probleme
* Manchmal schlägt die Installation des NPM-Pakets sqlite3 fehl.

In diesem Fall installieren Sie alle npm-Pakete neu

> cd /opt/iobroker/node_modules/iobroker.sbfspot > sudo npm install

Manchmal muss npm intall mehr als einmal aufgerufen werden, um alle erforderlichen Pakete erfolgreich zu installieren

* Bitte erstellen Sie Probleme bei [github](https://github.com/rg-engineering/ioBroker.sbfspot/issues), wenn Sie Fehler finden oder neue Funktionen wünschen

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 4.1.7 (2023-11-18)
* (René) dependencies updated

### 4.1.6 (2023-07-30)
* (René) dependencies updated

### 4.1.4 (2023-04-07)
* (René) dependencies updated

### 4.1.3 (2023-01-31)
* (René) dependencies updated

### 4.1.2 (2022-08-20)
* (René) bug fix in AddObject

### 4.1.1 (2022-08-18)
* (René) tooltip in wizard added
* (René) flot and dependencies updated

### 4.0.8 (2021-07-11)
* (René) bug fix color of labels in widget

### 4.0.7 (2021-10-30)
* (René) see issue #62: avoid endless loop
* (René) update flot to 4.2.2

### 4.0.6 (2021-07-09)
* (René) bug fix data types

### 4.0.5 (2021-03-21)
* (René) dependencies updated

### 2.3.3 (2019-02-03)
* (René) due to install problems downgrade of sqlite3 package

### 2.3.1 (2019-02-02)
* (René) bug fix: with sqlite "today" data were not shown

### 2.3.0 (2019-01-20)
* (René) support of compact mode
* (René) add additional error information in log

### 2.2.5 (2018-11-26)
* (René) upgrade packages

### 2.2.5 (2018-11-04)
* (René) reset yield if no new value from today

### 2.2.4 (2018-08-19)
* (René) bugfix for ticks on X

### 2.2.3
* (René) the same as 2.2.2

### 2.2.2
* (René) add timestamp of last update

### 2.2.1
* (René) close of database connection after last query result is available (e.g. to support more than one inverter)

### 2.2.0
* (Nis) background color and border
* (René) bug fixes in admin3

### 2.1.0
* (René) Support MariaDB

### 2.0.1
* (René) Support of admin3

### 2.0.0
* (René) since we always use one graph per widget, only one is supported now
		Attention: widget is not compatible with version 1.x.x; just check settings in widget after installation!

### 1.1.0
* (René) autoscale of y axis
* (René) color for y axis 
* (René) adjustable date format

### 1.0.1
* (René) bug fix for sqlite

### 1.0.0
* (René) first stable release

### 0.2.6
* (René) bug fix for android app > 1.0.6

### 0.2.5
* (René) use install date to calculate historical values

### 0.2.4
* (René) logo changed

### 0.2.3
* (René) adding historical data as datapoint (JSON)
* (René) new vis widget to show historical data

### 0.2.2
* (René) renamed to sbfspot

### 0.2.1
* (René) index.html updated

### 0.2.0
* (René) support of sqlite and license changed to MIT

### 0.1.1
* (René) UTF8 coding

### 0.1.0
* (René) first release

### 0.0.1
* (René) initial release

## License
MIT License

Copyright (c) 2017-2023 rg-engineering info@rg-engineering.eu

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