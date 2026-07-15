---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.pv-notifications/README.md
title: ioBroker PV 通知适配器
hash: cDB3mf0IE3nfderpAMyyLp+pkGlkcYC2VLbhKGwcQG4=
---
# IoBroker PV 通知适配器
![标识](../../../en/adapterref/iobroker.pv-notifications/admin/pv-notifications.png)

发送 Telegram 通知，告知光伏电池状态（满电、空电、中间电量）。

＃＃ 特征
- 🔋 **电池充满电通知**（电量 100%）
- ⚠️ **电池电量不足通知**（0%）
- 📊 **中级电量**（20%、40%、60%、80%），电量百分比和千瓦时 (kWh) 分别表示电量水平
- 🌙 **夜间模式**（可配置时间，默认：23:00-06:00）
- 🤫 **静音模式**（可配置时间，默认：12:00-15:00）
- 📈 **每日统计数据**，可在可配置时间查看（默认时间：22:00）
- 📅 **每周统计数据**（可配置工作日）
- 📆 **月度统计数据**（可选），日期可配置
- 🌤️ **天气预报** 集成（需要 openweathermap 适配器）
- ⚡ **高产量/高消耗量推荐**
- 📊 **统计数据** 来自 sourceanalytix 适配器

## 依赖项
要实现全部功能，需要以下适配器：

| 适配器 | 说明 | 必需 |
|---------|-------------|----------|
| **Telegram** | 发送通知 | ✅ 是 |
| **sourceanalytix** | 统计数据（消耗量、上网电价、电网功率） | ✅ 是 |
| **daswetter** 或 **openweathermap** | 天气预报（供参考） | ❌ 可选 |

＃＃ 配置
### 电报
| 设置 | 描述 |
|---------|-------------|
| Telegram 实例 | 例如：`telegram.0` |
| Telegram 用户 | 以逗号分隔的名称或 ID 列表，例如 `User1, User2` 或 `-123456789` |

**注意：**您可以通过**用户名**（不带@符号）和**Telegram ID**（群组/频道为否定符号）添加Telegram用户。

### 数据点
| 设置 | 描述 | 示例 |
|---------|-------------|---------|
| 电池 SOC | SOC 值（百分比） | `modbus.0.holdingRegisters.40083_Batterie_SOC` |
| 总产量 | 今日产量（千瓦时） | `javascript.0.Solar.Sungrow.Gesamtproduktion` |
| 上网电价 | 今日上网电价（千瓦时） | `sourceanalytix.0...Einspeisung...` |
| 用电量 | 今日用电量（千瓦时） | `sourceanalytix.0...Hausverbrauch...` |
| 电网电力 | 今日电网电力（千瓦时） | `sourceanalytix.0...Netzbezug...` |
| 本月产量 | 月产量（千瓦时） | `sourceanalytix.0...Produktion.currentMonth` |
| 本月用电量 | 月用电量 (kWh) | `sourceanalytix.0...Verbrauch.currentMonth` |
| 本月上网电量 | 每月上网电量 (kWh) | `sourceanalytix.0...Einspeisung.currentMonth` |
| 本月电网电力 | 月度电网电力 (kWh) | `sourceanalytix.0...Netzbezug.currentMonth` |
| 本周产量 | 周产量（千瓦时） | `sourceanalytix.0...Produktion.currentWeek` |
| 本周用电量 | 每周用电量 (kWh) | `sourceanalytix.0...Verbrauch.currentWeek` |
| 本周上网电量 | 本周上网电量 (kWh) | `sourceanalytix.0...Einspeisung.currentWeek` |
| 本周电网电力 | 每周电网电力 (kWh) | `sourceanalytix.0...Netzbezug.currentWeek` |
| 本周电网电力 | 每周电网电力 (kWh) | `sourceanalytix.0...Netzbezug.currentWeek` |

### 天气（可选）
| 设置 | 描述 | 示例（daswetter） | 示例（openweathermap） |
|---------|-------------|---------------------|-------------------------|
| 今日天气 | 今日天气描述 | `daswetter.0.Day0.forecast.currentSymbol` | `openweathermap.0.forecast.0.text` |
| 明日天气 | 明日天气描述 | `daswetter.0.Day1.forecast.currentSymbol` | `openweathermap.0.forecast.1.text` |
| 明日气温 (°C) | 明日气温 | `daswetter.0.Day1.forecast.maxTemp` | `openweathermap.0.forecast.1.temp` |
| 明日气温 (°C) | 明日气温 | `daswetter.0.Day1.forecast.maxTemp` | `openweathermap.0.forecast.1.temp` |

