---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tinker/README.md
title: ioBroker.tinker
hash: a2S7fsrVfySxdMD2KdJdhpF2dSqnOs4c9OFGM4NaDk4=
---
![Logo](../../../en/adapterref/iobroker.tinker/admin/tinker.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.tinker.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tinker.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/tinker-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/tinker-stable.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/simatec/ioBroker.tinker/badge.svg)
![Test und Freigabe](https://github.com/simatec/ioBroker.tinker/workflows/Test%20and%20Release/badge.svg)
![Lizenz](https://img.shields.io/github/license/simatec/ioBroker.tinker?style=flat)
![Spenden](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# ioBroker.tinker

---

Der Tinker Board Monitor-Adapter ist eine modifizierte Version des Raspberry Pi Monitor-Adapters und des Orange Pi Monitor-Adapters für ioBroker.

## Unterstützung der Adapterentwicklung

**Wenn es Ihnen gefällt, erwägen Sie bitte eine Spende:**

[![PayPal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

---

## Wichtige Informationen

Getestete Hardware: Asus Tinker Board

## Nach der Auswahl stehen folgende Objekte zur Verfügung:

### CPU

- CPU-Frequenz
- Last1
- Last5
- Last15

### Erinnerung

- verfügbarer Speicher
- speicherfrei
- Gesamtspeicher

### Netzwerk (eth0)

- net\_received
- net\_send

### SD-Karte

- sdcard\_root\_total
- sdcard\_root\_used

### Tauschen

- Tausch\_gesamt
- Swap verwendet

### Temperatur

- soc\_temp

### Betriebszeit

- Betriebszeit

### WLAN

- WLAN empfangen
- wifi\_send

---

## Konfiguration

Auf der Konfigurationsseite können Sie folgende Module auswählen:

- CPU
- Erinnerung
- Netzwerk
- SD-Karte
- Tauschen
- Temperatur
- Betriebszeit
- WLAN

---

## Changelog
<!-- ### __WORK IN PROGRESS__ -->
### 1.4.0 (2026-08-20)
* (simatec) Dependencies updated
* (copilot) Adapter requires node.js >= 22 now
* (simatec) Source Code Cleaned Up

### 1.3.12 (2026-02-22)
* (simatec) Fix License
* (simatec) Dependencies updated

### 1.3.11 (2025-11-18)
* (simatec) Fix Test & Release

### 1.3.9 (2025-08-31)
* (simatec) Dependencies updated

### 1.3.8 (2025-06-29)
* (simatec) Dependencies updated
* (simatec) Ready for NodeJS 24.x

[Older changelogs can be found there](https://github.com/simatec/ioBroker.tinker/blob/master/CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2018-2026 simatec

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