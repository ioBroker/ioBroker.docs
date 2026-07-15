---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tidy/README.md
title: 用于发现未使用状态的 ioBroker 适配器
hash: I+Mmo7ItP91tVwL56+kjrMG+l3yTMH61TLhNIJhHY5k=
---
![标识](../../../en/adapterref/iobroker.tidy/admin/tidy.svg)

![安装数量](https://iobroker.live/badges/tidy-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/tidy-stable.svg)
![NPM 版本](https://nodei.co/npm/iobroker.tidy.svg?style=shields&data=v,u,d&color=orange)
![下载](https://img.shields.io/npm/dm/iobroker.tidy.svg)
![社区](https://img.shields.io/badge/community%20-ioBroker%20|%20forum-blue.svg)
![维护者](https://img.shields.io/badge/maintainer-skvarel%20@%20inventwo-yellowgreen.svg)
![人工智能](https://img.shields.io/badge/ai%20assisted-cursor-blue.svg)
![PayPal捐赠](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)

# 用于发现未使用状态的 ioBroker 适配器
---

## 此适配器的功能
**Tidy** 适配器可帮助您查找未使用的对象和状态，从而清理系统。使用 ioBroker 多年后，您的系统可能会积累来自已删除脚本、已移除适配器或已弃用配置的“死”数据点。此适配器可帮助您识别并清理这些数据点，从而保持系统整洁高效。

＃＃ 特征
- **📊 基于路径的扫描**：通过对象选择器配置多个要扫描的路径（例如，`0_userdata.0`、`alias.0`）
- **🚫 例外情况**：从扫描结果中排除故意静态的数据点、整个文件夹或通配符模式。
- **🔍智能检测**：识别不同类型的异常数据点：
- **已失效**：从未更新或极其陈旧（可配置阈值，默认值：365 天）
- **过期**：近期未更新（可配置阈值，默认值：90 天）
- **孤立别名**：指向不存在的目标数据点的别名
- **未定义**：自系统启动以来从未写入过的数据点
- **⚙️灵活配置**：
- 可配置的“过期”和“死亡”检测年龄阈值
- 可选的按可配置间隔（例如每小时）自动扫描
- 启用/禁用单个扫描路径
- 可选：对整个对象树进行完整扫描
- **🌐 完整扫描**：通过单独的结果通道扫描系统中的所有状态（不限于已配置的路径）。
- **🎯 手动触发**：每个已配置的路径都有一个触发按钮，可按需运行扫描。
- **📋 JSON 表格输出**：结果以 JSON 数组形式提供，非常适合用于 VIS 中的表格控件。
- **📈 统计数据**：自动统计总数、失效数据、过期数据和孤立数据点

＃＃ 配置
### 常规设置
- **启用自动扫描**：启用后，所有已配置的路径都会自动扫描。
- **扫描所有对象（完整）**：启用此选项后，适配器将扫描整个对象树并将结果存储在单独的“完整”通道中（见下文）。
- **扫描间隔**：自动扫描的运行频率（以小时为单位，最少 1 小时）
- **距离“过期”还剩天数**：超过此天数未更新的数据点将被标记为过期（警告）
- **距离“失效”的天数**：超过此天数未更新的数据点将被标记为失效（严重）。

### 扫描路径
配置要监控的一个或多个路径：

- **已启用**：启用/禁用此扫描路径
- **扫描路径**：从对象树中选择文件夹，或手动输入路径（例如，`0_userdata.0`、`alias.0`、`javascript.0`）。选择后，该字段仍可编辑。
- **所有适配器实例**：移除实例编号以扫描每个实例——例如，`alias` 而不是 `alias.0` 将匹配 `alias.0`、`alias.1` 等等。
- **名称**：此路径的友好名称（用于结果状态命名）
- **检查别名目标**：对于 `alias.*` 路径，检查目标数据点是否仍然存在（幽灵检测）

### 例外情况
排除不应出现在扫描结果或统计数据中的数据点：

- **对象**：选择一个状态或文件夹/频道以排除整个子树。支持通配符：`*` 匹配任何后缀，`?` 匹配单个字符（例如 `0_userdata.0.rollo.trigger*`）。
- **注释**：可选说明（例如，为什么排除此数据点）

对于很少更改的配置值（例如，警报脚本中存储的电台），请使用此功能，以免它们被标记为无效或过时。

例外情况适用于基于路径的扫描和完整扫描。每个扫描通道提供 **`exceptionCount`** — 上次扫描期间排除的数据点数（如果没有排除，则为 0）。

## 数据点
对于每个已配置的路径（例如，“userdata”），适配器会创建：

- **`tidy.0.userdata.trigger`**（按钮）：点击手动开始扫描
- **`tidy.0.userdata.result`** (json): 以 JSON 表格形式返回完整的扫描结果
- **`tidy.0.userdata.lastScan`**（时间戳）：上次扫描的时间
- **`tidy.0.userdata.count`**（数字）：找到的数据点总数
- **`tidy.0.userdata.deadCount`**（数字）：死亡数据点的数量
- **`tidy.0.userdata.staleCount`**（数字）：过期数据点的数量
- **`tidy.0.userdata.orphanedCount`**（数字）：孤立别名的数量
- **`tidy.0.userdata.exceptionCount`**（数字）：被异常列表排除的数据点数量

如果在常规设置中启用“扫描所有对象（完整）”，适配器还会创建：

- **`tidy.0.complete.trigger`**（按钮）：点击手动启动完整扫描
- **`tidy.0.complete.result`** (json): 扫描系统中所有状态的结果
- **`tidy.0.complete.lastScan`**（时间戳）：上次完整扫描执行的时间
- **`tidy.0.complete.count`**（数字）：找到的数据点总数
- **`tidy.0.complete.deadCount`** (数字): 死亡数据点的数量
- **`tidy.0.complete.staleCount`**（数字）：过期数据点的数量
- **`tidy.0.complete.orphanedCount`**（数字）：孤立别名的数量
- **`tidy.0.complete.exceptionCount`**（数字）：被异常列表排除的数据点数量

完整扫描使用与基于路径的扫描相同的 JSON 结果结构。启用此选项后，自动扫描将包含完整扫描。

### JSON 结果结构
`result` 状态包含一个 JSON 数组，其中每个数据点包含以下字段：

```json
[
  {
    "id": "0_userdata.0.hallway.light_auto",
    "name": "Hallway Light Automation",
    "last_ts": 1712856000000,
    "last_ts_iso": "2026-04-11T16:00:00.000Z",
    "value": true,
    "status": "active",
    "issue": null,
    "size": 4
  },
  {
    "id": "0_userdata.0.test.old_value",
    "name": "Test Datapoint",
    "last_ts": null,
    "last_ts_iso": "undefined",
    "value": 15,
    "status": "undefined",
    "issue": "dead",
    "size": 2
  }
]
```

**字段说明：**

| 字段 | 描述 | 用途 |
|-------|-------------|---------|
| `id` | 完整数据点路径 | 唯一标识 |
| `last_ts` | Unix 时间戳（毫秒）或空值 | 后台排序 |
| `last_ts_iso` | ISO 8601 日期字符串 | 以表格形式显示 |
| `value` | 当前数据点值 | 删除前的最终检查 |
| `status` | `active`, `dead`, `stale`, `undefined`, `orphaned` | 分类（英文） |
| `status_de` | `aktiv`, `inaktiv`, `veraltet`, `undefiniert`, `verwaist` | 分类（德语） |
| `issue` | `dead`、`stale`、`orphaned_alias` 或 `null` | 筛选条件（空值 = 可以） |
| `issue_de` | `inaktiv`、`veraltet`、`verwaistes Alias` 或 `null` | 筛选条件（德语） |
| `size` | `JSON.stringify(val).length` | 查找“存储空间占用大户” |
| `size` | `JSON.stringify(val).length` | 查找“占用大量存储空间”的数据 |

## 使用示例
### 基本设置
1. 安装并配置适配器
2. 使用对象选择器添加要扫描的路径（例如，`0_userdata.0`），或手动输入路径。
3. 给它起个名字（例如，“用户数据”）
4. 保存配置
5. 适配器将立即执行初始扫描
6. 在 `tidy.0.userdata.result` 中查看结果

### 多实例扫描路径
要扫描适配器的所有实例，请在选择后从路径中删除实例编号：

- `alias.0` → 仅扫描第一个别名实例
- `alias` → 扫描 `alias.0`、`alias.1` 以及任何其他别名实例

使用对象选择器后，路径字段仍然完全可编辑。

### 例外情况
1. 打开适配器配置中的“例外”选项卡
2. 添加应忽略的数据点（例如，很少更新的配置值）
3. 为单个数据点选择一个状态，选择一个文件夹以排除整个子树，或者输入通配符模式（例如 `0_userdata.0.rollo.trigger*`）
4. 保存配置——排除的数据点将不再出现在扫描结果或计数中

### VIS 集成
使用表格组件显示和排序数据点，并导入 JSON 结果：

1. 在 VIS 中创建一个表格控件（例如，inventwo 表格控件）
2. 将其绑定到 `tidy.0.userdata.result`
3. 配置列：
- 对于**德语**表：`id`、`name`、`last_ts_iso`、`status_de`、`issue_de`
- 对于**英文**表：`id`、`name`、`last_ts_iso`、`status`、`issue`
4. 按 `last_ts`（最早的数据在前）排序，找到“最死”的数据点
5. 筛选条件为 `issue != null`，仅显示有问题的数据点

### 完成扫描
1. 在常规设置中启用“扫描所有对象（完整）”选项
2. 保存配置 — 适配器执行初始完整扫描
3. 在 `tidy.0.complete.result` 中查看结果
4. 可随时使用 `tidy.0.complete.trigger` 进行手动重新扫描

使用完整扫描可以概览实例中的所有状态。对于有针对性的清理，基于路径的扫描（例如 `0_userdata.0`、`alias.0`）通常更实用。

### 自动维护
1. 在设置中启用“自动扫描”。
2. 将间隔设置为24小时（每天一次）
3. 监控 `deadCount` 和 `staleCount` 统计信息
4. 每周审查结果，以确定待清理对象。

＃＃ 支持
如果您喜欢我们的作品并希望支持我们，我们非常感谢您的任何捐赠。

（此链接指向我们的PayPal账户，与ioBroker无关。）

[![捐赠](img/support.png)](https://www.paypal.com/donate?hosted_button_id=7W6M3TFZ4W9LW)

## 较早的更改
- [CHANGELOG_OLD.md](CHANGELOG_OLD.md)

## Changelog
<!--
	### **WORK IN PROGRESS**
-->

### 0.3.3 (2026-06-18)
- (skvarel) Fixed complete scan failing with "Invalid string length" on large instances
- (skvarel) Modified complete scan to load states in bulk instead of one-by-one

### 0.3.2 (2026-06-18)
- (skvarel) Removed accidentally committed local dev-server data directory from repository (fixes #14)

### 0.3.1 (2026-06-16)
- (skvarel) Added admin UI help text explaining "Check alias targets" on Scan Paths tab (boxed info panel)
- (skvarel) Fixed alias target check for read/write split aliases (common.alias.id with read and write)

### 0.3.0 (2026-06-13)
- (skvarel) Added wildcard patterns for exception list (* matches any suffix, ? matches one character)

### 0.2.4 (2026-06-11)
- (skvarel) Fixed admin UI translations for scan path tooltips and help texts
- (skvarel) Fixed runtime validation for scan interval and stale/dead thresholds
- (skvarel) Modified scan result timestamps to use ISO 8601 format

## License

MIT License

Copyright (c) 2026 skvarel <skvarel@inventwo.com>

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