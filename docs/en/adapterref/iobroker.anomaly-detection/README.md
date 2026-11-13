---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.anomaly-detection.svg?color=blue
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.anomaly-detection.svg
chapters: {"pages":{"en/adapterref/iobroker.anomaly-detection/README.md":{"title":{"en":"ioBroker.anomaly-detection"},"content":"en/adapterref/iobroker.anomaly-detection/README.md"},"en/adapterref/iobroker.anomaly-detection/README.de.md":{"title":{"en":"ioBroker.anomaly-detection"},"content":"en/adapterref/iobroker.anomaly-detection/README.de.md"}}}
---
<img src="admin/anomaly-detection.png" alt="Logo" width="400">

# ioBroker.anomaly-detection

[English](/#/adapters/anomaly-detection) · **Deutsch** ([README.de.md](/#/docs/adapterref/iobroker.anomaly-detection/README.de.md))

[![NPM version](https://img.shields.io/npm/v/iobroker.anomaly-detection.svg?color=blue)](https://www.npmjs.com/package/iobroker.anomaly-detection)
[![Downloads](https://img.shields.io/npm/dm/iobroker.anomaly-detection.svg)](https://www.npmjs.com/package/iobroker.anomaly-detection)

Learns the normal behaviour of selected numerical ioBroker states and reports statistically unusual values locally.

> **No AI is used.** The adapter does not use machine learning services, cloud APIs, or generative AI. All evaluations are calculated locally using deterministic mathematical and statistical methods such as medians, Median Absolute Deviation (MAD), bounded time baselines, and robust slopes. Results are explainable and reproducible from the same input data and configuration.

## What it does

Static thresholds cannot express context: 8 kW can be normal in the morning and unusual later on a warm Sunday. This adapter maintains bounded robust baselines for each configured numerical state. It evaluates every incoming state update; it does not poll source states.

The adapter combines these deterministic detectors:

- **Robust value deviation:** Median Absolute Deviation (MAD) detects values outside the learned range without allowing a single extreme reading to distort the baseline.
- **Rate of change:** compares `delta / elapsed time`, so irregular source update intervals are handled correctly.
- **Stuck state:** optionally detects repeatedly received identical values beyond the configured duration. A missing update alone is never classified as stuck.
- **Temporal baseline:** hourly buckets by default, optionally further split by weekday. Sparse day/time contexts fall back to the time-of-day baseline and then to the global baseline.

`score` is a deterministic severity/confidence value from 0 to 100, not a statistical probability and not a diagnosis of the physical cause.

## Requirements

- Node.js 24 or newer (as declared in `package.json`).
- ioBroker js-controller 7.2.2 or newer (as declared in `io-package.json`).
- ioBroker Admin 8.2.0 or newer for the custom administration tab. React 19 and MUI 9 are used by the federated Admin UI; compatibility with every Admin 8.x host build has not been independently verified, so use a current supported Admin release.

| Score  | Interpretation |
| ------ | -------------- |
| 0–49   | normal         |
| 50–69  | unusual        |
| 70–84  | anomaly        |
| 85–100 | strong anomaly |

## Mathematical basis

The adapter uses bounded, robust statistics. It does not fit a neural network, call an AI service, or assume that measurements arrive at fixed intervals.

### Robust value deviation (Median and MAD)

For a learned baseline with values `x₁ … xₙ`, the expected value is the median:

`m = median(x₁ … xₙ)`

The spread is measured with the Median Absolute Deviation (MAD):

`MAD = median(|xᵢ − m|)`

For a new value `x`, the adapter calculates a robust z-score:

`robust z = 0.6745 × |x − m| / MAD`

The configured **Sensitivity** is the z-score at which this detector reaches a score of 100. Unlike an arithmetic mean and standard deviation, median/MAD is not strongly distorted by a single extreme value. If `MAD = 0`, an unchanged value is normal and a different value is treated as a strong deviation.

Example: learned values around `100 W` with median `100 W` and MAD `2 W` make `120 W` a much stronger deviation than `103 W`.

### Rate-of-change deviation

For consecutive values, the rate is calculated using the actual elapsed time:

`rate = (current value − previous value) / elapsed seconds`

The learned rate baseline uses the same median/MAD calculation as the value detector. This detects a change that is unusually fast even when the resulting absolute value is still plausible.

Example: a tank level normally changes by `−0.01 %/s`; a change of `−0.5 %/s` can indicate an unusual rapid loss.

### Stuck-state detection

This method is rule-based rather than distribution-based. When identical values are received repeatedly, the adapter records the first timestamp `t₀`. A stuck finding is possible only when:

`current timestamp − t₀ ≥ configured stuck duration`

A missing update does not count as a repeated value and therefore cannot cause a stuck finding.

Example: with a duration of `120 minutes`, a valve position that continues to report exactly `50` for more than two hours is considered suspicious.

### Temporal baseline and fallback

Values are stored globally and, when enabled, in time buckets. A bucket is calculated from the local time of day:

`bucket = floor(minutes since midnight / configured bucket size)`

With weekday context enabled, the weekday is added to this key. The expected baseline is chosen only when it contains at least **Minimum learned samples**. The fallback order is:

`weekday + time bucket → time bucket → global baseline`

Example: a household load at `09:15` is compared with the learned `09:00–10:00` behavior, rather than with nighttime values.

### Context-aware baseline

Configured context states produce an additional key such as `pump.on=true`, `mode=eco`, or `temperature=10–15`. Numeric context values are not used directly; they are mapped to a fixed interval:

`bucket start = floor(context value / bucket width) × bucket width`

For example, with width `5`, `12.3` belongs to `10–15`. A valid matching context must contain at least **Minimum learned samples** before it is used. A valid but still immature context remains in `learning` and is not compared with an unrelated ordinary temporal/global baseline. If context is missing or invalid, the adapter uses the ordinary temporal fallback instead. Context combinations, categorical values, and samples are bounded to prevent unlimited memory growth.

### Persistent level-shift detection

This detector works on residuals:

`residual = actual value − expected value`

It compares the robust median of a bounded recent residual window with the long-term expected residual (normally near zero), normalized by the baseline MAD. A candidate must remain in the same direction across repeated evaluations before an upward or downward level shift is reported. This prevents a single spike from becoming a change point.

Example: a pump historically near `185 W` that remains near `240 W` produces sustained positive residuals and can be identified as an upward level shift.

### Trend detection

Trend detection also uses residuals so normal daily behavior is subtracted first. It calculates all valid pairwise slopes from the bounded observation window:

`slopeᵢⱼ = (residualⱼ − residualᵢ) / (timestampⱼ − timestampᵢ)`

The final slope is the median of these slopes (a Theil-Sen-style robust slope). The median makes isolated outliers far less influential than ordinary least-squares regression. A trend requires at least 12 samples over six hours.

Example: heating duration that gradually rises from `27` to `39 minutes` over several days produces a positive residual slope even if no single duration is an extreme outlier.

### Combined score and learning

Each detector contributes a bounded score from `0` to `100`. Value/context, level-shift, and trend signals are treated as correlated behavior evidence: only the strongest of them is included in the weighted score, avoiding double counting. Rate and stuck signals can contribute independently. Agreement between independent strong signals adds a small bounded bonus; the final score is always clamped to `0–100`.

Observations at or above **Anomaly threshold** are normally excluded from learning, which prevents an ongoing fault from immediately becoming normal. Confirmed level shifts are an explicit exception: their values are gradually learned so a legitimate new operating level can become the new baseline.

## Configuration

Add one row for every source in the **Monitored numerical states** table. Only ioBroker states with `common.type: number` are supported.

The important defaults are deliberately conservative:

- 30 learned samples are required before the model enters `monitoring` (configurable per source).
- Sensitivity is a robust z-score of 3.5.
- The persistent `detected` indicator requires a score of at least 70 for five minutes.
- Recovery uses a 10-point hysteresis, preventing flapping near the threshold.
- The stuck detector is disabled by default and uses 120 minutes when enabled.
- Time-of-day context is enabled in 60-minute buckets (configurable per source); weekday context is optional.

Configured changes take effect after the adapter restarts. Duplicate source IDs are ignored after the first enabled row. Missing configured objects remain subscribed so they can be used once they appear, but the adapter logs a warning at startup.

When a source row is removed from the configuration and the adapter restarts, its generated subtree under `anomaly-detection.0.sources` and its persisted model are removed. The cleanup uses the generated device's stored original source ID and deletes only the exact generated subtree; temporarily unavailable sources that remain configured are retained.

### Analysis view: history and anomalies

The **Current anomaly assessments** tab provides a compact, responsive **History & anomalies** chart for every monitored source. The chart is collapsed initially and loads history only when opened. The period can be changed between **1 h**, **6 h**, **24 h** (default), and **7 days**; changing the period reloads the data for that source.

The chart uses the state unit from ioBroker (for example `W`, `%`, or `°C`) and scales its plot area to the actual card width. It shows:

- **Value** – the historical measurements from the configured History provider.
- **Expected range** – a translucent band made only from the historical `decisionLow`/`decisionHigh` values that were valid at each timestamp. Missing historical bounds remain empty; the current range is never projected backwards.
- **Assessment context** – a subtle background highlight only for time sections whose stored context matches the context used by the current assessment. Context names use the ioBroker `common.name` where available.
- **Anomaly** – a red triangle only when the adapter stored `detected: true` for that historical assessment. Historical markers do not change the current status badge.

Hovering or touching a point shows the information available for that exact historical timestamp: value and unit, historical expected range (or an explicit unavailable notice), status, translated reason, score, and context. For value/context deviations the tooltip also shows the concrete distance above or below the historical range. Rate, stuck, trend, and level-shift findings keep their detector-specific explanation and are not presented as fabricated range deviations.

The chart legend distinguishes **Value**, **Expected range**, **Assessment context**, and **Anomaly**. A small note reports the number of conspicuous historical measurements in the selected period. This is separate from the current **Normal** or **Anomaly** status; the adapter stores individual diagnostic snapshots, so the note counts displayed snapshots rather than inventing grouped anomaly events.

## Learning and persistence

Normal observations update the global and configured temporal baselines gradually. Observations at or above the configured anomaly threshold are excluded from learning so an ongoing fault is not accepted as normal. The adapter stores only bounded samples (240 per baseline) and compact model metadata, not an unbounded raw time series.

## Advanced detection

All advanced detectors are disabled by default. Context-aware detection learns separate baselines for up to three boolean, string/enum, or numeric-bucket context states. Numerical contexts use configurable fixed-width buckets. Missing or invalid context safely falls back to the ordinary temporal and global baseline; a valid but immature context stays in learning instead.

Persistent level-shift detection compares a bounded recent residual window with the robust expected baseline and requires repeated evidence before reporting an upward or downward shift. Confirmed shifts are gradually learned as the new normal.

Trend detection uses a bounded timestamp-aware median slope over residuals (`actual - expected`), avoiding false alerts from normal temporal behavior. It requires at least 12 samples over six hours.

The adapter detects statistical inconsistency; it does not diagnose equipment faults or prove causation. Historical bootstrap trains only the normal model; context baselines learn from live values because generic history providers cannot reliably reconstruct arbitrary context values.

### Context model maturity and fallback

`sampleCount` is the retained global value-model sample count. It does **not** prove that every context is trained. For example, `sampleCount=240` can coexist with `contextSampleCount=3` for `pump.on=false`.

Baseline selection for a current observation is explicit:

1. A valid matching context with at least **Minimum learned samples** uses its context-specific baseline. Within that model, the temporal hierarchy is `weekday + time bucket → time bucket → context-global`.
2. A valid matching context with too few samples uses no value baseline yet. The result is `learning`, `baselineScope=insufficient`, and value, rate, level-shift, and trend comparisons that could confuse the new operating mode are not performed.
3. When context-aware detection is disabled, or a configured context value is missing or invalid, the ordinary hierarchy is used: `weekday + time bucket → time bucket → global`.

The first observation after any context change does not create a rate comparison. This prevents an expected ON/OFF transition from being treated as an unusual rate solely because the operating context changed. Persistent level-shift and trend detection operate on residuals only when an expected value is available.

Historical bootstrap imports only the monitored source history. It trains the global, time, weekday, and rate models; it does not retrieve or time-align arbitrary context-state history. Context-specific models therefore learn from subsequent live observations.

### Configuration options

Every row in **Monitored numerical states** is one independently trained source. Save the instance configuration and restart the adapter after changing a row.

| Option                                      | What it does                                                                                                                                                      | How to use it                                                                                                                                             | Example                                                                                    |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **Enabled**                                 | Starts or stops monitoring for this row. Disabled rows keep their configuration but produce no analysis.                                                          | Leave enabled for active sources; disable temporarily while commissioning a device.                                                                       | Disable `pump.power` during maintenance.                                                   |
| **Source state ID**                         | The numerical ioBroker state to evaluate. Only states with `common.type: number` are supported.                                                                   | Select the state with the object picker; do not type a channel ID.                                                                                        | `alias.0.pump.power`                                                                       |
| **Name**                                    | Optional readable name used for the generated source device. It does not change the original state ID.                                                            | Use a short name when the object ID is difficult to read.                                                                                                 | `Garden pump power`                                                                        |
| **Initial training**                        | Chooses whether the model starts with live observations or imports existing history.                                                                              | Select **Learn from live values only** for a new source; select **Import existing history** only when a compatible history adapter is already configured. | Use history for a power meter with several months of InfluxDB data.                        |
| **History source**                          | Selects the history adapter instance used for bootstrap. The list contains only compatible, enabled providers with history activated for the selected state.      | Choose the provider shown in the list; no manual entry is required. If the list is empty, use live learning or enable history for that state first.       | `influxdb.0`                                                                               |
| **History training period (days)**          | Defines how far back the bootstrap request reads.                                                                                                                 | Use a period containing representative normal operation; avoid periods dominated by faults or installation work.                                          | `30` for one typical month.                                                                |
| **Maximum imported samples**                | Caps data imported during bootstrap, protecting memory and slow Raspberry Pi systems. Samples are distributed across the selected period.                         | Raise it only when the history is sparse and the host can handle it.                                                                                      | `1000` for normal use; `3000` for sparse daily readings.                                   |
| **Start monitoring after history import**   | Controls whether a sufficiently trained imported model can immediately use the `monitoring` status.                                                               | Leave enabled unless you want to inspect imported data before relying on alerts.                                                                          | Enable it for a trusted, established energy-meter history.                                 |
| **Minimum learned samples**                 | Minimum number of learned observations required for a baseline to be trusted. Until then, status remains `learning`.                                              | Use a higher value for noisy values and a lower value only for rarely changing sources.                                                                   | `30` for frequent power updates; `10` for a daily counter.                                 |
| **Time bucket size (minutes)**              | Splits normal behavior into time-of-day ranges when time context is enabled.                                                                                      | Choose a bucket broad enough to receive enough samples. Smaller buckets are more specific but learn more slowly.                                          | `60` for hourly behavior; `15` for a frequently updated room temperature.                  |
| **Sensitivity (robust z-score)**            | Defines how far a value may deviate from the robust median/MAD baseline before its score grows. Lower values are more sensitive; higher values are more tolerant. | Start with the default and adjust only after observing normal operation.                                                                                  | Change from `3.5` to `5` if normal variation produces too many alerts.                     |
| **Anomaly threshold**                       | Score at or above which an observation is treated as a strong anomaly and is excluded from ordinary learning.                                                     | Keep it aligned with the automation that consumes `detected`.                                                                                             | `70` means only stronger deviations start persistent detection.                            |
| **Minimum anomaly duration (minutes)**      | Requires a high score to persist before `analysis.detected` becomes `true`. Prevents short spikes from creating a persistent alarm.                               | Use `0` only when immediate persistent detection is desired.                                                                                              | `5` for a pump; `30` for a slowly changing energy value.                                   |
| **Enable value deviation detector**         | Enables robust MAD comparison of the current value with its expected baseline.                                                                                    | Normally keep enabled. Disable only when another detector should be used without absolute-value evaluation.                                               | Keep enabled for room temperature or power.                                                |
| **Enable rate-of-change detector**          | Detects unusually fast change, based on the real elapsed time between updates.                                                                                    | Enable for values where sudden jumps matter; disable for counters or deliberately bursty inputs.                                                          | Detect a tank level that drops far faster than normal.                                     |
| **Enable stuck-state detector**             | Detects repeated identical received values for longer than the configured duration. A missing update alone is not a stuck state.                                  | Enable only for sources expected to change or report regularly.                                                                                           | Enable for a moving valve position; leave off for a stable setpoint.                       |
| **Stuck duration (minutes)**                | Duration of identical received values required by the stuck detector.                                                                                             | Set it longer than the source's normal stable period.                                                                                                     | `120` for a sensor that normally changes within two hours.                                 |
| **Use time-of-day context**                 | Learns a separate expected baseline for each time bucket.                                                                                                         | Enable for daily patterns; disable for values with no time-dependent behavior or very sparse updates.                                                     | Enable for household electricity consumption.                                              |
| **Use weekday context**                     | Further separates time buckets by weekday.                                                                                                                        | Enable only when weekday behavior truly differs and enough data is available for each day.                                                                | Enable for office occupancy power; leave off for a continuously running pump.              |
| **Enable context-aware detection**          | Learns separate baselines according to other ioBroker states.                                                                                                     | Enable when the expected value depends on operating state, mode, or an environmental value. Then add one to three context states.                         | Pump power is normal near `0 W` when `pump.on=false` and near `600 W` when `pump.on=true`. |
| **Context states (maximum 3)**              | Lists the boolean, string/enum, or numerical states that define the operating context. The adapter caches their latest valid values.                              | Add only states that materially explain the source value. Missing or invalid context falls back safely to the ordinary baseline.                          | `pump.on`, `pump.mode`, and `weather.outdoorTemperature`                                   |
| **Context state ID**                        | One state participating in the current context combination.                                                                                                       | Select a state with the object picker. Boolean, string, and finite numerical values are supported.                                                        | `zigbee.0.pump.on`                                                                         |
| **Numeric bucket width**                    | Converts numerical context values into fixed ranges instead of using raw floating-point keys. This field is shown only for numerical context states.              | Choose a meaningful resolution for that context's unit.                                                                                                   | Width `5` turns `12.3 °C` into bucket `10–15 °C`.                                          |
| **Enable persistent level-shift detection** | Detects a sustained upward or downward change in the normal level, rather than a single outlier.                                                                  | Enable for values that normally remain around one level. A confirmed shift is gradually learned as the new normal.                                        | Detect a pump whose typical load moves from `185 W` to `240 W`.                            |
| **Enable trend detection**                  | Detects sustained upward or downward drift in the residual from the expected baseline.                                                                            | Enable for gradual deterioration metrics; it requires at least 12 samples spanning six hours.                                                             | Detect a boiler heating duration rising from `27` to `39 minutes` over several days.       |

Models are persisted in the adapter namespace after a short debounce and flushed during normal shutdown. Storage has a schema version; invalid, missing, or incompatible stored data is ignored safely. The adapter does not require History, SQL, InfluxDB, Redis, cloud services, API keys, subscriptions, or external AI for normal live learning.

## Choosing the right detection settings

The settings below are starting points, not universal presets. They should describe the physical behaviour of the source, the amount of representative normal data, and the anomalies that matter. **MAD / value deviation** and **rate-of-change** are enabled by default; **stuck**, **context-aware**, **persistent level-shift**, **trend**, and weekday context are disabled by default.

### Detector decision guide

| Detector                             | Use when                                                                                                                           | Avoid / usually disable when                                                                          | Typical examples and dependencies                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Value deviation / MAD**            | The absolute value should remain within a learned normal range. This is the general-purpose detector and is normally kept enabled. | Only the direction or speed of change matters and the absolute value has little useful meaning.       | Temperature, electrical power, pressure, humidity, consumption, and ordinary sensor measurements. Requires at least **Minimum learned samples** in the selected baseline.                                                                                                                                                                                                                                   |
| **Rate of change**                   | Unusually fast changes are meaningful independently of the current absolute value.                                                 | Fast changes are normal or expected.                                                                  | Tank level, pressure, temperature, state of charge, and flow-related values. Usually avoid for bursty loads, TV power affected by picture content, event-driven values, or counters with irregular increments. Requires a valid preceding update and a learned rate baseline.                                                                                                                               |
| **Stuck detection**                  | The source sends updates and its value is expected to change regularly.                                                            | The value may legitimately remain unchanged for a long time.                                          | Continuously changing sensors, valve positions, or moving process values. Usually avoid for setpoints, inactive devices, and power values of unused appliances. **Missing updates alone are not considered stuck**: the adapter evaluates only received state updates and measures how long repeated identical values persist.                                                                              |
| **Time-of-day context**              | Normal behaviour depends on the time of day and each time bucket can collect enough normal samples.                                | There is no meaningful daily pattern or data is too sparse.                                           | Household electricity use, heating, room temperature, and occupancy-related measurements. It is enabled by default; a 60-minute bucket is the default. A sparse time bucket falls back to the global baseline.                                                                                                                                                                                              |
| **Weekday context**                  | Behaviour differs materially by weekday and enough samples exist for every relevant weekday and time bucket.                       | Weekdays do not materially affect the value or the data volume is insufficient.                       | Office consumption, occupancy, and commercial processes. It works only together with Time-of-day context and splits the available training data further; sparse weekday buckets fall back to the time bucket, then global data.                                                                                                                                                                             |
| **Context-aware detection**          | The expected value depends on another ioBroker state that describes the operating condition.                                       | The additional state does not materially explain the observed value.                                  | Boolean: `pump.on`; string/enum: `heater.mode`; numeric bucket: outdoor temperature, state of charge, or load. Use at most **three** context states. Unnecessary states create more context combinations, fragment the training data, and make learning slower. Missing or invalid context falls back to the ordinary time/global baseline; a valid but insufficiently trained context remains in learning. |
| **Persistent level-shift detection** | A sustained change in the normal operating level matters.                                                                          | The signal switches frequently between unrelated levels that are not explained by configured context. | A pump normally near `185 W` later remaining near `240 W`, permanently increased standby consumption, or a shifted sensor baseline. A single spike is a value anomaly; a level shift requires at least 12 recent residual samples and repeated evidence in the same direction.                                                                                                                              |
| **Trend detection**                  | Gradual drift or deterioration matters.                                                                                            | The signal is highly volatile and no useful expected baseline explains that volatility.               | Heating duration gradually increasing, a slowly deteriorating efficiency metric, temperature offset drift, or energy per cycle rising. The detector evaluates residuals (`actual − expected`), not raw values, and requires at least **12** residual samples spanning at least **six hours**.                                                                                                               |

Context-aware detection creates a separate model for each observed context combination, with a bounded maximum of 32 stored combinations. Numerical context values are grouped by **Numeric bucket width**; boolean and string/enum values need no width. Historical bootstrap trains value, rate, and time baselines, but context baselines learn from live observations because generic history providers cannot reliably reconstruct arbitrary context-state values.

### Starting recommendations by use case

The following table uses **recommended**, **optional**, and **usually off** as initial guidance. It does not replace knowledge of the specific device, installation, or update pattern.

| Use case                           | MAD         | Rate        | Stuck       | Time        | Weekday     | Context     | Level shift | Trend       | Useful context states                                 |
| ---------------------------------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----------------------------------------------------- |
| Room temperature                   | recommended | optional    | usually off | recommended | optional    | optional    | optional    | optional    | Heating mode, window state, outdoor temperature       |
| Household power consumption        | recommended | usually off | usually off | recommended | optional    | optional    | optional    | optional    | Occupancy, tariff mode, major operating mode          |
| Pump electrical power              | recommended | optional    | usually off | optional    | usually off | recommended | recommended | optional    | `pump.on`, pump mode, valve state                     |
| Water consumption / flow           | recommended | recommended | optional    | optional    | optional    | optional    | optional    | usually off | Valve state, irrigation schedule, pump state          |
| EV charging power                  | recommended | optional    | usually off | optional    | usually off | recommended | optional    | optional    | Charging enabled, vehicle connected, charging mode    |
| Heating / boiler metric            | recommended | optional    | optional    | recommended | optional    | recommended | recommended | recommended | Operating mode, outdoor temperature, demand state     |
| TV / entertainment system power    | recommended | usually off | usually off | optional    | usually off | recommended | recommended | usually off | Power-meter switch state, TV operating or power state |
| Slowly degrading efficiency metric | optional    | usually off | usually off | optional    | optional    | recommended | optional    | recommended | Operating mode, load, outdoor temperature             |

### Practical pump example

For a pump's electrical-power state, start with **Value deviation**, **Context-aware detection**, and **Persistent level-shift detection** enabled. Keep **Rate-of-change**, **Stuck**, and **Trend** disabled initially: normal start, stop, and mode transitions can produce rapid changes, while an inactive pump may legitimately remain at `0 W`. Time-of-day is optional and should be enabled only after enough representative data exists; weekday context is usually unnecessary initially.

Use the pump's on/off state and operating mode as context. The model can then learn separate normal behaviour for, for example:

- Pump OFF
- Pump ON in normal mode
- Pump ON in boost mode

Do not add a valve state, flow value, or setpoint as an initial context unless evidence shows that it materially explains pump power. If a particular pump's normal operating transitions are themselves suspicious, Rate-of-change can be enabled later after observing representative normal operation.

### Configuration principles

1. Start simple and enable only detectors that correspond to the physical behaviour you want to monitor.
2. Do not enable every detector merely because it exists.
3. Add context only when it explains the expected value; more context means fewer training samples per context.
4. Start with the default sensitivity and anomaly threshold. Increase tolerance only after observing legitimate false positives.
5. Use historical training only when the selected period represents normal operation; do not train primarily on known fault periods.
6. A statistical anomaly indicates unusual behaviour relative to learned data. It does not prove a physical fault or its cause.

### Using an AI assistant to choose settings

An AI assistant can propose an initial configuration when given this README URL and the monitoring use case. Provide the physical quantity, what the source represents, how often it updates, which other ioBroker states describe operating conditions, whether sudden changes or long constant periods are normal, whether daily or weekly patterns exist, whether sudden shifts or gradual drift matter, and whether historical data is available.

AI-generated settings are only a starting recommendation and must be checked against actual device behaviour. The adapter itself remains deterministic and does not use AI.

Example prompt:

> I want to monitor the electrical power consumption of a pump. The pump on/off state and operating mode are available as additional ioBroker states. Start and stop transitions cause rapid but normal power changes. A lasting change from the usual operating power would matter. I have 30 days of InfluxDB history. Based on this README, recommend the anomaly-detection settings and explain each choice.

## Optional historical initial training

For each source, choose **Import existing history** and select a **History source** from the dropdown. Manual entry is intentionally not available. The list contains only complete, enabled ioBroker history-provider instance IDs, such as `influxdb.0`, `history.0`, or `sql.1`, that have history enabled for that exact state. The adapter detects this from the supported per-state `common.custom.<instance>.enabled` configuration and the provider's `getHistory` capability; it does not query history databases merely to populate the configuration.

Aliases remain the configured live source. For historical bootstrap, the adapter first uses history configured on the alias itself and otherwise checks its alias read target. If both have history in the same provider, the alias history takes precedence. If no compatible provider is shown, no history is enabled for that state (or its alias target), but **Learn from live values only** remains fully available.

The default training period is 30 days (minimum 7) with at most 1,000 imported samples. Invalid values and timestamps are discarded, duplicate timestamps are merged, and oversized result sets are evenly sampled over the whole time range. A robust MAD pass excludes obvious extreme historical values before learning. Rate baselines are calculated only between chronologically adjacent samples with no more than six hours between them. Historical gaps never create a stuck-state finding.

An imported, compatible model is reused after restart. Changing the history provider, training period or sample limit triggers a new import. The runtime validates the selected provider and its enabled history configuration again before every import. Invalid legacy values such as `0` are rejected immediately and are never sent a `getHistory` request. To explicitly discard and retrain the anomaly model, set `sources.<sanitized-source-id>.retrain` to `true`; the adapter resets it to `false` with `ack=true`. A complete predictive model is intentionally retained by this command and is rebuilt only when its history model or training basis needs bootstrap. If history import fails or returns too little usable data, the source remains usable and continues with live learning. The states `analysis.bootstrapStatus`, `analysis.status`, and `analysis.sampleCount` show the import outcome.

## Resulting objects

For each source, the adapter creates a safe deterministic object ID under:

`anomaly-detection.0.sources.<sanitized-source-id>.analysis`

| State                 | Type / role            | Meaning                                                                                                      |
| --------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------ |
| `actual`              | number / `value`       | latest accepted source value                                                                                 |
| `expected`            | number / `value`       | median of the selected baseline                                                                              |
| `deviation`           | number / `value`       | `actual - expected`                                                                                          |
| `score`               | number / `value`       | normalized 0–100 anomaly score                                                                               |
| `detected`            | boolean / `indicator`  | persistent anomaly indicator                                                                                 |
| `status`              | string / `info.status` | `insufficientData`, `learning`, or `monitoring`                                                              |
| `reason`              | string / `text`        | deterministic explanation of the current score (`Normal` for scores below 50)                                |
| `lastAnomaly`         | string / `date`        | time of the most recent high-score observation                                                               |
| `sampleCount`         | number / `value`       | retained global value-model samples (bounded to 240)                                                         |
| `baselineScope`       | string / `info.status` | baseline used: `context`, `time`, `global`, or `insufficient`                                                |
| `activeContext`       | string / `text`        | normalized current context; empty if no valid context is active                                              |
| `baselineSampleCount` | number / `value`       | retained samples in the baseline actually used; `0` for `insufficient`                                       |
| `contextSampleCount`  | number / `value`       | retained samples in the matching context model after the current accepted observation; `0` when none matches |
| `bootstrapStatus`     | string / `info.status` | outcome of optional historical initial training                                                              |
| `retrain`             | boolean / `button`     | write `true` to reset and retrain the anomaly model; a complete predictive model is retained                 |

All adapter-written result states use `ack=true`. `retrain` is the only command state and is reset with `ack=true` after handling.

`status` describes current model readiness, while `bootstrapStatus` describes the most recent optional history-import lifecycle. A successful import ends with `Historical training completed (...)`; after restart, the persisted ioBroker state remains unchanged unless an import is actually started again. `reason`, `score`, and `detected` describe the current evaluation only. `lastAnomaly` is retained as the timestamp of the most recent score at or above the configured anomaly threshold. If no baseline is available for a current value, `expected` and `deviation` are cleared rather than retaining an older baseline.

For example, with `activeContext=alias.0.tv.relay=false`, `actual=0 W`, `baselineScope=context`, and `expected≈0`, the OFF context is mature and is being used. With `baselineScope=global` and `expected≈300`, no usable context baseline was selected and the ordinary global fallback was used. With `baselineScope=insufficient`, the valid current context is still learning; no value baseline is used for that observation.

## Predictive forecasting

Optional predictive forecasting produces a bounded, local forecast for each monitored numerical state. The forecast is generated from the persisted training basis and does not use cloud services or AI APIs. The model supports level/trend, seasonal, and time-of-day profiles and selects the configured model using deterministic backtesting.

Forecast points retain their real timestamps and model interval; the final point is shortened where necessary to stay within the configured horizon. Trend and seasonal phase advance from the last training observation to the current forecast time, including fractions of a model interval. The current live value is displayed separately as an actual marker; it is not inserted into or connected to the dashed forecast series. This makes a difference between the current measurement and the model expectation at the forecast origin visible without creating an artificial ramp.

The forecast card reports the horizon, selected model, model interval, training source, training sample count, last training time, seasonality, and quality classification. Quality is based on historical mean absolute error (MAE). Forecast states can be `disabled`, `learning`, `ready`, `unreliable`, or `error`; limited or unreliable forecasts remain visible with an explicit status.

Predictive settings are configured per source: enablement, forecast horizon, update interval, minimum and maximum training points, and seasonality mode (off, automatic, or manual). Initial training can use live values or a compatible history provider. Persisted models and their bounded training bases survive adapter restarts; missing or incompatible training data is handled without replacing a history-based model with live-only training.

The predictive algorithm version is now 8. Models fitted by an older algorithm are invalidated and rebuilt from the configured history source or new live training data. This prevents old fitted coefficients from being interpreted with the corrected forecast formulas.

Predictive interpolation stops at gaps longer than both six hours and six median source intervals. Training then uses the newest continuous section; a section below the minimum training sample count waits for more data and retains an existing fitted model when available. Repeated observations at one timestamp do not count as fresh training samples. Non-finite intermediate calculations produce an explicit error with no forecast points.

## Limitations

An anomaly means that a value or behaviour is unusual relative to the observations that were learned. It does not establish the root cause. Poor source data, long periods without representative normal operation, changing equipment behaviour, or unsuitable detector settings can produce false positives or missed anomalies. Review initial learning results and tune each source where necessary.

## Privacy

Processing and model storage are completely local to ioBroker. No monitored value is sent to an external AI service, analytics service, or cloud API.

## Support

If you find this adapter useful, you can support its development with a donation:

[![Donate with PayPal](https://camo.githubusercontent.com/ef8c60305542390406855547e32850909812a73c4abada236de22a6dc88b313f/68747470733a2f2f7777772e70617970616c6f626a656374732e636f6d2f64655f44452f44452f692f62746e2f62746e5f646f6e61746543435f4c472e676966)](https://www.paypal.com/donate/?hosted_button_id=3RJQGSJNRSHUJ)

## Changelog
### 0.5.1 (2026-10-26)

- (Voodoo2man) Improved history chart coverage across the selected period while preserving short peaks and dips.

### 0.5.0 (2026-10-25)

- (Voodoo2man) Raised the minimum requirements to Node.js 24, js-controller 7.2.2, and Admin 8.2.0.

### 0.4.5 (2026-10-14)

- Improve wrapping of long state IDs and context settings on narrow screens and at high zoom.
- Preserve sparse history samples up to the configured limit and ignore stale dashboard responses.
- Correct trend backtesting, elapsed forecast time, seasonal phase, zero-crossing trends, and forecast horizon bounds.
- Isolate context-specific rate learning and preserve bounded context detector state across restarts; discard malformed persisted models safely.
- Ignore unacknowledged source commands during startup and retraining, and clear unavailable evaluations after a reset.
- Repair clean admin installation, handle failed or stale chart requests, and localize forecast time-axis labels.
- Add real ioBroker learning, outlier, persistence, restart, and retraining regression tests.
- Reject invalid and stale history samples and prevent duplicate samples from being learned again.
- Stop history imports cleanly during shutdown and build the current React administration interface as part of release packaging.
- Update the administration interface dependencies to React 19, MUI 9, and current ioBroker GUI components.

### 0.4.4 (2026-10-07)

- Complete all common news translations and document the legacy changelog.

### 0.4.3 (2026-10-07)

- Respect the ioBroker system language when selecting the admin-tab language.

## License

This adapter is licensed under the [MIT License](LICENSE).

Copyright (c) 2026 Voodoo2man <Voodoo2man@outlook.de>