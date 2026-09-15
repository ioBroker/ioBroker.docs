---
chapters: {"pages":{"en/adapterref/iobroker.nut2/README.md":{"title":{"en":"ioBroker.nut2 — Setting it up"},"content":"en/adapterref/iobroker.nut2/README.md"},"en/adapterref/iobroker.nut2/datapoints.md":{"title":{"en":"Data points"},"content":"en/adapterref/iobroker.nut2/datapoints.md"},"en/adapterref/iobroker.nut2/faq.md":{"title":{"en":"Frequently asked questions"},"content":"en/adapterref/iobroker.nut2/faq.md"}}}
---
# Data points

The adapter does not ship a fixed list of states. It asks the NUT server what your UPS reports (`LIST VAR`) and builds
the tree from the answer, so two different UPS models produce two different trees. What follows explains the parts that
are always the same, and how a NUT variable turns into an ioBroker state.

Every data point carries a short explanation in `common.desc`, and value lists, status texts and severity levels appear
in your ioBroker system language.

## From a NUT name to a state ID

NUT names its variables with dots: `battery.charge.low`. ioBroker uses dots for hierarchy, so the adapter maps them:

- the **first** dot separates the channel — `battery`
- every further dot becomes a dash — `charge-low`

`battery.charge.low` therefore lands at `ups0.battery.charge-low`, and the instant command `test.battery.start` at
`ups0.commands.test-battery-start`. A variable without any dot (some drivers expose a bare `ALARM`) has no channel and
is created directly under the device.

The adapter keeps the real NUT name internally, so writing to a state sends the correct name back to the server even
where the mapping is not reversible (three-phase names such as `input.L1-L2.voltage` contain a dash of their own).

## Adapter-wide data points

| State                  | Meaning                                                                                                                   |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `info.connection`      | The adapter is talking to the NUT server. Says nothing about the credentials.                                             |
| `info.upsTotal`        | How many UPS devices the server offers.                                                                                   |
| `info.upsReachable`    | How many of them answered the last poll.                                                                                  |
| `info.allUpsReachable` | One value to watch instead of every device. **False** while nothing was found at all — "0 of 0" is not "everything fine". |
| `notify`               | Writable trigger. Any write polls immediately; see the FAQ.                                                               |

## Per UPS

Each UPS on the server becomes a device. Its name comes from the `desc` you set in the server's `ups.conf`; without one
the adapter uses manufacturer and model from the UPS itself.

### `info`

| State       | Meaning                                                                                                                                                                                       |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `reachable` | This UPS answered the last poll. It also drives the online marker on the device object, and it goes to false when the adapter stops — a stopped adapter must not keep claiming a UPS is fine. |
| `notify`    | The last upsmon event routed to this UPS.                                                                                                                                                     |

### `status` — the parsed status

NUT reports the state of a UPS as one string of tokens, e.g. `OL CHRG`. That is hard to use in a script, so the adapter
splits it:

| State       | Meaning                                                                                                                                                                                                                    |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `raw`       | The original string, unchanged.                                                                                                                                                                                            |
| `display`   | The same information as readable text in your language, e.g. "On line power, Charging".                                                                                                                                    |
| `severity`  | A single number, 0–4 (see below).                                                                                                                                                                                          |
| 19 booleans | One per known status flag: `online`, `onBattery`, `lowBattery`, `charging`, `discharging`, `replaceBattery`, `overloaded`, `bypass`, `calibrating`, `forcedShutdown`, `alarm`, `ecoMode`, `testing`, `overheat`, and more. |

`charging` and `discharging` are also filled from `battery.charger.status`, because some UPS models report the charge
state there instead of through the `CHRG`/`DISCHRG` flags.

A token the adapter does not know is **not** dropped — it stays visible in `raw` and `display`. The NUT specification
explicitly allows drivers to invent their own tokens, and inventing a boolean for each of them would be guesswork.

#### Severity levels

| Level | Meaning   | Set by                              |
| ----- | --------- | ----------------------------------- |
| 0     | OK        | On line power                       |
| 1     | Info      | Trimming, boosting, calibrating     |
| 2     | Warning   | On battery, replace battery, bypass |
| 3     | Critical  | On battery **and** low battery      |
| 4     | Emergency | Forced shutdown                     |

Severity describes the **power situation** only. Fault flags such as `overloaded`, `alarm` and `off` deliberately do
not raise it — they have their own booleans, and mixing them in would make a single number mean two different things.

### The measurement channels

Which of these exist depends entirely on your UPS driver:

| Channel   | Contains                                                              |
| --------- | --------------------------------------------------------------------- |
| `battery` | Charge, remaining runtime, voltage, type, temperature                 |
| `device`  | Manufacturer, model, serial number, device type                       |
| `driver`  | Which NUT driver serves this UPS, its version and parameters          |
| `input`   | What arrives from the mains — voltage, frequency, transfer thresholds |
| `output`  | What the UPS delivers — voltage, frequency, current                   |
| `ups`     | The UPS itself — load, power, temperature, delays, countdowns         |
| `outlet`  | Switchable outlets and outlet groups, if the model has them           |
| `ambient` | Environment sensors, if the UPS or an attached EMP provides them      |

Values are stored as the type they really are: numbers as numbers with a unit (V, Hz, A, Ah, %, W, VA, s, °C), yes/no
readings as booleans, fixed vocabularies (`enabled`/`disabled`/`muted`, `charging`/`discharging`/…) as selection lists.
A value that claims to be numeric but is not gets discarded with one warning rather than stored as junk — a chart
cannot do anything with `Infinity`.

Countdowns (`ups.timer.shutdown` and friends) are **empty** while no countdown is running. Drivers say that in
different ways — some report `-1`, others the word `NotActive` — and neither "minus one second" nor a text error would
be useful.

### `commands`

One button per instant command the UPS offers, created only when **Enable commands** is on _and_ credentials are
configured. Pressing a button sends `INSTCMD` and resets itself.

Commands that cut power (`load.off`, `shutdown.*`, `bypass.*`) carry a warning sign at the start of their explanation.

## Who owns these objects

The adapter owns name, description, type, role and unit of everything it creates — a rename in the object tree is
reset at the next sync. Your **recording settings** are the exception: they belong to you, they are never touched, and
when the adapter renames one of its own data points the recording moves along with it.

A UPS that disappears from the NUT server has its objects removed; one that comes back is rebuilt.