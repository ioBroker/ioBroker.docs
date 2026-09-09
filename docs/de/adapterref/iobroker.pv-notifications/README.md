---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.pv-notifications/README.md
title: ioBroker PV-Benachrichtigungsadapter
hash: Zxkd51aXJw5pHEzv6vjGzcD00gJ64rryrb523LHNg2Y=
---
# ioBroker PV-Benachrichtigungsadapter

![Logo](../../../en/adapterref/iobroker.pv-notifications/admin/pv-notifications.png)

Sendet Telegram-Benachrichtigungen zum Status der PV-Batterie (voll, leer, Zwischenstände).

## Merkmale

- 🔋 **Benachrichtigung bei vollem Akku** (100 %)
- ⚠️ **Benachrichtigung bei leerem Akku** (0 %)
- 📊 **Mittlere Ladestufen** (20 %, 40 %, 60 %, 80 %) mit Angabe des Ladezustands in % und kWh
- 🌙 **Nachtmodus** (konfigurierbare Zeit, Standard: 23:00-06:00)
- 🤫 **Ruhemodus** (konfigurierbare Zeit, Standard: 12:00-15:00 Uhr)
- 📈 **Tägliche Statistiken** zu einer konfigurierbaren Zeit (Standard: 22:00 Uhr)
- 📅 **Wöchentliche Statistiken** zu konfigurierbaren Wochentagen
- 📆 **Monatliche Statistiken** (optional) an einem konfigurierbaren Tag
- 🌤️ **Wettervorhersageintegration** (erfordert OpenWeatherMap-Adapter)
- ⚡ **Empfehlungen** für hohe Produktion / hohen Verbrauch
- 📊 **Statistikdaten** vom Sourceanalytix-Adapter

## Abhängigkeiten

Für die volle Funktionalität werden folgende Adapter benötigt:

| Adapter                               | Beschreibung                                       | Erforderlich |
| ------------------------------------- | -------------------------------------------------- | ------------ |
| **Telegramm**                         | Sendet Benachrichtigungen                          | ✅ Ja         |
| **sourceanalytix**                    | Statistikdaten (Verbrauch, Einspeisung, Netzstrom) | ✅ Ja         |
| **daswetter** oder **openweathermap** | Wettervorhersage für Empfehlungen                  | ❌ Optional   |

## Konfiguration

### Telegramm

| Einstellung      | Beschreibung                                                                  |
| ---------------- | ----------------------------------------------------------------------------- |
| Telegram-Instanz | Z.B`telegram.0`                                                               |
| Telegram-Nutzer  | Kommagetrennte Liste von Namen oder IDs, z. B.`User1, User2` oder`-123456789` |

**Hinweis:** Sie können Telegram-Benutzer sowohl über **ihren Benutzernamen** (ohne @) als auch über **ihre Telegram-ID** hinzufügen (negativ für Gruppen/Kanäle).

### Datenpunkte

| Einstellung               | Beschreibung                         | Beispiel                                       |
| ------------------------- | ------------------------------------ | ---------------------------------------------- |
| Batterie-SOC              | SOC-Wert in %                        | `modbus.0.holdingRegisters.40083_Batterie_SOC` |
| PV-Strom                  | Aktuelle Leistung in W               | `javascript.0.Solar.Sungrow.Leistung`          |
| Gesamtproduktion          | Produktion heute in kWh              | `javascript.0.Solar.Sungrow.Gesamtproduktion`  |
| Zuleitung                 | Einspeisebetrag heute in kWh         | `sourceanalytix.0...Einspeisung...`            |
| Verbrauch                 | Heutiger Verbrauch in kWh            | `sourceanalytix.0...Hausverbrauch...`          |
| Netzstrom                 | Netzstrom heute in kWh               | `sourceanalytix.0...Netzbezug...`              |
| Produktion diesen Monat   | Monatliche Produktion (kWh)          | `sourceanalytix.0...Produktion.currentMonth`   |
| Verbrauch in diesem Monat | Monatlicher Verbrauch (kWh)          | `sourceanalytix.0...Verbrauch.currentMonth`    |
| Füttern Sie diesen Monat  | Monatliche Einspeisevergütung (kWh)  | `sourceanalytix.0...Einspeisung.currentMonth`  |
| Netzstrom diesen Monat    | Monatliche Netzstromaufnahme (kWh)   | `sourceanalytix.0...Netzbezug.currentMonth`    |
| Produktion diese Woche    | Wöchentliche Produktion (kWh)        | `sourceanalytix.0...Produktion.currentWeek`    |
| Verbrauch diese Woche     | Wöchentlicher Verbrauch (kWh)        | `sourceanalytix.0...Verbrauch.currentWeek`     |
| Füttern Sie diese Woche   | Wöchentliche Einspeiseleistung (kWh) | `sourceanalytix.0...Einspeisung.currentWeek`   |
| Stromnetz diese Woche     | Wöchentliche Netzstromaufnahme (kWh) | `sourceanalytix.0...Netzbezug.currentWeek`     |

