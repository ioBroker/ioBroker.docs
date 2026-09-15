---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.dwd/README.md
title: ioBroker.dwd
hash: ZdGwkbg3gFHRIb4H9JgzC+Aqp0KqK0C1N7koIVpcmqU=
---
![Logo](../../../en/adapterref/iobroker.dwd/admin/dwd.png)

![Anzahl der Installationen](http://iobroker.live/badges/dwd-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.dwd.svg)
![Test und Freigabe](https://github.com/ioBroker/iobroker.dwd/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/dwd/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.dwd.svg)

# ioBroker.dwd

Copyright Deutscher Wetterdienst

Dieser Adapter lädt die Wetterwarnungen vom deutschen Wetterdienst über JSON-Link.

Dieser Adapter lädt die Wetterwarnungen des deutschen Wetterdienstes über einen JSON-Link.

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 2.8.7 (2026-05-19)
* (arteck) fix invalid JSON
* (arteck) add info.lastUpdate
* (arteck) add eslint
* (arteck) Dependencies have been updated
* (arteck) fix hint dp in widget

### 2.8.5 (2023-06-15)
* (Quarkmax) added the hint for warning instructions

### 2.8.3 (2022-03-23)
* (Apollon77) Do not add unused warning0

### 2.8.2 (2022-03-22)
* (Apollon77) Add instruction text to warning data
* (Apollon77) Check missing objects and add them

### 2.7.7 (2021-07-01)
* (Apollon77) Fix start/end dates

## License

The MIT License (MIT)

Copyright (c) 2016-2026 bluefox <dogafox@gmail.com>, hobbyquaker

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