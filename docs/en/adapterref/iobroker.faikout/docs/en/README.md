---
chapters: {"pages":{"en/adapterref/iobroker.faikout/README.md":{"title":{"en":"ioBroker.faikout"},"content":"en/adapterref/iobroker.faikout/README.md"},"en/adapterref/iobroker.faikout/docs/en/README.md":{"title":{"en":"Faikout – climate control"},"content":"en/adapterref/iobroker.faikout/docs/en/README.md"},"en/adapterref/iobroker.faikout/vis-templates/README.md":{"title":{"en":"vis templates for ioBroker.faikout"},"content":"en/adapterref/iobroker.faikout/vis-templates/README.md"}}}
---
# Faikout – climate control

This guide describes the built-in climate control of the adapter: the settings in the tab
**Climate control**, the device cards, the weekly schedule and changing settings in the module.
[Deutsche Fassung](https://github.com/SmarthomeElektroniker/ioBroker.faikout/blob/main/docs/de/README.md) · [Back to the overview](/#/adapters/faikout)

## 1. If you like: watch first (dry run)

A new instance sends nothing on its own: power limit, weekly schedule and humidity control are switched
on per unit. If you want to check first whether curve, temperature levels and schedule fit, switch on
the **dry run**: the adapter then calculates everything and shows what it would send – but it does not
send a single command to the units.

The checkbox is at the bottom of the tab *Climate control* under **For advanced users** (for all
units). While it is on, a coloured note appears at the top of the tab and the device cards carry the
label "Dry run". This is the **one** switch: when it is off, all units send.

To deliberately keep only a single unit in dry run, tick "Only this unit in dry run" in its card (tab
*Climate control*, section *Devices*) under **For advanced users**. So commands are sent to a unit only
when the dry run for all units is off and its own checkbox is not set.

The data point `<unit>.regulation.demand.dryRun` shows per unit whether the dry run is in effect. It is
**not a switch** (read-only); an attempt to write it is rejected with a note in the log. In pre-release
versions it was a second switch per unit: on update, existing values are aligned once with the instance
setting. Instances from older versions keep their dry run – it stays on until you switch it off; if it
is already off, units whose old per-unit switch was still on send from then on (the log names them with
a warning at the first start).

The device list can be **exported** as a JSON file below the cards and **imported** again (replace or
add, with a confirmation; nothing is saved until you press "Save").

![Tab Climate control](../img/einstellungen_regelung.png)

### The tabs of the settings page

| Tab | What it holds |
|---|---|
| **Setup** | step list with ticks: broker, connect module, schedule, climate control |
| **Schedules** | WHEN which temperature applies: temperature levels of the template (sliders to drag), weekly schedule of the template and per unit preview, switch and “Edit weekly schedule”. Collapsed: manual override and public holidays |
| **Climate control** | HOW the unit is run: diagram of the control, the global template (strategy, heating and cooling curve with limits in the chart, humidity limits in the chart), below it the units as cards. Collapsed: dry run and fine tuning |
| **Multi split** | Which indoor units share one outdoor unit: systems as tiles, suggestion from the data, assigning by dragging |
| **Consumption** | chart and recording; can switch to heat and a COP line |
| **Efficiency** | heat output, COP/EER and heat energy per unit: model choice, airflow per fan level, calibration with an outlet sensor or manual measurement |
| **Find modules**, **MQTT broker (advanced)**, **Module settings (advanced)** | connecting and technical settings |

Per unit the tab *Climate control* shows: who controls, the curves (heating/cooling), the sensors
(with live value) and humidity; under **For advanced users** strategy, frost protection and dry run.
A unit’s temperature levels are in the tab *Schedules* next to its weekly schedule. The badges in the
header of the unit card say what applies: “all from the template” or e.g. “own: heating curve, levels”.

Below every curve of a unit you find **“How the value comes about right now”** – the calculation with
the numbers of the control, e.g. “curve 52 % → room 1.0 K too warm: −7 → 45 %” (with the strategy
previous day “previous day 48 % + 10 → …”), including lower limit, upper limit, full power,
overheating protection and the maximum power of the temperature level when they take effect. If the value has
not been sent to the unit yet, the reason follows (e.g. the hold time: the adapter waits 60 seconds
before raising and 10 minutes before lowering the limit, to see whether the request stays stable). How
strongly the room temperature corrects is set under **For advanced users** in the chart **Room
correction** (drag correction strength and dead band).

## 2. Template and settings per unit

The control knows exactly two levels:

- the **global template** – strategy, lower and upper limit, heating and cooling curve, previous
  day, temperature levels, humidity action and the weekly schedule of the template. It applies to
  all units.
- **per unit** an entry under **Units**. There is no checkbox “individual” any more: a unit follows
  the template until you change something for it – **own values arise by changing**, **“Reset to the
  template”** takes it back. This applies to each part separately:

| Part | own as soon as … | where |
|---|---|---|
| Heating curve, cooling curve | you drag a point – heading “(own curve)” instead of “(global curve)” | Climate control → unit card |
| Limits (lower/upper) | you move a limit line | Climate control → unit card, in the curve chart |
| Temperature levels | you change a level of the unit – “(own levels)” instead of “(global levels)” | Schedules → “Adjust levels” at the unit |
| Strategy (with previous-day values) | you choose something other than “As in the template” | Climate control → unit card → For advanced users |
| Humidity measure | you choose something other than “As in the template” | Climate control → unit card → Humidity |

Every part without an own value takes the template (and the template the factory default).
Always per unit are: who controls, the sensor sources and frost protection. A unit without any entry uses the template, the ioBroker adapter controls and the sensors are
on automatic.

The factory defaults of the template: lower limit **40 %**, upper limit **100 %**, heating curve
−10 °C → 100 %, 0 °C → 75 %, 7 °C → 55 %, 15 °C → 40 %, cooling curve 25 °C → 40 %, 30 °C → 65 %,
35 °C → 95 %.

### Who controls?

| Mode | What happens | Suited for |
| --- | --- | --- |
| **ioBroker adapter controls** | The adapter switches by weekly schedule and temperature levels, limits the power by demand and steps in on humidity. Nothing is stored in the module. | the normal case |
| **Faikout module controls itself** | The module itself controls to the target temperature (automatic mode of the firmware). The adapter supplies target, sensor value and schedule. | when the module should keep controlling without ioBroker |

Limits of "Faikout module controls itself":

- **Prerequisite in the module:** its automatic mode must be enabled – in the module's web interface
  switch on "Enable" and choose a range for "Auto temp" (not "Off"; settings `autoe` and `autor`).
  Until then the device card shows "not set up" with the note that the module's automatic mode is
  not enabled.
- The power limit is only set with the strategy **Auto**. With the strategy "curve", demand control
  rests; the card then says "rests (module controls itself)".
- **Back to "ioBroker adapter controls":** switch the automatic mode in the module off again ("Auto temp"
  to "Off"). After the change the module keeps driving the unit for up to ten minutes; the adapter does
  not treat what it changes during that time as a manual override and simply applies its own set points.
  If the module's automatic mode stays enabled, the card shows "not set up" with the note "The module's
  automatic mode is still enabled – switch it off in the module".
- **Every change of the target is stored in the module (flash memory).** If the schedule changes
  the target six or more times on one day, the tab and the schedule dialog warn. For schedules
  with many switching times "ioBroker adapter controls" is the better choice.

### What this unit supports

Shown live: whether the unit accepts the power limit, whether a BLE sensor is attached to the
module and whether a humidity value is available.

#### Power limit on Daikin units

For the power limit from the adapter to take effect, two things are needed:

1. **The Daikin Wi-Fi module must be switched on** (remote control, SP menu: hold "Powerful" until "SP 1" =
   Wi-Fi on appears; "SP oFF" = off; manual 3P649406).
2. **Demand control in the Daikin app (Onecta) must not be set to "Auto"** – with "Auto" the cloud keeps
   overwriting the value of the adapter.

A value rejected while the unit is switched off says nothing – the adapter keeps showing "not tested yet".

#### Multi split: one power limit per outdoor unit

If several indoor units share one outdoor unit and are assigned in the tab **Multi split** (confirmed
assignments only, never suggestions), the adapter controls the power limit **per outdoor unit**:

- Every running indoor unit calculates its request as before (curve or previous day, room correction,
  humidity, frost protection, temperature level, also after a manual change).
- **All** indoor units of the group – including those switched off – get **the same value: the
  maximum** of these requests. If one room asks for full power, 100 % applies to all. Whether Daikin
  takes the highest, the lowest or "the highest below 100" is not proven – with equal values it does
  not matter, and no room is undersupplied.
- When no indoor unit is running any more, 100 % is sent to all once, then the limit rests.
- Hold times and rate (lower after 10 min, raise after 1 min, at least 3 min apart, at most 12
  commands per hour) apply per outdoor unit; one command goes to all indoor units together.
- The group only regulates when demand control is switched on at **all** its indoor units and none
  rejects the value in principle. A dry run at one indoor unit applies to the whole group. A value
  rejected by a switched-off indoor unit (failed-set) does not mean "not capable"; it is not written
  again and again and gets the value as soon as it runs.
- Strategy "Auto" (previous day): based on the meter of the outdoor unit. The reference power is the
  sum of the reference powers of the indoor units (default 1000 W per unit, units without a module
  with the instance default); an own value goes into `aussengeraete[].vortagReferenzW`.
- **Indoor units without a Faikout module** ("further indoor units"): the adapter cannot set anything
  there, and their value in the Daikin app takes part. **Do not set an own power limit for these units
  in the Daikin app** (demand control off or 100 %), otherwise their value interferes.

Display: `<unit>.regulation.demand.reason` starts with the group, e.g. 'Group "Garden": 65 % = maximum
of Living room 65, Office 45; Guest room off - follows the group | own request 45 % …'. Below the
outdoor unit there are `outdoorUnits.<id>.demand`, `.demandReason` and `.leader` (the indoor unit that
currently determines the value).

### Demand control (power limit)

Demand control limits the power of the unit in 5 % steps so that it runs evenly instead of
cycling. If the room is 2 K or more below the target, the adapter always releases 100 % – even
above a lower upper limit and above the maximum power of the temperature level. If the curve itself
reaches 100 % (factory default at −10 °C), that is an ordinary value: the maximum power of the
temperature level still limits it.
If the room is 1.5 K or more above the target (below it when cooling), the power drops to the minimum
level of 30 % – but never below the lower limit of the unit (overheating protection).

- **Curve by outside temperature:** points "outside °C → power %", dragged with the mouse in the
  picture (the table is collapsed). The picture shows lower and upper limit and – as soon as the
  unit reports values – the current operating point. The heating curve must fall (the colder, the more), the
  cooling curve must rise.
- **Auto (previous day + margin):** yesterday's power plus a reserve; this is how "Auto" in the
  Daikin app works as well. Without data from yesterday the adapter releases 100 %.

Empty fields take the default. Demand control is switched on per unit on the device card.

### Temperature levels

Temperature levels (formerly "scenes") are in the tab **Schedules** – where they are needed: the
weekly schedule switches between them. A temperature level is a complete state of the unit: on/off,
mode, target temperature, fan and a **maximum power** that additionally limits the power coming from
the control. Per level you decide whether demand and humidity control work during that time.
Without own levels four factory levels apply:

| Level | Target | Fan | Maximum power |
|---|---|---|---|
| Comfort (`komfort`) | 21 °C | auto | 100 % |
| Setback (`absenken`) | 19 °C | night | 60 % |
| Away (`abwesend`) | 17 °C | auto | 50 % |
| Off (`aus`) | unit off | – | – |

The levels of the template apply to all units without levels of their own. A unit’s own levels are
set in the tab *Schedules* next to its weekly schedule (“Adjust levels”): they arise as soon as you
change a level there and, like the template, only apply after “Save” of the instance. “Reset to the
template” discards them again. If the unit’s weekly schedule uses levels that do not exist in the
template, the page first asks for a replacement per level (it suggests the template level with the
nearest temperature); the schedule is rewritten with it on “Save”.

### Sensor sources and frost protection

Selectable for outside temperature, room temperature and humidity:

- **Automatic** – the best available sensor. A BLE sensor on the module always has priority (the
  firmware defines that).
- **Sensor of the unit**, **BLE sensor on the module** or any ioBroker **data point**.

If a value is too old, the adapter falls back to the next sensor and shows that in yellow on the
card. A room data point can take effect in two ways: the unit controls itself and the adapter
adjusts its setpoint (recommended, also for slow sensors in another room – the setpoint at the
unit then differs from the target by at most ±3 K), or the sensor value is sent to the module.

**Frost protection:** below the configured room temperature the adapter heats to 10 °C – even if
the schedule says off. 0 switches frost protection off.

### Copy, paste, reset

Below every chart (curve, temperature levels, humidity, weekly schedule) there are three buttons:
**Copy** remembers the content, **Paste** inserts it at another unit or in the template (grey as
long as nothing suitable has been copied), **Use template** or **Reset to the factory default**
resets. After
pasting or resetting, **Undo** is offered for a short time. Curves, levels and humidity limits only
apply with “Save”; a weekly schedule at a unit takes effect at once.

## 3. For all units

- **Manual override:** if someone operates the unit at the device or in an app, schedule and
  temperature levels wait – until the next switching time, for a fixed time, or not at all. Demand and
  humidity control keep working. "End manual override" on the card ends the wait at once. The first
  report after an adapter start, a broker change, a reconnect or when a module is back online does not
  count as a manual override: the adapter takes the state over and restores its set point.
- **Humidity and dew point:** ΔDP (dew-point spread) is the distance between room temperature and
  dew point. If it becomes too small or the humidity too high, the adapter switches to dry mode,
  lowers the target by 1 K when cooling, or only reports – depending on the setting, with a minimum
  run time and a pause.
- **Public holidays:** on public holidays the Sunday schedule can apply (German nationwide
  holidays and own dates).

## 4. Device cards

![Device cards](../img/karten.png)

The card shows the running operation and offers everyday control:

- **Control:** state (active, manual override, not set up, fault, no connection, switched off) with
  the reason in plain text. "Not set up" means: the weekly schedule is switched on but none is stored
  yet (the button "Create schedule" appears at the top), or the
  module's automatic mode is still off although "Faikout module controls itself" is chosen.
  Red ("fault") is shown for real faults only.
- **Target temperature:** slider for large steps, the buttons − and + next to it for one step of the
  unit (usually 0.5 K).
- **Sensors:** if a chosen data point is missing, the card names it and says which sensor is used
  instead.
- **Power limit** as a number and step bar, with a note when the adapter only calculates (dry
  run), the control rests or the unit does not accept the value.
- **Temperature level** and **next switch**, below them the pointer to the button "Weekly schedule".
- **Automation:** three symbol buttons switch demand control, humidity control and the weekly
  schedule on and off (filled = on).
- **Manual override:** note with the time and the button "End manual override".
- **Sensors:** green = the chosen sensor delivers, yellow = fallback or no value; the source is in
  the tooltip.

At the bottom of the card the labelled button **Weekly schedule** (with the calendar symbol) opens
the weekly schedule of this unit, the button next to it the **details**.

### Weekly schedule

The weekly schedule is available in two places – it is the same editor and the same schedule:

- in the tab **Schedules** of the settings: one row per unit with a preview of the week, the switch
  "active" and "Edit weekly schedule"; schedules can be copied and pasted between units,
- on the **device card**: button "Weekly schedule".

The weekly schedule is stored per unit in the data point `regulation.schedule.weekJson` and **takes
effect at once** – it does not need "Save" on the settings page. The **schedule of the template**,
however, is a value of the settings: "Load default schedule" in the editor inserts it (without a
template schedule the factory schedule).

![Weekly schedule](../img/wochenplan.png)

- Click into a block: new switching time there, then choose the temperature level.
- Drag a line: move the switching time (15-minute steps).
- Click a line: choose another level or delete the switching time.
- On the right per day: "+ switching time", copy day, paste day.
- **Load default schedule** inserts the schedule of the template; without one the factory schedule
  (comfort in the mornings and evenings on weekdays, daytime at the weekend).
- **Absence:** from/until and the temperature level that applies during that time.

Nothing is saved before "Apply schedule". If the weekly schedule of the unit is switched off, the adapter then
asks whether to switch it on.

### Details

![Details](../img/details.png)

The details explain the current decision: curve with operating point, the calculation step by
step, the power limit of the last 24 hours and the sensors in use with their source.

## 5. Changing settings in the module

![Module settings](../img/modul_schreiben.png)

In the tab **Module settings**:

1. Choose the module (or enter its address) and **Read from module**. Reading uses HTTP GET only.
2. Change values in the form and **Check difference** – the preview names every change as
   "old → new".
3. **Write to module** and confirm. The adapter sends one single MQTT message with only the
   changed values, waits until the module answers again, reads back and shows the result per
   setting. This can take up to a minute: a module often shows a new value on its settings page
   only after about 30 seconds. Meanwhile the symbol in the button keeps spinning.

Before every write the adapter keeps the state it read (the last five per module). Under **Saved
state** it can be loaded into the form again and written back with the same procedure.

Important:

- Only a fixed list is written: status interval, live status messages, target in whole degrees,
  thermostat mode, hide power limit and the additional command name. Firmware/OTA, broker, Wi-Fi,
  passwords and the name of the module can never be changed from here.
- Which settings a module offers depends on firmware and unit. What is missing is named and never
  written.
- Every write wears the flash memory of the module and restarts it for some settings (about
  10 seconds without connection). Change deliberately, not for trying things out every minute.

## 6. Internal or external broker

By default the adapter runs its **own MQTT broker** – nothing else has to be installed, the
modules simply point to it. In the tab **MQTT broker** an **external broker** can be chosen
instead (for example Mosquitto or the ioBroker MQTT adapter). The adapter then connects as a
client; you enter address, port (1883, with TLS usually 8883), TLS if needed, user name, password,
client ID and a topic prefix.

- **Test connection** checks the values of the form before saving and says whether the broker is
  reachable, rejects the sign-in or does not answer.
- With an external broker the adapter's own broker does not run and its port becomes free.
- The modules must point to the external broker themselves (module setting `mqtthost`). The
  adapter does not change that automatically; the tab "Find modules" shows which modules still
  point to another broker and can switch a module over.
- Switching loses no data: data points, weekly schedules and saved states stay. After saving, the
  adapter restarts.

![External broker](../img/broker_extern.png)

## 7. vis widget "Climate control"

![vis widget](../img/vis_regelung.png)

The widget "Climate control (display)" shows state, temperature level and next switch, the curve with
operating point, the power limit and which controls are running for one unit. It is display only;
operation happens through the other widgets or the device card. The only attribute needed is the
device object, e.g. `faikout.0.Livingroom`.

## 8. Data points

Everything the interface shows is also available as data points below `<unit>.regulation.*`, among
them the channels `demand` (power limit), `schedule` (weekly schedule), `humidity`, `manual`
(manual override), `target` (buttons warmer/cooler) and `sensors`. Whether the unit accepts a power
limit is shown in `<unit>.info.demandCapable` (`unknown`, `yes`, `no`).

| Data point below `regulation.` | Values | Meaning |
|---|---|---|
| `state` | ok · manual · setup · fault · offline · off | overall state of the control |
| `reason` |  | reason in plain text |
| `mode` | adapter · faikout | who controls |
| `lastCommand` |  | last command (JSON; in dry run: would send) |
| `historyJson` |  | power limit of the last 24 hours |
| `demand.active` |  | switch: power limit |
| `demand.dryRun` |  | indicator: dry run is in effect for this unit (not a switch) |
| `demand.setpoint` · `rawValue` · `outsideMean` |  | calculated limit, raw value, outside mean (30 min) |
| `demand.state` · `demand.reason` | ok · fault · notCapable · neutral · off | state and reason of the power limit |
| `demand.strategy` | curve · previousDay | strategy |
| `demand.wouldSend` · `commandsPerHour` |  | last demand command, commands in the last hour |
| `demand.curveJson` · `capableReason` · `stateJson` |  | curve of the unit, reason of the capability, internal state (restart-safe) |
| `schedule.active` · `weekJson` · `absenceJson` |  | switch, weekly schedule and absence |
| `schedule.level` · `next` · `nextLevel` · `missing` |  | current temperature level, next switching time with its level, "no schedule stored yet" |
| `humidity.active` · `dewPoint` · `margin` · `intervention` · `reason` |  | humidity control: switch, dew point, spread, intervention, reason |
| `manual.locked` · `until` · `resume` |  | manual override: automation waits, until when, button "resume" |
| `target.up` · `target.down` |  | buttons: target temperature one step warmer/cooler |
| `sensors.outside` · `room` · `humidity` |  | sensor values in use |
| `sensors.…Source` · `…Status` · `…Kind` | Status: ok · fallback · missing; Kind: ble · dp · internal | source in plain text, status and kind per sensor |
| `sensors.correction` · `target` · `note` |  | sensor correction, target at the room sensor, note on a missing data point |

Pre-release builds of 1.0.0 kept these data points below `<unit>.regel.*`. The adapter moves them
once at start (switches, weekly schedule, absence, history and your own history settings are kept)
and removes the old objects.

With the renaming of "scenes" to "temperature levels" two data points have new names. The adapter
moves them at start as well (value and history settings are kept):

| old | new |
|---|---|
| `regulation.schedule.scene` (pre-release: `regel.plan.szene`) | `regulation.schedule.level` |
| `regulation.schedule.nextScene` (pre-release: `regel.plan.naechsteSzene`) | `regulation.schedule.nextLevel` |

### Settings: old → new

At the first start with 1.0.0 the adapter migrates the instance settings once and then restarts.
Your own values are never overwritten.

| old | new | migration |
|---|---|---|
| `regelSzenen` | `regelStufen` | list is taken over |
| per unit `szenen` | per unit `stufen` | list is taken over |
| per unit `individuell` (interim state) | removed | entries with the checkbox keep their own values; for entries without it the previously unused own values are cleared – in both cases the unit behaves as before |
| – | `regelPlanVorlage` | new, empty = factory schedule |
| `regelObergrenze` 95 | 100 | only if the old factory default 95 is still set |
| heating curve −10 °C → 95 % | −10 °C → 100 % | only if the curve is exactly the old factory default |
| `User` (pre-release 0.5.0) | `user` | user name of the built-in broker is taken over – the modules stay logged in |

### JSON data points

The keys inside the JSON data points are English. Pre-release builds of 1.0.0 wrote German keys: the
adapter still reads them (also when a script keeps writing the old format), writes English keys
only, and rewrites stored old values once at start.

| Data point | old | new | Example (new) |
|---|---|---|---|
| `demand.curveJson` | `heizen` · `kuehlen` · `untergrenze` · `obergrenze` | `heating` · `cooling` · `lowerLimit` · `upperLimit` | `{"heating":[[-10,100],[0,75],[7,55],[15,40]],"cooling":[[25,40],[30,65],[35,95]],"lowerLimit":40,"upperLimit":100}` |
| `lastCommand` | `felder` · `zeit` · `aktion` (`senden`/`wuerde`) | `fields` · `time` · `action` (`send`/`would`) | `{"fields":{"target":22,"fan":"auto"},"time":"2026-11-21T11:38:19.361Z","action":"send"}` |
| `demand.wouldSend` | `wert` · `zeit` · `aktion` (`senden`/`wuerde`) · `ist` | `value` · `time` · `action` (`send`/`would`) · `current` | `{"value":85,"time":"2026-11-21T12:14:38.489Z","action":"would","current":100}` |
| `schedule.absenceJson` | `von` · `bis` · `szene` (for a while `scene`) | `from` · `to` · `level` | `{"from":1798326000000,"to":1798930800000,"level":"abwesend"}` (time in ms or as ISO text; empty = no absence) |

Unchanged, because they never had German keys: `schedule.weekJson` (seven days starting on Monday,
each switching time `{"t": minutes since midnight, "s": ID of the temperature level}`), `historyJson` (pairs
`[time in ms, percent]`) and `consumption.*Json` (`hour`/`day`/`month`, `kwh`). `demand.stateJson` is
the adapter's memory across a restart – not an interface, its structure may change at any time.

The IDs of the temperature levels (`komfort`, `absenken`, `abwesend`, `aus`, or derived from your
own name) are language-independent and stay as they are: the weekly schedule refers to them –
existing schedules remain valid. Only the displayed name of the four factory levels follows the
system language; your own levels keep their names.

## 9. Consumption

The tab "Consumption" shows one chart for all units: stacked bars per day, week, month or year, each
unit in its own, permanently assigned colour; the bar height is the total. The chips above are the
legend – a click hides a unit. The tooltip lists the value per unit and the total; you can switch
between "All", "Heating only" and "Cooling only" and between chart and table. The data come from the
adapter's own counters (48 hours, 62 days, 24 months); no history adapter is needed.

### Recording in history, InfluxDB or SQL

For longer periods a history adapter can record the values. **Settings → Consumption** offers every instance
that the admin knows as a data source (`history`, `influxdb`, `sql` with MySQL/MariaDB, PostgreSQL, SQLite or
MS-SQL – any instance number). If the chosen instance does not exist, the adapter takes the default history of
the system (admin → system settings), otherwise none. With the check box "Record consumption with a history
adapter" the adapter registers the counters there **once**: all `consumption.<branch>.*` (branch `heating`,
`cooling`, `total`) and `efficiency.heat.*` / `efficiency.cold.*`, each with "only changes"; retention,
debounce etc. come from the defaults of the instance (with InfluxDB the retention of the bucket or database
applies). Whatever you change or switch off at a data point in the admin afterwards is kept – also after a
restart.

