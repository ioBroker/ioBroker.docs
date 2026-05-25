---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.mspa.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.mspa.svg
BADGE-Number of Installations: https://iobroker.live/badges/mspa-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/mspa-stable.svg
BADGE-NPM: https://nodei.co/npm/iobroker.mspa.png?downloads=true
---
<img src="admin/mspa.png" width="200" />

# ioBroker.mspa

[![NPM version](https://img.shields.io/npm/v/iobroker.mspa.svg)](https://www.npmjs.com/package/iobroker.mspa)
[![Downloads](https://img.shields.io/npm/dm/iobroker.mspa.svg)](https://www.npmjs.com/package/iobroker.mspa)
![Number of Installations](https://iobroker.live/badges/mspa-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/mspa-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.mspa.png?downloads=true)](https://nodei.co/npm/iobroker.mspa/)

**Tests:**
![Test and Release](https://github.com/arteck/ioBroker.mspa/workflows/Test%20and%20Release/badge.svg)
![CodeQL](https://github.com/arteck/ioBroker.mspa/actions/workflows/codeql.yml/badge.svg?branch=main)

---

## MSpa Adapter for ioBroker

Controls MSpa hot tubs via the MSpa Cloud API.  
Supports heating, filter, UVC, bubble and jet control with full automation via time windows, PV surplus and frost protection.

---

## Features

### Device Control
- 🌡️ Read/set water temperature & target temperature (**20–42 °C**, 0.5 °C steps) – values outside this range are rejected with a log warning
- 🔘 Turn **heater, filter, bubble, jet, ozone and UVC** on/off
- 🔗 **Auto-dependency management:**
  - Switching **heater ON** → automatically starts the filter pump first (device requirement)
  - Switching **UVC ON** → automatically starts the filter pump first (device requirement)
  - Switching **filter OFF** → automatically stops heater, UVC and bubble first (API requirement)
- 📊 Automatic **heating & cooling rate** calculation (°C/h, moving EMA average)  
  → requires `heat_state = 2 or 3` or `heater = on`, and a minimum 3-minute measurement window
- ⏱️ **ETA** as `hh:mm` until target temperature is reached (`status.heat_target_temp_reached`)  
  → calculated from `computed.heat_rate_per_hour` and the target/water temperature delta; capped at 48 h, `00:00` when not heating
- ⚡ Power failure detection with optional state restoration
- 🌍 3 server regions: **Europe (ROW)**, **USA**, **China**
- 🔒 Rate limiter (max. 2.5 requests/second)
- 🚀 Rapid polling after commands (1-second interval for 15 s) – running poll timer is cancelled immediately so ACK arrives within ~2 s

---

### Time Window Control
- ⏰ Unlimited configurable time windows (weekday selection, start/end time, overnight ranges supported)
- 📋 Per-window control of **heating** (with target temperature), **filter pump** and **UVC**
- 🔗 UVC only active when filter pump is running
- 🕐 Configurable **pump follow-up time** after window ends (pump keeps running N minutes)
- **ALL-OFF window:** set `action_filter = false` AND `action_heating = false` → the adapter **actively shuts down** heater, UVC and filter when the window starts  
  → use this to force everything off at a specific time (e.g. 22:00–06:00)
- PV windows are only activated when the **current time and weekday** match the configured window

---

### PV Surplus Control
- ☀️ Automatic activation when PV surplus exceeds configurable threshold (W)
- 🌥️ Configurable **cloud-protection delay** before deactivation (minutes)
- 📉 Hysteresis to prevent rapid on/off switching
- 📋 Independent of time window control – can be combined
- `computed.pv_active` – `true` only when a PV-enabled time window is **currently open** (correct day + time) AND surplus is above threshold  
  → automatically set to `false` when the time window ends or at night (no manual reset needed)
- `computed.pv_deactivate_remaining` – remaining minutes of the cloud-protection delay (live countdown)
- **Staged deactivation** – when surplus drops, the system shuts down in steps:
  1. **Heater OFF** (immediately) – if firmware already reached target temperature (`heat_state=4`), the API call is skipped
  2. **UVC OFF** (after configurable delay) – but only when the daily UVC minimum runtime is reached; otherwise UVC keeps running until the minimum is met
  3. **Filter OFF** (after another delay) – but only if firmware is not actively heating (`heat_state 2/3`)
- If PV surplus **recovers during staged deactivation** → all timers cancelled, previously turned-off devices re-activated

---

### Season Control
- 📅 Define a **season window** (DD.MM – DD.MM) in the adapter settings
- Season can be **toggled at runtime** via `control.season_enabled` (e.g. from VIS) – survives adapter restarts
- Outside the season: polling continues, **all automation is paused** (time windows, PV)
- When `season_enabled = false`: only **frost protection** (winter mode) is still allowed to run

---

### Winter Mode (Frost Protection)
- ❄️ Protects the hot tub from freezing when left outdoors in winter
- Activates heater + filter automatically when water temperature falls to or below the configured **frost threshold (°C)**
- Deactivates again when temperature rises **3 °C above** the threshold (hysteresis)
- Enabled/disabled via `control.winter_mode` (e.g. from VIS) – survives adapter restarts
- Frost threshold configured in the adapter settings (Admin → Time Control tab)
- Sends a Telegram notification when frost protection activates or deactivates
- Runs **independently of `season_enabled`** – frost protection works even when the season is disabled

> **`season_enabled` vs. `winter_mode` – the difference:**
>
> | `season_enabled` | `winter_mode` | Result |
> |---|---|---|
> | `true` | `false` | Time windows + PV active, no frost protection |
> | `true` | `true` | Time windows + PV + frost protection |
> | `false` | `false` | Everything paused |
> | `false` | `true` | **Only frost protection** – all other automations paused |
>
> The two flags are **independent** – `winter_mode` does NOT disable `season_enabled`.

---

### Manual Override
- 🛑 Pauses **all automations** (time windows, PV surplus, frost protection) with a single switch
- Set `control.manual_override = true` to pause – the adapter will no longer send any commands to the device
- **Optional auto-resume:** set `control.manual_override_duration` (minutes) before enabling – the adapter resumes automatically after the configured time (`0` = indefinite)
- When override is disabled, all automations are **immediately re-evaluated** with the latest device data
- `control.manual_override` is always **reset to `false`** on adapter restart
- Typical use case: control the device via the MSpa app temporarily without the adapter interfering

---

### UVC Lamp Lifetime
- 🔦 Configure installation date and rated lifetime (operating hours) in adapter settings
- **Real operating hours** are counted – only while UVC is actually switched ON
- Accumulated hours are persisted across adapter restarts
- `status.uvc_hours_used` – total accumulated UVC operating hours (**writable** – set manually to correct after data loss or lamp replacement)
- `status.uvc_today_hours` – UVC operating hours for today (resets at midnight)
- `status.uvc_hours_remaining` – remaining hours until rated lifetime is reached (updated every poll while UVC is ON)
- Warns when lifetime is exhausted

> **Manual correction of `status.uvc_hours_used`:**  
> If the value shows `0` after data loss:
> 1. Stop the adapter
> 2. Set the correct value in ioBroker Admin (e.g. `120` for 5 days × 24 h continuous run)
> 3. Start the adapter – it reads the persisted value and recalculates `uvc_hours_remaining` immediately

---

### UVC Daily Ensure
- ⏱️ Ensures UVC runs a **minimum number of hours per day** (configurable)
- If the daily minimum is not yet reached, the adapter automatically starts UVC (and the filter pump) at the configured ensure time
- `control.uvc_ensure_skip_today` – skip the daily ensure for today (e.g. when manually cleaning) → automatically resets at midnight

---

### Filter Runtime Tracking
- ⏳ `control.filter_running` – accumulated filter pump operating hours (persisted across restarts)
- `control.filter_reset` – momentary trigger: resets the filter runtime counter to `0` (e.g. after filter cartridge replacement)

---

### Consumption Tracking
- 📈 Daily kWh tracking via external energy meter datapoint
- Resets automatically at midnight
- Independent of season and time window control

---

### Notifications (Telegram)
- 📨 Send notifications via Telegram on:
  - ☀️ PV surplus activated / deactivated
  - ⏰ Time window started / ended
  - 📅 Season started / ended
  - 🔦 UVC lamp expiry warning
  - ❄️ Frost protection activated / deactivated
  - 🛑 Manual override enabled / disabled (with duration if set)
- Supports multiple recipients (comma-separated usernames)

---

## Changelog
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 0.3.7 (2026-05-12)
* (arteck) add warning as text

### 0.3.6 (2026-05-12)
* (arteck) fix daily uvc timer after adapter restart

### 0.3.5 (2026-05-12)
* (arteck) clean code
* (arteck) less notification

### 0.3.4 (2026-05-05)
* (arteck) fix manual override

### 0.3.3 (2026-04-28)
* (arteck) fix heatrate
* (arteck) fix uvc stop

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 Arthur Rupp <arteck@outlook.com>

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