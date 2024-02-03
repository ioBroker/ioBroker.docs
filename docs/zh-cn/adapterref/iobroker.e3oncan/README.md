---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.e3oncan/README.md
title: ioBroker.e3oncan
hash: 9VP/hOLchitmrYO88SMTks2QBxdaskBEvwaN9kTTRQg=
---
![标识](../../../en/adapterref/iobroker.e3oncan/admin/e3oncan_small.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.e3oncan.svg)
![下载](https://img.shields.io/npm/dm/iobroker.e3oncan.svg)
![安装数量](https://iobroker.live/badges/e3oncan-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/e3oncan-stable.svg)
![国家公共管理](https://nodei.co/npm/iobroker.e3oncan.png?downloads=true)

# IoBroker.e3oncan
**测试：** ![测试与发布](https://github.com/MyHomeMyData/ioBroker.e3oncan/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 e3oncan 适配器
＃ 基本概念
Viessmann E3系列设备（One Base）在CAN总线上进行大量的数据交换。

该适配器可以侦听此通信并提取许多有用的信息。还支持常用的电能表 E380 CA。

支持并行**数据点读取** (ReadByDid)。无法通过聆听获得的信息可以主动请求。 UDsonCAN 协议也被其他设备使用，例如通过著名的 WAGO 网关。

**还支持通过 UDSonCAN (WriteByDid) 写入数据点**。通过写入数据点，可以更改设定点、时间表等。甚至可以添加新的时间表，例如用于生活热水循环泵。

通过存储未检查`Acknowledged`的相应状态（ack=false）来触发数据写入 - 是的，就是这么简单！数据点将从设备中再次读取并存储在写入后 2.5 秒的状态。如果状态未得到确认，请查看日志。

使用**白名单**将写入限制为一组数据点。该列表存储在每个设备的信息部分中，例如在`e3oncan.0.vitocal.info.udsDidsWritable`。您可以通过编辑此状态来添加更多数据点。确保在保存状态时**不**检查`Acknowledged`。

在适配器实例首次启动期间，将完成设备扫描，提供用于配置对话框的所有可用设备的列表。
应在首次设置期间扫描每个设备的数据点。

该适配器的重要部分基于项目[开放3e](https://github.com/open3e)。

还可以使用基于 Python 的使用 MQTT 消息传递的纯监听方法实现，请参阅[E3onCAN](https://github.com/MyHomeMyData/E3onCAN)。

＃ 入门
**先决条件：**

* 您有一个（USB 转）CAN 总线适配器连接到 Viessmann E3 设备的外部 CAN 总线
* 目前仅支持基于 Linux 的系统。
* CAN 适配器已启动并且在系统中可见，例如作为“can0”（使用 ifconfig 检查）。
* 请参阅 open3e 项目了解更多详细信息
* **确保在初始设置期间没有其他 UDSonCAN 客户端（例如 Open3Eclient.py）正在运行！** 这可能会导致两个应用程序中的通信错误。

该适配器提供的所有服务均基于您的特定 Viessmann E3 设置的设备列表。因此，您必须按照以下步骤进行首次设置：

**配置**

* 适配器安装完成后，将显示一个配置对话框，最多可配置两个 CAN 总线适配器（选项卡“CAN ADAPTER”）
* 编辑适配器名称并至少选中外部适配器的“连接到适配器”复选框
* 完成后，按“保存”按钮应用更改。此步骤是**强制**。该实例将重新启动并连接到 CAN 适配器。
* 转到“UDS 设备列表”选项卡，然后按扫描按钮扫描总线上可用的设备。 **这将需要几秒钟。** 您可以通过查看适配器的日志记录信息来观看第二个浏览器选项卡中的活动。
* 您可以更改第二列设备的命名。这些名称将用于将所有收集到的数据存储在 ioBoker 的对象树中。完成更改后再次按“保存”按钮。
* 实例将再次重新启动，几秒钟后您就可以扫描可用数据点。转到“数据点列表”选项卡，按“开始扫描...”按钮，然后单击“确定”进行确认。 **请耐心等待** - 这可能需要 **最多 5 分钟**。您可以通过查看适配器的日志记录信息在第二个浏览器选项卡中查看进度。

此步骤不是强制性的，但强烈建议这样做。如果您想写入数据点，您需要首先进行数据点扫描。

* 数据点扫描成功完成后，数据点在每个设备的对象树中可用。您可以通过选择设备并按“更新数据点列表”按钮来查看配置中的数据点。按过滤器符号并键入搜索模式以过滤名称和/或编解码器。这仅供您参考。请在选择其他设备之前停用过滤，以避免出现错误消息。
* 最后一步是在“外部 CAN 适配器的分配”选项卡上配置收集数据的计划。
* 对于**能量计 E380**（如果您的设置中可用），您可以选择激活或不激活。请注意“最小更新时间（秒）”值。对单个数据点的更新完成速度不会快于给定值（默认为 5 秒）。通过选择零，将存储每个接收到的数据。由于 E380 发送数据的速度非常快（每秒超过 20 个值），因此建议此处不要使用零。这会给 ioBroker 系统带来很高的负载。
* 如果您已通过 CAN 总线连接 E3 设备，例如Vitocal和VX3，您可以通过监听来实时收集这些设备之间交换的数据。按“+”添加一行，选中“活动”复选框，选择设备并编辑“最小更新时间（秒）”。此处使用 0 是可行的，但我建议保留 5。
* 最后，您可以添加通过 UDsonCAN 协议请求数据的时间表。再次按“+”按钮并编辑设置。您可能在每台设备上有多个时间表。通过这种方式，您可以比其他数据点更频繁地请求某些数据点。 “Schedule (s)”的默认值 0 意味着这些数据点在实例启动期间仅被请求一次。

您可以使用“数据点列表”选项卡上的数据点信息作为参考（在第二个选项卡上打开可能会有所帮助）。

* 如果您已配置连接到 **内部 CAN 总线** 的 CAN 适配器，则会看到“内部 CAN 适配器分配”选项卡。请在那里配置收集设备。 E3 设备的内部 CAN 总线不支持 UDsonCAN。
* 就是这样。按“保存并关闭”按钮并检查对象树中收集的数据。

# E380数据和单位
|身份证 |数据|单位|
| ------|:--- |------|
| 0x250 | 0x250有功功率 L1、L2、L3、总计 |西 |
| 0x252 | 0x252无功功率 L1、L2、L3、总计 |弗吉尼亚州 |
| 0x254 | 0x254当前、L1、L2、L3、cosPhi |一个，- |
| 0x256 | 0x256电压、L1、L2、L3、频率 |伏，赫兹|
| 0x258 | 0x258累计进口、出口|千瓦时 |
| 0x25A | 0x25A总有功功率、总无功功率|西弗吉尼亚州 |
| 0x25C | 0x25C累计进口|千瓦时 |

# 提示和限制
## 此 ioBroker 适配器正在开发和*测试阶段*
* 请不要在生产环境中使用此适配器！
* 数据结构和功能可能会发生变化
* 欢迎您在您的环境中测试适配器。请向我反馈您的经验和发现。

## 为什么要并行使用数据采集（仅监听）和UDsonCAN（ReadByDid）？
* 当您连接 E3 设备时，您可以受益于交换的数据。通过聆听，您将在变化时实时收到可用数据。因此，您可以直接在每次变化时获取快速变化的数据（例如能量流值）和缓慢变化的数据（例如温度）。您随时了解这些值。
* 其他无法或很少通过集合获得的数据，您可以通过 UDsonCAN ReadByDid 添加。通常对于设定点数据，这是最好的方法。
* 因此，从我的角度来看，两种方法的结合是最好的方法。

## 收集数据的限制
* 目前，已知的通信协议仅适用于 Vitocal（CAN id 0x693 上的监听器）、Vitocharge VX3 和 Vitoair（两者都是 CAN id 0x451 上的监听器）。

## 与 open3e 项目有什么不同？
* 显然，主要区别在于直接集成到ioBroker。配置可以通过对话框完成，数据直接列在对象树中。
* 除了open3e之外，还支持通过监听实时收集数据。
* 数据写入更加简单。只需更改相应状态下的数据并按保存按钮即可。

## Open3e可以并行使用吗？
是的，在某些条件下这是可能的：

* 如果您仅使用此处收集数据，则可以无限制地使用open3e。
* 如果您在此处使用 UDSonCAN，请务必不要对与 open3e 相同的设备执行此操作。如果您这样做，您将会遇到零星的通信错误。

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.6.17 (2024-01-29)
* (MyHomeMyData) Added/removed datapoints to/from list of writable dids
* (MyHomeMyData) Preparations for device specific list of writable dids

### 0.6.16 (2024-01-27)
* (MyHomeMyData) Improvements based on findings in review as of 2024-01-25
* (MyHomeMyData) Checkbox for data collectiton on internal bus is now checked per default

### 0.6.15 (2024-01-23)
* (MyHomeMyData) Fix for Utf8 codec for handling of special characters, e.g. umlauts

### 0.6.14 (2024-01-22)
* (MyHomeMyData) Replace '.' by '_' in datapoint ids to avoid unwanted sub structure in data states
* (MyHomeMyData) Added more informations about white list for writables in Readme.
* (MyHomeMyData) Recognize loss of CAN connection.
* (MyHomeMyData) Improved handling of info.connection.

### 0.6.13 (2024-01-20)
* (MyHomeMyData) Now supports multiple definitions of same schedule on a device 
* (MyHomeMyData) Added unit test cases for codecs

### 0.6.12 (2024-01-19)
* (MyHomeMyData) Added datapoints to list writable dids
* (MyHomeMyData) Added unit test cases for codecs
* (MyHomeMyData) Improved speed of codes for numerical values
* (MyHomeMyData) Improved error messages on UDS negative response

### 0.6.11 (2024-01-17)
* (MyHomeMyData) Improved layout of configuration dialog for device scan

### 0.6.10 (2024-01-15)
* (MyHomeMyData) Removed code for Rawmode because it's never activated

### 0.6.9 (2024-01-13)
* (MyHomeMyData) Bugfix: Only Linux is supported

### 0.6.8 (2024-01-13)
* (MyHomeMyData) Initial npm version

## License
MIT License

Copyright (c) 2024 MyHomeMyData <juergen.bonfert@gmail.com>

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