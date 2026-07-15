---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sigenergy/README.md
title: ioBroker Sigenergy Adapter
hash: F6Nt6sPKMmmrscCaDo0zQj9MCUOGXOTA+qjdkn8pD4g=
---
# IoBroker Sigenergy Adapter

![NPM-Version](https://img.shields.io/npm/v/iobroker.sigenergy.svg)
![Lizenz: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

**Adapter für [Sigenergy](https://www.sigenergy.com) Solarenergiesysteme über Modbus TCP/RTU**

Unterstützt das Sigenergy Modbus-Protokoll V2.9 (veröffentlicht am 13.05.2026).

---

<p align="center"> <a href="https://www.buymeacoffee.com/ssbingo"><img src="https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=&slug=ssbingo&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></a> </p>

---

## Merkmale
- 📡 **Modbus TCP** (Ethernet / WLAN / Glasfaser / 4G) — Port 502
- 🔗 **Modbus RTU** (RS485 seriell)
- ⚡ **Vollständige Registerunterstützung** — Alle Anlagen-, Wechselrichter-, PSS- und PID-Register gemäß Spezifikation V2.9
- 🔋 **Akkustatistik** — Zeit bis zur vollständigen Aufladung, verbleibende Zeit, tägliche Abdeckung
- ☀️ **PV-Statistiken** — Eigenverbrauchsquote, Autarkiequote
- 🔌 **Netzteil** (Sigen EVAC) — Optional
- ⚡ **Gleichstromladegerät** — Optional
- 🏗️ **PSS** (Power Station Switch) — Optional, Überwachung von Mittel-/Niederspannungs-Schaltanlagen und Verteilerschränken
- 🔍 **PID** (PV-Isolationserkennung) — Optional
- 🌡️ **ESS-Vorheizung** — Zeitgesteuerter Zeitplan, 30 konfigurierbare Zeitfenster (M1-HYA/HYB)
- 📈 **Erweiterte Register** — Intelligente Lasten 1–24, kumulative Energie, Netzanschlussparameter
- ☀️ **SigenMicro** — Unterstützung für Mikro-Wechselrichter (automatischer Scan)
- 📊 **Berechnete Werte** — Abgeleitete Statistiken werden in jedem Wahlzyklus aktualisiert.
- 🖥️ **VIS Widgets** — Energiefluss, Batteriestatus, Statistik-Panels

---

## Unterstützte Hardware
| Kategorie | Modelle |
|-----------------|--------|
| **Hybrid-Inv.** | SigenStor EC SP/TP, Sigen Hybrid SP/TP/TPLV, Sigen PV M1-HYA, PG-Controller |
| **PV-Inv.** | Sigen PV Max SP/TP, Sigen PV M1 |
| **EVAC (AC)** | Sigen EVAC 7/11/22 kW, PG EVAC |

---

## Standard-Modbus-Adressen
| Gerät | Adresse |
|--------|---------|
| Pflanze (lesen/schreiben) | **247** |
| Pflanzen-Broadcast (Schreiben, keine Antwort) | **0** |
| Wechselrichter | **1** |
| Netzteil (EVAC) | **2** |
| PSS (Kraftwerksschalter) | **5** (Standard, konfigurierbar) |
| PID (PV-Isolationserkennung) | **6** (Standard, konfigurierbar) |

---

## Gerätetypen
Seit Version 2.4.0 verarbeitet jede Adapterinstanz genau **einen** Sigenergy-Systemtyp (entweder/oder).
Wählen Sie den Typ im Reiter „Komponenten“ aus oder verwenden Sie die **automatische Geräteerkennung**, um ihn von der Hardware auszulesen. Die Registersätze sind gemäß den Modellfußnoten des offiziellen Modbus-Protokolls V2.9 geschützt.

| Fähigkeit | SigenStor | Sigen Hybrid | Sigen PV M1-HYB | Nur PV (PV Max) | Nur SigenMicro |
|---|---|---|---|---|---|
| ESS-/Batterieregister | immer | optional | optional | — | — |
| Gleichstromladegerät | ✓ | ✓ | — | — | — |
| Grid-Code (40051-40068) | ✓ | ✓ | — | — | — |
| ESS-Vorwärmung (50000-50183) | — | — | ✓ | — | — |
| PCC-Leistungsfaktor (40157/40158) | — | — | ✓ | — | — |
| Anlagenregister (Slave 247) | ✓ | ✓ | ✓ | ✓ | — |
| SigenMicro Mikro-Wechselrichter | optional | optional | optional | optional | ✓ |

Ein Modbus-Endpunkt (IP/Bus) entspricht einer Instanz. Ein SigenStor mit zusätzlichen SigenMicro-Mikrowechselrichtern gehört zu einer **einzigen** Instanz – die Mikrowechselrichter sind eine additive Komponente, kein separater Typ. Vorhandene Konfigurationen vor Version 2.4.0 werden automatisch migriert (der abgeleitete Typ wird beim Start protokolliert – bitte überprüfen Sie einmalig die Registerkarte „Komponenten“).

## Konfiguration
### Verbindungsregisterkarte
- **Verbindungstyp**: TCP (Ethernet) oder seriell (RS485)
- **TCP-Host**: IP-Adresse Ihres Wechselrichters
- **TCP-Port**: 502 (Standard)
- **Plant Modbus ID**: 247 (Standard)
- **Wechselrichter-Modbus-ID**: 1 (Standard)

### Registerkarte „Komponenten“
Wählen Sie die installierten Geräte aus:

- Batterie / ESS
- Photovoltaikmodule
- AC-Ladegerät (EVAC)
- Gleichstromladegerät
- PSS (Kraftwerksschalter)
- PID (PV-Isolationserkennung)
- ESS-Vorwärmung (nur M1-HYA/HYB)
- SigenMicro (Mikro-Wechselrichter)

### Statistik-Registerkarte
Wählen Sie die zu berechnenden statistischen Werte aus:

- Akkulaufzeit bis zum vollständigen Aufladen
- Verbleibende Akkulaufzeit
- Tägliche Ladezeit
- Akkulaufzeit
- Eigenverbrauchsquote
- Autarkierate

---

## Datenobjekte
### Pflanze (`plant.*`)
| Bundesland | Beschreibung | Einheit |
| `plant.gridActivePower` | Netzleistung (>0 Import, <0 Export) | kW |
| `plant.pvPower` | PV-Erzeugung | kW |
| `plant.essPower` | Batterieleistung (<0 Entladung) | kW |
| `plant.essSoc` | Ladezustand der Batterie | % |
| `plant.activePower` | Gesamtwirkleistung der Anlage | kW |
| `plant.runningState` | Anlagenstatus (0=Standby, 1=Läuft...) | - |
| `plant.runningState` | Anlagenstatus (0=Standby, 1=Läuft...) | - |

### Wechselrichter (`inverter.*`)
| Bundesland | Beschreibung | Einheit |
| `inverter.pvPower` | PV-Leistung am Wechselrichter | kW |
| `inverter.essBatterySoc` | Batterieladestand | % |
| `inverter.essBatterySoh` | Batteriezustand (SOH) | % |
| `inverter.essBatteryTemperature` | Batterietemperatur | °C |
| `inverter.phaseAVoltage` | Spannung in Phase A | V |
| `inverter.gridFrequency` | Netzfrequenz | Hz |
| `inverter.gridFrequency` | Netzfrequenz | Hz |

### Statistiken (`statistics.*`)
| Bundesland | Beschreibung | Einheit |
| `statistics.batteryTimeToFull` | Minuten bis zur vollständigen Akkuladung | min |
| `statistics.batteryTimeRemaining` | Verbleibende Akkulaufzeit in Minuten | min |
| `statistics.selfConsumptionRate` | Eigenverbrauchsquote | % |
| `statistics.autarkyRate` | Autarkierate | % |
| `statistics.housePower` | Berechneter Hausverbrauch | kW |
| `statistics.housePower` | Berechneter Hausverbrauch | kW |

---

## Notschaltung – Schutz externer PV-Systeme
### Hintergrund
Die Hybrid-Wechselrichter von Sigenergy verfügen über ein optionales **Notstrom-Gateway**, das bei Ausfall des öffentlichen Stromnetzes automatisch in den Inselbetrieb schaltet. In diesem Modus erzeugt das Sigenergy-System ein eigenes lokales Wechselstromnetz, das von der Batterie gespeist wird.

Wird eine **zweite Photovoltaikanlage** – beispielsweise eine Balkonanlage, ein Mikro-Wechselrichter oder ein String-Wechselrichter eines Drittanbieters – an denselben Hausstromkreis angeschlossen, speist sie weiterhin Strom in dieses isolierte lokale Netz ein. Die meisten netzgekoppelten Wechselrichter sind für diese Situation nicht ausgelegt und können folgende Probleme verursachen:

- Überlastung des Sigenergy-Batteriemanagements
- Spannungs- oder Frequenzinstabilität im Inselnetz verursachen
- durch die ungewöhnlichen Betriebsbedingungen beschädigt werden können

Die einzig sichere Lösung besteht darin, das externe System **sofort zu trennen**, sobald Sigenergy in den Inselbetrieb wechselt.

### Wie der Adapter dies handhabt
Der Adapter überwacht den Zustand `plant.onOffGridStatus` in jedem Abfragezyklus.

**Bei Netzausfall** (`onOffGridStatus` = 1 oder 2):

Alle konfigurierten Notfallgeräte werden sofort umgeschaltet.
- Es wird eine Telegram-Benachrichtigung gesendet (optional).

**Bei Rückkehr zum Raster** (`onOffGridStatus` = 0):

- Ein konfigurierbarer Stabilitätstimer startet (Standard: 10 Minuten)
- Wenn das Stromnetz über den gesamten Zeitraum stabil bleibt, werden die Geräte wiederhergestellt.
- Sollte das Stromnetz während der Timer-Zeit erneut ausfallen, wird der Timer verworfen und die Geräte bleiben ausgeschaltet.
- Bei erfolgreicher Wiederherstellung wird eine Telegram-Benachrichtigung versendet (optional).

### Aktivieren der Funktion
**Schritt 1 – Registerkarte „Komponenten“** Aktivieren Sie **Notstrom-Gateway (Netzunabhängige Stromversorgung)**.
Die Registerkarte *Notstromversorgung* wird sichtbar.

**Schritt 2 – Registerkarte „Notfallumschaltung“**

#### Geräte
| Feld | Beschreibung |
|---|---|
| **Stabilitätsverzögerung (Minuten)** | Wie lange muss das Stromnetz stabil bleiben, bevor die Geräte wieder eingeschaltet werden? 10 Minuten werden empfohlen. |
| **Gerät 1 – Objekt-ID** | Die ioBroker-Status-ID des Hauptschalters für das externe System. Wird bei einem Netzausfall auf `false` gesetzt; nach stabiler Wiederherstellung auf `true`. |
| **Geräte 2–4 — Objekt-ID** | Zusätzliche optionale Geräte. |
| **Geräte 2–4 — Richtung** | *AUS bei Fehler, EIN nach Wiederherstellung* oder *EIN bei Fehler, AUS nach Wiederherstellung*. |

#### Telegram-Benachrichtigungen (optional)
| Feld | Beschreibung |
|---|---|
| **Telegram-Benachrichtigungen aktivieren** | Aktiviert Benachrichtigungen bei Netzausfällen und -wiederherstellungen. |
| **Telegram-Instanz** | Wählen Sie die zu verwendende Adapterinstanz `telegram.x` aus. |
| **Chat-ID** | Optional: Beschränken Sie die Zusendung auf einen bestimmten Chat. Lassen Sie das Feld leer, um die Zusendung an alle konfigurierten Chats zu senden. |

### Beispiel — Balkonkraftwerk
Ein Shelly Plus 1-Relais ist in Reihe mit dem Versorgungskabel der Balkonstromanlage geschaltet. Seine ioBroker-Status-ID lautet `shelly.0.SHPLUS1-ABC123.Relay0.Switch`.

Konfiguration:

- **Gerät 1**: `shelly.0.SHPLUS1-ABC123.Relay0.Switch`

→ Relais öffnet (`false`) bei Netzausfall, schließt (`true`) nach stabiler Wiederherstellung

Das Balkonkraftwerk ist nun automatisch geschützt.

---

## VIS-Widgets
**Hinweis:** Alle 7 Widgets werden vom separaten Adapter [ioBroker.vis-2-widgets-sigenergy](https://github.com/ssbingo/ioBroker.vis-2-widgets-sigenergy) bereitgestellt. Installieren Sie diesen Adapter zusammen mit dem hier genannten, um die Widgets in VIS-2 zu verwenden.

### Energiefluss-Widget
Zeigt den animierten Energiefluss zwischen PV → Batterie ↔ Netz → Haus.

### Akku-Status-Widget
Zeigt den Ladezustandsbalken, den Gesundheitszustandsanzeiger, die verbleibende Zeit bis zum vollständigen/leeren Füllstand und die aktuelle Leistung an.

### Leistungsübersichts-Widget
Live-Lesung aller vier Energieflüsse.

### Statistik-Widget
Heutige Autarkie, Eigenverbrauch, minimaler/maximaler Ladezustand (SOC), Akkulaufzeit.

### Wechselrichter-Widget
Live-Wechselrichterdaten: PV-Leistung, Netzfrequenz, Phasenspannungen, Temperatur.

### AC-Ladegerät-Widget (EVAC)
Status- und Leistungsanzeigen der Sigen EVAC Ladestation.

### DC-Ladegerät-Widget
Status- und Leistungsanzeigen für das Gleichstromladegerät.

---

## Kommunikationsprotokoll
- Modbus TCP: TCP-Modus, Vollduplex, Port 502 (Slave)
- Modbus RTU: Halbduplex, 9600 bps, 8N1
- Minimales Abfrageintervall: 1000 ms (1 Sekunde) gemäß Sigenergy-Spezifikation
- Timeout: 1000 ms gemäß Sigenergy-Spezifikation

---

## Dokumentation
- 🇩🇪 [Deutsche Dokumentation](doc/de/README.md)
- 🇷🇺 [Dokumentation auf Russisch](doc/ru/README.md)
- 🇳🇱 [Niederländische Dokumentation](doc/nl/README.md)
- 🇫🇷 [Documentation française](doc/fr/README.md)
- 🇮🇹 [Documentazione Italiana](doc/it/README.md)
- 🇪🇸 [Documentación en español](doc/es/README.md)
- 🇵🇱 [Dokumentacja polska](doc/pl/README.md)
- 🇵🇹 [Portugiesische Dokumentation](doc/pt/README.md)
- 🇺🇦 [Документація українською](doc/uk/README.md)
- 🇨🇳 [简体中文文档](doc/zh-cn/README.md)

## Changelog

### 3.0.10 (2026-06-29)
- (ssbingo) chore: bump js-yaml from 4.1.1 to 4.3.0

### 3.0.9 (2026-06-29)
- (ssbingo) chore: pin CI actions to major version (@v1) instead of patch version

### 3.0.8 (2026-06-29)
- (ssbingo) fix: add missing i18n translations for SigenMicro scan UI strings (es, fr, it, nl, pl, pt, uk, zh-cn)

### 3.0.7 (2026-06-28)
- (ssbingo) chore: update dependencies (@iobroker/adapter-core 3.4.1, @types/node 22.20.0, testing-action-adapter 1.1.1, testing-action-deploy 1.5.0, http-proxy-middleware 3.0.7)

### 3.0.6 (2026-06-14)
- (ssbingo) fix: remove duplicate common.license field — licenseInformation already present

### 3.0.5 (2026-06-14)
- (ssbingo) fix: add missing license field to io-package.json common block

### 3.0.4 (2026-06-14)
- (ssbingo) fix: emergency Telegram notification now sent only once per grid-failure event (not repeated every poll); device switching limited to 3 attempts max (initial + 2 retries) while off-grid

### 3.0.3 (2026-06-13)
- (ssbingo) fix: remove non-functional welcomeText from io-package.json; add visible warning staticText in Emergency Switching config tab (yellow box, i18n in all 11 languages)

### 3.0.2 (2026-06-13)
- (ssbingo) fix: ESLint/Prettier errors in emergency switching methods — remove unused variable, fix indentation, add JSDoc @param types

### 3.0.1 (2026-06-13)
- (ssbingo) feat: add welcomeText to io-package.json — multilingual notice about emergency gateway switching feature

### 3.0.0 (2026-06-13)
- (ssbingo) feat: emergency gateway switching — automatic disconnection of external PV systems (balcony power plants, micro-inverters) on grid failure; configurable stability timer on grid return; optional Telegram notifications
- (ssbingo) docs: emergency switching documentation added in all 11 languages

### 2.5.2 (2026-06-12)
- (ssbingo) fix: URL-encode spaces in Buy Me a Coffee button src — image was not rendering on GitHub

### 2.5.1 (2026-06-12)
- (ssbingo) fix: correct instanceObject role for info.modelType from 'info.name' to 'text' (W1133/W1135 adapter-checker warnings)

### 2.5.0 (2026-06-12)

- (ssbingo) Architectural write safety: Modbus writes are rejected in the write dispatcher itself when the target register is not valid for the configured device type (models gating in onStateChange, plant guard for SigenMicro-only)
- (ssbingo) TypeScript type check fixed — new `lib/adapter-config.d.ts` with full AdapterConfig declaration, typed modbus-serial constructor, ioBroker.CommonType/SettableObject annotations; new `npm run check` script passes with 0 errors
- (ssbingo) ESLint configuration allows JSDoc `@type` tags in this checked-JavaScript project (jsdoc/check-tag-names with typed:false)

### 2.4.0 (2026-06-12)

- (ssbingo) Device type architecture: mandatory selector (SigenStor / Sigen Hybrid / Sigen PV M1-HYB / PV-only inverter / SigenMicro-only) with strict either/or register gating per protocol V2.9 model footnotes
- (ssbingo) Sigen Hybrid and PV-only inverters (Sigen PV / PV Max) officially supported
- (ssbingo) Auto-detect device type from hardware in the admin UI (registers 30500 / 31024)
- (ssbingo) Model verification on startup — warns when configuration and detected hardware mismatch (new state info.modelType)
- (ssbingo) Dynamic PV string registers: PV5-PV16 voltage/current enabled by the string count reported in register 31025
- (ssbingo) PCC power factor controls (40157/40158) gated to Sigen PV M1-HYB; ESS preheating gated to M1-HYB; DC charger and grid code gated to SigenStor/Sigen Hybrid
- (ssbingo) Automatic migration of pre-2.4.0 configurations and cleanup of channels that are invalid for the selected device type

### 2.3.4 (2026-06-12)
- (ssbingo) fix: correct protocol level detection — use proper register quantities for probes, descend from V2.9 to V2.6, distinguish transport errors from device exceptions to avoid false pre-V2.6 report

### 2.3.3 (2026-06-11)
- (ssbingo) fix: suppress repeated register read warnings after first occurrence for plant/inverter/acCharger/dcCharger/pss/pid; subsequent failures log at debug level only

### 2.3.2 (2026-06-10)
- (ssbingo) fix: show 'pre-V2.6' instead of 'unknown' when device responds but has no extended plant registers; add per-probe debug log with Modbus exception message

### 2.3.1 (2026-06-10)
- (ssbingo) feat: detect Modbus protocol level on startup by probing registers 30088/30200/30228/30286; read firmware version (30525); log result and store as info.protocolLevel state

### 2.3.0 (2026-06-10)
- (ssbingo) feat: add common.states enum maps for emsWorkMode/runningState/remoteEmsMode/dcCharger.runningState; wire PSS/PID/AC Charger write registers (FC06/FC10) with subscribe and onStateChange handlers

### 2.2.7 (2026-06-10)
- (ssbingo) fix: add missing native defaults enableSmartLoads/enableCumulativeEnergy/enableGridCode to io-package.json
- (ssbingo) fix: update register 30003 desc with V2.7 EMS modes 5 (FullFeedIn) and 9 (Custom)

### 2.2.6 (2026-06-10)
- (ssbingo) feat: V2.9 register audit — add missing register 30279 (current control command value), move DC Charger PV registers 31509/31511 to dcCharger namespace, fix ESS Preheating TOU time gain (null→1)
- (ssbingo) feat: implement control write-back for plant.control.*, plant.gridCode.*, inverter.control.*, dcCharger.control.* (FC06/FC10); read RW holding registers on startup
- (ssbingo) fix: suppress repeated ESS Preheating warn after device reports unsupported registers; downgrade control register startup read errors to debug

### 2.2.4 (2026-06-10)
- (ssbingo) fix: implement ESS Preheating TOU polling (FC03, 50000–50183, 94 registers) and write-back via onStateChange; add encodeValue to ModbusConnection

### 2.2.3 (2026-06-10)
- (ssbingo) fix: add 25 missing admin i18n keys for PSS, PID, ESS Preheating, Extended Registers across all 11 languages

### 2.2.2 (2026-06-09)
- (ssbingo) docs: update all READMEs to Modbus Protocol V2.9 — add PSS, PID, ESS Preheating, Extended Registers, SigenMicro; correct protocol version reference

### 2.2.1 (2026-06-09)
- (ssbingo) fix: correct PSS register table to 122 entries per official spec V2.9 (addresses, gains, types); fix PSS write registers to 6 WO entries; fix PID registers 33055-33060 (types, gains, 2 missing entries)

### 2.2.0 (2026-06-09)
- (ssbingo) feat: PSS (Power Station Switch) and PID (PV Insulation Detection) support; ESS Preheating TOU schedule registers; new admin options for PSS/PID slave IDs

### 2.1.1 (2026-06-09)
- (ssbingo) fix: wire feature flags (enableSmartLoads, enableCumulativeEnergy, enableGridCode) into polling and object creation; add Extended Registers admin tab

### 2.1.0 (2026-06-09)
- (ssbingo) feat: extended statistics — plant statistics (30088–30097), smart loads 1–24 (30098–30193), cumulative energy (30194–30271), adjustment feedback (30613–30619), grid code parameters (40049–40068)

### 2.0.0 (2026-06-09)
- (ssbingo) feat: Modbus Protocol V2.9 — new plant/inverter/DC charger registers, remove deprecated registers, extend enums


---

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2026 ssbingo <s.sternitzke@online.de>

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