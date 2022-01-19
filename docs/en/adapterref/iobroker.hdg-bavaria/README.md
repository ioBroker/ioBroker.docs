![Logo](admin/hdg-bavaria.png)
# ioBroker.hdg-bavaria

[![NPM version](https://img.shields.io/npm/v/iobroker.hdg-bavaria.svg)](https://www.npmjs.com/package/iobroker.hdg-bavaria)
[![Downloads](https://img.shields.io/npm/dm/iobroker.hdg-bavaria.svg)](https://www.npmjs.com/package/iobroker.hdg-bavaria)
![Number of Installations (latest)](https://iobroker.live/badges/hdg-bavaria-installed.svg)
![Number of Installations (stable)](https://iobroker.live/badges/hdg-bavaria-stable.svg)
[![Dependency Status](https://img.shields.io/david/stemaker/iobroker.hdg-bavaria.svg)](https://david-dm.org/stemaker/iobroker.hdg-bavaria)

[![NPM](https://nodei.co/npm/iobroker.hdg-bavaria.png?downloads=true)](https://nodei.co/npm/iobroker.hdg-bavaria/)

**Tests:** ![Test and Release](https://github.com/stemaker/ioBroker.hdg-bavaria/workflows/Test%20and%20Release/badge.svg)

## hdg-bavaria adapter for ioBroker

Access data from HDG Control of HDG Bavaria boilers. Currently only a single configuration is supported (K10-33, 850l tank with 3 
temperature sensors, single heating circuit). Others could be added on request.

## Changelog
<ul>
  <li>v0.3.1
    <ul>
      <li>Added integration test.</li>
    </ul>
  </li>
  <li>v0.3.0
    <ul>
      <li>Added tracking energy of the tank. Temperature sensor data is used to evaluate the current thermal energy of the tank.
      Tank content is currently equally distributed to temperature sensors which might not be accurate depending on sensor positions.</li>
    </ul>
  </li>
  <li>v0.2.1
    <ul>
      <li>First released version</li>
    </ul>
  </li>
</ul>

## License
MIT License

Copyright (c) 2021 stemaker <app.stemaker@gmail.com>

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
