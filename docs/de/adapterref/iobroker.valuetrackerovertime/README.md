---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.valuetrackerovertime/README.md
title: ioBroker.valuetrackerovertime
hash: Gmb/MAAETiwqmKTdg31oR0OtbI4Zud7d2R0CgqvW300=
---
![Logo](../../../en/adapterref/iobroker.valuetrackerovertime/admin/ValueTrackerOverTime_Logo.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.valuetrackerovertime.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.valuetrackerovertime.svg)
![Anzahl der Installationen (neueste)](http://iobroker.live/badges/valuetrackerovertime-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/valuetrackerovertime-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/Omega236/iobroker.valuetrackerovertime.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/Omega236/ioBroker.valuetrackerovertime/badge.svg)
![NPM](https://nodei.co/npm/iobroker.valuetrackerovertime.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/Omega236/ioBroker.valuetrackerovertime/master.svg)

# IoBroker.valuetrackerovertime
[![Build-Status](https://travis-ci.com/Omega236/ioBroker.valuetrackerovertime.svg?branch=master)](https://travis-ci.com/Omega236/ioBroker.valuetrackerovertime)

## Valuetrackerovertime Adapter für ioBroker
Verfolgt alle Zahlen und ihre Erhöhung/Verringerung. Die Daten werden dann verwendet, um Statistiken über die Änderungsrate zu erstellen, die in Zeiten wie Stunden, Tagen, Wochen, Monaten, Quartalen und Jahren angezeigt werden. Die gesammelten Daten können verwendet werden, um z. B. den Stromverbrauch in Diagrammen zu visualisieren.

## Einstellungen
Einstellungen für den ValueTrackerOverTime werden an zwei Stellen vorgenommen. Die Standardeinstellungen werden in der Instanz des Adapters selbst vorgenommen, die Einstellungen für die einzelnen Datenpunkte werden in den Datenpunkten vorgenommen, die die zu verfolgenden Daten enthalten.

### Standardeinstellungen
![Parzelle](../../../en/adapterref/iobroker.valuetrackerovertime/admin/DefaultSettings.png) Dies sind die Standardeinstellungen, die abgefragt werden, wenn Sie ValueTrackerOverTime auf einem Datenpunkt aktivieren. Diese können für jeden Datenpunkt angepasst werden, aber die am häufigsten verwendeten Anfangswerte werden hier als Standardwerte eingestellt, sodass Sie später nicht zu viele Änderungen vornehmen müssen.

#### Detaillierte Geschichte
Im Abschnitt „Detaillierte Historie“ werden die zu erstellenden Datenpunkte ausgewählt. Wollen Sie die Daten für jeden sammeln

* Tag
* Woche
* Monat
* Quartal (Jahr)
* Jahr
* Unendlich (nie zurückgesetzt)

#### Aktuelle / frühere Daten
Im Abschnitt "Aktuelle / vorherige Daten" können Sie auswählen, wie lange Sie die gesammelten Daten für jeden ValueTrackerOverTime-Datenpunkt, der für jeden Zeitrahmen generiert wird, aufbewahren möchten.
Es ist sinnvoll, das Sammeln der Daten zu beenden, sobald sie in einem anderen Datenpunkt landen (z. B.: Nach 7 Tagen finden sich die Daten kumuliert in einer Woche. Nach 4 Wochen finden sich die Daten in einem Monat wieder...)

#### Zähler-Reset-Erkennung
Dieser Wert sollte immer aktiviert und auf eins gesetzt sein. Es hilft dem ValueTrackerOverTime, korrekte Messwerte zu machen, nachdem ein Wert im ursprünglichen Datenpunkt zurückgesetzt wurde.

### Datenpunkteinstellungen
![Parzelle](../../../en/adapterref/iobroker.valuetrackerovertime/admin/DatapointSettings.png) In dieser Einstellung müssen Sie ein Nema angeben, das als Datenpunktname für diesen Auswahlknoten verwendet wird. Zusätzlich müssen Sie die Einheit angeben, in der die Daten gesammelt werden sollen.
Wenn Sie also die Regenmenge messen möchten, können Sie die Einheit l/m² hinzufügen oder Sie möchten die Menge der verbrauchten Energie in Wattstunden (kWh) messen.
Falls der Datenpunkt selbst eine andere Einheit verwendet (z. B. Wh), können Sie hier einen Multiplikator hinzufügen (z. B. 60 oder 1/60), um die Daten in die erforderliche Einheit umzurechnen.

Die restlichen Einstellungen überschreiben die Standardeinstellungen, die in der Adapterinstanz festgelegt wurden.

## Datenpunkte
Abhängig von den ausgewählten zu erfassenden Zeitrahmen erstellt der Adapter für jeden Datenpunkt, den Sie verfolgen möchten, seine eigenen Datenpunkte.

Auf dem Bild sind drei Beispiele angegeben. Da der Screenshot am 3. Januar (Anfang Neujahr/Monat) aufgenommen wurde, entschuldigen Sie bitte, dass die Daten nicht so bunt und abwechslungsreich sind.

* Sie können sehen, dass es heute eine Regenmenge von 0,3 l/m² war, die sich die ganze Woche nicht geändert hat.
* Die Sonne hat in dieser Winterwoche überhaupt nicht geschienen (für meine Wetterstation bedeutet das, dass es an keinem Tag heller als 4.500lm wurde)
* Der Energieverbrauch zeigt Ihnen jedoch, dass der aktuelle Tag für den Computer auf 0,351 kWh, die Woche auf 1,909 kWh und das Jahr auf 1,393 kWh eingestellt ist (was daran liegt, dass heute Sonntag ist und die Woche bereits 7 Tage hat alt, aber es ist auch der 3. Januar, der das Jahr nur drei Tage alt macht).

## Changelog
### 1.0.1 (02.03.2023)
* (Omega236) add work setting
* (Omega236) remove Pre Admin 5 support
* (Omega236) add Translation
* (Omega236) update dependencies
* (Omega236) Git Actions instead of travis
### 1.0.0 (26.02.2023)
* (Omega236) Final version 1.0.0 with Infinite Counter
### 0.6.2 (30.01.2022)
* (Omega236) counterResetDetection was missing in customjson
### 0.6.1 (16.01.2022)
* (Omega236) basic Admin 5 support
### 0.6.0 (18.02.2021)
* (Omega236) add function to store history-Data to current-DP history"
### 0.5.4
* (Omega236) optimize RAM-Usage (Remove .toLocaleString)
### 0.5.3
* (Omega236) bugfix startvalue not used after SQL read out
### 0.5.2
* (Omega236) bugfix _getObjectAsync not worked
### 0.5.1
* (Omega236) optimizations, HistoryAnalyse extended and CurrentHistory added
### 0.4.1
* (Omega236) bugfix DetailedYear not saved, bugfix HistoryDetailed not used Multi
### 0.4.0
* (Omega236) HistoryAnalyseDetailed Added, Bugfix KW
### 0.3.5
* (Omega236) reset Detection optimize and bugfix only ack
### 0.3.4
* (Omega236) Check for duplicate Alias and reduce recalcs on start-value changed
### 0.3.3
* (Omega236) bugfix date object changed
### 0.3.2
* (Omega236) reemove selectID.js from index_m.html
### 0.3.1
* (Omega236) first public
### 0.0.1
* (Omega236) initial release

## License
MIT License

Copyright (c) 2023 Omega236 <general.of.omega@googlemail.com>

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