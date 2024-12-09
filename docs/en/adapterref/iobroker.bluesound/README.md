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

The adapter uses API calls in the format: http://--playerAPI--:11000/xxx

A timeout parameter is set by optional parameter 'config.TimeOut' as timeout for the API call. Default value is 2 secs.

At startup the presets are read and added to the 'presets' channel.
Player model and name are stored in the 'info' channel.
When player is playing the titles are set in the 'info' channel.

The player status is polled in the interval set by 'config.pollingtime' and the result is stored in 'control.state' as well as in 'info.\*'.

PollingTime values up to 120 secs are reasonable. The adapter cannot be startet with values larger than 300 secs. Default value is 30 secs.

The following functions are implemented:

-   Player stop (triggered by setting 'control.stop' to true)
-   Player start (triggered by setting 'control.start' to true)
-   Player Pause (triggered by setting 'control.pause' to true, toggle mode)
-   Play Presetxxx (triggered by setting '.presets.preset(x).start' to true)
-   Change Volume (triggered by changing 'control.volume')

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.1.1 (2024-12-01)

-   (Uwe Nagel) README.md cosmetics
-   (Uwe Nagel) Added Weblate translation badge
-   (Uwe Nagel) Bump cross-spawn from 7.0.3 to 7.0.6
-   (Uwe Nagel) Switch to adapter-core3.2.2
-   (Uwe Nagel) Corrected logic for remote volume changes

### 1.1.0 (2024-10-19)

-   (Uwe Nagel) Potentially invalid characters are replaced before creating an object
-   (Uwe Nagel) setTimeout used instead of setInterval, clearTimeout added
-   (Uwe Nagel) Check values for PollingTime and TimeOut
-   (Uwe Nagel) Missing sizes added
-   (Uwe Nagel) State roles reevaluated
-   (Uwe Nagel) subscribeState calls eliminated
-   (Uwe Nagel) Instance prefixes in ObjectIds are omitted when calling setState()
-   (Uwe Nagel) State change now honors ack flag
-   (Uwe Nagel) PollingTime and TimeOUT changed to type number
-   (Uwe Nagel) onReady() stopped when no IP is set
-   (Uwe Nagel) Testing extended to node 22.x
-   (Uwe Nagel) Example code removed

### 1.0.3 (2024-09-26)

-   (Uwe Nagel) Parsing of /State corrected

### 1.0.2 (2024-09-19)

-   (Uwe Nagel) Modified due to adapter checks

### 1.0.1 (2024-05-24)

-   (Uwe Nagel) Added config descriptions
-   (Uwe Nagel) Added translations for object descriptions
-   (Uwe Nagel) Added role definition for all objects
-   (Uwe Nagel) Added Timeout config Parameter

### 1.0.0 (2024-05-17)

-   (Uwe Nagel) initial release

## License

MIT License

Copyright (c) 2024 Uwe Nagel <uwenagel@kabelmail.de>

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
