---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.pv-notifications/README.md
title: ioBroker PV-Benachrichtigungsadapter
hash: cDB3mf0IE3nfderpAMyyLp+pkGlkcYC2VLbhKGwcQG4=
---
# IoBroker PV-Benachrichtigungsadapter
![Logo](../../../en/adapterref/iobroker.pv-notifications/admin/pv-notifications.png)

Sendet Telegram-Benachrichtigungen zum Status der PV-Batterie (voll, leer, Zwischenstände).

## Merkmale
- 🔋 **Benachrichtigung bei vollem Akku** bei 100 %
- ⚠️ **Benachrichtigung bei leerem Akku** bei 0 %
- 📊 **Zwischenstufen** (20 %, 40 %, 60 %, 80 %) mit Ladezustand in % und kWh
- 🌙 **Nachtmodus** (konfigurierbare Zeit, Standard: 23:00-06:00)
- 🤫 **Ruhemodus** (konfigurierbare Zeit, Standard: 12:00-15:00 Uhr)
- 📈 **Tägliche Statistiken** zu einer konfigurierbaren Zeit (Standard: 22:00 Uhr)
- 📅 **Wöchentliche Statistiken** zu konfigurierbaren Wochentagen
- 📆 **Monatliche Statistiken** (optional) an einem konfigurierbaren Tag
- 🌤️ **Wettervorhersage**-Integration (erfordert OpenWeatherMap-Adapter)
- ⚡ **Empfehlungen** für hohe Produktion / hohen Verbrauch
- 📊 **Statistikdaten** vom Sourceanalytix-Adapter

## Abhängigkeiten
Für die volle Funktionalität werden folgende Adapter benötigt:

| Adapter | Beschreibung | Erforderlich |
|---------|-------------|----------|
| **Telegram** | Sendet Benachrichtigungen | ✅ Ja |
| **sourceanalytix** | Statistikdaten (Verbrauch, Einspeisung, Netzstrom) | ✅ Ja |
| **daswetter** oder **openweathermap** | Wettervorhersage für Empfehlungen | ❌ Optional |

## Konfiguration
### Telegram
| Schauplatz | Beschreibung |
|---------|-------------|
| Telegram-Instanz | Z. B. `telegram.0` |
| Telegram-Nutzer | Durch Kommas getrennte Liste von Namen oder IDs, z. B. `User1, User2` oder `-123456789` |

**Hinweis:** Sie können Telegram-Nutzer sowohl über ihren **Benutzernamen** (ohne @) als auch über ihre **Telegram-ID** hinzufügen (bei Gruppen/Kanälen negativ).

### Datenpunkte
| Einstellung | Beschreibung | Beispiel |
|---------|-------------|---------|
| Batterieladestand (SOC) | SOC-Wert in % | `modbus.0.holdingRegisters.40083_Batterie_SOC` |
| Gesamtproduktion | Heutige Produktion in kWh | `javascript.0.Solar.Sungrow.Gesamtproduktion` |
| Einspeiseleistung | Heutige Einspeiseleistung in kWh | `sourceanalytix.0...Einspeisung...` |
| Verbrauch | Heutiger Verbrauch in kWh | `sourceanalytix.0...Hausverbrauch...` |
| Netzstrom | Netzstrom heute in kWh | `sourceanalytix.0...Netzbezug...` |
| Produktion diesen Monat | Monatliche Produktion (kWh) | `sourceanalytix.0...Produktion.currentMonth` |
| Verbrauch diesen Monat | Monatlicher Verbrauch (kWh) | `sourceanalytix.0...Verbrauch.currentMonth` |
| Einspeisemenge diesen Monat | Monatliche Einspeisemenge (kWh) | `sourceanalytix.0...Einspeisung.currentMonth` |
| Netzstrom diesen Monat | Monatlicher Netzstrom (kWh) | `sourceanalytix.0...Netzbezug.currentMonth` |
| Produktion diese Woche | Wöchentliche Produktion (kWh) | `sourceanalytix.0...Produktion.currentWeek` |
| Verbrauch diese Woche | Wöchentlicher Verbrauch (kWh) | `sourceanalytix.0...Verbrauch.currentWeek` |
| Einspeisemenge diese Woche | Wöchentliche Einspeisemenge (kWh) | `sourceanalytix.0...Einspeisung.currentWeek` |
| Netzstrom diese Woche | Wöchentlicher Netzstrom (kWh) | `sourceanalytix.0...Netzbezug.currentWeek` |
| Netzstrom diese Woche | Wöchentlicher Netzstrom (kWh) | `sourceanalytix.0...Netzbezug.currentWeek` |

