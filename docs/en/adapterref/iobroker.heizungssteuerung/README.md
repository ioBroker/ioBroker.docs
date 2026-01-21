# ioBroker.heizungssteuerung

![Logo](admin/heizungssteuerung.png)

[![NPM version](https://img.shields.io/npm/v/iobroker.heizungssteuerung.svg)](https://www.npmjs.com/package/iobroker.heizungssteuerung)
[![Downloads](https://img.shields.io/npm/dm/iobroker.heizungssteuerung.svg)](https://www.npmjs.com/package/iobroker.heizungssteuerung)
[![Dependency Status](https://img.shields.io/david/jbeenenga/iobroker.heizungssteuerung.svg)](https://david-dm.org/jbeenenga/iobroker.heizungssteuerung)
[![Known Vulnerabilities](https://snyk.io/test/github/jbeenenga/ioBroker.heizungssteuerung/badge.svg)](https://snyk.io/test/github/jbeenenga/ioBroker.heizungssteuerung)

[![NPM](https://nodei.co/npm/iobroker.heizungssteuerung.png?downloads=true)](https://nodei.co/npm/iobroker.heizungssteuerung/)

**Tests:** [![Test and Release](https://github.com/jbeenenga/ioBroker.heizungssteuerung/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/jbeenenga/ioBroker.heizungssteuerung/actions/workflows/test-and-release.yml)

## ioBroker Adapter for Heating Control

This adapter provides comprehensive heating system management for ioBroker installations. It supports both heating and cooling modes with advanced features like boost mode, pause functionality, and time-based temperature scheduling.

[🇩🇪 Deutsche Version](README_DE.md)

## Features

- **Dual Mode Support**: Switch between heating and cooling modes
- **Weather-based Control**: Automatically activate/deactivate based on outside temperature
- **Boost Mode**: Temporarily increase heating/cooling for individual rooms
- **Pause Mode**: Temporarily disable heating/cooling for specific rooms
- **Time-based Scheduling**: Define temperature periods for different times and days
- **Room-based Control**: Individual temperature management for each room
- **Humidity Control**: Stop cooling when humidity thresholds are reached
- **Absence Mode**: Set reduced temperatures during holidays or extended absences
- **Temperature Override**: Manually override target temperatures when needed

## Installation

### Via ioBroker Admin Interface

1. Open ioBroker Admin interface
2. Go to "Adapters" tab
3. Search for "heizungssteuerung"
4. Click "Install"

### Via npm

```bash
npm install iobroker.heizungssteuerung
```

## Quick Start Guide

### 1. Setup Room Structure

Before configuring the adapter, you need to set up your room structure in ioBroker:

1. Navigate to **Objects → Enums → Rooms**
2. Create rooms for each area you want to control (e.g., "Living Room", "Bedroom", "Kitchen")
3. Add the following devices to each room:
    - Temperature sensors
    - Heating/cooling actuators (valves, switches, etc.)
    - Humidity sensors (optional)

### 2. Configure Functions

Set up the required functions in **Objects → Enums → Functions**:

- **Temperature**: Add all temperature sensor states
- **Humidity**: Add humidity sensor states (optional)
- **Engine**: Add all heating/cooling actuator states

### 3. Adapter Configuration

#### Basic Settings

- **Operating Mode**: Choose between "Heating" and "Cooling"
- **Check Interval**: How often the adapter checks temperatures (in minutes)
- **Default Temperature**: Fallback temperature when no period matches
- **Temperature Hysteresis**: Temperature difference threshold for switching heating/cooling on/off

#### Time-based Periods

Configure temperature schedules for each room:

1. Select a room from the dropdown
2. Set start and end times
3. Define target temperature
4. Choose days of the week
5. Specify if this period is for heating or cooling mode

#### Advanced Settings

- **Pause Duration**: Auto-reset time for pause mode (minutes)
- **Boost Duration**: Auto-reset time for boost mode (minutes)
- **Humidity Threshold**: Maximum humidity before cooling stops
- **Reset on Startup**: Overwrite all temperatures with default values on adapter start

#### Weather-based Control (Optional)

Enable intelligent operation based on outside temperature:

- **Enable Weather Control**: Activate weather-based heating/cooling control
- **Weather Data Source**: Select the state containing outside temperature data
- **Heating Threshold**: Only activate heating if outside temperature is below this value (default: 15°C)
- **Cooling Threshold**: Only activate cooling if outside temperature is above this value (default: 24°C)

**How it works:**
- In heating mode: System only operates when outside temperature < threshold
- In cooling mode: System only operates when outside temperature > threshold
- Takes priority over all other settings (periods, boost, absence)
- If weather data is unavailable, system operates normally as fallback

## Usage

### Manual Control Actions

The adapter creates action objects under `heizungssteuerung.0.Actions`:

#### Global Actions (All Rooms)

- **absenceUntil**: Set absence mode until specific date/time
    - Format: `dd.MM.yyyy HH:mm` (e.g., "01.01.2024 14:00")
    - Effect: Ignores periods and uses default temperature
- **pause**: Temporarily pause all heating/cooling
- **boost**: Activate boost mode for all rooms

#### Room-specific Actions

For each room, you'll find:

- **pause**: Pause heating/cooling for this room only
- **boost**: Activate boost mode for this room only
- **targetTemp**: Override target temperature temporarily

### Example Configurations

#### Basic Heating Schedule

```
Room: Living Room
Time: 06:00 - 22:00
Days: Monday to Friday
Temperature: 21°C
Mode: Heating
```

#### Weekend Schedule

```
Room: Living Room
Time: 08:00 - 24:00
Days: Saturday, Sunday
Temperature: 22°C
Mode: Heating
```

#### Night Temperature

```
Room: Bedroom
Time: 22:00 - 06:00
Days: All days
Temperature: 18°C
Mode: Heating
```

## Configuration Examples

### Typical Home Setup

1. **Living Areas**: 21°C during day, 19°C at night
2. **Bedrooms**: 19°C during day, 16°C at night
3. **Bathrooms**: 22°C in morning/evening, 19°C otherwise
4. **Office**: 21°C during work hours, 18°C otherwise

### Energy-saving Tips

- Use lower night temperatures (2-3°C reduction)
- Set absence temperatures 3-5°C below normal
- Configure boost mode for quick warm-up instead of constant high temperatures
- Use humidity control to prevent over-cooling

## Troubleshooting

### Common Issues

**Temperatures not changing**

- Check if room enums are correctly configured
- Verify temperature sensors are assigned to correct rooms
- Ensure actuators are in the "Engine" function enum

**Periods not working**

- Verify time format (24-hour format)
- Check if operating mode matches period configuration
- Confirm room selection in period settings

**Humidity control not working**

- Add humidity sensors to both room and function enums
- Check humidity threshold settings
- Verify sensors are providing current data

### Debug Information

Enable debug logging in adapter settings to see detailed information about:

- Temperature calculations
- Period matching
- Actuator control decisions
- Error conditions

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.1.2 (2025-12-10)
- (jbeenenga) fix invalid state roles according to ioBroker documentation
- (jbeenenga) fix repository checker issues (#237)
  - Corrected schema URL in .vscode/settings.json
  - Added jsonConfig schema validation
  - Updated release-script packages to latest versions
- (jbeenenga) fix jsonConfig validation errors - replaced title with label in table items

### 2.1.1 (2025-09-02)
 - (jbeenenga) correct outsite temperature path setting

### 2.1.0 (2025-08-25)

- (jbeenenga) add weather-based heating/cooling control
- (jbeenenga) refactor business logic into service classes
- (jbeenenga) add comprehensive unit tests
- (jbeenenga) update dependencies to latest versions

### 2.0.3 (2025-07-02)

- (jbeenenga) fix absence format issue
- (jbeenenga) fix period matching issue

### 2.0.2 (2025-06-24)

- (jbeenenga) fix build bug

### 2.0.1 (2025-06-24)

- (jbeenenga) fix technical issues

### 2.0.0 (2025-06-18)

- (jbeenenga) update dependencies
- (jbeenenga) add absence mode
- (jbeenenga) fix pause and boost for cooling mode

### 1.7.0 (2023-01-05)

- (jbeenenga) fix bug for end boost or pause mode
- (jbeenenga) provide corrent humidity in temperatures

### 1.6.7 (2022-12-16)

- (jbeenenga) fix date format

### 1.6.5 (2022-12-16)

- (jbeenenga) add possibility to reset temperatures on adapter start

### 1.6.4 (2022-12-16)

- (jbeenenga) add more debug outputs
- (jbeenenga) fixed incorrect period to room mapping

### 1.6.3 (2022-12-15)

- (jbeenenga) removed unnecessary debug output

### 1.6.2 (2022-12-15)

- (jbeenenga) fix for temperature calculation

### 1.5.0 (2022-09-25)

- (jbeenenga) add possibility to overwrite temperature temporarily
- (jbeenenga) add config for temperature offset
- (jbeenenga) add boost and pause function

## License

MIT License

Copyright (c) 2025-2026 jbeenenga [j.beenenga@gmail.com](mailto:j.beenenga@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Credits

Icon created by Freepik ([https://www.flaticon.com/de/kostenloses-icon/heizung_1295221](https://www.flaticon.com/de/kostenloses-icon/heizung_1295221))

---

**Support this project** ⭐ Star this repository if you find it helpful!
