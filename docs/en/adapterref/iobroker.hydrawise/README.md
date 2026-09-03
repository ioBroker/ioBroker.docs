![Logo](admin/hydrawise.jpg)

# ioBroker.hydrawise

[![NPM version](https://img.shields.io/npm/v/iobroker.hydrawise.svg?style=flat-square)](https://www.npmjs.com/package/iobroker.hydrawise)
[![Downloads](https://img.shields.io/npm/dm/iobroker.hydrawise.svg?label=npm%20downloads&style=flat-square)](https://www.npmjs.com/package/iobroker.hydrawise)
![node-lts](https://img.shields.io/node/v-lts/iobroker.hydrawise?style=flat-square)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/iobroker.hydrawise?label=npm%20dependencies&style=flat-square)

![GitHub](https://img.shields.io/github/license/sentiq/iobroker.hydrawise?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/sentiq/iobroker.hydrawise?logo=github&style=flat-square)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/sentiq/iobroker.hydrawise?logo=github&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/sentiq/iobroker.hydrawise?logo=github&style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/sentiq/iobroker.hydrawise?logo=github&style=flat-square)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/sentiq/iobroker.hydrawise/test-and-release.yml?branch=master&logo=github&style=flat-square)

## Versions

![Beta](https://img.shields.io/npm/v/iobroker.hydrawise.svg?color=red&label=beta)
![Stable](http://iobroker.live/badges/hydrawise-stable.svg)
![Installed](http://iobroker.live/badges/hydrawise-installed.svg)

Integrate your Hydrawise controller into ioBroker.

Both APIs provide zones and schedules. Use **v2 (GraphQL)** by default (same login as the Hydrawise app). **v1 (REST)** is a fallback via API key if GraphQL is unavailable. Enable one or both.

- **v2** (recommended): email/password like the app — `zones.*`, `sensors.*`, `weather.*`, `water.*`, `controller.*` (plus weather, measured sensors, leak indicator, GraphQL zone commands).
- **v1** (fallback): API key — `schedule.*` / `customer.*` (same zones and schedules, no weather or measured sensors).

## Documentation

### v2 API (recommended)

v2 is the unofficial GraphQL API used by the Hydrawise app (`app.hydrawise.com/api/v2/graph`). Enable **v2 API (GraphQL)** in instance settings and enter the same email/password as on hydrawise.com.

### v1 API (fallback)

Only needed if GraphQL is unavailable:

- log into https://app.hydrawise.com/config/account-details
- generate API Key by clicking "Generate API Key" under "Account Settings"
- paste the key into the v1 tab
- API documentation: https://support.hydrawise.com/hc/en-us/articles/360008965753-Hydrawise-API-Information

| Object tree | Source | Controls irrigation? |
| --- | --- | --- |
| `schedule.*` | v1 REST | yes (`setzone.php`) |
| `zones.*` | v2 GraphQL | yes (GraphQL mutations), only if v2 is enabled |
| `water.*`, `sensors.*`, `weather.*`, `controller.*` | v2 GraphQL | read-only |
| `info.connection` | instance (all enabled APIs) | — |
| `info.connectionV2` | v2 GraphQL only | — |

The Admin traffic light (`info.connection`) is green only if **every enabled API** is online. v1 enabled but failing and v2 OK → yellow/red. v2-only and connected → green. `info.connectionV2` stays true whenever GraphQL works.

v1 `schedule.sensors.*` only contains sensor *configuration*. Measured flow, rainfall and leak suspicion come from v2 `sensors.*` / `water.leakSuspected`.

Default v2 poll interval is **300 seconds** (minimum 120). GraphQL is rate-limited per account (including the official app). Do not lower this without a reason.

`customerdetails.php` is polled on its own 5-minute timer with backoff after HTTP 429. Commands never call that endpoint.

> **Note**  
> After updating from 0.0.15 you have to re-enter your API key

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.0.1 (2026-09-03)

* (SentiQ) **FIXED**: Instance `info.connection` follows every enabled API (v2-only no longer stays red)

### 2.0.0 (2026-09-02)

* (SentiQ) **NEW**: Optional Hydrawise v2 GraphQL API (water usage, live sensors, weather, leak indicator, zone commands)
* (SentiQ) **ENHANCED**: customerdetails.php polls on its own 5-minute timer with backoff after rate limits

### 1.1.0 (2026-09-01)

* (SentiQ) **FIXED**: Relay ID mapping no longer writes onto the Object constructor
* (SentiQ) **FIXED**: runDefault reset no longer accidentally stops the zone
* (SentiQ) **ENHANCED**: Object creation only on structure change; poll overlap protection
* (SentiQ) **ENHANCED**: Replaced axios with native fetch; timers cleaned up on unload
* (SentiQ) **TESTING**: Unit tests for helpers (name2id, URL builder, structure signature)

### 1.0.6 (2026-08-09)

- (SentiQ) updated dependencies
- (SentiQ) Adapter requires node.js >= 22 now

### 1.0.5 (2025-12-05)

- (SentiQ) updated js-controller dependency
- (SentiQ) updated @iobroker/adapter-dev dependency

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2025-2026 SentiQ <yves.nuesser@proton.me>

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
