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

<!--
    Placeholder for the next version (at the beginning of the line):
    ## **WORK IN PROGRESS**
-->

## Changelog

### **WORK IN PROGRESS**

- (copilot) Adapter requires node.js >= 22 now

### 4.0.4 (2026-04-14)

- Update dependencies

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

[Older changelogs can be found there](CHANGELOG_OLD.md)

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
