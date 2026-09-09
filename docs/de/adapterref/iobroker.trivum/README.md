---
chapters: {"pages":{"en/adapterref/iobroker.trivum/README.md":{"title":{"en":"ioBroker.trivum"},"content":"en/adapterref/iobroker.trivum/README.md"},"en/adapterref/iobroker.trivum/READMEde.md":{"title":{"en":"ioBroker.trivum"},"content":"en/adapterref/iobroker.trivum/READMEde.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.trivum/README.md
title: ioBroker.trivum
hash: DJdf6kaQvJ9pAxMTT655m2wwgva6OZDgs0763u6av9g=
---
![Logo](../../../en/adapterref/iobroker.trivum/admin/trivum.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.trivum.svg)
![Test und Freigabe](https://github.com/TheBam1990/ioBroker.trivum/actions/workflows/test-and-release.yml/badge.svg)

# ioBroker.trivum

Steuern Sie ein Trivum Multiroom-Audiosystem von ioBroker über dessen lokale XML-API.

Deutsche Dokumentation: [READMEde.md](/#/docs/adapterref/iobroker.trivum/READMEde.md)

## Konfiguration

Geben Sie die IPv4-Adresse des trivum MusicCenter ein. Zonen und Bedienelemente werden automatisch erkannt. Das Abfrageintervall und das HTTP-Timeout sind konfigurierbar; bestehende Installationen behalten die bisherigen Einstellungen bei.`adresse` Und`option3` Konfigurationsschlüssel.

`Number of paging presets` Erstellt globale Paging-Buttons, beginnend bei ID 0.

## Staaten

Globale Steuerung:

- `Global.ALLOFF` : Alle Zonen ausschalten
- `Global.Aktive_zonen` : von Trivum gemeldete aktive Zonen
- `Global.PagingN` : Start der Paging-Voreinstellung N

Jede erkannte Zone liefert:

- `Muten` : stummschalten/Stummschaltung aufheben
- `DEFAULT_STREAMING` : Starte den Standardstream
- `ZONECMD_DEFAULT_TUNER` : Starte den Standardtuner
- `VOLUME` Lautstärke von 0 bis 100 Prozent ablesen oder einstellen
- `ZONECMD_POWER_OFF` : Schalten Sie die Zone aus
- `Status` : aktueller Zonenstatus

Die Tastenzustände werden nach einer erfolgreichen Anfrage automatisch zurückgesetzt.`info.connection` wird erst nach einer erfolgreichen Trivum-Antwort wahr, während`info.lastError` speichert den letzten Kommunikationsfehler.

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

MIT License. See [LICENSE](https://github.com/TheBam1990/ioBroker.trivum/blob/master/LICENSE).