### Wetter (optional)

| Einstellung             | Beschreibung                  | Beispiel (daswetter)                      | Beispiel (OpenWeatherMap)          |
| ----------------------- | ----------------------------- | ----------------------------------------- | ---------------------------------- |
| Wetter heute            | Wetterbeschreibung heute      | `daswetter.0.Day0.forecast.currentSymbol` | `openweathermap.0.forecast.0.text` |
| Heutige Temperatur (°C) | Temperatur heute              | `daswetter.0.Day0.forecast.maxTemp`       | `openweathermap.0.forecast.0.temp` |
| Wetter morgen           | Wetterbeschreibung für morgen | `daswetter.0.Day1.forecast.currentSymbol` | `openweathermap.0.forecast.1.text` |
| Temperatur morgen (°C)  | Temperatur morgen             | `daswetter.0.Day1.forecast.maxTemp`       | `openweathermap.0.forecast.1.temp` |

**Hinweis:** Die Felder`Weather Today` Und`Weather Tomorrow` Kann alternativ verwendet werden, wenn der Wetteradapter verschiedene Formate unterstützt. Für optimale Kompatibilität empfehlen wir die Verwendung von`Weather Text` Felder.

### Batterie

| Einstellung                        | Beschreibung              | Standard |
| ---------------------------------- | ------------------------- | -------- |
| Batteriekapazität                  | Kapazität in Wh           | `21000`  |
| Schwellenwert VOLL                 | SOC für "vollständig"     | `100`    |
| Schwellenwert LEER                 | SOC für "leer"            | `0`      |
| Zurücksetzen auf VOLLSTÄNDIG unten | Zurücksetzen, falls SOC < | `95`     |
| Leeren zurücksetzen (siehe oben)   | Zurücksetzen, falls SOC > | `5`      |

### Mittleres Niveau

| Einstellung                             | Beschreibung                            | Standard      |
| --------------------------------------- | --------------------------------------- | ------------- |
| Mittleres Niveau                        | durch Kommas getrennte SOC-Stufen       | `20,40,60,80` |
| Mindestintervall VOLL                   | Minuten zwischen den Benachrichtigungen | `10`          |
| Mindestintervall LEER                   | Minuten zwischen den Benachrichtigungen | `5`           |
| Mindestintervall Zwischen               | Minuten zwischen den Benachrichtigungen | `30`          |
| Nachtmodus aktivieren                   | Kontrollkästchen für den Nachtmodus     | `true`        |
| Nachtmodus starten                      | Startzeit (Format: HH:MM)               | `23:00`       |
| Nachtmodus beendet                      | Endzeit (Format: HH:MM)                 | `06:00`       |
| Nachtmodus bei 0 % Akkustand ignorieren | Immer bei 0 % benachrichtigen           | `true`        |
| Leiser Modus aktivieren                 | Kontrollkästchen für den Leisemodus     | `false`       |
| Leiser Modus starten                    | Startzeit (Format: HH:MM)               | `12:00`       |
| Ende des Ruhemodus                      | Endzeit (Format: HH:MM)                 | `15:00`       |

### Statistiken

| Einstellung                       | Beschreibung                                | Standard            |
| --------------------------------- | ------------------------------------------- | ------------------- |
| Tägliche Statistikzeit            | Format HH:MM                                | `22:00`             |
| Wochentagsstatistik               | 0 = Montag, 1 = Dienstag, ..., 6 = Sonntag  | `0` (Montag)        |
| Wöchentliche Statistiken          | Format HH:MM                                | `10:00`             |
| Monatliche Statistiken aktivieren | Kontrollkästchen für monatliche Statistiken | `false`             |
| Tag des Monats                    | 1-31                                        | `1` (1. des Monats) |
| Monatliche Statistiken            | Format HH:MM                                | `09:00`             |

