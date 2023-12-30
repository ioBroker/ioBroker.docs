---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.luftdaten?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.luftdaten?label=npm%20downloads&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.luftdaten?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.luftdaten?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/klein0r/iobroker.luftdaten?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/klein0r/iobroker.luftdaten?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/klein0r/iobroker.luftdaten?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/klein0r/iobroker.luftdaten?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/klein0r/iobroker.luftdaten?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/actions/workflow/status/klein0r/iobroker.luftdaten/test-and-release.yml?branch=master&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.luftdaten.svg?color=red&label=beta
BADGE-Stable: http://iobroker.live/badges/luftdaten-stable.svg
BADGE-Installed: http://iobroker.live/badges/luftdaten-installed.svg
---
![Logo](../../admin/luftdaten.png)

# ioBroker.luftdaten

## Konfiguration

### Lokal

1. Baue einen eigenen Sensor und füge ihn zu Deinem lokalen Netzwerk hinzu
2. Erstelle eine neue Instanz des Adapters
3. Wähle einen beliebigen Sensornamen und füge ihn in die erste Spalte ein
4. Wähle "Lokal" als Typ in der zweiten Spalte
5. Füge die IP-Adresse oder den Hostnamen des Sensors in die dritte Spalte ein
6. Speichere die Einstellungen

Warte einige Sekunden, bis die Daten das erste Mal vom Sensor abgeholt werden.

*Bei Bedarf kann der Abfrage-Interval im Tab "Instanzen" angepasst werden (Standard: alle 30 Minuten).*

### Remote

1. Wähle einen Sensor von der offiziellen Karte: [sensor.community](https://sensor.community/en/)
2. Klicke auf den Sensor und kopiere die ID (#XXXXX)
3. Erstelle eine neue Instanz des Adapters
4. Wähle einen beliebigen Sensornamen und füge ihn in die erste Spalte ein
5. Wähle "Remote" als Typ in der zweiten Spalte
6. Füge die ID des Sensors in die dritte Spalte ein (ohne die ``#``)
7. Speichere die Einstellungen

Warte einige Sekunden, bis die Daten das erste Mal vom Sensor abgeholt werden.

*Bei Bedarf kann der Abfrage-Interval im Tab "Instanzen" angepasst werden (Standard: alle 30 Minuten).*

### Beispiel

![Konfigurationsbeispiel](./img/exampleConfiguration.png)

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 3.1.0 (2023-10-25)

NodeJS 16.x is required

* (klein0r) Added link to sensor map to intro tab
* (klein0r) Create timestamps if location is not available
* (klein0r) Added admin icons

### 3.0.0 (2023-05-01)

NodeJS 14.x is required (NodeJS 12.x is EOL)

* (klein0r) Added link to sensor map to instance configuration
* (klein0r) Updated dependencies
* (klein0r) Updated depedency for js-controller to 4.0.15
* (klein0r) Dropped Admin 5 support
* (klein0r) Added Ukrainian language

### 2.2.4 (2022-04-14)

* (klein0r) Abort HTTP requests if running too long

### 2.2.3 (2022-04-11)

* (klein0r) Always stop instance when tasks are completed
* (klein0r) Updated log messages

### 2.2.2 (2022-03-14)

* (klein0r) Bugfix: Requested local sensors with https instead of http

## License

The MIT License (MIT)

Copyright (c) 2024 Matthias Kleine <info@haus-automatisierung.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.