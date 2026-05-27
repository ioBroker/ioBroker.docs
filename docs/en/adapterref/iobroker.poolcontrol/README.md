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
  - Collector warning threshold
  - Optional speech output for warnings
  - Automatic reset logic

- **Solar Extended**
  - Separate control for external solar actuators
  - Delta on/off thresholds
  - Maximum pool temperature limits
  - Diagnostic and reason states
  - Priority and block logic
  - Status section under `solar.extended.*`

- **Photovoltaic Control (since v0.6.0)**
  - Pump control based on PV surplus and household consumption
  - Start logic using configurable surplus margins
  - Optional overrun during cloudy phases
  - Ignore mode when circulation target is reached
  - Supports external energy object IDs
  - Pump mode: `Automatic (PV)`

- **Heating / Heat Pump Control (test phase)**
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

- **Pressure Sensor Integration (since v0.7.x)**
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
### 1.3.25 (2026-05-26)

- Updated README structure and feature overview
- Synchronized German and English function overviews
- Updated repository maintenance dependencies

### 1.3.24 (2026-05-26)

- Updated release-script dependencies to current versions
- Improved README and changelog structure
- Repository checker recommendations reviewed

### 1.3.23 (2026-05-26)

- Added extended temperature diagnostics for all temperature sensors:
  - last valid value
  - last valid value timestamp
  - minutes since last value
  - source status (`ok`, `warning`, `not_received`, `invalid_timestamp`)
- Added automatic recovery mechanism for stalled temperature updates
- Recovery runs only when a sensor enters warning state and uses cooldown protection
- Switched temperature helper timers to ioBroker adapter timers
- Improved visibility and troubleshooting for missing or delayed temperature updates

### 1.3.22 (2026-05-24)

- Improved ORP pH reference synchronization
- ORP helper now updates pH reference independently from ORP value processing
- Immediate update of ORP pH reference when pH enabled state or pH value changes
- Fixed missing pH reference updates when ORP evaluation was blocked, invalid or waiting for measurement conditions

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