![Logo](admin/minuvis.png)
# ioBroker.minuvis

[![NPM version](http://img.shields.io/npm/v/iobroker.minuvis.svg)](https://www.npmjs.com/package/iobroker.minuvis)
[![Downloads](https://img.shields.io/npm/dm/iobroker.minuvis.svg)](https://www.npmjs.com/package/iobroker.minuvis)
![Number of Installations (latest)](http://iobroker.live/badges/minuvis-installed.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/minukodu/ioBroker.minuvis/badge.svg)](https://snyk.io/test/github/minukodu/ioBroker.minuvis)
[![Build Status](https://travis-ci.org/minukodu/ioBroker.minuvis.svg?branch=master)](https://travis-ci.org/minukodu/ioBroker.minuvis)

[![NPM](https://nodei.co/npm/iobroker.minuvis.png?downloads=true)](https://nodei.co/npm/iobroker.minuvis/)

## minuvis adapter for ioBroker

Visualization for all devices

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

# IMPORTANT !!!!

if you are upgrading from version < 1.3.0 please note:

* upgrade to version v1.4 first and resave config-files in new place

########################################################################

* **BREAKING CHANGES** in version 2 see: https://minukodu.de/en/news/minuvis-20-iobroker-available
* instructions for update v1 -> v2 see: https://minukodu.de/en/news/update-minuvis-v1-v2

* If you want to keep Version 1, use this Docker-Image: https://hub.docker.com/r/sepp68/minuvis-image

########################################################################


## Changelog
### 2.7.1 (2026-02-22)
* updated README
* updated app and builder to V2.7.1

### 2.7.0 (2026-02-15)
* fixing issues detected by repository checker
* updated app and builder to V2.7.0

### 2.6.6 (2026-02-11)
* updated app and builder to V2.6.6

### 2.6.5 (2026-01-26)
* updated app and builder to V2.6.5

### 2.6.4 (2026-01-19)
* updated app and builder to V2.6.4

### 2.6.3 (2026-01-18)
* updated app and builder to V2.6.3

### 2.6.2 (2026-01-06)
* updated app and builder to V2.6.2

### 2.3.4 (2024-02-09)
* updated app and builder to V2.3.4

### 2.3.3 (2023-04-04)
* updated app and builder to V2.3.3

### 2.3.2 (2023-03-18)
* remove bug in io-package.json file

### 2.3.1 (2023-03-17)
* updated app to V2.3.1

### 2.3.0 (2022-01-30)
* updated app and builder to V2.3.0

### 2.2.1 (2021-11-03)
* updated app to V2.2.1

### 2.2.0 (2021-09-19)
* updated app and builder to V2.2.0

### 2.1.0 (2021-07-31)
* updated app and builder to V2.1.0

## License
MIT License

Copyright (c) 2026 svallant <svallant@gmx.eu>

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