**注意：** 如果天气适配器提供不同的格式，也可以使用字段 `Weather Today` 和 `Weather Tomorrow`。为了获得最佳兼容性，我们建议使用 `Weather Text` 字段。

＃＃＃ 电池
| 设置 | 说明 | 默认值 |
|---------|-------------|---------|
| 电池容量 | 容量单位：瓦时 | `21000` |
| 阈值 EMPTY | “空”的 SOC | `0` |
| 重置下方全部电量 | 如果 SOC < 则重置 | `95` |
| 重置上方空值 | 如果 SOC > 则重置 | `5` |
| 重置上方空值 | 如果 SOC > 重置 | `5` |

### 中级水平
| 设置 | 说明 | 默认值 |
|---------|-------------|---------|
| 中级 | 逗号分隔的 SOC 级别 | `20,40,60,80` |
| 最小间隔 EMTP | 通知间隔分钟数 | `5` |
| 最小间隔中间值 | 通知间隔分钟数 | `30` |
| 启用夜间模式 | 夜间模式复选框 | `true` |
| 夜间模式开始 | 开始时间（格式：HH:MM） | `23:00` |
| 夜间模式结束 | 结束时间（格式：HH:MM） | `06:00` |
| 电量为 0% 时忽略夜间模式 | 电量为 0% 时始终通知 | `true` |
| 启用静音模式 | 静音模式复选框 | `false` |
| 静音模式启动 | 启动时间（格式：HH:MM） | `12:00` |
| 静音模式结束 | 结束时间（格式：HH:MM） | `15:00` |
| 静音模式结束 | 结束时间（格式：HH:MM） | `15:00` |

＃＃＃ 统计数据
| 设置 | 说明 | 默认值 |
|---------|-------------|---------|
| 每日统计时间 | 格式 HH:MM | `22:00` |
| 每周统计时间 | 格式 HH:MM | `10:00` |
| 启用月度统计 | 月度统计复选框 | `false` |
| 月份中的日期 | 1-31 | `1`（每月1日） |
| 每月时间统计 | 格式 HH:MM | `09:00` |
| 每月时间统计 | 格式 HH:MM | `09:00` |

## 示例
### 电池已充满 (100%)
```
11:45 - 🔋 *Battery FULL* (100%)

⚡ Current Production: 5356 W
🏠 Current Consumption: 1200 W
☀️ Production Today: 12.5 kWh
🔌 Feed-in Today: 8.2 kWh
🌤️ Tomorrow: ☀️ Sunny

🚗 Now ideal for: Electric car, washing machine, dishwasher!
```

### 中级 (60%)
```
11:51 - 🔋 Battery at 60% (12.6 kWh) ⬆️
⚡ Production: 5356 W
```

### 每日统计数据（22:00）
```
22:00 - 📊 *Daily Statistics PV System*
━━━━━━━━━━━━━━━━━━━━━━
🔋 Current Charge Level: 85%
⚡ Current Energy: 17.9 kWh (21.0 kWh Total)
━━━━━━━━━━━━━━━━━━━━━━
☀️ Production: 12.5 kWh
🏠 Own Consumption: 8.2 kWh (65.6%)
🔌 Feed-in: 4.3 kWh
⚡ Grid Power: 2.1 kWh
```

### 月度统计数据（每月1日09:00）
```
09:00 - 📊 *Monthly Statistics PV System*
━━━━━━━━━━━━━━━━━━━━━━
🔋 Full Cycles This Month: 28
📉 Empty Cycles This Month: 15
━━━━━━━━━━━━━━━━━━━━━━
☀️ Production: 345.2 kWh
🏠 Own Consumption: 287.5 kWh (83.3%)
🔌 Feed-in: 57.7 kWh
⚡ Grid Power: 23.4 kWh
━━━━━━━━━━━━━━━━━━━━━━
```

## 州
适配器在 `pv-notifications.0` 下创建以下状态：

