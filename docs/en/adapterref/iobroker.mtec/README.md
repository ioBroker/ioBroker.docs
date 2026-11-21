---
chapters: {"pages":{"en/adapterref/iobroker.mtec/README.md":{"title":{"en":"ioBroker.mtec"},"content":"en/adapterref/iobroker.mtec/README.md"},"en/adapterref/iobroker.mtec/docs/profile-json.md":{"title":{"en":"Input profile `json`"},"content":"en/adapterref/iobroker.mtec/docs/profile-json.md"},"en/adapterref/iobroker.mtec/docs/profile-mtecmqtt.md":{"title":{"en":"Input profile `mtecmqtt`"},"content":"en/adapterref/iobroker.mtec/docs/profile-mtecmqtt.md"}}}
---
# ioBroker.mtec

Reads an M-TEC **Energy Butler** (hybrid inverter with PV and battery) and an M-TEC **heat pump** from an MQTT broker, creates typed ioBroker data points and analyses the energy flows: house consumption, self-sufficiency, battery forecast, PV surplus, cost, savings and daily values.

The adapter only reads. It never writes anything back to the devices.

Manufacturer: [M-TEC Systems](https://www.mtec-systems.com/en/) ([Energy-Butler](https://www.mtec-systems.com/en/products/energy-butler/), [heat pumps](https://www.mtec-systems.com/en/heat-pumps/))

> This adapter is a private community project. It is **not affiliated with, endorsed or supported by M-TEC**. All product names belong to their owners.

German description: [docs/de/README.md](https://github.com/derDennis99/ioBroker.mtec/blob/main/docs/de/README.md)

## Data sources

The adapter does not talk to the devices directly. It reads their values from an MQTT broker, in one of two formats ("input profiles"). The data source is chosen per device:

| Profile | Devices | Source |
|---|---|---|
| `json` | Energy Butler and heat pump | One topic per device with a JSON message of `fields` and `timestamp`. Any source can produce it, for example Node-RED or a script. [Format description](/#/docs/adapterref/iobroker.mtec/docs/profile-json.md) |
| `mtecmqtt` | Energy Butler | The MQTT output of [MTECmqtt](https://github.com/croedel/MTECmqtt). [Details and mapping](/#/docs/adapterref/iobroker.mtec/docs/profile-mtecmqtt.md) |

For example, the Energy Butler can come via `mtecmqtt` and the heat pump via `json` at the same time.

Direct access via Modbus (without extra software) is planned for a later version.

## Installation

Requirements: Node.js 22 or newer, js-controller 6.0.11 or newer, admin 7.6.20 or newer.

The adapter is published on npm and is being added to the ioBroker repository. As soon as it is listed there, search for "mtec" in the adapter list of the admin, install it and create an instance.

## Configuration

| Setting | Meaning |
|---|---|
| Energy Butler, heat pump | Data source per device: `json`, `mtecmqtt` (Energy Butler only) or "not present" |
| Topics (`json`) | One topic per device |
| Topic prefix, serial number (`mtecmqtt`) | `MQTT_TOPIC` of MTECmqtt (default `MTEC`); serial number empty = first one seen |
| Data counts as outdated after | Limit for `info.stale` (default 20 s) |
| Slow MTECmqtt groups count as outdated after | Limit for phase and PV string values (default 180 s) |
| Broker, port, user, password | Connection to the MQTT broker, only needed for `json` and `mtecmqtt`. The password is stored encrypted. |
| Analysis | Usable battery capacity, minimum state of charge, grid price and feed-in tariff (cents per kWh, 0 = not set, values below 1 are read as currency units per kWh), currency, threshold for "solar power to spare" |

Settings of version 0.4 and older (one input profile for both devices) are taken over automatically on the first start, the instance restarts once.

If everything works, `mtec.0.info.connection` is `true`, the data points below `mtec.0.butler.*` (and `mtec.0.heatpump.*`) fill up and `info.stale` is `false`.

## Data points

| Path | Content |
|---|---|
| `info.connection` | `true` if all configured data sources are connected |
| `heatpump.<field>` | 25 values of the heat pump with unit and role, status codes with texts |
| `butler.<field>` | 16 values of the Energy Butler |
| `butler.mtecmqtt.<group>.<name>` | Further values from MTECmqtt (profile `mtecmqtt` only) |
| `<device>.info.connection` | Connection of the device's data source (with `json` and `mtecmqtt`: the broker) |
| `<device>.info.lastMeasurement` | Time of the last measurement (ms) |
| `<device>.info.stale` | `true` if the last measurement is older than the configured limit |
| `butler.info.serial` | Serial number (profile `mtecmqtt` only) |

- **Time of measurement:** With `json`, every value gets the time of measurement from the message as `ts`, so history adapters store the real time of measurement.
- **Missing is not 0:** A value that is not reported becomes `null` with quality `0x82` (sensor reported no value); an old value does not stay.
- **For your own logic:** Always check `info.stale` before using a value for a switching decision.

## Analysis

Below `analysis` the adapter calculates from the live values of the Energy Butler:

| Data point | Content |
|---|---|
| `house_power_w` / `house_without_heatpump_w` | House consumption now (PV + import + discharging − export − charging), with and without heat pump |
| `autarky_percent` / `self_consumption_percent` | Self-sufficiency and PV self-consumption now |
| `surplus_w` / `surplus_available` | PV surplus (5 min average) and "solar power to spare" (with hysteresis) |
| `battery_energy_kwh`, `battery_full_in_min`, `battery_empty_in_min`, `battery_status_text` | Battery content and forecast, e.g. "full in 2 h 15 min (approx. 14:35)" |
| `cost_now_per_h` / `savings_now_per_h` | Electricity cost and savings per hour now (only with a configured price) |
| `grid_balance_per_h` / `grid_balance_text` | Grid balance now: + feed-in revenue / − import cost per hour, as number and as text ("+0.27 €/h") |
| `today.*` | Daily values since midnight: PV, import, export, battery, house, heat pump (electricity, heat, COP), self-sufficiency, `cost`, `savings` |

Amounts use the configured currency as unit. The texts follow the system language (German or English).

The daily values are estimated from the power (power × time since the previous measurement, gaps over 60 s are skipped) and survive a restart on the same day. With the profile `mtecmqtt` the real daily energy counters of the Energy Butler replace the estimate.

## Checking a broker

For the profile `json`, `tools/mqtt-check.mjs` listens for a few seconds and compares the fields with the adapter's definitions. With `--user` it asks for the password (hidden input, or from `MQTT_PASSWORD`):

```bash
node tools/mqtt-check.mjs --host <broker> --user <user>
```

## Development

```bash
npm install
npm test
```

The tests cover both input profiles, the analysis and the whole path through a local MQTT broker (aedes). `npm run test:integration` additionally starts the adapter in a real js-controller and checks the data flow from a local broker, `npm run lint` checks the code style and `npm run check` the types (TypeScript on the JavaScript sources).

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.5.1 (2026-11-15)

- No more "DB closed" errors in the log when the settings of 0.4 are taken over: the instance now only restarts and starts working after the restart

### 0.5.0 (2026-11-15)

- Data source per device (`butlerSource`, `heatpumpSource`, also "not present"), the MQTT broker is only needed for MQTT sources. Existing settings are taken over automatically.
- New data points `butler.info.connection` and `heatpump.info.connection`; `info.connection` is `true` if all configured data sources are connected
- Profile `json`: new fields are only created if their name consists of a-z, 0-9 and _ (starting with a letter, not `info` or `mtecmqtt`); other names are ignored with a warning, so a message can no longer create IDs with dots or overwrite `<device>.info.*`
- Profile `mtecmqtt`: IDs below `butler.mtecmqtt` are always lowercase
- Link to the manufacturer in the README
- (dev) Type checking of the sources (`npm run check`, also in CI), VS Code schema settings, automerge for Dependabot updates, older changelog entries moved to CHANGELOG_OLD.md

### 0.4.2 (2026-10-18)

- Data point and channel names in all ioBroker languages

### 0.4.1 (2026-10-18)

- Timers use the adapter API (setInterval/setTimeout of the adapter)
- German description moved to docs/de/README.md
- Author contact added

### 0.4.0 (2026-10-17)

- (breaking) Money data points renamed: `analysis.cost_now_eur_h` → `cost_now_per_h`, `savings_now_eur_h` → `savings_now_per_h`, `grid_balance_eur_h` → `grid_balance_per_h`, `today.cost_eur` → `today.cost`, `today.savings_eur` → `today.savings`. Today's values are taken over, the old objects are deleted.
- New input profile `mtecmqtt`: Energy Butler via the MQTT output of MTECmqtt, including further values and real daily energy counters
- Input profile selection in the admin interface
- English as base language: log messages, data point names (English and German), admin interface with translations; texts follow the system language
- Public description of the `json` format
- (breaking) Requires Node.js 22, js-controller 6.0.11 and admin 7.6.20 or newer
- Admin interface and adapter description in all ioBroker languages
- New adapter icon

Older changes: CHANGELOG_OLD.md

## License

MIT License

Copyright (c) 2026 derDennis99 <mc@nucs.eu>

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