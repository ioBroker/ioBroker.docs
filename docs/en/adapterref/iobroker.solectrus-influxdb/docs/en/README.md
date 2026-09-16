---
chapters: {"pages":{"en/adapterref/iobroker.solectrus-influxdb/README.md":{"title":{"en":"ioBroker.solectrus-influxdb"},"content":"en/adapterref/iobroker.solectrus-influxdb/README.md"},"en/adapterref/iobroker.solectrus-influxdb/docs/en/README.md":{"title":{"en":"SOLECTRUS InfluxDB Adapter -- Documentation"},"content":"en/adapterref/iobroker.solectrus-influxdb/docs/en/README.md"}}}
---
# SOLECTRUS InfluxDB Adapter -- Documentation

## Table of Contents

1. [InfluxDB Configuration](#1-influxdb-configuration)
2. [Sensors](#2-sensors)
3. [Sensors Overview Tab](#3-sensors-overview-tab)
4. [Forecast Sources](#4-forecast-sources)
5. [How-To: pvForecast with pvnode](#5-how-to-pvforecast-with-pvnode)
6. [Data-SOLECTRUS Formula Engine](#6-data-solectrus-formula-engine)
7. [Item Modes](#7-item-modes)
8. [Formula Builder](#8-formula-builder)
9. [State Machine Mode](#9-state-machine-mode)
10. [Data Runtime Settings](#10-data-runtime-settings)
11. [Monitoring & Buffer](#11-monitoring--buffer)
12. [Using Computed Values as Sensor Sources](#12-using-computed-values-as-sensor-sources)
13. [Debugging](#13-debugging)
14. [Notifications](#14-notifications)
15. [Backup](#15-backup)

---

## 1. InfluxDB Configuration

Open the adapter settings and go to the **InfluxDB** tab.

| Field | Description |
|-------|-------------|
| URL | InfluxDB 2.x server address (e.g. `http://192.168.1.10:8086`) |
| Organization | Your InfluxDB organization |
| Bucket | Target bucket for time-series data |
| Token | API token with **write** permissions |
| Polling Interval (s) | How often sensor values are collected (5-30 seconds) |

The adapter verifies the connection at startup by writing a test point. The connection state is shown in `info.connection`.

At the bottom of this tab you will find:

- A checkbox to enable the **Data-SOLECTRUS** formula engine (see section 5)
- A checkbox to enable **Expert Mode** (see section 2 -- Sensors)

---

## 2. Sensors

Go to the **Sensors** tab. The master/detail editor shows all configured sensors with their live status and optional grouping.

### Standard Mode vs. Expert Mode

By default, the adapter runs in **Standard Mode**. The sensor list shows all preconfigured sensors (INVERTER_POWER, BATTERY_SOC, HOUSE_POWER, forecast sensors, etc.). In standard mode:

- The sensor list can be collapsed by **folder/group**. All preconfigured SOLECTRUS sensors start in the **Default SOLECTRUS sensors** group. Existing sensors from older configurations that do not match the default sensor set are automatically assigned to the **Custom sensors** group.
- **Editable**: Source State (ioBroker state), Enabled checkbox
- **Read-only**: Sensor Name, Datatype, Measurement, Field, JSON Preset
- **Hidden**: Add, Delete, Duplicate buttons, Internal checkbox, Folder/Group, Unit, Max Value, Alive Timeout

This ensures that beginners can simply enable sensors and assign source states without accidentally changing the InfluxDB mapping. In standard mode, the following defaults apply: **value monitoring disabled** (max value = 0) and **60 minutes** alive timeout. Precise configuration is available in Expert Mode.

To unlock full control, enable **Expert Mode** on the InfluxDB settings page. In expert mode:

- All fields are editable
- Sensors can be added, deleted, duplicated, and reordered
- Newly created sensors start in the **Custom sensors** group and can be regrouped there or saved without a group if needed
- JSON presets can be changed to custom mode

### Sensor settings

The table below shows all configurable fields per sensor. In **Expert Mode**, all fields are editable and sensors can be added, deleted, and reordered.

Click **Add** (Expert Mode) or select an existing sensor to configure:

| Setting | Description | Mode |
|---------|-------------|------|
| Enabled | Activate/deactivate the sensor | Standard + Expert |
| Internal | Mirrors the current value and keeps monitoring active, but skips writes to InfluxDB. Default: `false`. | Expert |
| ioBroker Source State | The source state to read values from. Use the **Select** button to browse the object tree. | Standard + Expert |
| Folder/Group | Optional group name for the sensor list on the left. Empty value = **Ungrouped**. All default sensors start in **Default SOLECTRUS sensors**. Legacy non-default sensors and newly created expert-mode sensors start in **Custom sensors**. | Expert |
| Sensor Name | Display name (also used for the ioBroker state ID under `sensors.*`) | Expert |
| Unit | Physical unit of the sensor value (e.g. `W`, `°C`, `%`, `A`). Auto-detected from the ioBroker state's `common.unit` when a source state is selected. Defaults to `W` if no unit is configured. Can be overridden manually in Expert Mode. | Expert |
| Max Value | Per-sensor plausibility limit. If exceeded, the last valid value is sent instead and a warning is logged. **0 = disabled** (default). | Expert |
| Alive Timeout (min, 0 = disabled) | When no new value is received within this timespan: if the current value is **non-zero**, a warning is logged and the timestamp turns **orange** in the overview tab; if the current value is **0**, an info message is logged instead and the next check runs after **60 minutes**. **0 = disabled**. Default: `60`. Must be greater than the update interval of the source adapter. | Expert |
| Datatype | `int`, `float`, `bool`, `string`, or `json` (JSON Array) | Expert |
| Influx Measurement | The InfluxDB measurement name (e.g. `inverter`) | Expert |
| Influx Field | The InfluxDB field name (e.g. `power`) | Expert |

At least one sensor must be enabled for data to be written.

### Status icons in the sensor list

- `⚪` = sensor is disabled
- `🟡` = sensor is enabled but **internal** (monitoring yes, Influx write no)
- `🟢` = sensor is enabled and sent to InfluxDB

### JSON Sensors (Forecast Data)

For forecast/weather data, set the datatype to **JSON Array**. Two preset modes are available:

| Mode | Description |
|------|-------------|
| **Automatic** | Auto-detects known fields in the JSON data (`y`, `clearsky`, `temp`) and writes each to the correct InfluxDB measurement/field. One sensor handles all detected forecast types. |
| **Custom** | Manually define the JSON timestamp field, value field, and InfluxDB type. Use this for non-standard JSON sources. |

**Auto-detection mapping:**

| JSON Field | InfluxDB Measurement | InfluxDB Field | Type |
|------------|---------------------|----------------|------|
| `y` | `inverter_forecast` | `power` | int |
| `clearsky` | `inverter_forecast_clearsky` | `power` | int |
| `temp` | `outdoor_forecast` | `temperature` | float |

Fields not present in the JSON are automatically skipped.

### How sensors work

1. The adapter subscribes to each sensor's source state
2. Values are mirrored under `solectrus-influxdb.X.sensors.*`
3. On each polling interval, current values are added to the write buffer (**Collect**)
4. Immediately after collect, the buffer is flushed to InfluxDB (**Flush**)

Sensors marked as **Internal** are still mirrored under `solectrus-influxdb.X.sensors.*` and remain part of alive/max monitoring, but they are excluded from InfluxDB writes.

### Collect & Flush Architecture

Collect and flush run near-simultaneously without blocking each other:

1. **Collect** gathers all sensor values and writes them into the buffer
2. **Immediate flush** -- after collect, the flush is triggered on the next event-loop tick (no additional wait interval)
3. **Snapshot-and-swap** -- when the flush starts, the current buffer is taken as a batch and replaced with a new empty array. While the flush awaits the InfluxDB response, a concurrent collect already writes into the new (empty) buffer. The batch is never modified during the flush.
4. **Failure recovery** -- if the flush fails, the batch is prepended back to the current buffer in chronological order. No values are lost.
5. **Overlap guard** -- an `isFlushing` flag prevents multiple flush operations from running concurrently

### NaN protection

Invalid values (`NaN` for int/float, `null`/`undefined` for strings) are automatically skipped with a log warning.

### Negative values

SOLECTRUS does not accept negative values. If a sensor delivers a negative value after adapter start, a warning is logged **once**. The values are still sent to InfluxDB but may cause incorrect evaluations there. To fix this, check your source states or use the Data-SOLECTRUS formula engine with the **Clamp negative to 0** option.

### Unit auto-detection

When a source state is selected in the Admin UI (via the **Select** dialog or by typing the state ID and leaving the field), the Admin UI reads the `common.unit` property of the ioBroker object and fills in the **Unit** field. If the state has no unit defined, the field is left empty and `W` is used as the display default in the overview tab. The unit can always be changed manually in **Expert Mode**.

### Maximum value validation

Each numeric sensor (`int`, `float`, or default type) supports a **Max Value** field (configurable in Expert Mode). If a collected value exceeds this limit:

1. A warning is logged: `Sensor "..." delivers implausible value (X > max Y). Using last valid value (Z) instead.`
2. The **last valid value** (the most recent value at or below the limit) is sent to InfluxDB instead.
3. If no valid value has been seen yet for that sensor, the data point is skipped entirely.

This prevents temporary sensor spikes (e.g. a brief burst reading of 99999 W) from corrupting the time-series data.

The default value is **0 (disabled)** — value monitoring is off for new sensors by default. In Expert Mode, an individual limit can be set per sensor (e.g. `15000` or `5000` for a secondary inverter). When the max value is set to `0`, value monitoring is disabled for that sensor.

### Field type conflicts

If InfluxDB reports a field type conflict (e.g. writing a float to an existing int field), the affected sensor is automatically disabled and the buffer is cleared.

---

## 3. Sensors Overview Tab

The **SOLECTRUS Overview** tab (accessible via the tab bar in the adapter section) provides a real-time at-a-glance view of all configured and active sensors and data items.

![Sensor overview example](../img/sensor-overview.svg)

### Features

- **Color legend** (toolbar, top right next to the title): shows the meaning of the card colors at a glance — **green** = active sensor, **yellow** = internal sensor, **orange** = alive timeout exceeded, **red** = max value exceeded.
- The tab bar button is labeled generically **Sensors**; the content below it is split into two sections, each with its own heading: **InfluxDB Sensors** (blue diamond icon, sensors actually written to InfluxDB) and **Internal Sensors** (🔒, only shown when at least one exists).
- **InfluxDB Sensors grid**: Shows all enabled sensors that are actually written to InfluxDB, as compact cards in a responsive grid. Each card shows:
  - **Sensor name** and **data type badge** (`int`, `float`, `bool`, `string`, `json`)
  - **Value row** (numeric sensors only): left-aligned **current value with unit** (e.g. `2697 W`); right-aligned **max value badge** — only shown when max value > 0 (value monitoring active). Shows *n/a* if no value has been received yet. JSON values are rendered compactly in a monospace font. Once the configured alive timeout is exceeded, the current value turns **orange**; if the max value is also exceeded, **red** takes precedence over orange.
  - **Measurement: field** — the target location in InfluxDB (separated by a colon)
  - **Source state** — the ioBroker state ID being read (truncated, full path shown on hover)
  - **Timestamp row** (shown when alive timeout is configured): left-aligned **timestamp** (date and time when the sensor last received a new value); right-aligned **next expected update** as a badge (time only, no label, auto-computed as timestamp + timeout interval — no manual input needed). When the current value is 0 the 60-minute fallback interval is used for the next-update calculation. The row is shown in **orange** when the alive timeout has been exceeded.
- **Internal Sensors grid** (only shown when at least one sensor has the **Internal** option enabled): a separate section below the InfluxDB Sensors grid, using the same card layout but with a **yellow left border** and **yellow current value**. Since these sensors are not written to InfluxDB, they are clearly separated from the regular (green) sensors here.
- **Formula Engine grid** (only shown when Data-SOLECTRUS is enabled): Shows all active computed items in the same card layout, with mode badge, current value, state ID, and formula/expression. Font sizes remain constant in all device orientations. Numeric values show a **unit** (e.g. `2697 W`) — the unit configured on the item, defaulting to `W` if none is set; boolean and string results are shown without a unit. Since Data-SOLECTRUS items are never written to InfluxDB directly (only sensors are), these cards are always styled like **internal sensors**, with a **yellow border** and **yellow value**.
- **JSON Array preview**: For sensors with data type `json`, the value displays the **first array entry** followed by a count of additional entries (e.g. `{"t":1710000000000,"y":1250} (+543 more entries)`).
- **Auto-refresh**: The tab updates automatically every 5 seconds.
- **Layout toggle**: The **Full Width** / **Flexible** button in the toolbar switches both grids between a flexible multi-column layout and a single-column full-width layout. The choice is saved in the browser and restored on the next visit.

### Navigation

Click **Open Configuration** (top right) to jump directly to the instance configuration page of this adapter.

---

## 4. Forecast Sources

Forecast and weather data from pvforecast or similar adapters can be written to InfluxDB using **JSON sensors** on the Sensors tab. Simply set the datatype to **JSON Array** and use the **Automatic** preset.

### How it works

1. The adapter subscribes to one or more JSON states (e.g. `pvforecast.0.summary.JSONData`)
2. When the JSON state changes, the adapter parses the JSON array
3. In **Automatic** mode, the adapter scans each entry for known value fields (`y`, `clearsky`, `temp`)
4. For each detected field, a data point is written to InfluxDB with the correct measurement, field, and type
5. Because InfluxDB overwrites points with the same measurement, tags, and timestamp, **existing forecast points are automatically updated** when the source data changes

### JSON format

The source state must contain a JSON array of objects. Each object must have a timestamp field (`t`) and one or more value fields:

```json
[
  { "t": 1709035200000, "y": 1500, "clearsky": 2000, "temp": 12.5 },
  { "t": 1709038800000, "y": 2200, "clearsky": 2800, "temp": 14.0 }
]
```

### Default forecast sensors

The adapter comes with three preconfigured forecast sensors:

| Sensor | Measurement | Field | Type | JSON Field |
|--------|-------------|-------|------|------------|
| INVERTER_POWER_FORECAST | `inverter_forecast` | `power` | int | `y` |
| INVERTER_POWER_FORECAST_CLEARSKY | `inverter_forecast_clearsky` | `power` | int | `clearsky` |
| OUTDOOR_TEMP_FORECAST | `outdoor_forecast` | `temperature` | float | `temp` |

In **Automatic** mode, a single JSON sensor detects all present fields and writes them automatically. You only need to enable one sensor and point it to the JSON source state.

### Timestamp handling

- **Milliseconds** (number >= 10^12): Used directly
- **Seconds** (number < 10^12): Automatically converted to milliseconds
- **ISO string**: Parsed via `Date` constructor

---

## 5. How-To: pvForecast with pvnode

This section explains how to connect the **pvforecast** adapter to SOLECTRUS InfluxDB for forecast data.

### Prerequisites

- ioBroker with pvforecast adapter installed
- SOLECTRUS InfluxDB adapter installed and connected to InfluxDB

### Step 1: Choose your pvforecast backend

The pvforecast adapter supports two backends:

| Backend | Available Fields | Description |
|---------|-----------------|-------------|
| **Standard** | `y` (forecast power) | Basic PV power forecast only |
| **pvnode: at V6.0.0** | `y`, `clearsky`, `temp` | Full forecast with clearsky irradiance and temperature |

> **Important:** The fields `clearsky` (watt_clearsky) and `temp` are **only available with pvnode** as backend. The standard pvforecast backend only provides the `y` (forecast power) field.

### Step 2: Configure pvforecast

1. Install the pvforecast adapter in ioBroker
2. Configure your PV system parameters (location, modules, orientation, etc.)
3. If you want clearsky and temperature data, configure **pvnode** as backend
4. Verify that `pvforecast.0.summary.JSONData` contains a JSON array with forecast data

### Step 3: Enable the JSON sensor in SOLECTRUS InfluxDB

1. Open the SOLECTRUS InfluxDB adapter settings
2. Go to the **Sensors** tab
3. Find the sensor **INVERTER_POWER_FORECAST** (or any forecast sensor)
4. Set the **ioBroker Source State** to `pvforecast.0.summary.JSONData`
5. Enable the sensor (checkbox)
6. Save the configuration

The adapter will automatically detect all available fields in the JSON data and write them to InfluxDB:

- `y` -> `inverter_forecast.power` (always available)
- `clearsky` -> `inverter_forecast_clearsky.power` (pvnode only)
- `temp` -> `outdoor_forecast.temperature` (pvnode only)

### Step 4: Verify in InfluxDB

After the next pvforecast update, check your InfluxDB bucket for the measurements `inverter_forecast`, `inverter_forecast_clearsky` (pvnode only), and `outdoor_forecast` (pvnode only). You should see the field `power` in the first two and `temperature` in the third.

### Troubleshooting

- **No data written**: Ensure the sensor is enabled and the source state contains a valid JSON array
- **Only `inverter_forecast` measurement**: Your pvforecast backend is not pvnode. Switch to pvnode for the additional `clearsky` and `temp` fields
- **Timestamps wrong**: Check that the JSON data uses Unix timestamps (seconds or milliseconds) or ISO strings

---

## 6. Data-SOLECTRUS Formula Engine

The formula engine is an optional feature that lets you compute derived values from any ioBroker states. Enable it by checking **Enable Data-SOLECTRUS (formula engine)** on the InfluxDB tab.

When enabled, two additional tabs appear:

- **Data Values** -- Configure computed items
- **Data Runtime** -- Global polling and snapshot settings

### Concepts

- **Items** are the building blocks. Each item reads one or more ioBroker states and produces an output state under `solectrus-influxdb.X.ds.*`
- Items can operate in three modes: **Source**, **Formula**, or **State Machine**
- Items can be organized into **folders/groups** for better overview
- Computed values can be used as sensor sources for InfluxDB storage
- Each item has an optional **Unit** field (placeholder `W`). If no unit is set, the Formula Engine grid on the **SOLECTRUS Overview** tab (see section 3) defaults numeric items to `W` — same as the InfluxDB sensors. Boolean and string items are never shown with a unit.

---

## 7. Item Modes

### Source Mode

Mirrors a single ioBroker state. Optionally extracts a value from a JSON payload using JSONPath.

| Setting | Description |
|---------|-------------|
| ioBroker Source State | The state to mirror |
| JSONPath (optional) | Extract a nested value, e.g. `$.apower` |
| Datatype | `number` (default), `boolean`, `string`, or `mixed` |
| Clamp negative to 0 | Replace negative output values with 0 |

### Formula Mode

Computes a value from multiple named inputs using a mathematical expression.

| Setting | Description |
|---------|-------------|
| Inputs | Named variables, each linked to an ioBroker source state |
| Formula expression | Mathematical expression using input variable names |
| Datatype | Output type |
| Clamp / Min / Max | Optional output clamping |

**Input configuration:**

| Field | Description |
|-------|-------------|
| Key | Variable name used in the formula (e.g. `pv1`) |
| ioBroker Source State | State to read the value from |
| JSONPath (optional) | Extract from JSON payload |
| Clamp input negative to 0 | Clamp this specific input before formula evaluation |

**Example formula:** `pv1 + pv2 + pv3`

### Available functions

| Function | Description | Example |
|----------|-------------|---------|
| `min(a, b)` | Smaller of two values | `min(5, 10)` = 5 |
| `max(a, b)` | Larger of two values | `max(0, value)` |
| `clamp(v, min, max)` | Clamp between bounds | `clamp(v, 0, 100)` |
| `IF(cond, then, else)` | Conditional | `IF(soc > 80, surplus, 0)` |
| `abs(v)` | Absolute value | `abs(-5)` = 5 |
| `round(v)` | Round to integer | `round(3.7)` = 4 |
| `floor(v)` / `ceil(v)` | Round down / up | `floor(3.7)` = 3 |
| `pow(base, exp)` | Power | `pow(2, 3)` = 8 |

### State functions (advanced)

These functions read ioBroker states directly in a formula, without defining named inputs:

| Function | Description | Example |
|----------|-------------|---------|
| `s("id")` | Read state as safe number (0 if unavailable) | `s("hm-rpc.0.power") + 100` |
| `v("id")` | Read state as raw value (string/number/boolean) | `v("mqtt.0.status")` |
| `jp("id", "$.path")` | Extract value from JSON state via JSONPath | `jp("shelly.0.json", "$.apower")` |

### Supported operators

`+`, `-`, `*`, `/`, `%`, `()`, `&&`, `||`, `!`, `==`, `!=`, `>=`, `<=`, `>`, `<`, `? :`

---

## 8. Formula Builder

Click **Builder...** next to the formula input to open the visual formula builder.

The builder provides:

- **Variables (Inputs)** -- Click to insert your named input variables
- **Operators** -- Click to insert operators with tooltips explaining each one
- **Functions** -- Insert function templates (`min`, `max`, `clamp`, `IF`)
- **State functions** -- Insert `s()`, `v()`, or `jp()` with a state picker dialog
- **Examples** -- Common formula patterns (PV sum, surplus, percentage, clamping, conditions)
- **Live preview** -- See the formula result in real-time (requires the adapter to be running)

The formula is always editable as plain text. The builder only inserts building blocks at the cursor position.

---

## 9. State Machine Mode

The state machine mode generates string or boolean states based on rules. Rules are evaluated top-to-bottom; the **first matching rule wins**.

This is useful for:
- Translating numeric status codes into readable labels
- Determining operating modes based on multiple sensor values
- Creating boolean flags from complex conditions

### Configuration

| Setting | Description |
|---------|-------------|
| Inputs | Named variables (same as formula mode) |
| Datatype | `string` or `boolean` |
| Rules | Ordered list of condition/output pairs |

### Rules

Each rule has:

| Field | Description |
|-------|-------------|
| Condition | A formula expression that evaluates to truthy/falsy. Use input variable names and operators. |
| Output Value | The string or boolean value to output when the condition matches. |

**Special conditions:**
- `true` or empty = default/fallback rule (always matches)
- Use input variables and operators: `soc < 10`, `battery > 80 && surplus > 0`

### Example

For an item with inputs `soc` (battery SOC) and `surplus` (PV surplus):

| Condition | Output Value |
|-----------|-------------|
| `soc < 10` | `Battery-Empty` |
| `soc < 30` | `Battery-Low` |
| `surplus > 1000 && soc > 80` | `Full-Export` |
| `true` | `Normal` |

Result: The output state will contain `Battery-Empty`, `Battery-Low`, `Full-Export`, or `Normal` depending on current values.

---

## 10. Data Runtime Settings

On the **Data Runtime** tab:

| Setting | Description | Default |
|---------|-------------|---------|
| Poll interval (seconds) | How often computed items are re-evaluated | 5 |
| Read inputs on tick (snapshot) | Read all input states fresh on each evaluation cycle | off |
| Snapshot delay (ms) | Wait time after snapshot read before evaluation | 0 |

---

## 11. Monitoring & Buffer

### Alive Monitoring

The adapter automatically monitors whether sensor values are still being updated regularly. The **Alive Timeout (min, 0 = disabled)** field is configurable individually for each sensor in **Expert Mode** (default: 60 minutes). When the timeout is set to `0`, alive monitoring is completely disabled for that sensor — the timestamp row is hidden in the sensor overview.

If a sensor has not received a new value for longer than the configured timeout, the adapter logs a warning:

```
Sensor "INVERTER_POWER": no update since 4/5/2026, 6:30:00 PM (longer than 60 minute(s))
```

In addition, the last timestamp of the affected sensor is shown in **orange** in the **tab view**, so you can spot stale sensors at a glance without opening the log.

The warning is repeated at most once per timeout period per sensor to avoid log flooding. Set the timeout to `0` to disable the check for an individual sensor (Expert Mode only). Newly created sensors default to a timeout of `60` minutes. The timeout must be greater than the update interval of the respective source adapter.

### Value Monitoring (Max Value)

Value monitoring is **disabled by default** (max value = 0). In **Expert Mode**, an individual max value can be set per numeric sensor. The unit is shown alongside the max value badge in the sensor overview (defaulting to `W` if no unit is configured). When the max value is > 0, it is shown as a badge next to the current value in the sensor overview. When value monitoring is disabled (max value = 0), the badge is hidden.

### Adapter states

| State | Description |
|-------|-------------|
| `info.connection` | `true` if InfluxDB is reachable |
| `info.buffer.size` | Number of buffered data points |
| `info.buffer.oldest` | Timestamp of the oldest buffered point |
| `info.buffer.clear` | Button to manually clear the buffer |
| `info.lastError` | Last critical error message |

### Data-SOLECTRUS states (when enabled)

Computed values appear under `solectrus-influxdb.X.ds.*` with per-item diagnostic states.

### Buffer behavior

- Values are persistently buffered to disk (`buffer.json`)
- Maximum buffer size: 100,000 points
- Flushing only occurs when an **active InfluxDB connection** is confirmed (`ensureInflux()` checks before every flush)
- On InfluxDB outage, retry intervals increase exponentially (up to 5 minutes)
- After reconnection, all buffered points are flushed
- During a flush, the buffer is never modified (snapshot-and-swap pattern)
- On flush failure, data is automatically restored to the buffer

---

## 12. Using Computed Values as Sensor Sources

You can use Data-SOLECTRUS computed values as input for sensors to write them to InfluxDB:

1. Create a computed item (source, formula, or state machine) in the **Data Values** tab
2. On the **Sensors** tab, add a new sensor
3. As **ioBroker Source State**, select the computed value state: `solectrus-influxdb.X.ds.<outputId>`
4. Configure measurement, field, and data type as usual

The adapter handles the initialization order automatically -- sensor subscriptions for `ds.*` states work even though the formula engine starts after sensor setup.

---

## 13. Debugging

Set the adapter log level to **Debug** for detailed output including:

- Sensor value collection
- InfluxDB write operations
- Formula evaluation details
- State machine rule matching
- Buffer operations

---

## 14. Notifications

The adapter can send messages via configurable notification providers when important events occur.

### Activation

The **Notifications** tab is hidden until notifications are enabled. Enable the **Enable notifications** checkbox on the **InfluxDB** tab to reveal it and activate the feature, then:

1. Select the desired trigger events
2. Configure at least one notification provider

### Triggers

| Event | Description |
|-------|-------------|
| **InfluxDB connection failure / restore** | **❗** Sent on the first connection failure and **✅** again when the connection is restored |
| **Sensor alive timeout** | **⚠️** Sent when a sensor does not deliver an update within the configured timeout (only for non-zero values) |
| **Max value exceeded** (`notifyOnMaxValueExceeded`) | **⚠️** Sent when a sensor value exceeds its configured maximum; throttled to at most once per hour per sensor |
| **JSON field missing** (`notifyOnJsonFieldMissing`) | **⚠️** Sent once per session when a known JSON field (`y`, `clearsky`, `temp`) is completely absent from the source data — indicates the backend does not provide that field (e.g. `clearsky`/`temp` require pvnode). The notification resets if the field reappears. |

### Supported Providers

| Provider | Requirement |
|----------|-------------|
| **Telegram** | ioBroker Telegram adapter installed and configured |
| **Pushover** | ioBroker Pushover adapter installed and configured |
| **WhatsApp** | ioBroker whatsapp-cmb adapter installed and configured |
| **Email** | ioBroker Email adapter installed and configured |
| **Signal** | ioBroker signal-cmb adapter installed and configured |
| **Matrix** | ioBroker matrix-org adapter installed and configured |
| **Synology Chat** | ioBroker synochat adapter installed and configured |

Multiple providers can be configured simultaneously. Before sending, the adapter checks whether the respective adapter instance is active and logs a warning if the instance is not running.

### Instance Selection

Each provider has an **Instance** dropdown list. Available adapter instances are read automatically and offered for selection. This makes it easy to target a specific instance when multiple instances of the same adapter are running.

### Notes

- Notification messages are localized via `getNotificationMessage()` using the configured `systemLanguage`.
- For InfluxDB connection failures, a notification is sent on the **first** failure and can repeat after `notifyRepeatMinutes` while the connection remains down.
- Sensor timeout notifications are sent when the configured alive-timeout condition is met (Expert Mode) and are throttled by `notifyRepeatMinutes`.

## 15. Backup

### Built-in Backup tab

The **Backup** tab in the adapter configuration lets you create, upload, restore, download and delete backups of this instance directly - no other adapter needs to be installed. A backup contains:

- General configuration (connection settings)
- Sensor configuration, internal/external, activated/deactivated
- Data-SOLECTRUS items (calculations/formulas) and their folders
- All object folders/channels/states created by this instance

Backups are stored locally on this ioBroker host. By default they are placed under this instance's own data directory, but you can choose a custom storage location (e.g. a different disk or a mounted network share) via the "Backup directory" field. Use the "Keep last N backups" field to control how many of the most recent backups are kept automatically; older ones are deleted whenever a new backup is created. Restoring a backup restarts the instance automatically so the restored configuration takes effect.

> **Note:** The InfluxDB token is a protected/encrypted setting and is never included in these backups. After a restore it has to be entered again manually on the **InfluxDB** tab.

> **Note:** The Admin configuration dialog does not automatically pick up the restored settings while it stays open (it only shows what was loaded when it was opened). After a restore, close the adapter configuration dialog and reopen it to see the restored values.