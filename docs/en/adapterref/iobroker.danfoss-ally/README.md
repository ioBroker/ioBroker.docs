# ioBroker.danfoss-ally ![version](https://img.shields.io/badge/version-0.2.13-blue) [![NPM](https://nodei.co/npm/iobroker.danfoss-ally.svg?style=shields)](https://nodei.co/npm/iobroker.danfoss-ally/)

[![NPM](https://nodei.co/npm/iobroker.danfoss-ally.svg?style=flat&data=d&color=blue)](https://nodei.co/npm/iobroker.danfoss-ally/)

[![NPM](https://nodei.co/npm/iobroker.danfoss-ally.svg)](https://nodei.co/npm/iobroker.danfoss-ally/)

Cloud adapter for **Danfoss Ally™** — using **OAuth2 (Client Credentials)**.  
Reads temperature, humidity, valve position, and battery data for all devices in your Ally account,  
and **allows targeted single writes** without forced mode changes or chained sequences.

---

## Features

- Direct connection to the **Danfoss Ally Cloud API**
- Automatic **OAuth2 token refresh**
- Discovers all registered devices
- Reads all available sensor and control data (temperature, humidity, battery, valve position, etc.)
- Converts raw Danfoss values (×0.1) into real units (**°C**, **%**)
- Fully automatic polling with configurable interval
- Supports single, isolated write commands from ioBroker to the cloud

---

## Highlights

- **Single Writes** — each state is sent independently (no automatic mode switching)
- **Smooth Sync Logic**
  - Anti-Race (5s): skip one poll right after a local write
  - Hold Window (1min): protect recent local values from overwrite
  - Lag Suppress (15s): ignore temporarily outdated cloud data
  - Soft Refresh (~1.5s): re-fetch only affected states after each write
- **Quiet Logging** — info-level for clean operation, debug-level for diagnostics
- **Auto Scaling** — temperatures/humidity auto-converted to °C / %

> **Note:** Cloud updates from the Danfoss Ally app may appear in ioBroker with a short delay (1–2min).

---

## Supported Devices

- Danfoss Icon2 RT (Room thermostats)
- Danfoss Icon2 Controller
- Danfoss Ally™ Gateway  
  _(other Danfoss devices auto-discovered)_

---

## Configuration

Go to **Instances → danfoss-ally → Settings**

| Field                | Description                                                         |
| -------------------- | ------------------------------------------------------------------- |
| **API Key / Secret** | Your Danfoss Developer App credentials                              |
| **Token URL**        | OAuth2 token endpoint (e.g. `https://api.danfoss.com/oauth2/token`) |
| **API Base URL**     | e.g. `https://api.danfoss.com/ally`                                 |
| **Scope**            | Optional OAuth2 scope (e.g. `read write`)                           |
| **Polling Interval** | Default `300s`                                                      |

> Shorter intervals update faster but create more API traffic. 30–60s is a good balance.

```bash
API Key:      your-client-id
API Secret:   your-client-secret
Token URL:    https://api.danfoss.com/oauth2/token
API Base URL: https://api.danfoss.com/ally
Polling:      300
```

---

## States

Each discovered device creates a channel:  
`danfoss-ally.0.<device_id>.*`

### Reading examples

| State                                  | Description                                   | Unit |
| -------------------------------------- | --------------------------------------------- | ---- |
| `temp_current`                         | Current temperature                           | °C   |
| `humidity_value`                       | Relative humidity                             | %    |
| `battery_percentage`                   | Battery level                                 | %    |
| `mode`                                 | Current mode (`auto`, `manual`, `at_home`, …) | –    |
| `work_state`, `output_status`, `fault` | Status or error                               | –    |
| `upper_temp` / `lower_temp`            | Temperature limits                            | °C   |

> All numeric values are scaled from ×0.1 → °C/% automatically.

---

## Writing (Single Commands)

The adapter supports **precise single writes** to each controllable state without chaining or automatic mode changes.  
This gives you full control in Blockly, JavaScript, or custom logic scripts.

| Writable state                                                                | Expected value / behavior                                       |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `temp_set`                                                                    | Target temperature (°C, 0.5steps; sent ×10)                     |
| `manual_mode_fast`                                                            | Alias for `temp_set`                                            |
| `at_home_setting`, `leaving_home_setting`, `pause_setting`, `holiday_setting` | Preset temperatures                                             |
| `mode`                                                                        | `manual`, `at_home`, `leaving_home`, `pause`, `holiday`, `auto` |
| `child_lock`                                                                  | `true` / `false`                                                |
| `SetpointChangeSource`                                                        | `Externally` or `schedule`                                      |

> Adapter does **not** auto-switch modes when writing setpoints — you decide in your logic.

---

## Example (Blockly / Script)

```js
// Manual mode
setState("danfoss-ally.0.<id>.mode", "manual");
setState("danfoss-ally.0.<id>.temp_set", 21.5);

// At home
setState("danfoss-ally.0.<id>.mode", "at_home");
setState("danfoss-ally.0.<id>.at_home_setting", 21.0);

// Leaving home
setState("danfoss-ally.0.<id>.mode", "leaving_home");
setState("danfoss-ally.0.<id>.leaving_home_setting", 19.0);

// Pause
setState("danfoss-ally.0.<id>.mode", "pause");
setState("danfoss-ally.0.<id>.pause_setting", 5.0);

// Holiday
setState("danfoss-ally.0.<id>.mode", "holiday");
setState("danfoss-ally.0.<id>.holiday_setting", 10.0);

// Child lock
setState("danfoss-ally.0.<id>.child_lock", true);

// Explicit source (usually not needed)
setState("danfoss-ally.0.<id>.SetpointChangeSource", "Externally"); // or 'schedule'
```

> When switching to `manual`, `pause`, or `holiday`, the adapter sets `SetpointChangeSource="Externally"`.  
> Switching back to `auto` resets it to `"schedule"`.

---

## Synchronization Logic

| Mechanism        | Duration | Purpose                                 |
| ---------------- | -------- | --------------------------------------- |
| **Anti-Race**    | 5s       | Skip one poll after local write         |
| **Hold**         | 1min     | Prevent cloud overwrite of local writes |
| **Lag Suppress** | 15s      | Ignore stale cloud data                 |
| **Soft Refresh** | ~1.5s    | Re-fetch only affected states           |

> These mechanisms ensure smooth synchronization between ioBroker and the Danfoss Cloud without flickering or value loops.

---

## Logging

The adapter provides detailed **debug-level** information for diagnostics but remains quiet during normal operation.

- `ack=true` updates appear only in **debug**
- `HOLD`, `MATCH`, `SUPPRESS` → debug-level, harmless diagnostics
- API errors (`HTTP 400/401`) retried automatically (logged at debug)
- Clean info-level summary after every poll:

**Poll Summary Example**

```
✅ Updated 13 devices. Changed=2, Skipped=253, Held=1
📡 Found devices, updating states...
⏸️ Skipping poll (anti-race 5000ms)
```

## Example Log Output

```
🔄 Starting Danfoss Ally adapter...
🔑 Refreshing OAuth2 token...
✅ Token acquired. Expires in ~3599 s
📡 Found 13 devices, updating states...
✅ Updated 13 devices from Danfoss Ally Cloud.
⏱ Polling interval set to 300 s
```

## Token Handling

- Uses **OAuth2 Client Credentials Flow**
- Token auto-request on startup, refresh before expiry
- On `401 Unauthorized`: refresh + retry once
- Tokens kept **in memory**, never stored
- Optional `scope` / `audience` supported
- All token events visible in debug log

---

## API Endpoints

The adapter communicates with the Danfoss Ally Cloud API (base URL configurable).

| Method | Endpoint                 | Purpose                     |
| ------ | ------------------------ | --------------------------- |
| `POST` | `/oauth2/token`          | Request access token        |
| `GET`  | `/devices`               | Discover devices            |
| `GET`  | `/devices/{id}/status`   | Read device telemetry       |
| `GET`  | `/devices/{id}`          | Fallback for missing status |
| `POST` | `/devices/{id}/commands` | Send single write command   |

**Headers:**  
`Authorization: Bearer <token>`  
`Content-Type: application/json`  
Optional: `X-App-Key`, `X-Tenant-Id`, etc.

**Error Handling:**

- **400:** invalid header/value → logged
- **401:** token refresh + retry
- **5xx:** retried next poll
- Temperature writes auto-scaled ×10 (e.g. 21.5 → 215)

---

## Polling

- Default: **300s** (configurable)
- Updates only changed values
- Includes all anti-race / hold / lag / soft-refresh logic above
- Info summary after each poll shows changed, skipped, and held states

---

## Writes

- One command per state (no mode chaining)
- Mode + temperature must be written separately
- Values are clamped to allowed limits, scaled ×10
- `child_lock`: tries `0/1`, retries `true/false` on 400 error
- `SetpointChangeSource`: optional; defaults to `"Externally"` when manual modes are active

All send, retry, and confirm logs appear at debug level.

---

## Changelog

### 0.2.13
- Updated CI & deploy workflow
- Fixed npm publishing process
- Improved code formatting (Prettier / ESLint)
- No functional changes for end users

### 0.2.12
- Migrated CI to full ioBroker standard
- Full rewrite of state roles (value._, level._, state) for compatibility
- Correct creation of device and status channels according to ioBroker standards
- Replaced all timers with adapter.setTimeout / adapter.setInterval
- Stabilized soft refresh process and ensured channel creation

### 0.2.11
- Full write support for all cloud-controllable values
- Improved token retry handling
- Enhanced synchronization and logging

### 0.2.10
- Translation and compliance fixes
- Improved admin schema, license info, encryption handling

---

## Development

```bash
npm i
node main.js
```

or install via ioBroker development tooling.

---

## License

MIT License

Copyright (c) 2025 Author Stefan8485@me.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
