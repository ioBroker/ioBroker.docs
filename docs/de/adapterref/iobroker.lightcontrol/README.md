---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lightcontrol/README.md
title: ioBroker.Lichtsteuerung
hash: m3NWqQj1pYY8F65fMOr+iFCErlFj3TL6bgzpWhoQFJI=
---
![Logo](../../../en/adapterref/iobroker.lightcontrol/admin/lightcontrol.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.lightcontrol.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.lightcontrol.svg)
![Knoten-lts](https://img.shields.io/node/v-lts/iobroker.lightcontrol?style=flat-square)
![GitHub](https://img.shields.io/github/license/schmakus/iobroker.lightcontrol?style=flat-square)
![GitHub-Repo-Größe](https://img.shields.io/github/repo-size/schmakus/iobroker.lightcontrol?logo=github&style=flat-square)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/schmakus/iobroker.lightcontrol?logo=github&style=flat-square)
![Letzter GitHub-Commit](https://img.shields.io/github/last-commit/schmakus/iobroker.lightcontrol?logo=github&style=flat-square)
![GitHub-Probleme](https://img.shields.io/github/issues/schmakus/iobroker.lightcontrol?logo=github&style=flat-square)
![NPM](https://nodei.co/npm/iobroker.lightcontrol.png?downloads=true)
![Beta](https://img.shields.io/npm/v/iobroker.lightcontrol.svg?color=red&label=beta)
![Stabil](http://iobroker.live/badges/lightcontrol-stable.svg)
![Installiert](http://iobroker.live/badges/lightcontrol-installed.svg)
![Paypal-Spende](https://img.shields.io/badge/paypal-donate%20%7C%20spenden-blue.svg)

# IoBroker.lightcontrol
[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/lightcontrol/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

![Testen und Freigeben](https://github.com/Schmakus/ioBroker.lightcontrol/workflows/Test%20and%20Release/badge.svg)

## Versionen
**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Wenn Ihnen meine Arbeit gefällt:
## Installation
Bitte verwenden Sie die Adapterliste und das stabile Repository in ioBroker, um eine Version dieses Adapters zu installieren. Sie können diesen Adapter auch über die CLI installieren:

```
iobroker add lightcontrol
```

## Dokumentation
[🇺🇸 Dokumentation](https://github.com/Schmakus/ioBroker.lightcontrol/blob/2dc2cb6784338c4e13758f4a7d3e4b16578d8db2/docs/en/lightcontrol.md)

[🇩🇪 Dokumentation](https://github.com/Schmakus/ioBroker.lightcontrol/blob/2dc2cb6784338c4e13758f4a7d3e4b16578d8db2/docs/de/lightcontrol.md)

## Aufgaben
- Mehr als eine Lichtgruppe für eine Objekt-ID auswählen (Fehler mit jsonCustom Select multible)
- Verfügbarkeit für Hinweise mit geringerer Helligkeit und definierten Sekunden vor AutoOff

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

-   (Schmakus) fix responsive issues

### 2.0.0 (2025-03-06)

-   (Schmakus) update dependencies
-   (Schmakus) Admin 7.4.10 required
-   (Schmakus) Node 20 required
-   (Schmakus) fix responive issues

### 1.0.1 (2024-09-02)

-   (Schmakus) update dependencies

### 1.0.0 (2024-09-02)

-   (Schmakus) update dependencies

### 0.8.0 (2024-08-16)

-   (Schmakus) Adapter requires node.js >= 18 and Admin >=6 now
-   (Schmakus) Dependencies have been updated
-   (Schmakus) Fixed repo checker issues

### 0.7.0 (2024-07-02)

-   (Schmakus) Dependencies have been updated

## License

MIT License

Copyright (c) 2025 Schmakus <schmakus@gmail.com>

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