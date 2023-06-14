![Logo](admin/ebus.png)
# ioBroker.ebus

![Number of Installations](http://iobroker.live/badges/ebus-installed.svg) ![Number of Installations](http://iobroker.live/badges/ebus-stable.svg)
[![Downloads](https://img.shields.io/npm/dm/iobroker.ebus.svg)](https://www.npmjs.com/package/iobroker.ebus)
[![NPM version](http://img.shields.io/npm/v/iobroker.ebus.svg)](https://www.npmjs.com/package/iobroker.ebus)

[![Known Vulnerabilities](https://snyk.io/test/github/rg-engineering/ioBroker.ebus/badge.svg)](https://snyk.io/test/github/rg-engineering/ioBroker.ebus)
![GitHub Actions](https://github.com/rg-engineering/ioBroker.ebus/workflows/Test%20and%20Release/badge.svg)

[![NPM](https://nodei.co/npm/iobroker.ebus.png?downloads=true)](https://nodei.co/npm/iobroker.ebus/)


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

current supported ebusd-version: 22.3

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

## 2.4.3 (2021-10-21)
* (René) see issue #58: bug fix for Warn: ignoring history value 1 (invalid)" when no history values set

## 2.4.2 (2021-10-19)
* (René) see issue #55: bug fix

## 2.4.0 (2021-10-17)
* (René) overwork handling of read datapoints and history datapoints, circuit added optionally
* (René) command can now include more then one command, just separate commands with ','
* (René) see issue #55: warnings changed to debug messages

## 2.3.2 (2021-09-02)
* (René) see issue #49: support for ebusd 21.2
* (René) see issue #40: option to use boolean instead string for values with on/off
* (René) dependencies updated

## 2.2.7 (2021-07-03)
* (René) dependencies updated
* (René) see issue #48: bug fix for wrong data type logs

## 2.2.5 (2021-03-21)
* (René) dependencies updated

## 2.2.4 (2021-02-17)
* (René) see issue #42: Uncaught ReferenceError: oView is not defined in widget solved

## 2.2.3 (2020-10-24)
* (René) create history DP if not available 

## 2.2.0 (2020-09-06)
* (René) change DP only if necessary to reduce system load
* (René) update dependencies

## 2.1.1 (2020-06-27)
* (René) issue #26: bug fix: "cmd not found" is only debug message instead of error

## 2.1.0 (2020-06-17)
* (René) refactoring:  'async/await' used

## 2.0.0 (2020-04-26)
* (René) "request" replaced by "bent"

## 1.0.0 (2019-12-15)
* (René) update to my own flot 3.0

## 0.8.2 (2019-11-10)
* (René) some more error messages in datapoint "error"

## 0.8.1 (2019-10-31)
* (René) update flot to version 3.0

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

Copyright (c) 2017-2023 rg-engineering info@rg-engineering.eu

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



