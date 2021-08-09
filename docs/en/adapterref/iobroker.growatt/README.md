![Logo](admin/glogo.png)
# ioBroker.growatt

[![NPM version](http://img.shields.io/npm/v/iobroker.growatt.svg)](https://www.npmjs.com/package/iobroker.growatt)
[![Downloads](https://img.shields.io/npm/dm/iobroker.growatt.svg)](https://www.npmjs.com/package/iobroker.growatt)
[![Number of Installations (latest)](http://iobroker.live/badges/growatt-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/growatt-stable.svg)
![Dependency Status](https://img.shields.io/david/PLCHome/ioBroker.growatt.svg)](https://david-dm.org/PLCHome/ioBroker.growatt)

[![NPM](https://nodei.co/npm/iobroker.growatt.png?downloads=true)](https://nodei.co/npm/iobroker.growatt/)

## growatt adapter for ioBroker

ioBroker Growatt Adapter to communiacte with Growatt Shine Server.
I'm not affiliated.
Usually, the data is sent from the data logger to the cloud every 5 minutes.
You can change it, see below.
The software queries the server every 30 seconds so that the offset is not too great.

Not all plant types are implemented.

Currently only data can be read, writing parameters or changing parameters is not possible.

----------------------------------------------------------------------------------------------------------------------

# Adapter admin page

## Main Settings

### User and Password
Please enter the name and password that you also use in the Shine app or in the web portal.

### Login with shared key
On the Growatt website under energy, plant management, operating tools you can send yourself a key by e-mail.

### Read plant data
This data record contains the stored master data

### Read last history data
Reads the last data record from the history of the data logger.
This function supports minute intervals for the data logger.

### Read status data
These data are not available for all plants (not INV/MAX/TLX). This dataset contains live data.
This function supports minute intervals for the data logger.

### Read total data
This data record contains aggregation data.

### Read device data
This data record contains some data from the device. Some data are also available in the other categories.

### Read weather
This data set contains the weather forecast.

## Manage Objects
Here you can define what should happen to each value (object) that is picked up by the inverter.
There are a lot of values ​​that do not belong to your inverter. These can be removed here.
Since there is no event with which the object list can be reloaded when saving. The update button must be used when save is pressed.

### Normal
The object remains, the value is updated.

### Delete
The object is deleted and the value loaded by the inverter is discarded.
After the update, only the ID and the action are displayed because the object no longer exists. If you select normally, the object will be created again after saving.

### No update
The object remains, the values ​​from the inverter are discarded.

----------------------------------------------------------------------------------------------------------------------

# Speedup data interval

## You can set the logger interval from 5 minutes to 1 minute

Remove the rubber plug of the KEY button from ShineWiFi-S, and short press the button inside. The blue LED
will light up. Use your phone or computer to connect to the wireless network emitted by the
ShineWiFi-S module. The network name/SSID is the serial number of the ShineWiFi-S
module.

## Login Page
After the connection is successfully established, open the web browser on your phone or
computer and type 192.168.10.100 in the address bar. The username is admin, the
default password is 12345678.
![Login Page](docs/login.png)

## Advanced Settings
Change the data interval time to 1 minute
![Advanced Settings](docs/advancedsettings.png)

## System Restart
Restart your ShineWiFi-S module on this page, click “Restart Immediate” to
enable the new settings you just made and logout from the internal webserver of your
ShineWiFi module.
![System Restart](docs/restart.png)

**There is no change to the charts on growatt side. There you can only see a change in the data from the datalogger.**

----------------------------------------------------------------------------------------------------------------------

# German - Speedup data interval

## Du kannst das Protokollierungsintervall von 5 Minuten auf 1 Minute einstellen

Den Gummi vor dem KEY Button des ShineWiFi-S entfernen und den Button kurz drücken.
Der ShineWiFi-S spielt nun kurz Hotspot (SSID = Seriennummer des ShineWiFi-S). Beim Netz mit einem Laptop oder dem Handy anmelden.

## Einloggen
als Webadresse http://192.168.10.100 in der Browser eingeben.
Der Username ist Admin und das Passwort 12345678 (sollte man gleich auch mal ändern, geht in System Management).
![Login Page](docs/login.png)

## Advanced Settings
Auf "Advanced Settings" gehen und das Intervall ändern. (von 5 auf 1)
![Advanced Settings](docs/advancedsettings.png)

## System Restart
Auf System Restart gehen und Button herzhaft, aber vorsichtig Klicken.
![System Restart](docs/restart.png)

**Es gibt keine Änderung an den Diagrammen auf der Growatt-Seite, die bleiben bei 5min. Dort sehen Sie nur eine Änderung der Daten im Datenlogger.**

-*-

## Changelog

### 1.1.1 (27.05.2021)
* (PLCHome) The web request timeout was increased due to login issues

### 1.1.0 (24.05.2021)
* (PLCHome) Improvement of the connection via Axios Session

### 1.0.1 (05.03.2021)
* (PLCHome) Duplicate keys are transmitted, I try to filter them out.

### 1.0.0 (24.02.2021)
* (PLCHome) Read me
* (PLCHome) fix: Create a date from the time or calendar structure for last history data for all devices sometimes not working

### 0.0.20 (09.02.2021)
* (PLCHome) Create a date from the time or calendar structure for last history data for all devices

### 0.0.19 (05.02.2021)
* (PLCHome) The data from the chart is removed. These were only available in a 5-minute grid. The performance can now be queried via the history.
* (PLCHome) Objects of unselected data areas are now deleted.
* (PLCHome) You can choose objects to be ignored or deleted.
* (PLCHome) A link to the Growatt page was added, so the adapter now also appears in the overview.
* (PLCHome) Recently, Growatt has changed the spelling of values, which letters are uppercase and lowercase. For this reason, the objects are now handled internally Case Insensively. If a warning is written in the log after the update when starting, you have to delete one of the two objects. If a warning is written in the log after the update when starting, you have to delete one of the two objects. And then restart the adapter so that it definitely uses the remaining object to store the value.

### 0.0.18 (23.01.2021)
* (PLCHome) wrong version info.

### 0.0.17 (21.01.2021)
* (PLCHome) fixes a date issue on inverter history data.

### 0.0.16 (20.01.2021)
* (PLCHome) npm package version update
* (PLCHome) add last history for all plants. Special thanks to magix for the key, so i can test the inverter history function.

### 0.0.15 (04.12.2020)
* (PLCHome) npm package version update

### 0.0.14 (01.12.2020)
* (PLCHome) improvement for objects not returned from Growatt website

### 0.0.12 (27.11.2020)
* (PLCHome) wrong initialization for shared key: string instead of boolean

### 0.0.11 (27.11.2020)
* (PLCHome) Read me

### 0.0.10 (26.11.2020)
* (PLCHome) Shared key login
* (PLCHome) Last value of the graph if there are no live data.
* (PLCHome) Change of the polling interval

### 0.0.9 (05.10.2020)
* (PLCHome) fix no feature 'ADAPTER_AUTO_DECRYPT_NATIVE'

### 0.0.8 (05.10.2020)
* (PLCHome) fix io-package

### 0.0.7 (05.10.2020)
* (PLCHome) with "@iobroker/adapter-core": "^2.4.0", the js-controller dep needs to be >=2.0.0!
* (PLCHome) io-package native defined 5 values, admin sets 7
* (PLCHome) store password encrypted

### 0.0.6 (31.08.2020)
* (PLCHome) translation with ioBroker tool.

### 0.0.5
* (PLCHome) initial release.

### 0.0.1
* (PLCHome) initial release.


-*-

## License
MIT License

Copyright (c) 2021 PLCHome <https://github.com/PLCHome> <ioBroker@****.de>

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
