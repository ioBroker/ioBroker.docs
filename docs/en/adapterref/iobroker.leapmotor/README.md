![Logo](admin/leapmotor.png)

# ioBroker.leapmotor

[![NPM version](https://img.shields.io/npm/v/iobroker.leapmotor.svg)](https://www.npmjs.com/package/iobroker.leapmotor)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Unofficial [Leapmotor](https://www.leapmotor.com/) electric vehicle integration for ioBroker. Tested on T03.

## ⚠️ Important: Use a Second Account

**Do not use your main Leapmotor account!**

The adapter maintains a permanent session with the Leapmotor cloud. If the same account is used simultaneously in the Leapmotor app, both sessions will conflict and log each other out.

**Recommended setup:**
1. Create a second Leapmotor account (e.g. with a second email address)
2. In the Leapmotor app, navigate to:
   **Personal Center → My Vehicle → [Vehicle Name] → Shared Members → Add Shared Member**
3. Enter the second account's email and grant all rights
4. Use the second account credentials in the adapter configuration

This way your main account stays logged in to the app at all times.

---

## Features

- React-based admin dashboard with Dashboard, Consumption, Trips, Datapoints, and Diagnostics tabs
- Vehicle status polling every 1–60 minutes (configurable)
- Battery SOC, range, temperature, tire pressure, GPS, doors, windows
- Remote control: climate (heat/cool/vent), lock/unlock, windows, sunshade, trunk, find
- Climate scheduling (recurring, by weekday) and charge limit / charge scheduling
- Comfort features where supported by the vehicle: sentry mode, seat heat/ventilation, steering wheel heat, speed limit, mirror heat
- Trip detection with daily kilometer tracking and individual trip history, GPS route recording (opt-in), trip merge/undo, elevation gain, min/max outdoor temperature and a regen estimate per trip
- CSV and PDF (table + summary) trip-log export for a chosen date range
- Configurable trip/GPS-route history retention (days, 0 = forever, with a hard safety cap)
- Prepare-to-Drive: auto climate (heat/cool/vent) on ignition-on, based on outdoor temperature thresholds, with lock-state and self-triggered-command guards against false positives
- Prepare-to-Work: same climate-prep core, triggered via a datapoint instead of an ignition edge (for shift-schedule/calendar automations)
- Sunshade/sunroof automation for both Prepare-to-Drive/Work, with separate positions for heat/cool/vent and a "open when dark" rule (except when heating for cold protection)
- Outdoor temperature from Open-Meteo (not the vehicle's own sensor - missing on some models, e.g. B10, and misleading when parked in a garage), 30-minute cache with fallback to the last known value on API errors
- Estimated battery health (SoH) from official per-trip cloud energy vs. SoC used, median of the last 30 trips
- Home/public charging cost split by GPS distance to a configurable home location (address search via Nominatim + map with draggable marker/radius), with separate electricity prices - home can use a dynamic price datapoint (e.g. Tibber), public is always a fixed manual price
- Charging cost estimation based on configurable electricity price
- Vehicle messages and unread count
- Vehicle-model-specific feature capability system (unsupported features are hidden automatically)
- Consumption statistics with weekly history
- Dynamic vehicle dashboard (composite HTML widget for VIS)
- Automatic token refresh
- Picture cache (downloaded once, stored locally)
- Notifications (adapter-agnostic via `sendTo`, incl. telegrammenu2 severity/area and email): trip done, charge done, OTA update, window-left-open warning, Prepare-to-Drive/Work triggered - with a test-notification button in the Settings tab

## Tested Vehicles

- Leapmotor T03 ✅ (fully tested, including all remote commands)
- Leapmotor B10 - status/data reporting extensively verified by a real owner (battery, range, mileage, speed, ignition, all doors, all windows, tire pressure, sunroof, GPS, charge plan, charge limit, AC vent direction); remote commands (lock, climate, etc.) not separately confirmed via the adapter's own buttons, but expected to work (same command subsystem as T03)
- Leapmotor C10 / C16 - should work, not yet verified

## Installation

Install via ioBroker Admin UI.

## Configuration

| Setting | Description |
|---------|-------------|
| Email | Leapmotor account email (recommend using a dedicated second account) |
| Password | Leapmotor account password |
| Vehicle PIN | 4-digit vehicle PIN – required for all remote commands |
| Cloud API Language | Affects Leapmotor cloud API text only (e.g. schedule day names) |

Everything else (polling intervals, GPS route recording, notifications,
electricity prices, home location, Prepare-to-Drive/Work, data retention) has
moved out of the native instance config into the **Settings tab** inside the
Leapmotor admin dashboard itself.

## Datapoints

```
leapmotor.0.<VIN>.status.*                → Vehicle status (read-only)
leapmotor.0.<VIN>.consumption.*           → Consumption & statistics (read-only)
leapmotor.0.<VIN>.trips.*                 → Daily kilometers and trip history (read-only)
leapmotor.0.<VIN>.charging.*              → Current charging session cost/kWh (read-only)
leapmotor.0.<VIN>.pictures.*              → Vehicle images, including an animated composite image (read-only)
leapmotor.0.<VIN>.cmd.*                   → Commands (writable)
leapmotor.0.<VIN>.info.*                  → Static vehicle info (read-only)
leapmotor.0.messages.*                    → Vehicle messages from the Leapmotor app (read-only)
leapmotor.0.config.*                      → Electricity price / battery capacity, Prepare-to-Drive/Work,
                                             home location & radius, notification targets, and
                                             trip/route history retention settings
leapmotor.0.<VIN>.battery.soh_percent     → Estimated battery health (State of Health, read-only)
```

The full set of available datapoints, including all writable command states, is best explored
directly in the ioBroker object tree, or via the **Datapoints** tab in the adapter's own admin UI
— it lists every datapoint with its current value and a short description.

### Admin Dashboard

The adapter ships its own React-based admin tab (click the adapter icon in the instance list) with
five sub-tabs: **Dashboard** (live status and remote control), **Consumption** (weekly energy use
and cost estimate), **Trips** (daily kilometers and individual detected trips), **Datapoints**
(full datapoint browser), and **Diagnostics**.

### Animated Vehicle Image for VIS

`leapmotor.0.<VIN>.pictures.composite_html` now contains a simple, embeddable animated vehicle
image (transparent background, no buttons or dashboard chrome — that has moved into the admin
tab). Add a **basic - string (unescaped)** widget in VIS, or embed it via `<iframe>`, and set the
Object ID to:
```
leapmotor.0.<VIN>.pictures.composite_html
```

### Available Commands (selection)

Simple on/off buttons under `cmd.*` (role `button`, set to `true` to trigger):

| Command | Description | PIN required | Works on |
|---------|-------------|:------------:|----------|
| cmd.ac_heat | Start heating | ✅ | All models (confirmed T03) |
| cmd.ac_cool | Start cooling | ✅ | All models (confirmed T03) |
| cmd.ac_vent | Start ventilation | ✅ | All models (confirmed T03) |
| cmd.ac_off | Stop climate | ✅ | All models (confirmed T03) |
| cmd.defrost | Windshield defrost | ✅ | All models (confirmed T03) |
| cmd.windows_open | Open windows | – | All models (confirmed T03) |
| cmd.windows_close | Close windows | – | All models (confirmed T03) |
| cmd.find | Find vehicle (horn/lights) | – | All models (confirmed T03) |
| cmd.battery_preheat | Battery preheat on | ✅ | All models (confirmed T03) |
| cmd.battery_preheat_off | Battery preheat off | ✅ | All models (confirmed T03) |
| cmd.lock | Lock vehicle | ✅ | All models (confirmed T03) |
| cmd.unlock | Unlock vehicle | ✅ | All models (confirmed T03) |
| cmd.trunk_open | Open trunk | ✅ | All models (confirmed T03) |
| cmd.trunk_close | Close trunk | ✅ | All models (confirmed T03) |
| cmd.refresh | Trigger immediate status update | – | All models (confirmed T03) |
| cmd.charge_start / charge_stop | Start/stop charging directly (not just via schedule) | ✅ | Untested - same charging subsystem as cmd.charge_limit_set (confirmed), so expected on all models |
| cmd.unlock_charger | Unlock the charging connector remotely | ✅ | Untested - same charging subsystem, expected on all models |
| cmd.healthy_charging_on / off | Toggle battery-health charging mode | ✅ | Untested - same charging subsystem, expected on all models |
| cmd.fuel_heating_on / off | Fuel heater on/off | ✅ | Untested - **REEV/range-extender trims only** (e.g. C10 EREV); not applicable on T03 (BEV) |
| cmd.destination_send | Send the address/coordinates set below to the vehicle's built-in nav | – | Untested - expected on nav-equipped models (C10/B10/B11); unclear whether T03's built-in nav accepts cloud-pushed destinations at all |
| cmd.prepare_to_work | Trigger Prepare-to-Work climate prep externally (e.g. from a shift-schedule/calendar script) | – | All models (uses same climate commands as Prepare-to-Drive) |
| cmd.trips_merge | Merge a trip with the immediately preceding one (write the trip's start time in ms) - for a real trip split by a false stop detection | – | All models |
| cmd.trips_merge_undo | Revert the last trip merge (one slot, lost on adapter restart) | – | All models |

Value-based commands:

| Command | Description | Works on |
|---------|-------------|----------|
| cmd.ac_temp | Target temperature, 16–30 °C | All models (confirmed T03) |
| cmd.ac_fan_speed | Fan speed, 1–7 | All models (confirmed T03) |
| cmd.ac_position | Air position: all / up / down / front / rear | All models (confirmed T03). On B10, the vehicle's reported direction status was independently confirmed correct via a real owner's before/after tests (2026-09) - sending this specific command wasn't separately re-tested on B10 |
| cmd.windows_set | Window position, 0–100 % | All models (confirmed T03; scale auto-adjusted per model, see WORK IN PROGRESS changelog) |
| cmd.sunshade_set / sunshade_open / sunshade_close | Sunshade position, 0–10 | Confirmed working on T03, but only after the vehicle has been woken from standby by a **physical door open** - locked/unlocked/ignition/climate/remote trunk-open alone don't wake the needed subsystem (confirmed on two separate test sessions, 2026-09-23). No remote workaround exists. B10 has an electric sunroof instead (confirmed working) |
| cmd.charge_limit_set | Charge limit, 50–100 % | All models except T03 (no effect there, confirmed) |
| cmd.charge_schedule_enable / start / end / apply | Charging schedule | All models (schedule confirmed working on T03) |
| cmd.climate_schedule_enable / mode / time / days / apply / cancel | Recurring climate schedule | All models (confirmed T03) |
| cmd.speed_limit_set | Speed limit, if supported by the vehicle | Confirmed **not** on T03; unknown on other models |
| cmd.destination_address / destination_latitude / destination_longitude | Destination to send via cmd.destination_send (fill address, or lat/lon, then trigger) | Same as cmd.destination_send above - untested, expected on nav-equipped models |

Comfort commands (only created/shown if the vehicle model supports the feature):

| Command | Description | Works on |
|---------|-------------|----------|
| cmd.sentry_mode_on / off | Sentry mode | Confirmed **not** on T03; unknown on other models |
| cmd.seat_heat_driver / copilot | Seat heating | Untested - plausible on B10, B11/C10 (trim-dependent: at least one C10 spec sheet had no heated seats standard). Confirmed **not** on T03 |
| cmd.seat_ventilation_driver / copilot | Seat ventilation | Same as seat heating |
| cmd.steering_wheel_heat_on / off | Steering wheel heating | Same as seat heating. Confirmed **not** on T03 |
| cmd.mirror_heat_on / off | Mirror heating | Untested - plausible on B10, B11/C10, B05. Confirmed **not exposed via API/app at all** on this T03 |
| cmd.hotspot_on / off | Wi-Fi hotspot | Confirmed **not** on T03 or B10; unknown on other models |

`sunroof`/`sunshade` are handled the same way — see `src-admin/src/vehicleCapabilities.js` for the confirmed B10 vs T03 difference.

Which comfort commands actually appear depends on the detected vehicle model — see
`src-admin/src/vehicleCapabilities.js` in the repository for the current capability matrix per model.

## Changelog

### **WORK IN PROGRESS**

### 0.8.3 (2026-11-12)
- (backfisch88) Fix: switching the car on while charging no longer ends the charging session early ("charging finished" message)

### 0.8.2 (2026-11-12)
- (backfisch88) Changed: connection debug lines only shown on error
- (backfisch88) Changed: admin start shows a spinner instead of "No vehicle found" while loading, remembers the last selected vehicle

### 0.8.1 (2026-11-12)
- (backfisch88) Changed: faster start of the admin page

### 0.8.0 (2026-11-12)
- (backfisch88) New: redesigned admin (light/dark follows ioBroker, hero view, quick actions, cards)
- (backfisch88) New: battery variant dropdown with net and gross capacity (`config.battery_capacity_gross_kwh`), "use measured value" button
- (backfisch88) Changed: default capacities are now usable (net) values; A10 and B05 added
- (backfisch88) New: charge-finished message with duration and custom text (`config.charge_done_text`)
- (backfisch88) New: optional charging progress notification and public-charger time-limit warning
- (backfisch88) New: fan speed up to the car's maximum (B10/B05: 9)
- (backfisch88) Fix: README - T03 charge limit has no effect, charging schedule works

### 0.7.5 (2026-10-25)
- Fix: boolean status datapoints (climate, locked, doors, ignition, Bluetooth, hotspot, window-open) were written from the raw cloud signal without converting to a real boolean

### 0.7.4 (2026-10-25)
- Fix: login failed with "Could not open account certificate" for accounts with a very large internal ID (number precision lost in JSON parsing)

### 0.7.3 (2026-10-15)
- New: optional comfort extras for Prepare-to-Drive/Work (seat heat, steering wheel heat, defrost)
- New: charging session history cross-check (Diagnostics tab)
- New: optional extended trip-done notification
- Fix: separate sunshade cold-protection threshold
- Fix: running charging session restored after restart

Older changes can be found in CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 Henrik Schönhofen (backfisch88) <henrik.schoenhofen@icloud.com>

See [LICENSE](https://github.com/backfisch88/ioBroker.leapmotor/blob/main/LICENSE) for the full license text.