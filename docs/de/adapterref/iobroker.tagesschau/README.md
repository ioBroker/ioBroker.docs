---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tagesschau/README.md
title: ioBroker.tagesschau
hash: 5ZK9t/CEIsWKNemo9oQJdxMkeuNf3SHfJeOLXZ6z25g=
---
![Logo](../../../en/adapterref/iobroker.tagesschau/admin/tagesschau.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.tagesschau.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tagesschau.svg)
![Anzahl der Installationen](https://iobroker.live/badges/tagesschau-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/tagesschau-stable.svg)
![NPM](https://nodei.co/npm/iobroker.tagesschau.png?downloads=true)

#ioBroker.tagesschau
**Tests:** ![Testen und Freigeben](https://github.com/ticaki/ioBroker.tagesschau/workflows/Test%20and%20Release/badge.svg)

## Tagesschau-Adapter für ioBroker
[Deutsche Anleitung (aktuell)](README-GER.md)

Ruft Nachrichten und Videolinks der Tagesschau ab.

Der Inhalt ist nur auf Deutsch verfügbar.

Installieren - im Admin die gewünschten Einstellungen vornehmen - fertig.

**Laut Tagesschau-API sind 60 Abfragen pro Stunde ok. Jedes Thema und Video ist 1 Abfrage. 30 Minuten pro Update passen immer. Keine Ahnung, wie die das genau nehmen.**

Bitte beachten Sie:

1. Wenn Nachrichten aktivieren oder Videonachrichten aktivieren nicht ausgewählt sind, pausiert der Adapter
2. Wenn „Nachrichten aktivieren“ ausgewählt ist, läuft der Adapter nur, wenn in der Konfiguration 1 Thema und 1 Bundesland ausgewählt sind.
3. Die Schlüsselwörter werden aus den Nachrichten extrahiert und sind erst nach dem ersten Durchlauf verfügbar. Es werden mit der Zeit immer mehr! Diese gelten nur für die Nachrichten.

## Haftungsausschluss
**Alle Produkt- und Firmennamen oder Logos sind Warenzeichen™ oder eingetragene® Warenzeichen ihrer jeweiligen Inhaber. Ihre Verwendung impliziert keine Zugehörigkeit oder Billigung durch sie oder verbundene Tochterunternehmen! Dieses persönliche Projekt wird in der Freizeit gepflegt und verfolgt kein Geschäftsziel.** **Tagesschau ist ein Warenzeichen von ARD-aktuell.** https://www.tagesschau.de/impressum

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.5.0 (2025-01-27)
* (ticaki) States added for browsing.
* (ticaki) Another attempt to constantly sort the videos in the same way.
* (ticaki) Control states reorganised.
* (ticaki) Placeholder images for no news now work

### 0.4.3 (2025-01-25)
* (ticaki) remove some helper code to do translations

### 0.4.2 (2025-01-25)
* (ticaki) make the code fit for latest

### 0.4.1 (2025-01-17)
* (ticaki) videos always in the same order.

### 0.4.0 (2025-01-07)
* (ticaki) Command data point for defining the first news to be displayed
* (ticaki) Reduce object updates
* (ticaki) Total number of news as a data point
* (ticaki) We not in hurry, write object updates slowly.
* (ticaki) Info log messages are a bit more fun. (error and warn messages are not funny at all)

### 0.3.2 (2025-01-05)
* (ticaki) added length to videos
* (ticaki) System load reduced at startup

### 0.3.1 (2025-01-05)
* (ticaki) Back to stable admin

### 0.3.0 (2025-01-05)
* (ticaki) States are only updated when changes are made.
* (ticaki) Last update Data point added with timestamp of the last successful data access
* (ticaki) Emptying of data points improved
* (ticaki) Placeholder images inserted for no news.
* (ticaki) User-defined keywords with `*`
* (ticaki) Requires admin version 7.4.9 or higher

### 0.2.3 (2025-01-05)
* (ticaki) Fixed: Adapter deletes own states

### 0.2.1 (2025-01-05)
* (ticaki) fixed refresh interval & add axios timeouts

### 0.2.0 (2025-01-05)
* (ticaki) remove tracking from videos
* (ticaki) beautiful state name

### 0.1.4 (2025-01-04)
* (ticaki) Fixed: More as 1 region bug

### 0.1.3 (2025-01-04)
* (ticaki) Reduced size of the icon

### 0.1.2 (2025-01-04)
* (ticaki) Added: Breaking news is excluded from filtering and copied to a separate folder. 
* (ticaki) Changed: Taglist is now sorted.

### 0.1.1 (2025-01-04)
* (ticaki) fixed: The empty configuration after the first installation leaves crashed adapters

### 0.1.0 (2025-01-04)
* (ticaki) initial release

## License
MIT License

Copyright (c) 2025 ticaki <github@renopoint.de>

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