---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.fyta/README.md
title: ioBroker.fyta
hash: BZdyWNoktTMzqw5Tu6WBVhSlc/JAdxJr0J8PCvgV8qw=
---
![Logo](../../../en/adapterref/iobroker.fyta/admin/fyta.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.fyta.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.fyta.svg)
![Anzahl der Installationen](https://iobroker.live/badges/fyta-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/fyta-stable.svg)
![NPM](https://nodei.co/npm/iobroker.fyta.png?downloads=true)
![Test und Freigabe](https://github.com/muffin142/ioBroker.fyta/workflows/Test%20and%20Release/badge.svg)

# ioBroker.fyta

<!--

-->

## FYTA-Adapter für ioBroker

Inoffizieller Adapter zur Verbindung von ioBroker mit [FYTA-Pflanzensensoren.](https://fyta.de/) Sensoren sind im [FYTA-Shop](https://fyta.de/collections/all) erhältlich.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
-	none

### 0.2.7 (2026-05-17)
-	repaired error in writing rawValues

### 0.2.6 (2026-05-16)
- 	Updated dependencies
-	repaired raw value retrieval

### 0.2.5 (2026-04-20)
-	Made data retrieval more synchronous and introduced delays to avoid exceeding API limits 

### 0.2.4 (2025-12-28)
-	Added additional notifications ans support for airt humidity status

### 0.2.1 (2025-12-08)
-	Error messages corrected and specified

### 0.2.0 (2025-04-28)
-   Added retrieval of raw values
-	Added use of internal notifications

[Older changelogs can be found there](https://github.com/muffin142/ioBroker.fyta/blob/main/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025-2026 muffin142 <muffin142@outlook.com>

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