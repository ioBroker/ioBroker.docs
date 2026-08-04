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

### 1.26.4 (2025-01-03)
* (@Apollon77) Optimized Websocket disconnect cases

### 1.26.3 (2024-12-29)
* (@GermanBluefox) Updated packages

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
