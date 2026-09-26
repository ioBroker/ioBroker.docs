---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-energy/README.md":{"title":{"en":"Vis 2 Energy widgets"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md":{"title":{"en":"Energy widgets for vis-2"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md":{"title":{"en":"Distribution"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md":{"title":{"en":"Consumption"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md":{"title":{"en":"Consumption comparison"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md":{"title":{"en":"Interval selector"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md":{"title":{"en":"Self-sufficiency"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md":{"title":{"en":"Battery storage"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md":{"title":{"en":"Energy costs"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md":{"title":{"en":"Dynamic electricity price"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md"}}}
---
# Interval selector

![Time selector](../../img/timeSelector.png)

Day / week / month / year, two arrows to step through the periods and a **Now** button that jumps back to the
running one. Other widgets follow this selector.

## How other widgets find it

Select this widget in the attribute *Widget for time interval selection* of a
[Consumption](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md) or [Energy costs](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md) widget. Several widgets can follow the same
selector, and the selector may sit in any position of the same view.

Technically the selector publishes itself through the DOM and the consumers subscribe to it. Because the order
in which widgets mount is not fixed, a consumer keeps looking for the selector until it finds it and
re-subscribes when the selector is moved or re-created. Nothing has to be configured for that.

Additionally, and independently of that, the selector writes the period into the **view**: every widget of the
view that does not name a selector of its own follows it as well.

## Configuration

### Common

| Field                | Meaning                                                                                 |
| -------------------- | ---------------------------------------------------------------------------------------- |
| Without frame / Name | Card and title                                                                            |
| Time start OID       | Optional. The chosen start of the period is written here, as a timestamp.                 |
| Time interval OID    | Optional. The chosen length is written here: `day`, `week`, `month` or `year`.             |

The two object IDs are for scripts and for other views: as soon as one is set, the selector reads and writes
that data point instead of keeping the value for itself, and a script can move the whole dashboard by writing
into it.

### Appearance

| Field             | Meaning                                                                             |
| ----------------- | ------------------------------------------------------------------------------------ |
| Offer day / week / month / year | Which buttons the selector has. If none is selected, all four are shown. |
| Hide "Now" button | Hides the button that jumps back to the running period                               |
| Date format       | `24.09.2026`, `09/24/2026`, `2026-09-24` or the language of the user                 |

## Weeks start on Monday

A week runs from Monday to Sunday. Sunday belongs to the week that is ending, not to the one that starts the
next day.

## Recipe: one selector for a whole dashboard

1. Place the selector at the top of the view, *Without frame* on, height around 60 px.
2. Switch *Offer year* off if a year view is not interesting for you.
3. In every chart below it, select the selector in *Widget for time interval selection*.

## Troubleshooting

- **A chart does not follow the selector.** Check *Widget for time interval selection* in the chart. A chart
  that names no selector follows the period of the view — which the selector also sets, but only for the view
  it is in.
- **The arrow to the right is greyed out.** You are in the running period; there is nothing after it.
- **The selector jumps back on its own.** Switching the period always jumps to the running one, so that a
  "week" that was chosen while looking at a day in the past does not land in an empty window.