---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.airconwithme/README.md
title: ioBroker.airconwithme
hash: 8At/uj5Yzl9hmpuibkprJWHGXlAOxZ39o+m/yrb3x+M=
---
![Logo](../../../en/adapterref/iobroker.airconwithme/admin/airconwithme.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.airconwithme.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.airconwithme.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/airconwithme-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/airconwithme-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/weggetor/iobroker.airconwithme.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/weggetor/ioBroker.airconwithme/badge.svg)
![NPM](https://nodei.co/npm/iobroker.airconwithme.png?downloads=true)

# IoBroker.airconwithme
**Tests:** ![Test und Freigabe](https://github.com/weggetor/ioBroker.airconwithme/workflows/Test%20and%20Release/badge.svg)

## Airconwithme Adapter für ioBroker
Adapter für Mitsubishi-Klimaanlagen mit WLAN-Adapter airconwithme

## Information
In den Adaptereinstellungen muss die IP-Adresse Ihres WLAN-Adapters der Klimaanlage eingegeben werden. Benutzername und Passwort für den Intesis-Adapter lauten standardmäßig „admin“ + „admin“.

Die meisten Datenpunkte sind schreibgeschützt, Sie können Folgendes einstellen:

| Datenpunkt | Werte |
|----------|----------|
| ein | 0: Aus; 1: Ein |
| Benutzermodus | 0: Auto; 1: Heizen; 2: Trocknen; 3: Lüfter; 4: Kühlen |
| Lüftergeschwindigkeit | 1: Stufe 1; 2: Stufe 2; 3: Stufe 3; 4: Stufe 4 |
| Position | 1: Position 1; 2: Position 2; 3: Position 3; 4: Position 4; 10: Schwung |
| Benutzer-Sollwert | Temperatur (°C) |
| remoteDisable | 0: Aktivieren; 1: Deaktivieren |

## Changelog
### 1.0.0 (2025-11-15)
* (weggetor) **MAJOR RELEASE**: Complete adapter modernization
* (weggetor) **BREAKING**: Migrated to TypeScript with modern ES2020+ features
* (weggetor) **SECURITY**: Updated all dependencies, eliminated vulnerabilities (0 vulnerabilities!)
* (weggetor) **ENHANCEMENT**: Complete code refactoring with proper error handling and logging
* (weggetor) **ENHANCEMENT**: Improved session management with smart caching and reconnection logic
* (weggetor) **ENHANCEMENT**: Modern GitHub Actions CI/CD pipeline with automated testing
* (weggetor) **ENHANCEMENT**: Enhanced type safety with comprehensive TypeScript interfaces
* (weggetor) **ENHANCEMENT**: Modular code structure for better maintainability

### 0.0.4
* (weggetor) Bugfix sending username + password to Intesis API (formerly send admin/admin hardcoded)

### 0.0.3
* (weggetor) Renamed some variables to avoid possible interference with other adapters, removed not used adminTab

### 0.0.2
* (weggetor) Modifications to automatic build incl. upload to npm

### 0.0.1
* (weggetor) initial release

## License
MIT License

Copyright (c) 2025 Torsten Weggen <info@bitboxx.net>

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