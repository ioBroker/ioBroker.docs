![Logo](admin/fujitsu.png)

# ioBroker.fujitsu-airstage

[![NPM version](https://img.shields.io/npm/v/iobroker.fujitsu-airstage.svg)](https://www.npmjs.com/package/iobroker.fujitsu-airstage)
[![Downloads](https://img.shields.io/npm/dm/iobroker.fujitsu-airstage.svg)](https://www.npmjs.com/package/iobroker.fujitsu-airstage)
![Number of Installations](https://iobroker.live/badges/fujitsu-airstage-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/fujitsu-airstage-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.fujitsu-airstage.png?downloads=true)](https://nodei.co/npm/iobroker.fujitsu-airstage/)

**Tests:** ![Test and Release](https://github.com/stefan5232/ioBroker.fujitsu-airstage/workflows/Test%20and%20Release/badge.svg)

## Fujitsu Airstage Adapter for ioBroker

This adapter enables control of Fujitsu Airstage air conditioners via ioBroker. The air conditioning units must be equipped with a WiFi module and be accessible in the local network.

**Disclaimer**: This adapter is an independent community project and is not affiliated with Fujitsu Limited or its subsidiaries. "Fujitsu" and "Airstage" are registered trademarks of Fujitsu Limited. Their use is solely for the purpose of identifying compatible devices. See the official [Fujitsu Airstage product page](https://www.fujitsu-general.com/us/products/split/) for supported devices.

### Features

- **Complete Control**: Power on/off, temperature, operation mode, fan speed
- **Advanced Functions**: Powerful mode, Economy mode, swing control (vertical/horizontal)
- **Status Monitoring**: Current indoor/outdoor temperature, power consumption, device status
- **Additional Functions**: WiFi LED, Low-Noise mode, Human Detection, Energy Saving Fan
- **Multiple Devices**: Support for unlimited number of air conditioners
- **Automatic Updates**: Configurable polling interval for status updates

### Requirements

- Fujitsu Airstage air conditioner with WiFi module
- Air conditioner must be accessible in the local network (LAN/WLAN)
- IP address and Device ID (MAC address) of the air conditioner

### Installation

Install the adapter via the ioBroker Admin interface.

### Configuration

#### Finding the Device ID

The Device ID is the MAC address of the WiFi module **without colons**:
- Example MAC address: `AA:BB:CC:DD:EE:FF`
- Device ID for adapter: `AABBCCDDEEFF`

You can find the MAC address:
- In the Fujitsu app (e.g., FGLair)
- In your router's connected devices list
- On a sticker on the WiFi module

#### Finding the IP Address

You can find the air conditioner's IP address:
- In your router under DHCP clients
- In the Fujitsu app under device details

**Recommendation**: Assign a static IP address (DHCP reservation) for the air conditioner in your router.

#### Adapter Settings

1. Open the adapter configuration in ioBroker
2. Add one or more devices:
   - **Name**: Free-form name (e.g., "Living Room", "Bedroom")
   - **IP Address**: Local IP address of the air conditioner (e.g., 192.168.1.100)
   - **Device ID**: MAC address without colons (e.g., AABBCCDDEEFF)
3. **Poll Interval**: Defines how often the status is queried (default: 30 seconds)
4. Save settings and start the instance

### Data Points

The following data points are created for each configured device:

#### Control (writable)
| Data Point | Type | Description |
|------------|------|-------------|
| `power` | boolean | Turn device on/off |
| `target_temperature` | number | Target temperature (16-30°C) |
| `mode` | string | Operation mode: auto, cool, heat, dry, fan |
| `fan_speed` | string | Fan speed: auto, quiet, low, medium, high |
| `swing_vertical` | boolean | Vertical swing |
| `swing_horizontal` | boolean | Horizontal swing |
| `powerful` | boolean | Powerful mode (fast heating/cooling) |
| `economy` | boolean | Economy mode (energy saving) |
| `fan_ctrl` | boolean | Energy Saving Fan |
| `outdoor_low_noise` | boolean | Low-Noise mode for outdoor unit |
| `wifi_led` | boolean | WiFi LED on/off |
| `min_heat` | boolean | Minimum Heat mode |

#### Status (read-only)
| Data Point | Type | Description |
|------------|------|-------------|
| `current_temperature` | number | Current room temperature |
| `outdoor_temperature` | number | Outdoor temperature |
| `power_consumption` | number | Cumulative energy consumption in Wh |
| `vertical_direction` | string | Vertical airflow direction |
| `vertical_increments` | number | Vertical airflow increments |
| `horizontal_direction` | number | Horizontal airflow direction |
| `human_detection` | boolean | Human detection active |
| `online` | boolean | Device reachable |

### Troubleshooting

#### Device shows as offline
- Verify the IP address is correct
- Check if the air conditioner is reachable in the network (ping)
- Verify the Device ID is correct (12 hexadecimal characters)
- Ensure no firewall is blocking the connection

#### Commands are not executed
- Check the log for error messages
- Increase log level to "debug" for detailed information
- Ensure the air conditioner is not manually locked

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.2.4 (2026-09-20)
* (S. Bott) Fix `power_consumption` role mismatch with its unit (`value.power.consumed` → `value.energy.consumed`, matching the cumulative Wh value reported by the device)
* (S. Bott) Fix missing `Name`/`Device ID` i18n keys in admin table, and incorrect German placeholder text in 9 non-German languages
* (S. Bott) Fix `info.connection` object name not being corrected on existing installations

### 0.2.3 (2026-08-25)
* (S. Bott) Fix PR review findings: preserve custom object settings on restart, avoid overlapping polling calls, correct state roles
* (S. Bott) Clean up i18n keys in jsonConfig.json and translation files
* (S. Bott) Add link to official Fujitsu Airstage product page in README

### 0.2.2 (2026-07-07)
* (S. Bott) Fix vertical_direction write flag not applied on existing installations

### 0.2.1 (2026-07-07)
* (S. Bott) Fix vertical_direction: make writable to set fixed vane position

### 0.2.0 (2026-07-07)
* (S. Bott) Fix PR review findings: sendCommand, pollInterval validation, i18n, metadata
* (S. Bott) Add news translations for all ioBroker languages
* (S. Bott) Update dependencies, raise admin requirement to >=7.8.23

### 0.1.7 (2026-06-20)
* (S. Bott) Fix installation from GitHub: commit build output to repository

### 0.1.6 (2026-06-19)
* (S. Bott) Fix human_detection_auto_save: set write=true to match role switch
* (S. Bott) Fix repository checker errors (E0036, E5019)

### 0.1.5 (2026-06-14)
* (S. Bott) Fix 'no existing object' warnings when MAC address entered in lowercase
* (S. Bott) Fix typo: info.connected → info.connection

### 0.1.4 (2026-06-14)
* (S. Bott) Fix all repository checker errors and warnings (issue #86)
* (S. Bott) Add missing i18n translations for all languages
* (S. Bott) Add prettier.config.mjs, fix eslint config import
* (S. Bott) Remove redundant devDependencies (@typescript-eslint/*, eslint)
* (S. Bott) Upgrade to TypeScript 6 with required tsconfig migrations
* (S. Bott) Update all dependencies to latest versions

### 0.1.3 (2026-06-14)
* (S. Bott) Resolve all repository checker errors, warnings and suggestions from issue #84
* (S. Bott) Update Node.js requirement to >=22 and GitHub Actions to Node 24.x
* (S. Bott) Update @alcalzone/release-script packages to 5.2.0
* (S. Bott) Update admin dependency to >=7.6.20
* (S. Bott) Restructure README to English-only (ioBroker requirement)
* (S. Bott) Add English translations for jsonConfig
* (S. Bott) Replace setTimeout/setInterval with adapter methods
* (S. Bott) Configure Dependabot with 7-day cooldown
* (S. Bott) Update all dependencies to latest versions

### 0.1.1 (2026-01-03)
* (S. Bott) Fix ioBroker repository checker errors and warnings
* (S. Bott) Update dependencies (axios, sinon, typescript-eslint, etc.)
* (S. Bott) Fix setTimeout memory leak
* (S. Bott) Fix ESLint compatibility with TypeScript ESLint v8

### 0.1.0 (2025-12-31)
* (S. Bott) initial release

## License

MIT License

Copyright (c) 2026 S. Bott <stefan5232@gmx.de>

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