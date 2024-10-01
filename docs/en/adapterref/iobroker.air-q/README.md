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

You should be able to find the adapter through the admin interface.

Otherwise you're welcome to use the ioBroker command line interface through the console. Simply direct to your ioBroker root folder and add the adapter via
```
iobroker add air-q
```
This installs the adapter (if it isn't installed already) and starts an instance. 
In case you only want to install the adapter without creating an instance yet, use the following command:

```
iobroker install air-q
```

For more information visit the ioBroker CLI documentation under https://github.com/ioBroker/ioBroker/wiki/Console-commands. 

To configure your instance you simply select whether you want to connect it through the IP or the short-ID of your device.

![Screenshot 2024-02-13 103001](https://github.com/CorantGmbH/ioBroker.air-q/assets/107550719/ec878783-af56-490d-af66-43c53c27df20)

Please make sure you enter the correct IP/ID and password. 
Then you can also choose how the data should be retrieved. You can clip negative values if you don't need them, with the exception of temperature, of course. You can set up how often the data should be polled by typing in the number in seconds. And lastly you can choose between realtime data or average data. 

![Screenshot 2024-02-13 104813](https://github.com/CorantGmbH/ioBroker.air-q/assets/107550719/429c57ab-933f-4930-a02b-30da7b5df180)

Now you should be all set up and good to go!

The data will be retrieved and shown in the objects-tab according to your configuration, when the device is found. Of course, depending on the device you own, there might be more sensors shown. 

![Screenshot 2024-02-13 110655](https://github.com/CorantGmbH/ioBroker.air-q/assets/107550719/5639fdcb-3acf-4223-b1fa-fb69016c9d7b)

***For now we have all sensors for the air-Q Pro included. Optional sensors will be included in a future patch.***

## Changelog <a id="change" />

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
