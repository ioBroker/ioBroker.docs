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

**If you like this project and want to support its development, feel free to drop a tip here: https://paypal.me/TJahnke**

## Acknowledgements & History

This project builds upon the preliminary work of existing open-source projects. Special thanks go to:

- **[Bouni](https://github.com/bouni/luxtronik-2):** Whose pioneering work and code developments form the essential foundation for communication with Luxtronik controllers.
- **[Coolchip](https://github.com/coolchip/luxtronik2):** For the fundamental reverse engineering of the Luxtronik network protocol.
- **[UncleSamSwiss](https://github.com/UncleSamSwiss/ioBroker.luxtronik2):** For the original ioBroker adapter.
- **[BenPru](https://github.com/BenPru/luxtronik) & rhammen:** A special thanks to BenPru and rhammen for their continuous further development regarding the access and control of the Luxtronik controller. Without their dedication, efforts, and ideas, this adapter would not have reached the advanced state it is in today. _(If you appreciate their work, feel free to buy them a coffee! ☕) [BenPru](https://github.com/sponsors/BenPru) [rhammen](https://github.com/sponsors/rhammen)_

> **💡 No LAN cable near your heat pump? No problem!**
> If your Luxtronik 2.0 controller only has a free USB port instead of a nearby network socket, you can easily connect it via Wi-Fi using the clever **USB 2.0 powered WiFi/Ethernet Bridge** project by _obermolch_. It powers itself directly from the controller's USB port and bridges the connection wirelessly without extra wall power supplies.
> Check out the full guide and community discussion here: [ioBroker Forum: USB 2.0 powered WiFi/Ethernet Bridge für Luxtronik 2.0](https://forum.iobroker.net/topic/85773/usb-2-0-powered-wifi-ethernet-bridge-f%C3%BCr-luxtronik-2-0).

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

## Changelog
### 0.24.0 (2026-11-09)

**🐛 Bugfixes & Tweaks**

- **Operating Mode & Write Protection (`jsonConfig.json`, `main.ts`):**
    - **Explicit Operating Mode Selection:** Added a central "Operating Mode" selector in the Connection tab with color-coded status banners to clearly distinguish between **Read-Only (Monitoring)**, **Read & Write without Modbus (Native via Port 8889)**, and **Read & Write with Modbus TCP (Hybrid RAM access)**.
    - **Dynamic UI Locking:** When "Read-Only" is selected, all write-related configuration tabs (Modbus, Idle Defaults, Cycle Optimization, HUP, ZIP, and PV Surplus) and their inputs are automatically grayed out and disabled. Selecting native write mode unlocks the optimization tabs while keeping the Modbus tab disabled.
    - **Strict Backend Write Lock:** Enforced a global hardware write lock in Read-Only mode across `onReady`, `syncConfigValue`, `runOptimizationSchedule`, and `onStateChange` (while keeping diagnostic functions like debug logging, raw dumps, and firmware checks active).
    - **Automatic Config Migration:** Existing installations are seamlessly migrated on startup to the matching operating mode based on their previously active Modbus and optimization settings.

### 0.23.2 (2026-11-07)

- **COP & Efficiency Calculation (`copManager.ts`):**
    - **Isolated Counter Tracking:** Introduced dedicated reference states for Total, Heating, and Hot Water counters (`last_raw_power_*` and `last_raw_thermal_*`). Each counter is now compared strictly against its own previous value, completely preventing cross-mode "ghost deltas" and astronomical COP spikes during cycle transitions.
    - **Automatic Total-Delta Fallback:** Added seamless fallback detection for controllers with firmware bugs (e.g., Novelan LAV) where mode-specific counters like `energy_warmwater` remain permanently at `0`. If a specific counter reports a delta of `0` during an active cycle, the adapter automatically uses the live delta of the corresponding total counter (`energy_total` / `thermalenergy_total`) without requiring manual configuration workarounds.

### 0.23.1 (2026-11-07)

- **COP & Efficiency Calculation Fix (`copManager.ts`):**
    - **Fixed Astronomical COP Values:** Resolved a critical bug where the internal calculation logic switched between specific and total energy counters, causing massive "ghost deltas" and resulting in astronomical COP values (e.g., > 1000).
    - **Restored Robust Routing:** The adapter now strictly and safely relies on the continuous total counters (`energy_total` and `thermalenergy_total`). It calculates the delta over the polling interval and dynamically routes it into the Heating or Hot Water buckets based on the active operating state.
    - _Note:_ Users facing the hardware bug where the heat pump does not track DHW power internally should select "External Object ID" in the adapter settings and link their `energy_total` datapoint as a workaround.

### 0.23.0 (2026-11-07)

**🐛 Bugfixes & Tweaks**

- **Configuration & Baseline Logic:**
    - **Custom Heating Offset Baseline:** Added a new configuration field in the "Idle Defaults" tab for the default heating target temperature offset (Parallelverschiebung)[cite: 10].
    - **Preserved Baselines:** The idle reset mechanism (`main.ts`) and the PV surplus manager (`pvManager.ts`) now respect this custom baseline (e.g., +1 K) instead of hard-resetting the offset to `0 K`[cite: 7, 13]. This ensures that your manual baseline heating curve is perfectly preserved when returning from a PV boost or entering standby.

### 0.22.8 (2026-11-07)

**🐛 Bugfixes & Tweaks**

- **COP & Efficiency Calculation (`copManager.ts`):**
    - **Hot Water Hardware Bug Fallback:** Added a dynamic fallback mechanism to bypass a hardware bug present in several Luxtronik and Novelan firmwares where the internal electrical meter for hot water (`energy_warmwater`) permanently reports `0`.
    - **Smart Delta Routing:** When the heat pump is actively generating hot water (`WP_BZ_akt === 1`), the COP manager now checks if the internal DHW power meter is stuck at zero. If so, it automatically intercepts the delta from the total energy meter (`energy_total`) over the last polling interval and securely routes it into the Hot Water COP bucket.
    - **Continuous Standby Sync:** Enhanced the database tracking to ensure the total energy fallback counter is continuously synced even during standby or heating modes. This prevents idle power consumption from accumulating in the background and falsely distorting the next hot water efficiency calculation.

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