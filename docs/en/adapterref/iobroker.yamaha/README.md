![Logo](admin/yamaha.png)
## ioBroker.yamaha

![Number of Installations](http://iobroker.live/badges/yamaha-installed.svg)
![Number of Installations](http://iobroker.live/badges/yamaha-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.yamaha.svg)](https://www.npmjs.com/package/iobroker.yamaha)

![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.yamaha/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/yamaha/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.yamaha.svg)](https://www.npmjs.com/package/iobroker.yamaha)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

#### Description

Adapter for Yamaha AV receivers

Discussion please at github or at https://forum.iobroker.net/topic/53174/weiterentwicklung-yamaha-adapter

### Initial Creation
This adapter was initialy created by @soef at https://github.com/soef/ioBroker.yamaha but not maintained any more, so we moved it to iobroker-community so that bugs could be fixed. thanks @soef for his work.

#### Configuration
Currently without autodiscover, you have to enter the IP of your receiver

#### Installation
via ioBroker Admin.

Otherweise execute the following command in the iobroker root directory (e.g. in /opt/iobroker)
``
npm install iobroker.yamaha 
iobroker upload yamaha
``

#### Realtime
The states will be created, when they occur. I.e. use your ir-remote and change something and you will see the new states. 
Only one connection is accepted by yamaha devices.

#### Requirements
Yamaha Receiver

You have to enable "network standby" function in the configuration of your receiver


## Changelog
### 0.5.4 (2024-06-14)
* (foxriver76) updated packages

### 0.5.3 (2022-06-17)
* (Apollon77) Fix crash cases reported by Sentry

### 0.5.2 (2022-04-23)
* (Apollon77) Fix crash cases reported by Sentry

### 0.5.1 (2022-03-29)
* (Apollon77) Fix crash cases reported by Sentry
* (Sneak-L8) fix type of pureDirect

### 0.5.0 (2022-03-08)
* IMPORTANT: js-controller 2.0 is needed at least
* (Apollon77) Add Sentry for crash reporting

### 0.4.1
* (Sneak-L8) "toggleMute" now toggle mute state (instead of always muting)

### 0.4.0
* (Garfonso) added admin 3 compatibility and more meta-data stuff.
* (Garfonso) added compact mode support.

### 0.3.20
* (Garfonso) adjusted local copy of soef.js to js-controller 3.0
* (Garfonso) updated meta information (links etc) to iobroker-community-adapters

### 0.3.19
* (soef) Changelog added to readme

### 0.3.18
* (Apollon77) Update utils.js and usage, CI Testing and deps

### 0.3.17
* (Apollon77) update basic package-file testing

### 0.3.16
* (soef) node 0.12 removed from testing

### 0.3.15
* (soef) Enhance CI testing

### 0.3.14
* (soef) Possible exception in reconnect fixed

### 0.3.12
* (soef) Version incr. for npm

### 0.3.11
* (soef) reconnect overworked

### 0.3.10
* (soef) realtime Ping now configurable

### 0.3.8
* (soef) realtime states optimized

### 0.3.7
* (soef) fix typo in creating realtime states

### 0.3.6
* (soef) timeout to connect reduced

<!--

### License
The MIT License (MIT)

Copyright (c) 2015-2024 soef <soef@gmx.net>

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
-->
