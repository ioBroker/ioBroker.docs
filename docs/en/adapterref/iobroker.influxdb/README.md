![Logo](admin/influxdb.png)
# ioBroker.influxdb

![Number of Installations](http://iobroker.live/badges/influxdb-installed.svg)
![Number of Installations](http://iobroker.live/badges/influxdb-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.influxdb.svg)](https://www.npmjs.com/package/iobroker.influxdb)

![Test and Release](https://github.com/ioBroker/ioBroker.influxdb/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/influxdb/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.influxdb.svg)](https://www.npmjs.com/package/iobroker.influxdb)

This adapter saves state history into InfluxDB.

**The Adapter supports InfluxDB 1.x and 2.x**

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

With `Influx 2.x` it is now also possible, to store this metadata-information besides the actual value of the state as Influx Tags. Tags are indexed and allow for faster search queries. In addition, they are closely linked to the measurement stored within the db, meaning they will be returned in one table with the queried measurement which makes them much easier to handle, when used outside this adapter. There are limitations with this, however:
- The use of tags for metadata needs to be enabled under `Advanced Settings`. It is disabled by default.
- If you decide to use tags, you cannot continue to use old measurements that were gathered with Influx 1.x, as they are stored in fields.
- Attempting to use an existing database that was set up without enabling the Tag-feature will cause the adapter to fail to initialize, and you will see an error message about it in the log.
  - This also is valid the other way: Once you start using the Tag-feature in a new database, you cannot switch back to using fields for this database.
- This feature is currently only available if you use Influx 2.x. And only if you use the new responsive GUI of Admin 5.

### Migration from InfluxDB 1 to 2

Please refer to the [official guides on how to migrate](https://docs.influxdata.com/influxdb/v2.0/upgrade/v1-to-v2/) from InfluxDB 1.x to 2.x. Especially the [migration instructions for time series data](https://docs.influxdata.com/influxdb/v2.0/upgrade/v1-to-v2/manual-upgrade/#migrate-time-series-data) have been verified to work during adapter testing. Please always create a backup of your data before performing the migration.

After the migration, the adapter is able to work with the old data (e.g. for history-queries) as well. This only applies if you don't decide to [use Tags for storing metadata fields](#Store-metadata-information-as-tags-instead-of-fields).

## Retention Policy
While Influx 1.x supports the concept of multiple **retention policies** for one database, Influx 2 by design allows only one **retention period** per bucket. Therefore, it is only possible to set one policy for the whole database/bucket with this adapter via _Default Settings -> Storage retention_. The retention selected here will be applied on the fly and can be changed at any time. Retention policies set by the adapter will never be deleted, but instead altered if required, as otherwise Influx 1.x would delete all data that the policy applied to.

Please also read [Understanding Retention Policies](RetentionPolicies.md). 

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

### Setup authentication for InfluxDB 1.x (optional)
**NOTE:** Influx DB V2.x relies on organization/token login, instead of username/password! This is only applicable for InfluxDB 1.x

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

## Installation of Grafana (Charting Tool)
There is an additional charting tool for InfluxDB - Grafana.
It must be installed additionally.

Install a current version of Grafana 3.x+ because InfluxDB support is enhanced there in comparison to earlier Grafana versions.

Under debian you can install it as described at http://docs.grafana.org/installation/debian/ .
For ARM platforms you can check vor v3.x at https://github.com/fg2it/grafana-on-raspberry.

Explanation for other OS can be found [here](http://docs.grafana.org/installation/).

After the Grafana is installed, follow [this](http://docs.grafana.org/datasources/influxdb/) to create a connection.

## Default Settings
- **Debounce Time** - Protection against unstable values to make sure that only stable values are logged when the value did not change in the defined amount of Milliseconds. ATTENTION: If values change more often then this setting effectively no value will be logged (because any value is unstable)
- **Blocktime** - Defines for how long after storing the last value no further value is stored. When the given time in Milliseconds is over then the next value that fulfills all other checks is logged.
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
```
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
```
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
sendTo('influxdb.0', 'flushBuffer', {id: 'mbus.0.counter.xxx'
, result => console.log('deleted, error: ' + result.error));
```
if no id is provided all buffers will be flushed.

## History Logging Management via Javascript
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

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 4.0.3 (2024-05-16)
* (bluefox) Some packages were updated

### 4.0.2 (2024-01-03)
* (bluefox) Corrected JSON config
* (Marc-Berg) Corrected filter function in booleanTypeCheckQuery
* (Marc-Berg) Allowed the self-signed certificates using "test connection" button
* (Marc-Berg) The deletion of data from DB was implemented for V2
* (bluefox) Added support for `count` aggregate type on getHistory
* (bluefox) minimal supported node.js version is 16 now

### 3.2.0 (2022-09-19)
* (Apollon77) Adjust cache file to be different per instance when having multiple instances

### 3.1.8 (2022-08-13)
* (Apollon77) Fix crash cases reported by Sentry

### 3.1.7 (2022-06-27)
* (Apollon77) Allows removing a configuration value for "round" in config again

### 3.1.6 (2022-06-27)
* (Apollon77) When not count is provided for aggregate "none" or "onchange" then the limit (default 2000) is used as count to define the number of data to return.

### 3.1.5 (2022-06-12)
* (Apollon77) Make sure the debug log is active, according to the settings

### 3.1.4 (2022-06-08)
* (Apollon77) Performance optimizations for GetHistory calls, especially for "minmax" aggregate method
* (Apollon77) Prevent the crash case reported by Sentry

### 3.1.3 (2022-06-01)
* (Apollon77) Corrected issue when testing connection to InfluxDBv1 with weird passwords

### 3.1.2 (2022-05-31)
* (Apollon77) Workaround an admin issue when testing connection to InfluxDB

### 3.1.0 (2022-05-27)
* (Apollon77) Data are not converted to number if they are other data types on `getHistory` to respect the saved data formats as defined in the datapoint settings for storage.
* (Apollon77) Fix retention change to lower checkbox in UI
* (Apollon77) Allow storeState again to write to InfluxDB for "unknown state ids" - "rules" usage is not supported in for this and storeState would be silently discarded in this case!
* (Apollon77) Fix several crash cases reported by Sentry
* (Apollon77) Make sure disabling "Log changes only" also really do not log the changes anymore
* (Apollon77) Allow storeState and GetHistory also to be called for "unknown ids"

### 3.0.2 (2022-05-12)
* (Apollon77) handles an empty Path for InfluxDB 2.0 correctly in all cases

### 3.0.1 (2022-05-11)
* (Apollon77) BREAKING: Configuration is only working in the new Admin 5 UI!
* (Apollon77) Did bigger adjustments to the recording logic and added a lot of new Features. Please refer to Changelog and Forum post for details.

### 3.0.0 (2022-05-11)
* (Apollon77) Breaking: Configuration is only working in the new Admin 5 UI!
* (Apollon77) Breaking! Did bigger adjustments to the recording logic. Debounce is refined and blockTime is added to differentiate between the two checks
* (Apollon77) Breaking! GetHistory requests now need to deliver the ts in milliseconds! Make sure to use up to date scripts and Charting UIs
* (Apollon77) New setting added to disable the "logging of additional values for charting optimization" - then only the expected data are logged
* (Apollon77) Added new Debug flag to enable/disable debug logging on datapoint level (default is false) to optimize performance
* (Apollon77) Added flag returnNewestEntries for GetHistory to determine which records to return when more entries as "count" are existing for aggregate "none"
* (Apollon77) Flush the buffer for the datapoint which is queried by GetHistory before the query is done, so that all data are in the database
* (Apollon77) make sure id is always returned on GetHistory when addId is set
* (Apollon77) Added aggregate method "percentile" to calculate the percentile (0..100) of the values (requires options.percentile with the percentile level, defaults to 50 if not provided). Basically same as Quantile just different levels are used. Calculation will be done by InfluxDB
* (Apollon77) Added aggregate method "quantile" to calculate the quantile (0..1) of the values (requires options.quantile with the quantile level, defaults to 0.5 if not provided). Basically same as Percentile just different levels are used. Calculation will be done by InfluxDB
* (Apollon77) Added (experimental) method "integral" to calculate the integral of the values. Requires options.integralUnit with the time duration of the integral in seconds, defaults to 60s if not provided. Optionally a linear interpolation can be done by setting options.integralInterpolation to "linear". Calculation will be done byInfluxDB (except for InfluxDB 1 and interpolation "linear", this is done by adapter on raw data)
* (Apollon77) When request contains flag removeBorderValues: true, the result then cut the additional pre and post border values out of the results
* (Apollon77) Enhance the former "Ignore below 0" feature and now allow specifying to ignore below or above specified values. The old setting is converted to the new one
* (Apollon77) Allow to specify custom retention duration in days
* (Apollon77) Added a new message flushBuffer to flush complete buffers or for a given id
* (Apollon77) Allow to specify an additional path for the InfluxDB URL, when Reverse proxies are used or such
* (Apollon77) Make sure that min change delta allows numbers entered with comma (german notation) in all cases
* (Apollon77) Added support to specify how to round numbers on query per datapoint
* (Apollon77) Allow to specify if the last value of a state is logged on startup

### 2.6.3 (2022-03-07)
* (Apollon77) Fix potential crash cases (Sentry IOBROKER-INFLUXDB-4Q)

### 2.6.2 (2022-03-03)
* (Apollon77) Correctly handle db names with hyphens for InfluxDB 1
* (Apollon77) Fix getHistory for non-boolean fields
* (Apollon77) Adjust shard group duration to influxdb proposals

### 2.6.1 (2022-02-28)
* (Excodibur) Address issue with updating retention policy for influxDB 1

### 2.6.0 (2022-02-24)
* (Excodibur) Make request timeout configurable - defaults to 30s
* (Apollon77) Added an option to also accept self-signed ssl certificates for InfluxDB 2.x

### 2.5.2 (2022-02-22)
* (bluefox) Marked interpolated data with `i=true`

### 2.5.0 (2022-02-14)
* (bluefox) Added new messages: 'update', 'delete', 'deleteRange', 'deleteAll' (only for influxdb v1)
* (bluefox) Corrected aggregation of data

### 2.4.0 (2021-12-19)
* (Excodibur) Added expert settings to deactivate health checks for Influx 2 db (There are no health checks for Influx 1)
* (Excodibur) Hide settings not relevant when "log changes only" is not used
* (Apollon77) Allow all number values for debounce again
* (Apollon77) InfluxDB also does not like Infinite values, so ignore them too

### 2.3.0 (2021-12-14)
* (bluefox) Support only `js.controller` >= 3.3.x
* (bluefox) Used system/custom view for collecting the objects
* (bluefox) Implemented option to ignore zero- or/and below zero- values

### 2.2.0 (2021-08-25)
* (Excodibur) Added an option to store metadata (q, ack, from) as tags instead of fields for Influx 2.x - see README!
* (Excodibur) Failure to update/set retention policy will now cause warning instead of error/restart, to support more restrictive DB setups
* (Excodibur/Apollon77) Bug fixes and adjustments

### 2.1.1 (2021-08-13)
* IMPORTANT: You need to re-enter the password after installing this version!
* IMPORTANT: The adapter now requires Admin 5.1.15+ and js-controller 3.3+! For other admin or js-controller versions please use the former v1.9.5 of thi adapter.
* (Excodibur) Added InfluxDB 2.0 support
* (Excodibur) Adjust Retention handling on Database level to work for InfluxDB 1.x and 2.x
* (Excodibur) Removed retention options on datapoint level because never worked and also not supported really by InfluxDB anymore

### 1.9.5 (2021-04-19)
* (bluefox) Added the support of Admin5

### 1.9.4 (2021-01-17)
* (Apollon77) Optimize stop handling

### 1.9.3 (2020-11-07)
* (Apollon77) Crash case prevented (Sentry IOBROKER-INFLUXDB-T, IOBROKER-INFLUXDB-Y)

### 1.9.2 (2020-08-06)
* (Apollon77) crash prevented (Sentry IOBROKER-INFLUXDB-G)

### 1.9.1 (2020-07-22)
* (Apollon77) crash prevented (Sentry IOBROKER-INFLUXDB-E)

### 1.9.0 (2020-07-21)
* (Apollon77) Optimize handling in case of write errors and host unavailabilities

### 1.8.8 (2020-07-18)
* (Apollon77) Some errors prevented
* (Apollon77) Set timeouts for influxdb connections to make sure connectioens do not run forever

### 1.8.7 (2020-05-14)
* (bluefox) added command to read supported features

### 1.8.6 (2020-05-11)
* (Apollon77) make sure disabling of data points while starting adapter do not crash adapter (Sentry IOBROKER-INFLUXDB-7)
* (Apollon77) Make sure all start values are processed correctly
* (Apollon77) More checks to make sure to not crash when states are disabled while data are processed (Sentry IOBROKER-INFLUXDB-8)

### 1.8.5 (2020-05-08)
* (bluefox) set default history if not yet set

### 1.8.4 (2020-05-02)
* (Apollon77) make sure disabling of data points do not crash adapter (Sentry IOBROKER-INFLUXDB-4)

### 1.8.3 (2020-04-29)
* (Apollon77) Fix pot crash case when deleting objects while saving values (Sentry)

### 1.8.2 (2020-04-19)
* __Requires js-controller >= 2.0.0__
* (Apollon77) removed usage of `adapter.objects`
* (Apollon77) check if objects have changed and ignore unchanged
* (Apollon77) Added Sentry for Error Reporting with js-controller 3.0
* (Apollon77) Make sure value undefined is ignored

### 1.4.2 (2017-03-02)
* (Apollon77) Added option to define storage datatype per datapoint inclusing converting the value if needed

### 1.3.4 (2017-02-22)
* (Apollon77) Small fix for older configurations

### 1.3.3 (2017-02-08)
* (Apollon77) Enhance handling of DB outages with mass writes afterwards
* (Apollon77) Small fix for older configurations

### 1.3.2
* (Apollon77) Enhance Min-Delta logic for data points from type mixed

### 1.3.1 (2017-01-16)
* (bluefox) Fix handling of float values in Adapter config and Datapoint config.

### 1.3.0 (2016-12-02)
* (Apollon77) Added messages enableHistory/disableHistory
* (Apollon77) Added support to log changes only if value differs a minimum value for numbers

### 1.2.1 (2016-11)
* (Apollon77) small enhancements and fixes

### 1.2.0 (2016-11-05)
* (Apollon77) support re-logging also for states that are not updated often (timed relog using relog-Interval)
* (Apollon77) try to solve easy type conflicts and convert float <--> boolean if needed
* (Apollon77) enhance `getHistory` to retrieve also boundary values better by selecting also points outside of the given time boundaries

### 1.1.1 (2016-11-03)
* (Apollon77) small final change on custom dialog

### 1.1.0 (2016-10-29)
* (Apollon77) optimizations and enhancements for high-traffic situations
* (Apollon77) Bugfix if InfluxDB is unavailable
* (Apollon77) Added functions getConflictingPoints and resetConflictingPoints
* (Apollon77) Added option to re-log unchanged values to make it easier for visualization

### 1.0.1 (2016-10-18)
* (Apollon77) changed storing values to asynchronous way
* (Apollon77) Added support for `minmax` aggregate type on getHistory

### 1.0.0 (2016-10-10)
* (Apollon77) bulk write into DB
* (Apollon77) buffer values if no connection to DB
* (bluefox) connection indication

### 0.5.3 (2016-09-30)
* (Apollon77) enhance and correct documentation
* (Apollon77) implement "step" calculation for aggregation if only "count" is set

### 0.5.2 (2016-09-25)
* (Apollon77) change custom queries. Fix delete DB

### 0.5.1 (2016-09-20)
* (Apollon77) Step is given as Milliseconds and not Seconds!

### 0.5.0 (2016-08-30)
* (bluefox) Compatible only with new admin

### 0.4.0 (2016-08-27)
* (bluefox) change name of object from "history" to "custom"

### 0.3.1 (2016-06-07)
* (bluefox) better error handling

### 0.3.1 (2016-06-05)
* (bluefox) no support of influxDB 0.8 (please update)

### 0.3.0 (2016-05-18)
* (bluefox) make name of DB configurable

### 0.2.0 (2016-04-30)
* (bluefox) support of milliseconds instead of seconds

### 0.1.2 (2015-12-19)
* (bluefox) make onchange work

### 0.1.1 (2015-12-19)
* (bluefox) retention policy for 0.9.x

### 0.1.0 (2015-12-19)
* (bluefox) supported InfluxDB version 0.9.x and 0.8.x

### 0.0.2 (2015-12-14)
* (bluefox) change supported InfluxDB version to 0.9.x

### 0.0.1 (2015-12-12)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2015-2024 bluefox, apollon77

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
