<img src="admin/dreame.png" width="128" />

# ioBroker.dreame

[![NPM version](https://img.shields.io/npm/v/iobroker.dreame.svg)](https://www.npmjs.com/package/iobroker.dreame)
[![Downloads](https://img.shields.io/npm/dm/iobroker.dreame.svg)](https://www.npmjs.com/package/iobroker.dreame)
![Number of Installations](https://iobroker.live/badges/dreame-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/dreame-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.dreame.png?downloads=true)](https://nodei.co/npm/iobroker.dreame/)

**Tests:** ![Test and Release](https://github.com/TA2k/ioBroker.dreame/workflows/Test%20and%20Release/badge.svg)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

![Live Map widget](docs/Pics/Map-Screen.jpg)

## dreame adapter for ioBroker

Adapter for Dreame and MOVA robot vacuums and robot mowers.

**Supported brands:** Dreame, MOVA (select in adapter settings)

**Tested with:** L10, L20, X40, A2 1200 (Mower), MOVA 600, MOVA 1000

---

## Installation

### Via ioBroker Admin (recommended)

1. Make sure the "Latest" repository is active under
   Admin → Settings → Repositories
2. Go to the "Adapters" tab and search for "dreame"
3. Click install

The adapter is currently available in the **Latest** repository. Stable
repository inclusion has been requested (see status at
https://github.com/ioBroker/ioBroker.repositories/pull/6200).

### Via CLI

```shell
iobroker install dreame@latest
```

### For adapter development

If you want to contribute to the adapter code itself (not just use it):

```shell
git clone https://github.com/TA2k/ioBroker.dreame.git
cd ioBroker.dreame
npm install
npm link
```

---

## Configuration

| Setting         | Description                                         |
| --------------- | --------------------------------------------------- |
| Cloud Service   | Select **Dreame** or **MOVA** depending on your app |
| App Email       | Your Dreame/MOVA app login email                    |
| App Password    | Your Dreame/MOVA app password                       |
| Get Map         | Fetches the map from the cloud on adapter start and every *Update interval* minutes; also maintains room names and the stored map images. Required for the map widget below. |
| Update interval | Cycle (minutes) in which the adapter actively polls the cloud — map fetch **and** general device status (battery, cleaning status, etc.). Higher values reduce cloud requests but delay both. |

> MOVA devices (600, 1000) use the same cloud backend as Dreame but with different domains. Select **MOVA** if you use the MOVA app.

---

## Vacuum (L10, L20, X40, ...)

The adapter creates states for vacuum robots lazily — only properties actually reported by your device appear in the object tree. States fill in gradually after adapter start and after the first polling cycle. The tables below show all known possible states; your device may only report a subset.

### Vacuum Status

| State                 | Description                                                                                                       |
| --------------------- | ----------------------------------------------------------------------------------------------------------------- |
| state                 | Robot state (1=Cleaning, 2=Standby, 3=Paused, 5=Returning, 6=Charging, 7=Mopping, 8=Drying, 9=Washing, ...)       |
| error                 | Error code                                                                                                        |
| battery-level         | Battery percentage                                                                                                |
| charging-status       | 1=Charging, 2=Not charging, 3=Completed, 5=Return to charge                                                       |
| status                | Cleaning status (0=Idle, 1=Paused, 2=Cleaning, 3=Back home, 6=Charging, 18=Segment, 19=Zone, 20=Spot, 21=Mapping) |
| cleaning-time         | Current cleaning time (min)                                                                                       |
| cleaned-area          | Current cleaned area (m²)                                                                                         |
| cleaning-progress     | Cleaning progress (%)                                                                                             |
| drying-progress       | Drying progress (%)                                                                                               |
| task-status           | Task (0=Completed, 1=Auto, 2=Zone, 3=Segment, 4=Spot, 5=Mapping)                                                  |
| task-type             | Task type                                                                                                         |
| serial-number         | Serial number                                                                                                     |
| faults                | Fault details                                                                                                     |
| warn-status           | Warning status                                                                                                    |
| water-tank            | 0=Not installed, 1=Installed, 10=Mop installed                                                                    |
| self-wash-base-status | Self-wash base status                                                                                             |
| mop-in-station        | Mop in station                                                                                                    |
| mop-pad-installed     | Mop pad installed                                                                                                 |
| drainage-status       | Drainage status                                                                                                   |
| device-capability     | Device capability flags                                                                                           |

#### Consumables

| State                  | Description              |
| ---------------------- | ------------------------ |
| main-brush-left        | Main brush life (%)      |
| main-brush-time-left   | Main brush time left (h) |
| side-brush-left        | Side brush life (%)      |
| side-brush-time-left   | Side brush time left (h) |
| filter-left            | Filter life (%)          |
| filter-time-left       | Filter time left (h)     |
| sensor-dirty-left      | Sensor life (%)          |
| sensor-dirty-time-left | Sensor time left (h)     |
| wheel-dirty-left       | Wheel life (%)           |

#### Station Status

| State                   | Description                               |
| ----------------------- | ----------------------------------------- |
| clean-water-tank-status | 0=Installed, 1=Not installed, 2=Low water |
| dirty-water-tank-status | 0=Installed, 1=Not installed or full      |
| dust-bag-status         | 0=Installed, 1=Not installed, 2=Check     |
| detergent-status        | Detergent status                          |
| hot-water-status        | Hot water status                          |

#### Statistics

| State               | Description                          |
| ------------------- | ------------------------------------ |
| first-cleaning-date | First cleaning date (unix timestamp) |
| total-cleaning-time | Total cleaning time (min)            |
| cleaning-count      | Total cleaning count                 |
| total-cleaned-area  | Total cleaned area (m²)              |

#### AutoSwitch Parsed Values

These are parsed from the `auto-switch-settings` JSON and available as individual states:

| State               | Description                                    |
| ------------------- | ---------------------------------------------- |
| auto-drying         | Auto drying: 0=off, 1=on                       |
| collision-avoidance | Collision avoidance: 0=off, 1=on               |
| fill-light          | Fill light in dark: 0=off, 1=on                |
| stain-avoidance     | Stain avoidance: 0=off, 1=on                   |
| mopping-type        | 0=Daily, 1=Accurate, 2=Deep                    |
| clean-genius        | CleanGenius: 0=Off, 1=Routine, 2=Deep          |
| cleaning-route      | 1=Standard, 2=Intensive, 3=Deep, 4=Quick       |
| wider-corner        | Corner coverage: 0=Off, 1=HighFreq, -7=LowFreq |
| floor-direction     | Floor direction cleaning: 0=off, 1=on          |
| pet-focused         | Pet focused cleaning: 0=off, 1=on              |
| max-suction         | Max suction power: 0=off, 1=on                 |
| hot-washing         | Hot washing: 0=off, 1=on                       |
| uv-sterilization    | UV sterilization: 0=off, 1=on                  |
| ultra-clean-mode    | Ultra clean mode: 0=off, 1=on                  |
| mop-extend          | Mop extend: 0=off, 1=on                        |
| smart-charging      | Smart charging: 0=off, 1=on                    |

### Vacuum Remote

| State                  | Description                                           |
| ---------------------- | ----------------------------------------------------- |
| suction-level          | 0=Quiet, 1=Standard, 2=Strong, 3=Turbo                |
| water-volume           | 1=Low, 2=Medium, 3=High                               |
| cleaning-mode          | 0=Sweeping, 1=Mopping, 2=Sweep+Mop, 3=Mop after sweep |
| carpet-boost           | Carpet boost on/off                                   |
| obstacle-avoidance     | Obstacle avoidance on/off                             |
| ai-detection           | AI detection bitfield                                 |
| child-lock             | Child lock on/off                                     |
| carpet-sensitivity     | 1=Low, 2=Medium, 3=High                               |
| carpet-recognition     | Carpet recognition on/off                             |
| carpet-cleaning        | 0=Avoid, 1=Adapt, 2=Ignore                            |
| self-clean             | Self clean on/off                                     |
| drying-time            | 2=2h, 3=3h, 4=4h                                      |
| auto-mount-mop         | Auto mount mop on/off                                 |
| mop-wash-level         | Mop wash level                                        |
| auto-water-refilling   | Auto water refilling on/off                           |
| auto-add-detergent     | Auto add detergent on/off                             |
| dnd-enable             | Do not disturb on/off                                 |
| dnd-start / dnd-end    | DND time range                                        |
| volume                 | Volume level                                          |
| auto-dust-collecting   | Auto dust collecting on/off                           |
| auto-empty-frequency   | Auto empty frequency                                  |
| wetness-level          | Wetness level (1–32)                                  |
| cleangenius-mode       | 0=Off, 1=Routine, 2=Deep                              |
| water-temperature      | 0=Cold, 1=Warm, 2=Hot, 3=Boiling                      |
| silent-drying          | Silent drying on/off                                  |
| hair-compression       | Hair compression on/off                               |
| mopping-with-detergent | Mopping with detergent on/off                         |

#### AutoSwitch Set Commands

These write directly to the device's AutoSwitch settings (property 4-50):

| State                       | Description                                                  |
| --------------------------- | ------------------------------------------------------------ |
| set-auto-drying             | Set auto drying: 0=off, 1=on                                 |
| set-collision-avoidance     | Set collision avoidance: 0=off, 1=on                         |
| set-fill-light              | Set fill light: 0=off, 1=on                                  |
| set-stain-avoidance         | Set stain avoidance: 0=off, 1=on                             |
| set-mopping-type            | Set mopping type: 0=Daily, 1=Accurate, 2=Deep                |
| set-clean-genius            | Set CleanGenius: 0=Off, 1=Routine, 2=Deep                    |
| set-cleaning-route          | Set cleaning route: 1=Standard, 2=Intensive, 3=Deep, 4=Quick |
| set-wider-corner            | Set wider corner: 0=Off, 1=HighFreq, -7=LowFreq              |
| set-floor-direction         | Set floor direction: 0=off, 1=on                             |
| set-pet-focused             | Set pet focused: 0=off, 1=on                                 |
| set-smart-charging          | Set smart charging: 0=off, 1=on                              |
| set-hot-washing             | Set hot washing: 0=off, 1=on                                 |
| set-uv-sterilization        | Set UV sterilization: 0=off, 1=on                            |
| set-max-suction             | Set max suction: 0=off, 1=on                                 |
| set-ultra-clean             | Set ultra clean: 0=off, 1=on                                 |
| set-mop-extend              | Set mop extend: 0=off, 1=on                                  |
| set-smart-drying            | Set smart drying: 0=off, 1=on                                |
| set-self-clean-frequency    | 0=Per room, 1=Standard, 2=High                               |
| set-intensive-carpet        | Set intensive carpet: 0=off, 1=on                            |
| set-gap-cleaning            | Set gap cleaning extension: 0=off, 1=on                      |
| set-mopping-under-furniture | Set mopping under furniture: 0=off, 1=on                     |
| set-custom-mopping          | Set custom mopping mode: 0=off, 1=on                         |

#### Actions

> **Breaking change since 0.3.18:** Action states (`start-clean`, `stop`,
> `pause`, `return-to-dock`, `locate`, `start-washing`, `start-auto-empty`,
> `clear-warning`, and all reset buttons) are now **type boolean / role button**.
> Write `true` to trigger them. Scripts or Vis widgets that previously wrote
> a string value must be updated.

| State              | Description                                            |
| ------------------ | ------------------------------------------------------ |
| start-clean        | Start cleaning (button)                                |
| pause              | Pause cleaning (button)                                |
| stop               | Stop cleaning (button)                                 |
| return-to-dock     | Return to dock (button)                                |
| start-custom-clean | Start custom clean (value: JSON with piid/value pairs) |
| start-washing      | Start mop washing (button)                             |
| start-auto-empty   | Start auto empty (button)                              |
| locate             | Locate robot / play sound (button)                     |
| clear-warning      | Clear warning (button)                                 |
| reset-main-brush   | Reset main brush consumable (button)                   |
| reset-side-brush   | Reset side brush consumable (button)                   |
| reset-filter       | Reset filter consumable (button)                       |
| reset-sensor       | Reset sensor consumable (button)                       |
| fetchMap           | Fetch map from device (button)                         |
| customCommand      | Send custom MIoT command (JSON)                        |

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

### Custom Room Cleaning

The **Custom Room Cleaning** feature lets you select individual rooms and send the robot only to those rooms, instead of cleaning the entire floor. Suction level and water volume apply globally to all selected rooms.

#### Step-by-step guide

**a) Name your map (optional, recommended for multi-floor households)**

When a map is first detected, `map.maps.<id>.mapName` is created with the placeholder value `"Map <id>"` (e.g. `"Map 1"`). This state is directly writable — change the value in the ioBroker object tree to something meaningful, e.g. from `"Map 1"` to `"Ground Floor"`. The channel name of `map.maps.<id>` updates automatically as soon as you save the new value. No adapter restart required.

**b) Set the active map**

Write the map ID (e.g. `1`) to `remote.custom-room-cleaning.active-map`. Only the rooms belonging to that map will be sent to the robot when you trigger start. The named map from step (a) helps you identify which ID corresponds to which floor.

**c) Select rooms**

Under `remote.custom-room-cleaning.map-<id>/`, each recognized room appears as a boolean state. The channel and state names show the translated room name from the map (e.g. `kitchen`, `living-room`, `bathroom`). Set the desired rooms to `true`.

**d) Adjust suction level and water volume (optional)**

`remote.suction-level` and `remote.water-volume` apply to all selected rooms. Set them before triggering start if you want non-default values. These are the same states used for regular cleaning.

**e) Start the cleaning run**

Set `remote.custom-room-cleaning.start` to `true`. The adapter builds the room selection from the active map's checkboxes, sends it to the robot, and resets the `start` state to `false` automatically.

#### Advanced: direct `customCommand` editing

`remote.custom-room-cleaning.customCommand` holds the raw selection as a JSON string. You can write it directly if you prefer:

```json
{"selects":[[roomId, repeats, suctionLevel, waterVolume, index], ...]}
```

Example — kitchen (ID 4) once at strong suction, medium water:

```json
{"selects":[[4, 1, 2, 2, 1]]}
```

The `customCommand` and the room checkboxes are **bidirectionally synchronized**: editing either one updates the other automatically. Writing `customCommand` directly updates the checkboxes for the active map; ticking a checkbox rebuilds `customCommand`. Both paths are equivalent.

#### Known limitations

- **Global suction/water only** — suction level and water volume are set identically for all selected rooms. Per-room settings (as shown in `map.cleanset.*`) are not supported by this feature.
- **Multi-floor tested with one map** — the multi-map structure (one channel group per map) is fully implemented, but only single-map operation has been tested extensively on real hardware. Multi-floor households with two or more maps should work but are not yet verified end-to-end.

---

### Vacuum Shortcuts

Shortcuts (quick commands created in the Dreame app) are parsed from property 4-48 (base64 encoded names). Each shortcut gets its own channel under `deviceId.shortcuts.{id}`:

| State   | Description                                |
| ------- | ------------------------------------------ |
| name    | Decoded shortcut name                      |
| running | Whether the shortcut is currently running  |
| start   | Button to start the shortcut               |

Channels are rebuilt automatically on adapter start (not just on the next app-side change) and removed automatically when a shortcut is deleted in the app.

---

### Schedules

Schedules created in the Dreame app (property 8-2) are parsed into one channel per schedule entry under `deviceId.schedule.{id}`:

| State      | Description                                                                          |
| ---------- | ------------------------------------------------------------------------------------- |
| enabled    | Whether the schedule is active — writable, toggles the schedule directly on the robot |
| time       | Time of day the schedule triggers (`HH:MM`)                                            |
| weekdays   | Weekdays the schedule runs on (currently always in German, e.g. `Mo,Mi,Fr` or `täglich`) |
| type       | Kind of schedule: room cleaning, all-rooms cleaning, or a shortcut                      |
| rooms      | *(room-cleaning schedules only)* JSON array, one entry per room with its own mode/suction/route/cycles/moisture and translated room name |
| parameters | *(all-rooms schedules only)* JSON object with mode/suction/route/cycles/moisture applying to the whole floor |
| shortcutId | *(shortcut schedules only)* the numeric ID of the linked shortcut                      |
| orphan     | *(shortcut schedules only)* `true` if the linked shortcut no longer exists (deleted in the app) — `enabled` should not be relied on in this case |

Schedule channels are rebuilt automatically on adapter start and removed automatically when a schedule is deleted in the app, same as shortcuts above.

---

### Live Map

The adapter brings its own live map: robot position and heading, cleaning trail, rooms, zones, furniture and carpets, updating in real time while the robot cleans, with every control of the robot beside it. The same view appears in four places, built from the same code:

| Where | How to open it |
| --- | --- |
| Web page | `%web_protocol%://%ip%:%web_port%/dreame/`, e.g. `http://<your-iobroker>:8082/dreame/` - served by the **web** adapter. A ready-made link ("Dreame-Map") is on the ioBroker start page and next to this instance in the adapter list. Ready to embed as an iframe in vis, Grafana or any dashboard. |
| Admin tab | "Dreame" in the admin's left-hand menu. |
| Devices app | The "Dreame robot" tile for ioBroker.devices: status or map on the tile, the full view in a dialog. |
| vis-2 | The "Dreame robot" widget: status or map with the full view in a dialog, or the full view in the widget itself. |

#### Setup

- **Get Map** must be enabled (see [Configuration](#configuration)) - without it there is no map.
- If no map is shown yet, start the adapter once while the robot sits in its dock so the first full map can load.
- Several robots: a device switcher appears in the header, or pick one with `?did=<did>`. Another adapter instance: `?instance=1`.
- A page opened from elsewhere - a file on a tablet - finds ioBroker with `?iob=http://<your-iobroker>:8082`; the browser remembers it.

> **Camera/VSLAM robots are not supported.** Devices that navigate by camera instead of lidar (e.g. Mijia 1C/1T, Dreame F9) are not covered by the map - it is built and tested for lidar robots only. The adapter logs a warning and the map stays empty for these devices.

#### Features

- 2D and 3D map; floor selector for robots with several stored maps
- Tap rooms to pick them; Start then cleans just those, otherwise the whole home. A cleaning order can be set by tapping as well
- Robot and dock with Home Assistant's icons and status badges; the robot drives along its trail instead of jumping between map updates
- No-go and no-mop zones, virtual walls, curtains, furniture and carpets on the map
- Panels: status, faults, cleaning, order, station, water & mop, shortcuts, schedules, maintenance, statistics - a mower shows only what applies to it
- 11 languages, following the ioBroker system language

#### Settings

Behind the gear, stored per robot in `<did>.config.widget` - so they apply wherever the robot is shown:

- Map rotation, sidebar left or right, UI zoom, sidebar width
- Each panel on or off, and single rows or buttons inside them; shortcuts are hidden with the eye beside each while the settings are open
- On the web page also the colours, in four modes:

| Mode | Description |
| --- | --- |
| Light | Fixed light theme |
| Dark | Fixed dark theme (default) |
| Main color | Pick one base color; sidebar, borders and text are derived from it automatically, with a contrast check so text always stays readable |
| Custom | Five individually chosen colors (background, sidebar, buttons, borders, text) for full control |

<table>
<tr>
<td width="50%"><img src="docs/Pics/Map-Dark.jpg" alt="Dark theme"></td>
<td width="50%"><img src="docs/Pics/Map-White.jpg" alt="Light theme"></td>
</tr>
</table>

#### Kiosk / iframe example

The web page's settings can put the current look into a link (`?cfg=<blob>`); `?gear=0` hides the gear, for read-only displays such as wall tablets:

```
http://<your-iobroker>:8082/dreame/?gear=0&cfg=<blob>
```

The link only affects that browser tab or embed - it never overwrites the settings stored for the robot. Links made with the previous web interface keep working.

---

## Mower (A2, A2 1200, ...)

The adapter supports Dreame robotic mowers with dedicated states and map rendering. States are created lazily — only properties actually reported by your device appear in the object tree.

### Mower Status

| State                    | Description                                                                                                |
| ------------------------ | ---------------------------------------------------------------------------------------------------------- |
| status                   | Mower status (1=Mowing, 2=Standby, 3=Paused, 5=Returning, 6=Charging, 11=Mapping, 13=Charged, 14=Updating) |
| fault                    | Error code                                                                                                 |
| battery-level            | Battery percentage                                                                                         |
| charging-state           | Charging state                                                                                             |
| work-mode                | Current work mode                                                                                          |
| mowing-time              | Current mowing time (min)                                                                                  |
| mowing-area              | Current mowed area (m²)                                                                                    |
| task-status              | Task status                                                                                                |
| faults                   | Fault details                                                                                              |
| warn-status              | Warning status                                                                                             |
| settings-update          | Settings change via MQTT (2-51). Value: `[en,hours]`=Rain, `0/1`=Frost, `[en,start,end]`=LowSpeed          |
| zone-status              | Zone mowing status per area                                                                                |
| ai-obstacles             | AI detected obstacles                                                                                      |
| self-check               | Self-check diagnostic result                                                                               |
| total-mow-time           | Total mowing time (min)                                                                                    |
| total-mow-count          | Total mow count                                                                                            |
| total-mow-area           | Total mowed area (m²)                                                                                      |
| rain-protection          | Rain protection settings (WRP): `[enabled, wait_hours, sensitivity]`                                       |
| frost-protection         | Frost protection (FDP): 0=off, 1=on                                                                        |
| low-speed                | Low speed night mode (LOW): `[enabled, start_min, end_min]`                                                |
| dnd-settings             | Do not disturb settings (DND): `[enabled, start_min, end_min]`                                             |
| battery-config           | Battery config (BAT): `[return%, max%, charge_en, ?, start, end]`                                          |
| volume                   | Volume (VOL): 0-100                                                                                        |
| child-lock-cfg           | Child lock (CLS): 0=off, 1=on                                                                              |
| ai-obstacle-cfg          | AI obstacle avoidance (AOP): 0=off, 1=on                                                                   |
| anti-theft               | Anti-theft (STUN): 0=off, 1=on                                                                             |
| headlight                | Headlight settings (LIT): `[enabled, start, end, l1, l2, l3, l4]`                                          |
| grass-protection         | Grass protection (PROT): 0=off, 1=on                                                                       |
| blade-hours              | Blade operating hours (max 100h)                                                                           |
| blade-health             | Blade health 0-100%                                                                                        |
| brush-hours              | Brush operating hours (max 500h)                                                                           |
| brush-health             | Brush health 0-100%                                                                                        |
| robot-maintenance-hours  | Robot maintenance hours (max 60h)                                                                          |
| robot-maintenance-health | Robot maintenance health 0-100%                                                                            |
| collision-avoidance      | Collision avoidance (AutoSwitch LessColl): 0=off, 1=on                                                     |
| fill-light               | Fill light (AutoSwitch FillinLight): 0=off, 1=on                                                           |
| clean-genius             | CleanGenius (AutoSwitch SmartHost): 0=Off, 1=Routine, 2=Deep                                               |
| cleaning-route           | Cleaning route (AutoSwitch CleanRoute): 1=Standard, 2=Intensiv, 3=Deep, 4=Quick                            |
| wider-corner             | Wider corner coverage (AutoSwitch MeticulousTwist): 0=Off, 1=HighFreq, 7=LowFreq                           |
| floor-direction          | Floor direction cleaning (AutoSwitch MaterialDirectionClean): 0=off, 1=on                                  |
| pet-focused              | Pet focused cleaning (AutoSwitch PetPartClean): 0=off, 1=on                                                |
| auto-charging            | Auto charging (AutoSwitch SmartCharge): 0=off, 1=on                                                        |
| cutting-height           | Cutting height in mm (PRE)                                                                                 |
| obstacle-distance-cfg    | Obstacle distance in mm (PRE)                                                                              |
| mow-mode                 | Mow mode (PRE): 0=Standard, 1=Efficient                                                                    |
| direction-change         | Direction change (PRE): 0=auto, 1=off                                                                      |
| edge-mowing              | Edge mowing (PRE): 0=off, 1=on                                                                             |
| edge-detection           | Edge detection (PRE): 0=off, 1=on                                                                          |

#### Position and Task Data (binary protocol, live)

These states are populated from MQTT binary messages and created lazily —
they only appear after the mower sends its first binary update.

**From robot position packet (siid 1-5):**

| State                | Description                                                        |
| -------------------- | ------------------------------------------------------------------ |
| robot-position       | Current robot position JSON: `{"x":..., "y":..., "angle":...}`    |
| mowing-progress      | Current task progress (%)                                          |
| mowed-area           | Area completed in current task (m²)                                |
| total-mow-area-task  | Total planned area for current task (m²)                           |
| mowing-task          | Full task data JSON: `{regionId, taskId, percent, total, finish}`  |

**From device telemetry packet (siid 1-1):**

| State              | Description                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------------ |
| dock-position      | Dock/charger position JSON: `{"x":..., "y":..., "angle":...}` (updated when docking)            |
| docking-state      | IN_STATION / OUT_OF_STATION / PAUSE_DOCKING / FINISH_DOCKING / DOCKING_FAILED / DOCKING_IN_BASE |
| location-state     | Location state (0–3)                                                                             |
| battery-level-live | Live battery level (%) from binary telemetry                                                     |
| charging-live      | Live charging: 0=Not charging, 1=Charging                                                        |
| wifi-rssi          | WiFi signal strength (dBm)                                                                       |
| lte-rssi           | LTE signal strength (dBm)                                                                        |
| ble-rssi           | Bluetooth signal strength (dBm)                                                                  |
| error-code-binary  | Raw error code from binary telemetry                                                             |
| pin-state          | Pin state (0/1)                                                                                  |
| undocking          | Undocking flag (0/1)                                                                             |
| camera-state       | Camera state                                                                                     |

### Mower Remote

| State                   | Description                                                              |
| ----------------------- | ------------------------------------------------------------------------ |
| start-mow               | Start mowing (button)                                                    |
| stop-mow                | Stop mowing (button)                                                     |
| pause-mow               | Pause mowing (button)                                                    |
| start-charge            | Return to dock (button)                                                  |
| start-mow-ext           | Start custom mow (zone/segment cleaning with params)                     |
| clear-warning           | Clear warning/error state (button)                                       |
| obstacle-avoidance      | Obstacle avoidance on/off                                                |
| ai-detection            | AI detection on/off                                                      |
| child-lock              | Child lock on/off                                                        |
| dnd-enable              | Do not disturb on/off                                                    |
| dnd-start / dnd-end     | DND time range                                                           |
| schedule                | Mow schedule                                                             |
| set-rain-protection     | Set rain protection: `{"value":1,"time":8,"sen":0}` or `{"value":0}`     |
| set-frost-protection    | Set frost protection: 0=off, 1=on                                        |
| set-low-speed           | Set low speed night: `{"value":1,"time":[1200,480]}` or `{"value":0}`    |
| set-dnd                 | Set do not disturb: `{"value":1,"time":[1200,480]}` or `{"value":0}`     |
| set-child-lock          | Set child lock: 0=off, 1=on                                              |
| set-volume              | Set volume: 0-100                                                        |
| set-ai-obstacle         | Set AI obstacle avoidance: 0=off, 1=on                                   |
| set-anti-theft          | Set anti-theft: 0=off, 1=on                                              |
| set-headlight           | Set headlight: `{"value":1,"time":[480,1200],"light":[1,1,1,1]}`         |
| set-path-display        | Set path display: 0=off, 1=on                                            |
| set-grass-protection    | Set grass protection: 0=off, 1=on                                        |
| reset-consumables       | Reset consumables: `{"value":[0,brush,robot]}`                           |
| find-robot              | Find robot (play sound, button)                                          |
| lock-robot              | Lock robot (button)                                                      |
| fetchMap                | Fetch map from device (button)                                           |
| generate-3dmap          | Generate 3D LIDAR map (button)                                           |
| customCommand           | Send custom MIoT command                                                 |
| set-collision-avoidance | Set collision avoidance (AutoSwitch): 0=off, 1=on                        |
| set-fill-light          | Set fill light (AutoSwitch): 0=off, 1=on                                 |
| set-clean-genius        | Set CleanGenius (AutoSwitch): 0=Off, 1=Routine, 2=Deep                   |
| set-cleaning-route      | Set cleaning route (AutoSwitch): 1=Standard, 2=Intensiv, 3=Deep, 4=Quick |
| set-auto-charging       | Set auto charging (AutoSwitch): 0=off, 1=on                              |
| set-cutting-height      | Set cutting height in mm (PRE)                                           |
| set-mow-mode            | Set mow mode (PRE): 0=Standard, 1=Efficient                              |
| set-edge-mowing         | Set edge mowing (PRE): 0=off, 1=on                                       |
| set-edge-detection      | Set edge detection (PRE): 0=off, 1=on                                    |
| set-direction-change    | Set direction change (PRE): 0=auto, 1=off                                |
| mow-all                 | Mow all areas (button, o=100)                                            |
| mow-zone                | Mow selected zones — CSV `"1,3"` or JSON `"[1,3]"` (o=102)               |
| mow-plan                | Start mowing per stored plan (button, o=104)                             |
| mow-obstacle-scan       | Obstacle recognition run (button, o=105)                                 |
| mow-edge                | Mow contour: JSON `{"edge":[[x,y],...]}` (o=101)                         |
| mow-spot                | Mow spot area: JSON `{"area":{...}}` (o=103)                             |
| mow-change-map          | Switch active map (number, 0-based index, o=200)                         |

#### Mowing Specific Zones

Every mowing area defined on the map is exposed as its own channel under
`dreame.0.<did>.mower.map.slot<X>.zone<zoneId>`. Open ioBroker's Object
Browser, navigate to your mower, then to `mower.map`, and you will see
one `slot0`, `slot1`, ... per stored map. Each slot contains one
`zone<N>` channel per mowing area — for example `slot0.zone1`,
`slot0.zone3`. Inside each zone you find `name` (as shown in the app),
`area` (m²), `time`, and `path`.

The **numeric part after `zone`** is the zone ID you write into
`remote.mow-zone`. So if the tree looks like this:

```text
dreame.0.<did>.mower.map.slot0.zone1     name = "Front lawn"
dreame.0.<did>.mower.map.slot0.zone3     name = "Back lawn"
dreame.0.<did>.mower.map.slot0.zone5     name = "Side strip"
```

then:

Single zone — mow "Front lawn":

```text
dreame.0.<did>.remote.mow-zone = "1"
```

Multiple zones — mow "Front lawn" + "Back lawn" + "Side strip":

```text
dreame.0.<did>.remote.mow-zone = "1,3,5"
```

JSON form works too — useful from Blockly or JavaScript scripts:

```text
dreame.0.<did>.remote.mow-zone = "[1,3,5]"
```

Blockly / JavaScript-Adapter example:

```js
setState('dreame.0.' + did + '.remote.mow-zone', '1,3', false);
```

The mower parses the list, starts mowing the selected zones, and returns to the dock when done. To stop mid-run, press `stop-mow` (o=2) or `pause-mow` (o=4). Switching maps first (`mow-change-map`) is required if the target zones live on a different map — otherwise the zone IDs will not resolve.

#### Switching the Active Map

If the mower has more than one map, select which map is active before writing zone IDs:

```text
dreame.0.<did>.remote.mow-change-map = 0   // first map
dreame.0.<did>.remote.mow-change-map = 1   // second map
```

### Mower Shortcuts

Shortcuts are parsed from property 4-48 (base64 encoded names). Each shortcut gets its own channel under `deviceId.shortcuts.{id}`:

| State   | Description                               |
| ------- | ----------------------------------------- |
| name    | Decoded shortcut name                     |
| running | Whether the shortcut is currently running |
| start   | Button to start the shortcut              |

### Mower History

Cleaning history is fetched from the cloud API (last 20 mow sessions).

| State              | Description                                 |
| ------------------ | ------------------------------------------- |
| last-mow-date      | Date of the last mowing session             |
| last-mow-duration  | Duration of last session (min)              |
| last-mow-area      | Area mowed in last session (m²)             |
| last-mow-completed | Whether last session completed successfully |
| history-json       | JSON array of last 20 sessions              |

### Mower Map

Map data is fetched via the Dreame iotuserdata API (not MQTT like vacuums).

| State          | Description                            |
| -------------- | -------------------------------------- |
| mapImage       | Rendered map as PNG (base64 data URL)  |
| slot0.zone_X   | Zone data (name, area, mowing time)    |
| mowingPath     | Raw mowing path coordinates            |
| settings       | Mowing settings per zone               |
| schedule       | Mowing schedule                        |
| 3dmap-url      | 3D LIDAR map download URL (pre-signed) |
| 3dmap-progress | 3D map generation progress (0-100%)    |

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

## Known Limitations

**Object tree fills in gradually (lazy state creation)**
States only appear once the device has reported the corresponding property at
least once. After a fresh installation or adapter restart, the tree may look
incomplete for a few minutes — this is expected behaviour.

**L40s Pro Ultra and similar: some states appear only after active use**
Properties in the SIID 4 group (`cleaning-mode` 4-23, `suction-level` 4-4,
`water-volume` 4-5) and SIID 28 (`wetness-level` 28-1) may only be pushed
by the device after an active cleaning session, not during idle polling.
These states will not appear until at least one cleaning cycle has completed
after the adapter was installed or restarted.

**`cleaning-mode` raw values on some devices**
Versions before 0.3.18 could report raw compound values (e.g. 5120, 5121,
5122) instead of the documented 0–3 range on some devices, including the
L40s Pro Ultra. This was caused by the adapter not decoding a
compound-encoded value that combines mode, area and humidity in a single
integer. Since 0.3.18 this is decoded correctly. If you still see raw values
above 1000 after updating, please open an issue with your model and the raw
value you observe.

---

## Translations

State names and descriptions are available in 11 languages: English, German,
Russian, Portuguese, Dutch, French, Italian, Spanish, Polish, Ukrainian, and
Chinese (simplified).

`lib/i18n/en.json` is the authoritative source. All other languages are
generated from it via `npm run translate`. Corrections to non-English
translations should be submitted as PRs against the respective
`lib/i18n/<lang>.json` file.

---

## Changelog

### **WORK IN PROGRESS**
- Live map widget: fix "no connection" when the web adapter is configured for pure WebSockets (ioBroker.ws) instead of socket.io. Under `/socket.io/socket.io.js` the web adapter serves one of two different client libraries depending on its instance configuration: the real socket.io client, which exports a callable `io(url, opts)`, or the shim from `@iobroker/ws-server-library`, which only exposes `io.connect(url, opts)`. The widget called `io(...)` unconditionally, so on a ws setup it died with "io is not a function" before the first request — and because `verbinden()` swallowed that error without logging it, the only visible symptom was the generic "Is the web adapter running?" message, pointing the user at an adapter that was working fine. The data layer (`www/js/core/daten.js`) now picks whichever entry point the loaded client actually offers, additionally listens for the shim's `error` event alongside socket.io's `connect_error`, and logs the real cause to the browser console. Everything above the connection is unaffected — both setups speak the same command set from `@iobroker/socket-classes`, so `getState`/`getStates`/`getObject`/`getObjects`/`setState`/`subscribe` and the `stateChange` event work unchanged.
- New admin tab (foundation): the adapter now registers an admin tab (`common.adminTab`), so Dreame appears in the ioBroker admin's left-hand sidebar alongside the existing web-adapter widget, which is untouched and keeps working. This first step lays the groundwork rather than replacing anything: a React/TypeScript/Vite project under `src-tab/` that builds into `admin/tab.html`, a narrow seven-method connection interface over the admin's own socket (so views can be tested without a socket, an admin or a browser), device discovery from `info.devices` with the same selection rules the widget uses, a typed decoder for the `map.mergedCloud` package, and a pure floor renderer that reproduces the Home Assistant colour scheme — including the exact order its colour rules are applied in, which decides what a room hidden during a running job looks like. The decoder and the renderer return plain data rather than drawing anything, so the planned 3D view can reuse both as-is. 59 tests cover the decoder, the renderer and the device list. Build with `npm run tab:build`.
- Admin tab: room labels on the map, using the same three-step naming rule as the widget and Home Assistant's `set_name()` — a room type chosen in the app wins and is numbered from the second room of that type onwards, otherwise the free-text name from the app, otherwise "Room <id>". Unlike the widget, whose room-type table is hard-coded German regardless of the user's language, the types are translatable here. The tab also reports when the map raster holds several blocks that sit far apart, which is what a robot with more than one stored map looks like when all of it is drawn at once.
- Admin tab: the driven path is drawn, as the two trails Home Assistant uses — a thin vacuum line and a wide, semi-transparent mopping band, with a section that does both appearing in each, which is what makes a vacuum-and-mop run recognisable. The line lifts at every repositioning instead of dashing straight across the home. The world-to-image conversion follows Home Assistant's exact term rather than the shorter-looking one that puts every point about a cell off. The playhead animation and the mask that clips the mopping band to room areas, both present in the widget, are refinements on top of these paths and are not ported yet.
- Admin tab: status header with the robot's current state, battery, cleaned area and run time, plus Start, Stop and Return-to-dock. The 70 status codes and their texts are the widget's own table, reused so both views name the same state identically and the existing translations in all 11 languages apply; a code the table does not know shows as a bare number rather than a guessed label, so it can be quoted in an issue. Commands are state writes to the same triggers the widget uses, and a write that fails now says so instead of leaving a button that appears to do nothing.
- Admin tab: the sidebar panels — cleaning (mode, route, suction, wetness), station (empty, wash, dry), water and mop, maintenance and lifetime statistics. The route list narrows with the mode, because intensive and deep are mopping intensities the robot ignores while it is only vacuuming; offering them would offer a setting that does nothing. A panel whose states the device does not report renders nothing at all rather than a heading over empty rows, so a mower or a basic model shows a shorter column. Wear parts can be reset after a replacement, from a deliberately small control — it changes nothing physical, and doing it by accident quietly costs the user the warning they were relying on. Every panel's labels reuse the widget's existing translation keys, and a test pins that each key named actually exists in the language files, since a missing one would render as the key itself in all 11 languages.
- Admin tab: shortcuts and schedules. Shortcuts run from one button each, with a running one disabled so a second run cannot be queued on top of the first. Schedules are listed by time with their rooms and settings, and each has a switch; one pointing at a shortcut that no longer exists is shown with its switch locked, because arming a schedule that cannot run helps nobody. The kind of a schedule is worked out from which fields the adapter created, not from its `type` state: that state arrives already translated, so branching on it works in German and silently fails everywhere else — the same trap the widget documents having fallen into. Moisture is printed as the level it is, 1 to 32, rather than as a percentage it is not.
- Admin tab: fault list and cleaning sequence. Faults and warnings sit at the top of the sidebar and render nothing at all when there is nothing wrong — a panel that is usually empty is read at a glance, whereas one that always says something has to be read properly every time. The four conditions Home Assistant suppresses are suppressed here too, including a low battery while charging, which is what charging is for. An error code the 136-entry table does not know is shown as a bare number rather than a guessed label, so it can be quoted in an issue. The cleaning sequence is edited on the map: tapping a room selects it and appends it to the order, tapping it again removes it, and the numbered badges show the order. A tap writes the new order and changes nothing locally, so what is drawn is always what the adapter holds — the same state can be written by a script or a second browser tab.
- Admin tab: fix three commands whose state ids were missing their device — starting a shortcut, switching a schedule and writing the cleaning sequence all wrote to a malformed id and therefore did nothing. The commands that build an id themselves, rather than going through the shared trigger helper, are now each pinned by a test.
- Admin tab: zoom and pan on the map — mouse wheel, drag, and buttons for in, out and fit, bottom right where the widget puts them. Zooming holds the point under the cursor still, so zooming into a corner does not walk it off the screen, and panning stops at the map's own edges instead of letting it drift into empty space. Room labels and sequence badges keep a constant size on screen, so zooming in shows more map rather than larger words. A press that barely moves still counts as a tap on a room, which is what makes editing the cleaning sequence workable on a touch screen. Switching to a different map returns to the fitted view rather than leaving the user in a corner of a floor they have not seen.
- Admin tab: 3D map view, switchable from a 2D/3D toggle beside the device name. The floor is the same bitmap the 2D canvas draws, used directly as a texture; the walls are extruded from the occupancy grid; furniture stands at its measured footprint and angle; no-go and no-mop zones lie flat on the floor because they are rules about the floor rather than objects in the room, and virtual walls stand up because they are barriers. Nothing extra is fetched — it is the same map package the 2D view already decodes, so switching costs the robot and the adapter nothing. Wall cells are merged into rectangles before extrusion rather than drawn one cube per cell: a 200 m² flat holds thousands of wall cells, and per-cell extrusion is both slow and reads as gravel instead of as a wall. Heights are the one thing not measured — the robot is a floor-level lidar and reports outlines, never elevations — so the furniture heights are ordinary real-world ones, chosen to make the view readable, and the wall height is the robot app's own 500 mm rather than a real wall. Furniture is drawn as bodies rather than models: the app's models sit inside the app package, and shipping them would mean redistributing Dreame's assets. three.js loads in a chunk of its own on the first switch, so an admin session that only ever opens the 2D map does not download it.
- Admin tab: fix washed-out room colours in 3D and draw the cleaning path on the 3D floor. The colours were a colour-space slip, not a lighting problem: three.js renders to sRGB, and a texture that does not declare its own space is treated as linear and brightened a second time on the way out. The floor texture is now composed on a canvas — the room bitmap with the same path strokes the 2D view draws over it, from the same path data, so the two views cannot disagree about where the robot has been.
- Admin tab: 3D framing, orientation and room labels. The camera now looks at the map straight on rather than from a corner, so it keeps the left-to-right orientation it has in 2D and the same flat is recognisable when switching between the two; a corner view looks more three-dimensional and makes that harder. Framing is computed from the actual window shape on every resize instead of once at startup, since a tall narrow window and a wide short one need very different distances for the same map — but only until the user first orbits, after which the camera is theirs and a resize no longer snatches it back. Rooms are labelled in 3D as well, as sprites that face the camera from every angle, and both views now take their names from one place so they cannot drift apart.
- Admin tab: furniture in 3D is drawn from parts instead of a single block — a bed is a mattress with a headboard and pillows, a table is a top on four legs, a sofa has a back and two arms, a plant is foliage over a pot. All 30 furniture types the map can report have a shape, and a type without one still appears as a block at the measured size rather than not at all. What stays measured is the footprint, the position and the angle, all from the robot; what each piece looks like is drawn from scratch here, which is a deliberately weaker claim. No model files from the Dreame app are used — those live inside the app package, and shipping them would mean redistributing Dreame's assets. The parts of every piece are pooled into two instanced meshes, so a flat of thirty pieces is two draw calls rather than hundreds of objects.
- Admin tab: fix the blurred cleaning path in 3D. The floor texture held one texel per map cell, so the vacuum line — 1.1 cells wide — was a single texel, and on a floor seen at an angle the GPU averaged it into the room colour behind it; the 2D view, drawing the same line as a vector at screen resolution, showed it crisp. The texture is now drawn at up to eight texels per cell, bounded by the GPU's largest texture and a memory budget so a large flat on a phone does not ask for hundreds of megabytes, and it uses anisotropic filtering, which keeps thin lines thin on a surface seen at a slant. The rooms are enlarged without smoothing, so their cell edges stay as hard as before.
- Admin tab: floor selector for robots with more than one stored map. The robot's own floor is shown live — rooms, path, sequence, 2D and 3D — while any other floor is shown as the picture the adapter stores under `map.maps.<id>.image`; only the floor the robot is on arrives as raw map data, so the others cannot be drawn, rotated or clicked, and the 3D switch is disabled for them with a tooltip saying why. The adapter draws those pictures when it starts, so a change made in the app to a floor the robot is not on appears after its next start. The map header's floor id and charger position are now decoded as well; the floor id is what tells which stored map the robot is on.
- New widgets for the devices app (ioBroker.devices) and for vis-2, both built from the same views as the admin tab. The devices tile shows the robot's status on the small sizes and its map on a 2x2 tile — or whichever of the two is picked in its settings — together with the floor the map should show; a click opens the full view in a dialog, 2D or 3D with the floor selector and every panel. The vis-2 widget offers the same two displays and a third that puts the full view straight into the widget, without a dialog, for a view built around the robot. All of them lay themselves out by the size of the widget rather than of the screen, so a narrow widget stacks what a wide one puts side by side, and the dialog goes full screen on a phone. Robot and floor are picked from drop-down lists of the robots and floors there are, under the names the Dreame app gives them, rather than from the object browser, which offers every object of the installation; changing the robot clears the floor, which belonged to the old one. In the devices app these lists are json-config custom fields served from the tile's own bundle. Both widgets are captioned — a devices tile at the bottom, where the app's own tiles put their name, a vis-2 widget at the top, where a card's title sits and where the full view names the robot; in vis-2 this replaces the usual title field, which only knew a text of the user's: automatically with the robot's name — and the floor's, where the map is pinned to one, so two tiles of two floors can be told apart — or with a text of the user's, or not at all; a custom caption also titles the dialog. On a map the caption sits beside the map rather than over it, so it hides no room. Without a robot picked, they show the first robot of `dreame.0`, so a widget works the moment it is placed. In the vis-2 editor the widget is inert, so it can be moved and resized without zooming the map or opening dialogs. Build with `npm run build`; the bundles go to `admin/dm-widgets` and `widgets/dreame`. The words of the widgets' own settings are translated into German; the other nine languages show English for now.
- The web page at `/dreame/` is now the same view as the admin tab and the widgets, built from the same code; the old page in `www/` is gone, and `www/` now holds only the build of the new one. Everything the old page could do is there - compared feature by feature, and what was missing was added to the shared view first, so the admin tab and both widgets gained it too. Its addresses and parameters keep working: `?did=`, `?gear=0` for kiosk displays, `?cfg=` links made with the old page, and `?iob=` for a page opened from elsewhere. It connects through the web adapter whether that speaks socket.io or pure websockets, and loads nothing of the admin's app frame: only the connection and the translations are taken from gui-components, which keeps the page some 500 KB lighter. The translations moved from `www/i18n` to `src-tab/i18n`.
- Map: rooms are picked by tapping them, through the adapter's `remote.custom-room-cleaning` switches, and Start then cleans just those - or, with none picked, the whole home, as before. The selection is the adapter's, not the page's: a tap writes the room's switch, and the map shows the pick when it comes back, so a script, the old page and a second browser all see one selection. The pick is cleared only after the adapter has acknowledged the start, which is when it has read it; the old page cleared it straight after sending, racing the adapter. The switches of the map the robot is on are used, and `active-map` is pointed there before a start, so a pick made on one floor never starts rooms of another. Editing the cleaning order now picks the rooms with it, since the adapter follows an order only for a pick of exactly its rooms, and the order panel says so when the two part. Rooms are drawn as the old page drew them - strong colours, paled where a partial pick leaves them out - and their names in the text colour outlined in the background, readable on every room colour and in both themes.
- Map: robot and dock are drawn with Home Assistant's icons, sized by the map, the robot turned to its heading, each with its status badge - cleaning, charging, sleeping or a fault on the robot; emptying, washing, drying or drying the dust bag on the dock, hot where the water is. The robot drives along its trail instead of jumping every few seconds: each new piece of trail is played back over the time until the next map arrives, the trail growing only behind the robot, which faces the way it drives and turns to its reported heading at the end; without a trail, as on the way home, it glides between reported positions and faces backwards where it reverses. Where the system asks for reduced motion, it moves at once.
- Map: no-go and no-mop zones, virtual walls, curtains, furniture pictures and carpets on the 2D map, drawn as Home Assistant draws them, including the widget's corrections for pixel-exact zone outlines and the half-grid origin of carpets; carpets as HA's checkerboard, the mopping band clipped to the rooms so it no longer spills over walls. Rooms picked for the next start, or cleaned by the running job, carry a badge with the suction level and water amount.
- Panels: the header shows battery, cleaning progress and area, the last two only while a job runs - the robot keeps no "last cleaning" figures, and a stale 29 m² read like a result - and the drying progress while the mop dries. The cleaning panel says which rooms the next start covers, locks the mode during a job, puts the route back to standard when a new mode has no place for it, and shows no route field on a robot that reports none. The station offers only what it has - no station buttons on a robot without a station - with pause and resume for a wash, and a tooltip on every greyed-out button saying why. Water & mop shows the tank as the adapter counts it, coloured and warned by its status, the tank, mop, wetness, detergent and water temperature rows, and a button to reset the counter after a refill. Maintenance turns orange at 20 % and red at 10 %, and a missing dust bag red. Schedules show their type. The connection to the Dreame cloud shows as Live, Offline or Connecting. On a mower the panels that do not apply stay away. The line between panels is no longer drawn twice where a panel has nothing to show.
- Settings behind the gear, in every view: map rotation, sidebar left or right, UI zoom, sidebar width, each panel on or off and single rows or buttons inside it - shortcuts with an eye beside each while the settings are open - and, on the web page, the four colour modes, the share link and a reset that asks twice. Stored per robot in `config.widget`, in the old page's format and migration, so settings made there carry over.
- Map: fix the trail, the rooms and the markers drifting apart from the floor under them wherever the map was drawn in a box of another shape - a wide, short window, or a widget sized by hand. The floor is a canvas and everything on top is an overlay, and the two were sized by different rules: `aspect-ratio` with `max-height` does not keep a ratio, so the browser shortened the box and left its width, the canvas stretched with it, and the overlay kept the map's true shape. The map now measures the space it is given and takes both its sides in pixels, at its own ratio, and the overlay follows the box exactly - so the two cannot disagree, and the map is never stretched.
- vis-2 widget: fix a crash while rendering ("Cannot read properties of undefined (reading 'length')"). vis-2 hands a widget set its own React and MUI, but only under their bare names - and the icon package reaches for the deep path `@mui/material/SvgIcon`, which that does not cover. A second MUI came into the bundle with it, and an icon given an `sx` was then worked out by this bundle's MUI against the theme of vis-2's: where the two versions differ, that throws, since an older theme has no `breakpoints.internal_mediaKeys`. The icons now take their `SvgIcon` from the one MUI vis-2 provides, so nothing of the widget styles against a foreign theme any more - and about 70 KB of duplicated MUI leave the bundle. `@mui/system` is declared as a dependency as well, which is how a widget set tells vis-2 to share it.
- vis-2 widget: captioned automatically as well - the robot's name, and the floor's where the map is pinned to one - or with a text of the user's, or not at all. The option "without card" is now called "without frame", since "card" read as the map in German.

### 0.4.12 (2026-09-17)
- Fix Issue #138: three robustness/functionality fixes for map handling on newer models with AES-encrypted map payloads (r2253c/w and similar). 1) A silent crash in the room-name fallback path (main.js): when the map file request failed, an unhandled TypeError showed up only as a generic error; now an early return with a clear debug message. 2) A model without an AES-IV table entry can never load its base map — this is now a persistent, recognizable condition (unsupportedMapModel) instead of the generic please-restart-the-adapter hint. 3) The old_map_data (piid 13) property, pushed specifically during active cleaning, could carry the same object_name-plus-AES-key format as the already-working piid 3 path, but was previously only logged as unimplemented and discarded; it now reuses the existing, already-verified decrypt pipeline (confirmed against the Home Assistant reference implementation), with a Debug-level log that masks the key material so it is safe to share in a public issue. Thanks to @luckyheiko for the detailed reports that made all three fixes possible.

### 0.4.11 (2026-09-17)
- Fix Issue #119: sync REMAP'd common metadata (name, states) to existing state objects at adapter start. In v0.4.8 the REMAP change for SIID 4/PIID 6 was correctly written to the in-memory spec but not to the persisted ioBroker objects, because _lazyCreateState only updates common.states when the cloud sends a get_properties response for that property — which may never happen for infrequently-changing properties. The frischwasser widget's mop-pad-presence detection then fell back to the pulse-only source and displayed permanent not-installed even on REMAP'd devices. A new one-time-per-device migration (_syncRemapObjectMetadata, marker <did>.info.remapMetaSyncV2) now rebuilds the state objects with the correct metadata at adapter start. Thanks to @SilentM1978 for the diagnostic widget test that isolated the root cause to metadata persistence rather than the REMAP logic itself.

### 0.4.10 (2026-09-12)
- Fix: axios bumped to 1.20.0 for upstream security fixes; Node.js built-in requires now use the node: prefix (lib/haDecode.js, lib/mapMerge.js)

### 0.4.9 (2026-09-12)
- Fix: map.cover type-mismatch log flood during cleaning runs (#141)

### 0.4.8 (2026-09-12)
- Fix Issue #119 for Dreame L40s / X40 Ultra (r9419*): SIID 4 PIID 6 is remapped to reflect mop-pad presence 1:1, same as r6001a in v0.4.7, based on an isolated pad-remove/reinstall test on an r9419h device in this development cycle. Generalize the mop-in-station / mop-pad-installed fixes from v0.4.7 across all vacuum models: the permanently-0 mop-in-station property is now removed from every vacuum device's object tree at spec load time, and mop-pad-installed is renamed to mop-handling-pulse since it only emits ~1s pulses during mechanical mop handling (state id unchanged so existing user scripts keep working). The frischwasser widget's Mopp-montiert indicator now uses the mop-pad-presence state on models where the REMAP is active — visible after the first cloud poll cycle following the update. Also completes missing UI translations (Issue #122). Thanks to @SilentM1978 and @ralfheitz for confirming the pulse behavior on their devices.

### 0.4.7 (2026-09-06)
- New tap-to-sequence widget for custom cleaning order directly on the map with room badges, plus a fresh-water/detergent widget for L20 Ultra. Fix Issue #126: clean-water-tank-status bit-mask handling and derived Boolean states for r2253* (L20 Ultra) models. Fix Issue #119: correct mop-pad status on Dreame X60 Pro Ultra Complete (r6001a) via a new model-override layer — removes the dead mop-in-station property, renames the mop-handling pulse, and remaps SIID 4 PIID 6 to actual mop-pad presence on r6001*. Adds status codes 116/117/121/122 (Installing mop, Removing mop, Entering dock, Exiting dock) globally for all vacuum models. Thanks to @SilentM1978 for the detailed live traces that made the r6001a fix possible.

### 0.4.6 (2026-08-29)
- Attempted fix for issue #124 layer 4 (missing pixel raster on r2253c/r2253w): map background, walls, and room fills were not rendered even though overlays and metadata came through correctly. Adds a fallback to combined_pixel_type when the base pixel raster is empty (matching Home Assistant's renderer), and introduces permanent [MERGE-DEBUG] info-level logging (dimensions, pixel counts, wall/segment counts) so this failure mode is instantly diagnosable if it returns. Models whose base raster is already populated (e.g. r9419h) are unchanged. Thanks to luckyheiko for the pinpoint analysis.

### 0.4.5 (2026-08-28)
- Fix for issue #124 (Layer 3): map rendering could crash on the frontend when the device reported detected carpets with an invalid polygon field (null or malformed). Adds a filter in lib/mapMerge.js so invalid carpets never reach the frontend, a defensive guard in the carpet drawing routine in www/js/karte/merger.js, and a generic try/catch around overlay drawing so a single bad overlay never breaks the whole map rendering. The unreferenced legacy widget page www/legacy.html, which carried the same bug, is removed. Combined with 0.4.3 (comma-truncation) and 0.4.4 (AES decryption), this closes the full end-to-end map path for r2253c/r2253w. Thanks to luckyheiko for identifying the root cause and proposing the fix approach.

### 0.4.4 (2026-08-28)
- Fix for issue #124 (Layer 2): map payload for r2253c, r2253w and similar newer Dreame models is AES-256-CBC encrypted; the adapter now derives the AES key from the object_name comma suffix (SHA256, first 32 hex chars as UTF-8), uses a model-specific IV, and decrypts the payload before zlib inflation. Combined with the 0.4.3 comma-truncation fix, this closes the full end-to-end map download path for r2253 models. Also fixes a long-standing bug in lib/dreame.js where the persistent MAP_LIST path used an empty IV instead of the model-specific one. Models without a comma suffix in the object_name (e.g. r9419h/L40s) are unchanged. Thanks to luckyheiko and ralfheitz for the diagnostic logs.

### 0.4.3 (2026-08-28)
- Fix for issue #124 (HTTP 404 on map download for r2253c, r2253w and similar newer Dreame models where the Dreame backend returns an object_name with a comma suffix that the OSS storage does not resolve): the adapter now transparently retries with the object_name truncated at the first comma. Models without a comma in the object_name (e.g. r9419h/L40s) are unchanged. Diagnostic [MAP-DIAG] logging from 0.4.2 remains but only fires when the fallback also fails; new [MAP-DIAG-2] captures the retry outcome for future analysis.

### 0.4.2 (2026-08-27)
- Diagnostic release for issue #124 (HTTP 404 on r2253c/L20 Ultra map download): adds temporary [MAP-DIAG] logging on HTTP errors during fresh map downloads (model, did, object_name, download_url, HTTP status, timing, content-type, response body head) to distinguish race, region and object-name-format hypotheses. No functional changes; fallback to persistent MAP_LIST map unchanged. Diagnostic will be reverted in 0.4.3 together with the actual fix.

### 0.4.1 (2026-08-03)
- Added Schedules: schedules created in the Dreame app are now parsed into `schedule.<id>.*` states (time, weekdays, type, enabled toggle, per-room or whole-floor settings with translated room names and enum values, linked shortcut for shortcut-type schedules). See [Schedules](#schedules).
- Widget: added a Schedules panel/button showing all schedules in a table with an on/off switch each; schedules pointing at a deleted shortcut show a locked switch instead of silently failing.
- Widget: added a Shortcuts panel — one tile per app shortcut, tap to start it directly.
- Fixed app shortcuts being unavailable on vacuums (previously mower-only); shortcut channels are now rebuilt on adapter restart and cleaned up when deleted in the app.
- Widget: full German/English translation of every panel (Cleaning, Shortcuts, Schedules, Station, Maintenance, Water & Mop, Statistics, Kopf/Fehler status and error text), following the ioBroker system language.
- Widget: individual rows/tiles within a panel can now be hidden, not just whole panels (e.g. hide suction level or moisture on the Cleaning panel).
- Widget: menu width control changed from a slider (which visibly drifted under the pointer while dragging) to a number field with −/+ buttons, matching the existing UI zoom control.
- Widget: fixed a label/input association bug where clicking the "UI zoom"/"Menu width" caption activated the adjacent minus button instead of focusing the field (#104, thanks RicardoHipp).
- Widget: the cleaning-mode tile is no longer locked as soon as any room is selected — testing showed the robot does honour the globally set mode for room cleaning except for the combined vacuum+mop mode (#103, thanks RicardoHipp).
- Widget: removed the unused, never-wired-up Mopp panel placeholder; `configVersion` bumped 5→6 to clean up any leftover `panels.mopp` config entry.
- Retyped six MIoT settings from `boolean` to `number` (auto-dust-collecting, auto-lds-coverage, clean-carpets-first, silent-drying, hair-compression, mopping-with-detergent) — devices reporting a value outside 0/1 had those silently rejected before. Thanks to krobipd for the analysis.
- Fixed several `map.*` states logging "has no existing object" on first creation (missing `await` before the object was created).
- Named 13 previously raw/unnamed status datapoints (mop pad and dirty water tank consumables, firmware/MCU version, cleaning-related flags, camera light, current city, cleaning mode) after cross-checking them against another adapter on the same hardware. Thanks to krobipd.
- Decoded `status.error` (previously a raw numeric code) into readable, translated text for 98 error codes, cross-checked against two independent sources. Thanks to krobipd.
- Added a fallback so `status.state`/`status.battery-level` still populate on models whose regular status poll omits them (e.g. Aqua10 Ultra / r95475). Thanks to krobipd.
- Added `remote.go-to-point` (x/y/use-current-position/start): send the robot to a stored map coordinate to look around, without cleaning on the way. Thanks to krobipd.
- Added per-device `info.online` reachability state with one log line per online/offline transition, replacing silent timeout logging.
- Bumped `pako` (map data compression) from 2.x to 3.x.

### 0.4.0 (2026-07-31)
- Modular widget rebuild: customizable appearance (light/dark/main-color/custom themes), configurable panels, kiosk mode with URL-based configuration sharing, robot switcher for multi-device setups.

### 0.3.26 (2026-07-20)
- Fixed stream-status (siid 10001 piid 1) type warning: the value is a streaming-session object, not a number - state declaration corrected to type string / role json, matching the convention used for dnd-task, task-info and zone-status (#82). The boolean type mismatch reported by flapman on remote.auto-dust-collecting, mopping-with-detergent, hair-compression, silent-drying, auto-lds-coverage and clean-carpets-first is already covered by the boolean coercion added in 0.3.25 - please update. Thanks to krobipd for reporting the exact device payload and preparing the fix.

### 0.3.25 (2026-07-20)
- Fixed room-specific cleaning settings being written to the wrong room (cleanset used RoomOrder instead of the real room id) (#95). Fixed boolean switches being rejected by the device - values are now sent as 1/0 (#94). Fixed adapter reboot loop on devices without a generated map, e.g. MOVA Z70 (#83). Fixed multi-room cleaning only cleaning the first selected room on 5th gen devices. Fixed swapped cleaning modes (vacuum/vacuum+mop) on devices with liftable mop pads. Fixed stream-status type warning (#82). German translation: renamed dining hall segment from Speisesaal to Esszimmer. Thanks to RicardoHipp for reporting and analyzing several of these issues.

### 0.3.24 (2026-07-01)
- Fixed custom room cleaning bug where switching active-map without touching a checkbox left customCommand holding room IDs from the previously selected map, causing the robot to clean the wrong room (room segment IDs are not unique across maps). customCommand is now rebuilt automatically whenever active-map changes, and is recomputed fresh from the active map's checkboxes immediately before every start as a final safeguard. Start is now aborted with a warning if no room is selected for the active map.

## Credits

- **TA2k** — repository owner and original adapter author
- **RicardoHipp** — original map renderer this widget's map rendering is based on (MIT licensed)
- **Sefina-DS (David)** — co-maintainer, widget rebuild, live testing
- **Community** — krobipd, flapman, volvodani, and everyone else reporting issues and testing devices

## License

MIT License

Copyright (c) 2024-2026 TA2k <tombox2020@gmail.com>

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