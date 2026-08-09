![Logo](admin/leapmotor.png)

# ioBroker.leapmotor

[![Version](https://img.shields.io/badge/version-0.6.0-blue.svg)](https://github.com/backfisch88/ioBroker.leapmotor)
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
- Trip detection with daily kilometer tracking and individual trip history
- Charging cost estimation based on configurable electricity price
- Vehicle messages and unread count
- Vehicle-model-specific feature capability system (unsupported features are hidden automatically)
- Consumption statistics with weekly history
- Dynamic vehicle dashboard (composite HTML widget for VIS)
- Automatic token refresh
- Picture cache (downloaded once, stored locally)

## Tested Vehicles

- Leapmotor T03 ✅ (fully tested)
- Leapmotor B10 / C10 / C16 – should work, comfort feature availability not yet verified

## Installation

Install via ioBroker Admin UI.

## Configuration

| Setting | Description |
|---------|-------------|
| Email | Leapmotor account email (recommend using a dedicated second account) |
| Password | Leapmotor account password |
| Vehicle PIN | 4-digit vehicle PIN – required for all remote commands |
| Polling interval | Status update interval in minutes (default: 5) |

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
leapmotor.0.config.*                      → Electricity price / battery capacity used for cost estimation
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

| Command | Description | PIN required |
|---------|-------------|:------------:|
| cmd.ac_heat | Start heating | ✅ |
| cmd.ac_cool | Start cooling | ✅ |
| cmd.ac_vent | Start ventilation | ✅ |
| cmd.ac_off | Stop climate | ✅ |
| cmd.defrost | Windshield defrost | ✅ |
| cmd.windows_open | Open windows | – |
| cmd.windows_close | Close windows | – |
| cmd.find | Find vehicle (horn/lights) | – |
| cmd.battery_preheat | Battery preheat on | ✅ |
| cmd.battery_preheat_off | Battery preheat off | ✅ |
| cmd.lock | Lock vehicle | ✅ |
| cmd.unlock | Unlock vehicle | ✅ |
| cmd.trunk_open | Open trunk | ✅ |
| cmd.trunk_close | Close trunk | ✅ |
| cmd.refresh | Trigger immediate status update | – |

Value-based commands:

| Command | Description |
|---------|-------------|
| cmd.ac_temp | Target temperature, 16–30 °C |
| cmd.ac_fan_speed | Fan speed, 1–7 |
| cmd.ac_position | Air position: all / up / down / front / rear |
| cmd.windows_set | Window position, 0–100 % |
| cmd.sunshade_set / sunshade_open / sunshade_close | Sunshade position (T03), 0–10 |
| cmd.charge_limit_set | Charge limit, 50–100 % |
| cmd.charge_schedule_enable / start / end / apply | Charging schedule |
| cmd.climate_schedule_enable / mode / time / days / apply / cancel | Recurring climate schedule |
| cmd.speed_limit_set | Speed limit, if supported by the vehicle |

Comfort commands (only created/shown if the vehicle model supports the feature):

| Command | Description |
|---------|-------------|
| cmd.sentry_mode_on / off | Sentry mode |
| cmd.seat_heat_driver / copilot | Seat heating |
| cmd.seat_ventilation_driver / copilot | Seat ventilation |
| cmd.steering_wheel_heat_on / off | Steering wheel heating |
| cmd.mirror_heat_on / off | Mirror heating |
| cmd.hotspot_on / off | Wi-Fi hotspot (no effect on T03) |

Which comfort commands actually appear depends on the detected vehicle model — see
`admin-tab/src/vehicleCapabilities.js` in the repository for the current capability matrix per model.

## Changelog

### **WORK IN PROGRESS**
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.6.2 (2026-07-08)
- Fix: B10 model now correctly uses the c10 cloud status endpoint (community-confirmed), resolving empty status/trips/charging datapoints
- Fix: enabled full i18n for jsonConfig.json now that admin/i18n translation files cover all keys

### 0.6.1 (2026-07-03)
- Fix: repository checker findings - node: prefix for built-in modules, removed raw setTimeout fallback, included admin-tab i18n source in npm package, trimmed news list to 7 entries

### 0.6.0 (2026-07-03)
- Refactor: moved to standard plain-JS repository layout (main.js at repository root, supporting modules under lib/ instead of build/)
- Fix: removed dead/duplicate code, added VIN sanitization for object IDs, subscribed and acknowledged config.* states
- Fix: enforced upper bound on polling interval in code, switched picture cache from package-directory file to adapter's own file storage
- Fix: translated remaining German backend strings to English, enabled compact mode support, adapter-managed timers used throughout

### 0.5.8 (2026-07-02)
- Fix: repository checker compliance - added missing intermediate object structure (charging/consumption/pictures/trips channels), corrected invalid state roles, added real integration test

### 0.5.7 (2026-06-29)
- Fix: avoid npm transparency log conflict from a previous failed publish attempt (no functional changes vs. 0.5.5)

Older changes can be found in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 Henrik Schönhofen (backfisch88)
