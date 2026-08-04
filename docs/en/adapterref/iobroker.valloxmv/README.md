![Logo](admin/valloxmv.png)
# ioBroker.valloxmv

[![NPM version](https://img.shields.io/npm/v/iobroker.valloxmv.svg)](https://www.npmjs.com/package/iobroker.valloxmv)
[![Downloads](https://img.shields.io/npm/dm/iobroker.valloxmv.svg)](https://www.npmjs.com/package/iobroker.valloxmv)
![Number of Installations](https://iobroker.live/badges/valloxmv-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/valloxmv-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.valloxmv.png?downloads=true)](https://nodei.co/npm/iobroker.valloxmv/)

**Tests:** ![Test and Release](https://github.com/hacki11/ioBroker.valloxmv/workflows/Test%20and%20Release/badge.svg)

## ValloxMV adapter for ioBroker

Connects your Vallox Air Ventilation system into your ioBroker home automation.

## Usage
* Install adapter
* Configure device address and poll interval (60 is minimum)
* Read and write states as usual

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.6.1 (2026-07-18)
- Use latest vallox-api with AUTOMATIC profile support

### 1.6.0 (2026-07-06)
- (copilot) Adapter requires node.js >= 22 now
- Add support for AUTOMATIC profile on firmware 3.1.4 or newer

### 1.5.0 (2026-02-28)
* Update dependencies
* Update minimum node version
* Fix ioBroker issues

### 1.4.1 (2025-04-14)
* Maintenance Release
* Add support for NodeJS 18 as long as iobroker supports
* Add devcontainer for development
* Add release script

### 1.4.0
* Maintenance Release
* Bump engines to NodeJS 20 as minimum version

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025-2026 hacki11
