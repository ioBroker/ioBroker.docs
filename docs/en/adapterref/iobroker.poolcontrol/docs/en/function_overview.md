---
chapters: {"pages":{"en/adapterref/iobroker.poolcontrol/README.md":{"title":{"en":"ioBroker.poolcontrol"},"content":"en/adapterref/iobroker.poolcontrol/README.md"},"en/adapterref/iobroker.poolcontrol/docs/en/help.md":{"title":{"en":"PoolControl – Help & Documentation"},"content":"en/adapterref/iobroker.poolcontrol/docs/en/help.md"},"en/adapterref/iobroker.poolcontrol/docs/en/function_overview.md":{"title":{"en":"PoolControl – Function Overview"},"content":"en/adapterref/iobroker.poolcontrol/docs/en/function_overview.md"}}}
---
# PoolControl – Function Overview

## 1. What is PoolControl?

PoolControl is an ioBroker adapter for controlling and monitoring a private pool system. The adapter combines pump control, temperature evaluation, solar control, photovoltaic surplus operation, heating control, runtime and consumption evaluations, and text and speech outputs in one shared object structure.

The adapter is modular. On startup, the data points are created first, and then the individual Helper modules are started. Central pump switching is performed via `pump.pump_switch`; a configured real socket is synchronized with it by the pump Helper.

The available data points can be used in the ioBroker object tree, VIS, Blockly, and other adapters. PoolControl provides numerous structured text, JSON, and HTML data points that can be used directly in VIS, Blockly, or other visualization systems.

## 2. Main Functions

PoolControl covers the following main areas:

- Pump control with automatic, time-based, manual, PV, and system modes
- Priority and ownership logic via `pump.active_helper`
- Temperature management for up to six sensor roles including diagnostics and recovery
- Standard solar control and extended solar control
- Photovoltaic surplus control of the pump
- Heating or heat pump control
- Frost protection
- Runtime, circulation, consumption, and cost calculation
- Plausibility diagnostics for the circulation calculation under `circulation.plausibility`
- Daily, weekly, and monthly statistics for temperatures
- Solar Insights and Photovoltaic Insights under `analytics.insights.*`
- Central text and speech output via a shared queue structure
- Diagnostic area `SystemCheck.debug_logs`
- pH, TDS, and ORP/Redox evaluation without automatic dosing
- Optional additional actuators for lighting, extra pumps, and pump-coupled devices
- Follow-pump devices with validation of external target states

## 3. Pump Control

The pump is the central actuator of the adapter. The internal switching state is stored in `pump.pump_switch`. If a real socket is configured in the Admin configuration, `pumpHelper` mirrors this internal state to the external ioBroker data point and, conversely, adopts changes from the socket back into the PoolControl status.

Pump modes supported or used in the code are:

- `auto`: normal automatic operation, relevant among other things for solar and heating
- `auto_pv`: PV surplus operation
- `manual`: manual operation
- `time`: time control
- `off`: off
- `controlHelper`: internal control for maintenance, backwash, and additional pumping
- `timeHelper`, `frostHelper`, `heatHelper`, `speechTextHelper`: internal status/helper modes that are set or evaluated by Helpers

Priority management is handled via `pump.active_helper`. It shows which Helper currently owns or has priority control of the pump. The following are visible in the code in particular:

- `controlHelper` for maintenance, backwash, and additional pumping
- `timeHelper` for active time windows
- `solarHelper` for standard solar operation
- `solarExtendedHelper` for extended solar operation
- `photovoltaicHelper` for PV surplus operation
- `frostHelper` for frost protection
- `heatHelper` for heating operation

Several Helpers check this value before switching the pump. This prevents, for example, solar or PV from overriding active maintenance or time control.

Automatic additional pumping is used to reach the daily circulation target. It generally does not require temperature values. If solar control is active and both collector and pool temperatures are valid, additional pumping is blocked as long as the collector is not warmer than the pool.

The base circulation factor is stored in `general.min_circulation_per_day`. The Admin value is only the initial value during first setup or when the state is empty/invalid. The state is writable, persistent, and limited to `0.5` to `3.0`. Changes update `circulation.daily_required` and `circulation.daily_remaining`.

