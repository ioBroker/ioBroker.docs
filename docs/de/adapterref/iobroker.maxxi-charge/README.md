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
    - Unterstützt mehrere CCU-Einheiten gleichzeitig.
- **Konfiguration**:
    - Anpassung von Parametern wie maximaler Ausgangsleistung, Schwellenwerten oder Ladeverhalten.
    - **Sommer/Winter-Betrieb**: Dynamische Anpassung der Ladeparameter basierend auf der Jahreszeit.
    - **Batteriekalibrierung**: Unterstützt einen automatisierten Kalibrierungsprozess für die Batterie.
    - **Einspeisungssteuerung**: Konfiguration der maximalen Ladung zur Aktivierung oder Deaktivierung der Einspeisung.
- **Steuerbefehle**:
    - Dynamische Datenpunkte (`<deviceId>.sendcommand`) zum Senden von Befehlen an die CCU.
    - Der Ordner `<deviceId>.VersionControl` dient zur Änderung der aktuell installierten CCU-Version.
    - Der Ordner `<deviceId>.VersionControl.Experimentell not for Use` enthält experimentelle Versionen und sollte **nur auf eigene Gefahr** verwendet werden.
- **Flexibles Abfrageintervall (Cloud-Modus)**:
    - Der Nutzer kann das Abfrageintervall der CCU-Daten zwischen 10 und 90 Sekunden anpassen.
- **Firmware-Versionsteuerung**:
    - Automatischer Abruf und Kategorisierung verfügbarer Firmware-Versionen in „Releases“ und „Experimentell“.
    - Ermöglicht sicheres Umschalten der Firmware über einen Umschalt-Datenpunkt unter `VersionControl.Releases`.

## Anforderungen

| Komponente                  | Beschreibung                                                 |
|-----------------------------|--------------------------------------------------------------|
| **MaxxiCharge CCU**         | Unterstütztes Gerät mit Netzwerkverbindung.                  |
| **ioBroker**                | Installierte ioBroker-Instanz.                               |
| **Node.js**                 | Aktuelle Version von Node.js (siehe ioBroker-Anforderungen). |

## Installation

1. **Adapter konfigurieren**:
    - API-Modus auswählen (**Cloud - Server 1**, **Cloud - Server 2** oder **Local**).
        - **Cloud S1 / Cloud S2**:
            - Tragen Sie den **CCU-Namen** ein (z. B. `maxxi-XXXXXX-YYY`).
            - Tragen Sie die **E-Mail-Adresse** des Maxxisun-Kontos ein.
            - Tragen Sie die **lokale IP-Adresse** Ihres MaxxiCharge Speichers ein (z. B. `192.168.1.123`).
      - **Local:** Adresse von ioBroker auf der MaxxiCharge-Webseite (`maxxi.local`) unter `Api-Route` eintragen: `http://"ioBroker IP":"PORT"`.
2. **Wichtiger Hinweis beim Update**:
    - Löschen Sie den Ordner `.sendcommand` und starten Sie den Adapter neu, wenn Sie von einer früheren Version aktualisieren. (< 1.4.0)

**Hinweis:** Cloud Server 1 liefert mehr Datenpunkte als Cloud Server 2.

## Konfigurationsmöglichkeiten

| Einstellung               | Beschreibung                                                                                                                                                                                                                     |
|---------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Maxxi CCU Name**        | Name oder IP-Adresse der Maxxi CCU.                                                                                                                                                                                              |
| **CCU Abfrageintervall**  | Intervall (10-90 Sekunden) für die Abfrage der CCU-Daten im Cloud-Modus.                                                                                                                                                         |
| **Sommer/Winter-Betrieb** | Automatische Anpassung der Ladeparameter basierend auf definierten Winter-Daten.                                                                                                                                                 |
| **Port für Local-API**    | Definiert den Port, auf dem die Local-API lauscht.                                                                                                                                                                               |
| **Einspeisungssteuerung** | Konfiguration zur Aktivierung oder Deaktivierung der Einspeisung.                                                                                                                                                                |
| **Batteriekalibrierung**  | Startet den automatisierten Kalibrierungsprozess für die Batterie.                                                                                                                                                               |
| **BKW - Modus**           | Ab einem Akkustand von ≥ 97 % aktiviert das Skript den BKW-Modus, um zusätzlich zum Eigenverbrauch konstant 600–800 W ins öffentliche Netz einzuspeisen und ggf. eine Einspeisevergütung zu erhalten, sofern als BKW angemeldet. |

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

