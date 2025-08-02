---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.unifi-protect/README.md
title: ioBroker.unifi-保护
hash: ezNKLsW90QDTZEKqD4GqCIgZ9s9wK0rue0cj0MorYTk=
---
![标识](../../../en/adapterref/iobroker.unifi-protect/admin/unifi-protect.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.unifi-protect.svg)
![下载](https://img.shields.io/npm/dm/iobroker.unifi-protect.svg)
![安装数量（最新）](http://iobroker.live/badges/unifi-protect-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/unifi-protect-stable.svg)
![依赖状态](https://img.shields.io/david/iobroker-community-adapters/iobroker.unifi-protect.svg)
![已知漏洞](https://snyk.io/test/github/peterbaumert/ioBroker.unifi-protect/badge.svg)
![新平台](https://nodei.co/npm/iobroker.unifi-protect.png?downloads=true)

# IoBroker.unifi-保护
## IoBroker 的 unifi-protect 适配器
连接到 Unifi Protect 控制器并从添加的摄像机中提取所有数据。

如果您不自行更改，则标准端口：

Cloud Key Plus Gen2：7443
UDM专业版：443

## GetThumbnail 和 getSnapshot 的示例
```
// Settings
const path = '/opt/iobroker/tmp/temp.jpg';
const threshold = 50;

// Send to Telegram ( or what you prefer )
function sendImage(path) {
    sendTo('telegram.0', path);
}

//Trigger Script
on({ id: 'unifi-protect.0.motions.lastMotion.thumbnail', change: "ne" }, function () {
    const thumb = getState('unifi-protect.0.motions.lastMotion.thumbnail'/*thumbnail*/).val;
    const end = getState('unifi-protect.0.motions.lastMotion.end'/*thumbnail*/).val;
    const cameraid = getState('unifi-protect.0.motions.lastMotion.camera'/*thumbnail*/).val;
    const score = getState('unifi-protect.0.motions.lastMotion.score'/*thumbnail*/).val;
    if (score < threshold) { return; }
    // if Event has ended send the Thumbnail otherwise get current Snapshot
    if (end != null) {
        sendTo('unifi-protect.0', 'getThumbnail', { "thumbnail": thumb, "path": path }, function (res) {
            sendImage(path);
        });
    } else {
        sendTo('unifi-protect.0', 'getSnapshot', { "cameraid": cameraid, "path": path }, function (res) {
            sendImage(path);
        });
    }
});
```

```
sendTo('unifi-protect.0', 'getSnapshot', { "cameraid": "5e4a861c01d12503870003f9", "path": path }, function (res) {
    sendImage(path);
});
```

## 致谢
如果没有 Peter Baumert <ioBroker.unifi-protect@outlook.com> 的出色工作，这个适配器就不可能实现，他实现了这个适配器的初始版本。

## 代码使用
代码位于[protect_api](./protect_api) 大部分是从 [hjdhjd 的 homebridge-unifi-protect] 复制而来](https://github.com/hjdhjd/homebridge-unifi-protect)。
非常感谢您提供此代码。您可以在[这里](https://github.com/hjdhjd/homebridge-unifi-protect/blob/master/LICENSE.md)找到他的代码许可证。

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.0.0 (2024-03-28)
* (mcm1957) BREAKING: Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Adapter has been moved to iobroker-community-adapters organisation
* (mcm1957) Dependencies have been updated

### 0.0.13 (2023-01-23)
* dependencies updates
* first implementation of realtime updates api
* lastMotion, lastRing, lcdMessage and smartDetectZone in realTimeEvents
* (Scrounger) Button to take manual snapshot added
* (Scrounger) real time events datapoints for every cam added
* (Scrounger) take snapshot and thumbnail for real time events added (base64 images)
* (Scrounger) thumbnail image for list of motion events added (base64 images)
* (Scrounger) small thumbnail image for list of motion events and real time events added (base64 images)
* (Scrounger) camera name for list of motion events added

### 0.0.12 (2021-03-14)
* added smart detections
* fixed some lastMotion stuff
* added UnifiOs Support for CloudKey

### 0.0.11 (2020-02-27)
* changed Admin interface a little
* added description for port
* fixed UDM Pro writeable states

### 0.0.10 (2020-02-26)
* travis ci for integration tests fixed
* actually use last x motion setting

### 0.0.9 (2020-02-21)
* lastMotion of camera only updating if neccessary
* first UDM integrations, changing settings NOT working yet

### 0.0.8 (2020-02-17)
* made motion Events optional (Last Motion is always stored)
* made interval and "last x seconds of motions" adjustable
* properly delete old motions

### 0.0.7 (2020-02-09)
* continuosly refresh motion events
* changed data structur
* added lastMotion Datapoint to each camera

### 0.0.6 (2020-02-08)
* make some settings changeable (name, osdSettings.*, recordingSettings.mode, ledSettings.isEnabled)

### 0.0.5 (2020-02-07)
* new logo
* added motion event data points

### 0.0.4 (2020-02-05)
* release-script test and some Readme changes

### 0.0.3 (03.02.2020)
* (Peter Baumert) first working rls on npm

### 0.0.1
* (Peter Baumert) initial release

## License
MIT License

Copyright (c) 2024 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2020-2022 Peter Baumert

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