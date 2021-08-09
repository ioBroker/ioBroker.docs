---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ebus/README.md
title: ioBroker.ebus
hash: hwnSvGdtB2ANX+jFQ3fI09f8e+vlELKqck7xjXfp8Mg=
---
![商标](../../../en/adapterref/iobroker.ebus/admin/ebus.png)

![安装数量](http://iobroker.live/badges/ebus-stable.svg)
![下载](https://img.shields.io/npm/dm/iobroker.ebus.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.ebus.svg)
![已知漏洞](https://snyk.io/test/github/rg-engineering/ioBroker.ebus/badge.svg)
![新产品管理](https://nodei.co/npm/iobroker.ebus.png?downloads=true)

# IoBroker.ebus
![GitHub 操作](https://github.com/rg-engineering/ioBroker.ebus/workflows/Test%20and%20Release/badge.svg)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅 [Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用哨兵报告。

**如果您喜欢，请考虑捐赠：**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YBAZTEBT9SYC2&source=url)

该适配器读取

- 使用 html 来自 ebusd 的数据

在这种情况下，ebusd 必须运行并且必须能够将数据发送到例如浏览器通过 http://IP:port/data (http://192.168.0.123:8889/data) ebusd 的当前版本，包括。配置文件可以从 https://github.com/john30/ebusd 复制所有带有数据、lastup 和来自全局部分的字段都被解析。目前所有其他人都被忽略了。

可以轮询未由 ebusd 直接轮询的数据。命令“read -f”用于强制通过 ebus 读取。

另一个功能是向 ebusd 发送任何命令并接收答案以使用例如脚本。

当前支持的 ebusd 版本：3.3

＃＃ 已知的问题
* 如果您发现错误或想要新功能，请在 [github](https://github.com/rg-engineering/ioBroker.ebus/issues) 创建问题

## 2.2.7 (2021-07-03)
* (René) 依赖更新
* (René) 参见问题 #48：错误数据类型日志的错误修复

## 2.2.5 (2021-03-21)
* (René) 依赖更新

## 2.2.4 (2021-02-17)
* (René) 见问题 #42: Uncaught ReferenceError: oView is not defined in widget 已解决

## 2.2.3 (2020-10-24)
* (René) 如果不可用则创建历史记录 DP

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
* (René) 更新到我自己的船队 3.0

## 0.8.2 (2019-11-10)
* (René) 数据点“错误”中的更多错误消息

## 0.8.1 (2019-10-31)
* (René) 更新到 3.0 版

### 0.8.0 (2019-02-24)
* (René) hcmode2 值 5 = EVU Sperrzeit

### 0.7.0 (2019-01-28)
* (René) 添加可调超时

### 0.6.0 (2019-01-06)
* (René) 支持紧凑模式

### 0.5.5 (2018-11-04)
* (René) 代码清理

### 0.5.4
* (René) arduino 支持已删除

### 0.5.3
* (René) 添加错误信息

### 0.5.2
* (René) 错误修复：在 vis 1.x 中一些值没有被存储

### 0.5.1
* (René) 错误修复：如果没有轮询，则跳过 telnet 连接

### 0.5.0
* (René) 通过 TCP 将日期写入 ebusd

### 0.4.2
* (René) 管理员 V3 的错误修复

### 0.4.1
* (René) 标志改变

### 0.4.0
* (René) 从 ebusd 读取数据

### 0.3.0
* (René) 支持 ebusd
* (René) admin3 支持

### 0.2.0
* (René) 为 vis 添加 JSON 格式的历史记录
* (René) 添加基于浮点的小部件以显示温度、状态和功率图

### 0.1.0
* (René) 调度适配器而不是守护进程

### 0.0.3
* (René) UTF8 编码

### 0.0.2
* (René) 初始版本

## Changelog

## License
Copyright (C) <2017 - 2021>  <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.