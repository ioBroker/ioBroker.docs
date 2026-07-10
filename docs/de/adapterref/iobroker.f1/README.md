---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.f1/README.md
title: ioBroker.f1
hash: /pTewFoFkbMdbk4wPfZAkag8T4Jx0mXXXVRWdrN30Zw=
---
# IoBroker.f1

![NPM-Version](https://img.shields.io/npm/v/iobroker.f1.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.f1.svg)
![Lizenz](https://img.shields.io/github/license/bloop16/ioBroker.f1.svg)

Formel-1-Live-Datenintegration für ioBroker — bietet Rennkalender, Meisterschaftsstand, Session-Ergebnisse und Echtzeit-Live-Session-Daten über [offizieller F1 Live-Timing-Feed](https://www.formula1.com/) und [Jolpica API](https://api.jolpi.ca/).

## Merkmale
- **Rennkalender** — Informationen zum nächsten Rennen und Training mit Countdown (Tage/Stunden)
- **Vollständiger Saisonkalender** — Alle Runden der aktuellen Saison als JSON
- **Meisterschaftsstand** — Fahrer- und Konstrukteurswertung mit Punkten und Siegen
- **Session-Ergebnisse** — Ergebnisse von Rennen, Qualifikation, Sprint und Trainingssitzung
- **Live-Sitzungsdaten** — Echtzeitdaten über F1 Live Timing SignalR WebSocket
- Streckenstatus (Alles frei / Gelb / SafetyCar / VSC / Rote Flagge)
- Sitzungsstatus und Name
- Aktuelle und Gesamtrunden
- Verbleibende Zeit / Verstrichene Zeit
- Streckenwetter (Lufttemperatur, Streckentemperatur, Regen, Wind, Luftfeuchtigkeit)
- Fahrerpositionen mit Abständen, Rundenzeiten und Reifeninformationen
- Top 3 Live-Rangliste
- Rennleitungsmeldungen
- Boxenstopps
- Reifenmischungen pro Fahrer
- Teamfunk

## Datenpunkte
Die vollständige Objekthierarchie und die Aktualisierungsintervalle finden Sie im Abschnitt **Nutzung** weiter unten.

## Datenquellen
| Kanal | Quelle | Aktualisierung |
|---|---|---|
| `schedule/` | Jolpica API | Stündlich |
| `results/` | Jolpica API | Stündlich + nach der Sitzung |
| `live/` | F1 Live Timing SignalR WebSocket | Echtzeit-Push |
| `live/` | F1 Live Timing SignalR WebSocket | Echtzeit-Push |

## Anforderungen
- ioBroker >= 5.0.19
- Node.js >= 22
- Internetverbindung
- Stabile Verbindung zur [Jolpica API](https://api.jolpi.ca/)

## Installation und Konfiguration
1. Installieren Sie den Adapter über das ioBroker-Admin-Panel oder die Befehlszeile.
2. Öffnen Sie die Adaptereinstellungen (standardmäßig ist keine Benutzerkonfiguration erforderlich).
3. Der Adapter automatisch:
Ruft stündlich den aktuellen F1-Saisonkalender ab.
- Aktualisiert die Meisterschaftstabelle nach jeder Session
- Liefert Echtzeit-Sitzungsdaten, wenn Sitzungen aktiv sind
4. Optional: Passen Sie bei Bedarf die Aktualisierungsintervalle in den Adaptereinstellungen an.

### Datenquellen & Konsistenz
Der Adapter nutzt mehrere Datenquellen mit automatischem Fallback:

| Kanal | Primär | Fallback | Verhalten |
|---------|---------|----------|----------|
| Zeitplan & Tabelle | [Jolpica API](https://api.jolpi.ca/) | Stündlich aktualisiert + nach den Rennen |
| Live-Daten | [F1 Live-Timing-SignalR](https://www.formula1.com/) | OpenF1 API | Echtzeit-Push während der Sitzungen |
| Live-Daten | [F1 Live Timing SignalR](https://www.formula1.com/) | OpenF1 API | Echtzeit-Push während der Sessions |

**Hinweis:** An Rennwochenenden können die Upstream-APIs vorübergehend Daten aus verschiedenen Runden liefern (z. B. aktualisierte Ranglisten vor den Ergebnissen). Der Adapter enthält eine Wiederholungslogik (6 Versuche im 10-Minuten-Takt), um die Datenkonsistenz zu gewährleisten.

## Verwendung
Nach der Installation und dem Start stellt der Adapter ioBroker-Zustände unter dem Objektpfad `f1.0` bereit:

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

- **Stündlich** für Zeitplan, Tabellenstand und Ergebnisse
- **Pro Session** für Ergebnisdetails (Rennen, Qualifikation, Sprint)
- **Echtzeit** für Live-Sitzungsdaten (während aktiver Sitzungen)

## Fehlerbehebung
### "Punktedifferenz" während des Rennabschlussfensters
In den ersten 60 Minuten nach Rennende können die Ranglisten und Ergebnisse kurzzeitig unterschiedliche runde Zahlen anzeigen. Dies ist das erwartete Verhalten – die Upstream-API aktualisiert sich asynchron. Der Adapter prüft die Daten automatisch auf Konsistenz (6 Versuche im Abstand von 10 Minuten).

### Es werden keine Live-Daten angezeigt
1. Prüfen Sie, ob aktuell eine Session aktiv ist (F1 Live Timing streamt in der Regel während Training, Qualifying und Rennen).
2. Internetverbindung überprüfen
3. Überprüfen Sie die Adapterprotokolle (ioBroker Admin → Instanzen → F1 → Protokolle)

### Veraltete Daten
Die Daten werden zwischengespeichert und regelmäßig aktualisiert. Falls die Daten veraltet erscheinen:

1. Manuelle Auslösung: Neustart der Adapterinstanz
2. Automatisch: Im nächsten stündlichen Aktualisierungszyklus werden neue Daten abgerufen.
3. Nach einer Sitzung: Die automatische Aktualisierung wird innerhalb von 2 Minuten nach Sitzungsende ausgelöst.

## Datenquellen & Quellenangabe
Dieser Adapter verwendet folgende Datenquellen:

- **[Jolpica API](https://api.jolpi.ca/)** — Ergast API-Mirror, primäre Quelle für F1-Rennkalender, -Tabellen und -Ergebnisse
- **[Ergast API](https://ergast.com/mwapi/)** — Historische F1-Daten, die als Ausweichlösung dienen, wenn Jolpica nicht verfügbar ist.
- **[F1 Live Timing](https://www.formula1.com/)** — Offizielle Echtzeit-Sitzungsdaten via SignalR WebSocket
- **[OpenF1 API](https://openf1.org/)** — Fallback für die Live-Sitzungserkennung

## Haftungsausschluss
Dieses Projekt steht **in keiner Verbindung** zur Formel 1, der FIA oder deren Tochtergesellschaften oder verbundenen Unternehmen, wird von diesen weder unterstützt noch ist es in irgendeiner Weise offiziell mit ihnen verbunden.

**F1®**, **FORMULA ONE®**, **FORMULA 1®**, **FIA FORMULA ONE WORLD CHAMPIONSHIP®**, **GRAND PRIX®** und verwandte Marken sind Warenzeichen von Formula One Licensing B.V.

Dieser Adapter ist ausschließlich für den persönlichen, nicht-kommerziellen Gebrauch bestimmt.

## Changelog


### **WORK IN PROGRESS**
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.1.11 (2026-06-10)

- (bloop) Live data quality: fixed truncated outputs for `live.race_control` and `live.team_radio`
- (bloop) Live ranking quality: corrected top-three ordering by position
- (bloop) Live cache consistency: improved tyre and driver merge logic for partial incremental updates
- (bloop) Session-end flow: unified handling path to avoid inconsistent post-session states

### 0.1.10 (2026-06-05)

- (bloop) Fixed live sessions by migrating from legacy SignalR to SignalR Core transport
- (bloop) Reduced repeated 401 reconnect warnings from F1 Live Timing legacy endpoint
- (bloop) Improved live connection stability with handshake-aware subscription flow

For older changelog entries, see [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

[Older changelogs can be found there](CHANGELOG_OLD.md)

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