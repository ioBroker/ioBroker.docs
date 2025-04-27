![Logo](admin/mhi-wfrac.png)
# ioBroker.mhi-wfrac

[![NPM version](https://img.shields.io/npm/v/iobroker.mhi-wfrac.svg)](https://www.npmjs.com/package/iobroker.mhi-wfrac)
[![Downloads](https://img.shields.io/npm/dm/iobroker.mhi-wfrac.svg)](https://www.npmjs.com/package/iobroker.mhi-wfrac)
![Number of Installations](https://iobroker.live/badges/mhi-wfrac-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/mhi-wfrac-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.mhi-wfrac.png?downloads=true)](https://nodei.co/npm/iobroker.mhi-wfrac/)

**Tests:** ![Test and Release](https://github.com/hacki11/ioBroker.mhi-wfrac/workflows/Test%20and%20Release/badge.svg)

## mhi-wfrac adapter for ioBroker

Mitsubishi Heavy Industries Air Conditioners with WLAN Adapter WF-RAC

This Adapter integrates WF-RAC (Wifi) equipped Mitsubishi Heavy Industries Air Conditioners in ioBroker.

The code is based on 
- https://github.com/wolkeSoftware/ioBroker.woso_mitsu_aircon_rac
- https://github.com/W0w3/ioBroker.mhi_aircon 
- https://github.com/jeatheak/Mitsubishi-WF-RAC-Integration
- https://github.com/mcheijink/WF-RAC

Thank you very much for your work - It really helped me a lot.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.1.4 (2025-04-27)
* (hacki11) Use sanitized ID to check if online state can be modified

### 2.1.3 (2025-04-10)
* (hacki11) Add Dev Container
* (hacki11) Fix: Use only enabled devices for adapter connection indicator

### 2.1.2 (2025-03-31)
* (hacki11) Fix review findings

### 2.1.1 (2025-03-13)
* (hacki11) Migrate to eslint9

### 2.1.0 (2025-03-11)
* (hacki11) Add `online` datapoint representing the reachability of each device
* (hacki11) Workaround the built-in hourly reboot of the WF-RAC module

### 2.0.0 (2025-03-09)
* (hacki11) Bring Adapter Stable
* (hacki11) Support multiple devices
* (hacki11) Fix Read Operation Mode 'Auto'
* (hacki11) Set `info.connection` to `false` when adpater is unloading

### 1.0.2
* (wolkeSoftware) made Entrust (3D Auto) changeable

### 1.0.1
* (wolkeSoftware) initial release

## License
MIT License

Copyright (c) 2025 hacki11

Copyright (c) 2023 W0w3

Copyright (c) 2023 wolkeSoftware

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