### 当前统计数据
| 状态 | 类型 | 描述 |
|-------|------|-------------|
| `statistics.fullCyclesToday` | 数字 | 今日完整周期数 |
| `statistics.maxSOCToday` | 数字 | 今日最大 SOC |
| `statistics.minSOCToday` | 数字 | 今日最低 SOC |
| `statistics.fullCyclesWeek` | 数量 | 本周完整周期数 |
| `statistics.emptyCyclesWeek` | 数字 | 本周空周期 |
| `statistics.currentSOC` | 数字 | 当前 SOC |
| `statistics.currentEnergyKWh` | 数字 | 当前能量（千瓦时） |
| `statistics.currentEnergyKWh` | 数字 | 当前能量（千瓦时） |

### 已保存上月数据（用于月度统计）
| 状态 | 类型 | 描述 |
|-------|------|-------------|
| `statistics.lastMonthProduction` | 数字 | 上月产量 (kWh) |
| `statistics.lastMonthFeedIn` | 数字 | 上月上网电价 (kWh) |
| `statistics.lastMonthGridPower` | 数字 | 上月电网用电量 (kWh) |
| `statistics.lastMonthFullCycles` | 数量 | 上个月的完整周期数 |
| `statistics.lastMonthEmptyCycles` | 数字 | 上个月的空周期数 |
| `statistics.lastMonthEmptyCycles` | 数字 | 上个月的空置周期数 |

### 已保存上周数据（用于每周统计）
| 状态 | 类型 | 描述 |
|-------|------|-------------|
| `statistics.lastWeekProduction` | 数字 | 上周产量 (kWh) |
| `statistics.lastWeekFeedIn` | 数字 | 上周上网电价 (kWh) |
| `statistics.lastWeekGridPower` | 数字 | 上周电网功率 (kWh) |
| `statistics.lastWeekFullCycles` | 数量 | 上周的完整周期数 |
| `statistics.lastWeekEmptyCycles` | 数字 | 上周空循环次数 |
| `statistics.lastWeekEmptyCycles` | 数字 | 上周空置周期数 |

## 关于月度和周度统计数据的说明
**重要提示：**该适配器会自动保存上个月和上周在美国的数据。

### 月度统计数据
- 每月统计数据会在**配置日期**发送（默认日期：每月1日）
- 该适配器会在重置统计数据之前**自动**保存当月数据。
- 统计数据使用来自 `statistics.lastMonth*` 状态的**已保存数据**
- **配置：** 确保每月统计数据在**每月最后一天之后**发送（例如，每月1日上午9:00）

### 每周统计数据
- 每周统计数据会在**配置的工作日**发送（默认：星期一）
- 该适配器会在重置统计数据之前**自动**保存当前周的数据。
- 统计数据使用来自 `statistics.lastWeek*` 状态的**已保存数据**
- **配置：** 设置星期几（0=星期一，1=星期二，……，6=星期日）

## 配置示例（openweathermap）
### 配置天气数据点
如果您使用 **openweathermap** 适配器，请配置以下字段：

```
Weather Today:          openweathermap.0.forecast.0.text
Temperature Today:      openweathermap.0.forecast.0.temp
Weather Tomorrow:       openweathermap.0.forecast.1.text
Temperature Tomorrow:   openweathermap.0.forecast.1.temp
```

### 替代方案：Daswetter 适配器
```
Weather Today:          daswetter.0.Day0.forecast.currentSymbol
Temperature Today:      daswetter.0.Day0.forecast.maxTemp
Weather Tomorrow:       daswetter.0.Day1.forecast.currentSymbol
Temperature Tomorrow:   daswetter.0.Day1.forecast.maxTemp
```

### 天气示例输出
每日统计数据：

```
📊 *Daily Statistics PV System*
━━━━━━━━━━━━━━━━━━━━━━
🔋 Current Charge Level: 85%
⚡ Current Energy: 17.9 kWh (21.0 kWh Total)
━━━━━━━━━━━━━━━━━━━━━━
☀️ Production: 45.2 kWh
🏠 Own Consumption: 32.1 kWh (71%)
🔌 Feed-in: 13 kWh
⚡ Grid Power: 2 kWh
━━━━━━━━━━━━━━━━━━━━━━
🌤️ *Weather Tomorrow:* ☀️ Sunny 22.5°C
☀️ Good PV production expected!
```

**每周统计数据：**

