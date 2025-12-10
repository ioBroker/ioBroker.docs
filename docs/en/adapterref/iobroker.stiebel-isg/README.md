![Logo](admin/stiebel-isg.png)

# ioBroker.stiebel-isg

[![NPM version](https://img.shields.io/npm/v/iobroker.stiebel-isg.svg)](https://www.npmjs.com/package/iobroker.stiebel-isg)
![Version (stable)](https://iobroker.live/badges/stiebel-isg-stable.svg)
[![Downloads](https://img.shields.io/npm/dm/iobroker.stiebel-isg.svg)](https://www.npmjs.com/package/iobroker.stiebel-isg)
![Number of Installations (latest)](https://iobroker.live/badges/stiebel-isg-installed.svg)

**Tests:** ![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.stiebel-isg/workflows/Test%20and%20Release/badge.svg)

[![NPM](https://nodei.co/npm/iobroker.stiebel-isg.svg?data=d,s)](https://www.npmjs.com/package/iobroker.stiebel-isg)

## ioBroker adapter for STIEBEL ELTRON/Tecalor Internet Service Gateways (ISG)

This adapter reads values from STIEBEL ELTRON/Tecalor Internet Service Gateways (ISG) web pages and can send commands to control the device.

**NOTE:** This adapter has been tested with legacy ISG devices only. (ISG Plus and ISG Web). Whether it works with the current ISG Connect device is to be determined yet.

**NOTE:** This adapter has been transferred to iobroker-community-adapters for maintenance. Only important bug fixes and dependency updates will be released in the future. However PRs with bug fixes or feature enhancements are always welcome.

**Credits:** This adapter would not have been possible without the great work of Michael Schuster (unltdnetworx) <https://github.com/unltdnetworx>, who created previous releases of this adapter.

## Release Notes

**Caution:** Version 2.0.x includes some Breaking Changes:

* node.js >= 20, js-controller >= 6.0.11 and admin >= 7.6.17 is required  
Upgrade your ioBroker to at least this software level, if you want to use this adapter

* Password and username encryption in config UI  
If you update this adapter from a previous version instead of a new installation, the adapter may not start, even if your password and username in your config is correct and has not been changed. To fix this, simply enter the same previous password and username once more in the config UI and store and close the config UI to restart the adapter. This of course is only neccessary once after the first start after the update.

* The type and/or name of some objects in the object tab has changed  
If you update this adapter from a previous version instead of a new installation, you may possibly find warnings in the ioBroker log or object values and/or names are not updated correctly. To prevent this from happening, the most simple solution is to stop the adapter in the instances tab of ioBroker, completely delete the object tree in the objects tab and then restart the adapter. However, this is only neccessary once after the update and is not required if you do a clean new installation.  
**CAUTION:** Deleting the object tree will erase any user-defined settings e.g. links to other adapters like history or statistics. You will have to recreate them manually, so make sure to remember the details of the settings.  

## Installation

1. You need a fully configured and running STIEBEL ELTRON or Tecalor Internet Service Gateway (ISG Web or ISG Plus) in the same network as your ioBroker server.
2. Install the adapter on your ioBroker server and create an instance

## Configuration

1. Configure the instance by entering the IP-address or domain name of the ISG and if configured in the ISG, the user name and password.  
2. The other settings and the the list of the web pages of the ISG on tab URLs may be left at their default values.
3. You can improve performance and reduce the load on the ISG if you remove any paths from the URLs tab which do not exist in you ISG Web GUI or which you are not interested in. You can easily identify the URLs by opening the ISG SERVICEWELT Web page and open the various navigation tabs one by one. The URL of the respective page is shown in your browser e.g <http://IP-of-your-ISG/?s=1,0> is the value path to INFO/ANLAGE.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

* (pdbjjens) **Fixed**: Cleanup some eslint issues

### 2.0.2 (2025-11-23)

* (pdbjjens) **Fixed**: Adapter hangup on wrong credentials. (fixes #127)

### 2.0.1 (2025-11-12)

* (pdbjjens) **Fixed**: ioBroker warnings are avoided by clamping any values exceeding min/max to the min value before setting. (fixes #53 & #65)

### 2.0.0 (2025-10-27)

* (mcm1957) Change: Adapter has been migrated to iobroker-community-adapters organisation
* (mcm1957) Change: Adapter requires node.js >= 20, js-controller >= 6.0.11 and admin >= 7.6.17 now
* (mcm1957) Fix: Dependencies have been updated
* (pdbjjens) Change: remove .npmignore
* (pdbjjens) Change: migrate adapter configuration to jsonConfig
* (pdbjjens) Change: migrate from deprecated "request" http client to native fetch API
* (pdbjjens) Fix: min/max handling

### 1.7.7

* security- and compatibility update

### 1.7.6

* fix error with controller v5

## Legal Notices

STIEBEL ELTRON, TECALOR, ISG and associated logos are trademarks or registered trademarks of STIEBEL ELTRON GmbH & Co KG  [https://www.stiebel-eltron.com](https://www.stiebel-eltron.com)

All other trademarks are the property of their respective owners.

The authors are in no way endorsed by or affiliated with STIEBEL ELTRON GmbH & Co KG, or any associated subsidiaries, logos or trademarks.

## License

MIT License

Copyright (c) 2025 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2018-2023 Michael Schuster <development@unltd-networx.de>

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
