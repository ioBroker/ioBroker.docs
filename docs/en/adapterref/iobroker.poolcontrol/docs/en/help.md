---
chapters: {"pages":{"en/adapterref/iobroker.poolcontrol/README.md":{"title":{"en":"ioBroker.poolcontrol"},"content":"en/adapterref/iobroker.poolcontrol/README.md"},"en/adapterref/iobroker.poolcontrol/docs/en/help.md":{"title":{"en":"PoolControl – Help & Documentation"},"content":"en/adapterref/iobroker.poolcontrol/docs/en/help.md"},"en/adapterref/iobroker.poolcontrol/docs/en/function_overview.md":{"title":{"en":"PoolControl – Function Overview"},"content":"en/adapterref/iobroker.poolcontrol/docs/en/function_overview.md"}}}
---
<!-- PoolControl Help File – maintained manually. Do NOT remove this header. -->

# PoolControl – Help & Documentation

Welcome to the help file of the adapter **ioBroker.poolcontrol**.  
This documentation explains all settings, data points, and automatic functions of the adapter in a mix of understandable explanations and technical details.

---

# 📚 Table of Contents

   - [3.1 General Settings](#31-general-settings)  
   - [3.2 Pump](#32-pump)  
   - [3.3 Temperature Management](#33-temperature-management)  
   - [3.4 Solar Management](#34-solar-management)  
   - [3.5 Photovoltaics (PV)](#35-photovoltaics-pv)  
   - [3.6 AI System](#36-ai-system)  
   - [3.7 Speech Outputs](#37-speech-outputs)  
   - [3.8 Time Control](#38-time-control)  
   - [3.9 Debug & SystemCheck](#39-debug--systemcheck)  

---

# 1. Introduction & Basic Principles

The PoolControl adapter automates and monitors your entire pool system:

- Pump control  
- Temperature management  
- Solar control  
- Photovoltaic support  
- Pressure sensor analysis  
- Consumption and cost tracking  
- Status and diagnostic functions  
- AI-based weather and pool hints  
- Backwashing, maintenance mode and post-pumping  

All data points are structured in the object tree and are available for VIS, Blockly, and other adapters.

---

# 2. Overview – What does the adapter do?

### ✔ Fully automatic pump control  
Solar, PV, frost, time mode, maintenance, backwashing, post-pumping.

### ✔ Temperature evaluation  
Up to 6 sensors with minimum/maximum values and differences.

### ✔ Solar control with hysteresis  
Automatic switching on/off of the pump.

### ✔ Photovoltaic mode  
The pump runs when there is PV surplus.

### ✔ Editable circulation factor
`general.min_circulation_per_day` is the writable and persistent base circulation factor (0.5 to 3.0). The Admin value is only an initial value; changes affect `circulation.daily_required` and `circulation.daily_remaining`.

Optionally, `control.circulation.temperature_factor.*` increases the effective factor from a configured temperature threshold. The base value remains unchanged, the effective value is exposed as `general.min_circulation_effective_per_day`, and is capped at `3.0`. The selected temperature sensor must be enabled and provide a valid value.

### ✔ Pressure sensor integration  
Trend, learning values, normal range, diagnostics.

### ✔ Reset pump learning values
`pump.learning.reset` resets learned pump values after pump changes or incorrect learning. `pump.learning.tolerance_percent` is kept; learning remains passive and does not switch the pump.

### ✔ AI System  
Daily summaries, weather hints, pool tips, weekend reports.

### ✔ Consumption & Costs  
Automatic daily, weekly, monthly, and yearly statistics.

### ✔ Status system  
Central overview for visualization.

---

# 3. Admin Configuration (Tabs)

Configuration is done via multiple tabs in the instance.

---

## 3.1 General Settings

**Pool name**  
Pure display text.

**Pool size (liters)**  
Used for circulation calculation.

**Minimum circulation factor per day**  
Example: 2 means the entire pool volume should be circulated twice per day.

**Season active**  
Important for automatic functions:  
- **true**: All automations active  
- **false**: Automation off, only frost protection remains active  

The actual state is located in the object tree under `status.season_active`.

---

## 3.2 Pump

**On/Off:**  
→ `pump.pump_switch`  

**Mode:**  
→ `pump.mode`  

Possible values:  
- `auto`  
- `manual`  
- `time`  
- `off`  
- `controlHelper` (set automatically by the adapter)  
- `pv` (Photovoltaic mode)

**Additional settings:**  
- Maximum power (watts)  
- Maximum flow rate (l/h)  
- Object ID of the socket  
- Frost protection active + temperature value  

---

## 3.3 Temperature Management

Up to 6 sensors:

- Surface  
- Bottom  
- Flow  
- Return  
- Collector  
- Outside temperature  

For each sensor:

- Checkbox “use”  
- Select object ID  

Temperature values are used for:

- Solar control  
- Frost protection  
- Diagnostics  
- AI texts  

---

## 3.4 Solar Management

Settings:

- Enable solar control  
- Enable hysteresis  
- Switch-on threshold (`temp_on`)  
- Switch-off threshold (`temp_off`)  
- Enable solar warnings  

Solar control works only in **auto** mode.

Additional live data points expose the current difference `solar.collector_surface_delta` for standard solar and `solar.extended.collector_pool_reference_delta` for Solar Extended. These values are intended for VIS, scripts, dashboards, and evaluations.

Note: Changes to the Solar Extended pool reference (`solar.extended.pool_temperature_source`) are applied automatically during runtime. No adapter restart is required. Since Solar Extended operates on a cyclic check interval, updates to the calculation, control logic and the `solar.extended.collector_pool_reference_delta` state may take up to approximately 60 seconds.

---

## 3.5 Photovoltaics (PV)

Settings:

- PV automation active  
- Object ID of current PV power  
- Switch-on threshold (e.g., 150 W surplus)

If active:

- Pump mode shows “Automatic (PV)”  
- Pump runs with PV surplus  
- Automatically switches off when below threshold  

---

## 3.6 AI System

### **Main switch (ai.enabled)**

| Data point | Meaning |
|------------|----------|
| ai.enabled | Main switch for the entire AI system |

The AI system currently consists of two modules:

- aiHelper (weather & daily functions)
- aiForecastHelper (forecast for tomorrow)

The AI system automatically generates daily:

- Weather hints  
- Daily summaries  
- Pool tips  
- Weekend reports  
- Forecast for tomorrow  

### **Switches (ai.weather.switches.)**

| Data point | Meaning |
|------------|----------|
| ai.weather.switches.allow_speech | Also outputs to `speech.queue` |
| ai.weather.switches.daily_summary_enabled | Daily summary |
| ai.weather.switches.daily_pool_tips_enabled | Pool tips |
| ai.weather.switches.weather_advice_enabled | Weather hints |
| ai.weather.switches.weekend_summary_enabled | Weekend report |
| ai.weather.switches.debug_mode | Additional log entries |
| ai.weather.switches.tomorrow_forecast_enabled | Forecast for tomorrow active |

### **Schedules (ai.weather.schedule.)**

- daily_summary_time  
- daily_pool_tips_time  
- weather_advice_time  
- weekend_summary_time  
- tomorrow_forecast_time  

All values in HH:MM format.

### **Outputs (ai.weather.outputs.)**

Texts appear here that can be used by VIS or other adapters.

The AI system requires geodata from **system.config**.

---

## 3.7 Speech Outputs

- Enable speech  
- Texts for pump start/stop  
- Last speech output  
- Optional: Enable email notification  
- All outputs are sent via **speech.queue**

---

## 3.8 Time Control

Up to **three time windows**:

- Start time  
- End time  
- Weekdays  
- optional interval operation with interval period and run time

Only active if `pump.mode = time`.

Interval operation is enabled separately for each window through `timecontrol.timeX_interval_active`. By default, the pump starts every 60 minutes and runs for 15 minutes; the cycle is always anchored to the window start time. With interval operation disabled, the existing continuous operation remains unchanged.

Overlapping windows use OR logic: the pump remains on whenever at least one window currently requests operation. An interval logically ends no later than the exclusive end time; because the existing 60-second check remains unchanged, the physical switch may be delayed by almost 60 seconds. Invalid interval values are not modified and fall back to continuous operation within the window. `timecontrol.status_text` shows the current diagnostic state.

---

## 3.9 Debug & SystemCheck

The section `systemcheck.debug_logs` provides:

- Selection of a target area (pump, solar, runtime, control, etc.)  
- Continuous log  
- Clear log  

This is used for diagnostics but should remain disabled during normal operation.

---

# 4. Object Tree – Data Points Explained

### The most important main areas:

- `pump.*`  
- `pump.pressure.*`  
- `temperature.*`  
- `solar.*`  
- `photovoltaic.*`  
- `runtime.*`  
- `circulation.*`  
- `consumption.*`  
- `control.*`  
- `status.*`  
- `info.*`  
- `ai.*`  
- `systemcheck.*`

The structure is designed to be self-explanatory in the object tree.  
All states have descriptive names and descriptions.

### **Plausibility Check for Circulation Calculation**
The channel `circulation.plausibility` contains diagnostic values for the circulation calculation. PoolControl checks whether the measured pump power, the calculated flow rate, or jumps in the daily circulation volume appear implausible.

This diagnostic module is analysis-only. It does not correct values automatically and does not change pump control, PV logic, solar logic, or the circulation calculation. The stored states help troubleshoot unusual circulation values, such as sudden jumps in the daily total.

---

# 5. Automatic Logics & Helpers

The adapter contains various helper files responsible for specific tasks.

### **PumpHelper**
Controls basic pump functions.

### **PumpHelper4 (Pressure Sensor)**
Processes:
- Current pressure  
- Previous value  
- Trend (rising/falling/stable)  
- Learning system for min/max  
- Diagnostic text  

### **SolarHelper**
Controls solar operation including hysteresis.

### **PhotovoltaicHelper**
Automatic pump control based on PV surplus.

### **FrostHelper**
Automatically switches on the pump below the configured temperature.

### **RuntimeHelper**
Calculates runtime and circulation.
It also writes analysis-only diagnostic values under `circulation.plausibility` to make implausible input or calculation values visible.

### **ConsumptionHelper**
Daily, weekly, monthly, and yearly consumption.

### **ControlHelper**
Functions:
- Backwashing  
- Maintenance mode  
- Post-pumping (circulation check)  
- Notifications  

Automatic additional pumping is used to reach the daily circulation target. It generally does not require temperature values. If solar control is active and both collector and pool temperatures are valid, additional pumping is blocked as long as the collector is not warmer than the pool.

### **InfoHelper**
- Adapter version  
- Seasonal greetings including Easter calculation  

### **AI-Helper**
- Weather retrieval (Open-Meteo)  
- Text generation  
- Schedules  
- Anti-spam logic  

### **DebugLogHelper**
- Real-time monitoring of specific areas  

---

# 6. Error Detection & Warnings

The adapter automatically detects:

- Dry run  
- Overload  
- Power despite OFF  
- Pressure deviations  
- Solar warnings  
- Backwash reminders  

Errors are displayed in `pump.error` and `pump.status`.

---

# 7. Speech Outputs & Notifications

All speech outputs are sent via `speech.queue`.  
Depending on configuration, emails can also be sent.

---

## Two-tier bounded chemistry history

The existing pH, TDS, and ORP samples_json states remain the 15-minute short-term history: at most 7 days, 672 samples, and 64 KB of UTF-8 data per state. For the existing 30-day evaluations, the adapter additionally stores one internal daily_json ring buffer of local calendar days per chemistry type, containing min, max, avg, last, and count, with at most 32 entries and 8 KB.

The 24h and 7d comparisons use samples_json; the 30d comparison preferably uses last from the matching daily_json aggregate. All existing reference, delta, trend, and summary states remain available. During initial setup, a still-valid existing scalar 30d reference and safely readable legacy samples seed the daily buffer; afterwards it is updated for each newly stored valid sample. Oversized legacy values are discarded before JSON parsing. The compact daily aggregates do not replace raw history. Raw long-term data belongs in an ioBroker history or time-series database.

If an already oversized states.jsonl prevents js-controller from starting, it must first be repaired manually or with external recovery tools. The adapter can only handle this condition after the controller has started successfully.

# 8. FAQ & Tips

**1. Why does nothing happen although AI is active?**  
→ Check whether system.config contains latitude/longitude.

**2. Why does the pump not switch on despite solar?**  
→ Mode must be **auto**.

**3. Why is PV not running?**  
→ Check threshold → PV must be above this value.

**4. Why does the pressure sensor show 0 bar?**  
→ Check the object ID in the Admin configuration.

---

**End of file**