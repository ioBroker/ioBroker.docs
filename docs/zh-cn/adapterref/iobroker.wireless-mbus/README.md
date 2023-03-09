---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.wireless-mbus/README.md
title: ioBroker.wireless-mbus
hash: pVmHXIrFw/pfk7p7SHdAgL1Wjq4QZsO9qIKgBGk65/w=
---
![标识](../../../en/adapterref/iobroker.wireless-mbus/admin/wireless-mbus.png)

![安装数量](https://iobroker.live/badges/wireless-mbus-installed.svg)
![稳定版](https://iobroker.live/badges/wireless-mbus-stable.svg)

# IoBroker.wireless-mbus
该适配器允许从支持的接收器接收无线 M-Bus 数据。设备实现的范围各不相同，但可以为所有列出的设备配置 wMBus 模式。

* 嵌入 WMB 模块
* Amber Wireless AMB8465（**注意：**命令模式（UART_CMD_Out_Enable）已启用！）
* IMST iM871A
* 文化

WMBUS 堆栈已从 FHEM 项目“重新移植”，并进行了广泛的修复和重构。测试是使用从 Internet 上获取的原始数据、OMS 示例数据和 jmbus 库中的一些测试数据完成的。一些边缘情况仍未经过测试。

设备创建、更新等主要基于 Apollon77 的 M-Bus 适配器（见下文）。

如果适配器收到加密电报，AES 密钥配置选项卡应自动列出设备 ID。

如果解析器失败，原始电报数据将保存到 info.rawdata 状态。

*注意：* 在 C 模式下，Amber 接收器似乎会在一段时间（或接收到的消息数量）后崩溃？硬件缺陷？

## 链接：
* [WMBus 堆栈模块](https://github.com/mhop/fhem-mirror/blob/master/fhem/FHEM/WMBus.pm)
* [ioBroker.mbus](https://github.com/Apollon77/ioBroker.mbus)
* [原始 WMBUS 堆栈：wm-bus](https://github.com/soef/wm-bus)
* [M-Bus协议](http://www.m-bus.com/files/MBDOC48.PDF)
* [OMS 规范](https://oms-group.org/en/download4all/oms-specification/)

＃＃ 初始设置
初始设置需要配置基础知识（与 wmbus 的硬件连接）并为要收集的所有加密 wmbus 节点设置 AES 密钥。最棘手的部分是 AES 密钥。

### 基本设置
这需要选择合适的 USB 设备和正确的波特率（**通常** IMST：57600 波特；Amber：9600 波特；Embit：9600 波特）。大多数仪表将以“T 模式”发送。

### 其他选项
* **更新未更改的状态**：当电报到达时，所有状态都将更新，即使它们的值没有改变。 （默认值：开）
* **紧凑帧支持缓存**：为了支持紧凑电报（由某些（Kamstrup？）设备使用），缓存所有收到的电报的结构。这意味着通常每个设备只有一个缓存条目。如果您没有任何发送紧凑电报的设备，您可以禁用它以节省一些性能和内存。 （默认：关闭）
* **将能量单位强制转换为 kWh**：所有能量单位（Wh 和 J）都将转换为 kWh。 （默认：关闭）
* **连续失败后暂时阻止设备**：如果同一设备的 10 个连续报文未成功解析，则设备将被忽略，直到适配器重新启动（默认值：开）

### AES 密钥
设备标识符是制造商代码和设备 ID 的组合（例如 AAA-12345678）。密钥可以作为 16 个字符的纯文本密钥或作为 32 个字符（16 字节）的十六进制字符串输入。

设置密钥的最简单方法是在没有任何密钥设置的情况下启动适配器并等待加密电报，之后适配器会生成一个带有“UNKNOWN”密钥的条目。然后就可以填写相应的键值并保存设置了。如果您看到不认识的设备或只想摆脱的设备（例如来自邻居的设备），您可以在已阻止的设备选项卡中输入它们。

＃＃ 去做
* 为 S 模式接收器发送电报？

## 0.8.10
*（ChL）独立于制造商代码使用紧凑型帧缓存

## 0.8.9
*（ChL）修复管理页面中非默认设置的显示

## 0.8.8
* (ChL) 添加日期时间类型 I 处理

### 0.8.7
* (ChL) 稍微改善 LVAR DIF 值的处理

### 0.8.3 / 0.8.4 / 0.8.5 / 0.8.6
* (ChL) 更新开发依赖 - 注意 CI 测试将不再支持 <= NodeJS 12
* (ChL) 较小的日志记录更改

### 0.8.2
* (ChL) C 模式支持 CUL

### 0.8.1
* (ChL) 固定连接状态
*（ChL）重新添加串行日志记录

### 0.8.0
*（ChL）串行通信的完全重写 - 现在包括经过单元测试的设备类
* (ChL) 升级到 SerialPort 10.x 和依赖清理
* (ChL) 改进 PRIOS 解码器

### 0.7.9
*（ChL）向所有串行设备添加调试日志记录

### 0.7.8
*（ChL）改进接收器模块的日志记录
* (ChL) 修复原始数据状态

### 0.7.7
* (ChL) 添加对 Diehl PRIOS 编码电报的支持（从 wmbusmeters 移植）

### 0.7.5 / 0.7.6
* (ChL) 修复超时处理 - 如果没有出现问题，这将作为 1.0.0 重新发布

### 0.7.3 / 0.7.4
* (ChL) 尝试改进 CUL 支持

### 0.7.1 / 0.7.2
* (ChL) 重命名为 ioBroker.wireless-mbus 以便能够发布到 npm
* (ChL) 修复 package.json 中的阻止列表、管理页面徽标和 repo url

### 0.7.0
* (ChL) 将主适配器代码更改为类
* (ChL) 包括除英语和德语之外的实际（机器）翻译
* (ChL) 升级依赖项
* (ChL) 添加 wmbus 解码器测试
* (ChL) 添加集成测试
* (ChL) 添加 github 工作流程

### 0.6.2
* (ChL) 改进管理页面以处理自定义串口路径
*（ChL）添加选项以关闭自动阻止设备
* (ChL) 添加“Simple Hexstring”接收器用于测试目的
* (ChL) 内部重构

### 0.6.0 / 0.6.1
* (ChL) 串口库升级到 9.2.0
* (ChL) 实验性 CUL 支持

### 0.5.2
* (ChL) 修复了 js-controller 2.x 的连接指示器

### 0.5.1
* (ChL) 小修复
* (ChL) 内部电报解析器现在支持有线 M-Bus 帧（未使用 - 用于测试/开发目的）
* (D Glaser) 添加了最后一次更新设备信息的时间戳
* (D Glaser/ChL) 在自述文件中添加了一些设置文档

### 0.5.0
* (ChL) 对 Techem 设备的基本支持
* (ChL) 将能量单位（Wh 和 J）强制转换为 kWh 的选项 - 请注意，这并不是真正的向后兼容。旧状态将保留其“旧”单位，但显示调整后的值！

### 0.4.7
* (ChL) 在 10 次连续失败的解析尝试后阻止设备，直到适配器重新启动
*（ChL）分配从单元派生的角色（与 mbus 适配器一样）

### 0.4.6
*（ChL）通过数据记录缓存支持（Kamstrup？）紧凑帧（预定义帧已被删除！）

### 0.4.5
* (ChL) 在启动时使用密钥“UNKNOWN”将设备 ID 附加到 needskey

### 0.4.2 / 0.4.3 / 0.4.4
* (ChL) 小修复

### 0.4.1
* (ChL) 基本 IMST iM871A 支持

### 0.4.0
* (ChL) 更好的 Amber Stick 支持
* (ChL) 紧凑模式？
* (ChL) 更好的州名
* (ChL) wMBus 模式部分可选

### 0.3.0
* (ChL) 实现了 MBus 文档中的所有 VIF 类型
* (ChL) VIF 扩展得到更好的处理（再次）
* (ChL) 重组了 VIF 信息
* (ChL) 重组接收器处理
* (ChL) 可能阻止设备

### 0.2.0（未标记）
*（ChL）显着改进的解析器：支持安全模式 7，帧类型 B，许多小修复
* (ChL) VIF 扩展处理得更好，但正确处理仍不完全清楚
* (ChL) CRC 检查并删除（如果仍然存在）
* (ChL) 如果解析器失败则保存原始数据

### 0.1.0
* (ChL) 初始版本

## Changelog

## License

Copyright (c) 2019 ISFH - Institute for Solar Energy Research www.isfh.de
Copyright (c) 2021 Christian Landvogt

Licensed under GPLv2. See [LICENSE](LICENSE) and [NOTICE](NOTICE)