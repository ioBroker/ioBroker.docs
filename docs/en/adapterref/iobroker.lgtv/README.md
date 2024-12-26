![Logo](admin/lgtv.png)

# ioBroker.lgtv

[![NPM version](https://img.shields.io/npm/v/iobroker.lgtv.svg)](https://www.npmjs.com/package/iobroker.lgtv)
[![Downloads](https://img.shields.io/npm/dm/iobroker.lgtv.svg)](https://www.npmjs.com/package/iobroker.lgtv)
![Number of Installations](https://iobroker.live/badges/lgtv-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/lgtv-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.lgtv.png?downloads=true)](https://nodei.co/npm/iobroker.lgtv/)

**Tests:** ![Test and Release](https://github.com/SebastianSchultz/ioBroker.lgtv/workflows/Test%20and%20Release/badge.svg)

LG WebOS SmartTV adapter for ioBroker

Remote controlling an LG WebOS SmartTV (2013 models and higher) from [ioBroker](https://www.iobroker.net).

---

## Usage:

Install the adapter through ioBroker admin interface.
In the adapter config input the ip address of your LG WebOS TV.
At first connection you will receive a pairing prompt on your TV screen where you should allow the connection.

### Polling

Some TVs disconnect from the web socket when the TV is turned off and do not report this to the adapter correctly. Then additional polling is required. You can define the time in settings. If the value is empty, the adapter tries to detect this automatically:
On adapter restart the polling (every 60 sec) is active until the first correct TV off event is detected.

## Some examples:

`setState('lgtv.0.states.popup', 'Some text!');`

This will show a popup with the text "Some text!" on the TV.
You can use HTML linebreaks (br) in the text.

`setState('lgtv.0.states.turnOff', true);`

Switching off the TV.

`setState('lgtv.0.states.mute', true);`

Mute the TV.

`setState('lgtv.0.states.mute', false);`

Unmute the TV.

`setState('lgtv.0.states.volumeUp', true);`

This will increase the volume of the TV.

`setState('lgtv.0.states.volumeDown', true);`

Decreasing the volume of the TV.

`setState('lgtv.0.states.channelUp', true);`

Increasing the current TV channel.

`setState('lgtv.0.states.channelDown', true);`

Decreasing the current TV channel.

`setState('lgtv.0.states.3Dmode', true);`

Activates the 3D mode on the TV

`setState('lgtv.0.states.3Dmode', false);`

Deactivates the 3D mode on the TV.

`setState('lgtv.0.states.channel', 7);`

Switching the live TV to channel number 7.

`setState('lgtv.0.states.launch', 'livetv');`

Switching to Live TV mode.

`setState('lgtv.0.states.launch', 'smartshare');`

Opening the SmartShare App on the TV.

`setState('lgtv.0.states.launch', 'tvuserguide');`

Runs the TV User Guide App on the TV.

`setState('lgtv.0.states.launch', 'netflix');`

Opening the Netflix App on the TV.

`setState('lgtv.0.states.launch', 'youtube');`

Opens the Youtube App on the TV.

`setState('lgtv.0.states.launch', 'prime');`

Opens the Amazon Prime App on the TV.

`setState('lgtv.0.states.launch', 'amazon');`

On some TVs this command opens the Amazon Prime App.

`setState('lgtv.0.states.openURL', 'http://www.iobroker.net');`

Opens the Webbrowser on the TV and navigates to www.iobroker.net.
Can also be used to open images or videos (in the browser).

`setState('lgtv.0.states.input', 'av1');`

Switches the iput oh the TV to AV1.

`setState('lgtv.0.states.input', 'scart');`

Switches the iput oh the TV to Scart.

`setState('lgtv.0.states.input', 'component');`

Switches the iput oh the TV to Component.

`setState('lgtv.0.states.input', 'hdmi1');`

Switches the iput oh the TV to HDMI 1.

`setState('lgtv.0.states.input', 'hdmi2');`

Switches the iput oh the TV to HDMI 2.

`setState('lgtv.0.states.input', 'hdmi3');`

Switches the iput oh the TV to HDMI 3.

`setState('lgtv.0.states.youtube', 'https://www.youtube.com/watch?v=AjSpMQfRmEo'); OR setState('lgtv.0.states.youtube', 'AjSpMQfRmEo');`

Play YouTube video.

`setState('lgtv.0.states.raw', '{"url": "ssap://system.launcher/launch", "cmd": "{id: 'netflix'}" }');`
`setState('lgtv.0.states.raw', '{"url": "ssap://api/getServiceList", "cmd": ""}');`

Sending and response RAW command API.

`setState('lgtv.0.remote.*KEY*', true);`

Send remote KEY to TV.

`setState('lgtv.0.states.power', true/false);`

Turn Off TV and Turn On TV (TurnOn, works only LAN, using WOL).

`setState('lgtv.0.states.soundOutput', 'external_arc');`

Switch audio output through ARC (HDMI).

---

## States

channel

holds the current channel

volume

holds the current volume level and can change the volume

on

is true when TV is on and false if TV is off

---

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.3.2 (2024-12-21)

* (mcm1957) Poll-interval limited to 5s minimum.
* (mcm1957) Compact mode has been disabled due to outdated timer handling.
* (mcm1957) Dependencies have been updated

### 2.3.1 (2024-12-03)

* (Feuer-Sturm) Some default values and limits of paramaters have been corrected.

### 2.3.0 (2024-12-02)

* (mcm1957) Adapter requires node.js 20 now.
* (mcm1957) Adapter requires js-controller 5 and admin 6 now.
* (Jey-Cee) Adapter has been migrated to jsonConfig and responsive design rules have been applied.
* (mcm1957) Dependencies have been updated.

### 2.2.0 (2024-04-13)

* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 2.1.2 (2023-10-26)

- (agross) Functionality of state.on turning false immediately after turning off the TV with turnOff has been restored. [#165]
- (mcm1957) Dependencies have been updated

### 2.1.1 (2023-10-06)

- (basti4557) Websocket configuration has been fixed [#161].

### 2.1.0 (2023-10-05)

- (basti4557) A bug that destryed the actual app state on changing from tv to app mode has been fixed.
- (basti4557) Websocket SSL states can now be sent / received again due to the websocket ssl changes.
- (basti4557) Plain websocket has been replced by SSL Websocket.

### 2.0.0 (2023-10-03)

- (mcm1957) Adapter has been moved to iobroker-community-adapters area
- (mcm1957) POSSIBLE BREAKING: Adapter has been built from current github content. As latest npm packages have been created external, theres a chance that some changes got lost.
- (jpawlowski) Travis and AppVeyor have been replced by GitHub Actions, based on ioBroker/create-adapter
- (jpawlowski) Adpter requires NodeJS 16 minimum now
- (jpawlowski) Dependencies have been updated
- (jpawlowski) Configuration item healthIntervall has been rename/correct to healthInterval

### 1.1.12 (2023-07-04)

-   (foxriver76) prepare for controller v5

### 1.1.10 (2020-08-24)

-   (SebastianSchultz) support WebOS 5 for volume change

### 1.1.9 (2020-07-14)

-   (SebastianSchultz) re-upload for fixing NPM update issue

### 1.1.8 (2020-07-08)

-   (SebastianSchultz) bugfix for "IndexOf" error

### 1.1.6 (2020-03-07)

-   (dirkhe) make healthintervall configurable

### 1.1.5 (2020-02-25)

-   (dirkhe) stable connection and subsciptions
-   (dirkhe) add Polling for TV, which not support Power Off event
-   (dirkhe) change some states role switch to button

### 1.1.4 (2020-02-07)

-   (dirkhe) changed from pull to subscribing
-   (dirkhe) add livetv to launch list

### 1.1.3 (2019-12-16)

-   (merdok) fixed connect() [Pull requests #62](https://github.com/SebastianSchultz/ioBroker.lgtv/pull/62)
-   (instalator) fixed [issues #64](https://github.com/SebastianSchultz/ioBroker.lgtv/issues/64)
-   (instalator) change error log to debug [issues #59](https://github.com/SebastianSchultz/ioBroker.lgtv/issues/59)

### 1.1.1 (2019-10-26)

-   (instalator) Safe keyfile to /opt/iobroker [issues #52](https://github.com/SebastianSchultz/ioBroker.lgtv/issues/52)
-   (instalator) fix error reconect
-   (instalator) fix raw object
-   (instalator) add mac address to admin settings

### 1.1.0 (2019-10-10)

-   (instalator) adding object remote.KEY
-   (instalator) fix connect to TV
-   (instalator) add subscribe volume and mute state
-   (instalator) translate admin to RUS
-   (instalator) add Turn On, using WOL
-   (instalator) adding new different objects
-   (SebastianSchultz) changed roles "button" to "switch" for compatibility for iot- & cloud-adapter

### 1.0.8 (2019-03-15)

-   (SebastianSchultz) general NPM update

### 1.0.7 (2019-01-28)

-   (SebastianSchultz) grouping of all states/objects under a device

### 1.0.6 (2019-01-21)

-   (SebastianSchultz) added compact mode

### 1.0.5 (2018-04-15)

-   (SebastianSchultz) added Travis-CI and AppVeyor tests

### 1.0.4 (2018-04-07)

-   (SebastianSchultz) added support for increasing (channelUp) or decreasing (channelDown) the current TV channelDown
-   (SebastianSchultz) added the state "volume" which holds the current volume level

### 1.0.3 (2018-01-11)

-   (SebastianSchultz) added support for launching Amazon Prime app via "amazon" (used on some TV's instead of "prime")
-   (SebastianSchultz) fixed issue that state "on" was not set when in an app on TV

### 1.0.2 (2017-05-23)

-   (SebastianSchultz) added support for launching Amazon Prime app

### 1.0.0 (2016-09-26)

-   (SebastianSchultz) added channel polling
-   (SebastianSchultz) added switching input

### 0.0.4 (2016-09-12)

-   (SebastianSchultz) solved saving IP address within adapter configuration

### 0.0.3 (2016-09-05)

-   (SebastianSchultz) added volumeUp true|false
-   (SebastianSchultz) added volumeDown true|false
-   (SebastianSchultz) added 3Dmode true|false
-   (SebastianSchultz) added launch livetv|smartshare|tvuserguide|netflix|youtube|<URL>
-   (SebastianSchultz) added channel <channelNumber>
-   (SebastianSchultz) some code cleaned

### 0.0.2 (2016-09-02)

-   (SebastianSchultz) removed reconnect function, not used
-   (SebastianSchultz) improved error handling and logging

### 0.0.1 (2016-08-31)

-   (SebastianSchultz) initial commit

---

## License

MIT License

Copyright (c) 2024 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2023 Sebastian Schultz.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
