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
### 1.3.21 (2026-05-17)

NEW: Follow-pump devices

Added a new `actuators.follow_pump_devices` area.

Up to three external devices can now automatically follow the operation of the main pump.

Typical examples:

- UV systems
- Water features
- Auxiliary filters
- Additional circulation devices

Features:

- Automatic ON when the main pump starts
- Automatic OFF when the main pump stops
- Configurable target state per device
- Validation of target states:
  - state exists
  - boolean type required
  - writable required
- Protection against invalid internal follow-pump targets
- Persistent configuration values

### 1.3.20 (2026-05-13)

- Added runtime self-healing for missed pump start events.
- Stabilized runtime and circulation calculations for delayed or filtered pump switch updates.
- Fixed a rare synchronization issue where circulation counting could stop although pump live values were still available.
- Protected time control states from being overwritten during adapter updates.
- Preserved configured time windows, start/end times and weekdays during adapter reinstallations or updates.

### 1.3.19 (2026-05-13)

- Added runtime self-healing for missed pump start events
- Stabilized runtime and circulation calculations for delayed or filtered pump switch updates
- Fixed a rare synchronization issue where circulation counting could stop although pump live values were still available
- Improved internal runtime synchronization

### 1.3.18 (2026-05-11)

- Fixed incorrect date display in the pH, ORP and TDS areas.
- Time states with `value.time` are now stored as numeric timestamps instead of localized date strings.
- Improved compatibility with ioBroker/Admin date handling.
- Added backward-compatible handling for previously stored German date strings.
- Kept history JSON output unchanged with readable date strings for users and VIS displays.

### 1.3.17 (2026-05-11)

- Fixed release/upload issue from v1.3.16.
- Fixed circulation calculation in time mode when live flow values were not recalculated after helper-driven pump starts.
- Improved speech system stability.
- Stabilized runtime persistence.
- Reduced repeated solar notifications.
- Added internal stability improvements.

- Added new ORP/Redox chemistry preparation:
  - new `chemistryOrpStates.js`
  - new `chemistryOrpHelper.js`
  - integrated ORP handling into `main.js`
  - supports disabled/manual/state input modes
  - ORP value handling in mV
  - pH reference from `chemistry.ph.enabled` and `chemistry.ph.input.current_value`
  - measurement location, pump and stabilization logic aligned with pH/TDS
  - ORP evaluation without automatic dosing or chlorine control
  - ORP 24h/7d/30d trend support
  - ORP history support
  - ORP text/HTML/JSON outputs

- Added ORP i18n texts.
- Aligned pH structure with TDS/ORP:
  - added `chemistry.ph.history.*`
  - added `chemistry.ph.trend.*`
  - added `chemistry.ph.outputs.*`
  - extended pH helper with history, trend and summary logic
  - existing pH input, evaluation and mix-run logic remain backward compatible

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