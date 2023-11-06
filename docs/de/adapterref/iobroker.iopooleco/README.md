---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.iopooleco/README.md
title: ioBroker.iopooleco
hash: 4/YQ1WAsIXZEc1AuCEa3U22YSOAXKWaL76itHNzrTS8=
---
![Logo](../../../en/adapterref/iobroker.iopooleco/admin/iopooleco.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.iopooleco.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.iopooleco.svg)
![Anzahl der Installationen](https://iobroker.live/badges/iopooleco-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/iopooleco-stable.svg)
![NPM](https://nodei.co/npm/iobroker.iopooleco.png?downloads=true)

# IoBroker.iopooleco
**Tests:** ![Test und Freigabe](https://github.com/mule1972/ioBroker.iopooleco/workflows/Test%20and%20Release/badge.svg)

## Iopooleco-Adapter für ioBroker
Stellen Sie eine Verbindung zu Ihrem Poolmessgerät ECO von iopool (https://iopool.com) her und erhalten Sie alle 15 Minuten ORP, PH und Temperatur über ioBroker.

Installieren Sie einfach diesen Adapter und geben Sie Ihren API-Schlüssel über die iopool-App ein.
Der API-Schlüssel kann in Ihrer iopool-App unter Mehr/Einstellungen/API-Schlüssel generiert werden.

## Changelog
### 0.5.1 (2023-10-25)
improve scheduler calculation
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 0.5.0 (2023-10-25)
update readme & secure API key & change scheduler & bugfixes

### 0.4.1 (2023-10-19)
change repo URL to https

### 0.4.0 (2023-10-16)
some bugfixes & added offsets for temperature, ORP and pH if meter is inaccurate

### 0.3.0 (2023-10-13)
add error handling for invalid measurements

### 0.2.3 (2023-10-13)
minor changes to error handling

### 0.2.2 (2023-10-13)
minor changes to readme

### 0.2.1 (2023-10-13)
minor changes to readme

### 0.2.0 (2023-10-12)
* (Mule) initial release

### 0.0.1 (2023-10-12)
* (Mule) initial test release

## License
MIT License

Copyright (c) 2023 Mule

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