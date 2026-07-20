---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.influxdb-prologger/README.md
title: ioBroker.influxdb-prologger
hash: 790TWubjJyY0CR5rsVb581LTViLkEz9OZK5TcWf39MM=
---
![Logo](../../../en/adapterref/iobroker.influxdb-prologger/admin/influxdb-prologger.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.influxdb-prologger.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.influxdb-prologger.svg)
![Anzahl der Installationen](https://iobroker.live/badges/influxdb-prologger-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/influxdb-prologger-stable.svg)
![NPM](https://nodei.co/npm/iobroker.influxdb-prologger.png?downloads=true)

# IoBroker.influxdb-prologger
**Tests:** ![Test und Freigabe](https://github.com/simpros/ioBroker.influxdb-prologger/workflows/Test%20and%20Release/badge.svg)

## InfluxDB ProLogger-Adapter für ioBroker
Flexibler InfluxDB v2 Datenlogger mit konfigurierbaren Protokollierungsgruppen, mehreren Buckets, Cron-basierten und Änderungs-Triggern.

**Wichtig:** Dieser Adapter ist ein **schreibgeschützter Datenlogger**. Er sendet ioBroker-Statuswerte *an* InfluxDB v2 – er liest **keine** historischen Daten zurück in ioBroker und implementiert nicht die Standard-Schnittstelle des ioBroker-History-Adapters. Wenn Sie gespeicherte Verlaufsdaten in ioBroker abfragen müssen (z. B. für Diagramme oder Skripte über `getHistory`), verwenden Sie stattdessen die offizielle Schnittstelle [ioBroker InfluxDB-Adapter](https://github.com/ioBroker/ioBroker.influxdb).


Ziel dieses Adapters ist es, Ihnen mehr Flexibilität bei der *Art* des Datenschreibens in InfluxDB zu bieten: Sie können mehrere Protokollierungsgruppen mit unterschiedlichen Buckets, Triggertypen (Cron oder Änderungsalgorithmus), benutzerdefinierten Messnamen, Feldschlüsseln und Tags definieren – unabhängig vom integrierten History-System von ioBroker.

## Merkmale
- **Mehrere Protokollierungsgruppen** - Definieren Sie separate Gruppen mit unterschiedlichen InfluxDB-Buckets und Triggertypen
- **Cron-basierte Protokollierung** - Periodisches Sammeln und Stapelschreiben von Datenpunkten (z. B. alle 15 Minuten)
- **Änderungsprotokollierung** - Daten werden sofort in InfluxDB geschrieben, wenn sich ein Statuswert ändert (spontane Schreibvorgänge)
- **Mehrere Buckets** - Jede Protokollierungsgruppe kann in einen anderen InfluxDB-Bucket schreiben.
- **InfluxDB v2 Line Protocol** - Native HTTP-API-Schreibvorgänge über das InfluxDB Line Protocol
- **Wiederholungsversuche mit exponentiellem Backoff** - Konfigurierbare Wiederholungslogik für fehlgeschlagene Schreibvorgänge
- **Verschlüsselte Token-Speicherung** - Das API-Token wird verschlüsselt in der Datenbank von ioBroker gespeichert.
- **Verbindungstest** - Testen Sie Ihre InfluxDB-Verbindung direkt über die Admin-Oberfläche.
- **Admin-UI** - Vollständig konfigurierbar über die ioBroker-Admin-Oberfläche (JSON-Konfiguration)

## Anforderungen
- ioBroker mit js-controller >= 6.0.11
- ioBroker Admin >= 7.0.23
- Node.js >= 20
- InfluxDB v2-Instanz

## Konfiguration
### 1. Registerkarte „Verbindungen“
Konfigurieren Sie Ihre InfluxDB v2-Verbindung:

| Schauplatz | Beschreibung |
|---------|-------------|
| Protokoll | HTTP oder HTTPS |
| Host | Hostname oder IP-Adresse des InfluxDB-Servers (z. B. `192.168.10.191`) |
| Port | InfluxDB-Server-Port (Standard: `8086`) |
| Organisation | Ihr InfluxDB-Organisationsname |
| API-Token | InfluxDB-API-Token (verschlüsselt gespeichert) |

Verwenden Sie die Schaltfläche **Verbindung testen**, um die Konnektivität zu überprüfen.

### 2. Registerkarte „Protokollgruppen“
Definieren Sie eine oder mehrere Protokollierungsgruppen. Jede Gruppe enthält:

| Schauplatz | Beschreibung |
|---------|-------------|
| Aktiviert | Diese Gruppe aktivieren/deaktivieren |
| Gruppenname | Eindeutiger Name für diese Gruppe (auf den von den Datenpunkten verwiesen wird) |
| Bucket | InfluxDB-Bucket, in den geschrieben werden soll |
| Auslösertyp | `Cron (periodic)` oder `On Change` |
| Cron-Ausdruck | Cron-Zeitplan (nur für Cron-Gruppen), z. B. `*/15 *** *` |
| Stapelverarbeitung | Stapelverarbeitung aktivieren (für Cron-Gruppen) |

**Beispielgruppen:**

| Name | Bucket | Trigger | Cron |
|------|--------|---------|------|
| Betriebsstunden | iobroker | Cron | `*/15 * * * *` |
| Spontanwerte | iob_spontanwerte | Auf Veränderung | - |

### 3. Registerkarte „Datenpunkte“
Konfigurieren Sie, welche ioBroker-Zustände protokolliert werden sollen. Jeder Datenpunkt muss auf eine Protokollierungsgruppe verweisen:

| Schauplatz | Beschreibung |
|---------|-------------|
| Aktiviert | Diesen Datenpunkt aktivieren/deaktivieren |
| Gruppe | Name der Protokollierungsgruppe (muss mit einer Gruppe aus Registerkarte 2 übereinstimmen) |
| Objekt-ID | Zu lesender ioBroker-Status (verwenden Sie den Objektbrowser) |
| Messung | Name der InfluxDB-Messung |
| Feld | InfluxDB-Feldname |
| Tags | InfluxDB-Tags im Format `key=value` (z. B. `area=kitchen,floor=eg`) |

**Beispieldatenpunkte:**

| Gruppe | Objekt-ID | Messung | Feld | Tags |
|-------|-----------|-------------|-------|------|
| Betriebsstunden | `0_userdata.0.Heizkessel` | Betriebssekunden | zaehlerstand | `area=heizkessel` |
| Spontanwerte | `shelly.1.EM0.TotalActivePower` | Energie | elektrische_leistung_haus | `area=gesamtenergiebedarf` |

### 4. Registerkarte „Erweitert“
| Schauplatz | Beschreibung |
|---------|-------------|
| Schreib-Timeout | Timeout für HTTP-Anfragen in ms (Standard: 5000) |
| Wiederholung bei Fehler | Fehlgeschlagene Schreibvorgänge mit exponentiellem Backoff wiederholen |
| Maximale Wiederholungsversuche | Maximale Anzahl an Wiederholungsversuchen (Standard: 3) |
| Debug-Protokollierung | Ausführliche Debug-Protokollierung aktivieren |

## So funktioniert es
### Cron-Gruppen (Periodische Protokollierung)
1. In jedem Cron-Intervall liest der Adapter alle konfigurierten Statuswerte in der Gruppe.
2. Die Werte sind im InfluxDB-Leitungsprotokoll formatiert.
3. Alle Zeilen werden in einem einzigen HTTP-POST-Request in InfluxDB geschrieben.

### On-Change-Gruppen (Spontane Protokollierung)
1. Der Adapter abonniert den ioBroker-Status jedes Datenpunkts.
2. Wenn sich ein Statuswert ändert, wird der neue Wert sofort in InfluxDB geschrieben.
3. Jede Änderung löst einen einzelnen HTTP-POST-Request aus.

### InfluxDB-Leitungsprotokoll
Die Daten werden im InfluxDB v2-Zeilenprotokollformat geschrieben:

```
measurement,tag1=value1,tag2=value2 field=value
```

Beispiel:

```
betriebssekunden,area=heizkessel zaehlerstand=12345.6
energie,area=gesamtenergiebedarf elektrische_leistung_haus=4521.3
```

## Migration von ioBroker-Skripten
Wenn Sie derzeit ioBroker JavaScript-Skripte für die InfluxDB-Protokollierung verwenden, können Sie zu diesem Adapter migrieren:

1. Installieren Sie den Adapter.
2. Konfigurieren Sie Ihre InfluxDB-Verbindung (gleicher Host, Port, Organisation, Token)
3. Erstellen Sie Protokollierungsgruppen, die Ihrer Skriptkonfiguration entsprechen:
- Skripte, die `on({ id: ..., val: true })` mit einem Auslösestatus verwenden -> Erstellen Sie eine **Cron**-Gruppe
- Skripte, die `on({ id: objectId })` für jeden Status verwenden -> Erstellen Sie eine **Bei Änderung**-Gruppe
4. Fügen Sie alle Datenpunkte aus Ihren `loggingTemplate`-Arrays hinzu.
5. Deaktivieren Sie Ihre alten Skripte
6. Überprüfen Sie, ob Daten in InfluxDB fließen.

## Skripte in `package.json`
| Skriptname | Beschreibung |
|-------------|-------------|
| `build` | TypeScript-Quellen kompilieren |
| `test:ts` | Führe die in den `*.test.ts`-Dateien definierten Tests aus |
| `test:package` | Sicherstellen, dass `package.json` und `io-package.json` gültig sind |
| `test` | Führe einen minimalen Testlauf für Paketdateien und deine Tests durch |
| `check` | Führe eine Typüberprüfung deines Codes durch (ohne ihn zu kompilieren) |
| `lint` | ESLint ausführen, um den Code auf Formatierungsfehler und potenzielle Bugs zu überprüfen |
| `translate` | Texte im Adapter in alle erforderlichen Sprachen übersetzen |
| `release` | Neue Version erstellen |
| `release` | Neue Version erstellen |

## Changelog
### 1.1.0 (2026-06-26)

* (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.
* (Simon Prosen) Reduced excess spacing in the admin UI header by keeping configuration tab labels on a single line
* (Simon Prosen) Spontaneous (on-change) writes are now buffered with a configurable flush window (default 5000ms, adjustable per bucket)

### 1.0.1 (2026-04-13)

* (Simon Prosen) Fixed ack handling for on-change writes so acknowledged updates are processed correctly
* (Simon Prosen) Improved admin UI responsiveness on small screens with scrollable tabs and more flexible layouts
* (Simon Prosen) Removed the batch-write toggle from the admin UI and enforce batching based on trigger type
* (Simon Prosen) Added and improved translations for additional languages in the admin UI
* (Simon Prosen) Moved admin UI packages to `devDependencies` and consolidated the project package setup
* (Simon Prosen) Updated admin logo assets and added an SVG variant
* (Simon Prosen) Refreshed build, test, TypeScript, and dependency configuration from the current template and dependency updates

### 1.0.0 (2026-03-21)
* (Simon Prosen) InfluxDB v2.x support via native HTTP API with token-based authentication
* (Simon Prosen) Dual-mode logging: cron-based periodic collection and on-change real-time writes
* (Simon Prosen) Multiple logging groups with independent bucket, trigger type, and cron schedule
* (Simon Prosen) Configurable data points with custom measurement names, field keys, and InfluxDB tags
* (Simon Prosen) InfluxDB line protocol formatting with proper type handling for strings, booleans, and numbers
* (Simon Prosen) Batch writing for cron groups combining all data points into a single HTTP request
* (Simon Prosen) Exponential backoff retry logic with smart classification (4xx no-retry, 429/5xx retry)
* (Simon Prosen) Configurable write timeout and retry attempts
* (Simon Prosen) Encrypted API token storage using ioBroker's native encryption
* (Simon Prosen) Connection health check on startup with `info.connection` state indicator
* (Simon Prosen) Admin UI with Connection, Logging Groups, Data Points, and Advanced tabs
* (Simon Prosen) Object browser for visual ioBroker state selection in admin UI
* (Simon Prosen) Connection test button for validating InfluxDB connectivity from admin UI
* (Simon Prosen) Cascading group rename updates across all referencing data points
* (Simon Prosen) Startup validation with warnings for missing or misconfigured groups and data points
* (Simon Prosen) Graceful shutdown with cron job cleanup and subscription removal
* (Simon Prosen) Debug logging mode for troubleshooting
* (Simon Prosen) English and German translations

### 0.0.1 (2026-03-20)
* (Simon Prosen) initial release

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2026 Simon Prosen <simon@prosen.dev>

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