Optionally, `control.circulation.temperature_factor.*` increases this base value from a configured temperature threshold. The selected sensor must be enabled and provide a valid value. The base value is not overwritten; `general.min_circulation_effective_per_day` contains the effective value capped at `3.0`, while `general.min_circulation_effective_reason` contains the technical reason. The daily target and remaining amount use the effective value; `circulation.daily_total` remains unchanged.

The circulation calculation is also monitored diagnostically under `circulation.plausibility`. The diagnostic checks for implausible pump power, implausible calculated flow, and jumps in the daily circulation volume that occur faster than physically plausible. It only stores diagnostic information in its own states and does not change pump control, PV logic, solar logic, or the circulation calculation formula.

The safety logic includes:

- Mirroring the current pump power to `pump.current_power`
- Error status `pump.error`
- Status output `pump.status`
- Overload check based on `pump.pump_max_watt`
- Detection of power despite the pump being switched off or missing power while the pump is switched on
- Short grace periods after start and stop so that brief power transitions  are not immediately treated as errors
- Optional safety operation in manual mode via `pump.manual_safety_enabled`

In addition, there are live and learning areas:

- `pump.live.*` for current power, current flow, flow percentage, and last flow value
- `pump.learning.*` for learned power and flow ranges, deviations, and tolerance
- `pump.learning.reset` to reset learned pump values after pump changes or incorrect learning; `pump.learning.tolerance_percent` is kept
- `pump.pressure.*` for pressure sensor data, trend, learned values, and diagnostics
- `pump.speed.*` for recommendations or states of a variable pump speed

`pump.learning.*` remains purely passive and diagnostic. The reset button also does not affect pump control, PV mode, live values, or `pump.pressure.learning.*`.

## 4. Time Control

Time control is located under `timecontrol.*`. There are three time windows (`time1`, `time2`, `time3`) with:

- Active switch
- Start time
- End time
- Weekday selection
- optional interval operation (`interval_active`, `interval_every_min`, `interval_run_min`)

The `timeHelper` checks every minute whether one of the active time windows is valid for the current weekday. Time control only switches when `pump.mode = time` is set.

When a time window is active, the Helper sets `pump.active_helper` to `timeHelper`, updates `speech.time_active`, and switches `pump.pump_switch`. When the time window ends or the pump mode is left, the Helper releases priority again.

When interval operation is enabled, the cycle is always anchored to the start time of the respective window. The defaults are a 60-minute interval period and a 15-minute run time. The run time must not exceed the interval period; with an invalid configuration, user values are retained and the affected window falls back to the existing continuous operation.

Multiple windows use OR logic, so a paused interval cannot switch off another window that currently requests operation. The exclusive end time limits every interval run. Because the existing 60-second check remains unchanged, the physical switch may occur almost 60 seconds after the calculated point in time. `timecontrol.status_text` provides the translated diagnostic state.

## 5. Solar Control

Standard solar control is located under `solar.*` and is executed by `solarHelper`. It operates in the mode `solar.control_mode = standard`.

Important data points are:

- `solar.solar_control_active`: main switch for solar control
- `solar.control_mode`: selection between standard and extended mode
- `solar.temp_on`: switch-on threshold
- `solar.temp_off`: switch-off threshold
- `solar.hysteresis_active`: prepared hysteresis option
- `solar.request_active`: internal solar request
- `solar.collector_surface_delta`: current collector minus pool surface difference
- `solar.collector_warning`: collector warning status
- `solar.warn_active`, `solar.warn_temp`, `solar.warn_speech`: warning logic

The standard logic compares collector temperature and pool surface temperature. `solar.collector_surface_delta` exposes this current difference as a numeric live data point. The pump is requested when the collector is warm enough and the difference is positive. It is not requested when the switch-off temperature falls below the configured threshold or no positive difference exists.

Extended solar control exposes the current difference between collector and selected pool reference via `solar.extended.collector_pool_reference_delta`. The reference is still selected via `solar.extended.pool_temperature_source`.

Note: Changes to the Solar Extended pool reference (`solar.extended.pool_temperature_source`) are applied automatically during runtime. No adapter restart is required. Since Solar Extended operates on a cyclic check interval, updates to the calculation, control logic and the `solar.extended.collector_pool_reference_delta` state may take up to approximately 60 seconds.

Control is only active when:

- the pool season is active
- solar is enabled
- `pump.mode = auto`
- the solar mode is `standard`
- no higher priority exists through `controlHelper` or `timeHelper`

