![Logo](admin/heatingcontrol.png)
# ioBroker.HeatingControl


![Number of Installations](http://iobroker.live/badges/heatingcontrol-installed.svg) 
![Number of Installations](http://iobroker.live/badges/heatingcontrol-stable.svg)
[![Downloads](https://img.shields.io/npm/dm/iobroker.heatingcontrol.svg)](https://www.npmjs.com/package/iobroker.heatingcontrol)
[![NPM version](http://img.shields.io/npm/v/iobroker.heatingcontrol.svg)](https://www.npmjs.com/package/iobroker.heatingcontrol)

[![Known Vulnerabilities](https://snyk.io/test/github/rg-engineering/ioBroker.heatingcontrol/badge.svg)](https://snyk.io/test/github/rg-engineering/ioBroker.heatingcontrol)
![GitHub Actions](https://github.com/rg-engineering/ioBroker.heatingcontrol/workflows/Test%20and%20Release/badge.svg)

[![NPM](https://nodei.co/npm/iobroker.heatingcontrol.png?downloads=true)](https://nodei.co/npm/iobroker.heatingcontrol/)


![node-lts](https://img.shields.io/node/v-lts/iobroker.heatingcontrol?style=flat-square)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/iobroker.heatingcontrol?label=npm%20dependencies&style=flat-square)

![GitHub](https://img.shields.io/github/license/rg-engineering/ioBroker.heatingcontrol?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/rg-engineering/ioBroker.heatingcontrol?logo=github&style=flat-square)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/rg-engineering/ioBroker.heatingcontrol?logo=github&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/rg-engineering/ioBroker.heatingcontrol?logo=github&style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/rg-engineering/ioBroker.heatingcontrol?logo=github&style=flat-square)


[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/heatingcontrol/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)









**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** 
For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.


**If you like it, please consider a donation:**
                                                                          
[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=34ESBMJ932QZC) 


## Documentation

**I'm looking for support in creating / updating the user documentation and the FAQ's. If someone is interested, please contact me...**

## Translation
The adapter is translated using Weblate, a web-based tool that makes translation easier for developers and translators alike.
[Participate in the ioBroker Adapters project](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

[Click here to go directly to the translations](https://weblate.iobroker.net/projects/adapters/heatingcontrol/)



## Adapter for controlling your heating system.

Features:
* Control the setpoint temperature levels of all thermostats per schedules
* Configure multiple heating periods for each day and night 
* Supports all kind of thermostats (precondition: it must be available in ioBroker)
* Homematic device autodetection 
* supports multiple profiles
* If there is no direct connection between the thermostat and the actuator, the actuator can be switched directly out of the adapter
* Currently, the actuator is switched off directly when the setpoint temperature is reached. As soon as the setpoint temperature is below the actual temperature, the actuator will be switched on. (To do: implement improved control)
* unlimited number of thermostats, actuators and sonsors per room are supported
* Thermostat, actuator and sensor could be automatically detected per room (homematic devices only). The function (eg "heating") is used for this.
* Rooms can be excluded within the admin interface, if a room contains a thermostat but should not be controlled
* sensor is used to reduce target temperature (e.g. if a window is open); optionally with SensorDelay
* interface to Feiertag-Adapter or any others to detect public holiday. Public holiday can be a normal day or like sundays. (admin setting)
* manual temperature override for a certain time
* predefined heating period
* take over changes from thermostat (optional)
* visualization from [Pittini](https://github.com/Pittini/iobroker-heatingcontrol-vis) is supported. Thank you!
* Vis-2 support with [vis-2-widgets-weather-and-heating](https://github.com/rg-engineering/ioBroker.vis-2-widgets-weather-and-heating)

[FAQ](doc/FAQ.md)


## Installation

## Settings
### main
* Function = Function to be used to detect thermostats, actuators and sensors per room. It's one of the sytem enums
* Path to Feiertag - Adapter = if you wnat to use Feiertag-Adapter to dectect automatically public holiday for today then set the path here (e.g. feiertage.0)
* sensor used = if you have window sensors and you want to decrease target temperature when window is open then enable that option
* actuators used = if you want to control actuators directly from adapter. Just in case there is no direct connection between thermostat and actuator.
* use actuators if no heating period = only valid with actuators. Defines how actuators are set when no heating period is active
* use actuators if no thermostat available = only valid with actuators. If you have rooms without thermostat but with heating actuator you can switche them on or off permanantly


### profile
* Profile Type = three different profile types (Monday - Sunday, or Monday - Friday and Suturday/Sunday or every day) are supported
* number of profiles = if you need more then on profile increase that value. You can then select which profile will be used.
* number of periods = define how many daily sections with different temperature you need. As more you set as more datapoints will be created. Better to use a low value (e.g. 5)
* "public holiday like sunday = if you want to set target temperatures on public holiday like sunday enable that option. Otherwise public holiday settings are the same as on normal days
* HeatingPeriod = start and end date of heating period. Used to set "HeatingPeriodActive" 



### devices
* select a room first and enable it 
* bewlo you will find all configurtions for the room

### Room configuration
* here you can verifay and set object ID's for thermostats, actuators and sensors
* you can add manually new thermostats, actuators or sensors. Just press + button. Then you get an empty line which needs to filled up. The Edit-Button opens a list of available devices on the system
* thermostats:
** name, temperature target OID and current temperature OID should be set. 
* actuators
** name and OID for state should be set
* sensors
** name and OID for current state should be set

## datapoints

| DP name             | description                                                                                         |
|---------------------|-----------------------------------------------------------------------------------------------------|
| HeatingPeriodActive | if off, the profiles will not be used                                                               | 
| CurrentProfile      | select current profile (1 based, means profile 1 use datapoints under heatingcontrol.0.Profiles.0 ) | 
| LastProgramRun      | shows last time when adapter run                                                                    | 

### temperature decrease / increase
| DP name             | description                                                | target temperature for relative decrease                                       | target temperature for absolute decrease                      |
|---------------------|------------------------------------------------------------|--------------------------------------------------------------------------------|---------------------------------------------------------------|
| GuestsPresent       | increase temperature because guests wants it warmer        | increase current profile temperature by Profiles.0.room.relative.GuestIncrease          | set target to Profiles.0.room.absolute.GuestIncrease          | 
| PartyNow            | decrease temperature because it's becoming hot'            | decrease current profile temperature by Profiles.0.room.relative.PartyDecrease          | set target to Profiles.0.room.absolute.PartyDecrease          | 
| Present             | we are present, if we are not present decrease temperature | decrease current profile temperature by Profiles.0.room.relative.AbsentDecrease         | set target to Profiles.0.room.absolute.AbsentDecrease         | 
| VacationAbsent	  | we are absent, so decrease also on weekend                 | decrease current profile temperature by Profiles.0.room.relative.VacationAbsentDecrease | set target to Profiles.0.room.absolute.VacationAbsentDecrease | 
| FireplaceModeActive | decrease temperature bacause you use a fireplace, will be  | decrease current profile temperature by Profiles.0.room.relative.FireplaceModeDecrease  | set target to Profiles.0.room.absolute.FireplaceModeDecrease  | 
|                     | reseted automatically at adjustable time


* Datapoints only available if "General Profile Settings, temperature lowering" is set
* in both szenarious only one lowering is used (in previous version of adapter more then one degreases could be used)
* in absolute degrease szenario only target values not equal 0°C are used. If you do not need any lowering for a certain room then keep decrease-values at 0°C

### no heating period
there are three options

* fix Temperature per room
if this option is selected, a new datapoint in object tree appears for every room. Here you can set a fix target temperature which is set when heating period is not active.
* fix Temperature for all rooms
with this option you can use one target temperature for every room when heating period is not active
* nothing
with this option nothing will be sent to thermostat if no heating period is active. Target temperature remain from last taget when heating period still was active.
In that case and if you use actuators from the adapter then you have the possibilty to define how actuators should be set (off, on, or leave it as it is) 


## others

* HolidayPresent / PublicHolidyToday
If you enable "Holiday present like sunday" or "public holiday like sunday" in admin, the profile for sunday is used
when adapter is informed that today is a public holiday or you are at home in holiday.

### window open
if "use sensors" is active and sensor(s) for a room is / are configured then

* decrease current profile temperature when window is open (true) by Profiles.0.room.WindowOpenDecrease if relative decrease is configured
* set target to Profiles.0.room.absolute.WindowOpenDecrease when window is open (true) if  absolute decrease is configured

optionally a delay can be used. If window is opened only for a short time sensor delay can avoid from reduce and back to normal in very short times.

## ical support
you can use your calendar or any other datapoint to change datapoints in adapter.
Just configure events from ical or other datapoints in admin. Supported are

| datapoint                           | description
|-------------------------------------|----------------------------------------------------------------------------
|heatingcontrol.0.Present             | set it to true (in case of boolean) or to a number higher then limit (in case of number)
|heatingcontrol.0.HolidayPresent      | set it to true when you at home in your holiday
|heatingcontrol.0.VacationAbsent      | set it to true when you not at home in your holiday
|heatingcontrol.0.GuestsPresent       | set it to true (in case of boolean) or to a number higher then limit (in case of number)
|heatingcontrol.0.PartyNow            | set it to true (in case of boolean) or to a number higher then limit (in case of number)

hint: with number datapoints you could count how many people are in the house and then decide, e.g. we have enough for a party...

## use changes from thermostat

Many user asked for an option to take over changes from thermostat into adapter. Now a four options are implemented:

| option                   | description                                                
|--------------------------|---------------------------------------------------------------------------------------
| no                       | changes from thermostat are ignored
| as override              | changes from thermostat are taken as override; override time must be set in advance in heatingcontrol.0.Rooms.RoomName.TemperaturOverrideTime
|                          | if override time is not set, than override is not executed
| as new profile setting   | changes from thermostat are taken as target temperature for current profile period
| until next profile point | changes from thermostat are taken as target temperature until next profile point. This is a manual mode, so only Window sensors are used. All other 
|                          | increases / decreases are ignored. There is a datapoint in every room to disable manual mode before reaching next profile point.

## extend override when temperature is changed
The standard behavior for override is, when you change temperature the override time is not changed. E.g if you start override for 20 minutes with 25°C
and you change to 28°C after 15 minutes then 28°C is only used for the last 5 minutes. With that option you restart override whenever you change override temperature.
In example above 28°C would then be used for 20 minutes which leads to 15 minutes 25°C and 20 minutes 28°C 

## override mode
There are two mode adjustable in admin for all rooms.
* timer controlled
this is the wellknown function, which uses a temperature and a duration. The given temperature is used for the duration and then temperature target will set back to value in auto mode
* until next profile point
this is a new function. Here we can use a temperature override until next profile point. The duration will be ignored but must be non-zero!


## Thermostat handles "window is open"
Some thermostats can handle "window is open" by itself. In those cases a direct connection between window sensor and thermostat is configured and thermostat reduces
target temperature by itslef when a window is opened.
In combination with option "use of changes from thermostat"  / "until next profil point" will lead this to an unexpected manual state. In this situation the reduced 
temperature  would be used until next profil point.
But the adpater can handle this behavior. You must enable option "Thermostat handles 'Window is Open'" and you can configure window sensors also in adapter.
When window is opened the adapter waits for max. 3 seconds for new target temperature from thermostat. If it receives a new target temperature in that time it will be used
as a reduced absolut temperature. Status will then be "auto window open". As soon as the window is closed the status goes back to auto and thermostat sets back the
original target temperature
**Attention** do not use Sensor Open Delay in that case. If you use it, the Window open event appears after target temperature received from thermostat. This ends up in 
manual state. 


## Copy period and copy profile
``
heatingcontrol.0.Profiles.1.CopyProfile
heatingcontrol.0.Profiles.1.Room.CopyProfile
``

and

``
heatingcontrol.0.Profiles.1.Küche.Fri.CopyPeriods
``

CopyProfile copies the entire content of the profile where the button is pressed to the next profile. In the above example, the button is in profile 1. The button copies everything from profile 1 to profile 2.
If you want to copy only one room, use the button in a certain room.

The CopyPeriods are available per day or Mon-Fri per room. This copies the periods to the next section. In the above example, the CopyPeriods copies all periods from Friday in the kitchen room to the periods on Saturday in the kitchen room.
So you can e.g. in the profile "every day separately", copy the periods from Monday to Sunday ...

## maintenance mode

to do

## fireplace mode

to do

## actuator handling

to do

switch between linear and linear with hysteresis

describe two new datapoints 
heatingcontrol.0.Rooms.TestRaum.Regulator.HysteresisOffOffset
and
heatingcontrol.0.Rooms.TestRaum.Regulator.HysteresisOnOffset

## extended actuator handling

checks that value was set correctly and ack is set, otherwise retries...

to do


## EVU Sperrzeit / PowerInterruption

when the power supply company blocking time is reached, all actuators are switched off and switched on again at the end of the blocking time.
Status goes to "EVU Sperrzeit" / "PowerInterruption"
Aim: switch off electrical heaters and switch them on again in a targeted manner in order to minimize the load on the contactors and to minimize inrush currents
Configuration: Start / end time of the EVU blocking time, several periods can be configured


## Issues and Feature Requests
* If you are faced with any bugs or have feature requests for this adapter, please create an issue within the GitHub issue section of the adapter at [github](https://github.com/rg-engineering/ioBroker.heatingcontrol/issues). Any feedback is appreciated and will help to improve this adapter.

## known issues

### Adapter with Homematic IP Fußbodenheizungsaktor HmIP-FAL230-C10 – 10fach, 230 V 
It seems that HmIP-FAL230-C10 can not be used directly as an actuator in combination with that adapter. If you use HmIP-FAL230-C10 together with Homematic thermostats it should work.
see also [Forum](https://forum.iobroker.net/topic/22579/test-adapter-heatingcontrol-v1-0-x/1553)

### Window-open function of HM thermostats
HM thermostats have an open window function in two variants. On the one hand as temperature drop detection and on the other hand in connection with a window contact.
This function causes the adapter to switch to manual mode when the window is opened. Ideally, this function should be deactivated so as not to interfere with the functionality of the adapter.
If thermostat use information from window sensor then "thermostat handles window open" option should be enabled.

When the adapter crashes or an other Code error happens, this error message that also appears in the ioBroker log is submitted to Sentry.  All of this helps me to provide error free adapters that basically never crashs.

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 3.1.3 (2026-04-11)
* (René) fix in migrate data: wait, until room list is available and check if room list is empty, otherwise do not migrate data to avoid removing rooms
* (René) changelog_old.md added

### 3.1.1 (2026-04-08)
* (René) some logs in migrate data
* (René) issue #781: fix upload configuration

### 3.1.0 (2026-03-16)
* (softwarecrash) Add optional window-open thermostat priority
* (René) changes requested by adapter checker
* (René) dependencies updated

### 3.0.4 (2026-02-22)
* (René) see issue #730: bug fix: if window sensor uses "false" for Open window state was always set to open

### 3.0.3 (2026-01-04)
* (René) see issue #723: The OIDs selected in the OID selection dialog were not saved.
* (René) bug fix: use correct actor ID
* (René) bug fix: OID-Path for Path2HolidayPresentDP now taken from old version
* (René) old device structure deleted after migration to avoid double import

## License
MIT License

Copyright (c) 2019-2026 René G. <info@rg-engineering.eu>

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