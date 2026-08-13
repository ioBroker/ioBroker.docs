---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.iec104/README.md
title: ioBroker IEC 60870-5-104 Adapter
hash: fK8Zo/CbMZhh11PhfZTaDNakEqLayYEmb6FaLC1wt+U=
---
# IoBroker IEC 60870-5-104 Adapter
ioBroker-Adapter für die Master-Slave-Kommunikation gemäß IEC 60870-5-104.

Der Adapter kann als IEC-104-Master oder -Slave betrieben werden. Empfangene Datenpunkte werden nach ASDU/gemeinsamer Adresse unterhalb von `ASDU-<address>` gruppiert. Jede ASDU enthält separate Ordner für Werte, IV-Qualität, NT-Qualität, Zeitstempel und COT-Informationen.

## Merkmale
- Master-Modus zum Anschluss an eine IEC-104-gesteuerte Station.
- Slave-Modus zum Bereitstellen konfigurierter ioBroker-Zustände über IEC-104.
- Allgemeine Abfrage nach Verbindungsaufbau und optionale zyklische Abfrage.
- Konfigurierbare COT-, Common Address- und IOA-Feldgrößen.
- Konfigurierbare Datenpunkttabelle mit Import- und Exportunterstützung.
- Bundesstaatslayout gruppiert nach ASDU/gemeinsamer Adresse.
- Separate Zustände für Wert, IV, NT, Zeitstempel und COT-Text.

## Konfiguration
Stellen Sie zuerst den Verbindungsmodus ein:

- `Master / Steuerstation`: Verbindet sich mit einem entfernten IEC-104-Slave.
- `Slave / controlled station`: hört lokal auf einen entfernten IEC-104-Master.

Allgemeine Einstellungen:

| Schauplatz | Bedeutung |
| --- | --- |
| `Remote host` | Im Master-Modus verwendeter Remote-Host. |
| `Bind address` | Lokale Bindungsadresse, die im Slave-Modus verwendet wird. |
| `Common address` | Standardmäßige gemeinsame Adresse für konfigurierte Punkte. |
| `Originator address` | Absenderadresse, die in ASDUs verwendet wird. |
| `Read only` | ASDU-Befehle von der Gegenseite ablehnen. |
| `Schreibgeschützt` | ASDU-Befehle von der Gegenseite ablehnen. |

## Datenpunkte
Konfigurierte Punkte definieren, wie IEC-104-IOAs ioBroker-Zuständen zugeordnet werden. Die Tabelle unterstützt Überwachungstypen, Befehlstypen, Zeitstempel, Skalierung und optionale gemeinsame Adressen pro Punkt.

Der Adapter speichert empfangene Punkte auch unterhalb von `ASDU-<address>`, sodass Werte von verschiedenen gemeinsamen Adressen getrennt bleiben.

## Changelog

### **WORK IN PROGRESS**

- Correct button-state metadata, sanitize configured state IDs and clamp all configurable timer values.
- Require Admin >= 7.8.23 and update repository maintenance configuration.

### 0.1.26

- Uses the standard npm environment token fallback and keeps `common.news` within repository limits.

### 0.1.25

- Completed translations for technical ASDU option labels.

### 0.1.24

- Completed all Admin UI translations using short-format i18n files.

### 0.1.23

- Published the point-role fix with npm provenance through the standard ioBroker release workflow.

### 0.1.22

- Assigned valid ioBroker roles to read-only and writable IEC-104 points.
- Restored the standard ioBroker test-and-release deployment workflow.

### 0.1.21

- Fixed ioBroker repochecker metadata, package checks, jsonConfig i18n handling and release automation.

### 0.1.20

- Replaced plain Node.js timers with ioBroker adapter timer helpers.

### 0.1.19

- Removed old unpublished changelog entries from `io-package.json`.
- Added responsive metadata for the data point table.

### 0.1.18

- Added repository metadata, CI release automation and adapter checker compatibility for public ioBroker publication.

### 0.1.17

- Reorganized states by ASDU with Value, IV, NT, Time and COT folders.
- Exposed NT quality and COT text states.
- Improved master reconnect handling.

Older entries are available in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

Copyright (c) 2026 TheBam1990

MIT License. See [LICENSE](LICENSE) for details.