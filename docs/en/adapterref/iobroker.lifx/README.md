![Logo](admin/lifx_logo.png)

# ioBroker.lifx

![Number of Installations](http://iobroker.live/badges/lifx-installed.svg) ![Number of Installations](http://iobroker.live/badges/lifx-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.lifx.svg)](https://www.npmjs.com/package/iobroker.lifx)
[![Downloads](https://img.shields.io/npm/dm/iobroker.lifx.svg)](https://www.npmjs.com/package/iobroker.lifx)

**Tests:** ![Test and Release](https://github.com/foxthefox/ioBroker.lifx/workflows/Test%20and%20Release/badge.svg)

Lifx adapter for ioBroker

## Settings/Configuration:

- no settings or configuration required, adapter automatically detects the lamps

### metro widget unreachable status

- small icon for unreachable status in metro-widget is the first object of notification
- object_id[0] is the indicator.unreachable
- instead of presetting "true", "false" shall be written
- the icon should be wifiColorRed.png
- horizontal offset of 6 should work fine

## Visualization:

- use lifx widgets

## objects

| Object             | Value   | settable | Description                     |
| ------------------ | ------- | :------: | ------------------------------- |
| Bulb.state         | boolean |    x     | true/false -> ON/OFF            |
| Bulb.colormode     | boolean |    x     | color, white                    |
| Bulb.temp          | value   |    x     | color temperature 2500...9000 K |
| Bulb.hue           | value   |    x     | color 0...360                   |
| Bulb.sat           | value   |    x     | saturation 0...100 %            |
| Bulb.bright        | value   |    x     | brightness 0...100 %            |
| Bulb.online        | boolean |    -     | true/false                      |
| Bulb.label         | value   |    -     | name/label                      |
| Bulb.vendor        | value   |    -     | vendor info                     |
| Bulb.product       | value   |    -     | product info                    |
| Bulb.colorLamp     | value   |    -     | colorLamp info                  |
| Bulb.infraredLamp  | value   |    -     | infraredLamp info               |
| Bulb.multizoneLamp | value   |    -     | multizoneLamp info              |
| Bulb.Zone.temp     | value   |    x     | color temperature 2500...9000 K |
| Bulb.Zone.hue      | value   |    x     | color 0...360                   |
| Bulb.Zone.sat      | value   |    x     | saturation 0...100 %            |
| Bulb.Zone.bright   | value   |    x     | brightness 0...100 %            |

## TODO:

- getting adjustment of color values with all existing settings (brighness adjust has fixed 80% saturation and keeps the previous hue setting; saturation adjust and hue adjust has fixed 80% brightness)
- transition times
- waveforms

## known issues

- values outside of range cause crash of adapter

## Changelog:

### 1.0.9

- update dependencies
- update to iobroker/eslint

### 1.0.8

- update dependencies

### 1.0.7

- (Jarves020) Reactivated Cyclic Updates (brackets were missing at function call)
- (Jarves020) reenabled Settings for lifx Cyclic Update Intervall
- (Jarves020) Changed LogLevel for "Failed Cyclic Update...." from error to debug to avoid log spamming
- (foxthefox) IOB checker corrections

### 1.0.6

- eslint upgrade and corrections

### 1.0.5

- update devDeps
- IOB checker corrections

### 1.0.4

- implementation jsonUI

### 1.0.3

- translation with adapter-dev

### 1.0.2

- some changes to loglevel
- fix crash when no label is provided

### 1.0.1

- bugfix, context of 'this' in timeout
- Null exception with B/W bulb issue#23

### 1.0.0

- refactoring, change to class based structure of the adapter
- gitub actions instead travis

### 0.2.1

- (Jarvis020) errorhandling improvements
- (Jarvis020) fade time

### 0.2.0

- lifx-lan-client library instead node-lifx
- states for vendor, product, version, product features
- multizone support
- cyclic polling

### 0.1.1

- logo quadratic

### 0.1.0

- compact mode

### 0.0.5

- adminv3
- noConfig -> no admin page anymore

### 0.0.4

- jqui widget with interactive colored slider

### 0.0.3

- metro widget
- jqui widget

### 0.0.2

- change to node-lifx
- successful tested with 2 lamps and firmware 2.1

### 0.0.1

- initial setup with lifx

## License

The MIT License (MIT)

Copyright (c) 2016-2025 foxthefox <foxthefox@wysiwis.net>
Copyright (c) 2025 foxthefox <foxthefox@wysiwis.net>