```
📊 *Weekly Statistics PV System*
━━━━━━━━━━━━━━━━━━━━━━
🔋 Full Cycles Last Week: 5
📉 Empty Cycles Last Week: 3
━━━━━━━━━━━━━━━━━━━━━━
☀️ Production: 312.5 kWh
🏠 Own Consumption: 224.8 kWh (72%)
🔌 Feed-in: 87.7 kWh
⚡ Grid Power: 45.3 kWh
━━━━━━━━━━━━━━━━━━━━━━
💡 A healthy cycle per day is normal.
🔋 Check battery settings if many cycles.
```

### 月度统计数据（每月1日09:00）
```
09:00 - 📊 *Monthly Statistics PV System*
━━━━━━━━━━━━━━━━━━━━━━
🔋 Full Cycles Last Month: 28
📉 Empty Cycles Last Month: 15
━━━━━━━━━━━━━━━━━━━━━━
☀️ Production: 1245.7 kWh
🏠 Own Consumption: 897.3 kWh (72%)
🔌 Feed-in: 348.4 kWh
⚡ Grid Power: 185.2 kWh
━━━━━━━━━━━━━━━━━━━━━━
```

## 夜间模式和静音模式
### 夜间模式（可配置）
在**23:00 至 06:00** 期间（可配置），以下通知将被抑制：

- ❌ 电池已充满 (100%)
- ❌ 中级水平（20%、40%、60%、80%）

以下通知**始终**会发送：

- ✅ 电量为零 (0%) – 如果启用了“电量为 0% 时忽略夜间模式”

### 静音模式（可配置）
在 **12:00 至 15:00** 之间（可配置），**所有**通知都将被抑制：

- ❌ 电池已充满 (100%)
- ❌ 电池电量为零 (0%)
- ❌ 中级水平（20%、40%、60%、80%）

**注意：**静音模式会屏蔽所有通知，包括电量为0%的通知。请在您不想被打扰的时候使用（例如午睡、开会）。

＃＃ 作者
Alex1808 通过 LLM：Qwen

sadam6752@gmail.com

## 其他语言的文档
- [🇬🇧 英语](README.md)
- [🇩🇪 德语](doc/de/README.md)
- [🇷🇺 Русский](doc/ru/README.md)

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 1.2.24 (2026-03-17)
* (FIX) Added missing uk translations to news entries, fixed prettier formatting in main.js

### 1.2.23 (2026-03-17)
* (FIX) Statistics section layout: daily time, sunset checkbox and sunset object aligned on one row

### 1.2.22 (2026-03-17)
* (ADD) Sunset-based daily statistics: optional checkbox to send daily stats at sunset time from a configurable object instead of fixed time

### 1.2.21 (2026-03-17)
* (FIX) Use extendObject instead of setObjectNotExists for states with unit/role to update existing instances

### 1.2.20 (2026-03-17)
* (FIX) Remove unused admin files, reduce info logs to debug, English state names with units, channel objects for statistics/info, button read:false, this.setInterval, translate fallback to English

### 1.2.19 (2026-03-16)
* (FIX) Added v1.2.18 entry to news section in io-package.json

### 1.2.18 (2026-03-16)
* (FIX) Missing await in onBatterySOCChange, null-check in buildTestMessage, safe intermediateSteps parsing, remove dead code

### 1.2.17 (2026-03-15)
* (FIX) Removed old versions from common.news to comply with W1032 (maximum 7 versions)

### 1.2.16 (2026-03-14)
* (FIX) Removed empty line in battery full message for improved formatting

### 1.2.15 (2026-03-08)
* (ADD) Added separator lines to battery full/empty and intermediate messages for improved readability

### 1.2.14 (2026-03-06)
* (FIX) Fixed intermediate message formatting: Removed extra line break before weather data (weather today appears directly below separator)

### 1.2.13 (2026-03-03)
* (ADD) Added current production (W) to test message, daily statistics and intermediate messages with improved layout
* (FIX) README.md Changelog updated for repository checker (E6006 fix)

### 1.2.11 (2026-03-02)

* (FIX) Daily statistics: Self-consumption cannot be negative (Math.max(0, totalProd - feedIn))
* (FIX) Daily statistics: Added weather today to message (in addition to weather tomorrow)
* (FIX) Weather error logging improved (warn instead of debug for better visibility)

### 1.2.10 (2026-03-02)

* (FIX) Fixed duplicate news entry in io-package.json (E1036/E2005 fix)
* (FIX) Added full translations for common.news (pt, nl, fr, it, es, pl, uk, zh-cn)
* (FIX) Reduced news entries to 7 versions (W1032 fix)

