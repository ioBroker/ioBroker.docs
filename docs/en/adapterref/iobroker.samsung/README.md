![Logo](admin/samsung.png)
### ioBroker.samsung

![Number of Installations](http://iobroker.live/badges/samsung-installed.svg)
![Number of Installations](http://iobroker.live/badges/samsung-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.samsung.svg)](https://www.npmjs.com/package/iobroker.samsung)

![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.samsung/workflows/Test%20and%20Release/badge.svg)
<!-- [![Translation status](https://weblate.iobroker.net/widgets/adapters/-/samsung/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget) -->
[![Downloads](https://img.shields.io/npm/dm/iobroker.samsung.svg)](https://www.npmjs.com/package/iobroker.samsung)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

#### Description

Adapter for Samsung TVs

### Initial Creation
This adapter was initialy created by @soef at https://github.com/soef/ioBroker.samsung but not maintained any more, so we moved it to iobroker-community so that bugs could be fixed. thanks @soef for his work.
Adapter was extended by jogibear9988 and mwp007 with further Api since then.

#### Configuration
Enter the IP of your Samsung TV.
Choose your API:
	Samsung Remote - TVs before 2014
		After installation, you have to confirm the new connection on your TV
	Samsung HJ - 2014 and 2015
		After first connect you need to enter the Pin shown on your TV.
	Samsung2016 - selfexplaining 
	SamsungTV - Tizen TVs after 2016 



#### Installation
via ioBroker Admin.

Otherwise execute the following command in the ioBroker root directory (e.g. in /opt/iobroker)
```
iobroker install samsung
```
or
```
npm install iobroker.samsung 
```

#### Requirements
Samsung TV<br>
HJ Series tested by me on UE55HU7200. 
Support for devices since 2016  experimental
if something does not work, look  in the log.

## Changelog

### __WORK IN PROGRESS__
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (Apollon77) Only Wake-On-Lan SamsungTVs on adapterstart if no token is configured
* (mcm1957) Dependencies have been updated

### 0.5.11 (2022-06-02)
* (Apollon77) Optimize checkOnOff logic on adapter start

### 0.5.10 (2022-05-27)
* (Apollon77) Fix crash cases reported by Sentry

### 0.5.9 (2022-05-27)
* (Apollon77) fix crash when initializing a SamsungTV (Tizen)

### 0.5.8 (2022-04-23)
* (Apollon77) Fix crash cases reported by Sentry

### 0.5.7 (2022-04-19)
* (Apollon77) Adjust logic to detect if TV is on or off

### 0.5.6 (2022-03-31)
* (Apollon77) Fix crash cases reported by Sentry

### 0.5.5 (2022-03-30)
* (Apollon77) Fix crash cases reported by Sentry

### 0.5.4 (2022-03-30)
* (Apollon77) Fix crash cases reported by Sentry

### 0.5.3 (2022-03-29)
* (Apollon77) Fix crash cases reported by Sentry

### 0.5.2 (2022-03-29)
* (Apollon77) Fix crash cases reported by Sentry

### 0.5.1 (2022-03-25)
* (Apollon77) General updates
* (Apollon77) Add Sentry for Crash reporting

### 0.5.0
* New api Type for H and J Series (2014 + 2015)

### 0.4.0
* New api Type, removed node 4 check

### 0.2.9
* Update utils.js and usage, CI Testing and deps (Apollon77)",

## License
The MIT License (MIT)

Copyright (c) 2023-2024 ioBroker Community Developers <iobroker-community-adapters@gmx.de>  
Copyright (c) 2015-2017 soef <soef@gmx.net>, 2018-2022 ioBroker Community

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
