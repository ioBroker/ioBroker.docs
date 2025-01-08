---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.bydhvs/README.md
title: 无标题
hash: 6rJsGMiwPDh+TVJW6fkrBhq0iv+bPoQEMAMO0zfJzWU=
---
![标识](../../../en/adapterref/iobroker.bydhvs/admin/bydhvs.png)

## IoBroker 的 bydhvs 适配器
比亚迪HVS电池调查数据

＃＃ 介绍
此适配器从比亚迪光伏电池 (https://www.bydbatterybox.com/) 获取数据，并将其放入适配器中的数据点。不幸的是，没有官方 API 和文档，所以我使用 wireshark 和 byd-hvs-simulator 来尝试了解通信。我的适配器模拟 byd-app，向设备发送类似的数据包并分析响应。

＃＃ 当心
beConnect 应用程序有两个步骤，第一步，您将获得常规数据，第二步，您将获得所有电池的详细数据（单个电池温度和电压以及一些其他详细信息）。要获得详细数据，必须在数据包之后延迟一段时间才能获得结果。我认为在此期间所有电池都经过了测量，但我不确定。我绝对不确定过于频繁地轮询这些数据是否会损害您的电池，因此请注意：您需要自行承担风险！

## 支持最多 5 个模块
现在支持最多 5 个 HVS 模块。

＃＃ 设置
间隔：这很简单：数据轮询频率是多少 IP 地址：这不言自明。要么使用标准地址 (192.168.16.254)，要么更改家中的路由，例如：https://www.photovoltaikforum.com/thread/150898-byd-hvs-firmware-update/?postID=2215343#post2215343 。优点是：beConnect 应用程序也可以工作。其他可能性：您可以更改盒子的 IP 地址。但是：请注意：网页上的文字令人困惑，如果您不完全确定要做的事情：请不要触摸设置。在德国论坛上，我读到有人被锁定在系统之外，无法恢复，要么 byd 向您发送替换的 HVU，要么您必须购买新的。
电池详细信息：如上所述：您需要电池的详细信息吗？如果是：设置 checkobx。
电池详细信息 - 每 ... 周期：同样像上面一样，应该清楚测试模式 - 在错误日志中显示数据：如果选中此框：发送和接收的数据将显示在错误日志中，因此您可以轻松下载数据并在出现错误时将其发送给我。
复制和粘贴不起作用 - 数据在最后被剪切。您必须先下载它，然后再发送给我。

[链接 zur nativen deutschen 自述文件：](README-German.md)

## **正在进行中**
* NPM 中第一个带有两个塔的版本

### 1.5.1 (2024-01-15)
* 能够从双塔设置中获取信息
* 结构的重大变化。

### 1.5.0 (2023-11-04)
* 重大变更：最低要求 nodejs 16
* 修复自动检查和发布脚本（感谢 mcm1957，他完成了这项工作）
* 代码中没有其他改变

### 1.4.2 (2023-09-28)
* 删除了版本号中的拼写错误

### 1.4.1 (2023-09-24)
* 与 js.controller 5x 兼容
* 修复了检测逆变器的一些错误
* 逆变器编号已记录，因此如果需要，我可以轻松添加新的逆变器，如果逆变器未知，只需将 silly-log 发送给我。

### 1.4.0 (2022-10-31)
* 更新相关模块（主要围绕测试）
* Tapter 贡献的改进（5 个模块、自述文件和更易读的代码）
* 更好地检测电池类型和逆变器
* SOC 不仅来自正常数据，还来自诊断数据。我们多了一个小数位
* 删除电池详细数据的频率限制
* 将 HVS 温度测量的最大数量增加到 64
* 支持最多 5 个 HVS 模块

### 1.3.0 (2021-11-06)
* 更新了更多依赖项
* 官方发布新州 SOH

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