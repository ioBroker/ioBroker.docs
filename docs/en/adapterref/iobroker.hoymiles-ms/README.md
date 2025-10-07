![Logo](admin/hoymiles-ms.png)
# ioBroker.hoymiles-ms

[![NPM version](http://img.shields.io/npm/v/iobroker.hoymiles-ms.svg)](https://www.npmjs.com/package/iobroker.hoymiles-ms)
[![Downloads](https://img.shields.io/npm/dm/iobroker.hoymiles-ms.svg)](https://www.npmjs.com/package/iobroker.hoymiles-ms)
![Number of Installations (latest)](http://iobroker.live/badges/hoymiles-ms-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/hoymiles-ms-stable.svg)
![Test and Release](https://github.com/mcm4iob/ioBroker.hoymiles-ms/workflows/Test%20and%20Release/badge.svg)

[![License](https://img.shields.io/github/license/mcm4iob/ioBroker.hoymiles-ms?style=flat)](https://github.com/mcm4iob/ioBroker.hoymiles-ms/blob/main/LICENSE)
[![Donate](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)](https://paypal.me/mcm1957atIoBroker)
[![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/mcm1957)

**************************************************************************************************************
## Sentry
**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.**
For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

**************************************************************************************************************

## hoymiles-ms adapter for ioBroker

This adapter integrates the **HOYMILES** **M**icro**S**torage systems (currently only Hoymiles SM-A2) into ioBroker. A description of the device is available [here](https://www.hoymiles.com/de/products/micro-storage).

Note that this adapter is not related to the company mentioned above in any way and that no commercial relationship exists at all.

**************************************************************************************************************

## Disclaimer
**All product and company names or logos are trademarks™ or registered® trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them or any associated subsidiaries! This personal project is maintained in spare time and has no business goal.**

**************************************************************************************************************

## Documentation

For detailed setup instructions, configuration guide, and comprehensive reference documentation:

- **[English Documentation](doc/en/DOCUMENTATION_en.md)**
- **[German Documentation](doc/de/DOCUMENTATION_de.md)**

## Configuration

### Configuration of the adapter
The adapter can be configured as a dedicated mqtt server or as a mqtt client (Note: client mode not yet implemented). 

To operate as a mqtt server the following parameters must be configured:
- mqtt network
  Specify the network to listen on. Normally listening on all networks (0.0.0.0) is sufficient. 

- mqtt port
  Specify to (tcp)port to use. As standard mqtt port (1883) might be occupied by ioBroker.mqtt adapter and port 1882 is used by the adapter ioBroker.shelly per default this adapter uses port 1881 per default. But you can use any free port.

### Configuration of the Hoymiles MS-A2

To configure the Hoymiles MS-A2 unit open the S-Miles Home App. Select configuration page (using the gear icon on the upper right corner) and scroll down to 'MQTT-Service'. Enable MQTT Service and enter 
- Server Address
  the IP Address of the ioBroker system (when using mqtt server mode) or the address of your mqtt Broker
- Port
  The port number configured for your mqtt broker
- Optionally set a client prefix (default 'MSA')

This adapter currently does not yet support authentication. So this must be disabled.

## Operation

Once the adapter is started it listens to mqtt packets received from the Hoymiles device. The adapter does not poll in any way - all activity is triggered by the Hoymiles unit. Note that configuration data is sent only once after connection has been established while realtime data is sent every second. Systemwide statistics is typically updated every five minutes. Note that these intervals are not configurable by the adapter - they are defined by the Hoymiles-Api.

**************************************************************************************************************

**If you like this adapter, please consider a donation:**
  
[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mcm1957atIoBroker)

**************************************************************************************************************
## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.2.0 (2025-08-23)
* (mcm1957) States are created dynamically now. So no states should be created if a system does not provide data for it (i.e slave micro storage).
* (mcm1957) State values are reset during startup now to prevent stale information.
* (mcm1957) Support to control power consumption and delivery has been added.
* (mcm1957) Dependencies have been updated

### 0.1.2 (2025-08-03)
* (mcm1957) Warnings raised from slave systems have been removed
* (mcm1957) Dependencies have been updated

### 0.1.1 (2025-07-27)
* (mcm1957) Handling of configuration has been corrected
* (mcm1957) Translations have been adapted

### 0.1.0 (2025-07-26)
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
