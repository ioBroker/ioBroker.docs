---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.maxxi-charge.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.maxxi-charge.svg
BADGE-Number of Installations: https://iobroker.live/badges/maxxi-charge-installed.svg
BADGE-GitHub: https://img.shields.io/github/license/blabond/iobroker.maxxi-charge?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/blabond/iobroker.maxxi-charge?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/blabond/iobroker.maxxi-charge?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/blabond/iobroker.maxxi-charge?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/blabond/iobroker.maxxi-charge?logo=github&style=flat-square
BADGE-Donation: https://img.shields.io/badge/Paypal-Donate-blue?style=flat
---
# ioBroker.Maxxi-Charge

**ioBroker.MaxxiCharge** ist ein Adapter für das ioBroker-System, der die Integration und Steuerung von MaxxiCharge CCU-Geräten ermöglicht. Der Adapter bietet eine Vielzahl von Funktionen, darunter das Lesen von Gerätedaten, die Anpassung von Konfigurationen und das Senden von Steuerbefehlen.

## Funktionen

- **Datenabfrage**:
    - Liest Informationen wie IP-Adresse, Status oder Leistung der CCU.
    - Automatische Erstellung dynamischer Datenpunkte für Gerätedaten.
- **Konfiguration**:
    - Anpassung von Parametern wie maximaler Ausgangsleistung, Schwellenwerten oder Ladeverhalten.
    - **Sommer/Winter-Betrieb**: Dynamische Anpassung der Ladeparameter basierend auf der Jahreszeit.
    - **Batteriekalibrierung**: Unterstützt einen automatisierten Kalibrierungsprozess für die Batterie.
    - **Einspeisungssteuerung**: Konfiguration der maximalen Ladung zur Aktivierung oder Deaktivierung der Einspeisung.
- **Steuerbefehle**:
    - Dynamische Datenpunkte (`<deviceId>.sendcommand`) zum Senden von Befehlen an die CCU.
- **Flexibles Abfrageintervall (Cloud-Modus)**:
    - Der Nutzer kann das Abfrageintervall der CCU-Daten zwischen 10 und 90 Sekunden anpassen.

## Anforderungen

| Komponente                  | Beschreibung                                                 |
|-----------------------------|--------------------------------------------------------------|
| **MaxxiCharge CCU**         | Unterstütztes Gerät mit Netzwerkverbindung.                  |
| **ioBroker**                | Installierte ioBroker-Instanz.                               |
| **Node.js**                 | Aktuelle Version von Node.js (siehe ioBroker-Anforderungen). |

## Installation

1. **Adapter konfigurieren**:
    - API-Modus auswählen (Cloud oder Local).
      - **Cloud:** Den Namen der CCU (`maxxi-XXXXXX-YYY`) eintragen.
      - **Local:** Adresse von ioBroker auf der MaxxiCharge-Webseite (`maxxi.local`) unter `Api-Route` eintragen: `http://"ioBroker IP":"PORT"`.
2. **Wichtiger Hinweis beim Update**:
    - Löschen Sie den Ordner `.sendcommand` und starten Sie den Adapter neu, wenn Sie von einer früheren Version aktualisieren. (< 1.4.0)

## Konfigurationsmöglichkeiten

| Einstellung                  | Beschreibung                                                                     |
|------------------------------|----------------------------------------------------------------------------------|
| **Maxxi CCU Name**           | Name oder IP-Adresse der Maxxi CCU.                                              |
| **CCU Abfrageintervall**     | Intervall (10-90 Sekunden) für die Abfrage der CCU-Daten im Cloud-Modus.         |
| **Sommer/Winter-Betrieb**    | Automatische Anpassung der Ladeparameter basierend auf definierten Winter-Daten. |
| **Port für Local-API**       | Definiert den Port, auf dem die Local-API lauscht.                               |
| **Einspeisungssteuerung**    | Konfiguration zur Aktivierung oder Deaktivierung der Einspeisung.                |
| **Batteriekalibrierung**     | Startet den automatisierten Kalibrierungsprozess für die Batterie.               |

## Sommer / Winter-Betrieb

Der Sommer/Winter-Betrieb bietet eine dynamische Anpassung der Ladeparameter:

- **Wintermodus**:
    - Mindestladung wird morgens um 8 Uhr auf 60% gesetzt.
    - Falls der SOC (State of Charge) ≥ 55% beträgt, wird die Mindestladung auf 40% reduziert.
