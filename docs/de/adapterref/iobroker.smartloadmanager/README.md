---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.smartloadmanager.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.smartloadmanager.svg
BADGE-Number of Installations: https://iobroker.live/badges/smartloadmanager-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/smartloadmanager-stable.svg
BADGE-NPM: https://nodei.co/npm/iobroker.smartloadmanager.png?downloads=true
BADGE-Test and Release: https://github.com/quorle/ioBroker.smartloadmanager/workflows/Test%20and%20Release/badge.svg
chapters: {"pages":{"de/adapterref/iobroker.smartloadmanager/README.md":{"title":{"de":"ioBroker.smartloadmanager"},"content":"de/adapterref/iobroker.smartloadmanager/README.md"},"de/adapterref/iobroker.smartloadmanager/release-0.2.0-pruefung.md":{"title":{"de":"Arbeits- und Prüfplan für 0.2.0"},"content":"de/adapterref/iobroker.smartloadmanager/release-0.2.0-pruefung.md"}}}
---
![Logo](../../admin/smartloadmanager.png)

# ioBroker.smartloadmanager

## Beispiele für Version 0.2.0

Voraussetzung: Node.js ab 22.19.0. Der Adapter sendet Gerätebefehle mit
`ack: false`; die Bestätigung (`ack: true`) übernimmt der zuständige Geräteadapter.
Der Einspeisewert muss die Leistung am Netzanschlusspunkt in Watt darstellen.
Bei negativem Vorzeichen für Einspeisung muss `feedinNegativ` aktiviert werden.
Die Grundlast wird zusätzlich als Reserve abgezogen; bereits im Netzanschlusswert
enthaltenen Hausverbrauch nicht nochmals als Grundlast eintragen.

### Binärer Verbraucher und Heizung

Beispiel: Steckdose mit `performance: 1000`, `switchOnPoint: 1200`,
`switchOffPoint: 0`, `switchOnDelay: 20`, `switchOffDelay: 10`.
Ab 1200 W Überschuss nach Grundlast startet die Einschaltverzögerung.
Bei Netzbezug oder Unterschreiten der Abschaltgrenze startet die Abschaltung.
`minimumOnMinutes: 10` und `minimumOffMinutes: 5` begrenzen häufiges Schalten;
stärkerer Netzbezug als `forecastMaxGridImport` übergeht die Mindestlaufzeit.
Mit `0` können Mindestzeiten explizit deaktiviert werden.

`datapoint` schaltet boolean, `numericDatapoint` numerisch mit 0/1.
Für Heizungen `ruletype: heating` wählen und Temperatur-, Freigabe- und
Heartbeat-Datenpunkte konfigurieren. Das Erreichen von `maxTemperature` sowie
fehlende Freigabe oder ein falscher Heartbeat verhindern das Einschalten.
Ein gesetzter Heartbeat-Datenpunkt wird auf seinen Wahrheitswert geprüft;
das ist keine Überwachung seines Alters.
Fehlt ein konfigurierter Temperatursensor oder liefert er keinen endlichen
Zahlenwert, wird eine Heizung nicht eingeschaltet bzw. automatisch abgeschaltet.
„Ausschalten nur zu Ausschaltzeit“ unterdrückt absichtlich die normale
Überschussabschaltung bis zum Zeitfensterende; Heizschutz bleibt wirksam.

### Prozentregelung und Batterie

Ein Prozentverbraucher mit 2000 W Maximalleistung und aktuell 50 % benötigt
1000 W. Zeigt der Netzzähler zusätzlich 400 W Einspeisung, wird auf 70 % geregelt.
Bei 200 W Netzbezug wird auf 40 % reduziert. Liegt die tragbare Leistung unter
`minPercentStart`, wird auf 0 % geregelt. Deaktivierte Verbraucher werden nicht geregelt.
Die Leistungsrechnung setzt voraus, dass der Verbraucher im Netzzähler enthalten ist.

Für eine Batterie `batterySetpoint`, `performance`, optional `batterySOC` und
`batteryTargetSOC` wählen. Bei 800 W verfügbarem Überschuss und maximal 1500 W
Ladeleistung wird 800 W vorgegeben. Bei erreichtem Ziel-SOC wird die Ladeleistung 0.
Der optionale globale Batterie-Modusdatenpunkt verwendet 0 (aus), 1 (Ziel erreicht)
und 2 (laden); diese Werte müssen zum Geräteadapter passen.

