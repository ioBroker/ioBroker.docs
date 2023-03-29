---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ems-esp/README.md
title: ioBroker.ems-esp
hash: Ft42eUkODbXzui6lWz8gv5B+qZ4u1CNzC9GfXTBVTaw=
---
![Logo](../../../en/adapterref/iobroker.ems-esp/admin/ems-esp.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.ems-esp.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ems-esp.svg)
![Anzahl der Installationen (neueste)](https://iobroker.live/badges/ems-esp-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/ems-esp-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/tp1de/iobroker.ems-esp.svg)
![NPM](https://nodei.co/npm/iobroker.ems-esp.png?downloads=true)

# IoBroker.ems-esp
**Tests:** ![Testen und freigeben](https://github.com/tp1de/ioBroker.ems-esp/workflows/Test%20and%20Release/badge.svg)

## Bosch / Buderus Heizsysteme mit km200 / IP-Inside und/oder ems-esp Schnittstelle
Der Adapter unterstützt eine Schnittstelle zu den Heizsystemen der Bosch-Gruppe mit EMS- oder EMS+-Bus.
(Buderus/Junkers/Netfit usw.).

## Es kann über Web-API-Aufrufe mit dem Heizsystem verbunden werden:
* km200, km200 hrv, km100, km50, HMC300 oder IP-inside (von Bosch Group)
* ems-esp-Schnittstelle (https://github.com/emsesp/EMS-ESP32) mit aktueller Dev-Version (siehe unten) und dem ESP32-Chip.

* Das alte ESP8266 Gateway mit API V2 wird NICHT MEHR UNTERSTÜTZT !!

Der ems-esp Adapter kann Daten zu beiden Gateways lesen und schreiben, um alle Heizungskomponenten zu steuern.
Es kann entweder für die Original-Gateways der Bosch-Gruppe oder das ems-esp oder beide parallel verwendet werden.

Der Adapter ist für das ems-esp Gateway mit neusten Firmware-Versionen von ESP32 >= v3.4.0 getestet.

## Wichtige Einstellungen im EMS-ESP:
* Formatierungsoptionen für das boolesche Format müssen 1/0 und für das Enum-Format Wert / Zahl sein.
* Die Einstellungen zum Aktivieren von API-Schreibbefehlen in ems-esp müssen aktiviert sein
* Die Autorisierung des Zugriffstokens auf API-Aufrufe umgehen muss festgelegt oder das Token muss eingegeben werden.

Bei Auswahl des Kontrollkästchens wird entweder die km200-ähnliche Gerätestruktur für ems-ESP-Datenfelder verwendet oder die ursprüngliche EMS-ESP-Geräteansicht beibehalten: Boiler, Thermostat, Mischer usw. Bei paralleler Verwendung des km200-Gateways wird empfohlen, die km200-Daten zu verwenden Struktur. Dann befinden sich alle Entitäten / Zustände innerhalb der Objektstruktur von ioBroker an derselben Stelle.

## Abfrage
Dieser Adapter liest nach Startwerten von ems-esp und km200 per HTTP-Get-Requests und ist in der Lage, Zustandsänderungen zu abonnieren und die entsprechenden http (post)-Befehle entweder an die ems-esp-Hardware oder das km200-Gateway zurückzusenden.

* EMS-ESP Read Polling ist ein Parameter (Standard 60 Sekunden) und kann nicht unter 15 Sekunden eingestellt werden.
* KM200 Polling ist ebenfalls ein Parameter (Standard 300 Sekunden) und der minimal einstellbare Wert beträgt 90 Sekunden.
* km200-Aufzeichnungen (Energieverbrauchs- und Temperaturstatistiken) werden stündlich aktualisiert

## Km200
Die Web-API-Aufrufe zum/vom km200-Gateway sind verschlüsselt. Für die Ver-/Entschlüsselung werden zwei Passwörter benötigt:

* das Gateway-Passwort auf einem Etikett am Gateway in der Form: xxxx-xxxx-xxxx-xxxx (Groß-/Kleinschreibung beachten)
* das private Passwort, das mit der Buderus **MyDevice** App festgelegt wurde (verwenden Sie nicht myBuderus oder ähnliche Apps!)

Die zu verwendenden Felder können durch Abfragen der km200-Struktur (*) oder der entsprechenden csv-Datei innerhalb der Parameter der Adapterinstanz definiert werden.

Beim 1. Adapterstart wird empfohlen alle km200 Datenfelder mit einem "*" auszuwählen.
Der Adapter erstellt dann eine km200.csv-Datei im Verzeichnis ../iobroker-data/ems-esp/{instance}.

Diese Datei kann beim nächsten Start der Adapter-Instanz verwendet werden.
Nicht benötigte Zeilen (Felder) können gelöscht werden, um die Anzahl der auszulesenden km200-Felder zu reduzieren. (Kopie erstellen und Datei umbenennen)

## Km200 Aufzeichnungen (Energie- und Temperaturstatistik)
Die meisten modernen Heizsysteme verfügen über ein IP-Inside-Gateway und unterstützen Energiestatistiken:

* Aufzeichnung von Stromverbrauch und Temperaturstatistik
* Für diese Systeme und wo diese Aufzeichnungsdaten verfügbar sind, werden die jeweiligen Statistiken abgefragt und in Zuständen gespeichert.

Verfügbar sind stündliche, tägliche und monatliche Statistiken und gespeichert als Array-Daten in Zuständen und wenn eine db-Instanz ausgewählt ist, auch in Zuständen, die mit db-Einträgen gefüllt sind. (Zustandsnamen beginnen mit "_")

* Die Checkbox Aufzeichnungen muss aktiviert und die Datenbankinstanz (mySQL oder InfluxDB) definiert sein. SQL oder InfluxDB History Adapter müssen installiert und aktiv sein, um diese Option zu verwenden.
* Die von Web-API-Aufrufen gelesenen Originalaufzeichnungsdaten werden unter der Statusstruktur km200 gespeichert.
* DB-Statistiken, die in Flot-Graphen oder Grafana angezeigt werden sollen, sind bisher nur für mySQL- und InfluxDB-Datenbanken verfügbar.
* Für InfluxDB V1 muss die Aufbewahrungsrichtlinie auf mindestens 170 Wochen eingestellt werden. (Änderung der Aufbewahrungsrichtlinie global auf iobroker-Dauer 170w;)
* Für InfluxDB V2 wird die globale Aufbewahrungsrichtlinie vom influxdb-Adapter festgelegt - bitte stellen Sie innerhalb des influxdb-Adapters die Aufbewahrungszeit des Speichers auf "kein automatisches Löschen" !

Dieser Adapter erstellt dann die jeweiligen Aufzeichnungszustände, aktiviert SQL-Statistiken und schreibt historische Datenbankeinträge mithilfe von SQL-Befehlen und aktualisiert die Aufzeichnungen. Die Aktualisierungshäufigkeit ist stündlich.

WICHTIG: SEIEN SIE BITTE NICHT REIZT, WENN DIE JEWEILIGEN STAATEN WERTE NULL() ZEIGEN.
IN EINIGEN FÄLLEN WERDEN DIE WERTE IM ADMIN-OBJEKTBROWSER NICHT KORREKT ANGEZEIGT - BITTE FLOT ODER GRAFANA ZUR ANZEIGE VERWENDEN !!!

## Km200 Aufnahmen - eine Erklärung
Einige Feldwerte sind als „aufzeichnungsfähig“ festgelegt. Diese Felder haben dann "Aufnahmen".
Je nach Art der Heizungsanlage werden diese Aufzeichnungen unter Aufzeichnungen/... oder EnergieMonitoring/... gespeichert.

Für aufgezeichnete Zustände wird jede Minute eine Probe innerhalb des km200-Gateways gesammelt.
Ein stündlicher Wert sollte 60 Samples haben, ein täglicher 24*60=1440 Samples, ein monatlicher 1440 x #Tage.
Jeder Zeitraum muss innerhalb des Adapters durch 3 API-Aufrufe gelesen werden:

* Stundenwerte: heute, gestern, vorgestern
* Tageswerte: aktueller Monat, letzte Monate, Monat -2
* Monatswerte: aktuelles Jahr, letztes Jahr, Jahr -2

Innerhalb des von Web-API gelesenen Datenfeldes wird die Summe der Abtastwerte im y-Wert gespeichert, die Anzahl der Abtastwerte im c-Wert.
(siehe Originalwerte in json-data in km200... Feldern.)

Da manchmal Samples fehlen, können die Energiewerte interpoliert werden. Interpolation ist konfigurierbar (ein/aus).
Für einige Monate (vor > 12 Monaten) könnten einige Daten fehlen. (Bosch-Fehler im Code?)

Für den tatsächlichen Energieverbrauch der Monate berechnet der Adapter die Summe der Tageswerte und verwendet diese Summe, um genauere Daten zu erhalten.

## Statistiken
Kesselstatistiken können aktiviert werden und zeigen:

* Die Abfragezyklus-Verarbeitungszeit für ems-esp- und/oder km200-Gateway-Lesevorgänge und Zustandsverarbeitung
* Die Anzahl der Kessel- und Warmwasserstarts pro Stunde / 24 Stunden
* Kesselauslastung pro Stunde (0-100%).
* Zur Berechnung der Statistik wird eine aktive Datenbankinstanz (siehe oben) benötigt.

## Kesseleffizienz
Der Kesselwirkungsgrad kann berechnet werden, wenn die Parameter ausgefüllt sind. (nur Gas- und Ölkessel)

* Die Kesseleffizienz kann basierend auf der durchschnittlichen Kesseltemperatur berechnet werden: (Kesseltemperatur + Rücklauftemperatur) / 2.
* Wenn die Rücklauftemperatur in km200/ems-esp nicht verfügbar ist, macht die Wirkungsgradberechnung keinen Sinn - bitte deaktivieren, um Fehler zu vermeiden
* Sehen Sie im Datenblatt Ihres Heizkessels nach, um die Effizienztabelle entsprechend anzupassen.
* Bei manchen Heizungsanlagen führt diese Funktion zu Fehlern - bitte ausschalten !!!
* geänderte Logik mit Release >= v1.30.0

## Veränderungen in der Staatsstruktur
Immer wenn eine neue EMS-ESP-Firmware neue Datenfelder hinzufügt und/oder Datenfeldnamen ändert, werden sie während des Adapterlaufs verarbeitet. Trotzdem werden veraltete Datenfelder nicht automatisch vom Adapter gelöscht.
Es besteht die Möglichkeit, die Zustandsstruktur neu aufzubauen, indem Zustände beim Neustart des Adapters gelöscht werden (Zustände mit History / db-Einträgen bleiben erhalten)

## Wärmebedarfssteuerung
Erklärung zur Berechnung und Konfiguration des Wärmebedarfs. Nur in deutscher Sprache verfügbar: https://github.com/tp1de/ioBroker.ems-esp/wiki

# Iobroker.ems-esp

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* update efficience calculation to support external sensor for return temperature
* when 3 state fields are empty then standard fields are used.
* when state field(s) are filled, than this state(s) are used - e.g. own sensor for return temp

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