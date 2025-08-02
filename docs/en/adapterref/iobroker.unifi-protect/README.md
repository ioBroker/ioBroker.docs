![Logo](admin/unifi-protect.png)
# ioBroker.unifi-protect

[![NPM version](http://img.shields.io/npm/v/iobroker.unifi-protect.svg)](https://www.npmjs.com/package/iobroker.unifi-protect)
[![Downloads](https://img.shields.io/npm/dm/iobroker.unifi-protect.svg)](https://www.npmjs.com/package/iobroker.unifi-protect)
![Number of Installations (latest)](http://iobroker.live/badges/unifi-protect-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/unifi-protect-stable.svg)
[![Dependency Status](https://img.shields.io/david/iobroker-community-adapters/iobroker.unifi-protect.svg)](https://david-dm.org/peterbaumert/iobroker.unifi-protect)
[![Known Vulnerabilities](https://snyk.io/test/github/peterbaumert/ioBroker.unifi-protect/badge.svg)](https://snyk.io/test/github/peterbaumert/ioBroker.unifi-protect)

[![NPM](https://nodei.co/npm/iobroker.unifi-protect.png?downloads=true)](https://nodei.co/npm/iobroker.unifi-protect/)


## unifi-protect adapter for ioBroker

Connects to Unifi Protect Controller and pulls all Data from added Cameras.

Standard Ports if not changed by yourself:
 - Cloud Key Plus Gen2: 7443
 - UDM Pro: 443


## Examples for getThumbnail and getSnapshot

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
## Credits
This adapter would not have been possible without the great work of Peter Baumert <ioBroker.unifi-protect@outlook.com> who implemented the inital release of this adapter.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.0.1 (2024-06-06)
* (Scrounger) A Problem accessing the 'manual snapshot' folder has been fixed.
* (mcm1957) Dependencies have been updated

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

## Code Usage
The code in [protect_api](./protect_api) is mostly copied from [hjdhjd's homebridge-unifi-protect](https://github.com/hjdhjd/homebridge-unifi-protect).
Thank you very much for providing this code. His codes license you can find [here](https://github.com/hjdhjd/homebridge-unifi-protect/blob/master/LICENSE.md).


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
