---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.solinteg/README.md
title: ioBroker.soliteg
hash: fTwpLOF+Trn4oDu/ks6Ggx7bnWgwS8bcrKGh/svYG4E=
---
![Logo](../../../en/adapterref/iobroker.solinteg/admin/solinteg.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.solinteg.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.solinteg.svg)
![Test und Freigabe](https://github.com/bueste/ioBroker.solinteg/actions/workflows/test-and-release.yml/badge.svg)

# ioBroker.soliteg

Liest PV-, Netz-/Zähler- und Batteriedaten von **Solinteg-Hybridwechselrichtern** mit angeschlossener Batterie über **lokales Modbus TCP** . Kein Cloud-Konto, kein Internetzugang erforderlich.

## Haftungsausschluss

Solinteg, Dyness, Wattsonic und M-TEC sind Marken ihrer jeweiligen Inhaber. Dieser Adapter wird unabhängig von der Community gepflegt und von keinem der genannten Unternehmen entwickelt, empfohlen oder unterstützt. Das Solinteg-Logo wird mit Genehmigung verwendet.

## Inhaltsverzeichnis

- [Warum dieser Adapter?](#why-this-adapter)
- [Kompatibilität](#compatibility)
- [Registerquelle und -beschränkungen (bitte lesen)](#register-source-and-limitations-please-read)
- [Installation](#installation)
- [Konfiguration](#configuration)
- [Objekt-/Zustandsstruktur](#objectstate-structure)
- [EMS-Schreibzugriff (Steuerung des Wechselrichters/der Batterie)](#ems-write-access-controlling-the-inverterbattery)
- [Umfragen und effiziente Lesevorgänge](#polling-and-efficient-reads)
- [Fehlerbehebung / Häufig gestellte Fragen](#troubleshooting--faq)
- [Sicherheit und Datenschutz](#security--privacy)
- [Entwicklung](#development)
- [Änderungsprotokoll](#changelog)
- [Lizenz](#license)

## Warum dieser Adapter?

Hersteller- und Geräteinformationen: [Solinteg](https://www.solinteg.com) (Hybrid-Wechselrichter und Batteriespeichersysteme).

ioBroker bietet keine generische „Solinteg“-Unterstützung. Das Solinteg WR verwendet offen dokumentiertes Modbus TCP, sodass es prinzipiell mit dem generischen ausgelesen werden könnte. `ioBroker.modbus` Der Adapter und eine manuell eingegebene Registerliste bedeuten jedoch, dass über 50 Register manuell in der Admin-Oberfläche neu eingegeben werden müssen, ohne dass die Skalierung, Datentypen oder Objektstruktur über den Code gesteuert werden können. Dieser Adapter kommuniziert stattdessen direkt mit Modbus TCP (über `modbus-serial`), genauso wie [ioBroker.zeptrion](https://github.com/bueste/ioBroker.zeptrion) , [ioBroker.goodwe-sems](https://github.com/bueste/ioBroker.goodwe-sems) und [ioBroker.husqvarna-automower-connect](https://github.com/bueste/ioBroker.husqvarna-automower-connect) jeweils direkt mit ihrer jeweiligen Geräte-/Cloud-API kommunizieren und so die volle Kontrolle über Registerzuordnung, Skalierung und den resultierenden Objektbaum ermöglichen – plus die Option, den Wechselrichter/die Batterie aktiv zu steuern (EMS-Schreibzugriff, standardmäßig deaktiviert).

## Kompatibilität

Dieser Adapter ist für **die INTEG-M Modbus-Registerfamilie** von Solinteg vorgesehen, die von folgenden Systemen gemeinsam genutzt wird:

- Solinteg MHT-Serie Hybrid-Wechselrichter (entwickelt und getestet gegen **MHT-25\~50K-100** , 25-50 kW dreiphasig)
- Umbenannte Produkte derselben Hardware-/Registerfamilie: **Wattsonic-** und **M-TEC Energy Butler-** Wechselrichter (gemäß der unten stehenden Referenzimplementierung – nicht unabhängig vom Autor dieses Adapters bestätigt)

Die Batterieunterstützung ist generisch: Der Adapter liest die vom Wechselrichter über Modbus gemeldeten Batteriedaten (Ladezustand/Gesamtzustand/Spannung/Stromstärke/Leistung, minimale/maximale Zellspannung) unabhängig vom Batteriehersteller – er kommuniziert nicht direkt mit der Batterie. Getestet und entwickelt wurde dies mit einer **Dyness STACK100** (51,2 kWh, angeschlossen an den Wechselrichter über CAN/RS485), aber jede vom Wechselrichter unterstützte Batterie sollte auf die gleiche Weise funktionieren.

Falls Ihr Gerät die gleiche Registerfamilie verwendet, aber hier nicht aufgeführt ist, öffnen Sie bitte ein Issue oder einen Pull Request – Ziel ist es, das gesamte Solinteg/INTEG-M-Ökosystem abzudecken, nicht nur eine bestimmte Kombination aus Wechselrichter und Batterie.

## Registerquelle und -beschränkungen (bitte lesen)

Adressen registrieren in[`lib/registers.js`](https://github.com/bueste/ioBroker.solinteg/blob/main/lib/registers.js) stammen aus der offiziellen Solinteg Modbus TCP-Protokolldokumentation und wurden gegengeprüft[`wills106/homeassistant-solax-modbus`](https://github.com/wills106/homeassistant-solax-modbus) (`custom_components/solax_modbus/plugin_solinteg.py`), welche die identische INTEG-M-Registerfamilie dokumentiert, die auch von den Rebrands Wattsonic und M-TEC Energy Butler verwendet wird.

**Verifiziert am 05.10.2026 mit einem realen MHT-25\~50K-100 (Geräte-ID 255, Dyness STACK100-Batterie):** Alle Register der Kennlinie, die 32-Bit-Wortreihenfolge (höchstwertiges Wort zuerst) und alle Skalen werden durch plausible Werte bestätigt (z. B. Netzleistung -3601 W gegenüber Batterieleistung -3600 W). Die PV-Register konnten noch nicht im realen Produktionsbetrieb geprüft werden (zum Zeitpunkt der Prüfung war keine PV-Anlage angeschlossen). Die EMS-Steuerregister (`50xxx` /`52xxx` Block) korrekt zurückgelesen, aber ihre Wirkung beim Schreiben wurde nicht getestet - überprüfen Sie dies sorgfältig, bevor Sie [den EMS-Schreibzugriff](#ems-write-access-controlling-the-inverterbattery) aktivieren.

Detaillierte Informationen auf Zellenebene der Dyness-Batterie, die über die minimale/maximale Zellspannung (16 einzelne Zellspannungen pro Modul) hinausgehen, sind über Modbus am Wechselrichter **nicht** verfügbar – dort werden nur die minimale/maximale Zellspannung und die zugehörigen Zell-IDs angezeigt. Vollständige Details pro Zelle erfordern die separate Dyness Cloud API/MQTT (`ems.dyness.com` Developer Center), das dieser Adapter nicht implementiert.

## Installation

Sobald dieser Adapter im offiziellen ioBroker-Adapter-Repository aufgeführt ist, installieren Sie ihn auf die übliche Weise: **Admin -> Adapter -> Suche nach "solinteg" -> installieren** .

Bis dahin kann ein ioBroker-Administrator es manuell auf dem ioBroker-Host hinzufügen:

```
iobroker url iobroker.solinteg
```

## Konfiguration

| Tab           | Einstellung                    | Beschreibung                                                                                              |
| ------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------- |
| Verbindung    | Host / IP-Adresse              | IP-Adresse oder Hostname des Wechselrichters (oder Modbus TCP/RTU-Gateway)                                |
| Verbindung    | Hafen                          | Modbus-TCP-Port, üblicherweise 502                                                                        |
| Verbindung    | Geräte-ID                      | Modbus-Geräte-ID, Standardwert 255 (Solinteg MHT-Wechselrichter über Modbus TCP); 0–255 werden akzeptiert |
| Verbindung    | Zeitüberschreitung der Anfrage | Timeout pro Modbus-Anfrage in Sekunden                                                                    |
| Umfragen      | Schnelles Abfrageintervall     | Wie oft werden die Leistungs-/Flusswerte (PV, Netz, Batterie) ausgelesen (Standard: 5 Sekunden)           |
| Umfragen      | Langsames Abfrageintervall     | Wie oft Energiezähler und Diagnosedaten ausgelesen werden (Standard: 30 Sekunden)                         |
| EMS-Steuerung | EMS-Schreibzugriff aktivieren  | Standardmäßig deaktiviert – siehe [EMS-Schreibzugriff](#ems-write-access-controlling-the-inverterbattery) |

## Objekt-/Zustandsstruktur

```
solinteg.0.info.connection                 Inverter reachable (bool)
solinteg.0.info.lastSuccess                Timestamp of the last successful poll
solinteg.0.info.lastError                  Last error message

solinteg.0.info.serialNumber / .firmwareVersion (text, e.g. V10.6.4.4-3.10.13.0)
solinteg.0.diag.inverterStatus / .faultFlags1-3 / .operationFlags / .armFaultFlags1-2
solinteg.0.diag.radiatorTemperature / .temperatureR-T

solinteg.0.pv.string1-4.voltage / .current / .power
solinteg.0.pv.totalPower

solinteg.0.grid.acPower / .frequency
solinteg.0.grid.voltageL1-3 / .currentL1-3

solinteg.0.meter.power / .powerL1-3
solinteg.0.meter.gridImportTotal / .gridExportTotal / .gridImportToday / .gridExportToday
solinteg.0.grid.backupPower

solinteg.0.battery.voltage / .current / .power / .soc / .soh / .temperature
solinteg.0.battery.minCellVoltage / .maxCellVoltage (+ their cell IDs)
solinteg.0.battery.chargeLimit / .dischargeLimit
solinteg.0.battery.chargeToday / .chargeTotal / .dischargeToday / .dischargeTotal
solinteg.0.battery.manufacturer / .ratedCapacity

solinteg.0.energy.pvGenerationToday / .pvGenerationTotal
solinteg.0.energy.acGenerationToday / .acGenerationTotal
solinteg.0.energy.houseConsumptionToday / .houseConsumptionTotal

solinteg.0.ems.*                           EMS control registers, see below
```

Alle PV/Netz/Zähler/Batterie-Leistungsflusszustände werden im schnellen Intervall abgefragt; Energiezähler, Diagnose- und EMS-Register werden im langsamen Intervall abgefragt.

## EMS-Schreibzugriff (Steuerung des Wechselrichters/der Batterie)

Der `ems.*` Die Zustände (Betriebsmodus, Lade-/Entladeleistungsziel, Import-/Exportgrenzen, Batterie-SOC-Schutzgrenzen usw.) werden immer **ausgelesen** , sodass Sie die aktuelle EMS-Konfiguration des Wechselrichters unabhängig von dieser Einstellung einsehen können. **Das Schreiben** auf diese Zustände ist standardmäßig deaktiviert: Jeder Schreibversuch wird protokolliert und ignoriert, bis die Option „EMS-Schreibzugriff aktivieren“ in der Instanzkonfiguration eingeschaltet wird.

Aktivieren Sie diese Option nur, wenn Sie den Wechselrichter/die Batterie aktiv steuern möchten (z. B. Lade-/Entladezeiten planen, Netzeinspeisung). Fehlerhafte Register oder Skalierungen können dazu führen, dass der Wechselrichter in einen unbeabsichtigten Betriebsmodus wechselt – siehe [Registerquellen und -beschränkungen](#register-source-and-limitations-please-read) .

## Umfragen und effiziente Lesevorgänge

[`lib/blocks.js`](https://github.com/bueste/ioBroker.solinteg/blob/main/lib/blocks.js) verschmilzt benachbarte (oder nahezu benachbarte, kleine Lücken aufweisende) Register zu möglichst wenigen `readHoldingRegisters()` Es werden so viele Anfragen wie möglich pro Abfragezyklus gestellt, anstatt eine Modbus-Anfrage pro Register. Register der schnellen und langsamen Gruppe werden unabhängig voneinander blockiert und in ihrem eigenen Intervall abgefragt.

## Fehlerbehebung / Häufig gestellte Fragen

** `info.connection` Aufenthalte `false` / Keine Statusaktualisierung.** Überprüfen Sie die Host-/Port-/Geräte-ID in der Instanzkonfiguration und stellen Sie sicher, dass nichts (Firewall, VLAN-Trennung) den TCP-Port 502 zwischen dem ioBroker-Host und dem Wechselrichter blockiert. `info.lastError` für die eigentliche Fehlermeldung und das Adapterprotokoll (Instanz -> Expertenmodus -> Protokollierungsstufe) `debug`) für den zugrunde liegenden Modbus-Fehler.

**Wie finde ich die IP-Adresse meines Wechselrichters?** Überprüfen Sie die Clientliste Ihres Routers/DHCP-Servers auf den Wechselrichter (er wird oft anhand des MAC-Herstellerpräfixes oder eines Solinteg-bezogenen Hostnamens angezeigt) oder überprüfen Sie die eigene Anzeige/WLAN-Einrichtungs-App des Wechselrichters, falls vorhanden.

**Die Werte sehen völlig falsch aus (riesige Zahlen, negative Werte, wo positive erwartet werden usw.).** Höchstwahrscheinlich handelt es sich um ein/e `u32` /`s32` Es liegt ein Fehler in der Byte-Reihenfolge oder der Skalierung für dieses spezifische Register vor – siehe [Registerquelle und -beschränkungen](#register-source-and-limitations-please-read) . Bitte erstellen Sie ein GitHub-Issue mit dem Rohwert. `info.rawResponse` -Style-Debugging (Debug-Protokollierung aktivieren) oder den tatsächlichen Wert im Vergleich zum erwarteten Wert, damit die Registerzuordnung korrigiert werden kann.

**Kann ich diesen Adapter mit einem Wattsonic- oder M-TEC-Energiewandler verwenden?** Theoretisch ja, [da](#compatibility) diese die gleiche INTEG-M-Registerfamilie verwenden. Dies wurde vom Adapterhersteller jedoch noch nicht unabhängig mit dieser Hardware bestätigt; Feedback (positiv wie negativ) über ein GitHub-Issue ist daher sehr willkommen.

**Es passiert nichts, wenn ich an eine `ems.*` Status.** Der EMS-Schreibzugriff ist standardmäßig deaktiviert – siehe [EMS-Schreibzugriff](#ems-write-access-controlling-the-inverterbattery) . Prüfen Sie das Protokoll auf eine Warnung, die bestätigt, dass der Schreibvorgang ignoriert wurde.

## Sicherheit und Datenschutz

- Der Adapter führt Modbus TCP-Kommunikation mit einem Gerät in Ihrem lokalen Netzwerk durch – kein Cloud-Konto, keine externe API, keine zu speichernden Anmeldeinformationen.
- Der EMS-Schreibzugriff (die einzige Funktionalität, die das Verhalten des Wechselrichters ändern kann) ist standardmäßig deaktiviert und muss explizit aktiviert werden.
- Die geschriebenen Werte werden vor dem Senden auf ihren Wertebereich geprüft und mit den dokumentierten Minimal- und Maximalwerten der einzelnen Register abgeglichen.

## Entwicklung

```
npm install
npm run lint
npm test          # unit tests (lib/registers.js, lib/modbusClient.js, lib/blocks.js) + package consistency check
```

Zusätzlich wird vor jeder Veröffentlichung empfohlen:

```
npx @iobroker/repochecker@latest .
```

Pull-Anfragen sind willkommen, insbesondere um Registeradressen anhand realer Hardware zu überprüfen/korrigieren oder um die Übersetzungen zu verbessern (derzeit sind Englisch und Deutsch vollständig; die anderen 9 Sprachen verwenden englischen Text als Platzhalter).

## Ältere Änderungen

Die Änderungen der Versionen 0.1.3 und älter sind in der Datei CHANGELOG\_OLD.md aufgeführt.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.1.10 (2026-11-02)

- Fix: the writable `ems.*` states were never subscribed, so every write to them was ignored. The adapter now subscribes to `ems.*` on start.
- Polling: each cycle is scheduled with `setTimeout` after the previous one has finished (was `setInterval`), so cycles cannot overlap or pile up when the inverter answers slowly. Reconnects after repeated errors now really wait for the backoff time.
- German label of the Unit ID field.

### 0.1.9 (2026-10-05)

- Type checking: `npm run check` (tsc with JSDoc types, `tsconfig.json`, `adapter-config.d.ts`) now runs in CI; the register map, the Modbus client and the adapter class are typed.
- Fix: a value that is neither a number nor a boolean written to a writable state is rejected with a warning (it would have been written to the register as 0).
- Older changelog entries moved to `CHANGELOG_OLD.md`.

### 0.1.8 (2026-10-05)

- Fix: the object tree now contains a channel object for every path segment (`pv.string1` to `pv.string4` were missing, reported by the ioBroker object structure check, E3009).

### 0.1.7 (2026-10-05)

- README: link to the manufacturer website (requirement of the ioBroker repository).

### 0.1.6 (2026-10-05)

- Preparation for the ioBroker repository: translations of the admin texts and of the metadata (title, description, news) in all languages, square 512x512 icon, `common.tier`, updated dependencies (`@iobroker/testing` 6, release-script 5, adapter-core 3.4.3), prettier configuration, Dependabot configuration.

### 0.1.5 (2026-10-05)

- Fix: a register that currently holds its "no value" marker (the off-grid command register reads 0xFFFF when no command is pending) now clears its state instead of keeping a stale value (`ems.offGridSwitch` kept showing `true`).

### 0.1.4 (2026-10-05)

- Fix: states created by an earlier version keep their old `common.min`/`common.max`, which still caused a warning at every start for values the inverter reports outside the write range. The adapter now removes these limits from existing states at startup.

## License

MIT License

Copyright (c) 2026 Stefan Bühler <iobroker@mailcarrier.ch>

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