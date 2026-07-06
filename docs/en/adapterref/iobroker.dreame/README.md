![Logo](admin/dreame.png)

# ioBroker.dreame

[![NPM version](https://img.shields.io/npm/v/iobroker.dreame.svg)](https://www.npmjs.com/package/iobroker.dreame)
[![Downloads](https://img.shields.io/npm/dm/iobroker.dreame.svg)](https://www.npmjs.com/package/iobroker.dreame)
![Number of Installations](https://iobroker.live/badges/dreame-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/dreame-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.dreame.png?downloads=true)](https://nodei.co/npm/iobroker.dreame/)

**Tests:** ![Test and Release](https://github.com/TA2k/ioBroker.dreame/workflows/Test%20and%20Release/badge.svg)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## dreame adapter for ioBroker

Adapter for Dreame and MOVA robot vacuums and robot mowers.

**Supported brands:** Dreame, MOVA (select in adapter settings)

**Tested with:** L10, L20, X40, A2 1200 (Mower), MOVA 600, MOVA 1000

---

## Configuration

| Setting | Description |
| --- | --- |
| Cloud Service | Select **Dreame** or **MOVA** depending on your app |
| App Email | Your Dreame/MOVA app login email |
| App Password | Your Dreame/MOVA app password |
| Get Map | Enable map rendering (higher CPU usage) |
| Update interval | Polling interval in minutes |

> MOVA devices (600, 1000) use the same cloud backend as Dreame but with different domains. Select **MOVA** if you use the MOVA app.

---

## Vacuum (L10, L20, X40, ...)

The adapter creates a dedicated state tree for vacuum robots with named states, writable settings, and action buttons.

### Vacuum Status

| State | Description |
| ----- | ----------- |
| state | Robot state (1=Cleaning, 2=Standby, 3=Paused, 5=Returning, 6=Charging, 7=Mopping, 8=Drying, 9=Washing, ...) |
| error | Error code |
| battery-level | Battery percentage |
| charging-status | 1=Charging, 2=Not charging, 3=Completed, 5=Return to charge |
| status | Cleaning status (0=Idle, 1=Paused, 2=Cleaning, 3=Back home, 6=Charging, 18=Segment, 19=Zone, 20=Spot, 21=Mapping) |
| cleaning-time | Current cleaning time (min) |
| cleaned-area | Current cleaned area (m²) |
| cleaning-progress | Cleaning progress (%) |
| drying-progress | Drying progress (%) |
| task-status | Task (0=Completed, 1=Auto, 2=Zone, 3=Segment, 4=Spot, 5=Mapping) |
| task-type | Task type |
| serial-number | Serial number |
| faults | Fault details |
| warn-status | Warning status |
| water-tank | 0=Not installed, 1=Installed, 10=Mop installed |
| self-wash-base-status | Self-wash base status |
| mop-in-station | Mop in station |
| mop-pad-installed | Mop pad installed |
| drainage-status | Drainage status |
| device-capability | Device capability flags |

#### Consumables

| State | Description |
| ----- | ----------- |
| main-brush-left | Main brush life (%) |
| main-brush-time-left | Main brush time left (h) |
| side-brush-left | Side brush life (%) |
| side-brush-time-left | Side brush time left (h) |
| filter-left | Filter life (%) |
| filter-time-left | Filter time left (h) |
| sensor-dirty-left | Sensor life (%) |
| sensor-dirty-time-left | Sensor time left (h) |
| wheel-dirty-left | Wheel life (%) |

#### Station Status

| State | Description |
| ----- | ----------- |
| clean-water-tank-status | 0=Installed, 1=Not installed, 2=Low water |
| dirty-water-tank-status | 0=Installed, 1=Not installed or full |
| dust-bag-status | 0=Installed, 1=Not installed, 2=Check |
| detergent-status | Detergent status |
| hot-water-status | Hot water status |

#### Statistics

| State | Description |
| ----- | ----------- |
| first-cleaning-date | First cleaning date (unix timestamp) |
| total-cleaning-time | Total cleaning time (min) |
| cleaning-count | Total cleaning count |
| total-cleaned-area | Total cleaned area (m²) |

#### AutoSwitch Parsed Values

These are parsed from the `auto-switch-settings` JSON and available as individual states:

| State | Description |
| ----- | ----------- |
| auto-drying | Auto drying: 0=off, 1=on |
| collision-avoidance | Collision avoidance: 0=off, 1=on |
| fill-light | Fill light in dark: 0=off, 1=on |
| stain-avoidance | Stain avoidance: 0=off, 1=on |
| mopping-type | 0=Daily, 1=Accurate, 2=Deep |
| clean-genius | CleanGenius: 0=Off, 1=Routine, 2=Deep |
| cleaning-route | 1=Standard, 2=Intensive, 3=Deep, 4=Quick |
| wider-corner | Corner coverage: 0=Off, 1=HighFreq, -7=LowFreq |
| floor-direction | Floor direction cleaning: 0=off, 1=on |
| pet-focused | Pet focused cleaning: 0=off, 1=on |
| max-suction | Max suction power: 0=off, 1=on |
| hot-washing | Hot washing: 0=off, 1=on |
| uv-sterilization | UV sterilization: 0=off, 1=on |
| ultra-clean-mode | Ultra clean mode: 0=off, 1=on |
| mop-extend | Mop extend: 0=off, 1=on |
| smart-charging | Smart charging: 0=off, 1=on |

### Vacuum Remote

| State | Description |
| ----- | ----------- |
| suction-level | 0=Quiet, 1=Standard, 2=Strong, 3=Turbo |
| water-volume | 1=Low, 2=Medium, 3=High |
| cleaning-mode | 0=Sweeping, 1=Mopping, 2=Sweep+Mop, 3=Mop after sweep |
| carpet-boost | Carpet boost on/off |
| obstacle-avoidance | Obstacle avoidance on/off |
| ai-detection | AI detection bitfield |
| child-lock | Child lock on/off |
| carpet-sensitivity | 1=Low, 2=Medium, 3=High |
| carpet-recognition | Carpet recognition on/off |
| carpet-cleaning | 0=Avoid, 1=Adapt, 2=Ignore |
| self-clean | Self clean on/off |
| drying-time | 2=2h, 3=3h, 4=4h |
| auto-mount-mop | Auto mount mop on/off |
| mop-wash-level | Mop wash level |
| auto-water-refilling | Auto water refilling on/off |
| auto-add-detergent | Auto add detergent on/off |
| dnd-enable | Do not disturb on/off |
| dnd-start / dnd-end | DND time range |
| volume | Volume level |
| auto-dust-collecting | Auto dust collecting on/off |
| auto-empty-frequency | Auto empty frequency |
| wetness-level | Wetness level |
| cleangenius-mode | 0=Off, 1=Routine, 2=Deep |
| water-temperature | 0=Cold, 1=Warm, 2=Hot, 3=Boiling |
| silent-drying | Silent drying on/off |
| hair-compression | Hair compression on/off |
| mopping-with-detergent | Mopping with detergent on/off |

#### AutoSwitch Set Commands

These write directly to the device's AutoSwitch settings (property 4-50):

| State | Description |
| ----- | ----------- |
| set-auto-drying | Set auto drying: 0=off, 1=on |
| set-collision-avoidance | Set collision avoidance: 0=off, 1=on |
| set-fill-light | Set fill light: 0=off, 1=on |
| set-stain-avoidance | Set stain avoidance: 0=off, 1=on |
| set-mopping-type | Set mopping type: 0=Daily, 1=Accurate, 2=Deep |
| set-clean-genius | Set CleanGenius: 0=Off, 1=Routine, 2=Deep |
| set-cleaning-route | Set cleaning route: 1=Standard, 2=Intensive, 3=Deep, 4=Quick |
| set-wider-corner | Set wider corner: 0=Off, 1=HighFreq, -7=LowFreq |
| set-floor-direction | Set floor direction: 0=off, 1=on |
| set-pet-focused | Set pet focused: 0=off, 1=on |
| set-smart-charging | Set smart charging: 0=off, 1=on |
| set-hot-washing | Set hot washing: 0=off, 1=on |
| set-uv-sterilization | Set UV sterilization: 0=off, 1=on |
| set-max-suction | Set max suction: 0=off, 1=on |
| set-ultra-clean | Set ultra clean: 0=off, 1=on |
| set-mop-extend | Set mop extend: 0=off, 1=on |
| set-smart-drying | Set smart drying: 0=off, 1=on |
| set-self-clean-frequency | 0=Per room, 1=Standard, 2=High |
| set-intensive-carpet | Set intensive carpet: 0=off, 1=on |
| set-gap-cleaning | Set gap cleaning extension: 0=off, 1=on |
| set-mopping-under-furniture | Set mopping under furniture: 0=off, 1=on |
| set-custom-mopping | Set custom mopping mode: 0=off, 1=on |

#### Actions

| State | Description |
| ----- | ----------- |
| start-clean | Start cleaning (button) |
| pause | Pause cleaning (button) |
| stop | Stop cleaning (button) |
| return-to-dock | Return to dock (button) |
| start-custom-clean | Start custom clean (value: JSON with piid/value pairs) |
| start-washing | Start mop washing (button) |
| start-auto-empty | Start auto empty (button) |
| locate | Locate robot / play sound (button) |
| clear-warning | Clear warning (button) |
| reset-main-brush | Reset main brush consumable (button) |
| reset-side-brush | Reset side brush consumable (button) |
| reset-filter | Reset filter consumable (button) |
| reset-sensor | Reset sensor consumable (button) |
| fetchMap | Fetch map from device (button) |
| customCommand | Send custom MIoT command (JSON) |

#### Room Cleaning

`dreame.0.XXXX.remote.start-custom-clean`

```json
[
  { "piid": 1, "value": 18 },
  { "piid": 10, "value": "{\"selects\":[[X,1,3,2,1]]}" }
]
```

X = Room ID. Multiple rooms: `{\"selects\":[[X,1,3,2,1],[Y,1,3,2,1]]}`

#### Switch Map

`dreame.0.XXXXXXX.remote.customCommand`:

```json
{ "siid": 6, "aiid": 2, "in": [{ "piid": 4, "value": "{\"sm\":{},\"mapid\":X}" }] }
```

X = mapId (see `dreame.0.XXXX.status.map-list`)

---

## Mower (A2, A2 1200, ...)

The adapter supports Dreame robotic mowers with dedicated states and map rendering.

### Mower Status

| State            | Description                                                                                                |
| ---------------- | ---------------------------------------------------------------------------------------------------------- |
| status           | Mower status (1=Mowing, 2=Standby, 3=Paused, 5=Returning, 6=Charging, 11=Mapping, 13=Charged, 14=Updating) |
| fault            | Error code                                                                                                 |
| battery-level    | Battery percentage                                                                                         |
| charging-state   | Charging state                                                                                             |
| work-mode        | Current work mode                                                                                          |
| mowing-time      | Current mowing time (min)                                                                                  |
| mowing-area      | Current mowed area (m²)                                                                                    |
| task-status      | Task status                                                                                                |
| faults           | Fault details                                                                                              |
| warn-status      | Warning status                                                                                             |
| settings-update  | Settings change via MQTT (2-51). Value: `[en,hours]`=Rain, `0/1`=Frost, `[en,start,end]`=LowSpeed          |
| zone-status      | Zone mowing status per area                                                                                |
| ai-obstacles     | AI detected obstacles                                                                                      |
| self-check       | Self-check diagnostic result                                                                               |
| total-mow-time   | Total mowing time (min)                                                                                    |
| total-mow-count  | Total mow count                                                                                            |
| total-mow-area   | Total mowed area (m²)                                                                                      |
| rain-protection  | Rain protection settings (WRP): `[enabled, wait_hours, sensitivity]`                                       |
| frost-protection | Frost protection (FDP): 0=off, 1=on                                                                        |
| low-speed        | Low speed night mode (LOW): `[enabled, start_min, end_min]`                                                |
| dnd-settings     | Do not disturb settings (DND): `[enabled, start_min, end_min]`                                             |
| battery-config   | Battery config (BAT): `[return%, max%, charge_en, ?, start, end]`                                          |
| volume           | Volume (VOL): 0-100                                                                                        |
| child-lock-cfg   | Child lock (CLS): 0=off, 1=on                                                                              |
| ai-obstacle-cfg  | AI obstacle avoidance (AOP): 0=off, 1=on                                                                   |
| anti-theft       | Anti-theft (STUN): 0=off, 1=on                                                                             |
| headlight        | Headlight settings (LIT): `[enabled, start, end, l1, l2, l3, l4]`                                          |
| grass-protection | Grass protection (PROT): 0=off, 1=on                                                                       |
| blade-hours      | Blade operating hours (max 100h)                                                                           |
| blade-health     | Blade health 0-100%                                                                                        |
| brush-hours      | Brush operating hours (max 500h)                                                                           |
| brush-health     | Brush health 0-100%                                                                                        |
| robot-maintenance-hours | Robot maintenance hours (max 60h)                                                                   |
| robot-maintenance-health | Robot maintenance health 0-100%                                                                    |
| collision-avoidance | Collision avoidance (AutoSwitch LessColl): 0=off, 1=on                                              |
| fill-light          | Fill light (AutoSwitch FillinLight): 0=off, 1=on                                                    |
| clean-genius        | CleanGenius (AutoSwitch SmartHost): 0=Off, 1=Routine, 2=Deep                                        |
| cleaning-route      | Cleaning route (AutoSwitch CleanRoute): 1=Standard, 2=Intensiv, 3=Deep, 4=Quick                     |
| wider-corner        | Wider corner coverage (AutoSwitch MeticulousTwist): 0=Off, 1=HighFreq, 7=LowFreq                    |
| floor-direction     | Floor direction cleaning (AutoSwitch MaterialDirectionClean): 0=off, 1=on                            |
| pet-focused         | Pet focused cleaning (AutoSwitch PetPartClean): 0=off, 1=on                                         |
| auto-charging       | Auto charging (AutoSwitch SmartCharge): 0=off, 1=on                                                 |
| cutting-height      | Cutting height in mm (PRE)                                                                           |
| obstacle-distance-cfg | Obstacle distance in mm (PRE)                                                                      |
| mow-mode            | Mow mode (PRE): 0=Standard, 1=Efficient                                                             |
| direction-change    | Direction change (PRE): 0=auto, 1=off                                                                |
| edge-mowing         | Edge mowing (PRE): 0=off, 1=on                                                                      |
| edge-detection      | Edge detection (PRE): 0=off, 1=on                                                                   |

### Mower Remote

| State                  | Description                                                            |
| ---------------------- | ---------------------------------------------------------------------- |
| start-mow              | Start mowing                                                           |
| stop-mow               | Stop mowing                                                            |
| pause-mow              | Pause mowing                                                           |
| start-charge           | Return to dock                                                         |
| start-mow-ext          | Start custom mow (zone/segment cleaning with params)                   |
| clear-warning          | Clear warning/error state                                              |
| obstacle-avoidance     | Obstacle avoidance on/off                                              |
| ai-detection           | AI detection on/off                                                    |
| child-lock             | Child lock on/off                                                      |
| dnd-enable             | Do not disturb on/off                                                  |
| dnd-start / dnd-end    | DND time range                                                         |
| schedule               | Mow schedule                                                           |
| set-rain-protection    | Set rain protection: `{"value":1,"time":8,"sen":0}` or `{"value":0}`   |
| set-frost-protection   | Set frost protection: 0=off, 1=on                                      |
| set-low-speed          | Set low speed night: `{"value":1,"time":[1200,480]}` or `{"value":0}`  |
| set-dnd                | Set do not disturb: `{"value":1,"time":[1200,480]}` or `{"value":0}`   |
| set-child-lock         | Set child lock: 0=off, 1=on                                            |
| set-volume             | Set volume: 0-100                                                      |
| set-ai-obstacle        | Set AI obstacle avoidance: 0=off, 1=on                                 |
| set-anti-theft         | Set anti-theft: 0=off, 1=on                                            |
| set-headlight          | Set headlight: `{"value":1,"time":[480,1200],"light":[1,1,1,1]}`       |
| set-path-display       | Set path display: 0=off, 1=on                                          |
| set-grass-protection   | Set grass protection: 0=off, 1=on                                      |
| reset-consumables      | Reset consumables: `{"value":[0,brush,robot]}`                         |
| find-robot             | Find robot (play sound, button)                                        |
| lock-robot             | Lock robot (button)                                                    |
| fetchMap               | Fetch map from device (button)                                         |
| generate-3dmap         | Generate 3D LIDAR map (button)                                         |
| customCommand          | Send custom MIoT command                                               |
| set-collision-avoidance | Set collision avoidance (AutoSwitch): 0=off, 1=on                     |
| set-fill-light         | Set fill light (AutoSwitch): 0=off, 1=on                              |
| set-clean-genius       | Set CleanGenius (AutoSwitch): 0=Off, 1=Routine, 2=Deep                |
| set-cleaning-route     | Set cleaning route (AutoSwitch): 1=Standard, 2=Intensiv, 3=Deep, 4=Quick |
| set-auto-charging      | Set auto charging (AutoSwitch): 0=off, 1=on                           |
| set-cutting-height     | Set cutting height in mm (PRE)                                         |
| set-mow-mode           | Set mow mode (PRE): 0=Standard, 1=Efficient                           |
| set-edge-mowing        | Set edge mowing (PRE): 0=off, 1=on                                    |
| set-edge-detection     | Set edge detection (PRE): 0=off, 1=on                                 |
| set-direction-change   | Set direction change (PRE): 0=auto, 1=off                             |

### Mower Shortcuts

Shortcuts are parsed from property 4-48 (base64 encoded names). Each shortcut gets its own channel under `deviceId.shortcuts.{id}`:

| State | Description |
| ----- | ----------- |
| name  | Decoded shortcut name |
| running | Whether the shortcut is currently running |
| start | Button to start the shortcut |

### Mower History

Cleaning history is fetched from the cloud API (last 20 mow sessions).

| State | Description |
| ----- | ----------- |
| last-mow-date | Date of the last mowing session |
| last-mow-duration | Duration of last session (min) |
| last-mow-area | Area mowed in last session (m²) |
| last-mow-completed | Whether last session completed successfully |
| history-json | JSON array of last 20 sessions |

### Mower Map

Map data is fetched via the Dreame iotuserdata API (not MQTT like vacuums).

| State           | Description                              |
| --------------- | ---------------------------------------- |
| mapImage        | Rendered map as PNG (base64 data URL)    |
| slot0.zone_X    | Zone data (name, area, mowing time)      |
| mowingPath      | Raw mowing path coordinates              |
| settings        | Mowing settings per zone                 |
| schedule        | Mowing schedule                          |
| 3dmap-url       | 3D LIDAR map download URL (pre-signed)   |
| 3dmap-progress  | 3D map generation progress (0-100%)      |

**Map polling:** The map is fetched on adapter start and via the `fetchMap` button. During active mowing (status 1, 3, 5, 11) the map is automatically polled every 30 seconds to track the mowing path.

**Map rendering:** Requires the optional `canvas` npm package. The map shows zones (green), contours (white outlines), mowing path (yellow), forbidden areas (red), and obstacles (red circles).

**3D LIDAR Map:** Press `generate-3dmap` to trigger the mower to scan and upload a 3D point cloud map. The downloaded file is a PCD (Point Cloud Data) file that can be viewed with tools like CloudCompare or MeshLab. Progress is tracked in `3dmap-progress`. Once complete, the pre-signed download URL is written to `3dmap-url`. The URL is temporary and expires after some hours.

#### Custom Commands for Mower

Via `dreame.0.XXXXXX.remote.customCommand`:

```json
{
  "siid": 5,
  "aiid": 9,
  "in": [{ "order": 4, "region": [1], "type": "order" }]
}
```

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.3.7 (2026-04-28)

- Fix mower SETTINGS/SCHEDULE parsing: reassemble chunked data before JSON.parse (fixes warning every 30s)
- Fix mower actions: remove dangerous start-zone-mow (was sending DOCK), add pause-mow and clear-warning
- Remove mower stop-mow-ext (no HA equivalent)

### 0.3.6 (2026-04-21)

- Add dedicated vacuum state tree (createVacuumRemotes) with ~85 status, ~32 remote, ~22 AutoSwitch, ~13 action states
- Add vacuum consumable reset buttons (main brush, side brush, filter, sensor)
- Add vacuum AutoSwitch parsing (25 features: auto-drying, collision-avoidance, fill-light, clean-genius, cleaning-route, etc.)
- Add vacuum action buttons (start, pause, stop, return-to-dock, locate, start-washing, start-auto-empty, clear-warning)
- Add vacuum station status (clean/dirty water tank, dust bag, detergent, hot water)
- Add vacuum extended settings (wetness, CleanGenius mode, water temperature, silent drying, hair compression)
- Add 20 new vacuum status enums (draining, dust bag drying, floor maintaining, finding pet, etc.)
- Fix mower return-to-dock command (was siid:3 aiid:1, now correct siid:5 aiid:3)
- Fix mower start-zone-mow was sending DOCK command (siid:2 aiid:3 remapped to siid:5 aiid:3) — removed, use start-mow-ext with params instead
- Fix mower missing pause-mow action — added (siid:5 aiid:4)
- Fix mower missing clear-warning action — added (siid:4 aiid:3)
- Remove mower stop-mow-ext (siid:4 aiid:2, no HA equivalent)
- Fix set_properties method for writable states (was incorrectly sending as action)
- Fix boolean action commands now send in:[] parameter

### 0.3.5 (2026-04-19)

- Add AutoSwitch properties (4-50): collision avoidance, fill light, CleanGenius, cleaning route, auto charging, etc.
- Add PRE mowing preferences: cutting height, obstacle distance, mow mode, edge mowing, edge detection, direction change
- Add shortcuts support (4-48): parsed names, running state, start buttons
- Add cleaning history via cloud API (last 20 mow sessions with date, duration, area, completion)
- Fix battery byte parsing (buf[11] & 0x7F + charging bit 7)

### 0.3.4 (2026-04-19)

- Add mower settings states from getCFG (rain protection, frost protection, low speed, DND, battery config, volume, headlight, AI obstacle, camera, anti-theft, etc.)
- Load all settings on startup and auto-reload on prop.2.51 MQTT trigger
- Add dedicated remote states for setting CFG values (set-rain-protection, set-frost-protection, set-volume, find-robot, lock-robot, etc.)
- Split consumables into individual states (blade-hours, brush-hours, robot-maintenance-hours + health %)
- Add individual consumable reset buttons (reset-blade, reset-brush, reset-robot-maintenance)
- Correct prop.2.51 as generic settings-update trigger (WRP/FDP/LOW)
- Remove invalid cleaning-progress (4-63) from mower states

### 0.3.3 (2026-04-19)

- Parse all mower MQTT binary state fields (battery, error, location, docking, pin, camera, BLE/WiFi/LTE RSSI)
- Parse mower live position from MQTT siid:1 piid:4 (12-bit packed format)
- Parse mower task progress (region, percent, total/finished area)
- Draw robot position and dock on mower map image
- Draw robot, charger, virtual walls, no-go zones and zone names on vacuum map image
- Add siid-piid identifiers to all mower state names
- Fix mower status labels per common_mower_protocol.json
- Add named mower properties (task-info, device-time, zone-status, RTK, GPS satellites, positioning-mode)
- Fetch all siid property values on startup (removed siid<=3 filter)
- Fix undefined deviceArray entry in connectMqtt

### 0.3.2 (2026-04-17)

- Add MOVA brand support (MOVA 600, MOVA 1000)
- Add Cloud Service selector (Dreame/MOVA) in adapter settings
- Centralize API configuration (domain, auth, headers) per brand
- Add mower support (A1, A1 Pro, A2, A2 1200, A3 AWD 1000)
- Dedicated mower states (status, remote, map)
- Mower map rendering via iotuserdata API
- Add 3D LIDAR map generation and download URL
- Add retry logic for API requests
- Fix JSON parsing errors

### 0.2.2 (2025-01-24)

- Reduce CPU load while cleaning

### 0.2.1 (2025-01-15)

- Fix for canvas installation

### 0.2.0 (2024-12-28)

- Add simple maps

### 0.1.1 (2024-12-14)

- Improve error handling

### 0.1.0 (2024-12-14)

- (TA2k) initial release

## License

MIT License

Copyright (c) 2024-2030 TA2k <tombox2020@gmail.com>

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
