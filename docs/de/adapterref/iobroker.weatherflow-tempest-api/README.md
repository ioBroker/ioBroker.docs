---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.weatherflow-tempest-api/README.md
title: ioBroker.weatherflow-tempest-api
hash: zAqJa262snmHOZLt4n2w5JdQ1BklYcfEmWm3kETfRvM=
---
![Logo](../../../en/adapterref/iobroker.weatherflow-tempest-api/admin/weatherflow-tempest-api.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.weatherflow-tempest-api.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.weatherflow-tempest-api.svg)
![Anzahl der Installationen](https://iobroker.live/badges/weatherflow-tempest-api-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/weatherflow-tempest-api-stable.svg)
![NPM](https://nodei.co/npm/iobroker.weatherflow-tempest-api.png?downloads=true)

# IoBroker.weatherflow-tempest-api
**Tests:** ![Testen und Freigeben](https://github.com/Scrounger/ioBroker.weatherflow-tempest-api/workflows/Test%20and%20Release/badge.svg)

## Weatherflow-tempest-api-Adapter für ioBroker
Holen Sie sich Daten für Ihr [Tempest Wetterstation](https://tempest.earth/tempest-home-weather-system/) von der [WeatherFlow Tempest API](https://weatherflow.github.io/Tempest/api/)

### Integrierte Endpunkte
| Endpunkt | Typ | Erfolg |
| ------------ | :--: | :-----: |
| Beobachtungen | Rest | tbd |
| Stationen | Rest | tbd |
| Prognose | Ruhe | ✔ |

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.1.3 (2025-10-19)

- (Scrounger) dependencies updated

### 1.1.2 (2025-10-08)

- (Scrounger) weather specific roles added #21
- (Scrounger) auto translation bug fix
- (Scrounger) dependencies updated

### 1.1.1 (2025-09-30)

- (Scrounger) bug fixes

### 1.1.0 (2025-09-29)

- (Scrounger) code optimized
- (Scrounger) roles added
- (Scrounger) dependencies updated
- (Scrounger) node minimum set to 20
- (Scrounger) converted to esm
- (Scrounger) eslint 9 added

### 1.0.3 (2024-10-18)

- (Scrounger) bug fixes

### 1.0.2 (2024-09-17)

- (Scrounger) bug fixes
- (Scrounger) using cron for update interval

### 1.0.1 (2024-09-15)

- (Scrounger) bug fixes
- (Scrounger) dependencies updated

### 1.0.0 (2024-09-15)

- (Scrounger) forecast api integrated
- (Scrounger) initial release

## License

MIT License

Copyright (c) 2025 Scrounger <scrounger@gmx.net>

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