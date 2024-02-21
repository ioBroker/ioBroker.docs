[![Logo](admin/rct.png)](https://www.rct-power.com/de)

# ioBroker.rct

[![NPM version](https://img.shields.io/npm/v/iobroker.rct.svg)](https://www.npmjs.com/package/iobroker.rct)
[![Downloads](https://img.shields.io/npm/dm/iobroker.rct.svg)](https://www.npmjs.com/package/iobroker.rct)
![Number of Installations (latest)](https://iobroker.live/badges/rct-installed.svg)
![Number of Installations (stable)](https://iobroker.live/badges/rct-stable.svg)

[![Libraries.io dependency status for GitHub repo](https://img.shields.io/librariesio/release/npm/ioBroker.rct)](https://img.shields.io/librariesio/release/npm/ioBroker.rct)

[![NPM](https://nodei.co/npm/iobroker.rct.png?downloads=true)](https://nodei.co/npm/iobroker.rct/)

**Tests:** ![Test and Release](https://github.com/aruttkamp/ioBroker.rct/workflows/Test%20and%20Release/badge.svg)

## Owner Change

After lauff switched to Home Assistant - project will continued by aruttkamp


## RCT adapter for ioBroker

Please note that this is a private project and that I (Andreas Ruttkamp) am not related to RCT in any way.

Read values of a RCT Power photovoltaics power converter.

## REMARKS

### Productive release

This productive release has proven stable.

By using the "RCT Elements" field, one may select which data shall be read from the power converter.
If nothing is entered here, default will be used:

"battery.bat_status,battery.soc,battery.soc_target,battery.soc_target_high,battery.soc_target_low,dc_conv.dc_conv_struct[0].p_dc_lp,dc_conv.dc_conv_struct[1].p_dc_lp,fault[0].flt,fault[1].flt,fault[2].flt,fault[3].flt,g_sync.p_ac_grid_sum_lp,g_sync.p_ac_load_sum_lp,g_sync.p_ac_sum_lp,g_sync.p_acc_lp,g_sync.u_sg_avg[0],g_sync.u_sg_avg[1],io_board.s0_external_power,power_mng.is_heiphoss,power_mng.state,power_mng.use_grid_power_enable,power_mng.u_acc_mix_lp,prim_sm.island_flag"

Other elements can be found in the code (file "rct/rc_core2.js"). Since this is not self descriptive, use at own risk!

The object "battery.bat_status" indicates the status of a connected battery:
* 0 -> charge/discharge (normal operation)
* 8 -> charge (calibration)
* 1024 -> discharge (calibration)
* 2048 -> balancing

## Known Issues

### Wrong Channels / States

A new version might not be able to create the right ioBroker channels / states. In most cases this can be recognized by the node "battery" showing up as a single element instead of a folder.

If this happens, stop the adapter and manually delete the node "rct.0".

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 1.2.4 (2024-02-09)
* (Andreas Ruttkamp) adapter not running in 1.2.3 - fixed

### 1.2.3 (2024-02-09)
* (Andreas Ruttkamp) prim_sm.state added
* (Andreas Ruttkamp) states for battery added
* (Andreas Ruttkamp) output of data points power_mng.soc_min and soc_min_island corrected

### 1.2.2 (2023-09-13)
* (Andreas Ruttkamp) data type for power_mng.bat_next_calib_date corrected
* (Andreas Ruttkamp) data type for battery.stack_cycles[x] corrected

### 1.2.1 (2023-09-13)
* (Andreas Ruttkamp) configured rct elements will now be used correctly ( in 1.2.0 only power_mng.bat_next_calib_date was read)

### 1.2.0 (2023-09-11)
* (Andreas Ruttkamp) connection state corrected when adapter is stopped
* (Andreas Ruttkamp) dependancies updated

### 1.1.7 (2023-08-30)
* (Andreas Ruttkamp) connection state corrected

### 1.1.6 (2023-08-23)
* (Andreas Ruttkamp) rct_core.js deleted (now rct_core2 is used)
* (Andreas Ruttkamp) parameters in default setting deleted 
* (Andreas Ruttkamp) min. Node 18

### 1.1.5 (2023-08-18)
* (Andreas Ruttkamp) Fix: crash reading UInt8 corrected
* (Andreas Ruttkamp) some cleaning actions

### 1.1.4 (2023-08-18)
* (Andreas Ruttkamp) Fix: proofments corrected.

### 1.1.3 (2023-08-18)
* (Andreas Ruttkamp) Fix: more data checks implemented

### 1.1.2 (2023-08-17)
* (Andreas Ruttkamp) Fix: adapter crashes

### 1.1.1 (2023-08-17)
* (Andreas Ruttkamp) data for g_sync.p_ac_load[0-2] / dc_conv.dc_conv_struct[0-1].u_sg_lp added
* (Andreas Ruttkamp) more parameters added 
* (Andreas Ruttkamp) date conversions fixed
* (Andreas Ruttkamp) conversions of percentages fixed
* (Andreas Ruttkamp) instance crash if data failure fixed

### 1.0.5 (2023-07-29)
* (Andreas Ruttkamp) some internal work
* (Andreas Ruttkamp) preparation for new admin
* (Andreas Ruttkamp) dependecies update

### 1.0.4 (2023-04-24)
* (Andreas Ruttkamp) Release Script added and update dev-components
* (Andreas Ruttkamp) Preparation of new backend

### 1.0.3 (2023-03-30)
* (Andreas Ruttkamp) Release Script added and update dev-components

### 1.0.1
* (Markus Lauff) fixing review comments - thanks to Apollon77

### 1.0.0
* (Markus Lauff) 0.0.6 version proved stable and fulfilling minimal functional requirements, so releasing it as version 1.0.0 for productive usage

### 0.0.6
* (Markus Lauff) adding further channels/states, major stability improvements

### 0.0.5
* (Markus Lauff) some fixes / minor improvements

### 0.0.1
* (Markus Lauff) initially bare minimum working release

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

Copyright (c) 2024 Andreas Ruttkamp <ioBroker.rct@ruttkamp.com>
