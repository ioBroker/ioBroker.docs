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

If you are looking for the information whether the alarm system is armed, read `homes.<homeId>.functionalHomes.securityAndAlarm.securityZonesArmedMode`. It reports the armed zones in the vocabulary of the dashboard the home uses: `OFF`, `PRESENCE` (perimeter only) or `ABSENCE` (away) on the request-based dashboard, and `OFF`, `INTERNAL`, `EXTERNAL` or `INTERNAL_AND_EXTERNAL` on the classic one. `internalZoneArmed` and `externalZoneArmed` beside it carry the same information as the classic pair of booleans on either dashboard. To arm or disarm, write a mode to `activateSecurityZones`.

Note that `functionalHomes.securityAndAlarm.active` is not the armed state - it reports whether the home has the security solution at all.

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
### 3.1.1 (2026-08-29)
- (@Apollon77) Added functionalHomes.securityAndAlarm.securityZonesArmedMode, internalZoneArmed and externalZoneArmed, so the armed state of the alarm system is readable on the home instead of only on the security zone group
- (@Apollon77) Added functionalHomes.securityAndAlarm.activateSecurityZones: write OFF, PRESENCE, ABSENCE, INTERNAL, EXTERNAL or INTERNAL_AND_EXTERNAL to arm or disarm. Every mode works on both the classic and the request-based dashboard
- (@Apollon77) Fixed a home with both INTERNAL/EXTERNAL and ABSENCE/PRESENCE zones reading as disarmed while one of the families was armed
- (@Apollon77) A security journal event that carries no home now reads the configuration at most once every five minutes instead of once per event; some homes raise that event every few minutes

