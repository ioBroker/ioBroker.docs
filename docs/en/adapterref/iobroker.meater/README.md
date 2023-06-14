![Logo](admin/meater.png)

# ioBroker.meater

[![NPM version](https://img.shields.io/npm/v/iobroker.meater.svg)](https://www.npmjs.com/package/iobroker.meater)
[![Downloads](https://img.shields.io/npm/dm/iobroker.meater.svg)](https://www.npmjs.com/package/iobroker.meater)
![Number of Installations](https://iobroker.live/badges/meater-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/meater-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.meater.png?downloads=true)](https://nodei.co/npm/iobroker.meater/)

**Tests:** ![Test and Release](https://github.com/Standarduser/ioBroker.meater/workflows/Test%20and%20Release/badge.svg)

## Meater adapter for ioBroker

This adapter brings your MEATER Wireless Meat Thermometer into ioBroker.

It fetches the data from your probe via MEATER cloud API. You can configure 2 intervalls:

1. Update interval when all probes are idle (not cooking)
2. Update interval when minimum 1 cooking session is startet

## Prerequisites

You need to set up a MEATER cloud account (use the smartphone app) and activate MEATER Link.

## Configuration

-   `Username for MEATER cloud`: your registered e-mail adress
-   `Password for MEATER cloud`: the password you used for cloud access
-   `Language`: Some (not all!) values will be translated, e.g. the name of meat
-   `Update interval idle`: time in seconds how often data from cloud should be fetched
-   `Update interval cook`: time is seconds how often data from cloud should be fetched when a cook senssion is active
-   `Temperature unit`: Used to create unit in ioBroker states. Set this to the same unit as you are using in the app. If unit is changed after creating states, delete all probe states and restart adapter
-   `Clear old values`: the MEATER cloud API just sends values for active probes/running cooking sessions. If a session has ended you don't get updates of temperature and status. Activate this checkbox to clear old values which got no update to avoid misunderstandigs.

## Use the adapter

After set-up the adapter it will login automatically into MEATER cloud and fetch its data.

If you don't see any probe and/or values start a cooking session and wait for a moment. You may have to heat the probe to get any values (hot water works fine for testing).

## DISCLAIMER

MEATER® is a trademark of Apption Labs™ Limited.
This adapter uses the [public API](https://github.com/apption-labs/meater-cloud-public-rest-api)

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.0.0 (2023-05-12)

-   (Standarduser) First stable release

## License

MIT License

Copyright (c) 2023 Standarduser

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
