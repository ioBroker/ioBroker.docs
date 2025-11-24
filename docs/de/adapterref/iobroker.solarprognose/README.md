---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.solarprognose/README.md
title: ioBroker.solarprognose
hash: Bla4RJ3Vg7Abe8uetywrFudc9uZUayziG6adyshNajQ=
---
![Logo](../../../en/adapterref/iobroker.solarprognose/admin/solarprognose.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.solarprognose.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.solarprognose.svg)
![Anzahl der Installationen](https://iobroker.live/badges/solarprognose-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/solarprognose-stable.svg)
![NPM](https://nodei.co/npm/iobroker.solarprognose.png?downloads=true)

# IoBroker.solarprognose
**Tests:** ![Test und Freigabe](https://github.com/Scrounger/ioBroker.solarprognose/workflows/Test%20and%20Release/badge.svg)

## Solarprognose-Adapter für ioBroker
Solarprognose basierend auf der API von [solarprognose.de](https://www.solarprognose.de/)

## API-Konfiguration
1. Unter Einstellungen -> API-Übersicht ein Zugriffstoken erstellen.

2. Unter Einstellungen -> Benutzerprofil muss für alle Zeitzonen die Option „UTC (UTC -00:00)“ ausgewählt sein.

   ![Bild](../../../en/adapterref/iobroker.solarprognose/doc/api_timezone.png)

3. Unter Einstellungen -> Benutzereinstellungen muss die Option „Benutzerzeitzone in der API verwenden“ aktiviert sein.

   ![Bild](../../../en/adapterref/iobroker.solarprognose/doc/api_use_timezone.png)

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.0.0 (2025-10-23)

- (Scrounger) !!! breaking changes - states structure has been completely revised !!!
- (Scrounger) dependencies updated
- (Scrounger) node minimum set to 20
- (Scrounger) converted to esm
- (Scrounger) eslint 9 added

### 1.2.2 (2025-02-08)

- (Scrounger) bug fixes

### 1.2.1 (2024-10-18)

- (Scrounger) bug fixes

### 1.2.0 (2024-10-17)

- (Scrounger) calc accuracy on state changed
- (Scrounger) update energy now and energy from now every hour
- (Scrounger) optional interpolate daily energy values (energy now and energy from now)

### 1.1.0 (2024-10-15)

- (Scrounger) accuracy calculation added
- (Scrounger) energy now added
- (Scrounger) energy from now added
- (Scrounger) bug fixes

### 1.0.0 (2024-10-08)

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