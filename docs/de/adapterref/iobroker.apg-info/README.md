---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.apg-info/README.md
title: ioBroker.apg-info
hash: CixtIWeegkZdILCau1XzGI68LNfcPIeaL4JErovTOIw=
---
![Logo](../../../en/adapterref/iobroker.apg-info/admin/apg-info.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.apg-info.svg)
![Anzahl Installationen (stabil)](http://iobroker.live/badges/apg-info-stable.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.apg-info.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/apg-info-installed.svg)
![Abhängigkeitsstatus](https://img.shields.io/librariesio/release/npm/iobroker.apg-info)
![Bekannte Schwachstellen](https://snyk.io/test/github/HGlab01/ioBroker.apg-info/badge.svg)
![NPM](https://nodei.co/npm/iobroker.apg-info.png?downloads=true)

# IoBroker.apg-info
[![FOSSA-Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.apg-info.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.apg-info?ref=badge_shield) ![Test und Freigabe](https://github.com/HGlab01/ioBroker.apg-info/workflows/Test%20and%20Release/badge.svg)

## Apg-info-Adapter für ioBroker
Dieser Adapter stellt die Spitzenzeiten für das österreichische Stromnetz bereit, in denen Stromverbrauch vermieden werden soll. Darüber hinaus stellt der Adapter die PHELIX Day-Ahead (EPEX Spot)-Preise für Österreich und Deutschland bereit (in den Adaptereinstellungen konfigurieren). Anbietergebühr, Steuer, Netzkosten können optional in der Konfiguration hinzugefügt werden (Registerkarte Berechnung).
`[..].marketprice.today.jsonChart` und `[..].marketprice.tomorrow.jsonChart` können mit https://github.com/Scrounger/ioBroker.vis-materialdesign#json-chart verwendet werden.

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!

## Erfordert
* Node.js 18 oder höher
* ioBroker-Host (JS-Controller) 5.0 oder höher

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__
* (HGlab01) fix issue in debug-mode: Cannot read properties of null (reading 'data')
* (HGlab01) bump axios to 1.6.7

### 0.1.5 (2024-01-20)
* (HGlab01) Add fee, grid costs and tax calculation

### 0.1.4 (2024-01-15)
* (HGlab01) fix 'Cannot read properties of undefined (reading 'status')'

### 0.1.3 (2023-12-26)
* (HGlab01) Fix issue 'Request failed with status code 500' (#170)

### 0.1.2 (2023-12-22)
* (HGlab01) Fix issue 'no marketprice found' when price is 0.00
* (HGlab01) Bump json-explorer to 0.1.15

### 0.1.1 (2023-12-14)
* (HGlab01) support Exxa10.15 auction as forecast

## License
MIT License

Copyright (c) 2024 HGlab01 <myiobrokeradapters@gmail.com>

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

#### Disclaimer apg-powermonitor
More about the security of supply & all data, facts and figures regarding the world of electricity and the energy transition can be found at www.apg-powermonitor.at.


[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.apg-info.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.apg-info?ref=badge_large)