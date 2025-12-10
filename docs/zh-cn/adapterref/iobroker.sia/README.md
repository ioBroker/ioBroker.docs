---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sia/README.md
title: ioBroker.sia
hash: UK7kASuGnZWgjx8LKZWLYElvS2cNp5zZx9/JVPzPyoc=
---
![标识](../../../en/adapterref/iobroker.sia/admin/sia.png)

![Travis CI 构建状态](https://travis-ci.org/schmupu/ioBroker.sia.svg?branch=master)
![AppVeyor 构建状态](https://ci.appveyor.com/api/projects/status/github/schmupu/ioBroker.sia?branch=master&svg=true)
![安装数量](http://iobroker.live/badges/sia-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.sia.svg)
![下载](https://img.shields.io/npm/dm/iobroker.sia.svg)
![NPM](https://nodei.co/npm/iobroker.sia.png?downloads=true)

# IoBroker.sia
==================

需要 node.js 20.0 或更高版本以及 Admin v5！

SIA DC-09 协议被报警系统用于通过 SIA-DCS、*SIA-DCS、ADM-CID 和 *ADM-CID 与中央站通信。

此适配器为 SIA 服务器。当触发报警事件时，报警系统会通过 IP（TCP 或 UDP）协议向中央监控站发送 SIA 消息。

支持以下 ID 令牌：

- SIA-DCS（SIA DCS），
- *SIA DCS（SIA DCS 加密），
- ADM-CID（Ademco Contact ID），
- \*ADM-CID（Ademco Contact ID 加密版）

如果使用 *SIA DCS（SIA DCS 加密）或 *ADM-CID（Ademco Contact ID 加密），则必须启用 AES 加密，并输入十六进制格式的 AES 密码。AES 密码长度分别为：AES-128 = 32 个十六进制字符，AES-192 = 48 个十六进制字符，AES-256 = 64 个十六进制字符。

AES-128 密码示例：3A1F6B8C9D4E7F20123456789ABCDEF0。

您可以将此适配器与 ioBroker 配合使用，作为中央站。例如，如果您收到 SIA 报警消息，可以通过 ioBroker 发送 Telegram 消息。

[SIA DC-09协议](https://www.yumpu.com/en/document/view/47594214/dc-09-preparing-for-ansi-public-review-security-industry-)

## 安装和配置
1. 安装适配器
2. 适配器配置：

选择用于监听 SIA 请求的 IP 地址和端口。

![sia_adapter1](../../../en/adapterref/iobroker.sia/admin/sia_adapter1.png)

注册账号。如果您使用 AES 加密，则必须输入密码（密钥）。密钥长度应为 16、24 或 32 个字符（字节）。

如果选中“AES 密码（十六进制格式）”复选框，则密码长度必须为 32、48 或 64 个字符（字节）。

在“ACK 超时”字段中，您可以定义消息的过期时间（以秒为单位）。如果设置为 0 秒，则不会进行超时验证。

通过“SIA 服务器关闭连接”复选框，您可以决定报警系统在收到 ACK 消息后是否必须关闭连接。

如果“SIA 服务器关闭连接”复选框未选中，则 SIA 服务器 (ioBroker) 将等待 30 秒，然后由报警系统关闭连接。

30 秒后，SIA 服务器 (ioBroker) 将关闭连接。

    ![sia_adapter2](../../../en/adapterref/iobroker.sia/admin/sia_adapter2.png)

3. 配置您的防盗系统以发送 SIA 消息

    ![sia_lupusec1](../../../en/adapterref/iobroker.sia/admin/sia_lupusec1.png)

    - Lupusec XT1+/XT2/XT2+/XT3/XT4 (SIA-DCS)：

安装 -> 联系 ID ： ip:/subscriber@ip-address-iobroker:port/SIA 示例：ip://A111F@192.168.20.55:55001/SIA

- Lupusec XT1+/XT2/XT2+/XT3/XT4 (*SIA-DCS) 加密：

设置 -> 联系 ID：ip://subcriber@ip-address-iobroker:port/SIA/KEY/（128、196 或 256 位十六进制密钥）示例：ip://A222F@192.168.20.55:55001/SIA/KEY/3A1F6B8C9D4E7F20123456789ABCDEF0

- Lupusec XT1+/XT2/XT2+/XT3/XT4 (ADM-CID):

安装 -> 联系 ID ： ip://subscriber@ip-address-iobroker:port/SIA 示例：ip://A333F@192.168.20.55:55001/CID_SIA

- Lupusec XT1+/XT2/XT2+/XT3/XT4 (\*ADM-CID) 加密：

设置 -> 联系 ID：ip://subcriber@ip-address-iobroker:port/CID_SIA/KEY/（128、196 或 256 位十六进制密钥）示例：ip://A444F@192.168.20.55:55001/SIA/KEY/3A1F6B8C9D4E7F20123456789ABCDEF0

其他报警系统：

该适配器可与所有支持 SIA-DCS、*SIA-DCS、ADM-CID 或 *ADM-CID 的报警系统配合使用。

4. SIA 对象/状态

如果您收到 SIA 消息，您可以在通道帐户下的状态树中看到它们。

    ![sia_adapter3](../../../en/adapterref/iobroker.sia/admin/sia_adapter3.png)

每个账户都会显示以下对象：

| 对象 | 描述 |
    | ------------- | ------------------------------------------------------- |
| 账号 | 账号（3-16 个 ASCII 字符，“0”-“9”，“A”-“F”） |
| CRC | CRC校验和 |
    |外部数据 |扩展数据（ACII数据）|
| id | ID令牌（例如SIA-DCS） |
| lpref | 账户前缀 |
| msgdata | 消息数据，始终以 ASCII 码表示 |
| rpref | 接收方号码 |
| 序列 | 序列号 |
| ts | 时间戳（仅包含在加密消息中） |

值得注意的是对象：msgdata（消息数据）。在这里，您可以看到报警系统抛出的事件。至于如何解读该事件，您需要咨询报警系统制造商。

以下是一个使用 ioBroker 获取事件的 JavaScript 示例：

```
// example message: A444F|1401 02 001
on({ id: 'sia.0.accounts.A444F.msgdata'/*A444F - Message Data*/ },  (obj) => {
    if(obj.state.ack === true) {
        const id = getState('sia.0.accounts.A444F.id'/*A444F - ID Token*/).val;
        if(id === 'ADM-CID' || id === '*ADM-CID') {
            const cid = parseMessage(obj.state.val);
            console.log(`Contact ID Message ${JSON.stringify(cid)}`);
            console.log(`Event: ${cid.event} for accountnumber ${cid.accountNumber}`);
        }
    }
});
```

    输出：

```
Contact ID Message {"accountNumber":"A444F","qualifier":"1","event":"401","area":"02","zone":"001"}
Event: 401 for accountnumber A444F
```

事件 401 表示“远程布防/撤防，即通过短信或网络访问布防或撤防系统”。

5. 漏洞/问题

如果您在处理 SIA 消息时遇到问题或发现了错误，请提交 issue。

issue 应包含以下信息：

1. 报警系统的制造商和类型
2. 将 SIA 消息保存为文件。如果您在实例配置中启用此功能，则可以创建文件。
3. 如果您使用加密（AES），那么我需要密钥来解密消息以进行测试。
4. ioBroker 处理消息时的调试输出
5. 漏洞的详细描述

完成步骤 2 和 3 后，请更改 AES 密钥。

您可以使用以下命令测试已保存的 SIA 消息。

```
# cat fileanme_of_sia_message | nc ip_address_of_iobroker sia_port
cat /tmp/sia/sia_msg_20250201_202457309.txt | nc localhost 55001
```

## Changelog

### **WORK IN PROGRESS**

- (Stübi) Fixing @iobroker/adapter-dev 1.0.1 specified. 1.3.0 is required as minimum, 1.3.0 is recommended (Issue #48)
- (Stübi) Fixing dependency (Issue #49)

### 2.0.4 (2025-02-06)

- (Stübi) Fixed Issue Required SIA fields Missing (Issue #19)
- (Stübi) Fixed an error by reading the length of the message
- (Stübi) Fixed Issue Socket not kept connected (Issue #20)
- (Stübi) the crc and length will be shown as HEX ASCII (4 characters) in the object crc and len
- (Stübi) timestamp will be shown in format hh:mm:ss,MM-DD-YYYY (GMT time) in the object ts

### 2.0.3 (2025-02-01)

- (Stübi) add error envent if connction close
- (Stübi) add the proctocol ADM-CID and \*ADM-CID (Ademco Contact ID)
- (Stübi) add translations
- (Stübi) fix bugs by receiving messages by udp
- (Stübi) adjust readme

### 2.0.2 (2025-01-30)

- (Stübi) add: checking accountnumber for exact syntax
- (Stübi) add: checking admin interface aes entries

### 2.0.1 (2025-01-29)

- (Stübi) Redesign of Contact ID Adapter.
- (Stübi) Wokring now with nodejs 20 and 22
- (Stübi) js-controller in version 6 and 7 will be supported
- (Stübi) Ability to save SIA messages.

### 2.0.0 (2025-01-29)

- (Stübi) Major Release

### 1.0.4 (2019-11-17)

- (Stübi) Bugfixing, changing the time calculation for ACK and NACK messages
- (Stübi) Small improvements to the SIA protocol
- (Stübi) Changed bug in encrypting. Delete appending 8 \* 0x10
- (Stübi) Support of UDP. Same port listening as TCP
- (Stübi) Saving password encrypted.
- (Stübi) ACK and NAC calculation extended.
- (Stübi) CRC can be send in 0xABCD (2 Byte) or ABCD (4 Byte, ASCII) format. Automatic recognizing
- (Stübi) AES Password can be in AES-128-CBC, AES-192-CBC or AES-256-CBC
- (Stübi) AES Password can be saved in byte or hex (length 16, 24 or 32 byte) format or hex (length 32, 48 or 64 hex) format
- (Stübi) Timeout for ACK (0 = disable, 1 - n sec)
- (Stübi) Set ioBroker States of message on ACK not on NACK
- (Stübi) Support js-controller compact mode
- (Stübi) Update Adapter Core File
- (Stübi) Bugfxing (NAK) and AES support
- (Stübi) Translations
- (Stübi) Requires nodejs 6.0 or higher
- (Stübi) Cleanup
- (Stübi) SIA regex optimized
- (Stübi) bug fixing
- (Stübi) first implementation

## License

The MIT License (MIT)

Copyright (c) 2025 Thorsten <thorsten@stueben.de>

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