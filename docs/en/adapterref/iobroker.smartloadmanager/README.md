---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.smartloadmanager.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.smartloadmanager.svg
BADGE-Number of Installations: https://iobroker.live/badges/smartloadmanager-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/smartloadmanager-stable.svg
BADGE-NPM: https://nodei.co/npm/iobroker.smartloadmanager.png?downloads=true
---
![Logo](../../admin/smartloadmanager.png)

# ioBroker.smartloadmanager

## 🔧 Description

The **smartloadmanager** adapter dynamically controls consumers based on a PV feed-in value.  
The goal is to consume surplus power locally and minimize or completely avoid feeding into the public grid.  
It supports binary consumers, percentage-controllable devices, and battery storage systems.

---

## 🚀 Features

- ✅ Monitoring of a configurable feed-in datapoint
- ✅ Dynamic switching on of consumers in case of surplus
- ✅ Dynamic switching off in case of deficit or grid consumption
- ✅ Supports **binary**, **percent**, **heating** and **battery** consumers
- ✅ Percentage control with delay (smooth down-regulation), optionally configurable per consumer
- ✅ Dynamic charging power for battery storage with target SOC
- ✅ Time windows for on/off logic per consumer (incl. "only at off-time")
- ✅ Automatic object creation with extended information per consumer
- ✅ Control mode: Off / Manual On / Auto per consumer
- ✅ Hysteresis control via separate on/off thresholds
- ✅ Consumer-specific switching delay (override of global setting)
- ✅ Global battery switching delay (`batteryDelaySeconds`)
- ✅ Write check for battery control mode (debug output in log)
- ✅ **Delayed switching via timers** for on and off
- ✅ **Display of active timers in debug log** with remaining time
- ✅ Optional **notifications** for binary, percent, battery and heating (Telegram / Gotify)
- ✅ Optimization for 0/1 datapoints (boolean or numeric 0/1 control)
- ✅ Detailed logging of all timers, surpluses and switching operations
- ✅ Notifications per consumer type (Binary, Percent, Battery, Heating), optionally enabled
- ✅ Heating/immersion heater control with temperature, enable and heartbeat checks

---

## ⚙️ Configuration

### 🔹 Main settings

| Setting                            | Description                                                                     |
| ---------------------------------- | ------------------------------------------------------------------------------- |
| **Feed-in datapoint**              | Object ID of the feed-in value (e.g. PV surplus)                                |
| **Base load**                      | Always subtracted from feed-in value (e.g. standby consumption)                 |
| **Switch-on threshold**            | Threshold in watts at which consumers are switched on                           |
| **Switch-off threshold**           | Threshold in watts at which consumers are switched off                          |
| **Delay (seconds)**                | Delay for binary switching (hysteresis smoothing)                               |
| **Delay percent (s)**              | Global delay for down-regulation of percent consumers (e.g. wallbox)            |
| **Delay battery (s)**              | Global delay for battery control                                                |
| **Feed-in negative**               | If active: negative = feed-in / positive = grid consumption                     |
| **Battery control mode datapoint** | Optional datapoint for battery mode switching (Auto/Manual/Off)                 |
| **Notifications**                  | Enable notifications for Binary / Percent / Battery / Heating (Telegram/Gotify) |

---

### 🔹 Consumers

| Field                               | Description                                                           |
| ----------------------------------- | --------------------------------------------------------------------- |
| **Name**                            | Display name                                                          |
| **Active**                          | Enables control for this consumer                                     |
| **Rule type**                       | `"binary"`, `"percent"`, `"battery"`, `"heating"`                     |
| **Control datapoint**               | ID to switch or regulate, supports 0/1 datapoints                     |
| **Power [W]**                       | Realistic electrical power of the consumer                            |
| **Switch-on threshold [W]**         | Required surplus for activation                                       |
| **Switch-off threshold [W]**        | Lower limit for deactivation                                          |
| **Max power [W]**                   | Reference value for percentage control                                |
| **Delay percent [s]**               | Optional delay for down-regulation for this consumer only             |
| **Delay override [s]**              | Consumer-specific switching delay (e.g. immediate switching possible) |
| **Switch-on time (HH:MM)**          | Time when control may start                                           |
| **Switch-off time (HH:MM)**         | Time when control must end                                            |
| **Only off at time**                | Checkbox: switch off only at configured time                          |
| **batterySetpoint (battery only)**  | Datapoint where desired charging power is written                     |
| **batterySOC / targetSOC**          | Optional: SOC & target SOC to stop charging at target                 |
| **Timer / TimerEnd**                | Internal timer for delayed switching, remaining time visible in log   |
| **minTemperature / maxTemperature** | Lower/upper threshold for heating operation                           |
| **temperatureDatapoint (heating)**  | Temperature datapoint for min/max checks                              |
| **enableDatapoint (heating)**       | Optional datapoint: heating only allowed if true                      |
| **heartbeatDatapoint (heating)**    | Optional: must cyclically deliver true, otherwise switched off        |

