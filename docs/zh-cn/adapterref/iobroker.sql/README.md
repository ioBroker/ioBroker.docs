---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sql/README.md
title: ioBroker.sql
hash: yO9ZDtp6FL+u1N1OWFf7H/Z0PPR1+Qd0sC6ecQqS3kE=
---
![标识](../../../en/adapterref/iobroker.sql/admin/sql.png)

![安装数量](http://iobroker.live/badges/sql-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.sql.svg)
![下载](https://img.shields.io/npm/dm/iobroker.sql.svg)
![测试](https://travis-ci.org/ioBroker/ioBroker.sql.svg?branch=master)
![新产品管理](https://nodei.co/npm/iobroker.sql.png?downloads=true)

# IoBroker.sql
此适配器将状态历史记录保存到 SQL DB 中。

支持 PostgreSQL、mysql、Microsoft SQL Server 和 sqlite。
如果需要默认端口，您可以保留端口 0。

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅 [Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用哨兵报告。

### MS-SQL：
对主机使用 ```localhost\instance``` 并检查启用的 TCP/IP 连接。
https://msdn.microsoft.com/en-us/library/bb909712(v=vs.90).aspx

### SQLite：
是“文件”-DB，无法管理太多事件。如果您有大量数据，请使用真正的数据库，例如 PostgreSQL 和 co。

不得额外安装 SQLite DB。它只是磁盘上的一个文件，但要安装它，您需要在系统上使用构建工具。对于 linux，只需写：

```
sudo apt-get install build-essential
```

对于窗户：

```
c:\>npm install --global --production windows-build-tools
```

然后重新安装适配器，例如：

```
cd /opt/iobroker
iobroker stop sql
npm install iobroker.sql --production
iobroker start sql
```

### MySQL：
您可以在 linux 系统上安装 mysql，如下所示：

```
apt-get install mysql-server mysql-client

mysql -uroot -p

CREATE USER 'iobroker'@'%' IDENTIFIED BY 'iobroker';
GRANT ALL PRIVILEGES ON * . * TO 'iobroker'@'%';
FLUSH PRIVILEGES;
```

如果需要，编辑 */etc/mysql/my.cnf* 以设置绑定到远程连接的 IP 地址。

**警告**：iobroker 用户是“admin”。如果需要，向 iobroker 用户授予有限的权限。

在“windows”上，它可以通过安装程序轻松安装：https://dev.mysql.com/downloads/installer/。

注意认证方式。 `node.js` 尚不支持 MySQL 8.0 中的新加密算法，您必须选择旧的身份验证方法。

![视窗](../../../en/adapterref/iobroker.sql/img/WindowsMySQLinstaller.png)

## 数据库的结构
默认数据库名称为“iobroker”，但可以在配置中更改。

### Sources 此表是写入条目的适配器实例列表。 (state.from)
|数据库 |查询中的名称 |
|------------|----------------------|
| MS-SQL | iobroker.dbo.sources |
| MySQL | iobroker.sources |
| PostgreSQL |来源 |
| SQLite |来源 |

结构：

|领域 |类型 |说明 |
|-------|--------------------------------------------|-------------------------------------------|
|身份证 |整数非空主键标识(1,1) |唯一标识 |
|姓名 | varchar(255) / 文本 |写入条目的适配器实例 |

*注：* MS-SQL 使用 varchar(255)，其他使用 TEXT

＃＃＃ 数据点
此表是数据点列表。 (ID)

|数据库 |查询中的名称 |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.datapoints |
| MySQL | iobroker.datapoints |
| PostgreSQL |数据点 |
| SQLite |数据点 |

结构：

|领域 |类型 |说明 |
|-------|--------------------------------------------|-------------------------------------------------|
|身份证 |整数非空主键标识(1,1) |唯一标识 |
|姓名 | varchar(255) / 文本 |变量的 ID，例如hm-rpc.0.JEQ283747.1.STATE |
|类型 |整数 | 0 - 数字，1 - 字符串，2 - 布尔值 |

*注：* MS-SQL 使用 varchar(255)，其他使用 TEXT

### 数字
类型为“number”的状态的值。 **ts** 表示“时间序列”。

|数据库 |查询中的名称 |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_number |
| MySQL | iobroker.ts_number |
| PostgreSQL | ts_number |
| SQLite | ts_number |

结构：

|领域 |类型 |说明 |
|--------|--------------------------------------------|-------------------------------------------------|
|身份证 |整数 | “数据点”表中的状态 ID |
| ts |大整数/整数 |到纪元的时间（以毫秒为单位）。可以使用“new Date(ts)”转换为时间 |
|瓦尔 |真实 |价值 |
|确认 |位/布尔 |被确认：0 - 不确认，1 - 确认 |
| _来自 |整数 | “来源”表中的来源 ID |
| q |整数 |质量如数字。您可以找到说明 [这里](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

*注：* MS-SQL 使用 BIT，其他使用 BOOLEAN。 SQLite 用于 ts INTEGER 和所有其他 BIGINT。

用户可以定义额外的类型`number`“计数器”的功能。为此，创建了下表：

|数据库 |查询中的名称 |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_counter |
| MySQL | iobroker.ts_counter |
| PostgreSQL | ts_counter |
| SQLite | ts_counter |

结构：

|领域 |类型 |说明 |
|--------|--------------------------------------------|-------------------------------------------------|
|身份证 |整数 | “数据点”表中的状态 ID |
| ts |大整数/整数 |到纪元的时间（以毫秒为单位）。可以使用“new Date(ts)”转换为时间 |
|瓦尔 |真实 |价值 |

该表存储了当计数器被交换并且该值不增加但未能为零或更低值时的值。

### 字符串
类型为“字符串”的状态的值。

|数据库 |查询中的名称 |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_string |
| MySQL | iobroker.ts_string |
| PostgreSQL | ts_string |
| SQLite | ts_string |

结构：

|领域 |类型 |说明 |
|--------|--------------------------------------------|-------------------------------------------------|
|身份证 |整数 | “数据点”表中的状态 ID |
| ts | BIGINT |到纪元的时间（以毫秒为单位）。可以使用“new Date(ts)”转换为时间 |
|瓦尔 |正文 |价值 |
|确认 |位/布尔 |被确认：0 - 不确认，1 - 确认 |
| _来自 |整数 | “来源”表中的来源 ID |
| q |整数 |质量如数字。您可以找到说明 [这里](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

*注：* MS-SQL 使用 BIT，其他使用 BOOLEAN。 SQLite 用于 ts INTEGER 和所有其他 BIGINT。

### 布尔值
类型为“boolean”的状态的值。

|数据库 |查询中的名称 |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_bool |
| MySQL | iobroker.ts_bool |
| PostgreSQL | ts_bool |
| SQLite | ts_bool |

结构：

|领域 |类型 |说明 |
|--------|--------------------------------------------|-------------------------------------------------|
|身份证 |整数 | “数据点”表中的状态 ID |
| ts | BIGINT |到纪元的时间（以毫秒为单位）。可以使用“new Date(ts)”转换为时间 |
|瓦尔 |位/布尔 |价值 |
|确认 |位/布尔 |被确认：0 - 不确认，1 - 确认 |
| _来自 |整数 | “来源”表中的来源 ID |
| q |整数 |质量如数字。您可以找到说明 [这里](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

*注：* MS-SQL 使用 BIT，其他使用 BOOLEAN。 SQLite 用于 ts INTEGER 和所有其他 BIGINT。

## 自定义查询
用户可以从 javascript 适配器对表执行自定义查询：

```
sendTo('sql.0', 'query', 'SELECT * FROM datapoints', function (result) {
    if (result.error) {
        console.error(result.error);
    } else {
        // show result
         console.log('Rows: ' + JSON.stringify(result.result));
    }
});
```

或者获取 ID=system.adapter.admin.0.memRss 的最后一小时的条目

```
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

*笔记：*

根据数据库，必须在表名之前插入数据库名称或数据库名称 + 模式 - 请参阅上面“数据库结构”下的框。

例如，如果您的数据库名为“iobroker”：

|数据库 |查询中的名称 |
|------------|------------------------------------------|
| MS-SQL | SELECT * FROM iobroker.dbo.datapoints ...|
| MySQL | SELECT * FROM iobroker.datapoints ... |

## 商店状态
如果您想将其他数据写入 InfluxDB/SQL，您可以使用内置系统函数 **storeState**。
此函数还可用于转换来自其他 History 适配器（如 History 或 SQL）的数据。

给定的 ID 不会根据 ioBroker 数据库进行检查，也不需要在那里设置，但只能直接访问。

消息可以具有以下三种格式之一：

* 一个 ID 和一个状态对象：`{id: 'adapter.0.device.counter', state: {val: 1, ts: 10239499}}`
* 一个 ID 和状态对象数组：`{id: 'adapter.0.device.counter', state: [{val: 1, ts: 10239499}, {val: 2, ts: 10239599}, {val: 3 , ts: 10239699}]}`
* 具有状态对象的多个 ID 数组`[{id: 'adapter.0.device.counter1', state: {val: 1, ts: 10239499}, {id: 'adapter.0.device.counter2', state: {val: 2, ts: 10239599}]`

此外，您可以添加属性 `rules: true` 以激活所有规则，例如 `counter`、`changesOnly`、`de-bounce` 等等：`{id: 'adapter.0.device.counter', rules: true, state: [{val: 1, ts: 10239499}, {val: 2, ts: 10239599}, {val: 3, ts: 10239699}]}`

##删除状态
如果你想从数据库中删除条目，你可以使用内置的系统函数**delete**：

```
sendTo('sql.0', 'delete', [
    {id: 'mbus.0.counter.xxx', state: {ts: 1589458809352},
    {id: 'mbus.0.counter.yyy', state: {ts: 1589458809353}
], result => console.log('deleted'));
```

要删除某些数据点的所有历史数据，请执行：

```
sendTo('sql.0', 'deleteAll', [
    {id: 'mbus.0.counter.xxx'}
    {id: 'mbus.0.counter.yyy'}
], result => console.log('deleted'));
```

要删除某些数据点和某些范围的历史数据，请执行：

```
sendTo('sql.0', 'deleteRange', [
    {id: 'mbus.0.counter.xxx', start: '2019-01-01T00:00:00.000Z', end: '2019-12-31T23:59:59.999'},
    {id: 'mbus.0.counter.yyy', start: 1589458809352, end: 1589458809353}
], result => console.log('deleted'));
```

时间可以是自纪元或 ans 字符串以来的毫秒，可以由 javascript Date 对象转换。

值将被删除，包括定义的限制。 `ts >= start AND ts <= end`

##改变状态
如果您想更改数据库中条目的值、质量或确认标志，您可以使用内置系统函数 **update**：

```
sendTo('sql.0', 'update', [
    {id: 'mbus.0.counter.xxx', state: {ts: 1589458809352, val: 15, ack: true, q: 0},
    {id: 'mbus.0.counter.yyy', state: {ts: 1589458809353, val: 16, ack: true, q: 0}
], result => console.log('deleted'));
```

`ts` 是强制性的。至少一个其他标志必须包含在状态对象中。

小心 `counters`。 DB中的`counters`不会被重置，你必须自己处理。

## 获取历史记录
除了自定义查询之外，您还可以使用内置系统函数 **getHistory**：

```
var end = Date.now();
sendTo('sql.0', 'getHistory', {
    id: 'system.adapter.admin.0.memRss',
    options: {
        start:      end - 3600000,
        end:        end,
        aggregate: 'minmax' // or 'none' to get raw values
    }
}, function (result) {
    for (var i = 0; i < result.result.length; i++) {
        console.log(result.result[i].id + ' ' + new Date(result.result[i].ts).toISOString());
    }
});
```

## 获取计数器
用户可以询问特定时间段的某个计数器的值（type=number，counter=true）。

```
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

如果计数器设备将被更换，它也将被计算。

## 历史记录管理通过 Javascript
该适配器支持通过 JavaScript 启用和禁用历史记录，还支持检索已启用数据点及其设置的列表。

＃＃＃ 使能够
该消息需要具有数据点的“id”。此外，用于定义数据点特定设置的可选“选项”：

```
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

### 禁用
该消息需要具有数据点的“id”。

```
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

###获取列表
该消息没有参数。

```
sendTo('sql.0', 'getEnabledDPs', {}, function (result) {
    //result is object like:
    {
        "system.adapter.sql.0.memRss": {
            "changesOnly":true,
            "debounce":0,
            "retention":31536000,
            "maxLength":3,
            "changesMinDelta":0.5,
            "enabled":true,
            "changesRelogInterval":0,
            "aliasId": ""
        }
        ...
    }
});
```

## 连接设置
- **DB Type**：SQL DB 的类型：MySQL、PostgreSQL、MS-SQL 或 SQLite3
- **Host**：SQL Server 的 IP 地址或主机名
- **Port**：SQL Server 的端口（如果不确定，请留空）
- **数据库名称**：数据库名称。默认iobroker
- **用户**：SQL 的用户名。必须存在于数据库中。
- **密码**：SQL 密码。
- **密码确认**：只需在此处重复密码即可。
- **加密**：部分数据库支持加密。
- **四舍五入到**：逗号后的位数。
- **允许并行请求**：允许同时向数据库发出 SQL 请求。
- **不创建数据库**：如果数据库已经创建（例如由管理员创建）并且 ioBroker 用户没有足够的权限来创建数据库，则激活此选项。

＃＃ 默认设置
- **去抖动间隔**：不要存储比此间隔更频繁的值。
- **记录任何未更改的值**：每 X 秒额外写入一次值。
- **从最后一个值到日志的最小差异**：两个值之间的最小间隔。
- **存储保留**：值将在数据库中存储多长时间。

<!-- 下一版本的占位符（在行首）：

### __工作正在进行中__ -->

## Changelog
### __WORK IN PROGRESS__
* (Excodibur) Hide settings not relevant when "log changes only" is not used
* (Apollon77) Allow all number values for debounce again

### 1.16.0 (2021-12-14)
* (bluefox) Support only `js.controller` >= 3.3.x
* (bluefox) Used system/custom view for collecting the objects
* (bluefox) Implemented option to ignore zero- or/and below zero- values

### 1.15.7 (2021-04-28)
* (bluefox) fixed the support of Admin5

### 1.15.6 (2021-04-19)
* (bluefox) added support of Admin5

### 1.15.5 (2021-01-22)
* (Apollon77) make sure message query is a string (Sentry)

### 1.15.4 (2021-01-17)
* (Apollon77) Optimize stop handling

### 1.15.3 (2020-08-29)
* (bluefox) Added the option "Do not create database". E.g. if DB was created and it does not required to do that, because the user does not have enough rights.

### 1.15.2 (2020-07-26)
* (Apollon77) prevent wrong errors that realId is missing

### 1.15.1 (2020-07-20)
* (Apollon77) implement a workaround for postgres problem

### 1.15.0 (2020-07-19)
*BREAKING* This version only accepts Node.js 10.x+ (because sqlite3 was upgraded)
* (Apollon77) Prevent crash case (Sentry IOBROKER-SQL-16, IOBROKER-SQL-15, IOBROKER-SQL-1K)

### 1.14.2 (2020-06-23)
* (bluefox) Fixed error for data storage

### 1.14.1 (2020-06-17)
* (bluefox) Corrected error for objects with mixed type

### 1.14.0 (2020-05-20)
* (bluefox) added the range deletion and the delete all operations

### 1.13.1 (2020-05-20)
* (bluefox) added changed and delete operations

### 1.12.6 (2020-05-08)
* (bluefox) set default history if not yet set

### 1.12.5 (2020-05-05)
* (Apollon77) Crash prevented for invalid objects (Sentry IOBROKER-SQL-X)

### 1.12.4 (2020-05-04)
* (Apollon77) Potential crash fixed when disabling data points too fast (Sentry IOBROKER-SQL-W) 
* (Apollon77) Always set "encrypt" flag, even if false because else might en in default true (see https://github.com/tediousjs/tedious/issues/931)

### 1.12.3 (2020-04-30)
* (Apollon77) Try to create indexes on MSSQL to speed up things. Infos are shown if not possible to be able for the user to do it themself. Timeout is 15s

### 1.12.2 (2020-04-30)
* (Apollon77) MSSQL works again

### 1.12.1 (2020-04-26)
* (Apollon77) Fix potential crash (Sentry)

### 1.12.0 (2020-04-23)
* (Apollon77) Implement max Connections setting and respect it, now allows to control how many concurrent connections to database are used (default 100) and others wait up to 10s for a free connection before failing)
* (Apollon77) Change dependencies to admin to a global dependency
* (Apollon77) Update connection status also in between
* (Apollon77) fix some potential crash cases (Sentry reported)
* (Omega236) Add id to error message for queries
* (Apollon77) update pg to stay compatible with nodejs 14
* (Apollon77) Start clearly ending timeouts on unload ... still some cases left!

### 1.11.1 (2020-04-19)
* __Requires js-controller >= 2.0.0__
* (Apollon77) removed usage of adapter.objects
* (Apollon77) check if objects have changed and ignore unchanged
* (Apollon77) Add Sentry for Error Reporting with js-controller 3.0
* (Apollon77) Make sure value undefined is ignored

### 1.10.1 (2020-04-12)
* (bluefox) Converted to ES6
* (bluefox) The counter functionality was implemented.

### 1.9.5 (2019-05-15)
* (Apollon77) Add support for nodejs 12

### 1.9.4 (2019-02-24)
* (Apollon77) Fix several smaller issues and topics
* (Apollon77) Optimize Texts (for Admin v3 UI)

### 1.9.0 (2018-06-19)
* (Apollon77) Add option to log datapoints as other ID (alias) to easier migrate devices and such

### 1.8.0 (2018-04-29)
* (Apollon77) Update sqlite3, nodejs 10 compatible
* (BuZZy1337) Admin fix

### 1.7.4 (2018-04-15)
* (Apollon77) Fix getHistory

### 1.7.3 (2018-03-28)
* (Apollon77) Respect 'keep forever' setting for retention from data point configuration

### 1.7.2 (2018-03-24)
* (Apollon77) Disable to write NULLs for SQLite

### 1.7.1 (2018-02-10)
* (Apollon77) Make option to write NULL values on start/stop boundaries configurable

### 1.6.9 (2018-02-07)
* (bondrogeen) Admin3 Fixes
* (Apollon77) optimize relog feature and other things

### 1.6.7 (2018-01-31)
* (Bluefox) Admin3 Fixes
* (Apollon77) Relog and null log fixes

### 1.6.2 (2018-01-30)
* (Apollon77) Admin3 Fixes

### 1.6.0 (2018-01-14)
* (bluefox) Ready for Admin3

### 1.5.8 (2017-10-05)
* (Apollon77) fix relog value feature

### 1.5.7 (2017-08-10)
* (bluefox) add "save last value" option

### 1.5.6 (2017-08-02)
* (Apollon77) fix behaviour of log interval to always log the current value

### 1.5.4 (2017-06-12)
* (Apollon77) fix dependency to other library

### 1.5.3 (2017-04-07)
* (Apollon77) fix in datatype conversions

### 1.5.0 (2017-03-02)
* (Apollon77) Add option to define storage datatype per datapoint inclusing converting the value if needed

### 1.4.6 (2017-02-25)
* (Apollon77) Fix typo with PostgrSQL

### 1.4.5 (2017-02-18)
* (Apollon77) Small fix again for older configurations
* (Apollon77) fix for DBConverter Analyze function

### 1.4.3 (2017-02-11)
* (Apollon77) Small fix for older configurations

### 1.4.2 (2017-01-16)
* (bluefox) Fix handling of float values in Adapter config and Datapoint config.

### 1.4.1
* (Apollon77) Rollback to sql-client 0.7 to get rid of the mmagic dependecy that brings problems on older systems

### 1.4.0 (2016-12-02)
* (Apollon77) Add messages enableHistory/disableHistory
* (Apollon77) add support to log changes only if value differs a minimum value for numbers

### 1.3.4 (2016-11)
* (Apollon77) Allow database names with '-' for MySQL

### 1.3.3 (2016-11)
* (Apollon77) Update dependecies

### 1.3.2 (2016-11-21)
* (bluefox) Fix insert of string with '

### 1.3.0 (2016-10-29)
* (Apollon77) add option to re-log unchanged values to make it easier for visualization

### 1.2.1 (2016-08-30)
* (bluefox) Fix selector for SQL objects

### 1.2.0 (2016-08-30)
* (bluefox) сompatible only with new admin

### 1.0.10 (2016-08-27)
* (bluefox) change name of object from "history" to "custom"

### 1.0.10 (2016-07-31)
* (bluefox) fix multi requests if sqlite

### 1.0.9 (2016-06-14)
* (bluefox) allow settings for parallel requests

### 1.0.7 (2016-05-31)
* (bluefox) draw line to the end if ignore null

### 1.0.6 (2016-05-30)
* (bluefox) allow setup DB name for mysql and mssql

### 1.0.5 (2016-05-29)
* (bluefox) switch max and min with each other

### 1.0.4 (2016-05-29)
* (bluefox) check retention of data if set "never"

### 1.0.3 (2016-05-28)
* (bluefox) try to calculate old timestamps

### 1.0.2 (2016-05-24)
* (bluefox) fix error with io-package

### 1.0.1 (2016-05-24)
* (bluefox) fix error with SQLite

### 1.0.0 (2016-05-20)
* (bluefox) change default aggregation name

### 0.3.3 (2016-05-18)
* (bluefox) fix postgres

### 0.3.2 (2016-05-13)
* (bluefox) queue select if IDs and FROMs queries for sqlite

### 0.3.1 (2016-05-12)
* (bluefox) queue delete queries too for sqlite

### 0.3.0 (2016-05-08)
* (bluefox) support of custom queries
* (bluefox) only one request simultaneously for sqlite
* (bluefox) add tests (primitive and only sql)

### 0.2.0 (2016-04-30)
* (bluefox) support of milliseconds
* (bluefox) fix sqlite

### 0.1.4 (2016-04-25)
* (bluefox) fix deletion of old entries

### 0.1.3 (2016-03-08)
* (bluefox) do not print errors twice

### 0.1.2 (2015-12-22)
* (bluefox) fix MS-SQL port settings

### 0.1.1 (2015-12-19)
* (bluefox) fix error with double entries

### 0.1.0 (2015-12-14)
* (bluefox) support of strings

### 0.0.3 (2015-12-06)
* (smiling_Jack) Add demo Data ( todo: faster insert to db )
* (smiling_Jack) change aggregation (now same as history Adapter)
* (bluefox) bug fixing

### 0.0.2 (2015-12-06)
* (bluefox) allow only 1 client for SQLite

### 0.0.1 (2015-11-19)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2015-2021 bluefox <dogafox@gmail.com>, Apollon77

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