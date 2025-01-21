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

The adapter requires Node 18 or newer.

### Changeable Values

The following states can be changed and will take effect on your device respectively will be reflected in your Sure
Petcare® app.

| state                                                                 | description                                                                          | allowed values                                                                          |
|-----------------------------------------------------------------------|--------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| household_name.hub_name.control.led_mode                              | sets the brightness of the hub leds                                                  | **0** - off<br>**1** - high<br>**4** - dimmed                                           |
| household_name.hub_name.flap_name.control.curfew_enabled              | enables or disables the configured curfew                                            | **true** or **false**                                                                   |
| household_name.hub_name.flap_name.control.current_curfew              | sets the current_curfew,<br>supports 1 (pet flap) or up to 4 (cat flap) curfew times | **[{"enabled":true\|false, "lock_time":"xx:xx", "unlock_time":"xx:xx"}, ...]**          |
| household_name.hub_name.flap_name.control.lockmode                    | sets the lockmode                                                                    | **0** - open<br>**1** - lock in<br>**2** - lock out<br>**3** - closed (lock in and out) |
| household_name.hub_name.flap_name.assigned_pets.pet_name.control.type | sets the pet type for the assigned pet and flap                                      | **2** - outdoor pet<br>**3** - indoor pet                                               |
| household_name.hub_name.feeder_name.control.close_delay               | sets the close delay of the feeder lid                                               | **0** - fast<br>**4** - normal<br>**20** - slow                                         |
| household_name.pets.pet_name.inside                                   | sets whether your pet is inside                                                      | **true** or **false**                                                                   |

### Structure

The adapter creates the following hierarchical structure:

adapter<br>
├ household_name<br>
│ ├ hub_name<br>
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
│ │ ├ felaqua_name<br>
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
│ │ │ ├ assigned_pets<br>
│ │ │ │ └ pet_name<br>
│ │ │ └ water<br>
│ │ │ &nbsp;&nbsp;&nbsp; ├ fill_percent<br>
│ │ │ &nbsp;&nbsp;&nbsp; ├ last_filled_at<br>
│ │ │ &nbsp;&nbsp;&nbsp; └ weight<br>
│ │ ├ feeder_name<br>
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
│ │ │ ├ assigned_pets<br>
│ │ │ │ └ pet_name<br>
│ │ │ ├ bowls<br>
│ │ │ │ └ 0..1<br>
│ │ │ │ &nbsp;&nbsp;&nbsp; ├ fill_percent<br>
│ │ │ │ &nbsp;&nbsp;&nbsp; ├ food_type<br>
│ │ │ │ &nbsp;&nbsp;&nbsp; ├ last_filled_at<br>
│ │ │ │ &nbsp;&nbsp;&nbsp; ├ Last_zeroed_at<br>
│ │ │ │ &nbsp;&nbsp;&nbsp; ├ target<br>
│ │ │ │ &nbsp;&nbsp;&nbsp; └ weight<br>
│ │ │ └ control<br>
│ │ │ &nbsp;&nbsp;&nbsp; └ close_delay<br>
│ │ └ flap_name<br>
│ │ &nbsp;&nbsp;&nbsp; ├ battery<br>
│ │ &nbsp;&nbsp;&nbsp; ├ battery_percentage<br>
│ │ &nbsp;&nbsp;&nbsp; ├ curfew_active<br>
│ │ &nbsp;&nbsp;&nbsp; ├ last_enabled_curfew<br>
│ │ &nbsp;&nbsp;&nbsp; ├ online<br>
│ │ &nbsp;&nbsp;&nbsp; ├ serial_number<br>
│ │ &nbsp;&nbsp;&nbsp; ├ control<br>
│ │ &nbsp;&nbsp;&nbsp; │ ├ curfew_enabled<br>
│ │ &nbsp;&nbsp;&nbsp; │ ├ current_curfew<br>
│ │ &nbsp;&nbsp;&nbsp; │ └ lockmode<br>
│ │ &nbsp;&nbsp;&nbsp; ├ signal<br>
│ │ &nbsp;&nbsp;&nbsp; │ ├ device_rssi<br>
│ │ &nbsp;&nbsp;&nbsp; │ └ hub_rssi<br>
│ │ &nbsp;&nbsp;&nbsp; ├ version<br>
│ │ &nbsp;&nbsp;&nbsp; │ ├ firmware<br>
│ │ &nbsp;&nbsp;&nbsp; │ └ hardware<br>
│ │ &nbsp;&nbsp;&nbsp; └ assigned_pets<br>
│ │ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; └ pet_name<br>
│ │ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; └ control<br>
│ │ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; └ type<br>
│ ├ history<br>
│ │ └ json<br>
│ │ &nbsp;&nbsp;&nbsp; └ 0..24<br>
│ └ pets<br>
│ &nbsp;&nbsp;&nbsp; └ pet_name<br>
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

### 3.0.0 (work in progress)

* (Sickboy78) complete refactoring of surepet API
* (Sickboy78) complete refactoring of internal data structure
* (Sickboy78) added list of offline devices
* (Sickboy78) switched to jsonConfig
* (Sickboy78) dependency updates

### 2.3.3 (2024-12-30)

* (Sickboy78) fixed a bug when feeder does not have bowls data

### 2.3.2 (2024-12-07)

* (Sickboy78) quick fix for surepet API changes
* (Sickboy78) dependency updates

