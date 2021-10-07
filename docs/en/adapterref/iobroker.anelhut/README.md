![Logo](admin/anelhut.png)

# ioBroker.anelhut

[![NPM version](http://img.shields.io/npm/v/iobroker.anelhut.svg)](https://www.npmjs.com/package/iobroker.anelhut)
[![Downloads](https://img.shields.io/npm/dm/iobroker.anelhut.svg)](https://www.npmjs.com/package/iobroker.anelhut)
![Number of Installations (latest)](http://iobroker.live/badges/anelhut-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/anelhut-stable.svg)
[![Dependency Status](https://img.shields.io/david/dan1-de/iobroker.anelhut.svg)](https://david-dm.org/dan1-de/iobroker.anelhut)
[![Known Vulnerabilities](https://snyk.io/test/github/dan1-de/ioBroker.anelhut/badge.svg)](https://snyk.io/test/github/dan1-de/ioBroker.anelhut)

[![NPM](https://nodei.co/npm/iobroker.anelhut.png?downloads=true)](https://nodei.co/npm/iobroker.anelhut/)

**Tests:** ![Test and Release](https://github.com/dan1-de/ioBroker.anelhut/workflows/Test%20and%20Release/badge.svg)

## anelhut adapter for ioBroker

Adapter for the NET-PwrCrtl devices of ANEL Electronic AG.
Manufacturer: https://shop.anel.eu/

## This adapter is working with the following anel devices:

-   NET-PwrCtrl HUT
-   NET-PwrCtrl IO
-   HOME
-   PRO
-   POWER
-   ADV

## Usage

-   Install adapter

-   Configure Devices

    -   Enable UDP Communication on your Anel device
    -   Insert the properties of your Anel device

        -   DeviceName: Custom Name of your device. This name is used to display the device in the objects list. Example: anelhut.0.DeviceName
        -   DeviceIP: IP Adress of your device (please use no hostname)
        -   UDPSendPort: Insert the port which is shown in the webinterface of your Anel device. This is the recieve port from the view of the anel device (default: 75).
        -   UDPRecievePort: Insert the port which is shown in webinterface of your Anel device. This is the send port from the view of the anel device (default: 77).

        Important note: If you want to controll multiple devices, please use a different recieve port for each device.
        For example you can use port 77 for the first device and 78 for the second and 79 for the third and so on.
        If you only use one device, you can use the default port 77.
        For the send port the default port 75 can be used for all devices.
        You can change the ports on the webinterface of the device.

-   Docker
    -   Don't forget the port forwarding, if you like to use this adapter with a docker environment:
        -   77:77/udp #port forwarding first anel device
        -   78:78/udp #port forwarding second anel device

## Note

This adapter was tested with all Anel devices. Thanks to the anel developer :).
Please report any issues.

## Changelog

### 1.0.8

-   (dan1-de) Quick Fix: Corrected bug in io control

### 1.0.7

-   (dan1-de) Added possibility to control IO's; Code restructure

### 1.0.6

-   (dan1-de) Fixed issues with sensor; display only 3 relais at anel home device; display type code instead of only letter; fixed temperature

### 1.0.4

-   (dan1-de) New Icon; Improved object structure

### 1.0.3

-   (dan1-de) Improvements: logging, udp broadcast adress, configuration

### 1.0.0

-   (dan1-de) initial release

## License

MIT License

Copyright (c) 2021 dan1-de <dan1-de@gmx.de>

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
