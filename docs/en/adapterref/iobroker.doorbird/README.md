![Logo](admin/doorbird.png)
# ioBroker.doorbird

[![NPM version](https://img.shields.io/npm/v/iobroker.doorbird.svg)](https://www.npmjs.com/package/iobroker.doorbird)
[![Downloads](https://img.shields.io/npm/dm/iobroker.doorbird.svg)](https://www.npmjs.com/package/iobroker.doorbird)
[![Tests](https://travis-ci.org/BuZZy1337/ioBroker.doorbird.svg?branch=master)](https://travis-ci.org/BuZZy1337/ioBroker.doorbird)

[![NPM](https://nodei.co/npm/iobroker.doorbird.png?downloads=true)](https://nodei.co/npm/iobroker.doorbird/)

## Configuration
1. Enter the IP on which the Adapter should listen to Events from the Doorbird Device.
(This is normally the IP of your ioBroker Host).
The adapter tries to prefill the field with the correct IP for you. If the prefilled IP is not the IP of your ioBroker Host please change it to the correct IP.
2. The Port is predefined to `8100`. You can change it if the Port is already used by another service.
Just try to run the Adapter with this Port. If the Port is not available you will get an error while starting the adapter. Then just get back here and change the port.
3. Enter the IP of your Doorbird device. You can click on the "search icon" left to the input field. After you clicked the icon a message at the top of the config screen will appear. Now you have 60 Seconds to press the ring button on your Doorbird device. The Adapter tries to detect the IP and fill all fields for you.
4. The Device ID (NOT IP!) of your Doorbird.
5. The Username which needs to have the API Permission on the Doorbird device.
6. The password for the Username entered in field 5.

![Screenshot](img/configscreen.png)

After you entered all required information to the config dialog click "Save & Close".
The Adapter should now restart, and you are ready to go!


## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.2.0-alpha.0 (2023-06-06)

* (mcm1957) Adapter has been moved into iobroker-community-adapters-area
* (mcm1957) Github actions and testing has been added
* (mcm1957) standard development tools have been added
* (mcm1957) dependencies have been upgraded

### 0.1.7 (2023-05-16)
* (todde99) Fixed js-controller 5 issue

### 0.1.5 (2018-09-18)
* (BuZZy1337) Check response of Doorbird when triggering relays
* (BuZZy1337) Check if any favorite has to be updated (For example when adapter address or port changes)
* (BuZZy1337) Added state for restarting DoorBird Device (There is a bug in DoorBird Firmware. DoorBird will fix it with next FW Update!)
* (BuZZy1337) Change some Code for working more with responses from DoorBird

### 0.1.0 (2018-09-08)
* (BuZZy1337) "public release"
* (BuZZy1337) Changed Adapter address option from dropdown list to input field
* (BuZZy1337) Added Support for triggering Doorbird-Relays

### 0.0.4
* (BuZZy1337) DO A COMPLETE REINSTALL OF THE ADAPTER (DELETE AND INSTALL THE ADAPTER AGAIN!)
DELETE ALL IOBROKER SCHEDULES AND THEN ALL IOBROKER FAVORITES IN YOUR DOORBIRD APP BEFORE STARTING 0.0.4!
* (BuZZy1337) Added support for more than one Doorbell Button
* (BuZZy1337) Encrypted saving of Doorbird Password
* (BuZZy1337) Detect and create Favorites & Schedules on the Doorbird Device.
* There is a Bug in the Doorbird Firmware for the Motion schedule! You can delete and set the Schedule for the Motion sensor in the App - that's a workaround for now.

### 0.0.3
* (BuZZy1337) Added possibility to choose the AdapterIP Address

### 0.0.2
* (BuZZy1337) Just added the info that the Adapter is not ready yet .. just to be sure! ;)

### 0.0.1
* (BuZZy1337) initial release

## License
The MIT License (MIT)

Copyright (c) 2023 iobroker-community-adapters <>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