`controlMode` im Objektbaum: 0 = aus, 1 = manuell ein, 2 = automatisch.
Manuell ein setzt Prozentverbraucher auf 100 % bzw. die Batterie auf ihre konfigurierte
Leistung. Automatische Prozent- und Batterieregler überschreiben manuelle Modi nicht.
Die Batterie berücksichtigt bereits angeforderte Ladeleistung und korrigiert sie
um den gemessenen Netzüberschuss. `batteryDelaySeconds` und `delaySecondsProzent`
gelten auch bei häufigen Zähleraktualisierungen; 0 bedeutet sofortige Regelung.
Fehlt ein konfigurierter SOC-/Ziel-SOC-Wert, wird die Ladeleistung auf 0 gesetzt.
Zeitfenster werden zusätzlich alle 15 Sekunden geprüft. Das Deaktivieren eines
Verbrauchers beendet seine ausstehenden Schaltbefehle; es schaltet das Gerät nicht
automatisch aus. Dafür `controlMode: 0` verwenden.

### PV-Prognose mit ioBroker.pvforecast

`enableForecast` aktivieren, `forecastJsonDatapoint` etwa auf
`pvforecast.0.summary.JSONData` setzen und beim Verbraucher `useForecast` aktivieren.
Auch `pvforecast.0.plants.<Anlagenname>.JSONData` ist möglich; dann wird nur diese
Anlage berücksichtigt. Die globale Aktivierung und „Prognose verwenden“ beim
jeweiligen Verbraucher sind beide erforderlich. „Prognoseentscheidungsbenachrichtigungen“
aktiviert die Prognosesteuerung nicht selbst und erzeugt erst bei einer tatsächlichen
Prognoseentscheidung eine Nachricht. In 0.2.0 stehen Datenimporte nur im Debug-Log.
Version 0.4.1 zeigt Konfiguration, Datenimporte und aktivierte
Entscheidungsnachrichten nur im Debug-Log an. Gleiche Entscheidungsnachrichten werden
innerhalb von fünf Minuten zusammengefasst. Für externe Nachrichten zusätzlich den
Notification Manager oder einen Nachrichtendienst konfigurieren.
Beispiel für das erwartete Format (Zeitstempel sind Unix-Millisekunden):

```js
const now = Date.now();
const forecast = [0, 15, 30, 45].map(minutes => ({
    t: now + minutes * 60000,
    y: 3.5,
}));
// JSON.stringify(forecast), mit forecastPowerUnit = "kW"
```

Bei 500 W Grundlast bleiben 3000 W prognostizierter Überschuss.
Mit `forecastSafetyPercent: 80` stehen konservativ 2400 W zur Verfügung.
Ein 2000-W-Verbraucher kann freigegeben werden, wenn das Zeitfenster mindestens
`forecastMinMinutes: 30` lang ist, höchstens `forecastMaxStartMinutes: 30`
Minuten entfernt liegt und bei `forecastMinCurrentPercent: 50` bereits mindestens
1000 W realer Überschuss vorhanden sind. Prognosen ersetzen keinen gemessenen Überschuss.

`forecastBridgeMinutes: 5` begrenzt das Überbrücken kurzer Einbrüche;
`forecastMaxGridImport: 100` verhindert Überbrücken bei mehr als 100 W Netzbezug.
Vergangene Datenpunkte werden verworfen. Bei kleinen W-Werten die Einheit explizit
auf `W` setzen, da die automatische Erkennung Werte bis 100 als kW interpretiert.
`forecast.*` und die Prognosestatuswerte des Verbrauchers zeigen die Entscheidung an.

Zeitfenster können über Mitternacht gehen, z. B. 22:00–06:00.
Gleiche Start- und Endzeit gelten als ganztägiges Fenster.

