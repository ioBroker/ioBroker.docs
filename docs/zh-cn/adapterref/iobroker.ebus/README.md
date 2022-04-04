---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ebus/README.md
title: ioBroker.ebus
hash: eKEKGJICcSntmAakOxzPXYUeuUom6UCQAVuFcPxxmHE=
---
![商标](../../../en/adapterref/iobroker.ebus/admin/ebus.png)

![安装数量](http://iobroker.live/badges/ebus-stable.svg)
![下载](https://img.shields.io/npm/dm/iobroker.ebus.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.ebus.svg)
![已知漏洞](https://snyk.io/test/github/rg-engineering/ioBroker.ebus/badge.svg)
![新PM](https://nodei.co/npm/iobroker.ebus.png?downloads=true)

# IoBroker.ebus
![GitHub 操作](https://github.com/rg-engineering/ioBroker.ebus/workflows/Test%20and%20Release/badge.svg)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

**如果你喜欢它，请考虑捐赠：**

[![贝宝](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YBAZTEBT9SYC2&source=url)

该适配器读取

- 使用 html 来自 ebusd 的数据

在这种情况下，ebusd 必须运行并且必须能够将数据发送到例如浏览器通过 http://IP:port/data (http://192.168.0.123:8889/data) 当前版本的 ebusd 包括。配置文件可以从 https://github.com/john30/ebusd 复制所有带有数据、lastup 和来自全局部分的字段都被解析。目前所有其他的都被忽略了。

可以轮询 ebusd 不直接轮询的数据。命令“read -f”用于强制通过 ebus 读取。

另一个功能是将任何命令发送到 ebusd 并接收答案以使用例如脚本。

当前支持的 ebusd 版本：22.2

**注意** 使用 ebusd - 22.1 版配置路径已更改为 http://cfg.ebusd.eu/。确保在安装 ebusd 时更改它。
详情见[变更日志](https://github.com/john30/ebusd/blob/master/ChangeLog.md)

## 如何向 ebusd 发送命令
1.在datapoint ebus.0.cmd上写入单个命令或命令列表

如果要使用多个命令，请使用 , 分隔单个命令。
示例：读取 -f YieldTotal，读取 LegioProtectionEnabled，读取 -f -c 广播外部温度

2. 执行命令时，您将在数据点 ebus.0.cmdResult 中收到每个命令的结果

结果也是逗号分隔的示例：2000, ERR: element not found, 10.5

注意：datapoint ebus.0.cmd 中的命令在执行命令后会被删除！

＃＃ 已知的问题
* 如果您发现错误或想要新功能，请在 [github](https://github.com/rg-engineering/ioBroker.ebus/issues) 创建问题

## 2.4.3 (2021-10-21)
* (René) 请参阅问题 #58：警告错误修复：忽略历史记录值 1（无效）“当没有设置历史记录值时

## 2.4.2 (2021-10-19)
* (René) 请参阅问题 #55：错误修复

## 2.4.0 (2021-10-17)
*（René）读取数据点和历史数据点的过度处理，可选添加电路
* (René) 命令现在可以包含多个命令，只需使用 ',' 分隔命令
* (René) 请参阅问题 #55：警告更改为调试消息

## 2.3.2 (2021-09-02)
* (René) 见 issue #49: support for ebusd 21.2
* (René) 请参阅问题 #40：使用布尔值代替字符串的选项，用于开/关值
* (René) 依赖更新

## 2.2.7 (2021-07-03)
* (René) 依赖更新
* (René) 请参阅问题 #48：错误数据类型日志的错误修复

## 2.2.5 (2021-03-21)
* (René) 依赖更新

## 2.2.4 (2021-02-17)
* (René) 见问题 #42: Uncaught ReferenceError: oView is not defined in widgetsolved

## 2.2.3 (2020-10-24)
* (René) 如果不可用，则创建历史 DP

## 2.2.0 (2020-09-06)
* (René) 仅在必要时更改 DP 以减少系统负载
* (René) 更新依赖

## 2.1.1 (2020-06-27)
* (René) 问题 #26：错误修复：“找不到 cmd”只是调试消息而不是错误

## 2.1.0 (2020-06-17)
* (René) 重构：使用了“async/await”

## 2.0.0 (2020-04-26)
* (René) 将“请求”替换为“弯曲”

## 1.0.0 (2019-12-15)
* (René) 更新到我自己的 flot 3.0

## 0.8.2 (2019-11-10)
*（René）数据点“错误”中的更多错误消息

## 0.8.1 (2019-10-31)
* (René) 将 flot 更新到 3.0 版

### 0.8.0 (2019-02-24)
* (René) hcmode2 值 5 = EVU Sperrzeit

### 0.7.0 (2019-01-28)
* (René) 添加可调整的超时时间

### 0.6.0 (2019-01-06)
* (René) 支持紧凑模式

### 0.5.5 (2018-11-04)
* (René) 代码清理

### 0.5.4
* (René) arduino 支持已移除

### 0.5.3
* (René) 添加错误信息

### 0.5.2
* (René) 错误修复：在 vis 1.x 中某些值未存储

### 0.5.1
* (René) 错误修复：如果没有可轮询，则跳过 telnet 连接

### 0.5.0
* (René) 通过 TCP 将日期写入 ebusd

### 0.4.2
* (René) admin V3 的错误修复

### 0.4.1
* (René) 徽标已更改

### 0.4.0
* (René) 从 ebusd 读取数据

### 0.3.0
* (René) 支持 ebusd
* (René) admin3 支持

### 0.2.0
* (René) 为 vis 添加历史记录为 JSON
* (René) 添加基于 flot 的小部件以显示温度、状态和功率图

### 0.1.0
* (René) 调度适配器而不是守护进程

### 0.0.3
* (René) UTF8 编码

### 0.0.2
* (René) 初始版本

## Changelog

### 3.0.2 (2022-04-02)
* (René) message for installation added

### 3.0.1 (2022-04-02)
* (René) read interval in admin added

### 3.0.0 (2022-04-02)
* (René) **ATTENTION** change from scheduled to daemon adapter
* (René) bent by axios replaced

### 2.5.1 (2021-12-29)
* (René) adjustable retries to send data if arbitration error appeared

### 2.5.0 (2021-12-28)
* (René) see issue #62: support ebusd 21.3

### 2.4.5 (2021-11-07)
* (René) bug fix color of labels in widget

### 2.4.4 (2021-10-30)
* (René) see issue #59: avoid endless loop
* (René) update flot to 4.2.2
* (René) bug fix missing space in command when using circuit name

## License
Copyright (C) <2017 - 2022>  <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.