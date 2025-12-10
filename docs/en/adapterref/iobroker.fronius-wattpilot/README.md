![Logo](admin/fronius-wattpilot.png)
# ioBroker.fronius-wattpilot

[![NPM version](https://img.shields.io/npm/v/iobroker.fronius-wattpilot.svg)](https://www.npmjs.com/package/iobroker.fronius-wattpilot)
[![Downloads](https://img.shields.io/npm/dm/iobroker.fronius-wattpilot.svg)](https://www.npmjs.com/package/iobroker.fronius-wattpilot)
![Number of Installations](https://iobroker.live/badges/fronius-wattpilot-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/fronius-wattpilot-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.fronius-wattpilot.png?downloads=true)](https://nodei.co/npm/iobroker.fronius-wattpilot/)

**Tests:** ![Test and Release](https://github.com/tim2zg/ioBroker.fronius-wattpilot/workflows/Test%20and%20Release/badge.svg)

[Zur deutschen Version der Dokumentation](README_DE.md)

## What is this adapter?

This adapter integrates your Fronius Wattpilot EV charger with ioBroker, allowing you to monitor and control your charging station. The Wattpilot is an intelligent electric vehicle charging solution that can be integrated into your smart home system.

**🌟 Key Features:**
- Real-time monitoring of charging status
- Remote control of charging parameters
- Cloud and local connection support

## Installation and Setup

### Prerequisites

Before installing the adapter, you need to set up your Wattpilot:

1. **Complete Wattpilot Setup**: Finish the initial setup using the official Fronius Wattpilot app and **remember your password**
2. **Connect to WiFi**: In the app, go to the "Internet" tab and connect your Wattpilot to your WiFi network
3. **Find IP Address**: You'll need your Wattpilot's IP address using one of these methods:
  - **Router Method**: Check your router's web interface for connected devices
  - **App Method**: In the Wattpilot app, tap on the WiFi name after connection. You'll see network details including the IP address

> 💡 **Important**: It's highly recommended to assign a static IP address to your Wattpilot in your router settings to prevent connection issues.

### Adapter Installation

1. Install the adapter from the ioBroker "Adapters" page
2. Create a new instance of the fronius-wattpilot adapter
3. In the instance configuration:
  - Enter your Wattpilot's **IP address**
  - Enter your Wattpilot **password**
  - Configure other settings as needed
4. Save the configuration

If everything is configured correctly, the adapter will connect and start creating data points.

## How to Use the Adapter

### Reading Data

The adapter automatically creates data points for all Wattpilot values. You can use these like any other data points in ioBroker for:
- Visualization in VIS or other frontends
- Logic in scripts and Blockly
- Automation rules

**Data Modes:**
- **Key Points Only** (default): Shows only the most important values
- **All Values**: Uncheck the "Key points only" option to see all available API data

📖 Full API documentation: [Wattpilot API Documentation](https://github.com/joscha82/wattpilot/blob/main/API.md) (Thanks to joscha82)

### Controlling Your Wattpilot

#### Direct State Control (NEW!)

You can now directly control important Wattpilot functions by writing to the states.

#### Advanced Control via set_state

For more advanced control, use the `set_state` data point with this format:
```
stateName;value
```

**Available states:**
- **amp**: `6-16` (charging current in Amperes)
- **cae**: `true` or `false` (⚠️ disables cloud functionality - may require restart)

**Examples:**
```
amp;10          // Set charging current to 10A
```

## Examples and Use Cases

### Solar Integration Example

Check out our [Blockly example](https://github.com/tim2zg/ioBroker.fronius-wattpilot/blob/main/examples/example-Blockly.xml) that shows how to:
- Monitor your solar power production
- Automatically adjust Wattpilot charging current based on excess solar power

**How to use the example:**
1. Copy the content from the example file
2. In ioBroker Blockly, click the "Import blocks" icon (upper right corner)
3. Paste the content and adapt it to your setup

### Common Automations

- **Time-based charging**: Start charging during off-peak hours
- **Solar surplus charging**: Charge only when excess solar power is available
- **Presence detection**: Start/stop charging based on car presence
- **Load balancing**: Adjust charging current based on household power consumption

## Technical Details

The adapter connects to the Wattpilot's WebSocket interface and converts incoming data into ioBroker data points. It supports both local WiFi connections and cloud-based connections.

**Connection Types:**
- **Local WiFi** (recommended): Direct connection to your Wattpilot
- **Cloud**: Connection via Fronius cloud services

## Troubleshooting

**Common Issues:**
- **Connection failed**: Check IP address and password
- **Frequent disconnections**: Assign a static IP to your Wattpilot
- **Missing data points**: Try enabling "All Values" mode
- **Cloud connection issues**: Verify the `cae` setting

**⚠️ Disclaimer:** This adapter uses unofficial APIs. Use at your own risk and be careful when modifying settings that could affect your device's operation.

## Developers

- [SebastianHanz](https://github.com/SebastianHanz)
- [tim2zg](https://github.com/tim2zg)
- [derHaubi](https://github.com/derHaubi)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 4.8.0 (2025-11-29)
- Integrated working bcrypt algorithm

### 4.7.0 (2025-06-19)
- Rewrite of the adapter
- Added ability to set states directly
- Added ability to set common states directly
- Fix all issues

### 4.6.3 (2023-12-24)
- Fixed a bug where the adapter would use a undefined variable
- Fixed bug #44
- Fixed bug #43

### 4.6.2 (2023-08-15)
- Thanks to Norb1204 for fixing a few bugs that I missed. More in Issue #40

### 4.6.1 (2023-08-15)
- Fixed Issue #39 (set_state not working)

### 4.6.0 (2023-07-15)
- Fixed timeout issue in normal parser mode (#36), still exist in dynamic parser mode --> use no timeout (0)
- Fixed a number of issues concerning the static parser mode
- Quality of life improvements --> you can now set the common states directly! (set_power, set_mode) are still available for compatibility reasons and for the dynamic parser mode

### 4.5.1 (2023-03-02)
- Fixed issue #29 (custom states not working)

### 4.5.0 (2023-02-19)
- Fixed random log messages
- Fixed a type conflict at the set_state state
- Commits from now on should be signed

### 4.4.0 (2023-02-16)
- known states will now be updated even if the dynamic parser is enabled

### 4.3.0 (2023-01-14)
- dependency updates
- state updates

### 4.2.1 (2023-01-05)
- Fixed bug in the all values mode / parser

### 4.2.0 (2023-01-01)
- Some QoL improvements

### 4.1.0 (2022-12-30)
- Added the possibility to add states manually via the instance-settings
- Fixed the bug where the adapter didn't set the correct value types
- Added some quality of life improvements

### 4.0.0 (2022-11-30)
- Fixed timing issue
- Added set_power and set_mode states

### 3.3.1 (2022-11-17)
- Fixed a bug where set_state was not writable

### 3.3.0 (2022-11-17)
- Fixed a bug where the adapter would not set the correct labels for the states
- Performance improvements
- Fixed dependencies

### 3.2.5 (2022-10-14)
- Small changes to the package.json and io-package.json

### 3.2.4 (2022-10-11)
- Fiexed cool down timer for normal values

### 3.2.3 (2022-10-08)
- Bug fixed where the adapter would not respect the timout timer and would try to constantly reconnect to the WattPilot
- Bug fixed where the adapter would send a wrong disconnect message to the WattPilot

### 3.2.2 (2022-10-06)
- Fixed reconnecting frequency
- Fixed multiple Websocket connections
- Added frequency handler

### 3.2.1 (2022-10-02)
- Fixed reconnecting to the WebSocket
- Restructured the code

### 3.2.0 (2022-09-29)
- Implemented reconnecting
- Shrank code down

### 3.1.0 (2022-09-07)
- Added the option to use the cloud as a datasource
- Updated GitHub workflows

### 3.0.0 (2022-09-04)
- Updated README.md
- Created "examples"-directory for sample applications
- Added some translations
- Renamed checkbox "Parser" to something more intuitive
- Fixxed #4: Datapoint "map" now gets created correctly
- Fixxed #5: Password-characters are no longer visible
- Fixxed type conflict of cableType

### 2.2.4 (2022-09-01)
- SebastianHanz fixed infinite RAM-usage
- added some description

### 2.2.3 (2022-08-30)
- SebastianHanz fixed type-conflicts. Thank you!

### 2.2.2 (2022-08-25)
- Bug fixes

### 2.2.1 (2022-08-22)
- Bug fixes

### 2.2.0 (2022-08-21)
- Fixed Bugs

### 2.1.0 (2022-08-19)
- Min Node Version 16

### 2.0.3 (2022-07-20)
- Updated Readme

### 2.0.2 (2022-07-12)
-   Bug fixed

### 2.0.1 (2022-07-10)
-   Added a how to install. Not to detail because currently not in stable repo.

### 2.0.0 (2022-07-10)
-   Fixed NPM Versions hopefully

### 1.1.0 (2022-07-10)
-   Added UselessPV and TimeStamp Parser, did some testing.

### 1.0.1 (2022-06-02)
- Tests

### 1.0.0 (2022-06-02)

- Did some changes
- Did some more changes

### 0.0.5 (2020-01-01)
- Better Code

### 0.0.4 (2020-01-01)
- Parser option added

### 0.0.3 (2020-01-01)
- Parser added

### 0.0.2 (2020-01-01)
- Bug fixed

### 0.0.1 (2020-01-01)
- Initial release

## License
MIT License

Copyright (c) 2025 tim2zg <tim2zg@protonmail.com>

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
