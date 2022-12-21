![Logo](admin/heizungssteuerung.png)
# ioBroker.heizungssteuerung

[![NPM version](https://img.shields.io/npm/v/iobroker.heizungssteuerung.svg)](https://www.npmjs.com/package/iobroker.heizungssteuerung)
[![Downloads](https://img.shields.io/npm/dm/iobroker.heizungssteuerung.svg)](https://www.npmjs.com/package/iobroker.heizungssteuerung)
![Number of Installations](https://iobroker.live/badges/heizungssteuerung-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/heizungssteuerung-stable.svg)
[![Dependency Status](https://img.shields.io/david/jbeenenga/iobroker.heizungssteuerung.svg)](https://david-dm.org/jbeenenga/iobroker.heizungssteuerung)

[![NPM](https://nodei.co/npm/iobroker.heizungssteuerung.png?downloads=true)](https://nodei.co/npm/iobroker.heizungssteuerung/)

**Tests:** ![Test and Release](https://github.com/jbeenenga/ioBroker.heizungssteuerung/workflows/Test%20and%20Release/badge.svg)

## Heizungssteuerung adapter for ioBroker

This adapter can be used to manage heating systems. You can choose between cooling and heating mode and activate boost or pause for one room. Furthermore you can overwrite the target temperature for one room.

## Configuration
To use the adapter you have to add rooms to rooms enum and add the sensors and engines to the rooms. 
Furthermore you have to add the functions temperature, humidity and engine to the correct states. The enums will be created after the first start of the Adapter. If you have no humidity sensor you can leave it empty.
![Configuration exampe](img/configExample.png)

### Main Settings
*heating mode:* you can choose beween cooling and heating.

*Reset temperatures to default on adapter starts:* if this setting is active, all temperature states will be overwritten with default temperature and targetUntil. So the next temperature check will set the temperatures to the configured temperatures setted in periods.

*Stop cooling if humidity is higher than:*  If humudity is reached, cooling will be stopped. It only works, if you have add the humidity sensor to the Function and the Room.

*Update intervall in seconds:* Define how often the adapter will check the temperatures an set the engines

*Default temperature:* Define the temperature to set if no period is matching for the a room

*Time until pause will be end in minutes:* Define the time until die pause state will be reset to inactive in minutes

*Time until boost will be end in minutes:* Define the time until die boost state will be reset to inactive in minutes

*Diffenernce from target temperature until start or stop heating:* Define the difference from target temperature until the adapter will start or stop heating. For example if 20° is target temperature, this setting is 0.5 and engine is off heting will start if temperature is lower than 19.5° and will stop heating if temperature is higher tan 20.5°.

### Periods
You can define periods for every room and time. Forthermore you can define whether this period should be used for cooling or heating. If heating mode is not matching to the setted mode on main settings the period will be ignored.


## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.6.7 (2022-12-16)
* (jbeenenga) fix date format

### 1.6.5 (2022-12-16)
* (jbeenenga) add possibility to reset temperatures on adapter start

### 1.6.4 (2022-12-16)
* (jbeenenga) add more debug outputs
* (jbeenenga) fixed incorrect period to room mapping

### 1.6.3 (2022-12-15)
* (jbeenenga) removed unnecessary debug output

### 1.6.2 (2022-12-15)
* (jbeenenga) fix for temperature calculation

### 1.5.0 (2022-09-25)
* (jbeenenga) add possibility to overwrite temperature temporarily
* (jbeenenga) add config for temperature offset
* (jbeenenga) add boost and pause function

### 1.4.6 (2022-09-12)
* (jbeenenga) small fix

### 1.4.5 (2022-09-10)
* (jbeenenga) correct type of temperatures to write into states

### 1.4.4 (2022-09-10)
* (jbeenenga) small fix for state creation

### 1.4.3 (2022-09-10)
* (jbeenenga) small fix for state creation

### 1.4.2 (2022-09-10)
* (jbeenenga) small fix for state creation

### 1.4.1 (2022-09-10)
* (jbeenenga) little logging fixes

### 1.4.0 (2022-09-10)
* (jbeenenga) add default temperature
* (jbeenenga) write current and target temperature into states

### 1.3.0 (2022-09-08)
* (jbeenenga) add possibility to define update intervall

### 1.2.4 (2022-09-08)
* (jbeenenga) small fixes

### 1.2.3 (2022-09-04)
* (jbeenenga) set engine with boolean value

### 1.2.2 (2022-09-04)
* (jbeenenga) set engine with boolean value

### 1.2.1 (2022-09-04)
* (jbeenenga) some logging issues

### 1.2.0 (2022-09-02)
* (jbeenenga) update dependencies

### 1.1.6 (2022-07-22)
* (jbeenenga) little fix

### 1.1.5 (2022-07-22)
* (jbeenenga) add some documentation
* (jbeenenga) remove connection state

### 1.1.4 (2022-07-22)
* (jbeenenga) little changes

### 1.1.3 (2022-07-22)
* (jbeenenga) changed admin dependency to minimum version 5.3.8

### 1.1.2 (2022-07-22)
* (jbeenenga) correct version problems

### 1.1.1 (2022-07-22)
* (jbeenenga) correct version problems

### 1.1.0 (2022-07-22)
* (jbeenenga) correct version problems

### 1.0.1 (2022-07-22)
* (jbeenenga) correct version problems

### 1.0.0 (2022-07-22)
* (jbeenenga) some changes

### 0.1.3 (2022-07-22)
* (jbeenenga) changed some dependency versions

### 0.1.2 (2022-07-22)
* (jbeenenga) add main logic

### 0.1.1 (2022-07-15)
* (jbeenenga) little changes

### 0.1.0 (2022-07-15)
* (jbeenenga) initial release

## Images
The main image created by Freepick (https://www.flaticon.com/de/kostenloses-icon/heizung_1295221)

## License
MIT License

Copyright (c) 2022 jbeenenga <j.beenenga@gmail.com>

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
