---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.frontier_silicon/README.md
title: ioBroker.frontier_silicon
hash: NcLY7C7E+81OQd7XM6P1bLyzXy9bA0pAuWeNFAogifY=
---
# IoBroker.frontier_silicon
![标识](../../../en/adapterref/iobroker.frontier_silicon/admin/radio.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.frontier_silicon.svg)
![下载](https://img.shields.io/npm/dm/iobroker.frontier_silicon.svg)
![安装数量（最新）](http://iobroker.live/badges/frontier_silicon-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/frontier_silicon-stable.svg)
![NPM](https://nodei.co/npm/iobroker.frontier_silicon.png?downloads=true)

## 用于 Frontier SmartRadio 的 ioBroker 适配器
**测试：** ![测试和发布](https://github.com/iobroker-community-adapters/ioBroker.frontier_silicon/workflows/Test%20and%20Release/badge.svg)

## 信息
使用 FSAPI 为配备 Frontier Silicon 芯片组的媒体播放器、网络收音机和 SmartRadios 提供支持。

注意：此适配器已转移到 iobroker-community-adapters 进行维护。因此计划的功能（见下文）将不会实现。未来只会发布重要的错误修复和依赖更新。但是，始终欢迎带有错误修复或功能增强的 PR。

＃＃ 特征
### 实现的功能
- 功率控制
- 模式选择
- 预设选择
- 几个州的通知
- 音量控制
- 通知

### 计划的功能
- 自动发现
- 更多州
- 翻译
- 更多异常处理
- 更简洁的代码
- 多房间功能

### 未计划的功能
- 更改系统信息

### 已知错误
- 媒体播放器必须打开才能发现预设
- 一段时间后没有通知

## 文档
此适配器可让您控制基于 Frontier Silicon 芯片组的互联网收音机和媒体播放器。许多设备可以通过 [Undok](https://www.frontiersmart.com/undok) 应该有效。测试设备来自 [Revo](https://revo.co.uk/de/products/)、[Sangean](https://www.sangean.eu/products/all_product.asp) 和 [SilverCrest](https://www.silvercrest-multiroom.de/produkte/produktuebersicht/) 控制，其他设备也应该可以工作。

安装后，必须在配置对话框中输入设备的 IP 和 PIN。如果收音机在通过 Undok 或此适配器打开后不播放 DAB，请尝试启用“DAB 无声启动”。

当适配器第一次启动时，它会收集有关设备的信息。为此，它需要切换所有模式。在检查设置期间，设备将静音几秒钟以避免干扰声音。

当适配器读取设备的设置对象并创建状态时。状态可以是只读的（`ro`）或读写的（`rw`）*好的，按钮的只写也是可能的*。

- 声音的

  基本音频设置。尚未实施均衡器控制。

  - maxVolume (`number, ro`)

    可选择的最大音量

  - 静音（`boolean，rw`）

    `true` 如果设备静音，则 `false` 否则

  - 音量（`number，rw`）
  - 控制
    - 降低音量和提高音量

    In-/ 或将音量减 1

- 设备

  - friendlyName (`text, rw`)
  - 权力（`布尔值，rw`）
  - radioId (`test, ro`)

    我猜这是设备的 MAC

  - 版本（`文本，ro`）

    软件版本

  - webfsapi (`text, ro`)

    API地址

- 信息

  - 连接（`boolean, ro`）

    适配器的连接指示灯

- 媒体

  - 状态（`number, rw`）

    有效值为：

    - 0：暂停
    - 1：播放

  - 控制

    - 下一个
    - 掌声
    - 玩
    - 以前的

  不要把下面的名字太当回事。收音机在不同模式下以不同方式使用它们。

  - 专辑（`text, ro`）
  - 艺术家（`text, ro`）
  - 图形（`文本，ro`）

    使用此 URL 获取专辑封面或电台徽标。

  - 名称（`文本，ro`）
  - 文本（`文本，ro`）
  - 标题（`文本，ro`）

- 模式

  - 读取预设

    重新读取所有预设

  - selectPreset (`number, rw`)

    用于获取或选择预设。请注意，适配器会猜测该值无法从 API 中读取。

  - 选中（`number, rw`）

    指示或选择所选模式。也可以通过 `modes.{number}.switchTo` 选择

  -`{数字}`

    - id (`text, ro`)

      该模式的名称

    - 键（`number, ro`）

      该模式的索引。等于对象树中的 `mode.{number}`，可以写入 `modes.selected`。

    - 可选（`boolean, ro`）

      `true` 如果可以手动选择此模式。

    - 流式（`boolean, ro`）

      仅存在于支持多房间的设备上。 `true` 如果此模式可以用作多个多房间设备的来源。

    - 切换到

      选择该模式。

    - 预设

      - 可用性（`boolean, ro`）

        指示此模式的预设是否可用

      -`{数字}`

        该预设的索引。等于 `mode.*.presets.{number}.key`。

        - 钥匙

          该预设的索引。等于对象树中的 `mode.*.presets.{number}`，可以写入 `modes.selectPreset`。

        - 名称（`文本，ro`）

          该预设的名称

        - 切换到

          选择该预设和相应的模式。

请注意，您有时可以在“按下按钮”或“设置值”之间进行选择。使用对您来说更方便的东西。

＃＃ 法律声明
Frontier、Frontier Silicon、SmartRadio 和相关徽标是 Frontier Smart Technologies Limited 的商标或注册商标 [https://www.frontiersmart.com](https://www.frontiersmart.com)

所有其他商标均为其各自所有者的财产。

Frontier Smart Technologies Limited 或任何相关子公司、徽标或商标绝不认可或隶属于作者。

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

- (pdbjjens) Breaking Changes: node>=14, js-contoller>=4 and admin>=5 required
- (pdbjjens) New: json config UI

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

### 0.0.6

- (halloamt) Nothing really, small stuff for npm

### 0.0.5

- (halloamt) Media state controls

- (halloamt) Bugfixes

### 0.0.4

- (halloamt) Media and volume control buttons

- (halloamt) Bugfixes

### 0.0.3

- (halloamt) Get notifications from the radio

- (halloamt) Change volume / mute

### 0.0.1

- (halloamt) initial release
- (halloamt) Change mode
- (halloamt) Select Preset

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