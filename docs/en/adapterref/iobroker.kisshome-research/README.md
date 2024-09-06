![Logo](admin/kisshome-research.png)
# ioBroker KISSHome research

![Number of Installations](http://iobroker.live/badges/kisshome-research-installed.svg)
![Number of Installations](http://iobroker.live/badges/kisshome-research-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.kisshome-research.svg)](https://www.npmjs.com/package/iobroker.kisshome-research)

![Test and Release](https://github.com/ioBroker/ioBroker.kisshome-research/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/kisshome-research/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.kisshome-research.svg)](https://www.npmjs.com/package/iobroker.kisshome-research)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

This special adapter was developed for the KISSHome research project. It is not intended for general use.

To use this adapter, you must first register on the [KISSHome research](https://kisshome-feldversuch.if-is.net) website and get the confirmation email.

To run this adapter, you need:
- More than 3 smart home devices
- Fritz!Box Router. Without `Fritz!Box`, the adapter will not work.
- iobroker must run on debian/raspbian (or at least on linux, where the following commands are available: `which`, `rsync`)

## Todo
Detect IP addresses from:
- [X] hm-rpc (Homematic CCU),
- [X] loxone,
- [X] shelly,
- [X] mqtt
- [X] tr-064,
- [-] alexa-2 - not possible, as alexa reads no IP addresses
- [X] sonoff,
- [X] modbus,
- [X] hue (philips hue),
- [-] tuya - not possible, It communicates with the cloud
- [X] mqtt-client,
- [-] synology - it is a multifunctional device - ignore it,
- [X] sonos,
- [X] mihome-vacuum,
- [ ] hmip (Homematic Cloud),
- [ ] homeconnect,
- [ ] wled (ESP8266/ESP32),
- [ ] unify,
- [X] harmony,
- [-] samsung (TV) - too many data,
- [-] onvif (Webkameras) - too many data,
- [-] kameras (URL oder IP-Kameras)  - too many data,
- [-] proxmox - not possible, as alexa reads no IP addresses
- [ ] broadlink2,
- [-] lgtv - too many data,
- [ ] knx (KNX-Gateway),
- [ ] lcn,
- [ ] homekit-controller,
- [ ] upnp,
- [X] openknx,
- [ ] meross

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 0.3.1 (2024-08-31)
* (bluefox) Added detection of some IPs

### 0.2.1 (2024-08-28)
* (bluefox) used valid URL address

### 0.1.1 (2024-08-20)
* (bluefox) Used MD5 for the file consistency check

### 0.1.0 (2024-08-19)
* (bluefox) File upload was implemented

### 0.0.3 (2024-08-14)
* (bluefox) Added the recording enabled option

### 0.0.2 (2024-07-22)
* (bluefox) Initial commit

## License
The MIT License (MIT)

Copyright (c) 2024 Denis Haev <dogafox@gmail.com>

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
