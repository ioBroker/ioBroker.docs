[![Logo](admin/rct.png)](https://www.rct-power.com/de)

# ioBroker.rct

[![NPM version](https://img.shields.io/npm/v/iobroker.rct.svg)](https://www.npmjs.com/package/iobroker.rct)
[![Downloads](https://img.shields.io/npm/dm/iobroker.rct?label=npm%20downloads&style=flat-square)](https://www.npmjs.com/package/iobroker.rct)
![node-lts](https://img.shields.io/node/v-lts/iobroker.rct?style=flat-square)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/iobroker.rct?label=npm%20dependencies&style=flat-square)

![GitHub](https://img.shields.io/github/license/aruttkamp/iobroker.rct?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/aruttkamp/iobroker.rct?logo=github&style=flat-square)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/aruttkamp/iobroker.rct?logo=github&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/aruttkamp/iobroker.rct?logo=github&style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/aruttkamp/iobroker.rct?logo=github&style=flat-square)

## Versions

![Stable](http://iobroker.live/badges/rct-stable.svg)
![Installed](https://iobroker.live/badges/rct-installed.svg)

[![NPM](https://nodei.co/npm/iobroker.rct.png?downloads=true)](https://nodei.co/npm/iobroker.rct/)

## RCT adapter for ioBroker

Please note that this is a private project and that I (Andreas Ruttkamp) am not related to RCT in any way.
Read values of a RCT Power photovoltaics power converter.

## REMARKS

**IMPORTANT:
The RCT Inverter cannot distinguish between different clients asking for data.**
Opening the "RCT Power App" on a smartphone / tablet or running other adapters sending queries to the inverter (like EVCC), always leads to the adapter receiving unrequested data (visible in debug mode).
This data will be discarded and only requested data will be handled.

By using the "RCT Elements" field, one may select which data shall be read from the power converter.
If nothing is entered here, default will be used:

"battery.bat_status,battery.soc,battery.soc_target,battery.soc_target_high,battery.soc_target_low,dc_conv.dc_conv_struct[0].p_dc_lp,dc_conv.dc_conv_struct[1].p_dc_lp,fault[0].flt,fault[1].flt,fault[2].flt,fault[3].flt,g_sync.p_ac_grid_sum_lp,g_sync.p_ac_load_sum_lp,g_sync.p_ac_sum_lp,g_sync.p_acc_lp,g_sync.u_sg_avg[0],g_sync.u_sg_avg[1],io_board.s0_external_power,power_mng.is_heiphoss,power_mng.state,power_mng.u_acc_mix_lp,prim_sm.island_flag"

Other elements can be found in the code (file "rct/rc_core2.js"). Since this is not self descriptive, use at own risk!

The object "battery.bat_status" indicates the status of a connected battery:
* 0 -> charge/discharge (normal operation)
* 1 -> idle (no CAN-connection inverter -> battery)
* 3 -> connecting (inverter -> battery)
* 5 -> synchronizing (inverter -> battery)
* 8 -> calibrating - charging phase (0% --> 100%)
* 1024 -> calibrating - discharge phase (xx% --> 0%)
* 2048 -> balancing
	
The object "prim_sm.state" indicates the status of the inverter
*	0 -> 'Standby'
*	1 -> 'Initialization'
*	2 -> 'Standby'
*	3 -> 'Efficiency (debug state for development purposes)'
*	4 -> 'Insulation check'
*	5 -> 'Island check (decision where to go - grid connected or island)'
*	6 -> 'Power check (decision if enougth energy to start or not)'
*	7 -> 'Symmetry (DC-link alignment)'
*	8 -> 'Relays test'
*	9 -> 'Grid passive (inverter get power from grid without bridge clocking)'
*	10 -> 'Prepare battery passive'
*	11 -> 'Battery passive (off-grid)'
*	12 -> 'Hardware test'
*	13 -> 'Grid feeding'

## Known Issues

None

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 1.2.28 (2026-06-18)
Improve Logging Consistency and Debug Handling
#320

### 1.2.27 (2026-05-19)
- (copilot) Adapter requires node.js >= 22 now
- (Andreas Ruttkamp) dependencies updated
- (Andreas Ruttkamp) minimum version for admin now 7.6.20

### 1.2.26 (2026-02-22)
* (Andreas Ruttkamp) correct handling for parameter without "." ( grid_offset / android_description ) [#262](https://github.com/aruttkamp/ioBroker.rct/issues/262)

### 1.2.25 (2025-10-16)
* (Andreas Ruttkamp) repro checker issues resolved
* (Andreas Ruttkamp) npm trusted publishing integrated

### 1.2.24 (2025-09-01)
* (Andreas Ruttkamp) dev dependencies updated
* (Andreas Ruttkamp) minimum version for admin now 7.6.17
* (Andreas Ruttkamp) minimum version for js controller now 6.0.11

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Copyright (c) 2025-2026 Andreas Ruttkamp ioBroker.rct@ruttkamp.com
