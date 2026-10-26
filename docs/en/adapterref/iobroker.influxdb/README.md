---
BADGE-Number of Installations: http://iobroker.live/badges/influxdb-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.influxdb.svg
BADGE-Test and Release: https://github.com/ioBroker/ioBroker.influxdb/workflows/Test%20and%20Release/badge.svg
BADGE-Translation status: https://weblate.iobroker.net/widgets/adapters/-/influxdb/svg-badge.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.influxdb.svg
chapters: {"pages":{"en/adapterref/iobroker.influxdb/README.md":{"title":{"en":"ioBroker.influxdb"},"content":"en/adapterref/iobroker.influxdb/README.md"},"en/adapterref/iobroker.influxdb/docs/en/influxdb.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.influxdb/docs/en/influxdb.md"},"en/adapterref/iobroker.influxdb/RetentionPolicies.md":{"title":{"en":"Understanding retention policies"},"content":"en/adapterref/iobroker.influxdb/RetentionPolicies.md"}}}
---
![Logo](admin/influxdb.png)
# ioBroker.influxdb

![Number of Installations](http://iobroker.live/badges/influxdb-installed.svg)
![Number of Installations](http://iobroker.live/badges/influxdb-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.influxdb.svg)](https://www.npmjs.com/package/iobroker.influxdb)

![Test and Release](https://github.com/ioBroker/ioBroker.influxdb/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/influxdb/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.influxdb.svg)](https://www.npmjs.com/package/iobroker.influxdb)

This adapter saves state history into InfluxDB.

**The Adapter supports InfluxDB 1.x, 2.x and 3.x (Core and Enterprise)**

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## InfluxDB version support

### InfluxDB 1.x
If you have an InfluxDB 1.x installation (preferably `1.8.x` or `1.9.x`) then you choose "1.x" in the adapter configuration and enter the Host-IP and Port together with Username and Password for the Access.
You can also define a database name. The default is `iobroker`. On the first adapter start, this database is created.

When doing custom queries via the "query" message, you can use InfluxQL to select the data you want. FluxQL with InfluxDB 1.x is not supported (and will also not be added).

### InfluxDB 2.x
Since 2.0 of the adapter also InfluxDB 2.x is supported which works a bit different.
Here beside the Host-IP and Port the following data are required:
* **Organization**: You need to create an organization on the commandline/WebUI and need to enter the name or ID of that organization here. If you created one Organization when doing the InfluxDB-setup, you have created an initial organization and can use this here, else use `influx org list` to see available organizations.
* **Authentication Token**: You must create an authentication token that has sufficient rights to allow the adapter to perform all necessary actions! To create a token with only minimal permissions for a single bucket, go to the WebUI and select: "API Tokens" --> "Generate API Token" --> "Custom API Token", select read/write permissions for the bucket and read permissions for "All Orgs" and "All Users". Alternatively you can generate an "All Access" token, which will grant all permissions for ALL buckets of given organization.

You can also define a database name - this is used as a Bucket. The default is `iobroker`. On the first adapter start, this bucket is created in the configured organization.

When doing custom queries via the "query" message, you can use Flux queries to select the data you want. Details on Flux can be found at https://docs.influxdata.com/influxdb/v2.0/reference/flux/

#### Store metadata information as tags instead of fields
For `Influx 1.x` state value, as well as associated metadata fields (`q`, `ack` and `from`) are stored as fields within InfluxDB. When using Flux-commands to retrieve this data (instead of `InfluxQL`) the data is returned in separate tables, which makes it more difficult to view the data in a joined way when using external database clients or Influx CLI `query` command. This is by design, as Influx only supports one field per data-point.

With `Influx 2.x` and `3.x` it is now also possible, to store this metadata-information besides the actual value of the state as Influx Tags. Tags are indexed and allow for faster search queries. In addition, they are closely linked to the measurement stored within the db, meaning they will be returned in one table with the queried measurement which makes them much easier to handle, when used outside this adapter. There are limitations with this, however:
- The use of tags for metadata needs to be enabled under `Advanced Settings`. It is disabled by default.
- If you decide to use tags, you cannot continue to use old measurements that were gathered with Influx 1.x, as they are stored in fields.
- Attempting to use an existing database that was set up without enabling the Tag-feature will cause the adapter to fail to initialize, and you will see an error message about it in the log.
  - This also is valid the other way: Once you start using the Tag-feature in a new database, you cannot switch back to using fields for this database.
- This feature is only available if you use Influx 2.x or 3.x. And only if you use the new responsive GUI of Admin 5.

### InfluxDB 3.x
InfluxDB 3 (Core and Enterprise) is supported. It has no organizations and no buckets, so the settings are the simplest of all three versions:
* **Host, port, protocol**: InfluxDB 3 listens on port `8181` by default.
* **Authentication Token**: a token that may write to and read from the database. Create one with `influxdb3 create token --admin` (or a database token). If the server runs without authentication (`--without-auth`) leave the field empty.
* **DB Name**: the name of the database. The default is `iobroker`. The adapter creates it on the first start (a token that is not allowed to create databases is fine: the first write creates it).
* **Path** and **Validate SSL certificate** work as for 2.x.

The adapter writes with the InfluxDB line protocol over HTTP (`/api/v3/write_lp`) and reads with **InfluxQL** over HTTP (`/api/v3/query_influxql`), the same way as for 1.x. No additional client library is needed. The [metadata-as-tags](#store-metadata-information-as-tags-instead-of-fields) and the [custom tags](#custom-tags) work as for 2.x.

When doing custom queries via the "query" message, use InfluxQL as described for [Influx 1.x](#influx-1x). The server accepts one statement per request; the adapter splits several statements separated by `;` and runs them one after the other, so the result is an array with one entry per statement, as with 1.x.

What InfluxDB 3 cannot do, and what the adapter does about it:

| Function | With InfluxDB 3.x |
|---|---|
| Retention | Supported: `Storage retention` is applied to the database with `PUT /api/v3/configure/database` on every start, like for the other versions. A retention that was set on the server (e.g. with `influxdb3 update database --retention-period`) is overwritten by the adapter setting; choose `infinite` and set it on the server if you prefer that. |
| `delete` / `deleteRange` | Not supported: InfluxDB 3 can not delete single values or a time range. The commands answer with an error and are not listed in `features`. |
| `deleteAll` and the cleanup of orphaned datapoints | Supported. The whole measurement (table) is deleted. InfluxDB 3 keeps the name of a deleted table in its catalog, renamed to `<name>-YYYYMMDDTHHMMSS`; the adapter does not show these leftovers. |
| `update` | Supported when `q`, `ack` and `from` are stored as fields: a value with the same time replaces the old one. Not supported with metadata as tags, as the tags are part of the series. |
| Number of series (Statistics tab) | Unknown, the column stays empty. |
| Write latency | InfluxDB 3 answers a write after the next write-ahead-log flush, which takes about a second. The adapter awaits the direct write of a value (`Buffer Datapoints` = 0), so by default it writes single values with `no_sync`: the answer comes at once and rejected values are still reported, but the value is readable and durable up to a second later. Enable `Wait for the database to store each value` (Expert Settings, `syncWrites`) to wait for the flush instead; single values then take about a second each, so prefer a buffer in that case. Batches (buffer flushes) are always written the regular way. |
| Limits of InfluxDB 3 Core | At most 2000 tables in all databases and 500 columns per table. The adapter writes one measurement (table) per datapoint, so Core can log at most about 2000 datapoints. InfluxDB 3 Enterprise has higher, configurable limits. |
| Types | InfluxDB 3 fixes the type of a field per measurement like the other versions. A type conflict is handled as before (the value is converted and the datatype of the datapoint is pinned). |

### Custom tags
Every datapoint can carry additional, static InfluxDB tags. They are defined in the datapoint settings (`Custom tags`) as a list of name/value pairs and are written with every value of this datapoint - for all InfluxDB versions and independent of the setting [Store metadata information as tags instead of fields](#store-metadata-information-as-tags-instead-of-fields).

This allows selecting and grouping the values of different datapoints by their meaning instead of by their IDs, e.g. give all datapoints of the kitchen the tag `room=kitchen` and all temperature sensors the tag `type=temperature`. In Grafana, the values can then be filtered or grouped by these tags:

```
from(bucket: "iobroker")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r._field == "value" and r.type == "temperature")
  |> group(columns: ["room"])
```

Please note:
- The names `value`, `q`, `ack`, `from` and `time` as well as names starting with `_` are reserved and can not be used. Rows without name or value are ignored. Ignored tags are reported as warning in the log.
- InfluxDB identifies a series by the measurement and all of its tags. Changing the tags of a datapoint therefore starts a new series, the values written before keep their old tags. With InfluxDB 2.x an aggregated `getHistory` over a time range in which the tags changed aggregates each series on its own, so such a range can contain two values per interval - one of the old and one of the new series. Add the tags before logging starts if you want to avoid this.
- Every datapoint is still written into a measurement of its own (its ID or its `Alias-ID`). Using the same `Alias-ID` for several active datapoints is not supported.

Custom tags can also be set via JavaScript with the `enableHistory` message (see [below](#enable)):

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

### Migration from InfluxDB 1 to 2

Please refer to the [official guides on how to migrate](https://docs.influxdata.com/influxdb/v2.0/upgrade/v1-to-v2/) from InfluxDB 1.x to 2.x. Especially the [migration instructions for time series data](https://docs.influxdata.com/influxdb/v2.0/upgrade/v1-to-v2/manual-upgrade/#migrate-time-series-data) have been verified to work during adapter testing. Please always create a backup of your data before performing the migration.

After the migration, the adapter is able to work with the old data (e.g. for history-queries) as well. This only applies if you don't decide to [use Tags for storing metadata fields](#Store-metadata-information-as-tags-instead-of-fields).

### Migration to InfluxDB 3

InfluxDB 3 cannot open the data files of 1.x or 2.x, and there is no upgrade tool. The data has to be exported as line protocol and written into the new database. Both paths below were tried with InfluxDB 1.8 / 2.7 and 3 Core 3.12: the exported points arrive with the same measurements, fields and tags that the adapter writes itself. Please always create a backup before you start.

Prepare the new server first: create a token (`influxdb3 create token --admin`), set the version to `3.x` in the adapter and let it create the database (or create it with `influxdb3 create database iobroker`). Stop the adapter while you import. The adapter applies the retention setting to the new database on start.

#### From InfluxDB 1.x

1. Export the database as line protocol. The tool lives in the InfluxDB 1.x installation:
   ```
   influx_inspect export -datadir /var/lib/influxdb/data -waldir /var/lib/influxdb/wal -database iobroker -out export.lp
   ```
2. Remove the header of the file (the lines that begin with `#` or `CREATE`):
   ```
   grep -vE '^(#|CREATE)' export.lp > data.lp
   ```
3. Write it into InfluxDB 3. The export uses nanosecond timestamps:
   ```
   curl -X POST "http://localhost:8181/api/v3/write_lp?db=iobroker&precision=nanosecond&accept_partial=true" \
     -H "Authorization: Bearer <token>" --data-binary @data.lp
   ```

The metadata `q`, `ack` and `from` are stored as fields in 1.x, so keep `Store metadata information as tags` **disabled** in the adapter.

#### From InfluxDB 2.x

1. Export the bucket as line protocol (the tool is part of `influxd`; look up the bucket ID with `influx bucket list`):
   ```
   influxd inspect export-lp --bucket-id <bucket-id> --engine-path /var/lib/influxdb2/engine --output-path data.lp
   ```
2. Write the file as shown above for 1.x.

Keep the adapter setting `Store metadata information as tags` as it was in 2.x: with tags enabled the export contains `q`, `ack` and `from` as tags, otherwise as fields. A database must not be mixed - the adapter refuses to start if the stored metadata does not match the setting.

#### Notes
- A large export has to be sent in several requests, e.g. split the file with `split -l 200000 data.lp part-` and write the parts one after the other. A line that is rejected (e.g. because of a type conflict inside the data) is reported with `accept_partial=true`; the remaining lines are stored.
- InfluxDB 3 Core allows only a few databases (5 by default); a deleted database still counts. Migrate everything into the one database of the adapter.
- Delete the line protocol file afterwards, it contains all of your data.

## Retention Policy
While Influx 1.x supports the concept of multiple **retention policies** for one database, Influx 2 by design allows only one **retention period** per bucket. Therefore, it is only possible to set one policy for the whole database/bucket with this adapter via _Default Settings -> Storage retention_. The retention selected here will be applied on the fly and can be changed at any time. Retention policies set by the adapter will never be deleted, but instead altered if required, as otherwise Influx 1.x would delete all data that the policy applied to.

With InfluxDB 3.x the setting is applied to the database as its retention period, see [InfluxDB 3.x](#influxdb-3x).

Please also read [Understanding Retention Policies](/#/docs/adapterref/iobroker.influxdb/RetentionPolicies.md). 

## Direct writes or buffered writes?
With the default configuration, the adapter stores each single datapoint directly into the database and only uses the internal buffer if the database is not available. If the database was not available, the buffer is flushed at the given interval, so it can take the defined interval till the missing points are written!

By changing the configuration, it is possible to cache new data points up to a defined count or a defined maximum interval after which all points are stored into the database. This also gives better performance and less system load compared to writing the data points directly.
InfluxDB has a limitation of the maximum size for writes which is at around 2MB. It should be safe to have up to 15.000 data points as buffer maximum, maybe also 20.000, but this highly depends on the length of your datapoint-IDs.

On exit of the adapter the buffer is stored on disk and reinitialized with the next adapter start, so no data points should be lost and will be written after the next start.

## InfluxDB and data types
InfluxDB is very strict on data types. The datatype for a measurement value is defined with its first write.
The adapter tries to write with the correct value, but if the datatype changes for the same state, then there may be the write errors in the InfluxDB.
The adapter detects this and will write these potential conflicting data points always directly, but write errors mean that the value is not written into the DB at all. So make sure to check the logs for such cases.

**In Version 1.x and 2.x of the adapter, it could also be that some values were converted wrong when no datatype was defined. E.g. a String like `37.5;foo bar` was converted to a number 37.5 in older versions. The version 3 odf the adapter will detect that this is not a valid number and will not convert this value. This could lead to type conflicts after the update. Please check these values and think if you need to store it and how (for the future).**

Additionally, InfluxDB does not support "null" values, so these are not written at all into the DB.

## Installation of InfluxDB
Please refer to the official InfluxDB pages for installation instructions depending on your OS.

* InfluxDB 1.x: https://docs.influxdata.com/influxdb/v1.8/introduction/install/
* InfluxDB 2.x: https://docs.influxdata.com/influxdb/v2.2/install/
* InfluxDB 3.x: https://docs.influxdata.com/influxdb3/core/install/

### Setup authentication for InfluxDB 1.x (optional)
**NOTE:** Influx DB V2.x relies on organization/token login, instead of username/password! InfluxDB 3.x needs only a token. This is only applicable for InfluxDB 1.x

If you use DB locally, you may leave authentication disabled and skip this part.

- Start service: ``` service influxdb start ```
- Go to admin page: http://<ip>:8083
- Create users:
```
CREATE USER "admin" WITH PASSWORD '<adminpassword>' WITH ALL PRIVILEGES
CREATE USER "user" WITH PASSWORD '<userpassword>'
CREATE DATABASE "iobroker"
GRANT ALL ON "iobroker" TO "user"
```

Enable authentication by editing /etc/influxdb/influxdb.conf:
```
 [http]  
 enabled = true  
 bind-address = ":8086"  
 auth-enabled = true # ✨
 log-enabled = true  
 write-tracing = false  
 pprof-enabled = false  
 https-enabled = false  
 https-certificate = "/etc/ssl/influxdb.pem"  
```
- Restart service: ``` service influxdb restart ```

## Self-hosted docker image for InfluxDB
This version of the adapter could start a self-hosted docker image of InfluxDB 2.x (not 3.x) and, optionally, Grafana next to it.
Of course, the docker environment must be installed and running on the host.

The `iobroker` user must have access to the docker CLI. To fix the rights start `iob fix`.

Enable it in the instance settings with **Use self-hosted InfluxDB in Docker**. All connection settings (host, port, organization, token, ...) are hidden then, because the adapter configures the connection itself.

The container is created with these fixed values:

| Setting           | Value                                      |
|-------------------|--------------------------------------------|
| URL               | `http://<ioBroker-host>:8086`              |
| User / password   | `iobroker` / `iobroker`                    |
| Organization      | `iobroker`                                 |
| Bucket            | `iobroker`                                 |
| API token         | `aW9icm9rZXI4NjY0NTYzODU0NjU2NTY1MjY1Ng==` |

By default, the container listens only on `127.0.0.1`, so the InfluxDB web interface can only be opened on the ioBroker host itself. To reach it from another computer, set **Start container on IP** in the panel _InfluxDB Docker_ to `0.0.0.0` (all interfaces) or to the IP of the host. **Do this only in a trusted network** - the user, password and token above are the same in every installation. You can change the password in the InfluxDB web interface (user menu → _Change password_) without affecting the adapter, which logs in with the token. Do not delete the token.

The data lives in the docker volumes `flux_data` and `flux_config`, so it survives an update or a re-creation of the container.

## Grafana (Charting Tool)
[Grafana](https://grafana.com/) is a charting tool that shows the data from InfluxDB as dashboards.

### Grafana in Docker
If InfluxDB runs in Docker (see above), the adapter can start Grafana in Docker too: enable **Use self-hosted Grafana in Docker** in the instance settings (the checkbox is only shown when **Use self-hosted InfluxDB in Docker** is enabled). The connection to InfluxDB is set up automatically - nothing has to be configured in Grafana.

#### First login
1. Open `http://<ioBroker-host>:3000` in the browser - or simply click the _Grafana_ tile on the intro page of admin (also shown as link in the instance list). The adapter adds this link when Grafana is enabled and restarts its instance once for it. The port can be changed in the panel _Grafana Docker_. Grafana listens on all interfaces by default (`0.0.0.0`); set **Start container on IP** to `127.0.0.1` if it should only be reachable from the host itself.
2. Log in with
   - **user: `admin`**
   - **password: `iobroker`** - or the value of **Admin security password** in the panel _Grafana Docker_, if it was changed before the first start.
3. Grafana asks to set a new password. Set one or click _Skip_.

**The admin password is only applied on the very first start of the container**, when Grafana creates its database. Changing **Admin security password** in the adapter settings later has no effect, and a password changed in Grafana is not shown in the adapter settings. If you forgot it, reset it on the ioBroker host:

```bash
docker ps --filter name=grafana --format '{{.Names}}'     # shows the container name, e.g. iob_influxdb_0_grafana
docker exec -it iob_influxdb_0_grafana grafana cli admin reset-admin-password <new-password>
```

The option **Enable user sign-ups** shows a _Sign up_ link on the login page, where everybody who can open Grafana can create a user. Disable it if Grafana is reachable from your network.

#### The data source
The data source `InfluxDB` is already present and set as default (_Connections → Data sources_). It uses the query language **Flux**, organization `iobroker` and bucket `iobroker`, and connects to the InfluxDB container inside the docker network, independent of the port configured for the host. The adapter writes this data source anew on every start, so it can not be edited in Grafana. You can add data sources of your own next to it.

#### The first dashboard
1. _Dashboards → New → New dashboard → Add visualization_ and select the data source `InfluxDB`.
2. Switch the query editor to _Code_ (if shown) and enter a Flux query. Every datapoint is stored in a measurement named like its ID (or its `Alias-ID`), the value is in the field `value`:

   ```
   from(bucket: "iobroker")
     |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
     |> filter(fn: (r) => r._measurement == "system.adapter.admin.0.memRss" and r._field == "value")
     |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
   ```

   Replace `system.adapter.admin.0.memRss` with the ID of one of your logged datapoints. `aggregateWindow` reduces the number of points to what fits into the chart - use `fn: last` for values that are not numbers or should not be averaged.
3. Click _Refresh_ above the chart, then _Save dashboard_.

The easiest way to find the right measurement and field names is the _Data Explorer_ of the InfluxDB web interface (see above): select bucket, measurement and field there and click _Script Editor_ to get the matching Flux query. In Grafana, _Explore_ can be used to try out queries without a dashboard.

Further hints:
- Plugins can be installed via the option **Plugins** in the panel _Grafana Docker_ (e.g. `grafana-clock-panel`); they are installed on the next start of the container.
- If Grafana is accessed via a reverse proxy under a sub-path, enter the full public URL in **Server root URL**.
- Dashboards, users and settings are stored in the docker volume `grafana_data` and survive an update of the container.

### Grafana installed manually
If you do not use Docker, Grafana must be installed separately. Explanations for the different operating systems can be found [here](https://grafana.com/docs/grafana/latest/setup-grafana/installation/).
After the installation, open `http://<host>:3000` and log in with `admin` / `admin` (Grafana's own default; you are asked to change it right away).
Then create a data source as described [here](https://grafana.com/docs/grafana/latest/datasources/influxdb/):
- InfluxDB 1.x: query language _InfluxQL_, URL of InfluxDB, database name and the user/password of the adapter settings.
- InfluxDB 2.x: query language _Flux_, URL of InfluxDB, organization, token and default bucket of the adapter settings.
- InfluxDB 3.x: query language _InfluxQL_ (or _SQL_), URL of InfluxDB, database name and token of the adapter settings.

The query from [The first dashboard](#the-first-dashboard) works for InfluxDB 2.x. For InfluxDB 1.x and 3.x with InfluxQL use e.g.:

```
SELECT mean("value") FROM "system.adapter.admin.0.memRss" WHERE $timeFilter GROUP BY time($__interval) fill(previous)
```

## Default Settings
- **Debounce Time** - Protection against unstable values to make sure that only stable values are logged when the value did not change in the defined amount of Milliseconds. ATTENTION: If values change more often then this setting effectively no value will be logged (because any value is unstable)
- **Blocktime** - Defines for how long after storing the last value no further value is stored. A value received meanwhile is not lost: when the given time in Milliseconds is over, the newest of them is logged (with its original timestamp) if it fulfills all other checks and differs from the last logged value. Values excluded by the "ignore" settings never replace it.
- **Record changes only** - This function makes sure that only changed values are logged if they fulfill other checks (see below). Same values will not be logged.
- **still record the same values (seconds)** - When using "Record changes only" you can set a time interval in seconds here after which also unchanged values will be re-logged into the DB. You can detect the values re-logged by the adapter with the "from" field.
- **Minimum difference from last value** - When using "Record changes only" you can define the required minimum difference between the new value and the last value. If this is not reached the value is not recorded.
- **ignore 0 or null values (==0)** - You can define if 0 or null values should be ignored.
- **ignore values below zero (<0)** - You can define if values below zero should be ignored.
- **Disable charting optimized logging of skipped values** - By default, the adapter tries to record the values for optimized charting. This can mean that additional values (that e.g. not fulfilled all checks above) are logged automatically. If this is not wanted, you can disable this feature.
- **Alias-ID** - You can define an alias for the ID. This is useful if you have changed a device and want to have continuous data logging. Please consider switching to real alias States in teh future!
- **Storage retention** - How many values in the past will be stored on disk. Data are deleted when the time is reached as soon as new data should be stored for a datapoint.
- **Enable enhanced debug logs for the datapoint** - If you want to see more detailed logs for this datapoint, you can enable this option. You still need to enable "debug" loglevel for these additional values to be visible! This helps in debugging issues or understanding why the adapter is logging a value (or not).

Most of these values can be pre-defined in the instance settings and are then pre-filled or used for the datapoint.

## Access values from Javascript adapter
The sorted values can be accessed from Javascript adapter.

* Get 50 last stored events for all IDs
```javascript
sendTo('influxdb.0', 'getHistory', {
    id: '*',
    options: {
        end:       Date.now(),
        count:     50,
        aggregate: 'onchange',
        addId: true
    }
}, function (result) {
    for (var i = 0; i < result.result.length; i++) {
        console.log(result.result[i].id + ' ' + new Date(result.result[i].ts).toISOString());
    }
});
```

* Get stored values for "system.adapter.admin.0.memRss" in last hour
```javascript
var end = Date.now();
sendTo('influxdb.0', 'getHistory', {
    id: 'system.adapter.admin.0.memRss',
    options: {
        start:      end - 3600000,
        end:        end,
        aggregate: 'onchange',
        addId: true
    }
}, function (result) {
    for (var i = 0; i < result.result.length; i++) {
        console.log(result.result[i].id + ' ' + new Date(result.result[i].ts).toISOString());
    }
});
```

Possible options:
- **start** - (optional) time in ms - `Date.now()`
- **end** - (optional) time in ms - `Date.now()`. The default value is `now + 5000 seconds`
- **step** - (optional) used in aggregate (max, min, average, total, ...) step in ms of intervals
- **count** - number of values if aggregate is 'onchange' or number of intervals if other aggregate method. Count will be ignored if step is set, else default is 500 if not set
- **from** - if *from* field should be included in answer
- **ack** - if *ack* field should be included in answer
- **q** - if *q* field should be included in answer
- **addId** - if *id* field should be included in answer
- **limit** - do not return more entries than limit
- **round** - round result to number of digits after decimal point
- **ignoreNull** - if null values should be included (false), replaced by last not null value (true) or replaced with 0 (0)
- **removeBorderValues** - By default, additional border values are returned to optimize charting. Set this option to true if this is not wanted (e.g. for script data processing)
- **returnNewestEntries** - The returned data are always sorted by timestamp ascending. When using aggregate "none" and also providing "count" or "limit" this means that normally the oldest entries are returned (unless no start data is provided). Set this option to true to get the newest entries instead.
- **aggregate** - aggregate method (Default: 'average'):
  - *minmax* - used special algorithm. Splice the whole time range in small intervals and find for every interval max, min, start and end values.
  - *max* - Splice the whole time range in small intervals and find for every interval max value and use it for this interval (nulls will be ignored).
  - *min* - Same as max, but take minimal value.
  - *average* - Same as max, but take average value.
  - *total* - Same as max, but calculate total value.
  - *count* - Same as max, but calculate number of values (nulls will be calculated).
  - *percentile* - Calculate n-th percentile (n is given in `options.percentile` or defaults to 50 if not provided).
  - *quantile* - Calculate n quantile (n is given in options.quantile or defaults to 0.5 if not provided).
  - *integral* - Calculate integral (additional parameters see below).
  - *none* - No aggregation at all. Only raw values in the given period.
- **percentile** - (optional) when using aggregate method "percentile" defines the percentile level (0..100)(defaults to 50)
- **quantile** - (optional) when using aggregate method "quantile" defines the quantile level (0..1)(defaults to 0.5)
- **integralUnit** - (optional) when using aggregate method "integral" defines the unit in seconds (default to 60s). e.g. to get integral in hours for Wh or such, set to 3600.
- **integralInterpolation** - (optional) when using aggregate method "integral" defines the interpolation method (defaults to "none").
  - *linear* - linear interpolation
  - *none* - no/stepwise interpolation

The first and last points will be calculated for aggregations, except aggregation `none`.
If you manually request some aggregation, you should ignore first and last values, because they are calculated from values outside of the period.

When raw data are selected without using `step`, the returned fields are `ts`, `val`, `ack`, `q` and `from`.
As soon as a step is used, the returned fields are ts and val.

Interpolated values will be marked as `i=true`, like: `{i: true, val: 4.7384845, ts: 29892365723652}`.

Please hold in mind that InfluxDB aggregates on "rounded time boundaries" (see https://docs.influxdata.com/influxdb/v0.11/troubleshooting/frequently_encountered_issues/#understanding-the-time-intervals-returned-from-group-by-time-queries)

InfluxDB is very strict when it comes to data types. This has effects for aggregator functions, e.g.:
* average (MEAN) cannot be used for boolean values (true/false), only MIN or MAX works here
* average (MEAN) cannot be used for string values (text), no aggregator makes sense here at all
* ...

## Custom queries
The user can execute custom queries on data from javascript adapter.

The multi-query feature is also supported. You can send multiple queries separated by a semicolon.

That's why the result is always an array with one numbered index for each query.

### Influx 1.x
Example with one query:

```javascript
sendTo('influxdb.0', 'query', 'SELECT * FROM iobroker.global."system.adapter.admin.0.memRss" LIMIT 100', function (result) {
    if (result.error) {
        console.error(result.error);
    } else {
        // show result
         console.log('Rows: ' + JSON.stringify(result.result[0]));
    }
});
```
Two queries:

```javascript
sendTo('influxdb.0', 'query', 'SELECT * FROM iobroker.global."system.adapter.admin.0.memRss" LIMIT 100; SELECT * FROM iobroker.global."system.adapter.admin.0.memHeapUsed" LIMIT 100', function (result) {
    if (result.error) {
        console.error(result.error);
    } else {
        // show result
        console.log('Rows First: ' + JSON.stringify(result.result[0]));
        console.log('Rows Second: ' + JSON.stringify(result.result[1]));
    }
});
```
**NOTE:** The values are coming back in the result array in filename "value" (instead of "val" as normal in ioBroker)

### Influx 2.x
In InfluxDB v2.0 onwards, the SQL-based query language *InfluxQL* is deprecated in favour of *Flux*. For more information, please refer to [the offical InfluxDB 2.0 documentation](https://docs.influxdata.com/influxdb/v2.0/reference/flux/).

Example with one query:

```javascript
sendTo('influxdb.0', 'query', 'from(bucket: "iobroker") |> range(start: -3h)', function (result) {
    if (result.error) {
        console.error(result.error);
    } else {
        // show result
         console.log('Rows: ' + JSON.stringify(result));
    }
});
```
Two queries:
**NOTE:** By default, you cannot execute 2 queries at once via Flux-language, as there is no delimiter available. This adapter emulates this behaviour by defining `;` as delimiter, so you can still run two queries in one statement.

```javascript
sendTo('influxdb.0', 'query', 'from(bucket: "iobroker") |> range(start: -3h); from(bucket: "iobroker") |> range(start: -1h)" LIMIT 100', function (result) {
    if (result.error) {
        console.error(result.error);
    } else {
        // show result
        console.log('Rows First: ' + JSON.stringify(result.result[0])); // Values from last 3 hours
        console.log('Rows Second: ' + JSON.stringify(result.result[1])); // Values from last hour
    }
});
```
**NOTE:** The values are coming back in the result array in filename "value" (instead of "val" as normal in ioBroker)

## storeState
If you want to write other data into the InfluxDB, you can use the build in system function **storeState**.
This function can also be used to convert data from other History adapters like History or SQL.

A successful response does not mean that the data is really written out to the disk. It just means that they were processed.

The given ids are not checked against the ioBroker database and do not need to be set up or enabled there. If own IDs are used without settings, then the "rules" parameter is not supported and will result in an error. The default "Maximal number of stored in RAM values" is used for such IDs.

The Message can have one of the following three formats:
* one ID and one state object

```javascript
sendTo('influxdb.0', 'storeState', {
    id: 'mbus.0.counter.xxx',
    state: {ts: 1589458809352, val: 123, ack: false, from: 'system.adapter.whatever.0', ...}
}, result => console.log('added'));
```

* one ID and array of state objects

```javascript
sendTo('influxdb.0', 'storeState', {
    id: 'mbus.0.counter.xxx',
    state: [
      {ts: 1589458809352, val: 123, ack: false, from: 'system.adapter.whatever.0', ...}, 
      {ts: 1589458809353, val: 123, ack: false, from: 'system.adapter.whatever.0', ...}
    ]
}, result => console.log('added'));
```

* array of multiple IDs with one state object each

```javascript
sendTo('influxdb.0', 'storeState', [
    {id: 'mbus.0.counter.xxx', state: {ts: 1589458809352, val: 123, ack: false, from: 'system.adapter.whatever.0', ...}}, 
    {id: 'mbus.0.counter.yyy', state: {ts: 1589458809353, val: 123, ack: false, from: 'system.adapter.whatever.0', ...}}
], result => console.log('added'));
```

Additionally, you can add attribute `rules: true` in a message to activate all rules, like `counter`, `changesOnly`, `de-bounce` and so on

In case of errors, an array with all single error messages is returned and also a successCount to see how many entries were stored successfully.

## delete state
If you want to delete entry from the Database, you can use the build in system function `delete`:

```javascript
sendTo('influxdb.0', 'delete', [
    {id: 'mbus.0.counter.xxx', state: {ts: 1589458809352}}, 
    {id: 'mbus.0.counter.yyy', state: {ts: 1589458809353}}
], result => console.log('deleted'));
```

To delete ALL history data for some data point execute:

```javascript
sendTo('influxdb.0', 'deleteAll', [
    {id: 'mbus.0.counter.xxx'}, 
    {id: 'mbus.0.counter.yyy'}
], result => console.log('deleted'));
``` 

To delete history data for some data point and for some range, execute:

```javascript
sendTo('influxdb.0', 'deleteRange', [
    {id: 'mbus.0.counter.xxx', start: '2019-01-01T00:00:00.000Z', end: '2019-12-31T23:59:59.999'}, 
    {id: 'mbus.0.counter.yyy', start: 1589458809352, end: 1589458809353}
], result => console.log('deleted'));
``` 

Time could be ms since epoch or ans string, that could be converted by javascript Date object.

Values will be deleted including defined limits. `ts >= start AND ts <= end`

## change state
If you want to change entry's value, quality or acknowledge flag in the database, you can use the build in system function `update`:

```javascript
sendTo('influxdb.0', 'update', [
    {id: 'mbus.0.counter.xxx', state: {ts: 1589458809352, val: 15, ack: true, q: 0}}, 
    {id: 'mbus.0.counter.yyy', state: {ts: 1589458809353, val: 16, ack: true, q: 0}}
], result => console.log('deleted'));
```

`ts` is mandatory. At least one other flag must be included in a state object.

## Flush Buffers
If you want to flush the buffers for one or all data points to the Database, you can use the build in system function `flushBuffer`:

```javascript
sendTo('influxdb.0', 'flushBuffer', {id: 'mbus.0.counter.xxx'}, result => console.log('deleted, error: ' + result.error));
```
if no id is provided, all buffers will be flushed.

## History Logging Management via JavaScript
The adapter supports enabling and disabling of history logging via JavaScript and also retrieving the list of enabled data points with their settings.

### enable
The message requires having the `id` of the datapoint. Additionally, optional `options` to define the datapoint specific settings:

```javascript
sendTo('influxdb.0', 'enableHistory', {
    id: 'system.adapter.influxdb.0.memRss',
    options: {
        changesOnly:  true,
        debounce:     0,
        retention:    31536000,
        maxLength:    3,
        changesMinDelta: 0.5,
        aliasId: ''
    }
}, function (result) {
    if (result.error) {
        console.log(result.error);
    }
    if (result.success) {
        // successfully enabled
    }
});
```

### disable
The message requires having the `id` of the datapoint.

```javascript
sendTo('influxdb.0', 'disableHistory', {
    id: 'system.adapter.influxdb.0.memRss',
}, function (result) {
    if (result.error) {
        console.log(result.error);
    }
    if (result.success) {
        // successfully enabled
    }
});
```

### get List
The message has no parameters.

```javascript
sendTo('influxdb.0', 'getEnabledDPs', {}, function (result) {
    // result is an object like:
    console.log(JSON.stringify({
        'system.adapter.influxdb.0.memRss': {
            changesOnly: true,
            debounce: 0,
            retention: 31536000,
            maxLength: 3,
            changesMinDelta: 0.5,
            enabled: true,
            changesRelogInterval: 0,
            aliasId: ''
        }
        /// ...
    }));
});
```

## Statistics and cleanup

The **Statistics** tab of the instance configuration lists every datapoint the database contains, with its
number of values, the oldest and the newest value, the number of series and a status:

| Status            | Meaning                                                                                  |
|-------------------|------------------------------------------------------------------------------------------|
| `active`          | the state exists and this instance logs it                                               |
| `loggingDisabled` | the state still exists, but its logging is switched off - the history is still reachable |
| `objectMissing`   | the state was deleted in ioBroker, so nothing can reach its history any more             |

Two things are worth knowing about the numbers:

- **There is no size per datapoint.** InfluxDB does not report one, neither in 1.x (`SHOW STATS` and
  `SHOW SHARDS` only know the engine and the shards) nor in 2.x (disk usage is monitored per bucket). The
  number of **series** is shown instead: it is what drives the memory the index needs, and
  [custom tags](#custom-tags) are the usual way to increase it unintentionally. InfluxDB 3.x can not tell the
  number of series, the column stays empty.
- **Counting is a full scan.** InfluxDB has no row count it could look up, so the values of the examined
  range are really read. On a database with years of data that takes a while - the time range selector
  above the table limits the scan if the full count is not needed.

The same data is available from JavaScript:

```javascript
// the whole database; `start` and `end` (ms) limit the examined range
sendTo('influxdb.0', 'getDpStatistics', {}, function (result) {
    console.log(JSON.stringify(result.summary));
    // { datapoints: 42, values: 1234567, cardinality: 44,
    //   byStatus: { active: {...}, loggingDisabled: {...}, objectMissing: {...} } }
    console.log(JSON.stringify(result.result[0]));
    // { id: 'hm-rpc.0.ABC123.1.TEMPERATURE', type: 'Number', count: 51234,
    //   firstTs: 1696000000000, lastTs: 1759000000000, cardinality: 1, status: 'active' }
});
```

`cleanupOrphaned` removes the stored values of datapoints nobody logs anymore. **Without `confirm: true`
nothing is deleted** - the answer only reports what a confirmed run would remove, which is what the dialog
in the admin shows before anything is lost:

```javascript
// dry run: what would be removed?
sendTo('influxdb.0', 'cleanupOrphaned', {}, function (result) {
    console.log(`${result.datapoints} datapoints with ${result.values} values`);
    console.log(result.items.map(item => item.id).join('
'));
});

// really remove it - this cannot be undone
sendTo('influxdb.0', 'cleanupOrphaned', { confirm: true }, function (result) {
    console.log(`removed ${result.deleted.datapoints} datapoints`);
    // result.failed lists the measurements the database refused to drop
});
```

The scope decides what counts as removable. By default, only states that no longer exist in ioBroker are
selected, because nothing can reach their history anymore. Datapoints whose logging is merely switched
off are a different matter - their history is still reachable and may well be wanted, so they are only
included when asked for explicitly:

```javascript
sendTo('influxdb.0', 'cleanupOrphaned', {
    scope: { objectMissing: true, loggingDisabled: true },
    confirm: true,
});
```

A datapoint that is being logged is never selected, whatever the scope says.

`scope.ids` limits a run to some of these datapoints. The IDs only narrow the selection made by the statuses,
so an ID that would not be removed anyway (e.g. one that is being logged) is ignored:

```javascript
sendTo('influxdb.0', 'cleanupOrphaned', {
    scope: { objectMissing: true, ids: ['javascript.0.oldState'] },
    confirm: true,
});
```

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 5.2.0 (2026-10-24)
* (GermanBluefox) The cleanup dialog of the statistics tab has checkboxes, so only the selected datapoints are deleted (#565)

### 5.1.8 (2026-10-23)
* (@GermanBluefox) The timed relog (`changesRelogInterval`) starts right after the adapter start or a change of the datapoint settings, not only with the first update of the state

### 5.1.7 (2026-10-21)
* (@GermanBluefox) Points buffered by version 4.x (`influxdata.json`) are converted when read, instead of failing with "invalid float value for field 'q': undefined" on every flush (#517)
* (@GermanBluefox) The ports of the docker containers (InfluxDB, Grafana) are reported to js-controller 8 as occupied (`registerUsedResource`). The port of the database itself is no longer counted as a port used by the instance
* (@GermanBluefox) HTTP errors from InfluxDB (e.g. 500 "timeout") are no longer treated as a lost connection (#551)
* (@GermanBluefox) Start values (`relogLastValueOnStart`) are written only once after the adapter start, not on every reconnect (#551)
* (jhoos70) Added support for InfluxDB 3.x (Core and Enterprise): data is written with the line protocol and read with InfluxQL over HTTP (inspired by the InfluxDB 3 fork of [dirkhe](https://github.com/dirkhe/ioBroker.influxdb))

### 5.1.6 (2026-10-13)
* (@GermanBluefox) The "Statistics" tab works now with InfluxDB 2.0

### 5.1.5 (2026-10-13)
* (@GermanBluefox) Added missing translations. Compact mode no longer can exit the whole host process. The Grafana admin password is protected now

## License

The MIT License (MIT)

Copyright (c) 2015-2026 bluefox, apollon77

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.