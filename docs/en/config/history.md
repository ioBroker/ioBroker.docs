---
title: Data recording
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/config/history.md
hash: kqWV9mVXBPl+H6No7tIpTZOhJTNCyrUyu7tF8waEmaI=
---
# Data recording

A data point only knows its current value. Anyone wanting to know how warm it was last night or how much electricity was consumed last week needs an adapter that records data. Three are available, and the decision should be made early because switching later requires extra work.

?> Not to be confused with the two **internal** Databases for objects and states. These maintain the current state of the system and are located under
[Redis](/docs/config/redis.md) This is about the course of events.

## Which adapter

| adapter      | Put it down                          | It fits if                                                                            |
| ------------ | ------------------------------------ | ------------------------------------------------------------------------------------- |
| **history**  | Files in the ioBroker data directory | Few data points, manageable time periods, no additional service desired               |
| **influxdb** | InfluxDB, a time series database     | Many data points over years. The usual approach for established systems.              |
| **sql**      | MySQL, PostgreSQL, MS-SQL or SQLite  | Such a database already exists, or the data is intended to be read by other programs. |

**history** It stores data in two stages: the values are first stored in RAM and only written to files when a predefined threshold is reached. This protects the card, but also means that the most recently collected values are lost in the event of a hard power outage.

The files are located in a folder below `/opt/iobroker/iobroker-data`, without providing their own information in `history`, and within that, one subfolder for each day. An absolute path like `/mnt/history` This is also possible, for example, on an attached storage device. The location of the data is important for backup purposes; see below.

For starters **history**He doesn't need a second service, and switching to InfluxDB is possible later, see below.

Recording means writing, and writing uses up an SD card. Anyone who regularly records large amounts of data should not do so on an SD card, but rather on an SSD or in a database on another computer.

## Turn on

The adapter is installed, an instance is created, and then... **per data point** It was decided whether it would be recorded. This happens in the rider.
[objects](/docs/admin/objects.md) via the gear at the end of the line.

The instance configuration contains the default settings that apply to each newly activated data point. These settings can be overridden at the data point itself.

The recording is being recorded **from the moment it is switched on**There is no retroactive effect.

How this works step by step is explained below
[Record values](/docs/tutorial/history.md).

## The settings that matter

| Attitude                | Effect                                                                                                              |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Record only changes** | Almost always correct. Otherwise, data would be generated even when nothing is happening.                           |
| **Minimal deviation**   | Only when this difference is reached does the data start being recorded. This eliminates the noise from the sensor. |
| **Debounce time**       | Locks shortly after a write operation. Helps with values that fluctuate every second.                               |
| **storage**             | How long the values will be retained. Without a limit, the storage capacity grows indefinitely.                     |

The complete description of all fields can be found in the documentation of the respective adapter:
[history](/adapters/history),
[influxdb](/adapters/influxdb),
[sql](/adapters/sql).

## What should be recorded and what shouldn't

The most common reason for a system becoming sluggish after a year is not insufficient computing power, but that someone has written everything down because they might need it someday.

- **Sensible**Temperatures, consumption levels, fill levels, switching states, where you later want to be able to read when something happened.
- **Not useful**Internal data points of the adapters, counters that already contain a history, and everything you will never look at.

## Switching from the history adapter to a database

The history adapter includes scripts for this purpose, which are located in the directory
`/opt/iobroker/node_modules/iobroker.history/converter` lie and with `node`
to be called up. The recommended procedure:

**1. Set up the new goal and let it run.** Configure the new adapter and enable the same data points there. Verify that the values are being received. During this time, data is written twice: once to the history and once to the new target. This is intentional and the reason why nothing is lost during the migration.

**2. Analyze the existing inventory.** The analysis script determines which data is already present in the target and saves the results in JSON files. It is called in the converter directory.

```bash
cd /opt/iobroker/node_modules/iobroker.history/converter
node analyzeinflux.js influxdb.0 info --deepAnalyze
```

For an SQL database, accordingly:

```bash
node analyzesql.js sql.0 info
```

The first parameter is the target instance, the second is the protocol level.
`--deepAnalyze` Additionally, it records which values already exist for each day. Without this information, only the earliest value is determined. The difference is relevant if there are already gaps in the target data that need to be filled.

**3. Stop and convert the history adapter.**

```bash
node history2db.js
```

The script reads the JSON files from step 2 and only transfers what is not already present. It then continues writing the files, so a second run usually doesn't create duplicates. It can also be called without prior analysis; in this case, a start date must be specified as a parameter, and everything before that date will be converted. This process can take a long time.

**4. Only clean up after that.** If the values in the target are complete and the logs confirm this: delete the history data and deactivate the adapter.

!> Before the migration a [Backup](/docs/config/backup.md) Create a new database. Only delete the old data once the new data is demonstrably complete, and to verify this, check a diagram that goes back a long way by taking random samples.

The complete parameter list for the three scripts is available in the
[History adapter documentation](/adapters/history).

## What happens during a fuse

Here's a common misconception that can be costly: **An ioBroker backup does not contain the recorded values.** It saves objects, states, and file storage—that is, the current state of the system. History is stored elsewhere, and this applies to all three adapters.

- At **history** The files are located below `iobroker-data`However, these are not part of the ioBroker backup. With an absolute path, they are located outside the backup anyway.
- At **influxdb** and **sql** The data is stored in a separate database, often even on a different computer.

[BackItUp](/docs/config/backup.md) Therefore, it is listed as **custom backup types**, which are created in addition to the ioBroker backup: _History Data_, _InfluxDB_,
_MySQL_, _PostgreSQL_ and _SQLite&#x33;_&#x54;hese switches are factory-installed. **not**
set.

Anyone recording data must also activate the appropriate switch on the backup adapter. Otherwise, after a restore, a fully configured system will be present in which all diagrams are empty.

## View

Recorded values are evaluated as a diagram, usually with
`echarts`The route there is described below.
[Diagrams](/docs/tutorial/flot.md).