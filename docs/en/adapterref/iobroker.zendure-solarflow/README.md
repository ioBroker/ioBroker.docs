![Logo](admin/zendure-solarflow.png)

# ioBroker.zendure-solarflow

[![NPM version](https://img.shields.io/npm/v/iobroker.zendure-solarflow.svg)](https://www.npmjs.com/package/iobroker.zendure-solarflow)
[![Downloads](https://img.shields.io/npm/dm/iobroker.zendure-solarflow.svg)](https://www.npmjs.com/package/iobroker.zendure-solarflow)
![Number of Installations](https://iobroker.live/badges/zendure-solarflow-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/zendure-solarflow-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.zendure-solarflow.png?downloads=true)](https://nodei.co/npm/iobroker.zendure-solarflow/)

**Tests:** ![Test and Release](https://github.com/nograx/ioBroker.zendure-solarflow/workflows/Test%20and%20Release/badge.svg)

## Zendure Solarflow adapter for ioBroker

An ioBroker adapter to read and control Zendure Solarflow devices via the Zendure Cloud API, and locally via zenSDK (HTTP) or MQTT for legacy devices.

## Donate

If you find the adapter useful and want to support my work, feel free to donate via PayPal. Thank you!
(personal donation link for Nograx, unrelated to the ioBroker project)

[![Donate](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://www.paypal.com/paypalme/PeterFrommert)

## Features

- Full telemetry from your Solarflow devices, including values not shown in the official app (e.g. battery voltage)
- Control devices like the official app - most settings are available
- Set output/input limits for zero feed-in scenarios without a Shelly Pro EM, or build more complex automations via script/Blockly
- Battery protect: stop input if a battery drops into low voltage (requires output limit set via the adapter)
- Control multiple Solarflow devices at once, with more precise calculations
- Works with all Zendure Solarflow devices
- **zenSDK**: local HTTP control for compatible devices, with data still relayed to the Zendure cloud so you keep full control if internet/Zendure servers are down

## Modes

- **Authentication Cloud Key** (recommended): the official Zendure method. Get a Cloud key from the app. By default zenSDK is used for compatible devices on the same network as ioBroker, giving full local control while still relaying data to the cloud. Cloud-only is also possible. Legacy devices already on a local MQTT server can relay to the cloud too, with no downside.
- **Local**: local-only mode. Point the adapter at a local MQTT server for legacy devices (see below); zenSDK devices are found via mDNS.

### mDNS Discovery

When zenSDK is enabled, the adapter briefly browses the network via mDNS/Bonjour on startup for devices announcing as `Zendure-<model>-<serialNumber>`. This fills in or corrects IP addresses for known cloud devices, and auto-creates accessories (Mix series, Smart Meters) that have no cloud productKey and can't otherwise be created. Devices are matched by full serial number, not IP or a shortened suffix. Disable via the "Add devices found via mDNS discovery" setting.

## Supported Devices

### zenSDK Compatible Devices ✅ (full local control via HTTP)

> **Recommended by Zendure**: use the Authentication Cloud Key mode above - it gives full local control while keeping the cloud connection for convenience. No need to disconnect these devices from the cloud.

- Solarflow 1600 AC Plus, 2400 AC, 2400 AC Plus, 2400 Pro, 800, 800 Plus, 800 Pro
- Solarflow 3000 Mix AC+, 4000 Mix AC+, 4000 Mix Pro _(no cloud productKey yet - added via [mDNS discovery](#mdns-discovery) only)_

### Smart Meter Accessories 📊 (read-only, zenSDK/mDNS only)

- **Smart Meter 3CT** - apparent power per phase (A/B/C) and total, via current transformers
- **Smart Meter D0** - live utility meter readings via IEC 62056-21 optical interface

### Legacy Devices 🔄 (local MQTT mode via Zendure Cloud Disconnector)

- HUB 1200, HUB 2000, Hyper 2000, AIO 2400, ACE 1500 - all support local mode and can still relay to the cloud

**Local mode benefits:** no data sent to Zendure servers (recommended to send them by relaying), direct/faster MQTT communication, full offline automation, and cloud relay can be re-enabled anytime. Firmware updates via the official app/Bluetooth still work.

## Offline-Mode (Disconnect from Zendure Cloud) for Legacy Devices

⚠️ **Warranty Warning:** Changing the MQTT server directly on the device (via Bluetooth tools or DNS redirect) is not officially supported and **will void your device's warranty**. Proceed at your own risk.

To disconnect a legacy device from the cloud, use the [Solarflow Bluetooth Manager](https://github.com/reinhard-brandstaedter/solarflow-bt-manager) by Reinhard Brandstätter or my [Zendure Cloud Disconnector](https://github.com/nograx/zendure-cloud-disconnector) - both set the device's MQTT URL via Bluetooth. Alternatively, redirect DNS requests for "mq.zen-iot.com" to your own MQTT server via your router.

**Note:** these Bluetooth tools only work for **Legacy Devices**. For **zenSDK** devices, use Zendure's official offline method instead.

Both tools force the default MQTT port (1883, or 8883 with SSL) and require authentication disabled on your server, since the device uses a hardcoded password. You can combine this with your cloud authentication key, or use full local mode.

## Important

To control charging/feed-in via script or Blockly, use the **`setDeviceAutomationInOutLimit`** control parameter - it controls the device without writing to flash memory. Negative values trigger charging from grid.

## Notes

This adapter authenticates on the official MQTT servers using the Cloud Authorization Code, which you can generate in the Zendure app.

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

## Changelog

### 5.3.0 (2026-09-02)

- Add folder "settings" for zenSDK devices. Here you can turn device polling on/off and control the polling interval for individual devices.
- Round hyperTmp to nearest int.
- Adjust checkVoltage function to take account of the 24V architecture of the new Mix series.
- Start mDNS discovery start after fetching deviceList from Zendure cloud.
- Fix lower case bug in comparing product keys for new mDNS device creation

### 5.2.1 (2026-08-30)

- BREAKING: `setDeviceAutomationInOutLimit` on Hyper 2000 uses simulated HEMS now and requires `hemsState = 1` and `autoModel = 0` to control the device (automatically set by the adapter). Please check your control parameters (e.g. inverseMaxPower) after updating if you use setDeviceAutomationInOutLimit.
- Add support for Solarflow 3000/4000 Mix AC+ and 4000 Mix Pro via mDNS auto-discovery
- Add support for Smart Meter 3CT and Smart Meter D0 (read-only zenSDK accessories, with proper power state names/units and no control or packData states)
- Correct a device's IP via mDNS if it no longer matches the (stale or wrong) IP from the cloud device list
- Process zenSDK measurements reported directly on the response instead of nested under "properties" (affects Smart Meter 3CT/D0)
- Enable "mDNS discovery" by default, including for existing instances that never had this setting saved - you must disable this option in settings if not desired

### 5.1.0 (2026-08-20)

- Fix batCur Reading
- Add control state for inverseMaxPower and gridOffMode (Control AC outlet on 'Plus' Devices)

### 5.0.4 (2026-08-19)

- Fix flickering Save button in Settings.
- Add function to detect zenSDK devices with mDNS and fill missing IP-address if found.

### 5.0.3 (2026-08-18)

- Fix `wifiState` not being created/updated correctly for devices using local zenSDK polling (Solarflow 2400 AC/AC Plus/Pro, 1600 AC Plus), as their local status payload does not report a `wifiState` property

For older changes see CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 Peter Frommert <peter.frommert@outlook.com>

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