The collector warning sets `solar.collector_warning` when the warning temperature is reached. It is reset automatically when the collector falls to 90 percent of the warning value or below.

## 6. Photovoltaic and PV Surplus Functions

The PV function is located under `photovoltaic.*` and is executed by `photovoltaicHelper`. It reads two external data points from the Admin configuration:

- PV generation power
- House consumption

From this, the adapter calculates:

- `photovoltaic.power_generated_w`
- `photovoltaic.power_house_w`
- `photovoltaic.power_surplus_w`
- `photovoltaic.surplus_active`
- `photovoltaic.status_text`
- `photovoltaic.last_update`

The switch-on logic uses the calculated surplus. A PV surplus is considered active when:

`PV generation - house consumption >= pump.pump_max_watt + photovoltaic.threshold_w`

The pump is only switched when:

- the season is active
- `pump.mode = auto_pv`
- the PV surplus is sufficient
- the optional circulation block does not apply

With `photovoltaic.afterrun_min`, an pump post-run can be configured after the surplus ends. `photovoltaic.ignore_on_circulation` can stop or prevent PV control when the daily circulation target has already been reached.

A special case is the safety override for solar overheating: if `solar.collector_warning` is active, the PV Helper can switch on the pump independently of PV surplus in order to protect the collector.

## 7. Temperature and Sensor Functions

Temperature management processes up to six sensor roles:

- `collector`: collector
- `outside`: outside temperature
- `surface`: pool surface
- `ground`: pool floor
- `flow`: flow
- `return`: return

The sensors are activated in the Admin configuration and connected to external ioBroker object IDs. `temperatureHelper` reads external values and writes them to the adapter's own data points under `temperature.<sensor>.current`.

In addition, the following are calculated:

- Daily minimum and daily maximum per sensor
- Change per hour (`delta_per_hour`)
- `temperature.delta.collector_outside`
- `temperature.delta.surface_ground`
- `temperature.delta.flow_return`

Temperature diagnostics write the last valid value, the timestamp of the last valid value, the minutes since the last update, and a source status for each active sensor role. The source status can make normal, delayed, missing, or invalid updates visible. When a sensor enters warning state, the recovery logic can selectively read the configured foreign state once and, if the value is valid, run it through the normal processing path again.

These values are used by several areas, including solar, Solar Insights, heating, frost protection, statistics, and text outputs.

## 8. Heating and Heat Functions

Heating control is located under `heat.*` and is executed by `heatHelper`. According to the README, this function is in a test phase; however, the control logic is present in the code.

The heating can operate an external switching actuator or a boolean control data point. Important settings and states are:

- `heat.control_active`: heating control active
- `heat.control_type`: type of external target
- `heat.control_object_id`: external control data point
- `heat.target_temperature`: target temperature
- `heat.max_temperature`: maximum safety temperature
- `heat.pump_prerun_minutes`: pump prerun before heating starts
- `heat.pump_afterrun_minutes`: pump post-run after heating ends
- `heat.heating_request`: internal request signal
- `heat.active`, `heat.blocked`, `heat.mode`, `heat.reason`, `heat.info`

Control only operates when:

- the pool season is active
- no maintenance mode is active
- heating control is switched on
- `pump.mode = auto`
- a valid surface temperature is available
- the maximum temperature has not been reached

The Helper switches the pump on when required and internally remembers whether it switched the pump on itself. On shutdown, the pump is only switched off by the heating Helper if it had previously taken ownership itself. This reduces conflicts with other operating modes.

## 9. Statistics, Trend, and Insights Areas

### `analytics.statistics.*`

The statistics area evaluates temperature data. For active sensors, daily values are maintained under `analytics.statistics.temperature.today.*`:

- Minimum
- Maximum
- Average
- Times of minimum and maximum
- Number of measuring points
- JSON and HTML summaries
- Manual daily reset per sensor

In addition, there are weekly and monthly Helpers:

- `statisticsHelperWeek` writes under `analytics.statistics.temperature.week.*`
- `statisticsHelperMonth` writes under `analytics.statistics.temperature.month.*`

Both areas also generate structured summaries for individual sensors and overall outputs.

### Solar Insights

Solar Insights are located under `analytics.insights.solar.*`. This area is used for analysis, not control.

The structure is:

