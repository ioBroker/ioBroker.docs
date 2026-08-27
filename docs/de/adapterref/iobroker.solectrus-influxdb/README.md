---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.solectrus-influxdb/README.md
title: ioBroker.solectrus-influxdb
hash: JHPwGaT91ji+0fxuhPS25CONJln74BWFSiV0DKVrAIU=
---
# IoBroker.solectrus-influxdb

![NPM-Version](https://img.shields.io/npm/v/iobroker.solectrus-influxdb.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.solectrus-influxdb.svg)
![Anzahl der Installationen](https://iobroker.live/badges/solectrus-influxdb-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/solectrus-influxdb-stable.svg)
![NPM](https://nodei.co/npm/iobroker.solectrus-influxdb.png?downloads=true)
![ioBroker](https://img.shields.io/badge/ioBroker-Adapter-blue)
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D22-green)
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
- **Interne Sensoren** – Spiegeln und Überwachen von Zuständen, ohne diese in InfluxDB zu schreiben
- **Zuverlässige Pufferung** – Der persistente Schreibpuffer (bis zu 100.000 Punkte) bleibt auch bei InfluxDB-Ausfällen und Adapterneustarts erhalten.
- **Data-SOLECTRUS Formel-Engine** (optional) – Berechnet abgeleitete Werte aus mehreren Eingaben mithilfe von Formeln, Quellspiegelung oder regelbasierten Zustandsautomaten
- **Zustandsautomatenmodus** -- Generiert Zeichenketten-/Boolesche Zustände aus Regelbedingungen (Erster Treffer gewinnt), ideal für Statusbezeichnungen und Betriebsmodi
- **Formelgenerator** – Visueller Editor mit Drag-and-Drop-Bausteinen, Live-Vorschau, Operator-Tooltips und Beispielmustern
- **Ordnergruppierung** – Ordnen Sie Sensoren und berechnete Werte in Ordnern, um eine bessere Übersicht zu erhalten.
- **Integrierte Datensicherung** – Lokale Backups der Instanzkonfiguration, Sensoren und Data-SOLECTRUS-Elemente können direkt über die Registerkarte **Datensicherung** erstellt, hochgeladen, wiederhergestellt, heruntergeladen und gelöscht werden. Es ist kein weiterer Adapter erforderlich.

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
- **ioBroker.admin >= 8.0.0** - **erforderlich seit Version 2.0.0**, die Admin-Oberfläche funktioniert nicht mehr unter Admin 6/7 (siehe Changelog)
- Node.js >= 22
- InfluxDB 2.x

---

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.0.0 (2026-08-03)
* (patricknitsch) **BREAKING CHANGE:** Requires ioBroker.admin 8 (currently Alpha) or newer. Admin 8 introduced a new "GUI API generation" for custom jsonConfig components (React 19 / MUI 9, `@iobroker/gui-components`) with no backward compatibility, so the Sensors, Data Values and Backup tabs no longer load on Admin 6/7. Do **not** update to this version unless ioBroker.admin has already been updated to version 8.
* (patricknitsch) Rebuild the admin UI (sensors editor, Data-SOLECTRUS items editor, backup panel) as a proper Vite + Module Federation build (`src-admin/`) targeting `@iobroker/gui-components`, replacing the hand-written vanilla-JS Module Federation containers
* (patricknitsch) Log a clear error and set `info.lastError` at startup if the installed ioBroker.admin is below version 8, so an incompatible setup is immediately visible instead of a silent/confusing failure in the config dialog
* (patricknitsch) Cleanup i18n
* (copilot) Fix timeout for Backup Manager

### 1.12.0 (2026-07-08)
* (patricknitsch) Final Release

### 1.12.0-beta.1 (2026-07-08)
* (patricknitsch) Fix `npm run check` (tsc type-checking of the JSDoc-typed JS codebase) so it passes cleanly again
* (patricknitsch) Improve JSDoc type coverage across `dsProxy.js`, `jsonpath.js`, `stateMachine.js` and `helpers.js`
* (patricknitsch) Resolve all remaining ESLint JSDoc warnings (`npm run lint` is now warning-free)

### 1.12.0-beta.0 (2026-07-05)
* (patricknitsch) Update Dependencies
* (patricknitsch) Add built-in **Backup** tab: create/upload/restore/download/delete local backups of the instance config, sensors and Data-SOLECTRUS items, with a configurable storage location (InfluxDB token is excluded and must be re-entered after a restore)
* (patricknitsch) Add **Enable iFrame dashboard** checkbox: gates both the iFrame config tab and the Dashboard tab in the sensor overview (tab.html); reuse **Enable notifications** as the single switch that both activates notifications and reveals the Notifications tab

### 1.11.0 (2026-06-23)
* (copilot) Remove legacy Forecast Lib
* (copilot) Migrate old config to new(now no Datapoints will be generated)
* (copilot) Fix some small possible issues
* (copilot) Update Docs

**Older changelog entries can be found in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).**

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