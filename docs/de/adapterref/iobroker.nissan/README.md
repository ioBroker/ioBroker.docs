---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.nissan/README.md
title: ioBroker.nissan
hash: FbxmhAnuLWz2syQPO2VGYuM2z74lmRVrTUd5kZrMjuQ=
---
![Logo](../../../en/adapterref/iobroker.nissan/admin/nissan.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.nissan.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.nissan.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/nissan-installed.svg)
![Anzahl Installationen (stabil)](https://iobroker.live/badges/nissan-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/TA2k/iobroker.nissan.svg)
![NPM](https://nodei.co/npm/iobroker.nissan.png?downloads=true)

# IoBroker.nissan
**Tests:** ![Testen und Freigeben](https://github.com/TA2k/ioBroker.nissan/workflows/Test%20and%20Release/badge.svg)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.**\ Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!\ Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Nissan-Adapter für ioBroker
Mit dem Nissan Adapter können Sie die neuesten Daten Ihres Nissan-Fahrzeugs abfragen, den aktuellen Batterie- und Ladestatus anzeigen, den aktuellen Zustand der Klimaanlage anzeigen, die Klimaanlage starten oder stoppen und den Ladevorgang aus der Ferne starten.

[Nissan Connect/App-Informationen](https://www.nissan.de/kunden/nissan-connect-apps.html)

## Forum
Verfolgen Sie die Diskussionen gerne auf Deutsch [iobroker-Forum](https://forum.iobroker.net/topic/46700/test-adapter-nissan-v-0-0-x)

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (bolliy) Dependency and configuration updates
- (bolliy) Added Admin 5 configuration
- (bolliy) ConnectEV: Update status before reading cachedeStatus
- (bolliy) improve State roles and types

### 0.1.2 (2024-05-31)

- Refresh Token fix

### 0.1.1 (2024-05-20)

- Login fixed.

### 0.1.0 (2024-05-18)

- login fixed

### 0.0.2

- (TA2k) initial release

## License

MIT License

Copyright (c) 2021-2024 TA2k <tombox2020@gmail.com>

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