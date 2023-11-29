---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.fuelpricemonitor/README.md
title: ioBroker.fuelpricemonitor
hash: /j/rj0m0QywgnVt/6oncEbZJKCu+nqTo8fj+bzhyEws=
---
![Logo](../../../en/adapterref/iobroker.fuelpricemonitor/admin/fuelpricemonitor.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.fuelpricemonitor.svg)
![Anzahl Installationen (stabil)](http://iobroker.live/badges/fuelpricemonitor-stable.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.fuelpricemonitor.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/fuelpricemonitor-installed.svg)
![Abhängigkeitsstatus](https://img.shields.io/librariesio/release/npm/iobroker.fuelpricemonitor)
![Bekannte Schwachstellen](https://snyk.io/test/github/HGlab01/ioBroker.fuelpricemonitor/badge.svg)
![NPM](https://nodei.co/npm/iobroker.fuelpricemonitor.png?downloads=true)

# IoBroker.fuelpricemonitor
[![FOSSA-Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.fuelpricemonitor.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.fuelpricemonitor?ref=badge_shield) ![Test und Freigabe](https://github.com/HGlab01/ioBroker.fuelpricemonitor/workflows/Test%20and%20Release/badge.svg)

## Kraftstoffpreismonitor-Adapter für ioBroker
Dieser Adapter ruft die Kraftstoffpreise (Diesel, Super95 und CNG) aus der offiziellen österreichischen Datenbank basierend auf Ihrer konfigurierten Geoposition ab. Die API liefert die Preise nur für die ersten 5 Stationen. Für die anderen 5 Stationen sind die Preise nicht verfügbar. Weitere Standorte können hinzugefügt werden.
Der Standardplan wird alle 20 Minuten als Cron-Job auf der Registerkarte „Instanz“ ausgeführt.

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!

## Erfordert
* NodeJS 18 oder höher
* ioBroker-Host (JS-Controller) 5.0 oder höher

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.4.0-alpha.0 (2023-11-28)
* (HGlab01) Breaking changes
    - Node 18.0 or higher
    - ioBroker host (js-controller) 5.0 or higher
* (HGlab01) Bump axios to 1.6.2

### 0.3.6 (2023-08-10)
* (HGlab01) switch to Admin5 UI for configuration

### 0.3.5 (2023-07-07)
* (HGlab01) Spread API calls
* (HGlab01) Bump ioBroker-jsonExplorer to 0.1.12

### 0.3.4 (2023-02-05)
* (HGlab01) Cheapest station from experimental to stable
* (HGlab01) Bump axios to 1.3.2

### 0.3.3 (2022-12-22)
* (HGlab01) Cheapest station now per fuel type (#445)

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


[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.fuelpricemonitor.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.fuelpricemonitor?ref=badge_large)