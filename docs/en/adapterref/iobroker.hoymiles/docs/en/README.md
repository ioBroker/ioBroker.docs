---
chapters: {"pages":{"en/adapterref/iobroker.hoymiles/README.md":{"title":{"en":"ioBroker.hoymiles"},"content":"en/adapterref/iobroker.hoymiles/README.md"},"en/adapterref/iobroker.hoymiles/docs/en/README.md":{"title":{"en":"ioBroker.hoymiles — Hoymiles HMS-xxxW-xT / HMS-xxx-xWB"},"content":"en/adapterref/iobroker.hoymiles/docs/en/README.md"}}}
---
![Logo](../../admin/hoymiles.png)

# ioBroker.hoymiles — Hoymiles HMS-xxxW-xT / HMS-xxx-xWB

## Supported Inverters

This adapter is designed for **Hoymiles HMS microinverters with an integrated WiFi (or WiFi + Bluetooth) DTU** (DTUBI).

**Local** = direct TCP/Protobuf connection on port 10081. **Cloud** = S-Miles Cloud API — auto-discovery, realtime data (fast burst channel ~1.5–3 s), energy aggregates, grid profile, inverter on/off + reboot, DTU reboot.

| Model | Strings | Local (TCP) | Cloud | Status |
|-------|:---:|:---:|:---:|--------|
| HMS-300W-1T | 1 | ✅ | ✅ | Untested |
| HMS-350W-1T | 1 | ✅ | ✅ | Untested |
| HMS-400W-1T | 1 | ✅ | ✅ | Untested |
| HMS-450W-1T | 1 | ✅ | ✅ | Untested |
| HMS-500W-1T | 1 | ✅ | ✅ | Untested |
| HMS-600W-2T | 2 | ✅ | ✅ | Untested |
| HMS-700W-2T | 2 | ✅ | ✅ | Untested |
| HMS-800W-2T | 2 | ✅ | ✅ | **Tested** (Local + Cloud) |
| HMS-900W-2T | 2 | ✅ | ✅ | Untested |
| HMS-1000W-2T | 2 | ✅ | ✅ | **Tested** (Local) |
| HMS-1600DW-4T | 4 | ✅ | ✅ | Untested |
| HMS-1800DW-4T | 4 | ✅ | ✅ | Untested |
| HMS-2000DW-4T | 4 | ✅ | ✅ | Untested |
| HMS-600-2WB | 2 | ❌¹ | ✅ | Untested |
| HMS-700-2WB | 2 | ❌¹ | ✅ | Untested |
| HMS-800-2WB | 2 | ❌¹ | ✅ | **Tested** (Cloud: realtime burst, grid profile, on/off + reboot, DTU reboot) |
| HMS-900-2WB | 2 | ❌¹ | ✅ | Untested |
| HMS-1000-2WB | 2 | ❌¹ | ✅ | Untested |
| HMS-1600-4WB | 4 | ❌¹ | ✅ | Untested |
| HMS-1800-4WB | 4 | ❌¹ | ✅ | Untested |
| HMS-2000-4WB | 4 | ❌¹ | ✅ | Untested |

¹ The **WB series** (sold as **"HiFlow Pro"**) has no local TCP port — its only local channel is Bluetooth LE, and all data goes to the Hoymiles cloud. These inverters therefore work **cloud-only**: enable the cloud connection and the adapter reads them through the S-Miles API (realtime burst, energy, grid profile) and can send the inverter on/off + reboot and DTU reboot commands. All WB models share the same platform; only the HMS-800-2WB has been tested so far.

**Cloud-only operation:** any supported inverter in your S-Miles account also works without a local connection at all — the adapter discovers it automatically and provides realtime power (burst channel), energy aggregates, grid profile, and the inverter on/off + reboot (`inverter.active` / `inverter.reboot`) plus DTU reboot (`dtu.reboot`) commands over the cloud. The remaining commands (power limit, lock, clean warnings, …) require the local TCP link.

> This adapter does **NOT** work with: HMS-1600/1800/2000-4T without "DW", HM series, MI series, external DTU sticks, or HMT three-phase models.

## Configuration

Open the adapter configuration in the ioBroker admin interface.

### Local Connection (TCP)

