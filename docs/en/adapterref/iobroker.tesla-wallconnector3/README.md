---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.tesla-wallconnector3.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.tesla-wallconnector3.svg
BADGE-Number of Installations (latest): http://iobroker.live/badges/tesla-wallconnector3-installed.svg
BADGE-Number of Installations (stable): http://iobroker.live/badges/tesla-wallconnector3-stable.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/nobl/ioBroker.tesla-wallconnector3/badge.svg
BADGE-NPM: https://nodei.co/npm/iobroker.tesla-wallconnector3.png?downloads=true
BADGE-WERO: https://img.shields.io/badge/WERO-8A2BE2
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-00457C?logo=paypal&logoColor=white
BADGE-Buy Me a Coffee: https://img.shields.io/badge/Buy%20Me%20a%20Coffee-FFDD00?logo=buymeacoffee&logoColor=black
BADGE-GitHub Sponsor: https://img.shields.io/badge/Sponsor-GitHub-181717?logo=github&logoColor=white
---
# <img src="/admin/tesla-wallconnector3.png" width="36" align="top" alt=""> ioBroker.tesla-wallconnector3

## Tesla Wall Connector Gen 3 adapter for ioBroker

Reads live data from a Tesla Wall Connector Gen 3 on your local network. All states are read-only (the wallbox API does not support write access).

## Configuration

### Settings
![Main Settings](media/mainSettings.png "Main Settings")

| Field | Description |
|:------|:------------|
| Tesla Wall Connector Gen 3 | IP address or hostname of your wallbox (e.g. `192.168.1.50` or `wallbox.local`). Enter only the bare address — no scheme (`http://`), port, path, credentials, or bracketed IPv6. An empty field or `0.0.0.0` is treated as unconfigured and prevents polling. |
| Polling Interval | How often the adapter reads data from the wallbox, in seconds. Default: 10. Range: 1 - 3600. |
| Request Timeout | Maximum time to wait for a response from the wallbox, in milliseconds. Default: 5000. Range: 1000 - 10000. |
| Polling Retries | How many times to retry after a failed request. The value means retry attempts after the initial failure. 0 = no retries, 999 = unlimited. Default: 10. |
| Polling Retry Factor | Spaces retries further apart. The n-th retry waits interval x factor x n seconds after the previous attempt. Example with defaults: 1st retry after 20 s, 2nd after 40 s. Resets after a successful read. Default: 2. Range: 1 - 10. |
| Split-phase power calculation | Enable for North American split-phase installations. Uses grid_v x vehicle_current_a instead of per-phase voltage x current sums. Default: disabled (three-phase calculation). |

After saving, the adapter restarts and begins polling immediately.

## States

All states are read-only. The adapter polls the wallbox API and creates states for each value returned.

### info

| State | Type | Description |
|:------|:----:|:------------|
| info.connection | boolean | `true` when the adapter can reach the wallbox and receives valid responses. |

### vitals

Live operational data, polled every interval.

| State | Type | Description |
|:------|:----:|:------------|
| evse_state | number | Charging state (see table below) |
| vehicle_connected | boolean | Whether a vehicle is plugged in |
| vehicle_current_a | number | Current drawn by the vehicle (A) |
| session_energy_wh | number | Energy delivered in the current session (Wh) |
| power_w | number | Charging power (W), calculated by the adapter. Three-phase mode: sum of V x A per phase. Split-phase mode: grid_v x vehicle_current_a. |
| session_s | number | Duration of the current charging session (s) |
| contactor_closed | boolean | Whether the charging relay is closed |
| grid_v | number | Grid voltage (V) |
| grid_hz | number | Grid frequency (Hz) |
| voltageA_v, voltageB_v, voltageC_v | number | Voltage per phase (V) |
| currentA_a, currentB_a, currentC_a, currentN_a | number | Current per phase (A) |
| pcba_temp_c, mcu_temp_c, handle_temp_c | number | Temperature readings (°C) |
| relay_coil_v | number | Relay coil voltage (V) |
| relay_k1_v | number | Relay K1 voltage (V) |
| relay_k2_v | number | Relay K2 voltage (V) |
| prox_v | number | Proximity pilot voltage (V) |
| pilot_high_v | number | Control pilot high voltage (V) |
| pilot_low_v | number | Control pilot low voltage (V) |
| input_thermopile_uv | number | Thermopile sensor reading |
| config_status | number | Configuration status |
| uptime_s | number | Wallbox uptime (s) |
| current_alerts | string (JSON) | Active alerts as a JSON array (e.g. `"[]"`). Numeric child states (`.0`, `.1`, ...) are kept for backward compatibility and cleaned up automatically when the array shrinks. |
| evse_not_ready_reasons | string (JSON) | Reasons the wallbox is not ready, as a JSON array. Child states like current_alerts. |

**EVSE state codes:**

| Code | Meaning |
|:----:|:--------|
| 0 | Booting |
| 1 | Idle |
| 2 | Vehicle connected but not ready to charge |
| 4 | Vehicle connected and ready to charge |
| 6 | Vehicle plugged in, handshake in progress |
| 8 | Charging completed or interrupted |
| 9 | Ready to charge, waiting for the vehicle |
| 10 | Charging at reduced power (less than 3 phases, 16 amps each) |
| 11 | Charging at full power (3 phases, 16 A each) |

