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
- Built-in zero feed-in automation (PI-controlled, SOC-weighted power sharing across multiple devices), driven by your grid meter
- Works with all Zendure Solarflow devices
- **zenSDK**: local HTTP control for compatible devices, with data still relayed to the Zendure cloud so you keep full control if internet/Zendure servers are down

## Modes

- **Authentication Cloud Key** (recommended): the official Zendure method. Get a Cloud key from the app. By default zenSDK is used for compatible devices on the same network as ioBroker, giving full local control while still relaying data to the cloud. Cloud-only is also possible. Legacy devices already on a local MQTT server can relay to the cloud too, with no downside.
- **Local**: local-only mode. Point the adapter at a local MQTT server for legacy devices (see below); zenSDK devices are found via mDNS.
- **zenSDK only (mDNS)**: no Zendure cloud and no MQTT server at all. Devices are found via [mDNS discovery](#mdns-discovery) and polled/controlled locally via zenSDK only, so only zenSDK-compatible devices are supported.

### mDNS Discovery

When zenSDK is enabled, the adapter browses the network via mDNS/Bonjour for devices announcing as `Zendure-<model>-<serialNumber>` as long as it is running. The network is queried again after 5s, 15s, 30s and 60s, then every 5 minutes, so devices connected to the network later (or missed by an earlier query) are still found without restarting the adapter. This fills in or corrects IP addresses for known cloud devices, and auto-creates accessories (Mix series, Smart Meters) that have no cloud productKey and can't otherwise be created. Devices are matched by full serial number, not IP or a shortened suffix. Disable via the "Add devices found via mDNS discovery" setting.

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

## Adapter Automation (Zero Feed-In Control)

The adapter includes a built-in zero feed-in controller. It reads your grid meter and continuously adjusts `setDeviceAutomationInOutLimit` of all participating devices, so that the grid power stays close to a configurable setpoint - no external script needed. It works with a single device as well as with a fleet of multiple devices.

### Setup

1. Open the adapter settings, section **Automation**, and check **Enable adapter automation**.
2. Select the **Trigger state**: a state of your grid/smart meter with the current grid power in W (**positive = import from grid, negative = export to grid**). Every value change of this state runs one control cycle, so it should update frequently (every 1-5 seconds is ideal).
3. Save - the adapter restarts and creates the `adapterAutomation` states.
4. Enable automation for each device that should be controlled: `<productKey>.<deviceKey>.adapterAutomation.automationEnabled = true`.
5. Switch on the global switch `adapterAutomation.automationEnabled = true`.

⚠️ While automation is active for a device, do not write `setDeviceAutomationInOutLimit` from your own scripts for that device - the automation will overwrite it. Devices with `automationEnabled = false` are left completely untouched.

### States

Global (`zendure-solarflow.X.adapterAutomation.*`):

| State                            | Default | Description                                                                                                                                                     |
| -------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `automationEnabled`              | `false` | Global on/off switch for the automation.                                                                                                                        |
| `setPoint`                       | `10`    | Target grid power in W. A small positive value (slight import) avoids feeding into the grid.                                                                    |
| `setPointNearlyFull`             | `-100`  | Target grid power in W, used instead of `setPoint` when all batteries are at least 90% and there is solar input. Negative values allow feeding into the grid.   |
| `acOnlyPenalty`                  | `50`    | Score lead in % that AC-only devices need over the other devices to become lead device, once the other devices average above 35% SOC. `0` disables the penalty. |
| `surplusChargeTrigger`           | `100`   | Grid export in W beyond the setpoint at which idle AC-only devices start charging from surplus. Minimum `30`.                                                   |
| `ignoreSuggestedInverseMaxPower` | `false` | If `true`, the device's `inverseMaxPower` is used as maximum output instead of the suggested value (see below).                                                 |
| `deviceOrder`                    |         | Read-only. Current device order, the first device is the lead device.                                                                                           |

Per device (`<productKey>.<deviceKey>.adapterAutomation.*`):

| State                          | Description                                                                                                                                                                     |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `automationEnabled`            | Include this device in the automation (default `false`).                                                                                                                        |
| `forceAcCharging`              | Charge this device from the grid at its full `chargeMaxLimit` until it is full, regardless of the current demand (default `false`).                                             |
| `acChargingAllowed`            | Only for devices that can charge by AC but are not AC-only (e.g. SF 800 / 2400 Pro, Hyper 2000): charge this device from grid surplus like an AC-only device (default `false`). |
| `suggestedInverseMaxPower`     | Read-only. Maximum output power the automation uses for this device, calculated from SOC and the lowest cell voltage to protect the battery.                                    |
| `suggestedInverseMaxPowerInfo` | Read-only. Reason for the current suggested value.                                                                                                                              |
| `status`                       | Read-only. What the automation currently wants this device to do (e.g. feeding in, standby, charging from surplus), in the ioBroker system language (German or English).        |

### How it works

- **PI controller:** The required output is calculated from the current home usage (grid power + current output) plus a PI correction towards the setpoint. Within a small dead band (setpoint to setpoint + 10 W) nothing is changed, to avoid constant adjustments.
- **Power sharing:** The required power is distributed across the active devices weighted by their SOC - fuller devices take a bigger share. Devices below their own `minSoc` get no share. Power a device cannot deliver (above its maximum) is passed on to devices with headroom.
- **Lead device:** Devices are ranked by SOC and solar input (re-sorted every full hour). The lead device is always active; further devices are added when demand rises (above 70% utilization of the active devices) or when they are nearly full. Once added, devices stay active for at least 5 minutes to avoid flapping. Idle devices are kept at 10 W standby for a few minutes, so they react faster.
- **Battery protection:** `suggestedInverseMaxPower` limits the output at low SOC / low cell voltage (e.g. only 60-500 W when cells are weak) and at night (0-5 h) the limit is derived from the SOC. It never exceeds the device's `inverseMaxPower`.
- **AC-only devices** (e.g. SF 2400 AC, SF 1600 AC+, SF 3000/4000 Mix AC+) are preferred less as lead device once the other batteries are above 35%. When the grid meter shows a surplus (export at least `surplusChargeTrigger` W beyond the setpoint, default 100 W), idle AC-only devices (and devices with `acChargingAllowed`) charge with that surplus, up to their `chargeMaxLimit` (Power in W).
- **Charging safety:** A device only switches to charging after it has been idle at 0 W for at least 5 minutes, so it does not flip directly between discharging and charging.

## Notes

This adapter authenticates on the official MQTT servers using the Cloud Authorization Code, which you can generate in the Zendure app.

### Sentry (error reporting and device statistics)

This adapter uses Sentry libraries to automatically report exceptions and code errors to the developer. In addition, the adapter sends anonymous device statistics 5 minutes after start and then once every 24 hours: one event per used device class, containing only the device class, product key, product name and connection mode. No device keys, serial numbers, IP addresses or credentials are transmitted. These statistics help to see which devices are in use and where support is missing.

For more details and for information on how to disable error reporting, see the [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry). Sentry reporting is used starting with js-controller 3.0.

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 6.0.0-alpha.4 (2026-10-01)

- Zero-feed in: non-lead devices no longer get pulled out of idle into 30/10 W standby for a tiny share, and fully charged devices without solar input are released from standby to 0 W.
- Zero-feed in: devices are no longer added as extra feed-in device just because they have more than 100 W solar input.

### 6.0.0-alpha.3 (2026-10-01)

- Remove 0-5h reduction of suggested inverseMaxPower as this was related to Octopus Energy in personal setup.

### 6.0.0-alpha.2 (2026-10-01)

- Improvements on zero-feed in

### 6.0.0-alpha.1 (2026-09-30)

- Fix setDeviceAutomationInOutLimit not correctly set on non-zenSDK devices when automation is used.

### 6.0.0-alpha.0 (2026-09-30)

- Add adapter automation (zero feed-in control), see section "Adapter Automation" above.
- Add connection mode "zenSDK only (mDNS)": no Zendure cloud and no MQTT server, devices are found via mDNS and controlled via zenSDK.
- mDNS discovery now runs as long as the adapter is running instead of only 10s after start. Devices connected later are added automatically, IP changes are detected, and failed zenSDK connects are retried.
- Fix using the saved device list when Zendure Cloud is not reachable on startup.
- Devices created via mDNS keep their states when they appear in the Zendure cloud device list later (cloud MQTT still works for them). Devices with an unknown productKey in the cloud device list are logged as info instead of error.
- Disconnect MQTT clients cleanly when the adapter is stopped or restarted.
- Added Sentry (default ioBroker) for error reporting and device statistics.

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