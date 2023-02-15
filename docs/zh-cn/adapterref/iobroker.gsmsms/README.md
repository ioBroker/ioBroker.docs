---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.gsmsms/README.md
title: ioBroker.gsmsms 文件
hash: 7ihVBMqefOhG28Jdw/tb6ZwTYI/GSFbQMnFT3cR6ouE=
---
![标识](../../../en/adapterref/iobroker.gsmsms/admin/gsmsms.png)

![安装数量](https://iobroker.live/badges/gsmsms-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/gsmsms-stable.svg)
![NPM 版本](https://img.shields.io/npm/v/iobroker.gsmsms.svg)
![下载](https://img.shields.io/npm/dm/iobroker.gsmsms.svg)

#ioBroker.gsmsms
![测试和发布](https://github.com/forelleblau/ioBroker.gsmsms/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 gsmsms 适配器
使用 GSM 硬件发送和接收短信。

＃＃ 硬件
连接到您的 ioBroker 设备串行端口的任何 GSM 硬件（屏蔽、冲浪棒等）。
GSM 模块/棒需要大量功率。请确保充足的电力供应。

某些设备必须设置为正确的串行通信模式（参见“usb_modeswitch”）。

## 设置
###端口和连接设置
#### 串行端口的路径 - 必需。
例如`/dev/ttyUSB0` 或 `/dev/serial/by-id/xxxxxxxxxxx`（by-id 更稳定，ttyUSBx 可以随着重启而改变）

有些设备暴露了多个 USB 端口，因此您可能需要尝试一下。 “第一个”很可能会起作用，但可能不会传递“传入消息通知”，然后您可以尝试另一个并发送短信，看看是否在几秒钟后收到它（在华为上这是第三个端口作为例子）。

#### 您的 SIM 密码
如果您的 SIM 卡受 PIN 保护，请提供 PIN，它将在初始化期间用于解锁 SIM 卡（空，表示“SIM 卡上不存在 PIN”）。

<!--

#### 连接模式
##### 始终打开
适配器启动后立即打开调制解调器连接。传入和传出的 SMS 会立即传送。适配器关闭时到达的 SMS 将由下一个适配器 - 启动（根据您的 SIM 卡的容量）传送。

##### 检索间隔
传出短信立即发送。根据指定的时间间隔定期检索传入的 SMS。打开调制解调器连接仅用于发送和检索 SMS。

##### 仅发送
该适配器仅用于发送 SMS。所有传入的 SMS 都将被忽略（可能保存到 SIM 但未检索到适配器）。
-->

### GSM 设置
为了不耗尽 SIM 内存，所有短信在发送/阅读后都会从 SIM 中删除。使用例如'历史' - 用于存储您的消息的适配器或任何其他方便的解决方案。

|名称 |类型 |默认 |说明 |
| --------------------------- | ------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|传入短信指示 |布尔 |真 |使调制解调器能够通知已收到新的 SMS 消息。 |
|启用串联 |布尔 |真 |将串联的消息作为一个接收。 |
|自定义 Iinit 命令 |字符串 | |如果您的设备需要自定义初始化命令，可以提供该命令并将在 PIN 检查后使用。即一些设备需要'AT+CPMS="SM","SM","SM"'来获得正确的存储集。该命令应返回 `'OK'`（空，表示“没有用于 init 的自定义命令”）。请参考您的 GSM 设备规格。 |
|调制解调器打开/关闭时的 CNMI |字符串 | '2,1,0,2,0' / '2,0,2,2,1' |定义消息是保存在 SIM 卡上还是立即传送。请参考您的 GSM 设备规格。 |

<!--|来电指示 |布尔 |假 |接听电话时接收 `'onNewIncomingCall'` 事件。 |-->

### 串口设置
请参考您的 GMS 设备规格（谷歌在大多数情况下会提供帮助）

|名称 |类型 |默认 |说明 |
| -------- | ------- | ------- | ------------------------------------------------------- |
|波特率 |编号 | 19200 |端口的波特率。 |
|数据位 |编号 | 8 |必须是以下之一：8、7、6 或 5。 |
|停止位 |编号 | 1 |必须是以下之一：1 或 2。 |
|平价 |字符串 | “无” |必须是以下之一：'none'、'even'、'mark'、'odd'、'space'。 |
|资源 |布尔 |假 |流量控制设置 |
| xon |布尔 |假 |流量控制设置 |
|关闭 |布尔 |假 |流量控制设置 |
| xany |布尔 |假 |流量控制设置 |

### 其他设置和建议
#### 指定为适配器 - 对象（`admin.x`）
- 你的名字（默认为 `ownNumber`），最大长度为 16 个字符。
-   你的电话号码。
- SMS 操作模式（`PDU` 或 `SMS`，`PDU` 是默认和推荐的）。

所有输入都必须使用 ack=false！

#### 收件箱/发件箱 - 历史记录
通过激活 `inbox.messageRaw` - 对象和 `sendSMS.messageRaw` - 对象的历史记录适配器，您可以获得完整的 SMS 流量收件箱和发件箱。

<!--

#### 短信 - 错误
当返回错误并且错误源自设备时（因此与设备的交换在技术上是成功的），然后在错误消息中，应列出错误代码，例如“+CMS 错误：500”。错误消息显示在“警告”级别的日志中，并存储在 `info.error` 对象中。
可以找到可能的错误代码及其含义的（不完整）列表，例如在 <https://www.activeexperts.com/sms-component/gsm-error-codes/>。
-->

## 功能
### 接收短信
传入的 SMS 被写入 `inbox.*` - 对象。 `inbox.messageRaw` 可用作进一步操作的触发器（例如，通过电子邮件适配器转发传入的短信）。

＃＃＃ 发简讯
要发送短信，请填写 `sendSMS.recipient, sendSMS.message` 和可选的 `sendSMS.alert` 并按下 `sendSMS.send` - 按钮。或设置 `sendSMS.messageRaw` - 带有以下形式的字符串和 ack=false 的对象：`{"recipient": "Number", "message":"Yourtext", "alert":"false"}`。

此适配器还为其他脚本提供块状和 sendTo 功能的通信块 (sendTo("gsmsms._InstanceNo_", "send", {text: '_yourText_',recipient: '_phonenumber_', alert: '_false/true_'} );)。

### 执行AT+命令
！请务必知道您在设置 AT+ 命令时做了什么，这是您的 SIM 卡/设备。

发送 AT+ 命令时设置 `admin.atCommandSLR` 格式为 `AT+XXXXy`。
发送您喜欢的任何命令，但请注意，您只会看到响应的最后一行。

## 串口-gsm
此适配器基于 [SerialPort-GSM插件](https://github.com/zabsalahid/serialport-gsm) 与 GSM 调制解调器通信，主要用于 SMS。

## 开发者手册
本节适用于开发人员。以后可以删除

＃＃＃ 入门
你几乎完成了，只剩下几步了：

1. 前往 [main.js](main.js) 并开始编程！

### 最佳实践
我们收集了一些关于 ioBroker 开发和编码的[最佳实践](https://github.com/ioBroker/ioBroker.repositories#development-and-coding-best-practices)。如果您是 ioBroker 或 Node.js 的新手，您应该检查它们。如果您已经有经验，您还应该看看它们 - 您可能会学到一些新东西 :)

### `package.json`中的脚本
为方便起见，预定义了几个 npm 脚本。您可以使用 `npm run <scriptname>` 运行它们

|脚本名称 |说明 |
\|------------\|------------\|
\| `test:js` |执行您在 `*.test.js` 文件中定义的测试。 |
\| `test:package` |确保您的 `package.json` 和 `io-package.json` 有效。 |
\| `test:unit` |使用单元测试测试适配器启动（快速，但可能需要模块模拟才能工作）。 |
\| `test:integration` |使用 ioBroker 的实际实例测试适配器启动。 |
\| `test` |对包文件和您的测试执行最小测试运行。 |
\| `check` |对您的代码执行类型检查（不编译任何内容）。 |
\| `lint` |运行 `ESLint` 以检查您的代码是否存在格式错误和潜在错误。 |
\| `release` |创建新版本，请参阅 [`@alcalzone/release-script`](https://github.com/AlCalzone/release-script#usage) 了解更多详细信息。 |

### 编写测试
如果做得好，测试代码是无价的，因为它使您有信心更改代码，同时确切知道是否以及何时出现问题。 <https://hackernoon.com/introduction-to-test-driven-development-tdd-61a13bc92d92> 是关于测试驱动开发主题的好读物。
虽然在代码之前编写测试乍一看似乎很奇怪，但它有非常明显的好处。

该模板为您提供了适配器启动和包文件的基本测试。
建议您将自己的测试添加到组合中。

### 发布适配器
使用 GitHub Actions，您可以在推送与 `v<major>.<minor>.<patch>` 格式匹配的新 git 标签时在 npm 上启用自动发布。我们**强烈建议**您这样做。 `.github/workflows/test-and-release.yml` 中描述了必要的步骤。

由于您安装了发布脚本，您只需调用以下命令即可创建新版本：

```bash
npm run release
```

[发布脚本文档](<https://github.com/AlCalzone/release-script#command-line> ) 中解释了发布脚本的其他命令行选项。

要在 ioBroker 中发布您的适配器，请参阅 [ioBroker.repositories](https://github.com/ioBroker/ioBroker.repositories#requirements-for-adapter-to-get-added-to-the-latest-repository) 的文档。

### 使用开发服务器手动测试适配器
由于您设置了 `dev-server`，您可以使用它来运行、测试和调试您的适配器。

您可以通过从开发目录调用来启动 `dev-server`：

```bash
dev-server watch
```

然后可以在 <http://localhost:8081/> 访问 ioBroker.admin 界面

有关详细信息，请参阅 [`dev-server` 文档](https://github.com/ioBroker/dev-server#command-line)。

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
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