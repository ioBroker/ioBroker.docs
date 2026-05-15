---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.public-transport/README.md
title: ioBroker.public-transport
hash: 4U3wRVMIBOFFMtvgY3jnuoabQJYcj18Y3MTtijrN9q8=
---
![Logo](../../../en/adapterref/iobroker.public-transport/admin/iconAdapter.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.public-transport.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.public-transport.svg)
![Anzahl der Installationen](https://iobroker.live/badges/public-transport-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/public-transport-stable.svg)
![NPM](https://nodei.co/npm/iobroker.public-transport.png?downloads=true)

# IoBroker.öffentlicher-transport
**Tests:** ![Test und Freigabe](https://github.com/tt-tom17/ioBroker.public-transport/workflows/Test%20and%20Release/badge.svg)

## ÖPNV-Adapter für ioBroker
Der ÖPNV-Adapter ermöglicht die nahtlose Integration von Echtzeit-Fahrplaninformationen in Ihr ioBroker Smart-Home-System. Mit diesem Adapter können Sie Abfahrtszeiten verschiedener Verkehrsbetriebe in Deutschland, Österreich und anderen Ländern abrufen und für die Automatisierung nutzen.

[🇩🇪 Deutsche Dokumentation](doc/de/README.de.md)

## Inhaltsverzeichnis
- [Hauptmerkmale](#key-features)
- [Installation](#installation)
- [Unterstützte Transportnetzwerke](#supported-transport-networks)
- [Konfiguration](#configuration)
- [Datenstruktur](#data-structure)
- [Anwendungsbeispiele](#usage-examples)
- [Änderungsprotokoll](#changelog)
- [Lizenz](#Lizenz)

## Hauptmerkmale
- **Mehrere Transportdienste**: Volle Unterstützung für HAFAS- und DB Vendo-APIs
- **Flexible Stationskonfiguration**: Konfigurieren Sie beliebig viele Haltestellen.
- **Echtzeitdaten**: Abrufen von Live-Abfahrtszeiten mit Verspätungsinformationen
- **Automatische Aktualisierungen**: Regelmäßige Abfrage der Abfahrtszeiten in frei konfigurierbaren Intervallen
- **Umfassende Filteroptionen**: Filtern Sie nach Verkehrsmitteln (Bus, Zug, Straßenbahn, U-Bahn, Fähre usw.).
- **Flexibler Zeitversatz**: Abflüge ab einem bestimmten Zeitpunkt in der Zukunft anzeigen
- **Anpassbare Abfrageanzahl**: Legen Sie fest, wie viele Abfahrten pro Bahnhof angezeigt werden sollen.
- **Benutzerdefinierte Namen**: Weisen Sie Ihren Stationen und Verbindungen individuelle Namen zu.

## Installation
### Voraussetzungen
- ioBroker-Installation (Node.js 20.x oder höher erforderlich)
- Internetzugang zum Abrufen von Fahrplandaten

### Installation über ioBroker Admin
1. Öffnen Sie die ioBroker-Admin-Oberfläche.
2. Navigieren Sie zu „Adapter“.
3. Suche nach „öffentlicher Verkehr“
4. Klicken Sie auf „Installieren“.

## Unterstützte Transportnetzwerke
### HAFAS-Profile
Der Adapter nutzt die HAFAS (HaCon Timetable Information System) API und unterstützt zahlreiche Verkehrsnetze und -betreiber:

#### Deutschland
- **VBB** - Verkehrsverbund Berlin-Brandenburg

#### Österreich
- **ÖBB** - Österreichische Bundesbahnen (bundesweit)

### Vendo
Vendo-API zum Abrufen von Daten der Deutschen Bahn (DB)

## Konfiguration
### Allgemeine Einstellungen
1. **Dienstleistungsart auswählen**
- Wählen Sie je nach Ihrem Transportunternehmen zwischen `HAFAS` und `Vendo`.

2. **Profil auswählen** (nur HAFAS)
- Wählen Sie das passende Transportnetzwerkprofil aus der Dropdown-Liste aus
   - Beispiel: „db“ für die Deutsche Bahn, „vbb“ für Berlin-Brandenburg

3. **Abfrageintervall**
- Festlegen, wie oft die Daten aktualisiert werden sollen (in Minuten).
- Empfohlen: 2-5 Minuten für Echtzeitdaten
- Mindestens: 1 Minute

### Hinzufügen einer Station
Für jeden Halt können folgende Parameter konfiguriert werden:

#### Konfigurationsparameter
- **Benutzerdefinierter Name** (optional)
- Ein individueller Name für die Station in ioBroker
- Beispiel: „Bus_Stop_Work“ anstelle der offiziellen Bezeichnung

- **Anzahl der Abflüge**
- Wie viele Abflüge sollen abgerufen werden?
- Standardwert: 5
- Bereich: 1-20

- **Zeitverschiebung (Minuten)**
- Abfahrten von diesem Zeitpunkt in der Zukunft anzeigen
- Standardwert: 0 (sofort)
Beispiel: 5 = nur Abflüge in 5+ Minuten anzeigen
- Nützlich, um Abflüge auszublenden, die man nicht mehr erfassen kann.

- **Zeitraum (Minuten)**
- Maximaler Zeitraum für angezeigte Abflüge
- Standardwert: 60
- Beispiel: 30 = nur Abflüge innerhalb der nächsten 30 Minuten

- **Transportmodus-Filter**
- Wählen Sie aus, welche Transportmodi angezeigt werden sollen:
    - Bus
- S-Bahn (Vorort)
- U-Bahn (Unterführung)
- Straßenbahn
- Regionalzug
- National Train
- Fähre
    - Äußern
- Taxi
Mehrfachauswahl möglich

### Hinzufügen einer Reise
Mit Journeys können Sie Verbindungen zwischen zwei Bahnhöfen abfragen. Folgende Parameter können konfiguriert werden:

#### Reisekonfigurationsparameter
- **Benutzerdefinierter Name** (optional)
- Ein individueller Name für die Reise in ioBroker
- Beispiel: „Von zu Hause zur Arbeit“ zur besseren Identifizierung

- **Vom Bahnhof** (erforderlich)
- Der Ausgangspunkt der Reise
- Wählen Sie aus den verfügbaren Stationen

- **Zum Bahnhof** (erforderlich)
- Der Zielbahnhof der Reise
- Wählen Sie aus den verfügbaren Stationen

- **Anzahl der Ergebnisse**
- Wie viele Reiseoptionen sollen abgerufen werden?
- Standardwert: 3
- Bereich: 1-10

- **Transportmodus-Filter**
- Gleiches gilt für Bahnhöfe (siehe oben)
- Beschränkt die im Reiseverlauf genutzten Verkehrsmittel.

## Datenstruktur
### Stationsdatenstruktur
Der Adapter erstellt in ioBroker für jede konfigurierte Station einen Objektbaum:

```
public-transport.0
├── Stations
│   └── <Station-ID>                 // Station ID (e.g., 900350163)
│       ├── json                     // Raw departure data (JSON)
│       ├── enabled                  // Station enabled (boolean)
│       ├── Departures_00            // First departure
│       │   ├── Departure            // Actual departure time
│       │   ├── DeparturePlanned     // Planned departure time
│       │   ├── Delay                // Delay in seconds
│       │   ├── DepartureDelayed     // Is delayed (boolean)
│       │   ├── DepartureOnTime      // Is on time (boolean)
│       │   ├── Platform             // Platform/stop
│       │   ├── PlatformPlanned      // Planned platform/stop
│       │   ├── Direction            // Direction/destination
│       │   ├── Name                 // Line name (e.g., "891")
│       │   ├── Product              // Product type (e.g., "bus")
│       │   ├── Operator             // Operator name
│       │   ├── Mode                 // Transport mode (bus, train, etc.)
│       │   ├── Remarks              // Remarks and notifications
│       │   │   ├── Hint             // General hints
│       │   │   ├── Status           // Status messages
│       │   │   └── Warning          // Warnings
│       │   └── Stop                 // Stop information
│       │       ├── Id               // Stop ID
│       │       ├── Name             // Stop name
│       │       └── Type             // Stop type (e.g., "stop")
│       ├── Departures_01            // Second departure
│       │   └── ...
│       └── ...
```

### Reisedatenstruktur
Für jede konfigurierte Reise erstellt der Adapter die folgende Struktur:

```
public-transport.0
├── Journeys
│   └── journey_<ID>                     // Journey configuration ID
│       ├── Journey_00                   // First journey option
│       │   ├── json                     // Raw journey data (JSON)
│       │   ├── Arrival                  // Arrival time at destination
│       │   ├── ArrivalPlanned           // Planned arrival time
│       │   ├── ArrivalDelay             // Arrival delay in seconds
│       │   ├── ArrivalDelayed           // Delayed arrival (boolean)
│       │   ├── ArrivalOnTime            // On-time arrival (boolean)
│       │   ├── Departure                // Departure time from start
│       │   ├── DeparturePlanned         // Planned departure time
│       │   ├── DepartureDelay           // Departure delay in seconds
│       │   ├── DepartureDelayed         // Delayed departure (boolean)
│       │   ├── DepartureOnTime          // On-time departure (boolean)
│       │   ├── Changes                  // Number of transfers
│       │   ├── DurationMinutes          // Journey duration in minutes
│       │   ├── Leg_00                   // First leg/segment
│       │   │   ├── json                 // Raw leg data (JSON)
│       │   │   ├── Arrival              // Segment arrival time
│       │   │   ├── ArrivalPlanned       // Planned segment arrival
│       │   │   ├── ArrivalDelay         // Segment arrival delay (seconds)
│       │   │   ├── ArrivalDelayed       // Delayed arrival (boolean)
│       │   │   ├── ArrivalOnTime        // On-time arrival (boolean)
│       │   │   ├── Departure            // Segment departure time
│       │   │   ├── DeparturePlanned     // Planned segment departure
│       │   │   ├── DepartureDelay       // Segment departure delay (seconds)
│       │   │   ├── DepartureDelayed     // Delayed departure (boolean)
│       │   │   ├── DepartureOnTime      // On-time departure (boolean)
│       │   │   ├── Distance             // Distance in meters
│       │   │   ├── Reachable            // Segment reachable (boolean)
│       │   │   ├── Line                 // Line information
│       │   │   │   ├── Direction        // Direction/destination
│       │   │   │   ├── Mode             // Transport mode (train, bus, etc.)
│       │   │   │   ├── Name             // Line name (e.g., "RE3")
│       │   │   │   ├── Operator         // Transport operator
│       │   │   │   └── Product          // Product type (e.g., "regional")
│       │   │   └── Remarks              // Remarks and notifications
│       │   │       ├── Hints            // General hints
│       │   │       ├── Status           // Status messages
│       │   │       └── Warnings         // Warnings
│       │   ├── Leg_01                   // Second leg/segment
│       │   │   └── ...
│       │   └── ...
│       ├── Journey_01                   // Second journey option
│       │   └── ...
│       └── ...
```

### Datentypen und Beispielwerte
| Bundesland | Typ | Beispiel | Beschreibung |
|-------|------|---------|-------------|
| Verzögerung | Anzahl | `3` | Verzögerung in Minuten (0 = pünktlich) |
| departureTime | string | `2026-02-16T14:33:00.000Z` | Tatsächliche Abflugzeit inkl. Verspätung |
| Richtung | Zeichenkette | `S Potsdam Hauptbahnhof` | Endziel |
| Zeile | Zeichenkette | `S7` | Zeilenbezeichnung |
| Plattform | Zeichenkette | `3` | Gleis/Bahnsteig/Bussteig |
| Typ | Zeichenkette | `suburban` | Transportmodus-Typ |
| storniert | boolescher Wert | `false` | Reisestornierung |
| storniert | boolescher Wert | `false` | Reisestornierung |

## Anwendungsbeispiele
### 1. Vis Display
Vis1/2 beinhaltet ein separates Widget für Abflüge und Verbindungen. Die JSON-Daten werden zur Anzeige verwendet.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (tt-tom17) added productName to states
* (tt-tom17) connections widget: show remarks icons (warning/hint/status) per leg in journey detail popup
* (tt-tom17) connections widget: show remarks icons in main table (new Info column)
* (tt-tom17) connections widget: highlight delayed journeys/legs with red left border

### 0.4.0 (2026-05-06)
* (tt-tom17) fix select Products
* (tt-tom17) add Profil VBN (Bremen/Niedersachsen)

### 0.3.0 (2026-05-02)
* (tt-tom17) fix issues for latest Repo
* (tt-tom17) fix deaktivieren von Verbindungen
* (tt-tom17) Adapter requires node.js >= 22 now

### 0.2.2 (2026-04-25)
* (tt-tom17) fix countEntries for journeys

### 0.2.1 (2026-04-24)
* (tt-tom17) fix Vendo forbidden -> change dbnav to db

### 0.2.0 (2026-04-21)  
* (tt-tom17) Widget departures: add popup for hints and warnings

### 0.1.1 (2026-04-19)   
* (tt-tom17) fix App.tsx
* (tt-tom17) Fix [Bug]: Abfahrten-JSON bleibt leer oder alle gleich [#28](https://github.com/tt-tom17/ioBroker.public-transport/issues/28)

### 0.1.0 (2026-04-01)  
* (tt-tom17) begin beta-test

### 0.0.6 (2026-03-12)
* (tt-tom17) Widget for Journey
* (tt-tom17) Refactor admin UI: convert class components to functional components
* (tt-tom17) Add confirmation dialog for station and journey deletion
* (tt-tom17) Auto-save and delete ioBroker object tree on station/journey removal
* (tt-tom17) Upgrade admin dependencies

### 0.0.5 (2026-03-03)  
* (tt-tom17) Upgrade dependency

### 0.0.4 (2026-02-16)
* (tt-tom17)   optimization react pages

### 0.0.1-preAlpha.0 (2025-12-01)
* (tt-tom17) initial release

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025 - 2026 tt-tom17 <tgb@kabelmail.de>

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