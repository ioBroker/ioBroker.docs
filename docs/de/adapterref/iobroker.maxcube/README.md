---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.maxcube/README.md
title: ioBroker.maxcube
hash: MpkrEy9ZuJa1izqwLyLwRZ+vzSRMcw2ofpiX+aml4wU=
---
![Logo](../../../en/adapterref/iobroker.maxcube/admin/maxcube.png)

![Anzahl der Installationen](http://iobroker.live/badges/maxcube-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.maxcube.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.maxcube.svg)

# IoBroker.maxcube
==================================

![Testen und freigeben](https://github.com/ioBroker/ioBroker.maxcube/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/maxcube/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

ioBroker-Adapter zur Steuerung von Max! über Cube

## Unterstützte Geräte
- Thermostat
- Tür-/Fenstersensor
- Druckknopf (nur Batteriestatus)

## Verwendung
Vor der Verwendung müssen Sie zuerst alle Geräte mit MAX verbinden! Würfel über MAX! Firmware.

## Changelog

### 1.0.4 (2021-07-15)
* (thost96/Apollon77) optimize for js-controller 3.3

### 1.0.3 (2021-04-10)
* (thost96) fixed state has no existing object for info.serial_number

### 1.0.3 (2021-04-11)
* (thost96) Prevent js-controller 3.2 warnings

### 1.0.2 (2020-07-28)
* (Apollon77) Update dependencies
* (Apollon77) make compatible with js-controller 3

### 1.0.1 (2018-07-06)
* (stabilostick) initialization of working state
* (stabilostick) setpoint rounding to 0.5
* (stabilostick) upstream only changed states
* (stabilostick) stabilize state display for setpoint and mode values

### 1.0.0 (2018-05-24)
* (bluefox) refactoring
* (bluefox) added admin3

### 0.1.2 (2017-06-11)
* (paul53) Try to read wall thermostat

### 0.1.1 (2017-06-07)
* (bluefox) use local maxcube lib

### 0.1.0 (2017-06-05)
* (bluefox) intial commit

## License

MIT Copyright (c) 2017-2021 bluefox