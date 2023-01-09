![Logo](admin/volvo.png)

# ioBroker.volvo

[![NPM version](http://img.shields.io/npm/v/iobroker.volvo.svg)](https://www.npmjs.com/package/iobroker.volvo)
[![Downloads](https://img.shields.io/npm/dm/iobroker.volvo.svg)](https://www.npmjs.com/package/iobroker.volvo)
![Number of Installations (latest)](http://iobroker.live/badges/volvo-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/volvo-stable.svg)

[![Known Vulnerabilities](https://snyk.io/test/github/TA2k/ioBroker.volvo/badge.svg)](https://snyk.io/test/github/TA2k/ioBroker.volvo)

[![NPM](https://nodei.co/npm/iobroker.volvo.png?downloads=true)](https://nodei.co/npm/iobroker.volvo/)

**Tests:** ![Test and Release](https://github.com/TA2k/ioBroker.volvo/workflows/Test%20and%20Release/badge.svg)
## volvo adapter for ioBroker

Volvo On Call and new Electric API for Android Automotive Cars Adapter

## Login 

Non Eletric car can login via username and password.


### Eletric Android Automotive Cars need a VCC API Key

Register/Login into 
<https://developer.volvocars.com/account/>

You need a Google or Github Account this is not related to you APP Credentials

Create an Application

Copy VCC API Key Primary

![VCC ApiKey](./vccapikey.png)

Paste the API Key in the Instance settings

Enter Volvoe App Username and password.

Remote controls are not working with the new API. The requests are accepted but not forwarded to the car.


## Getting started

Use objects under remote to control the vehicle



## Changelog

### 0.1.0

* (TA2k) add new api for electric cars
### 0.0.6

* (TA2k) fix trip object naming
  
### 0.0.5

* (TA2k) fix receiving data

### 0.0.4

* (TA2k) fix jscontroller
  
### 0.0.3

* (TA2k) fix preclimate

### 0.0.2

* (TA2k) initial release

## License

MIT License

Copyright (c) 2020 TA2k <tombox2020@gmail.com>

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
