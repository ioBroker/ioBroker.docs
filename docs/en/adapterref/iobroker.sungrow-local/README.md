---
chapters: {"pages":{"en/adapterref/iobroker.sungrow-local/README.md":{"title":{"en":"ioBroker.sungrow-local"},"content":"en/adapterref/iobroker.sungrow-local/README.md"},"en/adapterref/iobroker.sungrow-local/README_de.md":{"title":{"en":"ioBroker.sungrow-local – Kurzbeschreibung auf Deutsch"},"content":"en/adapterref/iobroker.sungrow-local/README_de.md"},"en/adapterref/iobroker.sungrow-local/vis-templates/README.md":{"title":{"en":"vis templates for ioBroker.sungrow-local"},"content":"en/adapterref/iobroker.sungrow-local/vis-templates/README.md"}}}
---
![Logo](admin/sungrow-local.png)

# ioBroker.sungrow-local

[![NPM version](https://img.shields.io/npm/v/iobroker.sungrow-local.svg)](https://www.npmjs.com/package/iobroker.sungrow-local)
[![Test and Release](https://github.com/SmarthomeElektroniker/ioBroker.sungrow-local/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/SmarthomeElektroniker/ioBroker.sungrow-local/actions/workflows/test-and-release.yml)

*Read this in another language: [Deutsche Kurzbeschreibung](/#/docs/adapterref/iobroker.sungrow-local/README_de.md).*

Connects a **Sungrow hybrid inverter** (developed with an SH20T) and its **battery** (SBH series, e.g. SBH400)
to ioBroker through the **WiNet-S2** communication module via **Modbus TCP** – locally, without iSolarCloud.

Manufacturer: [Sungrow Power Supply Co., Ltd.](https://www.sungrowpower.com/en) – hybrid inverters of the SH
series (e.g. SH-RT), batteries and the WiNet-S2 communication module: [product overview](https://en.sungrowpower.com/products).
This adapter is an independent project (see [Trademark](#trademark)).

The adapter was written as a replacement for a generic `ioBroker.modbus` instance that read the same registers.
It keeps the state IDs of such an instance, so existing scripts, visualisations and history settings can be
moved over by a simple text replacement (see [Migration](#migration-from-iobrokermodbus)).

## Why another Modbus adapter?

The WiNet-S2 is a Modbus TCP ↔ RTU gateway: every request ends up on one RS485 bus shared by the inverter
(unit 1) and the battery (unit 2). The battery is slow – the WiNet gives it an *instruction interval* of 5000 ms,
during which the bus is blocked. With a generic Modbus instance this leads to:

- one poll interval for everything – either the power values are slow or the battery requests time out,
- every timeout drops the whole TCP connection; after the reconnect all PV values are missing for about a minute,
- writes that run into the blocked bus are discarded and look as if the inverter ignored them.

## Features

- **Exactly one TCP connection** to the WiNet-S2. All requests are queued and sent strictly one after another,
  with a configurable minimum pause between them.
- **Poll groups** with their own interval, request timeout and optional pause after each request. Defaults
  (measured on a reference installation): `live` 5 s, `energy` 60 s, `control` 60 s, `battery` 120 s with
  timeout 15000 ms and a pause of 5000 ms. Shorter values are marked red in the admin UI (warning only).
  Blocks are built like in ioBroker.modbus (max. block size / max. gap), but per group.
- **A timeout only fails its own block.** The connection is re-established only after N failures in a row
  (default 3) or when the gateway closes the socket; only then `info.connection` becomes `false`. Modbus
  exceptions count as an answer.
- **Prioritised writes:** holding registers are written before the next read request (FC6; with
  *do not use write multiple registers* also for 32-bit values) and read back immediately. `ack=true` is set
  only with the confirmed value – also when the same value was written again.
- **Read-only mode** (reject writes and reset the state), e.g. for the first days after a migration.
- **Skip unchanged writes** (default on, 0.6.0): a command whose value the device reports already (same raw
  value after factor/offset, polled register, value not older than two poll intervals + 10 s) is not sent over the
  WiNet; the state is confirmed with `ack=true` all the same. Sungrow advises against frequent writes to RW
  registers through the WiNet.
- **Write counters per register** (0.6.0) under `info.write.registers.<register>.*` (commands and confirmed
  writes, today and in total) and one warning per register and day above N commands (default 50) – scripts that
  write all the time become visible.
- **Battery control and wallbox registers** (0.6.0, experimental, **off by default**) – see
  [Battery control](#battery-control-experimental) and [Wallbox](#wallbox-experimental).
- **Plain text and limits** per register (`states` as `value:text;value:text`, `min`, `max`). A write outside
  these limits is logged as a warning and still sent.
- **Diagnostics per group** under `info.groups.<group>.*`: response time, last success, last error,
  requests/timeouts/errors/skipped rounds today and timeouts/errors in total; writes under `info.write.*`.
- **Heartbeat** per group: `lastRound` (timestamp of every complete round, also without value changes),
  `roundDuration` and `lastRoundText`, plus `info.lastValueUpdate`. Register values are only written on change,
  so an old timestamp at a register is no fault – a stuck bus shows in `lastRound`.
- **Status tab** in the instance settings with connection state, heartbeat, response time and counters per group.
- **Register template:** besides the registers read by default, the tables contain 100 further known Sungrow
  registers (unticked). Tick a row to read it – it joins the request blocks of its group, no extra connection.
  Own registers can still be added.
- **Conversion helper** tab: addresses in all notations, data type, sign, word order and factor explained, raw
  values decoded in every common way, plausibility warnings and an optional single test read of the register.
- **Device manager cards** (admin → *Devices*): inverter, battery and grid meter with the main values, live
  direction (charging/discharging, import/feed-in) and fault indicator – read only, the cards never write.

## Requirements

- Sungrow hybrid inverter with a **WiNet-S2** module and Modbus TCP enabled (port 502).
- The WiNet-S2 has an **IP allow list for Modbus TCP**. A client that is not on that list gets its connection
  accepted and then reset at the first request (`ECONNRESET`) – it looks like a network problem. Add the IP
  address of the ioBroker host (as seen by the WiNet, i.e. after NAT) in the WiNet web interface.
- Only one Modbus client at a time should talk to the WiNet. Disable other Modbus instances that poll the same
  gateway before enabling this adapter.
- js-controller >= 6.0.11, **admin >= 8.2.0** (the configuration page uses React components of the admin), Node.js >= 22.

## Configuration

The configuration page has six tabs. Everything works with mouse, keyboard and touch; drag & drop is always
optional (there is a button for every action).

1. **Overview** – traffic lights for instance, connection, last values and every poll group (last round, round
   duration, timeouts/errors/skipped rounds today) and live tiles: PV power, battery power with direction
   (sign of the battery current `43021`), battery level, grid (`35601`, + import / − feed-in), house consumption
   (calculated: AC output `43034` + grid; not clamped – an unmeasured generator in the house grid shows as
   "not balanceable") and any other register. Tiles can be added, removed and ordered.
   On a new instance (no address yet) the **setup wizard** opens here: gateway address, connection test (device
   type code → model, serial number, battery at the inverter, SBH battery at unit 2) and a profile
   *Basic / Battery / Extended* with a preview of the bus load.
2. **Registers** – the register catalog by topic (PV, battery, grid, inverter, control, info, own) with search.
   Activate a register with a click (into its default group, arrow = other group) or drag it into a poll group.
   Every group is a column with its interval and the requests it sends; the **bus load bar** (per group and in
   total) is calculated from the real block building of the adapter and shows *why* a register costs another
   request ("+1 request because 13050 is not next to the others"). **Own registers**: address in any notation
   (Sungrow document from 1, protocol from 0, column 30001/40001, Modicon) with off-by-one warning and a test
   read before saving.
3. **Control** – the writable holding registers. Writing is **released per register** (new in 0.4.0; existing
   installations keep their ticked registers writable), value range (min/max or value table), behaviour outside
   the range (warn or reject), the read-only master switch and the log of the last write commands
   (`info.write.log`).
4. **Connection** – address and port of the WiNet-S2; *Advanced* (folded): pauses, reconnect behaviour, write
   timeout/retries, block building, decimals and the bus capacity used for the load bars.
5. **Tools** – conversion helper (see below) and diagnostics of all groups in one table.
6. **Expert** – the plain tables (groups, input and holding registers) for bulk changes.

### Bus load model

The gateway handles about **1.25 requests per second** over a longer time (measured on the reference installation
SH20T + SBH400 behind a WiNet-S2): `live` 5 s + `energy` 60 s + `control` 60 s + `battery` 120 s (1.14 requests/s)
ran stable, `live` 3 s (1.81/s) skipped rounds and `battery` 60 s produced timeouts. A request to a slow bus device
blocks the bus for its pause on top (SBH battery: 5 s). Load = requests per second / capacity + pause share; green
below 80 %, yellow up to 100 % (fully used), red above. A group whose interval is shorter than the pause of another
group will skip rounds. The capacity can be changed under *Connection → Advanced*.

## Register template

The register tables contain every register this adapter knows, **ticked** ones are read:

- **Ticked by default** are exactly the registers of the earlier versions – an update changes nothing that is
  read and no state ID.
- **Unticked** are the further known registers (since 0.6.0: 120 input and 86 holding, including the wallbox rows): device type (with model names), serial number and firmware
  versions, MPPT 4, signed battery power and current (newer firmware), precise grid frequency, energy meter
  voltages/currents/totals, monthly PV yields, alarm and fault codes, battery current and temperature of the
  SBH (unit 2), system clock, export limitation, load adjustment, battery charge/discharge power limits, forced
  charging and more. Writable rows come with plain text (`states`) or limits.
- Tick a row and save: the register is added to the request blocks of its group (e.g. battery current and
  temperature of unit 2 lie inside the existing battery request – no additional request). Rarely changing values
  are in the group `info` (once per hour).
- **Unticking** a register that was read before removes its data point – **unless it has custom settings**
  (history, InfluxDB, SQL …, since 0.6.0): then the object stays with `native.orphaned = true`, receives no more
  values and a warning on every start names it. Remove the settings (or the object) by hand when the recorded
  data is no longer needed. Ticking the register again removes the mark.
- Existing installations get the template once on the first start of 0.3.0 (the instance restarts once); rows
  you configured yourself always win – a template row that overlaps one of your registers is not added.
- Column *source / note* tells where a row comes from:
  - **HA mkaiser (MIT)** – [Sungrow-SHx-Inverter-Modbus-Home-Assistant](https://github.com/mkaiser/Sungrow-SHx-Inverter-Modbus-Home-Assistant)
    by Martin Kaiser, MIT License, © 2025 Martin Kaiser. Register addresses, data types, scaling and
    the value tables (device type codes, on/off codes, EMS and load adjustment modes) were taken from
    `modbus_sungrow.yaml`.
  - **reference list** – register list of the reference installation (SH20T + SBH400 via WiNet-S2), checked on
    the device; partly with notes (e.g. monthly yields: factor 0.1 measured, the document says 1).
- Grid code parameters (LVRT/HVRT, frequency/voltage protection, reactive power curves) are deliberately not
  part of the template – they are installer settings without documented scaling.

## Conversion helper

Sungrow documents, Home Assistant configurations and Modbus tools count addresses differently and describe
data types in different ways. The tab **Conversion helper** puts one register into all notations:

| Notation | Battery level | Max SoC | Rule | Used by |
|---|---|---|---|---|
| Sungrow document, column *Register* (counts from 1) | input 13023 | holding 13058 | – | Sungrow PDF, SunGather, openHAB binding (both subtract 1 before sending) |
| Protocol address (counts from 0, sent on the bus) | 13022 | 13057 | document − 1 | register lists "address incl. offset", Home Assistant / mkaiser `address: 13022  # reg 13023`, evcc, Loxone, ioBroker.modbus **without** aliases (the usual forum guide, IDs like `13022_Battery_level`) |
| Column *Address* of this adapter = ioBroker.modbus **with** aliases | 43023 | 53058 | protocol + 30001 / + 40001 | this adapter |
| Modicon, 6 digits | 313023 | 413058 | protocol + 300001 / + 400001 | Modbus tools |

- **The number is …:** choose the source of your number, or *detect automatically*: column (input ≥ 30001,
  holding ≥ 40001) and 6-digit Modicon numbers are unambiguous; a smaller number may count from 0 or from 1 –
  the helper then shows both readings with the register this adapter knows there and reads nothing.
- **Known register and off-by-one:** the helper names the register of your tables at the address and the
  neighbours you get when you count from 0 instead of 1 (column 43022 is *battery power*, 43023 *battery level*).
- **Data types:** 16 bit `U16` (never negative) or `S16` (power, current, temperature – raw values above
  32767 are negative). 32-bit values use two registers and Sungrow sends the **low word first**: `uint32sw` /
  `int32sw`. The type list in the tables shows these explanations.
- **Factor:** Sungrow gives the resolution, e.g. "0.1 kWh" = factor 0.1. Value = raw value × factor + offset.
- **Raw values:** type them in (`950`, `0x03B6`, `4464 1` for 32 bit) or tick *Read from the device*: the
  adapter reads the register once over its connection (queued like every other request, at most every 5 s,
  FC4/FC3 only – never a write).
- **Output:** all addresses and the resulting state ID, the value of the selected type, the same raw words as
  U16/S16/U32/S32 in both word orders, warnings (`0xFFFF` = no value, sign, word order, implausible value with a
  better factor) and the line to enter in the register table.
- When a register is read for the first time after a start, its value is checked against a plausible range per
  unit (V, A, W, kWh, %, °C, Hz); an implausible first value is logged as a hint (info).

## Objects

| ID | Content |
|---|---|
| `inputRegisters.<unit>.<address>_<name>` | input registers (read-only) |
| `holdingRegisters.<unit>.<address>_<name>` | holding registers (writable unless read-only mode is on) |
| `info.connection`, `info.reconnects`, `info.lastReconnect`, `info.queueLength`, `info.lastValueUpdate` | connection |
| `info.groups.<group>.*` | diagnostics and heartbeat per poll group (defaults: `live`, `energy`, `control`, `battery`, `info`) |
| `info.write.*` | diagnostics of writes |
| `info.write.registers.<register>.*` | write commands and confirmed writes per released register (today/total) |
| `control.battery.*` | battery control (only when switched on): `mode`, `minutes`, `targetSoc`, `active`, `until`, `lastResult` |

`<address>` is the *Address* column in the ioBroker.modbus alias notation: input register = 30001 + protocol
address, holding register = 40001 + protocol address – i.e. Sungrow document number + 30000 / + 40000 (battery level:
document 13023, protocol 13022, ID `43023_…`). `<name>` is the *name* column with spaces and dots replaced by `_`. The *description* column becomes the object name.

## Battery control (experimental)

**Off by default.** Switch it on in the tab *Control*. Then `control.battery.mode` accepts three modes; the
adapter writes the needed registers itself (they do not have to be ticked) with the normal write path
(write before the next read, confirmation read):

| Mode | Registers written (Sungrow document numbers) | Effect |
|---|---|---|
| `normal` | forced-charging window off (33208 = 0x55), command stop (13051 = 0xCC), EMS mode self-consumption (13050 = 0) | normal operation |
| `hold` | window off, command stop, EMS forced mode (13050 = 2) | the battery neither charges nor discharges |
| `charge` | command stop, self-consumption, forced-charging window 1 from now for `minutes` up to `targetSoc` (33209–33214), window on (33208 = 0xAA) last | the inverter charges in its own time window |

Safety:

- `hold` and `charge` end after `minutes` (1 … *maximum duration*, default 240 min); the adapter then returns to
  `normal`. The end is stored in `control.battery.until`: after an adapter restart an expired mode returns to
  `normal` right after the connect. The charge window ends at 23:59 at the latest and is ended by the inverter
  itself – no repeated commands.
- Minimum pause between two changes (default 60 s) and a maximum of hold/charge commands per day (default 12);
  `normal` is always allowed. Nothing is written while the instance is read-only.
- If a register of `hold`/`charge` cannot be written or confirmed, the adapter returns to `normal`.
- **While the adapter is stopped nothing returns to normal** – `hold` (forced mode) stays active in the inverter
  until the adapter runs again.
- The forced-charging window is a time of day of the **inverter clock** (check it: Sungrow document 5000 ff.).
  Some firmware versions ignore it, and a max. SoC (13058/33031) below the target level limits the charge.
  The registers come from the Sungrow protocol V1.1.11 and the reference list; **writing was only tested against a
  simulated WiNet**, not on a real inverter.

## Wallbox (experimental)

Template version 8 adds the Sungrow AC wallbox (AC007/AC011E/AC22E) – all rows **unticked**:

- **Readings** (input registers 21299–21316: total and session energy, voltage/current per phase, charging power,
  start mode, charging status) through the **forwarding of the WiNet-S2**: the unit is the *forwarding Modbus ID*
  of the wallbox in the WiNet device list (often 2 or 3; the template uses 3 – change the unit column if your list
  says otherwise; unit 2 is often the battery). Group `energy` (60 s).
- **EMS registers at the inverter** (holding, unit 1, Sungrow protocol addresses 33539–33549, IDs `73540_…` –
  `73550_…`): charging released (0x55/0xAA), charging mode (0xA0 fast, 0xA1 PV surplus, 0xA2 amount and deadline,
  0xA3 user-defined), amount (0.1 kWh), current (0.1 A), PV surplus with/without grid power, and three 32-bit
  times (deadline, start, end) as **raw values: their time format is not clarified** (one source says Unix time,
  another says not). Write the mode first, then the values that depend on it.
- Writing these EMS registers needs the switch **"Wallbox EMS registers"** (tab *Control*, off by default) **in
  addition** to the release per register.
- According to the [ha-modbus-manager documentation](https://github.com/TCzerny/ha-modbus-manager) the inverter
  mirrors only these EMS registers, and only when a wallbox is connected to its RS485; larger SH-T hybrids with an
  AC22E usually need the iHomeManager. Sources: TCzerny/ha-modbus-manager (MIT) and forum posts; **not tested on a
  real wallbox**.

## Migration from ioBroker.modbus

The IDs, names, units, factors, data types and roles are built exactly like in ioBroker.modbus (with
*multi device ID* enabled), so the register tables of an existing instance can be copied into this adapter and
all state IDs stay the same apart from the instance prefix (`modbus.N.` → `sungrow-local.0.`).
This holds for instances with *aliases* switched on. Most Sungrow guides for ioBroker.modbus switch aliases
**off** and enter protocol addresses (IDs like `13022_Battery_level`): add 30001 (input) / 40001 (holding) to
those addresses – the IDs then change (`13022_…` → `43023_…`), scripts and history must be adapted.

One exception since 0.4.3: characters outside `[A-Za-z0-9_-]` (since 0.5.0 also the comma) in the name column are replaced by `_` (umlauts
are transliterated), as ioBroker recommends for object IDs. ioBroker.modbus keeps e.g. the `/` of
`53051_Charge/discharge_command`; here the ID is `53051_Charge_discharge_command`. Replace these IDs as well.

Suggested order: back up; switch scripts/watchdogs to the new instance; disable the old Modbus instance (the
WiNet should only see one client); enter the host and enable this adapter (read-only first); compare the values;
then allow writes. History data of the old states can be continued with the `aliasId` setting of the history
adapter.

## Difference to other adapters

- **ioBroker.modbus** is the generic Modbus adapter and the base this adapter is compatible with. It is the
  right choice for any other Modbus device. `sungrow-local` only adds what the WiNet-S2 needs: per-group
  intervals, timeouts that do not drop the connection, prioritised and confirmed writes, and diagnostics.
- At the time of writing there is **no dedicated Sungrow adapter** in the ioBroker repository; other solutions
  use the iSolarCloud (internet) or the WiNet web socket API. This adapter uses only the documented local
  Modbus TCP interface.

## Using the values in evcc (or other software)

evcc has its own Sungrow template, but it opens a **second Modbus client** at the WiNet-S2. The WiNet handles
only one client reliably (one shared RS485 bus, slow battery unit) – two clients collide and cause timeouts in
both. Let evcc read the values this adapter has already read instead, through ioBroker:

- **simple-api adapter** (HTTP, default port 8087): `http://<iobroker>:8087/getPlainValue/<state ID>` returns
  the plain value.
- **MQTT adapter**: publishes the states as topics (e.g. `sungrow-local/0/inputRegisters/1/35601_power_total-EnergyMeter`);
  evcc reads them with `source: mqtt`.

Example with simple-api (evcc custom meters; check the evcc documentation of your version for the exact syntax):

```yaml
meters:
  - name: grid
    type: custom
    power: # + = import, - = feed-in
      source: http
      uri: http://192.168.1.10:8087/getPlainValue/sungrow-local.0.inputRegisters.1.35601_power_total-EnergyMeter
  - name: pv
    type: custom
    power:
      source: http
      uri: http://192.168.1.10:8087/getPlainValue/sungrow-local.0.inputRegisters.1.35017_Total_DC_Power
  - name: battery
    type: custom
    power: # + = discharging, - = charging (tick the template row 35214 "Battery power signed")
      source: http
      uri: http://192.168.1.10:8087/getPlainValue/sungrow-local.0.inputRegisters.1.35214_Battery_power_signed
    soc:
      source: http
      uri: http://192.168.1.10:8087/getPlainValue/sungrow-local.0.inputRegisters.1.43023_Battery_level
```

Electricity prices are not part of this adapter: evcc, tibberlink, a spot price adapter or a script provide them.

## Visualisation (vis templates)

The folder [`vis-templates/`](https://github.com/SmarthomeElektroniker/ioBroker.sungrow-local/blob/main/vis-templates/) contains ready-made **vis 1** views (animated energy flow,
battery, inverter & grid, adapter diagnostics) and a battery symbol widget in two colours. They use only
data points of `sungrow-local.0` – no scripts, no other adapters. Import instructions:
[vis-templates/README.md](/#/docs/adapterref/iobroker.sungrow-local/vis-templates/README.md).

## Notes

- `35016` is the current of MPPT 3. Up to 0.3.0 the default row was named "MPPT 2 Current" (inherited from an old
  modbus configuration). New installations use `35016_MPPT_3_Current`; existing installations keep
  `35016_MPPT_2_Current` until the row is renamed in the register table (the old object can then be deleted).
- `43001` (running state) is a bit field and `43030` (grid state) is not clearly documented – both are shown as
  numbers without plain text (`43030` unscaled, factor 1).
- The upper limit 20000 W of `53052` (charge/discharge power) is an assumption for an SH20T; adjust it for other
  models.
- `43008` (load power) is read as `int32sw` and the phase currents `43031`–`43033` as `int16be` (signed, as in
  the Sungrow protocol); up to 0.3.0 they were unsigned, and `43030` had factor 0.1. Existing instances are
  corrected once on the first start, unless the row was changed by hand. The IDs stay the same.
- `43022` (battery power) is an amount without sign – the sign of `43021` (battery current) or the template row
  `35214` *Battery power signed* (register 5214, newer firmware) carries the direction.
- `43023` (battery level) is the usable level between min. and max. SoC; the battery's own level is `40744`
  (unit 2). Both agree as `40744 ≈ min SoC + 43023 × (max SoC − min SoC) / 100` as long as the level is inside the
  window.

## Tests

```
npm test                                         # package check + unit tests (incl. simulated WiNet-S2)
IOB_CONTROLLER=latest npm run test:integration
npm run lint
```

`test/fakeWinet.js` simulates the WiNet-S2: one shared bus, latency and instruction interval per unit, swallowed
requests, late answers, total failure and connection loss.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.6.0 (2026-11-14)

- **Review fixes (Bluefox, forum thread 85824):** async work that is not awaited (setState from poller events,
  restoring rejected commands, reconnects) can no longer end in an unhandled promise rejection – js-controller
  restarted the instance on those, e.g. while the adapter stopped. Errors are logged on debug level while stopping,
  otherwise as error at most once per task and minute; a failing start is logged and restarts the instance.
  eslint `no-floating-promises` guards the adapter code.
- **Review fixes:** unticked registers, legacy IDs and diagnostics of inactive groups are no longer deleted when
  they have custom settings (history, InfluxDB, SQL): the object stays, marked `native.orphaned`, with a warning.
- **Skip unchanged writes** (default on) and **write counters per register** with a warning above N commands a day.
- Value tables of hex codes (0x55/0xAA/0xBB/0xCC/0xA0–0xA3) show the code.
- README: evcc reads the values through simple-api or MQTT instead of a second Modbus client.
- **Experimental, off by default:** battery control (`control.battery.*`: normal/hold/charge with time limit and
  return to normal) and the Sungrow wallbox (template v8: readings via the WiNet forwarding, EMS registers
  33539–33549 locked behind an own switch; time format of the 32-bit times not clarified).

### 0.5.1 (2026-11-12)

- **Value tables in all 11 languages:** the operating state (43000) and the output type (35002) of the template
  are translated like the control registers (type codes and model names stay as they are). `common.states` only
  takes plain texts, so the translation goes by the raw value: the objects carry the system language, the cards
  of the device manager and the overview tiles show the texts (e.g. EMS mode, operating state) in the language.
  Own texts in the `states` column are never replaced.
- Wording of some card texts (de: battery state of health, pl: feed-in to the grid, uk/ru: idle).

### 0.5.0 (2026-11-12)

- **English names of the default poll groups:** `akku` → `battery`, `energie` → `energy`, `steuerung` → `control`
  (`live` and `info` stay). The group name is part of the diagnostic IDs (`info.groups.<group>.*`). Existing
  instances are migrated once on the first start (template version 7): the groups and the register rows of these
  groups are renamed, the objects `info.groups.akku/energie/steuerung.*` move to the new names with their values
  (counters go on), custom settings (history/sql/influxdb with `aliasId` = old ID) and rooms/functions; the old
  objects are deleted. Groups you named yourself are not touched; if a group with the new name exists already, the
  old group keeps its name (warning in the log). **Switch scripts and visualisations that use
  `info.groups.akku`, `info.groups.energie` or `info.groups.steuerung`** (the log lists them). Register IDs do not
  change. The vis templates use the new IDs.
- English default descriptions of the poll groups (they are part of the channel names). Existing descriptions are
  only replaced while they are still the German default text of earlier versions.
- State IDs no longer contain commas (`,` is in the forbidden characters of the js-controller). No default or
  template register has a comma in its name; objects of an own register with a comma move to the new ID like in
  0.4.3.
- Device manager support (`@iobroker/dm-utils`): read-only cards for the running operation. Directly on the card:
  *Inverter* PV power, PV yield today and total, backup output power; *Battery* (if a battery register is
  configured) state of charge (card status), power and voltage, manufacturer and model from the BMS (software
  version 40721 of unit 2 + capacity 43039, e.g. Sungrow SBH400; nothing is guessed for other batteries);
  *Grid meter* (if 35601 is configured) grid power, import and feed-in today and total. Live direction indicators
  (battery: sign of 43021 / 35214, + discharging, − charging; grid: 35601, + import, − feed-in) and the fault
  indicator (43052) on the inverter with the tooltip "No fault" / "Fault: …". A value whose register is not ticked is left out. The control dialog of a
  card shows more (AC output, house consumption, temperatures, health, backup reserve, min./max. SoC, EMS mode if
  polled). No actions, no configuration and no writing from the cards.
- README: link to the manufacturer and its product overview.

### 0.4.3 (2026-10-25)

- State IDs only contain the characters recommended by ioBroker (`[A-Za-z0-9_,-]`): other characters of the
  name column (e.g. `/`) become `_`, umlauts are transliterated. Affected defaults:
  `holdingRegisters.1.53051_Charge_discharge_command`, `53052_Charge_discharge_power`,
  `70230_Manual_Scanning_-_ON_OFF`, `72535_Zustand_Netzanschluss_-_ON_OFF`. Existing objects are migrated on the
  first start: custom settings (history/sql/influxdb with `aliasId` = old ID, so the recorded data goes on), the
  last value and the rooms/functions move to the new ID, the old object is deleted. **Switch scripts and
  visualisations to the new IDs** (the log lists them).
- The role `level.mode` of older configurations (not in the ioBroker role list) becomes `level` (template v6).
- vis template *Akku*: register 53051 is labelled "Zwangsbefehl (nur im Zwangsmodus)" - it only acts in the EMS
  forced mode.
- Poller: no variable named `wait` (repository checker W5051); the pause between requests stays on the adapter
  timers, because stopping must end it immediately.

### 0.4.2 (2026-10-25)

- When stopping, the connection is closed without waiting (no plain timer during shutdown).
- Admin: sizes for large screens in the tab *Tools*; Dutch text completed.
- README: formula of the house consumption tile (AC output 43034 + grid).

### 0.4.1 (2026-10-25)

- Register objects are created without a default value: before the first read there is no state
  (previously 0 with ack=true, so scripts could react on e.g. SoC 0 % at adapter start). The default value
  is removed from existing objects; IDs, custom settings and values stay.
- Debug log line for every incoming command.
- Tests: the EMS command test waits until the adapter is ready (was flaky on slow Windows CI runners).

### 0.4.0 (2026-10-25)

- New configuration page with React components (admin >= 8.2): overview with traffic lights and live tiles,
  register catalog by topic with search, drag & drop into poll groups and a live bus load per group and in
  total (from the real block building, with the reason for every extra request), own registers in any address
  notation with test read, setup wizard (connection test, model detection, profile), tab *Control*, tab
  *Tools* with conversion helper and diagnostics, tab *Expert* with the plain tables.
- Register catalog: 187 further known registers (109 input, 78 holding: Sungrow protocol V1.1.11, register list
  of the reference installation, Home Assistant integration by mkaiser), every register with a name and a
  description in 11 languages; object names are translated as long as the description column is unchanged.
- Writing is released per holding register (`allowWrite`); a write to a register that is not released is
  rejected and the device value restored. Existing installations keep their ticked registers writable
  (template version 3). New option: reject values outside the range instead of only warning.
- Write log `info.write.log` (last 25 write commands with result).
- A too short answer (fewer registers than requested) discards the whole block and counts as an answer, not as a
  connection error.
- Messages for the admin: `probe` (test read, FC3/FC4 only), `wizardTest`, `analyse`.
- Value tables of writable registers (EMS mode, charge/discharge command, backup, load control, forced charging,
  on/off switches – 24 registers) in 11 languages: the states appear as a selection in admin/vis/apps, the tab
  *Control* offers them as a menu with a short explanation per mode and writes only after a confirmation. With
  "reject" a value outside the table is not written (template version 4 adds missing tables; own texts stay).
- Uniform register names (one term per quantity; "(from inverter)" / "(from BMS)" / "(from meter)" where the same
  quantity comes from two sources; pairs are shown next to each other). IDs do not change; object names follow the
  catalog as long as the description column still holds a former default text.
- Nearly constant values (nominal power, battery health, battery capacity, installed PV power, battery net capacity,
  rated load power) are read in the group `info` (hourly); existing instances move them once if the row still has the
  default group (template version 5).
- Read test of every template register on an SH20T behind a WiNet-S2: 67 addresses are rejected there ("illegal data
  address") and are marked in the catalog; the log explains a request that fails for this reason.
- Fix: battery direction. A positive battery current (43021) means **discharging** (verified with 4 days of history
  and raw reads); the overview and the vis templates showed it inverted. House consumption = AC output (43034) +
  meter (35601); a result clearly below zero (a generator the inverter does not measure) is shown as
  "not balanceable" instead of 0 W.

### 0.3.0 (2026-10-24)

- Register template: 100 further known registers (74 input, 26 holding) from the Home Assistant integration by
  mkaiser (MIT) and the register list of the reference installation, unticked in the register tables; existing
  installations get them once on the first start (one restart). Nothing that was read before changes.
- New column *Read* (tick) and *Source / note*; readable data type names, factor choice with examples.
- New tab *Conversion helper*: addresses in all notations (Sungrow document from 1, protocol address from 0 as in
  register lists / Home Assistant / evcc / ioBroker.modbus without aliases, column of this adapter, 6-digit
  Modicon) with automatic detection where unambiguous, the known register at the address and its off-by-one
  neighbours, interpretations of raw words, warnings, single test read (read only).
- New poll group `info` (3600 s) for device information; diagnostics only for groups that read registers.
- Hint in the log when the first value of a register is implausible for its unit.
- Fix: the round duration after a reconnect no longer contains the time without connection (was 26 640 904 ms
  after a night without gateway).
- Fix: no more warning "setTimeout called, but adapter is shutting down" when the instance stops.
- Fix: `43008` load power is signed (`int32sw`), phase currents `43031`–`43033` are signed (`int16be`), `43030`
  grid state is unscaled (factor 1). Existing instances get the correction once (template version 2) unless
  the row was edited.

### 0.2.1 (2026-10-23)

- First public release (functionally the same as 0.2.0): published on GitHub and npm.
- Default register tables in English (object names and plain texts), no default room.
- Control registers with plain text use the role `level` (`level.mode` is not a valid role).
- Admin UI translated into all languages.
- Every level of the state IDs exists as an object: a folder per register type and a device per Modbus unit
  (`inputRegisters.1`, `inputRegisters.2`, …); the state IDs are unchanged.

Older entries (versions before the first public release) are in CHANGELOG_OLD.md.

## Trademark

Sungrow, WiNet and iSolarCloud are trademarks of Sungrow Power Supply Co., Ltd. This adapter is an independent
project and is neither affiliated with nor endorsed by Sungrow.

## License

MIT License

Copyright (c) 2026 Immanuel <github@freitag.online>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of
the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.