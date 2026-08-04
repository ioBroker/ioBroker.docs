---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.trivum/README.md
title: ioBroker.trivum
hash: bD8IPCX1XoUvSvVSiOAA5siHu2+WKbLK/W1qbydFlgA=
---
![Logo](../../../en/adapterref/iobroker.trivum/admin/trivum.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.trivum.svg)

# IoBroker.trivum
[![Test und Freigabe](https://github.com/TheBam1990/ioBroker.trivum/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/TheBam1990/ioBroker.trivum/actions/workflows/test-and-release.yml)

Steuern Sie ein Trivum Multiroom-Audiosystem von ioBroker über dessen lokale XML-API.

Deutsche Dokumentation: [READMEde.md](READMEde.md)

## Konfiguration
Geben Sie die IPv4-Adresse des trivum MusicCenter ein. Zonen und Bedienelemente werden automatisch erkannt. Das Abfrageintervall und das HTTP-Timeout sind konfigurierbar; bestehende Installationen behalten die bisherigen Konfigurationsschlüssel `adresse` und `option3` bei.

`Number of paging presets` erstellt globale Paging-Buttons, beginnend bei ID 0.

## Staaten
Globale Steuerung:

- `Global.ALLOFF`: Alle Zonen deaktivieren
- „Global.Aktive_zonen“: Von trivum gemeldete aktive Zonen
- `Global.PagingN`: Starte Paging-Voreinstellung N

Jede erkannte Zone liefert:

- `Muten`: Stummschalten/Stummschaltung aufheben
- `DEFAULT_STREAMING`: Startet den Standardstream
- `ZONECMD_DEFAULT_TUNER`: Standardtuner starten
- `VOLUME`: Lautstärke von 0 bis 100 Prozent lesen oder einstellen
- `ZONECMD_POWER_OFF`: Zone ausschalten
- `Status`: Aktueller Zonenstatus

Die Schaltflächenzustände werden nach einer erfolgreichen Anfrage automatisch zurückgesetzt. `info.connection` wird erst nach einer erfolgreichen Trivum-Antwort auf „wahr“ gesetzt, während `info.lastError` den letzten Kommunikationsfehler speichert.

## Changelog

### 0.1.0

- Migrated to the current ioBroker adapter template and responsive JSON Config
- Added Node.js 22/24 and js-controller 6 compatibility
- Updated adapter-core, dependencies, linting, tests and release workflows
- Reworked zone discovery, polling, connection state and error handling
- Fixed zone commands to use discovered zone IDs
- Changed volume to a numeric percentage state and prevented overlapping polls

### 0.0.5

- Updated adapter core

## License

Copyright (c) 2021-2026 TheBam <elektrobam@gmx.de>

MIT License. See [LICENSE](LICENSE).