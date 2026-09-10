---
---
![Logo](../../admin/statistics.png)

# ioBroker.statistics

This adapter will make the configuration of statistics easier.

**The adapter only reacts on state changes (state.ack = true), not on commands!**

Choose from the following settings:

* count impulses or on/off changes (Only for binary values and positive edge)
* calculate costs from the counted values (Only for binary values)
* how long was status true/ON and how long false/OFF (Only for binary values)
* delta between logged analogue values (Only for analog values)
* daily max, min and average (Not for delta calculations)
* min/max over the year
* counts within 5 min and daily max, min and average of it (Not for delta calculations)
* sum up of grouped values

The adapter subscribes to the configured objects and creates his own states in the statistics tree.

2 separate trees are created:
* `statistics.0.save` -> final values of the time frame
* `statistics.0.temp` -> temporary values up to the moment of transfer to save, then temp starts again

The structure of the state is: `statistics.0.{save|temp}.{kind of stat}.{original observed state}.{state of statistical value}`

## Settings

* specify the relevant groups in the instance configuration page (admin => instances => statistics config)
* specify the configuration in the settings of the state (admin => objects)