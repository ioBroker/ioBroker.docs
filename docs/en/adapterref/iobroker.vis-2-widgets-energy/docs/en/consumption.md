---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-energy/README.md":{"title":{"en":"Vis 2 Energy widgets"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md":{"title":{"en":"Energy widgets for vis-2"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md":{"title":{"en":"Distribution"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md":{"title":{"en":"Consumption"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md":{"title":{"en":"Consumption comparison"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md":{"title":{"en":"Interval selector"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md":{"title":{"en":"Self-sufficiency"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md":{"title":{"en":"Battery storage"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md":{"title":{"en":"Energy costs"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md":{"title":{"en":"Dynamic electricity price"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md"}}}
---
# Consumption

![Energy consumption](../../img/consumption.png)

One bar (or line) per hour, day, weekday or month of the selected period, for up to n data points at once. The
data comes from a history instance, so this is the only widget of the set that needs one.

## Requirements

- A **history instance** (`history`, `sql`, `influxdb`). The widget uses the default history instance from the
  ioBroker system settings.
- The data points have to be **logged** by that instance — switch logging on in the object's settings.
- A period, see [the period](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md#the-period).

## How a period becomes bars

| Period | Bars                       | Label   |
| ------ | -------------------------- | ------- |
| Day    | 24, one per hour            | `HH:00` |
| Week   | 7, one per day              | `Mon` … |
| Month  | 28–31, one per day          | `DD.MM` |
| Year   | 12, one per month           | `Jan` … |

The history instance is asked for exactly that many aggregated values. What it puts into one bar is decided by
*Aggregate*.

## Counter or consumption?

Most energy data points in ioBroker are **counters**: a number that only grows, e.g. `1234.5 kWh` total since
installation. A chart of that is a staircase, not a consumption.

Switch **Calculate difference** on for those. The widget then reads one extra bucket in front of the period and
shows the difference between two consecutive readings — which is the consumption of that hour or day. Use it
together with *Aggregate* = `max`.

Leave it off if the data point already holds the consumption of a period (for example something the
`statistics` adapter produced).

## Configuration

### Common

| Field                            | Meaning                                                                     |
| -------------------------------- | ---------------------------------------------------------------------------- |
| Without frame / Name             | Card and title                                                                |
| Chart type                       | Bars, lines or filled lines                                                   |
| Stacked bars                     | Stack the series instead of drawing them next to each other                   |
| Show legend                      | The names of the series above the chart                                       |
| Show toolbox                     | The small icons that switch stacking and open the data table                  |
| Decimals                         | Decimals in the tooltip                                                       |
| Devices count                    | How many data points are drawn                                                |
| Widget for time interval selection | The [Interval selector](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md) this chart follows            |
| Start OID / Interval OID         | Period from two data points, if no selector widget is used                    |

### Aggregation

| Field                  | Meaning                                                                                       |
| ---------------------- | ----------------------------------------------------------------------------------------------- |
| Aggregate              | How the history instance condenses one bar: `max`, `min`, `average`, `total`, `integral`, …       |
| Calculate difference   | See [above](#counter-or-consumption). Only offered for `max`, `min`, `average`, `none`, `integral` |
| Percentile / Quantile  | Parameter of the matching aggregation                                                             |
| Integral unit          | Time unit of the integral in seconds, e.g. `3600` for one hour                                    |
| Integral interpolation | How the gaps between two samples are filled while integrating                                     |

### Value 1 … n

| Field      | Meaning                                                                                   |
| ---------- | ------------------------------------------------------------------------------------------ |
| OID        | The logged data point. Name, color and unit are filled in from the object.                  |
| Name       | Shown in the legend and in the tooltip                                                      |
| Color      | Color of the series                                                                         |
| Unit       | Shown in the tooltip; the first configured unit also labels the y-axis                      |
| Multiplier | Scaling, e.g. `0.001` to turn Wh into kWh                                                   |

## Recipe: household, heat pump and wallbox per day

1. *Devices count* = 3, *Stacked bars* on.
2. *Aggregate* = `max`, *Calculate difference* on — all three are meter readings.
3. Value 1 = the household meter, Value 2 = the heat pump meter, Value 3 = the wallbox meter.
4. Place an [Interval selector](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md) above it and select it in *Widget for time interval
   selection*.

## Troubleshooting

- **The chart stays empty.** The history instance is not logging that data point, or there is no default
  history instance in the system settings. The widget waits 10 s for an answer and then shows nothing — a
  missing history instance never replies at all.
- **A staircase instead of a consumption.** Switch *Calculate difference* on.
- **One bar is far too large.** The counter was reset, so the difference to the previous reading is huge. The
  widget clamps a negative difference to 0, but a reset that goes back to a lower value still produces one
  wrong bar in the bucket after it.
- **The current hour is missing.** That was a bug up to 2.0.1: the last bucket of the period was dropped in
  difference mode. Fixed.
- **February had 31 bars.** Also fixed — the month length was taken from the previous month.