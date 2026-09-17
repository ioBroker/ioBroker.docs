---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.goodwe/README.md
title: ioBroker.goodwe
hash: FYcQ9wobDD5kVjFDFSP8CmBTxNtGqNGVRjWI3bcqAOI=
---
![Logo](../../../en/adapterref/iobroker.goodwe/admin/goodwe.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.goodwe.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.goodwe.svg)
![Anzahl der Installationen](https://iobroker.live/badges/goodwe-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/goodwe-stable.svg)
![NPM](https://nodei.co/npm/iobroker.goodwe.png?downloads=true)
![Test und Freigabe](https://github.com/typhosj/ioBroker.goodwe/workflows/Test%20and%20Release/badge.svg)

# ioBroker.goodwe

## goodwe-Adapter für ioBroker

Kommunikation mit GoodWe Wechselrichtern der Serien ET/EH/BH/BT

Hersteller: [GoodWe](https://www.goodwe.com/)

Dieser Adapter basiert auf der Originalarbeit von Thomas Schönberger.

## Anforderungen

- Node.js 22 oder neuer
- js-controller 6.0.11 oder neuer
- Admin 7.8.23 oder neuer

## Unterstützte Daten

Der Adapter liest die Registerblöcke des GoodWe EMS Modbus-Protokolls v1.7 für ET/EH/BH/BT-Geräte:

- Geräteinformationen, einschließlich optionaler SIMCCID
- Laufende Daten
- Externe Kommunikation und erweiterte Zählerdaten
- Flash-Informationen
- BMS-Informationen und detaillierte BMS-Informationen
- CEI-Autotestinformationen
- Informationen zur Leistungsgrenze
- Batterie- und EMS-Einstellungen, einschließlich der Netzexportgrenze und des EMS-Modus

Rohregisterwerte werden als ioBroker-Zustände gespeichert. Moduswerte sind numerische Zustände mit ioBroker-Enumerationsbezeichnungen. Wichtige Bitfelder werden zusätzlich als dekodierte Textzustände bereitgestellt, beispielsweise aktive Wechselrichterfehler, Diagnosestatus, BMS-Alarme und DRM-Status.

## Wichtige Staaten

| Bundesstaat                                                                                      | Beschreibung                                                                                                                                   |
| ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `DeviceInfo.*`                                                                                   | Wechselrichterprotokoll, Nennleistung, Seriennummer, Gerätetyp und Firmware-Daten                                                              |
| `RunningData.PV1.*`... `RunningData.PV4.*`                                                       | PV-Spannung, Stromstärke, Leistung und Betriebsart                                                                                             |
| `RunningData.GridL1.*`... `RunningData.GridL3.*`                                                 | Netzspannung, Stromstärke, Frequenz und Leistung                                                                                               |
| `RunningData.BackUpL1.*`... `RunningData.BackUpL3.*`                                             | Ausgangsspannung, -strom, -frequenz, -leistung und -modus der Notstromversorgung                                                               |
| `RunningData.Battery1.*`                                                                         | Batteriespannung, Stromstärke, Leistung und Modus                                                                                              |
| `RunningData.*Energy*`                                                                           | Tages- und Gesamtenergiezähler                                                                                                                 |
| `RunningData.*Mode`, `RunningData.GridMode`, `RunningData.WorkMode`, `RunningData.OperationMode` | Numerische Moduszustände mit ioBroker-Enumerationsbezeichnungen                                                                                |
| `RunningData.ErrorMessageActive`                                                                 | Fehlerbits des aktiven Wechselrichters als Text                                                                                                |
| `RunningData.DiagStatusActive`                                                                   | Aktive Diagnosebits als Text, dekodiert von `RunningData.DiagStatusL`                                                                          |
| `RunningData.DiagStatusH`                                                                        | Höchstwert des Diagnosestatus, der als Rohzahl gespeichert wird, da das GoodWe-Protokoll keine Bits dafür definiert.                           |
| `ExtComData.*`                                                                                   | Smart-Meter- und Kommunikationsdaten                                                                                                           |
| `BMSInfo.*`                                                                                      | BMS-Status, SOC, SOH, Fehler- und Warndaten                                                                                                    |
| `BMSInfo.ErrorCodeActive`                                                                        | Dekodiertes BMS-Alarm-Bitfeld                                                                                                                  |
| `BMSInfo.WarningCodeActive`, `BMSInfo.DRMStatusActive`                                           | Dekodierte BMS-Warnungen und DRM-Bitfelder bei aktiviertem erweitertem BMS-Polling                                                             |
| `FlashInfo.*`                                                                                    | Informationen zur Flash-Version und zur Anzahl der Schreibvorgänge, sofern diese Option aktiviert ist und vom Wechselrichter unterstützt wird. |
| `BMSDetail.*`                                                                                    | Detaillierte BMS-Werte, sofern aktiviert und vom Wechselrichter unterstützt.                                                                   |
| `CEIAutoTest.*`                                                                                  | CEI-Autotestwerte, sofern vom Wechselrichter unterstützt                                                                                       |
| `PowerLimit.*`                                                                                   | Leistungsbegrenzungs- und -verteilungswerte, sofern aktiviert und vom Wechselrichter unterstützt.                                              |
| `Settings.Battery.*`                                                                             | Batteriekapazität, Modulanzahl, Lade- und Entladegrenzen und Entladetiefe                                                                      |
| `Settings.GridExportEnabled`, `Settings.GridExportLimit`                                         | Netzexport-Grenzschalter und Wert                                                                                                              |
| `Settings.EmsMode`, `Settings.EmsPowerLimit`                                                     | EMS-Modus und die Leistung, mit der der EMS-Modus arbeitet                                                                                     |

## Konfiguration

- `ipAddr` IP-Adresse des Wechselrichters. Bei Neuinstallationen leer. Der Adapter prüft beim Start, ob es sich um eine gültige IPv4-Hostadresse handelt.
- `discoverySubnet` Optional `/24` Subnetz für die Netzwerkermittlung, zum Beispiel `192.168.178.0/24` Die
- `pollCycle`: Sekunden zwischen zwei Lesevorgängen der Live-Daten (`RunningData`, `ExtComData`, `BMSInfo`) und die Einstellungen (`Settings.*`), von 2 bis 3600. Die anderen optionalen Registergruppen folgen diesem Zyklus nicht: Sie teilen sich einen Slot, der etwa alle 30 Sekunden im Round-Robin-Verfahren bedient wird, und `DeviceInfo` wird einmal pro Verbindung gelesen.
- `timeoutMs`: Timeout für UDP-Anfragen in Millisekunden, von 1000 bis 30000.
- `retries`: Anzahl der Wiederholungsversuche pro UDP-Anfrage, von 0 bis 5.
- `pollExtended`: Hauptschalter für optionale Registergruppen. `DeviceInfo`, `RunningData`, `ExtComData` Und `BMSInfo` werden immer gelesen.
- `pollSimccid`: Aktiviert die optionale SIMCCID-Abfrage.
- `pollExtendedMeter`: Aktiviert erweiterte Zählerregister.
- `pollFlashInfo`: Aktiviert Flash-Informationsregister.
- `pollBmsExtended`: Aktiviert erweiterte BMS-Informationsregister.
- `pollBmsDetail`: Aktiviert BMS-Detailregister, sofern vom Wechselrichter unterstützt.
- `pollCeiAutoTest`: Aktiviert die automatischen Testregister von CEI.
- `pollPowerLimit`: Aktiviert Leistungsbegrenzungsregister, sofern vom Wechselrichter unterstützt.
- `pollSettings`: Aktiviert die Batterie- und EMS-Einstellungsregister.
- `enableControl`: Ermöglicht das Beschreiben der EMS- und Grid-Exportzustände (siehe unten). Standardmäßig deaktiviert.

Die Seite mit den Grundeinstellungen bietet außerdem Suchhilfen:

- `Inverter IP` Speichert nur die IPv4-Adresse des Wechselrichters.
- `Validate inverter IP`: Überprüft die konfigurierte Adresse und sendet die GoodWe-ID-Anfrage an den UDP-Port 8899.
- `Discover inverters` Durchsucht die konfigurierte `/24` Subnetz für GoodWe-Geräte auf UDP-Port 8899 und zeigt gefundene Wechselrichter mit IP-Adresse, Modellname, Seriennummer und Versionsinformationen an, sofern diese vom Wechselrichter bereitgestellt werden.

## Wechselrichtersteuerung

Mit `enableControl` Im eingeschalteten Zustand werden vier Zustände beschreibbar und als einzelne Registerschreibvorgänge an den Inverter gesendet. Alle anderen Zustände bleiben schreibgeschützt.

| Zustand                      | Registrieren | Reichweite | Beschreibung                                                    |
| ---------------------------- | ------------ | ---------- | --------------------------------------------------------------- |
| `Settings.GridExportEnabled` | 47509        | 0-1        | Schaltet die Netzexportbegrenzung ein oder aus                  |
| `Settings.GridExportLimit`   | 47510        | 0-30000 W  | Maximale in das Netz eingespeiste Leistung                      |
| `Settings.EmsMode`           | 47511        | 1-12       | EMS-Modus, zum Beispiel 1 Auto, 11 Akku laden, 12 Akku entladen |
| `Settings.EmsPowerLimit`     | 47512        | 0-30000 W  | Der ausgewählte EMS-Modus funktioniert mit                      |

`GridExportLimit` Und `EmsPowerLimit` Klemmwerte außerhalb ihres Bereichs. `GridExportEnabled` Und `EmsMode` Es handelt sich um Enumerationsregister, die nur die oben aufgeführten Werte akzeptieren. Werte außerhalb dieser Liste werden abgelehnt, anstatt sie in einen unerwünschten Modus zu zwingen. Zahlen, die beispielsweise als einfacher Dezimaltext geschrieben werden, werden ebenfalls akzeptiert. `"500"` aus einem Eingabefeld werden akzeptiert, `GridExportEnabled` nimmt auch `true` Und `false` Alle anderen Werte werden abgelehnt. Die Zustände sind Zahlen, daher protokolliert ioBroker Text- und Boolesche Werte mit einer Infozeile im Log des Adapters, der sie geschrieben hat. Nach einem abgelehnten Wert und nach jedem Schreibvorgang wird die Registergruppe ausgelesen, sodass die Zustände anzeigen, was der Inverter tatsächlich gespeichert hat.

Ein Schreibvorgang, während der Wechselrichter offline ist, wird ohne Datenübertragung abgelehnt, da jede Anfrage lediglich ihr Timeout abwarten würde. Die erste Abfrage nach der Wiederverbindung speichert den vom Wechselrichter gespeicherten Wert im Status.

Vor einem Schreibvorgang liest der Adapter die Registergruppe und überspringt den Schreibvorgang, wenn der Wechselrichter den Wert bereits enthält. Ein Skript, das denselben Sollwert in jedem Zyklus wiederholt, sendet daher nicht jedes Mal einen Registerschreibvorgang.

Umschalten `enableControl` Die EMS-Einstellungsregister werden auch dann abgefragt, wenn `pollSettings` oder `pollExtended` Diese Option ist deaktiviert, da die beschreibbaren Zustände vorhanden sein und ausgelesen werden müssen. Im Gegensatz zu den anderen optionalen Gruppen führt ein fehlgeschlagener Lesevorgang bei dieser Gruppe nicht zu einer einstündigen Unterbrechung; der Vorgang wird im nächsten Abfragezyklus erneut versucht.

Die Einstellungen werden bei jedem Abstimmungszyklus neu ausgelesen, sodass eine Änderung, die an anderer Stelle vorgenommen wird, beispielsweise in der GoodWe-App, in den Staaten innerhalb eines Wahlzyklus sichtbar wird. `pollCycle` Die

GoodWe dokumentiert seine beschreibbaren Register nicht. Die Steuerung ist standardmäßig deaktiviert, und die Aktivierung erfolgt auf eigenes Risiko: Ein falscher Wert verändert die Wechselrichtereinstellungen, die der Adapter nicht wiederherstellen kann. Lassen Sie die Steuerung deaktiviert, wenn Sie nur Daten lesen möchten.

## Fehlerbehebung

Optionale Registergruppen hängen vom Wechselrichtermodell, der Firmware und der angeschlossenen Hardware ab. Wird eine Gruppe nicht unterstützt, pausiert der Adapter diese nach einem fehlgeschlagenen Lesevorgang für eine Stunde und hält die Hauptverbindung aktiv. Eine Wiederherstellung der Verbindung nach einem Verbindungsverlust beendet die Pause, sodass eine Gruppe, deren Lesevorgang nur aufgrund der Abwesenheit des Wechselrichters fehlgeschlagen ist, sofort wieder gelesen wird.

Bekannte modellabhängige Gruppen:

- `pollBmsDetail`: wird oft nicht unterstützt, es sei denn, das BMS stellt Detailregister bereit.
- `pollPowerLimit` Wird häufig nicht unterstützt auf Geräten, die keine Telemetriedaten zur Leistungsbegrenzung bereitstellen.
- `pollCeiAutoTest`: kann Werte für Geräte/Firmware bereitstellen, die CEI-Autotestdaten unterstützen.

Falls in den Protokollen optionale Register-Timeouts angezeigt werden, deaktivieren Sie die entsprechende Gruppe in den erweiterten Einstellungen. Deaktivierte optionale Registerzustände werden beim Start des Adapters entfernt.

Bei instabilen Netzwerkverbindungen `timeoutMs` niedrig und erhöhen `retries` Stattdessen beantwortet der Wechselrichter eine erfolgreiche Anfrage innerhalb von Millisekunden. Ein langes Timeout führt daher nicht dazu, dass ein verlorenes Paket ankommt – es blockiert lediglich die Anfragewarteschlange bis zu deren Ablauf. Ein Wert um 2000 mit zwei Wiederholungsversuchen stellt eine verlorene Antwort innerhalb von zwei Sekunden wieder her, anstatt ein zehnsekündiges Timeout abzuwarten.

Wiederkehrend `retry` Meldungen auf Debug-Ebene bedeuten, dass einzelne UDP-Antworten verloren gehen. Je größer die Registergruppe, desto häufiger ist sie betroffen, beispielsweise eine Gruppe wie `RunningData` Das erste Signal erscheint. Wenn sie sich jede Minute zur gleichen Sekunde häufen, ist periodisch etwas außerhalb des Adapters auf dem Wechselrichter ausgelastet – üblicherweise der Cloud-Upload des WLAN-Moduls. Solange kein `timed out` Nach einer Warnung konnte die Anfrage beim erneuten Versuch erfolgreich abgeschlossen werden, ohne dass Daten verloren gingen. Durch die Verkabelung des Wechselrichters mit LAN anstelle von WLAN wird die Ursache behoben; die Deaktivierung optionaler Registergruppen reduziert die Anzahl der möglichen Anfragen.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.2.0 (2026-09-14)
- Added the battery settings (registers 45350-45358) and the EMS settings (registers 47509-47512) as new `Settings.*` states, enabled with the new `pollSettings` option and read on every poll cycle.
- Added optional inverter control: with the new `enableControl` option the states `Settings.EmsMode`, `Settings.EmsPowerLimit`, `Settings.GridExportEnabled` and `Settings.GridExportLimit` become writable and are sent to the inverter as single register writes. Only these four registers are ever written: limit values are clamped to the range the adapter allows, mode values outside the list in this README are refused, numbers written as text are accepted, a write while the inverter is offline is refused, a value the inverter already holds is not written again, and the register group is read back after every write. While control is on, the EMS settings stay polled whatever `pollSettings` and `pollExtended` say. Control is off by default.
- Fixed optional register groups pausing for an hour after a connection loss. A group whose read failed only because the inverter was gone is read again right after the reconnect, and a poll cycle whose live data got no answer stops there instead of running the remaining reads into their timeouts as well.
- Fixed UDP answers being discarded when the inverter pads them into a larger datagram (the 257 byte running data frame arrives in 1024 bytes). The frame check read the checksum from the end of the datagram, so every padded answer ran into a timeout and a retry. On a live inverter the running data retries dropped from 1.57 % to 0.46 %.
- The network discovery scans at most four subnets, starting with the one of the configured inverter address. Container bridges and VPN adapters no longer turn a scan into thousands of probes.
- A register the inverter rejects is reported as a Modbus exception right away instead of running into the full timeout of every retry.
- Reworked the poll cycle to cut the UDP traffic to the inverter. `pollCycle` now means the interval of the live data (`RunningData`, `ExtComData`, `BMSInfo`) and accepts values from 2 seconds, where it started at 10 before. The optional register groups other than the settings no longer run all at once every cycle but share one slot that is served round robin roughly every 30 seconds, and the static `DeviceInfo` is read once per connection instead of every cycle. With the default settings this is 32 register requests per minute instead of 54, and every request that is not sent is one whose answer cannot get lost. The small `BMSInfo` read now goes first in every cycle, because the first request after the idle gap loses the most answers.

### 1.1.3 (2026-08-28)
- Fixed the adapter crashing with `Cannot read properties of undefined (reading 'debug')`: the logger is now read when it is used instead of being captured before the adapter assigned it.
- Fixed the adapter staying offline after a single lost UDP answer. The socket is rebound after a timeout, so a late answer can no longer be mistaken for the answer of the next register group.
- The first failed reconnect is logged as a warning again, so an adapter that turned yellow no longer stays silent.

### 1.1.2 (2026-08-27)
- Fixed unsigned 32 bit registers being reported as negative values (for example `RunningData.DiagStatusL` and `RunningData.ErrorMessage`).
- Boolean options are normalized at adapter start, so a string typed switch no longer disables an optional register group and deletes its states.
- Discarded late UDP answers after a timeout; they could be parsed as the answer of the next register group with the same length.
- Blocked state writes after `onUnload()` and moved the last direct state write out of the scheduler.
- Added an exponential backoff for reconnect attempts while the inverter is offline and reduced the repeated warnings to debug.
- Clamped probe timeouts coming from admin messages.
- Enabled TypeScript `strict` mode.

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