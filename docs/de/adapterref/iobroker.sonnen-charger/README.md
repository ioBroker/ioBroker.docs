---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sonnen-charger/README.md
title: ioBroker.sonnen-charger
hash: vATzeNQGQW8IZuSUI/bk1Aq+ygmG+6AQwEb0Fpee0Jc=
---
![Logo](../../../en/adapterref/iobroker.sonnen-charger/admin/sonnen-charger.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.sonnen-charger.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sonnen-charger.svg)
![Anzahl der Installationen](https://iobroker.live/badges/sonnen-charger-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/sonnen-charger-stable.svg)
![NPM](https://nodei.co/npm/iobroker.sonnen-charger.png?downloads=true)

# IoBroker.sonnen-charger
**Tests:** ![Testen und Freigeben](https://github.com/ChrisWbb/ioBroker.sonnen-charger/workflows/Test%20and%20Release/badge.svg)

## Sonnen-Ladeadapter für ioBroker
Dieser Adapter integriert Ihren sonnenCharger in den ioBroker. Weitere Informationen zum sonnenCharger finden Sie auf [Anbieter-Webseite](https://sonnen.de/ladestation-elektroauto/).

## Konfiguration
Nachdem Sie eine Instanz des Apdaters erstellt haben, müssen Sie verschiedene Parameter konfigurieren:

|Parametername|Beschreibung|Standard|
|:---|:---|:---|
|IP-Adresse|IP-Adresse des sonnenCharger|-|
|Port|Port der Modbus-Schnittstelle des sonnenCharger|502|
|Anforderungsintervall|Intervall zum Abrufen der Daten in Sekunden (Wertebereich 30 – 3600) |30|
|Schreibzugriff auf sonnenCharger erlauben|**EXPERIMENTELL** Vorsicht beim Schreiben von Daten in sonnenCharger|false|

## Verwendung
### Kanal: info
|ID|Beschreibung|Datentyp|Einheit|Lesen/Schreiben|Zusätzliche Informationen|
|:---|:---|:---|:---|:---|:---|
|Verbindung|Gerät oder Dienst verbunden|Boolesch|-|R|-|

### Kanal: LadegerätEinstellungen
|ID|Beschreibung|Datentyp|Einheit|Lesen/Schreiben|Zusätzliche Informationen|
|:---|:---|:---|:---|:---|:---|
|serialNumber|Seriennummer|string||R||
|Modell|Modell|Zeichenfolge||R||
|hwVersion|Hardwareversion|Zeichenfolge||R||
|swVersion|Softwareversion|Zeichenfolge||R||
|numberOfConnectors|Anzahl der Anschlüsse|integer||R||

### Kanal: chargerSettings.connector.\<Nummer\>
|ID|Beschreibung|Datentyp|Einheit|Lesen/Schreiben|Zusätzliche Informationen|
|:---|:---|:---|:---|:---|:---|
|connectorType|Anschlusstyp|Zeichenfolge||R||
|AnzahlPhasen|Anzahl Phasen|Ganzzahl||R||
|l1ConnectedToPhase|L1 mit Phase verbunden|Integer||R||
|l2ConnectedToPhase|L2 mit Phase verbunden|Integer||R||
|l3ConnectedToPhase|L3 mit Phase verbunden|Integer||R||
|customMaxCurrent|Benutzerdefinierter Maximalstrom|float|A|R||

### Kanal: Messungen.\<Nummer\>
|ID|Beschreibung|Datentyp|Einheit|Lesen/Schreiben|Zusätzliche Informationen|
|:---|:---|:---|:---|:---|:---|
|connectorStatus|Connector-Status-ID|Integer||R||
|connectorStatusLabel|Connector-Statusbezeichnung|Zeichenfolge||R|0: Unbekannt<br> 1: Sockel verfügbar<br> 2: Warten auf die Verbindung zum Fahrzeug<br> 3: WartenAufFahrzeugStarten<br> 4 : Aufladen<br> 5 : LadenPausiertVonEv<br> 6: Ladevorgang durch Evse angehalten<br> 7 : Ladevorgang beendet<br> 8: Ladefehler<br> 9 : Ladevorgang fortsetzen<br> 10: Nicht verfügbar|
|measuredVehicleNumberOfPhases|Gemessene Fahrzeuganzahl der Phasen-ID|Integer||R||
|measuredVehicleNumberOfPhasesLabel|Bezeichnung für die gemessene Phasenzahl des Fahrzeugs|Zeichenfolge||R||
|evMaxPhaseCurrent|Maximaler Phasenstrom des EV|float|A|R||
|targetCurrentFromPowerMgm|Zielstrom von Power Mgm oder Modbus|float|A|R||
|Frequenz|Frequenz|Float|Hz|R||
|SpannungL1|L-N-Spannung (L1)|Float|V|R||
|SpannungL2|L-N-Spannung (L2)|Float|V|R||
|SpannungL3|L-N-Spannung (L3)|Float|V|R||
|currentL1|Strom (L1)|float|A|R||
|currentL2|Strom (L2)|float|A|R||
|currentL3|Strom (L3)|float|A|R||
|activePowerL1|Wirkleistung (L1)|float|kW|R||
|activePowerL2|Wirkleistung (L2)|float|kW|R||
|activePowerL3|Wirkleistung (L3)|float|kW|R||
|activePowerTotal|Wirkleistung (gesamt)|float|kW|R||
|Leistungsfaktor|Leistungsfaktor|Float||R||
|totalImportedActiveEnergyInRunningSession|Gesamt importierte Wirkenergie in laufender Sitzung|float|kWh|R||
|runningSessionDuration|Dauer der laufenden Sitzung|Zahl|Sekunden|R||
|runningSessionDepartureTime|Abgangszeit der laufenden Sitzung|Zahl|Sekunden|R|Unix-Zeit (Sekunden seit 01.01.1970 00:00:00 UTC)|
|runningSessionDepartureTimeISO|Abgangszeit der laufenden Sitzung im ISO-UTC-Format|string||R||
|runningSessionID|Laufende Sitzungs-ID|Integer||R|Falls das Ladegerät mit dem Zentralsystem kommuniziert, ist dies eine Transaktions-ID, die vom Zentralsystem über OCPP bereitgestellt wird|
|evMaxPower|Maximale EV-Leistung|float|kW|R|Im aktuell laufenden Ladevorgang erkannte maximale Leistung|
|evPlannedEnergy|Geplante EV-Energie|float|kWh|R|Gesamtmenge an Energie, die für den aktuell laufenden Ladevorgang geliefert werden soll|

### Kanal: Befehle
|ID|Beschreibung|Datentyp|Einheit|Lesen/Schreiben|Zusätzliche Informationen|
|:---|:---|:---|:---|:---|:---|
|Neustart|Sonnen-Charger neu starten|Button||W||
|setTime|Zeit einstellen UTC"|integer|Sekunden|W|Unix-Zeit (Sekunden seit 1970-01-01 00:00:00 UTC)|

### Kanal: commands.connectors\<Nummer\>
|ID|Beschreibung|Datentyp|Einheit|Lesen/Schreiben|Zusätzliche Informationen|
|:---|:---|:---|:---|:---|:---|
|stopCharging|Ladevorgang stoppen|Schaltfläche||W||
|pauseCharging|Laden pausieren|Taste||W||
|setDepartureTime|Abfahrtszeit festlegen|Integer|Sekunden|W||
|setCurrentSetpoint|Aktuellen Sollwert einstellen|float|A|W||
|cancelCurrentSetpoint|Aktuellen Sollwert abbrechen|Schaltfläche||W||
|setPowerSetpoint|Leistungssollwert einstellen|float|kW|W||
|cancelPowerSetpoint|Leistungssollwert abbrechen|Schaltfläche||W||

## **IN ARBEIT**
* (ChrisWbb) Smart-Mode-Implementierung (derzeit nicht deaktiviert)
* (ChrisWbb) Abhängigkeitsversionen aktualisieren

### 1.2.1 (30.05.2024)
* (ChrisWbb) Behebung der Fehler im Adapter-Checker

### 1.2.0 (30.05.2024)
* (ChrisWbb) Abhängigkeitsversionen aktualisieren
* (ChrisWbb) Fehler beim Adapter-Checker behoben
* (ChrisWbb) Staatsrollen anpassen
* (ChrisWbb) neue Version von @types/node
* (ChrisWbb) Tests für Knoten 20.x

### 1.1.1 (30.03.2023)
* (ChrisWbb) Release-Problem behoben

### 1.1.0 (30.03.2023)
* (ChrisWbb) Schreibzugriff auf Halteregister
* (ChrisWbb) Refactoring asynchroner Aufrufe
* (ChrisWbb) kleinere Änderungen basierend auf Vorschlägen aus der Überprüfung
* (ChrisWbb) Readme aktualisieren

### 1.0.2 (18.02.2023)
* (ChrisWbb) ESLint-Ergebnisse beheben

### 1.0.1 (18.02.2023)
* (ChrisWbb) Vorbereitung zur Veröffentlichung
* (ChrisWbb) kleine Korrekturen vom Adaptercheck

### 1.0.0 (02.01.2023)
* (ChrisWbb) erste Version

## Changelog

## License
MIT License

Copyright (c) 2024 ChrisWbb <development@chrweber.de>

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