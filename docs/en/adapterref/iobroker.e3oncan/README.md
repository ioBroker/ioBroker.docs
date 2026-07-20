![Logo](admin/e3oncan_small.png)
# ioBroker.e3oncan

[![NPM version](https://img.shields.io/npm/v/iobroker.e3oncan.svg)](https://www.npmjs.com/package/iobroker.e3oncan)
[![Downloads](https://img.shields.io/npm/dm/iobroker.e3oncan.svg)](https://www.npmjs.com/package/iobroker.e3oncan)
![Number of Installations](https://iobroker.live/badges/e3oncan-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/e3oncan-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.e3oncan.png?downloads=true)](https://nodei.co/npm/iobroker.e3oncan/)

**Tests:** ![Test and Release](https://github.com/MyHomeMyData/ioBroker.e3oncan/workflows/Test%20and%20Release/badge.svg)

## e3oncan adapter for ioBroker

> **Note:** Navigation links in this document work best when viewed [on GitHub](https://github.com/MyHomeMyData/ioBroker.e3oncan#readme). Relative links to other documents (e.g. [data-points.md](https://github.com/MyHomeMyData/ioBroker.e3oncan/blob/main/lib/data-points.md)) also open on GitHub.

> Eine deutsche Version dieser Dokumentation ist verfügbar: [README.de.md](README.de.md)

## Table of contents

- [Overview](#overview)
- [What's new in v1.1.0](#whats-new-in-v110)
- [What's new in v1.0.3](#whats-new-in-v103)
- [What's new in v1.0.0](#whats-new-in-v100)
- [What's new in v0.11.x](#whats-new-in-v011x)
- [Quick start](#quick-start)
- [Configuration guide](#configuration-guide)
  - [Step 1 – CAN adapter](#step-1--can-adapter)
  - [Step 2 – Device scan and energy meter detection](#step-2--device-scan-and-energy-meter-detection)
  - [Step 3 – Data point scan](#step-3--data-point-scan)
  - [Step 4 – Assignments and schedules](#step-4--assignments-and-schedules)
- [Bus topology analysis](#bus-topology-analysis)
- [e3oncan datapoints tab](#e3oncan-datapoints-tab)
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

## What's new in v1.1.1

### Updated data point definitions

Data point definitions have been updated to version 20260705 (common) and 20260630 (variant).

### New O3ESwitch codec

A new codec `O3ESwitch` has been added for data points whose structure depends on a device type discriminator byte. The first byte selects the active variant from a set of predefined codec branches. This enables full structured decoding of ZigBee device slot DIDs (2086–2143, 2262), where the decoded fields differ by device type (e.g. climate sensor, TRV, floor thermostat, actuator).

### Decimal rounding for numeric codecs

Numeric codecs (`O3EInt8`, `O3EInt16`, `O3EInt32`, `O3EInt64`, `O3EFloat32`) now support an optional `decimals` parameter. When set to a value greater than 0, the decoded result is rounded to that number of decimal places. This is used, for example, for `SignalLevel` (scale 2.55, decimals 2) to avoid excessively long floating-point values.

### Units and metadata set at startup when data point structure changes

When the adapter detects at startup that a data point's structure has changed (new version in `didsE3var.json` or `didsE3.json`), it now correctly registers units and descriptions for all sub-states of the rebuilt tree. Previously, units were only set during a data point scan; a subsequent scan was required to populate them after a structure update.

---

## What's new in v1.0.3

### No more rebuild after a Node.js upgrade

The native CAN module `socketcan` has been updated to version 4.2.1, which uses the stable **N-API** interface. The module no longer needs to be recompiled when the Node.js version changes. Upgrading Node.js (e.g. from 22 to 24) no longer requires running `iob rebuild` afterwards — the adapter starts without any additional steps.

### Scheduled data point filter in the datapoints tab

Clicking the green badge that shows the number of scheduled data points on a device card now **filters the card to show only scheduled data points**. This makes it easy to review or adjust scheduling for a specific device. Clicking the badge again or the card header restores the full view.

### Protecting custom variant data point definitions

User-defined structures in `e3oncan.0.<DEVICE>.info.udsDidsSpecific` can now be **protected from automatic updates** by adding `"protected": true` to the entry. An optional `"reason"` field is logged whenever the protection takes effect. Without protection, variant data point definitions (those also listed in `didsE3var.json`) are updated automatically when a newer definition is available — this behaviour is unchanged. See the [documentation](lib/data-points.md#user-defined-data-point-structures-in-udsdidsspecific) for details.

### Updated data point definitions

Data point definitions have been updated to version 20260528 (common) and 20260527 (variant). Highlights:
- ZigBee DIDs 2084–2319 fully structured (device properties, current values in 57-byte and 68-byte variants)
- Room DIDs 1884–1943 structured (name, type, temperature control, window detection, min/max humidity)
- New ViGuide-derived DID structures for fuel cell metrics, energy coverage, and battery/inverter subscriptions
- `Unknown*` fields now consistently use `RawCodec`

---

## What's new in v1.0.0

### Datapoints tab

A new **e3oncan datapoints** page is pinned directly to the adapter's instance row in the ioBroker instances view. Click the <img src="admin/icon_open_tab.svg" height="20"> button in the instance row to open it. It provides a dedicated UI for managing schedules and Collect settings per device and data point — no need to open the full adapter configuration dialog for day-to-day changes.

### Auto-detection of energy meters

Energy meters (E380 and E3100CB) are now **automatically detected** during the device scan by passive CAN listening on both CAN channels. State names are assigned automatically based on the detected CAN address and channel. The active/inactive toggle and the collect delay for each energy meter are configured exclusively in the datapoints tab.

On first start after an upgrade from an earlier version, the previous energy meter configuration is migrated automatically.

### Auto-detection of Collect-capable devices

During the data point scan, the adapter now passively listens on the CAN bus to detect which devices support Collect mode. Detected devices are highlighted with a pin icon in the device card header of the datapoints tab.

### Flexible data point scan

A new option **Save data point values to object tree during scan** controls whether the current values are written to the object tree during the scan. When disabled, the adapter still updates values and metadata for all existing data point objects — only new objects are not created during the scan. This is useful to refresh metadata after a migration without rewriting all state values.

### Bus topology analysis

After the data point scan, the adapter automatically analyses the bus topology data collected during the scan and generates a summary. The result is stored in two new states in the `info` channel:

- `info.topology` – structured JSON with all discovered UDS-accessible devices and topology elements (deduplicated across all topology matrices).
- `info.topologyHtml` – a rendered HTML table, color-coded by bus type (CanInternal, CanExternal, CanRaw, ModBus, ServiceBus), with a UDS badge on devices that are also accessible via UDS. Ready for display in vis, jarvis, or any HTML-capable widget.

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

---

## Configuration guide

### Step 1 – CAN adapter

Open the adapter configuration dialog and go to the **CAN Adapter** tab.

- Enter the name of your CAN interface (default: `can0`).
- Check **Connect to adapter** for each interface you want to use.
- Press **SAVE**. The adapter instance will restart and connect to the CAN bus.

If you have a second CAN bus (e.g. internal bus), configure it as the second adapter here. A second **Assignments** tab will appear once the second adapter is configured.

### Step 2 – Device scan and energy meter detection

Go to the **List of UDS Devices** tab and press the **Scan** button.

- The scan takes a few seconds. You can watch progress in the adapter log (open a second browser tab).
- All E3 devices found on the bus will be listed. You can rename devices in the second column — these names are used as identifiers in ioBroker's object tree.
- Press **SAVE** when done. The instance will restart.

> During the device scan, the adapter also reads the device's data format configuration (data point 382), including temperature units (°C or °F) and date/time formats. This is stored and used during subsequent data point scans.

**Energy meter detection**

While the device scan runs, the adapter passively listens on the CAN bus for broadcasts from E380 and E3100CB energy meters. No additional scan time is needed — detection happens in parallel. The result is stored and shown:

- In the adapter configuration dialog (**List of UDS Devices** tab) as a text summary.
- In the **e3oncan datapoints** page as individual cards for each detected meter type (see [below](#e3oncan-datapoints-tab)).

### Step 3 – Data point scan

Go to the **List of Data Points** tab, press **Start scan …** and confirm with **OK**.

> **Be patient** – the scan may take up to 5 minutes. Progress is visible in the adapter log.

What the scan does:
- Discovers all available data points for each device.
- Adds metadata (description, unit, read/write access) to each data point object.
- Sets physical units based on the device format configuration found in step 2.
- Creates the full object tree for each device in ioBroker.
- Detects Collect-capable devices by passively listening for their time broadcasts on the CAN bus (no extra scan time needed — runs in parallel). A pin icon appears in the device card header of the **e3oncan datapoints** page for each detected device.

This step is not strictly mandatory for read-only use, but it is **strongly recommended** – and **required** if you want to write to any data point.

**Save data point values to object tree during scan**

By default the scan also writes the current value of each data point into the object tree (`json`, `raw`, `tree` states). You can adjust the behavior using the option **Save data point values ​​in the object tree during scan** above the scan button. If this option is disabled, the adapter updates values and metadata for already existing data point objects, but does not create new ones – those are created automatically the first time data is received after the scan.

This option is useful if you want to avoid a large number of state writes during the scan (e.g. on systems with many devices). If you previously ran a scan with values stored and now want a clean slate, you can safely delete any device's `json`, `raw`, or `tree` sub-objects from the ioBroker object tree — the adapter will recreate them automatically when it next receives data. **Note:** Deleting a large number of objects at once causes ioBroker to fire many internal events simultaneously, which can briefly spike RAM usage. Delete in small batches if your system is under memory pressure.

> **Note on history adapters:** Deleting objects does **not** delete the historical data stored by a history adapter (History, InfluxDB, SQL). The recorded values remain in the adapter's backend and reappear in charts once the state ID is re-created. However, the history subscription configuration (the "enabled" flag on the object) is lost when an object is deleted and must be re-enabled manually on the new object.

> **Warning:** Never delete the `info` channel (e.g. `e3oncan.0.info`). It holds scan results, energy meter detection, delays, active flags, bus topology summaries, and the CAN connection state. Deleting it will cause loss of configuration that cannot be automatically recovered.

**Bus topology analysis**

After the scan completes, the adapter automatically generates a bus topology summary and stores it in two states in the `info` channel: `info.topology` (JSON) and `info.topologyHtml` (HTML). See [Bus topology analysis](#bus-topology-analysis) below for details.

After the scan, browse and manage the discovered data points using the **e3oncan datapoints** page (see [below](#e3oncan-datapoints-tab)).

### Step 4 – Assignments and schedules

The recommended way to configure read schedules and per-device Collect mode is the **e3oncan datapoints** page (see [below](#e3oncan-datapoints-tab)).

**Energy meters**

If the device scan detected E380 or E3100CB energy meters, a card for each detected meter appears in the **e3oncan datapoints** page. Activate collecting with the **Collect** toggle on the card. Use the **Delay (s)** field to set the minimum interval between value updates in ioBroker. The default of 5 seconds is recommended — energy meters transmit more than 20 values per second, and setting this to 0 will put significant load on ioBroker.

Press **Save & Close** when done. Check the object tree to verify that data is being collected.

---

## Bus topology analysis

After the data point scan, the adapter analyses all bus topology data collected during the scan and stores the result in two states in the `info` channel:

| State | Role | Content |
|---|---|---|
| `info.topology` | `json` | Structured JSON: list of UDS-accessible devices and all topology elements, deduplicated across all topology matrices |
| `info.topologyHtml` | `html` | Rendered HTML table, color-coded by bus type, with a **UDS** badge on devices that are also UDS-accessible |

**Displaying the HTML table**

The easiest way to display the topology in ioBroker is to use a dashboard tool that can render HTML states:

- **jarvis**: Add a **stateHTML** widget → select `e3oncan.x.info.topologyHtml`.
- **vis / vis2**: Add a **basic – String (unescaped)** or **HTML** widget → select `e3oncan.x.info.topologyHtml`.

> **Note:** The `info.topology` and `info.topologyHtml` states may be too large for the standard ioBroker admin state editor dialog to display. This is a known limitation of the admin UI for large string states. The states are written correctly and can be consumed normally by scripts and widgets.

---

## e3oncan datapoints tab

The **e3oncan datapoints** page is the primary place for browsing data points and configuring UDSonCAN read schedules and per-device Collect mode. It opens in a new browser tab when you click the **Datapoints** link button in the adapter's instance row in the ioBroker admin instances view.

**Browsing data points**

All devices and any detected energy meters are shown as expandable cards, starting collapsed so you get an overview of your whole system at a glance. Click a card header to expand it. The search box filters by name or ID, and matching cards are expanded automatically.

If a data point scan has not been performed yet for a device, a warning banner is shown at the top of the page as a reminder. If a scan has been done but the Collect auto-detection introduced in v1.x has not yet run, an info banner recommends running a new data point scan. This hint can be permanently dismissed per instance with the **Don't show again** button.

**Device cards**

Each device card lists its data points with ID, name, codec, and schedule settings. The Collect toggle and min. update time appear in the card header. If Collect traffic from the device was detected during the data point scan, a green pin icon is shown in the card header as a confirmation. If any data points are scheduled, a green **N scheduled** badge appears — click it to expand the card and show only the scheduled data points. Click the badge again to remove the filter; clicking the card header removes the filter and collapses or fully expands the card, depending on whether the badge had opened it.

**Energy meter cards**

If energy meters were detected during the device scan (see [Step 2](#step-2--device-scan-and-energy-meter-detection)), a card for each detected meter appears at the top of the page. Use the **Collect** toggle to activate data collection, and the **Delay (s)** field to set the minimum interval between value updates in ioBroker.

**Scheduling**

For each data point you can:
- Check **On start** – the data point is read once when the adapter starts.
- Enter an **Interval (s)** – the data point is read repeatedly at that interval.

Both options can be combined. Use the schedule filter (All / On Start / Interval) to quickly focus on already-scheduled data points.

**Topology**

The **Topology** button in the toolbar opens the bus topology diagram in a modal dialog. The diagram is generated automatically after each data point scan (see [Bus topology analysis](#bus-topology-analysis)). The button is disabled until topology data is available.

**Saving**

Press **Save** to apply your changes without closing the tab. **Save & Close** saves and closes the tab, returning you to the instances view. **Discard & Close** closes the tab without saving — no adapter restart is triggered. An **Unsaved changes** badge appears whenever there are pending changes.

> **Note:** When saving, the schedules for all devices shown in this tab are rebuilt from the current UI state. Schedules for devices not listed here (e.g. added directly in the adapter configuration dialog) are preserved unchanged. If the same device has schedules in both places, the datapoints tab wins on save. Duplicate entries are removed automatically.

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

For detailed information about how data points are structured, how variant data points and metadata work, and how temperature/date/time formats are handled, please refer to [data-points.md](lib/data-points.md).

---

## Energy meters

Energy meters are detected automatically during the device scan. No manual configuration is needed. The adapter assigns a state name in ioBroker's object tree based on where each meter was found:

| Channel | CAN address | State name |
|---|---|---|
| UDS CAN | 98 | `e380` |
| UDS CAN | 97 | `e380_97` |
| 2nd CAN | 98 | `e380_98` |
| 2nd CAN | 97 | `e380_97` |

`e380` (without suffix) is used for CAN address 98 on the UDS CAN channel to preserve backward compatibility with existing installations. `e3100cb` is always used for the E3100CB.

The collect delay (default 5 s) can be adjusted per meter type in the **e3oncan datapoints** page. Changes take effect after the adapter restarts.

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
- Vitocal / HPMUMASTER (Collect ID `0x693`, internal CAN bus)
- Vitocharge VX3 and Vitoair / EMCUMASTER (Collect ID `0x451`, external and internal CAN bus)

The Collect CAN IDs are assigned automatically based on the UDS device name during the device scan. A device not listed above will not have a Collect ID assigned automatically; it can be entered manually in the adapter configuration.

**Can I use open3e at the same time?**

Yes, with conditions. If you only use Collect mode in this adapter, open3e can run alongside it without any restrictions. If you use UDSonCAN here, do not run open3e for the same devices simultaneously – this causes sporadic communication errors in both applications.

**The adapter stopped working after a Node.js upgrade. What do I do?**

From adapter version 1.0.3, the native CAN module (socketcan) uses N-API and no longer requires rebuilding after a Node.js upgrade. If you are running an older version, upgrade the adapter first. If the problem persists after upgrading, please open an issue.

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
* (MyHomeMyData) Fixed missing update of meta data (unit, description) when user changes device specific data point definition

### 1.1.1 (2026-07-06)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20260705 (common)
* (MyHomeMyData) Fixed duplicate display of variant data points in data point list of WebUI

### 1.1.0 (2026-07-05)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20260701 (common) and 20260630 (variant)
* (MyHomeMyData) Added codec `O3ESwitch` for device-dependent data point structures selected by a discriminator byte
* (MyHomeMyData) Added optional `decimals` parameter to numeric codecs to round decoded values
* (MyHomeMyData) Added update of meta data during startup, when structure of data point has changed

### 1.0.3 (2026-06-02)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20260528 for common and 20260527 for variant data points; For details see this [changelog](lib/data-points.md#changelog-of-data-point-definitions)
* (MyHomeMyData) Suppress spurious variant-did warning when common dict covers the length
* (MyHomeMyData) User-defined variant data point structures in `udsDidsSpecific` can now be protected from automatic updates by adding `"protected": true` (and an optional `"reason"` text) to the entry; see [documentation](lib/data-points.md#user-defined-data-point-structures-in-udsdidsspecific)
* (MyHomeMyData) Updated socketcan dependency to 4.2.1 (N-API) — the native CAN module no longer needs to be rebuilt after a Node.js upgrade

### 1.0.2 (2026-05-17)
* (MyHomeMyData) Improved error message when native module socketcan fails to load after a Node.js version upgrade — adapter now logs a clear hint to run `iob rebuild`

### 1.0.1 (2026-05-11)
* (MyHomeMyData) Clicking the green scheduled badge on a device card filters the view to show only its scheduled data points; clicking the badge again or the card header restores the full view
* (MyHomeMyData) Fixed: saving from the datapoints tab now preserves inactive schedules (disabled in the old config UI) for full backward compatibility

### 1.0.0 (2026-05-06)
* (MyHomeMyData) Adapter requires node.js >= 22 now
* (MyHomeMyData) Improved scan status detection: uses `udsDidsWritable` instead of `didsMetaDict` to reliably detect whether a data point scan has been performed
* (MyHomeMyData) Added re-scan recommendation hint in datapoints tab when a scan exists but Collect auto-detection has not yet been run

### Older versions

Older changelog entries are available in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

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
