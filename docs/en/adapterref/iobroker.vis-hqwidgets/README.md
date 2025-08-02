![Logo](admin/hqwidgets.png)
# ioBroker.vis-hqWidgets

![Number of Installations](http://iobroker.live/badges/vis-hqwidgets-installed.svg) ![Number of Installations](http://iobroker.live/badges/vis-hqwidgets-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.vis-hqwidgets.svg)](https://www.npmjs.com/package/iobroker.vis-hqwidgets)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vis-hqwidgets.svg)](https://www.npmjs.com/package/iobroker.vis-hqwidgets)

[![NPM](https://nodei.co/npm/iobroker.vis-hqwidgets.png?downloads=true)](https://nodei.co/npm/iobroker.vis-hqwidgets/)

`hqWidgets` - High quality widgets for [ioBroker.vis](https://github.com/ioBroker/ioBroker.vis)
![Example](img/widgets.png)

For one widget the `jQuery.knob` plugin (MIT) from Anthony Terrien is used.
http://anthonyterrien.com/knob/ or https://github.com/aterrien/jQuery-Knob 

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 1.5.1 (2024-03-07)
* (bluefox) Removed vis dependency and replaced with message by installation or update if vis is not installed

### 1.4.0 (2023-05-03)
* (bluefox) Behavior of the dimmer was changed. If the current value is over 5% and the user clicks on dimmer, the dimmer will be set to 0%. If the current value is less than 5%, the dimmer will be set to 100%.

### 1.3.1 (2023-01-11)
* (bluefox) Added new parameter for dimmer

### 1.3.0 (2022-08-15)
* (bluefox) Made it compatible with `ioBroker.vis` v2

### 1.2.0 (2022-04-05)
* (bluefox) Removed the deprecated method `load`

### 1.1.9 (2021-10-20)
* (bluefox) Added the valve values from 0 to 1

### 1.1.7 (2020-10-31)
* (bluefox) Corrected the after comma digits for the valve

### 1.1.5 (2020-08-08)
* (mk176) Resolved the button even if the mouse is moved out

### 1.1.4 (2020-03-28)
* (bluefox) Fixed blinds widget

### 1.1.3 (2019-10-27)
* (bluefox) Preparations for js-controller 2.0. Check undefined and nulls.

### 1.1.2 (2018-06-09)
* (bluefox) Odometer was fixed while rendering in invisible state

### 1.1.1 (2017-10-18)
* (bluefox) Fix interval description for russian

### 1.0.11 (2017-09-18)
* (bluefox) Hide left description
* (Sebastian Rosenberg) added feature to select shutter popup window position.

### 1.0.10 (2017-08-12)
* (bluefox) Fix the window handle update

### 1.0.9 (2017-07-22)
* (bluefox) Small fixes for empty images

### 1.0.8 (2016-11-24)
* (bluefox) Reduce render interval

### 1.0.7 (2016-11-11)
* (bluefox) Allow setting of padding for description

### 1.0.6 (2016-10-11)
* (bluefox) Fix circle Knob if negative limits
* (bluefox) Fix first switch by checkbox

### 1.0.5 (2016-09-14)
* (bluefox) show "last action" fixed

### 1.0.4 (2016-09-13)
* (bluefox) fix problem in inner temperature if knob widget set installed
* (Jens Maus) removed all special IE5/6 CSS hacky statements with prepending asterisk (*) characters which are just producing CSS warnings on browsers like Safari.

### 1.0.3 (2016-05-30)
* (bluefox) fix initial value of shutter if inverted

### 1.0.2 (2016-05-30)
* (bluefox) change "last changed" to ms

### 1.0.1 (2016-05-26)
* (bluefox) add odometer widget

### 1.0.0 (2016-04-12)
* (bluefox) fix blinds - control z-index of widgets if a popup window opened
* (bluefox) add colorOn for checkbox

### 0.2.5 (2015-12-19)
* (bluefox) fix hqWidgets on/off

### 0.2.4 (2015-12-19)
* (bluefox) fix height of graphic dialog

### 0.2.3 (2015-12-19)
* (bluefox) add green and blue colors to checkbox
* (bluefox) working on lock
* (bluefox) add readOnly option to "on/off"

### 0.2.2 (2015-11-10)
(bluefox) fix checkbox

### 0.2.1 (2015-10-17)
(bluefox) enable description for door and shutter

### 0.2.0 (2015-10-14)
(bluefox) fix the problem with temperature if it was as string
(bluefox) make a popup window (shutter) with most z-index when showing them

### 0.1.10 (2015-10-12)
* (bluefox) fix door widget

### 0.1.9 (2015-10-05)
* (bluefox) fix update of temperature on widgets

### 0.1.8 (2015-10-03)
* (bluefox) fix On/Off Icon if changed while invisible
* (bluefox) fix error with style in OutTemp

### 0.1.7 (2015-10-02)
* (bluefox) fix "working" icon
* (bluefox) fix on/Off button

### 0.1.6 (2015-09-30)
* (bluefox) draw widgets first when the view is visible

### 0.1.5 (2015-09-26)
* (bluefox) add push-button feature to on/off

### 0.1.4 (2015-09-24)
* (bluefox) add outdoor temperature widget
* (bluefox) automatic fill of OIDs
* (bluefox) add colors for texts
* (bluefox) add door widget

### 0.1.3 (2015-09-17)
* (bluefox) try to fix feedback in hqWidgets/Dimmer

### 0.1.2 (2015-09-13)
* (bluefox) add the step for dimmer and temperature
* (bluefox) add "is comma" and "digits after comma" to circle
* (bluefox) show waves when ack=true, even if the widget itself sets the value.

### 0.1.0 (2015-07-09)
- (bluefox) initial checkin

## License
 Copyright (c) 2013-2024 bluefox <dogafox@gmail.com>
 MIT
