<img src="admin/zwavews.png" width="200" />

# ioBroker.zwavews

[![NPM version](https://img.shields.io/npm/v/iobroker.zwavews.svg)](https://www.npmjs.com/package/iobroker.zwavews)
[![Downloads](https://img.shields.io/npm/dm/iobroker.zwavews.svg)](https://www.npmjs.com/package/iobroker.zwavews)
![Number of Installations](https://iobroker.live/badges/zwavews-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/zwavews-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.zwavews.png?downloads=true)](https://nodei.co/npm/iobroker.zwavews/)

**Tests:**  
![Test and Release](https://github.com/arteck/ioBroker.zwavews/workflows/Test%20and%20Release/badge.svg)
![CodeQL](https://github.com/arteck/ioBroker.zwavews/actions/workflows/codeql.yml/badge.svg?branch=main)

## zwave-WS adapter for ioBroker

The `zwavews` adapter connects a [`zwave-js-ui`](https://zwave-js.github.io/zwave-js-ui/#/) to ioBroker and creates corresponding data points for devices, values, and statuses. This allows Z-Wave devices to be conveniently used in visualizations, logic, and automations.


## Adapter Documentation

It is necessary to install zwave-js-ui (it is possible to migrate the zwave2 Devices to zwave-js-ui. Copy json cache file from /opt/iobroker/iobroker-data/zwave2/ into Z-Wave JS UI's store directory. then start zwave-js-ui) and activate WS communication. <br>
Switching from the zwave2 adapter is easy because all information is stored on the coordinator. <br>
You only need to wake up the battery-powered devices once so that zwave-js-ui can read them again or migrate it from zwave2. <br>

<img width="1444" height="740" alt="grafik" src="https://github.com/user-attachments/assets/876a81d3-04ab-43c6-914e-86772d0188e1" />
<p></p>


Activate WS Server Settings in `zwave-js-ui` we use the Home Assistant Settings for this:


<img width="1887" height="479" alt="grafik" src="https://github.com/user-attachments/assets/6ed8cf36-2d91-435f-91d7-86e430bb0c6c" />


## Changelog
### **WORK IN PROGRESS**
* (arteck) fix unknown state from scene
* (arteck) del last dot from DP

### 0.1.2 (2026-03-15)
* (arteck) typo

### 0.1.1 (2026-03-15)
* (arteck) add debug information

### 0.1.0 (2026-03-08)
* (arteck) BREAKING CHANGE - dp name is now with underline
* (arteck) add deviceManager
* (arteck) fix dp's with a space
* (arteck) fix dp's with special chars

### 0.0.18 (2026-02-28)
* (arteck) add info.sendMessageAllowed object to allow sending the message to zwave-ui-js
* (arteck) add new checkbox to set info.sendMessageAllowed immediately after starting the adapter

### 0.0.17 (2026-02-20)
* (arteck) fix adapter start
* (arteck) Dependencies have been updated

### 0.0.16 (2026-02-09)
* (arteck) fix warning message

### 0.0.15 (2026-02-09)
* (arteck) typo
* (arteck) fix ready status if status is dead

### 0.0.14 (2026-02-09)
* (arteck) add event ready

### 0.0.13 (2026-02-07)
* (arteck) add event type "value notification"

### 0.0.12 (2026-02-01)
* (arteck) typo
* (arteck) fix dp channel name
* (arteck) add endpoint > 0 to value if exists

### 0.0.11 (2026-01-23)
* (arteck) fix dp types

### 0.0.10 (2026-01-17)
* (arteck) event value added

### 0.0.9 (2026-01-08)
* (arteck) convert status to lower case

### 0.0.8 (2026-01-06)
* (arteck) add warning message for inteview states

### 0.0.7 (2026-01-06)
* (arteck) add name if not in device info tree

### 0.0.6 (2026-01-06)
* (arteck) update title

### 0.0.5 (2026-01-06)
* (arteck) add online status

### 0.0.4 (2026-01-06)
* (arteck) fix overrideState

### 0.0.3 (2026-01-06)
* (arteck) fix title

### 0.0.2 (2026-01-06)
- (arteck) first release

## License

MIT License

Copyright (c) 2026 Arthur Rupp <arteck@outlook.com>,

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
