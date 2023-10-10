---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.cec2/README.md
title: ioBroker.cec2
hash: fP67Ti8lt/GHkCAQmbZG+yTnrqh6Wlmt0a9BynPEatQ=
---
![标识](../../../en/adapterref/iobroker.cec2/admin/cec2.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.cec2.svg)
![下载](https://img.shields.io/npm/dm/iobroker.cec2.svg)
![安装数量](https://iobroker.live/badges/cec2-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/cec2-stable.svg)
![国家公共管理](https://nodei.co/npm/iobroker.cec2.png?downloads=true)

# IoBroker.cec2
**测试：** ![测试与发布](https://github.com/iobroker-community-adapters/ioBroker.cec2/workflows/Test%20and%20Release/badge.svg)

HDMI CEC 适配器

您可以使用 HDMI CEC 监视/控制设备。大多数现代电视和多媒体设备都在某种程度上支持 CEC。

## 信息
启动时，该适配器运行 cec-client 并轮询 HDMI 总线上的所有设备。对于每个 CEC 设备，都会在 ioBroker 中创建一个设备。设备的 OSDName 将成为其在 ioBroker 中的 id（因为它不应该更改并且可读性良好）。
如果设备在运行时出现，它们也将被添加到 ioBroker。

#### CEC 地址
关于 CEC 地址的简短介绍，您可以跳过此部分，但如果您对下面的描述感到困惑，可能需要阅读此处。

在 CEC 中，有两种类型的地址。两者都很重要。

##### 逻辑地址
逻辑地址是 0 到 15 之间的数字（或通常使用的十六进制 F）。该数字定义了它是什么类型的设备：

* 0 = 电视
* 5 = 音频系统
* 4,8,11 = 播放
* 1,2,9 = 录音
* 3,6,7,10 = 调谐器

其他是保留的 (12,13)、免费使用 (14) 和未注册/广播 (15)。使用这些地址的设备在通信中受到限制。

逻辑地址是动态分配的。这意味着有一天，您可能会遇到这样的情况：播放 A 被分配地址 4，播放 B 被分配地址 8。但第二天，它们会以不同的顺序打开，然后 A 获得 8，B 获得 4。（某些设备始终处于活动状态）但在 CEC 总线上，因此保留它们的地址）。如果一种类型的设备太多（即 4 个播放设备），则必须重用逻辑地址，这种情况就会发生。适配器尝试处理这种情况。

逻辑地址用于寻址消息和报告。
ioBroker 也需要一个逻辑地址，以便从总线接收报告。因此，将适配器配置为您知道拥有空闲逻辑地址（例如记录）的设备类型。

＃＃＃＃＃ 实际地址
物理地址基于设备涉及的 HDMI 端口。它基本上是通往设备的端口号路径。它由 4 个由点分隔的数字组成。一些例子：

* 0.0.0.0 = 电视
* 1.0.0.0 = 1.电视的 HDMI 端口
* 2.0.0.0 = 2.电视的 HDMI 端口
* 2.2.0.0 = 2.电视的 HDMI 端口、2.交换机/AV 接收器的 HDMI 端口
* 4.1.2.0 = 4. 电视的 HDMI 端口，1. AV 接收器/切换器的 HDMI 端口，2. 下一个 AV 接收器/切换器的 HDMI 端口

这应该给出一个基本的想法。 0 表示路径正在结束。

设备的物理地址是固定的，除非将其重新插入不同的 HDMI 端口（或之前从电视上看到的任何设备）。

#### 每个设备的状态
对于每个设备，都会创建以下状态：

* info.active = 最近看到设备并且逻辑地址应该是正确的
* info.cecVersion = 应为 1.4，确定功能
* info.lastSeen = CEC 总线上设备发出的最后一条消息
* info.logicAddress = 数字形式的逻辑地址
* info.ologicalAddressHex = 十六进制数形式的逻辑地址（自己的命令需要）
* info.Name = CEC总线中设备设置的名称
* info.physicalAddress = 物理地址
* info.Vendor = 设备的供应商
* activeSource = 该设备是活动源吗？可以将此设备切换为活动源
* menuStatus = 让设备由电视遥控器控制
* state = 设备的电源状态（允许您打开/关闭它，如果支持的话）
* createButtons = 按此处为 .buttons 子文件夹中的按钮生成状态。
* Buttons.time = 按下按钮的时间（默认 500 毫秒）。

＃＃ 纽扣
按钮按下并不适用于所有设备，有些设备可能需要与 ioBroker 设备建立有效连接才能通过 CEC 总线进行控制。
对于FireTV来说它工作得很好。
要测试按钮按下情况，请按设备中的`createButtons`按钮，并在某些情况下测试一些创建的按钮。电源适用于很多设备。

#### 全球国家
全局状态有以下几种：

* active-source = 当前活动源的物理地址（可设置为切换输入）
* arc = 音频回传通道处于（激活）状态，可以在此处（取消）激活它
* 静音=静音音频系统
* raw-command = 直接向 cec-client 发送命令（例如来自 http://www.cec-o-matic.com/ 的 'scan' 或 tx + CEC 命令）
* StandbyAll = 将所有设备置于待机状态
* systemAudio = 音频系统正在/未使用。通知设备应向 Audiosystem 发送音量/静音命令
* 音量=音频系统的音量，0=静音
* 音量增大/减小 = 改变音频系统的音量

#### 民意调查州
有一个子文件夹“poll”，其中包含大多数州的按钮状态。如果触发该按钮，适配器将在 CEC 总线上发出命令来轮询值并相应地设置状态（遗憾的是，并非所有设备都对轮询消息做出反应）。

＃＃＃＃ 要求
必须安装 cec 客户端。通常可以使用以下方式安装：

```
sudo apt install cec-utils
```

运行 iobroker（现在的“iobroker”）的用户需要访问 /dev/vchiq。您可能需要将 iobroker 用户添加到视频组中：

```
sudo usermod -a -G video iobroker
```

＃＃＃＃ 安装
在iobroker根目录（例如/opt/iobroker）中执行以下命令

```
npm install iobroker.cec2
```

或者从管理网页安装。

＃＃ 配置
* osd 名称：此名称将报告给其他设备，例如您的电视。您可能需要在那里选择 ioBroker 以在 ioBroker 中接收远程控制。
* 设备类型：您可以设置设备类型，请参阅上面逻辑地址的讨论以了解这意味着什么。使用您没有的设备类型。
* 防止未命名设备：有时设备在某些情况下不会报告其名称（例如 Nintendo Switch 在待机时不会报告其名称，但会自行宣布）。在这种情况下，适配器可能会在其物理地址（即数字）下创建设备的副本。您可以启用此选项来防止它。

## 脚本示例：
有关帮助/修复多媒体设置的一些示例脚本，请参阅[示例脚本](doc/ExampleScripts.md)。

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.1 (2023-09-06)
* dependency updates.
* sending commands is now more reliable.
* more error handling

### 0.1.0 (2021-02-18)
* add more translations.
* add more options (poll TV power).

### 0.0.8 (2021-02-14)
* Switched from unmaintained dependency to own code to control cec-monitor binary.
* Swtiched from event-stream to readline.
* Probably fixed missed incomming events.

### 0.0.7 (2021-01-24)
* fix warnings

### 0.0.6 (2021-01-02)
* update dependencies

## License
MIT License

Copyright (c) 2020-2023 Garfonso <garfonso@mobo.info>

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