---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.aurora-nowcast/README.md
title: ioBroker.aurora-nowcast
hash: PscidRWIBAikwBat+ojYqF9Ab91H0IaiMIV+qsgz9jU=
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

> **注意：** > 此适配器基于实时测量和模型输出提供*当前状况/短期临近预报数据*。

> 它**不**提供长期预报。

---

＃＃ 特征
- 获取南北半球的实时极光活动数据（NOAA OVATION 模型）
- 计算指定位置的局部极光可见概率
- 为自动化、可视化和警报提供 ioBroker 状态
- 可选择使用系统位置或手动输入经纬度
适用于仪表盘、通知和智能家居场景

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

---

## 州
适配器创建以下状态：

| 状态 | 类型 | 描述 |
|---------------------|---------|------------------------------------------------------------------------------------|
| `probability` | 数字 | 配置位置的极光可见概率估计值 (%) |
| `forecast_time` | 数字 | 计算地球实时地磁响应的时间（UTC，毫秒） |
| `forecast_time` | 数字 | 计算地球当前地磁响应的时间（UTC，毫秒） |

这些状态可用于：

- 通知（例如推送消息）
- 仪表盘可视化
- 自动化规则（例如，当活动量较高时激活摄像头）

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

## ❤️ 支持
如果您觉得 **ioBroker.aurora-nowcast** 有用，并想支持其后续开发，可以请我喝杯咖啡☕🙂

感谢您的支持！

---

## Changelog
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

### 2.1.3 (2026-03-11)

- fixed iobroker-Bot warnings: <https://github.com/chrmenne/ioBroker.aurora-nowcast/issues/18>
- slightly retouched the icon

### 2.1.2 (2026-03-09)

- fixed overlooked linter error regarding whitespace

### 2.1.1 (2026-03-09)

- fixed a bug concerning the coordinates validation

### 2.1.0 (2026-03-02)

- added internationalization (i18n)
- further smaller adjustments to meet ioBroker standards

### 2.0.2 (2026-02-27)

- fixed icon size to 512x512 (or less) for ioBroker release

### 2.0.1 (2026-02-27)

- necessary adjustments for ioBroker official release

### 2.0.0 (2026-02-27)

- Renamed adapter. Minor housekeeping.

### 1.0.0 (2026-02-26)

- First stable release

---

## License

GNU General Public License v3.0

Copyright (c) 2026 Christian Menne

See LICENSE file for full license text.