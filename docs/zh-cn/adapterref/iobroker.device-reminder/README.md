---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.device-reminder/README.md
title: ioBroker.设备提醒
hash: 2fkXEtserWPGmdczF4XvV9xfGixFMyNxpDu36OzGe+A=
---
![标识](../../../en/adapterref/iobroker.device-reminder/admin/icon.png)

![安装数量（稳定）](http://iobroker.live/badges/device-reminder-stable.svg)
![安装数量（最新）](http://iobroker.live/badges/device-reminder-installed.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.device-reminder.svg)
![下载](https://img.shields.io/npm/dm/iobroker.device-reminder.svg)
![依赖状态](https://img.shields.io/david/xenon-s/iobroker.device-reminder.svg)
![执照](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![贝宝捐赠](https://img.shields.io/badge/paypal-donate%20%7C%20spenden-blue.svg)
![国家公共管理](https://nodei.co/npm/iobroker.device-reminder.png?downloads=true)

# IoBroker.设备提醒
![测试与发布](https://github.com/xenon-s/iobroker.device-reminder/workflows/Test%20and%20Release/badge.svg)

## 需要德语自述文件吗？<br> [德语自述文件](https://github.com/Xenon-s/ioBroker.device-reminder/blob/master/README_GER.md)
<br>

# 用于监控设备状态的适配器版本
该适配器可以通过测量插座检测设备是否已打开、正在运行或已关闭并做出反应。然后可以通过 Telegram、whatsapp、alexa、sayit、pushover 和电子邮件自动发出消息（每个设备可以进行多项选择）。也可以在该过程完成后自动关闭插座（也可以延迟）。在给定的运行时间下，可以为每个数据点输出警报（使用外部脚本，数据点仅提供真/假或在可视化中显示）。为此，只需在数据点“device-reminder.X.XXX.config.runtime max”中输入以分钟为单位的预选通时间就足够了。

# 应该考虑什么？
大多数设备的“实时消耗值（称为**”_energy“**）”的刷新间隔不应超过10秒，否则可能会导致消息非常延迟。适配器本身每 10 秒轮询一次值，并基于事件使用新值。这样可以保存系统<br>Tasmota 控制台中的命令：TelePeriod 10

# 每个设备可以做什么？
- 设备启动时的通知
- 相应设备操作结束时的通知
- 电报通知（可以有多个ID）
- Alexa 通知（可以有多个 ID）
- WhatsApp 通知（可以有多个 ID）
- Pushover 通知（可以有多个 ID）
- 电子邮件通知（可以有多个ID）
- 信号通知（可以有多个ID）
- 矩阵通知（可以有多个ID）
- 通知可以自由创建，也可以通过外部脚本指定
- 具有当前状态、实时消耗和上次发送的状态消息的数据点，以便在其他脚本中使用此适配器中的值
- 如果检测到进程已完成，则可以根据需要关闭设备（也可以延迟时间）
- 每个数据点可以暂时禁用语音助手
- 以分钟为单位的运行时间监控：如果超过时间，则会向所有选定的信使发送警报

＃ 操作说明
## 提前基本的事情
对于每组设备、Alexa 等，都有一个“检查输入”按钮。如果单击此按钮，则会检查现有条目的合理性，并且您会立即得到所有条目是否正确的答案。如果您进行了更改，则必须始终单击此按钮！该按钮出现时必须始终单击！<br> ![check_btn_false.png](admin/pictures/check_btn_false.png)<br> ![check_btn_true.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/check_btn_true.png)

## 创建设备
![添加设备.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/addDevice.png)

- **设备名称**：可自由选择的名称
- **设备类型**：这里要选择是哪个设备，这样适配器中的计算才能正确执行
- **消耗**：通过单击带有三个白点的按钮，您的对象管理将打开。您必须选择显示**当前实时消耗**的数据点。
- **打开/关闭**：单击带有三个白点的按钮以打开对象管理。您必须选择打开/关闭**套接字的数据点（不是强制性的）。如果未选择此选项，则不会自动关闭。
- **开始文本**：设备启动时应发送的通知（也可以是特殊字符）
- 结束文本**：设备完成操作时发送的通知（也可以是特殊字符）

在 **Starttext** 和 **Endtext** 您还可以从外部数据点获取消息。设备状态更改后，从数据点延迟 1 秒读取此消息。这样您就可以从外部脚本获取消息。适配器自动检测消息是否来自数据点或者是否只是手动输入。要选择数据点，只需单击带有三个白点的按钮，然后选择相应的数据点。 **请注意**：只能使用数据点**或**手动输入的消息！<br>

# 配置设备
![配置设备.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/configureDevices.png)

- **激活**：默认激活。您可以在此处暂时停用设备，使其不再发送通知。
- 设备**：将自动创建
- **Alexa**：所有以前创建的 Alexa 都列在此处，可以通过单击添加
- **sayit**：所有以前创建的 sayit 设备都列在此处，可以通过单击添加
- **telegram**：所有之前创建的 telegram 用户都列在这里，可以通过点击添加
- **whatsapp**：所有先前创建的 Whatsapp 用户将在此处列出，并且可以通过单击来添加
- **pushover**：所有之前创建的pushover用户都列在这里，可以通过点击添加
- **电子邮件**：所有先前创建的电子邮件用户将在此处列出，并且可以通过单击它们来添加
- **信号**：所有先前创建的信号用户都列在此处，可以通过单击来添加
- **矩阵**：所有先前创建的矩阵用户都列在此处，可以通过单击来添加
- **关闭延迟**：在这里您可以选择输入**分钟**的超时时间。超时后，插座将关闭*如果自动关闭已激活*。设备的结束通知不受超时影响！仅当在“设备”下还存放了关闭数据点时才可使用。
- **取消检测**：如果激活，适配器会尝试检测设备是否在通知之前已被手动关闭，然后不再通知。

点击“**保存并关闭**”后，现在会在*Objects -> device-reminder* 下为每个新创建的设备创建一个文件夹，其中

- 请勿打扰（如果激活，将不会通过**语音提醒**发送任何消息）
- 最大运行时间
- 设备的当前状态
- 运行时警报
- 平均消费（可用作确定您自己的阈值的辅助工具）
- 最后运行的 JSON 格式
- 最后一次运行时间为 hh:mm:ss
- 当前的生活消费
- 给使者的消息
- 当前运行时间（hh:mm:ss）
- 当前运行时间（以毫秒为单位）

被展示。<br>

## 创建 Alexa
![添加Alexa.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/addAlexa.png)

- **名称**：可自由选择的名称，也可以使用特殊字符。
- alexa2/../announcement'/'speak'**：在这里您必须选择让 Alexa 说话的数据点。要选择数据点，只需单击带有三个小白点的按钮即可。
- **音量 0-100**：Alexa 说话的音量（从 0 - 100%）。

最后 2 个字段可用于创建允许 Alexa 进行语音输出的时间段。默认情况下，该时段的有效时间为 00:00 - 23:59。

- **有效自**：通知期的开始时间
- **有效直至**：通知期的结束时间

## 创建 SayIt 设备
![添加Sayit.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/addSayit.png)

- **名称**：可自由选择的名称，也可以使用特殊字符。
- **'sayit/../text'**：在相应的 sayIt 设备文件夹中选择数据点“文本”。这里发送文本输出。
- **音量 0-100**：sayit 设备说话的音量（从 0 - 100%）
- **有效自**：通知期的开始时间
- **无效自**：通知期的结束时间

## 创建pushover用户
![添加Pushover.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/addPushover.png)

- **名称**：可自由选择的名称，也可以使用特殊字符。
- **Pushover 实例**：消息要发送到的实例
- **主题**：消息的可选主题
- **设备 ID**：消息应发送到的可选设备 ID
- **优先级**：发送的优先级
- **声音**：Pushover 收到消息时播放的声音。

## 创建电子邮件用户
![添加电子邮件.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/addEmail.png)

- **名称**：可自由选择的名称，也可以使用特殊字符。
- **发件人地址**：发送电子邮件的电子邮件地址
- **收件人地址**：接收消息的电子邮件地址

## 创建信号用户
![添加信号.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/addSignal.png)

- **名称**：可自由选择的名称，也可以使用特殊字符。
- **信号实例**：要发送到的已安装实例。
- **电话**：可选手机号码

## 创建电报用户
![添加电报.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/addTelegram.png)

- **群组**：如果选中，则必须指定聊天 ID 才能发送到群组聊天
- **名称**：可自由选择的名称，也可以使用特殊字符。
- **Telegram 实例**：要发送到的已安装实例。
- **用户名/名字**：存储在 Telegram 适配器中的名称
- **聊天ID**：仅当您想发送到群组时才必须填写

## 创建whatsapp用户
![添加Whatsapp.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/addWhatsapp.png)

- **名称**：可自由选择的名称，也可以使用特殊字符。
- **'whatsapp-cmb/../sendMessage'**：消息应发送到的 Whatsapp 适配器的数据点。

# 默认设备
![默认设备.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/default-devices.png) 这些值是在数月的时间内在众多测试人员的帮助下确定的。更改值可能会导致设备不再被正确记录，从而导致错误报告。

# 自定义设备
![自定义设备.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/custom-devices.png) 这些值可以由用户自定义然后使用。以下是解释：

- **“启动”阈值（瓦特）**：以瓦特为单位的起始值，必须超过该值才能将设备识别为已启动。
- **阈值“结束”（瓦特）**：最终值（以瓦特为单位）必须低于该值才能将设备识别为终止。
- **“待机”阈值（瓦特）**：指示设备“关闭”或“待机”的阈值。如果当前计算的值低于 **待机** 阈值，则设备将被识别为已关闭。
- **起始值的数量**：这指定必须连续**超过“起始值”的频率。一旦低于该值将导致启动中止。这些值的平均值必须高于设备的启动值才能被识别为已启动。<br>

*示例：该值应为10W，且连续超过3次。 1. 15W，2. 1W，15W => 开始阶段被中止，因为第二个值低于 10.*。

- **最终值的数量**：这指定在计算设备是否准备就绪之前要记录多少个值。这里的值越少，结果就越不准确，并且误报的风险也会增加。值越高，记录越准确。然而，缺点是完成的消息发送时有很大的延迟。仅当达到“最终值数量”并且平均功耗低于“阈值‘结束’（瓦特）”时，才会检测到结束。

*简短的计算示例：*消耗值每 10 秒出现一次。 **阈值“结束”（瓦特）**设置为 50，**结束值的数量**设置为 100。设备被识别为启动后，100 个值（*需要 100 个值 x 10 秒 = 1000 秒*) 被记录下来，然后才形成平均值。如果低于 50，则大约经过16.5 分钟（我们记得**最终值的数量** = 100 个值）**完成** 被识别并发出一条消息（如果已配置）。如果该值高于 50，则不会发生任何情况，因为设备仍在运行。现在，每个附加值都会替换最旧的值，并在每个新值之后计算新的平均值。<br>

＃ 支持
**如果你喜欢我的作品:**<br>

[![贝宝](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=3EYML5A4EMJCW&source=url)<br><br>

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 3.0.1 (2023-10-18)
* (xenon-s) Update testing: [issue #325](https://github.com/Xenon-s/ioBroker.device-reminder/issues/325)
* (xenon-s) bugfix: [issue #327](https://github.com/Xenon-s/ioBroker.device-reminder/issues/327)
* (xenon-s) bugfix: [issue #328](https://github.com/Xenon-s/ioBroker.device-reminder/issues/328)
* (xenon-s) bugfix: [issue #329](https://github.com/Xenon-s/ioBroker.device-reminder/issues/329)

### 3.0.0 (2023-10-18)
**Breaking Changes**
* Made basic changes to the adapter structure, because there were numerous problems with the new "js-Controller 5.x". It is mandatory to reinstall the adapter!
* Numerous bug fixes
* New messengers added
* Admin GUI fundamentally reworked
* Whatsapp and Telegram must now be created manually
* (xenon-s) Fixes for js-controller 5.*
* (xenon-s) bugfix: [issue #278](https://github.com/Xenon-s/ioBroker.device-reminder/issues/278)
* (xenon-s) bugfix: [issue #273](https://github.com/Xenon-s/ioBroker.device-reminder/issues/273)
* (xenon-s) bugfix: [issue #267](https://github.com/Xenon-s/ioBroker.device-reminder/issues/267)
* (xenon-s) bugfix: [issue #218](https://github.com/Xenon-s/ioBroker.device-reminder/issues/218)
* (xenon-s) bugfix: [issue #207](https://github.com/Xenon-s/ioBroker.device-reminder/issues/207)
* (xenon-s) GUI Fixes "devices" : switch may be empty, but then no longer selectable 
* (xenon-s) add: [issue #258: Signal Messenger added](https://github.com/Xenon-s/ioBroker.device-reminder/issues/258)
* (xenon-s) add: [issue #245: Matrix added](https://github.com/Xenon-s/ioBroker.device-reminder/issues/245)
* (xenon-s) add: [issue #185: pushover device id added](https://github.com/Xenon-s/ioBroker.device-reminder/issues/185)
* (xenon-s) bugfix [issue #210](https://github.com/Xenon-s/ioBroker.device-reminder/issues/210)
* (xenon-s) bugfix [issue #169](https://github.com/Xenon-s/ioBroker.device-reminder/issues/169)
* (xenon-s) bugfix [issue #297](https://github.com/Xenon-s/ioBroker.device-reminder/issues/297)

### 1.2.9 (2021-06-22)
* (xenon-s) bugfix: error catching JSON last operations doesn't work

### 1.2.4 (2021-06-13)
* (xenon-s) bugfix: incorrect JSON format

### 1.2.3 (2021-06-13)
* (xenon-s) bugfix: [issue #76](https://github.com/Xenon-s/ioBroker.device-reminder/issues/76) messages from datapoint were not displayed
* (xenon-s) bugfix: [issue #75](https://github.com/Xenon-s/ioBroker.device-reminder/issues/75) "undefined is not a valid state"

### 1.2.1 (2021-05-01)
* (xenon-s) Adapter structure redesigned to classes
* (xenon-s) Admin UI design and inputs made more user friendly
* (xenon-s) Telegram bug fixed
* (xenon-s) Fix for js-controller 3.3.*
* (xenon-s) new datapoints added (runtime max, last runs as JSON, last runtime, runtime max, runtime alert)
* (xenon-s) add: runtime-alert

### 1.0.0 (2021-01-05)
* (xenon-s) initial commit version 1.0

## License

MIT License

Copyright (c) 2023 xenon-s <ente_s@hotmail.de>

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