## Beispiele

### Akku voll (100 %)

```
11:45 - 🔋 *Battery FULL* (100%)

⚡ Current Production: 5356 W
🏠 Current Consumption: 1200 W
☀️ Production Today: 12.5 kWh
🔌 Feed-in Today: 8.2 kWh
🌤️ Tomorrow: ☀️ Sunny

🚗 Now ideal for: Electric car, washing machine, dishwasher!
```

### Mittelstufe (60 %)

```
11:51 - 🔋 Battery at 60% (12.6 kWh) ⬆️
⚡ Production: 5356 W
```

### Tagesstatistik (22:00)

```
22:00 - 📊 *Daily Statistics PV System*
━━━━━━━━━━━━━━━━━━━━━━
🔋 Current Charge Level: 85%
⚡ Current Energy: 17.9 kWh (21.0 kWh Total)
━━━━━━━━━━━━━━━━━━━━━━
☀️ Production: 12.5 kWh
🏠 Own Consumption: 8.2 kWh (65.6%)
🔌 Feed-in: 4.3 kWh
⚡ Grid Power: 2.1 kWh
```

### Monatsstatistik (1. des Monats um 09:00 Uhr)

```
09:00 - 📊 *Monthly Statistics PV System*
━━━━━━━━━━━━━━━━━━━━━━
🔋 Full Cycles This Month: 28
📉 Empty Cycles This Month: 15
━━━━━━━━━━━━━━━━━━━━━━
☀️ Production: 345.2 kWh
🏠 Own Consumption: 287.5 kWh (83.3%)
🔌 Feed-in: 57.7 kWh
⚡ Grid Power: 23.4 kWh
━━━━━━━━━━━━━━━━━━━━━━
```

## Staaten

Der Adapter erzeugt unter folgenden Bedingungen die folgenden Zustände:`pv-notifications.0` :

### Aktuelle Statistiken

| Zustand                       | Typ    | Beschreibung                                         |
| ----------------------------- | ------ | ---------------------------------------------------- |
| `statistics.fullCyclesToday`  | Nummer | Heute vollständige Zyklen                            |
| `statistics.emptyCyclesToday` | Nummer | Heute leere Zyklen                                   |
| `statistics.maxSOCToday`      | Nummer | Max SOC heute                                        |
| `statistics.minSOCToday`      | Nummer | Min SOC heute                                        |
| `statistics.fullCyclesWeek`   | Nummer | Diese Woche werden vollständige Zyklen durchgeführt. |
| `statistics.emptyCyclesWeek`  | Nummer | Diese Woche keine freien Zyklen                      |
| `statistics.currentSOC`       | Nummer | Aktueller SOC                                        |
| `statistics.currentEnergyKWh` | Nummer | Aktuelle Energie in kWh                              |

### Gespeicherte Daten des Vormonats (für die monatliche Statistik)

| Zustand                           | Typ    | Beschreibung                         |
| --------------------------------- | ------ | ------------------------------------ |
| `statistics.lastMonthProduction`  | Nummer | Produktion im letzten Monat (kWh)    |
| `statistics.lastMonthConsumption` | Nummer | Verbrauch im letzten Monat (kWh)     |
| `statistics.lastMonthFeedIn`      | Nummer | Einspeisemenge des Vormonats (kWh)   |
| `statistics.lastMonthGridPower`   | Nummer | Netzstrom im letzten Monat (kWh)     |
| `statistics.lastMonthFullCycles`  | Nummer | Vollständige Zyklen im letzten Monat |
| `statistics.lastMonthEmptyCycles` | Nummer | Leere Zyklen im letzten Monat        |

### Gespeicherte Daten der letzten Woche (für die Wochenstatistik)

