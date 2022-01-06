![Logo](admin/twinkly.png)
# ioBroker.twinkly

![Number of Installations (latest)](http://iobroker.live/badges/twinkly-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/twinkly-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.twinkly.svg)](https://www.npmjs.com/package/iobroker.twinkly)
[![Downloads](https://img.shields.io/npm/dm/iobroker.twinkly.svg)](https://www.npmjs.com/package/iobroker.twinkly)
[![Dependency Status](https://img.shields.io/david/patrickbs96/iobroker.twinkly.svg)](https://david-dm.org/patrickbs96/iobroker.twinkly)
[![Known Vulnerabilities](https://snyk.io/test/github/patrickbs96/ioBroker.twinkly/badge.svg)](https://snyk.io/test/github/patrickbs96/ioBroker.twinkly)

[![NPM](https://nodei.co/npm/iobroker.twinkly.png?downloads=true)](https://nodei.co/npm/iobroker.twinkly/)

**Tests:** Linux/Mac: [![Travis-CI](https://travis-ci.com/patrickbs96/ioBroker.twinkly.svg)](https://travis-ci.com/github/patrickbs96/ioBroker.twinkly)
Windows: [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/patrickbs96/ioBroker.twinkly?branch=master&svg=true)](https://ci.appveyor.com/project/patrickbs96/ioBroker-twinkly/)


## twinkly adapter for ioBroker

Adapter to communicate with the [Twinkly lights](https://www.twinkly.com/).

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Settings
The following Settings are available:
![admin.png](img/admin.png)

In the table you can add all the Twinkly lights you want to control. 

| Column       | Description                                                    |
|--------------|----------------------------------------------------------------|
| `Enabled`    | Shall this connection be accessed                              |
| `Name`       | Name of the connection in ioBroker                             |
| `IP Address` | IP-Address to the Twinkly Lights                               |
| `State On`   | Which `ledMode` should be activated when state `on` is enabled |

The following additionals States are created per device when checked:
* Device Info
* Network Status
* MQTT


The following States are available:

| State         | Writable           | Description                                                                                                                     |
|---------------|--------------------|---------------------------------------------------------------------------------------------------------------------------------|
| `connected`   | :x:                | Device Connected                                                                                                                |
| `details`     | :x:                | Device Details                                                                                                                  |
| `firmware`    | :x:                | Firmware Version                                                                                                                |
| `ledBri`      | :heavy_check_mark: | Brightness (deactivate control with -1)                                                                                         |
| `ledColor`    | :heavy_check_mark: | Color of LEDs, HSV/RGB(W)/HEX (`Color`)                                                                                         |
| `ledConfig`   | :heavy_check_mark: | Configuration of LEDs                                                                                                           |
| `ledEffect`   | :heavy_check_mark: | Effects (`Effect`)                                                                                                              |
| `ledLayout`   | :heavy_check_mark: | Layout of LEDs (disabled for further testing)                                                                                   |
| `ledMode`     | :heavy_check_mark: | Mode: Movie, Color, Effect, Playlist, Off, RealTime (not yet supported), Demo                                                   |
| `ledMovie`    | :heavy_check_mark: | Active Movie, If multiple Movies are added in the Playlist feature then they can be selected here. (`Movie`)                    |
| `ledPlaylist` | :heavy_check_mark: | Active Playlist Entry, Switch between Movies. (`Playlist`)                                                                      |
| `ledSat`      | :heavy_check_mark: | Saturation 0-100 (deactivate control with -1)                                                                                   |
| `mqtt`        | :heavy_check_mark: | MQTT-Connection                                                                                                                 |
| `name`        | :heavy_check_mark: | Name                                                                                                                            |
| `network`     | :x:                | Network-Information                                                                                                             |
| `on`          | :heavy_check_mark: | On/Off Switch                                                                                                                   |
| `paused`      | :heavy_check_mark: | Pause Connection to Twinkly so you can do changes in the App. Otherwise you might loose the connection while working in the App |
| `timer`       | :heavy_check_mark: | Update the Timer                                                                                                                |



[Private API information](https://xled-docs.readthedocs.io/en/latest/) by [Pavol Babinčák](https://github.com/scrool)


## Known Issues
* The maximum length for the movie name is 15 characters


## Changelog

### 0.2.11 (2022-01-02)
* (patrickbs96) Add setting to select which ledMode should be activated

### 0.2.10 (2021-12-31)
* (patrickbs96) Add setting to enable automatically switching of Mode after State change (color, effect, movie, playlist)

### 0.2.8 (2021-12-20)
* (patrickbs96) Rename mode On to movie as it's a better representation

### 0.2.7 (2021-12-19)
* (patrickbs96) Hex without Hash. Option to not use ping for reachability.

### 0.2.6 (2021-12-09)
* (patrickbs96) Renamed States with led control. Now starting with "led".
* (patrickbs96) Add new State `ledLayout`/`ledPlaylist`

### 0.2.4 (2021-12-03)
* (patrickbs96) Handle wrong input so it does not cause exceptions
* (patrickbs96) Add new State `ledEffect`

### 0.2.2 (2021-11-30)
* (patrickbs96) Add new State `ledColor`

### 0.2.0 (2021-11-28)
* (patrickbs96) Add new Value `color` from API-Response (Sentry IOBROKER-TWINKLY-J, IOBROKER-TWINKLY-K, IOBROKER-TWINKLY-M, IOBROKER-TWINKLY-N, IOBROKER-TWINKLY-P)
* (patrickbs96) Add Pause-Feature, to work with app. (Twinkly only allows one active connection...)
* (patrickbs96) Add Feature, activate uploaded Movies (Playlist) 

### 0.1.15 (2021-10-26)
* (patrickbs96) Add new Value `network.accesspoint.password_changed` from API-Response (Sentry IOBROKER-TWINKLY-A)

### 0.1.14 (2021-10-23)
* (patrickbs96) Add new Value `network.station.status` from API-Response (Sentry IOBROKER-TWINKLY-A, IOBROKER-TWINKLY-B)
* (patrickbs96) Add new Value `network.details.product_version` from API-Response (Sentry IOBROKER-TWINKLY-E)
* (patrickbs96) Add new Value `network.details.rssi` from API-Response (Sentry IOBROKER-TWINKLY-D)
* (patrickbs96) Add new Value `color` from API-Response (Sentry IOBROKER-TWINKLY-7)

### 0.1.13 (2021-10-13)
* (patrickbs96) Add new Value `network.station.rssi` from API-Response (Sentry IOBROKER-TWINKLY-8)

### 0.1.12 (2021-09-13)
* (patrickbs96) Added new Values from Response (Sentry IOBROKER-TWINKLY-7)
* (patrickbs96) Prevent excessive Sentry Logging 

### 0.1.10 (2021-09-04)
* (patrickbs96) Update API values to Firmware 2.7.1

### 0.1.8 (2021-02-06)
* (patrickbs96) Changes from the Review

### 0.1.6
* (patrickbs96) Update dependencies

### 0.1.5
* (patrickbs96) Prevent Crash Case at HTTP Error (Sentry IOBROKER-TWINKLY-3)

### 0.1.4
* (patrickbs96) Temporary removing Reset as API path not exists

### 0.1.1
* (patrickbs96) Prevent Crash Case at HTTP Error (Sentry IOBROKER-TWINKLY-3)


## License
MIT License

Copyright (c) 2022 patrickbs96 <patrickbsimon96@gmail.com>

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
