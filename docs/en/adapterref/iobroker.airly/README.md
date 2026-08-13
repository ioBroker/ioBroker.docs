# ioBroker.airly

Adapter reading air quality data (PM2.5, PM10, CAQI index) for your location
from [Airly](https://airly.org).

## Configuration

| Setting          | Meaning                                                          |
| ---------------- | --------------------------------------------------------------- |
| `apikey`         | Airly API key (developer.airly.org)                             |
| `latitude`       | Your latitude                                                    |
| `longitude`      | Your longitude                                                   |
| `mode`           | `point` — interpolated for your exact coordinates (default); `nearest` — data from the closest physical station |
| `maxDistanceKM`  | Search radius for the closest station (km); only used in `nearest` mode |
| `pollInterval`   | How often to fetch measurements (minutes)                       |

Each poll makes a single request to Airly's `measurements/point` (or
`measurements/nearest`) endpoint, which takes your coordinates directly — there
is no separate station lookup to manage.

Airly limits its free public API to **100 calls per day** — about one call every
15 minutes. Keep `pollInterval` at **20 minutes or longer** (≈72 calls/day) to
stay comfortably within the quota. The remaining daily quota is written to the
debug log on every poll.

## States

| State                   | Description                              |
| ----------------------- | ---------------------------------------- |
| `pm25.value`            | PM2.5 concentration (µg/m³)              |
| `pm25.limitPercent`     | PM2.5 as % of the norm                    |
| `pm10.value`            | PM10 concentration (µg/m³)               |
| `pm10.limitPercent`     | PM10 as % of the norm                     |
| `caqi.value`            | CAQI index value                          |
| `caqi.level`            | CAQI level (e.g. `LOW`, `MEDIUM`)         |
| `caqi.description`      | Human-readable air quality description    |
| `info.connection`       | API reachable / data valid                |
| `info.lastUpdate`       | Timestamp of the last measurement         |

`caqi.level` and `caqi.description` are text values returned directly by the Airly
API. Their language is chosen by Airly (based on the request / API default, usually
English) and is **not** translated by the adapter, so it may not match the ioBroker
UI language.

## Installation

Open the **Adapters** tab in the ioBroker admin, find **Airly** and click the
**+** button to install it and add an instance. Then open the instance settings
and fill in your Airly API key and coordinates.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.3.7 (2026-08-07)
* (tnowak) Review feedback: removed the incomplete Sentry plugin configuration, enforced the poll-interval minimum (5 min) in code, and documented that caqi.level/description are API-provided and not translated

### 0.3.6 (2026-07-11)
* (tnowak) Read coordinates fresh on every poll and skip the request (instead of sending NaN) when they are invalid, logging the offending value; set info.connection = false on stop

### 0.3.5 (2026-07-08)
* (tnowak) Fixed the jsonConfig schema URL in .vscode/settings.json and bumped @iobroker/adapter-dev

### 0.3.4 (2026-07-08)
* (tnowak) Addressed repochecker suggestions: short-format i18n, CHANGELOG_OLD.md, .vscode settings, Dependabot automerge + higher PR limit, and @iobroker/adapter-dev

### 0.3.3 (2026-07-08)
* (tnowak) Removed chai and mocha from devDependencies (provided by @iobroker/testing) to satisfy the repository checker

Older entries are kept in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

The MIT License (MIT)

Copyright (c) 2026 tnowak <tnowak@netventure.pl>

See [LICENSE](LICENSE) for the full text.