*States 3, 5, 7, and 12 are undocumented. If you know what they mean, pull requests are welcome!*

### lifetime

Cumulative statistics over the lifetime of the wallbox. Polled no more than once per 60 seconds.

| State | Type | Description |
|:------|:----:|:------------|
| energy_wh | number | Total energy delivered (Wh) |
| charge_starts | number | Number of charging sessions started |
| charging_time_s | number | Total time spent charging (s) |
| uptime_s | number | Total uptime (s) |
| contactor_cycles | number | Number of relay open/close cycles |
| connector_cycles | number | Number of plug-in/plug-out cycles |
| alert_count | number | Total number of alerts |

### version

Firmware and hardware identification. Polled at startup, after reconnection, and no more than once per hour.

| State | Type | Description |
|:------|:----:|:------------|
| firmware_version | string | Firmware version |
| serial_number | string | Serial number |
| part_number | string | Part number |

Additional states like `git_branch`, `web_service`, and IEEE 1547 CRC checksums may appear depending on firmware version.

### wifi_status

WiFi connection details. Polled no more than once per 60 seconds.

| State | Type | Description |
|:------|:----:|:------------|
| wifi_connected | boolean | Whether the wallbox is connected to WiFi |
| internet | boolean | Whether the wallbox has internet access |
| wifi_ssid | string | Connected SSID |
| wifi_infra_ip | string | IP address on the WiFi network |
| wifi_mac | string | MAC address |
| wifi_signal_strength | number | Signal strength (unitless quality value, higher is better) |
| wifi_rssi | number | RSSI (dBm) |
| wifi_snr | number | Signal-to-noise ratio (dB) |

*The adapter dynamically creates states for all values returned by the API. Your wallbox may report additional states not listed here, depending on firmware version.*

## Polling behaviour

The adapter staggers requests to avoid overloading the wallbox's embedded web server:

| Endpoint | Frequency |
|:---------|:----------|
| vitals | Every polling interval |
| lifetime | At most every 60 seconds |
| wifi_status | At most every 60 seconds |
| version | At startup, after reconnection, and at most once per hour |

Requests are sent one at a time (sequentially). If a single endpoint fails, the other endpoints are still processed normally. Failed endpoints are retried on the next eligible cycle.

The adapter automatically repairs known Tesla firmware JSON defects (bare `nan` values, missing closing brace) before parsing responses.

## Disclaimer

**All product and company names or logos are trademarks™ or registered® trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them or any associated subsidiaries! This personal project is maintained in spare time and has no business goal.**

**The default settings should be safe for normal use.** Shortening the polling interval can overload the Wall Connector's embedded web server; if the wallbox stops responding, increase the interval or stop the adapter.

**No warranty, and no liability.** This adapter is a spare-time project, provided as-is under the MIT license. It reads data from a Tesla Wall Connector over a local, undocumented API. The author accepts no liability for any consequence of using it, and cannot tell you whether using it affects your warranty or support arrangements with Tesla or your installer. If that is not acceptable to you, please do not use this adapter.

## Changelog
<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- Dependency updates

### 1.3.0 (2026-08-04)
- Added North American split-phase power calculation mode (splitPhase setting)
- Added recovery for malformed wallbox responses (bare nan, Infinity, and truncated data)
- Added address validation: clearer error messages for misconfigured wallbox addresses
- Added 2 MiB response size limit
- Fixed connection status flapping when the wallbox was partially reachable
- Fixed charging power (power_w) sometimes showing a stale value after charging stops — now always 0 when not charging
- Fixed handling of additional malformed sensor readings from certain firmware versions
- Fixed unavailable sensor readings showing as empty instead of 0
- Fixed state types sometimes changing unexpectedly, including after adapter restart
- Fixed alerts and not-ready reasons not updating correctly when the list changes
- Fixed all data refreshing immediately after connection loss recovery
- Fixed retry count being off by one compared to the configured value
- Fixed rare state updates still happening briefly after adapter shutdown
- Fixed timeout help text showing wrong maximum (now correctly shows 10000 ms)
- Fixed wallbox requests failing on systems with an HTTP proxy configured
- Corrected WiFi signal strength metadata
- Fixed database errors no longer triggering unnecessary reconnection attempts
- Reduced load on wallbox: version data polled hourly, WiFi and lifetime data every 60 seconds
- Expanded and corrected documentation

### 1.2.0 (2026-07-20)
- (copilot) Adapter requires node.js >= 22 now
- Added IEEE 1547 CRC state attributes
- Fixed adapter checker warnings (jsonConfig, pollingTimeout)
- Replaced plain setTimeout with adapter-managed timers
- Added calculated charging power state (vitals.power_w)
- Added specific ioBroker roles for all states
- Simplified state attribute definitions
- Fixed startup recovery: adapter now retries if wallbox is unreachable at start
- Capped retry delay at 1 hour
- Fixed state attribute typos and placeholder names
- Updated documentation

### 1.1.0 (2026-03-30)
- (iobroker-bot) Adapter requires node.js >= 20 now.
- Added state attributes (and moved notifications to debug from info)
- Code optimization
- Migration to i18n

### 1.0.6 (NoBl)
* Maintenance update (dependencies, ...)

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2024-2026 Norbert Bluemle <github@bluemle.org>

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