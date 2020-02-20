---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ecovacs-deebot/README.md
title: TR: Ecovacs Deebot adapter for ioBroker
hash: Z+xKLBZqrnvMvRMq2jPs+med9etSpGKlbgoWZharfow=
---
![TR: Logo](../../../en/adapterref/iobroker.ecovacs-deebot/admin/ecovacs-deebot.png)

![TR: NPM version](http://img.shields.io/npm/v/iobroker.ecovacs-deebot.svg)
![TR: Downloads](https://img.shields.io/npm/dm/iobroker.ecovacs-deebot.svg)
![TR: Travis-CI](https://travis-ci.org/mrbungle64/ioBroker.ecovacs-deebot.svg?branch=master)

TR: # Ecovacs Deebot adapter for ioBroker
TR: This adapter uses the [TR: ecovacs-deebot.js](https://github.com/mrbungle64/ecovacs-deebot.js) library.

TR: ## Models
TR: So far, only devices that communicate with the **XMPP** protocol work properly.
Devices that communicate with the **MQTT** protocol are experimental.

TR: You can check this with the state value `info.communicationProtocol` after successful connection establishment (values: `XMPP`, `MQTT`).

TR: ### These models work to full extent
TR: * Deebot Slim 2
TR: * Deebot Ozmo 930

TR: ### These models work to almost full extent
TR: * Deebot 601
TR: * Deebot 710/711
TR: * Deebot 900/901
TR: * Deebot Ozmo 610
TR: * Deebot Ozmo 950

TR: ### These models should work to (almost) full extent
TR: * Deebot N79T
TR: * Deebot 600/605
TR: * Deebot Ozmo 960 (not tested)

TR: ### These models should work partially
TR: * Deebot Ozmo 900

TR: ### Buttons and control
| TR: | model    | basic * | pause | spot | spotArea | customArea ** | edge | playSound | waterLevel |
|------------ |-------- |------ |------ |--------- |-------------- |------ |---------- |----------- |
| TR: | Slim 2      |   x     |  n/a  |   x   |   n/a    |     n/a       |   x   |    n/a    |    n/a     |
| TR: | 600/601/605 |   x     |       |   x   |   n/a    |     n/a       |   x   |           |            |
| TR: | 710/711     |   x     |       |   x   |   n/a    |     n/a       |   x   |     x     |    n/a     |
| TR: | 900/901     |   x     |   x   |  n/a  |    x     |      x        |  n/a  |           |    n/a     |
| TR: | Ozmo 610    |   x     |   x   |   x   |   n/a    |     n/a       |   x   |     X     |     x      |
| TR: | Ozmo 900    |   x     |   x   |  n/a  |    x     |      x        |  n/a  |     x     |     x      |
| TR: | Ozmo 930    |   x     |   x   |  n/a  |    x     |      x        |  n/a  |     x     |     x      |
| TR: | Ozmo 950    |   x     |   x   |  n/a  |    x     |      x        |  n/a  |     x     |     x      |

TR: *) "basic" commands are `clean` (`auto`), `charge`, `stop`. They are not listed separately here.

TR: **) incl. number of `cleanings`

TR: ### Info and status
| TR: | model       | battery | chargestatus | cleanstatus | waterLevel | waterbox | consumables |
|------------ |-------- |------------- |------------ |----------- |--------  |------------ |
| TR: | Slim 2      |    x    |      x       |      x      |     n/a    |    n/a   |      x      |
| TR: | 600/601/605 |    x    |      x       |      x      |            |          |             |
| TR: | 710/711     |    x    |      x       |      x      |     n/a    |    n/a   |             |
| TR: | 900/901     |    x    |      x       |      x      |     n/a    |    n/a   |             |
| TR: | Ozmo 610    |    x    |      x       |      x      |      x     |          |      x      |
| TR: | Ozmo 930    |    x    |      x       |      x      |      x     |     x    |      x      |
| TR: | Ozmo 950    |    x    |              |      x      |            |          |             |

TR: ## Control
TR: ### Buttons
| TR: | name | description |
| --- | --- |
| TR: | charge | return to charging station |
| TR: | clean | start auto cleaning |
| TR: | edge | start edge cleaning |
| TR: | playSound | play a sound for locating the bot |
| TR: | spot | start spot cleaning |
| TR: | stop | stop the cleaning process |
| TR: | pause | pause the cleaning process |
| TR: | spotArea `0`-`9` | up to 9 buttons for the areas defined in the Ecovacs app |

TR: ### Area/zone cleaning
TR: #### SpotArea
TR: * spot areas are named with letters in the mobile app
TR:     * in the adapter they are mapped to a number:
TR:         * `A` = `0`
TR:         * `B` = `1`
TR:         * etc.
TR: * `spotArea`: comma-separated list of numbers
TR:     * starting by `0` (e.g. `1,3` = areas `B` and `D`) for areas to be cleaned
TR: * the number of buttons (`spotArea_0-9`) can be configured in the Adapter Configuration

TR: #### CustomArea
TR: * comma-separated list of exactly 4 position values for `x1,y1,x2,y2` (e.g. `-3975,2280,-1930,4575`)
TR:     * position `0,0,0,0` seems to be the position of the charging station
TR:     * a value of `1000` seems to be the distance of approximately 1 meter

TR: #### WaterLevel
TR: * Control and display water level (`low`, `medium`, `high` and `max`)

TR: ## Consumable
| TR: | name | description |
| --- | --- |
| TR: | filter | Filter lifespan |
| TR: | main_brush | Main brush lifespan |
| TR: | side_brush | Side brush lifespan |

TR: ## Info
| TR: | name | description |
| --- | --- |
| TR: | battery | battery |
| TR: | chargestatus | status while charging |
| TR: | cleanstatus | status while cleaning |
| TR: | communicationProtocol | XMPP or MQTT |
| TR: | deviceClass | Deebot device class |
| TR: | deviceName | Name of the device defined in the Ecovacs app |
| TR: | deviceStatus | status of the device |
| TR: | error | Current error message |

TR: ## Adapter configuration
| TR: | name | description |
| --- | --- |
| TR: | Email | Email address used for your Ecovacs account |
| TR: | Password | Passsword used for your Ecovacs account |
| TR: | Country code (continent) | Selection of pre-defined country codes (incl. continent) |
| TR: | Device number | Selection for the current instance if you use multiple devices |
| TR: | Number of spot areas | Number of sport areas defined in the Ecovacs app (default `0`) |

TR: ## Thanks and credits
TR: * @joostth ([sucks.js](https://github.com/joostth/sucks.js))
TR: * @wpietri ([sucks](https://github.com/wpietri/sucks))
TR: * @bmartin5692 ([sucks](https://github.com/bmartin5692/sucks), [bumber](https://github.com/bmartin5692/bumper))
TR: * @Ligio ([ozmo](https://github.com/Ligio/ozmo))

## Changelog

### 0.4.0
   * Improved support for MQTT devices

### 0.3.10
   * (mrbungle64) Improved support for XML based MQTT devices
   
### 0.3.9
   * (mrbungle64) Improved support for XML based MQTT devices

### 0.3.8
   * (boriswerner) Improved support for Ozmo 950
   * (mrbungle64) Implemented waterbox info (XMPP based devices)

### 0.3.7
   * (mrbungle64) Bugfix
   
### 0.3.6
   * (boriswerner) Basic clean & charge working (Ozmo 950)

### 0.3.5
   * (mrbungle64) Improved support for MQTT devices
   * (boriswerner) Improved support for Ozmo 950 device

### 0.3.4
* (mrbungle64) Feature Release
   * Implemented handling water level
   * Preparing for latest repo

### 0.3.3
* (mrbungle64) Feature release
   * Implemented lifespan values of components
   
### 0.3.2
* (mrbungle64) Feature release
   * Implemented spotArea buttons
   
### 0.3.1
* (mrbungle64) Feature release (alpha)
   * Implemented spotArea command
   * Implemented customArea command
   * Implemented playSound command
   
### 0.3.0
* (mrbungle64) alpha release

### 0.2.0
* (mrbungle64) Pre-release (alpha)

### 0.1.0
* (mrbungle64) Initial release (pre-alpha)

### 0.0.1
* (mrbungle64) Initial development release

## License
MIT License

Copyright (c) 2020 Sascha Hölzel <mrb1232@posteo.de>

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