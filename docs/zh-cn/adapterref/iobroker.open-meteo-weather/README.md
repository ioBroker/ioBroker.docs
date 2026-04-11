---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.open-meteo-weather/README.md
title: ioBroker.open-meteo-weather
hash: CUXog9QvSkPBQN9JskDmgf5Ntnaf1R2WI3TJYPKP2lo=
---
![标识](../../../en/adapterref/iobroker.open-meteo-weather/admin/open-meteo.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.open-meteo-weather.svg)
![下载](https://img.shields.io/npm/dm/iobroker.open-meteo-weather.svg)
![安装数量](https://iobroker.live/badges/open-meteo-weather-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/open-meteo-weather-stable.svg)
![NPM](https://nodei.co/npm/iobroker.open-meteo-weather.svg?data=d)
![节点-lts](https://img.shields.io/node/v-lts/iobroker.open-meteo-weather?style=flat-square)

# IoBroker.open-meteo-weather
![测试与发布](https://github.com/H5N1v2/iobroker.open-meteo-weather/workflows/Test%20and%20Release/badge.svg)

**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 有关禁用错误报告的更多详细信息和说明，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

我使用基于 Glitchtip 的自制 Sentry 服务器。

**适用于 ioBroker 的 OpenMeteo 天气服务适配器。**

## 首先：如果您正在寻找专门用于此适配器的小部件，请使用 [VIS2-widget-script-om-weather](https://github.com/H5N1v2/VIS2-widget-script-om-weather) 创建它。
此适配器提供由[Open-Meteo.com](https://open-meteo.com/)支持的精确天气数据、预报、空气质量和花粉信息。它对非商业用途（每日API调用次数低于10,000次）免费，并且无需注册API密钥，因此设置过程极其简单。

---

＃＃ 特征
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

## 图标和可视化
该适配器提供动态图标路径，可以直接在可视化工具（例如 **vis、iQontrol 或 Jarvis**）中使用。

* **天气图标：**位于 `weather.current.icon_url` 下。适配器会自动区分白天和黑夜（例如，太阳与月亮）。
* **风向：** `wind_direction_icon` 下的静态路径会显示与度数对应的罗盘箭头。
* **阵风警告：**当风速超过约 39 公里/小时（Bft 6）时，`wind_gust_icon` 下方会显示警告图标，等级为 0-4。
* **月相图标：** 可以在 `moon_phase_icon` 下找到月亮图标，它们显示月相。

---

## 数据点（节选）
| 文件夹 | 描述 |
|:---|:---|
| `air.current` | 空气质量和花粉浓度（文本和数值） |
| `weather.current` | 当前测量值（温度、露点、风速等） |
| `weather.forecast.dayX` | 第 X 天的每日天气预报 |
| `weather.forecast.hourly.hourX` | 每整小时的详细数据 |
| `info.lastUpdate` | 显示上次更新的日期和时间 |
| `info.lastUpdate` | 显示上次更新的日期和时间 |

---

## 更新说明
适配器更新后，建议删除整个目录树并重新创建。

## 法律与版权
### 图标和图像
本适配器中包含的天气和风向图标受创作者的版权保护。

* **使用说明：** 这些图标已获得 ioBroker 内部使用的许可。商业再分发或在本适配器之外使用需要获得作者的明确许可：h5n1@iknox.de。
* **天气数据：**所有天气数据均由[Open-Meteo.com](https://open-meteo.com/)提供。请查看其商业用途使用条款。

## Changelog
### 2.6.4 (2026-03-30)
* (H5N1v2) Update axios dependency to version 1.14.0

### 2.6.3 (2026-03-26)
* (H5N1v2) add sentry plugin to automatically report errors to developer

### 2.6.2 (2026-03-25)
* (H5N1v2) update @types/node dependency to version 22.19.15

### 2.6.1 (2026-03-04)
* (H5N1v2) chore: update dependencies to latest versions
* (mcm1957) fix: axios seems to be missing in dependencies
* (mcm1957) fix: language used for stateIds and names
* (mcm1957) fix: creation of intermediate objects missing

### 2.6.0 (2026-02-19)
* (H5N1v2) feat: Leave latitude and longitude empty to use system coordinates in settings. 
* (H5N1v2) feat: Added dropdown menu for timezones in settings.

[OLDER CHANGELOG](CHANGELOG_OLD.md)

## License
This project is licensed under the **MIT License** - see the `LICENSE` file for details.

Copyright (c) 2026 H5N1v2 <h5n1@iknox.de>