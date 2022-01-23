---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ems-esp/README.md
title: ioBroker.ems-esp
hash: rgPI1sU1Ydkcmbz7XtzBdf/YB9FcW6gXpXfv2Xws9Hw=
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

## Ems-esp-Adapter für ioBroker
Der Adapter unterstützt die Heizsysteme der Bosch-Gruppe (Buderus / Junkers / Netfit usw.), wie sie vom iobroker km200-Adapter und der ems-esp-Schnittstelle (https://github.com/emsesp/EMS-ESP32) mit der neuesten Dev-Version ( siehe unten) und der ESP32-Chip. Die alten ESP8266-Gateways werden jetzt ebenfalls unterstützt.

Der ems-esp Adapter kann Daten vom km200 Gateway und/oder der ems-esp Hardware lesen und schreiben.
Es kann für die originalen Gateways der Bosch-Gruppe oder das ems-esp oder beide parallel verwendet werden, wenn ein IP-Gateway wie km200 / ip inside verfügbar ist.

Der ems-esp Adapter liest Werte aus dem Hardware EMS-Bus mit installierter ems-esp Hardware und der Adapter nutzt die REST API V3 Schnittstelle. Die Einstellungen zum Aktivieren von API-Schreibbefehlen in ems-esp müssen zum Schreiben von Werten aktiviert werden.

Der Adapter wurde mit den neuesten Versionen von ESP32 >= v3.3.0 getestet.
API V2 (ESP 8266) wird offiziell nicht mehr unterstützt, funktioniert aber möglicherweise noch.

WICHTIGE EINSTELLUNGEN im EMS-ESP:

*** API V2: MQTT-Einstellungen müssen im booleschen Format 1/0 sein! *** *** API V3: Formatierungsoptionen für das boolesche Format muss 1/0 und für das Enum-Format Zahl sein ***

Bei Auswahl des Kontrollkästchens wird entweder die km200-ähnliche Gerätestruktur für ems-ESP-Datenfelder verwendet oder die ursprüngliche EMS-ESP-Geräteansicht beibehalten: Boiler, Thermostat, Mischer usw. Bei paralleler Verwendung des km200-Gateways wird empfohlen, die km200-Daten zu verwenden Struktur. Dann befinden sich alle Datenfelder (Zustände) innerhalb der Objektstruktur von ioBroker an derselben Stelle.

Im Gegensatz zum km200-Adapter konnten die zu verwendenden Felder durch die jeweilige csv-Datei innerhalb der Adapterinstanzparameter definiert werden. Für den ersten Adapterstart wird empfohlen, ein "*" zu verwenden, also alle km200-Datenfelder auszuwählen.
Der Adapter erstellt dann eine km200.csv-Datei im Verzeichnis ../iobroker-data/ems-esp. Diese Datei kann beim nächsten Start der Adapter-Instanz verwendet werden.
Nicht benötigte Zeilen (Felder) können gelöscht werden, um die Anzahl der auszulesenden km200-Felder zu reduzieren. (Eine Kopie machen)

Dieser Adapter liest nach Startwerten von ems-esp und km200 per HTTP-Get-Requests und ist in der Lage, Zustandsänderungen zu abonnieren und die entsprechenden http (post)-Befehle entweder an die ems-esp-Hardware oder das km200-Gateway zurückzusenden.

EMS-ESP Read Polling ist jetzt ein Parameter (Standard 60 Sekunden) und kann nicht unter 15 Sekunden eingestellt werden.
KM200 Polling ist ebenfalls ein Parameter (Standard 300 Sekunden) und der minimal einstellbare Wert beträgt 90 Sekunden.

Die meisten modernen Heizungssysteme verfügen über ein IP-Inside-Gateway und unterstützen Energiestatistiken (Erfassung für Gesamtstromverbrauch und Warmwasser (BW)).
Für diese Systeme und wo diese Daten verfügbar sind, können die Stromverbrauchsstatistiken für Gesamt- und Warmwasserverbrauch ausgelesen werden (stündlich / täglich / monatlich).

Die Checkbox Aufzeichnungen muss aktiviert und die Datenbankinstanz (mySQL oder InfluxDB) definiert werden.
SQL oder InfluxDB History Adapter müssen installiert und aktiv sein, um diese Option zu verwenden.

*** Dies ist bisher nur für mySQL- und InfluxDB-Datenbanken getestet *** *** Für InfluxDB < V2 muss die Aufbewahrungsrichtlinie auf mindestens 170 Wochen eingestellt werden *** (Änderung der Aufbewahrungsrichtlinie global auf iobroker-Dauer 170 W;)

Dieser Adapter erstellt dann die jeweiligen Aufzeichnungszustände, aktiviert SQL-Statistiken und schreibt historische Datenbankeinträge mithilfe von SQL-Befehlen und aktualisiert die Aufzeichnungen. Die Aktualisierungshäufigkeit ist stündlich. Die Werte können dann z.B. den Flot Charts-Adapter oder Grafana.

Seit v0.9.0 gibt es Statistikzustände innerhalb der Objekte. Die Abfragezyklus-Verarbeitungszeit für ems-esp- und/oder km200-Gateway-Lesevorgänge und Zustandsverarbeitung werden angezeigt. Zusätzlich stehen die Anzahl der Kesselstarts pro Stunde / 24 Stunden und die Kesselauslastung pro Stunde (0-100%) zur Verfügung.

Wenn Werte eingetragen sind, kann der Kesselwirkungsgrad anhand der durchschnittlichen Kesseltemperatur berechnet werden: (Kesseltemperatur + Rücklauftemperatur) / 2.
Da die Rücklauftemperatur in km200 nicht mehr verfügbar ist, wird die Rücklauftemperatur mit Kesseltemperatur -10 °C berechnet, wenn kein ems-esp verfügbar ist.
Sehen Sie im Datenblatt Ihres Heizkessels nach, um die Effizienztabelle entsprechend anzupassen.
Zur Berechnung der Statistik wird eine Datenbankinstanz (siehe oben) benötigt.

Wann immer eine neue EMS-ESP-Firmware neue Datenfelder hinzufügt und/oder Datenfeldnamen ändert, werden sie während des Adapterlaufs verarbeitet.
Trotzdem werden veraltete Datenfelder nicht automatisch vom Adapter gelöscht.
Es besteht die Möglichkeit, die Zustandsstruktur neu aufzubauen, indem Zustände beim Neustart des Adapters gelöscht werden (Zustände mit Historie / db-Einträgen bleiben erhalten)

# Iobroker.ems-esp"

## Changelog
### 1.0.6 (2022-01-21) 
Adjustments for non-UTF-8 json data from ems-esp
Recalculate km200 recordings based on actual no of samples vs. theroretical max. samples

### 1.0.5
* first stable version for ioBroker repository

### 1.0.4
* Prepare for ioBroker repository

### 1.0.3
* Corrections within statistics module

### 1.0.2
* Corrections on km200 energy consumptions

### 1.0.1 
* prepare for compact-mode, re-write code

### 0.9.8 and 0.9.9
* Supporting Dallas Sensors on ems-esp gateway

### 0.9.7
* Fixes for IP-adresses

### 0.9.6
* Corrections for writing switchpoints and array-data back to km200

### 0.9.5
* Corrections for different enum-formats in API V3 (text and numbers)

### 0.9.4
* Support for old ESP8266 EMS-ESP gateways and API V2 and new ESP32 with API V3

### 0.9.3
* Polling time for EMS-ESP and KM200 is now a parameter

### 0.9.2
* Adjust for enum formats

### 0.9.1
* Adjust for different boolean formats

### 0.9.0
* Rework Adapter for some statistics and prepare for heating control (under development)

### 0.8.0
* REST API V3 and js-controller v3.3.x and support of influxdb for recordings

## License
MIT License

Copyright (c) 2022 Thomas Petrick <tp1degit@gmail.com>

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