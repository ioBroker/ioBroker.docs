---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.opi/README.md
title: ioBroker.opi
hash: QqoAS/PadgUSoQ6qePLCst9ZR/TDQhwI4YF34Xz25TY=
---
![Logo](../../../en/adapterref/iobroker.opi/admin/opi.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.opi.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.opi.svg)
![NPM](https://nodei.co/npm/iobroker.opi.png?downloads=true)

# IoBroker.opi
===================

OPI-Monitor-Implementierung zur Integration in ioBroker.

### Wichtige Informationen
getestete Hardware: OrangePi plus2 H3

### Folgende Objekte stehen nach Auswahl zur Verfügung:
## *ZENTRALPROZESSOR*
- CPU_Frequenz
- laden1
- laden5
- Last15

## *Speicher*
- Speicher_verfügbar
- memory_free
- memory_total

## *Netzwerk (eth0)*
- net_received
- net_send

## *eMMC*
- emmc_root_total
- emmc_root_used

## *Wechsel*
- swap_total
- swap_used

## *Temperatur*
- soc_temp

## *Verfügbarkeit*
- Betriebszeit

## *WLAN*
- wifi_received
- wifi_send

### Aufbau
Auf der Konfigurationsseite können Sie folgende Module auswählen:

- ZENTRALPROZESSOR
- Speicher
- Netzwerk
- eMMC
- Wechsel
- Temperatur
- Betriebszeit
- WLAN

## 0.1.2 (2021-11-06)
* (foxriver76) wir verwenden keine veralteten adapter.objects mehr

## 0.1.1 (2018-01-27)
- index_m.html aktualisieren.
- index.html aktualisieren.
- Codes aktualisieren.

## 0.1.0 (2018-01-24)
- Admin3-Unterstützung.

## 0.0.6 (2017-08-01)
- stabile Version.

## 0.0.2 (2017-06-01)
- Erstveröffentlichung. Betaversion.

## Changelog

## License
Modified for OrangePi by Johnny Schneider <johann.schneider1@googlemail.com>

Copyright (c) 2015-2016 husky-koglhof <husky.koglhof@icloud.com>

MIT License