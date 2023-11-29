---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sonnen-charger/README.md
title: ioBroker.sonnen-charger
hash: 3S9zsY2VTfXcDFiF/YYwzuECoDTkYfp1ZS5+3WIDrlY=
---
![Logo](../../../en/adapterref/iobroker.sonnen-charger/admin/sonnen-charger.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.sonnen-charger.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sonnen-charger.svg)
![Anzahl der Installationen](https://iobroker.live/badges/sonnen-charger-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/sonnen-charger-stable.svg)
![NPM](https://nodei.co/npm/iobroker.sonnen-charger.png?downloads=true)

# IoBroker.sonnen-charger
**Tests:** ![Test und Freigabe](https://github.com/ChrisWbb/ioBroker.sonnen-charger/workflows/Test%20and%20Release/badge.svg)

## Sonnen-Ladeadapter für ioBroker
Dieser Adapter integriert Ihren sonnenCharger in ioBroker. Weitere Informationen zum sonnenCharger finden Sie unter [Anbieter-Webseite](https://sonnen.de/ladestation-elektroauto/).

## Aufbau
Nachdem Sie eine Instanz des Apdaters erstellt haben, müssen Sie mehrere Parameter konfigurieren:

|Parametername|Beschreibung|Standard|
|:---|:---|:---|
|IP-Adresse|IP-Adresse des sonnenChargers|-|
|Port|Port der Modbus-Schnittstelle des sonnenCharger|502|
|Anforderungsintervall|Intervall zum Abrufen von Daten in Sekunden (ValueRage 30 - 3600) |30|
|Schreibzugriff auf sonnenCharger erlauben|**EXPERIMENTAL** Seien Sie vorsichtig beim Schreiben von Daten in sonnenCharger|false|

## Verwendung
### Kanal: Info
|Id|Beschreibung|Datentyp|Einheit|Lesen/Schreiben|Zusatzinformationen|
|:---|:---|:---|:---|:---|:---|
|connection|Gerät oder Dienst verbunden|boolean|-|R|-|

### Kanal: ChargerSettings
|Id|Beschreibung|Datentyp|Einheit|Lesen/Schreiben|Zusatzinformationen|
|:---|:---|:---|:---|:---|:---|
|serialNumber|Seriennummer|string||R||
|model|Model|string||R||
|hwVersion|Hardwareversion|string||R||
|swVersion|Softwareversion|string||R||
|numberOfConnectors|Anzahl der Anschlüsse|integer||R||

### Kanal: ChargerSettings.connector.\<Nummer\>
|Id|Beschreibung|Datentyp|Einheit|Lesen/Schreiben|Zusatzinformationen|
|:---|:---|:---|:---|:---|:---|
|connectorType|Connector-Typ|string||R||
|numberOfPhases|Anzahl Phasen|integer||R||
|l1ConnectedToPhase|L1 verbunden mit Phase|integer||R||
|l2ConnectedToPhase|L2 verbunden mit Phase|integer||R||
|l3ConnectedToPhase|L3 verbunden mit Phase|integer||R||
|customMaxCurrent|Benutzerdefinierter Maximalstrom|float|A|R||

### Kanal: Messungen.\<Nummer\>
|Id|Beschreibung|Datentyp|Einheit|Lesen/Schreiben|Zusatzinformationen|
|:---|:---|:---|:---|:---|:---|
|connectorStatus|Connector-Status-ID|integer||R||
|connectorStatusLabel|Connector-Statusbezeichnung|string||R|0 : Unbekannt<br> 1: SocketVerfügbar<br> 2: WaitingForVehicleToBeConnected<br> 3: WaitingForVehicleToStart<br> 4: Laden<br> 5: ChargingPausedByEv<br> 6: ChargingPausedByEvse<br> 7: Ladevorgang beendet<br> 8: Ladefehler<br> 9: Ladevorgang wird unterbrochen<br> 10: Nicht verfügbar|
|measuredVehicleNumberOfPhases|Gemessene Fahrzeuganzahl der Phasen id|integer||R||
|measuredVehicleNumberOfPhasesLabel|Gemessene Fahrzeuganzahl der Phasen label|string||R||
|evMaxPhaseCurrent|EV max. Phasenstrom|float|A|R||
|targetCurrentFromPowerMgm|Zielstrom von Power MGM oder Modbus|float|A|R||
|Frequenz|Frequenz|float|Hz|R||
|SpannungL1|L-N-Spannung (L1)|float|V|R||
|SpannungL2|L-N-Spannung (L2)|float|V|R||
|SpannungL3|L-N-Spannung (L3)|float|V|R||
|currentL1|Strom (L1)|float|A|R||
|currentL2|Strom (L2)|float|A|R||
|currentL3|Strom (L3)|float|A|R||
|activePowerL1|Wirkleistung (L1)|float|kW|R||
|activePowerL2|Wirkleistung (L2)|float|kW|R||
|activePowerL3|Wirkleistung (L3)|float|kW|R||
|activePowerTotal|Wirkleistung (gesamt)|float|kW|R||
|powerFactor|Leistungsfaktor|float||R||
|totalImportedActiveEnergyInRunningSession|Gesamt importierte Wirkenergie in laufender Sitzung|float|kWh|R||
|runningSessionDuration|Dauer der laufenden Sitzung|Anzahl|Sekunden|R||
|runningSessionDepartureTime|Startzeit der laufenden Sitzung|Anzahl|Sekunden|R|Unix-Zeit (Sekunden seit 1970-01-01 00:00:00 UTC)|
|runningSessionDepartureTimeISO|Startzeit der laufenden Sitzung im ISO-UTC-Format|string||R||
|runningSessionID|Laufende Sitzungs-ID|integer||R|Für den Fall, dass das Ladegerät mit dem Zentralsystem kommuniziert, ist dies eine Transaktions-ID, die vom Zentralsystem über OCPP| bereitgestellt wird |
|evMaxPower|EV max power|float|kW|R|Maximale Leistung, die in der aktuell laufenden Ladesitzung erkannt wurde|
|evPlannedEnergy|EV geplante Energie|float|kWh|R|Gesamtenergiemenge, die für die aktuell laufende Ladesitzung geliefert werden soll|

### Kanal: Befehle
|Id|Beschreibung|Datentyp|Einheit|Lesen/Schreiben|Zusatzinformationen|
|:---|:---|:---|:---|:---|:---|
|restart|Sonnen-Ladegerät neu starten|Taste||W||
|setTime|Set time UTC"|integer|seconds|W|Unix-Zeit (Sekunden seit 1970-01-01 00:00:00 UTC)|

### Kanal: commands.connectors\<Nummer\>
|Id|Beschreibung|Datentyp|Einheit|Lesen/Schreiben|Zusatzinformationen|
|:---|:---|:---|:---|:---|:---|
|stopCharging|Ladestopp|Taste||W||
|PauseLaden|Laden anhalten|Taste||W||
|setDepartureTime|Abfahrtszeit festlegen|integer|sekunden|W||
|setCurrentSetpoint|Aktuellen Sollwert setzen|float|A|W||
|cancelCurrentSetpoint|Aktuellen Sollwert abbrechen|Schaltfläche||W||
|setPowerSetpoint|Leistungssollwert setzen|float|kW|W||
|cancelPowerSetpoint|Leistungsvorgabe abbrechen|Schaltfläche||W||

## Changelog

### **WORK IN PROGRESS**
* (ChrisWbb) adjust state roles
* (ChrisWbb) new version of @types/node
* (ChrisWbb) tests for node 20.x


### 1.1.1 (2023-03-30)
* (ChrisWbb) fixed release problem

### 1.1.0 (2023-03-30)
* (ChrisWbb) write access to holding register
* (ChrisWbb) refactoring async calls
* (ChrisWbb) smaller changes based on suggestions from review
* (ChrisWbb) update readme

### 1.0.2 (2023-02-18)
* (ChrisWbb) fix ESLint findings

### 1.0.1 (2023-02-18)
* (ChrisWbb) preparation for release
* (ChrisWbb) small fixes from adapter check

### 1.0.0 (2023-01-02)
* (ChrisWbb) initial version

## License
MIT License

Copyright (c) 2023 ChrisWbb <development@chrweber.de>

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