How often the adapter writes (to the objects; with "only changes" the database only gets what changes):

| Data point | written | entries in the database with "only changes" |
|---|---|---|
| `consumption.*.today`, `thisMonth`, `currentHour` | with every meter step of the module (100 Wh), plus at the change of the hour | about one per 100 Wh used, plus the drop to 0 at midnight or on the first of the month |
| `consumption.*.lastHour` | at the change of the hour | at most 24 a day |
| `consumption.*.yesterday` | at the change of the day (first report after midnight) | **one a day** |
| `consumption.*.lastMonth` | at the change of the month | one a month |
| `consumption.*.hoursJson` | at the change of the hour | (not registered) |
| `consumption.*.daysJson`, `monthsJson` | when the current day/month changes | (not registered) |
| `efficiency.*` (output, COP, state, `heat.*`, `cold.*` …) | at most every 30 s, at once when the state changes (heating/defrosting/idle) | `heat.today` etc. per change |
| `efficiency.daysJson`, `monthsJson` | every 5 min and at the change of the hour | (not registered) |
| `efficiency.hoursJson` | at the change of the hour | (not registered) |
| `outdoorUnits.<id>.*` | on change (30 s cycle) | (not registered) |

An unchanged value is written again at the latest every 5 minutes so that its time stamp stays alive (monitors
such as device-watcher). Without "only changes" the history adapter records these repetitions as well.

