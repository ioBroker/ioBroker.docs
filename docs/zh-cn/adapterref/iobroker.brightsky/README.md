---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.brightsky/README.md
title: ioBroker.brightsky
hash: cKfsezz/HZAu5xG+nERm1k/XUAeGl6WtkGrTXilmeug=
---
![标识](../../../en/adapterref/iobroker.brightsky/admin/brightsky.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.brightsky.svg)
![下载](https://img.shields.io/npm/dm/iobroker.brightsky.svg)
![安装数量](https://iobroker.live/badges/brightsky-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/brightsky-stable.svg)
![NPM](https://nodei.co/npm/iobroker.brightsky.png?downloads=true)

# IoBroker.brightsky
**测试：** ![测试与发布](https://github.com/ticaki/ioBroker.brightsky/workflows/Test%20and%20Release/badge.svg)

## 适用于 ioBroker 的 brightsky 适配器
## 什么是 Bright Sky API：
Bright Sky API 是一个免费的公共 API，提供来自德国气象局 (DWD) 的天气数据。它的开发旨在简化对这些数据访问，因为 DWD 的原始数据通常采用难以解读的格式。Bright Sky 将这些数据转换为易于使用的 JSON 格式，并通过 API 提供访问。

以下是更详细的解释：

**目标：** Bright Sky API 旨在让开发者和其他感兴趣的人士能够轻松访问德国气象局 (DWD) 的天气数据。

**数据来源：** 数据来自德国气象局 (DWD)，包括气象站的气象观测数据和天气预报数据，例如 MOSMIX 模型。

**格式：** Bright Sky API 以 JSON 格式提供数据，方便集成到应用程序和网站中。

**访问权限：**该 API 是公开的，无需 API 密钥即可使用，从而降低了准入门槛。

**开源：**该项目是开源的，这意味着源代码是公开的，可以由社区进一步开发。

**优势：** Bright Sky API 提供了一种轻松访问原本难以处理的天气数据的方法，而且是免费的，因此对许多项目来说是一个有吸引力的选择。

---

## 与其他适配器相比，可以使用哪些数据？
德国气象局 (DWD) 每小时循环更新两次当前天气数据。系统会采用距离最近的德国气象局气象站的数据。如果某个气象站的数据缺失，系统会自动使用距离第二远、第三远等气象站的数据作为备用数据进行填充。相应的备用数据可以在适配器中找到。

除了数据质量高之外，太阳能和太阳能数据尤其引人注目：

<img width="1200" height="444" alt="图像" src="https://github.com/user-attachments/assets/fc63120a-3dff-4651-841d-ff55bd8482d7" />

例如，由于数据点 `brightsky.0.current.solar_60` 的值以 kWh/m² 为单位给出，并且已经表示为每 1 小时的能量，因此值 `multiplied by 1000` 也可以以 W/m² 为单位表示。

全球辐射示例（W/m²） <img width="1200" height="224" alt="图像" src="https://github.com/user-attachments/assets/a83fdbdc-c56f-499e-b2ad-a58c9b24d5de" />

---

＃＃ 适配器：
＃＃＃ 安装：
与其他许多适配器不同，无需注册账号。

位置的地理坐标可以直接从浏览器导入，也可以从ioBroker导入。 <img width="108" height="59" alt="图像" src="https://github.com/user-attachments/assets/1f95df93-a5c7-460a-9eb9-b1565df29a12" />

<img width="1096" height="803" alt="图像" src="https://github.com/user-attachments/assets/4cfc2f81-465d-46b7-a6c1-927ea4e6680b" />

### 对象结构：
提供的数据如下： <img width="183" height="156" alt="图像" src="https://github.com/user-attachments/assets/fcb85df5-ff25-4d22-be54-0b04ea36f6ef" />

* current - 当前天气（另请参阅：https://brightsky.dev/docs/#/operations/getCurrentWeather）
* daily - 未来可配置天数的当前天气预报（参见 `forecastDays` 配置，默认 7 天）
* `daily.XX.hourly` - 可选的嵌套式小时数据，位于相应日期下（由 `hourlyForecastDays` 控制；仅显示前 N 天；0 = 禁用）
* `daily.XX.day` / `daily.XX.night` - 每日汇总的日/夜数据
* 小时预报 - 未来 N 小时的逐小时预报列表（参见 `hours` 配置；独立于嵌套的 `daily.XX.hourly` 功能；另请参阅：https://brightsky.dev/docs/#/operations/getWeather）
* 雷达 - 未来 2 小时的降水雷达预报，每 5 分钟间隔，单位为毫米/5 分钟。包括网格单元中的最大值和所有网格区域的累计总和（另见：https://brightsky.dev/docs/#/operations/getRadar）

---

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (ticaki) Fixed: radar `max_precipitation_forecast.*_sum` cumulative values were inflated because precipitation was summed across whole grid columns and scaled with `radarDistance`; the cumulative forecast now accumulates each grid cell over time and reports the maximum single location
- (ticaki) Changed: radar precipitation forecasts now report `null` instead of `-1` when no radar data is available

### 1.2.0 (2026-06-02)
- (ticaki) Added `conditionUI` (translated condition text) to `current` and `hourly.NN`, matching the existing `daily.NN.conditionUI` [#110](https://github.com/ticaki/ioBroker.brightsky/issues/110)
- (ticaki) Added a config option to choose the language for weather texts independent of the ioBroker system language [#110](https://github.com/ticaki/ioBroker.brightsky/issues/110)
- (ticaki) Requires Node.js >= 22 now; repository checker fixes (i18n, docs, tooling)
- (ticaki) Fixed: `daily.NN.day` aggregations stayed null/zero when `position` was not a valid `latitude,longitude`; the adapter now logs a clear error instead of producing empty data

### 1.1.0 (2026-03-23)
- (ticaki) Fixed: DWD station ID was incorrectly logged as WMO station ID fixes [#91](https://github.com/ticaki/ioBroker.brightsky/issues/91)
- (cavernerg) Added nested hourly forecast data under `daily.XX.hourly.YY` (0 = disabled)
- (cavernerg) Added configurable number of forecast days (`forecastDays`, default 7)
- (cavernerg) Admin UI restructured into labeled sections (Location, Forecast, Current Weather, Radar)

### 1.0.1 (2026-02-20)
- (ticaki) sunrise and sunset fixed

### 1.0.0 (2026-01-10)
- (ticaki) fixed: states/timezone/translation
- (ticaki) Customisable update interval for Daily (expert)
- (ticaki) BREAKING: remove forHomoran states

### 0.6.7 (2025-10-26)
- (ticaki) Corrected some roles for Lovelance
- (ticaki) Added conditionUI
- (ticaki) Air pressure and humidity are now integers
- (ticaki) Added air pressure to daily data
- (ticaki) Improved error logging

## License
MIT License

Copyright (c) 2025-2026 ticaki <github@renopoint.de>

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