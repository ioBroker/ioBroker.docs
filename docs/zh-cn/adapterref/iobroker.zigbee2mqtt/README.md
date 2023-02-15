---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.zigbee2mqtt/README.md
title: ioBroker.zigbee2mqtt
hash: lMKI6poJD+0+RbYd0uNkR1d4GiNjhFWeW+jkhodFIG0=
---
![NPM 版本](https://img.shields.io/npm/v/iobroker.zigbee2mqtt.svg)
![下载](https://img.shields.io/npm/dm/iobroker.zigbee2mqtt.svg)
![安装数量](https://iobroker.live/badges/zigbee2mqtt-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/zigbee2mqtt-stable.svg)
![NPM](https://nodei.co/npm/iobroker.zigbee2mqtt.png?downloads=true)

<img src="admin/zigbee2mqtt.png" width="200" />

# IoBroker.zigbee2mqtt
**测试：** ![测试和发布](https://github.com/o0shojo0o/ioBroker.zigbee2mqtt/workflows/Test%20and%20Release/badge.svg) ![代码QL](https://github.com/o0shojo0o/ioBroker.zigbee2mqtt/actions/workflows/codeql.yml/badge.svg?branch=main)

## IoBroker 的 zigbee2mqtt 适配器
该适配器允许控制 ioBroker 中 Zigbee2MQTT 实例设备的数据点。

## 适配器文档
[适配器文档](./docs/wiki.md)

## Changelog

<!--
 https://github.com/AlCalzone/release-script#usage
    npm run release major -- -p iobroker license --all 0.9.8 -> 1.0.0
    npm run release minor -- -p iobroker license --all 0.9.8 -> 0.10.0
    npm run release patch -- -p iobroker license --all 0.9.8 -> 0.9.9
    npm run release prerelease beta -- -p iobroker license --all v0.2.1 -> v0.2.2-beta.0
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.7.2 (2023-02-01)

-   (o0shojo0o) rework of the detection of removed devices

### 2.7.1 (2023-01-24)

-   (o0shojo0o) added option for use folder description
-   (o0shojo0o) use the iobroker device folder description for device description or events

### 2.7.0 (2023-01-18)

-   (o0shojo0o) added support for  wildcard actions (eg. *_single) ([#116](https://github.com/o0shojo0o/ioBroker.zigbee2mqtt/issues/116))
-   (o0shojo0o) added error handling optimizations ([more](https://github.com/ioBroker/ioBroker.repositories/pull/1976#issuecomment-1382038679))
-   (o0shojo0o) added option `auth_token` for websocket connection ([#112](https://github.com/o0shojo0o/ioBroker.zigbee2mqtt/issues/112))
-   (o0shojo0o) websocket timeout increased

### 2.6.0 (2023-01-10)

-   (o0shojo0o) added state `transition` for transition overwrite (-1 disabled overwrite) ([#101](https://github.com/o0shojo0o/ioBroker.zigbee2mqtt/issues/101))
-   (o0shojo0o) consideration of the description when creating the friendly name ([#105](https://github.com/o0shojo0o/ioBroker.zigbee2mqtt/issues/105))
-   (o0shojo0o) added state `effect` for groups ([#101](https://github.com/o0shojo0o/ioBroker.zigbee2mqtt/issues/101))
-   (o0shojo0o) fix state contact
-   (o0shojo0o) added handling for disabled devices

### 2.5.0 (2023-01-02)

-   (o0shojo0o) added option `Brightness step should also turn the light on or off`
-   (o0shojo0o) added handling of `brightness_step` ([#96](https://github.com/o0shojo0o/ioBroker.zigbee2mqtt/issues/96))
-   (o0shojo0o) states processing more flexible designed ([#94](https://github.com/o0shojo0o/ioBroker.zigbee2mqtt/issues/94))

### 2.4.5 (2022-12-20)

-   (o0shojo0o) extend `text` for `action` ([#84](https://github.com/o0shojo0o/ioBroker.zigbee2mqtt/issues/84))

### 2.4.4 (2022-12-06)

-   (o0shojo0o) better state identification ([#79](https://github.com/o0shojo0o/ioBroker.zigbee2mqtt/issues/79))

### 2.4.3 (2022-11-23)

-   (o0shojo0o) fix availability when `friendly_name` `/` contains

### 2.4.2 (2022-11-20)

-   (o0shojo0o) added correct handling of `move_to_saturation`, `hue_move` and `brightness_move_to_level` ([#68](https://github.com/o0shojo0o/ioBroker.zigbee2mqtt/issues/68))
-   (o0shojo0o) fix when `friendly_name` `/` contains

### 2.4.1 (2022-11-16)

-   (o0shojo0o) fix based on [review](https://github.com/ioBroker/ioBroker.repositories/pull/1976#issuecomment-1316656378)

### 2.4.0 (2022-11-08)

-   (o0shojo0o) fix for devices with multiple endpoints ([#57](https://github.com/o0shojo0o/ioBroker.zigbee2mqtt/issues/57)).
-   (o0shojo0o) added option `Brightness move should also turn the light on or off`
-   (o0shojo0o) added state toggle for groups 
-   (o0shojo0o) more dynamic during data point creation ([#48](https://github.com/o0shojo0o/ioBroker.zigbee2mqtt/issues/48)).

### 2.3.0 (2022-10-30)

-   (o0shojo0o) added support for the `toggle` of states that support this.
-   (o0shojo0o) added correct handling of `color_move` and `color_temperature_move`

### 2.2.1 (2022-10-25)

-   (o0shojo0o) fix state roles and access
-   (o0shojo0o) fix state handling
-   (o0shojo0o) fix createZ2MMessage

### 2.2.0 (2022-10-20)

-   (o0shojo0o) added support for [Lidl HG06467 effects](https://www.zigbee2mqtt.io/devices/HG06467.html#trigger-effects)
-   (o0shojo0o) added support for hs color
-   (o0shojo0o) `simulated_brightness` data point is added only for supported devices

### 2.1.1 (2022-10-16)

-   (o0shojo0o) advanced detection if a device has been removed
-   (o0shojo0o) fixes the design error in the websocket connection

### 2.1.0 (2022-10-14)

-   (o0shojo0o) added option for color temperature sync with color
-   (o0shojo0o) fix logfilter and debugDevices
-   (o0shojo0o) lots of bugfixes
-   (o0shojo0o) now set the correct min/max at color temp
-   (o0shojo0o) better error handling for the connections

### 2.0.0 (2022-10-12)

**!!!BREAKING CHANGE!!!**

-   (o0shojo0o) added configurable connection to Zigbee2MQTT (Settings must be renewed)
    -   Websocket
    -   External MQTT-Server
    -   Internal MQTT-Server
-   (o0shojo0o) optimized state writing performance in ioBroker
-   (o0shojo0o) fixed the correct set of the connection status

### 1.0.0 (2022-10-09)

**!!!BREAKING CHANGE!!!**

-   (o0shojo0o) added options for external MQTT-Server
-   (o0shojo0o) connection to zigbee2mqtt completely reworked and changed to MQTT
-   (o0shojo0o) lots of bugfixes
-   (o0shojo0o) automatically set button actions back to false
-   (o0shojo0o) added support for Zigbee2MQTT feature simulated_brightness
-   (o0shojo0o) added config check
-   (arteck) added log output about coordinator details

### 0.2.0 (2022-10-04)

-   (o0shojo0o) group states corrected
-   (o0shojo0o) added option 'Use Kelvin instead of mired for the color temps'
-   (o0shojo0o) remove available logic, now will use the information from z2m
-   (o0shojo0o) rename noLogDevices to logfilter
-   (o0shojo0o) lots of bugfixes
-   (arteck) added noLogDevices functionality
-   (arteck) added debugmessage for specific device functionality
-   (arteck) added some states are default false
-   (o0shojo0o) added support for scenes defined on a device
-   (o0shojo0o) fix available state role
-   (o0shojo0o) fix subscribeWritableStates

### 0.1.0 (2022-09-29)

-   (o0shojo0o) first release

## License

MIT License

Copyright (c) 2023 Dennis Rathjen <dennis.rathjen@outlook.de>

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