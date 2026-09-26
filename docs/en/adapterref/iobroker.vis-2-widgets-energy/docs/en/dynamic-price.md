---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-energy/README.md":{"title":{"en":"Vis 2 Energy widgets"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md":{"title":{"en":"Energy widgets for vis-2"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md":{"title":{"en":"Distribution"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md":{"title":{"en":"Consumption"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md":{"title":{"en":"Consumption comparison"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md":{"title":{"en":"Interval selector"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md":{"title":{"en":"Self-sufficiency"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md":{"title":{"en":"Battery storage"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md":{"title":{"en":"Energy costs"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md":{"title":{"en":"Dynamic electricity price"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md"}}}
---
# Dynamic electricity price

![Dynamic electricity price](../../img/dynamicPrice.png)

The hourly exchange price as a bar chart. The cheapest hours are green, the most expensive red, the hour that
is running right now is blue, and a dashed line marks the average of the shown hours.

## Requirements

One data point that holds the prices as a **JSON array**. The adapters that deliver exchange prices all do
that, but every one of them names the fields differently — the widget recognizes the usual names on its own:

| Adapter                    | Typical data point                                | Time field  | Price field   |
| -------------------------- | -------------------------------------------------- | ----------- | ------------- |
| `tibberlink`               | `…PricesToday.json`                                 | `startsAt`  | `total`       |
| `awattar`                  | `…prices.json`                                      | `start_timestamp` | `marketprice` |
| `epex-spot`                | `…prices`                                           | `start`     | `price`       |
| `smartenergy`              | `…prices`                                           | `date`      | `value`       |

Accepted are:

- an array of records, e.g. `[{ "startsAt": "2026-09-24T12:00:00+02:00", "total": 0.246 }, …]`,
- an array wrapped in an object, e.g. `{ "prices": [ … ] }` (also `today`, `data`, `values`, `result`),
- a plain array of 24 numbers — then read as the hours of today, starting at midnight.

The time may be an ISO string, a timestamp in milliseconds or one in seconds.

If none of that fits, set **Time field** and **Price field** to the names your adapter uses.

## Configuration

### Common

| Field                | Meaning                                                               |
| -------------------- | ---------------------------------------------------------------------- |
| Without frame / Name | Card and title                                                         |
| Prices OID           | The data point with the JSON array                                     |
| Time field           | Leave empty; the usual names are recognized automatically              |
| Price field          | Leave empty; the usual names are recognized automatically              |
| Multiplier           | `100` turns €/kWh into cents per kWh, `1` leaves the prices as they are |
| Unit                 | Written after every price, e.g. `ct/kWh`                               |
| Decimals             | Decimals of the prices                                                 |
| Number of hours      | How many hours are drawn. `0` shows everything the data point has.     |
| Only from now on     | Leave out the hours that are over                                      |
| Show current price   | The price of the running hour above the chart                          |
| Show average         | The dashed line                                                        |

### Colors

| Field                            | Meaning                                                            |
| -------------------------------- | ------------------------------------------------------------------- |
| Highlighting                     | How cheap and expensive are decided, see below                       |
| Cheapest hours / Most expensive hours | How many hours get the cheap / expensive color (mode "the n …") |
| Tolerance                        | Percent deviation from the average (mode "distance to the average")  |
| Cheap / Normal / Expensive color | The three colors                                                     |
| Current hour color               | The hour that is running. It wins over the highlighting.             |

## The two highlighting modes

**The n cheapest and most expensive** ranks the shown hours and colors the first n and the last n. Use this to
answer "when should the dishwasher run tonight".

**Distance to the average** colors an hour when it is more than *Tolerance* percent below or above the average
of the shown hours. Use this to see how unusual today is.

**None** draws every bar in the normal color; the current hour still stands out.

## Recipe: when to charge the car

1. *Prices OID* = the price array of your tariff adapter, *Multiplier* = `100`, *Unit* = `ct/kWh`.
2. *Only from now on* on, *Number of hours* = `12`.
3. *Highlighting* = `The n cheapest and most expensive`, *Cheapest hours* = `4`, *Most expensive hours* = `0`.

The four green bars are the four cheapest of the next twelve hours.

## Troubleshooting

- **"No prices found."** The data point is empty, is not valid JSON, or the records use field names the widget
  does not know. Look at the value in the object browser and set *Time field* and *Price field*.
- **The prices are a factor of 100 off.** Your adapter delivers €/kWh and you want cents, or the other way
  round. Set *Multiplier*.
- **All bars are grey.** *Highlighting* is `None`, or with "distance to the average" the *Tolerance* is so
  large that no hour reaches it.
- **The chart is empty in the evening.** *Only from now on* leaves the past out, and tomorrow's prices are
  usually published in the early afternoon. When nothing is left the widget falls back to showing everything.
- **The current hour is not highlighted.** The bar is only blue while the running hour is inside the shown
  window — with *Only from now on* it is the first one.