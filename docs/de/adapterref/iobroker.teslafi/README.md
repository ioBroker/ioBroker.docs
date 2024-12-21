---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.teslafi/README.md
title: ioBroker.teslafi
hash: MFeotZ8hkjwmdHiXxk+qNPxZ3kM1dwoMGTw2Ef24lLw=
---
![Logo](../../../en/adapterref/iobroker.teslafi/admin/teslafi.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.teslafi.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.teslafi.svg)
![Knoten-lts](https://img.shields.io/node/v-lts/iobroker.teslafi?style=flat-square)
![Libraries.io-Abhängigkeitsstatus für die neueste Version](https://img.shields.io/librariesio/release/npm/iobroker.teslafi?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/hombach/iobroker.teslafi?style=flat-square)
![GitHub-Repository-Größe](https://img.shields.io/github/repo-size/hombach/iobroker.teslafi?logo=github&style=flat-square)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/hombach/iobroker.teslafi?logo=github&style=flat-square)
![Letztes GitHub-Commit](https://img.shields.io/github/last-commit/hombach/iobroker.teslafi?logo=github&style=flat-square)
![GitHub-Probleme](https://img.shields.io/github/issues/hombach/iobroker.teslafi?logo=github&style=flat-square)
![GitHub-Workflow-Status](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.teslafi/test-and-release.yml?branch=master&logo=github&style=flat-square)
![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.teslafi?branch=master&svg=true)
![Bekannte SNYK-Sicherheitslücken](https://snyk.io/test/github/hombach/ioBroker.teslafi/badge.svg)
![Beta](https://img.shields.io/npm/v/iobroker.teslafi.svg?color=red&label=beta)
![Stabil](https://iobroker.live/badges/teslafi-stable.svg)
![Eingerichtet](https://iobroker.live/badges/teslafi-installed.svg)
![NPM](https://nodei.co/npm/iobroker.teslafi.png?downloads=true)

# IoBroker.teslafi
[![CodeQL](https://github.com/hombach/ioBroker.teslafi/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hombach/ioBroker.teslafi/actions/workflows/codeql-analysis.yml)

## Versionen
# IoBroker TeslaFi Adapter – Nahtlose Tesla-Datenintegration für Ihr Smart Home
Der TeslaFi-Adapter ermöglicht die mühelose Integration von Fahrzeugdaten aus Ihrem TeslaFi-Konto in das ioBroker-System. Nutzen Sie diese Daten, um Ihr Tesla-Erlebnis zu verbessern und die Arbeitsabläufe der Heimautomatisierung zu optimieren.

## Warum dieser Adapter?
Der Hauptzweck dieses Adapters besteht darin, Tesla-Daten in ioBroker zu integrieren, ohne die Systeme des Fahrzeugs direkt abzufragen. Durch die Nutzung der vorhandenen Datenabfrage von TeslaFi vermeidet der Adapter zusätzliche Anfragen an das Fahrzeug, schont die Batterielebensdauer und gewährleistet einen effizienten Datenzugriff.

## Merkmale
Der Adapter verbindet sich mit der TeslaFi-API, um umfassende Details zu Ihrem Tesla-Fahrzeug abzurufen und macht diese Daten innerhalb von ioBroker zugänglich. Alle von TeslaFi unterstützten Tesla-Modelle sind vollständig kompatibel. Derzeit sind die folgenden Datenkategorien verfügbar:

- **Thermischer Zustand**: Einblicke in das Wärmemanagementsystem und die Temperaturen.
- **Batteriezustand**: Informationen zu Batteriestatus, Ladestand und Reichweite.
- **Fahrzeugzustand**: Allgemeiner Fahrzeugstatus, einschließlich Position und Gesamtzustand.
- **Fahrzeugdaten**: Fahrzeugspezifische Details wie Name und Fahrgestellnummer.

## Typische Anwendungsfälle
- **Automatisierung**: Lösen Sie Smart-Home-Aktionen basierend auf dem Echtzeitstatus Ihres Tesla aus. Passen Sie beispielsweise die Klimaanlage Ihres Zuhauses automatisch an, wenn das Fahrzeug ankommt.
- **Energiemanagement**: Optimieren Sie den Energieverbrauch, indem Sie die Ladezeiten der Fahrzeuge planen und den Batteriestatus direkt von ioBroker aus überwachen.
- **Benachrichtigungen und Berichte**: Richten Sie Warnungen für bestimmte Fahrzeugzustände ein, beispielsweise niedrigen Batteriestand, abgeschlossene Ladevorgänge oder verfügbare Updates.

## Konfiguration
Die Konfiguration des Adapters ist unkompliziert:

1. Geben Sie Ihren TeslaFi-API-Schlüssel im Konfigurationsbildschirm des Adapters ein.
2. Stellen Sie das gewünschte Abfrageintervall ein, um anzupassen, wie häufig Daten aktualisiert werden.

## Kompatibilität
Der Adapter ist mit allen von TeslaFi unterstützten Tesla-Modellen kompatibel. Ein gültiges TeslaFi-Konto mit API-Zugriff ist erforderlich.

## Aktive Entwicklung und Benutzerbeiträge
Der TeslaFi-Adapter wird aktiv gewartet und je nach Benutzeranfrage können zusätzliche Funktionen oder Datenkategorien hinzugefügt werden. Senden Sie uns gerne Ihre Ideen und helfen Sie dabei, den Adapter für die gesamte Community zu verbessern!

## Wachposten
Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden. Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 gestartet.

## Spenden
<a href="https://www.paypal.com/donate/?hosted_button_id=6EE4YUJRK7UWC"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.teslafi/master/docu/bluePayPal.svg" height="40"></a> Wenn Ihnen dieses Projekt gefallen hat – oder Sie einfach nur großzügig sind –, denken Sie darüber nach, mir ein Bier auszugeben. Prost! :Bier:

## Changelog

### 0.4.6 (2024-12-21)

- (hombach) fix chai-as-promised
- (hombach) enrich documentation

### 0.4.5 (2024-12-11)

- (hombach) change some state roles

### 0.4.4 (2024-12-10)

- (hombach) add roles to projectUtils

### 0.4.3 (2024-12-09)

- (hombach) use of ioBroker.setInterval

### 0.4.2 (2024-12-06)

- (hombach) intruduce i18n for translations (#41)

### 0.4.1 (2024-11-28)

- (hombach) intruduce 'iobroker/eslint-config' (#67)
- (hombach) add axios timeout
- (hombach) optimized code stability
- (hombach) fix typo
- (hombach) remove message handler

### 0.4.0 (2024-11-10)

- (hombach) implement managed charging time (#29)
- (hombach) implement battery range
- (hombach) fixed errors in 'time to finish charge'
- (hombach) changed min update interval to 10 sec
- (hombach) fixed typos

### 0.3.0 (2024-11-08)

- (hombach) implement string for time to finish charge (#42)
- (hombach) reorganize data in folders (#43)
- (hombach) show 3rd row seat heater only if 3rd row is available (#40)
- (hombach) implement 'charging_state' (#37)

### 0.2.1 (2024-11-08)

- (hombach) change 'time_to_full_charge' type to number (#38)
- (hombach) total rework of vehicle data parser
- (hombach) set speed to 0 if null in API data (#39)

### 0.2.0 (2024-11-07)

- (hombach) implement raw data state (#26)
- (hombach) implement charger_phases (#28)
- (hombach) implement driver_temp_setting (#31)
- (hombach) implement seat and steeringwheel heater states (#30)

### 0.1.5 (2024-11-06)

- (hombach) harmonize project tools
- (hombach) removed doubled texts in state names

### 0.1.4 (2024-11-01)

- (hombach) fix conversion error

### 0.1.3 (2024-10-30)

- (hombach) fix typo in error text
- (hombach) optimize responsive design
- (hombach) bump dependencies

### 0.1.2 (2024-10-28)

- (hombach) introduce to ioBroker latest repo
- (hombach) bump dependencies

### 0.1.1 (2024-10-26)

- (hombach) fix npm error

### 0.1.0 (2024-10-26)

- (hombach) first working version

### 0.0.1 (2024-10-24)

- (hombach) initial release

## License

MIT License

Copyright (c) 2024 C.Hombach <TeslaFi@homba.ch>

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