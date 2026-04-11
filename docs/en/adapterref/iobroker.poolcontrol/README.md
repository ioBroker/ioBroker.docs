# ioBroker.poolcontrol

![Test and Release](https://github.com/DasBo1975/ioBroker.poolcontrol/actions/workflows/test-and-release.yml/badge.svg)
![npm](https://img.shields.io/npm/v/iobroker.poolcontrol?color=blue)
![Downloads](https://img.shields.io/npm/dm/iobroker.poolcontrol)
![Installs](https://iobroker.live/badges/poolcontrol-installed.svg)
![Stable](https://iobroker.live/badges/poolcontrol-stable.svg)
[![License](https://img.shields.io/github/license/DasBo1975/ioBroker.poolcontrol?cacheSeconds=3600)](https://github.com/DasBo1975/ioBroker.poolcontrol/blob/main/LICENSE)

---

## Description

The adapter ioBroker.poolcontrol is used for controlling and monitoring pool systems.
It enables automation of pump, temperature, and solar control as well as energy consumption analysis.

---

## Features

- **Pump Control**
  - Operating modes: Automatic, Automatic (PV), Manual, Time Control, Off
  - Automatic (PV) controls the pump depending on photovoltaic surplus
  - Error detection (no power consumption, power despite “OFF”, overload)
  - Safety functions (frost protection, overheating protection)
  - Pump power recommendation for variable-speed pumps
  
- **Temperature Management**
  - Up to 6 sensors (surface, bottom, flow, return, collector, outside temperature)
  - Daily minimum / maximum
  - Hourly change
  - Differences (e.g., collector – air, surface – bottom, flow – return)

- **Solar Control**
  - On/off thresholds with hysteresis
  - Collector warning (with automatic reset at 10% below threshold)
  - Optional speech output on warning

- **Heating / Heat Pump Control (new, test phase)**
  - Automatic control of heating rod or heat pump based on pool temperature
  - Target temperature and maximum safety temperature configurable
  - Active only when:
    - pool season is active
    - pump mode **Automatic**
    - maintenance mode is not active
  - Priority logic:
    - Maintenance mode fully blocks heating control
    - Heating does not interfere with manual or time-based pump modes
  - Configurable pump overrun time after heating ends
  - Ownership protection:
    - The pump is only switched off if it was previously switched on by the heatHelper itself
  - Supports:
    - switchable sockets **or**
    - boolean control states of external heating systems
  - Internal status and diagnostic section under `heat.*`
  - Purely controlling, **no chemistry or solar logic**
  
  **Note:**  
  This function is currently in a **test phase**.  
  The logic is fully implemented but should initially only be used by interested test users.

- **Photovoltaic Control (since v0.6.0)**
  - Automatic pump control based on PV generation and household consumption
  - Start logic: surplus ≥ (pump rated power + safety margin)
  - Optional overrun during cloudy phases
  - Ignore if daily circulation target reached
  - Configuration via two foreign object IDs (power_generated_id, power_house_id)
  - New pump mode “Automatic (PV)”

- **Time Control**
  - Up to 3 freely configurable time windows per week

- **Runtime & Circulation**
  - Counts runtime (today, total)
  - Calculates daily circulation and remaining volume
  - Backwash reminder with configurable interval (e.g., every 7 days)
  - Display of last backwash including date
  - Automatic reset after completed backwash
  - PV mode considers circulation status (e.g., “Ignore when circulation reached”)

- **Consumption & Costs**
  - Evaluation of an external kWh meter
  - Daily, weekly, monthly and yearly consumption
  - Calculation of electricity costs based on configurable price  

**Note:**  
Details about the behavior of consumption and cost values (e.g., after restarts or when changing the electricity meter) can be found here:  

- [Documentation (English)](https://github.com/DasBo1975/ioBroker.poolcontrol/blob/main/docs/en/help.md)  
- [Dokumentation (Deutsch)](https://github.com/DasBo1975/ioBroker.poolcontrol/blob/main/docs/de/help.md)

- **Statistics System**
  - Section `analytics.statistics.*` with daily, weekly and monthly values
  - Automatic calculation of min, max, average and runtime values
  - Fully persistent data points (overinstall protection)
  - HTML and JSON summaries per sensor and overall overview

- **Pressure Sensor Integration (since v0.7.x)**
  - Real-time filter pressure measurement
  - Trend analysis: rising / falling / stable
  - Moving learning average (avg_bar)
  - Self-learning min/max pressure values
  - Diagnostic text + last update
  - No automatic control – purely informational
  - Normal pressure range configurable by the user

- **AI System (from v0.8.0)**
  - Modules: Weather hints (Open-Meteo), pool tips, daily summary, weekend report
  - Automatic text outputs with optional speech output
  - Hourly weather updates for continuous refresh
  - Anti-spam system to avoid duplicate hints
  
  - **Forecast for Tomorrow (aiForecastHelper, from v0.8.0)**
    - Automatically creates a daily weather forecast for the next day
    - Analysis of temperature, weather situation, rain probability and wind strength
    - Generates pool recommendations for the following day (e.g., close cover, little solar heat expected)
    - Fully event-based and only requires Open-Meteo data from ioBroker geodata
    - Separate switches under `ai.weather.switches.*` to enable/disable individual forecast functions
    - Results stored under `ai.weather.outputs.forecast_text`

  - **Chemistry Help (aiChemistryHelpHelper, from v0.8.x)**
    - Interactive, purely informative AI help for water chemistry
    - Selection of typical pool problems via selection field (e.g., pH too high/low, chlorine ineffective, green/cloudy water)
    - Clear cause and solution descriptions as text output
    - No automatic dosing
    - No product recommendations
    - No device control
    - No speech output (purely visual information)
    - Goal: understand causes and proceed systematically (measure → correct → filter → measure again)
    - Data points under `ai.chemistry_help.*`

- **Info System (since v0.7.x)**
  - Adapter information system
  - Seasonal greetings (Christmas, New Year’s Eve, New Year, Easter)
  - Display of installed adapter version
   
- **Speech Outputs**
  - Output via Alexa or Telegram
  - Announcements on pump start/stop, errors or temperature thresholds

- **SystemCheck (Diagnostic Section)**
  - Internal diagnostic section for debug and monitoring functions
  - Selection of area to monitor (e.g., pump, solar, temperature)
  - Continuous log of the latest changes
  - Manual log clearing possible

  This section is used exclusively for analysis and troubleshooting.  
  In normal operation, monitoring should remain disabled.

---


## Configuration

Configuration is done via tabs in the Admin interface:
- **General** → Pool name, pool size, minimum circulation  
- **Pump** → Pump power, power limits, safety functions  
- **Temperatures** → Selection and object IDs of sensors  
- **Solar Management** → On/off thresholds, hysteresis, warning threshold  
- **Time Control** → Time windows for pump operation  
- **Speech Outputs** → Activation, Alexa/Telegram integration  
- **Consumption & Costs** → external kWh meter, electricity price  

---

## Planned Extensions

- Extended PV and solar efficiency analysis (COP calculation, daily benefit, weather integration)
- Statistics export function (CSV/Excel)
- Diagnostic helper for automatic system checks
- Own widgets for VIS/VIS2 (graphical pool and solar visualization)
- Control of pool lighting, valves and counter-current systems
- Integration of additional sensor boxes (e.g., TempBox, PressureBox, LevelBox)
- AI and voice assistant extension (pool daily report, tips, voice commands)

---

## Note

The adapter is under active development.  
New features are added regularly – please refer to the changelog.

---

## Documentation
- [help.md (detailed description and notes)](./help.md)

---

## Changelog

## 1.2.19 (2026-04-10)

- Fixed an interaction issue between `photovoltaicHelper` and `controlHelper` where automatic follow-up pumping could be stopped unexpectedly
- photovoltaicHelper now respects controlHelper priority and no longer stops the pump while automatic follow-up pumping is active
- Fixed an issue where `controlHelper` could remain in "nachpumpen" state if the pump was stopped externally
- `photovoltaic.threshold_w` is now correctly synchronized with the instance configuration
- Changes to the PV surplus threshold in adapter settings are now reliably reflected in the corresponding read-only datapoint

### 1.2.18
Release: 07.04.2026
- Fixed persistence issue for `status.season_active` (no longer overwritten on adapter start)
- Improved persistence for frost protection settings

### 1.2.17
Release: 07.04.2026
- Fix: Resolved an issue where the pressure learning reset button did not trigger reliably. The pumpHelper4 now explicitly subscribes to its relevant internal states to ensure proper event handling.

### 1.2.15
Release: 22.03.2026
- Fix i18n usage (replace I18n.t with I18n.translate) to resolve adapter startup crash and restart loop on certain systems.

### 1.2.14
Release: 22.03.2026
- ### add i18n support for chemistry help texts

### 1.2.13
Release: 22.03.2026
- Added multilingual state names and descriptions (DE/EN)
- Improved consistency of all state texts
- Minor text and structure refinements

### 1.2.12
Release: 21.03.2026
- Repository cleanup and fixes for ioBroker repository checker
- Restored required native object in io-package.json
- Removed invalid properties and outdated entries
- Updated README

### 1.2.11
- Repository cleanup (ioBroker checker issues resolved)
- Removed invalid properties from io-package.json
- README updated

### 1.2.10 (2026-03-20)
- Improved German translations in the admin UI (jsonConfig)
- Fixed incorrect and misleading terminology (e.g. flow vs. temperature sensors)
- Improved consistency and wording across all configuration options

### 1.2.9
Release: 19.03.2026
- fix: correct invalid common object in runtime channel.

### 1.2.7
Released: 16.03.2026
- Corrected role definitions for writable states according to ioBroker guidelines
- Several internal learning and diagnostic states set to read-only
- Removed obsolete files from repository

### 1.2.6
Released: 12.03.2026
- Fixed remaining adapter checker issues
- Updated release-script plugins to latest versions
- Converted remaining log messages to English
- Updated dependabot configuration (added github-actions ecosystem)
- Reduced `common.news` entries in io-package.json to comply with repository requirements

### 1.2.5
Released: 07.03.2026
- Fixed an issue in `actuatorsHelper` where state changes were not handled correctly in certain situations
- Minor internal improvements and stability fixes

### 1.2.4
Release: 07.03.2026
- Fix: actuatorsHelper did not synchronize instance configuration with internal states (active/name). Additional actuators could not be activated.

### 1.2.3
Released: 06.03.2026
- Replaced native timers (setTimeout / setInterval) with adapter timers (adapter.setTimeout / adapter.setInterval)
- Added proper cleanup of timers on adapter unload
- Internal code cleanup and maintenance improvements

### 1.2.2
Released: 06.03.2026
- Raised required admin version to >=7.6.20
- Updated translations after jsonConfig i18n refactoring
- Maintenance update (no functional changes)

### 1.2.1
Released: 06.03.2026
- Migration of admin configuration to i18n translation environment
- jsonConfig now uses English labels with translations managed in admin/i18n
- Translations generated using `npm run translate`

### 1.2.0
Released: 15.02.2026
- Activation of multilingual support (i18n) in jsonConfig
- Bilingual labeling (German/English) of instance configuration
- No functional changes to the adapter


## v1.1.0 Pump Power Recommendation (23.01.2026)
- **Pump Power Recommendation (from v1.1.0)**
  - New passive section `pump.speed`
  - Derives a clear logical performance state of the running pump:
    - `off`, `frost`, `low`, `normal`, `high`, `boost`
  - Performance state is based exclusively on:
    - existing pump logic
    - active helper (e.g., frost, solar, maintenance)
    - current pump status
  - Additionally provides a **recommended pump power in percent (0–100%)**
  - Percentage values are **freely configurable** and **protected against overinstallation**
  - **No active speed control**
  - **No interference with existing pump control**
  - Intended for connection to external systems such as:
    - Shelly 0–10 V
    - Frequency converters
    - Blockly / scripts


## v1.0.0 Additional Actuators (Lighting & Auxiliary Pumps) (02.01.2026)
- Control of optional pool actuators:
  - Pool lighting (up to 3 channels)
  - Auxiliary pumps / attractions (up to 3 channels)
- Full configuration via the Admin interface:
  - Activation per actuator via checkbox
  - Assignment of an **external object ID**
    (e.g., switchable socket or boolean control state)
- Supported operating modes:
  - On / Off
  - Timed operation (runtime in minutes)
  - Continuous operation
- Internal status and control states:
  - current operating state
  - remaining runtime
  - switching status and operating mode
- Clear system separation:
  - Additional actuators do **not**
    affect pump, solar, heating, or AI logic
  - Purely optional system extension


## v0.9.0
- Introduction of heating / heat pump control (`heatHelper`)
- Automatic heating request based on pool temperature
- Target and maximum temperature configurable
- Support for:
  - switchable sockets
  - boolean control states
- Pump overrun time after heating ends
- Priority system:
  - Maintenance mode blocks heating control
  - Active only in automatic mode
  - Considers season status
- Ownership protection for pump control
- New internal state `heat.heating_request` for external evaluation


## v0.8.2 (2025-12-25)
- New AI module **Chemistry Help** (`aiChemistryHelpHelper`)
- Purely informative support system for pool water chemistry
- Selection of typical pool problems (e.g., pH too high/low, chlorine ineffective, green/cloudy water)
- Clear cause and solution hints as text output
- No automatic dosing
- No product recommendations
- No device or pump control
- No speech output (purely visual information)
- New data points under `ai.chemistry_help.*`


## v0.8.0 (2025-12-08)
- Modules: Weather hints (Open-Meteo), pool tips, daily summary, weekend report
- Automatic text outputs with optional speech output
- Hourly weather updates for continuous refresh
- Anti-spam system to avoid duplicate hints
- New AI forecast system `aiForecastHelper` integrated
- Creates a daily automatic “Forecast for Tomorrow” including:
  - temperature range
  - weather description
  - rain probability
  - wind analysis (light / moderate / strong)
  - pool recommendations for the following day
- New switches, schedules and outputs under `ai.weather.*`
- Immediate initial execution after instance start added
- Extended Admin overview under “Help & Info” with important AI notes
- Improved internal structure of the AI system (aiHelper + aiForecastHelper)


## v0.7.4 (2025-12-03)
- Fixed bug in ControlHelper. Persistent protection for control.circulation.mode


## v0.7.0 (2025-11-29)
- Introduction of a new pressure sensor system under `pump.pressure.*`
- Support for external pressure sensor object ID (bar value from ioBroker)
- Trend detection (rising/falling/stable) and moving pressure average
- Self-learning min/max pressure values with manual reset state
- New diagnostic text (`status_text_diagnostic`) with extended analysis information
- Extended pump monitoring without automatic control logic (purely informational)


## v0.6.2 (2025-11-07)
- Revision of instance overview with new header structures for clearer operation
- New start page image “Egon in Workwear” integrated into the Admin interface
- Extension of speech system with configurable Alexa output times
- Adjustments and cleanup in jsonConfig, speechHelper and speechStates


## v0.6.0 (2025-11-03)
- Introduction of full photovoltaic control with automatic pump logic  
  (new pump mode `Automatic (PV)` under `pump.mode`)
- Adapter reacts to PV surplus based on configurable household consumption and generation power
- Start logic: pump ON when surplus ≥ (rated power + threshold)
- Considers season status, overrun time and optional “circulation reached” protection
- Automatic migration adds new mode `auto_pv` to existing installations
- Improved internal logic, persistence and debug logging

## v0.5.5 (2025-11-01)
- Fixed endless loop in weekly and monthly statistics

## v0.5.3 (2025-10-30)
- Added Telegram user selection

## v0.5.2 (2025-10-30)

## v0.5.0 (2025-10-28)

### **0.4.0 (26.10.2025)**

**New Features**
- Introduction of the new statistics system under `analytics.statistics.temperature.today`
- Automatic collection of **min, max and average values** of all active temperature sensors
- Per sensor: JSON and HTML summaries with continuous updates
- Overall output of all sensors (table) under  
  `analytics.statistics.temperature.today.outputs.summary_all_html`
- Fully **persistent data points** with overinstall protection
- **Automatic midnight reset** for daily reset including timestamp
- Preparation for future weekly, monthly and seasonal statistics

**Improvements**
- Unified structure through new main folder `analytics`
- No permanent loops or timer load – pure event processing
- Improved performance and memory stability
- Revised initialization of all statistics states at startup

**Note**
This version forms the stable basis for all following statistics and analysis functions  
(e.g., weekly and monthly statistics, history and efficiency evaluations).

*(older versions see [io-package.json](./io-package.json))*  

---

## Support
- [ioBroker Forum](https://forum.iobroker.net/)  
- [GitHub Issues](https://github.com/DasBo1975/ioBroker.poolcontrol/issues)

---

## Support Adapter Development
If you like **ioBroker.poolcontrol**, please consider making a donation:  
➡️ [Support via PayPal](https://www.paypal.com/donate?business=dirk.bertin@t-online.de)

---

## Disclaimer
Use of the adapter is **at your own risk**.  
The developer assumes **no liability** for damages resulting from installation, use or malfunctions.  
This especially applies to direct control of electrical devices (e.g., pool pumps).  
The user is responsible for the **safe installation and operation of their hardware**.

---

## License & Legal

PoolControl is an open-source project developed by D. Bertin (DasBo1975).

- The name PoolControl and the associated logo are original developments and may be freely used within the scope of the open-source publication (adapter, GitHub repository, wiki, documentation, visualizations).

- Commercial use, redistribution or publication in modified form (especially as part of a commercial product or service) requires the explicit permission of the author.

- All developed sensor, hardware and enclosure constructions (e.g., temperature, pressure, level, electronics or control boxes) including designs, schematics, 3D models and internal constructions are subject to the copyright of D. Bertin (DasBo1975).

- Publication, reproduction for resale or commercial use of these hardware designs is only permitted with written authorization from the author.

The software source code of this project is licensed under the MIT License. See LICENSE for details.

---

## License
Copyright (c) 2026 D. Bertin (DasBo1975) <dasbo1975@outlook.de>  

MIT License