| Zustand                          | Typ    | Beschreibung                                          |
| -------------------------------- | ------ | ----------------------------------------------------- |
| `statistics.lastWeekProduction`  | Nummer | Produktion letzte Woche (kWh)                         |
| `statistics.lastWeekConsumption` | Nummer | Verbrauch letzte Woche (kWh)                          |
| `statistics.lastWeekFeedIn`      | Nummer | Einspeisemenge der letzten Woche (kWh)                |
| `statistics.lastWeekGridPower`   | Nummer | Netzstrom der letzten Woche (kWh)                     |
| `statistics.lastWeekFullCycles`  | Nummer | Letzte Woche wurden vollständige Zyklen durchgeführt. |
| `statistics.lastWeekEmptyCycles` | Nummer | Letzte Woche waren die Zyklen leer.                   |

## Anmerkung zu den Monats- und Wochenstatistiken

**Wichtig:** Der Adapter speichert automatisch die Daten des letzten Monats und der letzten Woche in den USA.

### Monatliche Statistiken

- Die monatlichen Statistiken werden am **konfigurierten Tag** versendet (Standard: 1. des Monats).
- Der Adapter **speichert automatisch** die aktuellen Monatsdaten, bevor die Statistiken zurückgesetzt werden.
- Statistiken verwenden **gespeicherte Daten** von`statistics.lastMonth*` Staaten
- **Konfiguration:** Stellen Sie sicher, dass die monatlichen Statistiken **nach dem letzten Tag des Monats** versendet werden (z. B. am 1. um 09:00 Uhr).

### Wöchentliche Statistiken

- Die wöchentlichen Statistiken werden am **konfigurierten Wochentag** versendet (Standard: Montag).
- Der Adapter **speichert automatisch** die aktuellen Wochendaten, bevor die Statistiken zurückgesetzt werden.
- Statistiken verwenden **gespeicherte Daten** von`statistics.lastWeek*` Staaten
- **Konfiguration:** Wochentag einstellen (0=Mo, 1=Di, ..., 6=So)

## Konfigurationsbeispiel (openweathermap)

### Wetterdatenpunkte konfigurieren

Wenn Sie den **OpenWeatherMap-** Adapter verwenden, konfigurieren Sie die folgenden Felder:

```
Weather Today:          openweathermap.0.forecast.0.text
Temperature Today:      openweathermap.0.forecast.0.temp
Weather Tomorrow:       openweathermap.0.forecast.1.text
Temperature Tomorrow:   openweathermap.0.forecast.1.temp
```

### Alternative: Daswetter-Adapter

```
Weather Today:          daswetter.0.Day0.forecast.currentSymbol
Temperature Today:      daswetter.0.Day0.forecast.maxTemp
Weather Tomorrow:       daswetter.0.Day1.forecast.currentSymbol
Temperature Tomorrow:   daswetter.0.Day1.forecast.maxTemp
```

### Beispielausgabe mit Wetterdaten

**Tagesstatistik:**

```
📊 *Daily Statistics PV System*
━━━━━━━━━━━━━━━━━━━━━━
🔋 Current Charge Level: 85%
⚡ Current Energy: 17.9 kWh (21.0 kWh Total)
━━━━━━━━━━━━━━━━━━━━━━
☀️ Production: 45.2 kWh
🏠 Own Consumption: 32.1 kWh (71%)
🔌 Feed-in: 13 kWh
⚡ Grid Power: 2 kWh
━━━━━━━━━━━━━━━━━━━━━━
🌤️ *Weather Tomorrow:* ☀️ Sunny 22.5°C
☀️ Good PV production expected!
```

**Wöchentliche Statistiken:**

```
📊 *Weekly Statistics PV System*
━━━━━━━━━━━━━━━━━━━━━━
🔋 Full Cycles Last Week: 5
📉 Empty Cycles Last Week: 3
━━━━━━━━━━━━━━━━━━━━━━
☀️ Production: 312.5 kWh
🏠 Own Consumption: 224.8 kWh (72%)
🔌 Feed-in: 87.7 kWh
⚡ Grid Power: 45.3 kWh
━━━━━━━━━━━━━━━━━━━━━━
💡 A healthy cycle per day is normal.
🔋 Check battery settings if many cycles.
```

### Monatsstatistik (1. des Monats um 09:00 Uhr)

