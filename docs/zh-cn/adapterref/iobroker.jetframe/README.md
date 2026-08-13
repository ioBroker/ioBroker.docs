---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.jetframe/README.md
title: ioBroker.jetframe
hash: /nidYHpoiVmDwthqpQCl4ouR0XiIX9AZ8fIiW+PeLlo=
---
![标识](../../../en/adapterref/iobroker.jetframe/admin/jetframe.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.jetframe.svg)
![下载](https://img.shields.io/npm/dm/iobroker.jetframe.svg)
![NPM](https://nodei.co/npm/iobroker.jetframe.png?downloads=true)

# IoBroker.jetframe
## JetFrame
JetFrame 是一个基于 ADS-B 数据的 ioBroker 适配器，用于实时跟踪和可视化航班。它可以检测飞过您窗外的飞机，并在一个现代化的 Web 应用程序中显示照片、航班信息和统计数据。

＃＃ 特征
- **实时航班跟踪**（通过 ADS-B，adsb.lol，自动回退到 adsb.fi）
- **窗口检测** – 仅显示实际穿过您视野的飞机
- **实时可视化**，包含飞机照片、航空公司标志、制造商标志和飞行路线
- **热力图** – 每日统计数据，包含观察时间分析和最佳观察时间
- **统计数据** – 记录天数、重型飞机跟踪、特殊涂装检测
- **语音输出** – 可选，可通过浏览器 TTS 或外部 ioBroker 对象实现。
- **跑道检测** – 显示可能的起飞/降落跑道
- **响应式网页用户界面** – 针对 iPhone、iPad 和桌面电脑（纵向和横向）进行了优化
- **飞越模式** – 可选功能，用于检测直接从头顶飞过的飞机
- **紧急情况探测** – 应答机代码 7500/7600/7700 会被突出显示

＃＃ 要求
- ioBroker js-controller ≥ 6.0.11
- Node.js ≥ 22
- Simple-API 适配器（用于 Web 界面）
- 您附近的 ADS-B 覆盖范围（使用公共 API，无需自备接收器）

＃＃ 配置
安装完成后，请在**管理 → JetFrame → 实例 → 设置**下配置适配器：

| 设置 | 描述 |
|---|---|
| **您的家庭坐标** | 您所在位置的纬度和经度 |
| **机场** | 最近机场的IATA代码、名称和坐标 |
| **搜索半径（海里）** | 用于 ADS-B 查询的机场周围半径（海里） |
| **窗户朝向** | 窗户朝向的罗盘方位（0° = 北） |
| **窗户视野** | 您的窗户视野范围，以度为单位（例如 90°） |
| **高度限制** | 飞机显示的最低/最高高度（英尺） |
| **轮询间隔** | 搜索新飞机的频率（搜索和实时跟踪） |
| **飞越侦测** | 可探测直接从头顶飞过的飞机 |
| **语音输出** | 浏览器文本转语音、外部 ioBroker 对象或已禁用 |
| **图片** | 外部航空公司和制造商标志的配置 |

## Web界面
JetFrame 运行其内置的 Web 服务器，无需 Simple-API 或其他适配器。Web 应用程序可直接访问：

```
http://<iobroker-ip>:<webPort>/index.html
```

端口（`webPort`，默认 `8189`）可在适配器设置中进行配置。

### 页数
| 页面 | 网址 | 描述 |
|---|---|---|
| **首页** | `index.html` | 概览、系统状态、导航 |
| **热力图** | `heatmap.html` | 每日统计数据和最佳观测时间 |
| **统计数据** | `stats.html` | 记录、历史排名、每日历史记录 |
| **统计数据** | `stats.html` | 记录、历史排名、每日历史记录 |

### URL 参数
| 参数 | 示例 | 描述 |
|---|---|---|
| `instance` | `?instance=1` | 适配器实例（默认值：`0`） |
| `source` | `?source=overflight` | 显示模式：`current`、`airport`、`overflight` |

### 可选：ioBroker VIS 集成
如果您想在经典的 ioBroker VIS 小部件中显示 JetFrame 数据（而不是内置页面，或者除了内置页面之外），只要您在设置中配置了 `Simple-API Host/IP` 和 `Simple-API Port`，JetFrame 仍然可以为 Simple-API 适配器写入 `vis-config.json`。这完全是可选的，对于上述内置网页来说并非必需。

＃＃＃ 语言
Web UI 页面（`index.html`、`frame.html`、`heatmap.html`、`stats.html`）为英文。管理员配置页面已完全翻译成 ioBroker 支持的所有 11 种语言。可选的语音提示（`speechText`，可通过 `speechTemplate` 配置）默认为德语，因为这是一个用户可配置的、面向德语用户的语音功能；用户可以自由编辑模板，将其更改为任何语言。

## IoBroker 状态
适配器在 `jetframe.0.*` 下创建以下状态：

＃＃＃ 地位
| 状态 | 类型 | 描述 |
|---|---|---|
| `enabled` | 布尔值 | 启用/禁用适配器 |
| `clearImageCache` | 布尔值 | 触发器：清除图像缓存 |
| `clearImageCache` | 布尔值 | 触发器：清除图像缓存 |

### 当前航班 (`current.*`)
| 状态 | 描述 |
|---|---|
| `callsign` | IATA 呼号（例如 `LH123`）|
| `routeCodesText` | 航线以 IATA 代码表示（例如 `FRA → MUC`） |
| `airlineName` | 航空公司名称 |
| `aircraftTypeText` | 飞机类型（例如 `Airbus A321`） |
| `aircraftSize` | 尺寸类别（`Narrowbody`, `Widebody`, `Jumbo`, …） |
| `registration` | 注册（例如 `D-AIBL`） |
| `altitudeFt` | 海拔高度（英尺） |
| `speedKt` | 速度（节） |
| `verticalRate` | 爬升/下降率（英尺/分钟） |
| `probableRunwayText` | 可能的跑道（例如 `RWY 25L`） |
| `windowPositionText` | 窗口位置（例如 `left of window · 12°`） |
| `modeVisText` | 模式文本（例如 `🛬 Landing Frankfurt`） |
| `localImageUrl` | 缓存的飞机照片的 URL |
| `speechText` | 语音输出文本 |
| `specialLiveryVisText` | 特殊涂装（例如 `100th Anniversary`） |
| `emergencyText` | 紧急信息（适用于应答机代码 7500/7600/7700） |
| `emergencyText` | 紧急信息（适用于应答机代码 7500/7600/7700） |

### 统计数据（`statistics.today.*`、`statistics.yesterday.*`、`statistics.alltime.*`）
每日统计数据包括航班数量、起降次数、起飞次数、飞越次数、最佳观赏时间、重型飞机计数器、特殊涂装计数器、顶级航空公司和顶级航线。

图片和标志
JetFrame 可以显示飞机照片、航空公司标志和制造商标志。默认情况下，这些数据从公共 API 获取（照片来自 JetPhotos，航线/航空公司数据来自 HexDB）。外部标志源可以在适配器设置中进行配置。可选的本地缓存可以减少外部请求并加快显示速度。

## 隐私和法律声明
JetFrame 查询公共 ADS-B API：

- **[adsb.lol](https://adsb.lol)** – 主要数据来源
- **[adsb.fi](https://adsb.fi)** – 自动回退
- **[Jetphotos.com](https://www.jetphotos.com)** – 飞机照片（仅提供网址查询，除非启用缓存，否则无法下载）
- **[HexDB.io](https://hexdb.io)** – 航线和航空公司信息
- **[Flightradar24](https://www.flightradar24.com)** – 补充航线信息

所有数据均仅存储在ioBroker本地。不会与任何第三方共享用户数据。

ADS-B数据由飞机公开广播的信号组成。在大多数国家，ADS-B数据的使用是合法的，并受到航空当局的容忍。合法使用的责任在于运营商。

所有商标、标识、航空公司名称、飞机图片及相关内容均为其各自权利持有人的财产。JetFrame 与任何航空公司、机场、飞机制造商、JetPhotos、ADS-B 提供商或航班跟踪服务商均无任何关联、认可或官方联系。

此适配器仅供私人、信息性、非商业性的本地可视化使用。用户有责任遵守所配置外部服务的许可协议和 API 条款。

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.3.3 (2026-08-11)

- (backfisch88) Fixed a flicker regression on the Statistics page (Yesterday/Top Airlines/Top Routes panels) caused by two competing DOM-update mechanisms; unified into a single, race-free update path. Reduced daily history to 5 entries and expanded alltime airline/route rankings to top 10 with column-fill layout. Fixed intermittent mouse-wheel scrolling on the Heatmap hour scroller (scroll-snap was fighting small wheel deltas).

### 1.3.2 (2026-08-09)

- (backfisch88) Translated the remaining hardcoded English hour-card badges (NOW/PEAK/HR) on the Heatmap page to follow the `webLanguage` setting.

### 1.3.1 (2026-08-09)

- (backfisch88) Fixed flicker on all web UI pages caused by redundant DOM writes on every poll cycle (most noticeable on the Live Frame page). Added mouse wheel and click-and-drag support for the heatmap hour scroller (previously touch-only). Fixed runway/window-position display logic that only recognized German words, breaking display in English mode.

### 1.3.0 (2026-08-08)

- (backfisch88) Full bilingual support (English/German) for both the web UI and all dynamic flight/statistics text written to states, following a new `webLanguage` setting (auto/en/de). Adapter log messages remain English-only regardless of this setting, as required.
- (backfisch88) Fixed 404s for cached aircraft/airline images after the Simple-API removal; images are now served directly by the built-in web server.
- (backfisch88) Fixed relative HTTP redirects causing "Invalid URL" errors in external API requests.
- (backfisch88) HTTP 400/404 responses from external flight-data APIs (expected for aircraft with no available data) are now logged at debug level instead of warn.
- (backfisch88) Fixed a visual flicker on the Live Frame page caused by redundant DOM updates every 5 seconds.
- (backfisch88) Various smaller layout and translation fixes across the web UI.

### 1.2.0 (2026-08-07)

- (backfisch88) JetFrame now runs its own built-in web server for the user-facing pages (index.html, frame.html, heatmap.html, stats.html) - no external Simple-API adapter is required anymore. New `webPort` setting (default 8189). Simple-API config is now optional and only used for classic ioBroker VIS widget integration.

Older entries can be found in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT License

Copyright (c) 2026 backfisch88 <h@h.de>

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