![Logo](admin/shrdzm.png)
# ioBroker.shrdzm

[![NPM version](http://img.shields.io/npm/v/iobroker.shrdzm.svg)](https://www.npmjs.com/package/iobroker.shrdzm)
[![Downloads](https://img.shields.io/npm/dm/iobroker.shrdzm.svg)](https://www.npmjs.com/package/iobroker.shrdzm)
![Number of Installations (latest)](http://iobroker.live/badges/shrdzm-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/shrdzm-stable.svg)
![Test and Release](https://github.com/mcm4iob/ioBroker.shrdzm/workflows/Test%20and%20Release/badge.svg)

[![License](https://img.shields.io/github/license/mcm4iob/ioBroker.shrdzm?style=flat)](https://github.com/mcm4iob/ioBroker.shrdzm/blob/main/LICENSE)
[![Donate](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)](https://paypal.me/mcm1957atIoBroker)
[![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/mcm1957)

**************************************************************************************************************
## Sentry
**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.**
For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

**************************************************************************************************************

## shrdzm adapter for ioBroker

This adapter integrates the SHRDZM smartmeter interface available from *SHRDZM IT Services e.U.* into ioBroker. A descritpion of the interface is available [here](https://cms.shrdzm.com/produkt/smartmeter-modul/).

Note that this adapter is not related to the company mentioned above in any way and that no commercial relationship exists at all.

**************************************************************************************************************

## Disclaimer
**All product and company names or logos are trademarks™ or registered® trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them or any associated subsidiaries! This personal project is maintained in spare time and has no business goal.**

**************************************************************************************************************

## Configuration

Install and setup you SHRZDM interface as described by the manufactures documentation. This adapter connects to the interface using an udp (IPv4) connection. The following steps are required to start operation:

- install iobroker Adapter the usual way
- open ioBroker adminUI interface to configure the adapter
- select a free port at adminUI, default is set to port 9000 but any free prot can be used.

- open SHRZDM configuration interface (using a webbrower) 
![alt text](./doc/shrzdm-cloud.pgn)
- select cloud configuration
- enter ip address (IPv4 only) of your ioBroker host and port number selected into field 'Server'
- aktivate 'UDP send'
- save cloud settings

The SHRDZM device shoul start to send data immeidiatly at the intervall configured at page 'settings'. 

## Operation

The adapter will create states for all obos data received from all devices. If you have multipleSHRZDM devices installed and want to limit the devices accepted, you can enter a list of allowed devices into the configuration of the adapter. If no devices are configured, data from all senders will be accepted.

## FAQ

#### Updates occure too often

Updates of live data are performed whenever new is recieved from SHRDZM device. To reduce the amount of data sent by the device adjust the interval paramater at "settings" page of the device.

**************************************************************************************************************

**If you like it, please consider a donation:**
  
[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mcm1957atIoBroker)

**************************************************************************************************************

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.2.0 (2025-04-06)
* (mcm1957) Online indicator has been added to objectview.
* (mcm1957) Translations have been updated.
* (mcm1957) Descriptions have been added to all states and at adminUI.
* (mcm1957) Raw data received from devices can be stored for analyses now.
* (mcm1957) Adapter can handle multiple networks now. 
* (mcm1957) Dependencies have been updated.

### 0.1.1 (2025-03-17)
* (mcm1957) translations have been reviewed and fixed

### 0.1.0 (2025-03-15)
* (mcm1957) initial release

## License
MIT License

Copyright (c) 2025 mcm1957 <mcm57@gmx.at>

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
