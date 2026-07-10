---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tidy/README.md
title: ioBroker-Adapter zur Ermittlung ungenutzter Zustände
hash: I+Mmo7ItP91tVwL56+kjrMG+l3yTMH61TLhNIJhHY5k=
---
![Logo](../../../en/adapterref/iobroker.tidy/admin/tidy.svg)

![Anzahl der Installationen](https://iobroker.live/badges/tidy-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/tidy-stable.svg)
![NPM-Version](https://nodei.co/npm/iobroker.tidy.svg?style=shields&data=v,u,d&color=orange)
![Downloads](https://img.shields.io/npm/dm/iobroker.tidy.svg)
![GEMEINSCHAFT](https://img.shields.io/badge/community%20-ioBroker%20|%20forum-blue.svg)
![WARTUNGSKRAFT](https://img.shields.io/badge/maintainer-skvarel%20@%20inventwo-yellowgreen.svg)
![KI](https://img.shields.io/badge/ai%20assisted-cursor-blue.svg)
![PayPal-Spende](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)

# IoBroker-Adapter zur Ermittlung ungenutzter Zustände
---

## Was dieser Adapter bewirkt
Der **Tidy**-Adapter hilft Ihnen, ungenutzte Objekte und Zustände zu finden und Ihr System zu bereinigen. Nach jahrelanger Nutzung von ioBroker können sich auf Ihrem System „tote“ Datenpunkte ansammeln, die durch gelöschte Skripte, entfernte Adapter oder verwaiste Konfigurationen entstanden sind. Dieser Adapter unterstützt Sie dabei, solche Datenpunkte zu identifizieren und zu entfernen, damit Ihr System übersichtlich und leistungsstark bleibt.

## Merkmale
- **📊 Pfadbasierte Suche**: Konfigurieren Sie mehrere Pfade, die über die Objektauswahl durchsucht werden sollen (z. B. `0_userdata.0`, `alias.0`)
- **🚫 Ausnahmen**: Absichtlich statische Datenpunkte, ganze Ordner oder Platzhaltermuster von den Scanergebnissen ausschließen
- **🔍 Intelligente Erkennung**: Identifiziert verschiedene Arten problematischer Datenpunkte:
- **Veraltet**: Nie aktualisiert oder extrem alt (konfigurierbarer Schwellenwert, Standard: 365 Tage)
- **Veraltet**: Wurde in letzter Zeit nicht aktualisiert (konfigurierbarer Schwellenwert, Standard: 90 Tage)
- **Verwaiste Aliase**: Aliase, die auf nicht existierende Zieldatenpunkte verweisen
- **Nicht definiert**: Datenpunkte, die seit dem Systemstart nie beschrieben wurden.
- **⚙️ Flexible Konfiguration**:
- Konfigurierbare Altersschwellenwerte für die Erkennung von „veralteten“ und „toten“ Geräten
- Optionale automatische Scans in konfigurierbaren Intervallen (stündlich)
- Einzelne Scanpfade aktivieren/deaktivieren
- Optionaler vollständiger Scan des gesamten Objektbaums
- **🌐 Vollständiger Scan**: Scannt alle Zustände im System (nicht beschränkt auf konfigurierte Pfade) über einen separaten Ergebniskanal.
- **🎯 Manuelle Auslöser**: Jeder konfigurierte Pfad erhält eine Auslöseschaltfläche, um Scans bei Bedarf auszuführen.
- **📋 JSON-Tabellenausgabe**: Die Ergebnisse werden als JSON-Arrays bereitgestellt und eignen sich ideal für Tabellen-Widgets in VIS.
- **📈 Statistiken**: Automatische Zähler für Gesamt-, Tot-, veraltete und verwaiste Datenpunkte

## Konfiguration
### Allgemeine Einstellungen
- **Automatische Scans aktivieren**: Wenn diese Option aktiviert ist, werden alle konfigurierten Pfade automatisch gescannt.
- **Alle Objekte scannen (vollständig)**: Wenn diese Option aktiviert ist, scannt der Adapter den gesamten Objektbaum und speichert die Ergebnisse in einem separaten `complete`-Kanal (siehe unten).
- **Scanintervall**: Wie oft automatische Scans ausgeführt werden sollen (in Stunden, mindestens 1)
- **Tage bis zur 'Veraltung'**: Datenpunkte, die über diese Anzahl von Tagen nicht aktualisiert wurden, werden als veraltet markiert (Warnung).
- **Tage bis zum Status „tot“**: Datenpunkte, die über diese Anzahl von Tagen nicht aktualisiert wurden, werden als tot (kritisch) markiert.

### Scanpfade
Konfigurieren Sie einen oder mehrere zu überwachende Pfade:

- **Aktiviert**: Diesen Scanpfad aktivieren/deaktivieren
- **Scanpfad**: Wählen Sie einen Ordner aus der Objektstruktur oder geben Sie einen Pfad manuell ein (z. B. `0_userdata.0`, `alias.0`, `javascript.0`). Das Feld bleibt nach der Auswahl bearbeitbar.
- **Alle Adapterinstanzen**: Entfernen Sie die Instanznummer, um jede Instanz zu durchsuchen – z. B. findet `alias` anstelle von `alias.0` `alias.0`, `alias.1` usw.
- **Name**: Ein aussagekräftiger Name für diesen Pfad (wird zur Benennung des Ergebniszustands verwendet)
- **Überprüfung von Alias-Zielen**: Bei `alias.*`-Pfaden wird geprüft, ob die Zieldatenpunkte noch vorhanden sind (Erkennung von Geisterdaten).

### Ausnahmen
Datenpunkte ausschließen, die nicht in den Scan-Ergebnissen oder Statistiken erscheinen sollen:

- **Objekt**: Wählen Sie einen einzelnen Status oder einen Ordner/Kanal aus, um einen gesamten Unterbaum auszuschließen. Platzhalter werden unterstützt: `*` steht für ein beliebiges Suffix, `?` für ein einzelnes Zeichen (z. B. `0_userdata.0.rollo.trigger*`).
- **Kommentar**: Optionale Anmerkung (z. B. warum dieser Datenpunkt ausgeschlossen wurde)

Verwenden Sie diese Option für Konfigurationswerte, die sich selten ändern (z. B. einen gespeicherten Radiosender für ein Alarmskript), damit sie nicht als ungültig oder veraltet gekennzeichnet werden.

Ausnahmen gelten für pfadbasierte Scans und den vollständigen Scan. Jeder Scankanal liefert **`exceptionCount`** – die Anzahl der beim letzten Scan ausgeschlossenen Datenpunkte (0, falls keine ausgeschlossen wurden).

## Datenpunkte
Für jeden konfigurierten Pfad (z. B. „userdata“) erstellt der Adapter Folgendes:

- **`tidy.0.userdata.trigger`** (Schaltfläche): Klicken Sie hier, um einen Scan manuell zu starten.
- **`tidy.0.userdata.result`** (json): Vollständige Scan-Ergebnisse als JSON-Tabelle
- **`tidy.0.userdata.lastScan`** (Zeitstempel): Wann wurde der letzte Scan durchgeführt?
- **`tidy.0.userdata.count`** (Zahl): Insgesamt gefundene Datenpunkte
- **`tidy.0.userdata.deadCount`** (Zahl): Anzahl der toten Datenpunkte
- **`tidy.0.userdata.staleCount`** (Zahl): Anzahl der veralteten Datenpunkte
- **`tidy.0.userdata.orphanedCount`** (Zahl): Anzahl der verwaisten Aliase
- **`tidy.0.userdata.exceptionCount`** (Zahl): Anzahl der von der Ausnahmeliste ausgeschlossenen Datenpunkte

Wenn in den allgemeinen Einstellungen **Alle Objekte scannen (vollständig)** aktiviert ist, erstellt der Adapter zusätzlich Folgendes:

- **`tidy.0.complete.trigger`** (Schaltfläche): Klicken Sie hier, um einen vollständigen Scan manuell zu starten.
- **`tidy.0.complete.result`** (json): Scan-Ergebnisse für alle Zustände im System
- **`tidy.0.complete.lastScan`** (Zeitstempel): Wann der letzte vollständige Scan durchgeführt wurde
- **`tidy.0.complete.count`** (Zahl): Gesamtzahl der gefundenen Datenpunkte
- **`tidy.0.complete.deadCount`** (Zahl): Anzahl der toten Datenpunkte
- **`tidy.0.complete.staleCount`** (Zahl): Anzahl der veralteten Datenpunkte
- **`tidy.0.complete.orphanedCount`** (Zahl): Anzahl der verwaisten Aliase
- **`tidy.0.complete.exceptionCount`** (Zahl): Anzahl der von der Ausnahmeliste ausgeschlossenen Datenpunkte

Der vollständige Scan verwendet dieselbe JSON-Ergebnisstruktur wie pfadbasierte Scans. Automatische Scans beinhalten den vollständigen Scan, wenn diese Option aktiviert ist.

### JSON-Ergebnisstruktur
Der Zustand `result` enthält ein JSON-Array mit den folgenden Feldern für jeden Datenpunkt:

```json
[
  {
    "id": "0_userdata.0.hallway.light_auto",
    "name": "Hallway Light Automation",
    "last_ts": 1712856000000,
    "last_ts_iso": "2026-04-11T16:00:00.000Z",
    "value": true,
    "status": "active",
    "issue": null,
    "size": 4
  },
  {
    "id": "0_userdata.0.test.old_value",
    "name": "Test Datapoint",
    "last_ts": null,
    "last_ts_iso": "undefined",
    "value": 15,
    "status": "undefined",
    "issue": "dead",
    "size": 2
  }
]
```

**Feldbeschreibungen:**

| Fachgebiet | Beschreibung | Zweck |
|-------|-------------|---------|
| `id` | Vollständiger Datenpunktpfad | Eindeutige Kennung |
| `last_ts` | Unix-Zeitstempel (ms) oder null | Sortierung im Hintergrund |
| `last_ts_iso` | ISO 8601 Datumszeichenfolge | In Tabelle anzeigen |
| `value` | Aktueller Datenpunktwert | Letzte Prüfung vor dem Löschen |
| `status` | `active`, `dead`, `stale`, `undefined`, `orphaned` | Klassifizierung (Englisch) |
| `status_de` | `aktiv`, `inaktiv`, `veraltet`, `undefiniert`, `verwaist` | Klassifizierung (Deutsch) |
| `issue` | `dead`, `stale`, `orphaned_alias` oder `null` | Filterkriterium (null = OK) |
| `issue_de` | `inaktiv`, `veraltet`, `verwaistes Alias` oder `null` | Filterkriterium (Deutsch) |
| `size` | `JSON.stringify(val).length` | Findet "Speicherfresser" |
| `size` | `JSON.stringify(val).length` | Findet "Speicherfresser" |

## Anwendungsbeispiele
### Grundlegende Einrichtung
1. Installieren und konfigurieren Sie den Adapter
2. Fügen Sie einen zu durchsuchenden Pfad mithilfe der Objektauswahl hinzu (z. B. `0_userdata.0`) oder geben Sie ihn manuell ein.
3. Geben Sie ihr einen Namen (z. B. „Benutzerdaten“).
4. Konfiguration speichern
5. Der Adapter führt sofort einen ersten Scan durch.
6. Ergebnisse in `tidy.0.userdata.result` anzeigen

### Multi-Instance Scan Paths
Um alle Instanzen eines Adapters zu scannen, entfernen Sie die Instanznummer aus dem Pfad, nachdem Sie Folgendes ausgewählt haben:

- `alias.0` → nur die erste Aliasinstanz scannen
- `alias` → durchsucht `alias.0`, `alias.1` und alle anderen Aliasinstanzen

Das Pfadfeld bleibt auch nach Verwendung der Objektauswahl vollständig bearbeitbar.

### Ausnahmen
1. Öffnen Sie die Registerkarte **Ausnahmen** in der Adapterkonfiguration.
2. Datenpunkte hinzufügen, die ignoriert werden sollen (z. B. selten aktualisierte Konfigurationswerte)
3. Wählen Sie einen einzelnen Zustand für einen Datenpunkt, einen Ordner, um einen ganzen Teilbaum auszuschließen, oder geben Sie ein Platzhaltermuster ein (z. B. `0_userdata.0.rollo.trigger*`).
4. Konfiguration speichern – ausgeschlossene Datenpunkte werden nicht mehr in den Scanergebnissen oder Zählungen angezeigt.

### VIS-Integration
Nutzen Sie das JSON-Ergebnis mit einem Tabellen-Widget, um Ihre Datenpunkte anzuzeigen und zu sortieren:

1. Erstellen Sie ein Tabellen-Widget in VIS (z. B. inventwo Table Widget)
2. Binden Sie es an `tidy.0.userdata.result`
3. Spalten konfigurieren:
- Für **deutsche** Tabellen: `id`, `name`, `last_ts_iso`, `status_de`, `issue_de`
- Für **englische** Tabellen: `id`, `name`, `last_ts_iso`, `status`, `issue`
4. Sortieren Sie nach `last_ts` (älteste zuerst), um die "totsten" Datenpunkte zu finden.
5. Filtern Sie nach `issue != null`, um nur problematische Datenpunkte anzuzeigen.

### Vollständiger Scan
1. Aktivieren Sie in den allgemeinen Einstellungen die Option **Alle Objekte scannen (vollständig)**.
2. Konfiguration speichern – der Adapter führt einen ersten vollständigen Scan durch
3. Ergebnisse in `tidy.0.complete.result` anzeigen
4. Verwenden Sie `tidy.0.complete.trigger` für manuelle Neuscans jederzeit.

Nutzen Sie den vollständigen Scan, um einen Überblick über alle Zustände Ihrer Instanz zu erhalten. Für eine gezielte Bereinigung sind pfadbasierte Scans (z. B. `0_userdata.0`, `alias.0`) in der Regel praktischer.

### Automatische Wartung
1. Aktivieren Sie in den Einstellungen die Option „Automatische Scans“.
2. Stellen Sie das Intervall auf 24 Stunden ein (einmal täglich).
3. Überwachen Sie die Statistiken `deadCount` und `staleCount`.
4. Ergebnisse wöchentlich überprüfen, um Sanierungskandidaten zu identifizieren

## Unterstützung
Wenn Ihnen unsere Arbeit gefällt und Sie uns unterstützen möchten, freuen wir uns über jede Spende.

(Dieser Link führt zu unserem PayPal-Konto und steht in keiner Verbindung zu ioBroker.)

[![Spenden](img/support.png)](https://www.paypal.com/donate?hosted_button_id=7W6M3TFZ4W9LW)

## Ältere Änderungen
- [CHANGELOG_OLD.md](CHANGELOG_OLD.md)

## Changelog
<!--
	### **WORK IN PROGRESS**
-->

### 0.3.3 (2026-06-18)
- (skvarel) Fixed complete scan failing with "Invalid string length" on large instances
- (skvarel) Modified complete scan to load states in bulk instead of one-by-one

### 0.3.2 (2026-06-18)
- (skvarel) Removed accidentally committed local dev-server data directory from repository (fixes #14)

### 0.3.1 (2026-06-16)
- (skvarel) Added admin UI help text explaining "Check alias targets" on Scan Paths tab (boxed info panel)
- (skvarel) Fixed alias target check for read/write split aliases (common.alias.id with read and write)

### 0.3.0 (2026-06-13)
- (skvarel) Added wildcard patterns for exception list (* matches any suffix, ? matches one character)

### 0.2.4 (2026-06-11)
- (skvarel) Fixed admin UI translations for scan path tooltips and help texts
- (skvarel) Fixed runtime validation for scan interval and stale/dead thresholds
- (skvarel) Modified scan result timestamps to use ISO 8601 format

## License

MIT License

Copyright (c) 2026 skvarel <skvarel@inventwo.com>

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