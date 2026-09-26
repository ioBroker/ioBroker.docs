---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-energy/README.md":{"title":{"en":"Vis 2 Energy widgets"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md":{"title":{"en":"Energy widgets for vis-2"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md":{"title":{"en":"Distribution"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md":{"title":{"en":"Consumption"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md":{"title":{"en":"Consumption comparison"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md":{"title":{"en":"Interval selector"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md":{"title":{"en":"Self-sufficiency"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md":{"title":{"en":"Battery storage"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md":{"title":{"en":"Energy costs"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md":{"title":{"en":"Dynamic electricity price"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md"}}}
---
# Battery storage

![Battery storage](../../img/battery.png)

A battery symbol filled according to the state of charge, with the charging or discharging power, an estimate
of how long that will last and the stored energy.

## Requirements

Live values only. The state of charge is enough for the symbol; power and capacity add the rest.

## Configuration

### Common

| Field                | Meaning                                               |
| -------------------- | ------------------------------------------------------ |
| Without frame / Name | Card and title                                         |
| Orientation          | The symbol standing upright or lying on its side        |
| Show power           | The line with the arrow under the percentage            |
| Show remaining time  | "Full in" / "Empty in". Needs the capacity.             |
| Decimals             | Decimals of the percentage and of the power             |

### Values

| Field                        | Meaning                                                                       |
| ---------------------------- | ------------------------------------------------------------------------------ |
| State of charge OID          | The SoC in percent                                                             |
| Multiplier                   | `100` if the data point delivers 0 … 1 instead of 0 … 100                      |
| Separate charge and discharge | The inverter has one data point per direction instead of one signed value     |
| Battery power OID            | The signed power                                                               |
| A positive value means       | Charging or discharging — inverters disagree about this                        |
| Charging power OID           | Greater than zero while the battery is being charged                           |
| Discharging power OID        | Greater than zero while the battery is being discharged                        |
| Multiplier                   | Scaling of the power                                                           |
| Power unit                   | Usually `W` or `kW`                                                            |
| Capacity                     | Usable capacity as a fixed number                                              |
| Capacity OID                 | …or from a data point, if the inverter reports it. It wins over the number.     |
| Capacity unit                | Usually `kWh`                                                                  |

### Colors

| Field                            | Meaning                                                             |
| -------------------------------- | -------------------------------------------------------------------- |
| Color by level                   | Change the color at the two thresholds instead of using one color     |
| Low threshold / Medium threshold | In percent                                                            |
| Low / Medium / High color        | Up to the low threshold, up to the medium one, above it               |
| Fill color                       | The single color, when *Color by level* is off                        |

## The remaining time

```
charging:    (100 % − SoC) × capacity / |power|
discharging:          SoC  × capacity / |power|
```

The capacity is an energy (kWh) and the power a power (W or kW), so the two have to meet: a *Power unit* of
`W` is divided by 1000 before the division, every other unit is used as it is. So with a capacity in kWh set
the power unit to `W` or `kW` — anything else gives a wrong estimate.

The number is a snapshot at the current power, not a forecast: it changes as soon as the load changes.

## Recipe: a 10 kWh storage on a hybrid inverter

1. *State of charge OID* = the SoC data point, *Multiplier* = `1`.
2. *Battery power OID* = the battery power, *A positive value means* = `Charging` (try `Discharging` if the
   arrow points the wrong way), *Power unit* = `W`.
3. *Capacity* = `10`, *Capacity unit* = `kWh`.
4. *Color by level* on with the defaults: red up to 20 %, orange up to 50 %, green above.

## Troubleshooting

- **The arrow points the wrong way.** Switch *A positive value means* to the other option, or swap the two
  object IDs in separate mode.
- **No remaining time is shown.** The capacity is missing, or the power is exactly 0 — there is nothing to
  estimate while the battery rests.
- **The remaining time is 1000× off.** *Power unit* and *Capacity unit* do not match. With a capacity in kWh
  the power unit has to be `W` or `kW`.
- **The bar is always full.** The SoC data point delivers 0 … 1. Set *Multiplier* to `100`.