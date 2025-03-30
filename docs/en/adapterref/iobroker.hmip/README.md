![Logo](admin/homematic.png)
# ioBroker HomeMatic IP Cloud AccessPoint Adapter

![Number of Installations](http://iobroker.live/badges/hmip-installed.svg)
![Number of Installations](http://iobroker.live/badges/hmip-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.hmip.svg)](https://www.npmjs.com/package/iobroker.hmip)

![Test and Release](https://github.com/iobroker-community-adapters/iobroker.hmip/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/hmip/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.hmip.svg)](https://www.npmjs.com/package/iobroker.hmip)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Disclaimer
**All product and company names or logos are trademarks™ or registered® trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them or any associated subsidiaries! This personal project is maintained in spare time and has no business goal.**
**HomeMatic is a trademark of ELV Elektronik AG**

## Description
This adapter allows communication with a HomematicIP CloudAccessPoint via the Rest API of the Homematic IP Cloud

**Important note:** Please limit control requests to the bare minimum because EQ-3 started to block IPs when you do too much!

## Installation
Here is a Step-by-Step Installation Video on YouTube 
https://youtu.be/kXWfJRUYJIA

## Info
Most Homematic IP devices are already working with the latest adapter version. 

I will improve it constantly, but it will take time. Any help from the community through e.g. Pull Request would be highly appreciated.

For not working HmIP devices, please create an issue with this info (please one per device and if possible, the technical name in the subject).
Switch adapter logging in ioBroker to silly mode and add the JSON of the device, which is printed to the log in the issue.
I may also need a JSON of a state change.

Thank you!

If you are looking for the information, if the alarm settings are active, you have to check the active status of the group INTERNAL and EXTERNAL, they represent in combination the three alarm states. INTERNAL and EXTERNAL actives means Away, only EXTERNAL active means only Perimeter active.

## Important Info what can be done with this adapter
!!! You can only trigger events with this adapter that can be triggered through the original Homematic IP app. 
For example, direct connections between devices have no events in the app and can also not be triggert through this adapter!!! 

## Settings
* enter your SGTIN (back of the Access Point) and the PIN (if set before), and validate the data via press of the blue LED Button. This will create an Authentication token.

## Special settings

### HMIP-DLD (Door Lock Drive)
If you have assigned a PIN to the lock in HmIP app (Settings / Access authorizations - German: "Zutrittsberechtigungen") then the PIN needs to be set in the pin state of the device's objects. It is NOT your system PIN!! if you have not set a PIN in settings, you can also leave empty in the pin state.
Additionally, please add "iobroker" client to the list of access control clients in HmIP app settings!

## Home Control Unit (HCU)
There is a changed workflow with HCU

Press the button once before starting the token creation. It enables remote access for 5 minutes.
Then press the button once again when asked for it during a pairing process.

Many thanks to @dietzm for adding support of HCU to this adapter.

## Thanks
* to @coreGreenberet for his python lib (https://github.com/coreGreenberet/homematicip-rest-api)

## Diskussion in ioBroker Forum
https://forum.iobroker.net/topic/27532/homematic-ip-cloud-access-point-adapter

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
## Changelog
### 1.27.0 (2025-03-24)
* (mcm1957) Adapter requires admin 7.6.3, js-controller 6.0.11 and node.js 20 now.
* (@GermanBluefox) GUI was migrated to TypeScript (Admin 7.6)
* (SliX185) Support to control opticalSignalBehaviour for HMIP-BSL has been added.
* (SliX185) Logging of PIN has been removed
* (mcm1957) Dependencies have been updated.

### 1.26.5 (2025-01-27)
* (@Apollon77) Fixed Websocket disconnect cases

### 1.26.4 (2025-01-03)
* (@Apollon77) Optimized Websocket disconnect cases

### 1.26.3 (2024-12-29)
* (@GermanBluefox) Updated packages

### 1.26.2 (2024-12-10)
* (@mcm1957) Adapter requires node.js 20 now
* (@dietzm) Added support for Home Control Unit
* (@GermanBluefox) Corrected the admin GUI

### 1.25.0 (2024-11-08)
* (bluefox) Updated packages
* (bluefox) User prettier for code
* (bluefox) Added GUI test for the admin component

### 1.24.3 (2024-09-02)
* (bluefox) GUI was migrated for Admin 7
* (bluefox) Removed gulp

### 1.23.4 (2024-07-07)
* (Apollon77) previousShutterLevel and hardwareColorTemperatureColdWhite datatype corrected
* (Apollon77) Optimize websocket reconnection handling

### 1.23.3 (2024-05-27)
* (bluefox) Ignored status 400 by token request

### 1.23.2 (2024-05-24)
* (bluefox) Allowed calling token request without PIN
* (bluefox) Corrected the token request

### 1.23.0 (2024-04-19)
- (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
- (mcm1957) Dependencies have been updated

### 1.22.0 (2024-01-17)
* (bluefox) IMPORTANT: Node.js 16.x or newer is now required
* (bluefox) Module `require` has been replaced by `axios`
* (bluefox) Added JSON config
* (ChristianFue) Added support for Hmip-RGBW
- (bluefox) Dependencies have been updated.

### 1.21.1 (2024-01-15)
- (ApolloSK) Some issues for energySensor have been fixed.
- (mcm1957) Dependencies have been updated.

### 1.21.0 (2023-12-27)
- (ApolloSK) Implement ENERGY_SENSORS_INTERFACE_CHANNEL
- (mcm1957) Standard workflows and testing have been updated.
- (mcm1957) Adapter requires nodejs 16 or newer now.
- (mcm1957) Dependencies have been updated.

### 1.20.0 (2022-09-19)
* IMPORTANT: Node.js 12.x is now required at a minimum
* Add additional fields for MULTI_MODE_INPUT_CHANNEL for Doorbell
* Add valve position for FLOOR_TERMINAL_BLOCK_MECHANIC_CHANNEL
* Add several more states for SWITCH_CHANNEL, DIMMER_CHANNEL, WEATHER_SENSOR_CHANNEL, SHUTTER_CHANNEL 
* Add channel label

### 1.19.2 (2022-09-07)
* Optimize Reconnect handling

### 1.19.1 (2022-08-21)
* Fix datatype of selfCalibrationInProgress

### 1.19.0 (2022-08-14)
* Add several more device settings that can be modified via adapter
  * accelerationSensorMode
  * accelerationSensorSensitivity
  * accelerationSensorTriggerAngle
  * accelerationSensorEventFilterPeriod
  * accelerationSensorNeutralPosition
  * notificationSoundTypeHighToLow
  * notificationSoundTypeLowToHigh
  * routerModuleEnabled
  * minimumFloorHeatingValvePosition
  * sirenWaterAlarmTrigger
  * inAppWaterAlarmTrigger
  * acousticAlarmSignal
  * acousticAlarmTiming
  * acousticWaterAlarmTrigger
  * boostDuration
* Other fixes and optimizations

### 1.18.0 (2022-06-17)
* (Apollon77) Added support for PARTICULATE_MATTER_SENSOR_CHANNEL
* (Apollon77) Correctly ignore some channels without meaningful data

### 1.17.0 (2022-04-26)
* (Apollon77) Also reinitialize objects when new groups or clients are detected
* (Apollon77) Added experimental support to set dimLevel for Multi Mode Input Dimmer channels

### 1.16.1 (2022-04-19)
* (Apollon77) Fixed a crash case introduced by last version

### 1.16.0 (2022-04-16)
* (Apollon77) Optimize websocket reconnection handling
* (Apollon77) Add support for GENERIC_INPUT_CHANNEL

### 1.15.5 (2022-03-20)
* (Apollon77) Optimize reconnection handling

### 1.15.4 (2022-02-19)
* (Apollon77) Fix sendDoorCommand for HmIP-MOD-HO

### 1.15.3 (2022-01-22)
* (Apollon77) Add windowOpen indicator to two more places
* (Apollon77) Optimize reconnection handling
* (Apollon77) Optimize automatic initialization of unknown devices and channels

### 1.15.2 (2022-01-04)
* (Apollon77) Wait 10s until no new "unknown state update" was received before updating the whole system

### 1.15.0 (2022-01-02)
* Node.js 10.x is now the minimum required version for this adapter
* (Apollon77) Optimize WebSocket reconnection Logic
* (Apollon77) Optimize current value handling and re-set value if a state change is not processed because of an unchanged value
* (Apollon77) Implemented startImpulse call for ImpulseOutputChannels for e.g., HM-WGC
* (Apollon77) Implemented support for HMIP-DLD to set the lock state and also an option PIN if needed (see notes above)
* (Apollon77) Detect new and unknown devices and channels and reinitialize the structure to add the new objects on the fly
* (Apollon77) Implement DOOR_LOCK_SENSOR_CHANNEL
* (Apollon77) Ignore HEAT_DEMAND_CHANNEL, DEHUMIDIFIER_DEMAND_CHANNEL, FLOOR_TERMINAL_BLOCK_CHANNEL and CHANGE_OVER_CHANNEL because no data to prevent logs
* (Apollon77) optimize unload handling

### 1.14.0 (2021-11-07)
* (Apollon77) Lower loglevel for state change logs to debug
* (Apollon77) Add verification when reading some data to prevent crashes
* (Apollon77) Removed some generic (error/info) states that only exist on chosen devices to re-add later in a generic way

### 1.13.2 (2021-08-25)
* (Apollon77) Fix warning on js-controller 3.3 with two data points

### 1.13.1 (2021-08-06)
* (Apollon77) Fix warning on js-controller 3.3 with "sabotage" datapoint

### 1.13.0 (2021-06-23)
* (Apollon77) Add support for HM-WGC/IMPULSE_OUTPUT_CHANNEL

### 1.12.2 (2021-06-04)
* (Apollon77) Fix a warning in js-controller 3.3

### 1.12.1 (2021-05-13)
* (Apollon77) Fix a warning in js-controller 3.3

### 1.12.0 (2021-05-13)
* (Apollon77) Implement NOTIFICATION_MP3_SOUND_CHANNEL

### 1.11.1 (2021-05-08)
* (Apollon77) IMPORTANT: The adapter now requires js-controller 3.1 at least!
* (Apollon77) Update objects on startup to make sure definition is current
* (Apollon77) prevent warnings in js-controller 3.3

### 1.11.0 (2021-04-25)
* (Apollon77) Implement CARBON_DIOXIDE_SENSOR_CHANNEL

### 1.10.0 (2021-04-12)
* (Apollon77) Implement TEMPERATURE_SENSOR_2_EXTERNAL_DELTA_CHANNEL, DOOR_LOCK_CHANNEL and ACCESS_AUTHORIZATION_CHANNEL

### 1.9.0 (2021-02-16)
* (Apollon77) Round temperature values to nearest 0.5 degrees
* (Apollon77) Only send values to HMIP when changed (reduce traffic!)
* (Apollon77) Add debouncing to setPointTemperature changes (means value is sent out when "stable" for 5s!) (reduce traffic!)
* (Apollon77) Add throttling to other change requests (means other changes are blocked for 1s) (reduce traffic!)
* (Apollon77) Implement ANALOG_ROOM_CONTROL_CHANNEL (Sentry IOBROKER-HMIP-1X)

### 1.7.2 (2021-02-09)
* (Apollon77) Try to detect websocket connection failures start over

### 1.7.0 (2021-01-26)
* (Apollon77) add Heating Absence Permanent state and functionality
* (Apollon77) add support for MULTI_MODE_INPUT_BLIND_CHANNEL

### 1.6.2 (2021-01-21)
* (Apollon77) Add check when HMIP domain could not be determined.

### 1.6.1 (2021-01-12)
* (Apollon77) Prevent crash case (Sentry IOBROKER-HMIP-1N)

### 1.6.0 (2020-12-24)
* Important note: Please limit control requests to the bare minimum because EQ-3 started to block IPs when you do too much!
* (Apollon77) Add support for WALL_MOUNTED_THERMOSTAT_CHANNEL

### 1.5.2 (2020-12-15)
* (Apollon77) ignore DEVICE_CHANNEL_EVENT for now and also log as debug to not flood log

### 1.5.0 (2020-11-09)
* (Apollon77) Add control options for primary/secondaryShadingLevel data points

### 1.4.1 (2020-11-03)
* (Apollon77) fixed a potential crash case (Sentry IOBROKER-HMIP-1N)

### 1.4.0 (2020-10-29)
* (Apollon77) Add ROTARY_WHEEL_CHANNEL and RAIN_DETECTION_CHANNEL, ACCESS_CONTROLLER_WIRED_CHANNEL
* (Apollon77) Read home anew if no home object is provided for SECURITY_JOURNAL_CHANGED event

### 1.3.1 (2020-09-18)
* (Apollon77) Fix missing write permission for Notification Light "On" channel

### 1.3.0 (2020-09-18)
* (SliX185) Add MAINS_FAILURE_CHANNEL
* (Apollon77) Add DEVICE_RECHARGEABLE_WITH_SABOTAGE, ACCESS_CONTROLLER_CHANNEL, FLOOR_TERMINAL_BLOCK_MECHANIC_CHANNEL, DEVICE_BASE_FLOOR_HEATING, MULTI_MODE_INPUT_DIMMER_CHANNEL, MULTI_MODE_INPUT_SWITCH_CHANNEL, ANALOG_OUTPUT_CHANNEL, ACCELERATION_SENSOR_CHANNEL, TILT_VIBRATION_SENSOR_CHANNEL, SHADING_CHANNEL
* (Apollon77) try to add dim/rgb support for NotificationLight. You might need to delete/recreate the states if it is not working.
* (Apollon77) add additional functions for setOperationLock, setClimateControlDisplay, setMinimumFloorHeatingValvePosition, setRgbDimLevel. You might need to delete/recreate the states if it is not working.
* (Apollon77) adjusted some roles. You might need to delete/recreate the states if it is not working.

### 1.2.2 (2020-08-17)
* (Apollon77) Prevent Crash case (Sentry IOBROKER-HMIP-1B)

### 1.2.1 (2020-08-10)
* (Apollon77) Fixed a pairing process

### 1.2.0 (2020-07-26)
* (saschaabraham) Added an active property INTERNAL and EXTERNAL groups for alarm zones
* (marcus0303/slix185) added DOOR_CHANNEL properties

### 1.1.1 (2020-07-23)
* (Apollon77) Crash prevented if object is deleted by state changed (Sentry IOBROKER-HMIP-Y)

### 1.1.0 (2020-07-14)
* (Apollon77) Remember already sent unknown channel info to not spam Sentry
* (Apollon77) Handle reconnects better (Sentry IOBROKER-HMIP-G)
* (Apollon77) Try to prevent crashes on invalid server responses, warning is logged
* (SliX185) Add HMIP-SPDR (PASSAGE_DETECTOR_CHANNEL)

### 1.0.1 (2020-05-16)
* (Apollon77) Make sure invalid data do not crash adapter (Sentry IOBROKER-HMIP-7)
* (Apollon77) code cleanup
* (Apollon77) fix several roles (role info is not allowed)

### 1.0.0 (2020-05-12)
* (Apollon77) Add Sentry for error/crash reporting
* (Apollon77) multiple fixes and optimizations
* (Apollon77) prevent adapter crashes in some places
* (Apollon77) 
* (ApolloSK) add vaporAmount for WeatherSensorPro
* (ApolloSK) fix HmIP-SWO-PR wrong DataType actualTemperature
* (marcus0303) Added DEVICE_GLOBAL_PUMP_CONTROL, FLOOR_TERMINAL_BLOCK_LOCAL_PUMP_CHANNEL and DEVICE_INCORRECT_POSITIONED, Fixed role in _createWaterSensorChannel and function call in _createWeatherSensorPlusChannel
* (marcus0303) Added CONTACT_INTERFACE_CHANNEL for HmIP-SCI (see Issue #70), Added FLOOR_TERMINAL_BLOCK_CHANNEL, HEAT_DEMAND_CHANNEL, DEHUMIDIFIER_DEMAND_CHANNEL, CHANGE_OVER_CHANNEL, but without functionality, because it's not implemented in REST-API. Only to supress Warnings in Log.

### 0.0.12
* (jogibear9988) multiple fixes

### 0.0.11
* (jogibear9988) multiple fixes

### 0.0.10
* (jogibear9988) added ping/pong, enable setBoots, more units, more hardware

### 0.0.9
* (jogibear9988) fullrx and operationlock channel

### 0.0.8
* (jogibear9988) fixes a few devices

### 0.0.7
* (jogibear9988) fixes wrong state handling

### 0.0.6
* (jogibear9988) fixes for more devices, alarm handling

### 0.0.5
* (jogibear9988) more devices and big refactoring (switched from DeviceType to FunctionalChannelType)

### 0.0.4
* (jogibear9988) more devices, bugfixes. thanks to TobiasF1986, steckenpferd and Ma-ster77

### 0.0.3
* (jogibear9988) bugfixes and more devices

### 0.0.2
* (jogibear9988) bugfixes, more devices and initial support of groups

### 0.0.1
* (jogibear9988) initial release

## License
The MIT License (MIT)

Copyright (c) 2023-2025 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2018-2022 jogibear9988 <jochen.kuehner@gmx.de>, Apollon77

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
