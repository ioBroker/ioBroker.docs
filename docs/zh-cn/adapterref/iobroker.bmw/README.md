---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.bmw/README.md
title: ioBroker.bmw
hash: V8qwDl0EcYEzL4sB9SgTqXwY3zqZrH4548JUHozkRqo=
---
![NPM 版本](https://img.shields.io/npm/v/iobroker.bmw.svg)
![下载](https://img.shields.io/npm/dm/iobroker.bmw.svg)
![节点-lts](https://img.shields.io/node/v-lts/iobroker.bmw?style=flat-square)
![Libraries.io 最新版本的依赖状态](https://img.shields.io/librariesio/release/npm/iobroker.bmw?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/TA2k/iobroker.bmw?style=flat-square)
![GitHub 仓库大小](https://img.shields.io/github/repo-size/TA2k/iobroker.bmw?logo=github&style=flat-square)
![GitHub提交活动](https://img.shields.io/github/commit-activity/m/TA2k/iobroker.bmw?logo=github&style=flat-square)
![GitHub 最新提交](https://img.shields.io/github/last-commit/TA2k/iobroker.bmw?logo=github&style=flat-square)
![GitHub 问题](https://img.shields.io/github/issues/TA2k/iobroker.bmw?logo=github&style=flat-square)
![GitHub 工作流状态](https://img.shields.io/github/actions/workflow/status/TA2k/iobroker.bmw/test-and-release.yml?branch=master&logo=github&style=flat-square)
![SNYK 已知漏洞](https://snyk.io/test/github/TA2k/ioBroker.bmw/badge.svg)
![Beta](https://img.shields.io/npm/v/iobroker.bmw.svg?color=red&label=beta)
![稳定的](https://iobroker.live/badges/bmw-stable.svg)
![已安装](https://iobroker.live/badges/bmw-installed.svg)
![NPM](https://nodei.co/npm/iobroker.bmw.png?downloads=true)

<img src="admin/bmw.png" alt="标识" width="200">

# IoBroker.bmw
## 版本
# 适用于 ioBroker 的 BMW 适配器
此适配器利用全新的 BMW CarData API，通过 OAuth2 身份验证和实时 MQTT 流传输，将 BMW 车辆集成到 ioBroker 中。它可为您的 BMW 账户关联的所有 BMW 车型提供全面的车辆数据监控。

## 充电时更新数据
充电时，由于车辆处于休眠/待机状态，电池电量可能不会通过数据流更新。启动车辆后，数据才会更新。您可以通过 API `bmw.0.vin.remote.fetchViaAPI` 触发更新。

## 数据点描述
您可以在此处找到详细的数据点描述 [telematic.json](telematic.json)

## 安装说明
### 1. BMW ConnectedDrive门户设置
1. 访问 BMW ConnectedDrive 门户：**https://www.bmw.de/de-de/mybmw/vehicle-overview** 或 https://www.mini.de/de-de/mymini/vehicle-overview
2. 导航至**BMW CarData**部分（您会看到各种服务类别）

![BMW门户网站概览](../../../en/adapterref/iobroker.bmw/img/bmw-portal-overview.png)

3. 点击“创建 CarData 客户端”按钮
4. 复制 client_id
5. 等待30秒
6. 点击 CarData API
7. 等待 30 秒
8. 点击 CarData Streaming

![CarData客户端设置](../../../en/adapterref/iobroker.bmw/img/cardata-client-setup.png)

# **重要提示**：点击一项服务，如果看到错误信息，请等待 30 秒后再点击。不要点击“Gerät Authentifizieren/Devict authentication”。在 iobroker 设置中输入 client_id。如果仍然无效，请尝试全部使用小写字母。
### 2. CarData 流媒体配置
**您必须配置车辆数据流并选择全部 244 个数据点**

创建客户端 ID 后，配置流媒体播放：

1. 在“车辆数据”部分，查找“车辆数据流”。
2. 您应该看到配置状态为“就绪”。
3. 注意 **“Letztes Konfigurationsupdate”**（上次配置更新）时间戳

![车辆数据流设置](../../../en/adapterref/iobroker.bmw/img/cardata-streaming-setup.png)

4. 单击 **“Datanauswahl ändern”**（更改数据选择）按钮
5. **选择所有类别**（车辆状态、充电、行程数据等）
6. **手动检查全部 244 个数据点**
7. 或者在 Google 开发者控制台中按 F12 输入以下代码：`document.querySelectorAll('label.chakra-checkbox:not([data-checked])').forEach(l => l.click());`
8. 如果需要重置，请点击“Stream löschen”（删除流）保存配置，然后重新配置。

**如果不选择所有数据点，MQTT 流将无法提供完整数据！**

### 3. 适配器配置
1. 在适配器设置中输入您的**客户端 ID**
2. 输入您的**CarData Streaming 用户名**（可在 BMW 门户网站的 CarData > Streaming 部分找到）
3. 选择您的车辆品牌（宝马、Mini、丰田Supra）
4. 设置**更新间隔**（由于 API 配额限制，最小间隔为 10 分钟）
5. 如有需要，配置**车辆识别码忽略列表**

### 4. 身份验证过程
1. 启动适配器
2. 检查 OAuth2 授权 URL 的日志
3. 访问该网址并使用您的宝马账户登录
4. 授权申请
5. 授权后，适配器将自动继续运行。

## 数据结构
车辆数据按 `bmw.0.VIN.*` 进行组织，其中 `VIN` 代表您的车辆识别号码：

### 主文件夹结构
- **`bmw.0.VIN.api.*`** - API 数据（定期更新）
- 通过 BMW CarData REST API 从 .remote 获取数据。
- 使用 API 配额（24 小时内 50 次调用）

- **`bmw.0.VIN.stream.*`** - 流数据（实时 MQTT）
- 通过实时 MQTT 流或 remote.fetchViaAPI 接收数据
车辆数据变更时立即更新
- 包括所有 244 个已配置的数据点

### 可用 API 端点（可配置）
您可以在适配器设置中启用/禁用这些端点（BMW CarData API v1）：

- `bmw.0.VIN.api.basicData.*` - 车辆信息，包括车型、品牌和系列 ✅ **（默认：已启用）**
- `bmw.0.VIN.api.chargingHistory.*` - 充电会话和历史记录 ✅ **（默认：已启用）**
- `bmw.0.VIN.api.image.*` - 用于显示的车辆图像
- `bmw.0.VIN.api.locationBasedChargingSettings.*` - 特定位置的充电偏好和设置
- `bmw.0.VIN.api.smartMaintenanceTyreDiagnosis.*` - 智能维护系统轮胎状况和诊断

### 元数据
- `bmw.0.VIN.lastStreamViaAPIUpdate` - 上次数据更新的时间戳（API）
- `bmw.0.VIN.lastStreamUpdate` - 上次 MQTT 流更新的时间戳

## 实时更新
当出现以下情况时，适配器会通过 MQTT 流接收实时更新：

车辆未处于睡眠/待机状态
- 车辆状态变化（车门、车窗、车灯）
- 充电状态更新
- 驾驶过程中位置的变化
- 气候控制激活
- 服务通知

远程命令
**可用遥控器：**

BMW CarData API 为只读接口，因此此适配器不提供车辆控制功能。如需远程控制功能，请使用：

**宝马官方解决方案：**

- **MyBMW 移动应用程序** - 完整的远程控制功能
- **BMW ConnectedDrive门户** - 基于Web的车辆管理
- **BMW Alexa 技能** - 与亚马逊 Alexa 语音控制集成，可执行以下命令：
“Alexa，让宝马锁上我的车。”
“Alexa，让宝马启动空调系统。”
“Alexa，让宝马闪灯。”

**此适配器配备遥控器：**

- `fetchViaAPI` - 通过容器 API 获取最新的远程信息处理数据
- `basicData` - 刷新车辆基本信息（型号、品牌、系列）
- `chargingHistory` - 获取过去 30 天的充电记录
- `image` - 获取当前车辆图像
- `locationBasedChargingSettings` - 获取基于位置的充电偏好设置
- `smartMaintenanceTyreDiagnosis` - 获取轮胎诊断数据

注意：这些只是数据检索命令——BMW CarData API 不支持任何车辆控制命令。

## 故障排除
### 身份验证问题（400 错误请求）
如果您遇到身份验证错误：

1. 验证您的客户端 ID 是否已激活 CarData API
2. 确保已启用车辆数据流传输
3. 检查是否已选择全部 244 个数据点。
4. 请考虑重新生成您的客户端 ID

### 无 MQTT 数据
如果您没有收到实时更新：

1. 确认 CarData Streaming 已订阅并处于激活状态
2. 确保所有数据描述符（244 个点）均已选中
3. 检查您的车辆是否支持 CarData 流媒体传输
4. 描述符配置更改后，重启适配器

### API配额已超限
适配器会自动管理每天 50 次 API 调用的限制：

- **禁用适配器设置中不必要的 API 端点**，以减少配额使用量
如果频繁达到配额限制，请增加更新间隔。
- MQTT 流式传输不占用 API 配额，并提供实时数据。
每个已启用的 API 端点在每个更新间隔内使用一次配额调用

### API 文件夹中缺少数据
如果您在 `VIN.api.*` 中没有看到预期数据：

1. 检查适配器设置中是否启用了相应的端点
2. 确认您是否已超出 API 配额（检查适配器日志）
3. 部分端点可能不适用于所有车辆类型
4. 检查适配器日志中是否存在特定端点错误（404、403 等）

### 了解数据来源
- **`VIN.api.*`** - 根据设定的时间间隔和已启用的端点定期更新
- **`VIN.stream.*`** - 当车辆数据发生变化时，通过 MQTT 实时更新
- **`VIN.lastUpdate`** - 最近一次数据更新的时间戳（API 或 MQTT）
- **`VIN.lastStreamUpdate`** - 最近一次 MQTT 流更新的时间戳

＃＃ 来源
此适配器可在以下位置获取：[https://github.com/TA2k/ioBroker.bmw](https://github.com/TA2k/ioBroker.bmw)

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- (hombach) fix repo checker warnings
- (hombach) update dependencies

### 4.3.4 (2026-02-28)

- enhance docu and logging
- (hombach) fix vulnerability
- (hombach) update dependencies

### 4.3.3 (2026-01-02)

- (hombach) year 2026 changes
- (hombach) update dependencies

### 4.3.2 (2025-12-15)

- update telemetry ids for container creation
- optimize dependabot config (#209)

### 4.3.1 (2025-10-11)

- fix gps coordinate parsing

### 4.3.0 (2025-10-09)

- improve logs
- add autocast
- add descriptions

### 4.2.0 (2025-10-04)

- improve token refresh
- fix image fetching

### 4.1.1 (2025-10-03)

- Add API fetching via Container and move other apis to manually fetching

### 4.0.5 (2025-10-01)

- **BREAKING:** Complete migration to BMW CarData API with OAuth2 Device Flow authentication
- **BREAKING:** Removed username/password authentication (deprecated by BMW)
- **BREAKING:** Removed all remote control functionality (CarData API is read-only)
- **BREAKING:** Removed second user support and CAPTCHA requirements
- **NEW:** Real-time MQTT streaming for instant vehicle data updates
- **NEW:** OAuth2 Device Code Flow authentication with PKCE
- **NEW:** API quota management system (50 calls per 24 hours)
- **NEW:** Configurable API endpoint selection to manage quota usage
- **NEW:** Organized folder structure: api/ for periodic updates, stream/ for real-time data
- **NEW:** Enhanced state management with proper object creation
- **NEW:** Modern JSON-based configuration interface (jsonConfig.json)
- **NEW:** Comprehensive setup documentation with BMW portal integration
- **FIXED:** MQTT message processing logic for correct data validation
- **FIXED:** State creation issues preventing "no existing object" errors
- **IMPROVED:** Removed unused dependencies (cookie handling, legacy auth)
- **IMPROVED:** Enhanced error handling with specific guidance for common issues

### 3.0.1 (2025-09-27)

- (hombach) change to recommended stable admin 7.6.17 (#159)
- (hombach) migrate to iobroker/eslint-config (#146)
- (hombach) fix form-data vulnerability
- (hombach) code cleanups
- (hombach) update axios
- (hombach) bump adapter-core
- (hombach) fix issues detected by repository checker (#170)
- (hombach) bump dependencies

### 3.0.0 (2025-06-10)

- BREAKING: Dropped support for Node.js 18 (#88)
- (hombach) BREAKING: Dropped support for js-controller 5 (#111)
- (hombach) BREAKING: change to admin 7.4.10 as recommended by ioBroker (#111)
- (hombach) encrypt and protect second user password - has to be reentered (#111)
- (hombach) bump dependencies

### 2.9.5 (2025-05-18)

- (hombach) update axios
- (hombach) fixing issues detected by repository checker (#88)
- (hombach) some small code cleanups/modernisations
- (hombach) add/translate description
- (hombach) update logo

### 2.9.4 (2025-02-26)

- fix for Mitbenutzer Feature

### 2.9.3 (2025-01-29)

- fix remote controls
- add Mitbenutzer Login for remote controls

### 2.9.0 (2024-11-28)

- added new remotes as switch and updated values
- added retry logic for remotes

### 2.8.4 (2024-11-21)

- improved charging session parsing
- added remote to fetch charging session from a specific month
- added raw JSON of charging session for export

### 2.8.3 (2024-11-18)

- login fixed

### 2.8.2 (2024-10-05)

- fix error getvehicles v2 failed

### 2.8.1 (2024-09-30)

- fix remote commands

### 2.7.1

- Bugfixes

### 2.5.5

- Fix login

### 2.5.0

- Fix login

### 2.4.1

- Add support for MINI and force refresh remote

### 2.3.0

- Disable v1 Endpoints

### 2.1.1

- Upgrade to statusV2 and remoteV2

### 2.0.0

- (TA2k) initial release

## License

MIT License

Copyright (c) 2021-2026 TA2k <tombox2020@gmail.com>

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