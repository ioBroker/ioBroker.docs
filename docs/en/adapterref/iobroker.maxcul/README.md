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

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
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

### 1.1.2 (2019-08-28)
* (Arne Stenmanns) user enabled paringmode
* (bowao) fixes for measured value of the wallthermostat

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

[Licensed under GPLv2](LICENSE) Copyright (c) 2017-2026 bluefox <dogafox@gmail.com>
