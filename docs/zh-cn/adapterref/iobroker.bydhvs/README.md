---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.bydhvs/README.md
title: 无题
hash: XDgN8jFQAHHQEHMq7lcxT7JcSKDWP9ssqrlWB+z8oTc=
---
![标识](../../../en/adapterref/iobroker.bydhvs/admin/bydhvs.png)

## IoBroker 的 bydhvs 适配器
比亚迪 HVS 电池轮询数据

＃＃ 介绍
该适配器从比亚迪光伏电池（https://www.bydbatterybox.com/）获取数据并将其放入适配器中的数据点中。不幸的是，没有官方 API，也没有文档，所以我使用wireshark 和 byd-hvs-simulator 来尝试理解通信。我的适配器模拟 byd-app，将类似的数据包发送到设备并分析响应。

＃＃ 当心
beConnect 应用程序中有两个步骤，第一步您获取正常数据，第二步您获取所有电池的详细数据（单个电池温度和电压以及更多详细信息）要获取详细数据，有在其中一个数据包之后延迟，直到我得到结果。我认为与此同时所有基因细胞都被测量了，但我不确定。我绝对不确定您是否因过于频繁地轮询此数据而损害电池，因此请注意：您需要自行承担风险！

## 支持最多 5 个模块
现在最多支持 5 个 HVS 模块。

＃＃ 设置
间隔：这很简单：多久轮询一次数据 IP 地址：这是不言自明的。您可以使用标准地址 ( 192.168.16.254 ) 并更改家里的路由，例如： https://www.photovoltaikforum.com/thread/150898-byd-hvs-firmware-update/?postID=2215343#post2215343 。优点是：beConnect 应用程序也可以使用。其他可能性：您更改盒子的 IP 地址。但是：请注意：网页上的文本令人困惑，如果您对自己所做的事情不是绝对确定：请不要触摸设置。在德国论坛上，我读到一些人被锁定在系统之外，并且没有回头路，要么比亚迪向您发送替换的 HVU，要么您必须购买一个新的。
电池详细信息：如上所述：您需要电池的详细信息吗？如果是这样：设置 checkobx。
电池详细信息 - 每个...周期：也像上面一样，应该清楚测试模式 - 在错误日志中显示数据：如果选中此框：发送和接收的数据将显示在错误日志中，以便您可以轻松下载数据并在出现错误时将其发送给我。
复制和粘贴不起作用 - 数据在最后被剪切。在将其发送给我之前，您必须先下载它。

[链接 zur nativen deutschen 自述文件：](README-German.md)

＃＃ **工作正在进行中**
* 第一个版本在 NPM 中有两个塔

### 1.5.1 (2024-01-15)
* 能够从两塔设置获取信息
* 结构的重大改变。

### 1.5.0 (2023-11-04)
* 重大变更：最低要求 Nodejs 16
* 修复了自动检查和发布脚本（感谢 mcm1957，他完成了这项工作）
* 代码中没有其他任何改变

### 1.4.2 (2023-09-28)
* 删除了版本号中的拼写错误

### 1.4.1 (2023-09-24)
* 与 js.controller 5x 兼容
* 修复了检测逆变器的一些错误
* 逆变器编号已记录，因此如果需要，我可以轻松添加新逆变器，如果逆变器未知，只需向我发送愚蠢的日志。

### 1.4.0 (2022-10-31)
* 参考模块的更新（主要围绕测试）
* Tapter 贡献的改进（5 个模块、自述文件和更好可读的代码）
* 更好地检测电池类型和逆变器
* SOC 不仅来自正常数据，还来自诊断数据。我们还有一位小数
* 删除了电池详细数据的频率限制
* HVS 温度测量的最大数量增加到 64
* 支持最多5个HVS模块

### 1.3.0 (2021-11-06)
* 更新了更多依赖项
* 正式发布新状态 SOH

###

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

## License
MIT License

Copyright (c) 2023 Christian <github@familie-herrmann.de>

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