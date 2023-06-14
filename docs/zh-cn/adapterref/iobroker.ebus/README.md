---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ebus/README.md
title: ioBroker.ebus
hash: N1+qoBcOZs3GExmvBcD7gWvW+xHqKRQGHFQBqqxk9hU=
---
![标识](../../../en/adapterref/iobroker.ebus/admin/ebus.png)

![安装数量](http://iobroker.live/badges/ebus-stable.svg)
![下载](https://img.shields.io/npm/dm/iobroker.ebus.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.ebus.svg)
![已知漏洞](https://snyk.io/test/github/rg-engineering/ioBroker.ebus/badge.svg)
![NPM](https://nodei.co/npm/iobroker.ebus.png?downloads=true)

# IoBroker.ebus
![GitHub 操作](https://github.com/rg-engineering/ioBroker.ebus/workflows/Test%20and%20Release/badge.svg)

**此适配器使用哨兵库自动向开发人员报告异常和代码错误。**有关更多详细信息和如何禁用错误报告的信息，请参阅[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

**如果喜欢，请考虑捐款：**

[![贝宝](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=34ESBMJ932QZC)

这个适配器读取

- 使用 html 来自 ebusd 的数据

在这种情况下，ebusd 必须运行并且必须能够将数据发送到例如explorer 通过 http://IP:port/data (http://192.168.0.123:8889/data) 当前版本的 ebusd 包括。配置文件可以从 https://github.com/john30/ebusd 复制所有带有数据的字段，lastup 和来自全局部分。目前所有其他人都被忽略了。

可以轮询未由 ebusd 直接轮询的数据。命令“read -f”用于强制读取 ebus。

另一个功能是向 ebusd 发送任何命令并接收响应以使用例如脚本。

当前支持的 ebusd 版本：22.3

**注意** ebusd - 版本 22.1 配置路径已更改为 http://cfg.ebusd.eu/。确保在安装 ebusd 时更改它。
详情见[变更日志](https://github.com/john30/ebusd/blob/master/ChangeLog.md)

## 如何向 ebusd 发送命令
1. 在数据点 ebus.0.cmd 上写入单个命令或命令列表

如果要使用多个命令，请使用 , 分隔单个命令。
示例：读取 -f YieldTotal，读取 LegioProtectionEnabled，读取 -f -c broadcast outsidetemp

2. 执行命令时，您将在数据点 ebus.0.cmdResult 中收到每个命令的结果

结果也是以逗号分隔的示例：2000，ERR：未找到元素，10.5

注意：命令执行后datapoint ebus.0.cmd中的命令被删除！

＃＃ 已知的问题
* 如果您发现错误或想要新功能，请在 [github](https://github.com/rg-engineering/ioBroker.ebus/issues) 创建问题

## 2.4.3 (2021-10-21)
* (René) 参见问题 #58：警告错误修复：忽略历史值 1（无效）”，当没有设置历史值时

## 2.4.2 (2021-10-19)
* (René) 请参阅问题 #55：错误修复

## 2.4.0 (2021-10-17)
* (René) 读取数据点和历史数据点的过度处理，可选择添加电路
* (René) 命令现在可以包含多个命令，只需用“,”分隔命令
* (René) 查看问题 #55：警告更改为调试消息

## 2.3.2 (2021-09-02)
* (René) 请参阅问题 #49：支持 ebusd 21.2
* (René) 请参阅问题 #40：使用布尔值而不是字符串作为开/关值的选项
* (René) 依赖更新

## 2.2.7 (2021-07-03)
* (René) 依赖更新
* (René) 请参阅问题 #48：错误数据类型日志的错误修复

## 2.2.5 (2021-03-21)
* (René) 依赖更新

## 2.2.4 (2021-02-17)
* (René) 请参阅问题 #42：未捕获的 ReferenceError：oView 未在小部件中定义已解决

## 2.2.3 (2020-10-24)
* (René) 如果不可用则创建历史 DP

## 2.2.0 (2020-09-06)
* (René) 仅在必要时更改 DP 以减少系统负载
* (René) 更新依赖

## 2.1.1 (2020-06-27)
* (René) 问题 #26：错误修复：“找不到 cmd”只是调试消息而不是错误

## 2.1.0 (2020-06-17)
* (René) 重构：使用“async/await”

## 2.0.0 (2020-04-26)
* (René) “请求”替换为“弯曲”

## 1.0.0 (2019-12-15)
* (René) 更新到我自己的 flot 3.0

## 0.8.2 (2019-11-10)
* (René) 数据点“错误”中的更多错误消息

## 0.8.1 (2019-10-31)
* (René) 将 flot 更新到 3.0 版

### 0.8.0 (2019-02-24)
* (René) hcmode2 值 5 = EVU Sperrzeit

### 0.7.0 (2019-01-28)
* (René) 添加可调超时

### 0.6.0 (2019-01-06)
* (René) 支持紧凑模式

### 0.5.5 (2018-11-04)
* (René) 代码清理

### 0.5.4
* (René) arduino 支持移除

### 0.5.3
* (René) 添加错误信息

### 0.5.2
* (René) 错误修复：在 vis 1.x 中，一些值未存储

### 0.5.1
* (René) 错误修复：如果没有要轮询的内容，则跳过 telnet 连接

### 0.5.0
* (René) 通过 TCP 将日期写入 ebusd

### 0.4.2
* (René) admin V3 错误修复

### 0.4.1
* (René) 徽标已更改

### 0.4.0
* (René) 从 ebusd 读取数据

### 0.3.0
* (René) 支持 ebusd
* (René) admin3 支持

### 0.2.0
* (René) 为 vis 添加历史记录作为 JSON
* (René) 添加基于 flot 的小部件以显示温度、状态和功率图

### 0.1.0
* (René) 预定的适配器而不是守护进程

### 0.0.3
* (René) UTF8 编码

### 0.0.2
* (René) 初始版本

## Changelog

### 3.2.1 (2023-04-07)
* (René) dependencies updated

### 3.2.0 (2023-02-11)
* (René) **Attention** polled variables must be set as active in admin now
* (René) search available variables per circuit added in admin
* (René) DP "find" added to force read of all existing datapoints (Attention: might take a while) and update name in data point tree 

### 3.1.1 (2023-01-31)
* (René) support ebusd 23.1
* (René) see issue #77: make sure that only one data request is running at the same time

### 3.1.0 (2022-12-01)
* (René) support ebusd 22.4
* (René) see issue #77: Update data point when read-cmd is used
* (René) see issue #78: remove CR, LF in answer from ebusd for DP ebus.0.cmdResult


### 3.0.7 (2022-08-20)
* (René) support ebusd 22.3

### 3.0.6 (2022-08-19)
* (René) bug fix in tooltip in wizard

### 3.0.4 (2022-08-18)
* (René) tooltip in wizard added
* (René) flot and dependencies updated
* (René) errors from ebusd are shown as warning here in adapter, details schould be checked in logs of ebusd
* (René) bug fix in widget: if less data available x axes grid point were not shown
* (René) except null as valid value from ebusd (e.g. to reset CurrentError)

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
MIT License

Copyright (c) 2017-2023 rg-engineering info@rg-engineering.eu

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