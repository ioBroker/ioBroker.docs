![Logo](admin/bydhvs.png)

[![NPM version](https://img.shields.io/npm/v/iobroker.bydhvs.svg)](https://www.npmjs.com/package/iobroker.bydhvs)
[![Downloads](https://img.shields.io/npm/dm/iobroker.bydhvs.svg)](https://www.npmjs.com/package/iobroker.bydhvs)
![Number of Installations](https://iobroker.live/badges/bydhvs-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/bydhvs-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.bydhvs.png?downloads=true)](https://nodei.co/npm/iobroker.bydhvs/)

**Tests:**  
![Test and Release](https://github.com/christianh17/ioBroker.bydhvs/workflows/Test%20and%20Release/badge.svg)
![CodeQL](https://github.com/christianh17/ioBroker.bydhvs/actions/workflows/codeql.yml/badge.svg?branch=main)


## bydhvs adapter for ioBroker

BYD HVS Battery poll data

## Introduction

This Adapter takes data from a byd PV battery ( https://www.bydbatterybox.com/ ) and puts them into datapoints in the adapter. Unfortunately there is no official API and no documentation, so I used wireshark and a byd-hvs-simulator to try to understand the communication. My adapter simulates the byd-app, sends similar packets to the device and analyses the responses.

## be careful

There are two steps in the beConnect app, in the first step you get the normal data, in the second step you get detail-data for all cells (individual cell temperature and voltage and some more details) To get the detail-data there has to be a delay after one of the data-packets till I can get the result. I think in the meantime alle cells are measured, but I am not sure. I am definitely not sure if you harm your battery with polling this data too often, so be aware: You are on your own risk!

## support for up to 5 modules

Up to 5 HVS Modules are now supported.

## settings

Interval: That's easy: how often (s) shall the data be polled
IP-Adress: Thats self explaining. Either you use the standard address ( 192.168.16.254 ) and change the routing at home, e.g.: https://www.photovoltaikforum.com/thread/150898-byd-hvs-firmware-update/?postID=2215343#post2215343 . The advantage is: The beConnect app works, too. Other possibility: You change the IP-Adress of the box. But: Be warned: the text on the webpage is confusing and if you are not absolutely shure about the things you do: PLEASE do not touch the settings. In the German forums I read from people who were locked out of their system and there is no way back, either byd sends you a replacement HVU or you have to buy a new one.
Battery-details: As explained above: Do you need the details of the battery? If so: set the checkobx.
Battery-details - every ... cycles :Also like above, should be clear
Test Mode - show data in error log: If you check this box: the sent and recieved data are displayed in the error-log, so you can easily download the data and send it to me in case of errors.
Copy and Paste does not work - the data is cut at the end. You will have to download it before you send it to me.

[Link zur nativen deutschen Readme:](README-German.md)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__
* (arteck) add current info
* (arteck) add creates into separated file 

### 1.5.4 (2025-08-03)
* (arteck) typo

### 1.5.3 (2025-08-02)
* (arteck) update dependecy

### 1.5.2 (2025-08-02)
* (arteck) add socketConnection DP
* (arteck) use jsconConfig
* (arteck) refactoring to modern Code
* (arteck) use direct socket connection without detour IPClient
* first Version with two towers in NPM

### 1.5.1 (2024-01-15)
* Enable the possibility to get informations from a two tower setup
* BREAKING CHANGE of Structure.

### 1.5.0 (2023-11-04)
* Breaking change: nodejs 16 minimum required
* automated checks and release-script repaired (thanks to mcm1957, he did the work)
* nothing else changed in code

###

## License
MIT License

Copyright (c) 2025 Christian <github@familie-herrmann.de>

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
