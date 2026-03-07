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

## Adapter Documentation

[Adapter Documentation](https://github.com/arteck/ioBroker.zigbee2mqtt/blob/main/docs/wiki.md)

## Changelog
### 3.0.21 (2026-01-29)
* (arteck) add coordinator status info

### 3.0.20 (2026-01-29)
* (arteck) check payload if undefined

### 3.0.19 (2026-01-28)
* (arteck) modify action dp

### 3.0.18 (2026-01-28)
* (arteck) typo

### 3.0.17 (2026-01-28)
* (arteck) typo

### 3.0.16 (2026-01-28)
* (arteck) fix action dp

### 3.0.15 (2026-01-27)
* (arteck) update

### 3.0.14 (2026-01-27)
* (arteck) back to sharp 0.33.5

### 3.0.13 (2026-01-25)
* (arteck) add action dp

### 3.0.12 (2026-01-05)
* (arteck) Dependencies have been updated
* (MMeinhardt1) typo fix

### 3.0.11 (2025-12-31)
-   (arteck) fix info.connection

### 3.0.10 (2025-12-07)
-   (arteck) Dependencies have been updated
-   (bluefox) Changed role of `color_temp_startup` state to `level` to avoid double `level.temperature` in one device
-   (arteck) fix ZBMINIR2 inching DP
-   (arteck) delete DP colortempstartup

### 3.0.9 (2025-06-19)
-   (bjoernbusch) queue up message parsing
-   (dotcom84) Support for non-default MQTT base topics

### 3.0.8 (2025-06-08)
-   (arteck) fix device is deleted
-   (arteck) fix translation

### 3.0.7 (2025-06-07)
-   (arteck) fix jsonconf

### 3.0.6 (2025-05-31)
-   (arteck) settings restructure
-   (arteck) fix icon not found message

.
.
.

### 0.1.0 (2022-09-29)

-   (o0shojo0o) first release

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
