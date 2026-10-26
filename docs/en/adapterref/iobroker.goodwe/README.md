![Logo](admin/goodwe.png)
# ioBroker.goodwe

[![NPM version](https://img.shields.io/npm/v/iobroker.goodwe.svg)](https://www.npmjs.com/package/iobroker.goodwe)
[![Downloads](https://img.shields.io/npm/dm/iobroker.goodwe.svg)](https://www.npmjs.com/package/iobroker.goodwe)
![Number of Installations](https://iobroker.live/badges/goodwe-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/goodwe-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.goodwe.png?downloads=true)](https://nodei.co/npm/iobroker.goodwe/)

**Tests:** ![Test and Release](https://github.com/typhosj/ioBroker.goodwe/workflows/Test%20and%20Release/badge.svg)

## goodwe adapter for ioBroker

Communication with GoodWe Inverter ET/EH/BH/BT Series

Manufacturer: [GoodWe](https://www.goodwe.com/)

This adapter is based on the original work by Thomas Schönberger.

## Requirements

* Node.js 22 or newer
* js-controller 6.0.11 or newer
* admin 7.8.23 or newer

## Supported data

The adapter reads the GoodWe EMS Modbus protocol v1.7 register blocks for ET/EH/BH/BT devices:

* Device information, including optional SIMCCID
* Running data
* External communication and extended meter data
* Flash information
* BMS information and BMS detailed information
* CEI auto test information
* Power limit information
* Battery and EMS settings, including the grid export limit and the EMS mode
* Work mode and load control settings, read only

Raw register values are kept as ioBroker states. Mode values are numeric states with ioBroker enum labels. Important bitfields are also exposed as decoded text states, for example active inverter errors, diagnostic status, BMS alarms and DRM status.

## Important states

| State area | Description |
| --- | --- |
| `DeviceInfo.*` | Inverter protocol, rated power, serial number, device type and firmware data |
| `RunningData.PV1.*` ... `RunningData.PV4.*` | PV voltage, current, power and mode |
| `RunningData.GridL1.*` ... `RunningData.GridL3.*` | Grid voltage, current, frequency and power |
| `RunningData.BackUpL1.*` ... `RunningData.BackUpL3.*` | Back-up output voltage, current, frequency, power and mode |
| `RunningData.Battery1.*` | Battery voltage, current, power and mode |
| `RunningData.*Energy*` | Daily and total energy counters |
| `RunningData.*Mode`, `RunningData.GridMode`, `RunningData.WorkMode`, `RunningData.OperationMode` | Numeric mode states with ioBroker enum labels |
| `RunningData.ErrorMessageActive` | Active inverter error bits as text |
| `RunningData.DiagStatusActive` | Active diagnostic bits as text, decoded from `RunningData.DiagStatusL` |
| `RunningData.DiagStatusH` | High word of the diagnostic status, kept as a raw number because the GoodWe protocol defines no bits for it |
| `ExtComData.*` | Smart meter and communication data |
| `BMSInfo.*` | BMS status, SOC, SOH, error and warning data |
| `BMSInfo.ErrorCodeActive` | Decoded BMS alarm bitfield |
| `BMSInfo.WarningCodeActive`, `BMSInfo.DRMStatusActive` | Decoded BMS warning and DRM bitfields when extended BMS polling is enabled |
| `FlashInfo.*` | Flash version and write-count information if enabled and supported by the inverter |
| `BMSDetail.*` | Detailed BMS values if enabled and supported by the inverter |
| `CEIAutoTest.*` | CEI auto test values if supported by the inverter |
| `PowerLimit.*` | Power limit and dispatch values if enabled and supported by the inverter |
| `Settings.Battery.*` | Battery capacity, module count, charge and discharge limits and depth of discharge as the SolarGo app shows it |
| `Settings.GridExportEnabled`, `Settings.GridExportLimit` | Grid export limit switch and value |
| `Settings.EmsMode`, `Settings.EmsPowerLimit` | EMS mode and the power the EMS mode works with |
| `Settings.WorkMode` | Work mode set in the SolarGo app: 0 general, 1 off-grid, 2 backup, 3 eco, 4 peak shaving, 5 self-use. Read only |
| `Settings.LoadControl.*` | Load control output (mode, switch, SOC) as plain numbers, because GoodWe does not document their meaning. Read only, needs ARM firmware 19 or newer |

## Configuration

* `ipAddr`: IP address of the inverter.
  Empty on fresh installations. The adapter validates this as a usable IPv4 host address on startup.
* `transport`: How the adapter talks to the inverter. `udp` (default) uses UDP port 8899, the protocol of the GoodWe WiFi dongle. `tcp` uses Modbus TCP on port 502, for the WiFi/LAN dongle 2.0 (WLA0000-01-00P), which does not answer on UDP port 8899 when it is connected by LAN.
  Modbus TCP is **experimental**: it has not been confirmed on a real dongle 2.0 yet. If it does not work for you, please open an issue with a debug log.
* `discoverySubnet`: Optional `/24` subnet for network discovery, for example `192.168.178.0/24`.
* `pollCycle`: Seconds between two reads of the live data (`RunningData`, `ExtComData`, `BMSInfo`) and the battery and EMS settings, from 2 to 3600.
  The other optional register groups, `Settings.WorkMode` and `Settings.LoadControl.*` included, do not follow this cycle: they share one slot that is served round robin about every 30 seconds, and `DeviceInfo` is read once per connection.
* `timeoutMs`: Request timeout in milliseconds, from 1000 to 30000.
* `retries`: Retry count per request, from 0 to 5.
* `pollExtended`: Master switch for optional register groups. `DeviceInfo`, `RunningData`, `ExtComData` and `BMSInfo` are always read.
* `pollSimccid`: Enables optional SIMCCID polling.
* `pollExtendedMeter`: Enables extended meter registers.
* `pollFlashInfo`: Enables flash information registers.
* `pollBmsExtended`: Enables extended BMS information registers.
* `pollBmsDetail`: Enables BMS detail registers, if supported by the inverter.
* `pollCeiAutoTest`: Enables CEI auto test registers.
* `pollPowerLimit`: Enables power limit registers, if supported by the inverter.
* `pollSettings`: Enables the battery, EMS, work mode and load control setting registers.
* `enableControl`: Makes the EMS, grid export, depth of discharge and charge current states writable, see below. Off by default.

The basic settings page also provides discovery helpers:

* `Inverter IP`: Stores only the inverter IPv4 address.
* `Validate inverter IP`: Checks the configured address. With `udp` it sends the GoodWe ID request to UDP port 8899, with `tcp` it reads one register over Modbus TCP on port 502.
* `Discover inverters`: Scans the configured `/24` subnet with the selected connection, on UDP port 8899 or on Modbus TCP port 502, and displays found inverters with IP address, connection, model name, serial number and version information when provided by the inverter. `Use` takes over the IP address and the connection. A Modbus device on port 502 counts as an inverter only when it returns a GoodWe serial number from register 35003. The Modbus TCP search reads a register from every device on port 502 in the subnet; some devices serve only one Modbus client and may drop their existing connection for a moment.

## Inverter control

With `enableControl` switched on, seven states become writable and are sent to the inverter as
single register writes. Every other state stays read-only.

| State | Register | Range | Description |
| --- | --- | --- | --- |
| `Settings.GridExportEnabled` | 47509 | 0-1 | Turns the grid export limit on or off |
| `Settings.GridExportLimit` | 47510 | 0-30000 W | Maximum power fed into the grid |
| `Settings.EmsMode` | 47511 | 1-12 | EMS mode, for example 1 auto, 11 charge battery, 12 discharge battery |
| `Settings.EmsPowerLimit` | 47512 | 0-30000 W | Power the selected EMS mode works with |
| `Settings.Battery.DischargeDepth` | 45356 | 0-95 % | Depth of discharge on grid, as the SolarGo app shows it |
| `Settings.Battery.DischargeDepthOffline` | 45358 | 0-95 % | Depth of discharge off grid, as the SolarGo app shows it |
| `Settings.Battery.ChargeCurrent` | 45353 | 0-100 A | Maximum battery charge current; the BMS may limit it further |

`GridExportLimit`, `EmsPowerLimit`, the depths of discharge and `ChargeCurrent` clamp values outside
their range. The inverter stores the depth of discharge as the remaining reserve, 100 minus the value
shown; the adapter converts it both ways, so a written 90 % arrives as a reserve of 10 %. The range
ends at 95 %, where the SolarGo app stops. `GridExportEnabled` and
`EmsMode` are enum registers and accept only the values listed above - a value outside that list is
refused instead of being clamped into a mode nobody asked for. Numbers written as plain decimal text,
for example `"500"` from an input field, are accepted, and `GridExportEnabled` also takes `true` and
`false`; any other value is refused. The states are numbers, so ioBroker notes text and booleans with an
info line in the log of the adapter that wrote them. After a
refused value and after every write the register group is read back, so the states show what the
inverter really stored.

A write while the inverter is offline is refused without sending anything, because every request would
only wait out its timeout. The first poll after the reconnect puts the value the inverter holds back on
the state.

Before a write the adapter reads the register group and skips the write when the inverter already holds
the value. A script that repeats the same setpoint every cycle therefore does not send a register write
every time.

Switching `enableControl` on keeps the battery and EMS setting registers polled even when
`pollSettings` or `pollExtended` is off, because the writable states have to exist and be read back. Unlike the other
optional groups, a failed read of this group does not pause it for an hour; it is tried again in the
next poll cycle.

The battery and EMS settings are read on every poll cycle, so a change made elsewhere, for example in the GoodWe app,
shows up in the states within one `pollCycle`.

GoodWe does not document its writable registers. Control is off by default, and switching it on
happens at your own risk: a wrong value changes inverter settings that the adapter cannot restore.
Leave it off if you only want to read data.

## Troubleshooting

### Inverter not found or not reachable

The adapter talks to the inverter directly, without the GoodWe cloud: over UDP port 8899, or over Modbus TCP on port 502 when `transport` is `tcp`. If the search finds nothing or the IP check fails, go through these points:

* The inverter is an ET, EH, BH or BT series device. Other series do not answer this protocol.
* The WiFi or LAN module of the inverter is connected to your network, and the router shows it with an IP address. Reserve that address in the router so it does not change.
* ioBroker can reach that address. A WiFi repeater, a guest network, a separate VLAN or a firewall between ioBroker and the inverter blocks the UDP packets.
* The inverter has the WiFi/LAN dongle 2.0: choose Modbus TCP under "Connection".
* The search only scans the /24 networks of the ioBroker host. If ioBroker runs in Docker or a VM with its own network, enter the inverter network under "Discovery subnet" (for example `192.168.178.0`) or type the IP address directly and use "Validate inverter IP".

### Optional register groups

Optional register groups depend on inverter model, firmware and connected hardware. If a group is not supported, the adapter pauses it for an hour after a failed read and keeps the main connection online. A reconnect after a connection loss ends the pause, so a group that only failed because the inverter was gone is read again right away.

Known model-dependent groups:

* `pollBmsDetail`: often unsupported unless the BMS exposes detail registers.
* `pollPowerLimit`: often unsupported on devices that do not expose power-limit telemetry.
* `pollCeiAutoTest`: can provide values on devices/firmware that support CEI auto test data.

If logs show optional register timeouts, disable the matching group in the advanced settings. Disabled optional register states are removed on adapter start.

For unstable network connections, keep `timeoutMs` low and raise `retries` instead. The inverter answers a healthy request within milliseconds, so a long timeout does not make a lost packet arrive - it only blocks the request queue until it expires. A value around 2000 with two retries recovers a lost answer in two seconds instead of waiting out a ten second timeout.

Recurring `retry` messages on debug level mean single UDP answers are getting lost. The larger the register group, the more often it is affected, so a group like `RunningData` shows up first. If they cluster at the same second of every minute, something outside the adapter is busy on the inverter periodically - the cloud upload of the WiFi module is the usual candidate. As long as no `timed out` warning follows, the retry recovered the request and no data was lost. Wiring the inverter to LAN instead of WiFi removes the cause; disabling optional register groups reduces the number of requests that can be hit.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- Added Modbus TCP on port 502 as a second, experimental connection for the GoodWe WiFi/LAN dongle 2.0, which does not answer the UDP protocol on port 8899 when it is connected by LAN. Choose it under "Connection" in the basic settings; UDP stays the default. The inverter search uses the selected connection (#59).
- The depth of discharge (on and off grid) and the battery charge current can be written when inverter control is on. The depth of discharge is written as the SolarGo app shows it; the adapter converts it into the reserve the inverter stores. The depth of discharge is limited to 95 %, the charge current to 100 A.
- Added the read-only states `Settings.WorkMode` (work mode set in the SolarGo app) and `Settings.LoadControl.*` (load control output), read with `pollSettings` in the slot of the optional groups. Inverters with older firmware may not offer the load control registers.
- Fixed a rejected register read failing the next request as well: the inverter repeats its rejection about 250 ms later, and the next request took it as its own answer. On an inverter without the EMS registers this could pause the following optional group for an hour.

### 1.2.1 (2026-10-25)
- Temperature states now carry the unit `°C` instead of `C`, so charts, widgets and the type detector show and recognise them as temperatures.
- States created by older versions get their unit and specific role on the next start: many still had no unit and the generic role `value`, so voltage, current, power and temperature were not recognised. Only a missing unit, the unit `C` and the role `value` are replaced; a unit or role you set by hand is kept, and writable control states are left alone.
- When the search finds no inverter or the IP check fails, the settings page now says what to check, and the README has a new troubleshooting section for it (reported in the forum).
- Fixed the smart meter values in `ExtComData`: `EnergyTotalSell` and `EnergyTotalBuy` were 100 times too high, the power factors (`PowerFactor`, `L1/L2/L3.PowerFactor`) were 10 times too high and showed values around 650 when negative, and a negative `TotalReactivePower` showed as about 65000 var. The adapter followed the GoodWe protocol document here, but the meter sends the energy in Wh and signed values. Charts and history of these states jump at the update.
- Fixed battery temperatures below 0 °C showing as about 6550 °C (`BMSInfo.PackTemperature`, and `BMSInfo.MaximumCellTemperature`/`MinimumCellTemperature` with the extended BMS data).
- Fixed `Settings.Battery.DischargeDepth` and `DischargeDepthOffline`: they showed the remaining reserve (for example 5 %) instead of the depth of discharge the SolarGo app shows (95 %).
- `RunningData.DiagStatusActive` now also shows bit 30 of the diagnostic status, `BMSEmergencyCharging`, which newer firmware sets.

### 1.2.0 (2026-09-14)
- Added the battery settings (registers 45350-45358) and the EMS settings (registers 47509-47512) as new `Settings.*` states, enabled with the new `pollSettings` option and read on every poll cycle.
- Added optional inverter control: with the new `enableControl` option the states `Settings.EmsMode`, `Settings.EmsPowerLimit`, `Settings.GridExportEnabled` and `Settings.GridExportLimit` become writable and are sent to the inverter as single register writes. Only these four registers are ever written: limit values are clamped to the range the adapter allows, mode values outside the list in this README are refused, numbers written as text are accepted, a write while the inverter is offline is refused, a value the inverter already holds is not written again, and the register group is read back after every write. While control is on, the EMS settings stay polled whatever `pollSettings` and `pollExtended` say. Control is off by default.
- Fixed optional register groups pausing for an hour after a connection loss. A group whose read failed only because the inverter was gone is read again right after the reconnect, and a poll cycle whose live data got no answer stops there instead of running the remaining reads into their timeouts as well.
- Fixed UDP answers being discarded when the inverter pads them into a larger datagram (the 257 byte running data frame arrives in 1024 bytes). The frame check read the checksum from the end of the datagram, so every padded answer ran into a timeout and a retry. On a live inverter the running data retries dropped from 1.57 % to 0.46 %.
- The network discovery scans at most four subnets, starting with the one of the configured inverter address. Container bridges and VPN adapters no longer turn a scan into thousands of probes.
- A register the inverter rejects is reported as a Modbus exception right away instead of running into the full timeout of every retry.
- Reworked the poll cycle to cut the UDP traffic to the inverter. `pollCycle` now means the interval of the live data (`RunningData`, `ExtComData`, `BMSInfo`) and accepts values from 2 seconds, where it started at 10 before. The optional register groups other than the settings no longer run all at once every cycle but share one slot that is served round robin roughly every 30 seconds, and the static `DeviceInfo` is read once per connection instead of every cycle. With the default settings this is 32 register requests per minute instead of 54, and every request that is not sent is one whose answer cannot get lost. The small `BMSInfo` read now goes first in every cycle, because the first request after the idle gap loses the most answers.

### 1.1.3 (2026-08-28)
- Fixed the adapter crashing with `Cannot read properties of undefined (reading 'debug')`: the logger is now read when it is used instead of being captured before the adapter assigned it.
- Fixed the adapter staying offline after a single lost UDP answer. The socket is rebound after a timeout, so a late answer can no longer be mistaken for the answer of the next register group.
- The first failed reconnect is logged as a warning again, so an adapter that turned yellow no longer stays silent.

### 1.1.2 (2026-08-27)
- Fixed unsigned 32 bit registers being reported as negative values (for example `RunningData.DiagStatusL` and `RunningData.ErrorMessage`).
- Boolean options are normalized at adapter start, so a string typed switch no longer disables an optional register group and deletes its states.
- Discarded late UDP answers after a timeout; they could be parsed as the answer of the next register group with the same length.
- Blocked state writes after `onUnload()` and moved the last direct state write out of the scheduler.
- Added an exponential backoff for reconnect attempts while the inverter is offline and reduced the repeated warnings to debug.
- Clamped probe timeouts coming from admin messages.
- Enabled TypeScript `strict` mode.

### 1.1.1 (2026-07-16)
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.
- Migrated the admin configuration page to a React based UI and removed the legacy Materialize UI files.
- Added translations for the admin configuration page and documented numeric setting limits.
- Avoided rebuilding the admin bundle during GitHub installs.
- Excluded `CHANGELOG_OLD.md` from the npm package.

## License
MIT License

Copyright (c) 2023 Thomas Schönberger <SchoenbergerThomas@freenet.de>  
Copyright (c) 2025-2026 typhosj <typhosj@gmx.de>

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