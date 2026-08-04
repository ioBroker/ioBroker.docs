![Logo](admin/linux-control.png)
# ioBroker.linux-control

[![NPM version](http://img.shields.io/npm/v/iobroker.linux-control.svg)](https://www.npmjs.com/package/iobroker.linux-control)
[![Downloads](https://img.shields.io/npm/dm/iobroker.linux-control.svg)](https://www.npmjs.com/package/iobroker.linux-control)
![Number of Installations (latest)](http://iobroker.live/badges/linux-control-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/linux-control-stable.svg)
[![Dependency Status](https://img.shields.io/david/Scrounger/iobroker.linux-control.svg)](https://david-dm.org/Scrounger/iobroker.linux-control)
[![Known Vulnerabilities](https://snyk.io/test/github/Scrounger/ioBroker.linux-control/badge.svg)](https://snyk.io/test/github/Scrounger/ioBroker.linux-control)

[![NPM](https://nodei.co/npm/iobroker.linux-control.png?downloads=true)](https://nodei.co/npm/iobroker.linux-control/)

**Tests:**: [![Travis-CI](http://img.shields.io/travis/Scrounger/ioBroker.linux-control/master.svg)](https://travis-ci.org/Scrounger/ioBroker.linux-control)

## Linux Control Adapter for ioBroker
[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=VWAXSTS634G88&source=url)

Controlling Linux devices and get information about your system

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Configuration

### General
![General](docs/en/img/general.png)

|setting|description|
|-------|-----------|
|enabled|enabled or disable updating of the host|
|datapoint id|id under which all datapoints are to be stored|
|IP|IP address of your linux device|
|Port|SSH Port of your linux device|
|polling interval|polling interval in minutes.<br>To deatcivate the polling you can use '0' or leave it blank|
|user|ssh user for login|
|password / passpharse|ssh password for login or passpharse if you use a rsa key|
|use Sudo| using sudo |
|legacy SSH|enable legacy / deprecated SSH key exchange & cipher algorithms (e.g., `diffie-hellman-group1-sha1`, `3des-cbc`, `ssh-rsa`) for older devices/switches|
|rsa key|path and filename of your rsa key. Access rights must be available!|
|timeout|connection timeout|

### Datapoints
![Datapoints](docs/en/img/datapoints.gif)

The adapter creates predefined datapoints with information and the possibility to control the Linux device. These can be selected here.
In addition, for each individual host, individual data points or entire channels can be placed on the blacklist by drag & drop so that they are not created for the host.

Note if you would like to add the whole channel to the blacklist, you must drag & drop the channel node to the blacklist. Only then the whole channel will be ignored - see sreenshot below:

![Datapoints](docs/en/img/all_to_blacklist.gif)

**Due to the many different Linux distributions this feature is only tested with Debian 10, Ubuntu 18 / 20 LTS!**

### Services
![Services](docs/en/img/services.png)

If the retrieval of services under datapoints is activated, you can define here per host for which services only information should be retrieved.

**Due to the many different Linux distributions this feature is only tested with Debian 10, Ubuntu 18 / 20 LTS!**

### Folders
![Folders](docs/en/img/folders.png)

Here you can retrieve information about the size of folders, count of the files included in these folders and the timestamp of the last change in this folder.

**Due to the many different Linux distributions this feature is only tested with Debian 10, Ubuntu 18 / 20 LTS!**

|setting|description|
|-------|-----------|
|enabled|enabled or disable updating of the folder|
|Host|Host which should be used|
|datapoint id|id under which all datapoints are to be stored|
|Path|path of the folder|
|filename pattern|pattern for files names which should be regonized.|
|Unit|Unit for size|
|decimal places|decimal places|
|count of files|create datapoint for count of files|
|last change|create datapoint for timestamp of the last change in this folder|

### My Commands
![Custom Commands](docs/en/img/myCommands.png)

Here, very individual commands can be defined and then written to your own defined data points.
It is important that the retrieved data is transmitted in the correct type! The type must then be configured accordingly.

|setting|description|
|-------|-----------|
|enabled|enabled or disable updating of the command|
|Host|Host which should be used|
|datapoint id|id under which datapoints are to be stored|
|polling interval|diffrent polling interval in seconds for the command only. For deactivating use `0` or leave the field blank, then the polling interval from the host is used|
|description|description / name of the datapoint|
|command|command that should be used <br><br>If you use a user that needs `sudo` then you have to add `sudo -S` to your own command!|
|type|type of the datapoint|
|unit|unit of the datapoint|

## Known Issues
* if its not possible to get connection to your linux client, check if `iputils-ping` is correct installed on client

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->

### **WORK IN PROGRESS**
* (meistermopper) add optional legacy SSH algorithms support for older devices (closes #90)
* (meistermopper) add Biome linter, `npm run test:local` workflow and align with harvia-fenix quality standard
* (meistermopper) fix invalid common.states type for `command.host` object
* (meistermopper) update dependencies, adminUI configuration and repochecker compliance

### 1.1.6 (2022-09-06)
* (Scrounger) global interval for update informations added
* (Scrounger) fix invalid object host

### 1.1.6 (2026-07-23)
* (meistermopper) Improved timer resource cleanup on unload using adapter-core safe timeouts
* (meistermopper) Enforced state ack handling filter in onStateChange
* (meistermopper) Added legacy SSH key exchange and cipher algorithm support

### 1.1.5 (2022-05-03)
* (Scrounger) Dependencies updated

### 1.1.4 (2021-12-18)
* (Scrounger) always create my command datapoint

### 1.1.3 (2021-10-04)
* (Scrounger) show warn message if permission denied
* (xCruziX) preformance improvment

### 1.1.2 (2021-01-08)
* (Scrounger) show error if user is not in sudoers file
* (Scrounger) bug fix if response has no result optimized
* (Scrounger) myCommands: bug fix sudo is no longer mandatory

Older changelogs can be found in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).


## License
MIT License

Copyright (c) 2020-2026 Scrounger <scrounger@gmx.net>

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