### 1.2.7 (2026-03-02)

* (FIX) Fixed io-package.json JSON syntax error (invalid duplicate news section removed)

### 1.2.6 (2026-03-02)

* (FIX) Added size attributes (xs, xl) for monthlyStatsDay, monthlyStatsTime, weatherEnabled, weatherInIntermediate, weatherInDailyStats, highProduction, highConsumption fields (E5507 fix)

### 1.2.5 (2026-03-02)

* (FIX) Added size attributes (xs, xl) for monthlyStatsEnabled, minIntervalIntermediate, statsDayTime, statsWeekDay, statsWeekTime fields (E5507 fix)

* (FIX) Added LICENSE file (E190 fix)
* (FIX) Copyright formatting: Added two trailing spaces to copyright lines in README.md, doc/de/README.md, doc/ru/README.md (W6009/W6011/W7004 fix)

### 1.2.3 (2026-03-02)

* (FIX) Added size attributes (xs, xl) for minIntervalFull, minIntervalEmpty, intermediateSteps, quietModeStart, quietModeEnd fields (E5507 fix)

### 1.2.2 (2026-03-02)

* (FIX) Weekly statistics: Now uses weeklyProduction/weeklyConsumption/weeklyFeedIn/weeklyGridPower fields instead of daily values

### 1.2.1 (2026-03-01)

* (FIX) Added size attributes (xs, xl) for night mode and quiet mode fields in admin UI (E5507 fix)

### 1.2.0 (2026-03-01)

* (ADD) common.news section added to io-package.json for repository checker (E136 fix)

### 1.1.1 (2026-03-01)

* (FIX) Intermediate messages: Flag reset condition changed from `> 2` to `>= 2` for proper 2% tolerance

### 1.0.93 (2026-02-27)

* (FIX) size attributes (xs, xl) added for number fields in jsonConfig.json (E5507)
* (FIX) VSCode schema definitions updated for io-package.json and jsonConfig.json (W4040, W4042)

### 1.0.92 (2026-02-27)

* (ADD) VSCode settings added with JSON schema definitions (S4036)

### 1.0.91 (2026-02-27)

* (FIX) Old news removed from io-package.json (E2004, W1032)
* (FIX) size attributes (xs, xl) added for all objectId fields in jsonConfig.json (E5507)
* (FIX) .commitinfo added to .gitignore (S9006)

### 1.0.90 (2026-02-27)

* (FIX) JSDoc parameter descriptions added for all functions

### 1.0.89 (2026-02-27)

* (FIX) createState replaced with setObjectNotExists (W5034)
* (FIX) size attributes (xs, xl) added to jsonConfig.json (E5507)
* (FIX) Dependencies updated (@iobroker/adapter-core ^3.3.2, @alcalzone/release-script ^5.1.1)
* (FIX) admin dependency updated to >=7.6.20 (W1056)
* (FIX) Translations added for titleLang, desc, news (W1027, W1034, W1054)

### 1.0.85 (2026-02-26)
* (FIX) Deprecated common.main removed from io-package.json (W1084)

### 1.0.84 (2026-02-26)
* (FIX) Node.js version updated to >=18
* (FIX) Dependencies updated (@iobroker/adapter-core to 3.2.3, @iobroker/testing to 5.2.2)
* (FIX) io-package.json schema fixed (licenseInformation added, deprecated fields removed)
* (FIX) setInterval with clearInterval added for proper cleanup
* (FIX) js-controller dependency updated to >=6.0.11
* (FIX) admin dependency updated to >=7.6.17

### 1.0.83 (2026-02-26)
* (FIX) createState deprecated fixed (setObjectNotExists)
* (FIX) All log messages translated to English
* (FIX) README.md translated (EN + doc/de/ + doc/ru/ structure)
* (FIX) Node.js 24 added to test matrix
* (FIX) Manual installation guide removed

### 1.0.82 (2026-02-25)
* (FIX) Copilot infrastructure and AI assistant guidelines added

### 1.0.81 (2026-02-25)
* (FIX) create-adapter infrastructure added (GitHub Actions, Dependabot, ESLint, Tests)

### 1.0.80 (2026-02-25)
* (FIX) Unified intermediate notifications format (all levels show charging/discharging status)

## License

MIT License

Copyright (c) 2025-2026 Alex1808 via LLM: Qwen sadam6752@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.