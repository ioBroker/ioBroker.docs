<p align="center">
  <img src="admin/sureflap.png" />
</p>

# ioBroker.sureflap

![Stable Version](http://iobroker.live/badges/sureflap-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.sureflap.svg)](https://www.npmjs.com/package/iobroker.sureflap)
[![Downloads](https://img.shields.io/npm/dm/iobroker.sureflap.svg)](https://www.npmjs.com/package/iobroker.sureflap)
![Number of Installations (latest)](http://iobroker.live/badges/sureflap-installed.svg)
![Test and Release](https://github.com/Sickboy78/ioBroker.sureflap/workflows/Test%20and%20Release/badge.svg)

[![NPM](https://nodei.co/npm/iobroker.sureflap.png?downloads=true)](https://nodei.co/npm/iobroker.sureflap/)

## Adpater for smart pet devices from Sure Petcare®

<p align="center">
  <img src="/admin/SureFlap_Pet_Door_Connect_Hub_Phone.png" />
</p>
<p align="center">
  <img src="/admin/Sure_Petcare_Surefeed_Feeder_Connect.png" />
  <img src="/admin/Sure_Petcare_Felaqua_Connect.png" />
</p>

## Configuration

Required:
Add username and password from your Sure Petcare® account on the adapter configuration page.

Optional:
Enable or disable JSON event history and configure number of items.
Optional:
Set battery full and empty thresholds when using rechargeable batteries. This affects the battery
percentage values.

## Description

The adapter provides information about the settings and status of your pet flap, cat flap, feeder or water dispenser.

It also shows the location of your pets and their food and water consumption (with feeder and/or water dispenser).

It lets you control the lockmode and curfew of your flap and set the location of your pets.

The adapter requires Node 20 or newer.

### Changeable Values

The following states can be changed and will take effect on your device respectively will be reflected in your Sure
Petcare® app.

| state                                                              | description                                                                          | allowed values                                                                          |
|--------------------------------------------------------------------|--------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| HOUSEHOLD_NAME.HUB_NAME.control.led_mode                           | sets the brightness of the hub leds                                                  | **0** - off<br>**1** - high<br>**4** - dimmed                                           |
| HOUSEHOLD_NAME.HUB_NAME.DEVICE_NAME.control.pets.PET_NAME.assigned | assigns or unassigns the pet to or from the device                                   | **true** or **false**                                                                   |
| HOUSEHOLD_NAME.HUB_NAME.FEEDER_NAME.control.close_delay            | sets the close delay of the feeder lid                                               | **0** - fast<br>**4** - normal<br>**20** - slow                                         |
| HOUSEHOLD_NAME.HUB_NAME.FLAP_NAME.control.curfew_enabled           | enables or disables the configured curfew                                            | **true** or **false**                                                                   |
| HOUSEHOLD_NAME.HUB_NAME.FLAP_NAME.control.current_curfew           | sets the current_curfew,<br>supports 1 (pet flap) or up to 4 (cat flap) curfew times | **[{"enabled":true\|false, "lock_time":"xx:xx", "unlock_time":"xx:xx"}, ...]**          |
| HOUSEHOLD_NAME.HUB_NAME.FLAP_NAME.control.lockmode                 | sets the lockmode                                                                    | **0** - open<br>**1** - lock in<br>**2** - lock out<br>**3** - closed (lock in and out) |
| HOUSEHOLD_NAME.HUB_NAME.FLAP_NAME.control.pets.PET_NAME.type       | sets the pet type for the assigned pet and flap                                      | **2** - outdoor pet<br>**3** - indoor pet                                               |
| HOUSEHOLD_NAME.pets.PET_NAME.inside                                | sets whether your pet is inside                                                      | **true** or **false**                                                                   |

### Structure

The adapter creates the following hierarchical structure:

adapter<br>
├ HOUSEHOLD_NAME<br>
│ ├ HUB_NAME<br>
│ │ ├ online<br>
│ │ ├ serial_number<br>
│ │ ├ signal<br>
│ │ │ ├ device_rssi<br>
│ │ │ └ hub_rssi<br>
│ │ ├ version<br>
│ │ │ ├ firmware<br>
│ │ │ └ hardware<br>
│ │ ├ control<br>
│ │ │ └ led_mode<br>
│ │ ├ FELAQUA_NAME<br>
│ │ │ ├ battery<br>
│ │ │ ├ battery_percentage<br>
│ │ │ ├ online<br>
│ │ │ ├ serial_number<br>
│ │ │ ├ signal<br>
│ │ │ │ ├ device_rssi<br>
│ │ │ │ └ hub_rssi<br>
│ │ │ ├ version<br>
│ │ │ │ ├ firmware<br>
│ │ │ │ └ hardware<br>
│ │ │ ├ water<br>
│ │ │ │ ├ fill_percent<br>
│ │ │ │ ├ last_filled_at<br>
│ │ │ │ └ weight<br>
│ │ │ └ control<br>
│ │ │ &nbsp;&nbsp;&nbsp; └ pets<br>
│ │ │ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; └ PET_NAME<br>
│ │ │ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; └ assigned<br>
│ │ ├ FEEDER_NAME<br>
│ │ │ ├ battery<br>
│ │ │ ├ battery_percentage<br>
│ │ │ ├ online<br>
│ │ │ ├ serial_number<br>
│ │ │ ├ signal<br>
│ │ │ │ ├ device_rssi<br>
│ │ │ │ └ hub_rssi<br>
│ │ │ ├ version<br>
│ │ │ │ ├ firmware<br>
│ │ │ │ └ hardware<br>
│ │ │ ├ bowls<br>
│ │ │ │ └ 0..1<br>
│ │ │ │ &nbsp;&nbsp;&nbsp; ├ fill_percent<br>
│ │ │ │ &nbsp;&nbsp;&nbsp; ├ food_type<br>
│ │ │ │ &nbsp;&nbsp;&nbsp; ├ last_filled_at<br>
│ │ │ │ &nbsp;&nbsp;&nbsp; ├ Last_zeroed_at<br>
│ │ │ │ &nbsp;&nbsp;&nbsp; ├ target<br>
│ │ │ │ &nbsp;&nbsp;&nbsp; └ weight<br>
│ │ │ └ control<br>
│ │ │ &nbsp;&nbsp;&nbsp; ├ pets<br>
│ │ │ &nbsp;&nbsp;&nbsp; │ └ PET_NAME<br>
│ │ │ &nbsp;&nbsp;&nbsp; │ &nbsp;&nbsp;&nbsp; └ assigned<br>
│ │ │ &nbsp;&nbsp;&nbsp; └ close_delay<br>
│ │ └ FLAP_NAME<br>
│ │ &nbsp;&nbsp;&nbsp; ├ battery<br>
│ │ &nbsp;&nbsp;&nbsp; ├ battery_percentage<br>
│ │ &nbsp;&nbsp;&nbsp; ├ curfew_active<br>
│ │ &nbsp;&nbsp;&nbsp; ├ last_enabled_curfew<br>
│ │ &nbsp;&nbsp;&nbsp; ├ online<br>
│ │ &nbsp;&nbsp;&nbsp; ├ serial_number<br>
│ │ &nbsp;&nbsp;&nbsp; ├ control<br>
│ │ &nbsp;&nbsp;&nbsp; │ ├ pets<br>
│ │ &nbsp;&nbsp;&nbsp; │ │ └ PET_NAME<br>
│ │ &nbsp;&nbsp;&nbsp; │ │ &nbsp;&nbsp;&nbsp; ├ assigned<br>
│ │ &nbsp;&nbsp;&nbsp; │ │ &nbsp;&nbsp;&nbsp; └ type<br>
│ │ &nbsp;&nbsp;&nbsp; │ ├ curfew_enabled<br>
│ │ &nbsp;&nbsp;&nbsp; │ ├ current_curfew<br>
│ │ &nbsp;&nbsp;&nbsp; │ └ lockmode<br>
│ │ &nbsp;&nbsp;&nbsp; ├ signal<br>
│ │ &nbsp;&nbsp;&nbsp; │ ├ device_rssi<br>
│ │ &nbsp;&nbsp;&nbsp; │ └ hub_rssi<br>
│ │ &nbsp;&nbsp;&nbsp; └ version<br>
│ │ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ├ firmware<br>
│ │ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; └ hardware<br>
│ ├ history<br>
│ │ └ json<br>
│ │ &nbsp;&nbsp;&nbsp; └ 0..24<br>
│ └ pets<br>
│ &nbsp;&nbsp;&nbsp; └ PET_NAME<br>
│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ├ inside<br>
│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ├ name<br>
│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ├ since<br>
│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ├ food<br>
│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; │ ├ last_time_eaten<br>
│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; │ ├ time_spent<br>
│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; │ ├ times_eaten<br>
│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; │ └ dry..wet<br>
│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; │ &nbsp;&nbsp;&nbsp; └ weight<br>
│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ├ movement<br>
│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; │ ├ last_direction<br>
│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; │ ├ last_flap<br>
│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; │ ├ last_flap_id<br>
│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; │ ├ last_time<br>
│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; │ ├ time_spent_outside_<br>
│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; │ └ times_outside<br>
│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; └ water<br>
│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ├ last_time_drunk<br>
│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ├ time_spent<br>
│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ├ times_drunk<br>
│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; └ weight<br>
└ info<br>
&nbsp;&nbsp;&nbsp; ├ all_devices_online<br>
&nbsp;&nbsp;&nbsp; ├ connection<br>
&nbsp;&nbsp;&nbsp; ├ last_update<br>
&nbsp;&nbsp;&nbsp; ├ offline_devices<br>
&nbsp;&nbsp;&nbsp; └ version<br>

## Notes

SureFlap®, Sure Petcare® and Felaqua® are registered trademarks of [SureFlap Ltd.](https://www.surepetcare.com/)

The pictures of the SureFlap® devices are provided free to use
from [Sure Petcare®](https://www.surepetcare.com/en-us/press).

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

* (Sickboy78) reduce log messages

### 3.4.3 (2026-08-29)

* (Sickboy78) dependency updates
* (copilot) Adapter requires node.js >= 22 now
* (Sickboy78) code refactoring
* (Sickboy78) added unit tests

### 3.4.2 (2026-01-09)

* (Sickboy78) dependency updates
* (Sickboy78) add AlCalzone's Release Script

### 3.4.1 (2025-10-22)

* (Sickboy78) dependency updates
* (Sickboy78) migration to npm trusted publishing

### 3.4.0 (2025-08-11)

* (Sickboy78) removed deprecated util.promisify

### 3.3.0 (2025-07-13)

* (Sickboy78) added translations for unknown pet setting

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

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

Copyright (c) 2025-2026 Sickboy78 <asmoday_666@gmx.de>