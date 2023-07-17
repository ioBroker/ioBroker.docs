# ioBroker.frontier_silicon

![Logo](admin/radio.png)

## ioBroker adapter for Frontier SmartRadio

[![NPM version](http://img.shields.io/npm/v/iobroker.frontier_silicon.svg)](https://www.npmjs.com/package/iobroker.frontier_silicon)
[![Downloads](https://img.shields.io/npm/dm/iobroker.frontier_silicon.svg)](https://www.npmjs.com/package/iobroker.frontier_silicon)
![Number of Installations (latest)](http://iobroker.live/badges/frontier_silicon-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/frontier_silicon-stable.svg)

**Tests:** ![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.frontier_silicon/workflows/Test%20and%20Release/badge.svg)

[![NPM](https://nodei.co/npm/iobroker.frontier_silicon.png?downloads=true)](https://nodei.co/npm/iobroker.frontier_silicon/)

## Info

Provides support for media players, internet radios and SmartRadios equipped with a Frontier Silicon chipset using FSAPI.

NOTE: This adapter has been transferred to iobroker-community-adapters for maintenance. Thus planned features (see below) will not be implemented. Only important bug fixes and dependency updates will be released in the future. However PRs with bug fixes or feature enhancements are always welcome.

## Features

### Implemented features

- Power control
- Mode selection
- Preset selection
- Notifications for several states
- Volume control
- Notifications

### Planned features

- Auto discovery
- More states
- Translations
- More Exception handling
- Cleaner code
- Multi room features

### Not planned features

- Changing system information

### Known Bugs

- Media player must be on for preset discovery
- No notifies after some time

## Documentation

This adapter lets you control internet radios and media players based on Frontier Silicon chipsets. Many devices which can be controlled via [Undok](https://www.frontiersmart.com/undok) should work. Tested devices come from [Revo](https://revo.co.uk/de/products/), [Sangean](https://www.sangean.eu/products/all_product.asp) and [SilverCrest](https://www.silvercrest-multiroom.de/produkte/produktuebersicht/), others should work, too.

After installation the device's IP and PIN must be entered in the configuration dialog. If the radio does not play DAB after switching on via Undok or this adapter try with "DAB starts without sound" enabled.

When the adapter starts for the first time it collects information about the device. For that it needs to switch through all modes. During checking settings the device will be muted for a few seconds to avoid disturbing sounds.

While the adapter reads the device's setting objects and states are created. States can be read-only (`ro`) or read-write (`rw`) *ok, write-only for buttons is also possible*.

- audio

  Basic audio settings. No equalizer controls implemented yet.

  - maxVolume (`number, ro`)

    The maximum volume selectable

  - mute (`boolean, rw`)

    `true` if the device is muted, `false`otherwise

  - volume (`number, rw`)
  - control
    - volumeDown and volumeUp

    In-/ or decreases volume by 1

- device

  - friendlyName (`text, rw`)
  - power (`boolean, rw`)
  - radioId (`test, ro`)

    My guess is that this is the MAC of the device

  - version (`text, ro`)

    Software version

  - webfsapi (`text, ro`)

    The address of the API

- info

  - connection (`boolean, ro`)

    Connection indicator for the adapter

- media

  - state (`number, rw`)

    valid values are:
    - 0: Pause
    - 1: Play

  - control

    - next
    - plause
    - play
    - previous

  Do not take the following names too seriously. The radio uses them differently in different modes.

  - album (`text, ro`)
  - artist (`text, ro`)
  - graphic (`text, ro`)

    Use this URL to get an album cover or a station's logo.

  - name (`text, ro`)
  - text (`text, ro`)
  - title (`text, ro`)

- modes

  - readPresets

    Re-reads all presets

  - selectPreset (`number, rw`)

    Used to get or select a preset. Be warned that the adapter guesses as this value cannot be read from the API.

  - selected (`number, rw`)

    Indicates or selects the selected mode. Can also be selected via `modes.{number}.switchTo`

  - `{number}`

    - id (`text, ro`)

      The name of that mode

    - key (`number, ro`)

      The index of that mode. Equals `mode.{number}` from object tree and can be written into `modes.selected`.

    - selectable (`boolean, ro`)

      `true` if this mode can be manually selected.

    - streamable (`boolean, ro`)

      Only present on multi-room enabled devices. `true` if this mode can be used as source for several multi-room devices.
  
    - switchTo

      Selects that mode.

    - presets

      - availabe (`boolean, ro`)

        Indicates whether presets for this mode are available

      - `{number}`

        The index of that preset. Equals `mode.*.presets.{number}.key`.

        - key

          The index of that preset. Equals `mode.*.presets.{number}` from object tree and can be written into `modes.selectPreset`.

        - name (`text, ro`)

          The name of that preset

        - switchTo

          Selects that preset and the corresponding mode.

Please be aware that you can sometimes choose between "pushing a button" or "setting a value". Use what is more convenient for you.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.1.0 (2023-07-15)

- (pdbjjens) Breaking Changes: node>=14, js-contoller>=4 and admin>=5 required
- (pdbjjens) New: json config UI
- (pdbjjens) New: Re-establish session if network connection is lost
- (pdbjjens) New: Remove obsolete unit testing
- (pdbjjens) Fix: Prevent crashes if radio device is not reachable

### 0.0.11 (2023-03-30) 2023 maintenance release

- (pdbjjens) New: Transfer of adapter to community
- (pdbjjens) New: Updated dependencies
- (pdbjjens) New: Use adapter-dev instead of gulp translate
- (pdbjjens) Fix: Prevent js-controller >=3.2.x warnings regarding non-existent objects and typeErrors

### 0.0.10 (2020-11-29)

- Translations

### 0.0.9

- (halloamt) Selected preset can be read now. The adapter guesses a little but this seems to work.

- (halloamt) Nicer readme
- (halloamt) (Hopefully) more robust session handling.
- (halloamt) Long polling should work more reliably
- (halloamt) Sleep timers are cleared on `onUnload`

### 0.0.7 und 0.0.8

- (halloamt) Formal but neccessary stuff for ioBroker

## Legal Notices

Frontier, Frontier Silicon, SmartRadio and associated logos are trademarks or registered trademarks of Frontier Smart Technologies Limited  [https://www.frontiersmart.com](https://www.frontiersmart.com)

All other trademarks are the property of their respective owners.

The authors are in no way endorsed by or affiliated with Frontier Smart Technologies Limited , or any associated subsidiaries, logos or trademarks.

## License

MIT License

Copyright (c) 2023 halloamt <iobroker@halloserv.de>

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
