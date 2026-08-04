---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.tesla-wallconnector3.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.tesla-wallconnector3.svg
BADGE-Number of Installations (latest): http://iobroker.live/badges/tesla-wallconnector3-installed.svg
BADGE-Number of Installations (stable): http://iobroker.live/badges/tesla-wallconnector3-stable.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/nobl/ioBroker.tesla-wallconnector3/badge.svg
BADGE-NPM: https://nodei.co/npm/iobroker.tesla-wallconnector3.png?downloads=true
BADGE-WERO: https://img.shields.io/badge/WERO-8A2BE2
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-00457C?logo=paypal&logoColor=white
BADGE-Buy Me a Coffee: https://img.shields.io/badge/Buy%20Me%20a%20Coffee-FFDD00?logo=buymeacoffee&logoColor=black
BADGE-GitHub Sponsor: https://img.shields.io/badge/Sponsor-GitHub-181717?logo=github&logoColor=white
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tesla-wallconnector3/README.md
title: <img src="/admin/tesla-wallconnector3.png" width="36" align="top" alt="">ioBroker.tesla-wallconnector3
hash: vYcX+OXlSII1B7kz7vqyAwzQQS7f728sTOBFoBkZGMk=
---
#<img src="/admin/tesla-wallconnector3.png" width="36" align="top" alt=""> ioBroker.tesla-wallconnector3
## 适用于 ioBroker 的特斯拉第三代壁挂式充电器适配器
从本地网络上的特斯拉第三代壁挂式充电器读取实时数据。所有数据点均为只读（壁挂式充电器 API 不支持写入访问）。

＃＃ 配置
＃＃＃ 设置
![主要设置](../../../de/adapterref/iobroker.tesla-wallconnector3/media/mainSettings.png "主要设置")

| 字段 | 描述 |
|:-----|:-------------|
| 特斯拉第三代壁挂式充电器 | 壁挂盒的 IP 地址或主机名（例如，`192.168.1.50` 或 `wallbox.local`）。仅输入地址本身，无需输入协议（`http://`）、端口、路径、凭据或方括号内的 IPv6 地址。空字段或 `0.0.0.0` 将被视为未配置，并阻止查询。 |
| 轮询间隔 | 适配器从墙盒读取数据的频率，以秒为单位。默认值：10。范围：1 - 3600。 |
| 请求超时 | 等待墙盒响应的最长时间，以毫秒为单位。默认值：5000。范围：1000 - 10000。 |
| 重试次数 | 请求失败后尝试的次数。该值表示首次请求失败后的重试次数。0 = 不重试，999 = 无限重试。默认值：10。 |
| 轮询重复因子 | 增加重复轮询的间隔时间。第 n 次尝试将在间隔 x 因子 x n 秒后进行。默认值示例：第一次重复轮询间隔 20 秒，第二次重复轮询间隔 40 秒。成功检索后重置。默认值：2。范围：1 - 10。 |
| 分相功率计算 | 适用于北美分相安装。使用 grid_v x vehicle_current_a 代替逐相电压 x 电流之和。默认值：禁用（三相计算）。 |

保存后，适配器重新启动并立即开始查询。

## 数据点
所有数据点均为只读。适配器会查询 Wallbox API，并为每个返回值创建一个数据点。

### 信息
| 数据点 | 类型 | 描述 |
|:-----------|:---:|:-------------|
| info.connection | 布尔值 | `true` 如果适配器可以连接到墙盒并收到有效响应。 |

### 生命体征
实时运营数据，按每次查询间隔更新。

