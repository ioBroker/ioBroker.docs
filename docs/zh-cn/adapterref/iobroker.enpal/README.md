---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.enpal/README.md
title: Enpal Solar 的 ioBroker 适配器
hash: Bh8A0oHG4rVcna8B6lrzEWUvAZCzrobxt4wsJQstvQE=
---
![标识](../../../en/adapterref/iobroker.enpal/admin/enpal_logo.svg)

![安装数量](https://iobroker.live/badges/enpal-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/enpal-stable.svg)
![NPM 版本](https://nodei.co/npm/iobroker.enpal.svg?style=shields&data=v,u,d&color=orange)
![下载](https://img.shields.io/npm/dm/iobroker.enpal.svg)
![社区](https://img.shields.io/badge/community%20-ioBroker%20|%20forum-blue.svg)
![维护者](https://img.shields.io/badge/maintainer-skvarel%20@%20inventwo-yellowgreen.svg)
![人工智能](https://img.shields.io/badge/ai%20assisted-cursor-blue.svg)
![PayPal捐赠](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)

# Enpal Solar 的 ioBroker 适配器
---

## 此适配器的功能
从 Enpal 太阳能系统提供的本地 InfluxDB 2.x 实例读取能源数据，并公开 ioBroker 状态以用于家庭自动化：

- 监测太阳能发电量
- 跟踪电池电量状态 (SoC)
- 分析电网消耗和馈入功率
- 基于发电量的自动化
- 在 ioBroker 控制面板中可视化能量流
- 可通过本地 Enpal Box 网络界面控制 Enpal 壁挂式充电桩（充电模式、启动/停止）。

＃＃ 特征
该适配器直接连接到 Enpal 设备写入的**本地 InfluxDB**——无需云帐户或互联网访问。

- 自动发现存储在 InfluxDB 存储桶中的所有测量值、设备和字段
- 在 `enpal.0.<measurement>.<device>.<field>` 下动态创建状态
- 可配置轮询间隔（默认值：60 秒）
- 通过 `info.connection` 获取连接状态——当数据库无法访问时，适配器实例会变为红色。
- 可选的**墙盒控制**（充电模式、启动/停止），通过 Enpal Box Blazor Web 界面实现——使用与 InfluxDB URL 相同的主机（端口 80）

## 数据点
数据点会根据 InfluxDB 存储桶的内容动态创建。其结构遵循以下模式：

```
enpal.0.<measurement>.<device>.<field>
```

典型示例（取决于您的逆变器和 Enpal 配置）：

- `enpal.0.solar.inverter.power` — 当前光伏发电功率 (W)
- `enpal.0.solar.inverter.energy` — 今日发电量 (Wh)
- `enpal.0.battery.storage.soc` — 电池电量 (%)
- `enpal.0.grid.meter.power` — 电网导入/导出功率 (W)
- `enpal.0.info.connection` — 与 InfluxDB 的连接状态

实际字段名称取决于您的 Enpal 系统版本和硬件配置。

### 墙盒控制（`wallbox_control`）
当在适配器配置中启用**Wallbox 控制**时，将创建一个固定通道（独立于 InfluxDB 自动发现）：

```
enpal.0.wallbox_control.<state>
```

| 状态 | 类型 | 读取 | 写入 | 描述 |
|-------|------|------|-------|-------------|
| `start` | 按钮 | 否 | 是 | 开始充电（设置为 `true` 可触发） |
| `mode` | 值 | 是 | 是 | 设置充电模式：`eco`、`solar`、`full` 或 `smart` |
| `currentMode` | 文本 | 是 | 否 | 壁挂式充电桩报告的当前充电模式（例如 `Eco`、`Solar`、`Full`） |
| `connectorStatus` | 文本 | 是 | 否 | 来自墙盒的 OCPP 连接器状态（参见 [连接器状态值](#connector-status-values)） |
| `automaticChargeStatus` | 文本 | 是 | 否 | 插电自动充电（`On` / `Off`；只读，可通过 Enpal 应用程序更改） |
| `automaticChargeStatus` | 文本 | 是 | 否 | 插电自动充电（`开` / `关`；只读，可通过 Enpal 应用更改） |

工作原理

- **控制**（模式、启动、停止）：适配器通过 Blazor SignalR 连接到 `http://<enpal-box>/wallbox`（与 [Home Assistant Enpal 集成](https://github.com/derolli1976/enpal) 的方法相同），并模拟按钮点击。
- **状态**（`currentMode`、`connectorStatus`、`automaticChargeStatus`）：从 Enpal Box 页面 `http://<enpal-box>/deviceMessages` 读取（`Mode.Charge.Connector.1`、`Status.Wallbox.Connector.1`、`Wallbox.Settings.AutomaticChargeStatus.Connector.1`）。在每次同步间隔和控制操作后更新。

#### 连接器状态值
`connectorStatus` 报告 Enpal/StarCharge 壁挂式充电桩的 [OCPP](https://www.openchargealliance.org/) 连接器状态。值已规范化为标准拼写（例如 `SuspendedEV`，而不是 `Suspendedev`）。

| 价值 | 意义 |
|-------|---------|
| `Available` | 连接器空闲，未连接车辆 |
| `Charging` | 正在充电 — 正在供电 |
| `SuspendedEV` | 车辆暂停充电（例如电池已满、电池管理系统限制）；仍已连接电源 |
| `SuspendedEVSE` | 壁挂式充电桩暂停供电（例如负载管理）；车辆仍连接 |
| `Finishing` | 会话已结束，但电缆仍连接或车辆尚未移动 |
| `Reserved` | 连接器预留给未来的会话 |
| `Unavailable` | 暂时无法使用（维护中，已禁用） |
| `Faulted` | 墙盒报告错误 |
| `Connected` | 车辆已连接（Enpal 特有；可能出现在其他状态之前或之后） |
| `已连接` | 车辆已连接（Enpal 特有；可能显示在其他状态之前或之外） |

> **注意：**充满电后，您通常会看到 `SuspendedEV` —— 这是正常现象。车辆已停止充电；如有需要，请拔下充电器或重新开始充电。

**要求**

- Enpal Box 固件 **8.50+**（Blazor 壁挂式盒子页面）
- 适配器配置中已启用 Wallbox 控制复选框
- ioBroker 主机必须能够通过本地网络访问 Enpal Box（与 InfluxDB 使用相同的 IP 地址，HTTP 端口 80）

**不支持**

- 通过 ioBroker 更改插电自动充电设置（此设置保持只读；请使用 Enpal 应用进行切换）

＃＃ 安装
1. 从 ioBroker 管理界面安装适配器
2. 创建一个新实例
3. 配置以下设置（**设置**选项卡）：
- **InfluxDB URL**：本地 InfluxDB 的地址（例如 `http://192.168.1.100:8086`）
- **API令牌**：您的InfluxDB API令牌（读取权限即可）
- **组织 ID**：您的 InfluxDB 组织
- **存储桶**：Enpal 写入数据的存储桶（通常为 `enpal` 或类似名称）
- **更新间隔**：数据刷新间隔，单位为秒（默认值：`60`）
- **墙盒控制**（可选）：启用此功能可创建 `wallbox_control` 状态，并允许通过 Enpal Box Web UI 设置充电模式/启动/停止（无需额外 URL，主机名取自 InfluxDB URL）。启用后，**墙盒帮助**选项卡将显示数据点、充电模式和连接器状态值的说明。
4. 保存并启动实例

### 如何查找您的 InfluxDB 凭据
1. 登录您的 Enpal 设备 Web 管理界面或通过 SSH 连接到该设备。
2. 打开 InfluxDB UI，地址为 `http://<enpal-box-ip>:8086`
3. 转到**数据 → API 令牌**并创建一个只读令牌
4. 记下“数据 → 存储桶”下的组织名称和存储桶信息。

## 隐私与数据处理
此适配器仅连接到您的**本地 InfluxDB**，不会将任何数据发送到任何云服务。
启用墙盒控制后，适配器还会连接到您的**本地 Enpal Box**（HTTP 和 WebSocket 与 InfluxDB 位于同一主机上）——仍然无法访问云。
您的 API 令牌以加密形式存储在 ioBroker 数据库中。
- 不连接任何外部服务器。

## 较早的更改
- [CHANGELOG_OLD.md](CHANGELOG_OLD.md)

## Changelog
<!--
	### **WORK IN PROGRESS**
-->

### 0.4.2 (2026-06-12)
- (skvarel) Fixed missing wallbox_help_readme translation in English and German admin UI
- (skvarel) Replaced plain timers in wallbox client with adapter-core setInterval, setTimeout and delay helpers
- (skvarel) Updated iobroker/types for js-controller 7.1 compatibility

### 0.4.1 (2026-06-10)
- (skvarel) Typed adapter and instance root namespaces as meta folders for a cleaner object tree

### 0.4.0 (2026-06-07)
- (skvarel) Added read-only wallbox state automaticChargeStatus (automatic charge on plug-in, from /deviceMessages)
- (skvarel) Fixed connectorStatus normalization for OCPP values (e.g. SuspendedEV instead of Suspendedev)
- (skvarel) Documented wallbox connector status values in README
- (skvarel) Added conditional wallbox help tab with data point and status documentation

### 0.3.0 (2026-06-07)
- (skvarel) Added optional wallbox control via Enpal Box web interface (Blazor SignalR)
- (skvarel) New config option: wallbox_enabled (checkbox); Enpal Box URL is derived automatically from InfluxDB URL
- (skvarel) New states under wallbox_control: start, stop, mode, currentMode, connectorStatus

### 0.2.2 (2026-06-05)
- (skvarel) Migrated project rules from GitHub Copilot to Cursor rules
- (skvarel) Updated @alcalzone/release-script to 5.2.1 to fix repository checker error E0036
- (skvarel) Updated @tsconfig/node22 to 22.0.5
- (skvarel) Fixed mixed indentation in admin/jsonConfig.json

## License
MIT License

Copyright (c) 2026 skvarel <skvarel@inventwo.com>

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