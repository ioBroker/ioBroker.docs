---
chapters: {"pages":{"en/adapterref/iobroker.mtec/README.md":{"title":{"en":"ioBroker.mtec"},"content":"en/adapterref/iobroker.mtec/README.md"},"en/adapterref/iobroker.mtec/docs/profile-json.md":{"title":{"en":"Input profile `json`"},"content":"en/adapterref/iobroker.mtec/docs/profile-json.md"},"en/adapterref/iobroker.mtec/docs/profile-mtecmqtt.md":{"title":{"en":"Input profile `mtecmqtt`"},"content":"en/adapterref/iobroker.mtec/docs/profile-mtecmqtt.md"}}}
---
# Input profile `mtecmqtt`

Reads the Energy Butler from the MQTT output of [MTECmqtt](https://github.com/croedel/MTECmqtt), a separate open source project that reads the Energy Butler via Modbus and publishes the values to an MQTT broker. The adapter only reads these MQTT messages; it does not contain any code of MTECmqtt. The format was checked against MTECmqtt 2.1.0.

The heat pump is not part of MTECmqtt. You can still read it with the [`json` profile](/#/docs/adapterref/iobroker.mtec/docs/profile-json.md) at the same time.

## Setup

1. Run MTECmqtt and let it publish to your broker.
2. In the instance settings choose **MTECmqtt** as the data source of the Energy Butler and enter the same broker.
3. **Topic prefix:** the value of `MQTT_TOPIC` in the MTECmqtt configuration (default `MTEC`).
4. **Serial number:** optional. Empty means the adapter uses the first serial number it sees and shows it in `butler.info.serial`. With several Energy Butlers use one instance per device and enter the serial number in each.

The adapter subscribes to `<prefix>/<serial or +>/#` with QoS 0. Home Assistant discovery topics (`homeassistant/…`) are not read.

## What MTECmqtt sends

- One topic per value: `<prefix>/<serial>/<group>/<name>`, payload plain text (`"38.400"`, `"-628"`, `"0"`), no time of measurement.
- About every 10 s MTECmqtt reads and publishes the group `now-base`. The other `now-*` groups (`now-grid`, `now-inverter`, `now-backup`, `now-battery`, `now-pv`) take turns, one per loop, so each of them only comes about every 50 s. `day` follows about every 5 min, `total` about every 5 min, `config` about every hour.

## How the adapter processes it

- **One record per loop:** The values come one by one. The adapter collects them until the topics have been quiet for 2 s, or until a value repeats (the next loop has started), and processes them as one record.
- **Time:** MTECmqtt sends no time of measurement, so the time of receipt of the first value of a loop is used as `ts`. Duplicates or buffered old messages cannot be detected this way; with QoS 0 there are none.
- **Missing = null, per group:** A group that is part of the record sets its missing or non-numeric fields to `null` (quality `0x82`). Groups that are not part of the record keep their values: the phase and PV string values do not drop to `null` between their rounds.
- **Outdated data:** `butler.info.stale` and `butler.info.lastMeasurement` follow `now-base` with the normal limit (default 20 s). The phase values (`now-grid`) and PV string values (`now-pv`) have their own, longer limit (default 180 s); without new values for that long they are set to `null`.

## Mapping

| Data point `butler.…` | MTECmqtt | Note |
|---|---|---|
| `battery_soc_percent` | `now-base/battery_soc` | % |
| `battery_power_signed_w` | `now-base/battery` | + discharging, − charging ¹ |
| `battery_charge_power_w` / `battery_discharge_power_w` | derived from `battery` | |
| `battery_charge_discharge_status_code` | `now-base/battery_mode` | 0 discharging, 1 charging |
| `grid_total_power_signed_w` | `now-base/grid_power` | + export, − import ¹ |
| `grid_import_power_w` / `grid_export_power_w` | derived from `grid_power` | |
| `grid_phase_a/b/c_power_signed_w` | `now-grid/grid_a`, `grid_b`, `grid_c` | about every 50 s |
| `pv_total_power_w` | `now-base/pv` | |
| `pv1_power_w` / `pv2_power_w` | `now-pv/pv_1`, `pv_2` | about every 50 s |
| `inverter_ac_power_signed_w` | `now-base/inverter` | |
| `inverter_operating_status_code` | `now-base/inverter_status` | same codes |

¹ The signs follow from MTECmqtt's documentation and formulas. They still need to be confirmed with real data – feedback in the forum or as a GitHub issue is very welcome.

**All other values** (voltages, currents, frequencies, temperatures, battery SOH, backup values, operation mode, energy counters, serial number, firmware version …) are kept as `butler.mtecmqtt.<group>.<name>`, for example `butler.mtecmqtt.now_base.battery_voltage` or `butler.mtecmqtt.total.pv_total`. Group and name become lowercase, characters other than letters, digits and `_` become `_`. Numbers become number data points, everything else text. Units are added where MTECmqtt's naming makes them clear (V, A, Hz, °C, W, kWh, %).

## Daily values from the energy counters

MTECmqtt sends real daily energy counters in the group `day`. They replace the estimate of the analysis:

| `analysis.today.…` | MTECmqtt |
|---|---|
| `pv_kwh` | `day/pv_day` |
| `grid_import_kwh` | `day/grid_purchase_day` |
| `grid_export_kwh` | `day/grid_feed_day` |
| `battery_charge_kwh` | `day/battery_charge_day` |
| `battery_discharge_kwh` | `day/battery_discharge_day` |

With all five counters, `house_kwh`, `cost`, `savings` and `autarky_percent` are recalculated from them as well. Between two counter readings (about 5 min) the estimate continues from the last reading.

Right after midnight MTECmqtt may still send yesterday's totals for a few minutes. For the first 30 minutes of a day the adapter therefore only takes over counters that have visibly been reset; after a restart in that time it waits until 00:30 and uses the estimate until then.

## Differences to MTECmqtt's own values

MTECmqtt calculates the current house consumption as `inverter − grid_power`. The adapter uses PV, grid and battery (`pv + import + discharging − export − charging`). Both can differ slightly, for example by the inverter's losses. For the daily values both use the same formula.