### Wetter (optional)
| Einstellungen | Beschreibung | Beispiel (daswetter) | Beispiel (openweathermap) |
|---------|-------------|---------------------|-------------------------|
| Wetter heute | Wetterbeschreibung heute | `daswetter.0.Day0.forecast.currentSymbol` | `openweathermap.0.forecast.0.text` |
| Wetter morgen | Wetterbeschreibung für morgen | `daswetter.0.Day1.forecast.currentSymbol` | `openweathermap.0.forecast.1.text` |
| Temperatur morgen (°C) | Temperatur morgen | `daswetter.0.Day1.forecast.maxTemp` | `openweathermap.0.forecast.1.temp` |
| Temperatur morgen (°C) | Temperatur morgen | `daswetter.0.Day1.forecast.maxTemp` | `openweathermap.0.forecast.1.temp` |

**Hinweis:** Die Felder `Weather Today` und `Weather Tomorrow` können alternativ verwendet werden, falls der Wetteradapter unterschiedliche Formate bereitstellt. Für optimale Kompatibilität empfehlen wir die Verwendung der Felder `Weather Text`.

### Batterie
| Einstellungen | Beschreibung | Standardwerte |
|---------|-------------|---------|
| Batteriekapazität | Kapazität in Wh | `21000` |
| Schwellenwert LEER | SOC für "leer" | `0` |
| Vollständig zurücksetzen unten | Zurücksetzen, falls SOC < | `95` |
| Leeren Zustand zurücksetzen (siehe oben) | Zurücksetzen, falls SOC > | `5` |
| Leeren Code oben zurücksetzen | Zurücksetzen, falls SOC > | `5` |

### Mittlere Stufen
| Einstellungen | Beschreibung | Standardwerte |
|---------|-------------|---------|
| Mittlere Stufen | Durch Komma getrennte SOC-Stufen | `20,40,60,80` |
| Mindestintervall LEER | Minuten zwischen Benachrichtigungen | `5` |
| Mindestintervall Mittel | Minuten zwischen Benachrichtigungen | `30` |
| Nachtmodus aktivieren | Kontrollkästchen für Nachtmodus | `true` |
| Nachtmodus starten | Startzeit (Format: HH:MM) | `23:00` |
| Nachtmodus Ende | Endzeit (Format: HH:MM) | `06:00` |
| Nachtmodus bei 0 % Akku ignorieren | Immer bei 0 % benachrichtigen | `true` |
| Stille-Modus aktivieren | Kontrollkästchen für Stille-Modus | `false` |
| Start im Ruhemodus | Startzeit (Format: HH:MM) | `12:00` |
| Ende des Ruhemodus | Endzeit (Format: HH:MM) | `15:00` |
| Ende des Ruhemodus | Endzeit (Format: HH:MM) | `15:00` |

### Statistiken
| Einstellungen | Beschreibung | Standardwerte |
|---------|-------------|---------|
| Tägliche Statistikzeit | Format HH:MM | `22:00` |
| Wöchentliche Statistiken | Format HH:MM | `10:00` |
| Monatliche Statistiken aktivieren | Kontrollkästchen für monatliche Statistiken | `false` |
| Tag des Monats | 1-31 | `1` (1. des Monats) |
| Monatliche Zeitstatistik | Format HH:MM | `09:00` |
| Zeit Monatliche Statistiken | Format HH:MM | `09:00` |

## Beispiele
### Akku voll (100%)
```
11:45 - 🔋 *Battery FULL* (100%)

⚡ Current Production: 5356 W
🏠 Current Consumption: 1200 W
☀️ Production Today: 12.5 kWh
🔌 Feed-in Today: 8.2 kWh
🌤️ Tomorrow: ☀️ Sunny

🚗 Now ideal for: Electric car, washing machine, dishwasher!
```

### Mittelstufe (60%)
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
Der Adapter erzeugt die folgenden Zustände unter `pv-notifications.0`:

### Aktuelle Statistiken
| Bundesland | Typ | Beschreibung |
|-------|------|-------------|
| `statistics.fullCyclesToday` | Anzahl | Vollständige Zyklen heute |
| `statistics.maxSOCToday` | Nummer | Maximaler Ladezustand heute |
| `statistics.minSOCToday` | Zahl | Mindest-SOC heute |
| `statistics.fullCyclesWeek` | Anzahl | Vollständige Zyklen diese Woche |
| `statistics.emptyCyclesWeek` | Anzahl | Leere Zyklen diese Woche |
| `statistics.currentSOC` | Nummer | Aktueller SOC |
| `statistics.currentEnergyKWh` | Nummer | Aktuelle Energie in kWh |
| `statistics.currentEnergyKWh` | Zahl | Aktuelle Energie in kWh |

