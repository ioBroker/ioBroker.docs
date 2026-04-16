---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.schlueter-thermostat/README.md
title: ioBroker.schlueter-thermostat
hash: yt/ET3sBQoIQkkRYrUVIAgXdMOlOAC4DpP1WNWv/cGk=
---
# IoBroker.schlueter-恒温器

![NPM 版本](https://img.shields.io/npm/v/iobroker.schlueter-thermostat.svg)
![下载](https://img.shields.io/npm/dm/iobroker.schlueter-thermostat.svg)
![安装数量](https://iobroker.live/badges/schlueter-thermostat-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/schlueter-thermostat-stable.svg)
![NPM](https://nodei.co/npm/iobroker.schlueter-thermostat.png?downloads=true)
![云架构](https://img.shields.io/badge/Architecture-Cloud%20API%20Bridge-blue?style=for-the-badge&logo=cloudflare)
![应用概念](https://img.shields.io/badge/Control-Apply%20Based-green?style=for-the-badge)
![模式支持](https://img.shields.io/badge/Modes-Schedule%20|%20Comfort%20|%20Manual%20|%20Boost%20|%20Eco%20|%20Frost%20Protection%20|%20Vacation-orange?style=for-the-badge)

**测试：** ![测试与发布](https://github.com/patricknitsch/ioBroker.schlueter-thermostat/workflows/Test%20and%20Release/badge.svg)

---

##
## 🌍 概览
<img align="left" src="admin/schlueter-thermostat.png" alt="图像" width="128" /><p>该适配器通过<strong>官方云 API</strong>将<strong>Schlüter / OJ Microline OWD5 恒温器</strong>集成到 ioBroker 中。

它基于 @robbinjanssen 的 HA 集成方案。更多信息请参阅文档。

> **仅限云端** — 无需本地网关、Modbus 或 LAN API。

##
## 🚀 如何开始
1. 在 ioBroker 中安装适配器
2. 打开实例配置
3. 输入：

| 设置 | 描述 |
| ----------------- | ----------------------------- |
| 用户名 | 您的 Schlüter/OJ 云登录信息 |
| 密码 | 云密码 |
| API密钥 | 以下方法在大多数情况下有效 |
| 客户 ID | 可在温控器信息中找到 |
| 客户端软件版本 | 来自温控器的数值 |
| 轮询间隔 | 默认值：60 秒 |

4. 保存并启动适配器

您可以尝试使用以下 API 密钥：`f219aab4-9ac0-4343-8422-b72203e2fac9`。

您可以在论坛中找到此密钥：`https://community.home-assistant.io/t/mwd5-wifi-thermostat-oj-electronics-microtemp/445601`，因此它看起来像是一个全局密钥。

##
## 文档
[🇺🇸 文档](./docs/en/README.md)

[🇩🇪 文献](./docs/de/README.md)

##
## 紧凑型架构概述
### 建筑徽章
### 紧凑的程序结构
```mermaid
flowchart LR
  UI[User / UI] --> IO[ioBroker States]
  IO --> ADP[Adapter]

  ADP -->|read| OWD5[OWD5 Cloud]
  ADP -->|write| OCD5[OCD5 Cloud]
  OCD5 --> TH[Thermostat]

  ADP --> OBJ[Object Tree]
  OBJ --> RO[Read States]
  OBJ --> AP[Apply Controls]
```

### 内部流程（迷你版）
```mermaid
flowchart TB
  READY[onReady] --> LOGIN[Cloud Login]
  LOGIN --> POLL[pollOnce]
  POLL --> UPSERT[Update Objects + States]
  UPSERT --> BACKOFF{All offline?}
  BACKOFF -- yes --> INC[Increase interval up to 1h then 12:00/00:00]
  BACKOFF -- no --> RESET[Reset to base interval]
  INC --> POLL
  RESET --> POLL

  APPLYBTN[Apply Button] --> ROUTER[applyRouter]
  ROUTER --> API[updateThermostat]
```

##
## 📌 备注
- 使用单个恒温器进行开发和测试
支持多设备环境，欢迎提供反馈意见。

##

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.5.2 (2026-03-20)

- (patricknitsch) Update Readme
- (patricknitsch) Fix Issues from RepoChecker

### 0.5.1 (2026-03-18)

- (copilot) Fix issue with configuration button in Tab

### 0.5.0 (2026-03-17)

- (copilot) Add `admin/tab.html` control panel with green theme, i18n (DE/EN), live status banner, quick modes, temperature control, vacation, schedule viewer and configuration button
- (copilot) Status banner now shows energy consumption for today (kWh)
- (copilot) Instance selector removed — instance is auto-detected from the `?instance=N` URL parameter passed by Admin 7

### 0.4.3 (2026-03-06)

- (patricknitsch) Fix adapter type in io-package.json

### 0.4.2 (2026-03-06)

- (claude) Fixed object hirarchy
- (patricknitsch) Update Readme

### 0.4.1 (2026-02-26)

- (patricknitsch) Update Packages and Workflow

### 0.4.0 (2026-02-11)

- (claude) Fallback if Devices or Cloud offline

### 0.3.2 (2026-01-31)

- (patricknitsch) Update from git to https

### 0.3.1 (2026-01-31)

- (patricknitsch) Add Mode Frost Protection
- (patricknitsch) Show Enum instead of Regulation Number

### 0.3.0 (2026-01-31)

- (patricknitsch) Update Readme
- (patricknitsch) Verify Polling if Thermostat give no Response
- (patricknitsch) Complete Refactoring to handle functions better
- (patricknitsch) encrypt all sensitive credentials -> Relogin necessary
- (patricknitsch) Code Fixing for latest repo

### 0.2.4 (2026-01-28)

- (patricknitsch) Change Format of Times

### 0.2.3 (2026-01-28)

- (patricknitsch) Catch wrong values for Temperature and Regulation Mode

### 0.2.2 (2026-01-28)

- (patricknitsch) Update setStates for ComfortMode
- (patricknitsch) More Debugging

### 0.2.1 (2026-01-28)

- (patricknitsch) Fix JsonConfig

### 0.2.0 (2026-01-28)

- (patricknitsch) add automatic Refresh of Token after Error 403
- (patricknitsch) fix max Value of Regulation Mode to 9 for error preventing
- (patricknitsch) improve Handling of Mode Settings

### 0.1.1 (2026-01-28)

- (patricknitsch) updated Readme

### 0.1.0 (2026-01-28)

- (patricknitsch) initial release
- (patricknitsch) fetch data and write in Datapoints
- (patricknitsch) functional version with Energy and settable functions

##

## License

MIT License

Copyright (c) 2026 patricknitsch <patricknitsch@web.de>

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