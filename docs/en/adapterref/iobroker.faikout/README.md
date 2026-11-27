---
chapters: {"pages":{"en/adapterref/iobroker.faikout/README.md":{"title":{"en":"ioBroker.faikout"},"content":"en/adapterref/iobroker.faikout/README.md"},"en/adapterref/iobroker.faikout/docs/en/README.md":{"title":{"en":"Faikout – climate control"},"content":"en/adapterref/iobroker.faikout/docs/en/README.md"},"en/adapterref/iobroker.faikout/vis-templates/README.md":{"title":{"en":"vis templates for ioBroker.faikout"},"content":"en/adapterref/iobroker.faikout/vis-templates/README.md"}}}
---
![Logo](admin/faikout.png)

# ioBroker.faikout

Connect Daikin air conditioners equipped with a [faikout](https://codeberg.org/RevK/ESP32-Faikout)
module to ioBroker — purely over MQTT, entirely local, no cloud and no vendor API.

The adapter brings **its own MQTT broker**. You point the faikout modules at it and that is all;
no separate broker, no `mqtt` adapter instance, and no interference with any MQTT setup you
already run.

## Why a dedicated adapter

A faikout module also emulates the old local Daikin HTTP API, so it can be used with the
`daikin` adapter. Over MQTT, however, it exposes considerably more — in particular values the
HTTP API does not provide at all:

| Value | HTTP (`daikin` adapter) | MQTT (this adapter) |
|---|---|---|
| Indoor humidity | not reported | yes |
| Energy counters (total / heating / cooling) | not reported | yes |
| Current power draw | not reported | yes |
| Compressor speed | reported as 0 | yes |
| Fan speed | not reported | yes |
| Refrigerant temperature | not reported | yes |
| Demand limit, louvre angle, presets | not reported | yes |
| WiFi and device diagnostics | version only | yes |

## Data points are created dynamically

A faikout module only publishes a field when the attached air conditioner actually supports it,
and its own settings can hide further ones. There is therefore **no fixed list of fields**: the
adapter creates exactly the data points it receives and silently omits the rest. Two units of
different models will legitimately end up with different object trees.

Fields the adapter does not know yet are still created, with a type derived from the value, and
noted in the log.

Objects are grouped per device:

- `<device>.control.*` — writable: power, mode, target temperature, fan, swing, preset, demand,
  econo, powerful, comfort, streamer, sensor, LED, quiet, humidify. `selectedMode` is the operating mode
  without "off": while the unit runs it equals `mode`, while it is off it keeps the mode set last (taken
  from the module's native status). Writing it sends the mode and switches the unit on.
- `mode`, `fan`, `swing` and `preset` are text, as the module speaks them. Each has a numeric twin
  (`modeNum`, `fanNum`, `swingNum`, `presetNum`) with `common.states` such as
  `{0: "off", 1: "heat_cool", 2: "cool", 3: "heat", 4: "dry", 5: "fan_only"}` for Lovelace and other
  tools that expect numbers. Both are writable and mean the same: a command on either sends exactly one
  command to the module (as text); both are set with `ack=true` when the module confirms. The numbers
  are fixed; new values of a future firmware are appended.
- `<device>.status.*` — readings: temperatures, humidity, energy, power, compressor and fan speed
- `<device>.info.*` — device diagnostics: IP, WiFi signal, uptime, firmware

## Setup

1. Install the adapter and open the instance configuration.
2. Choose the broker port (default `1888`). It must not collide with another MQTT broker.
   Optionally set a user name and password; leaving the user name empty accepts unauthenticated
   connections, which is the usual case inside a home network.
3. Open the web interface of each faikout module, go to **Settings → Basic** and set
   **MQTT host** to `<ioBroker IP>:<port>`. The module reconnects on its own.
   The tab **Find modules** shows the exact value to copy (see below).

### Internal or external broker

By default the adapter runs its **own MQTT broker** – nothing else has to be installed, the
modules only point to it. In the tab **MQTT broker** you can choose an **external broker** instead
(for example Mosquitto or the ioBroker MQTT adapter): the adapter then connects as a client with
address, port, optional TLS, user name, password, client ID and an optional topic prefix. "Test
connection" checks the values of the form before saving and says whether the broker is reachable,
rejects the sign-in or does not answer.

With an external broker the adapter's own broker does not run and its port becomes free. The
modules must point to the external broker themselves (module setting `mqtthost`); the adapter does
not change that automatically – the tab "Find modules" shows which modules still point elsewhere
and can switch one over. Switching between the two modes loses no data; the adapter restarts after
saving.

### Find modules

The tab **Find modules** in the instance settings helps with step 3:

- **Address for modules** is the address under which the modules reach this ioBroker. It is
  pre-filled from the network interfaces of the host. If only Docker addresses (172.16.0.0/12)
  are found, enter the address of the Docker host yourself. Below it the ready-to-copy value
  for **MQTT host** (`address:port`) is shown.
- **Search** asks once via mDNS for `_http._tcp` (every faikout module announces its web interface
  there) and reads the settings page `/revk-settings` of every candidate - read only, with a 2 s
  timeout and at most 4 requests at a time. Nothing is changed on the modules, and there is no
  background or scheduled search. Answers repeated by an mDNS reflector (e.g. a UniFi gateway)
  are attributed to the address in the A record, not to the reflector.
- **Check address** reads the settings page of one IP address or host name - useful in Docker
  (bridge network), where mDNS does not reach the modules. There is no range scan.
- The result lists name / host name, IP, firmware / hardware and the status: connected to this
  adapter, set to this adapter but not connected, no MQTT broker set, other MQTT broker, settings
  protected by password, or web login required.

- **Connect a module** sets the MQTT host of ONE module to this adapter: choose the module from
  the search, click **Check** (fresh read of the module, preview of host name, IP, firmware and
  MQTT host old → new), then **Connect** and confirm. If the module currently uses another MQTT
  broker, "Replace other broker" has to be ticked as well. Right before saving the module is read
  again; if anything changed since the check, nothing is saved. The module gets one POST with
  `mqtthost=<address>:<port>` (plus MQTT user/password if this adapter has a user) and restarts;
  it has to report to this adapter within 90 s. **Restore** writes the MQTT host read before
  back (an old MQTT password cannot be read back - you get a warning if it was changed). A
  settings password of the module is used for that one action only and never saved. Nothing else
  is changed: no second broker, no firmware update, no OTA settings, and never several modules
  at once.

Values from the modules' settings forms (broker, user, passwords) are neither logged nor saved.

### Running ioBroker in Docker

The broker port has to be published by the container, otherwise the modules cannot reach it.
Add a port mapping for the configured port.

### Module settings for the complete set of data points

What the adapter can show depends on the settings in the faikout module (web interface,
**Settings**; most of them sit under the **Advanced** settings; older firmware spells them without
the dot, e.g. `haenable`, `nohumidity`). These are the relevant ones:

| Setting | Required value | Effect |
|---|---|---|
| **MQTT host** (Basic) | `<ioBroker IP>:<port>` | Connects the module to the adapter's broker. |
| `ha.enable` ("Home Assistant") | **on** (default) | The module publishes its readings (`state/<name>`) **only** while this is on. Off means: diagnostics only, no temperatures, energy, mode etc. — the adapter then logs a warning. |
| `ha.fanrpm` | on (recommended) | Fan speed `status.fanfreq` in rpm instead of Hz (default: Hz, one decimal). The adapter detects the unit itself (from the module's Home Assistant discovery) and sets it on the state; rpm is just more precise. |
| `ha.comprpm` | on (recommended) | Compressor speed `status.comp` in rpm instead of Hz (default: Hz). Detected automatically as well. |
| `ha.switches` | on | Adds `autoe` (main switch of the module's own automation) to the readings. |
| `no.hvacaction` | **off** (default is on) | Adds `action` — what the unit is actually doing (heating, cooling, idle …). |
| `no.humidity` | off (default) | Humidity `hum`. Only switch it on if the unit has no humidity sensor. |
| `no.demand` | off (default) | Demand limit `demand`. |
| `no.led` | **off** (default is on) | LED control — only if the unit's display LED can be switched. |
| `no.humidify` | off (default is on) | Humidifier control — only for units with a humidifier. |
| other `no.*` (`econo`, `powerful`, `comfort`, `streamer`, `quiet`, `sensor`, `swingv`, `swingh`, `flap`, `antifreeze`) | off (default) | Each one hides the matching function. Switch on only for functions your unit really lacks. |
| `livestatus` | on (recommended) | Reports immediately instead of every `reporting` seconds, see below. |
| `reporting` | 60 (default) | Interval of the periodic report in seconds. |

No setting is needed for energy counters, power draw, compressor and fan speed, refrigerant and
outside temperature: the module reads them from the unit on its own. Whether they appear depends
only on the model — a unit that does not report a value simply has no data point for it.

### Faster feedback

Out of the box a module reports its state every 60 seconds (`reporting` setting), so a command
is only confirmed with the next report — expect up to a minute. Enabling `livestatus` in the
module's **Extra** settings makes it report immediately.

### Settings the air conditioner does not accept

A module sends a setting to the air conditioner and reads it back. If the unit still reports its old
value after several rounds (`s21.tries`, 10 by default), the module drops the change, shows the value
of the unit again and publishes the rejected fields on `error/<name>/failed-set`. Until then the module
already shows the requested value, so it looks as if something had reset it.

The adapter logs this as a warning (`… the air conditioner did not accept demand=90 …`) and stores the
last rejection in `<device>.info.failedSet` as JSON with the requested values and the time:
`{"time":"2026-11-05T14:40:51.085Z","settings":{"demand":90}}`. The adapter itself does not send
anything in this situation.

Known case: **demand control** (`control.demand`). Some units acknowledge the command but keep
reporting 100 % — seen on units that still have Daikin's own WiFi adapter fitted. The module can only
pass on the percentage; the modes of Daikin's app (off / automatic / fixed) are not part of what is
known about the S21 interface. Econo is only taken over while the unit is running.

### Lovelace, type detector and other tools that expect numbers

The module speaks text (`mode` = `"cool"`), and the text states stay the main form for scripts, vis and
the device cards. Lovelace, however, converts the keys of `common.states` to numbers when it writes a
climate entity; with text keys this gives `NaN` and the command is lost. Use the numeric twins in
`<device>.control.*` for such tools:

| State       | Role                        | Values                                                                        |
| ----------- | --------------------------- | ----------------------------------------------------------------------------- |
| `modeNum`   | `level.mode.airconditioner` | 0 off, 1 heat_cool, 2 cool, 3 heat, 4 dry, 5 fan_only                         |
| `fanNum`    | `level.mode.fan`            | 0 auto, 1 night, 2 low, 3 lowMedium, 4 medium, 5 mediumHigh, 6 high           |
| `swingNum`  | `level.mode.swing`          | 0 off, 1 on, 2 vertical, 3 horizontal, 4 both, 5 comfort, 6 horizontalComfort |
| `presetNum` | `level.mode`                | 0 home, 1 eco, 2 boost                                                        |

The roles let the type detector find them as part of an air conditioner. Writing `2`, `"2"` or the label
`"cool"` to `modeNum` sends one command `cool` to the module; `modeNum` and `mode` are both set with
`ack=true` when the module confirms. A value outside the list is discarded with a warning in the log.
The twins are created with the first report of a module after the update.

## Climate control

The tabs **Schedules** (when which temperature applies) and **Climate control** (how the unit is
run) of the instance settings, the device cards (admin, device manager) and the vis widget
"Climate control" operate the built-in control. A step-by-step guide with pictures:
[English](/#/docs/adapterref/iobroker.faikout/docs/en/README.md) · [Deutsch](https://github.com/SmarthomeElektroniker/ioBroker.faikout/blob/main/docs/de/README.md).

Nothing is sent until you switch a function on per unit. To try things out first there is a
**dry run** (tab "Climate control", "For advanced users"): the adapter then calculates and shows what
it would do, but sends nothing. Instances from older versions keep their dry run switched on.

- **Global template and per unit**: the template holds strategy, curves, limits (factory default
  40 % to 100 %), temperature levels and a template schedule and applies to all units. Each unit
  has an entry with who controls, sensor sources and frost protection. A unit follows the template
  until you change something for it: a curve, limit, strategy or temperature level you adjust becomes
  the unit's own value, "Reset to the template" takes it back (each part separately).
- **Visible calculation**: below each unit curve the line "How the value comes about right now" shows
  curve (or previous day) → room correction → result with the numbers of the control; the strength of
  the room correction and its dead band are dragged in a chart under "For advanced users".
- **Who controls**: *ioBroker adapter controls* (schedule, temperature levels, power limit, humidity – nothing is stored
  in the module) or *Faikout module controls itself* (the module controls to the target itself; the adapter supplies
  target, sensor value and schedule). While the module controls itself the power limit is only set with the
  strategy "Auto", and every change of the target is stored in the module's flash memory – the
  settings warn when a schedule changes the target six or more times a day.
- **Demand control** limits the power (`demand`) in 5 % steps, either by a curve over the outside
  temperature (drawn live, with the current operating point) or as "Auto" (yesterday's consumption
  plus a margin).
- **Temperature levels and weekly schedule** (tab "Schedules"): a temperature level is a complete
  state of the unit (on/off, mode, target, fan, maximum power). The weekly schedule is edited in the
  tab "Schedules" or on the device card (button "Weekly schedule") and takes effect at once: click into a block to
  add a switching time, drag a line to move it, click a line to change or delete it, copy and paste
  whole days, load the default schedule, set an absence.
- **Sensor sources**: automatic, sensor of the unit, BLE sensor on the module or any ioBroker data
  point. A room data point either adjusts the setpoint of the unit (recommended) or is sent to the
  module.
- **Humidity and dew point**, **manual override** (schedule and temperature levels wait after someone used the
  remote control; "End manual override" on the card ends the wait) and **public holidays** are set
  once for all units.
- **Copy, paste, reset**: below every chart of the settings (curve, temperature levels, humidity,
  weekly schedule) the content can be copied, pasted at another unit or in the template, and reset
  to the template or the factory default – with a short-lived "Undo".
- **Device card**: state and reason, power limit, temperature level and next switching time, three symbol
  buttons for demand control, humidity control and weekly schedule, sensors with a warning when a
  fallback sensor is used. The chart button explains the current decision (curve with operating
  point, steps of the calculation, last 24 hours).

### Power limit on Daikin units

For the power limit from the adapter to take effect, two things are needed:

1. **The Daikin Wi-Fi module must be switched on** (remote control, SP menu: hold "Powerful" until "SP 1" =
   Wi-Fi on appears; "SP oFF" = off; manual 3P649406).
2. **Demand control in the Daikin app (Onecta) must not be set to "Auto"** – with "Auto" the cloud keeps
   overwriting the value of the adapter.

A value rejected while the unit is switched off says nothing – the adapter keeps showing "not tested yet".

### Multi split: assigning indoor units to an outdoor unit

Several indoor units on one outdoor unit report the same outdoor unit meter. In the tab **Multi split**
every system is a tile (outdoor unit at the top, indoor units on the line below). The adapter never
assigns by itself:

1. A **suggestion** appears when the meters match (or press "Suggest assignment"); arrows and labels
   (A1, A2, B1 …) show what would move where, the level says how reliable it is (*certain* after 10 minutes
   of matching meters – the observation survives a restart).
2. Apply a suggested outdoor unit with the green **✓**; "Close suggestion" discards the rest.
3. Or **drag** an indoor unit onto an outdoor unit, a single system or "New outdoor unit"; drag it out to
   release it (with "Undo"). Then **Save**.

Every outdoor unit gets a device card and the data points `outdoorUnits.<id>.*` (power, energy today and
this month, rest, shares, **system COP**).

**Power limit per outdoor unit:** with demand control on, all assigned indoor units – including those
switched off – get the same power limit: the maximum of the requests of the running units. When none
runs, 100 % is sent once. **Indoor units without a Faikout module: do not set an own power limit for
them in the Daikin app**, otherwise their value takes part. Details: [docs/en](/#/docs/adapterref/iobroker.faikout/docs/en/README.md).

### Changing settings in the module

The tab **Module settings** reads a fixed list of settings from the module (HTTP GET only), shows
the difference to the form and writes after a confirmation: one MQTT message
`setting/<module name>` with only the changed values, then it reads back and reports the result
per setting. Before every write the state that was read is kept (the last five per module) and
can be loaded into the form again. Settings a module does not offer (this depends on firmware and
unit) are named and never written. Firmware/OTA, broker, Wi-Fi, passwords and the host name can
never be written from here. Every write wears the flash memory of the module and restarts it for
some settings.

## Visualisation (vis templates)

The folder [`vis-templates/`](https://github.com/SmarthomeElektroniker/ioBroker.faikout/blob/main/vis-templates/) contains ready-made **vis 1** views for two units: overview,
one detail page per unit with controls, energy history and a phone view. They use only data points of
`faikout.0` and the widgets of this adapter – no scripts, no other adapters. Import instructions:
[vis-templates/README.md](/#/docs/adapterref/iobroker.faikout/vis-templates/README.md).

## Languages

The adapter, its settings page, device cards and data point names are available in English, German,
Russian, Portuguese, Dutch, French, Italian, Spanish, Polish, Ukrainian and Simplified Chinese. German
and English are maintained by the author; the other nine translations are machine-made and
machine-proofread (consistent terms, layout checked in every language), but have not been reviewed by
native speakers – corrections are welcome (issue or pull request). The vis widgets
show their texts in the same eleven languages (they follow the language of vis and fall back to English);
their attribute names are translated too. The step-by-step
guide exists in [English](/#/docs/adapterref/iobroker.faikout/docs/en/README.md) and [German](https://github.com/SmarthomeElektroniker/ioBroker.faikout/blob/main/docs/de/README.md).

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.2.4 (2026-11-27)
- Security (repository checker W5057/W5058): the module password field in the "bind module" dialog (`_bindPass`) is
  listed under `protectedNative` and `encryptedNative`. Admin never stores fields starting with `_`, so there is no old
  plain-text value to migrate; existing installations need no action.
- Maintenance: news entry 1.0.0 removed (never published on npm, W2004), dependabot also covers `/src-admin` (W8905).

### 1.2.3 (2026-11-25)
- Daikin power limit: hints and guide shortened to two points (suggestion from a tester) – the Daikin Wi-Fi module must
  be switched on ("SP 1"), and demand control in the Daikin app (Onecta) must not be set to "Auto". The table with four
  cases is gone; up to 1.2.2 the texts distinguished by internet access, which was imprecise.
- Multi split (#14): `outdoorUnits.<id>.copToday` is cleared when there is no value for today yet – up to 1.2.2 the value
  of the previous day stayed after midnight. New data points per outdoor unit: `copYesterday`, `energyYesterday`,
  `energyLastMonth` and `otherYesterday`.
- Log (#15): repeated error messages of a module (e.g. `comms: {"protocol":"S21","timeout":true}` about every 0.5 s
  while the unit has no power) are summarised: the first one as a warning, further ones at debug level with a
  counter, an info line every 15 minutes while it lasts and one info line when the messages stop.
- Meters after a power cut: a tester's units reported lower meter readings at whole kWh afterwards (163800 → 163000 Wh).
  This is still handled as a step backwards (counted values kept, never as a wrap at 6553.5 kWh); the multi split
  comparison of the outdoor unit meters now pauses for a few minutes after such a step, because the modules report
  it one after another.
- Energy meters: the module counters `energy`, `energyheat` and `energycool` are 16 bit in steps of 100 Wh and wrap
  around at 6553.5 kWh ([RevK/ESP32-Faikout #682](https://codeberg.org/RevK/ESP32-Faikout/issues/682)). The consumption
  values now count on across the wrap (old value within 50 kWh of the maximum, new value below 50 kWh) instead of
  losing the consumption up to it; any other step backwards is still treated as a reset. The multi split comparison of
  the outdoor unit meters also tolerates the wrap.

### 1.2.2 (2026-11-23)
- History (InfluxDB, SQL, history): the manual measurement in the Efficiency tab now reads the newest value up to 30 days back
  instead of 24 h, so values that have not changed for a long time (e.g. `control.mode`, `control.fan` with "only changes")
  are found. Tested against history 5.5, InfluxDB 1.8/2.7/3 (influxdb 5.5) and SQL 4.7 with SQLite, MariaDB, PostgreSQL and MS-SQL.

### 1.2.1 (2026-11-23)
- Multi split: the reported power `status.consumption` (S21 "FX60") is that of **each indoor unit** – the
  modules of one system report different values while the compressor `status.comp` is the same (tester
  report, Faikout wiki: "Power consumption of indoor unit"). Up to 1.2.0 the adapter took it as the power of
  the shared outdoor unit. Now the power of the outdoor unit (tile, device card, `outdoorUnits.<id>.power`),
  the header "Power" in the consumption chart and the system COP use the **sum** of the indoor units; the
  device card of an indoor unit shows "Power" (its own) instead of "Power outdoor unit".
- COP per indoor unit on multi split: electricity again from the reported power, so the **current COP** is
  available again. A plausibility check compares it with the indoor unit's own heating/cooling meter (window
  1 kWh); if the power turns out to be that of the whole outdoor unit (more than 1.5 times), the adapter falls
  back to the meter and counts the power once per outdoor unit (log entry).
- Multi split suggestion: equal outdoor unit meters **and** compressors running alike make it *certain*
  right away (no waiting for the meter observation).
- Energy is not affected: `energy` stays the meter of the outdoor unit, `energyheat`/`energycool` per indoor unit.
- Multi split, check of a saved assignment: meters up to 200 Wh apart count as equal (the modules report at
  different times in 100 Wh steps). Meters that differ more are no longer a warning on their own – with the same
  compressor speed (`comp`) the tile says "Compressors run in step – the assignment fits". Only if the meters
  differ and the compressors ran mostly differently for at least 30 minutes, a neutral note appears (info in the
  log instead of a warning). No error colour for an assignment the user saved; the colour bar at each indoor unit
  has a tooltip and the tab a legend (tester report, forum).
- Climate control: after an adapter start, a broker change (internal ↔ external), a reconnect or when a module
  is back online (online after offline, also after a module restart), the first reported state no longer counts
  as a manual override. Up to 1.2.0 it was compared with the last state before (possibly another unit at the
  other broker) and could lock schedule and levels for hours ("manual change detected (target)"). The adapter
  now takes the state over and sends its set point again; real manual changes during operation are still detected.
  A lock from a real manual change before the restart is kept.
- History (issue #12): the instance selection offers every data source the admin knows (`common.getHistory`:
  history, influxdb, sql …) instead of only `history`; if the chosen instance does not exist, the system's
  default history applies. The counters are registered once with "only changes" (retention etc. from the
  instance – no more forced "keep forever"); settings changed in the admin are no longer overwritten at the next
  start. The manual measurement reads history, InfluxDB 1.x/2.x and SQL alike: newest raw value before the
  moment (`returnNewestEntries`, `count`/`limit`, border values dropped), only from recorded data points, in
  parallel. Guide: which data points are written how often and what is needed for daily values only.

### 1.2.0 (2026-11-22)
- New tab **Multi split**: every system as a tile (outdoor unit, line, indoor units). Assign indoor units to a
  common outdoor unit by dragging, or apply a suggestion from the data per outdoor unit with ✓ (levels certain /
  still being checked / uncertain, arrows and labels A1, B1 …); the adapter never assigns by itself. The meter
  observation behind the suggestion survives an adapter restart.
- Device card per outdoor unit and data points `outdoorUnits.<id>.*`: power, energy today/this month, rest,
  shares of the indoor units and **system COP**.
- Climate control: one power limit per outdoor unit – all assigned indoor units (also those switched off) get the
  same value, the maximum of the requests of the running units; 100 % once when none runs
  (`outdoorUnits.<id>.demand`, `.demandReason`, `.leader`).
- Note for indoor units without a Faikout module: do not set an own power limit for them in the Daikin app.
- Daikin power limit: README and guide separate the app setting (Onecta demand control) from the Daikin Wi-Fi
  module itself (SP 1 / SP oFF) in one table; recommendation: module on, with cloud app "off", without internet
  app "manual (fixed value)" (partly tester reports, not yet confirmed).

### 1.1.1 (2026-11-22)
- Fix for multi split systems ([#8](https://github.com/SmarthomeElektroniker/ioBroker.faikout/issues/8)):
  according to the Faikout firmware the module field `energy` is the meter of the **outdoor unit**, while
  `energyheat`/`energycool` count per indoor unit. Several indoor units on one outdoor unit therefore all showed
  the same value. Device card ("Energy today/this month") and consumption chart ("All") now use heating +
  cooling per indoor unit, the chart total no longer counts the outdoor unit twice, and the power of a shared
  outdoor unit is added only once. Modules without heating/cooling meters keep `consumption.total`.
- Efficiency: if two modules report the same outdoor unit meter (multi split), COP/EER are calculated from the
  indoor unit's own heating/cooling meters (100 Wh steps) instead of the outdoor unit's power; there is no current
  COP in that case. New data point `efficiency.sharedOutdoorUnit`. Assigning indoor units to an outdoor unit
  (system COP) follows in a later version.
- `consumption.total.*` and `status.energy` stay unchanged, their names now say "Outdoor unit (module meter)".

### 1.1.0 (2026-11-22)
- Efficiency: estimated heat and cooling output, live COP/EER and heat/cooling energy and COP per day and
  month for every unit (data points `efficiency.*`). Calculated from airflow (fan level or fan speed via the
  airflow curve of the model) and the temperatures the unit reports; defrosting and pauses are detected and
  count no heat. Every value carries its quality (estimated, calibrated, measured) and an uncertainty in %.
  Units that do not report the required values (e.g. IR bridges) show "not available" with the reason.
- New tab "Efficiency": diagram of the calculation, one card per unit with live values, model choice
  (list of 96 Daikin indoor units from the manufacturer tables with source and gaps; own models can be added),
  airflow per fan level as draggable bars, ε per level, optional electricity price → cost per kWh of heat.
- Calibration assistant: choose an outlet sensor, the adapter measures for days (survives a restart) and shows
  the coverage per fan level and outdoor temperature; result with ε per level, residual error and reasoning,
  adopt or discard. Alternatively manual measurements (time and outlet temperature). Several calibrations per
  unit, reset to the data sheet estimate.
- Consumption chart: switchable to heat with a COP line (electricity stays the default); device card shows
  "COP today".
- Simulator (tests): true heat output, airflow and a simulated outlet sensor.

### 1.0.0 (2026-11-21)
- Climate control per unit: power limit by outdoor curve or "Auto" (previous day plus margin),
  weekly schedule with temperature levels, public holidays and absence, humidity and dew point control, manual
  override, frost protection, optional dry run. Every decision is shown with its reason.
- Two levels only: a global template and own values per unit, which arise when you change something
  for a unit ("Reset to the template" takes them back). "Scenes" are now called temperature levels and live in the tab "Schedules" together
  with the weekly schedules (also reachable from the device card, button "Weekly schedule").
  Factory defaults: lower limit 40 %, upper limit 100 % (was 95 %), top point of the heating curve
  −10 °C → 100 % (was 95 %); "2 K below the target → 100 %" stays.
- Settings of pre-release builds are migrated once at start: existing unit entries keep their own
  values (same behaviour as before), `regelSzenen`/`szenen` → `regelStufen`/`stufen`, the old
  factory defaults 95 % → 100 % (own values are never overwritten), broker user name `User` → `user`.
  Data points `regulation.schedule.scene`/`nextScene` → `level`/`nextLevel`, JSON key `scene` → `level`.
- Sensor sources with fallback (BLE sensor at the module, any data point, sensor of the unit);
  external or slow room sensors are handled by a slow correction of the unit's setpoint.
- Device cards with control state, weekly schedule dialog and details dialog; new VIS widget.
- The control data points live below `<unit>.regulation.*` with English IDs, state values and JSON
  keys; data points and JSON values of pre-release builds (`regel.*`, German keys) are moved or
  rewritten once at start.
- Instance settings ordered by importance: Setup, Schedules, Climate control, Consumption, Find modules,
  then the technical tabs (MQTT broker, Module settings); details for advanced users are collapsed.
  The setup tab lists the steps as a checklist that ticks off what is already done.
- Module settings can be read and written (with preview, backup and read-back).
- The reason why a unit does not accept the power limit is explained (Daikin Wi-Fi module and app).
- New tab "Find modules" in the instance settings: one-off mDNS search or check of a single
  address, read-only fingerprint of the module's settings page, status per module (connected,
  no broker, other broker, password protected, web login); new setting "Address for modules" with
  the ready-to-copy MQTT host value.
- "Connect a module": sets the MQTT host of one module to this adapter after a check and a
  confirmation, verifies that it reports within 90 s, and can restore the previous MQTT host.
- Optional external MQTT broker (for example Mosquitto) instead of the built-in one, with a
  connection test in the settings.
- Settings: setup guide as the first tab in numbered steps with a live status; module
  selection lists all units; sensor data points are checked while typing and show their live value;
  default curve as a table; consumption chart (stacked bars per unit, day/week/month/year).
- Device cards: "not set up" with a "Create schedule" button instead of "fault" while no schedule
  exists, buttons − and + for the target temperature, energy of the current month.

### 0.2.1 (2026-11-19)
- `control.swing` / `swingNum`: new value `H+C` (`horizontalComfort`, number 6) for comfort mode with
  horizontal swing. Comfort is a mode of the vertical louvres; the swing selector (e.g. in Lovelace) can now
  combine it with horizontal swing. Needs Faikout firmware with `H+C` support; older firmware reports `C`
  during comfort and treats a written `H+C` as `off`.
- Renamed modules (issue #6): after changing the hostname of a module, the adapter kept the old name in memory
  until the next restart and, once its objects were deleted, logged `State "...consumption..." has no existing
  object` every hour. The module is now recognised by its hardware ID (`info.id`): the old name is no longer
  updated, its consumption counters (today, month, JSON series) continue under the new name, and its objects
  stay untouched until you delete them (SmarthomeElektroniker)
- Deleted objects are noticed while the adapter runs: a deleted device is dropped, a deleted state or branch is
  created again before the next write; states are no longer written to objects that do not exist
  (SmarthomeElektroniker)
- Dev dependency `@iobroker/testing` 6.3.2 (SmarthomeElektroniker)

### 0.2.0 (2026-11-13)
- Numeric twins of the text control states: `control.modeNum`, `fanNum`, `swingNum` and `presetNum` with
  `common.states` (`{0: "off", 1: "heat_cool", ...}`) and the roles `level.mode.airconditioner`,
  `level.mode.fan`, `level.mode.swing` and `level.mode`, for Lovelace and the type detector (forum thread
  85668). Both forms are writable; a command on either sends exactly one command to the module, both are set
  with `ack=true` when the module confirms. Text states, vis widgets and device cards are unchanged.

### 0.1.0 (2026-11-12)
- Device manager support (`@iobroker/dm-utils`): one card per air conditioner in the admin tab "Devices"
  with the running operation (mode, current action, room/target/outside temperature, fan speed, humidity,
  power, energy today), one WiFi symbol for connection and signal (four levels plus dBm, crossed out
  when the module is disconnected), warning when the unit does not respond.
  On/off is a toggle in the status line that follows the state live and asks for confirmation. Mode (without
  "off", shows the last mode while the unit is off), target temperature (slider) and fan speed (Auto, Quiet and
  five level bars) can be changed directly on the card, also while the unit is off; choosing a mode switches the
  unit on. Everything is on the card itself, there is no separate control dialog. All controls write the
  `control.*` states, so commands take the usual path. No configuration actions on the cards.
- New state `control.selectedMode` (see above). German name of the outside temperature with "ß".

### 0.0.19 (2026-11-10)
- A setting the air conditioner does not accept (module message `error/<name>/failed-set`, e.g. demand control) is
  logged as a clear warning instead of the bare payload, and the last rejection is stored in the new state
  `info.failedSet` (requested values and time). Other module errors are logged with their topic (`comms`, …).
- Much lower CPU and database load (issue #5): states are only written when their value changes (unchanged values are
  refreshed every 5 minutes so their timestamp stays current), the hourly JSON series only at the change of hour, the
  daily/monthly series only when their content changes, and the meter readings in the device object at the change of
  hour, after a rebase, every 10 minutes at most and on shutdown – instead of everything on every module message.

### 0.0.18 (2026-10-25)
- VIS widgets: fixed rendering in the vis runtime – the widgets showed nothing and logged `missing ) after argument list`.
  They now subscribe the data points of their device themselves (vis only subscribed the device object), so values
  and states are shown and kept up to date. Energy history: works with vis 1 (`getStates`), shows a fixed range
  (last 24 hours / 31 days / 12 months) and formats numbers in the VIS language.
- VIS widgets: the accent colour follows the mode again (heating orange, cooling blue, off grey) – jQuery 1.11 in vis 1
  cannot set CSS custom properties with `.css()`, so it always stayed blue.
- New: vis templates (`vis-templates/`) – overview, detail page per unit, energy and phone view.

## Trademark and relationship to the hardware project

*Faikout* is a registered trademark of Andrews & Arnold Ltd. This adapter is an independent
piece of software and is neither affiliated with nor endorsed by Andrews & Arnold Ltd or the
authors of [ESP32-Faikout](https://codeberg.org/RevK/ESP32-Faikout). The name is used solely to
state which hardware the adapter talks to.

No source code from the hardware project is included. The adapter was written from scratch
against the MQTT interface; field names and value lists necessarily match, because that is what
the protocol prescribes. The hardware project is licensed under the GPL, this adapter under MIT
— they are separate works that communicate over a network protocol.

## License

MIT License

Copyright (c) 2026 Immanuel <github@freitag.online>

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