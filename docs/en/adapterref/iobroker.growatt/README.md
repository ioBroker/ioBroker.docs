![Logo](admin/glogo.png)

## ioBroker.growatt

![NPM version](http://img.shields.io/npm/v/iobroker.growatt.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.growatt.svg)
![Number of Installations (latest)](https://iobroker.live/badges/growatt-installed.svg)
![Number of Installations (stable)](https://iobroker.live/badges/growatt-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.growatt.png?downloads=true)](https://nodei.co/npm/iobroker.growatt/)

## Important: please read

Growatt's cloud servers are very unstable. There are error messages and timeouts when data is requested.
If you are still thinking about getting an inverter, it is better to use a good product. Devices that transmit the data directly in the house via modbus-ip are best.
There is also the [Grott project](https://github.com/johanmeijer/grott) that intercepts the data from the communication. Here, however, it also happens that older data sets are transmitted or the transmission is suspended, since this only listens in and temporarily stores the data.

---

### growatt adapter for ioBroker

ioBroker Growatt Adapter to communiacte with Growatt Shine Server.
I'm not affiliated.
Usually, the data is sent from the data logger to the cloud every 5 minutes.
You can change it, see below.

Not all plant types are implemented.

Currently only data can be read, writing parameters or changing parameters is not possible.

---

## Adapter admin page

### Main Settings

#### User and Password

Please enter the name and password that you also use in the Shine app or in the web portal.

#### Login with shared key

On the Growatt website under energy, plant management, operating tools you can send yourself a key by e-mail.

#### Read plant data

This data record contains the stored master data

#### Read last history data

Reads the last data record from the history of the data logger.
This function supports minute intervals for the data logger.

#### Read status data

These data are not available for all plants (not INV/MAX/TLX). This dataset contains live data.
This function supports minute intervals for the data logger.

#### Read total data

This data record contains aggregation data.

#### Read device data

This data record contains some data from the device. Some data are also available in the other categories.

#### Read weather

This data set contains the weather forecast.

#### Timeout in seconds

The default timeout for HTTP requests. The default value 60 seconds, as with web browsers

#### Process timeout in seconds

This timeout monitors the collection of data from the Growatt server. If the server does not process all of the data within this time, an error is reported, the session is ended and a new cycle timer is started. The default value is 600 seconds.
If the value is 0, this check function is not executed.

#### Keep web session

The adapter only logs in once and not with every data request from the Growatt server. By default it is on.

#### Session time in minutes

Here you can set when the adapter logs out of the server and logs in again. A 0 means never log out. Default value is 0=infinity.

#### Cycle time in seconds

The interval at which the data is requested from the server. The time required for the data query is then deducted from the next one. If the query lasts longer than the waiting time, the adapter only sleeps 100ms. The default value is 30 seconds.

#### Error cycle time in seconds

If an error occurs when querying the values at the Growatt server, this time is used instead of the cycle time. The default value is 120 seconds

#### Growatt server

Another url can be entered here, for example to use the US domain. But it must start with "https://". The default is blank, so https://server.growatt.com is used.

### Manage Objects

Here you can define what should happen to each value (object) that is picked up by the inverter.
There are a lot of values ​​that do not belong to your inverter. These can be removed here.
Since there is no event with which the object list can be reloaded when saving. The update button must be used when save is pressed.

#### Normal

The object remains, the value is updated.

#### Delete

The object is deleted and the value loaded by the inverter is discarded.
After the update, only the ID and the action are displayed because the object no longer exists. If you select normally, the object will be created again after saving.

#### No update

The object remains, the values ​​from the inverter are discarded.

### Manage Loggers

The instance must be running and logged in to the server. Then the settings of the data logger can be called up via the refresh button in this tab.
The data is not requested automatically, the request can only be made via the button.
The fields displayed for the data logger cannot be changed. It is only about retrieved data.
Buttons are displayed for each logger. Settings can be edited with the button.
_When using GROTT, changing settings in the INI must be enabled._
Please do not use the settings if a value appears that you did not expect.
Attention this is based on reingeneering. I am not liable for damage to the device.

#### Button interval

The current interval in minutes is read from the data logger and an input form appears in which the value can be adjusted.
If you get a successful response, the data logger should be restarted to activate the settings.

#### Button server ip

The server for data transmission on the logger can be set here. When using Grott or US, the local or US IP can be specified here.
If you get a successful response, the data logger should be restarted to activate the settings.

#### Button server port

The port on the server for data transmission on the logger can be set here.
If you get a successful response, the data logger should be restarted to activate the settings.

#### Button check firmware

It will be asked whether the firmware of the data logger is up to date.
The update must be done on the growatt page.

#### Button restart datalogger

Every boot is good.
The settings are accepted.

---

## Speedup data interval internal method

Have a look at Manage Loggers and Button Interval

## Speedup data interval external app method

- Open the ShinePhone app
- Click on attachment below
- Top right +, then list data loggers
- Click on existing data logger
- Configure data logger
- Wireless hotspot mode
- Put the stick in AP mode
- Connect to Wifi hotspot, PW 123456789 ? <- check again
- Continue
- Advanced
- Time setting
- Interval to 1
- Enter password growattYYYYMMDD (e.g.growatt20220209)
- Unlock
- Click and apply changes
- Exit hotspot mode

## Speedup data interval external old method

In hotspot mode it is only possible to change the interval on the old firmware.
Growatt has removed the website from the firmware.
Therefore, the description has also been removed.

**There is no change to the charts on growatt side. There you can only see a change in the data from the datalogger.**

-\*-

## Changelog

### 2.0.0 (06.10.2022)

- (PLCHome) Data logger settings can be called up and changed.
- (PLCHome) The server url can be changed.

### 1.2.1 (21.09.2022)

- (PLCHome) Added an offset to numeric values. My inverter reset te total quantity by itself. Now the total quantity can be corrected.

### 1.1.19 (30.08.2022)

- (PLCHome) HTML Header

### 1.1.17 (10.08.2022)

- (PLCHome) JSON Loopkiller

### 1.1.16 (10.08.2022)

- (PLCHome) https rejectUnauthorized false

### 1.1.15 (28.04.2022)

- (PLCHome) Apple devices cannot open the adapter's config page with Safari, all values ​​are empty

### 1.1.14 (26.04.2022)

- (PLCHome) Restart loop when exception

### 1.1.13 (08.04.2022)

- (PLCHome) total data and history data missing for type inv

### 1.1.12 (06.04.2022)

- (PLCHome) api maintance

### 1.1.11 (02.04.2022)

- (PLCHome) fixed readme
- (PLCHome) fixed version

### 1.1.10 (02.04.2022)

- (PLCHome) suppressed the warning for the Firsttime: /error.do?errorMess=errorNoLogin

### 1.1.9 (27.03.2022)

- (PLCHome) Make the source a little prettier
- (PLCHome) Make the readme prettier
- (PLCHome) Added Test and Release
- (PLCHome) Improvement: used i in inner and outer loop
- (PLCHome) Improvement triggered by "Sentry" issues: undefined object
- (PLCHome) Improvement: no disconnect to "Sentry"

### 1.1.8 (16.03.2022)

- (PLCHome) Improvement triggered by "Sentry" issues

### 1.1.7 (13.02.2022)

- (PLCHome) "Sentry" was added

### 1.1.6 (12.02.2022)

- (PLCHome) Read me

### 1.1.2 (12.02.2022)

- (PLCHome) Timeouts made maintainable and adjusted. Request timout is now 60 second like chrome
- (PLCHome) Server request improved and additionally secured against dying
- (PLCHome) Calculate sleep to next request to keep cycle. Minimum sleep is 100ms
- (PLCHome) Error output: if the key has expired, requests are forwarded with an error code, which is now in the log
- (PLCHome) Improved error handling
- (PLCHome) Improved debugging
- (PLCHome) Update the includes

### 1.1.1 (27.05.2021)

- (PLCHome) The web request timeout was increased due to login issues

### 1.1.0 (24.05.2021)

- (PLCHome) Improvement of the connection via Axios Session

### 1.0.1 (05.03.2021)

- (PLCHome) Duplicate keys are transmitted, I try to filter them out.

### 1.0.0 (24.02.2021)

- (PLCHome) Read me
- (PLCHome) fix: Create a date from the time or calendar structure for last history data for all devices sometimes not working

### 0.0.20 (09.02.2021)

- (PLCHome) Create a date from the time or calendar structure for last history data for all devices

### 0.0.19 (05.02.2021)

- (PLCHome) The data from the chart is removed. These were only available in a 5-minute grid. The performance can now be queried via the history.
- (PLCHome) Objects of unselected data areas are now deleted.
- (PLCHome) You can choose objects to be ignored or deleted.
- (PLCHome) A link to the Growatt page was added, so the adapter now also appears in the overview.
- (PLCHome) Recently, Growatt has changed the spelling of values, which letters are uppercase and lowercase. For this reason, the objects are now handled internally Case Insensively. If a warning is written in the log after the update when starting, you have to delete one of the two objects. If a warning is written in the log after the update when starting, you have to delete one of the two objects. And then restart the adapter so that it definitely uses the remaining object to store the value.

### 0.0.18 (23.01.2021)

- (PLCHome) wrong version info.

### 0.0.17 (21.01.2021)

- (PLCHome) fixes a date issue on inverter history data.

### 0.0.16 (20.01.2021)

- (PLCHome) npm package version update
- (PLCHome) add last history for all plants. Special thanks to magix for the key, so i can test the inverter history function.

### 0.0.15 (04.12.2020)

- (PLCHome) npm package version update

### 0.0.14 (01.12.2020)

- (PLCHome) improvement for objects not returned from Growatt website

### 0.0.12 (27.11.2020)

- (PLCHome) wrong initialization for shared key: string instead of boolean

### 0.0.11 (27.11.2020)

- (PLCHome) Read me

### 0.0.10 (26.11.2020)

- (PLCHome) Shared key login
- (PLCHome) Last value of the graph if there are no live data.
- (PLCHome) Change of the polling interval

### 0.0.9 (05.10.2020)

- (PLCHome) fix no feature 'ADAPTER_AUTO_DECRYPT_NATIVE'

### 0.0.8 (05.10.2020)

- (PLCHome) fix io-package

### 0.0.7 (05.10.2020)

- (PLCHome) with "@iobroker/adapter-core": "^2.4.0", the js-controller dep needs to be >=2.0.0!
- (PLCHome) io-package native defined 5 values, admin sets 7
- (PLCHome) store password encrypted

### 0.0.6 (31.08.2020)

- (PLCHome) translation with ioBroker tool.

### 0.0.5

- (PLCHome) initial release.

### 0.0.1

- (PLCHome) initial release.

-\*-

## License

The MIT License (MIT)

Copyright (c) 2020 - 2022 PLCHome

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
