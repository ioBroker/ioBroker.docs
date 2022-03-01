---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.luftdaten.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.luftdaten.svg
BADGE-Stable: http://iobroker.live/badges/luftdaten-stable.svg
BADGE-installed: http://iobroker.live/badges/luftdaten-installed.svg
BADGE-Dependency Status: https://img.shields.io/david/klein0r/iobroker.luftdaten.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/klein0r/ioBroker.luftdaten/badge.svg
BADGE-NPM: https://nodei.co/npm/iobroker.luftdaten.png?downloads=true
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

### **WORK IN PROGRESS**

* (klein0r) Added local link to sensor map
* (klein0r) Added documentation
* (klein0r) Added hint for Admin 4 configuration
* (klein0r) Updated state roles

### 2.1.3 (2021-12-23)

* (klein0r) Updated dependencies

### 2.1.2 (2021-11-14)

* (klein0r) Translated admin tab table headers

### 2.1.1 (2021-11-06)

* (klein0r) Fixed missing translations

### 2.1.0 (2021-11-04)

* (klein0r) Admin 5 Support

### 2.0.3 (2021-10-04)

* (klein0r) Fixed error logging

### 2.0.2 (2021-08-18)

* (klein0r) Added timeout option

### 2.0.1 (2021-08-17)

* (klein0r) Minor bug fixes

### 2.0.0 (2021-08-17)

* (klein0r) Updated admin interface to maintain multiple sensors in one instance **(BREAKING CHANGE - RE-CONFIGURE YOUR SENSORS)**

### 1.0.3 (2021-03-21)

* (klein0r) Remove non-numeric characters from sensor id

### 1.0.2 (2021-01-25)

* (klein0r) Fixed async object creation

### 1.0.1 (2020-11-10)

* (klein0r) Added iobroker sentry

### 1.0.0 (2020-08-27)

* (klein0r) First stable release

### 0.0.18

* (klein0r) Added units for pressure and noise

### 0.0.17

* (klein0r) Added link to sensor map

### 0.0.16

* (klein0r) Minor bugfixes

### 0.0.15

* (klein0r) setTimeout found in main.js, but no clearTimeout detected

### 0.0.14

* (klein0r) Fixed sensor data check issue

### 0.0.13

* (klein0r) Added missing translations

### 0.0.12

* (klein0r) Minor bugfixes
* (dominik-lienemann) Added timestamp of last sensor update

### 0.0.11

* (klein0r) fixed units of states

### 0.0.10

* (klein0r) changed API url

### 0.0.9

* (klein0r) minor bugfixes

### 0.0.9

* (klein0r) improved logging

### 0.0.8

* (klein0r) added response time and units

### 0.0.7

* (klein0r) merged pull requests - thanks a lot for contribution

### 0.0.6

* (klein0r) changed type to weather

### 0.0.5

* (klein0r) fixed issues when sensor is not available
* (klein0r) added location information for remote sensors

### 0.0.4

* (pix) path is IP if sensor is local

### 0.0.3

* (pix) path and sensor name added

### 0.0.1

* (klein0r) initial release

## License

The MIT License (MIT)

Copyright (c) 2022 Matthias Kleine <info@haus-automatisierung.com>

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