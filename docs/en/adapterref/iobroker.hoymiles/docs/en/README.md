---
chapters: {"pages":{"en/adapterref/iobroker.hoymiles/README.md":{"title":{"en":"ioBroker.hoymiles"},"content":"en/adapterref/iobroker.hoymiles/README.md"},"en/adapterref/iobroker.hoymiles/docs/en/README.md":{"title":{"en":"ioBroker.hoymiles — Hoymiles HMS microinverters and HAT hybrid inverters"},"content":"en/adapterref/iobroker.hoymiles/docs/en/README.md"}}}
---
![Logo](../../admin/hoymiles.png)

# ioBroker.hoymiles — Hoymiles HMS microinverters and HAT hybrid inverters

## Supported Inverters

This adapter is designed for **Hoymiles HMS microinverters with an integrated WiFi (or WiFi + Bluetooth) DTU** (DTUBI).

**Local (TCP)** = direct TCP/Protobuf connection on port 10081 (WiFi models). **Local (BLE)** = local Bluetooth through an [ESPHome Bluetooth Proxy](https://esphome.io/projects/?type=bluetooth) (WB series). **Cloud** = S-Miles Cloud API — auto-discovery, realtime data (fast burst channel ~1.5–3 s), energy aggregates, grid profile, inverter on/off + reboot, DTU reboot.

| Model | Strings | Local (TCP) | Local (BLE)² | Cloud | Status |
|-------|:---:|:---:|:---:|:---:|--------|
| HMS-300W-1T | 1 | ✅ | — | ✅ | Untested |
| HMS-350W-1T | 1 | ✅ | — | ✅ | Untested |
| HMS-400W-1T | 1 | ✅ | — | ✅ | **Tested** (Local + cloud relay, DTU firmware V01.01.01) |
| HMS-450W-1T | 1 | ✅ | — | ✅ | Untested |
| HMS-500W-1T | 1 | ✅ | — | ✅ | Untested |
| HMS-600W-2T | 2 | ✅ | — | ✅ | Untested |
| HMS-700W-2T | 2 | ✅ | — | ✅ | Untested |
| HMS-800W-2T | 2 | ✅ | — | ✅ | **Tested** (Local + Cloud; local + cloud relay also with DTU firmware V01.01.01) |
| HMS-900W-2T | 2 | ✅ | — | ✅ | Untested |
| HMS-1000W-2T | 2 | ✅ | — | ✅ | **Tested** (Local) |
| HMS-1600DW-4T | 4 | ✅ | — | ✅ | Untested |
| HMS-1800DW-4T | 4 | ✅ | — | ✅ | Untested |
| HMS-2000DW-4T | 4 | ✅ | — | ✅ | Untested |
| HMS-600-2WB | 2 | ❌¹ | ✅ | ✅ | Untested |
| HMS-700-2WB | 2 | ❌¹ | ✅ | ✅ | Untested |
| HMS-800-2WB | 2 | ❌¹ | ✅ | ✅ | **Tested** (Cloud; BLE gateway path in testing) |
| HMS-900-2WB | 2 | ❌¹ | ✅ | ✅ | Untested |
| HMS-1000-2WB | 2 | ❌¹ | ✅ | ✅ | Untested |
| HMS-1600-4WB | 4 | ❌¹ | ✅ | ✅ | Untested |
| HMS-1800-4WB | 4 | ❌¹ | ✅ | ✅ | Untested |
| HMS-2000-4WB | 4 | ❌¹ | ✅ | ✅ | Untested |

¹ The **WB series** (sold as **"HiFlow Pro"**) has no local TCP port — its only local channel is Bluetooth LE. Reach it either **locally over Bluetooth** (column *Local (BLE)*) or via the **cloud**. All WB models share the same platform; only the HMS-800-2WB has been tested so far.

² **Local (BLE)** needs an [ESPHome Bluetooth Proxy](https://esphome.io/projects/?type=bluetooth) (a cheap ESP32) on your network — the adapter then reads and controls the inverter locally over Bluetooth, without the cloud. See [BLE Gateway (ESPHome)](#ble-gateway-esphome). WiFi (T) models don't need this; they use the local TCP path.

**Cloud-only operation:** any supported inverter in your S-Miles account also works without a local connection at all — the adapter discovers it automatically and provides realtime power (burst channel), energy aggregates, grid profile, and the inverter on/off + reboot (`inverter.active` / `inverter.reboot`) plus DTU reboot (`dtu.reboot`) commands over the cloud. The remaining commands (power limit, lock, clean warnings, …) require the local TCP link.

### Hybrid inverters with battery (HAT series) — cloud, read-only, experimental

A Hoymiles **hybrid inverter** in your S-Miles account — reference system: **HAT-6.0HV-EUG1** with a **HB-(10-23)S-G2** battery, a three-phase grid meter and a DTS-WIFI-G1 — is read out **through the cloud**: three-phase AC values, backup (EPS) output, PV inputs, the battery in detail (state of charge and health, cell and module extremes), plus the plant's power flow and its energy balance for today, this month, this year and lifetime — grid import and export, PV used directly, consumption, battery charge and discharge and the self-sufficiency rate, with the figures of the S-Miles app's "Production & Consumption" tab — and the cloud's own income and cost figures. Below the inverter you also get today's curves of AC power, battery power and state of charge, the cloud's alarm list and, read from the device on demand, the battery and dry-contact (relay) settings. See Hybrid Inverter for the states. The plant's **measuring points** — grid meter, loads, a PV meter on a third-party inverter, a generator — are read as well and appear below the station; see Station Measuring Points. These work for any plant the cloud reports them for, not just for hybrid inverters.

- **Reading, not controlling.** Working mode and battery settings are shown (`<dtuSerial>.battery.*`), but cannot be changed — the adapter has no state that would alter how the storage system operates. The grid-profile read, a command built for microinverters, is not sent to a hybrid inverter.
- **The three existing commands work the way the S-Miles portal sends them.** The portal's device maintenance offers exactly *power on*, *shut down* and *reboot* for a HAT inverter, and a *reboot* for its DTU — these are the adapter's `inverter.active`, `inverter.reboot` and `dtu.reboot`. For a storage plant they go out with the inverter's own device type and the storage variant of the DTU reboot, as the portal does. They were verified against the portal's code, **not executed on real hardware** — shutting down a storage inverter also takes its backup output offline, so use them deliberately.
- **Needs an installer-type account** (one that can log in at global.hoymiles.com). The endpoint behind it is not known for the S-Miles Home API.
- **Update rate:** the fast realtime channel works for a storage plant as well, also in a cloud-only setup: PV, grid, load and battery power (`station-<id>.grid.*`) and the battery's state of charge (`<dtuSerial>.battery.soc`) arrive about every 10 s — measured on the reference system, that is how often the device really delivers, polling faster brings nothing newer. Unlike for microinverters the channel has no per-device mode for a storage plant, so everything else (phases, EPS, PV inputs, battery details, meters) follows the device's regular upload to the cloud, about every 5 minutes.
- **Which values are fast, which are not.** Live (about every 10 s) are exactly five values: `station-<id>.grid.power` (PV), `grid.gridPower`, `grid.loadPower`, `grid.batteryPower` and `<dtuSerial>.battery.soc`. `grid.gridPower` *is* the grid meter's live reading. Everything else — including the per-phase `gridMeter.*`, `load.*` and `pvMeter.*` values — is only as fresh as the device's last upload to the cloud (about every 5 minutes); the cloud offers nothing faster for them, not to the portal either.
- **Signs.** `grid.gridPower` is +import/−export and `grid.batteryPower` +discharging/−charging, in both cases from the cloud's energy-flow graph. The per-device and per-meter values are passed through as the cloud delivers them — note that the grid *meter* reports import as a **negative** active power (`gridMeter.power` read −284 W while `grid.gridPower` showed +278 W).
- Built against a single system, accessed through its owner's cloud account (thanks to BastiBerlin) — please report what you see on yours.

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
| **Power limit dead band** | 1 % | Smaller power-limit changes are not sent to the device. Every write erases two flash sectors. 0 = off. |
| **Power limit minimum interval** | 60 s | Shortest gap between two power-limit writes. 0 = off. |
| **Cloud Relay** | on | Forward real-time data to Hoymiles Cloud on behalf of the DTU. Without this, the local TCP connection blocks the DTU from uploading to the cloud. |

> **DTU firmware V01.01.01 and later encrypts the local connection.** The adapter notices this in the DTU's first answer and switches to AES-128-GCM by itself — nothing to configure. Such a DTU also talks to the cloud over TLS (port 10083), and the cloud relay follows suit: it always connects to the server and port the DTU itself is configured for (`config.serverDomain` / `config.serverPort`), with TLS on port 10083 and plain TCP on port 10081. Older firmware (up to V01.00.07) keeps working exactly as before.

### Cloud Connection (S-Miles)

| Setting | Default | Description |
|---------|---------|-------------|
| **Enable cloud** | off | Enable Hoymiles S-Miles Cloud API |
| **S-Miles Email** | — | Your S-Miles account email |
| **S-Miles Password** | — | Your S-Miles account password (stored encrypted) |
| **Fast realtime data (cloud)** | on | Poll fast per-second power data from the cloud (the same "burst" channel the S-Miles app's live view uses). For inverters **without** a local connection this updates `grid.power` and `pvN.power` roughly every 1.5–3 s (server-dictated) instead of only every ~80 s; locally connected inverters keep their direct local realtime data. The **station** totals under `station-<id>.grid.*` come from this channel in every setup, including a purely local one — no local link can produce a station-wide aggregate, so with this option off they fall back to the slow cloud poll and visibly lag the sum of the individual inverters. |

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

> **Note:** `dataeu.hoymiles.com:10081` (plain, older firmware) and `dataeu.hoymiles.com:10083` (TLS, firmware V01.01.01 and later) are the European cloud-relay endpoints that DTUs push data to — they are **not** user login servers. The adapter handles cloud-relay automatically (see *Cloud Relay*).

#### Test cloud login

When in doubt, click the **Test cloud login** button next to the password field. It runs the four phases once with your current credentials (`region_c`, `pre-insp`, `login`, `probe`) and reports `v` and salt presence from pre-insp, whether the login produced a token, and which profile the probe assigned (`installer` / `home`). The result is logged so you can paste it into a forum bug report. The test does not store a token or change adapter state.

### BLE Gateway (ESPHome)

Some inverters — the **WB series** (e.g. HMS-800-2WB) — can only be reached over **Bluetooth**, not over your normal network. To use them without the cloud, you add a small, cheap Bluetooth bridge to your network (an **ESPHome Bluetooth Proxy**). The adapter then reaches your inverter through it.

**1. Set up the Bluetooth bridge.** Flash a supported ESP32 with the ready-made firmware — use the **Flash a Bluetooth Proxy** link in the settings, or <https://esphome.io/projects/?type=bluetooth>. Plug it in within a few metres of your inverter. Nothing to configure.

**2. Add your inverter.** In the adapter settings open the **BLE** tab and turn on **Enable BLE gateway**, then save. While the inverter is switched on, click **Add discovered inverters** — your inverter appears in the table with its serial number and address already filled in. Enter its **PIN** (the one you set on the inverter), tick **Active**, and save. Done — the adapter connects.

**Good to know**

- You don't choose a bridge. If you have several, the adapter automatically uses the one with the best signal.
- If **Add discovered inverters** finds nothing, no inverter is within Bluetooth range of a bridge.
- A wrong PIN switches the device off again; the reason is shown in the state `info.bleLastError`. Correct the PIN and save to try again.
- When the inverter shuts down for the night the Bluetooth link ends and the states are flagged as stale (`info.connected` = `false`). The adapter reconnects on its own in the morning. If Bluetooth does not come back, the cloud supplies the values until it does — provided the cloud connection is enabled.

### Connecting an energy meter (Shelly / ecotracker)

An inverter connected over Bluetooth (the WB series) can share an **energy meter**. That shows you
not just what you produce but what is flowing to or from the grid — and on request the inverter
throttles itself so that **nothing is fed into the grid** (zero export).

**Requirement:** the meter must be on the same network and announce itself there. The inverter
looks for it on its own; whatever it finds appears in the selection.

**How to:** in the *Config Manager*, click the meter icon on your inverter. The inverter looks for
meters on the network itself — you pick one from the list and choose a mode:

| Mode | Effect |
| --- | --- |
| **Off** | Nothing is sent; an existing connection is left as it is. |
| **Meter only** | The inverter reads the meter. Values appear under `<serial>.meter.*`, nothing is regulated. |
| **Zero export** | The inverter additionally treats the meter as its grid meter and throttles its own output as soon as surplus would go to the grid. |

The regulation runs **inside the inverter** — the adapter only sets it up and watches. It does not
need to be running for it to work.

> **Important:** the meter has to announce itself on the network **via mDNS**. If the inverter
> cannot find it there, it accepts the setting but never fetches any data. A genuine Shelly does
> this out of the box; with an emulator (e.g. uni-meter) its mDNS service has to be running.

**Good to know**

- `meter.gridPower` is the grid exchange: positive = import, negative = export. Alongside it are
  `pvPower`, `loadPower`, `storagePower` and `plugPower` — the split is computed by the inverter.
- Per phase you get `meter.l1Voltage`/`l1Current`/`l1Power` (likewise for L2 and L3) plus
  `meter.frequency`. Power is signed: negative means that phase is currently exporting.
- `meter.connected` shows whether the meter is currently delivering. If it reads `false`, the
  connection to the meter has gone to sleep — just confirm the mode again in the dialog, which
  restarts it.
- Only the WB series can do this. The WiFi (T) models have neither a meter input nor a regulation
  for it, so the icon does not appear there.

## Config Manager

The adapter integrates with the ioBroker **Config Manager**, so every inverter and cloud station appears as a card on the *Config Manager* tab in the admin UI — with live status, controls and a settings dialog, without building your own VIS view.

**What is shown**

- Every **DTU/inverter** (`<dtuSerial>`) and every **cloud station** (`station-<id>`) the adapter has created.
- A live **connection indicator** (green/red), and for locally connected DTUs the **WiFi signal quality in percent** (0-100 %). The card title uses the name of the station (plant) the inverter belongs to — the name you gave it in the S-Miles app — plus the DTU serial number (e.g. `Zuhause · 4143A01CEDE4`), which keeps every inverter distinct; without a station it falls back to the model name or the serial number.
- **Live values right on the card:** current power (W), today's energy (kWh), the power of each PV string the inverter actually has (one line per string) and the inverter temperature — all updated automatically. Stations show the aggregated power, the **PV utilization in percent**, the daily, yearly and total energy, and the daily and total income in the plant's currency (the income lines only appear when an electricity price is configured in the cloud).
- A device **icon** by type — a flat micro-inverter, an upright three-phase inverter (HMT line), or a station. The same icons are used for the device objects in the object tree.
- A **firmware-update indicator** when the cloud reports one (from `dtu.fwUpdateAvailable`).
- The **"More"** button opens a read-only details panel, grouped into **Inverter** (model, serial number, hardware/software version), **DTU / firmware** (serial number, firmware versions, WiFi version, update indicator), **Network** (the address in use, signal quality, SSID, IP and MAC addresses, DNS, DHCP) and **Cloud server** (domain, port). The network and server sections only appear for locally connected devices, because those values arrive over the local link alone.

> **Why not every network field shows up there:** the DTU's configuration message covers the **whole Hoymiles DTU family**. Besides the WiFi fields it carries a set for **wired networking** (IP, MAC, subnet mask, gateway, cable DNS) and fields for **cellular** (APN, GPRS) and Sub-1GHz radio. An HMS inverter is WiFi-only, so its wired fields stay at `0.0.0.0` and `00:00:00:00:00:00` forever. The adapter hides any field the device reports no real value for — otherwise the panel would state an address that does not exist. A numeric `0` stays visible: for a flag such as DHCP that is an answer, not an absence. Stations show capacity, status and address.

**Controls and settings — split by persistence**

The card mirrors the writable states, so a click routes through the normal command path (local TCP link preferred, cloud fallback). The two dialogs are split strictly by **what the device keeps**:

> ⚠️ The state names mislead here; the firmware decides otherwise: `inverter.powerLimit` sounds like a runtime knob but is written into the persisted structure and costs two 4 KB flash sectors per change, while `config.limitPowerMyPower` is named "persistent" yet lives in RAM only and is gone after a restart. Both are firmware-verified (`_fwanalysis/ADAPTER_FINDINGS.md` §1, §2, §15).

**Controls** (slider icon) — nothing here survives a DTU restart:

- **Operation (switches):** inverter on/off, lock inverter.
- **Runtime:** power limit (DTU config field) as a slider, cloud send interval. Both carry a note that the DTU forgets them on restart.

Every slider is preceded by its current value and unit, because the slider itself only reveals it while being dragged.

**Settings** (gear icon, local devices only) — everything the DTU keeps:

- Power limit, power factor limit, reactive power limit.
- Every field carries the note that frequent changes wear out the device memory. The dialog writes **only the fields you actually changed** — an untouched field is not rewritten.

**Card buttons** (with confirmation): reboot inverter, reboot DTU and — **only when there is something to acknowledge** — acknowledge warnings and acknowledge grounding fault. The warning button appears while `alarms.hasActive` is set; the grounding button only while the alarm list holds an active entry with the grounding alarm code (182). Neither is shown until the alarm list has been read.

> On the **WB series** the grounding button never appears: the firmware accepts the command but provably does not carry it out (empty branch, "no error" reply). A button that reports success and does nothing is misleading. On the T series the command is executed.

> **A note on the Admin version:** the card deliberately uses only display features that older Admin versions support. Admin 7.8.x ships the Device Manager GUI in its `dm-utils 3.0.x` form, which does not yet know custom status symbols (`indicators`) and drops them without a trace — so the WiFi quality and the PV utilization sit where every version renders them, and the acknowledge icons are shipped at the size they should appear in (the Admin does not scale them).

For **cloud-only** inverters (no local connection, e.g. HMS-800-2WB) only the actions the cloud can actuate are shown — inverter on/off, reboot inverter, reboot DTU — because the other commands are local-only. Stations show status and details only (no controls).

**Instance actions** (above the device list): **Scan network** searches the LAN for DTUs and reports what it finds, and **Test cloud login** runs the login diagnostics. (Reloading the list uses the Config Manager's own built-in refresh button.)

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

BLE devices (HMS-800-2WB) use the same principle with slower steps, because every attempt is a full GATT round through the Bluetooth proxy: 5s, 10s, 20s, ... up to 5min max, reset once the pairing succeeds. Failed attempts during the night are logged at `debug`; only the first failure of a series appears as a warning.

### Cloud downlinks (server → adapter)

> **The relay concerns the TCP devices only** (HMS-*-xT). There the DTU serves a single socket
> on port 10081: while the adapter is connected locally the device cannot reach the cloud
> itself, so the adapter uploads on its behalf. A BLE device (HMS-800-2WB) has no local TCP
> port; the adapter never takes its cloud connection away and it keeps uploading by itself. The
> adapter therefore starts **no** relay for BLE devices — it would create a second data stream
> under the same serial number.
>
> The relay connects to the server and port from the DTU's own configuration. On port 10083
> (the default of firmware V01.01.01 and later) it speaks TLS and verifies the server against
> Hoymiles' own CA, exactly as the DTU does; on port 10081 it speaks plain HM like older firmware.
> The frames inside are the same either way — the DTU identifies itself to the cloud by its
> serial number alone, not by a certificate.

While the relay runs, the cloud server acknowledges the uploads and occasionally sends
commands. The adapter maps **every** such message to its firmware name:

| Kind | Examples | Behaviour |
|------|----------|-----------|
| Acknowledgements of our uploads | `InfoDataRes`, `HBRes`, `RealRes`, `HistoryRes` | server time and timezone offset are read; if the server rejects an upload (`error_code ≠ 0`) a warning is logged |
| Commands | `CommandRes` (action) | handed to the device over the local connection; the server receives acknowledgement and status |
| Data requests | grid profile (action 41), version (action 4) | answered from data read locally |
| Not executed | OTA download (action 2/15), configuration writes (action 52–54 and 56/57) | **deliberately refused** and logged — a firmware update or a server redirect is never carried out unattended |

Messages whose behaviour is not yet established are logged with their name and length instead
of being discarded. An unimplemented downlink is therefore visible in the log and no longer
indistinguishable from no downlink at all.

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

### `<dtuSerial>.inverter.*` — Inverter Status & Control (per DTU)

| State | Type | Unit | Writable | Description |
|-------|------|------|----------|-------------|
| `inverter.serialNumber` | string | — | no | Inverter serial number |
| `inverter.model` | string | — | no | Inverter model (cloud) |
| `inverter.hwVersion` | string | — | no | Hardware version |
| `inverter.swVersion` | string | — | no | Software version |
| `inverter.temperature` | number | °C | no | Inverter temperature |
| `inverter.powerLimit` | number | % | **yes** | Power limit, 2–100 %, local. **Use this state to realize zero-export / dynamic curtailment.** ⚠️ Every write programs flash inside the device (see the warning below) — the adapter therefore throttles it with a dead band and a minimum interval |
| `inverter.activePowerLimit` | number | % | no | Active power limit (live, local) |
| `inverter.active` | boolean | — | **yes** | Turn inverter on/off (local; via the cloud for cloud-only devices). On a hybrid inverter the value is read back from the cloud: on while the cloud reports it connected and in On-grid Mode or exchanging AC power, off while disconnected |
| `inverter.reboot` | boolean | — | **yes** | Reboot inverter (button, local; via the cloud for cloud-only devices) |
| `inverter.powerFactorLimit` | number | — | **yes** | Power factor limit (-1 to 1, local). ⚠️ Programs flash just like the power limit (action 47, same success path) — throttled |
| `inverter.reactivePowerLimit` | number | ° | **yes** | Reactive power limit (-50 to 50, local). ⚠️ Programs flash just like the power limit (action 48, same success path) — throttled |
| `inverter.cleanWarnings` | boolean | — | **yes** | Acknowledge warnings (button, local). Works on both device series |
| `inverter.cleanGroundingFault` | boolean | — | **yes** | Acknowledge grounding fault (button, local). ⚠️ **No effect on the WB series** — its firmware accepts the command, does not carry it out, and still reports success (firmware-verified). The T series executes it |
| `inverter.lock` | boolean | — | **yes** | Lock/unlock inverter (local) |
| `inverter.warnCount` | number | — | no | SGSMO `warning_number` field, raw value (local) — not a documented warn code |
| `inverter.warnMessage` | string | — | no | Active warning message from the WCode alarm list (local) |
| `inverter.linkStatus` | number | — | no | Link status |

### `<dtuSerial>.dtu.*` — DTU Information (per DTU, local only except `dtu.reboot`)

| State | Type | Unit | Description |
|-------|------|------|-------------|
| `dtu.serialNumber` | string | — | DTU serial number |
| `dtu.swVersion` | string | — | Software version |
| `dtu.hwVersion` | string | — | Hardware version |
| `dtu.signalQuality` | number | % | WiFi signal quality (0–100, **not dBm** — the DTU reports the same derived quality as `config.wifiSignalQuality`) |
| `dtu.reboot` | boolean | — | Reboot DTU (**writable**, button). Sent over the local TCP link when connected, otherwise over the cloud for cloud-only devices (e.g. HMS-800-2WB) |
| `dtu.wifiVersion` | string | — | WiFi version |
| `dtu.fwUpdateAvailable` | boolean | — | Firmware update available (checked once daily via cloud) |
| `dtu.stepTime` | number | s | Step time |
| `dtu.accessModel` | number | — | Network access mode (0=GPRS, 1=WiFi, 2=Ethernet) |
| `dtu.communicationTime` | number | — | Last communication (Unix timestamp) |
| `dtu.connState` | number | — | DTU error code (0=OK) |

### `station-<id>.grid.*` — Station Aggregates (cloud)

| State | Type | Unit | Description |
|-------|------|------|-------------|
| `grid.power` | number | W | Total station power (live in ~1.5–3 s via the burst channel — also in a purely local setup; only ~80 s when the burst is switched off) |
| `grid.gridPower` | number | W | Grid exchange power (realtime, +import/−export) — non-zero only on metered systems |
| `grid.loadPower` | number | W | Load/consumption power (realtime) |
| `grid.batteryPower` | number | W | Battery power (realtime) — battery systems only. On a storage plant: +discharging/−charging, like the charts of the S-Miles portal; the direction is taken from the cloud's energy-flow graph, as the portal does |
| `grid.pvUtilization` | number | % | PV utilization (realtime) |
| `grid.dailyEnergy` | number | kWh | Daily energy |
| `grid.gridImportToday` / `gridImportMonth` / `gridImportYear` / `gridImportTotal` | number | kWh | Energy the load drew from the grid today / this month / this year / in total — plants with battery or grid meter only; source: the S-Miles app's "Production & Consumption" tab |
| `grid.gridExportToday` / `gridExportMonth` / `gridExportYear` / `gridExportTotal` | number | kWh | PV energy fed into the grid today / this month / this year / in total — plants with battery or grid meter only; source: the S-Miles app's "Production & Consumption" tab |
| `grid.pvToLoadToday` / `pvToLoadMonth` / `pvToLoadYear` / `pvToLoadTotal` | number | kWh | PV energy used directly by the load today / this month / this year / in total — plants with battery or grid meter only; source: the S-Miles app's "Production & Consumption" tab |
| `grid.consumptionToday` / `consumptionMonth` / `consumptionYear` / `consumptionTotal` | number | kWh | Consumption today / this month / this year / in total (load from PV + battery + grid) — plants with battery or grid meter only; source: the S-Miles app's "Production & Consumption" tab |
| `grid.selfSufficiencyToday` / `selfSufficiencyMonth` / `selfSufficiencyYear` / `selfSufficiencyTotal` | number | % | Self-sufficiency today / this month / this year / in total: the share of consumption not drawn from the grid, one decimal, 0 while nothing was consumed — computed like the app — plants with battery or grid meter only; source: the S-Miles app's "Production & Consumption" tab |
| `grid.batteryChargeToday` / `batteryChargeMonth` / `batteryChargeYear` / `batteryChargeTotal` | number | kWh | PV energy charged into the battery today / this month / this year / in total — battery systems only |
| `grid.batteryDischargeToday` / `batteryDischargeMonth` / `batteryDischargeYear` / `batteryDischargeTotal` | number | kWh | Energy the load drew from the battery today / this month / this year / in total — battery systems only |
| `grid.monthEnergy` | number | kWh | Monthly energy |
| `grid.yearEnergy` | number | kWh | Yearly energy |
| `grid.totalEnergy` | number | kWh | Total lifetime energy |
| `grid.co2Saved` | number | kg | CO2 saved |
| `grid.treesPlanted` | number | — | Equivalent trees planted |
| `grid.electricityPrice` | number | /kWh | Electricity price |
| `grid.currency` | string | — | Currency code |
| `grid.isBalance` | boolean | — | Zero export active |
| `grid.isReflux` | boolean | — | Feed-in active |
| `grid.todayIncome` / `monthIncome` / `yearIncome` / `totalIncome` | number | — | Income today / this month / this year / in total. Where the cloud keeps its own accounting (plants with a tariff), its figures are used; otherwise today/total are estimated as yield × price |
| `grid.todayCost` / `monthCost` / `yearCost` / `totalCost` | number | — | Electricity cost today / this month / this year / in total, from the cloud's accounting — plants with a tariff only |

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

### `<dtuSerial>.history.*` — Day Power Curve (per DTU, local)

The inverter keeps its own power curve for the day in flash. The adapter fetches it in the
slow-poll rotation (`0xa315`) — **without the cloud**, on the TCP path as well as over BLE.

The device splits the day into pages of at most 200 samples and reports how many there are. The
adapter collects every page and publishes the curve only once the whole day is together — page 0
alone ends at mid-morning.

Measured on an HMS-800W-2T: 903 samples at one per minute across 15 h, peaking at 602 W at 14:06.
The HMS-800-2WB delivers the same curve at a 300 s step starting at midnight.

> **About the unit:** the firmware does not state it — the field is copied out of the flash record
> without any conversion. The 0.1 W factor is therefore **measured, not read off the code**:
> integrating the curve over the day yields **4495 Wh** against the **4500 Wh** the device reports
> itself, a 0.12 % difference. A factor of 1 or 0.01 would be off by a power of ten.

| State | Type | Unit | Writable | Description |
|-------|------|------|----------|-------------|
| `history.powerJson` | string | W | no | Day power curve as a JSON array, one value per step |
| `history.startTime` | number | ms | no | Timestamp of the **first** sample of the curve |
| `history.stepTime` | number | s | no | Seconds between two samples (2T: 60, 2WB: 300) |
| `history.dailyEnergy` | number | Wh | no | Daily energy as reported by the device |
| `history.totalEnergy` | number | kWh | no | Total energy as reported by the device |

Timestamp of a sample: `history.startTime + index * history.stepTime * 1000`.

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

> ⚠️ **WARNING — every power-limit write programs flash inside the device.**
>
> It affects **`inverter.powerLimit`, `inverter.powerFactorLimit` and
> `inverter.reactivePowerLimit`** — all three run through the same success path (actions 8, 47
> and 48). It does **not** affect `config.limitPowerMyPower`: that configuration field only
> reaches RAM. Earlier versions of this documentation had the two the wrong way round —
> `inverter.powerLimit` was described as a RAM-only runtime command and
> `config.limitPowerMyPower` as the flash writer. Both were wrong. At the end of a successful command the firmware calls the configuration
> serializer, which **erases and rewrites two 4 KB flash sectors** (HMS-800W-2T: `0x4080d642` →
> erase + write for region 3 and region 0xe; HMS-800-2WB: `sys_cfg_write` runs
> `nv_erase`+`nv_write` twice). Flash endurance is finite — tens of thousands of cycles — so a
> per-second zero-export loop wears it out and can **permanently brick the device**.
>
> **The adapter guards against this:** the settings (*Local* tab) offer a **dead band**
> (default 1 %) and a **minimum interval** (default 60 s). A change below the dead band, or one
> that comes too soon after the last write, is not sent; the state is still acknowledged and the
> log says why. Both values can be adjusted or switched off with 0 — anyone who deliberately wants
> to regulate faster can, and accepts the wear.
>
> For zero-export, `inverter.powerLimit` remains the right state: it takes effect immediately.
> It is **not** a flash-free path, however — which is exactly why the dead band and the minimum
> interval exist. `config.limitPowerMyPower` costs no flash but does not survive a restart on
> the HMS-800W-2T and issues no command to the inverter.

> ⚠️ **Writing configuration — the adapter always reads first.**
>
> The DTU adopts **every** field of a configuration message, including the ones the protocol does
> not even transmit because they hold their default value. Sending only the field you want to
> change therefore clears all the others. Firmware-verified for the HMS-800W-2T:
> `server_domain_name`, `serverport`, `limit_power_mypower`, `server_send_time`, `lock_password`
> and `lock_time` are overwritten unguarded. On the 2WB exactly that destroyed the server address,
> the port and the power limit in a live test.
>
> The adapter therefore **never writes a partial set**: it takes the configuration last read from
> the device, changes only the requested field in it, and sends everything back. If no
> configuration has been read in the current session, the write is **refused** and the reason is
> logged — better not to write than to write incompletely.
>
> WiFi credentials are left alone: the device only adopts them when an additional field is set,
> which the adapter deliberately leaves empty.

| State | Type | Unit | Writable | Description |
|-------|------|------|----------|-------------|
| `config.serverDomain` | string | — | no | Cloud server domain |
| `config.serverPort` | number | — | no | Cloud server port |
| `config.serverSendTime` | number | min | **yes** | Cloud send interval (minutes). ⚠️ **Neither persistent nor a flash write** (firmware-verified): SetConfig field 10 only lands in RAM (`gp-110188`); the SetConfig path writes flash solely in the WiFi/AP password branch. Earlier versions of this documentation called it "persistent (DTU flash)" — that was wrong. Set it again after a device restart |
| `config.limitPowerMyPower` | number | % | **yes** | Power limit via the DTU's **configuration field** (2–100 %, local). ⚠️ **On the HMS-800W-2T this value does NOT survive a reboot** (firmware-verified) — earlier versions of this documentation claimed the opposite. Set it again after a device restart. **Contrary to earlier claims it writes no flash either** — its target `gp-108260` (`0x6c204`) lies outside the persisted structure `0x6b8dc` |
| `config.wifiSsid` | string | — | no | WiFi SSID |
| `config.wifiSignalQuality` | number | % | no | WiFi **signal quality 0–100**, **not dBm** despite the field name. The firmware derives it from the raw RSSI as `clamp(2*(95 - |rssi|), 0, 100)` and names the two values `rssi` (raw) and `wifi_rssi` (this one) in its own debug output. A reading of 46 corresponds to roughly −72 dBm. Earlier versions of this documentation called it “real dBm, e.g. −65” — that was wrong. The raw dBm value stays in the neighbouring byte and is not reachable through any message the adapter uses. The device reports the same quantity as `csq` in its NetworkInfo message — the same byte, so a separate state would be a duplicate |
| `config.invType` | number | — | no | Inverter type |
| `config.netmodeSelect` | number | — | no | Network mode (0=GPRS, 1=WiFi, 2=Ethernet) |
| `config.netDhcpSwitch` | number | — | no | DHCP enabled |
| `config.wifiIpAddress` | string | — | no | WiFi IP address |
| `config.wifiMacAddress` | string | — | no | WiFi MAC address |
| `config.dtuApSsid` | string | — | no | DTU access point SSID |
| `config.ipAddress` | string | — | no | IP address (Ethernet/primary interface) |
| `config.subnetMask` | string | — | no | Subnet mask |
| `config.gateway` | string | — | no | Default gateway |
| `config.dnsServer` | string | — | no | DNS server |
| `config.macAddress` | string | — | no | MAC address |
| `config.meterKind` | string | — | no | Configured meter type. Empty on devices without a meter input — the HMS-800W-2T has none (firmware-verified), so an empty value is the correct answer there |
| `config.meterInterface` | string | — | no | Interface the meter is attached to |
| `config.zeroExportEnable` | number | — | no | Zero-export flag as reported by the DTU |
| `config.zeroExport433Addr` | number | — | no | Zero-export 433 MHz address |
| `config.lockTime` | number | s | no | Inverter lock duration (0 = no lock) |

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

### `<dtuSerial>.meter.*` — Wired Energy Meter (per DTU, local, dynamic)

Meter states are created automatically when meter data is first received from the DTU. Only available if a compatible wired energy meter (DTU-Pro style, Modbus) is connected.

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
| `meter.energyPhaseAExport` | number | kWh | Phase A energy export |
| `meter.energyPhaseBExport` | number | kWh | Phase B energy export |
| `meter.energyPhaseCExport` | number | kWh | Phase C energy export |
| `meter.energyPhaseAImport` | number | kWh | Phase A energy import |
| `meter.energyPhaseBImport` | number | kWh | Phase B energy import |
| `meter.energyPhaseCImport` | number | kWh | Phase C energy import |
| `meter.powerFactorPhaseA` | number | — | Power factor phase A |
| `meter.powerFactorPhaseB` | number | — | Power factor phase B |
| `meter.powerFactorPhaseC` | number | — | Power factor phase C |
| `meter.faultCode` | number | — | Meter fault code |

### `<dtuSerial>.meter.*` — Network Energy Meter (Shelly / ecotracker, BLE series, local, dynamic)

Created on demand for an inverter of the WB series once a meter has been paired from the *Config
Manager* — see [Connecting an energy meter](#connecting-an-energy-meter-shelly--ecotracker). The T
series has neither a meter input nor a regulation for it, so these states never appear there.

| State | Type | Unit | Writable | Description |
|-------|------|------|----------|-------------|
| `meter.mode` | number | — | **yes** | Operating mode: `0` = unbound (starting value, not a command), `1` = meter only, `2` = grid meter for zero export |
| `meter.deviceId` | string | — | **yes** | MAC of the meter to bind, bare hex or with separators |
| `meter.detected` | string | — | no | Meters the inverter found on the network (JSON list) |
| `meter.connected` | boolean | — | no | Whether the meter is currently delivering data |
| `meter.lastData` | number | — | no | Timestamp of the last meter reading |
| `meter.gridPower` | number | W | no | Grid exchange: positive = import, negative = export |
| `meter.pvPower` | number | W | no | PV share computed by the inverter |
| `meter.loadPower` | number | W | no | House load computed by the inverter |
| `meter.storagePower` | number | W | no | Battery share computed by the inverter |
| `meter.plugPower` | number | W | no | Plug/aux share computed by the inverter |
| `meter.frequency` | number | Hz | no | Grid frequency at the meter |
| `meter.l1Voltage` | number | V | no | Voltage L1 |
| `meter.l1Current` | number | A | no | Current L1 |
| `meter.l1Power` | number | W | no | Power L1 (signed: negative = exporting) |
| `meter.l2Voltage` | number | V | no | Voltage L2 |
| `meter.l2Current` | number | A | no | Current L2 |
| `meter.l2Power` | number | W | no | Power L2 (signed) |
| `meter.l3Voltage` | number | V | no | Voltage L3 |
| `meter.l3Current` | number | A | no | Current L3 |
| `meter.l3Power` | number | W | no | Power L3 (signed) |

### `<dtuSerial>.*` — Hybrid Inverter with Battery (HAT series, cloud, dynamic)

Created only when the cloud reports a hybrid inverter below the DTU; all of them are read-only and come from the cloud. The inverter's totals use the states every device has: `grid.power` (combined active power), `grid.frequency`, `inverter.temperature` (internal ambient temperature), `inverter.model` / `serialNumber` / `swVersion`, and `pv0.*` / `pv1.*` (`power`, `voltage`, `current`, and `dailyEnergy` when the cloud delivers it) for the PV inputs — only when PV is actually connected to the hybrid inverter; on an AC-coupled plant, where the PV comes from a separate inverter behind a PV meter (`station-<id>.pvMeter.*`), the cloud flags the inverter's inputs as unused and no `pvN` states are created. `battery.*` exists once a battery hangs below the inverter — it is the one place for everything about the battery; the station only carries the plant's power flow and energy balance (`grid.batteryPower`, `grid.batteryCharge*`, `grid.batteryDischarge*` for today, month, year and lifetime). Rows marked ⁺ are part of the cloud's vocabulary for these devices but were not delivered by the reference system — they appear only if your device reports them.

| State | Type | Unit | Description |
|-------|------|------|-------------|
| `grid.l1Voltage` / `l2…` / `l3…` | number | V | Inverter AC voltage per phase |
| `grid.l1Current` / `l2…` / `l3…` | number | A | Inverter AC current per phase |
| `grid.l1Power` / `l2…` / `l3…` | number | W | Inverter active power per phase |
| `grid.l1ReactivePower` / `l2…` / `l3…` | number | var | Inverter reactive power per phase |
| `inverter.operatingState` | number | — | Operating state as a number (3 = on-grid was observed; the full value list is not known yet) |
| `inverter.operatingStateText` | string | — | Operating state as the cloud words it |
| `inverter.busVoltage` | number | V | DC bus voltage |
| `inverter.drmMode` | number | — | DRM (demand response) mode |
| `inverter.pvPower` | number | W | PV power of all inputs together |
| `inverter.pvEnergyToday` ⁺ | number | kWh | PV energy of all inputs today |
| `inverter.pvHeatsinkTemperature` / `heatsinkTemperature` / `batteryHeatsinkTemperature` ⁺ | number | °C | Heatsink temperatures of the PV, inverter and battery stage |
| `inverter.powerFaultCode` / `safetyFaultCode` ⁺ | string | — | Fault codes of the power and the safety controller |
| `eps.l1Voltage` / `l2…` / `l3…` | number | V | Backup (EPS) output voltage per phase |
| `eps.l1Current` / `l2…` / `l3…` | number | A | Backup (EPS) output current per phase |
| `eps.l1Power` / `l2…` / `l3…` | number | W | Backup (EPS) output active power per phase |
| `battery.serialNumber` / `model` / `swVersion` / `hwVersion` | string | — | Battery identity from the cloud's device list |
| `battery.capacity` | number | kWh | Installed battery capacity |
| `battery.connected` | boolean | — | Battery reported online by the cloud |
| `battery.type` | string | — | Battery chemistry as the cloud words it (e.g. `Li-Ion`) |
| `battery.soc` | number | % | State of charge — about every 10 s through the fast realtime channel, otherwise with the battery's regular values |
| `battery.soh` | number | % | State of health |
| `battery.state` | number | — | Battery state as a number (2 = discharging was observed) |
| `battery.stateText` | string | — | Battery state as the cloud words it |
| `battery.faultCode` | string | — | Battery fault code (`0` = none) |
| `battery.voltage` / `current` / `power` | number | V / A / W | Battery measurements from the battery management system |
| `battery.cycles` ⁺ | number | — | Charge cycles |
| `battery.heating` / `heatingText` ⁺ | number / string | — | Battery heating status, as a number and as the cloud words it |
| `battery.workMode` | number | — | Working mode: 1 = self-consumption, 2 = economy, 3 = backup, 4 = off-grid, 5 = forced charging, 6 = forced discharging, 7 = peak shaving, 8 = time of use. Arrives with the regular station poll — nothing is sent to the device for it |
| `battery.readSettings` | boolean (button) | — | Reads the battery settings from the device. **Reads only** — but the request travels down to the device and takes a few seconds, so it runs once per adapter start and then only when you press this button |
| `battery.reserveSoc` | number | % | Reserved state of charge of the active working mode (from the settings read) |
| `battery.settingsJson` | string (JSON) | — | The complete settings as the device reports them: active mode plus the parameters of every mode (`k_1`…`k_8`: reserve SoC, power limits, time windows, tariffs). Passed on untouched — the parameters carry no units and differ by mode |
| `battery.settingsUpdated` | number | — | When the settings were last read |
| `dryContact.readSettings` | boolean (button) | — | Reads the dry-contact (relay) settings from the device — generator start/stop thresholds, load-control windows, SoC limits. **Reads only**; like the battery settings it travels down to the device, so it runs once per adapter start and then on this button. A plant whose relay hardware answers none of the known action codes is left alone |
| `dryContact.mode` | number | — | Relay mode (0 = off) |
| `dryContact.settingsJson` | string (JSON) | — | The complete relay settings as the device reports them, untouched |
| `dryContact.settingsUpdated` | number | — | When the relay settings were last read |
| `alarms.cloudActiveCount` / `alarms.cloudActiveJson` | number / string (JSON) | — | Active alarms of the inverter and its DTU as the cloud lists them (`code`, `time`, `source`, raw data words), refreshed on the slow poll |
| `history.powerJson` / `batteryPowerJson` / `socJson` / `pvPowerJson` | string (JSON) | W / W / % / W | Today's curves of AC power, battery power, state of charge and — with PV on the inverter — PV power, one value per 5 minutes; `history.startTime` (ms) and `history.stepTime` (s) as for the local curve. Refreshed on the slow poll |
| `battery.maxChargeCurrent` / `maxDischargeCurrent` | number | A | Current limits the battery allows |
| `battery.chargeCutoffVoltage` / `dischargeCutoffVoltage` | number | V | Voltage limits of the battery |
| `battery.cellTempMax` / `cellTempMin` | number | °C | Hottest / coldest cell |
| `battery.moduleTempMax` / `moduleTempMin` | number | °C | Hottest / coldest module |
| `battery.cellVoltageMax` / `cellVoltageMin` | number | V | Highest / lowest cell voltage |
| `battery.moduleVoltageMax` / `moduleVoltageMin` | number | V | Highest / lowest module voltage |
| `battery.inverterVoltage` / `inverterCurrent` / `inverterPower` | number | V / A / W | The same battery as the inverter measures it at its own terminals |

### `station-<id>.*` — Measuring Points: Grid Meter, Loads, PV Meter, Generator (cloud, dynamic)

Read from the cloud for every plant that has them — the adapter asks only for what the cloud flags as present, so a plant without any of these costs no extra request and gets no extra states. All read-only; needs an installer-type account. Values follow the device's upload to the cloud (about every 5 minutes). Signs are passed through as delivered. Rows marked ⁺ were not delivered by the reference system and appear only if your plant reports them.

| State | Type | Unit | Description |
|-------|------|------|-------------|
| `gridMeter.connected` | boolean | — | Grid meter reported online |
| `gridMeter.power` / `reactivePower` / `powerFactor` / `frequency` | number | W / var / — / Hz | Totals at the grid connection |
| `gridMeter.l1Voltage` / `l1Current` / `l1Power` / `l1ReactivePower` / `l1PowerFactor` (also `l2…`, `l3…`) | number | V / A / W / var / — | Per-phase readings of the grid meter |
| `gridMeter.importToday` / `exportToday` ⁺ (also per phase: `l1ImportToday`, `l1ExportToday`, …) | number | kWh | Energy drawn from / fed into the grid today |
| `load.l1Voltage` / `l1Power` (also `l2…`, `l3…`) | number | V / W | Voltage and active power on the load side |
| `load.energyToday` ⁺ (also per phase: `l1EnergyToday`, …) | number | kWh | Energy consumed today |
| `load.mode` / `modeText` ⁺ | number / string | — | Load mode, as a number and as the cloud words it |
| `pvMeter.connected` | boolean | — | PV meter reported online (a meter on a third-party PV inverter) |
| `pvMeter.power` / `reactivePower` / `frequency` | number | W / var / Hz | Totals of the metered PV inverter |
| `pvMeter.l1Voltage` / `l1Current` / `l1Power` / `l1ReactivePower` (also `l2…`, `l3…`) | number | V / A / W / var | Per-phase readings of the PV meter |
| `pvMeter.energyToday` ⁺ (also per phase: `l1EnergyToday`, …) | number | kWh | Energy of the metered PV inverter today |
| `generator.state` / `stateText` ⁺ | number / string | — | Generator status |
| `generator.power` / `reactivePower` / `frequency` ⁺ | number | W / var / Hz | Generator totals |
| `generator.l1Voltage` / `l1Current` / `l1Power` / `l1ReactivePower` (also `l2…`, `l3…`) ⁺ | number | V / A / W / var | Per-phase generator readings |
| `generator.energyToday` ⁺ (also per phase: `l1EnergyToday`, …) | number | kWh | Generator energy today |

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
- **Encryption:** none up to DTU firmware V01.00.x. From V01.01.01 on, the DTU sets bit 25 of `dfs` in its InfoData answer and expects **AES-128-GCM** on every other local frame — key and nonce are derived from the 16-byte `enc_rand` it sends in the clear, the 16-byte authentication tag follows the ciphertext beyond the frame length. The adapter detects this in the first answer and switches by itself. Only the InfoData request and answer stay plain.
- **Heartbeat:** a protobuf heartbeat after 20 s without traffic keeps the persistent connection open
- **Reconnect:** after 5 minutes without data, and on every disconnect, with exponential backoff from 1 s up to 5 minutes

### Cloud (S-Miles API)

- **Base URL:** `https://neapi.hoymiles.com`; stations in the EU data centre are served from `https://euapi.hoymiles.com`, and the adapter picks the host per station
- **Authentication:** challenge login; Argon2id when the server supplies a salt (S-Miles Home), otherwise the legacy MD5/SHA-256 hash the web portal sends
- **Data:** station realtime and details, device tree, per-device realtime indicators (hybrid inverter, battery, meters), the fast realtime burst channel, day curves, the energy statistics (day, month, year, lifetime), income and cost, alarm lists, and device tasks (settings reads, power on/off, reboot)
- **Cloud relay:** the adapter forwards the DTU's data to the server and port configured in the DTU — plain TCP on port 10081 for older firmware, TLS on port 10083 (verified against Hoymiles' own root CA) for firmware V01.01.01 and later
- **Password:** Stored encrypted in ioBroker config

### Acknowledgments

Community projects that made the first steps possible:
- [hoymiles-wifi](https://github.com/suaveolent/hoymiles-wifi) — Python library
- [dtuGateway](https://github.com/ohAnd/dtuGateway) — ESP32 gateway
- [Hoymiles-DTU-Proto](https://github.com/henkwiedig/Hoymiles-DTU-Proto) — original protobuf definitions

Today the protocol is checked against the S-Miles app and the DTU and inverter firmware themselves.

Thanks to the users who lent their systems:
- **BastiBerlin** — access to a HAT-6.0HV-EUG1 hybrid system with battery, the reference for the hybrid-inverter support
- **akwf1927** — first test of DTU firmware V01.01.01 on an HMS-400W-1T and an HMS-800W-2T, locally and through the TLS cloud relay

## Troubleshooting

### Adapter can't connect
- Verify the DTU IP address is correct (check your router's DHCP table)
- Make sure no other application is connected to port 10081 (only one connection at a time)
- If you have the dtuGateway ESP32 running, stop it first

### No data after connecting
- Check the adapter log for protobuf decode errors
- `Decryption failed: ... wrong final block length` or `bad decrypt` on a DTU with firmware V01.01.01 means an adapter version without support for the encrypted protocol is running. Install the current version and restart the instance; the log then says `DTU requires encrypted communication (firmware V01.01.01+)`

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