![Logo](admin/wireless-settings.png)

# ioBroker.wireless-settings

[![NPM version](http://img.shields.io/npm/v/iobroker.telemetry.svg)](https://www.npmjs.com/package/iobroker.wireless-settings)
[![Downloads](https://img.shields.io/npm/dm/iobroker.telemetry.svg)](https://www.npmjs.com/package/iobroker.wireless-settings)
![Number of Installations (latest)](http://iobroker.live/badges/wireless-settings-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/wireless-settings-stable.svg)
[![Dependency Status](https://img.shields.io/david/ioBroker/iobroker.wireless-settings.svg)](https://david-dm.org/ioBroker/iobroker.wireless-settings)
[![Known Vulnerabilities](https://snyk.io/test/github/ioBroker/ioBroker.wireless-settings/badge.svg)](https://snyk.io/test/github/ioBroker/ioBroker.wireless-settings)

[![NPM](https://nodei.co/npm/iobroker.telemetry.png?downloads=true)](https://nodei.co/npm/iobroker.wireless-settings/)

## Adapter for Wi-Fi and wireless settings on Raspberry Pi

This adapter can set up the wireless on Raspberry Pi. It can be used to connect or disconnect from wireless networks.

**Tested only on Raspberry Pi 5**

## Required permissions

This adapter assumes that `iobroker` user may execute the following commands:

-   `/usr/bin/nmcli`

You can add the rights by calling:

```shell
sudo chmod +x /opt/iobroker/node_modules/iobroker.wireless-settings/wlan_rights.sh
sudo /opt/iobroker/node_modules/iobroker.wireless-settings/wlan_rights.sh
```

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### **WORK IN PROGRESS**

-   (@GermanBluefox) Small layout changes

### 1.0.2 (2024-10-04)

-   (@GermanBluefox) Updated for raspberry 5
-   (@GermanBluefox) Change name to "wireless-settings"

### 0.4.0 (2024-10-03)

-   (@GermanBluefox) Change name to "network-settings"

### 0.3.0 (2023-06-27)

-   (@GermanBluefox) Change name to "network-settings"

### 0.2.2 (2023-06-27)

-   (@GermanBluefox) Updated the GUI to the latest version

### 0.1.0 (2021-01-18)

-   (ioBroker) fixed build scripts

### 0.0.1 (2021-01-18)

-   (ioBroker) initial release

## License

MIT License

Copyright (c) 2021-2024 @GermanBluefox <dogafox@gmail.com>

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
