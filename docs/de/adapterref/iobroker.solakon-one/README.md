---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.solakon-one/README.md
title: ioBroker.solakon-one
hash: SV1BXXba62lijE4BmM5bVBQ8dHQ01F7nm5bh5OWgtwQ=
---
# ioBroker.solakon-one

![NPM-Version](https://img.shields.io/npm/v/iobroker.solakon-one.svg)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg)

**ioBroker-Adapter für den Solakon ONE Hybrid-Solarwechselrichter**

Überwacht und steuert den Solakon ONE Hybrid-Solarwechselrichter ( [www.solakon.de](https://www.solakon.de) ) mit Batteriespeicher über das lokale Netzwerk via **Modbus TCP** (Port 502).

**[Deutsch / German documentation](README.de.md)**

---

## Anforderungen

- ioBroker mit js-controller >= 6.0.0
- Node.js >= 22
- Solakon ONE Wechselrichter im lokalen Netzwerk erreichbar
- Modbus TCP ist auf dem Gerät aktiviert (Port 502).

---

## Installation

Installation über die ioBroker-Admin-Oberfläche: **Adapter** → Suche nach **"solakon-one"** → **Installieren** .

---

## Konfiguration

| Feld                 | Beschreibung                      | Standard        |
| -------------------- | --------------------------------- | --------------- |
| **IP-Adresse**       | IP-Adresse des Solakon ONE im LAN | `192.168.1.100` |
| **Hafen**            | Modbus TCP-Port                   | `502`           |
| **Modbus-Geräte-ID** | Slave-Adresse (1–247)             | `1`             |
| **Intervall (s)**    | Umfrageintervall (1–300 s)        | `30`            |

---

## Datenpunkte

Alle Datenpunkte werden erstellt unter`solakon-one.<instance>.*` (z.B`solakon-one.0.*` für die Standardinstanznummer 0; mehrere Instanzen sind möglich).

### Verbindungsstatus

| AUSWEIS           | Beschreibung     | Typ             |
| ----------------- | ---------------- | --------------- |
| `info.connection` | Verbindung aktiv | Boolescher Wert |

### Geräteinformationen (`device.*` )

| AUSWEIS            | Beschreibung              |
| ------------------ | ------------------------- |
| `device.model`     | Modellname                |
| `device.serial`    | Seriennummer              |
| `device.fw_master` | Firmware-Version (Master) |
| `device.fw_slave`  | Firmware-Version (Slave)  |

### Photovoltaik (`pv.*` )

| AUSWEIS                         | Beschreibung       | Einheit |
| ------------------------------- | ------------------ | ------- |
| `pv.total_power`                | Gesamt-PV-Leistung | W       |
| `pv.total_energy`               | Gesamt-PV-Energie  | kWh     |
| `pv.pv1_voltage` …`pv4_voltage` | Strangspannung     | V       |
| `pv.pv1_current` …`pv4_current` | String current     | A       |
| `pv.pv1_power` …`pv4_power`     | Saitenkraft        | W       |

### Batterie (`battery.*` )

| AUSWEIS                   | Beschreibung                     | Einheit |
| ------------------------- | -------------------------------- | ------- |
| `battery.soc`             | Ladezustand (SoC)                | %       |
| `battery.voltage`         | Stromspannung                    | V       |
| `battery.current`         | Aktuell                          | A       |
| `battery.power`           | Leistung (+ Ladung, − Entladung) | W       |
| `battery.combined_power`  | Kombinierte Leistung             | W       |
| `battery.total_charge`    | Gesamtladungsenergie             | kWh     |
| `battery.total_discharge` | Gesamtentladungsenergie          | kWh     |
| `battery.bms1_soh`        | Gesundheitszustand (SoH)         | %       |
| `battery.design_energy`   | Nennkapazität                    | Wh      |
| `battery.ambient_temp`    | Umgebungstemperatur              | °C      |
| `battery.max_temp`        | Maximale Temperatur              | °C      |
| `battery.min_temp`        | Mindesttemperatur                | °C      |

### Netz (`grid.*` )

| AUSWEIS               | Beschreibung                              | Einheit         |
| --------------------- | ----------------------------------------- | --------------- |
| `grid.off_grid`       | Inselmodus aktiv                          | Boolescher Wert |
| `grid.r_voltage`      | Netzspannung Phase R                      | V               |
| `grid.s_voltage`      | Netzspannung Phase S                      | V               |
| `grid.t_voltage`      | Netzspannung Phase T                      | V               |
| `grid.frequency`      | Netzfrequenz                              | Hz              |
| `grid.active_power`   | Wirkleistung (+ Export, − Import)         | W               |
| `grid.reactive_power` | Blindleistung                             | kvar            |
| `grid.power_factor`   | Leistungsfaktor                           | –               |
| `grid.total_export`   | Gesamteinspeiseenergie                    | kWh             |
| `grid.total_import`   | Gesamt gekaufte Energie                   | kWh             |
| `grid.standard`       | Rasterstandard (6=VDE0126, 7=VDE4105\_DE) | –               |

### Wechselrichter (`inverter.*` )

| AUSWEIS                   | Beschreibung     | Einheit |
| ------------------------- | ---------------- | ------- |
| `inverter.temperature`    | Innentemperatur  | °C      |
| `inverter.frequency`      | Ausgangsfrequenz | Hz      |
| `inverter.daily_energy`   | Tagesertrag      | kWh     |
| `inverter.total_energy`   | Gesamtertrag     | kWh     |
| `inverter.operating_mode` | Betriebsart      | –       |
| `inverter.network_status` | Netzwerkstatus   | –       |

### Notstrom / EPS (`eps.*` )

| AUSWEIS       | Beschreibung         | Einheit |
| ------------- | -------------------- | ------- |
| `eps.voltage` | EPS-Ausgangsspannung | V       |
| `eps.current` | EPS-Ausgangsstrom    | A       |
| `eps.power`   | EPS-Ausgangsleistung | W       |

### Status (`status.*` )

| AUSWEIS                   | Beschreibung                        |
| ------------------------- | ----------------------------------- |
| `status.remote_control`   | Aktiver Fernbedienungsmodus         |
| `status.remote_countdown` | Verbleibende Zeit Fernbedienung(en) |

### Kontrolle (`control.*` ) — beschreibbar

| AUSWEIS                         | Beschreibung                     | Reichweite           |
| ------------------------------- | -------------------------------- | -------------------- |
| `control.remote_control_mode`   | Fernbedienungsmodus              | 0/1/3/5/7/9/11/13/15 |
| `control.remote_timeout`        | Fernbedienungs-Timeout (s)       | 0–3600               |
| `control.remote_active_power`   | Sollwert der Wirkleistung (W)    | -100000–100000       |
| `control.remote_reactive_power` | Sollwert für Blindleistung (var) | -100000–100000       |
| `control.eps_output`            | EPS/UPS-Ausgang                  | 0=Aus, 2=EPS, 3=USV  |
| `control.minimum_soc`           | Mindestladestand                 | 0–100 %              |
| `control.maximum_soc`           | Maximaler Ladezustand            | 0–100 %              |
| `control.minimum_soc_ongrid`    | Mindest-SoC (netzgekoppelt)      | 0–100 %              |
| `control.max_charge_current`    | Maximaler Ladestrom              | 0–40 A               |
| `control.max_discharge_current` | Maximaler Entladestrom           | 0–40 A               |
| `control.operating_mode`        | Betriebsart                      | 0–7                  |

#### Betriebsarten (`operating_mode` )

| Wert | Beschreibung       |
| ---- | ------------------ |
| 0    | Nicht spezifiziert |
| 1    | Selbstverbrauch    |
| 2    | Einspeisepriorität |
| 3    | Backup             |
| 4    | Gipfelrasur        |
| 6    | Zwangsladung       |
| 7    | Kraftentladung     |

#### Fernbedienungsmodi (`remote_control_mode` )

| Wert | Beschreibung                          |
| ---- | ------------------------------------- |
| 0    | Aus                                   |
| 1    | Wechselrichter-Export (PV-Priorität)  |
| 3    | Wechselrichterimport (PV-Priorität)   |
| 5    | Batterieentladung                     |
| 7    | Akkuladung                            |
| 9    | Grid-Export                           |
| 11   | Grid-Import                           |
| 13   | Wechselrichter-Export (Netzpriorität) |
| 15   | Wechselrichterimport (Netzpriorität)  |

---

## Changelog

### 1.0.18 (2026-07-24)
- Fix stale Modbus connection not being reset after a poll returns no data, which could cause the adapter to keep reusing a dead connection instead of reconnecting

### 1.0.17 (2026-07-24)
- Speed up adapter startup by creating/healing all datapoints in parallel instead of sequentially
- Make Modbus reconnect more robust (graceful socket close, automatic connect retry) to reduce ECONNRESET disconnects

### 1.0.16 (2026-07-23)
- Fix Admin GUI crash when hovering enum values in the object tree (#44): common.states is now resolved to plain per-language strings instead of translation objects, with automatic self-healing for existing installations
- Add common.desc (English/German) for control and status datapoints

### 1.0.15 (2026-06-28)
- Fix README manufacturer link: use solakon.de instead of the unrelated Home Assistant integration repo

### 1.0.14 (2026-06-28)
- Address manual review feedback: remove postinstall script, English log messages, i18n state labels and instanceObjects, translatable admin labels, sequential polling, README fixes, integration tests

### 1.0.13 (2026-06-11)
- Fix invalid role 'level.power' for power setpoint states (E1008)

### 1.0.12 (2026-06-10)
- Update @tsconfig/node22 to ^22.0.5 (W0083); migrate i18n to short format (S5601)

### 1.0.11 (2026-06-10)
- Add CHANGELOG_OLD.md for older entries (W6020); add tsconfig.json and @tsconfig/node22 (S0085/S0087); add README link to CHANGELOG_OLD.md

### 1.0.10 (2026-06-10)
- Fix W5005: use adapter.setTimeout in modbus.js; update eslint-config to 2.3.4; remove CHANGELOG_OLD.md

### 1.0.9 (2026-06-09)
- Fix JSON syntax error in io-package.json; limit news entries to 7 (E1032)

### 1.0.7 (2026-06-09)
- Fix @types/node version specifier: change >=22 to ^22.0.0 (W0066)

### 1.0.6 (2026-06-09)
- Fix Node.js requirement in README (>=22); add @types/node devDependency

### 1.0.5 (2026-06-09)
- Fix repo checker errors: require Node.js >=22, update release-script packages, remove redundant eslint devDependency, add macOS to CI test matrix, use this.setInterval/clearTimeout correctly

### 1.0.4 (2026-06-09)
- Add multilingual names (11 languages) to all datapoints

### 1.0.3 (2026-05-30)
- Add Node.js 24 to CI test matrix; use Node 24 for lint and deploy

### 1.0.2 (2026-04-13)
- Fix: add changelog to README, remove obsolete .eslintrc.json, add release-script packages, VS Code schema, automerge workflow

### 1.0.1 (2026-04-13)
- Fix: compact mode enabled, ESLint migrated to @iobroker/eslint-config, node: prefix for built-in modules, automated deploy workflow added

### 1.0.0 (2026-04-12)
- Initial release
- Modbus TCP communication
- All sensor data points (PV, battery, grid, inverter, EPS)
- All control data points (operating mode, SoC limits, remote control, EPS)
- Admin UI with jsonConfig

For older changelog entries see CHANGELOG_OLD.md.

---

## License

MIT License

Copyright (c) 2026 Marco Bertulies <berto74online@gmail.com>

Based on the [Home Assistant integration for Solakon ONE](https://github.com/solakon-de/solakon-one-homeassistant).