| 数据点 | 类型 | 描述 |
|:-----------|:---:|:-------------|
| evse_state | 编号 | 充电状态（见下表） |
| vehicle_connected | 布尔值 | 车辆是否已连接 |
| vehicle_current_a | 数字 | 车辆消耗的电流 (A) |
| session_energy_wh | 数字 | 当前会话提供的能量 (Wh) |
| power_w | number | 充电功率 (W)，由适配器计算。三相模式：每相电压 (V) × 电流 (A) 之和。分相模式：电网电压 (grid_v) × 车辆电流 (vehicle_current_a)。 |
| session_s | number | 当前加载会话的持续时间（秒） |
| contactor_closed | 布尔值 | 充电继电器是否闭合 |
| grid_v | 数值 | 电网电压 (V) |
| grid_hz | 数字 | 市电频率 (Hz) |
| voltageA_v, voltageB_v, voltageC_v | 数量 | 每相电压 (V) |
| currentA_a, currentB_a, currentC_a, currentN_a | 数量 | 每相电流 (A) |
| pcba_temp_c、mcu_temp_c、handle_temp_c | 数字 | 温度值（摄氏度） |
| relay_coil_v | 编号 | 继电器线圈电压 (V) |
| relay_k1_v | 编号 | 继电器 K1 电压 (V) |
| relay_k2_v | 编号 | 继电器 K2 电压 (V) |
| prox_v | 编号 | 接近感应导通电压 (V) |
| pilot_high_v | 编号 | 控制导引头高电压 (V) |
| pilot_low_v | 编号 | 控制导引头低电压 (V) |
| input_thermopile_uv | 数字 | 热电堆传感器值 |
| 配置状态 | 数字 | 配置状态 |
| uptime_s | number | Wallbox 运行时间（秒） |
| current_alerts | string (JSON) | 以 JSON 数组形式存储的活动警报（例如，`"[]"`）。出于兼容性考虑，保留数值子数据点（`.0`、`.1` 等），并在数组大小减小时自动清理。 |
| evse_not_ready_reasons | 字符串（JSON）| 未准备就绪的原因，以 JSON 数组形式表示。子数据点与 current_alerts 中的相同。 |

**电动汽车充电桩州代码：**

| 代码 | 含义 |
|:----:|:----------|
| 0 | Wallbox 启动 |
| 1 | 空闲 |
| 2 | 车辆已连接，但尚未准备好充电 |
| 4 | 车辆已连接并准备充电 |
| 6 | 车辆已连接，握手正在进行中 |
| 8 | 加载完成或中断 |
| 9 | 准备充电，等待车辆 |
| 10 | 以较低功率充电（< 3 相，每相 16 安培） |
| 11 | 全功率充电（3 相，每相 16 安培） |

*状态 3、5、7 和 12 未记录。如果您知道它们的含义，欢迎提交 pull request！*

＃＃＃ 寿命
墙盒使用寿命的累计统计数据。最多每 60 秒查询一次。

| 数据点 | 类型 | 描述 |
|:-----------|:---:|:-------------|
| energy_wh | number | 总能量输出（瓦时） |
| 充电开始次数 | 数量 | 充电开始次数 |
| chargering_time_s | 数字 | 总充电时间（秒） |
| uptime_s | 数量 | 总运行时间（秒） |
| 接触器循环次数 | 数量 | 继电器切换循环次数 |
| connector_cycles | number | 插入/移除循环次数 |
| alert_count | 数字 | 警报总数 |

＃＃＃ 版本
固件和硬件识别。此信息会在启动时、重新连接后以及最多每小时查询一次。

| 数据点 | 类型 | 描述 |
|:-----------|:---:|:-------------|
| firmware_version | 字符串 | 固件版本 |
| serial_number | 字符串 | 序列号 |
| 零件编号 | 字符串 | 零件编号 |

根据固件版本，可能会出现其他数据点，例如 `git_branch`、`web_service` 和 IEEE 1547 CRC 校验和。

### Wifi状态
Wi-Fi 连接数据。最多每 60 秒查询一次。

| 数据点 | 类型 | 描述 |
|:-----------|:---:|:-------------|
| wifi_connected | 布尔值 | 墙盒是否已连接到 Wi-Fi 网络 |
| internet | 布尔值 | 墙盒是否接入互联网？ |
| wifi_ssid | 字符串 | 已连接的 SSID |
| wifi_infra_ip | 字符串 | WLAN 中的 IP 地址 |
| wifi_mac | 字符串 | MAC 地址 |
| wifi_signal_strength | 数字 | 信号强度（无单位质量值，数值越高越好） |
| wifi_rssi | 数字 | RSSI 值 (dBm) |
| wifi_snr | 数值 | 信噪比 (dB) |

