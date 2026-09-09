---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sonnen-charger/README.md
title: ioBroker.sonnen-charger
hash: qchnlxvVfIix5sXl7UUv1A8uFIn6SPk9HvsD75XfH/I=
---
![Logo](../../../en/adapterref/iobroker.sonnen-charger/admin/sonnen-charger.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.sonnen-charger.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sonnen-charger.svg)
![Anzahl der Installationen](https://iobroker.live/badges/sonnen-charger-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/sonnen-charger-stable.svg)
![NPM](https://nodei.co/npm/iobroker.sonnen-charger.png?downloads=true)
![Test und Freigabe](https://github.com/ChrisWbb/ioBroker.sonnen-charger/workflows/Test%20and%20Release/badge.svg)

# ioBroker.sonnen-charger

## Sonnen-Ladeadapter für ioBroker

Dieser Adapter integriert Ihren sonnenCharger in ioBroker.\
&#x20;Weitere Informationen zu sonnenCharger finden Sie auf [der Webseite des Anbieters](https://sonnen.de/ladestation-elektroauto/) .

## Konfiguration

Nachdem Sie eine Instanz des Appators erstellt haben, müssen Sie mehrere Parameter konfigurieren:

| Parametername                             | Beschreibung                                                                           | Standard |
| :---------------------------------------- | :------------------------------------------------------------------------------------- | :------- |
| IP-Adresse                                | IP-Adresse des sonnenChargers                                                          | -        |
| Hafen                                     | Modbus-Schnittstelle des sonnenCharger                                                 | 502      |
| Anforderungsintervall                     | Intervall für den Datenabruf in Sekunden (Wertebereich 30 - 3600)                      | 30       |
| Schreibzugriff auf sonnenCharger gewähren | **EXPERIMENTELL:** Seien Sie vorsichtig beim Schreiben von Daten in den sonnenCharger. | FALSCH   |

## Verwendung

### Kanal: Info

| Ausweis    | Beschreibung                      | Datentyp        | Einheit | Lesen/Schreiben | Zusätzliche Informationen |
| :--------- | :-------------------------------- | :-------------- | :------ | :-------------- | :------------------------ |
| Verbindung | angeschlossenes Gerät oder Dienst | boolescher Wert | -       | R               | -                         |

### Kanal: Ladegeräteinstellungen

| Ausweis               | Beschreibung          | Datentyp     | Einheit | Lesen/Schreiben | Zusätzliche Informationen |
| :-------------------- | :-------------------- | :----------- | :------ | :-------------- | :------------------------ |
| Seriennummer          | Seriennummer          | Zeichenkette |         | R               |                           |
| Modell                | Modell                | Zeichenkette |         | R               |                           |
| Hardwareversion       | Hardwareversion       | Zeichenkette |         | R               |                           |
| swVersion             | Softwareversion       | Zeichenkette |         | R               |                           |
| Anzahl der Anschlüsse | Anzahl der Anschlüsse | ganze Zahl   |         | R               |                           |

### Kanal: chargerSettings.connector.\<Nummer>

| Ausweis                       | Beschreibung                     | Datentyp     | Einheit | Lesen/Schreiben | Zusätzliche Informationen |
| :---------------------------- | :------------------------------- | :----------- | :------ | :-------------- | :------------------------ |
| Steckverbindertyp             | Anschlusstyp                     | Zeichenkette |         | R               |                           |
| Anzahl der Phasen             | Zahlenphasen                     | ganze Zahl   |         | R               |                           |
| l1ConnectedToPhase            | L1 ist mit Phase verbunden       | ganze Zahl   |         | R               |                           |
| l2ConnectedToPhase            | L2 ist mit Phase verbunden       | ganze Zahl   |         | R               |                           |
| l3ConnectedToPhase            | L3 ist mit Phase verbunden       | ganze Zahl   |         | R               |                           |
| benutzerdefinierterMaxCurrent | Benutzerdefinierter Maximalstrom | schweben     | A       | R               |                           |

### Kanal: Messungen.\<Nummer>

| Ausweis                                          | Beschreibung                                          | Datentyp     | Einheit  | Lesen/Schreiben | Zusätzliche Informationen                                                                                                                                                                                                                                                                 |
| :----------------------------------------------- | :---------------------------------------------------- | :----------- | :------- | :-------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Verbindungsstatus                                | Verbindungsstatus-ID                                  | ganze Zahl   |          | R               |                                                                                                                                                                                                                                                                                           |
| ConnectorStatusLabel                             | Verbindungsstatusetikett                              | Zeichenkette |          | R               | 0 : Unbekannt<br> 1 : SocketAvailable<br> 2 : Warten auf Fahrzeugverbindung<br> 3 : Warten auf Fahrzeugstart<br> 4: Aufladen<br> 5 : ChargingPausedByEv<br> 6 : ChargingPausedByEvse<br> 7 : Ladevorgang beendet<br> 8 : Ladefehler<br> 9: Ladevorgang fortsetzen<br> 10: Nicht verfügbar |
| gemesseneFahrzeuganzahlPhasen                    | Gemessene Fahrzeuganzahl der Phasen-ID                | ganze Zahl   |          | R               |                                                                                                                                                                                                                                                                                           |
| gemesseneFahrzeugAnzahlVonPhasenBeschriftung     | Gemessene Fahrzeuganzahl der Phasenbezeichnung        | Zeichenkette |          | R               |                                                                                                                                                                                                                                                                                           |
| evMaxPhaseCurrent                                | EV maximaler Phasenstrom                              | schweben     | A        | R               |                                                                                                                                                                                                                                                                                           |
| ZielstromVonPowerMgm                             | Zielstrom von Power MGM oder Modbus                   | schweben     | A        | R               |                                                                                                                                                                                                                                                                                           |
| Frequenz                                         | Frequenz                                              | schweben     | Hz       | R               |                                                                                                                                                                                                                                                                                           |
| SpannungL1                                       | LN-Spannung (L1)                                      | schweben     | V        | R               |                                                                                                                                                                                                                                                                                           |
| SpannungL2                                       | LN-Spannung (L2)                                      | schweben     | V        | R               |                                                                                                                                                                                                                                                                                           |
| SpannungL3                                       | LN-Spannung (L3)                                      | schweben     | V        | R               |                                                                                                                                                                                                                                                                                           |
| currentL1                                        | Strom (L1)                                            | schweben     | A        | R               |                                                                                                                                                                                                                                                                                           |
| currentL2                                        | Strom (L2)                                            | schweben     | A        | R               |                                                                                                                                                                                                                                                                                           |
| currentL3                                        | Strom (L3)                                            | schweben     | A        | R               |                                                                                                                                                                                                                                                                                           |
| aktivesPowerL1                                   | Wirkleistung (L1)                                     | schweben     | kW       | R               |                                                                                                                                                                                                                                                                                           |
| aktivesPowerL2                                   | Wirkleistung (L2)                                     | schweben     | kW       | R               |                                                                                                                                                                                                                                                                                           |
| aktivesPowerL3                                   | Wirkleistung (L3)                                     | schweben     | kW       | R               |                                                                                                                                                                                                                                                                                           |
| Gesamtleistung                                   | Wirkleistung (gesamt)                                 | schweben     | kW       | R               |                                                                                                                                                                                                                                                                                           |
| Leistungsfaktor                                  | Leistungsfaktor                                       | schweben     |          | R               |                                                                                                                                                                                                                                                                                           |
| GesamtimportierteAktiveEnergieInLaufenderSitzung | Gesamte importierte aktive Energie in der Laufsitzung | schweben     | kWh      | R               |                                                                                                                                                                                                                                                                                           |
| Laufzeit der Sitzung                             | Laufzeit der Sitzung                                  | Nummer       | Sekunden | R               |                                                                                                                                                                                                                                                                                           |
| runningSessionDepartureTime                      | Abfahrtszeit der Laufsitzung                          | Nummer       | Sekunden | R               | Unix-Zeit (Sekunden seit 1970-01-01 00:00:00 UTC)                                                                                                                                                                                                                                         |
| runningSessionDepartureTimeISO                   | Abfahrtszeit der laufenden Sitzung im ISO UTC-Format  | Zeichenkette |          | R               |                                                                                                                                                                                                                                                                                           |
| runningSessionID                                 | Laufende Sitzungs-ID                                  | ganze Zahl   |          | R               | Falls das Ladegerät mit dem zentralen System kommuniziert, handelt es sich um eine Transaktions-ID, die vom zentralen System über OCPP bereitgestellt wird.                                                                                                                               |
| evMaxPower                                       | EV maximale Leistung                                  | schweben     | kW       | R               | Maximale Leistung im aktuell laufenden Ladevorgang erkannt                                                                                                                                                                                                                                |
| evPlannedEnergy                                  | geplante Energie                                      | schweben     | kWh      | R               | Gesamtenergiemenge, die für die aktuell laufende Ladesitzung geliefert werden soll.                                                                                                                                                                                                       |

### Kanal: Befehle

| Ausweis  | Beschreibung                 | Datentyp   | Einheit  | Lesen/Schreiben | Zusätzliche Informationen                         |
| :------- | :--------------------------- | :--------- | :------- | :-------------- | :------------------------------------------------ |
| Neustart | Sonnen-Ladegerät neu starten | Taste      |          | W               |                                                   |
| setTime  | Zeit in UTC einstellen       | ganze Zahl | Sekunden | W               | Unix-Zeit (Sekunden seit 1970-01-01 00:00:00 UTC) |

### Kanal: commands.connectors\<number>

| Ausweis                        | Beschreibung                  | Datentyp   | Einheit  | Lesen/Schreiben | Zusätzliche Informationen |
| :----------------------------- | :---------------------------- | :--------- | :------- | :-------------- | :------------------------ |
| Ladevorgang stoppen            | Ladevorgang einstellen        | Taste      |          | W               |                           |
| Ladevorgang pausieren          | Ladevorgang unterbrechen      | Taste      |          | W               |                           |
| setDepartureTime               | Abfahrtszeit festlegen        | ganze Zahl | Sekunden | W               |                           |
| aktuellen Sollwert festlegen   | Aktuellen Sollwert einstellen | schweben   | A        | W               |                           |
| Aktuellen Sollwert abbrechen   | Aktuellen Sollwert abbrechen  | Taste      |          | W               |                           |
| Leistungsaufnahme festlegen    | Leistungssollwert einstellen  | schweben   | kW       | W               |                           |
| Leistungseinstellung abbrechen | Leistungssollwert abbrechen   | Taste      |          | W               |                           |

## **IN BEARBEITUNG**

- (ChrisWbb) Implementierung des intelligenten Modus (derzeit nicht deaktiviert)
- (ChrisWbb) Abhängigkeitsversionen aktualisieren

### 1.2.1 (2024-05-30)

- (ChrisWbb) Behebung der Fehler des Adapterprüfers

### 1.2.0 (2024-05-30)

- (ChrisWbb) Abhängigkeitsversionen aktualisieren
- (ChrisWbb) Fehlerbehebung beim Adapterprüfer
- (ChrisWbb) Statusrollen anpassen
- (ChrisWbb) Neue Version von @types/node
- (ChrisWbb) testet für Node 20.x

### 1.1.1 (2023-03-30)

- (ChrisWbb) Problem mit der Veröffentlichung behoben

### 1.1.0 (2023-03-30)

- (ChrisWbb) Schreibzugriff auf das Holding-Register
- (ChrisWbb) Refactoring asynchroner Aufrufe
- (ChrisWbb) kleinere Änderungen basierend auf Vorschlägen aus der Überprüfung
- (ChrisWbb) Readme aktualisieren

### 1.0.2 (2023-02-18)

- (ChrisWbb) ESLint-Fehler beheben

### 1.0.1 (2023-02-18)

- (ChrisWbb) Vorbereitung auf die Veröffentlichung
- (ChrisWbb) Kleinere Korrekturen aus der Adapterprüfung

### 1.0.0 (2023-01-02)

- (ChrisWbb) erste Version

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