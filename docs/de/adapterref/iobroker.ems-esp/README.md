---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ems-esp/README.md
title: ioBroker.ems-esp
hash: tDqMsfwdHnBhTrnQMUFXYtGUx0Uvwep6ITJ82u84Aq4=
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
(Buderus / Junkers / Netfit usw.).

## Es kann mithilfe von Web-API-Aufrufen eine Schnittstelle zum Heizsystem herstellen für:
* km200, km200 hrv, km100, km50, HMC300 oder IP-inside (von der Bosch-Gruppe)

* ems-esp-Gateway (https://github.com/emsesp/EMS-ESP32) mit neuester Entwicklerversion (siehe unten) und dem ESP32-Chip.

Die alten ESP8266-Gateways mit API V2 werden NICHT MEHR UNTERSTÜTZT!! Der Adapter wurde für das ems-esp-Gateway mit der neuesten Firmware-Version (> V3.6.0) von ESP32 getestet. Die neuesten Entwicklerversionen der Firmware funktionieren möglicherweise nicht stabil mit dem ioBroker-Adapter. Die Verwendung erfolgt auf eigenes Risiko.

* Neue Cloud-Gateways der Bosch-Gruppe (MX300 / EasyControl ...) werden nicht unterstützt, da sie keine LAN-API unterstützen!

Der ioBroker ems-esp Adapter kann Daten von beiden Gateways lesen und schreiben, um alle Heizkomponenten zu steuern.
Er kann entweder für die originalen Bosch-Group Gateways oder das ems-esp oder beide parallel verwendet werden.
Alle geänderten Zustände aus eigenen Skripten oder dem Objektbrowser müssen auf acknowledged = false gesetzt werden!!!

## NEU in Version >= 3.3.0: Einführung von Warnungen für die Verwendung nicht produktiver ems-esp-Firmware.
## NEU in Version >= 3.0.0: EMS+-Entitäten (SwitchPrograms und HolidayModes) sind für das EMS-ESP-Gateway implementiert und wenn gefunden, werden Zustände erstellt.
Die ems-esp-Gateway-Firmware unterstützt keine switchPrograms und holidayModes für EMS+-Thermostate (RC310 / RC300 oder ähnliche). Durch Aktivieren dieser neuen Funktion werden Rohtelegramme an das ems-esp-Gateway gesendet und dann versucht, die Antwort zu lesen.

Es werden die switchPrograms A und B für hc1 bis hc4, dhw (Warmwasser) und Umwälzpumpe (cp) und holidayModes hm1-hm5 getestet.

Die gefundenen erweiterten Entitäten werden in den Instanzeinstellungen gespeichert. Daher wird einmalig ein Neustart der Adapterinstanz durchgeführt.

Nach diesen gefundenen Zuständen wird die Rohantwort dekodiert und Zustände werden ähnlich den API-Daten des KM200-Gateways erstellt.
Wenn das KM200-Gateway aktiviert ist, wird diese Funktion deaktiviert, um doppelte Einträge mit demselben Namen zu vermeiden.
Die erstellten Zustände bestehen aus JSON-Strukturen, Enumerationswerten oder Arrays und sind beschreibbar – achten Sie auf den richtigen Inhalt.
Ich empfehle, mit den Bosch/Buderus-Apps zu testen, um den richtigen Inhalt zu identifizieren – insbesondere für Urlaubsmodi.
Die Abfrage erfolgt alle 2 Minuten.

## NEU Energieaufzeichnungen und -statistiken erfordern eine aktive Datenbankinstanz.
Für Aufzeichnungen ist ein InfluxDB-Adapter mit einer Version >= 4.0.2 erforderlich, der das Löschen von Datenbankaufzeichnungen ermöglicht. Die Aufbewahrungsfrist wird jetzt gelesen und Aufzeichnungen werden nur innerhalb der Aufbewahrungsfrist gespeichert – Betastatus: Für InfluxDB v2 muss die Aufbewahrungsfrist auf > 2 Jahre eingestellt werden, damit alle historischen Werte gespeichert werden.
In V2 ist dies ein globaler Parameter für alle Zustände!

## NEU: Wärmebedarfs-Hysterese verbessert.
Wärmebedarf einschalten, wenn Isttemperatur <= Solltemperatur – Delta. Ausschalten, wenn Solltemperatur < Isttemperatur. Zwischen Solltemperatur – Delta und Solltemperatur nichts unternehmen. Sicherstellen, dass das Delta hoch genug ist, um zu viele Kesselstarts zu vermeiden.

## NEU: Wärmebedarfsparameter können während der aktiven Instanz geändert werden
Die Wärmebedarfsparameter Delta / Gewicht für jeden Thermostat können innerhalb von Objekten während der aktiven Instanz geändert werden. Hinweis: Das aktualisierte Gewicht wird nur verwendet, wenn ein neuer Wärmebedarf gefunden wird. Die Wärmebedarfsparameter Gewicht ein / Gewicht aus für jeden Heizkreis können innerhalb von Objekten während der aktiven Instanz geändert werden.

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
* changes for ems-esp firmware 3.7.0 
* introduce warnings in log for using ems-esp dev firmware

### 3.3.0 (2024-04-20)
* introduce a new check for ems-esp gateway formatting settings for boolean and enum values
* stop ems-esp polling if wrong settings are detected !

### 3.2.1 (2024-04-17)
* update release script

### 3.2.0 (2024-04-17)
* change for ems-esp firmware 3.7 - add dhw tag

### 3.1.1 (2024-04-11)
* update dependencies and release  script

### 3.1.0 (2024-04-07)
* Update km200 gateway encryption test for wrong passwords
* avoid json error on adapter start for field /gateway/firmware

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