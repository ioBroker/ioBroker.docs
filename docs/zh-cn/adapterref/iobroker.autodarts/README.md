---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.autodarts/README.md
title: 无标题
hash: RWoaggK0UrH75aAvOtIv8j7fdEFI9RfEQPr3VKfKwxc=
---
![标识](../../../en/adapterref/iobroker.autodarts/admin/autodarts.svg)

![安装数量](https://iobroker.live/badges/autodarts-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/autodarts-stable.svg)
![NPM 版本](https://nodei.co/npm/iobroker.autodarts.svg?style=shields&data=v,u,d&color=orange)
![下载](https://img.shields.io/npm/dm/iobroker.autodarts.svg)
![PayPal捐赠](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)

## Autodarts 集成适配器
## 此适配器的功能
连接到本地 Autodarts 棋盘管理器（通过 IP 和端口，例如 `192.168.x.x:3180`），并公开 ioBroker 状态以进行家庭自动化：

比赛开始时打开灯
- 在靶心上播放声音
- 通过文本转语音（TTS）播报下一次投掷动作
- 控制板硬件（照明、电源）
- 根据 Dart 事件触发任何其他 ioBroker 自动化流程

## 文档
- 🇺🇸 [文档](./docs/en/README.md)
- 🇩🇪 [文档](./docs/de/README.md)

＃＃ 特征
### 比赛状态与失误
- **`visit.score`**: 上次完整访问的总得分（3 镖）
- **`throw.current`**: 最后一次投掷飞镖的数值得分
- **`trigger.isTriple`**: 布尔标志，用于指示在可配置的段范围内是否出现三次命中（默认值：1-20）
- **`trigger.isDouble`**: 仅用于检测双重命中的布尔标志（所有段）
- **`trigger.isBullseye`**：仅当击中靶心时才触发的布尔标志
- **`trigger.isMiss`**: 布尔标志，当飞镖未击中任何有效得分区段时为真（完全脱靶，不得分）

### 董事会状态
- **`status.boardStatus`**: 板事件的状态指示器（例如 `"Stopped"`、`"Calibration finished"`、`"Started"`）。
- **`status.trafficLightColor`**: 当前板状态的十六进制颜色
- **`status.trafficLightState`**: 状态指示器
- `green` = 玩家可以投掷
- `黄色` = 移除飞镖
- `red` = 板卡离线/错误

### 系统信息
- **`system.software.*`**: Autodarts 版本（boardVersion、desktopVersion）、操作系统和平台详情
- **`system.hardware.*`**: CPU 型号、内核架构、主机名
- **`system.cams.cam0/1/2`**: 摄像头配置（宽度、高度、帧率），JSON 格式

### 硬件控制
- **`system.hardware.light`**: 控制板照明（双向，带外部状态）
- **`system.hardware.power`**: 控制板电源（双向，带外部状态）

### 运行时配置
- **`config.tripleMinScore/tripleMaxScore`**: 在运行时调整三重触发阈值
- **`config.triggerResetSec`**: 三连击/双连击/正中靶心/未命中标志的自动重置时间

### 工具插件集成
- **`tools.RAW`**: 用于接收来自浏览器工具的事件的输入状态（例如 busted、gameon、gameshot、180、matchshot、takeout）。
- **`trigger.is180/isBusted/isGameon/isGameshot/isMatchshot/isTakeout`**: 当通过 `tools.RAW` 接收到相应事件时设置的只读触发标志。
- **`tools.config.url*`**: 可复制到 Tools for Autodarts 浏览器扩展中的预生成的 HTTP URL（简单 API 调用）。

## 此适配器不具备的功能
- ❌ 不会向互联网或第三方服务器发送任何数据
- ❌ 不会存储或共享任何历史记录、统计数据或个人数据。
- ❌ 无法通过互联网访问其他人的看板或远程看板
- ❌ 不提供云功能或分析

所有数据都保留在您的 ioBroker 系统本地。

＃＃ 配置
![配置截图](../../../en/adapterref/iobroker.autodarts/docs/config-screenshot.png)

### 适配器设置分为四个选项卡：**选项**、**映射**、**工具插件集成**和**帮助和常见问题解答**。
### 选项卡：选项
在**选项**中，您可以配置适配器如何连接到本地 Autodarts 棋盘管理器以及轮询数据的频率：

- **董事会管理 IP**

您的自动飞镖棋盘管理器的 IP 地址（例如 `192.168.178.50` 或 `127.0.0.1`）。

- **港口**

板级管理器的 TCP 端口（通常为 `3180`）。

- **三连发范围**

两个下拉菜单用于定义 `trigger.isTriple` 应考虑的**最小**和**最大**字段编号（1-20）。

超出此范围的三元组将不会触发此标志。

- **触发复位(秒)**

重置三连、双连、正中靶心和脱靶标志所需的时间（秒）。

`0` 表示不自动重置。

- **轮询间隔（秒）**

适配器向板管理器轮询新数据的频率（例如 `0.5`、`1`、`2` 秒）。

### 标签：映射
在 **MAPPINGS** 中，您可以将现有的 ioBroker 状态链接到硬件相关的适配器状态：

- **轻型目标识别**

与 `system.hardware.light` 同步的 ioBroker 状态 ID（例如 `0_userdata.0.Autodarts.LIGHT` 或智能灯/LED 环的状态）。

- **电源目标 ID**

与 `system.hardware.power` 同步的 ioBroker 状态 ID（例如 `0_userdata.0.Autodarts.POWER` 或智能插头的状态）。

配置完成后，两侧（适配器状态或外部状态）的更改将双向同步，因此您既可以从 ioBroker 控制板，也可以对板载事件做出反应。

### 选项卡：工具插件集成
- 配置 IP、端口和实例，以便适配器可以生成指向您的 ioBroker simple-api 端点的 HTTP URL。

​

- Busted、Game On 和 Gameshot 的最终 URL 以状态的形式暴露在 autodarts.X.tools.config.urlBusted/urlGameon/urlGameshot 下，可以复制到 Autodarts 浏览器扩展的 Tools 中。

### 标签页：帮助与常见问题解答
在**帮助和常见问题解答**中，您可以找到有关适配器及其配置的一般信息和帮助。

## 隐私与数据处理
- 此适配器仅从您自己网络中的**本地** Autodarts Board Manager 读取数据。
- 不会将任何个人数据发送到外部服务器或存储在云端。
所有数据都保留在您自己的系统中；不会收集或共享任何统计数据或投掷历史记录。
- 此适配器仅设计用于您自己的飞镖靶，不适用于远程或其他人的飞镖靶。

## 较早的更改
- [CHANGELOG_OLD.md](CHANGELOG_OLD.md)

## Changelog
<!--
	### **WORK IN PROGRESS**
-->
### 1.0.7 (2026-03-01)
- (skvarel) CI/CD: Updated GitHub Copilot instructions template to version 0.5.7 with latest ioBroker best practices (fixes #21, #25)

### 1.0.6 (2026-02-28)
- (skvarel) TESTING: Fixed test cleanup issues - added settled flag to httpHelper for proper Promise handling and --exit flag to test script to prevent hanging tests

### 1.0.5 (2026-02-28)
- (skvarel) FIXED: Updated outdated dependencies - release-script packages to v5.1.x and admin globalDependency to v7.6.20 (fixes #23)

### 1.0.4 (2026-01-24)
- (skvarel) FIXED: Reverted to setState() from deprecated setStateAsync()

### 1.0.3 (2026-01-21)
- (copilot) FIXED: Use setStateAsync() instead of setState() for trigger resets in throw.js to ensure database reliability
- (copilot) ENHANCED: Corrected API endpoints in copilot-instructions.md - now documents /api/state, /api/config, /api/host, /api/version correctly
- (copilot) TESTING: Added comprehensive unit tests for core modules (throw, visit, config, trafficLight, httpHelper)

## License
MIT License

Copyright (c) 2026 skvarel <sk@inventwo.com>

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