- **Sommermodus**:
    - Mindestladung wird auf 10% gesetzt.
    - Maximale Ladung wird auf 97% begrenzt.
- Die Aktivierung erfolgt durch eine Checkbox in den Adapter-Einstellungen, die Zeiträume werden durch Winter-Start- und -Enddatum festgelegt.

## Batteriekalibrierung

Die Batteriekalibrierung umfasst einen automatisierten Prozess:

1. **Start**:
    - Der Adapter senkt die `minSOC`-Einstellung auf 1%, um die Batterie zu entladen.
2. **Aufladen**:
    - Nach Erreichen von <1% SOC wird die `minSOC`-Einstellung auf 99% erhöht.
3. **Abschluss**:
    - Nach Erreichen von 99% SOC wechselt der Adapter zurück in den Regelbetrieb.

Die Kalibrierung kann in den Experteneinstellungen aktiviert werden.

## Einspeisungssteuerung

Die Einspeisungssteuerung ermöglicht es, die maximale Ladung (`maxSOC`) so zu konfigurieren, dass überschüssiger Strom ins Netz eingespeist wird oder nicht:

- **90% / 97% (Einspeisung aktiv)**:
    - Überschüssiger Strom wird ins Netz eingespeist, wenn die Batterie mehr als 97% SOC hat.
- **100% (Einspeisung deaktiviert)**:
    - Es wird kein überschüssiger Strom ins Netz eingespeist.

## Datenpunkte

Der Adapter erstellt dynamisch Datenpunkte basierend auf den von der CCU zurückgegebenen Informationen. Hier ein kleiner Teilausschnitt des Datenpunktstrukturaufbaus:

| Datenpunkt                    | Beschreibung                                 |
|-------------------------------|----------------------------------------------|
| `<deviceId>.SOC`              | Batterie Ladezustand.                        |
| `<deviceId>.PV_power_total`   | PV-Leistung gesamt.                          |
| `<deviceId>.batteriesInfo.*`  | Batterieinformationen.                       |
| `<deviceId>.convertersInfo.*` | Converter Status.                            |
| `<deviceId>.settings.*`       | Gerätespezifische Einstellungen. (Nur Cloud) |
| `<deviceId>.sendcommand.*`    | Steuerbefehle für die CCU.                   |

## Hinweise

- Änderungen an Datenpunkten im Bereich `<deviceId>.sendcommand` werden automatisch erkannt und an die CCU gesendet.
- Bei Problemen mit fehlenden Datenpunkten oder unerwartetem Verhalten: Adapter neu starten.

## Fehler

- **Fehler beim Verarbeiten der Daten**:
    - `deviceId` nicht vorhanden → Adapter neu starten, nachdem die CCU-Info eingegeben wurde. 

- **Eingaben auf der APP-Webseite(Online) werden zurückgesetzt**:
    - Verwende ausschließlich die Webseite `maxxi.local` oder die IP-Addresse der CCU, um manuelle Eingaben vorzunehmen. Bei der Nutzung von sendCommand-Steuerbefehlen werden die Online-Eingaben überschrieben.

## Changelog

### 1.4.9 (2025-02-08)

- Bugfix on Battery Calibration.
- Fixes for stable release on ioBroker adapter.
- Feedback update

### 1.4.1 (2025-01-12)

- ### Please delete the `.sendcommand` folder and restart the adapter when updating from a previous version to this one.
- New: Added support for battery calibration (Expert Settings)
- Improved: Redesigned adapter settings for a better user experience

### 1.3.13 (2025-01-07)
- Fixed: Issue with the dcAlgorithm datapoint where the UI could crash due to an incorrect states definition
- Removed the info.localip datapoint. The local IP address is now directly included in the jsonConfig.
- Adjusted code to use modern methods, replacing deprecated ones like setObjectAsync.

### 1.3.0 (2024-12-15)
- **Summer/Winter mode** added:
  - Dynamic adjustment of charging parameters based on seasons.
  - Configurable with start and end dates.
- **Cloud API query interval**: Interval for CCU queries in cloud mode is now configurable via a slider between 10 and 60 seconds.

### 1.2.191 (2024-12-08)
- Release

## License
MIT License

Copyright (c) 2024-2025

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