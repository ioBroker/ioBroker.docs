![Logo](admin/cleveron.png)

# ioBroker.cleveron

[![NPM version](https://img.shields.io/npm/v/iobroker.cleveron.svg)](https://www.npmjs.com/package/iobroker.cleveron)
[![Downloads](https://img.shields.io/npm/dm/iobroker.cleveron.svg)](https://www.npmjs.com/package/iobroker.cleveron)
![Number of Installations](https://iobroker.live/badges/cleveron-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/cleveron-stable.svg)
[![Dependency Status](https://img.shields.io/david/iobroker-community-adapters/iobroker.cleveron.svg)](https://david-dm.org/iobroker-community-adapters/iobroker.cleveron)

[![NPM](https://nodei.co/npm/iobroker.cleveron.png?downloads=true)](https://nodei.co/npm/iobroker.cleveron/)

**Tests:** ![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.cleveron/workflows/Test%20and%20Release/badge.svg)

## cleveron adapter for ioBroker

This adapter retrieves data from CLEVERON - API (<https://www.cleveron.ch>)

## Usage

-   You just need your cleveron-login-data.
-   The adapter gets all building, room an device - data that is provided by the cleveron API.

-   Add the desired polling - interval in minutes.

-   Restart adapter if you added new devices, room or homes, or if you changed any settings.

## Changelog

### v0.0.6

-   dependencies updated

### v0.0.5

-   introduced axios

### v0.0.4

-   changed ecrypting to 'encryptedNative'

### 0.0.3

-   added folders, devices, channels & fixed bugs

### 0.0.2

-   'request' replaced by 'got', secret encryption added, reviewed accordingly 'development and coding best practices'

### 0.0.1 First try

-   (forelleblau) initial release

## License

MIT License

Copyright (c) 2022 forelleblau <mailto:marceladam@gmx.ch>

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
