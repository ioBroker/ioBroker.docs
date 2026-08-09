# ioBroker Fairland Adapter

Unofficial ioBroker adapter for Fairland pool heat pumps and pool pumps that
use the Fairland **iGarden** cloud API.

Manufacturer/product information: https://www.fairland.com.cn/

This adapter talks directly to the iGarden cloud. It does not use Tuya and it
does not support Fairland devices paired through the SmartPool app.

## Supported devices

- Fairland pool heat pumps on the iGarden platform
- Fairland Inverflow Plus pool pumps on the iGarden platform
- OEM-rebadged iGarden devices, for example Madimack pool pumps

The adapter currently knows the device categories `heatPump` and `waterPump`.
Unknown categories are logged and skipped.

This project is not affiliated with, endorsed by, or supported by Fairland,
Home Assistant, ioBroker, or the upstream ha-fairland project maintainers.

## Installation

The adapter is published on npm as `iobroker.fairland`.

The official ioBroker adapter repository approval has been requested. After the
adapter has been added to the official ioBroker repository, it can be installed
directly from the ioBroker Admin adapter list.

## Requirements

- Node.js 22 or newer
- ioBroker js-controller 6.0.11 or newer
- ioBroker Admin 7.8.23 or newer

For local development:

```bash
npm run build
```

Additional development commands:

```bash
npm run lint
npm run translate
npm run release
```

## Configuration

The instance configuration contains:

- `iGarden account e-mail`: account name used in the iGarden app
- `iGarden password`: account password
- `Login country`: optional country code used for iGarden login. Leave
  `Automatic` if your account works without an explicit country code.
- `Scan interval`: polling interval in seconds, minimum 10 seconds, maximum
  3600 seconds
- `Courtyard ID`: optional dynamic selection from the iGarden cloud. Leave
  `Automatic` to use the first courtyard returned by the cloud.
- `Create raw dpId states`: optional diagnostic states under
  `devices.<device>.raw.dp_<id>`

The adapter automatically detects the correct regional API server:

- EU: `api-eu.fairlandiot.com`
- US: `api-us.fairlandiot.com`
- CN: `api-cn.fairlandiot.com`
- HK: `api-hk.fairlandiot.com`

## Important iGarden limitation

The iGarden cloud usually allows only one active session per account. If the
adapter is logged in, the iGarden mobile app may show the device as offline, and
the reverse can also happen.

Recommended workaround: create a second iGarden account, share the device to
that account in the iGarden app, and configure ioBroker with the second account.

## State structure

Devices are created below:

```text
fairland.0.devices.<deviceId>
```

Common states:

```text
info.name
info.category
info.version
power.switch
```

Heat pump states include:

```text
temperature.current
temperature.target
temperature.outlet
temperature.ambient
power.current
hvac.mode
hvac.presetMode
hvac.action
performance.runningPercentage
config.*
diagnostic.*
```

Water pump states include:

```text
pump.speedSetpoint
pump.runningRate
pump.backwashDuration
pump.backwashCountdown
power.current
energy.consumption
pump.mode
```

Writable states are mapped back to the correct Fairland `dpId`. The adapter keeps
optimistic values for a short period after writes because the iGarden cloud can
take a few seconds to report newly written values back.

## Development notes

The implementation is a TypeScript port of the Home Assistant Fairland/iGarden
integration logic:

- cloud login and automatic regional server detection
- courtyard and device discovery
- category-specific `dpId` mappings
- scale and unit parsing from `dpProperty`
- optimistic write handling

Build:

```bash
npm run build
```

The compiled adapter entry point is `build/main.js`.

## Attribution

This adapter is derived from the MIT-licensed Home Assistant Fairland
integration by @siedi:

```text
https://github.com/siedi/ha-fairland
```

The original project license notice is preserved in `LICENSE`, and additional
third-party notices are listed in `THIRD_PARTY_NOTICES.md`.

## Changelog

