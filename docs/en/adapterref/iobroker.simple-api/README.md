![Logo](admin/simple-api.png)
# Simple-api

![Number of Installations](http://iobroker.live/badges/simple-api-installed.svg)
![Number of Installations](http://iobroker.live/badges/simple-api-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.simple-api.svg)](https://www.npmjs.com/package/iobroker.simple-api)

![Test and Release](https://github.com/ioBroker/ioBroker.simple-api/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/simple-api/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.simple-api.svg)](https://www.npmjs.com/package/iobroker.simple-api)

This is a RESTFul interface to read the objects and states from ioBroker and to write/control the states over HTTP Get/Post requests.

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

**Use better [`ioBroker.rest-api`](https://github.com/ioBroker/ioBroker.rest-api) instead of this adapter.**

## Usage
Call in browser `http://ipaddress:8087/help` to get the help about API. The result is:

```json
{
  "getPlainValue": "http://ipaddress:8087/getPlainValue/stateID",
  "getPlainValue": "http://ipaddress:8087/getPlainValue/stateID?json",
  "get": "http://ipaddress:8087/get/stateID/?prettyPrint",
  "getBulk": "http://ipaddress:8087/getBulk/stateID1,stateID2/?prettyPrint",
  "set": "http://ipaddress:8087/set/stateID?value=1&prettyPrint",
  "toggle": "http://ipaddress:8087/toggle/stateID?prettyPrint",
  "setBulk": "http://ipaddress:8087/setBulk?stateID1=0.7&stateID2=0&prettyPrint",
  "objects": "http://ipaddress:8087/objects?pattern=system.adapter.admin.0*&prettyPrint",
  "objects": "http://ipaddress:8087/objects?pattern=system.adapter.admin.0*&type=adapter&prettyPrint",
  "states": "http://ipaddress:8087/states?pattern=system.adapter.admin.0*&prettyPrint"
  "search": "http://ipaddress:8087/search?pattern=system.adapter.admin.0*&prettyPrint",
  "query": "http://ipaddress:8087/query/stateID1,stateID2/?prettyPrint"
  "query": "http://ipaddress:8087/query/stateID1,stateID2/?noHistory=true&prettyPrint"
  "query": "http://ipaddress:8087/query/stateID1,stateID2/?dateFrom=2019-06-06T12:00:00.000Z&d&prettyPrint"
  "query": "http://ipaddress:8087/query/stateID1,stateID2/?dateFrom=2019-06-06T12:00:00.000Z&dateTo=2019-06-06T12:00:00.000Z&aggregate=minmax&count=2000&prettyPrint"
}
```

### getPlainValue
Call e.g.:

`http://ipaddress:8087/getPlainValue/system.adapter.admin.0.alive`

Result:

`true`

Additionally, you can use query key `json` to force the parsing of the stored value:

`http://ipaddress:8087/getPlainValue/javascript.0.value?json`

Result:

`{"a":1}`

And without `json` flag the result would be 

`"{\"a\": 1}"`

One more useful flag could be used too, `noStringify`:

`http://ipaddress:8087/getPlainValue/javascript.0.stringValue?noStringify`

Result:

`VALUETEXT`

And without `noStringify` flag the result would be

`"VALUETEXT"`

### get
Call e.g.:
`http://ipaddress:8087/get/system.adapter.admin.0.alive`

Result:
```json
{"val":true,"ack":true,"ts":1442432193,"from":"system.adapter.admin.0","lc":1442431190,"expire":23437,"_id":"system.adapter.admin.0.alive","type":"state","common":{"name":"admin.0.alive","type":"boolean","role":"indicator.state"},"native":{}}
```

or call e.g.:
```
http://ipaddress:8087/get/system.adapter.admin.0.alive?prettyPrint
```

Result:
```json
{
  "val": true,
  "ack": true,
  "ts": 1442432238,
  "from": "system.adapter.admin.0",
  "lc": 1442431190,
  "expire": 28494,
  "_id": "system.adapter.admin.0.alive",
  "type": "state",
  "common": {
    "name": "admin.0.alive",
    "type": "boolean",
    "role": "indicator.state"
  },
  "native": {}
}
```

### getBulk
Get many states with one request, returned as an array of objects in order of a list in request and id/val/ts as a sub-object

### set
Call e.g.: `http://ipaddress:8087/set/javascript.0.test?value=1`

Result:
```json
{"id":"javascript.0.test","value":1}
```
or call e.g.: `http://ipaddress:8087/set/javascript.0.test?value=1&prettyPrint`

Result:
```json
{
  "id": "javascript.0.test",
  "value": 1
}
```
Of course the data point `javascript.0.test` must exist.

Additionally, the type of value could be defined: `http://ipaddress:8087/set/javascript.0.test?value=1&prettyPrint&type=string`

and an acknowledgment flag could be defined too: `http://ipaddress:8087/set/javascript.0.test?value=1&prettyPrint&ack=true`

### toggle
Toggles value:

- boolean: true => false, false => true
- number without limits: x => 100-x
- number with limits: x => max - (x - min)

### setBulk
Set many states with one request. This request supports POST method too, for POST data should be in body and not URL.

Please use content type `text/plain` for that.

### setValueFromBody
This command allows setting the value of a given state to be set by the POST body content.

Call e.g.:
`http://ipaddress:8087/setValueFromBody/0_userdata.0.example_state`
with body `hello` where `0_userdata.0.example_state` is the ID of the state.

Please use content type `text/plain` for that.

### objects
Read objects of a defined type from DB.

Call e.g.:
`http://ipaddress:8087/objects?pattern=enum.*&type=enum` - to read all enums

or 

`http://ipaddress:8087/objects?pattern=system.adapter.admin.0.*` - to read all states in branch `system.adapter.admin.0`

### states

### search
If a data source (History, SQL) in the configuration is set, then only the data points known to the data source are listed.
If the option 'List all data points' has been activated or no data source has been specified, all data points will be listed.
This command is needed for the Grafana JSON / SimpleJSON Plugin.

### query
If a data source (History, SQL) has been specified in the instance configuration, the data from the specified data points are read out for the specified period, otherwise only the current value is read out.
This command is needed for the Grafana JSON / SimpleJSON Plugin.

### help
Gives [this](#usage) output back

## Usage
Assume, we have no security and the server runs on default port 8087.

For all queries, the name or id of the state can be specified.

For every request that returns JSON you can set parameter `prettyPrint` to get the output in human-readable form.

If authentication is enabled, two other fields are mandatory: `?user=admin&pass=iobroker`

### getPlainValue
Read state value as text. You can specify more ids divided by semicolon

`http://ip:8087/getPlainValue/admin.0.memHeapTotal` => `31.19`

`http://ip:8087/getPlainValue/admin.0.memHeapTotal, admin.0.memHeapUsed` =>

```
  31.19
  17.52
```

### get
Read state and object data of state as JSON. You can specify more ids divided by semicolon.
If more than one ID is requested, the JSON array will be returned.

`http://localhost:8087/get/admin.0.memHeapTotal/?prettyPrint` =>

```json
  {
    "val": 31.19,
    "ack": true,
    "ts": 1423154619,
    "from": "system.adapter.admin.0",
    "lc": 1423153989,
    "_id": "system.adapter.admin.0.memHeapTotal",
    "type": "state",
    "common": {
      "name": "admin.0.memHeapTotal",
      "type": "number",
      "role": "indicator.state",
      "unit": "MB",
      "history": {
        "enabled": true,
        "changesOnly": true,
        "minLength": 480,
        "maxLength": 960,
        "retention": 604800,
        "debounce": 10000
      }
    },
    "native": {}
  }
```

`http://ip:8087/get/admin.0.memHeapTotal,admin.0.memHeapUsed/?prettyPrint` =>

```json
  [
    {
      "val": 31.19,
      "ack": true,
      "ts": 1423154544,
      "from": "system.adapter.admin.0",
      "lc": 1423153989,
      "_id": "system.adapter.admin.0.memHeapTotal",
      "type": "state",
      "common": {
        "name": "admin.0.memHeapTotal",
        "type": "number",
        "role": "indicator.state",
        "unit": "MB",
        "history": {
          "enabled": true,
          "changesOnly": true,
          "minLength": 480,
          "maxLength": 960,
          "retention": 604800,
          "debounce": 10000
        }
      },
      "native": {}
    },
    {
      "val": 16.25,
      "ack": true,
      "ts": 1423154544,
      "from": "system.adapter.admin.0",
      "lc": 1423154544,
      "_id": "system.adapter.admin.0.memHeapUsed",
      "type": "state",
      "common": {
        "name": "admin.0.memHeapUsed",
        "type": "number",
        "role": "indicator.state",
        "unit": "MB",
        "history": {
          "enabled": true,
          "changesOnly": true,
          "minLength": 480,
          "maxLength": 960,
          "retention": 604800,
          "debounce": 10000
        }
      },
      "native": {}
    }
  ]
```

### getBulk
Read the states of more IDs with timestamp. You can specify more ids divided by semicolon.
The JSON array will be returned always.

`http://ip:8087/getBulk/admin.0.memHeapTotal,admin.0.memHeapUsed/?prettyPrint` =>

```json
  {
      "admin.0.memHeapTotal": {
          "val": 31.19,
          "ts": 1423154754
      },
      "admin.0.memHeapUsed": {
          "val": 15.6,
          "ts": 1423154754
      }
  }
```

### set
Write the states with specified IDs. You can specify *wait* option in milliseconds to wait for answer from driver.

`http://ip:8087/set/hm-rpc.0.IEQ12345.LEVEL?value=1&prettyPrint` =>

```json
{
       "id": "hm-rpc.0.IEQ12345.LEVEL",
       "value": 1
     }
```

`http://ip:8087/set/hm-rpc.0.IEQ12345.LEVEL?value=1&wait=5000&prettyPrint` =>

```json
{
       "val": 1,
       "ack": true,
       "ts": 1423155399,
       "from": "hm-rpc.0.IEQ12345.LEVEL",
       "lc": 1423155399
     }
```

If no answer is received in specified time, the `null` value will be returned.
In the first case the answer will be returned immediately and `ack` is false. In the second case `ack` is true. That means it was response from driver.

### setBulk
- write the bulk of IDs in one request.

`http://ip:8087/setBulk?hm-rpc.0.FEQ1234567:1.LEVEL=0.7&Anwesenheit=0&prettyPrint` =>

```json
  [
    {
      "id": "hm-rpc.0.FEQ1234567:1.LEVEL",
      "val": "0.7"
    },
    {
      "error": "error: datapoint \"Anwesenheit\" not found"
    }
  ]
```
You can send this request as POST too. Please use content type `text/plain` and put the data in the body.

### objects
Get the list of all objects for pattern. If no pattern is specified, all objects as JSON array will be returned.

`http://ip:8087/objects?prettyPrint` =>

```json
  {
  "system.adapter.admin.0.uptime": {
    "_id": "system.adapter.admin.0.uptime",
    "type": "state",
    "common": {
      "name": "admin.0.uptime",
      "type": "number",
      "role": "indicator.state",
      "unit": "seconds"
    },
    "native": {}
  },
  "system.adapter.admin.0.memRss": {
    "_id": "system.adapter.admin.0.memRss",
    "type": "state",
    "common": {
      "name": "admin.0.memRss",
      "desc": "Resident set size",
      "type": "number",
      "role": "indicator.state",
      "unit": "MB",
      "history": {
        "enabled": true,
        "changesOnly": true,
        "minLength": 480,
        "maxLength": 960,
        "retention": 604800,
        "debounce": 10000
      }
    },
    "native": {}
  },
  ...
```

Get all control objects of adapter system.adapter.admin.0:
`http://ip:8087/objects?pattern=system.adapter.admin.0*&prettyPrint` =>

```json
    {
    "system.adapter.admin.0.uptime": {
      "_id": "system.adapter.admin.0.uptime",
      "type": "state",
      "common": {
        "name": "admin.0.uptime",
        "type": "number",
        "role": "indicator.state",
        "unit": "seconds"
      },
      "native": {}
    },
    ...

```

### states
Get the list of all states for pattern. If no pattern is specified, all states as JSON array will be returned.

`http://ip:8087/states?prettyPrint` =>

```json
  {
    "system.adapter.admin.0.uptime": {
      "val": 32176,
      "ack": true,
      "ts": 1423156164,
      "from": "system.adapter.admin.0",
      "lc": 1423156164
    },
    "system.adapter.admin.0.memRss": {
      "val": 41.14,
      "ack": true,
      "ts": 1423156164,
      "from": "system.adapter.admin.0",
      "lc": 1423156119
    },
    "system.adapter.admin.0.memHeapTotal": {
      "val": 31.19,
      "ack": true,
      "ts": 1423156164,
      "from": "system.adapter.admin.0",
      "lc": 1423155084
    },
  ...
```

Get all control objects of adapter system.adapter.admin.0:

`http://ip:8087/states?pattern=system.adapter.admin.0*&prettyPrint` =>

```json
    {
      "system.adapter.admin.0.uptime": {
        "val": 32161,
        "ack": true,
        "ts": 1423156149,
        "from": "system.adapter.admin.0",
        "lc": 1423156149
      },
      "system.adapter.admin.0.memRss": {
        "val": 41.14,
        "ack": true,
        "ts": 1423156149,
        "from": "system.adapter.admin.0",
        "lc": 1423156119
      },
      "system.adapter.admin.0.memHeapTotal": {
        "val": 31.19,
        "ack": true,
        "ts": 1423156149,
        "from": "system.adapter.admin.0",
        "lc": 1423155084
      },
      "system.adapter.admin.0.memHeapUsed": {
        "val": 19.07,
        "ack": true,
        "ts": 1423156149,
        "from": "system.adapter.admin.0",
        "lc": 1423156149
      },
      "system.adapter.admin.0.connected": {
        "val": true,
        "ack": true,
        "ts": 1423156149,
        "from": "system.adapter.admin.0",
        "lc": 1423128324,
        "expire": 28100
      },
      "system.adapter.admin.0.alive": {
        "val": true,
        "ack": true,
        "ts": 1423156149,
        "from": "system.adapter.admin.0",
        "lc": 1423128324,
        "expire": 28115
      }
    }
```

### search
If a data source (History, SQL) in the configuration is set, then only the data points known to the data source are listed.
If the option 'List all data points' has been activated or no data source has been specified, all data points will be listed.

`http://ip:8087/search?pattern=system.adapter.admin.0*&prettyPrint` =>

```json
  {
    "system.adapter.admin.0.outputCount",
    "system.adapter.admin.0.inputCount",
    "system.adapter.admin.0.uptime",
    "system.adapter.admin.0.memRss",
    "system.adapter.admin.0.memHeapTotal",
    "system.adapter.admin.0.memHeapUsed",
    "system.adapter.admin.0.cputime",
    "system.adapter.admin.0.cpu",
    "system.adapter.admin.0.connected",
    "system.adapter.admin.0.alive"
  }
```

### query
If a data source (History, SQL) is specified, data from the specified data points will be retrieved for the given period.

`http://ip:8087/query/system.host.iobroker-dev.load,system.host.iobroker-dev.memHeapUsed/?prettyPrint&dateFrom=2019-06-08T01:00:00.000Z&dateTo=2019-06-08T01:00:10.000Z` =>

```json
  [
    {
      "target": "system.host.iobroker-dev.load",
      "datapoints": [
        [
          0.12,
          1559955600000
        ],
        [
          0.46,
          1559955601975
        ],
        [
          0.44,
          1559955610000
        ]
      ]
    },
    {
      "target": "system.host.iobroker-dev.memHeapUsed",
      "datapoints": [
        [
          23.01,
          1559955600000
        ],
        [
          22.66,
          1559955601975
        ],
        [
          22.69,
          1559955610000
        ]
      ]
    }
  ]
```

If no data source was specified or the noHistory parameter is passed, then only the current value of the data point is read out.

`http://ip:8087/query/system.host.iobroker-dev.load,system.host.iobroker-dev.memHeapUsed/?prettyPrint&noHistory=true` =>

```json
  [
    {
      "target": "system.host.iobroker-dev.load",
      "datapoints": [
        [
          0.58,
          1559970500342
        ]
      ]
    },
    {
      "target": "system.host.iobroker-dev.memHeapUsed",
      "datapoints": [
        [
          21.53,
          1559970500342
        ]
      ]
    }
  ]
```

You can use relative time in the query. For example, `dateFrom=-1h` or `dateTo=today`.

The following relative patterns are supported:
- `hour` or `thisHour` or `this hour` - start of the current hour
- `last hour` or `lastHour` - start of the previous hour
- `today` - start of the current day
- `yesterday` - start of the previous day
- `week` or `thisWeek` or `this week` - start of the current week
- `lastWeek` or `last week` - start of the previous week
- `month` or `thisMonth` or `this month` - start of the current month
- `lastMonth` or `last month` - start of the previous month
- `year` or `thisYear` or `this year` - start of the current year
- `lastYear` or `last year` - start of the previous year
- `-Nd` - N days ago
- `-NM` - N months ago
- `-Ny` - N years ago
- `-Nh` - N hours ago
- `-Nm` - N minutes ago
- `-Ns` - N seconds ago

## CORS
With option "Allow origin (CORS)" you can set the `Access-Control-Allow-Origin` header to allow requests from other domains.

If you leave it blank, the header will not be set.

## Modifiers
You can use some options to modify the answer:
- `prettyPrint` - to get the output in human-readable form
- `json` - to force the parsing of the value in the `getPlainValue` command
- `timeRFC3339` - to get the time of timestamps (`ts` and `lc`) in RFC3339 format, like `2019-06-08T01:00:00.000Z`
- `callback` - response with JSONP format. In `callback=<CALLBACK>` the `CALLBACK` is the name of the callback function

## Authentication
This adapter supports the following types of authentication:
- Query parameter `user` and `pass`
- Basic authentication
- Oauth2 Bearer token in the header. Read more in the web adapter about how to get tokens.

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
## Changelog
### 3.0.7 (2025-06-16)
* (@GermanBluefox) corrected reading of history data

### 3.0.6 (2025-03-15)
* (bluefox) Added support for 'Access-Control-Allow-Origin'
* (bluefox) Removed letsencrypt information
* (bluefox) Added basic and OAuth2 authentication
* (bluefox) Implemented JSONP response
* (bluefox) Implemented relative times for query

### 3.0.5 (2025-03-13)
* (bluefox) Corrected the indication of running mode in admin
* (bluefox) Corrected the writing of numeric values
* (bluefox) Clear cache after 10 minutes

### 3.0.0 (2025-03-09)
* BREAKING: When the adapter is configured to work as a web extension, no own local port is opened anymore
* (bluefox) Updated packages
* (bluefox) Migrated to TypeScript
* (bluefox) If State/Object not found, the response will be 404 (and not 500)
* (bluefox) If a user has no permission, the response will be 403 (and not 401)

### 2.8.0 (2024-05-23)
* (foxriver76) ported to `@iobroker/webserver`

### 2.7.2 (2022-10-08)
* (Apollon77) Prepare for future js-controller versions

### 2.7.1 (2022-08-29)
* (bluefox) Check if the port is occupied only on defined interface
* (bluefox) Added JSON config

### 2.7.0 (2022-05-31)
* (crycode-de) Allow use of ack flag for setBulk post requests
* (Apollon77) Return an ack flag too on getBulk

### 2.6.5 (2022-04-14)
* Added support for aggregate and count for queries

### 2.6.4 (2022-03-17)
* (Apollon77) Optimize performance, especially when using names instead of object ids

### 2.6.3 (2022-02-19)
* (Apollon77) Optimize error message for multi-language objects
* (Apollon77) Do not overwrite state properties by object properties

### 2.6.2 (2021-11-12)
* (bluefox) Support of new flags for `getPlainValue`: `json` and `noStringify`

### 2.6.1 (2021-05-13)
* (Apollon77) Catch error in request parsing when malformed (Sentry IOBROKER-SIMPLE-API-16)

### 2.6.0 (2021-05-09)
* (Apollon77) Also URL-Decode the path parts like state ids
* (Apollon77) Optimize for js-controller 3.3

### 2.5.3 (2021-01-25)
* (Apollon77) Make sure that delayed answers are not crashing (Sentry IOBROKER-SIMPLE-API-Z)

### 2.5.2 (2021-01-09)
* (bluefox) Support of new Let's Encrypt (only with js-controller 3.2.x)

### 2.4.8 (2020-09-17)
* (Apollon77) Make sure missing favico file locally is not throwing exceptions (Sentry IOBROKER-SIMPLE-API-G)

### 2.4.7 (2020-08-17)
* (Apollon77) check that targets are an array for "query" requests (Sentry IOBROKER-SIMPLE-API-F)

### 2.4.6 (2020-06-11)
* (Apollon77) Make sure that the adapter is showing the correct error when webserver cannot be initialized (Sentry IOBROKER-SIMPLE-API-7)

### 2.4.5 (2020-05-04)
* (Apollon77) webserver initialization optimized again to prevent errors with invalid certificates

### 2.4.4 (2020-05-02)
* (Apollon77) Make sure Permission errors do not crash adapter (Sentry IOBROKER-SIMPLE-API-3)

### 2.4.3 (2020-04-30)
* (Apollon77) Optimize web server error handling

### 2.4.1 (2020-04-23)
* (bluefox) Caught the web server errors

### 2.4.0 (2020-04-12)
* (Apollon77) Add Sentry support with js-controller 3.0
* (Apollon77) fix potential crash

### 2.3.3 (2019-11-16)
* (bluefox) Added response code for unknown commands

### 2.3.2 (2019-10-18)
* (Apollon77) Fix Admin 3 support

### 2.3.1 (2019-10-12)
* (bluefox) Admin 3 is now supported
* (bluefox) NPM packages were updated

### 2.2.0 (2019-09-10)
* (bluefox) New flags are supported: ack and type
* (bluefox) Return error codes as JSON if no pretty print defined

### 2.1.2 (2019-09-05)
* (Apollon77) fix compact mode

### 2.1.0 (2019-07-05)
* (Marco.K) Added command set for the Grafana plugins JSON / SimpleJSON. Usage see https://forum.iobroker.net/topic/23033/aufruf-modifikation-simpleapi-adapter-iobroker-als-datenquelle-f%C3%BCr-grafana

### 2.0.5 (2019-06-26)
* (Apollon77) remove logging

### 2.0.4 (2019-06-23)
* (Apollon77) fix usage as web extension

### 2.0.2 (2018-12-17)
* (Apollon77) fix decoding for state Ids with # in it

### 2.0.0 (2018-06-29)
* (Giermann) BREAKING CHANGE: getBulk is returning data in a different structure

### 1.6.3 (2018-04-15)
* (Apollon77) Return used character encoding (UTF-8)

### 1.6.2 (2017-11-27)
* (Apollon77) Fix decoding problems

### 1.6.1 (2017-09-25)
* (Apollon77) Fix statuscode for setBulk and optimize permission errors

### 1.6.0 (2017-07-10)
* (Apollon77) Fix handling of URL-encoded values, they are now decoded properly
* (Apollon77) Optimize Permission handling
* (Apollon77) add possibility to only allow access to states where user is also owner, finally works correct with js-controller 1.1.1!

### 1.5.0 (2017-03-10)
* (greyhound) Add new POST method setValueFromBody

### 1.4.0 (2017-01-05)
* (bluefox) new web server plugin support

### 1.3.0 (2016-08-30)
* (bluefox) compatible only with new admin

### 1.2.0 (2016-08-27)
* (bluefox) support of letsencrypt certificates

### 1.1.1 (2016-07-06)
* (bluefox) support of chained certificates

### 1.1.0 (2016-02-09)
* (bluefox) fix toggle, objects, states, setBulk, POST
* (bluefox) add tests

### 1.0.0 (2015-09-30)
* (bluefox) stop adapter before update

### 0.1.2 (2015-06-28)
* (bluefox) add description in readme.md
* (bluefox) change "toggle" for boolean and numbers

### 0.1.1 (2015-06-28)
* (bluefox) change setForeignState api
* (bluefox) add type to io-package.json
* (bluefox) enable run from "web"
* (bluefox) add default user

### 0.1.0 (2015-06-10)
* (bluefox) change setForeignState api
* (bluefox) support of user permissions

### 0.0.4 (2015-03-11)
* (bluefox) remove socket.io from file

### 0.0.3 (2015-02-13)
* (bluefox) remove socket.io from dependencies

### 0.0.2 (2015-02-12)
* (bluefox) enable be a part of "web"

### 0.0.1 (2015-02-06)
* (bluefox) initial commit

## License
The MIT License (MIT)

Copyright (c) 2015-2025 bluefox <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
