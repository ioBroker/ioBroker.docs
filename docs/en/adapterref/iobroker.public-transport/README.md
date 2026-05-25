![Logo](admin/iconAdapter.png)

# ioBroker.public-transport

[![NPM version](https://img.shields.io/npm/v/iobroker.public-transport.svg)](https://www.npmjs.com/package/iobroker.public-transport)
[![Downloads](https://img.shields.io/npm/dm/iobroker.public-transport.svg)](https://www.npmjs.com/package/iobroker.public-transport)
![Number of Installations](https://iobroker.live/badges/public-transport-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/public-transport-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.public-transport.png?downloads=true)](https://nodei.co/npm/iobroker.public-transport/)

**Tests:** ![Test and Release](https://github.com/tt-tom17/ioBroker.public-transport/workflows/Test%20and%20Release/badge.svg)

## Public Transport Adapter for ioBroker

The public-transport adapter enables seamless integration of real-time public transportation schedule information into your ioBroker smart home environment. With this adapter, you can retrieve departure times from stops of various transport operators in Germany, Austria, and other countries and use them for automation.

[🇩🇪 Deutsche Dokumentation](doc/de/README.de.md)

## Table of Contents

- [Key Features](#key-features)
- [Installation](#installation)
- [Supported Transport Networks](#supported-transport-networks)
- [Configuration](#configuration)
- [Data Structure](#data-structure)
- [Usage Examples](#usage-examples)
- [Changelog](#changelog)
- [License](#license)

## Key Features

- **Multiple Transport Services**: Full support for HAFAS and DB Vendo APIs
- **Flexible Station Configuration**: Configure any number of stops
- **Real-time Data**: Retrieve live departure times with delay information
- **Automatic Updates**: Regular polling of departure times at freely configurable intervals
- **Comprehensive Filter Options**: Filter by transport modes (bus, train, tram, subway, ferry, etc.)
- **Flexible Time Offset**: Show departures from a specific point in the future
- **Customizable Query Count**: Determine how many departures per station should be displayed
- **Custom Names**: Assign individual names to your stations and connections

## Installation

### Prerequisites

- ioBroker installation (Node.js 20.x or higher required)
- Internet access for retrieving schedule data

### Installation via ioBroker Admin

1. Open the ioBroker Admin interface
2. Navigate to "Adapters"
3. Search for "public-transport"
4. Click "Install"

## Supported Transport Networks

### HAFAS Profiles

The adapter uses the HAFAS (HaCon Timetable Information System) API and supports numerous transport networks and operators:

#### Germany
- **VBB** - Verkehrsverbund Berlin-Brandenburg

#### Austria
- **ÖBB** - Österreichische Bundesbahnen (nationwide)

### Vendo

Vendo API for retrieving data from Deutsche Bahn (DB)

## Configuration

### General Settings

1. **Select Service Type**
   - Choose between `HAFAS` and `Vendo` based on your transport operator

2. **Select Profile** (HAFAS only)
   - Choose the appropriate transport network profile from the dropdown list
   - Example: "db" for Deutsche Bahn, "vbb" for Berlin-Brandenburg

3. **Query Interval**
   - Define how often data should be updated (in minutes)
   - Recommended: 2-5 minutes for real-time data
   - Minimum: 1 minute

### Adding a Station

The following parameters can be configured for each stop:

#### Configuration Parameters

- **Custom Name** (optional)
  - An individual name for the station in ioBroker
  - Example: "Bus_Stop_Work" instead of the official designation

- **Number of Departures**
  - How many departures should be retrieved?
  - Default: 5
  - Range: 1-20

- **Time Offset (minutes)**
  - Show departures from this point in the future
  - Default: 0 (immediately)
  - Example: 5 = only show departures in 5+ minutes
  - Useful to hide departures you can no longer catch

- **Time Period (minutes)**
  - Maximum time period for displayed departures
  - Default: 60
  - Example: 30 = only departures within the next 30 minutes

- **Transport Mode Filter**
  - Select which transport modes should be displayed:
    - Bus
    - S-Bahn (Suburban)
    - U-Bahn (Subway)
    - Tram (Streetcar)
    - Regional Train
    - National Train
    - Ferry
    - Express
    - Taxi
  - Multiple selection possible

### Adding a Journey

Journeys allow you to query connections between two stations. The following parameters can be configured:

#### Journey Configuration Parameters

- **Custom Name** (optional)
  - An individual name for the journey in ioBroker
  - Example: "Home_to_Work" for better identification

- **From Station** (required)
  - The starting station for the journey
  - Select from available stations

- **To Station** (required)
  - The destination station for the journey
  - Select from available stations

- **Number of Results**
  - How many journey options should be retrieved?
  - Default: 3
  - Range: 1-10

- **Transport Mode Filter**
  - Same as for stations (see above)
  - Limits the transport modes used in the journey

## Data Structure

### Station Data Structure

The adapter creates an object tree in ioBroker for each configured station:

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

### Journey Data Structure

For each configured journey, the adapter creates the following structure:

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

### Data Types and Example Values

| State | Type | Example | Description |
|-------|------|---------|-------------|
| delay | number | `3` | Delay in minutes (0 = on time) |
| departure | string | `2026-02-16T14:30:00.000Z` | Scheduled departure time (ISO 8601) |
| departureTime | string | `2026-02-16T14:33:00.000Z` | Actual departure time incl. delay |
| direction | string | `S Potsdam Hauptbahnhof` | Final destination |
| line | string | `S7` | Line designation |
| platform | string | `3` | Track/platform/bus bay |
| type | string | `suburban` | Transport mode type |
| cancelled | boolean | `false` | Trip cancellation |

## Usage Examples

### 1. Vis Display

Vis1/2 includes a separate widget for departures and connections. The JSON data is used for the display.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.5.0 (2026-05-17)
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
