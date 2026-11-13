![Logo](admin/sql.png)
# ioBroker.sql

![Number of Installations](http://iobroker.live/badges/sql-installed.svg) ![Number of Installations](http://iobroker.live/badges/sql-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.sql.svg)](https://www.npmjs.com/package/iobroker.sql)
[![Downloads](https://img.shields.io/npm/dm/iobroker.sql.svg)](https://www.npmjs.com/package/iobroker.sql)
[![Tests](https://travis-ci.org/ioBroker/ioBroker.sql.svg?branch=master)](https://travis-ci.org/ioBroker/ioBroker.sql)

[![NPM](https://nodei.co/npm/iobroker.sql.png?downloads=true)](https://nodei.co/npm/iobroker.sql/) 

This adapter saves state history into SQL DB.

Supports PostgreSQL, mysql, Microsoft SQL Server and sqlite.
You can leave port 0 if the default port is desired.

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting, see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Settings

## Connection Settings
- **DB Type**: Type of the SQL DB: MySQL, PostgreSQL, MS-SQL or SQLite3
- **Host**: IP address or host name with SQL Server
- **Unix socket** (MySQL only): Path of a local unix socket, e.g. `/var/run/mysqld/mysqld.sock`. When set, the adapter connects through that socket and ignores Host and Port, which are hidden. Useful when the server runs on the same machine — it is faster than TCP — and it is the only way to reach a database on the Docker host from a container on a macvlan network.
- **Port**: Port of SQL Server (leave blank if not sure)
- **Database name**: Database name. Default iobroker
- **User**: Username for SQL. Must exist in the DB.
- **Password**: Password for SQL. It is stored encrypted in ioBroker.
- **Password confirm**: Just repeat password here.
- **Encrypt**: Some DBs support encryption.
- **Round real to**: Number of digits after the comma.
- **Allow parallel requests**: Allow simultaneous SQL requests to DB.
- **Statistics tab**: lists every ID in the database with its storage type, status (logged / logging off / state deleted), number of values, estimated size and the covered time range. The **Clean up** button first shows what would be deleted and removes it only after confirmation. States that still exist but merely have logging switched off are excluded unless you tick the checkbox, because their history is still reachable and may be wanted.
- **Do not create database**: Activate this option if a database already created (e.g. by administrator) and the ioBroker-user does not have enough rights to create a DB.
- **Relax PostgreSQL commit durability**: PostgreSQL only, off by default. Runs the adapter's own connections with `synchronous_commit=off`, so a commit no longer waits until the write-ahead log is flushed to disk. This strongly reduces disk I/O and wear, e.g. on SD cards and consumer SSDs. If the PostgreSQL server crashes, the values stored in the last few hundred milliseconds can be lost; unlike `fsync=off` this setting cannot corrupt the database. Other clients of the same server are not affected.

## Default Settings
- **Debounce Time** - Protection against unstable values to make sure that only stable values are logged when the value did not change in the defined amount of Milliseconds. ATTENTION: If values change more often than this setting effectively, no value will be logged (because any value is unstable)
- **Blocktime** - Defines for how long after storing the last value no further value is stored. When the given time in Milliseconds is over, then the next value that fulfills all other checks is logged.
- **Record changes only** - This function makes sure that only changed values are logged if they fulfill other checks (see below). Same values will not be logged.
- **still record the same values (seconds)** - When using "Record changes only" you can set a time interval in seconds here after which also unchanged values will be re-logged into the DB. You can detect the values re-logged by the adapter with the "from" field.
- **Minimum difference from the last value** - When using "Record changes only" you can define the required minimum difference between the new value and the last value. If this is not reached, the value is not recorded.
- **ignore 0 or null values (==0)** - You can define if 0 or null values should be ignored.
- **ignore values below zero (<0)** - You can define if values below zero should be ignored.
- **Disable charting optimized logging of skipped values** - By default, the adapter tries to record the values for optimized charting. This can mean that additional values (that e.g. not fulfilled all checks above) are logged automatically. If this is not wanted, you can disable this feature.
- **Alias-ID** - You can define an alias for the ID. This is useful if you have changed a device and want to have continuous data logging. Please consider switching to real alias States in the future!
- **Storage retention** - How many values in the past will be stored on disk. Data are deleted when the time is reached as soon as new data should be stored for a datapoint.
- **Maximal number of stored in RAM values** - Define how many numbers of values will be held in RAM before persisting them on disk. You can control how much I/O is done.
- **Enable enhanced debug logs for the datapoint** - If you want to see more detailed logs for this datapoint, you can enable this option. You still need to enable "debug" loglevel for these additional values to be visible! This helps in debugging issues or understanding why the adapter is logging a value (or not).

Most of these values can be pre-defined in the instance settings and are then pre-filled or used for the datapoint.

## Database installation tips

### MS-SQL:
Use `localhost\instance` for the host and check TCP/IP connections enabled.
https://msdn.microsoft.com/en-us/library/bb909712(v=vs.90).aspx

### SQLite:
is a "file"-DB and cannot manage too many events. If you have a big amount of data, use the real DB, like PostgreSQL and co.

SQLite DB must not be installed extra. It is just a file on disk, but to install it you require build tools on your system. For linux, just write:

```bash
sudo apt-get install build-essential
```

For windows install node.js with the "Automatically install the necessary tools..."-option and then rebuild the native SQLite module, e.g:

```bash
iobroker stop sql
iobroker rebuild sqlite3
iobroker start sql
```

### MySQL:
You can install mysql on linux systems as following:

```bash
apt-get install mysql-server mysql-client

mysql -u root -p

CREATE USER 'iobroker'@'%' IDENTIFIED BY 'iobroker';
GRANT ALL PRIVILEGES ON * . * TO 'iobroker'@'%';
FLUSH PRIVILEGES;
```

If required, edit */etc/mysql/my.cnf* to set bind to IP-Address for remote connecting.

**Warning**: iobroker user is "admin". If required, give limited rights to iobroker user.

On the "windows" it can be easily installed via installer: https://dev.mysql.com/downloads/installer/.

Pay attention to the authentication method. The new encryption algorithm in MySQL 8.0 is not yet supported by `node.js` and you must select legacy authentication method.

![Windows](img/WindowsMySQLinstaller.png)

## Structure of the DBs
The default Database name is `iobroker`, but it can be changed in the configuration.
### Sources
This table is a list of adapter's instances that wrote the entries. (state.from)

| DB         | Name in query        |
|------------|----------------------|
| MS-SQL     | iobroker.dbo.sources |
| MySQL      | iobroker.sources     |
| PostgreSQL | sources              |
| SQLite     | sources              |

Structure:

| Field | Type                                       | Description                               |
|-------|--------------------------------------------|-------------------------------------------|
| id    | INTEGER NOT NULL PRIMARY KEY IDENTITY(1,1) | unique ID                                 |
| name  | varchar(255) / TEXT                        | instance of adapter, that wrote the entry |

*Note:* MS-SQL uses varchar(255), and others use TEXT

### Data points
This table is a list of data points. (IDs)

| DB         | Name in query           |
|------------|-------------------------|
| MS-SQL     | iobroker.dbo.datapoints |
| MySQL      | iobroker.datapoints     |
| PostgreSQL | datapoints              |
| SQLite     | datapoints              |

Structure:

| Field | Type                                       | Description                                     |
|-------|--------------------------------------------|-------------------------------------------------|
| id    | INTEGER NOT NULL PRIMARY KEY IDENTITY(1,1) | unique ID                                       |
| name  | varchar(255) / TEXT                        | ID of variable, e.g. hm-rpc.0.JEQ283747.1.STATE |
| type  | INTEGER                                    | 0 - number, 1 - string, 2 - boolean             |

*Note:* MS-SQL uses varchar(255), and others use TEXT

### Numbers
Values for states with type "number". **ts** means "time series".

| DB         | Name in query          |
|------------|------------------------|
| MS-SQL     | iobroker.dbo.ts_number |
| MySQL      | iobroker.ts_number     |
| PostgreSQL | ts_number              |
| SQLite     | ts_number              |

Structure:

| Field  | Type                                       | Description                                                                                                               |
|--------|--------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| id     | INTEGER                                    | ID of state from "Data points" table                                                                                      |
| ts     | BIGINT / INTEGER                           | Time in ms till epoch. Can be converted to time with "new Date(ts)"                                                       |
| val    | REAL                                       | Value                                                                                                                     |
| ack    | BIT/BOOLEAN                                | Is acknowledged: 0 - not ack, 1 - ack                                                                                     |
| _from  | INTEGER                                    | ID of source from "Sources" table                                                                                         |
| q      | INTEGER                                    | Quality as number. You can find description [here](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

*Note:* MS-SQL uses BIT, and others use BOOLEAN. SQLite uses for ts INTEGER and all others BIGINT.

The user can define additional to type `number` the functionality of `counters`. For this purpose, the following table is created:

| DB         | Name in the query       |
|------------|-------------------------|
| MS-SQL     | iobroker.dbo.ts_counter |
| MySQL      | iobroker.ts_counter     |
| PostgreSQL | ts_counter              |
| SQLite     | ts_counter              |

Structure:

| Field  | Type             | Description                                                         |
|--------|------------------|---------------------------------------------------------------------|
| id     | INTEGER          | ID of state from "Data points" table                                |
| ts     | BIGINT / INTEGER | Time in ms till epoch. Can be converted to time with "new Date(ts)" |
| val    | REAL             | Value                                                               |
 
This table stores the values when the counter was exchanged and the value does not increase, but failed to zero or lower value. 

### Strings
Values for states with type `string`.

| DB         | Name in query          |
|------------|------------------------|
| MS-SQL     | iobroker.dbo.ts_string |
| MySQL      | iobroker.ts_string     |
| PostgreSQL | ts_string              |
| SQLite     | ts_string              |

Structure:

| Field  | Type                  | Description                                                                                                               |
|--------|-----------------------|---------------------------------------------------------------------------------------------------------------------------|
| id     | INTEGER               | ID of state from "Data points" table                                                                                      |
| ts     | BIGINT                | Time in ms till epoch. Can be converted to time with "new Date(ts)"                                                       |
| val    | TEXT                  | Value                                                                                                                     |
| ack    | BIT/BOOLEAN           | Is acknowledged: 0 - not ack, 1 - ack                                                                                     |
| _from  | INTEGER               | ID of source from "Sources" table                                                                                         |
| q      | INTEGER               | Quality as number. You can find description [here](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

*Note:* MS-SQL uses BIT, and others use BOOLEAN. SQLite uses for ts INTEGER and all others BIGINT.

### Booleans
Values for states with type `boolean`.

| DB         | Name in query           |
|------------|-------------------------|
| MS-SQL     | iobroker.dbo.ts_bool    |
| MySQL      | iobroker.ts_bool        |
| PostgreSQL | ts_bool                 |
| SQLite     | ts_bool                 |

Structure:

| Field  | Type        | Description                                                                                                               |
|--------|-------------|---------------------------------------------------------------------------------------------------------------------------|
| id     | INTEGER     | ID of state from "Data points" table                                                                                      |
| ts     | BIGINT      | Time in ms till epoch. Can be converted to time with "new Date(ts)"                                                       |
| val    | BIT/BOOLEAN | Value                                                                                                                     |
| ack    | BIT/BOOLEAN | Is acknowledged: 0 - not ack, 1 - ack                                                                                     |
| _from  | INTEGER     | ID of source from "Sources" table                                                                                         |
| q      | INTEGER     | Quality as number. You can find description [here](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

*Note:* MS-SQL uses BIT, and others use BOOLEAN. SQLite uses for ts INTEGER and all others BIGINT.

## Access values from Javascript adapter
The sorted values can be accessed from JavaScript adapter.

* Get 50 last stored events for all IDs
```js
sendTo('sql.0', 'getHistory', {
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
```js
var end = Date.now();
sendTo('sql.0', 'getHistory', {
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
- **start** - (optional) time in ms - *Date.now()*
- **end** - (optional) time in ms - *Date.now()*, by default is `(now + 5000 seconds)`
- **step** - (optional) used in aggregate (max, min, average, total, ...) step in ms of intervals
- **count** - number of values if aggregate is 'onchange' or number of intervals if other aggregate method. Count will be ignored if a step is set, else default is 500 if not set
- **from** - if *from* field should be included in answer
- **ack** - if *ack* field should be included in answer
- **q** - if *q* field should be included in answer
- **addId** - if *id* field should be included in answer
- **limit** - do not return more entries than limit
- **round** - round result to number of digits after decimal point. Default: "Round real to" of the datapoint, then of the instance. The stored values are not changed.
- **ignoreNull** - if null values should be included (false), replaced by last not null value (true) or replaced with 0 (0)
- **removeBorderValues** - By default, additional border values are returned to optimize charting. Set this option to true if this is not wanted (e.g. for script data processing)
- **returnNewestEntries** - The returned data are always sorted by timestamp ascending. When using aggregate "none" and also providing "count" or "limit", this means that normally the oldest entries are returned (unless no start data is provided). Set this option to true to get the newest entries instead.
- **aggregate** - aggregate method (Default: `average`):
    - *minmax* - used special algorithm. Splice the whole time range in small intervals and find for every interval max, min, start and end values.
    - *max* - Splice the whole time range in small intervals and find for every interval max value and use it for this interval (nulls will be ignored).
    - *min* - Same as max, but take minimal value.
    - *average* - Same as max, but take average value.
    - *total* - Same as max, but calculate total value.
    - *count* - Same as max, but calculate number of values (nulls will be calculated).
    - *percentile* - Calculate n-th percentile (n is given in `options.percentile` or defaults to 50 if not provided).
    - *quantile* - Calculate n quantile (n is given in `options.quantile` or defaults to 0.5 if not provided).
    - *integral* - Calculate integral (additional parameters see below).
    - *none* - No aggregation at all. Only raw values in a given period.
- **percentile** - (optional) when using aggregate method "percentile" defines the percentile level (0..100)(defaults to 50)
- **quantile** - (optional) when using aggregate method "quantile" defines the quantile level (0..1)(defaults to 0.5)
- **integralUnit** - (optional) when using aggregate method "integral" defines the unit in seconds (default to 60s). e.g. to get integral in hours for Wh or such, set to 3600.
- **integralInterpolation** - (optional) when using aggregate method "integral" defines the interpolation method (defaults to "none").
    - *linear* - linear interpolation
    - *none* - no/stepwise interpolation

The first and last points will be calculated for aggregations, except aggregation `none`.
If you manually request some aggregation, you should ignore first and last values because they are calculated from values outside of a period.

## Get counter
User can ask the value of some counter (type=number, counter=true) for a specific period.

```js
var now = Date.now();
// get consumption value for last 30 days
sendTo('sql.0', 'getCounter', {
    id: 'system.adapter.admin.0.memRss',
    options: {
        start:      now - 3600000 * 24 * 30,
        end:        now,
    }
}, result => {
    console.log(`In last 30 days the consumption was ${result.result} kWh`);    
});
```
If the counter-device is replaced, it will be calculated too.

## Custom queries
The user can execute custom queries on tables from javascript adapter:

```js
sendTo('sql.0', 'query', 'SELECT * FROM datapoints', function (result) {
    if (result.error) {
        console.error(result.error);
    } else {
        // show result
         console.log('Rows: ' + JSON.stringify(result.result));
    }
});
```

Or get entries for the last hour for ID=system.adapter.admin.0.memRss
```js
sendTo('sql.0', 'query', 'SELECT id FROM datapoints WHERE name="system.adapter.admin.0.memRss"', function (result) {
    if (result.error) {
        console.error(result.error);
    } else {
        // show result
        console.log('Rows: ' + JSON.stringify(result.result));
        var now = new Date();
        now.setHours(-1);
        sendTo('sql.0', 'query', 'SELECT * FROM ts_number WHERE ts >= ' + now.getTime() + ' AND id=' + result.result[0].id, function (result) {
            console.log('Rows: ' + JSON.stringify(result.result));
        });
    }
});
```

*Note:*

Depending on the database, the database name or database name + schema must be inserted before the table name - see boxes above under 'Structure of the DBs'.

Example if your database is called 'iobroker':

| DB      | Name in query                               |
|---------|---------------------------------------------|
| MS-SQL  | `SELECT * FROM iobroker.dbo.datapoints ...` |
| MySQL   | `SELECT * FROM iobroker.datapoints ...`     |

## Data browser and export
The instance settings contain a tab **Data browser**: on the left all datapoints that have data in the
database, on the right the stored values of the selected one. The values can be paged through, edited,
deleted and new ones can be inserted. The tab needs a running instance.

The export button in its toolbar writes all values of the selected datapoint in the selected time range
into a file, oldest first:

- **CSV** with the columns `ts` (milliseconds since 1970, UTC), `time` (local time), `val`, `ack`, `q` and
  `from`. Column and decimal separator can be chosen; the preselection (`;` and `,` for most languages,
  `,` and `.` for English and Chinese) is what Excel usually expects with the language of the admin.
- **JSON** as an array of `{ts, val, ack, q, from}` - the format [`storeState`](#storestate) accepts, so
  the values can be written back, e.g. to another datapoint:

```javascript
const fs = require('fs');
const values = JSON.parse(fs.readFileSync('/opt/export/hm-rpc.0.ABC123.1.TEMPERATURE.json', 'utf8'));
sendTo('sql.0', 'storeState', { id: 'javascript.0.temperatureCopy', state: values }, result =>
    console.log(JSON.stringify(result)),
);
```

In contrast to `getRawEntries`, both formats contain `ack` and the values of a boolean datapoint as
`true`/`false` in every database, so that `storeState` creates a boolean datapoint again.

The export reads the range in time windows of a few thousand values each, every one a range query on the
`(id, ts)` index. So even for a datapoint with millions of values the database never has to skip
millions of rows for an `OFFSET`. A very large export still takes a while and needs the memory of the
browser for the whole file.

The component is a JSON-Config `custom` component. Its sources are in `src-admin`, the built bundle in
`admin/custom` is committed:

```bash
npm run npm:admin      # install the dependencies of the component (only once)
npm run build:admin    # clean, build and copy into admin/custom
cd src-admin && npm start   # development server on http://localhost:4173
```

The datapoint list comes from the message **getDatapoints**, which can also be used from scripts:

```js
sendTo('sql.0', 'getDatapoints', {}, result => {
    // [{id: 'system.adapter.admin.0.memRss', index: 1, type: 'Number'}, ...]
    console.log(JSON.stringify(result.result));
});
```

It returns every datapoint of the `datapoints` table - including the ones whose logging is disabled -
sorted by ID. In contrast to `getDpOverview`, it does not determine the first timestamp of every
datapoint and answers immediately.

## Read raw values
`getHistory` is made for charts: it aggregates, interpolates, rounds and adds the values directly before and
after the requested range. To see and page through the stored rows exactly as they are in the database, use
**getRawEntries**:

```js
sendTo(
    'sql.0',
    'getRawEntries',
    {
        id: 'system.adapter.admin.0.memRss',
        start: Date.now() - 3600000, // optional, inclusive
        end: Date.now(),             // optional, inclusive
        limit: 100,                  // optional, default 100, maximum 5000
        offset: 0,                   // optional, default 0
        sort: 'desc',                // optional, 'desc' (newest first, default) or 'asc'
        noTotal: false,              // optional, true skips counting the entries: `total` is then missing
    },
    result => {
        if (result.error) {
            console.error(result.error);
        } else {
            // total = number of all entries matching start/end, so a table can page through them
            console.log(`${result.result.length} of ${result.total} entries`);
            // [{ts: 1589458809352, val: 51.5, ack: 1, q: 0, from: 'system.adapter.admin.0'}, ...]
            console.log(JSON.stringify(result.result));
        }
    },
);
```

The answer additionally contains `id`, `index` (the ID in the `datapoints` table), `type`
(`Number`, `String` or `Boolean`), `table` (`ts_number`, `ts_string` or `ts_bool`) and the used
`limit`, `offset` and `sort`.

The values are returned as they come from the database and are **not** converted: `ack` and boolean values
are `0`/`1` in most databases, and `val` of a string datapoint is the stored string. `from` is `null` if no
source was stored. Only `ts` is always a number, although PostgreSQL and MS SQL deliver it as string.

Counting the entries is a scan of the whole range. A caller that reads a long range in consecutive windows
(`start`/`end` of one window inclusive) needs the count only once and can pass `noTotal: true` for all
other requests.

Like `update`, `delete` and `storeState`, this works for datapoints whose logging is disabled too, as long as
they still have entries in the database. If the datapoint is unknown, the answer contains an `error`.

## storeState

If you want to write other data into the SQL database, you can use the build
in system function **storeState**. This function can also be used to convert
data from other History adapters like InfluxDB or SQL.

A successful response does not mean that the data is really written out to the disk. It just means that they were processed!

The given ids are not checked against the ioBroker database and do not need to be set up or enabled there. If own IDs are used without settings, then the "rules" parameter is not supported and will result in an error. The default "Maximal number of stored in RAM values" is used for such IDs.

The Message can have one of the following three formats:

1. one ID and one state object
2. one ID and array of state objects
3. array of multiple IDs with one state object each

```javascript
// 1.
sendTo('sql.0', 'storeState', {
    id: 'mbus.0.counter.xxx',
    state: {
        ts: 1589458809352,
        val: 123,
        ack: false,
        from: 'system.adapter.whatever.0'
    }
}, result => console.log('added'));

// 2.
sendTo('sql.0', 'storeState', {
    id: 'mbus.0.counter.xxx',
    state: [
        {
            ts: 1589458809352,
            val: 123,
            ack: false,
            from: 'system.adapter.whatever.0'
        },
        {
            ts: 1589458809353,
            val: 123,
            ack: false,
            from: 'system.adapter.whatever.0'
        }
    ]
}, result => console.log('added'));

// 3.
sendTo('sql.0', 'storeState', [
    {
        id: 'mbus.0.counter.xxx',
        state: {
            ts: 1589458809352,
            val: 123,
            ack: false,
            from: 'system.adapter.whatever.0'
        }
    },
    {
        id: 'mbus.0.counter.yyy',
        state: {
            ts: 1589458809353,
            val: 123,
            ack: false,
            from: 'system.adapter.whatever.0'
        }
    }
], result => console.log('added'));
```

Additionally, you can add attribute `rules: true` in a message to activate all rules, like `counter`, `changesOnly`, `de-bounce` and so on.

In case of errors, an array with all single error messages is returned and also a successCount to see how many entries were stored successfully.

## delete state
If you want to delete entry from the Database, you can use the build in system function **delete**:

```javascript
sendTo('sql.0', 'delete', [
    {id: 'mbus.0.counter.xxx', state: {ts: 1589458809352}}, 
    {id: 'mbus.0.counter.yyy', state: {ts: 1589458809353}},
], result => console.log('deleted'));
```

To delete ALL history data for some data point, execute:

```javascript
sendTo('sql.0', 'deleteAll', [
    {id: 'mbus.0.counter.xxx'}, 
    {id: 'mbus.0.counter.yyy'}
], result => console.log('deleted'));
``` 

To delete history data for some data point and for some range, execute:

```javascript
sendTo('sql.0', 'deleteRange', [
    {id: 'mbus.0.counter.xxx', start: '2019-01-01T00:00:00.000Z', end: '2019-12-31T23:59:59.999'}, 
    {id: 'mbus.0.counter.yyy', start: 1589458809352, end: 1589458809353}
], result => console.log('deleted'));
``` 

Time could be ms since epoch or ans string, that could be converted by JavaScript Date object.

Values will be deleted including defined limits. `ts >= start AND ts <= end`

All three commands accept one single data point as object too, e.g. `sendTo('sql.0', 'deleteAll', {id: 'mbus.0.counter.xxx'}, result => ...)`.
In this case, the answer is sent after the deletion was executed and it is either `{success: true}` or `{error: "..."}`.
With an array, the answer is sent immediately and does not tell anything about the single deletions.

## change state
If you want to change entry's value, quality or acknowledge flag in the database, you can use the build in system function **update**:

```javascript
sendTo('sql.0', 'update', [
    {id: 'mbus.0.counter.xxx', state: {ts: 1589458809352, val: 15, ack: true, q: 0}}, 
    {id: 'mbus.0.counter.yyy', state: {ts: 1589458809353, val: 16, ack: true, q: 0}},
], result => console.log('deleted'));
```

`ts` is mandatory. At least one other flag must be included in a state object.

Be careful with `counters`. The `counters` in DB will not be reset, and you must handle it yourself. 

## History Logging Management via Javascript
The adapter supports enabling and disabling of history logging via JavaScript and also retrieving the list of enabled data points with their settings.

### enable
The message requires having the "id" of the data point. Additionally, optional "options" to define the data point specific settings:

```javascript
sendTo('sql.0', 'enableHistory', {
    id: 'system.adapter.sql.0.memRss',
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
        //successful enabled
    }
});
```

### disable
The message requires having the "id" of the data point.

```javascript
sendTo('sql.0', 'disableHistory', {
    id: 'system.adapter.sql.0.memRss',
}, function (result) {
    if (result.error) {
        console.log(result.error);
    }
    if (result.success) {
        // successful enabled
    }
});
```

### get List
The message has no parameters.

```javascript
sendTo('sql.0', 'getEnabledDPs', {}, function (result) {
    //result is object like:
    console.log({
        "system.adapter.sql.0.memRss": {
            "changesOnly":true,
            "debounce":0,
            "retention":31536000,
            "maxLength":3,
            "changesMinDelta":0.5,
            "enabled":true,
            "changesRelogInterval":0,
            "aliasId": ""
        },
        // ...
    });
});
```

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 4.5.0 (2026-11-10)
* (@Schimi1983) The database password is stored encrypted (`encryptedNative`). A password saved with an older version is encrypted once on the first start, the instance then restarts by itself. Note: after going back to 4.4.1 or older, enter the password in the instance settings again (#587)
* (@DutchmanNL) PostgreSQL: new opt-in setting "Relax PostgreSQL commit durability" runs the adapter's connections with `synchronous_commit=off`, so commits no longer wait for the disk flush. This strongly reduces disk I/O and wear. A crash of the PostgreSQL server can lose the values of the last few hundred milliseconds; the database cannot be corrupted (#516)

### 4.4.1 (2026-11-08)
* (@GermanBluefox) `getDpOverview` with an empty `datapoints` table answers again and returns its connection. Before, the request never got an answer and the connection stayed borrowed, which with SQLite (one connection) blocked every further request (#587)
* (@GermanBluefox) "Round real to" of a datapoint now applies to `getHistory`. Before, the field was shown but had no effect, only the setting of the instance counted. As with the instance setting, the values are rounded when read, the stored values stay as they are (#587)
* (@GermanBluefox) phpMyAdmin container: new instances listen on `127.0.0.1` by default instead of on all network interfaces. Existing instances keep their setting; to reach phpMyAdmin from another machine, choose the IP in the instance settings (#587)
* (@Schimi1983) PostgreSQL: text values, datapoint IDs and sources are written as escape string literals (`E'...'`), so a backslash can no longer end a value early when `standard_conforming_strings` is off for the database or the user (#587)

### 4.4.0 (2026-11-05)
* (@Schimi1983) Booleans are stored the same in all databases: `on`/`yes`/`true`/`1` as true, `off`/`no`/`false`/`0` and an empty text as false, any other text as NULL. Before, PostgreSQL failed the whole batch on such a text or a number, SQLite and MS SQL stored `off` as true. `storeState` says "values are kept, do not send them again" also when its values were written together with others of the same datapoint (#587)
* (@Schimi1983) Messages are checked before they reach the database: `update`, `delete`, `deleteRange`, `deleteAll`, `storeState`, `getHistory` and `getCounter` refuse an entry without an ID, with a timestamp that is not a point in time, or with a value that does not fit the stored type, and report it in the answer instead of writing it into the SQL. Before, a `deleteRange` with an unparsable `start` deleted the whole history of the datapoint, a `delete` without an ID the history of the first datapoint of the table, a `start` given as a numeric string became `NaN`, and a value with a quote or a quote in a datapoint ID broke the statement (PostgreSQL, SQLite, MSSQL: quotes are now stored as they are instead of being removed, `Infinity` is stored as NULL). `storeState` with a value that is not a number for a numeric datapoint is answered again instead of waiting forever; a list of entries is answered after the last entry was written, with the errors of the entries that failed; a message with an unexpected shape no longer stops the adapter; "Maximum concurrent connections" of 0 no longer blocks every write (#587)
* (@Schimi1983) MySQL: if the server's `sql_mode` contains `NO_BACKSLASH_ESCAPES`, the adapter removes it for its own connections and says so in the log - with that mode, values with `'` or `\` cannot be stored safely. The server's setting and other clients are not changed. Booleans: `on`/`yes`/`true`/`1` are stored as true, `off`/`no`/`false`/`0` and an empty text as false, any other text as NULL instead of true; a number is true unless it is 0 (#587)
* (@Schimi1983) Stopping with many datapoints no longer loses values: the buffers of all datapoints are written at once instead of 50 per second, which did not finish within the 10 s stop timeout beyond about 450 datapoints. SQLite: buffered values of more than 100 datapoints no longer hit the task limit ("Cannot queue new requests"), a datapoint has one queued insert that takes further values (#587)
* (@Schimi1983) MySQL: values, datapoint IDs and sources are passed as bound parameters instead of being inlined. Text values keep their single quotes (`it's` was stored as `its`), a value ending with a backslash no longer makes the whole batch fail, and the `delete`/`update`/`storeState` messages cannot inject SQL any more. `NaN`/`Infinity` are stored as NULL instead of failing the batch (#587)
* (copilot) Adapter requires node.js >= 22.19.0 now
* (@GermanBluefox) Fixed: values stored without `from` were missing in `getHistory` with `from: true`, e.g. in the history data of admin
* (@Schimi1983) A failed write is no longer silently dropped: the error is passed on, so `storeState` reports it instead of `success: true`. If the database was not reachable, the values are kept and written with the next write of the datapoint (at most 2000 per datapoint, the oldest are dropped first, with a warning). Pooled connections that were idle for more than 60 s are closed and replaced, so a server-side `wait_timeout` no longer resets them; the warning "SQL connection lost" every few minutes on hosted databases is gone (#587)
* (@GermanBluefox) The values kept while the database is not reachable are also limited to 200000 for all datapoints together (about 70 MB), so a long outage with many datapoints can no longer exhaust the memory. The warning about them is one line per minute for all datapoints instead of one per datapoint, and the error of `storeState` says when the values were kept, so they are not sent twice (#587)
* (@GermanBluefox) Data browser: the values of a datapoint can be exported as CSV (e.g. for Excel) or as JSON (the format of `storeState`) for the selected time range. `getRawEntries` returns up to 5000 entries per call and accepts `noTotal` to skip the count
* (@GermanBluefox) Data browser: PostgreSQL and MS SQL showed the time of a value as a bare number, because `getRawEntries` returned `ts` as string there
* (@GermanBluefox) MySQL/MariaDB and MS SQL: datapoints whose IDs differ only in case (e.g. `alias.0.Licht` and `alias.0.licht`) or by trailing spaces no longer write into one series with the type of the first one. The second one gets its own row from now on; values that were already mixed stay where they are (#588)
* (@GermanBluefox) MS SQL: `@azure/msal-node`, a dependency of the driver, was updated to 7.2.0 because of CVE-2026-109461 (GHSA-xcx6-jx8p-x3h5). It concerns the Azure authorization code flow, which the adapter does not use

### 4.3.0 (2026-10-29)
* (@GermanBluefox) `getHistory` accepts `intervalBorders`: the client can send the borders of the intervals itself, e.g. the local days of a chart. With `count` or `step` every interval after a switch of the daylight saving time ended an hour away from the midnight, so a value written at 23:59:59 was shown on the next day (ioBroker/ioBroker.echarts#1311)
* (@Schimi1983) Fixed every write failing with "Can't add new command when connection is in closed state" until a restart: a connection the server closed while a statement was running was handed out again, because mysql2 reports that only to the statement and not as a connection error. Such a connection is also no longer handed to a write that waits for a free connection, and the reconnect is logged as a warning in this case too (#587)
* (@Schimi1983) Fixed "Record changes only" storing every string value again: the reference value was overwritten with the SQL literal, or with the converted value when a storage type is set (#587)
* (@Schimi1983) "Reset DB" no longer drops the whole database when "Do not create database" is set, only the adapter's tables. MSSQL: `DBCC FREEPROCCACHE` is then skipped too, as it needs server rights (#587)
* (@Schimi1983) "Ignore values below/above" now also works with the limit 0 (users who set 0 now get the filter they configured) and accepts a decimal comma (#587)
* (@Schimi1983) PostgreSQL: the password is no longer printed in the connection log (#587)
* (@Schimi1983) Fixed a crash when a datapoint is disabled while its database ID is being looked up (#587)
* (@Schimi1983) Disabling the logging of a datapoint with an alias ID works again (#587)
* (@Schimi1983) Admin: every input has size attributes for all screen widths, "Do not create database" no longer grows wider on large screens (#583)
* (@Schimi1983) Added the Ukrainian title and description, admin >= 7.6.20 is required (#583)
* (@Schimi1983) `password` and `dockerMysql.rootPassword` are no longer readable by other adapters (`protectedNative`, #583). Note: a script that reads `system.adapter.sql.0` with `getObject` and writes it back with `setObject` now deletes both passwords; use `extendObject` instead
* (@Schimi1983) README: the reinstall hint for SQLite uses `iobroker rebuild sqlite3` instead of `npm install` (#583)
* (@Schimi1983) CI: the job with the unit and SQLite tests is named `adapter-tests`, as the repository checker expects, and also runs on Node.js 26 (#583)
* (@GermanBluefox) Updated packages, `@iobroker/aggregate` 1.1.0

### 4.2.1 (2026-10-13)
* (@GermanBluefox) The error of a failed save or delete in the data browser is no longer hidden by the reload of the table

## License

The MIT License (MIT)

Copyright (c) 2015-2026 bluefox <dogafox@gmail.com>, Apollon77

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