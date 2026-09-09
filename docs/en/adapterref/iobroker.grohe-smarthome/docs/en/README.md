---
chapters: {"pages":{"en/adapterref/iobroker.grohe-smarthome/README.md":{"title":{"en":"ioBroker.grohe-smarthome"},"content":"en/adapterref/iobroker.grohe-smarthome/README.md"},"en/adapterref/iobroker.grohe-smarthome/docs/en/README.md":{"title":{"en":"ioBroker Grohe Smarthome Adapter"},"content":"en/adapterref/iobroker.grohe-smarthome/docs/en/README.md"}}}
---
# ioBroker Grohe Smarthome Adapter

This adapter connects ioBroker to the **Grohe Smarthome / Ondus** cloud and exposes Grohe devices as states and controls inside ioBroker.

Supported devices:

| Device | Type |
|---|---|
| **Grohe Sense** | `101` |
| **Grohe Sense Guard** | `103` |
| **Grohe Blue Home** | `104` |
| **Grohe Blue Professional** | `105` |

The adapter logs in via Grohe's OIDC/Keycloak flow, stores a **refresh token encrypted** in a state, and polls the Grohe cloud API on a configurable interval.

Ideas and concept came from the Home Assistant integration **ha-grohe_smarthome**. Special thanks to **Flo-Schilli**.

---

## Configuration

The adapter configuration is split into two tabs.

### Settings tab

| Setting | Description |
|---|---|
| **Email** | Your Grohe / Ondus account email |
| **Password** | Your Grohe / Ondus account password |
| **Poll interval (seconds)** | Polling interval – minimum **60 s**, default **300 s** |
| **Raw states** | Dumps the complete API response structure to the log for diagnostics. Polling stops after 3 cycles. Disable and restart for normal operation. |

> The adapter stores the refresh token in the state `auth.refreshToken` (encrypted), **not** in the config. Writing the config would trigger a restart and break the token flow.

### Notifications tab

Enable push notifications to be informed about device events. Messages are sent in the language configured in your ioBroker system.

#### Notification categories

| # | Category | Examples |
|---|---|---|
| 1 | **Critical alarms** | Flooding detected, sensor errors, system errors |
| 2 | **Warnings** | Battery low, temperature / humidity out of range, WiFi lost, device online / offline, Blue filter / CO₂ low |
| 3 | **Valve & control events** | Valve opened / closed, water dispense |
| 4 | **Connection errors** | HTTP polling failures (e.g. HTTP 403), sent on every failure |

#### Notification icons

| Icon | Meaning |
|---|---|
| 🚨 | Critical alarm (Grohe category 30) |
| ⚠️ | Warning (Grohe category 20), device offline, polling error |
| ✅ | Device online, polling recovered |
| 🔓 | Valve opened |
| 🔒 | Valve closed |
| 💧 | Water dispensed |
| ℹ️ | Latest notification message changed |

#### Supported providers

| Provider | Notes |
|---|---|
| **Telegram** | Instance; optionally user or chat ID |
| **Pushover** | Instance; optionally title, device |
| **WhatsApp** (`whatsapp-cmb`) | Instance; optionally phone number |
| **Email** | Instance; optionally recipient, subject |
| **Signal** (`signal-cmb`) | Instance; optionally phone number |
| **Matrix** (`matrix-org`) | Instance |
| **Synology Chat** | Instance; channel name (required) |

---

## Device Manager

The adapter integrates with the ioBroker **Device Manager**. Select a registered Grohe device to open its tile.

### Device tile

Each tile shows live status indicators and key measurements at a glance.

| Device | Status indicators | Tile values |
|---|---|---|
| **Grohe Sense** | Online, WiFi quality, Battery | Temperature, Humidity, Battery |
| **Grohe Sense Guard** | Online, WiFi quality, Valve warning | Water temperature, Flow rate, Pressure, Daily consumption, Open / close valve |
| **Grohe Blue** | Online, WiFi quality | CO₂ remaining, Filter remaining, Last measurement |

### Detail view (Info tab)

Click the tile to open the detail view. The **Info** tab shows:

- Appliance ID, device type, online status, update available, WiFi quality
- Latest notification message and timestamp
- Device-specific measurements (see per-device sections below)

