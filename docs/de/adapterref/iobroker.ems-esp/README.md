---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ems-esp/README.md
title: ioBroker.ems-esp
hash: IufM3tIMikJYx7enM7YMVTmo8P/MOZdVP9yIgUo2CAw=
---
![Logo](../../../en/adapterref/iobroker.ems-esp/admin/ems-esp.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.ems-esp.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ems-esp.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/ems-esp-installed.svg)
![Anzahl Installationen (stabil)](https://iobroker.live/badges/ems-esp-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/tp1de/iobroker.ems-esp.svg)
![NPM](https://nodei.co/npm/iobroker.ems-esp.png?downloads=true)

# IoBroker.ems-esp
**Tests:** ![Test und Freigabe](https://github.com/tp1de/ioBroker.ems-esp/workflows/Test%20and%20Release/badge.svg)

## Bosch / Buderus Heizsysteme mit km200 / IP-inside und/oder ems-esp Schnittstelle
Der Adapter unterstützt eine Schnittstelle zu den Heizsystemen der Bosch-Gruppe über EMS- oder EMS+-Bus.
(Buderus / Junkers / Netfit usw.).

## Es kann über Web-API-Aufrufe eine Schnittstelle zum Heizsystem herstellen:
* km200, km200 hrv, km100, km50, HMC300 oder IP-inside (von Bosch Group)

* ems-esp-Schnittstelle (https://github.com/emsesp/EMS-ESP32) mit der neuesten Entwicklungsversion (siehe unten) und dem ESP32-Chip.

  Die alten ESP8266-Gateways mit API V2 werden NICHT MEHR UNTERSTÜTZT!!

Der ems-esp-Adapter kann Daten zu beiden Gateways lesen und schreiben, um alle Heizungskomponenten zu steuern.
Es kann entweder für die Original-Gateways der Bosch-Gruppe oder das ems-esp oder beide parallel verwendet werden.
Alle geänderten Zustände aus eigenen Skripten oder dem Objektbrowser müssen quittiert = falsch gesetzt werden !!!

Der Adapter wurde für das EMS-ESP-Gateway mit den neuesten Firmware-Versionen von ESP32 >= v3.5.1 getestet.

## Wichtige Einstellungen in EMS-ESP:
* Formatierungsoptionen für das Boolesche Format müssen 1/0 und für das Enum-Format Wert/Zahl sein.
* Die Einstellungen „API-Schreibbefehle aktivieren“ in ems-esp müssen aktiviert sein
* Die Bypass Access Token-Autorisierung bei API-Aufrufen muss festgelegt oder das Token eingegeben werden.

Beim Aktivieren der Checkbox wird entweder eine km200-ähnliche Gerätestruktur für EMS-ESP-Datenfelder verwendet oder die ursprüngliche EMS-ESP-Geräteansicht beibehalten: Kessel, Thermostat, Mischer usw. Bei paralleler Verwendung des km200-Gateways wird empfohlen, die km200-Daten zu verwenden Struktur. Dann befinden sich alle Entitäten/Zustände am selben Ort innerhalb der Objektstruktur von ioBroker.

## Umfrage
Dieser Adapter liest After-Start-Werte von ems-esp und km200 über HTTP-Get-Anfragen und ist in der Lage, Statusänderungen zu abonnieren und die entsprechenden http-Befehle (Post) entweder an die ems-esp-Hardware oder das km200-Gateway zurückzusenden.

* EMS-ESP-Leseabfrage ist ein Parameter (Standard 60 Sekunden) und kann nicht auf weniger als 15 Sekunden eingestellt werden.
* Die KM200-Abfrage ist ebenfalls ein Parameter (Standard 300 Sekunden) und der minimal einstellbare Wert beträgt 90 Sekunden.
* km200-Aufzeichnungen (Energieverbrauchs- und Temperaturstatistiken) werden stündlich aktualisiert

## Km200
Die Web-API-Aufrufe zum/vom km200-Gateway sind verschlüsselt. Für die Ver-/Entschlüsselung werden zwei Passwörter benötigt:

* das Gateway-Passwort auf einem Etikett am Gateway in der Form: xxxx-xxxx-xxxx-xxxx (Groß-/Kleinschreibung beachten)
* das private Passwort, das mit der Buderus **MyDevice**-App festgelegt wurde (verwenden Sie nicht myBuderus / EasyCom oder ähnliche cloudbasierte Apps!)

Die für das Bosch-Gateway zu verwendenden Felder können auch durch Abfrage der km200-Struktur (*) oder der jeweiligen CSV-Datei innerhalb der Adapterinstanzparameter definiert werden.
Für den ersten Adapterstart wird empfohlen, alle km200-Datenfelder mit einem „*“ auszuwählen.
Der Adapter erstellt dann eine km200.csv-Datei im Verzeichnis ../iobroker-data/ems-esp/{instance}.

Diese Datei kann für den nächsten Start der Adapterinstanz verwendet werden.
Nicht benötigte Zeilen (Felder) können gelöscht werden, um die Anzahl der auszulesenden km200-Felder zu reduzieren. (Erstellen Sie eine Kopie und benennen Sie die Datei um.)

## Km200-Aufzeichnungen (Energie- und Temperaturstatistik)
Die meisten modernen Heizsysteme verfügen über ein IP-Inside-Gateway und unterstützen Energiestatistiken:

* Aufzeichnung für Stromverbrauch und Temperaturstatistik
* Für diese Systeme und sofern diese Aufzeichnungsdaten verfügbar sind, werden die entsprechenden Statistiken abgefragt und in Zuständen gespeichert.

Verfügbar sind stündliche, tägliche und monatliche Statistiken sowie die Speicherung als Array-Daten in Zuständen und bei Auswahl einer Datenbankinstanz auch in Staaten, die mit Datenbankeinträgen gefüllt sind. (Statusnamen beginnen mit „_“)

* Das Kontrollkästchen Aufzeichnungen muss aktiviert sein und die Datenbankinstanz (mySQL oder InfluxDB) muss definiert sein. Um diese Option nutzen zu können, muss der SQL- oder InfluxDB-Verlaufsadapter installiert und aktiv sein.
* Die von Web-API-Aufrufen gelesenen Originalaufzeichnungsdaten werden unter der Statusstruktur km200 gespeichert.
* DB-Statistiken zur Anzeige in Flot-Diagrammen oder Grafana sind bisher nur für mySQL- und InfluxDB-Datenbanken verfügbar.
* Für InfluxDB V1 muss die Aufbewahrungsrichtlinie auf mindestens 170 Wochen eingestellt werden. (Ändern Sie die globale Aufbewahrungsrichtlinie für die Dauer von iobroker auf 170 W;)
* Für InfluxDB V2 wird die globale Aufbewahrungsrichtlinie vom Influxdb-Adapter festgelegt – bitte stellen Sie im Influxdb-Adapter die Speicheraufbewahrungszeit auf „keine automatische Löschung“ ein!

Dieser Adapter erstellt dann die jeweiligen Aufzeichnungszustände, aktiviert SQL-Statistiken, schreibt historische Datenbankeinträge mithilfe von SQL-Befehlen und aktualisiert die Aufzeichnungen. Die Aktualisierungshäufigkeit beträgt jede Stunde.

WICHTIG: Seien Sie bitte nicht verärgert, wenn die Werte der jeweiligen Bundesstaaten NULL()-Werte anzeigen.
IN EINIGEN FÄLLEN WERDEN DIE WERTE IM ADMIN-OBJEKT-BROWSER NICHT KORREKT ANGEZEIGT - BITTE VERWENDEN SIE FLOT ODER GRAFANA ZUR ANZEIGE !!!

## Km200-Aufzeichnungen – eine Erklärung
Einige Feldwerte sind als „aufzeichnungsfähig“ festgelegt. Diese Felder verfügen dann über „Aufnahmen“.
Je nach Art der Heizungsanlage werden diese Aufzeichnungen unter Aufzeichnungen/... oder EnergieMonitoring/... gespeichert.

Für aufgezeichnete Zustände wird jede Minute eine Probe innerhalb des km200-Gateways gesammelt.
Ein stündlicher Wert sollte 60 Proben haben, ein täglicher 24*60=1440 Proben, ein monatlicher 1440 x #Tage.
Jeder Zeitraum muss innerhalb des Adapters durch 3 API-Aufrufe gelesen werden:

* Stundenwerte: heute, gestern, vorgestern
* Tageswerte: aktueller Monat, letzte Monate, Monat -2
* Monatswerte: aktuelles Jahr, letztes Jahr, Jahr -2

Im von der Web-API gelesenen Datenfeld wird die Summe der Stichprobenwerte im Y-Wert und die Anzahl der Stichproben im C-Wert gespeichert.
(Siehe Originalwerte in JSON-Daten in km200...-Feldern.)

Da manchmal Proben fehlen, können die Energiewerte interpoliert werden. Die Interpolation ist konfigurierbar (ein/aus).
Für einige Monate (vor mehr als 12 Monaten) könnten einige Daten fehlen. (Bosch-Fehler im Code?)

Für den tatsächlichen Energieverbrauch des Monats berechnet der Adapter die Summe der Tageswerte und verwendet diese Summe, um genauere Daten zu erhalten.

## Statistiken
Die Kesselstatistik kann aktiviert werden und zeigt Folgendes an:

* Die Verarbeitungszeit des Abfragezyklus für EMS-ESP- und/oder km200-Gateway-Lesevorgänge und Statusverarbeitung
* Die Anzahl der Kessel- und WW-Starts pro Stunde / 24 Stunden
* Kesselauslastung pro Stunde (0-100 %).
* Zur Berechnung der Statistiken ist eine aktive Datenbankinstanz (siehe oben) erforderlich.

## Kesseleffizienz
Der Kesselwirkungsgrad kann berechnet werden, wenn die Parameter ausgefüllt sind. (Nur Gas- und Ölkessel)

* Der Kesselwirkungsgrad kann auf der Grundlage der durchschnittlichen Kesseltemperatur berechnet werden: (Kesseltemperatur + Rücklauftemperatur) / 2.
* Wenn die Rücklauftemperatur in km200/ems-esp nicht verfügbar ist, ist die Effizienzberechnung nicht sinnvoll – bitte deaktivieren, um Fehler zu vermeiden
* Sehen Sie sich das Datenblatt Ihres Heizkessels an, um die Effizienztabelle entsprechend anzupassen.
* Bei einigen Heizsystemen führt diese Funktion zu Fehlern - bitte ausschalten!!!
* Logik mit Release >= v1.30.0 geändert

## Veränderungen in der Staatsstruktur
Immer wenn eine neue EMS-ESP-Firmware neue Datenfelder hinzufügt und/oder Datenfeldnamen ändert, werden diese während der Adapterausführung verarbeitet. Dennoch werden veraltete Datenfelder vom Adapter nicht automatisch gelöscht.
Es besteht die Möglichkeit, die Statusstruktur neu aufzubauen, indem Status beim Neustart des Adapters gelöscht werden (Status mit Verlaufs-/Datenbankeinträgen bleiben erhalten).

## Wärmebedarfssteuerung
Erläuterung zur Berechnung und Konfiguration des Wärmebedarfs. Nur in deutscher Sprache verfügbar: https://github.com/tp1de/ioBroker.ems-esp/wiki

# Iobroker.ems-esp

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.0.3 (2023-07-25)
* error corrections for km200 read

### 2.0.2 (2023-07-24)
* re-add parameters for room / function
* change statistics update intervall for number of starts to every 5 minutes

### 2.0.1 (2023-07-24)
* without parameters for enum attributes
* Error correction on v2.0.0 for ems-esp datanames and structure

### 2.0.0 (2023-07-23)
* DO NOT USE - DOES NOT WORK correctly !!
* support for ems-esp version 3.6
* message about ems-esp adapter version to use for old gateway v2 users
* rework statistics to avoid slowing down admin adapter
* some minor improvements

### 1.34.0 (2023-07-21)
* avoid warnings on statistics processing for new installations without historic data yet
* allow statistics for polling-time for both gateways without active database
* allow old "dallas" prefix instead of "temperaturesensors"

### 1.33.0 (2023-07-20)
* Rework adapter instance config: Split EMS-ESP and KM200 config pages
* parameters stay the same

### 1.32.0 (2023-07-19)
* ems-esp v3.6 adjustments for dallas/temperaturesensors (not tested yet)
* update dependencies 
* improve processing off errors on statistics
* Small adjustments on parameter screen

### 1.31.0 (2023-07-08)
* correction on JSON errors for ems-esp gateway entities (heatpump)

### 1.30.0 (2023-04-12)
* update efficience calculation to support external sensor for return temperature
* when 3 state fields are empty then standard fields are used.
* when state field(s) are filled, than this state(s) are used - e.g. own sensor for return temp
* coorect error processing when no ems-esp devices found

### 1.29.0 (2023-03-08)
* update dependencies

### 1.28.0 (2023-03-08)
* update dependencies

### 1.27.0 (2023-03-08)
* update dependencies

### 1.26.0 (2023-02-27)
* error corrections due to changes since v1.21

### 1.25.0 (2023-02-26)
* set acknowledge to true when re-reading changed values from ems-esp

### 1.24.0 (2023-02-26)
* error corrections for version 1.22 and 1.23

### 1.23.0 (2023-02-26)
* correct ww states from v1.22

### 1.22.0 (2023-02-17)
* support multiple mixer devices

### 1.21.0 (2023-01-02)
* am200 from ems-esp adjustments to changed structure

### 1.20.0 (2022-12-29)
* am200 from ems-esp - redefine to heatSources/hsa for km200 structure mode

### 1.19.0 (2022-12-29)
* am200 - alternative heatsource adjustments

### 1.18.0 (2022-12-24)
* Statistics
* alternative heat souces (am200)

### 1.17.1 (2022-12-04)
* correct actualweight statistics within heatdemand function

### 1.17.0 (2022-12-02)
* add actual weight per thermostat in heatdemand object structure
* add heatdemand difference values

### 1.16.2 (2022-11-21)
* adjustments for ems-esp sensors v3.5

### 1.16.1 (2022-11-20)
* error correction sensors

### 1.16.0 (2022-11-20)
* ems-esp V2 NOT SUPPORTED ANYMORE !!!!
* pepare for enum as values and not just index
* new parameters for "Room" and "Function" for adapter states
* adjust for latest ems-esp dev version 3.5 
* units of measument for ems-esp sensors
* support name changes within ems-esp for sensors

### 1.15.0 (2022-06-06)
* adjustments for ems-esp RC310 holiday modes

### 1.14.0 (2022-05-18)
* split parameters for dallas & analog sensors
* improve warning messages if sensors are missing

### 1.13.0 (2022-05-17)
* add visibility attributes within ems-esp states
* error processing dallas / analog sensors of ems-esp

### 1.12.1 (2022-05-16)
* corrections for heatdemand function
* enable expert view
* vis views for syslog analysis in expert views

### 1.12.0 (2022-05-15)
* add analog sensors for ems-esp gateway, remove ems-esp settings

### 1.11.2 (2022-04-27)
* code optimization and error processing for ems-esp gateway

### 1.11.1 (2022-04-25)
* error corrections on invalid heatdemand states

### 1.11.0 (2022-04-24)
* corrections on hourly recordings for temperature
* make interpolation (missing of c-counts) in energy recordings configurable (on/off)
* error corrections on heatdemand with empty data

### 1.10.0 (2022-04-23)
* add heatdemand customization & calculation with automatic switch (on/off) per heating circuit 
* error corrections on efficiency calculation - make fields used configurable
* some other error corrections

### 1.9.0 (2022-04-18)
* beta test new version (github only)
* add heatdemand customization & calculation with automatic switch (on/off) per heating circuit

### 1.4.0 (2022-03-16)
* recordings new logic and now working without database instance as well

### 1.3.3 (2022-02-26)
* avoid null values in recordings

### 1.3.2 (2022-02-25)
* correction for recordings without reference object
* corrections for mySQL recordings

### 1.3.1 (2022-02-24)
* correction on temperature recordings (months and days)

### 1.3.0 (2022-02-23)
* new logic and state-structure for km200 recordings
* recordings stored in states [array of values] and within database
* please adjust adapter configuration
* support of Buderus heatpump with Logamatic HMC300 IP-Inside

### 1.2.1 (2022-02-18)
* adjust for js-controller v4 - part 2
* private password encryption by admin instead of own code (if necessary please re-enter pw)

### 1.2.0 (2022-02-18)
* Adjust for js-controller v4 - part 1
* private password encryption by admin instead of own code (if necessary please re-enter pw)

### 1.1.1 (2022-02-11)
* Improve tests on km200 ip-address and passwords

### 1.1.0 (2022-02-07)
* last tested version for old ems-esp ESP8266 with API V2.
* support for KM200 HRV (ventilation)
* corrections for km200 recordings and statistics module
* prepare for ems-esp firmware 3.4

## License
MIT License

Copyright (c) 2023 Thomas Petrick <tp1degit@gmail.com>

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
SOFTWARE."