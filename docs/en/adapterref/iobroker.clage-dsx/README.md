# ioBroker.clage-dsx

![CLAGE DSX logo](admin/clage-dsx.png)

[![NPM version](https://img.shields.io/npm/v/iobroker.clage-dsx.svg)](https://www.npmjs.com/package/iobroker.clage-dsx)
[![Downloads](https://img.shields.io/npm/dm/iobroker.clage-dsx.svg)](https://www.npmjs.com/package/iobroker.clage-dsx)
[![Test and Release](https://github.com/TheBam1990/ioBroker.clage-dsx/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/TheBam1990/ioBroker.clage-dsx/actions/workflows/test-and-release.yml)

[Deutsche Dokumentation](README_DE.md)

## Description

This adapter connects ioBroker to a local [CLAGE](https://www.clage.com/) Home Server and its registered instantaneous water heaters. Communication uses the HTTPS API in the local network; no cloud service is required.

The implementation is based on the included [CLAGE Home Server API specification v1.3.4](CLAGE%20HomeServer%20API%20v1.3.4.pdf).

## Requirements

- ioBroker with Node.js 22 or newer
- CLAGE Home Server reachable from the ioBroker host
- Home Server API user name and password
- HTTPS access to the Home Server

## Configuration

Open the instance settings and enter:

1. **CLAGE Home Server IP address**, for example `192.168.2.35` (without `https://`)
2. **API user name**, for example `admin`
3. **API password**, for example `geheim`

All three fields are required. The historical native configuration key for the user name is called `port`; this is retained for compatibility with existing installations.

The values `admin` and `geheim` are examples from the CLAGE API documentation. Use the API credentials configured on your own Home Server; do not use the example password unless it is actually configured there.

The Home Server normally uses a self-signed TLS certificate. The adapter therefore accepts the local certificate when connecting directly to the configured device.

## Current functionality

For every registered CLAGE device, the adapter creates states for:

- identity, connection state, RSSI, LQI, API access mask and last radio activity
- setpoint, temperature limit, inlet/outlet temperatures and all four temperature presets
- flow, flow limit, valve position, raw and calculated power, heating state and errors
- firmware and serial numbers, power-unit information and operating-time counters
- total consumption plus the last draw-off cycle and consumption history as JSON
- current error plus error history as JSON
- Home Server version, identity, radio channel, address and advertised services
- all timers, both globally and filtered per device

Writable states:

- `Setpoint`: API value in tenths of a degree Celsius, e.g. `450` = 45.0 °C
- `Themperatur`: temperature in °C; retained with its historical spelling for compatibility
- `flowMax`: flow limit in tenths of a litre per minute; special API values include `253` (ECO) and `254` (AUTO)
- `Name`: device name
- `setup.flowMax`, `setup.loadShedding`, `setup.scaldProtection` and `setup.sound`
- `timers.createJson`, `timers.updateJson` and `timers.deleteId` for controlled timer management

`info.connection` indicates whether the Home Server is reachable and accepts the configured credentials.

The adapter checks the API access mask before writes. Setpoint changes are debounced by two seconds, active devices are refreshed more frequently, and the device list uses sequential HTTP long polling by default. Intervals, long polling and the consumption-history period (30 days by default) can be adjusted in the adapter configuration.

## Timer JSON

Create a timer by writing JSON such as the following to `timers.createJson`:

```json
{"type":0,"weekdays":127,"start":"06:00","stop":"07:00","deviceId":"A001FF0034","setpoint":450}
```

For updates, write the same structure including a numeric `id` to `timers.updateJson`. To delete one timer, write its numeric ID to `timers.deleteId`. Destructive bulk operations, device unregistering and radio-address changes are intentionally not exposed.

## Troubleshooting

- Verify that the IP address contains no protocol prefix or path.
- Verify the API credentials in the CLAGE Home Server configuration.
- Ensure that TCP port 443 is reachable from the ioBroker host.
- HTTP status `401` means invalid credentials; `403` means insufficient API permissions.
- A device can be registered but temporarily unavailable. The API reports this as `404`, `410` or a negative device error code.

## Changelog

### 0.0.9

- Fixed the Home Server address input so any IPv4 address, host name or host with an explicit port can be entered.
- Updated the minimum Admin dependency to 7.8.23.

### 0.0.8

- Fixed all findings from the ioBroker latest-repository review.
- Updated energy and timestamp state roles and clarified the legacy temperature state.
- Restricted setup writes to registered API fields and added safe polling upper limits.
- Corrected all adapter description translations.

### 0.0.7

- Corrected state roles for timestamps, version information and the numeric bus ID

### 0.0.6

- Added live temperatures, presets, valve position, calculated power and radio diagnostics
- Added setup, consumption and error history data
- Added permission-checked setup writes and timer management
- Added Home Server information, adaptive polling and sequential HTTP long polling
- Added configurable polling intervals

[Older changelog entries](CHANGELOG_OLD.md)

## License

Copyright (c) 2026 TheBam <elektrobam@gmx.de>

MIT License. See [LICENSE](LICENSE).
