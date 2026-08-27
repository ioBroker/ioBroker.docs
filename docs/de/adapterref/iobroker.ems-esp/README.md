---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ems-esp/README.md
title: ioBroker.ems-esp
hash: lKGiezjOoJXiCCR7Lh7hs3Om8sJBs/GZ76i6tRg04/s=
---
![Logo](../../../en/adapterref/iobroker.ems-esp/admin/ems-esp.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.ems-esp.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ems-esp.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/ems-esp-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/ems-esp-stable.svg)
![NPM](https://nodei.co/npm/iobroker.ems-esp.png?downloads=true)

# IoBroker.ems-esp
**Tests:** ![Test und Freigabe](https://github.com/tp1de/ioBroker.ems-esp/workflows/Test%20and%20Release/badge.svg)

## Bosch / Buderus Heizsysteme mit km200 / IP-inside und/oder ems-esp Schnittstelle
Der Adapter unterstützt eine Schnittstelle zu Heizsystemen der Bosch-Gruppe über den EMS- oder EMS+-Bus.

(Bosch / Buderus / Junkers / Netfit etc.)

Der Adapter kann über API-Aufrufe mit dem Heizsystem kommunizieren. Unterstützte Gateways sind:
* km200, km200 hrv, km100, km50, HMC300 oder IP-inside (von der Bosch-Gruppe)

* ems-esp gateway (https://github.com/emsesp/EMS-ESP32) mit dem ESP32-Chip.

Der Adapter wurde mit dem EMS-ESP-Gateway und der neuesten stabilen Firmware-Version getestet. Neuere Entwicklerversionen der Firmware funktionieren möglicherweise nicht stabil mit dem ioBroker-Adapter. Die Verwendung erfolgt auf eigene Gefahr.

BITTE BEACHTEN SIE DIE REGELMÄSSIGEN ÄNDERUNGEN DER EMS_ESP-FIRMWARE – DER ioBroker-Adapter FUNKTIONIERT MÖGLICHERWEISE NICHT MIT DIESER FIRMWARE!

* Die neuen Cloud-Gateways der Bosch-Gruppe (MX300 / EasyControl ...) werden nicht unterstützt, da sie keine LAN-API unterstützen!

Der ioBroker ems-esp-Adapter kann Daten von beiden Gateways lesen und schreiben, um alle Heizungskomponenten zu steuern.
Er kann entweder für die originalen Bosch-Group-Gateways, für das ems-esp-Gateway oder parallel für beide verwendet werden. Alle Zustandsänderungen, die durch eigene Skripte oder den Objektbrowser vorgenommen werden, müssen mit `acknowledged = false` bestätigt werden.

Deutsche Dokumentation: https://github.com/tp1de/ioBroker.ems-esp/blob/main/doc/ems-esp-ds.pdf

Englische Dokumentation: https://github.com/tp1de/ioBroker.ems-esp/blob/main/doc/ems-esp-es.pdf

Deutsches ioBroker-Forum: https://forum.iobroker.net/topic/45862/neuer-adapter-ems-esp-f%C3%BCr-bosch-heizungen

* Die Adapterversion >= 7.0.0 unterstützt nur ems-esp Firmware-Versionen >= 7.2.0

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
### **WORK IN PROGRESS**
-->
### 7.0.8 (2026-07-05)
* fixing issues detected by repository checker

### 7.0.7 (2026-06-29)
* dependabot updates
* fixing issues detected by repository checker

### 7.0.6 (2026-06-20)
* dependabot updates 
* fixing errors while restarting adapter

### 7.0.4 (2026-06-20)
* fixing issue on main

### 7.0.3 (2026-05-30)
* dependabot updates
* fixing issues detected by repository checker


[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025-2026 Thomas Petrick (tp1de)

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