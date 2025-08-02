---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.kostal-piko-ba/README.md
title: ioBroker.kostal-piko-ba
hash: CG7zT6steqVPVFubw52Nx9uNu0BnoA7E+iyf6qzLvgI=
---
![Logo](../../../en/adapterref/iobroker.kostal-piko-ba/admin/picoba.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.kostal-piko-ba.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.kostal-piko-ba?label=npm%20downloads&style=flat-square)
![Knoten-lts](https://img.shields.io/node/v-lts/iobroker.kostal-piko-ba?style=flat-square)
![Libraries.io-Abhängigkeitsstatus für die neueste Version](https://img.shields.io/librariesio/release/npm/iobroker.kostal-piko-ba?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/hombach/iobroker.kostal-piko-ba?style=flat-square)
![GitHub-Repository-Größe](https://img.shields.io/github/repo-size/hombach/iobroker.kostal-piko-ba?logo=github&style=flat-square)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/hombach/iobroker.kostal-piko-ba?logo=github&style=flat-square)
![Letztes GitHub-Commit](https://img.shields.io/github/last-commit/hombach/iobroker.kostal-piko-ba?logo=github&style=flat-square)
![GitHub-Probleme](https://img.shields.io/github/issues/hombach/iobroker.kostal-piko-ba?logo=github&style=flat-square)
![GitHub-Workflow-Status](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.kostal-piko-ba/test-and-release.yml?branch=main&logo=github&style=flat-square)
![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.kostal-piko-ba?branch=master&svg=true)
![Beta](https://img.shields.io/npm/v/iobroker.kostal-piko-ba.svg?color=red&label=beta)
![Stabil](https://iobroker.live/badges/kostal-piko-ba-stable.svg)
![Eingerichtet](https://iobroker.live/badges/kostal-piko-ba-installed.svg)
![NPM](https://nodei.co/npm/iobroker.kostal-piko-ba.png?downloads=true)

# IoBroker.kostal-piko-ba
[![CodeQL](https://github.com/hombach/ioBroker.kostal-piko-ba/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hombach/ioBroker.kostal-piko-ba/actions/workflows/codeql-analysis.yml)

## Versionen
## Adapter zum Einlesen von Kostal Piko & Piko BA Daten für iOBroker
Dieser Adapter ermöglicht das Lesen von Daten von Kostal Piko-, Piko BA- und PIKO MP plus-Wechselrichtern.
Er erstellt und aktualisiert nacheinander mehrere Zustände und stellt so sicher, dass immer die aktuellsten Informationen verfügbar sind.
Der Adapter ist speziell für Kostal Piko BA-, 6.0BA-, 8.0BA- und 10BA-Wechselrichter konzipiert, unterstützt aber auch eine Vielzahl anderer Modelle, darunter:

- Kostal Piko: 3,0, 4,2, 4,6, 5,5, 7,0, 8,5, 10, 12, 15, 17, 20 und 36.
- Kostal PIKO MP: 1,5, 3,0, 3,6.
- Kostal PIKO MP plus: 1,5-1, 2,0-1, 2,5-1, 3,0-1, 3,0-2, 3,6-1, 3,6-2 und 5,0-2.

Wir freuen uns über jede Rückmeldung zur Funktionalität mit anderen Wechselrichtern. Wenn Sie die Funktion mit weiteren Modellen testen, senden Sie uns bitte eine Nachricht.

## Konfiguration
Stellen Sie sicher, dass Ihr Piko- oder Piko-BA-Wechselrichter auf Kostal UI Version 6.11 oder höher aktualisiert ist.
Um eine Verbindung zum Kostal Piko (BA / MP plus)-Wechselrichter herzustellen, müssen Sie dessen IP-Adresse in den Einstellungen konfigurieren.
Optional können Sie die Aktualisierungsfrequenzen für Livedaten, Tagesstatistiken und Lebensdauerstatistiken anpassen.
Wenn Ihre Hardware es unterstützt, können Sie auch das Auslesen der vier analogen Werte aktivieren.

## Wachposten
Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden. Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 gestartet.

## Spenden
<a href="https://www.paypal.com/donate/?hosted_button_id=XFFBB332R4RCQ"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.tibberlink/main/docu/bluePayPal.svg" height="40"></a> Wenn Ihnen dieses Projekt gefallen hat – oder Sie einfach nur großzügig sind –, könnten Sie mir ein Bier spendieren. Prost! :Bier:

## Changelog

### 4.2.0 (2024-08-xx)

-   (HombachC) convert adapter to TypeScript
-   (HombachC) switch to ES2022 code
-   (HombachC) migrate eslint to >9.x
-   (HombachC) repository cleanup
-   (HombachC) dependency updates
-   (HombachC) code optimizations

### 4.1.3 (2024-08-13)

-   (HombachC) fixed vulnerability in dependency

### 4.1.2 (2024-08-10)

-   (HombachC) optimized translation handling
-   (HombachC) hide not used configuration inputs

### 4.1.1 (2024-08-09)

-   (HombachC) adapter checker detected optimizations (#643)

### 4.1.0 (2024-08-05)

-   (HombachC) replaced deprecated ioBroker state calls
-   (HombachC) doku cleanup

### 4.0.2 (2024-08-04)

-   (HombachC) added node.js 22 tests
-   (HombachC) dependency updates

### 4.0.1 (2024-06-24)

-   (HombachC) dependency updates, removed unfunctional snyk tests

### 4.0.0 (2024-04-21)

-   (HombachC) BREAKING: Dropped support for Node.js 16 (#591)
-   (HombachC) BREAKING: Minimum needed js-controller bumped to 5 (#592)
-   (HombachC) changed timeout settings for older Kostal inverters (#589)
-   (HombachC) dependency updates
-   (HombachC) added tests for node.js 21
-   (HombachC) raised minimum poll time for daily statistics
-   (HombachC) code optimizations

### Old Changes see [CHANGELOG OLD](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2020-2024 C.Hombach <Kostal-Piko-BA@homba.ch>

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