### 3.0.0 (2026-08-24)
- (@Apollon77) **Breaking:** shutterLevel, slatsLevel, dimLevel, primaryShadingLevel, secondaryShadingLevel and minimumFloorHeatingValvePosition now report 0..100 on the channels that declare that range, matching the ioBroker convention and the range the datapoint has always advertised. They previously advertised 0..100 but reported the cloud's 0..1 fraction. Writing is unchanged: a value above 1 is read as a percentage, anything else as a fraction
- (@Apollon77) Fixed arming/disarming the alarm system on the new request-based security dashboard (ABSENCE/PRESENCE security zones)
- (@Apollon77) On the request-based security dashboard a blocked alarm activation is now logged with the devices that prevented it, instead of looking like it succeeded
- (@Apollon77) On the request-based security dashboard a low battery no longer blocks arming; the affected devices are logged as a warning instead
- (@Apollon77) Fixed removed groups and clients being deleted from the wrong internal cache
- (@Apollon77) Fixed particulateNumberConcentrationTen never being filled on the HmIP-SFD, a mistyped state name wrote it to a nonexistent datapoint
- (@Apollon77) Added support for 45 further device channel types with 343 new states, covering the door lock pro, the keypads, the wired Wiegand interface, the watering actuator, the water supply stop, the soil moisture sensor, the universal actuator and dimmer, the wall switch status LEDs, the glass displays and thermostats, and devices bridged through the HCU including their weather, energy and battery readings
- (@Apollon77) Every device now reports its own hardware faults: overheated, overloaded, undervoltage, temperature out of range and the three co-processor states
- (@Apollon77) 3 channel types that carry no value of their own are no longer reported as unknown
- (@Apollon77) All device channel handling now comes from one table instead of 122 hand-written methods, with no change to any object or value
- (@Apollon77) The newly supported channels can now be controlled, not only read: the wall switch status LEDs, the display backlight, the universal dimmer and actuator, the door lock pro, the door opener, the watering actuator, bridged switches and lights, and bridged window coverings
- (@Apollon77) Fixed hue, saturationLevel and colorTemperature on universal lights, which were writable but dispatched to a command that did not exist (HmIP-RGBW)
- (@Apollon77) Fixed inAppWaterAlarmTrigger, which was writable but never sent to the cloud
- (@Apollon77) 18 states that were writable with no command behind them are now read-only, and changeOverDelay no longer throws when written
- (@Apollon77) Fixed the stop and resetEnergyCounter buttons being labelled "on" in the admin UI
- (@Apollon77) Added the remaining commands the HomematicIP cloud offers, 88 endpoints in total, and exposed the ones with a datapoint to attach to
- (@Apollon77) Switching groups can now be switched, and their shutter and slats levels set - the group on/off datapoint never reached the cloud before
- (@Apollon77) New controls: motion detection on and off, pull latch, watering toggle and water volume reset, passage counter reset, favourite shading position, MP3 sound file and volume, light scenes, whole-home cooling and the alarm zone activation delay
- (@Apollon77) Fixed the misspelled setNotificationSoundTyp endpoint, which meant the notification sound was never set
- (@Apollon77) Fixed motionBufferActive, endpositionAutoDetectionEnabled, dim2WarmActive and humanCentricLightActive, which switched the device on or off instead of doing what their name says
- (@Apollon77) Dimming, colour, optical signals and watering can now be given a time: set controlOnTime and/or controlRampTime on the channel and the command ramps instead of jumping. Both default to 0, which keeps the previous behaviour
- (@Apollon77) Fixed the dim level never being scaled for RGB and optical signal commands, where a state object was compared against a number
- (@Apollon77) Corrected the role of 54 writable datapoints, which carried a read-only role and so were not recognised by the ioBroker type detector - dimmers, blinds, switches and timers are now typed as such
- (@Apollon77) Fixed the dim level being sent unscaled by the light scene, hue/saturation and colour temperature commands, so a percentage reached a cloud endpoint that expects a fraction
- (@Apollon77) Fixed a valve with no reported position being published as 0 percent, and one that reports nothing at all as NaN
- (@Apollon77) A level command with a control time is no longer suppressed when the level is unchanged, so "switch on for 30 seconds" works at the level the device already has
- (@Apollon77) Silent alarm can now be set per zone, and each security zone reports its silent, window, motion, presence and sabotage state
- (@Apollon77) Heating profile mode can now be set on hot water and shutter profile groups, and those two group types are now supported
- (@Apollon77) Extended linked switching and notification groups are now supported, including their on time
- (@Apollon77) The home now reports its power meter currency, and its unit price can be set
- (@Apollon77) The security journal is now available (issue #31): the full list as JSON plus the newest entry split into its own datapoints, refreshed when the cloud announces a change and on demand
- (@Apollon77) Automation rules are now visible under `rules.<id>` and simple rules can be enabled, disabled and relabelled - the rule metadata the cloud sends was previously discarded
- (@Apollon77) Fixed vacation mode never working: the temperature was read off a promise instead of the state, the end time was sent under the wrong name, and the temperature datapoint could not be set at all
- (@Apollon77) A websocket the cloud drops silently is now noticed and reconnected, instead of leaving the adapter connected but permanently silent
- (@Apollon77) Fixed the websocket auto-reconnect being disabled for good after the first internal reconnect
- (@Apollon77) A home the cloud sends without functional homes no longer crashes the adapter
- (@Apollon77) Debounced writes no longer outlive the adapter being stopped
- (@Apollon77) Fixed datapoints that an earlier version published as writable still sending their old command after an upgrade, even though they are now read-only - writing a diagnostic datapoint could switch the device
- (@Apollon77) Corrected the role of 25 read-only datapoints that carried a controllable role, and made 2 datapoints readable that were published as neither readable nor writable
- (@Apollon77) A command meant for the channel's groups now reports that the channel belongs to none, instead of failing silently
- (@Apollon77) Fixed locking a door failing when no authorization PIN had been set
- (@Apollon77) On the request-based security dashboard an activation the panel accepts without reporting any detail is now logged as unconfirmed, instead of being reported as armed and possibly carrying a low-battery warning that implied it armed
- (@Apollon77) **Breaking:** valvePosition on a heating thermostat now reports 0..100 with a unit, like the floor terminal block already did - the cloud sends a 0..1 fraction for both and only one of them was scaled. The internal switch channel now reports its valvePosition too
- (@Apollon77) Rain counters now report the millimetres the sensor measured instead of the cloud's accumulated floating point drift, so 0.3 mm no longer arrives as 0.3000000000001819, and all nine of them carry the mm unit
- (@Apollon77) Fixed the device that raised an alarm never being reported: the cloud names it only inside alarmEventDeviceChannel, so alarmEventDeviceId was always empty and the channel datapoint was fed an object it could not hold. Both are filled now, and the device's label is published beside them

### 2.0.0 (2026-08-03)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 8.0.0 now
- (mcm1957) Dependencies have been updated.
- (@GermanBluefox) Migrated to admin 8

### 1.27.0 (2025-03-24)
* (mcm1957) Adapter requires admin 7.6.3, js-controller 6.0.11 and node.js 20 now.
* (@GermanBluefox) GUI was migrated to TypeScript (Admin 7.6)
* (SliX185) Support to control opticalSignalBehaviour for HMIP-BSL has been added.
* (SliX185) Logging of PIN has been removed
* (mcm1957) Dependencies have been updated.

### 1.26.5 (2025-01-27)
* (@Apollon77) Fixed Websocket disconnect cases


[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
The MIT License (MIT)

Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
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
