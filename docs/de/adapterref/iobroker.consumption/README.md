---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.consumption/README.md
title: ioBroker.consumption
hash: IU3fuiA8q7+wtovCQhv0niK5RpmRWduO6XYklZ+qGVk=
---
![Logo](../../../en/adapterref/iobroker.consumption/admin/consumption.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.consumption.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.consumption.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/bluefox/iobroker.consumption.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/bluefox/ioBroker.consumption/badge.svg)
![NPM](https://nodei.co/npm/iobroker.consumption.png?downloads=true)

# IoBroker.Verbrauch
## Verbrauchsadapter für ioBroker
Berechnet den Verbrauch für definierte Sensoren und Ressourcen.

Sie können verschiedene Ressourcen, wie Wasser, Heizung, Strom definieren und eine Analyse darüber machen.

4 verschiedene Analysetypen sind implementiert:

- Plan - Ist-Verbrauch in €/$ in diesem Jahr im Vergleich zu Planwerten und im Vergleich zum Vorjahr.
- Donut - Vergleich zwischen Sensoren oder Ressourcen in Form eines Torten-/Donut-Diagramms
- Stack - Monatlicher Verbrauch jedes Sensors und jeder Ressource im Vergleich zu den Daten des Vorjahres in Form eines Stack-Balkendiagramms.
- Heatmap - Stündlicher Verbrauch in diesem Jahr für Ressourcen
- Tabelle - Monatlicher Verbrauch jedes Sensors und jeder Ressource im Vergleich zum Vorjahr in Form einer Tabelle

## Anforderungen
Der Adapter erfordert die Installation der my-SQL- oder Postgres-SQL-Datenbank und des ioBroker.sql-Adapters (wird automatisch installiert). Er sollte auch mit SQLite funktionieren, wird aber aus Leistungsgründen nicht empfohlen.

MS-SQL wird noch nicht unterstützt, könnte aber bei Bedarf einfach implementiert werden.

**Adapter ist noch Beta.**

**Die kostenlose Edition unterstützt nur 4 Sensoren und nur eine Station.** Um mehr Sensoren oder Stationen zu unterstützen, benötigen Sie eine gültige Lizenz. Fordern Sie es unter info@iobroker.com an.

## Verwendung
Sie haben Ressourcen (wie Wasser, Energie, Heizung, Gas usw.), Stationen (wie Haus, Datscha, Dorfvilla usw.) und Sensoren.

Sensor ist ein Zähler, der seinen Wert immer mehr erhöht, wie ein Stromzähler, der immer größer wird.

Sie müssen alle diese Sensoren zuerst auf definierte Ressourcen und dann auf Stationen verteilen.

**Eigentlich wird nur eine Station unterstützt!**

Danach können Sie Ihren Zeit- und Ressourcenverbrauch über Jahre hinweg analysieren.

Sie können das aktuelle Jahr mit dem Vorjahr vergleichen und eine Verbrauchsprognose erstellen.

Planen Sie über alle Kosten für das laufende Jahr.
![Prognose](../../../en/adapterref/iobroker.consumption/img/planAll.png)

Verteilung der Kosten nach Ressourcen.
![Prognose](../../../en/adapterref/iobroker.consumption/img/pieAll.png)

Verteilung des Verbrauchs durch Sensoren einer Ressource.
![Prognose](../../../en/adapterref/iobroker.consumption/img/pieHeating.png)

Verbrauchsverteilung nach Sensoren und Monaten einer Ressource.
![Prognose](../../../en/adapterref/iobroker.consumption/img/stackBarWater.png)

Heatmap des Verbrauchs einer Ressource für das laufende Jahr.
![Prognose](../../../en/adapterref/iobroker.consumption/img/heatmap.png)

Tabelle des Verbrauchs einer Ressource für das laufende Jahr für jeden Monat.
![Prognose](../../../en/adapterref/iobroker.consumption/img/tableHeating.png)

### Verdeckte Funktion
Die Sensordaten können umgerechnet werden, aber die Formel muss linear sein.
Sie können die Formel in Javascript schreiben, aber achten Sie darauf, dass das Ergebnis eine Zahl (float) sein muss.
Beispiele:

- Wh => kWh: `val / 1000`
- kWh => Wh: `val * 1000`
- °F => °C: `(Wert - 32) / 1,8`
- °C => °F: `Wert * 1,8 + 32`

## Echarts aktualisieren (nur für die Entwickler)
Gehen Sie zu https://echarts.apache.org/en/builder.html Wählen Sie:

- Diagramm: Balken, Linie, Torte, Heatmap,
- Koordinatensysteme: Gitter
- Komponente: Titel, Legende, Tooltip, MarkPoint, MarkArea, VisualMap, Toolbox
- Sonstiges: SVG-Renderer, Dienstprogramme, Codekomprimierung

## Machen
- Preis für jeden Sensor möglich
- Preise ändern:
  - alle Preise nach Ressourcen entfernen,
  - Kontrollkästchen bei jedem Sensor hinzufügen: eigener Preis
  - Station ausblenden=>Ressourcenpreis, wenn jeder Sensor einen eigenen Preis hat
  - direkt in Zustände schreiben und den Preis nicht im Objekt speichern

- Heatmap
  - Zeigen Sie nach Jahr an
- Diagramme

- Daten als PDF exportieren
- Mehr als eine Station.
- Stilauswahl nach Thema (Einheit, Start, Ende)

<!-- Platzhalter für die nächste Version (am Zeilenanfang):

### **IN ARBEIT** -->
## Zulässige Nutzung
Eine Lizenz gewährt das Recht, eine Installation der Software durchzuführen.
Jede weitere Installation der Software erfordert eine zusätzlich erworbene Lizenz.

## Changelog
### 0.7.0 (2023-02-08)
* (bluefox) Added offset and factor to sensors

### 0.6.7 (2023-02-06)
* (bluefox) Added new features to table

### 0.6.0 (2023-01-30)
* (bluefox) Activated ignoring of null values by SQL

### 0.5.0 (2022-11-15)
* (bluefox) Charts were corrected

### 0.4.20 (2022-09-30)
* (bluefox) GUI was improved

### 0.4.18 (2021-07-09)
* (bluefox) The warnings were corrected

### 0.4.17 (2021-01-16)
* (bluefox) Corrected the conversion of values

### 0.4.15 (2021-01-06)
* (bluefox) Corrected forecast calculation based on current second of the month
* (bluefox) Added convert function

### 0.4.14 (2021-01-05)
* (bluefox) Corrected price calculation

### 0.4.13 (2020-12-13)
* (bluefox) Updated the select ID dialog

### 0.4.12 (2020-12-12)
* (bluefox) Added stations editor

### 0.4.11 (2020-12-10)
* (bluefox) Corrected the widget errors

### 0.4.9 (2020-12-06)
* (bluefox) Corrected error with the pie chart

### 0.4.7 (2020-11-16)
* (bluefox) Implemented the combine by unit

### 0.4.3 (2020-09-11)
* (bluefox) Fixed the layout in firefox

### 0.4.1 (2020-06-13)
* (bluefox) Ignore nulls and zeros

### 0.3.4 (2020-06-05)
* (bluefox) Added possibility to define the station

### 0.3.2 (2020-05-29)
* (bluefox) Fixed the units for heat-map

### 0.3.0 (2020-05-18)
* (bluefox) Calculate plan only in euro

### 0.2.7 (2020-05-16)
* (bluefox) Set index for every sensor

### 0.1.6 (2020-05-03)
* (bluefox) Implement planning start from

### 0.1.4 (2020-05-03)
* (bluefox) Make widget compatible with older devices
* (bluefox) Added price for every sensor

### 0.1.2
* (bluefox) finished

### 0.0.2
* (bluefox) initial release

## License

Commercial license.

(c) Copyright 2020-2023 Bluefox <dogafox@gmail.com>, all rights reserved.

This license is a legal agreement between you and ioBroker GmbH (“ioBroker”) for the use of `ioBroker.consumption` adapter (the “Software”).
By downloading of `ioBroker.consumption` adapter you agree to be bound by the terms and conditions of this license.
ioBroker GmbH reserves the right to alter this agreement at any time, for any reason, without notice.