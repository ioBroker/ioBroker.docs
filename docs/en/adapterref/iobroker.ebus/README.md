![Logo](admin/ebus.png)
# ioBroker.ebus

![Number of Installations](http://iobroker.live/badges/ebus-installed.svg) ![Number of Installations](http://iobroker.live/badges/ebus-stable.svg)
[![Downloads](https://img.shields.io/npm/dm/iobroker.ebus.svg)](https://www.npmjs.com/package/iobroker.ebus)
[![NPM version](http://img.shields.io/npm/v/iobroker.ebus.svg)](https://www.npmjs.com/package/iobroker.ebus)

[![Known Vulnerabilities](https://snyk.io/test/github/rg-engineering/ioBroker.ebus/badge.svg)](https://snyk.io/test/github/rg-engineering/ioBroker.ebus)
![GitHub Actions](https://github.com/rg-engineering/ioBroker.ebus/workflows/Test%20and%20Release/badge.svg)

[![NPM](https://nodei.co/npm/iobroker.ebus.png?downloads=true)](https://nodei.co/npm/iobroker.ebus/)

![node-lts](https://img.shields.io/node/v-lts/iobroker.ebus?style=flat-square)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/iobroker.ebus?label=npm%20dependencies&style=flat-square)


![GitHub](https://img.shields.io/github/license/rg-engineering/ioBroker.ebus?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/rg-engineering/ioBroker.ebus?logo=github&style=flat-square)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/rg-engineering/ioBroker.ebus?logo=github&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/rg-engineering/ioBroker.ebus?logo=github&style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/rg-engineering/ioBroker.ebus?logo=github&style=flat-square)


**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** 
For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.


**If you like it, please consider a donation:**
                                                                          
[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=34ESBMJ932QZC) 


This adapter reads
- data from ebusd using html
In this case ebusd must run and must be able to send data to e.g. explorer via http://IP:port/data (http://192.168.0.123:8889/data)
Current version of ebusd incl. configuration files can be copied from https://github.com/john30/ebusd
All fields with data, lastup and from global section are parsed. All others are ignored at the moment. 

There is a possibillity to poll data which are not polled by ebusd directly. Command 'read -f' is used to force reading over ebus.  

Another feature is to send any command to ebusd and receive answer to work with e.g. scripts.


**Attention** with ebusd - version 22.1 config path has been changed to http://cfg.ebusd.eu/. Make sure you change it in your installation of ebusd.
details see in [changelog](https://github.com/john30/ebusd/blob/master/ChangeLog.md)


## how to send commands to ebusd
1. write a single command or an command list on datapoint ebus.0.cmd
If you want to use more then one command, use , to separate single commands.
example:
read -f YieldTotal,read LegioProtectionEnabled,read -f -c broadcast outsidetemp

2. when command is executed you will receive results per command in datapoint ebus.0.cmdResult
The result is also comma-separeted
example:
2000, ERR: element not found, 10.5

Attention: command in datapoint ebus.0.cmd is deleted after executing of command!


## Installation / Update

please follow installation instructions for ebusd under [wiki](https://github.com/john30/ebusd/wiki/1.-Build-and-install)


in /opt/iobroker/node_modules/iobroker.ebus/lib/scripts you can find a scripts to install and update SBFspot on debian based systems.


## known issues
* please create issues at [github](https://github.com/rg-engineering/ioBroker.ebus/issues) if you find bugs or whish new features
   
## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 4.0.3 (2026-04-12)
* (René): bug fix see issue #517: avoid crash when using external command

### 4.0.2 (2026-04-11)
* (René): bug fix see issue #513: under some conditions admin page was not available

### 4.0.1 (2026-04-06)
* (René): admin rewitten based on react
* (René): see issue #470: table of polled datapoints can now be filled from existing datapoints in ebusd again
* (René): adapter rewritten in typescript

### 3.8.0 (2026-03-17)
* (René): avoid exception, reported by sentry
* (René) update dependencies + changes based on adapter checker
* (René) see issue #497: support of ebusd 26.1

### 3.7.0 (2025-11-02)
* (René) issue #469: telnet connection overworked, promise-socket removed

## License
MIT License

Copyright (c) 2017-2026 René G. <info@rg-engineering.eu>

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
