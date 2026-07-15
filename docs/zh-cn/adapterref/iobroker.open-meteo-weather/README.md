---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.open-meteo-weather/README.md
title: ioBroker.open-meteo-weather
hash: ZDtyYCv3+PZq9GWbyJ9HYdjGqTd6XEDq5f/Mq3OAUIA=
---
![NPM 版本](https://img.shields.io/npm/v/iobroker.open-meteo-weather.svg)
![下载](https://img.shields.io/npm/dm/iobroker.open-meteo-weather.svg)
![安装数量](https://iobroker.live/badges/open-meteo-weather-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/open-meteo-weather-stable.svg)
![NPM](https://nodei.co/npm/iobroker.open-meteo-weather.svg?data=d)
![节点-lts](https://img.shields.io/node/v-lts/iobroker.open-meteo-weather?style=flat-square)

<img src="admin/open-meteo.png" width=100 >

# IoBroker.open-meteo-weather
![测试与发布](https://github.com/H5N1v2/iobroker.open-meteo-weather/workflows/Test%20and%20Release/badge.svg)

重要信息：
Open Meteo Weather 和 Open Meteo PV Forecast 现已合并到此适配器中。Open Meteo PV Forecast 已停止维护。

---

**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 有关禁用错误报告的更多详细信息和说明，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

我使用基于 Glitchtip 的自制 Sentry 服务器。

**适用于 ioBroker 的 OpenMeteo 天气和光伏预测服务适配器。**

此适配器提供由[Open-Meteo.com](https://open-meteo.com/)支持的精确天气数据、预报、空气质量、花粉和光伏发电预报信息。它对非商业用途（每日API调用次数低于10,000次）免费，且无需注册API密钥，因此设置过程极其简单。

---

## 天气功能
* **当前天气数据：**实时获取温度、湿度、气压和风力数据。
* **灵活的预测：** 可配置预测天数和小时分辨率。
* **空气质量和花粉：** 可选的颗粒物（PM2.5、PM10）以及各种花粉类型（桤木、桦树、草等）数据。
* **自动清理：** 如果预测周期在配置中缩短或更改，适配器会自动清理对象结构。
* **多语言支持：**支持 11 种语言（包括英语、德语、波兰语、俄语、法语、中文等）。
* **单位制：** 可在公制（°C，km/h）和英制（°F，mph）系统之间无缝切换。
* **多地点：** 添加多个地点。
* **夜间图标：** 您可以选择两套夜间图标：“明亮”和“黑暗”。这样可以更轻松地使图标与您的背景相匹配。

### 风向图标
在适配器设置中，您可以选择两种不同的风向显示样式：

* 风向（风吹向哪里）：这是默认设置。箭头指向风的移动方向。（例如：北风时，箭头指向南方）。

* 风向（风的来源方向）：此样式使用 direct_2 子文件夹中的图标。箭头指示风的来源。（例如：北风显示指向北方的箭头或特定的“来源”图标）。

|设置 | 图标路径 | 行为 |
|:---|:---|:---|
|风向（风吹向的方向） | /icons/wind_direction_icons/*.png | 指向目的地 |
|风向原点（风的来向）|/icons/wind_direction_icons/direct_2/*.png | 指向原点 |

### 空气质量数据
该适配器提供当前空气质量数据和未来几天的每日预报（可配置为 1 天、3 天或 6 天）。

高效的数据处理：OpenMeteo API 仅提供原始的小时数据，而此适配器可智能地聚合这些值。它会自动计算所有污染物和花粉浓度的每日最大值。这样，您就能获得最相关的数据（峰值暴露水平），而无需在数据库中存储数百个小时数据点。

特征：

* 每日峰值：获取 PM2.5、PM10、臭氧和各种花粉类型的最高预期值。

* 人类可读：花粉浓度会自动映射到描述性类别（例如，“无”、“低”、“中”、“高”）。

* 智能清理：根据您的设置，自动创建或删除预测日期的对象，以保持对象树的整洁。

---

＃＃ 配置
安装完成后，请在实例设置中配置以下字段：

1. **位置：** 添加您的位置或您想要的名称。
2. **坐标（纬度和经度）：** 添加您的坐标。您可以通过点击“使用 OpenStreetMap 查找坐标”按钮找到坐标，或者将字段留空以使用系统坐标。
3. **时区：** 在下拉菜单中设置时区，默认值为“自动”，它会根据您的坐标自动调整。
4. **更新间隔：** 时间间隔（分钟）（默认值：30 分钟）。
5. **预测天数：**每日概览的天数（0-16 天）。
6. **逐小时预测：**启用或禁用此选项，并设置小时数（例如，未来 24 小时）。例如，hour0 为当前小时，hour1 为下一小时，依此类推。
7. **可选数据：** 花粉和空气质量数据的复选框。
8. **单位：**选择公制或英制。

---

## 天气小部件
此适配器提供两种方式在可视化界面中显示天气数据：

### 1. 内置小部件（标准）
自 **3.1.0 版本** 起，该适配器可以自动为每个位置生成预配置的 HTML 小部件。

使用方法：

1. **启用：** 在您所在位置的实例设置中选中“创建小部件”复选框。
2. **查找状态：** 适配器将创建一个名为 `htmlWidget` 的状态（位于 `open-meteo-weather.0.yourLocation.htmlWidget` 下）。
3. **在 VIS/VIS2 中：** * 将标准 **“HTML” 小部件** 拖到视图上。
* 将该小部件的“HTML”属性设置为你的状态绑定：`{open-meteo-weather.0.yourLocation.htmlWidget}`。
* 调整组件容器的宽度和高度以适应内容。

**自定义设置：** 您只能在适配器配置中直接调整字体大小、预测时间和日期等基本设置。

**最适合：** 想要快速、美观且无需维护的显示屏的用户。

**注意：**为了在桌面浏览器上获得最佳显示效果，请勿在 VIS 编辑器设置中使用额外的 CSS 边框或阴影。该组件已自带优化的样式。

### 2. 高级小部件脚本（完全自定义）
如果您想对设计进行深度修改、添加自定义 CSS 或扩展逻辑：

* **链接：** 使用 [VIS2-widget-script-om-weather](https://github.com/H5N1v2/VIS2-widget-script-om-weather)。
* **最适合：**希望完全控制每个 HTML 标签和 CSS 属性的高级用户。

---

## 图标和可视化
该适配器提供动态图标路径，可以直接在可视化工具（例如 **vis、iQontrol 或 Jarvis**）中使用。

* **天气图标：**位于 `weather.current.icon_url` 下。适配器会自动区分白天和黑夜（例如，太阳与月亮）。
* **风向：** `wind_direction_icon` 下的静态路径会显示与度数对应的罗盘箭头（显示方向可选择）。
* **阵风警告：**当风速超过约 39 公里/小时（Bft 6）时，`wind_gust_icon` 下方会显示警告图标，等级为 0-4。
* **月相图标：** 可以在 `moon_phase_icon` 下找到月亮图标，它们显示月相。
* **多种图标：** 您可以选择静态图标和动态图标（由 [basmilius](https://github.com/basmilius/meteocons) 制作）。

---

## 数据点（节选）
| 文件夹 | 描述 |
|:---|:---|
| `air.current` | 空气质量和花粉浓度（文本和数值） |
| `weather.current` | 当前测量值（温度、露点、风速等） |
| `weather.forecast.dayX` | 第 X 天的每日天气预报 |
| `weather.forecast.hourly.hourX` | 每整小时的详细数据 |
| `info.lastUpdate_weather` | 显示上次天气更新的日期和时间 |
| `info.lastUpdate_weather` | 显示上次天气更新的日期和时间 |

---

如果您不需要天气预报，请将位置字段留空，系统将不会输入州/省份信息。

--- ---
## 功能 PV 预测（如果启用）
* **多位置：**支持多个光伏系统/位置，例如东西朝向。
* **逐小时预报：** 详细预测发电量、温度、云量和日照时长。
* **每日预测：**未来 14 天的预期能源量（瓦时）汇总。
* **15分钟预报：** 当前日期未来24小时的15分钟预报。
* **物理模拟：**
* **倾斜角和方位角：**根据面板朝向计算辐照度。
* **光伏组件温度：**考虑环境温度、辐射强度和风速的电池温度估算（Faiman 模型）。
* **日照时长：** 将日照时长转换为每小时分钟数。
* **汇总：**按日、小时和 15 分钟自动汇总所有地点（总预测）。
* **系统集成：** 如果未手动设置，则从 ioBroker 系统配置自动获取位置坐标。
* **光伏组件温度：**根据 Faiman 模型估算的光伏组件温度。

---

## 数据点（对象）
对于每个已配置的位置，都会创建一个包含以下数据点的通道：

| 文件夹 | 描述 |
| `pv-forecast` | 光伏预测数据文件夹 |
| `pv-forecast` | 光伏预测数据文件夹 |

### 15 分钟预报 (`15-min-forecast.0 - 95`)，（当前 24 小时），如果启用
| 数据点 | 单位 | 描述 |
| `global_tilted_irradiance` | 瓦时 | 基于装机容量（kWp）的预期能量。 |
| `pv_temperature` | °C | 光伏组件预估温度（Faiman 计算）。 |
| `temperature_2m` | °C | 2米高度处的空气温度。 |
| `time` | - | 预测时间（时:分）。 |
| `wind_speed_10m` | 公里/小时 | 10米高度处的风速。 |
| `wind_speed_10m` | 公里/小时 | 10米高度处的风速。 |

信息：需要 temperature_2m 和 wind_spread_10m 来计算光伏组件温度。

如有需要，可选择是否启用；否则，DP 将包含在天气信息中。

| 数据点 | 单位 | 描述 |
| `cloud_cover` | % | 总云量百分比。 |
| `sunshine_duration` | 分钟 | 本小时内实际日照分钟数。 |
| `sunshine_duration` | 分钟 | 本小时内实际日照时长（分钟）。 |

### 每日预报 (`daily-forecast.dayX`)
| 数据点 | 单位 | 描述 |
| `Date` | - | 预测日期（日.月.年）。 |
| `Peak_day` | 瓦时 | 预计每日总产量。 |
| `Peak_day` | Wh | 预计每日总发电量。 |

### 预测 JSON (`location_folder` 如果启用
| 数据点 | 单位 | 描述 |
| `15-min-json_chart` | - | JSON 15分钟 |
| `hourly-json_chart` | - | JSON 小时 |
| `hourly-json_chart` | - | JSON 小时图 |

### 小时预报 (`hourly-forecast.hourX`)
| 数据点 | 单位 | 描述 |
| `time` | - | 预测时间（时:分）。 |
| `global_tilted_irradiance` | 瓦时 | 基于装机容量（kWp）的预期能量。 |
| `pv_temperature` | °C | 光伏组件预估温度（Faiman 计算）。 |
| `temperature_2m` | °C | 2米高度处的空气温度。 |
| `wind_speed_10m` | 公里/小时 | 10米高度处的风速。 |
| `wind_speed_10m` | 公里/小时 | 10米高度处的风速。 |

信息：需要 temperature_2m 和 wind_spread_10m 来计算光伏组件温度。

如有需要，可选择是否启用；否则，DP 将包含在天气信息中。

| 数据点 | 单位 | 描述 |
| `cloud_cover` | % | 总云量百分比。 |
| `sunshine_duration` | 分钟 | 本小时内实际日照分钟数。 |
| `sunshine_duration` | 分钟 | 本小时内实际日照时长（分钟）。 |

### Sum_peak_locations_15_Minutly (`0-95`) 如果启用
| 数据点 | 单位 | 描述 |
| `sum_locations` | Wh | 每 15 分钟位置总和 |
| `time` | - | 预测时间（时:分）。 |
| `时间` | - | 预测时间（时:分）。 |

### Sum_peak_locations_Daily (`dayX`) 如果启用
| 数据点 | 单位 | 描述 |
| `sum_locations` | Wh | 每日位置总数 |
| `sum_locations` | Wh | 每日位置总数 |

### Sum_peak_locations_Hourly (`HourX`) 如果启用
| 数据点 | 单位 | 描述 |
| `sum_locations` | Wh | 每小时位置总和 |
| `time` | - | 预测时间（时:分）。 |
| `时间` | - | 预测时间（时:分）。 |

### 如果启用，则显示 JSON 数据点
| 数据点 | 单位 | 描述 |
|:---|:---|:---|
| `sum_peak_15-min-json_chart` | - | 15 分钟位置总和（JSON 格式） |
| `sum_peak_hourly-json_chart` | - | 每小时位置总和（JSON 格式） |

---

＃＃ 配置
### 基本设置
* **预测小时数：** 小时视图的时间范围（3 至 48 小时）。
* **预报天数：**每日预报的持续时间（3 至 14 天）。
* **更新间隔：** 数据更新频率（15、30、60 分钟或日出前一次）。

### 数据点设置
* **滚动小时或固定小时：** 如果选择“滚动小时”，则每小时预报将始终显示从当前小时开始的接下来的几个小时。如果选择“固定小时”，则无论当前时间如何，每小时预报都将显示固定的时间间隔（例如，00:00-23:00）。
* **15分钟天气预报：** 如果启用此功能，系统将创建额外的状态以提供15分钟天气预报（当天最多24小时）。请注意，15分钟天气预报数据的可用性取决于OpenMeteo API，并且可能因地点或时间而异。

### 地点（表格）
每个位置必须定义以下值：

1. **名称：**唯一标识符（已去除对象 ID）。
2. **纬度/经度：** GPS 位置（可选：否则使用系统值）。
3. **倾斜角度：** 模块的角度（0° = 水平，90° = 垂直）。
4. **方位角：**方向（-180° 至 180°，0° = 南，-90° = 东，90° = 西）。
5. **功率（kWp）：** 系统的安装峰值容量。
6. **时区：** 选择本地时区（默认值：自动）。

![标识](../../../en/adapterref/iobroker.open-meteo-weather/admin/img/doc.png)

### 全局选项，仅当您有多个位置时才可调整！
* **每日总和：** 创建通道 `sum_peak_locations_Daily`，将所有系统的产量相加。
* **总和（每小时）：** 创建通道 `sum_peak_locations_Hourly`，用于计算每小时的总性能。
* **总和（15 分钟）：** 创建通道 `sum_peak_locations_15_Minutely`，用于计算 15 分钟的总预测值。

---

## 技术细节及计算
### 光伏温度模型
该适配器使用 **Faiman 模型** 来估算模块温度。该模型考虑了风冷，风冷直接影响效率：`pvTemp = Ambient Temperature + Irradiance / (25 + 6.84 * Wind Speed)`。

---

## 更新说明
适配器更新后，建议删除整个目录树并重新创建。

## 旧版更新日志
[旧版更新日志](CHANGELOG_OLD.md)

## 法律与版权
### 图标和图像
由 [巴斯·米利乌斯](https://github.com/basmilius/meteocons) 制作的动态天气图标

本适配器中包含的静态天气和风向图标受创作者的版权保护。

* **使用说明：** 这些图标已获得 ioBroker 内部使用的许可。商业再分发或在本适配器之外使用需要获得作者的明确许可：h5n1@iknox.de。
* **天气数据：**所有天气数据均由[Open-Meteo.com](https://open-meteo.com/)提供。请查看其商业用途使用条款。

## Changelog
### **WORK IN PROGRESS**
* (@GermanBluefox) upscaled the logo
* (@GermanBluefox) Updated TS to 6
* (@GermanBluefox) Corrected image in JsonConfig

### 3.1.3 (2026-06-20)
* (H5N1v2) Fixed an issue with object creation caused by an accidental change.

### 3.1.2 (2026-06-20)
* (mcuiobroker) fix: after adapter update, automatically adjust type and role if they have been changed in new versions.
* (H5N1v2) Update dependencies

### 3.1.1 (2026-06-10)
* (pk68) fix: `info.lastUpdate_weather`, `info.lastUpdate_PV_Forecast` and `hourly.next_hours.hour*.date` now store a Unix timestamp (`value.time`) instead of a formatted string, preventing incorrect date parsing by ioBroker.
* (H5N1v2) Update dependencies
* (H5N1v2) fix: [W5612] Remove unused custom actions configuration from jsonConfig
* (H5N1v2) fix: [W5063] JSON formatting in "admin/jsonConfig.json" is hard to read (mixed indentation).
* (H5N1v2) fix type assertion for channel name
* (H5N1v2) fix some things in README.md

### 3.1.0 (2026-05-03)
* (H5N1v2) Changed update routine for weather and PV forecast to fixed fetch times.
* (H5N1v2) Added a customizable HTML weather widget in the admin area.
* (H5N1v2) Adaptation for version jumps from older configurations.
* (H5N1v2) Description added to the admin area.
* (H5N1v2) Readme updated in widget section.
* (H5N1v2) Adapter internal widget adapted, hazards are highlighted in color (currently only in the internal adapter widget).
* (copilot) Adapter requires node.js >= 22 now.
* (H5N1v2) Update axios to v.1.16.0.

### 3.0.1 (2026-04-25)
* (H5N1) update dependencies
* (H5N1) improve error handling in API calls with detailed messages
* (H5N1) fix: attribute in jsonConfig.
* (Negalein) fix: yellow help text in admin for pv-forecast extra dp's, poor recognition on white background
* (H5N1v2) fix: update interval for pv-forecast "once before sunrise" time incorrectly calculated

## License
This project is licensed under the **MIT License** - see the `LICENSE` file for details.

Copyright (c) 2026 H5N1v2 <h5n1@iknox.de>