## BKW - Mode

Der BKW-Modus ermöglicht es, überschüssige Energie aus dem Batteriespeicher gezielt ins öffentliche Stromnetz einzuspeisen.
Sobald der Ladezustand (SOC) des Akkus ≥ 97 % erreicht, aktiviert der Adapter automatisch den BKW-Modus.
In diesem Modus wird zusätzlich zum Eigenbedarf eine feste Leistung (z. B. 600 oder 800 W) dauerhaft ins Netz eingespeist.
Dies kann sinnvoll sein, wenn ein Balkonkraftwerk (BKW) ordnungsgemäß angemeldet ist und eine Einspeisevergütung für eingespeisten Strom möglich ist.

Sinkt der Ladezustand des Akkus wieder unter 97 %, deaktiviert sich der BKW-Modus automatisch und die Einspeisung wird reduziert oder beendet.
Der Prozess läuft vollständig automatisch und benötigt keine weitere Benutzerinteraktion.

Hinweis: Die Aktivierung des BKW-Modus erfolgt nur, wenn in den Adaptereinstellungen BKW-Modus aktivieren gewählt und der Batteriekalibrierungsmodus (batterycalibration) deaktiviert ist.

## Datenpunkte

Der Adapter erstellt dynamisch Datenpunkte basierend auf den von der CCU zurückgegebenen Informationen. Hier ein kleiner Teilausschnitt des Datenpunktstrukturaufbaus:

| Datenpunkt                    | Beschreibung                                               |
|-------------------------------|------------------------------------------------------------|
| `<deviceId>.SOC`              | Batterie Ladezustand.                                      |
| `<deviceId>.PV_power_total`   | PV-Leistung gesamt.                                        |
| `<deviceId>.batteriesInfo.*`  | Batterieinformationen.                                     |
| `<deviceId>.convertersInfo.*` | Converter Status.                                          |
| `<deviceId>.settings.*`       | Gerätespezifische Einstellungen. (Nur Cloud)               |
| `<deviceId>.sendcommand.*`    | Steuerbefehle für die CCU.                                 |
| `<deviceId>.VersionControl.*` | Werkzeuge zum Ändern der CCU-Version. (nur im Cloud-Modus) |

## Hinweise

- Änderungen an Datenpunkten im Bereich `<deviceId>.sendcommand` werden automatisch erkannt und an die CCU gesendet.
- Bei Problemen mit fehlenden Datenpunkten oder unerwartetem Verhalten: Adapter neu starten.

## Fehler

- **Fehler beim Verarbeiten der Daten**:
    - `deviceId` nicht vorhanden → Adapter neu starten, nachdem die CCU-Info eingegeben wurde. 

- **Eingaben auf der APP-Webseite(Online) werden zurückgesetzt**:
    - Verwende ausschließlich die Webseite `maxxi.local` oder die IP-Addresse der CCU, um manuelle Eingaben vorzunehmen. Bei der Nutzung von sendCommand-Steuerbefehlen werden die Online-Eingaben überschrieben.

## Changelog

### 1.4.40 (2025-05-13)
- New Option Mode "BKW"
> At a battery level of ≥ 97%, the script enables BKW mode to feed a constant 600–800 W into the grid alongside household use, potentially receiving compensation if registered as a balcony power system (BKW).

### 1.4.32 (2025-04-06)
- New cloud method – Backup mode Server 2 (check config)
  > Note: Cloud Server 1 provides more datapoints but may be less stable.  
  > Cloud Server 2 (Backup mode) is more stable but delivers fewer datapoints.
- Adds dynamic firmware version management with categorized release listings.

### 1.4.11 (2025-03-17)
- CloudApi: Request times no longer aligned to second 0 on all adapters, improving load distribution.
- Updated dependencies.

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