---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.followthesun/README.md
title: ioBroker.followthesun
hash: vEVbQqAMHxt+5gc0m4YFo7UpB1DG6NYTK6WtaeLCaNw=
---
![Logo](../../../en/adapterref/iobroker.followthesun/admin/followthesun.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.followthesun.svg)
![Anzahl Installationen (stabil)](http://iobroker.live/badges/followthesun-stable.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.followthesun.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/followthesun-installed.svg)
![Abhängigkeitsstatus](https://img.shields.io/librariesio/release/npm/iobroker.followthesun)
![Bekannte Schwachstellen](https://snyk.io/test/github/HGlab01/ioBroker.followthesun/badge.svg)
![NPM](https://nodei.co/npm/iobroker.followthesun.png?downloads=true)

# IoBroker.followthesun
[![FOSSA-Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.followthesun.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.followthesun?ref=badge_shield) ![Test und Freigabe](https://github.com/HGlab01/ioBroker.followthesun/workflows/Test%20and%20Release/badge.svg)

## Followthesun-Adapter für ioBroker
Dieser Adapter berechnet anhand der Geoposition die aktuelle Höhe und den Azimut der Sonne. Zusätzlich wird die Himmelsrichtung und die Bewegung (Sonnenaufgang oder -untergang) der Sonne gespeichert.
Es verwendet die in der Konfiguration definierte Geoposition. Das Berechnungsintervall kann in den Instanzeinstellungen definiert werden.
Auch die Mittagswerte für bestimmte Tage wie heute, morgen oder Frühlings-/Sommer-/Herbst-/Winteranfang werden gespeichert.

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!

## Erfordert
* NodeJS 16 oder höher
* ioBroker-Host (JS-Controller) 4.0 oder höher

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->

### __WORK IN PROGRESS__
* (HGlab01) !Breaking change! NodeJS 16 or higher required

### 0.4.2 (2023-08-10)
* (HGlab01) Improve admin5 UI usage

### 0.4.1 (2023-02-05)
* (HGlab01) Improve error log if coordinates are not set

### 0.4.0 (2022-11-19)
* (Jey-Cee) Updated object definitions: use of roles, multilanguage names
* (Jey-Cee) Added missing objects for folders
* (HGlab01) !Breaking change! NodeJS 14.16 or higher required
* (HGlab01) !Breaking change! ioBroker js-controller 4.0 or higher required
* (HGlab01) Update libs

### 0.3.9 (2022-02-24)
* (HGlab01) Bump iobroker-jsonexplorer to v0.1.9
* (HGlab01) js-controller 4.0 readiness
* (HGlab01) fix sometimes today is not today

### 0.3.8 (2021-12-07)
* (HGlab01) Notifiy Sentry about new release

## License
MIT License

Copyright (c) 2023 HGlab01 <iobroker.followthesun@gmail.com>

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


[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.followthesun.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.followthesun?ref=badge_large)