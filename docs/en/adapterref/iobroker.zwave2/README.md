![Logo](admin/zwave2.svg)

# ioBroker.zwave2

[![node](https://img.shields.io/node/v/iobroker.zwave2.svg)
![npm](https://img.shields.io/npm/v/iobroker.zwave2.svg)](https://www.npmjs.com/package/iobroker.zwave2)
[![changelog](https://img.shields.io/badge/read-Changelog-informational)](CHANGELOG.md)

![Number of Installations](http://iobroker.live/badges/zwave2-installed.svg)
![Number of Installations](http://iobroker.live/badges/zwave2-stable.svg)

![Test and Release](https://github.com/AlCalzone/iobroker.zwave2/workflows/Test%20and%20Release/badge.svg)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/AlCalzone/ioBroker.zwave2.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/AlCalzone/ioBroker.zwave2/context:javascript)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/zwave2/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

<h2 align="center">Z-Wave for ioBroker. But better.</h3>

Z-Wave 2 is a brand new Z-Wave implementation for ioBroker. It is based on [`zwave-js`](https://github.com/AlCalzone/node-zwave-js), which was written from the ground up for your benefit.

Unless [`ioBroker.zwave`](https://github.com/ioBroker/ioBroker.zwave/) it does not require `OpenZWave`. This means that the installation and updates are fast, and no compilation of static libraries and other complicated steps are necessary.

Furthermore, some devices just don't work in the original adapter, e.g. the Fibaro Roller Shutter 3.

Easy usage in ioBroker was kept in mind during the whole development. For example, some devices reuse configuration parameters to configure many different things. In this adapter, most of them are split into separate states and no complicated math is necessary:
| Config params in ioBroker.zwave2 | vs | Config params in ioBroker.zwave |
| --- | --- | --- |
| ![](docs/de/images/config-params.png) | vs | ![](docs/de/images/config-params-legacy.png) |

---

## Documentation and usage
* [FAQ](docs/en/FAQ.md)
* [Troubleshooting](docs/en/troubleshooting.md) · [bei Problemen](docs/de/bei-problemen.md)

---

## Changelog
[Older changes](CHANGELOG_OLD.md)
<!--
	Placeholder for next versions:
	### __WORK IN PROGRESS__
-->
### 2.2.2 (2021-10-17)
* Fix: Config from different instances no longer override each other

### 2.2.1 (2021-10-12)
* Fixed a crash when removing a node that is included in a multicast group
* Fix: writeonly `boolean` states are now set up as switches instead of buttons
* Corrupted `Multilevel Sensor` and `Meter` reports are now filtered out
* Fixes to auto-assigning lifeline associations
* Small fixes to inclusion with security
* New and updated configuration files, see [here](https://github.com/zwave-js/node-zwave-js/releases/tag/v8.5.0)

### 2.2.0 (2021-09-27)
* The devices list now includes an activity indicator and statistics for each device
* Improvements to `Scene Actuator Configuration CC` and `Scene Controller Configuration CC`
* Some fixes for `Security S2` in combination with `Supervision CC`
* Workaround for a bug in Z-Wave sticks with firmware 7.15 and higher that led to missing capabilities
* Fix: The tab starts on "Devices" again instead of "Groups"
* Fix: don't offer values from secure nodes under broadcast
* Fix: display generic device class when specific device class is `"Unused"`
* Fix: roles of existing states are now preserved
* Many changed and new device configuration files, see [here](https://github.com/zwave-js/node-zwave-js/releases/tag/v8.4.0) and [here](https://github.com/zwave-js/node-zwave-js/releases/tag/v8.4.1)

### 2.1.0 (2021-09-23)
* Support broadcast commands
* Support multicast commands and managing multicast groups

### 2.0.1 (2021-09-22)
* Fix: Don't display "no devices present" if they haven't been loaded yet
* Fix: Eliminated loading time when switching between "Devices" and "Associations" in tab
* Fix: Add missing german translation for "Set RF Region"
* Fix: The Controller node was missing from the association target nodes

## License

MIT License

Copyright (c) 2019-2021 AlCalzone

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