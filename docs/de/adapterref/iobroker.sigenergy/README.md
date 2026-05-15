---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sigenergy/README.md
title: ioBroker Sigenergy Adapter
hash: T33yFfhPpFE1SZDVmbMc42UIXeEGY6UuQvHlqA7YqvA=
---
# IoBroker Sigenergy Adapter

![NPM-Version](https://img.shields.io/npm/v/iobroker.sigenergy.svg)
![Lizenz: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

**Adapter für Sigenergy-Solarenergiesysteme über Modbus TCP/RTU**

Unterstützt das Sigenergy Modbus-Protokoll V2.5 (veröffentlicht am 19.02.2025).

---

## Merkmale
- 📡 **Modbus TCP** (Ethernet / WLAN / Glasfaser / 4G) — Port 502
- 🔗 **Modbus RTU** (RS485 seriell)
- ⚡ **Vollständige Registerunterstützung** — Alle Anlagen- und Wechselrichterregister gemäß Spezifikation V2.5
- 🔋 **Akkustatistik** — Zeit bis zur vollständigen Aufladung, verbleibende Zeit, tägliche Abdeckung
- ☀️ **PV-Statistiken** — Eigenverbrauchsquote, Autarkiequote
- 🔌 **Netzteil** (Sigen EVAC) — Optional
- ⚡ **Gleichstromladegerät** — Optional
- 📊 **Berechnete Werte** — Abgeleitete Statistiken werden in jedem Umfragezyklus aktualisiert.
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
| Netzladegerät (EVAC) | **2** |

---

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

### Statistik-Registerkarte
Wählen Sie die zu berechnenden statistischen Werte aus:

- Akkulaufzeit bis zum vollständigen
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

## VIS-Widgets
**Hinweis:** Alle 7 Widgets werden vom separaten Adapter [ioBroker.vis-2-widgets-sigenergy](https://github.com/ssbingo/ioBroker.vis-2-widgets-sigenergy) bereitgestellt. Installieren Sie diesen Adapter zusammen mit dem hier genannten, um die Widgets in VIS-2 zu verwenden.

### Energiefluss-Widget
Zeigt den animierten Energiefluss zwischen PV → Batterie ↔ Netz → Haus.

### Akku-Status-Widget
Zeigt den Ladezustandsbalken, den Gesundheitszustandsanzeiger, die verbleibende Zeit bis zum Voll-/Leerlauf und die aktuelle Leistung an.

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
- 🇷🇺 [Документация на русском](doc/ru/README.md)
- 🇳🇱 [Niederländische Dokumentation](doc/nl/README.md)
- 🇫🇷 [Documentation française](doc/fr/README.md)
- 🇮🇹 [Documentazione Italiana](doc/it/README.md)
- 🇪🇸 [Documentación en español](doc/es/README.md)
- 🇵🇱 [Dokumentacja polska](doc/pl/README.md)
- 🇵🇹 [Portugiesische Dokumentation](doc/pt/README.md)
- 🇺🇦 [Документація українською](doc/uk/README.md)
- 🇨🇳 [简体中文文档](doc/zh-cn/README.md)

## Changelog

### 1.9.9 (2026-05-14)
- (ssbingo) chore: dependency bumps via Dependabot: protobufjs, @protobufjs/utf8, fast-uri
- (ssbingo) chore: requires Node.js >= 22 now

### 1.9.8 (2026-04-22)
- (ssbingo) fix: deduplicated connection/poll error logs to prevent log flooding and improve Sentry-readiness
- (ssbingo) fix: shutdown guards and extendForeignObject prevent race conditions on unload and with admin UI
- (ssbingo) fix: closed socket leak on Modbus timeout; testConnection pauses polling; removed empty control channels

### 1.9.7 (2026-04-16)
- (ssbingo) feat: added calculated states plant.pv1Power, plant.pv2Power, plant.pv3Power


### 1.9.6 (2026-04-16)
- (ssbingo) feat: added calculated states plant.pv1Power, plant.pv2Power, plant.pv3Power


### 1.9.5 (2026-04-08)
- (ssbingo) fix: removed unused common.schedule from io-package.json

### 1.9.4 (2026-04-08)
- (ssbingo) fix: Changelog / adding CHANGELOG_OLD.md

### 1.9.3 (2026-04-08)
- (ssbingo) fix remove admin/index.html

### 1.9.2 (2026-04-08)
- (ssbingo) fixes

### 1.9.1 (2026-04-08)
- (ssbingo) Fixed admin UI: removed legacy index.html/index_m.html/words.js; fixed jsonData type in jsonConfig sendTo buttons

### 1.9.0 (2026-03-26)
- (ssbingo) Test abgeschlossen

### 1.8.23 (2026-03-26)
- (ssbingo) Fixed copyright year to 2026 in LICENSE and README; technical corrections: CI/CD workflow, linting, tests

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