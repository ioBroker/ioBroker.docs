---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.boschindego/README.md
title: ioBroker.boschindego
hash: BMgq9r8A05qF3GL6tmWf8kVu5j1ztg86E77VqEC6Rms=
---
![Logo](../../../en/adapterref/iobroker.boschindego/admin/boschindego.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.boschindego.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.boschindego.svg)
![Anzahl der Installationen](https://iobroker.live/badges/boschindego-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/boschindego-stable.svg)
![NPM](https://nodei.co/npm/iobroker.boschindego.png?downloads=true)
![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.boschindego/workflows/Test%20and%20Release/badge.svg)

# ioBroker.boschindego

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## boschindego-Adapter für ioBroker

Adapter für Bosch Indego Rasenmäher zur Anzeige des Mäherstatus und zur Steuerung des Mähers.

## Verwendung

Verwenden Sie id.remote.\*, um den Rasenmäher zu steuern.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now

### 1.4.0 (2026-02-13)
- (mcm1957) Adapter requires node.js >= 20 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now
- (mcm1957) Dependencies have been updated

### 1.3.9 (2025-01-18)

- (TA2k) revert to jsonConfig and move from captcha to codeurl
- (simatec) Fix Responsive Design

### 1.3.8 (2025-01-04)

- (mcm1957) jsonConfig has been reverted due to captcha requirements.

### 1.3.6 (2025-01-03)

- (TA2k) Fix for login. If settings are not loading, delete the instance and create a new instance.

### 1.3.2 (2024-11-28)

- (TA2k) Fix for Login
- (mcm1957) Incorrect versioning (1.2.3 instead of 1.3.2) has been corrected

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.boschindego/blob/main/CHANGELOG_OLD.md)

## License

MIT License


Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2024-2025 TA2k <tombox2020@gmail.com>

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