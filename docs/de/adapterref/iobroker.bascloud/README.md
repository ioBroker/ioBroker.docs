---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.bascloud/README.md
title: ioBroker.bascloud
hash: dDBma9R9IqeGgtuWbHoicVotjwZ3PvMKAdk2THgdVJc=
---
![Logo](../../../en/adapterref/iobroker.bascloud/admin/bascloud.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.bascloud.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.bascloud.svg)
![Anzahl der Installationen](https://iobroker.live/badges/bascloud-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/bascloud-stable.svg)
![NPM](https://nodei.co/npm/iobroker.bascloud.png?downloads=true)

# IoBroker.bascloud
![Testen und Freigeben](https://github.com/BAScloud/ioBroker.bascloud/workflows/Test%20and%20Release/badge.svg)

## BAScloud-Adapter für ioBroker
[BAScloud](https://bascloud.net/) ist eine sichere Plattform zur immobilienübergreifenden Vernetzung und Speicherung von Gebäudeinformationen. Neben historischen und aktuellen Messwerten sowie allgemeinen Informationen zu Datenpunkten werden auch Stammdaten von Gebäuden zentral in einer Private Cloud gespeichert.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 0.4.0 (2024-07-15)

- (Yanick) fixes from feedback
- (Yanick) upgrade js-controller and admin dependency
- (Yanick) filter invalid characters
- (Yanick) fix various crashes and timeouts
- (Yanick) add translations to all labels
- (Yanick) set correct types and values
- (Yanick) add testing for windows and macos

### 0.3.0 (2024-06-05)

- (Yanick) always send function
- (Yanick) add function to send on start

### 0.2.0 (2024-06-04)

- (Yanick) fixes for automated adapter testing

### 0.1.2 (2024-06-04)

- (Yanick) fix for 0 values
- (Yanick) translation updates

### 0.1.1 (2024-06-03)

- (Yanick) small fixes, add build folder

### 0.1.0 (2024-06-03)

- (Yanick) initial release

## License

MIT License

Copyright (c) 2024 Yanick Stephan <stephan@bascloud.net>

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