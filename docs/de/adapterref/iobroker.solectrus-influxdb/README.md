---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.solectrus-influxdb/README.md
title: ioBroker.solectrus-influxdb
hash: rCq4ma/IZnq76/UJR10TNI1+fJB+aYyekLmp8R/XtsM=
---
# IoBroker.solectrus-influxdb

![NPM-Version](https://img.shields.io/npm/v/iobroker.solectrus-influxdb.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.solectrus-influxdb.svg)
![Anzahl der Installationen](https://iobroker.live/badges/solectrus-influxdb-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/solectrus-influxdb-stable.svg)
![NPM](https://nodei.co/npm/iobroker.solectrus-influxdb.png?downloads=true)
![ioBroker](https://img.shields.io/badge/ioBroker-Adapter-blue)
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20-green)
![InfluxDB](https://img.shields.io/badge/InfluxDB-2.x-orange)
![Lizenz](https://img.shields.io/badge/License-MIT-lightgrey)

**Tests:** ![Test und Freigabe](https://github.com/patricknitsch/ioBroker.solectrus-influxdb/workflows/Test%20and%20Release/badge.svg)

# 🌞 SOLECTRUS InfluxDB-Adapter für ioBroker
---

## Übersicht
Der SOLECTRUS InfluxDB Adapter speichert ausgewählte ioBroker-Zustände in einer InfluxDB 2.x-Datenbank und berechnet optional abgeleitete Werte mithilfe einer integrierten Formel-Engine.

Es ist für Energiemonitoringsysteme wie Photovoltaikanlagen, Batteriespeicher, Wärmepumpen, Wanddosen, Netzimport-/Netzexportüberwachung und kundenspezifische Sensoren konzipiert.

### Merkmale
- **Sensor Mapping** -- Ordnen Sie jeden ioBroker-Status einer InfluxDB-Messung/einem Feld mit konfigurierbarem Datentyp (int, float, bool, string) zu.
- **Zuverlässige Pufferung** – Der persistente Schreibpuffer (bis zu 100.000 Punkte) bleibt auch bei InfluxDB-Ausfällen und Adapterneustarts erhalten.
- **Data-SOLECTRUS Formel-Engine** (optional) – Berechnet abgeleitete Werte aus mehreren Eingaben mithilfe von Formeln, Quellspiegelung oder regelbasierten Zustandsautomaten
- **Zustandsautomatenmodus** -- Generiert Zeichenketten-/Boolesche Zustände aus Regelbedingungen (Erster Treffer gewinnt), ideal für Statusbezeichnungen und Betriebsmodi
- **Formelgenerator** – Visueller Editor mit Drag-and-Drop-Bausteinen, Live-Vorschau, Operator-Tooltips und Beispielmustern
- **Ordnergruppierung** – Berechnete Werte zur besseren Übersicht in Ordnern organisieren.

### Schnellstart
1. Installieren Sie den Adapter über die ioBroker-Admin-Oberfläche.
2. Konfigurieren Sie die InfluxDB-Verbindung (URL, Organisation, Bucket, Token) auf der Registerkarte **InfluxDB**.
3. Ordnen Sie Ihre ioBroker-Zustände auf der Registerkarte **Sensoren** zu.
4. (Optional) Aktivieren Sie das Kontrollkästchen **Data-SOLECTRUS**, um die Formel-Engine mit den Registerkarten **Datenwerte** und **Datenlaufzeit** freizuschalten.
5. Speichern und Adapter starten

---

## Dokumentation
[🇺🇸 Dokumentation](./docs/en/README.md)

[🇩🇪 Dokumentation](./docs/de/README.md)

---

### Anforderungen
- ioBroker >= neueste stabile Version
- Node.js >= 20
- InfluxDB 2.x

---

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.7.0 (2026-04-10)

* (patricknitsch) Increased max value from 10.000W to 15.000W
* (copilot) Zero-value alive monitoring: when a sensor timeout fires and the current value is 0, log info instead of warn and retry after 60 minutes
* (copilot) Sensor overview: numeric value row shows current value with unit (W) left-aligned and max value with unit (W) right-aligned
* (copilot) Sensor overview: timestamp row shows last timestamp left-aligned and auto-computed next expected update timestamp right-aligned (no manual input needed)
* (copilot) Sensor overview: change Format

### 1.6.0 (2026-04-06)

* (patricknitsch) Catch max. Values - settable in Config
* (patricknitsch) Increase Version from 20 to 24 becauso of deploy error
* (copilot) Add Alive monitoring: configurable timeout warns when sensor values are not updated

### 1.5.0 (2026-03-21)

* (patricknitsch) Fix Issues RepoChecker
* (copilot) Add Tab for SOLECTRUS iFrame

### 1.4.1 (2026-03-18)

* (copilot) Update Tab Format
* (copilot) Update Readme
* (patricknitsch) Update Packages

### 1.4.0 (2026-03-16)

* (copilot) Fix String Handling in Formula Engine
* (copilot) Fix Formula Engine when using state formulas
* (copilot) New Page for smart Sensor Overview
* (patricknitsch) Update Readme and Doc

### 1.3.1 (2026-03-06)

* (claude) Fix DS Tick time budget

### 1.3.0 (2026-03-04)

* (claude) Fix DS Tick time budget
* (patricknitsch) Update Admin Package
* (claude) Change Admin to easy and expert mode
* (claude) Add information in easy mode 
* (claude) Add type json for sending json, i.e. forecast
* (claude) Update Readme

### 1.2.2 (2026-02-24)

* (claude) Synchronize Formal Engine with Repo from Felliglanz
* (claude) Add Warning after first start, if value is negative
* (claude) Add Comment on first page, that SOLECTRUS doesn't accept negative values
* (claude) Update Readme and Translations

### 1.2.1 (2026-02-13)

* (patricknitsch) Fix wrong package

### 1.2.0 (2026-02-13)

* (claude) Concurrent collect and flush without delay of 5s

### 1.1.2 (2026-02-13)

* (patricknitsch) Fix Eslint-Warnings

### 1.1.1 (2026-02-12)

* (patricknitsch) Fix Eslint-Errors

### 1.1.0 (2026-02-12)

* (claude) Add Formula Engine to build own sensors

### 1.0.0 (2026-01-31)

* (patricknitsch) change Config for Encryption -> Credentials must be re-entered

### 0.3.5 (2026-01-30)

* (patricknitsch) Using node:package format
* (patricknitsch) encrypt sensitive information -> Token must be re-entered
* (patricknitsch) onStateChange ignores ack flag
* (patricknitsch) creation of intermediate objects missing
* (patricknitsch) using this.setTimeout
* (patricknitsch) check and limit configurable timeouts/intervals
* (patricknitsch) Extend Readme

### 0.3.4 (2026-01-19)

* (patricknitsch) Update Readme and split it in two own docs

### 0.3.3 (2026-01-19)

* (patricknitsch) Try fixing automatic npm release

### 0.3.2 (2026-01-19)

* (patricknitsch) change Repo from ssh to https

### 0.3.1 (2026-01-19)

* (Felliglanz) Fix some issues in UI

### 0.3.0 (2026-01-18)

* (patricknitsch) Better handling of Influx Connection, also if no sensor is active
* (Felliglanz) Rebuild of UI with actual status of each sensor

### 0.2.0 (2026-01-18)

* (patricknitsch) Refactoring code and improve readability
* (patricknitsch) Buffer values and send to Influx if Influx is online
* (patricknitsch) Save max. 100000 values and send all to Influx if Influx is online again
* (patricknitsch) Split Data Collecting and Influx writing
* (patricknitsch) Updated Translations

### 0.1.5 (2026-01-17)

* (Felliglanz) Improve sensor configuration UI (accordion)

### 0.1.4 (2026-01-15)

* (patricknitsch) Bugfix with Icon

### 0.1.3 (2026-01-15)

* (patricknitsch) Bugfix for License
* (patricknitsch) Bugfix for Interval
* (patricknitsch) Synchronize Names, Measurements and Fields to SOLECTRUS Documentation

### 0.1.2 (2026-01-14)
* (patricknitsch) change UI to look for Source in Tree

### 0.1.1 (2026-01-14)
* (patricknitsch) add more Debugging
* (patricknitsch) optimize translation

### 0.1.0 (2026-01-14)
* (patricknitsch) initial release

## License

MIT License

Copyright (c) 2026 patricknitsch <patricknitsch@web.de>

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