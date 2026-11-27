---
chapters: {"pages":{"en/adapterref/iobroker.mach/README.md":{"title":{"en":"ioBroker.mach"},"content":"en/adapterref/iobroker.mach/README.md"},"en/adapterref/iobroker.mach/docs/PROTOCOL.md":{"title":{"en":"MACH cloud protocol (as used by this adapter)"},"content":"en/adapterref/iobroker.mach/docs/PROTOCOL.md"}}}
---
<img src="admin/mach.png" width="96" alt="Logo" align="right">

# ioBroker.mach

ioBroker adapter for **Adria caravans and motorhomes with the MACH box**
(MACH 2.0 / "MACH by Adria Mobil", manufactured by Solvesall d.o.o.).
Manufacturer page: [MACH app – Adria Mobil](https://www.adria-mobil.com/mach-app).

It connects to the MACH cloud with your own MACH account, the same way the
app does over LTE, and makes the box values available in ioBroker.

> **Unofficial project.** This adapter is not made, endorsed or supported by
> Adria Mobil or Solvesall. "Adria" and "MACH" are names of their respective
> owners and are used here only to describe what the adapter works with.
> The protocol was worked out independently to make the box interoperable
> with ioBroker. The manufacturer can change it at any time, which may break
> the adapter. Use at your own risk – especially when switching devices
> (heating!) remotely.

*A German summary is available in [docs/de/README.md](https://github.com/VierlingMt/ioBroker.mach/blob/main/docs/de/README.md).*

## Features

- Reads **all values** of the box: at connect, every 15 minutes and a few
  seconds after every change the box reports. Values are named like in the
  app (`values.AIR_HEATER_TEMPERATURE`, `values.FRIDGE_VALUE`,
  `values.GAS_BOTTLE_LEVEL`, …), with scaling and value lists from the
  value table your own account downloads from the MACH backend.
- Changes reported by the box are applied immediately (push).
- **Everything the box allows can be switched** (from 2.0.0, beta): heating,
  air conditioning, fridge, boiler, water pump, lights and light scenes,
  energy source and more – directly on `values.<NAME>` as switch, slider or
  selection. What is writable comes from the value table of your box, so it
  works for every Adria model. See [Writing values](#writing-values).
- `control.reboot` restarts the box like "Restart MACH" in the app
  (at most once every 10 minutes).
- Sensitive values (Bluetooth PIN, SIM ICCID/IMSI, modem IMEI) are
  deliberately **not** stored as states.

## Requirements

- An Adria vehicle with a MACH box and **active LTE connectivity** (the
  adapter talks to the box through the MACH cloud, not via Bluetooth/WiFi)
- A MACH app account that has the vehicle paired
- ioBroker with js-controller ≥ 6.0.11, admin ≥ 7.6.20, Node.js ≥ 22

## Installation

Install the adapter from the ioBroker admin: Adapters → search for "mach".
It is available there once it has been added to the ioBroker repositories.

## Configuration

| Field      | Value                                                       |
|------------|-------------------------------------------------------------|
| `username` | e-mail of your MACH app account                             |
| `password` | password (stored encrypted)                                 |
| `machId`   | 12 hex characters, e.g. `A1B2C3D4E5F6` (app → device settings) |
| Write access | `off`, `operation` (default) or `setup` – see below |
| Additionally writable | own list of names, `*` allowed |
| Never writable | own list of names, `*` allowed |

## Writing values

From 2.0.0 every value the box allows to change is writable under
`values.<NAME>` – write it with `ack=false` like any other state:

| Value in the box | State | Example |
|---|---|---|
| on/off | `boolean`, role `switch` | `values.FRIDGE_VALUE = true` |
| selection | `number` with `states` | `values.WATER_HEATER_TEMPERATURE = 2` (boost) |
| number with range | `number` with `min`/`max`/`step` | `values.LIGHT_GROUP_1_BRIGHTNESS = 40`, `0` = off |
| action without state | one button per action | `values.LIGHT_SYSTEM_MEMORY_1_RESTORE = true` |
| text | `string` | only in "setup" |

The adapter checks range, step and selection, sends the commands one after
another and then asks the box for the value. The state gets `ack=true` with
the value the **box** reports. If the box rejects or does not confirm
within 20 s, the state returns to the last value of the box.

**Write access** (instance settings):

- **operation** (default): everything the value table marks as writable,
  except texts and setup values.
- **setup**: additionally sensor pairing (tyre, gas, battery), limits,
  sensor addresses and names.
- **off**: read only.
- **Additionally writable**: your own list for things the value table does
  not mark as writable or that your model has in addition, e.g.
  `MY_VALUE, LIGHT_*`. Only works for values with a known type.
- **Never writable**: your own blocklist, e.g. `POWER_CONTROL_*`.

Parts that **move or trigger something** are only writable when you add
their name to "Additionally writable" yourself – the setting "setup" is not
enough: slide-outs, awnings, lifts (bed, TV, bike, garage), steps, roof,
satellite antenna, winch, front blind, doors, drain valves, central locking
and generator. Switching them remotely without seeing them can harm people
or the vehicle. Most caravans do not have them; the value table contains
them for motorhomes and trailers.

Some values can **never** be written, whatever the settings: LTE on/off,
all SIM settings (slot, APN, user, password, PIN), the Bluetooth PIN,
bootloader/application mode and debug switches. A wrong value there can cut
the LTE connection or brick the box – with no way back remotely.

## States

| State | Meaning |
|---|---|
| `info.connection` | connected to the box |
| `info.lastAllValuesAt` | time of the last full state (ms) – use this to detect stale data |
| `info.lastFrameAt` | time of the last message from the box (ms) |
| `values.<NAME>` | every value of the box, named like in the app; writable ones as switch/slider/selection |
| `values.<NAME>_<ACTION>` | buttons for actions without state (e.g. light scene save/restore) |
| `control.reboot` | button: restart the box |
| `tlv.*` | raw values that are not in the value table (for analysis) |

The value table itself is saved to the file storage of the instance
(admin → Files → `mach.0/drivers.json`) for reference.

**Tip for automations:** only act on values when `info.lastAllValuesAt` is
recent (e.g. younger than 30 minutes). If the box loses LTE, the last values
stay in ioBroker.

## How it works

See [docs/PROTOCOL.md](/#/docs/adapterref/iobroker.mach/docs/PROTOCOL.md).

## Contributing

Reports from other Adria models are very welcome – especially which values
your box reports (`values.*`) and which of them can be switched.
Feedback and questions: [test thread in the ioBroker forum](https://forum.iobroker.net/topic/85913/test-adapter-mach-v2.0.0)
or a [GitHub issue](https://github.com/VierlingMt/ioBroker.mach/issues).
Please **never** post your password, `machId`, `sharedSecret`, tokens or
raw captures in issues.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.0.1 (2026-11-24)

- No functional changes. Releases are now made with the release script
  (@alcalzone/release-script); integration test fixed for js-controller 8;
  README links to the test thread in the ioBroker forum.

### 2.0.0 (2026-11-20)

**Breaking changes – please read before updating from 1.x:**

- The old trees `named.*` (German IDs such as `named.Heizung_Aktiv`) and
  `frames.*` are no longer created; on start the adapter deletes them.
  States with custom settings (e.g. history) are kept and logged once.
  Every value is under `values.*` with the name from the app's value
  table, e.g. `named.Heizung_Schalter` → `values.AIR_HEATER_VALUE`,
  `named.Heizung_Sollwert` → `values.AIR_HEATER_TEMPERATURE`,
  `named.Innentemperatur` → `values.LIVING_MEASURED_TEMPERATURE`.
  Please update scripts, aliases and visualisations.
- The heating write path without value table (from 1.x) was removed;
  writing always uses the value table of the box.
- Settings got English names (`writeAccess`, `extraWritable`,
  `neverWritable`); values from the 2.0.0 betas are taken over.
- All log messages are in English.

Everything from the betas 2.0.0-beta.0 to beta.2 (writing every value the
box allows, write access levels, own allow and block lists, moving parts
only with own allow list, waiting for the box confirmation).

### 2.0.0-beta.2 (2026-11-14)

- Negative temperatures in `named.Innentemperatur` and
  `named.Aussentemperatur` are decoded with sign: -3 °C no longer shows
  as 253 °C. The `values.*` states were already correct.

### 2.0.0-beta.1 (2026-11-01)

- While a write is pending, a different value reported by the box (often
  the old value arriving right after the command) no longer resets the
  state. The adapter asks again after 3 s and only takes the box's value
  with a warning when the 20 s deadline passes.
- Note: some boxes report the external light brightness scaled
  (60 % of the value sent); the state then shows what the box reports.

### 2.0.0-beta.0 (2026-11-01)

**Breaking:** on/off values under `values.*` are now `boolean` (was text
`"on"`/`"off"`), other selections are `number` with `states` (was the text
of the selection). Adjust scripts that compare with `"on"` or with the text.
Existing objects are converted on the next start.

- Writing every value the box allows (see "Writing values"), generic from
  the value table: selections, numbers, texts, actions.
- Write access setting (off / operation / setup) plus own allow and block
  lists; values that could cut the connection are always blocked; moving
  parts, valves, locks and generator need an explicit own allow entry.
- Commands are queued, checked against range/step/selection and confirmed by
  asking the box for the value (GET_DEVICE_VALUE_FOR_VALUEID).
- Values from push messages go to `values.*` right away.

Older entries are in CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 Martin Vierling <vierling.martin@gmail.com>

The adapter is free software under the [MIT License](https://github.com/VierlingMt/ioBroker.mach/blob/main/LICENSE): use it,
copy it, change it and share it, also commercially, as long as the license
text stays with it.

**What this license covers – and what not:**

- It covers only the code and documentation **written for this
  repository** (adapter, protocol description, logo).
- The author has **no rights** to the MACH app, the MACH box firmware, the
  MACH backend or any of their code, data or trademarks. These belong to
  Solvesall d.o.o. and Adria Mobil d.o.o. and are **not** licensed here.
- No code, files or data of the MACH app are included in this repository.
  The value table is downloaded at runtime from the MACH backend with the
  user's own account and is not part of this project.

See also [NOTICE](https://github.com/VierlingMt/ioBroker.mach/blob/main/NOTICE).