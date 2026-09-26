![Logo](admin/habpanel.svg)
# ioBroker.habpanel

![Number of Installations](http://iobroker.live/badges/habpanel-installed.svg) ![Number of Installations](http://iobroker.live/badges/habpanel-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.habpanel.svg)](https://www.npmjs.com/package/iobroker.habpanel)
[![Downloads](https://img.shields.io/npm/dm/iobroker.habpanel.svg)](https://www.npmjs.com/package/iobroker.habpanel)

[![NPM](https://nodei.co/npm/iobroker.habpanel.png?downloads=true)](https://nodei.co/npm/iobroker.habpanel/)

HABPanel is a lightweight dashboard interface for ioBroker based on OpenHAB HABpanel.

It notably features an embedded dashboard designer allowing to build interfaces easily right on the target device.

## Installation
**Important!**
This adapter cannot be installed directly from GitHub. Only from npm.

## Getting started

- When accessing HABPanel for the first time on a new browser or device, you should be presented with a rather empty screen - follow the tutorial and begin by clicking (or tapping) on the icon in top-right corner .
- You're now in edit mode, a link (_"Add new dashboard"_) appeared, as well as an _"Advanced settings"_ link.
- If you previously used HABPanel and stored some panel configurations on the server, go to _"Advanced settings"_ and click on your previous configuration - it will be instantly brought back. Or, create your first dashboard: click/tap on the _"Add new dashboard"_ link and give it a name.
- Click/tap on the dashboard tile to enter the dashboard editor
- Add your first widget: select the _"Add Widget"_ menu and choose a widget type (let's say Dummy - a simple widget displaying an item's state)
- Move the widget by drag-and-drop and resize it with the white chevron - it appears when you click on the widget
- Hit on the three dots in the widget top-right corner to bring up its context menu and choose _"Edit..."_
- Adjust some settings (name, openHAB item etc.) and confirm your changes
- Save your configuration by clicking/tapping the _Save_ button
- Click/tap _Run_ to see your dashboard in action - use your browser's back button or the arrow to go back to the drawing board
- Once you're happy with your set of dashboards, go back to _"Advanced settings"_ then click/tap on _"Save the current configuration to a new panel configuration"_; this will store it on the openHAB 2 server as described above, and make it available for reuse.

## Screenshots

![](doc/images/habpanel_screenshot0.png)

![](doc/images/habpanel_screenshot1.png)

![](doc/images/habpanel_screenshot2.png)

![](doc/images/habpanel_screenshot3.png)

![](doc/images/habpanel_screenshot4.png)

![](doc/images/habpanel_screenshot5.png)

![](doc/images/habpanel_screenshot6.png)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 1.0.0 (2026-09-25)
- (nowrap) Chart series are no longer truncated to 500 values (#149)
- (nowrap) getHistory no longer invokes its callback twice on a late answer
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now
- (mcm1957) Dependencies have been updated.
- (@GermanBluefox) SVG Logo

### 0.5.0 (2022-02-16)
* (jogibear9988) added on support for new websockets

### 0.4.3 (2020-08-22)
* (bluefox) The compatibility to socket.io 3.0.13 provided

### 0.4.1 (2020-02-10)
* (Apollon77) compatibility to web 3.0

### 0.3.5 (2019-04-15)
* (yaming116) bugfix i18n

## License
Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright 2017-2022 bluefox <dogafox@gmail.com>

Eclipse Public License