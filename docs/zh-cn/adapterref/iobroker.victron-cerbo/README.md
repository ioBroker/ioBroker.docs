---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.victron-cerbo/README.md
title: ioBroker Victron Cerbo
hash: 8lGajSv+FK+1M5bIPQWcSTn8vbnGvLbpVix9DTk4ZpI=
---
![标识](../../../en/adapterref/iobroker.victron-cerbo/admin/victron-cerbo.png)

![安装数量](http://iobroker.live/badges/victron-cerbo-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.victron-cerbo.svg)
![下载](https://img.shields.io/npm/dm/iobroker.victron-cerbo.svg)

# IoBroker Victron Cerbo
![测试与发布](https://github.com/ioBroker/ioBroker.victron-cerbo/workflows/Test%20and%20Release/badge.svg)

＃＃ 描述
该适配器通过 MQTT 将 Victron Cerbo GX 设备连接到 ioBroker。

Victron Cerbo GX 是一个先进的监控和控制中心，适用于 Victron Energy 系统，包括太阳能充电器、电池监控器、逆变器和其他能源组件。

＃＃ 配置
- **IP**：MQTT代理的IP地址
- **端口**：MQTT 服务器端口（默认值：1883）
- **用户名/密码**：MQTT 身份验证凭据
- **客户端超时**：MQTT 客户端连接的超时时间（以秒为单位）

<!-- 下一版本的占位符（位于行首）：

### **正在进行中** -->

## Changelog
### 0.2.1 (2026-04-12)
* (@GermanBluefox) Implemented the tests

### 0.1.0 (2026-04-11)
* (@GermanBluefox) Corrected some states

### 0.0.1
* Initial release

## License

The MIT License (MIT)

Copyright (c) 2026, Denis Haev <dogafox@gmail.com>

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