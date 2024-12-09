![Logo](admin/scheduler.png)
# ioBroker Scheduler Adapter

![Number of Installations](http://iobroker.live/badges/scheduler-installed.svg) ![Number of Installations](http://iobroker.live/badges/scheduler-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.scheduler.svg)](https://www.npmjs.com/package/iobroker.scheduler)
[![Downloads](https://img.shields.io/npm/dm/iobroker.scheduler.svg)](https://www.npmjs.com/package/iobroker.scheduler)
[![NPM](https://nodei.co/npm/iobroker.scheduler.png?downloads=true)](https://nodei.co/npm/iobroker.scheduler/)

This adapter is designed to control devices on a schedule. For example, heating or watering control.

You can create the profiles with different priority: normal (e.g., workdays), high (e.g., weekends) and highest (e.g., for holidays).
The profile with higher priority overloads other profiles.

For every profile, the active variable will be created.
But the user can select their own activation variable, e.g., to control holidays. 

The user should add devices to profile, and all devices in profile will be set to the same value.

This adapter has vis2 widget.

![Screenshot](img/scheduler.png)

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 1.4.2 (2024-12-06)
* (bluefox) Allowed selection of mixed states

### 1.4.1 (2024-07-25)
* (bluefox) Packages of the widget were updated

### 1.4.0 (2024-07-07)
* (bluefox) Removed `withStyles` from the widget

### 1.3.12 (2024-04-27)
* (bluefox) Corrected widget

### 1.3.8 (2024-04-11)
* (bluefox) Small GUI changes done

### 1.3.7 (2024-04-06)
* (bluefox) Corrected widget errors
* (bluefox) Implemented custom types
* (bluefox) Added possibility to control devices on holidays

### 1.2.1 (2024-04-03)
* (bluefox) Added two options: "Ignore values if same as previous" and "Do not control if device already in desired state"
* (bluefox) Corrected 15-minute intervals
* (bluefox) GUI improvements for mobile view

### 1.1.14 (2024-04-02)
* (bluefox) Corrected widget and profile

### 1.1.12 (2024-03-13)
* (bluefox) Packages updated

### 1.1.10 (2023-10-19)
* (bluefox) Packages updated

### 1.1.9 (2023-06-28)
* (bluefox) Packages updated

### 1.1.7 (2023-03-24)
* (bluefox) Worked on the build process

### 1.1.6 (2023-03-14)
* (bluefox) update packages

### 1.1.4 (2023-03-06)
* (bluefox) Tried to fix vis-2 widget

### 1.1.3 (2023-03-06)
* (bluefox) Added widget for vis-2

### 1.0.4 (2022-12-23)
* (bluefox) Updated GUI packages

### 1.0.3 (2022-06-22)
* (bluefox) Made it work with ioBroker cloud

### 1.0.2 (2022-06-20)
* (bluefox) Corrected the problem with `socket.io`

### 1.0.1 (2022-06-20)
* (bluefox) Allowed working behind reverse proxy

### 1.0.0 (2022-03-22)
* (bluefox) GUI migrated to material@5

### 0.1.3 (2022-03-22)
* (bluefox) Just the packages were updated

### 0.1.2 (2021-09-14)
* (bluefox) "Sentry" was added

### 0.1.1 (2021-09-13)
* (bluefox) Initial release

### 0.1.0 (2021-05-19)
* (bluefox) Initial commit

## License
The MIT License (MIT)

Copyright (c) 2021-2024 bluefox <dogafox@gmail.com>

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
