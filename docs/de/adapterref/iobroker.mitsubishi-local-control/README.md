---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mitsubishi-local-control/README.md
title: ioBroker.mitsubishi-local-control
hash: 1qJ6gtA+lRsSdjDDmnBQ2zHVIxtheukE5AKkYM1VSJo=
---
![Logo](../../../en/adapterref/iobroker.mitsubishi-local-control/admin/mitsubishi-local-control.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.mitsubishi-local-control.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.mitsubishi-local-control.svg)
![Anzahl der Installationen](https://iobroker.live/badges/mitsubishi-local-control-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/mitsubishi-local-control-stable.svg)
![NPM](https://nodei.co/npm/iobroker.mitsubishi-local-control.png?downloads=true)
![Bekannte Schwachstellen](https://snyk.io/test/github/Black-Thunder/ioBroker.mitsubishi-local-control/badge.svg)

# IoBroker.mitsubishi-local-control
## Mitsubishi-local-control-Adapter für ioBroker
Der **mitsubishi-local-control**-Adapter integriert Klimaanlagen von Mitsubishi Electric über eine **direkte lokale Verbindung** in **ioBroker**.

## Merkmale
- Direkte lokale Steuerung über die Mitsubishi Wi-Fi-Schnittstelle
- Keine Cloud, keine externen Abhängigkeiten
- Gerätezustände lesen und schreiben
- Regelmäßige Abfrage des Gerätestatus
- Unterstützung für mehrere Geräte
- Automatische Gerätestatussynchronisierung

## Dokumentation:
- [Englische Beschreibung](https://github.com/Black-Thunder/ioBroker.mitsubishi-local-control/tree/main/docs/en/mitsubishi-local-control.md)
- [Deutsche Beschreibung](https://github.com/Black-Thunder/ioBroker.mitsubishi-local-control/tree/main/docs/de/mitsubishi-local-control.md)

## Diskussion:
- [ioBroker Forum](https://forum.iobroker.net/topic/83267)

## Danksagungen
Besonderer Dank und Anerkennung gebührt [Niobos](https://github.com/pymitsubishi/pymitsubishi) für das Reverse Engineering der API!

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- (Black-Thunder) Adapter requires admin version >=7.6.20 now

### 1.0.5 (2026-01-13)

- (Black-Thunder) Creation of adapter objects was fixed

### 1.0.4 (2026-01-11)

- (Black-Thunder) Dependencies were updated

### 1.0.3 (2025-12-29)

- (Black-Thunder) Cleaned up some code

### 1.0.2 (2025-12-25)

- (Black-Thunder) Implemented command coalescing and mapped AUTO mode correctly

### 1.0.1 (2025-12-21)

- (Black-Thunder) Refactored energy and power state properties

### 1.0.0 (2025-12-18)

- (Black-Thunder) initial release

## License

MIT License

Copyright (c) 2025-2026 Black-Thunder <glwars@aol.de>

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