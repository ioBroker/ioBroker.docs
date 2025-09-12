---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.fronius-wattpilot/README.md
title: ioBroker.fronius-wattpilot
hash: nRtUxJxL8jc8iMLKpLwL7mkVOqPO8R1jUqixfK8Nu3o=
---
![标识](../../../en/adapterref/iobroker.fronius-wattpilot/admin/fronius-wattpilot.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.fronius-wattpilot.svg)
![下载](https://img.shields.io/npm/dm/iobroker.fronius-wattpilot.svg)
![安装数量](https://iobroker.live/badges/fronius-wattpilot-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/fronius-wattpilot-stable.svg)
![新公共管理](https://nodei.co/npm/iobroker.fronius-wattpilot.png?downloads=true)

# IoBroker.fronius-wattpilot
**测试：**![测试和发布](https://github.com/tim2zg/ioBroker.fronius-wattpilot/workflows/Test%20and%20Release/badge.svg)

[文档的德语版本](README_DE.md)

## 这是什么适配器？
这款适配器将您的 Fronius Wattpilot 电动汽车充电器与 ioBroker 集成，让您可以监控和控制充电站。Wattpilot 是一款智能电动汽车充电解决方案，可集成到您的智能家居系统中。

🌟 主要特点：

- 实时监控充电状态
- 远程控制充电参数
- 云和本地连接支持

## 安装和设置
### 先决条件
在安装适配器之前，您需要设置您的 Wattpilot：

1. **完成 Wattpilot 设置**：使用官方 Fronius Wattpilot 应用程序完成初始设置并**记住您的密码**
2. **连接到 WiFi**：在应用程序中，转到“Internet”选项卡并将您的 Wattpilot 连接到您的 WiFi 网络
3. **查找 IP 地址**：您需要使用以下方法之一获取 Wattpilot 的 IP 地址：
- **路由器方法**：检查路由器的 Web 界面上是否有连接的设备
- **应用程序方法**：在 Wattpilot 应用程序中，连接后点击 WiFi 名称。您将看到包括 IP 地址在内的网络详细信息

> 💡 **重要**：强烈建议在路由器设置中为您的 Wattpilot 分配一个静态 IP 地址，以防止出现连接问题。

### 适配器安装
1. 从 ioBroker“适配器”页面安装适配器
2. 创建 fronius-wattpilot 适配器的新实例
3. 在实例配置中：
- 输入您的 Wattpilot 的 **IP 地址**
- 输入您的 Wattpilot **密码**
- 根据需要配置其他设置
4.保存配置

如果一切配置正确，适配器将连接并开始创建数据点。

## 如何使用适配器
### 读取数据
适配器会自动为所有 Wattpilot 值创建数据点。您可以像使用 ioBroker 中的其他数据点一样使用这些数据点：

- VIS 或其他前端的可视化
- 脚本和 Blockly 中的逻辑
- 自动化规则

**数据模式：**

- **仅关键点**（默认）：仅显示最重要的值
- **所有值**：取消选中“仅关键点”选项可查看所有可用的 API 数据

📖 完整 API 文档：[Wattpilot API 文档](https://github.com/joscha82/wattpilot/blob/main/API.md)（感谢 joscha82）

### 控制你的 Wattpilot
#### 直接国家控制（新！）
您现在可以通过写入状态直接控制重要的 Wattpilot 功能。

#### 通过 set_state 进行高级控制
如需更高级的控制，请使用以下格式的`set_state`数据点：

```
stateName;value
```

**可用状态：**

-**amp**：`6-16`（充电电流，单位为安培）
- **cae**: `true` 或 `false` (⚠️ 禁用云功能 - 可能需要重启)

**示例：**

```
amp;10          // Set charging current to 10A
```

## 示例和用例
### 太阳能集成示例
查看我们的[Blockly 示例](https://github.com/tim2zg/ioBroker.fronius-wattpilot/blob/main/examples/example-Blockly.xml)，其中展示了如何：

- 监控您的太阳能发电量
- 根据多余的太阳能自动调节 Wattpilot 充电电流

**如何使用示例：**

1. 从示例文件中复制内容
2. 在 ioBroker Blockly 中，点击“导入区块”图标（右上角）
3. 粘贴内容并使其适应您的设置

### 常见自动化
- **分时充电**：在非高峰时段开始充电
- **太阳能剩余充电**：仅在太阳能过剩时充电
- **存在检测**：根据汽车存在情况开始/停止充电
- **负载平衡**：根据家庭用电量调整充电电流

技术细节
该适配器连接到 Wattpilot 的 WebSocket 接口，并将传入数据转换为 ioBroker 数据点。它支持本地 WiFi 连接和基于云的连接。

**连接类型：**

- **本地 WiFi**（推荐）：直接连接到您的 Wattpilot
- **云**：通过 Fronius 云服务连接

故障排除
**常见问题：**

- **连接失败**：请检查 IP 地址和密码
- **频繁断线**：为您的 Wattpilot 分配一个静态 IP
- **缺少数据点**：尝试启用“所有值”模式
- **云连接问题**：验证“cae”设置

**⚠️ 免责声明：** 此适配器使用非官方 API。使用时请自行承担风险，并在修改可能影响设备运行的设置时务必小心谨慎。

## 开发人员
- [SebastianHanz](https://github.com/SebastianHanz)
-[tim2zg]（https://github.com/tim2zg）
- [derHaubi](https://github.com/derHaubi)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 4.7.0 (2025-06-19)
- Rewrite of the adapter
- Added ability to set states directly
- Added ability to set common states directly
- Fix all issues

### 4.6.3 (2023-12-24)
- Fixed a bug where the adapter would use a undefined variable
- Fixed bug #44
- Fixed bug #43

### 4.6.2 (2023-08-15)
- Thanks to Norb1204 for fixing a few bugs that I missed. More in Issue #40

### 4.6.1 (2023-08-15)
- Fixed Issue #39 (set_state not working)

### 4.6.0 (2023-07-15)
- Fixed timeout issue in normal parser mode (#36), still exist in dynamic parser mode --> use no timeout (0)
- Fixed a number of issues concerning the static parser mode
- Quality of life improvements --> you can now set the common states directly! (set_power, set_mode) are still available for compatibility reasons and for the dynamic parser mode

### 4.5.1 (2023-03-02)
- Fixed issue #29 (custom states not working)

### 4.5.0 (2023-02-19)
- Fixed random log messages
- Fixed a type conflict at the set_state state
- Commits from now on should be signed

### 4.4.0 (2023-02-16)
- known states will now be updated even if the dynamic parser is enabled

### 4.3.0 (2023-01-14)
- dependency updates
- state updates

### 4.2.1 (2023-01-05)
- Fixed bug in the all values mode / parser

### 4.2.0 (2023-01-01)
- Some QoL improvements

### 4.1.0 (2022-12-30)
- Added the possibility to add states manually via the instance-settings
- Fixed the bug where the adapter didn't set the correct value types
- Added some quality of life improvements

### 4.0.0 (2022-11-30)
- Fixed timing issue
- Added set_power and set_mode states

### 3.3.1 (2022-11-17)
- Fixed a bug where set_state was not writable

### 3.3.0 (2022-11-17)
- Fixed a bug where the adapter would not set the correct labels for the states
- Performance improvements
- Fixed dependencies

### 3.2.5 (2022-10-14)
- Small changes to the package.json and io-package.json

### 3.2.4 (2022-10-11)
- Fiexed cool down timer for normal values

### 3.2.3 (2022-10-08)
- Bug fixed where the adapter would not respect the timout timer and would try to constantly reconnect to the WattPilot
- Bug fixed where the adapter would send a wrong disconnect message to the WattPilot

### 3.2.2 (2022-10-06)
- Fixed reconnecting frequency
- Fixed multiple Websocket connections
- Added frequency handler

### 3.2.1 (2022-10-02)
- Fixed reconnecting to the WebSocket
- Restructured the code

### 3.2.0 (2022-09-29)
- Implemented reconnecting
- Shrank code down

### 3.1.0 (2022-09-07)
- Added the option to use the cloud as a datasource
- Updated GitHub workflows

### 3.0.0 (2022-09-04)
- Updated README.md
- Created "examples"-directory for sample applications
- Added some translations
- Renamed checkbox "Parser" to something more intuitive
- Fixxed #4: Datapoint "map" now gets created correctly
- Fixxed #5: Password-characters are no longer visible
- Fixxed type conflict of cableType

### 2.2.4 (2022-09-01)
- SebastianHanz fixed infinite RAM-usage
- added some description

### 2.2.3 (2022-08-30)
- SebastianHanz fixed type-conflicts. Thank you!

### 2.2.2 (2022-08-25)
- Bug fixes

### 2.2.1 (2022-08-22)
- Bug fixes

### 2.2.0 (2022-08-21)
- Fixed Bugs

### 2.1.0 (2022-08-19)
- Min Node Version 16

### 2.0.3 (2022-07-20)
- Updated Readme

### 2.0.2 (2022-07-12)
-   Bug fixed

### 2.0.1 (2022-07-10)
-   Added a how to install. Not to detail because currently not in stable repo.

### 2.0.0 (2022-07-10)
-   Fixed NPM Versions hopefully

### 1.1.0 (2022-07-10)
-   Added UselessPV and TimeStamp Parser, did some testing.

### 1.0.1 (2022-06-02)
- Tests

### 1.0.0 (2022-06-02)

- Did some changes
- Did some more changes

### 0.0.5 (2020-01-01)
- Better Code

### 0.0.4 (2020-01-01)
- Parser option added

### 0.0.3 (2020-01-01)
- Parser added

### 0.0.2 (2020-01-01)
- Bug fixed

### 0.0.1 (2020-01-01)
- Initial release

## License
MIT License

Copyright (c) 2025 tim2zg <tim2zg@protonmail.com>

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