- `analytics.insights.solar.inputs.*`
- `analytics.insights.solar.calculation.*`
- `analytics.insights.solar.results.*`
- `analytics.insights.solar.logbook.*`
- `analytics.insights.solar.debug.*`

The code explicitly describes Solar Insights as an estimate. Depending on availability, collector, pool reference, flow, return, outside temperature, flow rate, and weather data are considered. Among other things, the following are calculated or output:

- used and available sensors
- quality level and confidence value
- pool reference source
- flow source
- thermal power
- estimated daily gain
- estimated efficiency ratio
- active minutes today
- peak power today
- JSON, HTML, and text outputs
- debug reasons and last update

The Solar Logbook function writes current entries, daily log as JSON/text, and HTML entries under `analytics.insights.solar.logbook.*`.

### Photovoltaic Insights

Photovoltaic Insights are located under `analytics.insights.photovoltaic.*`. This area analyzes PV surplus runtimes and is also not its own control logic.

Among other things, the following are recorded:

- PV surplus power
- whether PV surplus is active
- pump power
- whether the PV Helper owns the pump
- runtime today
- energy consumption in PV operation
- estimated savings based on the electricity price
- start count today
- summary as text, JSON, and HTML
- debug texts and reasons

Runtime is only counted when PV surplus is active and `photovoltaicHelper` owns the pump. According to code comments, pump post-runtimes are not counted as PV surplus runtime.

### Pool Insights

Pool Insights are located under analytics.insights.pool.*. This area is a rule-based overall analysis and reads existing PoolControl data from temperature, runtime, pump, solar, photovoltaic, consumption, and chemistry areas. V1 is disabled by default and only creates its own analysis outputs as text, JSON, and HTML.

Pool Insights does not perform control, does not start dosing, and does not switch the pump or actuators. Optionally, the summary can be handed off to speech.queue when the corresponding switch is enabled.

### COP and Efficiency Functions

Efficiency and estimated values are visible in the code especially in the Solar Insights area, such as thermal power, estimated daily gain, and estimated efficiency ratio. A standalone, fully separate COP control for heat pumps is not clearly derivable from the code.

## 10. Speech and Text Outputs

Central output runs via `speech.queue`. Many Helpers write messages to this queue; `speechHelper` processes them further.
The central queue structure prevents competing or duplicate message systems. New speech and text outputs are intentionally intended to run centrally via `speech.queue`.

Important data points are:

- `speech.active`: global activation
- `speech.queue`: central message queue
- `speech.last_text`: last output text
- `speech.start_text`, `speech.end_text`: pump texts
- `speech.solar_active`, `speech.time_active`, `speech.frost_active`: internal context signals
- `speech.amazon_alexa.*`: Alexa quiet times and status

Depending on configuration, the Helper can output via:

- Alexa, via a configured foreign data point
- Telegram, via `sendTo`
- email, via `sendTo`

For Alexa, there are quiet times for weekdays and weekends. While a quiet time is active, Alexa output is blocked; other output channels are not automatically affected by this.

Textoutputs mainly exist as readable States in the respective areas, for example status, debug, AI, Chemistry, Solar Insights, PV Insights, JSON, and HTML outputs. A separate object channel named `textoutputs` is not clearly derivable from the code.

## 11. Chemistry, pH, TDS, and ORP/Redox Areas

The chemistry areas are present and are created when the adapter starts. The areas currently serve analysis, evaluation, and trend observation of water values. They are used for evaluation and recommendations, not for automatic dosing, chlorine control, or automatic actuator control.

### pH Evaluation

The area `chemistry.ph.*` supports:

- Activation of pH evaluation
- Manual pH value
- External ioBroker data point as pH source
- Plausibility check
- Source status
- Measurement location logic
- History of the last and previous valid value
- Evaluation and recommendation texts
- Optional manual mixing run

The code explicitly states: no automatic dosing and no chemical actuator control.

### TDS Evaluation

The area `chemistry.tds.*` supports:

- Activation of TDS evaluation
- Manual TDS value in ppm
- External ioBroker data point as source
- Plausibility check
- Measurement location logic
- Reference value
- History
- Trends over 24 hours, 7 days, and 30 days
- Evaluation based on absolute value, reference deviation, and trend
- Text, JSON, and HTML summaries

Here too, the code states: no automatic control, no automatic dosing, and no pump control.

### ORP/Redox Evaluation

