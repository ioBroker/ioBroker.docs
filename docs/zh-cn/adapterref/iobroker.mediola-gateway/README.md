---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.mediola-gateway/README.md
title: ioBroker.mediola-网关
hash: mt+jhkQ8cCtlRO5VITibW6l4BtpRaTN0AdcfhOu/Uak=
---
![标识](../../../en/adapterref/iobroker.mediola-gateway/admin/mediola-gateway.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.mediola-gateway.svg)
![下载](https://img.shields.io/npm/dm/iobroker.mediola-gateway.svg)
![安装数量](https://iobroker.live/badges/mediola-gateway-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/mediola-gateway-stable.svg)
![国家公共管理](https://nodei.co/npm/iobroker.mediola-gateway.png?downloads=true)

# IoBroker.mediola-gateway
**测试：** ![测试与发布](https://github.com/oelison/ioBroker.mediola-gateway/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 mediola 网关适配器
Mediola-Gateways的配置和使用

## 用法，例如Mediola网关V4/V5/V6
当您只有一个 Mediola Gateway (https://www.mediola.com/) 时，自动检测是最好的入门方式。在日志中，检测到的 IP 地址和 MAC 地址在检测后可见。当您有多个 Mediola 网关时，最好为适配器提供 MAC 地址。然后就会找到这个特定的网关。当 IP 地址未发生变化并且比 MAC 地址更容易识别时，也可以使用 IP 地址。
适配器找到 Mediola Gateway 后，实例变为绿色，并且对象 receiveIrData、sendIrData 和 sendRfData 可用。当 Mediola 网关中有系统变量时，它们也会列在对象列表中。一段时间后，接收到的 IrData 大部分都在变化。这代表 Mediola Gateway 所在房间接收到的 IR 日期。
系统变量的每次更改也将显示在那里，并可用于自动化。
sendIrData 使用多个学习的 IR 代码进行测试。只需将IR代码放入对象中即可发送数据。

＃＃ 故障排除
检查http://ip-of-mediola/command?XC_FNC=getstates\ 预期结果：{XC_SUC}[...]\ 非预期结果：{"XC_ERR":{"code":"000007","msg" :"访问被拒绝"}}（在 Gateway V4 上从未见过）\ 当此功能正常工作时，您的 mediola 未设置密码。不知道为什么适配器不能工作。\联系论坛：https://forum.iobroker.net/topic/63560/neuer-adapter-mediola-gateway（抱歉是德语，但英语也是可以的）\使用用户名和密码：\ 检查 http://ip-of-mediola/command?XC_USER=username&XC_PASS=password&XC_FNC=getstates\ 预期结果：{XC_SUC}[...]\ 非预期结果：{XC_ERR}{"code" :"010000"}\ 当此功能起作用时，需要将用户名和密码添加到配置中。如果这不起作用，您可能没有用户名和正确的密码。当您只设置了密码时，您需要设置一个完整的用户。 （网关V6）

## WIR (WR)、Roto (BK) 和 Elero (ER) 遮阳帘的用法
这些遮阳帘将被自动找到。他们从 WR、BK 或 ER 开始。适配器中有两个文件夹。一个称为状态，另一个称为动作。
在状态下，WR 状态将以关闭百分比显示。 BK 和 ER 状态始终为空（从未见过其他值）。要更新状态，需要在适配器实例设置中设置“从 Mediola 读取状态”标志。更新间隔可以在几分钟内调整。
在动作文件夹中，可以控制遮阳帘。向上移动需要写1，向下写2，停止则写3。对于 WIR，您可以发送 10、20、30、40、50、60、70、80 和 90 来设置百分比。

## Nobily (NY/DY) 遮阳帘的用法
这其实有点复杂。不会自动检测到这些设备。你需要切换到专家模式！如果不存在，则需要在“mediola-gateway.0”下创建文件夹“action”。在此文件夹中，您需要添加一个类型为字符串且名称为“NY12345678”或“DY12345678”的状态“Datapoint”。 “NY”或“DY”需要大写字母和需要从配置工具的调试工具获取的 8 个字符的十六进制数字。取出您在组部分下找到的所有号码。

### 免责声明
免责声明 所有产品和公司名称或徽标均为其各自所有者的 Trademarks™ 或 Registered® 商标。它们的使用并不意味着它们或关联附属公司有任何从属关系或认可！这个个人项目是出于娱乐目的而进行的，没有商业目标。 mediola 是 mediola - Connected Living AG 的商标。

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

-   RT (Somfy) system added (Thanks to Falk)
-   DY (Nobily) system added (Thanks to BlindlyBlinds)
-   ER (Elero) system added (Thanks to CsL-007 [#35](https://github.com/oelison/ioBroker.mediola-gateway/issues/35))

### 1.0.1 (2023-08-26)

-   folder action created as real folder
-   folder sysvars created as real folder

### 1.0.0 (2023-08-10)

-   user and password login to mediola
-   WIR system added (Thanks to Keulehd)
-   BK and NY system added (Thanks to line)
-   pull data added for not pushed states
-   sysvars are now in a folder (breaking change)

### 0.1.4 (2023-05-20)

-   axios with log error on error
-   ack true for readonly objects
-   ack check on state change
-   invalid chars checked

### 0.1.3 (2023-05-18)

-   test and release script corrected

### 0.1.2 (2023-05-18)

-   npm deploy activated
-   Readme improved

### 0.1.1 (2023-05-11)

-   dependencies update

### 0.1.0 (2023-05-03)

-   initial release
-   send ir (only IR_ID 01 front IR)
-   reveive ir

## License

MIT License

Copyright (c) 2023 oelison <iobrokermediola@sciphy.de>

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