![Logo](admin/glogo.png)

## ioBroker.growatt

![NPM version](http://img.shields.io/npm/v/iobroker.growatt.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.growatt.svg)
![Number of Installations (latest)](https://iobroker.live/badges/growatt-installed.svg)
![Number of Installations (stable)](https://iobroker.live/badges/growatt-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.growatt.png?downloads=true)](https://nodei.co/npm/iobroker.growatt/)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

This adapter works through Growatt's cloud servers. There is also the [Grott project](https://github.com/johanmeijer/grott) that intercepts the data from the communication.

---

### growatt adapter for ioBroker

ioBroker Growatt Adapter to communiacte with Growatt Shine Server.
I'm not affiliated.
Usually, the data is sent from the data logger to the cloud every 5 minutes.
You can change it, see below.

Not all plant types are implemented.

Currently only data can be read, writing parameters or changing parameters is not possible.

### Can I spend a coffee?

Of course if you like my work via Paypal to PLChome _at_ fontanestr _dot_ de

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

#### Read fault log entries

Reads the entries in the fault log of the current year and creates objects with the messages for this. Only the first page with the most current reports is read.

#### Write inverter settings

If this is activated, some settings can be edited for some inverters.

Objects are created below the inverter serial number element for the settings. A channel is created for each setting.

Below the objects are "read", "write", "msg" and and the node values. Below the values are parameters.

If the values of the parameters could be read, they are written with ACK=true. "read" is set to true on successful reading with ack. If reading fails, "Read" is set to false ack=true. Writing to "Read" from "true" without ACK triggers a read operation. If a new connection to the cloud is established, the settings are also read out.

To write the settings, the parameters must first be set. Then "write" is set to true with ack=false.
If the data was written successfully, "write" is set to "true" ack=true, if the inverter reported an error, "write" is set to "false" ack=true. In addition, the return message of the inverter is written to the "msg" status.

If writing was successful, reading is automatically triggered.

The inverter can only change one setting at a time and the transmission path is from ioBroker via the cloud to the WLAN adapter and then to the inverter. The settings are processed one after the other via a queue. A session time that is too short can lead to problems.

The writing of the settings was developed to the best of our knowledge. However, the author does not assume liability for errors contained in or for damages arising from the use of the software.

#### Select it if your Growatt page is a black C&I page

Select it if your Growatt page is a C&I Plant page with indexbC or plantDo in the Path of the Growatt webinterface.

The black C&I pages (commercial and industrial) have an other path to the objects but it semms to work if this Checkbox is on. It Changed index to indexbC in the webpath.

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
There are a lot of values that do not belong to your inverter. These can be removed here.
Since there is no event with which the object list can be reloaded when saving. The update button must be used when save is pressed.

#### Normal

The object remains, the value is updated.

#### Delete

The object is deleted and the value loaded by the inverter is discarded.
After the update, only the ID and the action are displayed because the object no longer exists. If you select normally, the object will be created again after saving.

#### No update

The object remains, the values from the inverter are discarded.

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

## sendTo for scripts

It is possible to send a command to the instance via sendTo. The adapter then responds.
The following commands are implemented.
The return value is returned depending on the parameter transfer. If the parameters are passed as a JSON string, a JSON is returned. If the parameters are passed as an object, an object is returned.

### getHistory

This command lists the history. It can be used, for example, to supplement data in a database.
Regardless of the time range, Growatt always seems to return 80 records. If the interval is set to 1 minute and more than 80 minutes are needed, the command must be executed several times and the start from 0 must be increased more and more.

| Parameter | Type    | Description                                                                                                  |
| --------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| type      | String  | The type of inverter can be found in object "growatt. - instance - . - nr - .devices. - sn - .growattType".  |
| sn        | String  | The serialnumber of inverter can be found in object path "growatt. - instance - . - nr - .devices. - sn - ". |
| startDate | Date    | The atart                                                                                                    |
| endDate   | Date    | The end mast be grater then start                                                                            |
| start     | Integer | 0 is the start page for the call with the most recent data first                                             |

Example call:

```
  sendTo('growatt.0','getHistory',{"type":"<your inverter type>","sn":"<your inverter serial>","startDate":new Date((new Date()).getTime()- 60*60*1000),"endDate":new Date() , "start":0},(res)=>{console.log(res)})
```

Example code:

```
const sn = " your sn "; //your inverter sn
const inType = " your typ "; // the invertertyp
const hist = 'growatt.0. your nr .devices. your sn .historyLast.'; // the Path to history
const storeField =['accChargePower','etoGridToday']; //the fields to store
const history = "influx.0" //your History sql.0 or influx.0 or history.0 ...
const min = 10 // größer 10 min auffüllen....

on({id: hist+'calendar', change: "ne"},(obj)=>{
    if ((obj.state.val - obj.oldState.val) > min*60000) {
        console.log(obj.state.val - obj.oldState.val);
        function fillup(res) {
            res.forEach((r)=>{
                const ti = (new Date(r.calendar)).getTime();
                if (ti > obj.oldState.val && ti < obj.state.val) {
                    function store(n) {
                        sendTo(history, 'storeState', {
                            id: hist+n,
                            state: {ts: ti, val: r[n], ack: true}
                        }, result => {console.log(`added ${hist+n} ${new Date(ti)} ${r[n]}`)});
                    }
                    storeField.forEach((f) => {store(f)});
                }
            })
        }
        sendTo('growatt.0','getHistory',{"type":inType,"sn":sn,"startDate":obj.oldState.val,"endDate":obj.state.val, "start":0},fillup)
        sendTo('growatt.0','getHistory',{"type":inType,"sn":sn,"startDate":obj.oldState.val,"endDate":obj.state.val, "start":1},fillup)
        sendTo('growatt.0','getHistory',{"type":inType,"sn":sn,"startDate":obj.oldState.val,"endDate":obj.state.val, "start":2},fillup)
        sendTo('growatt.0','getHistory',{"type":inType,"sn":sn,"startDate":obj.oldState.val,"endDate":obj.state.val, "start":3},fillup)
    }
});
```

### getDatalogger

It gives you information about the dataloggers.
This function has no parameters. Either "{}" or {} must be passed.
The return is an array of object.

| Parameter | Type | Description |
| --------- | ---- | ----------- |

### getDataLoggerIntervalRegister

It reads out the interval and returns it. the return value is an OBJ. The interval is in msg.

| Parameter | Type   | Description                                                   |
| --------- | ------ | ------------------------------------------------------------- |
| sn        | string | The serial number of the logger is returned by getDatalogger. |

### setDataLoggerIntervalRegister

Writes the interval at which the logger sends the data.

| Parameter | Type    | Description                                                   |
| --------- | ------- | ------------------------------------------------------------- |
| sn        | string  | The serial number of the logger is returned by getDatalogger. |
| value     | integer | The new value in minutes                                      |

An object is returned with a message.

### getDataLoggerIpRegister

It reads the IP to which the logger sends the data and returns it. The return value is an OBJ. The IP is in msg.

| Parameter | Type   | Description                                                   |
| --------- | ------ | ------------------------------------------------------------- |
| sn        | string | The serial number of the logger is returned by getDatalogger. |

### setDataLoggerIp

It writes the IP to which the logger sends the data. It's useful for the Grott project. The return value is an object that says what happened.

| Parameter | Type    | Description                                                   |
| --------- | ------- | ------------------------------------------------------------- |
| sn        | string  | The serial number of the logger is returned by getDatalogger. |
| value     | integer | The new value in minutes                                      |

An object is returned with a message.

### getDataLoggerPortRegister

It reads the port to which the logger sends the data and returns it. The return value is an OBJ. The IP is in msg.

| Parameter | Type   | Description                                                   |
| --------- | ------ | ------------------------------------------------------------- |
| sn        | string | The serial number of the logger is returned by getDatalogger. |

### setDataLoggerPort

It writes the port to which the logger sends the data. It's useful for the Grott project. The return value is an object that says what happened.

| Parameter | Type    | Description                                                   |
| --------- | ------- | ------------------------------------------------------------- |
| sn        | string  | The serial number of the logger is returned by getDatalogger. |
| value     | integer | The new value in minutes                                      |

An object is returned with a message.

### checkLoggerFirmware

Calls up the firmware check from the logger. If an update is necessary, you can see it in the answer.

| Parameter | Type   | Description                                                   |
| --------- | ------ | ------------------------------------------------------------- |
| sn        | string | The serial number of the logger is returned by getDatalogger. |

### restartDatalogger

Causes a warm start of the data logger.

| Parameter | Type   | Description                                                   |
| --------- | ------ | ------------------------------------------------------------- |
| sn        | string | The serial number of the logger is returned by getDatalogger. |

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

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### 3.3.1 (2024-10-26)

- (PLCHome) Added ac charge for TLXH. Thanx to olli0815!
- (PLCHome) Added time slots for TLXH. Thanks to olli0815 for debugging and support.
- (PLCHome) Added Inverter On Off for TLX und TLXH. Thanks to olli0815 for debugging and support.

### 3.3.0 (2024-10-25)

- (PLCHome) Added time slots for TLXH. Thanks to olli0815 for debugging and support.
- (PLCHome) Added Inverter On Off for TLX und TLXH. Thanks to olli0815 for debugging and support.

### 3.2.5 (2024-08-13)

- (PLCHome) Solved the problem that no inverter list but result 2 was returned in NOAH.
- (PLCHome) Added NOAH.

### 3.2.4 (2024-07-03)

- (PLCHome) Configure this adapter to use the release script.
- (PLCHome) no connection can be established password must now be transferred as MD5 hash.
- (PLCHome) cookie issue

### 3.2.3 (27.01.2024)

- (PLCHome) In Multiple Backflow the objects in Total Data and Status Data were swapped. Please delete the objects below Total Data and Status Data and restart the adapter after the update.

### 3.2.2 (27.01.2024)

- (PLCHome) Catching of the fault log messages is now possible (Thanx to ZioCain for the code)
- (PLCHome) Setting active power for MAX inverter (Thanx to sefina for testing)

### 3.2.1 (08.09.2023)

- (PLCHome) Additionally query the status information via the Plant List.

### 3.2.0 (01.09.2023)

- (PLCHome) Added inverter typ singleBackflow and multipleBackflow

### 3.1.2 (16.08.2023)

- (PLCHome) sendTo now also possible with objects as message data
- (PLCHome) Added message getHistory

### 3.1.1 (03.07.2023)

- (PLCHome) Added support for Growatt page when Plant is a C&I Plant page with indexbC or plantDo in Path of the Growatt web interface. Thanks to Denn281

### 3.0.4 (03.07.2023)

- (PLCHome) No retrieval of the other parameters value possible after parameter error
- (PLCHome) Grid first and Battery first setting on MIX may not work

### 3.0.3 (27.06.2023)

- (PLCHome) setting for tlx/tlxh time improved

### 3.0.2 (08.06.2023)

- (PLCHome) Write inverter settings, it can be activated via the config

  - mix
    - Time
    - Grid first
    - Battery first
    - Inverter On/Off
    - LoadFirst
    - Failsafe
    - PV active power rate
    - Backflow setting
      - Backflow setting power
    - EPSOn
  - tlx/tlxh
    - Time
    - PV active power rate

### 2.1.1 (17.04.2023)

- (PLCHome) Calendar structure was not always changed to timestamp
- (PLCHome) Improvement in the internal handling of objects without considering their case.

### 2.1.0 (14.04.2023)

- (PLCHome) Status data now also from TLX/TLXH
- (PLCHome) TLX Hybrid is now working
- (PLCHome) If there are different inverters, these are now shown

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

- (PLCHome) Apple devices cannot open the adapter's config page with Safari, all values are empty

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

Copyright (c) 2024 PLCHome

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
