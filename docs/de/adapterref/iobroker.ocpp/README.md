---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.ocpp.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.ocpp.svg
BADGE-Number of Installations: https://iobroker.live/badges/ocpp-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/ocpp-stable.svg
BADGE-NPM: https://nodei.co/npm/iobroker.ocpp.png?downloads=true
BADGE-Test and Release: https://github.com/iobroker-community-adapters/ioBroker.ocpp/workflows/Test%20and%20Release/badge.svg
---
![Logo](../../admin/ocpp.png)

# ioBroker.ocpp

[![NPM version](https://img.shields.io/npm/v/iobroker.ocpp.svg)](https://www.npmjs.com/package/iobroker.ocpp)
[![Downloads](https://img.shields.io/npm/dm/iobroker.ocpp.svg)](https://www.npmjs.com/package/iobroker.ocpp)
![Number of Installations](https://iobroker.live/badges/ocpp-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/ocpp-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.ocpp.png?downloads=true)](https://nodei.co/npm/iobroker.ocpp/)

**Tests:** ![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.ocpp/workflows/Test%20and%20Release/badge.svg)

## Haftungsausschluss (Disclaimer)

Die Entwickler dieses Moduls werden in keiner Weise von der Open Charge Alliance oder verbundenen Unternehmen unterstützt und stehen in keiner offiziellen Verbindung zu deren Marken oder Logos.

## OCPP-Adapter für ioBroker

Adapter zur lokalen Einbindung und Steuerung von OCPP 1.6-J kompatiblen Wallboxen und Ladestationen über einen lokalen WebSocket-Server.

## Dokumentation

- 🇺🇸 [Documentation](https://github.com/iobroker-community-adapters/ioBroker.ocpp/blob/main/docs/en/README.md)
- 🇩🇪 [Dokumentation](/#/adapters/ocpp)

## Konfiguration

- **Server-Port:** TCP-Port, auf dem der OCPP-WebSocket-Server lauscht (Standard: `9220`). In der Wallbox wird als OCPP-Backend-URL `ws://<iobroker-ip>:9220/<Wallbox-ID>` eingetragen.
- **Führenden Schrägstrich (`/`) aus Wallbox-IDs entfernen (`stripLeadingSlash`):** Für Neuinstallationen oder Node-RED-Kompatibilität aktivieren, damit Geräte-Objekte als `ocpp.0.EVB-P123456` statt `ocpp.0./EVB-P123456` (bzw. `ocpp.0.http://192_168_178_80:9220/EVB-P123456` bei Wallboxen wie EVBox, die beim Handshake eine komplette URL senden) angelegt werden. Bei Bestandsinstallationen deaktiviert lassen, um bestehende Objekt-IDs beizubehalten.
- **Authentifizierung:** Optionale HTTP Basic-Authentifizierung (`username` und `password`) beim WebSocket-Verbindungsaufbau.

## Smart Charging & PV-Überschussladen

- **Voraussetzungen & Wallbox-Kompatibilität:**
    - Die dynamische Ladestromregelung über `chargeLimit` setzt voraus, dass die Wallbox das optionale OCPP 1.6 **SmartCharging**-Profil unterstützt (wird von den allermeisten modernen Wallboxen wie EVBox, ABL, Alfen, Easee, Heidelberg, Mennekes, Webasto etc. unterstützt).
    - Der Adapter prüft beim Verbindungsaufbau automatisch die `SupportedFeatureProfiles` der Station. Unterstützt eine Wallbox kein `SmartCharging`, werden die `chargeLimit`-Datenpunkte automatisch ausgeblendet. (Bei solchen Stationen kann der Strom oft alternativ über herstellerspezifische Parameter unter `configuration.<key>` gesteuert werden, z. B. `evb_MaximumStationCurrent` bei EVBox).
- **Dynamische Regelung während des Ladevorgangs:**
    - Wird `chargeLimit` während eines laufenden Ladevorgangs geändert, sendet der Adapter ein normgerechtes OCPP `SetChargingProfile` (`chargingProfilePurpose: 'TxProfile'`) direkt an die aktive `transactionId`.
    - Die Wallbox passt das PWM-Tastverhältnis auf dem Control-Pilot-Pin (`CP`) im Typ-2-Kabel im laufenden Betrieb an (z. B. 10 % bei 6 A, ~26,7 % bei 16 A), ohne dass Relais klacken oder der Ladevorgang unterbrochen wird.
    - Der Onboard-Lader des Fahrzeugs regelt die Stromaufnahme normgemäß (IEC 61851) innerhalb von 1 bis 5 Sekunden stufenlos hoch oder herunter.
- **Aufheben von Begrenzungen (`null`):**
    - Ein Setzen von `chargeLimit` auf `null` (oder `0`) sendet `ClearChargingProfile` an die Wallbox, um aktive Drosselungen aufzuheben.
- **Herstellerspezifische Alternative (`configuration.evb_MaximumStationCurrent` bei EVBox):**
    - Während `chargeLimit` der universelle, herstellerübergreifende OCPP-Standard ist, bieten viele intelligente Wallboxen herstellerspezifische Konfigurationsparameter wie `configuration.evb_MaximumStationCurrent` (EVBox Elvi/BusinessLine).
    - **Warum dieser Datenpunkt bei EVBox-Stationen oft vorzuziehen ist:**
        1. **Dauerhafte Speicherung (Persistenz):** Der Wert wird im internen Flash/EEPROM der Station gespeichert. Selbst nach Stromausfällen, Wallbox-Reboots oder ioBroker-Neustarts bleibt das eingestellte Stromlimit sicher erhalten (wichtiger Ausfallschutz für den Hausanschluss).
        2. **Feinere Regelung (Dezi-Ampere):** Viele Wallboxen rechnen intern in Dezi-Ampere (dA): z. B. `65` (6,5 A), `72` (7,2 A) oder `80` (8,0 A). Die PV-Überschussregelung kann damit in feinen ~100–200-W-Schritten butterweich dem Sonnenverlauf folgen, statt in groben 1-A-Sprüngen (~690 W bei 3 Phasen).
        3. **Unterbrechungsfrei ohne Reboot:** Die EVBox übernimmt den Wert sofort (`Accepted`) und passt das PWM-Signal innerhalb von 1–3 Sekunden im laufenden Ladevorgang an – **ohne jeden Neustart**.
- **Empfohlene Einheit (`chargeLimitType`):**
    - Es wird dringend empfohlen, `chargeLimitType` auf `A` (Ampere) zu belassen.
    > **Hinweis zur IEC 61851 Mindeststromstärke:** Nach der Typ-2-Norm (IEC 61851) beträgt der minimale AC-Ladestrom **6 A**.
    >
    > - 1-phasig mindestens: ~1.380 W (230 V x 6 A)
    > - 3-phasig mindestens: ~4.140 W (3 x 230 V x 6 A)
    >
    > Wird `chargeLimitType` auf `W` gestellt und ein Wert unterhalb dieser Mindestleistung eingetragen (z. B. 1000 W), sinkt der rechnerische Strom unter 6 A. Viele Wallboxen weisen das Ladeprofil dann mit `Rejected` ab oder brechen den Ladevorgang ab.

## Änderungsprotokoll (Changelog)

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 1.0.0 (2026-11-09)

* (meistermopper) Repochecker-Warnungen behoben: nogit, info.connection-Rolle und ungenutzte Deps (#117)
* (meistermopper) Workflow-Concurrency und Timer-Wrapper an Repochecker angepasst (#121)
* (meistermopper) TxProfile-Schema korrigiert und ClearChargingProfile bei null chargeLimit ergänzt

### 1.0.0-alpha.4 (2026-11-09)

- (meistermopper) Migration auf ESLint 9 und @iobroker/eslint-config (#33)
- (meistermopper) Veraltetes `@ampeco/ocpp-eliftech` durch nativen TypeScript OCPP 1.6J Server ersetzt
- (meistermopper) Fehler behoben, durch den SmartCharging bei `GetConfigurationMaxKeys` gelöscht wurde (#65)
- (meistermopper) `TxProfile` für `RemoteStartTransaction` genutzt und `transactionId` verwaltet (#24, #65)
- (meistermopper) Zombie-Sockets bei Reconnect verhindert (#20) und ausgehende OCPP-Kommandos serialisiert
- (meistermopper) Unterstützung für `DiagnosticsStatusNotification` und `FirmwareStatusNotification` (#32)
- (meistermopper) Option `stripLeadingSlash` sowie responsive `jsonConfig` mit i18n ergänzt (#30, #60)

### 1.0.0-alpha.3 (2026-11-08)

- (mcm1957) Adapter wurde in die iobroker-community-adapters Organisation überführt
- (copilot) Adapter erfordert nun js-controller >= 7.2.5
- (copilot) Adapter erfordert nun admin >= 8.3.5
- (copilot) Adapter erfordert nun Node.js >= 22.19.0
- (mcm1957) Abhängigkeiten wurden aktualisiert

### 0.12.5 (2023-02-09)

- (foxriver76) Änderungen aus 0.12.4 zurückgenommen

### 0.12.3 (2023-02-07)

- (foxriver76) Deaktivieren von `numberPhases` durch Setzen auf `null` ermöglicht

## Lizenz

MIT License

Copyright (c) 2022-2026 Moritz Heusinger <moritz.heusinger@gmail.com>

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

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.0.0 (2026-11-09)
* (meistermopper) fix repochecker findings: nogit, info.connection role, and unused deps (#117)
* (meistermopper) align workflow concurrency and timer wrappers with repochecker (#121)
* (meistermopper) fix TxProfile schedule kind and add ClearChargingProfile on null chargeLimit

### 1.0.0-alpha.4 (2026-11-09)
* (meistermopper) migrate to ESLint 9 and @iobroker/eslint-config (#33)
* (meistermopper) replace legacy `@ampeco/ocpp-eliftech` with native TypeScript OCPP 1.6J server
* (meistermopper) fix SmartCharging removal when `GetConfigurationMaxKeys` truncates response (#65)
* (meistermopper) use `TxProfile` for `RemoteStartTransaction` and track `transactionId` (#24, #65)
* (meistermopper) prevent zombie sockets on reconnect (#20) and serialize outgoing OCPP commands
* (meistermopper) support `DiagnosticsStatusNotification` and `FirmwareStatusNotification` (#32)
* (meistermopper) add `stripLeadingSlash` option and responsive `jsonConfig` with i18n (#30, #60)

### 1.0.0-alpha.3 (2026-11-08)
- (mcm1957) Adapter has been migrated to iobroker-communities organisation
- (copilot) Adapter requires js-controller >= 7.2.5 now
- (copilot) Adapter requires admin >= 8.3.5 now
- (copilot) Adapter requires Node.js >= 22.19.0 now
- (mcm1957) Dependencies have been updated

### 0.12.5 (2023-02-09)
* (foxriver76) revert changes of 0.12.4

### 0.12.3 (2023-02-07)
* (foxriver76) allow deactivating `numberPhases` by setting `null

## License
MIT License

Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2022 Moritz Heusinger <moritz.heusinger@gmail.com>

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