---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.blustream-mfp/README.md
title: ioBroker.blustream-mfp
hash: GOE2l5vKMvW0cK2w1FaUos8IlQIlEMoNwepUG5JLe4M=
---
# IoBroker.blustream-mfp

![NPM 版本](https://img.shields.io/npm/v/iobroker.blustream-mfp.svg)
![下载](https://img.shields.io/npm/dm/iobroker.blustream-mfp.svg)
![安装数量](https://iobroker.live/badges/blustream-mfp-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/blustream-mfp-stable.svg)
![NPM](https://nodei.co/npm/iobroker.blustream-mfp.png?downloads=true)

**测试：** ![测试与发布](https://github.com/AlanSRU/ioBroker.blustream-mfp/workflows/Test%20and%20Release/badge.svg)

## 适用于 ioBroker 的 Blustream AV 切换器适配器
通过 RS232 串行或 IP/Telnet 连接控制 Blustream AMF/MFP/WMF 系列 AV 演示切换器。

### 支持的设备
| 型号 | 描述 | 连接方式 |
|-------|-------------|------------|
| **AMF42AU** | 4x2 高级多格式切换器 | IP（Telnet） |
| **MFP62** | 6x2 4K 多格式演示切换器 | IP（Telnet） |
| **MFP72** | 4x2 多格式演示切换器 | RS232 / IP |
| **MFP112** | 5x2 多格式演示切换器，支持 HDBaseT | IP (Telnet) |
| **WMF51** | 无线媒体播放器 | IP（Telnet） |
| **WMF72** | 无线媒体演示器，带双显示屏 | IP（Telnet） |
| **C66 / C88** | 6x6 / 8x8 承包商 HDBaseT 矩阵 | RS232 / IP |

**扩展功能（v0.5.3）——路由、输出启用、PoC 和预设：**

| 家庭 | 型号 | 类型 |
|--------|--------|------|
| 承包商 C (CSC) | C44-KIT、C44CS-KIT、C66CS、C88CS | HDBaseT 矩阵 |
| HMXL | HMXL42ARC、HMXL44CS、HMXL44ARC、HMXL66ARC、HMXL88ARC、HMXL88-V2 | HDBaseT矩阵|
| HMX 18G | HMX44-18G-KIT、HMX88-18G | HDBaseT 3.0 矩阵 |
| 铂金级（PLA）| PLA88CS、PLA88ARC-V2、PLA88L-V2 | HDBaseT 矩阵 |
| 专业版 / 定制专业版 | PRO48HBT70(CS)、PRO88HBT70CS、PRO88HDMI-V2、PRO16HBT70CS、CUSTOMPRO-HUB、CUSTOMPRO-HUB16 | HDBaseT 矩阵（最高 16x16 / 模块化） |
| CMX（HDMI）| CMX42CS、CMX44CS-V2、CMX44AB、CMX88CS、CMX88AB | HDMI矩阵 |
| MX（HDMI）| MX22AB-8K、MX44AB-V2 | HDMI矩阵 |
| SW切换器 | SW41HDBT、SW41AB-V2、SW41AB-8K、SW42DA、SW21AB-V2、SW21AB-V3 | HDMI/HDBaseT切换器 |
| 视频墙/多画面显示 | MX44VW、MX44AVW、MV41 | 模式/路由/边框/MV音频 + HDMI/VGA 输入选择 |
| USB / KVM | MX44KVM | USB 主机↔设备路由 + 预设 |

这些系列产品还新增了**EDID 管理**（所有矩阵）、**CEC 控制**（HMX-18G、SW41HDBT）和**音频**（HMX-18G 音频矩阵；Pro-Matrix 音频嵌入/静音）。CMX/MX 音频跟随视频输出（无单独控制）。**状态反馈（回读）**针对每个固定宽度系列进行解析，包括路由、输出使能、PoC、CEC、EDID、音频矩阵、网络、视频墙模式和 SW42DA Dante 主音频，并与实际设备捕获的数据进行比对。MX44KVM 有其自身的回复格式，其中主机路由、GPIO 模式和 USB 级联信息会被回读（但其网络表不会被回读）。唯一的例外是**MV41**，其状态标头没有列分隔符。目前尚不支持：**AMF41W**（使用独立的 Linux-CLI API）、**MFP31** 和 **SW12USB**（文档来源不明）。 MX44AVW 高级 PIP/旋转和 MV41 为暂定功能。参见 `MODEL-EXPANSION-PLAN.md`。

有关 Blustream 产品的更多信息，请访问 [蓝流](https://www.blustream.co.uk/)。

＃＃ 安装
从 ioBroker 管理界面安装适配器（适配器 → 搜索“blustream”）。

＃＃ 配置
### 连接设置
该适配器支持两种连接类型：

#### IP 连接（Telnet）
- **IP 地址**：您的 Blustream 设备的 IP 地址
- **端口**：TCP 端口（默认值：Telnet 为 23）
- **Telnet IAC 协商**：如果您的设备使用 Telnet 协议协商，请启用此选项

#### RS232 串口连接
- **串口**：串口设备的路径（例如，Linux 系统上的 `/dev/ttyUSB0`，Windows 系统上的 `COM3`）
- **波特率**：串行通信速度（MFP 系列通常为 57600）

### 设备型号
请从下拉菜单中选择您的 Blustream 设备型号。适配器将根据所选型号的功能自动配置可用状态和控件。

### 民意调查
- **轮询间隔**：查询设备状态更新的频率（以毫秒为单位，默认值：30000）
- **重连间隔**：连接断开后两次重连尝试之间的时间间隔（以毫秒为单位，默认值：10000）

## 状态和控制
适配器会根据所选设备型号动态创建状态。常见状态包括：

### 信息 (`info.*`)
- `info.connection` - 设备连接状态
- `info.model` - 设备型号标识符

### 命令 (`commands.*`)
- `commands.raw` - 向设备发送原始命令
- `commands.getStatus` - 请求当前设备状态

### 输出控制 (`output.*`)
- `output.X.source` - 选择输出 X 的输入源
- `output.X.enabled` - 启用/禁用输出 X
- `output.X.videoMute` - 将输出 X 上的视频静音

### 音频 (`audio.*`)
- `audio.volume` - 主音量级别
- `audio.mute` - 主静音

### 系统控制 (`system.*`)
- `system.power` - 电源开/关
- `system.beep` - 启用/禁用按钮提示音
- 而且还会根据设备型号的不同而有所差异……

### 网络设置 (`network.*`)
- `network.dhcp` - 启用/禁用 DHCP
- `network.ip` - 设备 IP 地址
- `network.gateway` - 网关地址
- `network.subnet` - 子网掩码

## 各型号功能
| 功能 | AMF42AU | MFP62 | MFP72 | MFP112 | WMF51 | WMF72 | C66 | C88 |
|---------|---------|-------|-------|--------|-------|-------|-----|-----|
| 网络控制 | 是 | 是 | - | 是 | 是 | 是 | 是 | 是 | 是 |
| RS232 控制 | - | - | 是 | - | - | - | 是 | 是 |
| 矩阵路由 | - | - | - | - | - | - | 是 | 是 |
| CEC 控制 | 是 | - | - | - | - | - | - | - |
| 麦克风 | 是 | 是 | - | - | - | - | - | - |
| 预设 | 是 | - | - | - | - | - | 是 | 是 |
| 图片控制 | 是 | - | - | - | - | - | - | - |
| WiFi 控制 | - | - | - | - | 是 | 是 | - | - |
| 多视图 | - | - | - | - | 是 | 是 | - | - |
| HDBaseT | - | - | - | 是 | - | - | 是 | 是 |
| PoC（每个输出） | - | - | - | - | - | - | 是 | 是 |

## 故障排除
### 连接问题
1. **IP 连接失败**：请检查 IP 地址和端口。确保没有防火墙阻止连接。如果您的设备不支持 Telnet IAC 协商，请尝试禁用它。

2. **RS232 连接失败**：检查串口路径和波特率。确保您有访问串口的权限（在 Linux 系统中，将您的用户添加到 `dialout` 组）。

3. **命令无法正常工作**：某些设备需要在命令之间留出短暂的延迟。适配器会通过命令队列自动处理这种情况。

### 调试模式
在ioBroker管理后台启用调试日志记录，即可查看与设备的详细通信信息：

1. 转到实例
2. 单击适配器实例
3. 将日志级别设置为“debug”

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 0.5.3 (2026-08-03)
* (Alan Paris) Added support for 39 further Blustream models, taking the total to 47: the HDBaseT matrices (C-series and C-CS, HMXL, HMX-18G, PLA/Platinum, Pro and Custom-Pro, up to 16x16), the HDMI matrices (CMX/MX), the SW-series HDMI and HDBaseT switchers, the video-wall and multi-view processors (MX44VW, MX44AVW, MV41) and the MX44KVM USB/KVM matrix
* (Alan Paris) Routing, output enable, PoC and preset recall now follow each model's own command form, so the differing firmware families (spaced `OUT 01 FR 04` versus `OUT01FR04`, the three PoC verbs, single-output switches without an output index) are each addressed correctly
* (Alan Paris) Added per-input EDID management on all matrices, CEC actions on the HMX-18G and SW41HDBT, the HMX-18G audio matrix, Pro-Matrix audio embedding, video-wall mode and bezel compensation, and USB routing on the MX44KVM
* (Alan Paris) Device status read-back is now parsed per model family from the fixed-width STATUS/INSTA/OUTSTA/CTRLSTA/AUDSTA tables, matching columns by header name so power, routing, output enable, PoC, CEC, EDID, audio, network and video-wall values are reflected in the states. Unrecognised tables are ignored rather than guessed at
* (Alan Paris) Added the device command references and the captured status replies used to build the parser under `protocols/`, plus unit tests that replay every capture
* (Alan Paris) Pre-release review fixes: EDID commands now use each model's own spacing (the CMX/MX matrices document only the unspaced form); command confirmations naming an output the model does not have no longer create a stray state; status replies whose divider is prefixed by the device prompt (MX44VW/MX44AVW) no longer stall the command queue or grow the captured-response buffer without limit; a status column reported as `N/A` now leaves its state untouched instead of writing "off"; and stopping the instance no longer schedules a reconnect after shutdown

### 0.5.2 (2026-08-03)
* (Alan Paris) Fixed the state tree keeping the previous model's controls after the device model was changed: the internal model-change check compared the model against a value the adapter had just overwritten, so the cleanup never ran. An MFP112 configured after the default MFP72, for example, was left without the HDBaseT input on `output.N.source`
* (Alan Paris) Existing instances repair themselves on first start after the update: a new `info.stateSchema` state records the layout version of the state tree, and the tree is rebuilt once when it is out of date. State values are repopulated by the next device poll. Note that the rebuild recreates the objects, so any per-state history/logging settings on the adapter's states have to be reapplied
* (Alan Paris) The WiFi password is no longer stored in clear text in `info.lastSent` or written to the debug log when it is set
* (Alan Paris) Device responses reporting an output number the configured model does not have (including an echo of the route-all command) no longer create a stray output state
* (Alan Paris) Corrected the documented state list and the per-model feature table in the README, and added the missing `system` parent object

### 0.5.1 (2026-07-16)
* (Alan Paris) Every state object now defines a default (`def`) value, so states have a defined initial value before the first device poll
* (Alan Paris) Admin config: all device-model descriptions and option labels are now translatable and provided in all 11 ioBroker languages

### 0.5.0 (2026-07-16)
* (Alan Paris) Added support for the Blustream C66 (6x6) and C88 (8x8) Contractor HDBaseT matrices: crosspoint routing across up to 8 outputs, route-all (`output.allSource`), per-output enable, per-output PoC, and 9 presets
* (Alan Paris) Added a dedicated parser for the C66/C88 fixed-width STATUS/OUTSTA tables and the `[SUCCESS]`/`[FAIL]` command confirmations, so routing, enable, PoC and network states reflect the device
* (Alan Paris) Scaler, resolution and audio states are no longer created for the C66/C88 crosspoint matrices (they have no scaler/audio path), so the object tree only exposes controls the device actually implements
* (Alan Paris) Added `protocols/c66.txt` documenting the C66/C88 RS-232 / Telnet command set (verified against FW V1.0.1d)

### 0.4.2 (2026-07-04)
* (Alan Paris) WiFi password state is now write-only (`read: false`) so the value cannot be read back from the object tree once set
* (Alan Paris) Removed the accidentally committed npm pack artifact (`.tgz`) from the repository

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 Alan Paris <alan.paris@scottish.rugby>

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