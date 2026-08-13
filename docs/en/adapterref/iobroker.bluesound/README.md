![Logo](admin/bluesound.png)

# ioBroker.bluesound

[![NPM version](https://img.shields.io/npm/v/iobroker.bluesound.svg)](https://www.npmjs.com/package/iobroker.bluesound)
[![Downloads](https://img.shields.io/npm/dm/iobroker.bluesound.svg)](https://www.npmjs.com/package/iobroker.bluesound)
![Number of Installations](https://iobroker.live/badges/bluesound-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/bluesound-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.bluesound.png?downloads=true)](https://nodei.co/npm/iobroker.bluesound/)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/bluesound/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Tests:** ![Test and Release](https://github.com/Uwe1958/ioBroker.bluesound/workflows/Test%20and%20Release/badge.svg)

## bluesound adapter for ioBroker

Adapter to control Bluesound devices

## Functions included

The adapter uses API calls in the format: http://--playerIP--:11000/xxx

At startup the presets are read from the player and added to the _'presets'_ channel.
Player model and name are stored in the _'info'_ channel.
When player is playing the titles are set in the _'info'_ channel.

The player status is polled in the interval set by _'config.pollingtime'_ and the result is stored in _'control.state'_ as well as in _'info.\*'_.

PollingTime values up to 120 secs are reasonable. The adapter cannot be startet with values larger than 300 secs. Default value is 30 secs.

A timeout parameter is set by optional parameter _'config.TimeOut'_ as timeout for the API call. Default value is 2 secs.

The following functions are implemented:

- Player Stop (triggered by setting _'control.stop'_ to true)
- Player Start (triggered by setting _'control.start'_ to true)
- Player Pause (triggered by setting 'control.pause' to true)
- Play Presetxxx (triggered by setting _'.presets.preset(x).start'_ to true)
- Change Volume (triggered by changing _'control.volume'_)
- Shuffle Playlist (triggered by setting _'control.shuffle'_ to true, toggle mode)
- Playlist forward (triggered by setting _'control.forward'_ to true)
- Playlist backward (triggered by setting _'control.backward'_ to true)

Library browsing for LocalMusic is added. A dynamic menu list is available in _'info.list'_. This object should be set as the 'Object ID' for a json-table to visualize the current menu. The object _'control.command'_ is used to pass the next command to the player. It is updated by defining it as the 'Selected ID' of that table. The table header itself is updated by using _'info.listheader'_ via object binding for the first headers' name. For better visualization only the first header should be shown and its width should be set to 100%.

All contents is drilled down up to the album level (with the exception of the Songs menu, in which songs are directly listed). When an album is selected its content is immediately played, replacing the contents of the current playlist or added to the current playlist. This behaviour is dependent on the value of _'info.playliststate'_. If the value is true the playlist is replaced, in the other case the new content is added. This object can be changed by _'control.playlist'_ (Button with Toggle mode). Each time this button is pressed, the value of _'info.playliststate'_ is inverted.

Library search is added. If a search string is entered in _'control.search'_ (via an input filed in the browser) the result of the search is shown in _'info.list'_ and can be further drilled down like in library browsing.

It is now also possible to stream music from Radio Stations. The stations are organized in a menu structure supplied by the player. When a station is selected, music is immediately played.

Streaming from the following sources is now available: 'Amazon', 'TuneIn', 'Calm Radio', 'Deezer', 'Neil Young Archives', 'Qobuz', 'Radio Paradise' and 'Tidal'. Each service has different menu structures that is built in the application. Again the object _'info.list'_ is used to visualize the menu

The contents of the current playlist is available in the object _'info.playlist'_ (JSON) and can be visualized this way. It is also available as an html- table in _'info.playlisthtml'_ and can be directly visualized in a html widget. The format of the resulting table can be modified using CSS (example is shown below).

```javascript
.playlist table {
    background-color: rgba(0, 0, 0, 0.0) !important;
    width: 100%;
    border-collapse: collapse;
    display: block;
    overflow-y: auto;
    max-height: 100%;
}
.playlist img {
    margin: 10px;
    height: 50px;
    width:  50px;
}

.playlist .title {
    color: #ffffff;
    font-size: 18px;
    padding-top: 10px;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.playlist .artist {
    color: #888888;
    padding-bottom: 10px;
}

.playlist .current {
    color: #2f9bde;
    font-size: 18px;
    padding-top: 10px;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.playlist div {
    height: 800px;
}
```

## Changelog
### 1.5.0 (2026-08-10)

- (Uwe Nagel) Amazon service added
- (Uwe Nagel) TuneIn service added
- (Uwe Nagel) Deezer service added
- (Uwe Nagel) NYA service added
- (Uwe Nagel) Qobuz service added
- (Uwe Nagel) RadioParadise service added
- (Uwe Nagel) Tidal service added

### 1.4.0 (2026-07-25)

- (Uwe Nagel) Fixes @types/node version
- (Uwe Nagel) Corrected translation files
- (Uwe Nagel) Bump @iobroker/adapter-core from 3.3.2 to 3.4.1
- (Uwe Nagel) Translation converted to short format
- (dependabot) Bump @iobroker/eslint-config from 2.2.0 to 2.3.4
- (dependabot) Bump axios from 1.16.0 to 1.16.1
- (dependabot) Bump @types/node from 25.6.0 to 25.9.1
- (Uwe Nagel) Radio stations added

### 1.3.1 (2026-06-05)

- (copilot) Adapter requires node.js >= 22 now
- (Uwe Nagel) Code consolidation and update @alcalzone/release-script to 5.2.1
- (Uwe Nagel) Fixed issue 184
- (Uwe Nagel) Fixed issue 152
- (Uwe Nagel) Fixed issue 162

### 1.3.0 (2025-12-03)

- (Uwe Nagel) Library search added
- (Uwe Nagel) Add control.search
- (Uwe Nagel) Add info.playlisthtml
- (Uwe Nagel) Add info.playliststate
- (Uwe Nagel) Function setPlaylistToggle added
- (Uwe Nagel) Add control.playlist
- (Uwe Nagel) Function readPlaylist added
- (Uwe Nagel) Add info.playlist
- (Uwe Nagel) Library browsing added

### 1.2.1 (2025-10-18)

- (Uwe Nagel) Add info.list and control.command
- (Uwe Nagel) Changes according to ioBroker Check
- (Uwe Nagel) Bump @types/node from 24.5.2 to 24.6.1
- (Uwe Nagel) Bump chai from 6.0.1 to 6.2.0
- (Uwe Nagel) Bump typescript from 5.9.2 to 5.9.3
- (Uwe Nagel) Bump mocha from 11.7.2 to 11.7.3
- (Uwe Nagel) Correct error in main.js, update package-lock.json
- (Uwe Nagel) Update io-package.json and package.json
- (Uwe Nagel) Update .vscode/jsonConfig.json and .gitignore
- (Uwe Nagel) Resolve dependency errors
- (Uwe Nagel) Bump mocha from 11.1.0 to 11.7.1
- (Uwe Nagel) Bump globals from 16.2.0 to 16.3.0
- (Uwe Nagel) Bump @types/node from 24.0.8 to 24.1.0
- (Uwe Nagel) Bump typescript from 5.7.3 to 5.9.2
- (Uwe Nagel) Bump chai from 5.2.0 to 5.2.1
- (Uwe Nagel) Further code cleaning (apiclient, getStateAsync)
- (Uwe Nagel) @types/xml2js added
- (Uwe Nagel) Move to eslint 9 and fix subsequent issues

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2025-2026 Uwe Nagel <uwenagel@kabelmail.de>

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
