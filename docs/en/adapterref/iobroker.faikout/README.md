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
  econo, powerful, comfort, streamer, sensor, LED, quiet, humidify
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
### 0.0.18 (2026-10-25)
- VIS widgets: fixed rendering in the vis runtime – the widgets showed nothing and logged `missing ) after argument list`.
  They now subscribe the data points of their device themselves (vis only subscribed the device object), so values
  and states are shown and kept up to date. Energy history: works with vis 1 (`getStates`), shows a fixed range
  (last 24 hours / 31 days / 12 months) and formats numbers in the VIS language.
- VIS widgets: the accent colour follows the mode again (heating orange, cooling blue, off grey) – jQuery 1.11 in vis 1
  cannot set CSS custom properties with `.css()`, so it always stayed blue.
- New: vis templates (`vis-templates/`) – overview, detail page per unit, energy and phone view.

### 0.0.17
- Fixed units of `status.comp` and `status.fanfreq`: the module sends Hz by default and rpm only with `ha.comprpm`/`ha.fanrpm`.
  The adapter now takes the unit from the module's Home Assistant discovery (a fractional fan value is always Hz),
  sets it on the state and remembers it per device. The VIS widgets show the unit of the state.
- All fields the module can report are described: new `status.action` (with `no.hvacaction` off), `status.loopback`,
  `status.bletemp`/`blehum`/`blebat`, `info.dma`, `info.restart`, `info.ipv6`, `info.secureboot`, `info.nvsecryption`.
  `dma` and `restart` were created as unknown fields under `status.*` up to 0.0.16 and are moved to `info.*` on start.
- New tab "Module settings" in the instance configuration: which settings the faikout module needs for the complete set of
  data points (all eleven languages). Same table in the README.
- Warning in the log when a module is connected without `ha.enable`.

### 0.0.16
- Release notes in `io-package.json` trimmed to seven entries and translated into all languages (repository checker E1032/E1144).

### 0.0.15
- The MQTT broker's shutdown timeout uses the adapter's `setTimeout` (repository checker E5005).

### 0.0.14
- **Breaking:** the consumption subtree uses English IDs: `consumption.{total|heating|cooling}.{currentHour|lastHour|today|yesterday|thisMonth|lastMonth}`
  and `hoursJson`/`daysJson`/`monthsJson` (entries keyed `hour`/`day`/`month`). On start the adapter copies the last values of the
  old `verbrauch.*` states to the new IDs and deletes the old objects. Data recorded by the history adapter stays under the old IDs.
- Config keys renamed to `historyRegister` / `historyInstance`; an existing configuration keeps working until it is saved again.
- `status.autoe` is now subscribed - writes were silently dropped before.
- Admin texts translated into all eleven languages; VIS widgets: English names, English select values (`light`/`dark`,
  `day`/`month`/`year`, reading keys) and a dictionary for all eleven languages. Values saved by older views are still understood.
- Names of states for unknown fields carry all eleven languages.

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