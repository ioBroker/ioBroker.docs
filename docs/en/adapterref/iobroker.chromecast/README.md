![Logo](admin/home.png)
# ioBroker.chromecast

![Number of Installations](http://iobroker.live/badges/chromecast-installed.svg)
![Number of Installations](http://iobroker.live/badges/chromecast-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.chromecast.svg)](https://www.npmjs.com/package/iobroker.chromecast)

![Test and Release](https://github.com/iobroker-community-adapters/iobroker.chromecast/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/chromecast/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.chromecast.svg)](https://www.npmjs.com/package/iobroker.chromecast)

> [!IMPORTANT]
> This adapter cannot be installed from github

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## A Google Home adapter for ioBroker

This plugin allows to detect video and/or audio Google Home devices. For each detected Home device an ioBroker device is created. This device displays the status of the device and allows to send it a new URL to cast.

Build on top of the following projects:
  * [ioBroker](http://www.iobroker.net)
  * [node-castv2-client](https://github.com/thibauts/node-castv2-client) as Home client library.

## Instructions
1. Install this adapter into ioBroker
2. (optional) If you plan to stream local files or if your chromecast devices are located in a different subnet, you need to configure the adapter
   * you need to have an ioBroker web server instance to stream local files
   * you need to manually add information (name, IP, port, ad type) for each device located in a different subnet than your ioBroker server. If you want names to correspond  to the names of the automatically found devices, use the MAC address as name. You can define any name you want. Make sure, each name is unique! To avoid problems, names should only contain upper case characters A-Z, lower case characters a-z, digits 0-9, - (minus), and _ (underscore).
3. Check your log: you should see logs about the detected devices
4. Write a URL such as [http://edge.live.mp3.mdn.newmedia.nacamar.net/ps-dieneue_rock/livestream_hi.mp3](http://edge.live.mp3.mdn.newmedia.nacamar.net/ps-dieneue_rock/livestream_hi.mp3) to the chromecast.0.`<your chromecast name>`.player.url2play
5. The URL should start playing on your device

### No device found?
The devices are found with mDNS (multicast DNS: UDP port 5353, group 224.0.0.251). The adapter controls them over TCP
port 8009.
* Allow incoming UDP port 5353 in the firewall of the ioBroker host (e.g. `sudo ufw allow 5353/udp`).
* Docker: run the container with the network mode `host` (or macvlan); multicast does not pass the default bridge network.
* mDNS does not pass routers: devices in another subnet or VLAN are only found with an mDNS reflector on the router.
  Otherwise, add them by hand in the tab "Devices" of the settings.

### Unwanted devices found?
Third-party devices with Google Cast built-in (e.g. Denon/Marantz HEOS speakers, AVRs, or smart TVs) announce themselves
via mDNS just like Google Home / Chromecast devices and are therefore discovered automatically.
* To prevent the adapter from connecting to an unwanted device, set its state `chromecast.0.<device>.enabled` to `false`.
* A discovery ignore list is currently not available.

## Features
* detect devices with multicast-dns
  * optionally add additional manually configured devices in admin pannel, tab "devices"
* create ioBroker objects for each found device
* status, player, media and metadata channels
* control Google Home device from adapter
  * set volume
  * mute/unmute
  * stop broadcasting
  * pause
  * play url (chromecast.0.`<your Google Home name>`.player.url2play)
    * tested with MP3
      * Full list of formats [here](https://developers.google.com/cast/docs/media).
    * when the url does not start with http then assume that this is a local file
      * export file via ioBroker web server: it is copied to the file storage (`chromecast.0/<device id>/exportedMedia.mp3`) and played from there
    * it only plays fist file from playlist files such as .m3u
* Widget "Cast player" for [ioBroker.devices](https://github.com/ioBroker/ioBroker.devices): what a device plays
  (cover, title, artist or the app) with play, pause and stop; choose the instance and the device in its settings
* Web component `<iob-chromecast-player>` for vis-2, devices, Aura and admin: what plays with the progress, play /
  pause, stop, previous / next, volume and mute; choose the device (`chromecast.0.<device>`) in its settings
* Vis widget
  * NOTE: requires [patched vis adapter](https://github.com/angelnu/ioBroker.vis).
* Initial support for Chromecast audio groups
  * Note: this does not work with SSDP -> disable by default in adapter settings
* Play again last played stream: just set _chromecast.0.`<your device>`.status.playing_ to _true_

## Messages for scripts and AI agents
`sendTo('chromecast.0', 'help', {})` answers `{ help, commands }`: a description of the device states that play a URL or an
announcement, control the player and show what plays, for AI agents (e.g. ioBroker.pi-agent) and script authors. `commands`
lists every message the instance answers with `write: true` for the ones that change something (none does: besides `help`
there are only `chromecast:getDevices`, which lists the devices for the settings of the devices widget, and
`getWebServerIps` and `checkWebInstance`, which the settings dialog uses).

## What is missing?
* add state machine to track states: detected ->connected -> player loader -> playing
* add retries: sometimes the Google Home fails to respond to a request
* more testing

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
## Changelog
### **WORK IN PROGRESS**
- (meistermopper) README: document how to disable unwanted Cast devices (e.g. HEOS) [#377]
- (GermanBluefox) `npm run build` builds the complete adapter now: TypeScript, the devices widget and the web component (#573)
- (GermanBluefox) Used adapter timers in the cast classes and added dependabot entries for src-devices/src-webcomponents [#569]

### 4.3.0 (2026-11-20)
- (copilot) Adapter requires node.js >= 22.19.0 now
- (raintonr) Move castv2-player 'info' logging to 'debug' [#550]
- (bluefox) Added the message "help": a description of the states for AI agents (e.g. pi-agent), and common.supportedMessages.help
- (bluefox) The adapter was refactored to TypeScript and the settings dialog to JsonConfig
- (bluefox) Fixed: the adapter crashed when the connection closed after a YouTube video, and the ack of `url2play` for YouTube went to `undefined.player.url2play`
- (bluefox) Fixed: a disabled device can be enabled again, the acks of `enabled`, `status.playing` and `playlist.jump` are written to the device, and a device no longer reacts to the states of another device whose name starts with its name
- (bluefox) Fixed: `vis-2` is restarted after an update of the adapter (`restartAdapters` said `VIS-2`)
- (bluefox) Fixed: warning "Default value has to be stringified" for `playlist.list`; existing objects are corrected [#333]
- (bluefox) Fixed: endless status requests (hundreds of log lines per second, high CPU load) while an app plays that reports no playlist, e.g. Android TV apps [#241]; "not enabled" is logged only once per disabled device; no more "Cannot get status" after the start for devices that play nothing
- (bluefox) Fixed: local files can be played again ("is not an object of type meta", and the URL pointed to a folder that the web server does not know) [#323]
- (bluefox) README: what mDNS discovery needs (firewall, Docker, subnets) [#164]
- (bluefox) The library castv2-player (archived) is now part of the adapter, in TypeScript
- (bluefox) Fixed: "Error disconnecting - TypeError: Cannot read properties of null (reading 'socket')" when a device closes the connection [#474, #204, #377]; the player is detached only once
- (bluefox) Fixed: a disabled device connected again when its address changed; the adapter could crash when the address of a device changed
- (bluefox) Fixed: an M3U playlist with lines the parser does not understand (e.g. HLS `.m3u8`) crashed the adapter; HLS is now played as one stream
- (bluefox) Fixed: a radio stream in a playlist was downloaded until the adapter stopped; a redirect to a relative URL failed
- (bluefox) Fixed: every played URL left a listener behind (MaxListenersExceededWarning after 10 URLs, more memory and CPU)
- (bluefox) Fixed: `player.mute` was emptied on every volume change; a command that could not reconnect within 10 seconds logged the error `undefined`
- (bluefox) Fixed: writing `player.shuffleMode` switches shuffle on and off (it only logged "update not supported"), and `player.shuffleMode` shows the shuffle of the device
- (bluefox) Fixed: `player.state` was always 1 (play); it is 0 while paused and 2 while idle
- (bluefox) mime-types 3: without a content type from the server, `.aac` is played as `audio/aac` and `.wav` as `audio/wav`; `.mts`, `.m2ts` and `.m4b` are known now
- (bluefox) Fixed: titles of M3U playlists: `#EXTINF:-1,Radio Bob` showed "-1,Radio Bob"; attributes (`tvg-logo=…`) and lines like `#EXTVLCOPT` ended up in the title, and "Artist - Song - Remastered" was split at the last dash
- (bluefox) Fixed: an entry of a playlist without file extension (e.g. the URL of a radio station) showed its URL instead of the title of the playlist; without an artist in the playlist the artist is "--" (was "unknown")
- (bluefox) Fixed: the queue of a playlist keeps the order of the file (entries without file extension came last, in the order their servers answered)
- (bluefox) Added the widget "Cast player" for ioBroker.devices (what plays, play, pause, stop) and the web component `<iob-chromecast-player>` for vis-2, devices, Aura and admin

### 4.2.0 (2026-05-04)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (mcm1957) Logging technical deatils reduced to debug level
- (mcm1957) Dependencies have been updated

### 4.1.1 (2026-02-16)
- (mcm1957) Linting has been updated to @iobroker/eslint-config

### 4.1.0 (2026-02-16)
- (mcm1957) Adapetr requires node.js >= 20 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now
- (mcm1957) Dependencies have been updated

### 4.0.0 (2024-10-09)
* (neopholus) Release 3.4.0 added support for devices located in adifferent subnet. This introduced a problem due to changing some state-ids reported at issue #274. This problem has been fixed. This might be considered a breaking change for some people. 
* (mcm1957) Testing for node.js 22.x has been added.
* (mcm1957) Several issues reported by adapter checker have been fixed.
* (mcm1957) Dependencies have been updated

## License
The MIT License (MIT)

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2015-2022 Vegetto <iobroker@angelnu.com>

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