![Logo](admin/hikvision-alarmserver.png)
# ioBroker.hikvision-alarmserver

[![NPM version](https://img.shields.io/npm/v/iobroker.hikvision-alarmserver.svg)](https://www.npmjs.com/package/iobroker.hikvision-alarmserver)
[![Downloads](https://img.shields.io/npm/dm/iobroker.hikvision-alarmserver.svg)](https://www.npmjs.com/package/iobroker.hikvision-alarmserver)
![Number of Installations](https://iobroker.live/badges/hikvision-alarmserver-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/hikvision-alarmserver-stable.svg)
[![Dependency Status](https://img.shields.io/david/raintonr/iobroker.hikvision-alarmserver.svg)](https://david-dm.org/raintonr/iobroker.hikvision-alarmserver)

[![NPM](https://nodei.co/npm/iobroker.hikvision-alarmserver.png?downloads=true)](https://nodei.co/npm/iobroker.hikvision-alarmserver/)

**Tests:** ![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/workflows/Test%20and%20Release/badge.svg)

## Hikvision Alarm Server adapter for ioBroker

An adapter to receive alarms/events sent from Hikvision cameras.

Tested with Hikvision models:

- DS-2CD2043G2-I
- DS-2CD2143G2-I
- DS-2DE2A404IW-DE3
- DS-2DE3A404IW-DE/W

Success/failure/bug reports welcomed if you have a model not in this list.

## Usage

The adapter instance creates a boolean state for each combination of camera/event type reported. Cameras are identified by MAC address (limited by information given by camera).

It appears that cameras repeatedly issue events every second when those events are still valid but no message is sent to clear them. For this reason the adapter automatically clears events that have not been re-reported for more than 5 seconds.

## Configuration

### ioBroker

In the adapter configuration, select a free port for the adapter to listen on (8089 by default).

### On Camera

Visit the configuration page of your camera(s) and define ioBroker IP/host and port settings:

![Alarm Server Options](docs/images/alarm-server-options.png)

Make sure to linkage in the events you would like to report to ioBroker includes 'Notify Surveillance Center'. Eg:

![Motion Detection Options](docs/images/motion-detection-options.png)

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 0.0.7 (2022-12-29)
-   (Robin Rainton) Add bind address option ([#9](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/issues/9)).
-   (Robin Rainton) Try to derive device names from net-tools. Optionally use channelName from devices ([#10](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/issues/10)).

### 0.0.6 (2022-12-13)
-   (Robin Rainton) Handle multipart message payload ([#5](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/issues/5)).
-   (Robin Rainton) Handle payloads without XML declaration ([#7](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/issues/7).)

### 0.0.5 (2022-12-10)
-   (Robin Rainton) Drop colons from device IDs.

### 0.0.2
-   (Robin Rainton) initial release.

## License
MIT License

Copyright (c) 2022 Robin Rainton <robin@rainton.com>

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