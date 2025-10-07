---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.brightsky/README.md
title: ioBroker.brightsky
hash: NA9qxVeYgOL98VT9tUOzLZLi5ioqx6JqOZFRZGs4wc8=
---
![标识](../../../en/adapterref/iobroker.brightsky/admin/brightsky.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.brightsky.svg)
![下载](https://img.shields.io/npm/dm/iobroker.brightsky.svg)
![安装数量](https://iobroker.live/badges/brightsky-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/brightsky-stable.svg)
![新公共管理](https://nodei.co/npm/iobroker.brightsky.png?downloads=true)

# IoBroker.brightsky
**测试：**![测试和发布](https://github.com/ticaki/ioBroker.brightsky/workflows/Test%20and%20Release/badge.svg)

# IoBroker 的 brightsky 适配器
## 什么是 Bright Sky API：
Bright Sky API 是一个免费的公共 API，提供来自德国气象局 (DWD) 的天气数据。由于原始 DWD 数据通常格式难以解读，因此开发该 API 的目的是简化对这些数据的访问。Bright Sky 会将这些数据转换为易于使用的 JSON 格式，并通过 API 进行访问。

以下是更详细的解释：

**目标**：Bright Sky API 旨在让开发人员和其他相关方轻松访问德国气象局 (DWD) 的天气数据。

**数据来源**：数据来自 DWD，包括来自站点的天气观测和天气预报，例如 MOSMIX 模型。

**格式**：Bright Sky API 以 JSON 格式提供数据，便于集成到应用程序和网站中。

**访问：**该 API 是公开的，无需 API 密钥即可使用，从而降低了进入门槛。

**开源：**该项目是开源的，这意味着源代码是公开的，可以由社区进一步开发。

**优点：**Bright Sky API 提供了一种简单的方式来访问原本难以处理的天气数据，并且是免费的，这使其成为许多项目的理想选择。

---

## 与其他适配器相比，哪些数据可以使用？
德国气象局 (DWD) 每小时两次定期更新当前天气数据。系统会参考最近的德国气象局 (DWD) 气象站的天气数据。如果无法获取天气值，系统会使用第二远、第三远等气象站的天气值作为备用值自动填充。相应天气数据的备用数据可在适配器中找到。

除了数据的高质量之外，太阳和太阳能数据特别有趣：

<img width="1200" height="444" alt="图像" src="https://github.com/user-attachments/assets/fc63120a-3dff-4651-841d-ff55bd8482d7" />

例如，由于数据点`brightsky.0.current.solar_60` 中的值以 kWh/m² 为单位，并且已经表示为每 1 小时的能量，因此值`multiplied by 1000` 也可以用 W/m² 表示。

总辐射量示例（W/m²） <img width="1200" height="224" alt="图像" src="https://github.com/user-attachments/assets/a83fdbdc-c56f-499e-b2ad-a58c9b24d5de" />

---

＃＃ 适配器：
＃＃＃ 安装：
与许多其他适配器不同，不需要帐户。

该位置的地理坐标可以直接从浏览器或 ioBroker 导入。 <img width="108" height="59" alt="图像" src="https://github.com/user-attachments/assets/1f95df93-a5c7-460a-9eb9-b1565df29a12" />

<img width="1096" height="803" alt="图像" src="https://github.com/user-attachments/assets/4cfc2f81-465d-46b7-a6c1-927ea4e6680b" />

### 对象结构：
提供的数据如下： <img width="183" height="156" alt="图像" src="https://github.com/user-attachments/assets/fcb85df5-ff25-4d22-be54-0b04ea36f6ef" />

* current - 当前天气（另请参阅：https://brightsky.dev/docs/#/operations/getCurrentWeather）
* 每日 - 未来 8 天的当前天气预报（由适配器创建，不属于 API 的一部分）
* 每小时 - 接下来定义的 n 小时的当前天气预报（另请参阅：https://brightsky.dev/docs/#/operations/getWeather）
* 雷达 - 未来 2 小时降水雷达预报，每 5 分钟更新一次，单位为毫米/5 分钟。包含所有网格单元的最大值以及所有网格区域的累计值（另请参阅：https://brightsky.dev/docs/#/operations/getRadar ）

---

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.6.5 (2025-10-04)
- (ticaki) Added leading zero to 5-minute radar datapoint folders for correct sorting in UI

### 0.6.3 (2025-10-04)
- (ticaki) Added Beaufort wind force scale datapoints (wind_force and wind_force_desc) based on wind_speed_10
- (ticaki) Fixed radar precipitation unit conversion - API values are in 0.01mm per 5 minutes, now correctly converted to mm
- (ticaki) Added cumulative precipitation states (next_Xmin_sum) showing maximum precipitation sum across all grid areas
- (ticaki) Added descriptions to max_precipitation_forecast states indicating "mm per 5 minutes"

### 0.6.2 (2025-10-02)
- (ticaki) Flag set to activate language

### 0.6.1 (2025-10-02)
- (ticaki) Added optional createRadarData configuration to make detailed radar.data folder optional fixes [#45](https://github.com/ticaki/ioBroker.brightsky/issues/45)
- (ticaki) Added weekday name datapoints (short and long) to daily weather data fixes [#41](https://github.com/ticaki/ioBroker.brightsky/issues/41)

### 0.6.0 (2025-09-30)
- (ticaki) Added weather radar feature with 2-hour precipitation forecast
- (ticaki) Radar data shows precipitation in mm with average, min, max, and median values
- (ticaki) Configurable radar polling interval (5+ minutes, auto-rotates data every 5 min)
- (ticaki) Added max precipitation forecast states for next 5, 10, 15, 30, 45, 60, 90 minutes

### 0.5.2 (2025-09-28)
- (ticaki) New data point wind_gust_speed_max for role value.speed.max.wind
- (ticaki) role checked

### 0.5.1 (2025-09-27)
- (ticaki) more robust fetch usage

### 0.5.0 (2025-09-26)
- (ticaki) Icons provided by icebear added fixes #31

### 0.4.0 (2025-09-24)
- (ticaki) Code migration from axios to node:fetch

### 0.3.5 (2025-09-20)
- (ticaki) Corrected roles for visualisation (lovelance) fixes #28

### 0.3.4 (2025-09-19)
- (ticaki) fixed too low limit for currently updates

### 0.3.3 (2025-09-19)
- (ticaki) update current at sunrise and sunset (unless custom interval is too large)
- (ticaki) added inverter limiting

### 0.3.2 (2025-09-17)
- (ticaki) Solar estimation calculation revised

### 0.3.1 (2025-09-15)
- (ticaki) Fixed data evaluation crash when no panels are defined  
- (ticaki) state name fixed

### 0.3.0 (2025-09-15)
- (ticaki) Added experimental datapoint for solar energy estimation (daily and hourly)  
- (ticaki) Wind bearing text is now translated into ioBroker system language  
- (ticaki) Added new datapoint for MDI icons support  
- (ticaki) Add day and night objects in addition to daily objects fixes [#11](https://github.com/ticaki/ioBroker.brightsky/issues/11)
- (ticaki) Enhanced day and night support with dedicated day/night icons

### 0.2.4 (2025-08-28)
* (ticaki) Create all folders

### 0.2.3 (2025-08-27)
* (ticaki) wind bearing text added
* (ticaki) update deps

### 0.2.2 (2025-08-22)
* (ticaki) Sunrise and sunset times added to the daily overview.

### 0.2.1 (2025-08-20)
* (ticaki) Startup log entry fixed.

### 0.2.0 (2025-08-20)
* (ticaki) DWD station ID added
* (ticaki) WMO station ID added
* (ticaki) Deactivation of data options added

### 0.1.1 (2025-08-19)
* (ticaki) Reduce required Nodej's version to 20

### 0.1.0 (2025-08-19)
* (ticaki) initial release

## License
MIT License

Copyright (c) 2025 ticaki <github@renopoint.de>

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