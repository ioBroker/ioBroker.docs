---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.jeelink/README.md
title: ioBroker.jeelink
hash: msM7GxyAHwu1ZEOPSUpsv1EZMZc+F1oxAaBrQ01+OjQ=
---
![Logo](../../../en/adapterref/iobroker.jeelink/admin/jeelab_logo.png)

![Anzahl der Installationen](http://iobroker.live/badges/jeelink-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.jeelink.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.jeelink.svg)
![Test und Freigabe](https://github.com/foxthefox/ioBroker.jeelink/workflows/Test%20and%20Release/badge.svg)

# ioBroker.jeelink

Dies ist ein Adapter für ioBroker zur Integration von RFM12B/RFM69 über Jeelink. Jeelink kann mit der vorinstallierten Software (rfmdemo) zum Auslesen von OpenEnergy-Sensoren (emon) verwendet werden. Für die Verwendung von LaCrosse-Sensoren muss die Firmware ausgetauscht werden (siehe ioBroker-Forum).

## Einstellungen:

- Der USB-Anschluss des JeelinkAdapters ist normalerweise /dev/ttyACME.
- Serielle Übertragungsgeschwindigkeit üblicherweise 57600 Baud

## Konfiguration:

Im Administratorbereich auszuführen

- Definition des USB-Anschlusses
- Einstellen der Baudrate

* Sensoradresse definieren, die über Funk empfangen wird
* Definieren Sie innerhalb des Adapters eine eindeutige Sensoradresse (LaCrosse ändert die On-Air-Adresse nach einem Batteriewechsel, daher sollten Sie das Debug-Protokoll beachten und die Sensoradresse nach einem Batteriewechsel anpassen).
* Den Sensortyp definieren (siehe Beispiele unten).
* den Raum definieren

## Sensoren

| Objekt         | Gerätevarianten      | Telegrammbeispiel | Beschreibung                                       |
| -------------- | -------------------- | :---------------: | -------------------------------------------------- |
| emonTH         | emonTH               |     OK 19 ...     | Sensor von openenergy.org                          |
| emonWater      | emonWater            |     OK 21 ...     | Sensor mit RFM12B zur Wassermessung                |
| LaCrosseDTH    | TX                   |      OK 9 ...     | Sensoren von LaCrosse, Technoline                  |
| LaCrosseDTT    | TX                   |      OK 9 ...     | Sensoren von LaCrosse, Technoline Doppeltemperatur |
| HMS100TF       | TXH29DTH-IT          |      H00 ...      | Sensoren Technoline                                |
| LaCrosseBMP180 |                      |     OK WS ...     | Sensormodifikation, Superjee                       |
| LaCrosseWS     | WS1080, TX22, WS1600 |     OK WS ...     | Wetterstation                                      |
| EC3000         | EC3000               |     OK 22 ...     | Energiezähler                                      |
| EMT7110        | EMT7110              |   OK EMT7110 ...  | Energiezähler                                      |
| Ebene          | Ebene                |     OK LS ...     | Füllstandssensor                                   |
| DavisVantage   | Davis Vantage        | OK WERT DAVIS ... | Wetterstation                                      |

## TODO:

- andere Sensortypen
- Den Sensorcode in eine separate Datei auslagern
- Ein neuer Sensor wird in die Konfiguration eingefügt und ist dann auf der Seite admin/config sichtbar.
- HMS100TF Temperatur unter 0°C und niedriger Batteriestand sollen implementiert werden

## Changelog

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 1.2.9 (npm)

- (foxthefox) fix jsonConfig

### 1.2.8 (npm)

- (foxthefox) update dependencies, comply with repo checker

### 1.2.7 (npm)

- (foxthefox) update dependencies, comply with repo checker

### 1.2.6 (npm)

- (foxthefox) update dependencies
- (foxthefox) UI with jsonConfig

### 1.2.5 (npm)

- (foxthefox) eslint upgrade and corrections

### 1.2.4 (npm)

- (foxthefox) IOB checker corrections

### 1.2.3 (npm)

- (foxthefox) serialport 12
- (foxthefox) translation with @iobroker/adapter-dev

### 1.2.2

- (foxthefox) more datapoints for Davis Vantage

### 1.2.1

- (foxthefox) corrections for Davis Vantage

### 1.2.0

- (foxthefox) new device Davis Vantage

### 1.1.1

- (foxthefox) state change as log.debug, not as log.info
- (foxthefox) some more info at adapter startup
- (foxthefox) moved sp.write and deleted separate function

### 1.1.0

- (foxthefox) usage of newest serialport (9.x -> 10.5)
- (foxthefox) changes in github workflow

### 1.0.3

- (atl285) correction wrong type of baudRate config, causing adapter crash

### 1.0.2

- (foxthefox) upper range temperature 50->70

### 1.0.1

- (foxthefox) round -> this round
- (foxthefox) baudrate settings in admin as number

### 1.0.0

- (foxthefox) refactoring, use of classbased style,
- (foxthefox) github actions instead of travis

### 0.1.4

- (o0shojo0o) nodejsV14 compatibility

### 0.1.3

- (atl285) added new sensor type LacCrosseDTT (double temp like TX25-IT)

### 0.1.2

- correction for weather (no data is given by value = 255)

### 0.1.1

- delete buffer function to be compatible with nodejs10
- enhanced automatic testing

### 0.1.0

- compact mode

### 0.0.7

- new level sensor (fhem)

### 0.0.6

- last version of serialport
- new sensor TXH29DTH-IT
- new weather station WS1600
- new sensor EC3000, EMT7110 not verified with life data

### 0.0.5

- adminv3 improved with values2table

### 0.0.4

- command to USB-stick for configuration
- added superjee, BMP180 sensor on jeenode
- admin v3 implementation

### 0.0.3

- abs humidity and dewpoint calculation

### 0.0.2

- definition of unique sensor ID for iobroker datapoint
- implementation of LaCrosseDTH
- definition of sensors via admin

### 0.0.1

- working with 3 sensors emon

[Older changelogs can be found there](https://github.com/foxthefox/ioBroker.jeelink/blob/master/CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2016-2026 foxthefox <foxthefox@wysiwis.net>