---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.teslafi/README.md
title: ioBroker.teslafi
hash: KhgkAlZZc0UTF1M0lHLFVxmCTUDao3rnXFVGnOEKgYg=
---
![Logo](../../../en/adapterref/iobroker.teslafi/admin/teslafi.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.teslafi.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.teslafi.svg)
![node-lts](https://img.shields.io/node/v-lts/iobroker.teslafi?style=flat-square)
![Libraries.io-Abhängigkeitsstatus für die neueste Version](https://img.shields.io/librariesio/release/npm/iobroker.teslafi?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/hombach/iobroker.teslafi?style=flat-square)
![GitHub-Repository-Größe](https://img.shields.io/github/repo-size/hombach/iobroker.teslafi?logo=github&style=flat-square)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/hombach/iobroker.teslafi?logo=github&style=flat-square)
![Letzter Commit auf GitHub](https://img.shields.io/github/last-commit/hombach/iobroker.teslafi?logo=github&style=flat-square)
![GitHub-Probleme](https://img.shields.io/github/issues/hombach/iobroker.teslafi?logo=github&style=flat-square)
![GitHub-Workflow-Status](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.teslafi/test-and-release.yml?branch=master&logo=github&style=flat-square)
![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.teslafi?branch=master&svg=true)
![Bekannte Schwachstellen von SNYK](https://snyk.io/test/github/hombach/ioBroker.teslafi/badge.svg)
![Beta](https://img.shields.io/npm/v/iobroker.teslafi.svg?color=red&label=beta)
![Stabil](https://iobroker.live/badges/teslafi-stable.svg)
![Installiert](https://iobroker.live/badges/teslafi-installed.svg)
![NPM](https://nodei.co/npm/iobroker.teslafi.png?downloads=true)

# IoBroker.teslafi
[![CodeQL](https://github.com/hombach/ioBroker.teslafi/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hombach/ioBroker.teslafi/actions/workflows/codeql-analysis.yml)

## Versionen
## Wächter
**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in <a href="https://github.com/ioBroker/plugin-sentry#plugin-sentry">der Sentry-Plugin-Dokumentation</a> !

## IoBroker TeslaFi Adapter – Nahtlose Tesla-Datenintegration für Ihr Smart Home
Der TeslaFi-Adapter ermöglicht die mühelose Integration von Fahrzeugdaten aus Ihrem TeslaFi-Konto in das ioBroker-System. Nutzen Sie diese Daten, um Ihr Tesla-Erlebnis zu verbessern und Ihre Hausautomatisierungsabläufe zu optimieren.

## Warum dieser Adapter?
Der Hauptzweck dieses Adapters besteht darin, Tesla-Daten in ioBroker zu integrieren, ohne die Fahrzeugsysteme direkt abzufragen. Durch die Nutzung des bestehenden Datenabfragemechanismus von TeslaFi vermeidet der Adapter zusätzliche Anfragen an das Fahrzeug, wodurch die Batterielebensdauer verlängert und ein effizienter Datenzugriff gewährleistet wird.

## Merkmale
Der Adapter verbindet sich mit der TeslaFi-API, um umfassende Details zu Ihrem Tesla-Fahrzeug abzurufen und diese Daten in ioBroker zugänglich zu machen. Alle von TeslaFi unterstützten Tesla-Modelle sind vollständig kompatibel. Aktuell sind folgende Datenkategorien verfügbar:

- **Thermischer Zustand**: Einblicke in das Wärmemanagementsystem und die Temperaturen.
- **Batteriestatus**: Informationen zum Batteriestatus, Ladezustand und Reichweite.
- **Fahrzeugstatus**: Allgemeiner Fahrzeugstatus, einschließlich Position und Gesamtzustand.
- **Fahrzeugdaten**: Fahrzeugspezifische Details wie Name und Fahrgestellnummer.

## Typische Anwendungsfälle
- **Automatisierung**: Lösen Sie Smart-Home-Aktionen basierend auf dem Echtzeitstatus Ihres Tesla aus. Passen Sie beispielsweise die Klimaanlage automatisch an, wenn das Fahrzeug ankommt.
- **Energiemanagement**: Optimieren Sie den Energieverbrauch, indem Sie die Ladezeiten des Fahrzeugs planen und den Batteriestatus direkt über ioBroker überwachen.
- **Benachrichtigungen und Berichte**: Richten Sie Warnungen für bestimmte Fahrzeugzustände ein, z. B. bei niedrigem Batteriestand, abgeschlossenen Ladevorgängen oder verfügbaren Updates.

## Konfiguration
Die Konfiguration des Adapters ist unkompliziert:

1. Geben Sie Ihren TeslaFi-API-Schlüssel im Konfigurationsbildschirm des Adapters ein.
2. Legen Sie das gewünschte Abfrageintervall fest, um anzupassen, wie häufig die Daten aktualisiert werden.

## Kompatibilität
Der Adapter ist mit allen von TeslaFi unterstützten Tesla-Modellen kompatibel. Ein gültiges TeslaFi-Konto mit API-Zugriff ist erforderlich.

## Aktive Entwicklung und Benutzerbeiträge
Der TeslaFi-Adapter wird aktiv weiterentwickelt, und auf Wunsch der Nutzer können zusätzliche Funktionen oder Datenkategorien hinzugefügt werden. Teilen Sie uns Ihre Ideen mit und helfen Sie mit, den Adapter für die gesamte Community zu verbessern!

## Spenden
<a href="https://www.paypal.com/donate/?hosted_button_id=6EE4YUJRK7UWC"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.teslafi/master/docu/bluePayPal.svg" height="40"></a> Wenn dir dieses Projekt gefallen hat – oder du einfach nur großzügig sein möchtest –, spendiere mir doch ein Bier. Prost! 😉

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 3.0.3 (2026-07-05)

- (hombach) removed unneeded test devDependencies (chai, sinon-chai, proxyquire) and switched tests to Node.js assert
- (hombach) updated axios

### 3.0.2 (2026-06-19)

- (hombach) fixed warnings by adapter checker

### 3.0.1 (2026-06-05)

- (hombach) upgraded TypeScript to 6.x
- (hombach) fixed warnings by adapter checker
- (hombach) updated dependencies

### 3.0.0 (2026-05-05)

- (copilot) BREAKING: adapter requires node.js >= 22 now
- (hombach) update dependencies

### 2.0.7 (2026-04-12)

- (hombach) switch to ES2023 code
- (hombach) fix vulnerability in axios
- (hombach) update dependencies

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2024-2026 C.Hombach <TeslaFi@homba.ch>

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