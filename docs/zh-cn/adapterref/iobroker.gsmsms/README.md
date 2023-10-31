---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.gsmsms/README.md
title: ioBroker.gsmsms
hash: dunlSMGPp9mJWEwiLsW+jZKUNdPBGcuyXoTQ6r32bAY=
---
![标识](../../../en/adapterref/iobroker.gsmsms/admin/gsmsms.png)

![安装数量](https://iobroker.live/badges/gsmsms-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/gsmsms-stable.svg)
![NPM版本](https://img.shields.io/npm/v/iobroker.gsmsms.svg)
![下载](https://img.shields.io/npm/dm/iobroker.gsmsms.svg)

# IoBroker.gsmsms
![测试与发布](https://github.com/forelleblau/ioBroker.gsmsms/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 gsmsms 适配器
使用 GSM 硬件发送和接收 SMS。

＃＃ 硬件
任何连接到 ioBroker 设备串行端口的 GSM 硬件（屏蔽、冲浪棒）。
GSM 模块/棒需要大量电力。请保证充足的电力供应。

某些设备必须设置为正确的串行通信模式（请参阅“usb_modeswitch”）。

＃＃ 设置
### 端口和连接设置
#### 串行端口路径 - 必需。
例如`/dev/ttyUSB0` 或 `/dev/serial/by-id/xxxxxxxxxxx`（by-id 更稳定，ttyUSBx 可以在重新启动后更改）

有些设备会暴露多个 USB 端口，因此您可能需要尝试一下。最有可能的“第一个”会起作用，但可能不会传递“传入消息通知”，然后您可以尝试另一个并发送短信，看看几秒钟后是否收到（在华为上，这是第三个端口为例）。

#### 您的 SIM 卡 PIN 码
如果您的 SIM 卡受 PIN 码保护，请提供 PIN 码，初始化期间将使用该 PIN 码解锁 SIM 卡（空，表示“SIM 卡上不存在 PIN 码”）。

<!--

#### 连接方式
##### 始终开放
适配器启动后立即打开调制解调器连接。传入和传出的短信会立即发送。适配器关闭时到达的短信将由下一个适配器启动时发送（根据您的 SIM 卡容量）。

##### 检索间隔
传出短信会立即发送。根据指定的时间间隔定期检索传入的短信。调制解调器连接仅用于发送和检索 SMS。

##### 仅发送
该适配器仅用于发送短信。所有传入的 SMS 都会被忽略（可能会保存到 SIM 卡中，但不会检索到适配器中）。
-->

### GSM 设置
为了不耗尽 SIM 卡内存，所有短信在发送/读取后都会从 SIM 卡中删除。使用例如“历史记录” - 用于存储消息或任何其他方便的解决方案的适配器。

|名称 |类型 |默认 |描述 |
| --------------------------- | ------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|传入短信指示 |布尔 |真实|使调制解调器能够通知已收到新的 SMS 消息。 |
|启用串联 |布尔 |真实 |将串联的消息作为一条接收。 |
|自定义 Iinit 命令 |字符串| |如果您的设备需要自定义初始化命令，可以提供该命令并将在 PIN 检查后使用。即某些设备需要“AT + CPMS =“SM”，“SM”，“SM”'才能获得正确的存储集。该命令预计返回 `'OK'`（空，表示“没有用于 init 的自定义命令”）。请参考您的 GSM 设备规格。 |
| CNMI 当调制解调器打开/关闭时 |字符串| '2,1,0,2,0' / '2,0,2,2,1' |定义消息是否保存在 SIM 卡上或立即传送。请参考您的 GSM 设备规格。 |

<!--|来电指示|布尔 |假 |接听电话时收到`'onNewIncomingCall'`事件。 |-->

### 串口设置
请参阅您的 GMS 设备规格（Google 在大多数情况下会提供帮助）

|名称 |类型 |默认|描述 |
| -------- | ------- | ------- | ------------------------------------------------------- |
|波特率|数量 | 19200 | 19200端口的波特率。 |
|数据位 |数量 | 8 |必须是以下之一：8、7、6 或 5。 |
|停止位 |数量 | 1 |必须是以下之一：1 或 2。 |
|平价 |字符串| “无” |必须是以下之一：“无”、“偶数”、“标记”、“奇数”、“空格”。 |
| rtscts |布尔 |假 |流量控制设置|
|克森 |布尔 |假 |流量控制设置|
|关闭 |布尔 |假 |流量控制设置|
| xany |布尔 |假 |流量控制设置|

### 其他设置和建议
#### 指定为适配器 - 对象 (`admin.x`)
- 您的姓名（默认为 `ownNumber`），最大长度为 16 个字符。
-   你的电话号码。
- SMS 操作模式（`PDU` 或 `SMS`，默认且推荐使用`PDU`）。

所有输入都必须使用 ack=false 进行！

#### 收件箱/发件箱 - 历史记录
通过激活 `inbox.messageRaw` - 对象和 `sendSMS.messageRaw` - 对象的历史记录适配器，您可以获得 SMS 流量的完整收件箱和发件箱。

<!--

#### 短信 - 错误
当返回错误并且错误源自设备时（因此与设备的交换在技术上是成功的），则应在错误消息中列出错误代码，例如“+CMS 错误：500”。错误消息显示在“警告”级别的日志中，并存储在`info.error`对象中。
可以找到可能的错误代码及其含义的（不完整）列表，例如位于 <https://www.activexperts.com/sms-component/gsm-error-codes/>。
-->

## 功能
### 接收短信
传入的 SMS 会写入 `inbox.*` - 对象。 `inbox.messageRaw` 可用作进一步操作的触发器（例如通过电子邮件适配器转发传入的短信）。

＃＃＃ 发简讯
要发送短信，请填写`sendSMS.recipient, sendSMS.message` 和可选的`sendSMS.alert`，然后按`sendSMS.send` - 按钮。或者使用以下形式的字符串设置 `sendSMS.messageRaw` - 对象并 ack=false：`{"recipient": "Number", "message":"Yourtext", "alert":"false"}`。

此适配器还为其他脚本的 blockly 和 sendTo 功能提供了一个 comm-block (sendTo("gsmsms._InstanceNo_", "send", {text: '_yourText_',recipient: '_phonenumber_',alert: '_false/true_'} ）；）。

### 执行AT+命令
！请务必知道您在设置 AT+ 命令时做什么，这是您的 SIM 卡/设备。

AT+命令以`admin.atCommandSLR`的格式发送，格式为`AT+XXXXy`。
发送您喜欢的任何命令，但请注意，您只会看到响应的最后一行。

## 串口-gsm
该适配器基于[串口-GSM 插件](https://github.com/zabsalahid/serialport-gsm)，用于与 GSM 调制解调器通信，主要用于 SMS。

## 开发者手册
本部分适用于开发人员。稍后可以删除

＃＃＃ 入门
您快完成了，只剩下几步了：

1. 前往 [main.js](main.js) 并开始编程！

### 最佳实践
我们收集了一些有关 ioBroker 开发和编码的 [最佳实践](https://github.com/ioBroker/ioBroker.repositories#development-and-coding-best-practices)。如果您是 ioBroker 或 Node.js 的新手，您应该查看它们。如果您已经有经验，您也应该看看它们 - 您可能会学到新的东西:)

### `package.json` 中的脚本
为了您的方便，预定义了几个 npm 脚本。您可以使用`npm run <scriptname>`运行它们

|脚本名称 |描述 |
\|-------------\|-------------\|
\| `test:js` |执行您在 `*.test.js` 文件中定义的测试。 |
\| `test:package` |确保您的`package.json`和`io-package.json`有效。 |
\| `test:unit` |使用单元测试测试适配器启动（快速，但可能需要模块模拟才能工作）。 |
\| `test:integration` |使用 ioBroker 的实际实例测试适配器启动。 |
\| `test` |对包文件和测试执行最小测试运行。 |
\| `check` |对您的代码执行类型检查（不编译任何内容）。 |
\| `lint` |运行`ESLint`来检查代码是否存在格式错误和潜在错误。 |
\| `release` |创建新版本，请参阅[`@alcalzone/release-script`](https://github.com/AlCalzone/release-script#usage)了解更多详细信息。 |

### 编写测试
如果做得正确，测试代码是非常宝贵的，因为它让您有信心更改代码，同时准确地知道是否以及何时出现问题。关于测试驱动开发主题的好读物是<https://hackernoon.com/introduction-to-test-driven-development-tdd-61a13bc92d92>。
尽管在代码之前编写测试一开始可能看起来很奇怪，但它有非常明显的优点。

该模板为您提供适配器启动和包文件的基本测试。
建议您将自己的测试添加到其中。

### 发布适配器
使用 GitHub Actions，每当您推送与 `v<major>.<minor>.<patch>` 形式匹配的新 git 标签时，您都可以在 npm 上启用自动发布。我们**强烈建议**您这样做。 `.github/workflows/test-and-release.yml` 中描述了必要的步骤。

由于您安装了发布脚本，因此您只需调用以下命令即可创建新版本：

```bash
npm run release
```

发布脚本的其他命令行选项在 [release-script 文档](<https://github.com/AlCalzone/release-script#command-line> )中进行了解释。

要在 ioBroker 中发布您的适配器，请参阅[ioBroker.存储库](https://github.com/ioBroker/ioBroker.repositories#requirements-for-adapter-to-get-added-to-the-latest-repository)的文档。

### 使用 dev-server 手动测试适配器
由于您设置了`dev-server`，您可以使用它来运行、测试和调试您的适配器。

您可以通过从您的开发目录调用来启动`dev-server`：

```bash
dev-server watch
```

然后，ioBroker.admin 界面将在 <http://localhost:8081/> 可用

请参阅[`dev-server` 文档](https://github.com/ioBroker/dev-server#command-line)了解更多详情。

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

### 0.0.5

-   (forelleblau) bug fixed (adapter set "undefined" into state values)

### 0.0.4

-   (Apollon77) Optimizations, brush up to comply with ioBroker.repositories requirements

### 0.0.3

-   (forelleblau) dependencies updated, bugs fixed

### 0.0.2

-   (forelleblau) first published version

### 0.0.1

-   (forelleblau) initial release

## License

MIT License

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

<!--