---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.apg-info/README.md
title: ioBroker.apg-info
hash: pVoUEfts8+PBYVtWzZRIOMuYCYfphzCJLZKLftSgpZc=
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
Dieser Adapter stellt die Spitzenzeiten für das österreichische Stromnetz bereit, in denen Stromverbrauch vermieden werden soll. Darüber hinaus stellt der Adapter die PHELIX Day-Ahead (EPEX Spot)-Preise für Österreich und Deutschland bereit (in den Adaptereinstellungen konfigurieren).<br> `[..].marketprice.today.jsonChart` und `[..].marketprice.tomorrow.jsonChart` können mit https://github.com/Scrounger/ioBroker.vis-materialdesign#json-chart verwendet werden.

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!

## Erfordert
* NodeJS 18 oder höher
* ioBroker-Host (JS-Controller) 5.0 oder höher

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.1.0-alpha.0 (2023-11-28)
* (HGlab01) first minor release
* (HGlab01) NodeJS 18 or higher
* (HGlab01) ioBroker host (js-controller) 5.0 or higher

### 0.0.7 (2023-10-11)
* (HGlab01) Bump json-explorer to 0.1.14
* (HGlab01) add jsonChart-json for market prices

### 0.0.6 (2023-10-04)
* (HGlab01) fix "TypeError: Cannot read properties of undefined (reading 'Warning')"

### 0.0.5 (2023-10-03)
* (HGlab01) switch data provider for prices to EXAA
* (HGlab01) support DE market prices in addiotion to AT prices

### 0.0.3 (2023-09-24)
* (HGlab01) add point in times sorted as array
* (HGlab01) add average price
* (HGlab01) fix bug IOBROKER-APG-INFO-2 notified by sentry

## License
MIT License

Copyright (c) 2023 HGlab01 <myiobrokeradapters@gmail.com>

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