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
- **Port**: Port of SQL Server (leave blank if not sure)
- **Database name**: Database name. Default iobroker
- **User**: Username for SQL. Must exist in the DB.
- **Password**: Password for SQL.
- **Password confirm**: Just repeat password here.
- **Encrypt**: Some DBs support encryption.
- **Round real to**: Number of digits after the comma.
- **Allow parallel requests**: Allow simultaneous SQL requests to DB.
- **Do not create database**: Activate this option if a database already created (e.g. by administrator) and the ioBroker-user does not have enough rights to create a DB.

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

For windows install node.js with "Automatically install the necessary tools..."-option and then reinstall the adapter, e.g:

```bash
cd /opt/iobroker
iobroker stop sql
npm install iobroker.sql --production
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
- **round** - round result to number of digits after decimal point
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
### 4.0.4 (2026-08-11)
* (@GermanBluefox) Fixed that nothing was stored for datapoints with an `aliasId`: the adapter subscribed to the alias name instead of the real state ID, so no state change ever arrived

### 4.0.3 (2026-08-11)
* (@GermanBluefox) Corrected small configuration error

### 4.0.2 (2026-08-10)
* (@GermanBluefox) Fixed empty charts for the aggregation `onchange` ("raw" in e-charts): it was run through the interval aggregation and returned only `null` values
* (@GermanBluefox) The MySQL and phpMyAdmin docker containers are no longer enabled by default: instances without the docker settings in their config (e.g. after an update from 3.x) reported "Docker is not installed"

### 4.0.1 (2026-08-07)
* (@GermanBluefox) Fixed MySQL error "Can't create more than max_prepared_stmt_count statements": every query allocated a server-side prepared statement
* (@GermanBluefox) Batches of more than 500 values are no longer sent as one multi-statement query

### 4.0.0 (2026-08-04)
* (@GermanBluefox) Migrated to TypeScript
* (@GermanBluefox) Node.js 22 is now needed at a minimum!

[Older changelogs can be found there](CHANGELOG_OLD.md)

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