### Detail view (Controls tab)

The **Controls** tab is available for Grohe Sense Guard and Grohe Blue devices. It is organized in function groups, each separated by a divider.

**Grohe Sense Guard – Controls tab:**

| Group | Controls |
|---|---|
| **Valve control** | Open valve button, Close valve button |
| **Pressure measurement** | Start button *(valve must be closed – see note below)* |
| **Snooze** | Active indicator (read-only), Duration input (1–240 min), Start snooze button, Stop snooze button |
| **Water limits** | Withdrawal amount limit input (0–2000 l) |
| **Sprinkler mode** | Start time (h + min), Stop time (h + min), Active days (Mon–Sun), Save button |

> **Note on pressure measurement:** The pipe check (Leitungscheck) is performed automatically by the device – typically overnight when no water is flowing. Pressing the start button sends the `measure_now` command, which the device will only execute when the **valve is closed** and no water is flowing. The results are always shown in the `pressureMeasurement.*` states regardless of whether the test was triggered manually or automatically.

> **Note on sprinkler settings:** Changes to individual sprinkler fields (times, day switches) are acknowledged locally but **not** sent to the API immediately. Press **Save sprinkler settings** to send all values in a single API call. This avoids triggering 7+ API calls when toggling weekdays one by one.

> **Note on withdrawal amount limit and sprinkler settings:** These values are read from the Grohe API every 10th poll cycle (~50 minutes at 300 s interval, always on first poll). Changes made in the Grohe app will be reflected in ioBroker within that window.

**Grohe Blue Home / Professional – Controls tab:**

| Group | Controls |
|---|---|
| **Dispense** | Tap type (Still / Medium / Carbonated), Amount (ml), Dispense button |
| **Service** | Reset CO₂ button, Reset filter button |

---

## ioBroker State Structure

Devices are created under the adapter namespace:

```
grohe-smarthome.0.<applianceId>.*
```

### States common to all devices

```
<applianceId>.status.online                 boolean
<applianceId>.status.updateAvailable        boolean
<applianceId>.status.wifiQuality            number (if available)

<applianceId>.notifications.latestMessage       string
<applianceId>.notifications.latestTimestamp     string (date)
<applianceId>.notifications.latestCategory      number
<applianceId>.notifications.latestCategoryName  string
<applianceId>.notifications.latestType          number
```

Grohe notification categories: `0` Advertisement · `10` Information · `20` Warning · `30` Alarm · `40` WebURL

---

## Grohe Sense (type 101)

### Measurements

```
<applianceId>.temperature           °C
<applianceId>.humidity              %
<applianceId>.battery               %
<applianceId>.lastMeasurement       date string
```

---

## Grohe Sense Guard (type 103)

### Measurements

```
<applianceId>.temperature           °C    water temperature
<applianceId>.flowRate              l/min
<applianceId>.pressure              bar
<applianceId>.lastMeasurement       date string
<applianceId>.valveOpen             boolean (indicator – read only)
```

### Consumption channel

```
<applianceId>.consumption.daily                  l
<applianceId>.consumption.averageDaily           l
<applianceId>.consumption.averageMonthly         l
<applianceId>.consumption.totalWaterConsumption  l   (calculated, see note)
<applianceId>.consumption.lastWaterConsumption   l
<applianceId>.consumption.lastMaxFlowRate        l/min
```

> **`totalWaterConsumption`:** The Grohe dashboard API does not provide a reliable total. The adapter calculates it from `/data/aggregated`: once per day the historical total (installation date → today, grouped by year) is fetched; every 5th poll the current day's consumption is added on top.

### Pressure measurement channel

Updated every 10th poll. Only present if the API provides data (may be missing initially).

```
<applianceId>.pressureMeasurement.dropOfPressure   bar
<applianceId>.pressureMeasurement.isLeakage        boolean
<applianceId>.pressureMeasurement.leakageLevel     string
<applianceId>.pressureMeasurement.startTime        date string
```

> The pipe check runs automatically (typically overnight). The `startPressureMeasurement` button can trigger it manually, but the **valve must be closed** and no water may be flowing for the device to accept and execute the command. The notification `20_333` (Pipe check completed) is sent when the test finishes.

