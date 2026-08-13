# ioBroker IEC 60870-5-104 Adapter

ioBroker adapter for IEC 60870-5-104 master and slave communication.

The adapter can run as an IEC-104 master or slave. Received points are grouped by ASDU/common address below `ASDU-<address>`. Each ASDU contains separate folders for values, IV quality, NT quality, timestamps and COT information.

## Features

- Master mode for connecting to an IEC-104 controlled station.
- Slave mode for exposing configured ioBroker states over IEC-104.
- General interrogation after connect and optional cyclic interrogation.
- Configurable COT, common address and IOA field sizes.
- Configurable data point table with import and export support.
- State layout grouped by ASDU/common address.
- Separate states for value, IV, NT, timestamp and COT text.

## Configuration

Set the connection mode first:

- `Master / controlling station`: connects to a remote IEC-104 slave.
- `Slave / controlled station`: listens locally for a remote IEC-104 master.

Common settings:

| Setting | Meaning |
| --- | --- |
| `Remote host` | Remote host used in master mode. |
| `TCP port` | IEC-104 TCP port, usually `2404`. |
| `Bind address` | Local bind address used in slave mode. |
| `Common address` | Default common address for configured points. |
| `Originator address` | Originator address used in ASDUs. |
| `Read only` | Reject command ASDUs from the remote side. |

## Data Points

Configured points define how IEC-104 IOAs are mapped to ioBroker states. The table supports monitoring types, command types, timestamps, scaling and optional per-point common addresses.

The adapter also stores received points below `ASDU-<address>` so values from different common addresses remain separated.

## Changelog

### **WORK IN PROGRESS**

- Correct button-state metadata, sanitize configured state IDs and clamp all configurable timer values.
- Require Admin >= 7.8.23 and update repository maintenance configuration.

### 0.1.26

- Uses the standard npm environment token fallback and keeps `common.news` within repository limits.

### 0.1.25

- Completed translations for technical ASDU option labels.

### 0.1.24

- Completed all Admin UI translations using short-format i18n files.

### 0.1.23

- Published the point-role fix with npm provenance through the standard ioBroker release workflow.

### 0.1.22

- Assigned valid ioBroker roles to read-only and writable IEC-104 points.
- Restored the standard ioBroker test-and-release deployment workflow.

### 0.1.21

- Fixed ioBroker repochecker metadata, package checks, jsonConfig i18n handling and release automation.

### 0.1.20

- Replaced plain Node.js timers with ioBroker adapter timer helpers.

### 0.1.19

- Removed old unpublished changelog entries from `io-package.json`.
- Added responsive metadata for the data point table.

### 0.1.18

- Added repository metadata, CI release automation and adapter checker compatibility for public ioBroker publication.

### 0.1.17

- Reorganized states by ASDU with Value, IV, NT, Time and COT folders.
- Exposed NT quality and COT text states.
- Improved master reconnect handling.

Older entries are available in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

Copyright (c) 2026 TheBam1990

MIT License. See [LICENSE](LICENSE) for details.
