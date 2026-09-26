![Logo](admin/anthbot.png)

# ioBroker.anthbot

[![NPM version](https://img.shields.io/npm/v/iobroker.anthbot.svg)](https://www.npmjs.com/package/iobroker.anthbot)
[![Downloads](https://img.shields.io/npm/dm/iobroker.anthbot.svg)](https://www.npmjs.com/package/iobroker.anthbot)
![Number of Installations](https://iobroker.live/badges/anthbot-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/anthbot-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.anthbot.png?downloads=true)](https://nodei.co/npm/iobroker.anthbot/)

**Tests:** ![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.anthbot/workflows/Test%20and%20Release/badge.svg)

## Anthbot adapter for ioBroker

Connect with [Anthbot](https://anthbot.com/) devices such as their robot mowers.

Tested with M9 and Genie models, but other series may work. Feel free to open an issue to report problems or with feature requests.

After installation visit the instance settings page to add credentials for access to Anthbot cloud. The adapter will monitor & control all bound devices it discovers on the account. There are several other configuration options here but default values should work well.

The adapter can attempt to improve on the scheduling of the Anthbot app. By default nothing will happen but this feature can be enabled by setting scheduling states under `map.custom_areas...` after starting the adapter (see below).

### Global monitoring

Under device `status` folder:

Battery level is reported in the `elec` state.

View a device's status in the `mode` state (charging, mowing, standby, etc).

The last status message & it's severity (event, error, etc) are shown in the `last_code`, `last_code_text` and `last_code_type` states. For users looking for more history, the `code_list` state holds a JSON array with the a larger number of messages.

The rest of the states in this folder should be self explanatory.

Under device `iob_schedule` folder:

Self explanatory, but be aware this is the status of the adapter's scheduling, _not_ schedules defined in the Anthbot app.

### Global commands

Under the `command` folder:

`stop_all_tasks` equates to hiting 'Stop' in the Anthbot app.

`charge_start` equates to the 'Recharge' icon in the Anthbot app.

`mow_start` equates to start when in 'Full maps' mode.

`custom_area_mow_start` equates to custom area (aka 'Zones') mode. For this to work a valid list of area IDs must already be set in the `area_list` state. Area IDs are not the same as names the Anthbot app shows. Valid area IDs can be found as channel IDs under the `map.custom_areas...` folder. A channel ID exists for each area, see below for details of states within.

Ie. to start mowing one or more zones:

- Set the `area_list` state to an array of IDs. Eg: `[102, 117]`
- Trigger the `custom_area_mow_start` state.

The adapter will attempt to determine when zone mowing is in progress and make a note in the relevant `map.custom_areas...` channel of start and finish times to understand how often zones are being cut.

`ridable_mow_start` equates to edge mowing mode. As with `custom_area_mow_start`, set the `area_list` with a valid list of ridable areas (aka. edge) IDs. Valid ridable area IDs can be found in the `map.ridable_areas.raw` state.

### Custom Area (aka. zone) monitoring & control

Under each `map.custom_areas...` channel:

#### Monitoring

`last_start`, `last_finish`, `estimated_elapsed_time` & `estimated_elec` are provided to help scheduling. These states are set when mowing tasks involving the relevant custom area start and finish.

Note that `estimated_elapsed_time` & `estimated_elec` can only be calculated when a task with a single custom area is completeled. If a task involving multiple areas is started they will all get the same start & finish time and no estimate of elapsed time will be made.

#### Commands

`custom_area_mow_start` button can be used as a shortcut to trigger mowing of just this single area.

`mow_head_random` switch, when enabled, randomises the `mow_head` (aka. cutting angle) for this area. It is randomised each time this switch is turned on, and each time a mowing task for this area is finished successfully.

`mow_head_alts` is an array of alternate `mow_head` angles to cycle through each time a mowing task for this area is finished successfully. When the list is set, if the current `mow_head` for this area is not in the list, it will be set to the first entry. To disable this feature set a blank array (`[]`) or empty string.

Note that `mow_head_random` takes priority over `mow_head_alts`.

#### Scheduling

`schedule_enabled` is used to activate ioBroker initiated mowing of this area. While this _should_ work in conjunction with the Anthbot schedule maybe it is best to delete or disable all Anthbot schedules prior to using this feature.

Note that in order to enable scheduled mowing of an area:

- `schedule_enabled` must be turned on
- `schedule_days_since_last` & `schedule_priority` must both be set with valid numbers
- the area must have a valid `last_finish` state

In order to achieve the last point it is is best to manually start or schedule 'Zone Mowing' in the Anthbot app and let that task complete while this adapter is running.

`schedule_days_since_last` is used to determine when each area needs mowing. The number of days to wait between mowing. Zero indicates cut every day.

`schedule_priority` comes into play when multiple areas need mowing: lowest number (must be 1 or greater) is handled first. When two areas with the same priority both need mowing the order is undefined.

### Map & area (aka. zone) editing

With `area_set` it is possible to edit one or more areas. Take the JSON representation from a desired entry from the `map.custom_areas.raw_list`, modify it as required and save this the `area_set` state as a JSON array.

Note that when using `area_set` it is not necessary to define all parameters and only those provided will be changed. Eg: `[{"mow_head":10,"id":117}]` will change the angle of mowing in area 117 to 10 degrees and leave the other parameters as is.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.2.1 (2026-09-23)

- (raintonr) Sanitise configured intervals at startup (#63)

### 0.2.0 (2026-08-04)

- (raintonr) Few general code clean-ups
- (raintonr) Some constants are now configurable
- (raintonr) Schedule 'impossible to mow in a day' custom areas when several days overdue

### 0.1.2 (2026-07-16)

- (raintonr) Added device WiFi & 4G status

### 0.1.1 (2026-07-05)

- (raintonr) Clean up sanitized (sic) IDs in favour of warning & ignoring
- (raintonr) Clean up redacted logging of API traffic
- (raintonr) Clean up polling timer & add status.last_poll

### 0.1.0 (2026-07-03)

- (mcm1957) BREAKING: object ids are now sanitized. This might result in changed object-ids.
- (mcm1957) Translations have been corrected.
- (mcm1957) Loggings has been adapted to avoid logging secrets.

## License

MIT License

Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2026 Robin Rainton <robin@rainton.com>

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