### Controls

Controls are available in the **Controls tab** of the Device Manager detail view and as writable ioBroker states.

**Valve:**

```
<applianceId>.controls.valveOpen       boolean button – opens the valve
<applianceId>.controls.valveClose      boolean button – closes the valve
```

**Pressure measurement:**

```
<applianceId>.controls.startPressureMeasurement   boolean button
```

> Valve must be closed before triggering. The device executes the check automatically when conditions are met.

**Snooze** – temporarily silences alarms:

```
<applianceId>.controls.snooze.active     boolean (read-only) – snooze currently active
<applianceId>.controls.snooze.duration   number  1–240 min
<applianceId>.controls.snooze.start      boolean button – activates snooze for the set duration
<applianceId>.controls.snooze.stop       boolean button – deactivates snooze immediately
```

The `active` state is read from the Grohe API every 3rd poll and updated immediately after start/stop actions.

**Water limits:**

```
<applianceId>.controls.withdrawalAmountLimit   number  0–2000 l
```

Setting this value writes immediately to the Grohe API. The value is re-read from the API every 10th poll.

**Sprinkler mode** – watering/irrigation schedule:

```
<applianceId>.controls.sprinkler.startHour      number  0–23 h
<applianceId>.controls.sprinkler.startMinute    number  0–59 min
<applianceId>.controls.sprinkler.stopHour       number  0–23 h
<applianceId>.controls.sprinkler.stopMinute     number  0–59 min

<applianceId>.controls.sprinkler.activeMonday     boolean switch
<applianceId>.controls.sprinkler.activeTuesday    boolean switch
<applianceId>.controls.sprinkler.activeWednesday  boolean switch
<applianceId>.controls.sprinkler.activeThursday   boolean switch
<applianceId>.controls.sprinkler.activeFriday     boolean switch
<applianceId>.controls.sprinkler.activeSaturday   boolean switch
<applianceId>.controls.sprinkler.activeSunday     boolean switch

<applianceId>.controls.sprinkler.save   boolean button – sends all sprinkler values to the API
```

> Start and stop times are stored as separate hour (0–23) and minute (0–59) states. The adapter combines them into minutes-from-midnight internally when sending to the API. Changes to individual fields are acknowledged locally but **not** sent to the API until **Save** is pressed.

The sprinkler schedule is re-read from the Grohe API every 10th poll.

---

## Grohe Blue Home / Professional (type 104 / 105)

### Measurements

```
<applianceId>.remainingCo2              %
<applianceId>.remainingFilter           %
<applianceId>.remainingFilterApp        %
<applianceId>.remainingCo2Liters        l
<applianceId>.remainingFilterLiters     l

<applianceId>.cyclesCarbonated
<applianceId>.cyclesStill

<applianceId>.operatingTime             min
<applianceId>.pumpRunningTime           min
<applianceId>.maxIdleTime               min
<applianceId>.timeSinceRestart          min

<applianceId>.waterRunningCarbonated    min
<applianceId>.waterRunningMedium        min
<applianceId>.waterRunningStill         min

<applianceId>.dateCleaning              date string
<applianceId>.dateCo2Replacement        date string
<applianceId>.dateFilterReplacement     date string
<applianceId>.lastMeasurement           date string

<applianceId>.cleaningCount
<applianceId>.filterChangeCount
<applianceId>.powerCutCount
<applianceId>.pumpCount
```

> **Measurement freshness:** Grohe Blue devices do **not** push measurements automatically. The adapter sends a `get_current_measurement` command every 3rd poll cycle. A background verify loop then re-polls `/details` every 10 s (up to 3 attempts / 30 s total) until a fresh timestamp appears. After adapter start it may take 1–2 poll cycles before current values are shown.

> **`remainingFilter` vs. `remainingFilterApp`:** The Grohe app does not show the raw, consumption-based API value (`remainingFilter`) for the filter. It additionally caps it based on a fixed 360-day lifetime since the last filter change (`dateFilterReplacement`), so users are prompted to replace the filter after roughly a year regardless of actual usage. `remainingFilterApp` mirrors this behavior (minimum of the consumption-based and time-based value) and matches what the Grohe app displays.

### Controls

