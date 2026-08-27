# ioBroker.poolcontrol

![Test and Release](https://github.com/DasBo1975/ioBroker.poolcontrol/actions/workflows/test-and-release.yml/badge.svg)
![npm](https://img.shields.io/npm/v/iobroker.poolcontrol?color=blue)
![Downloads](https://img.shields.io/npm/dm/iobroker.poolcontrol)
![Installs](https://iobroker.live/badges/poolcontrol-installed.svg)
![Stable](https://iobroker.live/badges/poolcontrol-stable.svg)
[![License](https://img.shields.io/github/license/DasBo1975/ioBroker.poolcontrol?cacheSeconds=3600)](https://github.com/DasBo1975/ioBroker.poolcontrol/blob/main/LICENSE)

---

## Description

The adapter ioBroker.poolcontrol is used for controlling, monitoring and analyzing pool systems.

It provides automation for pumps, heating, solar and photovoltaic control as well as monitoring, diagnostics, chemistry analysis and energy evaluations.

---

## Features

### Control & Automation

- **Pump Control**
  - Operating modes: Automatic, Automatic (PV), Manual, Time Control, Off
  - Error detection (no power consumption, power despite OFF, overload)
  - Safety functions (frost protection, overheating protection)
  - Priority ownership and helper coordination
  - Pump power recommendations for variable-speed pumps
  - Learning functions for power and flow behavior (`pump.learning.*`)

- **Time Control**
  - Up to 3 freely configurable weekly time windows
  - Persistent configuration values
  - Protection against overwriting during updates

- **Solar Control**
  - Collector on/off thresholds with hysteresis
  - Live collector-surface delta for dashboards and scripts
  - Collector warning threshold
  - Optional speech output for warnings
  - Automatic reset logic

- **Solar Extended**
  - Separate control for external solar actuators
  - Delta on/off thresholds
  - Live collector-pool reference delta for dashboards and scripts
  - Maximum pool temperature limits
  - Diagnostic and reason states
  - Priority and block logic
  - Status section under `solar.extended.*`
  - Runtime changes to `solar.extended.pool_temperature_source` are applied automatically; because Solar Extended uses a cyclic check interval, calculation, control logic, and `solar.extended.collector_pool_reference_delta` may take up to approximately 60 seconds to update.

- **Photovoltaic Control**
  - Pump control based on PV surplus and household consumption
  - Start logic using configurable surplus margins
  - Optional overrun during cloudy phases
  - Ignore mode when circulation target is reached
  - Supports external energy object IDs
  - Pump mode: `Automatic (PV)`

- **Heating / Heat Pump Control**
  - Automatic control of heating rod or heat pump
  - Configurable target and safety temperatures
  - Optional pump prerun and overrun
  - Ownership protection
  - Maintenance blocking logic
  - Supports switchable outputs and boolean states
  - Internal status and diagnostics under `heat.*`
  - No chemistry or solar logic

- **Additional Actuators**
  - Lighting control
  - Extra pumps
  - Follow-pump devices
  - Automatic ON/OFF depending on pump operation
  - Validation of external target states
  - Suitable for UV systems, water features and auxiliary systems


### Monitoring & Diagnostics

- **Temperature Management**
  - Up to 6 sensors:
    - surface
    - ground / bottom
    - flow
    - return
    - collector
    - outside temperature
  - Daily min/max values
  - Hourly changes
  - Temperature differences
  - Last valid value tracking
  - Source monitoring and diagnostics
  - Recovery logic for missing updates
  - Source status evaluation

- **Runtime & Circulation**
  - Runtime counters (today / total)
  - Circulation calculation and remaining volume
  - Runtime self-healing
  - Backwash reminder system
  - Last backwash tracking
  - Automatic reset after completed backwash
  - PV integration for circulation targets

- **Pressure Sensor Integration**
  - Real-time pressure measurement
  - Trend analysis
  - Learning average values
  - Self-learning min/max ranges
  - Diagnostic states
  - Pressure history and evaluation
  - Support for external sensors and PoolControl PressureBox
  - Informational only (no automatic control)

- **SystemCheck**
  - Diagnostic and debug area
  - Monitoring of selected subsystems
  - Internal debug log
  - Manual log clearing
  - Intended for analysis and troubleshooting


### Analytics & Insights

- **Statistics System**
  - Daily / weekly / monthly statistics
  - Min / max / average calculations
  - Runtime evaluations
  - Persistent states
  - HTML and JSON summaries

- **Solar Insights**
  - Solar runtime analysis
  - Efficiency calculations
  - Diagnostic outputs
  - Daily logbook
  - HTML / JSON / text outputs
  - Informational only (no control)

- **Photovoltaic Insights**
  - Runtime analysis
  - Energy evaluations
  - Savings calculations
  - Starts and operating statistics
  - HTML / JSON summaries

- **Pool Insights**
  - Rule-based overall pool analysis under analytics.insights.pool.*
  - Reads existing PoolControl data only
  - No automatic control, dosing, pump switching, or actuator switching
  - Disabled by default
  - Optional summary handoff to speech.queue
  - HTML / JSON / text outputs

- **VIS-ready Outputs**
  - Structured text outputs
  - HTML outputs
  - JSON summaries
  - Suitable for VIS / VIS2 / dashboards


### Chemistry & AI

- **Water Chemistry Analysis**

  **pH**
  - Manual or external sources
  - Measurement location logic
  - Stabilization logic
  - Manual mixing run support
  - No automatic dosing

  **TDS**
  - Manual or external sources
  - Trend evaluation (24h / 7d / 30d)
  - Reference values
  - Measurement location logic
  - HTML / JSON / text outputs

  **ORP / Redox**
  - ORP evaluation
  - pH reference support
  - Informational only
  - No chlorine control
  - No automatic dosing

  **Two-tier bounded chemistry history**
  - Existing samples_json states remain the 7-day, 15-minute short-term history: at most 672 samples and 64 KB each
  - New internal daily_json states keep compact local-calendar-day aggregates with min/max/avg/last/count: at most 32 entries and 8 KB each
  - 24h and 7d trends use samples_json; 30d trends use the last value of the matching daily aggregate
  - Existing 24h, 7d, and 30d trend states and text/HTML/JSON reports retain their API and meaning
  - The daily aggregates complement but do not replace raw history; valid legacy data is normalized during migration and oversized JSON is rejected before parsing
  - Raw long-term histories belong in a dedicated ioBroker history/time-series database
  - If an oversized states.jsonl already prevents js-controller startup, it must be repaired externally before PoolControl can run

  **Chemistry Tools**
  - pH Plus calculator
  - pH Minus calculator
  - Salt calculator
  - Manual calculation helpers
  - Pool volume prefill support
  - Optional manual value override
  - Result texts with validation and error handling
  -No automatic chemical dosing
  - Informational only

- **AI System**
  - Weather hints (Open-Meteo)
  - Pool recommendations
  - Daily summary
  - Weekend report
  - Forecast for tomorrow
  - Optional speech outputs
  - Duplicate context tracking

- **Chemistry Help**
  - Interactive chemistry assistance
  - Typical pool problem selection
  - Cause and solution explanations
  - No automatic dosing
  - No device control

- **Speech Outputs**
  - Alexa support
  - Telegram support
  - Notifications for pump, warnings and temperatures


### Information System

- Adapter information system
- Seasonal greetings
- Version information

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
- Dedicated control modules for valves and counter-current systems
- Integration of additional sensor boxes (e.g., TempBox, PressureBox, LevelBox)
- AI and voice assistant extension (pool daily report, tips, voice commands)

---

## Note

The adapter is under active development.  
New features are added regularly – please refer to the changelog.

---

## Documentation

### English
- [Documentation / Help](https://github.com/DasBo1975/ioBroker.poolcontrol/blob/main/docs/en/help.md)
- [Function Overview](https://github.com/DasBo1975/ioBroker.poolcontrol/blob/main/docs/en/function_overview.md)

### Deutsch
- [Dokumentation / Hilfe](https://github.com/DasBo1975/ioBroker.poolcontrol/blob/main/docs/de/help.md)
- [Funktionsübersicht](https://github.com/DasBo1975/ioBroker.poolcontrol/blob/main/docs/de/funktionsuebersicht.md)

---

## Changelog
### 1.4.5 (2026-08-11)

- Fixed a conflict between Auto-PV and Extended Solar control.
- Extended Solar could incorrectly switch off the main pump while the pump was being controlled by Auto-PV and sufficient PV surplus was still available.
- Extended Solar now only writes to the main pump switch when `pump.mode = auto`.
- Auto-PV operation is no longer interrupted by the Extended Solar control cycle.
- Existing Extended Solar pump control in normal `auto` mode remains unchanged.

### 1.4.4 (2026-07-31)

- Fixed a race condition in the Auto-PV helper that could occur during rapid updates of PV generation and household power values.
- Added a short debounce for PV and household power events to ensure calculations always use the latest matching values.
- Replaced the previous throttle mechanism with a serialized recalculation workflow to prevent overlapping asynchronous recalculations.
- Added an internal "latest run wins" protection so outdated recalculations can no longer overwrite newer results or trigger outdated pump decisions.
- The existing Auto-PV holding logic introduced in v1.4.1 remains unchanged.
- `photovoltaic.power_surplus_w` continues to represent the real remaining PV surplus (`PV generation - household consumption`).
- Existing Auto-PV features such as afterrun, circulation handling, solar overheating protection and controlHelper priority remain fully compatible.

### 1.4.3 (2026-07-25)

- Fixed restoration of the previous pump mode after maintenance mode and automatic circulation catch-up runs.
- Maintenance mode now restores the previous valid user mode even after an adapter restart.
- Maintenance mode and automatic catch-up runs now use separate restore values and can no longer overwrite each other.
- Invalid values such as `null`, empty values, or internal helper modes are no longer written back to `pump.mode`.
- Automatic circulation catch-up runs no longer start while maintenance mode is active.
- Starting maintenance mode during an active catch-up run now stops the catch-up process cleanly before maintenance takes control.
- Added validation to the pump-mode restoration after backwashing.
- The existing overload protection remains unchanged and continues to switch `pump.mode` to `off` when an overload is detected.

### 1.4.2 (2026-07-01)

- Fixed monthly temperature statistics reset scheduling
  - Monthly reset no longer uses long timeouts above the Node.js/ioBroker limit
  - Added persistent monthly period tracking
  - Missed month changes after adapter downtime are detected safely
  - Monthly reset is now checked daily and executed only once per period

- Improved solar logbook logging
  - Oversized solar logbook entries are now logged as debug instead of warning
  - This avoids unnecessary warning noise for non-critical diagnostic information

### 1.4.1 (2026-06-30)

- Fixed Auto-PV holding logic for already running pumps.
- When Auto-PV already controls the pump, the current pump power is now considered for the holding decision.
- This prevents a running pump from triggering its own Auto-PV afterrun/stop cycle after startup.
- The displayed PV surplus (`photovoltaic.power_surplus_w`) remains the real remaining surplus and is not artificially adjusted.

## Archived Release History

For older releases and archived version history see:

[CHANGELOG_OLD.md](./CHANGELOG_OLD.md)

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

## Legal Notice

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