![Logo](admin/fullcalendar.png)
# ioBroker.fullcalendar

![Number of Installations](http://iobroker.live/badges/fullcalendar-installed.svg) ![Number of Installations](http://iobroker.live/badges/fullcalendar-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.fullcalendar.svg)](https://www.npmjs.com/package/iobroker.fullcalendar)
[![Downloads](https://img.shields.io/npm/dm/iobroker.fullcalendar.svg)](https://www.npmjs.com/package/iobroker.fullcalendar)

[![NPM](https://nodei.co/npm/iobroker.fullcalendar.png?downloads=true)](https://nodei.co/npm/iobroker.fullcalendar/)

Schedules with [fullcalendar](https://fullcalendar.io).

## Plan the events (control your devices)
You must not use any external resources, the scheduling is processed only in ioBroker and will be not combined with any external services like "google calendar" or "iTunes".

![Example](img/example.png)

You can control your events with calendar and can plan to control them periodically.

## Events simulation
You can record your behavior and can play back it later.
For example, you can create two recordings for workday and for weekend and play them back on according days.

Or you can record the whole week and can play it back on the next weeks during you are away.

How to use:
- Go to simulation tab
- Create the new simulation by clicking on the "+" button and select type of simulation: day or week
- Click the record button and wait 24 hours or 7 days till simulation stops to record events
- Now you can replay the simulation by clicking on the play button. Additionally, you can define the time when the simulation should be started.

## Todo
- Week and day must scroll to the current time

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
## Changelog
### 2.3.4 (2023-11-28)
* (bluefox) Corrected monthly events

### 2.3.1 (2023-11-27)
* (bluefox) Packages were updated
* (bluefox) Corrected vis-2 widget

### 2.2.6 (2023-07-27)
* (bluefox) Compatibility with vis-2

### 2.2.2 (2023-06-19)
* (bluefox) Corrected stop of the recording

### 2.2.0 (2023-04-24)
* (bluefox) Added simulation of events

### 2.0.8 (2023-03-24)
* (bluefox) Corrected vis-2 widgets

### 2.0.5 (2023-03-07)
* (bluefox) New material design added
* (bluefox) License changed to MIT
* (bluefox) Allowed deletion of events

### 1.2.0 (2021-12-14)
* (bluefox) Updated to use with js-controller 3.3 and admin 5

### 1.1.0 (2020-01-12)
* (foxriver76) Updated to use with js-controller 2.x

### 1.0.0 (2019-11-17)
* (bluefox) Support for compact mode is added

### 0.2.4 (2017-11-23)
* Translations

### 0.2.3 (2017-11-22)
* (bluefox) Fixed interval settings
* (bluefox) Update fullcalendar library

### 0.2.1 (2017-09-25)
* (bluefox) Fixed error

### 0.2.0 (2017-08-06)
* (bluefox) Support for new admin

### 0.1.1 (2017-07-13)
* (bluefox) Fixed double event by creation

### 0.1.0 (2017-03-20)
* (bluefox) initial commit

## License
The MIT License (MIT)

Copyright (c) 2017-2023 Bluefox <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