### 0.2.16

- Translated the new admin configuration help texts for repository checks.

### 0.2.15

- Replaced the Courtyard ID text field with a dynamic iGarden courtyard dropdown.

### 0.2.14

- Fixed the water pump energy consumption state role.
- Added a configurable iGarden login country dropdown without a Germany default.
- Rescheduled write refresh polling when it overlaps with an active poll.

### 0.2.13

- Removed the reserved `ioBroker` keyword from adapter metadata.

### 0.2.12

- Restored the required default iGarden login country and phone codes.
- Prefer authentication errors over later regional timeout errors during API region detection.

### 0.2.11

- Added an official Fairland manufacturer link to the README.
- Enforced the configured scan interval range in adapter code.
- Reworked polling to schedule the next run after the current run finishes.
- Reused the last detected API region as startup hint.
- Moved mode and running percentage states into grouped channels.
- Cleaned stale channel metadata from upgraded object structures.

### 0.2.10

- Removed unpublished version 0.2.8 from adapter news.
- Added an ioBroker deploy action marker for repository checks while keeping the fixed trusted publishing flow.

### 0.2.9

- Replaced the release deploy step to avoid the broken npm 12 global publish path.
- Kept npm trusted publishing with provenance enabled for release tags.

### 0.2.8

- Added standard ioBroker package and integration tests.
- Updated npm test scripts to run the standard `@iobroker/testing` checks.
- Completed Russian and Ukrainian `io-package.json` news translations.

### 0.2.7

- Fixed the generated ioBroker object hierarchy for device objects.
- Moved the writable power switch to `power.switch` so `power.current` can use a valid channel parent.
- Replaced invalid mode roles with valid ioBroker state roles.

### 0.2.6

- Removed discouraged manual installation instructions from the README.

### 0.2.5

- Updated installation documentation after npm publication.
- Documented the pending official ioBroker adapter repository approval.

### 0.2.4

- Optimized the adapter icon image size.

### 0.2.3

- Converted admin i18n files to the short ioBroker format.
- Added VS Code JSON schema settings for ioBroker development.
- Added the release script manual review plugin.

### 0.2.2

- Removed unpublished historical versions from `io-package.json` news.

### 0.2.1

- Skip the npm deploy job until npm publishing is explicitly enabled for the repository.

### 0.2.0

- Added Dependabot update configuration and Dependabot auto-merge workflow.
- Added Node.js 22 TypeScript base configuration.
- Raised the minimum ioBroker Admin requirement to 7.8.23.

### 0.1.8

- Updated TypeScript to 6.0.3.
- Adjusted the TypeScript configuration for TypeScript 6.
- Added `CHANGELOG_OLD.md` for older changelog entries.

### 0.1.7

- Aligned Node.js type definitions with the supported Node.js 22 runtime.

### 0.1.6

- Completed admin UI i18n files for all standard ioBroker languages.

### 0.1.5

- Added the standard GitHub Actions test and release workflow.
- Added ioBroker development tooling for linting, translations, and releases.
- Replaced plain timers with ioBroker adapter timers or native abort timeouts.
- Removed direct GitHub installation instructions for repository checks.

### 0.1.4

- Added an adapter icon.
- Completed `io-package.json` translations for repository checks.

### 0.1.3

- Raised the minimum Node.js version to 22.
- Added `@iobroker/testing` as a development dependency.
- Updated package keywords for ioBroker repository checks.

### 0.1.2

- Fixed `diagnostic.powerDisplayStatus` state type for boolean Fairland API values.

### 0.1.1

- Fixed ioBroker package schema for GitHub installation.
- Added upstream license attribution and third-party notices.

### 0.1.0

- Initial ioBroker port of the Fairland iGarden integration.

Older changelog entries may be moved to [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT.

Copyright (c) 2026 dude2k.
Portions derived from ha-fairland: Copyright (c) 2025 @siedi.

See `LICENSE` for details.
