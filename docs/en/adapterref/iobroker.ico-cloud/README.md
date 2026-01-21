![Logo](admin/ico-cloud.png)
# ioBroker.ico-cloud

[![NPM version](https://img.shields.io/npm/v/iobroker.ico-cloud.svg)](https://www.npmjs.com/package/iobroker.ico-cloud)
[![Downloads](https://img.shields.io/npm/dm/iobroker.ico-cloud.svg)](https://www.npmjs.com/package/iobroker.ico-cloud)
![Number of Installations](https://iobroker.live/badges/ico-cloud-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/ico-cloud-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.ico-cloud.png?downloads=true)](https://nodei.co/npm/iobroker.ico-cloud/)

**Tests:** ![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.ico-cloud/workflows/Test%20and%20Release/badge.svg)

## ico adapter for ioBroker

ICO Pool sensor (by ondilo) allows to monitor the state and temperature of the water in your pool and recommend actions to take.

The adapter connects to the Ondilo cloud service and retrieves all measurements.

### Configuration 
You can define the poll interval in the settings (in minutes). 
It is necessary to start the login process in the settings, too.


### Attribution 
This adapter is **not** developed or owned by Ondilo but the ioBroker community.

Icon and name of ICO and Ondilo are property of Ondilo.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.0.3 (2025-05-12)
* (Garfonso) add json state for recommendations

### 2.0.2 (2025-05-12)
* (Garfonso) ignore done recommendations

### 2.0.1 (2025-05-12)
* (Garfonso) added support for recommendations
* (Garfonso) store refreshed token properly, might solve issues with missed measurements.
* (Garfonso) improved responsiveness of config UI

### 2.0.0 (2025-05-08)
* (Garfonso) rewrote config UI
* (Garfonso) login works again
* (Garfonso) breaking: needs node 20 or higher now.

### 1.1.0 (2023-06-20)
* (Garfonso) changed adapter logic, so that known pools are updated even if the pool list update fails.

### 1.0.0 (2022-07-01)
* (Garfonso) changed adapter to be schedule adapter.

### 0.0.7 (2022-07-01)
* (Garfonso) more dependencies & administrative stuff.

### 0.0.6 (2022-07-01)
* (Garfonso) dependencies & updates

### 0.0.5 (2021-07-30)
* (Garfonso) add necessary admin dependency.
* (Garfonso) Do not use unknown roles.

### 0.0.4 (2021-07-22)
* (Garfonso) change default poll interval to one hour, because it seems no more measurements are done.
* (Garfonso) fixed issue in polling

### 0.0.3 (2021-07-20)
* (Garfonso) Rename to ico-cloud

### 0.0.2 (2021-07-20)
* (Garfonso) initial release

## License
MIT License


Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2025 Garfonso <garfonso@mobo.info>

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
