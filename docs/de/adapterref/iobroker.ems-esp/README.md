---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ems-esp/README.md
title: ioBroker.ems-esp
hash: r4Xvby0it7js6RYm5F4gfMQb8Ffqie79977L1g6vXSc=
---
![Logo](../../../en/adapterref/iobroker.ems-esp/admin/ems-esp.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.ems-esp.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ems-esp.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/ems-esp-installed.svg)
![Anzahl Installationen (stabil)](https://iobroker.live/badges/ems-esp-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/tp1de/iobroker.ems-esp.svg)
![NPM](https://nodei.co/npm/iobroker.ems-esp.png?downloads=true)

# IoBroker.ems-esp
**Tests:** ![Test und Freigabe](https://github.com/tp1de/ioBroker.ems-esp/workflows/Test%20and%20Release/badge.svg)

## Bosch / Buderus Heizsysteme mit km200 / IP-inside und/oder ems-esp Schnittstelle
Der Adapter unterstützt eine Schnittstelle zu den Heizsystemen der Bosch-Gruppe über EMS- oder EMS+-Bus.
(Buderus / Junkers / Netfit usw.).

## Es kann über Web-API-Aufrufe eine Schnittstelle zum Heizsystem herstellen:
* km200, km200 hrv, km100, km50, HMC300 oder IP-inside (von Bosch Group)

* ems-esp-Gateway (https://github.com/emsesp/EMS-ESP32) mit der neuesten Entwicklungsversion (siehe unten) und dem ESP32-Chip.

  Die alten ESP8266-Gateways mit API V2 werden NICHT MEHR UNTERSTÜTZT!!

* Neue Cloud-Gateways (MX300 ...) werden nicht unterstützt!

Der ioBroker ems-esp-Adapter kann Daten zu beiden Gateways lesen und schreiben, um alle Heizungskomponenten zu steuern.
Es kann entweder für die Original-Gateways der Bosch-Gruppe oder das ems-esp oder beide parallel verwendet werden.

## Alle geänderten Zustände aus eigenen Skripten oder dem Objektbrowser müssen quittiert = false setzen !!!
Der Adapter wurde für das EMS-ESP-Gateway mit der neuesten Firmware-Version (V3.6.0) von ESP32 getestet

## NEU Energieaufzeichnungen und -statistiken benötigen eine aktive Datenbankinstanz.
Aufzeichnungen erfordern eine InfluxDB-Adapterversion >= 4.0.2, die das Löschen von Datenbankdatensätzen ermöglicht. Der Aufbewahrungszeitraum wird jetzt gelesen und Aufzeichnungen werden nur innerhalb des Aufbewahrungszeitraums gespeichert – Beta-Status. InfluxDB v2 benötigt zum Speichern einen Aufbewahrungszeitraum von > 2 Jahren Alles historische Werte.
In V2 ist dies ein globaler Parameter für alle Zustände!

## NEU: Hysterese des Wärmebedarfs verbessert.
Der Wärmebedarf pro Thermostat ist aktiv, wenn die tatsächliche Temperatur niedriger ist als (Zieltemperatur – Delta).
Der Wärmebedarf ist inaktiv, wenn die tatsächliche Temperatur höher als die Zieltemperatur ist.
Stellen Sie sicher, dass Delta hoch genug ist, um zu viele Kesselstarts zu vermeiden.

## NEU: Wärmebedarfsparameter können während der aktiven Instanz geändert werden
Die Wärmebedarfsparameter Delta/Gewicht für jeden Thermostat können während der aktiven Instanz innerhalb von Objekten geändert werden. Die Wärmebedarfsparameter Weighton/Weightoff für jeden Heizkreis können während der aktiven Instanz innerhalb von Objekten geändert werden

Deutsche Dokumentation: https://github.com/tp1de/ioBroker.ems-esp/blob/main/doc/ems-esp-ds.pdf

Englische Dokumentation: https://github.com/tp1de/ioBroker.ems-esp/blob/main/doc/ems-esp-es.pdf

# Iobroker.ems-esp

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* influxdb adapter version >= 4.0.2 required 
* store km200 recordings only within defined retention period for influxdb
* delay start of statistics by 5 minutes

### 2.7.5 (2024-02-02)
* allow only positive deltam in config for heat demand function

### 2.7.4 (2024-02-01)
* avoid sql errors on instance start

### 2.7.3 (2024-01-31)
* error correction for heat demand function

### 2.7.2 (2024-01-31)
* error correction for heat demand function

### 2.7.1 (2024-01-30)
* improve error processing for wrongly defined heat demand states

## License
MIT License

Copyright (c) 2024 Thomas Petrick <tp1degit@gmail.com>

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
SOFTWARE."