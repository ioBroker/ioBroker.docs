![Logo](admin/rct.png)
# ioBroker.rct

[![NPM version](https://img.shields.io/npm/v/iobroker.rct.svg)](https://www.npmjs.com/package/iobroker.rct)
[![Downloads](https://img.shields.io/npm/dm/iobroker.rct.svg)](https://www.npmjs.com/package/iobroker.rct)
![Number of Installations (latest)](https://iobroker.live/badges/rct-installed.svg)
![Number of Installations (stable)](https://iobroker.live/badges/rct-stable.svg)

[![Dependency Status](https://img.shields.io/david/aruttkamp/iobroker.rct.svg)](https://david-dm.org/aruttkamp/iobroker.rct)

[![NPM](https://nodei.co/npm/iobroker.rct.png?downloads=true)](https://nodei.co/npm/iobroker.rct/)

**Tests:** ![Test and Release](https://github.com/aruttkamp/ioBroker.rct/workflows/Test%20and%20Release/badge.svg)

## Owner Change

After lauff switched to Home Assistant - project will continued by aruttkamp


## RCT adapter for ioBroker

Please note that this is a private project and that I (Andreas Ruttkamp) am not related to RCT in any way.

Show values of a RCT Power photovolatics power converter

## REMARKS

### Initial productive release

This is an initial productive release after the previous version has proven stable and fulfilling the minimal viable scope.

Configuration is still limited and rather technical. Using the "RCT ELemente" it can be selected which data shall be read from the power converter. Default is "battery.bat_status,battery.soc,battery.soc_target,battery.soc_target_high,battery.soc_target_low,dc_conv.dc_conv_struct[0].enabled,dc_conv.dc_conv_struct[0].p_dc_lp,dc_conv.dc_conv_struct[1].enabled,dc_conv.dc_conv_struct[1].p_dc_lp,fault[0].flt,fault[1].flt,fault[2].flt,fault[3].flt,g_sync.p_ac_grid_sum_lp,g_sync.p_ac_load_sum_lp,g_sync.p_ac_sum_lp,g_sync.p_acc_lp,g_sync.u_sg_avg[0],g_sync.u_sg_avg[1],io_board.s0_external_power,power_mng.battery_type,power_mng.is_grid,power_mng.is_heiphoss,power_mng.state,power_mng.use_grid_power_enable,power_mng.u_acc_mix_lp,prim_sm.island_flag,prim_sm.state". Other elements can be found in the code (file "rct/rc_core.js"). But this is not self descriptive at all (even not really tested).

## Known Issues

### Wrong Channels / States

A new version might not be able to create the right ioBroker channels / states. In most cases this can be recognized by the node "battery" showing up as a single element instead of a folder.

If this happens, stop the adapter and manually delete the node "rct.0".

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (Andreas Ruttkamp) interne Arbeiten
* (Andreas Ruttkamp) Umgebung für Neuen Admin aktualisiert


### 1.0.4 (2023-04-24)
* (Andreas Ruttkamp) Release Script added and update dev-components
* (Andreas Ruttkamp) Vorbereitung neues Backend

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

Copyright (c) 2023 Andreas Ruttkamp <ioBroker.rct@ruttkamp.com>
