---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.solectrus-influxdb/README.md
title: ioBroker.solectrus-influxdb
hash: Ft6MNdsDi/S4yAN52SJfevQ7eH1DOariBM1/5zxBbBk=
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

## 🌞 SOLECTRUS InfluxDB-Adapter für ioBroker
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
### 1.8.6 (2026-05-25)
* (copilot) Fixes for Repo Checker

### 1.8.5 (2026-05-23)
* (copilot) Add Icons in Notification

### 1.8.4 (2026-05-23)
* (patricknitsch) Fix missing unit in Formula-Engine

### 1.8.3 (2026-05-21)
* (copilot) Modify notification manager to work with instances
* (copilot) Update Dependencies

### 1.8.2 (2026-05-03)
* (copilot) Adapter requires node.js >= 22 now
* (copilot) Fix sensor duplicate: stale draft cache caused wrong sensor data to appear in the detail panel after duplicating or deleting a sensor
* (copilot) Update Dependencies

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