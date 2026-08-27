# ioBroker.sax-power

[![NPM version](https://img.shields.io/npm/v/iobroker.sax-power.svg)](https://www.npmjs.com/package/iobroker.sax-power)
[![Downloads](https://img.shields.io/npm/dm/iobroker.sax-power.svg)](https://www.npmjs.com/package/iobroker.sax-power)
[![Test and Release](https://github.com/GodHunter/ioBroker.sax-power/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/GodHunter/ioBroker.sax-power/actions/workflows/test-and-release.yml)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D22-brightgreen.svg)](https://nodejs.org/)

ioBroker adapter for SAX Power battery storage systems.

This independent community adapter connects ioBroker to the SAX Power cloud and provides live measurements, device information and historical energy statistics. It supports automatic device discovery and aggregates values across all detected storage systems.

Product and manufacturer information: [SAX Power GmbH](https://sax-power.net/)

> This project is not affiliated with, endorsed by or maintained by SAX Power GmbH.

## Features

- SAX Power cloud authentication
- Automatic discovery of all storage systems assigned to the account
- Live values for photovoltaic generation, house consumption, grid power, battery power and state of charge
- Historical energy statistics for today, week, month, year and total
- SAX-reported cycle count plus transparent equivalent-full-cycle calculations per device and for the complete installation
- Explicit battery model assignment with nominal and usable capacities
- Aggregated live values and statistics across multiple storage systems
- Responsive React-based administration interface
- Optional Modbus configuration prepared for future control functions
- Minimum supported polling interval of **60 seconds** to avoid unnecessary load on the SAX Power service
- Documented object model, API integration and statistics processing

## Requirements

- ioBroker with Admin **7.8.23 or newer**
- Node.js **22 or newer**
- A SAX Power account with access to the SAX Power dashboard

## Installation

Install the adapter from the official ioBroker repository through the ioBroker Admin interface.

## Configuration

Open the adapter configuration in ioBroker Admin and enter:

- the SAX Power dashboard email address
- the corresponding password
- the polling interval
- the SAX Power model for every automatically detected storage system

The minimum polling interval is **60 seconds**.
The SAX Power API endpoint is built into the adapter and cannot be changed in the administration interface.

The password is stored through ioBroker's `encryptedNative` configuration mechanism and protected from ordinary configuration reads through `protectedNative`. It remains unchanged when unrelated settings such as the polling interval or battery model are saved.

The administration interface separates cloud login from adapter settings. Storage systems cannot be added manually: the adapter discovers them from the SAX Power account and only asks for the matching model.

## Live dashboard

The administration interface displays aggregated live cards for:

- PV power
- House consumption
- Grid power
- Battery power
- State of charge

The dashboard reads only ioBroker states. It does not perform additional cloud requests.

## Object structure

The adapter creates separate object trees for every detected SAX Power storage system. All installation-wide values are grouped below `summary`, so they cannot be confused with the values of an individual storage device.

Typical structure:

```text
sax-power.0
├── info
├── devices
│   └── <device-id>
│       ├── info
│       ├── live
│       ├── battery
│       └── statistics
└── summary
    ├── battery
    └── statistics
        ├── info
        ├── day
        ├── week
        ├── month
        ├── year
        └── total
```

Detailed references are available in:

- [Object reference](docs/OBJECTS.md)
- [Field reference](docs/FIELD_REFERENCE.md)
- [Statistics](docs/STATISTICS.md)
- [Battery models, cycles and health](docs/BATTERY.md)

## Statistics

Historical values are retrieved from the SAX Power energy chart endpoint and mapped into ioBroker states.

Supported periods:

- today
- week
- month
- year
- total

For accounts with multiple storage systems, the adapter also calculates aggregated statistics.

Further details are documented in [docs/STATISTICS.md](docs/STATISTICS.md).

Equivalent full cycles use the documented formula `(charged energy + discharged energy) / (2 × nominal capacity)`. Battery health is explicitly estimated from the median of five qualified discharge runs covering at least 40 SOC percentage points each. Valid, required and rejected runs, plus current-run progress, remain visible while data is collected. The integration method, acceptance limits, persistence and known accuracy limitations are documented in [docs/BATTERY.md](docs/BATTERY.md).

## Modbus

Modbus configuration is optional and independent of the SAX Power cloud connection.

Version 1.0.x does not expose active Modbus control functions. The existing configuration provides the technical foundation for later releases without changing the read-only cloud integration.

See [docs/MODBUS.md](docs/MODBUS.md).

## Documentation

- [API integration](docs/API.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Battery models, cycles and health](docs/BATTERY.md)
- [Branding and project independence](docs/BRANDING.md)
- [Field reference](docs/FIELD_REFERENCE.md)
- [Modbus](docs/MODBUS.md)
- [Object structure](docs/OBJECTS.md)
- [Statistics](docs/STATISTICS.md)

## Support and feedback

Please use GitHub Issues for bug reports and feature requests:

- [Report a bug](https://github.com/GodHunter/ioBroker.sax-power/issues)
- [Contributing](CONTRIBUTING.md)
- [Security policy](SECURITY.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)

Feedback from users operating multiple SAX Power storage systems is especially valuable because it helps validate discovery, aggregation and multi-device behavior under real-world conditions.

## Development

Install dependencies:

```bash
npm ci
npm --prefix src-admin ci
```

Run the complete project check:

```bash
npm run check
```

Run history tests:

```bash
npm run test:history
```

Run package validation:

```bash
npm run test:package
```

## Changelog

### 1.2.4 (2026-08-20)

- Removed direct GitHub installation guidance in favor of installation from the official ioBroker repository.
- Standardized the custom administration interface on English until full ioBroker i18n support is implemented.
- Added a safe upper bound of 2,147,483 seconds for the polling interval to prevent Node.js timer overflow.
- Replaced deprecated directional power roles with `value.power.consumed` and `value.power.produced`.
- Removed inactive Modbus configuration fields that had no runtime effect.
- Added regression tests for the repository inclusion requirements and polling interval boundaries.

### 1.2.3 (2026-08-11)

- Added the missing `info` channel required by the instance information states.
- Corrected the `devices` container from `channel` to `folder` so device objects have a valid ioBroker parent.
- Added regression tests for both object hierarchy requirements.
- Existing state IDs and values remain unchanged.


### 1.2.2 (2026-08-10)

- Limited the adapter news history to the seven entries supported by the ioBroker repository builder.
- Added mandatory release checks for version metadata, release notes and the README changelog.
- Kept adapter runtime behavior unchanged.

### 1.2.1 (2026-08-10)

- Removed the deprecated `common.title` metadata in favor of `common.titleLang`.
- Replaced the direct npm installation command with ioBroker Admin installation guidance.
- Kept adapter runtime behavior unchanged.

### 1.2.0 (2026-08-10)

- Added automatically assigned battery models with documented nominal and usable capacities.
- Added SAX-reported and adapter-calculated equivalent full cycles per device and for the complete system.
- Added persistent, transparent battery-health estimation from qualified discharge runs, including valid, required and rejected run counters.
- Added the separate `devices.<serial>.*` and `summary.*` object structures and automatic cleanup of obsolete root objects.
- Redesigned the administration interface and fixed password persistence when saving unrelated settings.
- Documented health formulas, validation rules, object paths, data sources and known limitations in `docs/BATTERY.md` and the object references.

### 1.1.2 (2026-08-05)

- Updated the public project identity and maintainer contact.
- Corrected the donation address shown in the administration interface.
- Aligned the Node.js 22 TypeScript dependency declaration with ioBroker repository requirements.


### 1.1.1 (2026-08-05)

- Added detailed SAX Power Cloud connection states and HTTP status reporting.
- Improved authentication error messages, including guidance to re-enter and save the password after upgrading from an older adapter version.
- Updated the React admin interface with clear connection, authentication, timeout, network and server status messages.
- Updated `@tsconfig/node22` to 22.0.5 and removed the remaining backend ESLint warning.

### 1.1.0 (2026-08-05)

- Update the TypeScript configuration from `@tsconfig/node20` to `@tsconfig/node22`
- Commit the compiled backend to support direct GitHub installations
- Remove the unsupported `common.noGit` property
- Optimize the build workflow so admin dependencies are installed only once per full check
- Clean up conflicting and malformed `.gitignore` rules
- Keep runtime behavior and the existing SAX Power functionality unchanged


### 1.0.1 (2026-08-04)

- Require Node.js 22 or newer
- Raise the required ioBroker Admin version
- Align package metadata with current ioBroker repository requirements
- Modernize GitHub Actions and Dependabot configuration
- Replace the deprecated Dependabot auto-merge action
- Configure npm dependency cooldown and include the separate admin project
- Correct encrypted and protected native password declarations
- Remove unused template translations and obsolete `jsonConfig.json`
- Mark generated build files correctly for GitHub installations
- Replace the plain API request timer with `AbortSignal.timeout()`
- Keep the existing React administration interface and runtime behavior unchanged

### 1.0.0 (2026-08-03)

- Initial public release
- Automatic discovery of SAX Power systems
- Live monitoring
- Historical energy statistics
- Aggregated values across multiple systems
- Responsive React-based admin interface
- Optional Modbus configuration
- Comprehensive project documentation

## License

Copyright (c) 2026 GodHunter godhunter@posteo.de

MIT License

See [LICENSE](LICENSE) for the complete license text.
