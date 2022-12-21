---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.jeelink/README.md
title: ioBroker.jeelink
hash: b4G41zaqVIxZxuG/kePTos+2oSEKN60Tfxc7ktLC4Zc=
---
![Logo](../../../en/adapterref/iobroker.jeelink/admin/jeelab_logo.png)

![Anzahl der Installationen](http://iobroker.live/badges/jeelink-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.jeelink.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.jeelink.svg)

# IoBroker.jeelink
**Tests:** ![Testen und freigeben](https://github.com/foxthefox/ioBroker.jeelink/workflows/Test%20and%20Release/badge.svg)

Dies ist ein Adapter für ioBroker, um RFM12B/RFM69 über Jeelink zu integrieren.
Der Jeelink kann mit der vorinstallierten Software (rfmdemo) zum Auslesen von OpenEnergy-Sensoren (emon) verwendet werden.
Für die Verwendung von LaCrosse-Sensoren muss die Firmware ausgetauscht werden (siehe iobroker-Forum).

## Installation:
### Veröffentlichte Version
```javascript
npm install iobroker.jeelink
```

Auf Himbeere könnte es hilfreich sein, Folgendes zu verwenden:

```javascript
 npm install --unsafe-perm iobroker.jeelink
 ```

 da das Serialport-Paket auf einem nicht unterstützten Arm-HW erstellt werden muss

### Die aktuelle Entwicklungsversion von github (funktioniert möglicherweise nicht, wenn sie getestet wird!)
```javascript
npm install https://github.com/foxthefox/ioBroker.jeelink/tarball/master --production
```

oder

```javascript
npm install --unsafe-perm https://github.com/foxthefox/ioBroker.jeelink/tarball/master --production
```

## Einstellungen:
- USB-Port des JeelinkAdapter normalerweise /dev/ttyACME
- Serielle Geschwindigkeit normalerweise 57600 Baud

## Aufbau:
im Adminbereich zu erledigen

* Definition des USB-Anschlusses
* Einstellen der Baudrate
- Definieren Sie die Sensoradresse, die auf Sendung empfangen wird
- eindeutige Sensoradresse im Adapter definieren (LaCrosse ändert die On Air Adresse nach Batteriewechsel, also Debug Log beachten und Sensoradresse nach Batteriewechsel anpassen)
- Definieren Sie den Sensortyp (siehe Beispiele unten)
- den Raum definieren

## Sensoren
|Objekt|Gerätevarianten|Beispieltelegramm|Beschreibung|
|--------|-------|:-:|--------|
|emonTH|emonTH|OK 19 ...|Sensor von openenergy.org|
|emonWater|emonWater|OK 21 ... |Sensor mit RFM12B zur Wasserzählung|
|LaCrosseDTH |TX|OK 9 ... |Sensoren von LaCrosse, technoline|
|LaCrosseDTT |TX|OK 9 ... |Sensoren von LaCrosse, technoline double temp|
|HMS100TF |TXH29DTH-IT|H00 ... |Sensoren technoline|
|LaCrosseBMP180||OK WS ... |sensor mod, superjee|
|LaCrosseWS|WS1080,TX22,WS1600|OK WS ... |Wetterstation|
|EC3000|EC3000|OK 22 ... |Energiezähler|
|EMT7110|EMT7110|OK EMT7110 ... |Energiezähler|
|Niveau|Niveau|OK LS ... |Niveausensor|
|DavisVantage|Davis Vantage|OK WERT DAVIS ... |Wetterstation|

## MACHEN:
* andere Sensortypen
* Legen Sie den Sensorcode in einer separaten Datei ab
* Schieben des neuen Sensors in die Konfiguration, dann sichtbar auf der Admin-/Konfigurationsseite
* HMS100TF Temperatur unter 0°C und Batterie schwach zu implementieren

## Changelog
### 1.2.1
* (foxthefox) corrections for Davis Vantage

### 1.2.0
* (foxthefox) new device Davis Vantage

### 1.1.1
* (foxthefox) state change as log.debug, not as log.info
* (foxthefox) some more info at adapter startup
* (foxthefox) moved sp.write and deleted separate function

### 1.1.0
* (foxthefox) usage of newest serialport (9.x -> 10.5)
* (foxthefox) changes in github workflow

### 1.0.3
* (atl285) correction wrong type of baudRate config, causing adapter crash

### 1.0.2
* (foxthefox) upper range temperature 50->70

### 1.0.1
* (foxthefox) round -> this round
* (foxthefox) baudrate settings in admin as number

### 1.0.0
* (foxthefox) refactoring, use of classbased style,
* (foxthefox) github actions instead of travis

### 0.1.4
* (o0shojo0o) nodejsV14 compatibility

### 0.1.3
* (atl285) added new sensor type LacCrosseDTT (double temp like TX25-IT)

### 0.1.2
* correction for weather (no data is given by value = 255)

### 0.1.1
* delete buffer function to be compatible with nodejs10
* enhanced automatic testing

### 0.1.0
* compact mode

### 0.0.7
* new level sensor (fhem)

### 0.0.6
* last version of serialport
* new sensor TXH29DTH-IT
* new weather station WS1600
* new sensor EC3000, EMT7110 not verified with life data

### 0.0.5
* adminv3 improved with values2table

### 0.0.4
* command to USB-stick for configuration
* added superjee, BMP180 sensor on jeenode
* admin v3 implementation

### 0.0.3
* abs humidity and dewpoint calculation

### 0.0.2
* definition of unique sensor ID for iobroker datapoint
* implementation of LaCrosseDTH
* definition of sensors via admin

### 0.0.1
* working with 3 sensors emon

## License

The MIT License (MIT)

Copyright (c) 2016 - 2022 foxthefox <foxthefox@wysiwis.net>