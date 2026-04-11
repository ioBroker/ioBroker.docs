![Logo](admin/e3oncan_small.png)
# ioBroker.e3oncan

[![NPM version](https://img.shields.io/npm/v/iobroker.e3oncan.svg)](https://www.npmjs.com/package/iobroker.e3oncan)
[![Downloads](https://img.shields.io/npm/dm/iobroker.e3oncan.svg)](https://www.npmjs.com/package/iobroker.e3oncan)
![Number of Installations](https://iobroker.live/badges/e3oncan-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/e3oncan-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.e3oncan.png?downloads=true)](https://nodei.co/npm/iobroker.e3oncan/)

**Tests:** ![Test and Release](https://github.com/MyHomeMyData/ioBroker.e3oncan/workflows/Test%20and%20Release/badge.svg)

## e3oncan adapter for ioBroker

## Table of contents

- [Overview](#overview)
- [Quick start](#quick-start)
- [Configuration guide](#configuration-guide)
  - [Step 1 – CAN adapter](#step-1--can-adapter)
  - [Step 2 – Device scan](#step-2--device-scan)
  - [Step 3 – Data point scan](#step-3--data-point-scan)
  - [Step 4 – Assignments and schedules](#step-4--assignments-and-schedules)
- [Reading data points](#reading-data-points)
- [Writing data points](#writing-data-points)
- [Data points and metadata](#data-points-and-metadata)
- [Energy meters](#energy-meters)
  - [E380 data and units](#e380-data-and-units)
  - [E3100CB data and units](#e3100cb-data-and-units)
- [FAQ and limitations](#faq-and-limitations)
- [Donate](#donate)
- [Changelog](#changelog)

---

## Overview

Viessmann E3 series devices (One Base ecosystem) exchange a large amount of data over the CAN bus. This adapter taps into that communication and makes the data available inside ioBroker.

Two modes of operation work independently and can be combined:

| Mode | Description |
|---|---|
| **Collect** | Passively listens on the CAN bus and extracts data in real time as devices exchange it. No requests are sent. Ideal for fast-changing values such as energy flow. |
| **UDSonCAN** | Actively reads and writes data points using the UDS protocol (Universal Diagnostic Services over CAN). Required for setpoints, schedules, and data not broadcast spontaneously. |

Which modes are available depends on your device topology. See the [device topology discussion](https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/34) for details. For inspiration on what you can do with the adapter, see the [use cases discussion](https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/35).

> Important parts of this adapter are based on the [open3e](https://github.com/open3e) project.
> A Python-based collect-only implementation using MQTT is available at [E3onCAN](https://github.com/MyHomeMyData/E3onCAN).

---

## Quick start

**Prerequisites**

- A USB-to-CAN or CAN adapter connected to the external or internal CAN bus of your Viessmann E3 device.
- A Linux-based host system (only Linux is supported).
- The CAN adapter is up and visible in the system, e.g. as `can0` (verify with `ifconfig`).
- Refer to the [open3e project wiki](https://github.com/open3e/open3e/wiki/020-Inbetriebnahme-CAN-Adapter-am-Raspberry) for CAN adapter setup details.

> **Important:** Make sure no other UDSonCAN client (e.g. open3e) is running while setting up this adapter for the first time. Parallel UDS communication will cause errors in both applications.

**First-time setup – at a glance**

1. Install the adapter and open its configuration dialog.
2. Configure your CAN adapter(s) on the **CAN Adapter** tab and save.
3. Scan for E3 devices on the **List of UDS Devices** tab.
4. Scan for data points on the **List of Data Points** tab (takes up to 5 minutes).
5. Set up read schedules on the **Assignments** tab and save.

The detailed steps are described in the [Configuration guide](#configuration-guide) below.

> **After upgrading Node.js:** Native modules used by this adapter must be rebuilt when the Node.js version changes. If the adapter fails to start after a Node.js upgrade, stop it, run `iob rebuild` on the command line, then start it again.

---

## Configuration guide

### Step 1 – CAN adapter

Open the adapter configuration dialog and go to the **CAN Adapter** tab.

- Enter the name of your CAN interface (default: `can0`).
- Check **Connect to adapter** for each interface you want to use.
- Press **SAVE**. The adapter instance will restart and connect to the CAN bus.

If you have a second CAN bus (e.g. internal bus), configure it as the second adapter here. A second **Assignments** tab will appear once the second adapter is configured.

### Step 2 – Device scan

Go to the **List of UDS Devices** tab and press the **Scan** button.

- The scan takes a few seconds. You can watch progress in the adapter log (open a second browser tab).
- All E3 devices found on the bus will be listed. Energy meters (E380, E3100CB) are not listed here – they are configured separately.
- You can rename devices in the second column. These names are used as identifiers in ioBroker's object tree.
- Press **SAVE** when done. The instance will restart.

> During the device scan, the adapter also reads the device's data format configuration (data point 382), including temperature units (°C or °F) and date/time formats. This is stored and used during subsequent data point scans.

### Step 3 – Data point scan

Go to the **List of Data Points** tab, press **Start scan …** and confirm with **OK**.

> **Be patient** – the scan may take up to 5 minutes. Progress is visible in the adapter log.

What the scan does:
- Discovers all available data points for each device.
- Adds metadata (description, unit, read/write access) to each data point object.
- Sets physical units based on the device format configuration found in step 2.
- Creates the full object tree for each device in ioBroker.

This step is not strictly mandatory for read-only use, but it is **strongly recommended** – and **required** if you want to write to any data point.

After the scan, you can browse the discovered data points in the configuration dialog by selecting a device and pressing **Update list of data points**. Use the filter symbol to search by name or codec. Deactivate the filter before switching to another device.

### Step 4 – Assignments and schedules

Go to the **Assignments to UDS CAN Adapter** tab (and the second adapter tab if applicable).

**Energy meters (Collect mode)**

If you have E380 or E3100CB energy meters, you can activate listening for them here. Set **Min. update time (s)** to control how often values are stored. The default of 5 seconds is recommended – energy meters transmit more than 20 values per second, and setting this to 0 will put a high load on ioBroker.

**E3 device collection (Collect mode)**

Press **+** to add a device. Check **Active**, select the device, and set **Min. update time (s)**. A value of 5s is recommended; 0s (store every received value) is possible but generates more load.

This mode captures data exchanged between your E3 devices in real time, without sending any requests. See the [FAQ](#faq-and-limitations) for details on which devices support this.

**UDSonCAN read schedules**

Press **+** to add a schedule. Select a device and a list of data points to read, then set an interval in seconds. A value of 0 means the data points are read once at adapter startup.

You can add multiple schedules per device to request some data points more frequently than others. Use the **List of Data Points** tab (open in a second browser tab) as a reference.

Press **SAVE & CLOSE** when done. Check the object tree to verify that data is being collected.

---

## Reading data points

Data points are read automatically according to the schedules you configured. Values appear in ioBroker's object tree under the device name, organised into `json`, `raw` and `tree` sub-objects with human-readable names and metadata.

**Reading a specific data point on demand**

You can request any data point at any time by editing the state `e3oncan.0.<DEVICE>.cmnd.udsReadByDid` and entering a list of data point IDs, for example `[3350, 3351, 3352]`. If the data point is available on the device, the value will appear in the object tree and can be used in read schedules.

The numerical scan range is currently limited (e.g. 256–3338 in version 0.11.0). Use `udsReadByDid` to probe data points outside this range.

---

## Writing data points

Writing is intentionally simple: change the value of the corresponding state in ioBroker and save it **without** checking the `Acknowledged` (ack) checkbox. The adapter detects the unacknowledged write and sends it to the device.

About 2.5 seconds after writing, the adapter reads the data point back from the device and stores the confirmed value. If the state is not acknowledged after this, check the adapter log for error details.

**Whitelist of writable data points**

Writing is restricted to data points on a whitelist, stored at:

```
e3oncan.0.<DEVICE>.info.udsDidsWritable
```

You can extend the list by editing this state. Save it **without** checking `Acknowledged`.

Some data points cannot be changed even if whitelisted – the device will return a negative response. The adapter then retries with an alternative service (internal CAN bus only). Always verify write operations by checking whether the value was acknowledged.

---

## Data points and metadata

For detailed information about how data points are structured, how variant data points and metadata work, and how temperature/date/time formats are handled, please refer to [data-points.md](data-points.md).

---

## Energy meters

### E380 data and units

Up to two E380 energy meters are supported. Data point IDs depend on the device's CAN address:

- **CAN address 97:** data points with even IDs
- **CAN address 98:** data points with odd IDs

| ID | Data | Unit |
|---|---|---|
| 592, 593 | Active Power L1, L2, L3, Total | W |
| 594, 595 | Reactive Power L1, L2, L3, Total | var |
| 596, 597 | Absolute Current L1, L2, L3; cosPhi | A, — |
| 598, 599 | Voltage L1, L2, L3; Frequency | V, Hz |
| 600, 601 | Cumulated Import, Export | kWh |
| 602, 603 | Total Active Power, Total Reactive Power | W, var |
| 604, 605 | Cumulated Import | kWh |

### E3100CB data and units

| ID | Data | Unit |
|---|---|---|
| 1385_01 | Cumulated Import | kWh |
| 1385_02 | Cumulated Export | kWh |
| 1385_03 | State: −1 = feed-in / +1 = supply | — |
| 1385_04 | Active Power Total | W |
| 1385_08 | Active Power L1 | W |
| 1385_12 | Active Power L2 | W |
| 1385_16 | Active Power L3 | W |
| 1385_05 | Reactive Power Total | var |
| 1385_09 | Reactive Power L1 | var |
| 1385_13 | Reactive Power L2 | var |
| 1385_17 | Reactive Power L3 | var |
| 1385_06 | Current, Absolute L1 | A |
| 1385_10 | Current, Absolute L2 | A |
| 1385_14 | Current, Absolute L3 | A |
| 1385_07 | Voltage L1 | V |
| 1385_11 | Voltage L2 | V |
| 1385_15 | Voltage L3 | V |

---

## FAQ and limitations

**Why use Collect and UDSonCAN together?**

Collect gives you real-time data for everything the devices exchange among themselves – fast-changing values like energy flow, and slowly changing values like temperatures, all updated the moment they change. UDSonCAN lets you access data that is not broadcast spontaneously, typically setpoints and configuration values. Combining both gives you the most complete and up-to-date picture of your system.

**Which devices support Collect mode?**

At present, the collect protocol is known for:
- Vitocal (listens on CAN ID `0x693`, internal CAN bus)
- Vitocharge VX3 and Vitoair (listen on CAN ID `0x451`, external and internal CAN bus)

**Can I use open3e at the same time?**

Yes, with conditions. If you only use Collect mode in this adapter, open3e can run alongside it without any restrictions. If you use UDSonCAN here, do not run open3e for the same devices simultaneously – this causes sporadic communication errors in both applications.

**The adapter stopped working after a Node.js upgrade. What do I do?**

This adapter uses native modules that must be rebuilt when the Node.js version changes. Stop the adapter, run `iob rebuild` on the command line, then start the adapter again. If the problem persists, please open an issue.

**What is different from the open3e project?**

- Direct integration into ioBroker: configuration via dialogs, data visible directly in the object tree.
- Real-time Collect mode in addition to UDSonCAN.
- Writing data is simpler: just change a state value and save without acknowledging.
- No MQTT required (though MQTT is of course available via normal ioBroker configuration).
- 64-bit integer encoding for writes is limited to values below 2^52 (4,503,599,627,370,496). Decoding works correctly over the full 64-bit range.

**Can I request data points outside the scan range?**

Yes. Edit the state `e3oncan.0.<DEVICE>.cmnd.udsReadByDid` and enter a list of data point IDs, e.g. `[3350, 3351, 3352, 3353]`. Available data points will appear in the object tree and can be used in read schedules. Unavailable data points produce a "Negative response" message in the log.

---

## Donate

<a href="https://www.paypal.com/donate/?hosted_button_id=WKY6JPYJNCCCQ"><img src="https://raw.githubusercontent.com/MyHomeMyData/ioBroker.e3oncan/main/admin/bluePayPal.svg" height="40"></a>  
If you enjoyed this project — or just feeling generous, consider buying me a beer. Cheers! :beers:

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
* (MyHomeMyData) To take full advantage of the variant data points and metadata, please perform a device scan followed by a data point scan
* (MyHomeMyData) Added handling for variant data points and for device's data format configuration, refer to https://github.com/MyHomeMyData/ioBroker.e3oncan/data-points.md for details
* (MyHomeMyData) Added metadata to several data points, e.g. description, unit, link to further info
* (MyHomeMyData) During scan of data points now metadata are added to data point objects
* (MyHomeMyData) Changed handling of writable data points; this info now also is available within definition of data point; however, there is no change to handling of the whitelist of writables
* (MyHomeMyData) During device scan the information about used data formats (data point 382) is evaluated
* (MyHomeMyData) Updated structure of the following data points: 268,269,271,274,279,282,284,285,286,287,288,289,290,291,318,320,321,324,531,1659,1684,1768,1769,1770,1771,1772,2084,2085,2087,2088,2090,2091,2093,2094,2096,2097,2099,2100,2102,2103,2105,2106,2108,2109,2111,2112,2114,2115,2117,2118,2120,2121,2123,2124,2126,2127,2129,2130,2132,2133,2135,2136,2138,2139,2141,2142,2240,2260,2261,2263,2264,2266,2267,2269,2270,2272,2273,2275,2276,2278,2279,2281,2282,2284,2285,2287,2288,2290,2291,2293,2294,2296,2297,2299,2300,2302,2303,2305,2306,2308,2309,2311,2312,2314,2315,2317,2318,2320,2333,2334,2351,2352,2593,2735,2806,3014,3015,3016,3017,3018,3032,3034,3035,3036
* (MyHomeMyData) Hint: For all sensor data points the last entry "Unknown" was changed to "SensorStatus". That's why the list of changed data points is so long.
* (MyHomeMyData) Hint: For the frequently used data points 531, 1415..1418, 2351, 2532 and 2735 the numerical value has been moved to the sub "ID": 0531_DomesticHotWaterOperationState, 1415_MixerOneCircuitOperationState.State.ID, 2351_HeatPumpCompressor.PowerState.ID, 2352_AdditionalElectricHeater.PowerState.ID, 2735_FourThreeWayValveValveCurrentPosition.ID

### 0.10.14 (2025-11-03)
* (MyHomeMyData) Added elements to enums.js based of PR no. 182 of open3e
* (MyHomeMyData) Simplified configuration of dids scan limits in source code
* (MyHomeMyData) Extended scan up to did 3338
* (MyHomeMyData) Added hint regarding scan range in Readme
* (MyHomeMyData) Fixes for issue #169 (repository checker)
* (MyHomeMyData) Bugfix: Manual change of device specific dids was not evaluated for collect workers
* (MyHomeMyData) Update of list of data points for E3 devices to version 20251102

### 0.10.13 (2025-09-30)
* (MyHomeMyData) Fix for issue #162

### 0.10.12 (2025-09-15)
* (MyHomeMyData) Migration to ESLint 9, refer to issues #141 and #152

### 0.10.11 (2025-09-06)
* (MyHomeMyData) Fix for issue #152 (repository checker) and #126 (node.js 24)
* (MyHomeMyData) Added hint to readme regarding user action after upgrading version of node.js
* (MyHomeMyData) Update of list of data points for E3 devices to version 20250903

### 0.10.10 (2025-08-07)
* (MyHomeMyData) Fix for issue #142 (WriteByDid not working in case of specific UDS control frame)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20250729
* (MyHomeMyData) Added codec for 64-bit integers. Remark: Encoding (for writing of data) is limited to values < 2^52 (4.503.599.627.370.496).

### 0.10.9 (2025-05-22)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20250422
* (MyHomeMyData) Fixed version number of enum info
* (MyHomeMyData) Fix for issue #125 (findings of repository checker)

### 0.10.8 (2025-03-07)
* (MyHomeMyData) Bugfix for issue #117
* (MyHomeMyData) Updated data point 381, refer to discussion https://github.com/open3e/open3e/discussions/212
* (MyHomeMyData) Update of list of data points for E3 devices to version 20250307

### 0.10.7 (2025-02-26)
* (MyHomeMyData) Updated dependencies according to issue #111

### 0.10.6 (2025-02-19)
* (MyHomeMyData) Added missing enum info for data point 2850

### 0.10.5 (2025-02-18)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20250217
* (MyHomeMyData) Updated dependencies according to issues #101 and #108

### 0.10.4 (2025-01-15)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20250114

### 0.10.3 (2024-11-26)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20241125

### 0.10.2 (2024-11-16)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20241115
* (MyHomeMyData) Fixes for issue #81 (added missing size attributes)

### 0.10.1 (2024-10-20)
* (MyHomeMyData) Fixes for issue #79 (improvements for usability on mobile devices)

### 0.10.0 (2024-10-14)
* (MyHomeMyData) Added extended support for writing of data points.
* (MyHomeMyData) Changed naming for CAN adapter.

### 0.9.5 (2024-09-19)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20240916

### 0.9.4 (2024-08-26)
* (MyHomeMyData) Start up an UDS worker for each device to allow writing of data points even when no schedule for reading is defined on this device
* (MyHomeMyData) Update of npm dependencies

### 0.9.3 (2024-08-20)
* (MyHomeMyData) Bugfix: Updating UDS communication statistics, even in case of persistent timeout events
* (MyHomeMyData) Disabled sinon should interface
* (MyHomeMyData) Fixes based on issues #55,#56
* (MyHomeMyData) Bugfix: Time delta between schedules of UDS workes was not working properly

### 0.9.2 (2024-08-09)
* (MyHomeMyData) Update of dependencies, fixes based on issue #53
* (MyHomeMyData) Update of list of data points for E3 devices to version 20240808

### 0.9.1 (2024-05-26)
* (MyHomeMyData) Updated README, added links for description of device topology and to uses cases
* (MyHomeMyData) Added info for data points 2404_BivalenceControlMode and 2831_BivalenceControlAlternativeTemperature
* (MyHomeMyData) Update of list of data points for E3 devices to version 20240505

### 0.9.0 (2024-04-21)
* (MyHomeMyData) Structure of data point 1690 (ElectricalEnergySystemPhotovoltaicStatus) changed based on issue https://github.com/MyHomeMyData/E3onCAN/issues/6. Manual adaptations may be needed, please check!
* (MyHomeMyData) Update of list of data points for E3 devices to version 20240420
* (MyHomeMyData) Added support for energy meter E3100CB
* (MyHomeMyData) Update of list of data points for E380 to version 20240418
* (MyHomeMyData) Main change for E380 id 600/601 (GridEnergy): Now using correct data format. Many thanks to @M4n197 for unveiling the right data format. Manual adaptations may be needed, please check!

### 0.8.0 (2024-03-22)
* (MyHomeMyData) Added support for energy meter E380 with CAN-address=98
* (MyHomeMyData) Update of list of data points for E380 to version 20240320

### 0.7.2 (2024-03-20)
* (MyHomeMyData) Update of data type and role added for device specific data points
* (MyHomeMyData) Update list of writable data points when updating data points to newer version
* (MyHomeMyData) Improved handling of failed CAN communication during scan for data points
* (MyHomeMyData) Update of list of data points to version 20240319

### 0.7.1 (2024-03-15)
* (MyHomeMyData) Bugfix for data point 1190: Scaling changed back to 10.0
* (MyHomeMyData) Update of list of data points to version 20240314

### 0.7.0 (2024-03-13)
* (MyHomeMyData) Store numbers in states of channel "tree" with type "Number" instead of "String"
* (MyHomeMyData) IMPORTANT: This may affect handling of tree states, e.g. in scripts, vis and history
* (MyHomeMyData) Bugfix for Energy Meter E380 data point id 0x25C
* (MyHomeMyData) Update of list of data points to version 20240309
* (MyHomeMyData) Bugfix for update of changed data point structure during start of adapter
* (MyHomeMyData) Changed default values for CAN adapters to can0 and can1
* (MyHomeMyData) Increased value for collect timeout to 2000 ms

### 0.6.19 (2024-02-19)
* (MyHomeMyData) Check for changed structure of data points during startup
* (MyHomeMyData) Update of list of data points to version 20240218
* (MyHomeMyData) Bugfix to avoid warnings on very first start of adapter

### 0.6.18 (2024-02-08)
* (MyHomeMyData) Added versioning to list of data points and check for updates on start of adapter
* (MyHomeMyData) Added optional description in configuration of UDS schedules

### 0.6.17 (2024-01-29)
* (MyHomeMyData) Added/removed data points to/from list of writable dids
* (MyHomeMyData) Preparations for device specific list of writable dids

### 0.6.16 (2024-01-27)
* (MyHomeMyData) Improvements based on findings in review as of 2024-01-25
* (MyHomeMyData) Checkbox for data collectiton on internal bus is now checked per default

### 0.6.15 (2024-01-23)
* (MyHomeMyData) Fix for Utf8 codec for handling of special characters, e.g. umlauts

### 0.6.14 (2024-01-22)
* (MyHomeMyData) Replace '.' by '_' in data point ids to avoid unwanted sub structure in data states
* (MyHomeMyData) Added more informations about white list for writables in Readme.
* (MyHomeMyData) Recognize loss of CAN connection.
* (MyHomeMyData) Improved handling of info.connection.

### 0.6.13 (2024-01-20)
* (MyHomeMyData) Now supports multiple definitions of same schedule on a device 
* (MyHomeMyData) Added unit test cases for codecs

### 0.6.12 (2024-01-19)
* (MyHomeMyData) Added data points to list writable dids
* (MyHomeMyData) Added unit test cases for codecs
* (MyHomeMyData) Improved speed of codes for numerical values
* (MyHomeMyData) Improved error messages on UDS negative response

### 0.6.11 (2024-01-17)
* (MyHomeMyData) Improved layout of configuration dialog for device scan

### 0.6.10 (2024-01-15)
* (MyHomeMyData) Removed code for Rawmode because it's never activated

### 0.6.9 (2024-01-13)
* (MyHomeMyData) Bugfix: Only Linux is supported

### 0.6.8 (2024-01-13)
* (MyHomeMyData) Initial npm version

## License
MIT License

Copyright (c) 2024-2026 MyHomeMyData <juergen.bonfert@gmail.com>

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
