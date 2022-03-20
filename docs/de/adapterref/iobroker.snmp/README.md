---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.snmp/README.md
title: ioBroker.snmp
hash: D6Ehnm9VxRfXBY2U36r8YLIy8Omlq15Atc6y2A3ACIU=
---
![Logo](../../../en/adapterref/iobroker.snmp/admin/snmp.png)

![Anzahl der Installationen](http://iobroker.live/badges/snmp-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.snmp.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.snmp.svg)

# IoBroker.snmp
![Testen und freigeben](https://github.com/iobroker-community-adapters/iobroker.snmp/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/snmp/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Die Info
Dieser Adapter fragt Informationen von SNMP-Geräten wie Drucker, Netzwerk ...

## Changelog
### __WORK IN PROGRESS__
* IMPORTANT: This release will change the object structures!!
* (McM1957) reduce latency for update of info.connection 
* (McM1957) avoid excessive error logs if target is unreachable, optimize logging
* (McM1957) add additional online at ip base to indicate target is reachable
* (McM1957) output warning if OIDs specify different communities for one device
* (Apollon77) Add Sentry for crash reporting

### 0.5.0
* (Marcolotti) Add documentation (de,en,ru)
* (Marcolotti) Add languages (de,en,ru)

### 0.0.3
* (Apollon77)  Fix Object Type

### 0.0.2
* (Bluefox)    Fixes

### 0.0.1
* (Bluefox)    refactoring
* (Marcolotti) initial release

## License
The MIT License (MIT)

Copyright (c) 2017-2022 Marcolotti <info@ct-j.de>, ioBroker Community Developers 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.