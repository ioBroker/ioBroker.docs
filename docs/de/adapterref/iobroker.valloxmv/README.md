---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.valloxmv/README.md
title: ioBroker.valloxmv
hash: tNjVgq43vlnczmfzNl4UqayZRgRraM7L1puKDRIyrWE=
---
![Logo](../../../en/adapterref/iobroker.valloxmv/admin/valloxmv.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.valloxmv.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.valloxmv.svg)
![Anzahl der Installationen](https://iobroker.live/badges/valloxmv-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/valloxmv-stable.svg)
![NPM](https://nodei.co/npm/iobroker.valloxmv.png?downloads=true)
![Test und Freigabe](https://github.com/hacki11/ioBroker.valloxmv/workflows/Test%20and%20Release/badge.svg)

# ioBroker.valloxmv

## ValloxMV-Adapter für ioBroker

Verbindet Ihr Vallox-Lüftungssystem mit Ihrem ioBroker-Hausautomationssystem.

## Verwendung

- Adapter installieren
- Geräteadresse und Abfrageintervall konfigurieren (mindestens 60).
- Lesen und Schreiben Sie Staaten wie gewohnt

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.6.1 (2026-07-18)
- Use latest vallox-api with AUTOMATIC profile support

### 1.6.0 (2026-07-06)
- (copilot) Adapter requires node.js >= 22 now
- Add support for AUTOMATIC profile on firmware 3.1.4 or newer

### 1.5.0 (2026-02-28)
* Update dependencies
* Update minimum node version
* Fix ioBroker issues

### 1.4.1 (2025-04-14)
* Maintenance Release
* Add support for NodeJS 18 as long as iobroker supports
* Add devcontainer for development
* Add release script

### 1.4.0
* Maintenance Release
* Bump engines to NodeJS 20 as minimum version

[Older changelogs can be found there](https://github.com/hacki11/ioBroker.valloxmv/blob/master/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025-2026 hacki11