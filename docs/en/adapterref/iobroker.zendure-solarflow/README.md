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
- Control your Solarflow HUB like in the offical app. Most of the settings are available.
- Control the output limit - you are not limited to use a Shelly Pro EM to realize a zero feed-in. You can also design more complex scenarios via script or blockly in ioBroker.
- Stop input if one battery drops into low voltage (battery protect). Works only when setting the output limit via the adapter
- Control more than one Solarflow at the same time!
- Get more precise calculations!
- Works with all Zendure SolarFlow devices: HUB1200, Hyper2000, HUB2000 and AIO!

## Offline-Mode (Disconnect from Zendure Cloud)

As a new feature you can disconnect the Zendure device from the Cloud. You can either use the [Solarflow Bluetooth Manager](https://github.com/reinhard-brandstaedter/solarflow-bt-manager) from Reinhard Brandstätter or my own Windows Tool [Zendure Cloud Disconnector](https://github.com/nograx/zendure-cloud-disconnector) to disconnect the device from the cloud. It's also possible to redirect DNS requests with your router from "mq.zen-iot.com" to your own MQTT server!

Both tools connect to the Zendure device via bluetooth and simply sets the internal MQTT url to a new url/ip you have to provide. Currently you are forced to use the default MQTT port 1883 on your server. You are also forced to deactivate authentication on the MQTT server as the Zendure device use a hardcoded password.

If the Zendure device communicates with your MQTT server, you can connect this ioBroker adapter to the same MQTT instance. You have to provide the device model and the device key (which is shown in the Zendure Cloud Disconnector app).

You can still do firmware updates with the official Zendure app via bluetooth and use both bluetooth tools to reconnect the device to the cloud!

## Important

If you plan to control the charging and feed in of your device with a script/blockly, I recommend using the control parameter '**setDeviceAutomationInOutLimit**', as this controls the device without writing to the flash memory of the device. It is also a good idea to set the control state '**smartMode**' to true if you own a HUB 1200/2000 with ACE 1500, as it will also force the device to write 'acMode' changes to the ram instead of flash memory.

### Hyper 2000, SF 2400 AC oder SF 800 (pro)

On devices like the Hyper 2000, SF 2400 AC oder SF 800 (pro) you can use negative values to trigger charging from grid. SF 2400 AC oder SF 800 (pro) is currently **untested**!

### HUB 1200 / HUB 2000 / ACE 1500 Combo

On a HUB 1200 / HUB 2000 / ACE 1500 combination you have to use '**setDeviceAutomationInOutLimit**' for feed in and manualy switch acMode and the '**setInputLimit**' if you want to charge from the grid. Setting the '**smartMode**' to true is highly recommended in this scenario!

## Notes

This adapter will now use the Cloud Authorization Code for authentication on the official mqtt servers, which you can generate in the Zendure app!

## Changelog
### 3.3.0-alpha.0 (2025-12-22)

- Test deviceAutomation for ACE1500

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

Copyright (c) 2025 Peter Frommert

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
