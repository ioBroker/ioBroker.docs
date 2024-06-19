![Logo](admin/janitza-gridvis.png)
# ioBroker.janitza-gridvis

[![NPM version](https://img.shields.io/npm/v/iobroker.janitza-gridvis.svg)](https://www.npmjs.com/package/iobroker.janitza-gridvis)
[![Downloads](https://img.shields.io/npm/dm/iobroker.janitza-gridvis.svg)](https://www.npmjs.com/package/iobroker.janitza-gridvis)
![Number of Installations](https://iobroker.live/badges/janitza-gridvis-installed.svg)
![Test and Release](https://github.com/BenAhrdt/ioBroker.janitza-gridvis/workflows/Test%20and%20Release/badge.svg)
[![Donate](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)](https://paypal.me/besc83)

[![NPM](https://nodei.co/npm/iobroker.janitza-gridvis.png?downloads=true)](https://nodei.co/npm/iobroker.janitza-gridvis/)

## janitza-gridvis adapter for ioBroker

Read out data from Energymanagementsystem Janitza® GridVis®.
Your are able to read out all online values of the present devices.
Additional you are able to read out the historical energy values
of the present devices.
Implemented are the following times:
	Today
	Yesterday
	ThisWeek
	LastWeek
	ThisMonth
	LastMonth
	ThisQuarter
	LastQuarter
	ThisYear
	LastYear
	Flexible Timebases
## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 3.2.1 (2024-06-05)
* (BenAhrdt) do not send axios or setState after unload Adapter
* (BenAhrdt) rename reconnectCout in reconnectCount (connfig-parameter)

### 3.2.0 (2024-05-17)
* (BenAhrdt) add historic timebases (hours)

### 3.1.12 (2024-05-08)
* (BenAhrdt) config default for additional flexible time changed

### 3.1.11 (2024-05-07)
* (BenAhrdt) Plugin for release added

### 3.1.10 (2024-05-07)
* (BenAhrdt) manual review for release script

### 3.1.9 (2024-05-07)
* (BenAhrdt) implement more flexible timebases

### 3.1.8 (2023-11-08)
* (BenAhrdt) remove debuglogging from stable version

### 3.1.7 (2023-11-08)
* (BenAhrdt) Handling of iconsetting improoved & implements new icon

### 3.1.6 (2023-11-04)
* (BenAhrdt) Bugfix Logging utc time

### 3.1.5 (2023-11-04)
* (BenAhrdt) change endstring of timerparameters to utc

### 3.1.4 (2023-11-02)
* (BenAhrdt) corrction in jsonconfig schema & new order of deviceicons

### 3.1.3 (2023-10-11)
* (BenAhrdt) Errorhandling improoved in case if device is not present. => Reducing API connection trafic

### 3.1.2 (2023-04-18)
* (BenAhrdt) check timestamp improoved

### 3.1.1 (2023-04-18)
* (BenAhrdt) warning in case of invalid timestamp

### 3.1.0 (2023-04-17)
* (BenAhrdt) flexible timebases with timestamp added

### 3.0.0 (2023-04-05)
* (BenAhrdt) Timbases from past implemented (to compare)

### 2.2.2 (2023-03-30)
* (BenAhrdt) node-schedule updated

### 2.2.1 (2023-03-30)
* (BenAhrdt) get projects and get devices improved

### 2.2.0 (2023-03-29)
* (BenAhrdt) Testings 12.x removed & Testings 18.x implemented

### 2.1.32 (2023-03-29)
* (BenAhrdt) do some code improvments

### 2.1.31 (2023-03-29)
* (BenAhrdt) internal rename of variables

### 2.1.30 (2023-02-17)
* (BenAhrdt) Bugfix: devicestates will created only once at startup (not more times at startup)

### 2.1.29 (2023-02-15)
* (BenAhrdt) deficeinfo in case of values is NaN added

### 2.1.28 (2023-02-15)
* (BenAhrdt) devicetype added to info-folder for every device

### 2.1.27 (2023-02-14)
* (BenAhrdt) Bugfix info-folder will not deleted at startup, if there is no connection

### 2.1.26 (2023-02-14)
* (BenAhrdt) adding info folder for every device

### 2.1.25 (2022-10-21) - Bugfix errorcheck
* (BenAhrdt) before checking error for status, the error will be check for exist

### 2.1.24 (2022-10-21) - adding warning for error 400
* (BenAhrdt) the communication error 400 will always be displayed => No reconnection needed

### 2.1.23 (2022-10-21) - adding warning for error 404
* (BenAhrdt) the communication error 404 will always be displayed

### 2.1.22 (2022-09-19) - removing keys from historic values
* (BenAhrdt) removing id, timebase and online key from historic value keys

### 2.1.21 (2022-08-27) - changing cronJob to complex
* (BenAhrdt) removing wizard and enabling complex cronJob config

### 2.1.20 (2022-08-27) - Bugfix historic value config
* (BenAhrdt) historic value config crashes the adapter

### 2.1.19 (2022-08-25) - update to new release skript
* (BenAhrdt) new release skript implemented

### 2.1.18 (2022-08-25) - debug logging remooved
* (BenAhrdt) logging with log.info removed

### 2.1.17 (2022-08-17) - sending bigger message
* (BenAhrdt) sending message from config with connection and device

### 2.1.16 (2022-07-08) - message timestamp implemented
* (BenAhrdt) timestamp for message "connectionState" and "getProjects" implemented

### 2.1.15 (2022-07-08) - projectinfos improoved
* (BenAhrdt) projectinfos will not longer deleted at startup

### 2.1.14 (2022-07-08) - projectinfos added
* (BenAhrdt) added some projectinfos into info folder

### 2.1.13 (2022-07-08) - no project selected more improoved
* (BenAhrdt) change text of no project selected

### 2.1.12 (2022-07-08) - no project selected improoved
* (BenAhrdt) change traslation of no project selected

### 2.1.11 (2022-07-08) - getProjects logging changed
* (BenAhrdt) getProject logging is changed into level silly

### 2.1.10 (2022-07-08) - getProjects improoved
* (BenAhrdt) getProject message sends data from address and port

### 2.1.9 (2022-07-07) - implement select for projects
* (BenAhrdt) only present projects can be selected by config

### 2.1.8 (2022-06-24) - counting up reconnectCounter changed
* (BenAhrdt) reconnect count is counted up and set to zero in case the connection is successfull

### 2.1.7 (2022-06-23) - code improoved
* (BenAhrdt) code improoved in relation to == vs ===

### 2.1.6 (2022-06-22) - configed value entry improoved
* (BenAhrdt) change configed value entry writing from string to Object => JSON.stringify(...)

### 2.1.5 (2022-06-18) - value display in historic config changed
* (BenAhrdt) a value type will only displayed once in historic config

### 2.1.4 (2022-06-18) - bugfix recording time
* (BenAhrdt) bugfix recording tme will be displayd

### 2.1.3 (2022-06-18) - extends historic value declaring
* (BenAhrdt) historic value declaring was extended by id

### 2.1.2 (2022-06-18) - recodring time displayed in historic values
* (BenAhrdt) display all recording times in historic value selections

### 2.1.1 (2022-06-17) - more historical values available
* (BenAhrdt) make all available values selectable in historical values

### 2.1.0 (2022-06-17) - config sort values imrooved
* (BenAhrdt) changeing config sort of values

### 2.0.18 (2022-06-17) - config improoved
* (BenAhrdt) check some wrong inputs in config at startup

### 2.0.17 (2022-06-17) - readme changed
* (BenAhrdt) change some wrong entries in readme file

### 2.0.16 (2022-06-16) - timebase for historic values implemented
* (BenAhrdt) implements some checkboxes to select the desired timebsases for historic values

### 2.0.15 (2022-06-16) - change detailed debugging into silly
* (BenAhrdt) detailed logging for debug mode removed and changed into silly

### 2.0.14 (2022-06-16) - dataild debug logging implemented
* (BenAhrdt) detailed logging for debug mode can be selected in config

### 2.0.13 (2022-06-16) - Bugfix assign object
* (BenAhrdt) assigned object deleted => json.parse(JSON.stringify(obj))

### 2.0.12 (2022-06-15) - scheduled request for device informations
* (BenAhrdt) the device informations will be requested every minute

### 2.0.11 (2022-06-15) - device information implemented
* (BenAhrdt) for real hardware device implemets information about serialnumber, hardware and firmware

### 2.0.10 (2022-06-15) - config improoved
* (BenAhrdt) sort values keys before writing into json config

### 2.0.9 (2022-06-14) - implement icson and water consumption
* (BenAhrdt) implements icons for device channel
* (BenAhrdt) implements water consumption for historic values

### 2.0.8 (2022-06-13) - logging language changed
* (BenAhrdt) logging changed into english

### 2.0.7 (2022-06-12) - bugfix translation
* (BenAhrdt) german translation was lost => re-implemented

### 2.0.6 (2022-06-12) - set devices to type channel
* (BenAhrdt) deviceschanged to type channel
* (BenAhrdt) onlineValues & historicValues "folder" changed to "channel"

### 2.0.5 (2022-06-12) - reconnect count in info states
* (BenAhrdt) reconnect count was implemeted into the info states
* (BenAhrdt) set the default value of reconnection before warning to 4 (4 x timeout + 3 x 10s)

### 2.0.4 (2022-06-12) - nuber of reconnection before warning in config
* (BenAhrdt) count the reconnection and warn after configed count is reached

### 2.0.3 (2022-06-09) - sequential historical read out
* (BenAhrdt) sequential readout of historical data

### 2.0.2 (2022-06-06) - translation without debug logging
* (BenAhrdt) debug logging for translation removed

### 2.0.1 (2022-06-06) - message translating
* (BenAhrdt) message translating in i18n

### 2.0.0 (2022-06-05)
* (BenAhrdt) bugfixes for first release

### 1.5.5
* (BenAhrdt) readme fixed

### 1.5.4
* (BenAhrdt) upgrading readme

### 1.5.3
* (BenAhrdt) Comment some functions (dev internal)

### 1.5.2
* (BenAhrdt) setting toppics and update readme

### 1.5.1
* (BenAhrdt) reconnection implemented

### 1.5.0
* (BenAhrdt) first version of the adapter

## License
MIT License

Copyright (c) 2024 BenAhrdt <bsahrdt@gmail.com>

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