---
chapters: {"pages":{"en/adapterref/iobroker.mtec/README.md":{"title":{"en":"ioBroker.mtec"},"content":"en/adapterref/iobroker.mtec/README.md"},"en/adapterref/iobroker.mtec/docs/profile-json.md":{"title":{"en":"Input profile `json`"},"content":"en/adapterref/iobroker.mtec/docs/profile-json.md"},"en/adapterref/iobroker.mtec/docs/profile-mtecmqtt.md":{"title":{"en":"Input profile `mtecmqtt`"},"content":"en/adapterref/iobroker.mtec/docs/profile-mtecmqtt.md"}}}
---
# Input profile `json`

A simple, general MQTT format: one topic per device, each message one JSON object with all current values and the time of measurement. Any data source can produce it, for example a Node-RED flow, a script or your own Modbus reader.

The profile is available for both devices: the heat pump and the Energy Butler.

## Topics

One topic per device. In the instance settings choose **JSON** as the data source of the device and enter its topic:

| Device | Default topic |
|---|---|
| Heat pump | `energy/heatpump/telemetry` |
| Energy Butler | `energy/butler/telemetry` |

If you do not have a device, set its data source to **Not present**. With **JSON** the topic is required.

## Message

```json
{
  "name": "butler",
  "fields": {
    "battery_soc_percent": 81,
    "pv_total_power_w": 2300,
    "grid_import_power_w": 628,
    "grid_export_power_w": 0
  },
  "timestamp": 1791956345000
}
```

| Key | Meaning |
|---|---|
| `fields` | Object with the values, field name → number. Required. |
| `timestamp` | Time of measurement as Unix time in milliseconds. Required. |
| `name` | Optional, ignored by the adapter. |

Values are plain numbers. On/off values are sent as `0` or `1`.

## Rules

- **Time of measurement:** Every value gets `timestamp` as its `ts`. History adapters (InfluxDB, SQL) therefore store the real time of measurement, not the time of receipt.
- **Duplicates and older messages** are detected by `timestamp` and discarded: a message is only processed if its `timestamp` is newer than the last processed one. QoS 1 and buffering at the source are therefore no problem.
- **Timestamps more than 60 s in the future** are rejected. In that case the clock of the source or of the ioBroker host is wrong.
- **One message is a complete snapshot.** Send all fields you have in every message. A known field that is missing, or that is not a number, sets its data point to `null` with quality `0x82` (sensor reported no value), so an old value does not stay.
- **Missing is not 0.** If a sensor fails, leave its field out instead of sending 0. 0 is a valid value.
- **New fields** that are not listed below are created automatically as numbers and reported once in the log. Their name becomes part of the data point ID, so it may only contain lowercase letters, digits and `_`, must start with a letter and must not be `info` or `mtecmqtt`. Other names are ignored with a warning.
- **Outdated data:** If the last measurement is older than the configured limit (default 20 s), `<device>.info.stale` becomes `true`. A send interval of a few seconds (for example 5 s) is recommended.
- **QoS and retain:** QoS 0 or 1 both work. Retain is not needed; a retained message is processed like any other, and `info.stale` shows its age.

## Heat pump fields

Tested with an M-TEC heat pump with KEBA controller (AHPA series).