### Gespeicherte Daten des letzten Monats (für die Monatsstatistik)
| Bundesland | Typ | Beschreibung |
|-------|------|-------------|
| `statistics.lastMonthProduction` | Nummer | Produktion des letzten Monats (kWh) |
| `statistics.lastMonthFeedIn` | Nummer | Einspeisemenge des Vormonats (kWh) |
| `statistics.lastMonthGridPower` | Nummer | Netzstrom letzten Monat (kWh) |
| `statistics.lastMonthFullCycles` | Anzahl | Vollständige Zyklen im letzten Monat |
| `statistics.lastMonthEmptyCycles` | Anzahl | Leere Zyklen im letzten Monat |
| `statistics.lastMonthEmptyCycles` | Anzahl | Leere Zyklen im letzten Monat |

### Gespeicherte Daten der letzten Woche (für die Wochenstatistik)
| Bundesland | Typ | Beschreibung |
|-------|------|-------------|
| `statistics.lastWeekProduction` | Zahl | Produktion letzte Woche (kWh) |
| `statistics.lastWeekFeedIn` | Nummer | Einspeisemenge letzte Woche (kWh) |
| `statistics.lastWeekGridPower` | Zahl | Netzstrom der letzten Woche (kWh) |
| `statistics.lastWeekFullCycles` | Anzahl | Vollständige Zyklen letzte Woche |
| `statistics.lastWeekEmptyCycles` | Anzahl | Leere Zyklen letzte Woche |
| `statistics.lastWeekEmptyCycles` | Anzahl | Leere Zyklen letzte Woche |

## Hinweis zu Monats- und Wochenstatistiken
**Wichtig:** Der Adapter speichert automatisch die Daten des letzten Monats und der letzten Woche in den USA.

### Monatliche Statistiken
- Die monatlichen Statistiken werden am **konfigurierten Tag** versendet (Standard: 1. des Monats).
Der Adapter speichert die aktuellen Monatsdaten **automatisch**, bevor die Statistiken zurückgesetzt werden.
- Die Statistiken verwenden **gespeicherte Daten** aus den Zuständen von `statistics.lastMonth*`.
- **Konfiguration:** Stellen Sie sicher, dass die monatlichen Statistiken **nach dem letzten Tag des Monats** versendet werden (z. B. am 1. um 09:00 Uhr).

### Wöchentliche Statistiken
- Die wöchentlichen Statistiken werden am **konfigurierten Wochentag** versendet (Standard: Montag).
Der Adapter speichert die aktuellen Wochendaten **automatisch**, bevor die Statistik zurückgesetzt wird.
- Die Statistiken verwenden **gespeicherte Daten** aus den Zuständen von `statistics.lastWeek*`.
- **Konfiguration:** Wochentag einstellen (0=Mo, 1=Di, ..., 6=So)

## Konfigurationsbeispiel (openweathermap)
### Wetterdatenpunkte konfigurieren
Wenn Sie den **openweathermap**-Adapter verwenden, konfigurieren Sie die folgenden Felder:

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
**Tägliche Statistiken:**

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
Zwischen **23:00 und 06:00** (konfigurierbar) werden die folgenden Benachrichtigungen unterdrückt:

- ❌ Akku voll (100%)
- ❌ Mittlere Stufen (20 %, 40 %, 60 %, 80 %)

Folgende Benachrichtigung wird **immer** versendet:

- ✅ Akku leer (0 %) – wenn „Nachtmodus bei 0 % Akku ignorieren“ aktiviert ist

### Leiser Modus (konfigurierbar)
Zwischen **12:00 und 15:00 Uhr** (konfigurierbar) werden **alle** Benachrichtigungen unterdrückt:

- ❌ Akku voll (100%)
- ❌ Batterie leer (0%)
- ❌ Mittlere Stufen (20 %, 40 %, 60 %, 80 %)

**Hinweis:** Der Ruhemodus unterdrückt alle Benachrichtigungen, auch bei 0 % Akkustand. Nutzen Sie ihn, wenn Sie ungestört sein möchten (z. B. beim Mittagsschlaf oder in Besprechungen).

## Autor
Alex1808 via LLM: Qwen

sadam6752@gmail.com

## Dokumentation in anderen Sprachen
- [🇬🇧 Englisch](README.md)
- [🇩🇪 Deutsch](doc/de/README.md)
- [🇷🇺 Русский](doc/ru/README.md)

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

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

### 1.2.17 (2026-03-15)
* (FIX) Removed old versions from common.news to comply with W1032 (maximum 7 versions)

### 1.2.16 (2026-03-14)
* (FIX) Removed empty line in battery full message for improved formatting

### 1.2.15 (2026-03-08)
* (ADD) Added separator lines to battery full/empty and intermediate messages for improved readability

### 1.2.14 (2026-03-06)
* (FIX) Fixed intermediate message formatting: Removed extra line break before weather data (weather today appears directly below separator)

### 1.2.13 (2026-03-03)
* (ADD) Added current production (W) to test message, daily statistics and intermediate messages with improved layout
* (FIX) README.md Changelog updated for repository checker (E6006 fix)

