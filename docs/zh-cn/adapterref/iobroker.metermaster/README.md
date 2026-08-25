---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.metermaster/README.md
title: ioBroker MeterMaster 适配器
hash: NEDjPcvQ2UIQKo6i8RNszFoHSPh/t3BeY1DzGEMi5wY=
---
# IoBroker MeterMaster 适配器

![版本](https://img.shields.io/badge/version-0.9.4-blue.svg)
![执照](https://img.shields.io/badge/license-MIT-green.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D22-brightgreen.svg)

[![MeterMaster 横幅](https://github.com/MPunktBPunkt/ioBroker.metermaster/raw/main/github-banner.svg)](https://github.com/MPunktBPunkt/ioBroker.metermaster)

从 **[MeterMaster 安卓应用（https://play.google.com/store/apps/details?id=com.propertymanagement.metermaster）将电表数据存储为 ioBroker 数据点，并管理 **ESP32 显示节点**，用于在 OLED 显示屏上显示电表数值。源代码：[GitHub]](https://github.com/MPunktBPunkt/MeterMaster) 接收电表读数。

---

＃＃ 特征
- **HTTP接收器** – 直接从应用程序接收读数
- **自动数据点** – 状态在首次同步时自动创建
- **正确的时间戳** – 状态“ts”反映的是实际读取日期
- **历史记录** – 每个仪表都保存一个完整的 `readings.history` 数组。
- **基本身份验证** – 可选的用户名/密码保护
- **Web UI** – 内置浏览器查看器，包含 5 个选项卡（数据、节点、导入、日志、系统）
- **图表和 CSV** – 历史图表、月度用量以及按米导出的 CSV 文件
- **DE/EN** – Web 用户界面中的语言切换
- **导入** – 通过 Web 用户界面导入应用程序备份（方案 2.0）。
- **ESP32 节点管理** – 查看和配置已注册的显示节点
- **远程控制** – 通过 Web 用户界面控制 ESP32 节点的仪表选择和 LED 指示灯。

---

## 屏幕截图
内置的 Web 用户界面提供五个选项卡——概述：

| | |
|---|---|
| **数据** – 包含能耗 KPI、历史记录、图表和 CSV 文件的计量卡 | ![数据选项卡](../../../en/adapterref/iobroker.metermaster/docs/screenshots/webui-daten.png) |
| **节点** – ESP32 状态、IP、固件 | ![节点选项卡](../../../en/adapterref/iobroker.metermaster/docs/screenshots/webui-nodes.png) |
| **导入** – 通过拖放操作进行应用备份 | ![导入选项卡](../../../en/adapterref/iobroker.metermaster/docs/screenshots/webui-import.png) |
| **日志** – 实时日志，带筛选和导出功能 | ![日志选项卡](../../../en/adapterref/iobroker.metermaster/docs/screenshots/webui-logs.png) |
| **系统** – 统计信息和版本检查 | ![系统选项卡](../../../en/adapterref/iobroker.metermaster/docs/screenshots/webui-system.png) |
| **系统** – 统计信息和版本检查 | ![系统选项卡](../../../en/adapterref/iobroker.metermaster/docs/screenshots/webui-system.png) |

---

＃＃ 安装
从官方 ioBroker 适配器列表中安装适配器：

1. 打开 **ioBroker 管理后台** → **适配器**
2. 搜索 **MeterMaster**
3. 点击**安装**并创建实例

在 ioBroker 主机的命令行中：

```bash
iobroker add metermaster
iobroker start metermaster
```

如有需要，请打开防火墙：`sudo ufw allow 8089/tcp`

更多详情：[安装说明.md](INSTALLATION.md)

---

## 实例配置
安装完成后 → ioBroker 管理后台 → **适配器 → MeterMaster** → 创建实例：

| 设置 | 默认值 | 说明 |
|---|---|---|
| HTTP 端口 | `8089` | 适配器监听的端口 |
| 用户名 | `metermaster` | 基本身份验证用户名 |
| 密码 | – | 基本身份验证密码 |
| 日志缓冲区 | `500` | 最大存储日志条目数 |
| 保留历史记录 | `0` | 0 = 无限制 |
| 保留历史记录 | `0` | 0 = 无限制 |

---

## MeterMaster 安卓应用
捕获计量数据并与ioBroker同步：

| | |
|---|---|
| **Google Play** | [**MeterMaster**](https://play.google.com/store/apps/details?id=com.propertymanagement.metermaster) – 安装应用，读取仪表数据，并发送至适配器 |
| **GitHub** | [**MPunktBPunkt/MeterMaster**](https://github.com/MPunktBPunkt/MeterMaster) – 源代码、APK 构建和文档 |

[![在 Google Play 上获取](https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png)](https://play.google.com/store/apps/details?id=com.propertymanagement.metermaster)

---

## 配置 MeterMaster 应用
**设置 → ioBroker → MeterMaster 适配器：**

| 字段 | 值 |
|---|---|
| 启用 ioBroker | 开启 |
| IP 地址/主机名 | ioBroker 服务器的 IP 地址 |
| 适配器端口 | `8089` |
| 用户名 | 如适配器中配置的那样 |
| 密码 | 根据适配器中的配置 |

“测试连接”应返回`MeterMaster adapter reachable ✓`。

---

## Web UI
无需密码即可访问：

```
http://{ioBroker-IP}:8089/
```

| 标签页 | 内容 |
|---|---|
| **数据** | 所有已接收的电表数据按房屋/公寓分组，包含历史记录、图表模式和 CSV 导出功能 |
| **节点** | 已注册的 ESP32 节点：状态、IP 连接、固件、仪表下拉菜单、LED 控制 |
| **导入** | 通过拖放操作备份应用程序（JSON schema 2.0） |
| **日志** | 实时日志，带筛选、自动滚动和导出功能 |
| **系统** | 统计信息和版本检查 |

屏幕截图：见上文[屏幕截图](#screenshots)。

---

## ESP32 显示节点
该适配器支持 [MeterMaster ESP32 节点](https://github.com/MPunktBPunkt/esp32.MeterMaster) 作为 OLED 显示器伴侣。

＃＃＃ 流动
1. ESP32 每 60 秒发送一次心跳包：`POST :8089/api/register`
2. 适配器自动创建 `metermaster.0.nodes.{MAC}.*` 状态
3. ESP32 每 15 秒轮询一次：`GET :8089/api/nodes/{MAC}/config`
4. 适配器返回配置和可选的立即命令 (cmd)

### 节点选项卡
- 在线/离线徽章（心跳 < 120 秒时显示为绿色）
- 将 IP 地址作为可点击链接 → 打开 ESP32 Web 用户界面
- 计量器下拉菜单：分配计量器 → ESP32 在下次轮询时获取它
- LED按钮：开/关 → 通过cmd状态立即执行命令

---

## 创建的数据点
```
metermaster.0.
├── info.connection        bool    Adapter connected
├── info.lastSync          number  Timestamp of last sync (ms)
├── info.readingsReceived  number  Total readings received
│
├── {House}/{Apartment}/{Meter}/
│   ├── readings.latest      number  Latest value (ts = reading date)
│   ├── readings.latestDate  string  ISO-8601 date
│   ├── readings.history     string  JSON array of all readings
│   ├── name                 string
│   ├── unit                 string
│   └── typeName             string
│
└── nodes/{MAC}/
    ├── ip          string  ESP32 IP address
    ├── name        string  Device name
    ├── version     string  Firmware version
    ├── lastSeen    number  Timestamp of last heartbeat (ms)
    ├── config      string  JSON config (adapter writes, ESP32 reads)
    ├── configAck   string  Acknowledgement by ESP32
    └── cmd         string  Immediate command (adapter writes, ESP32 reads+clears)
```

---

## HTTP API
### 未经身份验证
| 方法 | 路径 | 描述 |
|---|---|---|
| 获取 | `/` | Web 用户界面 |
| 获取 | `/api/stats` | 统计信息（读取次数、运行时间、节点数） |
| 获取 | `/api/data` | 所有缓存的读取数据 |
| GET | `/api/logs` | 日志缓冲区（带 `?level=&category=&text=` 过滤器） |
| 获取 | `/api/nodes` | 所有已注册的 ESP32 节点 |
| 获取 | `/api/discover` | 已知电表状态 ID |
| POST | `/api/register` | ESP32 心跳检测（无需认证） |
| POST | `/api/register` | ESP32 心跳（无需身份验证） |

### 使用基本身份验证
| 方法 | 路径 | 描述 |
|---|---|---|
| GET | `/api/ping` | 连接测试 |
| POST | `/api/readings` | 存储批量读数 |
| POST | `/api/import` | 导入应用备份 |
| 获取 | `/api/nodes/{MAC}/config` | 获取 ESP32 的配置 |
| POST | `/api/nodes/{MAC}/config` | 设置 ESP32 配置 |
| POST | `/api/nodes/{MAC}/configAck` | 接收配置确认 |
| POST | `/api/nodes/{MAC}/cmd` | 发送立即命令（LED、仪表） |
| POST | `/api/nodes/{MAC}/cmd` | 发送即时命令（LED、仪表） |

### 示例：单次阅读
```
POST http://host:8089/api/reading
Authorization: Basic base64(user:password)
Content-Type: application/json

{
  "house":       "MyHouse",
  "apartment":   "West",
  "meter":       "HotWater",
  "value":       128.75,
  "unit":        "m³",
  "typeName":    "HotWater",
  "readingDate": "2024-02-12T09:30:00.000Z"
}
```

### 示例：立即向 ESP32 发送命令
```
POST http://host:8089/api/nodes/C8C9A3CB7B08/cmd
Authorization: Basic base64(user:password)
Content-Type: application/json

{ "ledOn": true }
```

---

＃＃ 更新
### 通过 Web 用户界面
`http://IP:8089/` → **系统**选项卡 → “检查更新”（显示可用性；通过下面的 CLI 安装）

### 命令行
```bash
iobroker upgrade metermaster
iobroker restart metermaster.0
```

---

## Changelog

### 0.9.4
- All adapter log messages and API JSON error responses in English
- State common names and roles corrected (readings channel, date/text/json roles, info.firmware for nodes)
- Web UI i18n: full DE/EN coverage, English default HTML
- Config validation: clamped port (1024–65535), logBufferSize (50–5000), keepHistory (0–100000)
- Removed `/api/update` endpoint and one-click Web UI update (CLI commands card retained)
- `migrateStateRoles()` uses `getAdapterObjectsAsync` (own adapter states only)
- Removed dead `houseName` config; import default house is `MyHouse`
- Fixed redundant state check in stateChange handler
- `@types/node` pinned to `^22.0.0`

### 0.9.3
- Fix state roles for ioBroker object structure check (repochecker E1008/E1009/E1011)
- Migration of existing objects on adapter start

### 0.9.2
- Adapter checker compliance: npm news cleanup, devDependencies, trusted publishing
- npm publish via GitHub Actions with provenance

### 0.9.1
- Lowered admin dependency to >=7.6.20 (fixes startup when admin 7.7.x is installed)

### 0.9.0
- Finalized for ioBroker repository: CI/CD testing, adapter checker compliance
- English README, updated dependencies (Node.js >= 22, adapter-core 3.4.x)
- Admin config i18n, encrypted password storage
- Requires js-controller >= 6.0.11 and admin >= 7.6.20

### 0.8.3
- Chart: linear time axis, yearly consumption projection toggle, README screenshots

### 0.8.2
- Bugfix: chart modal close button and range filters

### 0.8.1
- Bugfix: literal newline in CSV export JS broke Web UI

### 0.8.0
- Charts per meter, consumption KPI, CSV export, DE/EN language switch

See [io-package.json](io-package.json) `common.news` for full history. Older entries: [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

---

## License

Copyright (c) 2026 MPunktBPunkt

MIT License – see [LICENSE](LICENSE) for the full license text.