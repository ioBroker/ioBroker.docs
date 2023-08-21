![Logo](admin/tractive-gps.png)
# ioBroker.tractive-gps

[![NPM version](https://img.shields.io/npm/v/iobroker.tractive-gps.svg)](https://www.npmjs.com/package/iobroker.tractive-gps)
[![Downloads](https://img.shields.io/npm/dm/iobroker.tractive-gps.svg)](https://www.npmjs.com/package/iobroker.tractive-gps)
![Number of Installations](https://iobroker.live/badges/tractive-gps-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/tractive-gps-stable.svg)

**Tests:** ![Test and Release](https://github.com/xXBJXx/ioBroker.tractive-gps/workflows/Test%20and%20Release/badge.svg)

## tractive-gps adapter for ioBroker

### DISCLAIMER

All product and company names or logos are Trademarks™ or Registered® Trademarks of their respective owners. Their use does not imply any
Affiliation or endorsement by them or associated affiliates! This personal project is being pursued on a recreational basis and
Has no business objectives. **[Tractive](https://tractive.com/de/)** is a trademark of **Tractive GmbH**.

### Sentry
**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.**\
For more details and for information on how to disable error reporting, see.
[Sentry Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reports are used starting with js-controller 3.0
are used.

### Description
This adapter allows you to connect to the Tractive GPS service and retrieve the location of your pets.\
The adapter creates a device for each pet and a status for each location.\
The adapter also creates a status for the tracker's battery level and many other statuses provided by the API.

### Prerequisites
To use this adapter, you must have a Tractive account and have a tracker for your pet (see
[Tractive](https://tractive.com/de/)) ( **Caution:** Monthly / Annual fee for using the Tractive service )

### Installation
The adapter is installed via the ioBroker adapter manager.\
**Caution:** The adapter requires at least Node.js >= 16 and js-controller 3.3.22 and admin >=6!
After installation you have to log in with your Tractive account and set the polling interval.\
The adapter will then fetch a token from the Tractive API and store it in the configuration. This token has an expiration time which will be renewed automatically
renewed automatically when it expires.

### Configuration
In the adapter configuration there are two setting options:
* **Login**.
  1. here you can login with your Tractive account.\
  2. set the polling interval.\
  3. manually reissue the token.\

  ![instances-tractive-gps-login.png](admin%2Fimages%2Finstances-tractive-gps-login.png)

* **All devices** - A list of all devices found by the adapter is displayed here. You can change the name of the device in the list.
  this will then also be displayed in the objects.\
  ![instances-tractive-gps-allDevices-table.png](admin%2Fimages%2Finstances-tractive-gps-allDevices-table.png)
  to change the name click on the pencil icon and enter the new name.
  ![instances-tractive-gps-allDevices-modal.png](admin%2Fimages%2Finstances-tractive-gps-allDevices-modal.png)

### Tab
In the Tab all found devices are displayed with a map and some information about the device.\
![tab-tractive-gps.png](admin%2Fimages%2Ftab-tractive-gps.png)
The image can also be replaced with the animal's own image.\
To do this, a PNG file with the name of the tracker (e.g. ZSDLINVD.png) must be placed in the folder **iobroker-data/files/tractive-gps**.
Or you can use the tab **files** to upload the file. (see image below)\
**The recommended size for the image is 1920x1080 pixels.**\
![files-tractive-gps.png](admin%2Fimages%2Ffiles-tractive-gps.png)




## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.2 (2023-02-24)
* (xXBJXx) Dependencies updated
* (xXBJXx) UI updated

### 0.1.1 (2023-02-05)
* (xXBJXx) Dependencies updated

### 0.1.0 (2023-02-05)
* (xXBJXx) first release

## License
MIT License

Copyright (c) 2023 xXBJXx <issi.dev.iobroker@gmail.com>

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