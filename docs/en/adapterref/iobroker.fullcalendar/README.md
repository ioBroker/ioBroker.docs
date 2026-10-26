![Logo](admin/fullcalendar.png)
# ioBroker.fullcalendar

![Number of Installations](http://iobroker.live/badges/fullcalendar-installed.svg) ![Number of Installations](http://iobroker.live/badges/fullcalendar-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.fullcalendar.svg)](https://www.npmjs.com/package/iobroker.fullcalendar)
[![Downloads](https://img.shields.io/npm/dm/iobroker.fullcalendar.svg)](https://www.npmjs.com/package/iobroker.fullcalendar)

[![NPM](https://nodei.co/npm/iobroker.fullcalendar.png?downloads=true)](https://nodei.co/npm/iobroker.fullcalendar/)

Schedules with [fullcalendar](https://fullcalendar.io).

## Plan the events (control your devices)
You must not use any external resources, the scheduling is processed only in ioBroker and will be not combined with any external services like "google calendar" or "iTunes".

![Example](img/example.png)

You can control your events with a calendar and can plan to control them periodically.

## Events simulation
You can record your behavior and can play it back later.
For example, you can create two recordings for workday and for weekend and play them back on according days.

Or you can record the whole week and can play it back in the next weeks while you are away.

How to use:
- Go to the simulation tab
- Create the new simulation by clicking on the "+" button and selecting the type of simulation: day or week
- Click the record button and wait 24 hours or 7 days till simulation stops to record events
- Now you can replay the simulation by clicking on the play button. Additionally, you can define the time when the simulation should be started.

## Todo
- Week and day must scroll to the current time

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
## Changelog
### 3.0.5 (2026-10-19)
* (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now.
* (bluefox) Migrated GUI to vite
* (bluefox) Updated packages

### 3.0.1 (2026-08-05)
* (bluefox) Migrated GUI to React19

### 2.4.5 (2024-09-09)
* (bluefox) Corrected SelectID Dialog

### 2.4.4 (2024-09-09)
* (bluefox) Removed withStyles package

### 2.3.17 (2024-05-26)
* (bluefox) Corrected the simulation

## License
The MIT License (MIT)

Copyright (c) 2017-2026 Bluefox <dogafox@gmail.com>

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