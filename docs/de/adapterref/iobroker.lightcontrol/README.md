---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lightcontrol/README.md
title: ioBroker.lightcontrol
hash: 2C8lox7QJJk3YWndhJjKQTbbN03SjxFzwB2yH3gvwgI=
---
![Logo](../../../en/adapterref/iobroker.lightcontrol/admin/lightcontrol.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.lightcontrol.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.lightcontrol.svg)
![Knoten-lts](https://img.shields.io/node/v-lts/iobroker.lightcontrol?style=flat-square)
![GitHub](https://img.shields.io/github/license/schmakus/iobroker.lightcontrol?style=flat-square)
![GitHub-Repo-Größe](https://img.shields.io/github/repo-size/schmakus/iobroker.lightcontrol?logo=github&style=flat-square)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/schmakus/iobroker.lightcontrol?logo=github&style=flat-square)
![GitHub letzter Commit](https://img.shields.io/github/last-commit/schmakus/iobroker.lightcontrol?logo=github&style=flat-square)
![GitHub-Probleme](https://img.shields.io/github/issues/schmakus/iobroker.lightcontrol?logo=github&style=flat-square)
![NPM](https://nodei.co/npm/iobroker.lightcontrol.png?downloads=true)
![Beta](https://img.shields.io/npm/v/iobroker.lightcontrol.svg?color=red&label=beta)
![Stabil](http://iobroker.live/badges/lightcontrol-stable.svg)
![Eingerichtet](http://iobroker.live/badges/lightcontrol-installed.svg)
![Paypal-Spende](https://img.shields.io/badge/paypal-donate%20%7C%20spenden-blue.svg)

# IoBroker.lightcontrol
[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/lightcontrol/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

![Test und Freigabe](https://github.com/Schmakus/ioBroker.lightcontrol/workflows/Test%20and%20Release/badge.svg)

## Versionen
**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Wenn Ihnen meine Arbeit gefällt:
## Installation
Bitte verwenden Sie die „Adapterliste“ und das Stable Repository in ioBroker, um eine Version dieses Adapters zu installieren. Sie können diesen Adapter auch über die CLI installieren:

```
iobroker add lightcontrol
```

## Dokumentation
[🇺🇸 Dokumentation](./en/lightcontrol.md)

[🇩🇪 Dokumentation](./docs/de/lightcontrol.md)

## Machen
- Wählen Sie mehr als eine LightGroup für eine Objekt-ID (Fehler bei jsonCustom Select multible)
- Verfügbarkeit für Benachrichtigungen mit geringerer Helligkeit und definierten Sekunden vor AutoOff

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 0.5.0 (2024-03-01)

-   (Schmakus) update dependencies
-   (Schmakus) update license year
-   (Schmakus) fixed AutoOnLux (Cannot read properties of undefined (reading 'minLux'))

### 0.4.0 (2023-08-16)

-   (Schmakus) Node >=16 and NPM >=7 necessary!
-   (Schmakus) fixed rampOff.time
-   (Schmakus) update dependencies

### 0.3.0 (2023-07-17)

-   (Schmakus) (thoml95) Changed conversion of color-temperature (edit of ct-states required)
-   (Schmakus) (thoml95) fixed some bugs related to powerCleaningLight
-   (Schmakus) Some code improvements
-   (Schmakus) Update Docu

### 0.2.18 (2023-07-08)

-   (Schmakus) Fixed CtReverse [#149]
-   (Schmakus) Fixed translation for light [#136]
-   (Schmakus) Fixed warning min/max of ct-state [#148]
-   (Schmakus) Fixed Set Color-Temperature (set null value)

### 0.2.17 (2023-05-17)

-   (Schmakus) Fix error by init of customConfig, if no light description is available
-   (Schmakus) Fix error by set Ct, Color,... if no lights or groups defined
-   (Schmakus) Some code improvements

## License

MIT License

Copyright (c) 2024 Schmakus <schmakus@gmail.com>

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