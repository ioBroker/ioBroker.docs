![Logo](admin/e3oncan_small.png)
# ioBroker.e3oncan

[![NPM version](https://img.shields.io/npm/v/iobroker.e3oncan.svg)](https://www.npmjs.com/package/iobroker.e3oncan)
[![Downloads](https://img.shields.io/npm/dm/iobroker.e3oncan.svg)](https://www.npmjs.com/package/iobroker.e3oncan)
![Number of Installations](https://iobroker.live/badges/e3oncan-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/e3oncan-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.e3oncan.png?downloads=true)](https://nodei.co/npm/iobroker.e3oncan/)

**Tests:** ![Test and Release](https://github.com/MyHomeMyData/ioBroker.e3oncan/workflows/Test%20and%20Release/badge.svg)

## e3oncan adapter for ioBroker

# Basic concept
Viessmann E3 series devices (One Base) are doing a lot of data exchange on CAN bus.

This adapter can listen to this communication and extract many useful information. The often used energy meter E380 CA also is supported.

In parallel **reading of data points** (ReadByDid) is supported. Informations not available via listening can be actively requested. The UDSonCAN protocol is also used by other equipment, e.g. by well known WAGO gateway.

**Writing of data points** via UDSonCAN (WriteByDid) is supported as well. By writing to data points it's possible to change setpoints, schedules and so on. It's even possible to add new schedules e.g. for domestic hot water circulation pump.

Writing of data is triggered by storing the corresponding state with `Acknowledged` not checked (ack=false) - yes, it's that simple! The data point will be read again from device and stored in the state 2.5 seconds after writing. If state not get's acknowledged, please take a look to the logs.

Writing is restricted to a set of data points using a **white list**. The list is stored in the info section of each device, e.g. at `e3oncan.0.vitocal.info.udsDidsWritable`. You can add more data points by editing this state. Make sure, **not** to check `Acknowledged` when saving the state.

During first start of adapter instance a device scan will be done providing a list of all available devices for configuration dialog.
A scan for data points of each device should be done during first setup.

Important parts of this adpater are based on the project [open3e](https://github.com/open3e).

A python based implementation of a pure listening approach using MQTT messaging is also availabe, see [E3onCAN](https://github.com/MyHomeMyData/E3onCAN).

# Getting started

**Preconditions:**
* You have a (USB to) CAN bus adapter connected to external CAN bus of Viessmann E3 device
* Currently only Linux based systems are supported.
* CAN adapter is up and visible in system, e.g. as "can0" (use ifconfig to check).
* Refer to open3e project for further details
* **Make sure, no other UDSonCAN client (e.g. Open3Eclient.py) is running during initial setup!** This could cause communication errors in both applications.

All services provided by this adapter are based on device list of your specific Viessmann E3 setup. Therefore you have to follow following steps for first setup:

**Configuration**
* When installation of adapter has finished a confuration dialog will show up to configure up to two CAN bus adapters (tab "CAN ADAPTER")
* Edit name of adapter and check the "Connect to adapter" checkbox at least for the external adapter
* When you're done, press "SAVE" button to apply the changes. This step is **mandatory**. The instance will restart and connect to the CAN adapter.
* Go to tab "LIST OF UDS DEVICES" and do a scan for devices available on bus by pressing the scan button. **This will take a few seconds.** You may watch the activities in a 2nd browser tab by looking on the logging info of the adapter.
* You may change the naming of the devices at 2nd column. Those names will be used to store all collected data in ioBoker's object tree. Again press "SAVE" button when you did your changes.
* Instance will restart again and after a few seconds you are ready to do a scan for available data points. Go to tab "LIST OF DATA POINTS", press button "Start scan ..." and confirm with "OK". **Please be patient** - this may take **up to 5 minutes**. You may watch the progress in a 2nd browser tab by looking on the logging info of the adapter.
This step is not mandatory but strongly recomended. If you would like to write to data points you need to do a data point scan first.
* When data point scan was completed successfully, the data points are available in the object tree for each device. You may view the data points in configuration by selecting a device and pressing button "Update list of data points". Press filter symbol and type search pattern to filter for name and/or codec. This is for your information only. Please deactivate filtering before selecting another device to avoid error messages.
* Last step is to configure schedules for collecting data on tab "ASSIGNMENTS TO EXTERNAL CAN ADAPTER".
* For **energy meter E380** (if available in your setup) you just can activate or not. Please notice the value "Min. update time (s)". Updates to single data points are done no faster than the given value (default is 5 seconds). By choosing zero every received data will be stored. Since E380 is sending data very fast (more than 20 values per second), it's recommended not to use zero here. This would put a high load on the ioBroker system.
* If you have connected E3 devices via CAN bus, e.g. Vitocal and VX3, you can collect data exchanged between those devices in realtime by listening. Press "+" to add a line, check "active" chackbox, select a device and edit "Min. update time (s)". It's feasable to use 0s here, however, I recommend to keep to the 5s.
* Finally, you may add schedules for requesting data via UDSonCAN protocol. Again press "+" button and edit the settings. You may have several schedules on each device. By this you can request some data points more often than others. Default value of 0 for "Schedule (s)" means, those data points will be requested just once during startup of the instance.
You may use data points informations on tab "LIST OF DATA POINTS" for reference (opening on 2nd tab could help).
* If you have configured a CAN adapter connected to the **internal CAN bus**, a tab "ASSIGNMENTS TO INTERNAL CAN ADAPTER" is visible. Please configure the devices for colletion there. UDSonCAN is not supported on internal CAN bus by E3 devices.
* That's it. Press "SAVE & CLOSE" button and check the data collected in object tree.

# E380 data and units

Up to two E380 energy meters are supported. IDs of data points depends on devices CAN address:

CAN-address=97: data points with even IDs

CAN-address=98: data points with odd IDs

| ID | Data| Unit |
| ------|:--- |------|
| 592,593 | Active Power L1, L2, L3, Total |  W |
| 594,595 | Reactive Power L1, L2, L3, Total | VA |
| 596,597 | Current, L1, L2, L3, cosPhi | A, - |
| 598,599 | Voltage, L1, L2, L3, Frequency | V, Hz |
| 600,601 | Cumulated Import, Export | kWh |
| 602,603 | Total Active Power, Total Reactive Power | W, VA |
| 604,605 | Cumulated Import | kWh |

# Hints and limitations

## This ioBroker adapter is under development and *beta stage*
* Data structure and functionality may chenge in future versions.
* You're welcome to test the adapter in your environment. Please give me feedback about your experience and findings.

## Why using data collection (listening only) and UDSonCAN (ReadByDid) in parallel?
* When you have connected E3 devices you can benefit of the exchanged data. By just listening you will receive available data in realtime right on changing. So you can get fast changing data (e.g. energy flow values) and slowly changing data (e.g. temperatures) directly on each change. You're up do date all time for those values.
* Other data, not or rarely available via collection, you can add via UDSonCAN ReadByDid. Typically for setpoint data this is best approach.
* Therfore from my point of view, combination of both methods is best approach.

## Limitation of collecting data
* At present, the communication protocol is known only for Vitocal (listener on CAN id 0x693), Vitocharge VX3 and Vitoair (both listener on CAN id 0x451).

## What is different to open3e project?
* Obviously, the main differece is the direct integration to ioBroker. Configuration can be done via dialogs, data get's directly listed in object trees.
* In addition to open3e real time collecting of data via listening is supported.
* Writing of data is much simpler. Just change the data in corresponding state and press Save button. 

## May open3e be used in parallel?
Yes, that is possible under certain conditions:
* If you only use data collecting here, you can use open3e with no limitiations.
* If you use UDSonCAN here, it's important not to do this for the same devices as open3e does. If you would do so, you will have sporadic communications errors.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.8.0 (2024-03-22)
* (MyHomeMyData) Added support for energy meter E380 with CAN-address=98
* (MyHomeMyData) Update of list of data points for E380 to version 20240320

### 0.7.2 (2024-03-20)
* (MyHomeMyData) Update of data type and role added for device specific data points
* (MyHomeMyData) Update list of writable data points when updating data points to newer version
* (MyHomeMyData) Improved handling of failed CAN communication during scan for data points
* (MyHomeMyData) Update of list of data points to version 20240319

### 0.7.1 (2024-03-15)
* (MyHomeMyData) Bugfix for data point 1190: Scaling changed back to 10.0
* (MyHomeMyData) Update of list of data points to version 20240314

### 0.7.0 (2024-03-13)
* (MyHomeMyData) Store numbers in states of channel "tree" with type "Number" instead of "String"
* (MyHomeMyData) IMPORTANT: This may affect handling of tree states, e.g. in scripts, vis and history
* (MyHomeMyData) Bugfix for Energy Meter E380 data point id 0x25C
* (MyHomeMyData) Update of list of data points to version 20240309
* (MyHomeMyData) Bugfix for update of changed data point structure during start of adapter
* (MyHomeMyData) Changed default values for CAN adapters to can0 and can1
* (MyHomeMyData) Increased value for collect timeout to 2000 ms

### 0.6.19 (2024-02-19)
* (MyHomeMyData) Check for changed structure of data points during startup
* (MyHomeMyData) Update of list of data points to version 20240218
* (MyHomeMyData) Bugfix to avoid warnings on very first start of adapter

### 0.6.18 (2024-02-08)
* (MyHomeMyData) Added versioning to list of data points and check for updates on start of adapter
* (MyHomeMyData) Added optional description in configuration of UDS schedules

### 0.6.17 (2024-01-29)
* (MyHomeMyData) Added/removed data points to/from list of writable dids
* (MyHomeMyData) Preparations for device specific list of writable dids

### 0.6.16 (2024-01-27)
* (MyHomeMyData) Improvements based on findings in review as of 2024-01-25
* (MyHomeMyData) Checkbox for data collectiton on internal bus is now checked per default

### 0.6.15 (2024-01-23)
* (MyHomeMyData) Fix for Utf8 codec for handling of special characters, e.g. umlauts

### 0.6.14 (2024-01-22)
* (MyHomeMyData) Replace '.' by '_' in data point ids to avoid unwanted sub structure in data states
* (MyHomeMyData) Added more informations about white list for writables in Readme.
* (MyHomeMyData) Recognize loss of CAN connection.
* (MyHomeMyData) Improved handling of info.connection.

### 0.6.13 (2024-01-20)
* (MyHomeMyData) Now supports multiple definitions of same schedule on a device 
* (MyHomeMyData) Added unit test cases for codecs

### 0.6.12 (2024-01-19)
* (MyHomeMyData) Added data points to list writable dids
* (MyHomeMyData) Added unit test cases for codecs
* (MyHomeMyData) Improved speed of codes for numerical values
* (MyHomeMyData) Improved error messages on UDS negative response

### 0.6.11 (2024-01-17)
* (MyHomeMyData) Improved layout of configuration dialog for device scan

### 0.6.10 (2024-01-15)
* (MyHomeMyData) Removed code for Rawmode because it's never activated

### 0.6.9 (2024-01-13)
* (MyHomeMyData) Bugfix: Only Linux is supported

### 0.6.8 (2024-01-13)
* (MyHomeMyData) Initial npm version

## License
MIT License

Copyright (c) 2024 MyHomeMyData <juergen.bonfert@gmail.com>

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