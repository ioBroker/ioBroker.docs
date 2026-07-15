<img src="admin/zigbee2mqtt.png" width="200" />

# ioBroker.zigbee2mqtt

[![NPM version](https://img.shields.io/npm/v/iobroker.zigbee2mqtt.svg)](https://www.npmjs.com/package/iobroker.zigbee2mqtt)
[![Downloads](https://img.shields.io/npm/dm/iobroker.zigbee2mqtt.svg)](https://www.npmjs.com/package/iobroker.zigbee2mqtt)
![Number of Installations](https://iobroker.live/badges/zigbee2mqtt-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/zigbee2mqtt-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.zigbee2mqtt.png?downloads=true)](https://nodei.co/npm/iobroker.zigbee2mqtt/)

**Tests:**  
![Test and Release](https://github.com/arteck/ioBroker.zigbee2mqtt/workflows/Test%20and%20Release/badge.svg)
![CodeQL](https://github.com/arteck/ioBroker.zigbee2mqtt/actions/workflows/codeql.yml/badge.svg?branch=main)

## zigbee2mqtt adapter for ioBroker

This adapter allows to control the data points of the devices of a Zigbee2MQTT instance in ioBroker.  

## Troubleshooting
if you see in Log a message with Caught by controller[1]: /opt/iobroker/node_modules/iobroker.zigbee2mqtt/node_modules/sharp/lib/sharp.js
check you VM Settings

<img width="619" height="238" alt="grafik" src="https://github.com/user-attachments/assets/83879925-96f8-4c33-a6cd-2b68e4b41780" />
<img width="618" height="216" alt="grafik" src="https://github.com/user-attachments/assets/30c33952-b055-4d6f-99d9-f7cc49831db3" />
<img width="711" height="497" alt="grafik" src="https://github.com/user-attachments/assets/803340a6-f000-4e64-b53f-8e80f2a13127" />

## Adapter Documentation

[Adapter Documentation](https://github.com/arteck/ioBroker.zigbee2mqtt/blob/main/docs/wiki.md)

## Changelog
### 3.2.4 (2026-06-26)
* (arteck) Dependencies have been updated
*

### 3.2.3 (2026-06-25)
* (arteck) typo
* (arteck) fix some warnings
* (arteck) fix internal mqtt
* (arteck) fix languages

### 3.2.2 (2026-05-26)
* (arteck) Dependencies have been updated

### 3.2.1 (2026-05-05)
* (copilot) Adapter requires node.js >= 22 now
* (arteck) upd device manager
* (arteck) fix aedes-persistence
* (arteck) fix illuminance

### 3.2.0 (2026-04-26)
* (arteck) del deprectated setStateAsync

## License

MIT License

Copyright (c) 2025-2026 Arthur Rupp <arteck@outlook.com>,

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
