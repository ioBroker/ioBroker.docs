---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.openmeteo-notify/README.md
title: ioBroker.openmeteo-notify
hash: cAhadgK1JDPgDW9wH6wPLzFwUSNqq4a5btCCr9jgYNs=
---
![标识](../../../en/adapterref/iobroker.openmeteo-notify/admin/openmeteo-notify.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.openmeteo-notify.svg)
![下载](https://img.shields.io/npm/dm/iobroker.openmeteo-notify.svg)
![安装数量](https://iobroker.live/badges/openmeteo-notify-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/openmeteo-notify-stable.svg)
![NPM](https://nodei.co/npm/iobroker.openmeteo-notify.png?downloads=true)

# IoBroker.openmeteo-notify
**测试：** ![测试与发布](https://github.com/ipod86/ioBroker.openmeteo-notify/workflows/Test%20and%20Release/badge.svg)

## 用于 OpenMeteo 天气预报的 ioBroker 适配器
此适配器从免费的[OpenMeteo API](https://open-meteo.com)数据库中检索天气预报数据，并将其作为ioBroker数据点提供。无需API密钥。

## 亮点
### 可配置的 HTML 小部件
该适配器会生成一个可直接嵌入 VIS、vis-2 或任何 ioBroker 控制面板的 HTML 数据点 (`widget`)，无需任何外部工具或手动 CSS 代码。主题（浅色/深色）、背景透明度、卡片透明度、字体大小和卡片颜色均可在适配器设置中直接配置。

### 全文地址搜索
位置信息无需以原始坐标形式输入。设置界面提供**自由文本地址搜索**功能——只需输入城市、地址或地区名称，系统即可自动解析坐标。每个位置都会显示 OpenStreetMap 预览。支持同时配置多个位置。

### 最多16天天气预报
根据所选天气模型，可提供长达 **16 天** 的每日天气预报——远超大多数适配器通常提供的 5-7 天预报。

### 天气概况文本
该适配器使用 DWD 标准的温度、风和降水阈值，生成 **11 种语言的自然语言天气摘要（`current.summary`、`dayX.summary_day`、`dayX.summary_night`），包括基于 CAPE 的雷暴风险。

＃＃ 特征
- **免费且无需 API 密钥** – Open-Meteo 是一个免费的开源天气 API
- **多地点** – 您可以配置任意多个地点，每个地点都支持地址搜索和地图预览。
- **系统位置回退** – 如果未配置位置，则使用 ioBroker 系统坐标。
- **可配置的预测范围** – 每日最多 16 天，每小时最多 16 天
- **可配置更新间隔** – 60 分钟、120 分钟或每天 01:00
- **单位** – 温度（摄氏度/华氏度），风速（公里/小时，米/秒，英里/小时，节），降水量（毫米/英寸）
- **5 套天气图标集**，可在设置中实时预览：
- Bas Milius 的气象图 – 静态 PNG（默认）
- Bas Milius 的 Meteocons – 动画 SVG
amCharts 天气图标 – 动态 SVG 格式（雨/雪/雷：无昼夜变化）
- amCharts 天气图标 – 静态 SVG *(雨/雪/雷：无昼夜变化)*
- 世界气象组织官方指南（WMO OGC）气象符号 – PNG
- **日/夜图标** – Meteocons 和 amCharts 的晴天/阴天图标会根据 `is_day` 切换到夜间版本。
- **风向** – 度数、罗盘文字（北/东北/东/…）、箭头表情符号（⬆️↗️…）、SVG 箭头图标
- **风力强度** – 蒲福风级（0-12级），附有蒲福风级图标
- **`info.lastUpdate`** – 上次成功更新的时间戳

### 可选数据组（可单独切换，每个数据组均有“也按小时”选项）
| 组 | 默认值 | 数据点 |
|-------|---------|-------------|
| **空气质量** | 开启 | European_aqi、PM10、PM2.5、NO₂、CO、粉尘、臭氧 → `current.air_quality` / `hXX.air_quality` |
| **农业/太阳能** | 关闭 | 太阳辐射、CAPE、土壤温度、辐照度 → `*.agriculture` |
| **舒适度指数** | 关闭 | 体感温度、风寒指数、湿热指数、紫外线指数 → `*.comfort` |
| **花粉** | 关闭 | 桤木、桦树、草、艾蒿、橄榄、豚草，等级文本 → `dayX.pollen` / `hXX.pollen` |
| **DWD 警告** |关闭 |来自 Deutscher Wetterdienst 的官方警告（仅限德国）→ `location.warnings.*` |
| **DWD 警告** |关闭 |来自 Deutscher Wetterdienst 的官方警告（仅限德国）→ `location.warnings.*` |

当一个组被禁用时，其数据点通道将在下次更新时自动删除。

### 官方天气预警
该适配器集成了来自各国气象部门的官方天气预警信息。启用“官方天气预警”开关即可。系统会根据位置坐标自动选择服务：

| 国家/地区 | 服务 | 覆盖范围 |
|---------|---------|----------|
|德国 (DE) | [加拿大野生动物部](https://www.dwd.de) – 德国湿法 |所有警告类型，4 个严重级别 |
| 欧盟国家 | [MeteoAlarm](https://www.meteoalarm.org) | 所有预警类型，基于多边形的匹配 |
| 其他 | — | 不可用（使用计算出的 OpenMeteo 预警） |

无论来源如何，警告都存储在 `location.warnings.*` 下。`warnings.source` 数据点显示 `"DWD"` 或 `"MeteoAlarm"`。

＃＃ 安装
通过 ioBroker 管理界面安装（搜索“openmeteo-notify”）。

＃＃ 配置
| 设置 | 说明 | 默认值 |
|---------|-------------|---------|
| 位置 | 名称 + 自由文本地址搜索或坐标；OSM 地图预览 | ioBroker 系统位置 |
| 预报天数 | 每日预报范围（1-16） | 7 |
| 按小时统计的天数 | 包含小时数据的天数（0-16） | 3 |
| 温度单位 | °C 或 °F | °C |
| 风速单位 | 公里/小时、米/秒、英里/小时、节 | 公里/小时 |
| 降水量单位 | 毫米或英寸 | 毫米 |
| 图标集 | 天气图标集（带实时预览）| 静态气象图标集 |
| 更新间隔 | 60 分钟 / 120 分钟 / 每日 01:00 | 60 分钟 |
| 小部件主题 | HTML 小部件的浅色或深色主题 | 浅色 |
| 小部件背景不透明度 | HTML 小部件的背景透明度 | 100% |
| 小部件卡片不透明度 | HTML 小部件的卡片透明度 | 100% |
| 小部件字体大小 | HTML 小部件中的字体大小 | 14px |
| 小部件卡片颜色 | 卡片背景颜色 | #ffffff |
| 紧凑视图 | 在 HTML 小部件中使用紧凑布局 | 关闭 |
| 空气质量 | 启用空气质量指数 + 颗粒物 | 开启 |
| 空气质量 – 也按小时更新 | `hXX.air_quality` 下的每小时空气质量指数/PM | 关闭 |
| 天文学 | 启用太阳和月亮数据 | 开启 |
| 天文观测 – 也按小时更新 | 每小时的 Echo 天文数据 | 关闭 |
| 农业/太阳能 | 启用辐射、CAPE、土壤温度 | 关闭 |
| 农业 – 也按小时更新 | 每小时农业数据 | 关闭 |
| 舒适度指数 | 启用体感温度、风寒指数、湿热指数、紫外线指数 | 关闭 |
| 舒适度 – 也按小时计算 | 每小时舒适度数据 | 关闭 |
| 花粉 | 启用花粉数据（仅限欧洲） | 关闭 |
| 花粉 – 也按小时更新 | 各类花粉的每小时更新量 | 关闭 |
| 德国气象局天气预警 | 启用德国气象局数据（仅限德国） | 关闭 |
| 官方预警通知 | 通过 ioBroker 通知系统发送官方预警（德国：DWD，欧盟：MeteoAlarm） | 关闭 |
| 风暴预警 | 根据 OpenMeteo 全球预报计算 | 关闭 |
| 雷暴预警 | 根据 OpenMeteo 全球预报计算 | 关闭 |
| 提前时间（小时）| 提前多少小时发送风暴/雷暴预警 | 2 |

## 数据点
适配器在 `openmeteo-notify.<instance>.<location>` 下创建数据点。

### 当前天气 (`current`)
| 数据点 | 描述 | 单位 |
|-----------|-------------|------|
| `temperature` | 当前温度 | °C/°F |
| `weathercode` | 世界气象组织天气代码（0 = 晴空，95/99 = 雷暴）– 完整表格：[WMO 4677](https://open-meteo.com/en/docs#weathercode) | |
| `description` | 人类可读的天气描述（11 种语言） | |
| `icon` | 天气表情符号 | |
| `icon_url` | 天气图标网址（图标集可在设置中选择） | |
| `precipitation` | 过去一小时总降水量 | 毫米/英寸 |
| `rain` | 过去一小时降雨量 | 毫米/英寸 |
| `snowfall` | 过去一小时降雪量 | 厘米 |
| `snow_depth` | 当前地面积雪深度 | 厘米 |
| `cloudcover` | 云量 | % |
| `humidity` | 相对湿度 | % |
| `dew_point` | 露点 – 空气达到饱和温度时的温度；接近气温 = 高湿度 | °C/°F |
| `pressure` | 大气压力折算至平均海平面 (MSL) | 百帕 |
| `visibility` | 水平可见性 | 米 |
| `is_day` | `true` 日出至日落之间 | 布尔值 |
| `windspeed` | 风速（单位可选：km/h、m/s、mph、kn） | km/h … |
| `windgusts` | 最大阵风速度 | 公里/小时 … |
| `winddirection` | 风向（气象学：风的来向） | ° |
| `winddirection_text` | 方位文字 | 北/东北/… |
| `winddirection_icon` | 方位表情符号 | ⬆️↗️… |
| `winddirection_icon_url` | 风向箭头图标 URL | |
| `windbeaufort` | 蒲福风级风力强度（0 = 无风，8 = 大风，12 = 飓风） | 0–12 |
| `windbeaufort_icon_url` | 博福特图标网址 | |
| `air_quality.*` | 空气质量指数、PM10、PM2.5、二氧化氮、一氧化碳、粉尘、臭氧（如果启用） | |
| `pollen.*` | 当前每种花粉的含量（如果启用）* | 粒/立方米 |
| `agriculture.solar_radiation` | 地面短波太阳辐射（如果启用） | W/m² |
| `agriculture.cape` | CAPE – 对流有效位能：可用于雷暴发展的能量；> 500 J/kg = 显著风险，> 2000 J/kg = 严重风险（如果启用）* | J/kg |
| `agriculture.soil_temp` | 0 厘米深度处的土壤温度（如果启用）* | °C/°F |
| `comfort.heat_index` | 热指数（Rothfusz）——结合温度和湿度计算出的体感温度；仅在 ≥ 27 °C 且 ≥ 40 % RH 时有意义，否则为 `null`（如果启用）* | °C/°F |
| `comfort.windchill` | 风寒指数（美国国家气象局）——风引起的体感温度；仅在 ≤ 10 °C 且风速 > 4.8 公里/小时时有效，`null` 否则有效（如果启用）| °C/°F |
| `comfort.humidex` | 体感温度指数（加拿大公式）——综合热湿不适指数；高于 40 表示不适，高于 46 表示危险（如果启用）| °C/°F |
| `comfort.humidex_level` | 体感温度不适等级：1 = 无 (<29) · 2 = 轻微 (29–34) · 3 = 明显 (35–39) · 4 = 强烈 (40–45) · 5 = 危险 (≥46) *(如果启用)* | 1–5 |
| `comfort.uv_index` | 紫外线指数 (0–11+) – 地面紫外线辐射强度（如果启用） | |
| `comfort.uv_level` | 紫外线防护等级（世卫组织等级）：`low`（0–2，无防护）· `moderate`（3–5，防晒霜）· `high`（6–7）· `very_high`（8–10）· `extreme`（≥11）*（如果启用）* | |
| `comfort.uv_level` | 紫外线防护等级（世界卫生组织等级）：`低`（0–2，无防护）· `中等`（3–5，防晒霜）· `高`（6–7）· `非常高`（8–10）· `极高`（≥11）*（如果启用）* | |

### 每日预报（`day1` … `day16`）
| 数据点 | 描述 |
|-----------|-------------|
| `date` / `weekday` | 日期 / 星期几 |
| `description` | 天气描述 |
| `temp_max` / `temp_min` | 最高/最低温度 |
| `feels_like_max` / `feels_like_min` | 感觉最大值/最小值 |
| `weathercode` | 世界气象组织天气代码 |
| `precipitation` | 降水量 |
| `rain` / `snowfall` | 降雨/降雪总量 |
| `rain_probability` | 降水概率 |
| `windspeed` / `windgusts` | 最大风速/阵风 |
| `winddirection` / `_text` / `_icon` / `_icon_url` | 风向 |
| `windbeaufort` / `windbeaufort_icon_url` | 蒲福风力等级 |
| `uv_index` | 日最大紫外线指数（考虑云量）* | |
| `uv_index_clear_sky` | 假设天空完全晴朗，每日最高紫外线指数 – 可用于查看潜在的紫外线辐射量，不受云量影响 | |
| `sunshine_hours` | 实际日照时数（直接辐射） | 小时 |
| `daylight_hours` | 日出日落总时长 | 小时 |
| `cloud_cover_max` | 日间最大云量 | % |
| `temp_mean` / `feels_like_mean` | 日平均气温/体感温度 | °C/°F |
| `precipitation_hours` | 可测量降水的小时数 | 小时 |
| `showers` | 对流性（阵雨型）降水 – 短暂、强烈；与连续性降水不同 `rain` | 毫米/英寸 |
| `snowfall_height_min` | 当日降雪最低海拔（0 米 = 雪至谷底） | 米（海拔） |
| `freezing_level_height_min` | 白天 0 °C 等温线最低海拔 | 米 a.s.l. |
| `dew_point_mean` / `humidity_mean` / `pressure_mean` | 日均值 | |
| `air_quality.european_aqi_max` … `ozone_max` | 每日最高空气质量指数、PM10、PM2.5、NO₂、CO、粉尘、臭氧（如果启用）* | |
| `astronomy.sunrise` / `astronomy.sunset` | 日出/日落 *(如果启用)* | |
| `astronomy.solar_noon` | 太阳最高位置时间（如果启用） | |
| `astronomy.solar_elevation_max` | 正午时太阳在地平线上的角度 – 90° = 正上方，0° = 地平线 *(如果启用)* | ° |
| `astronomy.moon_phase_val` | 月相数值：0 = 新月 · 0.25 = 上弦月 · 0.5 = 满月 · 0.75 = 下弦月 *(如果启用)* | 0–1 |
| `astronomy.moon_phase_text` / `_icon_url` | 月相以文字/图标形式显示（如果启用） | |
| `astronomy.moonrise` / `astronomy.moonset` | 月升/月落 *(如果启用)* | |
| `agriculture.solar_radiation_sum` | 全天接收到的总太阳辐射量 | MJ/m² |
| `agriculture.evapotranspiration` | FAO-56 参考蒸散量 (ET₀) – 植物和土壤释放的水量；用于灌溉规划 | 毫米 |
| `agriculture.lifted_index_min` | 日最低抬升指数 – 大气稳定性：负值 = 不稳定/风暴风险，强负值 (< −6) = 强雷暴风险 *(如果启用)* | K |
| `comfort.heat_index_max` | 当日最高体感温度（如果启用）* | °C/°F |
| `comfort.windchill_min` | 当日最低风寒指数（如果启用）* | °C/°F |
| `comfort.humidex_max` / `.humidex_level` | 最大体感温度/不适等级（1-5，参见当前章节）*（如果启用）* | |
| `comfort.uv_index_max` / `.uv_level` | 最大紫外线指数/级别（参见当前章节）*（如果启用）* | |
| `pollen.alder` … `pollen.ragweed` | 每日最高花粉浓度 + 等级文字（无/低/中/高）*（如果启用，仅限第 1-4 天）* | 粒/立方米 |
| `pollen.alder` … `pollen.ragweed` | 每日最高花粉浓度 + 等级文字（无/低/中/高）*（如果启用，仅限第 1-4 天）* | 粒/立方米 |

### 小时值（`day1.hourly.h00` … `h23`）
温度、体感温度、降水、雨、雪、积雪深度、积雪高度、降雨概率、云量、湿度、露点、气压、能见度、日期、风速、风向（文本/表情符号/图标）、蒲福风级、紫外线指数、冰点高度、天气代码、图标/图标网址、描述。

可选按小时计费（如果启用 + “也按小时计费”）：

| 通道 | 数据点 |
|---------|-------------|
| `hXX.air_quality` | 欧洲空气质量指数、PM10、PM2.5、NO₂、CO、粉尘、臭氧 |
| `hXX.agriculture` | 太阳辐射 (W/m²)、CAPE (J/kg)、土壤温度 (°C/°F)、辐照度 = 平面上的全球倾斜辐照度 (W/m²)、抬升指数 (K) |
| `hXX.comfort` | 体感温度、风寒指数、体感温度、体感温度等级、紫外线指数、紫外线等级 |
| `hXX.pollen` |桤木…豚草 + 水平文本 (Keine/Niedrig/Mittel/Hoch) |
| `hXX.花粉` |桤木…豚草 + 水平文本 (Keine/Niedrig/Mittel/Hoch) |

### 官方警告 (`warnings`)
| 数据点 | 描述 |
|-----------|-------------|
| `warnings.source` | 警告服务：`"DWD"` 或 `"MeteoAlarm"` |
| `warnings.count` | 当前警告数量 |
| `warnings.max_level` | 最高严重程度：1 = 轻微 · 2 = 中度 · 3 = 严重 · 4 = 极重度 |
| `warnings.max_level_text` | 严重性文本 |
| `warnings.warning_N.active` | 警告槽 N 已激活 |
| `warnings.warning_N.event` | 事件类型 |
| `warnings.warning_N.level` / `.level_text` | 严重程度 |
| `warnings.warning_N.headline` | 警告标题 |
| `warnings.warning_N.description` | 警告描述 |
| `warnings.warning_N.start` / `.end` | 有效期 |
| `warnings.warning_N.start` / `.end` | 有效期 |

*（仅当启用“官方天气预警”且检测到受支持的国家/地区时才会创建。）*

### 摘要和小部件
| 数据点 | 描述 |
|-----------|-------------|
| `current.summary` | 当前天气状况的自然语言天气摘要（11 种语言） |
| `dayX.summary_night` | 当日夜间天气预报概要（11种语言） |
| `weather_short` | 所有预报日期的简短文字概述 |
| `widget` | 适用于 VIS / vis-2 / 仪表盘的即用型 HTML 代码片段（外观可配置） |
| `info.lastUpdate` | 上次成功更新的时间戳 |
| `info.lastUpdate` | 上次成功更新的时间戳 |

## 图标来源
- **气象图标**，作者：[Bas Milius](https://github.com/basmilius/weather-icons) – MIT 许可证
- **amCharts 天气图标**，由 [amCharts](https://www.amcharts.com/free-animated-svg-weather-icons/) 提供 – [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- **WMO气象符号** 由 [OGC MetOcean DWG](https://github.com/OGCMetOceanDWG/WorldWeatherSymbols) 提供 – CC BY 4.0

## 免责声明
此适配器使用来自以下第三方服务的数据：

- **[Open-Meteo](https://open-meteo.com)** – 天气预报数据。Open-Meteo 的名称和徽标均为其各自所有者的财产。
- **[DWD](https://www.dwd.de)** (Deutscher Wetterdienst) – 德国官方天气警告。 DWD 名称和数据属于 Deutscher Wetterdienst 的财产。
- **[MeteoAlarm](https://www.meteoalarm.org)** – 欧洲各国的官方天气预警。MeteoAlarm 的名称和数据均为其各自所有者的财产。

该适配器是一个独立的社区项目，与上述任何服务均无关联，也未获得其认可。

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.1.12 (2026-07-01)
* (ipod86) fix: translate 84 missing admin i18n keys into all 10 languages (W5606)

### 0.1.11 (2026-06-24)
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.
* (ipod86) fix: skip hourly slots without icon data in detailed widget (missing icons at 00h/02h/04h)
* (ipod86) feat: grey out hourlyRange options that exceed configured hourly days; add explanatory hint
* (ipod86) fix: reposition moon badge in simple and detailed widget header
* (ipod86) feat: add moon phase overlay to simple widget (showMoon option)
* (ipod86) fix: complete and correct i18n translations in all 11 languages (50+ missing keys)
* (ipod86) ci: remove broken build-admin GitHub Actions workflow

### 0.1.10 (2026-06-23)
* (ipod86) fix: improve air quality/pollen error log message – distinguish timeout from unsupported region

### 0.1.9 (2026-06-22)
* (ipod86) fix: increase HTTP request timeout from 10s to 30s
* (ipod86) fix: remove spurious enableWarnOfficialFetch from native defaults
* (ipod86) chore: bump @iobroker/adapter-core from 3.3.2 to 3.4.1
* (ipod86) chore: bump @iobroker/adapter-react-v5, react, @vitejs/plugin-react, vite in src-admin
* (ipod86) chore: bump ioBroker/testing-action-check from 1 to 2

### 0.1.8 (2026-06-09)
* (ipod86) fix: add 10s timeout to all HTTP requests (fetchWeather, fetchAirQuality, fetchLocationInfo, fetchMeteoAlarmWarnings, fetchDwdWarnings)
* (ipod86) fix: translate all remaining German common.name values in processData, processDwdWarnings, processMeteoAlarmWarnings
* (ipod86) fix: warning time format no longer hardcoded to de-DE locale; uses system locale
* (ipod86) fix: add interval bounds validation (1–35791 min) for updateInterval and warnIntervalMinutes
* (ipod86) fix: add missing native defaults (warnOfficialFetch, enableWarnOfficialFetch, widgets) to io-package.json
* (ipod86) fix: move _locationInfo initialization to constructor

Older changelogs are available in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT License

Copyright (c) 2026 ipod86

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