The area `chemistry.orp.*` is present as an analysis and recommendation area. It supports manual values or an external ioBroker data point as ORP source, plausibility checks, measurement location logic, history, trends, evaluation, and text, JSON, and HTML summaries.

The ORP evaluation can use a pH reference and synchronizes it independently from the ORP value. It is intended for classification and recommendations. There is no automatic chlorine control, no automatic dosing, and no automatic pump or actuator control based on the ORP value.

### Two-tier bounded chemistry history

The existing chemistry.ph.history.samples_json, chemistry.tds.history.samples_json, and chemistry.orp.history.samples_json states remain the short-term history. At a 15-minute interval, each state retains at most 7 days, 672 samples, and 64 KB of UTF-8 data. The new internal chemistry.ph.history.daily_json, chemistry.tds.history.daily_json, and chemistry.orp.history.daily_json states form persistent local-calendar-day ring buffers containing min, max, avg, last, and count, with at most 32 entries and 8 KB per state.

The 24h and 7d comparisons use samples_json; the 30d reference preferably uses last from the matching daily aggregate. All existing reference, delta, trend, and summary states remain unchanged. A still-valid scalar 30d reference and safely readable legacy samples seed the daily buffer during its first initialization; afterwards the compact daily aggregate is updated for each newly stored valid sample. Oversized legacy JSON is rejected before parsing. The daily aggregates complement but do not replace raw history. Raw long-term histories still belong in an ioBroker history or time-series database.

If js-controller cannot start because states.jsonl is already oversized, manual or external cleanup is required before the adapter can run.

### ### Chemistry Tools

PoolControl includes simple chemistry calculators as helper tools for manual pool maintenance. These calculators are intended solely for calculation and informational purposes. No chemicals are dosed automatically.

**Currently included:**

- **pH Plus Calculator**

  - Calculates the required amount of pH Plus
  - Considers pool volume, current pH value and target pH value
  - All input values can be adjusted manually

- **pH Minus Calculator**

  - Calculates the required amount of pH Minus
  - Considers pool volume, current pH value and target pH value
  - All input values can be adjusted manually

- **Salt Calculator**

  - Calculates the required amount of salt in kilograms
  - Considers pool volume, current salt concentration and target salt concentration
  - All input values can be adjusted manually

**Features:**

- Prefills available PoolControl values (e.g. pool volume)
- Input values can always be overwritten manually
- Plausibility checks and error detection
- Result texts with additional information
- No automatic chemical dosing
- Calculation and information purposes only


## 12. Hardware, MQTT, and ESP32 Integration

The existing implementation connects external hardware mostly via freely configurable ioBroker object IDs:

- Pump socket
- Current pump power
- Temperature sensors
- Pressure sensor
- PV generation
- House consumption
- Heating actuator
- Solar Extended actuator
- Lighting and extra pumps

Additional actuators are available under `actuators.*`. They include lighting, extra pumps, and follow-pump devices. Follow-pump devices can automatically couple external devices to the pump status. External target states are validated, including existence, boolean type, and writeability. Typical examples are UV systems, water features, and auxiliary filters.

Pressure sensor integration is implemented. The Admin hint explicitly mentions external sensors and a PoolControl PressureBox. `pump.pressure.*` contains current pressure, previous pressure, normal range, learned values, trend values, diagnostics, and reset.

MQTT/ESP32 integration is mentioned in the development notes as `mqttNodeHelper.js` for external PoolControl nodes. A corresponding Helper file is not present in the current project state. Therefore, this area should be considered preparation or planning.

Prepared or planned hardware boxes:

- PressureBox: visibly supported or prepared in the configuration hint and pressure area
- TempBox, LevelBox, and additional sensor boxes: mentioned in README/development notes as planned extensions
- AquaBox: Not clearly derivable from the code

## 13. VIS, HTML, and Widget Areas

The adapter generates many data points that can be used directly in VIS, VIS2, Blockly, or dashboards. These include status, runtime, temperature, statistics, chemistry, solar, and PV outputs.

HTML outputs are present in several analysis areas:

- Temperature statistics
- Solar Insights
- Solar Logbook
- Photovoltaic Insights
- pH evaluation
- TDS evaluation
- ORP/Redox evaluation

JSON outputs are also present, especially for:

- Status overviews
- Statistics summaries
- Solar Insights
- Photovoltaic Insights
- pH evaluation
- TDS evaluation
- ORP/Redox evaluation

