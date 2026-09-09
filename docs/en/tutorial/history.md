---
title: Record values
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/tutorial/history.md
hash: Urze3ppH9cFqBswzPo7OxMn4prRaNSJaVYb7Vw2iIFs=
---
# Record values

A data point only knows its own **current** Value. ioBroker only knows how warm it was last night or how much electricity was consumed last week if someone has recorded it. That's exactly what the recording adapters do.

## Which adapter

| adapter      | Where                          | When                                                                     |
| ------------ | ------------------------------ | ------------------------------------------------------------------------ |
| **history**  | In files on the computer       | Few data points, short time periods. A good starting point.              |
| **influxdb** | Into a time series database    | Many data points over years. The usual approach for established systems. |
| **sql**      | In MySQL, PostgreSQL or SQLite | If such a database already exists.                                       |

Start with `history` Switching later is possible, and it's perfectly adequate for the initial diagrams. A comparison of the three adapters, the migration process, and what happens to the data during a backup are explained below.
[Data recording](/docs/config/history.md).

Recording means writing, and writing uses up an SD card. Anyone who wants to continuously record large amounts of data should not do so on an SD card, but rather on an SSD or a database on another computer.

## Furnish

1. The adapter `history` Install and create an instance. Its configuration contains the default settings that will later apply to every new data point.
2. In the rider [objects](/docs/admin/objects.md)
   Find the data point to be recorded.
3. At the end of the line, the gear icon opens the settings for this data point. There, enable the history instance.

Recording begins now. There is no retrospective recording: recording only starts from the moment the device is switched on.

## The settings that matter

| Attitude                                     | What it does                                                                                                       |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **In case of change or within the interval** | "On change" is almost always correct. An interval also generates data even if nothing happens.                     |
| **Minimum change**                           | Only when this deviation is reached does the data start being recorded. This eliminates the noise from the sensor. |
| **Debounce time**                            | Locks shortly after a write operation. Helps with values that fluctuate every second.                              |
| **storage**                                  | How long the values will be retained. Without a limit, the storage capacity grows indefinitely.                    |

Only record what you will actually look at. Recording every data point just because you might need it someday is the most common reason for a system to become slow after a year.

Useful data includes temperatures, consumption, fill levels, and switching states, which you can later use to determine when something happened. Not useful are counters that already contain a history and internal data points of the adapters.

## Check if it works

Wait a while and change the value once. Afterwards, the Objects tab at the data point will show that recording is active, and the history instance will log any errors. If nothing is received, it's worth checking the...
[protocol](/docs/admin/log.md).

## What happens next?

The recorded values are best viewed as a diagram:
[Diagrams](/docs/tutorial/flot.md).