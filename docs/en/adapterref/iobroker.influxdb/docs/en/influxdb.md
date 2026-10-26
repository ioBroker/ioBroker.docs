---
chapters: {"pages":{"en/adapterref/iobroker.influxdb/README.md":{"title":{"en":"ioBroker.influxdb"},"content":"en/adapterref/iobroker.influxdb/README.md"},"en/adapterref/iobroker.influxdb/docs/en/influxdb.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.influxdb/docs/en/influxdb.md"},"en/adapterref/iobroker.influxdb/RetentionPolicies.md":{"title":{"en":"Understanding retention policies"},"content":"en/adapterref/iobroker.influxdb/RetentionPolicies.md"}}}
---
* * *

## <span id="Configuration">Configuration</span>

### <span id="Storage-Settings">DB settings</span>

Enter here the settings that were made when the InfluxDB was set up, so that the ioBroker server gets access to this database. [![](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_influxDB_Konfig.jpg)](../de/img/influxdb_ioBroker_Adapter_influxDB_Konfig.jpg)

#### Host

Hostname or IP of the database server.

#### Port

The port on which the database is reachable on the host.

#### Protocol

Defines whether the database is accessed via plain http or secured https.

#### Login

The owner of the database (user) under whose ID the data is recorded. Only used with InfluxDB 1.x; InfluxDB 2.x and 3.x log in with a token.

#### Password

The password of the given user in the database. For safety, the password has to be entered a second time in the following field. Only used with InfluxDB 1.x.

#### InfluxDB 3.x

