# ioBroker.air-q 
<img src="admin/air-q.png" alt="airq-logo" width="200"/>

[![NPM version](https://img.shields.io/npm/v/iobroker.air-q.svg)](https://www.npmjs.com/package/iobroker.air-q)
[![Downloads](https://img.shields.io/npm/dm/iobroker.air-q.svg)](https://www.npmjs.com/package/iobroker.air-q)
![Number of Installations](https://iobroker.live/badges/air-q-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/air-q-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.air-q.png?downloads=true)](https://nodei.co/npm/iobroker.air-q/)

**Tests:** ![Test and Release](https://github.com/CorantGmbH/ioBroker.air-q/workflows/Test%20and%20Release/badge.svg)

## Contents
- [About](#about)
- [Getting started](#start)
- [Changelog](#change)
- [License](#license)


## About <a id="about"/>

This ioBroker Adapter is used in connection with our [air-Q device](https://www.air-q.com). It polls the values from our sensors and displays them for you in the ioBroker environment. 
</br>
</br>

![air-Q_frontal + Seitlich_full](https://github.com/CorantGmbH/ioBroker.air-q/assets/107550719/5c38d737-9641-463f-bd07-ac62ce5f1973)

## Getting started <a id="start" />

### Install the adapter and add an instance

In your admin interface, navigate to `Adapters` in the side bar and search for `air-q` in `Filter by name`. Select `+` (`Add instance`) in the `⋮` (`Info`) menu of the adapter.

This will automatically open the instance settings.

Otherwise you're welcome to use the ioBroker command line interface through the console. Simply direct to your ioBroker root folder and add the adapter via
```
iobroker add air-q
```
This installs the adapter (if it isn't installed already) and adds an instance. You still have to configure this instance, as described below.

In case you only want to install the adapter without creating an instance yet, use the following command:

```
iobroker install air-q
```

For more information visit the ioBroker CLI documentation under https://github.com/ioBroker/ioBroker/wiki/Console-commands. 

## Configuration

### Required

To configure your instance you simply select whether you want to connect it through the IP or the short-ID of your device.

<img width="1263" height="953" alt="2025-12-10T17:57:57,025532652+01:00" src="https://github.com/user-attachments/assets/93ff4c76-bdf5-4336-bb5a-1a0aa844ec0d" />

Please make sure you enter the correct IP/ID and password.

### Optional

- **Respect device night mode**. Default: `on`. When your air-Q device has night mode enabled with WiFi disabled during the night hours, the adapter can automatically skip polling attempts during those hours. This eliminates unnecessary connection errors in your logs. ⚠️ If you change your device's night mode settings (start/end times, enable/disable), you have two options:
    1. (Recommended): Restart the adapter to immediately load the new configuration
    2. (Automatic): Wait up to 1 hour for the adapter to automatically refresh the configuration (only works outside of night mode hours)

- **Clip negative values**. Default: `off`. For baseline calibration purposes, certain sensor values may briefly become negative. You can safely clip such values to 0.

- **Poll data every x seconds**. Default: `10`. You can configure how often the data should be polled by entering the number in seconds.

- **Retrieve data type**. Default: `Average data`. In its default configuration, air-Q averages the stream of sensor values. This adapter allows to switch between polling the averaged and the raw data from the device. To poll noisy sensor readings from the device, select `Realtime data` from the drop-down menu.

Now you should be all set up and good to go!

## Sensors are objects

The data will be retrieved and shown in the objects-tab according to your configuration, when the device is found. Of course, depending on the device you own, there might be more sensors shown. 

![Screenshot 2024-02-13 110655](https://github.com/CorantGmbH/ioBroker.air-q/assets/107550719/5639fdcb-3acf-4223-b1fa-fb69016c9d7b)

***For now we have all sensors for the air-Q Pro included. Optional sensors will be included in a future patch.***

## Changelog <a id="change" />

### 1.0.6
* The adapter can automatically respect your air-Q device's night mode configuration

### 1.0.5
* Fixed sensors dropping custom configuration after a restart
* Updated dependencies: version bump for `adapter-core`

### 1.0.4

* Updated dependencies: bumped multiple packages (`chai-as-promised`, `sinon`, `mocha`) to address vulnerabilities
* Codebase maintenance: updated `io-package.json` and added tests against Node.js 22

### 1.0.3

* Added a checkbox for showing and hiding the password in the instance configuration
* Edited the error messages to be more helpful
* Added logging information when the air-Q device is actually connected

### 1.0.2

* Added units for each sensor value
* Updates within config files

### 1.0.1

* Added sensor list update when connecting to a different air-Q in the same instance
* Fixed name display and update of device

### 1.0.0

* Include typescript files by @pr0crstntr in #6
* Created air-Q class by @pr0crstntr in #4
* Fix restart bug by @pr0crstntr in #7
* Update data poll by @pr0crstntr in #8
* Updated io-package by @pr0crstntr in #9
* Fixed save option for configuration by @pr0crstntr in #16
* Added clear intervals on unload by @pr0crstntr in #26
* Update README by @pr0crstntr in #37
* Changed role for temperature and added unit by @pr0crstntr in #38

### 0.0.1

* (Katharina K.) initial release


## License <a id="license"/>

MIT License

Copyright (c) 2024 Corant GmbH

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