### 1.2.11 (2026-03-02)

* (FIX) Daily statistics: Self-consumption cannot be negative (Math.max(0, totalProd - feedIn))
* (FIX) Daily statistics: Added weather today to message (in addition to weather tomorrow)
* (FIX) Weather error logging improved (warn instead of debug for better visibility)

### 1.2.10 (2026-03-02)

* (FIX) Fixed duplicate news entry in io-package.json (E1036/E2005 fix)
* (FIX) Added full translations for common.news (pt, nl, fr, it, es, pl, uk, zh-cn)
* (FIX) Reduced news entries to 7 versions (W1032 fix)

### 1.2.7 (2026-03-02)

* (FIX) Fixed io-package.json JSON syntax error (invalid duplicate news section removed)

### 1.2.6 (2026-03-02)

* (FIX) Added size attributes (xs, xl) for monthlyStatsDay, monthlyStatsTime, weatherEnabled, weatherInIntermediate, weatherInDailyStats, highProduction, highConsumption fields (E5507 fix)

### 1.2.5 (2026-03-02)

* (FIX) Added size attributes (xs, xl) for monthlyStatsEnabled, minIntervalIntermediate, statsDayTime, statsWeekDay, statsWeekTime fields (E5507 fix)

* (FIX) Added LICENSE file (E190 fix)
* (FIX) Copyright formatting: Added two trailing spaces to copyright lines in README.md, doc/de/README.md, doc/ru/README.md (W6009/W6011/W7004 fix)

### 1.2.3 (2026-03-02)

* (FIX) Added size attributes (xs, xl) for minIntervalFull, minIntervalEmpty, intermediateSteps, quietModeStart, quietModeEnd fields (E5507 fix)

### 1.2.2 (2026-03-02)

* (FIX) Weekly statistics: Now uses weeklyProduction/weeklyConsumption/weeklyFeedIn/weeklyGridPower fields instead of daily values

### 1.2.1 (2026-03-01)

* (FIX) Added size attributes (xs, xl) for night mode and quiet mode fields in admin UI (E5507 fix)

### 1.2.0 (2026-03-01)

* (ADD) common.news section added to io-package.json for repository checker (E136 fix)

### 1.1.1 (2026-03-01)

* (FIX) Intermediate messages: Flag reset condition changed from `> 2` to `>= 2` for proper 2% tolerance

### 1.0.93 (2026-02-27)

* (FIX) size attributes (xs, xl) added for number fields in jsonConfig.json (E5507)
* (FIX) VSCode schema definitions updated for io-package.json and jsonConfig.json (W4040, W4042)

### 1.0.92 (2026-02-27)

* (ADD) VSCode settings added with JSON schema definitions (S4036)

### 1.0.91 (2026-02-27)

* (FIX) Old news removed from io-package.json (E2004, W1032)
* (FIX) size attributes (xs, xl) added for all objectId fields in jsonConfig.json (E5507)
* (FIX) .commitinfo added to .gitignore (S9006)

### 1.0.90 (2026-02-27)

* (FIX) JSDoc parameter descriptions added for all functions

### 1.0.89 (2026-02-27)

* (FIX) createState replaced with setObjectNotExists (W5034)
* (FIX) size attributes (xs, xl) added to jsonConfig.json (E5507)
* (FIX) Dependencies updated (@iobroker/adapter-core ^3.3.2, @alcalzone/release-script ^5.1.1)
* (FIX) admin dependency updated to >=7.6.20 (W1056)
* (FIX) Translations added for titleLang, desc, news (W1027, W1034, W1054)

### 1.0.85 (2026-02-26)
* (FIX) Deprecated common.main removed from io-package.json (W1084)

### 1.0.84 (2026-02-26)
* (FIX) Node.js version updated to >=18
* (FIX) Dependencies updated (@iobroker/adapter-core to 3.2.3, @iobroker/testing to 5.2.2)
* (FIX) io-package.json schema fixed (licenseInformation added, deprecated fields removed)
* (FIX) setInterval with clearInterval added for proper cleanup
* (FIX) js-controller dependency updated to >=6.0.11
* (FIX) admin dependency updated to >=7.6.17

### 1.0.83 (2026-02-26)
* (FIX) createState deprecated fixed (setObjectNotExists)
* (FIX) All log messages translated to English
* (FIX) README.md translated (EN + doc/de/ + doc/ru/ structure)
* (FIX) Node.js 24 added to test matrix
* (FIX) Manual installation guide removed

### 1.0.82 (2026-02-25)
* (FIX) Copilot infrastructure and AI assistant guidelines added

### 1.0.81 (2026-02-25)
* (FIX) create-adapter infrastructure added (GitHub Actions, Dependabot, ESLint, Tests)

### 1.0.80 (2026-02-25)
* (FIX) Unified intermediate notifications format (all levels show charging/discharging status)

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