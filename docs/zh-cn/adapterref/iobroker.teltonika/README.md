---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.teltonika/README.md
title: ioBroker Teltonika
hash: ITce4FuOuoOrXOpu1ruJf0Z3Zn+Reze1PrwtFoPz3gE=
---
![安装数量](http://iobroker.live/badges/teltonika-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.teltonika.svg)
![下载](https://img.shields.io/npm/dm/iobroker.teltonika.svg)

<img src="admin/teltonika.svg" height="100px"/>

# IoBroker Teltonika
![测试与发布](https://github.com/ioBroker/ioBroker.teltonika/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/teltonika/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 更多详情以及如何禁用错误报告，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

此适配器通过 MQTT 协议从 Teltonika 路由器读取数据。

它可以读取以下信息：

- 温度（'RUT2'、'RUT9'、'RUTX'、'RUT3'、'RUT1'、'TRB2'、'TRB5'、'OTD'、'RUTM'、'RUTC'）
信号强度
移动运营商
网络状态
- 连接类型（2G/3G/4G）
- 广域网 IP 地址
- 正常运行时间
- 姓名
- 数字输入 1（'RUT9'）
- 数字输入 2 ('RUT9')
- 模拟输入（'RUT9'、'TRB2'、'TRB141'）
- 引脚 2 状态 ('TRB2')
- 引脚 3 状态（'RUT1'、'RUT2'、'RUT9'、'RUTX'、'RUT3'、'TRB1'、'TRB2'、'TRB5'、'RUTM'）
- 引脚 4 状态（'RUT1'、'RUT2'、'RUT9'、'RUTX'、'RUT3'、'TRB1'、'TRB2'、'TRB5'、'RUTM'）

＃＃ 用法
步骤：

- 首先启动实例
- 前往您的路由器并打开 MQTT 设置

  ![设置](../../../en/adapterref/iobroker.teltonika/img/settings.png)

- 启用 MQTT 发布者
- 将 MQTT 代理地址设置为您的 ioBroker 实例的地址。
- 设置MQTT代理端口。重要提示：此适配器的默认端口为1885，以免与其他MQTT适配器冲突。
保存设置
- 部分路由器需要重启才能使设置生效。
一段时间后，数据点将在适配器实例中创建。

**注意**：仅使用 `RUTC` 设备进行了测试。

<!-- 下一版本的占位符（位于行首）：

### **正在进行中** -->

## Changelog
### 0.1.0 (2025-12-07)
* (bluefox) Changed roles of the states

### 0.0.2 (2025-12-03)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2025, bluefox <dogafox@gmail.com>

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