Choose "3.x" as the database version, enter host, port (default `8181`), the token and the database name. InfluxDB 3 cannot delete single values or a time range, and it does not report the number of series. In the expert settings, "Wait for the database to store each value" makes single values wait for the write-ahead log (about one second each) instead of being acknowledged at once. Details and all limits: [README, InfluxDB 3.x](/#/adapters/influxdb#influxdb-3x).

#### Round to

The number of decimal places with which numbers are stored.

#### Collect write actions

The value entered here defines how many new values have to be collected before they are written into the database. The higher the value, the less often the database is written to, but the more data is lost if the adapter fails. `0` writes every value into the database immediately. This increases the load on the database and on the adapter.

#### Write interval

If a value is entered here, the collected data is written into the database after the given time in seconds, even if the number of values set in the previous field has not been reached yet.

### <span id="Default_settings_for_states">Default settings for states</span>

These settings define the values that are used as defaults when the logging of a single datapoint is configured. [![](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_influxDB_objects.jpg)](../de/img/influxdb_ioBroker_Adapter_influxDB_objects.jpg)

#### Log changes only

If this checkbox is checked, consecutive values must differ to be recorded. If a sensor sends e.g. the same temperature several times, it is not recorded - only a change creates a new record again.

#### Log same values

If unchanged values should nevertheless be stored from time to time, enter a time span in seconds here that defines how often this happens. Accordingly, `0` means that no repeated value is stored.

#### Minimum difference from last value

If constantly changing values should not all be stored, define a minimum here by which the value has to change before a new value is stored again. This is useful e.g. for power metering plugs, where not every slight change should be logged. Accordingly, `0` means that every value is stored.

#### Store as

If necessary, the data type with which the values are stored can be defined here. This should only be done before logging is activated for the first time.

[![](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_SQL_objects_type.jpg)](../de/img/influxdb_ioBroker_Adapter_SQL_objects_type.jpg) InfluxDB fixes the data type with the first record of a measurement, and it has to stay the same afterwards.

#### Storage retention

Defines how long the values are kept (infinite, 2 years, 1 year, …, 1 day). [![](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_SQL_objects_timerange.jpg)](../de/img/influxdb_ioBroker_Adapter_SQL_objects_timerange.jpg)

#### Debounce time (ms)

Protection against values that change too often. This is the minimum time in milliseconds before a value is written again.

* * *

## <span id="Settings_for_datapoints">Settings for datapoints</span>

The logging of a datapoint is configured in the tab "Objects" at the datapoint itself. [![ioBroker_adapter_History_devices](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_adapter_History_devices.jpg)](../de/img/influxdb_ioBroker_adapter_History_devices.jpg) Click the gear icon in the rightmost column of the desired datapoint. The configuration dialog opens: [![](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_influxDB_objects.jpg)](../de/img/influxdb_ioBroker_Adapter_influxDB_objects.jpg)

### <span id="Enabled">Enabled</span>

Enables the logging of the datapoint. With "log changes only", values are only stored when the value of the datapoint changes, which saves space. It is useful to first filter the datapoints with the filter fields in the table header, e.g. to show only the "STATE" datapoints, and then enable logging for all of them at once: [![Filtern_loggen](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_Filtern_loggen.jpg)](../de/img/influxdb_Filtern_loggen.jpg)

1.  Show the view as a list without grouping
2.  Enter the filter term(s)
3.  Select all filtered datapoints for logging
    1.  The configuration dialog for the logging parameters opens
4.  Enable the logging for all filtered datapoints at once
    1.  Set further parameters like "log changes only" and retention uniformly for all filtered datapoints
5.  Save the changes

### <span id="Custom_tags">Custom tags</span>

Every datapoint can carry additional, static InfluxDB tags. They are entered in the settings of the datapoint under "Custom tags" as a list of name/value pairs and are written with every value of this datapoint - for all InfluxDB versions and independent of the setting "Store metadata information as tags instead of fields".

This allows selecting and grouping the values of different datapoints by their meaning instead of by their IDs, e.g. give all datapoints of the kitchen the tag `room=kitchen` and all temperature sensors the tag `type=temperature`. In Grafana, the values can then be filtered or grouped by these tags:

```
from(bucket: "iobroker")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r._field == "value" and r.type == "temperature")
  |> group(columns: ["room"])
```

Please note:

-   The names `value`, `q`, `ack`, `from` and `time` as well as names starting with `_` are reserved and can not be used. Rows without name or value are ignored; ignored tags are reported as warning in the log.
-   InfluxDB identifies a series by the measurement and all of its tags. Changing the tags of a datapoint therefore starts a new series; the values written before keep their old tags. With InfluxDB 2.x, a `getHistory` over a time range in which the tags changed aggregates each series on its own - such a range can contain two values per interval. Best set the tags before logging starts.
-   Every datapoint is still written into a measurement of its own (its ID or its `Alias-ID`). Using the same `Alias-ID` for several active datapoints is not supported.

The tags can also be set via JavaScript with the `enableHistory` message:

```javascript
sendTo('influxdb.0', 'enableHistory', {
    id: 'hm-rpc.0.ABC123.1.TEMPERATURE',
    options: {
        customTags: [
            { name: 'room', value: 'kitchen' },
            { name: 'type', value: 'temperature' },
        ],
    },
});
```

* * *

## <span id="Statistics">Statistics and cleanup</span>

The tab **Statistics** in the instance configuration lists every datapoint the database contains - with the number of values, the oldest and the newest value, the number of series and a status:

| Status         | Meaning                                                                                         |
|----------------|-------------------------------------------------------------------------------------------------|
| logged         | The object exists and this instance logs it                                                     |
| logging off    | The object still exists, but logging is switched off - its history is still reachable           |
| object deleted | The object was deleted in ioBroker, nobody can reach its history any more                       |

Two things are important about the numbers:

-   **There is no size per datapoint.** InfluxDB does not provide it, neither in 1.x (`SHOW STATS` and `SHOW SHARDS` only know the engine and the shards) nor in 2.x (disk usage is monitored per bucket). The number of **series** is shown instead: it determines the memory needed by the index, and custom tags are the usual way to increase it unintentionally.
-   **Counting is a full scan.** InfluxDB has no row count it could look up, so the values of the examined time range are actually read. For a database with data of several years this takes a while - the time range selection above the table limits the scan if the total is not needed.

The cleanup removes the stored values of datapoints that nobody logs any more. **Nothing is deleted without confirmation**: the dialog first shows what a confirmed run would remove. By default, only objects that no longer exist in ioBroker are selected. Datapoints whose logging is merely switched off are only included if you explicitly check that - their history is still reachable and often wanted. A datapoint that is currently logged is never selected. In the dialog all found datapoints are preselected; use the checkboxes to deselect the ones you want to keep. Only the selected datapoints are deleted.

The same data is also available via JavaScript with the messages `getDpStatistics` and `cleanupOrphaned`, see [README](/#/adapters/influxdb#statistics-and-cleanup).

* * *

## <span id="Usage">**Usage**</span>

If "with" or `influxdb.0` is selected under history in the title row, only datapoints with logging are shown. [![](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_SQL_objects_filter.jpg)](../de/img/influxdb_ioBroker_Adapter_SQL_objects_filter.jpg) A click on the gear icon opens the logged data: [![](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_SQL_objects_Data.jpg)](../de/img/influxdb_ioBroker_Adapter_SQL_objects_Data.jpg) The tab "Table" shows the data as a table. [![ioBroker_Adapter_rickshaw03](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_rickshaw03.jpg)](../de/img/influxdb_ioBroker_Adapter_rickshaw03.jpg) If the Rickshaw adapter is installed, the tab "Chart" shows a history chart.

* * *

## <span id="Docker">InfluxDB and Grafana in Docker</span>

The adapter can start InfluxDB 2.x (not 3.x) and optionally Grafana itself as Docker containers. Docker has to be installed on the ioBroker host for this, and the user `iobroker` must be allowed to use Docker (run `iob fix` if necessary).

### InfluxDB in Docker

Enable **Use self-hosted InfluxDB in Docker** in the instance settings. Host, port, organization, token etc. are hidden then - the adapter sets up the connection itself.

The container is created with these fixed values:

| Setting         | Value                                      |
|-----------------|--------------------------------------------|
| URL             | `http://<ioBroker-host>:8086`              |
| User / password | `iobroker` / `iobroker`                    |
| Organization    | `iobroker`                                 |
| Bucket          | `iobroker`                                 |
| API token       | `aW9icm9rZXI4NjY0NTYzODU0NjU2NTY1MjY1Ng==` |

By default, the container listens only on `127.0.0.1`, so the InfluxDB web interface can only be opened on the ioBroker host itself. To open it from another computer, set **Start container on IP** in the panel _InfluxDB Docker_ to `0.0.0.0` (all interfaces) or to the IP of the host. **Do this only in a trusted network** - the user, password and token above are the same in every installation. The password can be changed in the InfluxDB web interface (user menu → _Change password_); the adapter logs in with the token and is not affected. Do not delete the token.

The data lives in the docker volumes `flux_data` and `flux_config` and survives an update or a re-creation of the container.

### Grafana in Docker

[Grafana](https://grafana.com/) shows the data from InfluxDB as dashboards. If InfluxDB runs in Docker, the adapter can start Grafana along with it: enable **Use self-hosted Grafana in Docker** in the instance settings (the checkbox is only shown when **Use self-hosted InfluxDB in Docker** is enabled). The connection to InfluxDB is set up automatically - nothing has to be configured in Grafana for it.

#### First login

1. Open `http://<ioBroker-host>:3000` in the browser - or simply click the _Grafana_ tile on the intro page of admin (also shown as link in the instance list). The adapter adds this link as soon as Grafana is enabled and restarts its instance once for it. The port can be changed in the panel _Grafana Docker_. Grafana listens on all interfaces by default (`0.0.0.0`); set **Start container on IP** to `127.0.0.1` if it should only be reachable from the host itself.
2. Log in with
   - **user: `admin`**
   - **password: `iobroker`** - or the value of **Admin security password** in the panel _Grafana Docker_, if it was changed before the first start.
3. Grafana asks for a new password. Set one or click _Skip_.

**The admin password is only applied on the very first start of the container**, when Grafana creates its database. Changing **Admin security password** in the adapter settings later has no effect, and a password changed in Grafana is not shown in the adapter settings. If you forgot it, reset it on the ioBroker host:

```bash
docker ps --filter name=grafana --format '{{.Names}}'     # shows the container name, e.g. iob_influxdb_0_grafana
docker exec -it iob_influxdb_0_grafana grafana cli admin reset-admin-password <new-password>
```

With **Enable user sign-ups**, the login page shows a _Sign up_ link where everybody who can open Grafana can create a user. Disable the option if Grafana is reachable from the network.

#### The data source

The data source `InfluxDB` is already present and set as default (_Connections → Data sources_). It uses the query language **Flux**, organization `iobroker` and bucket `iobroker`, and connects to the InfluxDB container inside the docker network - independent of the port configured for the host. The adapter writes this data source anew on every start, so it can not be edited in Grafana. Data sources of your own can be added next to it.

#### The first dashboard

1. _Dashboards → New → New dashboard → Add visualization_ and select the data source `InfluxDB`.
2. Switch the query editor to _Code_ if shown, and enter a Flux query. Every datapoint is stored in a measurement named like its ID (or its `Alias-ID`), the value is in the field `value`:

   ```
   from(bucket: "iobroker")
     |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
     |> filter(fn: (r) => r._measurement == "system.adapter.admin.0.memRss" and r._field == "value")
     |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
   ```

   Replace `system.adapter.admin.0.memRss` with the ID of one of your logged datapoints. `aggregateWindow` reduces the number of points to what fits into the chart - use `fn: last` for values that are not numbers or should not be averaged.
3. Click _Refresh_ above the chart, then _Save dashboard_.

The easiest way to find the right measurement and field names is the _Data Explorer_ of the InfluxDB web interface (see above): select bucket, measurement and field and click _Script Editor_ - this gives the matching Flux query. In Grafana, queries can be tried out under _Explore_ without a dashboard.

Further hints:

- Plugins can be installed via the option **Plugins** in the panel _Grafana Docker_ (e.g. `grafana-clock-panel`); they are installed on the next start of the container.
- If Grafana is accessed via a reverse proxy under a sub-path, enter the full public URL in **Server root URL**.
- Dashboards, users and settings are stored in the docker volume `grafana_data` and survive an update of the container.

### Grafana without Docker

Without Docker, Grafana has to be installed separately, see the [installation guide](https://grafana.com/docs/grafana/latest/setup-grafana/installation/). Then open `http://<host>:3000` and log in with `admin` / `admin` (Grafana's own default; a new password is requested right away). After that, create a data source as described [here](https://grafana.com/docs/grafana/latest/datasources/influxdb/):

- InfluxDB 1.x: query language _InfluxQL_, URL of InfluxDB, database name and user/password from the adapter settings.
- InfluxDB 2.x: query language _Flux_, URL of InfluxDB, organization, token and default bucket from the adapter settings.
- InfluxDB 3.x: query language _InfluxQL_ (or _SQL_), URL of InfluxDB, database name and token from the adapter settings.

The query from [The first dashboard](#the-first-dashboard) works for InfluxDB 2.x. For InfluxDB 1.x and 3.x with InfluxQL use e.g.:

```
SELECT mean("value") FROM "system.adapter.admin.0.memRss" WHERE $timeFilter GROUP BY time($__interval) fill(previous)
```

* * *

## Installation of an InfluxDB database

See [Installation of InfluxDB](/#/adapters/influxdb#installation-of-influxdb) in the README - or use the self-hosted InfluxDB in Docker described above.