![Logo](admin/sunenergyxt500.png)
# ioBroker.sunenergyxt500

[![NPM version](https://img.shields.io/npm/v/iobroker.sunenergyxt500.svg)](https://www.npmjs.com/package/iobroker.sunenergyxt500)
[![Downloads](https://img.shields.io/npm/dm/iobroker.sunenergyxt500.svg)](https://www.npmjs.com/package/iobroker.sunenergyxt500)
![Number of Installations](https://iobroker.live/badges/sunenergyxt500-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/sunenergyxt500-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.sunenergyxt500.png?downloads=true)](https://nodei.co/npm/iobroker.sunenergyxt500/)

**Tests:** ![Test and Release](https://github.com/Creekhail/ioBroker.sunenergyxt500/workflows/Test%20and%20Release/badge.svg)

## sunenergyxt500 adapter for ioBroker

Integration and self-consumption control for **[SunEnergyXT 500 / 500 PRO](https://www.sunenergyxt.com/details-500-series)** AC-coupled hybrid battery storage systems (manufacturer: [SunEnergyXT](https://www.sunenergyxt.com/)) via the device's **local HTTP API** — no cloud account required. One instance manages **up to three heads** (storage towers).

## Language / Sprache

- [English](README.en.md) (default)
- [Deutsch](README.de.md)

## Features

* Manages **one to three heads** in a single instance, each under its own subtree `heads.<n>.*`, plus combined `total.*` aggregates.
* Polls the local API (`GET /read`) and mirrors all stable fields to states: SoC, battery/grid/load/PV power, per-MPPT current/voltage, daily energy counters, per-pack SoC, device/firmware info and meter status.
* Writable control fields (`POST /write`, confirmed by re-reading), matching the official integration's control surface except fields the API docs mark as *reserved*: grid setpoint `GS`, max feed-in `IS`, SoC limits `SI`/`SA`/`SO`, self-consumption mode `MM`, meter config `MD`, timezone `TZ`, restart `RT`, max grid output `MG`, the `LFB`/`LPS`/`PM` switches and local mode `LM` (⚠️ `LM=1` blocks cloud/app control until reset). Reserved fields (e.g. `PT`, `SI1`, `SA1`) are exposed read-only only.
* Two switchable **control modes**: an adapter-side self-consumption **controller** (writes `GS` from *any* ioBroker meter state, feed-forward + P, with watchdog/failsafe) that **splits one grid setpoint across all heads**, or **device self-regulation** (binds a supported meter into a single storage and lets the device control itself) — plus an **off** mode for pure monitoring.
* A **"Test all heads"** button in the admin checks reachability of each configured head (model + SoC) before you save.
* Connection indicator (`info.connection`) plus `info.lastUpdate`, and per-head `online` / `lastError`.
* The complete, unmodified `/read` response of each head is kept in `heads.<n>.info.rawResponse` (JSON), so any field the adapter does not map to a dedicated state can still be read from there.

## How this adapter works

This adapter controls the storage **locally**, without the manufacturer cloud. A single instance manages **one to three heads** (storage towers). Self-consumption can be handled in **two mutually exclusive ways** — you pick one via the **Control mode** setting:

**Mode B — Adapter controller (default-recommended, works with any meter, 1–3 heads).** ioBroker reads the current grid power from **any state you point it at** (`gridPowerStateId`) and the adapter writes the grid setpoint `GS` (feed-forward + P correction, with a watchdog). The meter can be *anything* ioBroker supports — Shelly, Tasmota, a smart-meter/Modbus adapter — **including meters the storage cannot read itself**. You provide one state holding the **net grid power in watts** (`>0` = draw, `<0` = feed-in; enable *invert source sign* if reversed; for kW / split import-export / per-phase meters compute a clean net value in a small ioBroker state first). With more than one head, the controller computes **one** total setpoint and **splits it across the online heads** — equally, capped at each head's power, and skipping a head that is full (while charging) or empty (while discharging); its share is redistributed to the others. The adapter forces `MM=0` on every head so the devices execute `GS`, and the meter stays fully usable in ioBroker.

**Mode A — Device self-regulation (supported meters, single head only).** The adapter binds a supported meter **into the storage** (`MM=1` + `MD`) and lets the **device regulate itself** — the manufacturer's own self-consumption, which may react faster than an external loop. This mode is available **only with a single head**; with two or three heads configured it cannot be selected — use the adapter controller instead. Only four meter types are supported (EcoTracker, Shelly 3EM, Shelly Pro 3EM, Tasmota) and the meter must be reachable by the storage on the LAN. The adapter does **not** write `GS` in this mode. The binding is just mDNS/HTTP polling, so the meter **stays usable in ioBroker** — unlike the manufacturer app's meter setup, which can reconfigure the meter and remove it from ioBroker; this adapter binds directly and avoids that.

**Off (default, monitoring only).** The adapter never writes `MM`/`MD`/`GS`; it only polls. You can still command `control.*` states manually.

In both control modes the adapter **owns `MM`**: on every poll it checks each head's `MM` against the chosen mode and re-asserts it (with a warning) if something else changed it — so a stray meter binding or an external script cannot silently disable control. Note: a head only executes a written `GS` when `MM=0`; with a meter bound (`MM=1`) it self-regulates and ignores `GS`.

**Multiple heads must be on different phases.** This is the operator's electrical responsibility — the adapter does not (and cannot) verify it. The controller regulates the **net (summed)** grid power your meter reports, which is what a standard netting German bidirectional meter bills; per-phase optimisation is out of scope.

**Local mode (`LM=1`) is required.** Each device only serves its local HTTP API (`/read` / `/write`) when **local mode is enabled** — with it off, `/read` returns no data (confirmed on the tested firmware). Enabling local mode also switches off cloud/app remote control; consequently the manufacturer's phone app can no longer control the device.

## Requirements

* One to three SunEnergyXT 500 (`PK=1`, 800 W) or 500 PRO (`PK=2`, 2400 W) heads reachable in the local network (mixed models are fine).
* **Local mode (`LM=1`) enabled** on each device — required for the local HTTP API to deliver values (see *How this adapter works*). This also disables cloud/app remote control.
* A meter, depending on the control mode: for **Mode B** (adapter controller) any meter whose grid power is available as an **ioBroker state**; for **Mode A** (device self-regulation, single head) one of the four supported meters (EcoTracker, Shelly 3EM, Shelly Pro 3EM, Tasmota) reachable by the storage on the LAN. Not needed in *Off* mode.

## Installation

1. In ioBroker admin open **Adapters**, search for **sunenergyxt500** and install it.
2. After installation an instance `sunenergyxt500.0` is created. Open its settings and enter the **Head 1 IP / hostname** (add **Head 2 / Head 3** if you have more heads). Leave the **Control mode** at *Off* for pure monitoring.
3. Save & close — the adapter starts polling and fills the object tree under `sunenergyxt500.0.heads.*` (and `total.*`).

## Configuration

**Connection**
* **Head 1 IP / hostname** (required) and **Head 2 / Head 3** (optional) — local addresses of your storage heads, each with an optional label. Up to three heads are managed by this single instance. Put multiple heads on **different phases** (operator's responsibility); the adapter regulates the **net summed** grid power. The same address cannot be entered twice.
* **Test all heads** — probes each configured head and reports model + SoC (or an error), so you can verify the addresses before saving.
* **Poll interval (s)** — how often each head is queried via `/read` (default 5 s).
* **Request timeout (ms)** — HTTP timeout (default 8000 ms).

**Control** — pick a **Control mode**:

*Off* (default) — monitoring only; the adapter never writes `MM`/`MD`/`GS`.

*Adapter controller* (Mode B) — fields:
* **Grid-power source state** — a foreign state holding your house meter's grid power. Convention: `>0` = grid draw, `<0` = feed-in. Enable **Invert source sign** if your meter uses the opposite convention.
* **Adaptive control** (default on): regulates in three manufacturer-proven tiers — small deviations gently (every 7 s, 20 W steps), medium ones every 2.5 s (120 W), large load steps immediately (450 W), with a fixed 5 W dead band. Disable it to tune the controller manually via the gain / dead band / write interval / step-limit fields (they only appear then).
* **Target grid power** (W, default 0): 0 = zero feed-in; positive values keep a small deliberate grid draw (never feed in), negative values a small deliberate feed-in — same sign convention as the source state (`>0` = draw).
* **Max. adjustment per correction** (W, default 500, 0 = unlimited): caps how far the setpoint moves per control step, so a high gain cannot overshoot on meter spikes.
* **Gain** (default 0.3), **Dead band** (W), **Min. write interval** (ms), **Per-head write dead band** (W — minimum change of a head's setpoint before it is re-written, to avoid chatter as the split shifts). Each head's maximum power is **detected automatically** from the device (800 W for a 500, 2400 W for a 500 PRO), so mixed setups work without extra configuration.
* **Watchdog warn / failsafe (s)** — if the grid source goes stale, the controller logs a warning and finally forces `GS=0` on **all heads** (safe neutral) until the source recovers. Watchdog telemetry is exposed under `controller.*`.

The controller reads each device's actual grid power (`GP`) back before correcting, which provides natural anti-windup when a device internally limits (e.g. by SoC).

*Device self-regulation* (Mode A, **single head only**) — fields:
* **Meter type** — EcoTracker / Shelly 3EM / Shelly Pro 3EM / Tasmota.
* **Meter SN / IP** — the serial number for Shelly/Tasmota (resolved via mDNS), or the LAN IP for EcoTracker (direct). For Tasmota use the SN prefix without the last 4 characters and set the **power key** matching your energy-monitor subtype.

The adapter binds the meter (`MM=1` + `MD`) and the device regulates itself; the adapter does not write `GS`. The bound meter stays usable in ioBroker. This mode is hidden/blocked once a second or third head is configured.

> **Safety:** In *Off* mode the adapter is read-only — it only polls `/read` and never writes unless you command a `control.*` state. In a control mode the adapter **enforces `MM`** on every head for that mode and re-asserts it if changed externally; do **not** run a second `GS` writer at the same time (your own script, or a device's `MM` with a different meter), otherwise they fight over the battery.

## Control behaviour, accuracy and limits

**What to expect:** The controller keeps the grid power inside a band of typically **±10–20 W around zero** and corrects load steps — depending on the settings — within **~1–3 seconds up to ~30 seconds**. A permanent, exact 0.0 W is **not achievable by design** — with any controller on this hardware:

* **Meter accuracy and noise:** the external meter itself measures with a tolerance and noise of a few watts — regulating below that is meaningless. (The `GS` setpoint has 1 W resolution, so the setpoint granularity is not the limit.)
* **Measurement-chain latency:** meter measures → ioBroker state → controller → `/write` → device ramps. Between a load step and its correction, ~1–3 seconds pass unavoidably.
* **Load dynamics:** A compressor or kettle switches in milliseconds — every controller reacts afterwards. Short power spikes in your charts are normal and energetically meaningless (watt-seconds).
* The controller regulates towards the configured **target grid power** (default 0) and oscillates **symmetrically** around it — short, small feed-in moments are part of zero feed-in. If you must never feed in, set the target to a small deliberate draw (e.g. +10 W).

**How the settings act:**

| Setting | Effect | smaller value | larger value |
|---|---|---|---|
| **Gain** | fraction of the deviation corrected per step | sluggish, smooth (0.3 ≈ 7 steps to ~0) | fast (1.0 = one correction), but reacts harder to meter noise; >1 can overshoot |
| **Target grid power (W)** | the value the grid power is regulated to | <0 = deliberate feed-in | >0 = deliberate draw ("never feed in") |
| **Max. adjustment per correction (W)** | caps the setpoint movement per step | tames meter spikes at high gain | larger (or 0 = unlimited) reacts faster to huge load steps |
| **Dead band (W)** | deviations below it are ignored | more precise, more writes (0 = correct everything) | calmer, leaves a small permanent deviation |
| **Min. write interval** | cadence of corrections | faster settling (floor 1000 ms) | fewer device writes, slower tracking |
| **Per-head write dead band** | suppresses mini-redistributions between heads (multi-head) | more precise | less chatter |

**Adaptive control** (the default) picks its pace automatically per tier. For the manual mode, two proven profiles: *Relaxed* (the defaults — calm, minimal device writes, ±20–30 W band) and *Precise* (gain 0.8–1.0 · dead band 0 · interval 1000 ms · write dead band 0 — ±10–20 W band, settling in 1–3 s). Over a day both end up with practically the same energy balance — the difference is chart cosmetics, not money.

## Sign conventions

* `GP` (grid power): `>0` = feed-in, `<0` = draw — **opposite to a Shelly meter** (`api.GP ≈ −shelly.gridPower`).
* `BP` (battery power): `>0` = charging, `<0` = discharging.
* `GS` (grid setpoint): `>0` = feed-in/discharge, `<0` = grid charging (±2400 W on the Pro, 1 W resolution).

## Object tree

Each head gets its own subtree under **`heads.<n>.*`** (`n` = 1…3), plus combined **`total.*`** aggregates and adapter-level `controller.*` / `info.*`. Within a head, states are grouped into thematic channels; the **leaf of each object id is the device's API field code** (the entity id from the official field reference), and the bilingual object name describes it — so the tree maps 1:1 to the device's documented fields.

| Channel | Contents |
|---|---|
| `heads.<n>.battery.*` | SoC (`SC`), battery power (`BP`), per-pack SoC (`SC0`–`SC5`), online packs (`ON`), SoC hysteresis (`SI1`/`SA1`) |
| `heads.<n>.grid.*` | grid power (`GP`), daily charge/feed-in energy (`GD1`/`GD2`) |
| `heads.<n>.load.*` | load power (`LP`), daily off-grid load energy (`LD`) |
| `heads.<n>.pv.*` | total PV (`PV`) and per-MPPT power/current/voltage (`mppt1`–`mppt4`) |
| `heads.<n>.system.*` | total input/output power (`IW`/`OP`) |
| `heads.<n>.device.*` | type/model/serial/status; `network.*` (IP, port, Wi-Fi); `firmware.*` (`ES`/`AS`/`DS` software, `EH`/`AH`/`DH` hardware, `BS0`–`BS5` BMS) |
| `heads.<n>.meter.*` | external meter status (`MS`) |
| `heads.<n>.ups.*` | UPS mode / grid-charge / bypass (`UO`/`UG`/`FP`) |
| `heads.<n>.fault.*` | fault bitmasks (`TF`/`EF`/`DF1`/`DF2`/`AF1`/`AF2`/`BF`) — only populated while a fault is active |
| `heads.<n>.control.*` | all **writable** fields (see below) |
| `heads.<n>.info.*` | per-head `online`, `lastError`, `rawResponse` (the full raw `/read`) |
| `total.*` | combined view: capacity-weighted `soc`, summed `batteryPower` / `gridPower` / `maxPower`, `onlineCount` |
| `controller.*` | self-consumption controller telemetry (`status`, grid-source age) |
| `info.*` | `connection` (any head reachable) and `lastUpdate` |

### Writable controls (`heads.<n>.control.*`)

By ioBroker convention all writable fields live under each head's `control.*`. Because that flattens their topic, this table shows what each one relates to:

| Object | Field | Relates to | Description |
|---|---|---|---|
| `control.GS` | GS | grid | Grid power setpoint (`>0` feed-in / `<0` grid charge) |
| `control.IS` | IS | grid | Max. grid feed-in / inverter output limit |
| `control.MG` | MG | grid | Max. grid-tied output power |
| `control.SI` | SI | battery | Min. discharge SoC (grid mode) |
| `control.SA` | SA | battery | Max. charge SoC (grid mode) |
| `control.SO` | SO | battery | Min. discharge SoC (off-grid mode) |
| `control.MM` | MM | mode | Local zero feed-in / self-consumption mode (coupled with `MD`) |
| `control.MD` | MD | meter | Meter connection JSON (coupled with `MM`) |
| `control.LM` | LM | mode | Local mode (⚠️ `1` blocks cloud/app control) |
| `control.LFB` | LFB | mode | Load priority switch |
| `control.LPS` | LPS | mode | Off-grid output switch |
| `control.PM` | PM | mode | Parallel mode |
| `control.TZ` | TZ | device | POSIX timezone |
| `control.RT` | RT | device | Restart device (button — a soft restart, **not** a full power-cycle) |

> Tip: in ioBroker admin you can also filter the object list by the *writable* flag to find all controls at once.

`device.PK` is derived from `DevType` on firmware that no longer reports `PK`. Reserved fields (`PT`, `SI1`, `SA1`) are exposed read-only. Fields the manufacturer dropped (`PD`, `UP`) or that are doc-only artefacts (`WT`, `BN`) are not exposed; anything unmapped is still available in `heads.<n>.info.rawResponse`.

## Manual meter / mode fields (MM / MD)

`MM`/`MD` are a head's own meter-based self-consumption. When you select a **Control mode**, the adapter manages them for you (Mode A sets `MM=1` + `MD` on the single head; Mode B forces `MM=0` on every head), and its guard re-asserts the mode-appropriate `MM` on the next poll — so any manual change in a control mode is temporary.

The raw fields stay writable for expert/manual use (e.g. in *Off* mode). They follow the official coupling: turning `MM` off also clears `MD`, and writing `MD` enables `MM` (non-empty) or disables it (empty). The `MD` JSON formats for the four supported meters are in the device's local API reference; in *Device self-regulation* mode the adapter builds them for you from the meter type and SN/IP.

## Limitations

* **Up to three heads per instance.** Single-head operation is validated on real hardware; the multi-head split is covered by unit tests but, at the time of writing, **untested on a real 2–3 head installation** — feedback from multi-head setups is very welcome. *Device self-regulation* is single-head only.
* **Heads must be on different phases** (operator's responsibility). The adapter regulates the **net summed** grid power, not per phase.
* Per-pack balancing is handled by each head's own BMS — the adapter steers the head's overall power only and reads `battery.SC` (total) for control; it does not manage individual packs.
* Daily energy counters (`GD1`/`GD2`/`LD`) are raw **Wh**, not kWh.
* `MD` and `TZ` take effect immediately but are not guaranteed to be echoed back verbatim by the device — confirm by effect, not by echo.
* **PV inputs are untested with hardware** (the reference installation runs without PV modules, so `PV1–4` are always 0). The integration and controller are PV-agnostic and complete, but PV firmware edge cases (e.g. battery full + PV surplus, UPS/bypass fields `FP`/`UG`) are unverified — feedback welcome.

## Troubleshooting

* **`info.connection` stays `false` / no data:** first make sure **local mode (`LM=1`)** is enabled on the device — without it the local API returns no values. Then verify that `http://<device-ip>/read` is reachable from the ioBroker host (test with a browser or `curl`). Per head, `heads.<n>.info.online` and `heads.<n>.info.lastError` show which one fails.
* **Nothing is being controlled:** check the **Control mode** — *Off* never writes. In *Adapter controller* set a valid **grid-power source state**; in *Device self-regulation* set a supported **meter type** and **SN/IP**.
* **Device ignores `GS` / battery does not react:** a head only executes a written `GS` when `MM=0`. In *Adapter controller* mode the adapter enforces this; if you write `GS` manually, make sure no meter is bound (`MM=0`). With a meter bound (`MM=1`) the device self-regulates and ignores `GS`.
* **The controller is too slow / never reaches exactly 0:** see *Control behaviour, accuracy and limits* — the measurement chain adds ~1–3 s of latency and the meter itself has finite accuracy, so a band of ±10–20 W around the target is the physical optimum. For the fastest response use the *Precise* profile (gain 0.8–1.0, dead band 0, min. write interval 1000 ms); to never feed in, set the **target grid power** to a small positive draw.
* **State timestamps look old / quality flag 32:** the adapter only writes a state when its value changes (standard practice — it protects the states DB from millions of identical writes). A state's timestamp therefore shows the last value *change*, not the last poll. Check data freshness via `info.lastUpdate` (updated on every successful poll) and `heads.<n>.info.online`. Quality 32 ("substitute initial value") only remains on states the device never delivers (e.g. the SoC of expansion packs that are not installed); after every adapter start all delivered values are written once, so their timestamps are at least as fresh as the start.
* **Two controllers fight over the battery:** run only one. The adapter enforces `MM` for the selected mode — disable any external `GS` script (or a device's own `MM` with a different meter) before using a control mode.
* **Some states stay empty (`0` / `""`):** a device only returns the fields its firmware/topology actually provides (e.g. extra packs `SC2`–`SC5`, or fault bitmasks only during a fault). The complete raw response is always available in `heads.<n>.info.rawResponse`.
* **After updating from a single-head version the tree looks wrong:** the object tree was restructured to `heads.<n>.*` in 0.2.0. The adapter removes obsolete objects automatically on start; if anything lingers, delete the old objects (or re-add the instance).

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 0.2.7 (2026-07-05)
* (Creekhail) New **adaptive control** (enabled by default): the controller regulates in three manufacturer-proven tiers — small deviations gently (every 7 s, 20 W steps), medium ones every 2.5 s (120 W), large load steps immediately (450 W), with a fixed 5 W dead band. Disable the new checkbox to keep tuning gain, dead band, write interval and step limit manually. **Existing installations are switched to adaptive by this update** (uncheck to return to your manual tuning).
* (Creekhail) Admin: help texts for gain, dead band and min. write interval; requires admin >= 7.8.23; CHANGELOG_OLD.md added and the Dependabot auto-merge workflow aligned with the canonical template (iobroker-bot).

### 0.2.6 (2026-07-04)
* (Creekhail) Controller: new **target grid power** (deliberate small draw or feed-in — e.g. +10 W to never feed in; the manufacturer's HA blueprint offers the same option) and a **maximum adjustment per correction** step (default 500 W) that allows a high gain without overshoot on meter spikes.
* (Creekhail) Documentation: corrected the setpoint-granularity statement — the device accepts `GS` with 1 W resolution (previously documented as 10 W steps); the practical accuracy limits are measurement-chain latency and meter noise.

### 0.2.5 (2026-07-02)
* (Creekhail) Review follow-up: added the manufacturer/product link to the README, and the controller now only accepts acknowledged grid-power values (`ack=true`) from the configured meter state (a manually written test value can no longer drive the battery).

### 0.2.4 (2026-07-02)
* (Creekhail) State names are now provided in all ioBroker languages: English and German stay hand-written, the other languages are machine-translated (generated file, merged at object creation; existing installations are updated in place).

### 0.2.3 (2026-07-02)
* (Creekhail) Object-tree compliance for the repository review:
  * The `heads` container is now a **folder** so the hierarchy follows the required device→channel→state order.
  * The switch states `control.MM` / `LM` / `LFB` / `LPS` / `PM` are now real **booleans** (previously 0/1 numbers) — adjust scripts that read or write them; the device still receives 0/1.
  * Corrected roles: `GS`/`IS`/`MG` use `level`, `ups.UO` uses `value`.
  * Object definitions are merged onto existing objects on start, so role/type/name updates reach existing installations (user settings like history configs are preserved).

### 0.2.2 (2026-07-02)
* (Creekhail) Repository-checker compliance: complete admin translations in all languages (including the validator messages), release notes translated into all languages, removed an unknown jsonConfig property from the test button and use the adapter-managed timer during unload.

### 0.2.1 (2026-07-01)
* (Creekhail) Controller robustness and hardening:
  * Config values of 0 are respected (gain / dead bands) instead of silently becoming defaults.
  * A failing GS write on one head no longer aborts the setpoints of the other heads.
  * Anti-windup: when a device visibly limits internally (SoC/temperature), the controller adopts the reported grid power as its feed-forward base.
  * GS is neutralized to 0 on all reachable heads when the controller stops (adapter stop/restart or leaving controller mode), so no head keeps executing a stale setpoint unwatched.
  * Heads are polled in parallel (one unreachable head no longer stretches the poll cycle); fewer state-DB reads per poll.
  * The startup object cleanup only touches adapter-managed subtrees; user-created states in the namespace survive.
  * Missing MG falls back to the model's power limit (500 → 800 W) instead of assuming a PRO; device responses are size-capped.
  * Manual GS writes are rejected (with a warning) while the controller is active; failsafe no longer retries offline heads every tick.
  * New unit tests for the controller (regulation, dead bands, throttling, failsafe, anti-windup).

### 0.2.0 (2026-06-30)
* (Creekhail) Multi-head support: manage up to three SunEnergyXT heads in one instance. The adapter controller now computes one grid setpoint and splits it across all online heads (equal split, gated by each head's SoC headroom, with per-head power caps and overflow redistribution). New per-head object tree `heads.<n>.*` and combined `total.*` aggregates; a "Test all heads" connectivity button; device self-regulation is restricted to a single head. **The object tree was restructured — existing single-head instances should be re-created (delete the old objects / re-add the instance).**

### 0.1.1 (2026-06-29)
* (Creekhail) Released via npm trusted publishing (provenance) and a package metadata fix.

### 0.1.0 (2026-06-28)
* (Creekhail) Initial release: local-API polling to states; writable control fields; two switchable control modes — an adapter-side self-consumption controller (any ioBroker meter state, feed-forward + P, with watchdog/failsafe) and device self-regulation (binds a supported meter: EcoTracker / Shelly 3EM / Shelly Pro 3EM / Tasmota); plus a monitoring-only mode, with an MM-mode guard.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2026 Marcus Bortel (Creekhail)

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
