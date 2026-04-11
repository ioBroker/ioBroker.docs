![Logo](admin/zendure-solarflow.png)

# ioBroker.zendure-solarflow

[![NPM version](https://img.shields.io/npm/v/iobroker.zendure-solarflow.svg)](https://www.npmjs.com/package/iobroker.zendure-solarflow)
[![Downloads](https://img.shields.io/npm/dm/iobroker.zendure-solarflow.svg)](https://www.npmjs.com/package/iobroker.zendure-solarflow)
![Number of Installations](https://iobroker.live/badges/zendure-solarflow-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/zendure-solarflow-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.zendure-solarflow.png?downloads=true)](https://nodei.co/npm/iobroker.zendure-solarflow/)

**Tests:** ![Test and Release](https://github.com/nograx/ioBroker.zendure-solarflow/workflows/Test%20and%20Release/badge.svg)

## Zendure Solarflow adapter for ioBroker

This project is an ioBroker Adapter to read data from the Zendure Solarflow Cloud API.

## Donate

If you find the adapter useful for you and want to support my work, feel free to donate by Paypal. Thank You!
(this is an personal Donate link for Nograx, in no relation to the ioBroker Project!)<br />

[![Donate](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://www.paypal.com/paypalme/PeterFrommert)

## Features

- Get all telemetry data from your Solarflow devices, also those not visible in the offical app - like battery voltage
- Control your Solarflow devices like in the offical app. Most of the settings are available.
- Control the output and input limit - you are not limited to use a Shelly Pro EM to realize a zero feed-in. You can also design more complex scenarios via script or blockly in ioBroker.
- Stop input if one battery drops into low voltage (battery protect). Works only when setting the output limit via the adapter
- Control more than one Solarflow at the same time!
- Get more precise calculations!
- Works with all Zendure SolarFlow devices!
- **zenSDK Integration**: Advanced communication for compatible devices via local HTTP communication
- **Relay MQTT messages to cloud**: The device has full local control and data is relayed to the Zendure MQTT. You won't lose control if internet if broken or Zendure servers are offline.

## Supported Devices

Currently all Zendure Solarflow devices are supported via cloud.

## Modes

- **Authentication Cloud Key** Official method supported by Zendure. Obtain a Cloud key from the official app. By default the zenSDK is used (the device has to be on the same network as the ioBroker instance). You can opt out to use only cloud mode. For older devices with mqtt set to a local server, it's now possible to relay data to the cloud without any disadvantages!

- **Local MQTT** It's also possible to use the local only mode. Currently there is no known way for the new Solarflow devices to set the MQTT server directly on the device, so for these you have to use a DNS relay.

### zenSDK Compatible Devices ✅

These devices support the advanced zenSDK automation features with full **local** control over http:

- **Solarflow 1600 AC Plus** - Full zenSDK support
- **Solarflow 2400 AC** - Full zenSDK support
- **Solarflow 2400 AC Plus** - Full zenSDK support
- **Solarflow 2400 Pro** - Full zenSDK support
- **Solarflow 800** - Full zenSDK support
- **Solarflow 800 Plus** - Full zenSDK support
- **Solarflow 800 Pro** - Full zenSDK support

### Legacy Devices 🔄

These devices are supported via **local** MQTT mode (Zendure Cloud Disconnector):

- **HUB 1200** - Local mode support, can relay messages to cloud
- **HUB 2000** - Local mode support, can relay messages to cloud
- **Hyper 2000** - Local mode support, can relay messages to cloud
- **AIO 2400** - Local mode support, can relay messages to cloud
- **ACE 1500** - Local mode support, can relay messages to cloud

### Local Mode Benefits 🏠

"Legacy" devices can be completely disconnected from Zendure Cloud while maintaining full functionality:

- **Privacy**: No data sent to Zendure servers
- **Reliability**: Direct local MQTT communication
- **Speed**: Faster response times without cloud latency
- **Flexibility**: Can relay messages to cloud when needed
- **Control**: Full local automation without internet dependency
- **Updates**: You can still do firmware updates with the official Zendure app via bluetooth

## Offline-Mode (Disconnect from Zendure Cloud)

As a new feature you can disconnect the Zendure device from the Cloud. You can either use the [Solarflow Bluetooth Manager](https://github.com/reinhard-brandstaedter/solarflow-bt-manager) from Reinhard Brandstätter or my own Windows Tool [Zendure Cloud Disconnector](https://github.com/nograx/zendure-cloud-disconnector) to disconnect the device from the cloud. It's also possible to redirect DNS requests with your router from "mq.zen-iot.com" to your own MQTT server!

Both tools connect to the Zendure device via bluetooth and simply sets the internal MQTT url to a new url/ip you have to provide. Currently you are forced to use the default MQTT port 1883 on your server. You are also forced to deactivate authentication on the MQTT server as the Zendure device use a hardcoded password.

You can use this in combination with your cloud authentication key or use the full local mode.

## Important

If you plan to control the charging and feed in of your device with a script/blockly, I recommend using the control parameter '**setDeviceAutomationInOutLimit**', as this controls the device without writing to the flash memory of the device. You can use negative values to trigger charging from grid.

## Notes

This adapter will use the Cloud Authorization Code for authentication on the official mqtt servers, which you can generate in the Zendure app!

## Changelog
### 4.0.3 (2026-03-31)

- Fix missing ip address field in settings for local mode
- Add retry loop for zenSDK requests (retry 3 times if connection failed)
- Update battery detection

### 4.0.2 (2026-03-24)

- Re-add new SF devices to local mode settings
- Add product key '64174u' for Solarflow 1600 AC+

### 4.0.1 (2026-03-20)

- Fix missing smartMode state for Solarflow AC 2400 and Solarflow 800

### 4.0.0 (2026-03-17)

- Add support for zenSDK! All devices can now communicate in the local network (with full cloud support for backup and maintenance)
- Add possibility to relay local MQTT messages to Zendure cloud!
- Save device list from Zendure Cloud as a local backup if cloud is unavailable
- Major refactor and improvements
- Fix 'packPower' not correctly set (resetting to 0 every new data package)

### 3.6.0 (2026-03-06)

- Fix packInputPower & outputPackPower on new Solarflow devices
- Fix device constructor in local mode
- Fix setDeviceAutomationInOutLimit for Solarflow 1600 AC+
- Read more data from Zendure WebService
- Set ACK flag correctly for hemsEP function
- Refactor some files

### 3.5.4 (2026-03-05)

- Add device key '65174u' for Solarflow 1600 AC+

### 3.5.3 (2026-03-01)

- Fix setDeviceAutomationInOutLimit on certain HEMS devices like 2400 AC(+)

### 3.5.2 (2026-02-28)

- Add productKey '5fG27j' for Solarflow 2400 AC+

### 3.5.1 (2026-02-19)

- Try to update state only if state exist for this device
- Improved error handling

### 3.5.0 (2026-02-18)

- Add productKey '2Qe7C9' for Solarflow 2400 Pro
- Add event handler (log message) for MQTT disconnect

### 3.4.0 (2026-02-16)

- Add productKey '8n77V3' for Solarflow 800 Plus
- Remove passMode, pass and buzzerSwitch from Hyper 2000

### 3.3.2 (2026-02-02)

- Fix another 'has no existing object' message bug on pvPower3 + 4
- Fix Battery identification of AB2000X and calculation of 'energyWhMax'
- Fix Battery identification of AB3000 and calculation of 'energyWhMax'

### 3.3.1 (2026-01-30)

- Fix calculation issue

### 3.3.0 (2026-01-30)

- Fix 'has no existing object' messages on pvPower3 + 4
- Fix AC input limit of SF 800 Pro

### 3.2.2 (2025-12-21)

- Fix reset of calculation states if PV3+4 (SF 800 Pro)

### 3.2.1 (2025-12-17)

- Fix setDeviceAutomation charging mode

### 3.2.0 (2025-12-17)

- Fix inputLimit on certain devices
- Fix calculation of PV3 & 4 again (hopefully now 100%)
- Add some more specific debug messages
- Remove misleading error message on adapter start
- Replace restart on checkStatesJob with a debug message (I think Zendure cloud is stable now)
- Update adapter to adapter-react-v5 (MUI v5)
- Fix commandbar in settings

### 3.1.1 (2025-12-01)

- Fix Uppercase 'a4ss5p' in helpers.ts

### 3.1.0 (2025-12-01)

- Fix setInputLimit (always use positive value!)
- Add calculation states for PV3 & PV4 (used by SF 800 Pro)

### 3.0.8 (2025-10-22)

- Fix missing smartMode state for SF 800 Pro

### 3.0.7 (2025-10-20)

- Fix creation of SF 800 Pro device

### 3.0.5 (2025-10-20)

- Add some more log information on device creation

### 3.0.4 (2025-10-09)

- Fix inputLimit issue
- Fix Wifi status not updating when packData changes

### 3.0.3 (2025-10-07)

- Optimize setting of wifiMode in local mode
- Optimize Debug option

### 3.0.2 (2025-10-06)

- Ignore 'wifiState' for last update value

### 3.0.1 (2025-10-02)

- Update 'lastUpdate' when a battery value changes
- Add deviceKey 'R3mn8U' for Solarflow 800 Pro

### 3.0.0 (2025-09-30)

- Breaking Change: Change authentication to "authentication cloud key". You can generate a key in the official zendure app
- Removed fallback server
- Add deviceKey 'a4ss5P' for Solarflow 800
- Refactor a lot of code

### 2.0.4 (2025-09-12)

- Fix creation of control states on new Hyper 2000 v3
- Updates dependencies

### 2.0.3 (2025-09-09)

- Added 'B3Dxda' as new Hyper 2000 productKey
- Removed parameter 'upTime' and 'pullTime' from 'setDeviceAutomationInOutLimit'
- TEST: Use 'setDeviceAutomationInOutLimit' to let HUB1200/HUB2000 charge with connected ACE 1500

### 2.0.1 (2025-07-22)

- Small fix MQTT service

### 2.0.0 (2025-07-21)

- Breaking Change: Add control parameter 'setDeviceAutomationInOutLimit' which emulates Zendure's Smart Matching mode. I recommend using this device automation instead of 'setInputLimit'/'setOutputLimit' from now on, as there were concerns that setting limits/modes would be stored in the flash memory. You can use negative values for charging and positive for feed in. On HUB 1200/2000 with ACE 1500 you can use "smartMode" to prevent switching AC mode trigger writing to the flash memory. Check you the readme for more details or participate in the ioBroker forum.

### 1.15.4 (2025-07-17)

- Add smart mode control parameter for more devices

### 1.15.3 (2025-07-17)

- Match case sensitive product key for SF 2400 AC and SF 800 in settings if local mode is used
- Add sensor and control of "SmartMode"

### 1.15.2 (2025-07-14)

- Fix missing SF 800 & 2400 AC in local mode settings

### 1.15.1 (2025-07-11)

- Fix missing Solar Input 3 & 4 on Solarflow 800 Pro
- Fix 'packPower' state did not set to 0 if no input/output

### 1.15.0 (2025-06-27)

- Add 'packPower' state, which shows combined power from (packInputPower and outputPackPower). Discharging will be shown with a negative value.
- Add 'hyperTmp' to Solarflow 800 devices in hope this will show the temperature of the Solarflow 800 (can not test it due to lack of test device).

## License

MIT License

Copyright (c) 2026 Peter Frommert

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
