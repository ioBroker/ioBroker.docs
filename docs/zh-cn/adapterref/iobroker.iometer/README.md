---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.iometer/README.md
title: ioBroker.iometer
hash: p3Nt/eRD2ZcdAFyTk8gQ/xQuWEXEQA187wvgSLUamYs=
---
![NPM 版本](https://img.shields.io/npm/v/iobroker.iometer.svg)
![下载](https://img.shields.io/npm/dm/iobroker.iometer.svg)
![安装数量](https://iobroker.live/badges/iometer-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/iometer-stable.svg)
![NPM](https://nodei.co/npm/iobroker.iometer.png?downloads=true)

<img src="admin/iometer.png" width="128" alt="IOmeter 标志" />

# IoBroker.iometer
**测试：** ![测试与发布](https://github.com/torben-iometer/ioBroker.iometer/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 iometer 适配器
此适配器需要 Node.js 22.x 或更高版本！

将 ioBroker 连接到 [IOmeter](https://www.iometer.de) 智能计量设备，并通过服务器发送事件 (SSE) 提供实时电量读数。设备上报数据后，电表读数和设备状态会立即实时更新。

＃＃ 安装
通过 ioBroker 管理后台安装此适配器：

1. 打开适配器列表并搜索 **IOmeter**
2. 点击**安装**
3. 创建 IOmeter 适配器的实例
4. 输入您的 IOmeter 设备的 IP 地址并保存
5. 与设备的连接自动建立，数据存储在相应的通道中。

＃＃ 配置
### IOmeter IP 地址
您的 IOmeter 设备的本地 IP 地址（例如 `192.168.1.100`）。您可以在 IOmeter 应用的设备信息中找到此地址。

适配器通过 SSE 连接到 `http://<ip>/v1/reading` 和 `http://<ip>/v1/status`。如果连接断开，两个流都会自动重新连接。

## 州
适配器会在接收到第一个事件时动态创建状态对象。设备报告的仪表编号用作通道前缀，以便在多个实例对应不同仪表时进行区分。

州 ID 遵循以下格式：

```
iometer.<instance>.<channel>-<meterNumber>.<state>
```

- `<instance>` — ioBroker 适配器实例索引（通常为 `0`）
- `<channel>` — 可以是 `reading`（电表数据）、`device`（硬件状态）或 `info`（连接状态）
- `<meterNumber>` — 设备报告的电表序列号（例如 `1ISK04051904`）
- `<state>` — 单个数据点（见下文）

### 阅读频道 (`reading-<meterNumber>`)
从 `/v1/reading` SSE 流（事件类型 `readingEvent`）填充。

| 状态 | 类型 | 单位 | 角色 | 描述 |
|---|---|---|---|---|
| `power` | 数值 | 瓦 | `value.power.active` | 当前总有功功率。如有 OBIS 总值，则使用该值；对于单相电表，则回退到第一相。 |
| `power_phase2` | 数量 | W | `value.power.active` | L2 相有功功率 |
| `power_phase3` | 数量 | W | `value.power.active` | L3 相有功功率 |
| `energy_imported` | 数量 | 千瓦时 | `value.energy.consumed` | 总进口能源 |
| `energy_exported` | 数量 | 千瓦时 | `value.energy.produced` | 总输出能量 |
| `energy_imported_t1` | 数量 | 千瓦时 | `value.energy.consumed` | 进口能源 — 电价 1 |
| `energy_imported_t2` | 数量 | 千瓦时 | `value.energy.consumed` | 进口能源 — 电价 2 |
| `energy_imported_t2` | 数字 | 千瓦时 | `value.energy.consumed` | 进口能源 — 电价 2 |

### 设备通道 (`device-<meterNumber>`)
从 `/v1/status` SSE 流（事件类型 `statusEvent`）填充。

| 状态 | 类型 | 单位 | 角色 | 描述 |
|---|---|---|---|---|
| `id` | 字符串 | — | `info.serial` | 唯一设备 ID |
| `bridge_rssi` | 数值 | dBm | `value` | 桥接模块的 WiFi 信号强度 |
| `bridge_firmware` | 字符串 | — | `info.firmware` | 桥接模块固件版本 |
| `core_rssi` | 数值 | dBm | `value` | 芯线与桥接线之间的射频信号强度 |
| `core_firmware` | 字符串 | — | `info.firmware` | 核心模块固件版本 |
| `battery_level` | 数量 | % | `value.battery` | 核心模块电池电量 |
| `power_status` | 字符串 | — | `info.status` | 电源状态（例如 `wired`、`battery`） |
| `attachment_status` | 字符串 | — | `info.status` | 核心模块的附件状态 |
| `attachment_status` | 字符串 | — | `info.status` | 核心模块的附件状态 |

### 连接状态
| 状态 | 描述 |
|---|---|
| `info.connection` | `true` 当读取流接收到数据时，`false` 否则 |

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.0.6 (2026-08-20)
- (torben-iometer) Fixed the adapter crashing on startup with `ERR_PACKAGE_PATH_NOT_EXPORTED` on installations where an older `@iobroker/adapter-core` version got hoisted into node_modules.

### 0.0.5 (2026-08-19)
- (torben-iometer) Sanitized meter numbers before using them in object IDs to prevent invalid states when the device reports characters that are not allowed in ioBroker IDs.
- (torben-iometer) Tightened the IP address validator in the adapter settings to reject invalid octets (e.g. `999.999.999.999`).
- (torben-iometer) Improved error logging for the reading/status streams to show the actual error message instead of an unhelpful JSON dump.
- (torben-iometer) Added missing translations for the adapter description.
- (torben-iometer) Removed the unused visualization widget stub.

### 0.0.4 (2026-08-10)
- (torben-iometer) Changed the state role for `bridge_rssi` and `core_rssi` from the non-existent `value.rssi` to the generic `value` role.

### 0.0.3 (2026-08-07)
- (torben-iometer) Fixed the release workflow (removed the broken Sentry release step, corrected the repository URL format) and the outdated Node.js version requirement in the README.

### 0.0.2 (2026-08-07)
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 torben-iometer <torben@iometer.de>

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