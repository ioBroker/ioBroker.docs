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
### 2.4.2 (2021-12-23)
* Fix: Additional node-related commands now respect and update the node status
* Fixed an issue where the communication could get stuck after aborting a command
* New and updated configuration files, see [here](https://github.com/zwave-js/node-zwave-js/releases/tag/v8.9.0) and [here](https://github.com/zwave-js/node-zwave-js/releases/tag/v8.9.1)

### 2.4.2-beta.1 (2021-12-17)
* Fixed the check for incomplete or incorrect value IDs

### 2.4.2-beta.0 (2021-12-16)
* Experimental: The handling of messages has been rewritten from scratch and simplified. This may cause some unintended behavior.
* Avoid interruption of the communication with a node by other nodes requesting responses from the controller
* Improved reliability of encrypted communication
* Battery-powered devices are nore sent to sleep more reliably
* Fixed encoding of some configuration parameters
* Fix: Limit allowed Node.js versions to `12.22.2+`, `14.13.0+`, `16+` and forbid installation on development Node.js versions
* Fixed some crashes
* Fixed an issue where healing the network would fail due to a too low timeout
* Improved detection of sticks that do not support soft reset
* New and updated configuration files, see [here](https://github.com/zwave-js/node-zwave-js/releases/tag/v8.8.0) and [here](https://github.com/zwave-js/node-zwave-js/releases/tag/v8.9.0-beta.3)

### 2.4.1 (2021-11-03)
* Fix: Correctly update UI when canceling an inclusion process
* Fix: Check for SmartStart support before using it
* Fix: Add missing translations
* Fixed the automatic lifeline association for some devices
* New and updated configuration files, see [here](https://github.com/zwave-js/node-zwave-js/releases/tag/v8.7.3)

### 2.4.0 (2021-11-02)
* Add support for SmartStart and inclusion of nodes with QR codes

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