*适配器会动态创建 API 返回的所有值的数据点。根据固件版本，您的墙盒可能还会提供此处未列出的其他数据点。*

## 查询行为
适配器会将请求分散到一段时间内，以避免墙盒的嵌入式 Web 服务器过载：

| 端点 | 频率 |
|:---------|:-----------|
| 关键指标 | 在每个查询间隔 |
| 生命周期 | 最多每 60 秒 |
| wifi_status | 最多每 60 秒更新一次 |
| 版本 | 启动时、重新连接后以及最多每小时一次 |

请求按顺序发送。如果某个端点发生故障，其他端点仍会正常处理。故障端点会在下一个计划周期再次查询。

适配器会在解析响应之前自动修复已知的特斯拉固件 JSON 错误（裸露的 `nan` 值、缺少右括号）。

## 免责声明
**所有产品和公司名称或标识均为其各自所有者的商标™或注册商标®。使用这些名称或标识并不意味着与上述所有者或其子公司存在任何关联或得到其认可！此个人项目系利用业余时间维护，不以任何商业目的为目的。**

**默认设置应能确保正常运行。**轮询间隔过短可能会导致墙式充电器的内置网络服务器过载。如果墙式充电器停止响应，请增加轮询间隔或停止适配器。

**不提供任何担保和责任。** 此适配器为业余项目，遵循 MIT 许可证。它通过本地未公开的 API 读取特斯拉壁挂式充电器的数据。作者对使用此适配器造成的任何后果不承担任何责任，也无法保证使用此适配器是否会影响您与特斯拉或安装商之间的保修或支持协议。如果您无法接受此条款，请勿使用此适配器。

## Changelog
<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- Added North American split-phase power calculation mode (splitPhase setting)
- Added Tesla firmware JSON defect recovery (bare nan, Infinity, -Infinity, missing closing brace)
- Added host validation: rejects URLs, paths, credentials, and ports; empty or 0.0.0.0 treated as unconfigured
- Added 2 MiB response size limit
- Fixed state type stability: null values no longer cause type oscillation, including after adapter restart
- Fixed stale array state cleanup: current_alerts and evse_not_ready_reasons publish canonical JSON and clean up obsolete child states
- Fixed complete data refresh after connection loss: all endpoints polled immediately on reconnect
- Fixed retry off-by-one: configured retries value now means actual retry attempts after initial failure
- Fixed unload race condition: prevented post-unload state changes when poll requests are in flight
- Fixed numeric string coercion: Infinity and NaN values no longer silently converted to numbers
- Fixed timeout configuration help text to show correct maximum (10000 ms)
- Corrected wifi signal strength/RSSI metadata
- Separated persistence errors from communication errors: database write failures no longer trigger connection retry
- Reduced API load: version polled hourly, lifetime and wifi_status every 60s, sequential requests
- Enabled TypeScript type checking in CI
- Expanded and corrected documentation

### 1.2.0 (2026-07-20)
- (copilot) Adapter requires node.js >= 22 now
- Added IEEE 1547 CRC state attributes
- Fixed adapter checker warnings (jsonConfig, pollingTimeout)
- Replaced plain setTimeout with adapter-managed timers
- Added calculated charging power state (vitals.power_w)
- Added specific ioBroker roles for all states
- Simplified state attribute definitions
- Fixed startup recovery: adapter now retries if wallbox is unreachable at start
- Capped retry delay at 1 hour
- Fixed state attribute typos and placeholder names
- Updated documentation

### 1.1.0 (2026-03-30)
- (iobroker-bot) Adapter requires node.js >= 20 now.
- Added state attributes (and moved notifications to debug from info)
- Code optimization
- Migration to i18n

### 1.0.6 (NoBl)
* Maintenance update (dependencies, ...)

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2024-2026 Norbert Bluemle <github@bluemle.org>

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