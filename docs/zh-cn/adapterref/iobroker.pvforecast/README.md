---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.pvforecast?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.pvforecast?label=npm%20downloads&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.pvforecast?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.pvforecast?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/iobroker-community-adapters/iobroker.pvforecast?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/iobroker-community-adapters/iobroker.pvforecast?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/iobroker.pvforecast?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/iobroker-community-adapters/iobroker.pvforecast?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/iobroker-community-adapters/iobroker.pvforecast?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/actions/workflow/status/iobroker-community-adapters/iobroker.pvforecast/test-and-release.yml?branch=main&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.pvforecast.svg?color=red&label=beta
BADGE-Stable: http://iobroker.live/badges/pvforecast-stable.svg
BADGE-Installed: http://iobroker.live/badges/pvforecast-installed.svg
chapters: {"pages":{"de/adapterref/iobroker.pvforecast/README.md":{"title":{"de":"ioBroker.pvforecast"},"content":"de/adapterref/iobroker.pvforecast/README.md"},"de/adapterref/iobroker.pvforecast/vis.md":{"title":{"de":"ioBroker.pvforecast - VIS"},"content":"de/adapterref/iobroker.pvforecast/vis.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.pvforecast/README.md
title: ioBroker.pvforecast
hash: Kb3rKJpIxmN5wZW4IU5YysJr8bw4nL3CrHhkuKEOQ70=
---
![标识](../../../de/admin/pvforecast.png)

# IoBroker.pvforecast
此适配器替换了 [ioBroker论坛](https://forum.iobroker.net/topic/26068/forecast-solar-mit-dem-systeminfo-adapter) 中的 JavaScript

适配器从各种预测服务中检索基本数据，并按照 ioBroker 的说明提供这些数据。

## 支持的预测服务
- **Forecast.solar** - https://forecast.solar
- **Solcast** - https://solcast.com
- **SolarPredictionAPI** - 通过 RapidAPI
- **pvnode** - https://pvnode.com

＃＃ 设置
1. 经度（西经 180°，东经 180°）
第二平行线 -90（南）…90（北）
3. 链接到页面
4. API密钥
5. 图表 Y 轴水平
6. 数据检索计划（分钟） - 每隔 x 分钟从服务器检索数据的计划。

![pvforecast选项](https://user-images.githubusercontent.com/76852173/155196476-8c8210d9-bdb2-456b-a0aa-1dd411efea5e.JPG)

也可以使用 API 密钥获取天气信息（仅限 Forecast.solar）。

1. datetime - 日期和时间
2. 天空 - 介于 0 和 1 之间的值，表示晴空的百分比 [1 = 晴空]。
3. 温度 [°C]
4. 条件 - 文本
5. 图标 - 文字 + 数字
6. 风速 - [公里/小时]
7. 风向角 - 正北 0°（顺时针方向）。（如果风速为零，则该值未定义）
8. 风向 - 简称
9. 更高的时间分辨率

以下是系统可用的设置。
1. 倾斜角度（0°-90°）
2. 方位角（-180 = 北，-90 = 东，0 = 南，90 = 西，180 = 北）
3. 系统输出功率（kWp）
4. 植物名称
5. 图例名称
9. 图表颜色
10. 图表标签颜色

![光伏预测 光伏系统](https://user-images.githubusercontent.com/76852173/155196535-6828775a-8234-4a6a-b2a3-03d7fd88c80d.JPG)

所有这些信息都是为了确保适配器正常工作所必需的。

如果纬度和经度已存储在系统中，系统将自动将数据输入到相应字段中。

## 光伏节点
[pvnode](https://pvnode.com) 是一项德国服务，提供 15 分钟间隔的高分辨率光伏预测。该适配器同时支持 **API v1**（在适配器中进行系统配置）和 **API v2**（通过站点 ID 在 pvnode 门户中进行系统配置）。

**警告**：pvnode API v1 将于 **2026 年 12 月 31 日** 关闭。自 **2027 年 1 月 1 日** 起，如果配置了 v1，适配器将返回错误并停止轮询。必须迁移到 API v2 — 请参阅下文 [pvnode API v2](#pvnode-api-v2-empfohlen)。

### Pvnode 账户级别
| 功能 | 免费 | 轻便 | 加 |
|----------|------|-------|------|
| API 请求/月 | 250 | 3,000 | 3,000 |
| 每日更新次数 | 1 | 24（每小时） | 144（每10分钟） |
| 天气预报日期 | 1-2 天（今天 + 明天） | 1-7 天 | 1-7 天 |
| 太阳能电池板 | 最多 4 个 | 最多 4 个 | 最多 8 个 |
| 历史数据 | 否 | 否 | 30 天 |

**查询间隔**由适配器根据所选帐户级别自动设置，无需手动配置：

| 级别 | 自动间隔 |
|-------|------------------------|
| 免费 | 24 小时 |
| 轻度 | 60分钟 |
| 加 | 10 分钟（实时预报） |

### Pvnode API v2（推荐）
在 API v2 中，整个系统配置（方位角、倾角、功率）都通过 **站点 ID** 在 pvnode 门户中直接管理。适配器只需要站点 ID，适配器本身不需要方位角/倾角/功率信息。

**前提条件：**配置适配器之前，必须在 pvnode 门户网站 https://pvnode.com/sites/new 中创建一个站点。所有太阳能电池阵列（组串）的信息，包括其朝向、倾角和峰值功率，都需要在此处输入。保存后，门户网站将提供站点 ID。

**配置：**

1. **API密钥**：请访问 https://pvnode.com/api-keys 创建
2. **使用 pvnode API v2**：启用复选框
3. **pvnode 站点 ID**：来自 pvnode 门户的站点 ID（例如 `site_xxxx…`）
4. **订阅级别**：免费/轻量级/高级（自动确定检索间隔）
5. **预报天数**：预报天数（免费版：最多 2 天 - 今天和明天；精简版/增强版：最多 7 天）

**电厂表 (v2)：** 至少需要填写一个条目。名称仅用于显示；可选的峰值功率用于“已安装功率”状态。适配器从 v2 API 查询字符串数据，并根据电厂位置将每个字符串分配给已配置的电厂（电厂 1 → 字符串 0，电厂 2 → 字符串 1，依此类推）。这实现了真正的按区域预测。如果没有可用的字符串数据，则将站点总值存储在第一个电厂下。

### Pvnode API v1
在 API v1 中，方位角、倾角和功率直接在每个系统的适配器中配置。每个系统都有自己的 API 调用。

**配置：**

1. **API密钥**：请访问 https://pvnode.com/api-keys 创建
2. **使用 pvnode API v2**：请勿勾选此复选框
3. **订阅级别**：免费/轻量级/高级
4. **预报天数**：预报天数（免费版：最多 2 天 - 今天和明天；精简版/高级版：最多 7 天）
5. **附加参数**：可选的 API 参数（仅限 v1 版本），例如 `diffuse_radiation_model=perez&snow_slide_coefficient=0.5`

**轮换查询流程 (v1)：** 对于多个系统，每个系统在启动时查询一次。之后，每个周期（轮换）只查询一个系统。对于 N 个系统，间隔为 T，每个系统每 N×T 更新一次。例如：3 个系统，轻量级（60 分钟）→ 每个系统每 3 小时更新一次，每小时调用一次 API。

### Pvnode 附加参数（仅限 v1）
| 参数 | 说明 | 示例 |
|-----------|--------------|---------|
| `diffuse_radiation_model` | 辐射模型 | `perez` |
| `shading_config` | 遮阳配置 | `7:2:3:1_1:1:0:0_0:0:0:0` |
| `shading_config` | 着色配置 | `7:2:3:1_1:1:0:0_0:0:0:0` |

格式：`key1=value1&key2=value2`

### Pvnode 特色功能
- **15分钟分辨率**：pvnode以15分钟的间隔提供预测数据（v1和v2）
- **方位角转换**：适配器会自动将方位角值（适配器：0=南）转换为 pvnode 格式（180=南）。
- **查询间隔**：根据账户级别自动设置，无需手动配置
- **区域预报（v2）**：如果 pvnode 账户提供字符串数据，则每个已配置的系统都会收到其自身的预报。晴空值、温度和天气代码均取自站点范围的数据。
- **摘要数据**：摘要 JSON 包含 Clearsky 值以及温度和天气代码。
- “早晨阻尼”和“傍晚阻尼”字段不适用于光伏节点。

## VIS 示例
加载示例之前，请先安装：[材料设计](https://github.com/Scrounger/ioBroker.vis-materialdesign)。

如果您想在 ioBroker Vis 中使用 JSON 图表和表格，可以在这里找到 [例子](./vis.md)。

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (@patricknitsch) Change Free Tier Forecast from only today to today and tomorrow

### 6.2.0 (2026-07-06)
- (@patricknitsch) pvnode API v2 support: plant configuration via Site ID in the pvnode portal — create a site at https://pvnode.com/sites/new
- (@patricknitsch) pvnode v2: per-string forecasts — each configured plant receives its own forecast matched by index (plant 1 → string 0, etc.)
- (@patricknitsch) pvnode subscription tiers (Free / Light / Plus) replace the old paid-account checkbox; poll interval is set automatically per tier
- (@patricknitsch) pvnode v1: rotating round-robin fetch — one plant per poll cycle instead of one combined request; each plant receives an individual API call
- (@patricknitsch) Poll interval field hidden for pvnode (auto-managed)
- (@patricknitsch) Update Documentation of pvnode
- (@patricknitsch) Include warning for v1 and error after 31.12.26. The adapter cannot use v1 after this date anymore

### 6.1.0 (2026-04-26)
- (@mcm1957) Adapter requires node.js >= 22, js-controller >= 6.0.11 and admin >= 7.7.22 now
- (@mcm1957) Dependencies have been updated

### 6.0.0 (2026-04-10)

- (@patricknitsch) Added pvnode als alternative Provider
- (copilot) Adapter requires admin >= 7.7.22 now

### 5.1.0 (2026-02-03)

* (@klein0r) admin 7.6.17 and js-controller 6.0.11 (or later) are required
* (@Scrounger) solcast user agent bug fix
* (@klein0r) Updated dependencies

### 5.0.0 (2025-04-23)

NodeJS >= 20.x and js-controller >= 6 is required

* (@klein0r) Minimum peak power is 0.1 kWp

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License


Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2021-2025 Patrick-Walther
                        Matthias Kleine <info@haus-automatisierung.com>

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