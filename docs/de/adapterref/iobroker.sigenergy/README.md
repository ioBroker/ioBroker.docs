---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sigenergy/README.md
title: ioBroker Sigenergy Adapter
hash: HRZddRNzlGL6SdOE8ObYgbG7p8YmPCmxvmTVi3sM9C0=
---
# ioBroker Sigenergy Adapter

![NPM-Version](https://img.shields.io/npm/v/iobroker.sigenergy.svg)
![Lizenz: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

**Adapter für [Sigenergy](https://www.sigenergy.com) -Solarenergiesysteme über Modbus TCP/RTU**

Unterstützt das Sigenergy Modbus-Protokoll V2.9 (veröffentlicht am 13.05.2026).

---

<p align="center">
  <a href="https://www.buymeacoffee.com/ssbingo"><img src="https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=&slug=ssbingo&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></a>
</p>

---

## Merkmale

- 📡 **Modbus TCP** (Ethernet / WLAN / Glasfaser / 4G) — Port 502
- 🔗 **Modbus RTU** (RS485 seriell)
- ⚡ **Vollständige Registerunterstützung** – Alle Anlagen-, Wechselrichter-, PSS- und PID-Register gemäß Spezifikation V2.9
- 🔋 **Akkustatistik** – Zeit bis zur vollständigen Aufladung, verbleibende Zeit, tägliche Reichweite
- ☀️ **PV-Statistiken** — Eigenverbrauchsquote, Autarkiequote
- 🔌 **Netzteil** (Sigen EVAC) — Optional
- ⚡ **DC-Ladegerät** — Optional
- 🏗️ **PSS** (Power Station Switch) – Optionale Überwachung von Mittel-/Niederspannungs-Schaltanlagen und Verteilerschränken
- 🔍 **PID** (PV-Isolationserkennung) — Optional
- 🌡️ **ESS-Vorheizung** — Zeitgesteuerter Tarif, 30 konfigurierbare Zeitfenster (M1-HYA/HYB)
- 📈 **Erweiterte Register** – Intelligente Lasten 1–24, kumulative Energie, Netzanschlussparameter
- 📊 **Berechnete Werte** – Abgeleitete Statistiken werden in jedem Wahlzyklus aktualisiert.
- ☁️ **SigenMicro via Cloud** — Optional: Live-Werte der SigenMicro-Mikrowechselrichter aus der Sigenergy-Cloud
- 🖥️ **VIS Widgets** – Energiefluss, Batteriestatus, Statistikpanels

---

## Unterstützte Hardware

| Kategorie                | Modelle                                                                     |
| ------------------------ | --------------------------------------------------------------------------- |
| **Hybrid-Investitionen** | SigenStor EC SP/TP, Sigen Hybrid SP/TP/TPLV, Sigen PV M1-HYA, PG-Controller |
| **PV-Investition**       | Sigen PV Max SP/TP, Sigen PV M1                                             |
| **EVAC (AC)**            | Sigen EVAC 7/11/22 kW, PG EVAC                                              |

---

## Anforderungen

| Komponente        | Mindestversion |
| ----------------- | -------------- |
| **js-Controller** | >= 6.0.11      |
| **Administrator** | >= 7.8.23      |
| **Node.js**       | >= 22          |

---

## Standard-Modbus-Adressen

| Gerät                                       | Adresse                          |
| ------------------------------------------- | -------------------------------- |
| Pflanze (lesen/schreiben)                   | **247**                          |
| Pflanzen-Sendung (schreiben, keine Antwort) | **0**                            |
| Wechselrichter                              | **1**                            |
| AC-Ladegerät (EVAC)                         | **2**                            |
| PSS (Kraftwerksschalter)                    | **5** (Standard, konfigurierbar) |
| PID (PV-Isolationserkennung)                | **6** (Standard, konfigurierbar) |

---

## Gerätetypen

Seit Version 2.4.0 verarbeitet jede Adapterinstanz genau **einen** Sigenergy-Systemtyp (entweder/oder). Wählen Sie den Typ im Reiter „Komponenten“ aus oder verwenden Sie **die automatische Geräteerkennung,** um ihn von der Hardware auszulesen. Die Registersätze sind gemäß den Modellfußnoten des offiziellen Modbus-Protokolls V2.9 geschützt.

| Fähigkeit                         | SignStor | Sigen Hybrid | Sigen PV M1-HYB | PV-only (PV Max) |
| --------------------------------- | -------- | ------------ | --------------- | ---------------- |
| ESS / Batterieregister            | stets    | optional     | optional        | —                |
| Gleichstromladegerät              | ✓        | ✓            | —               | —                |
| Grid-Code (40051-40068)           | ✓        | ✓            | —               | —                |
| ESS-Vorwärmung (50000-50183)      | —        | —            | ✓               | —                |
| PCC-Leistungsfaktor (40157/40158) | —        | —            | ✓               | —                |
| Anlagenregister (Slave 247)       | ✓        | ✓            | ✓               | ✓                |

Ein Modbus-Endpunkt (IP/Bus) = eine Instanz. Vorhandene Konfigurationen vor Version 2.4.0 werden automatisch migriert (der abgeleitete Typ wird beim Start protokolliert – bitte überprüfen Sie einmal die Registerkarte „Komponenten“).

## Konfiguration

### Verbindungsregisterkarte

- **Verbindungstyp** : TCP (Ethernet) oder seriell (RS485)
- **TCP-Host** : IP-Adresse Ihres Wechselrichters
- **TCP-Port** : 502 (Standard)
- **Modbus-Anlagen-ID** : 247 (Standard)
- **Modbus-ID des Wechselrichters** : 1 (Standard)

### Registerkarte „Komponenten“

Wählen Sie die installierten Geräte aus:

- Batterie / ESS
- Photovoltaikmodule
- AC-Ladegerät (EVAC)
- Gleichstromladegerät
- PSS (Kraftwerksschalter)
- PID (PV-Isolationserkennung)
- ESS-Vorwärmung (nur M1-HYA/HYB)

> **SigenMicro:** SigenMicro-Mikrowechselrichter sind nicht Teil des Sigenergy Modbus-Protokolls (V2.9). Sie kommunizieren ausschließlich über WLAN mit der Sigenergy-Cloud, daher gibt es keine Modbus-Adresse oder kein auslesbares Register. Ihre Messwerte können optional aus der Sigenergy-Cloud abgerufen werden (siehe [Registerkarte „SigenMicro (Cloud)“)](#sigenmicro-cloud-tab) .

### Statistik-Registerkarte

Wählen Sie die zu berechnenden statistischen Werte aus:

- Akkulaufzeit bis zum vollständigen
- verbleibende Akkulaufzeit
- Tägliche Ladezeit
- Akkulaufzeit
- Eigenverbrauchsquote
- Autarkierate

### SigenMicro (Cloud) Tab

Optional. Liest die Live-Werte von SigenMicro-Mikrowechselrichtern aus der Sigenergy-Cloud mit Ihrem mySigen-Konto. Alle Mikrowechselrichter des Kontos werden automatisch erkannt. Die Cloud-Abfrage erfolgt unabhängig von der Modbus-Verbindung.

| Einstellung                                                        | Beschreibung                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Lesen Sie SigenMicro-Mikrowechselrichter über die Sigenergy-Cloud. | Aktiviert das Cloud-Polling                                                                                                                                                                                                                                                                                                                                                                                                    |
| Cloud-Schnittstelle                                                | **Offizielle Sigen OpenAPI** (Standard) – von Sigenergy dokumentiert, schreibgeschützt. Sigenergy beschränkt die Live-Daten des Geräts auf etwa einmal alle 5 Minuten.<br> **mySigen App-Oberfläche** – die Oberfläche der mySigen App ermöglicht schnellere Updates, ist aber **nicht offiziell dokumentiert** : Sigenergy kann sie jederzeit ohne Vorankündigung ändern oder blockieren.                                     |
| Wolkenregion                                                       | Server Ihres mySigen-Kontos (Europa =`api-eu.sigencloud.com`)                                                                                                                                                                                                                                                                                                                                                                 |
| mySigen-Konto / Passwort                                           | Ihre mySigen-Anmeldedaten. Diese werden ausschließlich an die Sigenergy-Cloud gesendet; das Passwort wird verschlüsselt gespeichert.                                                                                                                                                                                                                                                                                           |
| Cloud-Abfrageintervall                                             | Mindestens 300 Sekunden für die OpenAPI, 30 Sekunden für die App-Schnittstelle. Durch Ändern der Cloud-Schnittstelle wird der entsprechende Standardwert festgelegt (300 Sekunden für die OpenAPI, 60 Sekunden für die App-Schnittstelle).                                                                                                                                                                                     |
| Testanmeldung                                                      | Meldet sich einmalig mit den eingegebenen Einstellungen in der Sigenergy-Cloud an (es werden keine Gerätedaten gelesen). **Wichtig:** Solange die Cloud aktiviert ist, können die Einstellungen erst nach einem erfolgreichen Test gespeichert werden. Der Test muss nach jeder Änderung des Kontos, des Passworts, der Schnittstelle oder der Region wiederholt werden. Die Instanz muss während des Tests ausgeführt werden. |

Anmerkungen:

- Der Adapter kann nur lesen. Es ist kein Entwicklerkonto und kein „Onboarding“ des Systems erforderlich (die Anmeldung mit dem OpenAPI-Konto gewährt lediglich Lesezugriff auf die Systeme des eigenen Kontos).
- Der Adapter fragt die Cloud nur mit Einstellungen ab, deren Anmeldung getestet wurde. Wurden die Einstellungen ohne Test geändert (z. B. direkt im Instanzobjekt), wird eine Warnung protokolliert und die Cloud-Abfrage deaktiviert.
- Falsche Anmeldedaten unterbrechen die Cloud-Abfrage, bis die Einstellungen erneut gespeichert werden. Sigenergy sperrt ein mySigen-Konto für 3 Minuten nach 5 fehlgeschlagenen Anmeldeversuchen innerhalb von 60 Minuten, sodass der Adapter ein abgelehntes Passwort niemals selbstständig erneut versucht.
- Nachts werden die Mikro-Wechselrichter abgeschaltet; `online` ist dann `false` und die Werte sind leer.

---

## Datenobjekte

### Anlage (`plant.*`)

| Zustand                 | Beschreibung                          | Einheit |
| ----------------------- | ------------------------------------- | ------- |
| `plant.gridActivePower` | Netzstrom (>0 Import, <0 Export)      | kW      |
| `plant.pvPower`         | PV-Erzeugung                          | kW      |
| `plant.essPower`        | Batterieleistung (<0 Entladung)       | kW      |
| `plant.essSoc`          | Batterieladezustand                   | %       |
| `plant.activePower`     | Gesamte Wirkleistung des Kraftwerks   | kW      |
| `plant.runningState`    | Anlagenstatus (0=Standby, 1=Läuft...) | -       |

### Wechselrichter (`inverter.*`)

| Zustand                          | Beschreibung                  | Einheit |
| -------------------------------- | ----------------------------- | ------- |
| `inverter.pvPower`               | PV-Leistung am Wechselrichter | kW      |
| `inverter.essBatterySoc`         | Batterie-SOC                  | %       |
| `inverter.essBatterySoh`         | Batteriezustand               | %       |
| `inverter.essBatteryTemperature` | Batterietemperatur            | °C      |
| `inverter.phaseAVoltage`         | Spannung in Phase A           | V       |
| `inverter.gridFrequency`         | Netzfrequenz                  | Hz      |

### Statistik (`statistics.*`)

| Zustand                           | Beschreibung                                     | Einheit |
| --------------------------------- | ------------------------------------------------ | ------- |
| `statistics.batteryTimeToFull`    | Minuten bis zum vollständigen Aufladen des Akkus | min     |
| `statistics.batteryTimeRemaining` | verbleibende Akkulaufzeit in Minuten             | min     |
| `statistics.selfConsumptionRate`  | Eigenverbrauchsquote                             | %       |
| `statistics.autarkyRate`          | Autarkierate                                     | %       |
| `statistics.housePower`           | Berechneter Hausverbrauch                        | kW      |

### SigenMicro (`sigenmicro.*`)

Nur wenn der [SigenMicro (Cloud)-Tab](#sigenmicro-cloud-tab) aktiviert ist. Ein Gerät pro Mikro-Wechselrichter, benannt nach seiner Seriennummer:

| Zustand                                                           | Einheit    | Beschreibung                                         |
| ----------------------------------------------------------------- | ---------- | ---------------------------------------------------- |
| `sigenmicro.totalPower`                                           | kW         | Wechselstromversorgung aller SignMicro zusammen      |
| `sigenmicro.<serial>.online`                                      | —          | Mikro-Wechselrichter meldet Live-Werte               |
| `sigenmicro.<serial>.activePower`                                 | kW         | Wechselstrom-Wirkleistung                            |
| `sigenmicro.<serial>.reactivePower`                               | kvar       | Blindleistung                                        |
| `sigenmicro.<serial>.pvPower`                                     | kW         | PV (DC) Leistung                                     |
| `sigenmicro.<serial>.pv1.*` /`pv2.*`                              | V / A / kW | Spannung, Stromstärke und Leistung jedes PV-Eingangs |
| `sigenmicro.<serial>.gridVoltage` /`gridCurrent` /`gridFrequency` | V / A / Hz | Gitterseite                                          |
| `sigenmicro.<serial>.powerFactor`                                 | —          | Leistungsfaktor                                      |
| `sigenmicro.<serial>.temperature`                                 | °C         | Innentemperatur                                      |
| `sigenmicro.<serial>.insulationResistance`                        | MΩ         | Isolationswiderstand gegen Erde                      |
| `sigenmicro.<serial>.dailyYield` /`totalYield`                    | kWh        | PV-Ertrag heute / gesamt (gesamt: nur OpenAPI)       |
| `sigenmicro.<serial>.ratedPower`, `serialNumber`, `firmware`      |            | Gerätedaten                                          |
| `sigenmicro.<serial>.lastUpdate`                                  |            | Zeitpunkt der letzten Cloud-Aktualisierung           |

`info.cloudConnection` zeigt an, ob der letzte Wolkenzyklus erfolgreich war.

---

## Notschaltung – Schutz externer PV-Systeme

### Hintergrund

Die Hybrid-Wechselrichter von Sigenergy verfügen über ein optionales **Notstrom-Gateway** , das bei Ausfall des öffentlichen Stromnetzes automatisch in den Inselbetrieb schaltet. In diesem Modus erzeugt das Sigenergy-System ein eigenes lokales Wechselstromnetz, das von der Batterie gespeist wird.

Wird eine **zweite Photovoltaikanlage** – beispielsweise eine Balkonanlage, ein Mikro-Wechselrichter oder ein String-Wechselrichter eines Drittanbieters – an denselben Hausstromkreis angeschlossen, speist sie weiterhin Strom in dieses isolierte lokale Netz ein. Die meisten netzgekoppelten Wechselrichter sind für diese Situation nicht ausgelegt und können folgende Probleme verursachen:

- Überlastung des Sigenergy-Batteriemanagements
- verursachen Spannungs- oder Frequenzinstabilität im Inselnetz
- durch die ungewöhnlichen Betriebsbedingungen beschädigt werden könnten

Die einzig sichere Lösung besteht darin, das externe System **sofort vom Netz zu trennen,** wenn Sigenergy in den Inselbetrieb wechselt.

### Wie der Adapter damit umgeht

Der Adapter überwacht die `plant.onOffGridStatus` in jedem Wahlzyklus.

**Bei Netzausfall** (`onOffGridStatus` = 1 oder 2):

- Alle konfigurierten Notfallgeräte werden sofort umgeschaltet.
- Es wird eine Telegram-Benachrichtigung gesendet (optional).

**Bei Netzrückkehr** (`onOffGridStatus` = 0):

- Ein konfigurierbarer Stabilitätstimer startet (Standard: 10 Minuten).
- Wenn das Stromnetz über den gesamten Zeitraum stabil bleibt, werden die Geräte wiederhergestellt.
- Sollte das Stromnetz während der Timer-Zeit erneut ausfallen, wird der Timer verworfen und die Geräte bleiben ausgeschaltet.
- Bei erfolgreicher Wiederherstellung wird eine Telegram-Benachrichtigung versendet (optional).

### Aktivieren der Funktion

**Schritt 1 – Registerkarte „Komponenten“**\
&#x20;Prüfen Sie **das Notstrom-Gateway (netzunabhängige Umschaltung)** .\
&#x20;Die Registerkarte _„Notumschaltung“_ wird sichtbar.

**Schritt 2 – Registerkarte „Notfallumschaltung“**

#### Geräte

| Feld                              | Beschreibung                                                                                                                                     |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Stabile Verzögerung (Minuten)** | Wie lange muss das Stromnetz stabil bleiben, bevor die Geräte wieder eingeschaltet werden können? Empfohlen werden 10 Minuten.                   |
| **Gerät 1 — Objekt-ID**           | Die ioBroker-Status-ID des Hauptschalters für das externe System. Auf „Einstellen“ setzen. `false` bei Netzausfall; `true` nach stabiler Genesung. |
| **Geräte 2–4 — Objekt-ID**        | Zusätzliche optionale Geräte.                                                                                                                    |
| **Geräte 2–4 — Richtung**         | _AUS bei Fehler, EIN nach Wiederherstellung_ oder _EIN bei Fehler, AUS nach Wiederherstellung_ .                                                 |

#### Telegram-Benachrichtigungen (optional)

| Feld                                       | Beschreibung                                                                                                               |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| **Telegram-Benachrichtigungen aktivieren** | Aktiviert Benachrichtigungen bei Netzausfällen und -wiederherstellungen.                                                   |
| **Telegram-Instanz**                       | Wählen Sie die `telegram.x` Zu verwendende Adapterinstanz.                                                                  |
| **Chat-ID**                                | Optional: Beschränkung auf einen bestimmten Chat. Feld leer lassen, um die Sendung an alle konfigurierten Chats zu senden. |

### Beispiel – Balkonkraftwerk

Ein Shelly Plus 1-Relais ist in Reihe mit dem Versorgungskabel der Balkonstromanlage geschaltet. Seine ioBroker-Status-ID lautet: `shelly.0.SHPLUS1-ABC123.Relay0.Switch` Die

Konfiguration:

- **Gerät 1** : `shelly.0.SHPLUS1-ABC123.Relay0.Switch`\
  &#x20;→ Relais öffnet (`false`) bei Netzausfall, schließt (`true` nach stabiler Erholung

Das Balkonkraftwerk ist nun automatisch geschützt.

---

## VIS-Widgets

> **Hinweis:** Alle 7 Widgets werden vom separaten Adapter [ioBroker.vis-2-widgets-sigenergy](https://github.com/ssbingo/ioBroker.vis-2-widgets-sigenergy) bereitgestellt. Installieren Sie diesen Adapter zusammen mit dem hier genannten, um die Widgets in VIS-2 zu verwenden.

### Energiefluss-Widget

Zeigt den animierten Energiefluss zwischen PV → Batterie ↔ Netz → Haus.

### Akkustatus-Widget

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

- 🇩🇪 [Deutsche Dokumentation](https://github.com/ssbingo/ioBroker.sigenergy/blob/main/doc/de/README.md)
- 🇷🇺 [Dokumentation auf Russisch](https://github.com/ssbingo/ioBroker.sigenergy/blob/main/doc/ru/README.md)
- 🇳🇱 [Niederländische Dokumentation](https://github.com/ssbingo/ioBroker.sigenergy/blob/main/doc/nl/README.md)
- 🇫🇷 [Dokumentation française](https://github.com/ssbingo/ioBroker.sigenergy/blob/main/doc/fr/README.md)
- 🇮🇹 [Documentazione Italiana](https://github.com/ssbingo/ioBroker.sigenergy/blob/main/doc/it/README.md)
- 🇪🇸 [Dokumentation auf Spanisch](https://github.com/ssbingo/ioBroker.sigenergy/blob/main/doc/es/README.md)
- 🇵🇱 [Dokumentacja polska](https://github.com/ssbingo/ioBroker.sigenergy/blob/main/doc/pl/README.md)
- 🇵🇹 [Portugiesische Dokumentation](https://github.com/ssbingo/ioBroker.sigenergy/blob/main/doc/pt/README.md)
- 🇺🇦 [Ukrainische Dokumentation](https://github.com/ssbingo/ioBroker.sigenergy/blob/main/doc/uk/README.md)
- 🇨🇳[简体中文文档](https://github.com/ssbingo/ioBroker.sigenergy/blob/main/doc/zh-cn/README.md)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 3.5.1 (2026-11-17)
- (ssbingo) feat: SigenMicro (Cloud) tab — changing the cloud interface sets the matching polling interval (300 s OpenAPI, 60 s app interface), so a fast app interval is not kept by mistake
- (ssbingo) feat: SigenMicro (Cloud) tab — new button "Test login" that logs in once with the entered settings. It is required: with the cloud enabled the settings can only be saved after a successful test, and the adapter starts the cloud polling only with tested settings. **Note for 3.5.0 users:** press "Test login" once and save, otherwise the cloud polling stays off after the update
- (ssbingo) fix: admin translations added for four help texts of the extended register tab (V2.6–V2.9 groups, PSS, PID, ESS preheating) that were shown in English in every language

### 3.5.0 (2026-11-17)
- (ssbingo) feat: SigenMicro micro-inverters via the Sigenergy cloud (optional, new tab "SigenMicro (Cloud)"). Uses the official Sigen OpenAPI with the mySigen account (read-only, no onboard, about every 5 minutes) or, optionally, the unofficial mySigen app interface (faster). The micro-inverters of the account are found automatically; new states `sigenmicro.<serial>.*` (power, PV inputs, grid values, temperature, yield), `sigenmicro.totalPower` and `info.cloudConnection`. The password is stored encrypted (`encryptedNative`/`protectedNative`)
- (ssbingo) fix: admin translations completed — 11 section headers (pt, nl, fr, it, es, pl, uk, zh-cn) and the "9600 (default)" baud-rate label were still in English

### 3.4.0 (2026-11-16)
- (ssbingo) **breaking:** SigenMicro support removed. SigenMicro micro-inverters communicate via WLAN/cloud only and are not part of the Sigenergy Modbus protocol (V2.9: no device class, no slave address, no registers), so the scan could never find them and the previous register map had no source. Removed: the SigenMicro scan, the SigenMicro admin tab, the `SigenMicro only` device type, the config keys `hasSigenMicro`/`sigenMicroScanFrom`/`sigenMicroScanTo`/`sigenMicroDevices` and the states `info.scanProgress`/`info.scanStatus`. Existing `sigenmicro.*` objects are deleted on startup; an instance still set to `SigenMicro only` logs an error and stays idle. Micro yield is at most included as a total in `plant.pvPower` or `plant.statistics.thirdPartyInverterPower`
- (ssbingo) chore: Dependabot auto-merge workflow uses `pull_request` instead of `pull_request_target` (#84, via template PR #85); dependencies updated via #81, #82, #83, #87, #89, #91
- (ssbingo) chore: lockfile refreshed (`zod`) and scoped `overrides` for `glob`/`minimatch` added — `npm audit` back to 0

### 3.3.4 (2026-09-27)
- (ssbingo) chore: development dependencies updated via #79 and #80 — `@iobroker/testing` 6.2.1 → 6.2.2, `@types/node` 22.20.2 → 22.20.4. Tooling only, the adapter code is unchanged
- (ssbingo) chore: `common.news` kept at the seven entries the ioBroker repository builder retains (**[W1032]**); the full history stays in this changelog

### 3.3.3 (2026-09-12)
- (ssbingo) fix: `io-package.json` names `ssbingo <s.sternitzke@online.de>` as maintainer instead of the placeholder "ioBroker Community", which carried no contact address — reported as **[E4048]** by the ioBroker repository checker. The entry now matches `author` in `package.json`
- (ssbingo) fix: `common.news` trimmed to the seven most recent versions (**[W1032]**); the ioBroker repository builder truncates there anyway. The full history stays in this changelog

### 3.3.2 (2026-09-12)
- (ioBroker-Bot) chore: the CI test matrix now also covers Node.js 26 (22/24/26 on ubuntu, windows and macOS) — all three run green, so the adapter is ready for the October 2026 LTS
- (ssbingo) chore: `@iobroker/testing` updated from 5.3.0 to 6.2.1
- (ssbingo) chore: raised the `deepl-node` override to 1.28.0 and `adm-zip` to 0.6.1. 1.28.0 no longer depends on `js-yaml` and accepts the patched `adm-zip`, which clears the two advisories the updated tooling pulled in — `npm audit` is back to 0. Development tooling only; `npm audit --omit=dev` was 0 throughout

### 3.3.1 (2026-09-07)
- (ssbingo) fix: registers the device marks as not valid are no longer turned into plausible looking measurements. The protocol signals this by setting all bits ("Range:[0, 0xFFFFFFFE]. With value 0xFFFFFFFF, register is not valid.") and a device answers that way for a register that does not currently apply or that its firmware does not implement. The raw sentinel was scaled by the register gain, so it arrived as a reading that looks real: observed on a SigenStor EC 10.0 TP **with** a DC charger installed, `dcCharger.runningState` = 65535 (Appendix 14 only defines 0x00-0x0A), `dcCharger.dischargingCurrent` = 6553.5 A, `dcCharger.currentDischargingCapacity` = 42949672.95 kWh and `dcCharger.currentDischargingDuration` = 4294967295 s, while the neighbouring DC charger registers (rated power, PV generation, totals) returned real values. The same pattern appears outside the DC charger, e.g. `plant.currentCtrlCmdValue` = 655.35 %, `plant.mergedAlarm7` = 65535, `inverter.essMaxBatteryCellVoltage` = 65.535 V and the ESS/PCS/grid limit registers as 4294967.295 kW. Such registers now report no value instead
- (ssbingo) fix: a register that reports no value no longer feeds the statistics calculation, which keeps the last known good reading instead

### 3.3.0 (2026-09-07)
- (ssbingo) fix: when the device rejects a grouped register read with a Modbus exception, the registers of that group are now read one by one and only the register(s) the device does not implement are excluded from further polling. Previously a single unsupported register silently disabled its whole group for the rest of the adapter runtime, e.g. `dcCharger.runningState` (31513) never received a value when the discharging registers 31514–31518 of the same group were rejected
- (ssbingo) feat: new state `info.protocolVersion` (number, e.g. `2.9`) next to the textual `info.protocolLevel`, so widgets and scripts can adapt to the detected protocol version without parsing strings
- (ssbingo) feat: DC charger registers carry the protocol version that introduced them (`since`, from the V2.9 revision history: 31509–31511 V2.6, 31513 V2.8, 31514–31525 V2.9); registers newer than the detected protocol level are not requested, so a V2.8 device no longer gets its DC charger group rejected because of the V2.9 discharging registers
- (ssbingo) chore: grouped register reading moved to `lib/readGroups.js` and covered by unit tests
- (ssbingo) feat: all registers dated by the V2.9 revision history now carry `since` via a central `PROTOCOL_SINCE` table in `lib/registers.js` (plant 30088–30192 V2.6, 30194–30268 V2.7, 30276–30285 V2.8, 30272/30274/30286 V2.9, 40046–40048 V2.6, 40049–40068 V2.8, 40157–40159 V2.9, ESS preheating 50000–50183 V2.9; inverter 30613–30619 V2.6, 31066–31105 V2.8; DC charger 41002/41004 V2.9; all PSS and PID registers V2.9) and are skipped on devices with an older protocol level
- (ssbingo) fix: the one-time control register read (FC03) and the SigenMicro reader use the same per-register fallback as the input register readers; the control registers are read after the protocol detection so the version gating applies to them as well; ESS preheating polling is skipped below protocol V2.9
- (ssbingo) fix: corrected the protocol version marker in the names of the eleven cumulative energy states 30228-30268 from `(V2.8)` to `(V2.7)`; the revision history of the V2.9 protocol document lists the cumulative energy interface 30196-30268 under V2.7

### 3.2.0 (2026-09-04)
- (MMeinhardt1) feat: new state `statistics.emsWorkMode` exposing the EMS work mode as plain text, so consumers do not need the `common.states` lookup table
- (MMeinhardt1) feat: added EMS work mode 6 (Virtual Power Plant) to the register description and the mode map
- (MMeinhardt1) change: the `*HM` duration states now hold a bare `H:MM` value with unit `h`, instead of embedding an `h` suffix in the value itself
- (MMeinhardt1) fix: statistics objects are created with `extendObjectAsync`, so corrected units and roles reach installations where the object already exists
- (ssbingo) chore: admin minimum requirement lowered back to >= 7.8.23 to keep serving admin 7.x installations
- (ssbingo) fix: restored the JSDoc parameter descriptions on `_formatMinutesAsHM` to keep `npm run lint` warning-free
- (ssbingo) chore: repository checker findings — track `.vscode/settings.json` deliberately, bump `@alcalzone/release-script-plugin-license` to 5.2.2, pin `testing-action-deploy` to the major version again

### 3.1.2 (2026-08-06)
- (ssbingo) chore: resolved all 28 npm audit findings (3 critical, 11 high) — development tooling only, the published adapter is unchanged
- (ssbingo) chore: removed `@iobroker/dev-server`; it was the sole source of the critical findings via the deprecated `request` and `xmldom` packages, for which no fixed release exists. This also removes the `npm start` / `npm run watch` scripts
- (ssbingo) chore: added `overrides` lifting transitive dev dependencies onto patched versions
- (ssbingo) chore: removed `main.test.js`, an unused create-adapter template stub

### 3.1.1 (2026-08-05)
- (ssbingo) chore: security updates for transitive dependencies (brace-expansion 1.1.18, axios 1.19.0, fast-uri 3.1.5, socket.io-parser 4.2.7)

### 3.1.0 (2026-08-05)
- (MMeinhardt1) feat: statistics module improvements — new states `pvToBatteryPower`, `batteryToHousePower`, `gridImportToday`, `gridExportToday`, `currentSoc`, `currentPvPower` and `h:mm` formatted durations for all time statistics
- (MMeinhardt1) feat: daily statistics (SOC min/max, coverage time, grid energy, charging time) are restored from persisted states and now survive an adapter restart mid-day
- (MMeinhardt1) change: `batteryDailyChargeTime` now reports the cumulative time spent charging today instead of the time until the battery was first full
- (MMeinhardt1) fix: battery coverage time is accumulated incrementally instead of being derived from the capped history buffer, which only spanned ~1 hour
- (ssbingo) chore: minimum requirements raised — js-controller >= 6.0.11, admin >= 8.0.0, Node.js >= 22
- (ssbingo) fix: add missing admin i18n translations for the new battery flow power option across all 11 languages
- (ssbingo) chore: update dependencies (@iobroker/adapter-core 3.4.3, @iobroker/testing 5.3.0, @types/node 22.20.1, ws 8.21.1, actions/setup-node v7, testing-action-deploy 1.5.2)

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