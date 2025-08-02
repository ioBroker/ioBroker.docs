---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.fronius-wattpilot/README.md
title: ioBroker.fronius-wattpilot
hash: unbugf5ftTb/BE8Q4uqsUfz2KGBUs9exwOd/mkoxahs=
---
![标识](../../../en/adapterref/iobroker.fronius-wattpilot/admin/fronius-wattpilot.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.fronius-wattpilot.svg)
![下载](https://img.shields.io/npm/dm/iobroker.fronius-wattpilot.svg)
![安装数量](https://iobroker.live/badges/fronius-wattpilot-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/fronius-wattpilot-stable.svg)
![依赖状态](https://img.shields.io/david/tim2zg/iobroker.fronius-wattpilot.svg)
![国家公共管理](https://nodei.co/npm/iobroker.fronius-wattpilot.png?downloads=true)

# IoBroker.fronius-wattpilot
**测试：** ![测试与发布](https://github.com/tim2zg/ioBroker.fronius-wattpilot/workflows/Test%20and%20Release/badge.svg)

非官方 Fronius Watt 试点的准系统实施 (https://www.fronius.com/de-ch/switzerland/solanergie/installateure-partner/technische-daten/alle-produkte/l%C3%B6sungen/fronius-wattpilot) API 。基于 https://github.com/joscha82/wattpilot。

＃＃ 如何安装：
**我不对您的设备负责。通过此API您可以直接访问设备，请小心。**

＃＃＃ **要求**
- 完成 Fronius Watt Pilot 应用程序的正常安装。记住密码！
- 转到“互联网”选项卡并将 Pilot 连接到 Wi-Fi。
- 找出您的 WattPilot 的 IP 地址。
  - 选项 1：通过路由器的 Web-GUI。
  - 选项 2：通过 Wattpilot 应用程序：建立连接后，单击 Wi-Fi 名称。

  您将看到一个页面，其中包含有关您的 Wi-Fi 连接的更多信息。记下 IP 地址。

### **iobroker.fronuis-wattpilot 适配器**
- 现在您可以通过“适配器”页面定期安装 iobroker.fronius-wattpilot 实例。
- 创建实例后，系统将提示您输入 WattPilot 的 IP 地址和密码。填写您之前注意到的值并保存配置。如果您正确完成了所有操作，适配器将在一段时间后变为绿色，您可以在对象选项卡中看到传入的数据。

**强烈建议为您的 WattPilot 分配静态 IP。**

## 我如何使用适配器...
您可以像代理中的所有其他数据点一样使用此适配器的数据点。
要获得一些想法，请参阅“示例”。

您可以通过 [块示例](https://github.com/tim2zg/ioBroker.fronius-wattpilot/blob/main/examples/example-Blockly.xml) 测量太阳能电网输出并自动将 Pilot 调整至正确的电流值 (Amp)，以改善内部能耗。
您只需复制示例的内容即可导入它，然后通过 Blockly 脚本右上角的“导入块”图标插入它。

## 适配器有什么作用？
该适配器连接到 WattPilots WebSocket 并将传入数据分离到 ioBroker 数据点中，您可以轻松使用。

## 获取状态
默认情况下，适配器只写入 Wattpilot 的关键点。如果您想要 API 可以提供的所有可能值，请取消选中实例设置中的复选框。
此处提供了数据点的文档：https://github.com/joscha82/wattpilot/blob/main/API.md（感谢 joscha82）

## 设置状态？
您可以直接设置的最重要的状态是 AccessState、amp、cableLock、cae 和 mode。

**访问状态**：“打开”或“等待”

**安培**：6-16

**cableLock**：“正常”或“自动解锁”或“始终锁定”

**cae**：“true”或“false”（注意这会禁用您的 WattPilot 的云功能，可能需要重新启动）

是的，只需写状态名称，后跟分号，然后写 set_state 状态中的值即可。
例如：

    放大器；6

**您可以直接通过 set_power 和 set_mode 状态控制“amp”和“lmo”状态。**

## 这个混乱是什么意思？
感谢 joscha82，我们知道：https://github.com/joscha82/wattpilot/blob/main/API.md

## 开发人员
- [SebastianHanz](https://github.com/SebastianHanz)
- [tim2zg](https://github.com/tim2zg)
- [derHaubi](https://github.com/derHaubi)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
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

Copyright (c) 2024 tim2zg <tim2zg@protonmail.com>

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