# ioBroker.solakon-one

[![NPM version](https://img.shields.io/npm/v/iobroker.solakon-one.svg)](https://www.npmjs.com/package/iobroker.solakon-one)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**ioBroker adapter for the Solakon ONE hybrid solar inverter**

Monitors and controls the Solakon ONE hybrid solar inverter ([www.solakon.de](https://www.solakon.de)) with battery storage over the local network via **Modbus TCP** (Port 502).

**[Deutsch / German documentation](README.de.md)**

---

## Requirements

- ioBroker with js-controller >= 6.0.0
- Node.js >= 22
- Solakon ONE inverter reachable in the local network
- Modbus TCP enabled on the device (Port 502)

---

## Installation

Install via the ioBroker Admin interface: **Adapters** → search for **"solakon-one"** → **Install**.

---

## Configuration

| Field | Description | Default |
|-------|-------------|---------|
| **IP Address** | IP of the Solakon ONE on the LAN | `192.168.1.100` |
| **Port** | Modbus TCP port | `502` |
| **Modbus Device ID** | Slave address (1–247) | `1` |
| **Interval (s)** | Poll interval (1–300 s) | `30` |

---

## Data Points

All data points are created under `solakon-one.<instance>.*` (e.g. `solakon-one.0.*` for the default instance number 0; multiple instances are possible).

### Connection Status

| ID | Description | Type |
|----|-------------|------|
| `info.connection` | Connection active | Boolean |

### Device Information (`device.*`)

| ID | Description |
|----|-------------|
| `device.model` | Model name |
| `device.serial` | Serial number |
| `device.fw_master` | Firmware version (Master) |
| `device.fw_slave` | Firmware version (Slave) |

### Photovoltaics (`pv.*`)

| ID | Description | Unit |
|----|-------------|------|
| `pv.total_power` | Total PV power | W |
| `pv.total_energy` | Total PV energy | kWh |
| `pv.pv1_voltage` … `pv4_voltage` | String voltage | V |
| `pv.pv1_current` … `pv4_current` | String current | A |
| `pv.pv1_power` … `pv4_power` | String power | W |

### Battery (`battery.*`)

| ID | Description | Unit |
|----|-------------|------|
| `battery.soc` | State of Charge (SoC) | % |
| `battery.voltage` | Voltage | V |
| `battery.current` | Current | A |
| `battery.power` | Power (+ charge, − discharge) | W |
| `battery.combined_power` | Combined power | W |
| `battery.total_charge` | Total charge energy | kWh |
| `battery.total_discharge` | Total discharge energy | kWh |
| `battery.bms1_soh` | State of Health (SoH) | % |
| `battery.design_energy` | Nominal capacity | Wh |
| `battery.ambient_temp` | Ambient temperature | °C |
| `battery.max_temp` | Maximum temperature | °C |
| `battery.min_temp` | Minimum temperature | °C |

### Grid (`grid.*`)

| ID | Description | Unit |
|----|-------------|------|
| `grid.off_grid` | Island mode active | Boolean |
| `grid.r_voltage` | Grid voltage phase R | V |
| `grid.s_voltage` | Grid voltage phase S | V |
| `grid.t_voltage` | Grid voltage phase T | V |
| `grid.frequency` | Grid frequency | Hz |
| `grid.active_power` | Active power (+ export, − import) | W |
| `grid.reactive_power` | Reactive power | kvar |
| `grid.power_factor` | Power factor | – |
| `grid.total_export` | Total feed-in energy | kWh |
| `grid.total_import` | Total purchased energy | kWh |
| `grid.standard` | Grid standard (6=VDE0126, 7=VDE4105_DE) | – |

### Inverter (`inverter.*`)

| ID | Description | Unit |
|----|-------------|------|
| `inverter.temperature` | Internal temperature | °C |
| `inverter.frequency` | Output frequency | Hz |
| `inverter.daily_energy` | Daily yield | kWh |
| `inverter.total_energy` | Total yield | kWh |
| `inverter.operating_mode` | Operating mode | – |
| `inverter.network_status` | Network status | – |

### Emergency Power / EPS (`eps.*`)

| ID | Description | Unit |
|----|-------------|------|
| `eps.voltage` | EPS output voltage | V |
| `eps.current` | EPS output current | A |
| `eps.power` | EPS output power | W |

### Status (`status.*`)

| ID | Description |
|----|-------------|
| `status.remote_control` | Active remote control mode |
| `status.remote_countdown` | Remaining time remote control (s) |

### Control (`control.*`) — writable

| ID | Description | Range |
|----|-------------|-------|
| `control.remote_control_mode` | Remote control mode | 0/1/3/5/7/9/11/13/15 |
| `control.remote_timeout` | Remote control timeout (s) | 0–3600 |
| `control.remote_active_power` | Active power setpoint (W) | -100000–100000 |
| `control.remote_reactive_power` | Reactive power setpoint (var) | -100000–100000 |
| `control.eps_output` | EPS/UPS output | 0=Off, 2=EPS, 3=UPS |
| `control.minimum_soc` | Min. state of charge | 0–100 % |
| `control.maximum_soc` | Max. state of charge | 0–100 % |
| `control.minimum_soc_ongrid` | Min. SoC (grid-connected) | 0–100 % |
| `control.max_charge_current` | Max. charge current | 0–40 A |
| `control.max_discharge_current` | Max. discharge current | 0–40 A |
| `control.operating_mode` | Operating mode | 0–7 |

#### Operating modes (`operating_mode`)

| Value | Description |
|-------|-------------|
| 0 | Unspecified |
| 1 | Self-consumption |
| 2 | Feed-in priority |
| 3 | Backup |
| 4 | Peak shaving |
| 6 | Force charge |
| 7 | Force discharge |

#### Remote control modes (`remote_control_mode`)

| Value | Description |
|-------|-------------|
| 0 | Off |
| 1 | Inverter export (PV priority) |
| 3 | Inverter import (PV priority) |
| 5 | Battery discharge |
| 7 | Battery charge |
| 9 | Grid export |
| 11 | Grid import |
| 13 | Inverter export (grid priority) |
| 15 | Inverter import (grid priority) |

---

## Changelog

### 1.0.18 (2026-07-24)
- Fix stale Modbus connection not being reset after a poll returns no data, which could cause the adapter to keep reusing a dead connection instead of reconnecting

### 1.0.17 (2026-07-24)
- Speed up adapter startup by creating/healing all datapoints in parallel instead of sequentially
- Make Modbus reconnect more robust (graceful socket close, automatic connect retry) to reduce ECONNRESET disconnects

### 1.0.16 (2026-07-23)
- Fix Admin GUI crash when hovering enum values in the object tree (#44): common.states is now resolved to plain per-language strings instead of translation objects, with automatic self-healing for existing installations
- Add common.desc (English/German) for control and status datapoints

### 1.0.15 (2026-06-28)
- Fix README manufacturer link: use solakon.de instead of the unrelated Home Assistant integration repo

### 1.0.14 (2026-06-28)
- Address manual review feedback: remove postinstall script, English log messages, i18n state labels and instanceObjects, translatable admin labels, sequential polling, README fixes, integration tests

### 1.0.13 (2026-06-11)
- Fix invalid role 'level.power' for power setpoint states (E1008)

### 1.0.12 (2026-06-10)
- Update @tsconfig/node22 to ^22.0.5 (W0083); migrate i18n to short format (S5601)

### 1.0.11 (2026-06-10)
- Add CHANGELOG_OLD.md for older entries (W6020); add tsconfig.json and @tsconfig/node22 (S0085/S0087); add README link to CHANGELOG_OLD.md

### 1.0.10 (2026-06-10)
- Fix W5005: use adapter.setTimeout in modbus.js; update eslint-config to 2.3.4; remove CHANGELOG_OLD.md

### 1.0.9 (2026-06-09)
- Fix JSON syntax error in io-package.json; limit news entries to 7 (E1032)

### 1.0.7 (2026-06-09)
- Fix @types/node version specifier: change >=22 to ^22.0.0 (W0066)

### 1.0.6 (2026-06-09)
- Fix Node.js requirement in README (>=22); add @types/node devDependency

### 1.0.5 (2026-06-09)
- Fix repo checker errors: require Node.js >=22, update release-script packages, remove redundant eslint devDependency, add macOS to CI test matrix, use this.setInterval/clearTimeout correctly

### 1.0.4 (2026-06-09)
- Add multilingual names (11 languages) to all datapoints

### 1.0.3 (2026-05-30)
- Add Node.js 24 to CI test matrix; use Node 24 for lint and deploy

### 1.0.2 (2026-04-13)
- Fix: add changelog to README, remove obsolete .eslintrc.json, add release-script packages, VS Code schema, automerge workflow

### 1.0.1 (2026-04-13)
- Fix: compact mode enabled, ESLint migrated to @iobroker/eslint-config, node: prefix for built-in modules, automated deploy workflow added

### 1.0.0 (2026-04-12)
- Initial release
- Modbus TCP communication
- All sensor data points (PV, battery, grid, inverter, EPS)
- All control data points (operating mode, SoC limits, remote control, EPS)
- Admin UI with jsonConfig

For older changelog entries see CHANGELOG_OLD.md.

---

## License

MIT License

Copyright (c) 2026 Marco Bertulies <berto74online@gmail.com>

Based on the [Home Assistant integration for Solakon ONE](https://github.com/solakon-de/solakon-one-homeassistant).