```
<applianceId>.controls.tapType        number  1 = still · 2 = medium · 3 = carbonated
<applianceId>.controls.tapAmount      number  ml, 50–2000 in steps of 50
<applianceId>.controls.dispenseTrigger  boolean button

<applianceId>.controls.resetCo2       boolean button
<applianceId>.controls.resetFilter    boolean button
```

Setting `dispenseTrigger` to `true` reads `tapType` and `tapAmount`, executes the dispense, then resets all three states back to `false` / `0`.

---

## Polling Strategy

To minimize API calls and avoid rate-limiting (HTTP 403), different endpoints are polled at different frequencies:

| Endpoint | Frequency | Devices | Notes |
|---|---|---|---|
| `/dashboard` | every poll | All | Core sensor data |
| `/status` | every 5th poll | All | Online / WiFi / update status changes slowly |
| `/command` (read) | every 3rd poll | Sense Guard | Valve state; also read back immediately after commands |
| `/snooze` (read) | every 3rd poll | Sense Guard | Snooze status; HTTP 404 = no active snooze |
| `/command` (`get_current_measurement`) | every 3rd poll | Blue | Triggers fresh measurement on device |
| `/details` (verify) | up to 3× after refresh | Blue | Background poll for fresh data (10 s intervals, max 30 s) |
| `/details` (config) | every 10th poll | Sense Guard | Sprinkler schedule, withdrawal limit; always on first poll |
| `/data/aggregated` (today) | every 5th poll | Sense Guard | Today's consumption for `totalWaterConsumption` |
| `/data/aggregated` (historical) | once per day | Sense Guard | Historical base for `totalWaterConsumption` |
| `/pressuremeasurement` | every 10th poll | Sense Guard | Only changes after a pipe check |

> **Tip:** If HTTP 403 errors occur, increase the poll interval. The Grohe cloud API has rate limits.

### Exponential backoff

On polling errors the adapter automatically increases the interval:

1. Each consecutive failure **doubles** the interval (300 → 600 → 1200 → 2400 → 3600 s).
2. Maximum: **1 hour**.
3. After reaching 1 hour: pauses until **12:00** noon, or if already past noon until **00:00** midnight.
4. After a **successful** poll the interval resets to the configured value.

---

## Authentication

On startup:

1. The saved refresh token is read from `auth.refreshToken`.
2. If available, the adapter refreshes tokens automatically.
3. If refresh fails or no token exists, a full login is performed with email / password.
4. The new refresh token is stored **encrypted** (`enc:<...>`) in `auth.refreshToken`.

Unencrypted tokens from older versions are migrated automatically to encrypted storage.

On **HTTP 401**, the request is retried once after a token refresh.

---

## Fallback Discovery

If `/dashboard` returns HTTP 404 (some older accounts), the adapter switches to fallback discovery:

1. Extracts the user ID from the JWT access token.
2. Calls `/users/{userId}` to get locations.
3. Fetches `/rooms` → `/appliances` + `/details` + `/notifications` per device.

Fallback mode is detected once on startup and maintained for the lifetime of the instance.

---

## Error Handling

| Situation | Behaviour |
|---|---|
| Polling failure | `info.connection` → `false`; exponential backoff |
| HTTP 401 | Token refreshed, request retried once |
| HTTP 403 | Warning logged; suggests checking Grohe account / app |
| HTTP 404 on `/pressuremeasurement` | Debug log only (no measurement data yet is normal) |
| HTTP 404 on `/dashboard` | Switches to fallback discovery |

---

## Module Overview

| File | Purpose |
|---|---|
| `main.js` | Adapter core: polling, state management, command handling, Device Manager messages |
| `lib/device-manager.js` | Device Manager integration: tiles, info/controls tabs, per-device templates |
| `lib/groheClient.js` | Grohe API client: authenticated requests, auto-refresh on 401 |
| `lib/auth.js` | OAuth / Keycloak login and token refresh |
| `lib/notificationManager.js` | Dispatches push notifications to configured providers |
| `lib/notificationMessages.js` | Localized message templates and Grohe notification type texts (11 languages) |
| `lib/apiDump.js` | Full API structure dump for diagnostics (triggered by Raw states option) |