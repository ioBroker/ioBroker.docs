![Logo](admin/tahoma.png)

[![NPM](https://nodei.co/npm/iobroker.tahoma.png?downloads=true)](https://nodei.co/npm/iobroker.tahoma/)

[![NPM version](https://img.shields.io/npm/v/iobroker.tahoma.svg)](https://www.npmjs.com/package/iobroker.tahoma)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/Excodibur/iobroker.tahoma/blob/master/LICENSE)

![Number of Installations (latest)](http://iobroker.live/badges/tahoma-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/tahoma-stable.svg)

[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/Excodibur/ioBroker.tahoma.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Excodibur/ioBroker.tahoma/context:javascript)
![Github release status](https://github.com/Excodibur/iobroker.tahoma/workflows/Build%2C%20Test%20and%20Release/badge.svg)

[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/tahoma/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

# ioBroker.tahoma

An ioBroker adapter for Somfy Tahoma. This project has no affiliation with Somfy. Initially based on the script taken from https://forum.iobroker.net/post/336001 and forked from https://github.com/StrathCole/ioBroker.tahoma.

The adapter connects to the Tahomalink end user API and controls the devices set up through Tahoma Box (and most likely Connexoon).  
The adapter is not feature-complete, yet, but it should support most actions for controlling blinds and shutters etc.

Please also read the [FAQ](https://github.com/Excodibur/ioBroker.tahoma/blob/master/FAQ.md) in case of issues first.

## Currently tested devices

Generally, this adapter should support all devices that can be accessed via __tahomalink.com__, but for the adapter developer it is difficult to guarantee this. Mainly, because the documention of the used Somfy-API is (at least publically) non-existant and the developer can only test Somfy-devices which he owns himself, or is able to test with support of willing participants.

The following Somfy devices were verified to work with this adapter:

- S&SO RS100 io 
- Oximo io
- Sun sensor Sunis io
- Temperature sensor io
- Smoke Sensor io
- Adapter Plug io

## Configuration

The following configuration parameters are supported by the adapter.
| Parameter                                               | (Default) value | Description |
|---------------------------------------------------------|-----------------|-------------|
| Username                                                | _`<your Tahomalink user>`_ | Required to authenticate your Tahoma account. |
| Password                                                | _`<Your Tahomalink password>`_ | Required to authenticate your Tahoma account. |
| Polling interval                                        | `20000` | Time (in milliseconds) after which the adapter will try to get new data from Tahomalink. |
| Login Attempts <sup>1</sup> <sup>2</sup>                | `3` | Amount of attempts to login again after login failure. |
| Delay between login attempts <sup>1</sup> <sup>2</sup>  | `30` | Time (in seconds) to wait between login attempts. |
| Delay after failed login  <sup>1</sup> <sup>2</sup>     | `120` | Time (in seconds) to wait, after all consecutive login attempts have failed. |
| Delay before applyqueue retry <sup>1</sup> <sup>2</sup> | `1500` | Time (in milliseconds) to wait, before a second attempt is made to send changes from the internal apply queue to Tahoma, in case it got lost. |

 <sup>1</sup> These configuration values are only visible and configurable in Admin 5 (new GUI), or later.

 <sup>2</sup> All values are related to login to Tahomalink, which is mostly a blackbox from development point of view. If you configure the numbers too low here, experience has shown that there is a good chance Somfy will temporarily lock your account, so lower default values here with care!

## States

### tahoma.X.location

The state in this tree contain the personal information of the user like city, street address and longitude/latitude.

### tahoma.X.devices.*.deviceURL

This state contains the device URL that is used by Tahoma to identify the device.

### tahoma.X.devices.*.commands

These states contain button commands for controlling the devices. Most devices will support commands like `close` and `open` but also some more.  
Some of the commands have a `:slow` at the end if supported by the device. Using those enables low speed or so-called silent mode.

### tahoma.X.devices.*.states

These states contain current status of the devices as follows. Some of the states have a `:slow` at the end if supported by the device. Setting those enables low speed or so-called silent mode.


| Device state                                                | Editable | Purpose/Description |
|-------------------------------------------------------------|----------|---------------------|
| _tahoma.X.devices.*.states.core:DeploymentState_            | &#10003; | Provides information about and controls the state of current deployment. 100 means fully deployed, 0 is undeployed. Not all devices have this value, some have `ClosureState` instead. |
| _tahoma.X.devices.*.states.core:TargetDeploymentState_      | &#10003; | See `tahoma.X.devices.*.states.core:DeploymentState`. Use this to e.g. change blind position directly. |
| _tahoma.X.devices.*.states.coreClosureState_                | &#10003; | Provides information about and controls the state of current closure. 100 means fully closed, 0 is open. Not all devices have this value, some have `DeploymentState` instead. |
| _tahoma.X.devices.*.states.core:TargetClosureState_         | &#10003; | See `tahoma.X.devices.*.states.core:ClosureState` |
| _tahoma.X.devices.*.states.core:OrientationState_           | &#10003; | Provides information about and ocntrols the orientation (e. g. for shutters) of slats. Not all devices offer this value | 
| _tahoma.X.devices.*.states.core:TargetOrientationState_     | &#10003; | See `tahoma.X.devices.*.states.core:OrientationState` |  
| _tahoma.X.devices.*.states.core:NameState_                  |          | Contains the current name of the device. |
| _tahoma.X.devices.*.states.core:OpenClosedState_            |          | Contains `closed` if the device is 100% closed or 0% deployed and `open` otherwise. |
| _tahoma.X.devices.*.states.core:PriorityLockTimerState_     |          | If a sensor has locked the device this is stated here, e. g. a wind sensor blocking an awning. |
| _tahoma.X.devices.*.states.core:RSSILevelState_             |          | The current signal quality of the device. |
| _tahoma.X.devices.*.states.core:StatusState_                |          | `available` if the device is currently available. |
| _tahoma.X.devices.*.states.io:PriorityLockLevelState_       |          | See `tahoma.X.devices.*.states.core:PriorityLockTimerState` |
| _tahoma.X.devices.*.states.io:PriorityLockOriginatorState_  |          | See `tahoma.X.devices.*.states.core:PriorityLockTimerState` |
| _tahoma.X.devices.*.states.moving_                          |          | States if the device is currently moving. `0 = stopped`, `1 = up/undeploy`, `2 = down/deploy`, `3 = unknown direction` |


## Changelog
See [Changelog](https://github.com/Excodibur/ioBroker.tahoma/blob/master/CHANGELOG.md).

## License

The MIT License (MIT)

Copyright (c) 2020-2022 Marius Burkard & Excodibur

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