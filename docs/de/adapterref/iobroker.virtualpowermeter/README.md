---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.virtualpowermeter/README.md
title: kein Titel
hash: KH0Fcr8Pz61VALzsni5tsQM/Es0+rXk1Ztr0VKSQiQ4=
---
![Knoten](https://img.shields.io/node/v/iobroker.virtualpowermeter.svg)
![Anzahl der Installationen](http://iobroker.live/badges/virtualpowermeter-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.virtualpowermeter.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.virtualpowermeter.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/Omega236/iobroker.virtualpowermeter.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/Omega236/ioBroker.virtualpowermeter/badge.svg)
![NPM](https://nodei.co/npm/iobroker.virtualpowermeter.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/Omega236/ioBroker.virtualpowermeter/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Omega236/ioBroker.virtualpowermeter?branch=master&svg=true)
![Lizenz](https://img.shields.io/npm/l/iobroker.virtualpowermeter.svg)

<h1><img src="admin/virtualpowermeter.png" width="64"/>ioBroker.virtualpowermeter</h1>

## Virtualpowermeter-Adapter für ioBroker
Erzeugt Virtuelle Strommesser

Im Smarthome hat man viele Geräte sterben man zwar schalten kann, diese aber keinen integrierten Powermeter haben (meist Lichter).

Mit diesem Adapter ist das Ziel zu jedem eingestelltem Datenpunkt (über Custom -> MaxWatt (z.B. 60W)) zwei zusätzliche Datenpunkte zu befüllen -> Energy_Power (z.B. 60 W) und Energy_Total (z.B. 2501,23 Wh).
Zusätzlich Werden Gruppen gebildet (diese Werden unter virtualpowermeter.0.xxx abgelegt) sterben sterben summe der einzelnen Datenpunkte darstellt

Mit diesen neuen Datenpunkten kann dann eine einfache Visualisierung durchgeführt werden.

Die neuen Datenpunkte (besonders die Gruppen) könnten super mit valuetrackerovertime weiterverarbeitet werden

## Instanzeinstellungen
![Instanzeinstellungen](../../../en/adapterref/iobroker.virtualpowermeter/admin/InstanceSettings.PNG)

Hier kann der Default-Name für das Power und Energy_Total definiert werden.

Die Einstellung default setting: Datapoint Destination bestimmt die default Einstellung beim Erstellen eines neuen Custom-Settings. Bei "in the state folder" wird bei new Custom-Settings die Standardnamen für Power und Energie genutzt. Bei "in group" wird als Standardname die ObjectID des Custom-DP (. durch _ ersetzt) als Unterverzeichnis + der Standardname für Power und Energie genutz. "anywhere else" nutzt ebenfalls den Standardnamen für Power und Energy muss aber für jeden Custom-DP manuell angepasst werden.

## Benutzerdefinierte Einstellungen
![Beispiel](../../../en/adapterref/iobroker.virtualpowermeter/admin/DatapointSample.PNG) Die Aktivierung eines Custom-Settings aktiviert 2 Datenpunkte. Power -> Watt, Energy(_Total) -> Wh Der Speicherort setzt sich aus dem Datapoint Destination + Datapointname zusammen.

Wichtig: If Destination "in Group" bzw. wenn mehere DP im gleichen Verzeichnis "in current state tree" braucht jeder Datenpunkt seinen eindeutigen Namen. wenn default-Destination "in Group" wird der Datenpunktname automatisch mit der ID des States ergänzt (. durch _ ersetzt). Hier kann aber Auch z.B. Wohnzimmer_Licht.Power und Wohnzimmer_Licht.Energy angegeben werden.

## Custom Settings für Geräte die nur Power Angabe (Watt) und man die Wh umfassen will
Es gibt Geräte, die nur eine Wattausgabe haben und man aber weiß, wieviel Strom verbraucht wurde. Dazu kann auch der VirtualPowermeter verwendet werden. Dafür muss nur der Max-Wert vom Datenpunkt und der Max-Power vom VirtualPowermeter gleich sein. Beispiel:<img src="BeispielPowerToEnergy.png">

Beispiel mit valuetrackerovertime: ![Beispiel](../../../en/adapterref/iobroker.virtualpowermeter/MeinBeispiel2.jpg)

<!-- Platzhalter für die nächste Version (am Zeilenanfang):

### __LAUFENDE ARBEIT__ -->

## Changelog
### 1.4.3 (2021-05-27)
* (bluefox) added support for admin5

### 1.4.1 (2021-02-13)
* (Omega236) on unit '%' interpret common.max as 100 if common.max not set

### 1.4.0 (2021-02-12)
* (Omega236) adding OptionalSwitch for Dimmer with On/Off State

### 1.3.2 (2021-01-27)
* (Omega236) group total is now its own counter
* (Omega236) improved precision

### 1.3.1 (2021-01-25)
* (Omega236) reduce initializations and optimize group handling

### 1.3.0 (2021-01-15)
* (scrounger) default ids for power and energie configurable through adapter settings
* (scrounger) custom: autocomplete for group input added
* (scrounger) option added -> group energy values can only increase 
* (Omega236) Check duplicate Destination DP
* (Omega236) allows to Set Destination of DP

### 1.2.2 (2020-12-26
* (Omega236) Group Calculations only after InitialFinished

### 1.2.1 (2020-04-15)
* (Omega236) translation

### 1.2.0 (2020-04-15)
* (Omega236) js-controller 3.x support

### 1.1.1 (2020-04-07)
* (Omega236) bugfix translation

### 1.1.0 (2020-04-05)
* (Omega236) inverted added

### 1.0.1
* (Omega236) SecurityUpdates

### 1.0.0
* (Omega236) Final Release

### 0.2.8
* (Omega236) Bug found on travis unsubscribeStatesAsync

### 0.2.6
* (Omega236) texts adapted

### 0.2.5
* (Omega236) awaits missing

### 0.2.4
* (Omega236) var remove and SettingPage Info and dic in class and .bind(this) (Template 1.10)

### 0.2.3
* (Omega236) CodeOptimierung nach eslint

### 0.2.1
* (Omega236) CodeOptimierung und bild

### 0.2.0
* (Omega236) Alle Funktionen implementiert, code noch nicht überprüft/optimiert/getestet

### 0.1.0
* (Omega236) Erste Version mit Grundfunktionalität

### 0.0.1
* (Omega236) initial release

## License
MIT License

Copyright (c) 2021 Omega236 general.of.omega@googlemail.com

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