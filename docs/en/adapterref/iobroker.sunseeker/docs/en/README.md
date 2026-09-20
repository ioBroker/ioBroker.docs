---
chapters: {"pages":{"en/adapterref/iobroker.sunseeker/README.md":{"title":{"en":"ioBroker.sunseeker"},"content":"en/adapterref/iobroker.sunseeker/README.md"},"en/adapterref/iobroker.sunseeker/docs/en/README.md":{"title":{"en":"ioBroker.sunseeker"},"content":"en/adapterref/iobroker.sunseeker/docs/en/README.md"}}}
---
![Logo](../../admin/sunseeker.png)

# ioBroker.sunseeker

[Back to README](/#/adapters/sunseeker)

## Configuration

The adapter settings expose the following fields:

| Field             | Description                                                  |
| ----------------- | ------------------------------------------------------------ |
| Username / e-mail | Sunseeker app login                                          |
| Password          | Sunseeker app password (stored encrypted)                    |
| Region            | `EU` or `US` (only relevant for the `New` API)               |
| API               | `New` for current models (S/X/V/V1), `Old` for older devices |
| Polling interval  | REST poll interval in seconds (minimum 30)                   |
| Language          | UI and event-code language, e.g. `de-DE`, `en-EN`            |

Which API to pick depends on the model:

- `New`: all S, X, V and V1 series mowers (server `wirefree-specific.sk-robot.com` / `wirefree-specific-us.sk-robot.com`)
- `Old`: older devices without Wirefree branding (server `server.sk-robot.com`)

## Features

- REST login (OAuth2 password grant) with automatic token refresh on a single `setInterval`.
- Per-account device list and status/settings polling at the configured interval.
- MQTT push:
    - `New` API: TLS MQTT (port 1884 for SXV, 32884 for V1) with an RSA-encrypted password. After connect the adapter triggers `getDevAllProperties`, `getSelectRegionID`, `getAllPath`, `getConsumableItems` and `getFcState` via `get_property` POST so the full state is available immediately.
    - `Old` API: plain MQTT on `mqtts.sk-robot.com:1883` with the hard-coded app user.
- Model classification into `S`, `X`, `V` (incl. V18/V3) and `V1`. Endpoints and parameters (`cmdurl`, border mode, set-property path) are picked automatically.
- Translated event codes: 12 language variants from the Home Assistant lang files are bundled in `lib/eventcodes.json` and attached as `common.states` to `event_code` and `errortype` (model-aware) so the ioBroker UI shows readable labels.

## Object tree

For each mower (serial `<sn>`) the adapter creates these channels:

- `<sn>.mower_raw` — mower status (poll **and** MQTT push write into the same folder)
- `<sn>.settings` — device settings
- `<sn>.remote` — command buttons
- `<sn>.schedule` — weekly plan (writable, see below)
- `<sn>.events` — Mowing event log as json and manuel update button
- `<sn>.map` — map data (only for S/X models, when available):
    - `info` — raw response of `/wireless_map/wireless_device/get` (sizes, magnification, `mapModifyTime`, …)
    - `zones` — Zones information
        - `change_active_map_name`
        - `delete_active_map_select`
        - `delete_active_map`
        - `save_active_map`
        - `merge_zone`
            - `xx.start_mowing_selected_area`
            - `xx.name`
            - `xx.split_zones`
    - `image` — heatmap (PNG data URL; often empty if the cloud has not rendered one)
    - `wifi` — WiFi signal heatmap (PNG data URL)
    - `net` — 4G signal heatmap (PNG data URL)
    - `texture` — raw texture map of the work area (WebP data URL)
    - `mapData` — map geometry as raw JSON string (zones, polygons — same source HA uses to render its livemap)
    - `pathData` — recorded mowing path as raw JSON string
    - `backup` — backup map JSON (from `/wireless_map/backup_map/get`)
    - `livemap` — adapter-rendered PNG data URL (zones, obstacles, recorded path, charger position; rendered with `pureimage`)
    - `livemap_update` - livemap enable/disable (enable = +80 MB RAM)
    - `map_settings` - Livemap settings
        - `region_channel_fill` -
        - `region_channel_stroke` -
        - `region_channel_lineWidth` -
        - `region_work_fill` -
        - `region_work_stroke` -
        - `region_work_lineWidth` -
        - `region_forbidden_fill` -
        - `region_forbidden_stroke` -
        - `region_forbidden_lineWidth` -
        - `region_placed_blank_fill` -
        - `region_placed_blank_stroke` -
        - `region_placed_blank_lineWidth` -
        - `region_obstacle_fill` -
        - `region_obstacle_stroke` -
        - `region_obstacle_lineWidth` -
        - `divide_area_work_stroke` -
        - `divide_area_work_lineWidth` -
        - `polyline_color` -
        - `polyline_lineWidth` -
        - `robot_path` -
        - `charger_path` -
        - `robot_charger_scale` -
    - `maps` - All Backup Maps
        - `mapName` — Change Map Name
        - `useThisMap` — Restore Map
        - `delete_select` — Selete to delete backup map
        - `delete` — Delete Backup Map

Raw payloads (REST and MQTT) are written through `json2iob` directly — no parallel adapter-side data model is maintained.

## Commands (`<sn>.remote.*`)

| State               | Effect                                          |
| ------------------- | ----------------------------------------------- |
| `start`             | Start mowing                                    |
| `pause`             | Pause                                           |
| `dock`              | Return to charging station                      |
| `stop_find_charger` | Cancel return-to-dock                           |
| `border`            | Border cut (V models: mode 5 with `value:true`) |
| `stop`              | Stop                                            |
| `stop_task`         | Cancel current task                             |
| `restart`           | Restart task                                    |
| `refresh`           | Reload status now                               |
| `refresh_property`  | Reload properties now                           |

## Writable settings

These settings are made writable directly under `<sn>.settings.*`. Writing them sends a `set_property` / `setProperty` (model-dependent) request to the cloud:

| State                          | Range                                                          | Unit | Notes         |
| ------------------------------ | -------------------------------------------------------------- | ---- | ------------- |
| `bladeSpeed`                   | 2800 – 3000 (step 100)                                         | rpm  | New API only  |
| `bladeHeight`                  | 20 – 100 (step 5)                                              | mm   | New API only  |
| `rainFlag`                     | boolean                                                        | —    | Old + New API |
| `rainDelayDuration`            | 0 – 720 (step 1)                                               | min  | Old + New API |
| `night_work`                   | boolean                                                        | —    | New API only  |
| `recharge_mode`                | 0 = direct path<br>1 = smart<br>2 = along edge                 | —    | New API only  |
| `work_touch_mode`              | 0 = no touch<br>1 = slow touch                                 | —    | New API only  |
| `auto_ride_edge_map_m`         | 0 = not enabled<br>1 = enabled                                 | —    | New API only  |
| `dis_along_border`             | 0 = close<br>1 = far                                           | —    | New API only  |
| `first_along_border`           | boolean                                                        | —    | New API only  |
| `follow_border_freq`           | 1 = everytime<br>2 = every second time<br>3 = every third time | —    | New API only  |
| `plan_mode`                    | 0 = default<br>1 = traceless<br>4 = multi-angle                | —    | New API only  |
| `gap`                          | 1 = narrow<br>2 = standard<br>3 = wide                         | —    | New API only  |
| `workSpeed`                    | 1 = slow<br>2 = standard<br>3 = fast                           | —    | New API only  |
| `ai_sensitivity`               | 0 = low<br>1 = high                                            | —    | New API only  |
| `dev_name`                     | Change device name                                             | —    | New API only  |
| `energy_saving_mode`           | boolean                                                        | —    | New API only  |
| `pin_old`                      | Change Pin Code -> Old Pin                                     | —    | New API only  |
| `pin_new`                      | New Pin (Set the old PIN first)                                | —    | New API only  |
| `firmware_current`             | available Firmware (readonly)                                  | —    | Old + New API |
| `firmware_description`         | Description current or new FW (readonly)                       | —    | Old + New API |
| `firmware_update_available`    | Available FW (Automatic check every 24 hours - readonly)       | —    | Old + New API |
| `firmware_update_start`        | Start upgrade when available                                   | —    | Old + New API |
| `firmware_update_check_manual` | Manual check                                                   | —    | Old + New API |
| `custom_flag`                  | Set custom flag                                                | —    | New API only  |
| `auto_upgrade`                 |                                                                | —    | New API only  |
| `reset_bladeplate`             |                                                                | —    | New API only  |
| `reset_blade`                  |                                                                | —    | New API only  |
| `reset_smal_bladeplate`        |                                                                | —    | New API only  |
| `reset_smal_blade`             |                                                                | —    | New API only  |

When writing blade values, the adapter posts `{ id: "setDevBlade", key: "blade", method: "set_property", speed|height: <int> }`. After 1.5 s a status refresh is scheduled; MQTT push usually updates the values as well.

Writing `rainFlag` or `rainDelayDuration` always sends both values to the cloud (the missing one is read from the current state). The endpoint depends on the model:

- `Old`: `POST /app_mower/device/setRain/{sn}/{appId}` with `rainFlag` + `rainDelayDuration`.
- `New` V1: `POST {cmdurl}setProperty` with `method: "setRain"`, `rainFlag`, `rainDelayDuration`.
- `New` S/X/V: `POST {cmdurl}set_property` with `id: "setDevRain"`, `key: "rain"`, `rain_flag`, `delay`.

## Schedule (`<sn>.schedule.*`)

A simple weekly plan with one window per day. The states are writable but the cloud is only updated when `set` is triggered.

| State                       | Type                                                           | Format                                                               |
| --------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------- |
| `1_monday_1` … `0_sunday_1` | string                                                         | `"HH:MM-HH:MM"` for the active window, empty string disables the day |
| `1_monday_2` … `0_sunday_2` | string                                                         | `"HH:MM-HH:MM"` for the active window, empty string disables the day |
| `pauseSchedule`             | boolean                                                        | Pause the schedule without clearing the windows                      |
| `setSchedule`               | button                                                         | Sends the current values to the cloud                                |
| `getSchedule`               | button                                                         | Load current schedule                                                |
| `schedule_time_work_repeat` | button                                                         | Mowing cycle with schedule                                           |
| `schedule_mode`             | 0 = no schedule</br>1 = recomended</br>1 = custom (X & S only) | Sends the current values to the cloud                                |
| `schedule_time_zone`        | number                                                         | Timezone                                                             |

The dispatched payload depends on the model:

- `Old` API: `POST /app_mower/device-schedule/setScheduling` with `deviceScheduleBOS` for all 7 days; `autoFlag` is the inverse of `pause`.
- `New` V1: `POST {cmdurl}setProperty` with `method: "setSchedule"` and `deviceScheduleBOS` containing only the active days.
- `New` S/X/V: `POST {cmdurl}set_property` with `id: "setTimeTactics"`, `key: "time_tactics"` and a `time` array (one entry per active day, day index Mon=1…Sat=6, Sun=0; start/end as seconds since midnight).

## Known limitations

The Sunseeker API exposes far more fields than the adapter currently writes. All settings are available read-only as raw data under `<sn>.settings`. The following are **not yet** exposed as writable states:

- Zone settings (per-zone blade speed/height, ordering)
- OTA update
- Work records / mowing history
- V1-specific settings: return path, screen lock, border distance, schedule on/off
- Gen2 settings: auto_ride_edge, energy_save, night_work
- AI sensitivity, PIN code, map operations