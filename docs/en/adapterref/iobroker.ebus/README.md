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

current supported ebusd-version: 23.2

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


## known issues
* please create issues at [github](https://github.com/rg-engineering/ioBroker.ebus/issues) if you find bugs or whish new features
   
## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 3.4.0 (2024-12-10)
* (René) migration to jsonConfig
* (René) see issue #383: add optionally parameters to HTTP call

### 3.3.8 (2024-11-24)
* (René) update dependencies
* (René) issue  #381: install widgets again

### 3.3.7 (2024-11-20)
* (René) see issue #380: support of ebusd 24.1, ATTENTION: ebusd creates datapoints with changed names, folders or in different locations
* (René) see issue #371: test with nodejs@22

### 3.3.6 (2024-08-25)
 * (René) downgrade of "promise-socket" to 7.0.0

### 3.3.5 (2024-08-24)
* (René) update dependencies
* (René) bug fixes based on adapter checker recommendation

### 3.3.4 (2024-07-12)
 * (René) bug fix after 3.3.2 update

### 3.3.3 (2024-07-12)
 * (René) downgrade of "promise-socket" to 7.0.0

### 3.3.2 (2024-07-11)
 * (René) see issue #338: due to error in ebusd json no data are parsed

### 3.3.1 (2024-05-28)
* (René) change of dependencies

### 3.3.0 (2024-05-24)
* (René) remove cron dependency
* (René) data history prepared for VIS-2: just a option here in the adapter and new widget (at this moment GeneralChart widget in vis-2-widgets-weather can be used)

### 3.2.6 (2024-02-11)
* (René) see issue #245: support ebusd 23.3
* (René) fixes reported by eslint

### 3.2.5 (2024-01-12)
* (René) dependencies updated

### 3.2.4 (2023-11-19)
* (René) revert back to flat 5.x

### 3.2.3 (2023-11-18)
* (René) dependencies updated
* (René) fix sentry reported exceptions

### 3.2.2 (2023-07-30)
* (René) dependencies updated

### 3.2.1 (2023-04-07)
* (René) dependencies updated

### 3.2.0 (2023-02-11)
* (René) **Attention** polled variables must be set as active in admin now
* (René) search available variables per circuit added in admin
* (René) DP "find" added to force read of all existing datapoints (Attention: might take a while) and update name in data point tree

### 3.1.1 (2023-01-31)
* (René) support ebusd 23.1
* (René) see issue #77: make sure that only one data request is running at the same time

### 3.1.0 (2022-12-01)
* (René) support ebusd 22.4
* (René) see issue #77: Update data point when read-cmd is used
* (René) see issue #78: remove CR, LF in answer from ebusd for DP ebus.0.cmdResult

### 3.0.7 (2022-08-20)
* (René) support ebusd 22.3

### 3.0.6 (2022-08-19)
* (René) bug fix in tooltip in wizard

### 3.0.4 (2022-08-18)
* (René) tooltip in wizard added
* (René) flot and dependencies updated
* (René) errors from ebusd are shown as warning here in adapter, details schould be checked in logs of ebusd
* (René) bug fix in widget: if less data available x axes grid point were not shown
* (René) except null as valid value from ebusd (e.g. to reset CurrentError)

### 3.0.2 (2022-04-02)
* (René) message for installation added

### 3.0.1 (2022-04-02)
* (René) read interval in admin added

### 3.0.0 (2022-04-02)
* (René) **ATTENTION** change from scheduled to daemon adapter
* (René) bent by axios replaced

### 2.5.1 (2021-12-29)
* (René) adjustable retries to send data if arbitration error appeared

### 2.5.0 (2021-12-28)
* (René) see issue #62: support ebusd 21.3

### 2.4.5 (2021-11-07)
* (René) bug fix color of labels in widget

### 2.4.4 (2021-10-30)
* (René) see issue #59: avoid endless loop
* (René) update flot to 4.2.2
* (René) bug fix missing space in command when using circuit name

### 0.8.0 (2019-02-24)
* (René) hcmode2 value 5 = EVU Sperrzeit

### 0.7.0 (2019-01-28)
* (René) add adjustable timeout

### 0.6.0 (2019-01-06)
* (René) support of compact mode

### 0.5.5 (2018-11-04)
* (René) code clean up

### 0.5.4
* (René) arduino support removed

### 0.5.3
* (René) add error information

### 0.5.2
* (René) bug fix: in vis 1.x some values are not stored

### 0.5.1
* (René) bug fix: if nothing to poll then skip telnet connection

### 0.5.0
* (René) write date over TCP to ebusd

### 0.4.2
* (René) bug fix for admin V3

### 0.4.1 
* (René) logo changed

### 0.4.0 
* (René) reading data from ebusd

### 0.3.0 
* (René) support of ebusd 
* (René) admin3 support

### 0.2.0
* (René) add history as JSON for vis
* (René) add flot based widget to display temperatur, status and power graph

### 0.1.0
* (René) scheduled adapter instead of deamon

### 0.0.3
* (René) UTF8 coding

### 0.0.2
* (René) initial release

## License
MIT License

Copyright (c) 2017-2024 René G. <info@rg-engineering.eu>

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
