---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tinker/README.md
title: ioBroker.tinker
hash: FVYgJOVkaP4PpmIQU+OGbj9kvGDUNUe53IPDLmChaLI=
---
![Logo](../../../en/adapterref/iobroker.tinker/admin/tinker.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.tinker.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tinker.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/tinker-installed.svg)
![Anzahl Installationen (stabil)](http://iobroker.live/badges/tinker-stable.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/simatec/ioBroker.tinker/badge.svg)
![Lizenz](https://img.shields.io/github/license/simatec/ioBroker.tinker?style=flat)
![Spenden](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# IoBroker.tinker
---

![Test und Freigabe](https://github.com/simatec/ioBroker.tinker/workflows/Test%20and%20Release/badge.svg)

Der Tinker Board Monitor-Adapter ist eine modifizierte Version des Raspberry PI Monitor-Adapters und des OrangePi Monitor-Adapters für ioBroker

## Unterstützung der Adapterentwicklung
**Wenn es Ihnen gefällt, denken Sie bitte über eine Spende nach:**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

---

## Wichtige Informationen
getestete Hardware: Asus Tinker Board

## Folgende Objekte sind nach Auswahl verfügbar:
### CPU
* cpu_frequenz
* laden1
* laden5
* laden15

### Erinnerung
* Speicher_verfügbar
* speicherfrei
* speicher_total

### Netzwerk (eth0)
* net_received
* net_send

### SD-Karte
* sdcard_root_total
* sdcard_root_used

### Tauschen
* swap_total
* swap_used

### Temperatur
* soc_temp

### Betriebszeit
* Betriebszeit

### WLAN
* wifi_received
* wifi_send

---

## Aufbau
Auf der Konfigurationsseite können Sie folgende Module auswählen:

* CPU
* Erinnerung
* Netzwerk
* SD-Karte
* Tauschen
* Temperatur
* Betriebszeit
* WLAN

---

## Changelog
<!-- ### __WORK IN PROGRESS__ -->
### __WORK IN PROGRESS__
* (simatec) Dependencies updated
* (simatec) Docu updated

### 1.3.2 (2024-02-14)
* (simatec) Design Fix
* (simatec) Source code cleaned up

### 1.3.1 (2024-02-11)
* (simatec) Dependencies updated
* (simatec) Design Fix
* (simatec) Translation added
* (simatec) jsonConfig added
* (simatec) gulp deleted
* (simatec) adapter-dev added

### 1.3.0 (2024-01-07)
* (simatec) Dependencies updated
* (simatec) many smal Fix
* (simatec) Translation added

### 1.2.1 (2023-11-20)
* (simatec) Dependencies updated

### 1.2.0 (2023-03-18)
* (simatec) Dependencies updated
* (simatec) test and release updated
* (simatec) Repo updated

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

Copyright (c) 2018 - 2024 simatec

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