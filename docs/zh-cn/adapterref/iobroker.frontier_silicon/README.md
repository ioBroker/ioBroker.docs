---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.frontier_silicon/README.md
title: ioBroker.frontier_silicon
hash: VlKB9oFrSD18e9fGj/k22iAD/ujC91ROnPQ+fvMqe6Y=
---
# IoBroker.frontier_silicon
![标识](../../../en/adapterref/iobroker.frontier_silicon/admin/radio.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.frontier_silicon.svg)
![下载](https://img.shields.io/npm/dm/iobroker.frontier_silicon.svg)
![安装数量（最新）](http://iobroker.live/badges/frontier_silicon-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/frontier_silicon-stable.svg)
![新公共管理](https://nodei.co/npm/iobroker.frontier_silicon.png?downloads=true)

## Frontier SmartRadio 的 ioBroker 适配器
**测试：**![测试和发布](https://github.com/iobroker-community-adapters/ioBroker.frontier_silicon/workflows/Test%20and%20Release/badge.svg)

## 信息
使用 FSAPI 为配备 Frontier Silicon 芯片组的媒体播放器、网络收音机和 SmartRadios 提供支持。

注意：此适配器已转移至 iobroker-community-adapters 进行维护。因此，计划中的功能（见下文）将不会实现。未来只会发布重要的错误修复和依赖项更新。但我们始终欢迎提交包含错误修复或功能增强的 PR。

发行说明：

版本 0.4.x 包含一项重大变更：

- “frontier_silicon.X.media.state”的类型从“数字”更改为“字符串”且只读

如果您从旧版本更新此适配器而不是全新安装，则可能会在 ioBroker 日志中看到类似以下警告：`State value to set for "frontier_silicon.0.media.state" has to be type "number" but received type "string"` 为了防止这种情况发生，最简单的解决方案是在 ioBroker 的“实例”选项卡中停止适配器，在“对象”选项卡中彻底删除对象树，然后重新启动适配器。当然，此操作仅在更新后需要执行一次，如果您进行全新安装，则无需执行。

版本 0.3.x 包括一些重大变化：

- 需要 node>=18、js-contoller>=5 和 admin>=6

如果您想使用此适配器，请将您的 ioBroker 至少升级到此软件级别

- 配置 UI 中所有参数的 PIN 加密和有效性检查

如果您从旧版本更新此适配器而不是全新安装，即使您配置中的 PIN 码正确且未更改，适配器也将无法启动。要解决此问题，只需在配置界面中再次输入相同的旧 PIN 码，然后保存并关闭配置界面即可重新启动适配器。当然，此操作仅在更新后首次启动后才需要执行一次。

- “frontier_silicon.X.modes.selectPreset”的类型从“字符串”更改为“数字”

如果您从旧版本更新此适配器而不是全新安装，则可能会在 ioBroker 日志中看到类似以下警告：`State value to set for "frontier_silicon.0.modes.selectPreset" has to be type "string" but received type "number"` 为了防止这种情况发生，最简单的解决方案是在 ioBroker 的“实例”选项卡中停止适配器，在“对象”选项卡中彻底删除对象树，然后重新启动适配器。当然，此操作仅在更新后需要执行一次，如果您进行全新安装，则无需执行。

- 使用 UNDOK App 同步电源、音量和静音状态

与 UNDOK App 同步意味着，通过 UNDOK App 更改的电源、音量和静音设置现在也会更新到此适配器的状态中。由于 FSAPI 协议的限制，UNDOK App 与适配器的状态同步仍然不可靠，并且不会立即完成，而仅在使用 UNDOK App 更改预设或模式等情况下才会发生。

- 循环连接重试而不是禁用适配器

之前，如果由于路由器重启、LAN 或 WiFi 中断等长期网络问题导致设备无法连接，适配器会在尝试连接 10 次会话后终止。现在，适配器会在每个会话刷新间隔后重试，直到设备再次可连接。如果您想避免记录与这些重试相关的日志条目，则必须手动停止适配器。如果在重试期间网络问题已修复，只需重新启动适配器即可。

＃＃ 特征
### 已实现的功能
- 电源控制
- 模式选择
- 预设选择
- 针对多个州的通知
- 音量控制
- 通知
- 自动发现

### 计划的功能
- 更多州
- 翻译
- 更多异常处理
- 更清晰的代码
- 多房间功能

### 未计划的功能
- 更改系统信息

### 已知错误和限制
- 必须打开媒体播放器才能发现预设
- 由于 FSAPI 协议的限制，与 UNDOK App 的并行操作不可靠，因此不支持。使用风险自负。
- 由于 FSAPI 协议的限制，DAB+ 模式下不提供电台图标。

## 文档
此适配器可让您控制基于 Frontier Silicon 芯片组的互联网收音机和媒体播放器。许多设备可以通过 [UNDOK](https://support.undok.net) 应该可以正常工作。已测试的设备来自 [Revo](https://revo.co.uk/de/products/)、[Sangean](https://www.sangean.eu/products/all_product.asp)、[Hama](https://de.hama.com/produkte/audio-hifi/digitalradio) 和 [SilverCrest](https://de.hama.com/produkte/audio-hifi/digitalradio)](https://www.lidl.de) 控制，其他设备也应该可以控制。

安装后，必须在配置对话框中输入设备的 IP 和 PIN 码。如果收音机通过 UNDOK 应用程序或此适配器打开后无法播放 DAB，请启用“DAB 启动时无声音”功能，重试。

适配器首次启动时会收集设备信息。为此，它需要切换所有模式。在检查设置期间，设备将静音几秒钟，以避免干扰声音。

状态和对象的文档以及常规 FSAPI 文档可以在 <https://github.com/iobroker-community-adapters/ioBroker.frontier_silicon/blob/master/docs/en> 找到

## 法律声明
Frontier、Frontier Silicon、SmartRadio、UNDOK 和相关徽标是 Frontier Smart Technologies Limited 的商标或注册商标[https://www.frontiersmart.com](https://www.frontiersmart.com)

所有其他商标均属于其各自所有者的财产。

作者不以任何方式获得 Frontier Smart Technologies Limited 或任何相关子公司、徽标或商标的认可或附属。

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

- (pdbjjens) Change: node>=20, js-controller>=7 and admin>=7 required
- (oelison) read and write from daylight saving time
- (pdbjjens) Fix: UpdatePreset now skips empty presets (#289)
- (pdbjjens) Change: Adapter and FSAPI documentation was moved to the docs folder (#281)


### 0.4.0 (2025-02-01) - 2025H1 maintenance release

- (pdbjjens) Change: media state changed from number to string and readonly (#241)
- (pdbjjens) New: Added media control function "stop" (#241)
- (pdbjjens) New: Optimizations for responsive design (#244)
- (pdbjjens) Change: Migration to ESLint 9 (#253)
- (pdbjjens) Fix: Added button state acknowledgement
- (pdbjjens) Fix: Prevent warning on adapter stop

### 0.3.0 (2024-08-27) - 2024H2 maintenance release

- (pdbjjens) Change: node>=18, js-contoller>=5 and admin>=6 required
- (pdbjjens) Change: Removed .npmignore
- (pdbjjens) Change: Cyclic connection retry instead of disabling the adapter (#191)
- (pdbjjens) New: Updated dependencies
- (pdbjjens) Fix: Replace deprecated method "deleteChannel" by "delObject" (#224)

### 0.2.0 (2024-01-28)

- (pdbjjens) Change: Increase minor version number

### 0.1.2 (2024-01-26) - 2024 maintenance release

- (pdbjjens) Change: node>=16, js-contoller>=4 and admin>=5 required
- (pdbjjens) New: Optionally display PIN code and limit to 4 digits in config GUI
- (pdbjjens) Updated dependencies

### 0.1.1 (2023-07-26)

- (pdbjjens) Breaking Change: node>=14, js-contoller>=4 and admin>=5 required
- (pdbjjens) Breaking Change: PIN encryption and validity check of all parameters in config UI
- (pdbjjens) Breaking Change: Type of `frontier_silicon.X.modes.selectPreset` changed from "string" to  "number"
- (pdbjjens) Change: Validity check of all parameters in config UI
- (pdbjjens) Change: Re-establish session if network connection is lost
- (pdbjjens) New: Synchronization of power, volume and mute states with the UNDOK App

## License

MIT License

Copyright (c) 2025 halloamt <iobroker@halloserv.de> & IoBroker-Community

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