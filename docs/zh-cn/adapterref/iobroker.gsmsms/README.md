---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.gsmsms/README.md
title: ioBroker.gsmsms
hash: ykSSjcimEZZQZ7armAhD/4UGD7kCyj1GonMOufBqzs0=
---
![标识](../../../en/adapterref/iobroker.gsmsms/admin/gsmsms.png)

![安装数量](https://iobroker.live/badges/gsmsms-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/gsmsms-stable.svg)
![NPM 版本](https://img.shields.io/npm/v/iobroker.gsmsms.svg)
![下载](https://img.shields.io/npm/dm/iobroker.gsmsms.svg)

# IoBroker.gsmsms
![测试与发布](https://github.com/forelleblau/ioBroker.gsmsms/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 gsmsms 适配器
使用 GSM 硬件发送和接收短信。

＃＃ 硬件
任何连接到 ioBroker 设备串口的 GSM 硬件（例如扩展板、上网卡等）。

GSM 模块/上网卡需要大量电力，请确保电源供应充足。

有些设备必须设置为正确的模式才能进行串行通信（请参阅“usb_modeswitch”）。

＃＃ 设置
### 端口和连接设置
#### 串口路径 - 必填。
例如 `/dev/ttyUSB0` 或 `/dev/serial/by-id/xxxxxxxxxxx`（按 ID 更稳定，ttyUSBx 可能会随重启而改变）

有些设备会提供多个 USB 端口，所以你可能需要逐个尝试。第一个端口很可能可以工作，但可能无法接收“来信通知”，然后你可以尝试另一个端口，发送一条短信，看看几秒钟后是否能收到（例如，在华为设备上，这是第三个端口）。

#### 您的 SIM 卡密码
如果您的 SIM 卡受 PIN 码保护，请提供 PIN 码，初始化期间将使用该 PIN 码解锁 SIM 卡（空白表示“SIM 卡上不存在 PIN 码”）。

<!--

#### 连接模式
始终开放
适配器启动后立即建立调制解调器连接。收发短信即时送达。适配器断线期间收到的短信将在下次适配器启动时由适配器转发（取决于您的 SIM 卡容量）。

##### 检索间隔
短信即时发送。接收的短信会按照设定的时间间隔定期接收。调制解调器连接仅用于发送和接收短信。

仅发送
该适配器仅用于发送短信。所有收到的短信都将被忽略（可能已保存到 SIM 卡，但不会被适配器读取）。

-->

### GSM 设置
为避免SIM卡内存不足，所有短信在发送/阅读后都会从SIM卡中删除。您可以使用例如“历史记录”适配器或其他便捷方式来存储短信。

| 名称 | 类型 | 默认值 | 描述 |
| --------------------------- | ------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 收到短信指示 | 布尔值 | true | 启用此功能后，调制解调器会在收到新短信时发出通知。 |
| 启用消息拼接 | 布尔值 | true | 将拼接后的消息视为一条消息接收。 |
| 自定义初始化命令 | 字符串 | | 如果您的设备需要自定义初始化命令，可以提供该命令，该命令将在 PIN 码验证后使用。例如，某些设备需要“AT+CPMS="SM","SM","SM"”才能获取正确的存储集。该命令预期返回 `'OK'`（空，表示“没有自定义初始化命令”）。请参考您的 GSM 设备规格。 |
| CNMI 调制解调器打开/关闭状态 | 字符串 | '2,1,0,2,0' / '2,0,2,2,1' | 定义消息是保存在 SIM 卡上还是立即发送。请参考您的 GSM 设备规格。 |

<!--| 来电指示 | 布尔值 | false | 收到来电时接收 `'onNewIncomingCall'` 事件。 |-->

### 串口设置
请参考您的GMS设备规格（大多数情况下，谷歌搜索会有所帮助）。

| 名称 | 类型 | 默认值 | 描述 |
| -------- | ------- | ------- | ------------------------------------------------------- |
| 波特率 | 数字 | 19200 | 端口的波特率。 |
| dataBits | number | 8 | 必须是以下数字之一：8、7、6 或 5。 |
| stopBits | 数字 | 1 | 必须是 1 或 2 之一。 |
| 奇偶校验 | 字符串 | "none" | 必须是以下值之一：'none'、'even'、'mark'、'odd'、'space'。 |
| rtscts | 布尔值 | false | 流量控制设置 |
| xon | 布尔值 | false | 流量控制设置 |
| xoff | 布尔值 | false | 流量控制设置 |
| xany | 布尔值 | false | 流量控制设置 |

### 其他设置和建议
#### 指定为适配器对象 (`admin.x`)
- 你的名字（默认为 `ownNumber`），最大长度为 16 个字符。
- 您的电话号码。
- 短信操作模式（`PDU` 或 `SMS`，`PDU` 为默认设置，推荐使用）。

所有输入都必须使用 ack=false！

#### 收件箱/发件箱 - 历史记录
通过激活 `inbox.messageRaw` 对象和 `sendSMS.messageRaw` 对象的历史记录适配器，您可以获得完整的短信收件箱和发件箱。

<!--

#### 短信错误
当返回错误且错误源自设备（即与设备的通信在技术上是成功的）时，错误消息中应列出错误代码，例如“+CMS ERROR: 500”。错误消息会以“警告”级别显示在日志中，并存储在 `info.error` 对象中。

您可以在例如 <https://www.activexperts.com/sms-component/gsm-error-codes/> 中找到（不完整的）错误代码及其含义列表。

-->

## 功能
### 接收短信
收到的短信会被写入 `inbox.*` 对象。`inbox.messageRaw` 可用作进一步操作的触发器（例如，通过电子邮件适配器转发收到的短信）。

### 发送短信
要发送短信，请填写 `sendSMS.recipient, sendSMS.message`，并可选择性填写 `sendSMS.alert`，然后按下 `sendSMS.send` 按钮。或者，将 `sendSMS.messageRaw` 对象设置为以下形式的字符串，并将 ack=false：`{"recipient": "Number", "message":"Yourtext", "alert":"false"}`。

此适配器还为 blockly 提供通信块，并为其他脚本提供 sendTo 功能（sendTo("gsmsms._InstanceNo_", "send", {text: '_yourText_',recipient: '_phonenumber_', alert: '_false/true_'});）。

### 执行 AT+ 命令
设置 AT+ 命令时，请务必清楚自己在做什么，这关系到您的 SIM 卡/设备。

AT+命令通过设置`admin.atCommandSLR`（格式为`AT+XXXXy`）发送。

您可以发送任何命令，但请注意，您只能看到响应的最后一行。

## 串口-gsm
该适配器基于 [串口GSM插件](https://github.com/zabsalahid/serialport-gsm)，用于与 GSM 调制解调器通信，主要用于短信。

## 鸣谢
如果没有 @forelleblau (https://github.com/forelleblau) 的出色工作，这个适配器是不可能实现的，他开发了该适配器的早期版本。

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now

### 1.0.0 (2024-11-23)
- (mcm1957) Adapter requires node.js 20 now.
- (mcm1957) Adapter requires js-controller 5.0.19 and admin 6.17.14 now.
- (mcm1957) Adapter has been moved to iobroker-community-adapters organization
- (mcm1957) Some issues reported by adapter checker have been fixed.
- (mcm1957) Dependencies have been update

### 0.0.6
- (forelleblau) jsonConfig.json, notifications-manager

### 0.0.5
- (forelleblau) bug fixed (adapter set "undefined" into state values)

### 0.0.4
- (Apollon77) Optimizations, brush up to comply with ioBroker.repositories requirements

### 0.0.3
- (forelleblau) dependencies updated, bugs fixed

### 0.0.2
- (forelleblau) first published version

### 0.0.1
- (forelleblau) initial release

## License

MIT License

Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2022-2023 forelleblau <mailto:marceladam@gmx.ch>

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