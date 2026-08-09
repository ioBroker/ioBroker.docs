---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.goodwe/README.md
title: ioBroker.goodwe
hash: /Po4GEOVH/rzHvbBKetrxMElMBoTB6lSL7FxVMei9nY=
---
![Logo](../../../en/adapterref/iobroker.goodwe/admin/goodwe.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.goodwe.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.goodwe.svg)
![Anzahl der Installationen](https://iobroker.live/badges/goodwe-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/goodwe-stable.svg)
![NPM](https://nodei.co/npm/iobroker.goodwe.png?downloads=true)

# IoBroker.goodwe
**Tests:** ![Test und Freigabe](https://github.com/typhosj/ioBroker.goodwe/workflows/Test%20and%20Release/badge.svg)

## Goodwe Adapter für ioBroker
Kommunikation mit GoodWe Wechselrichtern der Serien ET/EH/BH/BT

Hersteller: [GoodWe](https://www.goodwe.com/)

Dieser Adapter basiert auf der Originalarbeit von Thomas Schönberger.

## Anforderungen
* Node.js 22 oder neuer
* js-controller 6.0.11 oder neuer
* Admin 7.8.23 oder neuer

## Unterstützte Daten
Der Adapter liest die Registerblöcke des GoodWe EMS Modbus-Protokolls v1.7 für ET/EH/BH/BT-Geräte:

* Geräteinformationen, einschließlich optionaler SIMCCID
* Laufende Daten
* Externe Kommunikations- und erweiterte Zählerdaten
* Flash-Informationen
* BMS-Informationen und detaillierte BMS-Informationen
* CEI-Autotestinformationen
* Informationen zur Leistungsbegrenzung

Rohregisterwerte werden als ioBroker-Zustände gespeichert. Moduswerte sind numerische Zustände mit ioBroker-Enumerationsbezeichnungen. Wichtige Bitfelder werden zusätzlich als dekodierte Textzustände bereitgestellt, beispielsweise aktive Wechselrichterfehler, Diagnosestatus, BMS-Alarme und DRM-Status.

## Wichtige Staaten
| Bundesland/Region | Beschreibung |
| --- | --- |
| `DeviceInfo.*` | Wechselrichterprotokoll, Nennleistung, Seriennummer, Gerätetyp und Firmware-Daten |
| `RunningData.GridL1.*` ... `RunningData.GridL3.*` | Netzspannung, Stromstärke, Frequenz und Leistung |
| `RunningData.BackUpL1.*` ... `RunningData.BackUpL3.*` | Ausgangsspannung, Stromstärke, Frequenz, Leistung und Betriebsart der Notstromversorgung |
| `RunningData.Battery1.*` | Batteriespannung, Stromstärke, Leistung und Modus |
| `RunningData.*Energy*` | Tages- und Gesamtenergiezähler |
| `RunningData.*Mode`, `RunningData.GridMode`, `RunningData.WorkMode`, `RunningData.OperationMode` | Numerische Moduszustände mit ioBroker-Enumerationsbezeichnungen |
| `RunningData.ErrorMessageActive` | Aktive Inverter-Fehlerbits als Text |
| `RunningData.DiagStatusActive` | Aktive Diagnosebits als Text, dekodiert aus `RunningData.DiagStatusL` |
| `RunningData.DiagStatusH` | Höchstwertiges Wort des Diagnosestatus, wird als Rohzahl gespeichert, da das GoodWe-Protokoll dafür keine Bits definiert |
| `ExtComData.*` | Smart-Meter- und Kommunikationsdaten |
| `BMSInfo.*` | BMS-Status, SOC, SOH, Fehler- und Warndaten |
| `BMSInfo.ErrorCodeActive` | Dekodiertes BMS-Alarm-Bitfeld |
| `BMSInfo.WarningCodeActive`, `BMSInfo.DRMStatusActive` | Dekodierte BMS-Warn- und DRM-Bitfelder bei aktiviertem erweitertem BMS-Polling |
| `FlashInfo.*` | Informationen zur Flash-Version und zum Schreibzähler, falls aktiviert und vom Wechselrichter unterstützt |
| `BMSDetail.*` | Detaillierte BMS-Werte, falls aktiviert und vom Wechselrichter unterstützt |
| `CEIAutoTest.*` | CEI-Autotestwerte, falls vom Wechselrichter unterstützt |
| `PowerLimit.*` | Leistungsbegrenzungs- und -verteilungswerte, falls aktiviert und vom Wechselrichter unterstützt |
| `PowerLimit.*` | Leistungsbegrenzungs- und Verteilungswerte, falls aktiviert und vom Wechselrichter unterstützt |

## Konfiguration
* `ipAddr`: IP-Adresse des Wechselrichters.

Bei Neuinstallationen ist dieses Feld leer. Der Adapter prüft beim Start, ob es sich um eine verwendbare IPv4-Hostadresse handelt.

* `discoverySubnet`: Optionales `/24`-Subnetz für die Netzwerkermittlung, zum Beispiel `192.168.178.0/24`.
* `pollCycle`: Basis-Abfragezyklus in Sekunden.
* `timeoutMs`: UDP-Anfrage-Timeout in Millisekunden, von 1000 bis 30000.
* `retries`: Anzahl der Wiederholungsversuche pro UDP-Anfrage, von 0 bis 5.
* `pollExtended`: Master-Schalter für optionale Registergruppen.
* `pollSimccid`: Aktiviert das optionale Abfragen der SIMCCID.
* `pollExtendedMeter`: Aktiviert erweiterte Zählerregister.
* `pollFlashInfo`: Aktiviert Flash-Informationsregister.
* `pollBmsExtended`: Aktiviert erweiterte BMS-Informationsregister.
* `pollBmsDetail`: Aktiviert die BMS-Detailregister, sofern diese vom Wechselrichter unterstützt werden.
* `pollCeiAutoTest`: Aktiviert die automatischen Testregister des CEI.
* `pollPowerLimit`: Aktiviert die Leistungsbegrenzungsregister, sofern vom Wechselrichter unterstützt.

Die Seite mit den Grundeinstellungen bietet außerdem Suchhilfen:

* `Inverter IP`: Speichert nur die IPv4-Adresse des Wechselrichters.
* `Wechselrichter-IP validieren`: Überprüft die konfigurierte Adresse und sendet die GoodWe-ID-Anfrage an den UDP-Port 8899.
* `Wechselrichter suchen`: Durchsucht das konfigurierte `/24`-Subnetz nach GoodWe-Geräten auf dem UDP-Port 8899 und zeigt gefundene Wechselrichter mit IP-Adresse, Modellname, Seriennummer und Versionsinformationen an, sofern diese vom Wechselrichter bereitgestellt werden.

## Fehlerbehebung
Optionale Registergruppen hängen vom Wechselrichtermodell, der Firmware und der angeschlossenen Hardware ab. Wird eine Gruppe nicht unterstützt, überspringt der Adapter sie nach einer Wartezeit und hält die Hauptverbindung aktiv.

Bekannte modellabhängige Gruppen:

* `pollBmsDetail`: wird oft nicht unterstützt, es sei denn, das BMS stellt Detailregister bereit.
* `pollPowerLimit`: wird häufig nicht unterstützt auf Geräten, die keine Telemetriedaten zur Leistungsbegrenzung bereitstellen.
* `pollCeiAutoTest`: Kann Werte für Geräte/Firmware liefern, die CEI-Autotestdaten unterstützen.

Falls in den Protokollen optionale Register-Timeouts angezeigt werden, deaktivieren Sie die entsprechende Gruppe in den erweiterten Einstellungen. Deaktivierte optionale Registerzustände werden beim Start des Adapters entfernt.

Bei instabilen Netzwerkverbindungen erhöhen Sie zuerst `timeoutMs`. Erhöhen Sie `retries` nur dann, wenn der Inverter gelegentlich Pakete verpasst, da Wiederholungsversuche einen Abfragezyklus verlängern.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 1.1.1 (2026-07-16)
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.
- Migrated the admin configuration page to a React based UI and removed the legacy Materialize UI files.
- Added translations for the admin configuration page and documented numeric setting limits.
- Avoided rebuilding the admin bundle during GitHub installs.
- Excluded `CHANGELOG_OLD.md` from the npm package.

### 1.1.0 (2026-06-24)
* Migrated the adapter runtime to TypeScript
* Raised the minimum Node.js version to 22
* Switched the packaged adapter entry point to the compiled `build/main.js`
* Updated CI to run on Node.js 22 and 24 and verify the npm package contents
* Replaced additional mode `*Text` states with enum labels on the numeric mode states

### 1.0.9 (2026-06-23)
* Added validation for usable IPv4 inverter addresses
* Added GoodWe UDP reachability check from the admin configuration
* Added `/24` network discovery for GoodWe inverters via UDP port 8899
* Added discovered inverter selection in the IP address field with model and serial information

### 1.0.8 (2026-06-23)
* Added separate basic and advanced configuration tabs
* Added per-group optional register polling defaults based on real device feedback
* Removed legacy misspelled states and added startup cleanup for them
* Cleaned up legacy hard-coded decoder code in favor of the register map
* Finalized selected state units and roles
* Expanded README with state overview and troubleshooting

### 1.0.7 (2026-06-23)
* Hardened UDP communication with async request handling, timeout and retry support
* Added specification based register map and extended GoodWe register groups
* Added decoded status and bitfield states for inverter, BMS, DRM and diagnostics
* Added adapter options for request timeout, retries and per-group extended register polling
* Added optional cleanup for disabled extended register states
* Added register-map and status-decoding tests

### 1.0.6 (2025-04-02)
* (ty) updated dependencies
* (ty) extended logging

### 1.0.5 (2025-03-14)
* (ty) Fixed EnergyDayDischarge
* (mrx8) fixed memory leak

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2023 Thomas Schönberger <SchoenbergerThomas@freenet.de>  
Copyright (c) 2025-2026 typhosj <typhosj@gmx.de>

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