---

## 🔋 Battery storage support

- Consumers with `"ruletype": "battery"` control the charging setpoint based on current surplus.
- If `batterySOC` and `batteryTargetSOC` are set, charging stops at target SOC.
- Optional `batteryControlModeDatapoint`:
    - `0 = Off`, `1 = Manual`, `2 = Auto`
- Control is only active within configured time windows.
- Control runs on every feed-in update, after configured delay (`batteryDelaySeconds`).
- Delays for all consumer types (binary, percent, battery) can be set globally or per consumer.
- Detailed logging and optional notifications for battery switching.

---

## 🌡️ Heating support

- Consumers with `"ruletype": "heating"` are intended for immersion heaters or similar devices.
- Control only occurs when:
    - Current temperature is below `maxTemperature`
    - Optional: above `minTemperature`
    - Optional: `enableDatapoint` is active
    - Optional: `heartbeatDatapoint` is valid
- If conditions are not met, switching is stopped immediately and timers are canceled.
- Supports on/off timers (`onTimerRemaining` / `offTimerRemaining`) with remaining time display.
- Detailed logging and optional notifications for heating consumers.

---

## 🧠 Control logic

1. **Feed-in datapoint value is interpreted** (positive = grid consumption or feed-in, depending on config)
2. **Surplus > base load + switch-on threshold**:  
   → Consumers are switched on (binary) in ascending order of power
3. **Deficit < base load - switch-off threshold**:  
   → Consumers are switched off in reverse order
4. **Percent consumers**:  
   → % = surplus / max power  
   → Adjusted after delay (global or per consumer)  
   → Optional overrides possible
5. **Battery consumers**:  
   → Charging power = min(surplus, max power), if target SOC not reached  
   → Delay via `batteryDelaySeconds` or per consumer
6. **Time window check for all consumers**
7. **Control only in mode Auto (2)**
8. **Delayed switching via timers** (cancel/restart on updates, remaining time visible in log)
9. **Optional notifications for all switching/regulation types**
10. **0/1 datapoint optimization** (boolean or numeric 0/1 supported)
11. **Detailed logging of all switching and surplus values**
12. **Heating logic**: switch only within temp ranges and with valid enable/heartbeat datapoints

---

## 💡 Example: Wallbox

| Parameter | Value   |
| --------- | ------- |
| Feed-in   | 1000 W  |
| Base load | 100 W   |
| Max power | 11000 W |

**Calculation:**

- Surplus: 1000 – 100 = 900 W
- Percent: 900 / 11000 ≈ 8.2 % → Wallbox set to 8 %

---

## 📋 Object structure

Each consumer gets its own channel with the following states:

- `.controlMode` → 0 = Off, 1 = Manual, 2 = Auto
- `.switchOnTime` / `.switchOffTime`
- `.alwaysOffAtTime` → true/false
- `.performance`, `.switchOnPoint`, `.switchOffPoint`
- `.batterySetpoint` (battery only)
- `.temperatureDatapoint` (heating only)
- `.onTimerRemaining / .offTimerRemaining` → Remaining time for timers
- `.timer` → internal timer for delayed switching
- `.timerEnd` → timestamp when timer expires (for log)

---

## 🚫 Limitations

- No SOC history, no long-term logic
- No multiple use of identical datapoints
- Battery control based only on feed-in, not discharge power
- No minimum percentage for percent consumers (e.g. 10 % min for wallbox)
- Heating without direct power measurement – only thresholds and enable checks

---

## 🛣️ Future features

- PV forecast-based control (beta)
- Combined consumer support
- ~~Prioritization profiles~~
- Overheating or fault handling per device
- ~~Min/max percentage limits~~
- Configurable group or room logic

---

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.0.7 (2025-09-09)

- (quorle) modified Readme
- (quorle) German and English description created
- (quorle) chore: cleanup devDependencies
- (quorle) Add "label" to jsonConfig.json everywhere
- (quorle) Fixed bugs in timeouts in functions
- (quorle) setTimeout/setInterval allowed maximum values ​​implemented
- (quorle) adapter-core 3.2.3 to 3.3.2 updated
- (quorle) eslint-config 2.0.2 to 2.1.0 updated
- (quorle) testing 5.0.4 to 5.1.0 updated

### 0.0.6 (2025-09-03)

- (quorle) Adjustments package.json
- (quorle) Code changed

### 0.0.3 (2025-09-03)

- (quorle) Adjustments package.json
- (quorle) Code changed

### 0.0.2 (2025-09-03)

- (quorle) Adjustments package.json
- (quorle) Code changed

### 0.0.1 (2025-09-02)

- (quorle) Release

## License

MIT License

Copyright (c) 2025 quorle <quorle12@gmail.com>

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