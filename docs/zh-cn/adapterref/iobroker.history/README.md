---
BADGE-Number of Installations: http://iobroker.live/badges/history-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.history.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.history.svg
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.history/README.md
title: ioBroker.history
hash: 1BxcjI7DZqZM1IqZ+fVidPAtovw2njq9lR8wXUMol9k=
---
![标识](../../../en/adapterref/iobroker.history/../../admin/history.png)

# IoBroker.history
* [描述](#description)
* [适配器配置](#adapter-configuration)
* [存储设置](#storage-settings)
* [状态的默认设置](#default-settings-for-states)
* [状态设置](#settings-for-states)
* [用法](#usage)
* [历史数据](#history-Data)
* [图表](#chart)
* [一次启用多个状态的日志记录](#enable-logging-for-multiple-states-at-once)
* [从 Javascript 适配器访问值](#access-values-from-javascript-adapter)
* [通过 Javascript 管理历史记录](#history-logging-management-via-javascript)
* [获取启用状态列表](#get-list-of-enabled-states)
* [将历史数据迁移到 SQL 或 InfluxDB](#migrate-history-data-to-sql-or-influxdb)

＃＃ 描述
此适配器在两个阶段的过程中保存状态历史。

1. 首先数据点存储在 RAM 中
2. 一旦达到 maxLength，它们就会存储在磁盘上

## 适配器配置
### 存储设置
![适配器设置](../../../en/adapterref/iobroker.history/img/adapter-settings.png)

**存储目录** 存储文件的目录路径。

该目录将相对于默认目录“`/opt/iobroker/iobroker-data`”创建。

该目录将包含一个新的子目录，用于每个新的一天，其中包含记录的信息。

> 如果没有路径定义，数据将存储到默认位置 ``/opt/iobroker/iobroker-data/history``

> 还支持像``/mnt/history`` (Linux) or ``D:/History``（Windows）这样的绝对路径

> 请不要将数据存储在任何 ``node_modules`` 目录中！

**存储值的来源** 定义是否也将存储“来自”属性。

**存储价值确认**

**在开始/停止边界上写入 NULL 值**

### 状态的默认设置
每个应该记录的新状态都有默认设置。
之后可以为每个状态单独更改每个值。

![默认设置](../../../en/adapterref/iobroker.history/img/adapter-settings-default.png)

**去抖时间** 防止不稳定值，以确保当值在定义的毫秒数内没有变化时，只记录稳定值。

**Blocktime** 定义在存储最后一个值后多长时间不再存储任何值。
当以毫秒为单位的给定时间结束时，将记录满足所有其他检查的下一个值。

**仍然记录相同的值（秒）** 使用“仅记录更改”时，您可以在此处设置以秒为单位的时间间隔，之后不变的值也将重新登录到数据库中。

**与上一个值的最小差异** 当使用“仅记录更改”时，您可以定义新值和上一个值之间所需的最小差异。如果未达到此值，则不记录该值。

**存储保留**过去有多少值将存储在磁盘上。一旦到达应该为数据点存储新数据的时间，数据就会被删除。

**RAM 中的最大数据点计数** 定义在将它们保存到磁盘之前将在 RAM 中保存多少个值。您可以控制完成多少 I/O。这对于使用 SD 卡进行存储以延长使用寿命的系统很有用。

**查询四舍五入到**定义查询值时应四舍五入的位数。

**禁用跳过值的图表优化记录** ??

**启用数据点的增强调试日志** 如果您想查看此数据点的更详细日志，可以启用此选项。
您仍然需要启用“调试”日志级别才能看到这些附加值！这有助于调试问题或了解适配器记录值（或不记录值）的原因。

## 状态设置
应记录的状态设置在“对象”选项卡中定义。
使用最右侧列中的 cog 符号来配置日志记录设置。

![对象列表](../../../en/adapterref/iobroker.history/img/object-list.png)

将打开以下对话框：

![对象设置](../../../en/adapterref/iobroker.history/img/object-settings.png)

**已启用** 激活状态记录

**去抖时间** 防止不稳定值，以确保当值在定义的毫秒数内没有变化时，只记录稳定值。

**Blocktime** 定义在存储最后一个值后多长时间不再存储任何值。
当以毫秒为单位的给定时间结束时，将记录满足所有其他检查的下一个值。

**仅记录更改** 此功能确保仅在更改值满足其他检查时才记录更改值（见下文）。不会记录相同的值。

**仍然记录相同的值（秒）** 使用“仅记录更改”时，您可以在此处设置以秒为单位的时间间隔，之后不变的值也将重新登录到数据库中。

**与上一个值的最小差异** 当使用“仅记录更改”时，您可以定义新值和上一个值之间所需的最小差异。如果未达到此值，则不记录该值。

**忽略以下值** 不要记录小于此值的值。

**忽略上面的值**不要记录大于此值的值。

**忽略 0 或空值 (==0)** 此选项可防止将值 ``0`` or ``null`` 存储到数据库中。

**禁用跳过值的图表优化记录** ??

**Alias-ID** 您可以为 ID 定义别名。如果您更改了设备并想要连续记录数据，这将非常有用。

**存储保留**过去有多少值将存储在磁盘上。一旦到达应该为数据点存储新数据的时间，数据就会被删除。

**RAM 中的最大数据点计数** 定义在将它们保存到磁盘之前将在 RAM 中保存多少个值。您可以控制完成多少 I/O。这对于使用 SD 卡进行存储以延长使用寿命的系统很有用。

**查询四舍五入到**定义查询值时应四舍五入的位数。

**启用数据点的增强调试日志** 如果您想查看此数据点的更详细日志，可以启用此选项。
您仍然需要启用“调试”日志级别才能看到这些附加值！这有助于调试问题或了解适配器记录值（或不记录值）的原因。

＃＃ 用法
### 历史数据
单击对象的齿轮符号可打开设置。您可以在“历史数据”选项卡中找到存储的历史历史数据：

![国家历史](../../../en/adapterref/iobroker.history/img/state-history.png)

＃＃＃ 图表
对于数字状态，您还可以使用“图表”选项卡，它将数据显示为图形。

![状态图](../../../en/adapterref/iobroker.history/img/state-chart.png)

## 一次启用多个状态的日志记录
要一次启用多个状态的日志记录，您可以按“状态”类型过滤对象列表。
之后，您可以一次为所有状态启用日志记录。

> 注意：大型装置可以包含数千个状态。一次启用多个状态的日志记录可能需要很长时间。下面的过程只是一个例子！

1. 切换到对象选项卡中的列表视图
2.过滤类型“状态”
3.点击右上角的扳手符号，打开日志参数的配置
4.启用日志记录
5.配置附加参数，如“仅记录更改”
6.保存配置

![状态设置](../../../en/adapterref/iobroker.history/img/object-settings-multiple.png)

## 从 Javascript 适配器访问值
可以从已安装的 JavaScript 适配器访问这些值。例子：

- 为所有 ID 获取 50 个最后存储的事件

```javascript
sendTo('history.0', 'getHistory', {
    id: '*',
    options: {
        end:       Date.now(),
        count:     50,
        aggregate: 'onchange',
        addId:     true
    }
}, function (result) {
    for (var i = 0; i < result.result.length; i++) {
        console.log(result.result[i].id + ' ' + new Date(result.result[i].ts).toISOString());
    }
});
```

- 在最后一小时获取 ``system.adapter.admin.0.memRss`` 的存储值

```javascript
var end = Date.now();
sendTo('history.0', 'getHistory', {
    id: 'system.adapter.admin.0.memRss',
    options: {
        start:      end - 3600000,
        end:        end,
        aggregate: 'onchange'
    }
}, function (result) {
    for (var i = 0; i < result.result.length; i++) {
        console.log(result.result[i].val + ' ' + new Date(result.result[i].ts).toISOString());
    }
});
```

可用选项：

- **开始** - （可选）以毫秒为单位的时间 - *Date.now()*'
- **end** - （可选）以毫秒为单位的时间 - *Date.now()*'，默认为（现在 + 5000 秒）
- **step** - （可选）用于聚合（最大、最小、平均、总计、...）步长（以毫秒为单位）
- **count** - 如果聚合为“onchange”，则为值数，如果为其他聚合方法，则为间隔数。如果设置了步长，计数将被忽略，否则默认为 500，如果未设置
- **from** - 如果 *from* 字段应包含在答案中
- **ack** - 如果 *ack* 字段应包含在答案中
- **q** - 如果 *q* 字段应包含在答案中
- **user** - 如果 *user* 字段应包含在答案中
- **comment** - 如果 *c* 字段应包含在答案中
- **addId** - 如果 *id* 字段应包含在答案中
- **limit** - 不返回超过限制的条目
- **round** - 将结果四舍五入到小数点后的位数
- **ignoreNull** - 如果应包含空值 (false)，则替换为最后一个非空值 (true) 或替换为 0 (0)
- **removeBorderValues** - 默认情况下会返回额外的边框值以优化图表。如果不需要，请将此选项设置为 true（例如，用于脚本数据处理）
- **returnNewestEntries** - 返回的数据始终按时间戳升序排序。当使用聚合“none”并提供“count”或“limit”时，这意味着通常会返回最旧的条目（除非没有提供“start”数据）。将此选项设置为 true 以获取最新条目。
- **aggregate** - 聚合方法（默认值：'average'）：
    - *minmax* - 使用特殊算法。以小间隔拼接整个时间范围，并找到每个间隔的最大值、最小值、开始值和结束值。
    - *max* - 以小间隔拼接整个时间范围，并为每个间隔查找最大值并将其用于此间隔（将忽略空值）。
    - *min* - 与 max 相同，但取最小值。
    - *average* - 与最大值相同，但取平均值。
    - *total* - 与最大值相同，但计算总值。
    - *count* - 与 max 相同，但计算值的数量（将计算空值）。
    - *percentile* - 计算第 n 个百分位数（n 在 options.percentile 中给出，如果未提供，则默认为 50）。
    - *quantile* - 计算 n 分位数（n 在 options.quantile 中给出，如果未提供，则默认为 0.5）。
    - *integral* - 计算积分（附加参数见下文）。
    - *none* - 完全没有聚合。只有给定时期的原始值。
- **percentile** - （可选）当使用聚合方法“percentile”定义百分位水平（0..100）（默认为 50）
- **quantile** - （可选）当使用聚合方法“quantile”定义分位数级别（0..1）（默认为 0.5）
- **integralUnit** - （可选）使用聚合方法时“integral”以秒为单位定义单位（默认为 60 秒）。例如要获得 Wh 或类似小时的积分，请设置为 3600。
- **integralInterpolation** - （可选）当使用聚合方法“integral”定义插值方法（默认为“none”）。
    - *线性* - 线性插值
    - *无* - 无/逐步插值

将为聚合计算第一个和最后一个点，但聚合**无**除外。
如果您手动请求一些聚合，您应该忽略第一个和最后一个值，因为它们是根据周期之外的值计算的。

### 商店状态
如果您想将其他数据写入历史数据库，您可以使用内置系统函数**storeState**。此函数还可用于转换来自其他历史适配器（如 History 或 SQL）的数据。

成功的响应并不意味着数据真的写到了磁盘上。这只是意味着他们被处理了！

没有根据 ioBroker 数据库检查给定的 id，也不需要在那里设置或启用。如果在没有设置的情况下使用自己的 ID，则不支持“规则”参数，并会导致错误。默认的“RAM 值中存储的最大数量”用于此类 ID。

消息可以具有以下三种格式之一：

- 一个 ID 和一个状态对象
- 一个 ID 和状态对象数组
- 多个 ID 的数组，每个 ID 有一个状态对象

```javascript
sendTo('history.0', 'storeState', [
    id: 'mbus.0.counter.xxx',
    state: {ts: 1589458809352, val: 123, ack: false, from: 'system.adapter.whatever.0', ...}
], result => console.log('added'));

sendTo('history.0', 'storeState', {
    id: 'mbus.0.counter.xxx',
    state: [
      {ts: 1589458809352, val: 123, ack: false, from: 'system.adapter.whatever.0', ...},
      {ts: 1589458809353, val: 123, ack: false, from: 'system.adapter.whatever.0', ...}
    ]
}, result => console.log('added'));

sendTo('history.0', 'storeState', [
    {id: 'mbus.0.counter.xxx', state: {ts: 1589458809352, val: 123, ack: false, from: 'system.adapter.whatever.0', ...}},
    {id: 'mbus.0.counter.yyy', state: {ts: 1589458809353, val: 123, ack: false, from: 'system.adapter.whatever.0', ...}}
], result => console.log('added'));
```

此外，您可以添加属性``rules: true`` in message to activate all rules, like ``counter``, ``changesOnly``, ``de-bounce``等等。

### 删除状态
如果要从数据库中删除条目，可以使用内置系统函数 **delete**：

```javascript
sendTo('history.0', 'delete', [
    {id: 'mbus.0.counter.xxx', state: {ts: 1589458809352},
    {id: 'mbus.0.counter.yyy', state: {ts: 1589458809353}
], result => console.log('deleted'));
```

要删除某些数据点的所有历史数据，请执行：

```javascript
sendTo('history.0', 'deleteAll', [
    {id: 'mbus.0.counter.xxx'}
    {id: 'mbus.0.counter.yyy'}
], result => console.log('deleted'));
```

要删除某个数据点和某个范围的历史数据，请执行：

```javascript
sendTo('history.0', 'deleteRange', [
    {id: 'mbus.0.counter.xxx', start: '2019-01-01T00:00:00.000Z', end: '2019-12-31T23:59:59.999'},
    {id: 'mbus.0.counter.yyy', start: 1589458809352, end: 1589458809353}
], result => console.log('deleted'));
```

时间可以是自纪元以来的 ms 或 ans 字符串，可以通过 javascript Date 对象进行转换。

值将被删除**包括定义的限制**（``ts >= start AND ts <= end``）。

## 更新状态
如果您想更改数据库中的值、质量或确认标志，您可以使用内置系统功能 **update**：

```javascript
sendTo('history.0', 'update', [
    {id: 'mbus.0.counter.xxx', state: {ts: 1589458809352, val: 15, ack: true, q: 0},
    {id: 'mbus.0.counter.yyy', state: {ts: 1589458809353, val: 16, ack: true, q: 0}
], result => console.log('deleted'));
```

``ts``是强制性的。状态对象中必须至少包含一个其他标志。

## 通过 Javascript 管理历史记录
该适配器支持通过 JavaScript 启用和禁用历史记录，还支持使用其设置检索启用的数据点列表。

＃＃＃ 使能够
该消息需要具有数据点的“`id`”。此外，可选的 ``options`` 用于定义数据点特定设置：

```javascript
sendTo('history.0', 'enableHistory', {
    id: 'system.adapter.history.0.memRss',
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
        //successfull enabled
    }
});
```

### 禁用
该消息需要具有数据点的“`id`”。

```javascript
sendTo('history.0', 'disableHistory', {
    id: 'system.adapter.history.0.memRss',
}, function (result) {
    if (result.error) {
        console.log(result.error);
    }
    if (result.success) {
        //successfull enabled
    }
});
```

## 获取启用状态列表
消息没有参数。

```javascript
sendTo('history.0', 'getEnabledDPs', {}, function (result) {
    // result is an object. Example:
    {
        "system.adapter.history.0.memRss": {
            changesOnly: true,
            debounce: 0,
            retention: 31536000,
            maxLength: 3,
            changesMinDelta: 0.5,
            enabled: true,
            changesRelogInterval: 0,
            aliasId: ""
        }
    }
});
```

## 将历史数据迁移到 SQL 或 InfluxDB
＃＃＃ 大概的概念
当您随着时间的推移拥有更多数据时，历史适配器可能不是最佳选择，而真正的数据库会更好。为此，有更多的数据存储适配器。例如。用于 SQL 数据库（PostgreSQL、MS-SQL、MySQL、SQLite）和 InfluxDB。
随着这种变化，问题出现了如何将收集到的数据从过去转换为这些新的适配器。

为此，一些转换器脚本已放置在目录``/opt/iobroker/node_modules/iobroker.history/converter`` that can help and do the job. These scripts are called from the command line with ``node``中。

### 执行转换时的最佳实践
如果您从一种历史方法转移到另一种历史方法，我建议以下过程：

1. 为相关状态激活新的历史记录方法（sql/influxdb）并开始记录并检查它是否按预期工作。这意味着您记录“两次”（在历史记录和新目标中）。
2. 运行分析脚本以获得重复记录开始的“截止”点。
3. 停止历史适配器并执行迁移（这可能需要一些时间）。因此，旧值将添加到新值中。
4. 当您确定您做了任何事情并检查了错误文件时：删除历史数据以获取一些空间。

### 步骤1：准备和分析传输目标中的现有数据
转换数据时，只应传输那些尚未存在的数据。因此存在第一组脚本，称为 **analyze<db>.js**。此脚本应在开始时执行一次，以收集现有数据的一些数据并将它们存储在本地 .json 文件中以供实际转换器脚本使用。

收集两种数据：

- **数据点 ID 的最早值**：第一个条目的时间戳

默认情况下，每个现有数据点都会被存储并被导入忽略所有较新的值。假设数据从第一个条目开始完全填充，并且所有早期值都将被复制。
这个假设可以在导入时被参数覆盖。

- **每个数据点 ID 每天的现有值**：分析现有数据

以每天为基础，并且每一天都存储在已经存在数据的地方。这可以用作第一个数据的替代方案，以便也能够填补数据中的“漏洞”。

####analyzeinflux.js
该脚本为 InfluxDB 实例收集上述数据。

**用法**：

``node analyzeinflux.js [InfluxDB-Instance] [Loglevel] [--deepAnalyze]``

**例子**：

``node analyzeinflux.js influxdb.0 info --deepAnalyze``

参数：

- InfluxDB-Instance：应该使用哪个 influxdb-Adapter 实例？ （默认：influxdb.0）如果设置需要是脚本名称后的第一个参数。
- 日志级别：输出的日志级别（默认值：信息）。如果设置需要是脚本名称之后的第二个参数。
- ``--deepAnalyze``：每天也收集现有值，默认情况下只查询最早的值。

然后，该脚本将使用收集的数据生成一到三个 .json 文件。这些文件然后由真正的转换器脚本使用。

#### 分析sql.js
此脚本收集 SQL 实例的上述数据。

**用法**：

``node analyzesql.js [SQL-Instance] [Loglevel]``

**例子**：

``node analyzesql.js sql.0 info``

参数：

- SQL-Instance：应该使用哪个 SQL-Adapter 实例？ (默认: sql.0) 如果设置需要是脚本名称后的第一个参数。
- 日志级别：输出的日志级别（默认值：信息）。如果设置需要是脚本名称之后的第二个参数。

然后，该脚本将使用收集的数据生成两个 .json 文件。这些文件然后由真正的转换器脚本使用。

### 将历史数据转换为数据库
该脚本将直接使用磁盘上历史适配器生成的 JSON 文件将它们传输到数据库中。此外，它使用目标数据库中已存在值的预生成数据文件来仅转换不存在的数据。

该脚本可以在没有任何分析（步骤 1）的情况下运行，然后您需要将 startdata 设置为参数，它会简单地从该时间点向后转换任何内容。

如果您之前运行过分析并且存在 **earliestDBValues.json** 文件，则只有这些数据点会被转换，除非您使用参数来更改它。

当之前运行分析并使用数据文件时，它们也会使用所有转换的数据进行更新，因此第二次运行通常不会产生重复。

要重置数据，请删除文件 **earliestDBValues.json**、**existingDBValues.json** 和/或 **existingDBTypes.json**。

然后，转换器在所有可用数据的日子里及时回溯，并确定将哪些数据传输到 InfluxDB。

> 如果要中止进程，可以按“x”或“<CTRL-C>”。

转换器脚本本身应该适用于所有支持 **storeState** 方法的历史适配器。

> 注意：迁移大量数据会对系统产生一定的负载，尤其是 > 当转换器和目标数据库实例在同一台机器上运行时。
> 在操作期间监控您的系统负载和性能，并可能使用 > ``delayMultiplicator`` 参数来增加转换器的延迟。

**用法：**

``node history2db.js [DB-Instanz] [Loglevel] [Date-to-start|0] [path-to-Data] [delayMultiplicator] [--logChangesOnly [relog-Interval(m)]] [--ignoreExistingDBValues] [--processNonExistingValuesOnly] [--processAllDPs] [--simulate]``

**例子**：

``node history2db.js influxdb.0 info 20161001 /path/to/data 2 --logChangesOnly 30 --processNonExistingValuesOnly``

可能的选项和参数：

- **DB-Instance**：将数据发送到的DB-Instance。必填参数。需要是脚本名称后的第一个参数。
- **Loglevel**：输出的日志级别（默认值：info）。如果设置需要是脚本名称之后的第二个参数。
- **开始日期**：以 `yyyymmdd` 格式开始的日期（例如 20161028）。使用“0”使用检测到的最早值。如果设置需要是脚本名称后的第三个参数。
- **path-to-Data**：数据文件的路径。默认为 iobroker-install-directory/iobroker-data/history-data 。如果设置需要是脚本名称之后的第四个参数。
- **<delayMultiplicator>**：通过乘法器修改脚本中多个动作之间的延迟。 “2”意味着转换后自己计算的延迟加倍。如果设置需要是脚本名称后的第五个参数。
- **--logChangesOnly [relog-Interval(m)]**：当设置--logChangesOnly 时，数据被解析和减少，因此只有更改的值存储在 InfluxDB 中。此外，可以在几分钟内设置“重新记录间隔”，以便在此间隔之后重新记录未更改的值。
- **--ignoreExistingDBValues**：使用此参数，所有现有数据都将被忽略，所有数据都将插入数据库。请确保不生成重复项。此选项可用于修复数据中缺少某些数据的“漏洞”。默认情况下，它只填充数据库中至少有一个条目的所有数据点。这可以被 `--processAllDPs` 覆盖
- **--processNonExistingValuesOnly**：使用此参数，使用分析脚本中的“每日现有数据点”文件并检查每一天和数据点。 **在这种模式下，existing-DB-Values 总是被忽略，也不会更新，所以请在使用该模式后再次运行分析！！！**
- **--processAllDPs**：使用此参数，您可以确保历史文件中的所有现有数据点都传输到数据库中，即使这些数据点目前不存在于该数据库中。
- **--simulate**：使用此参数启用模拟模式，意味着不会发生真正的写入，并且分析数据文件也不会在退出时更新。

## Changelog

### __WORK IN PROGRESS__
* (Apollon77) Fix getHistory when aggregations were used in some cases

### 2.2.4 (2022-09-19)
* (Apollon77) Update for future js-controller versions

### 2.2.3 (2022-09-12)
* (Apollon77) Fix error in history2db converter script

### 2.2.1 (2022-08-13)
* (Apollon77) Fix crash cases reported by Sentry
* (kleinOr) Updated converter scripts to work with influxdb 2.x

### 2.2.0 (2022-07-22)
* (Apollon77) make sure getHistory works for all cases
* (Bluefox/Apollon77) Add option to add comment and user info to results

### 2.1.7 (2022-06-27)
* (Apollon77) Allow to remove a configuration value for "round" in config again

### 2.1.6 (2022-06-27)
* (Apollon77) When not count is provided for aggregate "none" or "onchange" then the limit (default 2000) is used as count to define the number of data to return.

### 2.1.5 (2022-06-24)
* (Apollon77) Ignore errors from forked process after response was sent for GetHistory

### 2.1.4 (2022-06-12)
* (Apollon77) Make sure debug log is active according to the settings

### 2.1.3 (2022-06-08)
* (Apollon77) Huge performance optimizations for GetHistory calls

### 2.1.2 (2022-05-28)
* (Apollon77) Fix crash case reported by Sentry

### 2.1.1 (2022-05-27)
* (Apollon77) Fix crash case reported by Sentry

### 2.1.0 (2022-05-27)
* (Apollon77) Fix several crash cases reported by Sentry
* (Apollon77) Make sure disabling "Log changes only" also really do not log the changes anymore
* (Apollon77) Allow storeState and GetHistory also to be called for "unknown ids"

### 2.0.1 (2022-05-11)
* (Apollon77) BREAKING: Configuration is only working in the new Admin 5 UI!
* (Apollon77) Did bigger adjustments to the recording logic and added a lot of new Features. Please refer to Changelog and Forum post for details.
* (Apollon77) Make sure disabling "Log changes only" also really do not log the changes anymore

### 2.0.0 (2022-05-11)
* (Apollon77) BREAKING: Configuration is only working in the new Admin 5 UI!
* (Apollon77) BREAKING! Did bigger adjustments to the recording logic. Debounce is refined and blockTime is added to differentiate between the two checks
* (Apollon77) BREAKING! GetHistory requests now need to deliver the ts in milliseconds! Make sure to use up to date scripts and Charting UIs
* (Apollon77) New setting added to disable the "logging of additional values for charting optimization" - then only the expected data are logged
* (Apollon77) Add flag returnNewestEntries for GetHistory to determine which records to return when more entries as "count" are existing for aggregate "none"
* (Apollon77) Make sure id is always returned on GetHistory when addId is set
* (Apollon77) Add new Debug flag to enable/disable debug logging on datapoint level (default is false) to optimize performance
* (Apollon77) Add support to specify how to round numbers on query per datapoint
* (Apollon77) Add aggregate method "percentile" to calculate the percentile (0..100) of the values (requires options.percentile with the percentile level, defaults to 50 if not provided). Basically same as Quantile just different levels are used
* (Apollon77) Add aggregate method "quantile" to calculate the quantile (0..1) of the values (requires options.quantile with the quantile level, defaults to 0.5 if not provided). Basically same as Percentile just different levels are used
* (Apollon77) Add (experimental) method "integral" to calculate the integral of the values. Requires options.integralUnit with the time duration of the integral in seconds, defaults to 60s if not provided. Optionally a linear interpolation can be done by setting options.integralInterpolation to "linear"
* (Apollon77) When request contains flag removeBorderValues: true, the result then cut the additional pre and post border values out of the results
* (Apollon77) If storeState Message calls include a rules property then the new value is added with respecting all rules (incl. debounce, so be careful!)
* (Apollon77) Enhance the former "Ignore below 0" feature and now allow specifying to ignore below or above specified values. The old setting is converted to the new one
* (Apollon77) Allow to specify custom retention duration in days
* (Apollon77) Adjust handing for data files prior 1.1.2010 and automatically convert older ts formats to the new one
* (Apollon77) Adjust handling of data prior 1.1.2000 in the importer scripts
* (Apollon77) Make sure that min change delta allows numbers entered with comma (german notation) in all cases

### 1.11.1 (2022-03-26)
* (Apollon77) Fix the js-controller and admin minimum version

### 1.11.0 (2022-02-22)
* (bluefox) Added support deletion and changing of stored values.

### 1.10.6 (2022-02-19)
* (Apollon77) Prevent some crash cases reported by Sentry

### 1.10.5 (2021-12-19)
* (Excodibur) Hide settings not relevant when "log changes only" is not used
* (Apollon77) Allow all number values for debounce again

### 1.10.4 (2021-12-14)
* (bluefox) Support only `js.controller` >= 3.3.x
* (bluefox) Used system/custom view for collecting the objects
* (bluefox) Implemented option to ignore zero- or/and below zero- values

### 1.9.14 (2021-11-19)
* (Apollon77) Prevent crash cases reported by Sentry

### 1.9.13 (2021-04-19)
* (bluefox) Added the support of Admin5

### 1.9.12 (2021-01-17)
* (Apollon77) Optimize stop handling

### 1.9.10 (2020-07-28)
* (bluefox) Code formatting done
* (bluefox) Filtered out the acknowledgment and the quality from the getHistory call if not requested

### 1.9.9 (2020-06-29)
* (Apollon77) prevent crashes (Sentry IOBROKER-HISTORY-K, IOBROKER-HISTORY-J, IOBROKER-HISTORY-C, IOBROKER-HISTORY-G)

### 1.9.8 (2020-05-14)
* (bluefox) added command to read supported features

### 1.9.7 (2020-05-08)
* (bluefox) set default history if not yet set

### 1.9.6 (2020-05-04)
* (Apollon77) optimize retention directory logic again (Sentry IOBROKER-HISTORY-A)

### 1.9.5 (2020-04-30)
* (Apollon77) optimize retention directory logic again (Sentry IOBROKER-HISTORY-7)

### 1.9.4 (2020-04-23)
* (Apollon77) Catch error when Storage directory can not be created (Sentry IOBROKER-HISTORY-1)
* (Apollon77) make sure internal structures are initialized correctly (Sentry IOBROKER-HISTORY-2)
* (Apollon77) make sure to handle cases where retention directory is not existing (Sentry IOBROKER-HISTORY-3)

### 1.9.3 (2020-04-19)
* __Requires js-controller >= 2.0.0__
* (foxriver76) removed usage of adapter.objects
* (Apollon77) check if objects have changed and ignore unchanged
* (Apollon77) adjust allowed file system names
* (Apollon77) Add Sentry for Error Reporting with js-controller 3.0
* (Apollon77) Make sure value undefined is ignored

### 1.8.7 (2019-09-02)
* (paul53) old files should be deleted automatically

### 1.8.6 
* Fix several smaller issues and optimized some texts

### 1.8.5 (2018-07-02)
* (Apollon77) Error fixed in storeState

### 1.8.4 (2018-06-24)
* (Apollon77) Fixing/allow to disable writing of start and end values

### 1.8.0 (2018-06-19/24)
* (Apollon77) Add option to write data to a different ID to make device changes easier. Retrieving data works for both IDs

### 1.7.4 (2018-04-03)
* (AlCalzone) Fix filename handling for states with special characters

### 1.7.3 (2018-03-28)
* (Apollon77) Respect 'keep forever' setting for retention from datapoint configuration

### 1.7.2 (2018-02-05)
* (bondrogeen) Admin3 Fixes

### 1.7.1 (2018-01-31)
* (Bluefox) Admin3 Fixes

### 1.7.0 (2018-01-17)
* (bluefox) Ready for Admin3

### 1.6.6 (2017-12-20)
* (bluefox) translations

### 1.6.5 (2017-10-05)
* (Apollon77) fix relog value feature

### 1.6.4 (2017-08-12)
* (bluefox) add "save last value" option

### 1.6.3 (2017-08-03)
* (Apollon77) fix behaviour of log interval to always log the current value

### 1.6.2 (2017-04-07)
* fix in datatype conversions

### 1.6.0 (2017-02-28)
* (Apollon77) Replace some characters in history filenames

### 1.5.3 (2017-02-22)
* (Apollon77) Small fix for older configurations

### 1.5.2
* (Apollon77) Enhance Min-Delta logic for datapoints from type mixed

### 1.5.1 (2017-01-16)
* (bluefox) Fix handling of float values in Adapter config and Datapoint config.

### 1.5.0 (2016-12-01)
* (Apollon77) Add messages enableHistory/disableHistory
* (Apollon77) add support to log changes only if value differs a minimum value for numbers
* (Apollon77) Fixing aggregate calculation

### 1.4.0 (2016-10-29)
* (Apollon77) add option to re-log unchanged values to make it easier for visualization
* (Apollon77) added converter scripts to move history data to db

### 1.3.1 (2016-09-25)
* (Apollon77) Fixed: ts is assigned as val
* (bluefox) Fix selector for history objects

### 1.3.0 (2016-08-30)
* (bluefox) сompatible only with new admin

### 1.2.0 (2016-08-27)
* (bluefox) change name of object from history to custom

### 1.1.0 (2016-08-27)
* (bluefox) fix aggregation of last point
* (bluefox) aggregation none just deliver the raw data without any aggregation

### 1.0.5 (2016-07-24)
* (bluefox) fix aggregation on large intervals

### 1.0.4 (2016-07-05)
* (bluefox) fix aggregation on seconds

### 1.0.3 (2016-05-31)
* (bluefox) draw line to the end if ignore null

### 1.0.2 (2016-05-29)
* (bluefox) switch max and min with each other

### 1.0.1 (2016-05-28)
* (bluefox) calculate end/start values for "on change" too

### 1.0.0 (2016-05-20)
* (bluefox) change default aggregation name

### 0.4.1 (2016-05-14)
* (bluefox) support sessionId

### 0.4.0 (2016-05-05)
* (bluefox) use aggregation file from sql adapter
* (bluefox) fix the values storage on exit
* (bluefox) store all cached data every 5 minutes
* (bluefox) support of ms

### 0.2.1 (2015-12-14)
* (bluefox) add description of settings
* (bluefox) place aggregate function into separate file to enable sharing with other adapters
* (smiling-Jack) Add generate Demo data
* (smiling-Jack) get history in own fork
* (bluefox) add storeAck flag
* (bluefox) mockup for onchange

### 0.2.0 (2015-11-15)
* (Smiling_Jack) save and load in adapter and not in js-controller
* (Smiling_Jack) aggregation of data points
* (Smiling_Jack) support of storage path

### 0.1.3 (2015-02-19)
* (bluefox) fix small error in history (Thanks on Dschaedl)
* (bluefox) update admin page

### 0.1.2 (2015-01-20)
* (bluefox) enable save&close button by config

### 0.1.1 (2015-01-10)
* (bluefox) check if state was not deleted

### 0.1.0 (2015-01-02)
* (bluefox) enable npm install

### 0.0.8 (2014-12-25)
* (bluefox) support of de-bounce interval

### 0.0.7 (2014-11-01)
* (bluefox) store every change and not only lc != ts

### 0.0.6 (2014-10-19)
* (bluefox) add configuration page

## License

The MIT License (MIT)

Copyright (c) 2014-2022 Bluefox <dogafox@gmail.com>, Apollon77

Copyright (c) 2016 Smiling_Jack

Copyright (c) 2014 hobbyquaker

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