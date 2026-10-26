---
chapters: {"pages":{"en/adapterref/iobroker.luxtronik2-controller/README.md":{"title":{"en":"ioBroker.luxtronik2-controller"},"content":"en/adapterref/iobroker.luxtronik2-controller/README.md"},"en/adapterref/iobroker.luxtronik2-controller/documentation/readme_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.luxtronik2-controller/documentation/readme_de.md"},"en/adapterref/iobroker.luxtronik2-controller/documentation/readme_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.luxtronik2-controller/documentation/readme_en.md"}}}
---
<img src="admin/luxtronik2-controller.png" alt="Projekt Logo" width="20%">

# ioBroker.luxtronik2-controller

[![NPM version](https://img.shields.io/npm/v/iobroker.luxtronik2-controller.svg)](https://www.npmjs.com/package/iobroker.luxtronik2-controller)
[![Downloads](https://img.shields.io/npm/dm/iobroker.luxtronik2-controller.svg)](https://www.npmjs.com/package/iobroker.luxtronik2-controller)

[![NPM](https://nodei.co/npm/iobroker.luxtronik2-controller.png?downloads=true)](https://nodei.co/npm/iobroker.luxtronik2-controller/)

**Tests:** ![Test and Release](https://github.com/TbsJah/ioBroker.luxtronik2-controller/workflows/Test%20and%20Release/badge.svg)

## luxtronik2-controller adapter for ioBroker

This ioBroker adapter enables the local control, optimization, and monitoring of heat pumps with [Luxtronik 2.x / 3.x controllers](https://www.alpha-innotec.com/en/products/accessories/control/luxtronik) (e.g., Alpha Innotec, Novelan). The adapter is written entirely in TypeScript.

## Acknowledgements & History

This project builds upon the preliminary work of existing open-source projects. Special thanks go to:

- **[Bouni](https://github.com/bouni/luxtronik-2):** Whose pioneering work and code developments form the essential foundation for communication with Luxtronik controllers.
- **[Coolchip](https://github.com/coolchip/luxtronik2):** For the fundamental reverse engineering of the Luxtronik network protocol.
- **[UncleSamSwiss](https://github.com/UncleSamSwiss/ioBroker.luxtronik2):** For the original ioBroker adapter.
- **[BenPru](https://github.com/BenPru/luxtronik) & rhammen:** A special thanks to BenPru and rhammen for their continuous further development regarding the access and control of the Luxtronik controller. Without their dedication, efforts, and ideas, this adapter would not have reached the advanced state it is in today. _(If you appreciate their work, feel free to buy them a coffee! ☕) [BenPru](https://github.com/sponsors/BenPru) [rhammen](https://github.com/sponsors/rhammen)_

**Innovations in this version:**
The `luxtronik2-controller` natively integrates both classic TCP communication (Port `8888` / `8889`) and modern WebSockets (Port `8214` for firmware > V3.81), combined with an optional **Hybrid Modbus TCP** engine (Port `502`) for wear-free RAM writes. Additionally, it features intelligent cycle optimization, dynamic pump control, hardware flash-wear protection, COP/JAZ efficiency tracking, PV-management and automated datapoint management.

### Features

- **Native TCP & WebSocket Communication:** Direct connection to the heat pump via classic TCP (`8888` / `8889`) or WebSockets (`8214`) without external protocol overhead.
- **Hybrid Modbus TCP Support (0% Flash Wear):** Write volatile parameters (target temperatures, heating curves, operating modes) and coils/switches directly into the controller's RAM via Modbus TCP (Port `502`) without wearing out the internal EEPROM flash memory, while continuing to read full telemetry via the native port. Active Modbus states are automatically tagged with `(Modbus)` in the object tree.
- **Hardware & EEPROM Flash Protection:**
    - **Read-Before-Write Cache:** Intercepts and blocks redundant write commands if the controller parameter is already at the target value.
    - **Flash Write Counters:** Transparently tracks daily (`write_cycles_today`) and cumulative (`write_cycles_total`) EEPROM write operations.
    - **Idle Defaults & Interactive Heat Curve:** Automatically restores safe baseline settings when the heat pump enters standby, featuring a live interactive SVG heat curve preview in the Admin UI.
    - **Firmware `.90` Crash Shield:** Automatically detects buggy manufacturer firmwares (`V1.90` / `V2.90`) and blocks network writes to prevent hardware crashes.
- **COP & JAZ (Efficiency Calculator):** Calculate and track heat pump efficiency directly within the adapter (_Today_, _Last 7 Days_, _Current Month_, _Current Year_), automatically split into _Heating_, _Hot Water_, and _Total_. Supports internal Luxtronik counters or high-precision external meters (e.g., Shelly 3EM, M-Bus heat meters) with persistent database storage (`hidden.cop_buckets`) and anti-flapping zero-drop protection.
- **Compressor Protection (Cycle Optimization):** Intelligently links heating and domestic hot water (DHW) cycles to prevent unnecessary compressor stops and starts.
- **Dynamic HUP Control (with Auto-PWM Detection):** Automatically scales the 0–10V control voltage of the heating circulation pump (HUP) based on the supply/return temperature spread. PWM-controlled pumps are automatically detected and bypassed.
- **Smart 3-Way Circulation Pump (ZIP) Control:**
    - Choose intuitively between **Internal Luxtronik Controller**, **External Actor** (e.g., Shelly with 0% flash wear), or **Modbus TCP (Coil 7)**.
    - Trigger circulation on-demand via ioBroker motion sensors/buttons (with anti-cycling cooldown) or synchronously during hot water generation.
    - Includes live virtual status (`Virtual_ZIP_Status`) and a real-time remaining runtime countdown in seconds (`Virtual_ZIP_Remaining_Time`).
- **Integrated Actions (Macros):** Pre-defined triggers for forced heating (`Zwangsheizen`), forced hot water (`Zwangswarmwasser`), circulation (`Activate_Zip`), manual default resets (`Setze_Vorgabewerte`), and full raw data dumps (`Dump_Raw_To_Log`).
- **Smart Object Management & Visibility Filter:** Queries hardware visibility flags (Command `3005`) on startup to automatically hide unsupported system components (e.g., cooling, solar, ventilation, or uninstalled mixing circuits). Deselected categories, datapoints, and empty folders are cleanly removed on restart.
- **Custom Datapoints:** Flexibly add custom telemetry values (Index `3004`) and writable parameters (Index `3003`) via the Admin UI, including custom scaling factors, units, and automatic Unix timestamp formatting.
- **Extended Status Texts & Calculations:** Live calculation of temperature spread, thermal/electrical energy sums, and translated clear-text system states (including heating offsets, frost protection, and cooling status in German or English).
- **Intelligent Notification System:** Dispatches error logs, connectivity alerts, and critical shutdowns (such as water flow rate issues) to **Telegram** and the **ioBroker Notification Center** – including a 60-minute anti-spam cooldown and a live test button.
- **Automated DTA Backup:** Manual one-click links and scheduled Cron downloads of internal `.dta` diagnostic logs directly from the heat pump to `0_userdata.0/luxtronik_backups` for analysis in tools like _OpenDTA_.
- **Broad Compatibility:** Full support for older (V1.x / V2.x) and newer (V3.x) firmware generations using dynamic scaling factors and adaptive write-queue timing.
- **PV Surplus Management (PV-Ready):** Fully integrated, automated solar surplus control. Uses your live grid feed-in to intelligently raise heating and/or hot water setpoints (wear-free via Modbus TCP).
    - **Dynamic Sequence Priority:** Continuously monitors live temperatures and intelligently reroutes power between hot water and heating once the prioritized target reaches saturation.
    - **Hysteresis & Smart Timers:** Customizable start/stop delays and a dedicated stop threshold (Schmitt trigger logic) prevent self-cancelling feedback loops when the heat pump starts consuming the surplus.
    - **Battery Prioritization:** Optionally includes your home battery's charging power in the surplus calculation, treating the heat pump as the primary thermal battery.
    - **Hardware Cycle Protection:** Intelligently waits for an active heating or hot water cycle to naturally finish before reverting setpoints after the sun disappears, protecting the compressor.

## ⚠️ Warning

Some settings provided by this integration can affect the performance of your heat pump. Misconfigurations can cause the controller to enter a fault state, which requires a manual on-site reset.

This project aims to protect your heat pump by restricting the configuration options to safe values. However, no guarantees can be made. Please be careful, consult your Luxtronik manual, and do not change any settings that you do not fully understand.

## 🔧 Compatibility

The integration allows you to monitor and control heat pumps with a Luxtronik2 controller. It works locally without internet access.
It was and is being tested with an LWD50A (LD5) from Alpha Innotec.
It is used by manufacturers such as:

- Alpha Innotec,
- Siemens,
- Novelan,
- Roth,
- Elco,
- Buderus,
- Nibe,
- Wolf Heiztechnik.

## ⚠️ Disclaimer ⚠️

_This project is not affiliated with Alpha Innotec, Novelan, ait-deutschland GmbH, or any other company. It is a personal project that is maintained in spare time. Use at your own risk._

## Reporting Bugs & Contributing

Bug reports, compatibility notes for specific firmware versions, or feature requests can be submitted via the issue tracker in the [GitHub-Repository](https://github.com/TbsJah/ioBroker.luxtronik2-controller/issues).

## Installation

**Note for Raspberry Pi / ARM users:**
You might see red error messages in the installation log related to `node-gyp`, `serialport`, or `usocket`. These are optional dependencies and can be completely ignored. The network-based control (TCP) of the Luxtronik will still work without any issues.

## Information

[Info Deutsch](/#/docs/adapterref/iobroker.luxtronik2-controller/documentation/readme_de.md)

[Info English](/#/docs/adapterref/iobroker.luxtronik2-controller/documentation/readme_en.md)
//### **WORK IN PROGRESS**

### 0.22.0 (2026-10-26)

**🐛 Performance & Tweaks**

- **Modbus Queue & Socket Protection:** Added a sequential operation queue (mutex) with a 50ms socket release delay in `ModbusManager` to prevent TCP port 502 connection collisions when polling and event-driven writes occur simultaneously.
- **COP Database Optimization:** Added an in-memory object cache (`ensuredObjects`) to `copManager`, eliminating redundant `setObjectNotExistsAsync` database calls during every polling cycle.
- **DTA Backup & Firmware Check Improvements:** Added a 30-second request timeout (`AbortSignal.timeout`) and proper `dta_history` file naming on fallback to `backupManager`, and expanded the version regex in `updateManager` to support `F1.`, `WWB`, and `smo` firmware strings.

### 0.21.1 (2026-10-26)

**🐛 Bugfixes & Tweaks**

- **PV Manager Target & Offset Fixes:** Fixed remaining references to the read-only `Wamwassertemperatur_Soll` datapoint in `activateBoost` and `deactivateBoost` (now consistently targeting `temperature_hot_water_target`). Resolved a baseline mix-up where `fusspunkt` was mistakenly applied to the parallel offset (`heating_temperature`), and fixed the heating saturation check (`isHzFull`) to compare actual return temperature against target return + hysteresis without prematurely revoking active boosts.
- **Cycle Optimization & Heating Limit:** Replaced the language-dependent `'Heating limit'` string check during idle with a reliable numerical evaluation of the heating limit parameters. Added a `!pvIsBoostActive` guard to prevent forced hot water triggers from overwriting active solar boosts, and included a baseline reset (`0 K`) for `heating_temperature` in `setIdleDefaults`.
- **ZIP Controller Timer Fix:** Fixed a bug in `zipManager` (internal controller mode) where hot water timer slots (`WW_MoSo_...`) were backed up and overwritten instead of the circulation pump timer slots (`Zirkulation_MoSo_...`), and improved time string restoration.
- **COP Calculation Accuracy:** Fixed a UTC timezone offset in the daily rollover check so COP snapshots occur accurately at local midnight (00:00). Included defrosting cycles (`WP_BZ_akt = 4`) in the heating COP bucket and added clamping against negative deltas if external energy meters are reset.
- **Object Management & Virtual States:** Removed a redundant loop in `onReady` that recreated disabled virtual datapoints on startup, and fixed `PREFIX_MAPPING` for weekend timer tables (`SaSo`) to properly reference the `52SatSun` configuration flags.

### 0.21.0 (2026-10-26)

**🚀 New Features**

- **PV Surplus Management (PV-Ready):** Introduced a fully integrated, automated PV surplus control system.
- **PV Hysteresis Control:** Added a dedicated stop threshold (`pv_threshold_stop`) to the PV surplus manager. This prevents the heat pump from cancelling its own boost cycle by consuming the solar surplus (feedback loop). The system now supports independent start and stop boundaries (Schmitt trigger logic).
- **Dynamic Setpoint Boost:** Automatically raises hot water and heating setpoints (wear-free via Modbus RAM) based on your current grid feed-in.
- **Smart Timers:** Includes customizable start and stop delay timers to prevent compressor short-cycling during variable cloud cover.
- **Cycle Protection:** Added a "finish cycle" safety feature. If the solar surplus drops, the adapter intelligently waits for an active heating or hot water cycle to finish before reverting the setpoints, protecting the compressor hardware.
- **PV Telemetry:** Added three new virtual datapoints under `Information.17_PV_Surplus` (`pv_boost_active`, `pv_boost_active_since`, and `pv_boost_last_activation`) to make the current surplus control status transparently available for external ioBroker visualizations.
- **Battery Prioritization (PV):** Added an optional feature to include your home battery's charging power into the PV surplus calculation. This allows you to treat the heat pump as the primary thermal battery, intercepting the solar power to heat up the house or hot water _before_ it flows into your chemical battery.

**🐛 Bugfixes & Tweaks**

- **Cycle Optimization vs. PV Logic:** Fixed an edge-case bug where a temporary high target temperature from the cycle optimization module leaked into the PV surplus manager if the heat pump skipped the standby/idle state. The adapter now explicitly resets cross-cycle targets and forces the PV manager to reference the secure baseline configuration limits.
- **Modbus Stability:** Fixed a critical race condition in the Modbus manager. Concurrent read and write operations no longer share a single global client, preventing connection collisions and adapter crashes during hybrid mode operations.
- **API Modernization:** Replaced deprecated `setStateAsync` calls in the PV manager with the modern Promise-based `setState` API to comply with the latest ioBroker adapter guidelines and resolve TypeScript warnings.
- **Unit Conversion:** The PV feed-in datapoint now natively supports kilowatts (kW) via a new toggle in the configuration UI, automatically converting it to Watts internally.
- **Admin UI Polish:** Replaced HTML-based information blocks in the configuration UI with native ioBroker JSON components to bypass React XSS-filtering issues and ensure clean rendering.

### 0.20.4 (2026-10-24)

**🔧 Maintenance & Compatibility**

- **Node.js Requirement:** Updated minimum Node.js requirement to `>= 22` in `package.json` and `io-package.json` to meet current adapter standards.

### 0.20.3 (2026-10-24)

**🔧 Maintenance & Compatibility**

- **Node.js Requirement:** Updated minimum Node.js requirement to `>= 22` in `package.json` and `io-package.json` to meet current adapter standards.

## License

MIT License

Copyright (c) 2026 TbsJah <github.tbsjah@googlemail.com>

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