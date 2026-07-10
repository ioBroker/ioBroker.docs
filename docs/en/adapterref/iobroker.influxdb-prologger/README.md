![Logo](admin/influxdb-prologger.png)
# ioBroker.influxdb-prologger

[![NPM version](https://img.shields.io/npm/v/iobroker.influxdb-prologger.svg)](https://www.npmjs.com/package/iobroker.influxdb-prologger)
[![Downloads](https://img.shields.io/npm/dm/iobroker.influxdb-prologger.svg)](https://www.npmjs.com/package/iobroker.influxdb-prologger)
![Number of Installations](https://iobroker.live/badges/influxdb-prologger-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/influxdb-prologger-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.influxdb-prologger.png?downloads=true)](https://nodei.co/npm/iobroker.influxdb-prologger/)

**Tests:** ![Test and Release](https://github.com/simpros/ioBroker.influxdb-prologger/workflows/Test%20and%20Release/badge.svg)

## InfluxDB ProLogger adapter for ioBroker

Flexible InfluxDB v2 data logger with configurable logging groups, multiple buckets, cron-based and on-change triggers.

> **Important:** This adapter is a **write-only data logger**. It sends ioBroker state values *to* InfluxDB v2 — it does **not** read historical data back into ioBroker and does not implement the standard ioBroker history adapter interface. If you need to query stored history data within ioBroker (e.g., for charts or scripts via `getHistory`), use the official [ioBroker InfluxDB adapter](https://github.com/ioBroker/ioBroker.influxdb) instead.
>
> The goal of this adapter is to give you more flexibility over *how* data is written to InfluxDB: you can define multiple logging groups with different buckets, trigger types (cron or on-change), custom measurement names, field keys, and tags — independent of ioBroker's built-in history system.

## Features

- **Multiple Logging Groups** - Define separate groups with different InfluxDB buckets and trigger types
- **Cron-based Logging** - Periodically collect and batch-write data points (e.g., every 15 minutes)
- **On-Change Logging** - Instantly write data to InfluxDB when a state value changes (spontaneous writes)
- **Multiple Buckets** - Each logging group can write to a different InfluxDB bucket
- **InfluxDB v2 Line Protocol** - Native HTTP API writes using InfluxDB line protocol
- **Retry with Exponential Backoff** - Configurable retry logic for failed writes
- **Encrypted Token Storage** - API token is stored encrypted in ioBroker's database
- **Connection Test** - Test your InfluxDB connection directly from the admin UI
- **Admin UI** - Fully configurable via the ioBroker admin interface (JSON Config)

## Requirements

- ioBroker with js-controller >= 6.0.11
- ioBroker Admin >= 7.0.23
- Node.js >= 20
- InfluxDB v2 instance

## Configuration

### 1. Connection Tab

Configure your InfluxDB v2 connection:

| Setting | Description |
|---------|-------------|
| Protocol | HTTP or HTTPS |
| Host | InfluxDB server hostname or IP (e.g., `192.168.10.191`) |
| Port | InfluxDB server port (default: `8086`) |
| Organization | Your InfluxDB organization name |
| API Token | InfluxDB API token (stored encrypted) |

Use the **Test Connection** button to verify connectivity.

### 2. Logging Groups Tab

Define one or more logging groups. Each group has:

| Setting | Description |
|---------|-------------|
| Enabled | Enable/disable this group |
| Group Name | Unique name for this group (referenced by data points) |
| Bucket | InfluxDB bucket to write to |
| Trigger Type | `Cron (periodic)` or `On Change` |
| Cron Expression | Cron schedule (only for cron groups), e.g., `*/15 * * * *` |
| Batch | Enable batch writing (for cron groups) |

**Example groups:**

| Name | Bucket | Trigger | Cron |
|------|--------|---------|------|
| Betriebsstunden | iobroker | Cron | `*/15 * * * *` |
| Spontanwerte | iob_spontanwerte | On Change | - |

### 3. Data Points Tab

Configure which ioBroker states to log. Each data point must reference a logging group:

| Setting | Description |
|---------|-------------|
| Enabled | Enable/disable this data point |
| Group | Name of the logging group (must match a group from Tab 2) |
| Object ID | ioBroker state to read (use the object browser) |
| Measurement | InfluxDB measurement name |
| Field | InfluxDB field name |
| Tags | InfluxDB tags in `key=value` format (e.g., `area=kitchen,floor=eg`) |

**Example data points:**

| Group | Object ID | Measurement | Field | Tags |
|-------|-----------|-------------|-------|------|
| Betriebsstunden | `0_userdata.0.Heizkessel` | betriebssekunden | zaehlerstand | `area=heizkessel` |
| Spontanwerte | `shelly.1.EM0.TotalActivePower` | energie | elektrische_leistung_haus | `area=gesamtenergiebedarf` |

### 4. Advanced Tab

| Setting | Description |
|---------|-------------|
| Write Timeout | HTTP request timeout in ms (default: 5000) |
| Retry on Error | Retry failed writes with exponential backoff |
| Max Retries | Maximum retry attempts (default: 3) |
| Debug Logging | Enable verbose debug logging |

## How It Works

### Cron Groups (Periodic Logging)

1. At each cron interval, the adapter reads all configured state values in the group
2. Values are formatted as InfluxDB line protocol
3. All lines are batch-written to InfluxDB in a single HTTP POST

### On-Change Groups (Spontaneous Logging)

1. The adapter subscribes to each data point's ioBroker state
2. When a state value changes, the new value is immediately written to InfluxDB
3. Each change triggers an individual HTTP POST

### InfluxDB Line Protocol

Data is written using the InfluxDB v2 line protocol format:

```
measurement,tag1=value1,tag2=value2 field=value
```

Example:
```
betriebssekunden,area=heizkessel zaehlerstand=12345.6
energie,area=gesamtenergiebedarf elektrische_leistung_haus=4521.3
```

## Migration from ioBroker Scripts

If you are currently using ioBroker JavaScript scripts for InfluxDB logging, you can migrate to this adapter:

1. Install the adapter
2. Configure your InfluxDB connection (same host, port, org, token)
3. Create logging groups matching your script setup:
   - Scripts using `on({ id: ..., val: true })` with a trigger state -> Create a **Cron** group
   - Scripts using `on({ id: objectId })` for each state -> Create an **On Change** group
4. Add all data points from your `loggingTemplate` arrays
5. Disable your old scripts
6. Verify data is flowing in InfluxDB

## Scripts in `package.json`

| Script name | Description |
|-------------|-------------|
| `build` | Compile the TypeScript sources |
| `watch` | Compile the TypeScript sources and watch for changes |
| `test:ts` | Execute the tests defined in `*.test.ts` files |
| `test:package` | Ensure `package.json` and `io-package.json` are valid |
| `test` | Perform a minimal test run on package files and your tests |
| `check` | Perform a type-check on your code (without compiling) |
| `lint` | Run ESLint to check code for formatting errors and potential bugs |
| `translate` | Translate texts in the adapter to all required languages |
| `release` | Create a new release |

## Changelog
### 1.1.0 (2026-06-26)

* (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.
* (Simon Prosen) Reduced excess spacing in the admin UI header by keeping configuration tab labels on a single line
* (Simon Prosen) Spontaneous (on-change) writes are now buffered with a configurable flush window (default 5000ms, adjustable per bucket)

### 1.0.1 (2026-04-13)

* (Simon Prosen) Fixed ack handling for on-change writes so acknowledged updates are processed correctly
* (Simon Prosen) Improved admin UI responsiveness on small screens with scrollable tabs and more flexible layouts
* (Simon Prosen) Removed the batch-write toggle from the admin UI and enforce batching based on trigger type
* (Simon Prosen) Added and improved translations for additional languages in the admin UI
* (Simon Prosen) Moved admin UI packages to `devDependencies` and consolidated the project package setup
* (Simon Prosen) Updated admin logo assets and added an SVG variant
* (Simon Prosen) Refreshed build, test, TypeScript, and dependency configuration from the current template and dependency updates

### 1.0.0 (2026-03-21)
* (Simon Prosen) InfluxDB v2.x support via native HTTP API with token-based authentication
* (Simon Prosen) Dual-mode logging: cron-based periodic collection and on-change real-time writes
* (Simon Prosen) Multiple logging groups with independent bucket, trigger type, and cron schedule
* (Simon Prosen) Configurable data points with custom measurement names, field keys, and InfluxDB tags
* (Simon Prosen) InfluxDB line protocol formatting with proper type handling for strings, booleans, and numbers
* (Simon Prosen) Batch writing for cron groups combining all data points into a single HTTP request
* (Simon Prosen) Exponential backoff retry logic with smart classification (4xx no-retry, 429/5xx retry)
* (Simon Prosen) Configurable write timeout and retry attempts
* (Simon Prosen) Encrypted API token storage using ioBroker's native encryption
* (Simon Prosen) Connection health check on startup with `info.connection` state indicator
* (Simon Prosen) Admin UI with Connection, Logging Groups, Data Points, and Advanced tabs
* (Simon Prosen) Object browser for visual ioBroker state selection in admin UI
* (Simon Prosen) Connection test button for validating InfluxDB connectivity from admin UI
* (Simon Prosen) Cascading group rename updates across all referencing data points
* (Simon Prosen) Startup validation with warnings for missing or misconfigured groups and data points
* (Simon Prosen) Graceful shutdown with cron job cleanup and subscription removal
* (Simon Prosen) Debug logging mode for troubleshooting
* (Simon Prosen) English and German translations

### 0.0.1 (2026-03-20)
* (Simon Prosen) initial release

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2026 Simon Prosen <simon@prosen.dev>

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
