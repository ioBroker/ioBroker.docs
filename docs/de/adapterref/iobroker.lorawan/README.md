---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lorawan/README.md
title: ioBroker.lorawan
hash: +2AvOJrUWLBQdvNOzwMRYXj8fqtf7D2p6OcPUqw847k=
---
![Logo](../../../en/adapterref/iobroker.lorawan/admin/lorawan.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.lorawan.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.lorawan.svg)
![Anzahl der Installationen](https://iobroker.live/badges/lorawan-stable.svg)
![Spenden](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![NPM](https://nodei.co/npm/iobroker.lorawan.png?downloads=true)

# IoBroker.lorawan
![Test und Freigabe](https://github.com/BenAhrdt/ioBroker.lorawan/workflows/Test%20and%20Release/badge.svg)

## LoRawan-Adapter für ioBroker
Der Adapter kommuniziert bidirektional mit LoRaWAN-Geräten über den LoRaWAN Network Server via MQTT-Protokoll.

„The Thinks Network“ und „Chirpstack“ werden aktuell unterstützt, weitere folgen möglicherweise später.
Der Adapter wurde in Zusammenarbeit mit Jörg Froehner (LoraWan@hafenmeister.com) entwickelt.

Die Dokumentation im Wiki finden Sie hier: https://github.com/BenAhrdt/ioBroker.lorawan/wiki<br/> Aktuell gibt es hier eine Dokumentation auf Englisch: https://wiki.hafenmeister.de

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.22.31 (2026-07-09)
- (BenAhrdt) Add selection of ToIob source id

### 1.22.30 (2026-07-07)
- (BenAhrdt) Add PIR Mini device Profile
- (BenAhrdt) Add possibillity to ad states to downlink numbers

### 1.22.29 (2026-07-06)
- (BenAhrdt) Add some roles and units to assignhandler

### 1.22.28 (2026-07-05)
- (BenAhrdt) Add DewPointTemperature to assignhandler

### 1.22.27 (2026-07-04)
- (BenAhrdt) Bugfix warning for wrong id
- (BenAhrdt) Add Profile to downloadconfig

[Older changes can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025-2026 BenAhrdt <bsahrdt@gmail.com>  
Copyright (c) 2025-2026 Joerg Froehner <LoraWan@hafenmeister.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.