| Field | Meaning | Unit |
|---|---|---|
| `dhw_top_temperature_c` | Hot water tank top | °C |
| `buffer_bottom_temperature_c` | Buffer tank bottom | °C |
| `heating_flow_after_mixer_temperature_c` | Heating circuit flow after the mixer | °C |
| `flow_temperature_c` | Heat pump flow | °C |
| `return_temperature_c` | Heat pump return | °C |
| `outdoor_temperature_c` | Outdoor temperature | °C |
| `heatpump_target_temperature_c` | Current target temperature | °C |
| `electrical_power_w` | Electrical power | W |
| `thermal_power_w` | Thermal power | W |
| `cop` | Current coefficient of performance | – |
| `heating_water_mass_flow_kg_s` | Heating water mass flow | kg/s |
| `circulation_pump_percent` | Setpoint of the heat pump circulation pump ¹ | % |
| `compressor_setpoint_percent` | Compressor setpoint ¹ | % |
| `heating_circuit_pump_state` | Separate heating circuit pump on | 0/1 |
| `heating_circuit_mixer_raw` | Mixer setpoint, signed raw value ² | – |
| `dhw_heat_request` | Hot water heat request | 0/1 |
| `buffer_heat_request` | Buffer heat request | 0/1 |
| `consuming_excess_energy` | Excess energy use as reported by the heat pump controller ³ | status |
| `operating_status_code` | Operating status, see below | code |
| `operating_substatus_code` | Sequence status (device-specific codes, not decoded) | code |
| `dhw_sensor_status_code` | Sensor status hot water | 0 = OK |
| `buffer_bottom_sensor_status_code` | Sensor status buffer bottom | 0 = OK |
| `heating_flow_after_mixer_sensor_status_code` | Sensor status heating circuit flow | 0 = OK |
| `flow_sensor_status_code` | Sensor status heat pump flow | 0 = OK |
| `outdoor_sensor_status_code` | Sensor status outdoor temperature | 0 = OK |

¹ Setpoints, not measured speeds.
² The conversion to percent is not known yet.
³ Comes from the heat pump controller and does not prove a PV surplus.

Operating status: 0 standby · 1 pre-run · 2 heating · 3 defrosting · 4 cooling · 5 post-run · 7 safety shutdown · 8 error

`dhw_heat_request`, `buffer_heat_request` and `heating_circuit_pump_state` become booleans in ioBroker.

## Energy Butler fields

| Field | Meaning | Unit |
|---|---|---|
| `battery_soc_percent` | Battery state of charge | % |
| `battery_charge_power_w` | Charging power | W, ≥ 0 |
| `battery_discharge_power_w` | Discharging power | W, ≥ 0 |
| `battery_power_signed_w` | Battery power, + discharging, − charging | W |
| `battery_charge_discharge_status_code` | Battery mode: 0 discharging, 1 charging | code |
| `grid_import_power_w` | Grid import | W, ≥ 0 |
| `grid_export_power_w` | Grid export (feed-in) | W, ≥ 0 |
| `grid_total_power_signed_w` | Grid power, − import, + export | W |
| `grid_phase_a_power_signed_w` | Grid power phase A, − import, + export | W |
| `grid_phase_b_power_signed_w` | Grid power phase B, − import, + export | W |
| `grid_phase_c_power_signed_w` | Grid power phase C, − import, + export | W |
| `pv_total_power_w` | PV total power | W |
| `pv1_power_w` | PV input 1 | W |
| `pv2_power_w` | PV input 2 | W |
| `inverter_ac_power_signed_w` | Inverter AC power | W |
| `inverter_operating_status_code` | Inverter status, see below | code |

Inverter status: 0 waiting · 1 self-check · 2 on-grid · 3 fault · 4 firmware update · 5 off-grid

The analysis (`analysis.*`) uses `pv_total_power_w`, `grid_import_power_w`, `grid_export_power_w`, `battery_charge_power_w`, `battery_discharge_power_w` and `battery_soc_percent`. Without these fields there is no house consumption, cost or daily value. Send import/export and charging/discharging as separate fields without sign.

## Examples

With `mosquitto_pub`:

```bash
mosquitto_pub -h <broker> -t energy/butler/telemetry \
  -m '{"fields":{"battery_soc_percent":81,"pv_total_power_w":2300,"grid_import_power_w":0,"grid_export_power_w":450,"battery_charge_power_w":1200,"battery_discharge_power_w":0},"timestamp":1791956345000}'
```

In a Node-RED function node in front of an MQTT out node (topic `energy/butler/telemetry`):

```js
msg.payload = {
    fields: {
        battery_soc_percent: flow.get('soc'),
        pv_total_power_w: flow.get('pv'),
    },
    timestamp: Date.now(), // better: the time the values were read
};
return msg;
```

## Checking a broker

`tools/mqtt-check.mjs` listens for a few seconds on the default topics and compares the fields with the definitions above:

```bash
node tools/mqtt-check.mjs --host <broker> --user <user>
```