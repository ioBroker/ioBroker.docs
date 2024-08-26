---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.chargemaster/README.md
title: ioBroker.chargemaster
hash: xvFIPavgdxAYZECCfr+v6WITn12RRC+P9OASJVe7DQU=
---
![Logo](../../../en/adapterref/iobroker.chargemaster/admin/chargemaster.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.chargemaster?style=flat-square)
![Downloads](https://img.shields.io/npm/dm/iobroker.chargemaster?label=npm%20downloads&style=flat-square)
![Knoten-lts](https://img.shields.io/node/v-lts/iobroker.chargemaster?style=flat-square)
![Libraries.io-Abhängigkeitsstatus für die neueste Version](https://img.shields.io/librariesio/release/npm/iobroker.chargemaster?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/hombach/iobroker.chargemaster?style=flat-square)
![GitHub-Repository-Größe](https://img.shields.io/github/repo-size/hombach/iobroker.chargemaster?logo=github&style=flat-square)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/hombach/iobroker.chargemaster?logo=github&style=flat-square)
![Letztes GitHub-Commit](https://img.shields.io/github/last-commit/hombach/iobroker.chargemaster?logo=github&style=flat-square)
![GitHub-Probleme](https://img.shields.io/github/issues/hombach/iobroker.chargemaster?logo=github&style=flat-square)
![GitHub-Workflow-Status](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.chargemaster/test-and-release.yml?branch=main&logo=github&style=flat-square)
![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.chargemaster?branch=master&svg=true)
![Bekannte SNYK-Sicherheitslücken](https://snyk.io/test/github/hombach/ioBroker.chargemaster/badge.svg)
![Beta](https://img.shields.io/npm/v/iobroker.chargemaster.svg?color=red&label=beta)
![Stabil](https://iobroker.live/badges/chargemaster-stable.svg)
![Eingerichtet](https://iobroker.live/badges/chargemaster-installed.svg)
![NPM](https://nodei.co/npm/iobroker.chargemaster.png?downloads=true)

# IoBroker.chargemaster
[![CodeQL](https://github.com/hombach/ioBroker.chargemaster/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hombach/ioBroker.chargemaster/actions/workflows/codeql-analysis.yml)

## Versionen
## Adapter zur Steuerung eines oder mehrerer EV-Ladegeräte unter Nutzung von PV-Energie
**!!! DIESER ADAPTER STELLT NOCH EINEN ENTWICKLUNGSSTAND DAR!!!**

Adapter zur Steuerung eines oder mehrerer EV-Ladegeräte (Wallboxen) mit Nutzung von PV-Energie. Der Adapter verwaltet derzeit bis zu 3 EV-Wallboxen, um das Laden des verfügbaren Netzstroms mit potenzieller Nutzung von PV-Überschussenergie zu verwalten.

## Einstellungen
Um eine Verbindung zu den Wallboxen herzustellen, geben Sie die Zustände mit den benötigten Daten in die Konfiguration ein.

## Wachposten
Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden. Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 gestartet.

## Spenden
<a href="https://www.paypal.com/donate/?hosted_button_id=H5PMQ8JKQL7SL"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.tibberlink/main/docu/bluePayPal.svg" height="40"></a> Wenn Ihnen dieses Projekt gefallen hat – oder Sie einfach nur großzügig sind –, denken Sie darüber nach, mir ein Bier auszugeben. Prost! :Bier:

## Getestet mit
- 3x go-E Ladegerät & Kostal PikoBA

## Changelog

! Note that missing version entries are typically dependency updates for improved security.

### 0.11.0 (2024-08-24)

-   (HombachC) implement variable wallbox amount 
-   (HombachC) fix errors in wallbox control
-   (HombachC) complete rework of configuration screen
-   (HombachC) move utils to extra class
-   (HombachC) switch to ECMA 2022 code
-   (HombachC) bumped dependencies

### 0.10.0 (2024-08-18)

-   (HombachC) switch to Typescript
-   (HombachC) change adapter type to "energy"
-   (HombachC) replace deprecated setStateAsync

### 0.9.3 (2024-08-18)

-   (HombachC) change translation handling
-   (HombachC) code and repository cleanup
-   (HombachC) prepare switch to Typescript

### 0.9.2 (2024-08-16)

-   (HombachC) fixed vulnerability in dependency
-   (HombachC) added tests for node 22

### 0.9.1 (2024-08-06)

-   (HombachC) fixed issues detected by repository checker (#494)
-   (HombachC) code cleanups

### 0.9.0 (2024-04-20)

-   (HombachC) BREAKING: dropped support for node.js 16 (#455)
-   (HombachC) BREAKING: js-controller >= 5 is required (#456)

### 0.8.5 (2024-03-27)

-   (HombachC) updated CI definitions, switched to node 20 as main test scenario
-   (HombachC) corrected io-package.json according to new schema
-   (HombachC) bumped dependencies

### 0.8.4 (2023-12-29)

-   (HombachC) BREAKING: dropped support for js-controller 3.x
-   (HombachC) Year 2024 changes
-   (HombachC) Bump axios to 1.6.3 because of vulnerability

### 0.8.3 (2023-10-29)

-   (HombachC) Bumb adapter core to 3.x
-   (HombachC) Bump axios to 1.6.0 because of vulnerability

### 0.8.2 (2023-10-01)

-   (HombachC) Several dependency updates
-   (HombachC) Fixed acknowledging of state changes (#339)

### 0.8.1 (2023-08-29)

-   (HombachC) bumped dependencies, added min/max to settings state defaults

### 0.8.0 (2023-06-23)

-   (HombachC) changed config screen to admin 5 solution

### 0.7.2 (2023-06-19)

-   (HombachC) Removed Travis 

### 0.7.1 (2023-06-13)

-   (HombachC) Fixed typo in docu, added translations 

### 0.7.0 (2023-06-11)

-   (HombachC) BREAKING: dropped node.js 14 support
-   (HombachC) Add tests for node.js 20, removed for node.js 14, bumped dependencies
-   (HombachC) BREAKING: dropped ioBroker.admin 4 support

### Old Changes see [CHANGELOG OLD](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2021-2024 Christian Hombach

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