---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lightcontrol/README.md
title: ioBroker.lightcontrol
hash: OHsNc1pxcioW6s/KRjss1CYZEq1NrFzmK+4zOyQZyLE=
---
![Logo](../../../en/adapterref/iobroker.lightcontrol/admin/lightcontrol.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.lightcontrol.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.lightcontrol.svg)
![Anzahl der Installationen](https://iobroker.live/badges/lightcontrol-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/lightcontrol-stable.svg)
![NPM](https://nodei.co/npm/iobroker.lightcontrol.png?downloads=true)
![Paypal-Spende](https://img.shields.io/badge/paypal-donate%20%7C%20spenden-blue.svg)

# IoBroker.lightcontrol
[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/lightcontrol/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Tests:** ![Testen und freigeben](https://github.com/Schmakus/ioBroker.lightcontrol/workflows/Test%20and%20Release/badge.svg)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry-Berichte werden ab js-controller 3.0 verwendet.

## LightControl-Adapter für ioBroker
Lichtsteuerung von Lampen verschiedener Hersteller

[Deutsche Beschreibung hier](docs/de/lightcontrol.md)

[Englische Beschreibung hier](docs/en/lightcontrol.md)

## Machen
- Mehr als eine LightGroup für eine Objekt-ID auswählen (Bug mit jsonCustom Select multible)
- Bereitschaftsanzeige mit geringerer Helligkeit und definierten Sekunden vor AutoOff
- Stellen Sie Ct, Sat und Color direkt an der Lampe ein, auch wenn diese ausgeschaltet ist.
- Möglichkeit zum Ein-/Ausschalten von Lichtern nur mit Pegel-/Helligkeitszustand und ohne Schaltzustand

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**

	-   (Schmakus) Add: Set Ct, Sat and Color directly to the lamp, also if it's switched off.
-->

### **WORK IN PROGRESS**

-   (Schmakus) Update adaptername translations in io-package.json

### 0.1.3 (2023-01-17)

-   (Schmakus) Added AdaptiveCt functionality. Was not implemented in older versions.

### 0.1.2 (2023-01-14)

-   (Schmakus) Some different small bugfixes and code cleaning
-   (Schmakus) Fix: Update for ioBroker Beta-Repo
-   (Schmakus) Fix: Adaptive Color-Temperature (failure by reading settings minCt and maxCt)

### 0.1.1 (2023-01-04)

-   (Schmakus) Add Sentry Plugin
-   (Schmakus) Fix issue [#80](https://github.com/Schmakus/ioBroker.lightcontrol/issues/80)
-   (Schmakus) general translation updates and translation of states

### 0.1.0 (2023-01-02)

-   (Schmakus) Latest Release

### 0.0.8 (2023-01-02)

-   (Schmakus) Ability to remove unused lights and sensors when deleting the light group
-   (Schmakus) Some code cleaning and update debug logs
-   (Schmakus) Update dependencies
-   (Schmakus) Update translations

### 0.0.6 (2022-12-29)

-   (Schmakus) New: [#61](https://github.com/Schmakus/ioBroker.lightcontrol/issues/61) Added infinite blinking. Please read the documentation.
-   (Schmakus) Fix: some little things.

### 0.0.5 (2022-12-27)

-   (Schmakus) Fix: [#66](https://github.com/Schmakus/ioBroker.lightcontrol/issues/66) Adding more than one lamp to group
-   (Schmakus) Fix: CustomConfig Color definitions
-   (Schmakus) Deleting hole light from group if it contains no states
-   (Schmakus) Updating CreateState Function for extended debugging

### 0.0.4 (2022-12-23)

-   (Schmakus) Fix: Warning by adding motion sensor to group
-   (Schmakus) New: Add Default Values for WarmWhite and DayLight at Color-State
-   (Schmakus) updating translations

### 0.0.3 (2022-12-22)

-   (Schmakus) Fix: Moving sensors and lights to other group
-   (Schmakus) Fix: Adding sensor to groups
-   (Schmakus) Update German Docu

### 0.0.2 (2022-12-20)

-   (Schmakus) first Alpha Release

### 0.0.1 (2022-12-01)

-   (Schmakus) Initial Release

## License

MIT License

Copyright (c) 2023 Schmakus <schmakus@gmail.com>

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