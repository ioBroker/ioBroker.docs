---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.broadlink2/README.md
title: ![Logo](./admin/broadlink2.png) 控制 BroadLink 兼容设备
hash: js1mQXxVwhLC6LCXSeKhIWLU1flXYjnv+LvKdEEGFbc=
---
# ![标识](../../../en/adapterref/iobroker.broadlink2/admin/broadlink2.png) 控制 BroadLink 兼容设备

![NPM 版本](http://img.shields.io/npm/v/iobroker.broadlink2.svg)
![已安装](http://iobroker.live/badges/broadlink2-installed.svg)
![下载](https://img.shields.io/npm/dm/iobroker.broadlink2.svg)
![特拉维斯-CI](http://img.shields.io/travis/frankjoke/ioBroker.broadlink2/master.svg)

[谷歌翻译的德语指南](https://translate.google.com/translate?sl=en&tl=de&u=https%3A%2F%2Fgithub.com%2Ffrankjoke%2FioBroker.broadlink2%2Fblob%2Fmaster%2FREADME.md)

[Русские инструкции переведены с гуглом](https://translate.google.com/translate?sl=en&tl=ru&u=https%3A%2F%2Fgithub.com%2Ffrankjoke%2FioBroker.broadlink2%2Fblob%2Fmaster%2FREADME.md)

## 适用于不同的 Broadlink 兼容 WLan 设备（RM++、SP++、A1、Floureon、S1C、LB1）的适配器
这是适用于多台 Broadlink 交换机（如 RM2、RM3、RM Plus、SP1、SP2、SP3、Honeywell SP2、SPMini、SPMini2、SPMiniPlus 以及它们的一些 OEM 产品）的 ioBroker 适配器。
还支持远程控制器，如 RM2、RM Mini、RM Pro Phicomm、RM2 Home Plus、RM2 Home Plus GDT、RM2 Pro Plus、RM2 Pro Plus2 和 RM2 Pro Plus BL。多个控制器将生成自己的条目，需要单独进行训练。
它会扫描网络以查找兼容设备并安装它们（目前仅限 SP 型交换机？）。

如果您了解了 RM* 的状态，然后重命名其名称，则状态 ID 也将更改为新名称！

如果您使用“code”+您的代码作为值（代码前面带有“CODE_”），或者更好的是（因为如果您重命名状态它会保留），那么您还可以在 LearnedStates 中创建自己的新命令，使用 admin.object 铅笔将字段“code”添加到本机并将十六进制代码放在那里（不带“CODE_”！）。

适配器具有固定状态，可以从 RM 设备发送代码或学习它们，它还可以发送单独的场景（多个设备上的操作）。

如果再次找不到在特定 IP 上配置的设备，它们将被标记为“不可访问”！如果它们再次连接，它们将可正常使用。

如果设备连续 5 分钟没有应答，则将其设置为无法访问。***notReachable*** 设备每扫描 x 次就会发出一条日志警告消息。经过几次扫描后，适配器将尝试在之前的相同 mac 地址上再次找到它们。

如果您永久删除旧设备或在路由器中重命名它们，请从 admin.objects 中删除它们！

适配器首先尝试通过设备名称查找设备，然后通过其 mac 地址查找设备。如果由于 IP 地址更改而导致名称更改，而 mac 地址保持不变，则设备将继续使用旧名称。如果设备更改为具有新 mac 的新设备，您可以在配置中使用重命名设备来使用旧设备名称。

### 关于投票的说明
* SP1 设备无法被轮询。
* 如果您仅使用 RM 设备，轮询可以设置为 2 分钟（120 秒），但不应设置得更高，否则它们可能无法重新授权
* 如果您使用可以手动切换的开关，那么 molling 应该是 30 秒到 1 分钟才能反映一分钟内的变化。

＃＃ 配置
* 在配置中输入网络地址的前缀，生成设备名称时应删除该前缀
* 输入轮询间隔的秒数。每次轮询时，系统都会询问除 SP1 之外的所有 SP* 设备开关状态。可以通过将轮询延迟设置为 0 来禁用此功能。在某些带有温度读数的 RM 设备上，温度也会更新。
* 您现在可以添加要查找/包含的设备的 IP 地址，这些设备也位于适配器网络之外的另一个网络上。在这种情况下，您需要确保运行适配器的计算机通过内部或外部路由表知道如何连接到该其他网络。
* 可以设置“使用 IP 接口”选项以使用指定的接口地址，如果运行 iobroker 的系统上有 lan 和 wlan，并且您不想在第一个接口上扫描而只想在 wlan 上扫描，这可能会有所帮助，如果在某些 docker 或 VM 环境中本地接口与外部接口不同，它也会有所帮助。您需要输入要用作源地址的接口的 IPv4 地址，否则适配器将使用 0.0.0.0 并仅监听所有本地接口。

## 如何学习 RM 上的代码
* 在 ioBroker 的对象中，您可以找到“broadlink2.[devicename].Learn 或 LearnRF（适用于“+”类型的设备）。
* 对于 RM(x)+ (Plus) 设备，您还可以获得一个特殊的 RS 扫描学习按钮 (_LearnRF)，它可以学习比正常 433MHz 更多的设备。
* 将此对象设置为 true。（您可以单击对象视图中的按钮）
* 现在在 30 秒内按下遥控器上的某些按钮。在正常模式下，短暂按下这些按钮，中间间隔一段时间，直到学会为止。
* 在 RF 扫描学习中，您需要先长按按钮约 10-20 秒，然后松开并等待 2-3 秒，然后再短暂按下它。
* 现在，对象“broadlink.[n].[devicename].LearnedState”内应该会出现一个新对象，其名称为“>>> Rename learned @ YYYYMMDDTHHmmSS”
* 您可以点击对象视图中的按钮来发送代码。
* 要重命名项目，请单击名称（以`_Rename_learned_`开头）并更改名称。它不应包含`，`，`。`或`；`以及其他一些字符，它们将被'_'替换；

也可以使用 [RM-桥](http://rm-bridge.fun2code.de/) 中的代码。
只需创建一个对象（状态、类型按钮），并在值前添加“CODE_”，或使用本机条目 `code`，而不添加任何“CODE_”。

## 关于新 RM4/LB1 设备的说明
* 一些新的 Broadlink 设备支持新的 Broadlink-Cloud 协议，当您使用较新的 Broadlink 应用程序将设备接入您的 wifi 网络时，该协议会自动选择。此新 Broadlink 协议与 Broadlink2 适配器不兼容，您无法使用此新协议的设备。
* 为避免此问题，请使用较旧的 Broadlink 应用程序（如“e smart home”或“e-control”）将设备接入网络，并确保您的手机与您想要接入的手机位于同一个 2.4GHz wifi 网络上！
* 这些较新的设备还需要每 5-10 分钟重新进行一次身份验证，适配器会自动执行。

## 使用场景
* 场景可以包含 ID 或名称以及以 `,` 分隔的数字。通常，ID 将在 100ms 的时间差内执行/发送，但如果您需要更长的暂停时间，则可以写入一个反映等待毫秒数的数字。例如，`SP:dose=1, 1000, RM:your.L.StereoEin, 1000, RM:your.L.TVEin` 将打开名为“SP:dose”的无线插头，然后等待一秒钟（实际上是 1.1 秒），打开立体声音响，再过一秒钟打开电视。您还可以切换其他适配器的设备，例如`hm-rpc.0.MEQ1435726.1.STATE=true` 将打开此 Homematic 设备！布尔状态可以用'=1/=on/=true/=ein' 切换，如果您不带 `=`，它将使用 true。要关闭设备，您可以用“=0/=false/=aus/=off”来结束它，这是必须关闭的！

## 使用状态
* 您还可以为您的设备创建状态，将开启和关闭命令组合为单一状态，可以像任何其他设备一样进行切换。
* 您需要在单独的列中列出打开和关闭状态的命令，这些命令可以是多个，以便状态知道您的设备何时被其中任何一个打开/关闭
* 如果你将状态设置为开或关，则将发送第一个开/关命令
* 如果仅存在一个命令，则开关将根据数值 1 发送相应的命令，这意味着如果收到“0”，它将发送第一个命令，如果收到“1”，它将发送第二个命令。通过这种方式，您可以在一个状态中模拟多个状态。
* 如果您仅使用“+”作为关闭命令，则需要提供 10 个以“，”分隔的开启命令，这些命令反映遥控器上的数字“0-9”。您可以发送 sstate 然后发送一个数字，如“123”（最大值为 9999），它将发送“1”、“2”和“3”，它们之间有 1/3 秒的延迟！这样，如果状态名称是 TVchannel，您只需写入“TVchannel=33”即可将电视上的频道设置为“33”。
* 如果您使用 `-number` 作为关闭命令，例如 `-17`，那么您可以将一个数字存储到状态中，其中 17 将被减去，并且开启状态中的第 (x-17) 项将被发送。这样，您可以为每个温度具有不同代码的设备设置不同的固定温度。

## 使用发送消息到适配器
适配器也能理解“sendTo”命令。

* `debug`：`sendTo('broadlink2.0','debug','on')`（也可以是 0,1,on,off,ein,aus,true,false）将打开调试模式。
* `get`: `sendTo('broadlink2.0','get', 'RM2:RMPROPLUS.Temperature'` 可以从设备请求数据，如 `{ val: 29.9, ack: true, ts: 1505839335870, q: 0, from: 'system.adapter.broadlink2.0', lc: 1505839335870 }` 返回
* `switch`：可以打开或关闭插头：`sendTo('broadlink2.0','switch','SP:your device id=on')`
* `switch_on`/`switch_off`: sendTo('broadlink2.0','switch_on','SP:你的设备id')`
* `send`：`sendTo('broadlink2.0','send','RM:yourdev._Learn')` 将开始学习，而 `sendTo('broadlink2.0','send','RM:yourdev.L.yourid')` 将发送代码。
* `send_scene`: `sendTo('broadlink2.0','send_scene','scene xxx ')` 会将消息作为文本发送，作为场景输出
* `send_code`: `sendTo('broadlink2.0','send_code','RM:your remote.CODE_xxxxx')` 将从 R:your name 发送 CODE_xxxx。

## Floureon 或 Beok313 恒温器
* 大多数数据都可以设置，可以通过将任何内容写入“_setTime”来设置时间，在这种情况下，设备的时间将设置为 ioBroker 系统时间。这也将在适配器启动时自动完成。

## 配置额外的 dnew 设备
* 您可以通过添加设备 ID（十六进制或十进制）和设备类别（列在此处（类别 = A1、MP1、RM、RMP、S1C、SP1、SP2、SP3P、T1）来添加使用相同协议的新设备。因此，您可以通过 0x01234=RMP 将适配器发现的十六进制 ID 为 0x1234 的未知设备添加到 RM 列表中。

## 重命名设备
* 设备通常会收到其网络主机名，或设备类型、ID 和 mac 地址的组合作为其名称，前两个字母为类型，前面带有“:”。您可以使用“T1:BroadLink-OEM-T1-fa-83-7c=Beok313”重命名此类设备，在这种情况下，将不使用原始名称，而是使用新名称“Beok313”。

＃＃ 调试模式
* 如果您在添加的新设备列表末尾添加一个“！”（即使它是空的），您可以将适配器设置为调试模式，即使它没有在管理员中设置为“信息”模式，它也会记录大量附加信息。

＃＃ 已知的问题
* 如果您多次学习相同的信号，则代码每次都可能不同。这无法更改。
* 有时如果设备不响应搜索，则无法找到设备。请重新扫描或重新启动适配器以重新启动新实例。

＃＃ 安装
使用 ioBroker 管理员，npm install iobroker.broadlink2 或从 <https://github.com/frankjoke/ioBroker.broadlink2>

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.3.0-alpha.2 (2024-05-15)
* (mattreim) Adapter migrated to jsonConfig
* (mcm1957) Dependencies have been updated

### 2.2.0 (2024-04-05)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 2.1.5

* beta to try to make 0x5f36 working

### 2.1.4

* bug corrections for RM4 temperatures & Humidity

### 2.1.2

* bug corrections for States and Scenes
* Names are now taken from DNS end which mean you may rename devices in router and set their fixed IP address there

### 2.1.0

* Added RM4 protocol for newest RM4 and RM3-Minis 
* Added LB1 Wifi bulb device support
* Added finding of devices if name or ip changes according to mac address
* Added support of devices in other netword with IP address
* Changed learning and device communication for all RM devices
* Re-write of 70% nof the code for new js-controllers and nodejs versions.

### 2.0.3

* changed to new myAdapter to support js-controller 2.0 and 3.0

### 2.0.1

* Can handle Floureon/Beko thermostats (now with MQTT)
* Can handle S1C security devices
* Names device after their name or with their mac to reduce possibility of renaming
* Can rename devices
* Support compact mode
* Can add device Id's/Types for new devices
* New communication routines to find & re-find devices
* New communication protocoll with devices which do not allow that devices can get commands from 2 sources intermixed

### 1.9.1

* added anothe RM Mini code

### 1.8.1

* Changed util.js and tests and added new devices

### 1.7.0

* Changed and corrected states which are created by A1-devices

### Todo for later revisions

* config of devices and codes in separate config tool

## License

The MIT License (MIT)

Copyright (c) 2024, iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2014-2020, frankjoke <frankjoke@hotmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.