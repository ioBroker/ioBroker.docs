![Logo](admin/millheater.png)

# ioBroker.millheater

![Number of Installations](https://iobroker.live/badges/millheater-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/millheater-stable.svg)
[![NPM version](https://img.shields.io/npm/v/iobroker.millheater.svg)](https://www.npmjs.com/package/iobroker.millheater)
[![Downloads](https://img.shields.io/npm/dm/iobroker.millheater.svg)](https://www.npmjs.com/package/iobroker.millheater)
[![Test and Release](https://github.com/webbummler/ioBroker.millheater/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/webbummler/ioBroker.millheater/actions/workflows/test-and-release.yml)

## About

The `millheater` adapter integrates Mill heaters into ioBroker using the local API of the heater.

The adapter is designed to integrate Mill heaters into a smart heating control system. This allows the heater to be controlled by external automation systems in ioBroker, for example based on available photovoltaic (PV) surplus power.

For this type of use, the operating mode **`Control individually`** should be selected on the heater. In this mode, the heater follows the individual target temperature without using timers or the weekly program. The target temperature and heater-specific power levels can then be controlled by ioBroker.

This makes it possible, for example, to use available PV surplus power for heating by automatically adjusting the heating level according to the available surplus.

The adapter communicates directly with the heater over the local network. No cloud connection is required for the communication between ioBroker and the heater.

The adapter currently supports Millheat heater generation 3.

## Features

* Local communication with the Mill heater
* Automatic polling of heater status
* Configurable HTTP request timeout
* Separate fast and slow polling intervals
* Automatic detection of the heater type
* Automatic detection of heater replacement using the MAC address
* Reading current temperature and heating power
* Reading and changing the target temperature
* Reading and changing the operating mode
* Reading and changing temperature calibration
* Reading and changing heater-specific power settings
* Reading and changing the additional mode for Wi-Fi socket heaters
* Connection status via `info.connection`
* Centralized API request handling with mutual exclusion
* Skippable GET polling requests when the API is busy
* Immediate acknowledgement of successfully processed write commands
* Automatic verification through the regular polling cycle
* Suitable as a building block for smart heating automation, such as PV surplus control

## Requirements

* ioBroker
* A supported Mill heater with an available local API
* The heater and ioBroker must be reachable within the same network
* Node.js version compatible with the installed ioBroker version (Node.js 22 or newer)

## Configuration

The adapter requires the IP address or hostname of the Mill heater.

### Configuration parameters

| Parameter             | Description                                          | Default |
| --------------------- | ---------------------------------------------------- | ------: |
| host address          | IP address or hostname of the Mill heater            |   empty |
| HTTP timeout          | Maximum time to wait for an HTTP request, in seconds |       5 |
| Fast polling interval | Interval for frequently changing values, in seconds  |      30 |
| Slow polling interval | Interval for slowly changing values, in seconds      |   86400 |

The HTTP timeout defines how long the adapter waits for an API request before the request is considered failed.

The fast polling interval is used for values such as the current temperature, heating power and operating state.

The slow polling interval is used for values that normally change less frequently, such as the temperature calibration offset.

The adapter validates the timing values in the Admin interface and again at startup. All timing values must be integers in seconds and meet the following limits:

* **HTTP timeout:** Between 1 and 60 seconds.
* **Fast polling interval:** At least the HTTP timeout + 1 second, with a maximum of 3,600 seconds (1 hour).
* **Slow polling interval:** At least the fast polling interval + the HTTP timeout, with a maximum of 86,400 seconds (24 hours).

For reliable communication, use a static IP address, a DHCP reservation, or a hostname that resolves to the heater.

## Supported heater types

The adapter currently supports:

**Convection heaters** 
**Oil heaters**
**Panel heaters**
**Wi-Fi Socket**

The adapter determines the heater type from the name reported by the Mill API.

### Oil heaters

Oil heaters support the following additional setting:

`settings.heating_level_percentage`

Allowed values:

* `40 %`
* `60 %`
* `100 %`

These values represent the selected percentage of the heater's nominal power.

The value can only be written for oil heaters. Invalid values are rejected by the adapter.

This makes the setting particularly useful for smart energy management. For example, an ioBroker automation can select the appropriate heating level based on the currently available PV surplus.

### Panel heaters

Panel heaters support:

`settings.limited_heating_power`

The value can be set to integer values from `10 %` to `100 %`.

The value can only be written for panel heaters. Invalid values are rejected by the adapter.

This setting can also be used by external automation to adapt the available heating power to the current energy situation.

### Wi-Fi Socket

Wi-Fi sockets support the following additional setting:

`settings.additional_mode`

The additional socket mode accepts integer values from `0` to `4`.

The value can only be read and written for Wi-Fi socket devices. Invalid values are rejected by the adapter.

## Operating modes

The `operation_mode` state supports the following values:

| Value                  | Description                                                                         |
| ---------------------- | ----------------------------------------------------------------------------------- |
| `Off`                  | Heater switched off                                                                 |
| `Weekly program`       | Weekly schedule                                                                     |
| `Independent device`   | Independent device operation                                                        |
| `Control individually` | Follow the individual target temperature without using timers or the weekly program |
| `Invalid`              | May be reported by the API but cannot be sent as a command                          |

For smart external control through ioBroker, **`Control individually`** should be used.

In this mode, the heater follows the individual target temperature but does not use timers or the weekly program. This allows ioBroker to control the heater based on external conditions.

For example, a PV surplus control can use the available surplus power to select an appropriate heating level:

* Low PV surplus → lower heating level
* Higher PV surplus → higher heating level
* No relevant PV surplus → heating level can be reduced again

This allows surplus photovoltaic energy to be used for heating instead of being fed into the grid.

## Connection status

The adapter provides the state:

`info.connection`

This state uses the ioBroker role `indicator.connected` and indicates whether the Mill heater responded to an HTTP request through its local API.

`info.connection` is set to:

* `true` when an HTTP response is received from the heater
* `false` when a connection error or HTTP request timeout occurs

An HTTP error response such as `4xx` or `5xx` still means that the heater responded to the HTTP request. Therefore, `info.connection` remains `true` in this case, while the failed API request is logged separately.

The connection state is updated centrally by the API request handling and therefore applies to all API requests.

## Data points

The adapter creates the following object structure:

```text
millheater.0

├── info
│   └── connection
│
├── status
│   ├── name
│   ├── custom_name
│   ├── version
│   ├── operation_key
│   └── mac_address
│
├── control-status
│   ├── ambient_temperature
│   ├── connected_to_cloud
│   ├── control_signal
│   ├── current_power
│   ├── lock_active
│   ├── open_window_active_now
│   ├── operation_mode
│   ├── raw_ambient_temperature
│   ├── set_temperature
│   └── switched_on
│
└── settings
    ├── additional_mode
    ├── heating_level_percentage
    ├── limited_heating_power
    └── temperature_calibration_offset
```

### `info`

| State        | Description                      | Read | Write |
| ------------ | -------------------------------- | :--: | :---: |
| `connection` | Local HTTP API connection status |   ✓  |       |

### `status`

| State           | Description                                        | Read | Write |
| --------------- | -------------------------------------------------- | :--: | :---: |
| `name`          | Heater name / model reported by the API            |   ✓  |       |
| `custom_name`   | Custom name of the heater                          |   ✓  |       |
| `version`       | API / firmware version information                 |   ✓  |       |
| `operation_key` | Operation or fault information reported by the API |   ✓  |       |
| `mac_address`   | MAC address of the heater                          |   ✓  |       |

### `control-status`

| State                     | Description                                                 | Unit | Read | Write |
| ------------------------- | ----------------------------------------------------------- | ---- | :--: | :---: |
| `ambient_temperature`     | Current ambient temperature including calibration offset    | °C   |   ✓  |       |
| `connected_to_cloud`      | Indicates whether the heater is connected to the Mill cloud |      |   ✓  |       |
| `control_signal`          | Current control signal of the PID regulator                 | %    |   ✓  |       |
| `current_power`           | Current heating power                                       | W    |   ✓  |       |
| `lock_active`             | Current lock status                                         |      |   ✓  |       |
| `open_window_active_now`  | Current open-window detection status                        |      |   ✓  |       |
| `operation_mode`          | Current operating mode                                      |      |   ✓  |   ✓   |
| `raw_ambient_temperature` | Ambient temperature without calibration offset              | °C   |   ✓  |       |
| `set_temperature`         | Current target temperature                                  | °C   |   ✓  |   ✓   |
| `switched_on`             | Indicates whether the device is switched on                 |      |   ✓  |       |

### `settings`

| State                            | Description                             | Unit | Read | Write |
| -------------------------------- | --------------------------------------- | ---- | :--: | :---: |
| `additional_mode`                | Additional mode for socket heaters      |      |   ✓  |   ✓   |
| `heating_level_percentage`       | Heating level for oil heaters           | %    |   ✓  |   ✓   |
| `limited_heating_power`          | Maximum heating power for panel heaters | %    |   ✓  |   ✓   |
| `temperature_calibration_offset` | Temperature calibration offset          | °C   |   ✓  |   ✓   |

## Local API

The adapter communicates directly with the Mill heater using its local HTTP API.

The adapter does not require a Mill cloud account for local communication.

The local API used by this adapter is documented by Mill International AS in their

[Generation 3 REST API documentation](https://github.com/Mill-International-AS/Generation_3_REST_API).

The following API endpoints are used by the adapter

* `/additional-socket-mode`
* `/control-status`
* `/limited-heating-power`
* `/oil-heater-power`
* `/operation-mode`
* `/set-temperature`
* `/status`
* `/temperature-calibration-offset`

The exact availability of individual functions depends on the heater type.

## Polling

The adapter uses two independent polling intervals.

### Startup

After configuration validation and object creation, the adapter initially performs:

1. A slow update using `/status`
2. A fast update using `/control-status` and the heater-specific power endpoint

The `/status` request is performed first because the heater name is required to determine the supported heater type.

### Fast polling

The fast polling interval is used for frequently changing values, including:

* Current temperature
* Current heating power
* Control signal
* Operating mode
* Target temperature
* Heater-specific power settings

During scheduled fast polling, API requests are skippable. If another API request is already running, the polling request is skipped rather than waiting for the current request to finish.

### Slow polling

The slow polling interval is used for values that normally change less frequently, currently including:

* Heater status information
* Temperature calibration offset

Scheduled slow polling requests are also skippable when another API request is already running.

### API request handling

All API requests are serialized through a mutual exclusion mechanism.

Normal API requests wait until the previous request has completed.

Polling requests can be skippable GET requests. This prevents a regular polling cycle from unnecessarily waiting behind another API request.

The skip mechanism is only supported for GET requests. Write requests use POST and are never skippable.

## Writing values

Writable states are processed only when ioBroker sends a state change with `ack = false`.

The adapter validates the value before sending it to the heater.

The following values are validated by the adapter:

* Oil heater power must be `40 %`, `60 %` or `100 %`.
* Operation mode must be one of the supported modes.
* Panel heater power limitation must be an integer from `10 %` to `100 %`.
* Socket heater additional mode must be between `0` and `4`.
* Target temperature must be between `5 °C` and `35 °C`.
* Temperature calibration offset must be between `-30 °C` and `+30 °C`.

Heater-specific settings can only be written when the detected heater type supports them.

### Target temperature

The target temperature can be changed even when the heater is switched off.

After a successful temperature change, the adapter immediately acknowledges the new value in ioBroker.

When the heater is switched off, the changed target temperature may not be returned by `/control-status`. The API returns the configured target temperature through `/control-status` again after the heater has been switched on.

This means that the value shown in `control-status.set_temperature` may not immediately reflect the newly configured value when the heater is switched off.

The target temperature can alternatively be read directly through the `/set-temperature` API endpoint.

After a successful temperature change, the adapter starts a fast update cycle to refresh the heater data.

### Successful write operations

After a successful API request, the corresponding state is immediately acknowledged and updated by the adapter.

The fast polling cycle is then triggered to refresh the current heater data.

A changed temperature calibration offset also triggers a slow polling cycle to refresh the calibration value from the API.

If an API request fails, the command is not acknowledged as successful.

## API response validation

API responses are handled centrally.

A successful request must:

* Return a successful HTTP status code
* Contain a non-empty response body
* Contain valid JSON
* Contain a JSON object
* Report `status = "ok"`

Invalid or unsuccessful responses are logged and are not written to the corresponding ioBroker states.

For read operations, invalid, missing or unavailable API values leave the existing ioBroker state unchanged.

## Development

The source code is written in TypeScript.

## Development guidelines

The adapter follows the ioBroker development and coding guidelines.
For state objects, the adapter uses the official ioBroker state roles.

## Changelog

### 0.1.11

* Added automatic detection of heater replacement using the MAC address. Device state values are reset while state objects and the connection status are preserved.
* Dependencies have been updated.

### 0.1.10

* Added support for socket and convection heaters.
* Fixed reading of the limited heating power for panel heaters.

### 0.1.9

* Added multilingual translations for state names in all supported languages to improve readability and satisfy ioBroker object validation requirements.

### 0.1.8

* Added maximum values for polling intervals to prevent excessively long intervals. The fast polling interval is limited to a maximum of 1 hour, while the slow polling interval is limited to a maximum of 24 hours.
* Added hostname configuration and made various editorial improvements.

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