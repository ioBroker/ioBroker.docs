---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.maxcul/README.md
title: ioBroker.maxcul
hash: EcdEsDmLFDTrbUWEx3Iu+S5kSFQwwzE9BSuDcaVl+TI=
---
![Logo](../../../en/adapterref/iobroker.maxcul/admin/maxcul.png)

![Anzahl der Installationen](http://iobroker.live/badges/maxcul-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.maxcul.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.maxcul.svg)
![Tests](https://travis-ci.org/ioBroker/ioBroker.maxcul.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.maxcul.png?downloads=true)

# IoBroker.maxcul
ioBroker-Adapter zur Steuerung von Max! über [CUL](http://busware.de/tiki-index.php?page=CUL)

Der Adapter wird von [pimatic-maxcul](https://github.com/fbeek/pimatic-maxcul) abgeleitet.

## Unterstützte Geräte
- Thermostat
- Tür-/Fenstersensor
- Druckknopf
- Wandthermostat

## Verwendung
Vor der Verwendung müssen Sie die Geräte mit ioBroker koppeln.
Beispiel: Bei Thermostaten halten Sie die „Boost“-Taste so lange gedrückt, bis der Countdown startet.

## Verbindung
Der Adapter kommuniziert mit einem CUL, auf dem [culfw](http://culfw.de/) läuft, entweder über eine serielle Schnittstelle oder über das Netzwerk:

- **CUL-Stick (serielle Schnittstelle)** – ein über USB angeschlossener CUL/COC-Stick. Wählen Sie die serielle Schnittstelle und die Baudrate.
- **CUN/CUNO (Netzwerk)** - ein CUN, CUNO oder ein anderes culfw-Gerät, das über TCP erreichbar ist,

z. B. ein mit culfw neu geflashter MAX! Cube oder eine ESP8266/CC1101-Bridge. Geben Sie den Hostnamen oder die IP-Adresse und den TCP-Port ein, auf dem culfw lauscht (standardmäßig 2323).
Ein Workaround mit `ser2net`/`socat` ist nicht mehr erforderlich.

Sind mehrere serielle Geräte angeschlossen, wird einer der Einträge `/dev/serial/by-id/...` in der Portliste bevorzugt. Welches Gerät `/dev/ttyUSB0` und welches `/dev/ttyUSB1` wird, hängt von der Reihenfolge ihrer Erkennung ab und kann sich nach einem Neustart ändern. Der Name `by-id` verweist hingegen immer auf denselben Stick. Jeder andere Pfad kann manuell eingegeben werden.

Bei Verbindungsverlust stellt der Adapter die Verbindung alle 10 Sekunden automatisch wieder her. Befehle, die in der Zwischenzeit nicht gesendet werden konnten, bleiben in der Warteschlange und werden übertragen, sobald die Verbindung wiederhergestellt ist.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 2.1.0 (2026-08-13)
* (@GermanBluefox) Added support for CUN/CUNO devices which are connected over the network (TCP)
* (@GermanBluefox) The connection is now re-established automatically if it was lost
* (@GermanBluefox) Fixed the crash on a communication error and the missing cause in the connection error message
* (@GermanBluefox) The serial port list now also offers the stable device links below `/dev/serial`, so a stick can be selected by a name which does not change after a reboot
* (@GermanBluefox) Fixed the CI workflow, which was not triggered by pushes to the master branch
* (@GermanBluefox) Fixed the issues reported by the repository checker

### 2.0.1 (2026-08-06)
* (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now.
* (9Mad-Max5) Updating serialport to version 12.0.0 to support Node.js 20
* (9Mad-Max5) Updating serialport to version 13.0.0 to stop support for Node.js 20
* (@GermanBluefox) Migrated the sources to TypeScript
* (@GermanBluefox) Fixed the message counter, which was sent as `01` for every packet
* (@GermanBluefox) Refactoring and code cleanup

### 1.3.1 (2020-07-26)
* (bowao) Fix unhandled exception
* (bowao) Fix serial port selection
* (Apollon77) Update dependencies

### 1.3.0 (2020-05-12)
* (Apollon77) Support nodejs 12+14
* (Apollon77) Prevent warnings in js-controller 3

### 1.2.0 (2020-01-23)
* (bluefox) Refactoring

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

[Licensed under GPLv2](LICENSE)

Copyright (c) 2017-2026 bluefox <dogafox@gmail.com>