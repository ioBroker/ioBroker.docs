---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ems-esp/README.md
title: ioBroker.ems-esp
hash: 3bOvnWEL8AyBYUbkbPBMOHU0REczZsEAXxM8b9g23Ro=
---
![Logo](../../../en/adapterref/iobroker.ems-esp/admin/ems-esp.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.ems-esp.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ems-esp.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/ems-esp-installed.svg)
![Anzahl Installationen (stabil)](https://iobroker.live/badges/ems-esp-stable.svg)
![NPM](https://nodei.co/npm/iobroker.ems-esp.png?downloads=true)

# IoBroker.ems-esp
**Tests:** ![Test und Freigabe](https://github.com/tp1de/ioBroker.ems-esp/workflows/Test%20and%20Release/badge.svg)

## Bosch / Buderus Heizsysteme mit km200 / IP-inside und/oder ems-esp Schnittstelle
Der Adapter unterstützt eine Schnittstelle zu den Heizsystemen der Bosch-Gruppe über EMS- oder EMS+-Bus.
(Buderus / Junkers / Netfit usw.).

## Es kann über Web-API-Aufrufe eine Schnittstelle zum Heizsystem herstellen:
* km200, km200 hrv, km100, km50, HMC300 oder IP-inside (von Bosch Group)

* ems-esp-Gateway (https://github.com/emsesp/EMS-ESP32) mit der neuesten Entwicklungsversion (siehe unten) und dem ESP32-Chip.

Die alten ESP8266-Gateways mit API V2 werden NICHT MEHR UNTERSTÜTZT!! Der Adapter ist für das EMS-ESP-Gateway mit der neuesten Firmware-Version (> V3.6.0) von ESP32 getestet

* Neue Cloud-Gateways der Bosch-Gruppe (MX300 / EasyControl ...) werden nicht unterstützt, da sie keine LAN-API unterstützen!

Der ioBroker ems-esp-Adapter kann Daten zu beiden Gateways lesen und schreiben, um alle Heizungskomponenten zu steuern.
Es kann entweder für die Original-Gateways der Bosch-Gruppe oder das ems-esp oder beide parallel verwendet werden.
Alle geänderten Zustände aus eigenen Skripten oder dem Objektbrowser müssen quittiert = falsch gesetzt werden !!!

## NEU in Version >= 3.0.0: EMS+-Entitäten (switchPrograms und HolidayModes) werden für das EMS-ESP-Gateway implementiert und bei gefundenen Zuständen werden erstellt.
Die ems-esp-Gateway-Firmware unterstützt keine SwitchPrograms und HolidayModes für EMS+-Thermostate (RC310 / RC300 oder ähnlich). Durch die Aktivierung dieser neuen Funktion werden Rohtelegramme an das ems-esp-Gateway gesendet und dann versucht, die Antwort zu lesen.
Die Tests werden für die Schaltprogramme A und B für HC1 bis HC4, Brauchwasser (Warmwasser) und Zirkulationspumpe (CP) sowie die Urlaubsmodi hm1–hm5 durchgeführt.
Die gefundenen erweiterten Entitäten werden in den Instanzeinstellungen gespeichert. Daher erfolgt einmalig ein Neustart der Adapterinstanz.

Anschließend wird nach diesen gefundenen Zuständen die Rohantwort dekodiert und es werden Zustände ähnlich den KM200-Gateway-API-Daten erstellt.
Wenn das km200-Gateway aktiviert ist, ist diese Funktion deaktiviert, um doppelte Einträge mit demselben Namen zu vermeiden.
Die erstellten Zustände bestehen aus JSON-Strukturen, Enum-Werten oder Arrays und sind beschreibbar – Seien Sie vorsichtig mit dem richtigen Inhalt.
Ich empfehle einen Test mit den Bosch/Buderus-Apps, um die richtigen Inhalte zu identifizieren – insbesondere für die Urlaubsmodi.
Die Abfrage ist auf alle 2 Minuten eingestellt.

## NEU Energieaufzeichnungen und -statistiken benötigen eine aktive Datenbankinstanz.
Aufzeichnungen erfordern eine InfluxDB-Adapterversion >= 4.0.2, die das Löschen von DB-Datensätzen ermöglicht. Der Aufbewahrungszeitraum wird jetzt gelesen und Aufzeichnungen werden nur innerhalb des Aufbewahrungszeitraums gespeichert – Beta-Status. InfluxDB v2 benötigt zum Speichern einen Aufbewahrungszeitraum von > 2 Jahren Alles historische Werte.
In V2 ist dies ein globaler Parameter für alle Zustände!

## NEU: Hysterese des Wärmebedarfs verbessert.
Schalten Sie den Wärmebedarf ein, wenn Ist-Temperatur <= Soll-Temp. - Delta. Ausschalten, wenn Soll-Temp. < Ist-Temp. Zwischen Soll-Delta und Soll-Temp. nichts unternehmen. Stellen Sie sicher, dass Delta hoch genug ist, um zu viele Kesselstarts zu vermeiden.

## NEU: Wärmebedarfsparameter können während der aktiven Instanz geändert werden
Die Wärmebedarfsparameter Delta/Gewicht für jeden Thermostat können während der aktiven Instanz innerhalb von Objekten geändert werden. Anmerkung: Das aktualisierte Gewicht wird nur verwendet, wenn ein neuer Wärmebedarf gefunden wird. Die Wärmebedarfsparameter Gewichtung/Gewichtung für jeden Heizkreis können während der aktiven Instanz innerhalb von Objekten geändert werden

Deutsche Dokumentation: https://github.com/tp1de/ioBroker.ems-esp/blob/main/doc/ems-esp-ds.pdf

Englische Dokumentation: https://github.com/tp1de/ioBroker.ems-esp/blob/main/doc/ems-esp-es.pdf

Deutsches ioBroker-Forum: https://forum.iobroker.net/topic/45862/neuer-adapter-ems-esp-f%C3%BCr-bosch-heizungen

# Iobroker.ems-esp

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 3.0.3 (2024-03-09)
* improve km200 data read to avoid errors

### 3.0.2 (2024-03-02)
* improve km200 data read to avoid errors - try http get up to 3 times now - especially for recordings

### 3.0.1 (2024-02-25)
* change KM200 error messages for recordings

### 3.0.0 (2024-02-17)
* Node >= 18 required
* update heatdemand weight changes to be effective during active instance
* ems-esp gateway: Raw telegram search for EMS+ thermostats: switchPrograms and holidayModes (RC310/RC300)
* create writable objects / states for switchPrograms and holidayModes
* this function is only active when no km200 gateway is selected - ems-esp gateway only
* improve error messages for km200 (wrong ip / passwords)
* small changes within PDF adapter documentation

### 3.0.0-alpha.2 (2024-02-16)
* Node >= 18 required
* update heatdemand weight changes to be effective during active instance

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