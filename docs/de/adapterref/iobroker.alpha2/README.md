---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.alpha2/README.md
title: ioBroker.alpha2
hash: EQcdPK8Xi7xiAGe4tLPcIjwUhP3XNmtD4AgfK8zLFSU=
---
![Logo](../../../en/adapterref/iobroker.alpha2/admin/mh-logo-schrift.png)

![Anzahl der Installationen](http://iobroker.live/badges/alpha2-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.alpha2.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.alpha2.svg)
![Travis-CI](https://travis-ci.org/Eisbaeeer/ioBroker.alpha2.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.alpha2.png?downloads=true)

# IoBroker.alpha2
Mit diesem Adapter können Sie Werte des Moehlenhoff Alpha2 Heizungsreglers abrufen und einstellen.
Der Adapter verwendet die XML-API des Alpha2. Wenn Sie mehr als einen Alpha2-Controller verwenden, müssen Sie eine zweite Instanz des Adapters installieren.

##Installation
- Installieren Sie den Adapter
- Geben Sie Ihre IP-Adresse oder den Hostnamen des Alpha2-Controllers ein
- Füllen Sie das Polling-Intervall aus, um Zustände zu erhalten

## Verwendungszweck
Sie können die folgenden Objekte ändern in:

- Für jeden HEIZBEREICH (max. 8 Bereiche)

| Beschreibung | Objekt | Werte |
|---------------------|-----------------|---------------------------|
| Zieltemperatur | T_ZIEL | Temperatur in Grad Celsius |
| Zieltemp. Tag | T_HEAT_DAY | Temperatur in Grad Celsius |
| Zieltemp. Nacht | T_HEAT_NIGHT | Temperatur in Grad Celsius |
| Modus von HeatArea | HEATAREA_MODE | 0=Auto, 1=Tag, 2=Nacht |
| Programm Wochentage | PROGRAM_WEEK | Programm-Nr. 0-3 |
| Programm Wochenende | PROGRAM_WEEKEND | Programm-Nr. 0-3 |

- Für jedes PROGRAMM mit max. 4 Schichten für jedes Programm.
- Minutenschritte sind 15. Nur erlaubt 00,15,30,45
- Stunden im 24 Stil

| Beschreibung | Objekt | Werte |
|---------------------|-----------------|-------------------------------|
| Startzeit | START | Uhrzeit des Programmstarts [hh:mm] |
| Endzeit | ENDE | Uhrzeit Programmende [hh:mm] |

- Für die Ferien

| Beschreibung | Objekt | Werte |
|-----------------------|---------------------|--------------------------|
| Urlaubsbeginn | URLAUB.START_DATE | [JJJJ-MM-TT] |
| Ende des Urlaubs | URLAUB.END_DATE | [JJJJ-MM-TT] |
| Temperatur im Urlaub | T_HEAT_VACATION | Temperatur in Grad Celsius |

- Alle anderen Objekte sind schreibgeschützt

## Beispiele
### Stellen Sie die Temperatur von Room1 . ein
Um die Solltemperatur einzustellen (gilt nur bis zum nächsten Programmstart oder -ende), setzen Sie das Objekt T_TARGET im entsprechenden Heatarea.
Der Adapter verwendet die XML-API, um den Wert in der Heatarea zu setzen.

### Urlaub einstellen
Um Urlaub zu setzen, achten Sie darauf, dass Sie die Urlaubssolltemperatur mit dem Objekt T_HEAT_VACATION definiert haben. Sie finden dieses Objekt in DEVICE.
Setzen Sie danach die beiden Objekte VACATION.START_DATE und VACATION.END_DATE. Wenn Sie die Urlaubseinstellungen deaktivieren möchten, setzen Sie beide Objekte mit Datum vor heute.
Sie können das Objekt VACATION.STATE überprüfen, um den Status zu überprüfen. Wenn der Status true anzeigt, ist der Urlaub aktiv.

## Bekannte Einschränkungen
- keine virtuellen Räume

## Changelog

### 1.0.3
. (Eisbaeeer)
Fixed error messages in log

### 1.0.2
- (oHa510)
Fixed an issue if you don't use all 4/8/12 heataras then heatareas could get assigned to wrong heatarea object in iobroker
Expanded Heatareas and Heatctrl to the maxiumum of 12
Changed Heatarea and Heatctrl indexing to 1-12 (old 0-11 was very confusing)
Added support for locking controllers (kids mode)
Added support for locking set temperature (hotel mode)
Added some new objects and infos like IODEVICEs etc.

### 1.0.1
- (Eisbaeeer)
Fixed issues

### 1.0.0
- (Eisbaeeer)
Fixed issue #6 (HEATAREA_NAME)

### 0.0.4
- (Eisbaeeer)   
Added refresh of states after setting states

### 0.0.3
- (Eisbaeeer)   
fixed issues #2

### 0.0.2
- (Eisbaeeer)   
fixed issues #1

### 0.0.1
- (Eisbaeeer) inital version of Alpha2

## License
The MIT License (MIT)
Copyright (c) 2021 Eisbaeeer eisbaeeer@gmail.com