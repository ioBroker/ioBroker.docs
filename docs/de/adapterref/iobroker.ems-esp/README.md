---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ems-esp/README.md
title: ioBroker.ems-esp
hash: 9hBDNYzVDZZYL38ZbRpOkFVFWncEVg88mGYU/94TEVg=
---
![Logo](../../../en/adapterref/iobroker.ems-esp/admin/ems-esp.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.ems-esp.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ems-esp.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/ems-esp-installed.svg)
![Anzahl Installationen (stabil)](https://iobroker.live/badges/ems-esp-stable.svg)
![NPM](https://nodei.co/npm/iobroker.ems-esp.png?downloads=true)

# IoBroker.ems-esp
**Tests:** ![Testen und Freigeben](https://github.com/tp1de/ioBroker.ems-esp/workflows/Test%20and%20Release/badge.svg)

## Bosch / Buderus Heizsysteme mit km200 / IP-inside und/oder ems-esp Schnittstelle
Der Adapter unterstützt eine Schnittstelle zu den Heizsystemen der Bosch-Gruppe über EMS- oder EMS+-Bus.
(Bosch / Buderus / Junkers / Netfit usw.).

## Der Adapter kann über API-Aufrufe mit dem Heizsystem kommunizieren. Unterstützte Gateways sind:
* km200, km200 hrv, km100, km50, HMC300 oder IP-inside (von der Bosch-Gruppe)

* ems-esp-Gateway (https://github.com/emsesp/EMS-ESP32) mit dem ESP32-Chip.

Die alten ESP8266-Gateways mit API V2 werden nicht mehr unterstützt!! Der Adapter wurde für das ems-esp-Gateway mit der neuesten stabilen Firmware-Version getestet. Die neuesten Entwicklerversionen der Firmware funktionieren möglicherweise nicht stabil mit dem ioBroker-Adapter. Die Verwendung erfolgt auf eigenes Risiko.

* Neue Cloud-Gateways der Bosch-Gruppe (MX300 / EasyControl ...) werden nicht unterstützt, da sie keine LAN-API unterstützen!

Der ioBroker ems-esp Adapter kann Daten von beiden Gateways lesen und schreiben, um alle Heizkomponenten zu steuern.
Er kann entweder für die originalen Bosch-Group Gateways oder das ems-esp oder beide parallel verwendet werden.
Alle geänderten Zustände aus eigenen Skripten oder dem Objektbrowser müssen acknowledged = false gesetzt werden!!!

Deutsche Dokumentation: https://github.com/tp1de/ioBroker.ems-esp/blob/main/doc/ems-esp-ds.pdf

Englische Dokumentation: https://github.com/tp1de/ioBroker.ems-esp/blob/main/doc/ems-esp-es.pdf

Deutsches ioBroker-Forum: https://forum.iobroker.net/topic/45862/neuer-adapter-ems-esp-f%C3%BCr-bosch-heizungen

# Iobroker.ems-esp

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* dependabot updates

### 5.1.2 (2024-12-31)
* ems-esp: fix enum errors for setting "Value" 
* dependabot updates

### 5.1.1 (2024-12-26)
* correct statistics on adapter start-up

### 5.1.0 (2024-12-25)
* error correction on enabling statistics

### 5.0.6 (2024-12-03)
* dependabot updates
* ems-esp: send switchprog updates 3 times (test)

### 5.0.5 (2024-11-22)
* Add native entries to io-package

## License
MIT License

Copyright (c) 2025 Thomas Petrick <tp1degit@gmail.com>

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
*OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE."