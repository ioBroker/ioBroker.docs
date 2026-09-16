---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.utility-monitor/README.md
title: ioBroker.utility-monitor
hash: REJ2ZAflTmFNCzNuSzzawcSh94c7VvZk2riZ/aai/cg=
---
![Logo](../../../en/adapterref/iobroker.utility-monitor/admin/utility-monitor.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.utility-monitor.svg)
![GitHub-Veröffentlichung](https://img.shields.io/github/v/release/fischi87/ioBroker.utility-monitor)
![GitHub-Lizenz](https://img.shields.io/github/license/fischi87/ioBroker.utility-monitor)
![Test und Freigabe](https://github.com/fischi87/ioBroker.utility-monitor/workflows/Test%20and%20Release/badge.svg)
![Spenden](https://img.shields.io/badge/Donate-PayPal-blue.svg)

# ioBroker.utility-monitor

> 🇩🇪 **Deutsche Fassung:** [README\_de.md](README_de.md)

## Utility Monitor Adapter für ioBroker

Überwachen Sie den Verbrauch von Gas, Wasser und Strom mit automatischer Kostenberechnung, Vorauszahlungsüberwachung und detaillierten Statistiken.

### ✨ Hauptmerkmale

- 📊 **Verbrauchsüberwachung** für Gas, Wasser, Strom und **PV/Einspeisung**
- 🎯 **Unterstützung mehrerer Zähler** – mehrere Zähler pro Typ (z. B. Hauptzähler + Werkstattzähler)
- 💰 **Automatische Kostenberechnung** mit Einzelpreis und Grundgebühr
- ☀️ **Photovoltaik & Einspeisung** – Überwachen Sie Ihre Einspeisung und deren Kompensation
- 💳 **Vorauszahlungsüberwachung** – sehen Sie sofort, ob eine zusätzliche Zahlung oder eine Gutschrift ansteht.
- 🔄 **Flexible Sensoren** – funktioniert mit den Sensoren, die Sie bereits besitzen (Shelly, Tasmota, Homematic usw.).
- ⚡ **Hoch-/Nebentarife** – volle Unterstützung für Tag-/Nachttarife
- 🔄 **Gasangebote** – automatische Umrechnung von m³ in kWh
- 🕛 **Automatische Rücksetzungen** – täglich, wöchentlich, monatlich und jährlich (Vertragsjubiläum)
- 🔔 **Intelligente Benachrichtigungen** – separate Erinnerungen für das Ende des Abrechnungszeitraums (Zählerablesung) und für eine Vertragsänderung (Tarifprüfung), jeweils mit eigener Vorwarnzeit.
- 📈 **Wöchentliche Auswertung** – Verfolgen Sie Ihren Verbrauch auch wöchentlich.
- 📥 **CSV-Import** – Historische Zählerstände per Drag & Drop importieren
- ⌨️ **Kommaunterstützung** – die Admin-Oberfläche akzeptiert`12,50` sowie`12.50` für Dezimalzahlen

---

## 💝 Unterstützung

Gefällt dir dieser Adapter? Dann spendiere mir doch einen Kaffee! ☕

---

## 🚀 Schnellstart

### 1. Installation

1. Installieren Sie den Adapter über die ioBroker-Admin-Oberfläche.
2. Erstellen Sie eine Instanz
3. Öffnen Sie die Konfiguration

### 2. Grundkonfiguration (Beispiel: Gas)

1. ✅ **Gasüberwachung aktivieren**
2. 🔍 **Wählen Sie den Sensor aus** – Ihren Gaszählersensor (in m³)
3. 📝 **Zählerstand bei Vertragsbeginn** - z. B. 10250 m³ (erforderlich für eine korrekte Jahresberechnung)
4. 📅 **Vertragsbeginn** - z. B. 01.01.2026 (erforderlich für die jährliche Rücksetzung und die Berechnung der Vorauszahlung)
5. 🔧 **Offset** _(optional)_ – falls Ihr Hardware-Messgerät nicht bei 0 beginnt.
6. 🔥 **Brennwert und Z-Zahl** – entnommen Ihrer Gasrechnung (z. B. 11,5 und 0,95)
7. 💶 **Preise eingeben** :
   - Einheitspreis: 0,1835 €/kWh
   - Grundgebühr: 15,03 €/Monat
   - Jahresgebühr: 60,00 €/Jahr (z. B. Zählermiete)
8. 💳 **Vorauszahlung** - monatliche Vorauszahlung (z. B. 150 €)

**Fertig!** Der Adapter berechnet nun alle Kosten automatisch. 🎉

---

## ⚠️ Version 1.4.6 enthält grundlegende Änderungen.

**WICHTIG:** Version 1.4.6 ändert die Zustandsstruktur grundlegend.

### Was hat sich verändert?

**Vorher (bis Version 1.4.5):**

```
gas.consumption.daily
gas.costs.monthly
wasser.consumption.daily
```

**Jetzt (seit Version 1.4.6):**

```
gas.main.consumption.daily          ← main meter named "main"
gas.main.costs.monthly
wasser.main.consumption.daily
```

### 🔧 Migration erforderlich

1. **Öffnen Sie die Konfiguration** : Neue Felder „Name des Hauptzählers“ für Gas/Wasser/Strom/PV

2. **Geben Sie einen Namen ein** : Standardmäßig ist dies „main“ (empfohlen), alternativ können Sie einen eigenen Namen wie „flat“ oder „house“ verwenden.

3. **Skripte anpassen** : Jeder Verweis auf einen Zustand muss aktualisiert werden.

   ```javascript
   // Old:
   getState('utility-monitor.0.gas.consumption.daily');

   // New:
   getState('utility-monitor.0.gas.main.consumption.daily');
   ```

4. **Visualisierungen aktualisieren** : VIS, Grafana usw. an die neuen Pfade anpassen

### 💡 Warum diese Änderung?

- **Einheitlichkeit** : Alle Zähler (Haupt- und Zusatzzähler) verwenden nun die gleiche Struktur.
- **Flexibilität** : Der Hauptzähler kann frei benannt werden (z. B. „Erdgeschoss“, „Gesamt“).
- **Klarheit** : Keine Sonderfalllogik mehr im Code
- **Multimeter** : Bessere Unterstützung für mehrere Messgeräte pro Typ
- **CSV-Import** : Einfache Möglichkeit, historische Daten per Drag & Drop in der Admin-Oberfläche hinzuzufügen.
- **Strukturierte Statistiken (v1.6.0)** : klare Trennung von Verbrauch, Kosten und Zeitstempeln

---

## ⚠️ Version 1.6.0 enthält grundlegende Änderungen.

**WICHTIG:** Version 1.6.0 restrukturiert das Statistikobjekt.

### Was hat sich verändert?

**Vorher (bis Version 1.5.1):**

```
gas.main.statistics.lastDay
gas.main.statistics.lastMonth
gas.main.statistics.lastDayStart
```

**Jetzt (seit Version 1.6.0):**

```
gas.main.statistics.consumption.lastDay      ← consumption values
gas.main.statistics.cost.lastDay             ← cost values (NEW!)
gas.main.statistics.timestamps.lastDayStart   ← timestamps of the resets
```

### 🔧 Migration erforderlich

1. **Skripte/VIS anpassen** : Wenn Sie direkt auf Statistikzustände zugreifen, müssen die Pfade aktualisiert werden.
2. **Kostenstatistik** : Sie profitieren jetzt von historischen Kostenübersichten (Tag/Woche/Monat).

---

## 📥 CSV-Import

Über die Registerkarte „Importieren“ können Sie historische Zählerstände bequem hochladen.

### Unterstützte Formate

- **Generische CSV-Datei** : Datum (TT.MM.JJJJ), Zählerstand
- **EhB+ App** : Direkter Import aus der EhB+ App

### So funktioniert es

1. Wechseln Sie zur Registerkarte **„Importieren“** .
2. Wählen Sie den **Zählertyp** (Gas/Wasser/Strom) und den **Zähler** aus.
3. Ziehen Sie Ihre CSV-Datei in den Upload-Bereich.
4. Klicken Sie auf **„Daten importieren“** .

---

## 📊 Bundesstaaten erklärt

Für jeden aktivierten Versorgungstyp (Gas/Wasser/Strom/PV) werden die folgenden Ordner erstellt:

**Wichtig:** Seit Version 1.4.6 enthalten alle Pfade den Zählernamen (z. B.`gas.main.*` anstatt`gas.*` ).

### 🗂️ **Konsum**

| Zustand         | Beschreibung                                        | Beispiel         |
| --------------- | --------------------------------------------------- | ---------------- |
| `daily`         | Verbrauch **heute** (seit 00:00 Uhr)                | 12,02 kWh        |
| `dailyVolume`   | Heutiger Verbrauch in m³                            | 1,092 m³         |
| `weekly`        | Verbrauch **in dieser Woche** (seit Montag)         | 84,12 kWh        |
| `weeklyVolume`  | Wöchentlicher Verbrauch in m³                       | 7,65 m³          |
| `monthly`       | Verbrauch **in diesem Monat** (seit dem 1.)         | 117,77 kWh       |
| `monthlyVolume` | Monatlicher Verbrauch in m³                         | 10,69 m³         |
| `yearly`        | Verbrauch **seit Vertragsbeginn** (Abrechnungsjahr) | 730,01 kWh       |
| `yearlyVolume`  | Jährlicher Verbrauch in m³                          | 66,82 m³         |
| `dailyHT`       | Tagesverbrauch zum **Spitzentarif** (HT)            | 8,40 kWh         |
| `dailyNT`       | Tagesverbrauch zum **Nebentarif** (NT)              | 3,62 kWh         |
| `weeklyHT`      | Wöchentlicher Verbrauch zum Spitzentarif            | 58,15 kWh        |
| `weeklyNT`      | Wöchentlicher Verbrauch zum Niedrigtarif            | 25,62 kWh        |
| `monthlyHT`     | Monatlicher Verbrauch zum Spitzentarif              | 82,15 kWh        |
| `monthlyNT`     | Monatlicher Verbrauch zum Niedrigtarif              | 35,62 kWh        |
| `yearlyHT`      | Jährlicher Verbrauch zum Spitzentarif               | 511,00 kWh       |
| `yearlyNT`      | Jährlicher Verbrauch zum Niedrigtarif               | 219,01 kWh       |
| `lastUpdate`    | Letzte Aktualisierung                               | 06.01.2026 14:11 |

**💡 Tipp:**`yearly` wird automatisch berechnet als`(current meter reading - offset) - initial reading` Die

**📅 Wichtig:** Die jährliche Zurücksetzung erfolgt am **Vertragsbeginn** (z. B. 12. Mai), NICHT am 1. Januar.

---

### 💰 **Kosten**

| Zustand       | Was ist das?                                                              | Berechnung                                    | Beispiel                               |
| ------------- | ------------------------------------------------------------------------- | --------------------------------------------- | -------------------------------------- |
| `daily`       | **Heutige** Kosten                                                        | Tagespreis × Einzelpreis                      | 2.27 €                                 |
| `monthly`     | Kosten **diesen Monat**                                                   | monatlich × Einzelpreis                       | 21.61 €                                |
| `yearly`      | **Verbrauchskosten** seit Vertragsbeginn                                  | jährlich × Stückpreis                         | 137.61 €                               |
| `totalYearly` | **Gesamtkosten des Jahres** (Verbrauch + alle Fixkosten)                  | jährliche Kosten + Grundgebühr + Jahresgebühr | 212.64 €                               |
| `basicCharge` | **Angesammelte Grundgebühr**                                              | Grundgebühr × Monate                          | 15.03 €                                |
| `annualFee`   | **Jahresgebühr** (fester Betrag pro Jahr)                                 | Jahresgebühr (aus der Konfiguration)          | 60.00 €                                |
| `paidTotal`   | **Bezahlt** durch die Vorauszahlung                                       | Vorauszahlung × Monate                        | 150.00 €                               |
| `balance`     | **🎯 DER Schlüsselwert!**<br> Zusätzliche Zahlung (+) oder Gutschrift (-) | Gesamtjahr - bezahlter Gesamtbetrag           | **+62,64 €**<br> → zusätzliche Zahlung |

#### 🔍 **Ausgewogenheit** im Detail

- **Positiv (+50 €)** → ❌ **Zusätzliche Zahlung** : Sie müssen am Jahresende zahlen.
- **Negativ (-24 €)** → ✅ **Gutschrift** : Sie erhalten Ihr Geld zurück
- **Null (0 €)** → ⚖️ **Ausgeglichen** : Verbrauch = Vorauszahlung

**Beispiel:**

```
Consumption costs:  137.61 € (yearly)
Base fee:          + 15.03 € (basicCharge - 1 month × 15.03 €)
Annual fee:        + 60.00 € (annualFee - fixed value)
────────────────────────────
Total costs:        212.64 € (totalYearly)

Paid (advance):     150.00 € (paidTotal - 1 month × 150 €)
────────────────────────────
Balance:            +62.64 € → additional payment
```

---

### ℹ️ **Info**

| Zustand              | Beschreibung                           | Beispiel         |
| -------------------- | -------------------------------------- | ---------------- |
| `currentPrice`       | Aktueller Stückpreis                   | 0,1885 €/kWh     |
| `meterReading`       | Zählerstand in kWh                     | 112711,26 kWh    |
| `meterReadingVolume` | Zählerstand in m³ (nur Gas)            | 10305,03 m³      |
| `monthlyInstallment` | Konfigurierte monatliche Vorauszahlung | 150 €            |
| `lastSync`           | Letzte Sensoraktualisierung            | 06.01.2026 14:11 |
| `sensorActive`       | Sensor angeschlossen?                  | ✅ wahr           |

---

### 📈 **Statistiken**

Seit Version 1.6.1 sind die Statistiken in drei Unterkanäle aufgeteilt.

#### 📊 **Konsum** (Konsumhistorie)

| Zustand          | Beschreibung                             |
| ---------------- | ---------------------------------------- |
| `lastDay`        | Verbrauch **gestern**                    |
| `lastWeek`       | Verbrauch **letzte Woche**               |
| `lastMonth`      | Verbrauch **im letzten Monat**           |
| `lastYear`       | Verbrauch **im letzten Jahr**            |
| `averageDaily`   | Durchschnittlicher Tagesverbrauch        |
| `averageMonthly` | Durchschnittlicher monatlicher Verbrauch |

#### 💰 **Kosten** (Kostenverlauf)

| Zustand          | Beschreibung                        |
| ---------------- | ----------------------------------- |
| `lastDay`        | Kosten **gestern**                  |
| `lastWeek`       | Kosten **letzte Woche**             |
| `lastMonth`      | Kosten **im letzten Monat**         |
| `lastYear`       | Kosten **im letzten Jahr**          |
| `averageDaily`   | Durchschnittliche Tageskosten       |
| `averageMonthly` | Durchschnittliche monatliche Kosten |

#### 📅 **Zeitstempel** (Zeitstempel zurücksetzen)

| Zustand          | Beschreibung                                       |
| ---------------- | -------------------------------------------------- |
| `lastDayStart`   | Letzter täglicher Reset (23:59)                    |
| `lastWeekStart`  | Letzter wöchentlicher Reset (Sonntag 23:59 Uhr)    |
| `lastMonthStart` | Letzter monatlicher Reset (letzter Tag des Monats) |
| `lastYearStart`  | Vertragsbeginn / Jahresbeginn                      |

---

### 📅 **Abrechnung**

| Zustand             | Beschreibung                                     | Beispiel    |
| ------------------- | ------------------------------------------------ | ----------- |
| `endReading`        | Endgültiger Zählerstand (manuell eingeben)       | 10316,82 m³ |
| `closePeriod`       | Zeitraum jetzt beenden (Schaltfläche)            | wahr/falsch |
| `periodEnd`         | Der Abrechnungszeitraum endet am                 | 01.01.2027  |
| `daysRemaining`     | Tage bis zum Ende des Abrechnungszeitraums       | 359 Tage    |
| `newInitialReading` | Neuer Startwert (in die Konfiguration kopieren!) | 10316,82 m³ |

**💡 Arbeitsablauf zum Jahresende:**

1. Lesen Sie den physikalischen Zählerstand ab (z. B. 10316,82 m³).
2. Geben Sie den Wert ein in`endReading`
3. Satz`closePeriod` Zu`true`
4. ✅ Der Adapter archiviert alle Daten automatisch unter`history.{YEAR}.*`
5. ⚠️ **Wichtig:** Aktualisieren Sie die Konfiguration mit der neuen`initialReading` (sehen`newInitialReading` )

---

### 📊 **Geschichte** (Jahresverlauf)

| Zustand                     | Beschreibung                                | Beispiel   |
| --------------------------- | ------------------------------------------- | ---------- |
| `history.2024.yearly`       | Jährlicher Verbrauch 2024                   | 730,01 kWh |
| `history.2024.yearlyVolume` | Jahresverbrauch 2024 in m³ (Gas/Wasser)     | 66,82 m³   |
| `history.2024.totalYearly`  | Gesamtkosten 2024                           | 162.64 €   |
| `history.2024.balance`      | Saldo 2024 (zusätzliche Zahlung/Gutschrift) | +12.64 €   |

**💡 Automatische Archivierung:**

- Wird beim Abschluss des Abrechnungszeitraums erstellt.
- Speichert alle relevanten Jahresgesamtwerte einschließlich Spitzen- und Nebensaison.
- Ermöglicht Vergleiche zwischen den Jahren.

---

### 🔧 **Justierung** (manuelle Korrektur)

Die Sensorabweichung lässt sich durch eine manuelle Justierung korrigieren.

| Zustand   | Beschreibung                                 | Beispiel  |
| --------- | -------------------------------------------- | --------- |
| `value`   | Korrekturwert (Differenz zum Zählerstand)    | +4,2 m³   |
| `note`    | Anmerkung/Grund für die Anpassung (optional) | "Ausfall" |
| `applied` | Zeitstempel der letzten Bewerbung            | 17035...  |

**💡 Arbeitsablauf:**

1. Lesen Sie den physikalischen Zähler ab: **10350 m³**
2. Der Adapter zeigt an: **10346 m³**
3. Geben Sie die Differenz ein in`adjustment.value` : **+4**
4. ✅ Alle Berechnungen werden automatisch korrigiert.
5. **Dank der Integration von Spitzen- und Nebenzeiten** werden Anpassungen automatisch auf den Spitzentarif (HT) gebucht, wenn zwei Tarife genutzt werden.

---

## ⚙️ Besondere Funktionen

### ⚡ Gas: m³ → kWh Umrechnung

Der Gasverbrauch wird **in m³ gemessen** , aber **in kWh abgerechnet** .

**Formel:**`kWh = m³ × calorific value × Z number`

💡 **Tipp:** Den Brennwert und die Z-Zahl finden Sie auf Ihrer Gasrechnung.

### 🔄 Automatische Rücksetzungen

Der Adapter setzt die Zähler automatisch zurück:

| Zeitpunkt               | Was geschieht | Beispiel                          |
| ----------------------- | ------------- | --------------------------------- |
| **23:59 Uhr** jeden Tag | `daily` → 0   | Ein neuer Tag beginnt             |
| **Sonntag 23:59 Uhr**   | `weekly` → 0  | Eine neue Woche beginnt           |
| **Monatsende 23:59**    | `monthly` → 0 | Ein neuer Monat beginnt           |
| **Vertragsjubiläum**    | `yearly` → 0  | Ein neues Abrechnungsjahr beginnt |

---

## Changelog

### 1.7.2 (2026-08-30)

- **FIX:** 🐛 **CSV import did nothing on Admin 8 (no backend call)** - the `sendTo` button used `useNative`, which delivered an empty message, so `handleImportCSV` returned before doing anything (no log, just a delayed "OK"). The button now sends the utility type and meter name via `jsonData`, and the CSV content is read from the saved config (`importCsvContent`) - avoiding multi-line escaping issues. Flow: paste CSV → **Save** → **Start import**; a success/error message is now shown.

### 1.7.1 (2026-08-30)

- **FIX:** 🐛 **CSV import button did nothing on Admin 8** - the import panel used invalid jsonConfig properties (`showProcessMessage`, `minRows`), which made the whole import tab schema-invalid, so clicking "Start import" had no effect and produced no log output. Removed the invalid properties so the import works again.

### 1.7.0 (2026-08-29)

- **FIX:** 🧩 **CSV import works on Admin 8 again (#48, #10)** - the import used a custom Module-Federation UI component that targeted "GUI API generation 1", which Admin 8 (generation 2) refuses to load. It has been replaced with **native jsonConfig controls** (utility type, meter name, CSV text field, import button), so the import works on **Admin 7 and Admin 8** without any custom component. Paste the CSV, press **Save**, then **Start import**.
- **CHORE:** 🧹 **Removed the obsolete custom frontend** (`admin/src-admin`, `admin/custom`) and the related Dependabot config for it. The CSV backend (`importManager`) is unchanged.

### 1.6.8 (2026-08-19)

- **FIX:** 🌐 **Language-aware user messages** - all user-facing text (test message, billing/contract reminders, the monthly report and the config popups) is now localized. **English is the default**, German is used automatically when the ioBroker system language is German. This follows the repository requirement that user output must be English or multilingual with English as default.

### 1.6.7 (2026-08-14)

- **FIX:** 🌐 **Multilingual object names** - object and state names are now provided as `{ en, de }` objects, so German users keep the German labels while the repository checker and other locales get an English name.
- **FIX:** 🇬🇧 **English log messages** - all log and error messages are now in English, as required for adapters in the ioBroker repository. User notifications (Telegram etc.) stay in German.
- **FIX:** 🔘 **`billing.closePeriod` button** - the button state now uses `read: false` as required for the `button` role. Existing installations are migrated automatically on startup.
- **CHORE:** 🧹 **Cleanup** - removed a redundant `*.adjustment.note` subscription that was never handled, removed the dead legacy `closeBillingPeriod` code path (which still used the non-catalogue `value.money` role), removed the unused `createUtilityStateStructure` and an orphaned translation key.

### 1.6.6 (2026-08-07)

- **FIX:** 🛠️ **Object structure corrected** - the states now pass the ioBroker object checker: the utility-type level (gas/water/electricity/pv) is created as its own object, the monetary states use the accepted role `value` instead of the non-catalogue roles `value.money`/`value.price`, and writable inputs (`billing.endReading`, `adjustment.value`) use the writable role `level`. Existing installations are migrated automatically on startup.
- **FIX:** 🛠️ **Timers are now registered with the adapter** - `setInterval` and `setTimeout` bypassed the adapter's timer management and were not cleaned up by the js-controller on unload. They now use `this.setInterval()` and `adapter.setTimeout()`.
- **DOCS:** 🌐 **English documentation** - the README is now in English, the German version moved to `README_de.md`. All configuration texts are available in English.
- **CHORE:** ⬆️ **Node 22 as the minimum version** - `engines.node` raised from `>= 20` to `>= 22`, matching the current js-controller.
- **CHORE:** 🔧 **CI and Dependabot** - applied the workflow requirements of the ioBroker checker (node versions, job dependencies, automerge action, cooldown for dependency updates).
- **CHORE:** 🧹 **Removed the unused `debounce` helper.**

### 1.6.5 (2026-08-06)

- **BREAKING:** ⚠️ **`info.monthlyInstallment` is now a number (#11)** - the advance payment used to be stored as formatted text (`"25.00 €"`), which made it unusable for history, charts and scripts. It is now a numeric state with the unit `€`. Existing installations are converted automatically on startup. **Scripts that parsed the text have to be adjusted.**
- **FIX:** 🛠️ **Info page** - the link to the GitHub repository still pointed at the former name `ioBroker.nebenkosten-monitor` and was dead.
- **FIX:** 🛠️ **Description of `daysRemaining`** - the state was described as "days until the end of the contract" although it counts down to the end of the billing period. That wording had caused misunderstandings.
- **DOCS:** 🧹 **Info page cleaned up** - removed the hard-coded version number (admin shows it anyway) and the outdated "NEW in 1.4.6" markers.
- **CHORE:** ⬆️ **Release tooling updated** - `@alcalzone/release-script` and its plugins raised to 5.x.

### 1.6.4 (2026-08-04)

- **FIX:** 🛠️ **Wrong billing period (#9)** - `daysRemaining` and `periodEnd` were only calculated when the adapter started and stayed frozen afterwards. The countdown is now refreshed continuously and rolls over into the new period at the contract anniversary.
- **FIX:** 🛠️ **Day-accurate calculation** - the remaining period no longer varies with the time of day or the daylight saving change.
- **FIX:** 🛠️ **Leap years** - a contract starting on 29 February no longer slips into March in non-leap years.
- **FIX:** 🛠️ **Monthly report was sent twice** - the marker check worked in UTC instead of local time, so the report arrived once at 00:00 and again at 02:00 (summer time). Only one report per day is sent now.
- **FIX:** 🛠️ **Formatting of the monthly report** - a literal `\n` appeared in the text instead of a line break.

### 1.6.3 (2026-02-04)

- **FIX:** 🛠️ **Daily and monthly start value reset to 0**

### 1.6.2 (2026-01-28)

- **FIX:** 🛠️ **Monthly reset logic for the last day of the month**

### 1.6.1 (2026-01-28)

- **NEW:** 📊 **Extended yearly statistics** - introduced `lastYear` states in the statistics:
    - `statistics.consumption.lastYear`: total consumption of the previous year
    - `statistics.cost.lastYear`: total costs of the previous year
    - support for peak/off-peak and gas volume in the previous-year view
- **NEW:** 🔄 **Automatic archiving** - previous-year values are written to the statistics automatically during the yearly reset
- **FIX:** 🛠️ **Syntax & units** - corrected inconsistent units (water/m³ in particular) and linter errors
- **DOCS:** 🌐 **Translations** - news entries translated into all supported languages

### 1.6.0 (2026-01-28)

- **NEW:** 📊 **Structured statistics** - introduced sub-channels for a better overview:
    - `statistics.consumption`: all historical consumption values
    - `statistics.cost`: all historical cost values (day/week/month)
    - `statistics.timestamps`: all reset timestamps in one place
- **NEW:** 💰 **Cost statistics** - track your costs for yesterday, last week and last month as well
- **REFACTORING:** 🏗️ **Modular state management**:
    - `stateManager.js` was split into dedicated modules (`lib/state/`)
    - improved maintainability and testability
- **CLEANUP:** 🧹 **Housekeeping** - outdated statistics states are removed automatically on the first start

Older versions can be found in CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 fischi87 <axel.fischer@hotmail.com>

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