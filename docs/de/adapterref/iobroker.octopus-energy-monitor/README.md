---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.octopus-energy-monitor/README.md
title: ioBroker.octopus-energy-monitor
hash: HvqHQo9IAX7EIYOne5MAJpzfZbWG/wE2SZzV3/UCgyQ=
---
![Logo](../../../en/adapterref/iobroker.octopus-energy-monitor/admin/octopus-energy-monitor.svg?v=3)

![NPM-Version](https://img.shields.io/npm/v/iobroker.octopus-energy-monitor.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.octopus-energy-monitor.svg)
![Anzahl der Installationen](https://iobroker.live/badges/octopus-energy-monitor-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/octopus-energy-monitor-stable.svg)
![NPM](https://nodei.co/npm/iobroker.octopus-energy-monitor.png?downloads=true)
![Test und Freigabe](https://github.com/tipp88/ioBroker.octopus-energy-monitor/workflows/Test%20and%20Release/badge.svg)

# ioBroker.octopus-energy-monitor

## ioBroker.octopus-energy-monitor

Der **Octopus Energy Monitor-** Adapter ruft regelmäßig die täglichen Stromverbrauchsdaten von **[Octopus Energy](https://octopus.energy) (Kraken API)** und **[Inexogy](https://www.inexogy.com) (Discovergy/Statistics API)** ab und speichert sie automatisch in Ihrem ioBroker-Objektbaum.

Seine Hauptaufgabe besteht darin, Abweichungen zwischen den Abrechnungs- und Messdaten Ihres intelligenten Stromzählers (Inexogy) und Ihres Energieversorgers (Octopus Energy) zu erkennen. Jede Nacht vergleicht der Adapter beide Datensätze und kennzeichnet täglich Abweichungen, die einen konfigurierbaren Schwellenwert überschreiten.

### 🌟 Funktionen

- **Vollständige Kraken GraphQL-Unterstützung:** Authentifiziert über Ihre Octopus JWT-Token und löst Kontoeigenschaften dynamisch auf, um präzise Verbrauchsdaten abzurufen.
- **Dynamische Tarif- und Zeitfensterunterstützung:** Erkennt automatisch Ihren aktiven Octopus-Tarif (z. B. Intelligent Octopus Go) und dessen spezifische Nutzungszeitfenster. Keine manuelle Konfiguration der „Go“-Stunden erforderlich!
- **Automatische Kostenberechnung:** Berechnet automatisch die täglichen, monatlichen und jährlichen Energiekosten in **Euro (€)** auf Basis Ihrer aktuellen Tarife.
- **Hierarchische Historie:** Strukturiert Daten in einer übersichtlichen `history.YYYY.MM.DD` Baum mit automatischer Aggregation von Verbrauch und Kosten über Monate und Jahre.
- **Geschätzter Zählerstand:** Berechnet Ihren aktuellen Stromzählerstand, indem der letzte offizielle Kraken-Zählerstand mit Ihrem nachfolgenden täglichen Verbrauch kombiniert wird.
- **Inexogy (Discovergy) Vergleich:** Nutzt die Inexogy API, um Verbrauchsdaten mit den Daten Ihres Anbieters zu vergleichen und so Abrechnungsdifferenzen aufzudecken.
- **Master Data Insight:** Bietet Transparenz über Ihren Kontostand, Zählerdetails und beteiligte Netzbetreiber (MOP/DNO).
- **Intelligente Ladesteuerung:** Intelligente Octopus-Geräte (Elektrofahrzeuge/Ladegeräte) werden dynamisch abgerufen und das intelligente Laden (Anhalten/Fortsetzen) kann direkt über ioBroker gesteuert werden.
- **Inexogy Stammdaten & Live-Ablesung:** Seriennummern, Standortdetails und aktuelle Zählerstände von Inexogy abrufen.
- **Intelligentes Caching:** Minimiert die API-Last, indem nur fehlende Datenpunkte nachträglich synchronisiert werden (standardmäßig 30 Tage).
- **§14a EnWG Preisberechnung:** Optionale Tarifberechnung für steuerbare Verbrauchseinrichtungen mit benutzerdefinierten Zeitfenstern (NT/HT) und automatischem Rückfall auf den Standardtarif (ST).
- **Benutzerdefinierte Abrechnungszeiträume:** Erfasst und verfolgt den Energieverbrauch und die Kosten basierend auf Ihrem benutzerdefinierten Abrechnungszeitraum (z. B. 18. bis 17.) gemäß der `octopus.periods` Kanal, aufgeteilt nach Standardraten-Slots (z. B. Go/Standard) mit einem statischen `current` Ordner zur besseren Übersicht.
- **Datenbankverlauf-Synchronisierung:** Native Backend-Integration mit InfluxDB-, SQL- und History-Adaptern zum direkten Pushen und Nachbefüllen von rohen 15-Minuten-Verbrauchsintervallen, ohne den ioBroker-Objektbaum aufzublähen.

---

### ⚙️ Installation

So installieren Sie diesen Adapter in Ihrer ioBroker-Umgebung:

1. Öffnen Sie Ihre ioBroker-Admin-Benutzeroberfläche.
2. Wechseln Sie zum Tab **„Adapter“** .
3. Suche nach **„Octopus Energy Monitor“** (oder `octopus-energy-monitor`).
4. Klicken Sie auf die Schaltfläche **+** (Hinzufügen) neben dem Adapter, um eine neue Instanz zu erstellen.

---

### 🔧 Konfiguration

1. **Octopus Energy (Kraken):**
   - Geben Sie Ihre üblichen Octopus-Anmeldedaten (E-Mail-Adresse und Passwort) ein.
   - Geben Sie Ihre Kontonummer ein (beginnt normalerweise mit 5). `A-`).
   - **Beginn des Abrechnungszeitraums:** Tag des Monats, an dem Ihr Abrechnungszyklus beginnt (Standardwert ist `1` (für einen normalen Kalendermonat). Wenn Ihr Zyklus vom 18. eines Monats bis zum 17. des Folgemonats dauert, wählen Sie `18` um die Ordner für den Abrechnungszeitraum unter `octopus.periods.<startDate>` und ein statisches `octopus.periods.current` Alias, einschließlich Slot-Split-Metriken.

2. **Inexogy:**
   - Geben Sie Ihre E-Mail-Adresse und Ihr Passwort für das Inexogy-Portal ein. Der Adapter verwaltet automatisch die Basisauthentifizierung und übersetzt sie in Discovergy-API-Abfragen.

3. **Allgemeine Einstellungen:**
   - **Diskrepanzschwelle:** Definiert, wie viele `kWh` Zwischen Octopus und Inexogy muss ein Unterschied bestehen, damit die Reaktion ausgelöst wird. `hasDiscrepancy: true` Statusflag. Standardwert ist `0.1 kWh` Die

4. **§14a EnWG-Einstellungen (optional):**
   - **§ 14a EnWG-Berechnung aktivieren:** Ist diese Option aktiviert, werden die täglichen Energiepreise unter Berücksichtigung der reduzierten Netzentgelte für steuerbare Verbrauchsgeräte berechnet.
   - **Gültig ab (JJJJ-MM-TT):** Legt fest, ab wann die EnWG-Berechnung beginnen soll. Eine Änderung dieses Datums (oder der Netzgebühren/Zeitfenster) löst eine automatische, rückwirkende Neuberechnung aller historischen Daten aus.
   - **Netzentgelte:** Geben Sie Ihre lokalen Netzentgelte für Nord-, Nord- und Südengland ein. Verwenden Sie das Kontrollkästchen, um anzugeben, ob die eingegebenen Werte brutto (einschließlich 19 % MwSt.) oder netto sind.
   - **Konfigurierbare Zeitfenster:** Definieren Sie Ihre lokalen NT- (Niedrigtarif) und HT-Zeiten (Hochtarif) pro Monat. Nicht definierte Zeiten greifen automatisch auf den ST-Tarif (Standardtarif) zurück. Die Zeitfenster dürfen sich nicht innerhalb desselben Monats überschneiden.

5. **Synchronisierung der Verlaufsdatenbank (optional):**
   - **Datenbanksynchronisierung aktivieren:** Wählen Sie Ihren Ziel-ioBroker-Historienadapter (z. B. InfluxDB) aus. Der Adapter registriert automatisch 15-Minuten-Zustände und überträgt die Rohdatenpunkte des Intervalls nachträglich in die ausgewählte Datenbank.

Nach der Konfiguration erledigt der Adapter den Rest! Er synchronisiert regelmäßig die Daten der letzten 30 Tage gemäß dem konfigurierten Aktualisierungsintervall. Die Daten werden unter folgendem Pfad angezeigt: `octopus-energy-monitor.0.history.YYYY.MM.DD` Weg.

### Historische Preisentwicklung

Neu abgerufene Tage verwenden die vertraglich vereinbarten und datierten Bruttopreise, die für jedes Intervall gelten. Fehlende oder uneindeutige Preise führen nicht zum Ausschluss des Verbrauchs: Die Kosten werden berücksichtigt. `null`, mit `totalCostAvailable=false` und täglich `costStatus=missing_historical_price` Dynamische Tarife, die anhand von Prognosen oder Produktnamen identifiziert werden, bleiben so lange unbepreist, bis tatsächliche historische Intervallpreise vorliegen; Prognosen und aktuelle Preise werden nicht ersetzt.

Die monatlichen Grundgebühren werden anteilig nach Kalendertag berechnet, wobei die Länge des jeweiligen Monats und der entsprechende Vertrag/Preiszeitraum berücksichtigt werden. `totalCostWithStandingChargeAvailable` Gibt an, ob der Gesamtbetrag verfügbar ist. Dies ist eine Schätzung, keine Lieferantenrechnung.

Vorhandene positive Tage bleiben im Cache. Aktivieren Sie **„Veraltete Tage mit historischen Preisen neu berechnen“** , um sie einmalig innerhalb des konfigurierten Synchronisierungs-/Aufbewahrungszeitraums zu korrigieren, jedoch nur, wenn vollständige historische Verbrauchspreise und Grundgebühren verfügbar sind. Versionsmarkierungen pro Quelle setzen unvollendete Arbeiten nach API-Limits oder Neustarts fort. Vorhandene Datenbankintervalle werden nicht erneut exportiert. Nicht korrigierte JSON-Einträge bleiben erhalten. `costStatus=legacy_unverified` Ihre bisherigen Beträge bleiben erhalten. Durch Deaktivieren der Option werden weitere Korrekturen an älteren Systemen verhindert.

### Synchronisierungsdiagnose

`info.sync` enthüllt `running`, `currentDay` (letzter Bearbeitungstag) und die geschätzte `nextRun` Zeitstempel. `info.api.octopus` Und `info.api.inexogy` Es werden der Zeitstempel der letzten erfolgreichen Antwort, ein bereinigter Fehlercode und der Status der Ratenbegrenzung/Abklingzeit angezeigt. Octopus-Abklingzeiten berücksichtigen die Wiederholungsrichtlinie; es wird keine automatische Wiederholungsrichtlinie von Inexogy angewendet. Diese Angaben beschreiben API-Antworten, nicht die Anzahl der garantierten Tage.

Neu ermittelte Intervalltage zeigen `quality` Unterhalb jeder täglichen Datenquelle: erwartete/empfangene unterschiedliche Viertelstunden, fehlende Intervalle, Duplikate, Konflikte, ungültige Intervalle und `complete` An Berliner Sommerzeittagen werden 92 oder 100 statt 96 Intervalle erwartet. Bei Antworten, die nur den Tag selbst betreffen, erfolgt keine Intervallqualitätsprüfung. Fehlende Intervalle dienen lediglich der Diagnose: Positive, zwischengespeicherte Tage werden aufgrund dieses Hinweises nicht erneut abgerufen. Tage ohne Datenverbrauch werden weiterhin erneut versucht.

### Automatische Netzgebühren gemäß §14a

Aktivieren Sie **die automatische Berechnung der Netzentgelte für Octopus Modul 3** zusätzlich zur bestehenden Berechnung nach §14a. Hierfür benötigen Sie Octopus-Zugangsdaten, ein Konto und einen Netzbetreibercode des ausgewählten Zählerstandorts. Im reinen Inexogy-Betrieb werden weiterhin die manuellen Einstellungen verwendet. Behalten Sie die gültigen manuellen Gebühren und Zeitfenster bei: Sie dienen als Ausweichlösung und werden nicht überschrieben.

Der Adapter fordert das deutsche OE-Backend an. `variableGridFees` Für jedes erforderliche Datum im Berliner Kalender werden ausschließlich Antworten von Modul 3 mit einem vollständigen, eindeutigen Viertelstundenplan, passendem Betreiber, expliziter Gültigkeitsdauer und einer eindeutigen Standardgebührenbasis berücksichtigt. Die API-Beträge werden, analog zur Integration in Home Assistant Deutschland, als **Netto-Cent/kWh** berechnet; automatische Bruttoanpassungen erfolgen anhand der Mehrwertsteuer des bestehenden Vertrags. Nachtzeitfenster und Sommerzeit werden unterstützt. Nicht unterstützte Zeitpläne oder fehlgeschlagene Anfragen greifen mit einer Warnung auf manuelle Einstellungen zurück.

Der In-Memory-Cache ist nach Konto, Betreiber und Datum begrenzt (24 Stunden für gültige Antworten, 15 Minuten für Ausweichergebnisse; maximal 400 Einträge). Das Backend verfügt über eigene Diagnosemechanismen für Wiederholungsversuche und Wartezeiten. `info.api.gridFees` Tägliche Aufzeichnung von Quellobjekten `gridFeeSource` (`api`, `manual`, `manual_fallback`), `gridFeeFallbackReason` und die angewandte `gridFeeSchedule` Diese Felder beschreiben die Berechnung des jeweiligen Tages, nicht die aktuellen Tarife.

Durch die Änderung der Einstellungen gemäß §14a werden die Tage innerhalb des konfigurierten Synchronisierungs-/Aufbewahrungszeitraums neu berechnet. Konfigurationsmarkierungen pro Quelle setzen unvollständige Neuberechnungen nach Neustarts oder API-Limits fort, ohne zwischengespeicherte Datenbankintervalle erneut zu exportieren. Positive Tage, die mit manuellem Fallback berechnet wurden, bleiben zwischengespeichert; eine spätere API-Wiederherstellung allein löst keinen erneuten Download der Verbrauchsdaten aus. Automatische Gebühren werden durch simulierte API-Tests abgedeckt, müssen aber vor der Veröffentlichung noch anhand eines realen Modul-3-Kontos und einer Rechnung validiert werden. Die berechneten Kosten bleiben Schätzungen.

Die aktuelle Netzgebührenabfrage kann eingesehen werden unter `info.api.gridFees`: `rawResponse` enthält die APIs `module` Und `gridFees` Felder vor der Validierung, `responseDate` ist der gewünschte Berlin-Tag. `httpStatus` ist der zurückgegebene Status (0, wenn keine Antwort erfolgt), und `responseTimestamp` datiert den Diagnoseversuch. `rejectionReason` Es werden fehlende Daten/Module, andere Module als Modul 3, leere Gebühren, ungültige Einträge, Gültigkeitsfehler, Lücken und Überschneidungen unterschieden; die Eintragsindizes beginnen bei null. Ein leerer Grund bedeutet, dass die Validierung erfolgreich war. Cache-Treffer aktualisieren diese Felder nicht, und es werden keine zusätzlichen Anfragen zur Diagnose ausgelöst. Fehlgeschlagene Versuche löschen die Antwort im JSON-Format. `null` Authentifizierungs-Header, Token und Kontodaten sind nicht enthalten. Diese Diagnosemeldungen geben lediglich die Ergebnisse der API wieder und stellen keine unabhängige Bestätigung der Modulregistrierung dar.

## Changelog
### 1.2.1 (2026-11-16)
* (tipp88) Use adapter-managed timers for API retry and pagination delays while preserving cancellation on unload.
* (tipp88) Add missing responsive layout sizes for historical repricing and automatic grid-fee checkboxes.
* (tipp88) Update @iobroker/testing from 6.3.1 to 6.3.2.

### 1.2.0 (2026-11-09)
* (tipp88) Expose raw Module 3 response fields, request date, HTTP status and precise grid-fee rejection reasons.
* (tipp88) Add opt-in, date-specific Module 3 grid fees with validated schedules, scoped caching and manual fallback.
* (tipp88) Record applied grid-fee sources and resume interrupted EnWG recalculations per source without duplicate interval exports.
* (tipp88) Expose sync/API diagnostics and DST-aware daily interval completeness without refetching positive cached days.
* (tipp88) Add bounded API retries, Retry-After cooldowns, expiry-aware JWT refresh and cancellable requests.
* (tipp88) Paginate bounded, meter-scoped Octopus measurements with duplicate and cursor checks.
* (tipp88) Resolve historical consumption prices and monthly standing charges by agreement and gross-price validity.
* (tipp88) Preserve consumption when historical prices are missing; expose unavailable costs as null with availability indicators.
* (tipp88) Add opt-in, versioned historical repricing within sync/retention limits without repeated interval exports.
* (tipp88) Use Europe/Berlin calendar-day boundaries and tariff times, including 23/25-hour daylight-saving days.
* (tipp88) Exclude out-of-day intervals while retaining the final Inexogy interval ending at midnight.
* (tipp88) Updated axios from 1.20.0 to 1.21.0.
* (tipp88) Updated development dependencies: @iobroker/testing 6.1.0 → 6.3.1, @iobroker/types 7.2.2 → 7.2.5, and @types/node 22.20.1 → 22.20.5.
* (tipp88) Handle all Octopus tariff windows for consumption and cost calculations, including Inexogy comparisons.
* (tipp88) Reject unmatched tariff intervals instead of assigning them to the first tariff.
* (tipp88) Recalculate affected multi-window tariff days once within the sync/retention range, resuming after API limits without re-exporting cached intervals.
* (tipp88) Compare only finite, positive daily consumption values while continuing to refetch zero-consumption days.
* (tipp88) Log discrepancies only when a day's stored comparison changes to a discrepancy.
* (tipp88) Mark unavailable comparisons explicitly and clear outdated daily and tariff-slot differences.

### 1.1.0 (2026-09-24)
* (tipp88) Added standalone Inexogy and Octopus operation with independent data retrieval and history export.
* (tipp88) Restricted comparisons to days with data from both providers.
* (tipp88) Added Inexogy monthly, yearly and current billing-period consumption totals.
* (tipp88) Fixed current billing-period aggregation on the first synchronization by prioritizing recent history.
* (tipp88) Added diagnostics for Octopus usage API HTTP and GraphQL errors.
* (tipp88) Stopped repeated Octopus requests within a synchronization after an API rate-limit response.
* (tipp88) Added EnWG NT, ST and HT consumption and cost totals to Octopus billing periods.

### 1.0.1 (2026-09-14)
* (tipp88) Fixed consumption data for previous days not updating automatically when initially retrieved with 0 kWh (Issue #31).
* (tipp88) Upgraded axios dependency to 1.20.0.
* (tipp88) Upgraded `@iobroker/testing` devDependency to 6.1.0.

### 1.0.0 (2026-08-27)
* (tipp88) Fixed the three missing history database synchronization translations reported in issue #18.

## License
MIT License

Copyright (c) 2026 tipp88

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