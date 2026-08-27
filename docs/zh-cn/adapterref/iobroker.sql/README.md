---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sql/README.md
title: ioBroker.sql
hash: NXEEIlPo6cH0fn2HCE2go9SbdI2baq1kA5EZpGrZRfU=
---
![标识](../../../en/adapterref/iobroker.sql/admin/sql.png)

![安装数量](http://iobroker.live/badges/sql-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.sql.svg)
![下载](https://img.shields.io/npm/dm/iobroker.sql.svg)
![测试](https://travis-ci.org/ioBroker/ioBroker.sql.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.sql.png?downloads=true)

# IoBroker.sql
此适配器将状态历史记录保存到 SQL 数据库中。

支持 PostgreSQL、MySQL、Microsoft SQL Server 和 SQLite。

如果需要使用默认端口，可以省略端口 0。

**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 更多详情以及如何禁用错误报告，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

＃＃ 设置
## 连接设置
- **数据库类型**：SQL 数据库类型：MySQL、PostgreSQL、MS-SQL 或 SQLite3
- **主机**：SQL Server 的 IP 地址或主机名
- **端口**：SQL Server 的端口（如果不确定，请留空）
- **数据库名称**：数据库名称。默认为 iobroker。
- **用户**：SQL 用户名。必须存在于数据库中。
- **密码**：SQL 密码。
- **密码确认**：请在此处重复密码。
- **加密**：某些数据库支持加密。
- **将实数四舍五入到**：小数点后的位数。
- **允许并行请求**：允许同时向数据库发出 SQL 请求。
- **不创建数据库**：如果数据库已经创建（例如由管理员创建），并且 ioBroker 用户没有足够的权限创建数据库，请激活此选项。

## 默认设置
- **防抖时间** - 用于防止不稳定值，确保仅在值在设定的毫秒数内未发生变化时才记录稳定值。注意：如果值变化频率超过此设置，则不会记录任何值（因为任何值都不稳定）。
- **阻塞时间** - 定义在存储最后一个值后多长时间内不会存储新的值。当指定的毫秒数到期后，才会记录下一个满足所有其他检查条件的值。
- **仅记录更改** - 此函数确保仅记录满足其他检查条件（见下文）的已更改值。相同的值将不会被记录。
- **仍然记录相同的值（秒）** - 使用“仅记录更改”时，您可以在此处设置一个以秒为单位的时间间隔，超过此时间间隔后，即使未更改的值也会重新记录到数据库中。您可以使用“from”字段检测适配器重新记录的值。
- **与上一值的最小差值** - 使用“仅记录更改”时，您可以定义新值与上一值之间所需的最小差值。如果未达到此差值，则不会记录该值。
- **忽略 0 或空值 (==0)** - 您可以定义是否应忽略 0 或空值。
- **忽略小于零的值（<0）** - 您可以定义是否应忽略小于零的值。
- **禁用图表优化日志记录跳过值** - 默认情况下，适配器会尝试记录用于优化图表的值。这意味着一些额外的值（例如，未满足上述所有检查的值）可能会被自动记录。如果您不希望这样做，可以禁用此功能。
- **别名 ID** - 您可以为 ID 定义别名。如果您更换了设备并希望持续记录数据，这将非常有用。请考虑将来切换到真正的别名状态！
- **存储保留期限** - 磁盘上将存储多少个历史数据值。当达到设定的时间点，需要存储新数据时，数据将被删除。
- **RAM 中存储值的最大数量** - 定义在将值持久化到磁盘之前，RAM 中将保存多少个值。您可以控制 I/O 操作的数量。
- **启用数据点的增强型调试日志** - 如果您想查看此数据点的更详细日志，可以启用此选项。您仍然需要启用“debug”日志级别才能看到这些附加值！这有助于调试问题或了解适配器记录（或不记录）某个值的原因。

这些值大多可以在实例设置中预先定义，然后预先填充或用于数据点。

数据库安装提示
### MS-SQL：
主机名使用 `localhost\instance`，并检查 TCP/IP 连接是否已启用。

https://msdn.microsoft.com/en-us/library/bb909712(v=vs.90).aspx

### SQLite：
这是一个“文件型”数据库，无法处理过多的事件。如果您有大量数据，请使用真正的数据库，例如 PostgreSQL 等。

SQLite 数据库无需额外安装。它只是磁盘上的一个文件，但要安装它，您的系统需要构建工具。对于 Linux 系统，只需输入：

```bash
sudo apt-get install build-essential
```

对于 Windows 系统，请使用“自动安装必要工具...”选项安装 Node.js，然后重新安装适配器，例如：

```bash
cd /opt/iobroker
iobroker stop sql
npm install iobroker.sql --production
iobroker start sql
```

### MySQL：
您可以在Linux系统上按如下方式安装MySQL：

```bash
apt-get install mysql-server mysql-client

mysql -u root -p

CREATE USER 'iobroker'@'%' IDENTIFIED BY 'iobroker';
GRANT ALL PRIVILEGES ON * . * TO 'iobroker'@'%';
FLUSH PRIVILEGES;
```

如果需要，请编辑 */etc/mysql/my.cnf* 将绑定设置为 IP 地址以进行远程连接。

**警告**：iobroker 用户是“admin”。如有必要，请授予 iobroker 用户有限的权限。

在“windows”系统上，可以通过安装程序轻松安装：https://dev.mysql.com/downloads/installer/。

请注意身份验证方法。MySQL 8.0 中的新加密算法尚不支持 `node.js`，您必须选择旧版身份验证方法。

![视窗](../../../en/adapterref/iobroker.sql/img/WindowsMySQLinstaller.png)

数据库结构
默认数据库名称为`iobroker`，但可以在配置中更改。

### 数据源 此表列出了写入这些条目的适配器实例。(state.from)
| 数据库 | 查询中的名称 |
|------------|----------------------|
| MS-SQL | iobroker.dbo.sources |
| MySQL | iobroker.sources |
| PostgreSQL | 源代码 |
| SQLite | 来源 |

结构：

| 字段 | 类型 | 描述 |
|-------|--------------------------------------------|-------------------------------------------|
| id | 整数 NOT NULL 主键 IDENTITY(1,1) | 唯一 ID |
| 名称 | varchar(255) / 文本 | 写入该条目的适配器实例 |

*注意：* MS-SQL 使用 varchar(255) 类型，而其他数据库使用 TEXT 类型。

### 数据点
此表列出了数据点（ID）。

| 数据库 | 查询中的名称 |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.datapoints |
| MySQL | iobroker.datapoints |
| PostgreSQL | 数据点 |
| SQLite | 数据点 |

结构：

| 字段 | 类型 | 描述 |
|-------|--------------------------------------------|-------------------------------------------------|
| id | 整数 NOT NULL 主键 IDENTITY(1,1) | 唯一 ID |
| 名称 | varchar(255) / 文本 | 变量 ID，例如 hm-rpc.0.JEQ283747.1.STATE |
| 类型 | 整数 | 0 - 数字，1 - 字符串，2 - 布尔值 |

*注意：* MS-SQL 使用 varchar(255) 类型，而其他数据库使用 TEXT 类型。

### 数字
类型为“数字”的状态值。**ts** 表示“时间序列”。

| 数据库 | 查询中的名称 |
|------------|------------------------|
| MS-SQL | iobroker.dbo.ts_number |
| MySQL | iobroker.ts_number |
| PostgreSQL | ts_number |
| SQLite | ts_number |

结构：

| 字段 | 类型 | 描述 |
|--------|--------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| id | 整数 | 来自“数据点”表的州 ID |
| ts | BIGINT / INTEGER | 截至 Unix 纪元的毫秒数。可以使用“new Date(ts)”转换为日期格式。 |
| 值 | 实数 | 值 |
| ack | BIT/BOOLEAN | 是否已确认：0 - 未确认，1 - 已确认 |
| _from | 整数 | 来自“Sources”表的源 ID |
| q | 整数 | 质量值以数字表示。您可以在描述 [这里](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) | 中找到 |

*注意：* MS-SQL 使用 BIT 类型，其他数据库使用 BOOLEAN 类型。SQLite 对 ts 类型使用 INTEGER 类型，对所有其他类型使用 BIGINT 类型。

用户除了定义类型 `number` 的功能外，还可以定义类型 `counters` 的功能。为此，创建了下表：

| 数据库 | 查询中的名称 |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_counter |
| MySQL | iobroker.ts_counter |
| PostgreSQL | ts_counter |
| SQLite | ts_counter |

结构：

| 字段 | 类型 | 描述 |
|--------|------------------|---------------------------------------------------------------------|
| id | 整数 | 来自“数据点”表的州 ID |
| ts | BIGINT / INTEGER | 截至 Unix 纪元的毫秒数。可以使用“new Date(ts)”转换为日期格式。 |
| 值 | 实数 | 值 |

该表存储计数器交换时的值，但该值没有增加，而是未能变为零或更低的值。

### 字符串
类型为 `string` 的状态的值。

| 数据库 | 查询中的名称 |
|------------|------------------------|
| MS-SQL | iobroker.dbo.ts_string |
| MySQL | iobroker.ts_string |
| PostgreSQL | ts_string |
| SQLite | ts_string |

结构：

| 字段 | 类型 | 描述 |
|--------|-----------------------|---------------------------------------------------------------------------------------------------------------------------|
| id | 整数 | 来自“数据点”表的州 ID |
| ts | BIGINT | 截至 Unix 纪元的毫秒时间。可以使用“new Date(ts)”转换为时间。 |
| 值 | 文本 | 值 |
| ack | BIT/BOOLEAN | 是否已确认：0 - 未确认，1 - 已确认 |
| _from | 整数 | 来自“Sources”表的源 ID |
| q | 整数 | 质量值以数字表示。您可以在描述中找到 [这里](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

*注意：* MS-SQL 使用 BIT 类型，其他数据库使用 BOOLEAN 类型。SQLite 对 ts 类型使用 INTEGER 类型，对所有其他类型使用 BIGINT 类型。

### 布尔值
类型为 `boolean` 的状态的值。

| 数据库 | 查询中的名称 |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_bool |
| MySQL | iobroker.ts_bool |
| PostgreSQL | ts_bool |
| SQLite | ts_bool |

结构：

| 字段 | 类型 | 描述 |
|--------|-------------|---------------------------------------------------------------------------------------------------------------------------|
| id | 整数 | 来自“数据点”表的州 ID |
| ts | BIGINT | 截至 Unix 纪元的毫秒时间。可以使用“new Date(ts)”转换为时间。 |
| 值 | 位/布尔值 | 值 |
| ack | BIT/BOOLEAN | 是否已确认：0 - 未确认，1 - 已确认 |
| _from | 整数 | 来自“Sources”表的源 ID |
| q | 整数 | 质量值以数字表示。您可以在描述中找到 [这里](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

*注意：* MS-SQL 使用 BIT 类型，其他数据库使用 BOOLEAN 类型。SQLite 对 ts 类型使用 INTEGER 类型，对所有其他类型使用 BIGINT 类型。

## 从 Javascript 适配器访问值
可以通过 JavaScript 适配器访问排序后的值。

* 获取所有 ID 的最近 50 个已存储事件

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

* 获取过去一小时内“system.adapter.admin.0.memRss”的存储值

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

可能的选项：

- **开始时间** - （可选）时间（毫秒） - *Date.now()*
- **结束时间** - （可选）时间，单位为毫秒 - *Date.now()*，默认值为 `(当前时间 + 5000 秒)`
- **步长** - （可选）用于聚合（最大值、最小值、平均值、总计等）间隔的步长，单位为毫秒
- **count** - 如果聚合方式为“onchange”，则表示值的数量；如果聚合方式为其他方式，则表示间隔的数量。如果设置了步长，则计数将被忽略；否则，如果未设置步长，则默认值为 500。
- **from** - 如果答案中应包含 *from* 字段
- **ack** - 如果答案中应包含 *ack* 字段
- **q** - 如果 *q* 字段应包含在答案中
- **addId** - 如果答案中应包含 *id* 字段
- **限制** - 返回的条目数不得超过限制
- **四舍五入** - 将结果四舍五入到小数点后位数
- **ignoreNull** - 如果要包含空值（false），则替换为最后一个非空值（true），否则替换为 0（0）。
- **removeBorderValues** - 默认情况下，会返回额外的边框值以优化图表显示。如果不需要此功能（例如，用于脚本数据处理），请将此选项设置为 true。
- **returnNewestEntries** - 返回的数据始终按时间戳升序排序。当使用聚合参数“none”并同时提供“count”或“limit”时，通常情况下会返回最早的条目（除非未提供起始日期）。将此选项设置为 true 可获取最新的条目。
- **聚合** - 聚合方法（默认值：`average`）：
- *minmax* - 使用特殊算法。将整个时间范围分割成若干小区间，并分别计算每个区间的最大值、最小值、起始值和结束值。
- *max* - 将整个时间范围分割成小的区间，并找到每个区间的最大值，并将其用于该区间（空值将被忽略）。
- *min* - 与 max 相同，但取最小值。
- *平均值* - 与最大值相同，但取平均值。
- *总计* - 与最大值相同，但计算总值。
- *count* - 与 max 相同，但计算值的数量（将计算 null 值）。
- *百分位数* - 计算第 n 个百分位数（n 在 `options.percentile` 中给出，如果未提供则默认为 50）。
- *quantile* - 计算 n 分位数（n 在 `options.quantile` 中给出，如果未提供则默认为 0.5）。
- *积分* - 计算积分（附加参数见下文）。
- *无* - 完全不进行任何聚合。仅包含给定时间段内的原始值。
- **百分位数** - （可选）在使用聚合方法时，“百分位数”定义百分位数级别（0..100）（默认为 50）
- **quantile** - （可选）在使用聚合方法时，“quantile”定义分位数级别（0..1）（默认为0.5）
- **integralUnit** - （可选）当使用聚合方法“integral”时，以秒为单位定义单位（默认为 60 秒）。例如，要获取 Wh 等的小时积分值，请设置为 3600。
- **integralInterpolation** - （可选）当使用聚合方法“integral”时，定义插值方法（默认为“none”）。
- *线性* - 线性插值
- *无* - 无/逐步插值

除聚合 `none` 外，所有聚合都会计算首尾两个点。

如果您手动请求聚合，则应忽略首尾两个值，因为它们是根据时间段之外的值计算得出的。

获取计数器
用户可以查询某个计数器（type=number，counter=true）在特定时间段内的值。

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

如果计数器装置被更换，也会进行重新计算。

## 自定义查询
用户可以通过 JavaScript 适配器对表执行自定义查询：

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

或者获取 ID=system.adapter.admin.0.memRss 的最近一小时的条目。

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

*笔记：*

根据数据库的不同，必须在表名之前插入数据库名称或数据库名称+模式 - 请参阅上面“数据库结构”下的方框。

例如，如果你的数据库名为“iobroker”：

| 数据库 | 查询中的名称 |
|---------|---------------------------------------------|
| MS-SQL | `SELECT * FROM iobroker.dbo.datapoints ...` |
| MySQL | `SELECT * FROM iobroker.datapoints ...` |

## 数据浏览器
实例设置中包含一个“数据浏览器”选项卡：左侧显示数据库中所有有数据的数据点，右侧显示所选数据点的存储值。您可以翻页浏览、编辑、删除数据点，也可以插入新数据。该选项卡需要实例正在运行才能使用。

该组件是一个 JSON 配置组件（`custom`）。其源代码位于 `src-admin`，构建好的包位于 `admin/custom`，已提交：

```bash
npm run npm:admin      # install the dependencies of the component (only once)
npm run build:admin    # clean, build and copy into admin/custom
cd src-admin && npm start   # development server on http://localhost:4173
```

数据点列表来自消息 **getDatapoints**，该消息也可以在脚本中使用：

```js
sendTo('sql.0', 'getDatapoints', {}, result => {
    // [{id: 'system.adapter.admin.0.memRss', index: 1, type: 'Number'}, ...]
    console.log(JSON.stringify(result.result));
});
```

它会返回 `datapoints` 表中的每个数据点（包括那些已禁用日志记录的数据点），并按 ID 排序。与 `getDpOverview` 表不同，它不会确定每个数据点的首次时间戳，而是立即返回结果。

## 读取原始值
`getHistory` 专为图表设计：它会对请求范围前后的值进行聚合、插值、舍入和加法运算。要查看和翻阅数据库中存储的行，请使用 **getRawEntries**：

```js
sendTo(
    'sql.0',
    'getRawEntries',
    {
        id: 'system.adapter.admin.0.memRss',
        start: Date.now() - 3600000, // optional, inclusive
        end: Date.now(),             // optional, inclusive
        limit: 100,                  // optional, default 100, maximum 2000
        offset: 0,                   // optional, default 0
        sort: 'desc',                // optional, 'desc' (newest first, default) or 'asc'
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

答案还包含 `id`、`index`（`datapoints` 表中的 ID）、`type`（`Number`、`String` 或 `Boolean`）、`table`（`ts_number`、`ts_string` 或 `ts_bool`）以及所使用的 `limit`、`offset` 和 `sort`。

返回的值与数据库中的原始值完全一致，**未**进行转换：`ack` 和布尔值在大多数数据库中为 `0`/`1`，字符串数据点的 `val` 为存储的字符串。如果没有存储任何源数据，则 `from` 为 `null`。

与 `update`、`delete` 和 `storeState` 类似，即使日志记录被禁用，只要数据库中仍有相关条目，此方法也适用。如果数据点未知，则答案包含 `error`。

## 存储状态
如果要将其他数据写入 SQL 数据库，可以使用内置系统函数 **storeState**。此函数还可以用于转换来自其他 History 适配器（例如 InfluxDB 或 SQL）的数据。

响应成功并不意味着数据真的被写入磁盘了，它仅仅意味着数据已被处理！

提供的 ID 不会与 ioBroker 数据库进行比对，也无需在数据库中进行设置或启用。如果使用未设置任何参数的自定义 ID，则不支持“rules”参数，并会导致错误。此类 ID 将使用默认值“存储在 RAM 中的值的最大数量”。

消息可以采用以下三种格式之一：

1. 一个 ID 和一个状态对象
2. 一个 ID 和状态对象数组
3. 包含多个 ID 的数组，每个 ID 对应一个状态对象。

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

此外，您可以在消息中添加属性 `rules: true` 以激活所有规则，例如 `counter`、`changesOnly`、`de-bounce` 等等。

如果发生错误，将返回一个包含所有单个错误消息的数组，以及一个 successCount，用于查看成功存储了多少条目。

## 删除状态
如果要从数据库中删除条目，可以使用系统内置函数 **delete**：

```javascript
sendTo('sql.0', 'delete', [
    {id: 'mbus.0.counter.xxx', state: {ts: 1589458809352}},
    {id: 'mbus.0.counter.yyy', state: {ts: 1589458809353}},
], result => console.log('deleted'));
```

要删除某个数据点的所有历史数据，请执行：

```javascript
sendTo('sql.0', 'deleteAll', [
    {id: 'mbus.0.counter.xxx'},
    {id: 'mbus.0.counter.yyy'}
], result => console.log('deleted'));
```

要删除某个数据点和某个数据范围内的历史数据，请执行以下操作：

```javascript
sendTo('sql.0', 'deleteRange', [
    {id: 'mbus.0.counter.xxx', start: '2019-01-01T00:00:00.000Z', end: '2019-12-31T23:59:59.999'},
    {id: 'mbus.0.counter.yyy', start: 1589458809352, end: 1589458809353}
], result => console.log('deleted'));
```

时间可以是自纪元以来的毫秒数，也可以是字符串，可以通过 JavaScript Date 对象进行转换。

包括已定义的限制在内的所有值都将被删除。`ts >= start AND ts <= end`

这三个命令都接受单个数据点作为对象，例如 `sendTo('sql.0', 'deleteAll', {id: 'mbus.0.counter.xxx'}, result => ...)`。

在这种情况下，删除操作执行后会发送结果，结果为 `{success: true}` 或 `{error: "..."}`。

如果使用数组，则会立即发送结果，并且不会提供关于单个删除操作的任何信息。

## 更改状态
如果要更改数据库中条目的值、质量或确认标志，可以使用内置系统功能**update**：

```javascript
sendTo('sql.0', 'update', [
    {id: 'mbus.0.counter.xxx', state: {ts: 1589458809352, val: 15, ack: true, q: 0}},
    {id: 'mbus.0.counter.yyy', state: {ts: 1589458809353, val: 16, ack: true, q: 0}},
], result => console.log('deleted'));
```

`ts` 为必填项。状态对象中必须包含至少一个其他标志。

请注意 `counters`。数据库中的 `counters` 不会被重置，您必须自行处理。

## 通过 Javascript 进行历史记录管理
该适配器支持通过 JavaScript 启用和禁用历史日志记录，并检索已启用数据点及其设置的列表。

＃＃＃ 使能够
该消息需要数据点的“id”。此外，还可以选择提供“选项”来定义数据点的特定设置：

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

### 禁用
该消息需要数据点的“id”。

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

### 获取列表
该消息没有参数。

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

<!-- 下一版本的占位符（位于行首）：

### **正在进行中** -->

## Changelog
### 4.1.0 (2026-08-26)
* (@ipod86) Added a button to the datapoint settings to delete all logged values of this datapoint
* (@GermanBluefox) The messages `delete`, `deleteRange` and `deleteAll` now report errors back to the caller instead of always answering with success
* (@GermanBluefox) The messages `delete`, `deleteRange` and `deleteAll` work now also for datapoints whose logging is disabled
* (@GermanBluefox) The messages `delete`, `deleteRange` and `deleteAll` delete the counter values of a numeric datapoint (table `ts_counter`) too
* (@GermanBluefox) Fixed `NaN` as a result of the aggregation `percentile` with 100 or `quantile` with 1
* (@GermanBluefox) Fixed the last value of the `integralTotal` aggregation: it was interpolated onto the start instead of the end of the requested range
* (@GermanBluefox) Added the message `getRawEntries` to read the stored values of one datapoint page by page (with the total number of entries) for tools that show or edit the raw data
* (@GermanBluefox) The message `update` works now also for datapoints whose logging is disabled and reports errors back to the caller
* (@GermanBluefox) `storeState` uses the data type stored in the database for known datapoints instead of deriving it from the value
* (@GermanBluefox) Added the tab `Data browser` to the instance settings: show, edit, delete and insert the stored values of a datapoint
* (@GermanBluefox) Added the message `getDatapoints` that returns all datapoints of the database immediately

### 4.0.4 (2026-08-11)
* (@GermanBluefox) Fixed that nothing was stored for datapoints with an `aliasId`: the adapter subscribed to the alias name instead of the real state ID, so no state change ever arrived

### 4.0.3 (2026-08-11)
* (@GermanBluefox) Corrected a small configuration error

### 4.0.2 (2026-08-10)
* (@GermanBluefox) Fixed empty charts for the aggregation `onchange` ("raw" in e-charts): it was run through the interval aggregation and returned only `null` values
* (@GermanBluefox) The MySQL and phpMyAdmin docker containers are no longer enabled by default: instances without the docker settings in their config (e.g. after an update from 3.x) reported "Docker is not installed"

### 4.0.1 (2026-08-07)
* (@GermanBluefox) Fixed MySQL error "Can't create more than max_prepared_stmt_count statements": every query allocated a server-side prepared statement
* (@GermanBluefox) Batches of more than 500 values are no longer sent as one multi-statement query

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