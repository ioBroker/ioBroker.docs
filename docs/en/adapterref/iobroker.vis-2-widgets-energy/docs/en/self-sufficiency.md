---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-energy/README.md":{"title":{"en":"Vis 2 Energy widgets"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md":{"title":{"en":"Energy widgets for vis-2"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md":{"title":{"en":"Distribution"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md":{"title":{"en":"Consumption"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md":{"title":{"en":"Consumption comparison"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md":{"title":{"en":"Interval selector"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md":{"title":{"en":"Self-sufficiency"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md":{"title":{"en":"Battery storage"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md":{"title":{"en":"Energy costs"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md":{"title":{"en":"Dynamic electricity price"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md"}}}
---
# Self-sufficiency

![Self-sufficiency](../../img/selfSufficiency.png)

Two ring gauges that answer the two questions every PV owner asks:

- **Self-sufficiency** — how much of what the house used did *not* come from the grid.
- **Self-consumption** — how much of what the PV produced was used at home instead of being sold.

Both are ratios, so they work with power (a live picture) as well as with energy counters of a period — as
long as all inputs use the **same unit**.

## The formulas

```
house consumption = production − feed-in + grid import      (unless its own data point is set)
self-consumed     = production − feed-in
self-sufficiency  = (house consumption − grid import) / house consumption
self-consumption  = self-consumed / production
```

Both results are clamped to 0…100 %, and a ring shows `--` while its denominator is 0 (no production at night,
for example).

## Requirements

Live values only. At minimum the production and the grid; the house consumption then follows from the balance.

All data points have to be in the same unit: do not mix a PV inverter in W with a meter in kW. Use the
**multiplier** next to each object ID to bring them together.

## Configuration

### Common

| Field                   | Meaning                                                                    |
| ----------------------- | --------------------------------------------------------------------------- |
| Without frame / Name    | Card and title                                                               |
| Show                    | Both rings, only self-sufficiency or only self-consumption                   |
| Show values             | Lists production, house consumption, grid import and export under the rings  |
| Unit                    | Written after those listed values, e.g. `W` or `kWh`                         |
| Decimals                | Decimals of the percentages and of the listed values                         |
| Ring thickness          | Width of the ring in pixels                                                  |
| Self-sufficiency color  | Filled part of the left ring                                                 |
| Self-consumption color  | Filled part of the right ring                                                |
| Track color             | The empty part of the ring. Empty follows the theme.                         |

### Data sources

| Field                       | Meaning                                                                          |
| --------------------------- | --------------------------------------------------------------------------------- |
| Production OID              | What the PV system produces                                                        |
| One data point for the grid | The meter delivers one signed value for both directions                            |
| Grid OID                    | That signed value: positive is taken from the grid, negative is fed into it        |
| Grid import OID             | What is taken from the grid (when the meter separates the directions)              |
| Grid export OID             | What is fed into the grid                                                          |
| House consumption OID       | Optional. Without it the consumption is calculated from the other three.           |
| Multiplier (three of them)  | One for the production, one for the grid, one for the house consumption            |

## Recipe: a live picture in W

1. *Production OID* = the AC power of the inverter.
2. *One data point for the grid* on, *Grid OID* = the power of the grid meter (positive = taken from the grid).
3. Leave *House consumption OID* empty — it follows from the balance.
4. *Show values* on, *Unit* = `W`.

## Recipe: the quota of a day

Use daily energy counters instead: production of the day, grid import of the day, feed-in of the day. The two
rings then show the quota of that day rather than of this second. Everything in kWh, all multipliers at `1`.

## Troubleshooting

- **A ring shows `--`.** Its denominator is 0. Self-consumption needs production greater than 0, and
  self-sufficiency needs a house consumption greater than 0.
- **Self-sufficiency is always 100 %.** The grid import is not configured or is 0. With one signed grid data
  point, check whether your meter really uses positive for "taken from the grid" — if it is the other way
  round, use the two separate object IDs instead.
- **The numbers do not fit together.** One input is in a different unit. Check the three multipliers.