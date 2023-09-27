![Logo](admin/vis-2-widgets-material.png)
# Material widgets for ioBroker.vis 2.0

![Number of Installations](http://iobroker.live/badges/vis-2-widgets-material-installed.svg) ![Number of Installations](http://iobroker.live/badges/vis-2-widgets-material-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.vis-2-widgets-material.svg)](https://www.npmjs.com/package/iobroker.vis-2-widgets-material)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-material.svg)](https://www.npmjs.com/package/iobroker.vis-2-widgets-material)

[![NPM](https://nodei.co/npm/iobroker.vis-2-widgets-material.png?downloads=true)](https://nodei.co/npm/iobroker.vis-2-widgets-material/)

## Widgets
### Buttons and switches
![Switches](img/material-switches.png)

![Switches](img/material-switches-buttons.png)

![Switches](img/material-switches-buttons-2.png)

### Clock
- Analog
 
![Clock Analog](img/material-clock-analog-1.png)
 
- Analog variation

![Clock Analog 2](img/material-clock-analog-2.png)

- Digital

![Digital](img/material-clock-digital-1.png)

- Digital2 (SVG Text)

![Digital2](img/material-clock-digital-2.png)

### Simple state
With this widget, you can control one device. Boolean or number.
- Number

![Simple state](img/material-simple-state-1.png)

- Control

![Simple state](img/material-simple-state-2.png)

### View in widget
![View in widget](img/material-view-in-widget-1.png)

Not as button: View could be shown in full size, and you can control elements in view.

![View in widget - button](img/material-view-in-widget-2.png)

As button: You can show a small thumbnail of view, and by pressing on it, it will be shown in full size.

### Thermostat
![Thermostat](img/material-thermostat-1.png)

Additionally, it can show a history if you activated it.

### Actual value with chart
![Actual value](img/material-actual-value-1.png)

![Actual value with chart](img/material-actual-value-2.png)

### Security control
![Security control](img/material-security-0.png)

![Security control](img/material-security-1.png)

You can define the delay in seconds.

By activation, the defined ID will be written with number of the delay seconds, 
and after the delay is over, the defined ID will be set to 0, and the alarm ID be set to true.

![Security control](img/material-security-2.png)

### Player
![Player](img/material-player.png)

### Map
![Player](img/material-map-1.png)

### Camera
![Player](img/material-camera-1.png)

### Html Template
![Player](img/material-html-1.png)

Html template can be used to show any html code.
Additionally, you can show image or iframe with this widget too.

### Blinds
![Blinds](img/material-blinds-1.png)

![Player](img/material-blinds-2.png)

### Color Lamp
![RGB](img/material-rgb.png)

### Door lock
![Door lock](img/material-lock.png)

### Time picker


## Todo
- Investigate delay for widgets
- Extend Blinds with shutter 
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

## Changelog
### 1.2.1 (2023-09-18)
* (bluefox) Added door lock, rgb and thermostat to switches widget

### 1.1.3 (2023-09-10)
* (bluefox) Door lock improved

### 1.1.0 (2023-09-08)
* (bluefox) Added door lock

### 1.0.0 (2023-08-21)
* (bluefox) Added RGB widget

### 0.8.5 (2023-08-11)
* (bluefox) Improvement of the widget loading

### 0.8.4 (2023-08-10)
* (bluefox) Improvement of wizard

### 0.8.3 (2023-07-30)
* (bluefox) Font styles are applied to all buttons

### 0.8.2 (2023-07-19)
* (bluefox) Corrected small layout problems

### 0.8.0 (2023-07-18)
* (bluefox) Added wizard for widgets

### 0.7.1 (2023-07-02)
* (bluefox) Added washer widget

### 0.6.2 (2023-06-29)
* (bluefox) Allowed usage without a frame for all widgets

### 0.6.0 (2023-06-28)
* (bluefox) Added blinds to switches widget
* (bluefox) Allowed to place widgets in widgets

### 0.5.3 (2023-06-21)
* (bluefox) Corrected errors with view in widget

### 0.5.1 (2023-06-20)
* (bluefox) Added widget to switch the theme
* (bluefox) Improved HTML widget to show iframe and image

### 0.4.0 (2023-06-16)
* (bluefox) Added button texts for switches widget
* (bluefox) Removed static widget, as it was replaced by switches widget

### 0.3.1 (2023-06-14)
* (bluefox) Improved buttons widget

### 0.2.13 (2023-03-22)
* (bluefox) BREAKING CHANGE: The names of widgets must be entered anew 
* (bluefox) update packages

### 0.2.9 (2023-02-27)
* (bluefox) Made this adapter singleton

### 0.2.2 (2023-02-22)
* (bluefox) Update packages

### 0.2.1 (2022-11-26)
* (bluefox) Implemented the blinds widget

### 0.1.5 (2022-10-27)
* (bluefox) First beta version

### 0.1.2 (2022-10-21)
* (bluefox) initial commit

## License
The MIT License (MIT)

Copyright (c) 2022-2023 Denis Haev <dogafox@gmail.com>

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