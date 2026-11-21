---
chapters: {"pages":{"en/adapterref/iobroker.faikout/README.md":{"title":{"en":"ioBroker.faikout"},"content":"en/adapterref/iobroker.faikout/README.md"},"en/adapterref/iobroker.faikout/vis-templates/README.md":{"title":{"en":"vis templates for ioBroker.faikout"},"content":"en/adapterref/iobroker.faikout/vis-templates/README.md"}}}
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

## Visualisation (vis templates)

The folder [`vis-templates/`](https://github.com/SmarthomeElektroniker/ioBroker.faikout/blob/main/vis-templates/) contains ready-made **vis 1** views for two units: overview,
one detail page per unit with controls, energy history and a phone view. They use only data points of
`faikout.0` and the widgets of this adapter – no scripts, no other adapters. Import instructions:
[vis-templates/README.md](/#/docs/adapterref/iobroker.faikout/vis-templates/README.md).

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
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