---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.danfoss-ally/README.md
title: 无标题
hash: hVcdlLVwHoiSco0XdVcLcghYreoDPRMJlT6VJXj++xQ=
---
![版本](https://img.shields.io/badge/version-0.2.15-blue)
![NPM](https://nodei.co/npm/iobroker.danfoss-ally.svg)

适用于 **丹佛斯 Ally™** 的云适配器 — 使用 **OAuth2（客户端凭证）**。

读取 Ally 帐户中所有设备的温度、湿度、阀门位置和电池数据，并且 **允许进行单次定向写入**，无需强制模式更改或链式操作。

---

＃＃ 特征
- 直接连接到**丹佛斯 Ally Cloud API**
- 自动刷新 OAuth2 令牌
- 发现所有已注册的设备
- 读取所有可用的传感器和控制数据（温度、湿度、电池、阀门位置等）
- 将丹佛斯原始数值（×0.1）转换为实际单位（**°C**，**%**）
- 全自动轮询，轮询间隔可配置
- 支持从 ioBroker 向云端发送单个独立的写入命令

---

## 亮点
- **单次写入** — 每个状态都是独立发送的（无自动模式切换）
- **平滑同步逻辑**
- 反种族歧视（5分）：在本地写作后立即跳过一次投票
- 保持窗口（1分钟）：防止最近的本地值被覆盖
- 延迟抑制（15 秒）：忽略暂时过时的云数据
- 软刷新（约 1.5 秒）：每次写入后仅重新获取受影响的状态
- **静默日志记录** — 信息级别用于正常操作，调试级别用于诊断
- **自动缩放** — 温度/湿度自动转换为摄氏度/百分比

> **注意：** Danfoss Ally 应用程序的云更新可能会在 ioBroker 中出现短暂延迟（1-2 分钟）。

---

支持的设备
- 丹佛斯 Icon2 RT（房间温控器）
- 丹佛斯 Icon2 控制器
- 丹佛斯 Ally™ 网关

（自动发现其他丹佛斯设备）

---

＃＃ 配置
前往**实例 → danfoss-ally → 设置**

| 字段 | 描述 |
| -------------------- | ------------------------------------------------------------------- |
| **API密钥/密钥** | 您的丹佛斯开发者应用程序凭据 |
| **令牌 URL** | OAuth2 令牌端点（例如 `https://api.danfoss.com/oauth2/token`） |
| **范围** | 可选的 OAuth2 范围（例如 `read write`） |
| **轮询间隔** | 默认值 `300s` |
| **轮询间隔** | 默认值：300秒 |

较短的更新间隔可以加快更新速度，但会增加 API 流量。30-60 秒是一个比较合适的平衡点。

```bash
API Key:      your-client-id
API Secret:   your-client-secret
Token URL:    https://api.danfoss.com/oauth2/token
API Base URL: https://api.danfoss.com/ally
Polling:      300
```

---

## 州
每个发现的设备都会创建一个设备树：`danfoss-ally.0.<device_id>.*`

## 状态与控制状态
适配器将**只读状态值**与**可写控制值**分开。

### 状态通道
`danfoss-ally.0.<deviceId>.status.*`

这些状态反映了从丹佛斯云 API 接收的值。

特性：

- 读取：真
- 写入：false

**请勿**从脚本中写入这些状态。

例如：

- `status.temp_current`
- `status.temp_set`
- `status.mode`
- `status.humidity_value`
- `status.battery_percentage`

### 控制通道
`danfoss-ally.0.<deviceId>.control.*`

这些状态旨在供**用户交互**使用，可以通过脚本或 Blockly 编写。

特性：

- 读取：真
- 写入：true

例如：

- `control.temp_set`
- `control.manual_mode_fast`
- `control.mode`
- `control.child_lock`

适配器会自动向丹佛斯云发送命令并更新相应的状态值。

### 阅读示例
| 状态 | 描述 | 单位 |
| -------------------------------------- | --------------------------------------------- | ---- |
| `status.temp_current` | 当前温度 | °C |
| `status.battery_percentage` | 电池电量 | % |
| `status.mode` | 当前模式（`auto`, `manual`, `at_home`, …） | – |
| `status.work_state`, `status.output_status`, `status.fault` | 状态或错误 | – |
| `status.upper_temp` / `status.lower_temp` | 温度限制 | °C |
| `status.upper_temp` / `status.lower_temp` | 温度限制 | °C |

> 所有数值均自动按 ×0.1 → °C/% 进行缩放。

---

## 编写（单条命令）
该适配器支持对每个可控状态进行**精确的单次写入**，无需链式调用或自动模式切换。

这使您可以在 Blockly、JavaScript 或自定义逻辑脚本中完全控制这些状态。

| 可写状态 | 预期值/行为 |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `control.temp_set` | 目标温度（°C，0.5步；发送10次） |
| `control.at_home_setting`, `control.leaving_home_setting`, `control.pause_setting`, `control.holiday_setting` | 预设温度 |
| `control.mode` | `manual`, `at_home`, `leaving_home`, `pause`, `holiday`, `auto` |
| `control.child_lock` | `true` / `false` |
| `control.SetpointChangeSource` | `Externally` 或 `schedule` |
| `control.SetpointChangeSource` | `外部` 或 `计划` |

> 适配器在写入设定点时**不会**自动切换模式——您需要在逻辑中决定。

---

## 示例（Blockly / 脚本）
```js
// Manual mode
setState("danfoss-ally.0.<id>.control.mode", "manual");
setState("danfoss-ally.0.<id>.control.temp_set", 21.5);

// At home
setState("danfoss-ally.0.<id>.control.mode", "at_home");
setState("danfoss-ally.0.<id>.control.at_home_setting", 21.0);

// Leaving home
setState("danfoss-ally.0.<id>.control.mode", "leaving_home");
setState("danfoss-ally.0.<id>.control.leaving_home_setting", 19.0);

// Pause
setState("danfoss-ally.0.<id>.control.mode", "pause");
setState("danfoss-ally.0.<id>.control.pause_setting", 5.0);

// Holiday
setState("danfoss-ally.0.<id>.control.mode", "holiday");
setState("danfoss-ally.0.<id>.control.holiday_setting", 10.0);

// Child lock
setState("danfoss-ally.0.<id>.control.child_lock", true);

// Explicit source (usually not needed)
setState("danfoss-ally.0.<id>.control.SetpointChangeSource", "Externally"); // or 'schedule'
```

写入命令必须针对 `control.*` 状态。

`status.*` 状态是丹佛斯云的只读镜像。

---

## 同步逻辑
| 机制 | 持续时间 | 目的 |
| ---------------- | -------- | --------------------------------------- |
| **反种族歧视** | 5秒 | 本地投票后跳过一次投票 |
| **保持** | 1分钟 | 防止云端覆盖本地写入 |
| **延迟抑制** | 15秒 | 忽略过时的云数据 |
| **软刷新** | 约 1.5 秒 | 仅重新获取受影响的状态 |

> 这些机制确保 ioBroker 和丹佛斯云之间平稳同步，不会出现闪烁或值循环。

---

## 日志记录
该适配器提供详细的**调试级别**信息用于诊断，但在正常运行期间保持静默。

- `ack=true` 更新仅在**调试**模式下显示
- `HOLD`、`MATCH`、`SUPPRESS` → 调试级别、无害的诊断信息
- API 错误（`HTTP 400/401`）会自动重试（已记录在调试日志中）
- 每次投票后提供清晰的信息级摘要：

**民意调查结果示例**

```
✅ Updated 13 devices. Changed=2, Skipped=253, Held=1
📡 Found devices, updating states...
⏸️ Skipping poll (anti-race 5000ms)
```

## 示例日志输出
```
🔄 Starting Danfoss Ally adapter...
🔑 Refreshing OAuth2 token...
✅ Token acquired. Expires in ~3599 s
📡 Found 13 devices, updating states...
✅ Updated 13 devices from Danfoss Ally Cloud.
⏱ Polling interval set to 300 s
```

## 令牌处理
- 使用 **OAuth2 客户端凭据流程**
- 启动时自动请求令牌，并在过期前刷新
- 如果出现“401 未授权”错误：刷新并重试一次
- 令牌保存在**内存中**，从不存储
- 支持可选的 `scope` / `audience`
- 所有令牌事件均在调试日志中可见

---

## API 端点
该适配器与丹佛斯 Ally Cloud API 通信（基本 URL 可配置）。

| 方法 | 终点 | 目的 |
| ------ | ------------------------ | --------------------------- |
| `POST` | `/oauth2/token` | 请求访问令牌 |
| `GET` | `/devices/{id}/status` | 读取设备遥测数据 |
| `GET` | `/devices/{id}` | 状态缺失时的备用状态 |
| `POST` | `/devices/{id}/commands` | 发送单次写入命令 |
| `POST` | `/devices/{id}/commands` | 发送单个写入命令 |

**标头：** `Authorization: Bearer <token>` `Content-Type: application/json` 可选： `X-App-Key`, `X-Tenant-Id` 等。

错误处理：

- **400:** 无效的标头/值 → 已记录
- **401：** 令牌刷新 + 重试
- **5xx:** 重试下一次轮询
- 温度值自动缩放 10 倍（例如 21.5 → 215）

---

## 民意调查
- 默认值：**300秒**（可配置）
- 更新仅更改了值
- 包括以上所有反竞争/保持/延迟/软刷新逻辑。
- 每次投票后的信息摘要显示已更改、已跳过和已保留的州

---

## 写入
每个状态只能执行一条命令（不支持模式链式调用）
- 模式和温度必须分开填写。
- 数值被限制在允许的范围内，并缩放 10 倍
- `child_lock`：尝试 `0/1` 次，在 400 错误时重试 `true/false`
- `SetpointChangeSource`：可选；手动模式激活时默认为 `"Externally"`

所有发送、重试和确认日志均以调试级别显示。

---

＃＃ 发展
```bash
npm i
node main.js
```

或者通过ioBroker开发工具进行安装。

---

## Changelog


### 0.2.15
- Fixed invalid `io-package.json` (JSON syntax error)
- No functional changes

### 0.2.14
- Introduced `control` channel for writable states
- `status` channel is now strictly read-only
- Improved write detection and state handling
- Prevented writes to channels or non-state objects
- Improved adapter stability

### 0.2.13
- Updated CI & deploy workflow
- Fixed npm publishing process
- Improved code formatting (Prettier / ESLint)
- No functional changes for end users


---

## License

MIT License

Copyright (c) 2025-2026 Author Stefan8485@me.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.