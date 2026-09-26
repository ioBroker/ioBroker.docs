---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-energy/README.md":{"title":{"en":"Vis 2 Energy widgets"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md":{"title":{"en":"Energy widgets for vis-2"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md":{"title":{"en":"Distribution"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md":{"title":{"en":"Consumption"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md":{"title":{"en":"Consumption comparison"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md":{"title":{"en":"Interval selector"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md":{"title":{"en":"Self-sufficiency"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md":{"title":{"en":"Battery storage"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md":{"title":{"en":"Energy costs"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md":{"title":{"en":"Dynamic electricity price"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md"}}}
---
# Consumption comparison

![Energy comparison](../../img/comparison.png)
![Pie chart](../../img/pie.png)

Compares the **current values** of several data points against each other — as a bar chart for a ranking, or as
a pie chart for the shares of a whole. No history instance is needed; the values are read live.

## Configuration

### Common

| Field                 | Meaning                                                             |
| --------------------- | -------------------------------------------------------------------- |
| Without frame / Name  | Card and title                                                        |
| Type                  | Bar chart or pie chart                                                |
| Devices count         | How many data points are compared, at least 2                         |
| Sorting               | As configured, largest first or smallest first                        |
| Decimals              | Decimals of the values in the tooltip and in the labels               |
| No animation          | Draw at once instead of animating                                     |
| Animation duration    | In milliseconds                                                       |

### Bar chart

| Field       | Meaning                                                          |
| ----------- | ----------------------------------------------------------------- |
| Orientation | Horizontal bars (first device at the top) or vertical ones         |
| Show values | Write the value next to each bar                                   |

### Pie chart

| Field            | Meaning                                                                |
| ---------------- | ----------------------------------------------------------------------- |
| Inner radius     | Size of the hole in the middle, in percent. 0 draws a full pie.          |
| Inner title      | Text in the middle, above the inner value                                |
| Inner Object ID  | Data point shown in the middle, e.g. the total                           |
| Inner value unit | Written directly after the inner value                                   |
| Show legend      | Lists the devices with their values under the chart                      |
| Legend height    | How much of the height the legend takes, in percent                      |
| Hide labels      | Do not write the percentages into the segments                           |
| Label precision  | Decimals of those percentages                                            |

### Level 1 … n

| Field      | Meaning                                                                              |
| ---------- | ------------------------------------------------------------------------------------- |
| OID        | The data point. Name and color are filled in from the object.                          |
| Name       | Shown on the axis, in the legend and in the tooltip                                    |
| Color      | Color of the bar or segment                                                            |
| Unit       | Leave empty and the unit of the object is used                                         |
| Multiplier | Scaling, e.g. `0.001` for Wh → kWh                                                     |

## Units

Every device carries its **own** unit — the tooltip, the labels and the legend show the unit of that device, the
x-axis is labelled with the first unit that is configured.

> **Breaking change in 2.0.0:** this widget no longer converts W to Wh or kW to kWh, and no longer divides Wh
> by 1000. It shows the real value with the real unit. If your dashboard suddenly shows values that are 1000×
> larger, set *Multiplier* of that device to `0.001`.
>
> Up to version 2.0.1 the units of the devices were mixed up as soon as more than one unit was in play, because
> the chart draws the devices in reverse order but looked the unit up by the drawing position. Fixed.

## Recipe: where does the electricity go?

1. *Type* = `pie`, *Inner radius* = `55`, *Devices count* = `4`.
2. Level 1 … 4 = the daily consumption of household, heat pump, wallbox and pool.
3. *Inner Object ID* = the total consumption of the day, *Inner title* = `Today`.
4. *Show legend* on so that the absolute values are readable too.

## Troubleshooting

- **A device shows 0.** Its object ID is not set, or the data point has no value yet.
- **The percentages do not add up to 100.** *Label precision* rounds them; the pie itself is exact.
- **Wrong unit on a bar.** Set *Unit* on the device explicitly instead of relying on the object.