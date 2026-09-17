---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.f1/README.md
title: ioBroker.f1
hash: 8XwM9a02HOedFU7Hxmyp2q7+b7K3FbIWbfkWhIkUQlg=
---
# ioBroker.f1

![NPM-Version](https://img.shields.io/npm/v/iobroker.f1.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.f1.svg)
![Lizenz](https://img.shields.io/github/license/bloop16/ioBroker.f1.svg)

Formel-1-Live-Datenintegration für ioBroker – bietet Rennkalender, Meisterschaftsstände, Session-Ergebnisse und Echtzeit-Live-Session-Daten über den [offiziellen F1 Live Timing-Feed](https://www.formula1.com/) und [die Jolpica-API](https://api.jolpi.ca/) .

## Merkmale

- **Rennkalender** — Nächstes Rennen & Session-Infos mit Countdown (Tage/Stunden)
- **Vollständiger Saisonkalender** – Alle Runden der aktuellen Saison als JSON
- **Meisterschaftsstand** – Fahrer- und Konstrukteurswertung mit Punkten und Siegen
- **Session-Ergebnisse** – Ergebnisse von Rennen, Qualifikation, Sprint und Trainingssitzung
- **Live-Sitzungsdaten** – Echtzeitdaten über F1 Live Timing SignalR WebSocket
  - Streckenstatus (Alles frei / Gelb / SafetyCar / VSC / Rote Flagge)
  - Sitzungsstatus und Name
  - Aktuelle und Gesamtrunden
  - Verbleibende Zeit / verstrichene Zeit
  - Streckenwetter (Lufttemperatur, Streckentemperatur, Regen, Wind, Luftfeuchtigkeit)
  - Fahrerpositionen mit Abständen, Rundenzeiten und Reifeninformationen
  - Live-Rangliste der Top 3
  - Meldungen zur Rennleitung
  - Boxenstopps
  - Reifenmischungen pro Fahrer
  - Teamfunk

## Datenpunkte

Die vollständige Objekthierarchie und die Aktualisierungsintervalle finden Sie im Abschnitt **„Nutzung“** weiter unten.

## Datenquellen

| Kanal        | Quelle                           | Aktualisieren                |
| ------------ | -------------------------------- | ---------------------------- |
| `schedule/`  | Jolpica API                      | Stündlich                    |
| `standings/` | Jolpica API                      | Stündlich + nach dem Rennen  |
| `results/`   | Jolpica API                      | Stündlich + nach der Sitzung |
| `live/`      | F1 Live Timing SignalR WebSocket | Echtzeit-Push                |

## Anforderungen

- ioBroker >= 5.0.19
- Node.js >= 22
- Internetverbindung
- Stabile Verbindung zur [Jolpica-API](https://api.jolpi.ca/)

## Installation & Konfiguration

1. Installieren Sie den Adapter über das ioBroker-Admin-Panel oder die Befehlszeile.
2. Öffnen Sie die Adaptereinstellungen (standardmäßig ist keine Benutzerkonfiguration erforderlich).
3. Der Adapter automatisch:
   - Ruft stündlich den aktuellen F1-Saisonkalender ab.
   - Aktualisiert die Meisterschaftswertung nach jeder Session
   - Liefert Echtzeit-Sitzungsdaten, wenn Sitzungen aktiv sind.
4. Optional: Passen Sie bei Bedarf die Aktualisierungsintervalle in den Adaptereinstellungen an.

### Datenquellen & Konsistenz

Der Adapter nutzt mehrere Datenquellen mit automatischem Fallback:

| Kanal               | Primär                                              | Zurückgreifen | Verhalten                                |
| ------------------- | --------------------------------------------------- | ------------- | ---------------------------------------- |
| Spielplan & Tabelle | [Jolpica API](https://api.jolpi.ca/)                |               | Stündlich aktualisiert + nach den Rennen |
| Ergebnisse          | Jolpica API                                         |               | Nach jeder Sitzung aktualisiert.         |
| Live-Daten          | [F1 Live-Timing-SignalR](https://www.formula1.com/) | OpenF1 API    | Echtzeit-Push während der Sitzungen      |

**Hinweis:** An Rennwochenenden kann es vorkommen, dass die Upstream-APIs vorübergehend Daten gemischter Runden liefern (z. B. werden die Ranglisten vor den Ergebnissen aktualisiert). Der Adapter enthält eine Wiederholungslogik (6 Versuche im Abstand von 10 Minuten), um die Datenkonsistenz zu gewährleisten.

## Verwendung

Nach der Installation und dem Start stellt der Adapter die ioBroker-Zustände unter dem Objektpfad bereit. `f1.0`:

```
f1.0
├── info.connection           (adapter connection status)
├── schedule/
│   ├── next_race_name / round / circuit / country / date
│   ├── next_session_name / type / date / countdown_*
│   ├── weekend_json          (all sessions of current weekend)
│   └── calendar              (full season as JSON)
├── standings/
│   ├── drivers               (JSON array with positions & points)
│   ├── teams                 (JSON array with constructor standings)
│   └── last_update
├── results/
│   ├── race / qualifying / sprint   (JSON arrays)
│   └── last_update
└── live/                     (only during session ±30 min)
    ├── is_live / session_status / track_status
    ├── laps_current / laps_total / time_remaining / time_elapsed
    ├── weather / race_control / top_three
    ├── drivers / tyres / pit_stops / team_radio
    └── last_update
```

Die Bundesstaaten wurden aktualisiert:

- **Stündlich aktualisiert** für Spielplan, Tabellenstand und Ergebnisse
- Ergebnisse **pro Session** (Rennen, Qualifikation, Sprint)
- **Echtzeit** für Live-Sitzungsdaten (während aktiver Sitzungen)

## Fehlerbehebung

### "Punktedifferenz" während des Rennabschlussfensters

In den ersten 60 Minuten nach Rennende können die Ranglisten und Ergebnisse kurzzeitig unterschiedliche runde Zahlen anzeigen. Dies ist das erwartete Verhalten – die Upstream-API aktualisiert sich asynchron. Der Adapter prüft die Daten automatisch auf Konsistenz (6 Versuche im Abstand von 10 Minuten).

### Es werden keine Live-Daten angezeigt.

1. Prüfen Sie, ob aktuell eine Session aktiv ist (F1 Live Timing streamt in der Regel während Training, Qualifying und Rennen).
2. Internetverbindung prüfen
3. Adapterprotokolle prüfen (ioBroker Admin → Instanzen → F1 → Protokolle)

### Veraltete Daten

Die Daten werden zwischengespeichert und regelmäßig aktualisiert. Falls die Daten veraltet erscheinen:

1. Manueller Auslöser: Neustart der Adapterinstanz
2. Automatisch: Im nächsten stündlichen Aktualisierungszyklus werden neue Daten abgerufen.
3. Nach einer Sitzung: Die automatische Aktualisierung wird innerhalb von 2 Minuten nach Sitzungsende ausgelöst.

## Datenquellen und Quellenangabe

Dieser Adapter verwendet folgende Datenquellen:

- **[Jolpica API](https://api.jolpi.ca/)** – Ergast API-Spiegelung, primäre Quelle für Formel-1-Rennkalender, Tabellenstände und Ergebnisse
- **[Ergast API](https://ergast.com/mwapi/)** – Historische F1-Daten, die als Ausweichlösung dienen, wenn Jolpica nicht verfügbar ist.
- **[F1 Live Timing](https://www.formula1.com/)** – Offizielle Echtzeit-Sitzungsdaten via SignalR WebSocket
- **[OpenF1 API](https://openf1.org/)** – Fallback für die Live-Sitzungserkennung

## Haftungsausschluss

Dieses Projekt steht in **keiner Verbindung zur Formel 1, der FIA oder deren Tochtergesellschaften oder verbundenen Unternehmen, wird von diesen weder** unterstützt noch ist es in irgendeiner Weise offiziell mit ihnen verbunden.

**F1®** , **FORMULA ONE®** , **FORMULA 1®** , **FIA FORMULA ONE WORLD CHAMPIONSHIP®** , **GRAND PRIX®** und zugehörige Marken sind Warenzeichen von Formula One Licensing BV.

Dieser Adapter ist ausschließlich für den persönlichen, nicht-kommerziellen Gebrauch bestimmt.

## Changelog

### 0.1.13 (2026-09-13)

- (bloop) Maintenance release: refreshed dependency versions and aligned package/release metadata with the current ioBroker baseline
- (bloop) Docs: updated release notes and repository metadata so the next adapter release is ready for publishing

### 0.1.12 (2026-08-09)

- (bloop) Repository checker maintenance: updated dependency requirements and cleaned package metadata for current ioBroker compatibility expectations
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.1.11 (2026-06-10)

- (bloop) Live data quality: fixed truncated outputs for `live.race_control` and `live.team_radio`
- (bloop) Live ranking quality: corrected top-three ordering by position
- (bloop) Live cache consistency: improved tyre and driver merge logic for partial incremental updates
- (bloop) Session-end flow: unified handling path to avoid inconsistent post-session states

For older changelog entries, see CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 Martin (bloop) <bloop16@hotmail.com>

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