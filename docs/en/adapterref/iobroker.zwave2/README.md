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
### 2.5.0 (2022-04-03)
Updated `zwave-js` to `9.0.1`. This includes many changes, including the following:
* Worked around an issue where certain 500-series controllers take too long to respond when attempting communication with unreachable nodes
* Node queries now timeout faster if no response is received. This should avoid battery-powered nodes to go back to sleep mid-interview.
* Add support for `Irrigation CC`
* The legacy network cache file `<homeid>.json` was converted to an appendonly `.jsonl` file in order to prevent data loss
* Almost all CC API methods now validate their arguments, making it safer to execute custom commands from user code
* User codes and network keys are no longer included in logfiles
* Support for legacy devices which only support the obsolete `Multi Channel CC V1`
* New and updated configuration files, see [Z-Wave JS releases](https://github.com/zwave-js/node-zwave-js/releases) for details

### 2.4.5 (2022-02-20)
* Update `zwave-js` to `8.11.6`
* After healing, battery-powered nodes are sent back to sleep again
* Added a workaround for thermostats that don't advertise all their supported thermostat modes. When such a thermostat enters such an "unsupported" mode, the mode is now dynamically added to the list of supported modes.
* New and updated configuration files, see [Z-Wave JS releases](https://github.com/zwave-js/node-zwave-js/releases) for details

### 2.4.3 (2022-01-18)
* Updated translations
* Updated `zwave-js` from `8.9.1` to `8.11.2`. Check out the [releases](https://github.com/zwave-js/node-zwave-js/releases) for a detailed overview over the new and changed configuration files.
* Add support for `Humidity Control Mode CC`
* Add support for `Humidity Control Operating State CC`
* Add support for `Humidity Control Setpoint CC`
* Work around an issue where some devices could not be interviewed due to an incorrect `Version CC` response.
* Fixed an issue where `Supervision Get` requests were not answered for sleeping nodes
* Re-interviewing sleeping nodes now only resets the known information when the node wakes up
* The `colors` dependency was recently [corrupted on purpose](https://www.theverge.com/2022/1/9/22874949/developer-corrupts-open-source-libraries-projects-affected). This patch updates all dependencies that depended on an affected version, directly or indirectly.

### 2.4.2 (2021-12-23)
* Fix: Additional node-related commands now respect and update the node status
* Fixed an issue where the communication could get stuck after aborting a command
* New and updated configuration files, see [here](https://github.com/zwave-js/node-zwave-js/releases/tag/v8.9.0) and [here](https://github.com/zwave-js/node-zwave-js/releases/tag/v8.9.1)

### 2.4.2-beta.1 (2021-12-17)
* Fixed the check for incomplete or incorrect value IDs

## License

MIT License

Copyright (c) 2019-2022 AlCalzone

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
