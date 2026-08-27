---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.ai-energy-manager.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.ai-energy-manager.svg
BADGE-Number of Installations: https://iobroker.live/badges/ai-energy-manager-installed.svg
BADGE-GitHub license: https://img.shields.io/github/license/blabond/ioBroker.ai-energy-manager?style=flat-square
---
# ioBroker AI Energy Manager

[![NPM version](https://img.shields.io/npm/v/iobroker.ai-energy-manager.svg)](https://www.npmjs.com/package/iobroker.ai-energy-manager)
[![Downloads](https://img.shields.io/npm/dm/iobroker.ai-energy-manager.svg)](https://www.npmjs.com/package/iobroker.ai-energy-manager)
![Number of Installations](https://iobroker.live/badges/ai-energy-manager-installed.svg)
[![GitHub license](https://img.shields.io/github/license/blabond/ioBroker.ai-energy-manager?style=flat-square)](https://github.com/blabond/ioBroker.ai-energy-manager/blob/main/LICENSE)
[![Test and Release](https://github.com/blabond/ioBroker.ai-energy-manager/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/blabond/ioBroker.ai-energy-manager/actions/workflows/test-and-release.yml)

The AI Energy Manager adapter connects ioBroker to the SmartEnergy backend for dynamic electricity tariffs, photovoltaic forecasts, telemetry, battery management, wallbox integration and controlled writable datapoints.

The adapter continuously sends normalized energy telemetry to the backend, receives a user-specific system configuration and applies controlled charging commands only to datapoints that were explicitly selected in ioBroker. It supports installations with household meters, PV-only plants, balcony power systems, batteries, generic storage systems, energy meters and wallboxes.

## Documentation

[German documentation](https://github.com/blabond/ioBroker.ai-energy-manager/blob/main/docs/de/README.md)

## Features

- Token-based connection to the SmartEnergy backend
- Server-driven adapter configuration for the user's actual plants
- Telemetry upload for consumption, grid import, grid export, PV production, battery power, battery state of charge and wallbox values
- Automatic source unit handling for Wh, kWh, W and kW values
- Dynamic datapoint tables grouped by household and plant
- ioBroker object browser for selecting datapoints
- Dashboard Lite with system cards, 6-hour plan and pattern detection
- Previous, current and next 15-minute electricity prices for the tariff selected in the user account
- Controlled battery commands for charging, discharging and holding reserve
- Explicit write protection: commands are accepted only for configured writable datapoints

## Requirements

- Node.js 22 or newer
- js-controller 6.0.11 or newer
- ioBroker Admin 7.6.20 or newer
- SmartEnergy account with an adapter token
- Configured ioBroker datapoints for the meters, batteries, PV plants and wallboxes that should be used

## Installation

Install the adapter from the ioBroker adapter repository or from npm.

## Configuration

Open the adapter configuration in ioBroker Admin.

1. Paste the adapter token from the SmartEnergy web frontend.
2. Save the configuration.
3. Click **Request Config**.
4. Open the **Datapoints** tab.
5. Select the required ioBroker state paths with the object browser.
6. Save the configuration.

The adapter token is stored in encrypted native configuration and is protected from being displayed in ioBroker Admin.

## Request Config

The **Request Config** button asks the backend for the current system configuration of the user. The backend response defines the required household values and the available plant-specific values. The adapter then renders one household table and one table per configured plant.

The number of plant tables is not fixed. If the user adds or removes plants in the web frontend, the adapter receives the new structure on the next configuration request.

Existing datapoint assignments are preserved as long as their logical keys still exist.

## Datapoints

The adapter works with logical datapoints instead of hard-coded ioBroker paths. Typical household datapoints are:

- household consumption
- grid import meter
- grid export meter

Typical plant datapoints are:

- PV production
- battery state of charge
- battery power
- battery capacity
- charge enablement
- wallbox current limit

The adapter automatically normalizes source units before telemetry is sent. For example, a kWh source can be sent as Wh telemetry and a kW source can be sent as W telemetry.

## Telemetry

The adapter reads the selected ioBroker states and builds a normalized telemetry payload. The payload is sent to the backend at the configured interval. If `sendOnlyChanged` is enabled, unchanged payloads are skipped to reduce traffic.

Telemetry is used by the backend for:

- daily household consumption
- grid import and export
- PV yield
- battery availability
- charging and discharging decisions
- wallbox charging decisions
- pattern detection
- dashboard and 6-hour planning

## Battery and Wallbox Control

The backend can send control commands for allowed logical targets. The adapter maps these targets to the ioBroker datapoints selected by the user.

Supported control behavior includes:

- charge battery from PV surplus
- charge battery from the grid during favorable tariff windows
- hold reserve for later use
- discharge when the plan requires battery support

The adapter never writes to arbitrary state IDs supplied by the backend. A write is executed only when:

- the target is part of the server configuration
- the user selected a datapoint for the target
- the ioBroker object exists
- the object is writable
- the value matches the expected type
- the configured minimum write interval is respected

## States

The adapter creates internal states below its instance namespace:

- `info.connection`
- `info.lastSync`
- `info.lastError`
- `info.configValid`
- `info.tokenValid`
- `info.detectedFeatures`
- `info.serverConfigVersion`
- `info.serverConfigRevision`
- `info.serverConfigLastRequest`
- `status.backendReachable`
- `status.lastPayload`
- `status.lastCommand`
- `status.lastCommandResult`

The adapter token is never written to states.

### Electricity prices

The `electricityPrices` channel exposes the tariff prices used by the SmartEnergy web frontend. The values include the selected tariff provider's markup and the grid fee configured for the installation:

- `electricityPrices.last`: previous 15-minute price in `ct/kWh`
- `electricityPrices.current`: currently valid 15-minute price in `ct/kWh`
- `electricityPrices.next`: next 15-minute price in `ct/kWh`
- `electricityPrices.status`: classification of the current price

The status uses the same price-window rules and colors as the web frontend:

- `0` — standard range or no classification
- `1` — cheap charging slot (yellow)
- `2` — bridge charging slot (blue)
- `3` — avoid electricity / never charge (black; at least 150% of the seven-day maximum)

Price states are reset to `0` when no current backend data is available.

## Security

- The adapter token is stored as encrypted and protected native configuration.
- Tokens are masked in logs.
- Backend commands use logical targets, not direct ioBroker paths.
- Writable datapoints must be selected explicitly by the user.
- Commands are acknowledged to the backend after processing.
- HTTPS is used for backend communication.

## Troubleshooting

If telemetry is missing, check the **Datapoints** tab and verify that all required state paths are configured.

If the backend connection is not available, check:

- `info.connection`
- `info.tokenValid`
- `status.backendReachable`
- `info.lastError`

If a command is not applied, verify that the selected ioBroker state is writable and that the value type matches the state type.

## Changelog

### **WORK IN PROGRESS**

### 0.4.3 (2026-07-28)

- Update dependencies and GitHub Actions.
- Expose account-specific 15-minute electricity prices and the current web price classification.

### 0.4.2 (2026-07-14)

- General adapter improvements

### 0.4.1 (2026-07-06)

- FIX: React state object selector for ioBroker datapoint paths

### 0.4.0 (2026-07-06)

- Code Cleanup
- ioBroker checker changes.
- Update admin dependencies and keep the React/MUI admin UI compatible with the ioBroker Admin runtime.
- Fix ApiClient timer fallback

### 0.2.0 (2026-05-22)

- Initial release of the AI Energy Manager adapter.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 Christoph Böhrs

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