```
09:00 - 📊 *Monthly Statistics PV System*
━━━━━━━━━━━━━━━━━━━━━━
🔋 Full Cycles Last Month: 28
📉 Empty Cycles Last Month: 15
━━━━━━━━━━━━━━━━━━━━━━
☀️ Production: 1245.7 kWh
🏠 Own Consumption: 897.3 kWh (72%)
🔌 Feed-in: 348.4 kWh
⚡ Grid Power: 185.2 kWh
━━━━━━━━━━━━━━━━━━━━━━
```

## Nachtmodus & Leiser Modus

### Nachtmodus (konfigurierbar)

Zwischen **23:00 und 06:00 Uhr** (konfigurierbar) werden die folgenden Benachrichtigungen unterdrückt:

- ❌ Akku voll (100 %)
- ❌ Mittlere Stufen (20 %, 40 %, 60 %, 80 %)

Folgende Benachrichtigung wird **immer** versendet:

- ✅ Akku leer (0 %) – wenn „Nachtmodus bei 0 % Akku ignorieren“ aktiviert ist

### Leiser Modus (konfigurierbar)

Zwischen **12:00 und 15:00 Uhr** (konfigurierbar) werden **alle** Benachrichtigungen unterdrückt:

- ❌ Akku voll (100 %)
- ❌ Batterie leer (0%)
- ❌ Mittlere Stufen (20 %, 40 %, 60 %, 80 %)

**Hinweis:** Der Ruhemodus unterdrückt alle Benachrichtigungen, auch bei 0 % Akkustand. Nutzen Sie ihn, wenn Sie ungestört sein möchten (z. B. beim Mittagsschlaf oder in Besprechungen).

## Autor

Alex1808 via LLM: Qwen

<sadam6752@gmail.com>

## Dokumentation in anderen Sprachen

- [🇬🇧 Englisch](/#/adapters/pv-notifications)
- [🇩🇪 Deutsch](https://github.com/sadam6752-tech/ioBroker.pv-notifications/blob/main/doc/de/README.md)
- [🇷🇺 Русский](https://github.com/sadam6752-tech/ioBroker.pv-notifications/blob/main/doc/ru/README.md)

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 1.2.29
* (FIX) Corrupted UTF-8 separator lines in the monthly stats message (showed as question marks in Telegram)
* (FIX) Corrupted Russian translations for "Current charge level" and "Own consumption"
* (FIX) Weather today in daily stats now shows the temperature as "(currently: X°C)" instead of implying a daily value

### 1.2.28
* (FIX) Migrate i18n to short format ({lang}.json); trim news to 7 entries

### 1.2.27
* (FIX) CI: update package-lock.json to include all eslint peer dependencies

### 1.2.26 (2026-08-01)
* (FIX) W5604: add missing i18n keys for sunset stats in 8 languages (es, fr, it, nl, pl, pt, uk, zh-cn)
* (FIX) W6019: move old changelog entries to CHANGELOG_OLD.md
* (FIX) W6021: move License section to end of README
* (FIX) W6030: add 1.2.25 changelog entry to README

### 1.2.25 (2026-08-01)
* (FIX) Update @iobroker/adapter-core to 3.4.3
* (FIX) Remove old news entry 1.2.18 (max 7 entries allowed)

### 1.2.24 (2026-03-17)
* (FIX) Added missing uk translations to news entries, fixed prettier formatting in main.js

### 1.2.23 (2026-03-17)
* (FIX) Statistics section layout: daily time, sunset checkbox and sunset object aligned on one row

### 1.2.22 (2026-03-17)
* (ADD) Sunset-based daily statistics: optional checkbox to send daily stats at sunset time from a configurable object instead of fixed time

### 1.2.21 (2026-03-17)
* (FIX) Use extendObject instead of setObjectNotExists for states with unit/role to update existing instances

### 1.2.20 (2026-03-17)
* (FIX) Remove unused admin files, reduce info logs to debug, English state names with units, channel objects for statistics/info, button read:false, this.setInterval, translate fallback to English

### 1.2.19 (2026-03-16)
* (FIX) Added v1.2.18 entry to news section in io-package.json

### 1.2.18 (2026-03-16)
* (FIX) Missing await in onBatterySOCChange, null-check in buildTestMessage, safe intermediateSteps parsing, remove dead code

> For older changelog entries see [CHANGELOG_OLD.md](https://github.com/sadam6752-tech/ioBroker.pv-notifications/blob/main/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2025-2026 Alex1808 via LLM: Qwen sadam6752@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.