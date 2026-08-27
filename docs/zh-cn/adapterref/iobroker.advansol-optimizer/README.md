---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.advansol-optimizer/README.md
title: ioBroker AdvanSol Optimizer 适配器
hash: o+V5YUEn2dXND5DQ2q7YTAaVTP3BQoSM+u3pszUUMS8=
---
# IoBroker AdvanSol Optimizer 适配器
ioBroker 适配器，用于通过 TCP 转 RS485 桥接器（例如 Waveshare ETH 转 RS485 适配器）连接的 AdvanSol DCON-WIFI / MRO/MR 优化器。

产品和制造商信息可在[AdvanSol Power 官方网站](https://www.advansol-power.com/)上找到。

该适配器基于原始的 ioBroker JavaScript 脚本 `Advinsol Optimierer2`，并将逻辑移至专用的 ioBroker 适配器命名空间。

![系统概述](../../../en/adapterref/iobroker.advansol-optimizer/docs/images/system-overview.svg)

＃＃ 特征
- 连接到 TCP RS485 网桥。
- 读取控制器序列号。
- 自动发现已连接的优化器模块。
- 轮询模块的值是循环进行的。
- 通过 `module_X.switch` 切换每个优化器 MOS。
- 在可配置的夜间时间段内跳过轮询。
- 显示连接状态和夜间模式状态。

## 典型设置
1. ioBroker 在本地网络中运行。
2. TCP-RS485 网桥可通过 LAN 或 Wi-Fi 连接。
3. 桥接器的 RS485 端连接到 AdvanSol 控制器。
4. 控制器与优化器模块通信。

推荐的桥接配置：

- 模式：TCP 服务器
- 端口：与适配器中配置的端口相同，默认值为 `502`
- 串行设置：匹配 AdvanSol 控制器和 RS485 总线
RS485 A/B 连接正确
RS485总线上只能有一个活动主控端。

## 适配器设置
![适配器设置](../../../en/adapterref/iobroker.advansol-optimizer/docs/images/adapter-settings.svg)

| 设置 | 含义 | 默认值 |
| --- | --- | --- |
| `Host` | TCP-RS485网桥的IP地址或主机名 | 空 |
| `Polling interval` | 轮询周期之间的时间间隔（毫秒） | `10000` |
| `Request timeout` | 最长等待响应时间 | `5000` |
| `Switch retries` | 重复的MOS开关命令次数 | `3` |
| `Switch retry delay` | 切换尝试之间的延迟 | `4100` |
| `Night mode starts` | 跳过轮询的小时 | `22` |
| `Night mode ends` | 投票恢复时间 | `5` |
| `夜间模式结束` | 投票恢复时间 | `5` |

夜间窗口避免了优化器在夜间或光伏侧无电压时出现不必要的错误。

## 州
![对象树](../../../en/adapterref/iobroker.advansol-optimizer/docs/images/object-tree.svg)

一般状态：

| 状态 | 含义 |
| --- | --- |
| `info.connection` | 连接到 TCP-RS485 网桥 |
| `controller.sn` | 控制器序列号 |
| `module_count` | 已发现的优化器数量 |
| `last_poll` | 上次成功轮询周期的时间 |
| `night_mode` | 检测到适配器处于夜间模式 |
| `night_mode` | 适配器检测到夜间模式 |

每个优化器都会获得一个名为 `module_1`、`module_2`、`module_3` 等的通道。

| 状态 | 含义 | 单位 |
| --- | --- | --- |
| `module_X.sn` | 优化器序列号 | |
| `module_X.mos` | MOS 状态，`0` 关闭，`1` 开启 | |
| `module_X.software` | 软件版本 | |
| `module_X.hardware` | 硬件版本 | |
| `module_X.output_voltage` | 输出电压 | V |
| `module_X.output_current` | 输出电流 | A |
| `module_X.input_voltage` | 输入电压 | V |
| `module_X.input_current` | 输入电流 | A |
| `module_X.power` | 功率 | 瓦 |
| `module_X.energy` | 总能量 | 千瓦时 |
| `module_X.temperature` | 温度 | °C |
| `module_X.raw` | 原始响应（十六进制字符串） | |
| `module_X.last_update` | 上次模块更新 | |
| `module_X.last_update` | 上次模块更新 | |

## 切换优化器
状态 `module_X.switch` 可写。将其设置为 `true` 会发送模块序列号对应的 MOS 开启命令。将其设置为 `false` 会发送 MOS 关闭命令。

适配器会根据 `Switch retries` 重复执行命令，并在每次尝试之间等待 `Switch retry delay`。这是有意为之，因为 TCP-RS485 转换器和优化器模块可能不会立即响应每个命令。

## 故障排除
- 无连接：检查桥接器的 IP 地址、端口和 TCP 服务器模式。
- `TCP 连接超时`：网桥不可达或端口错误。
- 未发现模块：检查 RS485 A/B、控制器电源和光伏侧电源。
- 白天没有响应：检查 RS485 参数和接线。
- 夜间无响应：如果优化器在没有光伏电压的情况下进入睡眠状态，这通常是正常现象。请调整夜间工作窗口。
- 切换不起作用：必须知道序列号，模块必须响应，必要时增加“切换重试次数”。
- 总线上多个系统：确保只有一个活动主系统在发送帧。

## Changelog


### **WORK IN PROGRESS**
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.1.12

- Fixed all findings from the ioBroker latest-repository review.
- Added the official AdvanSol manufacturer link and removed direct-install instructions.
- Changed object names to English and improved state roles and units.
- Validated all configurable timing values and changed polling to sequential timeouts.
- Completed all required admin and adapter-description translations.

### 0.1.11

- Published the adapter with npm provenance.
- Completed repository checker cleanup.

### 0.1.8

- Configured npm token based release publishing for the automated deploy workflow.

### 0.1.7

- Kept the standard ioBroker test workflow focused on package and integration tests.

### 0.1.6

- Switched CI to the standard ioBroker testing actions.
- Added standard package and integration tests for the repository checker.
- Added ioBroker development tooling and release configuration.
- Enabled jsonConfig i18n files.

### 0.1.5

- Fixed remaining adapter checker findings for repository metadata, workflow configuration and admin configuration.

### 0.1.4

- Published through the automated GitHub Actions release workflow with npm provenance.

### 0.1.3

- Added GitHub Actions release workflow with npm provenance publishing.
- Added responsive admin configuration metadata.
- Added repository metadata required by the ioBroker adapter checker.
- Updated README content for English-only publication checks.

### 0.1.2

- Updated package metadata for ioBroker adapter checker compatibility.
- Added repository, testing, license information, tier and extended translations.

### 0.1.1

- Added adapter icon and localized admin configuration labels.

### 0.1.0

- Initial adapter version based on the existing ioBroker JavaScript optimizer script.

Older entries can be moved to [CHANGELOG_OLD.md](CHANGELOG_OLD.md) when the changelog grows.

## License

Copyright (c) 2026 TheBam

MIT License. See [LICENSE](LICENSE) for details.