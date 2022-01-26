---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.kostal-piko-ba/README.md
title: ioBroker.kostal-piko-ba
hash: 2ko0VniTyAy5+WiPRl8qRZNIMGJNQo44ffLR5DPNJTs=
---
![Logo](../../../en/adapterref/iobroker.kostal-piko-ba/admin/picoba.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.kostal-piko-ba.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.kostal-piko-ba.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/hombach/ioBroker.kostal-piko-ba/badge.svg)
![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.kostal-piko-ba?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.kostal-piko-ba.png?downloads=true)

# IoBroker.kostal-piko-ba
![NPM-Version (stabil)](http://ioBroker.live/badges/kostal-piko-ba-stable.svg) ![Anzahl der Installationen (neueste)](http://ioBroker.live/badges/kostal-piko-ba-installed.svg)

CI-Tests: ![Node.js-CI](https://github.com/hombach/ioBroker.kostal-piko-ba/workflows/Node.js%20CI/badge.svg)

## Adapter zum Auslesen von Kostal Piko BA Daten für iOBroker
Adapter zum Auslesen von Kostal Piko BA Daten. Der Adapter erstellt einige Zustände und aktualisiert sie nacheinander.
Adapter funktioniert auch mit Kostal Piko 15 Wechselrichter.
Es wird sehr geschätzt, wenn Sie die Funktionalität mit anderen Wechselrichtern überprüfen und mir bitte eine Nachricht senden.

## Einstellungen
Um sich mit dem Kostal Pico BA-Wechselrichter zu verbinden, müssen Sie dessen IP-Adresse in der Konfiguration angeben.
Sie können auch die Aktualisierungsfrequenzen von Live-Daten, Tages- und Livezeit-Statistiken bearbeiten.

## Anmerkungen
Dieser Adapter verwendet Sentry-Bibliotheken, um automatisch Ausnahmen und Codefehler an die Entwickler zu melden. Weitere Details und Informationen zum Deaktivieren der Fehlermeldung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Changelog

! Note that missing version entries are typically dependency updates for security.

### 1.3.1 (23.01.2022)
* (HombachC) correct rounding of analog values; bumped dependencies
* (HombachC) added validation of configured IPv4 address

### 1.3.0 (01.01.2022)
* (HombachC) added optional support for analog inputs

### 1.2.1 (24.12.2021)
* (HombachC) introduced rounding of battery temp

### 1.2.0 (16.12.2021)
* (HombachC) dropped node.js 10 support; bumped dependencies; fixed vulnerability

### 1.1.13 (16.10.2021)
* (HombachC) bumped dependencies; fixed vulnerability

### 1.1.12 (07.10.2021)
* (GermanBlueFox) fixed icon link
* (HombachC) bumped dependencies

### 1.1.10 (16.07.2021)
* (HombachC) bumped dependencies; fixed vulnerability

### 1.1.7 (09.05.2021)
* (HombachC) added tests for node.js 16; fixed vulnerability

### 1.1.3 (23.11.2020)
* (HombachC) added battery.Voltage; added additional error handler; bumped dependencies

### 1.1.1 (09.10.2020) stable
* (HombachC) minor documentation tweaks; DC current accuracy changed to mA

### 1.1.0 (09.10.2020)
* (tobstare) added DC1-3 Current, Voltage and Power
* (HombachC) added battery.ChargeCycles
* (HombachC) bumped dependencies; added battery.temperature

### 1.0.2 (23.09.2020)
* (HombachC) public release for stable repo
### 0.8.0 (18.08.2020)
* (HombachC) seperate editable poll timer for statistics data
### 0.7.4 (03.07.2020)
* (HombachC) added sentry.io support
### 0.6.1 (28.06.2020)
* (HombachC) poll of statistics data separated
### 0.5.1 (22.06.2020)
* (HombachC) introduced editable poll interval 
### 0.1.0 (15.05.2020)
* (HombachC) initial working release

## License
MIT License

Copyright (c) 2020 - 2022 HombachC

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