**Daily values only (e.g. 2–3 years retention):** `consumption.heating.yesterday` and
`consumption.cooling.yesterday` per indoor unit are enough (on a multi split count the outdoor unit once:
`consumption.total.yesterday` of **one** module), for the heat `efficiency.heat.yesterday`. With "only changes"
that is one entry a day, about 365 a year per data point. Switch the other data points off in the admin; the
adapter does not register them again. Two equal days in a row (e.g. 0 kWh) give only one entry – if you need
every day, set "record the same values anyway" of the history adapter to 86400 s. Monthly values: `lastMonth`.

The adapter reads from the history adapter only for the manual measurement in the tab Efficiency (see there):
per value the newest entry up to 30 days before the moment (a value that stays the same for days is stored only once with "only changes"), and only from data points this instance records.
The charts in the tab Consumption use its own series only.

### Multi split: assigning indoor units to an outdoor unit

If several indoor units are connected to **one** outdoor unit, their modules report the same outdoor
unit meter. For consumption, COP and power limit to be right, tell the adapter in the tab **Multi
split** which indoor units belong together. The adapter **never assigns by itself**.

1. **Look:** every system is a tile – the outdoor unit at the top (the fan turns while it runs), the
   indoor units on the line below. Single systems are shown in grey below.
2. **Suggestion:** if the adapter sees equal meters, a suggestion appears (otherwise use **"Suggest
   assignment"**). Arrows and labels (A1, A2, B1 …) show which indoor unit would move where; every
   suggested system has its own colour. The level says how reliable it is: *certain* (meters above
   10 kWh, at most 200 Wh apart, observed for 10 minutes – or equal meters **and** compressors running
   alike), *still being checked* or *uncertain* (only compressor and outside temperature run alike). The observation survives an adapter restart.
3. **Apply:** the green **✓** on a suggested tile applies exactly this outdoor unit. **"Close
   suggestion"** discards the rest; rejected suggestions only return via "Suggest assignment" or when
   the group changes.
4. **By hand:** drag an indoor unit onto an outdoor unit, onto a single system or onto "New outdoor
   unit"; drag it out and drop it anywhere to release it (with "Undo"). The ⌄ menu on every small tile
   does the same.
5. **Save** – only then the assignment applies.

The tile then shows power (sum of the indoor units), energy today, the share of every indoor unit, the **rest** (consumption of the
outdoor unit not explained by the indoor units, e.g. defrosting or indoor units without a module) and the **system COP**. Indoor units
without a Faikout module are entered as a number under "Further indoor units without a Faikout module".
Every outdoor unit gets its own **device card** (display only) and the data points
`outdoorUnits.<id>.*`. With demand control switched on, the power limit applies per outdoor unit (see
"Multi split: one power limit per outdoor unit").

**Colours and symbols in the tile:** the colour bar at every indoor unit is its colour in the consumption chart –
not a status. Below the tile the adapter checks the saved assignment against the data:

- green ✓ **"Meters match"** – the outdoor unit meters of the modules are at most 200 Wh apart (the modules
  report at different times and in 100 Wh steps);
- grey ⓘ **"Compressors run in step – the assignment fits"** – the meters differ more, but the compressor speed
  `comp` is the same at all of them (it comes from the outdoor unit);
- grey ⓘ **note** – only if the meters differ **and** the compressors ran mostly differently over at least
  30 minutes of operation (plus one info entry in the log).

While the system is idle there are no compressor data and the adapter shows nothing. The assignment always stays
as you saved it; there is no error colour here.

## 10. Efficiency: heat output and COP

The tab “Efficiency” answers: **how much heat (or cooling) does the unit deliver for its electricity?**
The adapter estimates it from values the unit reports anyway – without extra hardware:

    heat = air density × c_p × airflow × (outlet temperature − intake temperature)
    outlet temperature = intake + ε × (liquid − intake)
    COP (cooling: EER) = heat ÷ electricity

- **Intake air** is `status.achome`, **liquid** is the refrigerant sensor of the indoor unit (`status.liquid`),
  **electricity** comes from the reported power `status.consumption` (the energy counter `status.energy` only counts in 100 Wh steps and serves as a fallback).
- The **airflow** follows the fan level or the reported fan speed (`status.fanfreq`) via the curve of the
  model (data sheet, heating and cooling separately). Once a fixed level has run for a few minutes the adapter
  remembers its speed – from then on it also calculates on “auto” from the speed.
- **ε** says how closely the air follows the heat exchanger. Without a measurement ε comes from the data sheet
  (bypass factor of the capacity table; a generic value without a model). `liquid` sits on the liquid line, not
  in the middle of the coil – ε is therefore an empirical factor and can exceed 1. It only becomes accurate
  through **calibration**.

**To be honest:** without calibration the output is an estimate of roughly ±25–35 %, calibrated roughly
±10–20 %. The adapter states the uncertainty of every value (`efficiency.uncertainty`) and derives it from the
actual contributions (ε, airflow, temperature difference, residual error of the calibration). At very small
load, right after start-up and on “auto” without a learned speed a note is shown.

What is **not** calculated:

- **Defrosting** (heating, coil colder than the room): no heat, flag `efficiency.defrosting`. The electricity
  of that time still counts towards the daily COP – just like on the bill.
- **Compressor paused:** output 0.
- **Cooling:** sensible cooling only. Dehumidification (latent) is added only if a sensor permanently
  measures temperature and humidity at the outlet and the unit reports its room humidity; otherwise the
  cooling output is underestimated and marked as such.
- **Units without the required values** (e.g. IR bridges): “not available – this unit does not report …”.
  Electricity consumption keeps working.

### The tab

At the top a diagram of the calculation, below one card per unit. The header shows the essentials
(“COP 3.4 · 1.62 kW · estimated ±28 %”). Opened:

1. **Live values:** heat output, COP now (smoothed), COP today, heat today, airflow and estimated outlet
   temperature – each with its quality *estimated*, *calibrated* or *measured*.
2. **Model:** “Choose model” opens the search (text, series, design, size). 96 Daikin indoor units are
   included with airflow per level, rated output, SEER/SCOP and source. Every entry says how it was checked
   and lists what the manufacturer table does not state – nothing is guessed or filled in. If your unit is
   missing: **Create own model** (airflow from the data sheet, m³/min = m³/h ÷ 60). Without a model the adapter
   uses generic values and a larger uncertainty.
3. **Airflow per fan level:** bars to drag (also arrow keys or double-click on the number). Own values have
   an outline; “Reset to the data sheet” takes them back. Intermediate levels without a data sheet value are
   calculated and marked.
4. **ε per level** with the uncertainty band and what is in use.
5. **Calibrate** (see below).

At the bottom: **electricity price per kWh** (optional) – the cards then show what one kWh of heat costs
today (`efficiency.heatPrice`).

Model, own airflow values and price apply after “Save”. Measurement and calibrations take effect immediately.

### Calibrating with an outlet sensor

Place a wireless temperature sensor about 10 cm in front of the air outlet and in the section “Calibrate”:

1. **Choose sensor** – the data point of the sensor (optionally humidity), then “Start measurement”.
2. **Measure** – the measurement runs inside the adapter for days and survives a restart. Every two minutes
   a measuring point is added while the unit runs steadily; defrosting, start-up, pauses and very small load
   are left out (the count is shown). Bars show the **coverage per fan level** (“Level Medium: 42 points,
   ok”) and per outdoor temperature range; a hint names the level to run next for about 40 minutes. From
   20 points a level counts as well covered.
3. **Result** – ε per level, the residual error and the reasoning: if the measured levels differ by at most
   5 %, **one value is used for all levels**; otherwise each level keeps its own. Levels without measurement
   are interpolated between measured ones or carried over from the neighbour – and marked. **Adopt** makes the
   result the calibration in use, **Discard** deletes the measurement.

**Manual measurement instead of a sensor:** enter time and outlet temperature. The adapter looks up the
other values (level, intake air, liquid) for that moment – from its own record of the last 24 hours, otherwise
from the history adapter (if `status.*` is recorded there); if it finds nothing it asks for them. A
measurement taken during defrosting is rejected with the reason.

Each unit has a list of all calibrations (date, origin, points, uncertainty); one of them is in use. “Reset
to the data sheet estimate” switches back without deleting anything. If the sensor stays at the outlet
permanently, the adapter can **measure instead of estimating** (checkbox below the list).

### Data points

| Data point (`<unit>.efficiency.…`) | Content |
|---|---|
| `heatOutput`, `coolingOutput` | heat and cooling output in kW |
| `cop` | COP or EER now, smoothed over about five minutes |
| `airflow`, `outletTemperature` | airflow in m³/h, outlet temperature (estimated or measured) |
| `state`, `defrosting` | what the unit is doing (heating, cooling, defrosting, idle, off, unavailable) |
| `quality`, `uncertainty`, `missing` | quality (estimated, calibrated, measured, unavailable), uncertainty in %, missing values |
| `heat.today/yesterday/thisMonth/lastMonth`, `cold.…` | heat and cooling energy in kWh |
| `copToday/Yesterday/ThisMonth/LastMonth`, `eer…` | heat ÷ electricity over the same period |
| `hoursJson`, `daysJson`, `monthsJson` | series `{hour/day/month, heat, cold, elHeat, elCool}` (48 hours, 62 days, 24 months) |
| `heatPrice` | cost per kWh of heat today (only with an electricity price) |

Numerator and denominator of the daily COP cover the same time spans: if the adapter or the module was gone
for more than five minutes, that span counts on neither side. The counter values of the unit remain
unchanged under `consumption.*`; over a day the two totals may differ slightly.

In the tab **Consumption**, “Heat & COP” switches the chart: bars show the heat per unit, the line the COP
(axis on the right). “Electricity” stays the default. The device card shows “COP today 3.8 (estimated)”; the vis widget “Readings” offers the reading “COP today”.

### Outlook

- **Controlling for the best COP** (keeping the unit in the efficient part-load range, avoiding cycling) is
  deliberately not built yet – the values should first prove themselves over a winter.
- **Multi split** (several indoor units on one outdoor unit): every module reports the power of **its own**
  indoor unit (`status.consumption`, S21 "FX60"; the compressor `status.comp` is the same on all of them).
  Since 1.2.1 the COP per indoor unit, including the current COP, uses this power. The adapter checks it
  against the indoor unit's own heating/cooling meter: if the power turns out to be that of the whole outdoor
  unit (measured over 1 kWh of meter increase: more than 1.5 times), it falls back to the meter (100 Wh steps, no
  current COP) and counts the power once per outdoor unit. For the whole system there is the **system COP**
  of the outdoor unit (tab Multi split, `outdoorUnits.<id>.copToday`).

## 11. Languages

The interface exists in eleven languages (en, de, ru, pt, nl, fr, it, es, pl, uk, zh-cn) and follows
the system language of ioBroker; numbers use the decimal separator of the language. German and English
are maintained by the author. The other nine translations are machine-made and machine-proofread
(consistent terms, layout checked in every language at wide and narrow window width), but have not been
reviewed by native speakers – corrections are welcome. The vis widgets show their texts in the same eleven
languages – they follow the language of vis and fall back to English (attribute names are translated
too); this guide exists in English and German.