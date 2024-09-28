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

This adapter can listen to this communication and extract many useful information. Energy meter E380CA and E3100CB also are supported. This mode of operation is called **Collect**.

In parallel **reading and writing of data points** is supported. Informations not available via listening can be actively requested. By writing to data points it's possible to change setpoints, schedules and so on. It's even possible to add new schedules e.g. for domestic hot water circulation pump. This mode of operation is called **UDSonCAN**. The UDSonCAN protocol (**U**niversal **D**iagnostic **S**ervices based **on CAN** bus) is also used by other equipment, e.g. by well known WAGO gateway.

Writing of data is triggered by storing the corresponding state with `Acknowledged` not checked (ack=false) - yes, it's that simple! The data point will be read again from device and stored in the state 2.5 seconds after writing. If state not get's acknowledged, please take a look to the logs.

Writing is restricted to a set of data points using a **white list**. The list is stored in the info section of each device, e.g. at `e3oncan.0.vitocal.info.udsDidsWritable`. You can add more data points by editing this state. Make sure, **not** to check `Acknowledged` when saving the state.

During first start of adapter instance a device scan will be done providing a list of all available E3 devices for configuration dialog (energy meters are not listed).
A scan for data points of each E3 device should be done during first setup, details see below.

Which modes of operation (Collect and/or UDSonCAN) can be used depends on your **device topology**. Additional information is available [here](https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/34).

For possible **use cases** please refer to this [discussion](https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/35) (under construction).

Important parts of this adpater are based on the project [open3e](https://github.com/open3e).

A python based implementation of a pure listening approach (Collect only) using MQTT messaging is also availabe, see [E3onCAN](https://github.com/MyHomeMyData/E3onCAN).

Note: Support for **Node.js 22** not fully tested yet!

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
* For **energy meters** (if available in your setup) you just can activate or not. Please notice the value "Min. update time (s)". Updates to single data points are done no faster than the given value (default is 5 seconds). By choosing zero every received data will be stored. Since energy meters are sending data very fast (more than 20 values per second), it's recommended not to use zero here. This would put a high load on the ioBroker system.
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
| 594,595 | Reactive Power L1, L2, L3, Total | var |
| 596,597 | Absolute Current, L1, L2, L3, cosPhi | A, - |
| 598,599 | Voltage, L1, L2, L3, Frequency | V, Hz |
| 600,601 | Cumulated Import, Export | kWh |
| 602,603 | Total Active Power, Total Reactive Power | W, var |
| 604,605 | Cumulated Import | kWh |

# E3100CB data and units

| ID | Data| Unit |
| ------|:--- |------|
| 1385_01 | Cumulated Import | kWh |
| 1385_02 | Cumulated Export | kWh |
| 1385_03 | State: -1 => feedin \| +1 => supply | |
| 1385_04 | Active Power Total |  W |
| 1385_08 | Active Power L1 |  W |
| 1385_12 | Active Power L2 |  W |
| 1385_16 | Active Power L3 |  W |
| 1385_05 | Reactive Power Total | var |
| 1385_09 | Reactive Power L1 | var |
| 1385_13 | Reactive Power L2 | var |
| 1385_17 | Reactive Power L3 | var |
| 1385_06 | Current, Absolute L1 | A |
| 1385_10 | Current, Absolute L2 | A |
| 1385_14 | Current, Absolute L3 | A |
| 1385_07 | Voltage, L1 | V |
| 1385_11 | Voltage, L2 | V |
| 1385_15 | Voltage, L3 | V |

# Hints and limitations

## Why using data collection (mode Collect) and UDSonCAN in parallel?
* When you have connected E3 devices you can benefit of the exchanged data ([more details](https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/34)). By just listening you will receive available data in realtime right on changing. So you can get fast changing data (e.g. energy flow values) and slowly changing data (e.g. temperatures) directly on each change. You're up do date all time for those values.
* Other data, not or rarely available via collection, you can add via UDSonCAN ReadByDid. Typically for setpoint data this is best approach.
* Therfore from my point of view, combination of both methods is best approach.

## Limitation of collecting data
* At present, the communication protocol is known only for Vitocal (listener on CAN id 0x693 on internal CAN), Vitocharge VX3 and Vitoair (both listener on CAN id 0x451 on external CAN).

## What is different to open3e project?
* Obviously, the main differece is the direct integration to ioBroker. Configuration can be done via dialogs, data get's directly listed in object trees.
* In addition to open3e real time collecting of data via listening is supported.
* Writing of data is much simpler. Just change the data in corresponding state and press Save button.
* Exchanging data via MQTT is not neccessary. However it's of course available via configuration of data states.

## May open3e be used in parallel?
Yes, that is possible under certain conditions:
* If you only use data collecting here, you can use open3e with no limitiations.
* If you use UDSonCAN here, it's important not to do this for the same devices as open3e does. If you would do so, you will have sporadic communications errors.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.9.5 (2024-09-19)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20240916

### 0.9.4 (2024-08-26)
* (MyHomeMyData) Start up an UDS worker for each device to allow writing of data points even when no schedule for reading is defined on this device
* (MyHomeMyData) Update of npm dependencies

### 0.9.3 (2024-08-20)
* (MyHomeMyData) Bugfix: Updating UDS communication statistics, even in case of persistent timeout events
* (MyHomeMyData) Disabled sinon should interface
* (MyHomeMyData) Fixes based on issues #55,#56
* (MyHomeMyData) Bugfix: Time delta between schedules of UDS workes was not working properly

### 0.9.2 (2024-08-09)
* (MyHomeMyData) Update of dependencies, fixes based on issue #53
* (MyHomeMyData) Update of list of data points for E3 devices to version 20240808

### 0.9.1 (2024-05-26)
* (MyHomeMyData) Updated README, added links for description of device topology and to uses cases
* (MyHomeMyData) Added info for data points 2404_BivalenceControlMode and 2831_BivalenceControlAlternativeTemperature
* (MyHomeMyData) Update of list of data points for E3 devices to version 20240505

### 0.9.0 (2024-04-21)
* (MyHomeMyData) Structure of data point 1690 (ElectricalEnergySystemPhotovoltaicStatus) changed based on issue https://github.com/MyHomeMyData/E3onCAN/issues/6. Manual adaptations may be needed, please check!
* (MyHomeMyData) Update of list of data points for E3 devices to version 20240420
* (MyHomeMyData) Added support for energy meter E3100CB
* (MyHomeMyData) Update of list of data points for E380 to version 20240418
* (MyHomeMyData) Main change for E380 id 600/601 (GridEnergy): Now using correct data format. Many thanks to @M4n197 for unveiling the right data format. Manual adaptations may be needed, please check!

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