The current focus is on providing structured data points, HTML outputs, and JSON summaries for free use in VIS, Blockly, or other dashboard systems.

## 14. Diagnostics and Debug Functions

The central diagnostic area is named `SystemCheck.debug_logs.*`.

It provides:

- Selection of a target area via `SystemCheck.debug_logs.target_area`
- Continuous log under `SystemCheck.debug_logs.log`
- Clear function via `SystemCheck.debug_logs.clear`
- Monitoring for very fast state changes
- Limiting the log size to approximately the last 60,000 characters

In addition, many area-specific status and debug data points exist, for example:

- `status.summary`
- `status.overview_json`
- `status.system_ok`
- `status.system_warning`
- `status.system_warning_text`
- `pump.status`
- `pump.error`
- `solar.extended.reason`
- `solar.extended.info`
- `analytics.insights.solar.debug.*`
- `analytics.insights.photovoltaic.debug.*`

Additional diagnostic values for the circulation calculation are stored under `circulation.plausibility`. They expose status, severity level, message key, power/flow/jump warnings, and the related comparison values. These values help troubleshoot unusual circulation values but do not perform any automatic correction.

The adapter also has a `migrationHelper`, which is executed last before the Helpers during startup and prepares structure/update adjustments. Details of its concrete migrations are not evaluated individually in this overview.

## 15. Export and Analysis Functions

Mainly internal analysis outputs are implemented:

- JSON summaries
- HTML summaries
- Text summaries
- Daily, weekly, and monthly statistics
- Solar and PV Insights
- pH evaluation
- TDS trend evaluation
- ORP/Redox evaluation
- Status overview as JSON

A direct CSV or Excel export is mentioned in README and development notes as a planned extension. A finished CSV export function is not clearly derivable from the current code.

## 16. Requirements and Typical Usage

Technical requirements according to the project files:

- Node.js `>= 22`
- ioBroker js-controller `>= 6.0.11`
- ioBroker Admin `>= 7.6.20`
- Adapter runs as a JavaScript/Node.js daemon
- Mostly Helper- and event-based processing

Typical setup:

- Set pool size and minimum circulation in the general settings
- Configure pump socket and optionally power data point
- Set up temperature sensors as needed, especially for solar, heating, frost protection, and analysis functions
- Select desired pump mode
- Activate solar, PV, time control, heating, and frost protection as needed
- Enable Speech outputs only when Alexa/Telegram/E-Mail are configured correctly
- Integrate analysis areas in VIS or dashboards via JSON/HTML/text States

## 17. Important Notes and System Limits

- The adapter can switch real hardware. Safe electrical and hydraulic installation is outside the code and must be ensured by the operator.
- Chemistry pH, TDS, and ORP/Redox are evaluation and recommendation systems. No automatic dosing or automatic chlorine control takes place.
- Solar Insights and Photovoltaic Insights are analysis areas. They do not replace calibrated energy meters.
- Solar Insights values are implemented in the code as estimates and depend heavily on sensor quality, flow values, and available temperature data.
- PV Insights only counts PV surplus operation when `photovoltaicHelper` owns the pump.
- Own VIS widgets, CSV/Excel export, and MQTT/ESP32 nodes are recognizable as planning or preparation, but are not present as finished modules in the current code.
- For functions that use external object IDs, behavior depends on correctly configured ioBroker data points and suitable roles/values.

## 18. Summary for New Users

PoolControl is a modular pool adapter that manages the pump as the central element and organizes solar, PV, time control, frost protection, heating, sensors, statistics, and messages around it.

For getting started, the following is usually sufficient:

- Configure pump socket
- Set pool size and circulation target
- Set up temperature sensors as needed, especially for solar, heating, frost protection, and analysis functions
- Select desired pump mode
- Then gradually activate solar, PV, heating, Speech, and analyses

The most important states for everyday use are `pump.status`, `pump.pump_switch`, `pump.mode`, `pump.active_helper`, `status.summary`, `circulation.daily_remaining`, `solar.request_active`, `photovoltaic.surplus_active`, and the outputs under `analytics.*`.

Prepared or planned areas are visible in the project but should not be confused with fully finished functions. Especially MQTT/ESP32 nodes, native VIS widgets, and CSV/Excel export should be classified as planning or preparation based on the current code state.