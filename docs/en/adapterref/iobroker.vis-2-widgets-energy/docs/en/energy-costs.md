---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-energy/README.md":{"title":{"en":"Vis 2 Energy widgets"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md":{"title":{"en":"Energy widgets for vis-2"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md":{"title":{"en":"Distribution"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md":{"title":{"en":"Consumption"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md":{"title":{"en":"Consumption comparison"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md":{"title":{"en":"Interval selector"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md":{"title":{"en":"Self-sufficiency"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md":{"title":{"en":"Battery storage"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md":{"title":{"en":"Energy costs"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md":{"title":{"en":"Dynamic electricity price"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md"}}}
---
# Energy costs

![Energy costs](../../img/energyCosts.png)

What the energy of the shown period costs: consumption × price, plus the share of the monthly base fee, minus
the feed-in revenue. The result is one large number, with the breakdown under it.

## Where the energy comes from

The attribute **Where the energy comes from** decides that, and it is the one setting to get right:

### Value of the data point

The number in the data point is used as it is. The data point itself has to hold the amount of the shown
period — a "consumption today" from the `statistics` adapter, for example.

The period selector then only *labels* the result and decides how the monthly base fee is spread. It does not
change the energy. Showing "year" with a data point that holds today's consumption gives a wrong number.

### Sum from the history

The widget reads the period from the history instance itself, exactly like the
[Consumption](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md) widget does, and adds the buckets up. Point *Energy OID* at the **meter reading**
and leave *Calculate difference* on; the sum of the differences is the consumption of the period.

This is the mode in which the period selector really works: switching from day to month changes the number.

## Requirements

- For "Sum from the history": a history instance that logs the two meters.
- For "Value of the data point": nothing beyond the data points.
- A period, see [the period](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md#the-period).

## Configuration

### Common

| Field                         | Meaning                                                            |
| ----------------------------- | ------------------------------------------------------------------- |
| Without frame / Name          | Card and title                                                       |
| Where the energy comes from   | See above                                                            |
| Currency                      | Written after every amount, e.g. `€`                                 |
| Energy unit                   | Unit of the energy. The price is a price *per this unit*.            |
| Decimals / Energy decimals    | Decimals of the amounts and of the energy                            |
| Show breakdown                | The table under the big number                                       |
| Show energy too               | Adds the kWh the amounts were calculated from to that table          |
| Cost color / Credit color     | Color of the big number when paying / when receiving                 |

### Consumption

| Field            | Meaning                                                                        |
| ---------------- | ------------------------------------------------------------------------------- |
| Energy OID       | The consumed energy, or the meter reading in history mode                        |
| Multiplier       | Scaling, e.g. `0.001` for Wh → kWh                                               |
| Price            | Price per energy unit, e.g. `0.30`                                               |
| Price OID        | A data point with the current price, for a dynamic tariff. It wins over *Price*. |
| Monthly base fee | Fixed amount per month, spread over the shown period                             |

### Feed-in

| Field                 | Meaning                                                    |
| --------------------- | ----------------------------------------------------------- |
| Feed-in OID           | Energy fed into the grid. Leave empty if there is none.      |
| Multiplier            | Scaling                                                     |
| Feed-in tariff        | What one unit is paid with, e.g. `0.08`                     |
| Feed-in tariff OID    | …or from a data point. It wins over the fixed value.         |

### Period

| Field                              | Meaning                                                       |
| ---------------------------------- | -------------------------------------------------------------- |
| Widget for time interval selection | The [Interval selector](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md) to follow         |
| Start OID / Interval OID           | Period from two data points instead                             |
| Aggregate                          | Only in history mode, see [Consumption](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md)         |
| Calculate difference               | Only in history mode. On for meter readings.                    |

## The base fee

The base fee is entered **per month** and spread over the shown period: a day gets a thirtieth of it (exactly:
one divided by the number of days of that month), a week seven of those days, a month all of it and a year
twelve times it.

## The balance

```
balance = consumption × price + share of the base fee − feed-in × feed-in tariff
```

A positive balance is shown as **Costs** in the cost color, a negative one as **Credit** in the credit color.

## Recipe: the costs of the current month

1. *Where the energy comes from* = `Sum from the history`, *Calculate difference* on.
2. *Energy OID* = the meter reading of the house, *Feed-in OID* = the feed-in meter.
3. *Price* = `0.32`, *Feed-in tariff* = `0.082`, *Monthly base fee* = `12.90`.
4. Follow an [Interval selector](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md) and switch it to "month".

## Recipe: a dynamic tariff

Point *Price OID* at the current price of your tariff adapter (tibberlink, awattar, …) and pair the widget with
the [Dynamic electricity price](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md) chart. Note that the costs are then calculated with the price
of *this moment* over the whole period — exact hour-by-hour billing is a job for the tariff adapter itself.

## Troubleshooting

- **The number does not change when I switch the period.** You are in "Value of the data point" mode, where the
  period only labels the result. Switch to "Sum from the history".
- **The costs are far too high in history mode.** *Calculate difference* is off although the data point is a
  meter reading, so meter readings were summed instead of consumptions.
- **Nothing is shown at all.** The history instance does not log that data point, or *Energy OID* is not set.
- **The base fee looks wrong.** It is per month, not per period. A day intentionally shows only a thirtieth.