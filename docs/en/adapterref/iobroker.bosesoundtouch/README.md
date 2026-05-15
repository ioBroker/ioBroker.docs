![Logo](admin/bosesoundtouch.png)
# ioBroker.bosesoundtouch

![Number of Installations](http://iobroker.live/badges/bosesoundtouch-installed.svg)
![Number of Installations](http://iobroker.live/badges/bosesoundtouch-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.bosesoundtouch.svg)](https://www.npmjs.com/package/iobroker.bosesoundtouch)

![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.bosesoundtouch/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/bosesoundtouch/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.bosesoundtouch.svg)](https://www.npmjs.com/package/iobroker.bosesoundtouch)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

Bose SoundTouch adapter for ioBroker IoT platform

## Control States

To control your speaker, the following objects can be written:

| State          | Description |
| :---           | :---        |
| key            | One of the following keys to send: <br><br> PLAY <br> PAUSE <br> STOP <br> PREV_TRACK <br> NEXT_TRACK <br> THUMBS_UP <br> THUMBS_DOWN <br> BOOKMARK <br> POWER <br> MUTE <br> VOLUME_UP <br> VOLUME_DOWN <br> PRESET_1 <br> PRESET_2 <br> PRESET_3 <br> PRESET_4  <br> PRESET_5 <br> PRESET_6 <br> AUX_INPUT <br> SHUFFLE_OFF <br> SHUFFLE_ON <br> REPEAT_OFF <br> REPEAT_ONE <br> REPEAT_ALL <br> PLAY_PAUSE <br> ADD_FAVORITE <br> REMOVE_FAVORITE <br> INVALID_KEY |
| muted          | Mute or un-mute the device. |
| on             | Power on or off the device. |
| playEverywhere | Define speaker as zone master and play its content on all other speakers. |
| volume         | Change device volume between 0 and 100. |

## Info States

The following information is collected from your speaker (read-only states):

### Device Info

| State      | Description |
| :---       | :---        |
| ipAddress  | The device IP address, usually the same that you configured in adapter settings. |
| macAddress | The device MAC address |
| name       | The name you configured with your SoundTouch App. |
| type       | The device type (e.g. SoundTouch 300). |

### Now Playing

| State      | Description |
| :---       | :---        |
| album      | The currently playing album. |
| art        | The URL of the source art. |
| artist     | The currently playing artist. |
| genre      | The genre of current playing track. |
| source     | The type or name of the service playing. To determine if the product is in standby mode, check if source == STANDBY. |
| station    | The station or playlist name. |
| track      | The currently playing track. |

### Presets

The following states are present for each of the 6 available presets:

| State      | Description |
| :---       | :---        |
| iconUrl    | The URL of the source art. |
| name       | The album, station, playlist, song, phone, etc. name depending on the source. |
| source     | The type or name of the service. |

### Zones

The following description will help you to create groups with you multi room system. The read-only
field are automatically updated by the soundtouch devices, also if you change the groups by the
Soundtouch Application itself.

| State      | Description |
| :---       | :---        |
| masterOf   | Display the MAC addresses of the slaves of a speaker (split by ";") (read-only) |
| memberOf   | Display the MAC address of the master of this speaker (read-only)|
| addMasterOf| Add MAC address of the speaker you would like to add to this master speaker. Also possible to put more then one speaker (split by ";").|
| removeMasterOf| Add MAC address of the speaker you would like to remove from this master speaker. Also possible to put more then one speaker (split by ";").|

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.12.0 (2026-05-09)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (mcm1957) Dependencies have been updated
- (copilot) Migrated to ESLint 9 and @iobroker/eslint-config following ioBroker community standards

### 0.11.1 (2024-04-03)
* (mcm1957) Release workflow has been fixed

### 0.11.0 (2024-04-03)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Testing has been changed to support node 18 and 20
* (mcm1957) Dependencies have been updated

### 0.10.3 (2022-06-17)
* (Apollon77) Fix crash case reported by Sentry

### 0.10.2 (2022-06-12)
* (Apollon77) Check if adapter is configured properly before trying to connect

## License

MIT License

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2019-2022 SwedishChef <swedish.chef@gmx.at>

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
