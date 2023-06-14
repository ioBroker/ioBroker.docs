<img src="/admin/teslamate.svg" alt="Logo" style="max-width: 100%;" width="100">

# ioBroker.teslamateapi

[![NPM version](https://img.shields.io/npm/v/iobroker.teslamateapi.svg)](https://www.npmjs.com/package/iobroker.teslamateapi)
[![Downloads](https://img.shields.io/npm/dm/iobroker.teslamateapi.svg)](https://www.npmjs.com/package/iobroker.teslamateapi)
![Number of Installations](https://iobroker.live/badges/teslamateapi-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/teslamateapi-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.teslamateapi.png?downloads=true)](https://nodei.co/npm/iobroker.teslamateapi/)

**Tests:** ![Test and Release](https://github.com/virusbrain/ioBroker.teslamateapi/workflows/Test%20and%20Release/badge.svg)

## teslamateapi adapter for ioBroker

Control your car via the TeslaMateApi!

TeslaMateApi is a RESTful API to get data collected by self-hosted data logger TeslaMate in JSON. You can find the application here: https://github.com/tobiasehlert/teslamateapi

This adapter will provide the status of your car via the TeslaMateApi and Telsmate. Also you can send some commands to your car. Currently the following commands are supported:
- wake_up
- flash_lights
- charge_port_door_open
- charge_port_door_close
- charge_start
- charge_stop
- door_lock
- door_unlock
- auto_conditioning_start
- auto_conditioning_stop

With this adapter you can also set some settings of your car. Currently these are implemented:
- charge_limit
- charging_amps

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.0.8 (2023-05-01)
* (virusbrain) Updated dependencies

### 0.0.7 (2022-11-09)
* (virusbrain) Fix automatic wake_up

### 0.0.6 (2022-11-09)
* (virusbrain) Fixed axios import

### 0.0.5 (2022-11-09)
* (virusbrain) Updated dependencies

### 0.0.4 (2022-11-09)
* (virusbrain) Fixed forced wake up.

### 0.0.3 (2022-10-11)
* (virusbrain) Second try to make intervals unload safe

### 0.0.2 (2022-09-27)
* (virusbrain) Fixed clearInterval
* (virusbrain) Fixed logo size

### 0.0.1 (2022-09-24)
* (virusbrain) Intial beta elease

## License
MIT License

Copyright (c) 2022 virusbrain <github@eideo.de>

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
