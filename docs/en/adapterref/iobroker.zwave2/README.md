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
### __WORK IN PROGRESS__
Updated `zwave-js` to `10.15.0`. This includes the following changes:
* Added support for `Security S2` multicast
* Added support for parsing additional information from `Notification CC Reports`. Note that this may change the values reported for Door/Window sensors! If you rely on the old behavior, use the new `Door state (simple)` value instead.
* On devices where legacy alarm values are mapped, the resulting `Notification` values are now created during the interview.
* Fixed an issue where communication with a node included with `Security S2` was not always using encryption.
* All commands contained in a `Multi Command CC` are now properly handled
* Failures while assigning routes to nodes no longer mark the node as dead (unless they actually are)
* Values for unsupported `Door Lock CC` features are no longer created
* Several reliability/correctness improvements for device interviews
* Auto-assign routes between nodes after creating a new association
* Values for `Battery`, `Meter`, `Multilevel Switch` and (in some cases) `Notification CC` are now queried periodically or on device wakeup
* Notification variables (like Lock jammed) are now updated when another received report indicates a change, even if the device did not update the notification variable itself.
* Lots of new and updated configuration files, see [Z-Wave JS releases](https://github.com/zwave-js/node-zwave-js/releases) for details

### 3.0.5 (2023-01-28)
Updated `zwave-js` to `10.5.4`. This includes the following changes:
* Fixed a memory leak caused by a dependency
* Fixed an issue where multiple re-interview tasks for sleeping nodes could be queued and would be executed in parallel
* Fixed an issue where firmware updates could use a too large fragment size after upgrading to v10, causing the update to fail
* Several improvements related to `Security S2`
* New and updated configuration files, see [Z-Wave JS releases](https://github.com/zwave-js/node-zwave-js/releases) for details

### 3.0.4 (2022-09-21)
Updated `zwave-js` to `10.2.0`. This includes the following changes:
* Fixed an issue where the possible states for `Notification` values could be incomplete
* Fixed an issue where setting the time on some devices would always use UTC, even this should be done with local time
* New and updated configuration files, see [Z-Wave JS releases](https://github.com/zwave-js/node-zwave-js/releases) for details

### 3.0.3 (2022-09-06)
Fixed some more communication issues. If a device isn't working properly after upgrading to 3.x, try to re-interview it.

### 3.0.2 (2022-08-30)
* Fixed some crashes and communication issues

### 3.0.1 (2022-08-27)
* Fixed crashes related to missing or incorrectly loaded dependencies

## License

MIT License

Copyright (c) 2019-2023 AlCalzone

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