Prüfumfang und externe Release-Abhängigkeiten: [Release-Prüfbericht](/#/docs/adapterref/iobroker.smartloadmanager/release-0.2.0-pruefung.md).

## 🔧 Beschreibung

Der Adapter **smartloadmanager** dient der dynamischen Steuerung von Verbrauchern anhand eines PV-Einspeisewertes. Ziel ist es, Überschuss-Strom lokal zu verbrauchen und so die Einspeisung ins öffentliche Netz zu minimieren oder vollständig zu vermeiden. Er unterstützt sowohl Ein/Aus-Verbraucher als auch prozentual regelbare Geräte und Batteriespeicher.

---

## 🚀 Funktionen

- ✅ Überwachung eines konfigurierbaren Einspeisungs-Datenpunkts
- ✅ Dynamische Zuschaltung von Verbrauchern bei Überschuss
- ✅ Dynamische Abschaltung bei Defizit oder Netzbezug
- ✅ Unterstützt **binary**, **percent**, **Heating** und **battery**-Verbraucher
- ✅ Prozentregelung mit Verzögerung (sanftes Rückregeln), optional pro Verbraucher konfigurierbar
- ✅ Dynamische Ladeleistung für Batteriespeicher mit Ziel-SOC
- ✅ Zeitfenster für Ein-/Ausschaltlogik je Verbraucher (inkl. "nur zu Abschaltzeit")
- ✅ Automatische Objekt-Erstellung mit erweiterten Informationen je Verbraucher
- ✅ Steuerungsmodus: Off / Manual On / Auto für jeden Verbraucher separat
- ✅ Hysterese-Steuerung durch separate Ein-/Abschaltgrenzen
- ✅ Verbraucherspezifische Schaltverzögerung (Override der globalen)
- ✅ Reihenfolgenlogik bei Zuschaltung (nach Leistung) und Abschaltung (umgekehrt)
- ✅ Globale Batterie-Schaltverzögerung (`batteryDelaySeconds`)
- ✅ Schreibprüfung für Batterie-Kontrollmodus (Debug-Ausgabe im Log)
- ✅ **Verzögerte Schaltung über Timer** für Ein- und Ausschaltung
- ✅ **Anzeige laufender Timer im Debug-Log** mit verbleibender Zeit
- ✅ Optionale **Benachrichtigungen** für Ein/Aus, Prozentregelung und Batterie (Telegram / Gotify)
- ✅ Optimierung für 0/1-Datenpunkte für Geräte mit boolean oder numerischer 0/1-Steuerung
- ✅ Detailliertes Logging aller Timer, Überschüsse und Schaltvorgänge
- ✅ Benachrichtigungen pro Verbrauchertyp (Binary, Percent, Battery, Heating), optional aktivierbar
- ✅ Heizungs-/Heizstab-Steuerung mit Temperatur-, Freigabe- und Heartbeat-Prüfung

---

## ⚙️ Konfiguration

### 🔹 Haupteinstellungen

| Einstellung                     | Beschreibung                                                                           |
| ------------------------------- | -------------------------------------------------------------------------------------- |
| **Einspeisungs-Datenpunkt**     | Objekt-ID des Einspeisewerts (z. B. PV-Überschuss)                                     |
| **Grundlast**                   | Wird immer vom Einspeisewert abgezogen (z. B. Standby-Verbrauch)                       |
| **Einschaltgrenze**             | Schwelle in Watt, ab der Verbraucher zugeschaltet werden                               |
| **Abschaltgrenze**              | Schwelle in Watt, ab der Verbraucher abgeschaltet werden                               |
| **Verzögerung (Sekunden)**      | Verzögerung für binäre Abschaltungen (Hysterese-Glättung)                              |
| **Verzögerung Prozent (Sek.)**  | Globale Verzögerung bei Rückregelung von Prozentverbrauchern (z. B. Wallbox)           |
| **Verzögerung Batterie (Sek.)** | Globale Verzögerung für Batterie-Steuerung                                             |
| **Einspeisewert negativ**       | Wenn aktiv: negativer Wert = Einspeisung / positiver Wert = Netzbezug                  |
| **Batterie Kontrollmodus-DP**   | Optionaler Steuerdatenpunkt für Batterie-Modusumschaltung (Auto/Manual/Aus)            |
| **Benachrichtigungen**          | Aktivierung für Binary / Prozent / Batterie / Heating, inkl. Telegram/Gotify-Instanzen |

---

### 🔹 Verbraucher

| Feld                                   | Beschreibung                                                                    |
| -------------------------------------- | ------------------------------------------------------------------------------- |
| **Name**                               | Anzeigename                                                                     |
| **Aktiv**                              | Aktiviert die Steuerung für diesen Verbraucher                                  |
| **Regeltyp**                           | `"binary"`, `"percent"` oder `"battery"`                                        |
| **Steuer-Datenpunkt**                  | ID zum Schalten oder Regeln, auch 0/1-DP unterstützt                            |
| **Leistung [W]**                       | Realistische elektrische Leistung des Verbrauchers                              |
| **Einschaltgrenze [W]**                | Benötigter Überschuss für Aktivierung                                           |
| **Abschaltgrenze [W]**                 | Untergrenze für Deaktivierung                                                   |
| **Maximalleistung [W]**                | Referenzwert zur Prozentregelung                                                |
| **Verzögerung Prozent [s]**            | Optionale Verzögerung für Rückregelung nur dieses Verbrauchers                  |
| **Verzögerung Override [s]**           | Verbraucherindividuelle Schaltverzögerung (z. B. sofortige Zuschaltung möglich) |
| **Einschaltzeit (HH:MM)**              | Uhrzeit, ab wann Steuerung aktiv sein darf                                      |
| **Ausschaltzeit (HH:MM)**              | Uhrzeit, ab wann Steuerung beendet wird                                         |
| **Nur zu Ausschaltzeit ausschalten**   | Checkbox: Abschaltung nur zu konfigurierter Uhrzeit                             |
| **batterySetpoint (nur battery)**      | Datenpunkt, in den die gewünschte Ladeleistung geschrieben wird                 |
| **batterySOC / targetSOC**             | Optional: SOC & Ziel-SOC zur Ladeverhinderung bei vollem Akku                   |
| **Timer / TimerEnd**                   | Interner Timer für verzögerte Schaltungen, Restzeit im Log sichtbar             |
| **minTemperature / maxTemperature**    | Unter- und Obergrenze für Heating-Betrieb                                       |
| **temperatureDatapoint (nur heating)** | Temperatur-Datenpunkt zur Prüfung min/max Grenzwerte                            |
| **enableDatapoint (nur heating)**      | Optionaler Datenpunkt: nur bei true darf Heizstab laufen                        |
| **heartbeatDatapoint (nur heating)**   | Optional: muss zyklisch true liefern, sonst wird abgeschaltet                   |

---

## 🔋 Batteriespeicher-Unterstützung

- Verbraucher mit `"ruletype": "battery"` regeln den Lade-Setpoint abhängig vom aktuellen Überschuss.
- Falls `batterySOC` und `batteryTargetSOC` gesetzt sind, wird ab Zielwert nicht mehr geladen.
- Optional kann ein `batteryControlModeDatapoint` gesetzt werden:
    - `0 = Aus`, `1 = Manuell`, `2 = Automatik`
- Die Steuerung erfolgt **nur innerhalb der konfigurierten Zeitfenster**.
- Die Steuerung wird bei jedem FeedIn-Update nach konfigurierter Verzögerung (`batteryDelaySeconds`) erneut ausgeführt.
- Verzögerungen für alle Schaltungen (binary, percent, battery) können pro Verbraucher oder global angepasst werden.
- Detailliertes Logging und optionale Benachrichtigungen für Batterie-Schaltungen.

---

## 🌡️ Heating-Unterstützung

- Verbraucher mit "ruletype": "heating" sind für Heizstäbe oder vergleichbare Verbraucher vorgesehen.
- Steuerung erfolgt nur, wenn: - Aktuelle Temperatur unter maxTemperature liegt - Optional: über minTemperature abgesichert - Optional: enableDatapoint aktiv ist - Optional: heartbeatDatapoint gültig ist
- Bei Nichterfüllung wird Schaltung sofort abgebrochen und Timer gestoppt.
- Unterstützt Ein-/Ausschalt-Timer (onTimerRemaining / offTimerRemaining) mit Restzeitanzeige.
- Detailliertes Logging und optionale Benachrichtigungen für Heating-Verbraucher.

---

## 🧠 Steuerlogik

1. **Datenpunkt-Messwert wird basierend auf Konfiguration interpretiert** (positiv = Netzbezug oder Einspeisung)
2. **Überschuss > Grundlast + Einschaltgrenze**:  
   → Verbraucher werden (binär) nach steigender Leistung zugeschaltet
3. **Unterschuss < Grundlast - Abschaltgrenze**:  
   → Verbraucher werden in umgekehrter Reihenfolge abgeschaltet
4. **Regelung für Prozent-Verbraucher**:  
   → % = Überschuss / Maximalleistung  
   → Geregelt nach Verzögerung (global oder pro Verbraucher)  
   → Optionale pro-Verbraucher Overrides möglich
5. **Regelung für Batterie-Verbraucher**:  
   → Ladeleistung = min(Überschuss, Maximalleistung), sofern Ziel-SOC nicht erreicht  
   → Verzögerung über `batteryDelaySeconds` oder pro Verbraucher
6. **Zeitfensterprüfung für alle Verbraucher**  
   → Nur aktiv, wenn aktuelle Uhrzeit innerhalb `switchOnTime` bis `switchOffTime`
7. **Steuerung erfolgt nur bei Steuerungsmodus „Auto (2)“**  
   → Manuelle Eingriffe (Modus 1 oder 0) bleiben unangetastet
8. **Verzögerte Schaltung über Timer**  
   → Timer wird vor erneuter Schaltung abgebrochen, Restzeit kann im Log angezeigt werden
9. **Benachrichtigungen optional für Ein/Aus, Prozent und Batterie**
10. **Optimierung für 0/1-Datenpunkte**  
    → Unterstützt boolean oder numerische 0/1-Steuerung automatisch
11. **Detailliertes Logging aller Schaltvorgänge, Überschüsse und Timer**
12. **Regelung für Heating-Verbraucher:**
    → Schaltung nur innerhalb min/max Temperatur und bei gültigen enable-/heartbeat-States
    → Timer werden abgebrochen, sobald Bedingungen nicht mehr erfüllt sind

---

## 💡 Beispiel: Wallbox

| Parameter       | Wert    |
| --------------- | ------- |
| Einspeisung     | 1000 W  |
| Grundlast       | 100 W   |
| Maximalleistung | 11000 W |

**Berechnung:**

- Überschuss: 1000 - 100 = 900 W
- Prozent: 900 / 11000 ≈ 8,2 % → Wallbox wird auf 8 % geregelt

---

## 📋 Objektstruktur

Für jeden Verbraucher wird ein eigener Channel mit folgenden States erzeugt:

- `.controlMode` → 0 = Aus, 1 = Manuell, 2 = Automatik
- `.switchOnTime` / `.switchOffTime`
- `.alwaysOffAtTime` → true/false
- `.performance`, `.switchOnPoint`, `.switchOffPoint`
- `.batterySetpoint` (nur für "battery")
- `.temperatureDatapoint` (nur für "heating")
- `.onTimerRemaining / .offTimerRemaining` → Restlaufzeit für Ein-/Ausschalt-Timer
- `.timer` → interner Timer für verzögerte Schaltungen
- `.timerEnd` → Zeitstempel, wann Timer abläuft (für Log)

---

## 🚫 Einschränkungen

- Keine SOC-Historie, keine Langzeitlogik
- Keine Mehrfachverwendung identischer Datenpunkte
- Batterie-Steuerung basiert rein auf FeedIn, keine Rücksicht auf Entladeleistung
- Heating ohne direkte Leistungsmessung – nur Grenzwerte und Freigabe-Checks

---

## 🛣️ Zukünftige Features

- ~~PV-Prognosebasierte Steuerung (Beta)~~
- Unterstützung kombinierter Verbraucher
- ~~Priorisierungs-Profile~~
- Überhitzungs- oder Fehler-Handling je Gerät
- ~~Minimal- und Maximal-Prozentlimits für Regelung~~
- Konfigurierbare Gruppen- oder Raumlogik

---

## PV-Prognosesteuerung

SmartLoadManager kann `pvforecast.<Instanz>.summary.JSONData` verwenden. Dazu wird die Prognosesteuerung aktiviert, der JSON-Datenpunkt ausgewählt und die Funktion bei den gewünschten Verbrauchern eingeschaltet.

Der Adapter bewertet ein zusammenhängendes Prognosefenster statt eines einzelnen Werts. Ein konfigurierbarer Sicherheitsfaktor reduziert optimistische Prognosen. Für prognosegestütztes Einschalten muss außerdem bereits ein Teil der benötigten Leistung als realer Überschuss vorhanden sein. Kurze Einbrüche dürfen zeitlich begrenzt überbrückt werden, jedoch nur bis zum eingestellten maximalen Netzbezug.

Mindestlauf- und Mindeststillstandszeiten verhindern häufiges Schalten. Prognoseentscheidungen übersteuern niemals Zeitfenster, Temperaturgrenzen, Hardwarefreigabe, Heartbeat oder Batterie-SOC-Grenzen.

Empfohlene Startwerte: 80 % Sicherheitsfaktor, 30 Minuten Prognosefenster, 30 Minuten maximale Vorlaufzeit, 50 % erforderlicher realer Überschuss, 5 Minuten Überbrückung, 100 W maximaler Netzbezug und 10/5 Minuten Mindestlauf-/Mindeststillstandszeit.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.4.1 (2026-10-24)

- (quorle) Make forecast configuration, data imports and decision notifications visible only in the debug log; report forecast decisions for percentage and battery consumers and limit identical notifications to once per five minutes.
- (quorle) Clear cached forecast data and report missing, invalid or expired source data instead of silently retaining previous forecasts.

### 0.2.0 (2026-10-24)

- (quorle) Added sustained PV forecast evaluation, configurable W/kW units, safety margins, minimum on/off times and limited forecast dip bridging.
- (quorle) Fixed binary commands to use `ack: false` without fabricating device acknowledgements; corrected battery commands and negative feed-in handling.
- (quorle) Fixed percent regulation to include existing load power, stop below minimum power, and respect activation and automatic/manual modes.
- (quorle) Fixed manual percent commands, switch-on thresholds, overnight time windows, stale forecasts and repeatedly postponed regulation timers.
- (quorle) Recheck delayed activations, cancel disabled consumer timers, periodically evaluate time windows, stop heating/charging on missing configured sensors, and stabilize battery feedback regulation while honoring its delay.
- (quorle) Migrated translations to short JSON format, synchronized all eleven languages, completed notification translations and corrected Admin configuration schema fields.
- (quorle) Updated adapter-core and testing dependencies, aligned Node.js typings/configuration, and added Node.js 26 to the 22/24/26 CI matrix.
- (quorle) Replaced the Dependabot `pull_request_target` trigger and removed obsolete workflows and tracked editor backups.
- (quorle) Added regression tests for actual consumer control, configured controller integration tests, and expanded English/German documentation with examples.
- (quorle) Require Node.js >=22.19.0; include documentation and forecast runtime code in the npm package while excluding unit tests.

See [English examples](docs/en/README.md#version-020-examples) and [deutsche Beispiele](docs/de/README.md#beispiele-für-version-020).

### 0.1.2 (2026-04-15)

- (quorle) Update dependencies

### 0.1.0 (2025-11-07)

- (quorle) Added a checkbox for activating consumers from the settings to the object tree

### 0.0.8 (2025-10-03)

- (quorle) Fix for binary consumers that do not turn off
- (quorle) Fix for heating elements that are not switched off at max temperature

### 0.0.7 (2025-09-09)

- (quorle) modified Readme
- (quorle) German and English description created
- (quorle) chore: cleanup devDependencies
- (quorle) Add "label" to jsonConfig.json everywhere
- (quorle) Fixed bugs in timeouts in functions
- (quorle) setTimeout/setInterval allowed maximum values ​​implemented
- (quorle) adapter-core 3.2.3 to 3.3.2 updated
- (quorle) eslint-config 2.0.2 to 2.1.0 updated
- (quorle) testing 5.0.4 to 5.1.0 updated

### 0.0.6 (2025-09-03)

- (quorle) Adjustments package.json
- (quorle) Code changed

Older release notes: CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2025-2026 quorle <quorle12@gmail.com>

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