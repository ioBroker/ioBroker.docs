---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.frontier_silicon/README.md
title: ioBroker.frontier_silicon
hash: MJqNdJKLA52Jw8Ivs+83/4BbOJL2n/cJjLjidlmlS1I=
---
# IoBroker.frontier_silicon
![标识](../../../en/adapterref/iobroker.frontier_silicon/admin/radio.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.frontier_silicon.svg)
![下载](https://img.shields.io/npm/dm/iobroker.frontier_silicon.svg)
![安装数量（最新）](http://iobroker.live/badges/frontier_silicon-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/frontier_silicon-stable.svg)
![国家公共管理](https://nodei.co/npm/iobroker.frontier_silicon.png?downloads=true)

## Frontier SmartRadio 的 ioBroker 适配器
**测试：** ![测试与发布](https://github.com/iobroker-community-adapters/ioBroker.frontier_silicon/workflows/Test%20and%20Release/badge.svg)

## 信息
为配备使用 FSAPI 的 Frontier Silicon 芯片组的媒体播放器、网络收音机和 SmartRadios 提供支持。

注意：此适配器已转移到 iobroker-community-adapters 进行维护。因此计划的功能（见下文）将不会实现。将来只会发布重要的错误修复和依赖项更新。然而，修复错误或增强功能的 PR 总是受欢迎的。

发行说明：0.1.x 版包含一些重大更改：

- 需要 node>=14、js-contoller>=4 和 admin>=5

如果您想使用此适配器，请将您的 ioBroker 至少升级到此软件级别

- 配置 UI 中所有参数的 PIN 加密和有效性检查

如果您从以前的版本更新此适配器而不是新安装，则即使您配置中的 PIN 正确且未更改，适配器也不会启动。要解决此问题，只需在配置 UI 中再次输入相同的先前 PIN 码，然后存储并关闭配置 UI 以重新启动适配器。当然，这仅在更新后首次启动后才需要执行一次。

- “frontier_silicon.X.modes.selectPreset”的类型从“字符串”更改为“数字”

如果您从以前的版本更新此适配器而不是新安装，您可能会在 ioBroker 日志中发现如下警告：`State value to set for "frontier_silicon.0.modes.selectPreset" has to be type "string" but received type "number"` 为了防止这种情况发生，最简单的解决方案是在实例选项卡中停止该适配器ioBroker 的，完全删除对象选项卡中的对象树，然后重新启动适配器。当然，这仅在更新后需要一次，如果您进行全新安装则不需要。

- 与 UNDOK 应用程序同步电源、音量和静音状态

此处与 UNDOK 应用程序同步意味着由 UNDOK 应用程序更改的电源、音量和静音设置现在也将在此适配器的状态中更新。由于 FSAPI 协议的限制，UNDOK 应用程序与适配器的状态同步仍然不可靠，并且不会是瞬时的，而仅在例如使用 UNDOK 应用程序更改预设或模式。

＃＃ 特征
### 实现的功能
- 功率控制
- 模式选择
- 预设选择
- 多个州的通知
- 音量控制
- 通知

### 计划的功能
- 自动发现
- 更多州
- 翻译
- 更多异常处理
- 更干净的代码
- 多房间功能

### 未计划的功能
- 更改系统信息

### 已知错误和限制
- 媒体播放器必须打开才能发现预设
- 由于 FSAPI 协议的限制，与 UNDOK 应用程序的并行操作不可靠，因此不支持。使用风险自负。

## 文档
该适配器可让您控制基于 Frontier Silicon 芯片组的网络收音机和媒体播放器。许多设备可以通过[UNDOK](https://support.undok.net) 应该可以工作。测试的设备来自 [Revo](https://revo.co.uk/de/products/)、[Sangean](https://www.sangean.eu/products/all_product.asp)、[Hama](https ://de.hama.com/produkte/audio-hifi/digitalradio）和 [SilverCrest](https://www.lidl.de)控制，其他设备也应该可以工作。

安装后，必须在配置对话框中输入设备的 IP 和 PIN。如果通过 UNDOK 应用程序或此适配器打开收音机后无法播放 DAB，请在启用“DAB 启动时没有声音”的情况下重试。

当适配器第一次启动时，它会收集有关设备的信息。为此，它需要切换所有模式。在检查设置期间，设备将静音几秒钟，以避免产生干扰声音。

当适配器读取设备的设置时，会创建 ioBroker 对象和状态。状态可以是只读 (`ro`) 或读写 (`rw`) *好的，按钮只写也是可能的*。

- 声音的

  基本音频设置。尚未实施均衡器控制。

  - maxVolume(`数字，ro`)

    最大音量可选

  - 静音（`布尔值，rw`）

    `true`（如果设备已静音），`false`否则

  - 卷（`数字，rw`）
  - 控制
    - 音量减小和音量增大

    In-/ 或将音量减小 1

- 设备

  - 友好名称（`文本，rw`）
  - 幂（`布尔值，rw`）
  - radioId(`测试，ro`)

    我的猜测是这是设备的MAC

  - 版本（`文本，ro`）

    软件版本

  - webfsapi（`文本，ro`）

    API地址

- 信息

  - 连接（`布尔值，ro`）

    适配器的连接指示灯

- 媒体

  - 状态（`数字，rw`）

    有效值为：

    - 0：暂停
    - 1：播放

  - 控制

    - 下一个
    - 鼓掌
    - 玩
    - 以前的

  不要太认真地对待以下名称。收音机在不同模式下以不同方式使用它们。

  - 专辑（`文本，ro`）
  - 艺术家（`文本，ro`）
  - 图形（`文本，ro`）

    使用此 URL 获取专辑封面或电台徽标。

  - 名称（`文本，ro`）
  - 文本（`文本，ro`）
  - 标题（`文本，ro`）

- 模式

  - 读取预设

    重新读取所有预设

  - selectPreset(`数字，rw`)

    用于获取或选择预设。请注意，适配器会猜测，因为无法从 API 读取该值。

  - 选择（`数字，rw`）

    指示或选择所选模式。也可以通过`modes.{number}.switchTo`选择

  - `{数字}`

    - id（`文本，ro`）

      该模式的名称

    - 键（`数字，ro`）

      该模式的索引。等于对象树中的`mode.{number}`，并且可以写入`modes.selected`。

    - 可选（`布尔值，ro`）

      `true` 如果可以手动选择此模式。

    - 可流式传输（`布尔值，ro`）

      仅存在于支持多房间的设备上。 `true` 如果此模式可用作多个多房间设备的源。

    - 切换到

      选择该模式。

    - 预设

      - 可用（`布尔值，ro`）

        指示此模式的预设是否可用

      - `{数字}`

        该预设的索引。等于`mode.*.presets.{number}.key`。

        - 钥匙

          该预设的索引。等于对象树中的`mode.*.presets.{number}`，并且可以写入`modes.selectPreset`。

        - 名称（`文本，ro`）

          该预设的名称

        - 切换到

          选择该预设和相应的模式。

请注意，有时您可以选择“按按钮”或“设置值”。使用对您来说更方便的方式。

＃＃ 法律声明
Frontier、Frontier Silicon、SmartRadio、UNDOK 和相关徽标是 Frontier Smart Technologies Limited 的商标或注册商标[https://www.frontiersmart.com](https://www.frontiersmart.com)

所有其他商标均为其各自所有者的财产。

作者未以任何方式获得 Frontier Smart Technologies Limited 或任何相关子公司、徽标或商标的认可或附属。

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

- (pdbjjens) Breaking Change: node>=14, js-contoller>=4 and admin>=5 required
- (pdbjjens) Breaking Change: PIN encryption and validity check of all parameters in config UI
- (pdbjjens) Breaking Change: Type of `frontier_silicon.X.modes.selectPreset` changed from "string" to  "number"
- (pdbjjens) Change: Validity check of all parameters in config UI
- (pdbjjens) Change: Re-establish session if network connection is lost
- (pdbjjens) New: Synchronization of power, volume and mute states with the UNDOK App

### 0.1.0 (2023-07-15)

- (pdbjjens) Breaking Changes: node>=14, js-contoller>=4 and admin>=5 required
- (pdbjjens) New: json config UI
- (pdbjjens) New: Re-establish session if network connection is lost
- (pdbjjens) New: Remove obsolete unit testing
- (pdbjjens) Fix: Prevent crashes if radio device is not reachable

### 0.0.11 (2023-03-30) 2023 maintenance release

- (pdbjjens) New: Transfer of adapter to community
- (pdbjjens) New: Updated dependencies
- (pdbjjens) New: Use adapter-dev instead of gulp translate
- (pdbjjens) Fix: Prevent js-controller >=3.2.x warnings regarding non-existent objects and typeErrors

### 0.0.10 (2020-11-29)

- Translations

### 0.0.9

- (halloamt) Selected preset can be read now. The adapter guesses a little but this seems to work.

- (halloamt) Nicer readme
- (halloamt) (Hopefully) more robust session handling.
- (halloamt) Long polling should work more reliably
- (halloamt) Sleep timers are cleared on `onUnload`

### 0.0.7 und 0.0.8

- (halloamt) Formal but neccessary stuff for ioBroker

## License

MIT License

Copyright (c) 2023 halloamt <iobroker@halloserv.de>

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