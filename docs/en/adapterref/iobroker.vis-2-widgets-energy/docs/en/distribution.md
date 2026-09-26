---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-energy/README.md":{"title":{"en":"Vis 2 Energy widgets"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md":{"title":{"en":"Energy widgets for vis-2"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md":{"title":{"en":"Distribution"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md":{"title":{"en":"Consumption"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md":{"title":{"en":"Consumption comparison"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md":{"title":{"en":"Interval selector"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md":{"title":{"en":"Self-sufficiency"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md":{"title":{"en":"Battery storage"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md":{"title":{"en":"Energy costs"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md":{"title":{"en":"Dynamic electricity price"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md"}}}
---
# Distribution

![Energy distribution](../../img/distribution.png)

An animated flow diagram. The house sits in the middle, the grid connection and up to ten further nodes (PV,
battery, wallbox, heat pump, pool, …) are arranged in a circle around it. A dot travels along every connection
line; its direction shows where the energy flows and its speed follows the value.

The ring around the house is split into segments, one per node, sized by that node's share of the total.

## Requirements

Live values only, no history instance. One data point per node, plus one for the house and one for the grid.

## Configuration

### Common

| Field                   | Meaning                                                                                                  |
| ----------------------- | -------------------------------------------------------------------------------------------------------- |
| Without frame           | Draw without the card                                                                                      |
| Name                    | Title in the header of the card                                                                            |
| Default color           | Color of lines and circles that have no own color                                                          |
| Default circle size     | In percent of the widget width                                                                             |
| Default distance size   | Distance between the house and the nodes, in percent of the widget width                                   |
| Default font size       | In pixels. A node with its own font size wins over this one.                                               |
| Default radius size     | Radius used by circles that have no own size, in percent of the widget width                               |
| Nodes count             | How many nodes are drawn, in addition to the grid                                                          |
| Line width              | Thickness of the circles and of the segments of the house ring, in pixels                                  |
| No animation            | Stops the moving dots. Useful on weak tablets.                                                             |
| Show values unchanged   | Switches off the automatic conversion, see [Units](#units)                                                 |

### Home circle

| Field                                | Meaning                                                                    |
| ------------------------------------ | -------------------------------------------------------------------------- |
| Home OID                             | The consumption of the house. Name and color are filled in automatically.   |
| Home name                            | Label under the middle circle                                               |
| Home color / Text color              | Color of the circle and of its label                                        |
| Standard icon / Custom icon          | Icon inside the circle. An own image replaces the standard one.             |
| Home circle size / distance / font size | Override the defaults for this circle                                    |
| Icon size                            | In percent of the circle size                                               |
| Units                                | Leave empty to use the unit of the data point                               |
| Multiplier / Round                   | Scaling and decimals                                                        |

### Power line circle

Everything of the home circle, plus:

| Field                 | Meaning                                                                                        |
| --------------------- | ----------------------------------------------------------------------------------------------- |
| Power line OID        | Power taken from the grid. A **negative** value means that energy is fed into the grid.           |
| Power line return OID | Separate data point for the feed-in, if the meter reports the two directions separately           |
| Return energy color   | Color of the feed-in value inside the circle                                                      |
| Hide if less than     | Fades the circle out below this value. Empty always shows it. In the editor it stays visible.     |
| Invert direction      | Turns the direction of the moving dot around                                                      |
| Motion speed          | The larger the number, the slower the dot moves at the same value                                 |

### Node 1 … n

The same fields as the power line, plus:

| Field        | Meaning                                                                             |
| ------------ | ------------------------------------------------------------------------------------ |
| OID 2        | A second value inside the circle, e.g. the state of charge of a battery in percent     |
| OID 2 unit   | Leave empty to use the unit of that data point                                          |

## Units

A data point whose unit is `Wh` is divided by 1000 and shown as `kWh`, and a value without any unit gets `kWh`
written after it. That is historic behaviour, kept so that existing views do not change. Switch **Show values
unchanged** on to get the value and the unit of the data point exactly as they are.

> Up to version 2.0.1 the value was divided but the unit stayed `Wh`, so 1500 Wh appeared as "1.5 Wh". The unit
> is corrected together with the value now.

## Direction of the dot

By default a **positive** value flows towards the house and a negative one away from it. That fits a grid meter
(positive = taken from the grid) and a PV inverter (positive = producing). For a data point that counts the
other way round — a battery that reports discharging as negative, for instance — switch **Invert direction** on
for that node.

## Recipe: grid, PV, battery and wallbox

1. *Nodes count* = 3.
2. *Power line OID* = the grid meter. Set *Power line return OID* only if feed-in has its own data point.
3. Node 1: the PV production. Standard icon "Solar power".
4. Node 2: the battery power. *OID 2* = the state of charge, *OID 2 unit* = `%`. Switch *Invert direction* on
   if your inverter reports charging as negative.
5. Node 3: the wallbox. *Hide if less than* = `50` so the circle fades out while no car is charging.

## Troubleshooting

- **Nothing moves.** The dot is only drawn while the value is not 0. Check *No animation* as well.
- **A circle is missing.** *Hide if less than* is above the current value. In the editor hidden circles stay
  visible so that they can still be configured.
- **All values are 1000× too large.** Set *Multiplier* to `0.001`, or switch *Show values unchanged* off if the
  data point really is in Wh.
- **The label of a node is cut off.** Reduce *Default font size* or give the node more room with
  *Distance size*.