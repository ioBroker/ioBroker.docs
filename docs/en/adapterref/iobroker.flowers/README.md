# ioBroker.flowers

![Logo](admin/flowers.png)

[![NPM version](https://img.shields.io/npm/v/iobroker.flowers.svg)](https://www.npmjs.com/package/iobroker.flowers)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Monitor indoor plants via soil moisture, temperature and battery sensors with Telegram notifications.

This adapter works with **any sensor** already integrated in ioBroker (Zigbee, Wi-Fi, Bluetooth, Z-Wave, etc.) — no specific hardware required. Popular compatible sensors:

- [Xiaomi Mi Flora / HHCC Plant Sensor](https://www.mi.com/global/mi-flora) — Bluetooth soil moisture + temperature + light
- [Zigbee soil moisture sensors](https://www.zigbee2mqtt.io/supported-devices/#s=soil) (e.g. Tuya TS0601, MOES) — via ioBroker Zigbee adapter
- Any sensor exposing humidity/temperature/battery states in ioBroker

Notifications are sent via the [ioBroker Telegram adapter](https://github.com/ioBroker/ioBroker.telegram).

## Features

- Monitor multiple plants with individual sensor assignments
- Built-in plant profiles (Ficus, Orchid, Cactus, Monstera, Fern, Succulent, Palm, Pothos, Aloe Vera, Peace Lily, Coffea arabica, Rhapis excelsa, Calathea zebrina, Sansevieria Laurentii, Custom)
- Custom profiles: create your own plant profiles with individual thresholds in the Profiles tab
- Configurable thresholds per plant (override profile defaults)
- Automatic watering: trigger a watering switch when soil humidity drops below minimum
- Configurable watering duration (minutes)
- Telegram notifications via `sendTo('telegram.X', ...)`
- Anti-spam: max messages per day limit + configurable cooldown per alert type
- Night mode: suppress notifications during quiet hours
- Daily and weekly plant status reports with manual trigger buttons
- Offline sensor detection

## Configuration

### Settings Tab

| Parameter | Description |
|-----------|-------------|
| Telegram Instance | Instance number of the telegram adapter |
| Telegram Users | Comma-separated usernames (empty = all users) |
| Check Interval | How often to check sensor values |
| Max Messages per Day | Anti-spam limit |
| Offline Threshold | Hours before sensor is considered offline |
| Night Mode | Suppress notifications during night hours |
| Daily/Weekly Report | Scheduled status reports |

### Plants Tab

Add your plants and assign ioBroker state IDs for each sensor. Select a profile — thresholds are applied automatically. You can override individual threshold values per plant.

For automatic watering, assign a **Watering** state ID (e.g. a switch that controls a pump or valve). When soil humidity drops below the minimum threshold, the adapter sets this state to `true` for the configured watering duration, then sets it back to `false`.

### Profiles Tab

Overview of built-in profiles with recommended thresholds. You can also create **custom profiles** in the table at the top — enter a name and thresholds, then use that name in the "Custom Profile" field in the Plants tab.

## States

The adapter creates states under `flowers.X.plants.<plant_name>`:

| State | Description |
|-------|-------------|
| `humidity` | Current soil humidity % |
| `temperature` | Current temperature °C |
| `battery` | Current battery % |

And under `flowers.X`:

| State | Description |
|-------|-------------|
| `info.connection` | Adapter connection status |
| `notifications.totalToday` | Notifications sent today |
| `notifications.sendDailyReport` | Button: trigger daily report manually |
| `notifications.sendWeeklyReport` | Button: trigger weekly report manually |

### Automatic Watering

Assign a **Watering** state (e.g. `zigbee.0.pump.state`) in the Plants tab. When humidity drops below the minimum:
1. The adapter sets the watering state to `true`
2. Waits for the configured **Watering Duration** (minutes)
3. Sets the state back to `false`

Only one watering cycle runs at a time per plant. Configure the duration in Settings → Automatic Watering.

## Changelog

### 0.3.9 (2026-04-30)
- (sadam6752-tech) Fix button state roles: set `read=false` for `sendDailyReport` and `sendWeeklyReport` buttons (required by ioBroker role spec)

### 0.3.8 (2026-04-30)
- (sadam6752-tech) Auto-cleanup: remove ioBroker objects for plants deleted from config on adapter start

### 0.3.7 (2026-04-30)
- (sadam6752-tech) Fix E8915: add dependabot cooldown (`default-days: 7`) for npm ecosystem
- (sadam6752-tech) Update CI/CD: `check-and-lint` and `deploy` steps to Node.js 24.x
- (sadam6752-tech) Remove redundant `eslint` devDependency (included via `@iobroker/eslint-config`)
- (sadam6752-tech) Add CHANGELOG_OLD.md for older changelog entries

### 0.3.6 (2026-03-31)
- (sadam6752-tech) Fix dependabot config to track all package.json in subdirectories (W8905)
- (sadam6752-tech) Add .github/auto-merge.yml for dependabot automerge configuration (S8914)

### 0.3.5 (2026-03-31)
- (sadam6752-tech) Fix .releaseconfig.json plugins format (array instead of object)

### 0.3.4 (2026-03-31)
- (sadam6752-tech) Add unit tests for MonitorService, NotificationManager and messages (106 tests total)
- (sadam6752-tech) Update README with links to compatible devices and Telegram adapter
- (sadam6752-tech) Remove mocha from devDependencies (already included in @iobroker/testing)

### 0.3.3 (2026-03-30)
- (sadam6752-tech) Fix object hierarchy: create device/channel parent objects before states
- (sadam6752-tech) Use correct state roles: value.humidity, value.temperature, value.battery
- (sadam6752-tech) Improve unload: null timers after clearing, guard monitor null check

### 0.3.2 (2026-03-30)
- (sadam6752-tech) Custom profiles: users can create own plant profiles in Profiles tab
- (sadam6752-tech) Custom profile field in Plants table for direct profile name entry

For older changelog entries see [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT License  
Copyright (c) 2025-2026 sadam6752-tech <sadam6752@gmail.com>  
