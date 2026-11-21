---
chapters: {"pages":{"en/adapterref/iobroker.schlueter-thermostat/README.md":{"title":{"en":"ioBroker.schlueter-thermostat"},"content":"en/adapterref/iobroker.schlueter-thermostat/README.md"},"en/adapterref/iobroker.schlueter-thermostat/docs/en/README.md":{"title":{"en":"ioBroker.schlueter-thermostat"},"content":"en/adapterref/iobroker.schlueter-thermostat/docs/en/README.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.schlueter-thermostat/README.md
title: ioBroker.schlueter-thermostat
hash: KU2dcFVfQywWE9ekaB76wadKND4ImSnQmaGVDHrsSjo=
---
# ioBroker.schlueter-thermostat

![NPM-Version](https://img.shields.io/npm/v/iobroker.schlueter-thermostat.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.schlueter-thermostat.svg)
![Anzahl der Installationen](https://iobroker.live/badges/schlueter-thermostat-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/schlueter-thermostat-stable.svg)
![NPM](https://nodei.co/npm/iobroker.schlueter-thermostat.png?downloads=true)
![ioBroker](https://img.shields.io/badge/ioBroker-Adapter-blue)
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D22-green)
![Lizenz](https://img.shields.io/badge/License-MIT-lightgrey)
![Test und Freigabe](https://github.com/patricknitsch/ioBroker.schlueter-thermostat/workflows/Test%20and%20Release/badge.svg)
![Cloud-Architektur](https://img.shields.io/badge/Architecture-Cloud%20API%20Bridge-blue?style=for-the-badge&logo=cloudflare)
![Konzept anwenden](https://img.shields.io/badge/Control-Apply%20Based-green?style=for-the-badge)
![Modusunterstützung](https://img.shields.io/badge/Modes-Schedule%20|%20Comfort%20|%20Manual%20|%20Boost%20|%20Eco%20|%20Frost%20Protection%20|%20Vacation-orange?style=for-the-badge)

---

##

## 🌍 Übersicht

<img align="left" src="admin/schlueter-thermostat.jpg" alt="image" width="128" /><p> Dieser Adapter integriert<strong> Schlüter / OJ Microline OWD5 Thermostate</strong> über den ioBroker<strong> offizielle Cloud-APIs</strong> Die

Es basiert auf der HA-Integration von @robbinjanssen. Weitere Informationen finden Sie in der Dokumentation.

> Funktioniert sofort über die Cloud. Optionale **lokale Steuerung (in der Testphase)** : Der Adapter kann als Gerätegateway für die Thermostate in Ihrem LAN fungieren (Relay- oder lokaler Modus) – siehe Dokumentation.

##

## 🚀 So geht's los

1. Adapter in ioBroker installieren
2. Konfiguration der offenen Instanz
3. Eingeben:

| Einstellung      | Beschreibung                                          |
| ---------------- | ----------------------------------------------------- |
| Benutzername     | Ihr Schlüter/OJ Cloud-Login                           |
| Passwort         | Cloud-Passwort                                        |
| API-Schlüssel    | Folgendes funktioniert in den meisten Fällen.         |
| Kunden-ID        | Gefunden in den Thermostatinformationen (Standard: 3) |
| Umfrageintervall | Standardwert: 60 Sekunden                             |

4. Adapter speichern und starten

Optionale lokale Steuerung (in der Testphase, für Benutzer mit DNS-Kenntnissen): siehe Dokumentation, Abschnitt _Lokale Steuerung_ .

Für den API-Schlüssel können Sie Folgendes versuchen: `f219aab4-9ac0-4343-8422-b72203e2fac9` Diesen Schlüssel finden Sie im Forum: `https://community.home-assistant.io/t/mwd5-wifi-thermostat-oj-electronics-microtemp/445601` Es sieht also nach einem globalen Schlüssel aus.

##

## Dokumentation

[🇺🇸 Dokumentation](/#/docs/adapterref/iobroker.schlueter-thermostat/docs/en/README.md)

[🇩🇪 Dokumentation](https://github.com/patricknitsch/ioBroker.schlueter-thermostat/blob/main/docs/de/README.md)

##

## Überblick über die kompakte Architektur

### Architektur-Abzeichen

![Lokale Steuerung](https://img.shields.io/badge/Local-Relay%20|%20Local%20only%20\(in%20testing\)-brightgreen?style=for-the-badge)

### Kompakte Programmstruktur

```mermaid
flowchart LR
  UI[User / UI] --> IO[ioBroker States]
  IO --> ADP[Adapter]

  ADP -->|read| OWD5[OWD5 Cloud]
  ADP -->|write| OCD5[OCD5 Cloud]
  OCD5 --> TH[Thermostat]

  TH -->|DNS redirect, port 9513| GW[Local gateway - in testing]
  GW --> ADP
  GW -.->|relay| VG[Vendor device gateway]

  ADP --> OBJ[Object Tree]
  OBJ --> RO[Read States]
  OBJ --> AP[Apply Controls]
```

### Interner Durchfluss (Mini)

```mermaid
flowchart TB
  READY[onReady] --> LOGIN[Cloud Login]
  LOGIN --> POLL[pollOnce]
  POLL --> UPSERT[Update Objects + States]
  UPSERT --> BACKOFF{All offline?}
  BACKOFF -- yes --> INC[Increase interval up to 1h then 12:00/00:00]
  BACKOFF -- no --> RESET[Reset to base interval]
  INC --> POLL
  RESET --> POLL

  APPLYBTN[Apply Button] --> LOCAL{Connected locally?}
  LOCAL -- yes --> CMD[Local command + acknowledgement]
  LOCAL -- no / failed --> ROUTER[applyRouter]
  ROUTER --> API[updateThermostat]
```

##

## 📌 Notizen

- Entwickelt und getestet mit einem einzigen Thermostat
- Umgebungen mit mehreren Geräten werden unterstützt, Feedback ist jedoch willkommen.

##

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.9.0 (2026-11-19)

- (patricknitsch) Web component `iob-schlueter-thermostat-card` (ioBroker web-components): thermostat card in the look of the Device Manager with temperatures, status and controls, usable in vis-2, devices, admin and other hosts
- (patricknitsch) Update Dependencies

### 0.8.0 (2026-11-14)

- (patricknitsch) Add Node.js 26 in test-and-release.yml
- (patricknitsch) Update Dependencies
- (patricknitsch) Change icon from png to jpg
- (patricknitsch) Add experimental local control (BETA): own device gateway with relay and local-only mode, see docs
- (patricknitsch) Remove the legacy cleanup (option "Legacy Cleanup"); no longer needed since 0.5.2
- (patricknitsch) Docs: DNS redirect via CNAME
- (patricknitsch) Local control: DNS check button, DNS check on start and warning when no thermostat connects
- (patricknitsch) Device Manager: live status indicators on the cards (heating, temperatures, mode, vacation, energy, connection) and in the instance toolbar
- (patricknitsch) Device Manager: compact single-page controls with thermostat and serial number; information tab removed
- (patricknitsch) New state setpoint.active (setpoint of the current mode, in schedule mode of the current event), shown on the Device Manager card
- (patricknitsch) Notifications when the local connection of a thermostat is lost / restored
- (patricknitsch) Default customer ID is 3 for new instances

### 0.7.4 (2026-06-05)

- (copilot) Fixes for Repo Checker

### 0.7.3 (2026-05-25)

- (copilot) Fixes for Repo Checker

### 0.7.2 (2026-05-23)

- (copilot) Add Icons for Notifications

**Older changelog entries can be found in CHANGELOG_OLD.md.**

## License

MIT License

Copyright (c) 2026 patricknitsch <patricknitsch@web.de>

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