![Logo](admin/millheater.png)

# ioBroker.millheater

![Number of Installations](https://iobroker.live/badges/millheater-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/millheater-stable.svg)
[![NPM version](https://img.shields.io/npm/v/iobroker.millheater.svg)](https://www.npmjs.com/package/iobroker.millheater)
[![Downloads](https://img.shields.io/npm/dm/iobroker.millheater.svg)](https://www.npmjs.com/package/iobroker.millheater)
[![Test and Release](https://github.com/webbummler/ioBroker.millheater/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/webbummler/ioBroker.millheater/actions/workflows/test-and-release.yml)

## About

The `millheater` adapter integrates Mill heaters into ioBroker using the local API of the heater.

The adapter is designed for smart heating automation. It provides the values and controls needed to operate Mill devices from ioBroker, for example to use available photovoltaic (PV) surplus power for heating.

For this purpose, select **`Control individually`** as the operating mode on the heater. In this mode, the heater follows the target temperature set by ioBroker instead of its weekly program or timers. Depending on the heater type, ioBroker can also adjust the available heating power.
This makes it possible, for example, to use available PV surplus power for heating by automatically adjusting the heating level according to the available surplus.

The adapter communicates directly with the heater over the local network. No cloud connection is required for the communication between ioBroker and the heater.

The adapter currently supports Millheat heater generation 3.

## Features

- Local communication with Mill devices; no cloud connection required
- Manage multiple Mill devices in one adapter instance
- Support for convection, oil and panel heaters, and Wi-Fi sockets
- Automatic detection of the connected device type
- Device identification and replacement detection using the MAC address
- Separate status and control for each device
- Reading room temperature, heating power and device status
- Setting the target temperature and operating mode
- Reading and changing temperature calibration
- Device-specific power control for oil and panel heaters
- Additional mode control for Wi-Fi sockets
- Separate fast and slow polling intervals
- Optional polling while a heater is switched off
- Connection status for each device
- Suitable for external automation, including PV surplus control

## Requirements

- ioBroker
- Supported Mill Generation 3 devices with an available local API
- The Mill devices and ioBroker must be reachable over the local network
- Node.js 22 or newer, subject to the requirements of the installed ioBroker version

## Configuration

Configure the Mill devices in the adapter's device list. Enter the IP address or hostname for each device. Multiple devices can be managed by a single adapter instance.

Use a fixed IP address, a DHCP reservation or a hostname that resolves to the device. If a device receives a new IP address, update its configured address. The MAC address is used to identify the physical device independently of its network address.

### Configuration parameters

| Parameter | Description | Default |
| --- | --- | ---: |
| Device address | IP address or hostname of each Mill device | — |
| HTTP timeout | Maximum time to wait for an API response, in seconds | 5 |
| Fast polling interval | Update interval for frequently changing values, in seconds | 30 |
| Slow polling interval | Update interval for values that change less frequently, in seconds | 86400 |
| `pollWhenOff` | Continue polling while a heater is switched off | — |

The timeout and polling intervals must be whole numbers. The adapter checks the values in the Admin interface and again when it starts:

- HTTP timeout: 1 to 60 seconds
- Fast polling interval: At least the HTTP timeout plus 1 second; maximum 3,600 seconds (1 hour)
- Slow polling interval: At least the fast polling interval plus the HTTP timeout; maximum 86,400 seconds (24 hours)

### Polling while a heater is switched off

The `pollWhenOff` option determines whether the adapter continues to query heaters while they are switched off.

- **Enabled:** Polling continues while a heater is off. This is appropriate when the heater may also be switched on or off outside ioBroker.
- **Disabled:** Once the adapter detects that a heater is off, polling for that heater stops. In this mode, switch the heater on again through the adapter. An external switch-on is not detected while polling is stopped.

This is intentional. Disabling polling while off is intended for installations where the adapter is responsible for controlling the heater. When external control is required, enable this option.

## Supported heater types

The adapter supports the following Mill Generation 3 device types:

- Convection heaters
- Oil heaters
- Panel heaters
- Wi-Fi sockets

The adapter detects the device type from information reported by the Mill API and provides the corresponding device-specific settings where applicable.

### Oil heaters

Oil heaters provide the writable state `settings.heating_level_percentage`:

| Value | Heating level |
| ---: | --- |
| `40` | 40 % |
| `60` | 60 % |
| `100` | 100 % |

The setting controls the selected percentage of the heater's nominal power and can be adjusted by ioBroker automation according to the available PV surplus.

### Panel heaters

Panel heaters provide the writable state `settings.limited_heating_power`. It accepts integer values from `10` to `100` and sets the maximum available heating power as a percentage.

### Wi-Fi sockets

Wi-Fi sockets provide the writable state `settings.additional_mode`. It accepts integer values from `0` to `4`.

## Operating modes

The `control-status.operation_mode` state supports the following values:

| Value | Description |
| --- | --- |
| `Off` | The device is switched off |
| `Weekly program` | The heater follows its weekly schedule |
| `Independent device` | Independent operation of the heater |
| `Control individually` | The heater follows the individual target temperature without using timers or the weekly program |

For control by ioBroker, especially for PV surplus automation, use **`Control individually`**. This allows ioBroker to adjust the target temperature and the device-specific heating power without interference from the heater's weekly program or timers.

For example, a PV surplus control can use the available surplus power to select an appropriate heating level:
- Low PV surplus → lower heating level
- Higher PV surplus → higher heating level
- No relevant PV surplus → heating level can be reduced again

## Device identification

The adapter uses the MAC address to identify each physical Mill device. The IP address or hostname is used to communicate with the device; it is not its identity.

- The same MAC address identifies the same physical device, even if its configured IP address changes.
- A different MAC address at a configured address is treated as a different device.
- Previously known devices can be recognised again by their MAC address.
- If a MAC address is missing or invalid, an already established device identity is retained.

The adapter does not automatically scan the network for devices at unknown addresses. If a device's IP address changes, update its address in the device list. The MAC address then allows the adapter to recognise the physical device correctly.

## Data points

The adapter creates a separate data point tree for each configured Mill device. The following groups are available for each device. Device-specific settings are only available for the corresponding device type.

```text
millheater.0
├── <device 1>
│   ├── info
│   │   └── connection
│   ├── status
│   │   ├── name
│   │   ├── custom_name
│   │   ├── version
│   │   ├── operation_key
│   │   └── mac_address
│   ├── control-status
│   │   ├── ambient_temperature
│   │   ├── connected_to_cloud
│   │   ├── control_signal
│   │   ├── current_power
│   │   ├── lock_active
│   │   ├── open_window_active_now
│   │   ├── operation_mode
│   │   ├── raw_ambient_temperature
│   │   ├── set_temperature
│   │   └── switched_on
│   └── settings
│       ├── additional_mode
│       ├── heating_level_percentage
│       ├── limited_heating_power
│       └── temperature_calibration_offset
└── <device 2>
    └── ...
```

### `info`

| State | Description | Read | Write |
| --- | --- | :---: | :---: |
| `connection` | Local API connection status of this device | ✓ | |

### `status`

| State | Description | Read | Write |
| --- | --- | :---: | :---: |
| `name` | Device name or model reported by the API | ✓ | |
| `custom_name` | Custom device name | ✓ | |
| `version` | API or firmware version information | ✓ | |
| `operation_key` | Operation or fault information reported by the API | ✓ | |
| `mac_address` | MAC address of the device | ✓ | |

### `control-status`

| State | Description | Unit | Read | Write |
| --- | --- | --- | :---: | :---: |
| `ambient_temperature` | Current ambient temperature including calibration offset | °C | ✓ | |
| `connected_to_cloud` | Indicates whether the device is connected to the Mill cloud | | ✓ | |
| `control_signal` | Current control signal of the PID regulator | % | ✓ | |
| `current_power` | Current heating power | W | ✓ | |
| `lock_active` | Current lock status | | ✓ | |
| `open_window_active_now` | Current open-window detection status | | ✓ | |
| `operation_mode` | Current operating mode | | ✓ | ✓ |
| `raw_ambient_temperature` | Ambient temperature without calibration offset | °C | ✓ | |
| `set_temperature` | Target temperature | °C | ✓ | ✓ |
| `switched_on` | Indicates whether the device is switched on | | ✓ | |

### `settings`

| State | Description | Unit | Read | Write |
| --- | --- | --- | :---: | :---: |
| `additional_mode` | Additional mode for Wi-Fi sockets | | ✓ | ✓ |
| `heating_level_percentage` | Heating level for oil heaters | % | ✓ | ✓ |
| `limited_heating_power` | Maximum heating power for panel heaters | % | ✓ | ✓ |
| `temperature_calibration_offset` | Temperature calibration offset | °C | ✓ | ✓ |

## Local API

The adapter communicates directly with Mill devices through their local HTTP API. A Mill cloud account is not required for local communication.

The local API used by this adapter is documented by Mill International AS in their

[Generation 3 REST API documentation](https://github.com/Mill-International-AS/Generation_3_REST_API).

The availability of individual functions depends on the device type.

## Polling

The adapter uses two independently configurable polling intervals:

- **Fast polling** updates frequently changing values such as room temperature, heating power, operating mode and target temperature.
- **Slow polling** updates information that normally changes less frequently, such as device information and temperature calibration.

Each device is handled independently. The configured intervals determine how frequently its values are refreshed. If an update takes longer, the next cycle starts later; polling cycles do not accumulate.

The `pollWhenOff` option controls whether polling continues for a device while it is switched off. See [Polling while a heater is switched off](#polling-while-a-heater-is-switched-off) for details.

## Writing values

Writable data points can be controlled through ioBroker states. The adapter checks values before sending them to the device and acknowledges successful commands.

The following limits apply:

- **Oil heater power:** `40`, `60` or `100`
- **Operating mode:** One of the supported modes listed above
- **Panel heater power limitation:** Integer from `10` to `100`
- **Target temperature:** 5 °C to 35 °C
- **Temperature calibration offset:** -30 °C to +30 °C
- **Wi-Fi socket additional mode:** Integer from `0` to `4`

Device-specific settings can only be changed on devices that support them. Invalid values and unsuccessful commands are not applied as successful state changes.

### Target temperature

The target temperature can be changed even when the heater is switched off.

After a successful temperature change, the adapter immediately acknowledges the new value in ioBroker.

When the heater is switched off, the changed target temperature may not be returned by the heater. The API returns the configured target temperature again after the heater has been switched on.
This means that the value shown in `control-status.set_temperature` may not immediately reflect the newly configured value when the heater is switched off.

## Development

The source code is written in TypeScript.

## Development guidelines

The adapter follows the ioBroker development and coding guidelines.
For state objects, the adapter uses the official ioBroker state roles.

### State updates

The adapter uses `setStateChanged()` for state updates wherever possible.

This avoids unnecessary database writes and state change events when a value has not changed. This is particularly useful for regularly polled device data.

The adapter follows these principles:

- Device values are only written when their values change.
- Successfully processed write commands are acknowledged immediately using `ack = true`.
- Connection status updates are only written when the connection state changes.
- Invalid or missing API values never overwrite existing states.

## Changelog

### 0.2.3

- Strengthen security and reliability through safer log handling, improved API response handling and protection against excessive resource usage.
- Improve device identification and replacement handling, including after adapter restarts.
- Improve management of historical device data while protecting active devices and their existing values.
- Ensure consistent handling of the operating mode reported by the Mill API.
- Extend integration tests for security, reliability and device management.

### 0.2.2

- Improved API security and reliability: external response data is sanitized before logging, response sizes and total request durations are limited, and pending state changes are capped at 10 per device.

### 0.2.1

- Dependencies have been updated.

### 0.2.0

- BREAKING: The adapter now supports multiple Mill devices within a single instance. The configuration and device
  data point structure have changed. Existing scripts and visualizations may need to be adapted.
- Introduce per-device handling for status, polling and control.
- Identify physical devices by MAC address, including recognition after an IP address change.
- Handle device replacement and previously known devices.
- Add the `pollWhenOff` option to control polling while a heater is switched off.
- Improve device-specific state handling and write operations.
- Improve configuration validation and polling behaviour.

## License

MIT License

Copyright (c) 2026 webbummler [moin@webbummler.de](mailto:moin@webbummler.de)

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