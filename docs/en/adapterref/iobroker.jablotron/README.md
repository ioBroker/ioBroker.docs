![Logo](admin/jablotron.png)
# ioBroker.jablotron

[![NPM version](https://img.shields.io/npm/v/iobroker.jablotron.svg)](https://www.npmjs.com/package/iobroker.jablotron)
[![Downloads](https://img.shields.io/npm/dm/iobroker.jablotron.svg)](https://www.npmjs.com/package/iobroker.jablotron)
![Number of Installations](https://iobroker.live/badges/jablotron-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/jablotron-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.jablotron.png?downloads=true)](https://nodei.co/npm/iobroker.jablotron/)

**Tests:** ![Test and Release](https://github.com/DEV2DEV-DE/ioBroker.jablotron/workflows/Test%20and%20Release/badge.svg)

## Jablotron adapter for ioBroker

Connects to the Jablotron cloud to access your security system.

Currently the adapter is **read-only**!

It's only possible to read the states. Switching will be implemented later!

The adapter only connects to the cloud of the manufacturer. It's currently not possible to connect to the central unit over the local network only, because the manufacturer holds the local API closed.

### Forum

Discuss your test experience here: https://forum.iobroker.net/topic/70798

## Known issues
* As far as known by now, sensors, switches and other devices have to be configured as a 'programmable gate' to be readable.
* There are devices to be listed as 'thermoDevice', but the list has been empty by now and therefore could not have been tested yet.

Report any bug, issue or request as a GitHub-Issue: https://github.com/DEV2DEV-DE/ioBroker.jablotron/issues

## Manufacturer

https://www.jablotron.com/de/katalog-produktu/alarme/jablotron-100/

## Important notice
### Version 0.0.5
The storage of sensitive data in the instance config has been changed.
You need to re-enter your password in the instance settings if you already used an older version < 0.0.5

## Changelog
### 0.1.1 (2023-12-13)
* Improved readability
* Select data segments read from server
* Changed User-Agent in requests

### 0.1.0 (2023-12-10)
* Fixed issue with restarts due to timeouts

### 0.0.7 (2023-12-08)
* Fixed wrong structure in readme

### 0.0.5 (2023-12-06)
* Fixed typo
* Encrypt sensitive data in instance config
* Add min and max for poll interval
* Removed unused code
* Do not create static states in code

### 0.0.4 (2023-12-03)
* Fixed wrong state type for data type 'object'

### 0.0.3 (2023-12-03)
* Implemented improvements mentioned in review

### 0.0.2 (2023-11-30)
* Provide an appropriate role for any state
* Readme extended
* Output 'thermoDevices' in debug log

## References
* https://github.com/ioBroker/AdapterRequests/issues/755
* https://github.com/hajekmi/myjablotron
* https://github.com/fdegier/homebridge-jablotron-alarm
* https://github.com/plaksnor/HASS-JablotronSystem
* https://github.com/kukulich/home-assistant-jablotron100

## License
MIT License

Copyright (c) 2023 DEV2DEV-DE

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
