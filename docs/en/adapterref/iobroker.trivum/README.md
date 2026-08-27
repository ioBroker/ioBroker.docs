![Logo](admin/trivum.png)

# ioBroker.trivum

[![NPM version](https://img.shields.io/npm/v/iobroker.trivum.svg)](https://www.npmjs.com/package/iobroker.trivum)
[![Test and Release](https://github.com/TheBam1990/ioBroker.trivum/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/TheBam1990/ioBroker.trivum/actions/workflows/test-and-release.yml)

Control a trivum multiroom audio system from ioBroker through its local XML API.

German documentation: [READMEde.md](READMEde.md)

## Configuration

Enter the IPv4 address of the trivum MusicCenter. Zones and controls are discovered automatically. The polling interval and HTTP timeout are configurable; existing installations retain the historical `adresse` and `option3` configuration keys.

`Number of paging presets` creates global paging buttons starting at ID 0.

## States

Global controls:

- `Global.ALLOFF`: switch off all zones
- `Global.Aktive_zonen`: active zones reported by trivum
- `Global.PagingN`: start paging preset N

Each detected zone provides:

- `Muten`: mute/unmute
- `DEFAULT_STREAMING`: start the default stream
- `ZONECMD_DEFAULT_TUNER`: start the default tuner
- `VOLUME`: read or set volume from 0 to 100 percent
- `ZONECMD_POWER_OFF`: switch off the zone
- `Status`: current zone status

Button states reset automatically after a successful request. `info.connection` becomes true only after a successful trivum response, while `info.lastError` stores the latest communication error.

## Changelog

### 0.1.0

- Migrated to the current ioBroker adapter template and responsive JSON Config
- Added Node.js 22/24 and js-controller 6 compatibility
- Updated adapter-core, dependencies, linting, tests and release workflows
- Reworked zone discovery, polling, connection state and error handling
- Fixed zone commands to use discovered zone IDs
- Changed volume to a numeric percentage state and prevented overlapping polls

### 0.0.5

- Updated adapter core

## License

Copyright (c) 2021-2026 TheBam <elektrobam@gmx.de>

MIT License. See [LICENSE](LICENSE).
