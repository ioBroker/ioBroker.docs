---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.octopus-energy-monitor/README.md
title: ioBroker.octopus-energy-monitor
hash: +aJKE9pPuMhjqjVldd28gNg+XCFGxx5L6Uun+iIIH6w=
---
![Logo](../../../en/adapterref/iobroker.octopus-energy-monitor/admin/octopus-energy-monitor.svg?v=3)

![NPM-Version](https://img.shields.io/npm/v/iobroker.octopus-energy-monitor.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.octopus-energy-monitor.svg)
![Anzahl der Installationen](https://iobroker.live/badges/octopus-energy-monitor-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/octopus-energy-monitor-stable.svg)
![NPM](https://nodei.co/npm/iobroker.octopus-energy-monitor.png?downloads=true)

# IoBroker.octopus-energy-monitor
**Tests:** ![Test und Freigabe](https://github.com/tipp88/ioBroker.octopus-energy-monitor/workflows/Test%20and%20Release/badge.svg)

## IoBroker.octopus-energy-monitor
Der **Octopus Energy Monitor**-Adapter ruft regelmäßig die täglichen Stromverbrauchsdaten von **[Octopus Energy (Kraken API) und Inexogy](https://www.inexogy.com) (Discovergy/Statistics API)** ab und speichert sie automatisch in Ihrem ioBroker-Objektbaum.

Seine Hauptaufgabe besteht darin, Abweichungen zwischen den Abrechnungs- und Messdaten Ihres intelligenten Stromzählers (Inexogy) und Ihres Energieversorgers (Octopus Energy) zu erkennen. Jede Nacht vergleicht der Adapter beide Datensätze und kennzeichnet täglich Abweichungen, die einen konfigurierbaren Schwellenwert überschreiten.

### 🌟 Funktionen
* **Vollständige Kraken GraphQL-Unterstützung:** Authentifiziert über Ihre Octopus JWT-Token und löst Kontoeigenschaften dynamisch auf, um präzise Verbrauchsdaten abzurufen.
* **Dynamische Tarif- und Zeitfensterunterstützung:** Ihr aktiver Octopus-Tarif (z. B. Intelligent Octopus Go) und die zugehörigen Zeitfenster werden automatisch erkannt. Eine manuelle Konfiguration der „Go“-Stunden ist nicht erforderlich!
* **Automatische Kostenberechnung:** Berechnet automatisch die täglichen, monatlichen und jährlichen Energiekosten in **Euro (€)** auf Basis Ihrer aktuellen Tarife.
* **Hierarchische Historie:** Strukturiert Daten in einem übersichtlichen `history.YYYY.MM.DD`-Baum mit automatischer Aggregation von Verbrauch und Kosten für Monate und Jahre.
* **Geschätzter Zählerstand:** Berechnet Ihren aktuellen Stromzählerstand, indem der letzte offizielle Kraken-Zählerstand mit Ihrem nachfolgenden täglichen Verbrauch kombiniert wird.
* **Inexogy (Discovergy) Vergleich:** Nutzt die Inexogy API, um Verbrauchsdaten mit den Daten Ihres Anbieters zu vergleichen und so Abrechnungsdifferenzen aufzudecken.
* **Master Data Insight:** Bietet Transparenz über Ihren Kontostand, Zählerdetails und beteiligte Netzbetreiber (MOP/DNO).
* **Intelligente Ladesteuerung:** Dynamisches Abrufen von Intelligent Octopus-Geräten (Elektrofahrzeuge/Ladegeräte) und Umschalten des intelligenten Ladens (Anhalten/Fortsetzen) direkt über ioBroker.
* **Inexogy Stammdaten & Live-Ablesung:** Seriennummern, Standortdetails und aktuelle Zählerstände von Inexogy abrufen.
* **Intelligentes Caching:** Minimiert die API-Last, indem nur fehlende Datenpunkte nachträglich synchronisiert werden (Standard: 30 Tage).
* **§14a EnWG Preisberechnung:** Optionale Tarifberechnung für steuerbare Verbrauchseinrichtungen mit benutzerdefinierten Zeitfenstern (NT/HT) und automatischem Rückgriff auf den Standardtarif (ST).
* **Benutzerdefinierte Abrechnungszeiträume:** Erfasst und verfolgt den Energieverbrauch und die Kosten basierend auf Ihrem benutzerdefinierten Abrechnungszeitraum-Starttag (z. B. 18. bis 17.) unter dem Kanal `octopus.periods`, aufgeteilt nach Standardtarifabschnitten (z. B. Go/Standard) mit einem statischen Ordner `current` zur einfachen Visualisierung.
* **Datenbankverlauf-Synchronisierung:** Native Backend-Integration mit InfluxDB-, SQL- und History-Adaptern zum direkten Pushen und Nachfüllen von rohen 15-Minuten-Verbrauchsintervallen, ohne den ioBroker-Objektbaum aufzublähen.

---

### ⚙️ Installation
So installieren Sie diesen Adapter in Ihrer ioBroker-Umgebung:

1. Öffnen Sie Ihre ioBroker-Admin-Benutzeroberfläche.
2. Wechseln Sie zum Tab **"Adapter"**.
3. Suche nach **"Octopus Energy Monitor"** (oder `octopus-energy-monitor`).
4. Klicken Sie auf die Schaltfläche **+** (Hinzufügen) neben dem Adapter, um eine neue Instanz zu erstellen.

---

### 🔧 Konfiguration
1. **Octopus Energy (Kraken):**
- Geben Sie Ihre üblichen Octopus-Anmeldedaten (E-Mail-Adresse und Passwort) ein.
- Geben Sie Ihre Kontonummer ein (beginnt normalerweise mit `A-`).
- **Starttag des Abrechnungszeitraums:** Tag des Monats, an dem Ihr Abrechnungszyklus beginnt (Standardwert ist `1` für einen normalen Kalendermonat). Wenn Ihr Zyklus vom 18. eines Monats bis zum 17. des Folgemonats läuft, wählen Sie `18`, um die Abrechnungszeitraumordner unter `octopus.periods.<startDate>` und einen statischen Alias `octopus.periods.current` einschließlich der Metriken für die Zeitschlitzaufteilung zu generieren.

2. **Inexogie:**
Geben Sie Ihre E-Mail-Adresse und Ihr Passwort für das Inexogy-Portal ein. Der Adapter verwaltet automatisch die Basisauthentifizierung und übersetzt sie in Discovergy-API-Abfragen.

3. **Allgemeine Einstellungen:**
- **Abweichungsschwelle:** Definiert die Differenz in kWh zwischen Octopus und Inexogy, die erforderlich ist, um das Statusflag `hasDiscrepancy: true` auszulösen. Der Standardwert ist 0,1 kWh.

4. **§14a EnWG-Einstellungen (optional):**
- **§ 14a EnWG-Berechnung aktivieren:** Bei Aktivierung werden die täglichen Energiepreise unter Berücksichtigung der reduzierten Netzentgelte für steuerbare Verbrauchsgeräte berechnet.
- **Gültig ab Datum (JJJJ-MM-TT):** Legt fest, ab wann die EnWG-Berechnung beginnen soll. Eine Änderung dieses Datums (oder der Netzgebühren/Zeitfenster) löst eine automatische, rückwirkende Neuberechnung aller historischen Daten aus.
**Netzgebühren:** Geben Sie Ihre lokalen Netzgebühren für Nord-, Nord- und Südengland ein. Verwenden Sie das Kontrollkästchen, um anzugeben, ob die eingegebenen Werte brutto (einschließlich 19 % MwSt.) oder netto sind.
**Konfigurierte Zeitfenster:** Legen Sie Ihre lokalen NT- (niedriger Tarif) und HT-Zeiten (hoher Tarif) pro Monat fest. Nicht definierte Zeiten werden automatisch auf den ST-Tarif (Standardtarif) zurückgesetzt. Die Zeitfenster dürfen sich nicht innerhalb desselben Monats überschneiden.
6. **Synchronisierung der Verlaufsdatenbank (optional):**
- **Datenbanksynchronisierung aktivieren:** Wählen Sie Ihren Ziel-ioBroker-History-Adapter (z. B. InfluxDB) aus. Der Adapter registriert automatisch 15-Minuten-Zustände und überträgt die Rohdatenpunkte rückwirkend in die ausgewählte Datenbank.

Nach der Konfiguration erledigt der Adapter den Rest! Er synchronisiert regelmäßig die Daten der letzten 30 Tage gemäß dem konfigurierten Aktualisierungsintervall. Die Daten werden unter dem Pfad `octopus-energy-monitor.0.history.YYYY.MM.DD` gespeichert.

## Changelog
### 0.7.0 (2026-07-13)
* (tipp88) Implemented native historical database synchronization to automatically push 15-minute intervals directly to InfluxDB, SQL, or History instances.
* (tipp88) Massively optimized Inexogy retroactive API polling by switching to the Discovergy `readings` endpoint, fetching 96 data points in a single request.
* (tipp88) Fixed strict ioBroker JSON schema compliance bugs in `admin/jsonConfig.json` regarding dropdown instance filtering.
* (tipp88) Fixed calculated meter reading (`octopus.info.meterReading`) state missing `kWh` unit
* (tipp88) Fixed permissions in Dependabot auto-merge workflow (`issues: write`)

### 0.6.8 (2026-07-06)
* (tipp88) Fixed `rate.name` from external API being used unsanitized in ioBroker object IDs.
* (tipp88) Fixed `setSmartChargeStatus()` sending the sanitized device ID to Octopus API instead of original ID.
* (tipp88) Optimized database interval sync by consolidating all object scans into a single pre-fetch.

### 0.6.7 (2026-07-01)
* (tipp88) Fixed missing UI translations for the `updateInterval` minimum warning.
* (tipp88) Fixed missing external object ID sanitization (ioBroker repo compliance).
* (tipp88) Enforced a 15-minute minimum for `updateInterval` to prevent excessive cloud polling.
* (tipp88) Refactored `fetchInexogy` and optimized object scanning overhead during history aggregation.
* (tipp88) Capped `syncDays` retroactive data fetching to `retentionDays` to avoid fetching data that would immediately be deleted.

### 0.6.6 (2026-06-29)
* (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.6.5 (2026-06-29)
* (tipp88) Fixed ioBroker repository PR compliance issues (added API timeouts, refactored timer logic, removed dead config, implemented data retention, and updated translation keys).
* (tipp88) Upgraded `@iobroker/types` devDependency to 7.2.2.

[Older changelogs can be found there](CHANGELOG_OLD.md)

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