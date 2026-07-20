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

### Features
* **Real-time communication**: Instantly receives updates of device values and statuses via WebSocket or MQTT.
* **Auto-Discovery**: Automatically creates and updates the device and state structure in ioBroker from the `zwave-js-ui` nodes.
* **Device Management**: View battery levels, connection status, and detailed device metrics right from the ioBroker interface.
* **Firmware Updates**: Observe firmware update progress directly via the adapter's logs and states.
* **State Control**: Send commands and update values natively through the ioBroker object tree.
* **Support for multiple protocols**: You can connect to `zwave-js-ui` using WebSocket, External MQTT, or an Internal Dummy MQTT server.

## Adapter Documentation

It is necessary to install zwave-js-ui (it is possible to migrate the zwave2 Devices to zwave-js-ui. Copy json cache file from /opt/iobroker/iobroker-data/zwave2/ into Z-Wave JS UI's store directory. then start zwave-js-ui) and activate WS communication. <br>
Switching from the zwave2 adapter is easy because all information is stored on the coordinator. <br>
You only need to wake up the battery-powered devices once so that zwave-js-ui can read them again or migrate it from zwave2. <br>

<img width="1444" height="740" alt="grafik" src="https://github.com/user-attachments/assets/876a81d3-04ab-43c6-914e-86772d0188e1" />
<p></p>


Activate WS Server Settings in `zwave-js-ui` we use the Home Assistant Settings for this:


<img width="1887" height="479" alt="grafik" src="https://github.com/user-attachments/assets/6ed8cf36-2d91-435f-91d7-86e430bb0c6c" />


## Changelog
### 1.0.0 (2026-07-08)
* (arteck) add notification

### 0.2.1 (2026-05-25)
- (copilot) Adapter requires node.js >= 22 now
* (arteck) fix new event

### 0.2.0 (2026-04-26)
* (arteck) del deprectated setStateAsync

### 0.1.6 (2026-04-23)
* (arteck) add test

### 0.1.5 (2026-04-21)
* (arteck) upd devicemanager

[Older changelogs can be found there](CHANGELOG_OLD.md)

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
