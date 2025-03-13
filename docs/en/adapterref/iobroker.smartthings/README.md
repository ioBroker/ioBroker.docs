![Logo](admin/smartthings.png)

# ioBroker.smartthings

[![NPM version](https://img.shields.io/npm/v/iobroker.smartthings.svg)](https://www.npmjs.com/package/iobroker.smartthings)
[![Downloads](https://img.shields.io/npm/dm/iobroker.smartthings.svg)](https://www.npmjs.com/package/iobroker.smartthings)
![Number of Installations](https://iobroker.live/badges/smartthings-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/smartthings-stable.svg)
[![Dependency Status](https://img.shields.io/david/TA2k/iobroker.smartthings.svg)](https://david-dm.org/TA2k/iobroker.smartthings)

[![NPM](https://nodei.co/npm/iobroker.smartthings.png?downloads=true)](https://nodei.co/npm/iobroker.smartthings/)

**Tests:** ![Test and Release](https://github.com/TA2k/ioBroker.smartthings/workflows/Test%20and%20Release/badge.svg)

## smartthings adapter for ioBroker

Adapter for Samsung Smartthings

## Login process:

Open the link in the adapter settings and login until you see a white Screen.
Open the Developer Console F12 or Option + Command + I and copy the blue samsungconnect:// url and paste it in the settings.

## Controling

smartthings.0.id.capabilities either set to true or set a predefined value

## Discussion and Questions:

https://forum.iobroker.net/topic/48091/test-adapter-samsung-smartthings-v-0-0-x

## Changelog
### 0.2.2 (2025-02-11)

- add new login process

### 0.1.2 (2024-05-19)

- Update Dependencies

- 0.1.0 Added object excluding to reduce cpu usage

- 0.0.4 Reduced cpu load while writing states

- 0.0.3 (TA2k) initial release

## License

MIT License

Copyright (c) 2021-2030 TA2k <tombox2020@gmail.com>

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
