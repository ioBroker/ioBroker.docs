---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.cec2/README.md
title: ioBroker.cec2
hash: EMAqD2sH3brmb4L8tLeFJLuQJv73syqnJHv+aKcHCXI=
---
![标识](../../../en/adapterref/iobroker.cec2/admin/cec2.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.cec2.svg)
![下载](https://img.shields.io/npm/dm/iobroker.cec2.svg)
![安装数量](https://iobroker.live/badges/cec2-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/cec2-stable.svg)
![NPM](https://nodei.co/npm/iobroker.cec2.png?downloads=true)

# IoBroker.cec2
**测试：** ![测试与发布](https://github.com/iobroker-community-adapters/ioBroker.cec2/workflows/Test%20and%20Release/badge.svg)

HDMI CEC适配器

您可以使用HDMI CEC功能来监控/控制设备。大多数现代电视和多媒体设备都在一定程度上支持CEC功能。

## 信息
启动时，此适配器运行 cec-client 并轮询 HDMI 总线上的所有设备。对于每个 CEC 设备，都会在 ioBroker 中创建一个设备。设备的 OSDName 将成为其在 ioBroker 中的 ID（因为它不应该改变且易于阅读）。

如果在运行时出现新的设备，它们也会被添加到 ioBroker 中。

#### CEC地址
关于 CEC 地址的简要介绍，您可以跳过此部分，但如果您对下面的描述感到困惑，可以阅读此处。

CEC中有两种类型的地址。两者都很重要。

##### 逻辑地址
逻辑地址是一个介于 0 到 15 之间的数字（或通常使用的十六进制 F）。该数字定义了设备的类型：

* 0 = 电视
* 5 = 音响系统
* 4、8、11 = 播放
* 1、2、9 = 录音
* 3、6、7、10 = 调谐器

其余地址分别为保留地址（12、13）、免费地址（14）和未注册/广播地址（15）。使用这些地址的设备通信受到限制。

逻辑地址是动态分配的。这意味着，某一天播放设备 A 被分配了地址 4，播放设备 B 被分配了地址 8。但第二天，它们的开机顺序可能不同，A 的地址变为 8，B 变为 4。（不过，有些设备始终处于 CEC 总线激活状态，因此会保留其原有地址。）如果同类型设备过多（例如，4 个播放设备），则逻辑地址必须重用，这种情况会发生。适配器会尝试处理这种情况。

逻辑地址用于寻址消息和报告。

ioBroker 也需要一个逻辑地址才能接收来自总线的报告。因此，请将适配器配置为已知有空闲逻辑地址的设备类型（例如，录制设备）。

##### 物理地址
物理地址基于设备所使用的 HDMI 端口。它本质上是指向设备的端口号路径，由四个以点分隔的数字组成。例如：

* 0.0.0.0 = 电视
* 1.0.0.0 = 1. 电视机的HDMI接口
* 2.0.0.0 = 2. 电视的HDMI接口
* 2.2.0.0 = 电视机的 2 个 HDMI 端口，切换器/AV 接收器的 2 个 HDMI 端口
* 4.1.2.0 = 4. 电视机的 HDMI 端口，1. AV 接收器/切换器的 HDMI 端口，2. 下一个 AV 接收器/切换器的 HDMI 端口

这样应该能让你有个基本概念。0 表示路径结束。

除非将设备重新插入不同的 HDMI 端口（或电视机之前的任何设备），否则设备的物理地址是固定的。

每个设备的状态
每个设备都会创建以下几种状态：

* info.active = 设备最近被检测到，逻辑地址应该正确
* info.cecVersion = 应为 1.4，决定功能
* info.lastSeen = 来自 CEC 总线上设备的最后一条消息
* info.logicalAddress = 逻辑地址（数字）
* info.logicalAddressHex = 逻辑地址的十六进制数（自身命令需要用到）
* info.Name = CEC 总线中设备集的名称
* info.physicalAddress = 物理地址
* info.Vendor = 设备的供应商
* activeSource = 该设备是否为当前活动源？能否将此设备切换为活动源？
* menuStatus = 允许设备通过电视遥控器控制
* state = 设备的电源状态（如果支持，可以打开/关闭设备）
* createButtons = 在此处为 .buttons 子文件夹中的按钮生成状态。
* buttons.time = 按下按钮的时间（默认为 500 毫秒）。

按钮
并非所有设备都能通过按键控制，有些设备可能需要与 ioBroker 设备保持连接才能通过 CEC 总线进行控制。

Fire TV 的按键控制功能运行良好。

要测试按键功能，请按下设备上的 `createButtons` 按钮，并在一些情况下测试已创建的按键。电源控制功能适用于大多数设备。

全球国家
全球共有以下几种状态：

* active-source = 当前活动源的物理地址（可设置为切换输入）
* arc = 音频回传通道处于（非）激活状态，或许可以在这里将其（停用）激活。
* 静音 = 静音 音频系统
* raw-command = 直接向 cec-client 发送命令（例如“scan”或 tx + 来自 http://www.cec-o-matic.com/ 的 CEC 命令）
* standbyAll = 将所有设备置于待机状态
* systemAudio = 音频系统是否正在使用/未使用。通知设备是否应向音频系统发送音量/静音命令。
* 音量=音频系统的音量，0=静音
* 音量增大/减小 = 更改音频系统的音量

#### 民意调查州
有一个名为“poll”的子文件夹，其中包含大多数状态的按钮状态。如果按钮被触发，适配器将通过 CEC 总线发出命令来轮询该值并相应地设置状态（但遗憾的是，并非所有设备都会响应轮询消息）。

＃＃＃＃ 要求
需要安装 cec-client。通常可以使用以下命令安装：

```
sudo apt install cec-utils
```

运行 iobroker 的用户（现在名为“iobroker”）需要访问 /dev/vchiq。为此，您可能需要将 iobroker 用户添加到 video 用户组：

```
sudo usermod -a -G video iobroker
```

＃＃ 配置
* OSD 名称：此名称将报告给其他设备，例如您的电视。您可能需要在电视上选择 ioBroker 才能在 ioBroker 中接收遥控器信号。
* 设备类型：您可以设置设备类型，请参阅上文关于逻辑地址的讨论以了解其含义。请使用数量较少的设备类型。
* 防止创建未命名设备：有时设备在特定情况下不会报告其名称（例如，Nintendo Switch 在待机状态下不会报告名称，但会发出语音提示）。在这种情况下，适配器可能会在其物理地址（即数字地址）下创建设备的副本。您可以启用此选项来防止这种情况发生。

## 脚本示例：
有关一些有助于/修复多媒体设置的示例脚本，请参阅 [示例脚本](doc/ExampleScripts.md)。

## Changelog

<!--
	PLACEHOLDER for next version:
	### __WORK IN PROGRESS__
-->

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (mcm1957) Adapter requires node.js >= 20 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now
- (mcm1957) Dependencies have been updated

### 0.1.3 (2024-07-04)
* remove unnecessary files from npm package

### 0.1.2 (2024-06-04)
* prevent crash
* try restart in case of error with cec-client

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

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License


Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2020-2024 Garfonso <garfonso@mobo.info>

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