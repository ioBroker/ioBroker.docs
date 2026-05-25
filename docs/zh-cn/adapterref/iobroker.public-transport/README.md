---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.public-transport/README.md
title: ioBroker.公共交通
hash: 4U3wRVMIBOFFMtvgY3jnuoabQJYcj18Y3MTtijrN9q8=
---
![标识](../../../en/adapterref/iobroker.public-transport/admin/iconAdapter.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.public-transport.svg)
![下载](https://img.shields.io/npm/dm/iobroker.public-transport.svg)
![安装数量](https://iobroker.live/badges/public-transport-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/public-transport-stable.svg)
![NPM](https://nodei.co/npm/iobroker.public-transport.png?downloads=true)

# IoBroker.public-transport
**测试：** ![测试与发布](https://github.com/tt-tom17/ioBroker.public-transport/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的公共交通适配器
公共交通适配器可将实时公共交通时刻表信息无缝集成到您的 ioBroker 智能家居环境中。借助此适配器，您可以获取德国、奥地利和其他国家/地区各交通运营商站点的发车时间，并将其用于自动化控制。

[🇩🇪 德语文档](doc/de/README.de.md)

＃＃ 目录
- [主要特性](#key-features)
- [安装](#installation)
- [支持的传输网络](#supported-transport-networks)
- [配置](#configuration)
- [数据结构](#data-structure)
- [用法示例](#usage-examples)
- [更新日志](#changelog)
- [许可证](#license)

## 主要特点
- **多种传输服务**：全面支持 HAFAS 和 DB Vendo API
- **灵活的站点配置**：可配置任意数量的站点。
- **实时数据**：获取包含延误信息的实时出发时间
- **自动更新**：定期轮询出发时间，轮询间隔可自由配置
- **全面的筛选选项**：按交通方式（公交车、火车、有轨电车、地铁、轮渡等）筛选
- **灵活时间偏移**：显示与未来特定时间点的出发时间。
- **可自定义查询计数**：确定每个站点应显示多少趟班次
- **自定义名称**：为您的站点和连接分配个性化名称

＃＃ 安装
### 先决条件
- 安装 ioBroker（需要 Node.js 20.x 或更高版本）
- 通过互联网访问以获取日程数据

### 通过 ioBroker 管理员进行安装
1. 打开ioBroker管理界面
2. 导航至“适配器”
3. 搜索“公共交通”
4. 点击“安装”

支持的传输网络
### HAFAS 简介
该适配器使用 HAFAS（HaCon 时刻表信息系统）API，并支持众多交通网络和运营商：

＃＃＃＃ 德国
- **VBB** - 柏林-勃兰登堡交通协会

奥地利
- **ÖBB** - Österreichische Bundesbahnen（全国）

### 售货机
用于从德国铁路（DB）检索数据的 Vendo API

＃＃ 配置
### 常规设置
1. **选择服务类型**
- 根据您的运输运营商，在“HAFAS”和“Vendo”之间进行选择

2. **选择个人资料**（仅限 HAFAS）
- 从下拉列表中选择合适的传输网络配置文件
   - 示例：“db”代表德国铁路，“vbb”代表柏林-勃兰登堡

3. **查询间隔**
- 定义数据更新频率（以分钟为单位）
- 建议：实时数据需 2-5 分钟
- 最短：1 分钟

### 添加站点
以下参数可针对每个站点进行配置：

#### 配置参数
- **自定义名称**（可选）
- ioBroker 中站点的个性化名称
例如：“Bus_Stop_Work” 而不是官方名称

- **出发班次**
- 应该检索多少个出发日期？
- 默认值：5
范围：1-20

- **时间偏移量（分钟）**
- 显示未来从这一点出发的路线
- 默认值：0（立即）
例如：5 = 仅显示 5 分钟后出发的航班
- 可用于隐藏您无法再追踪的离境信息

- **时间段（分钟）**
- 显示出发日期的最长时间
- 默认值：60
例如：30 = 仅显示未来 30 分钟内的出发时间

- **传输模式过滤器**
- 选择要显示的运输方式：
    - 公共汽车
- S-Bahn（郊区铁路）
- 地铁
- 有轨电车（街车）
- 区域列车
- 国家列车
渡轮
    - 表达
    - 出租车
- 可多选

### 添加旅程
行程查询功能允许您查询两个车站之间的换乘信息。您可以配置以下参数：

#### 旅程配置参数
- **自定义名称**（可选）
- ioBroker 中旅程的个性化名称
例如：“Home_to_Work”以便更好地识别

- **从车站出发**（必填）
旅程的起点站
- 从可用站点中选择

- **前往车站**（必填）
- 旅程的目的地车站
- 从可用站点中选择

- **结果数量**
- 应该检索多少种出行方案？
- 默认值：3
范围：1-10

- **传输模式过滤器**
- 与车站的情况相同（见上文）
限制旅途中使用的交通方式

## 数据结构
### 站点数据结构
适配器会在 ioBroker 中为每个已配置的站点创建一个对象树：

```
public-transport.0
├── Stations
│   └── <Station-ID>                 // Station ID (e.g., 900350163)
│       ├── json                     // Raw departure data (JSON)
│       ├── enabled                  // Station enabled (boolean)
│       ├── Departures_00            // First departure
│       │   ├── Departure            // Actual departure time
│       │   ├── DeparturePlanned     // Planned departure time
│       │   ├── Delay                // Delay in seconds
│       │   ├── DepartureDelayed     // Is delayed (boolean)
│       │   ├── DepartureOnTime      // Is on time (boolean)
│       │   ├── Platform             // Platform/stop
│       │   ├── PlatformPlanned      // Planned platform/stop
│       │   ├── Direction            // Direction/destination
│       │   ├── Name                 // Line name (e.g., "891")
│       │   ├── Product              // Product type (e.g., "bus")
│       │   ├── Operator             // Operator name
│       │   ├── Mode                 // Transport mode (bus, train, etc.)
│       │   ├── Remarks              // Remarks and notifications
│       │   │   ├── Hint             // General hints
│       │   │   ├── Status           // Status messages
│       │   │   └── Warning          // Warnings
│       │   └── Stop                 // Stop information
│       │       ├── Id               // Stop ID
│       │       ├── Name             // Stop name
│       │       └── Type             // Stop type (e.g., "stop")
│       ├── Departures_01            // Second departure
│       │   └── ...
│       └── ...
```

### 旅程数据结构
对于每个已配置的旅程，适配器都会创建以下结构：

```
public-transport.0
├── Journeys
│   └── journey_<ID>                     // Journey configuration ID
│       ├── Journey_00                   // First journey option
│       │   ├── json                     // Raw journey data (JSON)
│       │   ├── Arrival                  // Arrival time at destination
│       │   ├── ArrivalPlanned           // Planned arrival time
│       │   ├── ArrivalDelay             // Arrival delay in seconds
│       │   ├── ArrivalDelayed           // Delayed arrival (boolean)
│       │   ├── ArrivalOnTime            // On-time arrival (boolean)
│       │   ├── Departure                // Departure time from start
│       │   ├── DeparturePlanned         // Planned departure time
│       │   ├── DepartureDelay           // Departure delay in seconds
│       │   ├── DepartureDelayed         // Delayed departure (boolean)
│       │   ├── DepartureOnTime          // On-time departure (boolean)
│       │   ├── Changes                  // Number of transfers
│       │   ├── DurationMinutes          // Journey duration in minutes
│       │   ├── Leg_00                   // First leg/segment
│       │   │   ├── json                 // Raw leg data (JSON)
│       │   │   ├── Arrival              // Segment arrival time
│       │   │   ├── ArrivalPlanned       // Planned segment arrival
│       │   │   ├── ArrivalDelay         // Segment arrival delay (seconds)
│       │   │   ├── ArrivalDelayed       // Delayed arrival (boolean)
│       │   │   ├── ArrivalOnTime        // On-time arrival (boolean)
│       │   │   ├── Departure            // Segment departure time
│       │   │   ├── DeparturePlanned     // Planned segment departure
│       │   │   ├── DepartureDelay       // Segment departure delay (seconds)
│       │   │   ├── DepartureDelayed     // Delayed departure (boolean)
│       │   │   ├── DepartureOnTime      // On-time departure (boolean)
│       │   │   ├── Distance             // Distance in meters
│       │   │   ├── Reachable            // Segment reachable (boolean)
│       │   │   ├── Line                 // Line information
│       │   │   │   ├── Direction        // Direction/destination
│       │   │   │   ├── Mode             // Transport mode (train, bus, etc.)
│       │   │   │   ├── Name             // Line name (e.g., "RE3")
│       │   │   │   ├── Operator         // Transport operator
│       │   │   │   └── Product          // Product type (e.g., "regional")
│       │   │   └── Remarks              // Remarks and notifications
│       │   │       ├── Hints            // General hints
│       │   │       ├── Status           // Status messages
│       │   │       └── Warnings         // Warnings
│       │   ├── Leg_01                   // Second leg/segment
│       │   │   └── ...
│       │   └── ...
│       ├── Journey_01                   // Second journey option
│       │   └── ...
│       └── ...
```

### 数据类型和示例值
| 状态 | 类型 | 示例 | 描述 |
|-------|------|---------|-------------|
| 延迟 | 数量 | `3` | 延迟时间（分钟）（0 = 准时） |
| 出发时间 | 字符串 | `2026-02-16T14:33:00.000Z` | 实际出发时间（含延误） |
| 方向 | 字符串 | `S Potsdam Hauptbahnhof` | 最终目的地 |
| 行 | 字符串 | `S7` | 行标识 |
| 平台 | 字符串 | `3` | 轨道/站台/公交车停靠站台 |
| 类型 | 字符串 | `suburban` | 传输模式类型 |
| 已取消 | 布尔值 | `false` | 行程取消 |
| 已取消 | 布尔值 | `false` | 行程取消 |

## 使用示例
### 1. 可视显示
Vis1/2 包含一个独立的出发和转机信息显示组件。显示内容使用 JSON 数据。

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (tt-tom17) added productName to states
* (tt-tom17) connections widget: show remarks icons (warning/hint/status) per leg in journey detail popup
* (tt-tom17) connections widget: show remarks icons in main table (new Info column)
* (tt-tom17) connections widget: highlight delayed journeys/legs with red left border

### 0.4.0 (2026-05-06)
* (tt-tom17) fix select Products
* (tt-tom17) add Profil VBN (Bremen/Niedersachsen)

### 0.3.0 (2026-05-02)
* (tt-tom17) fix issues for latest Repo
* (tt-tom17) fix deaktivieren von Verbindungen
* (tt-tom17) Adapter requires node.js >= 22 now

### 0.2.2 (2026-04-25)
* (tt-tom17) fix countEntries for journeys

### 0.2.1 (2026-04-24)
* (tt-tom17) fix Vendo forbidden -> change dbnav to db

### 0.2.0 (2026-04-21)  
* (tt-tom17) Widget departures: add popup for hints and warnings

### 0.1.1 (2026-04-19)   
* (tt-tom17) fix App.tsx
* (tt-tom17) Fix [Bug]: Abfahrten-JSON bleibt leer oder alle gleich [#28](https://github.com/tt-tom17/ioBroker.public-transport/issues/28)

### 0.1.0 (2026-04-01)  
* (tt-tom17) begin beta-test

### 0.0.6 (2026-03-12)
* (tt-tom17) Widget for Journey
* (tt-tom17) Refactor admin UI: convert class components to functional components
* (tt-tom17) Add confirmation dialog for station and journey deletion
* (tt-tom17) Auto-save and delete ioBroker object tree on station/journey removal
* (tt-tom17) Upgrade admin dependencies

### 0.0.5 (2026-03-03)  
* (tt-tom17) Upgrade dependency

### 0.0.4 (2026-02-16)
* (tt-tom17)   optimization react pages

### 0.0.1-preAlpha.0 (2025-12-01)
* (tt-tom17) initial release

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025 - 2026 tt-tom17 <tgb@kabelmail.de>

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