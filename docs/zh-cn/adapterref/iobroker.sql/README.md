---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sql/README.md
title: ioBroker.sql
hash: 02osqmZvJf24Pzwy/ep9AOBI5nqWUoRwZpF5L1cfL3E=
---
![标识](../../../en/adapterref/iobroker.sql/admin/sql.png)

![安装数量](http://iobroker.live/badges/sql-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.sql.svg)
![下载](https://img.shields.io/npm/dm/iobroker.sql.svg)
![测试](https://travis-ci.org/ioBroker/ioBroker.sql.svg?branch=master)
![新公共管理](https://nodei.co/npm/iobroker.sql.png?downloads=true)

#ioBroker.sql
该适配器将状态历史保存到 SQL DB 中。

支持 PostgreSQL、mysql、Microsoft SQL Server 和 sqlite。
如果需要默认端口，可以保留端口 0。

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-Plugin 文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

＃＃ 设置
## 连接设置
- **数据库类型**: SQL 数据库的类型：MySQL、PostgreSQL、MS-SQL 或 SQLite3
- **主机**：SQL Server 的 IP 地址或主机名
- **端口**：SQL Server 的端口（如果不确定则留空）
- **数据库名称**：数据库名称。默认iobroker
- **用户**：SQL 的用户名。必须存在于数据库中。
- **密码**：SQL 的密码。
- **密码确认**：只需在此处重复密码。
- **加密**：一些数据库支持加密。
- **将实数四舍五入为**：逗号后的位数。
- **允许并行请求**：允许同时向数据库发出 SQL 请求。
- **不创建数据库**：如果数据库已经创建（例如由管理员创建）并且 ioBroker 用户没有足够的权限来创建数据库，则激活此选项。

## 默认设置
- **去抖动时间** - 防止值不稳定，确保当值在定义的毫秒数内未发生变化时，仅记录稳定值。注意：如果值变化频繁，则此设置实际上不会记录任何值（因为任何值都是不稳定的）。
- **区块时间** - 定义存储最后一个值后，多久不再存储其他值。当指定的毫秒时间结束后，将记录下一个满足所有其他检查的值。
- **仅记录更改** - 此功能确保仅记录更改的值（如果这些值满足其他检查，请参阅下文）。相同的值将不会被记录。
- **仍然记录相同的值（秒）** - 使用“仅记录更改”时，您可以在此处设置一个时间间隔（以秒为单位），在此间隔之后，未更改的值也会重新记录到数据库中。您可以使用“from”字段检测适配器重新记录的值。
- **与上一个值的最小差异** - 使用“仅记录更改”时，您可以定义新值与上一个值之间的最小差异。如果未达到此值，则不会记录该值。
- **忽略 0 或空值 (==0)** - 您可以定义是否应忽略 0 或空值。
- **忽略零以下的值（<0）** - 您可以定义是否应忽略零以下的值。
- **禁用图表优化记录跳过的值** - 默认情况下，适配器会尝试记录优化图表的值。这意味着其他值（例如，未满足上述所有检查的值）会被自动记录。如果您不想这样做，可以禁用此功能。
-**别名 ID** - 您可以为 ID 定义一个别名。如果您更换了设备并希望持续记录数据，这将非常有用。请考虑在未来切换到真实的别名状态！
- **存储保留** - 磁盘上将存储过去多少个值。当达到为数据点存储新数据的时间时，数据将被删除。
- **RAM 中存储值的最大数量** - 定义在将值持久化到磁盘之前，RAM 中存储的值数量。您可以控制执行的 I/O 次数。
- **启用数据点的增强调试日志** - 如果您想查看此数据点的更详细日志，可以启用此选项。您仍然需要启用“调试”日志级别才能看到这些附加值！这有助于调试问题或了解适配器记录（或不记录）值的原因。

大多数这些值可以在实例设置中预先定义，然后预先填充或用于数据点。

## 数据库安装提示
### MS-SQL：
使用```localhost\instance```作为主机名，并检查是否已启用 TCP/IP 连接。
https://msdn.microsoft.com/en-us/library/bb909712(v=vs.90).aspx

SQLite：
是“文件”数据库，无法管理太多事件。如果数据量很大，请使用真正的数据库，例如 PostgreSQL 等。

SQLite DB 无需额外安装。它只是磁盘上的一个文件，但要安装它，您需要系统上安装相应的构建工具。对于 Linux 用户，只需输入：

```
sudo apt-get install build-essential
```

对于 Windows：

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
您可以在 Linux 系统上按如下方式安装 mysql：

```
apt-get install mysql-server mysql-client

mysql -u root -p

CREATE USER 'iobroker'@'%' IDENTIFIED BY 'iobroker';
GRANT ALL PRIVILEGES ON * . * TO 'iobroker'@'%';
FLUSH PRIVILEGES;
```

如果需要，编辑 */etc/mysql/my.cnf* 以设置绑定到 IP 地址以进行远程连接。

**警告**：iobroker 用户为“admin”。如有需要，请授予 iobroker 用户有限的权限。

在“windows”上可以通过安装程序轻松安装：https://dev.mysql.com/downloads/installer/。

请注意身份验证方法。`node.js` 尚不支持 MySQL 8.0 中的新加密算法，因此您必须选择旧式身份验证方法。

![视窗](../../../en/adapterref/iobroker.sql/img/WindowsMySQLinstaller.png)

## 数据库的结构
默认数据库名称是`iobroker`，但可以在配置中更改。

### 来源此表是写入条目的适配器实例的列表。（state.from）
| DB | 查询中的名称 |
|------------|----------------------|
| MS-SQL | iobroker.dbo.sources |
| MySQL | iobroker.sources |
| PostgreSQL | 来源 |
| SQLite | 来源 |

结构：

| 字段 | 类型 | 描述 |
|-------|--------------------------------------------|-------------------------------------------|
| id | INTEGER NOT NULL PRIMARY KEY IDENTITY(1,1) | 唯一ID |
| 名称 | varchar(255) / TEXT | 写入条目的适配器实例 |

*注意：* MS-SQL 使用 varchar(255)，其他使用 TEXT

### 数据点
该表是数据点的列表。（ID）

| DB | 查询中的名称 |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.数据点|
| MySQL | iobroker.数据点|
| PostgreSQL | 数据点 |
| SQLite | 数据点 |

结构：

| 字段 | 类型 | 描述 |
|-------|--------------------------------------------|-------------------------------------------------|
| id | INTEGER NOT NULL PRIMARY KEY IDENTITY(1,1) | 唯一ID |
| 名称 | varchar(255) / TEXT | 变量 ID，例如 hm-rpc.0.JEQ283747.1.STATE |
| 类型 | INTEGER | 0 - 数字，1 - 字符串，2 - 布尔值 |

*注意：* MS-SQL 使用 varchar(255)，其他使用 TEXT

### 数字
类型为“数字”的状态值。**ts** 表示“时间序列”。

| DB | 查询中的名称 |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_number |
| MySQL | iobroker.ts_number |
| PostgreSQL | ts_number |
| SQLite | ts_number |

结构：

| 字段 | 类型 | 描述 |
|--------|--------------------------------------------|-------------------------------------------------|
| id | INTEGER | 来自“数据点”表的状态 ID |
| ts | BIGINT / INTEGER | 到纪元的时间（毫秒）。可以使用 "new Date(ts)" 转换为时间 |
| val | REAL | 值 |
| ack | BIT/BOOLEAN | 已确认：0 - 未确认，1 - 确认 |
| _from | INTEGER | 来自“来源”表的来源 ID |
| q | INTEGER | 质量为数字。您可以找到描述[这里](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

*注意：* MS-SQL 使用 BIT，其他 SQL 使用 BOOLEAN。SQLite 使用 INTEGER，其他 SQL 使用 BIGINT。

用户可以为类型`number`定义`counters`的附加功能。为此，创建了下表：

| DB | 查询中的名称 |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_counter |
| MySQL | iobroker.ts_counter |
| PostgreSQL | ts_counter |
| SQLite | ts_counter |

结构：

| 字段 | 类型 | 描述 |
|--------|--------------------------------------------|-------------------------------------------------|
| id | INTEGER | 来自“数据点”表的状态 ID |
| ts | BIGINT / INTEGER | 到纪元的时间（毫秒）。可以使用 "new Date(ts)" 转换为时间 |
| val | REAL | 值 |

该表存储了计数器交换时的值，并且值没有增加，但未能归零或降低值。

### 字符串
类型为`string` 的状态的值。

| DB | 查询中的名称 |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_string |
| MySQL | iobroker.ts_string |
| PostgreSQL | ts_string |
| SQLite | ts_string |

结构：

| 字段 | 类型 | 描述 |
|--------|--------------------------------------------|-------------------------------------------------|
| id | INTEGER | 来自“数据点”表的状态 ID |
| ts | BIGINT | 到纪元的时间（毫秒）。可以使用 "new Date(ts)" 转换为时间 |
| 值 | 文本 | 值 |
| ack | BIT/BOOLEAN | 已确认：0 - 未确认，1 - 确认 |
| _from | INTEGER | 来自“来源”表的来源 ID |
| q | INTEGER | 质量为数字。您可以找到描述[这里](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

*注意：* MS-SQL 使用 BIT，其他 SQL 使用 BOOLEAN。SQLite 使用 INTEGER，其他 SQL 使用 BIGINT。

### 布尔值
类型为`boolean` 的状态的值。

| DB | 查询中的名称 |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_bool |
| MySQL | iobroker.ts_bool |
| PostgreSQL | ts_bool |
| SQLite | ts_bool |

结构：

| 字段 | 类型 | 描述 |
|--------|--------------------------------------------|-------------------------------------------------|
| id | INTEGER | 来自“数据点”表的状态 ID |
| ts | BIGINT | 到纪元的时间（毫秒）。可以使用 "new Date(ts)" 转换为时间 |
| val | 位/布尔值 | 值 |
| ack | BIT/BOOLEAN | 已确认：0 - 未确认，1 - 确认 |
| _from | INTEGER | 来自“来源”表的来源 ID |
| q | INTEGER | 质量为数字。您可以找到描述[这里](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

*注意：* MS-SQL 使用 BIT，其他 SQL 使用 BOOLEAN。SQLite 使用 INTEGER，其他 SQL 使用 BIGINT。

## 从 Javascript 适配器访问值
可以从 Javascript 适配器访问已排序的值。

* 获取所有 ID 的最后 50 个存储事件

```
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

* 获取过去一小时内“system.adapter.admin.0.memRss”的存储值

```
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

可能的选择：

- **start** - （可选）时间（毫秒） - *Date.now()*'
- **end** - （可选）时间（毫秒） - *Date.now()*'，默认为（现在 + 5000 秒）
-**step**-（可选）用于聚合（最大值、最小值、平均值、总计……）以毫秒为间隔的步骤
- **count** - 如果聚合方法为“onchange”，则为值的数量；如果聚合方法为其他聚合方法，则为间隔数。如果设置了步骤，则计数将被忽略；如果未设置，则默认值为 500。
- **from** - 如果 *from* 字段应该包含在答案中
-**ack** - 如果*ack*字段应该包含在答案中
- **q** - 是否应在答案中包含 *q* 字段
-**addId** - 如果答案中应包含*id*字段
- **limit** - 不返回超过限制的条目
- **round** - 将结果四舍五入到小数点后的位数
- **ignoreNull** - 如果需要包含空值（false），则替换为最后一个非空值（true）或替换为 0（0）
- **removeBorderValues** - 默认情况下，会返回额外的边框值以优化图表。如果不需要，请将此选项设置为 true（例如，用于脚本数据处理）。
- **returnNewestEntries** - 返回的数据始终按时间戳升序排序。当使用聚合“none”并同时提供“count”或“limit”时，通常返回最旧的条目（除非未提供起始数据）。将此选项设置为 true 可获取最新条目。
-**aggregate** - 聚合方法（默认值：'average'）：
- *minmax* - 使用特殊算法。将整个时间范围以小间隔拼接，并查找每个间隔的最大值、最小值、起始值和结束值。
- *max* - 以小间隔拼接整个时间范围并找到每个间隔的最大值并将其用于该间隔（空值将被忽略）。
- *min* - 与 max 相同，但取最小值。
- *平均值* - 与最大值相同，但取平均值。
- *total* - 与最大值相同，但计算总值。
- *count* - 与最大值相同，但计算值的数量（将计算空值）。
- *百分位数* - 计算第 n 个百分位数（n 在 `options.percentile` 中给出，如果未提供则默认为 50）。
- *quantile* - 计算 n 分位数（n 在 options.quantile 中给出，如果未提供则默认为 0.5）。
- *积分* - 计算积分（附加参数见下文）。
- *无* - 完全不聚合。仅显示给定时间段内的原始值。
- **百分位数** -（可选）当使用聚合方法“百分位数”时定义百分位数级别（0..100）（默认为 50）
- **quantile** -（可选）当使用聚合方法“quantile”时定义分位数级别（0..1）（默认为 0.5）
- **integralUnit** -（可选）当使用聚合方法“integral”时，以秒为单位定义单位（默认为 60 秒）。例如，要获得 Wh 等以小时为单位的积分，请设置为 3600。
- **integralInterpolation** -（可选）当使用聚合方法“integral”时定义插值方法（默认为“none”）。
- *线性* - 线性插值
- *无* - 无/逐步插值

除聚合`none`外，聚合将计算第一个点和最后一个点。
如果您手动请求某些聚合，则应忽略第一个值和最后一个值，因为它们是根据时间段之外的值计算得出的。

## 获取计数器
用户可以询问特定时间段内某些计数器（类型=数字，计数器=真）的值。

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

若计数器装置被更换，则也同样计算。

自定义查询
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

或者获取 ID=system.adapter.admin.0.memRss 过去一小时的条目

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

根据数据库，必须在表名前插入数据库名称或数据库名称+模式 - 请参阅上面“数据库结构”下的框。

例如，如果您的数据库名为“iobroker”：

| DB | 查询中的名称 |
|------------|------------------------------------------|
| MS-SQL | 从 iobroker.dbo.datapoints 中选择 *...|
| MySQL | 从 iobroker.datapoints 中选择 *...|

## 商店状态
如果您想将其他数据写入 SQL 数据库，可以使用系统内置函数 **storeState**。此函数也可用于转换来自其他历史记录适配器（例如 InfluxDB 或 SQL）的数据。

成功响应并不意味着数据真的被写入磁盘，而只是意味着数据已被处理！

指定的 ID 不会与 ioBroker 数据库进行核对，因此无需在数据库中进行设置或启用。如果使用未设置的个人 ID，则“规则”参数不受支持，并会导致错误。此类 ID 将使用默认的“RAM 中存储值的最大数量”。

消息可以采用以下三种格式之一：

1. 一个ID和一个状态对象
2. 一个ID和状态对象数组
3. 多个 ID 的数组，每个 ID 对应一个状态对象

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

此外，您可以在消息中添加属性`rules: true`来激活所有规则，如`counter`、`changesOnly`、`de-bounce`等等。

如果出现错误，则会返回一个包含所有单个错误消息的数组，同时还会返回一个 successCount 以查看成功存储了多少个条目。

## 删除状态
如果您想从数据库中删除条目，您可以使用内置系统函数**delete**：

```
sendTo('sql.0', 'delete', [
    {id: 'mbus.0.counter.xxx', state: {ts: 1589458809352},
    {id: 'mbus.0.counter.yyy', state: {ts: 1589458809353}
], result => console.log('deleted'));
```

要删除某个数据点的所有历史数据，请执行：

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

时间可以是自纪元以来的毫秒数或答案字符串，可以通过 javascript Date 对象进行转换。

值将被删除，包括定义的限制。`ts >= start AND ts <= end`

## 改变状态
如果您想更改数据库中条目的值、质量或确认标志，您可以使用内置系统函数**update**：

```
sendTo('sql.0', 'update', [
    {id: 'mbus.0.counter.xxx', state: {ts: 1589458809352, val: 15, ack: true, q: 0},
    {id: 'mbus.0.counter.yyy', state: {ts: 1589458809353, val: 16, ack: true, q: 0}
], result => console.log('deleted'));
```

`ts` 是强制性的。状态对象中必须至少包含一个其他标志。

请谨慎处理`counters`。DB 中的`counters`不会被重置，您必须自行处理。

## 通过 Javascript 进行历史记录管理
该适配器支持通过 JavaScript 启用和禁用历史记录，还支持检索启用的数据点及其设置的列表。

＃＃＃ 使能够
该消息需要包含数据点的“id”。此外，还需要可选的“options”来定义数据点特定的设置：

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
该消息需要有数据点的“id”。

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

### 获取列表
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

<!-- 下一个版本的占位符（在行首）：

### **工作正在进行** -->

## Changelog
### 3.0.1 (2024-06-13)
* (foxriver76) upgraded dependencies

### 3.0.0 (2023-09-13)
* IMPORTANT: Node.js 16.x is now needed at a minimum!
* (bluefox) Allowed setting port 0 as default
* (bluefox) Checked if a string is written into the number table
* (bluefox) Added support for `count` aggregate type on getHistory

### 2.2.0 (2022-09-19)
* IMPORTANT: Node.js 14.x is now needed at a minimum!
* (Apollon77) Fix potential crash cases with upcoming js-controller versions

### 2.1.8 (2022-08-13)
* (riversource/Apollon77) Optimize getHistory query by using "UNION ALL"
* (Apollon77) Fix crash cases reported by Sentry

### 2.1.7 (2022-06-30)
* (Apollon77) Fix crash cases reported by Sentry

### 2.1.6 (2022-06-27)
* (Apollon77) Allowed removing a configuration value for "round" in config again

### 2.1.5 (2022-06-27)
* (Apollon77) When no count is provided for aggregate "none" or "onchange" then the limit (default 2000) is used as count to define the number of data to return.
* (Apollon77) Fix the initialization of types and IDs for some cases.

### 2.1.3 (2022-06-12)
* (Apollon77) Make sure the debug log is active, according to the settings

### 2.1.2 (2022-06-08)
* (Apollon77) Huge performance optimizations for GetHistory calls

### 2.1.1 (2022-05-30)
* (Apollon77) Fix crash cases reported by Sentry

### 2.1.0 (2022-05-27)
* (Apollon77) Fix crash cases reported by Sentry
* (Apollon77) Fix several places where pooled connections might have not been returned to pool correctly and add logging for it
* (Apollon77) Work around an issue in used Pooling library that potentially gave out too many connections
* (Apollon77) Optimize retention check to better spread the first checks over time
* (Apollon77) Default to not use datapoint buffering as in 1.x when set to 0
* (Apollon77) Make sure disabling "Log changes only" also really does not log the changes anymore
* (Apollon77) Allow storeState and GetHistory also to be called for "unknown ids"
* (Apollon77) Adjust the fallback logic for type detection to use the type of the state value to log as last fallback
* (Apollon77) Fix storing booleans on MSSQL

### 2.0.2 (2022-05-11)
* (Apollon77) BREAKING: Configuration is only working in the new Admin 5 UI!
* (Apollon77) Did bigger adjustments to the recording logic and added a lot of new Features. Please refer to Changelog and Forum post for details.

### 2.0.0 (2022-05-11)
* (Apollon77) Breaking: Configuration is only working in the new Admin 5 UI!
* (Apollon77) Breaking! Did bigger adjustments to the recording logic. Debounce is refined and blockTime is added to differentiate between the two checks
* (Apollon77) Breaking! GetHistory requests now need to deliver the ts in milliseconds! Make sure to use up-to-date scripts and Charting UIs
* (Apollon77) Add RAM buffering and mass inserts for logging
* (Apollon77) New setting added to disable the "logging of additional values for charting optimization" - then only the expected data are logged
* (Apollon77) Add flag returnNewestEntries for GetHistory to determine which records to return when more entries as "count" are existing for aggregate "none"
* (Apollon77) Add support for addId getHistory flag for GetHistory
* (Apollon77) Add new Debug flag to enable/disable debug logging on datapoint level (default is false) to optimize performance
* (Apollon77) Add aggregate method "percentile" to calculate the percentile (0..100) of the values (requires options.percentile with the percentile level, defaults to 50 if not provided). Basically same as Quantile just different levels are used
* (Apollon77) Add aggregate method "quantile" to calculate the quantile (0..1) of the values (requires options.quantile with the quantile level, defaults to 0.5 if not provided). Basically same as Percentile just different levels are used
* (Apollon77) Add (experimental) method "integral" to calculate the integral of the values. Requires options.integralUnit with the time duration of the integral in seconds, defaults to 60s if not provided. Optionally a linear interpolation can be done by setting options.integralInterpolation to "linear"
* (Apollon77) When request contains flag removeBorderValues: true, the result then cut the additional pre and post border values out of the results
* (Apollon77) Enhance the former "Ignore below 0" feature and now allow specifying to ignore below or above specified values. The old setting is converted to the new one
* (Apollon77) Upgrade MSSQL and MySQL drivers incl. Support for MySQL 8
* (Apollon77) Make sure that min change delta allows numbers entered with comma (german notation) in all cases
* (Apollon77) Add support to specify how to round numbers on query per datapoint
* (Apollon77) Do not log passwords for Postgres connections
* (Apollon77) Optimize SSL support for database connections including option to allow self signed certificates
* (Apollon77) Allow to specify custom retention duration in days
* (winnyschuster) Fix Insert statement for MSSQL ts_counter
* (winnyschuster) type of ts in user queries corrected

### 1.16.2 (2022-02-16)
* (bluefox) Marked interpolated data with `i=true`

### 1.16.1 (2021-12-19)
* (Excodibur) Hide settings not relevant when "log changes only" is not used
* (Apollon77) Allow all number values for debounce again

### 1.16.0 (2021-12-14)
* (bluefox) Support only `js-controller` >= 3.3.x
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

Copyright (c) 2015-2024 bluefox <dogafox@gmail.com>, Apollon77

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