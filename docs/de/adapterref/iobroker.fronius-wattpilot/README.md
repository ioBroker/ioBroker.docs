---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.fronius-wattpilot/README.md
title: ioBroker.fronius-wattpilot
hash: nRtUxJxL8jc8iMLKpLwL7mkVOqPO8R1jUqixfK8Nu3o=
---
![Logo](../../../en/adapterref/iobroker.fronius-wattpilot/admin/fronius-wattpilot.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.fronius-wattpilot.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.fronius-wattpilot.svg)
![Anzahl der Installationen](https://iobroker.live/badges/fronius-wattpilot-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/fronius-wattpilot-stable.svg)
![NPM](https://nodei.co/npm/iobroker.fronius-wattpilot.png?downloads=true)

# IoBroker.fronius-wattpilot
**Tests:** ![Testen und Freigeben](https://github.com/tim2zg/ioBroker.fronius-wattpilot/workflows/Test%20and%20Release/badge.svg)

[Zur deutschen Version der Dokumentation](README_DE.md)

## Was ist das für ein Adapter?
Dieser Adapter integriert Ihr Fronius Wattpilot EV-Ladegerät mit ioBroker und ermöglicht Ihnen die Überwachung und Steuerung Ihrer Ladestation. Der Wattpilot ist eine intelligente Ladelösung für Elektrofahrzeuge, die in Ihr Smart-Home-System integriert werden kann.

**🌟 Hauptfunktionen:**

- Echtzeitüberwachung des Ladestatus
- Fernsteuerung der Ladeparameter
- Unterstützung für Cloud- und lokale Verbindungen

## Installation und Einrichtung
### Voraussetzungen
Bevor Sie den Adapter installieren, müssen Sie Ihren Wattpilot einrichten:

1. **Wattpilot-Setup abschließen**: Schließen Sie die Ersteinrichtung mit der offiziellen Fronius Wattpilot-App ab und **merken Sie sich Ihr Passwort**
2. **Mit WLAN verbinden**: Gehe in der App auf den Reiter „Internet“ und verbinde deinen Wattpilot mit deinem WLAN-Netzwerk
3. **IP-Adresse ermitteln**: Sie benötigen die IP-Adresse Ihres Wattpiloten mit einer der folgenden Methoden:
- **Router-Methode**: Überprüfen Sie die Weboberfläche Ihres Routers auf angeschlossene Geräte
- **App-Methode**: Tippen Sie in der Wattpilot-App nach der Verbindung auf den WLAN-Namen. Sie sehen Netzwerkdetails einschließlich der IP-Adresse

> 💡 **Wichtig**: Es wird dringend empfohlen, Ihrem Wattpilot in den Routereinstellungen eine statische IP-Adresse zuzuweisen, um Verbindungsprobleme zu vermeiden.

### Adapterinstallation
1. Installieren Sie den Adapter von der ioBroker-Seite „Adapter“
2. Erstellen Sie eine neue Instanz des Fronius-Wattpilot-Adapters
3. In der Instanzkonfiguration:
- Geben Sie die **IP-Adresse** Ihres Wattpiloten ein
- Geben Sie Ihr Wattpilot-**Passwort** ein
- Konfigurieren Sie nach Bedarf weitere Einstellungen
4. Speichern Sie die Konfiguration

Wenn alles richtig konfiguriert ist, stellt der Adapter eine Verbindung her und beginnt mit der Erstellung von Datenpunkten.

## So verwenden Sie den Adapter
### Daten lesen
Der Adapter erstellt automatisch Datenpunkte für alle Wattpilot-Werte. Diese können Sie wie alle anderen Datenpunkte im ioBroker verwenden für:

- Visualisierung in VIS oder anderen Frontends
- Logik in Skripten und Blockly
- Automatisierungsregeln

**Datenmodi:**

- **Nur wichtige Punkte** (Standard): Zeigt nur die wichtigsten Werte an
- **Alle Werte**: Deaktivieren Sie die Option „Nur Schlüsselpunkte“, um alle verfügbaren API-Daten anzuzeigen

📖 Vollständige API-Dokumentation: [Wattpilot API-Dokumentation](https://github.com/joscha82/wattpilot/blob/main/API.md) (Danke an joscha82)

### Steuerung Ihres Wattpiloten
#### Direkte staatliche Kontrolle (NEU!)
Wichtige Wattpilot-Funktionen können Sie nun direkt durch Schreiben in die Zustände steuern.

#### Erweiterte Steuerung über set_state
Für eine erweiterte Steuerung verwenden Sie den Datenpunkt `set_state` mit diesem Format:

```
stateName;value
```

**Verfügbare Zustände:**

- **Ampere**: `6-16` (Ladestrom in Ampere)
- **cae**: „true“ oder „false“ (⚠️ deaktiviert die Cloud-Funktionalität – möglicherweise ist ein Neustart erforderlich)

**Beispiele:**

```
amp;10          // Set charging current to 10A
```

## Beispiele und Anwendungsfälle
### Beispiel für Solarintegration
Schauen Sie sich unseren [Blockly-Beispiel](https://github.com/tim2zg/ioBroker.fronius-wattpilot/blob/main/examples/example-Blockly.xml) an, der zeigt, wie Sie:

- Überwachen Sie Ihre Solarstromproduktion
- Automatische Anpassung des Wattpilot-Ladestroms basierend auf überschüssigem Solarstrom

**So verwenden Sie das Beispiel:**

1. Kopieren Sie den Inhalt aus der Beispieldatei
2. Klicken Sie in ioBroker Blockly auf das Symbol „Blöcke importieren“ (obere rechte Ecke).
3. Fügen Sie den Inhalt ein und passen Sie ihn an Ihr Setup an

### Allgemeine Automatisierungen
- **Zeitbasiertes Laden**: Beginnen Sie mit dem Laden außerhalb der Spitzenzeiten
- **Solar-Überschussladung**: Laden Sie nur, wenn überschüssiger Solarstrom verfügbar ist
- **Anwesenheitserkennung**: Starten/Stoppen des Ladevorgangs basierend auf der Fahrzeuganwesenheit
- **Lastausgleich**: Passen Sie den Ladestrom an den Stromverbrauch im Haushalt an

## Technische Details
Der Adapter verbindet sich mit der WebSocket-Schnittstelle des Wattpilot und wandelt eingehende Daten in ioBroker-Datenpunkte um. Er unterstützt sowohl lokale WLAN-Verbindungen als auch Cloud-basierte Verbindungen.

**Verbindungstypen:**

- **Lokales WLAN** (empfohlen): Direkte Verbindung zu Ihrem Wattpilot
- **Cloud**: Anbindung über Fronius Cloud-Dienste

## Fehlerbehebung
**Häufige Probleme:**

- **Verbindung fehlgeschlagen**: Überprüfen Sie IP-Adresse und Passwort
- **Häufige Verbindungsabbrüche**: Weisen Sie Ihrem Wattpilot eine statische IP zu
- **Fehlende Datenpunkte**: Versuchen Sie, den Modus „Alle Werte“ zu aktivieren
- **Probleme mit der Cloud-Verbindung**: Überprüfen Sie die „cae“-Einstellung

**⚠️ Haftungsausschluss:** Dieser Adapter verwendet inoffizielle APIs. Die Verwendung erfolgt auf eigene Gefahr und sei vorsichtig beim Ändern von Einstellungen, die den Betrieb deines Geräts beeinträchtigen könnten.

## Entwickler
- [SebastianHanz](https://github.com/SebastianHanz)
- [tim2zg](https://github.com/tim2zg)
- [derHaubi](https://github.com/derHaubi)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 4.7.0 (2025-06-19)
- Rewrite of the adapter
- Added ability to set states directly
- Added ability to set common states directly
- Fix all issues

### 4.6.3 (2023-12-24)
- Fixed a bug where the adapter would use a undefined variable
- Fixed bug #44
- Fixed bug #43

### 4.6.2 (2023-08-15)
- Thanks to Norb1204 for fixing a few bugs that I missed. More in Issue #40

### 4.6.1 (2023-08-15)
- Fixed Issue #39 (set_state not working)

### 4.6.0 (2023-07-15)
- Fixed timeout issue in normal parser mode (#36), still exist in dynamic parser mode --> use no timeout (0)
- Fixed a number of issues concerning the static parser mode
- Quality of life improvements --> you can now set the common states directly! (set_power, set_mode) are still available for compatibility reasons and for the dynamic parser mode

### 4.5.1 (2023-03-02)
- Fixed issue #29 (custom states not working)

### 4.5.0 (2023-02-19)
- Fixed random log messages
- Fixed a type conflict at the set_state state
- Commits from now on should be signed

### 4.4.0 (2023-02-16)
- known states will now be updated even if the dynamic parser is enabled

### 4.3.0 (2023-01-14)
- dependency updates
- state updates

### 4.2.1 (2023-01-05)
- Fixed bug in the all values mode / parser

### 4.2.0 (2023-01-01)
- Some QoL improvements

### 4.1.0 (2022-12-30)
- Added the possibility to add states manually via the instance-settings
- Fixed the bug where the adapter didn't set the correct value types
- Added some quality of life improvements

### 4.0.0 (2022-11-30)
- Fixed timing issue
- Added set_power and set_mode states

### 3.3.1 (2022-11-17)
- Fixed a bug where set_state was not writable

### 3.3.0 (2022-11-17)
- Fixed a bug where the adapter would not set the correct labels for the states
- Performance improvements
- Fixed dependencies

### 3.2.5 (2022-10-14)
- Small changes to the package.json and io-package.json

### 3.2.4 (2022-10-11)
- Fiexed cool down timer for normal values

### 3.2.3 (2022-10-08)
- Bug fixed where the adapter would not respect the timout timer and would try to constantly reconnect to the WattPilot
- Bug fixed where the adapter would send a wrong disconnect message to the WattPilot

### 3.2.2 (2022-10-06)
- Fixed reconnecting frequency
- Fixed multiple Websocket connections
- Added frequency handler

### 3.2.1 (2022-10-02)
- Fixed reconnecting to the WebSocket
- Restructured the code

### 3.2.0 (2022-09-29)
- Implemented reconnecting
- Shrank code down

### 3.1.0 (2022-09-07)
- Added the option to use the cloud as a datasource
- Updated GitHub workflows

### 3.0.0 (2022-09-04)
- Updated README.md
- Created "examples"-directory for sample applications
- Added some translations
- Renamed checkbox "Parser" to something more intuitive
- Fixxed #4: Datapoint "map" now gets created correctly
- Fixxed #5: Password-characters are no longer visible
- Fixxed type conflict of cableType

### 2.2.4 (2022-09-01)
- SebastianHanz fixed infinite RAM-usage
- added some description

### 2.2.3 (2022-08-30)
- SebastianHanz fixed type-conflicts. Thank you!

### 2.2.2 (2022-08-25)
- Bug fixes

### 2.2.1 (2022-08-22)
- Bug fixes

### 2.2.0 (2022-08-21)
- Fixed Bugs

### 2.1.0 (2022-08-19)
- Min Node Version 16

### 2.0.3 (2022-07-20)
- Updated Readme

### 2.0.2 (2022-07-12)
-   Bug fixed

### 2.0.1 (2022-07-10)
-   Added a how to install. Not to detail because currently not in stable repo.

### 2.0.0 (2022-07-10)
-   Fixed NPM Versions hopefully

### 1.1.0 (2022-07-10)
-   Added UselessPV and TimeStamp Parser, did some testing.

### 1.0.1 (2022-06-02)
- Tests

### 1.0.0 (2022-06-02)

- Did some changes
- Did some more changes

### 0.0.5 (2020-01-01)
- Better Code

### 0.0.4 (2020-01-01)
- Parser option added

### 0.0.3 (2020-01-01)
- Parser added

### 0.0.2 (2020-01-01)
- Bug fixed

### 0.0.1 (2020-01-01)
- Initial release

## License
MIT License

Copyright (c) 2025 tim2zg <tim2zg@protonmail.com>

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