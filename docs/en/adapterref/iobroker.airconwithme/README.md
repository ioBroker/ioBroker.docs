![Logo](admin/airconwithme.png)
# ioBroker.airconwithme

[![NPM version](http://img.shields.io/npm/v/iobroker.airconwithme.svg)](https://www.npmjs.com/package/iobroker.airconwithme)
[![Downloads](https://img.shields.io/npm/dm/iobroker.airconwithme.svg)](https://www.npmjs.com/package/iobroker.airconwithme)
![Number of Installations (latest)](http://iobroker.live/badges/airconwithme-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/airconwithme-stable.svg)
[![Dependency Status](https://img.shields.io/david/weggetor/iobroker.airconwithme.svg)](https://david-dm.org/weggetor/iobroker.airconwithme)
[![Known Vulnerabilities](https://snyk.io/test/github/weggetor/ioBroker.airconwithme/badge.svg)](https://snyk.io/test/github/weggetor/ioBroker.airconwithme)

[![NPM](https://nodei.co/npm/iobroker.airconwithme.png?downloads=true)](https://nodei.co/npm/iobroker.airconwithme/)

**Tests:** ![Test and Release](https://github.com/weggetor/ioBroker.airconwithme/workflows/Test%20and%20Release/badge.svg)

## airconwithme adapter for ioBroker

Adapter for Mitsubishi aircondition with airconwithme wlan adapter

## Information 
Installation is done with the Github Cat Symbol / custom. Enter the url of this page (without README.md) and select 'install'. 

In the adapter settings the IP of your airconditions WLAN adapter should be entered. Username + Password for the Intesis adapter are by default "admin" + "admin".

Most datapoints are readonly, you can set the following:

| Datapoint | Values |
|----------|----------|
| on | 0: Off; 1: On |
| userMode | 0: Auto; 1: Heat; 2: Dry; 3: Fan; 4: Cool |
| fanSpeed | 1: Speed 1; 2: Speed 2; 3: Speed 3; 4: Speed 4 |
| position | 1: Position 1; 2: Position 2; 3: Position 3; 4: Position 4; 10: Swing |
| userSetpoint | temperature (°C) |
| remoteDisable | 0: Enable; 1: Disable |

## Changelog
### 0.0.3
* (weggetor) Renamed some variables to avoid possible interference with other adapters, removed not used adminTab

### 0.0.2
* (weggetor) Modifications to automatic build incl. upload to npm

### 0.0.1
* (weggetor) initial release

## License
MIT License

Copyright (c) 2021 weggetor <info@bitboxx.net>

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