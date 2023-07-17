---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.km200/README.md
title: Dieser Adapter ist veraltet und wird nicht weiterentwickelt
hash: Ddot5xcNC6sREnW6nGImZAmdi9FoTlYzZ74ir13C2YE=
---
# Dieser Adapter ist veraltet und wird nicht weiterentwickelt

![NPM-Version](http://img.shields.io/npm/v/iobroker.km200.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.km200.svg)
![Anzahl der Installationen](http://iobroker.live/badges/km200-installed.svg)
![Travis-CI](http://img.shields.io/travis/frankjoke/ioBroker.km200/master.svg)
![NPM](https://nodei.co/npm/iobroker.km200.png?downloads=true)

-----

Derzeit ist keine Weiterentwicklung dieses Adapters geplant. __Bitte migrieren Sie zum ioBroker.ems-esp-Adapter__, der beibehalten wird.
Wenn Sie Funktionen bei ioBroker.ems-esp vermissen, öffnen Sie ein Problem in diesem Repository (https://github.com/tp1de/ioBroker.ems-esp/issues).

ioBroker.km200 wird noch einige Zeit verfügbar bleiben, aber bedenken Sie, dass es nicht an Node 20 und den kommenden js-controller v5 angepasst wird.

-----

# IoBroker.km200
## Für Buderus KM50/KM100/KM200/KM300 & Junkers/Bosch MB LANi
![Logo](../../../en/adapterref/iobroker.km200/admin/km200.png)

[Deutsches Handbuch](README_DE.md)

Der Adapter unterstützt folgende Heizsysteme:

* Buderus mit den [Netzwerkadaptern](https://www.buderus.de/de/produkte/catalogue/alle-produkte/7719_gateway-logamatic-web-km200-km100-km50) KM50, KM100, KM200 und KM300
* Junkers mit dem [Netzwerkadapter](https://www.bosch-smarthome.com/de/mblani) MB LANi
* Bosch mit dem [Netzwerkadapter](https://www.bosch-smarthome.com/en/mblani) MB LANi

Für den Zugriff auf das System wird Code verwendet, der ursprünglich von Andreas Hahn entwickelt und in seinem Blog [Eintrag hier](https://www.andreashahn.info/2014/07/kernthema-am-eigenen-leibe) und [Eintrag dort](https://www.andreashahn.info/2014/08/easycontrol-pro-unter-der-lupe-oder-m) beschrieben wurde.

Die Steuerung der Heizung kann über die Buderus-Website ([https://www.buderus-connect.de]) oder über die „EasyControl“-App von Ihrem Mobiltelefon aus erfolgen. App und Buderus-Website funktionieren auch mit Junkers- und Bosch-Heizsystemen.

Dies ist nun in beide Richtungen gelungen und der Adapter ist bereits voll nutzbar.

Hierzu ist es notwendig, zunächst die App auf einem Mobiltelefon zu installieren und ein privates Passwort festzulegen.
Die App fragt nach dem Gerätepasswort und dem Anmeldenamen vom Gerät.

Der Adapter benötigt weiterhin die IP (bzw. den Netzwerknamen, zum Beispiel „BuderusKM200.fritz.box“) und die Portadresse (Port 80 am Gerät, wenn man diese aber über einen Router geändert hat ...).

Wenn Sie ein „!“ hinzufügen Am Ende der Adresse arbeitet der Adapter im Debug-Modus und liefert viele Informationen!

Da der Adapter die Daten vom System abfragen muss, müssen Sie ein Aktualisierungsintervall angeben.
Diese ist auf mindestens 5 Minuten eingestellt, da jedes Update eine separate Abfrage erfordert.

Mit der Black-/Push-Liste können Sie bestimmte Daten ein- oder ausblenden und die Anzahl der Zustände reduzieren.
Diese Liste besteht aus Strings ähnlich wie RegExp (in die sie vom Adapter umgewandelt werden) und anschließend werden die Dienste im Heater mit ihnen gefiltert.

Die Syntax ist, dass `+` ganz am Anfang bedeutet, dass dieses Feld nicht übersprungen werden sollte, auch wenn eine andere Regel es blockieren würde.
Ein `-` ist wie nichts und führt dazu, dass der berechnete Zustand blockiert wird.
Jede Übereinstimmung wird durch `,` getrennt und kann `/` oder `^` für den Anfang, `*`die mit allem übereinstimmen, und `Die Syntax ist, dass `+` ganz am Anfang bedeutet, dass dieses Feld nicht übersprungen werden sollte, auch wenn eine andere Regel es blockieren würde.
Ein `-` ist wie nichts und führt dazu, dass der berechnete Zustand blockiert wird.
Jede Übereinstimmung wird durch `,` getrennt und kann `/` oder `^` für den Anfang, `*`die mit allem übereinstimmen, und  am Ende enthalten, um mit dem Ende übereinzustimmen.

Bei den Zeichenfolgen muss die Groß-/Kleinschreibung beachtet werden. Wenn Sie wissen möchten, welche Zustände gefunden werden, schalten Sie den Debug-Modus ein und entfernen Sie alle Blockierungen. Dann sehen Sie alle erstellten Zustände und können einige nicht benötigte Daten mit der Blockierungsliste blockieren.
Beispiele: Mit `+*temp*` können Sie alles einblenden, was „temp“ enthält und mit `_HourlyBei den Zeichenfolgen muss die Groß-/Kleinschreibung beachtet werden. Wenn Sie wissen möchten, welche Zustände gefunden werden, schalten Sie den Debug-Modus ein und entfernen Sie alle Blockierungen. Dann sehen Sie alle erstellten Zustände und können einige nicht benötigte Daten mit der Blockierungsliste blockieren.
Beispiele: Mit `+*temp*` können Sie alles einblenden, was „temp“ enthält und mit  können Sie alles blockieren, was „_Hourly“ am Ende hat. Beides zusammen blockiert alle _Hourly am Ende, die nicht enthalten sind temp in ihrem Namen.

Eine Beispielliste sieht wie `/gateway*, /recordings*,*SwitchPrograms*,/HeatSource*, *HolidayModes*` aus und verbirgt etwa 90 von ~ 180 Datensätzen.

Es sind jetzt zwei weitere Zeitpläne verfügbar: der schnelle (für Staaten, die schneller als alle 30 Minuten abgefragt werden) und der langsame für Staaten, die in Stunden- oder Mehrstundenzyklen abgefragt werden.

Auf diese Weise können Sie einige Informationen wie Temperaturen in 1-5-Minuten-Zyklen und andere Elemente in normalen 20-Minuten-Zyklen verfolgen. Diejenigen, die sich normalerweise nicht einmal innerhalb einer Stunde ändern (wie _Daily$ oder _Monthly$ und mehrere andere allgemeine Daten), müssen nicht einmal alle 30 Minuten gelesen werden, da sie sich nicht ändern. Diese Strategie hilft dabei, schnellere Messwerte für wichtige Daten und langsamere Messwerte für weniger wichtige Daten zu erhalten.

Bei den zu erfassenden Daten handelt es sich um (kleine) Verlaufsdaten innerhalb der Heizungsanlage. Es stehen 3 verschiedene zur Verfügung: _Hourly, _Daily und Monthly.
Stündlich deckt normalerweise die letzten 48 Stunden ab. _Täglich in den letzten 2 Monaten und Monatlich nicht länger als ein Jahr, jeweils ab dem aktuellen Zeitpunkt der Auslesung. Einige Datenpunkte zeigen weniger Datenpunkte an.
Sie müssen verstehen, dass der Adapter für jeden aufgezeichneten Datenpunkt die Daten von 3 einzelnen Anrufen sammelt.

`switchPrograms` kann jetzt auch gelesen und geschrieben werden, es ist ein JSON-String, der ein Array von Wochentagen widerspiegelt. Bitte ändern Sie beim Hochladen nicht das Format, sondern nur die Zahlen. Es scheint, dass es sich bei den Zahlen um Minuten handelt, die nur in 15-Minuten-Schritten eingestellt werden können.

Seit V 1.1.2 können die Klammern und Kommas weggelassen werden und die geblockten/gepushten Werte können nur noch mit Komma geschrieben werden.

### Wichtig, wenn km200 von Version 1.1 aktualisiert wird.*
Wenn Sie den 64-stelligen Zugangsschlüssel eingegeben haben, benötigen Sie das Passwort nicht, es sollte aber nicht leer bleiben, sondern einfach etwas eingeben.

## Wichtig
* Adapter erfordert Knoten >= v16.*.*

## Machen
* Zusätzliche Sprachunterstützung und Textübersetzung

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.0.5 (2023-07-09)
* (McM1957) Missing dependy to iobroker/adapter-core has been added
* (McM1957) Eslint has been activated and required adaptions to code have been done.
* (McM1957) dependencies have been updated

### 2.0.4
* fixed issue with js-controller version 5

### 2.0.3

* Adapter config update
* Blacklist is working now for any combination
* Added option not to delete unsused states

### 1.9.9

* Beta for v2.0.0
* Implemented recordings for hourly, daily and monthly data
* Changed readout for 'mins' units to enable these fields for read/write
* Implemented 2 additional time schedule where you can define fast cycle (1-30 minutes), normal with 30-60 minutes and slow with 1-24 hours. You define the lists whjich go to fast or slow in a similar way than the blocklist.
* Blocklist syntax changed sligly. `/` or `^` first is for from beginning, `*` can now be everywhere and `$` can be the end
* `switchPrograms` are supported now for read and write!

### 1.2.4

* Beta for next version, recordings supported

### 1.2.3 
* Implemented a correction to show also switchPrograms

### 1.2.2
* Adapter works also only with accesskey iin old 64 digit hex format without private passwort.

### 1.2.1 
* Adapter supports now compact mopde
* Adapter uses other module and removes need for mcrypt which makes it working on all platforms
* Adapter can now have debug mode set via '!' at end of address
* Adapter needs node >=v6

### 1.2.0
* Integrating Schupu's changes and also make the adapter ready for compact mode
* Update of adapter should continue to work with old settings

### 1.1.7
* (Schmupu) Supports Admin3
* (Schmupu) Only device password and own password needed. You do not have to get the access code anymore.

### 1.1.6
Adapter communication and retries more often to catch more errors.
* Writes are also retried
Added blocklist text in config screen

### 1.1.2
* Adapter handles better communication and retries if he got an error.
* you can set debug-mode by adding 'debug!' in front of host.
* Host port is not required and can be added to hostname with: xxx at end.
* Simpler blocklist handling, which does not ask for device which services are blocked

### 0.4.3
* Renamed repository to ioBroker.km200

### 0.4.3
Cleaning of objects / states for current adapters instance which are not part of scanned services anymore.

### 0.4.2
* Some small bug fixes and added some debug logs. Removed so dependency of 'request' and 'async' modules.

### 0.4.1
  Have only 'request' and 'async' with --save now also registered in the package.json ... Remember: Nuícht --save forget :(!

### 0.4.0
  Strings with allowedValues ​​are now converted to ioBroker states in both directions (read & write)

### 0.3.0
  Setting variables with numbers or strings now works.
  Thus, e.g. Target temperatures are changed.
  TODO: Enums and set tables

### 0.2.0
  Adapter now works with blacklist and in read-only mode.
  TODO: Implement setting values ​​in the heating system
  TODO: Implement variables with ENUMS (value lists)

### 0.1.0
  First test

## License
The MIT License (MIT)

Copyright (c) 2023 iobroker-community-adapters
Includes code copyright (c) 2016-2019 Frank Joke (frankjoke@hotmail.com)
Includes communications and crypto routines copyright (c) 2014 Andreas Hahn km200@andreashahn.info

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.