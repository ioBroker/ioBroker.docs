# ioBroker.anthbot-genie

<img src="admin/anthbot-genie.png" alt="Logo" width="80" /> 

[![Test and Release](https://github.com/reloxx13/ioBroker.anthbot-genie/actions/workflows/test-and-release.yml/badge.svg?branch=main)](https://github.com/reloxx13/ioBroker.anthbot-genie/actions/workflows/test-and-release.yml)
[![GitHub version](https://img.shields.io/github/v/release/reloxx13/ioBroker.anthbot-genie)](https://github.com/reloxx13/ioBroker.anthbot-genie/releases)
[![NPM version](https://img.shields.io/npm/v/iobroker.anthbot-genie.svg)](https://www.npmjs.com/package/iobroker.anthbot-genie)
[![Downloads](https://img.shields.io/npm/dm/iobroker.anthbot-genie.svg)](https://www.npmjs.com/package/iobroker.anthbot-genie)
[![ioBroker installs](https://iobroker.live/badges/anthbot-genie-installed.svg)](https://www.iobroker.net/)
![License](https://img.shields.io/github/license/reloxx13/ioBroker.anthbot-genie)
![ioBroker phase](https://img.shields.io/badge/ioBroker%20phase-latest--repo-green)
[![ioBroker forum](https://img.shields.io/badge/ioBroker-forum-blue)](https://forum.iobroker.net/topic/84983)

[![NPM](https://nodei.co/npm/iobroker.anthbot-genie.png?downloads=true)](https://nodei.co/npm/iobroker.anthbot-genie/)

Unofficial ioBroker adapter for [Anthbot Genie robotic lawn mowers](https://de.anthbot.com/products/genie-mahroboter), focused on detailed Genie telemetry, diagnostics, and mower control across Genie 600/1000/3000/5000 and the newer M5/M9 models.

The adapter connects to the Anthbot cloud account, discovers bound mowers, reads cloud and IoT shadow data, and exposes a broad state tree for status, settings, mower commands, zone data, consumables, location, diagnostics, and raw troubleshooting payloads in ioBroker.

It is intended for users who want more than a basic online/battery/status view: RTK and base station state, firmware and OTA details, network and SIM information, GPS and pose data, map lifecycle timestamps, mower error details, consumable lifetimes, rain settings, zone metadata, and writable mowing controls are exposed as ioBroker states.

This adapter is available in the ioBroker `latest` repository. Please report feedback and test results in the [ioBroker forum thread](https://forum.iobroker.net/topic/84983).

An example ioBroker Blockly with conditions for mower automation is available in the [Blockly automation example](https://forum.iobroker.net/topic/84392/2).

## Features

- Anthbot cloud login with encrypted password storage in ioBroker native config
- Automatic discovery of mowers bound to the configured Anthbot account
- Region and IoT endpoint lookup per mower
- Automatic refresh of temporary IoT credentials after AWS IoT `403` responses
- Polling of property and service shadows
- Detailed status states for connection, online state, battery, mower status, charging state, mowing time, mowing area, total mowing time/area, map status, mapping task state, errors, active mowing mode, point mowing, and zone counts
- Diagnostic states for RTK fix, RTK base station, moved antenna warnings, firmware versions, OTA progress, WiFi, cellular, SIM, Bluetooth, camera/map flags, obstacle avoidance, security flags, system timestamps, and cloud-backed mower error data
- Location states for anti-loss GPS coordinates and local mower pose
- Consumable lifetime states and reset buttons for charging port, cameras, and blades
- Writable control states for full-map mowing, zone mowing, cutting height, voice volume, custom mowing direction, obstacle avoidance, rain settings, and mowing near the charging pile
- Command states for full mowing, stop, return to dock, pause return to dock, grass dump, disk maintenance mode, edge mowing, mowing near the charging pile, point mowing, refresh, manual zone mowing, and automatic zone mowing
- Manual and automatic zone metadata as JSON states, including active manual zone IDs
- Read-only PNG map image states for the native map, RTK mowed-area mask, and historical mowing path
- Raw property shadow, service shadow, Anthbot event-code translations, and area definition payloads for troubleshooting and automation debugging

## Requirements

- ioBroker with js-controller `>= 6.0.11`
- ioBroker admin `>= 7.6.20`
- Node.js `>= 22`
- Anthbot account with at least one bound Genie mower
- Internet access from the ioBroker host to the Anthbot cloud and AWS IoT endpoint

## Installation

The adapter is available in the ioBroker `latest` repository and can be installed from the ioBroker adapter view or from the CLI.

### ioBroker Admin

If the `latest` repository is not active yet, open ioBroker Admin, go to **Settings -> Repositories**, select or enable `latest`, and refresh the adapter list.

Then open the adapter view, search for `anthbot-genie`, and install the adapter from the `latest` repository.

### CLI

Install with:

```bash
iobroker repo set latest
iobroker update
iobroker add anthbot-genie
```

or explicitly with a version:

```bash
iobroker add anthbot-genie@0.1.13
```

## Supported devices

- Genie 600
- Genie 1000
- Genie 3000
- Genie 5000
- M5
- M9

Other Anthbot models may still work when they expose the same cloud and shadow payload structure, but they are not explicitly mapped or documented here yet.

## Development

- `npm install` installs runtime and development dependencies.
- `npm run lint` checks code style using ESLint.
- `npm run lint:fix` applies automatically fixable ESLint changes.
- `npm run check` runs TypeScript and Node.js syntax checks for the adapter entrypoint, split library modules, and test files.
- `npm run test:js` runs unit tests.
- `npm run test:package` runs package validation tests.
- `npm run test:integration` runs integration tests.
- `npm run test` runs `check`, unit tests, and package validation.
- `npm run check:repo` runs the ioBroker repository checker.
- `npm run translate` runs the ioBroker adapter-dev translation workflow.
- `npm run release` creates a new ioBroker package release.

## Translations

- Admin/JSON Config translations live in `admin/i18n/<lang>.json`.
- Backend/runtime object-name translations live in `i18n/<lang>.json`.
- After adding or removing translatable strings, update the English source files and run `npm run translate` so future Weblate and adapter-dev syncs stay aligned.

## Configuration

Open the adapter instance configuration in ioBroker Admin and set:

| Setting | Description | Default |
| --- | --- | --- |
| Anthbot account username | Username or email address of the Anthbot account | empty |
| Anthbot account password | Anthbot account password, stored encrypted by ioBroker | empty |
| Area code | Phone or account area code, for example `49` for Germany | `49` |
| API host | Anthbot cloud API host | `api.anthbot.com` |
| Poll interval in seconds | Polling interval for mower data. The adapter enforces at least 10 seconds. | `60` |
| Fetch map (high CPU usage) | Download and render the native map, RTK mask, and historical mowing path | `false` |
| Generate map with paths (even higher CPU usage) | Download and render the historical mowing path in the map image. Requires map fetching. | `false` |
| Error description language | Language used for Anthbot cloud error descriptions | `English` |

When either map option is disabled, the adapter stops requesting or rendering that map data and leaves existing map state values unchanged.

After saving the configuration, start or restart the adapter instance.

## States

The adapter creates one device tree per mower serial number. If Anthbot ever returns a serial with characters that are unsafe for ioBroker object IDs, the adapter normalizes only those characters while keeping the original serial number in the device object's native metadata:

```text
anthbot-genie.<instance>.<serial>.*
```

### Info

| State | Type | Description |
| --- | --- | --- |
| `info.connection` | boolean | Global adapter cloud connection state |
| `<serial>.info.alias` | string | Mower alias from Anthbot |
| `<serial>.info.model` | string | Mower model/category |
| `<serial>.info.region` | string | Anthbot/AWS IoT region |
| `<serial>.info.endpoint` | string | IoT endpoint used for shadow access |
| `<serial>.info.online` | boolean | Online state reported by the mower |
| `<serial>.info.charging` | boolean | Whether the mower is currently charging |
| `<serial>.info.lastServiceCommand` | string | Last reported service command |
| `<serial>.info.lastPoll` | string | ISO timestamp of the last successful poll |

### Metrics

| State | Type | Unit | Description |
| --- | --- | --- | --- |
| `<serial>.metrics.batteryLevel` | number | `%` | Battery level |
| `<serial>.metrics.status.mower` | string | | Normalized mower status |
| `<serial>.metrics.status.robotRaw` | string | | Raw robot status |
| `<serial>.metrics.status.modeRaw` | string | | Raw `mode.value` status reported by M5/M9 models |
| `<serial>.metrics.mowing.time` | number | `s` | Reported mowing time |
| `<serial>.metrics.mowing.area` | number | `m2` | Reported mowing area |
| `<serial>.metrics.mowing.totalTime` | number | `s` | Total mowing time reported by M5/M9 models |
| `<serial>.metrics.mowing.totalArea` | number | `m2` | Total mowing area reported by M5/M9 models |
| `<serial>.metrics.mowing.borderActive` | boolean | | Border mowing active |
| `<serial>.metrics.mowing.nearChargerActive` | boolean | | Near-charger mowing active |
| `<serial>.metrics.mowing.fullYardActive` | boolean | | Full-yard mowing active |
| `<serial>.metrics.pointMowing.active` | boolean | | Point mowing active |
| `<serial>.metrics.pointMowing.x` | number | | Last point mowing X coordinate |
| `<serial>.metrics.pointMowing.y` | number | | Last point mowing Y coordinate |
| `<serial>.metrics.zones.manualCount` | number | | Number of manual zones |
| `<serial>.metrics.zones.autoCount` | number | | Number of automatic zones |
| `<serial>.metrics.map.totalArea` | number | `m2` | Total mapped area |
| `<serial>.metrics.map.status` | string | | Raw map status |
| `<serial>.metrics.map.mappingTaskState` | string | | Mapping task state reported by M5/M9 models |
| `<serial>.metrics.error.code` | number | | Last mower error code |
| `<serial>.metrics.error.description` | string | | Human-readable error description from the cached Anthbot event-code list when known |
| `<serial>.metrics.error.active` | boolean | | Whether a non-zero mower error is active |

The adapter keeps the same state tree for all supported mower models. On models that do not expose the M5/M9-specific payload fields, the states `metrics.status.modeRaw`, `metrics.mowing.totalTime`, `metrics.mowing.totalArea`, and `metrics.map.mappingTaskState` are still created but remain empty or `null`.

### Map images

| State | Type | Description |
| --- | --- | --- |
| `<serial>.map.image` | string | Native navigation map as a PNG data URI |
| `<serial>.map.imageWithRtkMask` | string | Native navigation map with Anthbot's `rtk_mask_map` as a PNG data URI |
| `<serial>.map.imageWithMowedPath` | string | Native navigation map with the downloaded historical mowing path as a PNG data URI |
| `<serial>.map.mowedPath` | string | JSON array with the exact historical path points used for `map.imageWithMowedPath` |

The three image states are read-only and use the `media.image` role. The `map.mowedPath` state is read-only and uses the `json` role. The adapter downloads Anthbot's `multi_maps` map file, extracts `maps/remote_map_navi.map`, and renders the native raster with the app-compatible light palette. `map.image` contains only the map; `map.imageWithRtkMask` adds the complete `maps/rtk_mask_map` mowed-area raster; `map.imageWithMowedPath` requests `req_history_mapping_path`, downloads `path_<SN>.txt`, renders the historical path in blue, and adds the current mower pose as a yellow robot icon plus the native charger marker below it. `map.mowedPath` contains the same JSON path points used by that PNG. Its `x` and `y` values use the native historical-path centimetre coordinates; divide them by `100` to convert them to the local map metres used by the pose states. The bundled app assets are oriented with the mower front pointing down and are rotated using `location.pose.yaw - 90°` (for example, a live yaw of about `-16°` points the front right); the generated fallback uses the same orientation. The charger marker and the read-only `location.charger.x`/`location.charger.y` states are read from `charger_point` in `maps/remote_map.json`; the state coordinates are exposed in metres. Both overlay images render configured forbidden zones in red. The historical image never falls back to the short live `curpath`. The images and path state are refreshed when the native map identity, timestamp, history path, mower pose, or charger point changes. Missing or invalid map data leaves the states empty while the adapter continues polling.

The two map settings deliberately control different work:

- `fetchMap = false`: no map archive, raster, PNG, or history path is requested. Existing values of the map and charger coordinate states remain unchanged, so a previously generated map and charger position can still be displayed, but they are not updated.
- `fetchMap = true` and `generateMapWithPaths = false`: the native map and RTK-mask states are updated. The historical path is not requested, and `map.imageWithMowedPath` and `map.mowedPath` remain unchanged. Use `map.image` or `map.imageWithRtkMask` for the lower-CPU map view.
- Both settings `true`: all three image states and the `map.mowedPath` state are generated; `map.imageWithMowedPath` contains the historical path and the current robot icon.

#### VIS: map with the integrated robot icon

Use this direct path when both map settings are enabled. Bind the VIS image widget to `<serial>.map.imageWithMowedPath`; the adapter already draws the historical path and the robot icon at the current pose. No second VIS icon widget is needed. Keep the image container at the PNG's native aspect ratio (`404:488`).

#### VIS: map with a separate overlay icon

Use this lower-CPU path when `fetchMap = true` and `generateMapWithPaths = false`. Bind the image widget to `<serial>.map.image` or `<serial>.map.imageWithRtkMask`, then place a transparent icon widget absolutely above it. Bind or calculate its position from `<serial>.location.pose.x` and `<serial>.location.pose.y`. These states are metres; the map metadata supplies the origin and resolution. Keep both widgets in the same relatively positioned container and use the same aspect ratio (`404:488`), otherwise `object-fit: contain` can introduce letterboxing and offset the overlay icon. If `fetchMap = false`, the map image may still show an old state, but neither the map nor its separate overlay position is refreshed by the adapter.

After the pose-state meter conversion is deployed, `location.pose.x` and `location.pose.y` are metres. Convert them to map pixels with the map header values from `maps/remote_map.json`:

```js
const map = {
    width: 404,
    height: 488,
    resolution: 0.05,
    xMin: -15.353175,
    yMin: -9.549684,
};

const pixelX = (poseX - map.xMin) / map.resolution;
const pixelY = map.height - 1 - (poseY - map.yMin) / map.resolution;
const poseYaw = Number(poseYawState); // <serial>.location.pose.yaw

icon.style.left = `${(pixelX / map.width) * 100}%`;
icon.style.top = `${(pixelY / map.height) * 100}%`;
icon.style.transform = `translate(-50%, -50%) rotate(${poseYaw - 90}deg)`;
```

For the current snapshot, `pose.x = 0.094` and `pose.y = 0.356` place the icon at approximately pixel `(309, 289)`, or `left: 76.5%` and `top: 59.2%`. Define `poseYaw` from `<serial>.location.pose.yaw`; with a front-down icon, apply `poseYaw - 90` so a live yaw around `-16` points the front to the right. The adapter does not currently publish map width, height, resolution, or origin as states, so these values must be refreshed when the mower creates a new map; do not mix map-array pixels with the mower's metre coordinates.

#### Yaw: origin and calculation

`<serial>.location.pose.yaw` is the mower heading reported by Anthbot as `pose.yaw`. It is expressed in degrees and is not converted from millimetres. The adapter converts only `pose.x` and `pose.y` from millimetres to metres; yaw is passed through unchanged. X/Y describe the mower's position, so yaw must not be calculated from the current position alone.

For a separate VIS icon whose source image has the mower front pointing down, calculate the image rotation with a fixed `90°` offset:

```js
const yawDeg = Number(yawState); // <serial>.location.pose.yaw
const iconRotationDeg = yawDeg - 90;

icon.style.transform = `translate(-50%, -50%) rotate(${iconRotationDeg}deg)`;
```

The `-90°` offset aligns Anthbot's heading convention with the front-down asset. The same formula is used for the integrated map icon and its generated fallback. Examples: `yaw = 90°` results in `0°` image rotation (front down), while the live value `yaw = -16°` results in `-106°` (equivalent to `254°`) and points the front to the right. If yaw is unavailable, keep the asset in its default front-down orientation.

#### Robot icon source

The inspected Anthbot app bundle contains local map-marker resources, including the Genie `pic_device_map` asset, model-specific S2/S3/M9Pro variants, and the `view_map_battery_position` charger marker. These are packaged UI files selected by the app; the cloud/API payload and downloaded map archive do not provide a reusable icon URL or icon state. The adapter packages the matching app-derived marker assets for known models and uses its own self-contained robot marker if an asset is missing, unreadable, or the model is unknown. The adapter does not depend on the app being installed.

### Location

| State | Type | Description |
| --- | --- | --- |
| `<serial>.location.gps.latitude` | number | GPS latitude from anti-loss position data |
| `<serial>.location.gps.longitude` | number | GPS longitude from anti-loss position data |
| `<serial>.location.pose.x` | number | Local mower pose X in metres |
| `<serial>.location.pose.y` | number | Local mower pose Y in metres |
| `<serial>.location.pose.yaw` | number | Local mower pose yaw |
| `<serial>.location.pose.type` | string | Reported pose type |
| `<serial>.location.charger.x` | number | Charger X coordinate in metres from the native map metadata |
| `<serial>.location.charger.y` | number | Charger Y coordinate in metres from the native map metadata |

### Diagnostics

The `diagnostics` channel exposes read-only troubleshooting data derived from the mower shadow, including RTK state, RTK base state, camera/map/network flags, obstacle avoidance, firmware versions, OTA progress, WiFi/SIM details, timestamps, and the next appointment. On M5/M9 models, the adapter also maps `net_config.*`, `mode.value`, `error.value`, `map.map_area`, `mapping_task.state`, `mowing_time.value`, and `mowing_area.value` into the existing ioBroker state tree where the meanings match.

### Consumables

| State | Type | Unit | Description |
| --- | --- | --- | --- |
| `<serial>.consumable.chargingPort.life` | number | `%` | Charging port lifetime |
| `<serial>.consumable.chargingPort.reset` | boolean | | Reset charging port lifetime |
| `<serial>.consumable.cameras.life` | number | `%` | Cameras lifetime |
| `<serial>.consumable.cameras.reset` | boolean | | Reset cameras lifetime |
| `<serial>.consumable.blades.life` | number | `%` | Blades lifetime |
| `<serial>.consumable.blades.reset` | boolean | | Reset blades lifetime |

The mower accepts consumable reset commands only when the related lifetime value is at or below 5%.

### Controls

Writable control states update mower settings through the Anthbot IoT service shadow. The adapter handles the model-specific shadow payload encoding internally, so the same ioBroker control states can be used across supported mower models.

| State | Type | Range | Description |
| --- | --- | --- | --- |
| `<serial>.controls.fullMapMowing.mowHeight` | number | `30..70 mm`, 5 mm steps | Set full-map cutting height |
| `<serial>.controls.fullMapMowing.includeEdgeTrimming` | boolean | `true`/`false` | Include edge trimming in full-map mowing |
| `<serial>.controls.fullMapMowing.customMowingDirection` | number | `0..180 deg` | Set full-map custom mowing direction |
| `<serial>.controls.fullMapMowing.customMowingDirectionEnabled` | boolean | `true`/`false` | Enable or disable full-map custom mowing direction |
| `<serial>.controls.zoneMowing.mowHeight` | number | `30..70 mm`, 5 mm steps | Set zone mowing cutting height |
| `<serial>.controls.zoneMowing.mowCount` | number | `1..3` | Set zone mowing passes |
| `<serial>.controls.zoneMowing.customMowingDirection` | number | `0..180 deg` | Set zone mowing direction |
| `<serial>.controls.zoneMowing.customMowingDirectionEnabled` | boolean | `true`/`false` | Enable or disable zone mowing direction |
| `<serial>.controls.zoneMowing.obstacleAvoidanceEnabled` | boolean | `true`/`false` | Enable or disable zone obstacle avoidance |
| `<serial>.controls.zoneMowing.obstacleAvoidanceLevel` | number | `0..2` | Set zone obstacle avoidance level |
| `<serial>.controls.voiceVolume` | number | `0..100 %` | Set voice volume |
| `<serial>.controls.rain.perceptionEnabled` | boolean | `true`/`false` | Enable or disable rain perception |
| `<serial>.controls.rain.continueTimeHours` | number | `0..8 h` | Set rain continue time in hours |
| `<serial>.controls.nearChargerMowing.enabled` | boolean | `true`/`false` | Enable or disable mowing near the charging pile |
| `<serial>.controls.nearChargerMowing.mowHeight` | number | `30..70 mm`, 5 mm steps | Set cutting height for mowing near the charging pile |
| `<serial>.controls.nearChargerMowing.mowCount` | number | `1..3` | Set mowing passes near the charging pile |
| `<serial>.controls.nearChargerMowing.obstacleAvoidanceEnabled` | boolean | `true`/`false` | Enable or disable obstacle avoidance near the charging pile |
| `<serial>.controls.nearChargerMowing.obstacleAvoidanceLevel` | number | `0..2` | Set obstacle avoidance level near the charging pile |

### Commands

Command states are writable. Button states are reset to `false` after execution. Zone command states are reset to an empty string after execution. Consumable reset buttons are exposed under `consumable`.

| State | Type | Description |
| --- | --- | --- |
| `<serial>.commands.device.find` | boolean | Find the robot |
| `<serial>.commands.device.refresh` | boolean | Request all mower properties and refresh states |
| `<serial>.commands.device.cancelRtkAntennaMoved` | boolean | Cancel the RTK antenna moved warning |
| `<serial>.commands.docking.startReturn` | boolean | Return to the charging dock |
| `<serial>.commands.docking.pauseReturn` | boolean | Pause return to the charging dock |
| `<serial>.commands.maintenance.startGrassDump` | boolean | Start grass dump |
| `<serial>.commands.maintenance.startDiskMaintenance` | boolean | Start disk maintenance mode |
| `<serial>.commands.mowing.startFullMap` | boolean | Start full-map mowing |
| `<serial>.commands.mowing.startZone` | string | Start mowing one or more manual zones |
| `<serial>.commands.mowing.startAutoZone` | string | Start mowing one or more automatic zones |
| `<serial>.commands.mowing.startPoint` | string | Start point mowing with `x,y` or `{"x":123,"y":456}` |
| `<serial>.commands.mowing.startEdge` | boolean | Start edge mowing |
| `<serial>.commands.mowing.startNearCharger` | boolean | Start mowing near the charging pile |
| `<serial>.commands.mowing.pause` | boolean | Pause mowing |
| `<serial>.commands.mowing.resume` | boolean | Resume mowing |
| `<serial>.commands.mowing.stop` | boolean | Stop all mower tasks |
| `<serial>.commands.mowing.end` | boolean | End mowing |
| `<serial>.commands.mowing.stopPoint` | boolean | Stop point mowing |

Availability of `commands.maintenance.startDiskMaintenance`, `commands.maintenance.startGrassDump`, `commands.mowing.startEdge`, `commands.mowing.startNearCharger`, and `commands.mowing.startPoint` may depend on mower model, firmware, current mower mode, and map/edge data.

### Zones

| State | Type | Description |
| --- | --- | --- |
| `<serial>.zones.manual.list` | JSON string | Known manual/custom zones |
| `<serial>.zones.manual.activeIds` | JSON string | Currently active manual zone IDs |
| `<serial>.zones.autoList` | JSON string | Known automatic/region zones |

### Raw data

| State | Type | Description |
| --- | --- | --- |
| `<serial>.raw.shadow.property` | JSON string | Raw property shadow payload |
| `<serial>.raw.shadow.service` | JSON string | Raw service shadow payload |
| `<serial>.raw.shadow.event-code` | JSON string | Cached Anthbot event-code translation payload used for error descriptions |
| `<serial>.raw.areaDefinition` | JSON string | Raw area definition payload |

## Zone Mowing

The adapter exposes the mower's manual/custom zones in:

```text
<instance>.<serial>.zones.manual.list
```

This state contains a JSON array with known zones. Use the `id` or the exact `name` from that list to start mowing.

Write the selection to:

```text
<instance>.<serial>.commands.mowing.startZone
```

Accepted values:

- one zone by ID: `3`
- one zone by name: `Front yard`
- multiple zones as comma-separated IDs or names: `3,5,Back yard`
- multiple zones as a JSON array: `[3,5,"Back yard"]`

After a valid write, the adapter sends `custom_area_mow_start` with the matched manual zone IDs and clears `commands.mowing.startZone` again.

Automatic zones work similarly through:

```text
<instance>.<serial>.zones.autoList
<instance>.<serial>.commands.mowing.startAutoZone
```

For automatic zones, the adapter resolves the selected zone IDs or names to the zone coordinates and sends `region_mow_start`.

## Troubleshooting

### Adapter does not connect

- Check username, password, and area code.
- Confirm that the mower is visible in the Anthbot app with the same account.
- Increase the adapter log level to `debug` and restart the instance.
- Check `anthbot-genie.<instance>.info.connection`.

### No mower objects are created

- The Anthbot account must have at least one bound mower.
- Check the adapter log for `No Anthbot devices found for this account`.
- Verify that the ioBroker host has internet access.

### Commands do not work

- Check whether status polling works first.
- Verify that the target state is under the correct mower serial number.
- For zone commands, compare the written value with the IDs and names in `zones.manual.list` or `zones.autoList`.
- The adapter automatically refreshes temporary IoT credentials once after an AWS IoT `403`; if commands still fail after that retry, check the adapter log for model-specific payload or mower-state errors.
- Check `raw.shadow.service` and the adapter log for command errors.

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

- Add separate read-only PNG map image states for the native map, RTK mowed-area mask, and downloaded historical mowing path.
- Add an opt-in Admin checkbox for map downloads and rendering because map generation can use significant CPU.
- Add a second opt-in Admin checkbox for historical path rendering because it uses additional CPU and cloud requests.
- Expose local mower pose X/Y states in metres for direct map positioning.
- Expose charger point X/Y states in metres from the native map metadata.
- Expose the historical mowing path used by the PNG as a JSON state.
- Rotate the integrated robot map icon according to the mower pose yaw.
- Render the native charger marker from the map metadata below the mower icon.

### 0.1.13 (2026-06-08)

- Add M5/M9 payload parity for status, battery, error, network, RTK, map, and total mowing metrics while keeping the existing ioBroker state tree stable.
- Refresh temporary IoT credentials once on AWS IoT `403` responses and retry the failed shadow read or command publish automatically.
- Refactor the large adapter sources into focused CommonJS modules for Anthbot cloud/shadow clients, payload helpers, adapter object definitions, state derivation, and command handling without changing state IDs or command payload behavior.
- Expand `npm run check` so syntax validation covers the split `lib/anthbot`, `lib/adapter`, and unit test files through the dedicated syntax-check helper.

### 0.1.12 (2026-06-06)

- (reloxx13) **FIXED**: Create the global `info` channel and correct the mower status role so the adapter object structure passes ioBroker review checks.

### 0.1.11 (2026-06-06)

- Refresh existing mower device/channel/state objects with `extendObjectAsync` so updated runtime i18n names are applied to already-created objects, not only new ones.

### 0.1.10 (2026-06-06)

- Align ioBroker object metadata with the repository object-structure checker by creating the global `info` channel, correcting the mower status role, and emitting full recommended i18n keys for object names.
- Keep admin translations in the repository-checker-friendly `admin/i18n/<lang>.json` layout and load backend/runtime object-name translations from root `i18n/<lang>.json` files via adapter-core `I18n`.

### 0.1.9 (2026-06-06)

- Drop the temporary `--legacy-peer-deps` GitHub Actions install override now that the lockfile supports plain `npm ci` again.
- Re-enable ESLint in the GitHub Actions quick-check job and align the local lint config with the checked JavaScript codebase.
- Clean up repository metadata so local `repochecker` no longer reports actionable findings.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## Credits

Special credit to the community Anthbot Genie projects, which made the Anthbot cloud flow and command mapping much easier to understand:

- [vincentjanv](https://github.com/vincentjanv/anthbot_genie_ha)
- [AdrianTIonut](https://github.com/AdrianTIonut/anthbot_genie_ha)

Special thanks to [@Riza-Aslan](https://github.com/Riza-Aslan) for the M5/M9 support research and payload-mapping work that informed this adapter update.

This ioBroker adapter is an independent project, but it builds on public API research and implementation ideas from that community work.

## Legal Notice

This project is unofficial and is not affiliated with, endorsed by, sponsored by, or approved by Anthbot.

Anthbot and Genie names, marks, and logos belong to their respective owners. See [NOTICE.md](NOTICE.md) for details.

Older changelog entries are archived in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT License

Copyright (c) 2026 reloxx13

See [LICENSE](LICENSE) for details.
