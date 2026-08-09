---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.goodwe/README.md
title: ioBroker.goodwe
hash: /Po4GEOVH/rzHvbBKetrxMElMBoTB6lSL7FxVMei9nY=
---
![标识](../../../en/adapterref/iobroker.goodwe/admin/goodwe.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.goodwe.svg)
![下载](https://img.shields.io/npm/dm/iobroker.goodwe.svg)
![安装数量](https://iobroker.live/badges/goodwe-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/goodwe-stable.svg)
![NPM](https://nodei.co/npm/iobroker.goodwe.png?downloads=true)

# IoBroker.goodwe
**测试：** ![测试与发布](https://github.com/typhosj/ioBroker.goodwe/workflows/Test%20and%20Release/badge.svg)

## Goodwe ioBroker 适配器
与固德威逆变器ET/EH/BH/BT系列通信

制造商：[好我们](https://www.goodwe.com/)

该适配器基于 Thomas Schönberger 的原创作品。

＃＃ 要求
* Node.js 22 或更高版本
* js-controller 6.0.11 或更高版本
* 管理员版本 7.8.23 或更高版本

## 支持的数据
该适配器读取 GoodWe EMS Modbus 协议 v1.7 中 ET/EH/BH/BT 设备的寄存器块：

* 设备信息，包括可选的 SIMCCID
* 运行数据
* 外部通信和扩展计量数据
* 闪光信息
* BMS 信息和 BMS 详细信息
* CEI 汽车测试信息
* 功率限制信息

原始寄存器值以 ioBroker 状态的形式保存。模式值是带有 ioBroker 枚举标签的数值状态。重要的位域也以解码后的文本状态形式公开，例如活动逆变器错误、诊断状态、BMS 报警和 DRM 状态。

## 重要状态
| 州/地区 | 描述 |
| --- | --- |
| `DeviceInfo.*` | 逆变器协议、额定功率、序列号、设备类型和固件数据 |
| `RunningData.GridL1.*` ... `RunningData.GridL3.*` | 电网电压、电流、频率和功率 |
| `RunningData.BackUpL1.*` ... `RunningData.BackUpL3.*` | 备用输出电压、电流、频率、功率和模式 |
| `RunningData.Battery1.*` | 电池电压、电流、功率和模式 |
| `RunningData.*Energy*` | 每日和总能量计数器 |
| `RunningData.*Mode`, `RunningData.GridMode`, `RunningData.WorkMode`, `RunningData.OperationMode` | 带有 ioBroker 枚举标签的数字模式状态 |
| `RunningData.ErrorMessageActive` | 有源反相器错误位（文本形式） |
| `RunningData.DiagStatusActive` | 活动诊断位文本，由 `RunningData.DiagStatusL` 解码 |
| `RunningData.DiagStatusH` | 诊断状态的高位字，以原始数字形式保留，因为 GoodWe 协议没有为其定义任何位 |
| `ExtComData.*` | 智能电表和通信数据 |
| `BMSInfo.*` | BMS 状态、SOC、SOH、错误和警告数据 |
| `BMSInfo.ErrorCodeActive` | 解码后的 BMS 告警位域 |
| `BMSInfo.WarningCodeActive`, `BMSInfo.DRMStatusActive` | 启用扩展 BMS 轮询时解码的 BMS 警告和 DRM 位域 |
| `FlashInfo.*` | 如果逆变器启用并支持，则显示闪存版本和写入计数信息 |
| `BMSDetail.*` | 如果逆变器支持并启用，则显示详细的BMS值 |
| `CEIAutoTest.*` | 如果逆变器支持，则为 CEI 自动测试值 |
| `PowerLimit.*` | 如果逆变器启用并支持，则为功率限制和调度值 |
| `PowerLimit.*` | 如果逆变器启用并支持，则设置功率限制和调度值 |

＃＃ 配置
* `ipAddr`：逆变器的 IP 地址。

全新安装时为空。适配器会在启动时验证此地址是否为可用的 IPv4 主机地址。

* `discoverySubnet`：用于网络发现的可选 `/24` 子网，例如 `192.168.178.0/24`。
* `pollCycle`：基本轮询周期（秒）。
* `timeoutMs`：UDP 请求超时时间，以毫秒为单位，范围从 1000 到 30000。
* `retries`：每个 UDP 请求的重试次数，从 0 到 5。
* `pollExtended`：可选寄存器组的主开关。
* `pollSimccid`：启用可选的 SIMCCID 轮询。
* `pollExtendedMeter`：启用扩展计量寄存器。
* `pollFlashInfo`：启用闪存信息寄存器。
* `pollBmsExtended`：启用扩展的 BMS 信息寄存器。
* `pollBmsDetail`：如果逆变器支持，则启用 BMS 详细信息寄存器。
* `pollCeiAutoTest`：启用 CEI 自动测试寄存器。
* `pollPowerLimit`：如果逆变器支持，则启用功率限制寄存器。

基本设置页面还提供发现助手：

* `逆变器 IP`：仅存储逆变器 IPv4 地址。
* `验证逆变器 IP`：检查配置的地址，并将 GoodWe ID 请求发送到 UDP 端口 8899。
* `发现逆变器`：扫描已配置的 `/24` 子网，查找 UDP 端口 8899 上的 GoodWe 设备，并显示找到的逆变器及其 IP 地址、型号名称、序列号和版本信息（如果逆变器提供）。

## 故障排除
可选寄存器组取决于逆变器型号、固件和连接的硬件。如果某个寄存器组不受支持，适配器会在超时退避后跳过该寄存器组，并保持主连接在线。

已知的模型相关组：

* `pollBmsDetail`：除非 BMS 公开详细信息寄存器，否则通常不受支持。
* `pollPowerLimit`：在不公开功率限制遥测的设备上通常不受支持。
* `pollCeiAutoTest`：可以提供支持 CEI 自动测试数据的设备/固件的值。

如果日志显示可选寄存器超时，请在高级设置中禁用相应的组。适配器启动时会移除已禁用的可选寄存器状态。

对于不稳定的网络连接，请先增加`timeoutMs`的值。仅当逆变器偶尔丢包时才增加`retries`的值，因为重试也会延长一个轮询周期。

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 1.1.1 (2026-07-16)
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.
- Migrated the admin configuration page to a React based UI and removed the legacy Materialize UI files.
- Added translations for the admin configuration page and documented numeric setting limits.
- Avoided rebuilding the admin bundle during GitHub installs.
- Excluded `CHANGELOG_OLD.md` from the npm package.

### 1.1.0 (2026-06-24)
* Migrated the adapter runtime to TypeScript
* Raised the minimum Node.js version to 22
* Switched the packaged adapter entry point to the compiled `build/main.js`
* Updated CI to run on Node.js 22 and 24 and verify the npm package contents
* Replaced additional mode `*Text` states with enum labels on the numeric mode states

### 1.0.9 (2026-06-23)
* Added validation for usable IPv4 inverter addresses
* Added GoodWe UDP reachability check from the admin configuration
* Added `/24` network discovery for GoodWe inverters via UDP port 8899
* Added discovered inverter selection in the IP address field with model and serial information

### 1.0.8 (2026-06-23)
* Added separate basic and advanced configuration tabs
* Added per-group optional register polling defaults based on real device feedback
* Removed legacy misspelled states and added startup cleanup for them
* Cleaned up legacy hard-coded decoder code in favor of the register map
* Finalized selected state units and roles
* Expanded README with state overview and troubleshooting

### 1.0.7 (2026-06-23)
* Hardened UDP communication with async request handling, timeout and retry support
* Added specification based register map and extended GoodWe register groups
* Added decoded status and bitfield states for inverter, BMS, DRM and diagnostics
* Added adapter options for request timeout, retries and per-group extended register polling
* Added optional cleanup for disabled extended register states
* Added register-map and status-decoding tests

### 1.0.6 (2025-04-02)
* (ty) updated dependencies
* (ty) extended logging

### 1.0.5 (2025-03-14)
* (ty) Fixed EnergyDayDischarge
* (mrx8) fixed memory leak

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2023 Thomas Schönberger <SchoenbergerThomas@freenet.de>  
Copyright (c) 2025-2026 typhosj <typhosj@gmx.de>

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