![Logo](admin/minuvis.png)
# ioBroker.minuvis

[![NPM version](http://img.shields.io/npm/v/iobroker.minuvis.svg)](https://www.npmjs.com/package/iobroker.minuvis)
[![Downloads](https://img.shields.io/npm/dm/iobroker.minuvis.svg)](https://www.npmjs.com/package/iobroker.minuvis)
![Number of Installations (latest)](http://iobroker.live/badges/minuvis-installed.svg)
[![Dependency Status](https://img.shields.io/david/minukodu/iobroker.minuvis.svg)](https://david-dm.org/minukodu/iobroker.minuvis)
[![Known Vulnerabilities](https://snyk.io/test/github/minukodu/ioBroker.minuvis/badge.svg)](https://snyk.io/test/github/minukodu/ioBroker.minuvis)
[![Build Status](https://travis-ci.org/minukodu/ioBroker.minuvis.svg?branch=master)](https://travis-ci.org/minukodu/ioBroker.minuvis)

[![NPM](https://nodei.co/npm/iobroker.minuvis.png?downloads=true)](https://nodei.co/npm/iobroker.minuvis/)

## minuvis adapter for ioBroker

Visualization for all devices

########################################################################

Version 2 is out now 

########################################################################

# IMPORTANT !!!!

if you are upgrading from version < 1.3.0 please note:

* upgrade to version v1.4 first and resave config-files in new place

########################################################################

* **BREAKING CHANGES** in version 2 see: https://minukodu.de/en/news/minuvis-20-iobroker-available
* instructions for update v1 -> v2 see: https://minukodu.de/en/news/update-minuvis-v1-v2

* If you want to keep Version 1, use this Docker-Image: https://hub.docker.com/r/sepp68/minuvis-image

########################################################################


## Instructions

- install adapter as usual
- create instance of minuvis (only 1 possible)
- enable socket.io-Instance at web-Instance 

![socket.io@web](https://minukodu.de/githubimg/web_instance_socket_io.jpg)
- open minuvis instance 

![minuvis instance](https://minukodu.de/githubimg/minuvis_instance.jpg)
- connect to socket.io-Port of web or your own socket.io-instance 

![connect](https://minukodu.de/githubimg/minuvis_connect.jpg)
- add new page 

![add Page](https://minukodu.de/githubimg/minuvis_addpage.jpg)
- add widget 

![add Widget](https://minukodu.de/githubimg/minuvis_addwidget.jpg)
- edit state 

![select state](https://minukodu.de/githubimg/minuvis_selectstate.jpg)
- preView yor new app 

![preview](https://minukodu.de/githubimg/minuvis_preview.jpg)

For more information visit https://minukodu.de/en or watch at youtube https://youtu.be/dtHUBOEc4js


## Changelog
### 2.2.0 (2021-09-19)
* updated app and builder to V2.2.0

### 2.1.0 (2021-07-31)
* updated app and builder to V2.1.0

### 2.0.0-rc.2 (2021-05-16)
* updated app and builder to V2.0.0-rc.2

### 2.0.0-rc.1 (2021-05-02)
* updated app and builder to V2.0.0-rc.1

### 2.0.0-beta.1 (2021-04-11)
* updated app and builder to V2.0.0-beta.1

### 2.0.0-alpha.2 (2021-04-05)
* updated app to V2.0.0-alpha.2

### 2.0.0-alpha (2021-03-08)
* updated app to V2.0.0-alpha

=======
### 1.4.0 (2021-03-07)
* updated app to V1.13.0
### 1.3.1 (2021-01-24)
* updated app to V1.12.1
### 1.3.0 (2021-01-24)
* updated builder and app to V1.12.0
* new meta-datapoint "0_userdata.0" for storing config-files
### 1.2.0 (2020-12-06)
* updated builder and app to V1.11.0
### 1.1.0 (2020-12-01)
* updated builder and app to V1.10.0
### 1.0.0 (2020-11-22)
* create version V1.0.0 
### 0.0.12 (2020-11-19)
* updated builder and app to V1.9.0
### 0.0.11 (2020-11-15)
* updated builder and app to V1.8.0
### 0.0.10 (2020-10-04)
* updated builder and app to V1.6.0
### 0.0.9 (2020-09-27)
* updated builder and app to V1.5.0
### 0.0.8 (2020-09-16)
* bugfix number of buttons for valueswitcher
### 0.0.7 (2020-09-14)
* updated builder and app to V1.4.0
### 0.0.6 (2020-09-14)
* updated builder and app to V1.3.0
### 0.0.6 (2020-06-23)
* updated builder and app to V1.2.1
### 0.0.5 (2020-05-14)
* adaptions for iobroker.repositories
### 0.0.4 (2020-05-13)
* updated README.md
### 0.0.3 (2020-05-11)
* updated builder and app to V1.0.4
### 0.0.2 (2020-05-10)
* updated builder and app to V1.0.2
### 0.0.1 (2020-05-02)
* (svallant) initial release

## License
MIT License

Copyright (c) 2021 svallant <svallant@gmx.eu>

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
