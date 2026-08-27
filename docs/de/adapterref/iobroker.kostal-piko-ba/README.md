---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.kostal-piko-ba/README.md
title: ioBroker.kostal-piko-ba
hash: sYc1FFNyG/KdRyiwudb7H9czCrpySLFq6D5lDISBLTQ=
---
![Logo](../../../en/adapterref/iobroker.kostal-piko-ba/admin/picoba.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.kostal-piko-ba.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.kostal-piko-ba?label=npm%20downloads&style=flat-square)
![node-lts](https://img.shields.io/node/v-lts/iobroker.kostal-piko-ba?style=flat-square)
![Libraries.io-Abhängigkeitsstatus für die neueste Version](https://img.shields.io/librariesio/release/npm/iobroker.kostal-piko-ba?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/hombach/iobroker.kostal-piko-ba?style=flat-square)
![GitHub-Repository-Größe](https://img.shields.io/github/repo-size/hombach/iobroker.kostal-piko-ba?logo=github&style=flat-square)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/hombach/iobroker.kostal-piko-ba?logo=github&style=flat-square)
![Letzter Commit auf GitHub](https://img.shields.io/github/last-commit/hombach/iobroker.kostal-piko-ba?logo=github&style=flat-square)
![GitHub-Probleme](https://img.shields.io/github/issues/hombach/iobroker.kostal-piko-ba?logo=github&style=flat-square)
![GitHub-Workflow-Status](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.kostal-piko-ba/test-and-release.yml?branch=main&logo=github&style=flat-square)
![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.kostal-piko-ba?branch=master&svg=true)
![Beta](https://img.shields.io/npm/v/iobroker.kostal-piko-ba.svg?color=red&label=beta)
![Stabil](https://iobroker.live/badges/kostal-piko-ba-stable.svg)
![Installiert](https://iobroker.live/badges/kostal-piko-ba-installed.svg)
![NPM](https://nodei.co/npm/iobroker.kostal-piko-ba.png?downloads=true)

# IoBroker.kostal-piko-ba
[![CodeQL](https://github.com/hombach/ioBroker.kostal-piko-ba/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hombach/ioBroker.kostal-piko-ba/actions/workflows/codeql-analysis.yml)

## Versionen
## Adapter zum Auslesen von Kostal Piko- und Piko BA-Daten für iOBroker
Dieser Adapter ermöglicht das Auslesen von Daten von Kostal Piko, Piko BA und PIKO MP plus Wechselrichtern.

Er erstellt und aktualisiert nacheinander mehrere Zustände, sodass stets die aktuellsten Informationen verfügbar sind.
Der Adapter ist speziell für die Kostal Piko Wechselrichter BA, 6.0BA, 8.0BA und 10BA konzipiert, unterstützt aber auch eine Vielzahl weiterer Modelle, darunter:

- Kostal Piko: 3,0, 4,2, 4,6, 5,5, 7,0, 8,5, 10, 12, 15, 17, 20 und 36.
- Kostal PIKO MP: 1,5, 3,0, 3,6.
- Kostal PIKO MP plus: 1,5-1, 2,0-1, 2,5-1, 3,0-1, 3,0-2, 3,6-1, 3,6-2 und 5,0-2.

Wir freuen uns über jedes Feedback zur Funktionalität mit anderen Wechselrichtern. Bitte informieren Sie uns, wenn Sie das Gerät mit weiteren Modellen testen.

## Konfiguration
Stellen Sie sicher, dass Ihr Piko- oder Piko-BA-Wechselrichter auf Kostal UI Version 6.11 oder höher aktualisiert ist.
Um eine Verbindung zum Kostal Piko (BA/MP plus) Wechselrichter herzustellen, müssen Sie dessen IP-Adresse in den Einstellungen konfigurieren.
Optional können Sie die Aktualisierungsfrequenzen für Live-Daten, Tagesstatistiken und Gesamtstatistiken anpassen.
Sofern Ihre Hardware dies unterstützt, können Sie auch die Anzeige der vier Analogwerte aktivieren.

## Wächter
**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in <a href="https://github.com/ioBroker/plugin-sentry#plugin-sentry">der Sentry-Plugin-Dokumentation</a> !

## Spenden
<a href="https://www.paypal.com/donate/?hosted_button_id=XFFBB332R4RCQ"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.tibberlink/main/docu/bluePayPal.svg" height="40"></a> Wenn dir dieses Projekt gefallen hat – oder du einfach nur großzügig sein möchtest –, spendiere mir doch ein Bier. Prost! 😉

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 7.0.5 (2026-07-05)

- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now
- (HombachC) removed chai-based unit test dependencies; modernized test harness to Node.js assert
- (HombachC) updated dependencies

### 7.0.4 (2026-06-19)

- (HombachC) fixed adapterchecker warnings
- (HombachC) updated dependencies

### 7.0.3 (2026-06-03)

- (HombachC) fixed instanceObject roles
- (HombachC) fixed warnings of adapter checker
- (HombachC) updated dependencies

### 7.0.2 (2026-05-17)

- (HombachC) fix tsconfig

### 7.0.1 (2026-05-16)

- (HombachC) update typescript from 5.9.3 to 6.0.3
- (HombachC) fix vulnerability in axios
- (HombachC) update dependencies

### Old Changes see [CHANGELOG OLD](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2020-2026 C.Hombach <Kostal-Piko-BA@homba.ch>

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