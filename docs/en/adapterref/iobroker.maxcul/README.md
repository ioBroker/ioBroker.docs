![Logo](admin/maxcul.png)
# ioBroker.maxcul

![Number of Installations](http://iobroker.live/badges/maxcul-installed.svg) ![Number of Installations](http://iobroker.live/badges/maxcul-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.maxcul.svg)](https://www.npmjs.com/package/iobroker.maxcul)
[![Downloads](https://img.shields.io/npm/dm/iobroker.maxcul.svg)](https://www.npmjs.com/package/iobroker.maxcul)
[![Tests](https://travis-ci.org/ioBroker/ioBroker.maxcul.svg?branch=master)](https://travis-ci.org/ioBroker/ioBroker.maxcul)

[![NPM](https://nodei.co/npm/iobroker.maxcul.png?downloads=true)](https://nodei.co/npm/iobroker.maxcul/)

ioBroker adapter to control Max! via [CUL](http://busware.de/tiki-index.php?page=CUL)

Adapter is derived from [pimatic-maxcul](https://github.com/fbeek/pimatic-maxcul)

## Supported devices

- Thermostat
- Door/window sensor
- Push button
- Wallthermostat

## Usage
Before using you must first pair the devcies with ioBroker.
E.g. for thermostats press longer the "boost" button till the countdown will start.

## Connection
The adapter talks to a CUL running [culfw](http://culfw.de/) either over a serial port or over the network:

- **CUL stick (serial port)** - a CUL/COC attached via USB. Select the serial port and the baud rate.
- **CUN/CUNO (network)** - a CUN, CUNO or any other culfw device which is reachable over TCP,
  e.g. a MAX! Cube reflashed with culfw or an ESP8266/CC1101 bridge. Enter the host name or IP
  address and the TCP port culfw is listening on (2323 by default).
  A workaround with `ser2net`/`socat` is not needed anymore.

If more than one serial device is attached, prefer one of the `/dev/serial/by-id/...` entries of the port
list. Which device becomes `/dev/ttyUSB0` and which one `/dev/ttyUSB1` depends on the order in which they
are detected and can change after a reboot, while the `by-id` name always points to the same stick.
Any other path can be entered manually.

If the connection is lost, the adapter reconnects automatically every 10 seconds. Commands which
could not be sent meanwhile stay in the queue and are transmitted once the CUL is back.

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