### 2.3.1 (2024-10-18)

* (Sickboy78) improved responsive design for admin page
* (Sickboy78) added nodejs 22 to test matrix
* (Sickboy78) dependency updates

### 2.3.0 (2024-09-14)

* (Sickboy78) improved handling of missing, invalid or incomplete data from API
* (Sickboy78) improved error handling for pets
* (Sickboy78) fixed no battery data error
* (Sickboy78) dependency updates

### 2.2.1 (2024-08-11)

* (Sickboy78) added new data to feeder
* (Sickboy78) added new data to water dispenser
* (Sickboy78) dependency updates

### 2.2.0 (2024-07-25)

* (Sickboy78) added new json curfew
* (Sickboy78) added new json history
* (Sickboy78) fix lock mode is undefined
* (Sickboy78) code cleanup and refactoring
* (Sickboy78) dependency updates

### 2.1.2 (2024-06-02)

* (Sickboy78) dependency updates

### 2.1.1 (2024-02-25)

* (Sickboy78) bugfix for outside times not beeing shown

### 2.1.0 (2024-02-20)

* (Scrounger) option to enable history data
* (Sickboy78) added number of history entries to configuration

### 2.0.2 (2024-02-17)

* (Sickboy78) added flap id to last movement
* (Sickboy78) fixed a bug where hub was recognized as obsolete device because of same name as a device
* (Sickboy78) fixed a bug where setting lockmode or curfew was not working because of flap having same name as the hub

### 2.0.1 (2024-01-24)

* (Sickboy78) added last movement for pets
* (Sickboy78) added time spent outside today for pets
* (Sickboy78) dependency updates

### 1.2.3 (2023-12-29)

* (Sickboy78) added api host to config and set default to new api
* (Sickboy78) improved removing of obsolete objects

### 1.2.2 (2023-10-17)

* (Sickboy78) added signal strength and hardware and firmware version of devices

### 1.2.1 (2023-10-03)

* (Sickboy78) fixed get_history_since call failing because of API changes
* (Sickboy78) added workaround for removed parent object because of API changes
* (Sickboy78) removed wrongly created objects because of API changes

### 1.2.0 (2023-08-19)

* (Sickboy78) repetitive errors are now logged as debug to avoid spamming the error log
* (Sickboy78) increased timeout for surepet API from 60 to 120 seconds
* (Sickboy78) added removal of deleted or renamed pets
* (Sickboy78) security updates

### 1.1.9 (2023-07-21)

* (Sickboy78) fixed undefined serial number
* (Sickboy78) dependency updates

### 1.1.8 (2023-06-01)

* (Sickboy78) adjustments for Surepet API changes

### 1.1.7 (2023-03-13)

* (Sickboy78) fixed false login error in case pet had no photo

### 1.1.6 (2023-01-07)

* (Sickboy78) added battery voltage configuration
* (Sickboy78) added translation for adapter settings
* (Sickboy78) security updates

### 1.1.5 (2022-09-10)

* (Sickboy78) added display of serial numbers

### 1.1.4 (2022-09-07)

* (Sickboy78) added Felaqua support
* (Sickboy78) improved battery and battery percentage indicator (reduced outliers)

### 1.1.3 (2022-03-28)

* (Sickboy78) code improvements
* (Sickboy78) improved error handling if no pet has been assigned yet

### 1.1.2 (2022-03-06)

* (Sickboy78) improved error and timeout handling
* (Sickboy78) optimized subscribed states

### 1.1.1 (2022-02-20)

* (Sickboy78) removed pet type control from pet flap (is a cat flap exclusive feature)
* (Sickboy78) fixed wrong default value for info.last_update
* (Sickboy78) testing updates for js-controller 4
* (Sickboy78) security updates

### 1.1.0 (2022-01-17)

* (Sickboy78) bugfix and security updates

### 1.0.9 (2022-01-05)

* (Sickboy78) removed old encrypt/decrypt from index_m
* (Sickboy78) added adapter unloaded guard in case unload happens during data requests

### 1.0.8 (2021-11-22)

* (Sickboy78) added food type, target weight and remaining food in feeder
* (Sickboy78) added todays pet food consumption, times eaten and time spent

### 1.0.7 (2021-11-02)

* (Sickboy78) added history
* (Sickboy78) added last update time

### 1.0.6 (2021-09-12)

* (Sickboy78) added feeder support (closing delay of lid)
* (Sickboy78) added led control for hub
* (Sickboy78) added assigned pets for flap and feeder devices
* (Sickboy78) added pet type control (indoor or outdoor) for assigned pets for flap devices
* (Apollon77) update CI testing

### 1.0.5 (2021-04-25)

* (Sickboy78) fixed bug in case pets didn't have a position (e.g. no flaps, only feeder in use)

### 1.0.4 (2021-03-07)

* (Sickboy78) added state curfew_active for pet flap devices
* (Sickboy78) fixed normalization of device names
* (Sickboy78) fixed changeable values not resetting when change fails

### 1.0.3 (2021-02-28)

* (Sickboy78) code improvements from review
* (Sickboy78) fixed timezone bug

### 1.0.2 (2021-02-25)

* (Sickboy78) fixed bug setting lockmode and inside values

### 1.0.1 (2021-02-19)

* (Sickboy78) initial release

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

Copyright (c) 2024 Sickboy78 <asmoday_666@gmx.de>