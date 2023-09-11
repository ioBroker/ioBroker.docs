---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tibberlink/README.md
title: ioBroker.tibberlink
hash: 9ibb79eJYZjH4J4TEbm/A0rh9Pkn7YD9WQ9zQscJI64=
---
![Logo](../../../en/adapterref/iobroker.tibberlink/admin/tibberlink.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.tibberlink.svg)
![NPM-Version (stabil)](https://iobroker.live/badges/tibberlink-stable.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tibberlink.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/tibberlink-installed.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/hombach/ioBroker.tibberlink/badge.svg)
![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.tibberlink?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.tibberlink.png?downloads=true)

# IoBroker.tibberlink
**CI-Tests:** ![Test und Freigabe](https://github.com/hombach/ioBroker.tibberlink/workflows/Test%20and%20Release/badge.svg) [![CodeQL](https://github.com/hombach/ioBroker.tibberlink/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hombach/ioBroker.tibberlink/actions/workflows/codeql-analysis.yml)

## Adapter zur Nutzung von TIBBER-Energiedaten in iOBroker
Adapter zum Verknüpfen von Daten aus Ihrer Tibber-Konto-API zur Verwendung in ioBroker

Wenn Sie derzeit kein Tibber-Benutzer sind, freuen wir uns sehr über die Verwendung meines Referenz-Links:

[https://invite.tibber.com/2gwuign3.](https://invite.tibber.com/2gwuign3.)

## Aufbau
1. Erstellen Sie eine neue Instanz des Adapters
2. Sie benötigen außerdem einen API-Token von Tibber. Holen Sie es sich hier: [https://developer.tibber.com/](https://developer.tibber.com/)
3. Geben Sie Ihr Tibber-API-Token ein -> Speichern Sie die Konfiguration, um den Adapter neu zu starten
4. Wählen Sie die Häuser aus, um auch Live-Daten von Ihrem Tibber Pulse abzurufen - !! Funktioniert nur, wenn Hardware installiert ist
5. Speichern Sie die Einstellungen

## Anmerkungen
Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden. Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Changelog
! Note that missing version entries are typically dependency updates for improved security.

### 0.3.0 (2023-09-WORK in PROGRESS)
* (HombachC) BREAKING: change Pulse usage to be configurable for all homes seperately (#41)
* (HombachC) optimize code again to mitigate set state timing for long JSON states (#68)
* (HombachC) preparations for tibber calculator
### 0.2.7 (2023-09-07)
* (HombachC) reducing polls at Tibber server by precheck of current price data
* (HombachC) preparations for tibber calculator
### 0.2.6 (2023-09-04)
* (HombachC) fix error with boolean states
### 0.2.5 (2023-09-03)
* (HombachC) optimize code to mitigate set state timing for long JSON states (#68) 
### 0.2.4 (2023-08-30)
* (HombachC) enable correct price poll also for adapter running in different timezones (#63) 
### 0.2.3 (2023-08-27)
* (HombachC) fix error in 0.2.2 in start conditions of adapter
### 0.2.2 (2023-08-24)
* (HombachC) reducing polls at Tibber server by precheck of known data
* (HombachC) code optimizations
* (HombachC) fix config screen (#55)
### 0.2.1 (2023-08-21)
* (HombachC) double timeout for Tibber server queries
### 0.2.0 (2023-08-18)
* (HombachC) introduces JSONs for prices sorted by price ascending
* (HombachC) fix stupid error for obsolete next day pricing (#23, #50)
### 0.1.10 (2023-08-15)
* (HombachC) bump dependencies, code cleanups
* (HombachC) preparations for tibber calculator
* (HombachC) mitigate multi homes & pulse problems (#41)
* (HombachC) add documentation to config screen (#47)
### 0.1.9 (2023-08-14)
* (HombachC) optimizing fetching homes list (#32) after Tibber server error, restart adapter in case of trouble
### 0.1.8 (2023-08-12)
* (HombachC) bump dev-dependencies, fix eslint/prettier issue
### 0.1.7 (2023-08-11)
* (HombachC) code cleanup, fix error for obsolete next day pricing (#23)
* (HombachC) add another try/catch while fetching homes list (#32)
### 0.1.6 (2023-07-30)
* (HombachC) add units for live data, bump adapter-core to 3.x
### 0.1.5 (2023-07-18)
* (HombachC) fix error in sentry logging
### 0.1.4 (2023-07-17)
* (HombachC) BREAKING: encrypted API-Token in ioBroker
* (HombachC) rearranged configuration options
* (HombachC) fixed bug in state generation
### 0.1.3 (2023-07-17)
* (HombachC) all log messages in English
* (HombachC) remove unused state change handler
* (HombachC) fixed state roles
### 0.1.2 (2023-07-17)
* (HombachC) round grid consumption meter values to Wh accuracy
* (HombachC) hide unused checkboxes in config
* (HombachC) fix snyc and appveyor
### 0.1.1 (2023-07-16)
* (HombachC) remove release script and dev-server
### 0.1.0 (2023-07-14)
* (HombachC) initial version

## License
GNU General Public License v3.0 only

Copyright (c) 2023 Hombach <TibberLink@homba.ch>