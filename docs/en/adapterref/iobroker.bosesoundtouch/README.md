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
### 0.10.3 (2022-06-17)
* (Apollon77) Fix crash case reported by Sentry

### 0.10.2 (2022-06-12)
* (Apollon77) Check if adapter is configured properly before trying to connect

### 0.10.1 (2022-06-02)
* (Apollon77) Add Sentry for crash reporting

### 0.10.0 (2021-07-30)
* IMPORTANT: The adapter now requires at least js-controller 2.0
* (Apollon77) Optimize for js-controller 3.3

### 0.9.4 (07.05.2021)
* fixed vulnerability in NPM

### 0.9.3 (02.02.2021)

* transfer of adapter to iobroker-community-adapters

### 0.9.3 (10.01.2021)

* Added elapsed time, duration, status, keys and roles

### 0.9.2 (09.12.2019)

* We don't use adapter.objects anymore

### 0.9.1 (12.05.2019)

* Support for compact mode.
* Fixed bugs found by adapter checker.

### 0.9.0 (23.01.2019)

* Added possibility to change the source.  
  All available sources are listed as states in folder sources and can be used as play buttons.

### 0.2.4 (05.05.2019)

* Core Files/Testing Update and introduce adapter-core

### 0.2.3 (11.11.2018)

* fixed issue #24 "does not start"

### 0.2.2 (03.11.2018)

* Zones: objects moved to sub folder 'zones'

### 0.2.1 (12.10.2018)

* Update now playing info for source Deezer

### 0.2.0 (27.09.2018)

* Add support for zones

### 0.1.9 (07.03.2018)

* Update now playing info for source Amazon

### 0.1.8 (08.02.2018)

* Update now playing info for source Spotify
* now playing: added state 'genre'

### 0.1.7 (04.02.2018)

* fixed crash if no presets are defined

### 0.1.6 (17.01.2018)

* fixed crash if socket connection fails
* added setting: time to reconnect in seconds

### 0.1.5 (06.01.2018)

* added 'TUNEIN' to now playing info
* state playEverywhere falls back to false after activation
* admin/bose.png renamed to admin/bosesoundtouch.png to be shown correctly in adapter list
* added short adapter description in io-package.json

### 0.1.4 (30.12.2017)

* playEverywhere: support multi room (zones) to define one speaker as master for all others

### 0.1.3 (22.12.2017)

* revert last change

### 0.1.2 (22.12.2017)

* fixed typo in package.json

### 0.1.1 (20.12.2017)

* now playing: added state 'art' (URL to cover image if available)
* merged pull request from Apollon77 (basic config files for testing)
* renamed repository to 'ioBroker.bosesoundtouch'

### 0.1.0 (26.11.2017)

* objectChange/stateChange: log level 'debug'
* added 'STORED_MUSIC' to now playing info.

### 0.0.9 (22.11.2017)

* Merge pull request #1 from Apollon77/master: Add testing and fix things...

### 0.0.8 (19.11.2017)

* send value to correct instance when having multiple adapters installed
* first version of README.md

### 0.0.7 (09.11.2017)

* fixed logging in soundtouchsocket.js

### 0.0.6 (09.11.2017)

* renamed main.js to bosesoundtouch.js
* line ending: LF
* strings: single quote

### 0.0.5 and earlier (01.11.2017)

* Initial versions

## License

MIT License

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
