---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.aurora-nowcast/README.md
title: ioBroker.aurora-nowcast
hash: 2w58m4StxpHt/xXPYTyZx0m1RMVdpv6czsNDW2Sl5uY=
---
# IoBroker.aurora-nowcast
![标识](../../../en/adapterref/iobroker.aurora-nowcast/admin/aurora-nowcast.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.aurora-nowcast.svg)
![下载](https://img.shields.io/npm/dm/iobroker.aurora-nowcast.svg)
![安装数量](https://iobroker.live/badges/aurora-nowcast-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/aurora-nowcast-stable.svg)
![NPM](https://nodei.co/npm/iobroker.aurora-nowcast.png?downloads=true)
![捐](https://img.shields.io/badge/Donate-PayPal-blue.svg)

**测试：** ![测试与发布](https://github.com/chrmenne/ioBroker.aurora-nowcast/actions/workflows/test-and-release.yml/badge.svg)

---

## 适用于 ioBroker 的 Aurora Nowcast 适配器
根据美国国家海洋和大气管理局空间天气预报中心 (SWPC) 的公开数据，提供给定地点极光活动（北极光和南极光）的**当前（临近预报）数据**。

> **注意：** > OVATION 极光数据代表基于实时太阳风测量的*当前状况（临近预报）*，而非长期预报。

> Kp 指数数据还提供**72 小时预报**，供规划之用。

---

＃＃ 特征
- 获取南北半球的实时极光活动数据（NOAA OVATION 模型）
- 计算指定位置的局部极光可见概率
- 提供当前Kp指数（每分钟更新一次）和72小时Kp指数预测
- 提供实时太阳风数据（Bz、总场强、速度、密度）作为极光预警指标
- 为自动化、可视化和警报提供 ioBroker 状态
- 可选择使用系统位置或手动输入经纬度
适用于仪表盘、通知和智能家居场景

---

## ❤️ 支持
如果您觉得 **ioBroker.aurora-nowcast** 有用，并希望支持其后续开发，不妨请我喝杯咖啡。☕🙂

感谢您的支持！

---

＃＃ 配置
你可以选择：

- 使用 ioBroker 中配置的系统位置，或者
- 请手动提供坐标（纬度/经度，以十进制表示）

如果系统定位功能已禁用，则需要手动输入坐标。

例如：

| 位置 | 纬度 | 经度 |
|-----------------|----------|-----------|
| 柏林 | 52.5 | 13.4 |
|布宜诺斯艾利斯 | -34.6 | -58.4 | -58.4 |
| 雷克雅未克 | 64.1 | -21.9 |

北/东方向为正值，南/西方向为负值。

### 更新间隔
| 设置 | 默认值 | 范围 | 说明 |
|-------------------|---------|-------|------------------------------------------------------------------------------------|
| 标准间隔 | 5 | 1–60 | 获取 OVATION 极光数据、Kp 预报和风暴等级的频率（分钟） |
| 实时间隔 | 1 | 1–60 | 获取实时数据的频率：当前 Kp 指数、太阳风（分钟） |

---

## 州
### 背景：空间天气指数
**Kp 指数** — 行星 K 指数用于衡量全球地磁活动，范围从 0 到 9（0 = 平静，9 = 极端地磁暴）。Kp 指数 ≥ 5 表示地磁暴（G1 及以上），在中纬度地区（例如中欧）可以看到极光。该适配器可提供当前每分钟 Kp 指数读数和 72 小时预测。

### OVATION — 极光概率
| 状态 | 类型 | 描述 |
|---------------------|---------|------------------------------------------------------------------------------------|
| `probability` | 数字 | 配置位置的极光可见概率估计值 (%) |
| `forecast_time` | 数字 | 计算地球实时地磁响应的时间（UTC，毫秒） |
| `forecast_time` | 数字 | 计算地球当前地磁响应的时间（UTC，毫秒） |

### Kp 指数
| 状态 | 类型 | 描述 |
|------------------------|---------|--------------------------------------------------------|
| `kp.value` | 数字 | 当前 Kp 指数（0–9，十进制，1 分钟更新） |
| `kp.g_scale` | 数字 | 衍生 NOAA G 级（0 = 无，1–5 = G1–G5） |
| `kp.forecast_max` | 数字 | 72 小时预报中的最大 Kp 值 |
| `kp.forecast_max_time` | 数字 | 预测最大值出现的时间（UTC，毫秒） |
| `kp.forecast` | 字符串 | 完整的 72 小时 Kp 预测，以 JSON 数组形式提供 `[{time, kp}]` |
| `kp.forecast` | 字符串 | 完整的 72 小时 Kp 值预测，以 JSON 数组 `[{time, kp}]` 的形式呈现 |

太阳风
**Bz (GSM)** — GSM坐标系中行星际磁场的z分量。强烈的负Bz值（向南方向）会使地球磁层向太阳风能量敞开，是目前最可靠的短期极光前兆——通常比可见极光活动提前15-60分钟出现。**Bt**是总磁场强度；Bz相对于Bt的值表示磁场向南方向的强度。

| 状态 | 类型 | 单位 | 描述 |
|-------------------------|--------|--------|----------------------------------------------------------|
| `solar_wind.bz` | 数字 | nT | GSM坐标系中的Bz分量（负号表示向南） |
| `solar_wind.speed` | 数值 | 公里/秒 | 太阳风质子速度 |
| `solar_wind.density` | 数量 | p/cm³ | 太阳风质子密度 |
| `solar_wind.mag_time` | 数字 | 毫秒 | 磁力计测量时间（UTC） |
| `solar_wind.plasma_time`| 数值 | 毫秒 | 等离子体测量时间（UTC） |
| `solar_wind.plasma_time`| 数字 | 毫秒 | 等离子体测量时间（UTC） |

这些状态可用于：

- 通知（例如，当 Kp ≥ 5 或 Bz ≤ −10 nT 时推送消息）
- 仪表盘可视化
- 自动化规则（例如，当极光概率较高时激活摄像头）

---

## 实用指南：如何捕捉极光
极光追逐分为两个阶段：**提前规划**，利用 Kp 预测；**实时反应**，利用太阳风和 OVATION 数据。

### 第一阶段——计划：预计会有暴风雨吗？
使用 `kp.forecast_max` 查看未来 72 小时内是否会发生地磁暴。按地理纬度划分的大致可见性阈值：

| `kp.forecast_max` | 风暴层级 | 可见至~ |
|-------------------|-------------|-------------------------------------------------|
| < 5 | 无 | 仅限高纬度地区 |
| 5 (G1) | 小行星 | ~60°N — 苏格兰北部、斯堪的纳维亚南部 |
| 6 (G2) | 中等 | ~55°N — 德国北部、波兰 |
| 7 (G3) | 强 | ~50°N — 伦敦、法兰克福、华沙 |
| 8 (G4) | 严重 | ~45°N — 瑞士、奥地利、意大利北部 |
| 9 (G5) | 极端 | ~40°N — 法国中部、西班牙北部 |

`kp.forecast_max_time` 告诉你预计峰值何时到来——对于“今晚 G2 风暴预报”之类的通知很有用。

`kp.g_scale` 反映当前风暴的实时级别（0 = 平静，1–5 = G1–G5）。

> **注：** 这些是欧洲的大致地理纬度。实际能见度很大程度上取决于`solar_wind.bz`（见下文）、云量和光污染。

### 第二阶段 — React：Aurora 现在活跃吗？
即使Kp值很高，极光也只有在行星际磁场（IMF）转向**南向**时才会出现——这由强烈的负值`solar_wind.bz`表示。这是最可靠的短期触发条件。

| `solar_wind.bz` | 含义 |
|-----------------|----------------------------------------------------------|
| > 0 nT | 向北——磁层基本闭合，极光微弱 |
| 0 至 -5 nT | 微弱向南 — 临界条件 |
| −5 至 −10 nT | 向南——极光活动开始增强 |
| ≤ −10 nT | 强烈偏南——可能出现显著极光 |
| ≤ −20 nT | 极强——中纬度地区可见强烈的极光 |

**预警时间：** Bz 值是在地球和太阳之间的 L1 观测点测量的。太阳风从 L1 点传播到地球需要 **15-60 分钟**——这就是您的预警窗口。

`solar_wind.bt` 表示总场强。当 `|bz|` 接近 `bt` 时，磁场几乎完全向南。例如，bz = −18 nT 且 bt = 20 nT 时的信号强度高于 bz = −10 nT 且 bt = 30 nT 时的信号强度。

`solar_wind.speed` 会放大这种效应：高速风（> 400 公里/秒）与负 Bz 值相结合，会向磁层传递更多能量。即使在 Bz 值适中的情况下，极高的风速（> 600 公里/秒）也能驱动极光。

`solar_wind.density` 起辅助作用：高密度（> 10 p/cm³）增加动态压力，可以增强活性。

### 位置特定确认：`probability` 添加什么？
Kp 是一个全球性指数，它描述的是整体地磁活动，而不是您所在位置上空的具体情况。`probability` 则不同：它是使用 **NOAA OVATION 模型**，根据您配置的坐标专门计算得出的。该模型以实时太阳风测量数据作为直接输入，模拟极光椭圆的实际范围和强度。因此，它对 Bz 变化的响应速度和精度都高于推导出的 Kp 值。

对于中欧地区（北纬50°至55°附近），活跃期实际活动范围如下：

| `probability` | 解释 |
|---------------|--------------------------------------------------------|
| < 5% | 您所在位置无任何有意义的活动 |
| 5–15% | 升高——值得关注，尤其是在远离城市的地方 |
| 15–30% | 活跃——晴朗天气下很可能看到极光 |
| > 30% | 活动开销较大 |

使用 `probability` 作为基于 Kp 和 Bz 的位置特定确认指标。当 §§SSSSS_0§§ 值上升且 Bz 值大幅下降时，最明显的信号表明值得外出交易。

### 自动化逻辑示例
一个实用的三层预警策略：

1. **观察模式** — `kp.forecast_max` ≥ 5: "预计未来 72 小时内有风暴 — 今晚密切关注天气状况"
2. **警报** — `kp.value` ≥ 5 且 `solar_wind.bz` ≤ −10: “风暴活跃，Bz 风向强烈偏南 — 15-60 分钟内可能出现极光”
3. **空中确认** — `概率` ≥ 15: “您所在位置现在很可能可以看到极光”

结合这三层可以避免误报：Kp 滤波器确认真正的风暴，Bz 滤波器确认磁层开放，概率滤波器确认您所在位置的活动。

---

## 数据源
此适配器使用由以下机构提供的公开数据：

- 美国国家海洋和大气管理局空间天气预报中心（SWPC）

<https://www.swpc.noaa.gov/>

具体来说，OVATION 极光临近预报模型和相关的实时地磁指数被用于估计配置位置的极光活动。

---

## 免责声明
美国国家海洋和大气管理局（NOAA）和西南太平洋海洋保护委员会（SWPC）与本项目无关。

本适配器使用的数据由美国国家海洋和大气管理局 (NOAA) 提供，供公众使用。

我们不保证所提供信息的准确性、完整性或及时性。

极光可见性取决于多种外部因素（例如云层覆盖、光污染、行星际磁场方向），这些因素超出了此适配器的范围。

---

## Changelog

### **WORK IN PROGRESS**

- when upgrading from version 2.2.2 or earlier to version 2.3.0 or later, any instance should be manually deleted and recreated. Otherwise they will remain registered as CRON-type adapters. As the datapoints don't include any IDs or other dynamic values, they will be recreated exactly as they were and no script adjustments will be necessary.
- fixed issue (<https://github.com/chrmenne/ioBroker.aurora-nowcast/issues/38>)
- fixed issue (<https://github.com/chrmenne/ioBroker.aurora-nowcast/issues/37>)

### 2.3.0 (2026-06-19)

- added solar wind data: Bz, total field (Bt), proton speed and density as aurora early-warning indicators
- added Kp index: current value (1-minute feed) and 72-hour forecast with maximum detection
- added separate realtime polling interval for time-critical feeds (Kp, solar wind)
- switched from single-run to continuous interval-based polling (daemon mode)
- configurable update interval (1–60 minutes, default: 5)
- fixed issue (<https://github.com/chrmenne/ioBroker.aurora-nowcast/issues/32>)
- fixed issue (<https://github.com/chrmenne/ioBroker.aurora-nowcast/issues/33>)
- fixed issue (<https://github.com/chrmenne/ioBroker.aurora-nowcast/issues/35>)

### 2.2.2 (2026-04-17)

- re-added git-type URL because of npm linter

### 2.2.1 (2026-04-17)

- more checks
- fixed Readme link to a more stable direct link instead of an anchor
- fixed issue (<https://github.com/chrmenne/ioBroker.aurora-nowcast/issues/24>)
- fixed issue (<https://github.com/chrmenne/ioBroker.aurora-nowcast/issues/27>)

### 2.2.0 (2026-03-30)

- fixed review findings (<https://github.com/chrmenne/ioBroker.aurora-nowcast/issues/21>)

### 2.1.4 (2026-03-11)

- disabled Sentry in GitHub workflow

[Older changelogs can be found there](CHANGELOG_OLD.md)

---

## License

GNU General Public License v3.0

Copyright (c) 2026 Christian Menne

See LICENSE file for full license text.