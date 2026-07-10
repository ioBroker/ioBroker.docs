---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.influxdb-prologger/README.md
title: ioBroker.influxdb-prologger
hash: 790TWubjJyY0CR5rsVb581LTViLkEz9OZK5TcWf39MM=
---
![标识](../../../en/adapterref/iobroker.influxdb-prologger/admin/influxdb-prologger.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.influxdb-prologger.svg)
![下载](https://img.shields.io/npm/dm/iobroker.influxdb-prologger.svg)
![安装数量](https://iobroker.live/badges/influxdb-prologger-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/influxdb-prologger-stable.svg)
![NPM](https://nodei.co/npm/iobroker.influxdb-prologger.png?downloads=true)

# IoBroker.influxdb-prologger
**测试：** ![测试与发布](https://github.com/simpros/ioBroker.influxdb-prologger/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 InfluxDB ProLogger 适配器
灵活的 InfluxDB v2 数据记录器，具有可配置的日志记录组、多个存储桶、基于 cron 和 on change 的触发器。

> **重要提示：** 此适配器为**只写数据记录器**。它将 ioBroker 状态值发送到 InfluxDB v2，**不会**将历史数据读回 ioBroker，也没有实现标准的 ioBroker 历史适配器接口。如果您需要查询 ioBroker 中存储的历史数据（例如，通过 `getHistory` 查询图表或脚本），请改用官方的 [ioBroker InfluxDB 适配器](https://github.com/ioBroker/ioBroker.influxdb)。

> > 此适配器的目标是让您可以更灵活地控制数据写入 InfluxDB 的方式：您可以定义多个日志组，每个日志组可以使用不同的存储桶、触发器类型（cron 或 on-change）、自定义度量名称、字段键和标签——所有这些都独立于 ioBroker 的内置历史系统。

＃＃ 特征
- **多个日志组** - 定义具有不同 InfluxDB 存储桶和触发器类型的独立组
- **基于定时任务的日志记录** - 定期收集并批量写入数据点（例如，每 15 分钟一次）
- **变更日志记录** - 当状态值发生变化时，立即将数据写入 InfluxDB（自发写入）
- **多个存储桶** - 每个日志组都可以写入不同的 InfluxDB 存储桶
- **InfluxDB v2 行协议** - 使用 InfluxDB 行协议的原生 HTTP API 写入
- **指数退避重试** - 可配置的写入失败重试逻辑
- **加密令牌存储** - API 令牌以加密形式存储在 ioBroker 数据库中。
- **连接测试** - 直接从管理界面测试您的 InfluxDB 连接
- **管理界面** - 可通过 ioBroker 管理界面进行完全配置（JSON 配置）

＃＃ 要求
- ioBroker，js-controller 版本 >= 6.0.11
- ioBroker 管理员版本 >= 7.0.23
- Node.js 版本 >= 20
- InfluxDB v2 实例

＃＃ 配置
### 1. 连接选项卡
配置 InfluxDB v2 连接：

| 设置 | 描述 |
|---------|-------------|
| 协议 | HTTP 或 HTTPS |
| 主机 | InfluxDB 服务器主机名或 IP 地址（例如，`192.168.10.191`） |
| 端口 | InfluxDB 服务器端口（默认值：`8086`） |
| 组织 | 您的 InfluxDB 组织名称 |
| API令牌 | InfluxDB API令牌（加密存储） |

使用**测试连接**按钮验证连接性。

### 2. 日志组选项卡
定义一个或多个日志记录组。每个组包含：

| 设置 | 描述 |
|---------|-------------|
| 已启用 | 启用/禁用此组 |
| 组名称 | 此组的唯一名称（数据点引用该名称） |
| 存储桶 | 要写入的 InfluxDB 存储桶 |
| 触发类型 | `Cron (periodic)` 或 `On Change` |
| Cron 表达式 | Cron 计划任务（仅适用于 Cron 组），例如：`*/15 *** *` |
| 批处理 | 启用批处理写入（适用于定时任务组） |

**示例组：**

| 名称 | 存储桶 | 触发器 | 定时任务 |
|------|--------|---------|------|
|贝特里布斯通登 | iobroker |克朗 | `*/15 * * * *` |
|自发性 | iob_spontanwerte |论变革 | - |

### 3. 数据点选项卡
配置要记录的 ioBroker 状态。每个数据点必须引用一个日志记录组：

| 设置 | 描述 |
|---------|-------------|
| 已启用 | 启用/禁用此数据点 |
| 组 | 日志记录组的名称（必须与选项卡 2 中的组匹配） |
| 对象 ID | 要读取的 ioBroker 状态（使用对象浏览器） |
| 测量 | InfluxDB 测量名称 |
| 字段 | InfluxDB 字段名称 |
| 标签 | InfluxDB 标签，格式为 `key=value`（例如，`area=kitchen,floor=eg`） |

**示例数据点：**

| 组 | 对象 ID | 度量 | 字段 | 标签 |
|-------|-----------|-------------|-------|------|
|贝特里布斯通登 | `0_userdata.0.Heizkessel` |联系我们泽勒站 | `area=heizkessel` |
|自发性 | `shelly.1.EM0.TotalActivePower` |能量| elektrische_leistung_haus | `区域=gesamtenergiebedarf` |

### 4. 高级选项卡
| 设置 | 描述 |
|---------|-------------|
| 写入超时 | HTTP 请求超时时间（毫秒）（默认值：5000） |
| 出错时重试 | 使用指数退避算法重试写入失败的情况 |
| 最大重试次数 | 最大重试次数（默认值：3） |
| 调试日志 | 启用详细调试日志 |

## 工作原理
### 定时任务组（定期日志记录）
1. 在每个 cron 定时任务周期，适配器会读取组中所有已配置的状态值。
2. 值采用 InfluxDB 行协议格式。
3. 所有数据行都通过单个 HTTP POST 请求批量写入 InfluxDB。

### 变更组（自发日志记录）
1. 适配器订阅每个数据点的 ioBroker 状态
2. 当状态值发生变化时，新值会立即写入 InfluxDB。
3. 每次更改都会触发一个单独的 HTTP POST 请求。

### InfluxDB 线路协议
数据采用 InfluxDB v2 行协议格式写入：

```
measurement,tag1=value1,tag2=value2 field=value
```

例子：

```
betriebssekunden,area=heizkessel zaehlerstand=12345.6
energie,area=gesamtenergiebedarf elektrische_leistung_haus=4521.3
```

## 从 ioBroker Scripts 迁移
如果您目前使用 ioBroker JavaScript 脚本进行 InfluxDB 日志记录，则可以迁移到此适配器：

1. 安装适配器
2. 配置您的 InfluxDB 连接（相同的主机、端口、组织、令牌）
3. 创建与脚本设置相匹配的日志记录组：
- 使用 `on({ id: ..., val: true })` 并带有触发状态的脚本 -> 创建一个 **Cron** 组
- 脚本使用 `on({ id: objectId })` 来处理每个状态 -> 创建一个 **On Change** 组
4. 添加 `loggingTemplate` 数组中的所有数据点
5. 禁用旧脚本
6. 验证数据是否正在流入 InfluxDB

## `package.json`中的脚本
| 脚本名称 | 描述 |
|-------------|-------------|
| `build` | 编译 TypeScript 源代码 |
| `test:ts` | 执行 `*.test.ts` 文件中定义的测试 |
| `test:package` | 确保 `package.json` 和 `io-package.json` 有效 |
| `test` | 对软件包文件和您的测试执行最小测试运行 |
| `check` | 对您的代码执行类型检查（无需编译） |
| `lint` | 运行 ESLint 检查代码格式错误和潜在错误 |
| `translate` | 将适配器中的文本翻译成所有必需的语言 |
| `release` | 创建新版本 |
| `发布` | 创建新版本 |

## Changelog
### 1.1.0 (2026-06-26)

* (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.
* (Simon Prosen) Reduced excess spacing in the admin UI header by keeping configuration tab labels on a single line
* (Simon Prosen) Spontaneous (on-change) writes are now buffered with a configurable flush window (default 5000ms, adjustable per bucket)

### 1.0.1 (2026-04-13)

* (Simon Prosen) Fixed ack handling for on-change writes so acknowledged updates are processed correctly
* (Simon Prosen) Improved admin UI responsiveness on small screens with scrollable tabs and more flexible layouts
* (Simon Prosen) Removed the batch-write toggle from the admin UI and enforce batching based on trigger type
* (Simon Prosen) Added and improved translations for additional languages in the admin UI
* (Simon Prosen) Moved admin UI packages to `devDependencies` and consolidated the project package setup
* (Simon Prosen) Updated admin logo assets and added an SVG variant
* (Simon Prosen) Refreshed build, test, TypeScript, and dependency configuration from the current template and dependency updates

### 1.0.0 (2026-03-21)
* (Simon Prosen) InfluxDB v2.x support via native HTTP API with token-based authentication
* (Simon Prosen) Dual-mode logging: cron-based periodic collection and on-change real-time writes
* (Simon Prosen) Multiple logging groups with independent bucket, trigger type, and cron schedule
* (Simon Prosen) Configurable data points with custom measurement names, field keys, and InfluxDB tags
* (Simon Prosen) InfluxDB line protocol formatting with proper type handling for strings, booleans, and numbers
* (Simon Prosen) Batch writing for cron groups combining all data points into a single HTTP request
* (Simon Prosen) Exponential backoff retry logic with smart classification (4xx no-retry, 429/5xx retry)
* (Simon Prosen) Configurable write timeout and retry attempts
* (Simon Prosen) Encrypted API token storage using ioBroker's native encryption
* (Simon Prosen) Connection health check on startup with `info.connection` state indicator
* (Simon Prosen) Admin UI with Connection, Logging Groups, Data Points, and Advanced tabs
* (Simon Prosen) Object browser for visual ioBroker state selection in admin UI
* (Simon Prosen) Connection test button for validating InfluxDB connectivity from admin UI
* (Simon Prosen) Cascading group rename updates across all referencing data points
* (Simon Prosen) Startup validation with warnings for missing or misconfigured groups and data points
* (Simon Prosen) Graceful shutdown with cron job cleanup and subscription removal
* (Simon Prosen) Debug logging mode for troubleshooting
* (Simon Prosen) English and German translations

### 0.0.1 (2026-03-20)
* (Simon Prosen) initial release

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2026 Simon Prosen <simon@prosen.dev>

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