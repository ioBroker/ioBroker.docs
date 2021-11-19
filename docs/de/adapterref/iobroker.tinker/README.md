---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tinker/README.md
title: ioBroker.tinker
hash: keeAn15kWOL11iVfAuzbRm8qeiPupoUlwH36ne0B0oQ=
---
![Logo](../../../en/adapterref/iobroker.tinker/admin/tinker.png)

![Anzahl der Installationen](http://iobroker.live/badges/tinker-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.tinker.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tinker.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/simatec/ioBroker.tinker/badge.svg)
![NPM](https://nodei.co/npm/iobroker.tinker.png?downloads=true)

#ioBroker.tinker
===================

![Testen und freigeben](https://github.com/simatec/ioBroker.uv-protect/workflows/Test%20and%20Release/badge.svg)

Tinker Board Monitor Adapter ist eine modifizierte Version des Raspberry PI Monitor Adapters und des OrangePi Monitor Adapters für ioBroker

**Wenn es Ihnen gefällt, denken Sie bitte über eine Spende nach:**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=Q4EEXQ6U96ZTQ&source=url)

### Wichtige Informationen
getestete Hardware: Asus Tinker Board

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

## *SD-Karte*
- sdcard_root_total
- sdcard_root_used

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

## Aufbau
Auf der Konfigurationsseite können Sie folgende Module auswählen:

- ZENTRALPROZESSOR
- Speicher
- Netzwerk
- SD-Karte
- Wechsel
- Temperatur
- Betriebszeit
- WLAN

## Changelog
<!-- ### __WORK IN PROGRESS__ -->
### 1.1.1 (2021-11-18)
* (simatec) Dependencies updated
* (simatec) test and release updated

### 1.1.0 (2020-04-08)
* (simatec) delete sync-exec
* (simatec) Rewritten code on child_process
* (simatec) code cleaned

### 1.0.0 (2020-04-07)
* (simatec) Release 1.0.0

### 0.1.3 (2019-03-14)
* (simatec) Ready for latest

### 0.1.1 (2019-01-08)
* Fix for new iobroker Installer

### 0.1.0 (2018-07-03)
* First Beta

### 0.0.1 (2018-07-03)
* initial Version

## License

The MIT License (MIT)

Copyright (c) 2018 - 2021 simatec

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.