| Setting | Default | Description |
|---------|---------|-------------|
| **Enable local** | on | Enable direct TCP/Protobuf connection. The adapter maintains a persistent TCP connection with protobuf heartbeat. |
| **DTU devices** | (empty) | Table of DTU IP addresses/hostnames. Add one row per DTU. |
| **Data query interval** | 5s | Seconds between data requests (0-300). Set 0 for fastest possible (~1s per cycle). |
| **Config/alarm poll factor** | 6 | Config and alarms are queried every Nth data cycle. |
| **Cloud Relay** | on | Forward real-time data to Hoymiles Cloud on behalf of the DTU. Without this, the local TCP connection blocks the DTU from uploading to the cloud. |

### Cloud Connection (S-Miles)

| Setting | Default | Description |
|---------|---------|-------------|
| **Enable cloud** | off | Enable Hoymiles S-Miles Cloud API |
| **S-Miles Email** | — | Your S-Miles account email |
| **S-Miles Password** | — | Your S-Miles account password (stored encrypted) |
| **Fast realtime data (cloud)** | on | For inverters **without** a local connection, poll fast per-second power data from the cloud (the same "burst" channel the S-Miles app's live view uses). Updates `grid.power` and `pvN.power` roughly every 1.5–3 s (server-dictated) instead of only every ~80 s. Only affects cloud-only devices; locally connected inverters keep their direct local realtime data. |

All inverters in your cloud account are automatically discovered. No manual serial number configuration needed.

Both connections can be enabled simultaneously. Local data has priority — cloud data fills in when the DTU is offline (e.g. at night).

#### Account types — S-Miles Installer / Enduser / Home

The adapter accepts accounts from all three official Hoymiles apps:

- **S-Miles Installer** (`com.hm.hemaiInstall1`)
- **S-Miles Enduser** (`com.hm.hemaiClient1`)
- **S-Miles Home** (`com.hm.balcony`)

Login is a single v3 flow followed by a profile probe (`region_c → pre-insp → login → probe`):

- **pre-insp + login** decide the authentication variant. Hoymiles unified all accounts onto Argon2id (`v=3 + salt`) in 2026, so `v` is no longer a profile signal — Installer, Enduser, and Home accounts all use the same Argon2id challenge today (parameters from the S-Miles Home Android app: `t=3, m=32 MiB, p=1, hashLen=32, V13`). The legacy `md5hex(password).sha256base64(password)` challenge is kept as a fallback for any region that still hands out `v=2`.
- **probe** (`/pvm/.../select_by_page`) then decides which data-API surface the account is allowed on:
  - probe accepted → **installer** profile — the account works on `global.hoymiles.com` and reaches the full `/pvm/...` web API, including `latitude`/`longitude`/`address`/`local_time`/`status`/`warn_data` and firmware version strings.
  - probe rejected (server says *"can only be used for logging in to the S-Miles Home app"*) → **home** profile — restricted by the server to `/pvmc/.../*_c`. That surface omits the fields above but exposes a few extras (reflux / self-consumption energy, electricity-price). The adapter does **not** create states for the missing fields — they only appear when the underlying response actually contains the value. `latitude` / `longitude` / `address` are recovered for home accounts via the supplementary `pvm-ext/station-ak/find` endpoint the S-Miles Home app itself uses, which keeps the weather poll working.

> **Note:** `dataeu.hoymiles.com:10081` is the European cloud-relay endpoint that DTUs push data to — it is **not** a user login server. The adapter handles cloud-relay automatically (see *Cloud Relay*).

#### Test cloud login

When in doubt, click the **Test cloud login** button next to the password field. It runs the four phases once with your current credentials (`region_c`, `pre-insp`, `login`, `probe`) and reports `v` and salt presence from pre-insp, whether the login produced a token, and which profile the probe assigned (`installer` / `home`). The result is logged so you can paste it into a forum bug report. The test does not store a token or change adapter state.

## Device Manager

The adapter integrates with the ioBroker **Device Manager**, so every inverter and cloud station appears as a card on the *Device Manager* tab in the admin UI — with live status, controls and a settings dialog, without building your own VIS view.

**What is shown**

- Every **DTU/inverter** (`<dtuSerial>`) and every **cloud station** (`station-<id>`) the adapter has created.
- A live **connection indicator** (green/red), and for locally connected DTUs the WiFi signal strength. The card title uses the name of the station (plant) the inverter belongs to — the name you gave it in the S-Miles app — plus the DTU serial number (e.g. `Zuhause · 4143A01CEDE4`), which keeps every inverter distinct; without a station it falls back to the model name or the serial number.
- **Live values right on the card:** current power (W), today's energy (kWh), the power of each PV string the inverter actually has (one line per string), and the inverter temperature — all updated automatically. Stations show the aggregated power and energy.
- A device **icon** by type — a flat micro-inverter, an upright three-phase inverter (HMT line), or a station. These are original, neutral icons drawn for the adapter, not vendor product images. The same icons are used for the device objects in the object tree.
- A **firmware-update indicator** when the cloud reports one (from `dtu.fwUpdateAvailable`).
- A **"More"** button opens a read-only details panel (serial numbers, hardware/software versions, model, signal strength; for stations the capacity, status and address).

**Controls** (on each inverter card)

The card mirrors the writable states, so a click routes through the normal command path (local TCP link preferred, cloud fallback):

- **Switches:** inverter on/off, lock inverter.
- **Sliders / numbers:** power limit (runtime), power factor limit, reactive power limit, persistent power limit, cloud send interval.
- **Buttons (with confirmation):** reboot inverter, reboot DTU, clear warnings, clear grounding fault.
- **Settings** (button, local devices): a dialog to change the cloud send interval and the persistent power limit at once.

For **cloud-only** inverters (no local connection, e.g. HMS-800-2WB) only the actions the cloud can actuate are shown — inverter on/off, reboot inverter, reboot DTU — because the other commands are local-only. Stations show status and details only (no controls).

**Instance actions** (above the device list): **Scan network** searches the LAN for DTUs and reports what it finds, and **Test cloud login** runs the login diagnostics. (Reloading the list uses the Device Manager's own built-in refresh button.)

> **Note:** Devices discovered later over the cloud (up to ~60 s after start) appear after pressing **Refresh** or reopening the tab; the live status of already-listed devices updates on its own.

## Connection Modes

The adapter supports several connection modes depending on the configuration:

| | Local only | Local + Relay | Cloud only | Local + Cloud | Local + Relay + Cloud |
|---|---|---|---|---|---|
| **TCP polling** | yes | yes | — | yes | yes |
| **Reconnect** | Backoff 1–60s | Backoff 1–60s | — | Backoff 1–60s | Backoff 1–60s |
| **Cloud Relay** | — | HB 60s, data every `serverSendTime` | — | — | HB 60s, data every `serverSendTime` |
| **Cloud on start** | — | — | Full fetch | Full fetch | Full fetch |
| **Cloud (WR online)** | — | — | Every 5min | Every `serverSendTime` | 30s after relay send |
| **Cloud (WR offline)** | — | — | Every 5min | Weather + FW only | Weather + FW only |

### Automatic Reconnect

The inverter (DTU) is only reachable when producing power (sun is shining). The adapter automatically reconnects with exponential backoff (1s, 2s, 4s, ... up to 60s max). When the connection succeeds, the backoff resets to 1s.

### Night Mode

When the local connection drops (typically at sunset), the adapter enters **night mode**:
- The cloud relay pauses (sends one final data upload, then disconnects)
- Cloud API reduces to weather updates and firmware checks only (no real-time data, since nothing changes)
- When the local connection is restored (sunrise), the adapter exits night mode and resumes normal operation

### State Quality

The adapter uses ioBroker's state quality attribute (`q`) to indicate the reliability and source of data values:

| Quality | Value | Meaning | When |
|---------|-------|---------|------|
| Good | `0x00` (0) | Fresh, locally sourced data | Normal operation — data received directly from DTU via TCP |
| Substitute | `0x40` (64) | Cloud-sourced fallback data | Inverter data fetched from the Hoymiles Cloud API instead of local TCP (cloud-only devices) |
| Device not connected | `0x42` (66) | Stale data, device offline | DTU connection lost — values are the last known readings before disconnect. Also set on cloud station `grid.*` when the station's last cloud upload is older than ~20 min (DTU not uploading). |

**Affected states:** `grid.*`, `pv*.*`, `inverter.temperature`, `inverter.active`, `inverter.warnCount`, `inverter.warnMessage`, `inverter.activePowerLimit`, `meter.*` — plus the cloud station measurements `station-<id>.grid.*` (flagged `0x42` while the station is offline/stale).

Info states (`info.*`), config states (`config.*`), and static station-level cloud data (name, address, coordinates, warning flags) are **not** affected by quality changes.

**Automatic reset:** When the local DTU connection is restored, the next successful data response automatically resets all affected states back to quality `0x00` (good). Likewise, when a cloud station resumes uploading, its `grid.*` quality returns to `0x00` and the adapter immediately performs one full refresh (details, devices, firmware, warnings) before resuming the normal poll cadence.

You can use the quality attribute in scripts and visualizations to distinguish between fresh and stale data, e.g. by dimming or greying out values with `q > 0`.

## Multiple Inverters

This adapter supports multiple inverters in a single instance:

- **Local:** Add multiple DTU IP addresses in the device table
- **Cloud:** All inverters and stations in your account are automatically discovered

Each DTU creates a device node using its serial number as ID:
```
hoymiles.0.4143A01CEDE4.grid.power
hoymiles.0.4143A01CEDE4.inverter.*
hoymiles.0.4143A01CEDE4.dtu.*
hoymiles.0.4143A01CEDE4.pv0.*
```

Cloud stations create aggregated device nodes:
```
hoymiles.0.station-12345.grid.power      ← Sum of all inverters
hoymiles.0.station-12345.grid.totalEnergy
hoymiles.0.station-12345.info.stationName
```

## States

### `<dtuSerial>.grid.*` — Grid Output (per DTU)

| State | Type | Unit | Description |
|-------|------|------|-------------|
| `grid.power` | number | W | Grid output power |
| `grid.voltage` | number | V | Grid voltage |
| `grid.current` | number | A | Grid current |
| `grid.frequency` | number | Hz | Grid frequency |
| `grid.reactivePower` | number | var | Reactive power |
| `grid.powerFactor` | number | — | Power factor |
| `grid.dailyEnergy` | number | kWh | Daily energy yield |

### `<dtuSerial>.info.*` — Device Information (per DTU)

| State | Type | Description |
|-------|------|-------------|
| `info.connected` | boolean | Device connected (local or cloud) |
| `info.lastResponse` | number | Last response time (Unix timestamp, local only) |

### `<dtuSerial>.pv0.*` / `pv1.*` / … — PV Panel Inputs (per DTU)

PV channels are created dynamically, one per inverter input (`pv0` … `pv11`, 12 at most).

The adapter determines how many there are, in this order:

1. **Local:** from the inverter's own device information.
2. **Cloud:** from the Hoymiles rule dictionary, looked up by the inverter's serial-number prefix — the same source the S-Miles app uses. This covers every product line, including `…-2WB` / `…-4WB`.
3. **Fallback:** from the model name (`…-2T`, `…-4WB`, …), or from the number of strings that actually show up in the live data.

| State | Type | Unit | Description |
|-------|------|------|-------------|
| `pvX.power` | number | W | Panel power |
| `pvX.voltage` | number | V | Panel voltage |
| `pvX.current` | number | A | Panel current |
| `pvX.dailyEnergy` | number | kWh | Daily energy (local only) |
| `pvX.totalEnergy` | number | kWh | Total energy (local only) |
| `pvX.errorCode` | number | | Per-string error code, 0 in normal operation (local only) |

### `<dtuSerial>.inverter.*` — Inverter Status & Control (per DTU)

| State | Type | Unit | Writable | Description |
|-------|------|------|----------|-------------|
| `inverter.serialNumber` | string | — | no | Inverter serial number |
| `inverter.model` | string | — | no | Inverter model (cloud) |
| `inverter.hwVersion` | string | — | no | Hardware version |
| `inverter.swVersion` | string | — | no | Software version |
| `inverter.temperature` | number | °C | no | Inverter temperature |
| `inverter.powerLimit` | number | % | **yes** | **Runtime** power limit (RAM-only, **no flash/NVM wear — safe to write every second**). **Use this state to realize zero-export (Nulleinspeisung)** / dynamic curtailment. 2-100%, local |
| `inverter.activePowerLimit` | number | % | no | Active power limit (live, local) |
| `inverter.active` | boolean | — | **yes** | Turn inverter on/off (local; via the cloud for cloud-only devices) |
| `inverter.reboot` | boolean | — | **yes** | Reboot inverter (button, local; via the cloud for cloud-only devices) |
| `inverter.powerFactorLimit` | number | — | **yes** | Power factor limit (-1 to 1, local) |
| `inverter.reactivePowerLimit` | number | ° | **yes** | Reactive power limit (-50 to 50, local) |
| `inverter.cleanWarnings` | boolean | — | **yes** | Clean warnings (button, local) |
| `inverter.cleanGroundingFault` | boolean | — | **yes** | Clean grounding fault (button, local) |
| `inverter.lock` | boolean | — | **yes** | Lock/unlock inverter (local) |
| `inverter.warnCount` | number | — | no | SGSMO `warning_number` field, raw value (local) — not a documented warn code |
| `inverter.warnMessage` | string | — | no | Active warning message from the WCode alarm list (local) |
| `inverter.linkStatus` | number | — | no | Link status |
| `inverter.modulationIndexSignal` | number | — | no | SGSMO #20, raw packed value (modulation index + signal; exact decode not yet confirmed, local) |

### `<dtuSerial>.dtu.*` — DTU Information (per DTU, local only except `dtu.reboot`)

| State | Type | Unit | Description |
|-------|------|------|-------------|
| `dtu.serialNumber` | string | — | DTU serial number |
| `dtu.swVersion` | string | — | Software version |
| `dtu.hwVersion` | string | — | Hardware version |
| `dtu.rssi` | number | dBm | Signal strength |
| `dtu.reboot` | boolean | — | Reboot DTU (**writable**, button). Sent over the local TCP link when connected, otherwise over the cloud for cloud-only devices (e.g. HMS-800-2WB) |
| `dtu.wifiVersion` | string | — | WiFi version |
| `dtu.fwUpdateAvailable` | boolean | — | Firmware update available (checked once daily via cloud) |
| `dtu.stepTime` | number | s | Step time |
| `dtu.accessModel` | number | — | Network access mode (0=GPRS, 1=WiFi, 2=Ethernet) |
| `dtu.communicationTime` | number | — | Last communication (Unix timestamp) |
| `dtu.connState` | number | — | DTU error code (0=OK) |
| `dtu.searchResult` | string | — | AutoSearch result (inverter serials, JSON) |

### `station-<id>.grid.*` — Station Aggregates (cloud)

| State | Type | Unit | Description |
|-------|------|------|-------------|
| `grid.power` | number | W | Total station power (live in ~1.5–3 s via the burst channel when it is active, else ~80 s) |
| `grid.gridPower` | number | W | Grid exchange power (realtime, +import/−export) — non-zero only on metered systems |
| `grid.loadPower` | number | W | Load/consumption power (realtime) |
| `grid.batteryPower` | number | W | Battery power (realtime, +charge/−discharge) — battery systems only |
| `grid.pvUtilization` | number | % | PV utilization (realtime) |
| `grid.dailyEnergy` | number | kWh | Daily energy |
| `grid.monthEnergy` | number | kWh | Monthly energy |
| `grid.yearEnergy` | number | kWh | Yearly energy |
| `grid.totalEnergy` | number | kWh | Total lifetime energy |
| `grid.co2Saved` | number | kg | CO2 saved |
| `grid.treesPlanted` | number | — | Equivalent trees planted |
| `grid.electricityPrice` | number | /kWh | Electricity price |
| `grid.currency` | string | — | Currency code |
| `grid.isBalance` | boolean | — | Zero export active |
| `grid.isReflux` | boolean | — | Feed-in active |
| `grid.todayIncome` | number | — | Today's income |
| `grid.totalIncome` | number | — | Total income |

### `station-<id>.info.*` — Station Information (cloud)

| State | Type | Description |
|-------|------|-------------|
| `info.stationName` | string | Station name |
| `info.stationId` | number | Station ID |
| `info.systemCapacity` | number | System capacity (kWp) |
| `info.address` | string | Station address |
| `info.latitude` | number | GPS latitude |
| `info.longitude` | number | GPS longitude |
| `info.stationStatus` | number | Station status |
| `info.installedAt` | number | Installation date |
| `info.timezone` | string | Timezone |
| `info.lastCloudUpdate` | number | Last cloud update time |
| `info.lastDataTime` | number | Last DTU data time |

### `station-<id>.weather.*` — Weather at Station (cloud)

| State | Type | Unit | Description |
|-------|------|------|-------------|
| `weather.icon` | string | — | Weather icon code ([OpenWeatherMap](https://openweathermap.org/weather-conditions)) |
| `weather.description` | string | — | Weather description in German (e.g. "Klarer Himmel", "Regen") |
| `weather.temperature` | number | °C | Current temperature at station location |
| `weather.sunrise` | number | — | Sunrise time (Unix timestamp ms) |
| `weather.sunset` | number | — | Sunset time (Unix timestamp ms) |

> **Weather icon codes:** The icon codes follow the [OpenWeatherMap convention](https://openweathermap.org/weather-conditions). To display the icon as an image, use: `https://openweathermap.org/img/wn/{icon}@2x.png`

### `station-<id>.warn.*` — Station Warnings (cloud)

Grid- and meter-level warning flags from the cloud's `station/find` record. All boolean — `true` means the condition is currently active. Installer accounts read the flags from `station/find`; on S-Miles Home accounts (where `find_c` omits them) the adapter falls back to the `realtime_c` response. That fallback block carries six of the flags — but **not** `warn.powerLimited`, which only exists in the installer `station/find` record — so on home accounts `warn.powerLimited` stays `false` even when curtailment is active. The states only appear once the cloud delivers a `warn_data` block from either source.

| State | Type | Description |
|-------|------|-------------|
| `warn.stationOffline` | boolean | Station offline / supply voltage off. Cross-checked against realtime data freshness: a station that is still uploading recent data is never reported offline, even if the cloud briefly flags `s_uoff` (e.g. while the cloud relay takes over the DTU's uplink on adapter start) |
| `warn.gridUnstable` | boolean | Grid voltage unstable |
| `warn.gridFault` | boolean | Grid fault / grid abnormal |
| `warn.deviceAlarm` | boolean | Inverter alarm — an inverter has an active fault (e.g. "PVx no input" when a DC string is disconnected). The same condition surfaces locally and faster under `alarms.lastCode`/`alarms.lastMessage` |
| `warn.deviceIdWarning` | boolean | Device ID warning (ID mismatch / anti-theft) |
| `warn.meterFault` | boolean | Meter fault / meter warning |
| `warn.powerLimited` | boolean | Power output limited (curtailment / power limit active). **Installer accounts only** — not delivered on home accounts |

### `<dtuSerial>.alarms.*` — Alarm Data (per DTU, local)

| State | Type | Description |
|-------|------|-------------|
| `alarms.count` | number | Total alarm count |
| `alarms.activeCount` | number | Active (unresolved) alarm count |
| `alarms.hasActive` | boolean | Has active alarms |
| `alarms.json` | string | Full alarm list as JSON |
| `alarms.lastCode` | number | Last alarm code |
| `alarms.lastStartTime` | number | Last alarm start time |
| `alarms.lastEndTime` | number | Last alarm end time |
| `alarms.lastMessage` | string | Last alarm message (in the ioBroker system language, English otherwise) |
| `alarms.lastData1` | number | Last alarm data 1 (raw sensor value) |
| `alarms.lastData2` | number | Last alarm data 2 (raw sensor value) |

### `<dtuSerial>.config.*` — DTU Configuration (per DTU, local)

> ⚠️ **WARNING — never write `config.*` states (especially `config.limitPowerMyPower`) frequently or in an automated loop.** Each write programs the **internal flash of the integrated DTU** (the WiFi module inside the HMS-xT). Flash endurance is finite (≈ tens of thousands of cycles); repeated high-frequency writes — e.g. a per-second zero-export loop — wear it out and can **permanently brick the device**. Use these states only for occasional, permanent settings.
> **For dynamic / frequent power limiting (zero-export), use `inverter.powerLimit` instead** — a runtime, RAM-only command with **no flash write and no wear**, safe to update every second.

| State | Type | Unit | Writable | Description |
|-------|------|------|----------|-------------|
| `config.serverDomain` | string | — | no | Cloud server domain |
| `config.serverPort` | number | — | no | Cloud server port |
| `config.serverSendTime` | number | min | **yes** | Cloud send interval (minutes). ⚠️ Persistent (DTU flash) — do not write frequently, see warning above |
| `config.limitPowerMyPower` | number | % | **yes** | **Persistent** power limit (stored in DTU flash, survives a reboot; 2-100%, local). ⚠️ **Permanent cap only — never write in a loop (wears DTU flash). For dynamic zero-export use `inverter.powerLimit`** (see warning above) |
| `config.wifiSsid` | string | — | no | WiFi SSID |
| `config.wifiRssi` | number | dBm | no | WiFi signal strength (real dBm, e.g. −65) |
| `config.invType` | number | — | no | Inverter type |
| `config.netmodeSelect` | number | — | no | Network mode (0=GPRS, 1=WiFi, 2=Ethernet) |
| `config.netDhcpSwitch` | number | — | no | DHCP enabled |
| `config.wifiIpAddress` | string | — | no | WiFi IP address |
| `config.wifiMacAddress` | string | — | no | WiFi MAC address |
| `config.dtuApSsid` | string | — | no | DTU access point SSID |

### `<dtuSerial>.gridProfile.*` — Grid Profile (per DTU, local — read via the cloud for cloud-only devices)

The inverter's grid-connection profile (safety/grid-code parameters), read locally via DevConfigFetch. All read-only. Voltage/frequency values follow the active grid standard (e.g. `DE_VDE4105_2018`). Function flags are booleans (`true` = function active).

| State | Type | Unit | Writable | Description |
|-------|------|------|----------|-------------|
| `gridProfile.standard` | string | — | no | Grid standard name (e.g. DE_VDE4105_2018) |
| `gridProfile.countryStdCode` | number | — | no | Country standard code |
| `gridProfile.version` | number | — | no | Grid profile version |
| `gridProfile.nominalVoltage` | number | V | no | Nominal voltage |
| `gridProfile.lowVoltage1` | number | V | no | Low voltage 1 (LV1) |
| `gridProfile.lowVoltage1TripTime` | number | s | no | LV1 max trip time |
| `gridProfile.highVoltage1` | number | V | no | High voltage 1 (HV1) |
| `gridProfile.highVoltage1TripTime` | number | s | no | HV1 max trip time |
| `gridProfile.lowVoltage2` | number | V | no | Low voltage 2 (LV2) |
| `gridProfile.lowVoltage2TripTime` | number | s | no | LV2 max trip time |
| `gridProfile.avgHighVoltage10min` | number | V | no | 10-min average high voltage |
| `gridProfile.nominalFrequency` | number | Hz | no | Nominal frequency |
| `gridProfile.lowFrequency1` | number | Hz | no | Low frequency 1 (LF1) |
| `gridProfile.lowFrequency1TripTime` | number | s | no | LF1 max trip time |
| `gridProfile.highFrequency1` | number | Hz | no | High frequency 1 (HF1) |
| `gridProfile.highFrequency1TripTime` | number | s | no | HF1 max trip time |
| `gridProfile.islandingDetection` | boolean | — | no | Islanding detection active |
| `gridProfile.reconnectTime` | number | s | no | Reconnect time |
| `gridProfile.reconnectHighVoltage` | number | V | no | Reconnect high voltage |
| `gridProfile.reconnectLowVoltage` | number | V | no | Reconnect low voltage |
| `gridProfile.reconnectHighFrequency` | number | Hz | no | Reconnect high frequency |
| `gridProfile.reconnectLowFrequency` | number | Hz | no | Reconnect low frequency |
| `gridProfile.rampUpRateNormal` | number | %/s | no | Normal ramp-up rate |
| `gridProfile.rampUpRateSoftStart` | number | %/s | no | Soft-start ramp-up rate |
| `gridProfile.freqWattActive` | boolean | — | no | Frequency-Watt active |
| `gridProfile.freqWattStart` | number | Hz | no | Frequency-Watt start (Fstart) |
| `gridProfile.freqWattDroopSlope` | number | %Pn/Hz | no | Frequency-Watt droop slope |
| `gridProfile.recoveryRampRate` | number | %Pn/s | no | Recovery ramp rate |
| `gridProfile.recoveryHighFrequency` | number | Hz | no | Recovery high frequency |
| `gridProfile.recoveryLowFrequency` | number | Hz | no | Recovery low frequency |
| `gridProfile.activePowerControlActive` | boolean | — | no | Active power control active |
| `gridProfile.powerRampRate` | number | %Pn/s | no | Power ramp rate |
| `gridProfile.voltVarActive` | boolean | — | no | Volt-Var active |
| `gridProfile.voltVarV1` | number | V | no | Volt-Var set point V1 |
| `gridProfile.voltVarQ1` | number | %Pn | no | Volt-Var set point Q1 |
| `gridProfile.voltVarV2` | number | V | no | Volt-Var set point V2 |
| `gridProfile.voltVarV3` | number | V | no | Volt-Var set point V3 |
| `gridProfile.voltVarV4` | number | V | no | Volt-Var set point V4 |
| `gridProfile.voltVarQ4` | number | %Pn | no | Volt-Var set point Q4 |
| `gridProfile.specifiedPowerFactorActive` | boolean | — | no | Specified power factor active |
| `gridProfile.powerFactor` | number | — | no | Power factor (cos φ) |
| `gridProfile.wattPowerFactorActive` | boolean | — | no | Watt-power-factor active |
| `gridProfile.wattPowerFactorStart` | number | %Pn | no | Watt-PF start power |
| `gridProfile.powerFactorAtRatedPower` | number | — | no | Power factor at rated power |
| `gridProfile.reactivePowerControlActive` | boolean | — | no | Reactive power control active |
| `gridProfile.reactivePower` | number | %Sn | no | Reactive power (VAR) |

### `<dtuSerial>.meter.*` — Energy Meter (per DTU, local, dynamic)

Meter states are created automatically when meter data is first received from the DTU. Only available if a compatible energy meter is connected.

| State | Type | Unit | Description |
|-------|------|------|-------------|
| `meter.totalPower` | number | W | Total power (all phases) |
| `meter.phaseAPower` | number | W | Phase A power |
| `meter.phaseBPower` | number | W | Phase B power |
| `meter.phaseCPower` | number | W | Phase C power |
| `meter.powerFactorTotal` | number | — | Power factor total |
| `meter.energyTotalExport` | number | kWh | Total energy export (feed-in) |
| `meter.energyTotalImport` | number | kWh | Total energy import (consumption) |
| `meter.voltagePhaseA` | number | V | Voltage phase A |
| `meter.voltagePhaseB` | number | V | Voltage phase B |
| `meter.voltagePhaseC` | number | V | Voltage phase C |
| `meter.currentPhaseA` | number | A | Current phase A |
| `meter.currentPhaseB` | number | A | Current phase B |
| `meter.currentPhaseC` | number | A | Current phase C |
| `meter.faultCode` | number | — | Meter fault code |

### Adapter-level States

| State | Type | Description |
|-------|------|-------------|
| `info.connection` | boolean | Any device connected (local or cloud) |
| `info.cloudConnected` | boolean | Cloud API connected |
| `info.cloudLastError` | string | Last permanent cloud login error (empty when OK). Non-empty values pause automatic retries until credentials are corrected. |

## Protocol

### Local (TCP/Protobuf)

- **Transport:** TCP port 10081
- **Encoding:** Protocol Buffers (protobuf)
- **Frame:** 10-byte header (`HM` magic + command ID + CRC16 + length) + protobuf payload, with sequence numbers (0-60000)
- **Authentication:** None (local network only)
- **Encryption:** Optional AES-128-CBC with SHA-256 key derivation (detected automatically via DTU info response)
- **Heartbeat:** Protobuf heartbeat every 20s to maintain the persistent connection
- **Reconnect:** 5-minute idle timeout, automatic reconnect with exponential backoff (1s-60s)

### Cloud (S-Miles API)

- **Base URL:** `https://neapi.hoymiles.com`
- **Authentication:** MD5+SHA256 credential hash with nonce
- **Data:** Station realtime, device tree, station details
- **Password:** Stored encrypted in ioBroker config

### Acknowledgments

Protocol reverse-engineering by the community:
- [hoymiles-wifi](https://github.com/suaveolent/hoymiles-wifi) — Python library (primary reference)
- [dtuGateway](https://github.com/ohAnd/dtuGateway) — ESP32 gateway
- [Hoymiles-DTU-Proto](https://github.com/henkwiedig/Hoymiles-DTU-Proto) — Original protobuf definitions

## Troubleshooting

### Adapter can't connect
- Verify the DTU IP address is correct (check your router's DHCP table)
- Make sure no other application is connected to port 10081 (only one connection at a time)
- If you have the dtuGateway ESP32 running, stop it first

### No data after connecting
- DTU firmware V01.01.00 and newer may break local protobuf communication
- Do NOT update the DTU firmware if local access is important to you
- Check the adapter log for protobuf decode errors

### Cloud login failed
- Check your S-Miles email and password
- Make sure you can login at https://global.hoymiles.com/website/login
- On a permanent authentication error (wrong credentials, account locked) the adapter stops the retry loop to avoid further account lockouts. The error is written to `info.cloudLastError` and an ioBroker alert notification (scope `hoymiles`, category `cloudAuth`) is raised. Correct the credentials and save the configuration to clear the state and resume retries.

### Reporting a bug

To turn an "it doesn't work" into something fixable, the adapter emits a focused, **anonymized** diagnostic log:

1. In the ioBroker admin, open the adapter instance settings and set the **log level** to `debug`.
2. Restart the instance and let it run a few minutes (one or two cloud poll cycles).
3. Export the log and pick out the lines tagged `[diag]`.

The `[diag]` lines carry the raw cloud API responses (login flow, station list/details, device tree, realtime, firmware) plus the adapter's per-decision results. DTU/inverter serials and the account e-mail are replaced with stable hash tokens, and GPS coordinates / address / station name are redacted — so the `[diag]` lines are safe to paste into a public forum bug report. (Other, non-`[diag]` debug lines may still contain the real serial, so send the `[diag]` lines specifically.)